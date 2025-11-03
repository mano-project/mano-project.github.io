// Parse folio labels like "5r", "10v", or "7"
function parseFolioLabel(lbl) {
  if (!lbl) return null;
  const m = String(lbl).trim().match(/^(\d+)\s*([rv])?$/i);
  if (!m) return null;
  const n = parseInt(m[1], 10);
  const side = m[2] ? (m[2].toLowerCase() === 'r' ? 0 : 1) : 0; // r < v
  return n * 2 + side; // comparable scalar
}


// -------------Validation Rules ------------------

const validationRules = [
 
//-------------- 1. FILE DESCRIPTION --------------
  // R1a — File name is required
  {
    id: "R1a",
    context: "File description - File name",
    severity: "mandatory",
    test: (d) => !!d.msTitle && d.msTitle.trim() !== "",
    message: "Each manuscript must have a file name."
  },

  // R1b — Language of data entry is required
  {
    id: "R1b",
    context: "File description - Language of data entry",
    severity: "mandatory",
    test: (d) => !!d.xmlLang && d.xmlLang.trim() !== "",
    message: "Each manuscript must have a language of data entry."
  },

  // R1c — License selection is required
  {
    id: "R1c",
    context: "File description - License",
    severity: "mandatory",
    test: (d) => !!d.publicationStmt && d.publicationStmt.trim() !== "",
    message: "Each manuscript must include a license."
  },
 
  // R1d — At least one responsible person must be added
  {
    id: "R1d",
    context: "File description - Persons responsible for data entry",
    severity: "mandatory",
    test: (d) =>
      Array.isArray(d.responsiblePersons) &&
      d.responsiblePersons.length > 0,
    message:
      "At least one responsible person must be added."
  },

  // R1e — Each responsible person must have both name and surname
  {
    id: "R1e",
    context: "File description - Name and surname",
    severity: "mandatory",
    test: (d) => {
      if (!Array.isArray(d.responsiblePersons)) return false;
      // Every person entered must have non-empty name and surname
      return d.responsiblePersons.every(
        (p) =>
          (p.name?.trim() !== "") &&
          (p.surname?.trim() !== "")
      );
    },
    message:
      "Each responsible person must include both name and surname."
  },



//-------------- 2. IDENTIFICATION --------------
  // R2a — Manuscript name is required
  {
    id: "R2a",
    context: "Identification - Manuscript name",
    severity: "mandatory",
    test: (d) => !!d.msName && d.msName.trim() !== "",
    message: "Manuscript name is required."
  },

  // R2b — Library / repository is required
  {
    id: "R2b",
    context: "Identification - Library",
    severity: "mandatory",
    test: (d) => !!d.repository?.value && d.repository.value.trim() !== "",
    message: "Library (repository) is required."
  },



//-------------- 3. CONTENT --------------
// R3a — Content items need at least a title OR an author (if any msItem exists)
  {
    id: "R3a",
    context: "Content items",
    severity: "mandatory",
    test: (d) => {
      if (!Array.isArray(d.msItems) || d.msItems.length === 0) return true;
      return d.msItems.every((it) => {
        const hasTitle = (it.title || "").trim() !== "";
        const hasAuthor = !!it.author && ((it.author.value || "").trim() !== "");
        return hasTitle || hasAuthor;
      });
    },
    message:
      "At least one of “Title” or “Author” should be provided for each content item."
  },

  {
    id: "R3b",
    context: "Responsible person vs content author",
    severity: "optional",
    test: (d) => {
      if (!Array.isArray(d.responsiblePersons) || !Array.isArray(d.msItems))
        return true;

      // Build normalized list of responsible persons
      const respPersons = d.responsiblePersons.map((p) => ({
        full: `${(p.name || "").trim()} ${(p.surname || "").trim()}`.toLowerCase(),
        ref: (p.ref || "").trim().toLowerCase(),
      }));

      // Loop through all authors and check if any matches a responsible person
      for (const item of d.msItems) {
        if (!item.author) continue;
        const authorName = (item.author.value || "").trim().toLowerCase();
        const authorRef = (item.author.uri || "").trim().toLowerCase();

        for (const person of respPersons) {
          // CASE 1: same external reference (Wikidata, ORCID, etc.)
          if (person.ref && authorRef && person.ref === authorRef) return false;

          // CASE 2: name containment (e.g., “Burchard of Worms”)
          if (
            person.full &&
            authorName &&
            (authorName.includes(person.full) ||
              person.full.includes(authorName))
          ) {
            return false;
          }
        }
      }
      return true;
    },
    message:
      "It seems like the responsible person is also an author of the manuscript’s content. Are you sure this is correct?"
  },

  // R3c — Page ranges must not be empty (both 'from' and 'to' required)
  {
    id: "R3c",
    context: "Page ranges",
    severity: "mandatory",
    test: (d) => {
      if (!Array.isArray(d.msItems)) return true;
      for (const it of d.msItems) {
        if (!Array.isArray(it.pageRanges)) continue;
        for (const pr of it.pageRanges) {
          const from = (pr?.from || "").trim();
          const to   = (pr?.to   || "").trim();
          // consider a range "added" when the row exists; require both ends
          if (from === "" || to === "") return false;
        }
      }
      return true;
    },
    message:
      "A page range row is incomplete. Please provide both values or delete the empty range."
  },

  // R3d — Page-range order check (e.g., 5r–1r looks reversed)
  {
    id: "R3d",
    context: "Content - Page ranges",
    severity: "optional",
    test: (d) => {
      if (!Array.isArray(d.msItems)) return true;

      for (const it of d.msItems) {
        if (!Array.isArray(it.pageRanges)) continue;
        for (const pr of it.pageRanges) {
          const a = parseFolioLabel(pr?.from);
          const b = parseFolioLabel(pr?.to);
          if (a !== null && b !== null && b < a) {
            return false; // reversed order detected
          }
        }
      }
      return true;
    },
    message:
      "Some page ranges look reversed. Please check the order."
  },



//-------------- 4. PHYSICAL DESCRIPTION --------------
  {
    id: "R4a",
    context: "Physical Description - Hands",
    severity: "optional",
    test: (d) => {
      if (!d.hands) return true;
      const n = parseInt(d.hands);
      if (isNaN(n)) return true;
      return n <= 1 || !!d.handsDesc;
    },
    message:
      "Multiple hands are indicated, but no hand description was provided. Please check if this is correct."
  },

  // R4b — Script notes cannot be empty
  {
    id: "R4b",
    context: "Script descriptions",
    severity: "mandatory",
    test: (d) => {
      if (!Array.isArray(d.scriptNotes)) return true;
      return d.scriptNotes.every(sn => (sn?.value || "").trim() !== "");
    },
    message:
      "A script note was added but left empty. Please enter a script description or delete the empty script."
  },

  // R4c — Seals cannot be empty
  {
    id: "R4c",
    context: "Seals",
    severity: "mandatory",
    test: (d) => {
      if (!Array.isArray(d.seals)) return true;
      return d.seals.every(s => (s || "").trim() !== "");
    },
    message:
      "A seal was added but left empty. Please write a seal description or delete the empty seal."
  },
    // R4d — Check if Height and Width values seem realistic (unit check)
  {
    id: "R4d",
    context: "Physical Description - Dimensions",
    severity: "optional",
    test: (d) => {
      const h = parseFloat(d.height);
      const w = parseFloat(d.width);
      if (isNaN(h) && isNaN(w)) return true; // nothing to check

      const values = [h, w].filter(v => !isNaN(v));

      // Consider realistic manuscript range: 5–100 cm
      return values.every(v => v >= 5 && v <= 100);
    },
    message:
      "The manuscript’s height or width seems unusually small or large. Please check that the values are entered in centimetres (cm)."
  },




//-------------- 5. HISTORY --------------
  {
    id: "R5a",
    context: "Origin - Date of origin",
    severity: "mandatory",
    test: (d) => {
      if (!d.dateOriginNotBefore || !d.dateOriginNotAfter) return true;
      const nb = parseInt(d.dateOriginNotBefore);
      const na = parseInt(d.dateOriginNotAfter);
      return isNaN(nb) || isNaN(na) || na >= nb;
    },
    message: "The value of 'Latest possible date of origin' must be equal to or bigger than the value of 'Earliest possible date of origin'."
  },

  // R5b — Provenance notBefore / notAfter consistency
  {
    id: "R5b",
    context: "Provenance - Period of ownership",
    severity: "mandatory",
    test: (d) => {
      if (!Array.isArray(d.provenance) || d.provenance.length === 0) return true;

      return d.provenance.every((p) => {
        const nb = parseInt(p.notBefore);
        const na = parseInt(p.notAfter);
        // valid if: one is missing OR both are numbers and na >= nb
        if ((isNaN(nb) && isNaN(na)) || isNaN(nb) || isNaN(na)) return true;
        return na >= nb;
      });
    },
    message:
      "The value of 'Latest possible date of ownership' must be equal to or bigger than the value of 'Earliest possible date of ownership'."
  },
  {
    id: "R5c",
    context: "Provenance - Relation to origin period",
    severity: "mandatory",
    test: (d) => {
      if (!Array.isArray(d.provenance)) return true;

      const originStart = parseInt(d.dateOriginNotBefore);
      const originEnd   = parseInt(d.dateOriginNotAfter);

      return d.provenance.every((p) => {
        const provStart = parseInt(p.notBefore);
        const provEnd   = parseInt(p.notAfter);

        // Skip if any field is missing
        if (isNaN(originStart) || isNaN(originEnd) || (isNaN(provStart) && isNaN(provEnd))) return true;

        // If provenance ends before origin starts, or starts before origin starts, flag
        if (!isNaN(provEnd) && provEnd < originStart) return false;
        if (!isNaN(provStart) && provStart < originStart) return false;

        // Optional stricter case: provenance entirely before origin
        if (!isNaN(provEnd) && provEnd < originStart) return false;

        return true;
      });
    },
    message:
      "A provenance ownership period occurs before the manuscript’s origin date. Please check the chronological order."
  },

  {
    id: "R5d",
    context: "Library and Previous owner",
    severity: "optional",
    test: (d) => {
      if (!Array.isArray(d.provenance)) return true;
      const current = (d.repository?.value || "").toLowerCase();
      return d.provenance.every((p) => {
        const prev = (p.name?.value || "").toLowerCase();
        return !current || !prev || current !== prev;
      });
    },
    message:
      "The current repository seems to be identical to a previous owner. Please verify this is correct."
  },
 
  // R5e — Origin year equals an ownership year (potential confusion)
  {
    id: "R5e",
    context: "History - Origin vs ownership dates",
    severity: "optional",
    test: (d) => {
      const nb = parseInt(d.dateOriginNotBefore);
      const na = parseInt(d.dateOriginNotAfter);
      if (!Array.isArray(d.provenance) || (isNaN(nb) && isNaN(na))) return true;

      for (const p of d.provenance) {
        const pnb = parseInt(p.notBefore);
        const pna = parseInt(p.notAfter);

        // Exact single-year clashes or identical bounds
        if (!isNaN(nb) && !isNaN(pnb) && nb === pnb) return false;
        if (!isNaN(na) && !isNaN(pna) && na === pna) return false;
        if (!isNaN(nb) && !isNaN(na) && !isNaN(pnb) && !isNaN(pna)) {
          if (nb === pnb && na === pna) return false;
        }
      }
      return true;
    },
    message:
      "The origin date matches a provenance (ownership) date. Ensure the origin and ownership periods aren’t conflated."
  },
  // R5f — Provenance rows must have a previous owner (name.value) or be removed
  {
    id: "R5f",
    context: "Provenance",
    severity: "mandatory",
    test: (d) => {
      if (!Array.isArray(d.provenance)) return true;
      // every added provenance must have a non-empty name.value
      return d.provenance.every(p => (p?.name?.value || "").trim() !== "");
    },
    message:
      "A provenance entry has no previous owner. Please fill the owner name or delete the empty provenance row."
  },
  // R5g — Origin / Provenance: human-readable vs machine-readable date consistency
  {
    id: "R5g",
    context: "History - Origin and Provenance Dates",
    severity: "optional",
    test: (d) => {
      // Origin check
      const hasReadableOrigin = !!(d.dateOriginHuman && d.dateOriginHuman.trim() !== "");
      const hasMachineOrigin = !!(d.dateOriginNotBefore || d.dateOriginNotAfter);
      const originOK = !(hasReadableOrigin ^ hasMachineOrigin); // XOR — both or neither

      // Provenance check
      if (!Array.isArray(d.provenance) || d.provenance.length === 0) return originOK;
      const provenanceOK = d.provenance.every((p) => {
        const hasReadable = !!(p.humanDate && p.humanDate.trim() !== "");
        const hasMachine = !!(p.notBefore || p.notAfter);
        return !(hasReadable ^ hasMachine);
      });

      return originOK && provenanceOK;
    },
    message:
      "You entered a human-readable date but no values for 'Earliest possible date'/'Latest possible date' (or vice versa). Consider filling both for clarity."
  },



//-------------- GENERAL RULES 
  // R5h — Initial lowercase detection in key textual fields
  {
    id: "GRa",
    context: "General text capitalization",
    severity: "optional",
    test: (d) => {
      const toStr = (val) => {
        if (val === null || val === undefined) return "";
        if (typeof val === "object") {
          // Try to extract a meaningful string (common patterns)
          if ("value" in val) return String(val.value);
          if ("label" in val) return String(val.label);
          return JSON.stringify(val);
        }
        return String(val);
      };

      const startsWithLower = (s) => /^[a-zà-ÿ]/.test(toStr(s).trim());

      const fieldsToCheck = [
        d.msTitle,
        d.msName,
        d.repository?.value,
        d.library,
        d.condition,
        d.script,
        d.decoration,
        d.musicNotation,
        d.additions,
        d.accompanying,
        d.binding,
        d.seal,
        d.originPlace,
      ];

      // Responsible persons
      if (Array.isArray(d.responsiblePersons)) {
        d.responsiblePersons.forEach((p) => {
          fieldsToCheck.push(p.name, p.surname, p.affiliation);
        });
      }

      // Summaries
      if (Array.isArray(d.summaries)) {
        d.summaries.forEach((s) => fieldsToCheck.push(s.value));
      }

      // Content authors and titles
      if (Array.isArray(d.msItems)) {
        d.msItems.forEach((it) => {
          fieldsToCheck.push(it.title, it.author?.value);
        });
      }

      // Provenance (previous owners)
      if (Array.isArray(d.provenance)) {
        d.provenance.forEach((p) => fieldsToCheck.push(p.name?.value));
      }

      // Literature items
      if (Array.isArray(d.literature)) {
        d.literature.forEach((lit) => {
          fieldsToCheck.push(
            lit.title,
            lit.publisher,
            lit.place,
            lit.author?.surname,
            lit.author?.forename
          );
        });
      }

      // Return true if none start with lowercase
      return !fieldsToCheck.some((f) => startsWithLower(f));
    },
    message:
      "Some text fields start with a lowercase letter. Please check capitalization (e.g., names, titles, and descriptions should start with a capital)."
  },

  

];

// ------------- 2. Core Validation Function ------------------

function runSchematronValidation(formId) {
  const data = getFormData(formId);
  const results = [];

  validationRules.forEach((rule) => {
    const ok = rule.test(data);
    if (!ok) {
      results.push({
        id: rule.id,
        context: rule.context,
        message: rule.message,
        severity: rule.severity || "optional",
      });
    }
  });

  return results;
}

// ------------- 3. Display Validation Report -----------------

function showValidationReport(issues) {
  const old = document.querySelector("#validation-report");
  if (old) old.remove();

  const report = document.createElement("div");
  report.id = "validation-report";
  report.style.maxHeight = "400px";
  report.style.overflowY = "auto";

  const mandatory = issues.filter((i) => i.severity === "mandatory");
  const optional = issues.filter((i) => i.severity === "optional");

  if (issues.length === 0) {
    report.className = "alert alert-success mt-4";
    report.innerHTML =
      "<strong>No issues found.</strong> The manuscript metadata appears consistent.";
  } else {
    report.className = "alert alert-warning mt-4";
    let html = `<h5><i class="bi bi-exclamation-triangle"></i> Validation Report</h5>`;

    if (mandatory.length) {
      html += `<h6 class="mt-3 text-danger">Mandatory issues</h6><ul>`;
      html += mandatory
        .map(
          (i) =>
            `<li><strong>${i.context}</strong>: ${i.message}</li>`
        )
        .join("");
      html += `</ul>`;
    }

    if (optional.length) {
      html += `<h6 class="mt-3 text-warning">Optional checks</h6><ul>`;
      html += optional
        .map(
          (i) =>
            `<li><strong>${i.context}</strong>: ${i.message}</li>`
        )
        .join("");
      html += `</ul>`;
    }

    report.innerHTML = html;
  }

  const container = document.querySelector("#manuscriptFormsContainer");
  container.prepend(report);

  // Smooth scroll to the validation report
  report.scrollIntoView({ behavior: "smooth", block: "start" });
}

// ------------- 4. Integration with Download -----------------

function validateBeforeDownload(formId) {
  const issues = runSchematronValidation(formId);
  const mandatory = issues.filter((i) => i.severity === "mandatory");
  const optional = issues.filter((i) => i.severity === "optional");

  showValidationReport(issues);

  if (mandatory.length > 0) {
    alert("Please correct all mandatory issues before downloading.");
    return false;
  }

  if (optional.length > 0) {
    const proceed = confirm(
      "There are some optional issues that you might want to review before downloading.\n\nDo you still want to download anyway?"
    );
    if (!proceed) return false;
    // Allow UI to refresh before triggering the download
    setTimeout(() => {}, 0);
  }

  return true;
}


// ------------- 4b. Validation before Download All JSON -----------------

function validateAllBeforeDownload() {
  const forms = [...document.querySelectorAll(".msForm")];
  let allIssues = [];
  let anyMandatory = false;
  let anyOptional = false;

  forms.forEach((form, idx) => {
    const formId = form.id;
    const issues = runSchematronValidation(formId);
    if (issues.length > 0) {
      allIssues.push({
        manuscript: form.querySelector('[name="msTitle"]')?.value?.trim() || `Manuscript ${idx + 1}`,
        issues,
      });
      if (issues.some((i) => i.severity === "mandatory")) anyMandatory = true;
      if (issues.some((i) => i.severity === "optional")) anyOptional = true;
    }
  });

  if (allIssues.length > 0) {
    // Flatten all issues for a combined report
    const flatIssues = allIssues.flatMap((m) =>
      m.issues.map((i) => ({
        ...i,
        context: `${m.manuscript} → ${i.context}`,
      }))
    );

    showValidationReport(flatIssues);

    if (anyMandatory) {
      alert("Some manuscripts contain mandatory issues. Please correct them before downloading.");
      return false;
    }

    if (anyOptional) {
      const proceed = confirm(
        "There are some optional issues that you might want to review before downloading.\n\nDo you still want to download anyway?"
      );
      if (!proceed) return false;
      // Allow UI to refresh before triggering the download
    setTimeout(() => {}, 0);
    }
  }

  return true; // Safe to proceed
}



// ------------- 5. Trigger Validation ------------------------

function validateCurrentForm(formId) {
  const issues = runSchematronValidation(formId);
  showValidationReport(issues);
}


// ------------- 6. Attach “Validate” button handlers ----------------------

document.addEventListener("DOMContentLoaded", () => {
  // Attach validation handlers to existing buttons with .validate-btn
  document.querySelectorAll(".validate-btn").forEach((btn) => {
    const form = btn.closest(".manuscript-container")?.querySelector(".msForm");
    if (form) {
      btn.addEventListener("click", () => validateCurrentForm(form.id));
    }
  });
});


// Add validation check before global JSON download
/*const downloadAllBtn = document.getElementById("downloadAllJSON");
if (downloadAllBtn) {
  const originalClick = downloadAllBtn.onclick;
  downloadAllBtn.addEventListener("click", (event) => {
    if (!validateAllBeforeDownload()) {
      event.stopImmediatePropagation();
      event.preventDefault();
      return;
    }
    // continue if original handler exists
    if (originalClick) originalClick();
  });
}*/


// ------------- 7. Hook into downloadXML() -------------------

const originalDownloadXML = window.downloadXML;
window.downloadXML = function (formId) {
  if (!validateBeforeDownload(formId)) return;
  originalDownloadXML(formId);
};

console.log("Validation system loaded: Mandatory/Optional rules active.");
