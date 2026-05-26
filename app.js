/* ============================================================
   HUB MED — App Logic
   ============================================================ */

const WA_NUMBER = '593987045251';

const CAT_COLOR = {
  accesorios: '#2176AE',
  gorros:     '#7B2D42',
  joyeria:    '#C8941A',
  insumos:    '#1A7A50',
};

const CAT_ICON = {
  accesorios: 'ti-badge',
  gorros:     'ti-hat',
  joyeria:    'ti-diamond',
  insumos:    'ti-stethoscope',
};

const CAT_LBL = {
  accesorios: 'Accesorios',
  gorros:     'Gorros',
  joyeria:    'Joyería',
  insumos:    'Insumos',
};

/* ── Seed products from PRECIOS_HUB_MED.xlsx ── */
const SEED_PRODUCTS = [
  { id:'s1',  name:'Pad de sutura',                    desc:'Práctica de suturas, esencial para el lab',         price:9,    cat:'accesorios', badge:'must' },
  { id:'s2',  name:'Llavero metálico',                 desc:'Diseño médico, resistente y cool',                  price:7,    cat:'accesorios', badge:'fav'  },
  { id:'s3',  name:'Esferos de goma',                  desc:'Grip suave, escritura fluida',                      price:2,    cat:'accesorios', badge:null   },
  { id:'s4',  name:'Esferos de huesos',                desc:'Edición especial medicina',                         price:1.5,  cat:'accesorios', badge:'new'  },
  { id:'s5',  name:'Porta credenciales "Café"',        desc:'Diseño exclusivo café, identifícate con estilo',    price:7,    cat:'accesorios', badge:'fav'  },
  { id:'s6',  name:'Porta credenciales solo',          desc:'Diseño clásico, funcional y elegante',              price:7,    cat:'accesorios', badge:null   },
  { id:'s7',  name:'Aretes medicina/enfermería',       desc:'Símbolo médico, perfectos para el día a día',       price:2,    cat:'joyeria',    badge:'new'  },
  { id:'s8',  name:'Broches de corazón',               desc:'Pequeño detalle, gran statement',                   price:5,    cat:'joyeria',    badge:null   },
  { id:'s9',  name:'Medias de compresión',             desc:'Comodidad y salud en cada turno',                   price:9,    cat:'accesorios', badge:'must' },
  { id:'s10', name:'Gorro quirúrgico rosado',          desc:'Suave, ajustable, te va a encantar',                price:8,    cat:'gorros',     badge:null   },
  { id:'s11', name:'Gorro quirúrgico dorado',          desc:'Edición especial, brilla en el pabellón',           price:8,    cat:'gorros',     badge:'fav'  },
  { id:'s12', name:'Gorro quirúrgico dentista',        desc:'Diseño dental, para la familia odonto',             price:8,    cat:'gorros',     badge:'new'  },
  { id:'s13', name:'Gorro quirúrgico negro',           desc:'Minimalista y atemporal',                           price:8,    cat:'gorros',     badge:null   },
  { id:'s14', name:'Gorro quirúrgico azul',            desc:'El clásico que nunca falla',                        price:8,    cat:'gorros',     badge:null   },
  { id:'s15', name:'Gorro azul con diseño',            desc:'Azul con detalles únicos, limited edition',         price:8,    cat:'gorros',     badge:'must' },
  { id:'s16', name:'Broche rosado',                    desc:'Accesorio delicado que suma a cualquier look',      price:7,    cat:'joyeria',    badge:null   },
  { id:'s17', name:'Cintillos',                        desc:'Estilo y funcionalidad en un solo accesorio',       price:5,    cat:'accesorios', badge:null   },
  { id:'s18', name:'Aretes edición Gold',              desc:'Brillo sutil, estética premium',                    price:5,    cat:'joyeria',    badge:'new'  },
  { id:'s19', name:'Agua oxigenada 100 ml',            desc:'Antiséptico esencial',                              price:1,    cat:'insumos',    badge:null   },
  { id:'s20', name:'Agua oxigenada 500 ml',            desc:'Presentación familiar',                             price:2.5,  cat:'insumos',    badge:null   },
  { id:'s21', name:'Alcohol 100 ml',                   desc:'Antiséptico concentrado',                           price:1.5,  cat:'insumos',    badge:null   },
  { id:'s22', name:'Alcohol 250 ml',                   desc:'Ideal para prácticas',                              price:2,    cat:'insumos',    badge:null   },
  { id:'s23', name:'Algodón 15 gr',                    desc:'Presentación pequeña',                              price:1,    cat:'insumos',    badge:null   },
  { id:'s24', name:'Algodón 30 gr',                    desc:'Uso frecuente en clínica',                          price:1.5,  cat:'insumos',    badge:null   },
  { id:'s25', name:'Algodón 70 gr',                    desc:'Pack estándar para prácticas',                      price:2.5,  cat:'insumos',    badge:null   },
  { id:'s26', name:'Algodón en motas',                 desc:'Suave, para procedimientos delicados',              price:2.5,  cat:'insumos',    badge:null   },
  { id:'s27', name:'Algodón hospitalario',             desc:'Alta absorción, calidad hospitalaria',              price:10.8, cat:'insumos',    badge:null   },
  { id:'s28', name:'Bata de cirujano x unidad',        desc:'Estéril y lista para usar',                         price:2,    cat:'insumos',    badge:null   },
  { id:'s29', name:'Guantes examinación x100',         desc:'Látex natural, ajuste ergonómico',                  price:4,    cat:'insumos',    badge:'must' },
  { id:'s30', name:'Gorros desechables x100',          desc:'Pack completo para rotaciones',                     price:3.04, cat:'insumos',    badge:null   },
  { id:'s31', name:'Gorro desechable x unidad',        desc:'Cuando solo necesitas uno',                         price:0.2,  cat:'insumos',    badge:null   },
  { id:'s32', name:'Guantes de nitrilo',               desc:'Sin látex, mayor resistencia',                      price:4.5,  cat:'insumos',    badge:'fav'  },
  { id:'s33', name:'Guantes estériles',                desc:'Para procedimientos asépticos',                     price:0.75, cat:'insumos',    badge:null   },
  { id:'s34', name:'Guantes x unidad',                 desc:'Solo uno cuando lo necesitas',                      price:0.15, cat:'insumos',    badge:null   },
  { id:'s35', name:'Hilos dafilon 3/0',                desc:'Sutura no absorbible monofilamento',                price:3,    cat:'insumos',    badge:null   },
  { id:'s36', name:'Hoja de bisturí individual',       desc:'Estéril, uso único',                                price:0.5,  cat:'insumos',    badge:null   },
  { id:'s37', name:'Hojas de bisturí (caja)',          desc:'Pack completo para todo el semestre',               price:22,   cat:'insumos',    badge:'must' },
  { id:'s38', name:'Jeringas',                         desc:'Por unidad, variedad de calibres',                  price:0.1,  cat:'insumos',    badge:null   },
  { id:'s39', name:'Mascarillas con diseño',           desc:'Porque el estilo no para en el lab',                price:2,    cat:'insumos',    badge:'new'  },
  { id:'s40', name:'Mascarilla con diseño x unidad',   desc:'Elige tu favorita',                                 price:0.1,  cat:'insumos',    badge:null   },
  { id:'s41', name:'Mascarilla individual',            desc:'Protección básica diaria',                          price:0.2,  cat:'insumos',    badge:null   },
  { id:'s42', name:'Mascarilla KN95',                  desc:'Mayor filtración, mayor seguridad',                 price:1,    cat:'insumos',    badge:'fav'  },
  { id:'s43', name:'Mascarillas x100',                 desc:'Stock para todo el año',                            price:2.5,  cat:'insumos',    badge:null   },
  { id:'s44', name:'Pad de alcohol',                   desc:'Práctico para cualquier procedimiento',             price:0.5,  cat:'insumos',    badge:null   },
  { id:'s45', name:'Torniquete broche',                desc:'Rápido y seguro, fácil de limpiar',                 price:2.7,  cat:'insumos',    badge:null   },
  { id:'s46', name:'Torniquete látex',                 desc:'Clásico y económico',                               price:1.2,  cat:'insumos',    badge:null   },
  { id:'s47', name:'Zapatones x unidad',               desc:'Cobertura para tu calzado en el pabellón',         price:0.5,  cat:'insumos',    badge:null   },
  { id:'s48', name:'Zapatones x50',                    desc:'Stock completo para rotaciones',                    price:15,   cat:'insumos',    badge:null   },
];

/* ── State ── */
let products  = loadProducts();
let cart      = [];
let curFilter = 'all';
let editId    = null;
let cardUploadId = null;
let payMode   = 'transfer';
let modalImg  = null;

/* ── Persistence ── */
function loadProducts() {
  try {
    const saved = localStorage.getItem('hubmed_products');
    return saved ? JSON.parse(saved) : SEED_PRODUCTS.map(p => ({ ...p, img: null }));
  } catch {
    return SEED_PRODUCTS.map(p => ({ ...p, img: null }));
  }
}

function saveProducts() {
  try { localStorage.setItem('hubmed_products', JSON.stringify(products)); } catch {}
}

/* ── Toast ── */
function toast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2100);
}

/* ── Filters ── */
document.querySelectorAll('.fbtn').forEach(btn => {
  btn.addEventListener('click', () => {
    curFilter = btn.dataset.cat;
    document.querySelectorAll('.fbtn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const titles = { all: 'Todos los productos', accesorios: 'Accesorios', gorros: 'Gorros', joyeria: 'Joyería', insumos: 'Insumos' };
    document.getElementById('sec-title').textContent = titles[curFilter] || curFilter;
    render();
  });
});

/* ── Render grid ── */
function render() {
  const grid = document.getElementById('pgrid');
  const list = curFilter === 'all' ? products : products.filter(p => p.cat === curFilter);
  const cnt  = document.getElementById('sec-cnt');
  cnt.textContent = list.length ? `${list.length} producto${list.length !== 1 ? 's' : ''}` : '';
  grid.innerHTML = '';

  list.forEach(p => {
    const inCart = cart.find(c => c.id === p.id);
    const color  = CAT_COLOR[p.cat] || '#2176AE';
    const icon   = CAT_ICON[p.cat]  || 'ti-box';
    const label  = CAT_LBL[p.cat]   || p.cat;

    const badgeHtml = p.badge
      ? `<div class="cbadge b-${p.badge}">${p.badge === 'new' ? 'Nuevo' : p.badge === 'fav' ? 'Fav ♡' : 'Must have'}</div>`
      : '';

    const imgHtml = p.img
      ? `<img class="cimgreal" src="${p.img}" alt="${p.name}">`
      : `<div class="cimgph" style="background:${color}14">
           <i class="ti ${icon}" style="font-size:44px;color:${color};opacity:0.2" aria-hidden="true"></i>
           <div class="phtxt">Subir foto</div>
         </div>`;

    const card = document.createElement('div');
    card.className = 'pcard';
    card.setAttribute('role', 'listitem');
    card.innerHTML = `
      ${badgeHtml}
      <div class="cimgw">
        ${imgHtml}
        <div class="uplay" onclick="trigUp('${p.id}')" role="button" aria-label="Cambiar foto de ${p.name}">
          <i class="ti ti-photo-up" aria-hidden="true"></i>
          <span>Cambiar foto</span>
        </div>
      </div>
      <div class="cbody">
        <div class="ccat" style="color:${color}">${label}</div>
        <div class="cname">${p.name}</div>
        <div class="cdesc">${p.desc || ''}</div>
        <div class="cfoot">
          <div class="cprice">$${parseFloat(p.price).toFixed(2)}<em> USD</em></div>
          <div class="cfoot-btns">
            <button class="editbtn" onclick="editProduct('${p.id}')" aria-label="Editar ${p.name}">
              <i class="ti ti-pencil" aria-hidden="true"></i>
            </button>
            <button class="addbtn ${inCart ? 'added' : ''}" onclick="toggleCart('${p.id}')" aria-label="${inCart ? 'Quitar del carrito' : 'Agregar al carrito'}">
              <i class="ti ${inCart ? 'ti-check' : 'ti-plus'}" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </div>`;
    grid.appendChild(card);
  });

  // Plus card
  const plus = document.createElement('div');
  plus.className = 'plus-card';
  plus.setAttribute('role', 'button');
  plus.setAttribute('tabindex', '0');
  plus.setAttribute('aria-label', 'Agregar nuevo producto');
  plus.onclick = openAddModal;
  plus.onkeydown = e => { if (e.key === 'Enter') openAddModal(); };
  plus.innerHTML = `<i class="ti ti-plus" aria-hidden="true"></i><span>Agregar producto</span>`;
  grid.appendChild(plus);
}

/* ── Cart ── */
function toggleCart(id) {
  const p = products.find(x => x.id === id);
  if (!p) return;
  const idx = cart.findIndex(c => c.id === id);
  if (idx >= 0) {
    cart.splice(idx, 1);
    toast('Quitado del carrito');
  } else {
    cart.push({ ...p });
    toast(`${p.name} agregado ✓`);
  }
  updateCartUI();
  render();
}

function updateCartUI() {
  const total = cart.reduce((s, p) => s + parseFloat(p.price), 0);
  document.getElementById('cc-lbl').textContent = `${cart.length} producto${cart.length !== 1 ? 's' : ''}`;
  document.getElementById('ct-disp').textContent = `$${total.toFixed(2)}`;
  document.getElementById('co-btn').disabled = cart.length === 0;
}

/* ── Add / Edit modal ── */
function openAddModal() {
  editId   = null;
  modalImg = null;
  document.getElementById('modal-title-text').textContent = '✦ Agregar producto';
  document.getElementById('p-name').value  = '';
  document.getElementById('p-desc').value  = '';
  document.getElementById('p-price').value = '';
  document.getElementById('p-cat').value   = 'accesorios';
  document.getElementById('p-badge').value = '';
  document.getElementById('prev-wrap').style.display = 'none';
  document.getElementById('prev-img').src  = '';
  document.getElementById('del-btn').style.display = 'none';
  document.getElementById('add-modal').classList.add('open');
  setTimeout(() => document.getElementById('p-name').focus(), 100);
}

function editProduct(id) {
  const p = products.find(x => x.id === id);
  if (!p) return;
  editId   = id;
  modalImg = p.img || null;
  document.getElementById('modal-title-text').textContent = '✏ Editar producto';
  document.getElementById('p-name').value  = p.name;
  document.getElementById('p-desc').value  = p.desc || '';
  document.getElementById('p-price').value = p.price;
  document.getElementById('p-cat').value   = p.cat;
  document.getElementById('p-badge').value = p.badge || '';
  document.getElementById('del-btn').style.display = 'inline-block';
  if (p.img) {
    document.getElementById('prev-img').src = p.img;
    document.getElementById('prev-wrap').style.display = 'block';
  } else {
    document.getElementById('prev-wrap').style.display = 'none';
  }
  document.getElementById('add-modal').classList.add('open');
}

function deleteProduct() {
  if (!editId) return;
  const name = products.find(p => p.id === editId)?.name || 'Producto';
  products = products.filter(p => p.id !== editId);
  cart     = cart.filter(c => c.id !== editId);
  saveProducts();
  updateCartUI();
  closeM('add-modal');
  render();
  toast(`${name} eliminado`);
}

function saveProduct() {
  const name  = document.getElementById('p-name').value.trim();
  const price = document.getElementById('p-price').value;
  if (!name || !price) { toast('Nombre y precio son necesarios'); return; }

  if (editId) {
    const p = products.find(x => x.id === editId);
    if (p) {
      p.name  = name;
      p.desc  = document.getElementById('p-desc').value.trim();
      p.price = parseFloat(price);
      p.cat   = document.getElementById('p-cat').value;
      p.badge = document.getElementById('p-badge').value || null;
      if (modalImg) p.img = modalImg;
    }
    toast(`${name} actualizado ✓`);
  } else {
    products.push({
      id:    'u' + Date.now(),
      name,
      desc:  document.getElementById('p-desc').value.trim(),
      price: parseFloat(price),
      cat:   document.getElementById('p-cat').value,
      badge: document.getElementById('p-badge').value || null,
      img:   modalImg || null,
    });
    toast(`${name} agregado al catálogo ✓`);
  }

  saveProducts();
  closeM('add-modal');
  render();
}

/* ── Modal file input ── */
document.getElementById('modal-file').addEventListener('change', function () {
  const file = this.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    modalImg = e.target.result;
    document.getElementById('prev-img').src = e.target.result;
    document.getElementById('prev-wrap').style.display = 'block';
  };
  reader.readAsDataURL(file);
});

/* ── Card photo upload ── */
function trigUp(id) {
  cardUploadId = id;
  document.getElementById('card-file').click();
}

document.getElementById('card-file').addEventListener('change', function () {
  const file = this.files[0];
  if (!file || !cardUploadId) return;
  const reader = new FileReader();
  reader.onload = e => {
    const p = products.find(x => x.id === cardUploadId);
    if (p) {
      p.img = e.target.result;
      saveProducts();
      render();
      toast('Foto actualizada ✓');
    }
  };
  reader.readAsDataURL(file);
  this.value = '';
});

/* ── Checkout ── */
function openCheckout() {
  const ci = document.getElementById('co-items');
  ci.innerHTML = '';
  cart.forEach(p => {
    ci.innerHTML += `<div class="cord"><div class="cnm">${p.name}</div><div class="cpr">$${parseFloat(p.price).toFixed(2)}</div></div>`;
  });
  const total = cart.reduce((s, p) => s + parseFloat(p.price), 0);
  document.getElementById('co-total').textContent = `$${total.toFixed(2)}`;
  document.getElementById('b-name').value  = '';
  document.getElementById('b-addr').value  = '';
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
  closeM('co-modal');
  cart = [];
  updateCartUI();
  render();
  toast('¡Pedido enviado! 🎉');
}

/* ── Close modal ── */
function closeM(id) {
  document.getElementById(id).classList.remove('open');
}

/* Close on overlay click */
document.querySelectorAll('.moverlay').forEach(overlay => {
  overlay.addEventListener('click', e => {
    if (e.target === overlay) overlay.classList.remove('open');
  });
});

/* Close on Escape */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.moverlay.open').forEach(m => m.classList.remove('open'));
  }
});

/* ── Init ── */
render();
