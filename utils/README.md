# pac.js

Simple script which can extract access log records for particular bot. For your convenience I recommend to copy
this to the folder where your access logs dwell.

### Usage

`$ node pac <file-name> [switches]`

`file-name` - the full path to the access log file (thus this is convenient to copy pac.js to the log file folder)

Possible command line switches:

`-g` filters for Googlebot Desktop  
`-gm` filters for Googlebot Mobile  
`-gi` filters for Googlebot Image  
`-gv` filters for Googlebot Video  
`-s` filters for SeznamBot  
`-b` filters for bingbot  
`-h` or `--help` prints this help  
`--short` prints short version 

### License
Copyright (c) 2015 Petr -pehu- Humplík.  
Published under MIT license. 
