let xmlPreviewCM = null;

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
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse0-${id}" aria-expanded="true" aria-controls="collapse0-${id}" aria-label="File description">File description <a href="https://www.tei-c.org/release/doc/tei-p5-doc/en/html/ref-fileDesc.html" target="_blank" class="ms-2 text-decoration-none" data-bs-toggle="tooltip" title="TEI Documentation"><i class="bi bi-box-arrow-up-right"></i></a></button>
                    </h2>
                    <div id="collapse0-${id}" class="accordion-collapse collapse show" aria-labelledby="heading0-${id}">
                        <div class="accordion-body">
                            <fieldset class="p-3">
                                <div class="row mb-3">
                                    
                                    <div class="col-md">
                                        <label class="form-label">File name <span class="required-star" data-bs-toggle="tooltip" title="Required field">*</span></label>
                                        <input type="text" class="form-control" name="msTitle" value="${data.msTitle || ''}">
                                    </div>

                                    <div class="col-md-3">
                                      <label class="form-label">Language of data entry <span class="required-star" data-bs-toggle="tooltip" title="Required field">*</span></label>
                                      <select class="form-select" name="xmlLang">
                                        <option value="">Please select</option>
                                        <option value="en" ${data.xmlLang === 'en' ? 'selected' : ''}>English</option>
                                        <option value="de" ${data.xmlLang === 'de' ? 'selected' : ''}>German</option>
                                        <option value="it" ${data.xmlLang === 'it' ? 'selected' : ''}>Italian</option>
                                        <option value="fr" ${data.xmlLang === 'fr' ? 'selected' : ''}>French</option>
                                        <option value="es" ${data.xmlLang === 'es' ? 'selected' : ''}>Spanish</option>
                                      </select>
                                    </div>

                                    <div class="col-md-2">
                                        <label class="form-label">License <span class="required-star" data-bs-toggle="tooltip" title="Required field">*</span> <a href="https://creativecommons.org/share-your-work/cclicenses/" target="_blank" class="ms-2 text-decoration-none" data-bs-toggle="tooltip" title="Visit link"><i class="bi bi-box-arrow-up-right"></i></a></label>
                                        <select class="form-select" name="publicationStmt">
                                            <option value="">Please select</option>
                                            ${['CC BY','CC BY-SA','CC BY-ND','CC BY-NC','CC BY-NC-SA','CC BY-NC-ND','CC0']
                                            .map(lic => `<option value="${lic}" ${data.publicationStmt === lic ? 'selected' : ''}>${lic}</option>`).join('')}
                                        </select>
                                    </div>
                                </div>
                            </fieldset>

                            <h6>Persons responsible for data entry<a href="https://tei-c.org/release/doc/tei-p5-doc/en/html/ref-respStmt.html" target="_blank" class="ms-2 text-decoration-none" data-bs-toggle="tooltip" title="TEI Documentation"><i class="bi bi-box-arrow-up-right"></i></a></h6>
                            <fieldset class="p-3">
                                <div class="row mb-3">
                                    <div class="resp-container"></div>
                                    <div class="d-flex justify-content-start">
                                        <button type="button" class="btn btn-sm btn-outline-primary" onclick="addRespPerson(this)" aria-label="Add responsible person">Add responsible person</button>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                    </div>
                </div>

                <div class="accordion-item">  
                    <h2 class="accordion-header" id="heading1-${id}">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse1-${id}" aria-expanded="false" aria-controls="collapse1-${id}" aria-label="Identification">Identification <a href="https://tei-c.org/release/doc/tei-p5-doc/en/html/ref-msIdentifier.html" target="_blank" class="ms-2 text-decoration-none" data-bs-toggle="tooltip" title="TEI Documentation"><i class="bi bi-box-arrow-up-right"></i></a></button>
                    </h2>
                    <div id="collapse1-${id}" class="accordion-collapse collapse" aria-labelledby="heading1-${id}">
                        <div class="accordion-body">
                            <fieldset class="p-3">
                                <div class="row mb-3">
                                    <div class="col-md">
                                        <label class="form-label">Manuscript name <span class="required-star" data-bs-toggle="tooltip" title="Required field">*</span> <a href="https://www.tei-c.org/release/doc/tei-p5-doc/en/html/ref-msName.html" target="_blank" class="ms-2 text-decoration-none" data-bs-toggle="tooltip" title="TEI Documentation"><i class="bi bi-box-arrow-up-right"></i></a></label>
                                        <input type="text" class="form-control" placeholder="Manuscript name" name="msName" value="${data.msName || ''}">
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div class="col-md">
                                        <label class="form-label">Collection<a href="https://www.tei-c.org/release/doc/tei-p5-doc/en/html/ref-collection.html" target="_blank" class="ms-2 text-decoration-none" data-bs-toggle="tooltip" title="TEI Documentation"><i class="bi bi-box-arrow-up-right"></i></a></label>
                                        <input type="text" class="form-control" placeholder="Manuscript collection" name="collection" value="${data.collection || ''}">
                                        </div>
                                    <div class="col-md">
                                        <label class="form-label">Sigle<a href="https://www.tei-c.org/release/doc/tei-p5-doc/en/html/ref-msName.html" target="_blank" class="ms-2 text-decoration-none" data-bs-toggle="tooltip" title="TEI Documentation"><i class="bi bi-box-arrow-up-right"></i></a></label>
                                        <input type="text" class="form-control" placeholder="Manuscript sigle" name="msSigle" value="${data.msSigle || ''}">
                                        </div>
                                    <div class="col-md">
                                        <label class="form-label">Alternative identifier<a href="https://www.tei-c.org/release/doc/tei-p5-doc/en/html/ref-altIdentifier.html" target="_blank" class="ms-2 text-decoration-none" data-bs-toggle="tooltip" title="TEI Documentation"><i class="bi bi-box-arrow-up-right"></i></a></label>
                                        <input type="text" class="form-control" placeholder="Manuscript alternative identifier" name="altIdentifier" value="${data.altIdentifier || ''}">
                                    </div>
                                </div>            
                                <div class="row mb-3">
                                    <div class="col-md">
                                        <label class="form-label">Library <span class="required-star" data-bs-toggle="tooltip" title="Required field">*</span> <a href="https://www.tei-c.org/release/doc/tei-p5-doc/en/html/ref-repository.html" target="_blank" class="ms-2 text-decoration-none" data-bs-toggle="tooltip" title="TEI Documentation"><i class="bi bi-box-arrow-up-right"></i></a></label>
                                        <input type="text" class="form-control lod-autocomplete" placeholder="Enter the name of the library in which the manuscript is stored" data-lod="wikidata-place" name="repository" value="${data.repository || ''}">
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div class="col-md">
                                        <label class="form-label">Geographical coordinates<a href="https://tei-c.org/release/doc/tei-p5-doc/en/html/ref-geo.html" target="_blank" class="ms-2 text-decoration-none" data-bs-toggle="tooltip" title="TEI Documentation"><i class="bi bi-box-arrow-up-right"></i></a></label>
                                        <input type="text" class="form-control geo-coord" name="geoRepository"
                                        placeholder="Library's geo coordinates"
                                        data-error="Use format: latitude, longitude (e.g. 41.9047761,12.450084)" value="${data.geoRepository || ''}">
                                    </div>
                                    <div class="col-md">
                                        <label class="form-label">Settlement<a href="https://www.tei-c.org/release/doc/tei-p5-doc/en/html/ref-settlement.html" target="_blank" class="ms-2 text-decoration-none" data-bs-toggle="tooltip" title="TEI Documentation"><i class="bi bi-box-arrow-up-right"></i></a></label>
                                        <input type="text" class="form-control lod-autocomplete" data-lod="wikidata-place" placeholder="Library settlement" name="settlementIdent" value="${data.settlementIdent || ''}">
                                    </div>
                                    <div class="col-md">
                                        <label class="form-label">Country<a href="https://tei-c.org/release/doc/tei-p5-doc/en/html/ref-country.html" target="_blank" class="ms-2 text-decoration-none" data-bs-toggle="tooltip" title="TEI Documentation"><i class="bi bi-box-arrow-up-right"></i></a></label>
                                        <input type="text" class="form-control lod-autocomplete" data-lod="wikidata-place" placeholder="Library country" name="countryIdent" value="${data.countryIdent || ''}">
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                    </div>
                </div>
                        
                <div class="accordion-item">
                    <h2 class="accordion-header" id="heading2-${id}">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse2-${id}" aria-expanded="false" aria-controls="collapse2-${id}" aria-label="Content">Content <a href="https://tei-c.org/release/doc/tei-p5-doc/en/html/ref-msContents.html" target="_blank" class="ms-2 text-decoration-none" data-bs-toggle="tooltip" title="TEI Documentation"><i class="bi bi-box-arrow-up-right"></i></a></button>
                    </h2>
                    <div id="collapse2-${id}" class="accordion-collapse collapse" aria-labelledby="heading2-${id}">
                        <div class="accordion-body">
                            <fieldset class="p-3">
                                <div class="mb-3">
                                    <label class="form-label">Summary</label>
                                    <textarea class="form-control autosize" name="summaryContents" placeholder="Enter a description of the manuscript's content" value="${data.summaryContents || ''}"></textarea>
                                </div>
                                <div class="msitem-container"></div>
                                <button type="button" class="btn btn-sm btn-outline-primary mt-2" onclick="addMsItem(this)" aria-label="Add content">Add content</button>
                            </fieldset>
                        </div>
                    </div>
                </div>
                
                <div class="accordion-item">
                    <h2 class="accordion-header" id="heading3-${id}">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse3-${id}" aria-expanded="false" aria-controls="collapse3-${id}" aria-label="Physical description">Physical description <a href="https://tei-c.org/release/doc/tei-p5-doc/en/html/ref-physDesc.html" target="_blank" class="ms-2 text-decoration-none" data-bs-toggle="tooltip" title="TEI Documentation"><i class="bi bi-box-arrow-up-right"></i></a></button>
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
                                    <label class="form-label">Material<a href="https://tei-c.org/release/doc/tei-p5-doc/en/html/ref-supportDesc.html" target="_blank" class="ms-2 text-decoration-none" data-bs-toggle="tooltip" title="TEI Documentation"><i class="bi bi-box-arrow-up-right"></i></a></label>
                                    <select class="form-select" name="material">
                                      <option value="">Please select</option>
                                      <option value="parchment" ${data.material === 'parchment' ? 'selected' : ''}>Parchment</option>
                                      <option value="paper" ${data.material === 'paper' ? 'selected' : ''}>Paper</option>
                                      <option value="papyrus" ${data.material === 'papyrus' ? 'selected' : ''}>Papyrus</option>
                                    </select>
                                </div>
                                <div class="col-md-2">
                                    <label class="form-label">Height (cm)</label>
                                    <input type="number" class="form-control" name="height" value="${data.height || ''}" min="1" placeholder="Enter height">
                                </div>
                                <div class="col-md-2">
                                    <label class="form-label">Width (cm)</label>
                                    <input type="number" class="form-control" name="width" value="${data.width || ''}" min="1" placeholder="Enter width">
                                </div>
                              </div>

                              <div class="row mb-3">
                                <div class="col-md-2">
                                    <label class="form-label">Leaves</label>
                                    <input type="number" class="form-control" name="leaves" value="${data.leaves || ''}" min="1" step="1" placeholder="N. of leaves">
                                </div>
                                <div class="col-md-2">
                                    <label class="form-label">Columns<a href="https://tei-c.org/release/doc/tei-p5-doc/en/html/ref-layout.html#tei_att.columns" target="_blank" class="ms-2 text-decoration-none" data-bs-toggle="tooltip" title="TEI Documentation"><i class="bi bi-box-arrow-up-right"></i></a>
                                    </label>
                                    <input type="number" class="form-control" name="columns" value="${data.columns || ''}" min="0" max="4" step="1" placeholder="N. of layout columns per page">
                                </div>
                                <div class="col-md-2">
                                    <label class="form-label">Written lines<a href="https://tei-c.org/release/doc/tei-p5-doc/en/html/ref-layout.html#tei_att.writtenLines" target="_blank" class="ms-2 text-decoration-none" data-bs-toggle="tooltip" title="TEI Documentation">
                                      <i class="bi bi-box-arrow-up-right"></i>
                                    </a>
                                    </label>
                                    <input type="number" class="form-control" name="lines" value="${data.lines || ''}" min="1" step="1" placeholder="N. of lines per column">
                                </div>
                              </div>
                              
                              <div class="row mb-3">
                                <div class="col-md-2">
                                  <label class="form-label">Number of hands</label>
                                  <input type="number" class="form-control" name="hands" value="${data.hands || ''}" min="1" step="1" placeholder="N. of hands">
                                </div>
                                <div class="col-md">
                                  <label class="form-label">Description of hands<a href="https://www.tei-c.org/release/doc/tei-p5-doc/en/html/ref-handDesc.html" target="_blank" class="ms-2 text-decoration-none" data-bs-toggle="tooltip" title="TEI Documentation"><i class="bi bi-box-arrow-up-right"></i></a></label>
                                  <input type="text" class="form-control" name="handsDesc" value="${data.handsDesc || ''}"
                                        placeholder="Describe hands characteristics">
                                </div>
                              </div>
                           
                              <div class="mb-3">
                                <label class="form-label">Script descriptions<a href="https://www.tei-c.org/release/doc/tei-p5-doc/en/html/ref-scriptNote.html" target="_blank" class="ms-2 text-decoration-none" data-bs-toggle="tooltip" title="TEI Documentation"><i class="bi bi-box-arrow-up-right"></i></a></label>
                                <div class="scriptDesc-container"></div>
                                <button type="button" class="btn btn-sm btn-outline-primary mt-2" onclick="addScriptNote(this)" aria-label="Add script">Add script</button>
                              </div>

                              <div class="mb-3">
                                <label class="form-label">Decoration<a href="https://www.tei-c.org/release/doc/tei-p5-doc/en/html/ref-decoDesc.html" target="_blank" class="ms-2 text-decoration-none" data-bs-toggle="tooltip" title="TEI Documentation"><i class="bi bi-box-arrow-up-right"></i></a></label>
                                <textarea class="form-control autosize" name="decoDesc" placeholder="Describe decoration">${data.decoDesc || ''}</textarea>
                              </div>

                              <div class="mb-3">
                                <label class="form-label">Music notation<a href="https://www.tei-c.org/release/doc/tei-p5-doc/en/html/ref-musicNotation.html" target="_blank" class="ms-2 text-decoration-none" data-bs-toggle="tooltip" title="TEI Documentation"><i class="bi bi-box-arrow-up-right"></i></a></label>
                                <textarea class="form-control autosize" name="musicNotation" placeholder="Describe musical notation">${data.musicNotation || ''}</textarea>
                              </div>

                              <div class="mb-3">
                                <label class="form-label">Additions<a href="https://www.tei-c.org/release/doc/tei-p5-doc/en/html/ref-additions.html" target="_blank" class="ms-2 text-decoration-none" data-bs-toggle="tooltip" title="TEI Documentation"><i class="bi bi-box-arrow-up-right"></i></a></label>
                                <textarea class="form-control autosize" name="additions" placeholder="Describe additions (any significant additions found within a manuscript, such as marginalia or other annotations)">${data.additions || ''}</textarea>
                              </div>

                              <div class="mb-3">
                                <label class="form-label">Accompanying material<a href="https://www.tei-c.org/release/doc/tei-p5-doc/en/html/ref-accMat.html" target="_blank" class="ms-2 text-decoration-none" data-bs-toggle="tooltip" title="TEI Documentation"><i class="bi bi-box-arrow-up-right"></i></a></label>
                                <textarea class="form-control autosize" name="accMat" placeholder="Describe accompanying material (any significant additional material which may be closely associated with the manuscript being described, such as non-contemporaneous documents or fragments bound in with it at some earlier historical period)">${data.accMat || ''}</textarea>
                              </div>

                              <div class="mb-3">
                                <label class="form-label">Binding<a href="https://www.tei-c.org/release/doc/tei-p5-doc/en/html/ref-bindingDesc.html" target="_blank" class="ms-2 text-decoration-none" data-bs-toggle="tooltip" title="TEI Documentation"><i class="bi bi-box-arrow-up-right"></i></a></label>
                                <textarea class="form-control autosize" name="bindingDesc" placeholder="Describe the binding">${data.bindingDesc || ''}</textarea>
                              </div>

                              <div class="mb-3">
                                <label class="form-label">Seals<a href="https://www.tei-c.org/release/doc/tei-p5-doc/it/html/ref-sealDesc.html" target="_blank" class="ms-2 text-decoration-none" data-bs-toggle="tooltip" title="TEI Documentation"><i class="bi bi-box-arrow-up-right"></i></a></label>
                                <div class="sealDesc-container"></div>
                                <button type="button" class="btn btn-sm btn-outline-primary mt-2" onclick="addSeal(this)" aria-label="Add seal">Add seal</button>
                              </div>
                            </fieldset>
                        </div>
                    </div>
                </div>

                <div class="accordion-item">
                    <h2 class="accordion-header" id="heading4-${id}">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse4-${id}" aria-expanded="false" aria-controls="collapse4-${id}" aria-label="History">History <a href="https://tei-c.org/release/doc/tei-p5-doc/en/html/ref-history.html" target="_blank" class="ms-2 text-decoration-none" data-bs-toggle="tooltip" title="TEI Documentation"><i class="bi bi-box-arrow-up-right"></i></a></button>
                    </h2>
                    <div id="collapse4-${id}" class="accordion-collapse collapse" aria-labelledby="heading4-${id}">
                        <div class="accordion-body">
                            <fieldset class="p-3">
                                <div class="mb-3">
                                    <label class="form-label">Summary</label>
                                    <textarea class="form-control autosize" name="summaryProvenance" placeholder="Enter a description of the manuscript's history" value="${data.summaryProvenance || ''}"></textarea>
                                </div>
                            </fieldset>
                            <h6>Origin<a href="https://tei-c.org/release/doc/tei-p5-doc/en/html/ref-origin.html" target="_blank" class="ms-2 text-decoration-none" data-bs-toggle="tooltip" title="TEI Documentation"><i class="bi bi-box-arrow-up-right"></i></a></h6>
                            
                            <fieldset class="p-3">
                                <div class="row mb-3">
                                    <div class="col-md">
                                        <label class="form-label">Place of origin</label>
                                        <input type="text" class="form-control lod-autocomplete" data-lod="wikidata-place" name="origPlace" value="${data.origPlace || ''}" placeholder="Manuscript place of origin">
                                    </div>
                                    <div class="col-md">
                                        <label class="form-label">Geographical coordinates</label>
                                        <input type="text" class="form-control geo-coord" name="geoOrigin"
                                        placeholder="Origin place's geo coordinates"
                                        data-error="Use format: latitude, longitude (e.g. 41.9047761,12.450084)" value="${data.geoOrigin || ''}">
                                    </div>  
                                    <div class="col-md">
                                        <label class="form-label">Country</label>
                                        <input type="text" class="form-control lod-autocomplete" data-lod="wikidata-place" name="countryOrigin" value="${data.countryOrigin || ''}" placeholder="Origin place country">
                                    </div>    
                                </div>
                                <div class="row mb-3">   
                                    <div class="col-md-6">
                                      <label class="form-label">Human-readable date of origin<a href="https://tei-c.org/release/doc/tei-p5-doc/en/html/ref-origDate.html" target="_blank" class="ms-2 text-decoration-none" data-bs-toggle="tooltip" title="TEI Documentation"><i class="bi bi-box-arrow-up-right"></i></a></label>
                                      <input type="text" class="form-control" name="dateOriginText" value="${data.dateOriginText || ''}" placeholder="e.g. 11th century">
                                    </div>                                                                  
                                    <div class="col-md-3">
                                      <label class="form-label">Earliest possible date of origin<a href="https://tei-c.org/release/doc/tei-p5-doc/en/html/ref-att.datable.w3c.html#tei_att.notBefore" target="_blank" class="ms-2 text-decoration-none" data-bs-toggle="tooltip" title="TEI Documentation"><i class="bi bi-box-arrow-up-right"></i></a></label>
                                      <input type="number" class="form-control" name="dateOriginNotBefore" value="${data.dateOriginNotBefore || ''}" placeholder="e.g. 1000" max="9999" step="1" oninput="limitYearLength(this)">
                                    </div>
                                    <div class="col-md-3">
                                      <label class="form-label">Latest possible date of origin<a href="https://tei-c.org/release/doc/tei-p5-doc/en/html/ref-att.datable.w3c.html#tei_att.notAfter" target="_blank" class="ms-2 text-decoration-none" data-bs-toggle="tooltip" title="TEI Documentation"><i class="bi bi-box-arrow-up-right"></i></a></label>
                                      <input type="number" class="form-control" name="dateOriginNotAfter" value="${data.dateOriginNotAfter || ''}" placeholder="e.g. 1010" max="9999" step="1" oninput="limitYearLength(this)">
                                    </div>
                                </div>
                            </fieldset>
                            
                            <h6>Provenance<a href="https://tei-c.org/release/doc/tei-p5-doc/en/html/ref-provenance.html" target="_blank" class="ms-2 text-decoration-none" data-bs-toggle="tooltip" title="TEI Documentation"><i class="bi bi-box-arrow-up-right"></i></a></h6>
                            <small>History of ownership</small>
                            <fieldset class="p-3">
                              <div class="provenance-container"></div>
                              <div class="d-flex justify-content-start">
                                <button type="button" class="btn btn-sm btn-outline-primary" onclick="addProvenanceItem(this)" aria-label="Add provenance">Add provenance</button>
                              </div>
                            </fieldset>
                        </div>
                    </div>
                </div>
                        
                <div class="accordion-item">
                    <h2 class="accordion-header" id="heading5-${id}">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse5-${id}" aria-expanded="false" aria-controls="collapse5-${id}" aria-label="Surrogates and literature">Surrogates and literature <a href="https://tei-c.org/release/doc/tei-p5-doc/en/html/ref-additional.html" target="_blank" class="ms-2 text-decoration-none" data-bs-toggle="tooltip" title="TEI Documentation"><i class="bi bi-box-arrow-up-right"></i></a></button>
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

                              <!-- Search bar -->
                              <div class="input-group mb-3">
                                <input type="text" class="form-control lit-search-input" placeholder="Search...">
                                <button class="btn btn-outline-primary lit-search-btn" type="button" aria-label="Search">Search</button>
                              </div>
                              <div class="lit-search-results mb-3"></div>

                              <!-- Literature list -->
                              <div class="literature-list border rounded p-2 mb-3 bg-light"></div>

                              <!-- Manual add button -->
                              <div class="d-flex justify-content-start">
                                <button type="button" class="btn btn-sm btn-outline-primary lit-add-manual-btn" aria-label="Add literature reference manually">Add literature reference manually</button>
                              </div>

                              <!-- Manual form (hidden by default) -->
                              <div class="literature-form border rounded p-3 mt-3 bg-white" style="display:none;"></div>

                            </fieldset>
                        </div>
                    </div>
                </div>
            </form>
        </div>

        <div class="mt-3 manuscript-footer">
          <div class="d-flex flex-column flex-md-row justify-content-md-between align-items-stretch gap-2">

            <div class="d-flex justify-content-center justify-content-md-start">
              <button type="button" class="btn btn-danger w-100 w-md-auto" onclick="deleteManuscriptForm(this)" aria-label="Delete">
                <i class="bi bi-trash3"></i> Delete
              </button>
            </div>

            <div class="d-flex flex-column flex-md-row justify-content-center justify-content-md-end gap-2">
              <button type="button" class="btn btn-primary w-100 w-md-auto" onclick="generateXML('${formId}')" aria-label="Preview">
                <i class="bi bi-file-earmark-code"></i> Preview
              </button>

              <button type="button" class="btn btn-warning w-100 w-md-auto validate-btn" aria-label="Validate">
                <i class="bi bi-check2-square"></i> Validate
              </button>

              <button type="button" class="btn btn-success w-100 w-md-auto" onclick="downloadXML('${formId}')" aria-label="Download XML">
                <i class="bi bi-file-earmark-arrow-down"></i> Download XML
              </button>
            </div>

          </div>
        </div>
    </div>
    `;
  container.appendChild(form);
  renderLiteratureList(form.querySelector('.msForm'));


  // --- Attach validation to this specific manuscript form ---
  const validateBtn = form.querySelector('.validate-btn');
  const msForm = form.querySelector('.msForm');

  if (validateBtn && msForm) {
    validateBtn.addEventListener('click', () => {
      validateCurrentForm(msForm); // pass the form reference (not ID)
    });
  }

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
        <label class="form-label">Name <span class="required-star" data-bs-toggle="tooltip" title="Required field">*</span></label>
        <input type="text" class="form-control" name="respStmtName-${index}" placeholder="Enter name of responsible person">
      </div>
      <div class="col-md">
        <label class="form-label">Surname <span class="required-star" data-bs-toggle="tooltip" title="Required field">*</span></label>
        <input type="text" class="form-control" name="respStmtSurname-${index}" placeholder="Enter surname of responsible person">
      </div>
      <div class="col-md-3">
        <label class="form-label">Responsibility<a href="https://www.tei-c.org/release/doc/tei-p5-doc/en/html/ref-textLang.html" target="_blank" class="ms-2 text-decoration-none" data-bs-toggle="tooltip" title="Responsability Documentation"><i class="bi bi-box-arrow-up-right"></i></a></label>
        <select class="form-select" name="respStmtResp-${index}">
          <option value="">Please select</option>
          <option value="com">Compiler</option>
          <option value="edt">Editor</option>
        </select>
      </div>
    </div>
    <div class="row mb-2">
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
      <button type="button" class="btn btn-sm btn-danger" onclick="this.closest('.border').remove()" aria-label="Delete">Delete</button>
    </div>
    `;
  container.appendChild(row);

  row.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => {
    new bootstrap.Tooltip(el);
  });
}


function addMsItem(button, itemData = {}) {
  const container = button.closest('fieldset').querySelector('.msitem-container');
  const index = container.children.length;

  const block = document.createElement('div');
  block.className = 'border rounded p-3 mb-3 bg-light';
  block.innerHTML = `
    <div class="d-flex justify-content-between align-items-center mb-2">
      <strong class="msitem-label">Content ${index + 1}</strong>
      <div class="btn-group btn-group-sm" role="group" aria-label="Content controls">
        <button type="button" class="btn btn-outline-secondary" onclick="moveMsItem(this, -1)" data-bs-toggle="tooltip" data-bs-placement="top" title="Move content up" >
          <i class="bi bi-arrow-up"></i>
        </button>
        <button type="button" class="btn btn-outline-secondary" onclick="moveMsItem(this, 1)" data-bs-toggle="tooltip" data-bs-placement="top" title="Move content down">
          <i class="bi bi-arrow-down"></i>
        </button>
        <button type="button" class="btn btn-danger" onclick="deleteMsItem(this)">
          Delete
        </button>
      </div>
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
      <button type="button" class="btn btn-sm btn-outline-primary mt-2" onclick="addPageRange(this, ${index})" aria-label="Add page range">Add page range</button>
    </div>
    
    <div class="row mb-2">
      <div class="col-md">
        <label class="form-label">Incipit<a href="https://tei-c.org/release/doc/tei-p5-doc/en/html/ref-incipit.html" target="_blank" class="ms-2 text-decoration-none" data-bs-toggle="tooltip" title="TEI Documentation"><i class="bi bi-box-arrow-up-right"></i></a></label>
        <textarea class="form-control autosize" name="msItemIncipit-${index}" placeholder="Enter incipit">${itemData.incipit || ''}</textarea>
      </div>
    </div>
    <div class="row mb-2">
      <div class="col-md">
        <label class="form-label">Explicit<a href="https://www.tei-c.org/release/doc/tei-p5-doc/en/html/ref-explicit.html" target="_blank" class="ms-2 text-decoration-none" data-bs-toggle="tooltip" title="TEI Documentation"><i class="bi bi-box-arrow-up-right"></i></a></label>
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
        <label class="form-label">Text languge<a href="https://www.tei-c.org/release/doc/tei-p5-doc/en/html/ref-textLang.html" target="_blank" class="ms-2 text-decoration-none" data-bs-toggle="tooltip" title="TEI Documentation"><i class="bi bi-box-arrow-up-right"></i></a></label>
        <input type="text" class="form-control lod-autocomplete" data-lod="wikidata-lang" name="msItemLang-${index}" placeholder="Enter text language" value="${itemData.textLang || ''}">
      </div>
      <div class="col-md-6">
        <label class="form-label">Text genre</label>
        <input type="text" class="form-control" name="msItemGenre-${index}" placeholder="Enter text genre" value="${itemData.textGenre || ''}">
      </div>
    </div>
  `;
  
  container.appendChild(block);
  renumberMsItems(container);


  block.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => {
    new bootstrap.Tooltip(el);
  });

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
        <button type="button" class="btn btn-sm btn-outline-danger" onclick="this.closest('.row').remove()" aria-label="Delete page range">Delete page range</button>
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
      <button type="button" class="btn btn-sm btn-outline-danger" onclick="this.closest('.row').remove()" aria-label="Delete page range">Delete page range</button>
    </div>
  `;
  container.appendChild(div);
}

function renumberMsItems(msitemContainer) {
  if (!msitemContainer) return;

  const blocks = Array.from(msitemContainer.children)
    .filter(el => el.classList.contains('border'));

  blocks.forEach((block, i) => {
    const label = block.querySelector('.msitem-label');
    if (label) {
      label.textContent = `Content ${i + 1}`;
    }
  });
}

function deleteMsItem(button) {
  const block = button.closest('.border');
  if (!block) return;

  const container = block.parentElement;
  block.remove();
  renumberMsItems(container);
}

function moveMsItem(button, direction) {
  const block = button.closest('.border');
  if (!block) return;

  const container = block.parentElement;
  if (!container) return;

  if (direction < 0 && block.previousElementSibling) {
    // Move up
    container.insertBefore(block, block.previousElementSibling);
  } else if (direction > 0 && block.nextElementSibling) {
    // Move down
    container.insertBefore(block.nextElementSibling, block);
  }

  renumberMsItems(container);
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
      <button type="button" class="btn btn-sm btn-danger" onclick="this.closest('.border').remove()" aria-label="Delete">Delete</button>
    </div>

    <div class="row mb-2">
      <div class="col-md">
        <label class="form-label">Previous owner<a href="https://www.tei-c.org/release/doc/tei-p5-doc/en/html/ref-name.html" target="_blank" class="ms-2 text-decoration-none" data-bs-toggle="tooltip" title="TEI Documentation"><i class="bi bi-box-arrow-up-right"></i></a></label>
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

    <div class="row mb-2">
      <div class="col-md-4">
        <label class="form-label">Human-readable period of ownership 
          <a href="https://www.tei-c.org/release/doc/tei-p5-doc/en/html/ref-date.html" target="_blank" class="ms-2 text-decoration-none" data-bs-toggle="tooltip" title="TEI Documentation">
            <i class="bi bi-box-arrow-up-right"></i>
          </a>
        </label>
        <input type="text" class="form-control" name="provDate-${index}" value="${itemData.date || ''}" placeholder="e.g. 13th-14th century">
      </div>
      <div class="col-md-4">
        <label class="form-label">Earliest possible date of ownership
          <a href="https://www.tei-c.org/release/doc/tei-p5-doc/en/html/ref-att.datable.w3c.html#tei_att.notBefore" target="_blank" class="ms-2 text-decoration-none" data-bs-toggle="tooltip" title="TEI Documentation">
            <i class="bi bi-box-arrow-up-right"></i>
          </a>
        </label>
        <input type="number" class="form-control" name="provNotBefore-${index}" value="${itemData.notBefore || ''}" placeholder="e.g. 1200" max="9999" step="1" oninput="limitYearLength(this)">
      </div>
      <div class="col-md-4">
        <label class="form-label">Latest possible date of ownership
          <a href="https://www.tei-c.org/release/doc/tei-p5-doc/en/html/ref-att.datable.w3c.html#tei_att.notAfter" target="_blank" class="ms-2 text-decoration-none" data-bs-toggle="tooltip" title="TEI Documentation">
            <i class="bi bi-box-arrow-up-right"></i>
          </a>
        </label>
        <input type="number" class="form-control" name="provNotAfter-${index}" value="${itemData.notAfter || ''}" placeholder="e.g. 1300" max="9999" step="1" oninput="limitYearLength(this)">
      </div>
    </div>
  `;

  container.appendChild(row);

  row.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => {
    new bootstrap.Tooltip(el);
  });
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
      <button type="button" class="btn btn-sm btn-danger" onclick="this.closest('.border').remove()" aria-label="Delete">Delete</button>
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
        <button type="button" class="btn btn-sm btn-outline-primary" onclick="addBiblAuthor(this, ${index})" aria-label="Add author">Add author</button>
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
        <button type="button" class="btn btn-sm btn-outline-primary" onclick="addBiblEditor(this, ${index})" aria-label="Add editor">Add editor</button>
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

  block.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => {
    new bootstrap.Tooltip(el);
  });
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
        <button type="button" class="btn btn-sm btn-outline-danger" onclick="this.closest('.row').remove()" aria-label="Delete">Delete</button>
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
        <button type="button" class="btn btn-sm btn-outline-danger" onclick="this.closest('.row').remove()" aria-label="Delete">Delete</button>
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

  
  // Responsible persons (safe iteration — deletion-proof)
  const persons = [];
  const respBlocks = form.querySelectorAll('.resp-container > .border');

  respBlocks.forEach((block) => {
    const nameField = block.querySelector(`[name^="respStmtName-"]`);
    const surnameField = block.querySelector(`[name^="respStmtSurname-"]`);
    const respField = block.querySelector(`[name^="respStmtResp-"]`);
    const refField = block.querySelector(`[name^="respStmtRef-"]`);
    const affilField = block.querySelector(`[name^="respStmtAffiliation-"]`);

    if (!nameField || !surnameField) return; // skip incomplete

    const affiliation = getFieldValueAndUri(form, affilField?.name || '');

    persons.push({
      name: nameField.value.trim(),
      surname: surnameField.value.trim(),
      affiliation,
      ref: refField ? refField.value.trim() : '',
      resp: respField ? respField.value.trim() : ''
    });
  });

  data.responsiblePersons = persons;


  //msItems with pageRanges
  // msItems with pageRanges (safe even after deletions)
  const items = [];
  const msItemBlocks = form.querySelectorAll('.msitem-container > .border');
  msItemBlocks.forEach((block, idx) => {
    const authorField = block.querySelector(`[name^="msItemAuthor-"]`);
    const langField = block.querySelector(`[name^="msItemLang-"]`);

    const pageRanges = [];
    block.querySelectorAll('.page-range-container .row').forEach(row => {
      const fromInput = row.querySelector('[name^="msItemPageFrom-"]');
      const toInput = row.querySelector('[name^="msItemPageTo-"]');
      pageRanges.push({
        from: fromInput?.value.trim() || '',
        to: toInput?.value.trim() || ''
      });
    });

    items.push({
      author: getFieldValueAndUri(form, authorField.name),
      title: block.querySelector(`[name^="msItemTitle-"]`)?.value || '',
      textLang: getFieldValueAndUri(form, langField?.name || ''),
      incipit: block.querySelector(`[name^="msItemIncipit-"]`)?.value || '',
      explicit: block.querySelector(`[name^="msItemExplicit-"]`)?.value || '',
      textFamily: block.querySelector(`[name^="msItemFamily-"]`)?.value || '',
      textSubFamily: block.querySelector(`[name^="msItemSubFamily-"]`)?.value || '',
      textGenre: block.querySelector(`[name^="msItemGenre-"]`)?.value || '',
      pageRanges
    });
  });
  data.msItems = items;


  // Structured hand description
  data.handDesc = {
    hands: data.hands || "",
    desc: data.handsDesc || ""
  };

  // Script notes (safe iteration — deletion-proof)
  const scriptNotes = [];
  const scriptBlocks = form.querySelectorAll('.scriptDesc-container > .border');

  scriptBlocks.forEach((block) => {
    const field = block.querySelector(`[name^="scriptNote-"]`);
    if (!field) return;

    scriptNotes.push({
      value: field.value.trim(),
      uri: field.dataset.lodUri || ""
    });
  });

  data.scriptNotes = scriptNotes;



  // Collect seals (multiple)
  // Seals (safe iteration — deletion-proof)
  const seals = [];
  const sealBlocks = form.querySelectorAll('.sealDesc-container > .border');

  sealBlocks.forEach((block) => {
    const field = block.querySelector(`[name^="seal-"]`);
    if (!field) return;
    seals.push(field.value.trim());
  });

  data.seals = seals;


  data.accMat = form.querySelector('[name="accMat"]')?.value.trim() || "";
  data.additions = form.querySelector('[name="additions"]')?.value.trim() || "";
  data.bindingDesc = form.querySelector('[name="bindingDesc"]')?.value.trim() || "";
  data.decoDesc = form.querySelector('[name="decoDesc"]')?.value.trim() || "";
  data.musicNotation = form.querySelector('[name="musicNotation"]')?.value.trim() || "";
  data.seals = seals;

  //Provenance entries (only structured, no provName-0 duplication)
    // Provenance (safe iteration — deletion-proof)
    const provenance = [];
    const provBlocks = form.querySelectorAll('.provenance-container > .border');

    provBlocks.forEach((block, idx) => {
      const nameField = block.querySelector(`[name^="provName-"]`);
      const typeField = block.querySelector(`[name^="provType-"]`);
      const geoField  = block.querySelector(`[name^="provGeo-"]`);
      const dateField = block.querySelector(`[name^="provDate-"]`);
      const notBeforeField = block.querySelector(`[name^="provNotBefore-"]`);
      const notAfterField  = block.querySelector(`[name^="provNotAfter-"]`);
      const settlementField = block.querySelector(`[name^="provSettlement-"]`);
      const countryField    = block.querySelector(`[name^="provCountry-"]`);

      provenance.push({
        name: getFieldValueAndUri(form, nameField?.name || ""),
        type: typeField?.value.trim() || "",
        geo: getFieldValueAndUri(form, geoField?.name || ""),
        date: dateField?.value.trim() || "",
        notBefore: notBeforeField?.value.trim() || "",
        notAfter: notAfterField?.value.trim() || "",
        settlement: getFieldValueAndUri(form, settlementField?.name || ""),
        country: getFieldValueAndUri(form, countryField?.name || "")
      });
    });

    data.provenance = provenance;



  //Literature
  const literature = [];
  let b = 0;
  while (true) {
    const type = form.querySelector(`[name="biblType-${b}"]`);
    if (!type) break;

    const bibl = {
      //type: type.value,
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

  // Include in-memory literature (from OpenLibrary + manual)
  if (form.literature && form.literature.length > 0) {
    data.literature = form.literature;
  }

  // Add structured publication metadata
  data.publicationStructured = {
    publisher: {
      name: "MANO - Manuscripts Online",
      ref: "https://mano-project.github.io/"
    },
    licence: {
      name: data.publicationStmt,
      target: buildLicenseUrl(data.publicationStmt)
    },
    date: getTodayISO()
  };

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
      <a href="${fieldData.uri}" target="_blank" class="ms-2 text-decoration-none" data-bs-toggle="tooltip" title="Visit ${sourceLabel} link">
        <i class="bi bi-box-arrow-up-right"></i>
      </a>
                
        

        <button type="button" class="btn btn-link text-danger lod-clear-btn ps-0 pt-0" 
          data-bs-toggle="tooltip" title="Remove ${sourceLabel} link" aria-label="Remove link">
    <i class="bi bi-x-square-fill"></i>
  </button>
      `;

      new bootstrap.Tooltip(badge.querySelector('[data-bs-toggle="tooltip"]'));
      new bootstrap.Tooltip(badge.querySelector('.lod-clear-btn'));

      badge.querySelector('.lod-clear-btn').addEventListener('click', () => {
        // dispose tooltip if active
        const tooltipInstance = bootstrap.Tooltip.getInstance(badge.querySelector('.lod-clear-btn'));
        if (tooltipInstance) tooltipInstance.dispose();

        const linkTooltip = bootstrap.Tooltip.getInstance(badge.querySelector('[data-bs-toggle="tooltip"]'));
        if (linkTooltip) linkTooltip.dispose();

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
  if (!accordion) return;

  const title = accordion.querySelector('h4')?.textContent.trim() || 'this manuscript description';

  const confirmed = confirm(
    `⚠️ You are about to permanently delete ${title}.\n\n` +
    `This action cannot be undone, and all entered data will be lost.\n\n` +
    `Do you really want to proceed?`
  );

  if (confirmed) {
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


function buildLicenseUrl(license) {
  if (!license) return "https://creativecommons.org/licenses/";
  const map = {
    "CC BY": "licenses/by/4.0/",
    "CC BY-SA": "licenses/by-sa/4.0/",
    "CC BY-ND": "licenses/by-nd/4.0/",
    "CC BY-NC": "licenses/by-nc/4.0/",
    "CC BY-NC-SA": "licenses/by-nc-sa/4.0/",
    "CC BY-NC-ND": "licenses/by-nc-nd/4.0/",
    "CC0": "publicdomain/zero/1.0/"
  };
  return `https://creativecommons.org/${map[license] || "licenses/"}`;
}

function getTodayISO() {
  const d = new Date();
  return d.toISOString().split('T')[0]; // yyyy-mm-dd
}

// PHYSICAL DESCRIPTION
// Add script note
function addScriptNote(button, scriptData = { value: "", uri: "" }) {
  const container = button.closest('fieldset').querySelector('.scriptDesc-container');
  const index = container.children.length;

  const block = document.createElement('div');
  block.className = 'border rounded p-2 mb-2 bg-light';
  block.innerHTML = `
    <div class="d-flex justify-content-between align-items-center mb-2">
      <strong>Script</strong>
      <button type="button" class="btn btn-sm btn-outline-danger" aria-label="Delete">Delete</button>
    </div>
    <input type="text"
           class="form-control lod-autocomplete"
           placeholder="Search script (Getty Vocabulary)"
           data-lod="getty-script"
           name="scriptNote-${index}"
           value="${scriptData.value || ''}"
           data-lod-uri="${scriptData.uri || ''}">
  `;

  block.querySelector('button').onclick = () => block.remove();
  container.appendChild(block);
}


// Add seal
function addSeal(button, text = "") {
  const container = button.closest('fieldset').querySelector('.sealDesc-container');
  const index = container.children.length;

  const block = document.createElement('div');
  block.className = 'border rounded p-2 mb-2 bg-light';
  block.innerHTML = `
    <div class="d-flex justify-content-between align-items-center mb-1">
      <strong>Seal</strong>
      <button type="button" class="btn btn-sm btn-outline-danger" aria-label="Delete">Delete</button>
    </div>
    <textarea class="form-control autosize" name="seal-${index}" placeholder="Describe seal">${text}</textarea>
  `;
  block.querySelector('button').onclick = () => block.remove();
  container.appendChild(block);
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
<TEI xmlns="http://www.tei-c.org/ns/1.0" ${data.xmlLang ? `xml:lang="${escapeXml(data.xmlLang)}"` : ''}>
  <teiHeader>
    <fileDesc>
      <titleStmt>
        <title type="main">${escapeXml(data.msTitle)}</title> ${data.responsiblePersons.map(p => `
          <respStmt${p.ref ? ` ref="${escapeXml(p.ref)}"` : ''}> 
          ${p.resp ? `<resp ref="${p.resp === 'com' 
          ? 'http://id.loc.gov/vocabulary/relators/com.html' 
          : 'http://id.loc.gov/vocabulary/relators/edt.html'}">${p.resp === 'com' ? 'compiler' : 'editor'}</resp>` : ''}
          <persName>
            <forename>${escapeXml(p.name)}</forename>
            <surname>${escapeXml(p.surname)}</surname>
            <affiliation${p.affiliation.uri ? ` ref="${escapeXml(p.affiliation.uri)}"` : ''}>${escapeXml(p.affiliation.value)}</affiliation>
          </persName>
        </respStmt>`).join('\n')}
      </titleStmt>
      <publicationStmt>
        <publisher ref="https://mano-project.github.io/">MANO - Manuscripts Online</publisher>
        <availability>
          <licence target="${buildLicenseUrl(data.publicationStmt)}">
            <p>${escapeXml(data.publicationStmt)}</p>
          </licence>
        </availability>
        <date when="${getTodayISO()}"/>
      </publicationStmt>
      <sourceDesc>
        <msDesc>
          <msIdentifier>
            ${xmlWithRef('country', countryIdentField)}
            ${xmlWithRef('settlement', settlementIdentField)}
            <geogName><geo>${escapeXml(data.geoRepository)}</geo></geogName>
            ${xmlWithRef('repository', repo)}
            <collection>${escapeXml(data.collection)}</collection>
            <idno type="sigle">${escapeXml(data.msSigle)}</idno>
            <msName>${escapeXml(data.msName)}</msName>
            <altIdentifier><idno>${escapeXml(data.altIdentifier)}</idno></altIdentifier>
          </msIdentifier>
          <msContents>
            <summary>${escapeXml(data.summaryContents)}</summary>
            ${(data.msItems || []).map((item, idx) => {
              const authorField = item.author || { value: '', uri: '' };
              const langField   = item.textLang || { value: '', uri: '' };

              return `
            <msItem n="${idx + 1}"> 
              <locusGrp>${(item.pageRanges || []).map(pr =>
                `<locus from="${escapeXml(pr.from || '')}" to="${escapeXml(pr.to || '')}"/>`
              ).join('\n')}</locusGrp>
              ${xmlWithRef('author', authorField)}
              <title>${escapeXml(item.title || '')}</title>
              ${langField.value
                ? `<textLang${langField.uri ? ` source="${escapeXml(langField.uri)}"` : ''}>${escapeXml(langField.value)}</textLang>`
                : ''
              }
              <incipit>${escapeXml(item.incipit || '')}</incipit>
              <explicit>${escapeXml(item.explicit || '')}</explicit>
              <note type="textual-family">${escapeXml(item.textFamily || '')}</note>
              <note type="textual-subfamily">${escapeXml(item.textSubFamily || '')}</note>
              <note type="textual-genre">${escapeXml(item.textGenre || '')}</note>
            </msItem>`;
            }).join('\n')}

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
            <handDesc hands="${escapeXml(data.hands)}">
              <p>${escapeXml(data.handsDesc)}</p>
            </handDesc>
            <scriptDesc>${(data.scriptNotes || []).map(sn => `
              <scriptNote${sn.uri ? ` source="${escapeXml(sn.uri)}"` : ''}>
                <p>${escapeXml(sn.value)}</p>
              </scriptNote>`).join('\n')}
            </scriptDesc>
            <musicNotation><p>${escapeXml(data.musicNotation)}</p></musicNotation>
            <decoDesc><p>${escapeXml(data.decoDesc)}</p></decoDesc>
            <additions><p>${escapeXml(data.additions)}</p></additions>
            <bindingDesc><p>${escapeXml(data.bindingDesc)}</p></bindingDesc>
            <sealDesc>${(data.seals || []).map(s => `
                <seal><p>${escapeXml(s)}</p></seal>`).join('\n')}
            </sealDesc>
            <accMat><p>${escapeXml(data.accMat)}</p></accMat>
          </physDesc>
          <history>
            <summary>${escapeXml(data.summaryProvenance)}</summary>
            <origin>${xmlWithRef('origPlace', origPlace)}
              <geo>${escapeXml(data.geoOrigin)}</geo>
              ${xmlWithRef('country', countryOriginField)}
              <origDate notBefore="${escapeXml(data.dateOriginNotBefore)}" notAfter="${escapeXml(data.dateOriginNotAfter)}">${escapeXml(data.dateOriginText)}</origDate>
            </origin> ${(data.provenance || []).map((prov, i) => {
              const provSettlementField = getFieldValueAndUri(form, `provSettlement-${i}`);
              const provCountryField = getFieldValueAndUri(form, `provCountry-${i}`);
              return `
            <provenance>
              ${prov.type 
                ? `<name type="${escapeXml(prov.type)}"${prov.name?.uri ? ` ref="${escapeXml(prov.name.uri)}"` : ''}>${escapeXml(prov.name.value)}</name>`
                : xmlWithRef('name', prov.name)}
              <date ${prov.notBefore ? `notBefore="${escapeXml(prov.notBefore)}"` : ''} ${prov.notAfter ? `notAfter="${escapeXml(prov.notAfter)}"` : ''}>${escapeXml(prov.date)}</date>
              <geo${prov.geo?.uri ? ` ref="${escapeXml(prov.geo.uri)}"` : ''}>${escapeXml(prov.geo?.value || '')}</geo>
              ${xmlWithRef('settlement', provSettlementField)}
              ${xmlWithRef('country', provCountryField)}
            </provenance>`;
            }).join('\n')}
          </history>
          <additional>
            <surrogates> 
              <bibl type="digi"> 
                <title xml:lang="en">Digital copy</title>
                <ref>${escapeXml(data.digi)}</ref>
              </bibl> 
              <bibl type="iiif-manifest"> 
                <title xml:lang="en">iiif-Manifest</title>
                <ref>${escapeXml(data.iiifManifest)}</ref>
              </bibl> 
              <bibl type="cat"> 
                <title xml:lang="en">Catalogue entry</title>
                <ref>${escapeXml(data.cat)}</ref>
              </bibl>
            </surrogates> 
            <listBibl>${(data.literature || []).map(lit => `
              <bibl ${lit.ref ? `ref="${escapeXml(lit.ref)}"` : ''}> ${(lit.authors || []).map(a => `
                <author>
                  <surname>${escapeXml(a.surname)}</surname>
                  <forename>${escapeXml(a.forename)}</forename>
                </author>`).join('')} ${(lit.editors || []).map(e => `<editor>${escapeXml(e)}</editor>`).join('')}
                <title>${escapeXml(lit.title)}</title>
                <pubPlace>${escapeXml(lit.pubPlace)}</pubPlace>
                <publisher>${escapeXml(lit.publisher)}</publisher>
                <series>${escapeXml(lit.series)}</series>
                <idno type="isbn">${escapeXml(lit.isbn)}</idno>
                <date when="${escapeXml(lit.date)}">${escapeXml(lit.date)}</date>
                <citedRange>${escapeXml(lit.citedRange)}</citedRange>
              </bibl>`).join('\n')}
            </listBibl>
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

  const modalEl = document.getElementById('xmlModal');

  if (xmlPreviewCM) {
    xmlPreviewCM.setValue(xml);
  } else {
    // Fallback if CodeMirror is not available or not initialized
    const fallback = document.getElementById('xmlPreviewEditor');
    if (fallback) {
      fallback.textContent = xml;
    }
  }

  const modal = new bootstrap.Modal(modalEl);
  modal.show();

  return xml;
}


function downloadXML(formId) {
  //if (!validateMandatoryFields(formId)) return; //stop if invalid

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

  // Show success modal
  const modal = new bootstrap.Modal(document.getElementById('xmlDownloadSuccessModal'));
  modal.show();

  // Re-enable JSON download inside modal
  const btn = document.getElementById('downloadJSONfromModal');
  if (btn) {
    btn.onclick = () => {
      modal.hide();
      document.getElementById('downloadAllJSON').click();
    };
  }
}



function buildCombinedFileName(all) {
  const titles = all.map(row => row.msTitle?.trim() || 'Untitled');
  return titles.join('_').replace(/[\\/:*?"<>|]/g, '_');
}



document.getElementById('downloadAllJSON').addEventListener('click', () => {
  if (!validateAllBeforeDownload()) return;

  const forms = [...document.querySelectorAll('.msForm')];
  const all = forms.map(f => getFormData(f.id));
  const fileBase = buildCombinedFileName(all);
  downloadFile(`${fileBase}.json`, JSON.stringify(all, null, 2), 'application/json');

  //Show success modal
  const modal = new bootstrap.Modal(document.getElementById('jsonDownloadSuccessModal'));
  modal.show();
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

            // Restore publication data
            if (rec.publicationStructured) {
              const pub = rec.publicationStructured;
              const licenseSelect = form.querySelector('[name="publicationStmt"]');
              if (licenseSelect && pub.licence?.name) {
                licenseSelect.value = pub.licence.name;
              }
            }


            
          // Restore responsible persons
          const respButton = formElement.querySelector('.resp-container + .d-flex button');
          if (rec.responsiblePersons) {
            rec.responsiblePersons.forEach((p, index) => {
              addRespPerson(respButton);
              const row = formElement.querySelector('.resp-container').children[index];
              row.querySelector(`[name="respStmtResp-${index}"]`).value = p.resp || '';

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

                //Re-check the Unknown Author box if needed
                const authorInput = msRow.querySelector(`[name="msItemAuthor-${idx}"]`);
                const unknownCheckbox = msRow.querySelector(`#unknownAuthor-${idx}`);
                if (
                  authorInput?.value?.trim().toLowerCase() === 'unknown or anonymous' ||
                  authorInput?.dataset.lodUri === 'https://www.wikidata.org/wiki/Q4233718'
                ) {
                  unknownCheckbox.checked = true;
                }
              });
            }

            // Restore script notes
            const scriptBtn = formElement.querySelector('button[onclick*="addScriptNote"]');
            if (rec.scriptNotes) {
              rec.scriptNotes.forEach((sn, idx) => {
                addScriptNote(scriptBtn, sn);
                const scriptRow = formElement.querySelector('.scriptDesc-container').children[idx];
                const input = scriptRow.querySelector(`[name="scriptNote-${idx}"]`);

                // Recreate LOD link badge (link icon + delete icon)
                if (sn.uri) {
                  input.dataset.lodUri = sn.uri;
                  addBadgeForLODField(input, sn.uri);
                }

                // Enable Bootstrap tooltips
                scriptRow.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => {
                  new bootstrap.Tooltip(el);
                });
              });
            }


            // Restore seals
            const sealBtn = formElement.querySelector('button[onclick*="addSeal"]');
            if (rec.seals) {
              rec.seals.forEach(text => addSeal(sealBtn, text));
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
              //provRow.querySelector(`[name="provGeo-${i}"]`).value = prov.geo || '';
              provRow.querySelector(`[name="provGeo-${i}"]`).value = typeof prov.geo === 'object' ? (prov.geo.value || '') : (prov.geo || '');
              //Settlement / Country with { value, uri }
              restoreLODField(provRow, `provSettlement-${i}`, prov.settlement);
              restoreLODField(provRow, `provCountry-${i}`, prov.country);
            });
          }

            // Restore literature list (modern system)
            form.literature = rec.literature || [];
            renderLiteratureList(form);


        });
      } catch (err) {
        alert('Invalid JSON:\n' + err.message); //show the  issue
        console.error("Invalid JSON:", err);
      }
    }

    else if (file.name.endsWith('.xml')) {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(content, "application/xml");
      const xmlLang = xmlDoc.querySelector("TEI")?.getAttribute("xml:lang") || "";

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

      const geoRepository = xmlDoc.querySelector("msIdentifier > geogName > geo")?.textContent.trim() || "";

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


      const data = {
        // Accordion 1
        msTitle: get("title"),
        xmlLang,

        // Publication structure
        publicationStructured: {
          publisher: {
            name: get("publicationStmt > publisher"),
            ref: getAttr("publicationStmt > publisher", "ref")
          },
          licence: {
            name: get("publicationStmt > availability > licence > p"),
            target: getAttr("publicationStmt > availability > licence", "target")
          },
          date: getAttr("publicationStmt > date", "when")
        },

        // Keep compatibility
        publicationStmt: get("publicationStmt > availability > licence > p"),

        repository,
        geoRepository,
        settlementIdent,
        countryIdent,

        // updated msIdentifier fields
        msName: get("msIdentifier > msName"),
        collection: get("msIdentifier > collection"),
        msSigle: get("msIdentifier > idno[type='sigle']"),
        altIdentifier: get("msIdentifier > altIdentifier > idno"),

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
        hands: getAttr("handDesc", "hands"),
        handsDesc: get("handDesc > p"),
        scriptNotes: [...xmlDoc.querySelectorAll("scriptNote")].map(sn => ({
          value: sn.querySelector("p")?.textContent.trim() || "",
          uri: sn.getAttribute("source") || ""
        })),
        script,
        // Newly added physDesc elements
        accMat: get("physDesc > accMat > p"),
        additions: get("physDesc > additions > p"),
        bindingDesc: get("physDesc > bindingDesc > p"),
        decoDesc: get("physDesc > decoDesc > p"),
        musicNotation: get("physDesc > musicNotation > p"),
        seals: [...xmlDoc.querySelectorAll("sealDesc > seal > p")].map(p => p.textContent.trim()),



        // Accordion 4 
        summaryProvenance: get("history > summary"),

        origPlace,
        geoOrigin,
        countryOrigin,
        dateOriginNotBefore: getAttr("origin > origDate", "notBefore"),
        dateOriginNotAfter: getAttr("origin > origDate", "notAfter"),
        dateOriginText: get("origin > origDate"),
        
        
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
        const respEl = resp.querySelector("resp");
        const respType = respEl?.getAttribute("ref")?.includes("com") ? "com" :
                        respEl?.getAttribute("ref")?.includes("edt") ? "edt" : "";

        data.responsiblePersons.push({
          name: resp.querySelector("forename")?.textContent || '',
          surname: resp.querySelector("surname")?.textContent || '',
          affiliation: {
            value: affilEl?.textContent || '',
            uri: affilEl?.getAttribute("ref") || ''
          },
          ref: respRef,
          resp: respType
        });
      });

       //provenance
      const provenance = [];
      xmlDoc.querySelectorAll("provenance").forEach(provEl => {
        provenance.push({
          name: {
            value: provEl.querySelector("name")?.textContent || "",
            uri: provEl.querySelector("name")?.getAttribute("ref") || ""
          },
          type: provEl.querySelector("name")?.getAttribute("type") || "",
          date: provEl.querySelector("date")?.textContent || "",
          notBefore: provEl.querySelector("date")?.getAttribute("notBefore") || "",
          notAfter: provEl.querySelector("date")?.getAttribute("notAfter") || "",
          geo: {
            value: provEl.querySelector("geo")?.textContent || "",
            uri: provEl.querySelector("geo")?.getAttribute("ref") || ""
          },
          settlement: {
            value: provEl.querySelector("settlement")?.textContent || "",
            uri: provEl.querySelector("settlement")?.getAttribute("ref") || ""
          },
          country: {
            value: provEl.querySelector("country")?.textContent || "",
            uri: provEl.querySelector("country")?.getAttribute("ref") || ""
          }
        });
      });
      data.provenance = provenance;



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
            uri: item.querySelector("textLang")?.getAttribute("source") || ''
          },
          incipit: item.querySelector("incipit")?.textContent || '',
          explicit: item.querySelector("explicit")?.textContent || '',
          textFamily: item.querySelector("note[type='textual-family']")?.textContent || '',
          textSubFamily: item.querySelector("note[type='textual-subfamily']")?.textContent || '',
          textGenre: item.querySelector("note[type='text-genre']")?.textContent || ''
        });

      });

      // Literature entries
      // Literature entries now inside <listBibl>
      xmlDoc.querySelectorAll("listBibl > bibl").forEach(bibl => {
        const type = bibl.getAttribute("type") || '';
        const ref = bibl.getAttribute("ref") || '';
        const authors = [...bibl.querySelectorAll("author")].map(a => ({
          forename: a.querySelector("forename")?.textContent || '',
          surname: a.querySelector("surname")?.textContent || ''
        }));

        const editors = [...bibl.querySelectorAll("editor")].map(e => e.textContent || '');

        data.literature.push({
          type,
          ref,
          title: bibl.querySelector("title")?.textContent || '',
          date: bibl.querySelector("date")?.getAttribute("when") || '',
          citedRange: bibl.querySelector("citedRange")?.textContent || '',
          pubPlace: bibl.querySelector("pubPlace")?.textContent || '',
          publisher: bibl.querySelector("publisher")?.textContent || '',
          series: bibl.querySelector("series")?.textContent || '',
          isbn: bibl.querySelector("idno[type='isbn']")?.textContent || '',
          authors,
          editors,
          source: ref && ref.includes("openlibrary.org") ? "openLibrary" : "manual"
        });
      });


      // Inject into form
      /*const formElement = container.children[0];
      const form = formElement.querySelector('.msForm');*/
      // Inject into form: reuse first form if present, otherwise create a new one
      let formElement;

      if (container.children.length > 0) {
        formElement = container.children[0];
      } else {
        formElement = addManuscriptForm({}, false); // create a new empty manuscript form
      }

      const form = formElement.querySelector('.msForm');

      form.reset();
      form.querySelector('.resp-container').innerHTML = '';
      form.querySelector('.msitem-container').innerHTML = '';
      // Reset modern literature UI elements
      const litList = form.querySelector('.literature-list');
      const litForm = form.querySelector('.literature-form');
      if (litList) litList.innerHTML = '';
      if (litForm) {
        litForm.style.display = 'none';
        litForm.innerHTML = '';
      }
      // Also reset in-memory store
      form.literature = [];
      renderLiteratureList(form);


      const title = data.msTitle?.trim() || 'Manuscript';
      formElement.querySelector('h4').textContent = title;

      Object.entries(data).forEach(([key, value]) => {
        if (typeof value !== 'object') {
          const input = form.querySelector(`[name="${key}"]`);
          if (input) input.value = value;
        }
      });

    // Restore Literature references (new system)
    form.literature = data.literature || [];
    renderLiteratureList(form);


      // Responsible persons
      const respButton = formElement.querySelector('.resp-container + .d-flex button');
        data.responsiblePersons.forEach((p, i) => {
          addRespPerson(respButton);
          const row = formElement.querySelector('.resp-container').children[i];
          
          row.querySelector(`[name="respStmtName-${i}"]`).value = p.name;
          row.querySelector(`[name="respStmtSurname-${i}"]`).value = p.surname;
          row.querySelector(`[name="respStmtResp-${i}"]`).value = p.resp || '';
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

        //Re-check the Unknown Author box if needed
        const authorInput = msRow.querySelector(`[name="msItemAuthor-${idx}"]`);
        const unknownCheckbox = msRow.querySelector(`#unknownAuthor-${idx}`);
        if (
          authorInput?.value?.trim().toLowerCase() === 'unknown or anonymous' ||
          authorInput?.dataset.lodUri === 'https://www.wikidata.org/wiki/Q4233718'
        ) {
          unknownCheckbox.checked = true;
        }
      });

      //Restore script
      restoreLODField(form, "script", data.script);
      //Restore script notes (multiple, each LOD-enabled)
      const scriptBtn = formElement.querySelector('button[onclick*="addScriptNote"]');
      data.scriptNotes.forEach((sn, idx) => {
        addScriptNote(scriptBtn, sn);
        const scriptRow = formElement.querySelector(`.scriptDesc-container`).children[idx];
        const input = scriptRow.querySelector(`[name="scriptNote-${idx}"]`);
        if (input) restoreLODField(scriptRow, input.name, sn);
      });
      // Restore handDesc
      form.querySelector('[name="hands"]').value = data.hands || '';
      form.querySelector('[name="handsDesc"]').value = data.handsDesc || '';
      // Restore Physical Description
      form.querySelector('[name="accMat"]').value = data.accMat || '';
      form.querySelector('[name="additions"]').value = data.additions || '';
      form.querySelector('[name="bindingDesc"]').value = data.bindingDesc || '';
      form.querySelector('[name="decoDesc"]').value = data.decoDesc || '';
      form.querySelector('[name="musicNotation"]').value = data.musicNotation || '';
      // Restore seals (multiple)
      const sealBtn = formElement.querySelector('button[onclick*="addSeal"]');
      data.seals.forEach(text => addSeal(sealBtn, text));

      

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
        //provRow.querySelector(`[name="provGeo-${i}"]`).value = prov.geo || '';
        provRow.querySelector(`[name="provGeo-${i}"]`).value = typeof prov.geo === 'object' ? (prov.geo.value || '') : (prov.geo || '');
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
        <a href="${r.uri}" target="_blank" class="ms-2 text-decoration-none" data-bs-toggle="tooltip" title="Visit ${sourceLabel} link">
          <i class="bi bi-box-arrow-up-right"></i>
        </a>

          <button type="button" class="btn btn-link text-danger lod-clear-btn ps-0 pt-0" 
          data-bs-toggle="tooltip" title="Remove ${sourceLabel} link" aria-label="Remove link">
    <i class="bi bi-x-square-fill"></i>
  </button>
        `;

        new bootstrap.Tooltip(badge.querySelector('[data-bs-toggle="tooltip"]'));
        new bootstrap.Tooltip(badge.querySelector('.lod-clear-btn'));

        badge.querySelector('.lod-clear-btn').addEventListener('click', () => {
          // dispose tooltip if active
          const tooltipInstance = bootstrap.Tooltip.getInstance(badge.querySelector('.lod-clear-btn'));
          if (tooltipInstance) tooltipInstance.dispose();

          const linkTooltip = bootstrap.Tooltip.getInstance(badge.querySelector('[data-bs-toggle="tooltip"]'));
          if (linkTooltip) linkTooltip.dispose();
          
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






// Enhanced Input Listener with loading state 
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
  <a href="${uri}" target="_blank" class="ms-2 text-decoration-none" data-bs-toggle="tooltip" title="Visit ${sourceLabel} link">
    <i class="bi bi-box-arrow-up-right"></i>
  </a>

    <button type="button" class="btn btn-link text-danger lod-clear-btn ps-0 pt-0" 
        data-bs-toggle="tooltip"  title="Remove ${sourceLabel} link" aria-label="Remove link">
    <i class="bi bi-x-square-fill"></i>
  </button>
  `;

  new bootstrap.Tooltip(badge.querySelector('[data-bs-toggle="tooltip"]'));
  new bootstrap.Tooltip(badge.querySelector('.lod-clear-btn'));

  badge.querySelector('.lod-clear-btn').addEventListener('click', () => {
    // dispose tooltip if active
    const tooltipInstance = bootstrap.Tooltip.getInstance(badge.querySelector('.lod-clear-btn'));
    if (tooltipInstance) tooltipInstance.dispose();

    const linkTooltip = bootstrap.Tooltip.getInstance(badge.querySelector('[data-bs-toggle="tooltip"]'));
    if (linkTooltip) linkTooltip.dispose();
    
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

//Tooltip
document.addEventListener('DOMContentLoaded', function () {
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });
});


// --- EXIT WARNING (only if there is data) ---
window.addEventListener('beforeunload', (event) => {
  // Check if any input, select, or textarea has a non-empty value
  const hasData = Array.from(document.querySelectorAll('input, select, textarea'))
    .some(el => el.value && el.value.trim() !== '');

  if (!hasData) return; // allow leaving silently

  // Trigger browser's generic leave warning
  event.preventDefault();
  event.returnValue = 'You are about to leave the Metadata Editor. Have you downloaded your data? Unsaved changes may be lost.'; // required for some browsers
});




// ========== Literature References ==========

// Internal store per manuscript form
function getLitStore(form) {
  if (!form.literature) form.literature = [];
  return form.literature;
}


// Check if an item (OpenLibrary or manual) is already in the list
function isDuplicateOpenLibraryItem(form, candidate, ignoreIndex = null) {
  const items = getLitStore(form);

  const candRef  = (candidate.ref  || '').trim();
  const candIsbn = (candidate.isbn || '').trim();

  return items.some((item, idx) => {
    // When editing an existing entry, skip comparing with itself
    if (ignoreIndex !== null && idx === ignoreIndex) return false;

    const itemRef  = (item.ref  || '').trim();
    const itemIsbn = (item.isbn || '').trim();

    // same OpenLibrary URL?
    if (candRef && itemRef && candRef === itemRef) return true;

    // same ISBN?
    if (candIsbn && itemIsbn && candIsbn === itemIsbn) return true;

    return false;
  });
}




// Render the literature list
function renderLiteratureList(form) {
  const list = form.querySelector('.literature-list');
  list.innerHTML = "";
  const items = getLitStore(form);

  if (items.length === 0) {
    list.innerHTML = `<div class="text-muted">
      No literature references added yet. 
      Start by <strong>searching the database</strong> above, or 
      <strong>enter a reference manually</strong> if it isn't available.
    </div>`;
    return;
  }

  items.forEach((lit, i) => {
    const div = document.createElement('div');
    div.className = "border-bottom py-2";

    // Authors formatted as "Surname, Forename"
    const authorText = lit.authors?.length
      ? lit.authors.map(a => `${a.surname}${a.forename ? ', ' + a.forename : ''}`).join('; ')
      : '';

    // Main info block (with all enriched metadata)
    const info = `
      <div class="d-flex justify-content-between align-items-start">
        <div>
          ${authorText ? `<strong>${authorText}</strong> – ` : ''}
          <em>${lit.title || '(No title)'}</em>${lit.date ? ` (${lit.date})` : ''}
          ${lit.ref ? `
            <a href="${lit.ref}" target="_blank" class="text-primary ms-1 align-middle"
              data-bs-toggle="tooltip" title="Open reference">
              <i class="bi bi-link-45deg"></i>
            </a>` : ''}
          ${lit.publisher || lit.pubPlace ? `<br><span class="small text-muted">${[lit.publisher, lit.pubPlace].filter(Boolean).join(', ')}</span>` : ''}
          ${lit.series ? `<br><span class="small text-muted">Series: ${lit.series}</span>` : ''}
          ${lit.isbn ? `<br><span class="small text-muted">ISBN: ${lit.isbn}</span>` : ''}
        </div>
        <div class="ms-2 text-nowrap">
          ${lit.source === "manual" ? `
            <button class="btn btn-sm btn-outline-secondary me-2" aria-label="Edit">Edit</button>
          ` : ''}
          <button class="btn btn-sm btn-outline-danger" aria-label="Delete">Delete</button>
        </div>
      </div>

      <!-- Cited range input -->
      <div class="mt-2">
        <label class="form-label small mb-1 text-muted">Cited pages / range:</label>
        <input type="text" class="form-control form-control-sm cited-range-input" 
          placeholder="e.g. pp. 23–45" value="${lit.citedRange || ''}">
      </div>
    `;

    div.innerHTML = info;

    // Handle Edit button (manual items)
    const editBtn = div.querySelector('.btn-outline-secondary');
    if (editBtn) {
      editBtn.type = 'button';   
      editBtn.onclick = () => showLiteratureForm(form, lit, i);
    }

    // Handle Delete button
    const delBtn = div.querySelector('.btn-outline-danger');
    delBtn.type = 'button';
    delBtn.onclick = () => {
      items.splice(i, 1);
      renderLiteratureList(form);
    };

    // Handle citedRange live updates
    const citedInput = div.querySelector('.cited-range-input');
    citedInput.addEventListener('input', e => {
      lit.citedRange = e.target.value.trim();
    });

    list.appendChild(div);
  });

  // Enable Bootstrap tooltips
  const tooltipTriggerList = [].slice.call(list.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map(el => new bootstrap.Tooltip(el));
}


// Show manual form (add or edit)
function showLiteratureForm(form, lit = {}, index = null) {
  const container = form.querySelector('.literature-form');
  container.style.display = "block";

  container.innerHTML = `
    <h6>${index === null ? "Add new reference" : "Edit reference"}</h6>

    <div class="row mb-2">
      <div class="col-md-9">
        <label class="form-label">Title <span class="required-star" data-bs-toggle="tooltip" title="Required field">*</span></label>
        <input type="text" class="form-control lit-title" value="${lit.title || ''}">
      </div>
      <div class="col-md-3">
        <label class="form-label">Year</label>
        <input type="number" min="1" step="1" class="form-control lit-date" value="${lit.date || ''}">
      </div>
    </div>

    <div class="mb-2">
      <label class="form-label">Author(s) <span class="required-star" data-bs-toggle="tooltip" title="Required field">*</span></label>
      <div class="lit-authors"></div>
      <button type="button" class="btn btn-sm btn-outline-primary lit-add-author" aria-label="Add author">Add author</button>
    </div>

    <div class="row mb-2">
      <div class="col-md-6">
        <label class="form-label">Publisher</label>
        <input type="text" class="form-control lit-publisher" value="${lit.publisher || ''}">
      </div>
      <div class="col-md-6">
        <label class="form-label">Publishing place</label>
        <input type="text" class="form-control lit-place" value="${lit.pubPlace || ''}">
      </div>
    </div>

    <div class="row mb-2">
      <div class="col-md-6">
        <label class="form-label">Series</label>
        <input type="text" class="form-control lit-series" value="${lit.series || ''}">
      </div>
      <div class="col-md-6">
        <label class="form-label">ISBN / ISSN</label>
        <input type="text" class="form-control lit-isbn" value="${lit.isbn || ''}">
      </div>
    </div>

    <div class="row mb-2">
      <div class="col-md-12">
        <label class="form-label">Cited pages / range</label>
        <input type="text" class="form-control lit-cited" placeholder="e.g. pp. 23–45" value="${lit.citedRange || ''}">
      </div>
    </div>

    <div class="d-flex gap-2 mt-2">
      <button type="button" class="btn btn-success lit-save-btn" aria-label="Add to literature list">
        ${index === null ? "Add to literature list" : "Update literature reference"}
      </button>
      <button type="button" class="btn btn-outline-secondary lit-cancel-btn" aria-label="Cancel">Cancel</button>
    </div>
  `;

  //Re-initialize Bootstrap tooltips inside the form (for required-star tooltips)
  container.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => {
    new bootstrap.Tooltip(el);
  });

  // ---- authors UI ----
  const authorsWrap = container.querySelector('.lit-authors');

  function addAuthorRow(a = { forename: '', surname: '' }) {
    const row = document.createElement('div');
    row.className = 'row g-2 align-items-end mb-2 lit-author-row';
    row.innerHTML = `
      <div class="col-md-5">
        <input type="text" class="form-control lit-author-forename" placeholder="Forename" value="${a.forename || ''}">
      </div>
      <div class="col-md-5">
        <input type="text" class="form-control lit-author-surname" placeholder="Surname" value="${a.surname || ''}">
      </div>
      <div class="col-md-2">
        <button type="button" class="btn btn-sm btn-outline-danger lit-author-del" aria-label="Delete">Delete</button>
      </div>
    `;
    row.querySelector('.lit-author-del').onclick = () => row.remove();
    authorsWrap.appendChild(row);
  }

  if (lit.authors && lit.authors.length) {
    lit.authors.forEach(addAuthorRow);
  } else {
    addAuthorRow(); // one empty row by default
  }

  container.querySelector('.lit-add-author').onclick = () => addAuthorRow();


  container.querySelector('.lit-save-btn').onclick = () => {
    const titleInput = container.querySelector('.lit-title');
    const authors = [...container.querySelectorAll('.lit-author-row')].map(r => ({
      forename: r.querySelector('.lit-author-forename').value.trim(),
      surname:  r.querySelector('.lit-author-surname').value.trim()
    })).filter(a => a.forename || a.surname);

    // --- Validation: Title and at least one author are required ---
    if (titleInput.value.trim() === '' || authors.length === 0) {
      alert('Please enter at least a Title and one Author before adding the reference.');
      return;
    }

    const entry = {
      title: titleInput.value.trim(),
      date: container.querySelector('.lit-date').value.trim(),
      publisher: container.querySelector('.lit-publisher').value.trim(),
      pubPlace: container.querySelector('.lit-place').value.trim(),
      series: container.querySelector('.lit-series').value.trim(),
      isbn: container.querySelector('.lit-isbn').value.trim(),
      citedRange: container.querySelector('.lit-cited').value.trim(),
      authors,
      editors: lit.editors || [],
      ref: lit.ref || "",
      source: "manual"
    };

    const store = getLitStore(form);
    if (isDuplicateOpenLibraryItem(form, entry, index)) {
      alert("This title (same ISBN or reference) is already in your literature list.");
      return;
    }

    if (index === null) {
      store.push(entry);
    } else {
      store[index] = entry;
    }

    container.style.display = "none";
    renderLiteratureList(form);


    container.style.display = "none";
    renderLiteratureList(form);
  };


  container.querySelector('.lit-cancel-btn').onclick = () => {
    container.style.display = "none";
    container.innerHTML = "";
  };
}



async function searchOpenLibrary(term) {
  term = term.trim();

  // Case 1: ISBN (10 or 13 digits)
  if (/^\d{9,13}X?$/.test(term)) {
    const res = await fetch(`https://openlibrary.org/isbn/${term}.json`);
    if (res.ok) {
      const ed = await res.json();
      return [mapOpenLibraryEdition(ed)];
    }
  }

  // Case 2: OpenLibrary ID
  if (/^OL\d+[MW]$/i.test(term)) {
    const endpoint = term.endsWith("M") ? "books" : "works";
    const res = await fetch(`https://openlibrary.org/${endpoint}/${term}.json`);
    if (res.ok) {
      const ed = await res.json();
      return [mapOpenLibraryEdition(ed)];
    }
  }

  // Case 3: Default search (title or general keyword)
  const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(term)}`;
  const res = await fetch(url);
  const data = await res.json();
  return (data.docs || []).slice(0, 10).map(mapOpenLibrarySearchDoc);
}

// Helper: normalize a single OpenLibrary edition or work record
// Used for exact lookups via /isbn/{isbn}.json or /books/{OLID}.json
function mapOpenLibraryEdition(ed) {
  return {
    //type: "book",
    title: ed.title || "",
    date: ed.publish_date || "",
    publisher: ed.publishers?.[0] || "",
    pubPlace: ed.publish_places?.[0] || "",
    authors: (ed.authors || []).map(a => ({ forename: "", surname: a.name || "" })),
    isbn: ed.isbn_13?.[0] || ed.isbn_10?.[0] || "",
    ref: `https://openlibrary.org${ed.key}`,
    source: "openlibrary"
  };
}

// Helper: normalize a search result document from /search.json
// Used when user searches by title or keyword (multiple results)
function mapOpenLibrarySearchDoc(d) {
  return {
    //type: "book",
    title: d.title || "",
    date: d.first_publish_year || "",
    publisher: d.publisher ? d.publisher[0] : "",
    pubPlace: d.publish_place ? d.publish_place[0] : "",
    authors: (d.author_name || []).map(n => {
      const parts = n.split(" ");
      return { forename: parts.slice(0, -1).join(" "), surname: parts.slice(-1)[0] };
    }),
    isbn: d.isbn ? d.isbn[0] : "",
    ref: d.key ? `https://openlibrary.org${d.key}` : "",
    source: "openlibrary"
  };
}



// Hook up events when forms are created
// Live autocomplete for literature search
document.addEventListener('input', async (e) => {
  const input = e.target.closest('.lit-search-input');
  if (!input) return;

  const form = input.closest('.msForm');
  const resultsBox = form.querySelector('.lit-search-results');

  const term = input.value.trim();
  if (term.length < 3) {
    resultsBox.innerHTML = "";
    return;
  }

  resultsBox.innerHTML = `<div class="text-muted">Searching...</div>`;

  try {
    const results = await searchOpenLibrary(term);

    resultsBox.innerHTML = "";
    if (!results.length) {
      resultsBox.innerHTML = `<div class="text-muted">No results found</div>`;
      return;
    }

    results.forEach(r => {
      const div = document.createElement('div');
      div.className = "lit-result border rounded p-2 mb-2 bg-white";
      div.style.cursor = "pointer";

      // Build human-readable authors string
      const authorText = r.authors.map(a =>
        `${a.forename ? a.forename + ' ' : ''}${a.surname}`
      ).join(', ');

      // Info rows: publisher, place, series, ISBN
      const extraInfo = [
        r.publisher && r.pubPlace ? `${r.publisher}, ${r.pubPlace}` :
          (r.publisher || r.pubPlace || ''),
        r.language ? `Language: ${r.language}` : '',
        r.series ? `Series: ${r.series}` : '',
        r.isbn ? `ISBN: ${r.isbn}` : ''
      ].filter(Boolean).join(' — ');

      // Build the card HTML
      div.innerHTML = `
      <div>
        <strong>${r.title}</strong> ${r.date ? '(' + r.date + ')' : ''}
        ${r.ref ? `
          <a href="${r.ref}" target="_blank" class="text-primary ms-1 align-middle"
            data-bs-toggle="tooltip" title="Open reference">
            <i class="bi bi-link-45deg"></i>
          </a>` : ''}
        <div class="small text-muted">${r.authors.map(a => `${a.forename ? a.forename + ' ' : ''}${a.surname}`).join(', ') || ''}</div>
      </div>
    `;


      /*div.onclick = async (ev) => {
        // avoid triggering selection when clicking the link icon
        if (ev.target.closest('a')) return;

        const workKey = r.ref ? r.ref.replace('https://openlibrary.org', '') : '';

        // Enrich with edition metadata
        if (workKey) {
          try {
            const eds = await fetchOpenLibraryWorkEditions(workKey);
            const best = pickBestEdition(eds, r.date);
            if (best) {
              r.publisher = best.publishers?.[0] || r.publisher || '';
              r.pubPlace = Array.isArray(best.publish_places)
                ? best.publish_places[0]
                : best.publish_places || r.pubPlace || '';
              r.series = safeGetSeries(best) || r.series || '';
              r.isbn = best.isbn_13?.[0] || best.isbn_10?.[0] || r.isbn || '';
              r.language = best.languages?.[0]?.key?.split('/').pop() || r.language || '';
              if (!r.date) r.date = extractYear(best.publish_date) || r.date;
            }
          } catch (e) {
            console.warn('OpenLibrary enrichment failed:', e);
          }
        }
        r.source = "openLibrary";
        getLitStore(form).push(r);
        resultsBox.innerHTML = "";
        renderLiteratureList(form);
        input.value = "";
      };*/
      
      /*NEW version */
            div.onclick = async (ev) => {
        // avoid triggering selection when clicking the link icon
        if (ev.target.closest('a')) return;

        const workKey = r.ref ? r.ref.replace('https://openlibrary.org', '') : '';

        // Enrich with edition metadata
        if (workKey) {
          try {
            const eds = await fetchOpenLibraryWorkEditions(workKey);
            const best = pickBestEdition(eds, r.date);
            if (best) {
              r.publisher = best.publishers?.[0] || r.publisher || '';
              r.pubPlace = Array.isArray(best.publish_places)
                ? best.publish_places[0]
                : best.publish_places || r.pubPlace || '';
              r.series = safeGetSeries(best) || r.series || '';
              r.isbn = best.isbn_13?.[0] || best.isbn_10?.[0] || r.isbn || '';
              r.language = best.languages?.[0]?.key?.split('/').pop() || r.language || '';
              if (!r.date) r.date = extractYear(best.publish_date) || r.date;
            }
          } catch (e) {
            console.warn('OpenLibrary enrichment failed:', e);
          }
        }

        r.source = "openLibrary";

        // 🔁 Duplicate check: same OpenLibrary ref or same ISBN already present?
        if (isDuplicateOpenLibraryItem(form, r)) {
          alert("This title is already in your literature list.");
          return; // do not add again
        }

        // If not a duplicate, add it as usual
        getLitStore(form).push(r);
        resultsBox.innerHTML = "";
        renderLiteratureList(form);
        input.value = "";
      };


      resultsBox.appendChild(div);
    });

    // Activate Bootstrap tooltips for the link icons
    const tooltipTriggerList = [].slice.call(resultsBox.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(el => new bootstrap.Tooltip(el));


  } catch (err) {
    console.error("OpenLibrary fetch failed:", err);
    resultsBox.innerHTML = `<div class="text-danger">Error fetching results</div>`;
  }
});

// Handle "Add literature reference manually" button
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('lit-add-manual-btn')) {
    const form = e.target.closest('.msForm');
    showLiteratureForm(form);
  }
});

async function fetchOpenLibraryWorkEditions(workKey) {
  // e.g. workKey = "/works/OL10015449W"
  const url = `https://openlibrary.org${workKey}/editions.json?limit=50`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`editions fetch ${res.status}`);
  return res.json(); // { entries: [...] }
}

function extractYear(str) {
  const m = String(str || '').match(/\b(\d{4})\b/);
  return m ? m[1] : '';
}

function pickBestEdition(editions, preferYear = '') {
  const arr = editions?.entries || editions || [];
  if (!arr.length) return null;

  // Score editions by richness of metadata
  const scored = arr.map(ed => {
    let score = 0;
    if (ed.publishers?.length) score += 2;
    if (ed.publish_places?.length) score += 2;
    if (ed.series && (Array.isArray(ed.series) ? ed.series.length : 1)) score += 1;
    if (ed.isbn_13?.length || ed.isbn_10?.length) score += 3;

    const edYear = extractYear(ed.publish_date);
    if (preferYear && edYear === String(preferYear)) score += 1;

    return { ed, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored[0].ed;
}

function safeGetSeries(ed) {
  if (!ed || !ed.series) return '';
  if (Array.isArray(ed.series)) return ed.series[0] || '';
  if (typeof ed.series === 'string') return ed.series;
  if (ed.series[0]?.name) return ed.series[0].name;
  return '';
}

// Limit year inputs to max 4 digits
function limitYearLength(el) {
  if (el.value.length > 4) {
    el.value = el.value.slice(0, 4);
  }
}



// --- Load Sample Button (XML version) ---
document.getElementById("loadSampleBtn")?.addEventListener("click", async () => {
  try {
    const response = await fetch("test/test-metadata/Bamberg_Staatsbibliothek_Can_6.xml");
    if (!response.ok) throw new Error("Failed to load XML sample");

    const xmlText = await response.text();

    // Create a synthetic File object and trigger the same upload logic
    const sampleFile = new File([xmlText], "Bamberg.xml", { type: "application/xml" });
    const fileInput = document.getElementById("fileUpload");

    // Reset and trigger the same code that handles uploads
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(sampleFile);
    fileInput.files = dataTransfer.files;

    // Manually trigger the change event to reuse existing upload logic
    fileInput.dispatchEvent(new Event("change", { bubbles: true }));

  } catch (error) {
    alert("Could not load sample XML: " + error.message);
  }
});




// --- Clear All Button ---
document.getElementById("clearAllBtn")?.addEventListener("click", () => {
  const confirmed = confirm("This will clear all entered data. Proceed?");
  if (confirmed) {
    document.getElementById("manuscriptFormsContainer").innerHTML = "";
    manuscriptCounter = 0;
  }
});


// Preview CodeMirror
document.addEventListener('DOMContentLoaded', function () {
  const previewTextarea = document.getElementById('xmlPreviewEditor');
  if (previewTextarea && window.CodeMirror) {
    xmlPreviewCM = CodeMirror.fromTextArea(previewTextarea, {
      mode: 'application/xml',
      lineNumbers: true,
      lineWrapping: true,
      readOnly: true,
      theme: 'default'
    });

    // Fix layout when modal is shown (CodeMirror needs a refresh)
    const previewModal = document.getElementById('xmlModal');
    if (previewModal) {
      previewModal.addEventListener('shown.bs.modal', () => {
        xmlPreviewCM.refresh();
      });
    }
  }
});
