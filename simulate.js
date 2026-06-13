const { initializeApp } = require('firebase-admin/app');
const { getFirestore, FieldValue, GeoPoint } = require('firebase-admin/firestore');
const admin = require('firebase-admin');

// Firebase Admin initialisieren
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
initializeApp({ credential: admin.credential.cert(serviceAccount) });
const db = getFirestore();

// NEUE ROUTE: Langsames Fahrrad im Stadtzentrum von Zaio (Zick-Zack durch Straßen)
const route = [
    {
        "latitude":  34.937912,
        "longitude":  -2.726272
    },
    {
        "latitude":  34.937994,
        "longitude":  -2.726285
    },
    {
        "latitude":  34.938074,
        "longitude":  -2.726279
    },
    {
        "latitude":  34.938157,
        "longitude":  -2.726297
    },
    {
        "latitude":  34.938233,
        "longitude":  -2.726293
    },
    {
        "latitude":  34.938322,
        "longitude":  -2.726294
    },
    {
        "latitude":  34.938389,
        "longitude":  -2.726288
    },
    {
        "latitude":  34.938482,
        "longitude":  -2.726303
    },
    {
        "latitude":  34.938561,
        "longitude":  -2.726294
    },
    {
        "latitude":  34.938567,
        "longitude":  -2.726215
    },
    {
        "latitude":  34.938572,
        "longitude":  -2.726137
    },
    {
        "latitude":  34.938675,
        "longitude":  -2.726212
    },
    {
        "latitude":  34.938787,
        "longitude":  -2.726267
    },
    {
        "latitude":  34.938903,
        "longitude":  -2.726331
    },
    {
        "latitude":  34.939013,
        "longitude":  -2.726378
    },
    {
        "latitude":  34.939128,
        "longitude":  -2.726435
    },
    {
        "latitude":  34.939245,
        "longitude":  -2.726487
    },
    {
        "latitude":  34.939368,
        "longitude":  -2.726539
    },
    {
        "latitude":  34.939482,
        "longitude":  -2.72659
    },
    {
        "latitude":  34.939454,
        "longitude":  -2.726772
    },
    {
        "latitude":  34.939468,
        "longitude":  -2.72696
    },
    {
        "latitude":  34.939478,
        "longitude":  -2.727124
    },
    {
        "latitude":  34.939602,
        "longitude":  -2.727128
    },
    {
        "latitude":  34.939735,
        "longitude":  -2.727111
    },
    {
        "latitude":  34.93975,
        "longitude":  -2.727275
    },
    {
        "latitude":  34.93976,
        "longitude":  -2.727433
    },
    {
        "latitude":  34.93978,
        "longitude":  -2.727592
    },
    {
        "latitude":  34.939773,
        "longitude":  -2.727751
    },
    {
        "latitude":  34.93993,
        "longitude":  -2.727751
    },
    {
        "latitude":  34.940083,
        "longitude":  -2.727747
    },
    {
        "latitude":  34.940085,
        "longitude":  -2.727904
    },
    {
        "latitude":  34.940095,
        "longitude":  -2.728053
    },
    {
        "latitude":  34.9401,
        "longitude":  -2.728203
    },
    {
        "latitude":  34.940103,
        "longitude":  -2.728349
    },
    {
        "latitude":  34.940285,
        "longitude":  -2.728356
    },
    {
        "latitude":  34.940468,
        "longitude":  -2.728344
    },
    {
        "latitude":  34.940486,
        "longitude":  -2.728566
    },
    {
        "latitude":  34.940489,
        "longitude":  -2.728777
    },
    {
        "latitude":  34.940523,
        "longitude":  -2.729079
    },
    {
        "latitude":  34.940541,
        "longitude":  -2.729361
    },
    {
        "latitude":  34.940554,
        "longitude":  -2.729612
    },
    {
        "latitude":  34.940569,
        "longitude":  -2.729883
    },
    {
        "latitude":  34.940711,
        "longitude":  -2.729868
    },
    {
        "latitude":  34.940857,
        "longitude":  -2.729849
    },
    {
        "latitude":  34.941019,
        "longitude":  -2.729847
    },
    {
        "latitude":  34.941174,
        "longitude":  -2.729832
    },
    {
        "latitude":  34.941337,
        "longitude":  -2.729816
    },
    {
        "latitude":  34.941489,
        "longitude":  -2.729811
    },
    {
        "latitude":  34.941506,
        "longitude":  -2.729972
    },
    {
        "latitude":  34.941526,
        "longitude":  -2.730131
    },
    {
        "latitude":  34.941539,
        "longitude":  -2.73029
    },
    {
        "latitude":  34.941576,
        "longitude":  -2.730451
    },
    {
        "latitude":  34.941689,
        "longitude":  -2.730372
    },
    {
        "latitude":  34.94178,
        "longitude":  -2.730283
    },
    {
        "latitude":  34.94188,
        "longitude":  -2.730207
    },
    {
        "latitude":  34.941983,
        "longitude":  -2.730116
    },
    {
        "latitude":  34.94224,
        "longitude":  -2.729944
    },
    {
        "latitude":  34.942348,
        "longitude":  -2.729852
    },
    {
        "latitude":  34.942486,
        "longitude":  -2.729764
    },
    {
        "latitude":  34.942613,
        "longitude":  -2.730014
    },
    {
        "latitude":  34.94274,
        "longitude":  -2.730277
    },
    {
        "latitude":  34.942838,
        "longitude":  -2.730451
    },
    {
        "latitude":  34.942931,
        "longitude":  -2.730624
    },
    {
        "latitude":  34.943019,
        "longitude":  -2.730769
    },
    {
        "latitude":  34.943105,
        "longitude":  -2.730929
    },
    {
        "latitude":  34.943051,
        "longitude":  -2.730991
    },
    {
        "latitude":  34.94298,
        "longitude":  -2.73104
    },
    {
        "latitude":  34.943089,
        "longitude":  -2.73122
    },
    {
        "latitude":  34.943194,
        "longitude":  -2.731388
    },
    {
        "latitude":  34.943301,
        "longitude":  -2.731566
    },
    {
        "latitude":  34.943393,
        "longitude":  -2.731718
    },
    {
        "latitude":  34.943209,
        "longitude":  -2.731871
    },
    {
        "latitude":  34.943011,
        "longitude":  -2.73201
    },
    {
        "latitude":  34.943156,
        "longitude":  -2.732274
    },
    {
        "latitude":  34.943289,
        "longitude":  -2.73254
    },
    {
        "latitude":  34.943362,
        "longitude":  -2.732671
    },
    {
        "latitude":  34.943428,
        "longitude":  -2.732802
    },
    {
        "latitude":  34.943617,
        "longitude":  -2.732653
    },
    {
        "latitude":  34.94381,
        "longitude":  -2.732493
    },
    {
        "latitude":  34.94389,
        "longitude":  -2.732493
    },
    {
        "latitude":  34.943967,
        "longitude":  -2.732421
    },
    {
        "latitude":  34.944046,
        "longitude":  -2.732328
    },
    {
        "latitude":  34.94398,
        "longitude":  -2.732204
    },
    {
        "latitude":  34.943924,
        "longitude":  -2.732065
    },
    {
        "latitude":  34.9441,
        "longitude":  -2.731941
    },
    {
        "latitude":  34.944268,
        "longitude":  -2.731819
    },
    {
        "latitude":  34.94439,
        "longitude":  -2.73173
    },
    {
        "latitude":  34.944525,
        "longitude":  -2.73162
    },
    {
        "latitude":  34.944551,
        "longitude":  -2.731837
    },
    {
        "latitude":  34.944571,
        "longitude":  -2.732045
    },
    {
        "latitude":  34.944591,
        "longitude":  -2.73225
    },
    {
        "latitude":  34.944612,
        "longitude":  -2.732455
    },
    {
        "latitude":  34.944378,
        "longitude":  -2.732524
    },
    {
        "latitude":  34.944136,
        "longitude":  -2.732582
    },
    {
        "latitude":  34.94418,
        "longitude":  -2.732772
    },
    {
        "latitude":  34.944216,
        "longitude":  -2.732963
    },
    {
        "latitude":  34.944001,
        "longitude":  -2.733095
    },
    {
        "latitude":  34.944011,
        "longitude":  -2.733277
    },
    {
        "latitude":  34.944275,
        "longitude":  -2.733277
    },
    {
        "latitude":  34.944293,
        "longitude":  -2.733502
    },
    {
        "latitude":  34.944317,
        "longitude":  -2.73373
    },
    {
        "latitude":  34.94431,
        "longitude":  -2.733937
    },
    {
        "latitude":  34.9443,
        "longitude":  -2.734132
    },
    {
        "latitude":  34.944292,
        "longitude":  -2.734325
    },
    {
        "latitude":  34.944268,
        "longitude":  -2.73451
    },
    {
        "latitude":  34.944046,
        "longitude":  -2.734514
    },
    {
        "latitude":  34.944046,
        "longitude":  -2.734821
    },
    {
        "latitude":  34.944043,
        "longitude":  -2.73512
    },
    {
        "latitude":  34.944261,
        "longitude":  -2.735108
    },
    {
        "latitude":  34.944474,
        "longitude":  -2.735102
    },
    {
        "latitude":  34.944692,
        "longitude":  -2.735105
    },
    {
        "latitude":  34.944921,
        "longitude":  -2.735091
    },
    {
        "latitude":  34.944897,
        "longitude":  -2.735276
    },
    {
        "latitude":  34.944882,
        "longitude":  -2.735453
    },
    {
        "latitude":  34.944862,
        "longitude":  -2.735643
    },
    {
        "latitude":  34.944835,
        "longitude":  -2.735815
    },
    {
        "latitude":  34.944802,
        "longitude":  -2.735997
    },
    {
        "latitude":  34.944769,
        "longitude":  -2.736149
    },
    {
        "latitude":  34.944729,
        "longitude":  -2.736327
    },
    {
        "latitude":  34.944706,
        "longitude":  -2.736481
    },
    {
        "latitude":  34.944687,
        "longitude":  -2.736663
    },
    {
        "latitude":  34.944657,
        "longitude":  -2.736841
    },
    {
        "latitude":  34.944599,
        "longitude":  -2.737087
    },
    {
        "latitude":  34.944536,
        "longitude":  -2.737324
    },
    {
        "latitude":  34.944516,
        "longitude":  -2.737518
    },
    {
        "latitude":  34.94448,
        "longitude":  -2.737709
    },
    {
        "latitude":  34.944271,
        "longitude":  -2.737692
    },
    {
        "latitude":  34.94406,
        "longitude":  -2.737659
    },
    {
        "latitude":  34.94406,
        "longitude":  -2.737494
    },
    {
        "latitude":  34.944063,
        "longitude":  -2.737324
    },
    {
        "latitude":  34.943842,
        "longitude":  -2.737329
    },
    {
        "latitude":  34.943629,
        "longitude":  -2.737328
    },
    {
        "latitude":  34.943404,
        "longitude":  -2.73732
    },
    {
        "latitude":  34.943174,
        "longitude":  -2.737315
    },
    {
        "latitude":  34.942945,
        "longitude":  -2.737329
    },
    {
        "latitude":  34.942702,
        "longitude":  -2.737336
    },
    {
        "latitude":  34.942697,
        "longitude":  -2.737157
    },
    {
        "latitude":  34.94271,
        "longitude":  -2.736956
    },
    {
        "latitude":  34.942707,
        "longitude":  -2.736772
    },
    {
        "latitude":  34.942695,
        "longitude":  -2.736569
    },
    {
        "latitude":  34.942507,
        "longitude":  -2.736568
    },
    {
        "latitude":  34.942306,
        "longitude":  -2.736557
    },
    {
        "latitude":  34.942326,
        "longitude":  -2.736772
    },
    {
        "latitude":  34.942312,
        "longitude":  -2.736959
    },
    {
        "latitude":  34.942316,
        "longitude":  -2.737163
    },
    {
        "latitude":  34.94232,
        "longitude":  -2.737353
    },
    {
        "latitude":  34.942144,
        "longitude":  -2.737359
    },
    {
        "latitude":  34.941961,
        "longitude":  -2.737358
    },
    {
        "latitude":  34.941966,
        "longitude":  -2.737157
    },
    {
        "latitude":  34.941969,
        "longitude":  -2.736959
    },
    {
        "latitude":  34.941966,
        "longitude":  -2.73676
    },
    {
        "latitude":  34.941975,
        "longitude":  -2.736553
    },
    {
        "latitude":  34.941764,
        "longitude":  -2.736571
    },
    {
        "latitude":  34.941544,
        "longitude":  -2.736574
    },
    {
        "latitude":  34.941393,
        "longitude":  -2.736557
    },
    {
        "latitude":  34.941235,
        "longitude":  -2.736536
    },
    {
        "latitude":  34.941222,
        "longitude":  -2.736786
    },
    {
        "latitude":  34.941214,
        "longitude":  -2.737036
    },
    {
        "latitude":  34.941071,
        "longitude":  -2.737074
    },
    {
        "latitude":  34.940978,
        "longitude":  -2.737192
    },
    {
        "latitude":  34.940862,
        "longitude":  -2.737196
    },
    {
        "latitude":  34.940734,
        "longitude":  -2.737197
    },
    {
        "latitude":  34.940541,
        "longitude":  -2.737217
    },
    {
        "latitude":  34.940349,
        "longitude":  -2.737226
    },
    {
        "latitude":  34.940345,
        "longitude":  -2.737023
    },
    {
        "latitude":  34.940424,
        "longitude":  -2.736814
    },
    {
        "latitude":  34.940481,
        "longitude":  -2.736591
    },
    {
        "latitude":  34.940529,
        "longitude":  -2.736398
    },
    {
        "latitude":  34.940592,
        "longitude":  -2.736184
    },
    {
        "latitude":  34.940641,
        "longitude":  -2.73601
    },
    {
        "latitude":  34.940779,
        "longitude":  -2.735995
    },
    {
        "latitude":  34.940915,
        "longitude":  -2.735976
    },
    {
        "latitude":  34.941082,
        "longitude":  -2.735989
    },
    {
        "latitude":  34.941238,
        "longitude":  -2.736002
    },
    {
        "latitude":  34.941237,
        "longitude":  -2.735794
    },
    {
        "latitude":  34.941225,
        "longitude":  -2.735589
    },
    {
        "latitude":  34.94121,
        "longitude":  -2.735385
    },
    {
        "latitude":  34.941214,
        "longitude":  -2.73518
    },
    {
        "latitude":  34.9414,
        "longitude":  -2.735174
    },
    {
        "latitude":  34.941596,
        "longitude":  -2.735167
    },
    {
        "latitude":  34.94159,
        "longitude":  -2.735375
    },
    {
        "latitude":  34.94158,
        "longitude":  -2.735559
    },
    {
        "latitude":  34.941575,
        "longitude":  -2.735754
    },
    {
        "latitude":  34.941568,
        "longitude":  -2.735938
    },
    {
        "latitude":  34.94168,
        "longitude":  -2.735943
    },
    {
        "latitude":  34.941786,
        "longitude":  -2.73594
    },
    {
        "latitude":  34.941901,
        "longitude":  -2.73595
    },
    {
        "latitude":  34.942002,
        "longitude":  -2.735951
    },
    {
        "latitude":  34.942003,
        "longitude":  -2.735803
    },
    {
        "latitude":  34.941998,
        "longitude":  -2.735656
    },
    {
        "latitude":  34.941996,
        "longitude":  -2.73551
    },
    {
        "latitude":  34.941995,
        "longitude":  -2.735366
    },
    {
        "latitude":  34.941996,
        "longitude":  -2.735165
    },
    {
        "latitude":  34.941998,
        "longitude":  -2.734969
    },
    {
        "latitude":  34.942003,
        "longitude":  -2.734771
    },
    {
        "latitude":  34.942009,
        "longitude":  -2.734561
    },
    {
        "latitude":  34.941811,
        "longitude":  -2.734545
    },
    {
        "latitude":  34.941596,
        "longitude":  -2.734523
    },
    {
        "latitude":  34.94159,
        "longitude":  -2.73438
    },
    {
        "latitude":  34.94153,
        "longitude":  -2.73423
    },
    {
        "latitude":  34.94146,
        "longitude":  -2.734087
    },
    {
        "latitude":  34.941381,
        "longitude":  -2.733942
    },
    {
        "latitude":  34.941297,
        "longitude":  -2.733806
    },
    {
        "latitude":  34.941232,
        "longitude":  -2.733668
    },
    {
        "latitude":  34.941152,
        "longitude":  -2.733525
    },
    {
        "latitude":  34.941071,
        "longitude":  -2.73337
    },
    {
        "latitude":  34.941157,
        "longitude":  -2.733311
    },
    {
        "latitude":  34.94125,
        "longitude":  -2.733238
    },
    {
        "latitude":  34.941337,
        "longitude":  -2.733164
    },
    {
        "latitude":  34.941422,
        "longitude":  -2.733086
    },
    {
        "latitude":  34.941495,
        "longitude":  -2.733244
    },
    {
        "latitude":  34.941578,
        "longitude":  -2.733378
    },
    {
        "latitude":  34.941663,
        "longitude":  -2.733528
    },
    {
        "latitude":  34.941738,
        "longitude":  -2.733671
    },
    {
        "latitude":  34.941831,
        "longitude":  -2.73361
    },
    {
        "latitude":  34.941938,
        "longitude":  -2.733546
    },
    {
        "latitude":  34.942031,
        "longitude":  -2.733479
    },
    {
        "latitude":  34.942124,
        "longitude":  -2.733421
    },
    {
        "latitude":  34.942048,
        "longitude":  -2.733277
    },
    {
        "latitude":  34.941958,
        "longitude":  -2.733119
    },
    {
        "latitude":  34.941876,
        "longitude":  -2.732963
    },
    {
        "latitude":  34.941794,
        "longitude":  -2.732802
    },
    {
        "latitude":  34.941729,
        "longitude":  -2.732684
    },
    {
        "latitude":  34.941668,
        "longitude":  -2.732551
    },
    {
        "latitude":  34.941601,
        "longitude":  -2.732427
    },
    {
        "latitude":  34.941519,
        "longitude":  -2.732281
    },
    {
        "latitude":  34.941565,
        "longitude":  -2.732124
    },
    {
        "latitude":  34.941739,
        "longitude":  -2.732003
    },
    {
        "latitude":  34.941914,
        "longitude":  -2.731868
    },
    {
        "latitude":  34.942082,
        "longitude":  -2.731737
    },
    {
        "latitude":  34.942256,
        "longitude":  -2.731603
    },
    {
        "latitude":  34.94241,
        "longitude":  -2.731884
    },
    {
        "latitude":  34.942565,
        "longitude":  -2.732171
    },
    {
        "latitude":  34.942748,
        "longitude":  -2.73251
    },
    {
        "latitude":  34.942937,
        "longitude":  -2.732853
    },
    {
        "latitude":  34.943154,
        "longitude":  -2.733267
    },
    {
        "latitude":  34.943381,
        "longitude":  -2.733675
    },
    {
        "latitude":  34.943497,
        "longitude":  -2.733597
    },
    {
        "latitude":  34.943621,
        "longitude":  -2.73351
    },
    {
        "latitude":  34.943664,
        "longitude":  -2.733432
    },
    {
        "latitude":  34.943722,
        "longitude":  -2.73337
    },
    {
        "latitude":  34.943654,
        "longitude":  -2.733246
    },
    {
        "latitude":  34.943592,
        "longitude":  -2.733114
    },
    {
        "latitude":  34.943527,
        "longitude":  -2.732998
    },
    {
        "latitude":  34.943458,
        "longitude":  -2.732862
    },
    {
        "latitude":  34.943329,
        "longitude":  -2.732616
    },
    {
        "latitude":  34.943187,
        "longitude":  -2.73237
    },
    {
        "latitude":  34.943043,
        "longitude":  -2.732091
    },
    {
        "latitude":  34.942963,
        "longitude":  -2.731951
    },
    {
        "latitude":  34.942895,
        "longitude":  -2.731811
    },
    {
        "latitude":  34.942773,
        "longitude":  -2.731557
    },
    {
        "latitude":  34.942666,
        "longitude":  -2.731298
    },
    {
        "latitude":  34.942846,
        "longitude":  -2.731141
    },
    {
        "latitude":  34.942688,
        "longitude":  -2.730836
    },
    {
        "latitude":  34.942538,
        "longitude":  -2.73054
    },
    {
        "latitude":  34.942378,
        "longitude":  -2.730238
    },
    {
        "latitude":  34.94223,
        "longitude":  -2.729941
    },
    {
        "latitude":  34.942118,
        "longitude":  -2.730026
    },
    {
        "latitude":  34.941995,
        "longitude":  -2.730128
    },
    {
        "latitude":  34.942152,
        "longitude":  -2.730418
    },
    {
        "latitude":  34.942298,
        "longitude":  -2.730713
    },
    {
        "latitude":  34.94241,
        "longitude":  -2.730915
    },
    {
        "latitude":  34.942503,
        "longitude":  -2.731095
    },
    {
        "latitude":  34.942593,
        "longitude":  -2.731319
    },
    {
        "latitude":  34.942753,
        "longitude":  -2.731203
    },
    {
        "latitude":  34.942902,
        "longitude":  -2.731078
    },
    {
        "latitude":  34.943091,
        "longitude":  -2.730928
    },
    {
        "latitude":  34.943291,
        "longitude":  -2.730794
    },
    {
        "latitude":  34.943414,
        "longitude":  -2.731025
    },
    {
        "latitude":  34.943552,
        "longitude":  -2.731256
    },
    {
        "latitude":  34.943666,
        "longitude":  -2.73154
    },
    {
        "latitude":  34.943754,
        "longitude":  -2.731749
    },
    {
        "latitude":  34.94385,
        "longitude":  -2.731934
    },
    {
        "latitude":  34.94397,
        "longitude":  -2.73217
    },
    {
        "latitude":  34.944093,
        "longitude":  -2.732412
    },
    {
        "latitude":  34.944191,
        "longitude":  -2.732887
    },
    {
        "latitude":  34.944236,
        "longitude":  -2.733124
    },
    {
        "latitude":  34.94426,
        "longitude":  -2.733324
    },
    {
        "latitude":  34.944052,
        "longitude":  -2.733297
    },
    {
        "latitude":  34.94384,
        "longitude":  -2.733281
    },
    {
        "latitude":  34.94375,
        "longitude":  -2.73334
    },
    {
        "latitude":  34.943565,
        "longitude":  -2.733578
    },
    {
        "latitude":  34.943395,
        "longitude":  -2.733705
    },
    {
        "latitude":  34.943215,
        "longitude":  -2.733396
    },
    {
        "latitude":  34.943041,
        "longitude":  -2.733103
    },
    {
        "latitude":  34.942836,
        "longitude":  -2.732713
    },
    {
        "latitude":  34.942659,
        "longitude":  -2.7324
    },
    {
        "latitude":  34.94252,
        "longitude":  -2.732188
    },
    {
        "latitude":  34.942408,
        "longitude":  -2.732281
    },
    {
        "latitude":  34.942291,
        "longitude":  -2.732379
    },
    {
        "latitude":  34.94216,
        "longitude":  -2.732497
    },
    {
        "latitude":  34.942047,
        "longitude":  -2.732603
    },
    {
        "latitude":  34.941954,
        "longitude":  -2.732681
    },
    {
        "latitude":  34.941836,
        "longitude":  -2.73276
    },
    {
        "latitude":  34.941693,
        "longitude":  -2.732662
    },
    {
        "latitude":  34.941568,
        "longitude":  -2.732434
    },
    {
        "latitude":  34.941499,
        "longitude":  -2.732218
    },
    {
        "latitude":  34.941426,
        "longitude":  -2.73207
    },
    {
        "latitude":  34.94136,
        "longitude":  -2.731929
    },
    {
        "latitude":  34.941274,
        "longitude":  -2.731767
    },
    {
        "latitude":  34.941179,
        "longitude":  -2.731599
    },
    {
        "latitude":  34.941106,
        "longitude":  -2.731465
    },
    {
        "latitude":  34.941018,
        "longitude":  -2.731322
    },
    {
        "latitude":  34.940936,
        "longitude":  -2.731178
    },
    {
        "latitude":  34.940856,
        "longitude":  -2.731035
    },
    {
        "latitude":  34.940755,
        "longitude":  -2.730851
    },
    {
        "latitude":  34.940658,
        "longitude":  -2.730671
    },
    {
        "latitude":  34.940524,
        "longitude":  -2.730441
    },
    {
        "latitude":  34.940387,
        "longitude":  -2.730184
    },
    {
        "latitude":  34.940318,
        "longitude":  -2.730052
    },
    {
        "latitude":  34.940255,
        "longitude":  -2.729895
    },
    {
        "latitude":  34.940182,
        "longitude":  -2.729735
    },
    {
        "latitude":  34.940109,
        "longitude":  -2.729573
    },
    {
        "latitude":  34.940106,
        "longitude":  -2.729387
    },
    {
        "latitude":  34.940085,
        "longitude":  -2.729107
    },
    {
        "latitude":  34.939945,
        "longitude":  -2.729108
    },
    {
        "latitude":  34.939793,
        "longitude":  -2.729111
    },
    {
        "latitude":  34.939719,
        "longitude":  -2.728934
    },
    {
        "latitude":  34.939647,
        "longitude":  -2.728747
    },
    {
        "latitude":  34.939609,
        "longitude":  -2.728613
    },
    {
        "latitude":  34.939557,
        "longitude":  -2.728472
    },
    {
        "latitude":  34.939514,
        "longitude":  -2.728289
    },
    {
        "latitude":  34.93947,
        "longitude":  -2.728124
    },
    {
        "latitude":  34.939479,
        "longitude":  -2.727975
    },
    {
        "latitude":  34.939494,
        "longitude":  -2.727798
    },
    {
        "latitude":  34.939484,
        "longitude":  -2.727556
    },
    {
        "latitude":  34.93948,
        "longitude":  -2.727319
    },
    {
        "latitude":  34.939307,
        "longitude":  -2.72731
    },
    {
        "latitude":  34.939182,
        "longitude":  -2.727323
    },
    {
        "latitude":  34.939011,
        "longitude":  -2.727318
    },
    {
        "latitude":  34.938838,
        "longitude":  -2.727319
    },
    {
        "latitude":  34.938818,
        "longitude":  -2.727071
    },
    {
        "latitude":  34.938807,
        "longitude":  -2.726819
    },
    {
        "latitude":  34.938648,
        "longitude":  -2.726802
    },
    {
        "latitude":  34.938483,
        "longitude":  -2.726802
    },
    {
        "latitude":  34.938504,
        "longitude":  -2.726505
    },
    {
        "latitude":  34.938335,
        "longitude":  -2.726619
    },
    {
        "latitude":  34.938174,
        "longitude":  -2.726734
    },
    {
        "latitude":  34.938047,
        "longitude":  -2.726836
    },
    {
        "latitude":  34.937921,
        "longitude":  -2.726921
    },
    {
        "latitude":  34.937914,
        "longitude":  -2.726759
    },
    {
        "latitude":  34.937909,
        "longitude":  -2.726607
    },
    {
        "latitude":  34.937909,
        "longitude":  -2.726454
    },
    {
        "latitude":  34.937907,
        "longitude":  -2.726289
    },
    {
        "latitude":  34.937917,
        "longitude":  -2.726285
    },
    {
        "latitude":  34.937917,
        "longitude":  -2.726289
    }
]
;


async function runSimulation() {
  const sellerRef = db.collection('users').doc('tLxGXCKHQDUPOlLxQDpH4zzmP4E2');
  
  const docSnap = await sellerRef.get();
  let currentIndex = 0;
  
  if (docSnap.exists && docSnap.data().currentRouteIndex !== undefined) {
    currentIndex = docSnap.data().currentRouteIndex;
  }

  console.log("🚲 Fahrrad-Straßenverkäufer Simulation gestartet (30 Minuten)...");

  // 180 Durchläufe * 10 Sekunden = 30 Minuten langsame Fahrt
  for (let i = 0; i < 1440; i++) {
    if (currentIndex >= route.length) {
      currentIndex = 0;
    }

    const currentPos = route[currentIndex];

    try {
      await sellerRef.set({
       // name: "Fahrrad-Verkäufer Zaio",
        //role: "vendor",
        isOnline: true,
        currentRouteIndex: currentIndex + 1,
        updatedAt: FieldValue.serverTimestamp(),
        location: {
          latitude: currentPos.latitude,
          longitude: currentPos.longitude,
          geopoint: new GeoPoint(currentPos.latitude, currentPos.longitude)
        }
      }, { merge: true });

      console.log(`[Schritt ${i+1}/180] Fahrrad-Position: Lat ${currentPos.latitude}, Lng ${currentPos.longitude}`);
    } catch (error) {
      console.error("Fehler beim Schreiben:", error);
    }

    currentIndex++;

    // 10 Sekunden Pause für ein gemütliches Fahrrad-Tempo
    if (i < 1439) {
      await new Promise(resolve => setTimeout(resolve, 10000));
    }
  }
}

runSimulation();
