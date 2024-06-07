window.addEventListener('load', ()=>{

  window.addEventListener('click', (e)=>{
    switch (e.target.id) {
      case 'resetRotationButton':
        resetRotation();
      break;
      case 'originalButton': 
        openOriginal();
      break;
      case 'flatOrVolumetricButton':
        toggleVolumetric(e);
      break;
    }
  });

function resetRotation(){
	table.style.transform = 'rotate3d(0, 0, 0, 0deg)';
}


function openOriginal(){
	window.open('https://i.redd.it/lfu55nvvpoq01.jpg');
};

function toggleVolumetric(e){
  if (table.classList.contains('volumetric')) {
    table.classList.remove('volumetric');
    e.target.innerText = 'Enable Volumetric';
  } else {
    table.classList.add('volumetric');
    e.target.innerText = 'Disable Volumetric';
  }
};

window.addEventListener('mousemove', setRotationOnMove);
window.addEventListener('touchmove', setRotationOnMove, {passive: false});

window.addEventListener("deviceorientation", handleOrientation);

function handleOrientation(e) {
  let x = e.beta == 90 ? 360 : 90 - e.beta;
  let y = e.gamma;
  let z = e.alpha * -1;

  if (e.gamma >= 0) {
    table.classList.add('showBottom');
    table.classList.add('showLeft');
    table.classList.remove('showRight');
    table.classList.remove('showTop');
  } else {
    table.classList.remove('showBottom');
    table.classList.remove('showLeft');
    table.classList.add('showRight');
    table.classList.add('showTop');
  }

  if (e.alpha >= 0 && e.alpha <= 180) {
    table.classList.add('showLeft');
    table.classList.remove('showRight');
  } else {
    table.classList.add('showRight');
    table.classList.remove('showLeft');
  }

  if (e.beta >= 0 && e.beta <= 90) {
    table.classList.add('showBottom');
    table.classList.remove('showTop');
  } else {
    table.classList.add('showTop');
    table.classList.remove('showBottom');
  }

  table.style.transform = `rotate3d(1, 0, 0, ${x}deg) rotate3d(0, 1, 0, ${y}deg) rotate3d(0, 0, 1, ${z}deg)`;
}

function setRotationOnMove(e) {
  if (e.changedTouches) {
    e.preventDefault();
    e = e.touches[0];
  }

  // normalize client interaction position
  let x = -1 + (2 * e.clientX / innerWidth);
  let y = -1 + (2 * e.clientY / innerHeight);

  // round for kinder numbers
  x = Math.round(100 * x) / 100;
  y = Math.round(-100 * y) / 100;

  let totalRotation = (Math.abs(60 * x) + Math.abs(60 * y)) / 2;

  table.style.transform = `rotate3d(${y}, ${x}, 0, ${totalRotation}deg)`;

  let midW = innerWidth / 2;
  let midH = innerHeight / 2;

  if (e.clientX >= midW) {
    table.classList.add('showLeft');
    table.classList.remove('showRight');
  } else {
    table.classList.add('showRight');
    table.classList.remove('showLeft');
  }

  if (e.clientY <= midH) {
    table.classList.add('showBottom');
    table.classList.remove('showTop');
  } else {
    table.classList.add('showTop');
    table.classList.remove('showBottom');
  }
}

let colorArray = [
["1a232b",	"222c31",	"212a30",	"232b31",	"22292e",	"2b3336",	"242b30",	"1e282c",	"22292e",	"1f2a2c",	"1a2228",	"1d252a",	"1f292d",	"1d282c",	"283335",	"1d262c",	"1a2327",	"1b2227"],
["1e2b30",	"304141",	"344544",	"283636",	"364443",	"1e272b",	"33433e",	"293636",	"23312e",	"2a3a37",	"283434",	"24302f",	"2f413e",	"2b393a",	"293436",	"2d3e3e",	"2a3536",	"273735"],
["364f45",	"3c554c",	"3a4d49",	"435c4b",	"30413b",	"486253",	"425444",	"4a6352",	"435a48",	"49554d",	"425550",	"48604c",	"395648",	"496455",	"4c6e5c",	"354d44",	"42534c",	"32443d"],
["4b5f53",	"536557",	"647b63",	"5d6f5a",	"516350",	"62755c",	"556354",	"3c3738",	"3b2d2e",	"332c30",	"313031",	"41564c",	"5b715b",	"4f634f",	"496958",	"4f6c58",	"597055",	"61775c"],
["384744",	"687e6c",	"5f765a",	"667964",	"83937e",	"4d5950",	"323d3d",	"7d6855",	"c5af84",	"8e7761",	"1d1e21",	"3e4843",	"556c5c",	"617766",	"416150",	"67806f",	"829580",	"607565"],
["718976",	"8aa28c",	"869984",	"9bab9a",	"8d9e80",	"9eac8c",	"402e30",	"d1b480",	"c6a670",	"a4815d",	"43322e",	"16171e",	"202c2d",	"869c80",	"6e8672",	"8b9e8c",	"889e8c",	"91a293"],
["487273",	"467072",	"34554e",	"8c8070",	"adb9a7",	"314445",	"5a3d36",	"c7a05f",	"c5b185",	"c19e6c",	"b08c67",	"15171e",	"2e4b49",	"253e43",	"295354",	"9aac99",	"809f8a",	"37626a"],
["3c3f3e",	"495c5e",	"54605a",	"2c3f45",	"575854",	"2d4a4c",	"493b38",	"c5ad7e",	"bd9c69",	"795c44",	"b99774",	"111318",	"2e343a",	"274f51",	"376168",	"536b5d",	"8ca78e",	"215254"],
["2a3a3e",	"426c6d",	"294248",	"2e4644",	"395552",	"2f4d48",	"352b2c",	"b99c71",	"ba8e55",	"a6876a",	"715f4f",	"12171b",	"213436",	"26373b",	"245052",	"3c5251",	"273a3d",	"203941"],
["353d41",	"365f67",	"2a5b5d",	"32585b",	"466f70",	"4b4d49",	"3c2b2b",	"8f765b",	"af8d65",	"675647",	"29262a",	"16191d",	"122226",	"335c5e",	"1e343a",	"204e4e",	"2f5859",	"1e5051"],
["304345",	"373c3d",	"406a6f",	"3c6668",	"487471",	"445f54",	"3b2f2f",	"332a29",	"aa8a5f",	"675346",	"121318",	"212025",	"232527",	"243d39",	"214848",	"2a3639",	"254446",	"205153"],
["2b464a",	"324947",	"263b3e",	"131b1d",	"494d52",	"312c30",	"342b2a",	"392d2d",	"b5916b",	"ae8f64",	"745e4f",	"17181d",	"201e1f",	"1e2827",	"927863",	"706a56",	"323a2a",	"8d7058"],
["3e5253",	"3a3f34",	"6f6f66",	"56624c",	"342f30",	"312d2e",	"372e2e",	"c2a06b",	"c8b084",	"b58e67",	"755e49",	"28201e",	"241c1f",	"14171c",	"3d3531",	"726053",	"857a5f",	"565145"],
["2c2927",	"484539",	"756657",	"5d766a",	"1c2126",	"202126",	"ccb384",	"bfa775",	"cbaa74",	"c9b288",	"9a7b5a",	"272120",	"302325",	"221c1b",	"462f2d",	"312b2d",	"5d564a",	"716256"],
["403e39",	"605e46",	"806f60",	"312e31",	"1b1f24",	"181b21",	"c4a46f",	"c19e5f",	"bda170",	"c09765",	"a28266",	"342a2a",	"4d2a26",	"5d392f",	"53332e",	"17171a",	"2f2e2e",	"2c2529"],
["3c3836",	"7e7660",	"5f584e",	"2d2829",	"1b1d22",	"c09a61",	"c7a05a",	"bda878",	"d3b486",	"91755f",	"887254",	"1a191c",	"412822",	"291d1d",	"17181c",	"14191c",	"292425",	"463838"],
["3a3032",	"51494a",	"373234",	"27272c",	"272628",	"262528",	"9c8d6c",	"cbae78",	"7e6751",	"211b1d",	"352b2b",	"2e2422",	"3e2722",	"17171d",	"16161b",	"0a1215",	"181b21",	"2c252a"],
["18181d",	"212026",	"242428",	"222327",	"11141b",	"232427",	"352a2d",	"412f2a",	"26211e",	"352a2a",	"1a1b1e",	"202126",	"15151a",	"151316",	"39241f",	"161820",	"13181d",	"14141a"],
["382e33",	"1e2025",	"442e2c",	"252326",	"1b1e23",	"1b1e23",	"1d1e23",	"1f1d21",	"292323",	"212126",	"1b1c1e",	"1d1e23",	"312221",	"3d2723",	"16181d",	"15181d",	"121418",	"17161b"],
["332d31",	"1f1e24",	"332928",	"634136",	"1e2125",	"1e2126",	"1d1e22",	"252428",	"1f2024",	"1c1f24",	"222326",	"1a1b21",	"2a2023",	"14181e",	"14171e",	"161920",	"0c0f14",	"201f25"],
["18191e",	"1d2025",	"272225",	"47302c",	"563a32",	"866d4e",	"8f755b",	"18191e",	"1b1e23",	"18191e",	"1e1f24",	"16171c",	"1c1d22",	"17191e",	"17171d",	"13151a",	"15181f",	"262a31"],
["26242a",	"1b1f26",	"1d1e22",	"422f2b",	"513330",	"ccad76",	"bb9462",	"b59c70",	"93795e",	"432c27",	"492f27",	"332524",	"1a1d22",	"16171c",	"191c21",	"15181d",	"0e1116",	"17181d"],
["1d1d22",	"20232a",	"1b1e24",	"222227",	"c09e6d",	"b19b78",	"c9aa77",	"b28d64",	"847154",	"968369",	"533029",	"563630",	"2c2524",	"181a22",	"0d1116",	"14171d",	"15171f",	"171a1f"],
["1c1f28",	"1d2027",	"151b21",	"1c2025",	"b7a278",	"ab9774",	"9f8166",	"9d896c",	"90765d",	"1d1b1c",	"2d2526",	"171a20",	"1c1f24",	"171a1f",	"15181f",	"1c1e24",	"141920",	"1f1f22"],
["1e222a",	"1c2029",	"1a1e26",	"1d2027",	"202229",	"65574e",	"927a62",	"a28f6a",	"14191f",	"191f24",	"191e23",	"191f24",	"1b1f24",	"171c22",	"181d23",	"171a1f",	"171c22",	"191c24"],
["1a1e27",	"171e26",	"0e151d",	"191e26",	"171b21",	"191d25",	"1a1f24",	"181a20",	"1e222b",	"171e21",	"0f151b",	"1b2026",	"181c21",	"1d2026",	"1a1e27",	"1a1d25",	"171b24",	"161c23"],
["1c232b",	"1c2029",	"1d212c",	"1d212c",	"1b2029",	"1c212a",	"1a2028",	"1e252d",	"212830",	"1f232c",	"1f232a",	"1e212b",	"1e2229",	"1c2029",	"181d23",	"1b1f28",	"151922",	"1c232b"]
];

let cellDepthArray = [[0,2,0,0,1,2,1,0,2,1,0,0,0.5,0.5,0.5,2,1,0],
[0,1,1.5,2.5,1.5,2,0,2,1,0,2,0,0.5,2,1,1,0.5,1,0.5],
[1,0,0.5,1,0,1,0,0.5,1,0,1,0.5,0,1,0.5,0,0.5,0],
[3,2,1,1,0,1,0,1,2,2,1.5,1,0.5,1,1,0.5,0.5,0.5],
[1,2,2.5,0,1.5,0.5,1.5,2.5,3,4,3,2,1,0.5,0,1.5,0.5,0],
[0.5,1.5,1.5,1.5,0,1.5,2.5,3,4,3,2,1,0.5,0.5,0.5,0,0.5,0.5],
[3,2.5,2.5,2,1.5,1.5,2.5,4,4,2.5,2.5,1.5,1,2.5,1,0.5,0,0.5],
[4,2.5,3,2.5,2,2.5,2,2,4,2,2.5,2.5,2,1.5,1,0,0.5,0.5],
[2,2,3,3,2,2,2.5,3.5,2,3.5,3,2,1.5,2,1.5,0.5,1,0.5],
[3.5,2,3,1,3,3,3,3.5,4,4,3,2,1,1.5,0.5,0,0.5,0.5],
[4,3.5,2.5,2.5,3,2.5,2.5,2.5,2.5,3,3,2,1.5,2,1,1,0.5,0.5],
[2,2.5,2.5,1.5,2.5,2.5,3,3,3,2,3,2,2.5,1.5,1.5,0.5,0.5,0.5],
[2.5,1.5,0.5,2,2.5,2.5,2.5,2,3,3,2.5,2,1.5,1,0.5,0,0.5,0.5],
[0.5,0.5,2,2,2.5,2,1.5,3,3,2,1,1,1,0.5,1.5,0.5,1,0.5],
[1.5,3,1.5,2,2.5,2.5,3,2.5,2.5,2,2.5,2,1.5,2,1,0.5,0,0],
[1,0.5,1,1,2.5,1,2,2,3,2,1,1.5,2,1,1.5,1,0.5,0.5],
[1,1.5,1,1.5,0.5,1,2.5,3,1.5,1.5,1.5,1,1,1,1,1,1,0.5],
[0,2,1,1.5,1,1,1.5,2,1,1,0.5,0.5,1,1,1,1,0.5,0],
[1,2.5,1.5,1.5,1,1,1,1,1.5,0.5,0.5,1,1.5,1,1,1,0.5,0.5],
[1,1,1.5,2,2,1.5,0.5,1,0.5,1,0.5,1,1.5,1,1,1,0,0],
[0,1.5,1.5,2,1.5,1.5,2,1.5,1.5,1,1.5,1,1.5,2,1.5,0.5,1.5,1],
[0.5,1,1,1,1.5,2,1.5,1.5,1.5,1,1,1,1,0.5,1,0.5,0,0],
[0,1,2,1.5,2,3,2.5,2.5,1.5,1.5,2,1,0.5,0.5,0.5,0.5,0.5,0],
[1,1,1,1.5,1.5,2,2,1,1,1,1,1,1,0.5,0.5,1,0.5,0.5],
[1.5,1.5,1.5,1,1.5,2,1.5,1.5,1.5,2,1.5,1.5,2,1,1,1,0.5,0.5],
[2,2.5,1,2,1,1.5,1.5,1,1.5,1,1,1.5,1,1,1,1,1,0],
[1.5,2,1,0,1,1,0,1.5,0.5,1.5,1,1,1.5,0.5,0,0.5,0,0.5]]

let table = document.getElementById('renderTable');

for (let i = 0; i < colorArray.length; i++) {
  let row = document.createElement('tr');
  for (let j = 0; j < colorArray[i].length; j++) {
    let cell = document.createElement('td');
    cell.style.backgroundColor = '#' + colorArray[i][j];
		cell.style.transform = 'translateZ(' + cellDepthArray[i][j] * 10 + 'px)';
    cell.setAttribute('depth', cellDepthArray[i][j]);

    row.appendChild(cell);
  }
  table.appendChild(row);
}

})