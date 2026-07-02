// Public-transit connectivity to the MasterVLSI campus.
export const RAILWAY = [
  { name: "Krishnarajapuram", km: "0.45 km" },
  { name: "Banaswadi", km: "6 km" },
  { name: "Bengaluru East", km: "1.2 km" },
  { name: "Bengaluru Cantt", km: "9 km" },
  { name: "Whitefield", km: "11 km" },
  { name: "Hebbal", km: "13 km" },
  { name: "Krantivira Sangolli Rayanna (Baiyyappanahalli)", km: "13 km" },
  { name: "Yesvantpur Junction", km: "16 km" },
] as const;

export const METRO = [
  { name: "Benniganahalli Metro Station", km: "500 m" },
  { name: "K.R. Puram Metro Station", km: "550 m" },
] as const;

export const BUS = [
  { name: "Tin Factory Bus Stop", km: "100 m" },
  { name: "KR Puram Bus Stop", km: "120 m" },
  { name: "Baiyyappanahalli Bus Stop", km: "200 m" },
  { name: "Majestic Terminus Bus Stop", km: "15 km" },
] as const;

// VLSI companies clustered around the campus (approx road distance).
export const NEARBY_COMPANIES = [
  { name: "Samsung R&D", km: "0.0 km", type: "Product" },
  { name: "Google", km: "1.0 km", type: "Product" },
  { name: "Synopsys", km: "1.0 km", type: "EDA" },
  { name: "Texas Instruments", km: "1.0 km", type: "Product" },
  { name: "Cadence", km: "1.0 km", type: "EDA" },
  { name: "Qualcomm", km: "2.0 km", type: "Product" },
  { name: "AMD", km: "2.0 km", type: "Product" },
  { name: "Intel", km: "4.0 km", type: "Product" },
  { name: "NVIDIA", km: "4.0 km", type: "Product" },
  { name: "Broadcom", km: "4.0 km", type: "Product" },
  { name: "Micron", km: "4.0 km", type: "Product" },
  { name: "ARM", km: "5.0 km", type: "Product" },
  { name: "Infineon", km: "6.0 km", type: "Product" },
  { name: "Siemens EDA", km: "6.0 km", type: "EDA" },
  { name: "Analog Devices", km: "6.0 km", type: "Product" },
  { name: "NXP", km: "6.0 km", type: "Product" },
  { name: "Renesas", km: "6.0 km", type: "Product" },
  { name: "MediaTek", km: "6.0 km", type: "Product" },
  { name: "Marvell", km: "6.0 km", type: "Product" },
] as const;
