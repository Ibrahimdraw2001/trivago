const HOTELS = [
  // --- الإمارات ---
    {
    name: 'Kempinski Summerland Hotel & Resort Beirut 5 عدد النجوم',
    city: 'بيروت',
    country: 'لبنان',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/hotelier-images/2d/57/51982e12de374f7d94883b270aa817c28326a8d5e37c677a13aea856b0a0.jpeg',
    description: 'إقامة مميزة في بيروت - يُحَدَّد مدى الرَواج استنادا إلى العدد الإجمالي لتقييمات النزلاء لمكان الإقامة هذا بالمقارنة مع أماكن الإقامة الأخرى الموجودة في بيروت والتي تنتمي إلى نفس النوع وتصنيف النجوم.'
  },
  {
    name: 'Le Royal Hotel Beirut 5 عدد النجوم',
    city: 'بيروت',
    country: 'لبنان',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/hotelier-images/f1/a0/fa573001fa445f43633487fb8edc2b9959640579e8387be1b115f776f586.jpeg',
    description: 'إقامة مميزة في بيروت - 8.7 - ممتاز (3,221 من النقاط).'
  },
  {
    name: 'Four Points by Sheraton Le Verdun 4 عدد النجوم',
    city: 'بيروت',
    country: 'لبنان',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/hotelier-images/a2/27/0c074a4f070eaede1efd415e49ab76847bcb278edddb3d38e1540db6bf83.jpeg',
    description: 'إقامة مميزة في بيروت - 8.4 - جيد جدًا (1,601 من النقاط).'
  },
  {
    name: 'Lancaster Plaza Beirut 5 عدد النجوم',
    city: 'بيروت',
    country: 'لبنان',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/f1/4b/16182956586840dbec41d9d6b8932b10a6f8efe3045dbca2f8981aff7056.jpeg',
    description: 'إقامة مميزة في بيروت - 8.7 - ممتاز (2,183 من النقاط).'
  },
  {
    name: 'ذا سمولفيل هوتل 5 عدد النجوم',
    city: 'بيروت',
    country: 'لبنان',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/64/6e/9513e6e158e351a6a83f93ddeb2ee9678fca2d6c7c9b0fffd72b7104e1a2.jpeg',
    description: 'إقامة مميزة في بيروت - 9.0 - ممتاز (4,107 من النقاط).'
  },
  {
    name: '1866 كورت آند سويتس 5 عدد النجوم',
    city: 'بيروت',
    country: 'لبنان',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/8b/e4/ef88c6ee26cff370013cb799dae953820b2309720c79276596dd72b748c2.jpeg',
    description: 'إقامة مميزة في بيروت - 8.7 - ممتاز (1,489 من النقاط).'
  },
  {
    name: 'الجوهرة 4 عدد النجوم',
    city: 'بيروت',
    country: 'لبنان',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/hotelier-images/58/ed/0f14f1f48b396c1b741a90fec6dcdc275976362ab56c44b371a7619f881e.jpeg',
    description: 'إقامة مميزة في بيروت - 8.4 - جيد جدًا (2,011 من النقاط).'
  },
  {
    name: 'Louis V Hotel Beirut 5 عدد النجوم',
    city: 'بيروت',
    country: 'لبنان',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/hotelier-images/4e/59/923ec70a8706ff1e5311c073e5e53eef7f0a62efb52e44d47a56e7ecddba.jpeg',
    description: 'إقامة مميزة في بيروت - 8.7 - ممتاز (1,060 من النقاط).'
  },
  {
    name: 'Lancaster Hotel Raouche 4 عدد النجوم',
    city: 'بيروت',
    country: 'لبنان',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/87/28/6824c1bbc5e4417dc52279cd63227619a4499fc80ccf74d7489241a1fa13.jpeg',
    description: 'إقامة مميزة في بيروت - 8.0 - جيد جدًا (1,603 من النقاط).'
  },
  {
    name: 'لانكستر تمر 4 عدد النجوم',
    city: 'بيروت',
    country: 'لبنان',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/hotelier-images/cb/7d/60d7d3b95fc9f6a1a2f78103dedac52ecdcedaeca6a2adf84e6488b304ef.jpeg',
    description: 'إقامة مميزة في بيروت - 8.1 - جيد جدًا (1,632 من النقاط).'
  },
  {
    name: 'فندق و استديو ذا راي 4 عدد النجوم',
    city: 'بيروت',
    country: 'لبنان',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/hotelier-images/e4/4e/a108e91050dc72e32b292d7f99962dc376950ead28a16f60170e29d6deca.jpeg',
    description: 'إقامة مميزة في بيروت - 8.7 - ممتاز (777 من النقاط).'
  },
  {
    name: 'فندق راديسون بلو مارتينيز بيروت 5 عدد النجوم',
    city: 'بيروت',
    country: 'لبنان',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/hotelier-images/26/35/a0f59915d4ca63394c6d97e384c0e5d5a60f90539b06334428e0d4ed36a3.jpeg',
    description: 'إقامة مميزة في بيروت - 8.7 - ممتاز (5,543 من النقاط).'
  },
  {
    name: 'The Grand Meshmosh Hotel 2 عدد النجوم',
    city: 'بيروت',
    country: 'لبنان',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/09/16/440ccc6d5e6dc3bbb96d87aef3bd79a6ac97a69f550a33d8d91a145ebede.jpeg',
    description: 'إقامة مميزة في بيروت - يُحَدَّد مدى الرَواج استنادا إلى العدد الإجمالي لتقييمات النزلاء لمكان الإقامة هذا بالمقارنة مع أماكن الإقامة الأخرى الموجودة في بيروت والتي تنتمي إلى نفس النوع وتصنيف النجوم.'
  },
  {
    name: 'فندق موڤنبيك بيروت 5 عدد النجوم',
    city: 'بيروت',
    country: 'لبنان',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/02/67/9bd112a1144c73df9f5b56dfd2a4d7ee48ab7bb514bb66b8c7121169f173.jpeg',
    description: 'إقامة مميزة في بيروت - 8.9 - ممتاز (6,613 من النقاط).'
  },
  {
    name: 'آساها ليبانيز تراديشينال فيليدج 5 عدد النجوم',
    city: 'بيروت',
    country: 'لبنان',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/hotelier-images/0b/5f/fa9c6b42fbb4cf56f647490bb28398413673c619605ad238ac5cbaf4dade.jpeg',
    description: 'إقامة مميزة في بيروت - 8.2 - جيد جدًا (689 من النقاط).'
  },
  {
    name: 'فندق وورويك ستون 55 4 عدد النجوم',
    city: 'بيروت',
    country: 'لبنان',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/b8/1a/7b0aa957e52b360d2a83aba0fa84b73009006ef5de9ad04806ac70e94030.jpeg',
    description: 'إقامة مميزة في بيروت - 9.0 - ممتاز (932 من النقاط).'
  },
  {
    name: 'فندق ريفيرا بيروت 5 عدد النجوم',
    city: 'بيروت',
    country: 'لبنان',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/hotelier-images/de/b2/b032990e252afd16dd9b5c353c88551573bba7b937ce8dc37f8a2e7ce8e6.jpeg',
    description: 'إقامة مميزة في بيروت - 7.9 - جيد (2,827 من النقاط).'
  },
  {
    name: 'THE GEM BOUTIQUE HOTEL 3 عدد النجوم',
    city: 'بيروت',
    country: 'لبنان',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/hotelier-images/6f/ff/dd8370f4fe2fc3e32f735e5aa03db2179ca306152af90a8c7ff53c75ad10.jpeg',
    description: 'إقامة مميزة في بيروت - 9.3 - ممتاز (280 من النقاط).'
  },
  {
    name: 'فندق كوزموبوليتان 4 عدد النجوم',
    city: 'بيروت',
    country: 'لبنان',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/hotelier-images/0a/03/f5dcc5bce487c333f173a50c15fd6e32f00e7a3e1a56d570039764e1fd66.jpeg',
    description: 'إقامة مميزة في بيروت - 8.3 - جيد جدًا (639 من النقاط).'
  },
  {
    name: 'فندق كافاليه 4 عدد النجوم',
    city: 'بيروت',
    country: 'لبنان',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/hotelier-images/e2/cc/0f814e152e6970ec4c741fd65d3967889139cd8de99b38c2027f2f7343e7.jpeg',
    description: 'إقامة مميزة في بيروت - 8.3 - جيد جدًا (1,707 من النقاط).'
  },
  {
    name: 'ميديتيراني 4 عدد النجوم',
    city: 'بيروت',
    country: 'لبنان',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/4e/45/03925f13b94ca483de43d69b381c028aeafbb580267085c167a64ac5b6c7.jpeg',
    description: 'إقامة مميزة في بيروت - 8.3 - جيد جدًا (959 من النقاط).'
  },
  {
    name: 'كينجز سويتس 4 عدد النجوم',
    city: 'بيروت',
    country: 'لبنان',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/4c/b3/f2101a3a06281b8b0e83f7a3abc37ddd01b7786f70b02ae57ab5d7c6b5c4.jpeg',
    description: 'إقامة مميزة في بيروت - 8.6 - ممتاز (1,528 من النقاط).'
  },
  {
    name: 'Beverly Hotel Beirut 4 عدد النجوم',
    city: 'بيروت',
    country: 'لبنان',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/hotelier-images/2f/a5/23154c75418dcb819360facd084f4107ff31e6c5b789edb417777c851442.jpeg',
    description: 'إقامة مميزة في بيروت - يُحَدَّد مدى الرَواج استنادا إلى العدد الإجمالي لتقييمات النزلاء لمكان الإقامة هذا بالمقارنة مع أماكن الإقامة الأخرى الموجودة في بيروت والتي تنتمي إلى نفس النوع وتصنيف النجوم.'
  },
  {
    name: 'لاهويا فيردون 4 عدد النجوم',
    city: 'بيروت',
    country: 'لبنان',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/hotelier-images/32/a9/93ea18336bff708802be850c6ff4669e27f5b89d20689682ba249458d9b9.jpeg',
    description: 'إقامة مميزة في بيروت - 8.7 - ممتاز (308 من النقاط).'
  },
  {
    name: 'Serenada Golden Palace - Boutique Hotel 4 عدد النجوم',
    city: 'بيروت',
    country: 'لبنان',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/93/7b/3ddf7ac0ffc7dbf0da66bf56644495fcd89bc8f4ecaa1c8dc836ab296011.jpeg',
    description: 'إقامة مميزة في بيروت - 8.2 - جيد جدًا (1,187 من النقاط).'
  },
  {
    name: 'وارويك بالم بيتش هوتل 4 عدد النجوم',
    city: 'بيروت',
    country: 'لبنان',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/4a/cb/09e22b3ba4ab92dbe7c61200cdf8b055d27de5ffd6955d55f152904ff3e1.jpeg',
    description: 'إقامة مميزة في بيروت - 8.0 - جيد جدًا (954 من النقاط).'
  },
  // --- غير محدد ---
  {
    name: 'Massabki Hotel 4 عدد النجوم',
    city: 'لبنان',
    country: 'غير محدد',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/hotelier-images/46/2f/dd5a2e128a6d2cee0b805a4b50054e69cd184e80c3b4b8a8b6339ad9b459.jpeg',
    description: 'إقامة مميزة في لبنان - 8.5 - ممتاز (784 من النقاط).'
  },
  {
    name: 'Chateau Du Comte 5 عدد النجوم',
    city: 'لبنان',
    country: 'غير محدد',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/cb/e1/fe9d26f8a4aadea03003536ab10c7052303f119cd1302abc91100c60ba81.jpeg',
    description: 'إقامة مميزة في لبنان - 8.6 - ممتاز (221 من النقاط).'
  },
  {
    name: 'فندق غراند قادري 5 عدد النجوم',
    city: 'لبنان',
    country: 'غير محدد',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/45/28/265583ea1089e1285fcc13c2941eb8f13d3d8e584bf55b583b88fb1cb52b.jpeg',
    description: 'إقامة مميزة في لبنان - يُحَدَّد مدى الرَواج استنادا إلى العدد الإجمالي لتقييمات النزلاء لمكان الإقامة هذا بالمقارنة مع أماكن الإقامة الأخرى الموجودة في زحلة والتي تنتمي إلى نفس النوع وتصنيف النجوم.'
  },
  {
    name: 'ميست اوتيل اند سبا 5 عدد النجوم',
    city: 'لبنان',
    country: 'غير محدد',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/hotelier-images/e3/c1/cdfe04f05d9d14fff286946c121416c4ce608678f1f315c81e5ec71f543e.jpeg',
    description: 'إقامة مميزة في لبنان - يُحَدَّد مدى الرَواج استنادا إلى العدد الإجمالي لتقييمات النزلاء لمكان الإقامة هذا بالمقارنة مع أماكن الإقامة الأخرى الموجودة في أهدن والتي تنتمي إلى نفس النوع وتصنيف النجوم.'
  },
  {
    name: 'Hotel Ehden 4 عدد النجوم',
    city: 'لبنان',
    country: 'غير محدد',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/hotelier-images/37/a8/d4b9d1e80ee24e143dcdae5c064e6fcb36eb248e0a931a764c6b2f80a50f.jpeg',
    description: 'إقامة مميزة في لبنان - 8.9 - ممتاز (549 من النقاط).'
  },
  {
    name: 'بيل أزور 4 عدد النجوم',
    city: 'لبنان',
    country: 'غير محدد',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/hotelier-images/4c/cb/a84b543f2b6d4ac3e963ea9b13a2a6fb3a7b86ade5cadd0bd3fbb13c77f9.jpeg',
    description: 'إقامة مميزة في لبنان - يُحَدَّد مدى الرَواج استنادا إلى العدد الإجمالي لتقييمات النزلاء لمكان الإقامة هذا بالمقارنة مع أماكن الإقامة الأخرى الموجودة في جونية والتي تنتمي إلى نفس النوع وتصنيف النجوم.'
  },
  {
    name: 'Maximus Hotel Byblos 5 عدد النجوم',
    city: 'لبنان',
    country: 'غير محدد',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/hotelier-images/1c/7a/8a4f84388514ffd24b27787530ddb4501c0b7fcee006c186fd2ebdf88021.jpeg',
    description: 'إقامة مميزة في لبنان - 9.0 - ممتاز (442 من النقاط).'
  },
  {
    name: 'فندق وسبا البستان 5 عدد النجوم',
    city: 'لبنان',
    country: 'غير محدد',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/a8/ff/1a9b00287bc8abdbca8eb54a24aed68d7a13abab7279e6a3d87a3bb7ebc0.jpeg',
    description: 'إقامة مميزة في لبنان - يُحَدَّد مدى الرَواج استنادا إلى العدد الإجمالي لتقييمات النزلاء لمكان الإقامة هذا بالمقارنة مع أماكن الإقامة الأخرى الموجودة في بيت مري والتي تنتمي إلى نفس النوع وتصنيف النجوم.'
  },
  {
    name: 'باينلاند هوتل آند هيلث ريزورت 4 عدد النجوم',
    city: 'لبنان',
    country: 'غير محدد',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/hotelier-images/00/bb/697a1637cfd9f005a1f2308ef419b70f3f1bd71765987a735a750278a295.jpeg',
    description: 'إقامة مميزة في لبنان - 8.8 - ممتاز (1,989 من النقاط).'
  },
  {
    name: 'Intercontinental Hotels Doha Beach & Spa By Ihg 5 عدد النجوم',
    city: 'الدوحة',
    country: 'قطر',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/1d/ca/2331f95b87fc575fcac462b823f3d7d4e4e6e232f88d58c9c67c8ebd4a14.jpeg',
    description: 'إقامة مميزة في الدوحة - 9.5 - ممتاز (35,800 من النقاط).'
  },
  {
    name: 'فندق أوريكس إيربورت 4 عدد النجوم',
    city: 'الدوحة',
    country: 'قطر',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/17/1d/9d196484ada1ff3db5ae090f56a12a6b0ce88a26aba6879197550a688287.jpeg',
    description: 'إقامة مميزة في الدوحة - 8.9 - ممتاز (12,404 من النقاط).'
  },
  {
    name: 'ibis Doha 3 عدد النجوم',
    city: 'الدوحة',
    country: 'قطر',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/06/d8/e2f2db8b91da170f8f496288802cb818727b46e02ab2e386f892b6c788aa.jpeg',
    description: 'إقامة مميزة في الدوحة - 9.2 - ممتاز (11,356 من النقاط).'
  },
  {
    name: 'Intercontinental Hotels Doha - The City By Ihg 5 عدد النجوم',
    city: 'الدوحة',
    country: 'قطر',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/f1/0f/66b679238c02652236eac953c7a6256f8501bd19bb7df6260e27b8a87a24.jpeg',
    description: 'إقامة مميزة في الدوحة - 9.1 - ممتاز (16,994 من النقاط).'
  },
  {
    name: 'Al Messila, a Luxury Collection Resort & Spa, Doha 5 عدد النجوم',
    city: 'الدوحة',
    country: 'قطر',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/hotelier-images/30/ee/b398cfde4064957ab9fdeafe7cde912cc57a5f0b18bdace03608b930cbbc.jpeg',
    description: 'إقامة مميزة في الدوحة - 9.2 - ممتاز (4,582 من النقاط).'
  },
  {
    name: 'راديسون بلو هوتل الدوحة 5 عدد النجوم',
    city: 'الدوحة',
    country: 'قطر',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/0c/d8/e9a90b539912193b0659f216c994812f4924cc2c6a1474b48cdb99138b84.jpeg',
    description: 'إقامة مميزة في الدوحة - يُحَدَّد مدى الرَواج استنادا إلى العدد الإجمالي لتقييمات النزلاء لمكان الإقامة هذا بالمقارنة مع أماكن الإقامة الأخرى الموجودة في الدوحة والتي تنتمي إلى نفس النوع وتصنيف النجوم.'
  },
  {
    name: 'Hyatt Regency Oryx Doha 5 عدد النجوم',
    city: 'الدوحة',
    country: 'قطر',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/fc/43/7c17aa53f21d92d748e3f6c93d51cdccd7218468b0bc0658ae654214a994.jpeg',
    description: 'إقامة مميزة في الدوحة - 9.1 - ممتاز (15,993 من النقاط).'
  },
  {
    name: 'منتجع ومركز مؤتمرات جراند شيراتون الدوحة 5 عدد النجوم',
    city: 'الدوحة',
    country: 'قطر',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/hotelier-images/37/01/81553e43687048453c27013a337cef679288776c4a70d40955392fdb0807.jpeg',
    description: 'إقامة مميزة في الدوحة - 9.4 - ممتاز (18,609 من النقاط).'
  },
  {
    name: 'فندق سان ريجيس الدوحة 5 عدد النجوم',
    city: 'الدوحة',
    country: 'قطر',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/31/a1/e360777efa340f51dd94007688c2978353b72b413e0f80691a9deb154558.jpeg',
    description: 'إقامة مميزة في الدوحة - 9.4 - ممتاز (17,152 من النقاط).'
  },
  {
    name: 'The Bentley Luxury Hotel & Suites 5 عدد النجوم',
    city: 'الدوحة',
    country: 'قطر',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/hotelier-images/5a/ed/88b0a02d5ba9a2f2ecd2f8216aed1cf9e8df3dc4d7e61e150c332bf5eea1.jpeg',
    description: 'إقامة مميزة في الدوحة - 8.6 - ممتاز (11,289 من النقاط).'
  },
  {
    name: 'Mondrian Doha 5 عدد النجوم',
    city: 'الدوحة',
    country: 'قطر',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/hotelier-images/0e/8d/aa326ddea814a424c8da7909146eefdc2758c65559e4119caba390394ef0.jpeg',
    description: 'إقامة مميزة في الدوحة - 9.3 - ممتاز (13,496 من النقاط).'
  },
  {
    name: 'JW Marriott Marquis City Center Doha 5 عدد النجوم',
    city: 'الدوحة',
    country: 'قطر',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/00/e9/5dca715a0c631bda1944bdf2613d900a54e82ce6d1078faca438dfcaa121.jpeg',
    description: 'إقامة مميزة في الدوحة - 9.3 - ممتاز (5,613 من النقاط).'
  },
  {
    name: 'Swissôtel Corniche Park Towers Doha 5 عدد النجوم',
    city: 'الدوحة',
    country: 'قطر',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/90/4d/951eb696844b59ad26912d09e3300ab7662506695bdc478f4756555cc365.jpeg',
    description: 'إقامة مميزة في الدوحة - 9.6 - ممتاز (1,761 من النقاط).'
  },
  {
    name: 'Premium Strato Hotel 4 عدد النجوم',
    city: 'الدوحة',
    country: 'قطر',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/hotelier-images/4b/20/2bc26f6d4b4cb61f31317dfb625dccc73e9b4d8478ce6b2f23a14e230c1c.jpeg',
    description: 'إقامة مميزة في الدوحة - 7.3 - (6,551 من النقاط).'
  },
  {
    name: 'هيلتون الدوحة 5 عدد النجوم',
    city: 'الدوحة',
    country: 'قطر',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/57/21/241ecf2833a9c177c0a56fe6a0e99177599bf908d8b81c03ef5c018149a5.jpeg',
    description: 'إقامة مميزة في الدوحة - 9.1 - ممتاز (25,749 من النقاط).'
  },
  {
    name: 'فندق موڤنبيك الدوحة 4 عدد النجوم',
    city: 'الدوحة',
    country: 'قطر',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/37/85/0d98a6c563944398440672ed19812441d442c8aba70def08027cc19bd875.jpeg',
    description: 'إقامة مميزة في الدوحة - 8.7 - ممتاز (11,530 من النقاط).'
  },
  {
    name: 'Fairmont Doha 5 عدد النجوم',
    city: 'الدوحة',
    country: 'قطر',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/2e/18/3c8e36dda78a88227d69ea769847c9ddc2aaeab58ecac9cb53a60a67db7a.jpeg',
    description: 'إقامة مميزة في الدوحة - 9.2 - ممتاز (6,962 من النقاط).'
  },
  {
    name: 'Grand Regency Doha, Trademark Collection by Wyndham 5 عدد النجوم',
    city: 'الدوحة',
    country: 'قطر',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/ef/fb/8a8161c8343eca3e51e1efda1240e36adb4da04db0fa715098be3f146e82.jpeg',
    description: 'إقامة مميزة في الدوحة - 8.3 - جيد جدًا (13,903 من النقاط).'
  },
  {
    name: 'Souq Waqif Boutique Hotels by Tivoli 5 عدد النجوم',
    city: 'الدوحة',
    country: 'قطر',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/8a/ee/37e1d28fadf620eda4f84c64f87cfe4b7a67bab629211171cc674b1c3a95.jpeg',
    description: 'إقامة مميزة في الدوحة - 8.9 - ممتاز (5,003 من النقاط).'
  },
  {
    name: 'dusitD2 Salwa Doha 5 عدد النجوم',
    city: 'الدوحة',
    country: 'قطر',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/1a/4b/2a0defd1b31cbc2a243439c72b7a6125d622a48994a10d75df0275ef7d8a.jpeg',
    description: 'إقامة مميزة في الدوحة - 8.7 - ممتاز (11,484 من النقاط).'
  },
  {
    name: 'Centara West Bay Hotel & Residences Doha 5 عدد النجوم',
    city: 'الدوحة',
    country: 'قطر',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/hotelier-images/7f/6d/acb40af033dfdbc3d55cf5b185b86409f26d8aba18611a554c916b3b19ee.jpeg',
    description: 'إقامة مميزة في الدوحة - 9.1 - ممتاز (4,069 من النقاط).'
  },
  {
    name: 'Wyndham Doha West Bay 5 عدد النجوم',
    city: 'الدوحة',
    country: 'قطر',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/hotelier-images/39/44/a9fcc77ea11851f1e496db317f4205218407690ece8f0c3c352ab1da4987.jpeg',
    description: 'إقامة مميزة في الدوحة - 8.8 - ممتاز (8,425 من النقاط).'
  },
  {
    name: 'The Chedi Katara Hotel & Resort 5 عدد النجوم',
    city: 'الدوحة',
    country: 'قطر',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/17/10/26e874315361845533bbded95b11ac578a329991ab2d205c532b241a7beb.jpeg',
    description: 'إقامة مميزة في الدوحة - 9.6 - ممتاز (5,764 من النقاط).'
  },
  {
    name: 'Central Inn Souq Waqif 4 عدد النجوم',
    city: 'الدوحة',
    country: 'قطر',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/4c/dd/29fa81a71dd2d98cc3496b435cb3623b6c0b485453b268b9785e3d5647ed.jpeg',
    description: 'إقامة مميزة في الدوحة - 8.7 - ممتاز (7,370 من النقاط).'
  },
  {
    name: 'سيتي سنتر روتانا الدوحة 5 عدد النجوم',
    city: 'الدوحة',
    country: 'قطر',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/hotelier-images/b5/01/42d2827cc97549535cf61a13b2257b75f3f7f64e0bd8e5f55d47d5a9309e.jpeg',
    description: 'إقامة مميزة في الدوحة - 9.3 - ممتاز (13,889 من النقاط).'
  },
  {
    name: 'Steigenberger Residence Doha 5 عدد النجوم',
    city: 'الدوحة',
    country: 'قطر',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/c1/0f/1ae67eae7ce6c1044842286d11f367c69fe7a08f7ce3af6ccebbe1af52b2.jpeg',
    description: 'إقامة مميزة في الدوحة - 8.6 - ممتاز (1,694 من النقاط).'
  },
  {
    name: 'The Westin Doha Hotel & Spa 5 عدد النجوم',
    city: 'الدوحة',
    country: 'قطر',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/89/41/e316dac04c24c518a7b192e57495669370924df1cc0fb2c5ac55fd2774f9.jpeg',
    description: 'إقامة مميزة في الدوحة - 9.2 - ممتاز (9,536 من النقاط).'
  },
  {
    name: 'Alwadi Hotel Doha - MGallery Collection 5 عدد النجوم',
    city: 'الدوحة',
    country: 'قطر',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/hotelier-images/4c/de/b16e61eb481e70e1ef3b6f23f50f3970982629a70c85cb01ea60889dc750.jpeg',
    description: 'إقامة مميزة في الدوحة - 9.6 - ممتاز (14,873 من النقاط).'
  },
  {
    name: 'فندق سفير الدوحة 4 عدد النجوم',
    city: 'الدوحة',
    country: 'قطر',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/hotelier-images/56/17/25601f91ee0d1303ff07269d1deb50091e854358f29fed60ce21f1d2dc13.jpeg',
    description: 'إقامة مميزة في الدوحة - 8.7 - ممتاز (13,084 من النقاط).'
  },
  {
    name: 'Element by Marriott City Center Doha 5 عدد النجوم',
    city: 'الدوحة',
    country: 'قطر',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/86/4e/930ff42734d23a087d222a2ea52740128d460f3c7391799c7983300c1991.jpeg',
    description: 'إقامة مميزة في الدوحة - 8.8 - ممتاز (2,719 من النقاط).'
  },
  {
    name: 'بانانا آيلاند ريزورت الدوحة باي أنانتارا 5 عدد النجوم',
    city: 'الدوحة',
    country: 'قطر',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/83/e2/33e67afd2b17cba183e33ab9399b02d910520fd2dbae4d1119dce82b50c0.jpeg',
    description: 'إقامة مميزة في الدوحة - يُحَدَّد مدى الرَواج استنادا إلى العدد الإجمالي لتقييمات النزلاء لمكان الإقامة هذا بالمقارنة مع أماكن الإقامة الأخرى الموجودة في الدوحة والتي تنتمي إلى نفس النوع وتصنيف النجوم.'
  },
  {
    name: 'Holiday Inn Doha - The Business Park By Ihg 4 عدد النجوم',
    city: 'الدوحة',
    country: 'قطر',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/d3/0c/8750f36f1ee3628d7d7a12ccc0f549d200cde93be2075d60be6f982453ea.jpeg',
    description: 'إقامة مميزة في الدوحة - 9.2 - ممتاز (8,487 من النقاط).'
  },
  // --- غير محدد ---
  {
    name: 'Souq Al Wakra Hotel Qatar By Tivoli 5 عدد النجوم',
    city: 'قطر',
    country: 'غير محدد',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/hotelier-images/f6/93/c03f7b9f6f03cc91df79278d7227686d78de7eedecdec2721a8f50e13a9e.jpeg',
    description: 'إقامة مميزة في قطر - يُحَدَّد مدى الرَواج استنادا إلى العدد الإجمالي لتقييمات النزلاء لمكان الإقامة هذا بالمقارنة مع أماكن الإقامة الأخرى الموجودة في الوكرة والتي تنتمي إلى نفس النوع وتصنيف النجوم.'
  },
  {
    name: 'Waldorf Astoria Doha Lusail 5 عدد النجوم',
    city: 'قطر',
    country: 'غير محدد',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/1d/a0/73117c0367723160c054ac4f9177fbea6dcff0aafef9896e26fe68404ce7.jpeg',
    description: 'إقامة مميزة في قطر - يُحَدَّد مدى الرَواج استنادا إلى العدد الإجمالي لتقييمات النزلاء لمكان الإقامة هذا بالمقارنة مع أماكن الإقامة الأخرى الموجودة في أم صلال والتي تنتمي إلى نفس النوع وتصنيف النجوم.'
  },
  {
    name: 'Grand Millennium Sulaimani 5 عدد النجوم',
    city: 'العراق',
    country: 'غير محدد',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/22/4a/ab164bb7166f226ac06daae66b2dd04ea65ddb21ed2e166e0b6334e4ac30.jpeg',
    description: 'إقامة مميزة في العراق - 9.0 - ممتاز (3,811 من النقاط).'
  },
  {
    name: 'Erbil Arjaan by Rotana 4 عدد النجوم',
    city: 'العراق',
    country: 'غير محدد',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/hotelier-images/4b/04/8ff1f0b47cd408b68103c7e3db5fb620943b3a0368a4b9ebdc1990469cea.jpeg',
    description: 'إقامة مميزة في العراق - يُحَدَّد مدى الرَواج استنادا إلى العدد الإجمالي لتقييمات النزلاء لمكان الإقامة هذا بالمقارنة مع أماكن الإقامة الأخرى الموجودة في Erbil والتي تنتمي إلى نفس النوع وتصنيف النجوم.'
  },
  {
    name: 'Titanic Hotel & Spa 5 عدد النجوم',
    city: 'العراق',
    country: 'غير محدد',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/hotelier-images/4d/1b/0910905b712c2ec55f20c50b325986d5cade9c9661ed15fc9fad4169dc94.jpeg',
    description: 'إقامة مميزة في العراق - 8.9 - ممتاز (3,224 من النقاط).'
  },
  {
    name: 'Erbil Rotana 5 عدد النجوم',
    city: 'العراق',
    country: 'غير محدد',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/hotelier-images/c0/24/82bad46c570c0c9f5f88fa5e0e28582f0270a664fced2b9ed4c9ac9f24da.jpeg',
    description: 'إقامة مميزة في العراق - 9.3 - ممتاز (6,016 من النقاط).'
  },
  {
    name: 'Khan Saray 4 عدد النجوم',
    city: 'العراق',
    country: 'غير محدد',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/hotelier-images/e7/b5/9c7db7f1344b91553953a115cc4d79cfc049095004f41b9ae780280e826b.jpeg',
    description: 'إقامة مميزة في العراق - 8.3 - جيد جدًا (1,368 من النقاط).'
  },
  {
    name: 'Ramada by Wyndham Erbil Gulan Street 3 عدد النجوم',
    city: 'العراق',
    country: 'غير محدد',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/e0/3e/e450644c45b1ebe5bb814b8335d8c70e69b62d593fec4505f4484fb988a8.jpeg',
    description: 'إقامة مميزة في العراق - يُحَدَّد مدى الرَواج استنادا إلى العدد الإجمالي لتقييمات النزلاء لمكان الإقامة هذا بالمقارنة مع أماكن الإقامة الأخرى الموجودة في Erbil والتي تنتمي إلى نفس النوع وتصنيف النجوم.'
  },
  {
    name: 'Helmond Hotel 5 عدد النجوم',
    city: 'العراق',
    country: 'غير محدد',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/hotelier-images/a9/8a/9b80e695afd0db19554931730dec75078608c5c8480ee58043e9cdcd868a.jpeg',
    description: 'إقامة مميزة في العراق - 8.8 - ممتاز (316 من النقاط).'
  },
  {
    name: 'Radisson Hotel & Residences Erbil 5 عدد النجوم',
    city: 'العراق',
    country: 'غير محدد',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/6d/b7/35e7f471f49b2dda78952b557ac014f7573c6f55bb2349b36bf5353827e5.jpeg',
    description: 'إقامة مميزة في العراق - 9.8 - ممتاز (3,368 من النقاط).'
  },
  {
    name: 'Hotel Halwachy 4 عدد النجوم',
    city: 'العراق',
    country: 'غير محدد',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/43/44/8c422aed37b0923de03adb9f13071799b9a751b404ff72f9e6c12f97467c.jpeg',
    description: 'إقامة مميزة في العراق - 7.9 - جيد (577 من النقاط).'
  },
  {
    name: 'Copthorne Hotel Baranan 4 عدد النجوم',
    city: 'العراق',
    country: 'غير محدد',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/37/b1/a10de73f0cfeec7b17dcc8f297b232bca515743485b863e33002ae973210.jpeg',
    description: 'إقامة مميزة في العراق - 8.9 - ممتاز (1,648 من النقاط).'
  },
  {
    name: 'Slemani Rotana 5 عدد النجوم',
    city: 'العراق',
    country: 'غير محدد',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/af/04/9272926d8abd11733c26f916a53c4e82bf87a67b38dee003312d59ca01ca.jpeg',
    description: 'إقامة مميزة في العراق - 9.0 - ممتاز (1,406 من النقاط).'
  },
  {
    name: 'Sipan Hotel 5 عدد النجوم',
    city: 'العراق',
    country: 'غير محدد',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/hotelier-images/39/68/614b39a23f0e07b11f358c03c09d996b7378f5436472031ffeddebc9c8e3.jpeg',
    description: 'إقامة مميزة في العراق - 8.4 - جيد جدًا (1,315 من النقاط).'
  },
  {
    name: 'Hotel Sinaia Palace 3 عدد النجوم',
    city: 'العراق',
    country: 'غير محدد',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/85/ca/184d1c8995bc7eb28a6d3b77849dd1bec9ab4ce4c6f8b5c3c0e2e2c8942b.jpeg',
    description: 'إقامة مميزة في العراق - 7.4 - (928 من النقاط).'
  },
  {
    name: 'Quaint Hotel Erbil 5 عدد النجوم',
    city: 'العراق',
    country: 'غير محدد',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/e7/28/a7fe4e7745489083ce28356413771f0a6ac8e680526caefce2000d7f1d5c.jpeg',
    description: 'إقامة مميزة في العراق - 8.0 - جيد جدًا (445 من النقاط).'
  },
  {
    name: 'Noble Hotel 5 عدد النجوم',
    city: 'العراق',
    country: 'غير محدد',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/54/9b/c9eeb18dd7c1763740780cfd996c767b54f3c510a49b458d9e07d34583af.jpeg',
    description: 'إقامة مميزة في العراق - 7.3 - (134 من النقاط).'
  },
  {
    name: 'Mihrako Hotel & Spa 4 عدد النجوم',
    city: 'العراق',
    country: 'غير محدد',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/hotelier-images/c8/cb/a00a38099904caa901a65c55ee59fd5262a43b9d4afaa10729409ee36f0a.jpeg',
    description: 'إقامة مميزة في العراق - 8.6 - ممتاز (247 من النقاط).'
  },
  {
    name: 'Erbil International Hotel 5 عدد النجوم',
    city: 'العراق',
    country: 'غير محدد',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/66/e9/a42f8230bdc421e8faac6e614679ec04479dbb057d934c63085ed79306f0.jpeg',
    description: 'إقامة مميزة في العراق - 8.6 - ممتاز (2,529 من النقاط).'
  },
  {
    name: 'Cristal Erbil Hotel 5 عدد النجوم',
    city: 'العراق',
    country: 'غير محدد',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/hotelier-images/1e/9a/42b39f223ff6a382d240d922069cdc764110758d2e0db88dd7ed5b992790.jpeg',
    description: 'إقامة مميزة في العراق - 8.6 - ممتاز (3,528 من النقاط).'
  },
  {
    name: 'Ankawa Royal Hotel & Spa 5 عدد النجوم',
    city: 'العراق',
    country: 'غير محدد',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/hotelier-images/95/a5/5d47a518b0790f3667acbaad035c1d546e66d797db70590e7ffa347c9844.jpeg',
    description: 'إقامة مميزة في العراق - 8.4 - جيد جدًا (1,800 من النقاط).'
  },
  // --- العراق ---
  {
    name: 'MOVENPICK HOTEL AL ZAYTOON BAGHDAD 5 عدد النجوم',
    city: 'بغداد',
    country: 'العراق',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/14/63/44fa4b29425fcb5072c9e43de51a2d5121b093721e1ceadfe8b7dbe8ca1f.jpeg',
    description: 'إقامة مميزة في بغداد - 9.5 - ممتاز (341 من النقاط).'
  },
  {
    name: 'Babylon Rotana 5 عدد النجوم',
    city: 'بغداد',
    country: 'العراق',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/hotelier-images/0e/36/ffb9513dfb9b6b1c26e1b8dbda6d652647e16c14d230b2936da03c71a21b.jpeg',
    description: 'إقامة مميزة في بغداد - يُحَدَّد مدى الرَواج استنادا إلى العدد الإجمالي لتقييمات النزلاء لمكان الإقامة هذا بالمقارنة مع أماكن الإقامة الأخرى الموجودة في بغداد والتي تنتمي إلى نفس النوع وتصنيف النجوم.'
  },
  {
    name: 'Al Yarmouk International Hotel 5 عدد النجوم',
    city: 'بغداد',
    country: 'العراق',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/hotelier-images/86/a2/3523a9cb6c8f19e1aab4e26454c041befebbc8f51801d979a442a5795919.jpeg',
    description: 'إقامة مميزة في بغداد - 8.4 - جيد جدًا (687 من النقاط).'
  },
  {
    name: 'Bilitom Hotel 4 عدد النجوم',
    city: 'بغداد',
    country: 'العراق',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/e0/81/2b8167eb337cd39cb9e520f508b5e4675d17e24364391ffdb5e7312e810e.jpeg',
    description: 'إقامة مميزة في بغداد - 8.2 - جيد جدًا (934 من النقاط).'
  },
  {
    name: 'Coral Palace Hotel 4 عدد النجوم',
    city: 'بغداد',
    country: 'العراق',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/hotelier-images/b9/38/46c9befde160a07e9f74c2778f70f7beda99ec0576be59d06db9cd240e12.jpeg',
    description: 'إقامة مميزة في بغداد - 8.5 - ممتاز (1,004 من النقاط).'
  },
  {
    name: 'Grand Millennium Al Seef Basra 5 عدد النجوم',
    city: 'بغداد',
    country: 'العراق',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/hotelier-images/a1/22/b86215e7652f94f83eb7180d0edd0ab37fb8b485f9f84e4c337a1abde70b.jpeg',
    description: 'إقامة مميزة في بغداد - 8.9 - ممتاز (1,946 من النقاط).'
  },
  {
    name: 'Shaheen Hotel 5 عدد النجوم',
    city: 'بغداد',
    country: 'العراق',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/hotelier-images/19/37/d28eee7efa47b7582f831bdc5fae23e9e5f74af99b3902a1318c57f2e6ab.jpeg',
    description: 'إقامة مميزة في بغداد - 8.1 - جيد جدًا (538 من النقاط).'
  },
  {
    name: 'قصر الدر 5 عدد النجوم',
    city: 'بغداد',
    country: 'العراق',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/hotelier-images/1e/b7/5ced4028ff6adc03c69f2ca4ca48725c6fafeebcc440e974fb2a25f26fd1.jpeg',
    description: 'إقامة مميزة في بغداد - 8.5 - ممتاز (2,902 من النقاط).'
  },
  {
    name: 'Bristoria Hotel Erbil 5 عدد النجوم',
    city: 'بغداد',
    country: 'العراق',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/hotelier-images/a9/33/e56060ea195fd969773c0773068e0947613232c8ef6231c4bb759215e74e.jpeg',
    description: 'إقامة مميزة في بغداد - 9.2 - ممتاز (2,200 من النقاط).'
  },
  {
    name: 'Noor Land Hotel 4 عدد النجوم',
    city: 'بغداد',
    country: 'العراق',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/57/78/cd7c469b7b8749852c31603941dcf2b05ffc2cec08b7376e67b45f843d5b.jpeg',
    description: 'إقامة مميزة في بغداد - يُحَدَّد مدى الرَواج استنادا إلى العدد الإجمالي لتقييمات النزلاء لمكان الإقامة هذا بالمقارنة مع أماكن الإقامة الأخرى الموجودة في بغداد والتي تنتمي إلى نفس النوع وتصنيف النجوم.'
  },
  {
    name: 'Grand Palace Hotel Erbil 4 عدد النجوم',
    city: 'بغداد',
    country: 'العراق',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/hotelier-images/c5/1a/bf6f9ef9aa273de0e0070019adf5dfaed70b58f377c344a251ab432bcade.jpeg',
    description: 'إقامة مميزة في بغداد - 8.5 - ممتاز (631 من النقاط).'
  },
  {
    name: 'BAZ Hotel 4 عدد النجوم',
    city: 'بغداد',
    country: 'العراق',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/3a/24/14fee5368471dfc1532e9e2a3c5902ec0525100b510dfcf6ef2feb5c065b.jpeg',
    description: 'إقامة مميزة في بغداد - 8.5 - ممتاز (418 من النقاط).'
  },
  {
    name: 'Kristal Hotel Duhok 4 عدد النجوم',
    city: 'بغداد',
    country: 'العراق',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/hotelier-images/c8/ec/a6f98de443c454ce6cb272b8c475a7a63a314bf74cb3f1157303b5b4ff22.jpeg',
    description: 'إقامة مميزة في بغداد - 7.7 - جيد (914 من النقاط).'
  },
  {
    name: 'Inter Hotel 4 عدد النجوم',
    city: 'بغداد',
    country: 'العراق',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/hotelier-images/a3/c7/2d101ddc7a1b7e41f28d633eaba8734898d8850573445aa1308be7808b23.jpeg',
    description: 'إقامة مميزة في بغداد - 6.8 - (381 من النقاط).'
  },
  {
    name: 'Andalus Apartments 4 عدد النجوم',
    city: 'بغداد',
    country: 'العراق',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/hotelier-images/d5/9c/f26687dd04c305384bbf3be53665c24a6d5650259c3975d722ba06829d01.jpeg',
    description: 'إقامة مميزة في بغداد - 8.4 - جيد جدًا (751 من النقاط).'
  },
  {
    name: 'Zenat Al-Hayat Basra Hotel 5 عدد النجوم',
    city: 'بغداد',
    country: 'العراق',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/0b/5c/74a4a3efea162d555a21e49b4513c1524a39e37b776355c2f9195b65c144.jpeg',
    description: 'إقامة مميزة في بغداد - 8.1 - جيد جدًا (236 من النقاط).'
  },
  {
    name: 'Radisson Residences Cairo Heliopolis 5 عدد النجوم',
    city: 'القاهرة',
    country: 'مصر',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/ec/0a/b5b41161ad299c67bf4a73488d5477ed9777ba5d85f71bff02bbee08c385.jpeg',
    description: 'إقامة مميزة في القاهرة - 9.2 - ممتاز (1,300 من النقاط).'
  },
  {
    name: 'Steigenberger Hotel El Tahrir Cairo 4 عدد النجوم',
    city: 'القاهرة',
    country: 'مصر',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/5f/9f/f4f59efeb444d66bb4543942861738f69ed3c50239421df09d036d2ebcf3.jpeg',
    description: 'إقامة مميزة في القاهرة - يُحَدَّد مدى الرَواج استنادا إلى العدد الإجمالي لتقييمات النزلاء لمكان الإقامة هذا بالمقارنة مع أماكن الإقامة الأخرى الموجودة في القاهرة والتي تنتمي إلى نفس النوع وتصنيف النجوم.'
  },
  {
    name: 'Steigenberger Pyramids Cairo 5 عدد النجوم',
    city: 'القاهرة',
    country: 'مصر',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/86/63/a81d901e87b92fac2f1ff572ec4a761c11c654266e825e9da0e5fb91b04d.jpeg',
    description: 'إقامة مميزة في القاهرة - 8.7 - ممتاز (10,601 من النقاط).'
  },
  {
    name: 'جاز بيلفيدير 5 عدد النجوم',
    city: 'شرم الشيخ',
    country: 'مصر',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/dd/29/f3783a32ffaf54bc77b1b4dabe52198dbba3fb7c1a415cd234f37ec326ac.jpeg',
    description: 'إقامة مميزة في شرم الشيخ - 9.4 - ممتاز (30,445 من النقاط).'
  },
  {
    name: 'منتجع جاز فنارة 5 عدد النجوم',
    city: 'شرم الشيخ',
    country: 'مصر',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/53/51/3ed1cff8d1cc219c8f18c2ad235dc7adfa3ab1c0b10dbdd6fb5576c70203.jpeg',
    description: 'إقامة مميزة في شرم الشيخ - 9.6 - ممتاز (23,347 من النقاط).'
  },
  {
    name: 'Steigenberger ALDAU Beach Hotel 5 عدد النجوم',
    city: 'الغردقة',
    country: 'مصر',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/50/60/1b9bd3614735541ac43dff11f36a56635a1ec4941994a8573111c8a9a9f5.jpeg',
    description: 'إقامة مميزة في الغردقة - 9.5 - ممتاز (33,518 من النقاط).'
  },
  {
    name: 'ميريديان مطار القاهرة 5 عدد النجوم',
    city: 'القاهرة',
    country: 'مصر',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/7d/f6/b5d34c56c92c2b6e76ffc8fe4a1a524e3bb3a48241beca6d9c28b32d7e15.jpeg',
    description: 'إقامة مميزة في القاهرة - 9.0 - ممتاز (18,125 من النقاط).'
  },
  {
    name: 'Waldorf Astoria Cairo Heliopolis 5 عدد النجوم',
    city: 'القاهرة',
    country: 'مصر',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/f1/c9/563bc007126f797d2de997a8a1d4491fe4185e05eb3ee89b2f6ea8081d3e.jpeg',
    description: 'إقامة مميزة في القاهرة - 9.5 - ممتاز (3,085 من النقاط).'
  },
  {
    name: 'JAZ Elite Palace - Adults Only 5 عدد النجوم',
    city: 'شرم الشيخ',
    country: 'مصر',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/hotelier-images/9a/42/5fc92d2943ea02f4bd03b915d07e612e1e3b9f8389a8e2b1f783482d6732.jpeg',
    description: 'إقامة مميزة في شرم الشيخ - 9.5 - ممتاز (15,273 من النقاط).'
  },
  {
    name: 'ستايغنبرغر أكوا ماجيك هوتل شامل جميع الخدمات 5 عدد النجوم',
    city: 'الغردقة',
    country: 'مصر',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/51/6a/8794ea58bb3146f74cdc52db2f38162118cd791ea0ecc2f30db1c04df528.jpeg',
    description: 'إقامة مميزة في الغردقة - 9.3 - ممتاز (57,970 من النقاط).'
  },
  {
    name: 'هيلتون النيل المعادي 5 عدد النجوم',
    city: 'القاهرة',
    country: 'مصر',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/0c/bd/79a685b84c8d719d37cbcd0436525b37cc8c8b771ab75026fa091e47c44a.jpeg',
    description: 'إقامة مميزة في القاهرة - 9.1 - ممتاز (2,413 من النقاط).'
  },
  {
    name: 'Sheraton Cairo Hotel & Casino 5 عدد النجوم',
    city: 'الجيزة',
    country: 'مصر',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/3a/ad/2572b6295a2cf3cc809f73761217eef49f52ce714ef8df52723c4dae9266.jpeg',
    description: 'إقامة مميزة في الجيزة - 8.9 - ممتاز (15,285 من النقاط).'
  },
  {
    name: 'Hilton Cairo Grand Nile 5 عدد النجوم',
    city: 'القاهرة',
    country: 'مصر',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/3b/45/98fa9f562aaa0ecd16f785508da88a59e29f396bed206633222b5cabddf0.jpeg',
    description: 'إقامة مميزة في القاهرة - 8.2 - جيد جدًا (33,029 من النقاط).'
  },
  {
    name: 'Steigenberger Cecil Hotel 4 عدد النجوم',
    city: 'الإسكندرية',
    country: 'مصر',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/d8/64/5d50f8a646cddf1e4ec73f76ecdbb83f15b4295afdb97d1969ff7edac518.jpeg',
    description: 'إقامة مميزة في الإسكندرية - يُحَدَّد مدى الرَواج استنادا إلى العدد الإجمالي لتقييمات النزلاء لمكان الإقامة هذا بالمقارنة مع أماكن الإقامة الأخرى الموجودة في الإسكندرية والتي تنتمي إلى نفس النوع وتصنيف النجوم.'
  },
  {
    name: 'منتجع جاز ميرابل ريزورت 5 عدد النجوم',
    city: 'شرم الشيخ',
    country: 'مصر',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/hotelier-images/a6/59/680e0ff832272e39e1ce3b65460acfee5b3672c85563d9dc04ceead3fd28.jpeg',
    description: 'إقامة مميزة في شرم الشيخ - 9.0 - ممتاز (21,812 من النقاط).'
  },
  {
    name: 'فندق ماريوت القاهرة وكازينو عمر الخيام 5 عدد النجوم',
    city: 'القاهرة',
    country: 'مصر',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/3a/61/bab893b70623e921597aa8971bb6ed3814f24be88022dc9e52ebdd1a4ec5.jpeg',
    description: 'إقامة مميزة في القاهرة - 8.9 - ممتاز (36,966 من النقاط).'
  },
  {
    name: 'Four Seasons at Nile Plaza 5 عدد النجوم',
    city: 'القاهرة',
    country: 'مصر',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/e7/7c/984e62beb42827d7b42601e559eb5cdea5c2330f60cd93a6a977a28c20c3.jpeg',
    description: 'إقامة مميزة في القاهرة - 9.2 - ممتاز (22,216 من النقاط).'
  },
  {
    name: 'Intercontinental Hotels Cairo Semiramis By Ihg 5 عدد النجوم',
    city: 'القاهرة',
    country: 'مصر',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/5e/af/be9bbe98c853e853b9d95857967279b42b98822c4fe3e3880bec4ce92fa5.jpeg',
    description: 'إقامة مميزة في القاهرة - يُحَدَّد مدى الرَواج استنادا إلى العدد الإجمالي لتقييمات النزلاء لمكان الإقامة هذا بالمقارنة مع أماكن الإقامة الأخرى الموجودة في القاهرة والتي تنتمي إلى نفس النوع وتصنيف النجوم.'
  },
  {
    name: 'فندق كيمبينسكي النيل القاهرة 5 عدد النجوم',
    city: 'القاهرة',
    country: 'مصر',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/hotelier-images/02/77/7874123a039c781673f8f7bfe8cd32c60a89b869ab1571df6aa1e1faea5d.jpeg',
    description: 'إقامة مميزة في القاهرة - 9.2 - ممتاز (24,210 من النقاط).'
  },
  // --- غير محدد ---
  {
    name: 'Steigenberger Nile Palace 5 عدد النجوم',
    city: 'مصر',
    country: 'غير محدد',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/85/b2/94ed849dfd05317e9e139eddad78feb782c9c2d84197856a7179f1d2fc29.jpeg',
    description: 'إقامة مميزة في مصر - 9.1 - ممتاز (12,095 من النقاط).'
  },
  {
    name: 'منتجع وسبا هيلتون الأقصر 5 عدد النجوم',
    city: 'مصر',
    country: 'غير محدد',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/hotelier-images/0d/ec/9102afb1edd1e123a505f077ab9657272635a56dd774dbdfd783673a32de.jpeg',
    description: 'إقامة مميزة في مصر - 9.3 - ممتاز (10,266 من النقاط).'
  },
  {
    name: 'Steigenberger Coraya Beach 5 عدد النجوم',
    city: 'مصر',
    country: 'غير محدد',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/hotelier-images/1c/61/581ed99cf16cd500ad1b2d04898d49c2cab69a2cfa3bb78a4df885a20912.jpeg',
    description: 'إقامة مميزة في مصر - 9.7 - ممتاز (28,809 من النقاط).'
  },
  {
    name: 'Kempinski Hotel Soma Bay 5 عدد النجوم',
    city: 'مصر',
    country: 'غير محدد',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/0c/c7/216f20df5653592ccbf31646745736703b0c03e31731e05cf859c806294a.jpeg',
    description: 'إقامة مميزة في مصر - يُحَدَّد مدى الرَواج استنادا إلى العدد الإجمالي لتقييمات النزلاء لمكان الإقامة هذا بالمقارنة مع أماكن الإقامة الأخرى الموجودة في خليج سوما والتي تنتمي إلى نفس النوع وتصنيف النجوم.'
  },
  {
    name: 'Casa Cook El Gouna - Adults Only 5 عدد النجوم',
    city: 'مصر',
    country: 'غير محدد',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/hotelier-images/69/22/d7386501d6527c50368132813525c9ed3c11adb9c4d7db9cfde13d2c5ecf.jpeg',
    description: 'إقامة مميزة في مصر - 9.6 - ممتاز (6,693 من النقاط).'
  },
  {
    name: 'Jaz Asteria 5 عدد النجوم',
    city: 'مصر',
    country: 'غير محدد',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/hotelier-images/8b/92/36e66e9cd24967b8cc538bd20dbf4fc45e41945e6abb2902d1452e8117da.jpeg',
    description: 'إقامة مميزة في مصر - 9.8 - ممتاز (4,052 من النقاط).'
  },
  {
    name: 'جاز أكوافيفا 5 عدد النجوم',
    city: 'مصر',
    country: 'غير محدد',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/hotelier-images/3e/85/ad1db0c50c5bb391e17d630d18fffed2bbed976ff41e6b0386e19df45269.jpeg',
    description: 'إقامة مميزة في مصر - يُحَدَّد مدى الرَواج استنادا إلى العدد الإجمالي لتقييمات النزلاء لمكان الإقامة هذا بالمقارنة مع أماكن الإقامة الأخرى الموجودة في خليج مقادي والتي تنتمي إلى نفس النوع وتصنيف النجوم.'
  },
  {
    name: 'منتجع شتاينبرجر جولف الجونة 5 عدد النجوم',
    city: 'مصر',
    country: 'غير محدد',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/cd/19/c9b56678f951e6b68970b346f5aa59ac8dbb4612a6143585d02be1bebf62.jpeg',
    description: 'إقامة مميزة في مصر - 9.2 - ممتاز (8,293 من النقاط).'
  },
  {
    name: 'Giza Palace 5 عدد النجوم',
    city: 'مصر',
    country: 'غير محدد',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/26/86/59ae5464ea6e9b8d78f951cbf87fa8562a848bc7e8082c3cfe4fb3fb3815.jpeg',
    description: 'إقامة مميزة في مصر - 9.4 - ممتاز (1,069 من النقاط).'
  },
  {
    name: 'DoubleTree by Hilton Mangroovy El Gouna Resort 5 عدد النجوم',
    city: 'مصر',
    country: 'غير محدد',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/hotelier-images/a9/c4/e4b630ad2f1ce561e03fd6918503e7018996bc242aae1e3c85d9b2f7002f.jpeg',
    description: 'إقامة مميزة في مصر - 9.3 - ممتاز (1,204 من النقاط).'
  },
  {
    name: 'جاز مكادي الواحة كلوب 5 عدد النجوم',
    city: 'مصر',
    country: 'غير محدد',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/hotelier-images/25/d9/100fff04fd129f2d809c377bacb2be65941c9dd824028760278e8ebf9e12.jpeg',
    description: 'إقامة مميزة في مصر - 9.4 - ممتاز (29,847 من النقاط).'
  },
  {
    name: 'Steigenberger Makadi 5 عدد النجوم',
    city: 'مصر',
    country: 'غير محدد',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/hotelier-images/c5/61/e602590aa54bf5b2ed790de77293a7058ed260f0e5b88d54348c5bb0c52e.jpeg',
    description: 'إقامة مميزة في مصر - 9.5 - ممتاز (8,632 من النقاط).'
  },
  {
    name: 'Iberotel Luxor by JAZ 4 عدد النجوم',
    city: 'مصر',
    country: 'غير محدد',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/85/98/9d6abd3f5648e7113c079eb39ce81b0fe373a318585fa748465ab545db92.jpeg',
    description: 'إقامة مميزة في مصر - يُحَدَّد مدى الرَواج استنادا إلى العدد الإجمالي لتقييمات النزلاء لمكان الإقامة هذا بالمقارنة مع أماكن الإقامة الأخرى الموجودة في الأقصر والتي تنتمي إلى نفس النوع وتصنيف النجوم.'
  },
  {
    name: 'جاز دهبية 4 عدد النجوم',
    city: 'مصر',
    country: 'غير محدد',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/hotelier-images/9a/ff/c49b07088572b1f0cd59fe2d66804cf6fac766f73e0f8e8f8888a25ac7c6.jpeg',
    description: 'إقامة مميزة في مصر - يُحَدَّد مدى الرَواج استنادا إلى العدد الإجمالي لتقييمات النزلاء لمكان الإقامة هذا بالمقارنة مع أماكن الإقامة الأخرى الموجودة في دهب والتي تنتمي إلى نفس النوع وتصنيف النجوم.'
  },
  {
    name: 'JAZ Little Venice Golf Resort 5 عدد النجوم',
    city: 'مصر',
    country: 'غير محدد',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/28/06/731a7794ccb13df78bd968dfbdfaa7bfec29ac57f3ccec6f86a040b96711.jpeg',
    description: 'إقامة مميزة في مصر - يُحَدَّد مدى الرَواج استنادا إلى العدد الإجمالي لتقييمات النزلاء لمكان الإقامة هذا بالمقارنة مع أماكن الإقامة الأخرى الموجودة في العين السخنة والتي تنتمي إلى نفس النوع وتصنيف النجوم.'
  },
  {
    name: 'Hyatt Regency Cairo West 5 عدد النجوم',
    city: 'مصر',
    country: 'غير محدد',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/hotelier-images/85/80/a185b7eedd0026c142186d6119b263831a0910407b017540b7936e0c9fe4.jpeg',
    description: 'إقامة مميزة في مصر - 9.3 - ممتاز (7,595 من النقاط).'
  },
  {
    name: 'Intercontinental Hotels Al Jubail By Ihg 5 عدد النجوم',
    city: 'المملكة العربية السعودية',
    country: 'غير محدد',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/hotelier-images/0e/73/bab99355a7a01cc37cbf6bc2c6891f9b37892f58b0c3de58293fc6231ff2.jpeg',
    description: 'إقامة مميزة في المملكة العربية السعودية - يُحَدَّد مدى الرَواج استنادا إلى العدد الإجمالي لتقييمات النزلاء لمكان الإقامة هذا بالمقارنة مع أماكن الإقامة الأخرى الموجودة في الجبيل والتي تنتمي إلى نفس النوع وتصنيف النجوم.'
  },
  {
    name: 'Kempinski Al Othman Hotel Al Khobar 5 عدد النجوم',
    city: 'المملكة العربية السعودية',
    country: 'غير محدد',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/hotelier-images/32/db/af9ae3e3c4605cff5bb61a551a3e90cf61b17008cf7fa1f27054c1a100c7.jpeg',
    description: 'إقامة مميزة في المملكة العربية السعودية - 9.2 - ممتاز (22,650 من النقاط).'
  },
  {
    name: 'فندق موڤنبيك القصيم 5 عدد النجوم',
    city: 'المملكة العربية السعودية',
    country: 'غير محدد',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/05/ab/871b4ed650e7c869a42397f4788450783560c14661ca820542a400216f03.jpeg',
    description: 'إقامة مميزة في المملكة العربية السعودية - 8.8 - ممتاز (7,495 من النقاط).'
  },
  {
    name: 'فندق دابل تري باي هيلتون الظهران 4 عدد النجوم',
    city: 'المملكة العربية السعودية',
    country: 'غير محدد',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/ee/66/4ded1256d439a714797a73ce777f242f7fa3b099ff8f4369c4554f06dec9.jpeg',
    description: 'إقامة مميزة في المملكة العربية السعودية - 7.9 - جيد (7,465 من النقاط).'
  },
  {
    name: 'Intercontinental Hotels Al Ahsa By Ihg 5 عدد النجوم',
    city: 'المملكة العربية السعودية',
    country: 'غير محدد',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/65/12/494a8e6992ee7cabee696307e9710eb76d843c5e4c9a2087efaea74598a0.jpeg',
    description: 'إقامة مميزة في المملكة العربية السعودية - يُحَدَّد مدى الرَواج استنادا إلى العدد الإجمالي لتقييمات النزلاء لمكان الإقامة هذا بالمقارنة مع أماكن الإقامة الأخرى الموجودة في الهفوف والتي تنتمي إلى نفس النوع وتصنيف النجوم.'
  },
  {
    name: 'Sheraton Dammam Hotel & Convention Centre 5 عدد النجوم',
    city: 'المملكة العربية السعودية',
    country: 'غير محدد',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/0a/d1/c32181d9dec599d98aa218d0a8f3cbe16ed3a64b3935c154b5f35b465fb2.jpeg',
    description: 'إقامة مميزة في المملكة العربية السعودية - يُحَدَّد مدى الرَواج استنادا إلى العدد الإجمالي لتقييمات النزلاء لمكان الإقامة هذا بالمقارنة مع أماكن الإقامة الأخرى الموجودة في الدمام والتي تنتمي إلى نفس النوع وتصنيف النجوم.'
  },
  {
    name: 'Shaden Resort Al Ula, Managed by Accor 4 عدد النجوم',
    city: 'المملكة العربية السعودية',
    country: 'غير محدد',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/82/a0/c9b589b9d5fad33bad47b5bdf4ed15b295ec2ac77f442cc788672b3ed75e.jpeg',
    description: 'إقامة مميزة في المملكة العربية السعودية - 8.6 - ممتاز (2,983 من النقاط).'
  },
  {
    name: 'Le Méridien Al Khobar 5 عدد النجوم',
    city: 'المملكة العربية السعودية',
    country: 'غير محدد',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/c1/66/ef4e3d3ca36345a430b5e2704506edd9d97da4c60edd39e720a27d756854.jpeg',
    description: 'إقامة مميزة في المملكة العربية السعودية - 8.8 - ممتاز (12,495 من النقاط).'
  },
  {
    name: 'فندق سوفيتيل كورنيش الخبر 5 عدد النجوم',
    city: 'المملكة العربية السعودية',
    country: 'غير محدد',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/hotelier-images/98/ee/1797b55db27998dc42bc7cadbe1c95ecf0a29cb8da5ccd1c5063babf4808.jpeg',
    description: 'إقامة مميزة في المملكة العربية السعودية - يُحَدَّد مدى الرَواج استنادا إلى العدد الإجمالي لتقييمات النزلاء لمكان الإقامة هذا بالمقارنة مع أماكن الإقامة الأخرى الموجودة في الخبر والتي تنتمي إلى نفس النوع وتصنيف النجوم.'
  },
  // --- السعودية ---
  {
    name: 'نوفوتيل رياض العنود 5 عدد النجوم',
    city: 'الرياض',
    country: 'السعودية',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/50/b8/b9c0216728028a1ae43f36f60a2669638456334377b524d348133236b10b.jpeg',
    description: 'إقامة مميزة في الرياض - 8.4 - جيد جدًا (8,420 من النقاط).'
  },
  {
    name: 'Marriott Riyadh Diplomatic Quarter 4 عدد النجوم',
    city: 'الرياض',
    country: 'السعودية',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/3f/7e/63a8655f043b68256bc97704659d8023f8ad78ce7138503d8981f4f270bb.jpeg',
    description: 'إقامة مميزة في الرياض - 9.1 - ممتاز (2,926 من النقاط).'
  },
  {
    name: 'Elaf Al Taqwa Hotel 4 عدد النجوم',
    city: 'المدينة',
    country: 'السعودية',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/b9/ba/3bac2b9fc1e649929a0fd018dcada5181d99a04e3f5162a3e54e5e7ce26e.jpeg',
    description: 'إقامة مميزة في المدينة - 9.3 - ممتاز (8,940 من النقاط).'
  },
  {
    name: 'Sheraton Jeddah Hotel 5 عدد النجوم',
    city: 'جدة',
    country: 'السعودية',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/08/3b/87ded8e908cb5258587e048028f1306ed20878ca1dfcb4c1e446935345a8.jpeg',
    description: 'إقامة مميزة في جدة - 7.9 - جيد (10,359 من النقاط).'
  },
  {
    name: 'Makarem Burj Al Madinah 5 عدد النجوم',
    city: 'المدينة',
    country: 'السعودية',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/4a/72/32594ede3eb1d914dd6ddba2ef0db0b9436d48badcb6548671e2fb40036a.jpeg',
    description: 'إقامة مميزة في المدينة - 9.5 - ممتاز (2,886 من النقاط).'
  },
  {
    name: 'Maien Taiba 3 عدد النجوم',
    city: 'المدينة',
    country: 'السعودية',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/aa/8a/093120d081b3e79e973e860735f7d6aaedba84dcf194909f64e1e7c15b04.jpeg',
    description: 'إقامة مميزة في المدينة - 8.9 - ممتاز (3,541 من النقاط).'
  },
  {
    name: 'Narcissus The Royal Hotel 5 عدد النجوم',
    city: 'الرياض',
    country: 'السعودية',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/04/c7/99e6727b01bb03f4b1527680643c058451453704e5094136eb0e03fdb95f.jpeg',
    description: 'إقامة مميزة في الرياض - 9.1 - ممتاز (5,360 من النقاط).'
  },
  {
    name: 'فندق ريتز كارلتون، الرياض 5 عدد النجوم',
    city: 'الرياض',
    country: 'السعودية',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/2a/0f/60b91d3eb920d37d2951702f7afda288e5148655f198ed0e18d45c8d86ff.jpeg',
    description: 'إقامة مميزة في الرياض - 9.2 - ممتاز (19,228 من النقاط).'
  },
  {
    name: 'Holiday Inn Riyadh - Meydan By Ihg 4 عدد النجوم',
    city: 'الرياض',
    country: 'السعودية',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/4d/6a/016ef4c5b93e1b6cc186070ec94390261c24b4eca8d06cc1eb6d48a43bb2.jpeg',
    description: 'إقامة مميزة في الرياض - 8.2 - جيد جدًا (7,723 من النقاط).'
  },
  {
    name: 'فندق فورسيزونز الرياض - مركز المملكة 5 عدد النجوم',
    city: 'الرياض',
    country: 'السعودية',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/81/79/1305f3496788505c64546ee486eaa8ce86755dfda58e2837fa0a31d35c75.jpeg',
    description: 'إقامة مميزة في الرياض - 9.1 - ممتاز (17,220 من النقاط).'
  },
  {
    name: 'روش ريحان من روتانا 5 عدد النجوم',
    city: 'الرياض',
    country: 'السعودية',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/hotelier-images/86/81/b3693eda35943b2aeef731e6223a3562c6f8f265bd5ad4e010b5d52eba84.jpeg',
    description: 'إقامة مميزة في الرياض - 9.0 - ممتاز (12,850 من النقاط).'
  },
  {
    name: 'Holiday Inn Riyadh - Olaya By Ihg 4 عدد النجوم',
    city: 'الرياض',
    country: 'السعودية',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/c7/26/93cd3bb066ddcca81b766cc4b1d8068f46a8e59e66cbc37bfca7ec08a68f.jpeg',
    description: 'إقامة مميزة في الرياض - 8.5 - ممتاز (10,054 من النقاط).'
  },
  {
    name: 'حياة ريجنسي مكة جبل عمر 5 عدد النجوم',
    city: 'مكة',
    country: 'السعودية',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/f0/7b/33dede39cee2816770fbf540ab7b4a895c12608942847a6df59c2d927657.jpeg',
    description: 'إقامة مميزة في مكة - 8.9 - ممتاز (46,618 من النقاط).'
  },
  {
    name: 'ibis Jeddah City Center 3 عدد النجوم',
    city: 'جدة',
    country: 'السعودية',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/47/68/2f5fb141483755ef8043e32cd186d9f4c271b184480b1ca5cdae6e581751.jpeg',
    description: 'إقامة مميزة في جدة - يُحَدَّد مدى الرَواج استنادا إلى العدد الإجمالي لتقييمات النزلاء لمكان الإقامة هذا بالمقارنة مع أماكن الإقامة الأخرى الموجودة في جدة والتي تنتمي إلى نفس النوع وتصنيف النجوم.'
  },
  {
    name: 'نوفوتيل جدة التحلية 4 عدد النجوم',
    city: 'جدة',
    country: 'السعودية',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/hotelier-images/0f/0b/fd1c923e466d32a7fbd3bb05cb7e1ce86c5f40b8cdf3f1ee6e812afecbc1.jpeg',
    description: 'إقامة مميزة في جدة - 8.5 - ممتاز (10,610 من النقاط).'
  },
  {
    name: 'فور بوينتس شيراتون رياض الخالدية 4 عدد النجوم',
    city: 'الرياض',
    country: 'السعودية',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/b4/35/2d6beacd609ec7349869976b5e6c00faba9c78cf84fba08e996ce06adc72.jpeg',
    description: 'إقامة مميزة في الرياض - 8.1 - جيد جدًا (7,119 من النقاط).'
  },
  {
    name: 'voco Riyadh by IHG 5 عدد النجوم',
    city: 'الرياض',
    country: 'السعودية',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/de/64/0771f183cad17deb94c888312b7ad1fe944c6f933daf2ccce4e504e83ef2.jpeg',
    description: 'إقامة مميزة في الرياض - 9.0 - ممتاز (16,775 من النقاط).'
  },
  {
    name: 'Radisson Blu Hotel Riyadh Qurtuba 4 عدد النجوم',
    city: 'الرياض',
    country: 'السعودية',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/hotelier-images/9c/33/0012bdd41ba7a18e93b7a547c74be3d6cce9a0ebf49dab093f13a54576a8.jpeg',
    description: 'إقامة مميزة في الرياض - 9.0 - ممتاز (7,710 من النقاط).'
  },
  {
    name: 'The Ritz-Carlton Jeddah 5 عدد النجوم',
    city: 'جدة',
    country: 'السعودية',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/4f/3e/7f49fd8db5b1387b8618179bc9616216b601133ba1720b6ed42cc1b70be3.jpeg',
    description: 'إقامة مميزة في جدة - 9.1 - ممتاز (17,407 من النقاط).'
  },
  {
    name: 'فندق الصفوة رويال أوركيد 3 عدد النجوم',
    city: 'مكة',
    country: 'السعودية',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/3a/70/8f117291125d7ba1a9f64d86a37ca9b8ae201b42887bb853bf471897c29e.jpeg',
    description: 'إقامة مميزة في مكة - 8.0 - جيد جدًا (11,871 من النقاط).'
  },
  {
    name: 'The St. Regis Riyadh 5 عدد النجوم',
    city: 'الرياض',
    country: 'السعودية',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/9f/af/5a3a5183938f9c8f5719ed4d0acbd05ed81dd4011e2d98e468b6bac7a032.jpeg',
    description: 'إقامة مميزة في الرياض - 9.3 - ممتاز (1,322 من النقاط).'
  },
  {
    name: 'Boudl Al Fayhaa 4 عدد النجوم',
    city: 'الرياض',
    country: 'السعودية',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/hotelier-images/ab/fd/a53890733d92d3900ba12720fa548aa55ea99452ad2d152b8e0dce70c3d6.jpeg',
    description: 'إقامة مميزة في الرياض - يُحَدَّد مدى الرَواج استنادا إلى العدد الإجمالي لتقييمات النزلاء لمكان الإقامة هذا بالمقارنة مع أماكن الإقامة الأخرى الموجودة في الرياض والتي تنتمي إلى نفس النوع وتصنيف النجوم.'
  },
  {
    name: 'Sofitel Riyadh Hotel & Convention Centre 5 عدد النجوم',
    city: 'الرياض',
    country: 'السعودية',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/05/58/653e0ade98123b53e82160e3a511d08178262466d56ce16b1611eb446a12.jpeg',
    description: 'إقامة مميزة في الرياض - 9.1 - ممتاز (864 من النقاط).'
  },
  {
    name: 'Le Méridien Riyadh 5 عدد النجوم',
    city: 'الرياض',
    country: 'السعودية',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/69/a0/eb44eedb6eb66695931cc64c53a8110bc0ea5f1cb1c548e263bf90f0b62a.jpeg',
    description: 'إقامة مميزة في الرياض - 8.8 - ممتاز (3,576 من النقاط).'
  },
  {
    name: 'فندق أنوار المدينة موڤنبيك 5 عدد النجوم',
    city: 'المدينة',
    country: 'السعودية',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/98/f2/3e48f96b0c1fa46d56618ef30f6c059b62aa9c779a8b6dc799df41348f6f.jpeg',
    description: 'إقامة مميزة في المدينة - يُحَدَّد مدى الرَواج استنادا إلى العدد الإجمالي لتقييمات النزلاء لمكان الإقامة هذا بالمقارنة مع أماكن الإقامة الأخرى الموجودة في المدينة المنورة والتي تنتمي إلى نفس النوع وتصنيف النجوم.'
  },
  {
    name: 'أجنحة نوفوتيل الرياض العليا 4 عدد النجوم',
    city: 'الرياض',
    country: 'السعودية',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/hotelier-images/7e/42/c3ffd4f35b73242025d07021fb3c78c0328d68abd744a09d8ce17f1c9ebe.jpeg',
    description: 'إقامة مميزة في الرياض - 8.3 - جيد جدًا (5,383 من النقاط).'
  },
  {
    name: 'Holiday Inn Dubai Jumeirah Village Circle by IHG 3 عدد النجوم',
    city: 'دبي',
    country: 'الإمارات',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/f3/10/0c57b2f98413a6a1a5828364cdf1548b683149bc425472e19d8262aed84a.jpeg',
    description: 'إقامة مميزة في دبي - 8.9 - ممتاز (3,916 من النقاط).'
  },
  {
    name: 'دبل تري من هيلتون دبي إم سكوير فندق وشقق فندقية 5 عدد النجوم',
    city: 'دبي',
    country: 'الإمارات',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/06/e7/d7f11ec24b7a48da7adf114ffc2c85f70f30f9858aefc7da919ce1570b71.jpeg',
    description: 'إقامة مميزة في دبي - 9.3 - ممتاز (15,688 من النقاط).'
  },
  {
    name: 'فندق شاطئ جميرا 5 عدد النجوم',
    city: 'دبي',
    country: 'الإمارات',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/hotelier-images/e0/0e/87d734764df34c0e35df38c30926a9b8c26e980cc06794d9ca698ebabee6.jpeg',
    description: 'إقامة مميزة في دبي - 9.1 - ممتاز (27,224 من النقاط).'
  },
  {
    name: 'Marriott Marquis Dubai Creek 5 عدد النجوم',
    city: 'دبي',
    country: 'الإمارات',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/hotelier-images/95/3b/e101cd200427c9b99ace0c21807a235b1d31cbad86673ba6775015fd9d11.jpeg',
    description: 'إقامة مميزة في دبي - 9.3 - ممتاز (5,535 من النقاط).'
  },
  {
    name: 'العنوان دبي مول 5 عدد النجوم',
    city: 'دبي',
    country: 'الإمارات',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/4b/ff/d6895e071fd2d00351d6641232093c9be641cdea212ce2d84b9fe1c0ae1c.jpeg',
    description: 'إقامة مميزة في دبي - 9.4 - ممتاز (31,549 من النقاط).'
  },
  {
    name: 'Grand Hyatt Dubai 5 عدد النجوم',
    city: 'دبي',
    country: 'الإمارات',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/fb/62/8c4e1825889184592a5bc3200c9d6c61e4c6c940d4c3d2034d499ac5187e.jpeg',
    description: 'إقامة مميزة في دبي - 9.1 - ممتاز (35,683 من النقاط).'
  },
  {
    name: 'منتجع سنتارا ميراج بيتش دبي 4 عدد النجوم',
    city: 'دبي',
    country: 'الإمارات',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/43/c5/b6634c5d88c8c6954a6595f0f3b1a8510480b41b46d668f87097768194be.jpeg',
    description: 'إقامة مميزة في دبي - يُحَدَّد مدى الرَواج استنادا إلى العدد الإجمالي لتقييمات النزلاء لمكان الإقامة هذا بالمقارنة مع أماكن الإقامة الأخرى الموجودة في دبي والتي تنتمي إلى نفس النوع وتصنيف النجوم.'
  },
  {
    name: 'فندق جي دبليو ماريوت ماركي دبي 5 عدد النجوم',
    city: 'دبي',
    country: 'الإمارات',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/hotelier-images/94/e8/f3bbeb124d8c2c06d879e38c71ff66d64e26b5fdc5a884016d3c96a36a86.jpeg',
    description: 'إقامة مميزة في دبي - 9.3 - ممتاز (43,324 من النقاط).'
  },
  {
    name: 'كونراد دبي 5 عدد النجوم',
    city: 'دبي',
    country: 'الإمارات',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/8e/b3/2f3cf3ac43e92a9f08ef7ebf48aee29aae37e6eaae530f1ea9f5ba737c69.jpeg',
    description: 'إقامة مميزة في دبي - 9.3 - ممتاز (35,651 من النقاط).'
  },
  {
    name: 'The St. Regis Downtown Dubai 5 عدد النجوم',
    city: 'دبي',
    country: 'الإمارات',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/hotelier-images/3a/e5/a9c4acfb9904298afba722474d62a45e62a6b397211fb619446ea7822c60.jpeg',
    description: 'إقامة مميزة في دبي - 9.3 - ممتاز (9,317 من النقاط).'
  },
  {
    name: 'فندق الريتز- كارلتون٬ إكزيكيوتيف ريزيدنسيز 5 عدد النجوم',
    city: 'دبي',
    country: 'الإمارات',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/hotelier-images/6e/eb/5b2ce10096d1d9abf400b3a4f86e42cbb7d83e9d42c788668f06a7ff7e50.jpeg',
    description: 'إقامة مميزة في دبي - 9.3 - ممتاز (10,974 من النقاط).'
  },
  {
    name: 'The First Collection Dubai Business Bay 4 عدد النجوم',
    city: 'دبي',
    country: 'الإمارات',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/hotelier-images/a2/6c/ba7bb9d627bdf74273a7a69ccafe732a40117e726ad7f088a263a7c91781.jpeg',
    description: 'إقامة مميزة في دبي - 8.8 - ممتاز (18,027 من النقاط).'
  },
  {
    name: 'فندق وأبراج شيراتون خور دبي 5 عدد النجوم',
    city: 'دبي',
    country: 'الإمارات',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/hotelier-images/c5/04/6a3f2c8951d87f545517a7d3951ec60f09d1c4402ff4d1e3a14b9dcdcd28.jpeg',
    description: 'إقامة مميزة في دبي - 9.0 - ممتاز (13,073 من النقاط).'
  },
  {
    name: 'Sheraton Grand Hotel, Dubai 5 عدد النجوم',
    city: 'دبي',
    country: 'الإمارات',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/6c/6a/e8dc7401bb32c52b6c8798d782fc7688ea6990ed81ba20d4508864a0d82c.jpeg',
    description: 'إقامة مميزة في دبي - 9.1 - ممتاز (15,803 من النقاط).'
  },
  {
    name: 'Le Méridien Dubai Hotel & Conference Centre 5 عدد النجوم',
    city: 'دبي',
    country: 'الإمارات',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/e6/7a/b0e1052fc98812641faecd42a2837ca2c4b31cacaf7f6b9c5b81c31dec07.jpeg',
    description: 'إقامة مميزة في دبي - 9.0 - ممتاز (28,860 من النقاط).'
  },
  {
    name: 'Mercure Dubai Barsha Heights Hotel Suites And Apartments 4 عدد النجوم',
    city: 'دبي',
    country: 'الإمارات',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/8b/62/460d5e3d42271e52823e3239f546f78dd2144218ae3e1bf8ea90a47d797a.jpeg',
    description: 'إقامة مميزة في دبي - 8.7 - ممتاز (34,938 من النقاط).'
  },
  {
    name: 'The Dubai EDITION 5 عدد النجوم',
    city: 'دبي',
    country: 'الإمارات',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/ff/a2/62b0b0b3d837bc33aaa406499904e294ce4c74c5fa7db8c96d056549f0cc.jpeg',
    description: 'إقامة مميزة في دبي - 8.9 - ممتاز (5,614 من النقاط).'
  },
  {
    name: 'Palace Downtown 5 عدد النجوم',
    city: 'دبي',
    country: 'الإمارات',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/8c/17/cfc1cc5ce71b335c3c37bf68458eda8ee5960a7f16d5dd0c2dd34156fb84.jpeg',
    description: 'إقامة مميزة في دبي - 9.4 - ممتاز (19,822 من النقاط).'
  },
  {
    name: 'Canopy by Hilton Dubai Al Seef 4 عدد النجوم',
    city: 'دبي',
    country: 'الإمارات',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/a6/d7/310ec49e1ef5da04c278157cfa40893d2abbe5d51f18728447e2ad3dda91.jpeg',
    description: 'إقامة مميزة في دبي - 9.0 - ممتاز (6,777 من النقاط).'
  },
  {
    name: 'Hyatt Place Dubai Jumeirah Residences 4 عدد النجوم',
    city: 'دبي',
    country: 'الإمارات',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/14/28/dac085caa83bef1dc7c67a296f1c3916c431133646a44617c445a809207d.jpeg',
    description: 'إقامة مميزة في دبي - 8.6 - ممتاز (2,696 من النقاط).'
  },
  {
    name: 'منتجع وسبا أنانتارا دبي ذا بالم 5 عدد النجوم',
    city: 'دبي',
    country: 'الإمارات',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/hotelier-images/14/44/6934f29a3d1ecd97477505bbeaeac68de8bec80d1e2676fff8ec38ba0b35.jpeg',
    description: 'إقامة مميزة في دبي - 9.2 - ممتاز (43,618 من النقاط).'
  },
  {
    name: 'فندق وشقق موڤنبيك بر دبي 5 عدد النجوم',
    city: 'دبي',
    country: 'الإمارات',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/43/86/bbcad43ec68e5a7c12274a9354a5dd41fc3cb34c85e0de5322cb14d78fe0.jpeg',
    description: 'إقامة مميزة في دبي - 8.9 - ممتاز (21,280 من النقاط).'
  },
  {
    name: 'أوركيد فو 4 عدد النجوم',
    city: 'دبي',
    country: 'الإمارات',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/hotelier-images/98/b5/9fd98d4f1c28551b3ed7d50064f9b480af75db1866f5b5d6ea334c8e6e9b.jpeg',
    description: 'إقامة مميزة في دبي - 7.5 - جيد (3,585 من النقاط).'
  },
  {
    name: 'Embassy Suites By Hilton Dubai Business Bay 5 عدد النجوم',
    city: 'دبي',
    country: 'الإمارات',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/97/5a/49c0737747ff8ab7fd44953f812bf206626dbdc2a327ade6458cfc1c3b39.jpeg',
    description: 'إقامة مميزة في دبي - 9.6 - ممتاز (2,394 من النقاط).'
  },
  {
    name: 'Swissotel Al Ghurair 5 عدد النجوم',
    city: 'دبي',
    country: 'الإمارات',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/0f/2a/3a70ceb21b83c954936980173042323d9f6d1c0d1b356dc8f1a4b071c160.jpeg',
    description: 'إقامة مميزة في دبي - 9.0 - ممتاز (27,263 من النقاط).'
  },
  {
    name: 'فندق ملينيوم المطار دبي 4 عدد النجوم',
    city: 'دبي',
    country: 'الإمارات',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/47/eb/1c87404fae358f4a591d24f64dc8b17ba1713d709838f3c18ba043a7ad33.jpeg',
    description: 'إقامة مميزة في دبي - 8.8 - ممتاز (32,100 من النقاط).'
  },
  {
    name: 'The Heritage Hotel, Autograph Collection 4 عدد النجوم',
    city: 'دبي',
    country: 'الإمارات',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/a2/e7/df8d4f9cf859d2957b4be0768ec7fbbc858485aeb731b2f7aff056e8e372.jpeg',
    description: 'إقامة مميزة في دبي - 9.2 - ممتاز (15,216 من النقاط).'
  },
  {
    name: 'Four Points by Sheraton Sheikh Zayed Road, Dubai 4 عدد النجوم',
    city: 'دبي',
    country: 'الإمارات',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/hotelier-images/2d/90/0f2addd04d11ab404a502f5e8c202f3ed3bd93aa20d507b9f24ca565b485.jpeg',
    description: 'إقامة مميزة في دبي - 8.9 - ممتاز (13,450 من النقاط).'
  },
  {
    name: 'فندق جراند اكسلسيور البرشاء 4 عدد النجوم',
    city: 'دبي',
    country: 'الإمارات',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/84/0a/931c1e9d2df7d51e9e6969b86d85f2ccae50d433624a330cfc6792bd889d.jpeg',
    description: 'إقامة مميزة في دبي - 7.8 - جيد (14,061 من النقاط).'
  },
  {
    name: 'أفينيو هوتل 4 عدد النجوم',
    city: 'دبي',
    country: 'الإمارات',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/a3/a4/2bfe160f76692dd27e89b7404eaa246bdbf12f07c4d4f62f63b19a7731ca.jpeg',
    description: 'إقامة مميزة في دبي - 7.9 - جيد (6,463 من النقاط).'
  },
  {
    name: 'فندق جراند إكسلسيور بر دبي 4 عدد النجوم',
    city: 'دبي',
    country: 'الإمارات',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/f0/93/844cc0862568388cb6996dcdec572e052bc59dc5e4b276989d5043f21a3f.jpeg',
    description: 'إقامة مميزة في دبي - 7.9 - جيد (17,361 من النقاط).'
  },
  {
    name: 'Jumeirah Living World Trade Centre Dubai 5 عدد النجوم',
    city: 'دبي',
    country: 'الإمارات',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/hotelier-images/66/17/0feaf7abf8e1b85312a6e6187f58ff8cc2f7c5c41627b70b216aa19c5814.jpeg',
    description: 'إقامة مميزة في دبي - 9.0 - ممتاز (1,800 من النقاط).'
  },
  {
    name: 'Marriott Resort Palm Jumeirah, Dubai 5 عدد النجوم',
    city: 'دبي',
    country: 'الإمارات',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/56/23/c3f9e3247b7e0fb4f878c6dc3e8f2f57547b1b32774ba5ec47ecd75a2a92.jpeg',
    description: 'إقامة مميزة في دبي - 9.2 - ممتاز (6,621 من النقاط).'
  },
  {
    name: 'فندق دبليو دبي - النخلة 5 عدد النجوم',
    city: 'دبي',
    country: 'الإمارات',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/hotelier-images/78/65/c0c260de61d1fdd40b36c52823d4233c5823147693680765591445910781.jpeg',
    description: 'إقامة مميزة في دبي - 9.1 - ممتاز (11,664 من النقاط).'
  },
  {
    name: 'ibis Dubai Al Rigga 3 عدد النجوم',
    city: 'دبي',
    country: 'الإمارات',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/hotelier-images/f0/88/6dc88d5335e2eb11a5fb29455b2b62032975cdf84c32eab1e77cbb244a4f.jpeg',
    description: 'إقامة مميزة في دبي - 8.9 - ممتاز (34,739 من النقاط).'
  }
];

module.exports = { HOTELS };