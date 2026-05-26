/* ============================================================
   HUB MED — App con Supabase + Cloudinary + Admin Lock
   ============================================================ */

const SUPABASE_URL  = 'https://aqakwecvpkyobscdesxk.supabase.co';
const SUPABASE_KEY  = 'sb_publishable_OmmUeLXZHA16UZBIHVm8PA_-Okp72Xe';
const CLD_CLOUD     = 'dbpetmdmb';
const CLD_PRESET    = 'hubmed_upload';
const WA_NUMBER     = '593987045251';
const ADMIN_HASH    = '7f4a2b9c8e1d6f3a5b0c2e8d4f7a1b9c3e5d7f2a4b6c8e0d2f4a6b8c0e2d4f6'; // hash de Micaela200175

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const CAT_COLOR = { accesorios:'#2176AE', gorros:'#7B2D42', joyeria:'#C8941A', insumos:'#1A7A50' };
const CAT_ICON  = { accesorios:'ti-badge', gorros:'ti-hat', joyeria:'ti-diamond', insumos:'ti-stethoscope' };
const CAT_LBL   = { accesorios:'Accesorios', gorros:'Gorros', joyeria:'Joyería', insumos:'Insumos' };

const SEED = [
  { name:'Pad de sutura',               desc:'Práctica de suturas, esencial para el lab',       price:9,    cat:'accesorios', badge:'must' },
  { name:'Llavero metálico',            desc:'Diseño médico, resistente y cool',                 price:7,    cat:'accesorios', badge:'fav'  },
  { name:'Esferos de goma',             desc:'Grip suave, escritura fluida',                     price:2,    cat:'accesorios', badge:null   },
  { name:'Esferos de huesos',           desc:'Edición especial medicina',                        price:1.5,  cat:'accesorios', badge:'new'  },
  { name:'Porta credenciales "Café"',   desc:'Diseño exclusivo café, identifícate con estilo',   price:7,    cat:'accesorios', badge:'fav'  },
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
let cardUploadId = null;
let payMode      = 'transfer';
let pendingFile  = null;
let isAdmin      = false;

// ── Hash simple para la contraseña ──
async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + '_hubmed_salt_2024');
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// ── Sesión admin ──
function checkAdminSession() {
  const session = sessionStorage.getItem('hubmed_admin');
  if (session === 'true') {
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

// ── Login admin ──
async function handleAdminBtn() {
  if (isAdmin) {
    // Cerrar sesión
    isAdmin = false;
    sessionStorage.removeItem('hubmed_admin');
    updateAdminUI();
    toast('Sesión cerrada');
    return;
  }
  // Abrir modal de login
  document.getElementById('login-modal').classList.add('open');
  setTimeout(() => document.getElementById('admin-password').focus(), 100);
}

async function submitLogin() {
  const pwd = document.getElementById('admin-password').value;
  if (!pwd) return;
  const hash = await hashPassword(pwd);
  const storedHash = await hashPassword('Micaela200175');
  if (hash === storedHash) {
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
  const { data, error } = await supabase
    .from('productos').select('*').order('created_at', { ascending: true });
  if (error) { console.error(error); return []; }
  if (!data || data.length === 0) { await seedProducts(); return loadProducts(); }
  return data;
}

async function seedProducts() {
  const { error } = await supabase.from('productos').insert(SEED);
  if (error) console.error('Seed error:', error);
}

async function init() {
  checkAdminSession();
  document.getElementById('loading-state').style.display = 'flex';
  products = await loadProducts();
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
function render() {
  const grid = document.getElementById('pgrid');
  const list = curFilter === 'all' ? products : products.filter(p => p.cat === curFilter);
  document.getElementById('sec-cnt').textContent = list.length ? `${list.length} producto${list.length !== 1 ? 's' : ''}` : '';
  grid.innerHTML = '';

  list.forEach(p => {
    const inCart = cart.find(c => c.id === p.id);
    const color  = CAT_COLOR[p.cat] || '#2176AE';
    const icon   = CAT_ICON[p.cat]  || 'ti-box';
    const label  = CAT_LBL[p.cat]   || p.cat;
    const badgeHtml = p.badge ? `<div class="cbadge b-${p.badge}">${p.badge==='new'?'Nuevo':p.badge==='fav'?'Fav ♡':'Must have'}</div>` : '';
    const imgHtml = p.img_url
      ? `<img class="cimgreal" src="${p.img_url}" alt="${p.name}" loading="lazy">`
      : `<div class="cimgph" style="background:${color}14">
           <i class="ti ${icon}" style="font-size:44px;color:${color};opacity:0.2"></i>
           <div class="phtxt">Foto próximamente</div>
         </div>`;

    // Overlay de subir foto solo para admin
    const uploadOverlay = isAdmin
      ? `<div class="uplay" onclick="trigCardUpload('${p.id}')">
           <i class="ti ti-photo-up"></i><span>Cambiar foto</span>
         </div>`
      : '';

    // Botón editar solo para admin
    const editBtn = isAdmin
      ? `<button class="editbtn" onclick="openEditModal('${p.id}')"><i class="ti ti-pencil"></i></button>`
      : '';

    const card = document.createElement('div');
    card.className = 'pcard';
    card.innerHTML = `
      ${badgeHtml}
      <div class="cimgw">
        ${imgHtml}
        ${uploadOverlay}
      </div>
      <div class="cbody">
        <div class="ccat" style="color:${color}">${label}</div>
        <div class="cname">${p.name}</div>
        <div class="cdesc">${p.desc || ''}</div>
        <div class="cfoot">
          <div class="cprice">$${parseFloat(p.price).toFixed(2)}<em> USD</em></div>
          <div class="cfoot-btns">
            ${editBtn}
            <button class="addbtn ${inCart ? 'added' : ''}" onclick="toggleCart('${p.id}')">
              <i class="ti ${inCart ? 'ti-check' : 'ti-plus'}"></i>
            </button>
          </div>
        </div>
      </div>`;
    grid.appendChild(card);
  });

  // Plus card solo para admin
  if (isAdmin) {
    const plus = document.createElement('div');
    plus.className = 'plus-card';
    plus.onclick = openAddModal;
    plus.innerHTML = `<i class="ti ti-plus"></i><span>Agregar producto</span>`;
    grid.appendChild(plus);
  }
}

// ── Carrito ──
function toggleCart(id) {
  const p = products.find(x => x.id === id);
  if (!p) return;
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
  editId = null; pendingFile = null;
  document.getElementById('modal-title-text').textContent = '✦ Agregar producto';
  document.getElementById('p-name').value  = '';
  document.getElementById('p-desc').value  = '';
  document.getElementById('p-price').value = '';
  document.getElementById('p-cat').value   = 'accesorios';
  document.getElementById('p-badge').value = '';
  document.getElementById('prev-wrap').style.display = 'none';
  document.getElementById('prev-img').src  = '';
  document.getElementById('del-btn').style.display = 'none';
  document.getElementById('upload-progress').style.display = 'none';
  document.getElementById('add-modal').classList.add('open');
}

function openEditModal(id) {
  if (!isAdmin) return;
  const p = products.find(x => x.id === id);
  if (!p) return;
  editId = id; pendingFile = null;
  document.getElementById('modal-title-text').textContent = '✏ Editar producto';
  document.getElementById('p-name').value  = p.name;
  document.getElementById('p-desc').value  = p.desc || '';
  document.getElementById('p-price').value = p.price;
  document.getElementById('p-cat').value   = p.cat;
  document.getElementById('p-badge').value = p.badge || '';
  document.getElementById('del-btn').style.display = 'inline-block';
  document.getElementById('upload-progress').style.display = 'none';
  if (p.img_url) {
    document.getElementById('prev-img').src = p.img_url;
    document.getElementById('prev-wrap').style.display = 'block';
  } else {
    document.getElementById('prev-wrap').style.display = 'none';
  }
  document.getElementById('add-modal').classList.add('open');
}

document.getElementById('modal-file').addEventListener('change', function () {
  const file = this.files[0]; if (!file) return;
  pendingFile = file;
  const reader = new FileReader();
  reader.onload = e => {
    document.getElementById('prev-img').src = e.target.result;
    document.getElementById('prev-wrap').style.display = 'block';
  };
  reader.readAsDataURL(file);
});

async function saveProduct() {
  if (!isAdmin) return;
  const name  = document.getElementById('p-name').value.trim();
  const price = document.getElementById('p-price').value;
  if (!name || !price) { toast('Nombre y precio son necesarios'); return; }

  const saveBtn = document.getElementById('save-btn');
  saveBtn.disabled = true; saveBtn.textContent = 'Guardando...';

  let img_url = editId ? (products.find(p => p.id === editId)?.img_url || null) : null;

  if (pendingFile) {
    try {
      document.getElementById('upload-progress').style.display = 'block';
      document.getElementById('upload-bar').style.width = '0%';
      document.getElementById('upload-label').textContent = 'Subiendo foto...';
      img_url = await uploadToCloudinary(pendingFile, pct => {
        document.getElementById('upload-bar').style.width = pct + '%';
        document.getElementById('upload-label').textContent = `Subiendo... ${pct}%`;
      });
      document.getElementById('upload-label').textContent = '¡Foto subida! ✓';
    } catch (err) {
      toast('Error subiendo la foto'); saveBtn.disabled = false; saveBtn.textContent = 'Guardar'; return;
    }
  }

  const payload = {
    name, desc: document.getElementById('p-desc').value.trim(),
    price: parseFloat(price), cat: document.getElementById('p-cat').value,
    badge: document.getElementById('p-badge').value || null, img_url,
  };

  if (editId) {
    const { error } = await supabase.from('productos').update(payload).eq('id', editId);
    if (error) { toast('Error al actualizar'); console.error(error); }
    else toast(`${name} actualizado ✓`);
  } else {
    const { error } = await supabase.from('productos').insert(payload);
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
  const { error } = await supabase.from('productos').delete().eq('id', editId);
  if (error) { toast('Error al eliminar'); return; }
  cart = cart.filter(c => c.id !== editId);
  updateCartUI(); closeM('add-modal');
  products = await loadProducts(); render();
  toast(`${name} eliminado`);
}

function trigCardUpload(id) {
  if (!isAdmin) return;
  cardUploadId = id;
  document.getElementById('card-file').click();
}

document.getElementById('card-file').addEventListener('change', async function () {
  const file = this.files[0]; if (!file || !cardUploadId) return;
  toast('Subiendo foto...');
  try {
    const url = await uploadToCloudinary(file, () => {});
    const { error } = await supabase.from('productos').update({ img_url: url }).eq('id', cardUploadId);
    if (error) throw error;
    products = await loadProducts(); render(); toast('Foto actualizada ✓');
  } catch { toast('Error subiendo la foto'); }
  this.value = '';
});

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
