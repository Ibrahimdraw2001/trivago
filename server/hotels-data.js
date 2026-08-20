const HOTELS = [
  // --- الإمارات ---
  {
    name: 'Holiday Inn Dubai Jumeirah Village Circle by IHG
3 عدد النجوم',
    city: 'دبي',
    country: 'الإمارات',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/f3/10/0c57b2f98413a6a1a5828364cdf1548b683149bc425472e19d8262aed84a.jpeg',
    description: 'إقامة مميزة في دبي - 8.9 - ممتاز (3,916 من النقاط).'
  },
  {
    name: 'دبل تري من هيلتون دبي إم سكوير فندق وشقق فندقية
5 عدد النجوم',
    city: 'دبي',
    country: 'الإمارات',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/06/e7/d7f11ec24b7a48da7adf114ffc2c85f70f30f9858aefc7da919ce1570b71.jpeg',
    description: 'إقامة مميزة في دبي - 9.3 - ممتاز (15,688 من النقاط).'
  },
  {
    name: 'فندق شاطئ جميرا
5 عدد النجوم',
    city: 'دبي',
    country: 'الإمارات',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/hotelier-images/e0/0e/87d734764df34c0e35df38c30926a9b8c26e980cc06794d9ca698ebabee6.jpeg',
    description: 'إقامة مميزة في دبي - 9.1 - ممتاز (27,224 من النقاط).'
  },
  {
    name: 'Marriott Marquis Dubai Creek
5 عدد النجوم',
    city: 'دبي',
    country: 'الإمارات',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/hotelier-images/95/3b/e101cd200427c9b99ace0c21807a235b1d31cbad86673ba6775015fd9d11.jpeg',
    description: 'إقامة مميزة في دبي - 9.3 - ممتاز (5,535 من النقاط).'
  },
  {
    name: 'العنوان دبي مول
5 عدد النجوم',
    city: 'دبي',
    country: 'الإمارات',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/4b/ff/d6895e071fd2d00351d6641232093c9be641cdea212ce2d84b9fe1c0ae1c.jpeg',
    description: 'إقامة مميزة في دبي - 9.4 - ممتاز (31,549 من النقاط).'
  },
  {
    name: 'Grand Hyatt Dubai
5 عدد النجوم',
    city: 'دبي',
    country: 'الإمارات',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/fb/62/8c4e1825889184592a5bc3200c9d6c61e4c6c940d4c3d2034d499ac5187e.jpeg',
    description: 'إقامة مميزة في دبي - 9.1 - ممتاز (35,683 من النقاط).'
  },
  {
    name: 'منتجع سنتارا ميراج بيتش دبي
4 عدد النجوم',
    city: 'دبي',
    country: 'الإمارات',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/43/c5/b6634c5d88c8c6954a6595f0f3b1a8510480b41b46d668f87097768194be.jpeg',
    description: 'إقامة مميزة في دبي - يُحَدَّد مدى الرَواج استنادا إلى العدد الإجمالي لتقييمات النزلاء لمكان الإقامة هذا بالمقارنة مع أماكن الإقامة الأخرى الموجودة في دبي والتي تنتمي إلى نفس النوع وتصنيف النجوم.'
  },
  {
    name: 'فندق جي دبليو ماريوت ماركي دبي
5 عدد النجوم',
    city: 'دبي',
    country: 'الإمارات',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/hotelier-images/94/e8/f3bbeb124d8c2c06d879e38c71ff66d64e26b5fdc5a884016d3c96a36a86.jpeg',
    description: 'إقامة مميزة في دبي - 9.3 - ممتاز (43,324 من النقاط).'
  },
  {
    name: 'كونراد دبي
5 عدد النجوم',
    city: 'دبي',
    country: 'الإمارات',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/8e/b3/2f3cf3ac43e92a9f08ef7ebf48aee29aae37e6eaae530f1ea9f5ba737c69.jpeg',
    description: 'إقامة مميزة في دبي - 9.3 - ممتاز (35,651 من النقاط).'
  },
  {
    name: 'The St. Regis Downtown Dubai
5 عدد النجوم',
    city: 'دبي',
    country: 'الإمارات',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/hotelier-images/3a/e5/a9c4acfb9904298afba722474d62a45e62a6b397211fb619446ea7822c60.jpeg',
    description: 'إقامة مميزة في دبي - 9.3 - ممتاز (9,317 من النقاط).'
  },
  {
    name: 'فندق الريتز- كارلتون٬ إكزيكيوتيف ريزيدنسيز
5 عدد النجوم',
    city: 'دبي',
    country: 'الإمارات',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/hotelier-images/6e/eb/5b2ce10096d1d9abf400b3a4f86e42cbb7d83e9d42c788668f06a7ff7e50.jpeg',
    description: 'إقامة مميزة في دبي - 9.3 - ممتاز (10,974 من النقاط).'
  },
  {
    name: 'The First Collection Dubai Business Bay
4 عدد النجوم',
    city: 'دبي',
    country: 'الإمارات',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/hotelier-images/a2/6c/ba7bb9d627bdf74273a7a69ccafe732a40117e726ad7f088a263a7c91781.jpeg',
    description: 'إقامة مميزة في دبي - 8.8 - ممتاز (18,027 من النقاط).'
  },
  {
    name: 'فندق وأبراج شيراتون خور دبي
5 عدد النجوم',
    city: 'دبي',
    country: 'الإمارات',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/hotelier-images/c5/04/6a3f2c8951d87f545517a7d3951ec60f09d1c4402ff4d1e3a14b9dcdcd28.jpeg',
    description: 'إقامة مميزة في دبي - 9.0 - ممتاز (13,073 من النقاط).'
  },
  {
    name: 'Sheraton Grand Hotel, Dubai
5 عدد النجوم',
    city: 'دبي',
    country: 'الإمارات',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/6c/6a/e8dc7401bb32c52b6c8798d782fc7688ea6990ed81ba20d4508864a0d82c.jpeg',
    description: 'إقامة مميزة في دبي - 9.1 - ممتاز (15,803 من النقاط).'
  },
  {
    name: 'Le Méridien Dubai Hotel & Conference Centre
5 عدد النجوم',
    city: 'دبي',
    country: 'الإمارات',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/e6/7a/b0e1052fc98812641faecd42a2837ca2c4b31cacaf7f6b9c5b81c31dec07.jpeg',
    description: 'إقامة مميزة في دبي - 9.0 - ممتاز (28,860 من النقاط).'
  },
  {
    name: 'Mercure Dubai Barsha Heights Hotel Suites And Apartments
4 عدد النجوم',
    city: 'دبي',
    country: 'الإمارات',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/8b/62/460d5e3d42271e52823e3239f546f78dd2144218ae3e1bf8ea90a47d797a.jpeg',
    description: 'إقامة مميزة في دبي - 8.7 - ممتاز (34,938 من النقاط).'
  },
  {
    name: 'The Dubai EDITION
5 عدد النجوم',
    city: 'دبي',
    country: 'الإمارات',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/ff/a2/62b0b0b3d837bc33aaa406499904e294ce4c74c5fa7db8c96d056549f0cc.jpeg',
    description: 'إقامة مميزة في دبي - 8.9 - ممتاز (5,614 من النقاط).'
  },
  {
    name: 'Palace Downtown
5 عدد النجوم',
    city: 'دبي',
    country: 'الإمارات',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/8c/17/cfc1cc5ce71b335c3c37bf68458eda8ee5960a7f16d5dd0c2dd34156fb84.jpeg',
    description: 'إقامة مميزة في دبي - 9.4 - ممتاز (19,822 من النقاط).'
  },
  {
    name: 'Canopy by Hilton Dubai Al Seef
4 عدد النجوم',
    city: 'دبي',
    country: 'الإمارات',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/a6/d7/310ec49e1ef5da04c278157cfa40893d2abbe5d51f18728447e2ad3dda91.jpeg',
    description: 'إقامة مميزة في دبي - 9.0 - ممتاز (6,777 من النقاط).'
  },
  {
    name: 'Hyatt Place Dubai Jumeirah Residences
4 عدد النجوم',
    city: 'دبي',
    country: 'الإمارات',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/14/28/dac085caa83bef1dc7c67a296f1c3916c431133646a44617c445a809207d.jpeg',
    description: 'إقامة مميزة في دبي - 8.6 - ممتاز (2,696 من النقاط).'
  },
  {
    name: 'منتجع وسبا أنانتارا دبي ذا بالم
5 عدد النجوم',
    city: 'دبي',
    country: 'الإمارات',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/hotelier-images/14/44/6934f29a3d1ecd97477505bbeaeac68de8bec80d1e2676fff8ec38ba0b35.jpeg',
    description: 'إقامة مميزة في دبي - 9.2 - ممتاز (43,618 من النقاط).'
  },
  {
    name: 'فندق وشقق موڤنبيك بر دبي
5 عدد النجوم',
    city: 'دبي',
    country: 'الإمارات',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/43/86/bbcad43ec68e5a7c12274a9354a5dd41fc3cb34c85e0de5322cb14d78fe0.jpeg',
    description: 'إقامة مميزة في دبي - 8.9 - ممتاز (21,280 من النقاط).'
  },
  {
    name: 'أوركيد فو
4 عدد النجوم',
    city: 'دبي',
    country: 'الإمارات',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/hotelier-images/98/b5/9fd98d4f1c28551b3ed7d50064f9b480af75db1866f5b5d6ea334c8e6e9b.jpeg',
    description: 'إقامة مميزة في دبي - 7.5 - جيد (3,585 من النقاط).'
  },
  {
    name: 'Embassy Suites By Hilton Dubai Business Bay
5 عدد النجوم',
    city: 'دبي',
    country: 'الإمارات',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/97/5a/49c0737747ff8ab7fd44953f812bf206626dbdc2a327ade6458cfc1c3b39.jpeg',
    description: 'إقامة مميزة في دبي - 9.6 - ممتاز (2,394 من النقاط).'
  },
  {
    name: 'Swissotel Al Ghurair
5 عدد النجوم',
    city: 'دبي',
    country: 'الإمارات',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/0f/2a/3a70ceb21b83c954936980173042323d9f6d1c0d1b356dc8f1a4b071c160.jpeg',
    description: 'إقامة مميزة في دبي - 9.0 - ممتاز (27,263 من النقاط).'
  },
  {
    name: 'فندق ملينيوم المطار دبي
4 عدد النجوم',
    city: 'دبي',
    country: 'الإمارات',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/47/eb/1c87404fae358f4a591d24f64dc8b17ba1713d709838f3c18ba043a7ad33.jpeg',
    description: 'إقامة مميزة في دبي - 8.8 - ممتاز (32,100 من النقاط).'
  },
  {
    name: 'The Heritage Hotel, Autograph Collection
4 عدد النجوم',
    city: 'دبي',
    country: 'الإمارات',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/a2/e7/df8d4f9cf859d2957b4be0768ec7fbbc858485aeb731b2f7aff056e8e372.jpeg',
    description: 'إقامة مميزة في دبي - 9.2 - ممتاز (15,216 من النقاط).'
  },
  {
    name: 'Four Points by Sheraton Sheikh Zayed Road, Dubai
4 عدد النجوم',
    city: 'دبي',
    country: 'الإمارات',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/hotelier-images/2d/90/0f2addd04d11ab404a502f5e8c202f3ed3bd93aa20d507b9f24ca565b485.jpeg',
    description: 'إقامة مميزة في دبي - 8.9 - ممتاز (13,450 من النقاط).'
  },
  {
    name: 'فندق جراند اكسلسيور البرشاء
4 عدد النجوم',
    city: 'دبي',
    country: 'الإمارات',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/84/0a/931c1e9d2df7d51e9e6969b86d85f2ccae50d433624a330cfc6792bd889d.jpeg',
    description: 'إقامة مميزة في دبي - 7.8 - جيد (14,061 من النقاط).'
  },
  {
    name: 'أفينيو هوتل
4 عدد النجوم',
    city: 'دبي',
    country: 'الإمارات',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/a3/a4/2bfe160f76692dd27e89b7404eaa246bdbf12f07c4d4f62f63b19a7731ca.jpeg',
    description: 'إقامة مميزة في دبي - 7.9 - جيد (6,463 من النقاط).'
  },
  {
    name: 'فندق جراند إكسلسيور بر دبي
4 عدد النجوم',
    city: 'دبي',
    country: 'الإمارات',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/f0/93/844cc0862568388cb6996dcdec572e052bc59dc5e4b276989d5043f21a3f.jpeg',
    description: 'إقامة مميزة في دبي - 7.9 - جيد (17,361 من النقاط).'
  },
  {
    name: 'Jumeirah Living World Trade Centre Dubai
5 عدد النجوم',
    city: 'دبي',
    country: 'الإمارات',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/hotelier-images/66/17/0feaf7abf8e1b85312a6e6187f58ff8cc2f7c5c41627b70b216aa19c5814.jpeg',
    description: 'إقامة مميزة في دبي - 9.0 - ممتاز (1,800 من النقاط).'
  },
  {
    name: 'Marriott Resort Palm Jumeirah, Dubai
5 عدد النجوم',
    city: 'دبي',
    country: 'الإمارات',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/partner-images/56/23/c3f9e3247b7e0fb4f878c6dc3e8f2f57547b1b32774ba5ec47ecd75a2a92.jpeg',
    description: 'إقامة مميزة في دبي - 9.2 - ممتاز (6,621 من النقاط).'
  },
  {
    name: 'فندق دبليو دبي - النخلة
5 عدد النجوم',
    city: 'دبي',
    country: 'الإمارات',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/hotelier-images/78/65/c0c260de61d1fdd40b36c52823d4233c5823147693680765591445910781.jpeg',
    description: 'إقامة مميزة في دبي - 9.1 - ممتاز (11,664 من النقاط).'
  },
  {
    name: 'ibis Dubai Al Rigga
3 عدد النجوم',
    city: 'دبي',
    country: 'الإمارات',
    image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_500,q_80,w_800/hotelier-images/f0/88/6dc88d5335e2eb11a5fb29455b2b62032975cdf84c32eab1e77cbb244a4f.jpeg',
    description: 'إقامة مميزة في دبي - 8.9 - ممتاز (34,739 من النقاط).'
  }
];

module.exports = { HOTELS };