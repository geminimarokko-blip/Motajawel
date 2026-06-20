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
];
const route1 = [
    {
        "latitude":  34.943593,
        "longitude":  -2.726855
    },
    {
        "latitude":  34.943587,
        "longitude":  -2.727096
    },
    {
        "latitude":  34.943565,
        "longitude":  -2.727347
    },
    {
        "latitude":  34.94356,
        "longitude":  -2.727725
    },
    {
        "latitude":  34.943556,
        "longitude":  -2.728057
    },
    {
        "latitude":  34.94341,
        "longitude":  -2.72816
    },
    {
        "latitude":  34.943556,
        "longitude":  -2.728435
    },
    {
        "latitude":  34.94371,
        "longitude":  -2.728629
    },
    {
        "latitude":  34.94387,
        "longitude":  -2.728847
    },
    {
        "latitude":  34.943964,
        "longitude":  -2.728973
    },
    {
        "latitude":  34.94417,
        "longitude":  -2.729339
    },
    {
        "latitude":  34.944349,
        "longitude":  -2.72954
    },
    {
        "latitude":  34.944522,
        "longitude":  -2.729694
    },
    {
        "latitude":  34.944574,
        "longitude":  -2.729969
    },
    {
        "latitude":  34.944461,
        "longitude":  -2.730032
    },
    {
        "latitude":  34.94433,
        "longitude":  -2.730112
    },
    {
        "latitude":  34.944213,
        "longitude":  -2.729894
    },
    {
        "latitude":  34.944062,
        "longitude":  -2.729671
    },
    {
        "latitude":  34.94395,
        "longitude":  -2.729517
    },
    {
        "latitude":  34.943823,
        "longitude":  -2.729351
    },
    {
        "latitude":  34.943706,
        "longitude":  -2.729162
    },
    {
        "latitude":  34.94356,
        "longitude":  -2.728961
    },
    {
        "latitude":  34.943387,
        "longitude":  -2.728721
    },
    {
        "latitude":  34.943199,
        "longitude":  -2.728486
    },
    {
        "latitude":  34.943119,
        "longitude":  -2.72867
    },
    {
        "latitude":  34.943011,
        "longitude":  -2.728801
    },
    {
        "latitude":  34.942847,
        "longitude":  -2.72895
    },
    {
        "latitude":  34.942697,
        "longitude":  -2.729059
    },
    {
        "latitude":  34.942828,
        "longitude":  -2.729236
    },
    {
        "latitude":  34.942922,
        "longitude":  -2.729414
    },
    {
        "latitude":  34.942813,
        "longitude":  -2.729517
    },
    {
        "latitude":  34.942711,
        "longitude":  -2.72962
    },
    {
        "latitude":  34.942606,
        "longitude":  -2.7297
    },
    {
        "latitude":  34.942491,
        "longitude":  -2.729786
    },
    {
        "latitude":  34.942622,
        "longitude":  -2.73002
    },
    {
        "latitude":  34.942753,
        "longitude":  -2.730266
    },
    {
        "latitude":  34.94285,
        "longitude":  -2.730186
    },
    {
        "latitude":  34.942955,
        "longitude":  -2.730101
    },
    {
        "latitude":  34.943071,
        "longitude":  -2.730009
    },
    {
        "latitude":  34.943171,
        "longitude":  -2.729894
    },
    {
        "latitude":  34.943263,
        "longitude":  -2.730089
    },
    {
        "latitude":  34.943354,
        "longitude":  -2.730261
    },
    {
        "latitude":  34.943432,
        "longitude":  -2.730433
    },
    {
        "latitude":  34.943527,
        "longitude":  -2.730598
    },
    {
        "latitude":  34.943413,
        "longitude":  -2.730696
    },
    {
        "latitude":  34.943307,
        "longitude":  -2.73077
    },
    {
        "latitude":  34.943152,
        "longitude":  -2.730908
    },
    {
        "latitude":  34.943002,
        "longitude":  -2.731033
    },
    {
        "latitude":  34.943204,
        "longitude":  -2.7314
    },
    {
        "latitude":  34.943396,
        "longitude":  -2.731703
    },
    {
        "latitude":  34.943218,
        "longitude":  -2.731863
    },
    {
        "latitude":  34.94304,
        "longitude":  -2.731995
    },
    {
        "latitude":  34.942846,
        "longitude":  -2.731629
    },
    {
        "latitude":  34.942636,
        "longitude":  -2.731257
    },
    {
        "latitude":  34.942861,
        "longitude":  -2.731096
    },
    {
        "latitude":  34.942804,
        "longitude":  -2.730942
    },
    {
        "latitude":  34.942714,
        "longitude":  -2.730787
    },
    {
        "latitude":  34.94263,
        "longitude":  -2.730656
    },
    {
        "latitude":  34.942578,
        "longitude":  -2.730513
    },
    {
        "latitude":  34.942513,
        "longitude":  -2.730387
    },
    {
        "latitude":  34.942433,
        "longitude":  -2.730238
    },
    {
        "latitude":  34.942358,
        "longitude":  -2.730101
    },
    {
        "latitude":  34.942265,
        "longitude":  -2.729957
    },
    {
        "latitude":  34.942128,
        "longitude":  -2.730083
    },
    {
        "latitude":  34.941979,
        "longitude":  -2.730158
    },
    {
        "latitude":  34.94179,
        "longitude":  -2.730318
    },
    {
        "latitude":  34.94158,
        "longitude":  -2.730444
    },
    {
        "latitude":  34.941523,
        "longitude":  -2.730141
    },
    {
        "latitude":  34.941458,
        "longitude":  -2.729831
    },
    {
        "latitude":  34.941673,
        "longitude":  -2.729757
    },
    {
        "latitude":  34.941913,
        "longitude":  -2.729706
    },
    {
        "latitude":  34.941898,
        "longitude":  -2.729494
    },
    {
        "latitude":  34.941918,
        "longitude":  -2.729276
    },
    {
        "latitude":  34.941942,
        "longitude":  -2.728858
    },
    {
        "latitude":  34.942147,
        "longitude":  -2.728927
    },
    {
        "latitude":  34.942345,
        "longitude":  -2.72895
    },
    {
        "latitude":  34.942373,
        "longitude":  -2.729362
    },
    {
        "latitude":  34.942547,
        "longitude":  -2.729213
    },
    {
        "latitude":  34.942616,
        "longitude":  -2.729087
    },
    {
        "latitude":  34.942702,
        "longitude":  -2.728927
    },
    {
        "latitude":  34.9427,
        "longitude":  -2.728647
    },
    {
        "latitude":  34.942702,
        "longitude":  -2.728372
    },
    {
        "latitude":  34.9427,
        "longitude":  -2.728183
    },
    {
        "latitude":  34.942674,
        "longitude":  -2.727977
    },
    {
        "latitude":  34.942475,
        "longitude":  -2.72796
    },
    {
        "latitude":  34.942292,
        "longitude":  -2.727954
    },
    {
        "latitude":  34.942114,
        "longitude":  -2.727954
    },
    {
        "latitude":  34.941942,
        "longitude":  -2.727914
    },
    {
        "latitude":  34.941931,
        "longitude":  -2.727731
    },
    {
        "latitude":  34.941921,
        "longitude":  -2.72749
    },
    {
        "latitude":  34.941921,
        "longitude":  -2.727273
    },
    {
        "latitude":  34.941913,
        "longitude":  -2.727027
    },
    {
        "latitude":  34.942015,
        "longitude":  -2.726964
    },
    {
        "latitude":  34.942139,
        "longitude":  -2.726895
    },
    {
        "latitude":  34.942283,
        "longitude":  -2.726878
    },
    {
        "latitude":  34.942425,
        "longitude":  -2.726849
    },
    {
        "latitude":  34.942621,
        "longitude":  -2.726872
    },
    {
        "latitude":  34.942833,
        "longitude":  -2.726855
    },
    {
        "latitude":  34.943043,
        "longitude":  -2.726827
    },
    {
        "latitude":  34.943241,
        "longitude":  -2.726821
    },
    {
        "latitude":  34.943413,
        "longitude":  -2.726838
    },
    {
        "latitude":  34.943593,
        "longitude":  -2.726838
    }
]
;

const route2 = [
    {
        "latitude":  34.941238,
        "longitude":  -2.736053
    },
    {
        "latitude":  34.941266,
        "longitude":  -2.735859
    },
    {
        "latitude":  34.941238,
        "longitude":  -2.73563
    },
    {
        "latitude":  34.941234,
        "longitude":  -2.735401
    },
    {
        "latitude":  34.94121,
        "longitude":  -2.735137
    },
    {
        "latitude":  34.94121,
        "longitude":  -2.734857
    },
    {
        "latitude":  34.94121,
        "longitude":  -2.734531
    },
    {
        "latitude":  34.941182,
        "longitude":  -2.734359
    },
    {
        "latitude":  34.941144,
        "longitude":  -2.734187
    },
    {
        "latitude":  34.941032,
        "longitude":  -2.734267
    },
    {
        "latitude":  34.940957,
        "longitude":  -2.734136
    },
    {
        "latitude":  34.940882,
        "longitude":  -2.73397
    },
    {
        "latitude":  34.940793,
        "longitude":  -2.733827
    },
    {
        "latitude":  34.940722,
        "longitude":  -2.733649
    },
    {
        "latitude":  34.940816,
        "longitude":  -2.733581
    },
    {
        "latitude":  34.94091,
        "longitude":  -2.733512
    },
    {
        "latitude":  34.940994,
        "longitude":  -2.733466
    },
    {
        "latitude":  34.941088,
        "longitude":  -2.733386
    },
    {
        "latitude":  34.941159,
        "longitude":  -2.733369
    },
    {
        "latitude":  34.941224,
        "longitude":  -2.733294
    },
    {
        "latitude":  34.941295,
        "longitude":  -2.733231
    },
    {
        "latitude":  34.94137,
        "longitude":  -2.733146
    },
    {
        "latitude":  34.941478,
        "longitude":  -2.733089
    },
    {
        "latitude":  34.941562,
        "longitude":  -2.732997
    },
    {
        "latitude":  34.941661,
        "longitude":  -2.73294
    },
    {
        "latitude":  34.941773,
        "longitude":  -2.732848
    },
    {
        "latitude":  34.941947,
        "longitude":  -2.732677
    },
    {
        "latitude":  34.94213,
        "longitude":  -2.732517
    },
    {
        "latitude":  34.942341,
        "longitude":  -2.732351
    },
    {
        "latitude":  34.942524,
        "longitude":  -2.732195
    },
    {
        "latitude":  34.942622,
        "longitude":  -2.732368
    },
    {
        "latitude":  34.942716,
        "longitude":  -2.732534
    },
    {
        "latitude":  34.942819,
        "longitude":  -2.732706
    },
    {
        "latitude":  34.942937,
        "longitude":  -2.732871
    },
    {
        "latitude":  34.943078,
        "longitude":  -2.733072
    },
    {
        "latitude":  34.943176,
        "longitude":  -2.733284
    },
    {
        "latitude":  34.943289,
        "longitude":  -2.733484
    },
    {
        "latitude":  34.943397,
        "longitude":  -2.733672
    },
    {
        "latitude":  34.943218,
        "longitude":  -2.733816
    },
    {
        "latitude":  34.943017,
        "longitude":  -2.733959
    },
    {
        "latitude":  34.942824,
        "longitude":  -2.734114
    },
    {
        "latitude":  34.942636,
        "longitude":  -2.734256
    },
    {
        "latitude":  34.942632,
        "longitude":  -2.734423
    },
    {
        "latitude":  34.942655,
        "longitude":  -2.734565
    },
    {
        "latitude":  34.942655,
        "longitude":  -2.7348
    },
    {
        "latitude":  34.94266,
        "longitude":  -2.735047
    },
    {
        "latitude":  34.942655,
        "longitude":  -2.735304
    },
    {
        "latitude":  34.942651,
        "longitude":  -2.735533
    },
    {
        "latitude":  34.942651,
        "longitude":  -2.735796
    },
    {
        "latitude":  34.942646,
        "longitude":  -2.736031
    },
    {
        "latitude":  34.942646,
        "longitude":  -2.736271
    },
    {
        "latitude":  34.942655,
        "longitude":  -2.7365
    },
    {
        "latitude":  34.942665,
        "longitude":  -2.736701
    },
    {
        "latitude":  34.94266,
        "longitude":  -2.736913
    },
    {
        "latitude":  34.942669,
        "longitude":  -2.737113
    },
    {
        "latitude":  34.942665,
        "longitude":  -2.737324
    },
    {
        "latitude":  34.942669,
        "longitude":  -2.737559
    },
    {
        "latitude":  34.942683,
        "longitude":  -2.73777
    },
    {
        "latitude":  34.942519,
        "longitude":  -2.737903
    },
    {
        "latitude":  34.942332,
        "longitude":  -2.738
    },
    {
        "latitude":  34.942144,
        "longitude":  -2.738103
    },
    {
        "latitude":  34.941961,
        "longitude":  -2.738205
    },
    {
        "latitude":  34.942055,
        "longitude":  -2.73832
    },
    {
        "latitude":  34.942233,
        "longitude":  -2.738332
    },
    {
        "latitude":  34.942411,
        "longitude":  -2.738298
    },
    {
        "latitude":  34.942571,
        "longitude":  -2.738292
    },
    {
        "latitude":  34.94274,
        "longitude":  -2.738274
    },
    {
        "latitude":  34.942855,
        "longitude":  -2.738286
    },
    {
        "latitude":  34.942987,
        "longitude":  -2.738275
    },
    {
        "latitude":  34.943109,
        "longitude":  -2.738246
    },
    {
        "latitude":  34.943246,
        "longitude":  -2.738251
    },
    {
        "latitude":  34.943381,
        "longitude":  -2.738286
    },
    {
        "latitude":  34.943547,
        "longitude":  -2.738286
    },
    {
        "latitude":  34.943662,
        "longitude":  -2.738286
    },
    {
        "latitude":  34.943808,
        "longitude":  -2.738269
    },
    {
        "latitude":  34.943958,
        "longitude":  -2.738269
    },
    {
        "latitude":  34.9441,
        "longitude":  -2.738274
    },
    {
        "latitude":  34.944109,
        "longitude":  -2.738125
    },
    {
        "latitude":  34.944089,
        "longitude":  -2.737966
    },
    {
        "latitude":  34.944076,
        "longitude":  -2.737804
    },
    {
        "latitude":  34.944066,
        "longitude":  -2.737695
    },
    {
        "latitude":  34.944188,
        "longitude":  -2.737695
    },
    {
        "latitude":  34.944296,
        "longitude":  -2.737667
    },
    {
        "latitude":  34.944409,
        "longitude":  -2.73769
    },
    {
        "latitude":  34.944523,
        "longitude":  -2.737725
    },
    {
        "latitude":  34.94453,
        "longitude":  -2.737545
    },
    {
        "latitude":  34.944541,
        "longitude":  -2.737367
    },
    {
        "latitude":  34.944597,
        "longitude":  -2.737216
    },
    {
        "latitude":  34.944629,
        "longitude":  -2.737071
    },
    {
        "latitude":  34.944687,
        "longitude":  -2.736754
    },
    {
        "latitude":  34.944723,
        "longitude":  -2.7366
    },
    {
        "latitude":  34.944748,
        "longitude":  -2.736436
    },
    {
        "latitude":  34.944799,
        "longitude":  -2.736111
    },
    {
        "latitude":  34.944824,
        "longitude":  -2.735929
    },
    {
        "latitude":  34.944861,
        "longitude":  -2.735755
    },
    {
        "latitude":  34.944888,
        "longitude":  -2.735406
    },
    {
        "latitude":  34.944911,
        "longitude":  -2.735258
    },
    {
        "latitude":  34.944926,
        "longitude":  -2.735092
    },
    {
        "latitude":  34.944814,
        "longitude":  -2.735079
    },
    {
        "latitude":  34.944709,
        "longitude":  -2.735094
    },
    {
        "latitude":  34.944601,
        "longitude":  -2.735103
    },
    {
        "latitude":  34.944487,
        "longitude":  -2.735111
    },
    {
        "latitude":  34.944376,
        "longitude":  -2.735137
    },
    {
        "latitude":  34.94426,
        "longitude":  -2.735128
    },
    {
        "latitude":  34.944155,
        "longitude":  -2.735137
    },
    {
        "latitude":  34.944044,
        "longitude":  -2.735137
    },
    {
        "latitude":  34.944044,
        "longitude":  -2.735329
    },
    {
        "latitude":  34.944043,
        "longitude":  -2.735539
    },
    {
        "latitude":  34.94404,
        "longitude":  -2.735734
    },
    {
        "latitude":  34.944035,
        "longitude":  -2.735916
    },
    {
        "latitude":  34.943914,
        "longitude":  -2.735931
    },
    {
        "latitude":  34.943816,
        "longitude":  -2.735916
    },
    {
        "latitude":  34.943701,
        "longitude":  -2.735926
    },
    {
        "latitude":  34.943594,
        "longitude":  -2.735905
    },
    {
        "latitude":  34.943488,
        "longitude":  -2.735902
    },
    {
        "latitude":  34.943381,
        "longitude":  -2.735895
    },
    {
        "latitude":  34.943255,
        "longitude":  -2.735878
    },
    {
        "latitude":  34.943162,
        "longitude":  -2.73587
    },
    {
        "latitude":  34.943165,
        "longitude":  -2.736075
    },
    {
        "latitude":  34.943161,
        "longitude":  -2.736253
    },
    {
        "latitude":  34.943157,
        "longitude":  -2.736451
    },
    {
        "latitude":  34.943162,
        "longitude":  -2.736603
    },
    {
        "latitude":  34.943176,
        "longitude":  -2.736788
    },
    {
        "latitude":  34.943192,
        "longitude":  -2.736975
    },
    {
        "latitude":  34.943204,
        "longitude":  -2.737153
    },
    {
        "latitude":  34.9432,
        "longitude":  -2.737335
    },
    {
        "latitude":  34.942987,
        "longitude":  -2.737341
    },
    {
        "latitude":  34.942873,
        "longitude":  -2.737351
    },
    {
        "latitude":  34.942758,
        "longitude":  -2.73736
    },
    {
        "latitude":  34.942522,
        "longitude":  -2.737346
    },
    {
        "latitude":  34.942431,
        "longitude":  -2.737327
    },
    {
        "latitude":  34.942317,
        "longitude":  -2.737335
    },
    {
        "latitude":  34.942305,
        "longitude":  -2.737158
    },
    {
        "latitude":  34.942305,
        "longitude":  -2.736961
    },
    {
        "latitude":  34.942309,
        "longitude":  -2.736768
    },
    {
        "latitude":  34.942289,
        "longitude":  -2.736568
    },
    {
        "latitude":  34.942093,
        "longitude":  -2.736571
    },
    {
        "latitude":  34.94197,
        "longitude":  -2.736561
    },
    {
        "latitude":  34.941974,
        "longitude":  -2.736783
    },
    {
        "latitude":  34.941978,
        "longitude":  -2.737004
    },
    {
        "latitude":  34.94199,
        "longitude":  -2.737192
    },
    {
        "latitude":  34.941989,
        "longitude":  -2.737404
    },
    {
        "latitude":  34.94186,
        "longitude":  -2.737394
    },
    {
        "latitude":  34.941761,
        "longitude":  -2.737384
    },
    {
        "latitude":  34.941639,
        "longitude":  -2.73737
    },
    {
        "latitude":  34.941529,
        "longitude":  -2.737335
    },
    {
        "latitude":  34.941352,
        "longitude":  -2.737365
    },
    {
        "latitude":  34.941182,
        "longitude":  -2.737381
    },
    {
        "latitude":  34.94108,
        "longitude":  -2.737303
    },
    {
        "latitude":  34.940985,
        "longitude":  -2.737232
    },
    {
        "latitude":  34.940847,
        "longitude":  -2.737235
    },
    {
        "latitude":  34.940722,
        "longitude":  -2.737232
    },
    {
        "latitude":  34.940733,
        "longitude":  -2.736985
    },
    {
        "latitude":  34.940722,
        "longitude":  -2.736694
    },
    {
        "latitude":  34.940816,
        "longitude":  -2.736624
    },
    {
        "latitude":  34.94091,
        "longitude":  -2.736557
    },
    {
        "latitude":  34.940911,
        "longitude":  -2.736287
    },
    {
        "latitude":  34.940891,
        "longitude":  -2.736007
    },
    {
        "latitude":  34.941064,
        "longitude":  -2.736022
    },
    {
        "latitude":  34.94122,
        "longitude":  -2.736042
    }
]
;

//Users
const sellers = [
  {
    userId: "tLxGXCKHQDUPOlLxQDpH4zzmP4E2",
    route: route
  },
  {
    userId: "B4F1O9lvlRXRHdylrTSkEqf6Xhd2",
    route: route1
  },
  {
    userId: "9m0nEAAotpNMDoETe3tRx3IPAAt1",
    route: route2
  }
];


async function updateSeller(seller) {
  const sellerRef = db.collection("users").doc(seller.userId);

  const docSnap = await sellerRef.get();

  let currentIndex = 0;

  if (
    docSnap.exists &&
    docSnap.data().currentRouteIndex !== undefined
  ) {
    currentIndex = docSnap.data().currentRouteIndex;
  }

  if (currentIndex >= seller.route.length) {
    currentIndex = 0;
  }

  const currentPos = seller.route[currentIndex];

  try {
    await sellerRef.set(
      {
        //isOnline: true,
        //currentRouteIndex: currentIndex + 1,
        updatedAt: FieldValue.serverTimestamp(),
        location: {
          latitude: currentPos.latitude,
          longitude: currentPos.longitude,
          geopoint: new GeoPoint(
            currentPos.latitude,
            currentPos.longitude
          )
        }
      },
      { merge: true }
    );

    console.log(
      `[${seller.userId}] Lat ${currentPos.latitude}, Lng ${currentPos.longitude}`
    );
  } catch (error) {
    console.error(`Fehler bei ${seller.userId}:`, error);
  }
}

async function runSimulation() {
  console.log("🚲 Simulation für 3 Verkäufer gestartet");

  for (let i = 0; i < 1440; i++) {
    await Promise.all(
      sellers.map((seller) => updateSeller(seller))
    );

    if (i < 1438) {
      await new Promise((resolve) =>
        setTimeout(resolve, 10000)
      );
    }
  }
}

runSimulation();
