// ELESSAR ANALYTICS PLATFORM - SYNTHETIC DATASET
// Department: Orthopaedics | Year: 2024 | Currency: HUF (thousand)
//
// Calibration sources:
//   - Semmelweis University Hospital 2024 Annual Report (balance sheet)
//     NEAK revenues: 132,981,827 KHUF | Material expenses: 84,717,074 KHUF
//     Personnel: 134,946,019 KHUF | Operating profit: 4,829,255 KHUF
//   - NEAK DRG reimbursement schedule (public, orthopaedics tariffs)
//   - HST 2024 State of the Industry Report (OR utilization benchmarks)
//   - P4H Network / Euractiv: Hungarian hospital debt reached 300M EUR (March 2024)
//
// Scaling methodology:
//   Semmelweis has ~120 departments. Orthopaedics = approx 3.2% of total activity.
//   Scaled monthly budget: 40,000,000 HUF (480M annual) for a 40-bed regional ortho dept.
//   NEAK coverage ratio: 78.8% of spend -- hospital-wide ratio at Semmelweis is 57.8%
//   (orthopaedics receives higher DRG weights than average, hence higher coverage ratio).

export const BUDGET = [
  { month:'Jan', approved:40000000, spend:39847680, neak:31426450, util:99.6,  coverage:0.789, deficit:-8421230 },
  { month:'Feb', approved:40000000, spend:39289100, neak:31286700, util:98.2,  coverage:0.797, deficit:-8002400 },
  { month:'Mar', approved:40000000, spend:37445560, neak:31573020, util:93.6,  coverage:0.843, deficit:-5872540 },
  { month:'Apr', approved:40000000, spend:40548820, neak:33784560, util:101.4, coverage:0.833, deficit:-6764260 },
  { month:'May', approved:40000000, spend:39081320, neak:35505660, util:97.7,  coverage:0.908, deficit:-3575660 },
  { month:'Jun', approved:40000000, spend:38124760, neak:31833900, util:95.3,  coverage:0.835, deficit:-6290860 },
  { month:'Jul', approved:40000000, spend:42638020, neak:31724880, util:106.6, coverage:0.744, deficit:-10913140},
  { month:'Aug', approved:40000000, spend:44641820, neak:32988100, util:111.6, coverage:0.739, deficit:-11653720},
  { month:'Sep', approved:40000000, spend:41959070, neak:32991370, util:104.9, coverage:0.786, deficit:-8967700 },
  { month:'Oct', approved:40000000, spend:39732240, neak:29759670, util:99.3,  coverage:0.749, deficit:-9972570 },
  { month:'Nov', approved:40000000, spend:46608510, neak:33058210, util:116.5, coverage:0.709, deficit:-13550300},
  { month:'Dec', approved:40000000, spend:46840220, neak:31063200, util:117.1, coverage:0.663, deficit:-15777020},
]

export const PROCEDURES = [
  { procedure:'Hip Replacement',         shortName:'Hip Repl.',   count:25, avg_cost:659000,  avg_neak:1128400, deficit_cases:0,  deficit_pct:0  },
  { procedure:'Total Knee Replacement',  shortName:'Knee Repl.',  count:23, avg_cost:686200,  avg_neak:1207300, deficit_cases:0,  deficit_pct:0  },
  { procedure:'Arthroscopy',             shortName:'Arthroscopy', count:19, avg_cost:604500,  avg_neak:465000,  deficit_cases:16, deficit_pct:84 },
  { procedure:'Spinal Fusion',           shortName:'Spinal',      count:34, avg_cost:637200,  avg_neak:1749600, deficit_cases:0,  deficit_pct:0  },
  { procedure:'Fracture Repair',         shortName:'Fracture',    count:22, avg_cost:598400,  avg_neak:600600,  deficit_cases:12, deficit_pct:55 },
]

export const DEPT_COSTS = [
  { dept:'Orthopaedics',  cost:52194200 },
  { dept:'Anaesthesia',   cost:11407100 },
  { dept:'Radiology',     cost:8899400  },
  { dept:'Laboratory',    cost:3215500  },
  { dept:'Physiotherapy', cost:2863500  },
]

export const PATIENTS = [
  { id:'PT-0004',  procedure:'Arthroscopy',           date:'2024-01-23', or_min:64,  exp_min:45,  neak:461000,  ortho:591200, radio:59280, physio:0,     anaes:97320, lab:35120, total:782920, diff:-321920 },
  { id:'PT-0145',  procedure:'Arthroscopy',           date:'2024-02-12', or_min:45,  exp_min:45,  neak:432500,  ortho:567500, radio:36180, physio:0,     anaes:87510, lab:38490, total:729680, diff:-297180 },
  { id:'PT-0120',  procedure:'Arthroscopy',           date:'2024-01-15', or_min:46,  exp_min:45,  neak:432650,  ortho:518540, radio:113580,physio:0,     anaes:80090, lab:16610, total:728820, diff:-296170 },
  { id:'PT-0009',  procedure:'Arthroscopy',           date:'2024-04-18', or_min:66,  exp_min:45,  neak:445690,  ortho:570700, radio:67330, physio:0,     anaes:72770, lab:18470, total:729270, diff:-283580 },
  { id:'PT-0096',  procedure:'Arthroscopy',           date:'2024-01-05', or_min:38,  exp_min:45,  neak:502200,  ortho:512660, radio:104730,physio:0,     anaes:127420,lab:33600, total:778410, diff:-276210 },
  { id:'PT-0038',  procedure:'Fracture Repair',       date:'2024-06-18', or_min:51,  exp_min:60,  neak:544600,  ortho:589900, radio:39280, physio:0,     anaes:132540,lab:19020, total:780740, diff:-236140 },
  { id:'PT-0146',  procedure:'Arthroscopy',           date:'2024-01-14', or_min:61,  exp_min:45,  neak:408130,  ortho:429190, radio:45010, physio:0,     anaes:135240,lab:22140, total:631580, diff:-223450 },
  { id:'PT-0008',  procedure:'Arthroscopy',           date:'2024-01-29', or_min:49,  exp_min:45,  neak:492450,  ortho:533190, radio:61540, physio:0,     anaes:55670, lab:37520, total:687920, diff:-195470 },
  { id:'PT-0041',  procedure:'Fracture Repair',       date:'2024-03-14', or_min:72,  exp_min:60,  neak:556000,  ortho:578860, radio:55290, physio:0,     anaes:101890,lab:26440, total:762480, diff:-206480 },
  { id:'PT-0073',  procedure:'Fracture Repair',       date:'2024-05-22', or_min:68,  exp_min:60,  neak:537000,  ortho:560060, radio:63150, physio:0,     anaes:94010, lab:30440, total:747660, diff:-210660 },
  { id:'PT-0059',  procedure:'Fracture Repair',       date:'2024-03-02', or_min:52,  exp_min:60,  neak:578000,  ortho:404020, radio:58490, physio:0,     anaes:93360, lab:21180, total:577050, diff:950    },
  { id:'PT-0017',  procedure:'Arthroscopy',           date:'2024-08-12', or_min:68,  exp_min:45,  neak:451800,  ortho:342160, radio:27840, physio:0,     anaes:51810, lab:27260, total:449070, diff:2730   },
  { id:'PT-0075',  procedure:'Fracture Repair',       date:'2024-10-18', or_min:68,  exp_min:60,  neak:591200,  ortho:417840, radio:51830, physio:0,     anaes:84510, lab:19210, total:573390, diff:17810  },
  { id:'PT-0126',  procedure:'Arthroscopy',           date:'2024-02-06', or_min:60,  exp_min:45,  neak:496830,  ortho:271720, radio:23300, physio:0,     anaes:128960,lab:36060, total:460040, diff:36790  },
  { id:'PT-0099',  procedure:'Fracture Repair',       date:'2024-07-06', or_min:83,  exp_min:60,  neak:600260,  ortho:350580, radio:37880, physio:0,     anaes:128340,lab:38400, total:555200, diff:45060  },
  { id:'PT-0005',  procedure:'Arthroscopy',           date:'2024-10-22', or_min:47,  exp_min:45,  neak:479590,  ortho:272820, radio:44220, physio:0,     anaes:74820, lab:13710, total:405570, diff:74020  },
  { id:'PT-0084',  procedure:'Fracture Repair',       date:'2024-09-17', or_min:58,  exp_min:60,  neak:652420,  ortho:351850, radio:100430,physio:0,     anaes:85580, lab:38120, total:575980, diff:76440  },
  { id:'PT-0031',  procedure:'Hip Replacement',       date:'2024-02-28', or_min:88,  exp_min:80,  neak:1160600, ortho:601860, radio:74460, physio:87450, anaes:112020,lab:28290, total:904080, diff:256520 },
  { id:'PT-0047',  procedure:'Hip Replacement',       date:'2024-04-11', or_min:76,  exp_min:80,  neak:1094000, ortho:556160, radio:69570, physio:83290, anaes:103020,lab:24870, total:836910, diff:257090 },
  { id:'PT-0112',  procedure:'Total Knee Replacement',date:'2024-06-03', or_min:94,  exp_min:90,  neak:1273100, ortho:638240, radio:79140, physio:92460, anaes:120490,lab:31580, total:961910, diff:311190 },
  { id:'PT-0063',  procedure:'Spinal Fusion',         date:'2024-03-19', or_min:128, exp_min:120, neak:1711900, ortho:716210, radio:98450, physio:0,     anaes:160510,lab:41020, total:1016190,diff:695710 },
  { id:'PT-0088',  procedure:'Spinal Fusion',         date:'2024-07-25', or_min:115, exp_min:120, neak:1778100, ortho:697900, radio:101760,physio:0,     anaes:155610,lab:44590, total:999860, diff:778240 },
]

export const PROCUREMENT = [
  { id:'SKU-0001', name:'Titanium Knee Implant Type A',  category:'Implant',     supplier:'EuroCare Zrt.',  contracted:71290,  actual:82480,  variance:15.7, qty:53,  urgent:5, mdr:'Yes' },
  { id:'SKU-0002', name:'Titanium Knee Implant Type B',  category:'Implant',     supplier:'SurgPro Kft.',   contracted:204900, actual:225920, variance:10.3, qty:269, urgent:6, mdr:'No'  },
  { id:'SKU-0003', name:'Titanium Knee Implant Type C',  category:'Implant',     supplier:'MedSupply Kft.', contracted:239230, actual:253220, variance:5.9,  qty:201, urgent:0, mdr:'Yes' },
  { id:'SKU-0004', name:'Hip Stem Implant',              category:'Implant',     supplier:'MedSupply Kft.', contracted:130270, actual:131160, variance:0.7,  qty:346, urgent:5, mdr:'Yes' },
  { id:'SKU-0005', name:'Hip Cup Implant',               category:'Implant',     supplier:'MedSupply Kft.', contracted:133080, actual:148590, variance:11.7, qty:426, urgent:7, mdr:'No'  },
  { id:'SKU-0006', name:'Bone Screw Set',                category:'Implant',     supplier:'OrthoTech Zrt.', contracted:51650,  actual:48680,  variance:-5.7, qty:407, urgent:0, mdr:'Yes' },
  { id:'SKU-0007', name:'Spinal Rod System',             category:'Implant',     supplier:'OrthoTech Zrt.', contracted:17550,  actual:21140,  variance:20.5, qty:463, urgent:4, mdr:'No'  },
  { id:'SKU-0008', name:'Surgical Glove (S) Variant 1',  category:'Consumable',  supplier:'BudaMed Kft.',   contracted:14850,  actual:17680,  variance:19.1, qty:107, urgent:0, mdr:'Yes' },
  { id:'SKU-0009', name:'Surgical Glove (S) Variant 2',  category:'Consumable',  supplier:'BudaMed Kft.',   contracted:47760,  actual:57680,  variance:20.8, qty:233, urgent:7, mdr:'No'  },
  { id:'SKU-0010', name:'Surgical Glove (S) Variant 3',  category:'Consumable',  supplier:'BudaMed Kft.',   contracted:71110,  actual:78120,   variance:9.9,  qty:264, urgent:8, mdr:'Yes' },
  { id:'SKU-0011', name:'Surgical Glove (S) Variant 4',  category:'Consumable',  supplier:'MedSupply Kft.', contracted:160110, actual:151830, variance:-5.2, qty:318, urgent:2, mdr:'Yes' },
  { id:'SKU-0012', name:'Surgical Glove (M) Variant 1',  category:'Consumable',  supplier:'MedSupply Kft.', contracted:31130,  actual:32310,  variance:3.8,  qty:161, urgent:6, mdr:'Yes' },
  { id:'SKU-0013', name:'Surgical Glove (M) Variant 2',  category:'Consumable',  supplier:'EuroCare Zrt.',  contracted:132810, actual:143590, variance:8.1,  qty:382, urgent:5, mdr:'No'  },
  { id:'SKU-0014', name:'Surgical Glove (M) Variant 3',  category:'Consumable',  supplier:'BudaMed Kft.',   contracted:240620, actual:306260, variance:27.3, qty:495, urgent:6, mdr:'Yes' },
  { id:'SKU-0015', name:'Surgical Glove (L) Variant 1',  category:'Consumable',  supplier:'MedSupply Kft.', contracted:54620,  actual:66940,  variance:22.6, qty:357, urgent:0, mdr:'Yes' },
  { id:'SKU-0016', name:'Surgical Glove (L) Variant 2',  category:'Consumable',  supplier:'MedSupply Kft.', contracted:89520,  actual:107460, variance:20.0, qty:197, urgent:0, mdr:'Yes' },
  { id:'SKU-0017', name:'Sterile Drape Kit Variant 1',   category:'Consumable',  supplier:'BudaMed Kft.',   contracted:140460, actual:151680, variance:8.0,  qty:49,  urgent:8, mdr:'Yes' },
  { id:'SKU-0018', name:'Sterile Drape Kit Variant 2',   category:'Consumable',  supplier:'EuroCare Zrt.',  contracted:118880, actual:137140, variance:15.4, qty:137, urgent:0, mdr:'Yes' },
  { id:'SKU-0019', name:'Sterile Drape Kit Variant 3',   category:'Consumable',  supplier:'EuroCare Zrt.',  contracted:195050, actual:206690, variance:5.9,  qty:297, urgent:4, mdr:'No'  },
  { id:'SKU-0020', name:'Sterile Drape Kit Variant 4',   category:'Consumable',  supplier:'OrthoTech Zrt.', contracted:230280, actual:235570, variance:2.3,  qty:479, urgent:3, mdr:'Yes' },
  { id:'SKU-0021', name:'Suture 3-0 Variant 1',          category:'Consumable',  supplier:'MedSupply Kft.', contracted:170430, actual:167390, variance:-1.8, qty:375, urgent:1, mdr:'Yes' },
  { id:'SKU-0022', name:'Suture 3-0 Variant 2',          category:'Consumable',  supplier:'BudaMed Kft.',   contracted:25460,  actual:28460,  variance:11.8, qty:158, urgent:2, mdr:'Yes' },
  { id:'SKU-0023', name:'Suture 4-0 Variant 1',          category:'Consumable',  supplier:'SurgPro Kft.',   contracted:85120,  actual:82050,  variance:-3.6, qty:112, urgent:3, mdr:'No'  },
  { id:'SKU-0024', name:'Suture 4-0 Variant 2',          category:'Consumable',  supplier:'MedSupply Kft.', contracted:136330, actual:152570, variance:11.9, qty:198, urgent:8, mdr:'Yes' },
  { id:'SKU-0025', name:'Bone Cement 40g Variant 1',     category:'Consumable',  supplier:'SurgPro Kft.',   contracted:28790,  actual:27780,  variance:-3.5, qty:172, urgent:7, mdr:'No'  },
  { id:'SKU-0026', name:'Bone Cement 40g Variant 2',     category:'Consumable',  supplier:'SurgPro Kft.',   contracted:130200, actual:125800, variance:-3.4, qty:434, urgent:2, mdr:'Yes' },
  { id:'SKU-0027', name:'Bone Cement 40g Variant 3',     category:'Consumable',  supplier:'EuroCare Zrt.',  contracted:189490, actual:236550, variance:24.8, qty:38,  urgent:8, mdr:'Yes' },
  { id:'SKU-0028', name:'Bone Cement 40g Variant 4',     category:'Consumable',  supplier:'BudaMed Kft.',   contracted:62810,  actual:61430,  variance:-2.2, qty:488, urgent:5, mdr:'Yes' },
  { id:'SKU-0029', name:'Propofol 200mg',                category:'Anaesthetic', supplier:'MedSupply Kft.', contracted:95000,  actual:94110,  variance:-0.9, qty:499, urgent:0, mdr:'Yes' },
  { id:'SKU-0030', name:'Fentanyl 0.05mg',               category:'Anaesthetic', supplier:'BudaMed Kft.',   contracted:231240, actual:257210, variance:11.2, qty:267, urgent:0, mdr:'Yes' },
  { id:'SKU-0031', name:'Rocuronium 50mg',               category:'Anaesthetic', supplier:'OrthoTech Zrt.', contracted:247830, actual:283780, variance:14.5, qty:471, urgent:0, mdr:'Yes' },
  { id:'SKU-0032', name:'X-Ray Film 35x43',              category:'Imaging',     supplier:'MedSupply Kft.', contracted:31560,  actual:29550,  variance:-6.4, qty:338, urgent:0, mdr:'Yes' },
  { id:'SKU-0033', name:'Contrast Agent 50ml',           category:'Imaging',     supplier:'OrthoTech Zrt.', contracted:215420, actual:230470, variance:7.0,  qty:337, urgent:0, mdr:'Yes' },
  { id:'SKU-0034', name:'MRI Coil Cover',                category:'Imaging',     supplier:'BudaMed Kft.',   contracted:181960, actual:183450, variance:0.8,  qty:423, urgent:0, mdr:'Yes' },
  { id:'SKU-0035', name:'CPM Machine Rental',            category:'Rehab',       supplier:'EuroCare Zrt.',  contracted:28470,  actual:33250,  variance:16.8, qty:90,  urgent:0, mdr:'No'  },
  { id:'SKU-0036', name:'Physiotherapy Band Set',        category:'Rehab',       supplier:'EuroCare Zrt.',  contracted:77550,  actual:80840,  variance:4.2,  qty:83,  urgent:0, mdr:'Yes' },
  { id:'SKU-0037', name:'Crutch Pair',                   category:'Rehab',       supplier:'BudaMed Kft.',   contracted:150460, actual:145450, variance:-3.3, qty:199, urgent:0, mdr:'Yes' },
]

// Fix async typo in SKU-0010

export const SKU_FRAGMENTATION = [
  { name:'Surgical Glove (M)', variants:3, total_spend:211635000, saving:25396200 },
  { name:'Sterile Drape Kit',  variants:4, total_spend:200405000, saving:24048600 },
  { name:'Bone Cement 40g',    variants:4, total_spend:98378000,  saving:11805360 },
  { name:'Surgical Glove (S)', variants:4, total_spend:84244000,  saving:10109280 },
  { name:'Suture 3-0',         variants:2, total_spend:67272000,  saving:8072640  },
  { name:'Suture 4-0',         variants:3, total_spend:46101000,  saving:5532120  },
  { name:'Surgical Glove (L)', variants:2, total_spend:45063000,  saving:5407560  },
]

export const KPIS = {
  annual_neak_gap:    -108561600,
  total_spend:        496755120,
  total_neak:         388193960,
  deficit_cases:      28,
  total_cases:        123,
  cancellation_rate:  18.0,
  expiry_waste:       93493000,
  urgent_orders:      119,
  skus_overpaid:      22,
  total_skus:         37,
  non_mdr:            10,
  avg_or_delay:       8.0,
  fragmented_groups:  7,
  total_frag_saving:  90371760,

  // From Semmelweis 2024 (whole hospital, in thousand HUF)
  semmelweis_neak_revenue:    132981827,
  semmelweis_material_costs:  84717074,
  semmelweis_personnel_costs: 134946019,
  semmelweis_operating_profit:4829255,
}
