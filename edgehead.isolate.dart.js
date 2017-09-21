(function(){var supportsDirectProtoAccess=function(){var z=function(){}
z.prototype={p:{}}
var y=new z()
if(!(y.__proto__&&y.__proto__.p===z.prototype.p))return false
try{if(typeof navigator!="undefined"&&typeof navigator.userAgent=="string"&&navigator.userAgent.indexOf("Chrome/")>=0)return true
if(typeof version=="function"&&version.length==0){var x=version()
if(/^\d+\.\d+\.\d+\.\d+$/.test(x))return true}}catch(w){}return false}()
function map(a){a=Object.create(null)
a.x=0
delete a.x
return a}var A=map()
var B=map()
var C=map()
var D=map()
var E=map()
var F=map()
var G=map()
var H=map()
var J=map()
var K=map()
var L=map()
var M=map()
var N=map()
var O=map()
var P=map()
var Q=map()
var R=map()
var S=map()
var T=map()
var U=map()
var V=map()
var W=map()
var X=map()
var Y=map()
var Z=map()
function I(){}init()
function setupProgram(a,b){"use strict"
function generateAccessor(a9,b0,b1){var g=a9.split("-")
var f=g[0]
var e=f.length
var d=f.charCodeAt(e-1)
var c
if(g.length>1)c=true
else c=false
d=d>=60&&d<=64?d-59:d>=123&&d<=126?d-117:d>=37&&d<=43?d-27:0
if(d){var a0=d&3
var a1=d>>2
var a2=f=f.substring(0,e-1)
var a3=f.indexOf(":")
if(a3>0){a2=f.substring(0,a3)
f=f.substring(a3+1)}if(a0){var a4=a0&2?"r":""
var a5=a0&1?"this":"r"
var a6="return "+a5+"."+f
var a7=b1+".prototype.g"+a2+"="
var a8="function("+a4+"){"+a6+"}"
if(c)b0.push(a7+"$reflectable("+a8+");\n")
else b0.push(a7+a8+";\n")}if(a1){var a4=a1&2?"r,v":"v"
var a5=a1&1?"this":"r"
var a6=a5+"."+f+"=v"
var a7=b1+".prototype.s"+a2+"="
var a8="function("+a4+"){"+a6+"}"
if(c)b0.push(a7+"$reflectable("+a8+");\n")
else b0.push(a7+a8+";\n")}}return f}function defineClass(a2,a3){var g=[]
var f="function "+a2+"("
var e=""
var d=""
for(var c=0;c<a3.length;c++){if(c!=0)f+=", "
var a0=generateAccessor(a3[c],g,a2)
d+="'"+a0+"',"
var a1="p_"+a0
f+=a1
e+="this."+a0+" = "+a1+";\n"}if(supportsDirectProtoAccess)e+="this."+"$deferredAction"+"();"
f+=") {\n"+e+"}\n"
f+=a2+".builtin$cls=\""+a2+"\";\n"
f+="$desc=$collectedClasses."+a2+"[1];\n"
f+=a2+".prototype = $desc;\n"
if(typeof defineClass.name!="string")f+=a2+".name=\""+a2+"\";\n"
f+=a2+"."+"$__fields__"+"=["+d+"];\n"
f+=g.join("")
return f}init.createNewIsolate=function(){return new I()}
init.classIdExtractor=function(c){return c.constructor.name}
init.classFieldsExtractor=function(c){var g=c.constructor.$__fields__
if(!g)return[]
var f=[]
f.length=g.length
for(var e=0;e<g.length;e++)f[e]=c[g[e]]
return f}
init.instanceFromClassId=function(c){return new init.allClasses[c]()}
init.initializeEmptyInstance=function(c,d,e){init.allClasses[c].apply(d,e)
return d}
var z=supportsDirectProtoAccess?function(c,d){var g=c.prototype
g.__proto__=d.prototype
g.constructor=c
g["$is"+c.name]=c
return convertToFastObject(g)}:function(){function tmp(){}return function(a0,a1){tmp.prototype=a1.prototype
var g=new tmp()
convertToSlowObject(g)
var f=a0.prototype
var e=Object.keys(f)
for(var d=0;d<e.length;d++){var c=e[d]
g[c]=f[c]}g["$is"+a0.name]=a0
g.constructor=a0
a0.prototype=g
return g}}()
function finishClasses(a4){var g=init.allClasses
a4.combinedConstructorFunction+="return [\n"+a4.constructorsList.join(",\n  ")+"\n]"
var f=new Function("$collectedClasses",a4.combinedConstructorFunction)(a4.collected)
a4.combinedConstructorFunction=null
for(var e=0;e<f.length;e++){var d=f[e]
var c=d.name
var a0=a4.collected[c]
var a1=a0[0]
a0=a0[1]
g[c]=d
a1[c]=d}f=null
var a2=init.finishedClasses
function finishClass(b7){if(a2[b7])return
a2[b7]=true
var a5=a4.pending[b7]
if(a5&&a5.indexOf("+")>0){var a6=a5.split("+")
a5=a6[0]
var a7=a6[1]
finishClass(a7)
var a8=g[a7]
var a9=a8.prototype
var b0=g[b7].prototype
var b1=Object.keys(a9)
for(var b2=0;b2<b1.length;b2++){var b3=b1[b2]
if(!u.call(b0,b3))b0[b3]=a9[b3]}}if(!a5||typeof a5!="string"){var b4=g[b7]
var b5=b4.prototype
b5.constructor=b4
b5.$isd=b4
b5.$deferredAction=function(){}
return}finishClass(a5)
var b6=g[a5]
if(!b6)b6=existingIsolateProperties[a5]
var b4=g[b7]
var b5=z(b4,b6)
if(a9)b5.$deferredAction=mixinDeferredActionHelper(a9,b5)
if(b5.$isaY)b5.$deferredAction()}var a3=Object.keys(a4.pending)
for(var e=0;e<a3.length;e++)finishClass(a3[e])}function finishAddStubsHelper(){var g=this
while(!g.hasOwnProperty("$deferredAction"))g=g.__proto__
delete g.$deferredAction
var f=Object.keys(g)
for(var e=0;e<f.length;e++){var d=f[e]
var c=d.charCodeAt(0)
var a0
if(d!=="^"&&d!=="$reflectable"&&c!==43&&c!==42&&(a0=g[d])!=null&&a0.constructor===Array&&d!=="<>")addStubs(g,a0,d,false,[])}convertToFastObject(g)
g=g.__proto__
g.$deferredAction()}function mixinDeferredActionHelper(c,d){var g
if(d.hasOwnProperty("$deferredAction"))g=d.$deferredAction
return function foo(){if(!supportsDirectProtoAccess)return
var f=this
while(!f.hasOwnProperty("$deferredAction"))f=f.__proto__
if(g)f.$deferredAction=g
else{delete f.$deferredAction
convertToFastObject(f)}c.$deferredAction()
f.$deferredAction()}}function processClassData(b1,b2,b3){b2=convertToSlowObject(b2)
var g
var f=Object.keys(b2)
var e=false
var d=supportsDirectProtoAccess&&b1!="d"
for(var c=0;c<f.length;c++){var a0=f[c]
var a1=a0.charCodeAt(0)
if(a0==="v"){processStatics(init.statics[b1]=b2.v,b3)
delete b2.v}else if(a1===43){w[g]=a0.substring(1)
var a2=b2[a0]
if(a2>0)b2[g].$reflectable=a2}else if(a1===42){b2[g].$D=b2[a0]
var a3=b2.$methodsWithOptionalArguments
if(!a3)b2.$methodsWithOptionalArguments=a3={}
a3[a0]=g}else{var a4=b2[a0]
if(a0!=="^"&&a4!=null&&a4.constructor===Array&&a0!=="<>")if(d)e=true
else addStubs(b2,a4,a0,false,[])
else g=a0}}if(e)b2.$deferredAction=finishAddStubsHelper
var a5=b2["^"],a6,a7,a8=a5
var a9=a8.split(";")
a8=a9[1]?a9[1].split(","):[]
a7=a9[0]
a6=a7.split(":")
if(a6.length==2){a7=a6[0]
var b0=a6[1]
if(b0)b2.$S=function(b4){return function(){return init.types[b4]}}(b0)}if(a7)b3.pending[b1]=a7
b3.combinedConstructorFunction+=defineClass(b1,a8)
b3.constructorsList.push(b1)
b3.collected[b1]=[m,b2]
i.push(b1)}function processStatics(a3,a4){var g=Object.keys(a3)
for(var f=0;f<g.length;f++){var e=g[f]
if(e==="^")continue
var d=a3[e]
var c=e.charCodeAt(0)
var a0
if(c===43){v[a0]=e.substring(1)
var a1=a3[e]
if(a1>0)a3[a0].$reflectable=a1
if(d&&d.length)init.typeInformation[a0]=d}else if(c===42){m[a0].$D=d
var a2=a3.$methodsWithOptionalArguments
if(!a2)a3.$methodsWithOptionalArguments=a2={}
a2[e]=a0}else if(typeof d==="function"){m[a0=e]=d
h.push(e)
init.globalFunctions[e]=d}else if(d.constructor===Array)addStubs(m,d,e,true,h)
else{a0=e
processClassData(e,d,a4)}}}function addStubs(b2,b3,b4,b5,b6){var g=0,f=b3[g],e
if(typeof f=="string")e=b3[++g]
else{e=f
f=b4}var d=[b2[b4]=b2[f]=e]
e.$stubName=b4
b6.push(b4)
for(g++;g<b3.length;g++){e=b3[g]
if(typeof e!="function")break
if(!b5)e.$stubName=b3[++g]
d.push(e)
if(e.$stubName){b2[e.$stubName]=e
b6.push(e.$stubName)}}for(var c=0;c<d.length;g++,c++)d[c].$callName=b3[g]
var a0=b3[g]
b3=b3.slice(++g)
var a1=b3[0]
var a2=a1>>1
var a3=(a1&1)===1
var a4=a1===3
var a5=a1===1
var a6=b3[1]
var a7=a6>>1
var a8=(a6&1)===1
var a9=a2+a7!=d[0].length
var b0=b3[2]
if(typeof b0=="number")b3[2]=b0+b
var b1=2*a7+a2+3
if(a0){e=tearOff(d,b3,b5,b4,a9)
b2[b4].$getter=e
e.$getterStub=true
if(b5){init.globalFunctions[b4]=e
b6.push(a0)}b2[a0]=e
d.push(e)
e.$stubName=a0
e.$callName=null}}function tearOffGetter(c,d,e,f){return f?new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"(x) {"+"if (c === null) c = "+"H.ey"+"("+"this, funcs, reflectionInfo, false, [x], name);"+"return new c(this, funcs[0], x, name);"+"}")(c,d,e,H,null):new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"() {"+"if (c === null) c = "+"H.ey"+"("+"this, funcs, reflectionInfo, false, [], name);"+"return new c(this, funcs[0], null, name);"+"}")(c,d,e,H,null)}function tearOff(c,d,e,f,a0){var g
return e?function(){if(g===void 0)g=H.ey(this,c,d,true,[],f).prototype
return g}:tearOffGetter(c,d,f,a0)}var y=0
if(!init.libraries)init.libraries=[]
if(!init.mangledNames)init.mangledNames=map()
if(!init.mangledGlobalNames)init.mangledGlobalNames=map()
if(!init.statics)init.statics=map()
if(!init.typeInformation)init.typeInformation=map()
if(!init.globalFunctions)init.globalFunctions=map()
var x=init.libraries
var w=init.mangledNames
var v=init.mangledGlobalNames
var u=Object.prototype.hasOwnProperty
var t=a.length
var s=map()
s.collected=map()
s.pending=map()
s.constructorsList=[]
s.combinedConstructorFunction="function $reflectable(fn){fn.$reflectable=1;return fn};\n"+"var $desc;\n"
for(var r=0;r<t;r++){var q=a[r]
var p=q[0]
var o=q[1]
var n=q[2]
var m=q[3]
var l=q[4]
var k=!!q[5]
var j=l&&l["^"]
if(j instanceof Array)j=j[0]
var i=[]
var h=[]
processStatics(l,s)
x.push([p,o,i,h,n,j,k,m])}finishClasses(s)}I.bg=function(){}
var dart=[["","",,H,{"^":"",xf:{"^":"d;a"}}],["","",,J,{"^":"",
o:function(a){return void 0},
aY:{"^":"d;",
A:function(a,b){return a===b},
gD:function(a){return H.aE(a)},
k:function(a){return H.d_(a)},
gbz:function(a){return new H.av(H.ip(a),null)}},
fh:{"^":"aY;",
k:function(a){return String(a)},
gD:function(a){return a?519018:218159},
gbz:function(a){return C.ac},
$isX:1},
fk:{"^":"aY;",
A:function(a,b){return null==b},
k:function(a){return"null"},
gD:function(a){return 0},
gbz:function(a){return C.aa},
$isat:1},
fn:{"^":"aY;",
gD:function(a){return 0},
gbz:function(a){return C.a9},
k:function(a){return String(a)},
$isfl:1},
xm:{"^":"fn;"},
bs:{"^":"fn;"},
cg:{"^":"aY;$ti",
fY:function(a,b){if(!!a.immutable$list)throw H.c(new P.S(b))},
cR:function(a,b){if(!!a.fixed$length)throw H.c(new P.S(b))},
t:function(a,b){this.cR(a,"add")
a.push(b)},
ht:function(a){this.cR(a,"removeLast")
if(a.length===0)throw H.c(H.aK(a,-1))
return a.pop()},
a3:function(a,b){var z
this.cR(a,"remove")
for(z=0;z<a.length;++z)if(J.e(a[z],b)){a.splice(z,1)
return!0}return!1},
j3:function(a,b,c){var z,y,x,w,v
z=[]
y=a.length
for(x=0;x<y;++x){w=a[x]
if(b.$1(w)!==!0===c)z.push(w)
if(a.length!==y)throw H.c(new P.D(a))}v=z.length
if(v===y)return
this.sl(a,v)
for(x=0;x<z.length;++x)a[x]=z[x]},
c9:function(a,b){return new H.K(a,b,[H.m(a,0)])},
ax:function(a,b){var z
this.cR(a,"addAll")
for(z=J.aj(b);z.u();)a.push(z.d)},
Z:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){b.$1(a[y])
if(a.length!==z)throw H.c(new P.D(a))}},
aJ:function(a,b){return new H.aq(a,b,[H.m(a,0),null])},
e1:function(a,b){return H.he(a,b,null,H.m(a,0))},
bw:function(a,b,c){var z,y,x
z=a.length
for(y=b,x=0;x<z;++x){y=c.$2(y,a[x])
if(a.length!==z)throw H.c(new P.D(a))}return y},
aU:function(a,b,c){var z,y,x
z=a.length
for(y=0;y<z;++y){x=a[y]
if(b.$1(x)===!0)return x
if(a.length!==z)throw H.c(new P.D(a))}throw H.c(H.ah())},
cl:function(a,b){return this.aU(a,b,null)},
au:function(a,b){if(b>>>0!==b||b>=a.length)return H.f(a,b)
return a[b]},
gcV:function(a){if(a.length>0)return a[0]
throw H.c(H.ah())},
gw:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.c(H.ah())},
gcd:function(a){var z=a.length
if(z===1){if(0>=z)return H.f(a,0)
return a[0]}if(z===0)throw H.c(H.ah())
throw H.c(H.dE())},
b7:function(a,b,c,d,e){var z,y,x
this.fY(a,"setRange")
P.cm(b,c,a.length,null,null,null)
z=c-b
if(z===0)return
if(e<0)H.i(P.a8(e,0,null,"skipCount",null))
if(e+z>d.length)throw H.c(H.fg())
if(e<b)for(y=z-1;y>=0;--y){x=e+y
if(x>>>0!==x||x>=d.length)return H.f(d,x)
a[b+y]=d[x]}else for(y=0;y<z;++y){x=e+y
if(x>>>0!==x||x>=d.length)return H.f(d,x)
a[b+y]=d[x]}},
bt:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){if(b.$1(a[y])===!0)return!0
if(a.length!==z)throw H.c(new P.D(a))}return!1},
ce:function(a,b){var z
this.fY(a,"sort")
z=b==null?P.tS():b
H.cq(a,0,a.length-1,z)},
fc:function(a){return this.ce(a,null)},
bQ:function(a,b,c){var z
if(c>=a.length)return-1
for(z=c;z<a.length;++z)if(J.e(a[z],b))return z
return-1},
b3:function(a,b){return this.bQ(a,b,0)},
a7:function(a,b){var z
for(z=0;z<a.length;++z)if(J.e(a[z],b))return!0
return!1},
gY:function(a){return a.length===0},
gav:function(a){return a.length!==0},
k:function(a){return P.cf(a,"[","]")},
bG:function(a){return P.b9(a,H.m(a,0))},
ga_:function(a){return new J.bj(a,a.length,0,null,[H.m(a,0)])},
gD:function(a){return H.aE(a)},
gl:function(a){return a.length},
sl:function(a,b){this.cR(a,"set length")
if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(P.cH(b,"newLength",null))
if(b<0)throw H.c(P.a8(b,0,null,"newLength",null))
a.length=b},
j:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(H.aK(a,b))
if(b>=a.length||b<0)throw H.c(H.aK(a,b))
return a[b]},
p:function(a,b,c){if(!!a.immutable$list)H.i(new P.S("indexed set"))
if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(H.aK(a,b))
if(b>=a.length||b<0)throw H.c(H.aK(a,b))
a[b]=c},
$iscW:1,
$ascW:I.bg,
$isN:1,
$isa_:1},
xe:{"^":"cg;$ti"},
bj:{"^":"d;a,b,c,d,$ti",
gU:function(){return this.d},
u:function(){var z,y,x
z=this.a
y=z.length
if(this.b!==y)throw H.c(H.as(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z[x]
this.c=x+1
return!0}},
ch:{"^":"aY;",
bD:function(a,b){var z
if(typeof b!=="number")throw H.c(H.T(b))
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){z=this.gdI(b)
if(this.gdI(a)===z)return 0
if(this.gdI(a))return-1
return 1}return 0}else if(isNaN(a)){if(isNaN(b))return 0
return 1}else return-1},
gdI:function(a){return a===0?1/a<0:a<0},
hx:function(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw H.c(new P.S(""+a+".round()"))},
l2:function(a){return a},
bj:function(a,b){var z
if(b>20)throw H.c(P.a8(b,0,20,"fractionDigits",null))
z=a.toFixed(b)
if(a===0&&this.gdI(a))return"-"+z
return z},
l5:function(a,b){var z,y,x,w
if(b<2||b>36)throw H.c(P.a8(b,2,36,"radix",null))
z=a.toString(b)
if(C.b.cS(z,z.length-1)!==41)return z
y=/^([\da-z]+)(?:\.([\da-z]+))?\(e\+(\d+)\)$/.exec(z)
if(y==null)H.i(new P.S("Unexpected toString result: "+z))
x=J.L(y)
z=x.j(y,1)
w=+x.j(y,3)
if(x.j(y,2)!=null){z+=x.j(y,2)
w-=x.j(y,2).length}return z+C.b.cb("0",w)},
k:function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gD:function(a){return a&0x1FFFFFFF},
f8:function(a){return-a},
aj:function(a,b){if(typeof b!=="number")throw H.c(H.T(b))
return a+b},
at:function(a,b){if(typeof b!=="number")throw H.c(H.T(b))
return a-b},
dd:function(a,b){if(typeof b!=="number")throw H.c(H.T(b))
return a/b},
cb:function(a,b){if(typeof b!=="number")throw H.c(H.T(b))
return a*b},
bM:function(a,b){return(a|0)===a?a/b|0:this.jc(a,b)},
jc:function(a,b){var z=a/b
if(z>=-2147483648&&z<=2147483647)return z|0
if(z>0){if(z!==1/0)return Math.floor(z)}else if(z>-1/0)return Math.ceil(z)
throw H.c(new P.S("Result of truncating division is "+H.b(z)+": "+H.b(a)+" ~/ "+b))},
dA:function(a,b){var z
if(a>0)z=b>31?0:a>>>b
else{z=b>31?31:b
z=a>>z>>>0}return z},
b0:function(a,b){if(typeof b!=="number")throw H.c(H.T(b))
return a<b},
bk:function(a,b){if(typeof b!=="number")throw H.c(H.T(b))
return a>b},
df:function(a,b){if(typeof b!=="number")throw H.c(H.T(b))
return a<=b},
bT:function(a,b){if(typeof b!=="number")throw H.c(H.T(b))
return a>=b},
gbz:function(a){return C.af},
$isM:1},
fj:{"^":"ch;",
gbz:function(a){return C.ae},
$isaW:1,
$isM:1,
$ist:1},
fi:{"^":"ch;",
gbz:function(a){return C.ad},
$isaW:1,
$isM:1},
ci:{"^":"aY;",
cS:function(a,b){if(b<0)throw H.c(H.aK(a,b))
if(b>=a.length)H.i(H.aK(a,b))
return a.charCodeAt(b)},
cD:function(a,b){if(b>=a.length)throw H.c(H.aK(a,b))
return a.charCodeAt(b)},
dC:function(a,b,c){if(c>b.length)throw H.c(P.a8(c,0,b.length,null,null))
return new H.rf(b,a,c)},
eD:function(a,b){return this.dC(a,b,0)},
hh:function(a,b,c){var z,y
if(c<0||c>b.length)throw H.c(P.a8(c,0,b.length,null,null))
z=a.length
if(c+z>b.length)return
for(y=0;y<z;++y)if(this.cS(b,c+y)!==this.cD(a,y))return
return new H.hd(c,b,a)},
aj:function(a,b){if(typeof b!=="string")throw H.c(P.cH(b,null,null))
return a+b},
eJ:function(a,b){var z,y
z=b.length
y=a.length
if(z>y)return!1
return b===this.bK(a,y-z)},
kQ:function(a,b,c){H.by(c)
return H.n(a,b,c)},
kR:function(a,b,c,d){H.by(c)
P.ny(d,0,a.length,"startIndex",null)
return H.iH(a,b,c,d)},
d5:function(a,b,c){return this.kR(a,b,c,0)},
i4:function(a,b,c){var z
if(c>a.length)throw H.c(P.a8(c,0,a.length,null,null))
if(typeof b==="string"){z=c+b.length
if(z>a.length)return!1
return b===a.substring(c,z)}return J.iY(b,a,c)!=null},
dl:function(a,b){return this.i4(a,b,0)},
aM:function(a,b,c){if(c==null)c=a.length
if(typeof c!=="number"||Math.floor(c)!==c)H.i(H.T(c))
if(b<0)throw H.c(P.cl(b,null,null))
if(typeof c!=="number")return H.x(c)
if(b>c)throw H.c(P.cl(b,null,null))
if(c>a.length)throw H.c(P.cl(c,null,null))
return a.substring(b,c)},
bK:function(a,b){return this.aM(a,b,null)},
f2:function(a){var z,y,x,w,v
z=a.trim()
y=z.length
if(y===0)return z
if(this.cD(z,0)===133){x=J.dF(z,1)
if(x===y)return""}else x=0
w=y-1
v=this.cS(z,w)===133?J.m5(z,w):y
if(x===0&&v===y)return z
return z.substring(x,v)},
l6:function(a){var z,y
if(typeof a.trimLeft!="undefined"){z=a.trimLeft()
if(z.length===0)return z
y=this.cD(z,0)===133?J.dF(z,1):0}else{y=J.dF(a,0)
z=a}if(y===0)return z
if(y===z.length)return""
return z.substring(y)},
cb:function(a,b){var z,y
if(0>=b)return""
if(b===1||a.length===0)return a
if(b!==b>>>0)throw H.c(C.L)
for(z=a,y="";!0;){if((b&1)===1)y=z+y
b=b>>>1
if(b===0)break
z+=z}return y},
bQ:function(a,b,c){var z
if(c>a.length)throw H.c(P.a8(c,0,a.length,null,null))
z=a.indexOf(b,c)
return z},
b3:function(a,b){return this.bQ(a,b,0)},
kw:function(a,b,c){var z
c=a.length
z=b.length
if(c+z>c)c-=z
return a.lastIndexOf(b,c)},
kv:function(a,b){return this.kw(a,b,null)},
jB:function(a,b,c){if(b==null)H.i(H.T(b))
if(c>a.length)throw H.c(P.a8(c,0,a.length,null,null))
return H.wH(a,b,c)},
a7:function(a,b){return this.jB(a,b,0)},
gY:function(a){return a.length===0},
gav:function(a){return a.length!==0},
bD:function(a,b){var z
if(typeof b!=="string")throw H.c(H.T(b))
if(a===b)z=0
else z=a<b?-1:1
return z},
k:function(a){return a},
gD:function(a){var z,y,x
for(z=a.length,y=0,x=0;x<z;++x){y=536870911&y+a.charCodeAt(x)
y=536870911&y+((524287&y)<<10)
y^=y>>6}y=536870911&y+((67108863&y)<<3)
y^=y>>11
return 536870911&y+((16383&y)<<15)},
gbz:function(a){return C.ab},
gl:function(a){return a.length},
j:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(H.aK(a,b))
if(b>=a.length||b<0)throw H.c(H.aK(a,b))
return a[b]},
$iscW:1,
$ascW:I.bg,
$isq:1,
$isdZ:1,
v:{
fm:function(a){if(a<256)switch(a){case 9:case 10:case 11:case 12:case 13:case 32:case 133:case 160:return!0
default:return!1}switch(a){case 5760:case 8192:case 8193:case 8194:case 8195:case 8196:case 8197:case 8198:case 8199:case 8200:case 8201:case 8202:case 8232:case 8233:case 8239:case 8287:case 12288:case 65279:return!0
default:return!1}},
dF:function(a,b){var z,y
for(z=a.length;b<z;){y=C.b.cD(a,b)
if(y!==32&&y!==13&&!J.fm(y))break;++b}return b},
m5:function(a,b){var z,y
for(;b>0;b=z){z=b-1
y=C.b.cS(a,z)
if(y!==32&&y!==13&&!J.fm(y))break}return b}}}}],["","",,H,{"^":"",
hR:function(a){return a},
ah:function(){return new P.w("No element")},
dE:function(){return new P.w("Too many elements")},
fg:function(){return new P.w("Too few elements")},
cq:function(a,b,c,d){if(c-b<=32)H.h7(a,b,c,d)
else H.h6(a,b,c,d)},
h7:function(a,b,c,d){var z,y,x,w,v
for(z=b+1,y=J.L(a);z<=c;++z){x=y.j(a,z)
w=z
while(!0){if(!(w>b&&J.ab(d.$2(y.j(a,w-1),x),0)))break
v=w-1
y.p(a,w,y.j(a,v))
w=v}y.p(a,w,x)}},
h6:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
z=C.e.bM(c-b+1,6)
y=b+z
x=c-z
w=C.e.bM(b+c,2)
v=w-z
u=w+z
t=J.L(a)
s=t.j(a,y)
r=t.j(a,v)
q=t.j(a,w)
p=t.j(a,u)
o=t.j(a,x)
if(J.ab(d.$2(s,r),0)){n=r
r=s
s=n}if(J.ab(d.$2(p,o),0)){n=o
o=p
p=n}if(J.ab(d.$2(s,q),0)){n=q
q=s
s=n}if(J.ab(d.$2(r,q),0)){n=q
q=r
r=n}if(J.ab(d.$2(s,p),0)){n=p
p=s
s=n}if(J.ab(d.$2(q,p),0)){n=p
p=q
q=n}if(J.ab(d.$2(r,o),0)){n=o
o=r
r=n}if(J.ab(d.$2(r,q),0)){n=q
q=r
r=n}if(J.ab(d.$2(p,o),0)){n=o
o=p
p=n}t.p(a,y,s)
t.p(a,w,q)
t.p(a,x,o)
t.p(a,v,t.j(a,b))
t.p(a,u,t.j(a,c))
m=b+1
l=c-1
if(J.e(d.$2(r,p),0)){for(k=m;k<=l;++k){j=t.j(a,k)
i=d.$2(j,r)
h=J.o(i)
if(h.A(i,0))continue
if(h.b0(i,0)){if(k!==m){t.p(a,k,t.j(a,m))
t.p(a,m,j)}++m}else for(;!0;){i=d.$2(t.j(a,l),r)
h=J.am(i)
if(h.bk(i,0)){--l
continue}else{g=l-1
if(h.b0(i,0)){t.p(a,k,t.j(a,m))
f=m+1
t.p(a,m,t.j(a,l))
t.p(a,l,j)
l=g
m=f
break}else{t.p(a,k,t.j(a,l))
t.p(a,l,j)
l=g
break}}}}e=!0}else{for(k=m;k<=l;++k){j=t.j(a,k)
if(J.c0(d.$2(j,r),0)){if(k!==m){t.p(a,k,t.j(a,m))
t.p(a,m,j)}++m}else if(J.ab(d.$2(j,p),0))for(;!0;)if(J.ab(d.$2(t.j(a,l),p),0)){--l
if(l<k)break
continue}else{g=l-1
if(J.c0(d.$2(t.j(a,l),r),0)){t.p(a,k,t.j(a,m))
f=m+1
t.p(a,m,t.j(a,l))
t.p(a,l,j)
m=f}else{t.p(a,k,t.j(a,l))
t.p(a,l,j)}l=g
break}}e=!1}h=m-1
t.p(a,b,t.j(a,h))
t.p(a,h,r)
h=l+1
t.p(a,c,t.j(a,h))
t.p(a,h,p)
H.cq(a,b,m-2,d)
H.cq(a,l+2,c,d)
if(e)return
if(m<y&&l>x){for(;J.e(d.$2(t.j(a,m),r),0);)++m
for(;J.e(d.$2(t.j(a,l),p),0);)--l
for(k=m;k<=l;++k){j=t.j(a,k)
if(J.e(d.$2(j,r),0)){if(k!==m){t.p(a,k,t.j(a,m))
t.p(a,m,j)}++m}else if(J.e(d.$2(j,p),0))for(;!0;)if(J.e(d.$2(t.j(a,l),p),0)){--l
if(l<k)break
continue}else{g=l-1
if(J.c0(d.$2(t.j(a,l),r),0)){t.p(a,k,t.j(a,m))
f=m+1
t.p(a,m,t.j(a,l))
t.p(a,l,j)
m=f}else{t.p(a,k,t.j(a,l))
t.p(a,l,j)}l=g
break}}H.cq(a,m,l,d)}else H.cq(a,m,l,d)},
a_:{"^":"B;$ti"},
b0:{"^":"a_;$ti",
ga_:function(a){return new H.dO(this,this.gl(this),0,null,[H.y(this,"b0",0)])},
Z:function(a,b){var z,y
z=this.gl(this)
for(y=0;y<z;++y){b.$1(this.au(0,y))
if(z!==this.gl(this))throw H.c(new P.D(this))}},
gY:function(a){return this.gl(this)===0},
gw:function(a){if(this.gl(this)===0)throw H.c(H.ah())
return this.au(0,this.gl(this)-1)},
a7:function(a,b){var z,y
z=this.gl(this)
for(y=0;y<z;++y){if(J.e(this.au(0,y),b))return!0
if(z!==this.gl(this))throw H.c(new P.D(this))}return!1},
bt:function(a,b){var z,y
z=this.gl(this)
for(y=0;y<z;++y){if(b.$1(this.au(0,y))===!0)return!0
if(z!==this.gl(this))throw H.c(new P.D(this))}return!1},
aU:function(a,b,c){var z,y,x
z=this.gl(this)
for(y=0;y<z;++y){x=this.au(0,y)
if(b.$1(x)===!0)return x
if(z!==this.gl(this))throw H.c(new P.D(this))}return c.$0()},
cm:function(a,b){var z,y,x,w
z=this.gl(this)
if(b.length!==0){if(z===0)return""
y=H.b(this.au(0,0))
if(z!==this.gl(this))throw H.c(new P.D(this))
for(x=y,w=1;w<z;++w){x=x+b+H.b(this.au(0,w))
if(z!==this.gl(this))throw H.c(new P.D(this))}return x.charCodeAt(0)==0?x:x}else{for(w=0,x="";w<z;++w){x+=H.b(this.au(0,w))
if(z!==this.gl(this))throw H.c(new P.D(this))}return x.charCodeAt(0)==0?x:x}},
c9:function(a,b){return this.dm(0,b)},
aJ:function(a,b){return new H.aq(this,b,[H.y(this,"b0",0),null])},
bw:function(a,b,c){var z,y,x
z=this.gl(this)
for(y=b,x=0;x<z;++x){y=c.$2(y,this.au(0,x))
if(z!==this.gl(this))throw H.c(new P.D(this))}return y},
bF:function(a,b){var z,y,x,w
z=[H.y(this,"b0",0)]
if(b){y=H.p([],z)
C.a.sl(y,this.gl(this))}else{x=new Array(this.gl(this))
x.fixed$length=Array
y=H.p(x,z)}for(w=0;w<this.gl(this);++w){z=this.au(0,w)
if(w>=y.length)return H.f(y,w)
y[w]=z}return y},
cw:function(a){return this.bF(a,!0)},
bG:function(a){var z,y
z=P.a6(null,null,null,H.y(this,"b0",0))
for(y=0;y<this.gl(this);++y)z.t(0,this.au(0,y))
return z}},
pf:{"^":"b0;a,b,c,$ti",
giF:function(){var z=J.aN(this.a)
return z},
gja:function(){var z,y
z=J.aN(this.a)
y=this.b
if(y>z)return z
return y},
gl:function(a){var z,y
z=J.aN(this.a)
y=this.b
if(y>=z)return 0
return z-y},
au:function(a,b){var z,y
z=this.gja()+b
if(!(b<0)){y=this.giF()
if(typeof y!=="number")return H.x(y)
y=z>=y}else y=!0
if(y)throw H.c(P.cT(b,this,"index",null,null))
return J.eQ(this.a,z)},
bF:function(a,b){var z,y,x,w,v,u,t,s,r
z=this.b
y=this.a
x=J.L(y)
w=x.gl(y)
v=w-z
if(v<0)v=0
u=this.$ti
if(b){t=H.p([],u)
C.a.sl(t,v)}else{s=new Array(v)
s.fixed$length=Array
t=H.p(s,u)}for(r=0;r<v;++r){u=x.au(y,z+r)
if(r>=t.length)return H.f(t,r)
t[r]=u
if(x.gl(y)<w)throw H.c(new P.D(this))}return t},
ih:function(a,b,c,d){var z=this.b
if(z<0)H.i(P.a8(z,0,null,"start",null))},
v:{
he:function(a,b,c,d){var z=new H.pf(a,b,c,[d])
z.ih(a,b,c,d)
return z}}},
dO:{"^":"d;a,b,c,d,$ti",
gU:function(){return this.d},
u:function(){var z,y,x
z=this.a
y=z.gl(z)
if(this.b!==y)throw H.c(new P.D(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z.au(0,x);++this.c
return!0}},
dR:{"^":"B;a,b,$ti",
ga_:function(a){return new H.mA(null,J.aj(this.a),this.b,this.$ti)},
gl:function(a){return J.aN(this.a)},
gY:function(a){return J.eR(this.a)},
gw:function(a){return this.b.$1(J.iV(this.a))},
$asB:function(a,b){return[b]},
v:{
bH:function(a,b,c,d){if(!!J.o(a).$isa_)return new H.bF(a,b,[c,d])
return new H.dR(a,b,[c,d])}}},
bF:{"^":"dR;a,b,$ti",$isa_:1,
$asa_:function(a,b){return[b]}},
mA:{"^":"cV;a,b,c,$ti",
u:function(){var z=this.b
if(z.u()){this.a=this.c.$1(z.gU())
return!0}this.a=null
return!1},
gU:function(){return this.a},
$ascV:function(a,b){return[b]}},
aq:{"^":"b0;a,b,$ti",
gl:function(a){return J.aN(this.a)},
au:function(a,b){return this.b.$1(J.eQ(this.a,b))},
$asb0:function(a,b){return[b]},
$asa_:function(a,b){return[b]},
$asB:function(a,b){return[b]}},
K:{"^":"B;a,b,$ti",
ga_:function(a){return new H.bS(J.aj(this.a),this.b,this.$ti)},
aJ:function(a,b){return new H.dR(this,b,[H.m(this,0),null])}},
bS:{"^":"cV;a,b,$ti",
u:function(){var z,y
for(z=this.a,y=this.b;z.u();)if(y.$1(z.gU())===!0)return!0
return!1},
gU:function(){return this.a.gU()}},
fZ:{"^":"B;a,b,$ti",
ga_:function(a){return new H.or(J.aj(this.a),this.b,this.$ti)},
v:{
oq:function(a,b,c){if(!!J.o(a).$isa_)return new H.l6(a,H.hR(b),[c])
return new H.fZ(a,H.hR(b),[c])}}},
l6:{"^":"fZ;a,b,$ti",
gl:function(a){var z=J.aN(this.a)-this.b
if(z>=0)return z
return 0},
$isa_:1},
or:{"^":"cV;a,b,$ti",
u:function(){var z,y
for(z=this.a,y=0;y<this.b;++y)z.u()
this.b=0
return z.u()},
gU:function(){return this.a.gU()}},
l7:{"^":"d;$ti",
u:function(){return!1},
gU:function(){return}}}],["","",,H,{"^":"",
cw:function(a,b){var z=a.cU(b)
if(!init.globalState.d.cy)init.globalState.f.by()
return z},
iE:function(a,b){var z,y,x,w,v,u
z={}
z.a=b
if(b==null){b=[]
z.a=b
y=b}else y=b
if(!J.o(y).$isN)throw H.c(P.G("Arguments to main must be a List: "+H.b(y)))
init.globalState=new H.r1(0,0,1,null,null,null,null,null,null,null,null,null,a)
y=init.globalState
x=self.window==null
w=self.Worker
v=x&&!!self.postMessage
y.x=v
v=!v
if(v)w=w!=null&&$.$get$fe()!=null
else w=!0
y.y=w
y.r=x&&v
y.f=new H.qB(P.bb(null,H.cu),0)
x=P.t
y.z=new H.R(0,null,null,null,null,null,0,[x,H.em])
y.ch=new H.R(0,null,null,null,null,null,0,[x,null])
if(y.x===!0){w=new H.r0()
y.Q=w
self.onmessage=function(c,d){return function(e){c(d,e)}}(H.lY,w)
self.dartPrint=self.dartPrint||function(c){return function(d){if(self.console&&self.console.log)self.console.log(d)
else self.postMessage(c(d))}}(H.r2)}if(init.globalState.x===!0)return
y=init.globalState.a++
w=P.a6(null,null,null,x)
v=new H.cn(0,null,!1)
u=new H.em(y,new H.R(0,null,null,null,null,null,0,[x,H.cn]),w,init.createNewIsolate(),v,new H.bk(H.dn()),new H.bk(H.dn()),!1,!1,[],P.a6(null,null,null,null),null,null,!1,!0,P.a6(null,null,null,null))
w.t(0,0)
u.e4(0,v)
init.globalState.e=u
init.globalState.d=u
if(H.ay(a,{func:1,args:[,]}))u.cU(new H.vM(z,a))
else if(H.ay(a,{func:1,args:[,,]}))u.cU(new H.vN(z,a))
else u.cU(a)
init.globalState.f.by()},
m1:function(){var z=init.currentScript
if(z!=null)return String(z.src)
if(init.globalState.x===!0)return H.m2()
return},
m2:function(){var z,y
z=new Error().stack
if(z==null){z=function(){try{throw new Error()}catch(x){return x.stack}}()
if(z==null)throw H.c(new P.S("No stack trace"))}y=z.match(new RegExp("^ *at [^(]*\\((.*):[0-9]*:[0-9]*\\)$","m"))
if(y!=null)return y[1]
y=z.match(new RegExp("^[^@]*@(.*):[0-9]*$","m"))
if(y!=null)return y[1]
throw H.c(new P.S('Cannot extract URI from "'+z+'"'))},
lY:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=new H.d9(!0,[]).c_(b.data)
y=J.L(z)
switch(y.j(z,"command")){case"start":init.globalState.b=y.j(z,"id")
x=y.j(z,"functionName")
w=x==null?init.globalState.cx:init.globalFunctions[x]()
v=y.j(z,"args")
u=new H.d9(!0,[]).c_(y.j(z,"msg"))
t=y.j(z,"isSpawnUri")
s=y.j(z,"startPaused")
r=new H.d9(!0,[]).c_(y.j(z,"replyTo"))
y=init.globalState.a++
q=P.t
p=P.a6(null,null,null,q)
o=new H.cn(0,null,!1)
n=new H.em(y,new H.R(0,null,null,null,null,null,0,[q,H.cn]),p,init.createNewIsolate(),o,new H.bk(H.dn()),new H.bk(H.dn()),!1,!1,[],P.a6(null,null,null,null),null,null,!1,!0,P.a6(null,null,null,null))
p.t(0,0)
n.e4(0,o)
init.globalState.f.a.aE(new H.cu(n,new H.lZ(w,v,u,t,s,r),"worker-start"))
init.globalState.d=n
init.globalState.f.by()
break
case"spawn-worker":break
case"message":if(y.j(z,"port")!=null)y.j(z,"port").G(y.j(z,"msg"))
init.globalState.f.by()
break
case"close":init.globalState.ch.a3(0,$.$get$ff().j(0,a))
a.terminate()
init.globalState.f.by()
break
case"log":H.lX(y.j(z,"msg"))
break
case"print":if(init.globalState.x===!0){y=init.globalState.Q
q=P.a0(["command","print","msg",z])
q=new H.bu(!0,P.bV(null,P.t)).bq(q)
y.toString
self.postMessage(q)}else P.eF(y.j(z,"msg"))
break
case"error":throw H.c(y.j(z,"msg"))}},
lX:function(a){var z,y,x,w
if(init.globalState.x===!0){y=init.globalState.Q
x=P.a0(["command","log","msg",a])
x=new H.bu(!0,P.bV(null,P.t)).bq(x)
y.toString
self.postMessage(x)}else try{self.console.log(a)}catch(w){H.C(w)
z=H.E(w)
y=P.cR(z)
throw H.c(y)}},
m_:function(a,b,c,d,e,f){var z,y,x,w
z=init.globalState.d
y=z.a
$.fJ=$.fJ+("_"+y)
$.fK=$.fK+("_"+y)
y=z.e
x=init.globalState.d.a
w=z.f
f.G(["spawned",new H.cv(y,x),w,z.r])
x=new H.m0(a,b,c,d,z)
if(e===!0){z.fU(w,w)
init.globalState.f.a.aE(new H.cu(z,x,"start isolate"))}else x.$0()},
rw:function(a){return new H.d9(!0,[]).c_(new H.bu(!1,P.bV(null,P.t)).bq(a))},
vM:{"^":"a:2;a,b",
$0:function(){this.b.$1(this.a.a)}},
vN:{"^":"a:2;a,b",
$0:function(){this.b.$2(this.a.a,null)}},
r1:{"^":"d;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",v:{
r2:function(a){var z=P.a0(["command","print","msg",a])
return new H.bu(!0,P.bV(null,P.t)).bq(z)}}},
em:{"^":"d;i:a<,b,c,kt:d<,jD:e<,f,r,x,cZ:y<,z,Q,ch,cx,cy,db,dx",
fU:function(a,b){if(!this.f.A(0,a))return
if(this.Q.t(0,b)&&!this.y)this.y=!0
this.cO()},
kP:function(a){var z,y,x
if(!this.y)return
z=this.Q
z.a3(0,a)
if(z.a===0){for(z=this.z;y=z.length,y!==0;){if(0>=y)return H.f(z,-1)
x=z.pop()
init.globalState.f.a.fT(x)}this.y=!1}this.cO()},
jr:function(a,b){var z,y,x
if(this.ch==null)this.ch=[]
for(z=J.o(a),y=0;x=this.ch,y<x.length;y+=2)if(z.A(a,x[y])){z=this.ch
x=y+1
if(x>=z.length)return H.f(z,x)
z[x]=b
return}x.push(a)
this.ch.push(b)},
kN:function(a){var z,y,x
if(this.ch==null)return
for(z=J.o(a),y=0;x=this.ch,y<x.length;y+=2)if(z.A(a,x[y])){z=this.ch
x=y+2
z.toString
if(typeof z!=="object"||z===null||!!z.fixed$length)H.i(new P.S("removeRange"))
P.cm(y,x,z.length,null,null,null)
z.splice(y,x-y)
return}},
hX:function(a,b){if(!this.r.A(0,a))return
this.db=b},
k5:function(a,b,c){var z=J.o(b)
if(!z.A(b,0))z=z.A(b,1)&&!this.cy
else z=!0
if(z){a.G(c)
return}z=this.cx
if(z==null){z=P.bb(null,null)
this.cx=z}z.aE(new H.qS(a,c))},
k0:function(a,b){var z
if(!this.r.A(0,a))return
z=J.o(b)
if(!z.A(b,0))z=z.A(b,1)&&!this.cy
else z=!0
if(z){this.eQ()
return}z=this.cx
if(z==null){z=P.bb(null,null)
this.cx=z}z.aE(this.gku())},
k6:function(a,b){var z,y,x
z=this.dx
if(z.a===0){if(this.db===!0&&this===init.globalState.e)return
if(self.console&&self.console.error)self.console.error(a,b)
else{P.eF(a)
if(b!=null)P.eF(b)}return}y=new Array(2)
y.fixed$length=Array
y[0]=J.h(a)
y[1]=b==null?null:J.h(b)
for(x=new P.af(z,z.r,null,null,[null]),x.c=z.e;x.u();)x.d.G(y)},
cU:function(a){var z,y,x,w,v,u,t
z=init.globalState.d
init.globalState.d=this
$=this.d
y=null
x=this.cy
this.cy=!0
try{y=a.$0()}catch(u){w=H.C(u)
v=H.E(u)
this.k6(w,v)
if(this.db===!0){this.eQ()
if(this===init.globalState.e)throw u}}finally{this.cy=x
init.globalState.d=z
if(z!=null)$=z.gkt()
if(this.cx!=null)for(;t=this.cx,!t.gY(t);)this.cx.dM().$0()}return y},
cp:function(a){return this.b.j(0,a)},
e4:function(a,b){var z=this.b
if(z.ad(a))throw H.c(P.cR("Registry: ports must be registered only once."))
z.p(0,a,b)},
cO:function(){var z=this.b
if(z.gl(z)-this.c.a>0||this.y||!this.x)init.globalState.z.p(0,this.a,this)
else this.eQ()},
eQ:[function(){var z,y,x,w,v
z=this.cx
if(z!=null)z.bh(0)
for(z=this.b,y=z.gcz(),y=y.ga_(y);y.u();)y.gU().iy()
z.bh(0)
this.c.bh(0)
init.globalState.z.a3(0,this.a)
this.dx.bh(0)
if(this.ch!=null){for(x=0;z=this.ch,y=z.length,x<y;x+=2){w=z[x]
v=x+1
if(v>=y)return H.f(z,v)
w.G(z[v])}this.ch=null}},"$0","gku",0,0,7]},
qS:{"^":"a:7;a,b",
$0:function(){this.a.G(this.b)}},
qB:{"^":"d;a,b",
jI:function(){var z=this.a
if(z.b===z.c)return
return z.dM()},
hA:function(){var z,y,x
z=this.jI()
if(z==null){if(init.globalState.e!=null)if(init.globalState.z.ad(init.globalState.e.a))if(init.globalState.r===!0){y=init.globalState.e.b
y=y.gY(y)}else y=!1
else y=!1
else y=!1
if(y)H.i(P.cR("Program exited with open ReceivePorts."))
y=init.globalState
if(y.x===!0){x=y.z
x=x.gY(x)&&y.f.b===0}else x=!1
if(x){y=y.Q
x=P.a0(["command","close"])
x=new H.bu(!0,new P.hM(0,null,null,null,null,null,0,[null,P.t])).bq(x)
y.toString
self.postMessage(x)}return!1}z.kL()
return!0},
fN:function(){if(self.window!=null)new H.qC(this).$0()
else for(;this.hA(););},
by:function(){var z,y,x,w,v
if(init.globalState.x!==!0)this.fN()
else try{this.fN()}catch(x){z=H.C(x)
y=H.E(x)
w=init.globalState.Q
v=P.a0(["command","error","msg",H.b(z)+"\n"+H.b(y)])
v=new H.bu(!0,P.bV(null,P.t)).bq(v)
w.toString
self.postMessage(v)}}},
qC:{"^":"a:7;a",
$0:function(){if(!this.a.hA())return
P.pC(C.x,this)}},
cu:{"^":"d;a,b,c",
kL:function(){var z=this.a
if(z.y){z.z.push(this)
return}z.cU(this.b)}},
r0:{"^":"d;"},
lZ:{"^":"a:2;a,b,c,d,e,f",
$0:function(){H.m_(this.a,this.b,this.c,this.d,this.e,this.f)}},
m0:{"^":"a:7;a,b,c,d,e",
$0:function(){var z,y
z=this.e
z.x=!0
if(this.d!==!0)this.a.$1(this.c)
else{y=this.a
if(H.ay(y,{func:1,args:[,,]}))y.$2(this.b,this.c)
else if(H.ay(y,{func:1,args:[,]}))y.$1(this.b)
else y.$0()}z.cO()}},
hG:{"^":"d;"},
cv:{"^":"hG;b,a",
G:function(a){var z,y,x
z=init.globalState.z.j(0,this.a)
if(z==null)return
y=this.b
if(y.gfC())return
x=H.rw(a)
if(z.gjD()===y){y=J.L(x)
switch(y.j(x,0)){case"pause":z.fU(y.j(x,1),y.j(x,2))
break
case"resume":z.kP(y.j(x,1))
break
case"add-ondone":z.jr(y.j(x,1),y.j(x,2))
break
case"remove-ondone":z.kN(y.j(x,1))
break
case"set-errors-fatal":z.hX(y.j(x,1),y.j(x,2))
break
case"ping":z.k5(y.j(x,1),y.j(x,2),y.j(x,3))
break
case"kill":z.k0(y.j(x,1),y.j(x,2))
break
case"getErrors":y=y.j(x,1)
z.dx.t(0,y)
break
case"stopErrors":y=y.j(x,1)
z.dx.a3(0,y)
break}return}init.globalState.f.a.aE(new H.cu(z,new H.r4(this,x),"receive"))},
A:function(a,b){if(b==null)return!1
return b instanceof H.cv&&J.e(this.b,b.b)},
gD:function(a){return this.b.geh()}},
r4:{"^":"a:2;a,b",
$0:function(){var z=this.a.b
if(!z.gfC())z.io(this.b)}},
eo:{"^":"hG;b,c,a",
G:function(a){var z,y,x
z=P.a0(["command","message","port",this,"msg",a])
y=new H.bu(!0,P.bV(null,P.t)).bq(z)
if(init.globalState.x===!0){init.globalState.Q.toString
self.postMessage(y)}else{x=init.globalState.ch.j(0,this.b)
if(x!=null)x.postMessage(y)}},
A:function(a,b){if(b==null)return!1
return b instanceof H.eo&&J.e(this.b,b.b)&&J.e(this.a,b.a)&&J.e(this.c,b.c)},
gD:function(a){var z,y,x
z=this.b
if(typeof z!=="number")return z.f9()
y=this.a
if(typeof y!=="number")return y.f9()
x=this.c
if(typeof x!=="number")return H.x(x)
return(z<<16^y<<8^x)>>>0}},
cn:{"^":"d;eh:a<,b,fC:c<",
iy:function(){this.c=!0
this.b=null},
bu:function(){var z,y
if(this.c)return
this.c=!0
this.b=null
z=init.globalState.d
y=this.a
z.b.a3(0,y)
z.c.a3(0,y)
z.cO()},
io:function(a){if(this.c)return
this.b.$1(a)},
$isnz:1},
nA:{"^":"al;a,b",
aI:function(a,b,c,d){var z=this.b
z.toString
return new P.d8(z,[H.m(z,0)]).aI(a,b,c,d)},
eT:function(a,b,c){return this.aI(a,null,b,c)},
bu:[function(){this.a.bu()
this.b.bu()},"$0","gjz",0,0,7],
ie:function(a){var z=new P.rj(null,0,null,null,null,null,this.gjz(),[null])
this.b=z
this.a.b=z.gji(z)},
$asal:I.bg},
py:{"^":"d;a,b,c",
gc2:function(){return this.c!=null},
ii:function(a,b){var z,y
if(a===0)z=self.setTimeout==null||init.globalState.x===!0
else z=!1
if(z){this.c=1
z=init.globalState.f
y=init.globalState.d
z.a.aE(new H.cu(y,new H.pA(this,b),"timer"))
this.b=!0}else if(self.setTimeout!=null){++init.globalState.f.b
this.c=self.setTimeout(H.di(new H.pB(this,b),0),a)}else throw H.c(new P.S("Timer greater than 0."))},
v:{
pz:function(a,b){var z=new H.py(!0,!1,null)
z.ii(a,b)
return z}}},
pA:{"^":"a:7;a,b",
$0:function(){this.a.c=null
this.b.$0()}},
pB:{"^":"a:7;a,b",
$0:function(){this.a.c=null;--init.globalState.f.b
this.b.$0()}},
bk:{"^":"d;eh:a<",
gD:function(a){var z=this.a
if(typeof z!=="number")return z.le()
z=C.j.dA(z,0)^C.j.bM(z,4294967296)
z=(~z>>>0)+(z<<15>>>0)&4294967295
z=((z^z>>>12)>>>0)*5&4294967295
z=((z^z>>>4)>>>0)*2057&4294967295
return(z^z>>>16)>>>0},
A:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(b instanceof H.bk){z=this.a
y=b.a
return z==null?y==null:z===y}return!1}},
bu:{"^":"d;a,b",
bq:[function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
z=this.b
y=z.j(0,a)
if(y!=null)return["ref",y]
z.p(0,a,z.gl(z))
z=J.o(a)
if(!!z.$iscW)return this.hT(a)
if(!!z.$islV){x=this.ghQ()
z=a.gcn()
z=H.bH(z,x,H.y(z,"B",0),null)
z=P.P(z,!0,H.y(z,"B",0))
w=a.gcz()
w=H.bH(w,x,H.y(w,"B",0),null)
return["map",z,P.P(w,!0,H.y(w,"B",0))]}if(!!z.$isfl)return this.hU(a)
if(!!z.$isaY)this.hD(a)
if(!!z.$isnz)this.d8(a,"RawReceivePorts can't be transmitted:")
if(!!z.$iscv)return this.hV(a)
if(!!z.$iseo)return this.hW(a)
if(!!z.$isa){v=a.$static_name
if(v==null)this.d8(a,"Closures can't be transmitted:")
return["function",v]}if(!!z.$isbk)return["capability",a.a]
if(!(a instanceof P.d))this.hD(a)
return["dart",init.classIdExtractor(a),this.hS(init.classFieldsExtractor(a))]},"$1","ghQ",2,0,0],
d8:function(a,b){throw H.c(new P.S((b==null?"Can't transmit:":b)+" "+H.b(a)))},
hD:function(a){return this.d8(a,null)},
hT:function(a){var z=this.hR(a)
if(!!a.fixed$length)return["fixed",z]
if(!a.fixed$length)return["extendable",z]
if(!a.immutable$list)return["mutable",z]
if(a.constructor===Array)return["const",z]
this.d8(a,"Can't serialize indexable: ")},
hR:function(a){var z,y,x
z=[]
C.a.sl(z,a.length)
for(y=0;y<a.length;++y){x=this.bq(a[y])
if(y>=z.length)return H.f(z,y)
z[y]=x}return z},
hS:function(a){var z
for(z=0;z<a.length;++z)C.a.p(a,z,this.bq(a[z]))
return a},
hU:function(a){var z,y,x,w
if(!!a.constructor&&a.constructor!==Object)this.d8(a,"Only plain JS Objects are supported:")
z=Object.keys(a)
y=[]
C.a.sl(y,z.length)
for(x=0;x<z.length;++x){w=this.bq(a[z[x]])
if(x>=y.length)return H.f(y,x)
y[x]=w}return["js-object",z,y]},
hW:function(a){if(this.a)return["sendport",a.b,a.a,a.c]
return["raw sendport",a]},
hV:function(a){if(this.a)return["sendport",init.globalState.b,a.a,a.b.geh()]
return["raw sendport",a]}},
d9:{"^":"d;a,b",
c_:[function(a){var z,y,x,w,v,u
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
if(typeof a!=="object"||a===null||a.constructor!==Array)throw H.c(P.G("Bad serialized message: "+H.b(a)))
switch(C.a.gcV(a)){case"ref":if(1>=a.length)return H.f(a,1)
z=a[1]
y=this.b
if(z>>>0!==z||z>=y.length)return H.f(y,z)
return y[z]
case"buffer":if(1>=a.length)return H.f(a,1)
x=a[1]
this.b.push(x)
return x
case"typed":if(1>=a.length)return H.f(a,1)
x=a[1]
this.b.push(x)
return x
case"fixed":if(1>=a.length)return H.f(a,1)
x=a[1]
this.b.push(x)
y=H.p(this.cT(x),[null])
y.fixed$length=Array
return y
case"extendable":if(1>=a.length)return H.f(a,1)
x=a[1]
this.b.push(x)
return H.p(this.cT(x),[null])
case"mutable":if(1>=a.length)return H.f(a,1)
x=a[1]
this.b.push(x)
return this.cT(x)
case"const":if(1>=a.length)return H.f(a,1)
x=a[1]
this.b.push(x)
y=H.p(this.cT(x),[null])
y.fixed$length=Array
return y
case"map":return this.jM(a)
case"sendport":return this.jN(a)
case"raw sendport":if(1>=a.length)return H.f(a,1)
x=a[1]
this.b.push(x)
return x
case"js-object":return this.jL(a)
case"function":if(1>=a.length)return H.f(a,1)
x=init.globalFunctions[a[1]]()
this.b.push(x)
return x
case"capability":if(1>=a.length)return H.f(a,1)
return new H.bk(a[1])
case"dart":y=a.length
if(1>=y)return H.f(a,1)
w=a[1]
if(2>=y)return H.f(a,2)
v=a[2]
u=init.instanceFromClassId(w)
this.b.push(u)
this.cT(v)
return init.initializeEmptyInstance(w,u,v)
default:throw H.c("couldn't deserialize: "+H.b(a))}},"$1","gjK",2,0,0],
cT:function(a){var z,y,x
z=J.L(a)
y=0
while(!0){x=z.gl(a)
if(typeof x!=="number")return H.x(x)
if(!(y<x))break
z.p(a,y,this.c_(z.j(a,y)));++y}return a},
jM:function(a){var z,y,x,w,v,u
z=a.length
if(1>=z)return H.f(a,1)
y=a[1]
if(2>=z)return H.f(a,2)
x=a[2]
w=P.b_()
this.b.push(w)
y=J.eS(y,this.gjK()).cw(0)
for(z=J.L(y),v=J.L(x),u=0;u<z.gl(y);++u){if(u>=y.length)return H.f(y,u)
w.p(0,y[u],this.c_(v.j(x,u)))}return w},
jN:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.f(a,1)
y=a[1]
if(2>=z)return H.f(a,2)
x=a[2]
if(3>=z)return H.f(a,3)
w=a[3]
if(J.e(y,init.globalState.b)){v=init.globalState.z.j(0,x)
if(v==null)return
u=v.cp(w)
if(u==null)return
t=new H.cv(u,x)}else t=new H.eo(y,w,x)
this.b.push(t)
return t},
jL:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.f(a,1)
y=a[1]
if(2>=z)return H.f(a,2)
x=a[2]
w={}
this.b.push(w)
z=J.L(y)
v=J.L(x)
u=0
while(!0){t=z.gl(y)
if(typeof t!=="number")return H.x(t)
if(!(u<t))break
w[z.j(y,u)]=this.c_(v.j(x,u));++u}return w}}}],["","",,H,{"^":"",
k8:function(){throw H.c(new P.S("Cannot modify unmodifiable Map"))},
uN:function(a){return init.types[a]},
b:function(a){var z
if(typeof a==="string")return a
if(typeof a==="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
z=J.h(a)
if(typeof z!=="string")throw H.c(H.T(a))
return z},
aE:function(a){var z=a.$identityHash
if(z==null){z=Math.random()*0x3fffffff|0
a.$identityHash=z}return z},
bL:function(a){var z,y,x,w,v,u,t,s
z=J.o(a)
y=z.constructor
if(typeof y=="function"){x=y.name
w=typeof x==="string"?x:null}else w=null
if(w==null||z===C.N||!!J.o(a).$isbs){v=C.Q(a)
if(v==="Object"){u=a.constructor
if(typeof u=="function"){t=String(u).match(/^\s*function\s*([\w$]*)\s*\(/)
s=t==null?null:t[1]
if(typeof s==="string"&&/^\w+$/.test(s))w=s}if(w==null)w=v}else w=v}w=w
if(w.length>1&&C.b.cD(w,0)===36)w=C.b.bK(w,1)
return function(b,c){return b.replace(/[^<,> ]+/g,function(d){return c[d]||d})}(w+H.dl(H.cz(a),0,null),init.mangledGlobalNames)},
d_:function(a){return"Instance of '"+H.bL(a)+"'"},
ar:function(a){var z
if(a<=65535)return String.fromCharCode(a)
if(a<=1114111){z=a-65536
return String.fromCharCode((55296|C.e.dA(z,10))>>>0,56320|z&1023)}throw H.c(P.a8(a,0,1114111,null,null))},
bo:function(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
nr:function(a){var z=H.bo(a).getFullYear()+0
return z},
np:function(a){var z=H.bo(a).getMonth()+1
return z},
nl:function(a){var z=H.bo(a).getDate()+0
return z},
nm:function(a){var z=H.bo(a).getHours()+0
return z},
no:function(a){var z=H.bo(a).getMinutes()+0
return z},
nq:function(a){var z=H.bo(a).getSeconds()+0
return z},
nn:function(a){var z=H.bo(a).getMilliseconds()+0
return z},
e1:function(a,b){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.c(H.T(a))
return a[b]},
fL:function(a,b,c){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.c(H.T(a))
a[b]=c},
x:function(a){throw H.c(H.T(a))},
f:function(a,b){if(a==null)J.aN(a)
throw H.c(H.aK(a,b))},
aK:function(a,b){var z,y
if(typeof b!=="number"||Math.floor(b)!==b)return new P.b7(!0,b,"index",null)
z=J.aN(a)
if(!(b<0)){if(typeof z!=="number")return H.x(z)
y=b>=z}else y=!0
if(y)return P.cT(b,a,"index",null,z)
return P.cl(b,"index",null)},
T:function(a){return new P.b7(!0,a,null,null)},
dg:function(a){if(typeof a!=="number")throw H.c(H.T(a))
return a},
rS:function(a){if(typeof a!=="number"||Math.floor(a)!==a)throw H.c(H.T(a))
return a},
by:function(a){if(typeof a!=="string")throw H.c(H.T(a))
return a},
c:function(a){var z
if(a==null)a=new P.cY()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.iN})
z.name=""}else z.toString=H.iN
return z},
iN:function(){return J.h(this.dartException)},
i:function(a){throw H.c(a)},
as:function(a){throw H.c(new P.D(a))},
C:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.wS(a)
if(a==null)return
if(a instanceof H.dB)return z.$1(a.a)
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.e.dA(x,16)&8191)===10)switch(w){case 438:return z.$1(H.dI(H.b(y)+" (Error "+w+")",null))
case 445:case 5007:v=H.b(y)+" (Error "+w+")"
return z.$1(new H.fA(v,null))}}if(a instanceof TypeError){u=$.$get$hm()
t=$.$get$hn()
s=$.$get$ho()
r=$.$get$hp()
q=$.$get$ht()
p=$.$get$hu()
o=$.$get$hr()
$.$get$hq()
n=$.$get$hw()
m=$.$get$hv()
l=u.bx(y)
if(l!=null)return z.$1(H.dI(y,l))
else{l=t.bx(y)
if(l!=null){l.method="call"
return z.$1(H.dI(y,l))}else{l=s.bx(y)
if(l==null){l=r.bx(y)
if(l==null){l=q.bx(y)
if(l==null){l=p.bx(y)
if(l==null){l=o.bx(y)
if(l==null){l=r.bx(y)
if(l==null){l=n.bx(y)
if(l==null){l=m.bx(y)
v=l!=null}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0
if(v)return z.$1(new H.fA(y,l==null?null:l.method))}}return z.$1(new H.pI(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.h8()
y=function(b){try{return String(b)}catch(k){}return null}(a)
return z.$1(new P.b7(!1,null,null,typeof y==="string"?y.replace(/^RangeError:\s*/,""):y))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.h8()
return a},
E:function(a){var z
if(a instanceof H.dB)return a.b
if(a==null)return new H.hO(a,null)
z=a.$cachedTrace
if(z!=null)return z
return a.$cachedTrace=new H.hO(a,null)},
v3:function(a){if(a==null||typeof a!='object')return J.j(a)
else return H.aE(a)},
ug:function(a,b){var z,y,x,w
z=a.length
for(y=0;y<z;y=w){x=y+1
w=x+1
b.p(0,a[y],a[x])}return b},
uT:function(a,b,c,d,e,f,g){switch(c){case 0:return H.cw(b,new H.uU(a))
case 1:return H.cw(b,new H.uV(a,d))
case 2:return H.cw(b,new H.uW(a,d,e))
case 3:return H.cw(b,new H.uX(a,d,e,f))
case 4:return H.cw(b,new H.uY(a,d,e,f,g))}throw H.c(P.cR("Unsupported number of arguments for wrapped closure"))},
di:function(a,b){var z=a.$identity
if(!!z)return z
z=function(c,d,e,f){return function(g,h,i,j){return f(c,e,d,g,h,i,j)}}(a,b,init.globalState.d,H.uT)
a.$identity=z
return z},
k3:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=z.$callName
if(!!J.o(c).$isN){z.$reflectionInfo=c
x=H.nC(z).r}else x=c
w=d?Object.create(new H.oM().constructor.prototype):Object.create(new H.du(null,null,null,null).constructor.prototype)
w.$initialize=w.constructor
if(d)v=function(){this.$initialize()}
else{u=$.aO
$.aO=J.ao(u,1)
v=new Function("a,b,c,d"+u,"this.$initialize(a,b,c,d"+u+")")}w.constructor=v
v.prototype=w
if(!d){t=e.length==1&&!0
s=H.f3(a,z,t)
s.$reflectionInfo=c}else{w.$static_name=f
s=z
t=!1}if(typeof x=="number")r=function(g,h){return function(){return g(h)}}(H.uN,x)
else if(typeof x=="function")if(d)r=x
else{q=t?H.eZ:H.dv
r=function(g,h){return function(){return g.apply({$receiver:h(this)},arguments)}}(x,q)}else throw H.c("Error in reflectionInfo.")
w.$S=r
w[y]=s
for(u=b.length,p=1;p<u;++p){o=b[p]
n=o.$callName
if(n!=null){m=d?o:H.f3(a,o,t)
w[n]=m}}w["call*"]=s
w.$R=z.$R
w.$D=z.$D
return v},
k0:function(a,b,c,d){var z=H.dv
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},
f3:function(a,b,c){var z,y,x,w,v,u,t
if(c)return H.k2(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
v=!w||y>=27
if(v)return H.k0(y,!w,z,b)
if(y===0){w=$.aO
$.aO=J.ao(w,1)
u="self"+H.b(w)
w="return function(){var "+u+" = this."
v=$.bE
if(v==null){v=H.cK("self")
$.bE=v}return new Function(w+H.b(v)+";return "+u+"."+H.b(z)+"();}")()}t="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w=$.aO
$.aO=J.ao(w,1)
t+=H.b(w)
w="return function("+t+"){return this."
v=$.bE
if(v==null){v=H.cK("self")
$.bE=v}return new Function(w+H.b(v)+"."+H.b(z)+"("+t+");}")()},
k1:function(a,b,c,d){var z,y
z=H.dv
y=H.eZ
switch(b?-1:a){case 0:throw H.c(new H.nO("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,z,y)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,z,y)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,z,y)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,z,y)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,z,y)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,z,y)
default:return function(e,f,g,h){return function(){h=[g(this)]
Array.prototype.push.apply(h,arguments)
return e.apply(f(this),h)}}(d,z,y)}},
k2:function(a,b){var z,y,x,w,v,u,t,s
z=H.jS()
y=$.eY
if(y==null){y=H.cK("receiver")
$.eY=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.k1(w,!u,x,b)
if(w===1){y="return function(){return this."+H.b(z)+"."+H.b(x)+"(this."+H.b(y)+");"
u=$.aO
$.aO=J.ao(u,1)
return new Function(y+H.b(u)+"}")()}s="abcdefghijklmnopqrstuvwxyz".split("").splice(0,w-1).join(",")
y="return function("+s+"){return this."+H.b(z)+"."+H.b(x)+"(this."+H.b(y)+", "+s+");"
u=$.aO
$.aO=J.ao(u,1)
return new Function(y+H.b(u)+"}")()},
ey:function(a,b,c,d,e,f){var z
b.fixed$length=Array
if(!!J.o(c).$isN){c.fixed$length=Array
z=c}else z=c
return H.k3(a,b,z,!!d,e,f)},
vc:function(a,b){var z=J.L(b)
throw H.c(H.cM(H.bL(a),z.aM(b,3,z.gl(b))))},
F:function(a,b){var z
if(a!=null)z=(typeof a==="object"||typeof a==="function")&&J.o(a)[b]
else z=!0
if(z)return a
H.vc(a,b)},
eA:function(a){var z=J.o(a)
return"$S" in z?z.$S():null},
ay:function(a,b){var z
if(a==null)return!1
z=H.eA(a)
return z==null?!1:H.eD(z,b)},
ii:function(a,b){var z,y
if(a==null)return a
if(H.ay(a,b))return a
z=H.Z(b,null)
y=H.eA(a)
throw H.c(H.cM(y!=null?H.Z(y,null):H.bL(a),z))},
wP:function(a){throw H.c(new P.kl(a))},
dn:function(){return(Math.random()*0x100000000>>>0)+(Math.random()*0x100000000>>>0)*4294967296},
bf:function(a){return new H.av(a,null)},
p:function(a,b){a.$ti=b
return a},
cz:function(a){if(a==null)return
return a.$ti},
io:function(a,b){return H.eP(a["$as"+H.b(b)],H.cz(a))},
y:function(a,b,c){var z=H.io(a,b)
return z==null?null:z[c]},
m:function(a,b){var z=H.cz(a)
return z==null?null:z[b]},
Z:function(a,b){var z
if(a==null)return"dynamic"
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a[0].builtin$cls+H.dl(a,1,b)
if(typeof a=="function")return a.builtin$cls
if(typeof a==="number"&&Math.floor(a)===a)return H.b(b==null?a:b.$1(a))
if(typeof a.func!="undefined"){z=a.typedef
if(z!=null)return H.Z(z,b)
return H.rB(a,b)}return"unknown-reified-type"},
rB:function(a,b){var z,y,x,w,v,u,t,s,r,q,p
z=!!a.v?"void":H.Z(a.ret,b)
if("args" in a){y=a.args
for(x=y.length,w="",v="",u=0;u<x;++u,v=", "){t=y[u]
w=w+v+H.Z(t,b)}}else{w=""
v=""}if("opt" in a){s=a.opt
w+=v+"["
for(x=s.length,v="",u=0;u<x;++u,v=", "){t=s[u]
w=w+v+H.Z(t,b)}w+="]"}if("named" in a){r=a.named
w+=v+"{"
for(x=H.uf(r),q=x.length,v="",u=0;u<q;++u,v=", "){p=x[u]
w=w+v+H.Z(r[p],b)+(" "+H.b(p))}w+="}"}return"("+w+") => "+z},
dl:function(a,b,c){var z,y,x,w,v,u
if(a==null)return""
z=new P.bR("")
for(y=b,x=!0,w=!0,v="";y<a.length;++y){if(x)x=!1
else z.E=v+", "
u=a[y]
if(u!=null)w=!1
v=z.E+=H.Z(u,c)}return w?"":"<"+z.k(0)+">"},
ip:function(a){var z,y
if(a instanceof H.a){z=H.eA(a)
if(z!=null)return H.Z(z,null)}y=J.o(a).constructor.builtin$cls
if(a==null)return y
return y+H.dl(a.$ti,0,null)},
eP:function(a,b){if(a==null)return b
a=a.apply(null,b)
if(a==null)return
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a
if(typeof a=="function")return a.apply(null,b)
return b},
aV:function(a,b,c,d){var z,y
if(a==null)return!1
z=H.cz(a)
y=J.o(a)
if(y[b]==null)return!1
return H.i5(H.eP(y[d],z),c)},
aM:function(a,b,c,d){if(a==null)return a
if(H.aV(a,b,c,d))return a
throw H.c(H.cM(H.bL(a),function(e,f){return e.replace(/[^<,> ]+/g,function(g){return f[g]||g})}(b.substring(3)+H.dl(c,0,null),init.mangledGlobalNames)))},
i5:function(a,b){var z,y
if(a==null||b==null)return!0
z=a.length
for(y=0;y<z;++y)if(!H.an(a[y],b[y]))return!1
return!0},
be:function(a,b,c){return a.apply(b,H.io(b,c))},
dh:function(a,b){var z,y,x
if(a==null)return b==null||b.builtin$cls==="d"||b.builtin$cls==="at"
if(b==null)return!0
z=H.cz(a)
a=J.o(a)
y=a.constructor
if(z!=null){z=z.slice()
z.splice(0,0,y)
y=z}if('func' in b){x=a.$S
if(x==null)return!1
return H.eD(x.apply(a,null),b)}return H.an(y,b)},
iI:function(a,b){if(a!=null&&!H.dh(a,b))throw H.c(H.cM(H.bL(a),H.Z(b,null)))
return a},
an:function(a,b){var z,y,x,w,v,u
if(a===b)return!0
if(a==null||b==null)return!0
if(a.builtin$cls==="at")return!0
if('func' in b)return H.eD(a,b)
if('func' in a)return b.builtin$cls==="bG"||b.builtin$cls==="d"
z=typeof a==="object"&&a!==null&&a.constructor===Array
y=z?a[0]:a
x=typeof b==="object"&&b!==null&&b.constructor===Array
w=x?b[0]:b
if(w!==y){v=H.Z(w,null)
if(!('$is'+v in y.prototype))return!1
u=y.prototype["$as"+v]}else u=null
if(!z&&u==null||!x)return!0
z=z?a.slice(1):null
x=b.slice(1)
return H.i5(H.eP(u,z),x)},
i4:function(a,b,c){var z,y,x,w,v
z=b==null
if(z&&a==null)return!0
if(z)return c
if(a==null)return!1
y=a.length
x=b.length
if(c){if(y<x)return!1}else if(y!==x)return!1
for(w=0;w<x;++w){z=a[w]
v=b[w]
if(!(H.an(z,v)||H.an(v,z)))return!1}return!0},
rM:function(a,b){var z,y,x,w,v,u
if(b==null)return!0
if(a==null)return!1
z=Object.getOwnPropertyNames(b)
z.fixed$length=Array
y=z
for(z=y.length,x=0;x<z;++x){w=y[x]
if(!Object.hasOwnProperty.call(a,w))return!1
v=b[w]
u=a[w]
if(!(H.an(v,u)||H.an(u,v)))return!1}return!0},
eD:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
if(!('func' in a))return!1
if("v" in a){if(!("v" in b)&&"ret" in b)return!1}else if(!("v" in b)){z=a.ret
y=b.ret
if(!(H.an(z,y)||H.an(y,z)))return!1}x=a.args
w=b.args
v=a.opt
u=b.opt
t=x!=null?x.length:0
s=w!=null?w.length:0
r=v!=null?v.length:0
q=u!=null?u.length:0
if(t>s)return!1
if(t+r<s+q)return!1
if(t===s){if(!H.i4(x,w,!1))return!1
if(!H.i4(v,u,!0))return!1}else{for(p=0;p<t;++p){o=x[p]
n=w[p]
if(!(H.an(o,n)||H.an(n,o)))return!1}for(m=p,l=0;m<s;++l,++m){o=v[l]
n=w[m]
if(!(H.an(o,n)||H.an(n,o)))return!1}for(m=0;m<q;++l,++m){o=v[l]
n=u[m]
if(!(H.an(o,n)||H.an(n,o)))return!1}}return H.rM(a.named,b.named)},
wH:function(a,b,c){var z
if(typeof b==="string")return a.indexOf(b,c)>=0
else{z=J.o(b)
if(!!z.$isdG){z=C.b.bK(a,c)
return b.b.test(z)}else{z=z.eD(b,C.b.bK(a,c))
return!z.gY(z)}}},
wJ:function(a,b,c,d){var z,y,x
z=b.ft(a,d)
if(z==null)return a
y=z.b
x=y.index
return H.eO(a,x,x+y[0].length,c)},
n:function(a,b,c){var z,y,x
H.by(c)
if(b==="")if(a==="")return c
else{z=a.length
y=H.b(c)
for(x=0;x<z;++x)y=y+a[x]+H.b(c)
return y.charCodeAt(0)==0?y:y}else return a.replace(new RegExp(b.replace(/[[\]{}()*+?.\\^$|]/g,"\\$&"),'g'),c.replace(/\$/g,"$$$$"))},
xE:[function(a){return a},"$1","hS",2,0,23],
wI:function(a,b,c,d){var z,y,x,w,v,u
z=J.o(b)
if(!z.$isdZ)throw H.c(P.cH(b,"pattern","is not a Pattern"))
for(z=z.eD(b,a),z=new H.hE(z.a,z.b,z.c,null),y=0,x="";z.u();){w=z.d
v=w.b
u=v.index
x=x+H.b(H.hS().$1(C.b.aM(a,y,u)))+H.b(c.$1(w))
y=u+v[0].length}z=x+H.b(H.hS().$1(C.b.bK(a,y)))
return z.charCodeAt(0)==0?z:z},
iH:function(a,b,c,d){var z,y,x,w,v,u
if(typeof b==="string"){z=a.indexOf(b,d)
if(z<0)return a
return H.eO(a,z,z+b.length,c)}y=J.o(b)
if(!!y.$isdG)return d===0?a.replace(b.b,c.replace(/\$/g,"$$$$")):H.wJ(a,b,c,d)
if(b==null)H.i(H.T(b))
y=y.dC(b,a,d)
x=y.ga_(y)
if(!x.u())return a
w=x.gU()
y=w.gfd()
v=w.gh4()
H.by(c)
u=P.cm(y,v,a.length,null,null,null)
H.rS(u)
return H.eO(a,y,u,c)},
eO:function(a,b,c,d){var z,y
z=a.substring(0,b)
y=a.substring(c)
return z+H.b(d)+y},
k7:{"^":"d;$ti",
gY:function(a){return this.gl(this)===0},
gav:function(a){return this.gl(this)!==0},
k:function(a){return P.dS(this)},
p:function(a,b,c){return H.k8()},
$isI:1},
k9:{"^":"k7;a,b,c,$ti",
gl:function(a){return this.a},
ad:function(a){if(typeof a!=="string")return!1
if("__proto__"===a)return!1
return this.b.hasOwnProperty(a)},
j:function(a,b){if(!this.ad(b))return
return this.fu(b)},
fu:function(a){return this.b[a]},
Z:function(a,b){var z,y,x,w
z=this.c
for(y=z.length,x=0;x<y;++x){w=z[x]
b.$2(w,this.fu(w))}}},
nB:{"^":"d;a,b,c,d,e,f,r,x",v:{
nC:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z.fixed$length=Array
z=z
y=z[0]
x=z[1]
return new H.nB(a,z,(y&1)===1,y>>1,x>>1,(x&1)===1,z[2],null)}}},
pD:{"^":"d;a,b,c,d,e,f",
bx:function(a){var z,y,x
z=new RegExp(this.a).exec(a)
if(z==null)return
y=Object.create(null)
x=this.b
if(x!==-1)y.arguments=z[x+1]
x=this.c
if(x!==-1)y.argumentsExpr=z[x+1]
x=this.d
if(x!==-1)y.expr=z[x+1]
x=this.e
if(x!==-1)y.method=z[x+1]
x=this.f
if(x!==-1)y.receiver=z[x+1]
return y},
v:{
aQ:function(a){var z,y,x,w,v,u
a=a.replace(String({}),'$receiver$').replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
z=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(z==null)z=[]
y=z.indexOf("\\$arguments\\$")
x=z.indexOf("\\$argumentsExpr\\$")
w=z.indexOf("\\$expr\\$")
v=z.indexOf("\\$method\\$")
u=z.indexOf("\\$receiver\\$")
return new H.pD(a.replace(new RegExp('\\\\\\$arguments\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$argumentsExpr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$expr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$method\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$receiver\\\\\\$','g'),'((?:x|[^x])*)'),y,x,w,v,u)},
d7:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},
hs:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},
fA:{"^":"a5;a,b",
k:function(a){var z=this.b
if(z==null)return"NullError: "+H.b(this.a)
return"NullError: method not found: '"+H.b(z)+"' on null"}},
m7:{"^":"a5;a,b,c",
k:function(a){var z,y
z=this.b
if(z==null)return"NoSuchMethodError: "+H.b(this.a)
y=this.c
if(y==null)return"NoSuchMethodError: method not found: '"+z+"' ("+H.b(this.a)+")"
return"NoSuchMethodError: method not found: '"+z+"' on '"+y+"' ("+H.b(this.a)+")"},
v:{
dI:function(a,b){var z,y
z=b==null
y=z?null:b.method
return new H.m7(a,y,z?null:b.receiver)}}},
pI:{"^":"a5;a",
k:function(a){var z=this.a
return z.length===0?"Error":"Error: "+z}},
dB:{"^":"d;a,br:b<"},
wS:{"^":"a:0;a",
$1:function(a){if(!!J.o(a).$isa5)if(a.$thrownJsError==null)a.$thrownJsError=this.a
return a}},
hO:{"^":"d;a,b",
k:function(a){var z,y
z=this.b
if(z!=null)return z
z=this.a
y=z!==null&&typeof z==="object"?z.stack:null
z=y==null?"":y
this.b=z
return z}},
uU:{"^":"a:2;a",
$0:function(){return this.a.$0()}},
uV:{"^":"a:2;a,b",
$0:function(){return this.a.$1(this.b)}},
uW:{"^":"a:2;a,b,c",
$0:function(){return this.a.$2(this.b,this.c)}},
uX:{"^":"a:2;a,b,c,d",
$0:function(){return this.a.$3(this.b,this.c,this.d)}},
uY:{"^":"a:2;a,b,c,d,e",
$0:function(){return this.a.$4(this.b,this.c,this.d,this.e)}},
a:{"^":"d;",
k:function(a){return"Closure '"+H.bL(this).trim()+"'"},
ghL:function(){return this},
$isbG:1,
ghL:function(){return this}},
hl:{"^":"a;"},
oM:{"^":"hl;",
k:function(a){var z=this.$static_name
if(z==null)return"Closure of unknown static method"
return"Closure '"+z+"'"}},
du:{"^":"hl;a,b,c,d",
A:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof H.du))return!1
return this.a===b.a&&this.b===b.b&&this.c===b.c},
gD:function(a){var z,y
z=this.c
if(z==null)y=H.aE(this.a)
else y=typeof z!=="object"?J.j(z):H.aE(z)
z=H.aE(this.b)
if(typeof y!=="number")return y.lf()
return(y^z)>>>0},
k:function(a){var z=this.c
if(z==null)z=this.a
return"Closure '"+H.b(this.d)+"' of "+H.d_(z)},
v:{
dv:function(a){return a.a},
eZ:function(a){return a.c},
jS:function(){var z=$.bE
if(z==null){z=H.cK("self")
$.bE=z}return z},
cK:function(a){var z,y,x,w,v
z=new H.du("self","target","receiver","name")
y=Object.getOwnPropertyNames(z)
y.fixed$length=Array
x=y
for(y=x.length,w=0;w<y;++w){v=x[w]
if(z[v]===a)return v}}}},
jX:{"^":"a5;a",
k:function(a){return this.a},
v:{
cM:function(a,b){return new H.jX("CastError: Casting value of type '"+a+"' to incompatible type '"+b+"'")}}},
nO:{"^":"a5;a",
k:function(a){return"RuntimeError: "+H.b(this.a)}},
av:{"^":"d;a,b",
k:function(a){var z,y
z=this.b
if(z!=null)return z
y=function(b,c){return b.replace(/[^<,> ]+/g,function(d){return c[d]||d})}(this.a,init.mangledGlobalNames)
this.b=y
return y},
gD:function(a){return J.j(this.a)},
A:function(a,b){if(b==null)return!1
return b instanceof H.av&&J.e(this.a,b.a)}},
R:{"^":"d;a,b,c,d,e,f,r,$ti",
gl:function(a){return this.a},
gY:function(a){return this.a===0},
gav:function(a){return!this.gY(this)},
gcn:function(){return new H.mo(this,[H.m(this,0)])},
gcz:function(){return H.bH(this.gcn(),new H.m6(this),H.m(this,0),H.m(this,1))},
ad:function(a){var z,y
if(typeof a==="string"){z=this.b
if(z==null)return!1
return this.fo(z,a)}else if(typeof a==="number"&&(a&0x3ffffff)===a){y=this.c
if(y==null)return!1
return this.fo(y,a)}else return this.ki(a)},
ki:function(a){var z=this.d
if(z==null)return!1
return this.cY(this.du(z,this.cX(a)),a)>=0},
j:function(a,b){var z,y,x
if(typeof b==="string"){z=this.b
if(z==null)return
y=this.cG(z,b)
return y==null?null:y.gc1()}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null)return
y=this.cG(x,b)
return y==null?null:y.gc1()}else return this.kj(b)},
kj:function(a){var z,y,x
z=this.d
if(z==null)return
y=this.du(z,this.cX(a))
x=this.cY(y,a)
if(x<0)return
return y[x].gc1()},
p:function(a,b,c){var z,y
if(typeof b==="string"){z=this.b
if(z==null){z=this.ej()
this.b=z}this.fi(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=this.ej()
this.c=y}this.fi(y,b,c)}else this.kl(b,c)},
kl:function(a,b){var z,y,x,w
z=this.d
if(z==null){z=this.ej()
this.d=z}y=this.cX(a)
x=this.du(z,y)
if(x==null)this.ew(z,y,[this.ek(a,b)])
else{w=this.cY(x,a)
if(w>=0)x[w].sc1(b)
else x.push(this.ek(a,b))}},
kM:function(a,b){var z
if(this.ad(a))return this.j(0,a)
z=b.$0()
this.p(0,a,z)
return z},
a3:function(a,b){if(typeof b==="string")return this.fM(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.fM(this.c,b)
else return this.kk(b)},
kk:function(a){var z,y,x,w
z=this.d
if(z==null)return
y=this.du(z,this.cX(a))
x=this.cY(y,a)
if(x<0)return
w=y.splice(x,1)[0]
this.fO(w)
return w.gc1()},
bh:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
Z:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$2(z.a,z.b)
if(y!==this.r)throw H.c(new P.D(this))
z=z.c}},
fi:function(a,b,c){var z=this.cG(a,b)
if(z==null)this.ew(a,b,this.ek(b,c))
else z.sc1(c)},
fM:function(a,b){var z
if(a==null)return
z=this.cG(a,b)
if(z==null)return
this.fO(z)
this.fp(a,b)
return z.gc1()},
ek:function(a,b){var z,y
z=new H.mn(a,b,null,null,[null,null])
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.d=y
y.c=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
fO:function(a){var z,y
z=a.gj_()
y=a.c
if(z==null)this.e=y
else z.c=y
if(y==null)this.f=z
else y.d=z;--this.a
this.r=this.r+1&67108863},
cX:function(a){return J.j(a)&0x3ffffff},
cY:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.e(a[y].ghc(),b))return y
return-1},
k:function(a){return P.dS(this)},
cG:function(a,b){return a[b]},
du:function(a,b){return a[b]},
ew:function(a,b,c){a[b]=c},
fp:function(a,b){delete a[b]},
fo:function(a,b){return this.cG(a,b)!=null},
ej:function(){var z=Object.create(null)
this.ew(z,"<non-identifier-key>",z)
this.fp(z,"<non-identifier-key>")
return z},
$islV:1,
$isI:1,
v:{
fo:function(a,b){return new H.R(0,null,null,null,null,null,0,[a,b])}}},
m6:{"^":"a:0;a",
$1:function(a){return this.a.j(0,a)}},
mn:{"^":"d;hc:a<,c1:b@,c,j_:d<,$ti"},
mo:{"^":"a_;a,$ti",
gl:function(a){return this.a.a},
gY:function(a){return this.a.a===0},
ga_:function(a){var z,y
z=this.a
y=new H.mp(z,z.r,null,null,this.$ti)
y.c=z.e
return y},
a7:function(a,b){return this.a.ad(b)},
Z:function(a,b){var z,y,x
z=this.a
y=z.e
x=z.r
for(;y!=null;){b.$1(y.a)
if(x!==z.r)throw H.c(new P.D(z))
y=y.c}}},
mp:{"^":"d;a,b,c,d,$ti",
gU:function(){return this.d},
u:function(){var z=this.a
if(this.b!==z.r)throw H.c(new P.D(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.c
return!0}}}},
dG:{"^":"d;a,b,c,d",
k:function(a){return"RegExp/"+this.a+"/"},
giW:function(){var z=this.c
if(z!=null)return z
z=this.b
z=H.dH(this.a,z.multiline,!z.ignoreCase,!0)
this.c=z
return z},
giV:function(){var z=this.d
if(z!=null)return z
z=this.b
z=H.dH(this.a+"|()",z.multiline,!z.ignoreCase,!0)
this.d=z
return z},
dC:function(a,b,c){if(c>b.length)throw H.c(P.a8(c,0,b.length,null,null))
return new H.qh(this,b,c)},
eD:function(a,b){return this.dC(a,b,0)},
ft:function(a,b){var z,y
z=this.giW()
z.lastIndex=b
y=z.exec(a)
if(y==null)return
return new H.hN(this,y)},
iG:function(a,b){var z,y
z=this.giV()
z.lastIndex=b
y=z.exec(a)
if(y==null)return
if(0>=y.length)return H.f(y,-1)
if(y.pop()!=null)return
return new H.hN(this,y)},
hh:function(a,b,c){if(c>b.length)throw H.c(P.a8(c,0,b.length,null,null))
return this.iG(b,c)},
$isdZ:1,
v:{
dH:function(a,b,c,d){var z,y,x,w
z=b?"m":""
y=c?"":"i"
x=d?"g":""
w=function(e,f){try{return new RegExp(e,f)}catch(v){return v}}(a,z+y+x)
if(w instanceof RegExp)return w
throw H.c(new P.fb("Illegal RegExp pattern ("+String(w)+")",a,null))}}},
hN:{"^":"d;a,b",
gfd:function(){return this.b.index},
gh4:function(){var z=this.b
return z.index+z[0].length},
j:function(a,b){var z=this.b
if(b>>>0!==b||b>=z.length)return H.f(z,b)
return z[b]},
$isbn:1},
qh:{"^":"ce;a,b,c",
ga_:function(a){return new H.hE(this.a,this.b,this.c,null)},
$asce:function(){return[P.bn]},
$asB:function(){return[P.bn]}},
hE:{"^":"d;a,b,c,d",
gU:function(){return this.d},
u:function(){var z,y,x,w
z=this.b
if(z==null)return!1
y=this.c
if(y<=z.length){x=this.a.ft(z,y)
if(x!=null){this.d=x
z=x.b
y=z.index
w=y+z[0].length
this.c=y===w?w+1:w
return!0}}this.d=null
this.b=null
return!1}},
hd:{"^":"d;fd:a<,b,c",
gh4:function(){return this.a+this.c.length},
j:function(a,b){if(b!==0)H.i(P.cl(b,null,null))
return this.c},
$isbn:1},
rf:{"^":"B;a,b,c",
ga_:function(a){return new H.rg(this.a,this.b,this.c,null)},
$asB:function(){return[P.bn]}},
rg:{"^":"d;a,b,c,d",
u:function(){var z,y,x,w,v,u,t
z=this.c
y=this.b
x=y.length
w=this.a
v=w.length
if(z+x>v){this.d=null
return!1}u=w.indexOf(y,z)
if(u<0){this.c=v+1
this.d=null
return!1}t=u+x
this.d=new H.hd(u,w,y)
this.c=t===this.c?t+1:t
return!0},
gU:function(){return this.d}}}],["","",,H,{"^":"",
uf:function(a){var z=H.p(a?Object.keys(a):[],[null])
z.fixed$length=Array
return z}}],["","",,H,{"^":"",
vb:function(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)}}],["","",,P,{"^":"",
qi:function(){var z,y,x
z={}
if(self.scheduleImmediate!=null)return P.rN()
if(self.MutationObserver!=null&&self.document!=null){y=self.document.createElement("div")
x=self.document.createElement("span")
z.a=null
new self.MutationObserver(H.di(new P.qk(z),1)).observe(y,{childList:true})
return new P.qj(z,y,x)}else if(self.setImmediate!=null)return P.rO()
return P.rP()},
xy:[function(a){++init.globalState.f.b
self.scheduleImmediate(H.di(new P.ql(a),0))},"$1","rN",2,0,15],
xz:[function(a){++init.globalState.f.b
self.setImmediate(H.di(new P.qm(a),0))},"$1","rO",2,0,15],
xA:[function(a){P.ec(C.x,a)},"$1","rP",2,0,15],
aJ:function(a,b){P.ep(null,a)
return b.gh8()},
aw:function(a,b){P.ep(a,b)},
aI:function(a,b){b.bZ(a)},
aH:function(a,b){b.eH(H.C(a),H.E(a))},
ep:function(a,b){var z,y,x,w
z=new P.rq(b)
y=new P.rr(b)
x=J.o(a)
if(!!x.$isH)a.ex(z,y)
else if(!!x.$isQ)a.f_(z,y)
else{w=new P.H(0,$.r,null,[null])
w.a=4
w.c=a
w.ex(z,null)}},
ax:function(a){var z=function(b,c){return function(d,e){while(true)try{b(d,e)
break}catch(y){e=y
d=c}}}(a,1)
$.r.toString
return new P.rL(z)},
dd:function(a,b,c){var z,y,x
if(b===0){if(c.geN())c.c.eG()
else c.a.bu()
return}else if(b===1){if(c.geN())c.c.eH(H.C(a),H.E(a))
else{z=H.C(a)
y=H.E(a)
c.a.eB(z,y)
c.a.bu()}return}if(a instanceof P.bT){if(c.geN()){b.$2(2,null)
return}z=a.b
if(z===0){z=a.a
J.dr(c.a,z)
P.cC(new P.ro(b,c))
return}else if(z===1){x=a.a
c.a.jv(x,!1).c7(new P.rp(b,c))
return}}P.ep(a,b)},
rK:function(a){return a.ge2()},
eu:function(a,b){if(H.ay(a,{func:1,args:[P.at,P.at]})){b.toString
return a}else{b.toString
return a}},
aB:function(a){return new P.rh(new P.H(0,$.r,null,[a]),[a])},
rz:function(a,b,c){$.r.toString
a.bm(b,c)},
rD:function(){var z,y
for(;z=$.bv,z!=null;){$.bX=null
y=z.gcq()
$.bv=y
if(y==null)$.bW=null
z.gjx().$0()}},
xD:[function(){$.er=!0
try{P.rD()}finally{$.bX=null
$.er=!1
if($.bv!=null)$.$get$eg().$1(P.i6())}},"$0","i6",0,0,7],
i0:function(a){var z=new P.hF(a,null)
if($.bv==null){$.bW=z
$.bv=z
if(!$.er)$.$get$eg().$1(P.i6())}else{$.bW.b=z
$.bW=z}},
rJ:function(a){var z,y,x
z=$.bv
if(z==null){P.i0(a)
$.bX=$.bW
return}y=new P.hF(a,null)
x=$.bX
if(x==null){y.b=z
$.bX=y
$.bv=y}else{y.b=x.b
x.b=y
$.bX=y
if(y.b==null)$.bW=y}},
cC:function(a){var z=$.r
if(C.i===z){P.bx(null,null,C.i,a)
return}z.toString
P.bx(null,null,z,z.eE(a,!0))},
xt:function(a,b){return new P.re(null,a,!1,[b])},
ev:function(a){var z,y,x,w
if(a==null)return
try{a.$0()}catch(x){z=H.C(x)
y=H.E(x)
w=$.r
w.toString
P.bw(null,null,w,z,y)}},
rE:[function(a,b){var z=$.r
z.toString
P.bw(null,null,z,a,b)},function(a){return P.rE(a,null)},"$2","$1","rR",2,2,18,0],
xC:[function(){},"$0","rQ",0,0,7],
i_:function(a,b,c){var z,y,x,w,v,u,t
try{b.$1(a.$0())}catch(u){z=H.C(u)
y=H.E(u)
$.r.toString
x=null
if(x==null)c.$2(z,y)
else{t=x.gbv()
w=t
v=x.gbr()
c.$2(w,v)}}},
rs:function(a,b,c,d){var z=a.ck()
if(!!J.o(z).$isQ&&z!==$.$get$bl())z.c8(new P.ru(b,c,d))
else b.bm(c,d)},
hP:function(a,b){return new P.rt(a,b)},
hQ:function(a,b,c){var z=a.ck()
if(!!J.o(z).$isQ&&z!==$.$get$bl())z.c8(new P.rv(b,c))
else b.bl(c)},
rn:function(a,b,c){$.r.toString
a.cf(b,c)},
pC:function(a,b){var z=$.r
if(z===C.i){z.toString
return P.ec(a,b)}return P.ec(a,z.eE(b,!0))},
ec:function(a,b){var z=C.e.bM(a.a,1000)
return H.pz(z<0?0:z,b)},
pV:function(){return $.r},
bw:function(a,b,c,d,e){var z={}
z.a=d
P.rJ(new P.rH(z,e))},
hX:function(a,b,c,d){var z,y
y=$.r
if(y===c)return d.$0()
$.r=c
z=y
try{y=d.$0()
return y}finally{$.r=z}},
hZ:function(a,b,c,d,e){var z,y
y=$.r
if(y===c)return d.$1(e)
$.r=c
z=y
try{y=d.$1(e)
return y}finally{$.r=z}},
hY:function(a,b,c,d,e,f){var z,y
y=$.r
if(y===c)return d.$2(e,f)
$.r=c
z=y
try{y=d.$2(e,f)
return y}finally{$.r=z}},
bx:function(a,b,c,d){var z=C.i!==c
if(z)d=c.eE(d,!(!z||!1))
P.i0(d)},
qk:{"^":"a:0;a",
$1:function(a){var z,y;--init.globalState.f.b
z=this.a
y=z.a
z.a=null
y.$0()}},
qj:{"^":"a:47;a,b,c",
$1:function(a){var z,y;++init.globalState.f.b
this.a.a=a
z=this.b
y=this.c
z.firstChild?z.removeChild(y):z.appendChild(y)}},
ql:{"^":"a:2;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
qm:{"^":"a:2;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
rq:{"^":"a:0;a",
$1:function(a){return this.a.$2(0,a)}},
rr:{"^":"a:17;a",
$2:function(a,b){this.a.$2(1,new H.dB(a,b))}},
rL:{"^":"a:33;a",
$2:function(a,b){this.a(a,b)}},
ro:{"^":"a:2;a,b",
$0:function(){var z=this.b
if(z.a.gcZ()){z.b=!0
return}this.a.$2(null,0)}},
rp:{"^":"a:0;a,b",
$1:function(a){var z=this.b.c!=null?2:0
this.a.$2(z,null)}},
qn:{"^":"d;a,b,c",
ge2:function(){return this.a.ge2()},
gcZ:function(){return this.a.gcZ()},
geN:function(){return this.c!=null},
t:function(a,b){return J.dr(this.a,b)},
eB:function(a,b){return this.a.eB(a,b)},
bu:function(){return this.a.bu()},
ik:function(a){var z=new P.qq(a)
this.a=new P.qv(null,0,null,new P.qs(z),null,new P.qt(this,z),new P.qu(this,a),[null])},
v:{
qo:function(a){var z=new P.qn(null,!1,null)
z.ik(a)
return z}}},
qq:{"^":"a:2;a",
$0:function(){P.cC(new P.qr(this.a))}},
qr:{"^":"a:2;a",
$0:function(){this.a.$2(0,null)}},
qs:{"^":"a:2;a",
$0:function(){this.a.$0()}},
qt:{"^":"a:2;a,b",
$0:function(){var z=this.a
if(z.b===!0){z.b=!1
this.b.$0()}}},
qu:{"^":"a:2;a,b",
$0:function(){var z=this.a
if(!z.a.gkq()){z.c=new P.cs(new P.H(0,$.r,null,[null]),[null])
if(z.b===!0){z.b=!1
P.cC(new P.qp(this.b))}return z.c.gh8()}}},
qp:{"^":"a:2;a",
$0:function(){this.a.$2(2,null)}},
bT:{"^":"d;ae:a<,b",
k:function(a){return"IterationMarker("+this.b+", "+H.b(this.a)+")"},
v:{
bU:function(a){return new P.bT(a,1)},
aS:function(){return C.ag},
hK:function(a){return new P.bT(a,0)},
aT:function(a){return new P.bT(a,3)}}},
bd:{"^":"d;a,b,c,d",
gU:function(){var z=this.c
return z==null?this.b:z.gU()},
u:function(){var z,y,x,w
for(;!0;){z=this.c
if(z!=null)if(z.u())return!0
else this.c=null
y=function(a,b,c){var v,u=b
while(true)try{return a(u,v)}catch(t){v=t
u=c}}(this.a,0,1)
if(y instanceof P.bT){x=y.b
if(x===2){z=this.d
if(z==null||z.length===0){this.b=null
return!1}if(0>=z.length)return H.f(z,-1)
this.a=z.pop()
continue}else{z=y.a
if(x===3)throw z
else{w=J.aj(z)
if(!!w.$isbd){z=this.d
if(z==null){z=[]
this.d=z}z.push(this.a)
this.a=w.a
continue}else{this.c=w
continue}}}}else{this.b=y
return!0}}return!1}},
ri:{"^":"ce;a",
ga_:function(a){return new P.bd(this.a(),null,null,null)},
$asce:I.bg,
$asB:I.bg,
v:{
aU:function(a){return new P.ri(a)}}},
Q:{"^":"d;$ti"},
hH:{"^":"d;h8:a<,$ti",
eH:function(a,b){if(a==null)a=new P.cY()
if(this.a.a!==0)throw H.c(new P.w("Future already completed"))
$.r.toString
this.bm(a,b)},
dF:function(a){return this.eH(a,null)}},
cs:{"^":"hH;a,$ti",
bZ:function(a){var z=this.a
if(z.a!==0)throw H.c(new P.w("Future already completed"))
z.bC(a)},
eG:function(){return this.bZ(null)},
bm:function(a,b){this.a.fk(a,b)}},
rh:{"^":"hH;a,$ti",
bZ:function(a){var z=this.a
if(z.a!==0)throw H.c(new P.w("Future already completed"))
z.bl(a)},
eG:function(){return this.bZ(null)},
bm:function(a,b){this.a.bm(a,b)}},
el:{"^":"d;em:a<,b,c,d,e,$ti",
gjg:function(){return this.b.b},
gha:function(){return(this.c&1)!==0},
gk9:function(){return(this.c&2)!==0},
gh9:function(){return this.c===8},
k7:function(a){return this.b.b.eZ(this.d,a)},
kA:function(a){if(this.c!==6)return!0
return this.b.b.eZ(this.d,a.gbv())},
k_:function(a){var z,y
z=this.e
y=this.b.b
if(H.ay(z,{func:1,args:[,,]}))return y.kZ(z,a.gbv(),a.gbr())
else return y.eZ(z,a.gbv())},
k8:function(){return this.b.b.hy(this.d)}},
H:{"^":"d;cM:a<,b,j4:c<,$ti",
giQ:function(){return this.a===2},
gei:function(){return this.a>=4},
f_:function(a,b){var z=$.r
if(z!==C.i){z.toString
if(b!=null)b=P.eu(b,z)}return this.ex(a,b)},
c7:function(a){return this.f_(a,null)},
ex:function(a,b){var z,y
z=new P.H(0,$.r,null,[null])
y=b==null?1:3
this.dn(new P.el(null,z,y,a,b,[H.m(this,0),null]))
return z},
c8:function(a){var z,y
z=$.r
y=new P.H(0,z,null,this.$ti)
if(z!==C.i)z.toString
z=H.m(this,0)
this.dn(new P.el(null,y,8,a,null,[z,z]))
return y},
dn:function(a){var z,y
z=this.a
if(z<=1){a.a=this.c
this.c=a}else{if(z===2){y=this.c
if(!y.gei()){y.dn(a)
return}this.a=y.a
this.c=y.c}z=this.b
z.toString
P.bx(null,null,z,new P.qF(this,a))}},
fI:function(a){var z,y,x,w,v
z={}
z.a=a
if(a==null)return
y=this.a
if(y<=1){x=this.c
this.c=a
if(x!=null){for(w=a;w.gem()!=null;)w=w.a
w.a=x}}else{if(y===2){v=this.c
if(!v.gei()){v.fI(a)
return}this.a=v.a
this.c=v.c}z.a=this.dw(a)
y=this.b
y.toString
P.bx(null,null,y,new P.qM(z,this))}},
dv:function(){var z=this.c
this.c=null
return this.dw(z)},
dw:function(a){var z,y,x
for(z=a,y=null;z!=null;y=z,z=x){x=z.gem()
z.a=y}return y},
bl:function(a){var z,y
z=this.$ti
if(H.aV(a,"$isQ",z,"$asQ"))if(H.aV(a,"$isH",z,null))P.da(a,this)
else P.hJ(a,this)
else{y=this.dv()
this.a=4
this.c=a
P.bt(this,y)}},
bm:[function(a,b){var z=this.dv()
this.a=8
this.c=new P.cI(a,b)
P.bt(this,z)},function(a){return this.bm(a,null)},"lg","$2","$1","gbV",2,2,18,0],
bC:function(a){var z
if(H.aV(a,"$isQ",this.$ti,"$asQ")){this.iv(a)
return}this.a=1
z=this.b
z.toString
P.bx(null,null,z,new P.qH(this,a))},
iv:function(a){var z
if(H.aV(a,"$isH",this.$ti,null)){if(a.a===8){this.a=1
z=this.b
z.toString
P.bx(null,null,z,new P.qL(this,a))}else P.da(a,this)
return}P.hJ(a,this)},
fk:function(a,b){var z
this.a=1
z=this.b
z.toString
P.bx(null,null,z,new P.qG(this,a,b))},
im:function(a,b){this.a=4
this.c=a},
$isQ:1,
v:{
hJ:function(a,b){var z,y,x
b.a=1
try{a.f_(new P.qI(b),new P.qJ(b))}catch(x){z=H.C(x)
y=H.E(x)
P.cC(new P.qK(b,z,y))}},
da:function(a,b){var z,y,x
for(;a.giQ();)a=a.c
z=a.gei()
y=b.c
if(z){b.c=null
x=b.dw(y)
b.a=a.a
b.c=a.c
P.bt(b,x)}else{b.a=2
b.c=a
a.fI(y)}},
bt:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z={}
z.a=a
for(y=a;!0;){x={}
w=y.a===8
if(b==null){if(w){v=y.c
y=y.b
u=v.gbv()
t=v.gbr()
y.toString
P.bw(null,null,y,u,t)}return}for(;b.gem()!=null;b=s){s=b.a
b.a=null
P.bt(z.a,b)}r=z.a.c
x.a=w
x.b=r
y=!w
if(!y||b.gha()||b.gh9()){q=b.gjg()
if(w){u=z.a.b
u.toString
u=u==null?q==null:u===q
if(!u)q.toString
else u=!0
u=!u}else u=!1
if(u){y=z.a
v=y.c
y=y.b
u=v.gbv()
t=v.gbr()
y.toString
P.bw(null,null,y,u,t)
return}p=$.r
if(p==null?q!=null:p!==q)$.r=q
else p=null
if(b.gh9())new P.qP(z,x,w,b).$0()
else if(y){if(b.gha())new P.qO(x,b,r).$0()}else if(b.gk9())new P.qN(z,x,b).$0()
if(p!=null)$.r=p
y=x.b
if(!!J.o(y).$isQ){o=b.b
if(y.a>=4){n=o.c
o.c=null
b=o.dw(n)
o.a=y.a
o.c=y.c
z.a=y
continue}else P.da(y,o)
return}}o=b.b
b=o.dv()
y=x.a
u=x.b
if(!y){o.a=4
o.c=u}else{o.a=8
o.c=u}z.a=o
y=o}}}},
qF:{"^":"a:2;a,b",
$0:function(){P.bt(this.a,this.b)}},
qM:{"^":"a:2;a,b",
$0:function(){P.bt(this.b,this.a.a)}},
qI:{"^":"a:0;a",
$1:function(a){var z=this.a
z.a=0
z.bl(a)}},
qJ:{"^":"a:52;a",
$2:function(a,b){this.a.bm(a,b)},
$1:function(a){return this.$2(a,null)}},
qK:{"^":"a:2;a,b,c",
$0:function(){this.a.bm(this.b,this.c)}},
qH:{"^":"a:2;a,b",
$0:function(){var z,y
z=this.a
y=z.dv()
z.a=4
z.c=this.b
P.bt(z,y)}},
qL:{"^":"a:2;a,b",
$0:function(){P.da(this.b,this.a)}},
qG:{"^":"a:2;a,b,c",
$0:function(){this.a.bm(this.b,this.c)}},
qP:{"^":"a:7;a,b,c,d",
$0:function(){var z,y,x,w,v,u,t
z=null
try{z=this.d.k8()}catch(w){y=H.C(w)
x=H.E(w)
if(this.c){v=this.a.a.c.gbv()
u=y
u=v==null?u==null:v===u
v=u}else v=!1
u=this.b
if(v)u.b=this.a.a.c
else u.b=new P.cI(y,x)
u.a=!0
return}if(!!J.o(z).$isQ){if(z instanceof P.H&&z.gcM()>=4){if(z.gcM()===8){v=this.b
v.b=z.gj4()
v.a=!0}return}t=this.a.a
v=this.b
v.b=z.c7(new P.qQ(t))
v.a=!1}}},
qQ:{"^":"a:0;a",
$1:function(a){return this.a}},
qO:{"^":"a:7;a,b,c",
$0:function(){var z,y,x,w
try{this.a.b=this.b.k7(this.c)}catch(x){z=H.C(x)
y=H.E(x)
w=this.a
w.b=new P.cI(z,y)
w.a=!0}}},
qN:{"^":"a:7;a,b,c",
$0:function(){var z,y,x,w,v,u,t,s
try{z=this.a.a.c
w=this.c
if(w.kA(z)===!0&&w.e!=null){v=this.b
v.b=w.k_(z)
v.a=!1}}catch(u){y=H.C(u)
x=H.E(u)
w=this.a
v=w.a.c.gbv()
t=y
s=this.b
if(v==null?t==null:v===t)s.b=w.a.c
else s.b=new P.cI(y,x)
s.a=!0}}},
hF:{"^":"d;jx:a<,cq:b@"},
al:{"^":"d;$ti",
aJ:function(a,b){return new P.r3(b,this,[H.y(this,"al",0),null])},
a7:function(a,b){var z,y
z={}
y=new P.H(0,$.r,null,[P.X])
z.a=null
z.a=this.aI(new P.oX(z,this,b,y),!0,new P.oY(y),y.gbV())
return y},
Z:function(a,b){var z,y
z={}
y=new P.H(0,$.r,null,[null])
z.a=null
z.a=this.aI(new P.p0(z,this,b,y),!0,new P.p1(y),y.gbV())
return y},
gl:function(a){var z,y
z={}
y=new P.H(0,$.r,null,[P.t])
z.a=0
this.aI(new P.p6(z),!0,new P.p7(z,y),y.gbV())
return y},
gY:function(a){var z,y
z={}
y=new P.H(0,$.r,null,[P.X])
z.a=null
z.a=this.aI(new P.p2(z,y),!0,new P.p3(y),y.gbV())
return y},
cw:function(a){var z,y,x
z=H.y(this,"al",0)
y=H.p([],[z])
x=new P.H(0,$.r,null,[[P.N,z]])
this.aI(new P.p8(this,y),!0,new P.p9(y,x),x.gbV())
return x},
bG:function(a){var z,y,x
z=H.y(this,"al",0)
y=P.a6(null,null,null,z)
x=new P.H(0,$.r,null,[[P.bO,z]])
this.aI(new P.pa(this,y),!0,new P.pb(y,x),x.gbV())
return x},
gw:function(a){var z,y
z={}
y=new P.H(0,$.r,null,[H.y(this,"al",0)])
z.a=null
z.b=!1
this.aI(new P.p4(z,this),!0,new P.p5(z,y),y.gbV())
return y}},
oX:{"^":"a;a,b,c,d",
$1:function(a){var z,y
z=this.a
y=this.d
P.i_(new P.oV(this.c,a),new P.oW(z,y),P.hP(z.a,y))},
$S:function(){return H.be(function(a){return{func:1,args:[a]}},this.b,"al")}},
oV:{"^":"a:2;a,b",
$0:function(){return J.e(this.b,this.a)}},
oW:{"^":"a:31;a,b",
$1:function(a){if(a===!0)P.hQ(this.a.a,this.b,!0)}},
oY:{"^":"a:2;a",
$0:function(){this.a.bl(!1)}},
p0:{"^":"a;a,b,c,d",
$1:function(a){P.i_(new P.oZ(this.c,a),new P.p_(),P.hP(this.a.a,this.d))},
$S:function(){return H.be(function(a){return{func:1,args:[a]}},this.b,"al")}},
oZ:{"^":"a:2;a,b",
$0:function(){return this.a.$1(this.b)}},
p_:{"^":"a:0;",
$1:function(a){}},
p1:{"^":"a:2;a",
$0:function(){this.a.bl(null)}},
p6:{"^":"a:0;a",
$1:function(a){++this.a.a}},
p7:{"^":"a:2;a,b",
$0:function(){this.b.bl(this.a.a)}},
p2:{"^":"a:0;a,b",
$1:function(a){P.hQ(this.a.a,this.b,!1)}},
p3:{"^":"a:2;a",
$0:function(){this.a.bl(!0)}},
p8:{"^":"a;a,b",
$1:function(a){this.b.push(a)},
$S:function(){return H.be(function(a){return{func:1,args:[a]}},this.a,"al")}},
p9:{"^":"a:2;a,b",
$0:function(){this.b.bl(this.a)}},
pa:{"^":"a;a,b",
$1:function(a){this.b.t(0,a)},
$S:function(){return H.be(function(a){return{func:1,args:[a]}},this.a,"al")}},
pb:{"^":"a:2;a,b",
$0:function(){this.b.bl(this.a)}},
p4:{"^":"a;a,b",
$1:function(a){var z=this.a
z.b=!0
z.a=a},
$S:function(){return H.be(function(a){return{func:1,args:[a]}},this.b,"al")}},
p5:{"^":"a:2;a,b",
$0:function(){var z,y,x,w
x=this.a
if(x.b){this.b.bl(x.a)
return}try{x=H.ah()
throw H.c(x)}catch(w){z=H.C(w)
y=H.E(w)
P.rz(this.b,z,y)}}},
dc:{"^":"d;cM:b<,$ti",
ge2:function(){return new P.d8(this,this.$ti)},
gkq:function(){return(this.b&4)!==0},
gcZ:function(){var z=this.b
return(z&1)!==0?this.gbL().gfD():(z&2)===0},
giY:function(){if((this.b&8)===0)return this.a
return this.a.gda()},
eb:function(){var z,y
if((this.b&8)===0){z=this.a
if(z==null){z=new P.en(null,null,0,this.$ti)
this.a=z}return z}y=this.a
if(y.gda()==null)y.c=new P.en(null,null,0,this.$ti)
return y.c},
gbL:function(){if((this.b&8)!==0)return this.a.gda()
return this.a},
cC:function(){if((this.b&4)!==0)return new P.w("Cannot add event after closing")
return new P.w("Cannot add event while adding a stream")},
jv:function(a,b){var z,y,x,w
z=this.b
if(z>=4)throw H.c(this.cC())
if((z&2)!==0){z=new P.H(0,$.r,null,[null])
z.bC(null)
return z}z=this.a
y=new P.H(0,$.r,null,[null])
x=a.aI(this.git(),!1,this.giu(),this.giq())
w=this.b
if((w&1)!==0?this.gbL().gfD():(w&2)===0)x.d3()
this.a=new P.ra(z,y,x,this.$ti)
this.b|=8
return y},
fs:function(){var z=this.c
if(z==null){z=(this.b&2)!==0?$.$get$bl():new P.H(0,$.r,null,[null])
this.c=z}return z},
t:[function(a,b){if(this.b>=4)throw H.c(this.cC())
this.bU(b)},"$1","gji",2,0,function(){return H.be(function(a){return{func:1,v:true,args:[a]}},this.$receiver,"dc")}],
eB:function(a,b){if(this.b>=4)throw H.c(this.cC())
if(a==null)a=new P.cY()
$.r.toString
this.cf(a,b)},
bu:function(){var z=this.b
if((z&4)!==0)return this.fs()
if(z>=4)throw H.c(this.cC())
z|=4
this.b=z
if((z&1)!==0)this.cK()
else if((z&3)===0)this.eb().t(0,C.v)
return this.fs()},
bU:[function(a){var z=this.b
if((z&1)!==0)this.cJ(a)
else if((z&3)===0)this.eb().t(0,new P.eh(a,null,this.$ti))},"$1","git",2,0,function(){return H.be(function(a){return{func:1,v:true,args:[a]}},this.$receiver,"dc")}],
cf:[function(a,b){var z=this.b
if((z&1)!==0)this.cL(a,b)
else if((z&3)===0)this.eb().t(0,new P.ei(a,b,null))},"$2","giq",4,0,48],
e5:[function(){var z=this.a
this.a=z.gda()
this.b&=4294967287
z.a.bC(null)},"$0","giu",0,0,7],
jb:function(a,b,c,d){var z,y,x,w,v
if((this.b&3)!==0)throw H.c(new P.w("Stream has already been listened to."))
z=$.r
y=d?1:0
x=new P.qz(this,null,null,null,z,y,null,null,this.$ti)
x.fh(a,b,c,d,H.m(this,0))
w=this.giY()
y=this.b|=1
if((y&8)!==0){v=this.a
v.sda(x)
v.b.d6()}else this.a=x
x.j9(w)
x.eg(new P.rc(this))
return x},
j1:function(a){var z,y,x,w,v,u
z=null
if((this.b&8)!==0)z=this.a.ck()
this.a=null
this.b=this.b&4294967286|2
w=this.r
if(w!=null)if(z==null)try{z=w.$0()}catch(v){y=H.C(v)
x=H.E(v)
u=new P.H(0,$.r,null,[null])
u.fk(y,x)
z=u}else z=z.c8(w)
w=new P.rb(this)
if(z!=null)z=z.c8(w)
else w.$0()
return z}},
rc:{"^":"a:2;a",
$0:function(){P.ev(this.a.d)}},
rb:{"^":"a:7;a",
$0:function(){var z=this.a.c
if(z!=null&&z.a===0)z.bC(null)}},
rk:{"^":"d;$ti",
cJ:function(a){this.gbL().bU(a)},
cL:function(a,b){this.gbL().cf(a,b)},
cK:function(){this.gbL().e5()}},
qw:{"^":"d;$ti",
cJ:function(a){this.gbL().cg(new P.eh(a,null,[H.m(this,0)]))},
cL:function(a,b){this.gbL().cg(new P.ei(a,b,null))},
cK:function(){this.gbL().cg(C.v)}},
qv:{"^":"dc+qw;a,b,c,d,e,f,r,$ti"},
rj:{"^":"dc+rk;a,b,c,d,e,f,r,$ti"},
d8:{"^":"rd;a,$ti",
gD:function(a){return(H.aE(this.a)^892482866)>>>0},
A:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof P.d8))return!1
return b.a===this.a}},
qz:{"^":"ct;x,a,b,c,d,e,f,r,$ti",
en:function(){return this.x.j1(this)},
ep:[function(){var z=this.x
if((z.b&8)!==0)z.a.d3()
P.ev(z.e)},"$0","geo",0,0,7],
er:[function(){var z=this.x
if((z.b&8)!==0)z.a.d6()
P.ev(z.f)},"$0","geq",0,0,7]},
qf:{"^":"d;$ti",
d3:function(){this.b.d3()},
d6:function(){this.b.d6()},
ck:function(){var z=this.b.ck()
if(z==null){this.a.bC(null)
return}return z.c8(new P.qg(this))},
eG:function(){this.a.bC(null)}},
qg:{"^":"a:2;a",
$0:function(){this.a.a.bC(null)}},
ra:{"^":"qf;da:c@,a,b,$ti"},
ct:{"^":"d;cM:e<,$ti",
j9:function(a){if(a==null)return
this.r=a
if(!a.gY(a)){this.e=(this.e|64)>>>0
this.r.dg(this)}},
kH:function(a){var z=this.e
if((z&8)!==0)return
this.e=(z+128|4)>>>0
if(z<128&&this.r!=null)this.r.fW()
if((z&4)===0&&(this.e&32)===0)this.eg(this.geo())},
d3:function(){return this.kH(null)},
d6:function(){var z=this.e
if((z&8)!==0)return
if(z>=128){z-=128
this.e=z
if(z<128){if((z&64)!==0){z=this.r
z=!z.gY(z)}else z=!1
if(z)this.r.dg(this)
else{z=(this.e&4294967291)>>>0
this.e=z
if((z&32)===0)this.eg(this.geq())}}}},
ck:function(){var z=(this.e&4294967279)>>>0
this.e=z
if((z&8)===0)this.e6()
z=this.f
return z==null?$.$get$bl():z},
gfD:function(){return(this.e&4)!==0},
gcZ:function(){return this.e>=128},
e6:function(){var z=(this.e|8)>>>0
this.e=z
if((z&64)!==0)this.r.fW()
if((this.e&32)===0)this.r=null
this.f=this.en()},
bU:["i6",function(a){var z=this.e
if((z&8)!==0)return
if(z<32)this.cJ(a)
else this.cg(new P.eh(a,null,[H.y(this,"ct",0)]))}],
cf:["i7",function(a,b){var z=this.e
if((z&8)!==0)return
if(z<32)this.cL(a,b)
else this.cg(new P.ei(a,b,null))}],
e5:function(){var z=this.e
if((z&8)!==0)return
z=(z|2)>>>0
this.e=z
if(z<32)this.cK()
else this.cg(C.v)},
ep:[function(){},"$0","geo",0,0,7],
er:[function(){},"$0","geq",0,0,7],
en:function(){return},
cg:function(a){var z,y
z=this.r
if(z==null){z=new P.en(null,null,0,[H.y(this,"ct",0)])
this.r=z}z.t(0,a)
y=this.e
if((y&64)===0){y=(y|64)>>>0
this.e=y
if(y<128)this.r.dg(this)}},
cJ:function(a){var z=this.e
this.e=(z|32)>>>0
this.d.hB(this.a,a)
this.e=(this.e&4294967263)>>>0
this.e8((z&4)!==0)},
cL:function(a,b){var z,y
z=this.e
y=new P.qy(this,a,b)
if((z&1)!==0){this.e=(z|16)>>>0
this.e6()
z=this.f
if(!!J.o(z).$isQ&&z!==$.$get$bl())z.c8(y)
else y.$0()}else{y.$0()
this.e8((z&4)!==0)}},
cK:function(){var z,y
z=new P.qx(this)
this.e6()
this.e=(this.e|16)>>>0
y=this.f
if(!!J.o(y).$isQ&&y!==$.$get$bl())y.c8(z)
else z.$0()},
eg:function(a){var z=this.e
this.e=(z|32)>>>0
a.$0()
this.e=(this.e&4294967263)>>>0
this.e8((z&4)!==0)},
e8:function(a){var z,y
if((this.e&64)!==0){z=this.r
z=z.gY(z)}else z=!1
if(z){z=(this.e&4294967231)>>>0
this.e=z
if((z&4)!==0)if(z<128){z=this.r
z=z==null||z.gY(z)}else z=!1
else z=!1
if(z)this.e=(this.e&4294967291)>>>0}for(;!0;a=y){z=this.e
if((z&8)!==0){this.r=null
return}y=(z&4)!==0
if(a===y)break
this.e=(z^32)>>>0
if(y)this.ep()
else this.er()
this.e=(this.e&4294967263)>>>0}z=this.e
if((z&64)!==0&&z<128)this.r.dg(this)},
fh:function(a,b,c,d,e){var z=this.d
z.toString
this.a=a
this.b=P.eu(b==null?P.rR():b,z)
this.c=c==null?P.rQ():c}},
qy:{"^":"a:7;a,b,c",
$0:function(){var z,y,x,w,v,u
z=this.a
y=z.e
if((y&8)!==0&&(y&16)===0)return
z.e=(y|32)>>>0
y=z.b
x=H.ay(y,{func:1,args:[P.d,P.b1]})
w=z.d
v=this.b
u=z.b
if(x)w.l_(u,v,this.c)
else w.hB(u,v)
z.e=(z.e&4294967263)>>>0}},
qx:{"^":"a:7;a",
$0:function(){var z,y
z=this.a
y=z.e
if((y&16)===0)return
z.e=(y|42)>>>0
z.d.hz(z.c)
z.e=(z.e&4294967263)>>>0}},
rd:{"^":"al;$ti",
aI:function(a,b,c,d){return this.a.jb(a,d,c,!0===b)},
eT:function(a,b,c){return this.aI(a,null,b,c)}},
ej:{"^":"d;cq:a@,$ti"},
eh:{"^":"ej;ae:b<,a,$ti",
eU:function(a){a.cJ(this.b)}},
ei:{"^":"ej;bv:b<,br:c<,a",
eU:function(a){a.cL(this.b,this.c)},
$asej:I.bg},
qA:{"^":"d;",
eU:function(a){a.cK()},
gcq:function(){return},
scq:function(a){throw H.c(new P.w("No events after a done."))}},
r5:{"^":"d;cM:a<,$ti",
dg:function(a){var z=this.a
if(z===1)return
if(z>=1){this.a=1
return}P.cC(new P.r6(this,a))
this.a=1},
fW:function(){if(this.a===1)this.a=3}},
r6:{"^":"a:2;a,b",
$0:function(){var z,y,x,w
z=this.a
y=z.a
z.a=0
if(y===3)return
x=z.b
w=x.gcq()
z.b=w
if(w==null)z.c=null
x.eU(this.b)}},
en:{"^":"r5;b,c,a,$ti",
gY:function(a){return this.c==null},
t:function(a,b){var z=this.c
if(z==null){this.c=b
this.b=b}else{z.scq(b)
this.c=b}}},
re:{"^":"d;a,b,c,$ti"},
ru:{"^":"a:2;a,b,c",
$0:function(){return this.a.bm(this.b,this.c)}},
rt:{"^":"a:17;a,b",
$2:function(a,b){P.rs(this.a,this.b,a,b)}},
rv:{"^":"a:2;a,b",
$0:function(){return this.a.bl(this.b)}},
ek:{"^":"al;$ti",
aI:function(a,b,c,d){return this.iC(a,d,c,!0===b)},
eT:function(a,b,c){return this.aI(a,null,b,c)},
iC:function(a,b,c,d){return P.qE(this,a,b,c,d,H.y(this,"ek",0),H.y(this,"ek",1))},
fA:function(a,b){b.bU(a)},
iO:function(a,b,c){c.cf(a,b)},
$asal:function(a,b){return[b]}},
hI:{"^":"ct;x,y,a,b,c,d,e,f,r,$ti",
bU:function(a){if((this.e&2)!==0)return
this.i6(a)},
cf:function(a,b){if((this.e&2)!==0)return
this.i7(a,b)},
ep:[function(){var z=this.y
if(z==null)return
z.d3()},"$0","geo",0,0,7],
er:[function(){var z=this.y
if(z==null)return
z.d6()},"$0","geq",0,0,7],
en:function(){var z=this.y
if(z!=null){this.y=null
return z.ck()}return},
li:[function(a){this.x.fA(a,this)},"$1","giL",2,0,function(){return H.be(function(a,b){return{func:1,v:true,args:[a]}},this.$receiver,"hI")}],
lk:[function(a,b){this.x.iO(a,b,this)},"$2","giN",4,0,40],
lj:[function(){this.e5()},"$0","giM",0,0,7],
il:function(a,b,c,d,e,f,g){this.y=this.x.a.eT(this.giL(),this.giM(),this.giN())},
$asct:function(a,b){return[b]},
v:{
qE:function(a,b,c,d,e,f,g){var z,y
z=$.r
y=e?1:0
y=new P.hI(a,null,null,null,null,z,y,null,null,[f,g])
y.fh(b,c,d,e,g)
y.il(a,b,c,d,e,f,g)
return y}}},
r3:{"^":"ek;b,a,$ti",
fA:function(a,b){var z,y,x,w
z=null
try{z=this.b.$1(a)}catch(w){y=H.C(w)
x=H.E(w)
P.rn(b,y,x)
return}b.bU(z)}},
cI:{"^":"d;bv:a<,br:b<",
k:function(a){return H.b(this.a)},
$isa5:1},
rm:{"^":"d;"},
rH:{"^":"a:2;a,b",
$0:function(){var z,y,x
z=this.a
y=z.a
if(y==null){x=new P.cY()
z.a=x
z=x}else z=y
y=this.b
if(y==null)throw H.c(z)
x=H.c(z)
x.stack=J.h(y)
throw x}},
r7:{"^":"rm;",
hz:function(a){var z,y,x,w
try{if(C.i===$.r){x=a.$0()
return x}x=P.hX(null,null,this,a)
return x}catch(w){z=H.C(w)
y=H.E(w)
x=P.bw(null,null,this,z,y)
return x}},
hB:function(a,b){var z,y,x,w
try{if(C.i===$.r){x=a.$1(b)
return x}x=P.hZ(null,null,this,a,b)
return x}catch(w){z=H.C(w)
y=H.E(w)
x=P.bw(null,null,this,z,y)
return x}},
l_:function(a,b,c){var z,y,x,w
try{if(C.i===$.r){x=a.$2(b,c)
return x}x=P.hY(null,null,this,a,b,c)
return x}catch(w){z=H.C(w)
y=H.E(w)
x=P.bw(null,null,this,z,y)
return x}},
eE:function(a,b){if(b)return new P.r8(this,a)
else return new P.r9(this,a)},
j:function(a,b){return},
hy:function(a){if($.r===C.i)return a.$0()
return P.hX(null,null,this,a)},
eZ:function(a,b){if($.r===C.i)return a.$1(b)
return P.hZ(null,null,this,a,b)},
kZ:function(a,b,c){if($.r===C.i)return a.$2(b,c)
return P.hY(null,null,this,a,b,c)}},
r8:{"^":"a:2;a,b",
$0:function(){return this.a.hz(this.b)}},
r9:{"^":"a:2;a,b",
$0:function(){return this.a.hy(this.b)}}}],["","",,P,{"^":"",
dN:function(a,b){return new H.R(0,null,null,null,null,null,0,[a,b])},
b_:function(){return new H.R(0,null,null,null,null,null,0,[null,null])},
a0:function(a){return H.ug(a,new H.R(0,null,null,null,null,null,0,[null,null]))},
m4:function(a,b,c){var z,y
if(P.es(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}z=[]
y=$.$get$bY()
y.push(a)
try{P.rC(a,z)}finally{if(0>=y.length)return H.f(y,-1)
y.pop()}y=P.hc(b,z,", ")+c
return y.charCodeAt(0)==0?y:y},
cf:function(a,b,c){var z,y,x
if(P.es(a))return b+"..."+c
z=new P.bR(b)
y=$.$get$bY()
y.push(a)
try{x=z
x.E=P.hc(x.gE(),a,", ")}finally{if(0>=y.length)return H.f(y,-1)
y.pop()}y=z
y.E=y.gE()+c
y=z.gE()
return y.charCodeAt(0)==0?y:y},
es:function(a){var z,y
for(z=0;y=$.$get$bY(),z<y.length;++z)if(a===y[z])return!0
return!1},
rC:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=a.ga_(a)
y=0
x=0
while(!0){if(!(y<80||x<3))break
if(!z.u())return
w=H.b(z.gU())
b.push(w)
y+=w.length+2;++x}if(!z.u()){if(x<=5)return
if(0>=b.length)return H.f(b,-1)
v=b.pop()
if(0>=b.length)return H.f(b,-1)
u=b.pop()}else{t=z.gU();++x
if(!z.u()){if(x<=4){b.push(H.b(t))
return}v=H.b(t)
if(0>=b.length)return H.f(b,-1)
u=b.pop()
y+=v.length+2}else{s=z.gU();++x
for(;z.u();t=s,s=r){r=z.gU();++x
if(x>100){while(!0){if(!(y>75&&x>3))break
if(0>=b.length)return H.f(b,-1)
y-=b.pop().length+2;--x}b.push("...")
return}}u=H.b(t)
v=H.b(s)
y+=v.length+u.length+4}}if(x>b.length+2){y+=5
q="..."}else q=null
while(!0){if(!(y>80&&b.length>3))break
if(0>=b.length)return H.f(b,-1)
y-=b.pop().length+2
if(q==null){y+=5
q="..."}}if(q!=null)b.push(q)
b.push(u)
b.push(v)},
mq:function(a,b,c,d,e){return new H.R(0,null,null,null,null,null,0,[d,e])},
cj:function(a,b,c){var z=P.mq(null,null,null,b,c)
a.Z(0,new P.rT(z))
return z},
a6:function(a,b,c,d){return new P.hL(0,null,null,null,null,null,0,[d])},
b9:function(a,b){var z,y
z=P.a6(null,null,null,b)
for(y=J.aj(a);y.u();)z.t(0,y.gU())
return z},
dS:function(a){var z,y,x
z={}
if(P.es(a))return"{...}"
y=new P.bR("")
try{$.$get$bY().push(a)
x=y
x.E=x.gE()+"{"
z.a=!0
a.Z(0,new P.mB(z,y))
z=y
z.E=z.gE()+"}"}finally{z=$.$get$bY()
if(0>=z.length)return H.f(z,-1)
z.pop()}z=y.gE()
return z.charCodeAt(0)==0?z:z},
hM:{"^":"R;a,b,c,d,e,f,r,$ti",
cX:function(a){return H.v3(a)&0x3ffffff},
cY:function(a,b){var z,y,x
if(a==null)return-1
z=a.length
for(y=0;y<z;++y){x=a[y].ghc()
if(x==null?b==null:x===b)return y}return-1},
v:{
bV:function(a,b){return new P.hM(0,null,null,null,null,null,0,[a,b])}}},
hL:{"^":"qR;a,b,c,d,e,f,r,$ti",
el:function(){return new P.hL(0,null,null,null,null,null,0,this.$ti)},
ga_:function(a){var z=new P.af(this,this.r,null,null,[null])
z.c=this.e
return z},
gl:function(a){return this.a},
gY:function(a){return this.a===0},
gav:function(a){return this.a!==0},
a7:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null)return!1
return z[b]!=null}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null)return!1
return y[b]!=null}else return this.iA(b)},
iA:function(a){var z=this.d
if(z==null)return!1
return this.ds(z[this.dr(a)],a)>=0},
cp:function(a){var z
if(!(typeof a==="string"&&a!=="__proto__"))z=typeof a==="number"&&(a&0x3ffffff)===a
else z=!0
if(z)return this.a7(0,a)?a:null
else return this.iS(a)},
iS:function(a){var z,y,x
z=this.d
if(z==null)return
y=z[this.dr(a)]
x=this.ds(y,a)
if(x<0)return
return J.aA(y,x).gfq()},
Z:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$1(z.a)
if(y!==this.r)throw H.c(new P.D(this))
z=z.b}},
gw:function(a){var z=this.f
if(z==null)throw H.c(new P.w("No elements"))
return z.a},
t:function(a,b){var z,y,x
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.b=y
z=y}return this.fl(z,b)}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.c=y
x=y}return this.fl(x,b)}else return this.aE(b)},
aE:function(a){var z,y,x
z=this.d
if(z==null){z=P.r_()
this.d=z}y=this.dr(a)
x=z[y]
if(x==null)z[y]=[this.e9(a)]
else{if(this.ds(x,a)>=0)return!1
x.push(this.e9(a))}return!0},
a3:function(a,b){if(typeof b==="string"&&b!=="__proto__")return this.fm(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.fm(this.c,b)
else return this.j2(b)},
j2:function(a){var z,y,x
z=this.d
if(z==null)return!1
y=z[this.dr(a)]
x=this.ds(y,a)
if(x<0)return!1
this.fn(y.splice(x,1)[0])
return!0},
iI:function(a,b){var z,y,x,w,v
z=this.e
for(;z!=null;z=x){y=z.a
x=z.b
w=this.r
v=a.$1(y)
if(w!==this.r)throw H.c(new P.D(this))
if(b===v)this.a3(0,y)}},
bh:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
fl:function(a,b){if(a[b]!=null)return!1
a[b]=this.e9(b)
return!0},
fm:function(a,b){var z
if(a==null)return!1
z=a[b]
if(z==null)return!1
this.fn(z)
delete a[b]
return!0},
e9:function(a){var z,y
z=new P.qZ(a,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.c=y
y.b=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
fn:function(a){var z,y
z=a.giz()
y=a.b
if(z==null)this.e=y
else z.b=y
if(y==null)this.f=z
else y.c=z;--this.a
this.r=this.r+1&67108863},
dr:function(a){return J.j(a)&0x3ffffff},
ds:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.e(a[y].gfq(),b))return y
return-1},
$isbO:1,
$isa_:1,
v:{
r_:function(){var z=Object.create(null)
z["<non-identifier-key>"]=z
delete z["<non-identifier-key>"]
return z}}},
qZ:{"^":"d;fq:a<,b,iz:c<"},
af:{"^":"d;a,b,c,d,$ti",
gU:function(){return this.d},
u:function(){var z=this.a
if(this.b!==z.r)throw H.c(new P.D(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.b
return!0}}}},
qR:{"^":"oj;$ti",
bG:function(a){var z=this.el()
z.ax(0,this)
return z}},
ce:{"^":"B;$ti"},
rT:{"^":"a:6;a",
$2:function(a,b){this.a.p(0,a,b)}},
fs:{"^":"fB;$ti"},
fB:{"^":"d+ba;$ti",$asN:null,$asa_:null,$isN:1,$isa_:1},
ba:{"^":"d;$ti",
ga_:function(a){return new H.dO(this,this.gl(this),0,null,[H.y(this,"ba",0)])},
au:function(a,b){return this.j(0,b)},
Z:function(a,b){var z,y
z=this.gl(this)
for(y=0;y<z;++y){b.$1(this.j(0,y))
if(z!==this.gl(this))throw H.c(new P.D(this))}},
gY:function(a){return this.gl(this)===0},
gav:function(a){return!this.gY(this)},
gw:function(a){if(this.gl(this)===0)throw H.c(H.ah())
return this.j(0,this.gl(this)-1)},
a7:function(a,b){var z,y
z=this.gl(this)
for(y=0;y<this.gl(this);++y){if(J.e(this.j(0,y),b))return!0
if(z!==this.gl(this))throw H.c(new P.D(this))}return!1},
bt:function(a,b){var z,y
z=this.gl(this)
for(y=0;y<z;++y){if(b.$1(this.j(0,y))===!0)return!0
if(z!==this.gl(this))throw H.c(new P.D(this))}return!1},
aU:function(a,b,c){var z,y,x
z=this.gl(this)
for(y=0;y<z;++y){x=this.j(0,y)
if(b.$1(x)===!0)return x
if(z!==this.gl(this))throw H.c(new P.D(this))}return c.$0()},
aJ:function(a,b){return new H.aq(this,b,[H.y(this,"ba",0),null])},
e1:function(a,b){return H.he(this,b,null,H.y(this,"ba",0))},
bG:function(a){var z,y
z=P.a6(null,null,null,H.y(this,"ba",0))
for(y=0;y<this.gl(this);++y)z.t(0,this.j(0,y))
return z},
t:function(a,b){var z=this.gl(this)
this.sl(0,z+1)
this.p(0,z,b)},
a3:function(a,b){var z
for(z=0;z<this.gl(this);++z)if(J.e(this.j(0,z),b)){this.b7(0,z,this.gl(this)-1,this,z+1)
this.sl(0,this.gl(this)-1)
return!0}return!1},
iH:function(a,b){var z,y,x,w
z=H.p([],[H.y(this,"ba",0)])
y=this.gl(this)
for(x=0;x<y;++x){w=this.j(0,x)
if(J.e(a.$1(w),b))z.push(w)
if(y!==this.gl(this))throw H.c(new P.D(this))}if(z.length!==this.gl(this)){this.hY(0,0,z.length,z)
this.sl(0,z.length)}},
b7:function(a,b,c,d,e){var z,y,x,w,v
P.cm(b,c,this.gl(this),null,null,null)
z=c-b
if(z===0)return
if(H.aV(d,"$isN",[H.y(this,"ba",0)],"$asN")){y=e
x=d}else{x=J.j_(d,e).bF(0,!1)
y=0}w=J.L(x)
if(y+z>w.gl(x))throw H.c(H.fg())
if(y<b)for(v=z-1;v>=0;--v)this.p(0,b+v,w.j(x,y+v))
else for(v=0;v<z;++v)this.p(0,b+v,w.j(x,y+v))},
hY:function(a,b,c,d){return this.b7(a,b,c,d,0)},
bQ:function(a,b,c){var z
if(c>=this.gl(this))return-1
for(z=c;z<this.gl(this);++z)if(J.e(this.j(0,z),b))return z
return-1},
b3:function(a,b){return this.bQ(a,b,0)},
k:function(a){return P.cf(this,"[","]")},
$isN:1,
$isa_:1},
rl:{"^":"d;$ti",
p:function(a,b,c){throw H.c(new P.S("Cannot modify unmodifiable map"))},
$isI:1},
mz:{"^":"d;$ti",
j:function(a,b){return this.a.j(0,b)},
p:function(a,b,c){this.a.p(0,b,c)},
ad:function(a){return this.a.ad(a)},
Z:function(a,b){this.a.Z(0,b)},
gY:function(a){var z=this.a
return z.gY(z)},
gav:function(a){var z=this.a
return z.gav(z)},
gl:function(a){var z=this.a
return z.gl(z)},
k:function(a){return this.a.k(0)},
$isI:1},
hA:{"^":"mz+rl;a,$ti",$asI:null,$isI:1},
mB:{"^":"a:6;a,b",
$2:function(a,b){var z,y
z=this.a
if(!z.a)this.b.E+=", "
z.a=!1
z=this.b
y=z.E+=H.b(a)
z.E=y+": "
z.E+=H.b(b)}},
mr:{"^":"b0;a,b,c,d,$ti",
ga_:function(a){return new P.db(this,this.c,this.d,this.b,null,this.$ti)},
Z:function(a,b){var z,y,x
z=this.d
for(y=this.b;y!==this.c;y=(y+1&this.a.length-1)>>>0){x=this.a
if(y<0||y>=x.length)return H.f(x,y)
b.$1(x[y])
if(z!==this.d)H.i(new P.D(this))}},
gY:function(a){return this.b===this.c},
gl:function(a){return(this.c-this.b&this.a.length-1)>>>0},
gcV:function(a){var z,y
z=this.b
if(z===this.c)throw H.c(H.ah())
y=this.a
if(z>=y.length)return H.f(y,z)
return y[z]},
gw:function(a){var z,y,x
z=this.b
y=this.c
if(z===y)throw H.c(H.ah())
z=this.a
x=z.length
y=(y-1&x-1)>>>0
if(y<0||y>=x)return H.f(z,y)
return z[y]},
au:function(a,b){var z,y,x,w
z=(this.c-this.b&this.a.length-1)>>>0
if(0>b||b>=z)H.i(P.cT(b,this,"index",null,z))
y=this.a
x=y.length
w=(this.b+b&x-1)>>>0
if(w<0||w>=x)return H.f(y,w)
return y[w]},
t:function(a,b){this.aE(b)},
ax:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=this.$ti
if(H.aV(b,"$isN",z,"$asN")){y=b.gl(b)
x=this.gl(this)
w=x+y
v=this.a
u=v.length
if(w>=u){t=P.ms(w+(w>>>1))
if(typeof t!=="number")return H.x(t)
v=new Array(t)
v.fixed$length=Array
s=H.p(v,z)
this.c=this.jf(s)
this.a=s
this.b=0
C.a.b7(s,x,w,b,0)
this.c+=y}else{z=this.c
r=u-z
if(y<r){C.a.b7(v,z,z+y,b,0)
this.c+=y}else{q=y-r
C.a.b7(v,z,z+r,b,0)
C.a.b7(this.a,0,q,b,r)
this.c=q}}++this.d}else for(z=new P.db(b,b.c,b.d,b.b,null,[H.m(b,0)]);z.u();)this.aE(z.e)},
bh:function(a){var z,y,x,w,v
z=this.b
y=this.c
if(z!==y){for(x=this.a,w=x.length,v=w-1;z!==y;z=(z+1&v)>>>0){if(z<0||z>=w)return H.f(x,z)
x[z]=null}this.c=0
this.b=0;++this.d}},
k:function(a){return P.cf(this,"{","}")},
fT:function(a){var z,y,x
z=this.b
y=this.a
x=y.length
z=(z-1&x-1)>>>0
this.b=z
if(z<0||z>=x)return H.f(y,z)
y[z]=a
if(z===this.c)this.fz();++this.d},
dM:function(){var z,y,x,w
z=this.b
if(z===this.c)throw H.c(H.ah());++this.d
y=this.a
x=y.length
if(z>=x)return H.f(y,z)
w=y[z]
y[z]=null
this.b=(z+1&x-1)>>>0
return w},
aE:function(a){var z,y,x
z=this.a
y=this.c
x=z.length
if(y<0||y>=x)return H.f(z,y)
z[y]=a
x=(y+1&x-1)>>>0
this.c=x
if(this.b===x)this.fz();++this.d},
fz:function(){var z,y,x,w
z=new Array(this.a.length*2)
z.fixed$length=Array
y=H.p(z,this.$ti)
z=this.a
x=this.b
w=z.length-x
C.a.b7(y,0,w,z,x)
C.a.b7(y,w,w+this.b,this.a,0)
this.b=0
this.c=this.a.length
this.a=y},
jf:function(a){var z,y,x,w,v
z=this.b
y=this.c
x=this.a
if(z<=y){w=y-z
C.a.b7(a,0,w,x,z)
return w}else{v=x.length-z
C.a.b7(a,0,v,x,z)
C.a.b7(a,v,v+this.c,this.a,0)
return this.c+v}},
ia:function(a,b){var z=new Array(8)
z.fixed$length=Array
this.a=H.p(z,[b])},
v:{
bb:function(a,b){var z=new P.mr(null,0,0,0,[b])
z.ia(a,b)
return z},
ms:function(a){var z
a=C.P.f9(a,1)-1
for(;!0;a=z)z=(a&a-1)>>>0}}},
db:{"^":"d;a,b,c,d,e,$ti",
gU:function(){return this.e},
u:function(){var z,y,x
z=this.a
if(this.c!==z.d)H.i(new P.D(z))
y=this.d
if(y===this.b){this.e=null
return!1}z=z.a
x=z.length
if(y>=x)return H.f(z,y)
this.e=z[y]
this.d=(y+1&x-1)>>>0
return!0}},
ok:{"^":"d;$ti",
gY:function(a){return this.a===0},
gav:function(a){return this.a!==0},
ax:function(a,b){var z
for(z=J.aj(b);z.u();)this.t(0,z.gU())},
jC:function(a){var z,y
for(z=a.a,y=new P.af(z,z.r,null,null,[null]),y.c=z.e;y.u();)if(!this.a7(0,y.d))return!1
return!0},
bF:function(a,b){var z,y,x,w,v
z=H.p([],this.$ti)
C.a.sl(z,this.a)
for(y=new P.af(this,this.r,null,null,[null]),y.c=this.e,x=0;y.u();x=v){w=y.d
v=x+1
if(x>=z.length)return H.f(z,x)
z[x]=w}return z},
cw:function(a){return this.bF(a,!0)},
aJ:function(a,b){return new H.bF(this,b,[H.m(this,0),null])},
k:function(a){return P.cf(this,"{","}")},
Z:function(a,b){var z
for(z=new P.af(this,this.r,null,null,[null]),z.c=this.e;z.u();)b.$1(z.d)},
bw:function(a,b,c){var z,y
for(z=new P.af(this,this.r,null,null,[null]),z.c=this.e,y=b;z.u();)y=c.$2(y,z.d)
return y},
gw:function(a){var z,y
z=new P.af(this,this.r,null,null,[null])
z.c=this.e
if(!z.u())throw H.c(H.ah())
do y=z.d
while(z.u())
return y},
aU:function(a,b,c){var z,y
for(z=new P.af(this,this.r,null,null,[null]),z.c=this.e;z.u();){y=z.d
if(b.$1(y)===!0)return y}if(c!=null)return c.$0()
throw H.c(H.ah())},
cl:function(a,b){return this.aU(a,b,null)},
bI:function(a,b){var z,y,x,w
for(z=new P.af(this,this.r,null,null,[null]),z.c=this.e,y=null,x=!1;z.u();){w=z.d
if(b.$1(w)===!0){if(x)throw H.c(H.dE())
y=w
x=!0}}if(x)return y
throw H.c(H.ah())},
$isbO:1,
$isa_:1},
oj:{"^":"ok;$ti"}}],["","",,P,{"^":"",
de:function(a){var z
if(a==null)return
if(typeof a!="object")return a
if(Object.getPrototypeOf(a)!==Array.prototype)return new P.qU(a,Object.create(null),null)
for(z=0;z<a.length;++z)a[z]=P.de(a[z])
return a},
rF:function(a,b){var z,y,x,w
if(typeof a!=="string")throw H.c(H.T(a))
z=null
try{z=JSON.parse(a)}catch(x){y=H.C(x)
w=String(y)
throw H.c(new P.fb(w,null,null))}w=P.de(z)
return w},
xB:[function(a){return a.dR()},"$1","tR",2,0,0],
qU:{"^":"d;a,b,c",
j:function(a,b){var z,y
z=this.b
if(z==null)return this.c.j(0,b)
else if(typeof b!=="string")return
else{y=z[b]
return typeof y=="undefined"?this.j0(b):y}},
gl:function(a){var z
if(this.b==null){z=this.c
z=z.gl(z)}else z=this.cE().length
return z},
gY:function(a){var z
if(this.b==null){z=this.c
z=z.gl(z)}else z=this.cE().length
return z===0},
gav:function(a){var z
if(this.b==null){z=this.c
z=z.gl(z)}else z=this.cE().length
return z>0},
p:function(a,b,c){var z,y
if(this.b==null)this.c.p(0,b,c)
else if(this.ad(b)){z=this.b
z[b]=c
y=this.a
if(y==null?z!=null:y!==z)y[b]=null}else this.jd().p(0,b,c)},
ad:function(a){if(this.b==null)return this.c.ad(a)
if(typeof a!=="string")return!1
return Object.prototype.hasOwnProperty.call(this.a,a)},
Z:function(a,b){var z,y,x,w
if(this.b==null)return this.c.Z(0,b)
z=this.cE()
for(y=0;y<z.length;++y){x=z[y]
w=this.b[x]
if(typeof w=="undefined"){w=P.de(this.a[x])
this.b[x]=w}b.$2(x,w)
if(z!==this.c)throw H.c(new P.D(this))}},
k:function(a){return P.dS(this)},
cE:function(){var z=this.c
if(z==null){z=Object.keys(this.a)
this.c=z}return z},
jd:function(){var z,y,x,w,v
if(this.b==null)return this.c
z=P.dN(P.q,null)
y=this.cE()
for(x=0;w=y.length,x<w;++x){v=y[x]
z.p(0,v,this.j(0,v))}if(w===0)y.push(null)
else C.a.sl(y,0)
this.b=null
this.a=null
this.c=z
return z},
j0:function(a){var z
if(!Object.prototype.hasOwnProperty.call(this.a,a))return
z=P.de(this.a[a])
return this.b[a]=z},
$isI:1,
$asI:function(){return[P.q,null]}},
f4:{"^":"d;$ti"},
cO:{"^":"d;$ti"},
dJ:{"^":"a5;a,b",
k:function(a){if(this.b!=null)return"Converting object to an encodable object failed."
else return"Converting object did not return an encodable object."}},
m9:{"^":"dJ;a,b",
k:function(a){return"Cyclic error in JSON stringify"}},
m8:{"^":"f4;a,b",
jG:function(a,b){var z=P.rF(a,this.gjH().a)
return z},
jF:function(a){return this.jG(a,null)},
jP:function(a,b){var z=this.gjQ()
z=P.qW(a,z.b,z.a)
return z},
h3:function(a){return this.jP(a,null)},
gjQ:function(){return C.S},
gjH:function(){return C.R},
$asf4:function(){return[P.d,P.q]}},
mb:{"^":"cO;a,b",
$ascO:function(){return[P.d,P.q]}},
ma:{"^":"cO;a",
$ascO:function(){return[P.q,P.d]}},
qX:{"^":"d;",
hK:function(a){var z,y,x,w,v,u,t
z=J.L(a)
y=z.gl(a)
if(typeof y!=="number")return H.x(y)
x=this.c
w=0
v=0
for(;v<y;++v){u=z.cS(a,v)
if(u>92)continue
if(u<32){if(v>w)x.E+=C.b.aM(a,w,v)
w=v+1
x.E+=H.ar(92)
switch(u){case 8:x.E+=H.ar(98)
break
case 9:x.E+=H.ar(116)
break
case 10:x.E+=H.ar(110)
break
case 12:x.E+=H.ar(102)
break
case 13:x.E+=H.ar(114)
break
default:x.E+=H.ar(117)
x.E+=H.ar(48)
x.E+=H.ar(48)
t=u>>>4&15
x.E+=H.ar(t<10?48+t:87+t)
t=u&15
x.E+=H.ar(t<10?48+t:87+t)
break}}else if(u===34||u===92){if(v>w)x.E+=C.b.aM(a,w,v)
w=v+1
x.E+=H.ar(92)
x.E+=H.ar(u)}}if(w===0)x.E+=H.b(a)
else if(w<y)x.E+=z.aM(a,w,y)},
e7:function(a){var z,y,x,w
for(z=this.a,y=z.length,x=0;x<y;++x){w=z[x]
if(a==null?w==null:a===w)throw H.c(new P.m9(a,null))}z.push(a)},
dU:function(a){var z,y,x,w
if(this.hJ(a))return
this.e7(a)
try{z=this.b.$1(a)
if(!this.hJ(z))throw H.c(new P.dJ(a,null))
x=this.a
if(0>=x.length)return H.f(x,-1)
x.pop()}catch(w){y=H.C(w)
throw H.c(new P.dJ(a,y))}},
hJ:function(a){var z,y
if(typeof a==="number"){if(!isFinite(a))return!1
this.c.E+=C.j.k(a)
return!0}else if(a===!0){this.c.E+="true"
return!0}else if(a===!1){this.c.E+="false"
return!0}else if(a==null){this.c.E+="null"
return!0}else if(typeof a==="string"){z=this.c
z.E+='"'
this.hK(a)
z.E+='"'
return!0}else{z=J.o(a)
if(!!z.$isN){this.e7(a)
this.lb(a)
z=this.a
if(0>=z.length)return H.f(z,-1)
z.pop()
return!0}else if(!!z.$isI){this.e7(a)
y=this.lc(a)
z=this.a
if(0>=z.length)return H.f(z,-1)
z.pop()
return y}else return!1}},
lb:function(a){var z,y,x
z=this.c
z.E+="["
y=J.L(a)
if(y.gl(a)>0){this.dU(y.j(a,0))
for(x=1;x<y.gl(a);++x){z.E+=","
this.dU(y.j(a,x))}}z.E+="]"},
lc:function(a){var z,y,x,w,v,u,t
z={}
if(a.gY(a)){this.c.E+="{}"
return!0}y=a.gl(a)*2
x=new Array(y)
z.a=0
z.b=!0
a.Z(0,new P.qY(z,x))
if(!z.b)return!1
w=this.c
w.E+="{"
for(v='"',u=0;u<y;u+=2,v=',"'){w.E+=v
this.hK(x[u])
w.E+='":'
t=u+1
if(t>=y)return H.f(x,t)
this.dU(x[t])}w.E+="}"
return!0}},
qY:{"^":"a:6;a,b",
$2:function(a,b){var z,y,x,w,v
if(typeof a!=="string")this.a.b=!1
z=this.b
y=this.a
x=y.a
w=x+1
y.a=w
v=z.length
if(x>=v)return H.f(z,x)
z[x]=a
y.a=w+1
if(w>=v)return H.f(z,w)
z[w]=b}},
qV:{"^":"qX;c,a,b",v:{
qW:function(a,b,c){var z,y,x
z=new P.bR("")
y=new P.qV(z,[],P.tR())
y.dU(a)
x=z.E
return x.charCodeAt(0)==0?x:x}}}}],["","",,P,{"^":"",
wX:[function(a,b){return J.bD(a,b)},"$2","tS",4,0,42],
f8:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.h(a)
if(typeof a==="string")return JSON.stringify(a)
return P.l8(a)},
l8:function(a){var z=J.o(a)
if(!!z.$isa)return z.k(a)
return H.d_(a)},
cR:function(a){return new P.qD(a)},
P:function(a,b,c){var z,y
z=H.p([],[c])
for(y=J.aj(a);y.u();)z.push(y.gU())
if(b)return z
z.fixed$length=Array
return z},
mt:function(a,b,c,d){var z,y,x
z=H.p(new Array(a),[d])
for(y=0;y<a;++y){x=b.$1(y)
if(y>=z.length)return H.f(z,y)
z[y]=x}return z},
aD:function(a,b){var z=P.P(a,!1,b)
z.fixed$length=Array
z.immutable$list=Array
return z},
eF:function(a){H.vb(H.b(a))},
bp:function(a,b,c){return new H.dG(a,H.dH(a,!1,b,!1),null,null)},
X:{"^":"d;"},
"+bool":0,
V:{"^":"d;$ti"},
cP:{"^":"d;je:a<,b",
A:function(a,b){if(b==null)return!1
if(!(b instanceof P.cP))return!1
return this.a===b.a&&!0},
bD:function(a,b){return C.e.bD(this.a,b.gje())},
gD:function(a){var z=this.a
return(z^C.e.dA(z,30))&1073741823},
k:function(a){var z,y,x,w,v,u,t,s
z=P.km(H.nr(this))
y=P.c6(H.np(this))
x=P.c6(H.nl(this))
w=P.c6(H.nm(this))
v=P.c6(H.no(this))
u=P.c6(H.nq(this))
t=P.kn(H.nn(this))
s=z+"-"+y+"-"+x+" "+w+":"+v+":"+u+"."+t
return s},
t:function(a,b){var z,y
z=this.a+b.gke()
y=new P.cP(z,!1)
if(!(Math.abs(z)>864e13))z=!1
else z=!0
if(z)H.i(P.G(y.gkB()))
return y},
gkB:function(){return this.a},
$isV:1,
$asV:function(){return[P.cP]},
v:{
km:function(a){var z,y
z=Math.abs(a)
y=a<0?"-":""
if(z>=1000)return""+a
if(z>=100)return y+"0"+H.b(z)
if(z>=10)return y+"00"+H.b(z)
return y+"000"+H.b(z)},
kn:function(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},
c6:function(a){if(a>=10)return""+a
return"0"+a}}},
aW:{"^":"M;",$isV:1,
$asV:function(){return[P.M]}},
"+double":0,
b8:{"^":"d;bW:a<",
aj:function(a,b){return new P.b8(this.a+b.gbW())},
at:function(a,b){return new P.b8(this.a-b.gbW())},
cb:function(a,b){if(typeof b!=="number")return H.x(b)
return new P.b8(C.j.hx(this.a*b))},
b0:function(a,b){return C.e.b0(this.a,b.gbW())},
bk:function(a,b){return this.a>b.gbW()},
df:function(a,b){return this.a<=b.gbW()},
bT:function(a,b){return C.e.bT(this.a,b.gbW())},
gke:function(){return C.e.bM(this.a,1000)},
A:function(a,b){if(b==null)return!1
if(!(b instanceof P.b8))return!1
return this.a===b.a},
gD:function(a){return this.a&0x1FFFFFFF},
bD:function(a,b){return C.e.bD(this.a,b.gbW())},
k:function(a){var z,y,x,w,v
z=new P.kQ()
y=this.a
if(y<0)return"-"+new P.b8(0-y).k(0)
x=z.$1(C.e.bM(y,6e7)%60)
w=z.$1(C.e.bM(y,1e6)%60)
v=new P.kP().$1(y%1e6)
return""+C.e.bM(y,36e8)+":"+H.b(x)+":"+H.b(w)+"."+H.b(v)},
f8:function(a){return new P.b8(0-this.a)},
$isV:1,
$asV:function(){return[P.b8]}},
kP:{"^":"a:14;",
$1:function(a){if(a>=1e5)return""+a
if(a>=1e4)return"0"+a
if(a>=1000)return"00"+a
if(a>=100)return"000"+a
if(a>=10)return"0000"+a
return"00000"+a}},
kQ:{"^":"a:14;",
$1:function(a){if(a>=10)return""+a
return"0"+a}},
a5:{"^":"d;",
gbr:function(){return H.E(this.$thrownJsError)}},
cY:{"^":"a5;",
k:function(a){return"Throw of null."}},
b7:{"^":"a5;a,b,h:c<,d",
ged:function(){return"Invalid argument"+(!this.a?"(s)":"")},
gec:function(){return""},
k:function(a){var z,y,x,w,v,u
z=this.c
y=z!=null?" ("+z+")":""
z=this.d
x=z==null?"":": "+H.b(z)
w=this.ged()+y+x
if(!this.a)return w
v=this.gec()
u=P.f8(this.b)
return w+v+": "+H.b(u)},
v:{
G:function(a){return new P.b7(!1,null,null,a)},
cH:function(a,b,c){return new P.b7(!0,a,b,c)},
l:function(a){return new P.b7(!1,null,a,"Must not be null")}}},
e6:{"^":"b7;e,f,a,b,c,d",
ged:function(){return"RangeError"},
gec:function(){var z,y,x
z=this.e
if(z==null){z=this.f
y=z!=null?": Not less than or equal to "+H.b(z):""}else{x=this.f
if(x==null)y=": Not greater than or equal to "+H.b(z)
else if(x>z)y=": Not in range "+H.b(z)+".."+H.b(x)+", inclusive"
else y=x<z?": Valid value range is empty":": Only valid value is "+H.b(z)}return y},
v:{
nx:function(a){return new P.e6(null,null,!1,null,null,a)},
cl:function(a,b,c){return new P.e6(null,null,!0,a,b,"Value not in range")},
a8:function(a,b,c,d,e){return new P.e6(b,c,!0,a,d,"Invalid value")},
ny:function(a,b,c,d,e){if(a<b||a>c)throw H.c(P.a8(a,b,c,d,e))},
cm:function(a,b,c,d,e,f){if(0>a||a>c)throw H.c(P.a8(a,0,c,"start",f))
if(a>b||b>c)throw H.c(P.a8(b,a,c,"end",f))
return b}}},
lU:{"^":"b7;e,l:f>,a,b,c,d",
ged:function(){return"RangeError"},
gec:function(){if(J.c0(this.b,0))return": index must not be negative"
var z=this.f
if(z===0)return": no indices are valid"
return": index should be less than "+H.b(z)},
v:{
cT:function(a,b,c,d,e){var z=e!=null?e:J.aN(b)
return new P.lU(b,z,!0,a,c,"Index out of range")}}},
S:{"^":"a5;a",
k:function(a){return"Unsupported operation: "+this.a}},
Y:{"^":"a5;a",
k:function(a){var z=this.a
return z!=null?"UnimplementedError: "+z:"UnimplementedError"}},
w:{"^":"a5;a",
k:function(a){return"Bad state: "+this.a}},
D:{"^":"a5;a",
k:function(a){var z=this.a
if(z==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+H.b(P.f8(z))+"."}},
mX:{"^":"d;",
k:function(a){return"Out of Memory"},
gbr:function(){return},
$isa5:1},
h8:{"^":"d;",
k:function(a){return"Stack Overflow"},
gbr:function(){return},
$isa5:1},
kl:{"^":"a5;a",
k:function(a){var z=this.a
return z==null?"Reading static variable during its initialization":"Reading static variable '"+H.b(z)+"' during its initialization"}},
qD:{"^":"d;a",
k:function(a){var z=this.a
if(z==null)return"Exception"
return"Exception: "+H.b(z)}},
fb:{"^":"d;a,b,c",
k:function(a){var z,y,x
z=this.a
y=""!==z?"FormatException: "+z:"FormatException"
x=this.b
if(typeof x!=="string")return y
if(x.length>78)x=C.b.aM(x,0,75)+"..."
return y+"\n"+x}},
ld:{"^":"d;h:a<,fE,$ti",
k:function(a){return"Expando:"+H.b(this.a)},
j:function(a,b){var z,y
z=this.fE
if(typeof z!=="string"){if(b==null||typeof b==="boolean"||typeof b==="number"||typeof b==="string")H.i(P.cH(b,"Expandos are not allowed on strings, numbers, booleans or null",null))
return z.get(b)}y=H.e1(b,"expando$values")
return y==null?null:H.e1(y,z)},
p:function(a,b,c){var z,y
z=this.fE
if(typeof z!=="string")z.set(b,c)
else{y=H.e1(b,"expando$values")
if(y==null){y=new P.d()
H.fL(b,"expando$values",y)}H.fL(y,z,c)}}},
bG:{"^":"d;"},
t:{"^":"M;",$isV:1,
$asV:function(){return[P.M]}},
"+int":0,
B:{"^":"d;$ti",
aJ:function(a,b){return H.bH(this,b,H.y(this,"B",0),null)},
c9:["dm",function(a,b){return new H.K(this,b,[H.y(this,"B",0)])}],
a7:function(a,b){var z
for(z=this.ga_(this);z.u();)if(J.e(z.gU(),b))return!0
return!1},
Z:function(a,b){var z
for(z=this.ga_(this);z.u();)b.$1(z.gU())},
bw:function(a,b,c){var z,y
for(z=this.ga_(this),y=b;z.u();)y=c.$2(y,z.gU())
return y},
bt:function(a,b){var z
for(z=this.ga_(this);z.u();)if(b.$1(z.gU())===!0)return!0
return!1},
bF:function(a,b){return P.P(this,b,H.y(this,"B",0))},
cw:function(a){return this.bF(a,!0)},
bG:function(a){return P.b9(this,H.y(this,"B",0))},
gl:function(a){var z,y
z=this.ga_(this)
for(y=0;z.u();)++y
return y},
gY:function(a){return!this.ga_(this).u()},
gav:function(a){return!this.gY(this)},
e1:function(a,b){return H.oq(this,b,H.y(this,"B",0))},
gw:function(a){var z,y
z=this.ga_(this)
if(!z.u())throw H.c(H.ah())
do y=z.gU()
while(z.u())
return y},
gcd:function(a){var z,y
z=this.ga_(this)
if(!z.u())throw H.c(H.ah())
y=z.gU()
if(z.u())throw H.c(H.dE())
return y},
au:function(a,b){var z,y,x
if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(P.l("index"))
if(b<0)H.i(P.a8(b,0,null,"index",null))
for(z=this.ga_(this),y=0;z.u();){x=z.gU()
if(b===y)return x;++y}throw H.c(P.cT(b,this,"index",null,y))},
k:function(a){return P.m4(this,"(",")")}},
cV:{"^":"d;$ti"},
N:{"^":"d;$ti",$isB:1,$isa_:1},
"+List":0,
I:{"^":"d;$ti"},
at:{"^":"d;",
gD:function(a){return P.d.prototype.gD.call(this,this)},
k:function(a){return"null"}},
"+Null":0,
M:{"^":"d;",$isV:1,
$asV:function(){return[P.M]}},
"+num":0,
d:{"^":";",
A:function(a,b){return this===b},
gD:function(a){return H.aE(this)},
k:function(a){return H.d_(this)},
gbz:function(a){return new H.av(H.ip(this),null)},
toString:function(){return this.k(this)}},
bn:{"^":"d;"},
bO:{"^":"a_;$ti"},
b1:{"^":"d;"},
q:{"^":"d;",$isV:1,
$asV:function(){return[P.q]},
$isdZ:1},
"+String":0,
bR:{"^":"d;E<",
gl:function(a){return this.E.length},
gY:function(a){return this.E.length===0},
gav:function(a){return this.E.length!==0},
k:function(a){var z=this.E
return z.charCodeAt(0)==0?z:z},
v:{
hc:function(a,b,c){var z=J.aj(b)
if(!z.u())return a
if(c.length===0){do a+=H.b(z.gU())
while(z.u())}else{a+=H.b(z.gU())
for(;z.u();)a=a+c+H.b(z.gU())}return a},
pe:function(a){return new P.bR(a)}}}}],["","",,P,{"^":"",fX:{"^":"d;"}}],["","",,P,{"^":"",
e5:function(a){return C.M},
qT:{"^":"d;",
as:function(a){if(a<=0||a>4294967296)throw H.c(P.nx("max must be in range 0 < max \u2264 2^32, was "+a))
return Math.random()*a>>>0},
kE:function(){return Math.random()}}}],["","",,S,{"^":"",ka:{"^":"d;a,b,$ti",
j:function(a,b){return this.b.j(0,b)},
ad:function(a){return this.b.ad(a)},
Z:function(a,b){return this.b.Z(0,b)},
gY:function(a){var z=this.b
return z.gY(z)},
gav:function(a){var z=this.b
return z.gav(z)},
gl:function(a){var z=this.b
return z.gl(z)},
p:function(a,b,c){this.iU()
this.b.p(0,b,c)},
k:function(a){return J.h(this.b)},
iU:function(){if(!this.a)return
this.a=!1
this.b=P.cj(this.b,H.m(this,0),H.m(this,1))},
$isI:1}}],["","",,A,{"^":"",kb:{"^":"d;a,b,$ti",
gl:function(a){return this.b.a},
cp:function(a){return this.b.cp(a)},
a7:function(a,b){return this.b.a7(0,b)},
Z:function(a,b){return this.b.Z(0,b)},
gY:function(a){return this.b.a===0},
gav:function(a){return this.b.a!==0},
ga_:function(a){var z,y
z=this.b
y=new P.af(z,z.r,null,null,[null])
y.c=z.e
return y},
gw:function(a){var z=this.b
return z.gw(z)},
aJ:function(a,b){var z=this.b
z.toString
return new H.bF(z,b,[H.m(z,0),null])},
bG:function(a){var z,y
z=this.b
y=z.el()
y.ax(0,z)
return y},
t:function(a,b){this.iB()
return this.b.t(0,b)},
k:function(a){return J.h(this.b)},
iB:function(){if(!this.a)return
this.a=!1
this.b=P.b9(this.b,H.m(this,0))},
$isbO:1,
$isa_:1}}],["","",,S,{"^":"",dx:{"^":"d;fG:a<,b,$ti",
a2:function(a){var z=new S.O(null,null,this.$ti)
z.al()
z.m(this)
a.$1(z)
return z.q()},
gD:function(a){var z=this.b
if(z==null){z=X.bB(this.a)
this.b=z}return z},
A:function(a,b){var z,y,x,w,v
if(b==null)return!1
if(b===this)return!0
z=J.o(b)
if(!z.$isdx)return!1
y=b.a
x=this.a
if(y.length!==x.length)return!1
z=z.gD(b)
w=this.gD(this)
if(z==null?w!=null:z!==w)return!1
for(v=0;z=x.length,v!==z;++v){if(v>=y.length)return H.f(y,v)
w=y[v]
if(v>=z)return H.f(x,v)
if(!J.e(w,x[v]))return!1}return!0},
k:function(a){return J.h(this.a)},
j:function(a,b){var z=this.a
if(b>>>0!==b||b>=z.length)return H.f(z,b)
return z[b]},
gl:function(a){return this.a.length},
bQ:function(a,b,c){var z=this.a
return(z&&C.a).bQ(z,b,c)},
b3:function(a,b){return this.bQ(a,b,0)},
ga_:function(a){var z=this.a
return new J.bj(z,z.length,0,null,[H.m(z,0)])},
aJ:function(a,b){var z=this.a
z.toString
return new H.aq(z,b,[H.m(z,0),null])},
a7:function(a,b){var z=this.a
return(z&&C.a).a7(z,b)},
Z:function(a,b){var z=this.a
return(z&&C.a).Z(z,b)},
bG:function(a){var z=this.a
z.toString
return P.b9(z,H.m(z,0))},
gY:function(a){return this.a.length===0},
gav:function(a){return this.a.length!==0},
gw:function(a){var z=this.a
return(z&&C.a).gw(z)},
al:function(){if(new H.av(H.Z(H.m(this,0)),null).A(0,C.q))throw H.c(new P.S('explicit element type required, for example "new BuiltList<int>"'))}},O:{"^":"d;fG:a<,b,$ti",
q:function(){var z,y
z=this.b
if(z==null){z=this.a
y=new S.dx(z,null,this.$ti)
y.al()
this.a=z
this.b=y
z=y}return z},
m:function(a){if(H.aV(a,"$isdx",this.$ti,null)){this.a=a.gfG()
this.b=a}else{this.a=P.P(a,!0,H.m(this,0))
this.b=null}},
j:function(a,b){var z=this.a
if(b>>>0!==b||b>=z.length)return H.f(z,b)
return z[b]},
p:function(a,b,c){var z
if(c==null)H.i(P.G("null element"))
z=this.geu()
if(b>>>0!==b||b>=z.length)return H.f(z,b)
z[b]=c},
t:function(a,b){var z
if(b==null)H.i(P.G("null element"))
z=this.geu();(z&&C.a).t(z,b)},
a3:function(a,b){var z=this.geu();(z&&C.a).a3(z,b)},
aJ:function(a,b){var z=this.a
z.toString
z=new H.aq(z,b,[H.m(z,0),null]).bF(0,!0)
this.a=z
this.b=null
this.iw(z)},
geu:function(){if(this.b!=null){this.a=P.P(this.a,!0,H.m(this,0))
this.b=null}return this.a},
al:function(){if(new H.av(H.Z(H.m(this,0)),null).A(0,C.q))throw H.c(new P.S('explicit element type required, for example "new ListBuilder<int>"'))},
iw:function(a){var z,y,x,w
for(z=a.length,y=H.m(this,0),x=0;x<a.length;a.length===z||(0,H.as)(a),++x){w=a[x]
if(!H.dh(w,y))throw H.c(P.G("invalid element: "+H.b(w)))}}}}],["","",,A,{"^":"",cL:{"^":"d;iT:a<,b,c,d,$ti",
a2:function(a){var z=new A.cX(null,null,this.$ti)
z.ci()
z.m(this)
a.$1(z)
return z.q()},
F:function(){return new S.ka(!0,this.a,this.$ti)},
gD:function(a){var z=this.b
if(z==null){z=this.a.gcn()
z=H.bH(z,new A.jV(this),H.y(z,"B",0),null)
z=P.P(z,!1,H.y(z,"B",0))
C.a.fc(z)
z=X.bB(z)
this.b=z}return z},
A:function(a,b){var z,y,x,w,v
if(b==null)return!1
if(b===this)return!0
z=J.o(b)
if(!z.$iscL)return!1
y=b.a
x=this.a
if(y.gl(y)!==x.gl(x))return!1
z=z.gD(b)
w=this.gD(this)
if(z==null?w!=null:z!==w)return!1
z=this.c
if(z==null){z=x.gcn()
this.c=z}z=z.ga_(z)
for(;z.u();){v=z.gU()
if(!J.e(y.j(0,v),x.j(0,v)))return!1}return!0},
k:function(a){return J.h(this.a)},
j:function(a,b){return this.a.j(0,b)},
Z:function(a,b){this.a.Z(0,b)},
gY:function(a){var z=this.a
return z.gY(z)},
gav:function(a){var z=this.a
return z.gav(z)},
gl:function(a){var z=this.a
return z.gl(z)},
ci:function(){if(new H.av(H.Z(H.m(this,0)),null).A(0,C.q))throw H.c(new P.S('explicit key type required, for example "new BuiltMap<int, int>"'))
if(new H.av(H.Z(H.m(this,1)),null).A(0,C.q))throw H.c(new P.S('explicit value type required, for example "new BuiltMap<int, int>"'))}},jV:{"^":"a:0;a",
$1:function(a){var z,y
z=J.j(a)
y=J.j(this.a.a.j(0,a))
return X.df(X.b2(X.b2(0,J.j(z)),J.j(y)))}},cX:{"^":"d;a,b,$ti",
q:function(){var z=this.b
if(z==null){z=new A.cL(this.a,null,null,null,this.$ti)
z.ci()
this.b=z}return z},
m:function(a){var z
if(H.aV(a,"$iscL",this.$ti,null)){this.b=a
this.a=a.giT()}else if(!!a.$iscL){z=P.cj(a.a,H.m(this,0),H.m(this,1))
this.b=null
this.a=z}else if(!!a.$isI){z=P.cj(a,H.m(this,0),H.m(this,1))
this.b=null
this.a=z}else throw H.c(P.G("expected Map or BuiltMap, got "+H.b(a.gbz(a))))},
j:function(a,b){return this.a.j(0,b)},
p:function(a,b,c){if(c==null)H.i(P.G("null value"))
this.gj5().p(0,b,c)},
gj5:function(){if(this.b!=null){this.a=P.cj(this.a,H.m(this,0),H.m(this,1))
this.b=null}return this.a},
ci:function(){if(new H.av(H.Z(H.m(this,0)),null).A(0,C.q))throw H.c(new P.S('explicit key type required, for example "new MapBuilder<int, int>"'))
if(new H.av(H.Z(H.m(this,1)),null).A(0,C.q))throw H.c(new P.S('explicit value type required, for example "new MapBuilder<int, int>"'))}}}],["","",,L,{"^":"",dy:{"^":"d;j7:a<,b,$ti",
a2:function(a){var z=new L.aF(null,null,this.$ti)
z.b2()
z.m(this)
a.$1(z)
return z.q()},
gD:function(a){var z=this.b
if(z==null){z=this.a
z.toString
z=P.P(new H.bF(z,new L.jW(),[H.m(z,0),null]),!1,null)
C.a.fc(z)
z=X.bB(z)
this.b=z}return z},
A:function(a,b){var z,y,x
if(b==null)return!1
if(b===this)return!0
z=J.o(b)
if(!z.$isdy)return!1
y=this.a
if(b.a.a!==y.a)return!1
z=z.gD(b)
x=this.gD(this)
if(z==null?x!=null:z!==x)return!1
return y.jC(b)},
k:function(a){return J.h(this.a)},
gl:function(a){return this.a.a},
cp:function(a){return this.a.cp(a)},
ga_:function(a){var z,y
z=this.a
y=new P.af(z,z.r,null,null,[null])
y.c=z.e
return y},
aJ:function(a,b){var z=this.a
z.toString
return new H.bF(z,b,[H.m(z,0),null])},
a7:function(a,b){return this.a.a7(0,b)},
Z:function(a,b){return this.a.Z(0,b)},
bG:function(a){return new A.kb(!0,this.a,this.$ti)},
gY:function(a){return this.a.a===0},
gav:function(a){return this.a.a!==0},
gw:function(a){var z=this.a
return z.gw(z)},
aU:function(a,b,c){return this.a.aU(0,b,c)},
cl:function(a,b){return this.aU(a,b,null)},
b2:function(){if(new H.av(H.Z(H.m(this,0)),null).A(0,C.q))throw H.c(new P.S('explicit element type required, for example "new BuiltSet<int>"'))}},jW:{"^":"a:0;",
$1:function(a){return J.j(a)}},aF:{"^":"d;a,b,$ti",
q:function(){var z=this.b
if(z==null){z=new L.dy(this.a,null,this.$ti)
z.b2()
this.b=z}return z},
m:function(a){var z,y,x,w
if(H.aV(a,"$isdy",this.$ti,null)){this.a=a.gj7()
this.b=a}else{z=H.m(this,0)
y=P.a6(null,null,null,z)
for(x=J.aj(a);x.u();){w=x.gU()
if(H.dh(w,z))y.t(0,w)
else throw H.c(P.G("iterable contained invalid element: "+H.b(w)))}this.b=null
this.a=y}},
t:function(a,b){if(b==null)H.i(P.G("null element"))
this.gev().t(0,b)},
a3:function(a,b){this.gev().a3(0,b)},
aJ:function(a,b){var z=this.a
z.toString
z=P.b9(new H.bF(z,b,[H.m(z,0),null]),null)
this.b=null
this.a=z
this.j8(z)},
gev:function(){if(this.b!=null){this.a=P.b9(this.a,H.m(this,0))
this.b=null}return this.a},
b2:function(){if(new H.av(H.Z(H.m(this,0)),null).A(0,C.q))throw H.c(new P.S('explicit element type required, for example "new SetBuilder<int>"'))},
j8:function(a){var z,y,x
for(z=new P.af(a,a.r,null,null,[null]),z.c=a.e,y=H.m(this,0);z.u();){x=z.d
if(!H.dh(x,y))throw H.c(P.G("invalid element: "+H.b(x)))}}}}],["","",,Y,{"^":"",
k:function(a,b){if(typeof b!=="number")return H.x(b)
a=536870911&a+b
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
U:function(a){a=536870911&a+((67108863&a)<<3)
a^=a>>>11
return 536870911&a+((16383&a)<<15)}}],["","",,N,{"^":"",nW:{"^":"nU;ch,cx,ag:cy@,b8:db@,dx,b,c,d,e,f,r,x,y,z,Q,a",
hq:function(){var z=$.$get$cD()
z.p(0,"game",this.cx)
z.p(0,"hitpoints",this.cy)
z.p(0,"stamina",this.db)
z.p(0,"gold",this.dx)},
kg:function(){var z,y,x,w
this.cx=null
this.cy=Z.bP("Health",new N.nZ(),"#CCCCCC","Your physical state",100,0,!0,P.aW)
z=P.t
this.db=Z.bP("Stamina",new N.o_(),"#CCCCCC","Spare physical energy",0,0,!0,z)
z=Z.bP("Gold",new N.o0(),"#CCCCCC","Gold coins",0,0,!0,z)
this.dx=z
y=$.$get$bZ()
x=this.cy
w=this.db
y=new O.f7(N.bm("EdgeheadGame"),null,!1,null,null,null,null,null,null,null,null,new Y.a3(H.p([],[Y.ai]),0,P.b_()),x,w,z,O.vi(),O.vh(),O.vg(),y,this.gi1(),new P.bR(""),!1,null)
y.hZ()
this.cx=y
y.x="endGame"
$.$get$cy().t(0,0)},
ig:function(){var z,y
z=new O.d3(["# Insignificant Little Vermin",[null,P.a0(["goto","gameLoop"])]],0,null,!1,!1)
y=this.b.a
y.p(0,"start",z)
z.a="start"
z=new O.d3([new N.nY(this),[null,P.a0(["goto","gameLoop"])]],0,null,!1,!1)
y.p(0,"gameLoop",z)
z.a="gameLoop"
z=new O.d3(['<p class="meta">\n  Hit <strong>Restart</strong> (top left) to play again. It will be different.\n</p>'],0,null,!1,!1)
y.p(0,"endGame",z)
z.a="endGame"
this.c=y.j(0,"start")},
v:{
nX:function(){var z,y,x,w
z=Z.bP("Health",new N.tv(),"#CCCCCC","Your physical state",100,0,!0,P.aW)
y=P.t
x=Z.bP("Stamina",new N.tw(),"#CCCCCC","Spare physical energy",0,0,!0,y)
y=Z.bP("Gold",new N.tx(),"#CCCCCC","Gold coins",0,0,!0,y)
w=P.q
z=new N.nW("net.filiph.edgehead.0.0.1",null,z,x,y,new O.o1(new H.R(0,null,null,null,null,null,0,[w,O.d3])),null,null,null,P.a6(null,null,null,w),!1,null,-9999,null,null,null)
z.ig()
return z}}},tv:{"^":"a:19;",
$1:function(a){var z=J.o(a)
if(z.A(a,0))return"\ud83d\udc80"
if(z.df(a,0.5))return"\ud83d\ude23"
if(z.b0(a,1))return"\ud83d\ude27"
return"\ud83d\ude10"}},tw:{"^":"a:9;",
$1:function(a){return H.b(a)+" \ud83d\udd06"}},tx:{"^":"a:9;",
$1:function(a){return H.b(a)+" \ud83d\udcb0"}},nY:{"^":"a:20;a",
$0:function(){var z=0,y=P.aB(),x=this
var $async$$0=P.ax(function(a,b){if(a===1)return P.aH(b,y)
while(true)switch(z){case 0:z=2
return P.aw(x.a.cx.by(),$async$$0)
case 2:return P.aI(null,y)}})
return P.aJ($async$$0,y)}},nZ:{"^":"a:19;",
$1:function(a){var z=J.o(a)
if(z.A(a,0))return"\ud83d\udc80"
if(z.df(a,0.5))return"\ud83d\ude23"
if(z.b0(a,1))return"\ud83d\ude27"
return"\ud83d\ude10"}},o_:{"^":"a:9;",
$1:function(a){return H.b(a)+" \ud83d\udd06"}},o0:{"^":"a:9;",
$1:function(a){return H.b(a)+" \ud83d\udcb0"}}}],["","",,M,{"^":"",cQ:{"^":"d;"},l5:{"^":"d;"},q_:{"^":"cQ;a,b,c",
a2:function(a){var z=new M.ee(null,!1,0,0)
z.m(this)
a.$1(z)
return z.q()},
A:function(a,b){if(b==null)return!1
if(b===this)return!0
if(!(b instanceof M.cQ))return!1
return this.a===b.a&&this.b===b.b&&!0},
gD:function(a){return Y.U(Y.k(Y.k(Y.k(0,this.a&0x1FFFFFFF),this.b&0x1FFFFFFF),C.O.gD(!1)))},
k:function(a){return"EdgeheadGlobalState {bloodrockFollowers="+C.e.k(this.a)+",\nbrianaQuoteIndex="+C.e.k(this.b)+",\nhasKegOfBeer="+String(!1)+",\n}"}},ee:{"^":"l5;d,a,b,c",
gcA:function(){var z=this.d
if(z!=null){this.b=z.a
this.c=this.d.b
this.d.c
this.a=!1
this.d=null}return this},
m:function(a){this.d=a},
q:function(){var z,y,x
z=this.d
if(z==null){this.gcA()
y=this.b
this.gcA()
x=this.c
this.gcA()
this.a
z=new M.q_(y,x,!1)}this.m(z)
return z}}}],["","",,O,{"^":"",
xF:[function(a){var z,y
z=a.gcc()
y=a.gc0()
if(typeof y!=="number")return H.x(y)
return z-2*y},"$1","dk",2,0,28],
xR:[function(a){var z,y,x
z=a.gcc()
y=a.gd7()
x=a.gc0()
if(typeof x!=="number")return H.x(x)
return z+y-x},"$1","id",2,0,28],
f7:{"^":"mv;y,z,Q,ch,cx,cy,db,dx,dy,bH:fr<,fx,fe:fy<,ag:go<,b8:id<,k1,a,b,c,d,e,f,r,x",
hZ:function(){var z,y,x,w,v,u
z=P.aD(C.o,null)
y=$.$get$bz()
this.cy=R.b6(1000,"orc",O.dk(),null,null,new G.aG("sword",1,1,!1,!0,!1,z),null,0,2,0,!1,!1,2,!1,C.t,0,y)
this.db=R.b6(1001,"goblin",O.dk(),null,null,new G.aG("scimitar",1,1,!1,!0,!1,P.aD(C.o,null)),null,0,1,0,!1,!1,1,!1,C.t,0,y)
y=new S.O(null,null,[Q.v])
y.al()
y.m([new Q.v("start_adventure","","",null)])
this.dx=new K.co(y.q(),"preStartBook",new O.kX(),new O.kY(),null,null,"ground")
y=R.b6(1,"Filip",null,"preStartBook",null,null,null,0,2,1000,!1,!0,2,!0,C.F,1,null)
this.ch=y
z=y.x
y=y.db
if(typeof z!=="number")return z.dd()
if(typeof y!=="number")return H.x(y)
this.go.sae(z/y)
this.id.sae(this.ch.fy)
this.k1.sae(this.ch.r)
this.cx=R.b6(100,"Briana",null,this.dx.b,null,null,this.ch.y,0,2,0,!1,!1,2,!0,C.a5,0,null)
this.dy=F.fS(this.dx,!1)
y=K.co
x=P.P($.$get$i2(),!0,y)
C.a.ax(x,[this.dx,$.$get$ez()])
w=new M.ee(null,!1,0,0).q()
z=this.ch
v=this.cx
u=this.dy
v=P.b9([z,v],R.A)
z=P.bb(null,O.cF)
u=new A.a4(v,P.a6(null,null,null,U.ad),w,z,P.b9(x,y),P.P([u],!0,S.ae),0,null)
this.fr=u
y=new Y.a3(H.p([],[Y.ai]),0,P.b_())
y.b=u.r
this.fx=new B.bJ(u,null,y,1,1,!0,!1,!1,0)},
d9:function(){var z=0,y=P.aB(),x,w=this,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
var $async$d9=P.ax(function(a,b){if(a===1)return P.aH(b,y)
while(true)switch(z){case 0:v=w.fy
u=w.gjO()
if(v.hn(u)){z=1
break}t=w.fr.B(w.ch.y)
s=t.gag()
r=t.ghi()
if(typeof s!=="number"){x=s.dd()
z=1
break}if(typeof r!=="number"){x=H.x(r)
z=1
break}w.go.sae(s/r)
w.id.sae(t.gb8())
r=w.k1
s=t.gf7()
if(!J.e(r.f,s)){r.f=s
r.y=!0
$.cr=!0}s=w.y
s.he("update() for world at time "+w.fr.r)
r=w.fr.f
if(r.length===0){w.r=!0
v.n(0,"\n\n",!0)
if(w.fr.ka(w.ch.y))v.n(0,"TO BE CONTINUED.",!0)
else v.n(0,"You died.",!0)
w.f.E+=v.ct()
z=1
break}q=C.a.gw(r)
p=q.dW(w.fr)
if(p==null){v=w.fr
u=v.f
o=C.a.gw(u)
o.d1(v)
C.a.a3(u,o);++w.fr.r
z=1
break}n=G.j5(p,w.fr)
z=3
return P.aw(n.kJ(),$async$d9)
case 3:r=n.f
if(r.gY(r)){m=n.a
l=n.b
m.f4("There are no actions available for actorId="+H.b(l)+".")
l="Actions not available for "+H.b(l)+" and "
k=n.c
j=k.a
i=J.o(j)
j="PlanConsequence<"+i.gD(j)+", "+i.k(j)+", "+J.h(k.b)+", "+H.b(k.d)+", "+k.y+", "
m.bP(l+(j+(k.x?"isSuccess":"")+">")+".")}m=Z.n3(r)
h=new Z.n2(new P.hA(r,[null,null]),m)
if(r.gY(r))$.$get$bK().f4("Created with no recommendations.")
if(m.length===0){s.e_("No recommendation for "+H.b(p.gh()))
s.e_(new O.l_(w))
w.fr.h2(q.gi());++w.fr.r
z=1
break}z=p.gT()===!0?4:6
break
case 4:u=m.length
if(u>1)for(g=0;r=m.length,g<r;r===u||(0,H.as)(m),++g);s.bP("planner.generateTable for "+H.b(p.gh()))
n.f5().Z(0,new O.l0(w))
u=h.hp(q.gdJ(),O.id())
u.toString
f=P.P(u,!1,H.y(u,"B",0))
if(f.length!==0&&C.a.bt(f,new O.l1())){w.f.E+=v.ct()
C.a.sl(v.a,0)}v=new O.l2(new O.l4())
u=f.length-1
if(u-0<=32)H.h7(f,0,u,v)
else H.h6(f,0,u,v)
for(v=f.length,u=w.c,g=0;g<f.length;f.length===v||(0,H.as)(f),++g){e=f[g]
u.$3$helpMessage$script(e.gX(),e.gJ(),new O.l3(w,p,e))}z=1
break
z=5
break
case 6:s=p.gh0()
z=7
return P.aw(w.cB(h.kI(s==null?O.id():s),p,v),$async$d9)
case 7:case 5:v.hn(u)
case 1:return P.aI(x,y)}})
return P.aJ($async$d9,y)},
dq:function(a,b,c){var z=0,y=P.aB(),x=this,w,v,u,t,s,r,q,p,o,n,m,l
var $async$dq=P.ax(function(d,e){if(d===1)return P.aH(e,y)
while(true)switch(z){case 0:w=a.I(b,x.fr)
v=J.o(w)
z=v.A(w,1)?2:4
break
case 2:x.fx=C.a.gcd(c)
z=3
break
case 4:z=v.A(w,0)?5:7
break
case 5:x.fx=C.a.gcd(c)
z=6
break
case 7:u=C.a.gw(J.h(a.gL()).split("."))
v=v.l2(w)
t=a.ab(b,x.fr)
s=a.gO()&&b.kc(a.gL())
r="use "+H.b(u)
x.fK()
z=8
return P.aw(x.e.$4$rerollEffectDescription$rerollable(v,t,r,s),$async$dq)
case 8:q=e
s=new H.K(c,new O.kR(q),[H.m(c,0)])
x.fx=s.gcd(s)
if(q.gla()===!0){p=A.ed(x.fx.gbH())
p.W(b.gi(),new O.kS())
v=x.fx
t=v.gfP()
s=H.p([],[Y.ai])
r=new Y.a3(s,0,P.b_())
C.a.ax(s,v.c.a)
s=v.d
o=v.e
n=v.f
m=v.r
l=v.x
v=v.y
r.b=p.r
x.fx=new B.bJ(p,t,r,s,o,n,m,l,v)}case 6:case 3:return P.aI(null,y)}})
return P.aJ($async$dq,y)},
cB:function(a,b,c){var z=0,y=P.aB(),x,w=this,v,u,t
var $async$cB=P.ax(function(d,e){if(d===1)return P.aH(e,y)
while(true)switch(z){case 0:v=a.dD(b,w.fx,w.fr)
u=P.P(v,!0,H.y(v,"B",0))
z=b.gT()===!0?3:5
break
case 3:z=6
return P.aw(w.dq(a,b,u),$async$cB)
case 6:z=4
break
case 5:t=S.nv(new H.aq(u,new O.kU(),[H.m(u,0),null]),1)
if(t>=u.length){x=H.f(u,t)
z=1
break}w.fx=u[t]
case 4:C.a.ax(c.a,w.fx.gfe().a)
w.fr=w.fx.gbH()
v=w.y
v.bP(new O.kV(a,b))
v.an(new O.kW(w,b))
case 1:return P.aI(x,y)}})
return P.aJ($async$cB,y)}},
kX:{"^":"a:3;",
$3:function(a,b,c){return c.n(0,"UNUSED because this is the first choice",!0)}},
kY:{"^":"a:3;",
$3:function(a,b,c){return H.i(new P.w("Room isn't to be revisited"))}},
l_:{"^":"a:2;a",
$0:function(){var z=this.a.fr.d
return"- how we got here: "+new H.aq(z,new O.kZ(),[H.m(z,0),null]).cm(0," <- ")}},
kZ:{"^":"a:0;",
$1:function(a){return a.gaT()}},
l0:{"^":"a:0;a",
$1:function(a){return this.a.y.bP(a)}},
l4:{"^":"a:49;",
$1:function(a){if(a instanceof Q.z)return H.b(a.b.gh())+" "+a.gX()
return"ZZZZZZ "+a.gX()}},
l1:{"^":"a:0;",
$1:function(a){return a.gX()!==""}},
l2:{"^":"a:6;a",
$2:function(a,b){var z=this.a
return J.bD(z.$1(a),z.$1(b))}},
l3:{"^":"a:20;a,b,c",
$0:function(){var z=0,y=P.aB(),x=this,w
var $async$$0=P.ax(function(a,b){if(a===1)return P.aH(b,y)
while(true)switch(z){case 0:w=x.a
z=2
return P.aw(w.cB(x.c,x.b,w.fy),$async$$0)
case 2:return P.aI(null,y)}})
return P.aJ($async$$0,y)}},
kR:{"^":"a:0;a",
$1:function(a){return a.geO()===this.a.geO()}},
kS:{"^":"a:0;",
$1:function(a){var z=a.gb8()
if(typeof z!=="number")return z.at()
a.sb8(z-1)
return a}},
kU:{"^":"a:0;",
$1:function(a){return a.gkK()}},
kV:{"^":"a:2;a,b",
$0:function(){return H.b(this.b.gh())+" selected "+this.a.gh()}},
kW:{"^":"a:2;a,b",
$0:function(){var z,y
z=this.a.fr.d
y=new H.aq(z,new O.kT(),[H.m(z,0),null]).cm(0," <- ")
return"- how "+H.b(this.b.gh())+" got here: "+y}},
kT:{"^":"a:0;",
$1:function(a){return a.gaT()}}}],["","",,Q,{"^":"",
ij:function(a,b,c){return P.aU(function(){var z=a,y=b,x=c
var w=0,v=1,u,t,s,r,q,p
return function $async$ij(d,e){if(d===1){u=e
w=v}while(true)switch(w){case 0:t=y.f
t=t.length!==0?C.a.gw(t):null
s=J.j2(t.b6(y.a,y),new Q.uu(z))
t=J.aj(s.a),r=new H.bS(t,s.b,[H.m(s,0)])
case 2:if(!r.u()){w=3
break}q=t.gU()
p=x.$1(q)
if(p.gK()&&!z.eM(q,y)){w=2
break}w=4
return p
case 4:w=2
break
case 3:return P.aS()
case 1:return P.aT(u)}}})},
ik:function(a,b,c){return P.aU(function(){var z=a,y=b,x=c
var w=0,v=1,u,t
return function $async$ik(d,e){if(d===1){u=e
w=v}while(true)switch(w){case 0:t=y.f
t=y.dY((t.length!==0?C.a.gw(t):null).gbE()).gjS().a,t=new J.bj(t,t.length,0,null,[H.m(t,0)])
case 2:if(!t.u()){w=3
break}w=4
return x.$1(t.d)
case 4:w=2
break
case 3:return P.aS()
case 1:return P.aT(u)}}})},
il:function(a,b,c){return P.aU(function(){var z=a,y=b,x=c
var w=0,v=1,u,t
return function $async$il(d,e){if(d===1){u=e
w=v}while(true)switch(w){case 0:t=y.f
t=(t.length!==0?C.a.gw(t):null).gbn(),t=t.ga_(t)
case 2:if(!t.u()){w=3
break}w=4
return x.$1(t.d)
case 4:w=2
break
case 3:return P.aS()
case 1:return P.aT(u)}}})},
uu:{"^":"a:0;a",
$1:function(a){return!J.e(a,this.a)&&a.gaq()}},
ag:{"^":"d;",
dD:function(a,b,c){var z=this
return P.aU(function(){var y=a,x=b,w=c
var v=0,u=1,t,s,r,q,p
return function $async$dD(d,e){if(d===1){t=e
v=u}while(true)switch(v){case 0:s=z.I(y,x.gbH())
r=J.am(s)
v=r.bk(s,0)?2:3
break
case 2:q=A.ed(w)
v=4
return B.fG(q,x,z,z.is(q,y,w,z.gN(),!0),s,!1,!1,!0)
case 4:case 3:v=r.b0(s,1)?5:6
break
case 5:q=A.ed(w)
p=z.ir(q,y,w,z.gM(),!0)
if(typeof s!=="number")H.x(s)
v=7
return B.fG(q,x,z,p,1-s,!0,!1,!1)
case 7:case 6:return P.aS()
case 1:return P.aT(t)}}})},
fj:function(a,b,c,d,e,f){var z,y,x,w,v,u,t
a.x=this
z=a.a.bI(0,new Q.j3(b))
y=new O.eU(null,null,null,null,null,null,null,null,null,null,null,null,null)
x=this.gh()
y.ga5().c=x
x=b.gi()
y.ga5().r=x
y.ga5().f=C.T
y.ga5().cx=f
y.ga5().Q=e
x=this.gK()
y.ga5().z=x
x=this.ga1()
y.ga5().ch=x
if(!!this.$isz){x=y.ga5()
w=x.x
if(w==null){w=new L.aF(null,null,[P.t])
w.b2()
w.m(C.d)
x.x=w
x=w}else x=w
w=this.b.gi()
if(w==null)H.i(P.G("null element"))
x.gev().t(0,w)}if(!!this.$isc9){x=this.b.gh1()
y.ga5().d=x}v=new Y.a3(H.p([],[Y.ai]),0,P.b_())
x=a.f
u=(x.length!==0?C.a.gw(x):null).gi()
a.gD(a);(x.length!==0?C.a.gw(x):null).kF(a,v)
this.a=d.$3(z,a,v)
if(a.dt(u)!=null)a.h2(u);++a.r
w=a.f6(u)
if(!(w==null))w.hl(a,v)
a.x=null
while(!0){w=x.length!==0?C.a.gw(x):null
if((w==null?w:w.dW(a))!=null){w=x.length!==0?C.a.gw(x):null
w=!J.e(w==null?w:w.dj(a),!0)}else w=!0
if(!w)break
if((x.length!==0?C.a.gw(x):null)==null)break
t=C.a.gw(x)
t.d1(a)
C.a.a3(x,t)}x=x.length!==0?C.a.gw(x):null
if(!(x==null))x.hm(a,v)
if(this.a==null)H.i(new P.w("No description given when executing "+this.k(0)+". You should return it from your world-modifying function."))
x=this.a
y.ga5().e=x
x=a.r
y.ga5().y=x
a.d.fT(y.q())
return v},
is:function(a,b,c,d,e){return this.fj(a,b,c,d,!1,e)},
ir:function(a,b,c,d,e){return this.fj(a,b,c,d,e,!1)}},
j3:{"^":"a:0;a",
$1:function(a){return J.e(a.gi(),this.a.gi())}},
z:{"^":"ag;c0:b<",
gX:function(){var z=new Y.a3(H.p([],[Y.ai]),0,P.b_())
z.fR(0,this.ga6(),this.b)
return z.ct()},
ab:function(a,b){var z=new Y.a3(H.p([],[Y.ai]),0,P.b_())
z.jn(0,this.gaf(),this.b,a,!0)
return z.ct()},
k:function(a){var z=this.b
return"EnemyTargetAction<"+this.ga6()+"::enemy="+H.b(z.gi())+"/"+H.b(z.gh())+">"}},
c9:{"^":"ag;",
gX:function(){return this.b.gX()},
k:function(a){return"ExitAction<"+this.b.gX()+">"}},
cd:{"^":"ag;",
gX:function(){var z=new Y.a3(H.p([],[Y.ai]),0,P.b_())
z.fR(0,this.ga6(),this.b)
return z.ct()},
k:function(a){return"ItemAction<"+this.gX()+">"}},
nF:{"^":"d;a,b",
k:function(a){return this.b},
v:{"^":"xq<"}}}],["","",,O,{"^":"",cF:{"^":"d;",
k:function(a){return"ActionRecord<"+H.b(this.b)+", "+H.b(this.d)+">"}},mj:{"^":"d;a,b",
k:function(a){return this.b}},pW:{"^":"cF;a,dB:b<,eI:c<,aT:d<,e,cs:f<,fg:r<,V:x<,hG:y<,z,hH:Q<,hI:ch<",
a2:function(a){var z=new O.eU(null,null,null,null,null,null,null,null,null,null,null,null,null)
z.m(this)
a.$1(z)
return z.q()},
A:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof O.cF))return!1
if(J.e(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
if(z==null?y==null:z===y)if(J.e(this.d,b.d)){z=this.e
y=b.e
if(z==null?y==null:z===y)if(J.e(this.f,b.f))if(J.e(this.r,b.r)){z=this.x
y=b.x
if(z==null?y==null:z===y){z=this.y
y=b.y
if(z==null?y==null:z===y){z=this.z
y=b.z
if(z==null?y==null:z===y){z=this.Q
y=b.Q
if(z==null?y==null:z===y){z=this.ch
y=b.ch
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1
else z=!1
else z=!1}else z=!1
else z=!1}else z=!1}else z=!1
return z},
gD:function(a){return Y.U(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)),J.j(this.f)),J.j(this.r)),J.j(this.x)),J.j(this.y)),J.j(this.z)),J.j(this.Q)),J.j(this.ch)))},
k:function(a){return"ActionRecord {accomplices="+J.h(this.a)+",\nactionName="+J.h(this.b)+",\ndataString="+J.h(this.c)+",\ndescription="+H.b(J.h(this.d))+",\nknownTo="+J.h(this.e)+",\nprotagonist="+H.b(J.h(this.f))+",\nsufferers="+J.h(this.r)+",\ntime="+J.h(this.x)+",\nwasAggressive="+J.h(this.y)+",\nwasFailure="+J.h(this.z)+",\nwasProactive="+J.h(this.Q)+",\nwasSuccess="+J.h(this.ch)+",\n}"}},eU:{"^":"d;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",
gdB:function(){return this.ga5().c},
geI:function(){return this.ga5().d},
gaT:function(){return this.ga5().e},
gcs:function(){return this.ga5().r},
gfg:function(){var z,y
z=this.ga5()
y=z.x
if(y==null){y=new L.aF(null,null,[P.t])
y.b2()
y.m(C.d)
z.x=y
z=y}else z=y
return z},
gV:function(){return this.ga5().y},
ghG:function(){return this.ga5().z},
ghH:function(){return this.ga5().ch},
ghI:function(){return this.ga5().cx},
ga5:function(){var z,y
z=this.a
if(z!=null){z=z.a
if(!(z==null)){y=new L.aF(null,null,[H.m(z,0)])
y.b2()
y.m(z)
z=y}this.b=z
z=this.a
this.c=z.b
this.d=z.c
this.e=z.d
this.f=z.e
this.r=z.f
z=z.r
if(!(z==null)){y=new L.aF(null,null,[H.m(z,0)])
y.b2()
y.m(z)
z=y}this.x=z
z=this.a
this.y=z.x
this.z=z.y
this.Q=z.z
this.ch=z.Q
this.cx=z.ch
this.a=null}return this},
m:function(a){this.a=a},
q:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=this.a
if(z==null){y=this.ga5()
x=y.b
if(x==null){x=new L.aF(null,null,[P.t])
x.b2()
x.m(C.d)
y.b=x
y=x}else y=x
y=y.q()
x=this.ga5().c
w=this.ga5().d
v=this.ga5().e
u=this.ga5().f
t=this.ga5().r
s=this.ga5()
r=s.x
if(r==null){r=new L.aF(null,null,[P.t])
r.b2()
r.m(C.d)
s.x=r
s=r}else s=r
s=s.q()
r=this.ga5().y
q=this.ga5().z
p=this.ga5().Q
o=this.ga5().ch
n=this.ga5().cx
z=new O.pW(y,x,w,v,u,t,s,r,q,p,o,n)
if(y==null)H.i(P.l("accomplices"))
if(x==null)H.i(P.l("actionName"))
if(v==null)H.i(P.l("description"))
if(u==null)H.i(P.l("knownTo"))
if(t==null)H.i(P.l("protagonist"))
if(s==null)H.i(P.l("sufferers"))
if(r==null)H.i(P.l("time"))
if(q==null)H.i(P.l("wasAggressive"))
if(p==null)H.i(P.l("wasFailure"))
if(o==null)H.i(P.l("wasProactive"))
if(n==null)H.i(P.l("wasSuccess"))}this.m(z)
return z}}}],["","",,R,{"^":"",
im:function(a,b){return P.aU(function(){var z=a,y=b
var x=0,w=1,v,u
return function $async$im(c,d){if(c===1){v=d
x=w}while(true)switch(x){case 0:x=2
return z
case 2:u=y.a
x=3
return P.bU(new H.K(u,new R.uM(z),[H.m(u,0)]))
case 3:return P.aS()
case 1:return P.aT(v)}}})},
b6:function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q){var z=new R.eV(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
new R.tq(a,b,l,n,o,f,e,i,m,p,j,h,d,g,q,!1,c).$1(z)
return z.q()},
uM:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gh6()
y=this.a.gi()
return z==null?y==null:z===y}},
A:{"^":"mF;",
gfV:function(){return!0},
gaH:function(){var z=this.x
if(typeof z!=="number")return z.bk()
return z>0},
gaz:function(){return this.e instanceof K.cc},
gar:function(){return this.fr===C.h},
ga0:function(){return this.fr===C.f},
ga4:function(){return this.fr===C.k},
kb:function(a,b){var z,y,x
for(z=this.cy.a,y=new P.af(z,z.r,null,null,[null]),y.c=z.e,x=0;y.u();){if(C.a.a7(y.d.gf3(),a))++x
if(x>=b)return!0}return!1},
hb:function(a){return this.kb(a,1)},
jW:function(){var z,y,x,w,v,u,t
for(z=this.cy.a,y=new P.af(z,z.r,null,null,[null]),y.c=z.e,x=null,w=-9999999;y.u();){v=y.d
if(!(v instanceof L.aR))continue
z=v.gbJ()
u=v.gbA()
t=v.gaK()?1:0
if(2+z+u+t>w){z=v.gbJ()
u=v.gbA()
t=v.gaK()?1:0
w=2+z+u+t
x=v}}return x},
kc:function(a){var z=this.fy
if(typeof z!=="number")return z.bT()
return z>=1},
eM:function(a,b){return this.hd(a,b)>0},
hd:function(a,b){var z,y
if(this.ch===!0){z=a.gaY()
y=this.go.a
z=z.gi()
z=y==null?z==null:y===z}else z=!1
if(z)return 1000
if(this.iP(a,b,10))return 1
z=a.gaY()
y=this.go.a
z=z.gi()
return(y==null?z!=null:y!==z)?1:0},
di:function(a){var z,y,x,w,v,u,t,s,r,q,p
z=a.B(this.y)
y=z.gag()
if(typeof y!=="number")return H.x(y)
x=2*y
if(!z.gaH())x-=10
y=z.e
if(!(y instanceof K.cc))x+=4
y=J.b5(y.gae(),2)
if(typeof y!=="number")return H.x(y)
x+=y
for(y=z.cy.a,w=[null],v=new P.af(y,y.r,null,null,w),v.c=y.e;v.u();){y=J.b5(v.d.gae(),10)
if(typeof y!=="number")return H.x(y)
x+=y}y=a.a
for(v=y.ga_(y),u=new H.bS(v,new R.jz(this),[H.m(y,0)]),t=0;u.u();){s=v.gU()
r=s.gaq()?2:0
q=s.gag()
if(typeof q!=="number")return H.x(q)
p=J.b5(s.e.gae(),2)
if(typeof p!=="number")return H.x(p)
t=t+r+2*q+p
for(r=s.cy.a,q=new P.af(r,r.r,null,null,w),q.c=r.e;q.u();){r=J.b5(q.d.gae(),10)
if(typeof r!=="number")return H.x(r)
t+=r}}return new A.cG(x,t,y.bw(0,0,new R.jA(this,a)))},
iP:function(a,b,c){var z=b.l0(a,this,!0)
if(z==null)return!1
return z<=c},
$isaC:1},
mF:{"^":"d+dA;"},
tq:{"^":"a:0;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy",
$1:function(a){var z,y
a.gC().z=this.a
a.gC().dy=this.b
a.gC().fr=this.d
a.gC().fy=this.e
z=this.f
if(z==null)z=$.$get$dj()
a.gC().f=z
a.gC().e=this.r
a.gC().b=[]
a.gC().fx=C.k
a.gC().y=this.x
a.gC().dx=this.y
a.gC().x=this.ch
a.gC().go=this.z
a.gC().Q=this.Q
a.gC().ch=!0
a.gC().cy=this.c
z=new L.aF(null,null,[U.ad])
z.b2()
z.m(C.d)
a.gC().db=z
z=this.db
if(z!=null){y=new L.br(null,null)
y.m(z)
z=y}else{z=$.$get$dm()
z.toString
y=new L.br(null,null)
y.m(z)
z=y}a.gC().id=z
a.gC().d=this.cx
a.gC().r=this.cy
a.gC().cx=this.dx
a.gC().c=this.dy
return a}},
jz:{"^":"a:0;a",
$1:function(a){var z,y
z=this.a
if(J.e(a.gaY(),z.go)){y=a.gi()
z=z.y
z=y==null?z!=null:y!==z}else z=!1
return z}},
jA:{"^":"a:30;a,b",
$2:function(a,b){var z,y
z=b.gaq()?1:0
y=b.gag()
if(typeof y!=="number")return H.x(y)
return J.ao(a,(z+y)*this.a.hd(b,this.b))}},
e_:{"^":"d;a,b",
k:function(a){return this.b}},
pX:{"^":"A;a,h0:b<,bE:c<,am:d<,S:e<,h6:f<,f7:r<,ag:x<,i:y<,z,c2:Q<,c3:ch<,T:cx<,aC:cy<,hi:db<,h:dx<,aK:dy<,ah:fr<,a9:fx<,b8:fy<,aY:go<",
a2:function(a){var z=new R.eV(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
z.m(this)
a.$1(z)
return z.q()},
A:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof R.A))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y)if(J.e(this.b,b.b))if(J.e(this.c,b.c))if(J.e(this.d,b.d))if(J.e(this.e,b.e)){z=this.f
y=b.f
if(z==null?y==null:z===y){z=this.r
y=b.r
if(z==null?y==null:z===y){z=this.x
y=b.x
if(z==null?y==null:z===y){z=this.y
y=b.y
if(z==null?y==null:z===y){z=this.z
y=b.z
if(z==null?y==null:z===y){z=this.Q
y=b.Q
if(z==null?y==null:z===y){z=this.ch
y=b.ch
if(z==null?y==null:z===y){z=this.cx
y=b.cx
if(z==null?y==null:z===y)if(J.e(this.cy,b.cy)){z=this.db
y=b.db
if(z==null?y==null:z===y){z=this.dx
y=b.dx
if(z==null?y==null:z===y){z=this.dy
y=b.dy
if(z==null?y==null:z===y){z=this.fr
y=b.fr
if(z==null?y==null:z===y){z=this.fx
y=b.fx
if(z==null?y==null:z===y){z=this.fy
y=b.fy
z=(z==null?y==null:z===y)&&J.e(this.go,b.go)}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1
else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1
else z=!1
else z=!1
else z=!1
else z=!1
return z},
gD:function(a){return Y.U(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)),J.j(this.f)),J.j(this.r)),J.j(this.x)),J.j(this.y)),J.j(this.z)),J.j(this.Q)),J.j(this.ch)),J.j(this.cx)),J.j(this.cy)),J.j(this.db)),J.j(this.dx)),J.j(this.dy)),J.j(this.fr)),J.j(this.fx)),J.j(this.fy)),J.j(this.go)))},
k:function(a){return"Actor {categories="+J.h(this.a)+",\ncombineFunction="+J.h(this.b)+",\ncurrentRoomName="+H.b(J.h(this.c))+",\ncurrentShield="+H.b(J.h(this.d))+",\ncurrentWeapon="+H.b(J.h(this.e))+",\nfollowingActorId="+J.h(this.f)+",\ngold="+J.h(this.r)+",\nhitpoints="+J.h(this.x)+",\nid="+J.h(this.y)+",\ninitiative="+J.h(this.z)+",\nisActive="+J.h(this.Q)+",\nisConfused="+J.h(this.ch)+",\nisPlayer="+J.h(this.cx)+",\nitems="+J.h(this.cy)+",\nmaxHitpoints="+J.h(this.db)+",\nname="+J.h(this.dx)+",\nnameIsProperNoun="+J.h(this.dy)+",\npose="+J.h(this.fr)+",\npronoun="+J.h(this.fx)+",\nstamina="+J.h(this.fy)+",\nteam="+J.h(this.go)+",\n}"}},
eV:{"^":"d;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id",
gh0:function(){return this.gC().c},
gbE:function(){return this.gC().d},
sbE:function(a){this.gC().d=a
return a},
gam:function(){return this.gC().e},
sam:function(a){this.gC().e=a
return a},
gS:function(){return this.gC().f},
sS:function(a){this.gC().f=a
return a},
gh6:function(){return this.gC().r},
gf7:function(){return this.gC().x},
gag:function(){return this.gC().y},
sag:function(a){this.gC().y=a
return a},
gi:function(){return this.gC().z},
gc2:function(){return this.gC().ch},
gc3:function(){return this.gC().cx},
sc3:function(a){this.gC().cx=a
return a},
gT:function(){return this.gC().cy},
gaC:function(){var z,y
z=this.gC()
y=z.db
if(y==null){y=new L.aF(null,null,[U.ad])
y.b2()
y.m(C.d)
z.db=y
z=y}else z=y
return z},
ghi:function(){return this.gC().dx},
gh:function(){return this.gC().dy},
sh:function(a){this.gC().dy=a
return a},
gaK:function(){return this.gC().fr},
gah:function(){return this.gC().fx},
sah:function(a){this.gC().fx=a
return a},
ga9:function(){return this.gC().fy},
gb8:function(){return this.gC().go},
sb8:function(a){this.gC().go=a
return a},
gaY:function(){var z,y
z=this.gC()
y=z.id
if(y==null){y=new L.br(null,null)
z.id=y
z=y}else z=y
return z},
gC:function(){var z,y
z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.f=z.e
this.r=z.f
this.x=z.r
this.y=z.x
this.z=z.y
this.Q=z.z
this.ch=z.Q
this.cx=z.ch
this.cy=z.cx
z=z.cy
if(!(z==null)){y=new L.aF(null,null,[H.m(z,0)])
y.b2()
y.m(z)
z=y}this.db=z
z=this.a
this.dx=z.db
this.dy=z.dx
this.fr=z.dy
this.fx=z.fr
this.fy=z.fx
this.go=z.fy
z=z.go
if(!(z==null)){y=new L.br(null,null)
y.m(z)
z=y}this.id=z
this.a=null}return this},
m:function(a){this.a=a},
q:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d
z=this.a
if(z==null){y=this.gC().b
x=this.gC().c
w=this.gC().d
v=this.gC().e
u=this.gC().f
t=this.gC().r
s=this.gC().x
r=this.gC().y
q=this.gC().z
p=this.gC().Q
o=this.gC().ch
n=this.gC().cx
m=this.gC().cy
l=this.gC()
k=l.db
if(k==null){k=new L.aF(null,null,[U.ad])
k.b2()
k.m(C.d)
l.db=k
l=k}else l=k
l=l.q()
k=this.gC().dx
j=this.gC().dy
i=this.gC().fr
h=this.gC().fx
g=this.gC().fy
f=this.gC().go
e=this.gC()
d=e.id
if(d==null){d=new L.br(null,null)
e.id=d
e=d}else e=d
z=new R.pX(y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e.q())
if(y==null)H.i(P.l("categories"))
if(u==null)H.i(P.l("currentWeapon"))
if(s==null)H.i(P.l("gold"))
if(r==null)H.i(P.l("hitpoints"))
if(q==null)H.i(P.l("id"))
if(p==null)H.i(P.l("initiative"))
if(o==null)H.i(P.l("isActive"))
if(n==null)H.i(P.l("isConfused"))
if(m==null)H.i(P.l("isPlayer"))
if(l==null)H.i(P.l("items"))
if(k==null)H.i(P.l("maxHitpoints"))
if(j==null)H.i(P.l("name"))
if(i==null)H.i(P.l("nameIsProperNoun"))
if(h==null)H.i(P.l("pose"))
if(g==null)H.i(P.l("pronoun"))
if(f==null)H.i(P.l("stamina"))}this.m(z)
return z}}}],["","",,A,{"^":"",cG:{"^":"d;cc:a<,d7:b<,c0:c<",
at:function(a,b){return new A.ap(this.a-b.gcc(),this.b-b.gd7(),J.bC(this.c,b.gc0()))},
k:function(a){return"ActorScore<self="+C.j.bj(this.a,2)+",team="+C.j.bj(this.b,2)+",enemy="+J.c3(this.c,2)+">"}},ap:{"^":"d;cc:a<,d7:b<,c0:c<",
gks:function(){return this.a===-1/0&&this.b===-1/0&&J.e(this.c,-1/0)},
cb:function(a,b){if(typeof b!=="number")return H.x(b)
return new A.ap(this.a*b,this.b*b,J.c1(this.c,b))},
aj:function(a,b){return new A.ap(this.a+b.gcc(),this.b+b.gd7(),J.ao(this.c,b.gc0()))},
dd:function(a,b){if(typeof b!=="number")return H.x(b)
return new A.ap(this.a/b,this.b/b,J.b5(this.c,b))},
k:function(a){return"ActorScoreChange<self="+C.j.bj(this.a,2)+",team="+C.j.bj(this.b,2)+",enemy="+J.c3(this.c,2)+">"},
v:{
jy:function(a){var z,y,x,w,v,u,t,s,r
for(z=a.length,y=0,x=0,w=0,v=0,u=0;t=a.length,u<t;t===z||(0,H.as)(a),++u){s=a[u];++y
x+=s.a
w+=s.b
r=s.c
if(typeof r!=="number")return H.x(r)
v+=r}if(y===0)throw H.c(P.G("Cannot average empty iterable"))
return new A.ap(x/y,w/y,v/y)}}}}],["","",,U,{"^":"",
wR:function(a){switch(a){case C.y:return"fist"
case C.z:return"shield"
case C.r:return"spear"
case C.A:return"sword"}throw H.c(P.G(a))},
ad:{"^":"mG;f3:a<",
gaT:function(){return U.wR(C.a.gcV(this.a))},
gi:function(){return H.aE(this)},
gc2:function(){return!0},
gaH:function(){return!1},
gT:function(){return!1},
gaK:function(){return!1},
ga9:function(){return C.n},
gaY:function(){return $.$get$aL()},
$isaC:1},
mG:{"^":"d+dA;"},
cU:{"^":"d;a,b",
k:function(a){return this.b}}}],["","",,K,{"^":"",cc:{"^":"aR;h:b<,a"}}],["","",,E,{"^":"",bq:{"^":"ad;h:b<,a",
gae:function(){return 1},
$isaC:1}}],["","",,Z,{"^":"",ak:{"^":"aR;h:b<,bJ:c<,bA:d<,aK:e<,cj:f<,eF:r<,a",v:{
oB:function(a,b,c,d,e){return new Z.ak(c,0,e,!1,!1,!1,P.aD(C.D,null))}}}}],["","",,G,{"^":"",aG:{"^":"aR;h:b<,bJ:c<,bA:d<,aK:e<,cj:f<,eF:r<,a",v:{
pg:function(a,b,c,d,e,f){return new G.aG(c,e,f,d,!0,!1,P.aD(C.o,null))}}}}],["","",,L,{"^":"",aR:{"^":"ad;",
geF:function(){return!1},
gcj:function(){return!1},
gkp:function(){return!1},
gaV:function(){return this.gbJ()>0},
geP:function(){return this.gbA()>0},
gl:function(a){return 2},
gbJ:function(){return 0},
gbA:function(){return 0},
gae:function(){var z,y,x
z=this.gbJ()
y=this.gbA()
x=this.gaK()?1:0
return 2+z+y+x},
$isaC:1}}],["","",,G,{"^":"",mv:{"^":"d;",
fK:function(){var z,y
z=this.f
y=z.E
if(y.length!==0){this.b.$1(y.charCodeAt(0)==0?y:y)
z.E=""}},
lm:[function(a){this.f.E+=a},"$1","gjO",2,0,21],
by:function(){var z=0,y=P.aB(),x,w=this,v,u
var $async$by=P.ax(function(a,b){if(a===1)return P.aH(b,y)
while(true)switch(z){case 0:if(w.x==null)throw H.c(new P.w("Cannot run a LoopedEvent before onFinishedGoto is defined."))
if(w.r){w.d.sl(0,0)
w.a.$1(w.x)
z=1
break}v=w.d
u=w.f
case 3:if(!!0){z=4
break}if(!(!w.r&&v.gl(v)===0&&u.E.length===0)){z=4
break}z=5
return P.aw(w.d9(),$async$by)
case 5:z=3
break
case 4:w.fK()
case 1:return P.aI(x,y)}})
return P.aJ($async$by,y)}}}],["","",,B,{"^":"",f5:{"^":"d;dh:a<,dG:b<,d2:c<",
k:function(a){return"ConsequenceStats<order="+this.c+", cumProb="+J.c3(this.b,3)+", score="+this.a.k(0)+">"}},bJ:{"^":"d;bH:a<,fP:b<,fe:c<,kK:d<,dG:e<,f,r,eO:x<,d2:y<",
gD:function(a){return X.bB(H.p([this.a,this.e,this.b,this.d,this.y,this.f,this.r,this.x],[P.d]))},
A:function(a,b){var z
if(b==null)return!1
z=J.o(b)
return!!z.$isbJ&&this.gD(this)===z.gD(b)},
k:function(a){var z,y
z=this.a
y=J.o(z)
z="PlanConsequence<"+y.gD(z)+", "+y.k(z)+", "+J.h(this.b)+", "+H.b(this.d)+", "+this.y+", "
return z+(this.x?"isSuccess":"")+">"},
v:{
fG:function(a,b,c,d,e,f,g,h){var z,y
z=b==null
y=z?e:J.c1(e,b.gdG())
z=z?0:b.gd2()+1
d.b=a.r
return new B.bJ(a,c,d,e,y,g,f,h,z)}}}}],["","",,G,{"^":"",j4:{"^":"d;a,b,c,d,e,f",
jA:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=this.a
z.an("...")
z.an("combining scores")
y=H.p([],[A.ap])
x=new G.jr()
for(w=J.aj(a),v=b.a,u=b.b,t=b.c,s=null;w.u();){r=w.gU()
z.an(new G.jp(r))
if(J.ab(r.gdG(),0.15))if(s==null){z.an("    - first _bestCase")
s=r}else if(J.ab(x.$1(r.gdh()),x.$1(s.gdh()))){z.an("    - new _bestCase")
s=r}q=r.gdh()
p=J.bC(q.c,t)
o=r.b
if(typeof o!=="number")return H.x(o)
n=new A.ap((q.a-v)*o,(q.b-u)*o,J.c1(p,o))
z.an(new G.jq(n))
y.push(n)}m=A.jy(y)
w=s==null
if(w)l=C.H
else{q=s.gdh()
l=new A.ap(q.a-v,q.b-u,J.bC(q.c,t))}w=w?s:s.gd2()
if(w==null)w=1
if(typeof w!=="number")return H.x(w)
v=l.a/w
u=l.b/w
w=J.b5(l.c,w)
t=m.a
q=m.b
p=m.c
z.an("- uplifts average = "+("ActorScoreChange<self="+C.j.bj(t,2)+",team="+C.j.bj(q,2)+",enemy="+J.c3(p,2)+">"))
z.an("- best = "+("ActorScoreChange<self="+C.u.bj(v,2)+",team="+C.u.bj(u,2)+",enemy="+J.c3(w,2)+">"))
t=v+t
q=u+q
p=w+p
z.an("- result = "+("ActorScoreChange<self="+C.u.bj(t,2)+",team="+C.u.bj(q,2)+",enemy="+C.j.bj(p,2)+">"))
return new A.ap(t,q,p)},
f5:function(){var z=this
return P.aU(function(){var y=0,x=1,w,v,u,t,s
return function $async$f5(a,b){if(a===1){w=b
y=x}while(true)switch(y){case 0:v=z.f,u=v.gcn(),u=u.ga_(u),t=1
case 2:if(!u.u()){y=3
break}s=u.gU()
y=4
return""+t+") "+s.gX()+"\t"+H.b(v.j(0,s))
case 4:++t
y=2
break
case 3:return P.aS()
case 1:return P.aT(w)}}})},
dK:function(a,b,c){var z=0,y=P.aB(),x=this,w,v,u,t,s,r,q,p,o,n,m
var $async$dK=P.ax(function(d,e){if(d===1)return P.aH(e,y)
while(true)switch(z){case 0:w=x.f
w.bh(0)
v=x.c
u=v.a
t=u.a.bI(0,new G.js(x))
s=t.di(u)
r=x.a
r.bP("Planning for "+H.b(t.dx)+", initialScore="+s.k(0))
q=new P.bd(x.ef(t,u).a(),null,null,null)
case 2:if(!q.u()){z=3
break}p=q.c
o=p==null?q.b:p.gU()
r.bo(new G.jt(t,o))
if(o.H(t,u)!==!0){r.bo(new G.ju(o))
z=2
break}z=4
return P.aw(x.cF(v,o,b,a,c).cw(0),$async$dK)
case 4:n=e
if(J.eR(n)===!0){r.bo(new G.jv(o))
w.p(0,o,C.I)
z=2
break}r.bo(new G.jw(s,o,n))
m=x.jA(n,s,b)
w.p(0,o,m)
r.bo(new G.jx(o,m))
z=2
break
case 3:x.e=!0
return P.aI(null,y)}})
return P.aJ($async$dK,y)},
kJ:function(){return this.dK(50,10,null)},
ef:function(a,b){return P.aU(function(){var z=a,y=b
var x=0,w=1,v,u,t,s,r,q,p,o
return function $async$ef(c,d){if(c===1){v=d
x=w}while(true)switch(x){case 0:u=y.f
x=2
return P.bU((u.length!==0?C.a.gw(u):null).gbO())
case 2:u=(u.length!==0?C.a.gw(u):null).gaG()
t=u.length
s={func:1,ret:Q.cd,args:[U.ad]}
r={func:1,ret:Q.c9,args:[Q.v]}
q={func:1,ret:Q.z,args:[R.A]}
p=0
case 3:if(!(p<u.length)){x=5
break}o=u[p]
x=H.ay(o,q)?6:8
break
case 6:x=9
return P.bU(Q.ij(z,y,o))
case 9:x=7
break
case 8:x=H.ay(o,r)?10:12
break
case 10:x=13
return P.bU(Q.ik(z,y,o))
case 13:x=11
break
case 12:x=H.ay(o,s)?14:16
break
case 14:x=17
return P.bU(Q.il(z,y,o))
case 17:x=15
break
case 16:throw H.c(new P.w(o.k(0)+" is not one of the supported ones"))
case 15:case 11:case 7:case 4:u.length===t||(0,H.as)(u),++p
x=3
break
case 5:return P.aS()
case 1:return P.aT(v)}}})},
cF:function(a5,a6,a7,a8,a9){var $async$cF=P.ax(function(b0,b1){switch(b0){case 2:u=x
z=u.pop()
break
case 1:v=b1
z=w}while(true)switch(z){case 0:s={}
r=a5.a
q=r.a.bI(0,new G.j8(t))
p=t.a
p.bo("=====")
p.bo(new G.j9(a6,q))
p.bo(new G.ja(a6))
if(a6.H(q,r)!==!0){p.bo("- firstAction not applicable")
z=1
break}o=q.di(r)
p.bo(new G.jg(a5,o))
p.bo(new G.jh(a5))
n=P.bb(null,B.bJ)
m=P.a6(null,null,null,A.a4)
l=J.o(r)
k=l.gD(r)
for(j=new P.bd(a6.dD(q,a5,r).a(),null,null,null);j.u();){i=j.c
h=i==null?j.b:i.gU()
if(l.gD(r)!==k)throw H.c(new P.w("Action "+a6.k(0)+" modified world state when producing "+H.b(h)+"."))
n.aE(h)}s.a=0
r=t.b
case 3:if(!!n.gY(n)){z=4
break}++s.a
g=n.dM()
p.an("----")
p.an(new G.ji(g))
p.an(new G.jj(g))
if(g.gd2()>a7||s.a>a8){p.an(new G.jk(s,a7,g))
p.an(new G.jl(g))
z=4
break}z=g.gbH().f.length===0?5:6
break
case 5:p.an("- leaf node: world.situations is empty (end of book)")
l=g.a
q=l.a.aU(0,new G.jm(t),new G.jn())
if(q==null){p.an("- this actor ("+H.b(r)+") has been removed")
z=3
break}f=new B.f5(q.di(l),g.e,g.y)
p.an(new G.jb(f))
z=7
x=[1]
return P.dd(P.hK(f),$async$cF,y)
case 7:z=3
break
case 6:l=g.a
j=l.f
e=(j.length!==0?C.a.gw(j):null).dW(l)
j=l.a
i=new H.K(j,new G.jc(t),[H.m(j,0)])
d=i.gl(i)
if(d>1)throw H.c(new P.w("World has several duplicates of mainActor: "+J.h(l)))
else if(d===0){p.he("mainActor "+H.b(r)+" dies and is removed in world - will use defaultScoreWhenDead")
q=null}else q=j.bI(0,new G.jd(t))
c=J.e(e,q)
p.an("- actor: "+H.b(e.gh())+" (isMain=="+c+")")
j=q==null
p.an("- mainActor: "+H.b(j?q:q.gh()))
b=j?q:q.di(l)
if(b==null)b=C.J
f=new B.f5(b,g.e,g.y)
p.an(new G.je(o,f))
p.an(new G.jf(g))
z=8
x=[1]
return P.dd(P.hK(f),$async$cF,y)
case 8:p.an("- generating all actions for "+H.b(e.gh()))
j=n.c
i=n.b
a=n.a
for(a0=new P.bd(t.ef(e,l).a(),null,null,null);a0.u();){a1=a0.c
a2=a1==null?a0.b:a1.gU()
if(a2.H(e,l)!==!0)continue
for(a1=new P.bd(a2.dD(e,g,l).a(),null,null,null);a1.u();){a3=a1.c
a4=a3==null?a1.b:a3.gU();++t.d
if(J.c0(a4.gdG(),0.05))continue
if(m.a7(0,a4.gbH()))continue
n.aE(a4)}}p.an("- added "+(((n.c-n.b&n.a.length-1)>>>0)-((j-i&a.length-1)>>>0))+" new PlanConsequences")
m.t(0,l)
z=3
break
case 4:case 1:return P.dd(null,0,y)
case 2:return P.dd(v,1,y)}})
var z=0,y=P.qo($async$cF),x,w=2,v,u=[],t=this,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4
return P.rK(y)},
i8:function(a,b){var z
if(a==null){z=b.d
throw H.c(P.G("Called ActorPlanner with actor == null. That may mean that a Situation returns getCurrentActor as null. Some action that you added should make sure it removes the Situation (maybe "+H.b(z.gcV(z).gaT())+"?). World: "+J.h(b)+". Situation: "+H.b(b.gjE())+". Action Records: "+z.aJ(0,new G.jo()).cm(0,"<-")))}},
v:{
j5:function(a,b){var z,y,x
z=N.bm("ActorPlanner")
y=a==null?a:a.gi()
x=new Y.a3(H.p([],[Y.ai]),0,P.b_())
x.b=b.r
z=new G.j4(z,y,new B.bJ(b,null,x,1,1,!0,!1,!1,0),0,!1,new H.R(0,null,null,null,null,null,0,[null,null]))
z.i8(a,b)
return z}}},jo:{"^":"a:0;",
$1:function(a){return a.gaT()}},jr:{"^":"a:32;",
$1:function(a){var z=a.c
if(typeof z!=="number")return H.x(z)
return a.b-z}},jp:{"^":"a:2;a",
$0:function(){return"  - consequence: "+H.b(this.a)}},jq:{"^":"a:2;a",
$0:function(){return"    - uplift = "+this.a.k(0)}},js:{"^":"a:0;a",
$1:function(a){return J.e(a.gi(),this.a.b)}},jt:{"^":"a:2;a,b",
$0:function(){return"Evaluating action '"+this.b.gX()+"' for "+H.b(this.a.dx)}},ju:{"^":"a:2;a",
$0:function(){return"- action '"+this.a.gX()+"' isn't applicable"}},jv:{"^":"a:2;a",
$0:function(){return"- action '"+this.a.gX()+"' is possible but we couldn't get to any outcomes while planning. Scoring with negative infinity."}},jw:{"^":"a:2;a,b,c",
$0:function(){return"- action '"+this.b.gX()+"' leads to "+H.b(J.aN(this.c))+" different ConsequenceStats, initialScore="+this.a.k(0)}},jx:{"^":"a:2;a,b",
$0:function(){return"- action '"+this.a.gX()+"' was scored "+this.b.k(0)}},j8:{"^":"a:0;a",
$1:function(a){return J.e(a.gi(),this.a.b)}},j9:{"^":"a:2;a,b",
$0:function(){return"_getConsequenceStats for firstAction '"+this.a.gX()+"' of "+H.b(this.b.gh())}},ja:{"^":"a:2;a",
$0:function(){return"- firstAction == "+H.b(this.a)}},jg:{"^":"a:2;a,b",
$0:function(){var z=this.a
return"- current: initialScore="+this.b.k(0)+", cumProb="+H.b(z.e)+" (prob="+H.b(z.d)+", ord="+z.y+")"}},jh:{"^":"a:2;a",
$0:function(){var z=this.a
return"- initial action: "+C.b.cb(" ",z.y)+"- "+J.h(z.b)}},ji:{"^":"a:2;a",
$0:function(){return"evaluating a PlanConsequence of '"+this.a.gfP().gX()+"'"}},jj:{"^":"a:2;a",
$0:function(){var z=this.a.gbH().f
return"- situation: "+H.b(J.iW(z.length!==0?C.a.gw(z):null))}},jk:{"^":"a:2;a,b,c",
$0:function(){return"- order ("+this.c.gd2()+") higher than maximum ("+this.b+"), or consequences ("+this.a.a+") higher than maximum"}},jl:{"^":"a:2;a",
$0:function(){var z=this.a.gbH().d
return"- how we got here: "+new H.aq(z,new G.j7(),[H.m(z,0),null]).cm(0," <- ")}},j7:{"^":"a:0;",
$1:function(a){return a.gaT()}},jm:{"^":"a:0;a",
$1:function(a){return J.e(a.gi(),this.a.b)}},jn:{"^":"a:2;",
$0:function(){return}},jb:{"^":"a:2;a",
$0:function(){return"- "+this.a.k(0)}},jc:{"^":"a:0;a",
$1:function(a){return J.e(a.gi(),this.a.b)}},jd:{"^":"a:0;a",
$1:function(a){return J.e(a.gi(),this.a.b)}},je:{"^":"a:2;a,b",
$0:function(){return"- mainActor's score == "+this.b.k(0)+" (initial="+this.a.k(0)+")"}},jf:{"^":"a:2;a",
$0:function(){var z=this.a.gbH().d
return"- how we got here: "+new H.aq(z,new G.j6(),[H.m(z,0),null]).cm(0," <- ")}},j6:{"^":"a:0;",
$1:function(a){return a.gaT()}}}],["","",,Z,{"^":"",n2:{"^":"d;a,b",
gbO:function(){return this.b},
gY:function(a){return this.b.length===0},
hp:function(a,b){var z=this
return P.aU(function(){var y=a,x=b
var w=0,v=2,u,t,s,r,q,p,o,n,m,l
return function $async$hp(c,d){if(c===1){u=d
w=v}while(true)switch(w){case 0:t=z.b
w=t.length<=y?3:4
break
case 3:w=5
return P.bU(t)
case 5:w=1
break
case 4:s=z.iJ(new Z.n5())
r=z.ee(new Z.n6(),[s])
q=z.ee(new Z.n7(),[s,r])
w=s!=null?6:8
break
case 6:$.$get$bK().bP("best self preserving: "+H.b(s))
w=9
return s
case 9:p=1
w=7
break
case 8:p=0
case 7:w=r!=null&&p<y?10:11
break
case 10:$.$get$bK().bP("best enemy damaging: "+H.b(r))
w=12
return r
case 12:++p
case 11:w=q!=null&&p<y?13:14
break
case 13:$.$get$bK().bP("best team preserving: "+H.b(q))
w=15
return q
case 15:++p
case 14:if(p===y){w=1
break}C.a.ce(t,new Z.n8(z,x))
o=t.length,n=0
case 16:if(!(n<t.length)){w=18
break}m=t[n]
l=J.o(m)
if(l.A(m,s)){w=17
break}if(l.A(m,r)){w=17
break}if(l.A(m,q)){w=17
break}w=19
return m
case 19:++p
if(p===y){w=18
break}case 17:t.length===o||(0,H.as)(t),++n
w=16
break
case 18:case 1:return P.aS()
case 2:return P.aT(u)}}})},
kI:function(a){var z,y,x,w,v,u,t,s,r,q,p
z={}
y=this.b
if(y.length===1)return C.a.gcd(y)
C.a.ce(y,new Z.n9(this,a))
x=this.a.a
w=x.gcz().bw(0,1/0,new Z.na(a))
v=x.gcz().bw(0,-1/0,new Z.nb(a))
x=J.am(v)
u=J.am(w)
t=u.at(w,J.c1(x.at(v,w),0.1))
z.a=t
if(u.A(w,v)){t=J.bC(t,1)
z.a=t
u=t}else u=t
s=x.at(v,u)
r=P.mt(y.length,new Z.nc(z,this,a,s),!1,P.M)
q=new H.aq(r,new Z.nd(C.a.bw(r,0,Z.v8())),[H.m(r,0),null]).bF(0,!1)
z=C.a.bw(q,0,Z.v9())
if(typeof z!=="number")return H.x(z)
u=q.length
x=u-1
if(x<0)return H.f(q,x)
z=J.ao(q[x],1000-z)
if(x>=q.length)return H.f(q,x)
q[x]=z
p=S.nw(q,1000)
if(p>=y.length)return H.f(y,p)
return y[p]},
ee:function(a,b){var z,y,x,w,v,u,t
for(z=this.b,y=z.length,x=this.a.a,w=null,v=null,u=0;u<z.length;z.length===y||(0,H.as)(z),++u){t=z[u]
if(C.a.a7(b,t))continue
if(w==null||J.ab(a.$1(x.j(0,t)),v)){v=a.$1(x.j(0,t))
w=t
continue}}return w},
iJ:function(a){return this.ee(a,C.d)},
v:{
n3:function(a){var z,y,x
z=a.gcn()
y=H.y(z,"B",0)
x=P.P(new H.K(z,new Z.n4(a),[y]),!1,y)
if(x.length===0)$.$get$bK().f4("After removing actions scored by undefined, there are no recommendations.")
return x},
xn:[function(a,b){return J.ao(a,b)},"$2","v8",4,0,44],
xo:[function(a,b){return J.ao(a,b)},"$2","v9",4,0,45]}},n5:{"^":"a:0;",
$1:function(a){return a.gcc()}},n6:{"^":"a:0;",
$1:function(a){return J.iS(a.gc0())}},n7:{"^":"a:0;",
$1:function(a){return a.gd7()}},n8:{"^":"a:6;a,b",
$2:function(a,b){var z,y
z=this.b
y=this.a.a.a
return-J.bD(z.$1(y.j(0,a)),z.$1(y.j(0,b)))}},n9:{"^":"a:6;a,b",
$2:function(a,b){var z,y
z=this.b
y=this.a.a.a
return-J.bD(z.$1(y.j(0,a)),z.$1(y.j(0,b)))}},na:{"^":"a:6;a",
$2:function(a,b){var z=this.a.$1(b)
return Math.min(H.dg(a),H.dg(z))}},nb:{"^":"a:6;a",
$2:function(a,b){var z=this.a.$1(b)
return Math.max(H.dg(a),H.dg(z))}},nc:{"^":"a:9;a,b,c,d",
$1:function(a){var z,y
z=this.b
y=z.b
if(a>=y.length)return H.f(y,a)
return J.b5(J.bC(this.c.$1(z.a.a.j(0,y[a])),this.a.a),this.d)}},nd:{"^":"a:0;a",
$1:function(a){return J.iZ(J.c1(J.b5(a,this.a),1000))}},n4:{"^":"a:0;a",
$1:function(a){return!this.a.j(0,a).gks()}}}],["","",,K,{"^":"",rU:{"^":"a:3;",
$3:function(a,b,c){}},co:{"^":"d;a,h:b<,c,d,jU:e<,f,ca:r<",
gjS:function(){return this.a},
gD:function(a){return C.b.gD(this.b)},
A:function(a,b){if(b==null)return!1
return b instanceof K.co&&b.b===this.b},
k:function(a){return"Room<"+this.b+">"},
jJ:function(a,b,c){return this.c.$3(a,b,c)},
i0:function(a,b,c){return this.d.$3(a,b,c)},
jV:function(a,b,c){return this.e.$3(a,b,c)},
v:{
a1:function(a,b,c,d,e,f,g){var z=new S.O(null,null,[Q.v])
z.al()
z.m(f)
return new K.co(z.q(),a,b,c,d,e,g)}}}}],["","",,Q,{"^":"",v:{"^":"d;h1:a<,X:b<,aT:c<,km:d<"}}],["","",,S,{"^":"",ae:{"^":"d;",
gaG:function(){return C.d},
gbO:function(){return C.d},
gdJ:function(){return 3},
dW:function(a){return this.b_(this.gV(),a)},
hl:function(a,b){},
hm:function(a,b){},
kF:function(a,b){},
d1:function(a){},
dj:function(a){return!0}}}],["","",,S,{"^":"",
fP:function(a){var z=$.$get$bM().as(3)
if(z<0||z>=3)return H.f(a,z)
return a[z]},
nv:function(a,b){var z,y,x,w,v
z=$.$get$bM().kE()*b
for(y=new H.dO(a,a.gl(a),0,null,[H.y(a,"b0",0)]),x=0,w=0;y.u();){v=y.d
if(typeof v!=="number")return H.x(v)
x+=v
if(x>=z)return w;++w}throw H.c(P.G("The weights do not add up to total="+b))},
nw:function(a,b){var z,y,x,w,v,u,t
z=$.$get$bM().as(b)
for(y=a.length,x=0,w=0,v=0;u=a.length,v<u;u===y||(0,H.as)(a),++v){t=a[v]
if(typeof t!=="number")return H.x(t)
x+=t
if(x>=z)return w;++w}throw H.c(P.G("The weights do not add up to total="+b))},
bN:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=J.L(a)
y=z.b3(a,"{")
if(y!==-1){x=z.gl(a)
if(typeof x!=="number")return x.at()
x=y<x-1}else x=!1
if(x){w=H.p([],[P.t])
w.push(y)
u=y+1
t=null
s=1
while(!0){x=z.gl(a)
if(typeof x!=="number")return H.x(x)
if(!(u<x)){v=null
break}r=z.j(a,u)
x=J.o(r)
if(x.A(r,"{"))++s
else if(x.A(r,"|")&&s===1)w.push(u)
else if(x.A(r,"}")){--s
if(s===0){w.push(u)
v=u
t=v
break}}q=u+1
t=u
u=q}p=w.length-1
if(p>1){o=$.$get$bM().as(p)
z=z.aM(a,0,y)
x=w.length
if(o<0||o>=x)return H.f(w,o)
n=w[o]
m=o+1
if(m>=x)return H.f(w,m)
m=z+H.b(S.bN(C.b.aM(a,n+1,w[m])))
if(typeof v!=="number")return v.aj()
n=a.length
m+=C.b.aM(a,v+1,n)
z=m.charCodeAt(0)==0?m:m
if(t===n-1)return z
else return S.bN(z)}else{x=z.gl(a)
if(typeof x!=="number")return x.at()
if(t===x-1)return a
else{if(typeof t!=="number")return t.aj()
x=t+1
return z.aM(a,0,x)+H.b(S.bN(C.b.bK(a,x)))}}}else return a},
a7:function(a,b,c,d){var z=c!=null?3:2
switch($.$get$bM().as(z)){case 0:a.$0()
break
case 1:b.$0()
break
case 2:c.$0()
break
case 4:d.$0()
break}}}],["","",,Y,{"^":"",ai:{"^":"d;b9:a<,b1:b<,aW:c<,ho:d<,e,dE:f@,hr:r<,hj:x<,ff:y<,jR:z<,i3:Q<,dc:ch<,jh:cx<,kr:cy<,V:db<",
j:function(a,b){switch(b){case"string":return this.a
case"subject":return this.b
case"object":return this.c
case"owner":return this.d
case"but":return this.f
case"positive":return this.r
case"negative":return this.x
case"endSentence":return this.z
case"startSentence":return this.Q
case"wholeSentence":return this.ch
case"time":return this.db
default:throw H.c(P.G("Invalid key "+H.b(b)+"."))}},
k:function(a){var z=this.a
z="Report<"+C.b.aM(z,0,Math.min(z.length,20))+"...,thread="+H.b(this.cx)
return z+(this.cy?"(sup)":"")+">"}},a3:{"^":"d;a,V:b<,c",
geL:function(){return C.a.bt(this.a,new Y.oP())},
aS:function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){var z,y
if(b==null||J.e(b,""))return
z=(J.bh(b).eJ(b,".")||C.b.eJ(b,"!")||C.b.eJ(b,"?"))&&C.b.dl(b,P.bp("[A-Z]",!0,!1))?!0:p
y=this.b
this.a.push(new Y.ai(b,m,h,j,i,d,k,g,!1,e,l,z,c,f,y))},
t:function(a,b){return this.aS(a,b,null,!1,!1,!1,!1,null,null,null,!1,!1,null,!1,null,!1)},
n:function(a,b,c){return this.aS(a,b,null,!1,!1,!1,!1,null,null,null,!1,!1,null,!1,null,c)},
bX:function(a,b,c,d){return this.aS(a,b,null,!1,!1,!1,!1,null,null,c,!1,!1,d,!1,null,!1)},
jj:function(a,b,c,d,e,f,g,h,i,j,k,l,m,n){return this.aS(a,b,c,d,e,f,g,h,i,j,k,!1,l,m,null,n)},
fR:function(a,b,c){return this.aS(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,null,!1,null,!1)},
eA:function(a,b,c,d,e){return this.aS(a,b,null,!1,!1,!1,c,null,null,null,!1,d,e,!1,null,!1)},
ez:function(a,b,c,d){return this.aS(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,d,!1,null,!1)},
bX:function(a,b,c,d){return this.aS(a,b,null,!1,!1,!1,!1,null,null,c,!1,!1,d,!1,null,!1)},
fS:function(a,b,c,d,e,f){return this.aS(a,b,c,!1,!1,!1,!1,d,null,null,e,!1,f,!1,null,!1)},
jo:function(a,b,c,d,e,f){return this.aS(a,b,c,!1,!1,d,!1,e,null,null,!1,!1,f,!1,null,!1)},
jl:function(a,b,c){return this.aS(a,b,c,!1,!1,!1,!1,null,null,null,!1,!1,null,!1,null,!1)},
jm:function(a,b,c,d){return this.aS(a,b,c,!1,!1,!1,!1,d,null,null,!1,!1,null,!1,null,!1)},
jp:function(a,b,c,d,e,f){return this.aS(a,b,null,!1,!1,!1,!1,c,null,d,!1,!1,e,!1,null,f)},
jn:function(a,b,c,d,e){return this.aS(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,d,!1,null,e)},
jt:function(a,b,c,d,e,f,g,h){var z,y,x,w,v,u,t
if(b.length===0)return
z=H.b(new Y.oN().$1(a))+" "
for(y=b.length,x=e-1,w=0,v=0,u=0;u<b.length;b.length===y||(0,H.as)(b),++u){t=b[u]
if(w>0){if(w===1&&J.e(t,C.a.gw(b)))z=z+" "+d
else z=w===x?z+(", "+d):z+","
z+=" "}z+=H.b(this.bY(t.gh(),t.gh(),t,null,this.b));++w
if(w>x||J.e(t,C.a.gw(b))){z+="."
this.jp(0,z.charCodeAt(0)==0?z:z,f,g,h,!0);++v
z=H.n(a,"<also>","also")+" "
w=0}}},
js:function(a,b,c,d){return this.jt(a,b,c,"and",3,null,null,d)},
eC:function(){return this.n(0,"\n\n",!0)},
bY:function(a,b,c,d,e){var z,y,x,w
if(d!=null){z=J.L(a)
z=z.b3(a,"<owner's> "+H.b(b))!==-1||z.b3(a,"<ownerPronoun's> "+H.b(b))!==-1||z.b3(a,"<object-owner's> "+H.b(b))!==-1||z.b3(a,"<object-ownerPronoun's> "+H.b(b))!==-1}else z=!1
if(z)return a
z=J.L(a)
if(z.b3(a,"<subject's> "+H.b(b))!==-1||z.b3(a,"<subjectPronoun's> "+H.b(b))!==-1)return a
if(c.gaK()!==!0){y=this.c
x=y.j(0,c.gi())
if((x==null?-1:x)<e)w=z.d5(a,b,"the "+H.b(b))
else{w=J.eT(c.gh(),P.bp("[aeiouy]",!1,!1))?z.d5(a,b,"an "+H.b(b)):z.d5(a,b,"a "+H.b(b))
y.p(0,c.gi(),e)}}else w=null
return w==null?a:w},
eK:function(a,b){var z,y
if(!this.aZ(a)||!this.aZ(b))return!1
z=this.a
if(a<0||a>=z.length)return H.f(z,a)
if(z[a].gb1()!=null){if(b<0||b>=z.length)return H.f(z,b)
y=z[b].gb1()==null}else y=!0
if(y)return!1
if(a>=z.length)return H.f(z,a)
if(z[a].gaW()!=null){if(b<0||b>=z.length)return H.f(z,b)
y=z[b].gaW()==null}else y=!0
if(y)return!1
if(a>=z.length)return H.f(z,a)
y=z[a].gb1().gi()
if(b<0||b>=z.length)return H.f(z,b)
if(J.e(y,z[b].gaW().gi())){if(a>=z.length)return H.f(z,a)
y=z[a].gaW().gi()
if(b>=z.length)return H.f(z,b)
z=J.e(y,z[b].gb1().gi())}else z=!1
return z},
dV:function(a){var z=this
return P.aU(function(){var y=a
var x=0,w=2,v,u,t
return function $async$dV(b,c){if(b===1){v=c
x=w}while(true)switch(x){case 0:if(!z.aZ(y)){x=1
break}u=z.a
if(y<0||y>=u.length)H.f(u,y)
t=u[y]
x=t.gb1()!=null?3:4
break
case 3:x=5
return t.gb1()
case 5:case 4:x=t.gaW()!=null?6:7
break
case 6:x=8
return t.gaW()
case 8:case 7:x=t.gho()!=null?9:10
break
case 9:x=11
return t.d
case 11:case 10:u=t.e
x=u!=null?12:13
break
case 12:x=14
return u
case 14:case 13:case 1:return P.aS()
case 2:return P.aT(v)}}})},
d0:[function(a){var z=J.am(a)
if(z.b0(a,0)||z.bT(a,this.a.length))return
else{z=this.a
if(a>>>0!==a||a>=z.length)return H.f(z,a)
return z[a].gaW()}},"$1","gaW",2,0,22],
kG:function(a,b){var z
if(!this.aZ(a)||!this.aZ(b))return!1
if(this.eK(a,b)){z=this.a
if(a>=z.length)return H.f(z,a)
z[a].gff()}return!1},
hn:function(a){var z
for(z=!1;this.geL();z=!0){a.$1(this.hs(!0))
this.kO()}return z},
hs:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c
z=this.a
y=C.a.bw(z,[],new Y.oQ())
C.a.j3(z,new Y.oR(y),!1)
x=a&&this.geL()?C.a.b3(z,C.a.cl(z,new Y.oS()))+1:z.length
if(x<1)return""
for(w=-1,v=!0,u=!1,t=!1,s=0,r="";s<x;++s){q=s===0
if(!q){p=s-1
o=this.eK(p,s)
if(s>=z.length)return H.f(z,s)
if(!z[s].gdE())n=this.kG(s,p)&&this.i2(s,p)
else n=!0
if(n){if(p<0||p>=z.length)return H.f(z,p)
t=!z[p].gdE()}else t=!1
if(s>=z.length)return H.f(z,s)
z[s].sdE(t)
n=s-w
if(n<3)if(!u){if(s>=z.length)return H.f(z,s)
if(!z[s].gi3()){if(p<0||p>=z.length)return H.f(z,p)
if(!z[p].gjR()){if(s>=z.length)return H.f(z,s)
if(!z[s].gdc())if(this.dz(s,p)||o)if(!(t&&n>1)){if(t){if(p>=z.length)return H.f(z,p)
n=z[p].gdE()}else n=!1
n=n||this.l1(s)>4}else n=!0
else n=!0
else n=!0}else n=!0}else n=!0
v=n}else v=!0
else v=!0
if(v){if(p<0||p>=z.length)return H.f(z,p)
if(z[p].gdc()){r+=" "
p=r}else{r+=". "
p=r}if(t){if(s>=z.length)return H.f(z,s)
n=!z[s].gdc()}else n=!1
r=n?r+"But ":p
u=!1}else if(t){r+=S.fP([" but "," but ",", but "])
u=!this.hP(s,s+1)&&!0}else{r+=S.fP([" and "," and ",", and "])
u=!0}}m=this.e3(s)
l=S.bN(m)
p=J.L(l)
if(p.a7(l,"{")===!0||p.a7(l,"}")===!0)$.$get$iv().e_('Storyline result includes { and/or } even after being parsed by Randomly. Is there a dangling bracket here? Input = """'+H.b(m)+'""" Output = """'+H.b(l)+'"""')
n=!v
if(n){k=s-1
k=this.dz(s,k)&&J.eT(this.e3(k),"<subject> ")&&p.dl(l,"<subject> ")}else k=!1
if(k)l=p.d5(l,"<subject> ","")
j=J.dt(l,"<action>",this.e3(s))
p=s-1
k=this.j6(s,p)
if(k)k=!(this.d0(s).ga9()===C.n&&this.bs(s).ga9()===C.n)
else k=!1
if(k){j=H.n(j,"<object-owner's> <object>","<objectPronounAccusative>")
j=H.n(j,"<object-ownerPronoun's> <object>","<objectPronounAccusative>")
j=H.n(j,"<object>","<objectPronounAccusative>")
j=H.n(j,"<object's>","<objectPronoun's>")}k=this.dz(s,p)
if(k){j=H.n(j,"<owner's> <subject>","<subjectPronoun>")
j=H.n(j,"<ownerPronoun's> <subject>","<subjectPronoun>")
j=H.n(j,"<subject>","<subjectPronoun>")
j=H.n(j,"<subject's>","<subjectPronoun's>")}if(this.d0(p)!=null)if(this.bs(s)!=null)if(this.bs(p)!=null){k=this.d0(p)
k=k==null?k:k.gi()
i=this.bs(s)
if(J.e(k,i==null?i:i.gi())){k=this.bs(p)
k=k==null?k:k.ga9()
i=this.bs(s)
k=!J.e(k,i==null?i:i.ga9())}else k=!1}else k=!1
else k=!1
else k=!1
if(k){j=H.n(j,"<owner's> <subject>","<subjectPronoun>")
j=H.n(j,"<ownerPronoun's> <subject>","<subjectPronoun>")
j=H.n(j,"<subject>","<subjectPronoun>")
j=H.n(j,"<subject's>","<subjectPronoun's>")}if(this.bs(p)!=null)if(this.d0(s)!=null){k=this.bs(p)
k=k==null?k:k.gi()
i=this.d0(s)
if(J.e(k,i==null?i:i.gi())){p=this.bs(p)
p=p==null?p:p.ga9()
k=this.bs(s)
p=!J.e(p,k==null?k:k.ga9())}else p=!1}else p=!1
else p=!1
if(p){j=H.n(j,"<object-owner's> <object>","<objectPronoun>")
j=H.n(j,"<object-ownerPronoun's> <object>","<objectPronoun>")
j=H.n(j,"<object>","<objectPronounAccusative>")
j=H.n(j,"<object's>","<objectPronoun's>")}if(s>=z.length)return H.f(z,s)
p=z[s]
h=p.gb1()
g=p.gaW()
f=p.gho()
e=p.e
k=h!=null
if(k){if(h.gT()===!0){d=H.n(j,"<subject>","<subjectPronoun>")
d=H.n(d,"<subject's>","<subjectPronoun's>")}else d=j
if(h.ga9()===C.F||h.ga9()===C.E){d=H.n(d,"<s>","")
d=H.n(d,"<es>","")
d=H.n(d,"<sses>","ss")
d=H.n(d,"<ies>","y")
d=H.n(d,"<does>","do")
d=H.n(d,"<is>","are")
d=H.n(d,"<has>","have")}else{d=H.n(d,"<s>","s")
d=H.n(d,"<es>","es")
d=H.n(d,"<sses>","sses")
d=H.n(d,"<ies>","ies")
d=H.n(d,"<does>","does")
d=H.n(d,"<is>","is")
d=H.n(d,"<has>","has")}d=H.iH(d,"<subject>","<subjectNoun>",0)
i=h.ga9().a
d=H.n(d,"<subject>",i)
i=p.db
d=J.cE(this.bY(d,"<subjectNoun>",h,f,i),"<subjectNoun>",h.gh())
c=h.ga9().a
d=H.n(d,"<subjectPronoun>",c)
if(C.b.a7(j,P.bp("<subject>.+<subject's>",!0,!1))){c=h.ga9().c
d=H.n(d,"<subject's>",c)}d=J.cE(this.bY(d,"<subject's>",h,f,i),"<subject's>",H.b(h.gh())+"'s")
i=h.ga9().c
d=H.n(d,"<subject's>",i)
i=h.ga9().b
d=H.n(d,"<subjectPronounAccusative>",i)
i=h.ga9().d
d=H.n(d,"<subjectPronounSelf>",i)}else d=j
if(g!=null){if(g.gaK()===!0){d=H.n(d,"<subject's> <object>","<object>")
d=H.n(d,"<subjectPronoun's> <object>","<object>")}if(g.gT()===!0){d=H.n(d,"<object>","<objectPronoun>")
d=H.n(d,"<object's>","<objectPronoun's>")}else d=J.dt(this.bY(d,"<object>",g,e,p.db),"<object>",g.gh())
i=g.ga9().b
d=H.n(d,"<objectPronoun>",i)
if(C.b.a7(j,P.bp("<object>.+<object's>",!0,!1))){i=g.ga9().c
d=H.n(d,"<object's>",i)}d=J.cE(this.bY(d,"<object's>",g,e,p.db),"<object's>",H.b(g.gh())+"'s")
i=g.ga9().c
d=H.n(d,"<object's>",i)
i=g.ga9().c
d=H.n(d,"<objectPronoun's>",i)
i=g.ga9().b
d=H.n(d,"<objectPronounAccusative>",i)
i=g.ga9().a
d=H.n(d,"<objectPronounNominative>",i)}if(k){k=h.ga9().c
d=H.n(d,"<subjectPronoun's>",k)}p=p.db
j=this.fL(e,this.fL(f,d,j,"<owner>","<owner's>","<ownerPronoun>","<ownerPronoun's>",p),j,"<object-owner>","<object-owner's>","<object-ownerPronoun>","<object-ownerPronoun's>",p)
r+=(!n||q)&&!t?Y.oO(j):j
if(v)w=s
if(s>=z.length)return H.f(z,s)
if(z[s].gdc())u=!0}q=x-1
if(q>=z.length)return H.f(z,q)
z=!z[q].gdc()?r+".":r
return H.wI(z.charCodeAt(0)==0?z:z,$.$get$ha(),new Y.oT(),null)},
ct:function(){return this.hs(!1)},
kO:function(){var z,y
if(!this.geL()){C.a.sl(this.a,0)
return}z=this.a
y=C.a.b3(z,C.a.cl(z,new Y.oU()))+1
P.cm(0,y,z.length,null,null,null)
z.splice(0,y-0)},
hP:function(a,b){var z,y
if(!this.aZ(a)||!this.aZ(b))return!1
if(this.eK(a,b)){z=this.a
if(a>=z.length)return H.f(z,a)
z[a].gff()}if(!this.dz(a,b))return!1
z=this.a
if(a>=z.length)return H.f(z,a)
if(z[a].ghr()){if(b>=z.length)return H.f(z,b)
y=z[b].ghr()}else y=!1
if(y)return!0
if(a>=z.length)return H.f(z,a)
if(z[a].ghj()){if(b>=z.length)return H.f(z,b)
z=z[b].ghj()}else z=!1
if(z)return!0
else return!1},
i2:function(a,b){var z,y,x,w,v
if(!this.aZ(a)||!this.aZ(b))return!1
for(z=new P.bd(this.dV(a).a(),null,null,null);z.u();){y=z.c
x=y==null?z.b:y.gU()
for(y=new P.bd(this.dV(b).a(),null,null,null);y.u();){w=y.c
v=w==null?y.b:w.gU()
if(J.e(x.gi(),v.gi()))return!0}}return!1},
e3:[function(a){var z=J.am(a)
if(z.b0(a,0)||z.bT(a,this.a.length))return
else{z=this.a
if(a>>>0!==a||a>=z.length)return H.f(z,a)
return z[a].gb9()}},"$1","gb9",2,0,14],
bs:[function(a){var z=J.am(a)
if(z.b0(a,0)||z.bT(a,this.a.length))return
else{z=this.a
if(a>>>0!==a||a>=z.length)return H.f(z,a)
return z[a].gb1()}},"$1","gb1",2,0,22],
l1:function(a){var z,y,x
z=this.a
if(a>=z.length)return H.f(z,a)
if(z[a].gV()!=null){y=a-1
if(this.aZ(y)){if(y<0||y>=z.length)return H.f(z,y)
y=z[y].gV()==null}else y=!0}else y=!0
if(y)return 1000
else{if(a>=z.length)return H.f(z,a)
y=z[a].gV()
x=a-1
if(x<0||x>=z.length)return H.f(z,x)
x=z[x].gV()
if(typeof y!=="number")return y.at()
if(typeof x!=="number")return H.x(x)
return y-x}},
k:function(a){return this.ct()},
aZ:function(a){if(a>=this.a.length||a<0)return!1
else return!0},
fL:function(a,b,c,d,e,f,g,h){var z
if(a!=null){z=a.gT()===!0?H.n(H.n(b,d,"you"),e,"your"):J.dt(this.bY(b,d,a,null,h),d,a.gh())
z=H.n(z,f,a.ga9().a)
z=H.n(H.n(J.cE(this.bY(C.b.a7(c,P.bp(d+".+"+e,!0,!1))?H.n(z,e,a.ga9().c):z,e,a,null,h),e,H.b(a.gh())+"'s"),e,a.ga9().c),g,a.ga9().c)}else z=H.n(H.n(H.n(H.n(b,d,""),e,""),f,""),g,"")
return z},
j6:function(a,b){var z,y
if(!this.aZ(a)||!this.aZ(b))return!1
z=this.a
if(a>=z.length)return H.f(z,a)
if(z[a].gaW()!=null){if(b<0||b>=z.length)return H.f(z,b)
y=z[b].gaW()==null}else y=!0
if(y)return!1
if(a>=z.length)return H.f(z,a)
y=z[a].gaW().gi()
if(b<0||b>=z.length)return H.f(z,b)
return J.e(y,z[b].gaW().gi())},
dz:function(a,b){var z,y
if(!this.aZ(a)||!this.aZ(b))return!1
z=this.a
if(a>=z.length)return H.f(z,a)
if(z[a].gb1()!=null){if(b<0||b>=z.length)return H.f(z,b)
y=z[b].gb1()==null}else y=!0
if(y)return!1
if(a>=z.length)return H.f(z,a)
y=z[a].gb1().gi()
if(b<0||b>=z.length)return H.f(z,b)
return J.e(y,z[b].gb1().gi())},
v:{
oO:function(a){var z,y,x
z=!C.b.a7(a,"\n\n")?C.b.l6(a):a
y=z.length
if(y===0)return z
if(0>=y)return H.f(z,0)
x=z[0].toUpperCase()
if(y===1)return x
else return x+C.b.bK(z,1)}}},oP:{"^":"a:0;",
$1:function(a){return J.e(a.gb9(),"\n\n")}},oN:{"^":"a:23;",
$1:function(a){return C.b.f2(H.n(H.n(a,"<also> ",""),"  "," "))}},oQ:{"^":"a:41;",
$2:function(a,b){var z,y,x
z=J.L(a)
y=z.gav(a)?z.gw(a):null
if(y!=null&&y.gkr()&&J.e(b.gjh(),y.cx)){x=z.gl(a)
if(typeof x!=="number")return x.at()
z.p(a,x-1,b)}else z.t(a,b)
return a}},oR:{"^":"a:43;a",
$1:function(a){return J.ds(this.a,a)}},oS:{"^":"a:0;",
$1:function(a){return J.e(a.gb9(),"\n\n")}},oT:{"^":"a:46;",
$1:function(a){return H.b(a.j(0,1))+H.b(a.j(0,2))+H.b(a.j(0,3))}},oU:{"^":"a:0;",
$1:function(a){return J.e(a.gb9(),"\n\n")}},aC:{"^":"mH;aK:a<,h:b<,c,aY:d<,T:e<,a9:f<",
gi:function(){return H.aE(this)},
gc2:function(){return!0},
gaH:function(){return!0},
v:{
c8:function(a,b,c,d,e){var z=H.p([],[P.q])
return new Y.aC(c,b,z,e==null?$.$get$aL():e,!1,d)}}},mH:{"^":"d+dA;"},dA:{"^":"d;",
gaq:function(){return this.gaH()&&this.gc2()===!0},
aa:function(a,b,c,d,e,f,g,h,i,j,k,l,m){J.iT(a,b,c,d,e,f,g,h,i,j,k,H.F(this,"$isaC"),!1,m)},
bi:function(a,b,c){return this.aa(a,b,null,!1,!1,!1,!1,null,null,null,c,!1,!1)},
aL:function(a,b,c){return this.aa(a,b,null,!1,!1,!1,!1,null,null,null,!1,!1,c)},
a8:function(a,b){return this.aa(a,b,null,!1,!1,!1,!1,null,null,null,!1,!1,!1)},
ai:function(a,b,c){return this.aa(a,b,null,c,!1,!1,!1,null,null,null,!1,!1,!1)},
dN:function(a,b,c,d){return this.aa(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,d)},
kV:function(a,b,c,d,e){return this.aa(a,b,null,c,!1,!1,!1,d,null,null,!1,!1,e)},
ac:function(a,b,c){return this.aa(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,!1)},
dP:function(a,b,c,d,e,f){return this.aa(a,b,null,!1,!1,!1,!1,c,d,e,f,!1,!1)},
dP:function(a,b,c,d,e,f){return this.aa(a,b,null,!1,!1,!1,!1,c,d,e,f,!1,!1)},
aD:function(a,b,c){return this.aa(a,b,null,!1,!1,!1,c,null,null,null,!1,!1,!1)},
c5:function(a,b,c,d){return this.aa(a,b,null,!1,c,!1,d,null,null,null,!1,!1,!1)},
kU:function(a,b,c,d,e){return this.aa(a,b,null,c,!1,!1,!1,d,null,null,e,!1,!1)},
eW:function(a,b,c,d){return this.aa(a,b,null,c,!1,!1,!1,null,null,null,d,!1,!1)},
eW:function(a,b,c,d){return this.aa(a,b,null,c,!1,!1,!1,null,null,null,d,!1,!1)},
bR:function(a,b,c,d){return this.aa(a,b,null,c,!1,!1,!1,d,null,null,!1,!1,!1)},
bS:function(a,b,c,d,e){return this.aa(a,b,c,!1,!1,!1,!1,d,null,null,e,!1,!1)},
eV:function(a,b,c,d){return this.aa(a,b,null,c,!1,!1,d,null,null,null,!1,!1,!1)},
bp:function(a,b,c,d){return this.aa(a,b,null,!1,!1,!1,!1,c,null,null,d,!1,!1)},
c5:function(a,b,c,d){return this.aa(a,b,null,!1,c,!1,d,null,null,null,!1,!1,!1)},
dO:function(a,b,c,d,e){return this.aa(a,b,c,!1,!1,d,!1,e,null,null,!1,!1,!1)},
hw:function(a,b,c,d){return this.aa(a,b,null,!1,!1,!1,c,d,null,null,!1,!1,!1)},
hv:function(a,b,c,d){return this.aa(a,b,c,!1,!1,d,!1,null,null,null,!1,!1,!1)},
kX:function(a,b,c,d,e,f){return this.aa(a,b,c,d,!1,e,!1,f,null,null,!1,!1,!1)},
c6:function(a,b,c,d,e){return this.aa(a,b,c,d,!1,e,!1,null,null,null,!1,!1,!1)},
hu:function(a,b,c){return this.aa(a,b,c,!1,!1,!1,!1,null,null,null,!1,!1,!1)},
kS:function(a,b,c,d){return this.aa(a,b,c,!1,!1,!1,!1,d,null,null,!1,!1,!1)},
eX:function(a,b,c,d){return this.aa(a,b,null,!1,!1,!1,!1,c,d,null,!1,!1,!1)},
kW:function(a,b,c,d,e){return this.aa(a,b,null,!1,c,!1,!1,d,null,null,e,!1,!1)},
kY:function(a,b,c,d,e,f){return this.aa(a,b,null,!1,c,!1,!1,d,e,null,f,!1,!1)},
eV:function(a,b,c,d){return this.aa(a,b,null,c,!1,!1,d,null,null,null,!1,!1,!1)},
kT:function(a,b,c,d){return this.aa(a,b,null,!1,c,!1,!1,null,null,null,d,!1,!1)}},ck:{"^":"d;a,b,c,d",
k:function(a){return this.a}}}],["","",,L,{"^":"",tt:{"^":"a:0;",
$1:function(a){a.gcN().b=2
return 2}},tP:{"^":"a:0;",
$1:function(a){a.gcN().b=0
return 0}},ts:{"^":"a:0;",
$1:function(a){a.gcN().b=1
return 1}},hk:{"^":"d;",
hf:function(a){var z,y
z=this.a
y=a.gi()
return z==null?y==null:z===y}},qe:{"^":"hk;i:a<",
a2:function(a){var z=new L.br(null,null)
z.m(this)
a.$1(z)
return z.q()},
A:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof L.hk))return!1
z=this.a
y=b.a
return z==null?y==null:z===y},
gD:function(a){return Y.U(Y.k(0,J.j(this.a)))},
k:function(a){return"Team {id="+J.h(this.a)+",\n}"},
v:{
ef:function(a){var z=new L.br(null,null)
a.$1(z)
return z.q()}}},br:{"^":"d;a,b",
gi:function(){return this.gcN().b},
gcN:function(){var z=this.a
if(z!=null){this.b=z.a
this.a=null}return this},
m:function(a){this.a=a},
q:function(){var z,y
z=this.a
if(z==null){y=this.gcN().b
z=new L.qe(y)
if(y==null)H.i(P.l("id"))}this.m(z)
return z}}}],["","",,O,{"^":"",pH:{"^":"d;a"}}],["","",,X,{"^":"",
i3:function(a,b){return P.aU(function(){var z=a,y=b
var x=0,w=1,v,u,t,s,r,q
return function $async$i3(c,d){if(c===1){v=d
x=w}while(true)switch(x){case 0:u=z.a
t=new J.bj(u,u.length,0,null,[H.m(u,0)])
u=y.a
s=new J.bj(u,u.length,0,null,[H.m(u,0)])
case 2:r=t.u()
q=s.u()
x=r?5:6
break
case 5:x=7
return t.d
case 7:case 6:x=q?8:9
break
case 8:x=10
return s.d
case 10:case 9:case 3:if(r||q){x=2
break}case 4:return P.aS()
case 1:return P.aT(v)}}})}}],["","",,A,{"^":"",a4:{"^":"d;ey:a<,aC:b<,c,d,e,f,V:r<,x",
gjE:function(){var z=this.f
return z.length!==0?C.a.gw(z):null},
gD:function(a){var z,y,x,w,v
z=X.bB(this.a)
y=X.bB(this.d)
x=X.bB(this.f)
w=this.r
v=this.c
v=X.df(X.b2(X.b2(0,C.e.gD(w)),J.j(v)))
return X.df(X.b2(X.b2(X.b2(X.b2(0,z&0x1FFFFFFF),y&0x1FFFFFFF),x&0x1FFFFFFF),v&0x1FFFFFFF))},
A:function(a,b){var z
if(b==null)return!1
z=J.o(b)
return!!z.$isa4&&this.gD(this)===z.gD(b)},
fQ:function(a){var z,y
z=this.hN(a,!0)
y=z.ga_(z)
if(y.u()){y.gU()
return!0}return!1},
ap:function(a){var z,y
z=this.hM(a)
y=z.ga_(z)
if(y.u()){y.gU()
return!0}return!1},
h2:function(a){var z,y,x
z=this.dt(a)
if(z==null)throw H.c(new P.w("Tried to elapseSituationTime of situation id="+H.b(a)+" that doesn't exist in situations ("+H.b(this.f)+")."))
y=this.f
if(z!==(z|0)||z>=y.length)return H.f(y,z)
x=y[z].ay()
if(z!==(z|0)||z>=y.length)return H.f(y,z)
y[z]=x},
ay:function(){++this.r},
de:function(a,b,c,d,e){var z=this.d
if(a!=null)z=z.dm(0,new A.pM(a))
if(b!=null)z=z.c9(0,new A.pN(b))
if(c!=null)z=z.c9(0,new A.pO(c))
if(e!=null)z=z.c9(0,new A.pP(e))
return d!=null?z.c9(0,new A.pQ(d)):z},
hM:function(a){return this.de(a,null,null,null,null)},
hN:function(a,b){return this.de(a,null,null,null,b)},
hO:function(a,b,c){return this.de(a,b,null,null,c)},
B:function(a){return this.a.bI(0,new A.pR(a))},
dY:function(a){return this.e.bI(0,new A.pS(a))},
f6:function(a){var z,y
z=this.dt(a)
if(z==null)return
y=this.f
if(z!==(z|0)||z>=y.length)return H.f(y,z)
return y[z]},
ak:function(a){var z,y
for(z=this.f,y=z.length-1;y>=0;--y){if(y>=z.length)return H.f(z,y)
if(J.e(z[y].gh(),a)){if(y>=z.length)return H.f(z,y)
return z[y]}}throw H.c(P.G("No situation with name="+a+" found."))},
ka:function(a){var z=this.a.aU(0,new A.pT(a),new A.pU())
if(z==null)return!1
return z.gaH()},
aA:function(){var z,y
z=this.f
y=C.a.gw(z)
y.d1(this)
C.a.a3(z,y)},
aX:function(a){var z,y
z=this.f
while(!0){if(!(z.length!==0&&!J.e(C.a.gw(z).gh(),a)))break
y=C.a.gw(z)
y.d1(this)
C.a.a3(z,y)}if(z.length===0)throw H.c(P.G("Tried to pop situations until "+a+" but none was found in stack."))},
c4:function(a,b){var z,y
z=this.dt(a)
if(z==null)throw H.c(P.G("Situation with id "+H.b(a)+" does not exist in "+H.b(this.f)))
y=this.f
if(z!==(z|0)||z>=y.length)return H.f(y,z)
y[z]=b},
f0:function(a,b,c,d,e){var z,y,x,w
z=this.de(a,b,c,d,e)
y=z.ga_(z)
if(y.u()){x=y.gU()
y=this.r
w=x.gV()
if(typeof w!=="number")return H.x(w)
return y-w}return},
l0:function(a,b,c){return this.f0(null,a,b,c,null)},
cv:function(a,b,c){return this.f0(a,null,b,null,c)},
dQ:function(a){return this.f0(a,null,null,null,null)},
k:function(a){var z,y
z=this.a
y=z.el()
y.ax(0,z)
return"World<"+P.cf(y,"{","}")+">"},
W:function(a,b){var z,y,x
z=this.B(a)
y=z.a2(b)
x=this.a
x.a3(0,z)
x.t(0,y)},
dt:function(a){var z,y,x
y=this.f
x=0
while(!0){if(!(x<y.length)){z=null
break}if(J.e(y[x].gi(),a)){z=x
break}++x}return z},
ij:function(a){this.a.ax(0,a.a)
this.d.ax(0,a.d)
this.b.ax(0,a.b)
this.e.ax(0,a.e)
C.a.ax(this.f,a.f)
this.r=a.r},
v:{
ed:function(a){var z,y,x,w
z=P.a6(null,null,null,R.A)
y=P.bb(null,O.cF)
x=P.a6(null,null,null,U.ad)
w=P.a6(null,null,null,null)
w=new A.a4(z,x,a.c,y,w,[],null,null)
w.ij(a)
return w}}},pM:{"^":"a:0;a",
$1:function(a){return a.gdB()===this.a}},pN:{"^":"a:0;a",
$1:function(a){return J.e(a.gcs(),this.a.gi())}},pO:{"^":"a:0;a",
$1:function(a){return a.gfg().a7(0,this.a.gi())}},pP:{"^":"a:0;a",
$1:function(a){return a.ghI()===this.a}},pQ:{"^":"a:0;a",
$1:function(a){return a.ghG()===this.a}},pR:{"^":"a:0;a",
$1:function(a){return J.e(a.gi(),this.a)}},pS:{"^":"a:0;a",
$1:function(a){return J.e(a.gh(),this.a)}},pT:{"^":"a:0;a",
$1:function(a){return J.e(a.gi(),this.a)}},pU:{"^":"a:2;",
$0:function(){return}}}],["","",,A,{"^":"",W:{"^":"ag;a1:b<"},fY:{"^":"W;c,d,X:e<,J:f<,h:r<,b,a",
gK:function(){return!1},
gO:function(){return!1},
gL:function(){return H.i(new P.w("Not rerollable"))},
P:[function(a,b,c){throw H.c(new P.w("SimpleAction always succeeds"))},"$3","gM",6,0,1],
R:[function(a,b,c){return this.c.$4(a,b,c,this)},"$3","gN",6,0,1],
ab:function(a,b){throw H.c(new P.w("SimpleAction shouldn't have to provide roll reason"))},
I:function(a,b){return 1},
H:function(a,b){var z=this.d
if(z==null)return!0
return z.$3(a,b,this)}}}],["","",,N,{"^":"",k4:{"^":"z;K:c<,a1:d<,J:e<,O:f<,L:r<,b,a",
ga6:function(){return"confuse <object>"},
gh:function(){return"Confuse"},
gaf:function(){return"will <subject> confuse <object>?"},
P:[function(a,b,c){var z
a.a8(c,"<subject> touch<es> <subject's> temple")
z=this.b
a.ac(c,"<subject> tr<ies> to {channel|implant} {terror|confusion} into <object's> mind",z)
a.eV(c,"<subject> fail<s>",!0,!0)
return H.b(a.gh())+" fails to confuse "+H.b(z.gh())},"$3","gM",6,0,1],
R:[function(a,b,c){var z
a.a8(c,"<subject> touch<es> <subject's> temple")
z=this.b
a.bp(c,"<subject> {channel<s>|implant<s>} {terror|confusion} into <object's> mind",z,!0)
z.aD(c,"<subject's> eyes go wide with terror",!0)
b.W(z.gi(),new N.k5())
return H.b(a.gh())+" confuses "+H.b(z.gh())},"$3","gN",6,0,1],
I:function(a,b){return 0.6},
H:function(a,b){var z
if(a.gT()===!0)if(a.ga4()){z=b.a
z=new H.K(z,new N.k6(this),[H.m(z,0)])
z=z.gl(z)>=2&&this.b.gc3()!==!0}else z=!1
else z=!1
return z},
v:{
wY:[function(a){return new N.k4(!0,!0,"Channeling the terror of the Dead Prince into lesser minds is something you've been practicing. It makes the target rabid and disoriented. They might attack their own.",!0,C.c,a,null)},"$1","tQ",2,0,4]}},k5:{"^":"a:0;",
$1:function(a){a.sc3(!0)
return a}},k6:{"^":"a:0;a",
$1:function(a){return a.gaH()&&a.gaY().hf(this.a.b.gaY())}}}],["","",,V,{"^":"",kt:{"^":"z;O:c<,L:d<,K:e<,a1:f<,J:r<,b,a",
ga6:function(){return"kick <object's> weapon off"},
gh:function(){return"DisarmKick"},
gaf:function(){return"will <subject> kick the weapon off?"},
P:[function(a,b,c){S.a7(new V.ku(this,a,c),new V.kv(this,a,c),null,null)
return H.b(a.gh())+" fails to kick "+H.b(this.b.gh())+"'s weapon off"},"$3","gM",6,0,1],
R:[function(a,b,c){var z,y
S.a7(new V.kw(this,a,c),new V.kx(this,a,c),null,null)
z=b.f
y=z.length!==0?C.a.gw(z):null
b.c4(y.gi(),y.a2(new V.ky(this)))
z=this.b
b.W(z.gi(),new V.kz())
return H.b(a.gh())+" kicks "+H.b(z.gh())+"'s weapon off"},"$3","gN",6,0,1],
I:function(a,b){var z=a.ga4()?0:0.2
if(a.cx===!0)return 0.7-z
return 0.5-z},
H:function(a,b){var z
if(a.ga4()||a.fr===C.h){z=this.b
z=z.ga0()&&!z.gaz()}else z=!1
return z},
v:{
x0:[function(a){return new V.kt(!0,C.c,!0,!0,"When enemies are on the ground, you can try to kick their weapon off to disarm them.",a,null)},"$1","u6",2,0,4]}},ku:{"^":"a:2;a,b,c",
$0:function(){var z,y
z=this.b
y=this.c
z.ac(y,"<subject> kick<s> {at|towards} <object's> weapon",this.a.b)
z.ai(y,"<subject> mi<sses>",!0)}},kv:{"^":"a:2;a,b,c",
$0:function(){var z,y
z=this.c
y=this.a.b
this.b.ac(z,"<subject> kick<s> <object's> weapon",y)
y.ai(z,"<subject> hold<s> onto it",!0)}},kw:{"^":"a:2;a,b,c",
$0:function(){var z=this.a.b
this.b.kY(this.c,"<subject> kick<s> <object-owner's> <object> off <object-owner's> hand",!0,z.gS(),z,!0)}},kx:{"^":"a:2;a,b,c",
$0:function(){var z,y
z=this.c
y=this.a.b
this.b.bp(z,"<subject> kick<s> <object's> {right|} hand",y,!0)
z.bX(0,"<owner's> <subject> fl<ies> away",y,y.gS())}},ky:{"^":"a:13;a",
$1:function(a){a.gbn().t(0,this.a.b.gS())
return a}},kz:{"^":"a:0;",
$1:function(a){a.sS($.$get$dj())
return a}}}],["","",,R,{"^":"",md:{"^":"z;O:c<,L:d<,K:e<,a1:f<,J:r<,b,a",
gh:function(){return"KickToGround"},
ga6:function(){return"kick <object> to the ground"},
gaf:function(){return"will <subject> kick <object> prone?"},
P:[function(a,b,c){S.a7(new R.me(this,a,c),new R.mf(this,a,c),null,null)
return H.b(a.gh())+" fails to sweep "+H.b(this.b.gh())+" off feet"},"$3","gM",6,0,1],
R:[function(a,b,c){var z
S.a7(new R.mg(this,a,c),new R.mh(this,a,c,U.bA(b)),null,null)
z=this.b
b.W(z.gi(),new R.mi())
return H.b(a.gh())+" sweeps "+H.b(z.gh())+" off feet"},"$3","gN",6,0,1],
I:function(a,b){var z=a.ga4()?0:0.2
if(a.cx===!0)return 0.7-z
return 0.5-z},
H:function(a,b){return(a.ga4()||a.fr===C.h)&&!this.b.ga0()},
v:{
xh:[function(a){return new R.md(!0,C.c,!0,!0,"Sweeping opponents off their feet doesn't deal much damage but on the ground they will be much easier targets for you and your allies.",a,null)},"$1","v_",2,0,4]}},me:{"^":"a:2;a,b,c",
$0:function(){var z,y
z=this.b
y=this.c
z.ac(y,"<subject> kick<s> {at|towards} <object's> feet",this.a.b)
z.ai(y,"<subject> mi<sses>",!0)}},mf:{"^":"a:2;a,b,c",
$0:function(){var z,y
z=this.c
y=this.a.b
this.b.ac(z,"<subject> kick<s> <object's> shin",y)
y.ai(z,"<subject> <does>n't budge",!0)}},mg:{"^":"a:2;a,b,c",
$0:function(){this.b.kW(this.c,"<subject> kick<s> <object> off <object's> feet and to the ground",!0,this.a.b,!0)}},mh:{"^":"a:2;a,b,c,d",
$0:function(){var z,y
z=this.c
y=this.a.b
this.b.bp(z,"<subject> kick<s> <object's> {right|left} shin",y,!0)
y.a8(z,"<subject> {grunt|shriek}<s>")
y.aD(z,"<subject> fall<s> to the "+H.b(this.d),!0)}},mi:{"^":"a:0;",
$1:function(a){a.sah(C.f)
return a}}}],["","",,F,{"^":"",n1:{"^":"ag;J:b<,K:c<,a1:d<,O:e<,L:f<,a",
gX:function(){return"Stand off."},
gh:function(){return"Pass"},
P:[function(a,b,c){throw H.c(new P.Y(null))},"$3","gM",6,0,1],
R:[function(a,b,c){if(a.gT()===!0)a.a8(c,"<subject> stand<s> off")
return H.b(a.gh())+" passes the opportunity"},"$3","gN",6,0,1],
ab:function(a,b){return"WARNING this shouldn't be user-visible"},
I:function(a,b){return 1},
H:function(a,b){return!0}}}],["","",,Y,{"^":"",nf:{"^":"z;O:c<,L:d<,K:e<,a1:f<,J:r<,b,a",
ga6:function(){return"force <object> off balance"},
gh:function(){return"Pound"},
gaf:function(){return"will <subject> force <object> off balance?"},
P:[function(a,b,c){var z=this.b
a.eX(c,"<subject> {fiercely|violently} {strike<s>|hammer<s>|batter<s>} on <object-owner's> {<object>|weapon}",z.gS(),z)
z.bi(c,"<subject> {retain<s>|keep<s>} <subject's> {|combat} {stance|footing}",!0)
return H.b(a.gh())+" kicks "+H.b(z.dx)+" off balance"},"$3","gM",6,0,1],
R:[function(a,b,c){var z=this.b
a.eX(c,"<subject> {fiercely|violently} {strike<s>|hammer<s>|batter<s>} on <object-owner's> {<object>|weapon}",z.gS(),z)
if(z.ga4()){z.hw(c,"<subject> lose<s> <object>",!0,$.$get$ex())
b.W(z.y,new Y.ng())
C.a.t(b.f,U.mI(z,a))
return H.b(a.gh())+" pounds "+H.b(z.dx)+" off balance"}else if(z.gar()){z.a8(c,"<subject> <is> already off balance")
c.ez(0,"<subject> make<s> <object> fall to the "+H.b(U.bA(b)),z,$.$get$iz())
b.W(z.y,new Y.nh())
return H.b(a.gh())+" pounds "+H.b(z.dx)+" to the ground"}throw H.c(new P.w("enemy pose must be either standing or off-balance"))},"$3","gN",6,0,1],
I:function(a,b){var z=a.ga4()?0:0.2
if(a.cx===!0)return 0.7-z
return 0.5-z},
H:function(a,b){var z,y
if(!a.ga0()){z=a.e
if(z.gaV()||z.gkp()){z=this.b
if(!z.gS().gcj()){z.gS().geF()
y=!1}else y=!0
z=y&&!z.ga0()}else z=!1}else z=!1
return z},
v:{
xp:[function(a){return new Y.nf(!0,C.c,!0,!0,"Forcing enemies off balance often means hitting them heavily several times in a row. The goal is not to deal damage but to force the opponent to lose control of their combat stance. It can also give members of your party an opportunity to strike.",a,null)},"$1","va",2,0,4]}},ng:{"^":"a:0;",
$1:function(a){a.sah(C.h)
return a}},nh:{"^":"a:0;",
$1:function(a){a.sah(C.f)
return a}}}],["","",,B,{"^":"",nD:{"^":"ag;J:b<,K:c<,a1:d<,O:e<,L:f<,a",
gX:function(){return"Regain balance."},
gh:function(){return"RegainBalance"},
P:[function(a,b,c){throw H.c(new P.Y(null))},"$3","gM",6,0,1],
R:[function(a,b,c){if(a.gT()===!0)a.bp(c,"<subject> regain<s> <object>",$.$get$ex(),!0)
b.W(a.gi(),new B.nE())
return H.b(a.gh())+" regains balance"},"$3","gN",6,0,1],
ab:function(a,b){return"Will "+a.ga9().a+" regain balance?"},
I:function(a,b){return 1},
H:function(a,b){return a.gar()}},nE:{"^":"a:0;",
$1:function(a){a.sah(C.k)
return C.k}}}],["","",,O,{"^":"",nT:{"^":"ag;J:b<,K:c<,a1:d<,O:e<,L:f<,a",
gX:function(){return"Scramble."},
gh:function(){return"Scramble"},
P:[function(a,b,c){throw H.c(new P.Y(null))},"$3","gM",6,0,1],
R:[function(a,b,c){a.a8(c,"<subject> tr<ies> to {scramble|crawl} out of {reach|harm's way}")
return H.b(a.gh())+" scrambles on ground"},"$3","gN",6,0,1],
ab:function(a,b){return"Will "+a.ga9().a+" crawl out of harm's way?"},
I:function(a,b){return 1},
H:function(a,b){if(!a.ga0())return!1
if(A.dp(a,b))return!0
return!1}}}],["","",,Q,{"^":"",oC:{"^":"ag;J:b<,K:c<,a1:d<,O:e<,L:f<,a",
gX:function(){return"Stand up."},
gh:function(){return"StandUp"},
P:[function(a,b,c){throw H.c(new P.Y(null))},"$3","gM",6,0,1],
R:[function(a,b,c){a.a8(c,"<subject> {rise<s>|stand<s> up|get<s> to <subject's> feet|get<s> up|pick<s> <subjectPronounSelf> up}")
S.a7(new Q.oD(a,c),new Q.oE(a,c),null,null)
b.W(a.gi(),new Q.oF())
return H.b(a.gh())+" stands up"},"$3","gN",6,0,1],
ab:function(a,b){return"Will "+a.ga9().a+" stand up?"},
I:function(a,b){return 1},
H:function(a,b){if(!a.ga0())return!1
if(A.dp(a,b))return!1
return!0}},oD:{"^":"a:2;a,b",
$0:function(){return this.a.a8(this.b,"<subject> {stagger<s>|sway<s>} back before finding balance")}},oE:{"^":"a:2;a,b",
$0:function(){return this.a.a8(this.b,"<subject> stead<ies> <subjectPronounSelf>")}},oF:{"^":"a:0;",
$1:function(a){a.sah(C.k)
return C.k}}}],["","",,T,{"^":"",
xS:[function(a){return new A.a2(T.eH(),null,null,new T.vn(),new T.vo(),new T.vp(),null,!0,"This move is hard, but when succesful, it's decisive.",!0,!0,"StartBreakNeckOnGround",!1,null,"break <object's> neck",null,a,null)},"$1","wr",2,0,4],
xT:[function(a){return new A.a2(T.eH(),new T.vq(),T.eH(),new T.vr(),new T.vs(),new T.vt(),new T.vu(),!0,"This move is hard, but when succesful, it's decisive.",!0,!0,"StartBreakNeckOnGroundPlayer",!0,C.c,"break <object's> neck","will <subject> succeed?",a,null)},"$1","ws",2,0,4],
xU:[function(a,b,c,d,e){a.ac(c,"<subject> throw<s> <subjectPronounSelf> {on|upon} <object>",d)
b.W(a.gi(),new T.vv())},"$5","eH",10,0,8],
vn:{"^":"a:3;",
$3:function(a,b,c){return a.gT()!==!0&&c.ga0()&&a.gaz()&&c.gaz()}},
vo:{"^":"a:3;",
$3:function(a,b,c){return Y.f0(a,c)}},
vp:{"^":"a:3;",
$3:function(a,b,c){return S.dW(a,c,C.l)}},
vr:{"^":"a:3;",
$3:function(a,b,c){return a.gT()===!0&&c.ga0()&&a.gaz()&&c.gaz()}},
vs:{"^":"a:3;",
$3:function(a,b,c){return Y.f0(a,c)}},
vt:{"^":"a:3;",
$3:function(a,b,c){return S.dW(a,c,C.m)}},
vq:{"^":"a:3;",
$3:function(a,b,c){return 0.7}},
vu:{"^":"a:3;",
$3:function(a,b,c){return S.dW(a,c,C.p)}},
vv:{"^":"a:0;",
$1:function(a){a.sah(C.f)
return a}}}],["","",,A,{"^":"",a2:{"^":"z;c,d,e,f,r,x,y,z,J:Q<,K:ch<,a1:cx<,h:cy<,O:db<,L:dx<,a6:dy<,af:fr<,b,a",
P:[function(a,b,c){var z,y,x,w
z=this.b
y=this.e
if(this.z){x=this.r.$3(a,b,z)
w=this.y.$3(a,b,z)
y.$5(a,b,c,z,x)
y=b.f
C.a.t(y,x)
C.a.t(y,w)}else y.$5(a,b,c,z,null)
return H.b(a.gh())+" fails to start a "+this.cy+" (defensible situation) at "+H.b(z.gh())},"$3","gM",6,0,1],
R:[function(a,b,c){var z,y,x,w
z=this.b
y=this.r.$3(a,b,z)
x=this.x.$3(a,b,z)
this.c.$5(a,b,c,z,y)
w=b.f
C.a.t(w,y)
C.a.t(w,x)
return H.b(a.gh())+" starts a "+this.cy+" (defensible situation) at "+H.b(z.gh())},"$3","gN",6,0,1],
I:function(a,b){var z=this.d
if(z!=null)return z.$3(a,b,this.b)
return 1},
H:function(a,b){return this.f.$3(a,b,this.b)}}}],["","",,M,{"^":"",
xV:[function(a){return new A.a2(M.eI(),null,null,new M.vw(),new M.vx(),new M.vy(),null,!0,"Jumping and tackling an opponent is one of the most risky moves but it's a quick way to neutralize someone.",!0,!0,"StartLeap",!1,null,"leap at <object>",null,a,null)},"$1","wt",2,0,4],
xW:[function(a){return new A.a2(M.eI(),new M.vz(),M.eI(),new M.vA(),new M.vB(),new M.vC(),new M.vD(),!0,"Jumping and tackling an opponent is one of the most risky moves but it's a quick way to neutralize someone.",!0,!0,"StartLeapPlayer",!0,C.c,"leap at <object>","will <subject> tackle <objectPronoun>?",a,null)},"$1","wu",2,0,4],
xX:[function(a,b,c,d,e){if(a.ga0()){a.hu(c,"<subject> roll<s>",e.gi())
a.hu(c,"<subject> put<s> <subject's> feet under <subjectPronounAccusative>",e.gi())}a.kS(c,"<subject> {leap<s>|jump<s>|spring<s>|launch<es> <subjectPronounSelf>|lunge<s>} at <object>",e.gi(),d)},"$5","eI",10,0,8],
vw:{"^":"a:3;",
$3:function(a,b,c){var z,y
if(a.gT()!==!0){if(!a.gaz()){z=a.go
y=$.$get$bz()
z=z.a
y=y.a
y=z==null?y==null:z===y
z=y}else z=!0
z=z&&!c.ga0()&&!A.dp(a,b)}else z=!1
return z}},
vx:{"^":"a:3;",
$3:function(a,b,c){return F.fr(a,c)}},
vy:{"^":"a:3;",
$3:function(a,b,c){return V.dL(a,c,C.l)}},
vA:{"^":"a:3;",
$3:function(a,b,c){return a.gT()===!0&&a.gaz()&&!c.ga0()&&!A.dp(a,b)}},
vB:{"^":"a:3;",
$3:function(a,b,c){return F.fr(a,c)}},
vC:{"^":"a:3;",
$3:function(a,b,c){return V.dL(a,c,C.m)}},
vz:{"^":"a:3;",
$3:function(a,b,c){return a.ga4()?0.4:0.2}},
vD:{"^":"a:3;",
$3:function(a,b,c){return V.dL(a,c,C.p)}}}],["","",,U,{"^":"",
xY:[function(a){return new A.a2(U.eJ(),null,null,new U.vE(),new U.vF(),new U.vG(),null,!0,"Punching someone hard enough can cause them to lose their footing. And it hurts.",!0,!0,"StartPunch",!1,null,"punch <object>",null,a,null)},"$1","wv",2,0,4],
xZ:[function(a){return new A.a2(U.eJ(),new U.vH(),U.eJ(),new U.vI(),new U.vJ(),new U.vK(),new U.vL(),!0,"Punching someone hard enough can cause them to lose their footing. And it hurts.",!0,!0,"StartPunchPlayer",!0,C.c,"punch <object>","will <subject> hit <objectPronoun>?",a,null)},"$1","ww",2,0,4],
y_:[function(a,b,c,d,e){c.jo(0,"<subject> {thrust<s>|swing<s>} <subject's> fist at <object>",e.gi(),!0,d,a)},"$5","eJ",10,0,8],
vE:{"^":"a:3;",
$3:function(a,b,c){var z
if(a.gT()!==!0)z=(a.ga4()||a.fr===C.h)&&!c.ga0()&&a.gaz()
else z=!1
return z}},
vF:{"^":"a:3;",
$3:function(a,b,c){return Q.fO(a,c)}},
vG:{"^":"a:3;",
$3:function(a,b,c){return Z.e3(a,c,C.l)}},
vI:{"^":"a:3;",
$3:function(a,b,c){var z
if(a.gT()===!0)z=(a.ga4()||a.fr===C.h)&&!c.ga0()&&a.gaz()
else z=!1
return z}},
vJ:{"^":"a:3;",
$3:function(a,b,c){return Q.fO(a,c)}},
vK:{"^":"a:3;",
$3:function(a,b,c){return Z.e3(a,c,C.m)}},
vH:{"^":"a:3;",
$3:function(a,b,c){return 0.7}},
vL:{"^":"a:3;",
$3:function(a,b,c){return Z.e3(a,c,C.p)}}}],["","",,G,{"^":"",
y0:[function(a){return new A.a2(G.eK(),null,null,new G.vO(),new G.vP(),new G.vQ(),null,!0,"The basic swordfighting move is also often the most effective.",!0,!0,"StartSlash",!1,null,"swing at <object>",null,a,null)},"$1","wx",2,0,4],
y5:[function(a){return new A.a2(G.eK(),new G.vZ(),G.eK(),new G.w_(),new G.w0(),new G.w1(),new G.w2(),!0,"The basic swordfighting move is also often the most effective.",!0,!0,"StartSlashPlayer",!0,C.c,"swing at <object>","will <subject> hit <objectPronoun>?",a,null)},"$1","wy",2,0,4],
y6:[function(a,b,c,d,e){return a.dO(c,"<subject> swing<s> {"+H.b(U.aa(a))+" |}at <object>",e.gi(),!0,d)},"$5","eK",10,0,8],
vO:{"^":"a:3;",
$3:function(a,b,c){return a.gT()!==!0&&a.ga4()&&!c.ga0()&&a.e.gaV()}},
vP:{"^":"a:3;",
$3:function(a,b,c){return M.bc(a,c)}},
vQ:{"^":"a:3;",
$3:function(a,b,c){return L.aP(a,c,C.l)}},
w_:{"^":"a:3;",
$3:function(a,b,c){return a.gT()===!0&&a.ga4()&&!c.ga0()&&a.e.gaV()}},
w0:{"^":"a:3;",
$3:function(a,b,c){return M.bc(a,c)}},
w1:{"^":"a:3;",
$3:function(a,b,c){return L.aP(a,c,C.m)}},
vZ:{"^":"a:3;",
$3:function(a,b,c){return 0.7-(c.gam()!=null?0.2:0)}},
w2:{"^":"a:3;",
$3:function(a,b,c){return L.aP(a,c,C.p)}}}],["","",,R,{"^":"",
y1:[function(a,b,c,d,e){return a.hw(c,"<subject> completely miss<es> <object> with "+H.b(U.aa(a)),!0,d)},"$5","iF",10,0,11],
y2:[function(a){return new A.a2(R.iG(),new R.vR(),R.iF(),new R.vS(),new R.vT(),new R.vU(),null,!1,"It's always better to fight with your feet firmly on the ground. But sometimes, it's necessary to act quickly.",!0,!0,"StartSlashOutOfBalance",!1,null,"swing at <object> (while out of balance)",null,a,null)},"$1","wz",2,0,4],
y3:[function(a){return new A.a2(R.iG(),new R.vV(),R.iF(),new R.vW(),new R.vX(),new R.vY(),null,!1,"It's always better to fight with your feet firmly on the ground. But sometimes, it's necessary to act quickly.",!0,!0,"StartSlashOutOfBalancePlayer",!1,null,"swing at <object> (while out of balance)",null,a,null)},"$1","wA",2,0,4],
y4:[function(a,b,c,d,e){return a.dO(c,"<subject> swing<s> {"+H.b(U.aa(a))+" |}at <object>",e.gi(),!0,d)},"$5","iG",10,0,8],
vS:{"^":"a:3;",
$3:function(a,b,c){return a.gT()!==!0&&a.gar()&&!c.ga0()&&a.e.gaV()}},
vT:{"^":"a:3;",
$3:function(a,b,c){return M.bc(a,c)}},
vU:{"^":"a:3;",
$3:function(a,b,c){return L.aP(a,c,C.l)}},
vR:{"^":"a:3;",
$3:function(a,b,c){return 0.7}},
vW:{"^":"a:3;",
$3:function(a,b,c){return a.gT()===!0&&a.gar()&&!c.ga0()&&a.e.gaV()}},
vX:{"^":"a:3;",
$3:function(a,b,c){return M.bc(a,c)}},
vY:{"^":"a:3;",
$3:function(a,b,c){return L.aP(a,c,C.m)}},
vV:{"^":"a:3;",
$3:function(a,b,c){return 0.5-(c.gam()!=null?0.2:0)}}}],["","",,D,{"^":"",
y7:[function(a){return new A.a2(D.eL(),null,null,new D.w3(),new D.w4(),new D.w5(),null,!0,"Opponents on the ground are often the most vulnerable.",!0,!0,"StartStrikeDown",!1,null,"strike down at <object>",null,a,null)},"$1","wB",2,0,4],
y8:[function(a){return new A.a2(D.eL(),new D.w6(),D.eL(),new D.w7(),new D.w8(),new D.w9(),new D.wa(),!0,"Opponents on the ground are often the most vulnerable.",!0,!0,"StartStrikeDownPlayer",!0,C.c,"strike down at <object>","will <subject> hit?",a,null)},"$1","wC",2,0,4],
y9:[function(a,b,c,d,e){return a.ac(c,"<subject> strike<s> down {with "+H.b(U.aa(a))+" |}at <object>",d)},"$5","eL",10,0,11],
w3:{"^":"a:3;",
$3:function(a,b,c){return a.gT()!==!0&&c.ga0()&&!a.ga0()&&a.e.gaV()}},
w4:{"^":"a:3;",
$3:function(a,b,c){return D.d6(a,c)}},
w5:{"^":"a:3;",
$3:function(a,b,c){return V.bI(a,c,C.l)}},
w7:{"^":"a:3;",
$3:function(a,b,c){return a.gT()===!0&&c.ga0()&&!a.ga0()&&a.e.gaV()}},
w8:{"^":"a:3;",
$3:function(a,b,c){return D.d6(a,c)}},
w9:{"^":"a:3;",
$3:function(a,b,c){return V.bI(a,c,C.m)}},
w6:{"^":"a:3;",
$3:function(a,b,c){var z,y
z=a.gar()?0.2:0
y=c.gam()!=null?0.2:0
return 0.7-z-y}},
wa:{"^":"a:3;",
$3:function(a,b,c){return V.bI(a,c,C.p)}}}],["","",,A,{"^":"",
ya:[function(a){return new A.a2(A.eM(),null,null,new A.wb(),new A.wc(),new A.wd(),null,!0,"The basic move with a spear.",!0,!0,"StartThrustSpear",!1,null,"thrust at <object>",null,a,null)},"$1","wD",2,0,4],
ye:[function(a){return new A.a2(A.eM(),new A.wm(),A.eM(),new A.wn(),new A.wo(),new A.wp(),new A.wq(),!0,"The basic move with a spear.",!0,!0,"StartThrustSpearPlayer",!0,C.c,"thrust at <object>","will <subject> hit <objectPronoun>?",a,null)},"$1","wE",2,0,4],
yf:[function(a,b,c,d,e){return a.dO(c,"<subject> thrust<s> {"+H.b(U.aa(a))+" |}at <object>",e.gi(),!0,d)},"$5","eM",10,0,8],
wb:{"^":"a:3;",
$3:function(a,b,c){return a.gT()!==!0&&a.ga4()&&!c.ga0()&&a.e instanceof Z.ak}},
wc:{"^":"a:3;",
$3:function(a,b,c){return M.bc(a,c)}},
wd:{"^":"a:3;",
$3:function(a,b,c){return L.aP(a,c,C.l)}},
wn:{"^":"a:3;",
$3:function(a,b,c){return a.gT()===!0&&a.ga4()&&!c.ga0()&&a.e instanceof Z.ak}},
wo:{"^":"a:3;",
$3:function(a,b,c){return M.bc(a,c)}},
wp:{"^":"a:3;",
$3:function(a,b,c){return L.aP(a,c,C.m)}},
wm:{"^":"a:3;",
$3:function(a,b,c){return 0.7-(c.gam()!=null?0.2:0)}},
wq:{"^":"a:3;",
$3:function(a,b,c){return L.aP(a,c,C.p)}}}],["","",,O,{"^":"",
yb:[function(a){return new A.a2(O.eN(),null,null,new O.we(),new O.wf(),new O.wg(),null,!0,"Opponents on the ground are often the most vulnerable.",!0,!0,"StartThrustSpearDown",!1,null,"thrust down at <object>",null,a,null)},"$1","wF",2,0,4],
yc:[function(a){return new A.a2(O.eN(),new O.wh(),O.eN(),new O.wi(),new O.wj(),new O.wk(),new O.wl(),!0,"Opponents on the ground are often the most vulnerable.",!0,!0,"StartThrustSpearDownPlayer",!0,C.c,"thrust down at <object>","will <subject> hit?",a,null)},"$1","wG",2,0,4],
yd:[function(a,b,c,d,e){return a.ac(c,"<subject> thrust<s> down {with "+H.b(U.aa(a))+" |}at <object>",d)},"$5","eN",10,0,11],
we:{"^":"a:3;",
$3:function(a,b,c){return a.gT()!==!0&&c.ga0()&&!a.ga0()&&a.e instanceof Z.ak}},
wf:{"^":"a:3;",
$3:function(a,b,c){return D.d6(a,c)}},
wg:{"^":"a:3;",
$3:function(a,b,c){return V.bI(a,c,C.l)}},
wi:{"^":"a:3;",
$3:function(a,b,c){return a.gT()===!0&&c.ga0()&&!a.ga0()&&a.e instanceof Z.ak}},
wj:{"^":"a:3;",
$3:function(a,b,c){return D.d6(a,c)}},
wk:{"^":"a:3;",
$3:function(a,b,c){return V.bI(a,c,C.m)}},
wh:{"^":"a:3;",
$3:function(a,b,c){var z,y
z=a.gar()?0.2:0
y=c.gam()!=null?0.2:0
return 0.7-z-y}},
wl:{"^":"a:3;",
$3:function(a,b,c){return V.bI(a,c,C.p)}}}],["","",,E,{"^":"",ph:{"^":"cd;a1:c<,b,a",
ga6:function(){return"pick up <object>"},
gJ:function(){return"A shield makes a huge difference in battle."},
gK:function(){return!1},
gh:function(){return"TakeDroppedShield"},
gO:function(){return!1},
gL:function(){return},
P:[function(a,b,c){throw H.c(new P.Y(null))},"$3","gM",6,0,1],
R:[function(a,b,c){var z,y
z=b.f
y=z.length!==0?C.a.gw(z):null
b.c4(y.gi(),y.a2(new E.pi(this)))
b.W(a.gi(),new E.pj(this))
z=this.b
a.ac(c,"<subject> pick<s> <object> up",z)
return H.b(a.gh())+" picks up "+H.b(z.gh())},"$3","gN",6,0,1],
ab:function(a,b){return H.i(new P.Y(null))},
I:function(a,b){return 1},
H:function(a,b){if(!(this.b instanceof E.bq))return!1
a.gfV()
if(a.d!=null)return!1
return!0},
v:{
xu:[function(a){return new E.ph(!0,a,null)},"$1","wM",2,0,29]}},pi:{"^":"a:13;a",
$1:function(a){a.gbn().a3(0,this.a.b)
return a}},pj:{"^":"a:0;a",
$1:function(a){a.sam(H.F(this.a.b,"$isbq"))}}}],["","",,M,{"^":"",pk:{"^":"cd;a1:c<,b,a",
ga6:function(){return"pick up <object>"},
gJ:function(){return"A different weapon might change the battle."},
gK:function(){return!1},
gh:function(){return"TakeDroppedWeapon"},
gO:function(){return!1},
gL:function(){return},
P:[function(a,b,c){throw H.c(new P.Y(null))},"$3","gM",6,0,1],
R:[function(a,b,c){var z,y
z=b.f
y=z.length!==0?C.a.gw(z):null
b.c4(y.gi(),y.a2(new M.pl(this)))
b.W(a.gi(),new M.pm(this,a))
z=this.b
a.ac(c,"<subject> pick<s> <object> up",z)
return H.b(a.gh())+" picks up "+H.b(z.gh())},"$3","gN",6,0,1],
ab:function(a,b){return H.i(new P.Y(null))},
I:function(a,b){return 1},
H:function(a,b){var z,y,x,w,v
z=this.b
y=J.o(z)
if(!y.$isaR)return!1
if(!!y.$isak)return!1
a.gfV()
x=a.e
w=x instanceof Z.ak&&!!y.$isaG
z=z.gae()
x=x.gae()
if(typeof x!=="number")return H.x(x)
if(z<=x&&!w)return!1
v=b.cv("DisarmKick",a,!0)
if(v!=null&&v<=2)return!1
return!0},
v:{
xv:[function(a){return new M.pk(!0,a,null)},"$1","wN",2,0,29]}},pl:{"^":"a:13;a",
$1:function(a){a.gbn().a3(0,this.a.b)
return a}},pm:{"^":"a:0;a,b",
$1:function(a){if(!this.b.gaz())a.gaC().t(0,a.gS())
a.sS(H.F(this.a.b,"$isaR"))}}}],["","",,D,{"^":"",pt:{"^":"z;K:c<,a1:d<,J:e<,O:f<,L:r<,b,a",
ga6:function(){return"throw spear at <object>"},
gh:function(){return"ThrowSpear"},
gaf:function(){return"will <subject> hit <object>?"},
P:[function(a,b,c){var z,y
z=this.fv(a)
y=this.b
a.ac(c,"<subject> {throw<s>|hurl<s>|cast<s>} "+H.b(z.gaK()===!0?z.gh():"<subject's> "+H.b(z.gh()))+" at <object>",y)
if(y.gam()!=null)y.kU(c,"<subject> deflects it with <subject's> <object>",!0,y.gam(),!0)
else y.eW(c,"<subject> {dodge<s> it|move<s> out of the way}",!0,!0)
z.a8(c,"<subject> {drive<s>|plunge<s>|ram<s>|thrust<s>} into the "+H.b(U.bA(b))+"{| nearby| not far from here}")
this.fH(b,a,z)
return H.b(a.gh())+" fails to hit "+H.b(y.gh())+" with spear"},"$3","gM",6,0,1],
R:[function(a,b,c){var z,y,x,w,v,u,t
z=this.fv(a)
y=this.b
a.ac(c,"<subject> {throw<s>|hurl<s>|cast<s>} "+H.b(z.gaK()===!0?z.gh():"<subject's> "+H.b(z.gh()))+" at <object>",y)
if(y.gam()!=null)z.dP(c,"<subject> fl<ies> past <object-owner's> <object>",y.gam(),y,a,!0)
b.W(y.gi(),new D.px(z))
x=b.B(y.gi())
w=!x.gaH()&&x.gi()!==100
v=[P.q]
if(!w){u=S.bN("{shoulder|{left|right} arm|{left|right} thigh}")
t=a.gaY()
v=H.p([],v)
z.dP(c,"<subject> {pierce<s>|ram<s> into|drill<s> through} <object-owner's> <object>",new Y.aC(!1,u,v,t==null?$.$get$aL():t,!1,C.n),x,a,!0)
N.b4(c,x)}else{u=S.bN("{chest|eye|neck}")
t=a.gaY()
v=H.p([],v)
z.dP(c,"<subject> {pierce<s>|ram<s> into|drill<s> through} <object-owner's> <object>",new Y.aC(!1,u,v,t==null?$.$get$aL():t,!1,C.n),x,a,!0)
N.bi(c,b,x)}this.fH(b,a,z)
return H.b(a.gh())+" hits "+H.b(y.gh())+" with spear"},"$3","gN",6,0,1],
I:function(a,b){return 0.6-(this.b.gam()!=null?0.2:0)},
H:function(a,b){var z
if(a.gT()===!0)if(a.ga4())z=(C.a.a7(a.e.gf3(),C.r)||a.hb(C.r))&&J.e(b.ak("FightSituation").gV(),0)
else z=!1
else z=!1
return z},
fv:function(a){var z,y
if(a.gS()!=null&&a.gS() instanceof Z.ak)return a.gS()
for(z=a.gaC(),z=z.ga_(z);z.u();){y=z.d
if(y instanceof Z.ak)return y}throw H.c(new P.w("No spear found in "+a.k(0)))},
fH:function(a,b,c){var z,y
z=a.ak("FightSituation")
if(J.e(b.gS(),c)){y=b.jW()
if(y==null)y=$.$get$dj()
a.W(b.y,new D.pu(y))}else a.W(b.gi(),new D.pv(c))
a.c4(z.gi(),z.a2(new D.pw(c)))},
v:{
xx:[function(a){return new D.pt(!0,!0,"The enemy is far enough for you to throw a spear at them and ready your other weapon before they close in.",!0,C.c,a,null)},"$1","wQ",2,0,4]}},px:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gag()
y=this.a.gbA()
if(typeof z!=="number")return z.at()
a.sag(z-y)
return a}},pu:{"^":"a:0;a",
$1:function(a){var z=this.a
a.sS(z)
a.gaC().a3(0,z)
return a}},pv:{"^":"a:0;a",
$1:function(a){a.gaC().a3(0,this.a)
return a}},pw:{"^":"a:0;a",
$1:function(a){a.gbn().t(0,this.a)
return a}}}],["","",,M,{"^":"",pF:{"^":"ag;J:b<,O:c<,L:d<,K:e<,a1:f<,a",
gX:function(){return"Regain clarity."},
gh:function(){return"Unconfuse"},
P:[function(a,b,c){throw H.c(new P.Y(null))},"$3","gM",6,0,1],
R:[function(a,b,c){a.a8(c,"<subject> shake<s> <subject's> head violently")
if(a.gT()===!0)c.t(0,"the {horrible|terrible} spell seems to recede")
a.kT(c,"<subject's> eyes regain focus and clarity",!0,!0)
b.W(a.gi(),new M.pG())
return H.b(a.gh())+" regains clarity"},"$3","gN",6,0,1],
ab:function(a,b){return"WARNING this shouldn't be user-visible"},
I:function(a,b){return 1},
H:function(a,b){var z
if(a.gc3()===!0){z=b.cv("Confuse",a,!0)
if(typeof z!=="number")return z.bk()
z=z>8}else z=!1
return z}},pG:{"^":"a:0;",
$1:function(a){a.sc3(!1)
return a}}}],["","",,R,{"^":"",lr:{"^":"z;J:c<,K:d<,a1:e<,O:f<,L:r<,b,a",
gh:function(){return"FinishBreakNeck"},
ga6:function(){return""},
gaf:function(){return"(WARNING should not be user-visible)"},
P:[function(a,b,c){throw H.c(new P.Y(null))},"$3","gM",6,0,1],
R:[function(a,b,c){var z,y
z=this.b
b.W(z.gi(),new R.ls())
y=b.B(z.gi())
if(J.e(y.gi(),100)){a.bp(c,"<subject> smash<es> <object's> head to the ground",y,!0)
N.b4(c,y)}else{a.bp(c,"<subject> break<s> <object's> neck",y,!0)
N.bi(c,b,y)}return H.b(a.gh())+" breaks "+H.b(z.gh())+"'s neck on ground"},"$3","gN",6,0,1],
I:function(a,b){return 1},
H:function(a,b){return!0},
v:{
x6:[function(a){return new R.lr(null,!0,!0,!0,C.c,a,null)},"$1","uh",2,0,4]}},ls:{"^":"a:0;",
$1:function(a){a.sag(0)
return a}}}],["","",,Y,{"^":"",
f0:function(a,b){var z=new Y.dw(null,null,null,null,null)
new Y.tJ(a,b).$1(z)
return z.q()},
f_:{"^":"ae;",
gaG:function(){return[R.uh()]},
gh:function(){return"BreakNeckOnGroundSituation"},
ay:function(){var z=new Y.dw(null,null,null,null,null)
z.m(this)
new Y.jT().$1(z)
return z.q()},
b_:function(a,b){if(a===0)return b.B(this.a)
return},
b6:function(a,b){return new H.K(a,new Y.jU(this),[H.m(a,0)])}},
tJ:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a9().as(1073741823)
a.gba().c=z
a.gba().e=0
z=this.a.gi()
a.gba().b=z
z=this.b.gi()
a.gba().d=z
return a}},
jT:{"^":"a:0;",
$1:function(a){var z=a.gba().e
if(typeof z!=="number")return z.aj()
a.gba().e=z+1
return a}},
jU:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.e(a.gi(),z.a)||J.e(a.gi(),z.c)}},
pY:{"^":"f_;a,i:b<,c,V:d<",
a2:function(a){var z=new Y.dw(null,null,null,null,null)
z.m(this)
a.$1(z)
return z.q()},
A:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof Y.f_))return!1
if(J.e(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y)if(J.e(this.c,b.c)){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1}else z=!1
return z},
gD:function(a){return Y.U(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
k:function(a){return"BreakNeckOnGroundSituation {attacker="+H.b(J.h(this.a))+",\nid="+J.h(this.b)+",\ntarget="+H.b(J.h(this.c))+",\ntime="+J.h(this.d)+",\n}"}},
dw:{"^":"d;a,b,c,d,e",
gi:function(){return this.gba().c},
gV:function(){return this.gba().e},
gba:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
m:function(a){this.a=a},
q:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gba().b
x=this.gba().c
w=this.gba().d
v=this.gba().e
z=new Y.pY(y,x,w,v)
if(y==null)H.i(P.l("attacker"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("target"))
if(v==null)H.i(P.l("time"))}this.m(z)
return z}}}],["","",,Z,{"^":"",l9:{"^":"z;J:c<,K:d<,a1:e<,O:f<,L:r<,b,a",
ga6:function(){return"evade"},
gh:function(){return"EvadeNeckBreaking"},
gaf:function(){return"will <subject> evade?"},
P:[function(a,b,c){a.a8(c,"<subject> tr<ies> to {dodge it|break free}")
S.a7(new Z.la(a,c),new Z.lb(this,a,c),null,null)
b.aA()
return H.b(a.gh())+" fails to dodge "+H.b(this.b.gh())},"$3","gM",6,0,1],
R:[function(a,b,c){var z=this.b
a.bp(c,"<subject> {dodge<s> it|break<s> free}",z,!0)
b.aX("FightSituation")
return H.b(a.gh())+" evades "+H.b(z.gh())},"$3","gN",6,0,1],
I:function(a,b){var z
if(a.gT()===!0)return 0.6
z=b.f
return(z.length!==0?C.a.gw(z):null).gb5().b4(0.5)},
H:function(a,b){return!0},
v:{
x5:[function(a){return new Z.l9("This looks dangerous. Trying to evade this close-quarter move seems prudent.",!1,!1,!0,C.c,a,null)},"$1","ub",2,0,4]}},la:{"^":"a:2;a,b",
$0:function(){return this.a.ai(this.b,"<subject> {can't|fail<s>}",!0)}},lb:{"^":"a:2;a,b,c",
$0:function(){return this.a.b.bR(this.c,"<subject> <is> too quick for <object>",!0,this.b)}}}],["","",,S,{"^":"",
dW:function(a,b,c){var z=new S.dV(null,null,null,null,null,null)
new S.tI(a,b,c).$1(z)
return z.q()},
fE:{"^":"c7;",
gaG:function(){return[Z.ub()]},
gh:function(){return"OnGroundWrestleDefenseSituation"},
ay:function(){var z=new S.dV(null,null,null,null,null,null)
z.m(this)
new S.mW().$1(z)
return z.q()}},
tI:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$a9().as(1073741823)
a.gaR().c=z
a.gaR().f=0
z=this.a.gi()
a.gaR().b=z
z=this.b.gi()
a.gaR().e=z
a.gaR().d=this.c
return a}},
mW:{"^":"a:0;",
$1:function(a){var z=a.gaR().f
if(typeof z!=="number")return z.aj()
a.gaR().f=z+1
return a}},
q7:{"^":"fE;cP:a<,i:b<,cr:c<,cu:d<,V:e<",
a2:function(a){var z=new S.dV(null,null,null,null,null,null)
z.m(this)
a.$1(z)
return z.q()},
A:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof S.fE))return!1
if(J.e(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
if(z==null?y==null:z===y)if(J.e(this.d,b.d)){z=this.e
y=b.e
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1}else z=!1}else z=!1
return z},
gD:function(a){return Y.U(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)))},
k:function(a){return"OnGroundWrestleDefenseSituation {attacker="+H.b(J.h(this.a))+",\nid="+J.h(this.b)+",\npredeterminedResult="+J.h(this.c)+",\ntarget="+H.b(J.h(this.d))+",\ntime="+J.h(this.e)+",\n}"}},
dV:{"^":"d;a,b,c,d,e,f",
gi:function(){return this.gaR().c},
gV:function(){return this.gaR().f},
gaR:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.f=z.e
this.a=null}return this},
m:function(a){this.a=a},
q:function(){var z,y,x,w,v,u
z=this.a
if(z==null){y=this.gaR().b
x=this.gaR().c
w=this.gaR().d
v=this.gaR().e
u=this.gaR().f
z=new S.q7(y,x,w,v,u)
if(y==null)H.i(P.l("attacker"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("predeterminedResult"))
if(v==null)H.i(P.l("target"))
if(u==null)H.i(P.l("time"))}this.m(z)
return z}}}],["","",,A,{"^":"",
dp:function(a,b){var z,y,x,w
z=b.cv("KickToGround",a,!0)
if(z!=null&&z<=2)return!0
y=b.cv("Pound",a,!0)
if(y!=null&&y<=2)return!0
x=b.cv("FinishPunch",a,!0)
if(x!=null&&x<=2)return!0
w=b.cv("FinishLeap",a,!0)
if(w!=null&&w<=2)return!0
return!1}}],["","",,U,{"^":"",
c_:function(a){return a.gam().gaK()===!0?a.gam().gh():"<subject's> "+H.b(a.gam().gh())},
aa:function(a){return a.gS().gaK()===!0?a.gS().gh():"<subject's> "+H.b(a.gS().gh())}}],["","",,G,{"^":"",
xG:[function(a,b,c,d,e){a.a8(c,"<subject> tr<ies> to swing back")
a.eV(c,"<subject> {go<es> wide|miss<es>}",!0,!0)
if(a.ga4()){b.W(a.y,new G.tT())
a.c5(c,"<subject> lose<s> balance because of that",!0,!0)}else if(a.fr===C.h){b.W(a.y,new G.tU())
a.aD(c,"<subject> lose<s> balance because of that",!0)
a.c5(c,"<subject> fall<s> to the ground",!0,!0)}},"$5","ia",10,0,11],
xH:[function(a){return new A.a2(G.ib(),new G.tV(),G.ia(),new G.tW(),new G.tX(),new G.tY(),null,!1,"You can deal serious damage when countering because your opponent is often caught off guard. On the other hand, counters require fast reaction and could throw you out of balance.",!0,!0,"CounterSlash",!1,null,"swing back at <object>",null,a,null)},"$1","u2",2,0,4],
xJ:[function(a,b,c,d,e){return a.ac(c,"<subject> swing<s> back",d)},"$5","ib",10,0,8],
xI:[function(a){return new A.a2(G.ib(),new G.tZ(),G.ia(),new G.u_(),new G.u0(),new G.u1(),null,!1,"You can deal serious damage when countering because your opponent is often caught off guard. On the other hand, counters require fast reaction and could throw you out of balance.",!0,!0,"CounterSlashPlayer",!0,C.c,"swing back at <object>","will <subject> hit <objectPronoun>?",a,null)},"$1","u3",2,0,4],
tT:{"^":"a:0;",
$1:function(a){a.sah(C.h)
return a}},
tU:{"^":"a:0;",
$1:function(a){a.sah(C.f)
return a}},
tW:{"^":"a:3;",
$3:function(a,b,c){return a.gT()!==!0&&a.gS().gaV()&&!a.ga0()}},
tX:{"^":"a:3;",
$3:function(a,b,c){return M.bc(a,c)}},
tY:{"^":"a:3;",
$3:function(a,b,c){return L.aP(a,c,C.l)}},
tV:{"^":"a:3;",
$3:function(a,b,c){return c.ga4()?0.7:0.9}},
u_:{"^":"a:3;",
$3:function(a,b,c){return a.gT()===!0&&a.gS().gaV()&&!a.ga0()}},
u0:{"^":"a:3;",
$3:function(a,b,c){return M.bc(a,c)}},
u1:{"^":"a:3;",
$3:function(a,b,c){return L.aP(a,c,C.m)}},
tZ:{"^":"a:3;",
$3:function(a,b,c){return c.ga4()?0.7:0.9}}}],["","",,V,{"^":"",ke:{"^":"z;J:c<,K:d<,a1:e<,O:f<,L:r<,b,a",
ga6:function(){return"tackle <object>"},
gh:function(){return"CounterTackle"},
gaf:function(){return"will <subject> tackle <objectPronoun>?"},
P:[function(a,b,c){var z=this.b
a.ac(c,"<subject> tr<ies> to tackle <object>",z)
S.a7(new V.kf(a,c),new V.kg(this,c),null,null)
a.ac(c,"<subject> land<s> on the "+H.b(U.bA(b))+" next to <object>",z)
b.W(a.gi(),new V.kh())
return H.b(a.gh())+" fails to tackle "+H.b(z.gh())},"$3","gM",6,0,1],
R:[function(a,b,c){var z=this.b
a.ac(c,"<subject> tackle<s> <object> to the ground",z)
b.W(z.gi(),new V.ki())
b.W(a.gi(),new V.kj())
return H.b(a.gh())+" tackles "+H.b(z.gh())},"$3","gN",6,0,1],
I:function(a,b){var z=this.b.gar()?0.2:0
if(a.gT()===!0)return 0.7+z
return 0.5+z},
H:function(a,b){return!a.ga0()&&a.e instanceof K.cc},
v:{
wZ:[function(a){return new V.ke("When an opponent misses you like that, it's a rare (though still dangerous) opportunity to bring them down.",!0,!0,!0,C.c,a,null)},"$1","u4",2,0,4]}},kf:{"^":"a:2;a,b",
$0:function(){return this.a.ai(this.b,"<subject> go<es> wide",!0)}},kg:{"^":"a:2;a,b",
$0:function(){return this.a.b.ai(this.b,"<subject> {evade<s>|sidestep<s>} it",!0)}},kh:{"^":"a:0;",
$1:function(a){a.sah(C.f)
return a}},ki:{"^":"a:0;",
$1:function(a){a.sah(C.f)
return a}},kj:{"^":"a:0;",
$1:function(a){a.sah(C.f)
return a}}}],["","",,S,{"^":"",
c5:function(a,b){var z=new S.dz(null,null,null,null,null)
new S.tB(a,b).$1(z)
return z.q()},
f6:{"^":"ae;",
gaG:function(){return[G.u2(),G.u3(),V.u4()]},
gbO:function(){return[$.$get$dY()]},
gh:function(){return"CounterAttackSituation"},
ay:function(){var z=new S.dz(null,null,null,null,null)
z.m(this)
new S.kc().$1(z)
return z.q()},
b_:function(a,b){if(a===0)return b.B(this.a)
return},
b6:function(a,b){return new H.K(a,new S.kd(this),[H.m(a,0)])}},
tB:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a9().as(1073741823)
a.gbb().c=z
a.gbb().e=0
z=this.a.gi()
a.gbb().b=z
z=this.b.gi()
a.gbb().d=z
return a}},
kc:{"^":"a:0;",
$1:function(a){var z=a.gbb().e
if(typeof z!=="number")return z.aj()
a.gbb().e=z+1
return a}},
kd:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.e(a.gi(),z.a)||J.e(a.gi(),z.c)}},
pZ:{"^":"f6;a,i:b<,c,V:d<",
a2:function(a){var z=new S.dz(null,null,null,null,null)
z.m(this)
a.$1(z)
return z.q()},
A:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof S.f6))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
if(z==null?y==null:z===y)if(J.e(this.c,b.c)){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1}else z=!1
return z},
gD:function(a){return Y.U(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
k:function(a){return"CounterAttackSituation {counterAttacker="+J.h(this.a)+",\nid="+J.h(this.b)+",\ntarget="+H.b(J.h(this.c))+",\ntime="+J.h(this.d)+",\n}"}},
dz:{"^":"d;a,b,c,d,e",
gi:function(){return this.gbb().c},
gV:function(){return this.gbb().e},
gbb:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
m:function(a){this.a=a},
q:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gbb().b
x=this.gbb().c
w=this.gbb().d
v=this.gbb().e
z=new S.pZ(y,x,w,v)
if(y==null)H.i(P.l("counterAttacker"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("target"))
if(v==null)H.i(P.l("time"))}this.m(z)
return z}}}],["","",,O,{"^":"",c7:{"^":"op;",
gdJ:function(){return 1000},
b_:function(a,b){if(a===0)return b.B(this.gcu())
return},
b6:function(a,b){return new H.K(a,new O.ko(this),[H.m(a,0)])}},op:{"^":"ae+ni;"},ko:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.e(a.gi(),z.gcP())||J.e(a.gi(),z.gcu())}}}],["","",,U,{"^":"",
bA:function(a){return a.ak("FightSituation").gca()},
cb:function(a,b,c,d,e){var z=new U.ca(null,null,null,null,null,null,null,null,null)
new U.rW(a,b,c,d,e).$1(z)
return z.q()},
cS:{"^":"ae;",
gaG:function(){return[N.tQ(),V.u6(),R.v_(),Y.va(),T.wr(),T.ws(),M.wt(),M.wu(),U.wv(),U.ww(),G.wx(),G.wy(),D.wB(),D.wC(),R.wz(),R.wA(),A.wD(),A.wE(),O.wF(),O.wG(),E.wM(),M.wN(),D.wQ()]},
gbO:function(){return H.p([$.$get$fR(),$.$get$h9(),$.$get$fV(),$.$get$hz()],[Q.ag])},
gdJ:function(){return 1000},
gh:function(){return"FightSituation"},
cQ:function(a,b){var z=b.a
return(z&&C.a).bt(z,new U.le(a))},
ay:function(){var z=new U.ca(null,null,null,null,null,null,null,null,null)
z.m(this)
new U.lf().$1(z)
return z.q()},
b_:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j
z=X.i3(this.f,this.b)
y=H.bH(z,new U.lg(b),H.y(z,"B",0),null)
x=H.y(y,"B",0)
w=P.P(new H.K(y,new U.lh(),[x]),!1,x)
x=H.m(w,0)
v=P.P(new H.K(w,new U.li(),[x]),!1,x)
u=v.length===1?C.a.gcd(v):null
if(a===0)if(u!=null)return u
for(y=w.length,t=0,s=null,r=0;r<w.length;w.length===y||(0,H.as)(w),++r){q=w[r]
x=b.d
p=x.aU(0,new U.lj(q),new U.lk())
o=p==null?p:p.gV()
if(o==null)o=-1
n=b.r
if(typeof o!=="number")return H.x(o)
m=n-o
if(m<=0)continue
l=x.aU(0,new U.ll(q),new U.lm())
k=l==null?l:l.gV()
if(k==null)k=-1
x=b.r
if(typeof k!=="number")return H.x(k)
j=(x-k+m)/2
if(q.gT()===!0)j*=1.5
if(j>t){s=q
t=j}}return s},
b6:function(a,b){return new H.K(a,new U.ln(this),[H.m(a,0)])},
hm:function(a,b){var z,y
z=this.x
y=this.c.a
if(y.ad(z))y.j(0,z).$2(a,b)},
d1:function(a){var z,y,x,w,v,u,t
z=this.r
if(z!=null&&!this.cQ(a,this.b)&&this.cQ(a,this.f)){y=a.f6(z)
a.c4(y.gi(),y.a2(new U.lo()))
for(z=this.f,x=z.a,x=new J.bj(x,x.length,0,null,[H.m(x,0)]),w=a.a;x.u();){v=x.d
if(a.B(v).gaq()){u=a.B(v)
t=u.a2(new U.lp())
w.a3(0,u)
w.t(0,t)}}C.a.t(a.f,X.mw(z,this.d,this.a,null))}else this.cQ(a,this.f)},
dj:function(a){var z=this.f
if(this.cQ(a,z))if(this.cQ(a,this.b)){z=z.a
z=(z&&C.a).bt(z,new U.lq(a))}else z=!1
else z=!1
return z}},
rW:{"^":"a:0;a,b,c,d,e",
$1:function(a){var z,y
z=$.$get$a9().as(1073741823)
a.gao().f=z
a.gao().y=0
z=a.gao()
y=z.r
if(y==null){y=new S.O(null,null,[P.t])
y.al()
y.m(C.d)
z.r=y
z=y}else z=y
z.m(J.eS(this.a,new U.rx()))
z=a.gao()
y=z.c
if(y==null){y=new S.O(null,null,[P.t])
y.al()
y.m(C.d)
z.c=y
z=y}else z=y
y=this.b
z.m(new H.aq(y,new U.ry(),[H.m(y,0),null]))
a.gao().e=this.c
y=new S.O(null,null,[U.ad])
y.al()
y.m(C.d)
a.gao().b=y
y=this.d.gi()
a.gao().x=y
y=new A.cX(null,null,[P.t,{func:1,v:true,args:[A.a4,Y.a3]}])
y.ci()
y.m(this.e)
a.gao().d=y
return a}},
rx:{"^":"a:0;",
$1:function(a){return a.gi()}},
ry:{"^":"a:0;",
$1:function(a){return a.gi()}},
le:{"^":"a:0;a",
$1:function(a){return this.a.B(a).gaq()}},
lf:{"^":"a:0;",
$1:function(a){var z=a.gao().y
if(typeof z!=="number")return z.aj()
a.gao().y=z+1
return a}},
lg:{"^":"a:0;a",
$1:function(a){return this.a.B(a)}},
lh:{"^":"a:0;",
$1:function(a){return a.gaq()}},
li:{"^":"a:0;",
$1:function(a){return a.gT()}},
lj:{"^":"a:0;a",
$1:function(a){return J.e(a.gcs(),this.a.gi())&&a.ghH()===!0}},
lk:{"^":"a:2;",
$0:function(){return}},
ll:{"^":"a:0;a",
$1:function(a){return J.e(a.gcs(),this.a.gi())}},
lm:{"^":"a:2;",
$0:function(){return}},
ln:{"^":"a:24;a",
$1:function(a){var z,y,x
if(a.gaq()){z=this.a
y=a.gi()
x=z.f.a
if(!(x&&C.a).a7(x,y)){y=a.gi()
z=z.b.a
y=(z&&C.a).a7(z,y)
z=y}else z=!0}else z=!1
return z}},
lo:{"^":"a:0;",
$1:function(a){a.skC(!1)
return a}},
lp:{"^":"a:0;",
$1:function(a){a.sah(C.k)
return a}},
lq:{"^":"a:51;a",
$1:function(a){var z=this.a.B(a)
return z.gT()===!0&&z.gaq()}},
q0:{"^":"cS;bn:a<,b,c,ca:d<,i:e<,d4:f<,r,V:x<",
a2:function(a){var z=new U.ca(null,null,null,null,null,null,null,null,null)
z.m(this)
a.$1(z)
return z.q()},
A:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof U.cS))return!1
if(J.e(this.a,b.a))if(J.e(this.b,b.b))if(J.e(this.c,b.c)){z=this.d
y=b.d
if(z==null?y==null:z===y){z=this.e
y=b.e
if(z==null?y==null:z===y)if(J.e(this.f,b.f))if(J.e(this.r,b.r)){z=this.x
y=b.x
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1
else z=!1}else z=!1}else z=!1
else z=!1
else z=!1
return z},
gD:function(a){return Y.U(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)),J.j(this.f)),J.j(this.r)),J.j(this.x)))},
k:function(a){return"FightSituation {droppedItems="+J.h(this.a)+",\nenemyTeamIds="+J.h(this.b)+",\nevents="+J.h(this.c)+",\ngroundMaterial="+J.h(this.d)+",\nid="+J.h(this.e)+",\nplayerTeamIds="+J.h(this.f)+",\nroomRoamingSituationId="+H.b(J.h(this.r))+",\ntime="+J.h(this.x)+",\n}"}},
ca:{"^":"d;a,b,c,d,e,f,r,x,y",
gbn:function(){var z,y
z=this.gao()
y=z.b
if(y==null){y=new S.O(null,null,[U.ad])
y.al()
y.m(C.d)
z.b=y
z=y}else z=y
return z},
gca:function(){return this.gao().e},
gi:function(){return this.gao().f},
gd4:function(){var z,y
z=this.gao()
y=z.r
if(y==null){y=new S.O(null,null,[P.t])
y.al()
y.m(C.d)
z.r=y
z=y}else z=y
return z},
gV:function(){return this.gao().y},
gao:function(){var z,y
z=this.a
if(z!=null){z=z.a
if(!(z==null)){y=new S.O(null,null,[H.m(z,0)])
y.al()
y.m(z)
z=y}this.b=z
z=this.a.b
if(!(z==null)){y=new S.O(null,null,[H.m(z,0)])
y.al()
y.m(z)
z=y}this.c=z
z=this.a.c
if(!(z==null)){y=new A.cX(null,null,[H.m(z,0),H.m(z,1)])
y.ci()
y.m(z)
z=y}this.d=z
z=this.a
this.e=z.d
this.f=z.e
z=z.f
if(!(z==null)){y=new S.O(null,null,[H.m(z,0)])
y.al()
y.m(z)
z=y}this.r=z
z=this.a
this.x=z.r
this.y=z.x
this.a=null}return this},
m:function(a){this.a=a},
q:function(){var z,y,x,w,v,u,t,s,r
z=this.a
if(z==null){y=this.gao()
x=y.b
if(x==null){x=new S.O(null,null,[U.ad])
x.al()
x.m(C.d)
y.b=x
y=x}else y=x
y=y.q()
x=this.gao()
w=x.c
if(w==null){w=new S.O(null,null,[P.t])
w.al()
w.m(C.d)
x.c=w
x=w}else x=w
x=x.q()
w=this.gao()
v=w.d
if(v==null){v=new A.cX(null,null,[P.t,{func:1,v:true,args:[A.a4,Y.a3]}])
v.ci()
v.m(C.a3)
w.d=v
w=v}else w=v
w=w.q()
v=this.gao().e
u=this.gao().f
t=this.gao()
s=t.r
if(s==null){s=new S.O(null,null,[P.t])
s.al()
s.m(C.d)
t.r=s
t=s}else t=s
t=t.q()
s=this.gao().x
r=this.gao().y
z=new U.q0(y,x,w,v,u,t,s,r)
if(y==null)H.i(P.l("droppedItems"))
if(x==null)H.i(P.l("enemyTeamIds"))
if(w==null)H.i(P.l("events"))
if(v==null)H.i(P.l("groundMaterial"))
if(u==null)H.i(P.l("id"))
if(t==null)H.i(P.l("playerTeamIds"))
if(s==null)H.i(P.l("roomRoamingSituationId"))
if(r==null)H.i(P.l("time"))}this.m(z)
return z}}}],["","",,N,{"^":"",
bi:function(a,b,c){var z,y
z=b.ak("FightSituation")
y=z.gca()
b.c4(z.gi(),z.a2(new N.v0(c)))
if(c.gah()===C.f){c.aD(a,"<subject> stop<s> moving",!0)
a.n(0,"\n\n",!0)
return}switch($.$get$hV().as(3)){case 0:c.c5(a,"<subject> collapse<s>, dead",!0,!0)
break
case 1:c.aD(a,"<subject> fall<s> backward",!0)
c.aD(a,"<subject> twist<s>",!0)
c.c5(a,"<subject> hit<s> the "+H.b(y)+" face down",!0,!0)
break
case 2:c.aD(a,"<subject> drop<s> to <subject's> knees",!0)
c.aD(a,"<subject> keel<s> over",!0)
break}a.n(0,"\n\n",!0)},
b4:function(a,b){if(J.e(b.gi(),100)&&b.gag()===0){N.rG(a,b)
return}b.aD(a,"<subject> {scream|yell|grunt}<s> in pain",!0)},
rG:function(a,b){if(b.gah()===C.f){b.aD(a,"<subject> stop<s> moving",!0)
a.n(0,"\n\n",!0)
return}b.aD(a,"<subject> drop<s> to <subject's> knees",!0)
b.aD(a,"<subject> keel<s> over",!0)
a.n(0,"\n\n",!0)},
v0:{"^":"a:0;a",
$1:function(a){var z=this.a
if(!z.gaz())a.gbn().t(0,z.e)
if(z.d!=null)a.gbn().t(0,z.d)
return a}}}],["","",,R,{"^":"",lt:{"^":"z;J:c<,K:d<,a1:e<,O:f<,L:r<,b,a",
gh:function(){return"FinishLeap"},
ga6:function(){return""},
gaf:function(){return"(WARNING should not be user-visible)"},
P:[function(a,b,c){throw H.c(new P.Y(null))},"$3","gM",6,0,1],
R:[function(a,b,c){var z,y,x,w,v
z=this.b
b.W(z.gi(),new R.lu())
y=b.B(z.gi())
b.W(a.gi(),new R.lv())
x=b.ak("LeapSituation").gi()
w=U.bA(b)
a.bS(c,"<subject> {ram<s>|smash<es>} into <object>",x,z,!0)
c.jl(0,"both "+(a.gT()===!0||z.gT()===!0?"of you":"")+" {land on|fall to} the "+H.b(w),x)
v=z.gag()
if(typeof v!=="number")return v.bk()
if(v>1){c.jm(0,"the impact almost {knocks <object> unconscious|knocks <object> out}",x,z)
N.b4(c,y)
b.W(z.gi(),new R.lw())}return H.b(a.gh())+" finishes leap at "+H.b(z.gh())},"$3","gN",6,0,1],
I:function(a,b){return 1},
H:function(a,b){return!0},
v:{
x7:[function(a){return new R.lt(null,!0,!0,!0,C.c,a,null)},"$1","ui",2,0,4]}},lu:{"^":"a:0;",
$1:function(a){a.sah(C.f)
return a}},lv:{"^":"a:0;",
$1:function(a){a.sah(C.f)
return a}},lw:{"^":"a:0;",
$1:function(a){var z=a.gag()
if(typeof z!=="number")return z.at()
a.sag(z-1)
return a}}}],["","",,S,{"^":"",kA:{"^":"z;J:c<,K:d<,a1:e<,O:f<,L:r<,b,a",
ga6:function(){return"dodge"},
gh:function(){return"DodgeLeap"},
gaf:function(){return"will <subject> dodge?"},
P:[function(a,b,c){var z=b.ak("LeapSituation").gi()
a.hv(c,"<subject> tr<ies> to {dodge|sidestep}",z,!0)
if(a.gar())a.c6(c,"<subject> <is> out of balance",z,!0,!0)
else S.a7(new S.kB(a,c,z),new S.kC(a,c,z),null,null)
b.aA()
return H.b(a.dx)+" fails to dodge "+H.b(this.b.gh())},"$3","gM",6,0,1],
R:[function(a,b,c){var z,y,x
z=b.ak("LeapSituation").gi()
y=U.bA(b)
x=this.b
a.bS(c,"<subject> {dodge<s>|sidestep<s>} <object>",z,x,!0)
x.aD(c,"<subject> {crash<es> to|fall<s> to|hit<s>} the "+H.b(y),!0)
b.W(x.gi(),new S.kD())
b.aX("FightSituation")
return H.b(a.gh())+" dodges "+H.b(x.gh())},"$3","gN",6,0,1],
I:function(a,b){var z,y,x
z=a.ga4()?0:0.2
y=this.b.ga0()?0.2:0
if(a.cx===!0)return 0.8-z+y
x=b.f
return(x.length!==0?C.a.gw(x):null).gb5().b4(0.5-z+y)},
H:function(a,b){return!a.ga0()},
v:{
x1:[function(a){return new S.kA("Dodging means moving your body out of harm's way. When successful, your opponent will miss and will hit the ground beside you.",!1,!1,!0,C.c,a,null)},"$1","u7",2,0,4]}},kB:{"^":"a:2;a,b,c",
$0:function(){return this.a.c6(this.b,"<subject> {can't|fail<s>|<does>n't succeed}",this.c,!0,!0)}},kC:{"^":"a:2;a,b,c",
$0:function(){return this.a.c6(this.b,"<subject> {<is> too slow|<is>n't fast enough}",this.c,!0,!0)}},kD:{"^":"a:0;",
$1:function(a){a.sah(C.f)
return a}}}],["","",,D,{"^":"",lQ:{"^":"z;J:c<,K:d<,a1:e<,O:f<,L:r<,b,a",
ga6:function(){return"impale"},
gh:function(){return"ImpaleLeaper"},
gaf:function(){return"will <subject> impale <objectPronoun>?"},
P:[function(a,b,c){var z,y
z=b.ak("LeapSituation").gi()
y=this.b
a.dO(c,"<subject> tr<ies> to {move|swing|shift} "+H.b(U.aa(a))+" between <subjectPronounSelf> and <object>",z,!0,y)
if(a.gar())a.c6(c,"<subject> <is> out of balance",z,!0,!0)
else S.a7(new D.lR(a,c,z),new D.lS(a,c,z),null,null)
b.aA()
return H.b(a.dx)+" fails to impale "+H.b(y.gh())},"$3","gM",6,0,1],
R:[function(a,b,c){var z,y,x
z=b.ak("LeapSituation").gi()
y=this.b
a.bS(c,"<subject> {move<s>|swing<s>|shift<s>} "+H.b(U.aa(a))+" between <subjectPronounSelf> and <object>",z,y,!0)
y.aD(c,"<subject> {leap<s>|run<s>|lunge<s>} right into it",!0)
b.W(y.gi(),new D.lT())
x=b.B(y.gi())
if(!(!x.gaH()&&x.gi()!==100)){a.gS().ac(c,"<subject> {cut<s> into|pierce<s>|go<es> into} <object's> flesh",x)
x.a8(c,"<subject> fall<s> to the ground")
N.b4(c,x)}else{a.gS().ac(c,"<subject> {go<es> right through|completely impale<s>|bore<s> through} <object's> {body|chest|stomach|neck}",x)
x.aD(c,"<subject> go<es> down",!0)
N.bi(c,b,x)}b.aX("FightSituation")
return H.b(a.gh())+" impales "+H.b(y.gh())},"$3","gN",6,0,1],
I:function(a,b){var z,y,x
z=a.ga4()?0:0.2
y=this.b.ga0()?0.2:0
if(a.cx===!0)return 0.5-z+y
x=b.f
return(x.length!==0?C.a.gw(x):null).gb5().b4(0.4-z+y)},
H:function(a,b){return!a.ga0()&&a.e.geP()},
v:{
xd:[function(a){return new D.lQ("You can move your weapon to point at the attacker. If successful, the weapon will pierce the attacker with the force of his own leap.",!1,!1,!0,C.c,a,null)},"$1","uS",2,0,4]}},lR:{"^":"a:2;a,b,c",
$0:function(){return this.a.c6(this.b,"<subject> {can't|fail<s>|<does>n't succeed}",this.c,!0,!0)}},lS:{"^":"a:2;a,b,c",
$0:function(){return this.a.c6(this.b,"<subject> {<is> too slow|<is>n't fast enough}",this.c,!0,!0)}},lT:{"^":"a:0;",
$1:function(a){var z=a.gag()
if(typeof z!=="number")return z.at()
a.sag(z-1)
a.sah(C.f)
return a}}}],["","",,V,{"^":"",
dL:function(a,b,c){var z=new V.dK(null,null,null,null,null,null)
new V.tG(a,b,c).$1(z)
return z.q()},
fp:{"^":"c7;",
gaG:function(){return[S.u7(),D.uS()]},
gh:function(){return"LeapDefenseSituation"},
ay:function(){var z=new V.dK(null,null,null,null,null,null)
z.m(this)
new V.mk().$1(z)
return z.q()}},
tG:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$a9().as(1073741823)
a.gaN().c=z
a.gaN().f=0
z=this.a.gi()
a.gaN().b=z
z=this.b.gi()
a.gaN().e=z
a.gaN().d=this.c
return a}},
mk:{"^":"a:0;",
$1:function(a){var z=a.gaN().f
if(typeof z!=="number")return z.aj()
a.gaN().f=z+1
return a}},
q2:{"^":"fp;cP:a<,i:b<,cr:c<,cu:d<,V:e<",
a2:function(a){var z=new V.dK(null,null,null,null,null,null)
z.m(this)
a.$1(z)
return z.q()},
A:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof V.fp))return!1
if(J.e(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
if(z==null?y==null:z===y)if(J.e(this.d,b.d)){z=this.e
y=b.e
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1}else z=!1}else z=!1
return z},
gD:function(a){return Y.U(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)))},
k:function(a){return"LeapDefenseSituation {attacker="+H.b(J.h(this.a))+",\nid="+J.h(this.b)+",\npredeterminedResult="+J.h(this.c)+",\ntarget="+H.b(J.h(this.d))+",\ntime="+J.h(this.e)+",\n}"}},
dK:{"^":"d;a,b,c,d,e,f",
gi:function(){return this.gaN().c},
gV:function(){return this.gaN().f},
gaN:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.f=z.e
this.a=null}return this},
m:function(a){this.a=a},
q:function(){var z,y,x,w,v,u
z=this.a
if(z==null){y=this.gaN().b
x=this.gaN().c
w=this.gaN().d
v=this.gaN().e
u=this.gaN().f
z=new V.q2(y,x,w,v,u)
if(y==null)H.i(P.l("attacker"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("predeterminedResult"))
if(v==null)H.i(P.l("target"))
if(u==null)H.i(P.l("time"))}this.m(z)
return z}}}],["","",,F,{"^":"",
fr:function(a,b){var z=new F.dM(null,null,null,null,null)
new F.tH(a,b).$1(z)
return z.q()},
fq:{"^":"ae;",
gaG:function(){return[R.ui()]},
gh:function(){return"LeapSituation"},
ay:function(){var z=new F.dM(null,null,null,null,null)
z.m(this)
new F.ml().$1(z)
return z.q()},
b_:function(a,b){if(a===0)return b.B(this.a)
return},
b6:function(a,b){return new H.K(a,new F.mm(this),[H.m(a,0)])}},
tH:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a9().as(1073741823)
a.gbc().c=z
a.gbc().e=0
z=this.a.gi()
a.gbc().b=z
z=this.b.gi()
a.gbc().d=z
return a}},
ml:{"^":"a:0;",
$1:function(a){var z=a.gbc().e
if(typeof z!=="number")return z.aj()
a.gbc().e=z+1
return a}},
mm:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.e(a.gi(),z.a)||J.e(a.gi(),z.c)}},
q3:{"^":"fq;a,i:b<,c,V:d<",
a2:function(a){var z=new F.dM(null,null,null,null,null)
z.m(this)
a.$1(z)
return z.q()},
A:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof F.fq))return!1
if(J.e(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y)if(J.e(this.c,b.c)){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1}else z=!1
return z},
gD:function(a){return Y.U(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
k:function(a){return"LeapSituation {attacker="+H.b(J.h(this.a))+",\nid="+J.h(this.b)+",\ntarget="+H.b(J.h(this.c))+",\ntime="+J.h(this.d)+",\n}"}},
dM:{"^":"d;a,b,c,d,e",
gi:function(){return this.gbc().c},
gV:function(){return this.gbc().e},
gbc:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
m:function(a){this.a=a},
q:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gbc().b
x=this.gbc().c
w=this.gbc().d
v=this.gbc().e
z=new F.q3(y,x,w,v)
if(y==null)H.i(P.l("attacker"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("target"))
if(v==null)H.i(P.l("time"))}this.m(z)
return z}}}],["","",,Z,{"^":"",jB:{"^":"ag;K:b<,a1:c<,O:d<,L:e<,a",
gX:function(){return""},
gJ:function(){return},
gh:function(){return"AutoLoot"},
P:[function(a,b,c){throw H.c(new P.Y(null))},"$3","gM",6,0,1],
R:[function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j
z=b.ak("LootSituation")
y=b.B(100)
if(y.gc2()===!0&&!y.gaH()){a.ac(c,"<subject> kneel<s> next to <object>",y)
a.ac(c,"<subject> help<s> <object> to <object's> feet",y)
y.aL(c,'"I\'ll live," <subject> say<s>.',!0)
b.W(100,new Z.jO())}x=[]
for(w=z.gbn(),w=w.ga_(w),v=b.a,u=null,t=null;w.u();){s=w.d
r=b.B(a.gi())
q=r.gS() instanceof Z.ak&&s instanceof G.aG
p=J.o(s)
if(!!p.$isaR){o=s.gbJ()
n=s.gbA()
m=s.gaK()?1:0
l=r.gS().gae()
if(typeof l!=="number")return H.x(l)
o=2+o+n+m>l||q}else o=!1
if(o){k=b.B(a.gi())
j=k.a2(new Z.jP(s,r))
v.a3(0,k)
v.t(0,j)
u=s}else if(!!p.$isbq&&r.gam()==null){k=b.B(a.gi())
j=k.a2(new Z.jQ(s))
v.a3(0,k)
v.t(0,j)
t=s}else{k=b.B(a.gi())
j=k.a2(new Z.jR(s))
v.a3(0,k)
v.t(0,j)
x.push(s)}}if(u!=null){a.ac(c,"<subject> pick<s> up <object>",u)
a.ac(c,"<subject> wield<s> <object>",u)}if(t!=null){a.ac(c,"<subject> pick<s> up <object>",t)
a.ac(c,"<subject> wield<s> <object>",t)}this.iE(x,a,z,b,c)
this.iD(x,a,z,b,c)
if(x.length!==0)c.js("<subject> <also> take<s>",x,null,a)
return H.b(a.gh())+" auto-loots"},"$3","gN",6,0,1],
ab:function(a,b){return"WARNING this shouldn't be user-visible"},
I:function(a,b){return 1},
H:function(a,b){return a.gT()},
iE:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q
z=P.P(new H.K(a,new Z.jI(),[H.m(a,0)]),!0,L.aR)
for(y=b.gaC(),y=y.ga_(y);y.u();){x=y.d
if(x instanceof L.aR)C.a.t(z,x)}if(z.length===0)return
C.a.ce(z,new Z.jJ())
w=c.gd4().aJ(0,new Z.jK(d)).dm(0,new Z.jL())
for(y=J.aj(w.a),v=new H.bS(y,w.b,[H.m(w,0)]),u=d.a;v.u();){t=y.gU()
if(z.length===0)break
s=C.a.ht(z)
r=d.B(t.gi())
q=r.a2(new Z.jM(s))
u.a3(0,r)
u.t(0,q)
C.a.a3(a,s)
r=d.B(b.gi())
q=r.a2(new Z.jN(s))
u.a3(0,r)
u.t(0,q)
b.ac(e,"<subject> give<s> the "+H.b(s.gh())+" to <object>",t)}},
iD:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q
z=P.P(new H.K(a,new Z.jC(),[H.m(a,0)]),!0,E.bq)
for(y=b.gaC(),y=y.ga_(y);y.u();){x=y.d
if(x instanceof E.bq)C.a.t(z,x)}if(z.length===0)return
C.a.ce(z,new Z.jD())
w=c.gd4().aJ(0,new Z.jE(d)).dm(0,new Z.jF())
for(y=J.aj(w.a),v=new H.bS(y,w.b,[H.m(w,0)]),u=d.a;v.u();){t=y.gU()
if(z.length===0)break
s=C.a.ht(z)
r=d.B(t.gi())
q=r.a2(new Z.jG(s))
u.a3(0,r)
u.t(0,q)
C.a.a3(a,s)
r=d.B(b.gi())
q=r.a2(new Z.jH(s))
u.a3(0,r)
u.t(0,q)
b.ac(e,"<subject> give<s> the "+H.b(s.gh())+" to <object>",t)}}},jO:{"^":"a:0;",
$1:function(a){a.sah(C.h)
a.sag(1)
return a}},jP:{"^":"a:0;a,b",
$1:function(a){var z=this.b
if(!(z.gS() instanceof K.cc))a.gaC().t(0,z.gS())
a.sS(this.a)}},jQ:{"^":"a:0;a",
$1:function(a){var z=this.a
a.sam(z)
return z}},jR:{"^":"a:0;a",
$1:function(a){a.gaC().t(0,this.a)
return a}},jI:{"^":"a:0;",
$1:function(a){return a instanceof L.aR}},jJ:{"^":"a:6;",
$2:function(a,b){return J.bD(a.gae(),b.gae())}},jK:{"^":"a:0;a",
$1:function(a){return this.a.B(a)}},jL:{"^":"a:0;",
$1:function(a){return a.gaq()&&a.gaz()}},jM:{"^":"a:0;a",
$1:function(a){a.sS(this.a)
return a}},jN:{"^":"a:0;a",
$1:function(a){a.gaC().a3(0,this.a)
return a}},jC:{"^":"a:0;",
$1:function(a){return a instanceof E.bq}},jD:{"^":"a:6;",
$2:function(a,b){return J.bD(a.gae(),b.gae())}},jE:{"^":"a:0;a",
$1:function(a){return this.a.B(a)}},jF:{"^":"a:0;",
$1:function(a){return a.gaq()&&a.gam()==null}},jG:{"^":"a:0;a",
$1:function(a){a.sam(this.a)
return a}},jH:{"^":"a:0;a",
$1:function(a){a.gaC().a3(0,this.a)
return a}}}],["","",,X,{"^":"",
mw:function(a,b,c,d){var z=new X.dQ(null,null,null,null,null,null)
new X.rX(a,b,c).$1(z)
return z.q()},
fw:{"^":"ae;",
gbO:function(){return H.p([$.$get$eX()],[Q.ag])},
gh:function(){return"LootSituation"},
ay:function(){var z=new X.dQ(null,null,null,null,null,null)
z.m(this)
new X.my().$1(z)
return z.q()},
b_:function(a,b){if(typeof a!=="number")return a.bk()
if(a>0)return
return this.fw(b.a)},
b6:function(a,b){return[this.fw(a)]},
dj:function(a){return!0},
fw:function(a){return a.cl(0,new X.mx())}},
rX:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$a9().as(1073741823)
a.gaw().e=z
a.gaw().f=0
a.gaw().c=this.b
z=new S.O(null,null,[P.t])
z.al()
z.m(this.a)
a.gaw().d=z
z=new S.O(null,null,[U.ad])
z.al()
z.m(this.c)
a.gaw().b=z
return a}},
my:{"^":"a:0;",
$1:function(a){var z=a.gaw().f
if(typeof z!=="number")return z.aj()
a.gaw().f=z+1
return a}},
mx:{"^":"a:0;",
$1:function(a){return a.gT()===!0&&a.gaq()}},
q4:{"^":"fw;bn:a<,ca:b<,d4:c<,i:d<,V:e<",
a2:function(a){var z=new X.dQ(null,null,null,null,null,null)
z.m(this)
a.$1(z)
return z.q()},
A:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof X.fw))return!1
if(J.e(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y)if(J.e(this.c,b.c)){z=this.d
y=b.d
if(z==null?y==null:z===y){z=this.e
y=b.e
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1
else z=!1}else z=!1
return z},
gD:function(a){return Y.U(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)))},
k:function(a){return"LootSituation {droppedItems="+J.h(this.a)+",\ngroundMaterial="+J.h(this.b)+",\nplayerTeamIds="+J.h(this.c)+",\nid="+J.h(this.d)+",\ntime="+J.h(this.e)+",\n}"}},
dQ:{"^":"d;a,b,c,d,e,f",
gbn:function(){var z,y
z=this.gaw()
y=z.b
if(y==null){y=new S.O(null,null,[U.ad])
y.al()
y.m(C.d)
z.b=y
z=y}else z=y
return z},
gca:function(){return this.gaw().c},
gd4:function(){var z,y
z=this.gaw()
y=z.d
if(y==null){y=new S.O(null,null,[P.t])
y.al()
y.m(C.d)
z.d=y
z=y}else z=y
return z},
gi:function(){return this.gaw().e},
gV:function(){return this.gaw().f},
gaw:function(){var z,y
z=this.a
if(z!=null){z=z.a
if(!(z==null)){y=new S.O(null,null,[H.m(z,0)])
y.al()
y.m(z)
z=y}this.b=z
z=this.a
this.c=z.b
z=z.c
if(!(z==null)){y=new S.O(null,null,[H.m(z,0)])
y.al()
y.m(z)
z=y}this.d=z
z=this.a
this.e=z.d
this.f=z.e
this.a=null}return this},
m:function(a){this.a=a},
q:function(){var z,y,x,w,v,u
z=this.a
if(z==null){y=this.gaw()
x=y.b
if(x==null){x=new S.O(null,null,[U.ad])
x.al()
x.m(C.d)
y.b=x
y=x}else y=x
y=y.q()
x=this.gaw().c
w=this.gaw()
v=w.d
if(v==null){v=new S.O(null,null,[P.t])
v.al()
v.m(C.d)
w.d=v
w=v}else w=v
w=w.q()
v=this.gaw().e
u=this.gaw().f
z=new X.q4(y,x,w,v,u)
if(y==null)H.i(P.l("droppedItems"))
if(x==null)H.i(P.l("groundMaterial"))
if(w==null)H.i(P.l("playerTeamIds"))
if(v==null)H.i(P.l("id"))
if(u==null)H.i(P.l("time"))}this.m(z)
return z}}}],["","",,A,{"^":"",mM:{"^":"z;J:c<,K:d<,a1:e<,O:f<,L:r<,b,a",
ga6:function(){return"stab <object>"},
gh:function(){return"OffBalanceOpportunityThrust"},
gaf:function(){return"will <subject> hit <objectPronoun>?"},
P:[function(a,b,c){var z=this.b
a.ac(c,"<subject> tr<ies> to stab <object>",z)
a.ai(c,"<subject> {go<es> wide|fail<s>|miss<es>}",!0)
return H.b(a.gh())+" fails to stab "+H.b(z.gh())},"$3","gM",6,0,1],
R:[function(a,b,c){var z,y
z=this.b
b.W(z.gi(),new A.mN(a))
y=b.B(z.gi())
if(!(!y.gaH()&&y.gi()!==100)){a.bp(c,"<subject> thrust<s> {|"+H.b(U.aa(a))+"} deep into <object's> {shoulder|hip|thigh}",y,!0)
N.b4(c,y)}else{a.bp(c,"<subject> {stab<s>|run<s> "+H.b(U.aa(a))+" through} <object>",y,!0)
N.bi(c,b,y)}return H.b(a.gh())+" stabs "+H.b(z.gh())},"$3","gN",6,0,1],
I:function(a,b){if(a.gT()===!0)return 0.6
return 0.5},
H:function(a,b){return a.ga4()&&this.b.gar()&&a.e.geP()},
v:{
xi:[function(a){return new A.mM("When an opponent is out of balance they are the most vulnerable.",!0,!0,!0,C.c,a,null)},"$1","v4",2,0,4]}},mN:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gag()
y=this.a.gS().gbA()
if(typeof z!=="number")return z.at()
a.sag(z-y)
return a}}}],["","",,U,{"^":"",
mI:function(a,b){var z=new U.dT(null,null,null,null,null)
new U.tK(a,b).$1(z)
return z.q()},
fC:{"^":"ae;",
gaG:function(){return H.p([A.v4()],[{func:1,ret:Q.z,args:[R.A]}])},
gbO:function(){return[$.$get$dY()]},
gh:function(){return"OffBalanceOpportunitySituation"},
ay:function(){var z=new U.dT(null,null,null,null,null)
z.m(this)
new U.mJ().$1(z)
return z.q()},
b_:function(a,b){var z,y,x,w,v
if(typeof a!=="number")return a.bk()
if(a>0)return
z=b.B(this.a)
y=b.a
x=H.m(y,0)
w=P.P(new H.K(y,new U.mK(this,b,z),[x]),!0,x)
if(w.length===0)return
v=C.a.gcV(w)
if(v.ga4()&&z.gar()&&v.e.geP())return v
return},
b6:function(a,b){return new H.K(a,new U.mL(b,b.B(this.a)),[H.m(a,0)])}},
tK:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a9().as(1073741823)
a.gbd().d=z
a.gbd().e=0
z=this.a.gi()
a.gbd().b=z
z=this.b
z=z==null?z:z.gi()
a.gbd().c=z
return a}},
mJ:{"^":"a:0;",
$1:function(a){var z=a.gbd().e
if(typeof z!=="number")return z.aj()
a.gbd().e=z+1
return a}},
mK:{"^":"a:24;a,b,c",
$1:function(a){var z,y
if(a.gaq())if(a.eM(this.c,this.b)){z=a.y
y=this.a.b
y=z==null?y!=null:z!==y
z=y}else z=!1
else z=!1
return z}},
mL:{"^":"a:0;a,b",
$1:function(a){var z=this.b
return J.e(a,z)||a.eM(z,this.a)}},
q5:{"^":"fC;a,b,i:c<,V:d<",
a2:function(a){var z=new U.dT(null,null,null,null,null)
z.m(this)
a.$1(z)
return z.q()},
A:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof U.fC))return!1
if(J.e(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
if(z==null?y==null:z===y){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1}else z=!1
return z},
gD:function(a){return Y.U(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
k:function(a){return"OffBalanceOpportunitySituation {actorId="+H.b(J.h(this.a))+",\nculpritId="+J.h(this.b)+",\nid="+J.h(this.c)+",\ntime="+J.h(this.d)+",\n}"}},
dT:{"^":"d;a,b,c,d,e",
gi:function(){return this.gbd().d},
gV:function(){return this.gbd().e},
gbd:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
m:function(a){this.a=a},
q:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gbd().b
x=this.gbd().c
w=this.gbd().d
v=this.gbd().e
z=new U.q5(y,x,w,v)
if(y==null)H.i(P.l("actorId"))
if(w==null)H.i(P.l("id"))
if(v==null)H.i(P.l("time"))}this.m(z)
return z}}}],["","",,O,{"^":"",lx:{"^":"z;J:c<,K:d<,a1:e<,O:f<,b,a",
ga6:function(){return""},
gh:function(){return"FinishPunch"},
gL:function(){return},
gaf:function(){return"(WARNING should not be user-visible)"},
P:[function(a,b,c){throw H.c(new P.Y(null))},"$3","gM",6,0,1],
R:[function(a,b,c){var z,y,x,w
z=this.b
y=z.ga4()?C.h:C.f
x=b.ak("PunchSituation").gi()
w=U.bA(b)
b.W(z.y,new O.ly(y))
switch(y){case C.k:throw H.c(new P.w("Enemy's pose should never be 'standing' after a successful punch"))
case C.h:c.fS(0,"<subject> {punch<es> <object> in the {face|nose|eye|jaw}|punch<es> <object's> {face|nose|eye|jaw}}",x,z,!0,a)
z.aD(c,"<subject> {stagger<s>|stumble<s>} off balance",!0)
break
case C.f:c.fS(0,"<subject> send<s> <object> to the "+H.b(w)+" with a {massive punch|well-placed fist} to the {face|nose|eye|jaw}",x,z,!0,a)
break}return H.b(a.gh())+" punches "+H.b(z.dx)+" to "+y.k(0)},"$3","gN",6,0,1],
I:function(a,b){return 1},
H:function(a,b){return!0},
v:{
x8:[function(a){return new O.lx(null,!0,!0,!1,a,null)},"$1","uj",2,0,4]}},ly:{"^":"a:0;a",
$1:function(a){a.sah(this.a)
return a}}}],["","",,E,{"^":"",kE:{"^":"z;J:c<,K:d<,a1:e<,O:f<,L:r<,b,a",
ga6:function(){return"dodge"},
gh:function(){return"DodgePunch"},
gaf:function(){return"will <subject> dodge the fist?"},
P:[function(a,b,c){var z=b.ak("PunchSituation").gi()
a.hv(c,"<subject> tr<ies> to {dodge|sidestep|move out of the way}",z,!0)
S.a7(new E.kF(a,c,z),new E.kG(this,a,c,z),null,null)
b.aA()
return H.b(a.gh())+" fails to dodge "+H.b(this.b.gh())},"$3","gM",6,0,1],
R:[function(a,b,c){var z=this.b
a.bS(c,"<subject> {dodge<s>|sidestep<s>} <object's> {punch|blow|jab}",b.ak("PunchSituation").gi(),z,!0)
b.aX("FightSituation")
if(a.gT()===!0)c.t(0,"this opens an opportunity for a counter attack")
C.a.t(b.f,S.c5(a,z))
return H.b(a.gh())+" dodges punch from "+H.b(z.gh())},"$3","gN",6,0,1],
I:function(a,b){var z,y
z=a.ga4()?0:0.2
if(a.cx===!0)return 0.7-z
y=b.f
return(y.length!==0?C.a.gw(y):null).gb5().b4(0.4-z)},
H:function(a,b){return!0},
v:{
x2:[function(a){return new E.kE("Dodging means moving your body out of harm's way.",!1,!1,!0,C.c,a,null)},"$1","u8",2,0,4]}},kF:{"^":"a:2;a,b,c",
$0:function(){return this.a.c6(this.b,"<subject> {can't|fail<s>|<does>n't succeed}",this.c,!0,!0)}},kG:{"^":"a:2;a,b,c,d",
$0:function(){return this.a.b.kX(this.c,"<subject> <is> too quick for <object>",this.d,!0,!0,this.b)}}}],["","",,Z,{"^":"",
e3:function(a,b,c){var z=new Z.e2(null,null,null,null,null,null)
new Z.tE(a,b,c).$1(z)
return z.q()},
fM:{"^":"c7;",
gaG:function(){return[E.u8()]},
gh:function(){return"PunchDefenseSituation"},
ay:function(){var z=new Z.e2(null,null,null,null,null,null)
z.m(this)
new Z.ns().$1(z)
return z.q()}},
tE:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$a9().as(1073741823)
a.gaP().c=z
a.gaP().f=0
z=this.a.gi()
a.gaP().b=z
z=this.b.gi()
a.gaP().e=z
a.gaP().d=this.c
return a}},
ns:{"^":"a:0;",
$1:function(a){var z=a.gaP().f
if(typeof z!=="number")return z.aj()
a.gaP().f=z+1
return a}},
q8:{"^":"fM;cP:a<,i:b<,cr:c<,cu:d<,V:e<",
a2:function(a){var z=new Z.e2(null,null,null,null,null,null)
z.m(this)
a.$1(z)
return z.q()},
A:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof Z.fM))return!1
if(J.e(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
if(z==null?y==null:z===y)if(J.e(this.d,b.d)){z=this.e
y=b.e
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1}else z=!1}else z=!1
return z},
gD:function(a){return Y.U(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)))},
k:function(a){return"PunchDefenseSituation {attacker="+H.b(J.h(this.a))+",\nid="+J.h(this.b)+",\npredeterminedResult="+J.h(this.c)+",\ntarget="+H.b(J.h(this.d))+",\ntime="+J.h(this.e)+",\n}"}},
e2:{"^":"d;a,b,c,d,e,f",
gi:function(){return this.gaP().c},
gV:function(){return this.gaP().f},
gaP:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.f=z.e
this.a=null}return this},
m:function(a){this.a=a},
q:function(){var z,y,x,w,v,u
z=this.a
if(z==null){y=this.gaP().b
x=this.gaP().c
w=this.gaP().d
v=this.gaP().e
u=this.gaP().f
z=new Z.q8(y,x,w,v,u)
if(y==null)H.i(P.l("attacker"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("predeterminedResult"))
if(v==null)H.i(P.l("target"))
if(u==null)H.i(P.l("time"))}this.m(z)
return z}}}],["","",,Q,{"^":"",
fO:function(a,b){var z=new Q.e4(null,null,null,null,null)
new Q.tF(a,b).$1(z)
return z.q()},
fN:{"^":"ae;",
gaG:function(){return[O.uj()]},
gh:function(){return"PunchSituation"},
ay:function(){var z=new Q.e4(null,null,null,null,null)
z.m(this)
new Q.nt().$1(z)
return z.q()},
b_:function(a,b){if(a===0)return b.B(this.a)
return},
b6:function(a,b){return new H.K(a,new Q.nu(this),[H.m(a,0)])}},
tF:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a9().as(1073741823)
a.gbe().c=z
a.gbe().e=0
z=this.a.gi()
a.gbe().b=z
z=this.b.gi()
a.gbe().d=z
return a}},
nt:{"^":"a:0;",
$1:function(a){var z=a.gbe().e
if(typeof z!=="number")return z.aj()
a.gbe().e=z+1
return a}},
nu:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.e(a.gi(),z.a)||J.e(a.gi(),z.c)}},
q9:{"^":"fN;a,i:b<,c,V:d<",
a2:function(a){var z=new Q.e4(null,null,null,null,null)
z.m(this)
a.$1(z)
return z.q()},
A:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof Q.fN))return!1
if(J.e(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y)if(J.e(this.c,b.c)){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1}else z=!1
return z},
gD:function(a){return Y.U(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
k:function(a){return"PunchSituation {attacker="+H.b(J.h(this.a))+",\nid="+J.h(this.b)+",\ntarget="+H.b(J.h(this.c))+",\ntime="+J.h(this.d)+",\n}"}},
e4:{"^":"d;a,b,c,d,e",
gi:function(){return this.gbe().c},
gV:function(){return this.gbe().e},
gbe:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
m:function(a){this.a=a},
q:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gbe().b
x=this.gbe().c
w=this.gbe().d
v=this.gbe().e
z=new Q.q9(y,x,w,v)
if(y==null)H.i(P.l("attacker"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("target"))
if(v==null)H.i(P.l("time"))}this.m(z)
return z}}}],["","",,O,{"^":"",lz:{"^":"z;J:c<,K:d<,a1:e<,O:f<,L:r<,b,a",
ga6:function(){return""},
gh:function(){return"FinishSlash"},
gaf:function(){return"(WARNING should not be user-visible)"},
P:[function(a,b,c){throw H.c(new P.Y(null))},"$3","gM",6,0,1],
R:[function(a,b,c){var z,y,x,w,v
z=this.b
b.W(z.gi(),new O.lC(a))
y=b.B(z.gi())
x=b.ak("SlashSituation").gi()
w=!y.gaH()&&y.gi()!==100
if(!w){a.bS(c,"<subject> {slash<es>|cut<s>} <object's> {shoulder|abdomen|thigh}",x,y,!0)
N.b4(c,y)}else{a.bS(c,"<subject> {slash<es>|cut<s>} {across|through} <object's> {neck|abdomen|lower body}",x,y,!0)
if(J.e(a.gS().gh(),$.$get$cA().b)&&J.ds(z.gh(),"orc")===!0)a.e.aL(c,"<subject> slit<s> through the flesh like it isn't there.",!0)
N.bi(c,b,y)}v=H.b(a.gh())+" slashes"
return v+(w?" (and kills)":"")+" "+H.b(z.gh())},"$3","gN",6,0,1],
I:function(a,b){return 1},
H:function(a,b){return a.gS().gaV()},
v:{
xa:[function(a){return new O.lz(null,!0,!0,!0,C.c,a,null)},"$1","uk",2,0,4]}},lC:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gag()
y=this.a.gS().gbJ()
if(typeof z!=="number")return z.at()
a.sag(z-y)
return a}}}],["","",,V,{"^":"",lD:{"^":"z;J:c<,K:d<,a1:e<,O:f<,L:r<,b,a",
ga6:function(){return""},
gh:function(){return"FinishThrustSpear"},
gaf:function(){return"(WARNING should not be user-visible)"},
P:[function(a,b,c){throw H.c(new P.Y(null))},"$3","gM",6,0,1],
R:[function(a,b,c){var z,y,x,w,v
z=this.b
b.W(z.gi(),new V.lG(a))
y=b.B(z.gi())
x=b.ak("SlashSituation").gi()
w=!y.gaH()&&y.gi()!==100
if(!w){a.bS(c,"<subject> {pierce<s>|stab<s>|bore<s> through} <object's> {shoulder|abdomen|thigh}",x,y,!0)
N.b4(c,y)}else{a.bS(c,"<subject> {pierce<s>|stab<s>|bore<s> through|impale<s>} <object's> {neck|chest|heart}",x,y,!0)
N.bi(c,b,y)}v=H.b(a.gh())+" pierces"
return v+(w?" (and kills)":"")+" "+H.b(z.gh())},"$3","gN",6,0,1],
I:function(a,b){return 1},
H:function(a,b){return a.gS() instanceof Z.ak},
v:{
xc:[function(a){return new V.lD(null,!0,!0,!0,C.c,a,null)},"$1","um",2,0,4]}},lG:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gag()
y=this.a.gS().gbA()
if(typeof z!=="number")return z.at()
a.sag(z-y)
return a}}}],["","",,X,{"^":"",kp:{"^":"z;J:c<,K:d<,a1:e<,O:f<,L:r<,b,a",
ga6:function(){return"step back and parry"},
gh:function(){return"DefensiveParrySlash"},
gaf:function(){return"will <subject> parry it?"},
P:[function(a,b,c){a.a8(c,"<subject> tr<ies> to {parry|deflect it|meet it with "+H.b(U.aa(a))+"|fend it off}")
if(a.gar())a.ai(c,"<subject> <is> out of balance",!0)
else S.a7(new X.kq(a,c),new X.kr(this,a,c),null,null)
b.aA()
return H.b(a.dx)+" fails to parry "+H.b(this.b.gh())},"$3","gM",6,0,1],
R:[function(a,b,c){if(a.gT()===!0)a.a8(c,"<subject> {step<s>|take<s> a step} back")
a.bi(c,"<subject> {parr<ies> it|deflect<s> it|meet<s> it with "+H.b(U.aa(a))+"|fend<s> it off}",!0)
if(!a.ga4()){b.W(a.y,new X.ks())
if(a.cx===!0)a.a8(c,"<subject> regain<s> balance")}b.aX("FightSituation")
return H.b(a.dx)+" steps back and parries "+H.b(this.b.gh())},"$3","gN",6,0,1],
I:function(a,b){var z,y,x
if(a.gT()===!0)return 1
z=b.f
y=z.length!==0?C.a.gw(z):null
x=a.ga4()?0:0.2
return y.gb5().b4(0.5-x)},
H:function(a,b){return a.gS().gcj()},
v:{
x_:[function(a){return new X.kp("Stepping back is the safest way to get out of harm's way.",!1,!1,!0,C.c,a,null)},"$1","u5",2,0,4]}},kq:{"^":"a:2;a,b",
$0:function(){return this.a.ai(this.b,"<subject> {fail<s>|<does>n't succeed}",!0)}},kr:{"^":"a:2;a,b,c",
$0:function(){return this.a.b.bR(this.c,"<subject> <is> too quick for <object>",!0,this.b)}},ks:{"^":"a:0;",
$1:function(a){a.sah(C.k)
return a}}}],["","",,F,{"^":"",kH:{"^":"z;J:c<,K:d<,a1:e<,O:f<,L:r<,b,a",
gh:function(){return"DodgeSlash"},
ga6:function(){return"dodge and counter"},
gaf:function(){return"will <subject> dodge?"},
P:[function(a,b,c){a.a8(c,"<subject> tr<ies> to {dodge|sidestep}")
if(a.gar())a.ai(c,"<subject> <is> out of balance",!0)
else S.a7(new F.kI(a,c),new F.kJ(this,a,c),null,null)
b.aA()
return H.b(a.dx)+" fails to dodge "+H.b(this.b.gh())},"$3","gM",6,0,1],
R:[function(a,b,c){var z=this.b
a.bp(c,"<subject> {dodge<s>|sidestep<s>} it",z,!0)
if(z.ga4()){z.c5(c,"<subject> lose<s> balance because of that",!0,!0)
b.W(z.y,new F.kK())}b.aX("FightSituation")
if(a.gT()===!0)c.t(0,"this opens an opportunity for a counter attack")
C.a.t(b.f,S.c5(a,z))
return H.b(a.gh())+" dodges "+H.b(z.dx)},"$3","gN",6,0,1],
I:function(a,b){var z,y
z=a.ga4()?0:0.2
if(a.cx===!0)return 0.7-z
y=b.f
return(y.length!==0?C.a.gw(y):null).gb5().b4(0.4-z)},
H:function(a,b){return!a.ga0()&&this.b.gS().gaV()},
v:{
x3:[function(a){return new F.kH("Dodging means moving your body out of harm's way. When done correctly, it will throw your opponent off balance and it will open an opportunity for a counter attack. When botched, it can get you killed.",!1,!1,!0,C.c,a,null)},"$1","u9",2,0,4]}},kI:{"^":"a:2;a,b",
$0:function(){return this.a.ai(this.b,"<subject> {can't|fail<s>|<does>n't succeed}",!0)}},kJ:{"^":"a:2;a,b,c",
$0:function(){return this.a.b.bR(this.c,"<subject> <is> too quick for <object>",!0,this.b)}},kK:{"^":"a:0;",
$1:function(a){a.sah(C.h)
return C.h}}}],["","",,M,{"^":"",kL:{"^":"z;J:c<,K:d<,a1:e<,O:f<,L:r<,b,a",
ga6:function(){return"dodge and counter"},
gh:function(){return"DodgeThrustSpear"},
gaf:function(){return"will <subject> dodge?"},
P:[function(a,b,c){a.a8(c,"<subject> tr<ies> to {dodge|sidestep}")
if(a.gar())a.ai(c,"<subject> <is> out of balance",!0)
else S.a7(new M.kM(a,c),new M.kN(this,a,c),null,null)
b.aA()
return H.b(a.dx)+" fails to dodge "+H.b(this.b.gh())+"'s spear"},"$3","gM",6,0,1],
R:[function(a,b,c){var z=this.b
a.bp(c,"<subject> {dodge<s>|sidestep<s>} it",z,!0)
if(z.ga4()){z.c5(c,"<subject> lose<s> balance because of that",!0,!0)
b.W(z.y,new M.kO())}b.aX("FightSituation")
if(a.gT()===!0)c.t(0,"this opens an opportunity for a counter attack")
C.a.t(b.f,S.c5(a,z))
return H.b(a.gh())+" dodges "+H.b(z.dx)+"'s spear"},"$3","gN",6,0,1],
I:function(a,b){var z,y
z=a.ga4()?0:0.2
if(a.cx===!0)return 0.7-z
y=b.f
return(y.length!==0?C.a.gw(y):null).gb5().b4(0.4-z)},
H:function(a,b){return!a.ga0()&&this.b.gS() instanceof Z.ak},
v:{
x4:[function(a){return new M.kL("Dodging means moving your body out of harm's way. When done correctly, it will throw your opponent off balance and it will open an opportunity for a counter attack. When botched, it can get you killed.",!1,!1,!0,C.c,a,null)},"$1","ua",2,0,4]}},kM:{"^":"a:2;a,b",
$0:function(){return this.a.ai(this.b,"<subject> {can't|fail<s>|<does>n't succeed}",!0)}},kN:{"^":"a:2;a,b,c",
$0:function(){return this.a.b.bR(this.c,"<subject> <is> too quick for <object>",!0,this.b)}},kO:{"^":"a:0;",
$1:function(a){a.sah(C.h)
return C.h}}}],["","",,O,{"^":"",mc:{"^":"z;J:c<,K:d<,a1:e<,O:f<,L:r<,b,a",
ga6:function(){return"jump back"},
gh:function(){return"JumpBackFromSlash"},
gaf:function(){return"will <subject> avoid the slash?"},
P:[function(a,b,c){a.aL(c,"<subject> {jump<s>|leap<s>} {back|backward} but <subject> <is> {not fast enough|too slow}.",!0)
b.aA()
return H.b(a.gh())+" fails to jump back from "+H.b(this.b.gh())},"$3","gM",6,0,1],
R:[function(a,b,c){var z
a.bi(c,"<subject> {leap<s>|jump<s>} {back|backwards|out of reach}",!0)
z=this.b
c.bX(0,"<owner's> <subject> {slash<es>|cut<s>} empty air",z,z.gS())
b.aX("FightSituation")
return H.b(a.gh())+" jumps back from "+H.b(z.gh())+"'s attack"},"$3","gN",6,0,1],
I:function(a,b){var z,y,x
if(a.gT()===!0)return 1
z=b.f
y=z.length!==0?C.a.gw(z):null
x=a.ga4()?0:0.2
return y.gb5().b4(0.5-x)},
H:function(a,b){return a.gaz()&&this.b.gS().gaV()},
v:{
xg:[function(a){return new O.mc("Jump back and the weapon can't reach you.",!1,!1,!0,C.c,a,null)},"$1","uZ",2,0,4]}}}],["","",,G,{"^":"",mZ:{"^":"z;J:c<,K:d<,a1:e<,O:f<,L:r<,b,a",
gh:function(){return"ParrySlash"},
ga6:function(){return"parry and counter"},
gaf:function(){return"will <subject> parry?"},
P:[function(a,b,c){a.a8(c,"<subject> tr<ies> to {parry|deflect it|meet it with "+H.b(U.aa(a))+"|fend it off}")
if(a.gar())a.ai(c,"<subject> <is> out of balance",!0)
else S.a7(new G.n_(a,c),new G.n0(this,a,c),null,null)
b.aA()
return H.b(a.dx)+" fails to parry "+H.b(this.b.gh())},"$3","gM",6,0,1],
R:[function(a,b,c){var z=this.b
if(z.gar()){c.eA(0,"<subject> <is> out of balance",!0,!0,z)
c.bX(0,"so <ownerPronoun's> <subject> is {weak|feeble}",z,$.$get$iL())
a.bi(c,"<subject> {parr<ies> it easily|easily meet<s> it with "+H.b(U.aa(a))+"|fend<s> it off easily}",!0)}else a.bi(c,"<subject> {parr<ies> it|meet<s> it with "+H.b(U.aa(a))+"|fend<s> it off}",!0)
b.aX("FightSituation")
if(a.gT()===!0)c.t(0,"this opens an opportunity for a counter attack")
C.a.t(b.f,S.c5(a,z))
return H.b(a.gh())+" parries "+H.b(z.dx)},"$3","gN",6,0,1],
I:function(a,b){var z,y,x
z=a.ga4()?0:0.2
y=this.b.gar()?0.3:0
if(a.cx===!0)return 0.6-z+y
x=b.f
return(x.length!==0?C.a.gw(x):null).gb5().b4(0.3-z+y)},
H:function(a,b){return a.gS().gcj()},
v:{
xl:[function(a){return new G.mZ("Parrying means deflecting your opponent's move with your weapon. When successful, it will give you an opportunity for a counter attack. It won't throw your opponent off balance like dodging does, but it's also slightly easier to do.",!1,!1,!0,C.c,a,null)},"$1","v7",2,0,4]}},n_:{"^":"a:2;a,b",
$0:function(){return this.a.ai(this.b,"<subject> {fail<s>|<does>n't succeed}",!0)}},n0:{"^":"a:2;a,b,c",
$0:function(){return this.a.b.bR(this.c,"<subject> <is> too quick for <object>",!0,this.b)}}}],["","",,E,{"^":"",ol:{"^":"z;J:c<,K:d<,a1:e<,O:f<,L:r<,b,a",
ga6:function(){return"block with shield and counter"},
gh:function(){return"ShieldBlockSlash"},
gaf:function(){return"will <subject> block the slash?"},
P:[function(a,b,c){a.a8(c,"<subject> tr<ies> to {block|stop|deflect} the {swing|attack|strike} with "+H.b(U.c_(a)))
if(a.gar())a.ai(c,"<subject> <is> out of balance",!0)
else S.a7(new E.om(a,c),new E.on(a,c),new E.oo(this,a,c),null)
b.aA()
return H.b(a.dx)+" fails to block "+H.b(this.b.gh())+" with shield"},"$3","gM",6,0,1],
R:[function(a,b,c){var z=this.b
if(z.gar()){c.eA(0,"<subject> <is> out of balance",!0,!0,z)
c.bX(0,"so <ownerPronoun's> <subject> is {weak|feeble}",z,$.$get$iK())
a.bi(c,"<subject> easily {block|stop|deflect} the {swing|attack|strike} with "+H.b(U.c_(a)),!0)}else a.bi(c,"<subject> {block|stop|deflect} the {swing|attack|strike} with "+H.b(U.c_(a)),!0)
b.aX("FightSituation")
if(a.gT()===!0)c.t(0,"this opens an opportunity for a counter attack")
C.a.t(b.f,S.c5(a,z))
return H.b(a.gh())+" blocks "+H.b(z.dx)+" with a shield"},"$3","gN",6,0,1],
I:function(a,b){var z,y,x
z=a.ga4()?0:0.2
y=this.b.gar()?0.2:0
if(a.cx===!0)return 0.8-z+y
x=b.f
return(x.length!==0?C.a.gw(x):null).gb5().b4(0.5-z+y)},
H:function(a,b){return a.gam()!=null},
v:{
xs:[function(a){return new E.ol("A shield blocks enemy attacks with the least amount of energy and movement. It is easy and quick to launch a counter-attack when the enemy's weapon is stopped in this way.",!1,!1,!0,C.c,a,null)},"$1","vm",2,0,4]}},om:{"^":"a:2;a,b",
$0:function(){return this.a.ai(this.b,"<subject> {fail<s>|<does>n't succeed}",!0)}},on:{"^":"a:2;a,b",
$0:function(){return this.a.ai(this.b,"<subject> <is> too slow",!0)}},oo:{"^":"a:2;a,b,c",
$0:function(){return this.a.b.bR(this.c,"<subject> <is> too quick for <object>",!0,this.b)}}}],["","",,L,{"^":"",
aP:function(a,b,c){var z=new L.e9(null,null,null,null,null,null)
new L.tA(a,b,c).$1(z)
return z.q()},
h_:{"^":"c7;",
gaG:function(){return[X.u5(),F.u9(),M.ua(),O.uZ(),G.v7(),E.vm()]},
gh:function(){return"SlashDefenseSituation"},
ay:function(){var z=new L.e9(null,null,null,null,null,null)
z.m(this)
new L.os().$1(z)
return z.q()}},
tA:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$a9().as(1073741823)
a.gaQ().c=z
a.gaQ().f=0
z=this.a.gi()
a.gaQ().b=z
z=this.b.gi()
a.gaQ().e=z
a.gaQ().d=this.c
return a}},
os:{"^":"a:0;",
$1:function(a){var z=a.gaQ().f
if(typeof z!=="number")return z.aj()
a.gaQ().f=z+1
return a}},
qb:{"^":"h_;cP:a<,i:b<,cr:c<,cu:d<,V:e<",
a2:function(a){var z=new L.e9(null,null,null,null,null,null)
z.m(this)
a.$1(z)
return z.q()},
A:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof L.h_))return!1
if(J.e(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
if(z==null?y==null:z===y)if(J.e(this.d,b.d)){z=this.e
y=b.e
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1}else z=!1}else z=!1
return z},
gD:function(a){return Y.U(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)))},
k:function(a){return"SlashDefenseSituation {attacker="+H.b(J.h(this.a))+",\nid="+J.h(this.b)+",\npredeterminedResult="+J.h(this.c)+",\ntarget="+H.b(J.h(this.d))+",\ntime="+J.h(this.e)+",\n}"}},
e9:{"^":"d;a,b,c,d,e,f",
gi:function(){return this.gaQ().c},
gV:function(){return this.gaQ().f},
gaQ:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.f=z.e
this.a=null}return this},
m:function(a){this.a=a},
q:function(){var z,y,x,w,v,u
z=this.a
if(z==null){y=this.gaQ().b
x=this.gaQ().c
w=this.gaQ().d
v=this.gaQ().e
u=this.gaQ().f
z=new L.qb(y,x,w,v,u)
if(y==null)H.i(P.l("attacker"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("predeterminedResult"))
if(v==null)H.i(P.l("target"))
if(u==null)H.i(P.l("time"))}this.m(z)
return z}}}],["","",,M,{"^":"",
bc:function(a,b){var z=new M.ea(null,null,null,null,null)
new M.tD(a,b).$1(z)
return z.q()},
h0:{"^":"ae;",
gaG:function(){return[O.uk(),V.um()]},
gh:function(){return"SlashSituation"},
ay:function(){var z=new M.ea(null,null,null,null,null)
z.m(this)
new M.ot().$1(z)
return z.q()},
b_:function(a,b){if(a===0)return b.B(this.a)
return},
b6:function(a,b){return new H.K(a,new M.ou(this),[H.m(a,0)])}},
tD:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a9().as(1073741823)
a.gbf().c=z
a.gbf().e=0
z=this.a.gi()
a.gbf().b=z
z=this.b.gi()
a.gbf().d=z
return a}},
ot:{"^":"a:0;",
$1:function(a){var z=a.gbf().e
if(typeof z!=="number")return z.aj()
a.gbf().e=z+1
return a}},
ou:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.e(a.gi(),z.a)||J.e(a.gi(),z.c)}},
qc:{"^":"h0;a,i:b<,c,V:d<",
a2:function(a){var z=new M.ea(null,null,null,null,null)
z.m(this)
a.$1(z)
return z.q()},
A:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof M.h0))return!1
if(J.e(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y)if(J.e(this.c,b.c)){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1}else z=!1
return z},
gD:function(a){return Y.U(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
k:function(a){return"SlashSituation {attacker="+H.b(J.h(this.a))+",\nid="+J.h(this.b)+",\ntarget="+H.b(J.h(this.c))+",\ntime="+J.h(this.d)+",\n}"}},
ea:{"^":"d;a,b,c,d,e",
gi:function(){return this.gbf().c},
gV:function(){return this.gbf().e},
gbf:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
m:function(a){this.a=a},
q:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gbf().b
x=this.gbf().c
w=this.gbf().d
v=this.gbf().e
z=new M.qc(y,x,w,v)
if(y==null)H.i(P.l("attacker"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("target"))
if(v==null)H.i(P.l("time"))}this.m(z)
return z}}}],["","",,Q,{"^":"",lA:{"^":"z;J:c<,K:d<,a1:e<,O:f<,L:r<,b,a",
gh:function(){return"FinishSlashGroundedEnemy"},
ga6:function(){return""},
gaf:function(){return"(WARNING should not be user-visible)"},
P:[function(a,b,c){throw H.c(new P.Y(null))},"$3","gM",6,0,1],
R:[function(a,b,c){var z,y,x
z=this.b
b.W(z.gi(),new Q.lB())
y=b.B(z.gi())
x=J.e(y.gi(),100)
c.ez(0,"<subject> {cut<s>|slash<es>|slit<s>} <object's> "+(x?"side":"{throat|neck|side}"),y,a.gS())
if(x)N.b4(c,y)
else N.bi(c,b,y)
return H.b(a.gh())+" slains "+H.b(z.gh())+" on the ground"},"$3","gN",6,0,1],
I:function(a,b){return 1},
H:function(a,b){return this.b.ga0()&&a.gS().gaV()},
v:{
x9:[function(a){return new Q.lA(null,!0,!0,!0,C.c,a,null)},"$1","ul",2,0,4]}},lB:{"^":"a:0;",
$1:function(a){a.sag(0)
return a}}}],["","",,V,{"^":"",lE:{"^":"z;J:c<,K:d<,a1:e<,O:f<,L:r<,b,a",
ga6:function(){return""},
gh:function(){return"FinishThrustSpearAtGroundedEnemy"},
gaf:function(){return"(WARNING should not be user-visible)"},
P:[function(a,b,c){throw H.c(new P.Y(null))},"$3","gM",6,0,1],
R:[function(a,b,c){var z,y,x
z=this.b
b.W(z.gi(),new V.lF())
y=b.B(z.gi())
x=J.e(y.gi(),100)
c.ez(0,"<subject> {impale<s>|bore<s> through|pierce<s>} <object's> "+(x?"side":"{throat|neck|heart}"),y,a.gS())
if(x)N.b4(c,y)
else N.bi(c,b,y)
return H.b(a.gh())+" slains "+H.b(z.gh())+" on the ground with a spear"},"$3","gN",6,0,1],
I:function(a,b){return 1},
H:function(a,b){return this.b.ga0()&&a.gS() instanceof Z.ak},
v:{
xb:[function(a){return new V.lE(null,!0,!0,!0,C.c,a,null)},"$1","un",2,0,4]}},lF:{"^":"a:0;",
$1:function(a){a.sag(0)
return a}}}],["","",,K,{"^":"",mP:{"^":"z;K:c<,a1:d<,O:e<,L:f<,J:r<,b,a",
gh:function(){return"OnGroundParry"},
ga6:function(){return"parry it"},
gaf:function(){return"will <subject> parry it?"},
P:[function(a,b,c){a.a8(c,"<subject> tr<ies> to {parry|deflect it|stop it{| with "+H.b(U.aa(a))+"}}")
S.a7(new K.mQ(a,c),new K.mR(this,a,c),null,null)
b.aA()
return H.b(a.gh())+" fails to parry "+H.b(this.b.gh())},"$3","gM",6,0,1],
R:[function(a,b,c){a.bi(c,"<subject> {parr<ies> it|stop<s> it with "+H.b(U.aa(a))+"}",!0)
b.aX("FightSituation")
return H.b(a.gh())+" parries "+H.b(this.b.gh())},"$3","gN",6,0,1],
I:function(a,b){var z
if(a.gT()===!0)return 0.6
z=b.f
return(z.length!==0?C.a.gw(z):null).gb5().b4(0.3)},
H:function(a,b){return this.b.gS().gaV()&&a.gS().gcj()},
v:{
xj:[function(a){return new K.mP(!1,!1,!0,C.c,"TODO",a,null)},"$1","v5",2,0,4]}},mQ:{"^":"a:2;a,b",
$0:function(){return this.a.ai(this.b,"<subject> {fail<s>|<does>n't succeed}",!0)}},mR:{"^":"a:2;a,b,c",
$0:function(){return this.a.b.bR(this.c,"<subject> <is> too quick for <object>",!0,this.b)}}}],["","",,L,{"^":"",mS:{"^":"z;J:c<,K:d<,a1:e<,O:f<,L:r<,b,a",
ga6:function(){return"block with shield"},
gh:function(){return"OnGroundShieldBlock"},
gaf:function(){return"will <subject> block the strike?"},
P:[function(a,b,c){a.a8(c,"<subject> tr<ies> to {block|stop|deflect} the {swing|attack|strike} with "+H.b(U.c_(a)))
S.a7(new L.mT(a,c),new L.mU(a,c),new L.mV(this,a,c),null)
b.aA()
return H.b(a.gh())+" fails to block "+H.b(this.b.gh())+" with shield on ground"},"$3","gM",6,0,1],
R:[function(a,b,c){var z=this.b
if(z.gar()){c.eA(0,"<subject> <is> out of balance",!0,!0,z)
c.bX(0,"so <ownerPronoun's> <subject> is {weak|feeble}",z,$.$get$iJ())
a.bi(c,"<subject> easily {block|stop|deflect} the {swing|attack|strike} with "+H.b(U.c_(a)),!0)}else a.bi(c,"<subject> {block|stop|deflect} the {swing|attack|strike} with "+H.b(U.c_(a)),!0)
b.aX("FightSituation")
return H.b(a.gh())+" blocks "+H.b(z.dx)+" with a shield on ground"},"$3","gN",6,0,1],
I:function(a,b){var z
if(a.gT()===!0)return 0.8
z=b.f
return(z.length!==0?C.a.gw(z):null).gb5().b4(0.5)},
H:function(a,b){return a.gam()!=null},
v:{
xk:[function(a){return new L.mS("A shield blocks enemy attacks with the least amount of energy and movement.",!1,!1,!0,C.c,a,null)},"$1","v6",2,0,4]}},mT:{"^":"a:2;a,b",
$0:function(){return this.a.ai(this.b,"<subject> {fail<s>|<does>n't succeed}",!0)}},mU:{"^":"a:2;a,b",
$0:function(){return this.a.ai(this.b,"<subject> <is> too slow",!0)}},mV:{"^":"a:2;a,b,c",
$0:function(){return this.a.b.bR(this.c,"<subject> <is> too quick for <object>",!0,this.b)}}}],["","",,Y,{"^":"",nG:{"^":"z;J:c<,K:d<,a1:e<,O:f<,L:r<,b,a",
gh:function(){return"RollOutOfWay"},
ga6:function(){return"roll out of way"},
gaf:function(){return"will <subject> evade?"},
P:[function(a,b,c){a.a8(c,"<subject> tr<ies> to roll out of the way")
a.ai(c,"<subject> can't",!0)
b.aA()
return H.b(a.gh())+" fails to roll out of the way"},"$3","gM",6,0,1],
R:[function(a,b,c){a.eW(c,"<subject> <is> able to roll out of the way",!0,!0)
if(a.gT()===!0){b.W(a.gi(),new Y.nH())
a.bi(c,"<subject> jump<s> up on <subject's> feet",!0)}b.aX("FightSituation")
return H.b(a.gh())+" rolls out of the way of "+H.b(this.b.gh())+"'s strike"},"$3","gN",6,0,1],
I:function(a,b){var z
if(a.gT()===!0)return 1
z=b.f
return(z.length!==0?C.a.gw(z):null).gb5().b4(0.5)},
H:function(a,b){return!0},
v:{
xr:[function(a){return new Y.nG(null,!1,!1,!0,C.c,a,null)},"$1","vf",2,0,4]}},nH:{"^":"a:0;",
$1:function(a){a.sah(C.k)
return a}}}],["","",,V,{"^":"",
bI:function(a,b,c){var z=new V.dU(null,null,null,null,null,null)
new V.ty(a,b,c).$1(z)
return z.q()},
fD:{"^":"c7;",
gaG:function(){return[K.v5(),L.v6(),Y.vf()]},
gh:function(){return"OnGroundDefenseSituation"},
ay:function(){var z=new V.dU(null,null,null,null,null,null)
z.m(this)
new V.mO().$1(z)
return z.q()}},
ty:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$a9().as(1073741823)
a.gaO().c=z
a.gaO().f=0
z=this.a.gi()
a.gaO().b=z
z=this.b.gi()
a.gaO().e=z
a.gaO().d=this.c
return a}},
mO:{"^":"a:0;",
$1:function(a){var z=a.gaO().f
if(typeof z!=="number")return z.aj()
a.gaO().f=z+1
return a}},
q6:{"^":"fD;cP:a<,i:b<,cr:c<,cu:d<,V:e<",
a2:function(a){var z=new V.dU(null,null,null,null,null,null)
z.m(this)
a.$1(z)
return z.q()},
A:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof V.fD))return!1
if(J.e(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
if(z==null?y==null:z===y)if(J.e(this.d,b.d)){z=this.e
y=b.e
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1}else z=!1}else z=!1
return z},
gD:function(a){return Y.U(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)))},
k:function(a){return"OnGroundDefenseSituation {attacker="+H.b(J.h(this.a))+",\nid="+J.h(this.b)+",\npredeterminedResult="+J.h(this.c)+",\ntarget="+H.b(J.h(this.d))+",\ntime="+J.h(this.e)+",\n}"}},
dU:{"^":"d;a,b,c,d,e,f",
gi:function(){return this.gaO().c},
gV:function(){return this.gaO().f},
gaO:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.f=z.e
this.a=null}return this},
m:function(a){this.a=a},
q:function(){var z,y,x,w,v,u
z=this.a
if(z==null){y=this.gaO().b
x=this.gaO().c
w=this.gaO().d
v=this.gaO().e
u=this.gaO().f
z=new V.q6(y,x,w,v,u)
if(y==null)H.i(P.l("attacker"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("predeterminedResult"))
if(v==null)H.i(P.l("target"))
if(u==null)H.i(P.l("time"))}this.m(z)
return z}}}],["","",,D,{"^":"",
d6:function(a,b){var z=new D.eb(null,null,null,null,null)
new D.tz(a,b).$1(z)
return z.q()},
hb:{"^":"ae;",
gaG:function(){return[Q.ul(),V.un()]},
gh:function(){return"StrikeDownSituation"},
ay:function(){var z=new D.eb(null,null,null,null,null)
z.m(this)
new D.pc().$1(z)
return z.q()},
b_:function(a,b){if(a===0)return b.B(this.a)
return},
b6:function(a,b){return new H.K(a,new D.pd(this),[H.m(a,0)])}},
tz:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a9().as(1073741823)
a.gbg().c=z
a.gbg().e=0
z=this.a.gi()
a.gbg().b=z
z=this.b.gi()
a.gbg().d=z
return a}},
pc:{"^":"a:0;",
$1:function(a){var z=a.gbg().e
if(typeof z!=="number")return z.aj()
a.gbg().e=z+1
return a}},
pd:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.e(a.gi(),z.a)||J.e(a.gi(),z.c)}},
qd:{"^":"hb;a,i:b<,c,V:d<",
a2:function(a){var z=new D.eb(null,null,null,null,null)
z.m(this)
a.$1(z)
return z.q()},
A:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof D.hb))return!1
if(J.e(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y)if(J.e(this.c,b.c)){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1}else z=!1
return z},
gD:function(a){return Y.U(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
k:function(a){return"StrikeDownSituation {attacker="+H.b(J.h(this.a))+",\nid="+J.h(this.b)+",\ntargetOnGround="+H.b(J.h(this.c))+",\ntime="+J.h(this.d)+",\n}"}},
eb:{"^":"d;a,b,c,d,e",
gi:function(){return this.gbg().c},
gV:function(){return this.gbg().e},
gbg:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
m:function(a){this.a=a},
q:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gbg().b
x=this.gbg().c
w=this.gbg().d
v=this.gbg().e
z=new D.qd(y,x,w,v)
if(y==null)H.i(P.l("attacker"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("targetOnGround"))
if(v==null)H.i(P.l("time"))}this.m(z)
return z}}}],["","",,O,{"^":"",ni:{"^":"d;",
gb5:function(){switch(this.gcr()){case C.l:return C.a4
case C.m:return $.$get$fH()
case C.p:return $.$get$fI()
default:throw H.c(P.G(this.gcr()))}},
$isae:1}}],["","",,K,{"^":"",e0:{"^":"d;a,b",
k:function(a){return this.b}}}],["","",,D,{"^":"",ox:{"^":"ag;K:b<,O:c<,a1:d<,L:e<,a",
gX:function(){return""},
gJ:function(){return},
gh:function(){return"SlayMonstersAction"},
P:[function(a,b,c){throw H.c(new P.Y(null))},"$3","gM",6,0,1],
R:[function(a,b,c){var z,y,x,w
z=b.f
y=z.length!==0?C.a.gw(z):null
x=b.dY(y.gbE())
w=b.a
C.a.t(z,x.jV(b,y,new H.K(w,new D.oy(a,x),[H.m(w,0)])))
return H.b(a.gh())+" initiated combat with monsters in "+x.k(0)},"$3","gN",6,0,1],
ab:function(a,b){return"WARNING should not be user-visible"},
I:function(a,b){return 1},
H:function(a,b){var z=b.f
return H.F(z.length!==0?C.a.gw(z):null,"$isJ").c}},oy:{"^":"a:0;a,b",
$1:function(a){return a.gaq()&&a.gaY().hf(this.a.gaY())&&J.e(a.gbE(),this.b.gh())}}}],["","",,Y,{"^":"",pn:{"^":"c9;K:c<,a1:d<,O:e<,L:f<,b,a",
gJ:function(){return},
gh:function(){return"TakeExitAction"},
P:[function(a,b,c){throw H.c(new P.Y(null))},"$3","gM",6,0,1],
R:[function(a,b,c){var z,y
z=this.b
c.t(0,z.gaT())
y=b.f
H.F(y.length!==0?C.a.gw(y):null,"$isJ").kD(b,a,z.gh1(),c)
return H.b(a.gh())+" went through exit to "+z.a},"$3","gN",6,0,1],
ab:function(a,b){return"WARNING should not be user-visible"},
I:function(a,b){return 1},
H:function(a,b){var z=b.f
if(H.F(z.length!==0?C.a.gw(z):null,"$isJ").c===!0)return!1
this.b.gkm()
return!0},
v:{
xw:[function(a){return new Y.pn(!1,!0,!1,null,a,null)},"$1","wO",2,0,50]}}}],["","",,F,{"^":"",
fS:function(a,b){var z=new F.e7(null,null,null,null,null)
new F.tp(a,b).$1(z)
return z.q()},
J:{"^":"ae;",
gaG:function(){return[Y.wO()]},
gbO:function(){var z=[]
C.a.ax(z,$.$get$i1())
z.push($.$get$h3())
return z},
gdJ:function(){return 1000},
gh:function(){return"RoomRoamingSituation"},
ay:function(){var z=new F.e7(null,null,null,null,null)
z.m(this)
new F.nI().$1(z)
return z.q()},
b_:function(a,b){return b.a.aU(0,new F.nJ(),new F.nK())},
b6:function(a,b){var z=this.b_(null,b)
if(z==null)return[]
return[z]},
cW:function(a,b,c){return a.hO("TakeExitAction",b,!0).bt(0,new F.nL(c))},
d_:function(a,b,c,d,e){var z,y,x,w,v,u,t
z=a.dY(c)
a.c4(this.b,F.fS(z,!this.cW(a,b,c)&&z.gjU()!=null))
if(!e)if(this.ip(a,b,z))z.i0(b,a,d)
else{d.n(0,"\n\n",!0)
z.jJ(b,a,d)
d.n(0,"\n\n",!0)}for(y=R.im(b,a),y=P.P(y,!0,H.y(y,"B",0)),x=y.length,w=a.a,v=0;v<y.length;y.length===x||(0,H.as)(y),++v){u=a.B(y[v].gi())
t=u.a2(new F.nM(z))
w.a3(0,u)
w.t(0,t)}},
kD:function(a,b,c,d){return this.d_(a,b,c,d,!1)},
hl:function(a,b){a.a.iI(new F.nN(),!0)},
dj:function(a){if(J.e(this.a,$.$get$ez().b))return!1
return!0},
ip:function(a,b,c){var z,y
for(z=a.d,z=new P.db(z,z.c,z.d,z.b,null,[H.m(z,0)]);z.u();){y=z.e
if(!J.e(y.gcs(),b.gi()))continue
if(y.gdB()!=="TakeExitAction")continue
if(J.ds(y.gaT(),c.gh())===!0)return!0}return!1}},
tp:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a9().as(1073741823)
a.gaF().c=z
a.gaF().e=0
z=this.a.gh()
a.gaF().b=z
a.gaF().d=this.b
return a}},
nI:{"^":"a:0;",
$1:function(a){var z=a.gaF().e
if(typeof z!=="number")return z.aj()
a.gaF().e=z+1
return a}},
nJ:{"^":"a:0;",
$1:function(a){return a.gT()===!0&&a.gaq()}},
nK:{"^":"a:2;",
$0:function(){return}},
nL:{"^":"a:0;a",
$1:function(a){return a.geI()===this.a}},
nM:{"^":"a:0;a",
$1:function(a){a.sbE(this.a.gh())
return a}},
nN:{"^":"a:0;",
$1:function(a){return!a.gaH()}},
qa:{"^":"J;bE:a<,i:b<,c,V:d<",
a2:function(a){var z=new F.e7(null,null,null,null,null)
z.m(this)
a.$1(z)
return z.q()},
A:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof F.J))return!1
if(J.e(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
if(z==null?y==null:z===y){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1}else z=!1
return z},
gD:function(a){return Y.U(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
k:function(a){return"RoomRoamingSituation {currentRoomName="+H.b(J.h(this.a))+",\nid="+J.h(this.b)+",\nmonstersAlive="+J.h(this.c)+",\ntime="+J.h(this.d)+",\n}"}},
e7:{"^":"d;a,b,c,d,e",
gbE:function(){return this.gaF().b},
sbE:function(a){this.gaF().b=a
return a},
gi:function(){return this.gaF().c},
skC:function(a){this.gaF().d=a
return a},
gV:function(){return this.gaF().e},
gaF:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
m:function(a){this.a=a},
q:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gaF().b
x=this.gaF().c
w=this.gaF().d
v=this.gaF().e
z=new F.qa(y,x,w,v)
if(y==null)H.i(P.l("currentRoomName"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("monstersAlive"))
if(v==null)H.i(P.l("time"))}this.m(z)
return z}}}],["","",,O,{"^":"",
uc:function(a,b){var z=a.B(1).gaC().cl(0,new O.ud())
a.W(a.B(1).gi(),new O.ue(z))
a.ak("RoomRoamingSituation").d_(a,a.B(1),"war_forge",b,!0)},
xL:[function(a,b,c){var z,y
z=R.b6(6666,"Agruth",null,null,null,null,null,0,2,100,!1,!1,2,!0,C.t,0,$.$get$bz())
y=z.y
a.gey().t(0,z)
return U.cb(c,[z],"{rock|cavern} floor",b,P.a0([1,new O.up(y),5,new O.uq(y),9,new O.ur(y),12,new O.us(y),17,new O.ut(y)]))},"$3","wT",6,0,12],
xM:[function(a,b,c){var z,y,x,w,v
z=O.hT(2)
y=O.et(!1)
x=new O.uD(z.y)
w=new O.uC(y.y)
v=[z,y]
a.gey().ax(0,v)
return U.cb(c,v,"{rock|cavern} floor",b,P.a0([1,new O.ux(x,w,new O.uw()),4,new O.uy(x,w),6,new O.uz(),9,new O.uA(),12,new O.uB()]))},"$3","wU",6,0,12],
xN:[function(a,b,c){var z,y,x
z=a.ap("talk_to_briana_3")?"guardian":"orc"
y=R.b6(6667,z,null,null,null,new G.aG("rusty sword",1,1,!1,!0,!1,P.aD(C.o,null)),null,0,3,100,!1,!1,3,!1,C.t,0,$.$get$bz())
x=y.y
a.a.t(0,y)
return U.cb(c,[y],"{rock|cavern} floor",b,P.a0([1,new O.uE(x),3,new O.uF(x),5,new O.uG(x)]))},"$3","wV",6,0,12],
xO:[function(a,b,c){var z,y,x,w,v
z=O.hT(2)
y=O.et(!0)
x=new O.uL(z.y)
w=new O.uK(y.y)
v=[z,y]
a.gey().ax(0,v)
return U.cb(c,v,"{rough|stone} floor",b,P.a0([1,new O.uI(x,w,new O.uH()),3,new O.uJ(x,w)]))},"$3","wW",6,0,12],
uO:function(a){return a.W(a.B(1).gi(),new O.uP())},
iq:function(a,b){a.W(a.B(1).gi(),new O.uQ(b))},
eE:function(a){var z=a.f
if(H.F(z.length!==0?C.a.gw(z):null,"$isJ").c===!0)return!1
return C.a.a7(C.a_,H.F(z.length!==0?C.a.gw(z):null,"$isJ").a)},
b3:function(a,b){var z,y,x
z=a.B(1)
for(y=a.d,y=new P.db(y,y.c,y.d,y.b,null,[H.m(y,0)]);y.u();){x=y.e
if(!J.e(x.gcs(),z.gi()))continue
if(x.gdB()!=="TakeExitAction")continue
if(x.geI()===b)return!0
return!1}return!1},
iw:function(a,b){var z,y,x,w,v,u,t,s,r
for(z=a.a,y=z.ga_(z),x=new H.bS(y,new O.v1(),[H.m(z,0)]);x.u();){w=y.gU()
if(!w.gaz()){v=H.F(w.e,"$isaG")
y=b
x=v.c
u=v.d
v.r
t=P.P(C.o,!1,null)
t.fixed$length=Array
t.immutable$list=Array
s=a.B(w.y)
r=s.a2(new O.v2(new G.aG(y,x,u,!0,!0,!1,t)))
z.a3(0,s)
z.t(0,r)
break}}},
cB:function(a,b){var z,y,x
z=H.F(a.c,"$iscQ").b
if(z>=5)return
b.n(0,C.a2[z],!0)
y=H.F(a.c,"$iscQ")
y.toString
x=new M.ee(null,!1,0,0)
x.m(y)
a.c=new O.ve().$1(x).q()},
eG:function(a,b,c,d){var z,y
b.W(a.gi(),new O.vj())
if(!d){z=b.a
y=O.et(!1)
z.t(0,y)
C.a.t(b.f,U.cb(new H.K(z,new O.vk(),[H.m(z,0)]),[y],"{smooth|} rock",b.ak("RoomRoamingSituation"),P.a0([1,new O.vl(y.y)])))}},
wK:function(a,b){a.W(b.gi(),new O.wL(b))},
et:function(a){var z,y
z=$.$get$ew().a++
y=a?new Z.ak("spear",0,1,!1,!1,!1,P.aD(C.D,null)):new G.aG("scimitar",1,1,!1,!0,!1,P.aD(C.o,null))
return R.b6(z,"goblin",O.dk(),null,null,y,null,0,1,0,!1,!1,1,!1,C.t,0,$.$get$bz())},
hT:function(a){return R.b6($.$get$ew().a++,"orc",O.dk(),null,null,new G.aG("sword",1,1,!1,!0,!1,P.aD(C.o,null)),null,0,a,0,!1,!1,a,!1,C.t,0,$.$get$bz())},
ud:{"^":"a:0;",
$1:function(a){return C.a.a7(a.gf3(),C.r)}},
ue:{"^":"a:0;a",
$1:function(a){a.gaC().a3(0,this.a)
return a}},
up:{"^":"a:6;a",
$2:function(a,b){var z,y,x
z=this.a
y=a.B(z)
x=new G.aG("sword",1,1,!1,!0,!1,P.aD(C.o,null))
y.a8(b,"<subject> {drop<s>|let<s> go of} the whip")
y.ac(b,"<subject> draw<s> <subject's> <object>",x)
a.W(z,new O.uo(x))
y.dN(b,'"You\'re dead, slave," <subject> growl<s> at <object> with hatred.',a.B(1),!0)}},
uo:{"^":"a:0;a",
$1:function(a){a.sS(this.a)
return a}},
uq:{"^":"a:6;a",
$2:function(a,b){a.B(this.a).a8(b,"<subject> spit<s> on the cavern floor")}},
ur:{"^":"a:6;a",
$2:function(a,b){var z=a.B(this.a)
b.eC()
z.aL(b,'"I\'ll enjoy eating your flesh, human," <subject> snarl<s>.',!0)
b.n(0,"\n\n",!0)}},
us:{"^":"a:6;a",
$2:function(a,b){var z=a.B(this.a)
z.a8(b,"<subject> grit<s> <subject's> teeth")
z.ai(b,"<subject> do<es>n't talk any more",!0)}},
ut:{"^":"a:6;a",
$2:function(a,b){a.B(this.a).a8(b,"<subject> scowl<s> with pure hatred")}},
uD:{"^":"a:10;a",
$1:function(a){return a.B(this.a)}},
uC:{"^":"a:10;a",
$1:function(a){return a.B(this.a)}},
uw:{"^":"a:25;",
$2:function(a,b){return a.gaq()&&b.gaq()}},
ux:{"^":"a:6;a,b,c",
$2:function(a,b){var z,y,x,w,v
z=this.a.$1(a)
y=this.b.$1(a)
x=a.B(1)
if(this.c.$2(z,y)===!0){w=z.gc3()===!0?y:z
v=J.e(w,z)?y:z
w.aL(b,'"Look, Sgarr," <subject> say<s>. "Look at them. Give a puny slave some steel and suddenly they think they\'re mighty slayers."',!0)
v.a8(b,"<subject> laugh<s>")
if(J.e(x.gS().gh(),$.$get$cA().b)){v.ai(b,"<subject> stop<s> almost instantly",!0)
v.dN(b,"<subject> see<s> <object> in your hand.",x.gS(),!0)}}else{w=z.gaq()?z:y
w.aL(b,'"Look at you," <subject> laugh<s>. "Give a puny slave some steel and suddenly you think you\'re mighty slayers."',!0)
if(J.e(x.gS().gh(),$.$get$cA().b))w.kV(b,"But then <subject> see<s> <object> in your hand and his face hardens.",!0,x.gS(),!0)}}},
uy:{"^":"a:6;a,b",
$2:function(a,b){var z,y,x,w,v,u,t,s,r,q,p
z=this.a.$1(a)
y=this.b.$1(a)
x=z.gaq()?z:y
w=a.B(1)
if(!x.gaz())v=w.gaz()&&w.d==null
else v=!0
u=v?"kicking":"slashing"
t=v?["Whoosh!","Swah!","Slam!"]:["Swish!","Whoosh!","Thunk!"]
x.bi(b,"<subject> start<s> wildly "+u+" in your direction",!0)
s=J.az(b)
s.n(b,'"Insignificant..." '+t[0]+' "... little ..." '+t[1]+' "... vermin!" '+t[2],!0)
if(v)r="chest"
else r=w.gam()!=null?"shield":w.gS().gh()
q="That last blow hits your "+H.b(r)+" hard"
s.n(b,q+(w.ga0()?"":" and sends you a couple of steps back")+".",!0)
q=H.p([],[P.q])
p=$.$get$aL()
s.bX(b,"<owner's> <subject> glint<s> with intensity",x,new Y.aC(!1,"eyes",q,p,!1,C.E))}},
uz:{"^":"a:6;",
$2:function(a,b){J.c2(b,"From behind, you hear loud cries. Your pursuers must have reached the top of the stairs.",!0)}},
uA:{"^":"a:6;",
$2:function(a,b){J.c2(b,"Ear-splitting shouts come from behind. You wheel around and see a body of orcs and goblins approaching at top speed, their swords and spears at the ready.",!0)}},
uB:{"^":"a:6;",
$2:function(a,b){J.c2(b,"Your pursuers reach you from behind and a sword pierces your chest with formidable power.",!0)
a.W(a.B(1).gi(),new O.uv())
a.aX("RoomRoamingSituation")
a.aA()}},
uv:{"^":"a:0;",
$1:function(a){a.sag(0)
return a}},
uE:{"^":"a:6;a",
$2:function(a,b){a.B(this.a).dN(b,'"Good good good," <subject> whisper<s>, eyeing <object>.',a.B(1),!0)}},
uF:{"^":"a:6;a",
$2:function(a,b){var z,y
z=a.B(this.a)
y=a.B(100)
b.eC()
z.aL(b,'"Pain is good," <subject> chuckle<s>.',!0)
b.n(0,"\n\n",!0)
if(y.gaq()){y.a8(b,"<subject> glare<s> at him")
y.aL(b,'"Shut up and die."',!0)
b.n(0,"\n\n",!0)}}},
uG:{"^":"a:6;a",
$2:function(a,b){var z,y
z=a.B(this.a)
y=a.B(1)
b.eC()
z.aL(b,'"You\'ll make a nice addition to my collection," <subject> say<s>, laughing.',!0)
z.a8(b,"<subject> nod<s> towards a heap of rotting bodies nearby")
b.n(0,"\n\n",!0)
y.aL(b,"<subject> glance<s> over at Briana, then back at the orc.",!0)
y.aL(b,'_"You had better shut up, and die."_',!0)
b.n(0,"\n\n",!0)}},
uL:{"^":"a:10;a",
$1:function(a){return a.B(this.a)}},
uK:{"^":"a:10;a",
$1:function(a){return a.B(this.a)}},
uH:{"^":"a:25;",
$2:function(a,b){return a.gaq()&&b.gaH()&&b.gc2()===!0}},
uI:{"^":"a:6;a,b,c",
$2:function(a,b){var z,y
z=this.a.$1(a)
y=this.b.$1(a)
if(!y.gaH()){z.ac(b,"<subject> look<s> at <object's> body",y)
z.aL(b,'"You\'ll pay for this, vermin," <subject> snarl<s>.',!0)
return}if(this.c.$2(z,y)===!0){z.ac(b,"<subject> look<s> at <object>",y)
z.dN(b,'"Now that is practice," <subject> say<s> to <objectPronoun>.',y,!0)}}},
uJ:{"^":"a:6;a,b",
$2:function(a,b){var z,y,x
z=this.a.$1(a)
y=this.b.$1(a)
x=z.gaq()?z:y
x.aL(b,'"You don\'t understand," <subject> growl<s>. "No matter how many of us you kill, there will be more. And when we get you, we will eat your face alive."',!0)
x.a8(b,"<subject> smirk<s>")
x.aL(b,'"You mean nothing."',!0)}},
uP:{"^":"a:0;",
$1:function(a){a.gaC().t(0,$.$get$eq())
return a}},
uQ:{"^":"a:0;a",
$1:function(a){var z=a.gb8()
if(typeof z!=="number")return z.aj()
a.sb8(z+this.a)
return a}},
v1:{"^":"a:0;",
$1:function(a){return J.e(a.gaY(),$.$get$dm())}},
v2:{"^":"a:0;a",
$1:function(a){a.sS(this.a)
return a}},
ve:{"^":"a:0;",
$1:function(a){var z
a.gcA()
z=a.c
a.gcA()
a.c=z+1
return a}},
vj:{"^":"a:0;",
$1:function(a){a.sam(new E.bq("shield",P.aD(C.a1,null)))
return a}},
vk:{"^":"a:0;",
$1:function(a){return J.e(a.gaY(),$.$get$dm())}},
vl:{"^":"a:6;a",
$2:function(a,b){var z,y
z=a.B(this.a)
y=a.B(1)
if(a.fQ("take_spear_in_underground_church")){z.eX(b,"<subject> look<s> at <object-owner's> <object>",$.$get$eq(),y)
z.aL(b,'"Thief," <subject> mutter<s>.',!0)}}},
wL:{"^":"a:0;a",
$1:function(a){var z=this.a
if(!z.gaz())a.gaC().t(0,z.e)
a.sS($.$get$cA())}}}],["","",,V,{"^":"",
lI:function(){var z=new V.dC(null,null,null)
new V.tL().$1(z)
return z.q()},
tn:{"^":"a:5;",
$3:function(a,b,c){c.n(0,"",!0)}},
to:{"^":"a:5;",
$3:function(a,b,c){c.n(0,"",!0)}},
tl:{"^":"a:5;",
$3:function(a,b,c){c.n(0,"The tunnel back to the main slave quarters is suicide. There will be too many orcs, and the Gate of Screams is a long way beyond, at the very base of Mount Bloodrock. That leaves two options: the black passage towards the war forges, and the deserted tunnel to the Unholy Church, an underground temple. Both these paths lead upwards and in the general direction of a small exit near the mountaintop \u2014 the Upper Door.\n",!0)}},
tm:{"^":"a:5;",
$3:function(a,b,c){c.n(0,"The corpse lies still, getting cold.\n\n\n",!0)
O.cB(b,c)
c.n(0,"",!0)}},
oi:{"^":"W;X:c<,h:d<,b,a",
H:function(a,b){var z=b.f
if(!J.e(H.F(z.length!==0?C.a.gw(z):null,"$isJ").a,"cave_with_agruth"))return!1
if(b.ap(this.d))return!1
return!0},
R:[function(a,b,c){c.n(0,"You search his pockets but turn up with nothing. Just then, you realize that if Agruth had something valuable on him, he would have hidden it well. You run your hand inside his vest and find a troma herb. This boosts your energy right when you need it--very handy. (Your stamina increases by 1.)\n",!0)
O.iq(b,1)
return H.b(a.gh())+" successfully performs SearchAgruth"},"$3","gN",6,0,1],
P:[function(a,b,c){throw H.c(new P.w("Success chance is 100%"))},"$3","gM",6,0,1],
I:function(a,b){return 1},
gO:function(){return!1},
ab:function(a,b){return"Will you be successful?"},
gL:function(){return},
gJ:function(){return"You have taken his weapon but there might be other useful items in his pocket."},
gK:function(){return!1}},
tj:{"^":"a:5;",
$3:function(a,b,c){c.n(0,'Only a few bends ahead, the tunnel get blindingly bright and the empty smell of mountain air fills your nose. After three years, you hear the howling wind. You run through a small stone portal and out of the mountain you thought would be your grave. \n\n\nYou have to close your eyes to keep the blinding sun out. You let the wind chill your muscles. \n\n\nBut merely two breaths later, you are again in motion, jumping down a sharply descending path. Outside, it\'s you and Briana who have the upper hand \u2014 the orcs and goblins groan and stumble. This is still their territory, but the bright sun and the lack of cave walls rubs against all their instincts. These are cave breeds.\n\n\nSoon, they stop following altogether, presumably leaving the two of you to their aboveground brothers. You don\'t dare to stop but you gradually slow down, and then lift your eyes from the treacherous terrain.\n\n\nAt first, you cannot make much sense of what you see \u2014 this is nothing like the country you left three years ago. You look at Briana but she doesn\'t seem surprised. You turn your eyes to the scenery again, to the black smoke of orc camps and razed villages, to the burned forests, to the cracks in the wall of the distant Fort Ironcast, just visible over the Glenview hill. \n\n\nNo birds, only some horrible dark eagle-like creatures with no head, circling in both directions above Mount Bloodrock.\n\n\n_"We must stop this."_\n\n\nBriana follows your gaze, then shakes her head. "This is much larger than us, Aren. We\'ve both seen what takes place in the mountain. Now you can see what has happend outside. This is a problem for kings, not peasants."\n\n\n_"No king has what we have."_\n\n\n',!0)
if(b.ap("take_orcthorn"))c.n(0,'"Orcthorn? Bah, you think they\'ll let you have it? A farm boy?" \n\n\n_"I\'m not a farm boy. And I don\'t mean Orcthorn, no. I have a connection. We both do."_\n',!0)
c.n(0,"\n",!0)
if(!b.ap("take_orcthorn"))c.n(0,"\"Let me guess. Muscles and a bit of brains? Don't be a fool, you're still a farm boy.\" \n\n\n_\"I'm not a farm boy. And I don't mean muscles or brains, no. I have a connection. We both do.\"_\n",!0)
c.n(0,'\n"A connection."\n\n\n_"With the Dead Prince. I dream his dreams. I think I have some of his power. He is more than people think. A lot more. You feel it, too \u2014 I am sure of it \u2014 but you have not been in the mountain for as long as I have. Most slaves are lucky to survive the first month. I survived three years."_\n\n\n"So the thing you have that kings don\'t is\u2026 a way to communicate? Negotiate?"\n\n\n_"I do not have anything the Dead Prince wants. No, I do not think any mortal man does. But I think I am starting to understand what that is, and how the Dead Prince wants to seize it."_\n\n\n"And your plan is?"\n\n\n[IMG long view of the road ahead]\n\n\n_"Not letting him have it. Giving him the exact opposite of what he wants."_\n\n\n"You know we could just run as fast as we can, slaying some orcs along the way, and getting as far away from this place as possible, right?"\n\n\n_"Yes."_\n\n\n"That others would do exactly that."\n\n\n_"But we will not."_\n\n\n"No. We will not."\n\n\nWith that, you both start down the road towards the black fort in the distance.\n',!0)}},
tk:{"^":"a:5;",
$3:function(a,b,c){c.n(0,"",!0)}},
th:{"^":"a:5;",
$3:function(a,b,c){c.n(0,"The crevice is small.\n",!0)}},
ti:{"^":"a:5;",
$3:function(a,b,c){c.n(0,"",!0)}},
te:{"^":"a:5;",
$3:function(a,b,c){c.n(0,"You enter a small, circular room. There are exits on three sides, all marked with crude writing.\n\n\n",!0)
if(O.b3(b,"smelter"))c.n(0,'The passage you came from is marked with the words "Hot iron", which must mean "smelter" in the orcs\' vocabulary. Another one has the words "Unholy Church" above it. Both of these slope downwards.',!0)
c.n(0,"\n",!0)
if(O.b3(b,"underground_church"))c.n(0,'The passage you came from is marked with the words "Unholy Church". Another one has the words "Hot iron" above it, which must mean "smelter" in the orcs\' vocabulary. Both of these slope downwards.',!0)
c.n(0,"\nA third passage is marked \"Up Door\", and a few paces beyond the opening, it turns into a steep stairway upwards. This is it, if you're ready for it. Your final path to escape, an end to those three horrible years.\n\n\nLeaning on the wall next to the third exit is a goblin guard. He's sleeping. He holds a sword in one hand, and there's a shield laid on his lap.\n\n\n",!0)
if(!b.ap("smelter_throw_spear")&&!b.ap("take_orcthorn"))c.n(0,'For the first time, you see a smile on Briana\'s face. Not a smirk or an angry taunt of a laugh, but a genuine smile. "_Up Door?_" she whispers, shaking hear head. "I can\'t believe we have made it this far. Although \u2014 I\'ll admit \u2014 it feels like we could have taken more from them." She motions at the goblin, then extends her gesture to the rest of the mountain. "Wreak more havoc. Take more. I mean, we might be the first people to be in Mount Bloodrock, and live." \n\n\n_"Let us keep that second part true, then."_\n ',!0)
c.n(0,"",!0)}},
tf:{"^":"a:5;",
$3:function(a,b,c){c.n(0,"",!0)
if(b.ap("guardpost_above_church_take_shield")&&!b.fQ("guardpost_above_church_take_shield"))c.t(0,"The goblin's corpse is sprawled on the ground.")
else c.t(0,"The goblin is sleeping soundly.")
c.n(0,"",!0)}},
lH:{"^":"W;X:c<,h:d<,b,a",
H:function(a,b){var z=b.f
if(!J.e(H.F(z.length!==0?C.a.gw(z):null,"$isJ").a,"guardpost_above_church"))return!1
if(b.dQ(this.d)!=null)return!1
return!0},
R:[function(a,b,c){c.n(0,"You silently approach the goblin's legs, wait a few moments, then lean over him and deftly lift the shield. The goblin sniffs, moves, but stays asleep.\n\n\nYou take a few slow steps back, then fix the shield on your offhand.\n",!0)
O.eG(a,b,c,!0)
return H.b(a.gh())+" successfully performs GuardpostAboveChurchTakeShield"},"$3","gN",6,0,1],
P:[function(a,b,c){c.n(0,"You silently approach the goblin's legs, and wait a few moments. You're trying to stay as far away from his nose as possible. The goblin sniffs, moves, but stays asleep. You shift your weight on the right leg, leaning over the goblin and using the other leg as a counterweigh. Briana watches you with amusement.\n\n\nYou touch the shield to lift it, but freeze. The goblin sniffs again, and shifts. If you move, he'll wake up.\n",!0)
C.a.t(b.f,V.lI())
return H.b(a.gh())+" fails to perform GuardpostAboveChurchTakeShield"},"$3","gM",6,0,1],
I:function(a,b){return 0.3},
gO:function(){return!1},
ab:function(a,b){return"Will you be successful?"},
gL:function(){return},
gJ:function(){return"The goblin is asleep but not soundly \u2014 the floor here must be cold and uncomfortable. Taking the shield from its position on the goblin's lap will quite likely wake him up."},
gK:function(){return!1}},
fc:{"^":"ae;",
gbO:function(){return[new A.fY(new V.lK(),new V.lL(),"Stay perfectly still","If you stop moving, the guard will go back to sleep. But in this position, staying perfectly still even for a single minute will be quite a feat. (It will cost you 1 stamina.)","guardpost_above_church_take_shield_rescue",!0,null),new A.fY(new V.lM(),null,"Snatch the shield","You can quickly snatch the shield, jump back and prepare for a fight.","guardpost_above_church_take_shield_continuation_of_failure",!0,null)]},
gh:function(){return"guardpost_above_church_take_shield"},
ay:function(){var z=new V.dC(null,null,null)
z.m(this)
new V.lN().$1(z)
return z.q()},
b_:function(a,b){if(a!==0)return
return b.a.bI(0,new V.lO())},
b6:function(a,b){return[a.bI(0,new V.lP())]}},
tL:{"^":"a:0;",
$1:function(a){var z=$.$get$a9().as(1073741823)
a.gbN().b=z
a.gbN().c=0
return a}},
lK:{"^":"a:26;",
$4:function(a,b,c,d){J.c2(c,"You stay frozen in place. After a while, the strain of holding the awkward position start to show. Your left leg is shaking, and a drop of sweat is forming on your nose, threatening to fall on the goblin's leg.\n\n\nFortunately, at about that moment the goblin shifts again and his expression gets visibly more relaxed. His breath is deep and regular again.\n\n\nYou deftly lift the shield, take a few slow steps back, then fix the shield on your offhand.",!0)
b.aA()
b.W(a.gi(),new V.lJ())
O.eG(a,b,c,!0)
return"GuardpostAboveChurchTakeShieldRescueSituation resolved with rescue/continuation (Stay perfectly still)"}},
lJ:{"^":"a:0;",
$1:function(a){var z=a.gb8()
if(typeof z!=="number")return z.at()
a.sb8(z-1)
return a}},
lL:{"^":"a:3;",
$3:function(a,b,c){var z=a.gb8()
if(typeof z!=="number")return z.bk()
return z>0}},
lM:{"^":"a:26;",
$4:function(a,b,c,d){J.c2(c,"You snatch the shield and jump back next to Briana. The goblin wakes up instantly and gets his bearing suprisingly fast. He jumps up and gets into combat stance.\n\n\n\n\nYou hold the shield on your offhand and get ready to fight.",!0)
b.aA()
O.eG(a,b,c,!1)
return"GuardpostAboveChurchTakeShieldRescueSituation resolved with rescue/continuation (Snatch the shield)"}},
lN:{"^":"a:0;",
$1:function(a){var z=a.gbN().c
if(typeof z!=="number")return z.aj()
a.gbN().c=z+1
return a}},
lO:{"^":"a:0;",
$1:function(a){return a.gT()}},
lP:{"^":"a:0;",
$1:function(a){return a.gT()}},
tc:{"^":"a:5;",
$3:function(a,b,c){c.n(0,'You are Aren, a slave. You have spent three painful years inside this mountain, between the foul-smelling cave walls, and under the whip of the orcs and the goblins that live here. \n\n\nYou watch Briana straighten over Agruth\'s corpse. She smooths her hair, using a pool of Agruth\'s blood as a mirror. \n\n\n"What?" she says when she notices you\'re looking.\n\n\n_"We either go now, or die."_\n\n\nBriana spits down at the body. "He wasn\'t even the worst of them, you know."\n\n\n_"I know."_\n\n\n"They _all_ deserve this, or worse, and I like the fact we\'ll kill them by their own swords." She kicks the dead slaver in the hip. \n\n\n_"That one is already dead."_\n\n\n"I was making sure," she says, and turns her attention to the sword. "We should name it. Gods love named swords. And I refuse to carry it around referring to it as _Agruth\'s_." She makes a pained grimace when she says the orc\'s name.\n',!0)}},
td:{"^":"a:5;",
$3:function(a,b,c){c.n(0,"",!0)}},
mD:{"^":"W;X:c<,h:d<,b,a",
H:function(a,b){var z=b.f
if(!J.e(H.F(z.length!==0?C.a.gw(z):null,"$isJ").a,"just_after_agruth_fight"))return!1
return!0},
R:[function(a,b,c){c.n(0,'_"We will call it Luck Bringer. We got lucky, and luck is our only chance to get out of this place."_\n\n\nBriana nods. "Luck Bringer it is. Now, you\'re right, let\'s just get out of here as quickly as possible."\n',!0)
O.iw(b,"Luck Bringer")
b.ak("RoomRoamingSituation").d_(b,b.B(1),"cave_with_agruth_pre",c,!1)
return H.b(a.gh())+" successfully performs NameAgruthSwordOpportunity"},"$3","gN",6,0,1],
P:[function(a,b,c){throw H.c(new P.w("Success chance is 100%"))},"$3","gM",6,0,1],
I:function(a,b){return 1},
gO:function(){return!1},
ab:function(a,b){return"Will you be successful?"},
gL:function(){return},
gJ:function(){return""},
gK:function(){return!1}},
mE:{"^":"W;X:c<,h:d<,b,a",
H:function(a,b){var z=b.f
if(!J.e(H.F(z.length!==0?C.a.gw(z):null,"$isJ").a,"just_after_agruth_fight"))return!1
return!0},
R:[function(a,b,c){c.n(0,'_"We will call it Savior. It was our first step to freedom. The sword should have killed us and instead it set us free."_\n\n\nBriana nods. "Savior it is. Now, you\'re right, let\'s just get out of here as quickly as possible."\n',!0)
O.iw(b,"Savior")
b.ak("RoomRoamingSituation").d_(b,b.B(1),"cave_with_agruth_pre",c,!1)
return H.b(a.gh())+" successfully performs NameAgruthSwordRedemption"},"$3","gN",6,0,1],
P:[function(a,b,c){throw H.c(new P.w("Success chance is 100%"))},"$3","gM",6,0,1],
I:function(a,b){return 1},
gO:function(){return!1},
ab:function(a,b){return"Will you be successful?"},
gL:function(){return},
gJ:function(){return""},
gK:function(){return!1}},
mC:{"^":"W;X:c<,h:d<,b,a",
H:function(a,b){var z=b.f
if(!J.e(H.F(z.length!==0?C.a.gw(z):null,"$isJ").a,"just_after_agruth_fight"))return!1
return!0},
R:[function(a,b,c){c.n(0,"_\"That is foolish. It is just a sword, after all.\"_\n\n\nBriana shrugs. \"Whatever, just don't ever call it _Agruth's._ I already have more respect to this piece of iron than to that worthless animal. Now, you're right, let's just get out of here as quickly as possible.\"\n",!0)
b.ak("RoomRoamingSituation").d_(b,b.B(1),"cave_with_agruth_pre",c,!1)
return H.b(a.gh())+" successfully performs NameAgruthSwordNothing"},"$3","gN",6,0,1],
P:[function(a,b,c){throw H.c(new P.w("Success chance is 100%"))},"$3","gM",6,0,1],
I:function(a,b){return 1},
gO:function(){return!1},
ab:function(a,b){return"Will you be successful?"},
gL:function(){return},
gJ:function(){return""},
gK:function(){return!1}},
ta:{"^":"a:5;",
$3:function(a,b,c){c.n(0,'Violent grunts and growls are coming through that door. Next to it, an orcish writing on the wall says "Danger mad. Give food go away."\n',!0)}},
tb:{"^":"a:5;",
$3:function(a,b,c){c.n(0,"TODO\n",!0)}},
t8:{"^":"a:5;",
$3:function(a,b,c){c.n(0,"The room is dark and wet. As you enter, the noises end. Smell of rotting flesh fills your nostrils and almost makes you vomit.\n\n\nWhen your eyes become accustomed to the dark, you see a figure standing in front of you, and next to a heap of dead bodies. You realize it's a male orc, but an especially large one, with huge muscles and many scars. His face is in constant motion, overwhelmed by tics and waves of hateful expressions.\n",!0)}},
t9:{"^":"a:5;",
$3:function(a,b,c){c.n(0,"The room is quiet. The mad guardian's huge body lies on the floor beneath the statue.\n",!0)}},
po:{"^":"W;X:c<,h:d<,b,a",
H:function(a,b){var z=b.f
if(!J.e(H.F(z.length!==0?C.a.gw(z):null,"$isJ").a,"orcthorn_room"))return!1
if(b.ap("talk_to_briana_3"))if(!b.ap(this.d))z=H.F(z.length!==0?C.a.gw(z):null,"$isJ").c!==!0
else z=!1
else z=!1
if(!z)return!1
return!0},
R:[function(a,b,c){c.n(0,'You and Briana nod at each other and start sweeping the room. The mad guardian has left many bizarre things scattered around the space. A box of severed orc hands. Crude drawings of tentacles covering one of the walls, with several gouged out eyes below it. A circle made from half-eaten rats, with a single pebble in the middle.\n\n\n"None of this makes any sense," Briana says, turning some useless apparatus made of sticks in hand. "He must _really_ have gone mad. From fear, or magic, or both."\n\n\nSoon, the last place in the room that hasn\'t been searched by either you or Briana is the large pile of rotting corpses. Mostly orcs, but there are also some human slaves, and many rats and bats. The reek of rotten flesh raises above it in visible, pale fumes. Briana hides her nose in an elbow and starts dragging out the upper, less rotten corpses. You join her.\n\n\n"The sword will be at the bottom, I bet."\n\n\n_"Of course. He tried to bury it."_\n\n\nIn what seems like hours of work, you get to the bottom. Among a slush of decayed meat, you feel something hard and cold. Pulling it uncovers a sword.\n\n\nYou fling the weapon and the green-red rot falls to the ground easily, as if it had no traction on the steel. You hold in your hand the brightest, sharpest sword you have ever seen.\n\n\n[IMG orcthorn]\n\n\n"Orcthorn," Briana nods and surveys the blade and the hilt. Gradually, she starts shaking her head. "Why would they keep the sword at all? Why wouldn\'t they destroy it? They were terrified of it."\n\n\n_"Fear. It is the ultimate authority. I do not think it was the orcs who decided to keep the sword."_\n\n\n"Well, now they can start fearing again." Briana crouches next to the corpse of the mad guardian. "And all this because of a common soldier and a farm boy," she says to the lifeless face.\n\n\n_"I am not a farm boy. And we still need to get out of here first."_\n',!0)
O.wK(b,a)
return H.b(a.gh())+" successfully performs TakeOrcthorn"},"$3","gN",6,0,1],
P:[function(a,b,c){throw H.c(new P.w("Success chance is 100%"))},"$3","gM",6,0,1],
I:function(a,b){return 1},
gO:function(){return!1},
ab:function(a,b){return"Will you be successful?"},
gL:function(){return},
gJ:function(){return""},
gK:function(){return!1}},
t6:{"^":"a:5;",
$3:function(a,b,c){c.n(0,"TODO\n",!0)}},
t7:{"^":"a:5;",
$3:function(a,b,c){c.n(0,"TODO\n",!0)}},
ov:{"^":"W;X:c<,h:d<,b,a",
H:function(a,b){var z=b.f
if(!J.e(H.F(z.length!==0?C.a.gw(z):null,"$isJ").a,"slave_quarters"))return!1
return!0},
R:[function(a,b,c){c.n(0,"TODO FIGHT\n",!0)
b.aA()
return H.b(a.gh())+" successfully performs SlaveQuartersContinue"},"$3","gN",6,0,1],
P:[function(a,b,c){throw H.c(new P.w("Success chance is 100%"))},"$3","gM",6,0,1],
I:function(a,b){return 1},
gO:function(){return!1},
ab:function(a,b){return"Will you be successful?"},
gL:function(){return},
gJ:function(){return""},
gK:function(){return!1}},
t3:{"^":"a:5;",
$3:function(a,b,c){c.n(0,"You can see Briana clutching her fists. \"Are we homesick already?\" she says. But she doesn't wait for reply, and presses on.\n\n\nIt doesn't take long before you start hearing voices. Orcs and goblins shouting commands, mostly. Then human screams.\n\n\nThe tunnel gets wider and better lit by torches. The walls are smoother. You stop down next to a small, reinforced door. Up ahead, something is happening. A human slave is running towards you. His hand is visibly broken just above the elbow and blood is streaming down his limping left leg. His lips are moving but there is no sound anymore, only pain. Eyes in tears, he doesn't see you or anything else.\n\n\nBefore you can so much as call to him, something long and sharp shoots from behind the slave, and into his back. A bloodied spearhead appears in the center of the man's chest, as if growing from there. The tearful eyes go down, looking at the fatal wound. Two more steps and the slave falls face down, the shaft of the spear protruding upwards from his back.\n\n\nAn orc and a goblin appear from the tunnel, walking towards the dead man. The orc is laughing, patting his companion on the back. \"Vicious throw, small one!\" he roars.\n\n\nYou step back and motion Briana to lean on the wall, hoping that the door's embossed frame will provide enough cover before the two slavers turn again. \n\n\nBut at that time, something or someone smashes on that very door from the inside. Then come angry growls and something akin to barking and howling.\n\n\nThe door stays shut but the two slavers are now looking directly at you. The goblin yanks his spear from the corpse, and the orc unsheathes his sword. They start towards you.\n\n\n[IMAGE goblin spearman + orc]\n",!0)}},
t4:{"^":"a:5;",
$3:function(a,b,c){c.n(0,"",!0)
if(b.ak("RoomRoamingSituation").cW(b,b.B(1),"orcthorn_room")&&!O.b3(b,"orcthorn_room"))c.n(0,"The small door on the side of the corridor is open.",!0)
c.n(0,"\n",!0)
if(!b.ak("RoomRoamingSituation").cW(b,b.B(1),"orcthorn_room"))c.n(0,"The small door on the side of the corridor is closed.",!0)
c.n(0,"\n",!0)
O.cB(b,c)
c.n(0,"",!0)}},
ow:{"^":"W;X:c<,h:d<,b,a",
H:function(a,b){var z=b.f
if(!J.e(H.F(z.length!==0?C.a.gw(z):null,"$isJ").a,"slave_quarters_passage"))return!1
if(!b.ap(this.d))z=H.F(z.length!==0?C.a.gw(z):null,"$isJ").c!==!0&&!b.ak("RoomRoamingSituation").cW(b,b.B(1),"orcthorn_room")
else z=!1
if(!z)return!1
return!0},
R:[function(a,b,c){c.n(0,'Violent grunts and growls are coming through that door. Next to it, an orcish writing on the wall says "Danger mad. Give food go away."\n',!0)
return H.b(a.gh())+" successfully performs SlaveQuartersPassageExamineDoor"},"$3","gN",6,0,1],
P:[function(a,b,c){throw H.c(new P.w("Success chance is 100%"))},"$3","gM",6,0,1],
I:function(a,b){return 1},
gO:function(){return!1},
ab:function(a,b){return"Will you be successful?"},
gL:function(){return},
gJ:function(){return""},
gK:function(){return!1}},
t1:{"^":"a:5;",
$3:function(a,b,c){c.n(0,"A blast of smoke and heat greets you as you walk out of the passage and into the room. The roaring fire draws your attention to the far wall, where scores of orcs shovel coal into a giant furnace and tilt huge kettles of molten steel into white-hot rivers. This is the smelter.\n\n\n",!0)
if(O.b3(b,"war_forge"))c.n(0,"You see a smooth passage leading out of the smelter and sloping upwards. You'll be able to go there unnoticed.",!0)
c.n(0,"",!0)
if(O.b3(b,"guardpost_above_church"))c.n(0,"Not far from here there is a short tunnel, sloping down. It leads into the same room where the molten steel goes \u2014 the war forges. You'll be able to go there unnoticed.",!0)
c.n(0,"",!0)}},
t2:{"^":"a:5;",
$3:function(a,b,c){c.n(0,"The reds and whites of the molten steel reflect in the heaps of coal.\n\n\n",!0)
O.cB(b,c)
c.n(0,"",!0)}},
oz:{"^":"W;X:c<,h:d<,b,a",
H:function(a,b){var z=b.f
if(!J.e(H.F(z.length!==0?C.a.gw(z):null,"$isJ").a,"smelter"))return!1
if(b.ap(this.d))return!1
return!0},
R:[function(a,b,c){c.n(0,"The artificial rivers lead the molten iron across the room, into a large pool. From that pool, a single ogre is distributing the forge-ready liquid into troughs that descend to the war forges below. \n\n\nThe ogre is no more than a spear's throw away from you. But he doesn't notice. In fact, you realize he's blind, probably from all the molten steel around him. Yet he's performing his job without fault, listening to commands from orcs in the war forges beyond the wall, and operating the  floodgates accordingly.\n",!0)
return H.b(a.gh())+" successfully performs SmelterLookAround"},"$3","gN",6,0,1],
P:[function(a,b,c){throw H.c(new P.w("Success chance is 100%"))},"$3","gM",6,0,1],
I:function(a,b){return 1},
gO:function(){return!1},
ab:function(a,b){return"Will you be successful?"},
gL:function(){return},
gJ:function(){return""},
gK:function(){return!1}},
oA:{"^":"W;X:c<,h:d<,b,a",
H:function(a,b){var z=b.f
if(!J.e(H.F(z.length!==0?C.a.gw(z):null,"$isJ").a,"smelter"))return!1
if(!(!b.ap(this.d)&&b.ap("war_forge_watch_workers")&&b.ap("smelter_look_around")&&b.B(1).hb(C.r)))return!1
return!0},
R:[function(a,b,c){c.n(0,'It is a long distance to the blind ogre, but you can\'t come any closer \u2014 there is the pool of molten steel between you and him, and going around it would surely make the orcs aware of your presence. You wait for the ogre to get an order from bellow and watch him open one of the gates. The molten steel starts flowing.\n\n\nYou move just a few steps closer to the ogre and withdraw the spear. \n\n\nBriana gives you a puzzled look. "Wait\u2026" she whispers.\n\n\nYou throw.\n\n\nThe spear sails over the molten steel and rams into the blind ogre\'s shoulder. Your heart skips a beat. It\'s not a killing throw. The ogre will scream, the orcs will hear it \u2014 you\'re dead. But then, the gods show mercy. The ogre wheels around, trying to reach the spear with his left hand. He gets away from the gate and tries to correct it by stepping back.\n\n\nThe last step takes him over the edge and into the pool of white-hot steel. He doesn\'t even have a chance to scream \u2014 the liquid swallows him. The orcs on the other side of the room don\'t notice.\n\n\n"Why would you do that?" Briana says with her hands thrown in the direction of the throw. "You wasted a perfectly good spear on a stupid ogre that posed no threat to us."\n\n\n_"Listen."_\n\n\nAt this point, the distant voices coming from the war forges get slightly louder. Then again. In the clamor and noise of the two rooms, the small increase in volume is almost imperceptible but Briana hears it. She looks at you and a smile starts to form on her lips. "Let\'s go," she says.\n\n\nYou pass the short passage and crouch at the walkway above the war forges. There is chaos below. Most orcs and ogres have stopped working and watch molten steel overflowing the troughs and raining down on the forges. A large part of the iron monster is obliterated and the orcs working there are either dead or running away. \n\n\nSoon, you see an orc using a rope ladder to scale the wall to the smelter. He\'ll be able to get to the gate and close it but it will take him some time to make the climb. And the damage has already been done.\n\n\n"That, my friend, was the most boring heroic deed in history." Briana seems amused, watching the havoc below. "You just threw a spear\u2026"\n\n\n_"A well placed throw."_\n\n\n"... and killed a _blind_ ogre \u2026"\n\n\n_"An important one."_\n\n\n"... a _dam_ worker. Who happened to trip and fall into molten steel."\n\n\n_"As I said, a well placed throw. The less simple you see the world, the easier it is for you to change it."_\n\n\n"Nonsense. You got lucky."\n',!0)
O.uc(b,c)
return H.b(a.gh())+" successfully performs SmelterThrowSpear"},"$3","gN",6,0,1],
P:[function(a,b,c){throw H.c(new P.w("Success chance is 100%"))},"$3","gM",6,0,1],
I:function(a,b){return 1},
gO:function(){return!1},
ab:function(a,b){return"Will you be successful?"},
gL:function(){return},
gJ:function(){return""},
gK:function(){return!1}},
t_:{"^":"a:5;",
$3:function(a,b,c){c.n(0,"The path from slavery to power begins with a single crack of a whip. Briana wheels around, her face red with pain and anger. She is new here, but she knows what will follow. \n\n\n\n\nOnce Agruth starts whipping, the victim ends up dead. Agruth loves killing slaves. \n\n\n\n\nAnother crack and there is new blood on Briana's face. Agruth grins.\n\n\n\n\nNobody else is in sight. It's just you, Agruth and Briana. That's Agruth's main mistake.\n",!0)}},
t0:{"^":"a:5;",
$3:function(a,b,c){c.n(0,"",!0)}},
pq:{"^":"W;X:c<,h:d<,b,a",
H:function(a,b){if(!(b.dQ(this.d)==null&&O.eE(b)))return!1
return!0},
R:[function(a,b,c){c.n(0,'_"You were caught not too long ago, I think. What can you tell me about outside?"_\n\n\n\n\nBriana shrugs. "How long have you been here?"\n\n\n\n\n_"Three years."_\n\n\n\n\n"Three years! Gods. A lot has happened in the last winter alone. The orcs have taken the upper valley, and make raids way beyond Fort Ironcast."\n',!0)
return H.b(a.gh())+" successfully performs TalkToBriana1"},"$3","gN",6,0,1],
P:[function(a,b,c){throw H.c(new P.w("Success chance is 100%"))},"$3","gM",6,0,1],
I:function(a,b){return 1},
gO:function(){return!1},
ab:function(a,b){return"Will you be successful?"},
gL:function(){return},
gJ:function(){return""},
gK:function(){return!1}},
pr:{"^":"W;X:c<,h:d<,b,a",
H:function(a,b){if(!(b.ap("talk_to_briana_1")&&b.dQ(this.d)==null&&O.eE(b)))return!1
return!0},
R:[function(a,b,c){c.n(0,'_"Where did they get you?"_\n\n\n\n\n"At the Gate of Screams. I was trying to sneak in."\n\n\n\n\n_"You what?"_\n\n\n\n\n"I know. It seemed like a stupid idea even then. I wanted to get in, steal back the Orcthorn, get out, help the fight."\n',!0)
return H.b(a.gh())+" successfully performs TalkToBriana2"},"$3","gN",6,0,1],
P:[function(a,b,c){throw H.c(new P.w("Success chance is 100%"))},"$3","gM",6,0,1],
I:function(a,b){return 1},
gO:function(){return!1},
ab:function(a,b){return"Will you be successful?"},
gL:function(){return},
gJ:function(){return""},
gK:function(){return!1}},
ps:{"^":"W;X:c<,h:d<,b,a",
H:function(a,b){if(!(b.ap("talk_to_briana_2")&&b.dQ(this.d)==null&&O.eE(b)))return!1
return!0},
R:[function(a,b,c){c.n(0,'_"What\'s Orcthorn?"_\n\n\n"A sword. It has killed hundreds of orc, wielded by many different knights. Even more orcs died trying to seize it, almost to no avail."\n\n\n_"Almost."_\n\n\n"Yes. Last full moon, an orcish captain and a company of (TODO: alpha) warriors ambushed Lord TODO. He was the wielder of Orcthorn at that time, and they knew it. They slaughtered his company and brought the sword here, to Bloodrock. Since then, the orcs are bolder and more successful."\n\n\n_"The mad guardian."_\n\n\n"The mad who?"\n\n\n_"That\'s what Agruth and the other slavers were talking about a couple of weeks back. One orc was tasked with guarding a sword. That seemed wierd enough to me. Guarding a sword? Stranger yet, that orc went mad after only a few days of doing this. Now they keep him in a cell, and call him *grach kamkorr*. The mad guardian. That sword is still with him. Hidden there in the cell."_\n\n\n"Where is that cell?"\n\n\n_"Somewhere in the slave quarters."_\n\n\n',!0)
if(!b.ak("RoomRoamingSituation").cW(b,b.B(1),"slave_quarters_passage"))c.n(0,'Briana tenses. "Well then, at least we have that choice." ',!0)
c.n(0,"",!0)
return H.b(a.gh())+" successfully performs TalkToBriana3"},"$3","gN",6,0,1],
P:[function(a,b,c){throw H.c(new P.w("Success chance is 100%"))},"$3","gM",6,0,1],
I:function(a,b){return 1},
gO:function(){return!1},
ab:function(a,b){return"Will you be successful?"},
gL:function(){return},
gJ:function(){return""},
gK:function(){return!1}},
rY:{"^":"a:5;",
$3:function(a,b,c){c.n(0,"This must be the place that the orcs call the Shafts. It's a tall, seemingly endless room, with many walkways across.\n\n\n\n\n\n\nYou realize there is really only one way out, over one of the walkways. You'll have to run, there is no hiding anymore.\n",!0)}},
rZ:{"^":"a:5;",
$3:function(a,b,c){c.n(0,"",!0)}},
tN:{"^":"a:5;",
$3:function(a,b,c){c.n(0,'Almost as soon as you lose the circular room from sight, loud yells and shouting rises from the deep of the mountain. You hurry up, taking the high stairs by two. The voices from below quiet down a bit, and now you can hear stomping of dozens of orc and goblin feet.\n\n\nThe air gets colder and fresher, but there\'s still no end in sight, and the stairs are now so high that the climb feels like walking up a ladder.\n\n\n"I have\u2026" Briana gasps, trying to catch her breath. "I have not fought my way through the depths of mount bloodrock just to die of exhaution on its doorstep."\n\n\n_"That\u2026 that would be disappointing, yes."_\n\n\nThe sounds from behind get louder. You can now pick out individual voices, although not what they say. The stairway suddenly makes a sharp left and levels out. Tasting blood on the roof of your mouth, your whole body demands to stop \u2014 but you start running anyway. Briana closely follows.\n\n\nThe light in the tunnel gets brighter and the air colder. Then, suddenly, an orc and a goblin jump in front of you from a slimy crevice, swords in hands. \n\n\n![Orc and Goblin](img/orc_and_goblin_sketch.jpg)\n\n\nThis must be the guard of the Upper Door. There is no way around them.\n',!0)}},
tO:{"^":"a:5;",
$3:function(a,b,c){c.n(0,"",!0)}},
tC:{"^":"a:5;",
$3:function(a,b,c){c.n(0,"You enter something that at first looks like a large, twisting cave, but then opens into a high room with many columns. This must be what the orcs call the Underground Church. Your bare footsteps reverberate around the space, so you slow down to quiet them. There are no windows, of course, you are deep underground, but there is dim light coming from the far end of the place, where you expect the altar to be but can't quite see it. No torches here. Quiet. \n\n\n",!0)
if(O.b3(b,"cave_with_agruth"))c.t(0,"After a bit of searching, you also notice a twisty passage going from the right hand side of the Church and sloping upwards. That must be the way out.")
c.n(0,"",!0)
if(O.b3(b,"guardpost_above_church"))c.t(0,"Not far from here, a tunnel leads slightly downwards, to where you killed Agruth.")
c.n(0,"",!0)}},
tM:{"^":"a:5;",
$3:function(a,b,c){c.n(0,"The temple stands silent, as if holding breath.\n\n\n",!0)
O.cB(b,c)
c.n(0,"",!0)}},
lc:{"^":"W;X:c<,h:d<,b,a",
H:function(a,b){var z=b.f
if(!J.e(H.F(z.length!==0?C.a.gw(z):null,"$isJ").a,"underground_church"))return!1
if(b.ap(this.d))return!1
return!0},
R:[function(a,b,c){c.n(0,'This place was not built by the orcs or their slaves. Walls are straight and smooth. The columns are decorated with delicate embossments of skulls and tentacles.\n\n\n"What are these things?" Briana whispers.\n\n\n_"This place worships the Dead Prince."_\n\n\nSaying the name brings coldness and sweat. You hear the name every night in the Dead Prince\'s tongue \u2014 but it has been a long time since you said it yourself.\n\n\n"Worships?" Briana looks up at the high ceiling, then around the temple. "I though the Dead Prince was a warlord. A shaman. Something like that."\n\n\n_"He is god."_\n\n\n',!0)
if(!b.ap("wait_for_ritual"))c.n(0,"Briana smirks. \"Look, no. The Dead Prince is no god. The orcs might think so, you shouldn't. He's some talented illusionist at best.\" ",!0)
c.n(0,'\nThe glow coming from the altar dims for a moment, then lights up again.\n\n\n_"He is worse than god. He is fear itself."_\n\n\nBriana looks at you, narrowing her eyes.\n\n\n_"I think you have felt it."_\n',!0)
return H.b(a.gh())+" successfully performs ExamineUndergroundChurch"},"$3","gN",6,0,1],
P:[function(a,b,c){throw H.c(new P.w("Success chance is 100%"))},"$3","gM",6,0,1],
I:function(a,b){return 1},
gO:function(){return!1},
ab:function(a,b){return"Will you be successful?"},
gL:function(){return},
gJ:function(){return""},
gK:function(){return!1}},
tg:{"^":"a:5;",
$3:function(a,b,c){c.n(0,'The altar is a simple block of stone at the back of the temple. On the wall above it, there is a large ornament portraying an octopus with eight tentacles and eight black eyes at their tips. It\'s the sign of the Dead Prince. You have never seen it in real life but you know it well.\n\n\n"You\'re brave, my friend," Briana whispers. "I\'ll give you that. But if we must linger in this mountain, I\'d much rather kill some orcs than spy around a temple."\n\n\n_"You hate orcs? This is what made them."_\n\n\nBriana opens her mouth to reply, but at that point the otherwise steady light from the altar flickers like a flame, and you both slip behind a large column to move out of sight. A spear that lies here on the ground almost trips you up.\n',!0)}},
tr:{"^":"a:5;",
$3:function(a,b,c){c.n(0,"The altar glows with a dim red light that reflects in the eight black eyes above it.\n",!0)}},
pJ:{"^":"W;X:c<,h:d<,b,a",
H:function(a,b){var z=b.f
if(!J.e(H.F(z.length!==0?C.a.gw(z):null,"$isJ").a,"underground_church_altar"))return!1
if(b.ap(this.d))return!1
return!0},
R:[function(a,b,c){c.n(0,'You move to a shadow and wait. After a few heartbeats, there is a scraping sound of stone against stone. You lean out from your hiding and see a part of the wall to the right of the altar opening.\n\n\nAn orc priest, tall and pale, enters from the stone door. At that time, the whole temple reverberates with a strong, dissonant tone that is somehow both sickening and appealing at the same time. It\'s like a groan of some large beast awakening.\n\n\nAfter the priest, a huge creature enters through the door, crouching below the frame. It\'s unclear what it is, but possibly some large breed of ogre, and judging by the braided hair, a female. Her sword \u2014 attached to her hip with a rope \u2014 is as long as you are tall. \n\n\nWhen she enters the temple and unbends, you can see that she leads someone on a chain. An orc. Despite being a strong one, probably a captain or even a chieftain, he is dwarfed by the creature before him, and he visibly shakes in horror.\n\n\nThe three of them \u2014 the priest, the ogre and the orc \u2014 go around the altar and stop before it, facing the symbol of the octopus, and away from you and Briana. The dissonant tone stops. You lean a little further out from your hiding, to have a better view.\n\n\nWithout words, the priest beckons the orc to lie at the altar. The orc is now shaking uncontrollably, but complies. You can hear his fitful breath, the rustle of his body against the stone as he glides into position, and nothing else.\n\n\nWhen the orc lies on the altar, the female ogre walks up to him and places her hands on his shoulders, pinning him down.\n\n\n_"Maggots."_\n\n\nSomehow, you know. Briana gives you a puzzled look, then turns back to the altar. From the shadows in the base of the altar, a swarm of large black insects starts to make its way to the top, towards the terrified orc. The priest lifts his arms as if in silent worship.\n\n\nThe ogre pushes down, preparing for the inevitable struggle. The orc senses it, tenses up and opens his mouth to scream.\n\n\nBut the scream doesn\'t come. Instead of it, the dissonant tone sounds again, more powerful than before.\n\n\nThe maggots crawl over the edge of the altar\'s top, onto the orc\'s body, heading straight towards his face. They move faster now.\n\n\n\n\nThe orc\'s eyes go wide. He struggles against the ogre\'s grip, pointlessly. The dissonant tone gets even louder. The temple quivers. The sound permeates everything.\n\n\nThis has a strange effect on you. Suddenly, the terror of the moment is fully replaced by something of an opposite \u2014 an invigorating feeling of power. You breathe in and feel stronger, refreshed. (Your stamina increases by +1.)\n\n\nYou notice that the priest takes a deep breath as well.\n\n\nThen, suddenly, the sound stops, and the orc\'s body sinks. The invigorating feeling is gone. You realize the maggots have eaten through the orc\'s eyes and cheeks, and that they are now scuttling back to the base of the altar.\n\n\nThe priest puts his arms down again, and \u2014 without ceremony \u2014 heads back to the stone door. The ogre takes the orc\'s dead body, puts it over her shoulder, and follows. In a few heartbeats, they are all gone and the door is closed. A new splash of blood on the altar is the only reminder of the scene.\n\n\nBriana doesn\'t look at you. "How did you know it would be maggots?"\n\n\n_"I do not know."_\n\n\n"Is this\u2026 I _felt_ that sound, somehow. I _felt_ it."\n\n\n_"This place does something weird to people."_\n\n\n"And if that orc was meant to be an offering, why did they not leave the body?" Briana shakes her head, still not looking at you. "Let\'s\u2026 let\'s just get out of here."\n',!0)
O.iq(b,1)
return H.b(a.gh())+" successfully performs WaitForRitual"},"$3","gN",6,0,1],
P:[function(a,b,c){throw H.c(new P.w("Success chance is 100%"))},"$3","gM",6,0,1],
I:function(a,b){return 1},
gO:function(){return!1},
ab:function(a,b){return"Will you be successful?"},
gL:function(){return},
gJ:function(){return""},
gK:function(){return!1}},
pp:{"^":"W;X:c<,h:d<,b,a",
H:function(a,b){var z=b.f
if(!J.e(H.F(z.length!==0?C.a.gw(z):null,"$isJ").a,"underground_church_altar"))return!1
if(b.ap(this.d))return!1
return!0},
R:[function(a,b,c){c.n(0,"It's a primive short spear that probably belonged to some goblin. You take it in your hand, feeling the wet wood and the patches of mire along its length. It must have been here for a while. \n\n\nBut it feels right in your hand, a good throwing weapon.\n",!0)
O.uO(b)
return H.b(a.gh())+" successfully performs TakeSpearInUndergroundChurch"},"$3","gN",6,0,1],
P:[function(a,b,c){throw H.c(new P.w("Success chance is 100%"))},"$3","gM",6,0,1],
I:function(a,b){return 1},
gO:function(){return!1},
ab:function(a,b){return"Will you be successful?"},
gL:function(){return},
gJ:function(){return""},
gK:function(){return!1}},
rV:{"^":"a:5;",
$3:function(a,b,c){c.n(0,"You enter the enormous cave that holds Mount Bloodrock's war forges. This space is so vast that it has its own climate, with dark clouds covering most of the ceiling, and what looks like black rain falling in the distance. Weird bats are circling just below the clouds, their shrieks mixing with the clangs of steel and angry shouts below.\n\n\n",!0)
if(O.b3(b,"cave_with_agruth"))c.n(0,"You and Briana duck behind some carts on a walkway above the floor of the cave. You can see that the walkway leads up a flight of stairs that hugs one side of the cave, and into a large stone wall. This must be the way through the smelter, and towards the Upper Door. Thankfully, there is nobody in the way. ",!0)
c.n(0,"\n",!0)
if(O.b3(b,"smelter"))c.n(0,"You and Briana stand on a walkway way above the floor of the cave. You can see the walkway leads down a flight of stairs that hugs one side of the cave, towards the bottom. Down there, you recognize a passage in the rock that you know must descend deeper into the mountain, towards the slave quarters, and therefore to where you slayed Agruth. There is nobody in the way. ",!0)
c.n(0,"",!0)}},
t5:{"^":"a:5;",
$3:function(a,b,c){c.n(0,"The air in the war forges is heavy and the noise overwhelming.\n\n\n",!0)
O.cB(b,c)
c.n(0,"",!0)}},
pK:{"^":"W;X:c<,h:d<,b,a",
H:function(a,b){var z=b.f
if(!J.e(H.F(z.length!==0?C.a.gw(z):null,"$isJ").a,"war_forge"))return!1
if(b.ap(this.d))return!1
return!0},
R:[function(a,b,c){c.n(0,"The cave is natural, but on the side of the smelter there is an artificial wall, like a stone dam. From an opening high on that wall, suspended troughs of molten steel descend into all parts of the room like huge fiery tentacles. \n\n\nAt the end of each of the troughs, teams of orcs pour the steel into molds for axes, war hammers, and greatswords. The clamor of hammers hitting anvils is deafening, and the strong smell of iron and soot is almost stronger than the smell of all that orc sweat.\n",!0)
return H.b(a.gh())+" successfully performs WarForgeLookAround"},"$3","gN",6,0,1],
P:[function(a,b,c){throw H.c(new P.w("Success chance is 100%"))},"$3","gM",6,0,1],
I:function(a,b){return 1},
gO:function(){return!1},
ab:function(a,b){return"Will you be successful?"},
gL:function(){return},
gJ:function(){return""},
gK:function(){return!1}},
pL:{"^":"W;X:c<,h:d<,b,a",
H:function(a,b){var z=b.f
if(!J.e(H.F(z.length!==0?C.a.gw(z):null,"$isJ").a,"war_forge"))return!1
if(!(!b.ap(this.d)&&b.ap("war_forge_look_around")))return!1
return!0},
R:[function(a,b,c){c.n(0,'You crane your neck from your hiding and take the scene in. More likely than not, no human has ever seen this place and lived to tell the tale.\n\n\nBriana shakes her head: "The orcs are working together with ogres. They must be terrified."\n\n\nYou scan the workers, noticing the slow-moving ogres that tower over the orcs. "And they don\'t use slaves here," you say. "There must be something important going on here." Looking again at the molds they are using, you don\'t see anything out of the expected. Primitive axes and swords, some armor.\n\n\n"What is that thing!" Briana gasps. You follow her stare and at first all you see is just a cluster of slightly larger forges. Then you squint and an image appears. An image of an enormous, repulsive, half-assembled insect. Each leg, or whatever they are, is as long as a good rock\'s throw. There are eight of them. Then there\'s the body \u2014 a huge cockroach-like contraption. The teeth of steel are already completed, sharp and menacing and as long as a man. \n\n\nA full-sized ogre is pouring water over one part of the form just now, producing a cloud of steam. You can\'t see much else. From the high opening in the smelter wall, molten steel is starting to flow down to fill another part of the iron monster.\n',!0)
return H.b(a.gh())+" successfully performs WarForgeWatchWorkers"},"$3","gN",6,0,1],
P:[function(a,b,c){throw H.c(new P.w("Success chance is 100%"))},"$3","gM",6,0,1],
I:function(a,b){return 1},
gO:function(){return!1},
ab:function(a,b){return"Will you be successful?"},
gL:function(){return},
gJ:function(){return""},
gK:function(){return!1}},
q1:{"^":"fc;i:a<,V:b<",
a2:function(a){var z=new V.dC(null,null,null)
z.m(this)
a.$1(z)
return z.q()},
A:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof V.fc))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
y=z==null?y==null:z===y
z=y}else z=!1
return z},
gD:function(a){return Y.U(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)))},
k:function(a){return"GuardpostAboveChurchTakeShieldRescueSituation {id="+J.h(this.a)+",\ntime="+J.h(this.b)+",\n}"}},
dC:{"^":"d;a,b,c",
gi:function(){return this.gbN().b},
gV:function(){return this.gbN().c},
gbN:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.a=null}return this},
m:function(a){this.a=a},
q:function(){var z,y,x
z=this.a
if(z==null){y=this.gbN().b
x=this.gbN().c
z=new V.q1(y,x)
if(y==null)H.i(P.l("id"))
if(x==null)H.i(P.l("time"))}this.m(z)
return z}}}],["","",,O,{"^":"",
xK:[function(a){var z,y
z=$.$get$dq()
y=z.E
if(y.length>0){y+=" "
z.E=y}z.E=y+a},"$1","vh",2,0,16],
xP:[function(a){$.eC=a},"$1","vi",2,0,16],
i9:[function(a,b,c,d,e,f,g){var z=L.f1(a,!1,!1,d,e,f,g)
$.$get$bZ().t(0,z)
return z},function(a){return O.i9(a,!1,!1,null,null,null,null)},function(a,b,c){return O.i9(a,!1,!1,null,b,c,null)},"$7$deferToChoiceList$deferToEndOfPage$goto$helpMessage$script$submenu","$1","$3$helpMessage$script","vg",2,13,53,0,0,0,1,1,0],
nU:{"^":"o5;",
bB:function(){var z=0,y=P.aB(),x,w=2,v,u=[],t=this,s,r,q,p,o,n,m,l,k,j
var $async$bB=P.ax(function(a,b){if(a===1){v=b
z=w}while(true)switch(z){case 0:if($.cr){n=t.Q
n.toString
m=new A.u(667,null,null,null,null)
m.c="Sending updated stats."
n.a.G(m.F())
m=t.Q
n=Z.oJ()
m.toString
l=new A.u(100,null,null,null,null)
l.e=n.F()
m.a.G(l.F())
new P.H(0,$.r,null,[null]).bC(!0)}if(t.r){n=t.Q
n.toString
m=new A.u(667,null,null,null,null)
m.c="Saving player chronology."
n.a.G(m.F())
t.r=!1
m=t.Q
m.toString
n=new A.u(60,null,null,null,null)
n.b=t.f.cw(0)
m.a.G(n.F())}s=null
case 3:n=t.Q
n.toString
m=new A.u(667,null,null,null,null)
m.c="Calling _goOneStep()."
n.a.G(m.F())
w=7
z=10
return P.aw(t.cH(),$async$bB)
case 10:s=b
w=2
z=9
break
case 7:w=6
j=v
n=H.C(j)
if(n instanceof M.cJ){r=n
q=H.E(j)
n=t.Q
m=H.b(r)+"\nStacktrace: "+H.b(q)
n.toString
l=new A.u(666,null,null,null,null)
l.c="AuthorScriptException: "+m
n.a.G(l.F())
z=1
break}else{p=n
o=H.E(j)
n=t.Q
m=H.b(p)+"\nStacktrace: "+H.b(o)
n.toString
l=new A.u(666,null,null,null,null)
l.c="Unknown Error (probably in egamebook itself): "+m
n.a.G(l.F())
z=1
break}z=9
break
case 6:z=2
break
case 9:case 4:if(J.e(s,!1)){z=3
break}case 5:n=t.Q
n.toString
m=new A.u(667,null,null,null,null)
m.c="Ending _goOneStep() loop."
n.a.G(m.F())
case 1:return P.aI(x,y)
case 2:return P.aH(v,y)}})
return P.aJ($async$bB,y)},
eY:function(){var z,y
this.fB()
this.f.bh(0)
this.r=!0
this.e=this.c
z=this.Q
Z.hy(Z.bQ())
z.toString
y=new A.u(90,null,null,null,null)
y.b=Z.bQ()
z.a.G(y.F())
this.bB()},
lh:[function(a){var z,y
z={}
z.a=null
y=$.$get$bZ()
y.Z(0,new O.og(z,this,a))
z=z.a
if(z==null)throw H.c(P.G("The sent choice hash ("+H.b(a)+") is not one of those offered ("+J.h(y)+")"))
this.iZ(z)
this.bB()},"$1","giK",2,0,34],
iZ:function(a){var z
if(a.gh5()!=null){z=a.r
$.$get$cx().aE(z)}z=a.x
if(z!=null)this.es(z)},
cH:function(){var z=0,y=P.aB(),x,w=[],v=this,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c
var $async$cH=P.ax(function(a,a0){if(a===1)return P.aH(a0,y)
while(true)switch(z){case 0:u={}
r=$.$get$cy()
q=r.b
if(q.b!==q.c){u=v.Q
u.toString
q=new A.u(667,null,null,null,null)
q.c="Awarding points."
u.a.G(q.F())
p=r.b.dM()
r=v.Q
q=p.gjw()
u=p.b
o=p.c
r.toString
n=new A.u(70,null,null,null,null)
n.b=[q,u]
n.c=o
r.a.G(n.F())
r=new P.H(0,$.r,null,[null])
r.bC(null)
r.c7(new O.o6(v))
x=!0
z=1
break}m=v.x===v.e.gaB().length-1||v.x===v.y
u.a=m
r=v.x
q=v.y
if(r!==q)if(r!=null){if(r<v.e.gaB().length){r=v.e.gaB()
o=v.x
if(o>>>0!==o||o>=r.length){x=H.f(r,o)
z=1
break}o=!!J.o(r[o]).$isN
r=o}else r=!1
l=r}else l=!1
else l=!1
r="atEndOfPage = "+m+", atStaticChoiceList = "+l
o=v.Q
o.toString
k=new A.u(667,null,null,null,null)
k.c=r
o.a.G(k.F())
k=$.$get$bZ()
k.iH(new O.o7(v),!1)
if(k.gl(k)!==0){r=v.Q
r.toString
o=new A.u(667,null,null,null,null)
o.c="We have choices."
r.a.G(o.F())
o=H.y(k,"ba",0)
o=P.P(new H.K(k,new O.o8(u,l),[o]),!0,o)
r=k.a
H.p([],[L.ac])
j=new L.f2(r,o)
if(!j.gY(j)){u=v.Q
r=u.e
if(r!=null){r.dF(new D.c4("Showing new choice before previous one was selected."))
u.e=null}r=P.t
u.e=new P.cs(new P.H(0,$.r,null,[r]),[r])
r=j.dS()
u.a.G(r.F())
u=u.e.a.c7(v.giK())
i=new O.o9(v)
r=H.m(u,0)
q=$.r
if(q!==C.i){i=P.eu(i,q)
q.toString}u.dn(new P.el(null,new P.H(0,q,null,[r]),6,new O.oa(),i,[r,r]))
x=!0
z=1
break}else{h=k.aU(0,new O.ob(),new O.oc())
if(h!=null){if(h.gh5()!=null){r=h.r
$.$get$cx().aE(r)}r=h.x
if(r!=null)v.es(r)
k.a3(0,h)}}}r=$.$get$cx()
o=r.b
g=r.c
z=o!==g?3:4
break
case 3:++r.d
u=r.a
q=u.length
g=(g-1&q-1)>>>0
r.c=g
if(g<0||g>=q){x=H.f(u,g)
z=1
break}f=u[g]
u[g]=null
z=5
return P.aw(v.cI(f),$async$cH)
case 5:x=a0
z=1
break
case 4:r=$.eC
if(r!=null){v.es(r)
$.eC=null
x=!1
z=1
break}r=v.x
if(r==null){v.x=0
r=0}else if(r===q){r=v.e.gaB().length-1
v.x=r}else if($.hW)$.hW=!1
else{++r
v.x=r}u.a=r===v.e.gaB().length-1
r="Resolving block: '"+H.b(v.e.gh())+"' block "+H.b(v.x)+"."
q=v.Q
q.toString
o=new A.u(667,null,null,null,null)
o.c=r
q.a.G(o.F())
if(v.x===v.e.gaB().length){u=v.Q
u.toString
r=new A.u(667,null,null,null,null)
r.c="End of book."
u.a.G(r.F())
r=v.Q
u=v.ea()
r.toString
u=u.f1(50)
r.a.G(u.F())
v.Q.a.G(new A.u(80,null,null,null,null).F())
x=!0
z=1
break}r=v.e.gaB()
q=v.x
if(q>>>0!==q||q>=r.length){x=H.f(r,q)
z=1
break}q=r[q]
z=typeof q==="string"?6:8
break
case 6:u=v.Q
r=v.e.gaB()
q=v.x
if(q>>>0!==q||q>=r.length){x=H.f(r,q)
z=1
break}q=r[q]
r=P.X
u.f=new P.cs(new P.H(0,$.r,null,[r]),[r])
r=new A.u(30,null,null,null,null)
r.c=q
u.a.G(r.F())
u.f.a.c7(new O.od(v))
x=!0
z=1
break
z=7
break
case 8:r=v.e.gaB()
q=v.x
if(q>>>0!==q||q>=r.length){x=H.f(r,q)
z=1
break}z=!!J.o(r[q]).$isN?9:11
break
case 9:r=v.Q
r.toString
q=new A.u(667,null,null,null,null)
q.c="A ChoiceList encountered."
r.a.G(q.F())
try{r=v.e.gaB()
q=v.x
if(q>>>0!==q||q>=r.length){x=H.f(r,q)
z=1
break}k.ju(r[q])}catch(b){u=H.C(b)
if(u instanceof M.cJ){t=u
s=H.E(b)
u=v.Q
r=H.b(t)+"\nStacktrace: "+H.b(s)
u.toString
q=new A.u(666,null,null,null,null)
q.c="AuthorScriptException: "+r
u.a.G(q.F())
x=!0
z=1
break}else throw b}r=v.Q
r.toString
q=new A.u(667,null,null,null,null)
q.c="- choices added"
r.a.G(q.F())
if(k.bt(0,new O.oe(u,v))&&v.x===v.e.gaB().length-1){u=v.Q
u.toString
r=new A.u(667,null,null,null,null)
r.c="Creating & sending savegame"
u.a.G(r.F())
r=v.Q
u=v.ea()
r.toString
u=u.f1(50)
r.a.G(u.F())
x=!1
z=1
break}x=!1
z=1
break
z=10
break
case 11:r=v.e.gaB()
q=v.x
if(q>>>0!==q||q>=r.length){x=H.f(r,q)
z=1
break}q=r[q]
r={func:1,ret:[P.Q,P.at]}
z=H.ay(q,r)?12:14
break
case 12:d=v.x===v.e.gaB().length-1?v.ea():null
q=v.e.gaB()
o=v.x
if(o>>>0!==o||o>=q.length){x=H.f(q,o)
z=1
break}z=15
return P.aw(v.cI(H.ii(q[o],r)),$async$cH)
case 15:c=a0
if(k.bt(0,new O.of(u,v))&&v.x===v.e.gaB().length-1){u=v.Q
u.toString
r=d.f1(50)
u.a.G(r.F())}x=c
z=1
break
z=13
break
case 14:u=v.e.gaB()
r=v.x
if(r>>>0!==r||r>=u.length){x=H.f(u,r)
z=1
break}throw H.c(new P.w("Invalid block: "+H.b(u[r])))
case 13:case 10:case 7:case 1:return P.aI(x,y)}})
return P.aJ($async$cH,y)},
es:function(a){var z,y,x,w,v
z=$.$get$cN()
if(z.b.test(H.by(a))){y=this.d
if(y==null)throw H.c(new P.w("Cannot use ["+J.h(z)+"] when there is no _preGotoPosition."))
x=y.a
z=y.b
if(typeof z!=="number")return z.at()
w=z-1}else{x=this.b.dX(a,this.e.gdZ())
if(x==null)throw H.c("Function goto() called with an invalid argument '"+H.b(a)+"'. No such page.")
w=null}z=this.d
y=z==null
if((y?null:z.a)!=null){z=y?null:z.a
y=this.e
this.f.t(0,H.b(z.gh())+">>"+H.b(y.gh()))
this.r=!0}if(this.f.a7(0,H.b(this.e.gh())+">>"+H.b(x.gh()))||x.ghF()){z=this.d
y=z==null
if((y?null:z.a)!=null)z=!(y?null:z.a).ghF()
else z=!1}else z=!1
$.hU=z
z="Points embargo = "+z
y=this.Q
y.toString
v=new A.u(667,null,null,null,null)
v.c=z
y.a.G(v.F())
v=this.e
this.d=new O.nV(v,this.x)
this.e=x
this.x=w
v.e=J.ao(v.gdT(),1)},
fB:function(){var z,y,x,w,v,u
this.x=null
$.$get$cx().bh(0)
$.$get$bZ().sl(0,0)
$.rA=null
x=$.$get$cD()
x.bh(0)
w=$.$get$cy()
x.p(0,"points",w)
w.a=0
w.b.bh(0)
this.b.jy()
$.it=!0
try{this.kg()}catch(v){z=H.C(v)
y=H.E(v)
x=this.Q
w=H.b(z)+"\n"+H.b(y)
x.toString
u=new A.u(666,null,null,null,null)
u.c="Author Exception in initBlock() (<variables>): "+w
x.a.G(u.F())
throw H.c(z)}this.hq()
$.it=!1},
cI:function(a){var z=0,y=P.aB(),x,w=2,v,u=[],t=this,s,r,q,p,o,n,m
var $async$cI=P.ax(function(b,c){if(b===1){v=c
z=w}while(true)switch(z){case 0:q=$.$get$dq()
q.E=""
w=4
z=7
return P.aw(a.$0(),$async$cI)
case 7:w=2
z=6
break
case 4:w=3
m=v
s=H.C(m)
r=H.E(m)
q.E+="<code><pre>ERROR: "+H.b(s)+"\n\n"+H.b(r)+"</pre></code>"
q=J.h(s)
o=t.e.gh()
n=t.x
throw H.c(new M.cJ(q,o,n))
z=6
break
case 3:z=2
break
case 6:if(q.E.length!==0){t.Q.fa(J.h(q)).c7(new O.oh(t))
x=!0
z=1
break}else{x=!1
z=1
break}case 1:return P.aI(x,y)
case 2:return P.aH(v,y)}})
return P.aJ($async$cI,y)},
iR:[function(a){var z,y,x,w
z=a.x
if(z==null)return!1
if($.$get$cN().b.test(H.by(z)))return!1
y=this.b.dX(z,this.e.gdZ())
if(y==null){z="Target page '"+H.b(z)+"' was not found."
x=this.Q
x.toString
w=new A.u(667,null,null,null,null)
w.c=z
x.a.G(w.F())
return!0}y.gl8()
return!1},"$1","gfF",2,0,35],
ea:function(){var z,y,x,w,v,u
this.hq()
try{x=this.e.gh()
w=$.$get$cD()
x=new Z.fT(x,this.b.jT(),null,null,null,null)
x.c=H.aM(Z.d2(w),"$isI",[P.q,P.d],"$asI")
x.f=Date.now()
x.e=C.e.l5(H.aE(x),16)
return x}catch(v){z=H.C(v)
y=H.E(v)
x=this.Q
w=H.b(z)+"\n"+H.b(y)
x.toString
u=new A.u(666,null,null,null,null)
u.c="Error when creating savegame: "+w
x.a.G(u.F())
throw H.c(z)}},
hg:function(a,b){var z,y,x
this.fB()
z=this.b
y=z.a
if(y.j(0,a.a)==null)throw H.c(new Z.dD("Trying to load page '"+H.b(a.a)+"' which doesn't exist in current egamebook."))
this.e=y.j(0,a.a)
this.x=this.y
y=this.Q
y.toString
x=new A.u(667,null,null,null,null)
x.c="Importing state from savegame."
y.a.G(x.F())
z.kd(a.b)
if(b!=null){z=this.Q
z.toString
y=new A.u(667,null,null,null,null)
y.c="Importing player chronology."
z.a.G(y.F())
this.f.ax(0,b)}z=this.Q
z.toString
y=new A.u(667,null,null,null,null)
y.c="Copying save variables into vars."
z.a.G(y.F())
y=$.$get$cD()
Z.nR(a,y,P.dN(P.q,P.bG))
this.cx=H.F(y.j(0,"game"),"$isf7")
this.cy=H.aM(y.j(0,"hitpoints"),"$isau",[P.aW],"$asau")
z=[P.t]
this.db=H.aM(y.j(0,"stamina"),"$isau",z,"$asau")
this.dx=H.aM(y.j(0,"gold"),"$isau",z,"$asau")
z=this.Q
Z.hy(Z.bQ())
z.toString
y=new A.u(90,null,null,null,null)
y.b=Z.bQ()
z.a.G(y.F())
y=this.Q
y.toString
z=new A.u(667,null,null,null,null)
z.c="loadFromSaveGame() done."
y.a.G(z.F())
this.bB()},
kx:function(a){return this.hg(a,null)},
e0:[function(a,b,c,d){var z=0,y=P.aB(),x,w=this,v,u,t
var $async$e0=P.ax(function(e,f){if(e===1)return P.aH(f,y)
while(true)switch(z){case 0:v=$.$get$dq()
if(v.E.length!==0){w.Q.fa(J.h(v))
v.E=""}v=w.Q
v.toString
u=new A.u(130,null,null,null,null)
u.b=[a,b,d,c]
v.a.G(u.F())
u=U.cp
t=new P.H(0,$.r,null,[u])
v.x=new P.cs(t,[u])
x=t
z=1
break
case 1:return P.aI(x,y)}})
return P.aJ($async$e0,y)},function(a,b){return this.e0(a,b,null,!1)},"ld","$4$rerollEffectDescription$rerollable","$2","gi1",4,5,54,1,0]},
og:{"^":"a:0;a,b,c",
$1:function(a){var z,y,x,w
a.sfb(!0)
if(a.d===this.c){z="Found choice that was selected: "+a.e
y=this.b.Q
y.toString
x=new A.u(667,null,null,null,null)
x.c=z
y.a.G(x.F())
this.a.a=a}else{z=a.x
if(z!=null){y=this.b
w=$.$get$cN().b.test(H.by(z))?y.d.a:y.b.dX(z,y.e.gdZ())
if(w!=null){y.f.t(0,H.b(y.e.gh())+">>"+H.b(w.gh()))
y.r=!0}}}}},
o6:{"^":"a:0;a",
$1:function(a){return this.a.bB()}},
o7:{"^":"a:0;a",
$1:function(a){return a.gfb()||this.a.iR(a)}},
o8:{"^":"a:37;a,b",
$1:function(a){return a.kn(this.b,this.a.a)}},
o9:{"^":"a:0;a",
$1:function(a){var z,y,x
z=H.b(a)
y=this.a.Q
y.toString
x=new A.u(667,null,null,null,null)
x.c=z
y.a.G(x.F())
return}},
oa:{"^":"a:0;",
$1:function(a){return a instanceof D.c4}},
ob:{"^":"a:0;",
$1:function(a){return a.gko()}},
oc:{"^":"a:2;",
$0:function(){return}},
od:{"^":"a:0;a",
$1:function(a){return this.a.bB()}},
oe:{"^":"a:0;a,b",
$1:function(a){return a.dH(!0,this.a.a,this.b.gfF())}},
of:{"^":"a:0;a,b",
$1:function(a){return a.dH(!0,this.a.a,this.b.gfF())}},
oh:{"^":"a:0;a",
$1:function(a){return this.a.bB()}},
ne:{"^":"d;a,b,fZ:c<",
jk:function(a,b,c){var z
if(!$.hU){z=J.ao(this.a,b)
this.a=z
this.b.aE(new A.cZ(b,z,c))}},
t:function(a,b){return this.jk(a,b,null)},
aj:function(a,b){this.t(0,b)
return this},
F:function(){return P.a0(["points",this.a])},
hE:function(a){this.a=a.j(0,"points")
this.b.bh(0)},
ic:function(){this.b=P.bb(null,A.cZ)},
$ise8:1},
d3:{"^":"mY;aB:d<,dT:e@,a,b,c",
ghF:function(){return J.ab(this.e,0)}},
nV:{"^":"d;a,b"},
o1:{"^":"d;a",
j:function(a,b){return this.a.j(0,b)},
dX:function(a,b){var z
if(b!=null&&this.a.ad(b+": "+H.b(a)))return this.a.j(0,H.b(b)+": "+H.b(a))
else{z=this.a
if(z.ad(a))return z.j(0,a)
else return}},
p:function(a,b,c){this.a.p(0,b,c)
c.sh(b)},
jT:function(){var z=new H.R(0,null,null,null,null,null,0,[P.q,null])
this.a.Z(0,new O.o3(z))
return z},
kd:function(a){a.Z(0,new O.o4(this))},
jy:function(){this.a.Z(0,new O.o2())}},
o3:{"^":"a:6;a",
$2:function(a,b){this.a.p(0,a,P.a0(["visitCount",b.gdT()]))}},
o4:{"^":"a:6;a",
$2:function(a,b){var z=this.a.a
if(z.ad(a))z.j(0,a).sdT(J.aA(b,"visitCount"))}},
o2:{"^":"a:6;",
$2:function(a,b){b.sdT(0)}}}],["","",,M,{"^":"",cJ:{"^":"d;a,b,c",
k:function(a){return"AuthorScriptException at page '"+H.b(this.b)+"', block #"+H.b(this.c)+": "+H.b(this.a)},
v:{
eW:function(a){return new M.cJ(a,null,null)}}}}],["","",,M,{"^":"",o5:{"^":"d;"}}],["","",,Z,{"^":"",fT:{"^":"d;a,b,c,d,e,f",
f1:function(a){var z
if(a!==50&&a!==1020)throw H.c("Cannot create Message of type "+a+". Can only be MSG_SAVE_GAME (50) or MSG_LOAD_GAME (1020).")
z=new A.u(a,null,null,null,null)
z.c=this.dR()
return z},
dR:function(){var z,y
z=new H.R(0,null,null,null,null,null,0,[P.q,null])
z.p(0,"uid",this.e)
z.p(0,"currentPageName",this.a)
z.p(0,"pageMapState",this.b)
z.p(0,"vars",this.c)
z.p(0,"timestamp",this.f)
y=this.d
if(y!=null)z.p(0,"previousText",y)
return C.w.h3(z)},
k:function(a){return this.dR()},
v:{
fU:function(a){var z,y
if(a!=null)if(typeof a!=="string"){if(typeof a!=="number"||Math.floor(a)!==a)if(typeof a!=="number")if(typeof a!=="boolean"){z=J.o(a)
z=!!z.$isN||!!z.$isI}else z=!0
else z=!0
else z=!0
y=z}else y=!0
else y=!0
if(y)return!0
return!!J.o(a).$ise8},
d2:function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"&&Math.floor(a)===a||typeof a==="number"||typeof a==="boolean")return a
else{z=J.o(a)
if(!!z.$isN){y=[]
for(x=0;x<z.gl(a);++x)if(Z.fU(z.j(a,x)))y.push(Z.d2(z.j(a,x)))
return y}else if(!!z.$isI){w=new H.R(0,null,null,null,null,null,0,[null,null])
z.Z(a,new Z.nQ(a,w))
return w}else if(!!z.$ise8){v=a.F()
v.p(0,"_class",a.gfZ())
return Z.d2(v)}else throw H.c("Function _dissolveToPrimitivess called with a non-saveable argument type.")}},
d1:function(a,b,c){var z,y,x,w,v,u
if(a==null||typeof a==="string"||typeof a==="number"&&Math.floor(a)===a||typeof a==="number"||typeof a==="boolean")return a
else{z=J.o(a)
if(!!z.$isN){y=[]
for(x=0;x<z.gl(a);++x)y.push(Z.d1(z.j(a,x),b,null))
return y}else{w=!!z.$isI
if(w&&!a.ad("_class")){v=new H.R(0,null,null,null,null,null,0,[null,null])
z.Z(a,new Z.nP(b,v))
return v}else if(w&&a.ad("_class"))if(c!=null){c.hE(a)
return c}else{u=z.j(a,"_class")
if(!b.ad(u))throw H.c(new Z.dD("Constructor for "+H.b(u)+" not set. Cannot assemble a new instance."))
else return b.j(0,u).$1(a)}else throw H.c("Function _assembleFromPrimitives called with a non-primitive argument type.")}}},
nR:function(a,b,c){a.c.Z(0,new Z.nS(b,c))}}},nQ:{"^":"a:6;a,b",
$2:function(a,b){if(Z.fU(this.a.j(0,a)))this.b.p(0,a,Z.d2(b))}},nP:{"^":"a:6;a,b",
$2:function(a,b){this.b.p(0,a,Z.d1(b,this.a,null))}},nS:{"^":"a:38;a,b",
$2:function(a,b){var z,y,x
z=this.a
y=z.j(0,a)
x=this.b
if(y==null)z.p(0,a,Z.d1(b,x,null))
else z.p(0,a,Z.d1(b,x,y))}},dD:{"^":"d;a",
k:function(a){return"IncompatibleSavegameException: "+this.a}},lW:{"^":"d;a",
k:function(a){return"InvalidSavegameException: "+this.a}}}],["","",,D,{"^":"",nk:{"^":"d;"},nj:{"^":"nk;"},m3:{"^":"nj;a,b,c,d,e,f,r,x",
ll:[function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
o=P.q
n=[o,P.d]
H.aM(a,"$isI",n,"$asI")
m=new A.u(a.j(0,"type"),null,null,null,null)
if(a.ad("strContent"))m.c=a.j(0,"strContent")
if(a.ad("listContent"))m.b=a.j(0,"listContent")
if(a.ad("intContent"))m.d=a.j(0,"intContent")
if(a.ad("mapContent"))m.e=H.aM(a.j(0,"mapContent"),"$isI",n,"$asI")
z=m
switch(z.ghC()){case 1070:o=this.e
if(o!=null){o.dF(new D.c4("Book Quit before choice was selected."))
this.e=null}o=this.b
o.a.bu()
o.b.bu()
return
case 1000:o=new A.u(667,null,null,null,null)
o.c="GET_BOOK_UID received."
n=this.a
n.G(o.F())
n.G(new A.u(10,null,this.c.ch,null,null).F())
return
case 1050:l=z.gkh()
this.e.bZ(l)
this.e=null
return
case 1060:o=new A.u(667,null,null,null,null)
o.c="New form state from player received."
this.a.G(o.F())
o=z.gkz()
if(!o.ad("__submitted__"))o.p(0,"__submitted__",!1)
n=this.r
if(n.b>=4)H.i(n.cC())
n.bU(new G.kk(o))
return
case 1080:o=new A.u(667,null,null,null,null)
o.c="Received slot machine result."
this.a.G(o.F())
k=J.aA(z.geS(),0)
j=J.aA(z.geS(),1)
o=this.x
if(k>>>0!==k||k>=4)return H.f(C.C,k)
o.bZ(new U.cp(C.C[k],j))
this.x=null
return
case 1010:o=new A.u(667,null,null,null,null)
o.c="Starting book from scratch."
n=this.a
n.G(o.F())
o=this.e
if(o!=null){o.dF(new D.c4("Book Restart before choice was selected."))
this.e=null}try{this.c.eY()}catch(i){y=H.C(i)
x=H.E(i)
o=new A.u(666,null,null,null,null)
o.c="An error occured when initializing: "+H.b(y)+".\n"+H.b(x)
n.G(o.F())
throw H.c(y)}o=new A.u(90,null,null,null,null)
o.b=Z.bQ()
n.G(o.F())
n.G(new A.cZ(0,0,null).dS().F())
return
case 1020:h=new A.u(667,null,null,null,null)
h.c="Loading a saved game."
g=this.a
g.G(h.F())
h=this.e
if(h!=null){h.dF(new D.c4("Book Load before choice was selected."))
this.e=null}try{h=z.gi5()
f=new Z.fT(null,null,null,null,null,null)
e=H.aM(C.w.jF(h),"$isI",n,"$asI")
if(!e.ad("currentPageName")||!e.ad("vars"))H.i(new Z.lW("Invalid JSON for Savegame. Doesn't contain required fields 'currentPageName' or 'vars'. JSON='"+H.b(h)+"'."))
f.e=e.j(0,"uid")
f.a=e.j(0,"currentPageName")
f.f=e.j(0,"timestamp")
f.b=H.aM(e.j(0,"pageMapState"),"$isI",n,"$asI")
f.c=H.aM(e.j(0,"vars"),"$isI",n,"$asI")
if(e.ad("previousText"))f.d=e.j(0,"previousText")
w=f
v=H.aM(J.j1(z.geS()),"$isbO",[o],"$asbO")
o=this.c
if(v!=null)o.hg(w,v)
else o.kx(w)}catch(i){o=H.C(i)
if(o instanceof Z.dD){u=o
t=H.E(i)
o=new A.u(666,null,null,null,null)
o.c="Load failed due to incompatibility: "+H.b(u)+".\n"+H.b(t)
g.G(o.F())
this.c.eY()}else{s=o
r=H.E(i)
o=new A.u(666,null,null,null,null)
o.c="Load failed for unknown reason: "+H.b(s)+".\n"+H.b(r)
g.G(o.F())
this.c.eY()}}try{o=new A.u(90,null,null,null,null)
o.b=Z.bQ()
g.G(o.F())}catch(i){q=H.C(i)
p=H.E(i)
o=new A.u(666,null,null,null,null)
o.c="Sending Stats failed for unknown reason: "+H.b(q)+".\n"+H.b(p)
g.G(o.F())
throw H.c(q)}this.c.toString
g.G(new A.cZ(0,$.$get$cy().a,null).dS().F())
return
case 1090:this.f.bZ(!0)
this.f=null
return
case 1040:this.c.bB()
return
default:o=new A.u(666,null,null,null,null)
o.c="Wrong message type received by Scripter - "+H.b(z.ghC())+"."
this.a.G(o.F())}},"$1","giX",2,0,21],
fa:function(a){var z=P.X
this.f=new P.cs(new P.H(0,$.r,null,[z]),[z])
z=new A.u(30,null,null,null,null)
z.c=a
this.a.G(z.F())
return this.f.a}},c4:{"^":"d;a",
k:function(a){return"AsyncOperationOverridenException: "+this.a+"."}}}],["","",,G,{"^":"",kk:{"^":"d;a",
F:function(){return P.cj(this.a,null,null)},
k:function(a){return"<CurrentState submitted="+H.b(this.a.j(0,"__submitted__"))+">"}}}],["","",,A,{"^":"",u:{"^":"d;hC:a<,eS:b<,i5:c<,kh:d<,kz:e<",
gl7:function(){var z=this.a
switch(z){case 10:return"SEND_BOOK_UID"
case 20:return"NO_RESULT"
case 30:return"TEXT_RESULT"
case 40:return"SHOW_CHOICES"
case 50:return"SAVE_GAME"
case 60:return"SAVE_PLAYER_CHRONOLOGY"
case 70:return"POINTS_AWARD"
case 80:return"END_OF_BOOK"
case 90:return"SET_STATS"
case 100:return"UPDATE_STATS"
case 110:return"SHOW_FORM"
case 120:return"UPDATE_FORM"
case 666:return"SCRIPTER_ERROR"
case 667:return"SCRIPTER_LOG"
case 1000:return"REQUEST_BOOK_UID"
case 1010:return"START"
case 1020:return"LOAD_GAME"
case 1040:return"PROCEED"
case 1050:return"CHOICE_SELECTED"
case 1060:return"FORM_INPUT"
case 130:return"SHOW_SLOT_MACHINE"
case 1090:return"TEXT_SHOWN"
case 1070:return"QUIT"
default:return"Unknown type="+H.b(z)}},
dR:function(){return C.w.h3(this.F())},
F:function(){var z,y
z=new H.R(0,null,null,null,null,null,0,[P.q,P.d])
z.p(0,"type",this.a)
y=this.c
if(y!=null)z.p(0,"strContent",y)
y=this.b
if(y!=null)z.p(0,"listContent",y)
y=this.d
if(y!=null)z.p(0,"intContent",y)
y=this.e
if(y!=null)z.p(0,"mapContent",y)
return z},
k:function(a){var z,y,x
z="Message "+this.gl7()
y=this.a
x=J.o(y)
return z+(x.A(y,50)||x.A(y,60)||x.A(y,90)||x.A(y,100)||x.A(y,666)||x.A(y,667)?" (async)":"")}}}],["","",,E,{"^":"",mY:{"^":"d;h:a@,l8:b<",
k:function(a){return this.a},
gdZ:function(){var z,y
z=this.a
if(z==null)throw H.c("Accessed groupName Page has name = null.")
y=J.iX(z,": ")
if(y>0)return J.j0(this.a,0,y)
else return}}}],["","",,A,{"^":"",cZ:{"^":"d;jw:a<,b,c",
k:function(a){var z="Score +"+H.b(this.a)+"."
return z},
dS:function(){var z=new A.u(70,null,null,null,null)
z.b=[this.a,this.b]
z.c=this.c
return z}}}],["","",,L,{"^":"",ac:{"^":"d;fb:a@,b,c,d,b9:e<,J:f<,h5:r<,x,y",
gko:function(){return this.e.length===0},
dH:function(a,b,c){if(this.a)return!1
if(this.e.length===0)return!1
b!=null
a!=null
if(c!=null&&c.$1(this)===!0)return!1
return!0},
kn:function(a,b){return this.dH(a,b,null)},
l3:function(){return P.a0(["string",this.e,"hash",this.d,"submenu",this.y,"helpMessage",this.f])},
c7:function(a){this.r=a
return this},
bD:function(a,b){return C.b.bD(this.e,b.gb9())},
k:function(a){return"Choice: "+this.e+" ["+H.b(this.x)+"] ("+this.d+")"},
i9:function(a,b,c,d,e,f,g){if(a==null)throw H.c(P.G("String given to choice cannot be null."))
this.e=J.bh(a).f2(a)
this.d=C.b.gD(a)
this.r=f
this.b=!1
this.c=!1},
$isV:1,
$asV:function(){return[L.ac]},
v:{
f1:function(a,b,c,d,e,f,g){var z=new L.ac(!1,null,null,null,null,e,null,d,g)
z.i9(a,!1,!1,d,e,f,g)
return z}}},f2:{"^":"fs;a,b",
gl:function(a){return this.b.length},
sl:function(a,b){C.a.sl(this.b,b)
return b},
j:function(a,b){var z=this.b
if(b>>>0!==b||b>=z.length)return H.f(z,b)
return z[b]},
p:function(a,b,c){var z=this.b
if(b>>>0!==b||b>=z.length)return H.f(z,b)
z[b]=c},
ju:function(a){var z,y,x,w,v,u,t,s,r,q,p,o
if(J.aA(a,0)!=null){if(0>=a.length)return H.f(a,0)
v=!!J.o(a[0]).$isbG}else v=!1
if(v)try{if(0>=a.length)return H.f(a,0)
this.a=a[0].$0()}catch(u){z=H.C(u)
v=M.eW(J.h(z))
throw H.c(v)}else this.a=null
for(v=this.b,t={func:1,ret:[P.Q,P.at]},s=1;s<a.length;++s){y=a[s]
x=null
if(J.aA(y,"string")!=null&&!!J.o(J.aA(y,"string")).$isbG)try{x=J.aA(y,"string").$0()}catch(u){w=H.C(u)
v=M.eW(J.h(w))
throw H.c(v)}else x=""
r=x
q=J.aA(y,"goto")
p=H.ii(J.aA(y,"script"),t)
o=new L.ac(!1,null,null,null,null,null,null,q,J.aA(y,"submenu"))
if(r==null)H.i(P.G("String given to choice cannot be null."))
o.e=J.bh(r).f2(r)
o.d=C.b.gD(r)
o.r=p
o.b=!1
o.c=!1
C.a.t(v,o)}},
jq:function(a,b,c,d,e,f,g){if(b instanceof L.ac)C.a.t(this.b,b)
else if(typeof b==="string")C.a.t(this.b,L.f1(b,!1,!1,e,null,f,g))
else throw H.c(P.G("To add a choice to choices, one must provide either a new Choice element or a String."))},
t:function(a,b){return this.jq(a,b,!1,!1,null,null,null)},
l4:function(a,b,c,d){var z,y,x,w
z=this.b
y=H.m(z,0)
x=P.P(new H.K(z,new L.jY(b,a,c),[y]),!0,y)
if(x.length===0)throw H.c("Choices is empty, but still choices.toMessage was called.")
w=new A.u(40,null,null,null,null)
z=[]
w.b=z
z.push(d)
z.push(this.a)
C.a.Z(x,new L.jZ(w))
return w},
dS:function(){return this.l4(null,null,null,null)},
k:function(a){var z=this.b
return new H.aq(z,new L.k_(),[H.m(z,0),null]).cm(0,", ")},
$asfs:function(){return[L.ac]},
$asfB:function(){return[L.ac]},
$asN:function(){return[L.ac]},
$asa_:function(){return[L.ac]}},jY:{"^":"a:0;a,b,c",
$1:function(a){return a.dH(this.b,this.a,this.c)}},jZ:{"^":"a:0;a",
$1:function(a){H.b(a)
J.dr(this.a.b,a.l3())
a.a=!0}},k_:{"^":"a:0;",
$1:function(a){return H.b(a)}}}],["","",,Z,{"^":"",d4:{"^":"d;dk:a<,b9:b<",
F:function(){return P.a0(["show",this.a,"string",this.b])}},oG:{"^":"d;a",
F:function(){var z=new H.R(0,null,null,null,null,null,0,[P.q,P.d])
this.a.Z(0,new Z.oH(z))
return z},
Z:function(a,b){this.a.Z(0,b)}},oH:{"^":"a:39;a",
$2:function(a,b){this.a.p(0,a,b.F())}},hx:{"^":"d;h:a@,aT:b<,h_:c<,dL:d<,dk:e<,hk:f<,b9:r<",v:{
hy:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=H.p(new Array(a.length),[Z.hx])
for(y=a.length,x=z.length,w=0,v=0;v<a.length;a.length===y||(0,H.as)(a),++v){u=a[v]
t=J.L(u)
s=t.j(u,"name")
r=t.j(u,"description")
q=t.j(u,"color")
p=t.j(u,"priority")
o=t.j(u,"show")
n=t.j(u,"notifyOnChange")
t=t.j(u,"string")
if(w>=x)return H.f(z,w)
z[w]=new Z.hx(s,r,q,p,o,n,t);++w}C.a.ce(z,new Z.pE())
return z}}},pE:{"^":"a:6;",
$2:function(a,b){return J.bC(b.gdL(),a.gdL())}},au:{"^":"d;h:a<,aT:b<,c,h_:d<,dL:e<,f,r,hk:x<,fX:y@,fZ:z<,$ti",
gae:function(){return this.f},
sae:function(a){if(!J.e(this.f,a)){this.f=a
this.y=!0
$.cr=!0}},
gdk:function(){return this.r},
gb9:function(){return this.c.$1(this.f)},
F:function(){return P.a0(["name",this.a,"value",this.f,"show",this.r])},
hE:function(a){var z
this.sae(H.iI(a.j(0,"value"),H.m(this,0)))
z=a.j(0,"show")
if(!J.e(this.r,z)){this.r=z
this.y=!0
$.cr=!0}},
$ise8:1,
v:{
bP:function(a,b,c,d,e,f,g,h){var z,y
z=$.$get$d5()
y=z.ad(a)?H.aM(z.j(0,a),"$isau",[h],"$asau"):new Z.au(a,d,b,c,f,null,null,!0,!1,"Stat",[null])
y.f=H.iI(e,h)
y.r=!0
z.p(0,a,y)
return y},
oJ:function(){var z,y
z=new Z.oG(new H.R(0,null,null,null,null,null,0,[P.q,Z.d4]))
y=$.$get$d5().gcz()
new H.K(y,new Z.oK(),[H.y(y,"B",0)]).Z(0,new Z.oL(z))
$.cr=!1
return z},
bQ:function(){var z=H.p([],[[P.I,P.q,P.d]])
$.$get$d5().gcz().Z(0,new Z.oI(z))
return z}}},oK:{"^":"a:0;",
$1:function(a){return a.gfX()}},oL:{"^":"a:27;a",
$1:function(a){var z,y
z=a.gdk()
y=a.gb9()
a.sfX(!1)
this.a.a.p(0,a.a,new Z.d4(z,y))}},oI:{"^":"a:27;a",
$1:function(a){var z=new H.R(0,null,null,null,null,null,0,[P.q,P.d])
z.p(0,"name",a.gh())
z.p(0,"description",a.gaT())
z.p(0,"color",a.gh_())
z.p(0,"priority",a.gdL())
z.p(0,"show",a.gdk())
z.p(0,"notifyOnChange",a.ghk())
z.p(0,"string",a.gb9())
this.a.push(z)}}}],["","",,N,{"^":"",dP:{"^":"d;h:a<,b,c,ix:d<,e,f",
gh7:function(){var z,y,x
z=this.b
y=z==null||J.e(z.gh(),"")
x=this.a
return y?x:z.gh7()+"."+x},
geR:function(){if($.is){var z=this.b
if(z!=null)return z.geR()}return $.rI},
ky:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p,o
x=a.b
if(x>=this.geR().b){if(!!J.o(b).$isbG)b=b.$0()
w=b
if(typeof w!=="string"){v=b
b=J.h(b)}else v=null
if(d==null&&x>=$.vd.b)try{x="autogenerated stack trace for "+a.k(0)+" "+H.b(b)
throw H.c(x)}catch(u){z=H.C(u)
y=H.E(u)
d=y
if(c==null)c=z}e=$.r
x=b
w=this.gh7()
t=c
s=d
r=Date.now()
q=$.ft
$.ft=q+1
p=new N.mu(a,x,v,w,new P.cP(r,!1),q,t,s,e)
if($.is)for(o=this;o!=null;){o.fJ(p)
o=o.b}else $.$get$fv().fJ(p)}},
co:function(a,b,c,d){return this.ky(a,b,c,d,null)},
jZ:function(a,b,c){return this.co(C.V,a,b,c)},
an:function(a){return this.jZ(a,null,null)},
jY:function(a,b,c){return this.co(C.U,a,b,c)},
bo:function(a){return this.jY(a,null,null)},
jX:function(a,b,c){return this.co(C.W,a,b,c)},
bP:function(a){return this.jX(a,null,null)},
kf:function(a,b,c){return this.co(C.B,a,b,c)},
he:function(a){return this.kf(a,null,null)},
l9:function(a,b,c){return this.co(C.Z,a,b,c)},
f4:function(a){return this.l9(a,null,null)},
i_:function(a,b,c){return this.co(C.Y,a,b,c)},
e_:function(a){return this.i_(a,null,null)},
fJ:function(a){},
v:{
bm:function(a){return $.$get$fu().kM(a,new N.tu(a))}}},tu:{"^":"a:2;a",
$0:function(){var z,y,x,w
z=this.a
if(C.b.dl(z,"."))H.i(P.G("name shouldn't start with a '.'"))
y=C.b.kv(z,".")
if(y===-1)x=z!==""?N.bm(""):null
else{x=N.bm(C.b.aM(z,0,y))
z=C.b.bK(z,y+1)}w=new H.R(0,null,null,null,null,null,0,[P.q,N.dP])
w=new N.dP(z,x,null,w,new P.hA(w,[null,null]),null)
if(x!=null)x.gix().p(0,z,w)
return w}},aZ:{"^":"d;h:a<,ae:b<",
A:function(a,b){if(b==null)return!1
return b instanceof N.aZ&&this.b===b.b},
b0:function(a,b){return C.e.b0(this.b,b.gae())},
df:function(a,b){var z=b.gae()
if(typeof z!=="number")return H.x(z)
return this.b<=z},
bk:function(a,b){var z=b.gae()
if(typeof z!=="number")return H.x(z)
return this.b>z},
bT:function(a,b){return this.b>=b.gae()},
bD:function(a,b){var z=b.gae()
if(typeof z!=="number")return H.x(z)
return this.b-z},
gD:function(a){return this.b},
k:function(a){return this.a},
$isV:1,
$asV:function(){return[N.aZ]}},mu:{"^":"d;eR:a<,b,aW:c<,d,V:e<,f,bv:r<,br:x<,y",
k:function(a){return"["+this.a.a+"] "+this.d+": "+H.b(this.b)}}}],["","",,X,{"^":"",
bB:function(a){return X.df(J.iU(a,0,new X.uR()))},
b2:function(a,b){var z=J.ao(a,b)
if(typeof z!=="number")return H.x(z)
a=536870911&z
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
df:function(a){if(typeof a!=="number")return H.x(a)
a=536870911&a+((67108863&a)<<3)
a^=a>>>11
return 536870911&a+((16383&a)<<15)},
uR:{"^":"a:6;",
$2:function(a,b){return X.b2(a,J.j(b))}},
dX:{"^":"ce;a,$ti",
gae:function(){var z=this.a
if(z==null)throw H.c(new P.w("value called on absent Optional."))
return z},
b4:function(a){var z=this.a
return z==null?a:z},
ga_:function(a){var z=this.a
if(z!=null){z=H.p([z],this.$ti)
z=new J.bj(z,1,0,null,[H.m(z,0)])}else z=C.K
return z},
gD:function(a){return J.j(this.a)},
A:function(a,b){var z,y
if(b==null)return!1
if(b instanceof X.dX){z=b.a
y=this.a
y=z==null?y==null:z===y
z=y}else z=!1
return z},
k:function(a){var z=this.a
return z==null?"Optional { absent }":"Optional { value: "+H.b(z)+" }"},
ib:function(a,b){if(this.a==null)throw H.c(P.G("Must not be null."))},
v:{
fF:function(a,b){var z=new X.dX(a,[b])
z.ib(a,b)
return z}}}}],["","",,U,{"^":"",d0:{"^":"d;a,b",
k:function(a){return this.b}},cp:{"^":"d;a,la:b<",
geO:function(){return this.a===C.G},
k:function(a){return"SessionResult<"+this.a.b+",wasRerolled="+H.b(this.b)+">"},
A:function(a,b){if(b==null)return!1
return b instanceof U.cp&&b.a===this.a&&J.e(b.b,this.b)},
gD:function(a){return(this.b===!0?2:1)*100+this.a.a}}}],["","",,X,{"^":"",
xQ:[function(a,b){var z,y,x,w,v
z=new D.m3(b,null,null,null,null,null,null,null)
y=$.fQ
$.fQ=y+1
x=new H.cn(y,null,!1)
w=init.globalState.d
w.e4(y,x)
w.cO()
w=new H.nA(x,null)
w.ie(x)
z.b=w
w=w.b
w.toString
new P.d8(w,[H.m(w,0)]).aI(z.giX(),null,null,null)
b.G(new H.cv(z.b.a,init.globalState.d.a))
v=N.nX()
z.c=v
v.Q=z},"$2","ic",4,0,36]},1]]
setupProgram(dart,0)
J.o=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.fj.prototype
return J.fi.prototype}if(typeof a=="string")return J.ci.prototype
if(a==null)return J.fk.prototype
if(typeof a=="boolean")return J.fh.prototype
if(a.constructor==Array)return J.cg.prototype
if(!(a instanceof P.d))return J.bs.prototype
return a}
J.az=function(a){if(a==null)return a
if(a.constructor==Array)return J.cg.prototype
if(!(a instanceof P.d))return J.bs.prototype
return a}
J.L=function(a){if(typeof a=="string")return J.ci.prototype
if(a==null)return a
if(a.constructor==Array)return J.cg.prototype
if(!(a instanceof P.d))return J.bs.prototype
return a}
J.am=function(a){if(typeof a=="number")return J.ch.prototype
if(a==null)return a
if(!(a instanceof P.d))return J.bs.prototype
return a}
J.eB=function(a){if(typeof a=="number")return J.ch.prototype
if(typeof a=="string")return J.ci.prototype
if(a==null)return a
if(!(a instanceof P.d))return J.bs.prototype
return a}
J.bh=function(a){if(typeof a=="string")return J.ci.prototype
if(a==null)return a
if(!(a instanceof P.d))return J.bs.prototype
return a}
J.ao=function(a,b){if(typeof a=="number"&&typeof b=="number")return a+b
return J.eB(a).aj(a,b)}
J.b5=function(a,b){if(typeof a=="number"&&typeof b=="number")return a/b
return J.am(a).dd(a,b)}
J.e=function(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.o(a).A(a,b)}
J.ab=function(a,b){if(typeof a=="number"&&typeof b=="number")return a>b
return J.am(a).bk(a,b)}
J.c0=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<b
return J.am(a).b0(a,b)}
J.c1=function(a,b){if(typeof a=="number"&&typeof b=="number")return a*b
return J.eB(a).cb(a,b)}
J.iS=function(a){if(typeof a=="number")return-a
return J.am(a).f8(a)}
J.bC=function(a,b){if(typeof a=="number"&&typeof b=="number")return a-b
return J.am(a).at(a,b)}
J.aA=function(a,b){if(typeof b==="number")if(a.constructor==Array||typeof a=="string")if(b>>>0===b&&b<a.length)return a[b]
return J.L(a).j(a,b)}
J.dr=function(a,b){return J.az(a).t(a,b)}
J.iT=function(a,b,c,d,e,f,g,h,i,j,k,l,m,n){return J.az(a).jj(a,b,c,d,e,f,g,h,i,j,k,l,m,n)}
J.c2=function(a,b,c){return J.az(a).n(a,b,c)}
J.bD=function(a,b){return J.eB(a).bD(a,b)}
J.ds=function(a,b){return J.L(a).a7(a,b)}
J.eQ=function(a,b){return J.az(a).au(a,b)}
J.iU=function(a,b,c){return J.az(a).bw(a,b,c)}
J.j=function(a){return J.o(a).gD(a)}
J.eR=function(a){return J.L(a).gY(a)}
J.aj=function(a){return J.az(a).ga_(a)}
J.iV=function(a){return J.az(a).gw(a)}
J.aN=function(a){return J.L(a).gl(a)}
J.iW=function(a){return J.o(a).gbz(a)}
J.iX=function(a,b){return J.L(a).b3(a,b)}
J.eS=function(a,b){return J.az(a).aJ(a,b)}
J.iY=function(a,b,c){return J.bh(a).hh(a,b,c)}
J.dt=function(a,b,c){return J.bh(a).kQ(a,b,c)}
J.cE=function(a,b,c){return J.bh(a).d5(a,b,c)}
J.iZ=function(a){return J.am(a).hx(a)}
J.j_=function(a,b){return J.az(a).e1(a,b)}
J.eT=function(a,b){return J.bh(a).dl(a,b)}
J.j0=function(a,b,c){return J.bh(a).aM(a,b,c)}
J.j1=function(a){return J.az(a).bG(a)}
J.h=function(a){return J.o(a).k(a)}
J.c3=function(a,b){return J.am(a).bj(a,b)}
J.j2=function(a,b){return J.az(a).c9(a,b)}
I.aX=function(a){a.immutable$list=Array
a.fixed$length=Array
return a}
var $=I.p
C.N=J.aY.prototype
C.a=J.cg.prototype
C.O=J.fh.prototype
C.u=J.fi.prototype
C.e=J.fj.prototype
C.P=J.fk.prototype
C.j=J.ch.prototype
C.b=J.ci.prototype
C.H=new A.ap(0,0,0)
C.I=new A.ap(-1/0,-1/0,-1/0)
C.J=new A.cG(-10,0,100)
C.K=new H.l7([null])
C.L=new P.mX()
C.v=new P.qA()
C.M=new P.qT()
C.i=new P.r7()
C.x=new P.b8(0)
C.y=new U.cU(0,"ItemType.fist")
C.z=new U.cU(1,"ItemType.shield")
C.r=new U.cU(2,"ItemType.spear")
C.A=new U.cU(3,"ItemType.sword")
C.Q=function getTagFallback(o) {
  var s = Object.prototype.toString.call(o);
  return s.substring(8, s.length - 1);
}
C.w=new P.m8(null,null)
C.R=new P.ma(null)
C.S=new P.mb(null,null)
C.T=new O.mj(0,"KnownToMode.all")
C.U=new N.aZ("FINER",400)
C.V=new N.aZ("FINEST",300)
C.W=new N.aZ("FINE",500)
C.B=new N.aZ("INFO",800)
C.X=new N.aZ("OFF",2000)
C.Y=new N.aZ("SEVERE",1000)
C.Z=new N.aZ("WARNING",900)
C.G=new U.d0(0,"Result.success")
C.a6=new U.d0(1,"Result.failure")
C.a7=new U.d0(2,"Result.criticalSuccess")
C.a8=new U.d0(3,"Result.criticalFailure")
C.C=I.aX([C.G,C.a6,C.a7,C.a8])
C.a_=I.aX(["cave_with_agruth","guardpost_above_church","orcthorn_room","slave_quarters_passage","smelter","underground_church","war_forge"])
C.a0=I.aX([C.y])
C.a1=I.aX([C.z])
C.D=I.aX([C.r])
C.o=I.aX([C.A])
C.d=I.aX([])
C.a2=I.aX(['Briana spits on the floor. "Can\'t wait to see some actual architecture \n  when we get out of here."',"Somewhere in the distance, there are yells that rise in intensity, \n  then suddenly stop entirely.",'Briana turns to you with an intense whisper. \n  "You know, I _have_ a right to hate orcs." \n  \n  "I didn\'t know people need to have a right to hate them, to be honest." \n  \n  She observes you for a moment. "I\'m glad we are in agreement."',"More yells from the distance.","Briana stops and listens for a moment. \"Aren, we're pushing our luck. \n  I'd hate to go all this way only to get \n  my head smashed in by some random orc patrol."])
C.a3=new H.k9(0,{},C.d,[null,null])
C.a4=new X.dX(null,[P.M])
C.k=new R.e_(0,"Pose.standing")
C.h=new R.e_(1,"Pose.offBalance")
C.f=new R.e_(2,"Pose.onGround")
C.l=new K.e0(0,"Predetermination.none")
C.p=new K.e0(1,"Predetermination.successGuaranteed")
C.m=new K.e0(2,"Predetermination.failureGuaranteed")
C.t=new Y.ck("he","him","his","himself")
C.n=new Y.ck("it","it","its","itself")
C.a5=new Y.ck("she","her","her","herself")
C.E=new Y.ck("they","them","their","themselves")
C.F=new Y.ck("you","you","your","yourself")
C.c=new Q.nF(0,"Resource.stamina")
C.a9=H.bf("fl")
C.aa=H.bf("at")
C.ab=H.bf("q")
C.ac=H.bf("X")
C.ad=H.bf("aW")
C.q=H.bf("dynamic")
C.ae=H.bf("t")
C.af=H.bf("M")
C.ag=new P.bT(null,2)
$.fQ=1
$.fJ="$cachedFunction"
$.fK="$cachedInvocation"
$.aO=0
$.bE=null
$.eY=null
$.bv=null
$.bW=null
$.bX=null
$.er=!1
$.r=C.i
$.fa=0
$.eC=null
$.hU=!1
$.rA=null
$.hW=!1
$.it=!0
$.cr=!1
$.is=!1
$.vd=C.X
$.rI=C.B
$.ft=0
$=null
init.isHunkLoaded=function(a){return!!$dart_deferred_initializers$[a]}
init.deferredInitialized=new Object(null)
init.isHunkInitialized=function(a){return init.deferredInitialized[a]}
init.initializeLoadedHunk=function(a){$dart_deferred_initializers$[a]($globals$,$)
init.deferredInitialized[a]=true}
init.deferredLibraryUris={}
init.deferredLibraryHashes={};(function(a){for(var z=0;z<a.length;){var y=a[z++]
var x=a[z++]
var w=a[z++]
I.$lazy(y,x,w)}})(["fe","$get$fe",function(){return H.m1()},"ff","$get$ff",function(){if(typeof WeakMap=="function")var z=new WeakMap()
else{z=$.fa
$.fa=z+1
z="expando$key$"+z}return new P.ld(null,z,[P.t])},"hm","$get$hm",function(){return H.aQ(H.d7({
toString:function(){return"$receiver$"}}))},"hn","$get$hn",function(){return H.aQ(H.d7({$method$:null,
toString:function(){return"$receiver$"}}))},"ho","$get$ho",function(){return H.aQ(H.d7(null))},"hp","$get$hp",function(){return H.aQ(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"ht","$get$ht",function(){return H.aQ(H.d7(void 0))},"hu","$get$hu",function(){return H.aQ(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"hr","$get$hr",function(){return H.aQ(H.hs(null))},"hq","$get$hq",function(){return H.aQ(function(){try{null.$method$}catch(z){return z.message}}())},"hw","$get$hw",function(){return H.aQ(H.hs(void 0))},"hv","$get$hv",function(){return H.aQ(function(){try{(void 0).$method$}catch(z){return z.message}}())},"eg","$get$eg",function(){return P.qi()},"bl","$get$bl",function(){var z,y
z=P.at
y=new P.H(0,P.pV(),null,[z])
y.im(null,z)
return y},"bY","$get$bY",function(){return[]},"dj","$get$dj",function(){return new K.cc("fist",P.aD(C.a0,null))},"bK","$get$bK",function(){return N.bm("PlannerRecommendation")},"ie","$get$ie",function(){return new K.rU()},"ez","$get$ez",function(){var z=$.$get$ie()
return K.a1("__END_OF_ROAM__",z,z,null,null,[],"ground")},"a9","$get$a9",function(){return P.e5(null)},"bM","$get$bM",function(){return P.e5(null)},"iv","$get$iv",function(){return N.bm("Storyline")},"ha","$get$ha",function(){return P.bp("(\\w)([\\.\\?\\!])([\"'])\\.(?=$|\\s)",!0,!1)},"bz","$get$bz",function(){return L.ef(new L.tt())},"aL","$get$aL",function(){return L.ef(new L.tP())},"dm","$get$dm",function(){return L.ef(new L.ts())},"dY","$get$dY",function(){return new F.n1("Sometimes, patience pays off. Especially when the other option is potentially dangerous.",!1,!0,!1,null,null)},"ex","$get$ex",function(){return Y.c8(!1,"balance",!0,C.n,$.$get$aL())},"iz","$get$iz",function(){return Y.c8(!1,"pounding",!1,C.n,$.$get$aL())},"fR","$get$fR",function(){return new B.nD("Most moves are easier and more effective when you are firmly in balance.",!1,!0,!1,null,null)},"fV","$get$fV",function(){return new O.nT(null,!1,!0,!1,null,null)},"h9","$get$h9",function(){return new Q.oC(null,!1,!0,!0,C.c,null)},"hz","$get$hz",function(){return new M.pF("",!0,C.c,!1,!0,null)},"hV","$get$hV",function(){return P.e5(null)},"eX","$get$eX",function(){return new Z.jB(!1,!0,!1,null,null)},"iL","$get$iL",function(){return Y.c8(!1,"swing",!0,C.n,$.$get$aL())},"iK","$get$iK",function(){return Y.c8(!1,"swing",!0,C.n,$.$get$aL())},"iJ","$get$iJ",function(){return Y.c8(!1,"swing",!0,C.n,$.$get$aL())},"fH","$get$fH",function(){return X.fF(0,P.M)},"fI","$get$fI",function(){return X.fF(1,P.M)},"h3","$get$h3",function(){return new D.ox(!1,!1,!0,null,null)},"cA","$get$cA",function(){return G.pg(!1,!0,"Orcthorn",!0,2,2)},"eq","$get$eq",function(){return Z.oB(!1,!1,"spear",!1,1)},"ew","$get$ew",function(){return new O.pH(1e4)},"i8","$get$i8",function(){return K.a1("cave_with_agruth_pre",new V.tn(),new V.to(),null,null,H.p([new Q.v("cave_with_agruth","","You look around.",null)],[Q.v]),"ground")},"i7","$get$i7",function(){return K.a1("cave_with_agruth",new V.tl(),new V.tm(),null,null,H.p([new Q.v("underground_church","Go to the Unholy Church","You make it to the Church undetected.",null),new Q.v("war_forge","Go to the war forges","You sneak your way through the black passage, closing towards the sound of hundreds of anvils.",null),new Q.v("slave_quarters_passage","Go to the slave quarters","You and Briana hug the wall and start towards the slave quarters.",null)],[Q.v]),"ground")},"fW","$get$fW",function(){return new V.oi("Search Agruth","search_agruth",!0,null)},"ig","$get$ig",function(){return K.a1("exit_from_bloodrock",new V.tj(),new V.tk(),null,null,H.p([new Q.v("__END_OF_ROAM__"," (UNIMPLEMENTED)","...",null)],[Q.v]),"ground")},"ih","$get$ih",function(){return K.a1("forge_church_crevice",new V.th(),new V.ti(),null,null,H.p([new Q.v("tunnel","Continue along the crevice","You continue until the crevice open into a tunnel. You can smell fresh air.",null)],[Q.v]),"ground")},"ir","$get$ir",function(){return K.a1("guardpost_above_church",new V.te(),new V.tf(),null,null,H.p([new Q.v("underground_church","Descend towards the Underground Church","You take the passage leading down towards the temple.",null),new Q.v("tunnel","Go to the upper gate","You take the passage that leads to the Upper Door and soon find yourself climbing a steep, poorly lit stairway.",null),new Q.v("smelter","Go to the smelter","You take the slightly downwards passage towards the smelter.",null)],[Q.v]),"ground")},"fd","$get$fd",function(){return new V.lH("Cautiously take the shield","guardpost_above_church_take_shield",!0,null)},"iu","$get$iu",function(){return K.a1("just_after_agruth_fight",new V.tc(),new V.td(),null,null,H.p([],[Q.v]),"ground")},"fy","$get$fy",function(){return new V.mD('"Luck Bringer"',"name_agruth_sword_opportunity",!0,null)},"fz","$get$fz",function(){return new V.mE('"Savior"',"name_agruth_sword_redemption",!0,null)},"fx","$get$fx",function(){return new V.mC("No name","name_agruth_sword_nothing",!0,null)},"ix","$get$ix",function(){return K.a1("orcthorn_door",new V.ta(),new V.tb(),null,null,H.p([new Q.v("cave_with_agruth","Go to the cave with Agruth's corpse","You back out from the door, and go back where you left Agruth's body.",null),new Q.v("slave_quarters","Go further towards the Gate of Screams","TODO",null),new Q.v("orcthorn_room","Open the door","You open the door.",null)],[Q.v]),"ground")},"iy","$get$iy",function(){return K.a1("orcthorn_room",new V.t8(),new V.t9(),O.wV(),null,H.p([new Q.v("slave_quarters_passage","Exit the room","You leave through the door and find yourself back in the corridor of the slave quarters.",null)],[Q.v]),"ground")},"hf","$get$hf",function(){return new V.po("Search for Orcthorn","take_orcthorn",!0,null)},"iA","$get$iA",function(){return K.a1("slave_quarters",new V.t6(),new V.t7(),null,null,H.p([],[Q.v]),"ground")},"h1","$get$h1",function(){return new V.ov("Continue","slave_quarters_continue",!0,null)},"iB","$get$iB",function(){return K.a1("slave_quarters_passage",new V.t3(),new V.t4(),O.wW(),null,H.p([new Q.v("cave_with_agruth","Go back to the cave with Agruth's corpse","You back out from the door, and go back where you left Agruth's body.",null),new Q.v("slave_quarters","Go further towards the Gate of Screams","TODO",null),new Q.v("orcthorn_room","Open the door","You open the door.",null)],[Q.v]),"ground")},"h2","$get$h2",function(){return new V.ow("Examine the door","slave_quarters_passage_examine_door",!0,null)},"iC","$get$iC",function(){return K.a1("smelter",new V.t1(),new V.t2(),null,null,H.p([new Q.v("war_forge","Go to the war forges","You walk through a short passage set in stone, towards the sound of hundreds of anvils.",null),new Q.v("guardpost_above_church","Go through the smooth passage","You take the smooth passage and it leads you slightly upwards.",null)],[Q.v]),"ground")},"h4","$get$h4",function(){return new V.oz("Look around","smelter_look_around",!0,null)},"h5","$get$h5",function(){return new V.oA("Throw spear at the ogre","smelter_throw_spear",!0,null)},"iD","$get$iD",function(){return K.a1("start_adventure",new V.t_(),new V.t0(),O.wT(),null,H.p([new Q.v("just_after_agruth_fight","","You look around. Fortunately, nobody is in sight.",null)],[Q.v]),"ground")},"hh","$get$hh",function(){return new V.pq("Talk to Briana","talk_to_briana_1",!0,null)},"hi","$get$hi",function(){return new V.pr("Ask Briana about her capture","talk_to_briana_2",!0,null)},"hj","$get$hj",function(){return new V.ps("Ask Briana about Orcthorn","talk_to_briana_3",!0,null)},"iM","$get$iM",function(){return K.a1("the_shafts",new V.rY(),new V.rZ(),null,null,H.p([new Q.v("tunnel","Run","You run over the passage. Orcs start to scream and yell commands. As you near the entrance, the air gets better.",null)],[Q.v]),"ground")},"iO","$get$iO",function(){return K.a1("tunnel",new V.tN(),new V.tO(),O.wU(),null,H.p([new Q.v("exit_from_bloodrock","Start running again","You start running again.",null)],[Q.v]),"ground")},"iP","$get$iP",function(){return K.a1("underground_church",new V.tC(),new V.tM(),null,null,H.p([new Q.v("guardpost_above_church","Enter the upwards passage","You take the sloping passage and go a long, slightly rising way.",null),new Q.v("cave_with_agruth","Go back to the cave with Agruth's corpse","You sneak out of the church, back towards where you left Agruth's body.",null),new Q.v("underground_church_altar","Go towards the altar","You sneak towards the front of the temple, trying to stay in the shadows.",null)],[Q.v]),"ground")},"f9","$get$f9",function(){return new V.lc("Look around","examine_underground_church",!0,null)},"iQ","$get$iQ",function(){return K.a1("underground_church_altar",new V.tg(),new V.tr(),null,null,H.p([new Q.v("underground_church","Sneak back","You crouch low and, keeping an eye on the altar, head back to the Church's entrance.",null)],[Q.v]),"ground")},"hB","$get$hB",function(){return new V.pJ("Wait","wait_for_ritual",!0,null)},"hg","$get$hg",function(){return new V.pp("Take the spear","take_spear_in_underground_church",!0,null)},"iR","$get$iR",function(){return K.a1("war_forge",new V.rV(),new V.t5(),null,null,H.p([new Q.v("smelter","Go to smelter","You keep low, ascending the stairs. At the top you sense a draft of hot air coming from a passage through the wall. You make your way through it.",null),new Q.v("cave_with_agruth","Go back to the cave with Agruth's corpse","You sneak back towards where you left Agruth's body.",null)],[Q.v]),"ground")},"hC","$get$hC",function(){return new V.pK("Look around","war_forge_look_around",!0,null)},"hD","$get$hD",function(){return new V.pL("Watch the workers","war_forge_watch_workers",!0,null)},"i2","$get$i2",function(){return H.p([$.$get$i8(),$.$get$i7(),$.$get$ig(),$.$get$ih(),$.$get$ir(),$.$get$iu(),$.$get$ix(),$.$get$iy(),$.$get$iA(),$.$get$iB(),$.$get$iC(),$.$get$iD(),$.$get$iM(),$.$get$iO(),$.$get$iP(),$.$get$iQ(),$.$get$iR()],[K.co])},"i1","$get$i1",function(){return H.p([$.$get$fW(),$.$get$fd(),$.$get$fy(),$.$get$fz(),$.$get$fx(),$.$get$hf(),$.$get$h1(),$.$get$h2(),$.$get$h4(),$.$get$h5(),$.$get$hh(),$.$get$hi(),$.$get$hj(),$.$get$f9(),$.$get$hB(),$.$get$hg(),$.$get$hC(),$.$get$hD()],[A.W])},"dq","$get$dq",function(){return P.pe("")},"cy","$get$cy",function(){var z=new O.ne(0,null,"PointsCounter")
z.ic()
return z},"bZ","$get$bZ",function(){return new L.f2(null,H.p([],[L.ac]))},"cD","$get$cD",function(){return H.fo(P.q,P.d)},"cx","$get$cx",function(){return P.bb(null,{func:1,ret:[P.Q,P.at]})},"cN","$get$cN",function(){return P.bp("^\\s*<<<\\s*$",!0,!1)},"d5","$get$d5",function(){return H.fo(P.q,Z.au)},"fv","$get$fv",function(){return N.bm("")},"fu","$get$fu",function(){return P.dN(P.q,N.dP)}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=[null,!1]
init.types=[{func:1,args:[,]},{func:1,ret:P.q,args:[R.A,A.a4,Y.a3]},{func:1},{func:1,args:[,,,]},{func:1,ret:Q.z,args:[R.A]},{func:1,args:[R.A,A.a4,Y.a3]},{func:1,args:[,,]},{func:1,v:true},{func:1,v:true,args:[R.A,A.a4,Y.a3,R.A,S.ae]},{func:1,args:[P.t]},{func:1,ret:R.A,args:[A.a4]},{func:1,v:true,args:[R.A,A.a4,Y.a3,R.A,,]},{func:1,ret:U.cS,args:[A.a4,F.J,[P.B,R.A]]},{func:1,args:[U.ca]},{func:1,ret:P.q,args:[P.t]},{func:1,v:true,args:[{func:1,v:true}]},{func:1,v:true,args:[P.q]},{func:1,args:[,P.b1]},{func:1,v:true,args:[P.d],opt:[P.b1]},{func:1,args:[P.aW]},{func:1,ret:P.Q},{func:1,v:true,args:[P.d]},{func:1,ret:Y.aC,args:[P.t]},{func:1,ret:P.q,args:[P.q]},{func:1,args:[R.A]},{func:1,ret:P.X,args:[R.A,R.A]},{func:1,args:[,,,,]},{func:1,args:[Z.au]},{func:1,ret:P.M,args:[A.ap]},{func:1,ret:Q.cd,args:[U.ad]},{func:1,args:[P.M,R.A]},{func:1,args:[P.X]},{func:1,ret:P.M,args:[A.cG]},{func:1,args:[P.t,,]},{func:1,v:true,args:[P.t]},{func:1,ret:P.X,args:[L.ac]},{func:1,v:true,args:[[P.N,P.q],P.fX]},{func:1,args:[L.ac]},{func:1,args:[P.q,,]},{func:1,args:[P.q,Z.d4]},{func:1,v:true,args:[,P.b1]},{func:1,args:[[P.N,Y.ai],Y.ai]},{func:1,ret:P.t,args:[P.V,P.V]},{func:1,args:[Y.ai]},{func:1,ret:P.M,args:[P.M,P.M]},{func:1,ret:P.t,args:[P.t,P.t]},{func:1,args:[P.bn]},{func:1,args:[{func:1,v:true}]},{func:1,v:true,args:[P.d,P.b1]},{func:1,ret:P.q,args:[Q.ag]},{func:1,ret:Q.c9,args:[Q.v]},{func:1,ret:P.X,args:[P.t]},{func:1,args:[,],opt:[,]},{func:1,ret:L.ac,args:[P.q],named:{deferToChoiceList:P.X,deferToEndOfPage:P.X,goto:P.q,helpMessage:P.q,script:{func:1,ret:[P.Q,P.at]},submenu:P.q}},{func:1,ret:[P.Q,U.cp],args:[P.aW,P.q],named:{rerollEffectDescription:P.q,rerollable:P.X}}]
function convertToFastObject(a){function MyClass(){}MyClass.prototype=a
new MyClass()
return a}function convertToSlowObject(a){a.__MAGIC_SLOW_PROPERTY=1
delete a.__MAGIC_SLOW_PROPERTY
return a}A=convertToFastObject(A)
B=convertToFastObject(B)
C=convertToFastObject(C)
D=convertToFastObject(D)
E=convertToFastObject(E)
F=convertToFastObject(F)
G=convertToFastObject(G)
H=convertToFastObject(H)
J=convertToFastObject(J)
K=convertToFastObject(K)
L=convertToFastObject(L)
M=convertToFastObject(M)
N=convertToFastObject(N)
O=convertToFastObject(O)
P=convertToFastObject(P)
Q=convertToFastObject(Q)
R=convertToFastObject(R)
S=convertToFastObject(S)
T=convertToFastObject(T)
U=convertToFastObject(U)
V=convertToFastObject(V)
W=convertToFastObject(W)
X=convertToFastObject(X)
Y=convertToFastObject(Y)
Z=convertToFastObject(Z)
function init(){I.p=Object.create(null)
init.allClasses=map()
init.getTypeFromName=function(a){return init.allClasses[a]}
init.interceptorsByTag=map()
init.leafTags=map()
init.finishedClasses=map()
I.$lazy=function(a,b,c,d,e){if(!init.lazies)init.lazies=Object.create(null)
init.lazies[a]=b
e=e||I.p
var z={}
var y={}
e[a]=z
e[b]=function(){var x=this[a]
if(x==y)H.wP(d||a)
try{if(x===z){this[a]=y
try{x=this[a]=c()}finally{if(x===z)this[a]=null}}return x}finally{this[b]=function(){return this[a]}}}}
I.$finishIsolateConstructor=function(a){var z=a.p
function Isolate(){var y=Object.keys(z)
for(var x=0;x<y.length;x++){var w=y[x]
this[w]=z[w]}var v=init.lazies
var u=v?Object.keys(v):[]
for(var x=0;x<u.length;x++)this[v[u[x]]]=null
function ForceEfficientMap(){}ForceEfficientMap.prototype=this
new ForceEfficientMap()
for(var x=0;x<u.length;x++){var t=v[u[x]]
this[t]=z[t]}}Isolate.prototype=a.prototype
Isolate.prototype.constructor=Isolate
Isolate.p=z
Isolate.aX=a.aX
Isolate.bg=a.bg
return Isolate}}(function(a){if(typeof document==="undefined"){a(null)
return}if(typeof document.currentScript!='undefined'){a(document.currentScript)
return}var z=document.scripts
function onLoad(b){for(var x=0;x<z.length;++x)z[x].removeEventListener("load",onLoad,false)
a(b.target)}for(var y=0;y<z.length;++y)z[y].addEventListener("load",onLoad,false)})(function(a){init.currentScript=a
if(typeof dartMainRunner==="function")dartMainRunner(function(b){H.iE(X.ic(),b)},[])
else (function(b){H.iE(X.ic(),b)})([])})})()