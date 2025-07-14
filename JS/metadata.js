
let manuscriptCounter = 0;
const container = document.getElementById('manuscriptFormsContainer');

document.getElementById('addManuscriptBtn').addEventListener('click', () => {
  addManuscriptForm();
});

function addManuscriptForm(data = {}) {
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
                                    
                                    <div class="col-md-6">
                                        <label class="form-label">Publication details</label>
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
                                        <input type="text" class="form-control" name="repository" value="${data.repository || ''}">
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div class="col-md">
                                        <label class="form-label">Geographical coordinates</label>
                                        <input type="text" class="form-control geo-coord" name="geoRepository"
                                        placeholder="Enter geographical coordinates of the library"
                                        data-error="Please enter in the format: 49.890972, 10.894102" value="${data.geoRepository || ''}">
                                    </div>
                                    <div class="col-md">
                                        <label class="form-label">Place</label>
                                        <input type="text" class="form-control" name="settlementIdent" value="${data.settlementIdent || ''}">
                                    </div>
                                    <div class="col-md">
                                        <label class="form-label">Land</label>
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
                                    <input type="text" class="form-control" name="summaryContents" placeholder="Enter a description of the manuscript content" value="${data.summaryContents || ''}">
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
                                    <div class="col-md-3">
                                        <label class="form-label">Material</label>
                                        <input type="text" class="form-control" name="material" value="${data.material || ''}">
                                    </div>
                                    <div class="col-md-3">
                                        <label class="form-label">Height (cm)</label>
                                        <input type="number" class="form-control" name="height" value="${data.height || ''}" min="1">
                                    </div>
                                    <div class="col-md-3">
                                        <label class="form-label">Width (cm)</label>
                                        <input type="number" class="form-control" name="width" value="${data.width || ''}" min="1">
                                    </div>
                                    <div class="col-md-3">
                                        <label class="form-label">Leaves</label>
                                        <input type="number" class="form-control" name="leaves" value="${data.leaves || ''}" min="1" step="1">
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Condition</label>
                                    <input type="text" class="form-control" name="condition" value="${data.condition || ''}">
                                </div>
                                <div class="row mb-3">
                                    <div class="col-md-3">
                                        <label class="form-label">Columns</label>
                                        <input type="number" class="form-control" name="columns" value="${data.columns || ''}" min="0" step="1">
                                    </div>
                                    <div class="col-md-3">
                                        <label class="form-label">Lines</label>
                                        <input type="number" class="form-control" name="lines" value="${data.lines || ''}" min="1" step="1">
                                    </div>
                                    <div class="col-md-3">
                                        <label class="form-label">Hands</label>
                                        <input type="number" class="form-control" name="hands" value="${data.hands || ''}" min="1" step="1">
                                    </div>
                                    <div class="col-md-3">
                                        <label class="form-label">Font description</label>
                                        <input type="text" class="form-control" name="script" value="${data.script || ''}">
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                    </div>
                </div>

                <div class="accordion-item">
                    <h2 class="accordion-header" id="heading4-${id}">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse4-${id}" aria-expanded="false" aria-controls="collapse4-${id}">4. Place of origin and provenance</button>
                    </h2>
                    <div id="collapse4-${id}" class="accordion-collapse collapse" aria-labelledby="heading4-${id}">
                        <div class="accordion-body">
                            <fieldset class="p-3">
                                <div class="mb-3">
                                    <label class="form-label">Summary</label>
                                    <input type="text" class="form-control" name="summaryProvenance" placeholder="Enter a description of the manuscript history" value="${data.summaryProvenance || ''}">
                                </div>
                            </fieldset>
                            <h6>Place of origin</h6>
                            <fieldset class="p-3">
                                <div class="row mb-3">
                                    <div class="col-md-6">
                                        <label class="form-label">Place of origin</label>
                                        <input type="text" class="form-control" name="origPlace" value="${data.origPlace || ''}">
                                    </div>
                                    <div class="col-md-6">
                                        <label class="form-label">Geographical coordinates</label>
                                        <input type="text" class="form-control geo-coord" name="geoOrigin"
                                        placeholder="Enter geographical coordinates of the place of origin"
                                        data-error="Bitte im Format: 49.890972, 10.894102 eingeben" value="${data.geoOrigin || ''}">
                                    </div>     
                                </div>
                                <div class="row mb-3">
                                    <div class="col-md">
                                        <label class="form-label">Date of origin</label>
                                        <input type="text" class="form-control" name="dateOrigin" value="${data.dateOrigin || ''}">
                                    </div>
                                    <div class="col-md">
                                        <label class="form-label">Region</label>
                                        <input type="text" class="form-control" name="regionOrigin" value="${data.regionOrigin || ''}">
                                    </div>
                                    <div class="col-md">
                                        <label class="form-label">Land</label>
                                        <input type="text" class="form-control" name="countryOrigin" value="${data.countryOrigin || ''}">
                                    </div>
                                </div>
                            </fieldset>
                            
                            <h6>Provenance</h6>
                            <fieldset class="p-3">
                                <div class="row mb-3">
                                    <div class="col-md-6">
                                        <label class="form-label">Previous owner</label>
                                        <input type="text" class="form-control" name="prevOwner" value="${data.prevOwner || ''}">
                                    </div>
                                    <div class="col-md-6">
                                        <label class="form-label">Geographical coordinates</label>
                                        <input type="text" class="form-control geo-coord" name="geoProvenance"
                                        placeholder="Enter geographical coordinates of the provenance place"
                                        data-error="Bitte im Format: 49.890972, 10.894102 eingeben" value="${data.geoProvenance || ''}">
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div class="col-md">
                                    <label class="form-label">Place</label>
                                    <input type="text" class="form-control" name="settlementProvenance" value="${data.settlementProvenance || ''}">
                                </div>
                                    <div class="col-md">
                                        <label class="form-label">Region</label>
                                        <input type="text" class="form-control" name="regionProvenance" value="${data.regionProvenance || ''}">
                                    </div>
                                    <div class="col-md">
                                        <label class="form-label">Land</label>
                                        <input type="text" class="form-control" name="countryProvenance" value="${data.countryProvenance || ''}">
                                    </div>
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
      <div class="col-md-4">
        <label class="form-label">Name</label>
        <input type="text" class="form-control" name="respStmtName-${index}">
      </div>
      <div class="col-md-4">
        <label class="form-label">Surname</label>
        <input type="text" class="form-control" name="respStmtSurname-${index}">
      </div>
      <div class="col-md-4">
        <label class="form-label">Affiliation</label>
        <input type="text" class="form-control" name="respStmtAffiliation-${index}">
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
        <input type="text" class="form-control" name="msItemAuthor-${index}" placeholder="Enter author" value="${itemData.author || ''}">
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
        <input type="text" class="form-control" name="msItemIncipit-${index}" placeholder="Enter incipit" value="${itemData.incipit || ''}">
      </div>
    </div>
    <div class="row mb-2">
      <div class="col-md">
        <label class="form-label">Explicit</label>
        <input type="text" class="form-control" name="msItemExplicit-${index}" placeholder="Enter explicit" value="${itemData.explicit || ''}">
      </div>
    </div>
    <div class="row mb-2">
      <div class="col-md-6">
        <label class="form-label">Textual family</label>
        <input type="text" class="form-control" name="msItemFamily-${index}" placeholder="Eter textual family" value="${itemData.textFamily || ''}">
      </div>
      <div class="col-md-6">
        <label class="form-label">Textual subfamily</label>
        <input type="text" class="form-control" name="msItemSubFamily-${index}" placeholder="Enter textual subfamily" value="${itemData.textSubFamily || ''}">
      </div> 
    </div>
    <div class="row mb-2">
      <div class="col-md-6">
        <label class="form-label">Text languge</label>
        <input type="text" class="form-control" name="msItemLang-${index}" placeholder="Enter text language" value="${itemData.textLang || ''}">
      </div>
      <div class="col-md-6">
        <label class="form-label">Text genre</label>
        <input type="text" class="form-control" name="msItemGenre-${index}" placeholder="Enter text genre" value="${itemData.textGenre || ''}">
      </div>
    </div>
  `;
  container.appendChild(block);

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

  // Normal fields
  Array.from(form.elements).forEach(el => {
  if (
    el.name &&
    !el.name.startsWith('respStmt') &&
    !el.name.startsWith('msItem') &&
    !el.name.startsWith('bibl')
  ) {
    data[el.name] = el.value;
  }
});

  // Responsible persons
  const persons = [];
  let i = 0;
  while (true) {
    const name = form.querySelector(`[name="respStmtName-${i}"]`);
    const surname = form.querySelector(`[name="respStmtSurname-${i}"]`);
    const affil = form.querySelector(`[name="respStmtAffiliation-${i}"]`);
    if (!name || !surname || !affil) break;
    persons.push({
      name: name.value,
      surname: surname.value,
      affiliation: affil.value
    });
    i++;
  }
  data.responsiblePersons = persons;

  // msItems with pageRanges
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
      author: author.value,
      title: form.querySelector(`[name="msItemTitle-${j}"]`)?.value || '',
      textLang: form.querySelector(`[name="msItemLang-${j}"]`)?.value || '',
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

  // Literature
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






function buildXML(data) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<TEI xmlns="http://www.tei-c.org/ns/1.0">
  <teiHeader>
    <fileDesc>
      <titleStmt>
        <title type="main">${escapeXml(data.msTitle)}</title>
        ${data.responsiblePersons.map(p => `
        <respStmt>
          <persName>
            <forename>${escapeXml(p.name)}</forename>
            <surname>${escapeXml(p.surname)}</surname>
            <affiliation>${escapeXml(p.affiliation)}</affiliation>
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
            <repository>
              <name>${escapeXml(data.repository)}</name>
              <geo>${escapeXml(data.geoRepository)}</geo>
            </repository>
            <settlement>${escapeXml(data.settlementIdent)}</settlement>
            <country>${escapeXml(data.countryIdent)}</country>
            <collection><idno type="shelfmark">${escapeXml(data.idno)}</idno></collection>
            <msName type="sigle">${escapeXml(data.msSigle)}</msName>
            <altIdentifier><idno>${escapeXml(data.altIdentifier)}</idno></altIdentifier>
            <msName type="full">${escapeXml(data.msName)}</msName>
          </msIdentifier>
          <msContents>
            <summary>${escapeXml(data.summaryContents)}</summary>
            ${(data.msItems || []).map(item => `
            <msItem>
              <author>${escapeXml(item.author)}</author>
              <title>${escapeXml(item.title)}</title>
              <locusGrp>
                ${(item.pageRanges || []).map(pr => `<locus from="${escapeXml(pr.from)}" to="${escapeXml(pr.to)}"/>`).join('\n')}
              </locusGrp>
              <textLang>${escapeXml(item.textLang)}</textLang>
              <incipit>${escapeXml(item.incipit)}</incipit>
              <explicit>${escapeXml(item.explicit)}</explicit>
              <note type="textual-family">${escapeXml(item.textFamily)}</note>
              <note type="textual-subfamily">${escapeXml(item.textSubFamily)}</note>
              <note type="text-genre">${escapeXml(item.textGenre)}</note>
            </msItem>`).join('\n')}
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
              <scriptNote>${escapeXml(data.script)}</scriptNote>
            </scriptDesc>
          </physDesc>
          <history>
            <summary>${escapeXml(data.summaryProvenance)}</summary>
            <origin>
              <origPlace>
                <name>${escapeXml(data.origPlace)}</name>
                <geo>${escapeXml(data.geoOrigin)}</geo>
              </origPlace>
              <region>${escapeXml(data.regionOrigin)}</region>
              <country>${escapeXml(data.countryOrigin)}</country>
              <origDate>${escapeXml(data.dateOrigin)}</origDate>
            </origin>
            <provenance>
              <name>${escapeXml(data.prevOwner)}</name>
              <geo>${escapeXml(data.geoProvenance)}</geo>
              <settlement>${escapeXml(data.settlementProvenance)}</settlement>
              <region>${escapeXml(data.regionProvenance)}</region>
              <country>${escapeXml(data.countryProvenance)}</country>
            </provenance>
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
  const xml = buildXML(data);
  // Open modal
  document.getElementById('modalXmlContent').textContent = xml;
  const modal = new bootstrap.Modal(document.getElementById('xmlModal'));
  modal.show();

  return xml;
}

function downloadXML(formId) {
  const data = getFormData(formId);
  const xmlContent = buildXML(data);
  const blob = new Blob([xmlContent], { type: 'application/xml' });

  const form = document.getElementById(formId);
  const titleInput = form.querySelector('[name="msTitle"]');
  const filename = (titleInput?.value?.trim() || 'manuscript').replace(/[\\/:*?"<>|]/g, '_');

  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `${filename}.xml`;
  a.click();
}



// Download JSON, CSV, RDF
document.getElementById('downloadAllJSON').addEventListener('click', () => {
  const all = [...document.querySelectorAll('.msForm')].map(f => getFormData(f.id));
  downloadFile('all-manuscripts.json', JSON.stringify(all, null, 2), 'application/json');
});

document.getElementById('downloadAllCSV').addEventListener('click', () => {
  const all = [...document.querySelectorAll('.msForm')].map(f => getFormData(f.id));
  const headers = Object.keys(all[0] || {});
  const csv = [headers.join(',')].concat(
    all.map(row =>
      headers.map(h => {
        const val = row[h];
        const str = typeof val === 'string' ? val : JSON.stringify(val);
        return `"${(str || '').replace(/"/g, '""')}"`;
      }).join(',')
    )
  ).join('\n');
  downloadFile('all-manuscripts.csv', csv, 'text/csv');
});


document.getElementById('downloadAllRDF').addEventListener('click', () => {
  const all = [...document.querySelectorAll('.msForm')].map(f => getFormData(f.id));
  let rdf = `<?xml version="1.0"?>\n<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">\n`;
  all.forEach((row, i) => {
    rdf += `  <rdf:Description rdf:about="http://example.org/manuscript/${i + 1}">\n`;
    for (const key in row) {
      rdf += `    <${key}>${escapeXml(row[key])}</${key}>\n`;
    }
    rdf += `  </rdf:Description>\n`;
  });
  rdf += '</rdf:RDF>';
  downloadFile('all-manuscripts.rdf', rdf, 'application/rdf+xml');
});

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
    const content = event.target.result;
    
    if (file.name.endsWith('.json')) {
      try {
        const data = JSON.parse(content);
        console.log("Parsed JSON:", data); //for debugging

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
            if (
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
              row.querySelector(`[name="respStmtAffiliation-${index}"]`).value = p.affiliation || '';
            });
          }

          // Restore msItems
            const itemButton = formElement.querySelector('button[onclick*="addMsItem"]');
            if (rec.msItems) {
            rec.msItems.forEach(item => {
                addMsItem(itemButton, item);
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

      const data = {
        // Accordion 1
        msTitle: get("title"),
        publicationStmt: get("publicationStmt p"),
        repository: get("repository > name"),
        geoRepository: get("repository > geo"),
        settlementIdent: get("msIdentifier > settlement"),
        countryIdent: get("msIdentifier > country"),
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
        script: get("scriptNote"),

        // Accordion 4 
        summaryProvenance: get("history > summary"),
        origPlace: get("origin > origPlace > name"),
        geoOrigin: get("origin > origPlace > geo"),
        dateOrigin: get("origin > origDate"),
        regionOrigin: get("origin > region"),
        countryOrigin: get("origin > country"),
        prevOwner: get("provenance > name"),
        geoProvenance: get("provenance > geo"),
        settlementProvenance: get("provenance > settlement"),
        regionProvenance: get("provenance > region"),
        countryProvenance: get("provenance > country"),

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
        data.responsiblePersons.push({
          name: resp.querySelector("forename")?.textContent || '',
          surname: resp.querySelector("surname")?.textContent || '',
          affiliation: resp.querySelector("affiliation")?.textContent || ''
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
          author: item.querySelector("author")?.textContent || '',
          title: item.querySelector("title")?.textContent || '',
          pageRanges: pageRanges,
          textLang: item.querySelector("textLang")?.textContent || '',
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
        row.querySelector(`[name="respStmtAffiliation-${i}"]`).value = p.affiliation;
      });

      // msItems
      const itemButton = formElement.querySelector('button[onclick*="addMsItem"]');
      data.msItems.forEach(item => {
        addMsItem(itemButton, item);
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

addManuscriptForm();


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
