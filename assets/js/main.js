const animals = [
  {n:'Lion', e:'🦁', h:'Savanna', t:'Africa\'s apex predator lives in prides and hunts mostly at dusk and dawn.', f:['Sleeps up to 20 hours a day','Roar carries about 8 km','Lionesses do most of the hunting']},
  {n:'Elephant', e:'🐘', h:'Savanna', t:'The largest land animal. Herds are led by an older female, the matriarch.', f:['Can eat 150 kg of plants a day','Pregnant for about 22 months','Communicates with low rumbles']},
  {n:'Giraffe', e:'🦒', h:'Savanna', t:'Tallest animal on Earth, browsing treetops that no one else can reach.', f:['Up to 5.5 m tall','Same seven neck bones as humans','Sleeps only a few minutes at a time']},
  {n:'Zebra', e:'🦓', h:'Savanna', t:'Every zebra has its own stripe pattern, like a fingerprint.', f:['Runs up to 65 km/h','Joins the great migration','Stripes may deter biting flies']},
  {n:'Rhino', e:'🦏', h:'Savanna', t:'A critically threatened giant. Anti-poaching patrols protect the remaining herds.', f:['Horn is made of keratin','Weighs up to 2,300 kg','Poor eyesight, excellent hearing']},
  {n:'Hippo', e:'🦛', h:'River', t:'Spends the day in water to stay cool and comes out at night to graze.', f:['Can hold its breath 5 minutes','Runs faster than a human on land','Sweat acts as natural sunscreen']},
  {n:'Crocodile', e:'🐊', h:'River', t:'Ambush hunter that waits almost motionless at the water\'s edge.', f:['Has barely changed in millions of years','Bite is among the strongest of any animal','Mothers carry hatchlings in their mouths']},
  {n:'Flamingo', e:'🦩', h:'River', t:'Gathers by the thousands on shallow lakes and filters food with its beak.', f:['Pink colour comes from its food','Often stands on one leg','Feeds with its head upside down']},
  {n:'Gorilla', e:'🦍', h:'Forest', t:'Gentle, intelligent and social. A silverback leads each family group.', f:['Shares about 98% of DNA with humans','Builds a new nest every night','Mostly eats leaves and stems']},
  {n:'Leopard', e:'🐆', h:'Forest', t:'Shy and solitary. Drags its prey up into trees to eat in peace.', f:['Each spot pattern is unique','Strong enough to carry prey twice its weight','Most active at night']},
  {n:'Eagle', e:'🦅', h:'Sky', t:'Sharp-eyed hunter, often seen perched on a lone acacia tree.', f:['Sees prey from over 3 km away','Dives at more than 150 km/h','Pairs often mate for life']},
  {n:'Owl', e:'🦉', h:'Sky', t:'Silent night flyer that hunts by sound as much as by sight.', f:['Can turn its head about 270 degrees','Feathers muffle wing noise','Swallows small prey whole']}
];
const parks = [
  {n:'Serengeti', c:'Tanzania', d:'Home of the great wildebeest migration and big cat country.', cost:420},
  {n:'Maasai Mara', c:'Kenya', d:'Open plains, river crossings and Maasai culture.', cost:380},
  {n:'Kruger', c:'South Africa', d:'Easy self-drive safaris and all of the Big Five.', cost:240},
  {n:'Bwindi', c:'Uganda', d:'Misty forest trekking to meet mountain gorillas.', cost:520}
];

const $ = id => document.getElementById(id);
const habitats = ['All', ...new Set(animals.map(a => a.h))];
let current = 'All';

function renderFilters(){
  $('filters').innerHTML = habitats.map(h =>
    `<button class="chip" aria-pressed="${h===current}" data-h="${h}">${h}</button>`).join('');
}
function renderGrid(){
  $('grid').innerHTML = animals.map((a,i) => ({a,i})).filter(({a}) => current==='All' || a.h===current).map(({a,i}) =>
    `<button class="card" data-i="${i}"><div class="e">${a.e}</div><h3>${a.n}</h3><small>${a.h}</small></button>`).join('');
}
$('filters').addEventListener('click', e => {
  const b = e.target.closest('.chip'); if(!b) return;
  current = b.dataset.h; renderFilters(); renderGrid();
});
$('grid').addEventListener('click', e => {
  const c = e.target.closest('.card'); if(!c) return;
  const a = animals[c.dataset.i];
  $('mEmoji').textContent = a.e; $('mName').textContent = a.n; $('mText').textContent = a.t;
  $('mFacts').innerHTML = a.f.map(f => `<li>${f}</li>`).join('');
  $('modal').showModal();
});
$('close').onclick = () => $('modal').close();
$('modal').addEventListener('click', e => { if(e.target === $('modal')) $('modal').close(); });

$('parks-list').innerHTML = parks.map(p =>
  `<article class="park"><h3>${p.n}</h3><div class="where">${p.c}</div><p>${p.d}</p></article>`).join('');
$('park').innerHTML = parks.map((p,i) => `<option value="${i}">${p.n}, ${p.c}</option>`).join('');

function plan(){
  const p = parks[$('park').value], d = +$('days').value, n = +$('ppl').value;
  $('daysOut').textContent = d; $('pplOut').textContent = n;
  $('cost').textContent = '$' + (p.cost * d * n).toLocaleString();
  $('tip').textContent = `About $${p.cost} per person per day in ${p.n}, covering lodging, park fees and game drives. Flights are not included.`;
}
['park','days','ppl'].forEach(id => $(id).addEventListener('input', plan));

// Hero parallax
const layers = document.querySelectorAll('.layer');
$('hero').addEventListener('mousemove', e => {
  const x = (e.clientX / innerWidth - .5), y = (e.clientY / innerHeight - .5);
  layers.forEach(l => { const d = +l.dataset.depth; l.style.transform = `translate(${-x*d}px, ${-y*d/2}px)`; });
});

renderFilters(); renderGrid(); plan();
