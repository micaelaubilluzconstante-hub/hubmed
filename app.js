/* ============================================================
   HUB MED — App con Supabase + Cloudinary + Admin Lock
   ============================================================ */

const SUPABASE_URL  = 'https://aqakwecvpkyobscdesxk.supabase.co';
const SUPABASE_KEY  = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxYWt3ZWN2cGt5b2JzY2Rlc3hrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk4MTQ3MTMsImV4cCI6MjA5NTM5MDcxM30.7eNbxk9PK2lhxbrDc7ZHVdU5M9MdyXRddqAKhoa8ryM';
const CLD_CLOUD     = 'dtdjut5sq';
const CLD_PRESET    = 'mediventas_preset';
const WA_NUMBER     = '593987045251';

const sbClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const CAT_COLOR = { accesorios:'#2176AE', gorros:'#7B2D42', joyeria:'#C8941A', insumos:'#1A7A50' };
const CAT_ICON  = { accesorios:'ti-badge', gorros:'ti-hat', joyeria:'ti-diamond', insumos:'ti-stethoscope' };
const CAT_LBL   = { accesorios:'Accesorios', gorros:'Gorros', joyeria:'Joyería', insumos:'Insumos' };

const SEED = [
  { name:'Pad de sutura',               desc:'Práctica de suturas, esencial para el lab',       price:9,    cat:'accesorios', badge:'must' },
  { name:'Llavero metálico',            desc:'Diseño médico, resistente y cool',                 price:7,    cat:'accesorios', badge:'fav'  },
  { name:'Esferos de goma',             desc:'Grip suave, escritura fluida',                     price:2,    cat:'accesorios', badge:null   },
  { name:'Esferos de huesos',           desc:'Edición especial medicina',                        price:1.5,  cat:'accesorios', badge:'new'  },
  { name:'Porta credenciales Café',     desc:'Diseño exclusivo café, identifícate con estilo',   price:7,    cat:'accesorios', badge:'fav'  },
  { name:'Porta credenciales solo',     desc:'Diseño clásico, funcional y elegante',             price:7,    cat:'accesorios', badge:null   },
  { name:'Aretes medicina/enfermería',  desc:'Símbolo médico, perfectos para el día a día',      price:2,    cat:'joyeria',    badge:'new'  },
  { name:'Broches de corazón',          desc:'Pequeño detalle, gran statement',                  price:5,    cat:'joyeria',    badge:null   },
  { name:'Medias de compresión',        desc:'Comodidad y salud en cada turno',                  price:9,    cat:'accesorios', badge:'must' },
  { name:'Gorro quirúrgico rosado',     desc:'Suave, ajustable, te va a encantar',               price:8,    cat:'gorros',     badge:null   },
  { name:'Gorro quirúrgico dorado',     desc:'Edición especial, brilla en el pabellón',          price:8,    cat:'gorros',     badge:'fav'  },
  { name:'Gorro quirúrgico dentista',   desc:'Diseño dental, para la familia odonto',            price:8,    cat:'gorros',     badge:'new'  },
  { name:'Gorro quirúrgico negro',      desc:'Minimalista y atemporal',                          price:8,    cat:'gorros',     badge:null   },
  { name:'Gorro quirúrgico azul',       desc:'El clásico que nunca falla',                       price:8,    cat:'gorros',     badge:null   },
  { name:'Gorro azul con diseño',       desc:'Azul con detalles únicos, limited edition',        price:8,    cat:'gorros',     badge:'must' },
  { name:'Broche rosado',               desc:'Accesorio delicado que suma a cualquier look',     price:7,    cat:'joyeria',    badge:null   },
  { name:'Cintillos',                   desc:'Estilo y funcionalidad en un solo accesorio',      price:5,    cat:'accesorios', badge:null   },
  { name:'Aretes edición Gold',         desc:'Brillo sutil, estética premium',                   price:5,    cat:'joyeria',    badge:'new'  },
  { name:'Agua oxigenada 100 ml',       desc:'Antiséptico esencial',                             price:1,    cat:'insumos',    badge:null   },
  { name:'Agua oxigenada 500 ml',       desc:'Presentación familiar',                            price:2.5,  cat:'insumos',    badge:null   },
  { name:'Alcohol 100 ml',              desc:'Antiséptico concentrado',                          price:1.5,  cat:'insumos',    badge:null   },
  { name:'Alcohol 250 ml',              desc:'Ideal para prácticas',                             price:2,    cat:'insumos',    badge:null   },
  { name:'Algodón 15 gr',               desc:'Presentación pequeña',                             price:1,    cat:'insumos',    badge:null   },
  { name:'Algodón 30 gr',               desc:'Uso frecuente en clínica',                         price:1.5,  cat:'insumos',    badge:null   },
  { name:'Algodón 70 gr',               desc:'Pack estándar para prácticas',                     price:2.5,  cat:'insumos',    badge:null   },
  { name:'Algodón en motas',            desc:'Suave, para procedimientos delicados',             price:2.5,  cat:'insumos',    badge:null   },
  { name:'Algodón hospitalario',        desc:'Alta absorción, calidad hospitalaria',             price:10.8, cat:'insumos',    badge:null   },
  { name:'Bata de cirujano x unidad',   desc:'Estéril y lista para usar',                        price:2,    cat:'insumos',    badge:null   },
  { name:'Guantes examinación x100',    desc:'Látex natural, ajuste ergonómico',                 price:4,    cat:'insumos',    badge:'must' },
  { name:'Gorros desechables x100',     desc:'Pack completo para rotaciones',                    price:3.04, cat:'insumos',    badge:null   },
  { name:'Gorro desechable x unidad',   desc:'Cuando solo necesitas uno',                        price:0.2,  cat:'insumos',    badge:null   },
  { name:'Guantes de nitrilo',          desc:'Sin látex, mayor resistencia',                     price:4.5,  cat:'insumos',    badge:'fav'  },
  { name:'Guantes estériles',           desc:'Para procedimientos asépticos',                    price:0.75, cat:'insumos',    badge:null   },
  { name:'Guantes x unidad',            desc:'Solo uno cuando lo necesitas',                     price:0.15, cat:'insumos',    badge:null   },
  { name:'Hilos dafilon 3/0',           desc:'Sutura no absorbible monofilamento',               price:3,    cat:'insumos',    badge:null   },
  { name:'Hoja de bisturí individual',  desc:'Estéril, uso único',                               price:0.5,  cat:'insumos',    badge:null   },
  { name:'Hojas de bisturí (caja)',     desc:'Pack completo para todo el semestre',              price:22,   cat:'insumos',    badge:'must' },
  { name:'Jeringas',                    desc:'Por unidad, variedad de calibres',                 price:0.1,  cat:'insumos',    badge:null   },
  { name:'Mascarillas con diseño',      desc:'Porque el estilo no para en el lab',               price:2,    cat:'insumos',    badge:'new'  },
  { name:'Mascarilla con diseño x und', desc:'Elige tu favorita',                                price:0.1,  cat:'insumos',    badge:null   },
  { name:'Mascarilla individual',       desc:'Protección básica diaria',                         price:0.2,  cat:'insumos',    badge:null   },
  { name:'Mascarilla KN95',             desc:'Mayor filtración, mayor seguridad',                price:1,    cat:'insumos',    badge:'fav'  },
  { name:'Mascarillas x100',            desc:'Stock para todo el año',                           price:2.5,  cat:'insumos',    badge:null   },
  { name:'Pad de alcohol',              desc:'Práctico para cualquier procedimiento',            price:0.5,  cat:'insumos',    badge:null   },
  { name:'Torniquete broche',           desc:'Rápido y seguro, fácil de limpiar',               price:2.7,  cat:'insumos',    badge:null   },
  { name:'Torniquete látex',            desc:'Clásico y económico',                              price:1.2,  cat:'insumos',    badge:null   },
  { name:'Zapatones x unidad',          desc:'Cobertura para tu calzado en el pabellón',        price:0.5,  cat:'insumos',    badge:null   },
  { name:'Zapatones x50',               desc:'Stock completo para rotaciones',                   price:15,   cat:'insumos',    badge:null   },
];

// ── Estado ──
let products     = [];
let cart         = [];
let curFilter    = 'all';
let editId       = null;
let payMode      = 'transfer';
let isAdmin      = false;
// Multi-foto: cada slot es null | string(url existente) | File(nuevo)
let pendingSlots = [null, null, null, null, null];
let curSlotIdx   = null;
let pendingAgotado = false;

// ── Stock / Agotado ──
// Un producto está agotado si lo marcaste a mano (agotado=true)
// o si pusiste una cantidad y ya llegó a 0.
function isSoldOut(p) {
  return p.agotado === true || (p.stock != null && Number(p.stock) <= 0);
}

// ── Hash contraseña ──
async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + '_hubmed_salt_2024');
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
}

// ── Sesión admin ──
function checkAdminSession() {
  if (sessionStorage.getItem('hubmed_admin') === 'true') {
    isAdmin = true;
    updateAdminUI();
  }
}

function updateAdminUI() {
  const addBtn   = document.getElementById('add-new-btn');
  const adminBtn = document.getElementById('admin-btn');
  if (isAdmin) {
    addBtn.style.display   = 'flex';
    adminBtn.innerHTML     = '<i class="ti ti-lock-open"></i> Admin';
    adminBtn.classList.add('admin-active');
  } else {
    addBtn.style.display   = 'none';
    adminBtn.innerHTML     = '<i class="ti ti-lock"></i> Admin';
    adminBtn.classList.remove('admin-active');
  }
  render();
}

async function handleAdminBtn() {
  if (isAdmin) {
    isAdmin = false;
    sessionStorage.removeItem('hubmed_admin');
    updateAdminUI();
    toast('Sesión cerrada');
    return;
  }
  document.getElementById('login-modal').classList.add('open');
  setTimeout(() => document.getElementById('admin-password').focus(), 100);
}

async function submitLogin() {
  const pwd = document.getElementById('admin-password').value;
  if (!pwd) return;
  const hash = await hashPassword(pwd);
  const stored = await hashPassword('Micaela200175');
  if (hash === stored) {
    isAdmin = true;
    sessionStorage.setItem('hubmed_admin', 'true');
    closeM('login-modal');
    document.getElementById('admin-password').value = '';
    document.getElementById('login-error').style.display = 'none';
    updateAdminUI();
    toast('¡Bienvenida, Admin! 🔓');
  } else {
    document.getElementById('login-error').style.display = 'block';
    document.getElementById('admin-password').value = '';
    document.getElementById('admin-password').focus();
  }
}

// ── Toast ──
function toast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg; t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2200);
}

// ── Cargar productos ──
async function loadProducts() {
  const { data, error } = await sbClient
    .from('productos').select('*').order('name', { ascending: true });
  if (error) { console.error('Supabase error:', error); return []; }
  if (!data || data.length === 0) { await seedProducts(); return loadProducts(); }
  return data;
}

async function seedProducts() {
  const { error } = await sbClient.from('productos').insert(SEED);
  if (error) console.error('Seed error:', error);
}

async function init() {
  checkAdminSession();
  document.getElementById('loading-state').style.display = 'flex';
  try {
    const timeout = new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), 10000));
    products = await Promise.race([loadProducts(), timeout]);
  } catch (err) {
    console.error('Error init:', err);
    products = SEED.map((p, i) => ({ ...p, id: `local-${i}`, img_urls: null }));
    toast('⚠ Sin conexión — datos locales');
  }
  document.getElementById('loading-state').style.display = 'none';
  render();
}

// ── Filtros ──
document.querySelectorAll('.fbtn').forEach(btn => {
  btn.addEventListener('click', () => {
    curFilter = btn.dataset.cat;
    document.querySelectorAll('.fbtn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const T = { all:'Todos los productos', accesorios:'Accesorios', gorros:'Gorros', joyeria:'Joyería', insumos:'Insumos' };
    document.getElementById('sec-title').textContent = T[curFilter] || curFilter;
    render();
  });
});

// ── Render ──
function getImages(p) {
  if (p.img_urls && Array.isArray(p.img_urls) && p.img_urls.length > 0) return p.img_urls;
  if (p.img_url) return [p.img_url];
  return [];
}

function render() {
  const grid = document.getElementById('pgrid');
  const list = curFilter === 'all' ? products : products.filter(p => p.cat === curFilter);
  document.getElementById('sec-cnt').textContent = list.length ? `${list.length} producto${list.length !== 1 ? 's' : ''}` : '';
  grid.innerHTML = '';

  list.forEach(p => {
    const inCart  = cart.find(c => c.id === p.id);
    const color   = CAT_COLOR[p.cat] || '#2176AE';
    const icon    = CAT_ICON[p.cat]  || 'ti-box';
    const label   = CAT_LBL[p.cat]   || p.cat;
    const images  = getImages(p);
    const sold    = isSoldOut(p);

    const badgeHtml = p.badge ? `<div class="cbadge b-${p.badge}">${p.badge==='new'?'Nuevo':p.badge==='fav'?'Fav ♡':'Must have'}</div>` : '';

    // Aviso "¡Solo quedan X!" cuando hay cantidad baja (1-5) y no está agotado
    const stockHtml = (!sold && p.stock != null && Number(p.stock) > 0 && Number(p.stock) <= 5)
      ? `<div class="cstock">¡Solo quedan ${p.stock}!</div>` : '';

    let imgInner = '';
    if (images.length > 0) {
      imgInner = images.map((url, i) =>
        `<img class="cimgreal${i===0?' cactive':''}" src="${url}" alt="${p.name}" loading="lazy">`
      ).join('');
    } else {
      imgInner = `<div class="cimgph" style="background:${color}14;width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px">
        <i class="ti ${icon}" style="font-size:44px;color:${color};opacity:0.2"></i>
        <div class="phtxt">Foto próximamente</div>
      </div>`;
    }

    const arrowsHtml = images.length > 1
      ? `<button class="carrow cprev" onclick="slideCard(event,'${p.id}',-1)"><i class="ti ti-chevron-left"></i></button>
         <button class="carrow cnext" onclick="slideCard(event,'${p.id}',1)"><i class="ti ti-chevron-right"></i></button>
         <div class="cdots">${images.map((_,i)=>`<span class="cdot${i===0?' cdon':''}" data-ci="${p.id}" data-idx="${i}"></span>`).join('')}</div>`
      : '';

    const editBtn = isAdmin
      ? `<button class="editbtn" onclick="openEditModal('${p.id}')"><i class="ti ti-pencil"></i></button>`
      : '';

    const card = document.createElement('div');
    card.className = 'pcard' + (sold ? ' is-soldout' : '');
    card.dataset.cardid = p.id;
    card.innerHTML = `
      ${badgeHtml}
      <div class="cimgw">
        ${imgInner}
        ${arrowsHtml}
      </div>
      <div class="cbody">
        <div class="ccat" style="color:${color}">${label}</div>
        <div class="cname">${p.name}</div>
        <div class="cdesc">${p.desc || ''}</div>
        ${stockHtml}
        <div class="cfoot">
          <div class="cprice">$${parseFloat(p.price).toFixed(2)}<em> USD</em></div>
          <div class="cfoot-btns">
            ${editBtn}
            <button class="addbtn ${inCart ? 'added' : ''} ${sold ? 'soldout-btn' : ''}" onclick="toggleCart('${p.id}')" ${sold ? 'disabled' : ''}>
              <i class="ti ${inCart ? 'ti-check' : 'ti-plus'}"></i>
            </button>
          </div>
        </div>
      </div>`;
    grid.appendChild(card);
  });

  if (isAdmin) {
    const plus = document.createElement('div');
    plus.className = 'plus-card';
    plus.onclick = openAddModal;
    plus.innerHTML = `<i class="ti ti-plus"></i><span>Agregar producto</span>`;
    grid.appendChild(plus);
  }
}

// ── Carousel ──
function slideCard(e, id, dir) {
  e.stopPropagation();
  const card = document.querySelector(`[data-cardid="${id}"]`);
  if (!card) return;
  const imgs = card.querySelectorAll('.cimgreal');
  const dots = card.querySelectorAll('.cdot');
  if (imgs.length < 2) return;
  let cur = [...imgs].findIndex(img => img.classList.contains('cactive'));
  imgs[cur].classList.remove('cactive');
  if (dots[cur]) dots[cur].classList.remove('cdon');
  cur = (cur + dir + imgs.length) % imgs.length;
  imgs[cur].classList.add('cactive');
  if (dots[cur]) dots[cur].classList.add('cdon');
}

// ── Carrito ──
function toggleCart(id) {
  const p = products.find(x => x.id === id);
  if (!p) return;
  if (isSoldOut(p)) { toast('Este producto está agotado'); return; }
  const idx = cart.findIndex(c => c.id === id);
  if (idx >= 0) { cart.splice(idx, 1); toast('Quitado del carrito'); }
  else { cart.push({ ...p }); toast(`${p.name} agregado ✓`); }
  updateCartUI(); render();
}

function updateCartUI() {
  const total = cart.reduce((s, p) => s + parseFloat(p.price), 0);
  document.getElementById('cc-lbl').textContent = `${cart.length} producto${cart.length !== 1 ? 's' : ''}`;
  document.getElementById('ct-disp').textContent = `$${total.toFixed(2)}`;
  document.getElementById('co-btn').disabled = cart.length === 0;
}

// ── Multi-foto slots ──
function initSlots(existingUrls) {
  pendingSlots = [null, null, null, null, null];
  if (existingUrls && existingUrls.length > 0) {
    existingUrls.forEach((url, i) => { if (i < 5) pendingSlots[i] = url; });
  }
  renderSlots();
}

function renderSlots() {
  for (let i = 0; i < 5; i++) {
    const slot = document.getElementById(`slot-${i}`);
    if (!slot) continue;
    const val = pendingSlots[i];
    if (!val) {
      slot.className = 'img-slot empty';
      slot.innerHTML = `<i class="ti ti-plus"></i>`;
      slot.onclick = () => trigSlotUpload(i);
    } else {
      const url = val instanceof File ? URL.createObjectURL(val) : val;
      slot.className = 'img-slot filled';
      slot.innerHTML = `<img src="${url}" alt="foto ${i+1}">
        <button class="slot-del" onclick="removeSlot(event,${i})"><i class="ti ti-x"></i></button>
        <span class="slot-num">${i+1}</span>`;
      slot.onclick = null;
    }
  }
}

function trigSlotUpload(idx) {
  curSlotIdx = idx;
  document.getElementById('slot-file').click();
}

function removeSlot(e, idx) {
  e.stopPropagation();
  pendingSlots[idx] = null;
  // Compactar hacia la izquierda
  const filled = pendingSlots.filter(s => s !== null);
  pendingSlots = [...filled, ...Array(5 - filled.length).fill(null)];
  renderSlots();
}

document.getElementById('slot-file').addEventListener('change', function () {
  const file = this.files[0];
  if (!file || curSlotIdx === null) return;
  // Validar que el slot esté vacío (por si acaso)
  if (pendingSlots[curSlotIdx] !== null) {
    // Buscar primer slot vacío
    curSlotIdx = pendingSlots.findIndex(s => s === null);
    if (curSlotIdx === -1) { toast('Máximo 5 fotos'); this.value = ''; return; }
  }
  pendingSlots[curSlotIdx] = file;
  renderSlots();
  this.value = '';
});

// ── Upload Cloudinary ──
async function uploadToCloudinary(file, onProgress) {
  const url = `https://api.cloudinary.com/v1_1/${CLD_CLOUD}/image/upload`;
  const fd  = new FormData();
  fd.append('file', file);
  fd.append('upload_preset', CLD_PRESET);
  fd.append('folder', 'hubmed');
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.upload.onprogress = e => { if (e.lengthComputable) onProgress(Math.round(e.loaded / e.total * 100)); };
    xhr.onload = () => {
      const res = JSON.parse(xhr.responseText);
      if (res.secure_url) resolve(res.secure_url);
      else reject(new Error('Upload fallido'));
    };
    xhr.onerror = () => reject(new Error('Error de red'));
    xhr.send(fd);
  });
}

// ── Modales admin ──
function openAddModal() {
  if (!isAdmin) return;
  editId = null;
  document.getElementById('modal-title-text').textContent = '✦ Agregar producto';
  document.getElementById('p-name').value  = '';
  document.getElementById('p-desc').value  = '';
  document.getElementById('p-price').value = '';
  document.getElementById('p-cat').value   = 'accesorios';
  document.getElementById('p-badge').value = '';
  document.getElementById('p-stock').value = '';
  pendingAgotado = false;
  updateStockToggle();
  document.getElementById('del-btn').style.display = 'none';
  document.getElementById('upload-progress').style.display = 'none';
  initSlots([]);
  document.getElementById('add-modal').classList.add('open');
}

function openEditModal(id) {
  if (!isAdmin) return;
  const p = products.find(x => x.id === id);
  if (!p) return;
  editId = id;
  document.getElementById('modal-title-text').textContent = '✏ Editar producto';
  document.getElementById('p-name').value  = p.name;
  document.getElementById('p-desc').value  = p.desc || '';
  document.getElementById('p-price').value = p.price;
  document.getElementById('p-cat').value   = p.cat;
  document.getElementById('p-badge').value = p.badge || '';
  document.getElementById('p-stock').value = (p.stock != null ? p.stock : '');
  pendingAgotado = p.agotado === true;
  updateStockToggle();
  document.getElementById('del-btn').style.display = 'inline-block';
  document.getElementById('upload-progress').style.display = 'none';
  initSlots(getImages(p));
  document.getElementById('add-modal').classList.add('open');
}

async function saveProduct() {
  if (!isAdmin) return;
  const name  = document.getElementById('p-name').value.trim();
  const price = document.getElementById('p-price').value;
  if (!name || !price) { toast('Nombre y precio son necesarios'); return; }

  const saveBtn = document.getElementById('save-btn');
  saveBtn.disabled = true; saveBtn.textContent = 'Guardando...';

  // Subir fotos nuevas (File objects) y recopilar todas las URLs
  const finalUrls = [];
  const filesToUpload = pendingSlots.filter(s => s instanceof File);
  const totalUploads = filesToUpload.length;
  let uploadIdx = 0;

  if (totalUploads > 0) {
    document.getElementById('upload-progress').style.display = 'block';
  }

  for (let i = 0; i < 5; i++) {
    const slot = pendingSlots[i];
    if (!slot) continue;
    if (slot instanceof File) {
      uploadIdx++;
      document.getElementById('upload-label').textContent = `Subiendo foto ${uploadIdx} de ${totalUploads}...`;
      try {
        const url = await uploadToCloudinary(slot, pct => {
          document.getElementById('upload-bar').style.width = pct + '%';
        });
        finalUrls.push(url);
      } catch (err) {
        toast(`Error subiendo foto ${uploadIdx}`);
        saveBtn.disabled = false; saveBtn.textContent = 'Guardar';
        return;
      }
    } else if (typeof slot === 'string') {
      finalUrls.push(slot);
    }
  }

  document.getElementById('upload-label').textContent = '¡Fotos listas! ✓';

  const stockVal = document.getElementById('p-stock').value;

  const payload = {
    name,
    desc:    document.getElementById('p-desc').value.trim(),
    price:   parseFloat(price),
    cat:     document.getElementById('p-cat').value,
    badge:   document.getElementById('p-badge').value || null,
    stock:   stockVal === '' ? null : parseInt(stockVal, 10),
    agotado: pendingAgotado,
    img_urls: finalUrls.length > 0 ? finalUrls : null,
    img_url:  finalUrls[0] || null,
  };

  if (editId) {
    const { error } = await sbClient.from('productos').update(payload).eq('id', editId);
    if (error) { toast('Error al actualizar'); console.error(error); }
    else toast(`${name} actualizado ✓`);
  } else {
    const { error } = await sbClient.from('productos').insert(payload);
    if (error) { toast('Error al guardar'); console.error(error); }
    else toast(`${name} agregado ✓`);
  }

  saveBtn.disabled = false; saveBtn.textContent = 'Guardar';
  closeM('add-modal');
  products = await loadProducts();
  render();
}

async function deleteProduct() {
  if (!isAdmin) return;
  const name = products.find(p => p.id === editId)?.name || 'Producto';
  const { error } = await sbClient.from('productos').delete().eq('id', editId);
  if (error) { toast('Error al eliminar'); return; }
  cart = cart.filter(c => c.id !== editId);
  updateCartUI(); closeM('add-modal');
  products = await loadProducts(); render();
  toast(`${name} eliminado`);
}

// ── Botón Disponible / Agotado ──
function toggleAgotado() {
  pendingAgotado = !pendingAgotado;
  updateStockToggle();
}

function updateStockToggle() {
  const btn = document.getElementById('stock-toggle');
  if (!btn) return;
  if (pendingAgotado) {
    btn.className = 'stock-toggle soldout';
    btn.innerHTML = '<i class="ti ti-circle-x"></i><span id="stock-toggle-txt">Agotado · tocar para marcar disponible</span>';
  } else {
    btn.className = 'stock-toggle available';
    btn.innerHTML = '<i class="ti ti-circle-check"></i><span id="stock-toggle-txt">Disponible · tocar para marcar agotado</span>';
  }
}

// ── Checkout ──
function openCheckout() {
  const ci = document.getElementById('co-items'); ci.innerHTML = '';
  cart.forEach(p => { ci.innerHTML += `<div class="cord"><div class="cnm">${p.name}</div><div class="cpr">$${parseFloat(p.price).toFixed(2)}</div></div>`; });
  const total = cart.reduce((s, p) => s + parseFloat(p.price), 0);
  document.getElementById('co-total').textContent = `$${total.toFixed(2)}`;
  document.getElementById('b-name').value = '';
  document.getElementById('b-addr').value = '';
  selPay('transfer');
  document.getElementById('co-modal').classList.add('open');
}

function selPay(type) {
  payMode = type;
  document.getElementById('opt-t').classList.toggle('sel', type === 'transfer');
  document.getElementById('opt-c').classList.toggle('sel', type === 'cash');
  document.getElementById('addr-f').style.display = type === 'transfer' ? 'block' : 'none';
}

function sendWA() {
  const name = document.getElementById('b-name').value.trim();
  if (!name) { toast('¿Cuál es tu nombre?'); return; }
  const addr  = document.getElementById('b-addr').value.trim();
  const total = cart.reduce((s, p) => s + parseFloat(p.price), 0);
  let msg = `🛍 *Pedido HUB MED*\n\n👤 *Cliente:* ${name}\n`;
  if (payMode === 'transfer' && addr) msg += `📍 *Dirección:* ${addr}\n`;
  msg += `💳 *Pago:* ${payMode === 'transfer' ? 'Transferencia bancaria' : 'Efectivo'}\n\n*Productos:*\n`;
  cart.forEach(p => { msg += `• ${p.name} — $${parseFloat(p.price).toFixed(2)}\n`; });
  msg += `\n💰 *Total: $${total.toFixed(2)} USD*\n\n¡Gracias por tu pedido! 🩺✨`;
  window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
  closeM('co-modal'); cart = []; updateCartUI(); render(); toast('¡Pedido enviado! 🎉');
}

function closeM(id) { document.getElementById(id).classList.remove('open'); }

document.querySelectorAll('.moverlay').forEach(o => {
  o.addEventListener('click', e => { if (e.target === o) o.classList.remove('open'); });
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') document.querySelectorAll('.moverlay.open').forEach(m => m.classList.remove('open'));
  if (e.key === 'Enter' && document.getElementById('login-modal').classList.contains('open')) submitLogin();
});

init();
