
let manuscriptCounter = 0;
const container = document.getElementById('manuscriptFormsContainer');

document.getElementById('addManuscriptBtn').addEventListener('click', () => {
  addManuscriptForm();
});

function addManuscriptForm(data = {}, shouldScroll = true) {
  manuscriptCounter++;
  const id = `manuscript-${manuscriptCounter}`;
  const formId = `msForm-${manuscriptCounter}`;
  const title = data.msTitle || `Manuscript ${manuscriptCounter}`;

  const form = document.createElement('div');
  form.className = 'accordion mb-4';
  form.setAttribute('data-index', manuscriptCounter);
  form.innerHTML = `
    <div class="container manuscript-container border rounded p-4">
        <h4 class="pb-3">${title}</h4>
        <div class="accordion" id="accordion-${id}">
            <form id="${formId}" class="msForm">
                <div class="accordion-item">  
                    <h2 class="accordion-header" id="heading0-${id}">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse0-${id}" aria-expanded="true" aria-controls="collapse0-${id}">Description of the file</button>
                    </h2>
                    <div id="collapse0-${id}" class="accordion-collapse collapse show" aria-labelledby="heading0-${id}">
                        <div class="accordion-body">
                            <fieldset class="p-3">
                                <div class="row mb-3">
                                    
                                    <div class="col-md">
                                        <label class="form-label">Manuscript title</label>
                                        <input type="text" class="form-control" name="msTitle" value="${data.msTitle || ''}">
                                    </div>
                                    
                                    <div class="col-md-3">
                                        <label class="form-label">License</label>
                                        <select class="form-select" name="publicationStmt">
                                            <option value="">Please select</option>
                                            ${['CC BY','CC BY-SA','CC BY-ND','CC BY-NC','CC BY-NC-SA','CC BY-NC-ND','CC0']
                                            .map(lic => `<option value="${lic}" ${data.publicationStmt === lic ? 'selected' : ''}>${lic}</option>`).join('')}
                                        </select>
                                    </div>
                                </div>
                            </fieldset>

                            <h6>Person responsible for data entry</h6>
                            <fieldset class="p-3">
                                <div class="row mb-3">
                                    <div class="resp-container"></div>
                                    <div class="d-flex justify-content-start">
                                        <button type="button" class="btn btn-sm btn-outline-primary" onclick="addRespPerson(this)">Add responsible person</button>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                    </div>
                </div>

                <div class="accordion-item">  
                    <h2 class="accordion-header" id="heading1-${id}">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse1-${id}" aria-expanded="false" aria-controls="collapse1-${id}">1. Identification</button>
                    </h2>
                    <div id="collapse1-${id}" class="accordion-collapse collapse" aria-labelledby="heading1-${id}">
                        <div class="accordion-body">
                            <fieldset class="p-3">
                                <div class="row mb-3">
                                    <div class="col-md">
                                        <label class="form-label">Library</label>
                                        <input type="text" class="form-control lod-autocomplete" data-lod="wikidata-place" name="repository" value="${data.repository || ''}">
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div class="col-md">
                                        <label class="form-label">Geographical coordinates</label>
                                        <input type="text" class="form-control geo-coord" name="geoRepository"
                                        placeholder="Library's geo coordinates"
                                        data-error="Please enter in the format: 49.890972, 10.894102" value="${data.geoRepository || ''}">
                                    </div>
                                    <div class="col-md">
                                        <label class="form-label">Settlement</label>
                                        <input type="text" class="form-control" name="settlementIdent" value="${data.settlementIdent || ''}">
                                    </div>
                                    <div class="col-md">
                                        <label class="form-label">Country</label>
                                        <input type="text" class="form-control" name="countryIdent" value="${data.countryIdent || ''}">
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div class="col-md">
                                        <label class="form-label">Collection and signature</label>
                                        <input type="text" class="form-control" name="idno" value="${data.idno || ''}">
                                        </div>
                                    <div class="col-md">
                                        <label class="form-label">Sigle</label>
                                        <input type="text" class="form-control" name="msSigle" value="${data.msSigle || ''}">
                                        </div>
                                    <div class="col-md">
                                        <label class="form-label">Alternative identifier</label>
                                        <input type="text" class="form-control" name="altIdentifier" value="${data.altIdentifier || ''}">
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div class="col-md">
                                        <label class="form-label">Full name</label>
                                        <input type="text" class="form-control" name="msName" value="${data.msName || ''}">
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                    </div>
                </div>
                        
                <div class="accordion-item">
                    <h2 class="accordion-header" id="heading2-${id}">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse2-${id}" aria-expanded="false" aria-controls="collapse2-${id}">2. Content</button>
                    </h2>
                    <div id="collapse2-${id}" class="accordion-collapse collapse" aria-labelledby="heading2-${id}">
                        <div class="accordion-body">
                            <fieldset class="p-3">
                                <div class="mb-3">
                                    <label class="form-label">Summary</label>
                                    <textarea class="form-control autosize" name="summaryContents" placeholder="Enter a description of the manuscript's content" value="${data.summaryContents || ''}"></textarea>
                                </div>
                                <div class="msitem-container"></div>
                                <button type="button" class="btn btn-sm btn-outline-primary mt-2" onclick="addMsItem(this)">Add content</button>
                            </fieldset>
                        </div>
                    </div>
                </div>
                
                <div class="accordion-item">
                    <h2 class="accordion-header" id="heading3-${id}">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse3-${id}" aria-expanded="false" aria-controls="collapse3-${id}">3. Physical description</button>
                    </h2>
                    <div id="collapse3-${id}" class="accordion-collapse collapse" aria-labelledby="heading3-${id}">
                        <div class="accordion-body">
                            <fieldset class="p-3">
                              <div class="row mb-3">
                                <div class="col-md">
                                    <label class="form-label">Condition</label>
                                    <textarea class="form-control autosize" name="condition" value="${data.condition || ''}" placeholder="Enter a description of the manuscript's condition"></textarea>
                                    
                                </div>
                              </div>
                              <div class="row mb-3">
                                <div class="col-md-2">
                                    <label class="form-label">Hands</label>
                                    <input type="number" class="form-control" name="hands" value="${data.hands || ''}" min="1" step="1">
                                </div>
                                <div class="col-md">
                                    <label class="form-label">Font description</label>
                                    <input type="text" class="form-control lod-autocomplete" data-lod="getty-script" name="script" value="${data.script || ''}">
                                </div>
                                <div class="col-md">
                                  <label class="form-label">Material</label>
                                  <select class="form-select" name="material">
                                    <option value="">Please select</option>
                                    <option value="parchment" ${data.material === 'parchment' ? 'selected' : ''}>Parchment</option>
                                    <option value="paper" ${data.material === 'paper' ? 'selected' : ''}>Paper</option>
                                    <option value="papyrus" ${data.material === 'papyrus' ? 'selected' : ''}>Papyrus</option>
                                  </select>
                                </div>
                                <div class="col-md-2">
                                    <label class="form-label">Leaves</label>
                                    <input type="number" class="form-control" name="leaves" value="${data.leaves || ''}" min="1" step="1">
                                </div>
                              </div>
                                <div class="row mb-3">
                                    <div class="col-md">
                                        <label class="form-label">Height (cm)</label>
                                        <input type="number" class="form-control" name="height" value="${data.height || ''}" min="1">
                                    </div>
                                    <div class="col-md">
                                        <label class="form-label">Width (cm)</label>
                                        <input type="number" class="form-control" name="width" value="${data.width || ''}" min="1">
                                    </div>
                                    
                                    <div class="col-md">
                                        <label class="form-label">Columns</label>
                                        <input type="number" class="form-control" name="columns" value="${data.columns || ''}" min="0" step="1">
                                    </div>
                                    <div class="col-md">
                                        <label class="form-label">Lines</label>
                                        <input type="number" class="form-control" name="lines" value="${data.lines || ''}" min="1" step="1">
                                    </div>
                                </div>
                                
                            </fieldset>
                        </div>
                    </div>
                </div>

                <div class="accordion-item">
                    <h2 class="accordion-header" id="heading4-${id}">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse4-${id}" aria-expanded="false" aria-controls="collapse4-${id}">4. History</button>
                    </h2>
                    <div id="collapse4-${id}" class="accordion-collapse collapse" aria-labelledby="heading4-${id}">
                        <div class="accordion-body">
                            <fieldset class="p-3">
                                <div class="mb-3">
                                    <label class="form-label">Summary</label>
                                    <textarea class="form-control autosize" name="summaryProvenance" placeholder="Enter a description of the manuscript's history" value="${data.summaryProvenance || ''}"></textarea>
                                </div>
                            </fieldset>
                            <h6>Place of origin</h6>
                            <fieldset class="p-3">
                                <div class="row mb-3">
                                    <div class="col-md">
                                        <label class="form-label">Place of origin</label>
                                        <input type="text" class="form-control lod-autocomplete" data-lod="wikidata-place" name="origPlace" value="${data.origPlace || ''}">
                                    </div>
                                    <div class="col-md">
                                        <label class="form-label">Geographical coordinates</label>
                                        <input type="text" class="form-control geo-coord" name="geoOrigin"
                                        placeholder="Origin place's geo coordinates"
                                        data-error="Please enter in the format: 49.890972, 10.894102" value="${data.geoOrigin || ''}">
                                    </div>  
                                    <div class="col-md">
                                        <label class="form-label">Country</label>
                                        <input type="text" class="form-control" name="countryOrigin" value="${data.countryOrigin || ''}">
                                    </div>
                                    
                                       
                                </div>
                                <div class="row mb-3">                                                                     
                                    <div class="col-md">
                                      <label class="form-label">Earliest possible date of origin</label>
                                      <input type="text" class="form-control" name="dateOriginNotBefore" value="${data.dateOriginNotBefore || ''}">
                                    </div>
                                    <div class="col-md">
                                      <label class="form-label">Latest possible date of origin</label>
                                      <input type="text" class="form-control" name="dateOriginNotAfter" value="${data.dateOriginNotAfter || ''}">
                                    </div>
                                </div>
                            </fieldset>
                            
                            <h6>Provenance</h6>
                            <fieldset class="p-3">
                              <div class="provenance-container"></div>
                              <div class="d-flex justify-content-start">
                                <button type="button" class="btn btn-sm btn-outline-primary" onclick="addProvenanceItem(this)">Add Provenance</button>
                              </div>
                            </fieldset>
                        </div>
                    </div>
                </div>
                        
                <div class="accordion-item">
                    <h2 class="accordion-header" id="heading5-${id}">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse5-${id}" aria-expanded="false" aria-controls="collapse5-${id}">5. Surrogates and literature</button>
                    </h2>
                    <div id="collapse5-${id}" class="accordion-collapse collapse" aria-labelledby="heading5-${id}">
                        <div class="accordion-body">
                            <h6>Surrogates</h6>
                            <fieldset class="p-3">
                                <div class="row mb-3">
                                    <div class="col-md">
                                        <label class="form-label">Digital copy</label>
                                        <input type="url" class="form-control url-field" name="digi"
                                        placeholder="https://example.com"
                                        data-error="Please enter a valid URL (https://...)" value="${data.digi || ''}">
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div class="col-md">
                                        <label class="form-label">iiif Manifest</label>
                                        <input type="url" class="form-control url-field" name="iiifManifest"
                                        placeholder="https://example.com"
                                        data-error="Please enter a valid URL (https://...)" value="${data.iiifManifest || ''}">
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div class="col-md">
                                        <label class="form-label">Catalogue entry</label>
                                        <input type="url" class="form-control url-field" name="cat"
                                        placeholder="https://example.com"
                                        data-error="Please enter a valid URL (https://...)" value="${data.cat || ''}">
                                    </div>
                                </div>
                            </fieldset>

                            <h6>Literature references</h6>
                            <fieldset class="p-3">  
                                <div class="literature-container"></div>
                                <div class="d-flex justify-content-start">
                                    <button type="button" class="btn btn-sm btn-outline-primary" onclick="addLiteratureItem(this)">Add literature reference</button>
                                </div>
                            </fieldset>
                        </div>
                    </div>
                </div>
            </form>
        </div>

        <div class="mt-3 d-flex justify-content-between">
            <button type="button" class="btn btn-danger" onclick="deleteManuscriptForm(this)">Delete</button>
            <div>
                <button type="button" class="btn btn-outline-primary me-2" onclick="generateXML('${formId}')">XML preview</button>
                <button type="button" class="btn btn-success" onclick="downloadXML('${formId}')">Download XML</button>
            </div>
        </div>
    </div>
    `;
  container.appendChild(form);
  
  //  Scroll only if explicitly requested
  if (shouldScroll) {
    form.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return form
}

function addRespPerson(button) {
  const fieldset = button.closest('fieldset');
  const container = fieldset.querySelector('.resp-container');
  const index = container.children.length;

  const row = document.createElement('div');
  row.className = 'border rounded p-3 mb-3 bg-light';
  row.innerHTML = `
    <div class="row mb-2">
      <div class="col-md">
        <label class="form-label">Name</label>
        <input type="text" class="form-control" name="respStmtName-${index}">
      </div>
      <div class="col-md">
        <label class="form-label">Surname</label>
        <input type="text" class="form-control" name="respStmtSurname-${index}">
      </div>
      <div class="col-md">
        <label class="form-label">External identifier (ORCID, GND, etc.)</label>
        <input type="url" class="form-control" name="respStmtRef-${index}" placeholder="https://orcid.org/xxxx-xxxx-xxxx-xxxx">
      </div>
    </div>
    <div class="row mb-2">
      <div class="col-md">
        <label class="form-label">Affiliation</label>
        <input type="text" class="form-control lod-autocomplete" 
              data-lod="wikidata-place" 
              name="respStmtAffiliation-${index}" 
              placeholder="e.g. University of Oxford">
      </div>

      
    </div>

    <div class="d-flex justify-content-end align-item-end mt-3">
      <button type="button" class="btn btn-sm btn-danger" onclick="this.closest('.border').remove()">Delete</button>
    </div>
    `;
  container.appendChild(row);
}

function addMsItem(button, itemData = {}) {
  const container = button.closest('fieldset').querySelector('.msitem-container');
  const index = container.children.length;

  const block = document.createElement('div');
  block.className = 'border rounded p-3 mb-3 bg-light';
  block.innerHTML = `
    <div class="d-flex justify-content-between align-items-center mb-2">
      <strong>Content ${index + 1}</strong>
      <button type="button" class="btn btn-sm btn-danger" onclick="this.closest('.border').remove()">Delete</button>
    </div>

    <div class="row mb-2">
      <div class="col-md-6">
        <label class="form-label">Author</label>
        <input type="text" class="form-control lod-autocomplete" data-lod="wikidata-person" name="msItemAuthor-${index}" placeholder="Enter author" value="${itemData.author || ''}">
        <div class="form-check mt-1">
          <input class="form-check-input unknown-author-toggle" type="checkbox" id="unknownAuthor-${index}">
          <label class="form-check-label" for="unknownAuthor-${index}">
            Unknown or Anonymous Author
          </label>
        </div>
      </div>
      <div class="col-md-6">
        <label class="form-label">Title</label>
        <input type="text" class="form-control" name="msItemTitle-${index}" placeholder="Enter title" value="${itemData.title || ''}">
      </div>
    </div>

    <div class="mb-2">
      <label class="form-label">Page range</label>
      <div class="page-range-container"></div>
      <button type="button" class="btn btn-sm btn-outline-primary mt-2" onclick="addPageRange(this, ${index})">Add page range</button>
    </div>
    
    <div class="row mb-2">
      <div class="col-md">
        <label class="form-label">Incipit</label>
        <textarea class="form-control autosize" name="msItemIncipit-${index}" placeholder="Enter incipit">${itemData.incipit || ''}</textarea>
      </div>
    </div>
    <div class="row mb-2">
      <div class="col-md">
        <label class="form-label">Explicit</label>
        <textarea class="form-control autosize" name="msItemExplicit-${index}" placeholder="Enter explicit">${itemData.explicit || ''}</textarea>
      </div>
    </div>
    <div class="row mb-2">
      <div class="col-md-6">
        <label class="form-label">Textual family</label>
        <input type="text" class="form-control" name="msItemFamily-${index}" placeholder="Enter textual family" value="${itemData.textFamily || ''}">
      </div>
      <div class="col-md-6">
        <label class="form-label">Textual subfamily</label>
        <input type="text" class="form-control" name="msItemSubFamily-${index}" placeholder="Enter textual subfamily" value="${itemData.textSubFamily || ''}">
      </div> 
    </div>
    <div class="row mb-2">
      <div class="col-md-6">
        <label class="form-label">Text languge</label>
        <input type="text" class="form-control lod-autocomplete" data-lod="wikidata-lang" name="msItemLang-${index}" placeholder="Enter text language" value="${itemData.textLang || ''}">
      </div>
      <div class="col-md-6">
        <label class="form-label">Text genre</label>
        <input type="text" class="form-control" name="msItemGenre-${index}" placeholder="Enter text genre" value="${itemData.textGenre || ''}">
      </div>
    </div>
  `;
  
  container.appendChild(block);

  // Add toggle behavior
  const authorInput = block.querySelector(`[name="msItemAuthor-${index}"]`);
  const checkbox = block.querySelector(`#unknownAuthor-${index}`);

  checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
      // Pre-fill with Unknown
      authorInput.value = 'Unknown or Anonymous';
      authorInput.dataset.lodUri = 'https://www.wikidata.org/wiki/Q4233718';
      authorInput.disabled = true; // disable editing
    } else {
      // Re-enable normal lookup
      authorInput.value = '';
      delete authorInput.dataset.lodUri;
      authorInput.disabled = false;
    }
  });


  // Add initial page range
  // Add all page ranges
const rangeContainer = block.querySelector('.page-range-container');
if (itemData.pageRanges && itemData.pageRanges.length > 0) {
  itemData.pageRanges.forEach((range, rIndex) => {
    const div = document.createElement('div');
    div.className = 'row mb-2 align-items-end';
    div.innerHTML = `
      <div class="col-md-2">
        <input type="text" class="form-control" name="msItemPageFrom-${index}-${rIndex}" value="${range.from}" placeholder="From">
      </div>
      <div class="col-md-2">
        <input type="text" class="form-control" name="msItemPageTo-${index}-${rIndex}" value="${range.to}" placeholder="To">
      </div>
      <div class="col-md-2">
        <button type="button" class="btn btn-sm btn-outline-danger" onclick="this.closest('.row').remove()">Delete page range</button>
      </div>
    `;
    rangeContainer.appendChild(div);
  });
} else {
  // fallback to one empty input set if none given
  addPageRange({ closest: () => block }, index);
}

}

function addPageRange(button, msItemIndex, preset = []) {
  const container = button.closest('.border').querySelector('.page-range-container');
  const currentIndex = container.children.length;

  const fromValue = preset[currentIndex]?.from || '';
  const toValue = preset[currentIndex]?.to || '';

  const div = document.createElement('div');
  div.className = 'row mb-2 align-items-end';
  div.innerHTML = `
    <div class="col-md-2">
      <input type="text" class="form-control" name="msItemPageFrom-${msItemIndex}-${currentIndex}" value="${fromValue}" placeholder="From">
    </div>
    <div class="col-md-2">
      <input type="text" class="form-control" name="msItemPageTo-${msItemIndex}-${currentIndex}" value="${toValue}" placeholder="To">
    </div>
    <div class="col-md-2">
      <button type="button" class="btn btn-sm btn-outline-danger" onclick="this.closest('.row').remove()">Delete page range</button>
    </div>
  `;
  container.appendChild(div);
}

function addProvenanceItem(button, itemData = {}) {
  const fieldset = button.closest('fieldset');
  const container = fieldset.querySelector('.provenance-container');
  const index = container.children.length;

  const row = document.createElement('div');
  row.className = 'border rounded p-3 mb-3 bg-light';
  row.innerHTML = `
    <div class="d-flex justify-content-between align-items-center mb-2">
      <strong>Provenance ${index + 1}</strong>
      <button type="button" class="btn btn-sm btn-danger" onclick="this.closest('.border').remove()">Delete</button>
    </div>

    <div class="row mb-2">
      <div class="col-md">
        <label class="form-label">Previous owner</label>
        <div class="input-group">
          <input type="text" 
                 class="form-control lod-autocomplete col-md-8" 
                 data-lod="wikidata-generic" 
                 name="provName-${index}" 
                 value="${itemData.name || ''}">
          <select class="form-select col-md-4" name="provType-${index}">
            <option value="">Select type</option>
            <option value="org" ${itemData.type === 'org' ? 'selected' : ''}>Organisation</option>
            <option value="person" ${itemData.type === 'person' ? 'selected' : ''}>Person</option>
            <option value="place" ${itemData.type === 'place' ? 'selected' : ''}>Place</option>
          </select>
        </div>
      </div>
      
    </div>

    <div class="row mb-2">
      <div class="col-md">
        <label class="form-label">Period of ownership</label>
        <input type="text" class="form-control" name="provDate-${index}" value="${itemData.date || ''}">
      </div>
      <div class="col-md">
        <label class="form-label">Geographical coordinates</label>
        <input type="text" class="form-control geo-coord" name="provGeo-${index}" value="${itemData.geo || ''}">
      </div>
      <div class="col-md">
        <label class="form-label">Settlement</label>
        <input type="text" class="form-control lod-autocomplete" data-lod="wikidata-place" name="provSettlement-${index}" value="${itemData.settlement || ''}">
      </div>
      <div class="col-md">
        <label class="form-label">Country</label>
        <input type="text" class="form-control" name="provCountry-${index}" value="${itemData.country || ''}">
      </div>
    </div>
  `;

  container.appendChild(row);
}


function addLiteratureItem(button) {
  const fieldset = button.closest('fieldset');
  const container = fieldset.querySelector('.literature-container');
  const index = container.children.length;

  const block = document.createElement('div');
  block.className = 'border rounded p-3 mb-3 bg-light';
  block.innerHTML = `
    <div class="d-flex justify-content-between align-items-center mb-2">
      <strong>Literature ${index + 1}</strong>
      <button type="button" class="btn btn-sm btn-danger" onclick="this.closest('.border').remove()">Delete</button>
    </div>
    <div class="row mb-2">
        <div class="col-md-3">
            <label class="form-label">Type</label>
            <select class="form-select" name="biblType-${index}">
                <option value="">Please select</option>
                <option value="book">Book</option>
                <option value="journalArticle">Journal article</option>
                <option value="bookArticle">Book article</option>
                <option value="lexiconArticle">Lexicon article</option>
            </select>
        </div>
        <div class="col-md-3">
            <label class="form-label">Title</label>
            <input type="text" class="form-control" name="biblTitle-${index}">
        </div>
        <div class="col-md-3">
            <label class="form-label">Date</label>
            <input type="text" class="form-control" name="biblDate-${index}">
        </div>
        <div class="col-md-3">
            <label class="form-label">Cited pages</label>
            <input type="text" class="form-control" name="biblCited-${index}">
        </div>
    </div>
    <div class="bibl-author-container-${index}">
        <div class="row mb-2">
            <label class="form-label">Author(s)</label>
            <div class="col-md-5">
                <input type="text" class="form-control" name="biblAuthorForename-${index}-0" placeholder="Name">
            </div>
            <div class="col-md-5">
                <input type="text" class="form-control" name="biblAuthorSurname-${index}-0" placeholder="Surname">
            </div>
        </div>
    </div>
    <div class="d-flex justify-content-start mb-3">
        <button type="button" class="btn btn-sm btn-outline-primary" onclick="addBiblAuthor(this, ${index})">Add author</button>
    </div>
    <div class="bibl-editor-container-${index}">
        <div class="row mb-2">
            <div class="col-md-10">
                <label class="form-label">Editor</label>
                <input type="text" class="form-control" name="biblEditor-${index}-0" placeholder="Editor">
            </div>
        </div>
    </div>
    <div class="d-flex justify-content-start mb-3">
        <button type="button" class="btn btn-sm btn-outline-primary" onclick="addBiblEditor(this, ${index})">Add editor</button>
    </div>
    <div class="row mb-2">
        <div class="col-md-6">
            <label class="form-label">Publishing place</label>
            <input type="text" class="form-control" name="biblPlace-${index}">
        </div>
        <div class="col-md-6">
            <label class="form-label">Publisher</label>
            <input type="text" class="form-control" name="biblPublisher-${index}">
        </div>
    </div>
    <div class="row mb-2">
        <div class="col-md-12">
            <label class="form-label">Serie</label>
            <input type="text" class="form-control" name="biblSeries-${index}">
        </div>
    </div>
  `;
  container.appendChild(block);
}

function addBiblAuthor(button, biblIndex) {
  const container = document.querySelector(`.bibl-author-container-${biblIndex}`);
  const count = container.children.length;

  const newRow = document.createElement('div');
  newRow.className = 'row mb-2';
  newRow.innerHTML = `
    <div class="col-md-5">
        <input type="text" class="form-control" name="biblAuthorForename-${biblIndex}-${count}" placeholder="Name">
    </div>
    <div class="col-md-5">
        <input type="text" class="form-control" name="biblAuthorSurname-${biblIndex}-${count}" placeholder="Surname">
    </div>
    <div class="col-md-2">
        <button type="button" class="btn btn-sm btn-outline-danger" onclick="this.closest('.row').remove()">Delete</button>
    </div>
  `;
  container.appendChild(newRow);
}

function addBiblEditor(button, biblIndex) {
  const container = document.querySelector(`.bibl-editor-container-${biblIndex}`);
  const count = container.children.length;

  const newRow = document.createElement('div');
  newRow.className = 'row mb-2';
  newRow.innerHTML = `
    <div class="col-md-10">
        <input type="text" class="form-control" name="biblEditor-${biblIndex}-${count}" placeholder="Editor">
    </div>
    <div class="col-md-2">
        <button type="button" class="btn btn-sm btn-outline-danger" onclick="this.closest('.row').remove()">Delete</button>
    </div>
  `;
  container.appendChild(newRow);
}

function getFormData(formId) {
  const form = document.getElementById(formId);
  const data = {};

  //First, get all basic (non-LOD) fields as plain text
  Array.from(form.elements).forEach(el => {
    if (
      el.name &&
      !el.name.startsWith('respStmt') &&
      !el.name.startsWith('msItem') &&
      !el.name.startsWith('bibl') &&
      !el.name.startsWith('prov') //skip raw provenance fields
    ) {
      data[el.name] = el.value;
    }
  });

  //Now override LOD-aware fields with {value, uri}
  data.repository      = getFieldValueAndUri(form, 'repository');
  data.settlementIdent = getFieldValueAndUri(form, 'settlementIdent');
  data.countryIdent    = getFieldValueAndUri(form, 'countryIdent');
  data.origPlace       = getFieldValueAndUri(form, 'origPlace');
  data.countryOrigin   = getFieldValueAndUri(form, 'countryOrigin');
  data.script          = getFieldValueAndUri(form, 'script');

  //Responsible persons (standardized affiliation)
  const persons = [];
  let i = 0;
  while (true) {
    const name = form.querySelector(`[name="respStmtName-${i}"]`);
    const surname = form.querySelector(`[name="respStmtSurname-${i}"]`);
    const affilField = form.querySelector(`[name="respStmtAffiliation-${i}"]`);

    if (!name || !surname || !affilField) break;

    const refField = form.querySelector(`[name="respStmtRef-${i}"]`);
    const ref = refField ? refField.value : '';

    //Standardize affiliation as { value, uri }
    const affiliation = getFieldValueAndUri(form, `respStmtAffiliation-${i}`);

    persons.push({
      name: name.value,
      surname: surname.value,
      affiliation: affiliation, // now { value, uri }
      ref: ref
    });

    i++;
  }
  data.responsiblePersons = persons;

  //msItems with pageRanges
  const items = [];
  let j = 0;
  while (true) {
    const author = form.querySelector(`[name="msItemAuthor-${j}"]`);
    if (!author) break;

    const pageRanges = [];
    let r = 0;
    while (true) {
      const fromInput = form.querySelector(`[name="msItemPageFrom-${j}-${r}"]`);
      const toInput = form.querySelector(`[name="msItemPageTo-${j}-${r}"]`);
      if (!fromInput || !toInput) break;
      pageRanges.push({ from: fromInput.value.trim(), to: toInput.value.trim() });
      r++;
    }

    items.push({
      author: getFieldValueAndUri(form, `msItemAuthor-${j}`),
      title: form.querySelector(`[name="msItemTitle-${j}"]`)?.value || '',
      textLang: getFieldValueAndUri(form, `msItemLang-${j}`),
      incipit: form.querySelector(`[name="msItemIncipit-${j}"]`)?.value || '',
      explicit: form.querySelector(`[name="msItemExplicit-${j}"]`)?.value || '',
      textFamily: form.querySelector(`[name="msItemFamily-${j}"]`)?.value || '',
      textSubFamily: form.querySelector(`[name="msItemSubFamily-${j}"]`)?.value || '',
      textGenre: form.querySelector(`[name="msItemGenre-${j}"]`)?.value || '',
      pageRanges: pageRanges
    });

    j++;
  }
  data.msItems = items;

  //Provenance entries (only structured, no provName-0 duplication)
  const provenance = [];
  let p = 0;
  while (true) {
    const name = form.querySelector(`[name="provName-${p}"]`);
    if (!name) break;

    provenance.push({
      name: getFieldValueAndUri(form, `provName-${p}`),
      type: form.querySelector(`[name="provType-${p}"]`)?.value || '',
      date: form.querySelector(`[name="provDate-${p}"]`)?.value || '',
      geo: form.querySelector(`[name="provGeo-${p}"]`)?.value || '',
      settlement: getFieldValueAndUri(form, `provSettlement-${p}`),
      country: getFieldValueAndUri(form, `provCountry-${p}`)
    });

    p++;
  }
  data.provenance = provenance;

  //Literature
  const literature = [];
  let b = 0;
  while (true) {
    const type = form.querySelector(`[name="biblType-${b}"]`);
    if (!type) break;

    const bibl = {
      type: type.value,
      title: form.querySelector(`[name="biblTitle-${b}"]`)?.value || '',
      date: form.querySelector(`[name="biblDate-${b}"]`)?.value || '',
      citedRange: form.querySelector(`[name="biblCited-${b}"]`)?.value || '',
      publisher: form.querySelector(`[name="biblPublisher-${b}"]`)?.value || '',
      pubPlace: form.querySelector(`[name="biblPlace-${b}"]`)?.value || '',
      series: form.querySelector(`[name="biblSeries-${b}"]`)?.value || '',
      authors: [],
      editors: []
    };

    let a = 0;
    while (true) {
      const forename = form.querySelector(`[name="biblAuthorForename-${b}-${a}"]`);
      const surname = form.querySelector(`[name="biblAuthorSurname-${b}-${a}"]`);
      if (!forename || !surname) break;
      bibl.authors.push({ forename: forename.value, surname: surname.value });
      a++;
    }

    let e = 0;
    while (true) {
      const ed = form.querySelector(`[name="biblEditor-${b}-${e}"]`);
      if (!ed) break;
      bibl.editors.push(ed.value);
      e++;
    }

    literature.push(bibl);
    b++;
  }
  data.literature = literature;

  return data;
}


function restoreLODField(form, fieldName, fieldData) {
  const input = form.querySelector(`[name="${fieldName}"]`);
  if (!input) return;

  if (fieldData && typeof fieldData === 'object' && 'value' in fieldData) {
    input.value = fieldData.value;
    if (fieldData.uri) {
      input.dataset.lodUri = fieldData.uri;

      // Show badge with link
      let badge = input.parentNode.querySelector('.lod-link');
      if (!badge) {
        badge = document.createElement('small');
        badge.className = 'lod-link text-muted d-block';
        input.insertAdjacentElement('afterend', badge);
      }
      const sourceLabel = fieldData.uri.includes('wikidata.org') ? 'Wikidata' : 'LOD Source';
      badge.innerHTML = `
        <a href="${fieldData.uri}" target="_blank" title="Open corresponding ${sourceLabel} link" class="btn pt-0 pe-1" role="button" style="color: blue;">
          <i class="fa-solid fa-arrow-up-right-from-square"></i>
        </a>
        <button type="button" class="btn btn-lg btn-link text-danger lod-clear-btn ps-0 pt-0" title="Remove ${sourceLabel}">
          <i class="fa-solid fa-square-xmark"></i>
        </button>
      `;

      badge.querySelector('.lod-clear-btn').addEventListener('click', () => {
        delete input.dataset.lodUri;   
        input.value = '';              
        badge.remove();                
      });
    }
  } else if (typeof fieldData === 'string') {
    // legacy
    input.value = fieldData;
  }
}



function escapeXml(str) {
  if (typeof str !== 'string') str = JSON.stringify(str);
  return str?.replace(/[<>&'"]/g, c => ({
    '<': '&lt;', '>': '&gt;', '&': '&amp;', '\'': '&apos;', '"': '&quot;'
  }[c])) || '';
}

function deleteManuscriptForm(button) {
  const accordion = button.closest('.accordion');
  if (accordion) {
    accordion.remove();
  }
}


function getFieldValueAndUri(form, name) {
  const field = form.querySelector(`[name="${name}"]`);
  if (!field) return { value: '', uri: '' };
  return { value: field.value.trim(), uri: field.dataset.lodUri || '' };
}



function xmlWithRef(tag, fieldData) {
  if (!fieldData.value) return '';
  if (fieldData.uri) return `<${tag} ref="${escapeXml(fieldData.uri)}">${escapeXml(fieldData.value)}</${tag}>`;
  return `<${tag}>${escapeXml(fieldData.value)}</${tag}>`;
}

function buildXML(data, formId) {
  const form = document.getElementById(formId);
  
  // Fetch LOD-aware fields
  const repo = getFieldValueAndUri(form, 'repository');
  const origPlace = getFieldValueAndUri(form, 'origPlace');
  const provPlace = getFieldValueAndUri(form, 'settlementProvenance');
  const scriptField = getFieldValueAndUri(form, 'script');

  const settlementIdentField = getFieldValueAndUri(form, 'settlementIdent');
  const countryIdentField = getFieldValueAndUri(form, 'countryIdent');
  const countryOriginField = getFieldValueAndUri(form, 'countryOrigin');

  
  return `<?xml version="1.0" encoding="UTF-8"?>
<TEI xmlns="http://www.tei-c.org/ns/1.0">
  <teiHeader>
    <fileDesc>
      <titleStmt>
        <title type="main">${escapeXml(data.msTitle)}</title>
        ${data.responsiblePersons.map(p => `
        <respStmt${p.ref ? ` ref="${escapeXml(p.ref)}"` : ''}>
          <persName>
            <forename>${escapeXml(p.name)}</forename>
            <surname>${escapeXml(p.surname)}</surname>
            <affiliation${p.affiliation.uri ? ` ref="${escapeXml(p.affiliation.uri)}"` : ''}>${escapeXml(p.affiliation.value)}</affiliation>
          </persName>
        </respStmt>`).join('\n')}
      </titleStmt>
      <publicationStmt>
        <availability>
          <p>${escapeXml(data.publicationStmt)}</p>
        </availability>
      </publicationStmt>
      <sourceDesc>
        <msDesc>
          <msIdentifier>
            ${xmlWithRef('repository', repo)}
            <geo>${escapeXml(data.geoRepository)}</geo>
            ${xmlWithRef('settlement', settlementIdentField)}
            ${xmlWithRef('country', countryIdentField)}

            <collection><idno type="shelfmark">${escapeXml(data.idno)}</idno></collection>
            <msName type="sigle">${escapeXml(data.msSigle)}</msName>
            <altIdentifier><idno>${escapeXml(data.altIdentifier)}</idno></altIdentifier>
            <msName type="full">${escapeXml(data.msName)}</msName>
          </msIdentifier>
          <msContents>
            <summary>${escapeXml(data.summaryContents)}</summary>
            ${(data.msItems || []).map((item, idx) => {
              const authorField = getFieldValueAndUri(form, `msItemAuthor-${idx}`);
              const langField = getFieldValueAndUri(form, `msItemLang-${idx}`);
              return `
            <msItem>
              ${xmlWithRef('author', authorField)}
              <title>${escapeXml(item.title)}</title>
              <locusGrp>
                ${(item.pageRanges || []).map(pr => `<locus from="${escapeXml(pr.from)}" to="${escapeXml(pr.to)}"/>`).join('\n')}
              </locusGrp>
              ${xmlWithRef('textLang', langField)}
              <incipit>${escapeXml(item.incipit)}</incipit>
              <explicit>${escapeXml(item.explicit)}</explicit>
              <note type="textual-family">${escapeXml(item.textFamily)}</note>
              <note type="textual-subfamily">${escapeXml(item.textSubFamily)}</note>
              <note type="text-genre">${escapeXml(item.textGenre)}</note>
            </msItem>`;}).join('\n')}
          </msContents>
          <physDesc>
            <objectDesc>
              <supportDesc material="${escapeXml(data.material)}">
                <extent>
                  <dimensions>
                    <height quantity="${escapeXml(data.height)}" unit="cm"/>
                    <width quantity="${escapeXml(data.width)}" unit="cm"/>
                  </dimensions>
                  <measure quantity="${escapeXml(data.leaves)}"/>
                </extent>
                <condition>${escapeXml(data.condition)}</condition>
              </supportDesc>
              <layoutDesc>
                <layout columns="${escapeXml(data.columns)}" writtenLines="${escapeXml(data.lines)}"/>
              </layoutDesc>
            </objectDesc>
            <handDesc>
              <summary>${escapeXml(data.hands)}</summary>
            </handDesc>
            <scriptDesc>
              ${xmlWithRef('scriptNote', scriptField)}
            </scriptDesc>
          </physDesc>
          <history>
            <summary>${escapeXml(data.summaryProvenance)}</summary>
            <origin>
              ${xmlWithRef('origPlace', origPlace)}
              <geo>${escapeXml(data.geoOrigin)}</geo>
              ${xmlWithRef('country', countryOriginField)}
              <origDate notBefore="${escapeXml(data.dateOriginNotBefore)}" notAfter="${escapeXml(data.dateOriginNotAfter)}"></origDate>
            </origin>
            
            ${(data.provenance || []).map((prov, i) => {
              const provSettlementField = getFieldValueAndUri(form, `provSettlement-${i}`);
              const provCountryField = getFieldValueAndUri(form, `provCountry-${i}`);
              return `
            <provenance>
              ${prov.type 
                ? `<name type="${escapeXml(prov.type)}"${prov.name?.uri ? ` ref="${escapeXml(prov.name.uri)}"` : ''}>${escapeXml(prov.name.value)}</name>`
                : xmlWithRef('name', prov.name)}
              <date when="${escapeXml(prov.date)}"></date>
              <geo>${escapeXml(prov.geo)}</geo>
              ${xmlWithRef('settlement', provSettlementField)}
              ${xmlWithRef('country', provCountryField)}
            </provenance>`;
            }).join('\n')}
          </history>
          <additional>
            <surrogates> 
              <bibl type="digi"> 
                <title xml:lang="ger">Digitalisat</title>
                <ref>${escapeXml(data.digi)}</ref>
              </bibl> 
              <bibl type="iiif-manifest"> 
                <title xml:lang="ger">iiif-Manifest</title>
                <ref>${escapeXml(data.iiifManifest)}</ref>
              </bibl> 
              <bibl type="cat"> 
                <title xml:lang="ger">Katalogisat</title>
                <ref>${escapeXml(data.cat)}</ref>
              </bibl>
            </surrogates>
            ${(data.literature || []).map(lit => `
            <bibl type="${escapeXml(lit.type)}">
              ${(lit.authors || []).map(a => `
              <author>
                <surname>${escapeXml(a.surname)}</surname>
                <forename>${escapeXml(a.forename)}</forename>
              </author>`).join('')}
              ${(lit.editors || []).map(e => `<editor>${escapeXml(e)}</editor>`).join('')}
              <title>${escapeXml(lit.title)}</title>
              <pubPlace>${escapeXml(lit.pubPlace)}</pubPlace>
              <publisher>${escapeXml(lit.publisher)}</publisher>
              <series>${escapeXml(lit.series)}</series>
              <date when="${escapeXml(lit.date)}"></date>
              <citedRange>${escapeXml(lit.citedRange)}</citedRange>
            </bibl>`).join('\n')}
          </additional>
        </msDesc>
      </sourceDesc>
    </fileDesc>
  </teiHeader>
  <text><body><p></p></body></text>
</TEI>`;
}


function generateXML(formId) {
  const data = getFormData(formId);
   const xml = buildXML(data, formId); 
  // Open modal
  document.getElementById('modalXmlContent').textContent = xml;
  const modal = new bootstrap.Modal(document.getElementById('xmlModal'));
  modal.show();

  return xml;
}

function downloadXML(formId) {
  const data = getFormData(formId);
  const xmlContent = buildXML(data, formId);
  const blob = new Blob([xmlContent], { type: 'application/xml' });

  const form = document.getElementById(formId);
  const titleInput = form.querySelector('[name="msTitle"]');
  const filename = (titleInput?.value?.trim() || 'manuscript').replace(/[\\/:*?"<>|]/g, '_');

  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `${filename}.xml`;
  a.click();
}


function buildCombinedFileName(all) {
  const titles = all.map(row => row.msTitle?.trim() || 'Untitled');
  return titles.join('_').replace(/[\\/:*?"<>|]/g, '_');
}

document.getElementById('downloadAllJSON').addEventListener('click', () => {
  const all = [...document.querySelectorAll('.msForm')].map(f => getFormData(f.id));
  const fileBase = buildCombinedFileName(all);
  downloadFile(`${fileBase}.json`, JSON.stringify(all, null, 2), 'application/json');
});

/*document.getElementById('downloadAllCSV').addEventListener('click', () => {
  const all = [...document.querySelectorAll('.msForm')].map(f => getFormData(f.id));
  const headers = [];
  const firstRow = all[0] || {};

  for (const key in firstRow) {
    if (typeof firstRow[key] === 'object' && firstRow[key] !== null && 'value' in firstRow[key] && 'uri' in firstRow[key]) {
      headers.push(`${key}_value`, `${key}_uri`);
    } else {
      headers.push(key);
    }
  }

  const csv = [headers.join(',')].concat(
    all.map(row =>
      headers.map(h => {
        const baseKey = h.replace(/_(value|uri)$/, '');
        const isUri = h.endsWith('_uri');
        if (row[baseKey] && typeof row[baseKey] === 'object' && 'value' in row[baseKey]) {
          return `"${(isUri ? row[baseKey].uri : row[baseKey].value).replace(/"/g, '""')}"`;
        } else {
          return `"${(row[h] || '').toString().replace(/"/g, '""')}"`;
        }
      }).join(',')
    )
  ).join('\n');

  const fileBase = buildCombinedFileName(all);
  downloadFile(`${fileBase}.csv`, csv, 'text/csv');
});

document.getElementById('downloadAllRDF').addEventListener('click', () => {
  const all = [...document.querySelectorAll('.msForm')].map(f => getFormData(f.id));
  let rdf = `<?xml version="1.0"?>\n<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">\n`;
  all.forEach((row, i) => {
    rdf += `  <rdf:Description rdf:about="http://example.org/manuscript/${i + 1}">\n`;
    for (const key in row) {
      if (row[key] && typeof row[key] === 'object' && 'value' in row[key] && 'uri' in row[key]) {
          rdf += `    <${key} rdf:resource="${escapeXml(row[key].uri)}">${escapeXml(row[key].value)}</${key}>\n`;
        } else {
          rdf += `    <${key}>${escapeXml(row[key])}</${key}>\n`;
        }
    }
    rdf += `  </rdf:Description>\n`;
  });
  rdf += '</rdf:RDF>';
  const fileBase = buildCombinedFileName(all);
  downloadFile(`${fileBase}.rdf`, rdf, 'application/rdf+xml');
});
*/

function downloadFile(filename, content, type) {
  const blob = new Blob([content], { type });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
}

// Upload
document.getElementById('fileUpload').addEventListener('change', function (e) {
  const file = e.target.files[0];
  if (!file.name.endsWith('.json') && !file.name.endsWith('.xml')) {
    alert('Only XML and JSON files are allowed.');
    return;
  }
  const reader = new FileReader();
  reader.onload = function (event) {
    let rawContent = event.target.result;
    let content = rawContent.replace(/\s+/g, ' ');
    
    if (file.name.endsWith('.json')) {
      try {
        const data = JSON.parse(content);

        const records = Array.isArray(data) ? data : [data];
        records.forEach((rec, i) => {
          const formElement = i === 0 && container.children.length > 0
            ? container.children[0]
            : addManuscriptForm(rec); //fallback to existing or new

          const form = formElement.querySelector('.msForm');
          if (!form) throw new Error("No form element found for JSON injection");


            //Update accordion title
            const title = rec.msTitle?.trim() || `Manuscript ${i + 1}`;
            formElement.querySelector('h4').textContent = title;


          // Fill base fields
            Object.entries(rec).forEach(([key, value]) => {
              // Check if it's a LOD field
              if (value && typeof value === 'object' && 'value' in value && 'uri' in value) {
                restoreLODField(form, key, value);
              } else if (
                typeof value !== 'object' &&
                !key.startsWith('msItem') &&
                !key.startsWith('respStmt') &&
                !key.startsWith('bibl')
              ) {
                const input = form.querySelector(`[name="${key}"]`);
                if (input) input.value = value;
              }
            });


            
          // Restore responsible persons
          const respButton = formElement.querySelector('.resp-container + .d-flex button');
          if (rec.responsiblePersons) {
            rec.responsiblePersons.forEach((p, index) => {
              addRespPerson(respButton);
              const row = formElement.querySelector('.resp-container').children[index];
              row.querySelector(`[name="respStmtName-${index}"]`).value = p.name || '';
              row.querySelector(`[name="respStmtSurname-${index}"]`).value = p.surname || '';
              restoreLODField(row, `respStmtAffiliation-${index}`, p.affiliation);
              row.querySelector(`[name="respStmtRef-${index}"]`).value = p.ref || '';
            });
          }

          // Restore msItems
          const itemButton = formElement.querySelector('button[onclick*="addMsItem"]');
            if (rec.msItems) {
              rec.msItems.forEach((item, idx) => {
                addMsItem(itemButton, item);

                const msRow = formElement.querySelector('.msitem-container').children[idx];

                //Restore author {value, uri}
                restoreLODField(msRow, `msItemAuthor-${idx}`, item.author);

                //Restore textLang {value, uri}
                restoreLODField(msRow, `msItemLang-${idx}`, item.textLang);
              });
            }
          
          //Restore provenance items
          const provButton = formElement.querySelector('.provenance-container + .d-flex button');
          if (rec.provenance) {
            rec.provenance.forEach((prov, i) => {
              addProvenanceItem(provButton, prov);

              const provRow = formElement.querySelector('.provenance-container').children[i];

              //Name with { value, uri }
              restoreLODField(provRow, `provName-${i}`, prov.name);

              //Plain text fields
              provRow.querySelector(`[name="provType-${i}"]`).value = prov.type || '';
              provRow.querySelector(`[name="provDate-${i}"]`).value = prov.date || '';
              provRow.querySelector(`[name="provGeo-${i}"]`).value = prov.geo || '';

              //Settlement / Country with { value, uri }
              restoreLODField(provRow, `provSettlement-${i}`, prov.settlement);
              restoreLODField(provRow, `provCountry-${i}`, prov.country);
            });
          }


          //Restore literature items
          const litButton = formElement.querySelector('.literature-container + .d-flex button');
          if (rec.literature) {
            rec.literature.forEach((bibl, bIndex) => {
              addLiteratureItem(litButton);
              const litContainer = formElement.querySelector(`.literature-container`).children[bIndex];

              litContainer.querySelector(`[name="biblType-${bIndex}"]`).value = bibl.type || '';
              litContainer.querySelector(`[name="biblTitle-${bIndex}"]`).value = bibl.title || '';
              litContainer.querySelector(`[name="biblDate-${bIndex}"]`).value = bibl.date || '';
              litContainer.querySelector(`[name="biblCited-${bIndex}"]`).value = bibl.citedRange || '';
              litContainer.querySelector(`[name="biblPlace-${bIndex}"]`).value = bibl.pubPlace || '';
              litContainer.querySelector(`[name="biblPublisher-${bIndex}"]`).value = bibl.publisher || '';
              litContainer.querySelector(`[name="biblSeries-${bIndex}"]`).value = bibl.series || '';

              // Restore authors
              const authorContainer = litContainer.querySelector(`.bibl-author-container-${bIndex}`);
              (bibl.authors || []).forEach((a, i) => {
                if (i > 0) addBiblAuthor(litContainer.querySelector(`[onclick*="addBiblAuthor"]`), bIndex);
                const authorRow = authorContainer.children[i];
                authorRow.querySelector(`[name="biblAuthorForename-${bIndex}-${i}"]`).value = a.forename || '';
                authorRow.querySelector(`[name="biblAuthorSurname-${bIndex}-${i}"]`).value = a.surname || '';
              });

              // Restore editors
              const editorContainer = litContainer.querySelector(`.bibl-editor-container-${bIndex}`);
              (bibl.editors || []).forEach((e, i) => {
                if (i > 0) addBiblEditor(litContainer.querySelector(`[onclick*="addBiblEditor"]`), bIndex);
                const editorRow = editorContainer.children[i];
                editorRow.querySelector(`[name="biblEditor-${bIndex}-${i}"]`).value = e || '';
              });
            });
          }

        });
      } catch (err) {
        alert('Invalid JSON:\n' + err.message); //show the  issue
        console.error("Invalid JSON:", err);
      }
    }

    else if (file.name.endsWith('.xml')) {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(content, "application/xml");

      const get = sel => xmlDoc.querySelector(sel)?.textContent || '';
      const getAttr = (sel, attr) => xmlDoc.querySelector(sel)?.getAttribute(attr) || '';


      // Library
      const repoEl = xmlDoc.querySelector("msIdentifier > repository");
      const settlementEl = xmlDoc.querySelector("msIdentifier > settlement");
      const countryEl = xmlDoc.querySelector("msIdentifier > country");

      const repository = repoEl
        ? { value: repoEl.textContent.trim(), uri: repoEl.getAttribute("ref") || "" }
        : { value: "", uri: "" };

      const settlementIdent = settlementEl
        ? { value: settlementEl.textContent.trim(), uri: settlementEl.getAttribute("ref") || "" }
        : { value: "", uri: "" };

      const countryIdent = countryEl
        ? { value: countryEl.textContent.trim(), uri: countryEl.getAttribute("ref") || "" }
        : { value: "", uri: "" };

      const geoRepository = xmlDoc.querySelector("msIdentifier > geo")?.textContent.trim() || "";

      //Script
      const scriptEl = xmlDoc.querySelector("scriptNote");
      const script = scriptEl
        ? { value: scriptEl.textContent.trim(), uri: scriptEl.getAttribute("ref") || "" }
        : { value: "", uri: "" };


      //Place of origin
      const origPlaceEl = xmlDoc.querySelector("origin > origPlace");
      const countryOriginEl = xmlDoc.querySelector("origin > country");

      const origPlace = origPlaceEl
        ? { value: origPlaceEl.textContent.trim(), uri: origPlaceEl.getAttribute("ref") || "" }
        : { value: "", uri: "" };

      const countryOrigin = countryOriginEl
        ? { value: countryOriginEl.textContent.trim(), uri: countryOriginEl.getAttribute("ref") || "" }
        : { value: "", uri: "" };

      const geoOrigin = xmlDoc.querySelector("origin > geo")?.textContent.trim() || "";


      //Provenance
      const provenance = [];
      xmlDoc.querySelectorAll("provenance").forEach(prov => {
        const nameEl = prov.querySelector("name");
        const settlementEl = prov.querySelector("settlement");
        const countryEl = prov.querySelector("country");

        provenance.push({
          name: nameEl
            ? { value: nameEl.textContent.trim(), uri: nameEl.getAttribute("ref") || "" }
            : { value: "", uri: "" },
          type: nameEl?.getAttribute("type") || "",
          date: prov.querySelector("date")?.getAttribute("when") || "",
          geo: prov.querySelector("geo")?.textContent.trim() || "",
          settlement: settlementEl
            ? { value: settlementEl.textContent.trim(), uri: settlementEl.getAttribute("ref") || "" }
            : { value: "", uri: "" },
          country: countryEl
            ? { value: countryEl.textContent.trim(), uri: countryEl.getAttribute("ref") || "" }
            : { value: "", uri: "" }
        });
      });




      const data = {
        // Accordion 1
        msTitle: get("title"),
        publicationStmt: get("publicationStmt p"),

        repository,
        geoRepository,
        settlementIdent,
        countryIdent,

        idno: get("idno[type='shelfmark']"),
        altIdentifier: get("altIdentifier idno"),
        msSigle: get("msName[type='sigle']"),
        msName: get("msName[type='full']"),

        // Accordion 2 
        summaryContents: get("msContents > summary"),
        msItems: [],

        // Accordion 3 
        material: xmlDoc.querySelector("supportDesc")?.getAttribute("material") || '',
        height: getAttr("dimensions > height", "quantity"),
        width: getAttr("dimensions > width", "quantity"),
        leaves: getAttr("extent > measure", "quantity"),
        condition: get("condition"),
        columns: getAttr("layout", "columns"),
        lines: getAttr("layout", "writtenLines"),
        hands: get("handDesc > summary"),
        script,


        // Accordion 4 
        summaryProvenance: get("history > summary"),

        origPlace,
        geoOrigin,
        countryOrigin,
        dateOriginNotBefore: getAttr("origin > origDate", "notBefore"),
        dateOriginNotAfter: getAttr("origin > origDate", "notAfter"),
        
        provenance,


        // Accordion 5 
        digi: get("bibl[type='digi'] ref"),
        iiifManifest: get("bibl[type='iiif-manifest'] ref"),
        cat: get("bibl[type='cat'] ref"),
        literature: [],

        // Other
        responsiblePersons: []
      };

      // Responsible persons
      xmlDoc.querySelectorAll("respStmt").forEach(resp => {
        const respRef = resp.getAttribute("ref") || ''; // external identifier URL
        const affilEl = resp.querySelector("affiliation");

        data.responsiblePersons.push({
          name: resp.querySelector("forename")?.textContent || '',
          surname: resp.querySelector("surname")?.textContent || '',
          affiliation: {
            value: affilEl?.textContent || '',
            uri: affilEl?.getAttribute("ref") || ''
          },
          ref: respRef // store external identifier URL
        });
      });


      // msItems (Inhalt)
      xmlDoc.querySelectorAll("msItem").forEach(item => {
        const pageRanges = [];
        item.querySelectorAll("locusGrp locus").forEach(locus => {
          pageRanges.push({
            from: locus.getAttribute("from") || '',
            to: locus.getAttribute("to") || ''
          });
        });


        data.msItems.push({
          author: {
            value: item.querySelector("author")?.textContent || '',
            uri: item.querySelector("author")?.getAttribute("ref") || ''
          },
          title: item.querySelector("title")?.textContent || '',
          pageRanges,
          textLang: {
            value: item.querySelector("textLang")?.textContent || '',
            uri: item.querySelector("textLang")?.getAttribute("ref") || ''
          },
          incipit: item.querySelector("incipit")?.textContent || '',
          explicit: item.querySelector("explicit")?.textContent || '',
          textFamily: item.querySelector("note[type='textual-family']")?.textContent || '',
          textSubFamily: item.querySelector("note[type='textual-subfamily']")?.textContent || '',
          textGenre: item.querySelector("note[type='text-genre']")?.textContent || ''
        });

      });

      // Literature entries
      xmlDoc.querySelectorAll("bibl").forEach(bibl => {
        const type = bibl.getAttribute("type") || '';
        if (["digi", "iiif-manifest", "cat"].includes(type)) return;

        const authors = [...bibl.querySelectorAll("author")].map(a => ({
          forename: a.querySelector("forename")?.textContent || '',
          surname: a.querySelector("surname")?.textContent || ''
        }));

        const editors = [...bibl.querySelectorAll("editor")].map(e => e.textContent || '');

        data.literature.push({
          type,
          title: bibl.querySelector("title")?.textContent || '',
          date: bibl.querySelector("date")?.getAttribute("when") || '',
          citedRange: bibl.querySelector("citedRange")?.textContent || '',
          pubPlace: bibl.querySelector("pubPlace")?.textContent || '',
          publisher: bibl.querySelector("publisher")?.textContent || '',
          series: bibl.querySelector("series")?.textContent || '',
          authors,
          editors
        });
      });

      // Inject into form
      const formElement = container.children[0];
      const form = formElement.querySelector('.msForm');

      form.reset();
      form.querySelector('.resp-container').innerHTML = '';
      form.querySelector('.msitem-container').innerHTML = '';
      form.querySelector('.literature-container').innerHTML = '';

      const title = data.msTitle?.trim() || 'Manuscript';
    formElement.querySelector('h4').textContent = title;

      Object.entries(data).forEach(([key, value]) => {
        if (typeof value !== 'object') {
          const input = form.querySelector(`[name="${key}"]`);
          if (input) input.value = value;
        }
      }
    
    );

      // Responsible persons
      const respButton = formElement.querySelector('.resp-container + .d-flex button');
        data.responsiblePersons.forEach((p, i) => {
          addRespPerson(respButton);
          const row = formElement.querySelector('.resp-container').children[i];
          row.querySelector(`[name="respStmtName-${i}"]`).value = p.name;
          row.querySelector(`[name="respStmtSurname-${i}"]`).value = p.surname;

          //restore affiliation label
          row.querySelector(`[name="respStmtAffiliation-${i}"]`).value = p.affiliation.value || p.affiliation;

          //restore affiliation URI badge
          if (typeof p.affiliation === 'object') {
            restoreLODField(row, `respStmtAffiliation-${i}`, p.affiliation);
          }

          //restore external identifier (ORCID/GND URL)
          row.querySelector(`[name="respStmtRef-${i}"]`).value = p.ref || '';
        });

      //Library
      restoreLODField(form, "repository", data.repository);
      restoreLODField(form, "settlementIdent", data.settlementIdent);
      restoreLODField(form, "countryIdent", data.countryIdent);
      form.querySelector('[name="geoRepository"]').value = data.geoRepository;


      //Restore msItems
      const itemButton = formElement.querySelector('button[onclick*="addMsItem"]');
      data.msItems.forEach((item, idx) => {
        addMsItem(itemButton, item);

        const msRow = formElement.querySelector('.msitem-container').children[idx];
        restoreLODField(msRow, `msItemAuthor-${idx}`, item.author);
        restoreLODField(msRow, `msItemLang-${idx}`, item.textLang);
      });

      //Restore script
      restoreLODField(form, "script", data.script);

      //Restore place of origin
      restoreLODField(form, "origPlace", data.origPlace);
      restoreLODField(form, "countryOrigin", data.countryOrigin);
      form.querySelector('[name="geoOrigin"]').value = data.geoOrigin;

      // Restore provenance
      const provButton = formElement.querySelector('.provenance-container + .d-flex button');
      data.provenance.forEach((prov, i) => {
        addProvenanceItem(provButton, prov);

        const provRow = formElement.querySelector('.provenance-container').children[i];

        restoreLODField(provRow, `provName-${i}`, prov.name);
        provRow.querySelector(`[name="provType-${i}"]`).value = prov.type || '';
        provRow.querySelector(`[name="provDate-${i}"]`).value = prov.date || '';
        provRow.querySelector(`[name="provGeo-${i}"]`).value = prov.geo || '';
        restoreLODField(provRow, `provSettlement-${i}`, prov.settlement);
        restoreLODField(provRow, `provCountry-${i}`, prov.country);
      });



      // Literature
      const litButton = formElement.querySelector('button[onclick*="addLiteratureItem"]');
      data.literature.forEach((bibl, bIndex) => {
        addLiteratureItem(litButton);
        const litContainer = formElement.querySelector('.literature-container').children[bIndex];

        litContainer.querySelector(`[name="biblType-${bIndex}"]`).value = bibl.type || '';
        litContainer.querySelector(`[name="biblTitle-${bIndex}"]`).value = bibl.title || '';
        litContainer.querySelector(`[name="biblDate-${bIndex}"]`).value = bibl.date || '';
        litContainer.querySelector(`[name="biblCited-${bIndex}"]`).value = bibl.citedRange || '';
        litContainer.querySelector(`[name="biblPlace-${bIndex}"]`).value = bibl.pubPlace || '';
        litContainer.querySelector(`[name="biblPublisher-${bIndex}"]`).value = bibl.publisher || '';
        litContainer.querySelector(`[name="biblSeries-${bIndex}"]`).value = bibl.series || '';

        const authorContainer = litContainer.querySelector(`.bibl-author-container-${bIndex}`);
        (bibl.authors || []).forEach((a, i) => {
          if (i > 0) addBiblAuthor(litContainer.querySelector(`[onclick*="addBiblAuthor"]`), bIndex);
          const authorRow = authorContainer.children[i];
          authorRow.querySelector(`[name="biblAuthorForename-${bIndex}-${i}"]`).value = a.forename || '';
          authorRow.querySelector(`[name="biblAuthorSurname-${bIndex}-${i}"]`).value = a.surname || '';
        });

        const editorContainer = litContainer.querySelector(`.bibl-editor-container-${bIndex}`);
        (bibl.editors || []).forEach((e, i) => {
          if (i > 0) addBiblEditor(litContainer.querySelector(`[onclick*="addBiblEditor"]`), bIndex);
          const editorRow = editorContainer.children[i];
          editorRow.querySelector(`[name="biblEditor-${bIndex}-${i}"]`).value = e || '';
        });
      });
    }
  };
  reader.readAsText(file);
});

addManuscriptForm({}, false);


document.addEventListener('input', function (e) {
  const target = e.target;

  // Geo validation
  if (target.classList.contains('geo-coord')) {
    const regex = /^-?\d{1,3}\.\d+,\s-?\d{1,3}\.\d+$/;
    validateField(target, regex);
  }

  // URL validation
  if (target.classList.contains('url-field')) {
    const regex = /^https?:\/\/.+/;
    validateField(target, regex);
  }
});

function validateField(field, regex) {
  const value = field.value.trim();
  const parent = field.closest('.col-md') || field.parentElement;

  // Remove old error if present
  parent.querySelectorAll('.error-msg').forEach(e => e.remove());

  if (!regex.test(value) && value !== '') {
    field.classList.add('is-invalid');

    const errorMsg = document.createElement('div');
    errorMsg.className = 'text-danger small error-msg';
    errorMsg.textContent = field.dataset.error || 'Invalid input';
    parent.appendChild(errorMsg);
  } else {
    field.classList.remove('is-invalid');
  }
}

//LOD

async function safeFetchJSON(url) {
  try {
    const res = await fetch(url);
    const text = await res.text();

    if (!res.ok) {
      console.warn(`LOD request failed: ${res.status} ${res.statusText}`);
      return null;
    }

    if (!text.trim()) return null;
    return JSON.parse(text);
  } catch (err) {
    console.warn("LOD fetch failed:", err);
    return null;
  }
}



async function searchWikidataPlaces(term) {
  const url = `https://www.wikidata.org/w/api.php?action=wbsearchentities&search=${encodeURIComponent(term)}&language=en&type=item&format=json&origin=*`;
  const data = await safeFetchJSON(url);
  if (!data || !data.search) return [];
  
  return data.search.map(w => ({
    label: `${w.label} (${w.description || 'entity'})`,
    uri: w.concepturi
  }));
}



async function searchWikidataPersons(term) {
  const url = `https://www.wikidata.org/w/api.php?action=wbsearchentities&search=${encodeURIComponent(term)}&language=en&type=item&format=json&origin=*`;
  const data = await safeFetchJSON(url);
  if (!data || !data.search) return [];
  return data.search.map(w => ({
    label: `${w.label} (${w.description || 'person'})`,
    uri: w.concepturi
  }));
}

async function searchWikidataGeneric(term) {
  const url = `https://www.wikidata.org/w/api.php?action=wbsearchentities&search=${encodeURIComponent(term)}&language=en&type=item&format=json&origin=*`;
  const data = await safeFetchJSON(url);
  if (!data || !data.search) return [];

  return data.search.map(w => ({
    label: `${w.label} (${w.description || 'entity'})`,
    uri: w.concepturi
  }));
}

async function searchWikidataLanguages(term) {
  const url = `https://www.wikidata.org/w/api.php?action=wbsearchentities&search=${encodeURIComponent(term)}&language=en&format=json&origin=*`;
  const data = await safeFetchJSON(url);
  if (!data || !data.search) return [];
  return data.search.map(w => ({
    label: `${w.label} (${w.description || 'language'})`,
    uri: w.concepturi
  }));
}

async function searchGettyScripts(term) {
  const query = `SELECT ?term ?termLabel WHERE { ?term a gvp:Concept; skos:prefLabel ?termLabel . FILTER(CONTAINS(LCASE(?termLabel), \"${term.toLowerCase()}\")) } LIMIT 10`;
  const url = `https://vocab.getty.edu/sparql.json?query=${encodeURIComponent(query)}`;
  const data = await safeFetchJSON(url);
  if (!data || !data.results) return [];
  return data.results.bindings.map(r => ({
    label: r.termLabel.value,
    uri: r.term.value
  }));
}


// Track the currently open dropdown globally
let activeDropdown = null;

function showDropdown(field, results, loading = false) {
  //Remove any previously active dropdown before creating a new one
  if (activeDropdown) {
    activeDropdown.remove();
    activeDropdown = null;
  }

  const dropdown = document.createElement('div');
  dropdown.className = 'lod-dropdown border bg-light';
  dropdown.style.position = 'absolute';
  dropdown.style.zIndex = 9999;
  dropdown.style.maxHeight = '200px';
  dropdown.style.overflowY = 'auto';

  //Position it directly below the input field
  const rect = field.getBoundingClientRect();
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  dropdown.style.width = rect.width + 'px';
  dropdown.style.left = rect.left + 'px';
  dropdown.style.top = (rect.bottom + scrollTop) + 'px';

  //Populate dropdown
  if (loading) {
    dropdown.innerHTML = `<div class="lod-item p-1 text-muted">Loading...</div>`;
  } else if (!results.length) {
    dropdown.innerHTML = `<div class="lod-item p-1 text-muted">No matches found</div>`;
  } else {
    results.forEach(r => {
      const item = document.createElement('div');
      item.className = 'lod-item p-1';
      item.textContent = r.label;
      item.style.cursor = 'pointer';

      item.addEventListener('click', async () => {
        //Always fill the selected label + URI
        field.value = r.label;
        field.dataset.lodUri = r.uri;

        const source = field.dataset.lod; // detect source
        const form = field.closest('form');

        if (source.startsWith('wikidata')) {
          //Only Wikidata gets entity details + autofill
          const qid = r.uri.split('/').pop();
          const entity = await fetchWikidataEntityDetails(qid);
          await tryAutofillGeo(entity, field, form);
        }
        //Getty vocab (font description) → no Wikidata autofill
        // just set the label + URI, nothing else.

        //Badge with correct icons
        let badge = field.parentNode.querySelector('.lod-link');
        if (!badge) {
          badge = document.createElement('small');
          badge.className = 'lod-link text-muted d-block';
          field.insertAdjacentElement('afterend', badge);
        }
        const sourceLabel = getSourceLabel(r.uri);
        badge.innerHTML = `
          <a href="${r.uri}" target="_blank" title="Open corresponding ${sourceLabel} link" class="btn pt-0 pe-1" role="button" style="color: blue;">
            <i class="fa-solid fa-arrow-up-right-from-square"></i>
          </a>
          <button type="button" class="btn btn-lg btn-link text-danger lod-clear-btn ps-0 pt-0" title="Remove ${sourceLabel}">
            <i class="fa-solid fa-square-xmark"></i>
          </button>
        `;

        badge.querySelector('.lod-clear-btn').addEventListener('click', () => {
          delete field.dataset.lodUri;
          field.value = '';
          badge.remove();
        });

        //Close dropdown after selection
        dropdown.remove();
        activeDropdown = null;
      });

      dropdown.appendChild(item);
    });
  }

  //Append to BODY so it positions correctly
  document.body.appendChild(dropdown);
  activeDropdown = dropdown;
}

//One global outside-click listener for all dropdowns
document.addEventListener('click', (ev) => {
  if (activeDropdown) {
    // close if clicked outside BOTH dropdown and the triggering field
    if (!activeDropdown.contains(ev.target) && !ev.target.classList.contains('lod-autocomplete')) {
      activeDropdown.remove();
      activeDropdown = null;
    }
  }
});






// === Enhanced Input Listener with loading state ===
document.addEventListener('input', async (e) => {
  const field = e.target;
  if (!field.classList.contains('lod-autocomplete')) return;

  const query = field.value.trim();
  if (query.length < 3) return;

  showDropdown(field, [], true); // show loading

  const source = field.dataset.lod;
  let results = [];

  if (source === 'wikidata-place') results = await searchWikidataPlaces(query);
  else if (source === 'wikidata-person') results = await searchWikidataPersons(query);
  else if (source === 'wikidata-generic') results = await searchWikidataGeneric(query);
  else if (source === 'wikidata-lang') results = await searchWikidataLanguages(query);
  else if (source === 'getty-script') results = await searchGettyScripts(query);

  showDropdown(field, results);
});


function getSourceLabel(uri) {
  if (uri.includes('wikidata.org')) return 'Wikidata';
  if (uri.includes('getty.edu')) return 'Getty Vocabularies';
  return 'LOD Source';
}


// Fetch full Wikidata entity JSON
async function fetchWikidataEntityDetails(qid) {
  const url = `https://www.wikidata.org/wiki/Special:EntityData/${qid}.json`;
  const res = await fetch(url);
  const data = await res.json();
  return data.entities[qid];
}

// Extract lat/lon, settlement label, and country QID
/*function extractPlaceDetails(entity) {
  const details = {
    lat: '',
    lon: '',
    settlementQID: '', // city QID
    settlementLabel: entity.labels?.en?.value || '',
    countryQID: ''
  };

  // Coordinates (P625)
  if (entity.claims?.P625) {
    const coords = entity.claims.P625[0].mainsnak.datavalue.value;
    details.lat = coords.latitude;
    details.lon = coords.longitude;
  }

  // Settlement (P131)
  if (entity.claims?.P131) {
    details.settlementQID = entity.claims.P131[0].mainsnak.datavalue.value.id;
  }

  // Country (P17)
  if (entity.claims?.P17) {
    details.countryQID = entity.claims.P17[0].mainsnak.datavalue.value.id;
  }

  return details;
}*/



function extractPlaceDetails(entity) {
  const details = {
    lat: '',
    lon: '',
    settlementQID: '',
    settlementLabel: entity.labels?.en?.value || '',
    countryQID: ''
  };

  //  Coordinates (P625)
  if (entity.claims?.P625) {
    const coords = entity.claims.P625[0].mainsnak.datavalue.value;
    details.lat = coords.latitude;
    details.lon = coords.longitude;
  }

  //  Helper to safely get start time
  function getStartTime(claim) {
    const p580 = claim.qualifiers?.P580;
    if (p580 && p580.length > 0 && p580[0].datavalue?.value?.time) {
      const timeVal = p580[0].datavalue.value.time; // +YYYY-MM-DDT00:00:00Z
      return new Date(timeVal.replace('+', '')).getTime();
    }
    return null; // no start time → current
  }

  //  Helper to sort current first, then most recent
  function sortByCurrentThenRecent(a, b) {
    if (!a.startTime && !b.startTime) return 0;
    if (!a.startTime) return -1; // a = current
    if (!b.startTime) return 1;  // b = current
    return b.startTime - a.startTime; // latest first
  }

  //  Settlement (P131) → rank-aware
  if (entity.claims?.P131) {
    const settlements = entity.claims.P131
      .filter(claim => claim.rank !== "deprecated")
      .map(claim => ({
        qid: claim.mainsnak.datavalue.value.id,
        rank: claim.rank,
        startTime: getStartTime(claim)
      }));

    // Prefer preferred rank first
    const preferred = settlements.filter(s => s.rank === "preferred");
    const normal = settlements.filter(s => s.rank !== "preferred");

    const sortedSettlements = preferred.length > 0
      ? preferred.sort(sortByCurrentThenRecent)
      : normal.sort(sortByCurrentThenRecent);

    details.settlementQID = sortedSettlements[0]?.qid || '';
  }

  //  Country (P17) → rank-aware
  if (entity.claims?.P17) {
    const countries = entity.claims.P17
      .filter(claim => claim.rank !== "deprecated")
      .map(claim => ({
        qid: claim.mainsnak.datavalue.value.id,
        rank: claim.rank,
        startTime: getStartTime(claim)
      }));

    // Prefer preferred rank first
    const preferred = countries.filter(c => c.rank === "preferred");
    const normal = countries.filter(c => c.rank !== "preferred");

    const sortedCountries = preferred.length > 0
      ? preferred.sort(sortByCurrentThenRecent)
      : normal.sort(sortByCurrentThenRecent);

    details.countryQID = sortedCountries[0]?.qid || '';
  }

  return details;
}





// Fetch a readable label for a given QID
async function fetchWikidataLabel(qid) {
  const url = `https://www.wikidata.org/wiki/Special:EntityData/${qid}.json`;
  const res = await fetch(url);
  const data = await res.json();
  return data.entities[qid]?.labels?.en?.value || qid;
}


async function tryAutofillGeo(entity, field, form) {
  const details = await extractPlaceDetails(entity);

  // If no coordinates at all → skip
  if (!details.lat && !details.lon && !details.settlementQID && !details.countryQID) return;

  let geoField, settlementField, countryField;

  if (field.name === 'repository') {
    geoField = form.querySelector('[name="geoRepository"]');
    settlementField = form.querySelector('[name="settlementIdent"]');
    countryField = form.querySelector('[name="countryIdent"]');
  } else if (field.name === 'origPlace') {
    geoField = form.querySelector('[name="geoOrigin"]');
    settlementField = null; // origPlace doesn’t have settlement
    countryField = form.querySelector('[name="countryOrigin"]');
  } else if (field.name.startsWith('provName')) {
    const provIndex = field.name.split('-')[1];
    geoField = form.querySelector(`[name="provGeo-${provIndex}"]`);
    settlementField = form.querySelector(`[name="provSettlement-${provIndex}"]`);
    countryField = form.querySelector(`[name="provCountry-${provIndex}"]`);
  } else if (field.name.startsWith('provSettlement')) {
    const provIndex = field.name.split('-')[1];
    geoField = form.querySelector(`[name="provGeo-${provIndex}"]`);
    settlementField = form.querySelector(`[name="provSettlement-${provIndex}"]`);
    countryField = form.querySelector(`[name="provCountry-${provIndex}"]`);
  }

  if (!geoField && !settlementField && !countryField) return;

  //  Coordinates
  if (geoField && details.lat && details.lon) {
    geoField.value = `${details.lat}, ${details.lon}`;
  }

  //  Settlement (if exists)
  if (settlementField && details.settlementQID) {
    const settlementEntity = await fetchWikidataEntityDetails(details.settlementQID);
    const settlementLabel = settlementEntity.labels?.en?.value || '';
    const settlementUri = `https://www.wikidata.org/entity/${details.settlementQID}`;
    settlementField.value = settlementLabel;
    settlementField.dataset.lodUri = settlementUri;

    //Add badge
    addBadgeForLODField(settlementField, settlementUri);
  }

  //  Country
  if (countryField && details.countryQID) {
    const countryLabel = await fetchWikidataLabel(details.countryQID);
    const countryUri = `https://www.wikidata.org/entity/${details.countryQID}`;
    countryField.value = countryLabel;
    countryField.dataset.lodUri = countryUri;

    //Add badge
    addBadgeForLODField(countryField, countryUri);
  }
}


function addBadgeForLODField(input, uri) {
  if (!uri) return;

  let badge = input.parentNode.querySelector('.lod-link');
  if (!badge) {
    badge = document.createElement('small');
    badge.className = 'lod-link text-muted d-block';
    input.insertAdjacentElement('afterend', badge);
  }
  const sourceLabel = uri.includes('wikidata.org') ? 'Wikidata' : 'LOD Source';
  badge.innerHTML = `
    <a href="${uri}" target="_blank" title="Open corresponding ${sourceLabel} link" class="btn pt-0 pe-1" role="button" style="color: blue;">
      <i class="fa-solid fa-arrow-up-right-from-square"></i>
    </a>
    <button type="button" class="btn btn-lg btn-link text-danger lod-clear-btn ps-0 pt-0" title="Remove ${sourceLabel}">
      <i class="fa-solid fa-square-xmark"></i>
    </button>
  `;

  badge.querySelector('.lod-clear-btn').addEventListener('click', () => {
    delete input.dataset.lodUri;
    input.value = '';
    badge.remove();
  });
}



//Text area sutosize
document.addEventListener('input', function(e) {
  if (e.target.matches('textarea.autosize')) {
    e.target.style.height = 'auto'; // reset
    e.target.style.height = e.target.scrollHeight + 'px'; // grow to fit content
  }
});