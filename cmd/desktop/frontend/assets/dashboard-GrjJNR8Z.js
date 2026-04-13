import{a as e,c as t,d as n,f as r,i,l as a,n as o,o as s,p as c,r as l,s as u,t as d,u as f}from"./api-DvQmaXxd.js";window.businessPage=1;var p=[],m=[];async function h(){let e=document.getElementById(`page-content`);try{m=await o.get(`/businesses/my`)||[],g(m)}catch(t){e.innerHTML=`<div class="empty-state"><h4>${c(`Xatolik`)}</h4><p>${l(t.message)}</p></div>`}}function g(e){e&&(p=e,window.businessPage=1);let t=Math.ceil(p.length/10);window.businessPage>t&&(window.businessPage=t||1);let n=(window.businessPage-1)*10,r=p.slice(n,n+10),a=document.getElementById(`page-content`);a.innerHTML=`
      <div class="card">
        <div class="card-header">
           <h3 style="margin:0; font-size:16px;">${c(`Mening bizneslarim`)}</h3>
           <div class="toolbar">
             <div class="search-box">
               <span class="search-icon">🔍</span>
               <input type="text" placeholder="${c(`Qidirish...`)}" id="business-search" value="${l(document.getElementById(`business-search`)?.value||``)}" oninput="filterBusinesses(this.value)">
             </div>
             <button class="btn btn-primary btn-sm" onclick="openBusinessModal()">${c(`Qo'shish`)}</button>
           </div>
        </div>
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th style="text-align:center">№</th>
                <th style="text-align:center">${c(`Nomi`)}</th>
                <th style="text-align:center">${c(`Manzil`)}</th>
                <th style="text-align:center">${c(`Balans`)}</th>
                <th style="text-align:center">${c(`Hisob raqam`)}</th>
                <th style="text-align:center">${c(`Yaratilgan`)}</th>
                <th style="text-align:center">${c(`Amallar`)}</th>
              </tr>
            </thead>
            <tbody>
              ${r.length===0?`<tr><td colspan="7" style="text-align:center;padding:40px;color:var(--text-muted);">${c(`Bizneslar yo'q`)}</td></tr>`:r.map((e,t)=>`
                  <tr>
                    <td style="text-align:center;">${n+t+1}</td>
                    <td>
                       <div style="font-weight:700; color:var(--text-primary); font-size:15px;">${l(e.name)}</div>
                       <div style="font-size:11px; color:var(--text-muted); opacity:0.8;">${l(e.description)||c(`Tavsif yo'q`)}</div>
                    </td>
                    <td>
                      ${e.regionName?`<div style="font-size:13px;">📍 ${l(e.regionName)}</div>`:``}
                      ${e.districtName?`<div style="font-size:11px; opacity:0.7;">${l(e.districtName)}, ${l(e.marketName||``)}</div>`:`—`}
                      ${e.address?`<div style="font-size:10px; opacity:0.6; font-style:italic;">🏠 ${l(e.address)}</div>`:``}
                    </td>
                    <td class="price" style="text-align:center; font-weight:700; ${e.balance<0?`color: #ef4444;`:``}">${s(e.balance)} ${c(`so'm`)}</td>
                    <td style="text-align:center;"><code style="background:var(--bg-glass); padding:2px 6px; border-radius:4px; font-size:12px;">${l(e.businessAccountNumber)||`—`}</code></td>
                    <td style="text-align:center; font-size:12px; opacity:0.7;">${i(e.createdAt)}</td>
                    <td class="actions" style="justify-content:center">
                      <button class="btn-icon" onclick='openBusinessModal(${JSON.stringify(e).replace(/'/g,`&#39;`)})' title="${c(`Tahrirlash`)}">✏️</button>
                      <button class="btn-icon danger" onclick="deleteBusiness(${e.id})" title="${c(`O'chirish`)}">🗑️</button>
                    </td>
                  </tr>`).join(``)}
            </tbody>
          </table>
        </div>
      </div>
      ${renderPageControls(`businessPage`,t,`renderBusinessesTable()`)}
    `}function ee(e){let t=e.toLowerCase(),n=m.filter(e=>e.name&&e.name.toLowerCase().includes(t)||e.description&&e.description.toLowerCase().includes(t)),r=document.getElementById(`business-search`),i=r?r.selectionStart:0;g(n),setTimeout(()=>{let e=document.getElementById(`business-search`);if(e){e.focus();try{e.setSelectionRange(i,i)}catch{}}},0)}function _(e=null){let t=!!e;`${c(`Yuklanmoqda...`)}`,openModal(`
    <div class="modal-header">
      <h3>${c(t?`Biznesni tahrirlash`:`Yangi biznes`)}</h3>
      <button class="modal-close" onclick="closeModal()">✕</button>
    </div>
    <form onsubmit="saveBusiness(event, ${t?e.id:0})" style="min-width:450px">
      <div class="form-group">
        <label>${c(`Nomi`)}</label>
        <input type="text" class="form-control" id="biz-name" value="${t?l(e.name):``}" placeholder="${c(`Nomini kiriting`)}" required>
      </div>
      <div class="form-group">
        <label>${c(`Tavsifi`)}</label>
        <textarea class="form-control" id="biz-desc" rows="2" style="resize:none" placeholder="${c(`Biznes tavsifi`)}">${t?l(e.description):``}</textarea>
      </div>

      <div class="form-group">
        <label>${c(`Viloyat`)}</label>
        <select class="form-control" id="biz-region-sel" required onchange="if(window.onRegionChangeGlobal) window.onRegionChangeGlobal(this.value)">
          <option value="">${c(`Viloyatni tanlang`)}</option>
        </select>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label>${c(`Tuman`)}</label>
          <select class="form-control" id="biz-district-sel" required onchange="if(window.onDistrictChangeGlobal) window.onDistrictChangeGlobal(this.value)">
            <option value="">${c(`Tumanni tanlang`)}</option>
          </select>
        </div>
        <div class="form-group">
          <label>${c(`Bozor`)}</label>
          <select class="form-control" id="biz-market-sel">
            <option value="">${c(`Bozorni tanlang`)}</option>
          </select>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label>${c(`Manzil`)}</label>
          <input type="text" class="form-control" id="biz-address" value="${t?l(e.address||``):``}" placeholder="${c(`Manzilni kiriting`)}">
        </div>
        <div class="form-group">
          <label>${c(`Do'kon / Bino raqami`)}</label>
          <input type="text" class="form-control" id="biz-extra-address" placeholder="${c(`D-123 yoki 1-do'kon`)}">
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label>${c(`Hisob raqami`)}</label>
          <input type="text" class="form-control" id="biz-account" value="${t?l(e.businessAccountNumber):``}" placeholder="123456789">
        </div>
        <div class="form-group">
          <label>${c(`Balans`)}</label>
          <div style="position:relative">
            <input type="number" step="0.01" class="form-control" id="biz-balance" value="${t?e.balance:0}">
            <span style="position:absolute; right:12px; top:50%; transform:translateY(-50%); opacity:0.5; font-size:12px;">UZS</span>
          </div>
        </div>
      </div>
      <div class="form-group">
        <label>${c(`Biznes logotipi`)}</label>
        <div style="display:flex; gap:16px; align-items: flex-start;">
           <div id="biz-image-preview" style="width:100px; height:100px; border-radius:12px; background:var(--bg-input); border:2px dashed var(--border); overflow:hidden; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
             ${t&&e.image?`<img src="${e.image}" style="width:100%; height:100%; object-fit:cover;">`:`<span style="font-size:32px; opacity:0.3;">🖼️</span>`}
           </div>
           <div style="flex:1">
             <input type="file" class="form-control" id="biz-image-file" accept="image/*" onchange="previewBusinessImage(this)">
             <input type="hidden" id="biz-image-url" value="${t&&e.image?l(e.image):``}">
             <p style="font-size:11px; color:var(--text-muted); margin-top:6px;">${c(`Tavsiya etilgan: 500x500px. JPG, PNG.`)}</p>
           </div>
        </div>
      </div>
      <div class="modal-footer" style="padding-top:10px">
        <button type="button" class="btn btn-ghost" onclick="closeModal()">${c(`Bekor qilish`)}</button>
        <button type="submit" class="btn btn-primary" style="padding:10px 40px;">${c(t?`Saqlash`:`Yaratish`)}</button>
      </div>
    </form>
  `),y(e),setTimeout(()=>{let e=document.getElementById(`biz-region-sel`);e&&(e.onchange=e=>window.onRegionChangeGlobal(e.target.value));let t=document.getElementById(`biz-district-sel`);t&&(t.onchange=e=>window.onDistrictChangeGlobal(e.target.value))},100)}window.onRegionChangeGlobal=function(e){te(e).catch(e=>a(e.message,`error`))},window.onDistrictChangeGlobal=function(e){ne(e).catch(e=>a(e.message,`error`))};async function v(e){if(e.files&&e.files[0]){let t=e.files[0],n=new FormData;n.append(`file`,t);try{a(c(`Rasm yuklanmoqda...`),`info`);let e=await o.post(`/upload`,n);if(e&&e.url)document.getElementById(`biz-image-url`).value=e.url,document.getElementById(`biz-image-preview`).innerHTML=`<img src="${e.url}" style="width:100%; height:100%; object-fit:cover;">`,a(c(`Rasm yuklandi`));else throw Error(`Upload failed`)}catch(e){a(e.message,`error`)}}}async function y(e=null){let t=document.getElementById(`biz-region-sel`);try{let n=await o.get(`/geography/regions`);t&&(t.innerHTML=`<option value="">${c(`Viloyatni tanlang`)}</option>`+n.map(t=>`<option value="${t.id}" ${e&&e.regionId==t.id?`selected`:``}>${t.name}</option>`).join(``)),e&&e.regionId&&await te(e.regionId,e)}catch(e){console.error(`Viloyatlarni yuklashda xatolik:`,e),a(e.message,`error`)}}async function te(e,t=null){let n=document.getElementById(`biz-district-sel`),r=document.getElementById(`biz-market-sel`);if(n&&(n.innerHTML=`<option value="">${c(`Yuklanmoqda...`)}</option>`),r&&(r.innerHTML=`<option value="">${c(`Bozorni tanlang`)}</option>`),!e){n.innerHTML=`<option value="">${c(`Tumanni tanlang`)}</option>`;return}try{let r=await o.get(`/geography/districts?regionId=${e}`);(!r||r.length===0)&&a(c(`Bu viloyat uchun tumanlar topilmadi`),`warning`),n.innerHTML=`<option value="">${c(`Tumanni tanlang`)}</option>`+r.map(e=>`<option value="${e.id}" ${t&&t.districtId==e.id?`selected`:``}>${e.name}</option>`).join(``),t&&t.districtId&&await ne(t.districtId,t)}catch(e){console.error(`Tumanlarni yuklashda xatolik:`,e),a(c(`Tumanlarni yuklab bo'lmadi`)+`: `+e.message,`error`)}}async function ne(e,t=null){let n=document.getElementById(`biz-market-sel`);if(n&&(n.innerHTML=`<option value="">${c(`Yuklanmoqda...`)}</option>`),console.log(`District changed to:`,e),!e){n.innerHTML=`<option value="">${c(`Bozorni tanlang`)}</option>`;return}try{let r=await o.get(`/geography/markets?districtId=${e}`);console.log(`Markets received:`,r),(!r||r.length===0)&&a(c(`Bu tuman uchun bozorlar topilmadi`),`warning`),n.innerHTML=`<option value="">${c(`Bozorni tanlang`)}</option>`+r.map(e=>`<option value="${e.id}" ${t&&t.marketId==e.id?`selected`:``}>${e.name}</option>`).join(``)}catch(e){console.error(`Bozorlarni yuklashda xatolik:`,e),a(c(`Bozorlarni yuklab bo'lmadi`)+`: `+e.message,`error`)}}async function re(e,t){e.preventDefault();let n=parseInt(document.getElementById(`biz-market-sel`)?.value)||null,r=document.getElementById(`biz-address`).value.trim(),i=document.getElementById(`biz-extra-address`).value.trim();if(!n&&!r&&!i){a(c(`Bozor tanlanishi yoki manzil kiritilishi shart!`),`error`);return}let s=r;i&&(s=r?`${r}, ${i}`:i);let l={name:document.getElementById(`biz-name`).value.trim(),description:document.getElementById(`biz-desc`).value.trim(),businessAccountNumber:document.getElementById(`biz-account`).value.trim(),balance:parseFloat(document.getElementById(`biz-balance`).value)||0,regionId:parseInt(document.getElementById(`biz-region-sel`)?.value)||null,districtId:parseInt(document.getElementById(`biz-district-sel`)?.value)||null,marketId:n,address:s,image:document.getElementById(`biz-image-url`)?.value.trim()||null};try{t?(await o.put(`/businesses/${t}`,l),a(c(`Biznes yangilandi`))):(await o.post(`/businesses`,l),a(c(`Biznes yaratildi`))),closeModal(),typeof loadBusinesses==`function`&&loadBusinesses(),h()}catch(e){a(e.message,`error`)}}async function ie(e){if(confirm(c(`Biznesni o'chirishga ishonchingiz komilmi?`)))try{await o.delete(`/businesses/${e}`),a(c(`Biznes o'chirildi`)),loadBusinesses(),h()}catch(e){a(e.message,`error`)}}window.renderBusinesses=h,window.renderBusinessesTable=g,window.filterBusinesses=ee,window.openBusinessModal=_,window.saveBusiness=re,window.deleteBusiness=ie,window.previewBusinessImage=v,window.businessPage=businessPage,window.allBusinessesList=m,window.currentBusinesses=p,window.categoryPage=1;var b=[],ae=[];async function oe(){let e=document.getElementById(`page-content`),t=u();if(!t){e.innerHTML=`<div class="empty-state"><div class="icon">📂</div><h4>${c(`Avval biznes tanlang`)}</h4></div>`;return}try{ae=await o.get(`/categories?businessId=${t}`)||[],ce(ae)}catch(t){e.innerHTML=`<div class="empty-state"><h4>${c(`Xatolik`)}</h4><p>${l(t.message)}</p></div>`}}function se(e){return e?new Date(e).toLocaleDateString():``}function ce(e){e&&(b=e,window.categoryPage=1);let t=Math.ceil(b.length/10);window.categoryPage>t&&(window.categoryPage=t||1);let n=(window.categoryPage-1)*10,r=b.slice(n,n+10),i=document.getElementById(`page-content`);i.innerHTML=`
      <div class="card">
        <div class="card-header">
           <h3 style="margin:0; font-size:16px;">${c(`Kategoriyalar`)}</h3>
           <div class="toolbar">
             <div class="search-box">
               <span class="search-icon">🔍</span>
               <input type="text" placeholder="${c(`Qidirish...`)}" id="category-search" value="${l(document.getElementById(`category-search`)?.value||``)}" oninput="filterCategories(this.value)">
             </div>
             <button class="btn btn-primary btn-sm" onclick="openCategoryModal()">${c(`Qo'shish`)}</button>
           </div>
        </div>
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th style="text-align:center">№</th>
                <th style="text-align:center">${c(`Nomi`)}</th>
                <th style="text-align:center">${c(`Yaratilgan`)}</th>
                <th style="text-align:center">${c(`Amallar`)}</th>
              </tr>
            </thead>
            <tbody>
              ${r.length===0?`<tr><td colspan="4" style="text-align:center;padding:40px;color:var(--text-muted);">${c(`Kategoriyalar yo'q`)}</td></tr>`:r.map((e,t)=>`
                  <tr>
                    <td style="text-align:center;">${n+t+1}</td>
                    <td><strong style="color:var(--text-primary); font-size:15px;">${l(e.name)}</strong></td>
                    <td style="text-align:center; font-size:12px; opacity:0.7;">${se(e.createdAt)}</td>
                    <td class="actions" style="justify-content:center">
                      <button class="btn-icon" onclick='openCategoryModal(${JSON.stringify(e).replace(/'/g,`&#39;`)})' title="${c(`Tahrirlash`)}">✏️</button>
                      <button class="btn-icon danger" onclick="deleteCategory(${e.id})" title="${c(`O'chirish`)}">🗑️</button>
                    </td>
                  </tr>`).join(``)}
            </tbody>
          </table>
        </div>
      </div>
      ${renderPageControls(`categoryPage`,t,`renderCategoriesTable()`)}
    `}function le(e){let t=e.toLowerCase(),n=ae.filter(e=>e.name&&e.name.toLowerCase().includes(t)),r=document.getElementById(`category-search`),i=r?r.selectionStart:0;ce(n),setTimeout(()=>{let e=document.getElementById(`category-search`);if(e){e.focus();try{e.setSelectionRange(i,i)}catch{}}},0)}function ue(e=null){let t=!!e;openModal(`
    <div class="modal-header">
      <h3>${c(t?`Kategoriyani tahrirlash`:`Yangi kategoriya`)}</h3>
      <div style="display:flex; gap:10px; align-items:center;">
        ${t?``:`<button class="btn btn-icon" style="font-size:20px; font-weight:bold; color:var(--primary);" onclick="resetCategoryForm()" title="${c(`Tozalash`)}">+</button>`}
        <button class="modal-close" onclick="closeModal()">✕</button>
      </div>
    </div>
    <div class="modal-body-wrapper">
      ${t?``:`
      <div class="excel-actions-row" style="margin-bottom: 20px; padding: 15px; background: var(--bg-glass); border: 1px dashed var(--border); border-radius: 8px;">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <h4 style="margin:0; font-size:14px;">${c(`Excel orqali ommaviy yuklash`)}</h4>
          <a href="#" onclick="handleCategoryTemplate(event)" style="font-size:12px; color:var(--primary);">${c(`Shablonni yuklab olish`)}</a>
        </div>
        <div style="display:flex; gap:10px; margin-top:10px;">
          <button class="btn btn-ghost btn-sm" onclick="handleCategoryExport()"><span class="icon">📥</span> ${c(`Eksport (Excel)`)}</button>
          <button class="btn btn-ghost btn-sm" onclick="document.getElementById('cat-excel-import').click()"><span class="icon">📤</span> ${c(`Import (Excel)`)}</button>
          <input type="file" id="cat-excel-import" style="display:none" accept=".xlsx,.xls" onchange="handleCategoryImport(this)">
        </div>
      </div>
      `}
      <form onsubmit="saveCategory(event, ${t?e.id:0})" style="min-width:400px">
        <div class="form-group">
          <label>${c(`Nomi`)}</label>
          <input type="text" class="form-control" id="cat-name" value="${t?l(e.name):``}" placeholder="${c(`Nomini kiriting`)}" required>
        </div>
        <div class="form-group">
          <label>${c(`Kategoriya rasmi`)}</label>
          <div style="display:flex; gap:16px; align-items: flex-start;">
             <div id="cat-image-preview" style="width:100px; height:100px; border-radius:12px; background:var(--bg-input); border:2px dashed var(--border); overflow:hidden; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
               ${t&&e.image?`<img src="${e.image}" style="width:100%; height:100%; object-fit:cover;">`:`<span style="font-size:32px; opacity:0.3;">🖼️</span>`}
             </div>
             <div style="flex:1">
               <input type="file" class="form-control" id="cat-image-file" accept="image/*" onchange="previewCategoryImage(this)">
               <input type="hidden" id="cat-image-url" value="${t&&e.image?l(e.image):``}">
               <p style="font-size:11px; color:var(--text-muted); margin-top:6px;">${c(`Tavsiya etilgan o'lcham: 500x500px. JPG, PNG.`)}</p>
             </div>
          </div>
        </div>
        <div class="modal-footer" style="padding-top:10px">
          <button type="button" class="btn btn-ghost" onclick="closeModal()">${c(`Bekor qilish`)}</button>
          <button type="submit" class="btn btn-primary" style="padding:10px 40px;">${c(t?`Saqlash`:`Yaratish`)}</button>
        </div>
      </form>
    </div>
  `)}async function de(){let e=u();try{let t=o.getToken();window.location.href=`${d}/excel/categories/export?businessId=${e}&token=${t}`,a(c(`Excel fayl tayyorlanmoqda...`))}catch(e){a(e.message,`error`)}}async function fe(e){e.preventDefault();try{let e=o.getToken();window.location.href=`${d}/excel/categories/template?token=${e}`,a(c(`Shablon yuklab olinmoqda...`))}catch(e){a(e.message,`error`)}}async function pe(e){if(!e.files||e.files.length===0)return;let t=u(),n=e.files[0],r=new FormData;r.append(`businessId`,t),r.append(`file`,n);try{a(c(`Import qilinmoqda...`),`info`);let e=o.getToken(),t=await fetch(`${d}/excel/categories/import`,{method:`POST`,headers:{Authorization:`Bearer `+e},body:r}),n=await t.json();if(t.ok)a(`${c(`Muvaffaqiyatli`)}: ${n.created} ${c(`ta yaratildi`)}`),n.errors&&n.errors.length>0&&(console.error(`Import errors:`,n.errors),a(`${c(`Xatoliklar bor`)}: ${n.errors.length} ${c(`ta`)}`,`warning`)),closeModal(),oe();else throw Error(n.error||c(`Importda xatolik`))}catch(e){a(e.message,`error`)}finally{e.value=``}}async function me(e){if(e.files&&e.files[0]){let t=e.files[0],n=new FormData;n.append(`file`,t);try{a(c(`Rasm yuklanmoqda...`),`info`);let e=await o.post(`/upload`,n);if(e&&e.url)document.getElementById(`cat-image-url`).value=e.url,document.getElementById(`cat-image-preview`).innerHTML=`<img src="${e.url}" style="width:100%; height:100%; object-fit:cover;">`,a(c(`Rasm yuklandi`));else throw Error(`Upload failed`)}catch(e){a(e.message,`error`)}}}function he(){let e=document.getElementById(`cat-name`),t=document.getElementById(`cat-image-url`),n=document.getElementById(`cat-image-preview`),r=document.getElementById(`cat-image-file`);e&&(e.value=``),t&&(t.value=``),n&&(n.innerHTML=`<span style="font-size:32px; opacity:0.3;">🖼️</span>`),r&&(r.value=``),a(c(`Forma tozalandi`))}async function ge(e,t){e.preventDefault();let n=u(),r=document.getElementById(`cat-name`).value.trim(),i=document.getElementById(`cat-image-url`).value.trim();try{t?(await o.put(`/categories/${t}`,{name:r,image:i||null}),a(c(`Kategoriya yangilandi`))):(await o.post(`/categories`,{businessId:n,name:r,image:i||null}),a(c(`Kategoriya yaratildi`))),closeModal(),oe()}catch(e){a(e.message,`error`)}}async function _e(e){if(confirm(c(`Kategoriyani o'chirishga ishonchingiz komilmi?`)))try{await o.delete(`/categories/${e}`),a(c(`Kategoriya o'chirildi`)),oe()}catch(e){a(e.message,`error`)}}window.renderCategories=oe,window.renderCategoriesTable=ce,window.filterCategories=le,window.openCategoryModal=ue,window.saveCategory=ge,window.deleteCategory=_e,window.handleCategoryExport=de,window.handleCategoryImport=pe,window.handleCategoryTemplate=fe,window.previewCategoryImage=me,window.resetCategoryForm=he,window.categoryPage=categoryPage,window.allCategoriesList=ae,window.currentCategories=b;var x=[],ve=[];async function S(){let e=document.getElementById(`page-content`),t=u();if(!t){e.innerHTML=`<div class="empty-state"><div class="icon">📦</div><h4>${c(`Avval biznes tanlang`)}</h4></div>`;return}try{let[e,n]=await Promise.all([o.get(`/products?businessId=${t}`),o.get(`/categories?businessId=${t}`)]);x=(e||[]).filter(e=>!e.isDeleted),ve=n||[],ye(x)}catch(t){e.innerHTML=`<div class="empty-state"><h4>${c(`Xatolik`)}</h4><p>${l(t.message)}</p></div>`}}window.productPage=1;var C=[];function ye(e){e&&(C=e,window.productPage=1);let t=Math.ceil(C.length/15);window.productPage>t&&(window.productPage=t||1);let n=(window.productPage-1)*15,r=C.slice(n,n+15),i=document.getElementById(`page-content`),a=[`acc-avatar-indigo`,`acc-avatar-green`,`acc-avatar-blue`,`acc-avatar-orange`];i.innerHTML=`
    <div class="acc-list">${r.length===0?`<div class="empty-state"><div class="icon">📦</div><h4>${c(`Mahsulotlar yo'q`)}</h4></div>`:r.map((e,t)=>{let n=ve.find(t=>t.id===e.categoryId),r=a[t%a.length],i=(e.name||`?`)[0].toUpperCase(),o=e.price*(1-(e.discount||0)/100),u=e.quantity<=5?`<span class="badge badge-danger">${e.quantity} ${c(`ta`)}</span>`:`<span class="badge" style="background:#ECFDF5; color:#059669;">${e.quantity} ${c(`ta`)}</span>`;return`
        <div class="acc-item" id="prod-acc-${e.id}">
          <div class="acc-header" onclick="toggleAcc('prod-acc-${e.id}')">
            <div class="acc-header-left">
              ${e.images?`<img src="${e.images}" style="width:38px;height:38px;border-radius:50%;object-fit:cover;border:2px solid var(--border);flex-shrink:0;" alt="">`:`<div class="acc-avatar ${r}">${i}</div>`}
              <div>
                <div class="acc-title">${l(e.name)}</div>
                <div class="acc-subtitle">${n?l(n.name):`—`} ${e.barcode?`· `+l(e.barcode):``}</div>
              </div>
            </div>
            <div class="acc-header-right">
              ${u}
              <span class="acc-price">${s(o)} ${c(`so'm`)}</span>
              <span class="acc-chevron">▼</span>
            </div>
          </div>
          <div class="acc-body">
            <div class="acc-detail-grid">
              <div class="acc-detail-item">
                <span class="acc-detail-icon">📊</span>
                <div><div class="acc-detail-label">${c(`Miqdori`)}</div><div class="acc-detail-value">${e.quantity}</div></div>
              </div>
              <div class="acc-detail-item">
                <span class="acc-detail-icon">💰</span>
                <div><div class="acc-detail-label">${c(`Narxi`)}</div><div class="acc-detail-value">${s(e.price)} ${c(`so'm`)}</div></div>
              </div>
              ${e.discount>0?`<div class="acc-detail-item">
                <span class="acc-detail-icon">🏷️</span>
                <div><div class="acc-detail-label">${c(`Chegirma`)}</div><div class="acc-detail-value">${e.discount}%</div></div>
              </div>`:``}
              ${e.barcode?`<div class="acc-detail-item">
                <span class="acc-detail-icon">📋</span>
                <div><div class="acc-detail-label">${c(`Barcode`)}</div><div class="acc-detail-value" style="font-family:monospace;">${l(e.barcode)}</div></div>
              </div>`:``}
              ${e.country?`<div class="acc-detail-item">
                <span class="acc-detail-icon">🌍</span>
                <div><div class="acc-detail-label">${c(`Mamlakat`)}</div><div class="acc-detail-value">${l(e.country)}</div></div>
              </div>`:``}
			  ${e.lokalCode?`<div class="acc-detail-item">
                <span class="acc-detail-icon">🔖</span>
                <div><div class="acc-detail-label">${c(`Lokal kod`)}</div><div class="acc-detail-value">${l(e.lokalCode)}</div></div>
              </div>`:``}
              ${e.shortDescription?`<div class="acc-detail-item" style="grid-column: 1/-1;">
                <span class="acc-detail-icon">📝</span>
                <div><div class="acc-detail-label">${c(`Tavsifi`)}</div><div class="acc-detail-value">${l(e.shortDescription)}</div></div>
              </div>`:``}
            </div>
            <div class="acc-actions">
              <button class="btn btn-success btn-sm" onclick='openProductModal(${JSON.stringify(e).replace(/'/g,`&#39;`)})'>✏️ ${c(`Tahrirlash`)}</button>
              <button class="btn btn-danger btn-sm" onclick="deleteProduct(${e.id})">🗑️ ${c(`O'chirish`)}</button>
            </div>
          </div>
        </div>`}).join(``)}</div>
    ${renderPageControls(`productPage`,t,`renderProductsTable()`)}
    <div class="page-bottom-bar">
      <div class="search-box" style="flex:1; max-width:none;">
        <span class="search-icon" style="color:rgba(255,255,255,0.6);">🔍</span>
        <input type="text" placeholder="${c(`Qidirish...`)}" id="product-search"
          value="${l(document.getElementById(`product-search`)?.value||``)}"
          oninput="filterProducts(this.value)"
          style="background:rgba(255,255,255,0.15); border-color:rgba(255,255,255,0.25); color:white;">
      </div>
      <button class="btn btn-primary" onclick="openProductModal()">${c(`Qo'shish`)}</button>
    </div>
  `}function be(e){let t=e.toLowerCase(),n=x.filter(e=>e.name&&e.name.toLowerCase().includes(t)||e.barcode&&e.barcode.toLowerCase().includes(t)),r=document.getElementById(`product-search`),i=r?r.selectionStart:0;ye(n),setTimeout(()=>{let e=document.getElementById(`product-search`);if(e){e.focus();try{e.setSelectionRange(i,i)}catch{}}},0)}function xe(e=null){let t=!!e,n=ve.map(n=>`<option value="${n.id}" ${t&&e.categoryId===n.id?`selected`:``}>${l(n.name)}</option>`).join(``);openModal(`
    <div class="modal-header">
      <h3>${c(t?`Mahsulotni tahrirlash`:`Yangi mahsulot`)}</h3>
      <button class="modal-close" onclick="closeModal()">✕</button>
    </div>
    <div class="modal-body-wrapper">
      ${t?``:`
      <div class="excel-actions-row" style="margin-bottom: 20px; padding: 15px; background: var(--bg-glass); border: 1px dashed var(--border); border-radius: 8px;">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <h4 style="margin:0; font-size:14px;">${c(`Excel orqali ommaviy yuklash`)}</h4>
          <a href="#" onclick="handleProductTemplate(event)" style="font-size:12px; color:var(--primary);">${c(`Shablonni yuklab olish`)}</a>
        </div>
        <div style="display:flex; gap:10px; margin-top:10px;">
          <button class="btn btn-ghost btn-sm" onclick="handleProductExport()"><span class="icon">📥</span> ${c(`Eksport (Excel)`)}</button>
          <button class="btn btn-ghost btn-sm" onclick="document.getElementById('prod-excel-import').click()"><span class="icon">📤</span> ${c(`Import (Excel)`)}</button>
          <input type="file" id="prod-excel-import" style="display:none" accept=".xlsx,.xls" onchange="handleProductImport(this)">
        </div>
      </div>
      `}
      <form onsubmit="saveProduct(event, ${t?e.id:0})" class="modal-wide" style="width: 650px;">
        <div class="form-group">
          <label>${c(`Nomi`)}</label>
          <input type="text" class="form-control" id="prod-name" value="${t?l(e.name):``}" placeholder="${c(`Mahsulot nomi`)}" required>
        </div>
        
        <div class="form-row">
          <div class="form-group">
            <label>${c(`Kategoriya`)}</label>
            <select class="form-control" id="prod-cat" required>
              <option value="">${c(`Tanlang...`)}</option>
              ${n}
            </select>
          </div>
          <div class="form-group">
            <label>${c(`Barcode`)}</label>
            <input type="text" class="form-control" id="prod-barcode" value="${t&&e.barcode?l(e.barcode):``}" placeholder="${c(`Kodni skanerlang yoki qo‘lda kiriting`)}">
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>${c(`Narxi`)}</label>
            <div style="position:relative">
               <input type="number" step="0.01" class="form-control" id="prod-price" value="${t?e.price:``}" required style="padding-right:45px">
               <span style="position:absolute; right:12px; top:50%; transform:translateY(-50%); font-size:12px; opacity:0.5;">UZS</span>
            </div>
          </div>
          <div class="form-group">
            <label>${c(`Chegirma`)} (%)</label>
            <input type="number" step="0.01" class="form-control" id="prod-discount" value="${t?e.discount:0}">
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>${c(`Miqdori`)}</label>
            <input type="number" class="form-control" id="prod-qty" value="${t?e.quantity:``}">
          </div>
          <div class="form-group">
            <label>${c(`Mamlakat`)}</label>
            <input type="text" class="form-control" id="prod-country" value="${t&&e.country?l(e.country):``}">
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>${c(`Lokal kod`)}</label>
            <input type="text" class="form-control" id="prod-lcode" value="${t&&e.lokalCode?l(e.lokalCode):``}" placeholder="${c(`Ixtiyoriy`)}">
          </div>
        </div>

        <div class="form-group">
          <label>${c(`Qisqa tavsif`)}</label>
          <textarea class="form-control" id="prod-short" rows="2" style="resize:none; padding:10px;">${t&&e.shortDescription?l(e.shortDescription):``}</textarea>
        </div>

        <div class="form-group">
          <label>${c(`Mahsulot rasmi`)}</label>
          <div style="display:flex; gap:16px; align-items: flex-start;">
             <div id="prod-image-preview" style="width:100px; height:100px; border-radius:12px; background:var(--bg-input); border:2px dashed var(--border); overflow:hidden; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
               ${t&&e.images?`<img src="${e.images}" style="width:100%; height:100%; object-fit:cover;">`:`<span style="font-size:32px; opacity:0.3;">🖼️</span>`}
             </div>
             <div style="flex:1">
               <input type="file" class="form-control" id="prod-image" accept="image/*" onchange="previewProductImage(this)">
               <p style="font-size:11px; color:var(--text-muted); margin-top:6px;">${c(`Tavsiya etilgan o'lcham: 500x500px. JPG, PNG.`)}</p>
             </div>
          </div>
          <input type="hidden" id="prod-image-url" value="${t&&e.images?e.images:``}">
        </div>

        <div class="modal-footer" style="padding-top:10px">
          <button type="button" class="btn btn-ghost" onclick="closeModal()">${c(`Bekor qilish`)}</button>
          <button type="submit" class="btn btn-primary" style="padding:10px 30px;">${c(t?`Saqlash`:`Yaratish`)}</button>
        </div>
      </form>
    </div>
  `)}async function Se(){let e=u();try{let t=o.getToken();window.location.href=`${d}/excel/products/export?businessId=${e}&token=${t}`,a(c(`Excel fayl tayyorlanmoqda...`))}catch(e){a(e.message,`error`)}}async function Ce(e){e.preventDefault();let t=u();try{let e=o.getToken();window.location.href=`${d}/excel/products/template?businessId=${t}&token=${e}`,a(c(`Shablon yuklab olinmoqda...`))}catch(e){a(e.message,`error`)}}async function we(e){if(!e.files||e.files.length===0)return;let t=u(),n=e.files[0],r=new FormData;r.append(`businessId`,t),r.append(`file`,n);try{a(c(`Import qilinmoqda...`),`info`);let e=o.getToken(),t=await fetch(`${d}/excel/products/import`,{method:`POST`,headers:{Authorization:`Bearer `+e},body:r}),n=await t.json();if(t.ok)a(`${c(`Muvaffaqiyatli`)}: ${n.created} ${c(`ta yaratildi`)}`),n.errors&&n.errors.length>0&&(console.error(`Import errors:`,n.errors),a(`${c(`Xatoliklar bor`)}: ${n.errors.length} ${c(`ta`)}`,`warning`)),closeModal(),S();else throw Error(n.error||c(`Importda xatolik`))}catch(e){a(e.message,`error`)}finally{e.value=``}}async function Te(e,t){e.preventDefault();let n=u(),r=document.getElementById(`prod-image-url`).value,i=document.getElementById(`prod-image`);if(i.files.length>0)try{let e=new FormData;e.append(`file`,i.files[0]);let t=o.getToken(),n=await(await fetch(d.replace(`/api/v1`,``)+`/api/v1/upload`,{method:`POST`,headers:{Authorization:`Bearer `+t},body:e})).json();if(n.url)r=n.url;else throw Error(n.error||`Upload xatolik`)}catch(e){a(`Rasm yuklashda xatolik: `+e.message,`error`);return}try{t?(await o.put(`/products/${t}`,{name:document.getElementById(`prod-name`).value.trim(),lokalCode:document.getElementById(`prod-lcode`).value.trim()||null,shortDescription:document.getElementById(`prod-short`).value.trim(),price:parseFloat(document.getElementById(`prod-price`).value),discount:parseFloat(document.getElementById(`prod-discount`).value)||0,quantity:parseInt(document.getElementById(`prod-qty`).value),barcode:document.getElementById(`prod-barcode`).value.trim()||null,country:document.getElementById(`prod-country`).value.trim()||null,categoryId:parseInt(document.getElementById(`prod-cat`).value),images:r||null}),a(c(`Mahsulot yangilandi`))):(await o.post(`/products`,{businessId:n,name:document.getElementById(`prod-name`).value.trim(),lokalCode:document.getElementById(`prod-lcode`).value.trim()||null,shortDescription:document.getElementById(`prod-short`).value.trim(),price:parseFloat(document.getElementById(`prod-price`).value),discount:parseFloat(document.getElementById(`prod-discount`).value)||0,quantity:parseInt(document.getElementById(`prod-qty`).value),barcode:document.getElementById(`prod-barcode`).value.trim(),country:document.getElementById(`prod-country`).value.trim(),categoryId:parseInt(document.getElementById(`prod-cat`).value),images:r}),a(c(`Mahsulot yaratildi`))),closeModal(),S()}catch(e){a(e.message,`error`)}}async function Ee(e){if(confirm(c(`Mahsulotni o'chirishga ishonchingiz komilmi?`)))try{await o.delete(`/products/${e}`),a(c(`Mahsulot o'chirildi`)),S()}catch(e){a(e.message,`error`)}}function De(){[`prod-name`,`prod-cat`,`prod-barcode`,`prod-price`,`prod-discount`,`prod-qty`,`prod-country`,`prod-lcode`,`prod-short`,`prod-image-url`].forEach(e=>{let t=document.getElementById(e);t&&(t.value=e===`prod-discount`?`0`:``)});let e=document.getElementById(`prod-image-preview`);e&&(e.innerHTML=`<span style="font-size:32px; opacity:0.3;">🖼️</span>`);let t=document.getElementById(`prod-image`);t&&(t.value=``),a(c(`Forma tozalandi`))}window.resetProductForm=De,window.renderProducts=S,window.renderProductsTable=ye,window.filterProducts=be,window.openProductModal=xe,window.saveProduct=Te,window.deleteProduct=Ee,window.handleProductExport=Se,window.handleProductImport=we,window.handleProductTemplate=Ce,window.productPage=productPage,window.allProducts=x,window.allCategories=ve,window.currentProducts=C,window.clientPage=1;var w=[],Oe=[];async function ke(){let e=document.getElementById(`page-content`),t=u();if(!t){e.innerHTML=`<div class="empty-state"><div class="icon">👥</div><h4>${c(`Avval biznes tanlang`)}</h4></div>`;return}try{Oe=await o.get(`/clients?businessId=${t}`)||[],Ae(Oe)}catch(t){e.innerHTML=`<div class="empty-state"><h4>${c(`Xatolik`)}</h4><p>${l(t.message)}</p></div>`}}function Ae(e){e&&(w=e,window.clientPage=1);let t=Math.ceil(w.length/15);window.clientPage>t&&(window.clientPage=t||1);let n=(window.clientPage-1)*15,r=w.slice(n,n+15),i=document.getElementById(`page-content`),a=[`acc-avatar-indigo`,`acc-avatar-green`,`acc-avatar-blue`,`acc-avatar-orange`];i.innerHTML=`
    <div class="acc-list">${r.length===0?`<div class="empty-state"><div class="icon">👥</div><h4>${c(`Mijozlar yo'q`)}</h4></div>`:r.map((e,t)=>{let n=a[t%a.length],r=(e.fullName||`?`)[0].toUpperCase();return`
        <div class="acc-item" id="client-acc-${e.id}">
          <div class="acc-header" onclick="toggleAcc('client-acc-${e.id}')">
            <div class="acc-header-left">
              <div class="acc-avatar ${n}">${r}</div>
              <div>
                <div class="acc-title">${l(e.fullName)}</div>
                <div class="acc-subtitle">${l(e.phone)}</div>
              </div>
            </div>
            <div class="acc-header-right">
              <span class="badge" style="background:#EEF2FF; color:#4F46E5;">${c(`Mijoz`)}</span>
              <span class="acc-chevron">▼</span>
            </div>
          </div>
          <div class="acc-body">
            <div class="acc-detail-grid">
              <div class="acc-detail-item">
                <span class="acc-detail-icon">📞</span>
                <div><div class="acc-detail-label">${c(`Telefon`)}</div><div class="acc-detail-value">${l(e.phone)}</div></div>
              </div>
              ${e.address?`<div class="acc-detail-item">
                <span class="acc-detail-icon">📍</span>
                <div><div class="acc-detail-label">${c(`Manzil`)}</div><div class="acc-detail-value">${l(e.address)}</div></div>
              </div>`:``}
              <div class="acc-detail-item">
                <span class="acc-detail-icon">📅</span>
                <div><div class="acc-detail-label">${c(`Qo'shilgan`)}</div><div class="acc-detail-value">${formatDate(e.createdAt)}</div></div>
              </div>
            </div>
            <div class="acc-actions">
              <button class="btn btn-success btn-sm" onclick='openClientModal(${JSON.stringify(e).replace(/'/g,`&#39;`)})'>✏️ ${c(`Tahrirlash`)}</button>
              <button class="btn btn-danger btn-sm" onclick="deleteClient(${e.id})">🗑️ ${c(`O'chirish`)}</button>
            </div>
          </div>
        </div>`}).join(``)}</div>
    ${renderPageControls(`clientPage`,t,`renderClientsTable()`)}
    <div class="page-bottom-bar">
      <div class="search-box" style="flex:1; max-width:none;">
        <span class="search-icon" style="color:rgba(255,255,255,0.6);">🔍</span>
        <input type="text" placeholder="${c(`Qidirish...`)}" id="client-search"
          value="${l(document.getElementById(`client-search`)?.value||``)}"
          oninput="filterClients(this.value)"
          style="background:rgba(255,255,255,0.15); border-color:rgba(255,255,255,0.25); color:white;">
      </div>
      <button class="btn btn-primary" onclick="openClientModal()">${c(`Qo'shish`)}</button>
    </div>
  `}function je(e){let t=e.toLowerCase(),n=Oe.filter(e=>e.fullName&&e.fullName.toLowerCase().includes(t)||e.phone&&e.phone.toLowerCase().includes(t)),r=document.getElementById(`client-search`),i=r?r.selectionStart:0;Ae(n),setTimeout(()=>{let e=document.getElementById(`client-search`);if(e){e.focus();try{e.setSelectionRange(i,i)}catch{}}},0)}function Me(e=null){let t=!!e;openModal(`
    <div class="modal-header">
      <h3>${c(t?`Mijozni tahrirlash`:`Yangi mijoz`)}</h3>
      <button class="modal-close" onclick="closeModal()">✕</button>
    </div>
    <form onsubmit="saveClient(event, ${t?e.id:0})" style="min-width:400px">
      <div class="form-group">
        <label>${c(`To'liq ism`)}</label>
        <input type="text" class="form-control" id="client-name" value="${t?l(e.fullName):``}" placeholder="${c(`Mijozning to'liq ismini kiriting`)}" required>
      </div>
      <div class="form-group">
        <label>${c(`Telefon`)}</label>
        <div style="position:relative">
          <input type="tel" class="form-control" id="client-phone" value="${t?l(e.phone):``}" placeholder="+998" required style="padding-left:40px">
           <span style="position:absolute; left:12px; top:50%; transform:translateY(-50%); font-size:16px; opacity:0.5;">📞</span>
        </div>
      </div>
      <div class="form-group">
        <label>${c(`Manzil`)}</label>
        <input type="text" class="form-control" id="client-address" value="${t&&e.address?l(e.address):``}" placeholder="${c(`Mijozning manzilini kiriting`)}">
      </div>
      <div class="modal-footer" style="padding-top:10px">
        <button type="button" class="btn btn-ghost" onclick="closeModal()">${c(`Bekor qilish`)}</button>
        <button type="submit" class="btn btn-primary" style="padding:10px 40px;">${c(t?`Saqlash`:`Yaratish`)}</button>
      </div>
    </form>
  `)}async function Ne(e,t){e.preventDefault();let n=u(),r=document.getElementById(`client-name`).value.trim(),i=document.getElementById(`client-phone`).value.trim(),s=document.getElementById(`client-address`).value.trim()||null;if(!/^\+998\d{9}$/.test(i)){a(c(`Telefon raqami noto'g'ri (+998XXXXXXXXX ko'rinishida bo'lsin)`),`error`);return}let l=o.getUser();if(l&&(l.phone===i||l.phoneNumber===i)){a(c(`O'zingizni mijoz sifatida qo'sha olmaysiz`),`error`);return}try{t?(await o.put(`/clients/${t}`,{fullName:r,phone:i,address:s}),a(c(`Mijoz yangilandi`))):(await o.post(`/clients`,{businessId:n,fullName:r,phone:i,address:s}),a(c(`Mijoz qo'shildi`))),closeModal(),ke()}catch(e){a(e.message,`error`)}}async function Pe(e){if(confirm(c(`Mijozni o'chirishga ishonchingiz komilmi?`)))try{await o.delete(`/clients/${e}`),a(c(`Mijoz o'chirildi`)),ke()}catch(e){a(e.message,`error`)}}window.renderClients=ke,window.renderClientsTable=Ae,window.filterClients=je,window.openClientModal=Me,window.saveClient=Ne,window.deleteClient=Pe,window.clientPage=clientPage,window.allClientsList=Oe,window.currentClients=w;var T=[],E=[];window.transactionPage=1;var Fe=[],D=[],O=null,k=[],A={cash:0,card:0,click:0,debt:0};async function Ie(){let e=document.getElementById(`page-content`),t=u();if(!t){e.innerHTML=`<div class="empty-state"><div class="icon">🛒</div><h4>${c(`Avval biznes tanlang`)}</h4></div>`;return}try{D=await o.get(`/transactions?businessId=${t}`)||[],Le(D)}catch(t){e.innerHTML=`<div class="empty-state"><h4>${c(`Xatolik`)}</h4><p>${l(t.message)}</p></div>`}}function Le(t){if(t){let e=new Map;t.forEach(t=>{let n=t.createdAt.substring(0,10),r=`${t.clientId?`id_${t.clientId}`:t.clientNumber?`num_${t.clientNumber}`:`trans_${t.id}`}_${n}`;if(e.has(r)){let n=e.get(r);n.ids.push(t.id),n.total+=t.total,n.cash+=t.cash,n.card+=t.card,n.click+=t.click||0,n.debt+=t.debt,new Date(t.createdAt)>new Date(n.createdAt)&&(n.createdAt=t.createdAt)}else e.set(r,{...t,ids:[t.id],isGroup:!0})}),Fe=Array.from(e.values()),window.transactionPage=1}let n=Math.ceil(Fe.length/15);window.transactionPage>n&&(window.transactionPage=n||1);let r=(window.transactionPage-1)*15,i=Fe.slice(r,r+15),a=document.getElementById(`page-content`);a.innerHTML=`
    <div class="acc-list">${i.length===0?`<div class="empty-state"><div class="icon">🛒</div><h4>${c(`Sotuvlar yo'q`)}</h4></div>`:i.map((t,n)=>{let i=t.debt>0,a=JSON.stringify(t.ids);return`
        <div class="acc-item" id="trans-acc-${t.id}">
          <div class="acc-header" onclick="toggleAcc('trans-acc-${t.id}')">
            <div class="acc-header-left">
              <div class="acc-avatar acc-avatar-indigo" style="${i?`background:linear-gradient(135deg,#EF4444,#DC2626)`:``}">🛒</div>
              <div>
                <div class="acc-title">№ ${r+n+1} — ${e(t.createdAt)}</div>
                <div class="acc-subtitle">
                  ${t.clientName?`<strong>${l(t.clientName)}</strong>`:t.clientNumber?l(t.clientNumber):c(`Begona xaridor`)}
                  <span style="opacity:0.6; margin-left:8px;">№: ${t.ids.join(`,`)}</span>
                  ${i?`<span class="badge badge-danger" style="margin-left:6px;">${c(`Qarz`)}: ${s(t.debt)}</span>`:``}
                </div>
              </div>
            </div>
            <div class="acc-header-right">
              <span class="acc-price" style="color:var(--success);">${s(t.total)} ${c(`so'm`)}</span>
              <span class="acc-chevron">▼</span>
            </div>
          </div>
          <div class="acc-body">
            <div class="acc-detail-grid">
              ${t.cash>0?`<div class="acc-detail-item">
                <span class="acc-detail-icon">💵</span>
                <div><div class="acc-detail-label">${c(`Naqd`)}</div><div class="acc-detail-value">${s(t.cash)} ${c(`so'm`)}</div></div>
              </div>`:``}
              ${t.card>0?`<div class="acc-detail-item">
                <span class="acc-detail-icon">💳</span>
                <div><div class="acc-detail-label">${c(`Karta`)}</div><div class="acc-detail-value">${s(t.card)} ${c(`so'm`)}</div></div>
              </div>`:``}
              ${t.click>0?`<div class="acc-detail-item">
                <span class="acc-detail-icon">📱</span>
                <div><div class="acc-detail-label">${c(`Click/Payme`)}</div><div class="acc-detail-value">${s(t.click)} ${c(`so'm`)}</div></div>
              </div>`:``}
              ${i?`<div class="acc-detail-item" style="border-color:#FCA5A5;">
                <span class="acc-detail-icon">⚠️</span>
                <div><div class="acc-detail-label" style="color:#EF4444;">${c(`Qarz`)}</div><div class="acc-detail-value" style="color:#EF4444;">${s(t.debt)} ${c(`so'm`)}</div></div>
              </div>`:``}
              <div class="acc-detail-item">
                <span class="acc-detail-icon">👤</span>
                <div><div class="acc-detail-label">${c(`Mijoz`)}</div><div class="acc-detail-value">${t.clientName?l(t.clientName):t.clientNumber?l(t.clientNumber):c(`Begona xaridor`)}</div></div>
              </div>
            </div>
            <div class="acc-actions">
              <button class="btn btn-ghost btn-sm" onclick='viewTransactionItems(${a})'>👁️ ${c(`Tafsilotlar`)}</button>
              <button class="btn btn-primary btn-sm" onclick='downloadTransactionPdf(${a}, ${JSON.stringify(t)})'>📄 ${c(`PDF`)}</button>
            </div>
          </div>
        </div>`}).join(``)}</div>
    ${renderPageControls(`transactionPage`,n,`renderTransactionsTable()`)}
    <div class="page-bottom-bar">
      <div class="search-box" style="flex:1; max-width:none;">
        <span class="search-icon" style="color:rgba(255,255,255,0.6);">🔍</span>
        <input type="text" placeholder="${c(`Mijoz bo'yicha qidirish...`)}" id="transaction-search"
          value="${l(document.getElementById(`transaction-search`)?.value||``)}"
          oninput="filterTransactions(this.value)"
          style="background:rgba(255,255,255,0.15); border-color:rgba(255,255,255,0.25); color:white;">
      </div>
      <button class="btn btn-primary" onclick="openSaleModal()">${c(`Qo'shish`)}</button>
    </div>
  `}function Re(e){let t=e.toLowerCase(),n=D.filter(e=>e.clientNumber&&e.clientNumber.toLowerCase().includes(t)||e.clientName&&e.clientName.toLowerCase().includes(t)),r=document.getElementById(`transaction-search`),i=r?r.selectionStart:0;Le(n),setTimeout(()=>{let e=document.getElementById(`transaction-search`);if(e){e.focus();try{e.setSelectionRange(i,i)}catch{}}},0)}async function ze(){let e=u();try{let[t,n]=await Promise.all([o.get(`/products?businessId=${e}`),o.get(`/clients?businessId=${e}`)]);T=(t||[]).filter(e=>!e.isDeleted&&e.quantity>0),O=null,k=[],A={cash:0,card:0,click:0,debt:0},E=[];let r=(n||[]).map(e=>`<option value="${e.id}">${l(e.fullName)} — ${l(e.phone)}</option>`).join(``);openModal(`
      <div class="modal-header">
        <h3>${c(`Yangi sotuv`)}</h3>
        <div style="display:flex; gap:10px; align-items:center;">
          <button type="button" class="btn btn-icon" style="font-size:24px; font-weight:bold; color:var(--primary); background:var(--bg-glass); width:40px; height:40px; border-radius:50%;" onclick="addToSaleBatch()" title="${c(`Batch qo'shish`)}">+</button>
          <button type="button" class="modal-close" onclick="closeModal()">✕</button>
        </div>
      </div>
      <form onsubmit="finalizeSale(event)" class="modal-wide">
        <!-- Product Search -->
        <div class="form-group" style="position:relative; margin-bottom: 20px;">
          <div class="search-box" style="max-width: 100%;">
            <span class="search-icon">🔍</span>
            <input type="text" class="form-control" id="sale-product-search" placeholder="${c(`Qidirish...`)}" oninput="searchSaleProduct(this.value)" autocomplete="off">
          </div>
          <div id="sale-search-results" class="search-results-dropdown"></div>
        </div>

        <div class="form-group">
          <label>${c(`Sotilgan mahsulotlar`)}</label>
          <div id="sale-batches-container" style="margin-bottom: 15px; max-height: 200px; overflow-y: auto;">
             <!-- Saved items will appear here -->
          </div>
          <div id="sale-items-container">
             <!-- Current items area -->
          </div>
        </div>

        <div style="display: flex; gap: 20px; align-items: stretch; margin-top: 10px;">
          <div class="payment-total" style="flex: 1; margin: 0; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center;">
            <span class="label">${c(`Jami to'lov`)}</span>
            <span class="value" id="sale-total-value" style="font-size: 28px;">0 ${c(`so'm`)}</span>
            <div id="cumulative-total" style="font-size:12px; margin-top:5px; opacity:0.7;">${c(`Avval saqlangan`)}: 0</div>
          </div>

          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; flex: 1.5;">
            <div class="form-group" style="margin:0">
              <label style="font-size:11px">${c(`Naqd`)}</label>
              <input type="number" step="0.01" class="form-control" id="sale-cash" value="0" oninput="updateSalePayment()" style="padding: 8px;">
            </div>
            <div class="form-group" style="margin:0">
              <label style="font-size:11px">${c(`Karta`)}</label>
              <input type="number" step="0.01" class="form-control" id="sale-card" value="0" oninput="updateSalePayment()" style="padding: 8px;">
            </div>
            <div class="form-group" style="margin:0">
              <label style="font-size:11px">${c(`Click`)}</label>
              <input type="number" step="0.01" class="form-control" id="sale-click" value="0" oninput="updateSalePayment()" style="padding: 8px;">
            </div>
            <div class="form-group" style="margin:0">
              <label style="font-size:11px">${c(`Qarz`)}</label>
              <input type="number" step="0.01" class="form-control" id="sale-debt" value="0" readonly style="padding: 8px; color: var(--warning); font-weight: 700;">
            </div>
          </div>
        </div>
        <div id="payment-error-msg" style="color: #EF4444; font-size: 13px; font-weight: 700; margin-top: 15px; display: none; text-align: center; background: rgba(239, 68, 68, 0.1); padding: 8px; border-radius: 6px; border: 1px solid rgba(239, 68, 68, 0.2);">
          ⚠️ ${c(`"JAMI" dan katta summani kirita olmaysiz!`)}
        </div>

        <div class="form-row" style="margin-top:20px">
          <div class="form-group">
            <label>${c(`Mijoz (ixtiyoriy)`)}</label>
            <select class="form-control" id="sale-client">
              <option value="">${c(`Tanlang...`)}</option>
              ${r}
            </select>
          </div>
          <div class="form-group">
            <label>${c(`Izoh`)}</label>
            <input type="text" class="form-control" id="sale-desc" placeholder="${c(`Izoh`)}">
          </div>
        </div>

        <div class="modal-footer" style="margin-top: 20px;">
          <button type="button" class="btn btn-ghost" onclick="closeModal()">${c(`Bekor qilish`)}</button>
          <button type="submit" class="btn btn-primary" style="padding: 10px 40px;">${c(`Saqlash`)}</button>
        </div>
      </form>
      <style>
        .search-results-dropdown {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          max-height: 300px;
          overflow-y: auto;
          z-index: 1100;
          box-shadow: var(--shadow-lg);
          display: none;
        }
        .search-result-item {
          padding: 10px 14px;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid var(--border);
          transition: background 0.2s;
        }
        .search-result-item:hover {
          background: var(--bg-glass);
        }
        .search-result-item:last-child {
          border-bottom: none;
        }
        .search-result-item .p-name { font-weight: 600; font-size: 14px; }
        .search-result-item .p-info { font-size: 12px; color: var(--text-secondary); }
      </style>
    `),setTimeout(()=>document.getElementById(`sale-product-search`).focus(),100)}catch(e){a(e.message,`error`)}}function Be(e){let t=document.getElementById(`sale-search-results`);if(!e.trim()){t.style.display=`none`;return}let n=e.toLowerCase(),r=T.filter(e=>e.name.toLowerCase().includes(n)||e.barcode&&e.barcode.includes(n)).slice(0,10);r.length===0?t.innerHTML=`<div style="padding: 15px; text-align: center; color: var(--text-muted); font-size: 13px;">${c(`Mahsulot topilmadi`)}</div>`:t.innerHTML=r.map(e=>`
      <div class="search-result-item" style="${e.quantity<=0?`opacity: 0.6; filter: grayscale(1);`:``}" 
           onclick="addSaleProductById(${e.id})">
        <div>
          <div class="p-name">${l(e.name)}</div>
          <div class="p-info">${e.barcode?e.barcode:``}</div>
        </div>
        <div style="text-align: right;">
          <div style="font-weight: 700; color: ${e.quantity<=0?`#EF4444`:`var(--success)`};">${s(e.price)}</div>
          <div style="font-size: 11px; font-weight: 600; color: ${e.quantity<=10?`#EF4444`:`inherit`};">
            ${e.quantity} ${c(`dona`)}
          </div>
        </div>
      </div>
    `).join(``),t.style.display=`block`}function Ve(e){let t=T.find(t=>t.id===e);if(!t)return;let n=E.find(t=>t.productId==e);if((n?n.quantity+1:1)>t.quantity){a(c(`Sotuvda yetarli mahsulot qoldig'i mavjud emas!`),`warning`);return}n?n.quantity++:E.push({productId:e,quantity:1,price:t.price,name:t.name});let r=document.getElementById(`sale-product-search`);r.value=``,document.getElementById(`sale-search-results`).style.display=`none`,r.focus(),j()}function j(){let e=document.getElementById(`sale-items-container`);if(e){if(E.length===0){e.innerHTML=`
      <div class="empty-state" style="padding: 20px; background: var(--bg-input); border-radius: var(--radius-md); border: 1px dashed var(--border);">
        <p style="font-size: 13px;">${c(`Hali mahsulot qo'shilmadi. Yuqoridan qidiring.`)}</p>
      </div>`,M();return}e.innerHTML=`
    <div class="sale-items" style="border: 1px solid var(--border); border-radius: var(--radius-md); overflow: hidden; margin: 0;">
      <table style="width: 100%; border-collapse: collapse;">
        <thead style="background: var(--bg-glass);">
          <tr>
            <th style="padding: 10px; text-align: left; font-size: 11px;">${c(`Mahsulot`)}</th>
            <th style="padding: 10px; text-align: center; font-size: 11px; width: 80px;">${c(`Soni`)}</th>
            <th style="padding: 10px; text-align: right; font-size: 11px; width: 120px;">${c(`Narxi`)}</th>
            <th style="padding: 10px; text-align: right; font-size: 11px; width: 120px;">${c(`Jami`)}</th>
            <th style="padding: 10px; width: 40px;"></th>
          </tr>
        </thead>
        <tbody>
          ${E.map((e,t)=>`
            <tr style="border-top: 1px solid var(--border);">
              <td style="padding: 8px 10px;">
                <div style="font-weight: 600; font-size: 14px;">${l(e.name||`Unknown`)}</div>
              </td>
              <td style="padding: 8px 10px;">
                <input type="number" class="form-control" style="padding: 6px; text-align: center;" value="${e.quantity}" min="1" oninput="onSaleQtyChange(${t}, this.value)">
              </td>
              <td style="padding: 8px 10px;">
                <input type="number" step="0.01" class="form-control" style="padding: 6px; text-align: right;" value="${e.price}" oninput="onSalePriceChange(${t}, this.value)">
              </td>
              <td style="padding: 8px 10px; text-align: right;">
                <div id="item-total-${t}" style="font-weight: 700; font-size: 14px;">${s(e.price*e.quantity)}</div>
              </td>
              <td style="padding: 8px 10px; text-align: center;">
                <button type="button" class="btn-remove" onclick="removeSaleItem(${t})">✕</button>
              </td>
            </tr>
          `).join(``)}
        </tbody>
      </table>
    </div > `,M()}}function He(e){E.splice(e,1),j()}function Ue(e,t){let n=parseInt(t)||1,r=E[e].productId,i=T.find(e=>e.id===r);if(i&&n>i.quantity){a(`${c(`Zaxirada atigi`)} ${i.quantity} ${c(`dona mavjud`)}`,`warning`),E[e].quantity=i.quantity,j(),M();return}E[e].quantity=n;let o=E[e].price*n,l=document.getElementById(`item-total-${e}`);l&&(l.textContent=s(o)),M()}function We(e,t){let n=parseFloat(t)||0;E[e].price=n;let r=n*E[e].quantity,i=document.getElementById(`item-total-${e}`);i&&(i.textContent=s(r)),M()}function M(){let e=E.reduce((e,t)=>e+t.price*t.quantity,0),t=document.getElementById(`sale-total-value`);t&&(t.textContent=`${s(e)} ${c(`so'm`)}`),Ge()}function Ge(){let e=E.reduce((e,t)=>e+t.price*t.quantity,0)+k.reduce((e,t)=>e+t.price*t.quantity,0),t=parseFloat(document.getElementById(`sale-cash`).value)||0,n=parseFloat(document.getElementById(`sale-card`).value)||0,r=parseFloat(document.getElementById(`sale-click`).value)||0,i=A.cash+A.card+A.click+(t+n+r),a=document.getElementById(`sale-debt`),o=document.getElementById(`sale-total-value`),s=document.getElementById(`payment-error-msg`);i>e?(o.style.color=`#EF4444`,a.style.color=`#EF4444`,s&&(s.style.display=`block`)):(o.style.color=``,a.style.color=`var(--warning)`,s&&(s.style.display=`none`));let c=e-i;a.value=Math.max(0,c).toFixed(2)}async function Ke(){let e=u(),t=E.filter(e=>e.productId);if(t.length===0){a(c(`Kamida bitta mahsulot tanlang`),`warning`);return}try{let n=t.reduce((e,t)=>e+t.price*t.quantity,0),r=document.getElementById(`sale-client`).value,i=parseFloat(document.getElementById(`sale-cash`).value)||0,s=parseFloat(document.getElementById(`sale-card`).value)||0,l=parseFloat(document.getElementById(`sale-click`).value)||0,u=parseFloat(document.getElementById(`sale-debt`).value)||0,d=t.reduce((e,t)=>e+t.price*t.quantity,0)+k.reduce((e,t)=>e+t.price*t.quantity,0);if(A.cash+A.card+A.click+(i+s+l)>d){a(c(`"JAMI" dan katta summani kirita olmaysiz!`),`error`);let e=document.getElementById(`sale-total-value`);e&&(e.classList.add(`shake`),setTimeout(()=>e.classList.remove(`shake`),500));return}O?(await o.post(`/transactions/${O}/items?businessId=${e}`,t.map(e=>({productId:parseInt(e.productId),productQuantity:e.quantity,productPrice:e.price}))),A.cash+=i,A.card+=s,A.click+=l,A.debt+=u):(O=(await o.post(`/transactions`,{businessId:e,total:n,cash:i,card:s,click:l,debt:u,clientId:r?parseInt(r):null,description:document.getElementById(`sale-desc`).value.trim(),items:t.map(e=>({productId:parseInt(e.productId),productQuantity:e.quantity,productPrice:e.price}))})).id,A.cash=i,A.card=s,A.click=l,A.debt=u),k=[...k,...t],E=[],document.getElementById(`sale-cash`).value=0,document.getElementById(`sale-card`).value=0,document.getElementById(`sale-click`).value=0,j(),qe(),a(c(`Xarid saqlandi`),`success`)}catch(e){a(e.message,`error`)}}function qe(){let e=document.getElementById(`sale-batches-container`);if(!e)return;if(k.length===0){e.innerHTML=``;return}e.innerHTML=`
    <div style="background: var(--bg-glass); padding: 10px; border-radius: 8px; border: 1px solid var(--border); font-size:12px;">
      <div style="font-weight:bold; margin-bottom:5px; opacity:0.8;">${c(`Saqlangan mahsulotlar`)}:</div>
      <div style="display:flex; flex-wrap:wrap; gap:5px;">
        ${k.map(e=>`
          <span style="background:var(--primary-glass); color:var(--primary); padding:2px 8px; border-radius:10px; font-weight:600;">
            ${l(e.name)} x ${e.quantity}
          </span>
        `).join(``)}
      </div>
    </div>
  `;let t=document.getElementById(`cumulative-total`);if(t){let e=k.reduce((e,t)=>e+t.price*t.quantity,0);t.textContent=`${c(`Avval saqlangan`)}: ${s(e)} ${c(`so'm`)}`}}async function Je(e){e.preventDefault();let t=parseFloat(document.getElementById(`sale-cash`).value)||0,n=parseFloat(document.getElementById(`sale-card`).value)||0,r=parseFloat(document.getElementById(`sale-click`).value)||0,i=E.reduce((e,t)=>e+t.price*t.quantity,0)+k.reduce((e,t)=>e+t.price*t.quantity,0);if(A.cash+A.card+A.click+t+n+r>i){a(c(`"JAMI" dan katta summani kirita olmaysiz!`),`error`);let e=document.getElementById(`sale-total-value`);e&&(e.classList.add(`shake`),setTimeout(()=>e.classList.remove(`shake`),500));return}if(O)E.length>0&&await Ke();else if(E.length>0)await Ke();else{a(c(`Hali xarid qo'shilmadi`),`warning`);return}try{a(c(`Yakunlanmoqda...`),`info`);let e=(await o.get(`/transactions/${O}/items`)||[]).reduce((e,t)=>e+t.productPrice*t.productQuantity,0),t=document.getElementById(`sale-client`).value;await o.put(`/transactions/${O}`,{total:e,cash:A.cash,card:A.card,click:A.click,debt:A.debt,clientId:t?parseInt(t):null,description:document.getElementById(`sale-desc`).value.trim()}),a(c(`Sotuv muvaffaqiyatli yakunlandi!`)),closeModal(),Ie()}catch(e){a(e.message,`error`)}}async function Ye(e){Array.isArray(e)||(e=[e]);try{a(c(`Tafsilotlar yuklanmoqda...`),`info`);let t=(await Promise.all(e.map(e=>o.get(`/transactions/${e}/items`)))).filter(e=>e!==null).flat();openModal(`
      <div class="modal-header">
        <h3>${c(`Sotuv tafsilotlari`)}</h3>
        <span style="opacity:0.6;">№: ${e.join(`, `)}</span>
        <button class="modal-close" onclick="closeModal()">✕</button>
      </div>
      <div class="table-container">
        <table>
          <thead>
            <tr><th>#</th><th style="text-align:center">${c(`Mahsulot nomi`)}</th><th style="text-align:center">${c(`Narxi`)}</th><th style="text-align:center">${c(`Soni`)}</th><th style="text-align:center">${c(`Jami`)}</th></tr>
          </thead>
          <tbody>
            ${t.length===0?`<tr><td colspan="5" style="text-align:center;color:var(--text-muted);">${c(`Ma'lumot yo'q`)}</td></tr>`:t.map((e,t)=>{let n=e.productName||`${c(`Mahsulot`)} #${e.productId}`;return`
                <tr>
                  <td>${t+1}</td>
                  <td style="font-weight:600;">${l(n)} ${e.productBarcode?`<small style="opacity:0.5">(${e.productBarcode})</small>`:``}</td>
                  <td class="price" style="text-align:right">${s(e.productPrice)}</td>
                  <td style="text-align:center">${e.productQuantity}</td>
                  <td class="price" style="text-align:right"><strong>${s(e.productPrice*e.productQuantity)}</strong></td>
                </tr>`}).join(``)}
          </tbody>
        </table>
      </div>
      <div class="modal-footer" style="justify-content: space-between; gap: 10px; margin-top:20px;">
        <div style="display:flex; gap:10px;">
          <button class="btn btn-ghost btn-sm" onclick='downloadTransactionPdf(${JSON.stringify(e)})'>📄 PDF</button>
          <button class="btn btn-ghost btn-sm" onclick='downloadTransactionJpg(${JSON.stringify(e)})'>🖼️ JPG</button>
        </div>
        <button class="btn btn-primary btn-sm" onclick='sendTransactionToTelegram(${JSON.stringify(e)})'>📤 Telegram</button>
      </div>
    `)}catch(e){a(e.message,`error`)}}async function Xe(t,n=null){Array.isArray(t)||(t=[t]);let{jsPDF:r}=window.jspdf,i=u();try{a(c(`PDF tayyorlanmoqda...`),`info`);let[l,u]=await Promise.all([Promise.all(t.map(e=>o.get(`/transactions/${e}/items`))),o.get(`/clients?businessId=${i}`)]),d=l.flat(),f=n||D.find(e=>e.id===t[0]),p=new r,m=`helvetica`;try{let e=await fetch(`/fonts/Roboto-Regular.ttf`);if(e.ok){let t=await e.blob(),n=await new Promise(e=>{let n=new FileReader;n.onloadend=()=>e(n.result.split(`,`)[1]),n.readAsDataURL(t)});p.addFileToVFS(`Roboto-Regular.ttf`,n),p.addFont(`Roboto-Regular.ttf`,`Roboto`,`normal`),p.setFont(`Roboto`),m=`Roboto`}}catch{}p.setFont(m),p.setFontSize(11),p.setTextColor(0,0,0);let h=u&&f.clientId?u.find(e=>e.id===f.clientId):null,g=15;if(h)p.text(`${c(`Mijoz`)}: ${h.fullName}`,15,g),g+=6,p.text(`${c(`Manzil`)}: ${h.address||`-`}`,15,g),g+=6,p.text(`${c(`Telefon`)}: ${h.phone||`-`}`,15,g);else{let e=f.clientName||f.clientNumber||c(`Begona xaridor`);p.text(`${c(`Mijoz`)}: ${e}`,10,g),g+=6,p.text(`${c(`Telefon`)}: ${f.clientNumber||`-`}`,10,g)}let ee=d.map((e,t)=>{let n=e.productName||`${c(`Mahsulot`)} #${e.productId}`;return[t+1,n,e.productQuantity,e.productPrice,e.productPrice*e.productQuantity,e.productBarcode||`-`]});p.autoTable({startY:35,head:[[`#`,c(`Mahsulot nomi`),c(`Soni`),c(`Narxi`),c(`Jami`),c(`Barcode`)]],body:ee,theme:`grid`,headStyles:{fillColor:[230,230,230],textColor:0,fontStyle:`normal`,font:m,halign:`center`},styles:{fontSize:10,textColor:0,font:m,halign:`center`},columnStyles:{0:{cellWidth:10,halign:`center`},2:{cellWidth:20,halign:`center`},3:{cellWidth:30,halign:`right`},4:{cellWidth:35,halign:`right`},5:{cellWidth:30,halign:`right`}}});let _=p.lastAutoTable.finalY+15;return p.setFontSize(12),p.setTextColor(239,68,68),p.text(`${c(`Jami summa`)}: ${s(f.total)}`,15,_),_+=10,p.setFontSize(11),p.setTextColor(0,0,0),p.text(`${c(`Naqd`)}: ${s(f.cash)}`,15,_),_+=5,p.text(`${c(`Karta`)}: ${s(f.card)}`,15,_),_+=5,p.text(`${c(`Click`)}: ${s(f.click||0)}`,15,_),_+=5,p.text(`${c(`Qarz`)}: ${s(f.debt)}`,15,_),p.setFontSize(8),p.setTextColor(180,180,180),p.text(`${e(f.createdAt)} ${c(`da generatsiya qilindi`)} [IDs: ${t.join(`,`)}]`,10,285),p.text(`${c(`Sotuv tafsilotlari`)} №: ${t.join(`, `)}`,105,10,{align:`center`}),p.save(`${c(`Sotuv_`)}${t.join(`_`)}.pdf`),a(c(`PDF yuklab olindi`)),p.output(`blob`)}catch(e){console.error(e),a(c(`PDF yarata olmadim: `)+e.message,`error`)}}async function Ze(e){Array.isArray(e)||(e=[e]);let t=e[0];try{let e=document.querySelector(`.modal`);if(!e)return;let n=e.querySelector(`.modal-footer`);n&&(n.style.display=`none`);let r=await html2canvas(e,{backgroundColor:getComputedStyle(document.documentElement).getPropertyValue(`--bg-secondary`),scale:2});n&&(n.style.display=`flex`);let i=document.createElement(`a`);return i.download=`Sotuv_${t}.jpg`,i.href=r.toDataURL(`image/jpeg`,.9),i.click(),a(c(`Rasm yuklab olindi`)),new Promise(e=>r.toBlob(e,`image/jpeg`,.9))}catch(e){a(c(`Rasm yarata olmadim: `)+e.message,`error`)}}async function Qe(e){Array.isArray(e)||(e=[e]);try{a(c(`Telegramga yuborilmoqda...`),`info`);let t=await Xe(e);if(!t)throw Error(`Could not generate receipt files`);let n=new FormData;t&&n.append(`pdf`,t,`Receipt_${e[0]}.pdf`),await o.post(`/transactions/${e[0]}/send-telegram`,n,{headers:{"Content-Type":`multipart/form-data`}}),a(c(`Telegramga yuborildi!`))}catch(e){a(e.message,`error`)}}window.addToSaleBatch=Ke,window.renderSavedBatches=qe,window.finalizeSale=Je,window.renderTransactions=Ie,window.renderTransactionsTable=Le,window.filterTransactions=Re,window.openSaleModal=ze,window.searchSaleProduct=Be,window.addSaleProductById=Ve,window.renderSaleItems=j,window.removeSaleItem=He,window.onSaleQtyChange=Ue,window.onSalePriceChange=We,window.updateSaleTotal=M,window.updateSalePayment=Ge,window.viewTransactionItems=Ye,window.downloadTransactionPdf=Xe,window.downloadTransactionJpg=Ze,window.sendTransactionToTelegram=Qe,window.transactionPage=transactionPage,window.allTransactionsList=D,window.currentTransactions=Fe,window.saleProducts=T,window.saleItems=E,window.refundPage=1;var $e=[],et=[];async function tt(){let e=document.getElementById(`page-content`),t=u();if(!t){e.innerHTML=`<div class="empty-state"><div class="icon">🔄</div><h4>${c(`Avval biznes tanlang`)}</h4></div>`;return}try{et=await o.get(`/refunds?businessId=${t}`)||[],nt(et)}catch(t){e.innerHTML=`<div class="empty-state"><h4>${c(`Xatolik`)}</h4><p>${l(t.message)}</p></div>`}}function nt(t){t&&($e=t);let n=Math.ceil($e.length/15);window.refundPage>n&&(window.refundPage=n||1);let r=(window.refundPage-1)*15,i=$e.slice(r,r+15),a=document.getElementById(`page-content`);a.innerHTML=`
    <div class="acc-list">${i.length===0?`<div class="empty-state"><div class="icon">🔄</div><h4>${c(`Qaytarishlar yo'q`)}</h4></div>`:i.map((t,n)=>`
        <div class="acc-item" id="refund-acc-${t.id}">
          <div class="acc-header" onclick="toggleAcc('refund-acc-${t.id}')">
            <div class="acc-header-left">
              <div class="acc-avatar acc-avatar-orange">🔄</div>
              <div>
                <div class="acc-title">${e(t.createdAt)}</div>
                <div class="acc-subtitle">#${t.id} — ${t.clientName?l(t.clientName):c(`Begona xaridor`)}</div>
              </div>
            </div>
            <div class="acc-header-right">
              <span class="acc-price" style="color:var(--danger);">${s(t.total)} ${c(`so'm`)}</span>
              <span class="acc-chevron">▼</span>
            </div>
          </div>
          <div class="acc-body">
            <div class="acc-detail-grid">
               <div class="acc-detail-item">
                <span class="acc-detail-icon">📄</span>
                <div><div class="acc-detail-label">${c(`Izoh`)}</div><div class="acc-detail-value">${t.description||c(`Tavsif yo'q`)}</div></div>
              </div>
              <div class="acc-detail-item">
                <span class="acc-detail-icon">💰</span>
                <div><div class="acc-detail-label">${c(`Jami summa`)}</div><div class="acc-detail-value">${s(t.total)} ${c(`so'm`)}</div></div>
              </div>
            </div>
            <div class="acc-actions">
              <button class="btn btn-ghost btn-sm" onclick="viewRefundItems(${t.id})">👁️ ${c(`Tafsilotlar`)}</button>
              <button class="btn btn-primary btn-sm" onclick="downloadRefundPdf(${t.id})">📄 ${c(`PDF`)}</button>
            </div>
          </div>
        </div>`).join(``)}</div>
    ${window.renderPageControls?window.renderPageControls(`refundPage`,n,`renderRefundsTable()`):``}
    <div class="page-bottom-bar">
      <div class="search-box" style="flex:1; max-width:none;">
        <span class="search-icon" style="color:rgba(255,255,255,0.6);">🔍</span>
        <input type="text" placeholder="${c(`Qidirish...`)}" id="refund-search"
          value="${l(document.getElementById(`refund-search`)?.value||``)}"
          oninput="filterRefunds(this.value)"
          style="background:rgba(255,255,255,0.15); border-color:rgba(255,255,255,0.25); color:white;">
      </div>
      <button class="btn btn-primary" onclick="openRefundModal()">${c(`Qo'shish`)}</button>
    </div>
  `}async function rt(e){try{a(c(`Tafsilotlar yuklanmoqda...`),`info`);let t=await o.get(`/refunds/${e}/items`)||[];openModal(`
      <div class="modal-header">
        <h3>${c(`Qaytarish tafsilotlari`)} #${e}</h3>
        <button class="modal-close" onclick="closeModal()">✕</button>
      </div>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th style="text-align:center">${c(`Mahsulot nomi`)}</th>
              <th style="text-align:center">${c(`Narxi`)}</th>
              <th style="text-align:center">${c(`Soni`)}</th>
              <th style="text-align:center">${c(`Jami`)}</th>
            </tr>
          </thead>
          <tbody>
            ${t.length===0?`<tr><td colspan="5" style="text-align:center;color:var(--text-muted);">${c(`Ma'lumot yo'q`)}</td></tr>`:t.map((e,t)=>{let n=e.productName||`${c(`Mahsulot`)} #${e.productId}`;return`
                <tr>
                  <td>${t+1}</td>
                  <td style="font-weight:600;">${l(n)}</td>
                  <td class="price" style="text-align:right">${s(e.productPrice)}</td>
                  <td style="text-align:center">${e.productQuantity}</td>
                  <td class="price" style="text-align:right"><strong>${s(e.productPrice*e.productQuantity)}</strong></td>
                </tr>`}).join(``)}
          </tbody>
        </table>
      </div>
    `)}catch(e){a(e.message,`error`)}}async function it(t){let{jsPDF:n}=window.jspdf,r=u();try{a(c(`PDF tayyorlanmoqda...`),`info`);let[i,l,u]=await Promise.all([o.get(`/refunds/${t}/items`),o.get(`/clients?businessId=${r}`),Promise.resolve(et.find(e=>e.id===t))]),d=new n,f=`helvetica`;try{let e=await fetch(`/fonts/Roboto-Regular.ttf`);if(e.ok){let t=await e.blob(),n=await new Promise(e=>{let n=new FileReader;n.onloadend=()=>e(n.result.split(`,`)[1]),n.readAsDataURL(t)});d.addFileToVFS(`Roboto-Regular.ttf`,n),d.addFont(`Roboto-Regular.ttf`,`Roboto`,`normal`),d.setFont(`Roboto`),f=`Roboto`}}catch(e){console.warn(`Could not load Roboto font`,e)}d.setFont(f),d.setFontSize(14),d.text(`${c(`Qaytarish`)}: #${t}`,15,15),d.setFontSize(10),d.text(`${c(`Sana`)}: ${e(u.createdAt)}`,15,22),u.clientName&&d.text(`${c(`Mijoz`)}: ${u.clientName}`,15,29);let p=i.map((e,t)=>[t+1,e.productName||`${c(`Mahsulot`)} #${e.productId}`,e.productQuantity,e.productPrice,e.productPrice*e.productQuantity]);d.autoTable({startY:40,head:[[`#`,c(`Mahsulot nomi`),c(`Soni`),c(`Narxi`),c(`Jami`)]],body:p,theme:`grid`,styles:{font:f,fontSize:10},headStyles:{fillColor:[240,240,240],textColor:0,font:f}});let m=d.lastAutoTable.finalY+15;d.setFontSize(12),d.text(`${c(`Jami`)}: ${s(u.total)} ${c(`so'm`)}`,15,m),u.description&&(m+=10,d.setFontSize(10),d.text(`${c(`Izoh`)}: ${u.description}`,15,m)),d.save(`${c(`Qaytarish_`)}${t}.pdf`),a(c(`PDF yuklab olindi`))}catch(e){console.error(e),a(c(`PDF yarata olmadim: `)+e.message,`error`)}}function at(e){let t=e.toLowerCase();nt(et.filter(e=>e.clientName&&e.clientName.toLowerCase().includes(t)||e.id.toString().includes(t)))}var N=[];async function ot(){openModal(`
    <div class="modal-header">
      <h3>${c(`Qaytarish qo'shish`)}</h3>
      <button class="modal-close" onclick="closeModal()">✕</button>
    </div>
    <div class="modal-body" style="padding: 20px;">
      <div class="form-group">
        <label>${c(`Sotuv ID raqami`)}</label>
        <div style="display:flex; gap:10px;">
          <input type="number" class="form-control" id="refund-trans-id" placeholder="${c(`Masalan: 3468`)}">
          <button type="button" class="btn btn-primary" onclick="checkTransactionForRefund()">${c(`Tekshirish`)}</button>
        </div>
      </div>
      <div id="refund-items-area" style="margin-top:20px;"></div>
    </div>
  `)}async function st(){let e=document.getElementById(`refund-trans-id`).value;if(e)try{if(a(c(`Tafsilotlar yuklanmoqda...`),`info`),N=await o.get(`/transactions/${e}/items`)||[],N.length===0){document.getElementById(`refund-items-area`).innerHTML=`<p style="color:var(--danger); text-align:center; padding:20px;">${c(`Sotuv topilmadi`)} yoki unda mahsulotlar yo'q.</p>`;return}ct()}catch(e){a(e.message,`error`)}}function ct(){let e=document.getElementById(`refund-items-area`);e.innerHTML=`
    <div class="table-container" style="max-height: 380px; overflow-y: auto; margin-bottom: 20px; border: 1px solid var(--border); border-radius: var(--radius-md);">
      <table style="font-size: 12px; width: 100%; border-collapse: collapse;">
        <thead>
          <tr style="background: var(--bg-glass); border-bottom: 1px solid var(--border);">
            <th rowspan="2" style="padding: 10px; text-align: left; vertical-align: middle;">${c(`Mahsulot`)}</th>
            <th rowspan="2" style="padding: 10px; text-align:center; vertical-align: middle;">${c(`Sotilgan`)}</th>
            <th rowspan="2" style="padding: 10px; text-align:center; vertical-align: middle;">${c(`Narxi`)}</th>
            <th colspan="2" style="padding: 5px; text-align:center; border-left: 1px solid var(--border);">${c(`Qaytarilgan`)}</th>
            <th colspan="2" style="padding: 5px; text-align:center; border-left: 1px solid var(--border);">${c(`Qaytarish`)}</th>
          </tr>
          <tr style="background: var(--bg-glass); border-bottom: 2px solid var(--border);">
            <th style="padding: 5px; text-align:center; border-left: 1px solid var(--border); font-size: 10px;">${c(`Miqdori`)}</th>
            <th style="padding: 5px; text-align:center; font-size: 10px;">${c(`Summa`)}</th>
            <th style="padding: 5px; text-align:center; border-left: 1px solid var(--border); font-size: 10px;">${c(`Miqdori`)}</th>
            <th style="padding: 5px; text-align:center; font-size: 10px;">${c(`Summa`)}</th>
          </tr>
        </thead>
        <tbody>
          ${N.map((e,t)=>{let n=e.productQuantity-e.refundedQuantity;return`
            <tr style="border-bottom: 1px solid var(--border);">
              <td style="padding: 8px 10px;">
                <div style="font-weight:600;">${l(e.productName)}</div>
                <small style="opacity:0.6;">${e.productBarcode||``}</small>
              </td>
              <td style="padding: 8px; text-align:center;">${e.productQuantity}</td>
              <td style="padding: 8px; text-align:center;">${s(e.productPrice)}</td>
              <td style="padding: 8px; text-align:center; background: rgba(var(--danger-rgb), 0.02); border-left: 1px solid var(--border);">${e.refundedQuantity}</td>
              <td style="padding: 8px; text-align:right; background: rgba(var(--danger-rgb), 0.02);">${s(e.refundedSum)}</td>
              <td style="padding: 8px; width: 80px; border-left: 1px solid var(--border);">
                <input type="number" class="form-control" style="padding:4px; text-align:center; font-weight: 600;" 
                  id="refund-qty-${t}" value="0" min="0" max="${n}" 
                  oninput="onRefundQtyChange(${t}, this.value)">
              </td>
              <td style="padding: 8px; width: 120px;">
                <input type="number" step="0.01" class="form-control" style="padding:4px; text-align:right; color: var(--danger); font-weight: 700;" 
                  id="refund-amount-${t}" value="0" min="0"
                  oninput="validateRefundAmount(${t}, this.value)">
              </td>
            </tr>
          `}).join(``)}
        </tbody>
      </table>
    </div>
    <div class="form-group">
      <label>${c(`Izoh`)}</label>
      <input type="text" class="form-control" id="refund-desc" placeholder="${c(`Izoh`)}">
    </div>
    <div style="display:flex; justify-content:space-between; align-items:center; margin-top:20px; background:var(--bg-glass); padding:15px; border-radius:var(--radius-md); border: 1px solid var(--border);">
      <div style="font-size:18px; font-weight:700;">${c(`Jami`)}: <span id="refund-total-amount">0</span> ${c(`so'm`)}</div>
      <button type="button" class="btn btn-primary" style="padding: 10px 40px;" onclick="submitRefund()">${c(`Qaytarish`)}</button>
    </div>
  `}function lt(e,t){let n=parseInt(t)||0,r=N[e],i=document.getElementById(`refund-amount-${e}`);i.value=n*r.productPrice,dt()}function ut(e,t){let n=parseFloat(t)||0;parseInt(document.getElementById(`refund-qty(${e})`)?document.getElementById(`refund-qty(${e})`).value:0);let r=document.getElementById(`refund-qty-${e}`),i=(r&&parseInt(r.value)||0)*N[e].productPrice;n>i&&(document.getElementById(`refund-amount-${e}`).value=i,a(c(`Qaytarish summasi sotuv narxidan oshib keta olmaydi`),`warning`)),dt()}function dt(){let e=0;N.forEach((t,n)=>{let r=document.getElementById(`refund-amount-${n}`);r&&(e+=parseFloat(r.value)||0)});let t=document.getElementById(`refund-total-amount`);t&&(t.textContent=s(e))}async function ft(){let e=u();document.getElementById(`refund-trans-id`).value;let t=document.getElementById(`refund-desc`).value,n=[],r=0;if(N.forEach((e,i)=>{let a=document.getElementById(`refund-qty-${i}`),o=document.getElementById(`refund-amount-${i}`);if(a&&o){let i=parseInt(a.value)||0,s=parseFloat(o.value)||0;i>0&&(n.push({productId:e.productId,productQuantity:i,productPrice:e.productPrice,transactionId:e.id,description:t}),r+=s)}}),n.length===0){a(c(`Kamida bitta mahsulot miqdorini kiriting`),`error`);return}try{await o.post(`/refunds`,{businessId:e,total:r,description:t,cash:r,items:n}),a(c(`Qaytarish muvaffaqiyatli amalga oshirildi!`)),closeModal(),tt()}catch(e){a(e.message,`error`)}}window.renderRefunds=tt,window.renderRefundsTable=nt,window.filterRefunds=at,window.openRefundModal=ot,window.checkTransactionForRefund=st,window.onRefundQtyChange=lt,window.validateRefundAmount=ut,window.updateRefundTotal=dt,window.submitRefund=ft,window.viewRefundItems=rt,window.downloadRefundPdf=it,window.refundPage=refundPage,window.expensePage=1,window.expensePeriod=`daily`;var P=[],pt=[];window.fixedPage=1;var mt=[],F=[];async function I(){let e=document.getElementById(`page-content`),t=u();if(!t){e.innerHTML=`<div class="empty-state"><div class="icon">💸</div><h4>${c(`Avval biznes tanlang`)}</h4></div>`;return}try{let[n,r]=await Promise.all([o.get(`/expenses?businessId=${t}`),o.get(`/fixed-costs?businessId=${t}`)]);pt=n||[],F=(r||[]).filter(e=>!e.isDeleted);let i=gt(pt,window.expensePeriod).reduce((e,t)=>e+(t.total||0),0),a=window.expensePeriod===`daily`?c(`Jami xarajatlar`):window.expensePeriod===`monthly`?c(`Shu oydagi xarajatlar`):c(`Shu yildagi xarajatlar`);e.innerHTML=`
      <div class="stats-grid">
        <div class="stat-card" style="background: linear-gradient(135deg, #ff4d4d1a 0%, #ff4d4d05 100%); border-left: 4px solid #ff4d4d;">
          <div class="stat-icon" style="background:#ff4d4d20; color:#ff4d4d;">💸</div>
          <div class="stat-value" style="color:#ff4d4d;">${s(i)}</div>
          <div class="stat-label">${a}</div>
        </div>
        <div class="stat-card" style="background: linear-gradient(135deg, var(--accent)1a 0%, var(--accent)05 100%); border-left: 4px solid var(--accent);">
          <div class="stat-icon" style="background:var(--accent-glow); color:var(--accent);">📌</div>
          <div class="stat-value" style="color:var(--accent);">${F.length}</div>
          <div class="stat-label">${c(`Doimiy xarajatlar soni`)}</div>
        </div>
      </div>

      <div class="card" style="margin-bottom:20px; padding:10px;">
        <div class="segmented-control">
          <button class="segmented-item ${window.expensePeriod===`daily`?`active`:``}" onclick="setExpensePeriod('daily')">${c(`Kundalik`)}</button>
          <button class="segmented-item ${window.expensePeriod===`monthly`?`active`:``}" onclick="setExpensePeriod('monthly')">${c(`Oylik`)}</button>
          <button class="segmented-item ${window.expensePeriod===`yearly`?`active`:``}" onclick="setExpensePeriod('yearly')">${c(`Yillik`)}</button>
        </div>
      </div>

      <div id="expense-section" style="margin-bottom:30px"></div>
      <div id="fixed-section"></div>
        `,_t(),vt(F)}catch(t){e.innerHTML=`<div class="empty-state"><h4>${c(`Xatolik`)}</h4><p>${l(t.message)}</p></div>`}}function ht(e){window.expensePeriod=e,I()}function gt(e,t){return e}function _t(t){let n=document.getElementById(`expense-search`)?.value.toLowerCase()||``,r=pt.filter(e=>!n||e.description&&e.description.toLowerCase().includes(n)||e.createdAt&&e.createdAt.toLowerCase().includes(n));if(window.expensePeriod===`monthly`){let e={};r.forEach(t=>{let n=new Date(t.createdAt);if(isNaN(n.getTime()))return;let r=`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,`0`)}-${String(n.getDate()).padStart(2,`0`)}`;e[r]||(e[r]={total:0,cash:0,card:0,date:r,isGroup:!0}),e[r].total+=t.total||0,e[r].cash+=t.cash||0,e[r].card+=t.card||0}),P=Object.values(e).sort((e,t)=>t.date.localeCompare(e.date))}else if(window.expensePeriod===`yearly`){let e={};r.forEach(t=>{let n=new Date(t.createdAt);if(isNaN(n.getTime()))return;let r=`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,`0`)}`;e[r]||(e[r]={total:0,cash:0,card:0,date:r,isGroup:!0}),e[r].total+=t.total||0,e[r].cash+=t.cash||0,e[r].card+=t.card||0}),P=Object.values(e).sort((e,t)=>t.date.localeCompare(e.date))}else P=r;let i=Math.ceil(P.length/10);window.expensePage>i&&(window.expensePage=i||1);let a=(window.expensePage-1)*10,o=P.slice(a,a+10),u=document.getElementById(`expense-section`);if(!u)return;let d=window.expensePeriod===`daily`?c(`Kundalik xarajatlar`):window.expensePeriod===`monthly`?c(`Oylik xarajatlar`):c(`Yillik xarajatlar`),f=window.expensePeriod!==`daily`;u.innerHTML=`
      <div class="card">
        <div class="card-header">
           <h3 style="margin:0; font-size:16px;">${d}</h3>
           <div class="toolbar">
             <div class="search-box">
               <span class="search-icon">🔍</span>
               <input type="text" placeholder="${c(`Qidirish...`)}" id="expense-search" value="${l(document.getElementById(`expense-search`)?.value||``)}" oninput="renderExpenseTable()">
             </div>
             <button class="btn btn-primary btn-sm" onclick="openExpenseModal()">${c(`Qo'shish`)}</button>
           </div>
        </div>
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th style="text-align:center">№</th>
                <th style="text-align:center">${c(`Summa`)}</th>
                <th style="text-align:center">${c(`To'lov turi`)}</th>
                ${f?``:`<th style="text-align:center">${c(`Tavsifi`)}</th>`}
                <th style="text-align:center">${c(`Sana`)}</th>
              </tr>
            </thead>
            <tbody>
              ${o.length===0?`<tr><td colspan="${f?4:5}" style="text-align:center;padding:30px;color:var(--text-muted);">${c(`Xarajatlar mavjud emas`)}</td></tr>`:o.map((t,n)=>`
                  <tr>
                    <td style="text-align:center">${a+n+1}</td>
                    <td class="price price-negative" style="text-align:center; font-weight:700;">-${s(t.total)} ${c(`so'm`)}</td>
                    <td style="text-align:center">
                      <div style="font-size:11px; display:flex; flex-direction:column; gap:2px; align-items:center;">
                        ${t.cash>0?`<span class="badge" style="background:#4CAF5020; color:#4CAF50; border:1px solid #4CAF5040;">${c(`Naqd`)}: ${s(t.cash)}</span>`:``}
                        ${t.card>0?`<span class="badge" style="background:var(--accent)20; color:var(--accent); border:1px solid var(--accent)40;">${c(`Karta`)}: ${s(t.card)}</span>`:``}
                      </div>
                    </td>
                    ${f?``:`<td style="text-align:center">${l(t.description)||`<span style="opacity:0.3">—</span>`}</td>`}
                    <td style="text-align:center; font-size:12px; opacity:0.7;">
                      ${f?window.expensePeriod===`yearly`?(()=>{let e=[`Yanvar`,`Fevral`,`Mart`,`Aprel`,`May`,`Iyun`,`Iyul`,`Avgust`,`Sentabr`,`Oktabr`,`Noyabr`,`Dekabr`],[n,r]=t.date.split(`-`);return`${c(e[parseInt(r)-1])} ${n}`})():(()=>{let e=[`Yanvar`,`Fevral`,`Mart`,`Aprel`,`May`,`Iyun`,`Iyul`,`Avgust`,`Sentabr`,`Oktabr`,`Noyabr`,`Dekabr`],[n,r,i]=t.date.split(`-`);return`${parseInt(i)} ${c(e[parseInt(r)-1])}`})():e(t.createdAt)}
                    </td>
                  </tr>`).join(``)}
            </tbody>
          </table>
        </div>
      </div>
      ${renderPageControls(`expensePage`,i,`renderExpenseTable()`)}
    `}function vt(e){e&&(mt=e,window.fixedPage=1);let t=Math.ceil(mt.length/10);window.fixedPage>t&&(window.fixedPage=t||1);let n=(window.fixedPage-1)*10,r=mt.slice(n,n+10),i=document.getElementById(`fixed-section`);i&&(i.innerHTML=`
      <div class="card">
        <div class="card-header">
           <h3 style="margin:0; font-size:16px;">${c(`Doimiy xarajatlar`)}</h3>
           <div class="toolbar">
             <div class="search-box">
               <span class="search-icon">🔍</span>
               <input type="text" placeholder="${c(`Qidirish...`)}" id="fixed-search" value="${l(document.getElementById(`fixed-search`)?.value||``)}" oninput="filterFixed(this.value)">
             </div>
             <button class="btn btn-primary btn-sm" onclick="openFixedCostModal()">${c(`Qo'shish`)}</button>
           </div>
        </div>
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th style="text-align:center">№</th>
                <th style="text-align:center">${c(`Nomi`)}</th>
                <th style="text-align:center">${c(`Summa`)}</th>
                <th style="text-align:center">${c(`Turi`)}</th>
                <th style="text-align:center">${c(`Tavsifi`)}</th>
                <th style="text-align:center">${c(`Amallar`)}</th>
              </tr>
            </thead>
            <tbody>
              ${r.length===0?`<tr><td colspan="6" style="text-align:center;padding:30px;color:var(--text-muted);">${c(`Doimiy xarajatlar mavjud emas`)}</td></tr>`:r.map((e,t)=>`
                  <tr>
                    <td style="text-align:center">${n+t+1}</td>
                    <td style="text-align:center"><strong style="color:var(--text-primary)">${l(e.name)}</strong></td>
                    <td class="price" style="text-align:center; font-weight:700;">${s(e.amount)} ${c(`so'm`)}</td>
                    <td style="text-align:center">
                      <span class="badge" style="background:var(--bg-glass); border:1px solid var(--border); color:var(--text-secondary);">
                        ${e.type===1?c(`Oylik`):e.type===2?c(`Yillik`):c(`Boshqa`)}
                      </span>
                    </td>
                    <td style="text-align:center"><span style="font-size:13px; color:var(--text-muted)">${l(e.description)||`—`}</span></td>
                    <td class="actions" style="justify-content:center">
                      <button class="btn-icon" onclick='openFixedCostModal(${JSON.stringify(e).replace(/'/g,`&#39;`)})' title="${c(`Tahrirlash`)}">✏️</button>
                    </td>
                  </tr>`).join(``)}
            </tbody>
          </table>
        </div>
      </div>
      ${renderPageControls(`fixedPage`,t,`renderFixedTable()`)}
    `)}function yt(e){let t=e.toLowerCase(),n=F.filter(e=>e.name&&e.name.toLowerCase().includes(t)||e.description&&e.description.toLowerCase().includes(t)),r=document.getElementById(`fixed-search`),i=r?r.selectionStart:0;vt(n),setTimeout(()=>{let e=document.getElementById(`fixed-search`);if(e){e.focus();try{e.setSelectionRange(i,i)}catch{}}},0)}function bt(){openModal(`
    <div class="modal-header">
      <h3>${c(`Yangi xarajat`)}</h3>
      <button class="modal-close" onclick="closeModal()">✕</button>
    </div>
    <form onsubmit="createExpense(event)" style="min-width:400px">
      <div class="form-group">
        <label>${c(`Jami summa`)}</label>
        <div style="position:relative">
          <input type="number" step="0.01" class="form-control" id="exp-total" placeholder="0.00" required style="padding-right:45px; font-weight:700; font-size:18px;">
          <span style="position:absolute; right:12px; top:50%; transform:translateY(-50%); opacity:0.5; font-size:12px;">UZS</span>
        </div>
      </div>
      
      <div style="background:var(--bg-input); padding:15px; border-radius:12px; margin-bottom:20px; border:1px solid var(--border);">
        <p style="font-size:11px; margin-top:0; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.5px;">${c(`To'lov usuli`)}</p>
        <div class="form-row" style="margin-bottom:0">
          <div class="form-group" style="margin-bottom:0">
            <label style="font-size:11px">${c(`Naqd`)}</label>
            <input type="number" step="0.01" class="form-control" id="exp-cash" value="0">
          </div>
          <div class="form-group" style="margin-bottom:0">
            <label style="font-size:11px">${c(`Karta`)}</label>
            <input type="number" step="0.01" class="form-control" id="exp-card" value="0">
          </div>
        </div>
      </div>

      <div class="form-group">
        <label>${c(`Tavsifi`)}</label>
        <textarea class="form-control" id="exp-desc" rows="2" placeholder="${c(`Xarajat tavsifi`)}" style="resize:none"></textarea>
      </div>

      <div class="modal-footer" style="padding-top:10px">
        <button type="button" class="btn btn-ghost" onclick="closeModal()">${c(`Bekor qilish`)}</button>
        <button type="submit" class="btn btn-primary" style="padding:10px 40px;">${c(`Saqlash`)}</button>
      </div>
    </form>
  `)}async function xt(e){e.preventDefault();let t=u();try{await o.post(`/expenses`,{businessId:t,total:parseFloat(document.getElementById(`exp-total`).value),cash:parseFloat(document.getElementById(`exp-cash`).value)||0,card:parseFloat(document.getElementById(`exp-card`).value)||0,description:document.getElementById(`exp-desc`).value.trim()}),a(c(`Xarajat qo'shildi`)),closeModal(),I()}catch(e){a(e.message,`error`)}}function St(e=null){let t=!!e;openModal(`
    <div class="modal-header">
      <h3>${c(t?`Doimiy xarajatni tahrirlash`:`Yangi doimiy xarajat`)}</h3>
      <button class="modal-close" onclick="closeModal()">✕</button>
    </div>
    <form onsubmit="saveFixedCost(event, ${t?e.id:0})" style="min-width:450px">
      <div class="form-group">
        <label>${c(`Turi`)}</label>
        <input type="text" class="form-control" id="fc-name" value="${t?l(e.name):``}" placeholder="${c(`Turini kiriting`)}" required>
      </div>
      
      <div class="form-row">
        <div class="form-group">
          <label>${c(`Summa`)}</label>
          <div style="position:relative">
            <input type="number" step="0.01" class="form-control" id="fc-amount" value="${t?e.amount:``}" required style="padding-right:45px">
            <span style="position:absolute; right:12px; top:50%; transform:translateY(-50%); opacity:0.5; font-size:12px;">UZS</span>
          </div>
        </div>
        <div class="form-group">
          <label>${c(`Turi`)}</label>
          <select class="form-control" id="fc-type" required>
            <option value="1" ${t&&e.type===1?`selected`:``}>${c(`Oylik`)}</option>
            <option value="2" ${t&&e.type===2?`selected`:``}>${c(`Yillik`)}</option>
            <option value="3" ${t&&e.type===3?`selected`:``}>${c(`Boshqa`)}</option>
          </select>
        </div>
      </div>

      <div class="form-group">
        <label>${c(`Tavsifi`)}</label>
        <textarea class="form-control" id="fc-desc" rows="2" style="resize:none">${t&&e.description?l(e.description):``}</textarea>
      </div>

      <div class="modal-footer" style="padding-top:10px">
        <button type="button" class="btn btn-ghost" onclick="closeModal()">${c(`Bekor qilish`)}</button>
        <button type="submit" class="btn btn-primary" style="padding:10px 40px;">${c(t?`Saqlash`:`Yaratish`)}</button>
      </div>
    </form>
  `)}async function Ct(e,t){e.preventDefault();let n=u();try{t?(await o.put(`/fixed-costs/${t}`,{name:document.getElementById(`fc-name`).value.trim(),description:document.getElementById(`fc-desc`).value.trim()||null,amount:parseFloat(document.getElementById(`fc-amount`).value),type:parseInt(document.getElementById(`fc-type`).value)}),a(c(`Doimiy xarajat yangilandi`))):(await o.post(`/fixed-costs`,{businessId:n,name:document.getElementById(`fc-name`).value.trim(),description:document.getElementById(`fc-desc`).value.trim(),amount:parseFloat(document.getElementById(`fc-amount`).value),type:parseInt(document.getElementById(`fc-type`).value)}),a(c(`Doimiy xarajat qo'shildi`))),closeModal(),I()}catch(e){a(e.message,`error`)}}window.renderExpenses=I,window.renderExpenseTable=_t,window.filterExpensesByPeriod=gt,window.setExpensePeriod=ht,window.openExpenseModal=bt,window.createExpense=xt,window.renderFixedTable=vt,window.filterFixed=yt,window.openFixedCostModal=St,window.saveFixedCost=Ct,window.expensePage=expensePage,window.expensePeriod=expensePeriod,window.fixedPage=fixedPage,window.allExpensesList=pt,window.allFixedList=F,window.currentExpenses=P,window.currentFixed=mt;var L=1,wt=[],R=[];async function Tt(){let e=document.getElementById(`page-content`),t=u();if(!t){e.innerHTML=`<div class="empty-state"><div class="icon">📊</div><h4>${c(`Avval biznes tanlang`)}</h4></div>`;return}try{R=await o.get(`/calculations?businessId=${t}`)||[],R.sort((e,t)=>e.year===t.year?t.month-e.month:t.year-e.year),Et(R)}catch(t){e.innerHTML=`<div class="empty-state"><h4>${c(`Xatolik`)}</h4><p>${l(t.message)}</p></div>`}}function Et(e){e&&(wt=e,L=1);let t=Math.ceil(wt.length/10);L>t&&(L=t||1);let n=(L-1)*10,r=wt.slice(n,n+10),i=[``,`Yanvar`,`Fevral`,`Mart`,`Aprel`,`May`,`Iyun`,`Iyul`,`Avgust`,`Sentabr`,`Oktabr`,`Noyabr`,`Dekabr`],a=document.getElementById(`page-content`);a.innerHTML=`
      <div class="card" style="margin-bottom:20px">
        <div class="card-header">
           <h3 style="margin:0; font-size:16px;">${c(`Oylik hisob-kitoblar`)}</h3>
           <div class="toolbar">
             <div class="search-box">
               <span class="search-icon">🔍</span>
               <input type="text" placeholder="${c(`Yil bo'yicha`)}" id="calculation-search" value="${l(document.getElementById(`calculation-search`)?.value||``)}" oninput="filterCalculations(this.value)">
             </div>
             <button class="btn btn-primary btn-sm" onclick="openCalculationModal()">${c(`Qo'shish`)}</button>
           </div>
        </div>
      </div>

      ${r.length===0?`<div class="empty-state"><div class="icon">📊</div><h4>${c(`Hisob-kitoblar yo'q`)}</h4><p>${c(`Yangi hisob-kitob yarating.`)}</p></div>`:`<div class="stats-grid">
           ${r.map(e=>{let t=c(i[e.month]||e.month),n=e.profit>=0;return`
            <div class="stat-card" style="cursor:pointer; display:block; height:auto; padding:20px; transition:all 0.3s; border:1px solid var(--border);" onclick='viewCalculationDetail(${JSON.stringify(e).replace(/'/g,`&#39;`)})'>
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px; border-bottom:1px solid var(--border); padding-bottom:10px;">
                <span style="font-size:16px; font-weight:700; color:var(--text-primary);">${t} ${e.year}</span>
                <span class="badge" style="background:${n?`#4CAF5020`:`#f4433620`}; color:${n?`#4CAF50`:`#f44336`}; padding:6px 12px; font-weight:700;">
                  ${c(n?`Foyda`:`Zarar`)}
                </span>
              </div>
              
              <div style="margin-bottom:15px">
                 <div style="font-size:11px; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.5px;">${c(`Sof foyda`)}</div>
                 <div style="font-size:24px; font-weight:800; color:${n?`var(--success)`:`var(--danger)`};">
                   ${n?``:`-`}${s(Math.abs(e.profit))} <small style="font-size:12px; font-weight:400; opacity:0.6;">UZS</small>
                 </div>
              </div>

              <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; font-size:13px; background:var(--bg-glass); border-radius:8px; padding:12px;">
                <div>
                  <div style="color:var(--text-muted); font-size:10px; text-transform:uppercase;">${c(`Sotuv`)}</div>
                  <div style="font-weight:700; color:var(--success)">${s(e.totalSale)}</div>
                </div>
                <div>
                  <div style="color:var(--text-muted); font-size:10px; text-transform:uppercase;">${c(`Xarajat`)}</div>
                  <div style="font-weight:700; color:var(--danger)">${s(e.totalExpense+e.totalFixedCosts)}</div>
                </div>
              </div>
              
              <div style="margin-top:10px; text-align:right; font-size:11px; color:var(--text-muted); font-style:italic;">
                ${c(`Batafsil ko'rish`)} →
              </div>
            </div>
          `}).join(``)}
        </div>`}
      ${renderPageControls(`calculationPage`,t,`renderCalculationsTable()`)}
    `}function Dt(e){let t=e.toLowerCase(),n=R.filter(e=>String(e.year).includes(t)),r=document.getElementById(`calculation-search`),i=r?r.selectionStart:0;Et(n),setTimeout(()=>{let e=document.getElementById(`calculation-search`);if(e){e.focus();try{e.setSelectionRange(i,i)}catch{}}},0)}function Ot(e){let t=c([``,`Yanvar`,`Fevral`,`Mart`,`Aprel`,`May`,`Iyun`,`Iyul`,`Avgust`,`Sentabr`,`Oktabr`,`Noyabr`,`Dekabr`][e.month]||e.month);openModal(`
    <div class="modal-header">
      <h3>📊 ${t} ${e.year} — ${c(`Hisob-kitob tafsilotlari`)}</h3>
      <button class="modal-close" onclick="closeModal()">✕</button>
    </div>
    <div style="padding:0 10px">
      <div class="table-container" style="border:none; background:none;">
        <table style="border-collapse: separate; border-spacing: 0 8px;">
          <tbody>
            <tr style="background:var(--bg-glass); border-radius:8px;">
              <td style="padding:12px; border:none; color:var(--text-secondary)">${c(`Jami sotuv`)}</td>
              <td class="price" style="padding:12px; border:none; text-align:right; font-weight:700;">${s(e.totalSale)} ${c(`so'm`)}</td>
            </tr>
            <tr>
              <td style="padding:12px; border:none; color:var(--text-secondary)">${c(`Jami daromad`)}</td>
              <td class="price" style="padding:12px; border:none; text-align:right; color:var(--success); font-weight:700;">${s(e.totalIncome)} ${c(`so'm`)}</td>
            </tr>
            <tr>
              <td style="padding:12px; border:none; color:var(--text-secondary)">${c(`Jami xarajat`)}</td>
              <td class="price" style="padding:12px; border:none; text-align:right; color:var(--danger); font-weight:700;">-${s(e.totalExpense+e.totalFixedCosts)} ${c(`so'm`)}</td>
            </tr>
            <tr style="border-bottom: 2px solid var(--border);">
              <td style="padding:12px; border:none; color:var(--text-secondary)">${c(`Ish haqi va soliqlar`)}</td>
              <td class="price" style="padding:12px; border:none; text-align:right; color:var(--danger); opacity:0.8;">-${s(e.salary+e.salaryTax+e.incomeTax)} ${c(`so'm`)}</td>
            </tr>
            <tr>
              <td style="padding:12px; border:none; color:var(--text-secondary)">${c(`Qo'shilgan mablag'lar`)}</td>
              <td class="price" style="padding:12px; border:none; text-align:right;">${s(e.addedMoney)} ${c(`so'm`)}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr style="background:var(--accent-glow); border-radius:12px;">
              <td style="padding:20px; border:none; font-weight:800; font-size:18px; color:var(--text-primary); border-radius:12px 0 0 12px;">${c(`Sof foyda`)}</td>
              <td class="price" style="padding:20px; border:none; text-align:right; font-size:22px; font-weight:800; color:${e.profit>=0?`var(--success)`:`var(--danger)`}; border-radius:0 12px 12px 0;">
                ${s(e.profit)} ${c(`so'm`)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
    <div class="modal-footer">
       <button class="btn btn-primary" onclick="closeModal()" style="width:100%">${c(`Yopish`)}</button>
    </div>
  `)}function kt(){let e=new Date;openModal(`
    <div class="modal-header">
      <h3>${c(`Yangi hisob-kitob`)}</h3>
      <button class="modal-close" onclick="closeModal()">✕</button>
    </div>
    <form onsubmit="createCalculation(event)" style="min-width:550px">
      <div class="form-row">
        <div class="form-group">
          <label>${c(`Oy`)}</label>
          <select class="form-control" id="calc-month" required>
            ${[``,`Yanvar`,`Fevral`,`Mart`,`Aprel`,`May`,`Iyun`,`Iyul`,`Avgust`,`Sentabr`,`Oktabr`,`Noyabr`,`Dekabr`].map((e,t)=>t===0?``:`<option value="${t}">${c(e)}</option>`).join(``)}
          </select>
        </div>
        <div class="form-group">
          <label>${c(`Yil`)}</label>
          <input type="number" class="form-control" id="calc-year" value="${e.getFullYear()}" required>
        </div>
      </div>

      <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px;">
        <div>
          <h4 style="font-size:12px; color:var(--success); border-bottom:1px solid var(--border); padding-bottom:5px; margin-bottom:12px;">${c(`Daromadlar`)}</h4>
          <div class="form-group">
            <label>${c(`Jami sotuv`)}</label>
            <input type="number" step="0.01" class="form-control" id="calc-sale" value="0">
          </div>
          <div class="form-group">
            <label>${c(`Jami daromad`)}</label>
            <input type="number" step="0.01" class="form-control" id="calc-income" value="0">
          </div>
          <div class="form-group">
            <label>${c(`Qo'shilgan mablag'lar`)}</label>
            <input type="number" step="0.01" class="form-control" id="calc-added" value="0">
          </div>
        </div>

        <div>
          <h4 style="font-size:12px; color:var(--danger); border-bottom:1px solid var(--border); padding-bottom:5px; margin-bottom:12px;">${c(`Xarajatlar`)}</h4>
          <div class="form-group">
            <label>${c(`Xarajatlar`)}</label>
            <input type="number" step="0.01" class="form-control" id="calc-expense" value="0">
          </div>
          <div class="form-group">
            <label>${c(`Doimiy xarajatlar`)}</label>
            <input type="number" step="0.01" class="form-control" id="calc-fixed" value="0">
          </div>
          <div class="form-group">
            <label>${c(`Ish haqi va soliqlar`)}</label>
            <input type="number" step="0.01" class="form-control" id="calc-salary-total" value="0" placeholder="${c(`Ish haqi va soliqlar`)}">
          </div>
        </div>
      </div>
      
      <div style="background:var(--accent-glow); padding:15px; border-radius:12px; border:1px solid var(--accent);">
        <div class="form-group" style="margin-bottom:0">
          <label style="font-weight:700; color:var(--text-primary)">${c(`Hisoblangan sof foyda`)}</label>
          <input type="number" step="0.01" class="form-control" id="calc-profit" value="0" style="font-size:20px; font-weight:800; color:var(--accent);">
        </div>
      </div>

      <div class="modal-footer" style="padding-top:10px">
        <button type="button" class="btn btn-ghost" onclick="closeModal()">${c(`Bekor qilish`)}</button>
        <button type="submit" class="btn btn-primary" style="padding:10px 40px;">${c(`Yaratish`)}</button>
      </div>
    </form>
  `),document.getElementById(`calc-month`).value=e.getMonth()+1}async function At(e){e.preventDefault();let t=u();try{await o.post(`/calculations`,{businessId:t,month:parseInt(document.getElementById(`calc-month`).value),year:parseInt(document.getElementById(`calc-year`).value),totalSale:parseFloat(document.getElementById(`calc-sale`).value)||0,totalIncome:parseFloat(document.getElementById(`calc-income`).value)||0,incomeTax:parseFloat(document.getElementById(`calc-income-tax`).value)||0,totalExpense:parseFloat(document.getElementById(`calc-expense`).value)||0,totalFixedCosts:parseFloat(document.getElementById(`calc-fixed`).value)||0,salary:parseFloat(document.getElementById(`calc-salary`).value)||0,salaryTax:parseFloat(document.getElementById(`calc-salary-tax`).value)||0,profit:parseFloat(document.getElementById(`calc-profit`).value)||0,addedMoney:parseFloat(document.getElementById(`calc-added`).value)||0}),a(c(`Hisob-kitob yaratildi`)),closeModal(),Tt()}catch(e){a(e.message,`error`)}}window.renderCalculations=Tt,window.renderCalculationsTable=Et,window.filterCalculations=Dt,window.openCalculationModal=kt,window.createCalculation=At,window.viewCalculationDetail=Ot,window.calculationPage=L,window.allCalculationsList=R,window.currentCalculations=wt;var jt=`users`;async function Mt(){let e=document.getElementById(`page-content`);e.innerHTML=`
        <div class="admin-tabs">
            <button class="btn btn-secondary active" onclick="showAdminTab('users')" id="tab-users">👥 ${c(`Foydalanuvchilar`)}</button>
            <button class="btn btn-secondary" onclick="showAdminTab('regions')" id="tab-regions">🗺️ ${c(`Viloyatlar`)}</button>
            <button class="btn btn-secondary" onclick="showAdminTab('districts')" id="tab-districts">🏘️ ${c(`Tumanlar`)}</button>
            <button class="btn btn-secondary" onclick="showAdminTab('markets')" id="tab-markets">🏪 ${c(`Bozorlar`)}</button>
        </div>
        <div id="admin-content"></div>
    `,Nt(jt)}function Nt(e){jt=e,document.querySelectorAll(`.admin-tabs .btn`).forEach(e=>{e.classList.remove(`active`),e.classList.replace(`btn-primary`,`btn-secondary`)});let t=document.getElementById(`tab-`+e);switch(t&&(t.classList.add(`active`),t.classList.replace(`btn-secondary`,`btn-primary`)),e){case`users`:It();break;case`regions`:W();break;case`districts`:K();break;case`markets`:J();break}}var z=1,Pt=[],Ft=[];async function It(){let e=document.getElementById(`admin-content`);e.innerHTML=`<div class="loader"></div>`;try{Ft=await o.get(`/admin/users`)||[],Bt(Ft)}catch(t){e.innerHTML=`<p class="error">${c(`Xatolik`)}: `+t.message+`</p>`}}var B=1,Lt=[],V=1,Rt=[],H=1,zt=[];function Bt(e){e&&(Pt=e,z=1);let t=Math.ceil(Pt.length/10);z>t&&(z=t||1);let n=(z-1)*10,r=Pt.slice(n,n+10),a=document.getElementById(`admin-content`);a.innerHTML=`
        <div class="card" style="margin-top:20px">
            <div class="card-header">
              <div class="toolbar" style="width:100%">
                <div class="search-box">
                  <span class="search-icon">🔍</span>
                  <input type="text" placeholder="${c(`Qidirish...`)}" id="admin-user-search" value="${l(document.getElementById(`admin-user-search`)?.value||``)}" oninput="filterAdminUsers(this.value)">
                </div>
                <button class="btn btn-primary btn-sm" onclick="openCreateUserModal()">${c(`Qo'shish`)}</button>
              </div>
            </div>
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th style="text-align:center">№</th>
                            <th style="text-align:center">ID</th>
                            <th style="text-align:center">${c(`Ism`)}</th>
                            <th style="text-align:center">${c(`Username`)}</th>
                            <th style="text-align:center">${c(`Telefon`)}</th>
                            <th style="text-align:center">${c(`Rol`)}</th>
                            <th style="text-align:center">${c(`Muddati`)}</th>
                            <th style="text-align:center">${c(`Holati`)}</th>
                            <th style="text-align:center">${c(`Amallar`)}</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${r.length===0?`<tr><td colspan="9" style="text-align:center;color:var(--text-muted);">${c(`Ma'lumot yo'q`)}</td></tr>`:r.map((e,t)=>{let r=e.role===2?`Super Admin`:e.role===1?`Admin`:e.role===3?`Client`:`Employee`;return`
                            <tr>
                                <td style="text-align:center">${n+t+1}</td>
                                <td style="text-align:center">${e.id}</td>
                                <td>${l(e.firstName)} ${l(e.lastName)}</td>
                                <td>${l(e.userName)}</td>
                                <td style="text-align:center">${e.phoneNumber||`—`}</td>
                                <td style="text-align:center"><span class="badge ${e.role===2?`badge-success`:e.role===1?`badge-warning`:e.role===3?`badge-info`:``}">${c(r)}</span></td>
                                <td style="text-align:center">${i(e.expirationDate)}</td>
                                <td style="text-align:center">${e.isExpired&&e.role!==2?`<span class="badge badge-danger">${c(`Muddati tugagan`)}</span>`:`<span class="badge badge-success">${c(`Faol`)}</span>`}</td>
                                <td class="actions" style="justify-content:center">
                                    <button class="btn-icon" onclick='openEditUserModal(${e.id}, ${JSON.stringify(JSON.stringify(e)).replace(/'/g,`&#39;`)})' title="${c(`Tahrirlash`)}">✏️</button>
                                    <button class="btn-icon danger" onclick="deleteAdminUser(${e.id})" title="${c(`O'chirish`)}">🗑️</button>
                                </td>
                            </tr>
                        `}).join(``)}
                    </tbody>
                </table>
            </div>
        </div>
        ${renderPageControls(`adminUserPage`,t,`renderAdminUsersTable()`)}
    `}function Vt(e){let t=e.toLowerCase(),n=Ft.filter(e=>{let n=e.role===2?`super admin`:e.role===1?`admin`:e.role===3?`client`:`employee`;return e.firstName&&e.firstName.toLowerCase().includes(t)||e.lastName&&e.lastName.toLowerCase().includes(t)||e.userName&&e.userName.toLowerCase().includes(t)||e.phoneNumber&&e.phoneNumber.toLowerCase().includes(t)||n.includes(t)}),r=document.getElementById(`admin-user-search`),i=r?r.selectionStart:0;Bt(n),setTimeout(()=>{let e=document.getElementById(`admin-user-search`);if(e){e.focus();try{e.setSelectionRange(i,i)}catch{}}},0)}function Ht(){openModal(c(`Yangi foydalanuvchi`),`
        <form onsubmit="createAdminUser(event)">
            <div class="form-row">
                <div class="form-group">
                    <label>${c(`Ism`)}</label>
                    <input type="text" id="add-firstName" class="form-control" required>
                </div>
                <div class="form-group">
                    <label>${c(`Familiya`)}</label>
                    <input type="text" id="add-lastName" class="form-control" required>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>${c(`Username`)}</label>
                    <input type="text" id="add-userName" class="form-control" required>
                </div>
                <div class="form-group">
                    <label>${c(`Telefon`)}</label>
                    <input type="text" id="add-phone" class="form-control">
                </div>
            </div>
            <div class="form-group">
                <label>${c(`Parol`)}</label>
                <input type="password" id="add-password" class="form-control" required minlength="6">
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" onclick="closeModal()">${c(`Bekor qilish`)}</button>
                <button type="submit" class="btn btn-primary">${c(`Saqlash`)}</button>
            </div>
        </form>
    `)}async function Ut(e){e.preventDefault();let t={firstName:document.getElementById(`add-firstName`).value,lastName:document.getElementById(`add-lastName`).value,userName:document.getElementById(`add-userName`).value,phoneNumber:document.getElementById(`add-phone`).value,password:document.getElementById(`add-password`).value};try{await o.post(`/auth/register`,t),a(c(`Foydalanuvchi yaratildi`),`success`),closeModal(),It()}catch(e){a(e.message,`error`)}}function Wt(e,t){let n=JSON.parse(t),r=n.expirationDate?n.expirationDate.substring(0,10):``;openModal(c(`Foydalanuvchini tahrirlash`),`
        <form onsubmit="saveAdminUser(event, ${e})">
            <div class="form-row">
                <div class="form-group">
                    <label>${c(`Ism`)}</label>
                    <input type="text" id="edit-firstName" class="form-control" value="${l(n.firstName)}" required>
                </div>
                <div class="form-group">
                    <label>${c(`Familiya`)}</label>
                    <input type="text" id="edit-lastName" class="form-control" value="${l(n.lastName)}" required>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>${c(`Telefon`)}</label>
                    <input type="text" id="edit-phone" class="form-control" value="${n.phoneNumber||``}">
                </div>
                <div class="form-group">
                    <label>${c(`Rol`)}</label>
                    <select id="edit-role" class="form-control">
                        <option value="0" ${n.role===0?`selected`:``}>${c(`Employee`)} (0)</option>
                        <option value="1" ${n.role===1?`selected`:``}>${c(`Admin`)} (1)</option>
                        <option value="2" ${n.role===2?`selected`:``}>${c(`Super Admin`)} (2)</option>
                        <option value="3" ${n.role===3?`selected`:``}>${c(`Client`)} (3)</option>
                    </select>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>${c(`Obuna muddati`)}</label>
                    <input type="date" id="edit-expiration" class="form-control" value="${r}">
                </div>
                <div class="form-group">
                    <label>${c(`Holati`)}</label>
                    <select id="edit-expired" class="form-control">
                        <option value="false" ${n.isExpired?``:`selected`}>${c(`Faol`)}</option>
                        <option value="true" ${n.isExpired?`selected`:``}>${c(`Muddati tugagan`)}</option>
                    </select>
                </div>
            </div>
            <div class="form-group">
                <label>${c(`Yangi parol`)}</label>
                <input type="password" id="edit-password" class="form-control" placeholder="${c(`Yangi parol`)}">
            </div>
            <div style="margin-top:20px; padding-top:15px; border-top:1px dashed var(--border);">
                <div class="form-group">
                    <label>${c(`Brend nomi`)}</label>
                    <input type="text" id="edit-brandName" class="form-control" value="${l(n.brandName||``)}">
                </div>
                <div class="form-group">
                    <label>${c(`Brend rasmi`)}</label>
                    <div style="display:flex; gap:10px; align-items:center;">
                        <input type="file" class="form-control" accept="image/*" onchange="previewAdminBrandImage(this)">
                        <input type="hidden" id="edit-brandImage" value="${l(n.brandImage||``)}">
                        <div id="admin-brand-preview" style="width:50px; height:50px; border:1px solid var(--border); border-radius:8px; overflow:hidden;">
                            ${n.brandImage?`<img src="${n.brandImage}" style="width:100%; height:100%; object-fit:cover;">`:``}
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" onclick="closeModal()">${c(`Bekor qilish`)}</button>
                <button type="submit" class="btn btn-primary">${c(`Saqlash`)}</button>
            </div>
        </form>
    `)}async function Gt(e,t){e.preventDefault();let n={firstName:document.getElementById(`edit-firstName`).value,lastName:document.getElementById(`edit-lastName`).value,phoneNumber:document.getElementById(`edit-phone`).value,role:parseInt(document.getElementById(`edit-role`).value),isExpired:document.getElementById(`edit-expired`).value===`true`},r=document.getElementById(`edit-expiration`).value;r&&(n.expirationDate=new Date(r).toISOString()),n.brandName=document.getElementById(`edit-brandName`).value,n.brandImage=document.getElementById(`edit-brandImage`).value;let i=document.getElementById(`edit-password`).value;i&&(n.password=i);try{await o.put(`/admin/users/`+t,n),a(c(`Foydalanuvchi yangilandi`),`success`),closeModal(),It()}catch(e){a(e.message,`error`)}}async function Kt(e){if(e.files&&e.files[0]){let t=new FormData;t.append(`file`,e.files[0]);try{let e=await o.post(`/upload`,t);e.url&&(document.getElementById(`edit-brandImage`).value=e.url,document.getElementById(`admin-brand-preview`).innerHTML=`<img src="${e.url}" style="width:100%; height:100%; object-fit:cover;">`)}catch(e){a(e.message,`error`)}}}async function qt(e){if(confirm(c(`Foydalanuvchini o'chirishni xohlaysizmi?`)))try{await o.delete(`/admin/users/`+e),a(c(`Foydalanuvchi o'chirildi`),`success`),It()}catch(e){a(e.message,`error`)}}var U=1,Jt=[],Yt=[];async function W(){let e=document.getElementById(`admin-content`);e.innerHTML=`<div class="loader"></div>`;try{Yt=await o.get(`/admin/regions`)||[],Xt(Yt)}catch(t){e.innerHTML=`<p class="error">${c(`Xatolik`)}: `+t.message+`</p>`}}function Xt(e){e&&(Jt=e,U=1);let t=Math.ceil(Jt.length/10);U>t&&(U=t||1);let n=(U-1)*10,r=Jt.slice(n,n+10),i=document.getElementById(`admin-content`);i.innerHTML=`
        <div class="card" style="margin-top:20px">
            <div class="card-header">
              <div class="toolbar" style="width:100%">
                <div class="search-box">
                  <span class="search-icon">🔍</span>
                  <input type="text" placeholder="${c(`Qidirish...`)}" id="admin-region-search" value="${l(document.getElementById(`admin-region-search`)?.value||``)}" oninput="filterAdminRegions(this.value)">
                </div>
                <button class="btn btn-primary btn-sm" onclick="openRegionModal()">${c(`Qo'shish`)}</button>
              </div>
            </div>
            <div class="table-container">
                <table>
                    <thead><tr><th style="text-align:center">№</th><th style="text-align:center">${c(`Nomi`)}</th><th style="text-align:center">${c(`Amallar`)}</th></tr></thead>
                    <tbody>
                        ${r.length===0?`<tr><td colspan="4" style="text-align:center;color:var(--text-muted);">${c(`Ma'lumot yo'q`)}</td></tr>`:r.map((e,t)=>`
                            <tr>
                                <td style="text-align:center">${n+t+1}</td>
                                <td style="text-align:center">${l(e.name)}</td>
                                <td class="actions" style="justify-content:center">
                                    <button class="btn-icon" onclick="openRegionModal(${e.id}, '${l(e.name)}')" title="${c(`Tahrirlash`)}">✏️</button>
                                    <button class="btn-icon danger" onclick="deleteRegion(${e.id})" title="${c(`O'chirish`)}">🗑️</button>
                                </td>
                            </tr>
                        `).join(``)}
                    </tbody>
                </table>
            </div>
        </div>
        ${renderPageControls(`adminRegionPage`,t,`renderAdminRegionsTable()`)}
    `}function Zt(e){let t=e.toLowerCase(),n=Yt.filter(e=>e.name&&e.name.toLowerCase().includes(t)),r=document.getElementById(`admin-region-search`),i=r?r.selectionStart:0;Xt(n),setTimeout(()=>{let e=document.getElementById(`admin-region-search`);if(e){e.focus();try{e.setSelectionRange(i,i)}catch{}}},0)}function Qt(e,t){let n=!!e;openModal(c(n?`Viloyatni tahrirlash`:`Yangi viloyat`),`
        <form onsubmit="${n?`updateRegion(event, ${e})`:`createRegion(event)`}">
            <div class="form-group">
                <label>${c(`Nomi`)}</label>
                <input type="text" id="region-name" class="form-control" value="${t||``}" required>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" onclick="closeModal()">${c(`Bekor qilish`)}</button>
                <button type="submit" class="btn btn-primary">${c(`Saqlash`)}</button>
            </div>
        </form>
    `)}async function $t(e){e.preventDefault();try{await o.post(`/admin/regions`,{name:document.getElementById(`region-name`).value}),a(c(`Viloyat yaratildi`),`success`),closeModal(),W()}catch(e){a(e.message,`error`)}}async function en(e,t){e.preventDefault();try{await o.put(`/admin/regions/`+t,{name:document.getElementById(`region-name`).value}),a(c(`Viloyat yangilandi`),`success`),closeModal(),W()}catch(e){a(e.message,`error`)}}async function tn(e){if(confirm(c(`Viloyatni o'chirishni xohlaysizmi?`)))try{await o.delete(`/admin/regions/`+e),a(c(`Viloyat o'chirildi`),`success`),W()}catch(e){a(e.message,`error`)}}var G=1,nn=[],rn=[],an=[];async function K(){let e=document.getElementById(`admin-content`);e.innerHTML=`<div class="loader"></div>`;try{let[e,t]=await Promise.all([o.get(`/admin/districts`),o.get(`/admin/regions`)]);an=t||[],rn=e||[],on(rn)}catch(t){e.innerHTML=`<p class="error">${c(`Xatolik`)}: `+t.message+`</p>`}}function on(e){e&&(nn=e,G=1);let t=Math.ceil(nn.length/10);G>t&&(G=t||1);let n=(G-1)*10,r=nn.slice(n,n+10),i=document.getElementById(`admin-content`);i.innerHTML=`
        <div class="card" style="margin-top:20px">
            <div class="card-header">
              <div class="toolbar" style="width:100%">
                <div class="search-box">
                  <span class="search-icon">🔍</span>
                  <input type="text" placeholder="${c(`Qidirish...`)}" id="admin-district-search" value="${l(document.getElementById(`admin-district-search`)?.value||``)}" oninput="filterAdminDistricts(this.value)">
                </div>
                <button class="btn btn-primary btn-sm" onclick='openDistrictModal(null, null, null, ${JSON.stringify(JSON.stringify(an)).replace(/'/g,`&#39;`)})'>${c(`Qo'shish`)}</button>
              </div>
            </div>
            <div class="table-container">
                <table>
                    <thead><tr><th style="text-align:center">№</th><th style="text-align:center">${c(`Nomi`)}</th><th style="text-align:center">${c(`Viloyat`)}</th><th style="text-align:center">${c(`Amallar`)}</th></tr></thead>
                    <tbody>
                        ${r.length===0?`<tr><td colspan="5" style="text-align:center;color:var(--text-muted);">${c(`Ma'lumot yo'q`)}</td></tr>`:r.map((e,t)=>`
                            <tr>
                                <td style="text-align:center">${n+t+1}</td>
                                <td style="text-align:center">${l(e.name)}</td>
                                <td style="text-align:center">${l(e.regionName||``)}</td>
                                <td class="actions" style="justify-content:center">
                                    <button class="btn-icon" onclick='openDistrictModal(${e.id}, "${l(e.name)}", ${e.regionId}, ${JSON.stringify(JSON.stringify(an)).replace(/'/g,`&#39;`)})' title="${c(`Tahrirlash`)}">✏️</button>
                                    <button class="btn-icon danger" onclick="deleteDistrict(${e.id})" title="${c(`O'chirish`)}">🗑️</button>
                                </td>
                            </tr>
                        `).join(``)}
                    </tbody>
                </table>
            </div>
        </div>
        ${renderPageControls(`adminDistrictPage`,t,`renderAdminDistrictsTable()`)}
    `}function sn(e){let t=e.toLowerCase(),n=rn.filter(e=>e.name&&e.name.toLowerCase().includes(t)||e.regionName&&e.regionName.toLowerCase().includes(t)),r=document.getElementById(`admin-district-search`),i=r?r.selectionStart:0;on(n),setTimeout(()=>{let e=document.getElementById(`admin-district-search`);if(e){e.focus();try{e.setSelectionRange(i,i)}catch{}}},0)}function cn(e,t,n,r){let i=!!e,a=JSON.parse(r);openModal(c(i?`Tumanni tahrirlash`:`Yangi tuman`),`
        <form onsubmit="${i?`updateDistrict(event, ${e})`:`createDistrict(event)`}">
            <div class="form-group">
                <label>${c(`Nomi`)}</label>
                <input type="text" id="district-name" class="form-control" value="${t||``}" required>
            </div>
            <div class="form-group">
                <label>${c(`Viloyat`)}</label>
                <select id="district-regionId" class="form-control" required>
                    <option value="">${c(`Tanlang...`)}</option>
                    ${a.map(e=>`<option value="${e.id}" ${e.id===n?`selected`:``}>${l(e.name)}</option>`).join(``)}
                </select>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" onclick="closeModal()">${c(`Bekor qilish`)}</button>
                <button type="submit" class="btn btn-primary">${c(`Saqlash`)}</button>
            </div>
        </form>
    `)}async function ln(e){e.preventDefault();try{await o.post(`/admin/districts`,{name:document.getElementById(`district-name`).value,regionId:parseInt(document.getElementById(`district-regionId`).value)}),a(c(`Tuman yaratildi`),`success`),closeModal(),K()}catch(e){a(e.message,`error`)}}async function un(e,t){e.preventDefault();try{await o.put(`/admin/districts/`+t,{name:document.getElementById(`district-name`).value,regionId:parseInt(document.getElementById(`district-regionId`).value)}),a(c(`Tuman yangilandi`),`success`),closeModal(),K()}catch(e){a(e.message,`error`)}}async function dn(e){if(confirm(c(`Tumanni o'chirishni xohlaysizmi?`)))try{await o.delete(`/admin/districts/`+e),a(c(`Tuman o'chirildi`),`success`),K()}catch(e){a(e.message,`error`)}}var q=1,fn=[],pn=[],mn=[];async function J(){let e=document.getElementById(`admin-content`);e.innerHTML=`<div class="loader"></div>`;try{let[e,t]=await Promise.all([o.get(`/admin/markets`),o.get(`/admin/districts`)]);mn=t||[],pn=e||[],hn(pn)}catch(t){e.innerHTML=`<p class="error">${c(`Xatolik`)}: `+t.message+`</p>`}}function hn(e){e&&(fn=e,q=1);let t=Math.ceil(fn.length/10);q>t&&(q=t||1);let n=(q-1)*10,r=fn.slice(n,n+10),i=document.getElementById(`admin-content`);i.innerHTML=`
        <div class="card" style="margin-top:20px">
            <div class="card-header">
              <div class="toolbar" style="width:100%">
                <div class="search-box">
                  <span class="search-icon">🔍</span>
                  <input type="text" placeholder="${c(`Qidirish...`)}" id="admin-market-search" value="${l(document.getElementById(`admin-market-search`)?.value||``)}" oninput="filterAdminMarkets(this.value)">
                </div>
                <button class="btn btn-primary btn-sm" onclick='openMarketModal(null, null, null, null, ${JSON.stringify(JSON.stringify(mn)).replace(/'/g,`&#39;`)})'>${c(`Qo'shish`)}</button>
              </div>
            </div>
            <div class="table-container">
                <table>
                    <thead><tr><th style="text-align:center">№</th><th style="text-align:center">${c(`Nomi`)}</th><th style="text-align:center">${c(`Manzil`)}</th><th style="text-align:center">${c(`Tuman`)}</th><th style="text-align:center">${c(`Amallar`)}</th></tr></thead>
                    <tbody>
                        ${r.length===0?`<tr><td colspan="6" style="text-align:center;color:var(--text-muted);">${c(`Ma'lumot yo'q`)}</td></tr>`:r.map((e,t)=>`
                            <tr>
                                <td style="text-align:center">${n+t+1}</td>
                                <td style="text-align:center">${l(e.name)}</td>
                                <td style="text-align:center">${l(e.address||`—`)}</td>
                                <td style="text-align:center">${l(e.districtName||``)}</td>
                                <td class="actions" style="justify-content:center">
                                    <button class="btn-icon" onclick='openMarketModal(${e.id}, "${l(e.name)}", "${l(e.address||``)}", ${e.districtId}, ${JSON.stringify(JSON.stringify(mn)).replace(/'/g,`&#39;`)})' title="${c(`Tahrirlash`)}">✏️</button>
                                    <button class="btn-icon danger" onclick="deleteMarket(${e.id})" title="${c(`O'chirish`)}">🗑️</button>
                                </td>
                            </tr>
                        `).join(``)}
                    </tbody>
                </table>
            </div>
        </div>
        ${renderPageControls(`adminMarketPage`,t,`renderAdminMarketsTable()`)}
    `}function gn(e){let t=e.toLowerCase(),n=pn.filter(e=>e.name&&e.name.toLowerCase().includes(t)||e.address&&e.address.toLowerCase().includes(t)||e.districtName&&e.districtName.toLowerCase().includes(t)),r=document.getElementById(`admin-market-search`),i=r?r.selectionStart:0;hn(n),setTimeout(()=>{let e=document.getElementById(`admin-market-search`);if(e){e.focus();try{e.setSelectionRange(i,i)}catch{}}},0)}function _n(e,t,n,r,i){let a=!!e,o=JSON.parse(i);openModal(c(a?`Bozorni tahrirlash`:`Yangi bozor`),`
        <form onsubmit="${a?`updateMarket(event, ${e})`:`createMarket(event)`}">
            <div class="form-group">
                <label>${c(`Nomi`)}</label>
                <input type="text" id="market-name" class="form-control" value="${t||``}" required>
            </div>
            <div class="form-group">
                <label>${c(`Manzil`)}</label>
                <input type="text" id="market-address" class="form-control" value="${n||``}">
            </div>
            <div class="form-group">
                <label>${c(`Tuman`)}</label>
                <select id="market-districtId" class="form-control" required>
                    <option value="">${c(`Tanlang...`)}</option>
                    ${o.map(e=>`<option value="${e.id}" ${e.id===r?`selected`:``}>${l(e.name)} (${l(e.regionName||``)})</option>`).join(``)}
                </select>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" onclick="closeModal()">${c(`Bekor qilish`)}</button>
                <button type="submit" class="btn btn-primary">${c(`Saqlash`)}</button>
            </div>
        </form>
    `)}async function vn(e){e.preventDefault();try{await o.post(`/admin/markets`,{name:document.getElementById(`market-name`).value,address:document.getElementById(`market-address`).value,districtId:parseInt(document.getElementById(`market-districtId`).value)}),a(c(`Bozor yaratildi`),`success`),closeModal(),J()}catch(e){a(e.message,`error`)}}async function yn(e,t){e.preventDefault();try{await o.put(`/admin/markets/`+t,{name:document.getElementById(`market-name`).value,address:document.getElementById(`market-address`).value,districtId:parseInt(document.getElementById(`market-districtId`).value)}),a(c(`Bozor yangilandi`),`success`),closeModal(),J()}catch(e){a(e.message,`error`)}}async function bn(e){if(confirm(c(`Bozorni o'chirishni xohlaysizmi?`)))try{await o.delete(`/admin/markets/`+e),a(c(`Bozor o'chirildi`),`success`),J()}catch(e){a(e.message,`error`)}}async function xn(){let e=document.getElementById(`admin-content`);e.innerHTML=`<div class="loader"></div>`;try{let[t,n]=await Promise.all([o.get(`/admin/marketplace/products`),o.get(`/admin/marketplace/categories`)]);e.innerHTML=`
            <!-- Categories Card -->
            <div class="card" style="margin-top:20px">
                <div class="card-header">
                    <h3>🛒 ${c(`Marketplace kategoriyalari`)}</h3>
                    <button class="btn btn-primary btn-sm" onclick="openMpCategoryModal()">${c(`Qo'shish`)}</button>
                </div>
                <div class="table-container">
                    <table>
                        <thead>
                            <tr><th style="text-align:center">№</th><th style="text-align:center">${c(`Nomi`)}</th><th style="text-align:center">${c(`Amallar`)}</th></tr></thead>
                        <tbody>
                            ${(n||[]).length===0?`<tr><td colspan="3" style="text-align:center">${c(`Ma'lumot yo'q`)}</td></tr>`:n.map(e=>`
                                <tr>
                                    <td style="text-align:center">${e.id}</td>
                                    <td style="text-align:center">${l(e.name)}</td>
                                    <td class="actions" style="justify-content: center;">
                                        <button class="btn-icon" onclick='openMpCategoryModal(${e.id}, "${l(e.name)}")'>✏️</button>
                                        <button class="btn-icon danger" onclick="deleteMpCategory(${e.id})">🗑️</button>
                                    </td>
                                </tr>
                            `).join(``)}
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Products Card -->
            <div class="card" style="margin-top:20px">
                <div class="card-header">
                    <h3>📦 ${c(`Marketplace mahsulotlari`)}</h3>
                    <button class="btn btn-primary btn-sm" onclick="openCreateMpProductModal()">${c(`Qo'shish`)}</button>
                </div>
                <div class="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th style="text-align:center">№</th>
                                <th style="text-align:center">${c(`Biznes`)}</th>
                                <th style="text-align:center">${c(`Nomi`)}</th>
                                <th style="text-align:center">${c(`Narxi`)}</th>
                                <th style="text-align:center">${c(`Soni`)}</th>
                                <th style="text-align:center">${c(`Holati`)}</th>
                                <th style="text-align:center">${c(`Amallar`)}</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${(t||[]).length===0?`<tr><td colspan="7" style="text-align:center">${c(`Ma'lumot yo'q`)}</td></tr>`:t.map(e=>`
                                <tr>
                                    <td style="text-align:center">${e.id}</td>
                                    <td>${l(e.businessName||`—`)}</td>
                                    <td style="text-align:center">${l(e.name)}</td>
                                    <td style="text-align:center">${e.price.toLocaleString()}</td>
                                    <td style="text-align:center">${e.quantity}</td>
                                    <td style="text-align:center"><span class="badge ${e.isVisible?`badge-success`:`badge-danger`}">${e.isVisible?c(`Ko'rinadi`):c(`Berkitilgan`)}</span></td>
                                    <td class="actions" style="justify-content:center">
                                        <button class="btn-icon" onclick="toggleMpProductVisibility(${e.id}, ${e.isVisible})">👁️</button>
                                        <button class="btn-icon danger" onclick="deleteMpProduct(${e.id})">🗑️</button>
                                    </td>
                                </tr>
                            `).join(``)}
                        </tbody>
                    </table>
                </div>
            </div>
        `}catch(t){e.innerHTML=`<p class="error">${c(`Xatolik`)}: ${t.message}</p>`}}function Sn(e,t){let n=!!e;openModal(c(n?`Kategoriyani tahrirlash`:`Yangi kategoriya`),`
        <form onsubmit="submitMpCategory(event, ${e||`null`})">
            <div class="form-group">
                <label>${c(`Kategoriya nomi`)}</label>
                <input type="text" id="mp-cat-name" class="form-control" value="${t||``}" required>
            </div>
            <div class="form-group">
                <label>${c(`Rasm`)}</label>
                <input type="file" id="mp-cat-image" class="form-control" accept="image/*">
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" onclick="closeModal()">${c(`Bekor qilish`)}</button>
                <button type="submit" class="btn btn-primary">${c(`Saqlash`)}</button>
            </div>
        </form>
    `)}async function Cn(e,t){e.preventDefault();let n=document.getElementById(`mp-cat-name`).value,r=document.getElementById(`mp-cat-image`).files[0];try{let e=``;if(r){let t=new FormData;t.append(`file`,r),e=(await o.post(`/upload`,t)).url}let i={name:n};e&&(i.image=e),t?(await o.put(`/admin/marketplace/categories/${t}`,i),a(c(`Yangilandi`),`success`)):(await o.post(`/admin/marketplace/categories`,i),a(c(`Yaratildi`),`success`)),closeModal(),window.currentPage===`mp-categories`?Mn():window.currentPage===`mp-products`?Y():Mt()}catch(e){a(e.message,`error`)}}async function wn(e){if(confirm(c(`O'chirishni xohlaysizmi?`)))try{await o.delete(`/admin/marketplace/categories/${e}`),a(c(`O'chirildi`),`success`),Mn()}catch(e){a(e.message,`error`)}}async function Tn(e,t){try{await o.put(`/admin/marketplace/products/${e}`,{isVisible:!t}),a(c(`Muvaffaqiyatli`),`success`),Y()}catch(e){a(e.message,`error`)}}async function En(e){if(confirm(c(`O'chirishni xohlaysizmi?`)))try{await o.delete(`/admin/marketplace/products/${e}`),a(c(`O'chirildi`),`success`),Y()}catch(e){a(e.message,`error`)}}async function Dn(){openModal(c(`Marketplace'ga mahsulot qo'shish`),`
        <div id="mp-create-step1">
            <div class="form-group">
                <label>${c(`Biznesni tanlang`)}</label>
                <select id="mp-biz-id" class="form-control" onchange="loadMpCategories(this.value)">
                    <option value="">${c(`Tanlang...`)}</option>
                </select>
            </div>
            <div class="form-group" id="mp-cat-container" style="display:none">
                <label>${c(`Marketplace Kategoriyasi`)}</label>
                <select id="mp-category-id" class="form-control" onchange="showMpForm()">
                    <option value="">${c(`Tanlang...`)}</option>
                </select>
            </div>
            <form id="mp-prod-form" style="display:none" onsubmit="submitMpProduct(event)">
                <div class="form-group">
                    <label>${c(`Marketplace Nomi`)}</label>
                    <input type="text" id="mp-name" class="form-control" required placeholder="${c(`Masalan`)}: Samsung Galaxy S24">
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>${c(`Narxi`)}</label>
                        <input type="number" id="mp-price" class="form-control" required placeholder="0">
                    </div>
                    <div class="form-group">
                        <label>${c(`Soni`)}</label>
                        <input type="number" id="mp-qty" class="form-control" required placeholder="1">
                    </div>
                </div>
                <div class="form-group">
                    <label>${c(`Qisqa tavsif`)}</label>
                    <input type="text" id="mp-short-desc" class="form-control" placeholder="${c(`Mahsulot haqida qisqacha...`)}">
                </div>
                <div class="form-group">
                    <label>${c(`Rasm`)}</label>
                    <input type="file" id="mp-image" class="form-control" accept="image/*">
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" onclick="closeModal()">${c(`Bekor qilish`)}</button>
                    <button type="submit" class="btn btn-primary">${c(`Qo'shish`)}</button>
                </div>
            </form>
        </div>
    `);try{let e=o.getUser(),t=e&&e.role===2?`/businesses`:`/businesses/my`,n=await o.get(t),r=document.getElementById(`mp-biz-id`);n.forEach(e=>{let t=document.createElement(`option`);t.value=e.id,t.textContent=e.name,r.appendChild(t)})}catch(e){a(e.message,`error`)}}async function On(e){if(e)try{let e=await o.get(`/marketplace/categories`),t=document.getElementById(`mp-category-id`);t.innerHTML=`<option value="">${c(`Tanlang...`)}</option>`,(e||[]).forEach(e=>{let n=document.createElement(`option`);n.value=e.id,n.textContent=e.name,t.appendChild(n)}),document.getElementById(`mp-cat-container`).style.display=`block`,document.getElementById(`mp-prod-form`).style.display=`none`}catch(e){a(e.message,`error`)}}function kn(){document.getElementById(`mp-category-id`).value&&(document.getElementById(`mp-prod-form`).style.display=`block`)}async function An(e){e.preventDefault();let t=document.getElementById(`mp-image`).files[0];try{let e=``;if(t){let n=new FormData;n.append(`file`,t),e=(await o.post(`/upload`,n)).url}let n={businessId:document.getElementById(`mp-biz-id`).value?parseInt(document.getElementById(`mp-biz-id`).value):null,marketplaceCategoryId:document.getElementById(`mp-category-id`).value?parseInt(document.getElementById(`mp-category-id`).value):null,name:document.getElementById(`mp-name`).value,price:parseFloat(document.getElementById(`mp-price`).value),quantity:parseInt(document.getElementById(`mp-qty`).value),shortDescription:document.getElementById(`mp-short-desc`).value,images:e};await o.post(`/admin/marketplace/products`,n),a(c(`Qo'shildi`),`success`),closeModal(),Y()}catch(e){a(e.message,`error`)}}async function jn(){let e=document.getElementById(`page-content`);e.innerHTML=`<div class="loader"></div>`;try{let[t,n]=await Promise.all([o.get(`/admin/marketplace/products`),o.get(`/admin/marketplace/categories`)]),r=(t||[]).length,i=(n||[]).length,a=(t||[]).filter(e=>e.isVisible).length,s=(t||[]).reduce((e,t)=>e+t.quantity,0);e.innerHTML=`
            <div class="stats-grid" style="display:grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap:20px; margin-bottom:30px;">
                <div class="stat-card" style="background:var(--bg-glass); padding:24px; border-radius:20px; border:1px solid var(--border); box-shadow:var(--shadow-sm);">
                    <div style="font-size:14px; color:var(--text-muted); margin-bottom:8px;">${c(`Jami mahsulotlar`)}</div>
                    <div style="font-size:32px; font-weight:800; color:var(--primary);">${r}</div>
                </div>
                <div class="stat-card" style="background:var(--bg-glass); padding:24px; border-radius:20px; border:1px solid var(--border); box-shadow:var(--shadow-sm);">
                    <div style="font-size:14px; color:var(--text-muted); margin-bottom:8px;">${c(`Faol mahsulotlar`)}</div>
                    <div style="font-size:32px; font-weight:800; color:#10b981;">${a}</div>
                </div>
                <div class="stat-card" style="background:var(--bg-glass); padding:24px; border-radius:20px; border:1px solid var(--border); box-shadow:var(--shadow-sm);">
                    <div style="font-size:14px; color:var(--text-muted); margin-bottom:8px;">${c(`Kategoriyalar soni`)}</div>
                    <div style="font-size:32px; font-weight:800; color:var(--warning);">${i}</div>
                </div>
                <div class="stat-card" style="background:var(--bg-glass); padding:24px; border-radius:20px; border:1px solid var(--border); box-shadow:var(--shadow-sm);">
                    <div style="font-size:14px; color:var(--text-muted); margin-bottom:8px;">${c(`Jami qoldiq`)}</div>
                    <div style="font-size:32px; font-weight:800; color:var(--text-primary);">${s}</div>
                </div>
            </div>
            
            <div class="card">
                <div class="card-header">
                    <h3>📊 ${c(`Marketplace tahlili`)}</h3>
                </div>
                <div style="padding:40px; text-align:center; color:var(--text-muted);">
                    <div style="font-size:48px; margin-bottom:20px;">📈</div>
                    <p>${c(`Batafsil grafiklar va hisobotlar tez kunda qo'shiladi.`)}</p>
                </div>
            </div>
        `}catch(t){e.innerHTML=`<p class="error">${t.message}</p>`}}async function Mn(){let e=document.getElementById(`page-content`);e.innerHTML=`<div class="loader"></div>`;try{Lt=await o.get(`/admin/marketplace/categories`)||[],B=1,Nn(Lt)}catch(t){e.innerHTML=`<p class="error">${t.message}</p>`}}function Nn(e){let t=document.getElementById(`page-content`),n=Math.ceil(e.length/10);B>n&&(B=n||1);let r=(B-1)*10,i=e.slice(r,r+10);t.innerHTML=`
        <div class="card">
            <div class="card-header">
                <h3 style="margin:0;">📁 ${c(`Marketplace Kategoriyalari`)}</h3>
                <div style="display:flex; gap:10px;">
                    <button class="btn btn-primary btn-sm" onclick="openMpCategoryModal()">${c(`Qo'shish`)}</button>
                </div>
            </div>
            
            <div class="search-container" style="padding:15px 24px;">
                <div class="search-wrapper">
                    <i data-lucide="search" class="search-icon"></i>
                    <input type="text" id="mp-category-search" class="form-control search-input" 
                        placeholder="${c(`Qidirish...`)}" oninput="filterMpCategories(this.value)">
                </div>
            </div>

            <div class="table-container">
                <table class="premium-table">
                    <thead>
                        <tr>
                            <th style="text-align:center">№</th>
                            <th style="text-align:center">${c(`Nomi`)}</th>
                            <th style="text-align:center">${c(`Amallar`)}</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${e.length===0?`<tr><td colspan="3" style="text-align:center; padding:40px; color:var(--text-muted);">${c(`Ma'lumot yo'q`)}</td></tr>`:i.map((e,t)=>`
                            <tr>
                                <td style="text-align:center; font-weight:600;">${r+t+1}</td>
                                <td style="text-align:center">${l(e.name)}</td>
                                <td class="actions" style="justify-content: center;">
                                    <button class="btn-icon" onclick='openMpCategoryModal(${e.id}, "${l(e.name)}")' title="${c(`Tahrirlash`)}">✏️</button>
                                    <button class="btn-icon danger" onclick="deleteMpCategory(${e.id})" title="${c(`O'chirish`)}">🗑️</button>
                                </td>
                            </tr>
                        `).join(``)}
                    </tbody>
                </table>
            </div>
            ${renderPageControls(`mpCategoryPage`,n,`renderMpCategoriesTable(allMpCategoriesList)`)}
        </div>
    `,lucide.createIcons()}function Pn(e){let t=e.toLowerCase(),n=Lt.filter(e=>e.name.toLowerCase().includes(t));B=1,Nn(n),setTimeout(()=>{let t=document.getElementById(`mp-category-search`);t&&(t.focus(),t.value=e)},0)}async function Y(){let e=document.getElementById(`page-content`);e.innerHTML=`<div class="loader"></div>`;try{Rt=await o.get(`/admin/marketplace/products`)||[],V=1,Fn(Rt)}catch(t){e.innerHTML=`<p class="error">${t.message}</p>`}}function Fn(e){let t=document.getElementById(`page-content`),n=Math.ceil(e.length/10);V>n&&(V=n||1);let r=(V-1)*10,i=e.slice(r,r+10);t.innerHTML=`
        <div class="card">
            <div class="card-header">
                <h3 style="margin:0;">📦 ${c(`Marketplace mahsulotlari`)}</h3>
                <button class="btn btn-primary btn-sm" onclick="openCreateMpProductModal()">${c(`Qo'shish`)}</button>
            </div>

            <div class="search-container" style="padding:15px 24px;">
                <div class="search-wrapper">
                    <i data-lucide="search" class="search-icon"></i>
                    <input type="text" id="mp-product-search" class="form-control search-input" 
                        placeholder="${c(`Qidirish...`)}" oninput="filterMpProducts(this.value)">
                </div>
            </div>

            <div class="table-container">
                <table class="premium-table">
                    <thead>
                        <tr>
                            <th style="text-align:center">№</th>
                            <th style="text-align:center">${c(`Biznes`)}</th>
                            <th style="text-align:center">${c(`Mahsulot`)}</th>
                            <th style="text-align:center">${c(`Narxi`)}</th>
                            <th style="text-align:center">${c(`Qoldiq`)}</th>
                            <th style="text-align:center">${c(`Holati`)}</th>
                            <th style="text-align:center">${c(`Amallar`)}</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${e.length===0?`<tr><td colspan="7" style="text-align:center; padding:40px; color:var(--text-muted);">${c(`Mahsulotlar yo'q`)}</td></tr>`:i.map((e,t)=>`
                            <tr>
                                <td style="text-align:center; font-weight:600;">${r+t+1}</td>
                                <td>
                                    <div style="font-weight:600; font-size:14px;">${l(e.businessName||`—`)}</div>
                                </td>
                                <td>
                                    <div style="font-weight:600; color:var(--primary);">${l(e.name)}</div>
                                    <div style="font-size:11px; color:var(--text-muted);">${l(e.shortDescription||``)}</div>
                                </td>
                                <td style="text-align:center; font-weight:700;">${e.price.toLocaleString()} UZS</td>
                                <td style="text-align:center;">
                                   <span style="background:var(--bg-glass); padding:2px 8px; border-radius:12px; font-weight:700;">${e.quantity}</span>
                                </td>
                                <td style="text-align:center">
                                    <span class="badge ${e.isVisible?`badge-success`:`badge-danger`}" style="cursor:pointer" onclick="toggleMpProductVisibility(${e.id}, ${e.isVisible})">
                                        ${e.isVisible?c(`Faol`):c(`Yopiq`)}
                                    </span>
                                </td>
                                <td class="actions" style="justify-content:center">
                                    <button class="btn-icon" onclick="toggleMpProductVisibility(${e.id}, ${e.isVisible})" title="${e.isVisible?c(`Yashirish`):c(`Ko'rsatish`)}">${e.isVisible?`👁️`:`🚫`}</button>
                                    <button class="btn-icon danger" onclick="deleteMpProduct(${e.id})" title="${c(`O'chirish`)}">🗑️</button>
                                </td>
                            </tr>
                        `).join(``)}
                    </tbody>
                </table>
            </div>
            ${renderPageControls(`mpProductPage`,n,`renderMpProductsTable(allMpProductsList)`)}
        </div>
    `,lucide.createIcons()}function In(e){let t=e.toLowerCase(),n=Rt.filter(e=>e.name.toLowerCase().includes(t)||e.businessName&&e.businessName.toLowerCase().includes(t)||e.shortDescription&&e.shortDescription.toLowerCase().includes(t));V=1,Fn(n),setTimeout(()=>{let t=document.getElementById(`mp-product-search`);t&&(t.focus(),t.value=e)},0)}async function Ln(){let e=document.getElementById(`page-content`);e.innerHTML=`<div class="loader"></div>`;try{zt=[],H=1,Rn(zt)}catch(t){e.innerHTML=`<p class="error">${t.message}</p>`}}function Rn(e){let t=document.getElementById(`page-content`),n=Math.ceil(e.length/10);H>n&&(H=n||1);let r=(H-1)*10,i=e.slice(r,r+10);t.innerHTML=`
        <div class="card">
            <div class="card-header">
                <h3 style="margin:0;">💰 ${c(`Marketplace sotuvlari`)}</h3>
            </div>

            <div class="search-container" style="padding:15px 24px;">
                <div class="search-wrapper">
                    <i data-lucide="search" class="search-icon"></i>
                    <input type="text" id="mp-sales-search" class="form-control search-input" 
                        placeholder="${c(`Qidirish...`)}" oninput="filterMpSales(this.value)">
                </div>
            </div>

            <div class="table-container">
                <table class="premium-table">
                    <thead>
                        <tr>
                            <th style="text-align:center">№</th>
                            <th style="text-align:center">${c(`Sana`)}</th>
                            <th style="text-align:center">${c(`Mijoz`)}</th>
                            <th style="text-align:center">${c(`Mahsulot`)}</th>
                            <th style="text-align:center">${c(`Summa`)}</th>
                            <th style="text-align:center">${c(`Holati`)}</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${e.length===0?`
                            <tr>
                                <td colspan="6" style="text-align:center; padding:100px; color:var(--text-muted);">
                                    <div style="font-size:48px; margin-bottom:15px;">📦</div>
                                    <h4>${c(`Hozircha sotuvlar yo'q`)}</h4>
                                    <p>${c(`Marketplace orqali buyurtmalar kelib tushganda bu erda paydo bo'ladi.`)}</p>
                                </td>
                            </tr>
                        `:i.map((e,t)=>`
                            <tr>
                                <td style="text-align:center; font-weight:600;">${r+t+1}</td>
                                <td style="text-align:center">${formatDateTime(e.createdAt)}</td>
                                <td>${l(e.customerName)}</td>
                                <td>${l(e.productNames)}</td>
                                <td style="text-align:center; font-weight:700;">${e.total.toLocaleString()} UZS</td>
                                <td style="text-align:center">
                                    <span class="badge badge-info">${c(e.status||`Kutilmoqda`)}</span>
                                </td>
                            </tr>
                        `).join(``)}
                    </tbody>
                </table>
            </div>
            ${renderPageControls(`mpSalesPage`,n,`renderMpSalesTable(allMpSalesList)`)}
        </div>
    `,lucide.createIcons()}function zn(e){let t=e.toLowerCase(),n=zt.filter(e=>e.customerName&&e.customerName.toLowerCase().includes(t)||e.productNames&&e.productNames.toLowerCase().includes(t));H=1,Rn(n),setTimeout(()=>{let t=document.getElementById(`mp-sales-search`);t&&(t.focus(),t.value=e)},0)}window.renderMpStats=jn,window.renderMpCategories=Mn,window.renderMpProducts=Y,window.renderMpSales=Ln,window.renderMpSalesTable=Rn,window.filterMpSales=zn,window.renderMpCategoriesTable=Nn,window.filterMpCategories=Pn,window.renderMpProductsTable=Fn,window.filterMpProducts=In,Object.defineProperty(window,`mpCategoryPage`,{get:()=>B,set:e=>B=e}),Object.defineProperty(window,`mpProductPage`,{get:()=>V,set:e=>V=e}),Object.defineProperty(window,`mpSalesPage`,{get:()=>H,set:e=>H=e}),window.renderAdmin=Mt,window.activeAdminTab=jt,window.showAdminTab=Nt,window.loadAdminMarketplace=xn,window.openMpCategoryModal=Sn,window.submitMpCategory=Cn,window.deleteMpCategory=wn,window.openCreateMpProductModal=Dn,window.loadMpCategories=On,window.showMpForm=kn,window.submitMpProduct=An,window.toggleMpProductVisibility=Tn,window.deleteMpProduct=En,window.openEditUserModal=Wt,window.saveAdminUser=Gt,window.deleteAdminUser=qt,window.renderAdminUsersTable=Bt,window.filterAdminUsers=Vt,window.openCreateUserModal=Ht,window.createAdminUser=Ut,window.previewAdminBrandImage=Kt,Object.defineProperty(window,`adminUserPage`,{get:()=>z,set:e=>z=e}),Object.defineProperty(window,`adminRegionPage`,{get:()=>U,set:e=>U=e}),Object.defineProperty(window,`adminDistrictPage`,{get:()=>G,set:e=>G=e}),Object.defineProperty(window,`adminMarketPage`,{get:()=>q,set:e=>q=e}),window.loadAdminRegions=W,window.renderAdminRegionsTable=Xt,window.filterAdminRegions=Zt,window.openRegionModal=Qt,window.createRegion=$t,window.updateRegion=en,window.deleteRegion=tn,window.loadAdminDistricts=K,window.renderAdminDistrictsTable=on,window.filterAdminDistricts=sn,window.openDistrictModal=cn,window.createDistrict=ln,window.updateDistrict=un,window.deleteDistrict=dn,window.loadAdminMarkets=J,window.renderAdminMarketsTable=hn,window.filterAdminMarkets=gn,window.openMarketModal=_n,window.createMarket=vn,window.updateMarket=yn,window.deleteMarket=bn,(function(){o.getToken()||(window.location.href=`index.html`)})();var Bn=`dashboard`,Vn=[],Hn=[],X=`line`,Un=null;document.addEventListener(`DOMContentLoaded`,()=>{Wn(),Gn(),Z(`dashboard`);let e=e=>{let t=e.target;(t.tagName===`INPUT`||t.tagName===`TEXTAREA`)&&(t.closest(`#modal-overlay`)||t.closest(`.modal`))&&setTimeout(()=>{try{typeof t.select==`function`&&t.select()}catch{}},10)};document.addEventListener(`focusin`,e),document.addEventListener(`click`,t=>{(t.target.tagName===`INPUT`||t.target.tagName===`TEXTAREA`)&&e(t)}),document.addEventListener(`keydown`,e=>{let t=e.target;t.tagName===`INPUT`&&t.closest(`#modal-overlay`)&&(t.dataset.origPlaceholder||(t.dataset.origPlaceholder=t.placeholder),t.placeholder&&e.key&&e.key.length===1&&(t.placeholder=``))}),document.addEventListener(`input`,e=>{let t=e.target;t.tagName===`INPUT`&&t.closest(`#modal-overlay`)&&(t.value.length===0&&t.dataset.origPlaceholder?t.placeholder=t.dataset.origPlaceholder:t.placeholder=``)})});function Wn(){let e=o.getUser();if(e&&(document.getElementById(`user-name`).textContent=`${e.firstName} ${e.lastName}`,document.getElementById(`user-avatar`).textContent=(e.firstName||`U`)[0].toUpperCase(),e.role>=1&&document.querySelectorAll(`.mp-only`).forEach(e=>e.style.display=``),e.role>=1&&document.querySelectorAll(`.owner-only`).forEach(e=>e.style.display=``),e.role===2&&document.querySelectorAll(`.admin-only`).forEach(e=>e.style.display=``),e.role>=1)){let t=document.querySelector(`.sidebar-logo .brand-name`);if(t&&(t.textContent=e.brandName||`SavdoSklad`),document.title=`${e.brandName||`SavdoSklad`} — Biznes Boshqaruv Tizimi`,e.brandImage){let t=document.querySelector(`.sidebar-logo .brand-logo-wrapper`);t&&(t.innerHTML=`<img src="${e.brandImage}" style="width:100%; height:100%; object-fit:cover; border-radius:8px;">`)}}}async function Gn(){try{let e=await o.get(`/businesses/my`),n=document.getElementById(`business-selector`);if(!n)return;if(n.innerHTML=`<option value="">${c(`Biznes tanlang`)}</option>`,e&&e.length>0){e.forEach(e=>{let t=document.createElement(`option`);t.value=e.id,t.textContent=e.name||`Biznes #${e.id}`,n.appendChild(t)});let r=u();r&&e.find(e=>e.id===r)?n.value=r:(n.value=e[0].id,t(e[0].id))}else t(0);Z(Bn)}catch(e){a(e.message,`error`)}}function Kn(e){t(e),Z(Bn)}function Z(e){Bn=e,window.currentPage=e,document.querySelectorAll(`.nav-item`).forEach(t=>{t.classList.toggle(`active`,t.dataset.page===e)});let t={dashboard:`Bosh sahifa`,businesses:`Bizneslar`,categories:`Kategoriyalar`,products:`Mahsulotlar`,transactions:`Sotuvlar`,refunds:`Qaytarishlar`,clients:`Mijozlar`,expenses:`Xarajatlar`,calculations:`Hisobotlar`,admin:`Admin panel`,profile:`Shaxsiy kabinet`,"mp-stats":`Marketplace: Statistika`,"mp-categories":`Marketplace: Kategoriyalar`,"mp-products":`Marketplace: Mahsulotlar`,"mp-sales":`Marketplace: Sotilgan tovarlar`};document.getElementById(`page-title`).textContent=c(t[e]||e),document.title=`SavdoSklad — ${c(t[e]||e)}`;let n=document.getElementById(`topbar-page-title-center`);n&&(n.textContent=c(t[e]||e));let r=document.getElementById(`topbar-date`);if(r){let e=new Date,t=e.getDate(),n=e.getMonth(),i=e.getFullYear(),a=e.getDay();r.textContent=`${t} ${c([`Yanvar`,`Fevral`,`Mart`,`Aprel`,`May`,`Iyun`,`Iyul`,`Avgust`,`Sentabr`,`Oktabr`,`Noyabr`,`Dekabr`][n])} ${i}, ${c([`Yakshanba`,`Dushanba`,`Seshanba`,`Chorshanba`,`Payshanba`,`Juma`,`Shanba`][a])}`}let i=document.getElementById(`page-content`);switch(i.innerHTML=`<div class="loader"><div class="spinner"></div></div>`,i.className=`content fade-in`,e){case`dashboard`:qn();break;case`businesses`:renderBusinesses();break;case`categories`:renderCategories();break;case`products`:renderProducts();break;case`transactions`:renderTransactions();break;case`refunds`:renderRefunds();break;case`clients`:renderClients();break;case`expenses`:renderExpenses();break;case`calculations`:renderCalculations();break;case`admin`:renderAdmin();break;case`profile`:tr();break;case`mp-stats`:renderMpStats();break;case`mp-categories`:renderMpCategories();break;case`mp-products`:renderMpProducts();break;case`mp-sales`:renderMpSales();break;default:i.innerHTML=`<div class="empty-state"><h4>${c(`Sahifa topilmadi`)}</h4></div>`}}async function qn(){let e=u(),t=document.getElementById(`page-content`);if(!e){t.innerHTML=`
      <div class="empty-state">
        <div class="icon">🏢</div>
        <h4>${c(`Biznes tanlang`)}</h4>
        <p>${c(`Yuqoridagi ro'yxatdan biznesingizni tanlang yoki yangi biznes yarating.`)}</p>
        <br>
        <button class="btn btn-primary" onclick="navigateTo('businesses')">${c(`Biznes yaratish`)}</button>
      </div>`;return}try{let[n,r,i]=await Promise.all([o.get(`/products?businessId=${e}`).catch(()=>[]),o.get(`/transactions?businessId=${e}`).catch(()=>[]),o.get(`/clients?businessId=${e}`).catch(()=>[])]),a=(n||[]).filter(e=>!e.isDeleted),l=(r||[]).sort((e,t)=>new Date(t.createdAt)-new Date(e.createdAt)),u=i||[],d=new Date,f=d.toISOString().split(`T`)[0],p=d.getMonth(),m=d.getFullYear(),h=l.filter(e=>{let t=new Date(e.createdAt);return t.getMonth()===p&&t.getFullYear()===m}).reduce((e,t)=>e+(t.total||0),0),g=p===0?11:p-1,ee=p===0?m-1:m,_=l.filter(e=>{let t=new Date(e.createdAt);return t.getMonth()===g&&t.getFullYear()===ee}).reduce((e,t)=>e+(t.total||0),0),v=0,y=`none`;_>0?(v=(h-_)/_*100,y=v>=0?`up`:`down`):h>0&&(y=`up`,v=100);let te=a.filter(e=>e.quantity<=5).length,ne=a.length>0?Math.min(100,Math.round(a.filter(e=>e.quantity>0).length/a.length*100)):0,re=l.filter(e=>e.createdAt.startsWith(f)).length,ie=u.filter(e=>{let t=new Date(e.createdAt);return t.getMonth()===p&&t.getFullYear()===m}).length,b=`${c([`Yanvar`,`Fevral`,`Mart`,`Aprel`,`May`,`Iyun`,`Iyul`,`Avgust`,`Sentabr`,`Oktabr`,`Noyabr`,`Dekabr`][p])}, ${m}`;t.innerHTML=`
      <div class="stats-grid fade-in">
        <div class="stat-card">
          <div class="card-header">
            <span class="stat-label">${c(`Jami savdo`)}</span>
            <div class="btn-icon" style="background:var(--success-bg); color:var(--success);"><i data-lucide="trending-up"></i></div>
          </div>
          <div class="stat-value" style="font-size:28px; font-family:'Outfit'; font-weight:800; color:#fff;">${s(h)}</div>
          <div style="display:flex; justify-content:space-between; align-items:flex-end; margin-top:8px;">
            <div class="stat-trend" style="color:var(--text-muted); font-size:12px; font-weight:400;">
              ${b}
            </div>
            ${y===`none`?``:`
              <div style="text-align:right;">
                <div style="font-size:16px; font-weight:800; color:${y===`up`?`var(--success)`:`var(--danger)`}; display:flex; align-items:center; justify-content:flex-end; gap:2px;">
                  ${y===`up`?`↑`:`↓`} ${Math.abs(Math.round(v))}%
                </div>
                <div style="font-size:10px; color:var(--text-muted); font-weight:400;">${c(`o'tgan oyga nisbatan`)}</div>
              </div>
            `}
          </div>
        </div>

        <div class="stat-card">
          <div class="card-header">
            <span class="stat-label">${c(`Buyurtmalar`)}</span>
            <div class="btn-icon" style="background:var(--secondary-glow); color:var(--secondary);"><i data-lucide="shopping-bag"></i></div>
          </div>
          <div class="stat-value" style="font-size:28px; font-family:'Outfit'; font-weight:800; color:#fff;">${l.length}</div>
          <div class="stat-trend" style="color:var(--success); font-size:12px; margin-top:8px;">
            ↑ ${re} <span style="color:var(--text-muted); font-weight:400;">${c(`bugun`)}</span>
          </div>
        </div>

        <div class="stat-card">
          <div class="card-header">
            <span class="stat-label">${c(`Faol mijozlar`)}</span>
            <div class="btn-icon" style="background:var(--info-bg); color:var(--info);"><i data-lucide="users"></i></div>
          </div>
          <div class="stat-value" style="font-size:28px; font-family:'Outfit'; font-weight:800; color:#fff;">${u.length}</div>
          <div class="stat-trend" style="color:var(--success); font-size:12px; margin-top:8px;">
            <span style="color:#fff;">+${ie}</span> <span style="color:var(--text-muted); font-weight:400;">${c(`shu oyda qo'shilgan`)}</span>
          </div>
        </div>

        <div class="stat-card">
          <div class="card-header">
            <span class="stat-label">${c(`Ombor holati`)}</span>
            <div class="btn-icon" style="background:var(--warning-bg); color:var(--warning);"><i data-lucide="package"></i></div>
          </div>
          <div class="stat-value" style="font-size:28px; font-family:'Outfit'; font-weight:800; color:#fff;">${ne}%</div>
          <div class="stat-trend" style="color:var(--danger); font-size:12px; margin-top:8px;">
            ${te} <span style="color:var(--text-muted); font-weight:400;">${c(`ta mahsulot kam`)}</span>
          </div>
        </div>
      </div>

      <div class="dashboard-main-grid fade-in" style="display:grid; grid-template-columns: 2fr 1fr; gap:20px; margin-top:20px;">
        <div class="card" style="padding:24px;">
          <div class="card-header">
            <h3 style="font-family:'Outfit'; font-size:18px;">${c(`Oylik savdo ko'rsatkichi`)}</h3>
            <div style="display:flex; gap:10px;">
                <button class="btn-icon" style="width:30px; height:30px;" onclick="maximizeTrendChart()"><i data-lucide="maximize-2"></i></button>
                <button class="btn-icon" style="width:30px; height:30px;" onclick="openTrendChartSettings()"><i data-lucide="settings"></i></button>
            </div>
          </div>
          <div style="height:350px;">
            <canvas id="salesTrendChart"></canvas>
          </div>
        </div>

        <div class="card" style="padding:24px;">
          <div class="card-header">
            <h3 style="font-family:'Outfit'; font-size:18px;">${c(`Savdo manbalari`)}</h3>
          </div>
          <div style="height:250px; margin-bottom:20px;">
             <canvas id="salesSourceChart"></canvas>
          </div>
          <div id="sales-sources-legend" style="display:grid; grid-template-columns: 1fr 1fr; gap:10px;"></div>
        </div>
      </div>

      <div class="dashboard-bottom-grid fade-in" style="display:grid; grid-template-columns: 2fr 1fr; gap:20px; margin-top:20px;">
        <div class="card" style="padding:0; overflow:hidden;">
           <div class="card-header" style="padding:24px;">
              <h3 style="font-family:'Outfit'; font-size:18px;">${c(`Ombor holati`)}</h3>
              <button class="btn btn-ghost btn-sm" onclick="navigateTo('products')">${c(`Hammasini ko'rish`)}</button>
           </div>
           <div id="dashboard-inventory-container" style="padding:0 24px 24px 24px;"></div>
        </div>

        <div class="card" style="padding:24px;">
           <div class="card-header">
              <h3 style="font-family:'Outfit'; font-size:18px;">${c(`Top mahsulotlar`)}</h3>
           </div>
           <div id="top-products-list" style="display:flex; flex-direction:column; gap:16px;"></div>
        </div>
      </div>

      <!-- Recent Transactions Section -->
      <div class="card" style="padding:0; overflow:hidden; margin-top:20px;">
         <div class="card-header" style="padding:24px;">
            <h3 style="font-family:'Outfit'; font-size:18px;">${c(`So'nggi buyurtmalar`)}</h3>
            <button class="btn btn-primary btn-sm" onclick="openSaleModal()">${c(`Yangi sotuv`)}</button>
         </div>
         <div id="dashboard-transactions-container"></div>
      </div>`,Zn=l,dashboardPage=1,Jn(a.slice(0,5)),Yn(a.slice(0,5)),Qn(),Vn=l,Hn=a,setTimeout(()=>{lucide.createIcons(),Xn(Vn,Hn)},100)}catch(e){console.error(e),t.innerHTML=`<div class="empty-state"><h4>${c(`Xatolik`)}</h4><p>${l(e.message)}</p></div>`}}function Jn(e){let t=document.getElementById(`dashboard-inventory-container`);if(!t)return;let n={};e.forEach(e=>{let t=e.categoryName||c(`Boshqa`);n[t]||(n[t]=[]),n[t].push(e)});let r=``;for(let e in n)r+=`
      <tr style="background:rgba(99, 102, 241, 0.05);">
        <td colspan="4" style="padding:10px 16px; font-weight:700; color:var(--accent); font-size:11px; text-transform:uppercase; letter-spacing:1px; border-bottom:1px solid var(--border);">
           <div style="display:flex; align-items:center; gap:8px;">
             <i data-lucide="layers" style="width:14px;"></i>
             ${l(e)}
           </div>
        </td>
      </tr>
    `,r+=n[e].map(e=>`
      <tr>
        <td>
          <div style="display:flex; align-items:center; gap:12px; padding-left:8px;">
              <div style="width:32px; height:32px; background:rgba(255,255,255,0.03); border:1px solid var(--border); border-radius:8px; display:flex; align-items:center; justify-content:center; color:var(--text-muted);">
                  <i data-lucide="${e.name?.toLowerCase().includes(`soat`)?`watch`:`package`}" style="width:16px;"></i>
              </div>
              <div style="font-weight:600; color:var(--text-primary); font-size:13px;">${l(e.name)}</div>
          </div>
        </td>
        <td style="color:var(--text-primary); text-align:center; font-weight:700;">${e.quantity}</td>
        <td>
          <div style="display:flex; align-items:center; gap:12px; justify-content:center;">
             <div style="width:80px; height:6px; background:rgba(255,255,255,0.05); border-radius:10px; overflow:hidden;">
                <div style="width:${Math.min(100,e.quantity/50*100)}%; height:100%; background:linear-gradient(to right, ${e.quantity<10?`var(--danger)`:`var(--accent)`}, var(--accent-hover)); border-radius:10px;"></div>
             </div>
          </div>
        </td>
        <td>
          <div style="display:flex; justify-content:center;">
            <div style="width:8px; height:8px; border-radius:50%; background:${e.quantity>0?`var(--success)`:`var(--danger)`}; box-shadow:0 0 10px ${e.quantity>0?`var(--success)`:`var(--danger)`}"></div>
          </div>
        </td>
      </tr>
    `).join(``);t.innerHTML=`
      <table class="premium-table">
        <thead>
          <tr>
            <th style="text-align:center">${c(`Nomi`)}</th>
            <th style="text-align:center">${c(`Qoldiq`)}</th>
            <th style="text-align:center">${c(`Prognoz`)}</th>
            <th style="text-align:center">${c(`Holat`)}</th>
          </tr>
        </thead>
        <tbody>
          ${r}
        </tbody>
      </table>
    `}function Yn(e){let t=document.getElementById(`top-products-list`);if(!t)return;let n=[`#3b82f6`,`#10b981`,`#f59e0b`,`#ef4444`,`#ec4899`];t.innerHTML=e.map((e,t)=>`
        <div style="display:flex; align-items:center; gap:12px;">
            <div style="width:44px; height:44px; border-radius:14px; background:rgba(255,255,255,0.03); border:1px solid var(--border); display:flex; align-items:center; justify-content:center; color:${n[t%5]}; transition:all 0.3s;" class="product-icon-hover">
                <i data-lucide="${e.name?.toLowerCase().includes(`soat`)?`watch`:e.name?.toLowerCase().includes(`telefon`)?`smartphone`:[`shopping-bag`,`package`,`truck`][t%3]}" style="width:22px;"></i>
            </div>
            <div style="flex:1;">
                <div style="font-weight:700; color:var(--text-primary); font-size:14px;">${l(e.name)}</div>
                <div style="font-size:12px; color:var(--text-secondary);">${s(e.price||0)} ${c(`so'm`)}</div>
            </div>
            <div style="text-align:right;">
                <div style="width:50px; height:20px;">
                    <canvas id="mini-sparkline-${t}" style="width:100%; height:100%;"></canvas>
                </div>
            </div>
        </div>
    `).join(``),setTimeout(()=>{e.forEach((e,t)=>{let r=document.getElementById(`mini-sparkline-${t}`)?.getContext(`2d`);r&&new Chart(r,{type:`line`,data:{labels:[1,2,3,4,5],datasets:[{data:[10,15,12,18,14],borderColor:n[t%5],borderWidth:2,pointRadius:0,fill:!1,tension:.4}]},options:{plugins:{legend:{display:!1}},scales:{x:{display:!1},y:{display:!1}},maintainAspectRatio:!1}})})},100)}function Xn(e,t){let n=document.getElementById(`salesTrendChart`)?.getContext(`2d`);if(n){let e=[c(`Dush`),c(`Sesh`),c(`Chor`),c(`Pay`),c(`Jum`),c(`Shan`),c(`Yak`)],t=[12,19,15,25,22,30,20],r=n.createLinearGradient(0,0,0,400);r.addColorStop(0,`rgba(16, 185, 129, 0.4)`),r.addColorStop(1,`rgba(16, 185, 129, 0)`),Un&&Un.destroy(),Un=new Chart(n,{type:X,data:{labels:e,datasets:[{label:c(`Savdo hajmi`),data:t,borderColor:`#10b981`,borderWidth:4,fill:!0,backgroundColor:r,tension:.4,pointRadius:6,pointBackgroundColor:`#10b981`,pointBorderColor:`#fff`,pointBorderWidth:3,pointHoverRadius:8}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1}},scales:{y:{beginAtZero:!0,grid:{color:`rgba(255,255,255,0.05)`,drawBorder:!1},ticks:{color:`#64748b`,font:{size:10,family:`Plus Jakarta Sans`}}},x:{grid:{display:!1},ticks:{color:`#64748b`,font:{size:10,family:`Plus Jakarta Sans`}}}}}})}let r=document.getElementById(`salesSourceChart`)?.getContext(`2d`);if(r){let t=[e.reduce((e,t)=>e+(t.cash||0),0),e.reduce((e,t)=>e+(t.card||0),0),e.reduce((e,t)=>e+(t.debt||0),0)],n=[c(`Naqd`),c(`Karta`),c(`Qarz`)],i=[`#10b981`,`#3b82f6`,`#ef4444`];new Chart(r,{type:`doughnut`,data:{labels:n,datasets:[{data:t,backgroundColor:i,borderWidth:0,hoverOffset:15}]},options:{responsive:!0,maintainAspectRatio:!1,cutout:`75%`,plugins:{legend:{display:!1}}}});let a=document.getElementById(`sales-sources-legend`);if(a){let e=t.reduce((e,t)=>e+t,0)||1;a.innerHTML=n.map((n,r)=>`
        <div style="display:flex; align-items:center; gap:8px;">
           <div style="width:8px; height:8px; border-radius:50%; background:${i[r]};"></div>
           <div style="flex:1; font-size:12px; color:var(--text-muted);">${n}</div>
           <div style="font-weight:700; font-size:12px; color:#fff;">${Math.round(t[r]/e*100)}%</div>
        </div>
      `).join(``)}}}window.dashboardPage=1;var Zn=[];function Qn(){let t=document.getElementById(`dashboard-transactions-container`);if(!t)return;let n=Math.ceil(Zn.length/10);window.dashboardPage>n&&(window.dashboardPage=n||1);let r=(window.dashboardPage-1)*10,i=Zn.slice(r,r+10);t.innerHTML=`
    <div class="table-container" style="border:none; box-shadow:none;">
      <table class="premium-table">
        <thead>
          <tr style="background:rgba(79, 70, 229, 0.85);">
            <th style="color:white; text-align:center; padding:15px 10px;">№</th>
            <th style="color:white; text-align:center; padding:15px 10px;">${c(`SUMMA`)}</th>
            <th style="color:white; text-align:center; padding:15px 10px;">${c(`TO'LOV TURI`)}</th>
            <th style="color:white; text-align:center; padding:15px 10px;">${c(`QARZ`)}</th>
            <th style="color:white; text-align:center; padding:15px 10px;">${c(`SANA`)}</th>
          </tr>
        </thead>
        <tbody>
          ${Zn.length===0?`<tr><td colspan="5" style="text-align:center; padding:40px; color:var(--text-muted);">${c(`Sotuvlar hali yo'q`)}</td></tr>`:i.map((t,n)=>`
              <tr style="border-bottom: 1px solid var(--border);">
                <td style="color:var(--text-muted); text-align:center; padding:12px 10px;">${r+n+1}</td>
                <td style="font-weight:700; color:#10b981; text-align:center; padding:12px 10px;">${s(t.total)} ${c(`so'm`)}</td>
                <td style="text-align:center; padding:12px 10px;">
                   <div style="display:flex; justify-content:center; gap:12px; font-size:13px; font-weight:500;">
                     ${t.cash>0?`<span style="color:#10b981">💵 ${c(`Naqd`)}</span>`:``}
                     ${t.card>0?`<span style="color:#3b82f6">💳 ${c(`Karta`)}</span>`:``}
                     ${t.click>0?`<span style="color:#8b5cf6">📱 ${c(`Click`)}</span>`:``}
                   </div>
                </td>
                <td style="text-align:center; padding:12px 10px;">
                  ${t.debt>0?`<span style="color:#ef4444; font-weight:800; font-size:14px;">${s(t.debt)}</span>`:`<span style="color:var(--text-muted); opacity:0.5;">—</span>`}
                </td>
                <td style="font-size:12px; color:var(--text-muted); text-align:center; padding:12px 10px;">${e(t.createdAt)}</td>
              </tr>`).join(``)}
        </tbody>
      </table>
    </div>
    <div style="padding: 10px 24px 24px 24px;">
       ${$n(`dashboardPage`,n,`renderDashboardTransactions()`)}
    </div>
  `}function $n(e,t,n){let r=window[e]||1,i=Math.max(1,t),a=`<div class="pagination" style="display:flex; gap:5px; justify-content:center; align-items:center; margin-top:15px;">`;a+=`<button class="btn btn-sm" ${r<=1?`disabled`:``} onclick="${e} = ${r-1}; ${n}">${c(`Oldingi`)}</button>`;for(let t=1;t<=i;t++)t===1||t===i||t>=r-2&&t<=r+2?a+=`<button class="btn btn-sm ${t===r?`btn-primary active`:`btn-secondary`}" onclick="${e} = ${t}; ${n}">${t}</button>`:(t===r-3||t===r+3)&&(a+=`<span style="color:var(--text-muted);">...</span>`);return a+=`<button class="btn btn-sm" ${r>=i?`disabled`:``} onclick="${e} = ${r+1}; ${n}">${c(`Keyingi`)}</button>`,a+=`</div>`,a}var er=!1;function Q(e,t,n=``,r=!1){let i=document.getElementById(`modal-body`),a=document.getElementById(`modal-overlay`);er=r,i.className=`modal `+n,t?i.innerHTML=`
            <div class="modal-header">
                <h3>${e}</h3>
                <button class="modal-close" onclick="closeModal()">&times;</button>
            </div>
            <div class="modal-content">${t}</div>
        `:i.innerHTML=e,a.classList.add(`active`)}function $(e=!1){if(er&&!e){o.logout(`org_required`);return}document.getElementById(`modal-overlay`).classList.remove(`active`),er=!1}window.api=o,window.t=c,window.currentLang=r;async function tr(){let t=document.getElementById(`page-content`),n=o.getUser();if(!n)return;try{let e=await o.get(`/users/${n.id}`);o.setUser(e)}catch(e){console.error(`User info refresh error:`,e)}let r=o.getUser();t.innerHTML=`
    <div class="profile-container fade-in" style="min-height: 80vh; padding: 20px; position: relative; overflow: hidden; background: #f8fafc; border-radius: 20px;">
        <!-- Background Decorative Blobs -->
        <div style="position: absolute; top: -10%; left: -10%; width: 400px; height: 400px; background: rgba(var(--primary-rgb), 0.15); border-radius: 50%; filter: blur(80px); z-index: 0;"></div>
        <div style="position: absolute; bottom: -10%; right: -10%; width: 350px; height: 350px; background: rgba(99, 102, 241, 0.1); border-radius: 50%; filter: blur(80px); z-index: 0;"></div>

        <div class="card shadow-lg" style="max-width: 800px; margin: 0 auto; position: relative; z-index: 1; overflow: hidden; border: none; backdrop-filter: blur(10px); background: rgba(255, 255, 255, 0.85); border-radius: 24px;">
            <!-- Modern Header Banner (Sidebar Rangida) - Kengaytirilgan -->
            <div style="min-height: 220px; background: var(--sidebar-gradient); margin: 0; padding: 30px 40px; position: relative; display: flex; flex-direction: column; justify-content: flex-end;">
                <div style="position: absolute; top:0; left:0; width:100%; height:100%; background: url('https://www.transparenttextures.com/patterns/cubes.png'); opacity: 0.1;"></div>
                
                <!-- Profile Identity INSIDE Banner (Matnlar Oq rangda) -->
                <div style="display:flex; align-items: center; gap: 25px; position: relative; z-index: 2;">
                    <div class="user-avatar" id="profile-avatar-display" style="width:110px; height:110px; font-size:44px; border: 4px solid rgba(255,255,255,0.3); box-shadow: 0 10px 25px rgba(0,0,0,0.2); background: rgba(255,255,255,0.2); backdrop-filter: blur(5px); color: white; border-radius: 30px; overflow: hidden;">
                        ${r.image?`<img src="${r.image}" style="width:100%; height:100%; object-fit:cover;">`:(r.firstName||`U`)[0].toUpperCase()}
                    </div>
                    <div>
                        <h2 style="margin:0; font-size:30px; font-weight: 800; color: white; text-shadow: 0 2px 4px rgba(0,0,0,0.1);">${r.firstName} ${r.lastName}</h2>
                        <div style="display: flex; align-items: center; gap: 10px; margin-top: 5px;">
                            <span style="background: rgba(255, 255, 255, 0.2); color: white; padding: 2px 12px; border-radius: 20px; font-size: 13px; font-weight: 600; border: 1px solid rgba(255,255,255,0.3);">@${r.userName}</span>
                            <span style="font-size: 13px; color: rgba(255,255,255,0.8); font-weight: 500;">ID: #${r.id}</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div style="padding: 40px;">
                <!-- Action Buttons -->
                <div style="display: flex; gap: 10px; margin-bottom: 30px;">
                    <button class="btn btn-outline" style="flex:1; border-radius: 12px; height: 45px; font-weight: 600; border-color: #e2e8f0;" onclick="showChangePasswordModal()">
                        <span class="icon">🔑</span> ${c(`Parolni o'zgartirish`)}
                    </button>
                    <button class="btn btn-primary" style="flex:1; border-radius: 12px; height: 45px; font-weight: 600;" onclick="showEditProfileModal()">
                        <span class="icon">✏️</span> ${c(`Ma'lumotlarni tahrirlash`)}
                    </button>
                </div>

                <!-- Info Grid -->
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px;">
                    <div class="info-card" style="padding: 15px 20px; background: #f8fafc; border-radius: 16px; border: 1px solid #e2e8f0;">
                        <label style="display:block; font-size:11px; color:#94a3b8; text-transform:uppercase; font-weight: 700; margin-bottom: 8px; letter-spacing: 0.5px;">${c(`Ism`)}</label>
                        <div style="font-size:17px; font-weight:600; color: #334155;">${r.firstName}</div>
                    </div>
                    <div class="info-card" style="padding: 15px 20px; background: #f8fafc; border-radius: 16px; border: 1px solid #e2e8f0;">
                        <label style="display:block; font-size:11px; color:#94a3b8; text-transform:uppercase; font-weight: 700; margin-bottom: 8px; letter-spacing: 0.5px;">${c(`Familiya`)}</label>
                        <div style="font-size:17px; font-weight:600; color: #334155;">${r.lastName}</div>
                    </div>
                    <div class="info-card" style="padding: 15px 20px; background: #f8fafc; border-radius: 16px; border: 1px solid #e2e8f0;">
                        <label style="display:block; font-size:11px; color:#94a3b8; text-transform:uppercase; font-weight: 700; margin-bottom: 8px; letter-spacing: 0.5px;">${c(`Telefon raqami`)}</label>
                        <div style="font-size:17px; font-weight:600; color: #334155;">${r.phoneNumber||`—`}</div>
                    </div>
                    <div class="info-card" style="padding: 15px 20px; background: #f8fafc; border-radius: 16px; border: 1px solid #e2e8f0;">
                        <label style="display:block; font-size:11px; color:#94a3b8; text-transform:uppercase; font-weight: 700; margin-bottom: 8px; letter-spacing: 0.5px;">${c(`Obuna muddati`)}</label>
                        <div style="font-size:15px; font-weight:600; color: var(--primary-color);">${e(r.expirationDate)||`—`}</div>
                    </div>
                    <div class="info-card" style="padding: 15px 20px; background: white; border-radius: 16px; border: 2px solid rgba(var(--primary-rgb), 0.15); box-shadow: 0 4px 12px rgba(var(--primary-rgb), 0.08); grid-column: span 1;">
                        <label style="display:block; font-size:11px; color:var(--primary-color); text-transform:uppercase; font-weight: 800; margin-bottom: 8px; letter-spacing: 0.5px;">${c(`Taklif kodi (Promo)`)}</label>
                        <div style="display:flex; align-items:center; justify-content:space-between;">
                            <span style="font-size:20px; font-weight:800; color:var(--primary-color); letter-spacing:2px;">${r.offerCode||`—`}</span>
                            <button class="btn btn-sm btn-primary" 
                                    style="padding: 6px 14px; border-radius: 10px; font-size: 12px; box-shadow: 0 4px 10px rgba(var(--primary-rgb), 0.3);" 
                                    onclick="copyToClipboard('${r.offerCode||``}')">
                                <span class="icon">📋</span> ${c(`Nusxa`)}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Tip Box -->
        <div style="max-width: 800px; margin: 30px auto 0; padding: 25px; background: linear-gradient(to right, #ffffff, #f8fafc); border-radius: 20px; border: 1px solid #e2e8f0; display: flex; gap: 20px; align-items: center; box-shadow: 0 4px 15px rgba(0,0,0,0.02);">
            <div style="width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; background: #fffbeb; color: #f59e0b; font-size: 24px; border-radius: 15px; box-shadow: 0 4px 10px rgba(245, 158, 11, 0.1);">💡</div>
            <div style="flex: 1;">
                <h4 style="margin: 0 0 5px 0; font-size:16px; font-weight: 700; color: #1e293b;">${c(`Taklif kodi nima?`)}</h4>
                <p style="font-size:14px; line-height:1.6; margin:0; color: #64748b; font-weight: 500;">
                    ${c(`Ushbu kodni do'stlaringizga yuboring. Ular ro'yxatdan o'tayotganlarida ushbu kodni kiritsalar, sizga va ularga qo'shimcha imtiyozlar berilishi mumkin.`)}
                </p>
            </div>
        </div>
    </div>`}function nr(){let e=o.getUser();Q(`
        <div class="modal-header">
            <h3>${c(`Profilni tahrirlash`)}</h3>
            <button class="modal-close" onclick="closeModal()">✕</button>
        </div>
        <form onsubmit="handleUpdateProfile(event)" style="min-width: 450px;">
            <div class="form-group" style="margin-bottom: 20px;">
                <label style="display:block; margin-bottom: 10px;">${c(`Profil rasmi`)}</label>
                <div style="display:flex; gap:20px; align-items: center;">
                    <div id="profile-image-preview" style="width:80px; height:80px; border-radius:20px; background:var(--bg-input); border:2px dashed var(--border); overflow:hidden; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
                        ${e.image?`<img src="${e.image}" style="width:100%; height:100%; object-fit:cover;">`:`<span style="font-size:24px; opacity:0.3;">🖼️</span>`}
                    </div>
                    <div style="flex:1">
                        <input type="file" class="form-control" accept="image/*" onchange="previewProfileImage(this)">
                        <input type="hidden" id="edit-image-url" value="${l(e.image||``)}">
                        <p style="font-size:11px; color:var(--text-muted); margin-top:5px;">JPEG, PNG formatlar, maksimal 2MB.</p>
                    </div>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>${c(`Ism`)} *</label>
                    <input type="text" class="form-control" id="edit-firstName" value="${l(e.firstName)}" placeholder="${c(`Ismni kiriting`)}" required>
                </div>
                <div class="form-group">
                    <label>${c(`Familiya`)} *</label>
                    <input type="text" class="form-control" id="edit-lastName" value="${l(e.lastName)}" placeholder="${c(`Familiyani kiriting`)}" required>
                </div>
            </div>
            <div class="form-group">
                <label>${c(`Telefon raqami`)}</label>
                <input type="text" class="form-control" id="edit-phone" value="${l(e.phoneNumber||``)}" placeholder="+998901234567">
            </div>

            ${e.role>=1?`
            <div style="margin-top:20px; padding-top:20px; border-top:1px dashed var(--border);">
                <h4 style="margin-bottom:15px; color:var(--primary-color)">${c(`Brend ma'lumotlari`)}</h4>
                <div class="form-group">
                    <label>${c(`Brend nomi`)}</label>
                    <input type="text" class="form-control" id="edit-brandName" value="${l(e.brandName||``)}" placeholder="Masalan: Safia">
                </div>
                <div class="form-group">
                    <label style="display:block; margin-bottom: 10px;">${c(`Brend rasmi`)} (Fon)</label>
                    <div style="display:flex; gap:20px; align-items: center;">
                        <div id="brand-image-preview" style="width:120px; height:70px; border-radius:12px; background:var(--bg-input); border:2px dashed var(--border); overflow:hidden; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
                            ${e.brandImage?`<img src="${e.brandImage}" style="width:100%; height:100%; object-fit:cover;">`:`<span style="font-size:24px; opacity:0.3;">🖼️</span>`}
                        </div>
                        <div style="flex:1">
                            <input type="file" class="form-control" accept="image/*" onchange="previewBrandImage(this)">
                            <input type="hidden" id="edit-brandImage-url" value="${l(e.brandImage||``)}">
                        </div>
                    </div>
                </div>
            </div>
            `:``}
            
            <div class="modal-footer" style="padding-top: 15px;">
                <button type="button" class="btn btn-ghost" onclick="closeModal()">${c(`Bekor qilish`)}</button>
                <button type="submit" class="btn btn-primary" style="padding: 10px 40px;">${c(`Saqlash`)}</button>
            </div>
        </form>
    `)}async function rr(e){if(e.files&&e.files[0]){let t=e.files[0],n=new FormData;n.append(`file`,t);try{a(c(`Rasm yuklanmoqda...`),`info`);let e=await o.post(`/upload`,n);e&&e.url&&(document.getElementById(`edit-image-url`).value=e.url,document.getElementById(`profile-image-preview`).innerHTML=`<img src="${e.url}" style="width:100%; height:100%; object-fit:cover;">`,a(c(`Rasm yuklandi`)))}catch(e){a(e.message,`error`)}}}async function ir(e){if(e.files&&e.files[0]){let t=e.files[0],n=new FormData;n.append(`file`,t);try{a(c(`Rasm yuklanmoqda...`),`info`);let e=await o.post(`/upload`,n);e&&e.url&&(document.getElementById(`edit-brandImage-url`).value=e.url,document.getElementById(`brand-image-preview`).innerHTML=`<img src="${e.url}" style="width:100%; height:100%; object-fit:cover;">`,a(c(`Brend rasmi yuklandi`)))}catch(e){a(e.message,`error`)}}}async function ar(e){e.preventDefault();let t=o.getUser(),n={firstName:document.getElementById(`edit-firstName`).value,lastName:document.getElementById(`edit-lastName`).value,phoneNumber:document.getElementById(`edit-phone`).value,image:document.getElementById(`edit-image-url`).value};t.role>=1&&(n.brandName=document.getElementById(`edit-brandName`).value,n.brandImage=document.getElementById(`edit-brandImage-url`).value);try{await o.put(`/users/${t.id}`,n);let e={...t,...n};o.setUser(e),a(c(`Profil yangilandi`)),$(),Wn(),tr()}catch(e){a(e.message,`error`)}}function or(){Q(`
        <div class="modal-header">
            <h3>${c(`Parolni o'zgartirish`)}</h3>
            <button class="modal-close" onclick="closeModal()">✕</button>
        </div>
        <form onsubmit="handleChangePassword(event)" style="min-width: 350px;">
            <div class="form-group">
                <label>${c(`Yangi parol`)}</label>
                <input type="password" class="form-control" id="new-password" placeholder="••••••••" required>
            </div>
            <div class="form-group">
                <label>${c(`Parolni tasdiqlang`)}</label>
                <input type="password" class="form-control" id="confirm-password" placeholder="••••••••" required>
            </div>
            
            <div class="modal-footer" style="padding-top: 15px;">
                <button type="button" class="btn btn-ghost" onclick="closeModal()">${c(`Bekor qilish`)}</button>
                <button type="submit" class="btn btn-primary" style="padding: 10px 40px;">${c(`Yangilash`)}</button>
            </div>
        </form>
    `)}async function sr(e){e.preventDefault();let t=o.getUser(),n=document.getElementById(`new-password`).value;if(n!==document.getElementById(`confirm-password`).value)return a(c(`Parollar bir xil emas`),`error`);try{await o.put(`/users/${t.id}`,{password:n}),a(c(`Parol yangilandi`)),$()}catch(e){a(e.message,`error`)}}function cr(e){e&&navigator.clipboard.writeText(e).then(()=>{a(c(`Nusxa olindi`))}).catch(e=>{a(c(`Xatolik: `)+e,`error`)})}window.navigateTo=Z,window.onBusinessChange=Kn,window.renderProfile=tr,window.showEditProfileModal=nr,window.handleUpdateProfile=ar,window.previewProfileImage=rr,window.previewBrandImage=ir,window.showChangePasswordModal=or,window.handleChangePassword=sr,window.copyToClipboard=cr,window.toggleTheme=f,window.updateThemeIcon=n,window.currentPage=Bn,window.dashboardPage=dashboardPage,window.navigateTo=Z,window.renderPageControls=$n,window.renderDashboard=qn,window.openModal=Q,window.closeModal=$,window.onBusinessChange=Kn,window.renderDashboardTransactions=Qn,window.closeModalOnOverlay=function(e){e.target.id===`modal-overlay`&&$()},window.maximizeTrendChart=function(){Q(c(`Oylik savdo ko'rsatkichi`),`
        <div style="height:600px; width:100%;">
            <canvas id="maxSalesChart"></canvas>
        </div>
    `,`modal-xl`),setTimeout(()=>{let e=document.getElementById(`maxSalesChart`)?.getContext(`2d`);if(e){let t=[c(`Dush`),c(`Sesh`),c(`Chor`),c(`Pay`),c(`Jum`),c(`Shan`),c(`Yak`)];new Chart(e,{type:X,data:{labels:t,datasets:[{label:c(`Savdo hajmi`),data:[12,19,15,25,22,30,20],borderColor:`#10b981`,borderWidth:4,fill:!0,backgroundColor:`rgba(16, 185, 129, 0.1)`,tension:.4,pointRadius:6,pointBackgroundColor:`#10b981`}]},options:{responsive:!0,maintainAspectRatio:!1}})}},200)},window.openTrendChartSettings=function(){Q(c(`Grafik sozlamalari`),`
        <div style="padding:10px;">
            <div style="margin-bottom:20px;">
                <label style="display:block; margin-bottom:10px; color:var(--text-secondary);">${c(`Grafik turi`)}</label>
                <div style="display:flex; gap:10px;">
                    <button class="btn ${X===`line`?`btn-primary`:`btn-secondary`}" style="flex:1;" onclick="setChartType('line')">
                        <i data-lucide="line-chart"></i> ${c(`Chiziqli`)}
                    </button>
                    <button class="btn ${X===`bar`?`btn-primary`:`btn-secondary`}" style="flex:1;" onclick="setChartType('bar')">
                        <i data-lucide="bar-chart-2"></i> ${c(`Ustunli`)}
                    </button>
                </div>
            </div>
            <div style="text-align:right; margin-top:20px;">
                <button class="btn btn-secondary" onclick="closeModal()">${c(`Yopish`)}</button>
            </div>
        </div>
    `),setTimeout(()=>lucide.createIcons(),50)},window.setChartType=function(e){X=e,$(),Xn(Vn,Hn),a(c(`Grafik turi yangilandi`),`success`)},window.toggleSidebar=function(){let e=document.querySelector(`.sidebar`),t=document.querySelector(`.dashboard`),n=document.querySelector(`.sidebar-logo .btn-icon .icon`);e&&t&&(e.classList.toggle(`collapsed`),t.classList.toggle(`sidebar-collapsed`),e.classList.contains(`collapsed`)?(n&&(n.textContent=`▶`),localStorage.setItem(`sidebarCollapsed`,`true`)):(n&&(n.textContent=`◀`),localStorage.setItem(`sidebarCollapsed`,`false`)))},document.addEventListener(`DOMContentLoaded`,()=>{if(localStorage.getItem(`sidebarCollapsed`)===`true`){let e=document.querySelector(`.sidebar`),t=document.querySelector(`.dashboard`),n=document.querySelector(`.sidebar-logo .btn-icon .icon`);e&&t&&(e.classList.add(`collapsed`),t.classList.add(`sidebar-collapsed`),n&&(n.textContent=`▶`))}}),document.addEventListener(`DOMContentLoaded`,()=>{let e=document.createElement(`style`);e.textContent=`
        table th { cursor: pointer; user-select: none; position: relative; transition: background 0.2s; }
        table th:hover { background: rgba(0,0,0,0.05); }
        [data-theme='dark'] table th:hover { background: rgba(255,255,255,0.05); }
        table th.no-sort, table th:first-child, table th:last-child { cursor: default !important; background: transparent !important; }
        .sort-arrow { font-size: 0.9em; opacity: 0.8; margin-left: 4px; }
    `,document.head.appendChild(e),document.addEventListener(`click`,function(e){let t=e.target.closest(`th`);if(!t||t.querySelector(`input, select, button`)||t.classList.contains(`no-sort`))return;let n=t.textContent.trim().toLowerCase();if(n.includes(`amallar`)||n.includes(`actions`)||n===`#`||n===`№`||n===`n`)return;let r=t.parentElement.cells;if(t===r[0]||t===r[r.length-1])return;let i=t.closest(`table`);if(!i||i.classList.contains(`no-sort`))return;let a=i.querySelector(`tbody`);if(!a)return;let o=Array.from(a.querySelectorAll(`tr`));if(o.length<=1||o.length>0&&o[0].cells.length===1)return;let s=(t.getAttribute(`data-sort-dir`)||`none`)===`asc`?`desc`:`asc`;i.querySelectorAll(`th`).forEach(e=>{e.removeAttribute(`data-sort-dir`);let t=e.querySelector(`.sort-arrow`);t&&t.remove()}),t.setAttribute(`data-sort-dir`,s),t.insertAdjacentHTML(`beforeend`,`<span class="sort-arrow">${s===`asc`?`↑`:`↓`}</span>`);let c=t.cellIndex;o.sort((e,t)=>{let n=e.cells[c],r=t.cells[c];if(!n||!r)return 0;let i=n.textContent.trim(),a=r.textContent.trim(),o=i.replace(/[\s,]/g,``),l=a.replace(/[\s,]/g,``),u=parseFloat(o),d=parseFloat(l),f=Date.parse(i),p=Date.parse(a);if(!isNaN(f)&&!isNaN(p)&&i.length>=10&&(i.includes(`-`)||i.includes(`.`)))return s===`asc`?f-p:p-f;let m=!isNaN(u)&&/[0-9]/.test(o),h=!isNaN(d)&&/[0-9]/.test(l);return m&&h?s===`asc`?u-d:d-u:s===`asc`?i.localeCompare(a):a.localeCompare(i)}),a.innerHTML=``,o.forEach(e=>a.appendChild(e))})});