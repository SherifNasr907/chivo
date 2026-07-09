import type { Snapshot } from './types'

// ---------------------------------------------------------------------------
// REAL DATA SNAPSHOT — pulled live from the CDH MCP server.
// Primary period: June 2026 (2026-06-01 → 2026-06-30). Trend: Jan–Jun 2026.
// Amounts are EGP. Gross = "Gross Sales (X-Factory)".
//
// This module is intentionally a plain data object. `dataService.ts` reads it
// through a single seam so it can be replaced by a live API/MCP backend later
// without changing any view code.
// ---------------------------------------------------------------------------

export const snapshot: Snapshot = {
  meta: {
    period_label: 'June 2026',
    period_start: '2026-06-01',
    period_end: '2026-06-30',
    currency: 'EGP',
    generated_at: '2026-07-09',
    source: 'CDH MCP (consolidated dashboard)',
  },

  // get_channels_summary — June 2026
  channels: [
    {
      channel: 'cdh', display_name: 'CDH (Consolidated)',
      gross_sales_x_factory: 30175846.82, vat: 3705805.75, sales_post_vat: 26470041.07,
      product_sales: 28744156.82, net_units_sold: 281278, asp_gross: 102.19, asp_net_vat: 89.64,
      cogs: 7062819.05, cogs_per_unit: 25.11, other_revenue: 1431690, orders: 27473,
      aov_gross: 1098.38, active_users: 532339, conversion_rate: 5.16,
      gross_profit: 19407222.02, gross_profit_pct: 73.32,
      shipping_collected: 118130, service_fees_collected: 1313560, discount: 17409681.76,
      refunds: 1650, tax: 1408759.6,
    },
    {
      channel: 'ecommerce', display_name: 'E-Commerce',
      gross_sales_x_factory: 16808610.02, vat: 2064215.27, sales_post_vat: 14744394.75,
      product_sales: 15376920.02, net_units_sold: 114201, asp_gross: 134.65, asp_net_vat: 118.11,
      cogs: 3281871.69, cogs_per_unit: 28.74, other_revenue: 1431690, orders: 27380,
      aov_gross: 613.9, active_users: 532339, conversion_rate: 5.14,
      gross_profit: 11462523.06, gross_profit_pct: 77.74,
      shipping_collected: 118130, service_fees_collected: 1313560, discount: 432794,
      refunds: 1650, tax: 0,
    },
    {
      channel: 'b2b', display_name: 'B2B',
      gross_sales_x_factory: 13367236.8, vat: 1641590.48, sales_post_vat: 11725646.32,
      product_sales: 13367236.8, net_units_sold: 167077, asp_gross: 80.01, asp_net_vat: 70.18,
      cogs: 3780947.36, cogs_per_unit: 22.63, other_revenue: 0, orders: 93,
      aov_gross: 143733.73, active_users: null, conversion_rate: null,
      gross_profit: 7944698.96, gross_profit_pct: 67.75,
      shipping_collected: 0, service_fees_collected: 0, discount: 16976887.76,
      refunds: 0, tax: 1408759.6,
    },
    {
      channel: 'wholesales', display_name: 'Wholesales',
      gross_sales_x_factory: 11471328.5, vat: 1408759.64, sales_post_vat: 10062568.86,
      product_sales: 11471328.5, net_units_sold: 151580, asp_gross: 75.68, asp_net_vat: 66.38,
      cogs: 3372546.94, cogs_per_unit: 22.25, other_revenue: 0, orders: 79,
      aov_gross: 145206.69, active_users: null, conversion_rate: null,
      gross_profit: 6690021.92, gross_profit_pct: 66.48,
      shipping_collected: 0, service_fees_collected: 0, discount: 15371861.06,
      refunds: 0, tax: 1408759.6,
    },
    {
      channel: 'pharmacies', display_name: 'Pharmacies',
      gross_sales_x_factory: 1895908.3, vat: 232830.84, sales_post_vat: 1663077.46,
      product_sales: 1895908.3, net_units_sold: 15497, asp_gross: 122.34, asp_net_vat: 107.32,
      cogs: 408400.42, cogs_per_unit: 26.35, other_revenue: 0, orders: 14,
      aov_gross: 135422.02, active_users: null, conversion_rate: null,
      gross_profit: 1254677.04, gross_profit_pct: 75.44,
      shipping_collected: 0, service_fees_collected: 0, discount: 1605026.7,
      refunds: 0, tax: 0,
    },
  ],

  // get_channel_kpis(ecommerce) — June 2026, per-brand
  ecommerceBrands: [
    { brand: 'dermatique', gross_sales_x_factory: 4426742, sales_post_vat: 3883107.02, product_sales: 4064412, net_units_sold: 26927, asp_net_vat: 132.41, cogs: 816887.33, orders: 7017, aov_gross: 630.86, active_users: 132524, conversion_rate: 5.29, gross_profit: 3066219.69, gross_profit_pct: 78.96, other_revenue: 362330, discount: 66313, brand_SPV_share_of_channel_SPV: 26.38 },
    { brand: 'kayanek', gross_sales_x_factory: 4208911.01, sales_post_vat: 3692027.2, product_sales: 3874851.01, net_units_sold: 30817, asp_net_vat: 110.3, cogs: 939100.44, orders: 6140, aov_gross: 685.49, active_users: 127152, conversion_rate: 4.83, gross_profit: 2752926.76, gross_profit_pct: 74.56, other_revenue: 334060, discount: 156978, brand_SPV_share_of_channel_SPV: 25.08 },
    { brand: 'blankie', gross_sales_x_factory: 3957982, sales_post_vat: 3471914.04, product_sales: 3594782, net_units_sold: 33500, asp_net_vat: 94.13, cogs: 693307.63, orders: 6917, aov_gross: 572.21, active_users: 125738, conversion_rate: 5.5, gross_profit: 2778606.41, gross_profit_pct: 80.03, other_revenue: 363200, discount: 67768, brand_SPV_share_of_channel_SPV: 23.59 },
    { brand: 'skinside', gross_sales_x_factory: 1764895, sales_post_vat: 1548153.51, product_sales: 1615565, net_units_sold: 7239, asp_net_vat: 195.77, cogs: 297998.43, orders: 2701, aov_gross: 653.42, active_users: 54795, conversion_rate: 4.93, gross_profit: 1250155.08, gross_profit_pct: 80.75, other_revenue: 149330, discount: 69385, brand_SPV_share_of_channel_SPV: 10.52 },
    { brand: 'ohanabaths', gross_sales_x_factory: 1316930.01, sales_post_vat: 1155201.76, product_sales: 1180650.01, net_units_sold: 8305, asp_net_vat: 124.7, cogs: 324291.8, orders: 2600, aov_gross: 506.51, active_users: 50464, conversion_rate: 5.15, gross_profit: 830909.96, gross_profit_pct: 71.93, other_revenue: 136280, discount: 28700, brand_SPV_share_of_channel_SPV: 7.85 },
    { brand: 'cleo', gross_sales_x_factory: 1104790, sales_post_vat: 969114.04, product_sales: 1018300, net_units_sold: 7264, asp_net_vat: 122.97, cogs: 208286.06, orders: 2005, aov_gross: 551.02, active_users: 41666, conversion_rate: 4.81, gross_profit: 760827.98, gross_profit_pct: 78.51, other_revenue: 86490, discount: 43650, brand_SPV_share_of_channel_SPV: 6.58 },
  ],

  // get_channels_summary — one call per month, Jan–Jun 2026
  trend: [
    { month: 'Jan', ecommerce: 22839751, b2b: 11575859.8, wholesales: 9006930, pharmacies: 2568929.8, cdh_gross: 34415610.8, cdh_gross_profit_pct: 72.86, orders: 45556, net_units_sold: 323869, conversion_rate: 5.24, cogs: 8193003.79 },
    { month: 'Feb', ecommerce: 13033872, b2b: 7687580.5, wholesales: 5809116.5, pharmacies: 1878464, cdh_gross: 20721452.5, cdh_gross_profit_pct: 71.36, orders: 26361, net_units_sold: 193506, conversion_rate: 4.17, cogs: 5205138.21 },
    { month: 'Mar', ecommerce: 15069520.94, b2b: 20300477.2, wholesales: 16746790.5, pharmacies: 3553686.7, cdh_gross: 35369998.14, cdh_gross_profit_pct: 73.54, orders: 29172, net_units_sold: 362553, conversion_rate: 5.46, cogs: 8209611.74 },
    { month: 'Apr', ecommerce: 18350319.96, b2b: 26061544.5, wholesales: 19969785, pharmacies: 6091759.5, cdh_gross: 44411864.46, cdh_gross_profit_pct: 72.4, orders: 32117, net_units_sold: 449213, conversion_rate: 5.62, cogs: 10752928.21 },
    { month: 'May', ecommerce: 15865869.99, b2b: 15781743.3, wholesales: 10945050, pharmacies: 4836693.3, cdh_gross: 31647613.29, cdh_gross_profit_pct: 74.46, orders: 25698, net_units_sold: 281089, conversion_rate: 4.24, cogs: 7090810.87 },
    { month: 'Jun', ecommerce: 16808610.02, b2b: 13367236.8, wholesales: 11471328.5, pharmacies: 1895908.3, cdh_gross: 30175846.82, cdh_gross_profit_pct: 73.32, orders: 27473, net_units_sold: 281278, conversion_rate: 5.16, cogs: 7062819.05 },
  ],

  // get_facebook_ads_cost — June 2026, aggregated by brand
  fbAds: [
    { brand: 'dermatique', spend: 407240.54, actual_spend: 477504.95 },
    { brand: 'blankie', spend: 380959.87, actual_spend: 446557.37 },
    { brand: 'kayanek', spend: 228457.07, actual_spend: 283286.77 },
    { brand: 'skinside', spend: 227095.06, actual_spend: 266121.9 },
    { brand: 'cleo', spend: 181923.18, actual_spend: 213470.95 },
    { brand: 'ohanabaths', spend: 54439.96, actual_spend: 63694.74 },
  ],

  // get_influencer_costs — June 2026 (Channel "Influ", OBJ. "ROI")
  influencerRoiCost: [
    { brand: 'kayanek', roi_fees: 1309496 },
    { brand: 'dermatique', roi_fees: 1252000 },
    { brand: 'skinside', roi_fees: 815000 },
    { brand: 'ohanabaths', roi_fees: 510000 },
    { brand: 'cleo', roi_fees: 500000 },
    { brand: 'blankie', roi_fees: 410083 },
  ],

  // get_coupon_channels_summary — June 2026, CDH rollup per segment
  couponSegments: [
    { segment: 'Ads', gross_sales_x_factory: 5933460.02, product_sales: 5460540.02, orders: 9695, net_units_sold: 40341, gross_profit: 4114305.42, gross_profit_pct: 79.05, aov_gross: 612.01 },
    { segment: 'Influencers', gross_sales_x_factory: 4580444.93, product_sales: 4205254.93, orders: 7542, net_units_sold: 31129, gross_profit: 3079745.02, gross_profit_pct: 76.65, aov_gross: 607.32 },
  ],

  // get_utm_analytics(source_medium) — June 2026, top sources
  utm: [
    { source: 'facebook', medium: 'cpc', orders: 7983, revenue: 4858251, aov: 608.57 },
    { source: 'l.instagram.com', medium: 'referral', orders: 6554, revenue: 3963185, aov: 604.7 },
    { source: 'ig', medium: 'social', orders: 3177, revenue: 2180960, aov: 686.48 },
    { source: '(direct)', medium: '(unknown)', orders: 2557, revenue: 1557205, aov: 609.0 },
    { source: '(unknown)', medium: '(unknown)', orders: 2067, revenue: 1258268, aov: 608.74 },
    { source: 'google', medium: 'organic', orders: 2135, revenue: 1188094, aov: 556.48 },
    { source: 'm.facebook.com', medium: 'referral', orders: 1429, revenue: 886606, aov: 620.44 },
    { source: 'facebook.com', medium: 'referral', orders: 306, revenue: 192400, aov: 628.76 },
    { source: 'fb', medium: 'paid', orders: 233, revenue: 146379, aov: 628.24 },
    { source: 'ig', medium: 'paid', orders: 201, revenue: 115940, aov: 576.82 },
    { source: 'google', medium: 'cpc', orders: 132, revenue: 76795, aov: 581.78 },
    { source: 'tiktok', medium: 'paid', orders: 38, revenue: 28040, aov: 737.89 },
  ],

  // get_order_value_distribution — June 2026
  orderValue: [
    { band: '0–200', orders: 826, customers: 743, gross_sales_x_factory: 27774, units_sold: 2196, aov: 33.62 },
    { band: '201–400', orders: 2458, customers: 2427, gross_sales_x_factory: 800111, units_sold: 4867, aov: 325.51 },
    { band: '401–500', orders: 9388, customers: 9182, gross_sales_x_factory: 4500084, units_sold: 36377, aov: 479.34 },
    { band: '500+', orders: 14708, customers: 14092, gross_sales_x_factory: 11485941, units_sold: 86700, aov: 780.93 },
  ],

  // get_basket_size_distribution — June 2026
  basketSize: [
    { band: '1 item', orders: 2095, customers: 2049, gross_sales_x_factory: 553217, units_sold: 2095, aov: 264.07 },
    { band: '2 items', orders: 1374, customers: 1361, gross_sales_x_factory: 555191, units_sold: 2748, aov: 404.07 },
    { band: '3 items', orders: 2676, customers: 2642, gross_sales_x_factory: 1351158, units_sold: 8028, aov: 504.92 },
    { band: '4+ items', orders: 21235, customers: 20254, gross_sales_x_factory: 14354344, units_sold: 117269, aov: 675.98 },
  ],

  // get_location_analytics(state) — June 2026, Arabic governorate rows
  // (English labels added for readability; small transliteration duplicates merged).
  locations: [
    { state: 'Cairo', state_ar: 'القاهرة', orders: 7185, customers: 6804, gross_sales_x_factory: 4337313, units_sold: 33231, aov: 603.66 },
    { state: 'Giza', state_ar: 'الجيزة', orders: 4136, customers: 3932, gross_sales_x_factory: 2485514, units_sold: 19129, aov: 600.94 },
    { state: 'Alexandria', state_ar: 'الاسكندرية', orders: 2890, customers: 2718, gross_sales_x_factory: 1738704, units_sold: 13490, aov: 601.63 },
    { state: 'Dakahlia', state_ar: 'دقهلية', orders: 1731, customers: 1642, gross_sales_x_factory: 1080193, units_sold: 8402, aov: 624.03 },
    { state: 'Sharkia', state_ar: 'الشرقية', orders: 1619, customers: 1523, gross_sales_x_factory: 1016768, units_sold: 7905, aov: 628.02 },
    { state: 'Qaliubiya', state_ar: 'قليوبية', orders: 1580, customers: 1513, gross_sales_x_factory: 986420, units_sold: 7632, aov: 624.32 },
    { state: 'Gharbiya', state_ar: 'الغربية', orders: 1305, customers: 1231, gross_sales_x_factory: 826863, units_sold: 6368, aov: 633.61 },
    { state: 'Monofia', state_ar: 'المنوفية', orders: 970, customers: 919, gross_sales_x_factory: 602558, units_sold: 4617, aov: 621.19 },
    { state: 'Beheira', state_ar: 'بحيرة', orders: 789, customers: 730, gross_sales_x_factory: 493237, units_sold: 3788, aov: 625.14 },
    { state: 'Ismailia', state_ar: 'الإسماعيلية', orders: 612, customers: 576, gross_sales_x_factory: 380359, units_sold: 2932, aov: 621.5 },
    { state: 'Damietta', state_ar: 'دمياط', orders: 564, customers: 539, gross_sales_x_factory: 348251, units_sold: 2655, aov: 617.47 },
    { state: 'Kafr El Sheikh', state_ar: 'كفر الشيخ', orders: 526, customers: 490, gross_sales_x_factory: 327795, units_sold: 2549, aov: 623.18 },
    { state: 'Minya', state_ar: 'منيا', orders: 463, customers: 430, gross_sales_x_factory: 293340, units_sold: 2247, aov: 633.56 },
    { state: 'Assiut', state_ar: 'أسيوط', orders: 437, customers: 411, gross_sales_x_factory: 273675, units_sold: 2022, aov: 626.26 },
    { state: 'Beni Suef', state_ar: 'بني سويف', orders: 393, customers: 368, gross_sales_x_factory: 235762, units_sold: 1881, aov: 599.9 },
    { state: 'Fayoum', state_ar: 'فيوم', orders: 354, customers: 325, gross_sales_x_factory: 257908, units_sold: 2079, aov: 728.55 },
    { state: 'Suez', state_ar: 'السويس', orders: 314, customers: 291, gross_sales_x_factory: 198541, units_sold: 1851, aov: 632.3 },
    { state: 'Sohag', state_ar: 'سوهاج', orders: 294, customers: 279, gross_sales_x_factory: 169718, units_sold: 1310, aov: 577.27 },
    { state: 'Port Said', state_ar: 'بورسعيد', orders: 245, customers: 228, gross_sales_x_factory: 149260, units_sold: 1173, aov: 609.22 },
    { state: 'Qena', state_ar: 'قنا', orders: 243, customers: 236, gross_sales_x_factory: 149459, units_sold: 1288, aov: 615.06 },
    { state: 'Red Sea', state_ar: 'البحر الأحمر', orders: 233, customers: 225, gross_sales_x_factory: 150800, units_sold: 1159, aov: 647.21 },
    { state: 'Aswan', state_ar: 'أسوان', orders: 189, customers: 178, gross_sales_x_factory: 118750, units_sold: 955, aov: 628.31 },
    { state: 'Luxor', state_ar: 'الأقصر', orders: 133, customers: 127, gross_sales_x_factory: 78560, units_sold: 608, aov: 590.68 },
    { state: 'Matrouh', state_ar: 'مطروح', orders: 77, customers: 75, gross_sales_x_factory: 48417, units_sold: 373, aov: 628.79 },
    { state: 'South Sinai', state_ar: 'جنوب سيناء', orders: 53, customers: 50, gross_sales_x_factory: 35135, units_sold: 257, aov: 662.92 },
    { state: 'New Valley', state_ar: 'الوادي الجديد', orders: 45, customers: 42, gross_sales_x_factory: 30610, units_sold: 239, aov: 680.22 },
  ],

  // get_product_table(ecommerce) — June 2026, top SKUs by net_sales
  topProducts: [
    { brand: 'blankie', product_name: 'Daily Moisturizer', sku: '6224009604913', net_sales: 993280, net_units_sold: 7446, asp_net_vat: 133.4, cogs: 149441.22, cogs_per_unit: 20.07, stock_quantity: 7123 },
    { brand: 'dermatique', product_name: 'Mattifying Fluid SPF50+', sku: '6224009604678', net_sales: 833434.33, net_units_sold: 4976, asp_net_vat: 167.49, cogs: 193715.68, cogs_per_unit: 38.93, stock_quantity: 21434 },
    { brand: 'blankie', product_name: 'Shampoo + Conditioner + Body Wash', sku: '6224009604883', net_sales: 793016, net_units_sold: 6166, asp_net_vat: 128.61, cogs: 123073.36, cogs_per_unit: 19.96, stock_quantity: 6597 },
    { brand: 'skinside', product_name: 'Hyaluronic Acid Foundation Serum - Light', sku: '6224011102803', net_sales: 643583.33, net_units_sold: 2139, asp_net_vat: 300.88, cogs: 135976.23, cogs_per_unit: 63.57, stock_quantity: 15714 },
    { brand: 'blankie', product_name: 'Hair Cream', sku: '6224009604937', net_sales: 615416, net_units_sold: 3693, asp_net_vat: 166.64, cogs: 72493.59, cogs_per_unit: 19.63, stock_quantity: 4341 },
    { brand: 'dermatique', product_name: 'Whitening deodorant (Cotton Candy)', sku: '6224011102995', net_sales: 514146.67, net_units_sold: 3648, asp_net_vat: 140.94, cogs: 89740.8, cogs_per_unit: 24.6, stock_quantity: 3337 },
    { brand: 'cleo', product_name: 'Hyaluronic Acid Sun Gel Cream SPF50+', sku: '6224009604852', net_sales: 505044, net_units_sold: 3363, asp_net_vat: 150.18, cogs: 96484.47, cogs_per_unit: 28.69, stock_quantity: 6264 },
    { brand: 'kayanek', product_name: 'Gold Caviar Serum', sku: '6224011102049', net_sales: 437268.67, net_units_sold: 827, asp_net_vat: 528.74, cogs: 39658.78, cogs_per_unit: 47.95, stock_quantity: 523 },
    { brand: 'dermatique', product_name: 'Hyaluronic Acid Peptide Plumping Lip Therapy (Peony Pink)', sku: '6224003117310', net_sales: 390883.33, net_units_sold: 2518, asp_net_vat: 155.24, cogs: 60432, cogs_per_unit: 24, stock_quantity: 7018 },
    { brand: 'kayanek', product_name: 'Wild Berries Body Mist', sku: '6224003117099', net_sales: 342835, net_units_sold: 998, asp_net_vat: 343.52, cogs: 52594.6, cogs_per_unit: 52.7, stock_quantity: 2691 },
    { brand: 'kayanek', product_name: 'Mattifying Fluid SPF50+', sku: '6224009604678', net_sales: 332442, net_units_sold: 1911, asp_net_vat: 173.96, cogs: 74395.23, cogs_per_unit: 38.93, stock_quantity: 3629 },
    { brand: 'kayanek', product_name: 'Niacinamide Serum 25 ml', sku: '6224011102421', net_sales: 331236.17, net_units_sold: 1168, asp_net_vat: 283.59, cogs: 42515.2, cogs_per_unit: 36.4, stock_quantity: 974 },
    { brand: 'dermatique', product_name: 'Advanced 2 in 1 Sun Gel Cream', sku: '6224003117198', net_sales: 318367, net_units_sold: 2110, asp_net_vat: 150.88, cogs: 82142.3, cogs_per_unit: 38.93, stock_quantity: 7567 },
    { brand: 'blankie', product_name: 'Oil - Baby Oil for hair and body (2in1)', sku: '6224009604890', net_sales: 297330, net_units_sold: 3527, asp_net_vat: 84.3, cogs: 65778.55, cogs_per_unit: 18.65, stock_quantity: 2795 },
    { brand: 'kayanek', product_name: 'Madagascar Vanilla Body Mist', sku: '6224003117068', net_sales: 269241.67, net_units_sold: 743, asp_net_vat: 362.37, cogs: 39156.1, cogs_per_unit: 52.7, stock_quantity: 465 },
    { brand: 'skinside', product_name: 'Hyaluronic Acid Daily Moisturizer', sku: '6224011102452', net_sales: 261131.67, net_units_sold: 1581, asp_net_vat: 165.17, cogs: 29090.4, cogs_per_unit: 18.4, stock_quantity: 1982 },
    { brand: 'dermatique', product_name: 'Whitening deodorant (Fresh Aloe)', sku: '6224011102988', net_sales: 246395, net_units_sold: 2066, asp_net_vat: 119.26, cogs: 50823.6, cogs_per_unit: 24.6, stock_quantity: 1999 },
    { brand: 'ohanabaths', product_name: 'Wild Berries Body Mist', sku: '6224003117099', net_sales: 227583.33, net_units_sold: 1530, asp_net_vat: 148.75, cogs: 80631, cogs_per_unit: 52.7, stock_quantity: 168 },
    { brand: 'blankie', product_name: 'Moisturizing Sunscreen SPF50+', sku: '6224009604951', net_sales: 226660, net_units_sold: 3139, asp_net_vat: 72.21, cogs: 93604.98, cogs_per_unit: 29.82, stock_quantity: 2998 },
    { brand: 'blankie', product_name: 'Diaper Rash Cream', sku: '6224009604906', net_sales: 204060, net_units_sold: 2594, asp_net_vat: 78.67, cogs: 43942.36, cogs_per_unit: 16.94, stock_quantity: 2749 },
    { brand: 'dermatique', product_name: 'Whitening deodorant (Vanilla Coconut)', sku: '6224003117013', net_sales: 199370, net_units_sold: 1582, asp_net_vat: 126.02, cogs: 38917.2, cogs_per_unit: 24.6, stock_quantity: 2161 },
    { brand: 'kayanek', product_name: 'Reboost 3 in 1 Vit C Lightening Cleanser', sku: '6224011102445', net_sales: 190093.83, net_units_sold: 1321, asp_net_vat: 143.9, cogs: 54253.47, cogs_per_unit: 41.07, stock_quantity: 1210 },
    { brand: 'dermatique', product_name: 'Whitening deodorant (Fragrance Free)', sku: '6224003117020', net_sales: 189920, net_units_sold: 1522, asp_net_vat: 124.78, cogs: 37441.2, cogs_per_unit: 24.6, stock_quantity: 1391 },
    { brand: 'ohanabaths', product_name: 'Wild Berries Body Lotion', sku: '6224003117105', net_sales: 181316.67, net_units_sold: 1313, asp_net_vat: 138.09, cogs: 37026.6, cogs_per_unit: 28.2, stock_quantity: 935 },
    { brand: 'ohanabaths', product_name: 'Wild Berries Shower Cream', sku: '6224003117112', net_sales: 181133.33, net_units_sold: 1328, asp_net_vat: 136.4, cogs: 44620.8, cogs_per_unit: 33.6, stock_quantity: 628 },
  ],

  // get_bundles_table(ecommerce) — June 2026, top bundles by revenue
  topBundles: [
    { bundle_sku: '2PJDMNA1D5', product_name: 'Whitening deodorant Set Of 4', brand: 'dermatique', bundles_sold: 1447, bundle_revenue: 721880, cogs: 142384.8, stock_quantity: 1412 },
    { bundle_sku: 'AD1CHDBNCB5LSDC1', product_name: 'Day One Bundle', brand: 'blankie', bundles_sold: 1172, bundle_revenue: 515680, cogs: 88626.64, stock_quantity: 2828 },
    { bundle_sku: 'UIUSL2GF', product_name: 'Wild Berries Set', brand: 'ohanabaths', bundles_sold: 1176, bundle_revenue: 488300, cogs: 134652, stock_quantity: 179 },
    { bundle_sku: 'IADHSEJQKMJJHN4', product_name: 'Mattifying Fluid SPF50+ (Set of 4)', brand: 'dermatique', bundles_sold: 537, bundle_revenue: 347974, cogs: 83621.64, stock_quantity: 5368 },
    { bundle_sku: 'PODMMCKJNHGB2-1', product_name: 'Summer Bundle', brand: 'dermatique', bundles_sold: 612, bundle_revenue: 346900, cogs: 77760.72, stock_quantity: 1684 },
    { bundle_sku: 'SUNGEL2OF-2', product_name: 'Summer Bundle', brand: 'cleo', bundles_sold: 688, bundle_revenue: 308900, cogs: 59216.16, stock_quantity: 2158 },
    { bundle_sku: 'CD3SDHCBD4', product_name: 'Madagascar Vanilla Set', brand: 'ohanabaths', bundles_sold: 694, bundle_revenue: 290610, cogs: 79463, stock_quantity: 971 },
    { bundle_sku: 'G2STODO2-1', product_name: 'Daily Moisturizer (Set of 4)', brand: 'blankie', bundles_sold: 614, bundle_revenue: 269280, cogs: 49291.92, stock_quantity: 1828 },
    { bundle_sku: 'CBDGHCBG2CD-1', product_name: 'Hyaluronic Acid Foundation Serum - Light Duo', brand: 'skinside', bundles_sold: 433, bundle_revenue: 258450, cogs: 55051.62, stock_quantity: -4347 },
    { bundle_sku: 'BUNDLEOF5WVCS-11', product_name: 'Oily Skin Bundle', brand: 'dermatique', bundles_sold: 406, bundle_revenue: 242836, cogs: 51789.36, stock_quantity: 13 },
    { bundle_sku: 'VDOHVPWBFP-3', product_name: 'Advanced 2 in 1 Sun Gel Cream (Set of 4)', brand: 'dermatique', bundles_sold: 408, bundle_revenue: 223725, cogs: 63533.76, stock_quantity: 1892 },
    { bundle_sku: 'BOF4AND2MINIM-15', product_name: 'Summer Bundle', brand: 'blankie', bundles_sold: 304, bundle_revenue: 181800, cogs: 38422.56, stock_quantity: 108 },
    { bundle_sku: 'CBDGHCBG2CD-2XSC', product_name: 'Hyaluronic Acid Foundation Serum - Set Of 2', brand: 'skinside', bundles_sold: 275, bundle_revenue: 165550, cogs: 34963.5, stock_quantity: -6709 },
    { bundle_sku: '4KDPADC3FL2-1', product_name: 'Daily Care Bundle', brand: 'blankie', bundles_sold: 356, bundle_revenue: 156200, cogs: 27568.64, stock_quantity: 1452 },
    { bundle_sku: 'WSAXSD4CD5', product_name: 'Tropical Island Set', brand: 'ohanabaths', bundles_sold: 375, bundle_revenue: 154140, cogs: 42937.5, stock_quantity: 34 },
    { bundle_sku: 'PODMMCKJNHGB2', product_name: 'Summer Bundle Duo', brand: 'dermatique', bundles_sold: 423, bundle_revenue: 147000, cogs: 26873.19, stock_quantity: 3368 },
    { bundle_sku: 'ONA1658LIP26PO-6', product_name: 'Hyaluronic Acid Lip Therapy Set', brand: 'dermatique', bundles_sold: 309, bundle_revenue: 138478, cogs: 22248, stock_quantity: 2353 },
    { bundle_sku: 'BOF4AND2MINIM-14', product_name: 'Best Seller Bundle', brand: 'blankie', bundles_sold: 170, bundle_revenue: 136000, cogs: 29102.3, stock_quantity: 108 },
  ],

  // get_tools_cost — monthly (EGP). Company-wide + ecommerce-only tooling spend.
  toolsCost: [
    { year: 2025, month: 8, company_wide: 311160, ecom_base: 448533, total: 759693 },
    { year: 2025, month: 9, company_wide: 196952, ecom_base: 511971, total: 708923 },
    { year: 2025, month: 10, company_wide: 291951, ecom_base: 396195, total: 688146 },
    { year: 2025, month: 11, company_wide: 282938, ecom_base: 449782, total: 732720 },
    { year: 2025, month: 12, company_wide: 269567, ecom_base: 729121, total: 998688 },
    { year: 2026, month: 1, company_wide: 208400, ecom_base: 511820, total: 720220 },
    { year: 2026, month: 2, company_wide: 132834, ecom_base: 508512, total: 641346 },
    { year: 2026, month: 3, company_wide: 245490, ecom_base: 553880, total: 799370 },
    { year: 2026, month: 4, company_wide: 464342, ecom_base: 552436, total: 1016778 },
    { year: 2026, month: 5, company_wide: 514298, ecom_base: 544267, total: 1058565 },
  ],
}
