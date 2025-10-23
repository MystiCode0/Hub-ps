// const pricePerHour = 5; // Bilyard üçün saatlıq qiymət
// let sessions = JSON.parse(localStorage.getItem("sessions")) || {};
// let reports = JSON.parse(localStorage.getItem("reports")) || [];
// let currentMenuKabinet = null;

// // --- Kabinetləri yarat ---
// const kabContainer = document.getElementById("kabinetler");
// for (let i = 1; i <= 4; i++) {
//   kabContainer.innerHTML += `
//   <div class="kabinet" id="kab${i}">
//     <h3>Kabinet ${i}</h3>
//     <p>Başlama: <span id="startTime${i}">-</span></p>
//     <p>Bitmə: <span id="endTime${i}">-</span></p>
//     <p>Oyun: <span id="price${i}">0</span> AZN</p>
//     <p>Sifarişlər: <span id="orders${i}">Yoxdur</span></p>
//     <p><b>Ümumi: <span id="total${i}">0</span> AZN</b></p>
//     <button onclick="startSession(${i})">Başla</button>
//     <button onclick="endSession(${i})">Bitir</button>
//     <button onclick="openMenu(${i})">Menyu</button>
//     <button onclick="resetSession(${i})">Sıfırla</button>
//   </div>`;

//   if (sessions[i]) updateSessionDisplay(i);
//   updateCabinetColor(i);
// }

// // --- Bilyard yarat ---
// const bilyardContainer = document.getElementById("bilyard");
// bilyardContainer.innerHTML = `
//   <div class="kabinet" id="bilyard1">
//     <h3>🎱 Bilyard</h3>
//     <p>Başlama: <span id="startTimeB">-</span></p>
//     <p>Bitmə: <span id="endTimeB">-</span></p>
//     <p><b>Qiymət: <span id="priceB">0</span> AZN</b></p>
//     <button onclick="startBilyard()">Başla</button>
//     <button onclick="endBilyard()">Bitir</button>
//     <button onclick="resetBilyard()">Sıfırla</button>
//   </div>
// `;

// if (sessions["bilyard"]) updateBilyardDisplay();

// // --- Fon rəngi ---
// function updateCabinetColor(id) {
//   const kab = document.getElementById("kab" + id);
//   if (sessions[id]?.startTime && !sessions[id]?.ended) kab.style.background = "#1a8cff";
//   else if (sessions[id]?.ended && !sessions[id]?.reset) kab.style.background = "#ff4444";
//   else kab.style.background = "#1e1e2f";
// }

// // --- Yeni qiymət hesabı (kabinetlər üçün) ---
// function calculateCustomPrice(hours) {
//   if (hours <= 1) return 2;
//   else if (hours <= 2) return 2;
//   else if (hours <= 3) return 3;
//   else return 3;
// }

// // --- Başla ---
// function startSession(id) {
//   if (sessions[id]?.startTime && !sessions[id]?.ended) { 
//     alert("Bu kabinet artıq aktivdir!"); 
//     return; 
//   }
//   let start = new Date();
//   sessions[id] = { startTime: start, endTime: null, price: 0, orders: [], orderPrice: 0, ended: false, reset: false };
//   updateSessionDisplay(id);
//   updateCabinetColor(id);
//   localStorage.setItem("sessions", JSON.stringify(sessions));
// }

// // --- Bitir ---
// function endSession(id) {
//   if (!sessions[id]?.startTime || sessions[id]?.ended) { 
//     alert("Əvvəlcə 'Başla' düyməsinə basın!"); 
//     return; 
//   }
//   let end = new Date();
//   let diffMs = end - new Date(sessions[id].startTime);
//   let diffHours = diffMs / (1000 * 60 * 60);
//   let price = calculateCustomPrice(Math.ceil(diffHours));

//   sessions[id].price = price;
//   sessions[id].ended = true;
//   sessions[id].endTime = end;

//   reports.push({
//     kabinet: "Kabinet " + id,
//     start: sessions[id].startTime,
//     end: end,
//     oyun: sessions[id].price,
//     sifaris: sessions[id].orderPrice,
//     total: sessions[id].price + sessions[id].orderPrice
//   });

//   localStorage.setItem("reports", JSON.stringify(reports));
//   updateSessionDisplay(id);
//   updateCabinetColor(id);
//   localStorage.setItem("sessions", JSON.stringify(sessions));
// }

// // --- Sıfırla ---
// function resetSession(id) {
//   sessions[id] = { startTime: null, endTime: null, price: 0, orders: [], orderPrice: 0, ended: false, reset: true };
//   updateSessionDisplay(id);
//   updateCabinetColor(id);
//   localStorage.setItem("sessions", JSON.stringify(sessions));
// }

// // --- Sifariş əlavə ---
// function addOrder(id, item, cost) {
//   if (!sessions[id]?.startTime || sessions[id]?.ended) { 
//     alert("Əvvəlcə kabineti başladın!"); 
//     return; 
//   }
//   sessions[id].orders.push({ name: item, price: cost });
//   sessions[id].orderPrice = (sessions[id].orderPrice || 0) + cost;
//   updateSessionDisplay(id);
//   updateMenuOrders();
//   localStorage.setItem("sessions", JSON.stringify(sessions));
// }

// // --- Sifariş sil ---
// function removeOrder(index) {
//   if (!currentMenuKabinet) return;
//   let orders = sessions[currentMenuKabinet].orders;
//   sessions[currentMenuKabinet].orderPrice -= orders[index].price;
//   orders.splice(index, 1);
//   updateSessionDisplay(currentMenuKabinet);
//   updateMenuOrders();
//   localStorage.setItem("sessions", JSON.stringify(sessions));
// }

// // --- Menu overlay ---
// function updateMenuOrders() {
//   const container = document.getElementById("selectedOrders");
//   container.innerHTML = "";
//   let total = 0;
//   if (sessions[currentMenuKabinet]?.orders) {
//     sessions[currentMenuKabinet].orders.forEach((o, i) => {
//       total += o.price;
//       let div = document.createElement("div");
//       div.className = "order-item";
//       div.innerHTML = `${o.name} - ${o.price} AZN <button onclick="removeOrder(${i})">Sil</button>`;
//       container.appendChild(div);
//     });
//   }
//   document.getElementById("menuTotal").innerText = "Ümumi: " + total + " AZN";
// }

// function openMenu(id) {
//   currentMenuKabinet = id;
//   document.getElementById("menuKabinetTitle").innerText = "Kabinet " + id + " Menyu";
//   document.getElementById("overlayMenu").classList.add("active");
//   updateMenuOrders();
// }

// function closeMenu() {
//   document.getElementById("overlayMenu").classList.remove("active");
// }

// // --- Session display ---
// function updateSessionDisplay(id) {
//   if (!sessions[id]) sessions[id] = { startTime: null, endTime: null, price: 0, orders: [], orderPrice: 0, ended: false, reset: false };

//   document.getElementById("startTime" + id).innerText = sessions[id].startTime 
//     ? new Date(sessions[id].startTime).toLocaleTimeString() 
//     : "-";
//   document.getElementById("endTime" + id).innerText = sessions[id].endTime 
//     ? new Date(sessions[id].endTime).toLocaleTimeString() 
//     : "-";

//   document.getElementById("price" + id).innerText = sessions[id].price || 0;
//   document.getElementById("orders" + id).innerText = sessions[id].orders.length > 0 
//     ? sessions[id].orders.map(o => o.name).join(",") 
//     : "Yoxdur";

//   let total = (sessions[id].price || 0) + (sessions[id].orderPrice || 0);
//   document.getElementById("total" + id).innerText = total;
//   updateCabinetColor(id);
// }

// // --- Bilyard funksiyaları ---
// function startBilyard() {
//   if (sessions["bilyard"]?.startTime && !sessions["bilyard"]?.ended) {
//     alert("Bilyard artıq aktivdir!");
//     return;
//   }
//   let start = new Date();
//   sessions["bilyard"] = { startTime: start, endTime: null, price: 0, ended: false, reset: false };
//   updateBilyardDisplay();
//   localStorage.setItem("sessions", JSON.stringify(sessions));
// }

// function endBilyard() {
//   if (!sessions["bilyard"]?.startTime || sessions["bilyard"]?.ended) {
//     alert("Əvvəlcə 'Başla' düyməsinə basın!");
//     return;
//   }
//   let end = new Date();
//   let diffMs = end - new Date(sessions["bilyard"].startTime);
//   let diffHours = diffMs / (1000 * 60 * 60);
//   let price = Math.ceil(diffHours) * pricePerHour;

//   sessions["bilyard"].price = price;
//   sessions["bilyard"].ended = true;
//   sessions["bilyard"].endTime = end;

//   reports.push({
//     kabinet: "Bilyard",
//     start: sessions["bilyard"].startTime,
//     end: end,
//     oyun: price,
//     sifaris: 0,
//     total: price
//   });

//   localStorage.setItem("reports", JSON.stringify(reports));
//   updateBilyardDisplay();
//   localStorage.setItem("sessions", JSON.stringify(sessions));
// }

// function resetBilyard() {
//   sessions["bilyard"] = { startTime: null, endTime: null, price: 0, ended: false, reset: true };
//   updateBilyardDisplay();
//   localStorage.setItem("sessions", JSON.stringify(sessions));
// }

// function updateBilyardDisplay() {
//   document.getElementById("startTimeB").innerText = sessions["bilyard"]?.startTime
//     ? new Date(sessions["bilyard"].startTime).toLocaleTimeString()
//     : "-";
//   document.getElementById("endTimeB").innerText = sessions["bilyard"]?.endTime
//     ? new Date(sessions["bilyard"].endTime).toLocaleTimeString()
//     : "-";
//   document.getElementById("priceB").innerText = sessions["bilyard"]?.price || 0;
// }

// // --- Hesabat ---
// function showReport(type) {
//   let now = new Date();
//   let filtered = reports.filter(r => {
//     let d = new Date(r.start);
//     if (type === "daily") return d.toDateString() === now.toDateString();
//     else if (type === "weekly") { 
//       let weekAgo = new Date(); 
//       weekAgo.setDate(now.getDate() - 7); 
//       return d >= weekAgo; 
//     } else if (type === "monthly") { 
//       return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear(); 
//     }
//     return false;
//   });

//   let html = `<table>
//     <tr><th>Ad</th><th>Başlama</th><th>Bitmə</th><th>Oyun</th><th>Sifariş</th><th>Ümumi</th><th>Sil</th></tr>`;
//   let totalIncome = 0;
//   filtered.forEach((r, i) => {
//     html += `<tr>
//       <td>${r.kabinet}</td>
//       <td>${new Date(r.start).toLocaleString()}</td>
//       <td>${new Date(r.end).toLocaleString()}</td>
//       <td>${r.oyun} AZN</td>
//       <td>${r.sifaris} AZN</td>
//       <td>${r.total} AZN</td>
//       <td><button onclick="deleteReport(${i})">Sil</button></td>
//     </tr>`;
//     totalIncome += r.total;
//   });
//   html += "</table>";
//   document.getElementById("reportTable").innerHTML = html;
//   document.getElementById("totalIncome").innerText = `💰 Ümumi Gəlir: ${totalIncome} AZN`;
// }

// // --- Hesabat sil ---
// function deleteReport(index) {
//   reports.splice(index, 1);
//   localStorage.setItem("reports", JSON.stringify(reports));
//   showReport('daily');
// }

// function resetReports() {
//   if (confirm("Bütün hesabat məlumatlarını silmək istəyirsiniz?")) {
//     reports = [];
//     localStorage.setItem("reports", JSON.stringify(reports));
//     showReport('daily');
//   }
// }

// // --- Avtomatik yeniləmə ---
// setInterval(() => {
//   for (let id in sessions) {
//     if (sessions[id]?.startTime && !sessions[id]?.ended) {
//       let diffMs = new Date() - new Date(sessions[id].startTime);
//       let diffHours = diffMs / (1000 * 60 * 60);
//       if (id === "bilyard") {
//         sessions[id].price = Math.ceil(diffHours) * pricePerHour;
//         updateBilyardDisplay();
//       } else {
//         sessions[id].price = calculateCustomPrice(Math.ceil(diffHours));
//         updateSessionDisplay(id);
//       }
//     }
//   }
// }, 1000);

// // --- Bütün kabinetləri sıfırla ---
// function resetAllKabinet() {
//   if (!confirm("Bütün kabinetləri sıfırlamaq istəyirsiniz?")) return;

//   for (let i = 1; i <= 4; i++) {
//     sessions[i] = { startTime: null, endTime: null, price: 0, orders: [], orderPrice: 0, ended: false, reset: true };
//     updateSessionDisplay(i);
//     updateCabinetColor(i);
//   }
//   resetBilyard();

//   localStorage.setItem("sessions", JSON.stringify(sessions));
//   alert("Bütün kabinetlər və bilyard sıfırlandı!");
// } 


// document.addEventListener("DOMContentLoaded", () => {
//   const pricePerHour = 5; // Bilyard üçün saatlıq qiymət
//   let sessions = JSON.parse(localStorage.getItem("sessions")) || {};
//   let reports = JSON.parse(localStorage.getItem("reports")) || [];
//   let currentMenuKabinet = null;

//   // element references (gözlənilən HTML elementlərin mövcudluğu)
//   const kabContainer = document.getElementById("kabinetler");
//   const masaContainer = document.getElementById("masalar");
//   const bilyardContainer = document.getElementById("bilyard");
//   const overlayMenu = document.getElementById("overlayMenu");
//   const selectedOrdersContainer = document.getElementById("selectedOrders");
//   const menuTotalEl = document.getElementById("menuTotal");
//   const menuKabinetTitle = document.getElementById("menuKabinetTitle");

//   // --- Kabinetləri yarat (1–4) ---
//   for (let i = 1; i <= 4; i++) {
//     kabContainer.innerHTML += `
//     <div class="kabinet" id="kab${i}">
//       <h3>Kabinet ${i}</h3>
//       <p>Başlama: <span id="startTime${i}">-</span></p>
//       <p>Bitmə: <span id="endTime${i}">-</span></p>
//       <p>Oyun: <span id="price${i}">0</span> AZN</p>
//       <p>Sifarişlər: <span id="orders${i}">Yoxdur</span></p>
//       <p><b>Ümumi: <span id="total${i}">0</span> AZN</b></p>
//       <button onclick="startSession(${i})">Başla</button>
//       <button onclick="endSession(${i})">Bitir</button>
//       <button onclick="openMenu('kab${i}')">Menyu</button>
//       <button onclick="resetSession(${i})">Sıfırla</button>
//     </div>`;
//   }

//   // --- Masaları yarat (6 dənə, saat hesabı olmadan) ---
//   for (let i = 1; i <= 6; i++) {
//     const id = "masa" + i;
//     masaContainer.innerHTML += `
//     <div class="kabinet" id="${id}">
//       <h3>Masa ${i}</h3>
//       <p>Sifarişlər: <span id="orders_${id}">Yoxdur</span></p>
//       <p><b>Ümumi: <span id="total_${id}">0</span> AZN</b></p>
//       <button onclick="startMasa('${id}')">Başla</button>
//       <button onclick="endMasa('${id}')">Bitir</button>
//       <button onclick="openMenu('${id}')">Menyu</button>
//       <button onclick="resetMasa('${id}')">Sıfırla</button>
//     </div>`;
//   }

//   // --- Bilyard yarat ---
//   bilyardContainer.innerHTML = `
//     <div class="kabinet" id="bilyard1">
//       <h3>🎱 Bilyard</h3>
//       <p>Başlama: <span id="startTimeB">-</span></p>
//       <p>Bitmə: <span id="endTimeB">-</span></p>
//       <p><b>Qiymət: <span id="priceB">0</span> AZN</b></p>
//       <p>Sifarişlər: <span id="ordersB">Yoxdur</span></p>
//       <p><b>Ümumi: <span id="totalB">0</span> AZN</b></p>
//       <button onclick="startBilyard()">Başla</button>
//       <button onclick="endBilyard()">Bitir</button>
//       <button onclick="openMenu('bilyard')">Menyu</button>
//       <button onclick="resetBilyard()">Sıfırla</button>
//     </div>
//   `;

//   // --- Helper: save/load ---
//   function saveSessions() {
//     localStorage.setItem("sessions", JSON.stringify(sessions));
//   }
//   function saveReports() {
//     localStorage.setItem("reports", JSON.stringify(reports));
//   }

//   // --- Fon rəngi (kabinetlər üçün) ---
//   function updateCabinetColor(id) {
//     const kabEl = document.getElementById("kab" + id);
//     if (!kabEl) return;
//     if (sessions[id]?.startTime && !sessions[id]?.ended) kabEl.style.background = "#1a8cff";
//     else if (sessions[id]?.ended && !sessions[id]?.reset) kabEl.style.background = "#ff4444";
//     else kabEl.style.background = "#1e1e2f";
//   }

//   // --- Yeni qiymət hesabı (kabinetlər üçün 2-2-3-3) ---
//   function calculateCustomPrice(hours) {
//     if (hours <= 1) return 2;
//     else if (hours <= 2) return 2;
//     else if (hours <= 3) return 3;
//     else return 3;
//   }

//   // --- Kabinet: Başla/Bitir/Sıfırla ---
//   window.startSession = function (id) {
//     if (sessions[id]?.startTime && !sessions[id]?.ended) return alert("Bu kabinet artıq aktivdir!");
//     let start = new Date();
//     sessions[id] = { startTime: start, endTime: null, price: 0, orders: [], orderPrice: 0, ended: false, reset: false };
//     updateSessionDisplay(id);
//     updateCabinetColor(id);
//     saveSessions();
//   };
//   window.endSession = function (id) {
//     if (!sessions[id]?.startTime || sessions[id]?.ended) return alert("Əvvəlcə 'Başla' düyməsinə basın!");
//     let end = new Date();
//     let diffHours = (end - new Date(sessions[id].startTime)) / (1000 * 60 * 60);
//     let price = calculateCustomPrice(Math.ceil(diffHours));
//     sessions[id].price = price;
//     sessions[id].ended = true;
//     sessions[id].endTime = end;

//     // hesabat üçün saxla
//     reports.push({
//       kabinet: "Kabinet " + id,
//       start: sessions[id].startTime,
//       end: end,
//       oyun: sessions[id].price,
//       sifaris: sessions[id].orderPrice || 0,
//       total: sessions[id].price + (sessions[id].orderPrice || 0)
//     });
//     saveReports();

//     updateSessionDisplay(id);
//     updateCabinetColor(id);
//     saveSessions();
//   };
//   window.resetSession = function (id) {
//     sessions[id] = { startTime: null, endTime: null, price: 0, orders: [], orderPrice: 0, ended: false, reset: true };
//     updateSessionDisplay(id);
//     updateCabinetColor(id);
//     saveSessions();
//   };

//   // --- Masalar (yalnız menyu və ümumi məbləğ) ---
//   window.startMasa = function (id) {
//     sessions[id] = sessions[id] || { active: true, orders: [], orderPrice: 0, ended: false };
//     sessions[id].active = true;
//     sessions[id].ended = false;
//     updateMasaDisplay(id);
//     saveSessions();
//   };
//   window.endMasa = function (id) {
//     if (!sessions[id]?.active || sessions[id]?.ended) return alert("Masa aktiv deyil!");
//     sessions[id].ended = true;
//     updateMasaDisplay(id);
//     saveSessions();
//   };
//   window.resetMasa = function (id) {
//     sessions[id] = { active: false, orders: [], orderPrice: 0, ended: false };
//     updateMasaDisplay(id);
//     saveSessions();
//   };
//   function updateMasaDisplay(id) {
//     const masa = sessions[id] || { orders: [], orderPrice: 0 };
//     const ordersEl = document.getElementById("orders_" + id);
//     const totalEl = document.getElementById("total_" + id);
//     if (ordersEl) ordersEl.innerText = masa.orders && masa.orders.length > 0 ? masa.orders.map(o => o.name).join(", ") : "Yoxdur";
//     if (totalEl) totalEl.innerText = (masa.orderPrice || 0);
//   }

//   // --- Bilyard funksiyaları ---
//   window.startBilyard = function () {
//     if (sessions["bilyard"]?.startTime && !sessions["bilyard"]?.ended) return alert("Bilyard artıq aktivdir!");
//     let start = new Date();
//     sessions["bilyard"] = { startTime: start, endTime: null, price: 0, orders: [], orderPrice: 0, ended: false, reset: false };
//     updateBilyardDisplay();
//     saveSessions();
//   };
//   window.endBilyard = function () {
//     if (!sessions["bilyard"]?.startTime || sessions["bilyard"]?.ended) return alert("Əvvəlcə 'Başla' düyməsinə basın!");
//     let end = new Date();
//     let diffHours = (end - new Date(sessions["bilyard"].startTime)) / (1000 * 60 * 60);
//     let price = Math.ceil(diffHours) * pricePerHour;
//     sessions["bilyard"].price = price;
//     sessions["bilyard"].ended = true;
//     sessions["bilyard"].endTime = end;

//     // hesabat
//     reports.push({
//       kabinet: "Bilyard",
//       start: sessions["bilyard"].startTime,
//       end: end,
//       oyun: price,
//       sifaris: sessions["bilyard"].orderPrice || 0,
//       total: price + (sessions["bilyard"].orderPrice || 0)
//     });
//     saveReports();

//     updateBilyardDisplay();
//     saveSessions();
//   };
//   window.resetBilyard = function () {
//     sessions["bilyard"] = { startTime: null, endTime: null, price: 0, orders: [], orderPrice: 0, ended: false, reset: true };
//     updateBilyardDisplay();
//     saveSessions();
//   };
//   function updateBilyardDisplay() {
//     const b = sessions["bilyard"] || { startTime: null, endTime: null, price: 0, orders: [], orderPrice: 0 };
//     const startEl = document.getElementById("startTimeB");
//     const endEl = document.getElementById("endTimeB");
//     const priceEl = document.getElementById("priceB");
//     const ordersEl = document.getElementById("ordersB");
//     const totalEl = document.getElementById("totalB");
//     if (startEl) startEl.innerText = b.startTime ? new Date(b.startTime).toLocaleTimeString() : "-";
//     if (endEl) endEl.innerText = b.endTime ? new Date(b.endTime).toLocaleTimeString() : "-";
//     if (priceEl) priceEl.innerText = (b.price || 0);
//     if (ordersEl) ordersEl.innerText = b.orders && b.orders.length > 0 ? b.orders.map(o => o.name).join(", ") : "Yoxdur";
//     if (totalEl) totalEl.innerText = (b.price || 0) + (b.orderPrice || 0);
//   }

//   // --- Sifariş əlavə/sil (ümumi) ---
//   window.addOrder = function (id, item, cost) {
//     // Kabinet və bilyard üçün tələb: aktiv olmalıdır (start basılmalı)
//     if ((id.startsWith("kab") || id === "bilyard") && (!sessions[id]?.startTime || sessions[id]?.ended)) {
//       return alert("Əvvəlcə kabinet/bilyardu başladın!");
//     }
//     if (!sessions[id]) sessions[id] = { orders: [], orderPrice: 0 };
//     if (!sessions[id].orders) sessions[id].orders = [];
//     sessions[id].orders.push({ name: item, price: cost });
//     sessions[id].orderPrice = (sessions[id].orderPrice || 0) + cost;

//     if (id.startsWith("masa")) updateMasaDisplay(id);
//     else if (id === "bilyard") updateBilyardDisplay();
//     else {
//       updateSessionDisplay(parseInt(id.replace("kab", ""), 10));
//     }
//     updateMenuOrders();
//     saveSessions();
//   };

//   window.removeOrder = function (index) {
//     if (!currentMenuKabinet) return;
//     const id = currentMenuKabinet;
//     const orders = sessions[id]?.orders;
//     if (!orders || !orders[index]) return;
//     sessions[id].orderPrice = (sessions[id].orderPrice || 0) - orders[index].price;
//     orders.splice(index, 1);

//     if (id.startsWith("masa")) updateMasaDisplay(id);
//     else if (id === "bilyard") updateBilyardDisplay();
//     else updateSessionDisplay(parseInt(id.replace("kab", ""), 10));

//     updateMenuOrders();
//     saveSessions();
//   };

//   // --- Menyu overlay ---
//   window.openMenu = function (id) {
//     currentMenuKabinet = id;
//     if (menuKabinetTitle) {
//       if (id.startsWith("masa")) menuKabinetTitle.innerText = id.replace("masa", "Masa ");
//       else if (id === "bilyard") menuKabinetTitle.innerText = "Bilyard Menyu";
//       else if (id.startsWith("kab")) menuKabinetTitle.innerText = "Kabinet " + id.replace("kab", "");
//       else menuKabinetTitle.innerText = id;
//     }
//     if (overlayMenu) overlayMenu.classList.add("active");
//     updateMenuOrders();
//   };
//   window.closeMenu = function () {
//     if (overlayMenu) overlayMenu.classList.remove("active");
//     currentMenuKabinet = null;
//   };

//   function updateMenuOrders() {
//     if (!selectedOrdersContainer || !menuTotalEl) return;
//     selectedOrdersContainer.innerHTML = "";
//     let total = 0;
//     if (sessions[currentMenuKabinet]?.orders) {
//       sessions[currentMenuKabinet].orders.forEach((o, i) => {
//         total += o.price;
//         const div = document.createElement("div");
//         div.className = "order-item";
//         div.innerHTML = `${o.name} - ${o.price} AZN <button onclick="removeOrder(${i})">Sil</button>`;
//         selectedOrdersContainer.appendChild(div);
//       });
//     }
//     menuTotalEl.innerText = "Ümumi: " + total + " AZN";
//   }

//   // --- Session display (kabinetlər) ---
//   function updateSessionDisplay(id) {
//     if (!sessions[id]) sessions[id] = { startTime: null, endTime: null, price: 0, orders: [], orderPrice: 0, ended: false, reset: false };
//     const s = sessions[id];
//     const startEl = document.getElementById("startTime" + id);
//     const endEl = document.getElementById("endTime" + id);
//     const priceEl = document.getElementById("price" + id);
//     const ordersEl = document.getElementById("orders" + id);
//     const totalEl = document.getElementById("total" + id);

//     if (startEl) startEl.innerText = s.startTime ? new Date(s.startTime).toLocaleTimeString() : "-";
//     if (endEl) endEl.innerText = s.endTime ? new Date(s.endTime).toLocaleTimeString() : "-";
//     if (priceEl) priceEl.innerText = s.price || 0;
//     if (ordersEl) ordersEl.innerText = s.orders && s.orders.length > 0 ? s.orders.map(o => o.name).join(", ") : "Yoxdur";
//     if (totalEl) totalEl.innerText = (s.price || 0) + (s.orderPrice || 0);
//   }

//   // --- Hesabat (mövcud) ---
//   window.showReport = function (type) {
//     const reportTable = document.getElementById("reportTable");
//     const totalIncomeEl = document.getElementById("totalIncome");
//     let now = new Date();
//     let filtered = reports.filter(r => {
//       let d = new Date(r.start);
//       if (type === "daily") return d.toDateString() === now.toDateString();
//       else if (type === "weekly") { let weekAgo = new Date(); weekAgo.setDate(now.getDate() - 7); return d >= weekAgo; }
//       else if (type === "monthly") { return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear(); }
//       return false;
//     });

//     let html = `<table>
//       <tr><th>Ad</th><th>Başlama</th><th>Bitmə</th><th>Oyun</th><th>Sifariş</th><th>Ümumi</th><th>Sil</th></tr>`;
//     let totalIncome = 0;
//     filtered.forEach((r, i) => {
//       html += `<tr>
//         <td>${r.kabinet}</td>
//         <td>${new Date(r.start).toLocaleString()}</td>
//         <td>${new Date(r.end).toLocaleString()}</td>
//         <td>${r.oyun} AZN</td>
//         <td>${r.sifaris} AZN</td>
//         <td>${r.total} AZN</td>
//         <td><button onclick="deleteReport(${i})">Sil</button></td>
//       </tr>`;
//       totalIncome += r.total;
//     });
//     html += "</table>";
//     if (reportTable) reportTable.innerHTML = html;
//     if (totalIncomeEl) totalIncomeEl.innerText = `💰 Ümumi Gəlir: ${totalIncome} AZN`;
//   };

//   window.deleteReport = function (index) {
//     reports.splice(index, 1);
//     saveReports();
//     showReport('daily');
//   };
//   window.resetReports = function () {
//     if (confirm("Bütün hesabat məlumatlarını silmək istəyirsiniz?")) {
//       reports = [];
//       saveReports();
//       showReport('daily');
//     }
//   };

//   // --- Saat yeniləməsi (avtomatik) ---
//   setInterval(() => {
//     for (let id in sessions) {
//       if (sessions[id]?.startTime && !sessions[id]?.ended) {
//         let diffHours = (new Date() - new Date(sessions[id].startTime)) / (1000 * 60 * 60);
//         if (id === "bilyard") {
//           sessions[id].price = Math.ceil(diffHours) * pricePerHour;
//           updateBilyardDisplay();
//         } else if (id.toString().startsWith("kab")) {
//           sessions[id].price = calculateCustomPrice(Math.ceil(diffHours));
//           updateSessionDisplay(id);
//         }
//         // masalar heç vaxt saatla hesablanmır
//       }
//     }
//     saveSessions();
//   }, 1000);

//   // --- Hamısını sıfırla ---
//   window.resetAllKabinet = function () {
//     if (!confirm("Bütün məlumatları sıfırlamaq istəyirsiniz?")) return;
//     for (let i = 1; i <= 4; i++) resetSession(i);
//     for (let i = 1; i <= 6; i++) resetMasa("masa" + i);
//     resetBilyard();
//     saveSessions();
//     alert("Bütün kabinetlər, masalar və bilyard sıfırlandı!");
//   };

//   // --- İlk yükləmədə mövcud session məlumatlarını göstər ---
//   // kabinetlər
//   for (let i = 1; i <= 4; i++) {
//     if (sessions[i]) updateSessionDisplay(i);
//     updateCabinetColor(i);
//   }
//   // masalar
//   for (let i = 1; i <= 6; i++) {
//     updateMasaDisplay("masa" + i);
//   }
//   // bilyard
//   updateBilyardDisplay();

//   // expose currentMenuKabinet for debugging in console (optional)
//   window._getCurrentMenu = () => currentMenuKabinet;
// });

const pricePerHour = 5; // Bilyard üçün saatlıq qiymət
let sessions = JSON.parse(localStorage.getItem("sessions")) || {};
let reports = JSON.parse(localStorage.getItem("reports")) || [];
let currentMenuKabinet = null;

// --- Kabinetlər ---
const kabContainer = document.getElementById("kabinetler");
for (let i = 1; i <= 4; i++) {
  kabContainer.innerHTML += `
    <div class="kabinet" id="kab${i}">
      <h3>Kabinet ${i}</h3>
      <p>Başlama: <span id="startTime${i}">-</span></p>
      <p>Bitmə: <span id="endTime${i}">-</span></p>
      <p>Oyun: <span id="price${i}">0</span> AZN</p>
      <p>Sifarişlər: <span id="orders${i}">Yoxdur</span></p>
      <p><b>Ümumi: <span id="total${i}">0</span> AZN</b></p>
      <button onclick="startSession(${i})">Başla</button>
      <button onclick="endSession(${i})">Bitir</button>
      <button onclick="openMenu(${i})">Menyu</button>
      <button onclick="resetSession(${i})">Sıfırla</button>
    </div>
  `;
  if (sessions[i]) updateSessionDisplay(i);
  updateCabinetColor(i);
}

// --- Bilyard ---
const bilyardContainer = document.getElementById("bilyard");
bilyardContainer.innerHTML = `
  <div class="kabinet" id="bilyard1">
    <h3>🎱 Bilyard</h3>
    <p>Başlama: <span id="startTimeB">-</span></p>
    <p>Bitmə: <span id="endTimeB">-</span></p>
    <p><b>Qiymət: <span id="priceB">0</span> AZN</b></p>
    <p>Sifarişlər: <span id="ordersB">Yoxdur</span></p>
    <p><b>Ümumi: <span id="totalB">0</span> AZN</b></p>
    <button onclick="startBilyard()">Başla</button>
    <button onclick="endBilyard()">Bitir</button>
    <button onclick="openMenu('bilyard')">Menyu</button>
    <button onclick="resetBilyard()">Sıfırla</button>
  </div>
`;
if (sessions["bilyard"]) updateBilyardDisplay();

// --- Masalar ---
const masaContainer = document.getElementById("masalar");
for (let i = 1; i <= 6; i++) {
  masaContainer.innerHTML += `
    <div class="kabinet" id="masa${i}">
      <h3>Masa ${i}</h3>
      <p>Başlama: <span id="startTimeM${i}">-</span></p>
      <p>Bitmə: <span id="endTimeM${i}">-</span></p>
      <p>Sifarişlər: <span id="ordersM${i}">Yoxdur</span></p>
      <p><b>Ümumi: <span id="totalM${i}">0</span> AZN</b></p>
      <button onclick="startMasa(${i})">Başla</button>
      <button onclick="endMasa(${i})">Bitir</button>
      <button onclick="openMenu('masa' + ${i})">Menyu</button>
      <button onclick="resetMasa(${i})">Sıfırla</button>
    </div>
  `;
  if (sessions['masa' + i]) updateMasaDisplay(i);
}

// --- Fon rəngi ---
function updateCabinetColor(id) {
  const kab = document.getElementById("kab" + id);
  if (!kab) return;
  if (sessions[id]?.startTime && !sessions[id]?.ended) kab.style.background = "#1a8cff";
  else if (sessions[id]?.ended && !sessions[id]?.reset) kab.style.background = "#ff4444";
  else kab.style.background = "#1e1e2f";
}

// --- Kabinet qiymət hesabı (2–2–3–3) ---
function calculateCustomPrice(hours) {
  // Kabinetlər üçün saatlıq qiymət qaydası
  switch(hours) {
    case 1:
      return 2;
    case 2:
      return 2;
    case 3:
      return 3;
    case 4:
      return 3;
    default:
      return 3; // 4 saatdan çox üçün də 3 AZN
  }
}


// --- Kabinet funksiyaları ---
function startSession(id){
  if (sessions[id]?.startTime && !sessions[id]?.ended) { alert("Bu kabinet artıq aktivdir!"); return; }
  let start = new Date();
  sessions[id] = { startTime:start, endTime:null, price:0, orders:[], orderPrice:0, ended:false, reset:false };
  updateSessionDisplay(id); updateCabinetColor(id);
  localStorage.setItem("sessions", JSON.stringify(sessions));
}

function endSession(id){
  if (!sessions[id]?.startTime || sessions[id]?.ended) { alert("Əvvəlcə 'Başla' düyməsinə basın!"); return; }
  let end = new Date();
  let diffMs = end - new Date(sessions[id].startTime);
  let diffHours = diffMs/(1000*60*60);
  let price = calculateCustomPrice(Math.ceil(diffHours), id);
  sessions[id].price = price;
  sessions[id].ended = true;
  sessions[id].endTime = end;
  reports.push({kabinet:"Kabinet "+id, start:sessions[id].startTime, end:end, oyun:price, sifaris:sessions[id].orderPrice, total:price+sessions[id].orderPrice});
  updateSessionDisplay(id); updateCabinetColor(id);
  localStorage.setItem("sessions", JSON.stringify(sessions));
  localStorage.setItem("reports", JSON.stringify(reports));
}

function resetSession(id){
  sessions[id] = { startTime:null, endTime:null, price:0, orders:[], orderPrice:0, ended:false, reset:true };
  updateSessionDisplay(id); updateCabinetColor(id);
  localStorage.setItem("sessions", JSON.stringify(sessions));
}

function updateSessionDisplay(id){
  if (!sessions[id]) return;
  document.getElementById("startTime"+id).innerText = sessions[id].startTime?new Date(sessions[id].startTime).toLocaleTimeString():"-";
  document.getElementById("endTime"+id).innerText = sessions[id].endTime?new Date(sessions[id].endTime).toLocaleTimeString():"-";
  document.getElementById("price"+id).innerText = sessions[id].price||0;
  document.getElementById("orders"+id).innerText = sessions[id].orders.length>0?sessions[id].orders.map(o=>o.name).join(","):"Yoxdur";
  document.getElementById("total"+id).innerText = (sessions[id].price||0)+(sessions[id].orderPrice||0);
}

// --- Bilyard funksiyaları ---
function startBilyard(){
  if (sessions["bilyard"]?.startTime && !sessions["bilyard"]?.ended) { alert("Bilyard artıq aktivdir!"); return; }
  let start = new Date();
  sessions["bilyard"] = { startTime:start, endTime:null, price:0, orders:[], orderPrice:0, ended:false, reset:false };
  updateBilyardDisplay(); localStorage.setItem("sessions", JSON.stringify(sessions));
}
function endBilyard(){
  if (!sessions["bilyard"]?.startTime || sessions["bilyard"]?.ended) { alert("Əvvəlcə 'Başla' düyməsinə basın!"); return; }
  let end = new Date();
  let diffMs = end - new Date(sessions["bilyard"].startTime);
  let diffHours = diffMs/(1000*60*60);
  let price = Math.ceil(diffHours)*pricePerHour;
  sessions["bilyard"].price = price; sessions["bilyard"].ended = true; sessions["bilyard"].endTime = end;
  reports.push({kabinet:"Bilyard", start:sessions["bilyard"].startTime, end:end, oyun:price, sifaris:sessions["bilyard"].orderPrice, total:price+sessions["bilyard"].orderPrice});
  updateBilyardDisplay(); localStorage.setItem("sessions", JSON.stringify(sessions)); localStorage.setItem("reports", JSON.stringify(reports));
}
function resetBilyard(){
  sessions["bilyard"]={startTime:null,endTime:null,price:0,orders:[],orderPrice:0,ended:false,reset:true};
  updateBilyardDisplay(); localStorage.setItem("sessions", JSON.stringify(sessions));
}
function updateBilyardDisplay(){
  document.getElementById("startTimeB").innerText = sessions["bilyard"]?.startTime?new Date(sessions["bilyard"].startTime).toLocaleTimeString():"-";
  document.getElementById("endTimeB").innerText = sessions["bilyard"]?.endTime?new Date(sessions["bilyard"].endTime).toLocaleTimeString():"-";
  document.getElementById("priceB").innerText = sessions["bilyard"]?.price||0;
  document.getElementById("ordersB").innerText = sessions["bilyard"]?.orders.length>0?sessions["bilyard"].orders.map(o=>o.name).join(","):"Yoxdur";
  document.getElementById("totalB").innerText = (sessions["bilyard"]?.price||0)+(sessions["bilyard"]?.orderPrice||0);
}

// --- Masa funksiyaları ---
function startMasa(i){
  let id = 'masa'+i;
  if (sessions[id]?.startTime && !sessions[id]?.ended) { alert("Masa artıq aktivdir!"); return; }
  let start = new Date();
  sessions[id] = { startTime:start, endTime:null, price:0, orders:[], orderPrice:0, ended:false, reset:false };
  updateMasaDisplay(i); localStorage.setItem("sessions", JSON.stringify(sessions));
}
function endMasa(i){
  let id='masa'+i;
  if (!sessions[id]?.startTime || sessions[id]?.ended) { alert("Əvvəlcə 'Başla' düyməsinə basın!"); return; }
  sessions[id].ended=true; sessions[id].endTime=new Date();
  reports.push({kabinet:"Masa "+i, start:sessions[id].startTime, end:sessions[id].endTime, oyun:0, sifaris:sessions[id].orderPrice, total:sessions[id].orderPrice});
  updateMasaDisplay(i); localStorage.setItem("sessions", JSON.stringify(sessions)); localStorage.setItem("reports", JSON.stringify(reports));
}
function resetMasa(i){
  let id='masa'+i;
  sessions[id]={startTime:null,endTime:null,price:0,orders:[],orderPrice:0,ended:false,reset:true};
  updateMasaDisplay(i); localStorage.setItem("sessions", JSON.stringify(sessions));
}
function updateMasaDisplay(i){
  let id='masa'+i;
  document.getElementById("startTimeM"+i).innerText=sessions[id]?.startTime?new Date(sessions[id].startTime).toLocaleTimeString():"-";
  document.getElementById("endTimeM"+i).innerText=sessions[id]?.endTime?new Date(sessions[id].endTime).toLocaleTimeString():"-";
  document.getElementById("ordersM"+i).innerText=sessions[id]?.orders.length>0?sessions[id].orders.map(o=>o.name).join(","):"Yoxdur";
  document.getElementById("totalM"+i).innerText=(sessions[id]?.orderPrice||0);
}

// --- Menu funksiyaları ---
function addOrder(id, item, cost){
  if(!sessions[id]?.startTime || sessions[id]?.ended){alert("Əvvəlcə bu kabineti/massanı başladın!"); return;}
  sessions[id].orders.push({name:item, price:cost});
  sessions[id].orderPrice=(sessions[id].orderPrice||0)+cost;
  if(id==='bilyard') updateBilyardDisplay();
  else if(id.startsWith('masa')) updateMasaDisplay(parseInt(id.replace('masa','')));
  else updateSessionDisplay(id);
  updateMenuOrders(); localStorage.setItem("sessions", JSON.stringify(sessions));
}

function removeOrder(index){
  if(!currentMenuKabinet) return;
  let orders=sessions[currentMenuKabinet].orders;
  sessions[currentMenuKabinet].orderPrice-=orders[index].price;
  orders.splice(index,1);
  if(currentMenuKabinet==='bilyard') updateBilyardDisplay();
  else if(currentMenuKabinet.startsWith('masa')) updateMasaDisplay(parseInt(currentMenuKabinet.replace('masa','')));
  else updateSessionDisplay(currentMenuKabinet);
  updateMenuOrders(); localStorage.setItem("sessions", JSON.stringify(sessions));
}

function openMenu(id){
  currentMenuKabinet=id;
  document.getElementById("menuKabinetTitle").innerText=(id==='bilyard'?'Bilyard':id.startsWith('masa')?'Masa '+id.replace('masa',''):'Kabinet '+id)+' Menyu';
  document.getElementById("overlayMenu").classList.add("active");
  updateMenuOrders();
}

function closeMenu(){document.getElementById("overlayMenu").classList.remove("active");}
function updateMenuOrders(){
  const container=document.getElementById("selectedOrders"); container.innerHTML="";
  let total=0;
  if(sessions[currentMenuKabinet]?.orders){
    sessions[currentMenuKabinet].orders.forEach((o,i)=>{
      total+=o.price;
      let div=document.createElement("div"); div.className="order-item";
      div.innerHTML=`${o.name} - ${o.price} AZN <button onclick="removeOrder(${i})">Sil</button>`;
      container.appendChild(div);
    });
  }
  document.getElementById("menuTotal").innerText="Ümumi: "+total+" AZN";
}

// --- Hesabat funksiyaları ---
function showReport(type){
  let now=new Date();
  let filtered=reports.filter(r=>{
    let d=new Date(r.start);
    if(type==='daily') return d.toDateString()===now.toDateString();
    if(type==='weekly'){let weekAgo=new Date(); weekAgo.setDate(now.getDate()-7); return d>=weekAgo;}
    if(type==='monthly') return d.getMonth()===now.getMonth() && d.getFullYear()===now.getFullYear();
    return false;
  });
  let html=`<table><tr><th>Ad</th><th>Başlama</th><th>Bitmə</th><th>Oyun</th><th>Sifariş</th><th>Ümumi</th><th>Sil</th></tr>`;
  let totalIncome=0;
  filtered.forEach((r,i)=>{
    html+=`<tr><td>${r.kabinet}</td><td>${new Date(r.start).toLocaleString()}</td><td>${new Date(r.end).toLocaleString()}</td><td>${r.oyun} AZN</td><td>${r.sifaris} AZN</td><td>${r.total} AZN</td><td><button onclick="deleteReport(${i})">Sil</button></td></tr>`;
    totalIncome+=r.total;
  });
  html+="</table>";
  document.getElementById("reportTable").innerHTML=html;
  document.getElementById("totalIncome").innerText=`💰 Ümumi Gəlir: ${totalIncome} AZN`;
}
function deleteReport(i){reports.splice(i,1); localStorage.setItem("reports",JSON.stringify(reports)); showReport('daily');}
function resetReports(){if(confirm("Bütün hesabat məlumatlarını silmək istəyirsiniz?")){reports=[]; localStorage.setItem("reports",JSON.stringify(reports)); showReport('daily');}}

// --- Avtomatik yeniləmə ---
setInterval(()=>{
  for(let id in sessions){
    if(sessions[id]?.startTime && !sessions[id]?.ended){
      let diffMs=new Date()-new Date(sessions[id].startTime);
      let diffHours=diffMs/(1000*60*60);
      if(id==='bilyard') {sessions[id].price=Math.ceil(diffHours)*pricePerHour; updateBilyardDisplay();}
      else if(id.startsWith('masa')) continue; // masalar saatla qiymət hesablamır
      else sessions[id].price=calculateCustomPrice(Math.ceil(diffHours),id); updateSessionDisplay(id);
    }
  }
},1000);

// --- Bütün kabinetləri sıfırla ---
function resetAllKabinet(){
  if(!confirm("Bütün kabinetləri sıfırlamaq istəyirsiniz?")) return;
  for(let i=1;i<=4;i++){sessions[i]={startTime:null,endTime:null,price:0,orders:[],orderPrice:0,ended:false,reset:true}; updateSessionDisplay(i); updateCabinetColor(i);}
  for(let i=1;i<=6;i++){sessions['masa'+i]={startTime:null,endTime:null,price:0,orders:[],orderPrice:0,ended:false,reset:true}; updateMasaDisplay(i);}
  resetBilyard(); localStorage.setItem("sessions",JSON.stringify(sessions)); alert("Bütün kabinetlər, masalar və bilyard sıfırlandı!"); 
}


function openMenu(id){
  currentMenuKabinet = id.toString(); // həmişə string
  document.getElementById("menuKabinetTitle").innerText =
    currentMenuKabinet === "bilyard" ? "Bilyard Menyu" :
    currentMenuKabinet.startsWith("masa") ? "Masa " + currentMenuKabinet.replace("masa","") + " Menyu" :
    "Kabinet " + currentMenuKabinet + " Menyu";
  document.getElementById("overlayMenu").classList.add("active");
  updateMenuOrders();
}

function addOrder(id, item, cost){
  let idStr = id.toString(); // həmişə string
  if(!sessions[idStr]?.startTime || sessions[idStr]?.ended){
    alert("Əvvəlcə bu kabineti/massanı başladın!"); 
    return;
  }
  sessions[idStr].orders.push({name:item, price:cost});
  sessions[idStr].orderPrice = (sessions[idStr].orderPrice || 0) + cost;

  if(idStr === "bilyard") updateBilyardDisplay();
  else if(idStr.startsWith("masa")) updateMasaDisplay(parseInt(idStr.replace("masa","")));
  else updateSessionDisplay(parseInt(idStr));

  updateMenuOrders();
  localStorage.setItem("sessions", JSON.stringify(sessions));
}
