const HOTELS = [
  // --- الإمارات ---
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