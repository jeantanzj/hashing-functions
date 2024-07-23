## Hashing performance

This script serves to quickly test out a few hashing functions on the browserside

Run with `npm run start`


### Results (in milliseconds)
```
-----------
ForBiggerBlazesVideo.mp4 Size: 2.134337MB
Convert file to buffer = 9.3
jsmd5 excl fileToArrayBuffer = 44.4700000166893
jsmd5 incl fileToArrayBuffer = 46.62999999523163
jsmd5 read file in chunks = 81.50999999940396
md5.js = 319.31999999880793
md5 = 308.2599999934435
crypto-es = 333.74000000953674
-----------
corgi.mov Size: 36.035217MB
Convert file to buffer = 147.74999999701976
jsmd5 excl fileToArrayBuffer = 709.130000013113
jsmd5 incl fileToArrayBuffer = 818.2300000071525
jsmd5 read file in chunks = 1388.279999998212
md5.js = 5380.35000000596
md5 = 5330.499999988079
crypto-es = 5735.229999989271
```

For larger sizes, md5.js, md5, crypto-es will cause the browser to crash.

For a 1.6gb file
``` 
-----------
Google_I_O_2013_KeynoteVideo.mp4 Size: 1666.114741MB
Convert file to buffer = 63835.35000000596
jsmd5 excl fileToArrayBuffer = 6920.899999976158
jsmd5 incl fileToArrayBuffer = 13290.700000017881
```


Conclusions:
For smaller files, md5 hashing takes up most of the time, but for larger files, converting the file to an array buffer takes more than than hashing

```
-----------
tech-talks-111378_sd.mp4 Size: 13.268776MB
Convert file to buffer = 62.38999999761582
jsmd5 excl fileToArrayBuffer = 263.83000000715253
jsmd5 incl fileToArrayBuffer = 309.65000000596046
-----------
mp4_sample_960x400_ocean_with_audio.mp4 Size: 17.520898MB
Convert file to buffer = 66.20999999344349
jsmd5 excl fileToArrayBuffer = 343.1900000065565
jsmd5 incl fileToArrayBuffer = 381.0000000089407
-----------
corgi.mov Size: 36.035217MB
Convert file to buffer = 149.70000000298023
jsmd5 excl fileToArrayBuffer = 706.5299999922514
jsmd5 incl fileToArrayBuffer = 844.3099999934435
-----------
GoogleIO-2014-CastingToTheFutureVideo.mp4 Size: 357.86886MB
Convert file to buffer = 3506.4700000017883
jsmd5 excl fileToArrayBuffer = 7139.670000007749
jsmd5 incl fileToArrayBuffer = 10467.830000001191
-----------
wwdc2021-102_hd.mp4 Size: 735.070961MB
Convert file to buffer = 12108.1
jsmd5 excl fileToArrayBuffer = 14632.479999995232
jsmd5 incl fileToArrayBuffer = 69920.49999999702
```

### Sha 256
The crypto.subtle library blows all the md5 libraries out of the water

```
ForBiggerBlazesVideo.mp4 Size: 2.134337MB
Convert file to buffer = 21.01000000834465
jsmd5 excl fileToArrayBuffer = 48.87999999523163
sha256 = 5.959999990463257
-----------
corgi.mov Size: 36.035217MB
Convert file to buffer = 207.79000000059605
jsmd5 excl fileToArrayBuffer = 704.7499999940395
sha256 = 87.34000000357628
-----------
GoogleIO-2014-CastingToTheFutureVideo.mp4 Size: 357.86886MB
Convert file to buffer = 7179.720000001788
jsmd5 excl fileToArrayBuffer = 7217.379999992251
sha256 = 1518.119999998808
-----------
Google_I_O_2013_KeynoteVideo.mp4 Size: 1666.114741MB
Convert file to buffer = 3736.75
jsmd5 excl fileToArrayBuffer = 55514.45000000298
sha256 = 9051.500000014901
```