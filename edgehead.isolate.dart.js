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
if(b5.$isaZ)b5.$deferredAction()}var a3=Object.keys(a4.pending)
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
e.$callName=null}}function tearOffGetter(c,d,e,f){return f?new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"(x) {"+"if (c === null) c = "+"H.ez"+"("+"this, funcs, reflectionInfo, false, [x], name);"+"return new c(this, funcs[0], x, name);"+"}")(c,d,e,H,null):new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"() {"+"if (c === null) c = "+"H.ez"+"("+"this, funcs, reflectionInfo, false, [], name);"+"return new c(this, funcs[0], null, name);"+"}")(c,d,e,H,null)}function tearOff(c,d,e,f,a0){var g
return e?function(){if(g===void 0)g=H.ez(this,c,d,true,[],f).prototype
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
aZ:{"^":"d;",
A:function(a,b){return a===b},
gB:function(a){return H.aF(a)},
k:function(a){return H.d0(a)},
gbz:function(a){return new H.aw(H.iq(a),null)}},
fi:{"^":"aZ;",
k:function(a){return String(a)},
gB:function(a){return a?519018:218159},
gbz:function(a){return C.ac},
$isX:1},
fl:{"^":"aZ;",
A:function(a,b){return null==b},
k:function(a){return"null"},
gB:function(a){return 0},
gbz:function(a){return C.aa},
$isau:1},
fo:{"^":"aZ;",
gB:function(a){return 0},
gbz:function(a){return C.a9},
k:function(a){return String(a)},
$isfm:1},
xm:{"^":"fo;"},
bt:{"^":"fo;"},
ch:{"^":"aZ;$ti",
fX:function(a,b){if(!!a.immutable$list)throw H.c(new P.S(b))},
cQ:function(a,b){if(!!a.fixed$length)throw H.c(new P.S(b))},
t:function(a,b){this.cQ(a,"add")
a.push(b)},
hs:function(a){this.cQ(a,"removeLast")
if(a.length===0)throw H.c(H.aL(a,-1))
return a.pop()},
a3:function(a,b){var z
this.cQ(a,"remove")
for(z=0;z<a.length;++z)if(J.e(a[z],b)){a.splice(z,1)
return!0}return!1},
j2:function(a,b,c){var z,y,x,w,v
z=[]
y=a.length
for(x=0;x<y;++x){w=a[x]
if(b.$1(w)!==!0===c)z.push(w)
if(a.length!==y)throw H.c(new P.D(a))}v=z.length
if(v===y)return
this.sl(a,v)
for(x=0;x<z.length;++x)a[x]=z[x]},
c9:function(a,b){return new H.K(a,b,[H.l(a,0)])},
ax:function(a,b){var z
this.cQ(a,"addAll")
for(z=J.aj(b);z.u();)a.push(z.d)},
Z:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){b.$1(a[y])
if(a.length!==z)throw H.c(new P.D(a))}},
aJ:function(a,b){return new H.ar(a,b,[H.l(a,0),null])},
e1:function(a,b){return H.hf(a,b,null,H.l(a,0))},
bw:function(a,b,c){var z,y,x
z=a.length
for(y=b,x=0;x<z;++x){y=c.$2(y,a[x])
if(a.length!==z)throw H.c(new P.D(a))}return y},
aU:function(a,b,c){var z,y,x
z=a.length
for(y=0;y<z;++y){x=a[y]
if(b.$1(x)===!0)return x
if(a.length!==z)throw H.c(new P.D(a))}throw H.c(H.ak())},
cl:function(a,b){return this.aU(a,b,null)},
au:function(a,b){if(b>>>0!==b||b>=a.length)return H.f(a,b)
return a[b]},
geK:function(a){if(a.length>0)return a[0]
throw H.c(H.ak())},
gw:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.c(H.ak())},
gcd:function(a){var z=a.length
if(z===1){if(0>=z)return H.f(a,0)
return a[0]}if(z===0)throw H.c(H.ak())
throw H.c(H.dF())},
b7:function(a,b,c,d,e){var z,y,x
this.fX(a,"setRange")
P.cn(b,c,a.length,null,null,null)
z=c-b
if(z===0)return
if(e<0)H.i(P.a8(e,0,null,"skipCount",null))
if(e+z>d.length)throw H.c(H.fh())
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
this.fX(a,"sort")
z=b==null?P.tR():b
H.cr(a,0,a.length-1,z)},
fb:function(a){return this.ce(a,null)},
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
k:function(a){return P.cg(a,"[","]")},
bH:function(a){return P.b9(a,H.l(a,0))},
ga_:function(a){return new J.bk(a,a.length,0,null,[H.l(a,0)])},
gB:function(a){return H.aF(a)},
gl:function(a){return a.length},
sl:function(a,b){this.cQ(a,"set length")
if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(P.cI(b,"newLength",null))
if(b<0)throw H.c(P.a8(b,0,null,"newLength",null))
a.length=b},
j:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(H.aL(a,b))
if(b>=a.length||b<0)throw H.c(H.aL(a,b))
return a[b]},
n:function(a,b,c){if(!!a.immutable$list)H.i(new P.S("indexed set"))
if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(H.aL(a,b))
if(b>=a.length||b<0)throw H.c(H.aL(a,b))
a[b]=c},
$iscX:1,
$ascX:I.bg,
$isN:1,
$isa_:1},
xe:{"^":"ch;$ti"},
bk:{"^":"d;a,b,c,d,$ti",
gU:function(){return this.d},
u:function(){var z,y,x
z=this.a
y=z.length
if(this.b!==y)throw H.c(H.at(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z[x]
this.c=x+1
return!0}},
ci:{"^":"aZ;",
bE:function(a,b){var z
if(typeof b!=="number")throw H.c(H.T(b))
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){z=this.gdG(b)
if(this.gdG(a)===z)return 0
if(this.gdG(a))return-1
return 1}return 0}else if(isNaN(a)){if(isNaN(b))return 0
return 1}else return-1},
gdG:function(a){return a===0?1/a<0:a<0},
hw:function(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw H.c(new P.S(""+a+".round()"))},
l2:function(a){return a},
bj:function(a,b){var z
if(b>20)throw H.c(P.a8(b,0,20,"fractionDigits",null))
z=a.toFixed(b)
if(a===0&&this.gdG(a))return"-"+z
return z},
l5:function(a,b){var z,y,x,w
if(b<2||b>36)throw H.c(P.a8(b,2,36,"radix",null))
z=a.toString(b)
if(C.b.cR(z,z.length-1)!==41)return z
y=/^([\da-z]+)(?:\.([\da-z]+))?\(e\+(\d+)\)$/.exec(z)
if(y==null)H.i(new P.S("Unexpected toString result: "+z))
x=J.L(y)
z=x.j(y,1)
w=+x.j(y,3)
if(x.j(y,2)!=null){z+=x.j(y,2)
w-=x.j(y,2).length}return z+C.b.cb("0",w)},
k:function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gB:function(a){return a&0x1FFFFFFF},
f7:function(a){return-a},
aj:function(a,b){if(typeof b!=="number")throw H.c(H.T(b))
return a+b},
at:function(a,b){if(typeof b!=="number")throw H.c(H.T(b))
return a-b},
d8:function(a,b){if(typeof b!=="number")throw H.c(H.T(b))
return a/b},
cb:function(a,b){if(typeof b!=="number")throw H.c(H.T(b))
return a*b},
bM:function(a,b){return(a|0)===a?a/b|0:this.jb(a,b)},
jb:function(a,b){var z=a/b
if(z>=-2147483648&&z<=2147483647)return z|0
if(z>0){if(z!==1/0)return Math.floor(z)}else if(z>-1/0)return Math.ceil(z)
throw H.c(new P.S("Result of truncating division is "+H.b(z)+": "+H.b(a)+" ~/ "+b))},
du:function(a,b){var z
if(a>0)z=b>31?0:a>>>b
else{z=b>31?31:b
z=a>>z>>>0}return z},
b0:function(a,b){if(typeof b!=="number")throw H.c(H.T(b))
return a<b},
bk:function(a,b){if(typeof b!=="number")throw H.c(H.T(b))
return a>b},
da:function(a,b){if(typeof b!=="number")throw H.c(H.T(b))
return a<=b},
bT:function(a,b){if(typeof b!=="number")throw H.c(H.T(b))
return a>=b},
gbz:function(a){return C.af},
$isM:1},
fk:{"^":"ci;",
gbz:function(a){return C.ae},
$isaX:1,
$isM:1,
$ist:1},
fj:{"^":"ci;",
gbz:function(a){return C.ad},
$isaX:1,
$isM:1},
cj:{"^":"aZ;",
cR:function(a,b){if(b<0)throw H.c(H.aL(a,b))
if(b>=a.length)H.i(H.aL(a,b))
return a.charCodeAt(b)},
cC:function(a,b){if(b>=a.length)throw H.c(H.aL(a,b))
return a.charCodeAt(b)},
dz:function(a,b,c){if(c>b.length)throw H.c(P.a8(c,0,b.length,null,null))
return new H.re(b,a,c)},
eC:function(a,b){return this.dz(a,b,0)},
hg:function(a,b,c){var z,y
if(c<0||c>b.length)throw H.c(P.a8(c,0,b.length,null,null))
z=a.length
if(c+z>b.length)return
for(y=0;y<z;++y)if(this.cR(b,c+y)!==this.cC(a,y))return
return new H.he(c,b,a)},
aj:function(a,b){if(typeof b!=="string")throw H.c(P.cI(b,null,null))
return a+b},
eI:function(a,b){var z,y
z=b.length
y=a.length
if(z>y)return!1
return b===this.bK(a,y-z)},
kP:function(a,b,c){H.bz(c)
return H.n(a,b,c)},
kQ:function(a,b,c,d){H.bz(c)
P.ny(d,0,a.length,"startIndex",null)
return H.iI(a,b,c,d)},
d1:function(a,b,c){return this.kQ(a,b,c,0)},
i3:function(a,b,c){var z
if(c>a.length)throw H.c(P.a8(c,0,a.length,null,null))
if(typeof b==="string"){z=c+b.length
if(z>a.length)return!1
return b===a.substring(c,z)}return J.iZ(b,a,c)!=null},
dh:function(a,b){return this.i3(a,b,0)},
aM:function(a,b,c){if(c==null)c=a.length
if(typeof c!=="number"||Math.floor(c)!==c)H.i(H.T(c))
if(b<0)throw H.c(P.cm(b,null,null))
if(typeof c!=="number")return H.x(c)
if(b>c)throw H.c(P.cm(b,null,null))
if(c>a.length)throw H.c(P.cm(c,null,null))
return a.substring(b,c)},
bK:function(a,b){return this.aM(a,b,null)},
f1:function(a){var z,y,x,w,v
z=a.trim()
y=z.length
if(y===0)return z
if(this.cC(z,0)===133){x=J.dG(z,1)
if(x===y)return""}else x=0
w=y-1
v=this.cR(z,w)===133?J.m5(z,w):y
if(x===0&&v===y)return z
return z.substring(x,v)},
l6:function(a){var z,y
if(typeof a.trimLeft!="undefined"){z=a.trimLeft()
if(z.length===0)return z
y=this.cC(z,0)===133?J.dG(z,1):0}else{y=J.dG(a,0)
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
kv:function(a,b,c){var z
c=a.length
z=b.length
if(c+z>c)c-=z
return a.lastIndexOf(b,c)},
ku:function(a,b){return this.kv(a,b,null)},
jA:function(a,b,c){if(b==null)H.i(H.T(b))
if(c>a.length)throw H.c(P.a8(c,0,a.length,null,null))
return H.wH(a,b,c)},
a7:function(a,b){return this.jA(a,b,0)},
gY:function(a){return a.length===0},
gav:function(a){return a.length!==0},
bE:function(a,b){var z
if(typeof b!=="string")throw H.c(H.T(b))
if(a===b)z=0
else z=a<b?-1:1
return z},
k:function(a){return a},
gB:function(a){var z,y,x
for(z=a.length,y=0,x=0;x<z;++x){y=536870911&y+a.charCodeAt(x)
y=536870911&y+((524287&y)<<10)
y^=y>>6}y=536870911&y+((67108863&y)<<3)
y^=y>>11
return 536870911&y+((16383&y)<<15)},
gbz:function(a){return C.ab},
gl:function(a){return a.length},
j:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(H.aL(a,b))
if(b>=a.length||b<0)throw H.c(H.aL(a,b))
return a[b]},
$iscX:1,
$ascX:I.bg,
$isq:1,
$ise_:1,
v:{
fn:function(a){if(a<256)switch(a){case 9:case 10:case 11:case 12:case 13:case 32:case 133:case 160:return!0
default:return!1}switch(a){case 5760:case 8192:case 8193:case 8194:case 8195:case 8196:case 8197:case 8198:case 8199:case 8200:case 8201:case 8202:case 8232:case 8233:case 8239:case 8287:case 12288:case 65279:return!0
default:return!1}},
dG:function(a,b){var z,y
for(z=a.length;b<z;){y=C.b.cC(a,b)
if(y!==32&&y!==13&&!J.fn(y))break;++b}return b},
m5:function(a,b){var z,y
for(;b>0;b=z){z=b-1
y=C.b.cR(a,z)
if(y!==32&&y!==13&&!J.fn(y))break}return b}}}}],["","",,H,{"^":"",
hS:function(a){return a},
ak:function(){return new P.w("No element")},
dF:function(){return new P.w("Too many elements")},
fh:function(){return new P.w("Too few elements")},
cr:function(a,b,c,d){if(c-b<=32)H.h8(a,b,c,d)
else H.h7(a,b,c,d)},
h8:function(a,b,c,d){var z,y,x,w,v
for(z=b+1,y=J.L(a);z<=c;++z){x=y.j(a,z)
w=z
while(!0){if(!(w>b&&J.ac(d.$2(y.j(a,w-1),x),0)))break
v=w-1
y.n(a,w,y.j(a,v))
w=v}y.n(a,w,x)}},
h7:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
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
if(J.ac(d.$2(s,r),0)){n=r
r=s
s=n}if(J.ac(d.$2(p,o),0)){n=o
o=p
p=n}if(J.ac(d.$2(s,q),0)){n=q
q=s
s=n}if(J.ac(d.$2(r,q),0)){n=q
q=r
r=n}if(J.ac(d.$2(s,p),0)){n=p
p=s
s=n}if(J.ac(d.$2(q,p),0)){n=p
p=q
q=n}if(J.ac(d.$2(r,o),0)){n=o
o=r
r=n}if(J.ac(d.$2(r,q),0)){n=q
q=r
r=n}if(J.ac(d.$2(p,o),0)){n=o
o=p
p=n}t.n(a,y,s)
t.n(a,w,q)
t.n(a,x,o)
t.n(a,v,t.j(a,b))
t.n(a,u,t.j(a,c))
m=b+1
l=c-1
if(J.e(d.$2(r,p),0)){for(k=m;k<=l;++k){j=t.j(a,k)
i=d.$2(j,r)
h=J.o(i)
if(h.A(i,0))continue
if(h.b0(i,0)){if(k!==m){t.n(a,k,t.j(a,m))
t.n(a,m,j)}++m}else for(;!0;){i=d.$2(t.j(a,l),r)
h=J.an(i)
if(h.bk(i,0)){--l
continue}else{g=l-1
if(h.b0(i,0)){t.n(a,k,t.j(a,m))
f=m+1
t.n(a,m,t.j(a,l))
t.n(a,l,j)
l=g
m=f
break}else{t.n(a,k,t.j(a,l))
t.n(a,l,j)
l=g
break}}}}e=!0}else{for(k=m;k<=l;++k){j=t.j(a,k)
if(J.c1(d.$2(j,r),0)){if(k!==m){t.n(a,k,t.j(a,m))
t.n(a,m,j)}++m}else if(J.ac(d.$2(j,p),0))for(;!0;)if(J.ac(d.$2(t.j(a,l),p),0)){--l
if(l<k)break
continue}else{g=l-1
if(J.c1(d.$2(t.j(a,l),r),0)){t.n(a,k,t.j(a,m))
f=m+1
t.n(a,m,t.j(a,l))
t.n(a,l,j)
m=f}else{t.n(a,k,t.j(a,l))
t.n(a,l,j)}l=g
break}}e=!1}h=m-1
t.n(a,b,t.j(a,h))
t.n(a,h,r)
h=l+1
t.n(a,c,t.j(a,h))
t.n(a,h,p)
H.cr(a,b,m-2,d)
H.cr(a,l+2,c,d)
if(e)return
if(m<y&&l>x){for(;J.e(d.$2(t.j(a,m),r),0);)++m
for(;J.e(d.$2(t.j(a,l),p),0);)--l
for(k=m;k<=l;++k){j=t.j(a,k)
if(J.e(d.$2(j,r),0)){if(k!==m){t.n(a,k,t.j(a,m))
t.n(a,m,j)}++m}else if(J.e(d.$2(j,p),0))for(;!0;)if(J.e(d.$2(t.j(a,l),p),0)){--l
if(l<k)break
continue}else{g=l-1
if(J.c1(d.$2(t.j(a,l),r),0)){t.n(a,k,t.j(a,m))
f=m+1
t.n(a,m,t.j(a,l))
t.n(a,l,j)
m=f}else{t.n(a,k,t.j(a,l))
t.n(a,l,j)}l=g
break}}H.cr(a,m,l,d)}else H.cr(a,m,l,d)},
a_:{"^":"B;$ti"},
b1:{"^":"a_;$ti",
ga_:function(a){return new H.dP(this,this.gl(this),0,null,[H.y(this,"b1",0)])},
Z:function(a,b){var z,y
z=this.gl(this)
for(y=0;y<z;++y){b.$1(this.au(0,y))
if(z!==this.gl(this))throw H.c(new P.D(this))}},
gY:function(a){return this.gl(this)===0},
gw:function(a){if(this.gl(this)===0)throw H.c(H.ak())
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
c9:function(a,b){return this.di(0,b)},
aJ:function(a,b){return new H.ar(this,b,[H.y(this,"b1",0),null])},
bw:function(a,b,c){var z,y,x
z=this.gl(this)
for(y=b,x=0;x<z;++x){y=c.$2(y,this.au(0,x))
if(z!==this.gl(this))throw H.c(new P.D(this))}return y},
bG:function(a,b){var z,y,x,w
z=[H.y(this,"b1",0)]
if(b){y=H.p([],z)
C.a.sl(y,this.gl(this))}else{x=new Array(this.gl(this))
x.fixed$length=Array
y=H.p(x,z)}for(w=0;w<this.gl(this);++w){z=this.au(0,w)
if(w>=y.length)return H.f(y,w)
y[w]=z}return y},
cv:function(a){return this.bG(a,!0)},
bH:function(a){var z,y
z=P.a6(null,null,null,H.y(this,"b1",0))
for(y=0;y<this.gl(this);++y)z.t(0,this.au(0,y))
return z}},
pf:{"^":"b1;a,b,c,$ti",
giE:function(){var z=J.aO(this.a)
return z},
gj9:function(){var z,y
z=J.aO(this.a)
y=this.b
if(y>z)return z
return y},
gl:function(a){var z,y
z=J.aO(this.a)
y=this.b
if(y>=z)return 0
return z-y},
au:function(a,b){var z,y
z=this.gj9()+b
if(!(b<0)){y=this.giE()
if(typeof y!=="number")return H.x(y)
y=z>=y}else y=!0
if(y)throw H.c(P.cU(b,this,"index",null,null))
return J.eR(this.a,z)},
bG:function(a,b){var z,y,x,w,v,u,t,s,r
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
ig:function(a,b,c,d){var z=this.b
if(z<0)H.i(P.a8(z,0,null,"start",null))},
v:{
hf:function(a,b,c,d){var z=new H.pf(a,b,c,[d])
z.ig(a,b,c,d)
return z}}},
dP:{"^":"d;a,b,c,d,$ti",
gU:function(){return this.d},
u:function(){var z,y,x
z=this.a
y=z.gl(z)
if(this.b!==y)throw H.c(new P.D(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z.au(0,x);++this.c
return!0}},
dS:{"^":"B;a,b,$ti",
ga_:function(a){return new H.mA(null,J.aj(this.a),this.b,this.$ti)},
gl:function(a){return J.aO(this.a)},
gY:function(a){return J.eS(this.a)},
gw:function(a){return this.b.$1(J.iW(this.a))},
$asB:function(a,b){return[b]},
v:{
bI:function(a,b,c,d){if(!!J.o(a).$isa_)return new H.bG(a,b,[c,d])
return new H.dS(a,b,[c,d])}}},
bG:{"^":"dS;a,b,$ti",$isa_:1,
$asa_:function(a,b){return[b]}},
mA:{"^":"cW;a,b,c,$ti",
u:function(){var z=this.b
if(z.u()){this.a=this.c.$1(z.gU())
return!0}this.a=null
return!1},
gU:function(){return this.a},
$ascW:function(a,b){return[b]}},
ar:{"^":"b1;a,b,$ti",
gl:function(a){return J.aO(this.a)},
au:function(a,b){return this.b.$1(J.eR(this.a,b))},
$asb1:function(a,b){return[b]},
$asa_:function(a,b){return[b]},
$asB:function(a,b){return[b]}},
K:{"^":"B;a,b,$ti",
ga_:function(a){return new H.bT(J.aj(this.a),this.b,this.$ti)},
aJ:function(a,b){return new H.dS(this,b,[H.l(this,0),null])}},
bT:{"^":"cW;a,b,$ti",
u:function(){var z,y
for(z=this.a,y=this.b;z.u();)if(y.$1(z.gU())===!0)return!0
return!1},
gU:function(){return this.a.gU()}},
h_:{"^":"B;a,b,$ti",
ga_:function(a){return new H.or(J.aj(this.a),this.b,this.$ti)},
v:{
oq:function(a,b,c){if(!!J.o(a).$isa_)return new H.l6(a,H.hS(b),[c])
return new H.h_(a,H.hS(b),[c])}}},
l6:{"^":"h_;a,b,$ti",
gl:function(a){var z=J.aO(this.a)-this.b
if(z>=0)return z
return 0},
$isa_:1},
or:{"^":"cW;a,b,$ti",
u:function(){var z,y
for(z=this.a,y=0;y<this.b;++y)z.u()
this.b=0
return z.u()},
gU:function(){return this.a.gU()}},
l7:{"^":"d;$ti",
u:function(){return!1},
gU:function(){return}}}],["","",,H,{"^":"",
cx:function(a,b){var z=a.cT(b)
if(!init.globalState.d.cy)init.globalState.f.by()
return z},
iF:function(a,b){var z,y,x,w,v,u
z={}
z.a=b
if(b==null){b=[]
z.a=b
y=b}else y=b
if(!J.o(y).$isN)throw H.c(P.G("Arguments to main must be a List: "+H.b(y)))
init.globalState=new H.r0(0,0,1,null,null,null,null,null,null,null,null,null,a)
y=init.globalState
x=self.window==null
w=self.Worker
v=x&&!!self.postMessage
y.x=v
v=!v
if(v)w=w!=null&&$.$get$ff()!=null
else w=!0
y.y=w
y.r=x&&v
y.f=new H.qA(P.bb(null,H.cv),0)
x=P.t
y.z=new H.R(0,null,null,null,null,null,0,[x,H.en])
y.ch=new H.R(0,null,null,null,null,null,0,[x,null])
if(y.x===!0){w=new H.r_()
y.Q=w
self.onmessage=function(c,d){return function(e){c(d,e)}}(H.lY,w)
self.dartPrint=self.dartPrint||function(c){return function(d){if(self.console&&self.console.log)self.console.log(d)
else self.postMessage(c(d))}}(H.r1)}if(init.globalState.x===!0)return
y=init.globalState.a++
w=P.a6(null,null,null,x)
v=new H.co(0,null,!1)
u=new H.en(y,new H.R(0,null,null,null,null,null,0,[x,H.co]),w,init.createNewIsolate(),v,new H.bl(H.dp()),new H.bl(H.dp()),!1,!1,[],P.a6(null,null,null,null),null,null,!1,!0,P.a6(null,null,null,null))
w.t(0,0)
u.e4(0,v)
init.globalState.e=u
init.globalState.d=u
if(H.az(a,{func:1,args:[,]}))u.cT(new H.vM(z,a))
else if(H.az(a,{func:1,args:[,,]}))u.cT(new H.vN(z,a))
else u.cT(a)
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
z=new H.da(!0,[]).c_(b.data)
y=J.L(z)
switch(y.j(z,"command")){case"start":init.globalState.b=y.j(z,"id")
x=y.j(z,"functionName")
w=x==null?init.globalState.cx:init.globalFunctions[x]()
v=y.j(z,"args")
u=new H.da(!0,[]).c_(y.j(z,"msg"))
t=y.j(z,"isSpawnUri")
s=y.j(z,"startPaused")
r=new H.da(!0,[]).c_(y.j(z,"replyTo"))
y=init.globalState.a++
q=P.t
p=P.a6(null,null,null,q)
o=new H.co(0,null,!1)
n=new H.en(y,new H.R(0,null,null,null,null,null,0,[q,H.co]),p,init.createNewIsolate(),o,new H.bl(H.dp()),new H.bl(H.dp()),!1,!1,[],P.a6(null,null,null,null),null,null,!1,!0,P.a6(null,null,null,null))
p.t(0,0)
n.e4(0,o)
init.globalState.f.a.aE(new H.cv(n,new H.lZ(w,v,u,t,s,r),"worker-start"))
init.globalState.d=n
init.globalState.f.by()
break
case"spawn-worker":break
case"message":if(y.j(z,"port")!=null)y.j(z,"port").F(y.j(z,"msg"))
init.globalState.f.by()
break
case"close":init.globalState.ch.a3(0,$.$get$fg().j(0,a))
a.terminate()
init.globalState.f.by()
break
case"log":H.lX(y.j(z,"msg"))
break
case"print":if(init.globalState.x===!0){y=init.globalState.Q
q=P.a0(["command","print","msg",z])
q=new H.bv(!0,P.bW(null,P.t)).bq(q)
y.toString
self.postMessage(q)}else P.eG(y.j(z,"msg"))
break
case"error":throw H.c(y.j(z,"msg"))}},
lX:function(a){var z,y,x,w
if(init.globalState.x===!0){y=init.globalState.Q
x=P.a0(["command","log","msg",a])
x=new H.bv(!0,P.bW(null,P.t)).bq(x)
y.toString
self.postMessage(x)}else try{self.console.log(a)}catch(w){H.C(w)
z=H.E(w)
y=P.cS(z)
throw H.c(y)}},
m_:function(a,b,c,d,e,f){var z,y,x,w
z=init.globalState.d
y=z.a
$.fK=$.fK+("_"+y)
$.fL=$.fL+("_"+y)
y=z.e
x=init.globalState.d.a
w=z.f
f.F(["spawned",new H.cw(y,x),w,z.r])
x=new H.m0(a,b,c,d,z)
if(e===!0){z.fT(w,w)
init.globalState.f.a.aE(new H.cv(z,x,"start isolate"))}else x.$0()},
rv:function(a){return new H.da(!0,[]).c_(new H.bv(!1,P.bW(null,P.t)).bq(a))},
vM:{"^":"a:2;a,b",
$0:function(){this.b.$1(this.a.a)}},
vN:{"^":"a:2;a,b",
$0:function(){this.b.$2(this.a.a,null)}},
r0:{"^":"d;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",v:{
r1:function(a){var z=P.a0(["command","print","msg",a])
return new H.bv(!0,P.bW(null,P.t)).bq(z)}}},
en:{"^":"d;i:a<,b,c,ks:d<,jC:e<,f,r,x,cW:y<,z,Q,ch,cx,cy,db,dx",
fT:function(a,b){if(!this.f.A(0,a))return
if(this.Q.t(0,b)&&!this.y)this.y=!0
this.cN()},
kO:function(a){var z,y,x
if(!this.y)return
z=this.Q
z.a3(0,a)
if(z.a===0){for(z=this.z;y=z.length,y!==0;){if(0>=y)return H.f(z,-1)
x=z.pop()
init.globalState.f.a.fS(x)}this.y=!1}this.cN()},
jq:function(a,b){var z,y,x
if(this.ch==null)this.ch=[]
for(z=J.o(a),y=0;x=this.ch,y<x.length;y+=2)if(z.A(a,x[y])){z=this.ch
x=y+1
if(x>=z.length)return H.f(z,x)
z[x]=b
return}x.push(a)
this.ch.push(b)},
kM:function(a){var z,y,x
if(this.ch==null)return
for(z=J.o(a),y=0;x=this.ch,y<x.length;y+=2)if(z.A(a,x[y])){z=this.ch
x=y+2
z.toString
if(typeof z!=="object"||z===null||!!z.fixed$length)H.i(new P.S("removeRange"))
P.cn(y,x,z.length,null,null,null)
z.splice(y,x-y)
return}},
hW:function(a,b){if(!this.r.A(0,a))return
this.db=b},
k0:function(a,b,c){var z=J.o(b)
if(!z.A(b,0))z=z.A(b,1)&&!this.cy
else z=!0
if(z){a.F(c)
return}z=this.cx
if(z==null){z=P.bb(null,null)
this.cx=z}z.aE(new H.qR(a,c))},
k_:function(a,b){var z
if(!this.r.A(0,a))return
z=J.o(b)
if(!z.A(b,0))z=z.A(b,1)&&!this.cy
else z=!0
if(z){this.eQ()
return}z=this.cx
if(z==null){z=P.bb(null,null)
this.cx=z}z.aE(this.gkt())},
k5:function(a,b){var z,y,x
z=this.dx
if(z.a===0){if(this.db===!0&&this===init.globalState.e)return
if(self.console&&self.console.error)self.console.error(a,b)
else{P.eG(a)
if(b!=null)P.eG(b)}return}y=new Array(2)
y.fixed$length=Array
y[0]=J.h(a)
y[1]=b==null?null:J.h(b)
for(x=new P.ag(z,z.r,null,null,[null]),x.c=z.e;x.u();)x.d.F(y)},
cT:function(a){var z,y,x,w,v,u,t
z=init.globalState.d
init.globalState.d=this
$=this.d
y=null
x=this.cy
this.cy=!0
try{y=a.$0()}catch(u){w=H.C(u)
v=H.E(u)
this.k5(w,v)
if(this.db===!0){this.eQ()
if(this===init.globalState.e)throw u}}finally{this.cy=x
init.globalState.d=z
if(z!=null)$=z.gks()
if(this.cx!=null)for(;t=this.cx,!t.gY(t);)this.cx.dL().$0()}return y},
cp:function(a){return this.b.j(0,a)},
e4:function(a,b){var z=this.b
if(z.ad(a))throw H.c(P.cS("Registry: ports must be registered only once."))
z.n(0,a,b)},
cN:function(){var z=this.b
if(z.gl(z)-this.c.a>0||this.y||!this.x)init.globalState.z.n(0,this.a,this)
else this.eQ()},
eQ:[function(){var z,y,x,w,v
z=this.cx
if(z!=null)z.bh(0)
for(z=this.b,y=z.gcw(),y=y.ga_(y);y.u();)y.gU().ix()
z.bh(0)
this.c.bh(0)
init.globalState.z.a3(0,this.a)
this.dx.bh(0)
if(this.ch!=null){for(x=0;z=this.ch,y=z.length,x<y;x+=2){w=z[x]
v=x+1
if(v>=y)return H.f(z,v)
w.F(z[v])}this.ch=null}},"$0","gkt",0,0,7]},
qR:{"^":"a:7;a,b",
$0:function(){this.a.F(this.b)}},
qA:{"^":"d;a,b",
jH:function(){var z=this.a
if(z.b===z.c)return
return z.dL()},
hz:function(){var z,y,x
z=this.jH()
if(z==null){if(init.globalState.e!=null)if(init.globalState.z.ad(init.globalState.e.a))if(init.globalState.r===!0){y=init.globalState.e.b
y=y.gY(y)}else y=!1
else y=!1
else y=!1
if(y)H.i(P.cS("Program exited with open ReceivePorts."))
y=init.globalState
if(y.x===!0){x=y.z
x=x.gY(x)&&y.f.b===0}else x=!1
if(x){y=y.Q
x=P.a0(["command","close"])
x=new H.bv(!0,new P.hN(0,null,null,null,null,null,0,[null,P.t])).bq(x)
y.toString
self.postMessage(x)}return!1}z.kK()
return!0},
fM:function(){if(self.window!=null)new H.qB(this).$0()
else for(;this.hz(););},
by:function(){var z,y,x,w,v
if(init.globalState.x!==!0)this.fM()
else try{this.fM()}catch(x){z=H.C(x)
y=H.E(x)
w=init.globalState.Q
v=P.a0(["command","error","msg",H.b(z)+"\n"+H.b(y)])
v=new H.bv(!0,P.bW(null,P.t)).bq(v)
w.toString
self.postMessage(v)}}},
qB:{"^":"a:7;a",
$0:function(){if(!this.a.hz())return
P.pC(C.x,this)}},
cv:{"^":"d;a,b,c",
kK:function(){var z=this.a
if(z.y){z.z.push(this)
return}z.cT(this.b)}},
r_:{"^":"d;"},
lZ:{"^":"a:2;a,b,c,d,e,f",
$0:function(){H.m_(this.a,this.b,this.c,this.d,this.e,this.f)}},
m0:{"^":"a:7;a,b,c,d,e",
$0:function(){var z,y
z=this.e
z.x=!0
if(this.d!==!0)this.a.$1(this.c)
else{y=this.a
if(H.az(y,{func:1,args:[,,]}))y.$2(this.b,this.c)
else if(H.az(y,{func:1,args:[,]}))y.$1(this.b)
else y.$0()}z.cN()}},
hH:{"^":"d;"},
cw:{"^":"hH;b,a",
F:function(a){var z,y,x
z=init.globalState.z.j(0,this.a)
if(z==null)return
y=this.b
if(y.gfB())return
x=H.rv(a)
if(z.gjC()===y){y=J.L(x)
switch(y.j(x,0)){case"pause":z.fT(y.j(x,1),y.j(x,2))
break
case"resume":z.kO(y.j(x,1))
break
case"add-ondone":z.jq(y.j(x,1),y.j(x,2))
break
case"remove-ondone":z.kM(y.j(x,1))
break
case"set-errors-fatal":z.hW(y.j(x,1),y.j(x,2))
break
case"ping":z.k0(y.j(x,1),y.j(x,2),y.j(x,3))
break
case"kill":z.k_(y.j(x,1),y.j(x,2))
break
case"getErrors":y=y.j(x,1)
z.dx.t(0,y)
break
case"stopErrors":y=y.j(x,1)
z.dx.a3(0,y)
break}return}init.globalState.f.a.aE(new H.cv(z,new H.r3(this,x),"receive"))},
A:function(a,b){if(b==null)return!1
return b instanceof H.cw&&J.e(this.b,b.b)},
gB:function(a){return this.b.geh()}},
r3:{"^":"a:2;a,b",
$0:function(){var z=this.a.b
if(!z.gfB())z.im(this.b)}},
ep:{"^":"hH;b,c,a",
F:function(a){var z,y,x
z=P.a0(["command","message","port",this,"msg",a])
y=new H.bv(!0,P.bW(null,P.t)).bq(z)
if(init.globalState.x===!0){init.globalState.Q.toString
self.postMessage(y)}else{x=init.globalState.ch.j(0,this.b)
if(x!=null)x.postMessage(y)}},
A:function(a,b){if(b==null)return!1
return b instanceof H.ep&&J.e(this.b,b.b)&&J.e(this.a,b.a)&&J.e(this.c,b.c)},
gB:function(a){var z,y,x
z=this.b
if(typeof z!=="number")return z.f8()
y=this.a
if(typeof y!=="number")return y.f8()
x=this.c
if(typeof x!=="number")return H.x(x)
return(z<<16^y<<8^x)>>>0}},
co:{"^":"d;eh:a<,b,fB:c<",
ix:function(){this.c=!0
this.b=null},
bu:function(){var z,y
if(this.c)return
this.c=!0
this.b=null
z=init.globalState.d
y=this.a
z.b.a3(0,y)
z.c.a3(0,y)
z.cN()},
im:function(a){if(this.c)return
this.b.$1(a)},
$isnz:1},
nA:{"^":"am;a,b",
aI:function(a,b,c,d){var z=this.b
z.toString
return new P.d9(z,[H.l(z,0)]).aI(a,b,c,d)},
eT:function(a,b,c){return this.aI(a,null,b,c)},
bu:[function(){this.a.bu()
this.b.bu()},"$0","gjy",0,0,7],
ic:function(a){var z=new P.ri(null,0,null,null,null,null,this.gjy(),[null])
this.b=z
this.a.b=z.gjh(z)},
$asam:I.bg},
py:{"^":"d;a,b,c",
gc2:function(){return this.c!=null},
ih:function(a,b){var z,y
if(a===0)z=self.setTimeout==null||init.globalState.x===!0
else z=!1
if(z){this.c=1
z=init.globalState.f
y=init.globalState.d
z.a.aE(new H.cv(y,new H.pA(this,b),"timer"))
this.b=!0}else if(self.setTimeout!=null){++init.globalState.f.b
this.c=self.setTimeout(H.dj(new H.pB(this,b),0),a)}else throw H.c(new P.S("Timer greater than 0."))},
v:{
pz:function(a,b){var z=new H.py(!0,!1,null)
z.ih(a,b)
return z}}},
pA:{"^":"a:7;a,b",
$0:function(){this.a.c=null
this.b.$0()}},
pB:{"^":"a:7;a,b",
$0:function(){this.a.c=null;--init.globalState.f.b
this.b.$0()}},
bl:{"^":"d;eh:a<",
gB:function(a){var z=this.a
if(typeof z!=="number")return z.le()
z=C.j.du(z,0)^C.j.bM(z,4294967296)
z=(~z>>>0)+(z<<15>>>0)&4294967295
z=((z^z>>>12)>>>0)*5&4294967295
z=((z^z>>>4)>>>0)*2057&4294967295
return(z^z>>>16)>>>0},
A:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(b instanceof H.bl){z=this.a
y=b.a
return z==null?y==null:z===y}return!1}},
bv:{"^":"d;a,b",
bq:[function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
z=this.b
y=z.j(0,a)
if(y!=null)return["ref",y]
z.n(0,a,z.gl(z))
z=J.o(a)
if(!!z.$iscX)return this.hS(a)
if(!!z.$islV){x=this.ghP()
z=a.gcn()
z=H.bI(z,x,H.y(z,"B",0),null)
z=P.P(z,!0,H.y(z,"B",0))
w=a.gcw()
w=H.bI(w,x,H.y(w,"B",0),null)
return["map",z,P.P(w,!0,H.y(w,"B",0))]}if(!!z.$isfm)return this.hT(a)
if(!!z.$isaZ)this.hC(a)
if(!!z.$isnz)this.d4(a,"RawReceivePorts can't be transmitted:")
if(!!z.$iscw)return this.hU(a)
if(!!z.$isep)return this.hV(a)
if(!!z.$isa){v=a.$static_name
if(v==null)this.d4(a,"Closures can't be transmitted:")
return["function",v]}if(!!z.$isbl)return["capability",a.a]
if(!(a instanceof P.d))this.hC(a)
return["dart",init.classIdExtractor(a),this.hR(init.classFieldsExtractor(a))]},"$1","ghP",2,0,0],
d4:function(a,b){throw H.c(new P.S((b==null?"Can't transmit:":b)+" "+H.b(a)))},
hC:function(a){return this.d4(a,null)},
hS:function(a){var z=this.hQ(a)
if(!!a.fixed$length)return["fixed",z]
if(!a.fixed$length)return["extendable",z]
if(!a.immutable$list)return["mutable",z]
if(a.constructor===Array)return["const",z]
this.d4(a,"Can't serialize indexable: ")},
hQ:function(a){var z,y,x
z=[]
C.a.sl(z,a.length)
for(y=0;y<a.length;++y){x=this.bq(a[y])
if(y>=z.length)return H.f(z,y)
z[y]=x}return z},
hR:function(a){var z
for(z=0;z<a.length;++z)C.a.n(a,z,this.bq(a[z]))
return a},
hT:function(a){var z,y,x,w
if(!!a.constructor&&a.constructor!==Object)this.d4(a,"Only plain JS Objects are supported:")
z=Object.keys(a)
y=[]
C.a.sl(y,z.length)
for(x=0;x<z.length;++x){w=this.bq(a[z[x]])
if(x>=y.length)return H.f(y,x)
y[x]=w}return["js-object",z,y]},
hV:function(a){if(this.a)return["sendport",a.b,a.a,a.c]
return["raw sendport",a]},
hU:function(a){if(this.a)return["sendport",init.globalState.b,a.a,a.b.geh()]
return["raw sendport",a]}},
da:{"^":"d;a,b",
c_:[function(a){var z,y,x,w,v,u
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
if(typeof a!=="object"||a===null||a.constructor!==Array)throw H.c(P.G("Bad serialized message: "+H.b(a)))
switch(C.a.geK(a)){case"ref":if(1>=a.length)return H.f(a,1)
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
y=H.p(this.cS(x),[null])
y.fixed$length=Array
return y
case"extendable":if(1>=a.length)return H.f(a,1)
x=a[1]
this.b.push(x)
return H.p(this.cS(x),[null])
case"mutable":if(1>=a.length)return H.f(a,1)
x=a[1]
this.b.push(x)
return this.cS(x)
case"const":if(1>=a.length)return H.f(a,1)
x=a[1]
this.b.push(x)
y=H.p(this.cS(x),[null])
y.fixed$length=Array
return y
case"map":return this.jL(a)
case"sendport":return this.jM(a)
case"raw sendport":if(1>=a.length)return H.f(a,1)
x=a[1]
this.b.push(x)
return x
case"js-object":return this.jK(a)
case"function":if(1>=a.length)return H.f(a,1)
x=init.globalFunctions[a[1]]()
this.b.push(x)
return x
case"capability":if(1>=a.length)return H.f(a,1)
return new H.bl(a[1])
case"dart":y=a.length
if(1>=y)return H.f(a,1)
w=a[1]
if(2>=y)return H.f(a,2)
v=a[2]
u=init.instanceFromClassId(w)
this.b.push(u)
this.cS(v)
return init.initializeEmptyInstance(w,u,v)
default:throw H.c("couldn't deserialize: "+H.b(a))}},"$1","gjJ",2,0,0],
cS:function(a){var z,y,x
z=J.L(a)
y=0
while(!0){x=z.gl(a)
if(typeof x!=="number")return H.x(x)
if(!(y<x))break
z.n(a,y,this.c_(z.j(a,y)));++y}return a},
jL:function(a){var z,y,x,w,v,u
z=a.length
if(1>=z)return H.f(a,1)
y=a[1]
if(2>=z)return H.f(a,2)
x=a[2]
w=P.b0()
this.b.push(w)
y=J.eT(y,this.gjJ()).cv(0)
for(z=J.L(y),v=J.L(x),u=0;u<z.gl(y);++u){if(u>=y.length)return H.f(y,u)
w.n(0,y[u],this.c_(v.j(x,u)))}return w},
jM:function(a){var z,y,x,w,v,u,t
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
t=new H.cw(u,x)}else t=new H.ep(y,w,x)
this.b.push(t)
return t},
jK:function(a){var z,y,x,w,v,u,t
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
aF:function(a){var z=a.$identityHash
if(z==null){z=Math.random()*0x3fffffff|0
a.$identityHash=z}return z},
bM:function(a){var z,y,x,w,v,u,t,s
z=J.o(a)
y=z.constructor
if(typeof y=="function"){x=y.name
w=typeof x==="string"?x:null}else w=null
if(w==null||z===C.N||!!J.o(a).$isbt){v=C.Q(a)
if(v==="Object"){u=a.constructor
if(typeof u=="function"){t=String(u).match(/^\s*function\s*([\w$]*)\s*\(/)
s=t==null?null:t[1]
if(typeof s==="string"&&/^\w+$/.test(s))w=s}if(w==null)w=v}else w=v}w=w
if(w.length>1&&C.b.cC(w,0)===36)w=C.b.bK(w,1)
return function(b,c){return b.replace(/[^<,> ]+/g,function(d){return c[d]||d})}(w+H.dm(H.cA(a),0,null),init.mangledGlobalNames)},
d0:function(a){return"Instance of '"+H.bM(a)+"'"},
as:function(a){var z
if(a<=65535)return String.fromCharCode(a)
if(a<=1114111){z=a-65536
return String.fromCharCode((55296|C.e.du(z,10))>>>0,56320|z&1023)}throw H.c(P.a8(a,0,1114111,null,null))},
bp:function(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
nr:function(a){var z=H.bp(a).getFullYear()+0
return z},
np:function(a){var z=H.bp(a).getMonth()+1
return z},
nl:function(a){var z=H.bp(a).getDate()+0
return z},
nm:function(a){var z=H.bp(a).getHours()+0
return z},
no:function(a){var z=H.bp(a).getMinutes()+0
return z},
nq:function(a){var z=H.bp(a).getSeconds()+0
return z},
nn:function(a){var z=H.bp(a).getMilliseconds()+0
return z},
e2:function(a,b){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.c(H.T(a))
return a[b]},
fM:function(a,b,c){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.c(H.T(a))
a[b]=c},
x:function(a){throw H.c(H.T(a))},
f:function(a,b){if(a==null)J.aO(a)
throw H.c(H.aL(a,b))},
aL:function(a,b){var z,y
if(typeof b!=="number"||Math.floor(b)!==b)return new P.b7(!0,b,"index",null)
z=J.aO(a)
if(!(b<0)){if(typeof z!=="number")return H.x(z)
y=b>=z}else y=!0
if(y)return P.cU(b,a,"index",null,z)
return P.cm(b,"index",null)},
T:function(a){return new P.b7(!0,a,null,null)},
dh:function(a){if(typeof a!=="number")throw H.c(H.T(a))
return a},
rR:function(a){if(typeof a!=="number"||Math.floor(a)!==a)throw H.c(H.T(a))
return a},
bz:function(a){if(typeof a!=="string")throw H.c(H.T(a))
return a},
c:function(a){var z
if(a==null)a=new P.cZ()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.iO})
z.name=""}else z.toString=H.iO
return z},
iO:function(){return J.h(this.dartException)},
i:function(a){throw H.c(a)},
at:function(a){throw H.c(new P.D(a))},
C:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.wS(a)
if(a==null)return
if(a instanceof H.dC)return z.$1(a.a)
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.e.du(x,16)&8191)===10)switch(w){case 438:return z.$1(H.dJ(H.b(y)+" (Error "+w+")",null))
case 445:case 5007:v=H.b(y)+" (Error "+w+")"
return z.$1(new H.fB(v,null))}}if(a instanceof TypeError){u=$.$get$hn()
t=$.$get$ho()
s=$.$get$hp()
r=$.$get$hq()
q=$.$get$hu()
p=$.$get$hv()
o=$.$get$hs()
$.$get$hr()
n=$.$get$hx()
m=$.$get$hw()
l=u.bx(y)
if(l!=null)return z.$1(H.dJ(y,l))
else{l=t.bx(y)
if(l!=null){l.method="call"
return z.$1(H.dJ(y,l))}else{l=s.bx(y)
if(l==null){l=r.bx(y)
if(l==null){l=q.bx(y)
if(l==null){l=p.bx(y)
if(l==null){l=o.bx(y)
if(l==null){l=r.bx(y)
if(l==null){l=n.bx(y)
if(l==null){l=m.bx(y)
v=l!=null}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0
if(v)return z.$1(new H.fB(y,l==null?null:l.method))}}return z.$1(new H.pH(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.h9()
y=function(b){try{return String(b)}catch(k){}return null}(a)
return z.$1(new P.b7(!1,null,null,typeof y==="string"?y.replace(/^RangeError:\s*/,""):y))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.h9()
return a},
E:function(a){var z
if(a instanceof H.dC)return a.b
if(a==null)return new H.hP(a,null)
z=a.$cachedTrace
if(z!=null)return z
return a.$cachedTrace=new H.hP(a,null)},
v3:function(a){if(a==null||typeof a!='object')return J.j(a)
else return H.aF(a)},
uf:function(a,b){var z,y,x,w
z=a.length
for(y=0;y<z;y=w){x=y+1
w=x+1
b.n(0,a[y],a[x])}return b},
uT:function(a,b,c,d,e,f,g){switch(c){case 0:return H.cx(b,new H.uU(a))
case 1:return H.cx(b,new H.uV(a,d))
case 2:return H.cx(b,new H.uW(a,d,e))
case 3:return H.cx(b,new H.uX(a,d,e,f))
case 4:return H.cx(b,new H.uY(a,d,e,f,g))}throw H.c(P.cS("Unsupported number of arguments for wrapped closure"))},
dj:function(a,b){var z=a.$identity
if(!!z)return z
z=function(c,d,e,f){return function(g,h,i,j){return f(c,e,d,g,h,i,j)}}(a,b,init.globalState.d,H.uT)
a.$identity=z
return z},
k4:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=z.$callName
if(!!J.o(c).$isN){z.$reflectionInfo=c
x=H.nC(z).r}else x=c
w=d?Object.create(new H.oM().constructor.prototype):Object.create(new H.dv(null,null,null,null).constructor.prototype)
w.$initialize=w.constructor
if(d)v=function(){this.$initialize()}
else{u=$.aP
$.aP=J.ap(u,1)
v=new Function("a,b,c,d"+u,"this.$initialize(a,b,c,d"+u+")")}w.constructor=v
v.prototype=w
if(!d){t=e.length==1&&!0
s=H.f4(a,z,t)
s.$reflectionInfo=c}else{w.$static_name=f
s=z
t=!1}if(typeof x=="number")r=function(g,h){return function(){return g(h)}}(H.uN,x)
else if(typeof x=="function")if(d)r=x
else{q=t?H.f_:H.dw
r=function(g,h){return function(){return g.apply({$receiver:h(this)},arguments)}}(x,q)}else throw H.c("Error in reflectionInfo.")
w.$S=r
w[y]=s
for(u=b.length,p=1;p<u;++p){o=b[p]
n=o.$callName
if(n!=null){m=d?o:H.f4(a,o,t)
w[n]=m}}w["call*"]=s
w.$R=z.$R
w.$D=z.$D
return v},
k1:function(a,b,c,d){var z=H.dw
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},
f4:function(a,b,c){var z,y,x,w,v,u,t
if(c)return H.k3(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
v=!w||y>=27
if(v)return H.k1(y,!w,z,b)
if(y===0){w=$.aP
$.aP=J.ap(w,1)
u="self"+H.b(w)
w="return function(){var "+u+" = this."
v=$.bF
if(v==null){v=H.cL("self")
$.bF=v}return new Function(w+H.b(v)+";return "+u+"."+H.b(z)+"();}")()}t="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w=$.aP
$.aP=J.ap(w,1)
t+=H.b(w)
w="return function("+t+"){return this."
v=$.bF
if(v==null){v=H.cL("self")
$.bF=v}return new Function(w+H.b(v)+"."+H.b(z)+"("+t+");}")()},
k2:function(a,b,c,d){var z,y
z=H.dw
y=H.f_
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
k3:function(a,b){var z,y,x,w,v,u,t,s
z=H.jT()
y=$.eZ
if(y==null){y=H.cL("receiver")
$.eZ=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.k2(w,!u,x,b)
if(w===1){y="return function(){return this."+H.b(z)+"."+H.b(x)+"(this."+H.b(y)+");"
u=$.aP
$.aP=J.ap(u,1)
return new Function(y+H.b(u)+"}")()}s="abcdefghijklmnopqrstuvwxyz".split("").splice(0,w-1).join(",")
y="return function("+s+"){return this."+H.b(z)+"."+H.b(x)+"(this."+H.b(y)+", "+s+");"
u=$.aP
$.aP=J.ap(u,1)
return new Function(y+H.b(u)+"}")()},
ez:function(a,b,c,d,e,f){var z
b.fixed$length=Array
if(!!J.o(c).$isN){c.fixed$length=Array
z=c}else z=c
return H.k4(a,b,z,!!d,e,f)},
vc:function(a,b){var z=J.L(b)
throw H.c(H.cN(H.bM(a),z.aM(b,3,z.gl(b))))},
F:function(a,b){var z
if(a!=null)z=(typeof a==="object"||typeof a==="function")&&J.o(a)[b]
else z=!0
if(z)return a
H.vc(a,b)},
eB:function(a){var z=J.o(a)
return"$S" in z?z.$S():null},
az:function(a,b){var z
if(a==null)return!1
z=H.eB(a)
return z==null?!1:H.eE(z,b)},
ij:function(a,b){var z,y
if(a==null)return a
if(H.az(a,b))return a
z=H.Z(b,null)
y=H.eB(a)
throw H.c(H.cN(y!=null?H.Z(y,null):H.bM(a),z))},
wP:function(a){throw H.c(new P.kl(a))},
dp:function(){return(Math.random()*0x100000000>>>0)+(Math.random()*0x100000000>>>0)*4294967296},
bf:function(a){return new H.aw(a,null)},
p:function(a,b){a.$ti=b
return a},
cA:function(a){if(a==null)return
return a.$ti},
ip:function(a,b){return H.eQ(a["$as"+H.b(b)],H.cA(a))},
y:function(a,b,c){var z=H.ip(a,b)
return z==null?null:z[c]},
l:function(a,b){var z=H.cA(a)
return z==null?null:z[b]},
Z:function(a,b){var z
if(a==null)return"dynamic"
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a[0].builtin$cls+H.dm(a,1,b)
if(typeof a=="function")return a.builtin$cls
if(typeof a==="number"&&Math.floor(a)===a)return H.b(b==null?a:b.$1(a))
if(typeof a.func!="undefined"){z=a.typedef
if(z!=null)return H.Z(z,b)
return H.rA(a,b)}return"unknown-reified-type"},
rA:function(a,b){var z,y,x,w,v,u,t,s,r,q,p
z=!!a.v?"void":H.Z(a.ret,b)
if("args" in a){y=a.args
for(x=y.length,w="",v="",u=0;u<x;++u,v=", "){t=y[u]
w=w+v+H.Z(t,b)}}else{w=""
v=""}if("opt" in a){s=a.opt
w+=v+"["
for(x=s.length,v="",u=0;u<x;++u,v=", "){t=s[u]
w=w+v+H.Z(t,b)}w+="]"}if("named" in a){r=a.named
w+=v+"{"
for(x=H.ue(r),q=x.length,v="",u=0;u<q;++u,v=", "){p=x[u]
w=w+v+H.Z(r[p],b)+(" "+H.b(p))}w+="}"}return"("+w+") => "+z},
dm:function(a,b,c){var z,y,x,w,v,u
if(a==null)return""
z=new P.bS("")
for(y=b,x=!0,w=!0,v="";y<a.length;++y){if(x)x=!1
else z.C=v+", "
u=a[y]
if(u!=null)w=!1
v=z.C+=H.Z(u,c)}return w?"":"<"+z.k(0)+">"},
iq:function(a){var z,y
if(a instanceof H.a){z=H.eB(a)
if(z!=null)return H.Z(z,null)}y=J.o(a).constructor.builtin$cls
if(a==null)return y
return y+H.dm(a.$ti,0,null)},
eQ:function(a,b){if(a==null)return b
a=a.apply(null,b)
if(a==null)return
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a
if(typeof a=="function")return a.apply(null,b)
return b},
aW:function(a,b,c,d){var z,y
if(a==null)return!1
z=H.cA(a)
y=J.o(a)
if(y[b]==null)return!1
return H.i6(H.eQ(y[d],z),c)},
aN:function(a,b,c,d){if(a==null)return a
if(H.aW(a,b,c,d))return a
throw H.c(H.cN(H.bM(a),function(e,f){return e.replace(/[^<,> ]+/g,function(g){return f[g]||g})}(b.substring(3)+H.dm(c,0,null),init.mangledGlobalNames)))},
i6:function(a,b){var z,y
if(a==null||b==null)return!0
z=a.length
for(y=0;y<z;++y)if(!H.ao(a[y],b[y]))return!1
return!0},
be:function(a,b,c){return a.apply(b,H.ip(b,c))},
di:function(a,b){var z,y,x
if(a==null)return b==null||b.builtin$cls==="d"||b.builtin$cls==="au"
if(b==null)return!0
z=H.cA(a)
a=J.o(a)
y=a.constructor
if(z!=null){z=z.slice()
z.splice(0,0,y)
y=z}if('func' in b){x=a.$S
if(x==null)return!1
return H.eE(x.apply(a,null),b)}return H.ao(y,b)},
iJ:function(a,b){if(a!=null&&!H.di(a,b))throw H.c(H.cN(H.bM(a),H.Z(b,null)))
return a},
ao:function(a,b){var z,y,x,w,v,u
if(a===b)return!0
if(a==null||b==null)return!0
if(a.builtin$cls==="au")return!0
if('func' in b)return H.eE(a,b)
if('func' in a)return b.builtin$cls==="bH"||b.builtin$cls==="d"
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
return H.i6(H.eQ(u,z),x)},
i5:function(a,b,c){var z,y,x,w,v
z=b==null
if(z&&a==null)return!0
if(z)return c
if(a==null)return!1
y=a.length
x=b.length
if(c){if(y<x)return!1}else if(y!==x)return!1
for(w=0;w<x;++w){z=a[w]
v=b[w]
if(!(H.ao(z,v)||H.ao(v,z)))return!1}return!0},
rL:function(a,b){var z,y,x,w,v,u
if(b==null)return!0
if(a==null)return!1
z=Object.getOwnPropertyNames(b)
z.fixed$length=Array
y=z
for(z=y.length,x=0;x<z;++x){w=y[x]
if(!Object.hasOwnProperty.call(a,w))return!1
v=b[w]
u=a[w]
if(!(H.ao(v,u)||H.ao(u,v)))return!1}return!0},
eE:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
if(!('func' in a))return!1
if("v" in a){if(!("v" in b)&&"ret" in b)return!1}else if(!("v" in b)){z=a.ret
y=b.ret
if(!(H.ao(z,y)||H.ao(y,z)))return!1}x=a.args
w=b.args
v=a.opt
u=b.opt
t=x!=null?x.length:0
s=w!=null?w.length:0
r=v!=null?v.length:0
q=u!=null?u.length:0
if(t>s)return!1
if(t+r<s+q)return!1
if(t===s){if(!H.i5(x,w,!1))return!1
if(!H.i5(v,u,!0))return!1}else{for(p=0;p<t;++p){o=x[p]
n=w[p]
if(!(H.ao(o,n)||H.ao(n,o)))return!1}for(m=p,l=0;m<s;++l,++m){o=v[l]
n=w[m]
if(!(H.ao(o,n)||H.ao(n,o)))return!1}for(m=0;m<q;++l,++m){o=v[l]
n=u[m]
if(!(H.ao(o,n)||H.ao(n,o)))return!1}}return H.rL(a.named,b.named)},
wH:function(a,b,c){var z
if(typeof b==="string")return a.indexOf(b,c)>=0
else{z=J.o(b)
if(!!z.$isdH){z=C.b.bK(a,c)
return b.b.test(z)}else{z=z.eC(b,C.b.bK(a,c))
return!z.gY(z)}}},
wJ:function(a,b,c,d){var z,y,x
z=b.fs(a,d)
if(z==null)return a
y=z.b
x=y.index
return H.eP(a,x,x+y[0].length,c)},
n:function(a,b,c){var z,y,x
H.bz(c)
if(b==="")if(a==="")return c
else{z=a.length
y=H.b(c)
for(x=0;x<z;++x)y=y+a[x]+H.b(c)
return y.charCodeAt(0)==0?y:y}else return a.replace(new RegExp(b.replace(/[[\]{}()*+?.\\^$|]/g,"\\$&"),'g'),c.replace(/\$/g,"$$$$"))},
xE:[function(a){return a},"$1","hT",2,0,23],
wI:function(a,b,c,d){var z,y,x,w,v,u
z=J.o(b)
if(!z.$ise_)throw H.c(P.cI(b,"pattern","is not a Pattern"))
for(z=z.eC(b,a),z=new H.hF(z.a,z.b,z.c,null),y=0,x="";z.u();){w=z.d
v=w.b
u=v.index
x=x+H.b(H.hT().$1(C.b.aM(a,y,u)))+H.b(c.$1(w))
y=u+v[0].length}z=x+H.b(H.hT().$1(C.b.bK(a,y)))
return z.charCodeAt(0)==0?z:z},
iI:function(a,b,c,d){var z,y,x,w,v,u
if(typeof b==="string"){z=a.indexOf(b,d)
if(z<0)return a
return H.eP(a,z,z+b.length,c)}y=J.o(b)
if(!!y.$isdH)return d===0?a.replace(b.b,c.replace(/\$/g,"$$$$")):H.wJ(a,b,c,d)
if(b==null)H.i(H.T(b))
y=y.dz(b,a,d)
x=y.ga_(y)
if(!x.u())return a
w=x.gU()
y=w.gfc()
v=w.gh3()
H.bz(c)
u=P.cn(y,v,a.length,null,null,null)
H.rR(u)
return H.eP(a,y,u,c)},
eP:function(a,b,c,d){var z,y
z=a.substring(0,b)
y=a.substring(c)
return z+H.b(d)+y},
k7:{"^":"d;$ti",
gY:function(a){return this.gl(this)===0},
gav:function(a){return this.gl(this)!==0},
k:function(a){return P.dT(this)},
n:function(a,b,c){return H.k8()},
$isI:1},
k9:{"^":"k7;a,b,c,$ti",
gl:function(a){return this.a},
ad:function(a){if(typeof a!=="string")return!1
if("__proto__"===a)return!1
return this.b.hasOwnProperty(a)},
j:function(a,b){if(!this.ad(b))return
return this.ft(b)},
ft:function(a){return this.b[a]},
Z:function(a,b){var z,y,x,w
z=this.c
for(y=z.length,x=0;x<y;++x){w=z[x]
b.$2(w,this.ft(w))}}},
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
aR:function(a){var z,y,x,w,v,u
a=a.replace(String({}),'$receiver$').replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
z=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(z==null)z=[]
y=z.indexOf("\\$arguments\\$")
x=z.indexOf("\\$argumentsExpr\\$")
w=z.indexOf("\\$expr\\$")
v=z.indexOf("\\$method\\$")
u=z.indexOf("\\$receiver\\$")
return new H.pD(a.replace(new RegExp('\\\\\\$arguments\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$argumentsExpr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$expr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$method\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$receiver\\\\\\$','g'),'((?:x|[^x])*)'),y,x,w,v,u)},
d8:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},
ht:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},
fB:{"^":"a5;a,b",
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
dJ:function(a,b){var z,y
z=b==null
y=z?null:b.method
return new H.m7(a,y,z?null:b.receiver)}}},
pH:{"^":"a5;a",
k:function(a){var z=this.a
return z.length===0?"Error":"Error: "+z}},
dC:{"^":"d;a,br:b<"},
wS:{"^":"a:0;a",
$1:function(a){if(!!J.o(a).$isa5)if(a.$thrownJsError==null)a.$thrownJsError=this.a
return a}},
hP:{"^":"d;a,b",
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
k:function(a){return"Closure '"+H.bM(this).trim()+"'"},
ghK:function(){return this},
$isbH:1,
ghK:function(){return this}},
hm:{"^":"a;"},
oM:{"^":"hm;",
k:function(a){var z=this.$static_name
if(z==null)return"Closure of unknown static method"
return"Closure '"+z+"'"}},
dv:{"^":"hm;a,b,c,d",
A:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof H.dv))return!1
return this.a===b.a&&this.b===b.b&&this.c===b.c},
gB:function(a){var z,y
z=this.c
if(z==null)y=H.aF(this.a)
else y=typeof z!=="object"?J.j(z):H.aF(z)
z=H.aF(this.b)
if(typeof y!=="number")return y.lf()
return(y^z)>>>0},
k:function(a){var z=this.c
if(z==null)z=this.a
return"Closure '"+H.b(this.d)+"' of "+H.d0(z)},
v:{
dw:function(a){return a.a},
f_:function(a){return a.c},
jT:function(){var z=$.bF
if(z==null){z=H.cL("self")
$.bF=z}return z},
cL:function(a){var z,y,x,w,v
z=new H.dv("self","target","receiver","name")
y=Object.getOwnPropertyNames(z)
y.fixed$length=Array
x=y
for(y=x.length,w=0;w<y;++w){v=x[w]
if(z[v]===a)return v}}}},
jY:{"^":"a5;a",
k:function(a){return this.a},
v:{
cN:function(a,b){return new H.jY("CastError: Casting value of type '"+a+"' to incompatible type '"+b+"'")}}},
nO:{"^":"a5;a",
k:function(a){return"RuntimeError: "+H.b(this.a)}},
aw:{"^":"d;a,b",
k:function(a){var z,y
z=this.b
if(z!=null)return z
y=function(b,c){return b.replace(/[^<,> ]+/g,function(d){return c[d]||d})}(this.a,init.mangledGlobalNames)
this.b=y
return y},
gB:function(a){return J.j(this.a)},
A:function(a,b){if(b==null)return!1
return b instanceof H.aw&&J.e(this.a,b.a)}},
R:{"^":"d;a,b,c,d,e,f,r,$ti",
gl:function(a){return this.a},
gY:function(a){return this.a===0},
gav:function(a){return!this.gY(this)},
gcn:function(){return new H.mo(this,[H.l(this,0)])},
gcw:function(){return H.bI(this.gcn(),new H.m6(this),H.l(this,0),H.l(this,1))},
ad:function(a){var z,y
if(typeof a==="string"){z=this.b
if(z==null)return!1
return this.fn(z,a)}else if(typeof a==="number"&&(a&0x3ffffff)===a){y=this.c
if(y==null)return!1
return this.fn(y,a)}else return this.kh(a)},
kh:function(a){var z=this.d
if(z==null)return!1
return this.cV(this.dq(z,this.cU(a)),a)>=0},
j:function(a,b){var z,y,x
if(typeof b==="string"){z=this.b
if(z==null)return
y=this.cF(z,b)
return y==null?null:y.gc1()}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null)return
y=this.cF(x,b)
return y==null?null:y.gc1()}else return this.ki(b)},
ki:function(a){var z,y,x
z=this.d
if(z==null)return
y=this.dq(z,this.cU(a))
x=this.cV(y,a)
if(x<0)return
return y[x].gc1()},
n:function(a,b,c){var z,y
if(typeof b==="string"){z=this.b
if(z==null){z=this.ej()
this.b=z}this.fh(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=this.ej()
this.c=y}this.fh(y,b,c)}else this.kk(b,c)},
kk:function(a,b){var z,y,x,w
z=this.d
if(z==null){z=this.ej()
this.d=z}y=this.cU(a)
x=this.dq(z,y)
if(x==null)this.ew(z,y,[this.ek(a,b)])
else{w=this.cV(x,a)
if(w>=0)x[w].sc1(b)
else x.push(this.ek(a,b))}},
kL:function(a,b){var z
if(this.ad(a))return this.j(0,a)
z=b.$0()
this.n(0,a,z)
return z},
a3:function(a,b){if(typeof b==="string")return this.fL(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.fL(this.c,b)
else return this.kj(b)},
kj:function(a){var z,y,x,w
z=this.d
if(z==null)return
y=this.dq(z,this.cU(a))
x=this.cV(y,a)
if(x<0)return
w=y.splice(x,1)[0]
this.fN(w)
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
fh:function(a,b,c){var z=this.cF(a,b)
if(z==null)this.ew(a,b,this.ek(b,c))
else z.sc1(c)},
fL:function(a,b){var z
if(a==null)return
z=this.cF(a,b)
if(z==null)return
this.fN(z)
this.fo(a,b)
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
fN:function(a){var z,y
z=a.giZ()
y=a.c
if(z==null)this.e=y
else z.c=y
if(y==null)this.f=z
else y.d=z;--this.a
this.r=this.r+1&67108863},
cU:function(a){return J.j(a)&0x3ffffff},
cV:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.e(a[y].ghb(),b))return y
return-1},
k:function(a){return P.dT(this)},
cF:function(a,b){return a[b]},
dq:function(a,b){return a[b]},
ew:function(a,b,c){a[b]=c},
fo:function(a,b){delete a[b]},
fn:function(a,b){return this.cF(a,b)!=null},
ej:function(){var z=Object.create(null)
this.ew(z,"<non-identifier-key>",z)
this.fo(z,"<non-identifier-key>")
return z},
$islV:1,
$isI:1,
v:{
fp:function(a,b){return new H.R(0,null,null,null,null,null,0,[a,b])}}},
m6:{"^":"a:0;a",
$1:function(a){return this.a.j(0,a)}},
mn:{"^":"d;hb:a<,c1:b@,c,iZ:d<,$ti"},
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
dH:{"^":"d;a,b,c,d",
k:function(a){return"RegExp/"+this.a+"/"},
giV:function(){var z=this.c
if(z!=null)return z
z=this.b
z=H.dI(this.a,z.multiline,!z.ignoreCase,!0)
this.c=z
return z},
giU:function(){var z=this.d
if(z!=null)return z
z=this.b
z=H.dI(this.a+"|()",z.multiline,!z.ignoreCase,!0)
this.d=z
return z},
dz:function(a,b,c){if(c>b.length)throw H.c(P.a8(c,0,b.length,null,null))
return new H.qg(this,b,c)},
eC:function(a,b){return this.dz(a,b,0)},
fs:function(a,b){var z,y
z=this.giV()
z.lastIndex=b
y=z.exec(a)
if(y==null)return
return new H.hO(this,y)},
iF:function(a,b){var z,y
z=this.giU()
z.lastIndex=b
y=z.exec(a)
if(y==null)return
if(0>=y.length)return H.f(y,-1)
if(y.pop()!=null)return
return new H.hO(this,y)},
hg:function(a,b,c){if(c>b.length)throw H.c(P.a8(c,0,b.length,null,null))
return this.iF(b,c)},
$ise_:1,
v:{
dI:function(a,b,c,d){var z,y,x,w
z=b?"m":""
y=c?"":"i"
x=d?"g":""
w=function(e,f){try{return new RegExp(e,f)}catch(v){return v}}(a,z+y+x)
if(w instanceof RegExp)return w
throw H.c(new P.fc("Illegal RegExp pattern ("+String(w)+")",a,null))}}},
hO:{"^":"d;a,b",
gfc:function(){return this.b.index},
gh3:function(){var z=this.b
return z.index+z[0].length},
j:function(a,b){var z=this.b
if(b>>>0!==b||b>=z.length)return H.f(z,b)
return z[b]},
$isbo:1},
qg:{"^":"cf;a,b,c",
ga_:function(a){return new H.hF(this.a,this.b,this.c,null)},
$ascf:function(){return[P.bo]},
$asB:function(){return[P.bo]}},
hF:{"^":"d;a,b,c,d",
gU:function(){return this.d},
u:function(){var z,y,x,w
z=this.b
if(z==null)return!1
y=this.c
if(y<=z.length){x=this.a.fs(z,y)
if(x!=null){this.d=x
z=x.b
y=z.index
w=y+z[0].length
this.c=y===w?w+1:w
return!0}}this.d=null
this.b=null
return!1}},
he:{"^":"d;fc:a<,b,c",
gh3:function(){return this.a+this.c.length},
j:function(a,b){if(b!==0)H.i(P.cm(b,null,null))
return this.c},
$isbo:1},
re:{"^":"B;a,b,c",
ga_:function(a){return new H.rf(this.a,this.b,this.c,null)},
$asB:function(){return[P.bo]}},
rf:{"^":"d;a,b,c,d",
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
this.d=new H.he(u,w,y)
this.c=t===this.c?t+1:t
return!0},
gU:function(){return this.d}}}],["","",,H,{"^":"",
ue:function(a){var z=H.p(a?Object.keys(a):[],[null])
z.fixed$length=Array
return z}}],["","",,H,{"^":"",
vb:function(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)}}],["","",,P,{"^":"",
qh:function(){var z,y,x
z={}
if(self.scheduleImmediate!=null)return P.rM()
if(self.MutationObserver!=null&&self.document!=null){y=self.document.createElement("div")
x=self.document.createElement("span")
z.a=null
new self.MutationObserver(H.dj(new P.qj(z),1)).observe(y,{childList:true})
return new P.qi(z,y,x)}else if(self.setImmediate!=null)return P.rN()
return P.rO()},
xy:[function(a){++init.globalState.f.b
self.scheduleImmediate(H.dj(new P.qk(a),0))},"$1","rM",2,0,15],
xz:[function(a){++init.globalState.f.b
self.setImmediate(H.dj(new P.ql(a),0))},"$1","rN",2,0,15],
xA:[function(a){P.ed(C.x,a)},"$1","rO",2,0,15],
aK:function(a,b){P.eq(null,a)
return b.gh7()},
ax:function(a,b){P.eq(a,b)},
aJ:function(a,b){b.bZ(a)},
aI:function(a,b){b.eG(H.C(a),H.E(a))},
eq:function(a,b){var z,y,x,w
z=new P.rp(b)
y=new P.rq(b)
x=J.o(a)
if(!!x.$isH)a.ex(z,y)
else if(!!x.$isQ)a.f_(z,y)
else{w=new P.H(0,$.r,null,[null])
w.a=4
w.c=a
w.ex(z,null)}},
ay:function(a){var z=function(b,c){return function(d,e){while(true)try{b(d,e)
break}catch(y){e=y
d=c}}}(a,1)
$.r.toString
return new P.rK(z)},
de:function(a,b,c){var z,y,x
if(b===0){if(c.geN())c.c.eF()
else c.a.bu()
return}else if(b===1){if(c.geN())c.c.eG(H.C(a),H.E(a))
else{z=H.C(a)
y=H.E(a)
c.a.eA(z,y)
c.a.bu()}return}if(a instanceof P.bU){if(c.geN()){b.$2(2,null)
return}z=a.b
if(z===0){z=a.a
J.ds(c.a,z)
P.cD(new P.rn(b,c))
return}else if(z===1){x=a.a
c.a.ju(x,!1).c6(new P.ro(b,c))
return}}P.eq(a,b)},
rJ:function(a){return a.ge2()},
ev:function(a,b){if(H.az(a,{func:1,args:[P.au,P.au]})){b.toString
return a}else{b.toString
return a}},
aC:function(a){return new P.rg(new P.H(0,$.r,null,[a]),[a])},
ry:function(a,b,c){$.r.toString
a.bm(b,c)},
rC:function(){var z,y
for(;z=$.bw,z!=null;){$.bY=null
y=z.gcq()
$.bw=y
if(y==null)$.bX=null
z.gjw().$0()}},
xD:[function(){$.es=!0
try{P.rC()}finally{$.bY=null
$.es=!1
if($.bw!=null)$.$get$eh().$1(P.i7())}},"$0","i7",0,0,7],
i1:function(a){var z=new P.hG(a,null)
if($.bw==null){$.bX=z
$.bw=z
if(!$.es)$.$get$eh().$1(P.i7())}else{$.bX.b=z
$.bX=z}},
rI:function(a){var z,y,x
z=$.bw
if(z==null){P.i1(a)
$.bY=$.bX
return}y=new P.hG(a,null)
x=$.bY
if(x==null){y.b=z
$.bY=y
$.bw=y}else{y.b=x.b
x.b=y
$.bY=y
if(y.b==null)$.bX=y}},
cD:function(a){var z=$.r
if(C.i===z){P.by(null,null,C.i,a)
return}z.toString
P.by(null,null,z,z.eD(a,!0))},
xt:function(a,b){return new P.rd(null,a,!1,[b])},
ew:function(a){var z,y,x,w
if(a==null)return
try{a.$0()}catch(x){z=H.C(x)
y=H.E(x)
w=$.r
w.toString
P.bx(null,null,w,z,y)}},
rD:[function(a,b){var z=$.r
z.toString
P.bx(null,null,z,a,b)},function(a){return P.rD(a,null)},"$2","$1","rQ",2,2,18,0],
xC:[function(){},"$0","rP",0,0,7],
i0:function(a,b,c){var z,y,x,w,v,u,t
try{b.$1(a.$0())}catch(u){z=H.C(u)
y=H.E(u)
$.r.toString
x=null
if(x==null)c.$2(z,y)
else{t=x.gbv()
w=t
v=x.gbr()
c.$2(w,v)}}},
rr:function(a,b,c,d){var z=a.ck()
if(!!J.o(z).$isQ&&z!==$.$get$bm())z.c8(new P.rt(b,c,d))
else b.bm(c,d)},
hQ:function(a,b){return new P.rs(a,b)},
hR:function(a,b,c){var z=a.ck()
if(!!J.o(z).$isQ&&z!==$.$get$bm())z.c8(new P.ru(b,c))
else b.bl(c)},
rm:function(a,b,c){$.r.toString
a.cf(b,c)},
pC:function(a,b){var z=$.r
if(z===C.i){z.toString
return P.ed(a,b)}return P.ed(a,z.eD(b,!0))},
ed:function(a,b){var z=C.e.bM(a.a,1000)
return H.pz(z<0?0:z,b)},
pU:function(){return $.r},
bx:function(a,b,c,d,e){var z={}
z.a=d
P.rI(new P.rG(z,e))},
hY:function(a,b,c,d){var z,y
y=$.r
if(y===c)return d.$0()
$.r=c
z=y
try{y=d.$0()
return y}finally{$.r=z}},
i_:function(a,b,c,d,e){var z,y
y=$.r
if(y===c)return d.$1(e)
$.r=c
z=y
try{y=d.$1(e)
return y}finally{$.r=z}},
hZ:function(a,b,c,d,e,f){var z,y
y=$.r
if(y===c)return d.$2(e,f)
$.r=c
z=y
try{y=d.$2(e,f)
return y}finally{$.r=z}},
by:function(a,b,c,d){var z=C.i!==c
if(z)d=c.eD(d,!(!z||!1))
P.i1(d)},
qj:{"^":"a:0;a",
$1:function(a){var z,y;--init.globalState.f.b
z=this.a
y=z.a
z.a=null
y.$0()}},
qi:{"^":"a:47;a,b,c",
$1:function(a){var z,y;++init.globalState.f.b
this.a.a=a
z=this.b
y=this.c
z.firstChild?z.removeChild(y):z.appendChild(y)}},
qk:{"^":"a:2;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
ql:{"^":"a:2;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
rp:{"^":"a:0;a",
$1:function(a){return this.a.$2(0,a)}},
rq:{"^":"a:17;a",
$2:function(a,b){this.a.$2(1,new H.dC(a,b))}},
rK:{"^":"a:33;a",
$2:function(a,b){this.a(a,b)}},
rn:{"^":"a:2;a,b",
$0:function(){var z=this.b
if(z.a.gcW()){z.b=!0
return}this.a.$2(null,0)}},
ro:{"^":"a:0;a,b",
$1:function(a){var z=this.b.c!=null?2:0
this.a.$2(z,null)}},
qm:{"^":"d;a,b,c",
ge2:function(){return this.a.ge2()},
gcW:function(){return this.a.gcW()},
geN:function(){return this.c!=null},
t:function(a,b){return J.ds(this.a,b)},
eA:function(a,b){return this.a.eA(a,b)},
bu:function(){return this.a.bu()},
ij:function(a){var z=new P.qp(a)
this.a=new P.qu(null,0,null,new P.qr(z),null,new P.qs(this,z),new P.qt(this,a),[null])},
v:{
qn:function(a){var z=new P.qm(null,!1,null)
z.ij(a)
return z}}},
qp:{"^":"a:2;a",
$0:function(){P.cD(new P.qq(this.a))}},
qq:{"^":"a:2;a",
$0:function(){this.a.$2(0,null)}},
qr:{"^":"a:2;a",
$0:function(){this.a.$0()}},
qs:{"^":"a:2;a,b",
$0:function(){var z=this.a
if(z.b===!0){z.b=!1
this.b.$0()}}},
qt:{"^":"a:2;a,b",
$0:function(){var z=this.a
if(!z.a.gkp()){z.c=new P.ct(new P.H(0,$.r,null,[null]),[null])
if(z.b===!0){z.b=!1
P.cD(new P.qo(this.b))}return z.c.gh7()}}},
qo:{"^":"a:2;a",
$0:function(){this.a.$2(2,null)}},
bU:{"^":"d;ae:a<,b",
k:function(a){return"IterationMarker("+this.b+", "+H.b(this.a)+")"},
v:{
bV:function(a){return new P.bU(a,1)},
aT:function(){return C.ag},
hL:function(a){return new P.bU(a,0)},
aU:function(a){return new P.bU(a,3)}}},
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
if(y instanceof P.bU){x=y.b
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
rh:{"^":"cf;a",
ga_:function(a){return new P.bd(this.a(),null,null,null)},
$ascf:I.bg,
$asB:I.bg,
v:{
aV:function(a){return new P.rh(a)}}},
Q:{"^":"d;$ti"},
hI:{"^":"d;h7:a<,$ti",
eG:function(a,b){if(a==null)a=new P.cZ()
if(this.a.a!==0)throw H.c(new P.w("Future already completed"))
$.r.toString
this.bm(a,b)},
dC:function(a){return this.eG(a,null)}},
ct:{"^":"hI;a,$ti",
bZ:function(a){var z=this.a
if(z.a!==0)throw H.c(new P.w("Future already completed"))
z.bD(a)},
eF:function(){return this.bZ(null)},
bm:function(a,b){this.a.fj(a,b)}},
rg:{"^":"hI;a,$ti",
bZ:function(a){var z=this.a
if(z.a!==0)throw H.c(new P.w("Future already completed"))
z.bl(a)},
eF:function(){return this.bZ(null)},
bm:function(a,b){this.a.bm(a,b)}},
em:{"^":"d;em:a<,b,c,d,e,$ti",
gjf:function(){return this.b.b},
gh9:function(){return(this.c&1)!==0},
gk8:function(){return(this.c&2)!==0},
gh8:function(){return this.c===8},
k6:function(a){return this.b.b.eZ(this.d,a)},
kz:function(a){if(this.c!==6)return!0
return this.b.b.eZ(this.d,a.gbv())},
jZ:function(a){var z,y
z=this.e
y=this.b.b
if(H.az(z,{func:1,args:[,,]}))return y.kY(z,a.gbv(),a.gbr())
else return y.eZ(z,a.gbv())},
k7:function(){return this.b.b.hx(this.d)}},
H:{"^":"d;cL:a<,b,j3:c<,$ti",
giP:function(){return this.a===2},
gei:function(){return this.a>=4},
f_:function(a,b){var z=$.r
if(z!==C.i){z.toString
if(b!=null)b=P.ev(b,z)}return this.ex(a,b)},
c6:function(a){return this.f_(a,null)},
ex:function(a,b){var z,y
z=new P.H(0,$.r,null,[null])
y=b==null?1:3
this.dj(new P.em(null,z,y,a,b,[H.l(this,0),null]))
return z},
c8:function(a){var z,y
z=$.r
y=new P.H(0,z,null,this.$ti)
if(z!==C.i)z.toString
z=H.l(this,0)
this.dj(new P.em(null,y,8,a,null,[z,z]))
return y},
dj:function(a){var z,y
z=this.a
if(z<=1){a.a=this.c
this.c=a}else{if(z===2){y=this.c
if(!y.gei()){y.dj(a)
return}this.a=y.a
this.c=y.c}z=this.b
z.toString
P.by(null,null,z,new P.qE(this,a))}},
fH:function(a){var z,y,x,w,v
z={}
z.a=a
if(a==null)return
y=this.a
if(y<=1){x=this.c
this.c=a
if(x!=null){for(w=a;w.gem()!=null;)w=w.a
w.a=x}}else{if(y===2){v=this.c
if(!v.gei()){v.fH(a)
return}this.a=v.a
this.c=v.c}z.a=this.ds(a)
y=this.b
y.toString
P.by(null,null,y,new P.qL(z,this))}},
dr:function(){var z=this.c
this.c=null
return this.ds(z)},
ds:function(a){var z,y,x
for(z=a,y=null;z!=null;y=z,z=x){x=z.gem()
z.a=y}return y},
bl:function(a){var z,y
z=this.$ti
if(H.aW(a,"$isQ",z,"$asQ"))if(H.aW(a,"$isH",z,null))P.db(a,this)
else P.hK(a,this)
else{y=this.dr()
this.a=4
this.c=a
P.bu(this,y)}},
bm:[function(a,b){var z=this.dr()
this.a=8
this.c=new P.cJ(a,b)
P.bu(this,z)},function(a){return this.bm(a,null)},"lg","$2","$1","gbV",2,2,18,0],
bD:function(a){var z
if(H.aW(a,"$isQ",this.$ti,"$asQ")){this.iu(a)
return}this.a=1
z=this.b
z.toString
P.by(null,null,z,new P.qG(this,a))},
iu:function(a){var z
if(H.aW(a,"$isH",this.$ti,null)){if(a.a===8){this.a=1
z=this.b
z.toString
P.by(null,null,z,new P.qK(this,a))}else P.db(a,this)
return}P.hK(a,this)},
fj:function(a,b){var z
this.a=1
z=this.b
z.toString
P.by(null,null,z,new P.qF(this,a,b))},
il:function(a,b){this.a=4
this.c=a},
$isQ:1,
v:{
hK:function(a,b){var z,y,x
b.a=1
try{a.f_(new P.qH(b),new P.qI(b))}catch(x){z=H.C(x)
y=H.E(x)
P.cD(new P.qJ(b,z,y))}},
db:function(a,b){var z,y,x
for(;a.giP();)a=a.c
z=a.gei()
y=b.c
if(z){b.c=null
x=b.ds(y)
b.a=a.a
b.c=a.c
P.bu(b,x)}else{b.a=2
b.c=a
a.fH(y)}},
bu:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z={}
z.a=a
for(y=a;!0;){x={}
w=y.a===8
if(b==null){if(w){v=y.c
y=y.b
u=v.gbv()
t=v.gbr()
y.toString
P.bx(null,null,y,u,t)}return}for(;b.gem()!=null;b=s){s=b.a
b.a=null
P.bu(z.a,b)}r=z.a.c
x.a=w
x.b=r
y=!w
if(!y||b.gh9()||b.gh8()){q=b.gjf()
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
P.bx(null,null,y,u,t)
return}p=$.r
if(p==null?q!=null:p!==q)$.r=q
else p=null
if(b.gh8())new P.qO(z,x,w,b).$0()
else if(y){if(b.gh9())new P.qN(x,b,r).$0()}else if(b.gk8())new P.qM(z,x,b).$0()
if(p!=null)$.r=p
y=x.b
if(!!J.o(y).$isQ){o=b.b
if(y.a>=4){n=o.c
o.c=null
b=o.ds(n)
o.a=y.a
o.c=y.c
z.a=y
continue}else P.db(y,o)
return}}o=b.b
b=o.dr()
y=x.a
u=x.b
if(!y){o.a=4
o.c=u}else{o.a=8
o.c=u}z.a=o
y=o}}}},
qE:{"^":"a:2;a,b",
$0:function(){P.bu(this.a,this.b)}},
qL:{"^":"a:2;a,b",
$0:function(){P.bu(this.b,this.a.a)}},
qH:{"^":"a:0;a",
$1:function(a){var z=this.a
z.a=0
z.bl(a)}},
qI:{"^":"a:52;a",
$2:function(a,b){this.a.bm(a,b)},
$1:function(a){return this.$2(a,null)}},
qJ:{"^":"a:2;a,b,c",
$0:function(){this.a.bm(this.b,this.c)}},
qG:{"^":"a:2;a,b",
$0:function(){var z,y
z=this.a
y=z.dr()
z.a=4
z.c=this.b
P.bu(z,y)}},
qK:{"^":"a:2;a,b",
$0:function(){P.db(this.b,this.a)}},
qF:{"^":"a:2;a,b,c",
$0:function(){this.a.bm(this.b,this.c)}},
qO:{"^":"a:7;a,b,c,d",
$0:function(){var z,y,x,w,v,u,t
z=null
try{z=this.d.k7()}catch(w){y=H.C(w)
x=H.E(w)
if(this.c){v=this.a.a.c.gbv()
u=y
u=v==null?u==null:v===u
v=u}else v=!1
u=this.b
if(v)u.b=this.a.a.c
else u.b=new P.cJ(y,x)
u.a=!0
return}if(!!J.o(z).$isQ){if(z instanceof P.H&&z.gcL()>=4){if(z.gcL()===8){v=this.b
v.b=z.gj3()
v.a=!0}return}t=this.a.a
v=this.b
v.b=z.c6(new P.qP(t))
v.a=!1}}},
qP:{"^":"a:0;a",
$1:function(a){return this.a}},
qN:{"^":"a:7;a,b,c",
$0:function(){var z,y,x,w
try{this.a.b=this.b.k6(this.c)}catch(x){z=H.C(x)
y=H.E(x)
w=this.a
w.b=new P.cJ(z,y)
w.a=!0}}},
qM:{"^":"a:7;a,b,c",
$0:function(){var z,y,x,w,v,u,t,s
try{z=this.a.a.c
w=this.c
if(w.kz(z)===!0&&w.e!=null){v=this.b
v.b=w.jZ(z)
v.a=!1}}catch(u){y=H.C(u)
x=H.E(u)
w=this.a
v=w.a.c.gbv()
t=y
s=this.b
if(v==null?t==null:v===t)s.b=w.a.c
else s.b=new P.cJ(y,x)
s.a=!0}}},
hG:{"^":"d;jw:a<,cq:b@"},
am:{"^":"d;$ti",
aJ:function(a,b){return new P.r2(b,this,[H.y(this,"am",0),null])},
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
cv:function(a){var z,y,x
z=H.y(this,"am",0)
y=H.p([],[z])
x=new P.H(0,$.r,null,[[P.N,z]])
this.aI(new P.p8(this,y),!0,new P.p9(y,x),x.gbV())
return x},
bH:function(a){var z,y,x
z=H.y(this,"am",0)
y=P.a6(null,null,null,z)
x=new P.H(0,$.r,null,[[P.bP,z]])
this.aI(new P.pa(this,y),!0,new P.pb(y,x),x.gbV())
return x},
gw:function(a){var z,y
z={}
y=new P.H(0,$.r,null,[H.y(this,"am",0)])
z.a=null
z.b=!1
this.aI(new P.p4(z,this),!0,new P.p5(z,y),y.gbV())
return y}},
oX:{"^":"a;a,b,c,d",
$1:function(a){var z,y
z=this.a
y=this.d
P.i0(new P.oV(this.c,a),new P.oW(z,y),P.hQ(z.a,y))},
$S:function(){return H.be(function(a){return{func:1,args:[a]}},this.b,"am")}},
oV:{"^":"a:2;a,b",
$0:function(){return J.e(this.b,this.a)}},
oW:{"^":"a:31;a,b",
$1:function(a){if(a===!0)P.hR(this.a.a,this.b,!0)}},
oY:{"^":"a:2;a",
$0:function(){this.a.bl(!1)}},
p0:{"^":"a;a,b,c,d",
$1:function(a){P.i0(new P.oZ(this.c,a),new P.p_(),P.hQ(this.a.a,this.d))},
$S:function(){return H.be(function(a){return{func:1,args:[a]}},this.b,"am")}},
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
$1:function(a){P.hR(this.a.a,this.b,!1)}},
p3:{"^":"a:2;a",
$0:function(){this.a.bl(!0)}},
p8:{"^":"a;a,b",
$1:function(a){this.b.push(a)},
$S:function(){return H.be(function(a){return{func:1,args:[a]}},this.a,"am")}},
p9:{"^":"a:2;a,b",
$0:function(){this.b.bl(this.a)}},
pa:{"^":"a;a,b",
$1:function(a){this.b.t(0,a)},
$S:function(){return H.be(function(a){return{func:1,args:[a]}},this.a,"am")}},
pb:{"^":"a:2;a,b",
$0:function(){this.b.bl(this.a)}},
p4:{"^":"a;a,b",
$1:function(a){var z=this.a
z.b=!0
z.a=a},
$S:function(){return H.be(function(a){return{func:1,args:[a]}},this.b,"am")}},
p5:{"^":"a:2;a,b",
$0:function(){var z,y,x,w
x=this.a
if(x.b){this.b.bl(x.a)
return}try{x=H.ak()
throw H.c(x)}catch(w){z=H.C(w)
y=H.E(w)
P.ry(this.b,z,y)}}},
dd:{"^":"d;cL:b<,$ti",
ge2:function(){return new P.d9(this,this.$ti)},
gkp:function(){return(this.b&4)!==0},
gcW:function(){var z=this.b
return(z&1)!==0?this.gbL().gfC():(z&2)===0},
giX:function(){if((this.b&8)===0)return this.a
return this.a.gd6()},
eb:function(){var z,y
if((this.b&8)===0){z=this.a
if(z==null){z=new P.eo(null,null,0,this.$ti)
this.a=z}return z}y=this.a
if(y.gd6()==null)y.c=new P.eo(null,null,0,this.$ti)
return y.c},
gbL:function(){if((this.b&8)!==0)return this.a.gd6()
return this.a},
cB:function(){if((this.b&4)!==0)return new P.w("Cannot add event after closing")
return new P.w("Cannot add event while adding a stream")},
ju:function(a,b){var z,y,x,w
z=this.b
if(z>=4)throw H.c(this.cB())
if((z&2)!==0){z=new P.H(0,$.r,null,[null])
z.bD(null)
return z}z=this.a
y=new P.H(0,$.r,null,[null])
x=a.aI(this.gis(),!1,this.git(),this.gip())
w=this.b
if((w&1)!==0?this.gbL().gfC():(w&2)===0)x.d_()
this.a=new P.r9(z,y,x,this.$ti)
this.b|=8
return y},
fq:function(){var z=this.c
if(z==null){z=(this.b&2)!==0?$.$get$bm():new P.H(0,$.r,null,[null])
this.c=z}return z},
t:[function(a,b){if(this.b>=4)throw H.c(this.cB())
this.bU(b)},"$1","gjh",2,0,function(){return H.be(function(a){return{func:1,v:true,args:[a]}},this.$receiver,"dd")}],
eA:function(a,b){if(this.b>=4)throw H.c(this.cB())
if(a==null)a=new P.cZ()
$.r.toString
this.cf(a,b)},
bu:function(){var z=this.b
if((z&4)!==0)return this.fq()
if(z>=4)throw H.c(this.cB())
z|=4
this.b=z
if((z&1)!==0)this.cJ()
else if((z&3)===0)this.eb().t(0,C.v)
return this.fq()},
bU:[function(a){var z=this.b
if((z&1)!==0)this.cI(a)
else if((z&3)===0)this.eb().t(0,new P.ei(a,null,this.$ti))},"$1","gis",2,0,function(){return H.be(function(a){return{func:1,v:true,args:[a]}},this.$receiver,"dd")}],
cf:[function(a,b){var z=this.b
if((z&1)!==0)this.cK(a,b)
else if((z&3)===0)this.eb().t(0,new P.ej(a,b,null))},"$2","gip",4,0,48],
e5:[function(){var z=this.a
this.a=z.gd6()
this.b&=4294967287
z.a.bD(null)},"$0","git",0,0,7],
ja:function(a,b,c,d){var z,y,x,w,v
if((this.b&3)!==0)throw H.c(new P.w("Stream has already been listened to."))
z=$.r
y=d?1:0
x=new P.qy(this,null,null,null,z,y,null,null,this.$ti)
x.fg(a,b,c,d,H.l(this,0))
w=this.giX()
y=this.b|=1
if((y&8)!==0){v=this.a
v.sd6(x)
v.b.d2()}else this.a=x
x.j8(w)
x.eg(new P.rb(this))
return x},
j0:function(a){var z,y,x,w,v,u
z=null
if((this.b&8)!==0)z=this.a.ck()
this.a=null
this.b=this.b&4294967286|2
w=this.r
if(w!=null)if(z==null)try{z=w.$0()}catch(v){y=H.C(v)
x=H.E(v)
u=new P.H(0,$.r,null,[null])
u.fj(y,x)
z=u}else z=z.c8(w)
w=new P.ra(this)
if(z!=null)z=z.c8(w)
else w.$0()
return z}},
rb:{"^":"a:2;a",
$0:function(){P.ew(this.a.d)}},
ra:{"^":"a:7;a",
$0:function(){var z=this.a.c
if(z!=null&&z.a===0)z.bD(null)}},
rj:{"^":"d;$ti",
cI:function(a){this.gbL().bU(a)},
cK:function(a,b){this.gbL().cf(a,b)},
cJ:function(){this.gbL().e5()}},
qv:{"^":"d;$ti",
cI:function(a){this.gbL().cg(new P.ei(a,null,[H.l(this,0)]))},
cK:function(a,b){this.gbL().cg(new P.ej(a,b,null))},
cJ:function(){this.gbL().cg(C.v)}},
qu:{"^":"dd+qv;a,b,c,d,e,f,r,$ti"},
ri:{"^":"dd+rj;a,b,c,d,e,f,r,$ti"},
d9:{"^":"rc;a,$ti",
gB:function(a){return(H.aF(this.a)^892482866)>>>0},
A:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof P.d9))return!1
return b.a===this.a}},
qy:{"^":"cu;x,a,b,c,d,e,f,r,$ti",
en:function(){return this.x.j0(this)},
ep:[function(){var z=this.x
if((z.b&8)!==0)z.a.d_()
P.ew(z.e)},"$0","geo",0,0,7],
er:[function(){var z=this.x
if((z.b&8)!==0)z.a.d2()
P.ew(z.f)},"$0","geq",0,0,7]},
qe:{"^":"d;$ti",
d_:function(){this.b.d_()},
d2:function(){this.b.d2()},
ck:function(){var z=this.b.ck()
if(z==null){this.a.bD(null)
return}return z.c8(new P.qf(this))},
eF:function(){this.a.bD(null)}},
qf:{"^":"a:2;a",
$0:function(){this.a.a.bD(null)}},
r9:{"^":"qe;d6:c@,a,b,$ti"},
cu:{"^":"d;cL:e<,$ti",
j8:function(a){if(a==null)return
this.r=a
if(!a.gY(a)){this.e=(this.e|64)>>>0
this.r.dc(this)}},
kG:function(a){var z=this.e
if((z&8)!==0)return
this.e=(z+128|4)>>>0
if(z<128&&this.r!=null)this.r.fV()
if((z&4)===0&&(this.e&32)===0)this.eg(this.geo())},
d_:function(){return this.kG(null)},
d2:function(){var z=this.e
if((z&8)!==0)return
if(z>=128){z-=128
this.e=z
if(z<128){if((z&64)!==0){z=this.r
z=!z.gY(z)}else z=!1
if(z)this.r.dc(this)
else{z=(this.e&4294967291)>>>0
this.e=z
if((z&32)===0)this.eg(this.geq())}}}},
ck:function(){var z=(this.e&4294967279)>>>0
this.e=z
if((z&8)===0)this.e6()
z=this.f
return z==null?$.$get$bm():z},
gfC:function(){return(this.e&4)!==0},
gcW:function(){return this.e>=128},
e6:function(){var z=(this.e|8)>>>0
this.e=z
if((z&64)!==0)this.r.fV()
if((this.e&32)===0)this.r=null
this.f=this.en()},
bU:["i5",function(a){var z=this.e
if((z&8)!==0)return
if(z<32)this.cI(a)
else this.cg(new P.ei(a,null,[H.y(this,"cu",0)]))}],
cf:["i6",function(a,b){var z=this.e
if((z&8)!==0)return
if(z<32)this.cK(a,b)
else this.cg(new P.ej(a,b,null))}],
e5:function(){var z=this.e
if((z&8)!==0)return
z=(z|2)>>>0
this.e=z
if(z<32)this.cJ()
else this.cg(C.v)},
ep:[function(){},"$0","geo",0,0,7],
er:[function(){},"$0","geq",0,0,7],
en:function(){return},
cg:function(a){var z,y
z=this.r
if(z==null){z=new P.eo(null,null,0,[H.y(this,"cu",0)])
this.r=z}z.t(0,a)
y=this.e
if((y&64)===0){y=(y|64)>>>0
this.e=y
if(y<128)this.r.dc(this)}},
cI:function(a){var z=this.e
this.e=(z|32)>>>0
this.d.hA(this.a,a)
this.e=(this.e&4294967263)>>>0
this.e8((z&4)!==0)},
cK:function(a,b){var z,y
z=this.e
y=new P.qx(this,a,b)
if((z&1)!==0){this.e=(z|16)>>>0
this.e6()
z=this.f
if(!!J.o(z).$isQ&&z!==$.$get$bm())z.c8(y)
else y.$0()}else{y.$0()
this.e8((z&4)!==0)}},
cJ:function(){var z,y
z=new P.qw(this)
this.e6()
this.e=(this.e|16)>>>0
y=this.f
if(!!J.o(y).$isQ&&y!==$.$get$bm())y.c8(z)
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
if((z&64)!==0&&z<128)this.r.dc(this)},
fg:function(a,b,c,d,e){var z=this.d
z.toString
this.a=a
this.b=P.ev(b==null?P.rQ():b,z)
this.c=c==null?P.rP():c}},
qx:{"^":"a:7;a,b,c",
$0:function(){var z,y,x,w,v,u
z=this.a
y=z.e
if((y&8)!==0&&(y&16)===0)return
z.e=(y|32)>>>0
y=z.b
x=H.az(y,{func:1,args:[P.d,P.b2]})
w=z.d
v=this.b
u=z.b
if(x)w.kZ(u,v,this.c)
else w.hA(u,v)
z.e=(z.e&4294967263)>>>0}},
qw:{"^":"a:7;a",
$0:function(){var z,y
z=this.a
y=z.e
if((y&16)===0)return
z.e=(y|42)>>>0
z.d.hy(z.c)
z.e=(z.e&4294967263)>>>0}},
rc:{"^":"am;$ti",
aI:function(a,b,c,d){return this.a.ja(a,d,c,!0===b)},
eT:function(a,b,c){return this.aI(a,null,b,c)}},
ek:{"^":"d;cq:a@,$ti"},
ei:{"^":"ek;ae:b<,a,$ti",
eU:function(a){a.cI(this.b)}},
ej:{"^":"ek;bv:b<,br:c<,a",
eU:function(a){a.cK(this.b,this.c)},
$asek:I.bg},
qz:{"^":"d;",
eU:function(a){a.cJ()},
gcq:function(){return},
scq:function(a){throw H.c(new P.w("No events after a done."))}},
r4:{"^":"d;cL:a<,$ti",
dc:function(a){var z=this.a
if(z===1)return
if(z>=1){this.a=1
return}P.cD(new P.r5(this,a))
this.a=1},
fV:function(){if(this.a===1)this.a=3}},
r5:{"^":"a:2;a,b",
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
eo:{"^":"r4;b,c,a,$ti",
gY:function(a){return this.c==null},
t:function(a,b){var z=this.c
if(z==null){this.c=b
this.b=b}else{z.scq(b)
this.c=b}}},
rd:{"^":"d;a,b,c,$ti"},
rt:{"^":"a:2;a,b,c",
$0:function(){return this.a.bm(this.b,this.c)}},
rs:{"^":"a:17;a,b",
$2:function(a,b){P.rr(this.a,this.b,a,b)}},
ru:{"^":"a:2;a,b",
$0:function(){return this.a.bl(this.b)}},
el:{"^":"am;$ti",
aI:function(a,b,c,d){return this.iB(a,d,c,!0===b)},
eT:function(a,b,c){return this.aI(a,null,b,c)},
iB:function(a,b,c,d){return P.qD(this,a,b,c,d,H.y(this,"el",0),H.y(this,"el",1))},
fz:function(a,b){b.bU(a)},
iN:function(a,b,c){c.cf(a,b)},
$asam:function(a,b){return[b]}},
hJ:{"^":"cu;x,y,a,b,c,d,e,f,r,$ti",
bU:function(a){if((this.e&2)!==0)return
this.i5(a)},
cf:function(a,b){if((this.e&2)!==0)return
this.i6(a,b)},
ep:[function(){var z=this.y
if(z==null)return
z.d_()},"$0","geo",0,0,7],
er:[function(){var z=this.y
if(z==null)return
z.d2()},"$0","geq",0,0,7],
en:function(){var z=this.y
if(z!=null){this.y=null
return z.ck()}return},
li:[function(a){this.x.fz(a,this)},"$1","giK",2,0,function(){return H.be(function(a,b){return{func:1,v:true,args:[a]}},this.$receiver,"hJ")}],
lk:[function(a,b){this.x.iN(a,b,this)},"$2","giM",4,0,40],
lj:[function(){this.e5()},"$0","giL",0,0,7],
ik:function(a,b,c,d,e,f,g){this.y=this.x.a.eT(this.giK(),this.giL(),this.giM())},
$ascu:function(a,b){return[b]},
v:{
qD:function(a,b,c,d,e,f,g){var z,y
z=$.r
y=e?1:0
y=new P.hJ(a,null,null,null,null,z,y,null,null,[f,g])
y.fg(b,c,d,e,g)
y.ik(a,b,c,d,e,f,g)
return y}}},
r2:{"^":"el;b,a,$ti",
fz:function(a,b){var z,y,x,w
z=null
try{z=this.b.$1(a)}catch(w){y=H.C(w)
x=H.E(w)
P.rm(b,y,x)
return}b.bU(z)}},
cJ:{"^":"d;bv:a<,br:b<",
k:function(a){return H.b(this.a)},
$isa5:1},
rl:{"^":"d;"},
rG:{"^":"a:2;a,b",
$0:function(){var z,y,x
z=this.a
y=z.a
if(y==null){x=new P.cZ()
z.a=x
z=x}else z=y
y=this.b
if(y==null)throw H.c(z)
x=H.c(z)
x.stack=J.h(y)
throw x}},
r6:{"^":"rl;",
hy:function(a){var z,y,x,w
try{if(C.i===$.r){x=a.$0()
return x}x=P.hY(null,null,this,a)
return x}catch(w){z=H.C(w)
y=H.E(w)
x=P.bx(null,null,this,z,y)
return x}},
hA:function(a,b){var z,y,x,w
try{if(C.i===$.r){x=a.$1(b)
return x}x=P.i_(null,null,this,a,b)
return x}catch(w){z=H.C(w)
y=H.E(w)
x=P.bx(null,null,this,z,y)
return x}},
kZ:function(a,b,c){var z,y,x,w
try{if(C.i===$.r){x=a.$2(b,c)
return x}x=P.hZ(null,null,this,a,b,c)
return x}catch(w){z=H.C(w)
y=H.E(w)
x=P.bx(null,null,this,z,y)
return x}},
eD:function(a,b){if(b)return new P.r7(this,a)
else return new P.r8(this,a)},
j:function(a,b){return},
hx:function(a){if($.r===C.i)return a.$0()
return P.hY(null,null,this,a)},
eZ:function(a,b){if($.r===C.i)return a.$1(b)
return P.i_(null,null,this,a,b)},
kY:function(a,b,c){if($.r===C.i)return a.$2(b,c)
return P.hZ(null,null,this,a,b,c)}},
r7:{"^":"a:2;a,b",
$0:function(){return this.a.hy(this.b)}},
r8:{"^":"a:2;a,b",
$0:function(){return this.a.hx(this.b)}}}],["","",,P,{"^":"",
dO:function(a,b){return new H.R(0,null,null,null,null,null,0,[a,b])},
b0:function(){return new H.R(0,null,null,null,null,null,0,[null,null])},
a0:function(a){return H.uf(a,new H.R(0,null,null,null,null,null,0,[null,null]))},
m4:function(a,b,c){var z,y
if(P.et(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}z=[]
y=$.$get$bZ()
y.push(a)
try{P.rB(a,z)}finally{if(0>=y.length)return H.f(y,-1)
y.pop()}y=P.hd(b,z,", ")+c
return y.charCodeAt(0)==0?y:y},
cg:function(a,b,c){var z,y,x
if(P.et(a))return b+"..."+c
z=new P.bS(b)
y=$.$get$bZ()
y.push(a)
try{x=z
x.C=P.hd(x.gC(),a,", ")}finally{if(0>=y.length)return H.f(y,-1)
y.pop()}y=z
y.C=y.gC()+c
y=z.gC()
return y.charCodeAt(0)==0?y:y},
et:function(a){var z,y
for(z=0;y=$.$get$bZ(),z<y.length;++z)if(a===y[z])return!0
return!1},
rB:function(a,b){var z,y,x,w,v,u,t,s,r,q
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
ck:function(a,b,c){var z=P.mq(null,null,null,b,c)
a.Z(0,new P.rS(z))
return z},
a6:function(a,b,c,d){return new P.hM(0,null,null,null,null,null,0,[d])},
b9:function(a,b){var z,y
z=P.a6(null,null,null,b)
for(y=J.aj(a);y.u();)z.t(0,y.gU())
return z},
dT:function(a){var z,y,x
z={}
if(P.et(a))return"{...}"
y=new P.bS("")
try{$.$get$bZ().push(a)
x=y
x.C=x.gC()+"{"
z.a=!0
a.Z(0,new P.mB(z,y))
z=y
z.C=z.gC()+"}"}finally{z=$.$get$bZ()
if(0>=z.length)return H.f(z,-1)
z.pop()}z=y.gC()
return z.charCodeAt(0)==0?z:z},
hN:{"^":"R;a,b,c,d,e,f,r,$ti",
cU:function(a){return H.v3(a)&0x3ffffff},
cV:function(a,b){var z,y,x
if(a==null)return-1
z=a.length
for(y=0;y<z;++y){x=a[y].ghb()
if(x==null?b==null:x===b)return y}return-1},
v:{
bW:function(a,b){return new P.hN(0,null,null,null,null,null,0,[a,b])}}},
hM:{"^":"qQ;a,b,c,d,e,f,r,$ti",
el:function(){return new P.hM(0,null,null,null,null,null,0,this.$ti)},
ga_:function(a){var z=new P.ag(this,this.r,null,null,[null])
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
return y[b]!=null}else return this.iz(b)},
iz:function(a){var z=this.d
if(z==null)return!1
return this.dm(z[this.dl(a)],a)>=0},
cp:function(a){var z
if(!(typeof a==="string"&&a!=="__proto__"))z=typeof a==="number"&&(a&0x3ffffff)===a
else z=!0
if(z)return this.a7(0,a)?a:null
else return this.iR(a)},
iR:function(a){var z,y,x
z=this.d
if(z==null)return
y=z[this.dl(a)]
x=this.dm(y,a)
if(x<0)return
return J.aB(y,x).gfp()},
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
z=y}return this.fk(z,b)}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.c=y
x=y}return this.fk(x,b)}else return this.aE(b)},
aE:function(a){var z,y,x
z=this.d
if(z==null){z=P.qZ()
this.d=z}y=this.dl(a)
x=z[y]
if(x==null)z[y]=[this.e9(a)]
else{if(this.dm(x,a)>=0)return!1
x.push(this.e9(a))}return!0},
a3:function(a,b){if(typeof b==="string"&&b!=="__proto__")return this.fl(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.fl(this.c,b)
else return this.j1(b)},
j1:function(a){var z,y,x
z=this.d
if(z==null)return!1
y=z[this.dl(a)]
x=this.dm(y,a)
if(x<0)return!1
this.fm(y.splice(x,1)[0])
return!0},
iH:function(a,b){var z,y,x,w,v
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
fk:function(a,b){if(a[b]!=null)return!1
a[b]=this.e9(b)
return!0},
fl:function(a,b){var z
if(a==null)return!1
z=a[b]
if(z==null)return!1
this.fm(z)
delete a[b]
return!0},
e9:function(a){var z,y
z=new P.qY(a,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.c=y
y.b=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
fm:function(a){var z,y
z=a.giy()
y=a.b
if(z==null)this.e=y
else z.b=y
if(y==null)this.f=z
else y.c=z;--this.a
this.r=this.r+1&67108863},
dl:function(a){return J.j(a)&0x3ffffff},
dm:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.e(a[y].gfp(),b))return y
return-1},
$isbP:1,
$isa_:1,
v:{
qZ:function(){var z=Object.create(null)
z["<non-identifier-key>"]=z
delete z["<non-identifier-key>"]
return z}}},
qY:{"^":"d;fp:a<,b,iy:c<"},
ag:{"^":"d;a,b,c,d,$ti",
gU:function(){return this.d},
u:function(){var z=this.a
if(this.b!==z.r)throw H.c(new P.D(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.b
return!0}}}},
qQ:{"^":"oj;$ti",
bH:function(a){var z=this.el()
z.ax(0,this)
return z}},
cf:{"^":"B;$ti"},
rS:{"^":"a:6;a",
$2:function(a,b){this.a.n(0,a,b)}},
ft:{"^":"fC;$ti"},
fC:{"^":"d+ba;$ti",$asN:null,$asa_:null,$isN:1,$isa_:1},
ba:{"^":"d;$ti",
ga_:function(a){return new H.dP(this,this.gl(this),0,null,[H.y(this,"ba",0)])},
au:function(a,b){return this.j(0,b)},
Z:function(a,b){var z,y
z=this.gl(this)
for(y=0;y<z;++y){b.$1(this.j(0,y))
if(z!==this.gl(this))throw H.c(new P.D(this))}},
gY:function(a){return this.gl(this)===0},
gav:function(a){return!this.gY(this)},
gw:function(a){if(this.gl(this)===0)throw H.c(H.ak())
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
aJ:function(a,b){return new H.ar(this,b,[H.y(this,"ba",0),null])},
e1:function(a,b){return H.hf(this,b,null,H.y(this,"ba",0))},
bH:function(a){var z,y
z=P.a6(null,null,null,H.y(this,"ba",0))
for(y=0;y<this.gl(this);++y)z.t(0,this.j(0,y))
return z},
t:function(a,b){var z=this.gl(this)
this.sl(0,z+1)
this.n(0,z,b)},
a3:function(a,b){var z
for(z=0;z<this.gl(this);++z)if(J.e(this.j(0,z),b)){this.b7(0,z,this.gl(this)-1,this,z+1)
this.sl(0,this.gl(this)-1)
return!0}return!1},
iG:function(a,b){var z,y,x,w
z=H.p([],[H.y(this,"ba",0)])
y=this.gl(this)
for(x=0;x<y;++x){w=this.j(0,x)
if(J.e(a.$1(w),b))z.push(w)
if(y!==this.gl(this))throw H.c(new P.D(this))}if(z.length!==this.gl(this)){this.hX(0,0,z.length,z)
this.sl(0,z.length)}},
b7:function(a,b,c,d,e){var z,y,x,w,v
P.cn(b,c,this.gl(this),null,null,null)
z=c-b
if(z===0)return
if(H.aW(d,"$isN",[H.y(this,"ba",0)],"$asN")){y=e
x=d}else{x=J.j0(d,e).bG(0,!1)
y=0}w=J.L(x)
if(y+z>w.gl(x))throw H.c(H.fh())
if(y<b)for(v=z-1;v>=0;--v)this.n(0,b+v,w.j(x,y+v))
else for(v=0;v<z;++v)this.n(0,b+v,w.j(x,y+v))},
hX:function(a,b,c,d){return this.b7(a,b,c,d,0)},
bQ:function(a,b,c){var z
if(c>=this.gl(this))return-1
for(z=c;z<this.gl(this);++z)if(J.e(this.j(0,z),b))return z
return-1},
b3:function(a,b){return this.bQ(a,b,0)},
k:function(a){return P.cg(this,"[","]")},
$isN:1,
$isa_:1},
rk:{"^":"d;$ti",
n:function(a,b,c){throw H.c(new P.S("Cannot modify unmodifiable map"))},
$isI:1},
mz:{"^":"d;$ti",
j:function(a,b){return this.a.j(0,b)},
n:function(a,b,c){this.a.n(0,b,c)},
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
hB:{"^":"mz+rk;a,$ti",$asI:null,$isI:1},
mB:{"^":"a:6;a,b",
$2:function(a,b){var z,y
z=this.a
if(!z.a)this.b.C+=", "
z.a=!1
z=this.b
y=z.C+=H.b(a)
z.C=y+": "
z.C+=H.b(b)}},
mr:{"^":"b1;a,b,c,d,$ti",
ga_:function(a){return new P.dc(this,this.c,this.d,this.b,null,this.$ti)},
Z:function(a,b){var z,y,x
z=this.d
for(y=this.b;y!==this.c;y=(y+1&this.a.length-1)>>>0){x=this.a
if(y<0||y>=x.length)return H.f(x,y)
b.$1(x[y])
if(z!==this.d)H.i(new P.D(this))}},
gY:function(a){return this.b===this.c},
gl:function(a){return(this.c-this.b&this.a.length-1)>>>0},
gw:function(a){var z,y,x
z=this.b
y=this.c
if(z===y)throw H.c(H.ak())
z=this.a
x=z.length
y=(y-1&x-1)>>>0
if(y<0||y>=x)return H.f(z,y)
return z[y]},
au:function(a,b){var z,y,x,w
z=(this.c-this.b&this.a.length-1)>>>0
if(0>b||b>=z)H.i(P.cU(b,this,"index",null,z))
y=this.a
x=y.length
w=(this.b+b&x-1)>>>0
if(w<0||w>=x)return H.f(y,w)
return y[w]},
t:function(a,b){this.aE(b)},
ax:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=this.$ti
if(H.aW(b,"$isN",z,"$asN")){y=b.gl(b)
x=this.gl(this)
w=x+y
v=this.a
u=v.length
if(w>=u){t=P.ms(w+(w>>>1))
if(typeof t!=="number")return H.x(t)
v=new Array(t)
v.fixed$length=Array
s=H.p(v,z)
this.c=this.je(s)
this.a=s
this.b=0
C.a.b7(s,x,w,b,0)
this.c+=y}else{z=this.c
r=u-z
if(y<r){C.a.b7(v,z,z+y,b,0)
this.c+=y}else{q=y-r
C.a.b7(v,z,z+r,b,0)
C.a.b7(this.a,0,q,b,r)
this.c=q}}++this.d}else for(z=new P.dc(b,b.c,b.d,b.b,null,[H.l(b,0)]);z.u();)this.aE(z.e)},
bh:function(a){var z,y,x,w,v
z=this.b
y=this.c
if(z!==y){for(x=this.a,w=x.length,v=w-1;z!==y;z=(z+1&v)>>>0){if(z<0||z>=w)return H.f(x,z)
x[z]=null}this.c=0
this.b=0;++this.d}},
k:function(a){return P.cg(this,"{","}")},
fS:function(a){var z,y,x
z=this.b
y=this.a
x=y.length
z=(z-1&x-1)>>>0
this.b=z
if(z<0||z>=x)return H.f(y,z)
y[z]=a
if(z===this.c)this.fw();++this.d},
dL:function(){var z,y,x,w
z=this.b
if(z===this.c)throw H.c(H.ak());++this.d
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
if(this.b===x)this.fw();++this.d},
fw:function(){var z,y,x,w
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
je:function(a){var z,y,x,w,v
z=this.b
y=this.c
x=this.a
if(z<=y){w=y-z
C.a.b7(a,0,w,x,z)
return w}else{v=x.length-z
C.a.b7(a,0,v,x,z)
C.a.b7(a,v,v+this.c,this.a,0)
return this.c+v}},
i9:function(a,b){var z=new Array(8)
z.fixed$length=Array
this.a=H.p(z,[b])},
v:{
bb:function(a,b){var z=new P.mr(null,0,0,0,[b])
z.i9(a,b)
return z},
ms:function(a){var z
a=C.P.f8(a,1)-1
for(;!0;a=z)z=(a&a-1)>>>0}}},
dc:{"^":"d;a,b,c,d,e,$ti",
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
jB:function(a){var z,y
for(z=a.a,y=new P.ag(z,z.r,null,null,[null]),y.c=z.e;y.u();)if(!this.a7(0,y.d))return!1
return!0},
bG:function(a,b){var z,y,x,w,v
z=H.p([],this.$ti)
C.a.sl(z,this.a)
for(y=new P.ag(this,this.r,null,null,[null]),y.c=this.e,x=0;y.u();x=v){w=y.d
v=x+1
if(x>=z.length)return H.f(z,x)
z[x]=w}return z},
cv:function(a){return this.bG(a,!0)},
aJ:function(a,b){return new H.bG(this,b,[H.l(this,0),null])},
k:function(a){return P.cg(this,"{","}")},
Z:function(a,b){var z
for(z=new P.ag(this,this.r,null,null,[null]),z.c=this.e;z.u();)b.$1(z.d)},
bw:function(a,b,c){var z,y
for(z=new P.ag(this,this.r,null,null,[null]),z.c=this.e,y=b;z.u();)y=c.$2(y,z.d)
return y},
gw:function(a){var z,y
z=new P.ag(this,this.r,null,null,[null])
z.c=this.e
if(!z.u())throw H.c(H.ak())
do y=z.d
while(z.u())
return y},
aU:function(a,b,c){var z,y
for(z=new P.ag(this,this.r,null,null,[null]),z.c=this.e;z.u();){y=z.d
if(b.$1(y)===!0)return y}if(c!=null)return c.$0()
throw H.c(H.ak())},
cl:function(a,b){return this.aU(a,b,null)},
bC:function(a,b){var z,y,x,w
for(z=new P.ag(this,this.r,null,null,[null]),z.c=this.e,y=null,x=!1;z.u();){w=z.d
if(b.$1(w)===!0){if(x)throw H.c(H.dF())
y=w
x=!0}}if(x)return y
throw H.c(H.ak())},
$isbP:1,
$isa_:1},
oj:{"^":"ok;$ti"}}],["","",,P,{"^":"",
df:function(a){var z
if(a==null)return
if(typeof a!="object")return a
if(Object.getPrototypeOf(a)!==Array.prototype)return new P.qT(a,Object.create(null),null)
for(z=0;z<a.length;++z)a[z]=P.df(a[z])
return a},
rE:function(a,b){var z,y,x,w
if(typeof a!=="string")throw H.c(H.T(a))
z=null
try{z=JSON.parse(a)}catch(x){y=H.C(x)
w=String(y)
throw H.c(new P.fc(w,null,null))}w=P.df(z)
return w},
xB:[function(a){return a.dR()},"$1","tQ",2,0,0],
qT:{"^":"d;a,b,c",
j:function(a,b){var z,y
z=this.b
if(z==null)return this.c.j(0,b)
else if(typeof b!=="string")return
else{y=z[b]
return typeof y=="undefined"?this.j_(b):y}},
gl:function(a){var z
if(this.b==null){z=this.c
z=z.gl(z)}else z=this.cD().length
return z},
gY:function(a){var z
if(this.b==null){z=this.c
z=z.gl(z)}else z=this.cD().length
return z===0},
gav:function(a){var z
if(this.b==null){z=this.c
z=z.gl(z)}else z=this.cD().length
return z>0},
n:function(a,b,c){var z,y
if(this.b==null)this.c.n(0,b,c)
else if(this.ad(b)){z=this.b
z[b]=c
y=this.a
if(y==null?z!=null:y!==z)y[b]=null}else this.jc().n(0,b,c)},
ad:function(a){if(this.b==null)return this.c.ad(a)
if(typeof a!=="string")return!1
return Object.prototype.hasOwnProperty.call(this.a,a)},
Z:function(a,b){var z,y,x,w
if(this.b==null)return this.c.Z(0,b)
z=this.cD()
for(y=0;y<z.length;++y){x=z[y]
w=this.b[x]
if(typeof w=="undefined"){w=P.df(this.a[x])
this.b[x]=w}b.$2(x,w)
if(z!==this.c)throw H.c(new P.D(this))}},
k:function(a){return P.dT(this)},
cD:function(){var z=this.c
if(z==null){z=Object.keys(this.a)
this.c=z}return z},
jc:function(){var z,y,x,w,v
if(this.b==null)return this.c
z=P.dO(P.q,null)
y=this.cD()
for(x=0;w=y.length,x<w;++x){v=y[x]
z.n(0,v,this.j(0,v))}if(w===0)y.push(null)
else C.a.sl(y,0)
this.b=null
this.a=null
this.c=z
return z},
j_:function(a){var z
if(!Object.prototype.hasOwnProperty.call(this.a,a))return
z=P.df(this.a[a])
return this.b[a]=z},
$isI:1,
$asI:function(){return[P.q,null]}},
f5:{"^":"d;$ti"},
cP:{"^":"d;$ti"},
dK:{"^":"a5;a,b",
k:function(a){if(this.b!=null)return"Converting object to an encodable object failed."
else return"Converting object did not return an encodable object."}},
m9:{"^":"dK;a,b",
k:function(a){return"Cyclic error in JSON stringify"}},
m8:{"^":"f5;a,b",
jF:function(a,b){var z=P.rE(a,this.gjG().a)
return z},
jE:function(a){return this.jF(a,null)},
jO:function(a,b){var z=this.gjP()
z=P.qV(a,z.b,z.a)
return z},
h2:function(a){return this.jO(a,null)},
gjP:function(){return C.S},
gjG:function(){return C.R},
$asf5:function(){return[P.d,P.q]}},
mb:{"^":"cP;a,b",
$ascP:function(){return[P.d,P.q]}},
ma:{"^":"cP;a",
$ascP:function(){return[P.q,P.d]}},
qW:{"^":"d;",
hJ:function(a){var z,y,x,w,v,u,t
z=J.L(a)
y=z.gl(a)
if(typeof y!=="number")return H.x(y)
x=this.c
w=0
v=0
for(;v<y;++v){u=z.cR(a,v)
if(u>92)continue
if(u<32){if(v>w)x.C+=C.b.aM(a,w,v)
w=v+1
x.C+=H.as(92)
switch(u){case 8:x.C+=H.as(98)
break
case 9:x.C+=H.as(116)
break
case 10:x.C+=H.as(110)
break
case 12:x.C+=H.as(102)
break
case 13:x.C+=H.as(114)
break
default:x.C+=H.as(117)
x.C+=H.as(48)
x.C+=H.as(48)
t=u>>>4&15
x.C+=H.as(t<10?48+t:87+t)
t=u&15
x.C+=H.as(t<10?48+t:87+t)
break}}else if(u===34||u===92){if(v>w)x.C+=C.b.aM(a,w,v)
w=v+1
x.C+=H.as(92)
x.C+=H.as(u)}}if(w===0)x.C+=H.b(a)
else if(w<y)x.C+=z.aM(a,w,y)},
e7:function(a){var z,y,x,w
for(z=this.a,y=z.length,x=0;x<y;++x){w=z[x]
if(a==null?w==null:a===w)throw H.c(new P.m9(a,null))}z.push(a)},
dU:function(a){var z,y,x,w
if(this.hI(a))return
this.e7(a)
try{z=this.b.$1(a)
if(!this.hI(z))throw H.c(new P.dK(a,null))
x=this.a
if(0>=x.length)return H.f(x,-1)
x.pop()}catch(w){y=H.C(w)
throw H.c(new P.dK(a,y))}},
hI:function(a){var z,y
if(typeof a==="number"){if(!isFinite(a))return!1
this.c.C+=C.j.k(a)
return!0}else if(a===!0){this.c.C+="true"
return!0}else if(a===!1){this.c.C+="false"
return!0}else if(a==null){this.c.C+="null"
return!0}else if(typeof a==="string"){z=this.c
z.C+='"'
this.hJ(a)
z.C+='"'
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
z.C+="["
y=J.L(a)
if(y.gl(a)>0){this.dU(y.j(a,0))
for(x=1;x<y.gl(a);++x){z.C+=","
this.dU(y.j(a,x))}}z.C+="]"},
lc:function(a){var z,y,x,w,v,u,t
z={}
if(a.gY(a)){this.c.C+="{}"
return!0}y=a.gl(a)*2
x=new Array(y)
z.a=0
z.b=!0
a.Z(0,new P.qX(z,x))
if(!z.b)return!1
w=this.c
w.C+="{"
for(v='"',u=0;u<y;u+=2,v=',"'){w.C+=v
this.hJ(x[u])
w.C+='":'
t=u+1
if(t>=y)return H.f(x,t)
this.dU(x[t])}w.C+="}"
return!0}},
qX:{"^":"a:6;a,b",
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
qU:{"^":"qW;c,a,b",v:{
qV:function(a,b,c){var z,y,x
z=new P.bS("")
y=new P.qU(z,[],P.tQ())
y.dU(a)
x=z.C
return x.charCodeAt(0)==0?x:x}}}}],["","",,P,{"^":"",
wX:[function(a,b){return J.bE(a,b)},"$2","tR",4,0,42],
f9:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.h(a)
if(typeof a==="string")return JSON.stringify(a)
return P.l8(a)},
l8:function(a){var z=J.o(a)
if(!!z.$isa)return z.k(a)
return H.d0(a)},
cS:function(a){return new P.qC(a)},
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
aE:function(a,b){var z=P.P(a,!1,b)
z.fixed$length=Array
z.immutable$list=Array
return z},
eG:function(a){H.vb(H.b(a))},
bq:function(a,b,c){return new H.dH(a,H.dI(a,!1,b,!1),null,null)},
X:{"^":"d;"},
"+bool":0,
V:{"^":"d;$ti"},
cQ:{"^":"d;jd:a<,b",
A:function(a,b){if(b==null)return!1
if(!(b instanceof P.cQ))return!1
return this.a===b.a&&!0},
bE:function(a,b){return C.e.bE(this.a,b.gjd())},
gB:function(a){var z=this.a
return(z^C.e.du(z,30))&1073741823},
k:function(a){var z,y,x,w,v,u,t,s
z=P.km(H.nr(this))
y=P.c7(H.np(this))
x=P.c7(H.nl(this))
w=P.c7(H.nm(this))
v=P.c7(H.no(this))
u=P.c7(H.nq(this))
t=P.kn(H.nn(this))
s=z+"-"+y+"-"+x+" "+w+":"+v+":"+u+"."+t
return s},
t:function(a,b){var z,y
z=this.a+b.gkd()
y=new P.cQ(z,!1)
if(!(Math.abs(z)>864e13))z=!1
else z=!0
if(z)H.i(P.G(y.gkA()))
return y},
gkA:function(){return this.a},
$isV:1,
$asV:function(){return[P.cQ]},
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
c7:function(a){if(a>=10)return""+a
return"0"+a}}},
aX:{"^":"M;",$isV:1,
$asV:function(){return[P.M]}},
"+double":0,
b8:{"^":"d;bW:a<",
aj:function(a,b){return new P.b8(this.a+b.gbW())},
at:function(a,b){return new P.b8(this.a-b.gbW())},
cb:function(a,b){if(typeof b!=="number")return H.x(b)
return new P.b8(C.j.hw(this.a*b))},
b0:function(a,b){return C.e.b0(this.a,b.gbW())},
bk:function(a,b){return this.a>b.gbW()},
da:function(a,b){return this.a<=b.gbW()},
bT:function(a,b){return C.e.bT(this.a,b.gbW())},
gkd:function(){return C.e.bM(this.a,1000)},
A:function(a,b){if(b==null)return!1
if(!(b instanceof P.b8))return!1
return this.a===b.a},
gB:function(a){return this.a&0x1FFFFFFF},
bE:function(a,b){return C.e.bE(this.a,b.gbW())},
k:function(a){var z,y,x,w,v
z=new P.kQ()
y=this.a
if(y<0)return"-"+new P.b8(0-y).k(0)
x=z.$1(C.e.bM(y,6e7)%60)
w=z.$1(C.e.bM(y,1e6)%60)
v=new P.kP().$1(y%1e6)
return""+C.e.bM(y,36e8)+":"+H.b(x)+":"+H.b(w)+"."+H.b(v)},
f7:function(a){return new P.b8(0-this.a)},
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
cZ:{"^":"a5;",
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
u=P.f9(this.b)
return w+v+": "+H.b(u)},
v:{
G:function(a){return new P.b7(!1,null,null,a)},
cI:function(a,b,c){return new P.b7(!0,a,b,c)},
m:function(a){return new P.b7(!1,null,a,"Must not be null")}}},
e7:{"^":"b7;e,f,a,b,c,d",
ged:function(){return"RangeError"},
gec:function(){var z,y,x
z=this.e
if(z==null){z=this.f
y=z!=null?": Not less than or equal to "+H.b(z):""}else{x=this.f
if(x==null)y=": Not greater than or equal to "+H.b(z)
else if(x>z)y=": Not in range "+H.b(z)+".."+H.b(x)+", inclusive"
else y=x<z?": Valid value range is empty":": Only valid value is "+H.b(z)}return y},
v:{
nx:function(a){return new P.e7(null,null,!1,null,null,a)},
cm:function(a,b,c){return new P.e7(null,null,!0,a,b,"Value not in range")},
a8:function(a,b,c,d,e){return new P.e7(b,c,!0,a,d,"Invalid value")},
ny:function(a,b,c,d,e){if(a<b||a>c)throw H.c(P.a8(a,b,c,d,e))},
cn:function(a,b,c,d,e,f){if(0>a||a>c)throw H.c(P.a8(a,0,c,"start",f))
if(a>b||b>c)throw H.c(P.a8(b,a,c,"end",f))
return b}}},
lU:{"^":"b7;e,l:f>,a,b,c,d",
ged:function(){return"RangeError"},
gec:function(){if(J.c1(this.b,0))return": index must not be negative"
var z=this.f
if(z===0)return": no indices are valid"
return": index should be less than "+H.b(z)},
v:{
cU:function(a,b,c,d,e){var z=e!=null?e:J.aO(b)
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
return"Concurrent modification during iteration: "+H.b(P.f9(z))+"."}},
mX:{"^":"d;",
k:function(a){return"Out of Memory"},
gbr:function(){return},
$isa5:1},
h9:{"^":"d;",
k:function(a){return"Stack Overflow"},
gbr:function(){return},
$isa5:1},
kl:{"^":"a5;a",
k:function(a){var z=this.a
return z==null?"Reading static variable during its initialization":"Reading static variable '"+H.b(z)+"' during its initialization"}},
qC:{"^":"d;a",
k:function(a){var z=this.a
if(z==null)return"Exception"
return"Exception: "+H.b(z)}},
fc:{"^":"d;a,b,c",
k:function(a){var z,y,x
z=this.a
y=""!==z?"FormatException: "+z:"FormatException"
x=this.b
if(typeof x!=="string")return y
if(x.length>78)x=C.b.aM(x,0,75)+"..."
return y+"\n"+x}},
ld:{"^":"d;h:a<,fD,$ti",
k:function(a){return"Expando:"+H.b(this.a)},
j:function(a,b){var z,y
z=this.fD
if(typeof z!=="string"){if(b==null||typeof b==="boolean"||typeof b==="number"||typeof b==="string")H.i(P.cI(b,"Expandos are not allowed on strings, numbers, booleans or null",null))
return z.get(b)}y=H.e2(b,"expando$values")
return y==null?null:H.e2(y,z)},
n:function(a,b,c){var z,y
z=this.fD
if(typeof z!=="string")z.set(b,c)
else{y=H.e2(b,"expando$values")
if(y==null){y=new P.d()
H.fM(b,"expando$values",y)}H.fM(y,z,c)}}},
bH:{"^":"d;"},
t:{"^":"M;",$isV:1,
$asV:function(){return[P.M]}},
"+int":0,
B:{"^":"d;$ti",
aJ:function(a,b){return H.bI(this,b,H.y(this,"B",0),null)},
c9:["di",function(a,b){return new H.K(this,b,[H.y(this,"B",0)])}],
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
bG:function(a,b){return P.P(this,b,H.y(this,"B",0))},
cv:function(a){return this.bG(a,!0)},
bH:function(a){return P.b9(this,H.y(this,"B",0))},
gl:function(a){var z,y
z=this.ga_(this)
for(y=0;z.u();)++y
return y},
gY:function(a){return!this.ga_(this).u()},
gav:function(a){return!this.gY(this)},
e1:function(a,b){return H.oq(this,b,H.y(this,"B",0))},
gw:function(a){var z,y
z=this.ga_(this)
if(!z.u())throw H.c(H.ak())
do y=z.gU()
while(z.u())
return y},
gcd:function(a){var z,y
z=this.ga_(this)
if(!z.u())throw H.c(H.ak())
y=z.gU()
if(z.u())throw H.c(H.dF())
return y},
au:function(a,b){var z,y,x
if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(P.m("index"))
if(b<0)H.i(P.a8(b,0,null,"index",null))
for(z=this.ga_(this),y=0;z.u();){x=z.gU()
if(b===y)return x;++y}throw H.c(P.cU(b,this,"index",null,y))},
k:function(a){return P.m4(this,"(",")")}},
cW:{"^":"d;$ti"},
N:{"^":"d;$ti",$isB:1,$isa_:1},
"+List":0,
I:{"^":"d;$ti"},
au:{"^":"d;",
gB:function(a){return P.d.prototype.gB.call(this,this)},
k:function(a){return"null"}},
"+Null":0,
M:{"^":"d;",$isV:1,
$asV:function(){return[P.M]}},
"+num":0,
d:{"^":";",
A:function(a,b){return this===b},
gB:function(a){return H.aF(this)},
k:function(a){return H.d0(this)},
gbz:function(a){return new H.aw(H.iq(this),null)},
toString:function(){return this.k(this)}},
bo:{"^":"d;"},
bP:{"^":"a_;$ti"},
b2:{"^":"d;"},
q:{"^":"d;",$isV:1,
$asV:function(){return[P.q]},
$ise_:1},
"+String":0,
bS:{"^":"d;C<",
gl:function(a){return this.C.length},
gY:function(a){return this.C.length===0},
gav:function(a){return this.C.length!==0},
k:function(a){var z=this.C
return z.charCodeAt(0)==0?z:z},
v:{
hd:function(a,b,c){var z=J.aj(b)
if(!z.u())return a
if(c.length===0){do a+=H.b(z.gU())
while(z.u())}else{a+=H.b(z.gU())
for(;z.u();)a=a+c+H.b(z.gU())}return a},
pe:function(a){return new P.bS(a)}}}}],["","",,P,{"^":"",fY:{"^":"d;"}}],["","",,P,{"^":"",
e6:function(a){return C.M},
qS:{"^":"d;",
ar:function(a){if(a<=0||a>4294967296)throw H.c(P.nx("max must be in range 0 < max \u2264 2^32, was "+a))
return Math.random()*a>>>0},
kD:function(){return Math.random()}}}],["","",,S,{"^":"",ka:{"^":"d;a,b,$ti",
j:function(a,b){return this.b.j(0,b)},
ad:function(a){return this.b.ad(a)},
Z:function(a,b){return this.b.Z(0,b)},
gY:function(a){var z=this.b
return z.gY(z)},
gav:function(a){var z=this.b
return z.gav(z)},
gl:function(a){var z=this.b
return z.gl(z)},
n:function(a,b,c){this.iT()
this.b.n(0,b,c)},
k:function(a){return J.h(this.b)},
iT:function(){if(!this.a)return
this.a=!1
this.b=P.ck(this.b,H.l(this,0),H.l(this,1))},
$isI:1}}],["","",,A,{"^":"",kb:{"^":"d;a,b,$ti",
gl:function(a){return this.b.a},
cp:function(a){return this.b.cp(a)},
a7:function(a,b){return this.b.a7(0,b)},
Z:function(a,b){return this.b.Z(0,b)},
gY:function(a){return this.b.a===0},
gav:function(a){return this.b.a!==0},
ga_:function(a){var z,y
z=this.b
y=new P.ag(z,z.r,null,null,[null])
y.c=z.e
return y},
gw:function(a){var z=this.b
return z.gw(z)},
aJ:function(a,b){var z=this.b
z.toString
return new H.bG(z,b,[H.l(z,0),null])},
bH:function(a){var z,y
z=this.b
y=z.el()
y.ax(0,z)
return y},
t:function(a,b){this.iA()
return this.b.t(0,b)},
k:function(a){return J.h(this.b)},
iA:function(){if(!this.a)return
this.a=!1
this.b=P.b9(this.b,H.l(this,0))},
$isbP:1,
$isa_:1}}],["","",,S,{"^":"",dy:{"^":"d;fF:a<,b,$ti",
a2:function(a){var z=new S.O(null,null,this.$ti)
z.ak()
z.m(this)
a.$1(z)
return z.q()},
gB:function(a){var z=this.b
if(z==null){z=X.bC(this.a)
this.b=z}return z},
A:function(a,b){var z,y,x,w,v
if(b==null)return!1
if(b===this)return!0
z=J.o(b)
if(!z.$isdy)return!1
y=b.a
x=this.a
if(y.length!==x.length)return!1
z=z.gB(b)
w=this.gB(this)
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
return new J.bk(z,z.length,0,null,[H.l(z,0)])},
aJ:function(a,b){var z=this.a
z.toString
return new H.ar(z,b,[H.l(z,0),null])},
a7:function(a,b){var z=this.a
return(z&&C.a).a7(z,b)},
Z:function(a,b){var z=this.a
return(z&&C.a).Z(z,b)},
bH:function(a){var z=this.a
z.toString
return P.b9(z,H.l(z,0))},
gY:function(a){return this.a.length===0},
gav:function(a){return this.a.length!==0},
gw:function(a){var z=this.a
return(z&&C.a).gw(z)},
ak:function(){if(new H.aw(H.Z(H.l(this,0)),null).A(0,C.q))throw H.c(new P.S('explicit element type required, for example "new BuiltList<int>"'))}},O:{"^":"d;fF:a<,b,$ti",
q:function(){var z,y
z=this.b
if(z==null){z=this.a
y=new S.dy(z,null,this.$ti)
y.ak()
this.a=z
this.b=y
z=y}return z},
m:function(a){if(H.aW(a,"$isdy",this.$ti,null)){this.a=a.gfF()
this.b=a}else{this.a=P.P(a,!0,H.l(this,0))
this.b=null}},
j:function(a,b){var z=this.a
if(b>>>0!==b||b>=z.length)return H.f(z,b)
return z[b]},
n:function(a,b,c){var z
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
z=new H.ar(z,b,[H.l(z,0),null]).bG(0,!0)
this.a=z
this.b=null
this.iv(z)},
geu:function(){if(this.b!=null){this.a=P.P(this.a,!0,H.l(this,0))
this.b=null}return this.a},
ak:function(){if(new H.aw(H.Z(H.l(this,0)),null).A(0,C.q))throw H.c(new P.S('explicit element type required, for example "new ListBuilder<int>"'))},
iv:function(a){var z,y,x,w
for(z=a.length,y=H.l(this,0),x=0;x<a.length;a.length===z||(0,H.at)(a),++x){w=a[x]
if(!H.di(w,y))throw H.c(P.G("invalid element: "+H.b(w)))}}}}],["","",,A,{"^":"",cM:{"^":"d;iS:a<,b,c,d,$ti",
a2:function(a){var z=new A.cY(null,null,this.$ti)
z.ci()
z.m(this)
a.$1(z)
return z.q()},
E:function(){return new S.ka(!0,this.a,this.$ti)},
gB:function(a){var z=this.b
if(z==null){z=this.a.gcn()
z=H.bI(z,new A.jW(this),H.y(z,"B",0),null)
z=P.P(z,!1,H.y(z,"B",0))
C.a.fb(z)
z=X.bC(z)
this.b=z}return z},
A:function(a,b){var z,y,x,w,v
if(b==null)return!1
if(b===this)return!0
z=J.o(b)
if(!z.$iscM)return!1
y=b.a
x=this.a
if(y.gl(y)!==x.gl(x))return!1
z=z.gB(b)
w=this.gB(this)
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
ci:function(){if(new H.aw(H.Z(H.l(this,0)),null).A(0,C.q))throw H.c(new P.S('explicit key type required, for example "new BuiltMap<int, int>"'))
if(new H.aw(H.Z(H.l(this,1)),null).A(0,C.q))throw H.c(new P.S('explicit value type required, for example "new BuiltMap<int, int>"'))}},jW:{"^":"a:0;a",
$1:function(a){var z,y
z=J.j(a)
y=J.j(this.a.a.j(0,a))
return X.dg(X.b3(X.b3(0,J.j(z)),J.j(y)))}},cY:{"^":"d;a,b,$ti",
q:function(){var z=this.b
if(z==null){z=new A.cM(this.a,null,null,null,this.$ti)
z.ci()
this.b=z}return z},
m:function(a){var z
if(H.aW(a,"$iscM",this.$ti,null)){this.b=a
this.a=a.giS()}else if(!!a.$iscM){z=P.ck(a.a,H.l(this,0),H.l(this,1))
this.b=null
this.a=z}else if(!!a.$isI){z=P.ck(a,H.l(this,0),H.l(this,1))
this.b=null
this.a=z}else throw H.c(P.G("expected Map or BuiltMap, got "+H.b(a.gbz(a))))},
j:function(a,b){return this.a.j(0,b)},
n:function(a,b,c){if(c==null)H.i(P.G("null value"))
this.gj4().n(0,b,c)},
gj4:function(){if(this.b!=null){this.a=P.ck(this.a,H.l(this,0),H.l(this,1))
this.b=null}return this.a},
ci:function(){if(new H.aw(H.Z(H.l(this,0)),null).A(0,C.q))throw H.c(new P.S('explicit key type required, for example "new MapBuilder<int, int>"'))
if(new H.aw(H.Z(H.l(this,1)),null).A(0,C.q))throw H.c(new P.S('explicit value type required, for example "new MapBuilder<int, int>"'))}}}],["","",,L,{"^":"",dz:{"^":"d;j6:a<,b,$ti",
a2:function(a){var z=new L.aG(null,null,this.$ti)
z.b2()
z.m(this)
a.$1(z)
return z.q()},
gB:function(a){var z=this.b
if(z==null){z=this.a
z.toString
z=P.P(new H.bG(z,new L.jX(),[H.l(z,0),null]),!1,null)
C.a.fb(z)
z=X.bC(z)
this.b=z}return z},
A:function(a,b){var z,y,x
if(b==null)return!1
if(b===this)return!0
z=J.o(b)
if(!z.$isdz)return!1
y=this.a
if(b.a.a!==y.a)return!1
z=z.gB(b)
x=this.gB(this)
if(z==null?x!=null:z!==x)return!1
return y.jB(b)},
k:function(a){return J.h(this.a)},
gl:function(a){return this.a.a},
cp:function(a){return this.a.cp(a)},
ga_:function(a){var z,y
z=this.a
y=new P.ag(z,z.r,null,null,[null])
y.c=z.e
return y},
aJ:function(a,b){var z=this.a
z.toString
return new H.bG(z,b,[H.l(z,0),null])},
a7:function(a,b){return this.a.a7(0,b)},
Z:function(a,b){return this.a.Z(0,b)},
bH:function(a){return new A.kb(!0,this.a,this.$ti)},
gY:function(a){return this.a.a===0},
gav:function(a){return this.a.a!==0},
gw:function(a){var z=this.a
return z.gw(z)},
aU:function(a,b,c){return this.a.aU(0,b,c)},
cl:function(a,b){return this.aU(a,b,null)},
b2:function(){if(new H.aw(H.Z(H.l(this,0)),null).A(0,C.q))throw H.c(new P.S('explicit element type required, for example "new BuiltSet<int>"'))}},jX:{"^":"a:0;",
$1:function(a){return J.j(a)}},aG:{"^":"d;a,b,$ti",
q:function(){var z=this.b
if(z==null){z=new L.dz(this.a,null,this.$ti)
z.b2()
this.b=z}return z},
m:function(a){var z,y,x,w
if(H.aW(a,"$isdz",this.$ti,null)){this.a=a.gj6()
this.b=a}else{z=H.l(this,0)
y=P.a6(null,null,null,z)
for(x=J.aj(a);x.u();){w=x.gU()
if(H.di(w,z))y.t(0,w)
else throw H.c(P.G("iterable contained invalid element: "+H.b(w)))}this.b=null
this.a=y}},
t:function(a,b){if(b==null)H.i(P.G("null element"))
this.gev().t(0,b)},
a3:function(a,b){this.gev().a3(0,b)},
aJ:function(a,b){var z=this.a
z.toString
z=P.b9(new H.bG(z,b,[H.l(z,0),null]),null)
this.b=null
this.a=z
this.j7(z)},
gev:function(){if(this.b!=null){this.a=P.b9(this.a,H.l(this,0))
this.b=null}return this.a},
b2:function(){if(new H.aw(H.Z(H.l(this,0)),null).A(0,C.q))throw H.c(new P.S('explicit element type required, for example "new SetBuilder<int>"'))},
j7:function(a){var z,y,x
for(z=new P.ag(a,a.r,null,null,[null]),z.c=a.e,y=H.l(this,0);z.u();){x=z.d
if(!H.di(x,y))throw H.c(P.G("invalid element: "+H.b(x)))}}}}],["","",,Y,{"^":"",
k:function(a,b){if(typeof b!=="number")return H.x(b)
a=536870911&a+b
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
U:function(a){a=536870911&a+((67108863&a)<<3)
a^=a>>>11
return 536870911&a+((16383&a)<<15)}}],["","",,N,{"^":"",nW:{"^":"nU;ch,cx,ag:cy@,b8:db@,dx,b,c,d,e,f,r,x,y,z,Q,a",
hp:function(){var z=$.$get$cE()
z.n(0,"game",this.cx)
z.n(0,"hitpoints",this.cy)
z.n(0,"stamina",this.db)
z.n(0,"gold",this.dx)},
kf:function(){var z,y,x,w
this.cx=null
this.cy=Z.bQ("Health",new N.nZ(),"#CCCCCC","Your physical state",100,0,!0,P.aX)
z=P.t
this.db=Z.bQ("Stamina",new N.o_(),"#CCCCCC","Spare physical energy",0,0,!0,z)
z=Z.bQ("Gold",new N.o0(),"#CCCCCC","Gold coins",0,0,!0,z)
this.dx=z
y=$.$get$c_()
x=this.cy
w=this.db
y=new O.f8(N.bn("EdgeheadGame"),null,!1,null,null,null,null,null,null,null,null,new Y.a3(H.p([],[Y.ai]),0,P.b0()),x,w,z,O.vi(),O.vh(),O.vg(),y,this.gi0(),new P.bS(""),!1,null)
y.hY()
this.cx=y
y.x="endGame"
$.$get$cz().t(0,0)},
ie:function(){var z,y
z=new O.d4(["# Insignificant Little Vermin",[null,P.a0(["goto","gameLoop"])]],0,null,!1,!1)
y=this.b.a
y.n(0,"start",z)
z.a="start"
z=new O.d4([new N.nY(this),[null,P.a0(["goto","gameLoop"])]],0,null,!1,!1)
y.n(0,"gameLoop",z)
z.a="gameLoop"
z=new O.d4(['<p class="meta">\n  Hit <strong>Restart</strong> (top left) to play again. It will be different.\n</p>'],0,null,!1,!1)
y.n(0,"endGame",z)
z.a="endGame"
this.c=y.j(0,"start")},
v:{
nX:function(){var z,y,x,w
z=Z.bQ("Health",new N.tu(),"#CCCCCC","Your physical state",100,0,!0,P.aX)
y=P.t
x=Z.bQ("Stamina",new N.tv(),"#CCCCCC","Spare physical energy",0,0,!0,y)
y=Z.bQ("Gold",new N.tw(),"#CCCCCC","Gold coins",0,0,!0,y)
w=P.q
z=new N.nW("net.filiph.edgehead.0.0.1",null,z,x,y,new O.o1(new H.R(0,null,null,null,null,null,0,[w,O.d4])),null,null,null,P.a6(null,null,null,w),!1,null,-9999,null,null,null)
z.ie()
return z}}},tu:{"^":"a:19;",
$1:function(a){var z=J.o(a)
if(z.A(a,0))return"\ud83d\udc80"
if(z.da(a,0.5))return"\ud83d\ude23"
if(z.b0(a,1))return"\ud83d\ude27"
return"\ud83d\ude10"}},tv:{"^":"a:9;",
$1:function(a){return H.b(a)+" \ud83d\udd06"}},tw:{"^":"a:9;",
$1:function(a){return H.b(a)+" \ud83d\udcb0"}},nY:{"^":"a:20;a",
$0:function(){var z=0,y=P.aC(),x=this
var $async$$0=P.ay(function(a,b){if(a===1)return P.aI(b,y)
while(true)switch(z){case 0:z=2
return P.ax(x.a.cx.by(),$async$$0)
case 2:return P.aJ(null,y)}})
return P.aK($async$$0,y)}},nZ:{"^":"a:19;",
$1:function(a){var z=J.o(a)
if(z.A(a,0))return"\ud83d\udc80"
if(z.da(a,0.5))return"\ud83d\ude23"
if(z.b0(a,1))return"\ud83d\ude27"
return"\ud83d\ude10"}},o_:{"^":"a:9;",
$1:function(a){return H.b(a)+" \ud83d\udd06"}},o0:{"^":"a:9;",
$1:function(a){return H.b(a)+" \ud83d\udcb0"}}}],["","",,M,{"^":"",cR:{"^":"d;"},l5:{"^":"d;"},pZ:{"^":"cR;a,b,c",
a2:function(a){var z=new M.ef(null,!1,0,0)
z.m(this)
a.$1(z)
return z.q()},
A:function(a,b){if(b==null)return!1
if(b===this)return!0
if(!(b instanceof M.cR))return!1
return this.a===b.a&&this.b===b.b&&!0},
gB:function(a){return Y.U(Y.k(Y.k(Y.k(0,this.a&0x1FFFFFFF),this.b&0x1FFFFFFF),C.O.gB(!1)))},
k:function(a){return"EdgeheadGlobalState {bloodrockFollowers="+C.e.k(this.a)+",\nbrianaQuoteIndex="+C.e.k(this.b)+",\nhasKegOfBeer="+String(!1)+",\n}"}},ef:{"^":"l5;d,a,b,c",
gcz:function(){var z=this.d
if(z!=null){this.b=z.a
this.c=this.d.b
this.d.c
this.a=!1
this.d=null}return this},
m:function(a){this.d=a},
q:function(){var z,y,x
z=this.d
if(z==null){this.gcz()
y=this.b
this.gcz()
x=this.c
this.gcz()
this.a
z=new M.pZ(y,x,!1)}this.m(z)
return z}}}],["","",,O,{"^":"",
xF:[function(a){var z,y
z=a.gcc()
y=a.gc0()
if(typeof y!=="number")return H.x(y)
return z-2*y},"$1","dl",2,0,28],
xR:[function(a){var z,y,x
z=a.gcc()
y=a.gd3()
x=a.gc0()
if(typeof x!=="number")return H.x(x)
return z+y-x},"$1","ie",2,0,28],
f8:{"^":"mv;y,z,Q,ch,cx,cy,db,dx,dy,bI:fr<,fx,fd:fy<,ag:go<,b8:id<,k1,a,b,c,d,e,f,r,x",
hY:function(){var z,y,x,w,v,u
z=P.aE(C.o,null)
y=$.$get$bA()
this.cy=R.b6(1000,"orc",O.dl(),null,null,new G.aH("sword",1,1,!1,!0,!1,z),null,0,2,0,!1,2,!1,C.t,0,y)
this.db=R.b6(1001,"goblin",O.dl(),null,null,new G.aH("scimitar",1,1,!1,!0,!1,P.aE(C.o,null)),null,0,1,0,!1,1,!1,C.t,0,y)
y=new S.O(null,null,[Q.v])
y.ak()
y.m([new Q.v("start_adventure","","",null)])
this.dx=new K.cp(y.q(),"preStartBook",new O.kX(),new O.kY(),null,null,"ground")
y=R.b6(1,"Filip",null,"preStartBook",null,null,null,0,2,1000,!0,2,!0,C.F,1,null)
this.ch=y
z=y.x
y=y.cy
if(typeof z!=="number")return z.d8()
if(typeof y!=="number")return H.x(y)
this.go.sae(z/y)
this.id.sae(this.ch.fx)
this.k1.sae(this.ch.r)
this.cx=R.b6(100,"Briana",null,this.dx.b,null,null,this.ch.y,0,2,0,!1,2,!0,C.a5,0,null)
this.dy=F.fT(this.dx,!1)
y=K.cp
x=P.P($.$get$i3(),!0,y)
C.a.ax(x,[this.dx,$.$get$eA()])
w=new M.ef(null,!1,0,0).q()
z=this.ch
v=this.cx
u=this.dy
v=P.b9([z,v],R.A)
z=P.bb(null,O.cG)
u=new A.a4(v,P.a6(null,null,null,U.ae),w,z,P.b9(x,y),P.P([u],!0,S.af),0,null)
this.fr=u
y=new Y.a3(H.p([],[Y.ai]),0,P.b0())
y.b=u.r
this.fx=new B.bK(u,null,y,1,1,!0,!1,!1,0)},
d5:function(){var z=0,y=P.aC(),x,w=this,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
var $async$d5=P.ay(function(a,b){if(a===1)return P.aI(b,y)
while(true)switch(z){case 0:v=w.fy
u=w.gjN()
if(v.hm(u)){z=1
break}t=w.fr.T(w.ch.y)
s=t.gag()
r=t.ghh()
if(typeof s!=="number"){x=s.d8()
z=1
break}if(typeof r!=="number"){x=H.x(r)
z=1
break}w.go.sae(s/r)
w.id.sae(t.gb8())
r=w.k1
s=t.gf6()
if(!J.e(r.f,s)){r.f=s
r.y=!0
$.cs=!0}s=w.y
s.hd("update() for world at time "+w.fr.r)
r=w.fr.f
if(r.length===0){w.r=!0
v.p(0,"\n\n",!0)
if(w.fr.k9(w.ch.y))v.p(0,"TO BE CONTINUED.",!0)
else v.p(0,"You died.",!0)
w.f.C+=v.ct()
z=1
break}q=C.a.gw(r)
p=q.dW(w.fr)
o=G.j6(p,w.fr)
z=3
return P.ax(o.kI(),$async$d5)
case 3:r=o.f
if(r.gY(r)){n=o.a
m=o.b
n.f3("There are no actions available for actorId="+H.b(m)+".")
m="Actions not available for "+H.b(m)+" and "
l=o.c
k=l.a
j=J.o(k)
k="PlanConsequence<"+j.gB(k)+", "+j.k(k)+", "+J.h(l.b)+", "+H.b(l.d)+", "+l.y+", "
n.bP(m+(k+(l.x?"isSuccess":"")+">")+".")}n=Z.n3(r)
i=new Z.n2(new P.hB(r,[null,null]),n)
if(r.gY(r))$.$get$bL().f3("Created with no recommendations.")
if(n.length===0){s.e_("No recommendation for "+H.b(p.gh()))
s.e_(new O.l_(w))
w.fr.h1(q.gi());++w.fr.r
z=1
break}z=p.gN()===!0?4:6
break
case 4:u=n.length
if(u>1)for(h=0;r=n.length,h<r;r===u||(0,H.at)(n),++h);s.bP("planner.generateTable for "+H.b(p.gh()))
o.f4().Z(0,new O.l0(w))
u=i.ho(q.gdH(),O.ie())
u.toString
g=P.P(u,!1,H.y(u,"B",0))
if(g.length!==0&&C.a.bt(g,new O.l1())){w.f.C+=v.ct()
C.a.sl(v.a,0)}v=new O.l2(new O.l4())
u=g.length-1
if(u-0<=32)H.h8(g,0,u,v)
else H.h7(g,0,u,v)
for(v=g.length,u=w.c,h=0;h<g.length;g.length===v||(0,H.at)(g),++h){f=g[h]
u.$3$helpMessage$script(f.gW(),f.gI(),new O.l3(w,p,f))}z=1
break
z=5
break
case 6:s=p.gh_()
z=7
return P.ax(w.cA(i.kH(s==null?O.ie():s),p,v),$async$d5)
case 7:case 5:v.hm(u)
case 1:return P.aJ(x,y)}})
return P.aK($async$d5,y)},
cA:function(a,b,c){var z=0,y=P.aC(),x,w=this,v,u,t
var $async$cA=P.ay(function(d,e){if(d===1)return P.aI(e,y)
while(true)switch(z){case 0:v=a.dA(b,w.fx,w.fr)
u=P.P(v,!0,H.y(v,"B",0))
z=b.gN()===!0?3:5
break
case 3:z=6
return P.ax(w.dk(a,b,u),$async$cA)
case 6:z=4
break
case 5:t=S.nv(new H.ar(u,new O.kU(),[H.l(u,0),null]),1)
if(t>=u.length){x=H.f(u,t)
z=1
break}w.fx=u[t]
case 4:C.a.ax(c.a,w.fx.gfd().a)
w.fr=w.fx.gbI()
v=w.y
v.bP(new O.kV(a,b))
v.am(new O.kW(w,b))
case 1:return P.aJ(x,y)}})
return P.aK($async$cA,y)},
dk:function(a,b,c){var z=0,y=P.aC(),x=this,w,v,u,t,s,r,q,p,o,n,m,l
var $async$dk=P.ay(function(d,e){if(d===1)return P.aI(e,y)
while(true)switch(z){case 0:w=a.H(b,x.fr)
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
case 7:u=C.a.gw(J.h(a.gK()).split("."))
v=v.l2(w)
t=a.ab(b,x.fr)
s=a.gO()&&b.kb(a.gK())
r="use "+H.b(u)
x.fJ()
z=8
return P.ax(x.e.$4$rerollEffectDescription$rerollable(v,t,r,s),$async$dk)
case 8:q=e
s=new H.K(c,new O.kR(q),[H.l(c,0)])
x.fx=s.gcd(s)
if(q.gla()===!0){p=A.ee(x.fx.gbI())
p.X(b.gi(),new O.kS())
v=x.fx
t=v.gfO()
s=H.p([],[Y.ai])
r=new Y.a3(s,0,P.b0())
C.a.ax(s,v.c.a)
s=v.d
o=v.e
n=v.f
m=v.r
l=v.x
v=v.y
r.b=p.r
x.fx=new B.bK(p,t,r,s,o,n,m,l,v)}case 6:case 3:return P.aJ(null,y)}})
return P.aK($async$dk,y)}},
kX:{"^":"a:3;",
$3:function(a,b,c){return c.p(0,"UNUSED because this is the first choice",!0)}},
kY:{"^":"a:3;",
$3:function(a,b,c){return H.i(new P.w("Room isn't to be revisited"))}},
l_:{"^":"a:2;a",
$0:function(){var z=this.a.fr.d
return"- how we got here: "+new H.ar(z,new O.kZ(),[H.l(z,0),null]).cm(0," <- ")}},
kZ:{"^":"a:0;",
$1:function(a){return a.gaT()}},
l0:{"^":"a:0;a",
$1:function(a){return this.a.y.bP(a)}},
l4:{"^":"a:49;",
$1:function(a){if(a instanceof Q.z)return H.b(a.b.gh())+" "+a.gW()
return"ZZZZZZ "+a.gW()}},
l1:{"^":"a:0;",
$1:function(a){return a.gW()!==""}},
l2:{"^":"a:6;a",
$2:function(a,b){var z=this.a
return J.bE(z.$1(a),z.$1(b))}},
l3:{"^":"a:20;a,b,c",
$0:function(){var z=0,y=P.aC(),x=this,w
var $async$$0=P.ay(function(a,b){if(a===1)return P.aI(b,y)
while(true)switch(z){case 0:w=x.a
z=2
return P.ax(w.cA(x.c,x.b,w.fy),$async$$0)
case 2:return P.aJ(null,y)}})
return P.aK($async$$0,y)}},
kU:{"^":"a:0;",
$1:function(a){return a.gkJ()}},
kV:{"^":"a:2;a,b",
$0:function(){return H.b(this.b.gh())+" selected "+this.a.gh()}},
kW:{"^":"a:2;a,b",
$0:function(){var z,y
z=this.a.fr.d
y=new H.ar(z,new O.kT(),[H.l(z,0),null]).cm(0," <- ")
return"- how "+H.b(this.b.gh())+" got here: "+y}},
kT:{"^":"a:0;",
$1:function(a){return a.gaT()}},
kR:{"^":"a:0;a",
$1:function(a){return a.geO()===this.a.geO()}},
kS:{"^":"a:0;",
$1:function(a){var z=a.gb8()
if(typeof z!=="number")return z.at()
a.sb8(z-1)
return a}}}],["","",,Q,{"^":"",
ik:function(a,b,c){return P.aV(function(){var z=a,y=b,x=c
var w=0,v=1,u,t,s,r,q,p
return function $async$ik(d,e){if(d===1){u=e
w=v}while(true)switch(w){case 0:t=y.f
t=t.length!==0?C.a.gw(t):null
s=J.j3(t.b6(y.a,y),new Q.ut(z))
t=J.aj(s.a),r=new H.bT(t,s.b,[H.l(s,0)])
case 2:if(!r.u()){w=3
break}q=t.gU()
p=x.$1(q)
if(p.gJ()&&!z.eM(q,y)){w=2
break}w=4
return p
case 4:w=2
break
case 3:return P.aT()
case 1:return P.aU(u)}}})},
il:function(a,b,c){return P.aV(function(){var z=a,y=b,x=c
var w=0,v=1,u,t
return function $async$il(d,e){if(d===1){u=e
w=v}while(true)switch(w){case 0:t=y.f
t=y.dY((t.length!==0?C.a.gw(t):null).gbF()).gjR().a,t=new J.bk(t,t.length,0,null,[H.l(t,0)])
case 2:if(!t.u()){w=3
break}w=4
return x.$1(t.d)
case 4:w=2
break
case 3:return P.aT()
case 1:return P.aU(u)}}})},
im:function(a,b,c){return P.aV(function(){var z=a,y=b,x=c
var w=0,v=1,u,t
return function $async$im(d,e){if(d===1){u=e
w=v}while(true)switch(w){case 0:t=y.f
t=(t.length!==0?C.a.gw(t):null).gbn(),t=t.ga_(t)
case 2:if(!t.u()){w=3
break}w=4
return x.$1(t.d)
case 4:w=2
break
case 3:return P.aT()
case 1:return P.aU(u)}}})},
ut:{"^":"a:0;a",
$1:function(a){return!J.e(a,this.a)&&a.gap()}},
ah:{"^":"d;",
dA:function(a,b,c){var z=this
return P.aV(function(){var y=a,x=b,w=c
var v=0,u=1,t,s,r,q,p
return function $async$dA(d,e){if(d===1){t=e
v=u}while(true)switch(v){case 0:s=z.H(y,x.gbI())
r=J.an(s)
v=r.bk(s,0)?2:3
break
case 2:q=A.ee(w)
v=4
return B.fH(q,x,z,z.ir(q,y,w,z.gM(),!0),s,!1,!1,!0)
case 4:case 3:v=r.b0(s,1)?5:6
break
case 5:q=A.ee(w)
p=z.iq(q,y,w,z.gL(),!0)
if(typeof s!=="number")H.x(s)
v=7
return B.fH(q,x,z,p,1-s,!0,!1,!1)
case 7:case 6:return P.aT()
case 1:return P.aU(t)}}})},
fi:function(a,b,c,d,e,f){var z,y,x,w,v,u,t
a.x=this
z=a.a.bC(0,new Q.j4(b))
y=new O.eV(null,null,null,null,null,null,null,null,null,null,null,null,null)
x=this.gh()
y.ga5().c=x
x=b.gi()
y.ga5().r=x
y.ga5().f=C.T
y.ga5().cx=f
y.ga5().Q=e
x=this.gJ()
y.ga5().z=x
x=this.ga1()
y.ga5().ch=x
if(!!this.$isz){x=y.ga5()
w=x.x
if(w==null){w=new L.aG(null,null,[P.t])
w.b2()
w.m(C.d)
x.x=w
x=w}else x=w
w=this.b.gi()
if(w==null)H.i(P.G("null element"))
x.gev().t(0,w)}if(!!this.$isca){x=this.b.gh0()
y.ga5().d=x}v=new Y.a3(H.p([],[Y.ai]),0,P.b0())
x=a.f
u=(x.length!==0?C.a.gw(x):null).gi()
a.gB(a);(x.length!==0?C.a.gw(x):null).kE(a,v)
this.a=d.$3(z,a,v)
if(a.dn(u)!=null)a.h1(u);++a.r
w=a.f5(u)
if(!(w==null))w.hk(a,v)
a.x=null
while(!0){w=x.length!==0?C.a.gw(x):null
if((w==null?w:w.dW(a))!=null){w=x.length!==0?C.a.gw(x):null
w=!J.e(w==null?w:w.df(a),!0)}else w=!0
if(!w)break
if((x.length!==0?C.a.gw(x):null)==null)break
t=C.a.gw(x)
t.dI(a)
C.a.a3(x,t)}x=x.length!==0?C.a.gw(x):null
if(!(x==null))x.hl(a,v)
if(this.a==null)H.i(new P.w("No description given when executing "+this.k(0)+". You should return it from your world-modifying function."))
x=this.a
y.ga5().e=x
x=a.r
y.ga5().y=x
a.d.fS(y.q())
return v},
ir:function(a,b,c,d,e){return this.fi(a,b,c,d,!1,e)},
iq:function(a,b,c,d,e){return this.fi(a,b,c,d,e,!1)}},
j4:{"^":"a:0;a",
$1:function(a){return J.e(a.gi(),this.a.gi())}},
z:{"^":"ah;c0:b<",
gW:function(){var z=new Y.a3(H.p([],[Y.ai]),0,P.b0())
z.fQ(0,this.ga6(),this.b)
return z.ct()},
ab:function(a,b){var z=new Y.a3(H.p([],[Y.ai]),0,P.b0())
z.jm(0,this.gaf(),this.b,a,!0)
return z.ct()},
k:function(a){var z=this.b
return"EnemyTargetAction<"+this.ga6()+"::enemy="+H.b(z.gi())+"/"+H.b(z.gh())+">"}},
ca:{"^":"ah;",
gW:function(){return this.b.gW()},
k:function(a){return"ExitAction<"+this.b.gW()+">"}},
ce:{"^":"ah;",
gW:function(){var z=new Y.a3(H.p([],[Y.ai]),0,P.b0())
z.fQ(0,this.ga6(),this.b)
return z.ct()},
k:function(a){return"ItemAction<"+this.gW()+">"}},
nF:{"^":"d;a,b",
k:function(a){return this.b},
v:{"^":"xq<"}}}],["","",,O,{"^":"",cG:{"^":"d;",
k:function(a){return"ActionRecord<"+H.b(this.b)+", "+H.b(this.d)+">"}},mj:{"^":"d;a,b",
k:function(a){return this.b}},pV:{"^":"cG;a,dv:b<,eH:c<,aT:d<,e,cs:f<,ff:r<,V:x<,hF:y<,z,hG:Q<,hH:ch<",
a2:function(a){var z=new O.eV(null,null,null,null,null,null,null,null,null,null,null,null,null)
z.m(this)
a.$1(z)
return z.q()},
A:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof O.cG))return!1
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
gB:function(a){return Y.U(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)),J.j(this.f)),J.j(this.r)),J.j(this.x)),J.j(this.y)),J.j(this.z)),J.j(this.Q)),J.j(this.ch)))},
k:function(a){return"ActionRecord {accomplices="+J.h(this.a)+",\nactionName="+J.h(this.b)+",\ndataString="+J.h(this.c)+",\ndescription="+H.b(J.h(this.d))+",\nknownTo="+J.h(this.e)+",\nprotagonist="+H.b(J.h(this.f))+",\nsufferers="+J.h(this.r)+",\ntime="+J.h(this.x)+",\nwasAggressive="+J.h(this.y)+",\nwasFailure="+J.h(this.z)+",\nwasProactive="+J.h(this.Q)+",\nwasSuccess="+J.h(this.ch)+",\n}"}},eV:{"^":"d;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",
gdv:function(){return this.ga5().c},
geH:function(){return this.ga5().d},
gaT:function(){return this.ga5().e},
gcs:function(){return this.ga5().r},
gff:function(){var z,y
z=this.ga5()
y=z.x
if(y==null){y=new L.aG(null,null,[P.t])
y.b2()
y.m(C.d)
z.x=y
z=y}else z=y
return z},
gV:function(){return this.ga5().y},
ghF:function(){return this.ga5().z},
ghG:function(){return this.ga5().ch},
ghH:function(){return this.ga5().cx},
ga5:function(){var z,y
z=this.a
if(z!=null){z=z.a
if(!(z==null)){y=new L.aG(null,null,[H.l(z,0)])
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
if(!(z==null)){y=new L.aG(null,null,[H.l(z,0)])
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
if(x==null){x=new L.aG(null,null,[P.t])
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
if(r==null){r=new L.aG(null,null,[P.t])
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
z=new O.pV(y,x,w,v,u,t,s,r,q,p,o,n)
if(y==null)H.i(P.m("accomplices"))
if(x==null)H.i(P.m("actionName"))
if(v==null)H.i(P.m("description"))
if(u==null)H.i(P.m("knownTo"))
if(t==null)H.i(P.m("protagonist"))
if(s==null)H.i(P.m("sufferers"))
if(r==null)H.i(P.m("time"))
if(q==null)H.i(P.m("wasAggressive"))
if(p==null)H.i(P.m("wasFailure"))
if(o==null)H.i(P.m("wasProactive"))
if(n==null)H.i(P.m("wasSuccess"))}this.m(z)
return z}}}],["","",,R,{"^":"",
io:function(a,b){return P.aV(function(){var z=a,y=b
var x=0,w=1,v,u
return function $async$io(c,d){if(c===1){v=d
x=w}while(true)switch(x){case 0:x=2
return z
case 2:u=y.a
x=3
return P.bV(new H.K(u,new R.uL(z),[H.l(u,0)]))
case 3:return P.aT()
case 1:return P.aU(v)}}})},
b6:function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){var z=new R.eW(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
new R.tp(a,b,k,m,n,f,e,i,l,o,j,h,d,g,p,c).$1(z)
return z.q()},
uL:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gh5()
y=this.a.gi()
return z==null?y==null:z===y}},
A:{"^":"mF;",
gfU:function(){return!0},
gaH:function(){var z=this.x
if(typeof z!=="number")return z.bk()
return z>0},
gaz:function(){return this.e instanceof K.cd},
gaq:function(){return this.dy===C.h},
ga0:function(){return this.dy===C.f},
ga4:function(){return this.dy===C.k},
ka:function(a,b){var z,y,x
for(z=this.cx.a,y=new P.ag(z,z.r,null,null,[null]),y.c=z.e,x=0;y.u();){if(C.a.a7(y.d.gf2(),a))++x
if(x>=b)return!0}return!1},
ha:function(a){return this.ka(a,1)},
jV:function(){var z,y,x,w,v,u,t
for(z=this.cx.a,y=new P.ag(z,z.r,null,null,[null]),y.c=z.e,x=null,w=-9999999;y.u();){v=y.d
if(!(v instanceof L.aS))continue
z=v.gbJ()
u=v.gbA()
t=v.gaK()?1:0
if(2+z+u+t>w){z=v.gbJ()
u=v.gbA()
t=v.gaK()?1:0
w=2+z+u+t
x=v}}return x},
kb:function(a){var z=this.fx
if(typeof z!=="number")return z.bT()
return z>=1},
eM:function(a,b){return this.hc(a,b)>0},
hc:function(a,b){var z,y
if(this.dF(b)){z=a.gaY()
y=this.fy.a
z=z.gi()
z=y==null?z==null:y===z}else z=!1
if(z)return 1000
if(this.iO(a,b,10))return 1
z=a.gaY()
y=this.fy.a
z=z.gi()
return(y==null?z!=null:y!==z)?1:0},
dF:function(a){var z,y
z=a.c7("Confuse",this,!0)
if(z==null)return!1
y=a.l_("Unconfuse",this,!0)
if(y==null)return!0
return y<z},
de:function(a){var z,y,x,w,v,u,t,s,r,q,p
z=a.T(this.y)
y=z.gag()
if(typeof y!=="number")return H.x(y)
x=2*y
if(!z.gaH())x-=10
y=z.e
if(!(y instanceof K.cd))x+=4
y=J.b5(y.gae(),2)
if(typeof y!=="number")return H.x(y)
x+=y
for(y=z.cx.a,w=[null],v=new P.ag(y,y.r,null,null,w),v.c=y.e;v.u();){y=J.b5(v.d.gae(),10)
if(typeof y!=="number")return H.x(y)
x+=y}y=a.a
for(v=y.ga_(y),u=new H.bT(v,new R.jA(this),[H.l(y,0)]),t=0;u.u();){s=v.gU()
r=s.gap()?2:0
q=s.gag()
if(typeof q!=="number")return H.x(q)
p=J.b5(s.e.gae(),2)
if(typeof p!=="number")return H.x(p)
t=t+r+2*q+p
for(r=s.cx.a,q=new P.ag(r,r.r,null,null,w),q.c=r.e;q.u();){r=J.b5(q.d.gae(),10)
if(typeof r!=="number")return H.x(r)
t+=r}}return new A.cH(x,t,y.bw(0,0,new R.jB(this,a)))},
iO:function(a,b,c){var z=b.l0(a,this,!0)
if(z==null)return!1
return z<=c},
$isaD:1},
mF:{"^":"d+dB;"},
tp:{"^":"a:0;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx",
$1:function(a){var z,y
a.gD().z=this.a
a.gD().dx=this.b
a.gD().dy=this.d
a.gD().fx=this.e
z=this.f
if(z==null)z=$.$get$dk()
a.gD().f=z
a.gD().e=this.r
a.gD().b=[]
a.gD().fr=C.k
a.gD().y=this.x
a.gD().db=this.y
a.gD().x=this.ch
a.gD().fy=this.z
a.gD().Q=this.Q
a.gD().ch=!0
a.gD().cx=this.c
z=new L.aG(null,null,[U.ae])
z.b2()
z.m(C.d)
a.gD().cy=z
z=this.db
if(z!=null){y=new L.bs(null,null)
y.m(z)
z=y}else{z=$.$get$dn()
z.toString
y=new L.bs(null,null)
y.m(z)
z=y}a.gD().go=z
a.gD().d=this.cx
a.gD().r=this.cy
a.gD().c=this.dx
return a}},
jA:{"^":"a:0;a",
$1:function(a){var z,y
z=this.a
if(J.e(a.gaY(),z.fy)){y=a.gi()
z=z.y
z=y==null?z!=null:y!==z}else z=!1
return z}},
jB:{"^":"a:30;a,b",
$2:function(a,b){var z,y
z=b.gap()?1:0
y=b.gag()
if(typeof y!=="number")return H.x(y)
return J.ap(a,(z+y)*this.a.hc(b,this.b))}},
e0:{"^":"d;a,b",
k:function(a){return this.b}},
pW:{"^":"A;a,h_:b<,bF:c<,al:d<,S:e<,h5:f<,f6:r<,ag:x<,i:y<,z,c2:Q<,N:ch<,aC:cx<,hh:cy<,h:db<,aK:dx<,ah:dy<,a9:fr<,b8:fx<,aY:fy<",
a2:function(a){var z=new R.eW(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
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
if(z==null?y==null:z===y)if(J.e(this.cx,b.cx)){z=this.cy
y=b.cy
if(z==null?y==null:z===y){z=this.db
y=b.db
if(z==null?y==null:z===y){z=this.dx
y=b.dx
if(z==null?y==null:z===y){z=this.dy
y=b.dy
if(z==null?y==null:z===y){z=this.fr
y=b.fr
if(z==null?y==null:z===y){z=this.fx
y=b.fx
z=(z==null?y==null:z===y)&&J.e(this.fy,b.fy)}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1
else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1
else z=!1
else z=!1
else z=!1
else z=!1
return z},
gB:function(a){return Y.U(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)),J.j(this.f)),J.j(this.r)),J.j(this.x)),J.j(this.y)),J.j(this.z)),J.j(this.Q)),J.j(this.ch)),J.j(this.cx)),J.j(this.cy)),J.j(this.db)),J.j(this.dx)),J.j(this.dy)),J.j(this.fr)),J.j(this.fx)),J.j(this.fy)))},
k:function(a){return"Actor {categories="+J.h(this.a)+",\ncombineFunction="+J.h(this.b)+",\ncurrentRoomName="+H.b(J.h(this.c))+",\ncurrentShield="+H.b(J.h(this.d))+",\ncurrentWeapon="+H.b(J.h(this.e))+",\nfollowingActorId="+J.h(this.f)+",\ngold="+J.h(this.r)+",\nhitpoints="+J.h(this.x)+",\nid="+J.h(this.y)+",\ninitiative="+J.h(this.z)+",\nisActive="+J.h(this.Q)+",\nisPlayer="+J.h(this.ch)+",\nitems="+J.h(this.cx)+",\nmaxHitpoints="+J.h(this.cy)+",\nname="+J.h(this.db)+",\nnameIsProperNoun="+J.h(this.dx)+",\npose="+J.h(this.dy)+",\npronoun="+J.h(this.fr)+",\nstamina="+J.h(this.fx)+",\nteam="+J.h(this.fy)+",\n}"}},
eW:{"^":"d;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go",
gh_:function(){return this.gD().c},
gbF:function(){return this.gD().d},
sbF:function(a){this.gD().d=a
return a},
gal:function(){return this.gD().e},
sal:function(a){this.gD().e=a
return a},
gS:function(){return this.gD().f},
sS:function(a){this.gD().f=a
return a},
gh5:function(){return this.gD().r},
gf6:function(){return this.gD().x},
gag:function(){return this.gD().y},
sag:function(a){this.gD().y=a
return a},
gi:function(){return this.gD().z},
gc2:function(){return this.gD().ch},
gN:function(){return this.gD().cx},
gaC:function(){var z,y
z=this.gD()
y=z.cy
if(y==null){y=new L.aG(null,null,[U.ae])
y.b2()
y.m(C.d)
z.cy=y
z=y}else z=y
return z},
ghh:function(){return this.gD().db},
gh:function(){return this.gD().dx},
sh:function(a){this.gD().dx=a
return a},
gaK:function(){return this.gD().dy},
gah:function(){return this.gD().fr},
sah:function(a){this.gD().fr=a
return a},
ga9:function(){return this.gD().fx},
gb8:function(){return this.gD().fy},
sb8:function(a){this.gD().fy=a
return a},
gaY:function(){var z,y
z=this.gD()
y=z.go
if(y==null){y=new L.bs(null,null)
z.go=y
z=y}else z=y
return z},
gD:function(){var z,y
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
z=z.cx
if(!(z==null)){y=new L.aG(null,null,[H.l(z,0)])
y.b2()
y.m(z)
z=y}this.cy=z
z=this.a
this.db=z.cy
this.dx=z.db
this.dy=z.dx
this.fr=z.dy
this.fx=z.fr
this.fy=z.fx
z=z.fy
if(!(z==null)){y=new L.bs(null,null)
y.m(z)
z=y}this.go=z
this.a=null}return this},
m:function(a){this.a=a},
q:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
z=this.a
if(z==null){y=this.gD().b
x=this.gD().c
w=this.gD().d
v=this.gD().e
u=this.gD().f
t=this.gD().r
s=this.gD().x
r=this.gD().y
q=this.gD().z
p=this.gD().Q
o=this.gD().ch
n=this.gD().cx
m=this.gD()
l=m.cy
if(l==null){l=new L.aG(null,null,[U.ae])
l.b2()
l.m(C.d)
m.cy=l
m=l}else m=l
m=m.q()
l=this.gD().db
k=this.gD().dx
j=this.gD().dy
i=this.gD().fr
h=this.gD().fx
g=this.gD().fy
f=this.gD()
e=f.go
if(e==null){e=new L.bs(null,null)
f.go=e
f=e}else f=e
z=new R.pW(y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f.q())
if(y==null)H.i(P.m("categories"))
if(u==null)H.i(P.m("currentWeapon"))
if(s==null)H.i(P.m("gold"))
if(r==null)H.i(P.m("hitpoints"))
if(q==null)H.i(P.m("id"))
if(p==null)H.i(P.m("initiative"))
if(o==null)H.i(P.m("isActive"))
if(n==null)H.i(P.m("isPlayer"))
if(m==null)H.i(P.m("items"))
if(l==null)H.i(P.m("maxHitpoints"))
if(k==null)H.i(P.m("name"))
if(j==null)H.i(P.m("nameIsProperNoun"))
if(i==null)H.i(P.m("pose"))
if(h==null)H.i(P.m("pronoun"))
if(g==null)H.i(P.m("stamina"))}this.m(z)
return z}}}],["","",,A,{"^":"",cH:{"^":"d;cc:a<,d3:b<,c0:c<",
at:function(a,b){return new A.aq(this.a-b.gcc(),this.b-b.gd3(),J.bD(this.c,b.gc0()))},
k:function(a){return"ActorScore<self="+C.j.bj(this.a,2)+",team="+C.j.bj(this.b,2)+",enemy="+J.c4(this.c,2)+">"}},aq:{"^":"d;cc:a<,d3:b<,c0:c<",
gkr:function(){return this.a===-1/0&&this.b===-1/0&&J.e(this.c,-1/0)},
cb:function(a,b){if(typeof b!=="number")return H.x(b)
return new A.aq(this.a*b,this.b*b,J.c2(this.c,b))},
aj:function(a,b){return new A.aq(this.a+b.gcc(),this.b+b.gd3(),J.ap(this.c,b.gc0()))},
d8:function(a,b){if(typeof b!=="number")return H.x(b)
return new A.aq(this.a/b,this.b/b,J.b5(this.c,b))},
k:function(a){return"ActorScoreChange<self="+C.j.bj(this.a,2)+",team="+C.j.bj(this.b,2)+",enemy="+J.c4(this.c,2)+">"},
v:{
jz:function(a){var z,y,x,w,v,u,t,s,r
for(z=a.length,y=0,x=0,w=0,v=0,u=0;t=a.length,u<t;t===z||(0,H.at)(a),++u){s=a[u];++y
x+=s.a
w+=s.b
r=s.c
if(typeof r!=="number")return H.x(r)
v+=r}if(y===0)throw H.c(P.G("Cannot average empty iterable"))
return new A.aq(x/y,w/y,v/y)}}}}],["","",,U,{"^":"",
wR:function(a){switch(a){case C.y:return"fist"
case C.z:return"shield"
case C.r:return"spear"
case C.A:return"sword"}throw H.c(P.G(a))},
ae:{"^":"mG;f2:a<",
gaT:function(){return U.wR(C.a.geK(this.a))},
gi:function(){return H.aF(this)},
gc2:function(){return!0},
gaH:function(){return!1},
gN:function(){return!1},
gaK:function(){return!1},
ga9:function(){return C.n},
gaY:function(){return $.$get$aM()},
$isaD:1},
mG:{"^":"d+dB;"},
cV:{"^":"d;a,b",
k:function(a){return this.b}}}],["","",,K,{"^":"",cd:{"^":"aS;h:b<,a"}}],["","",,E,{"^":"",br:{"^":"ae;h:b<,a",
gae:function(){return 1},
$isaD:1}}],["","",,Z,{"^":"",al:{"^":"aS;h:b<,bJ:c<,bA:d<,aK:e<,cj:f<,eE:r<,a",v:{
oB:function(a,b,c,d,e){return new Z.al(c,0,e,!1,!1,!1,P.aE(C.D,null))}}}}],["","",,G,{"^":"",aH:{"^":"aS;h:b<,bJ:c<,bA:d<,aK:e<,cj:f<,eE:r<,a",v:{
pg:function(a,b,c,d,e,f){return new G.aH(c,e,f,d,!0,!1,P.aE(C.o,null))}}}}],["","",,L,{"^":"",aS:{"^":"ae;",
geE:function(){return!1},
gcj:function(){return!1},
gko:function(){return!1},
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
$isaD:1}}],["","",,G,{"^":"",mv:{"^":"d;",
fJ:function(){var z,y
z=this.f
y=z.C
if(y.length!==0){this.b.$1(y.charCodeAt(0)==0?y:y)
z.C=""}},
lm:[function(a){this.f.C+=a},"$1","gjN",2,0,21],
by:function(){var z=0,y=P.aC(),x,w=this,v,u
var $async$by=P.ay(function(a,b){if(a===1)return P.aI(b,y)
while(true)switch(z){case 0:if(w.x==null)throw H.c(new P.w("Cannot run a LoopedEvent before onFinishedGoto is defined."))
if(w.r){w.d.sl(0,0)
w.a.$1(w.x)
z=1
break}v=w.d
u=w.f
case 3:if(!!0){z=4
break}if(!(!w.r&&v.gl(v)===0&&u.C.length===0)){z=4
break}z=5
return P.ax(w.d5(),$async$by)
case 5:z=3
break
case 4:w.fJ()
case 1:return P.aJ(x,y)}})
return P.aK($async$by,y)}}}],["","",,B,{"^":"",f6:{"^":"d;dd:a<,dD:b<,cZ:c<",
k:function(a){return"ConsequenceStats<order="+this.c+", cumProb="+J.c4(this.b,3)+", score="+this.a.k(0)+">"}},bK:{"^":"d;bI:a<,fO:b<,fd:c<,kJ:d<,dD:e<,f,r,eO:x<,cZ:y<",
gB:function(a){return X.bC(H.p([this.a,this.e,this.b,this.d,this.y,this.f,this.r,this.x],[P.d]))},
A:function(a,b){var z
if(b==null)return!1
z=J.o(b)
return!!z.$isbK&&this.gB(this)===z.gB(b)},
k:function(a){var z,y
z=this.a
y=J.o(z)
z="PlanConsequence<"+y.gB(z)+", "+y.k(z)+", "+J.h(this.b)+", "+H.b(this.d)+", "+this.y+", "
return z+(this.x?"isSuccess":"")+">"},
v:{
fH:function(a,b,c,d,e,f,g,h){var z,y
z=b==null
y=z?e:J.c2(e,b.gdD())
z=z?0:b.gcZ()+1
d.b=a.r
return new B.bK(a,c,d,e,y,g,f,h,z)}}}}],["","",,G,{"^":"",j5:{"^":"d;a,b,c,d,e,f",
jz:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=this.a
z.am("...")
z.am("combining scores")
y=H.p([],[A.aq])
x=new G.js()
for(w=J.aj(a),v=b.a,u=b.b,t=b.c,s=null;w.u();){r=w.gU()
z.am(new G.jq(r))
if(J.ac(r.gdD(),0.15))if(s==null){z.am("    - first _bestCase")
s=r}else if(J.ac(x.$1(r.gdd()),x.$1(s.gdd()))){z.am("    - new _bestCase")
s=r}q=r.gdd()
p=J.bD(q.c,t)
o=r.b
if(typeof o!=="number")return H.x(o)
n=new A.aq((q.a-v)*o,(q.b-u)*o,J.c2(p,o))
z.am(new G.jr(n))
y.push(n)}m=A.jz(y)
w=s==null
if(w)l=C.H
else{q=s.gdd()
l=new A.aq(q.a-v,q.b-u,J.bD(q.c,t))}w=w?s:s.gcZ()
if(w==null)w=1
if(typeof w!=="number")return H.x(w)
v=l.a/w
u=l.b/w
w=J.b5(l.c,w)
t=m.a
q=m.b
p=m.c
z.am("- uplifts average = "+("ActorScoreChange<self="+C.j.bj(t,2)+",team="+C.j.bj(q,2)+",enemy="+J.c4(p,2)+">"))
z.am("- best = "+("ActorScoreChange<self="+C.u.bj(v,2)+",team="+C.u.bj(u,2)+",enemy="+J.c4(w,2)+">"))
t=v+t
q=u+q
p=w+p
z.am("- result = "+("ActorScoreChange<self="+C.u.bj(t,2)+",team="+C.u.bj(q,2)+",enemy="+C.j.bj(p,2)+">"))
return new A.aq(t,q,p)},
f4:function(){var z=this
return P.aV(function(){var y=0,x=1,w,v,u,t,s
return function $async$f4(a,b){if(a===1){w=b
y=x}while(true)switch(y){case 0:v=z.f,u=v.gcn(),u=u.ga_(u),t=1
case 2:if(!u.u()){y=3
break}s=u.gU()
y=4
return""+t+") "+s.gW()+"\t"+H.b(v.j(0,s))
case 4:++t
y=2
break
case 3:return P.aT()
case 1:return P.aU(w)}}})},
dJ:function(a,b,c){var z=0,y=P.aC(),x=this,w,v,u,t,s,r,q,p,o,n,m
var $async$dJ=P.ay(function(d,e){if(d===1)return P.aI(e,y)
while(true)switch(z){case 0:w=x.f
w.bh(0)
v=x.c
u=v.a
t=u.a.bC(0,new G.jt(x))
s=t.de(u)
r=x.a
r.bP("Planning for "+H.b(t.db)+", initialScore="+s.k(0))
q=new P.bd(x.ef(t,u).a(),null,null,null)
case 2:if(!q.u()){z=3
break}p=q.c
o=p==null?q.b:p.gU()
r.bo(new G.ju(t,o))
if(o.G(t,u)!==!0){r.bo(new G.jv(o))
z=2
break}z=4
return P.ax(x.cE(v,o,b,a,c).cv(0),$async$dJ)
case 4:n=e
if(J.eS(n)===!0){r.bo(new G.jw(o))
w.n(0,o,C.I)
z=2
break}r.bo(new G.jx(s,o,n))
m=x.jz(n,s,b)
w.n(0,o,m)
r.bo(new G.jy(o,m))
z=2
break
case 3:x.e=!0
return P.aJ(null,y)}})
return P.aK($async$dJ,y)},
kI:function(){return this.dJ(50,10,null)},
ef:function(a,b){return P.aV(function(){var z=a,y=b
var x=0,w=1,v,u,t,s,r,q,p,o
return function $async$ef(c,d){if(c===1){v=d
x=w}while(true)switch(x){case 0:u=y.f
x=2
return P.bV((u.length!==0?C.a.gw(u):null).gbO())
case 2:u=(u.length!==0?C.a.gw(u):null).gaG()
t=u.length
s={func:1,ret:Q.ce,args:[U.ae]}
r={func:1,ret:Q.ca,args:[Q.v]}
q={func:1,ret:Q.z,args:[R.A]}
p=0
case 3:if(!(p<u.length)){x=5
break}o=u[p]
x=H.az(o,q)?6:8
break
case 6:x=9
return P.bV(Q.ik(z,y,o))
case 9:x=7
break
case 8:x=H.az(o,r)?10:12
break
case 10:x=13
return P.bV(Q.il(z,y,o))
case 13:x=11
break
case 12:x=H.az(o,s)?14:16
break
case 14:x=17
return P.bV(Q.im(z,y,o))
case 17:x=15
break
case 16:throw H.c(new P.w(o.k(0)+" is not one of the supported ones"))
case 15:case 11:case 7:case 4:u.length===t||(0,H.at)(u),++p
x=3
break
case 5:return P.aT()
case 1:return P.aU(v)}}})},
cE:function(a5,a6,a7,a8,a9){var $async$cE=P.ay(function(b0,b1){switch(b0){case 2:u=x
z=u.pop()
break
case 1:v=b1
z=w}while(true)switch(z){case 0:s={}
r=a5.a
q=r.a.bC(0,new G.j9(t))
p=t.a
p.bo("=====")
p.bo(new G.ja(a6,q))
p.bo(new G.jb(a6))
if(a6.G(q,r)!==!0){p.bo("- firstAction not applicable")
z=1
break}o=q.de(r)
p.bo(new G.jh(a5,o))
p.bo(new G.ji(a5))
n=P.bb(null,B.bK)
m=P.a6(null,null,null,A.a4)
l=J.o(r)
k=l.gB(r)
for(j=new P.bd(a6.dA(q,a5,r).a(),null,null,null);j.u();){i=j.c
h=i==null?j.b:i.gU()
if(l.gB(r)!==k)throw H.c(new P.w("Action "+a6.k(0)+" modified world state when producing "+H.b(h)+"."))
n.aE(h)}s.a=0
r=t.b
case 3:if(!!n.gY(n)){z=4
break}++s.a
g=n.dL()
p.am("----")
p.am(new G.jj(g))
p.am(new G.jk(g))
if(g.gcZ()>a7||s.a>a8){p.am(new G.jl(s,a7,g))
p.am(new G.jm(g))
z=4
break}z=g.gbI().f.length===0?5:6
break
case 5:p.am("- leaf node: world.situations is empty (end of book)")
l=g.a
q=l.a.aU(0,new G.jn(t),new G.jo())
if(q==null){p.am("- this actor ("+H.b(r)+") has been removed")
z=3
break}f=new B.f6(q.de(l),g.e,g.y)
p.am(new G.jc(f))
z=7
x=[1]
return P.de(P.hL(f),$async$cE,y)
case 7:z=3
break
case 6:l=g.a
j=l.f
e=(j.length!==0?C.a.gw(j):null).dW(l)
j=l.a
i=new H.K(j,new G.jd(t),[H.l(j,0)])
d=i.gl(i)
if(d>1)throw H.c(new P.w("World has several duplicates of mainActor: "+J.h(l)))
else if(d===0){p.hd("mainActor "+H.b(r)+" dies and is removed in world - will use defaultScoreWhenDead")
q=null}else q=j.bC(0,new G.je(t))
c=J.e(e,q)
p.am("- actor: "+H.b(e.gh())+" (isMain=="+c+")")
j=q==null
p.am("- mainActor: "+H.b(j?q:q.gh()))
b=j?q:q.de(l)
if(b==null)b=C.J
f=new B.f6(b,g.e,g.y)
p.am(new G.jf(o,f))
p.am(new G.jg(g))
z=8
x=[1]
return P.de(P.hL(f),$async$cE,y)
case 8:p.am("- generating all actions for "+H.b(e.gh()))
j=n.c
i=n.b
a=n.a
for(a0=new P.bd(t.ef(e,l).a(),null,null,null);a0.u();){a1=a0.c
a2=a1==null?a0.b:a1.gU()
if(a2.G(e,l)!==!0)continue
for(a1=new P.bd(a2.dA(e,g,l).a(),null,null,null);a1.u();){a3=a1.c
a4=a3==null?a1.b:a3.gU();++t.d
if(J.c1(a4.gdD(),0.05))continue
if(m.a7(0,a4.gbI()))continue
n.aE(a4)}}p.am("- added "+(((n.c-n.b&n.a.length-1)>>>0)-((j-i&a.length-1)>>>0))+" new PlanConsequences")
m.t(0,l)
z=3
break
case 4:case 1:return P.de(null,0,y)
case 2:return P.de(v,1,y)}})
var z=0,y=P.qn($async$cE),x,w=2,v,u=[],t=this,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4
return P.rJ(y)},
i7:function(a,b){var z
if(a==null){z=b.d
throw H.c(P.G("Called ActorPlanner with actor == null. That may mean that a Situation returns getCurrentActor as null. Some action that you added should make sure it removes the Situation (maybe "+H.b(z.gw(z).gaT())+"?). World: "+J.h(b)+". Situation: "+H.b(b.gjD())+". Action Records: "+z.aJ(0,new G.jp()).cm(0,"<-")))}},
v:{
j6:function(a,b){var z,y,x
z=N.bn("ActorPlanner")
y=a==null?a:a.gi()
x=new Y.a3(H.p([],[Y.ai]),0,P.b0())
x.b=b.r
z=new G.j5(z,y,new B.bK(b,null,x,1,1,!0,!1,!1,0),0,!1,new H.R(0,null,null,null,null,null,0,[null,null]))
z.i7(a,b)
return z}}},jp:{"^":"a:0;",
$1:function(a){return a.gaT()}},js:{"^":"a:32;",
$1:function(a){var z=a.c
if(typeof z!=="number")return H.x(z)
return a.b-z}},jq:{"^":"a:2;a",
$0:function(){return"  - consequence: "+H.b(this.a)}},jr:{"^":"a:2;a",
$0:function(){return"    - uplift = "+this.a.k(0)}},jt:{"^":"a:0;a",
$1:function(a){return J.e(a.gi(),this.a.b)}},ju:{"^":"a:2;a,b",
$0:function(){return"Evaluating action '"+this.b.gW()+"' for "+H.b(this.a.db)}},jv:{"^":"a:2;a",
$0:function(){return"- action '"+this.a.gW()+"' isn't applicable"}},jw:{"^":"a:2;a",
$0:function(){return"- action '"+this.a.gW()+"' is possible but we couldn't get to any outcomes while planning. Scoring with negative infinity."}},jx:{"^":"a:2;a,b,c",
$0:function(){return"- action '"+this.b.gW()+"' leads to "+H.b(J.aO(this.c))+" different ConsequenceStats, initialScore="+this.a.k(0)}},jy:{"^":"a:2;a,b",
$0:function(){return"- action '"+this.a.gW()+"' was scored "+this.b.k(0)}},j9:{"^":"a:0;a",
$1:function(a){return J.e(a.gi(),this.a.b)}},ja:{"^":"a:2;a,b",
$0:function(){return"_getConsequenceStats for firstAction '"+this.a.gW()+"' of "+H.b(this.b.gh())}},jb:{"^":"a:2;a",
$0:function(){return"- firstAction == "+H.b(this.a)}},jh:{"^":"a:2;a,b",
$0:function(){var z=this.a
return"- current: initialScore="+this.b.k(0)+", cumProb="+H.b(z.e)+" (prob="+H.b(z.d)+", ord="+z.y+")"}},ji:{"^":"a:2;a",
$0:function(){var z=this.a
return"- initial action: "+C.b.cb(" ",z.y)+"- "+J.h(z.b)}},jj:{"^":"a:2;a",
$0:function(){return"evaluating a PlanConsequence of '"+this.a.gfO().gW()+"'"}},jk:{"^":"a:2;a",
$0:function(){var z=this.a.gbI().f
return"- situation: "+H.b(J.iX(z.length!==0?C.a.gw(z):null))}},jl:{"^":"a:2;a,b,c",
$0:function(){return"- order ("+this.c.gcZ()+") higher than maximum ("+this.b+"), or consequences ("+this.a.a+") higher than maximum"}},jm:{"^":"a:2;a",
$0:function(){var z=this.a.gbI().d
return"- how we got here: "+new H.ar(z,new G.j8(),[H.l(z,0),null]).cm(0," <- ")}},j8:{"^":"a:0;",
$1:function(a){return a.gaT()}},jn:{"^":"a:0;a",
$1:function(a){return J.e(a.gi(),this.a.b)}},jo:{"^":"a:2;",
$0:function(){return}},jc:{"^":"a:2;a",
$0:function(){return"- "+this.a.k(0)}},jd:{"^":"a:0;a",
$1:function(a){return J.e(a.gi(),this.a.b)}},je:{"^":"a:0;a",
$1:function(a){return J.e(a.gi(),this.a.b)}},jf:{"^":"a:2;a,b",
$0:function(){return"- mainActor's score == "+this.b.k(0)+" (initial="+this.a.k(0)+")"}},jg:{"^":"a:2;a",
$0:function(){var z=this.a.gbI().d
return"- how we got here: "+new H.ar(z,new G.j7(),[H.l(z,0),null]).cm(0," <- ")}},j7:{"^":"a:0;",
$1:function(a){return a.gaT()}}}],["","",,Z,{"^":"",n2:{"^":"d;a,b",
gbO:function(){return this.b},
gY:function(a){return this.b.length===0},
ho:function(a,b){var z=this
return P.aV(function(){var y=a,x=b
var w=0,v=2,u,t,s,r,q,p,o,n,m,l
return function $async$ho(c,d){if(c===1){u=d
w=v}while(true)switch(w){case 0:t=z.b
w=t.length<=y?3:4
break
case 3:w=5
return P.bV(t)
case 5:w=1
break
case 4:s=z.iI(new Z.n5())
r=z.ee(new Z.n6(),[s])
q=z.ee(new Z.n7(),[s,r])
w=s!=null?6:8
break
case 6:$.$get$bL().bP("best self preserving: "+H.b(s))
w=9
return s
case 9:p=1
w=7
break
case 8:p=0
case 7:w=r!=null&&p<y?10:11
break
case 10:$.$get$bL().bP("best enemy damaging: "+H.b(r))
w=12
return r
case 12:++p
case 11:w=q!=null&&p<y?13:14
break
case 13:$.$get$bL().bP("best team preserving: "+H.b(q))
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
break}case 17:t.length===o||(0,H.at)(t),++n
w=16
break
case 18:case 1:return P.aT()
case 2:return P.aU(u)}}})},
kH:function(a){var z,y,x,w,v,u,t,s,r,q,p
z={}
y=this.b
if(y.length===1)return C.a.gcd(y)
C.a.ce(y,new Z.n9(this,a))
x=this.a.a
w=x.gcw().bw(0,1/0,new Z.na(a))
v=x.gcw().bw(0,-1/0,new Z.nb(a))
x=J.an(v)
u=J.an(w)
t=u.at(w,J.c2(x.at(v,w),0.1))
z.a=t
if(u.A(w,v)){t=J.bD(t,1)
z.a=t
u=t}else u=t
s=x.at(v,u)
r=P.mt(y.length,new Z.nc(z,this,a,s),!1,P.M)
q=new H.ar(r,new Z.nd(C.a.bw(r,0,Z.v8())),[H.l(r,0),null]).bG(0,!1)
z=C.a.bw(q,0,Z.v9())
if(typeof z!=="number")return H.x(z)
u=q.length
x=u-1
if(x<0)return H.f(q,x)
z=J.ap(q[x],1000-z)
if(x>=q.length)return H.f(q,x)
q[x]=z
p=S.nw(q,1000)
if(p>=y.length)return H.f(y,p)
return y[p]},
ee:function(a,b){var z,y,x,w,v,u,t
for(z=this.b,y=z.length,x=this.a.a,w=null,v=null,u=0;u<z.length;z.length===y||(0,H.at)(z),++u){t=z[u]
if(C.a.a7(b,t))continue
if(w==null||J.ac(a.$1(x.j(0,t)),v)){v=a.$1(x.j(0,t))
w=t
continue}}return w},
iI:function(a){return this.ee(a,C.d)},
v:{
n3:function(a){var z,y,x
z=a.gcn()
y=H.y(z,"B",0)
x=P.P(new H.K(z,new Z.n4(a),[y]),!1,y)
if(x.length===0)$.$get$bL().f3("After removing actions scored by undefined, there are no recommendations.")
return x},
xn:[function(a,b){return J.ap(a,b)},"$2","v8",4,0,44],
xo:[function(a,b){return J.ap(a,b)},"$2","v9",4,0,45]}},n5:{"^":"a:0;",
$1:function(a){return a.gcc()}},n6:{"^":"a:0;",
$1:function(a){return J.iT(a.gc0())}},n7:{"^":"a:0;",
$1:function(a){return a.gd3()}},n8:{"^":"a:6;a,b",
$2:function(a,b){var z,y
z=this.b
y=this.a.a.a
return-J.bE(z.$1(y.j(0,a)),z.$1(y.j(0,b)))}},n9:{"^":"a:6;a,b",
$2:function(a,b){var z,y
z=this.b
y=this.a.a.a
return-J.bE(z.$1(y.j(0,a)),z.$1(y.j(0,b)))}},na:{"^":"a:6;a",
$2:function(a,b){var z=this.a.$1(b)
return Math.min(H.dh(a),H.dh(z))}},nb:{"^":"a:6;a",
$2:function(a,b){var z=this.a.$1(b)
return Math.max(H.dh(a),H.dh(z))}},nc:{"^":"a:9;a,b,c,d",
$1:function(a){var z,y
z=this.b
y=z.b
if(a>=y.length)return H.f(y,a)
return J.b5(J.bD(this.c.$1(z.a.a.j(0,y[a])),this.a.a),this.d)}},nd:{"^":"a:0;a",
$1:function(a){return J.j_(J.c2(J.b5(a,this.a),1000))}},n4:{"^":"a:0;a",
$1:function(a){return!this.a.j(0,a).gkr()}}}],["","",,K,{"^":"",rT:{"^":"a:3;",
$3:function(a,b,c){}},cp:{"^":"d;a,h:b<,c,d,jT:e<,f,ca:r<",
gjR:function(){return this.a},
gB:function(a){return C.b.gB(this.b)},
A:function(a,b){if(b==null)return!1
return b instanceof K.cp&&b.b===this.b},
k:function(a){return"Room<"+this.b+">"},
jI:function(a,b,c){return this.c.$3(a,b,c)},
i_:function(a,b,c){return this.d.$3(a,b,c)},
jU:function(a,b,c){return this.e.$3(a,b,c)},
v:{
a1:function(a,b,c,d,e,f,g){var z=new S.O(null,null,[Q.v])
z.ak()
z.m(f)
return new K.cp(z.q(),a,b,c,d,e,g)}}}}],["","",,Q,{"^":"",v:{"^":"d;h0:a<,W:b<,aT:c<,kl:d<"}}],["","",,S,{"^":"",af:{"^":"d;",
gaG:function(){return C.d},
gbO:function(){return C.d},
gdH:function(){return 3},
dW:function(a){return this.b_(this.gV(),a)},
hk:function(a,b){},
hl:function(a,b){},
kE:function(a,b){},
dI:function(a){},
df:function(a){return!0}}}],["","",,S,{"^":"",
fQ:function(a){var z=$.$get$bN().ar(3)
if(z<0||z>=3)return H.f(a,z)
return a[z]},
nv:function(a,b){var z,y,x,w,v
z=$.$get$bN().kD()*b
for(y=new H.dP(a,a.gl(a),0,null,[H.y(a,"b1",0)]),x=0,w=0;y.u();){v=y.d
if(typeof v!=="number")return H.x(v)
x+=v
if(x>=z)return w;++w}throw H.c(P.G("The weights do not add up to total="+b))},
nw:function(a,b){var z,y,x,w,v,u,t
z=$.$get$bN().ar(b)
for(y=a.length,x=0,w=0,v=0;u=a.length,v<u;u===y||(0,H.at)(a),++v){t=a[v]
if(typeof t!=="number")return H.x(t)
x+=t
if(x>=z)return w;++w}throw H.c(P.G("The weights do not add up to total="+b))},
bO:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
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
if(p>1){o=$.$get$bN().ar(p)
z=z.aM(a,0,y)
x=w.length
if(o<0||o>=x)return H.f(w,o)
n=w[o]
m=o+1
if(m>=x)return H.f(w,m)
m=z+H.b(S.bO(C.b.aM(a,n+1,w[m])))
if(typeof v!=="number")return v.aj()
n=a.length
m+=C.b.aM(a,v+1,n)
z=m.charCodeAt(0)==0?m:m
if(t===n-1)return z
else return S.bO(z)}else{x=z.gl(a)
if(typeof x!=="number")return x.at()
if(t===x-1)return a
else{if(typeof t!=="number")return t.aj()
x=t+1
return z.aM(a,0,x)+H.b(S.bO(C.b.bK(a,x)))}}}else return a},
a7:function(a,b,c,d){var z=c!=null?3:2
switch($.$get$bN().ar(z)){case 0:a.$0()
break
case 1:b.$0()
break
case 2:c.$0()
break
case 4:d.$0()
break}}}],["","",,Y,{"^":"",ai:{"^":"d;b9:a<,b1:b<,aW:c<,hn:d<,e,dB:f@,hq:r<,hi:x<,fe:y<,jQ:z<,i2:Q<,d7:ch<,jg:cx<,kq:cy<,V:db<",
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
z=(J.bh(b).eI(b,".")||C.b.eI(b,"!")||C.b.eI(b,"?"))&&C.b.dh(b,P.bq("[A-Z]",!0,!1))?!0:p
y=this.b
this.a.push(new Y.ai(b,m,h,j,i,d,k,g,!1,e,l,z,c,f,y))},
t:function(a,b){return this.aS(a,b,null,!1,!1,!1,!1,null,null,null,!1,!1,null,!1,null,!1)},
p:function(a,b,c){return this.aS(a,b,null,!1,!1,!1,!1,null,null,null,!1,!1,null,!1,null,c)},
bX:function(a,b,c,d){return this.aS(a,b,null,!1,!1,!1,!1,null,null,c,!1,!1,d,!1,null,!1)},
ji:function(a,b,c,d,e,f,g,h,i,j,k,l,m,n){return this.aS(a,b,c,d,e,f,g,h,i,j,k,!1,l,m,null,n)},
fQ:function(a,b,c){return this.aS(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,null,!1,null,!1)},
ez:function(a,b,c,d,e){return this.aS(a,b,null,!1,!1,!1,c,null,null,null,!1,d,e,!1,null,!1)},
ey:function(a,b,c,d){return this.aS(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,d,!1,null,!1)},
bX:function(a,b,c,d){return this.aS(a,b,null,!1,!1,!1,!1,null,null,c,!1,!1,d,!1,null,!1)},
fR:function(a,b,c,d,e,f){return this.aS(a,b,c,!1,!1,!1,!1,d,null,null,e,!1,f,!1,null,!1)},
jn:function(a,b,c,d,e,f){return this.aS(a,b,c,!1,!1,d,!1,e,null,null,!1,!1,f,!1,null,!1)},
jk:function(a,b,c){return this.aS(a,b,c,!1,!1,!1,!1,null,null,null,!1,!1,null,!1,null,!1)},
jl:function(a,b,c,d){return this.aS(a,b,c,!1,!1,!1,!1,d,null,null,!1,!1,null,!1,null,!1)},
jo:function(a,b,c,d,e,f){return this.aS(a,b,null,!1,!1,!1,!1,c,null,d,!1,!1,e,!1,null,f)},
jm:function(a,b,c,d,e){return this.aS(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,d,!1,null,e)},
js:function(a,b,c,d,e,f,g,h){var z,y,x,w,v,u,t
if(b.length===0)return
z=H.b(new Y.oN().$1(a))+" "
for(y=b.length,x=e-1,w=0,v=0,u=0;u<b.length;b.length===y||(0,H.at)(b),++u){t=b[u]
if(w>0){if(w===1&&J.e(t,C.a.gw(b)))z=z+" "+d
else z=w===x?z+(", "+d):z+","
z+=" "}z+=H.b(this.bY(t.gh(),t.gh(),t,null,this.b));++w
if(w>x||J.e(t,C.a.gw(b))){z+="."
this.jo(0,z.charCodeAt(0)==0?z:z,f,g,h,!0);++v
z=H.n(a,"<also>","also")+" "
w=0}}},
jr:function(a,b,c,d){return this.js(a,b,c,"and",3,null,null,d)},
eB:function(){return this.p(0,"\n\n",!0)},
bY:function(a,b,c,d,e){var z,y,x,w
if(d!=null){z=J.L(a)
z=z.b3(a,"<owner's> "+H.b(b))!==-1||z.b3(a,"<ownerPronoun's> "+H.b(b))!==-1||z.b3(a,"<object-owner's> "+H.b(b))!==-1||z.b3(a,"<object-ownerPronoun's> "+H.b(b))!==-1}else z=!1
if(z)return a
z=J.L(a)
if(z.b3(a,"<subject's> "+H.b(b))!==-1||z.b3(a,"<subjectPronoun's> "+H.b(b))!==-1)return a
if(c.gaK()!==!0){y=this.c
x=y.j(0,c.gi())
if((x==null?-1:x)<e)w=z.d1(a,b,"the "+H.b(b))
else{w=J.eU(c.gh(),P.bq("[aeiouy]",!1,!1))?z.d1(a,b,"an "+H.b(b)):z.d1(a,b,"a "+H.b(b))
y.n(0,c.gi(),e)}}else w=null
return w==null?a:w},
eJ:function(a,b){var z,y
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
return P.aV(function(){var y=a
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
case 8:case 7:x=t.ghn()!=null?9:10
break
case 9:x=11
return t.d
case 11:case 10:u=t.e
x=u!=null?12:13
break
case 12:x=14
return u
case 14:case 13:case 1:return P.aT()
case 2:return P.aU(v)}}})},
cY:[function(a){var z=J.an(a)
if(z.b0(a,0)||z.bT(a,this.a.length))return
else{z=this.a
if(a>>>0!==a||a>=z.length)return H.f(z,a)
return z[a].gaW()}},"$1","gaW",2,0,22],
kF:function(a,b){var z
if(!this.aZ(a)||!this.aZ(b))return!1
if(this.eJ(a,b)){z=this.a
if(a>=z.length)return H.f(z,a)
z[a].gfe()}return!1},
hm:function(a){var z
for(z=!1;this.geL();z=!0){a.$1(this.hr(!0))
this.kN()}return z},
hr:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c
z=this.a
y=C.a.bw(z,[],new Y.oQ())
C.a.j2(z,new Y.oR(y),!1)
x=a&&this.geL()?C.a.b3(z,C.a.cl(z,new Y.oS()))+1:z.length
if(x<1)return""
for(w=-1,v=!0,u=!1,t=!1,s=0,r="";s<x;++s){q=s===0
if(!q){p=s-1
o=this.eJ(p,s)
if(s>=z.length)return H.f(z,s)
if(!z[s].gdB())n=this.kF(s,p)&&this.i1(s,p)
else n=!0
if(n){if(p<0||p>=z.length)return H.f(z,p)
t=!z[p].gdB()}else t=!1
if(s>=z.length)return H.f(z,s)
z[s].sdB(t)
n=s-w
if(n<3)if(!u){if(s>=z.length)return H.f(z,s)
if(!z[s].gi2()){if(p<0||p>=z.length)return H.f(z,p)
if(!z[p].gjQ()){if(s>=z.length)return H.f(z,s)
if(!z[s].gd7())if(this.dt(s,p)||o)if(!(t&&n>1)){if(t){if(p>=z.length)return H.f(z,p)
n=z[p].gdB()}else n=!1
n=n||this.l1(s)>4}else n=!0
else n=!0
else n=!0}else n=!0}else n=!0
v=n}else v=!0
else v=!0
if(v){if(p<0||p>=z.length)return H.f(z,p)
if(z[p].gd7()){r+=" "
p=r}else{r+=". "
p=r}if(t){if(s>=z.length)return H.f(z,s)
n=!z[s].gd7()}else n=!1
r=n?r+"But ":p
u=!1}else if(t){r+=S.fQ([" but "," but ",", but "])
u=!this.hO(s,s+1)&&!0}else{r+=S.fQ([" and "," and ",", and "])
u=!0}}m=this.e3(s)
l=S.bO(m)
p=J.L(l)
if(p.a7(l,"{")===!0||p.a7(l,"}")===!0)$.$get$iw().e_('Storyline result includes { and/or } even after being parsed by Randomly. Is there a dangling bracket here? Input = """'+H.b(m)+'""" Output = """'+H.b(l)+'"""')
n=!v
if(n){k=s-1
k=this.dt(s,k)&&J.eU(this.e3(k),"<subject> ")&&p.dh(l,"<subject> ")}else k=!1
if(k)l=p.d1(l,"<subject> ","")
j=J.du(l,"<action>",this.e3(s))
p=s-1
k=this.j5(s,p)
if(k)k=!(this.cY(s).ga9()===C.n&&this.bs(s).ga9()===C.n)
else k=!1
if(k){j=H.n(j,"<object-owner's> <object>","<objectPronounAccusative>")
j=H.n(j,"<object-ownerPronoun's> <object>","<objectPronounAccusative>")
j=H.n(j,"<object>","<objectPronounAccusative>")
j=H.n(j,"<object's>","<objectPronoun's>")}k=this.dt(s,p)
if(k){j=H.n(j,"<owner's> <subject>","<subjectPronoun>")
j=H.n(j,"<ownerPronoun's> <subject>","<subjectPronoun>")
j=H.n(j,"<subject>","<subjectPronoun>")
j=H.n(j,"<subject's>","<subjectPronoun's>")}if(this.cY(p)!=null)if(this.bs(s)!=null)if(this.bs(p)!=null){k=this.cY(p)
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
j=H.n(j,"<subject's>","<subjectPronoun's>")}if(this.bs(p)!=null)if(this.cY(s)!=null){k=this.bs(p)
k=k==null?k:k.gi()
i=this.cY(s)
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
f=p.ghn()
e=p.e
k=h!=null
if(k){if(h.gN()===!0){d=H.n(j,"<subject>","<subjectPronoun>")
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
d=H.n(d,"<has>","has")}d=H.iI(d,"<subject>","<subjectNoun>",0)
i=h.ga9().a
d=H.n(d,"<subject>",i)
i=p.db
d=J.cF(this.bY(d,"<subjectNoun>",h,f,i),"<subjectNoun>",h.gh())
c=h.ga9().a
d=H.n(d,"<subjectPronoun>",c)
if(C.b.a7(j,P.bq("<subject>.+<subject's>",!0,!1))){c=h.ga9().c
d=H.n(d,"<subject's>",c)}d=J.cF(this.bY(d,"<subject's>",h,f,i),"<subject's>",H.b(h.gh())+"'s")
i=h.ga9().c
d=H.n(d,"<subject's>",i)
i=h.ga9().b
d=H.n(d,"<subjectPronounAccusative>",i)
i=h.ga9().d
d=H.n(d,"<subjectPronounSelf>",i)}else d=j
if(g!=null){if(g.gaK()===!0){d=H.n(d,"<subject's> <object>","<object>")
d=H.n(d,"<subjectPronoun's> <object>","<object>")}if(g.gN()===!0){d=H.n(d,"<object>","<objectPronoun>")
d=H.n(d,"<object's>","<objectPronoun's>")}else d=J.du(this.bY(d,"<object>",g,e,p.db),"<object>",g.gh())
i=g.ga9().b
d=H.n(d,"<objectPronoun>",i)
if(C.b.a7(j,P.bq("<object>.+<object's>",!0,!1))){i=g.ga9().c
d=H.n(d,"<object's>",i)}d=J.cF(this.bY(d,"<object's>",g,e,p.db),"<object's>",H.b(g.gh())+"'s")
i=g.ga9().c
d=H.n(d,"<object's>",i)
i=g.ga9().c
d=H.n(d,"<objectPronoun's>",i)
i=g.ga9().b
d=H.n(d,"<objectPronounAccusative>",i)
i=g.ga9().a
d=H.n(d,"<objectPronounNominative>",i)}if(k){k=h.ga9().c
d=H.n(d,"<subjectPronoun's>",k)}p=p.db
j=this.fK(e,this.fK(f,d,j,"<owner>","<owner's>","<ownerPronoun>","<ownerPronoun's>",p),j,"<object-owner>","<object-owner's>","<object-ownerPronoun>","<object-ownerPronoun's>",p)
r+=(!n||q)&&!t?Y.oO(j):j
if(v)w=s
if(s>=z.length)return H.f(z,s)
if(z[s].gd7())u=!0}q=x-1
if(q>=z.length)return H.f(z,q)
z=!z[q].gd7()?r+".":r
return H.wI(z.charCodeAt(0)==0?z:z,$.$get$hb(),new Y.oT(),null)},
ct:function(){return this.hr(!1)},
kN:function(){var z,y
if(!this.geL()){C.a.sl(this.a,0)
return}z=this.a
y=C.a.b3(z,C.a.cl(z,new Y.oU()))+1
P.cn(0,y,z.length,null,null,null)
z.splice(0,y-0)},
hO:function(a,b){var z,y
if(!this.aZ(a)||!this.aZ(b))return!1
if(this.eJ(a,b)){z=this.a
if(a>=z.length)return H.f(z,a)
z[a].gfe()}if(!this.dt(a,b))return!1
z=this.a
if(a>=z.length)return H.f(z,a)
if(z[a].ghq()){if(b>=z.length)return H.f(z,b)
y=z[b].ghq()}else y=!1
if(y)return!0
if(a>=z.length)return H.f(z,a)
if(z[a].ghi()){if(b>=z.length)return H.f(z,b)
z=z[b].ghi()}else z=!1
if(z)return!0
else return!1},
i1:function(a,b){var z,y,x,w,v
if(!this.aZ(a)||!this.aZ(b))return!1
for(z=new P.bd(this.dV(a).a(),null,null,null);z.u();){y=z.c
x=y==null?z.b:y.gU()
for(y=new P.bd(this.dV(b).a(),null,null,null);y.u();){w=y.c
v=w==null?y.b:w.gU()
if(J.e(x.gi(),v.gi()))return!0}}return!1},
e3:[function(a){var z=J.an(a)
if(z.b0(a,0)||z.bT(a,this.a.length))return
else{z=this.a
if(a>>>0!==a||a>=z.length)return H.f(z,a)
return z[a].gb9()}},"$1","gb9",2,0,14],
bs:[function(a){var z=J.an(a)
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
fK:function(a,b,c,d,e,f,g,h){var z
if(a!=null){z=a.gN()===!0?H.n(H.n(b,d,"you"),e,"your"):J.du(this.bY(b,d,a,null,h),d,a.gh())
z=H.n(z,f,a.ga9().a)
z=H.n(H.n(J.cF(this.bY(C.b.a7(c,P.bq(d+".+"+e,!0,!1))?H.n(z,e,a.ga9().c):z,e,a,null,h),e,H.b(a.gh())+"'s"),e,a.ga9().c),g,a.ga9().c)}else z=H.n(H.n(H.n(H.n(b,d,""),e,""),f,""),g,"")
return z},
j5:function(a,b){var z,y
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
dt:function(a,b){var z,y
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
$1:function(a){return C.b.f1(H.n(H.n(a,"<also> ",""),"  "," "))}},oQ:{"^":"a:41;",
$2:function(a,b){var z,y,x
z=J.L(a)
y=z.gav(a)?z.gw(a):null
if(y!=null&&y.gkq()&&J.e(b.gjg(),y.cx)){x=z.gl(a)
if(typeof x!=="number")return x.at()
z.n(a,x-1,b)}else z.t(a,b)
return a}},oR:{"^":"a:43;a",
$1:function(a){return J.dt(this.a,a)}},oS:{"^":"a:0;",
$1:function(a){return J.e(a.gb9(),"\n\n")}},oT:{"^":"a:46;",
$1:function(a){return H.b(a.j(0,1))+H.b(a.j(0,2))+H.b(a.j(0,3))}},oU:{"^":"a:0;",
$1:function(a){return J.e(a.gb9(),"\n\n")}},aD:{"^":"mH;aK:a<,h:b<,c,aY:d<,N:e<,a9:f<",
gi:function(){return H.aF(this)},
gc2:function(){return!0},
gaH:function(){return!0},
v:{
c9:function(a,b,c,d,e){var z=H.p([],[P.q])
return new Y.aD(c,b,z,e==null?$.$get$aM():e,!1,d)}}},mH:{"^":"d+dB;"},dB:{"^":"d;",
gap:function(){return this.gaH()&&this.gc2()===!0},
aa:function(a,b,c,d,e,f,g,h,i,j,k,l,m){J.iU(a,b,c,d,e,f,g,h,i,j,k,H.F(this,"$isaD"),!1,m)},
bi:function(a,b,c){return this.aa(a,b,null,!1,!1,!1,!1,null,null,null,c,!1,!1)},
aL:function(a,b,c){return this.aa(a,b,null,!1,!1,!1,!1,null,null,null,!1,!1,c)},
a8:function(a,b){return this.aa(a,b,null,!1,!1,!1,!1,null,null,null,!1,!1,!1)},
ai:function(a,b,c){return this.aa(a,b,null,c,!1,!1,!1,null,null,null,!1,!1,!1)},
dM:function(a,b,c,d){return this.aa(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,d)},
kU:function(a,b,c,d,e){return this.aa(a,b,null,c,!1,!1,!1,d,null,null,!1,!1,e)},
ac:function(a,b,c){return this.aa(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,!1)},
dO:function(a,b,c,d,e,f){return this.aa(a,b,null,!1,!1,!1,!1,c,d,e,f,!1,!1)},
dO:function(a,b,c,d,e,f){return this.aa(a,b,null,!1,!1,!1,!1,c,d,e,f,!1,!1)},
aD:function(a,b,c){return this.aa(a,b,null,!1,!1,!1,c,null,null,null,!1,!1,!1)},
c4:function(a,b,c,d){return this.aa(a,b,null,!1,c,!1,d,null,null,null,!1,!1,!1)},
kT:function(a,b,c,d,e){return this.aa(a,b,null,c,!1,!1,!1,d,null,null,e,!1,!1)},
eW:function(a,b,c,d){return this.aa(a,b,null,c,!1,!1,!1,null,null,null,d,!1,!1)},
eW:function(a,b,c,d){return this.aa(a,b,null,c,!1,!1,!1,null,null,null,d,!1,!1)},
bR:function(a,b,c,d){return this.aa(a,b,null,c,!1,!1,!1,d,null,null,!1,!1,!1)},
bS:function(a,b,c,d,e){return this.aa(a,b,c,!1,!1,!1,!1,d,null,null,e,!1,!1)},
eV:function(a,b,c,d){return this.aa(a,b,null,c,!1,!1,d,null,null,null,!1,!1,!1)},
bp:function(a,b,c,d){return this.aa(a,b,null,!1,!1,!1,!1,c,null,null,d,!1,!1)},
c4:function(a,b,c,d){return this.aa(a,b,null,!1,c,!1,d,null,null,null,!1,!1,!1)},
dN:function(a,b,c,d,e){return this.aa(a,b,c,!1,!1,d,!1,e,null,null,!1,!1,!1)},
hv:function(a,b,c,d){return this.aa(a,b,null,!1,!1,!1,c,d,null,null,!1,!1,!1)},
hu:function(a,b,c,d){return this.aa(a,b,c,!1,!1,d,!1,null,null,null,!1,!1,!1)},
kW:function(a,b,c,d,e,f){return this.aa(a,b,c,d,!1,e,!1,f,null,null,!1,!1,!1)},
c5:function(a,b,c,d,e){return this.aa(a,b,c,d,!1,e,!1,null,null,null,!1,!1,!1)},
ht:function(a,b,c){return this.aa(a,b,c,!1,!1,!1,!1,null,null,null,!1,!1,!1)},
kR:function(a,b,c,d){return this.aa(a,b,c,!1,!1,!1,!1,d,null,null,!1,!1,!1)},
eX:function(a,b,c,d){return this.aa(a,b,null,!1,!1,!1,!1,c,d,null,!1,!1,!1)},
kV:function(a,b,c,d,e){return this.aa(a,b,null,!1,c,!1,!1,d,null,null,e,!1,!1)},
kX:function(a,b,c,d,e,f){return this.aa(a,b,null,!1,c,!1,!1,d,e,null,f,!1,!1)},
eV:function(a,b,c,d){return this.aa(a,b,null,c,!1,!1,d,null,null,null,!1,!1,!1)},
kS:function(a,b,c,d){return this.aa(a,b,null,!1,c,!1,!1,null,null,null,d,!1,!1)}},cl:{"^":"d;a,b,c,d",
k:function(a){return this.a}}}],["","",,L,{"^":"",ts:{"^":"a:0;",
$1:function(a){a.gcM().b=2
return 2}},tO:{"^":"a:0;",
$1:function(a){a.gcM().b=0
return 0}},tr:{"^":"a:0;",
$1:function(a){a.gcM().b=1
return 1}},hl:{"^":"d;",
he:function(a){var z,y
z=this.a
y=a.gi()
return z==null?y==null:z===y}},qd:{"^":"hl;i:a<",
a2:function(a){var z=new L.bs(null,null)
z.m(this)
a.$1(z)
return z.q()},
A:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof L.hl))return!1
z=this.a
y=b.a
return z==null?y==null:z===y},
gB:function(a){return Y.U(Y.k(0,J.j(this.a)))},
k:function(a){return"Team {id="+J.h(this.a)+",\n}"},
v:{
eg:function(a){var z=new L.bs(null,null)
a.$1(z)
return z.q()}}},bs:{"^":"d;a,b",
gi:function(){return this.gcM().b},
gcM:function(){var z=this.a
if(z!=null){this.b=z.a
this.a=null}return this},
m:function(a){this.a=a},
q:function(){var z,y
z=this.a
if(z==null){y=this.gcM().b
z=new L.qd(y)
if(y==null)H.i(P.m("id"))}this.m(z)
return z}}}],["","",,O,{"^":"",pG:{"^":"d;a"}}],["","",,X,{"^":"",
i4:function(a,b){return P.aV(function(){var z=a,y=b
var x=0,w=1,v,u,t,s,r,q
return function $async$i4(c,d){if(c===1){v=d
x=w}while(true)switch(x){case 0:u=z.a
t=new J.bk(u,u.length,0,null,[H.l(u,0)])
u=y.a
s=new J.bk(u,u.length,0,null,[H.l(u,0)])
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
break}case 4:return P.aT()
case 1:return P.aU(v)}}})}}],["","",,A,{"^":"",a4:{"^":"d;dw:a<,aC:b<,c,d,e,f,V:r<,x",
gjD:function(){var z=this.f
return z.length!==0?C.a.gw(z):null},
gB:function(a){var z,y,x,w,v
z=X.bC(this.a)
y=X.bC(this.d)
x=X.bC(this.f)
w=this.r
v=this.c
v=X.dg(X.b3(X.b3(0,C.e.gB(w)),J.j(v)))
return X.dg(X.b3(X.b3(X.b3(X.b3(0,z&0x1FFFFFFF),y&0x1FFFFFFF),x&0x1FFFFFFF),v&0x1FFFFFFF))},
A:function(a,b){var z
if(b==null)return!1
z=J.o(b)
return!!z.$isa4&&this.gB(this)===z.gB(b)},
fP:function(a){var z,y
z=this.hM(a,!0)
y=z.ga_(z)
if(y.u()){y.gU()
return!0}return!1},
ao:function(a){var z,y
z=this.hL(a)
y=z.ga_(z)
if(y.u()){y.gU()
return!0}return!1},
h1:function(a){var z,y,x
z=this.dn(a)
if(z==null)throw H.c(new P.w("Tried to elapseSituationTime of situation id="+H.b(a)+" that doesn't exist in situations ("+H.b(this.f)+")."))
y=this.f
if(z!==(z|0)||z>=y.length)return H.f(y,z)
x=y[z].ay()
if(z!==(z|0)||z>=y.length)return H.f(y,z)
y[z]=x},
ay:function(){++this.r},
d9:function(a,b,c,d,e){var z=this.d
if(a!=null)z=z.di(0,new A.pL(a))
if(b!=null)z=z.c9(0,new A.pM(b))
if(c!=null)z=z.c9(0,new A.pN(c))
if(e!=null)z=z.c9(0,new A.pO(e))
return d!=null?z.c9(0,new A.pP(d)):z},
hL:function(a){return this.d9(a,null,null,null,null)},
hM:function(a,b){return this.d9(a,null,null,null,b)},
hN:function(a,b,c){return this.d9(a,b,null,null,c)},
T:function(a){return this.a.bC(0,new A.pQ(a))},
dY:function(a){return this.e.bC(0,new A.pR(a))},
f5:function(a){var z,y
z=this.dn(a)
if(z==null)return
y=this.f
if(z!==(z|0)||z>=y.length)return H.f(y,z)
return y[z]},
as:function(a){var z,y
for(z=this.f,y=z.length-1;y>=0;--y){if(y>=z.length)return H.f(z,y)
if(J.e(z[y].gh(),a)){if(y>=z.length)return H.f(z,y)
return z[y]}}throw H.c(P.G("No situation with name="+a+" found."))},
k9:function(a){var z=this.a.aU(0,new A.pS(a),new A.pT())
if(z==null)return!1
return z.gaH()},
aA:function(){var z,y
z=this.f
y=C.a.gw(z)
y.dI(this)
C.a.a3(z,y)},
aX:function(a){var z,y
z=this.f
while(!0){if(!(z.length!==0&&!J.e(C.a.gw(z).gh(),a)))break
y=C.a.gw(z)
y.dI(this)
C.a.a3(z,y)}if(z.length===0)throw H.c(P.G("Tried to pop situations until "+a+" but none was found in stack."))},
c3:function(a,b){var z,y
z=this.dn(a)
if(z==null)throw H.c(P.G("Situation with id "+H.b(a)+" does not exist in "+H.b(this.f)))
y=this.f
if(z!==(z|0)||z>=y.length)return H.f(y,z)
y[z]=b},
dQ:function(a,b,c,d,e){var z,y,x,w
z=this.d9(a,b,c,d,e)
y=z.ga_(z)
if(y.u()){x=y.gU()
y=this.r
w=x.gV()
if(typeof w!=="number")return H.x(w)
return y-w}return},
c7:function(a,b,c){return this.dQ(a,null,b,null,c)},
l_:function(a,b,c){return this.dQ(a,b,null,null,c)},
l0:function(a,b,c){return this.dQ(null,a,b,c,null)},
dP:function(a){return this.dQ(a,null,null,null,null)},
k:function(a){var z,y
z=this.a
y=z.el()
y.ax(0,z)
return"World<"+P.cg(y,"{","}")+">"},
X:function(a,b){var z,y,x
z=this.T(a)
y=z.a2(b)
x=this.a
x.a3(0,z)
x.t(0,y)},
dn:function(a){var z,y,x
y=this.f
x=0
while(!0){if(!(x<y.length)){z=null
break}if(J.e(y[x].gi(),a)){z=x
break}++x}return z},
ii:function(a){this.a.ax(0,a.a)
this.d.ax(0,a.d)
this.b.ax(0,a.b)
this.e.ax(0,a.e)
C.a.ax(this.f,a.f)
this.r=a.r},
v:{
ee:function(a){var z,y,x,w
z=P.a6(null,null,null,R.A)
y=P.bb(null,O.cG)
x=P.a6(null,null,null,U.ae)
w=P.a6(null,null,null,null)
w=new A.a4(z,x,a.c,y,w,[],null,null)
w.ii(a)
return w}}},pL:{"^":"a:0;a",
$1:function(a){return a.gdv()===this.a}},pM:{"^":"a:0;a",
$1:function(a){return J.e(a.gcs(),this.a.gi())}},pN:{"^":"a:0;a",
$1:function(a){return a.gff().a7(0,this.a.gi())}},pO:{"^":"a:0;a",
$1:function(a){return a.ghH()===this.a}},pP:{"^":"a:0;a",
$1:function(a){return a.ghF()===this.a}},pQ:{"^":"a:0;a",
$1:function(a){return J.e(a.gi(),this.a)}},pR:{"^":"a:0;a",
$1:function(a){return J.e(a.gh(),this.a)}},pS:{"^":"a:0;a",
$1:function(a){return J.e(a.gi(),this.a)}},pT:{"^":"a:2;",
$0:function(){return}}}],["","",,A,{"^":"",W:{"^":"ah;a1:b<"},fZ:{"^":"W;c,d,W:e<,I:f<,h:r<,b,a",
gJ:function(){return!1},
gO:function(){return!1},
gK:function(){return H.i(new P.w("Not rerollable"))},
P:[function(a,b,c){throw H.c(new P.w("SimpleAction always succeeds"))},"$3","gL",6,0,1],
R:[function(a,b,c){return this.c.$4(a,b,c,this)},"$3","gM",6,0,1],
ab:function(a,b){throw H.c(new P.w("SimpleAction shouldn't have to provide roll reason"))},
H:function(a,b){return 1},
G:function(a,b){var z=this.d
if(z==null)return!0
return z.$3(a,b,this)}}}],["","",,N,{"^":"",k5:{"^":"z;J:c<,a1:d<,I:e<,O:f<,K:r<,b,a",
ga6:function(){return"confuse <object>"},
gh:function(){return"Confuse"},
gaf:function(){return"will <subject> confuse <object>?"},
P:[function(a,b,c){var z
a.a8(c,"<subject> touch<es> <subject's> temple")
z=this.b
a.ac(c,"<subject> tr<ies> to {channel|implant} {terror|confusion} into <object's> mind",z)
a.eV(c,"<subject> fail<s>",!0,!0)
return H.b(a.gh())+" fails to confuse "+H.b(z.gh())},"$3","gL",6,0,1],
R:[function(a,b,c){var z
a.a8(c,"<subject> touch<es> <subject's> temple")
z=this.b
a.bp(c,"<subject> {channel<s>|implant<s>} {terror|confusion} into <object's> mind",z,!0)
z.aD(c,"<subject's> eyes go wide with terror",!0)
return H.b(a.gh())+" confuses "+H.b(z.gh())},"$3","gM",6,0,1],
H:function(a,b){return 0.6},
G:function(a,b){var z
if(a.gN()===!0)if(a.ga4()){z=b.a
z=new H.K(z,new N.k6(this),[H.l(z,0)])
z=z.gl(z)>=2&&!this.b.dF(b)}else z=!1
else z=!1
return z},
v:{
wY:[function(a){return new N.k5(!0,!0,"Channeling the terror of the Dead Prince into lesser minds is something you've been practicing. It makes the target rabid and disoriented. They might attack their own.",!0,C.c,a,null)},"$1","tP",2,0,4]}},k6:{"^":"a:0;a",
$1:function(a){return a.gaH()&&a.gaY().he(this.a.b.gaY())}}}],["","",,V,{"^":"",kt:{"^":"z;O:c<,K:d<,J:e<,a1:f<,I:r<,b,a",
ga6:function(){return"kick <object's> weapon off"},
gh:function(){return"DisarmKick"},
gaf:function(){return"will <subject> kick the weapon off?"},
P:[function(a,b,c){S.a7(new V.ku(this,a,c),new V.kv(this,a,c),null,null)
return H.b(a.gh())+" fails to kick "+H.b(this.b.gh())+"'s weapon off"},"$3","gL",6,0,1],
R:[function(a,b,c){var z,y
S.a7(new V.kw(this,a,c),new V.kx(this,a,c),null,null)
z=b.f
y=z.length!==0?C.a.gw(z):null
b.c3(y.gi(),y.a2(new V.ky(this)))
z=this.b
b.X(z.gi(),new V.kz())
return H.b(a.gh())+" kicks "+H.b(z.gh())+"'s weapon off"},"$3","gM",6,0,1],
H:function(a,b){var z=a.ga4()?0:0.2
if(a.ch===!0)return 0.7-z
return 0.5-z},
G:function(a,b){var z
if(a.ga4()||a.dy===C.h){z=this.b
z=z.ga0()&&!z.gaz()}else z=!1
return z},
v:{
x0:[function(a){return new V.kt(!0,C.c,!0,!0,"When enemies are on the ground, you can try to kick their weapon off to disarm them.",a,null)},"$1","u5",2,0,4]}},ku:{"^":"a:2;a,b,c",
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
this.b.kX(this.c,"<subject> kick<s> <object-owner's> <object> off <object-owner's> hand",!0,z.gS(),z,!0)}},kx:{"^":"a:2;a,b,c",
$0:function(){var z,y
z=this.c
y=this.a.b
this.b.bp(z,"<subject> kick<s> <object's> {right|} hand",y,!0)
z.bX(0,"<owner's> <subject> fl<ies> away",y,y.gS())}},ky:{"^":"a:13;a",
$1:function(a){a.gbn().t(0,this.a.b.gS())
return a}},kz:{"^":"a:0;",
$1:function(a){a.sS($.$get$dk())
return a}}}],["","",,R,{"^":"",md:{"^":"z;O:c<,K:d<,J:e<,a1:f<,I:r<,b,a",
gh:function(){return"KickToGround"},
ga6:function(){return"kick <object> to the ground"},
gaf:function(){return"will <subject> kick <object> prone?"},
P:[function(a,b,c){S.a7(new R.me(this,a,c),new R.mf(this,a,c),null,null)
return H.b(a.gh())+" fails to sweep "+H.b(this.b.gh())+" off feet"},"$3","gL",6,0,1],
R:[function(a,b,c){var z
S.a7(new R.mg(this,a,c),new R.mh(this,a,c,U.bB(b)),null,null)
z=this.b
b.X(z.gi(),new R.mi())
return H.b(a.gh())+" sweeps "+H.b(z.gh())+" off feet"},"$3","gM",6,0,1],
H:function(a,b){var z=a.ga4()?0:0.2
if(a.ch===!0)return 0.7-z
return 0.5-z},
G:function(a,b){return(a.ga4()||a.dy===C.h)&&!this.b.ga0()},
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
$0:function(){this.b.kV(this.c,"<subject> kick<s> <object> off <object's> feet and to the ground",!0,this.a.b,!0)}},mh:{"^":"a:2;a,b,c,d",
$0:function(){var z,y
z=this.c
y=this.a.b
this.b.bp(z,"<subject> kick<s> <object's> {right|left} shin",y,!0)
y.a8(z,"<subject> {grunt|shriek}<s>")
y.aD(z,"<subject> fall<s> to the "+H.b(this.d),!0)}},mi:{"^":"a:0;",
$1:function(a){a.sah(C.f)
return a}}}],["","",,F,{"^":"",n1:{"^":"ah;I:b<,J:c<,a1:d<,O:e<,K:f<,a",
gW:function(){return"Stand off."},
gh:function(){return"Pass"},
P:[function(a,b,c){throw H.c(new P.Y(null))},"$3","gL",6,0,1],
R:[function(a,b,c){if(a.gN()===!0)a.a8(c,"<subject> stand<s> off")
return H.b(a.gh())+" passes the opportunity"},"$3","gM",6,0,1],
ab:function(a,b){return"WARNING this shouldn't be user-visible"},
H:function(a,b){return 1},
G:function(a,b){return!0}}}],["","",,Y,{"^":"",nf:{"^":"z;O:c<,K:d<,J:e<,a1:f<,I:r<,b,a",
ga6:function(){return"force <object> off balance"},
gh:function(){return"Pound"},
gaf:function(){return"will <subject> force <object> off balance?"},
P:[function(a,b,c){var z=this.b
a.eX(c,"<subject> {fiercely|violently} {pound<s>|strike<s>|hammer<s>|batter<s>} on <object-owner's> {<object>|weapon}",z.gS(),z)
z.bi(c,"<subject> {retain<s>|keep<s>} <subject's> {|combat} {stance|footing}",!0)
return H.b(a.gh())+" kicks "+H.b(z.db)+" off balance"},"$3","gL",6,0,1],
R:[function(a,b,c){var z=this.b
a.eX(c,"<subject> {fiercely|violently} {pound<s>|strike<s>|hammer<s>|batter<s>} on <object-owner's> {<object>|weapon}",z.gS(),z)
if(z.ga4()){z.hv(c,"<subject> lose<s> <object>",!0,$.$get$ey())
b.X(z.y,new Y.ng())
C.a.t(b.f,U.mI(z,a))
return H.b(a.gh())+" pounds "+H.b(z.db)+" off balance"}else if(z.gaq()){z.a8(c,"<subject> <is> already off balance")
c.ey(0,"<subject> make<s> <object> fall to the "+H.b(U.bB(b)),z,$.$get$iA())
b.X(z.y,new Y.nh())
return H.b(a.gh())+" pounds "+H.b(z.db)+" to the ground"}throw H.c(new P.w("enemy pose must be either standing or off-balance"))},"$3","gM",6,0,1],
H:function(a,b){var z=a.ga4()?0:0.2
if(a.ch===!0)return 0.7-z
return 0.5-z},
G:function(a,b){var z,y
if(!a.ga0()){z=a.e
if(z.gaV()||z.gko()){z=this.b
if(!z.gS().gcj()){z.gS().geE()
y=!1}else y=!0
z=y&&!z.ga0()}else z=!1}else z=!1
return z},
v:{
xp:[function(a){return new Y.nf(!0,C.c,!0,!0,"Forcing enemies off balance often means hitting them heavily several times in a row. The goal is not to deal damage but to force the opponent to lose control of their combat stance. It can also give members of your party an opportunity to strike.",a,null)},"$1","va",2,0,4]}},ng:{"^":"a:0;",
$1:function(a){a.sah(C.h)
return a}},nh:{"^":"a:0;",
$1:function(a){a.sah(C.f)
return a}}}],["","",,B,{"^":"",nD:{"^":"ah;I:b<,J:c<,a1:d<,O:e<,K:f<,a",
gW:function(){return"Regain balance."},
gh:function(){return"RegainBalance"},
P:[function(a,b,c){throw H.c(new P.Y(null))},"$3","gL",6,0,1],
R:[function(a,b,c){if(a.gN()===!0)a.bp(c,"<subject> regain<s> <object>",$.$get$ey(),!0)
b.X(a.gi(),new B.nE())
return H.b(a.gh())+" regains balance"},"$3","gM",6,0,1],
ab:function(a,b){return"Will "+a.ga9().a+" regain balance?"},
H:function(a,b){return 1},
G:function(a,b){return a.gaq()}},nE:{"^":"a:0;",
$1:function(a){a.sah(C.k)
return C.k}}}],["","",,O,{"^":"",nT:{"^":"ah;I:b<,J:c<,a1:d<,O:e<,K:f<,a",
gW:function(){return"Scramble."},
gh:function(){return"Scramble"},
P:[function(a,b,c){throw H.c(new P.Y(null))},"$3","gL",6,0,1],
R:[function(a,b,c){a.a8(c,"<subject> tr<ies> to {scramble|crawl} out of {reach|harm's way}")
return H.b(a.gh())+" scrambles on ground"},"$3","gM",6,0,1],
ab:function(a,b){return"Will "+a.ga9().a+" crawl out of harm's way?"},
H:function(a,b){return 1},
G:function(a,b){if(!a.ga0())return!1
if(A.dq(a,b))return!0
return!1}}}],["","",,Q,{"^":"",oC:{"^":"ah;I:b<,J:c<,a1:d<,O:e<,K:f<,a",
gW:function(){return"Stand up."},
gh:function(){return"StandUp"},
P:[function(a,b,c){throw H.c(new P.Y(null))},"$3","gL",6,0,1],
R:[function(a,b,c){a.a8(c,"<subject> {rise<s>|stand<s> up|get<s> to <subject's> feet|get<s> up|pick<s> <subjectPronounSelf> up}")
S.a7(new Q.oD(a,c),new Q.oE(a,c),null,null)
b.X(a.gi(),new Q.oF())
return H.b(a.gh())+" stands up"},"$3","gM",6,0,1],
ab:function(a,b){return"Will "+a.ga9().a+" stand up?"},
H:function(a,b){return 1},
G:function(a,b){if(!a.ga0())return!1
if(A.dq(a,b))return!1
return!0}},oD:{"^":"a:2;a,b",
$0:function(){return this.a.a8(this.b,"<subject> {stagger<s>|sway<s>} back before finding balance")}},oE:{"^":"a:2;a,b",
$0:function(){return this.a.a8(this.b,"<subject> stead<ies> <subjectPronounSelf>")}},oF:{"^":"a:0;",
$1:function(a){a.sah(C.k)
return C.k}}}],["","",,T,{"^":"",
xS:[function(a){return new A.a2(T.eI(),null,null,new T.vn(),new T.vo(),new T.vp(),null,!0,"This move is hard, but when succesful, it's decisive.",!0,!0,"StartBreakNeckOnGround",!1,null,"break <object's> neck",null,a,null)},"$1","wr",2,0,4],
xT:[function(a){return new A.a2(T.eI(),new T.vq(),T.eI(),new T.vr(),new T.vs(),new T.vt(),new T.vu(),!0,"This move is hard, but when succesful, it's decisive.",!0,!0,"StartBreakNeckOnGroundPlayer",!0,C.c,"break <object's> neck","will <subject> succeed?",a,null)},"$1","ws",2,0,4],
xU:[function(a,b,c,d,e){a.ac(c,"<subject> throw<s> <subjectPronounSelf> {on|upon} <object>",d)
b.X(a.gi(),new T.vv())},"$5","eI",10,0,8],
vn:{"^":"a:3;",
$3:function(a,b,c){return a.gN()!==!0&&c.ga0()&&a.gaz()&&c.gaz()}},
vo:{"^":"a:3;",
$3:function(a,b,c){return Y.f1(a,c)}},
vp:{"^":"a:3;",
$3:function(a,b,c){return S.dX(a,c,C.l)}},
vr:{"^":"a:3;",
$3:function(a,b,c){return a.gN()===!0&&c.ga0()&&a.gaz()&&c.gaz()}},
vs:{"^":"a:3;",
$3:function(a,b,c){return Y.f1(a,c)}},
vt:{"^":"a:3;",
$3:function(a,b,c){return S.dX(a,c,C.m)}},
vq:{"^":"a:3;",
$3:function(a,b,c){return 0.7}},
vu:{"^":"a:3;",
$3:function(a,b,c){return S.dX(a,c,C.p)}},
vv:{"^":"a:0;",
$1:function(a){a.sah(C.f)
return a}}}],["","",,A,{"^":"",a2:{"^":"z;c,d,e,f,r,x,y,z,I:Q<,J:ch<,a1:cx<,h:cy<,O:db<,K:dx<,a6:dy<,af:fr<,b,a",
P:[function(a,b,c){var z,y,x,w
z=this.b
y=this.e
if(this.z){x=this.r.$3(a,b,z)
w=this.y.$3(a,b,z)
y.$5(a,b,c,z,x)
y=b.f
C.a.t(y,x)
C.a.t(y,w)}else y.$5(a,b,c,z,null)
return H.b(a.gh())+" fails to start a "+this.cy+" (defensible situation) at "+H.b(z.gh())},"$3","gL",6,0,1],
R:[function(a,b,c){var z,y,x,w
z=this.b
y=this.r.$3(a,b,z)
x=this.x.$3(a,b,z)
this.c.$5(a,b,c,z,y)
w=b.f
C.a.t(w,y)
C.a.t(w,x)
return H.b(a.gh())+" starts a "+this.cy+" (defensible situation) at "+H.b(z.gh())},"$3","gM",6,0,1],
H:function(a,b){var z=this.d
if(z!=null)return z.$3(a,b,this.b)
return 1},
G:function(a,b){return this.f.$3(a,b,this.b)}}}],["","",,M,{"^":"",
xV:[function(a){return new A.a2(M.eJ(),null,null,new M.vw(),new M.vx(),new M.vy(),null,!0,"Jumping and tackling an opponent is one of the most risky moves but it's a quick way to neutralize someone.",!0,!0,"StartLeap",!1,null,"leap at <object>",null,a,null)},"$1","wt",2,0,4],
xW:[function(a){return new A.a2(M.eJ(),new M.vz(),M.eJ(),new M.vA(),new M.vB(),new M.vC(),new M.vD(),!0,"Jumping and tackling an opponent is one of the most risky moves but it's a quick way to neutralize someone.",!0,!0,"StartLeapPlayer",!0,C.c,"leap at <object>","will <subject> tackle <objectPronoun>?",a,null)},"$1","wu",2,0,4],
xX:[function(a,b,c,d,e){if(a.ga0()){a.ht(c,"<subject> roll<s>",e.gi())
a.ht(c,"<subject> put<s> <subject's> feet under <subjectPronounAccusative>",e.gi())}a.kR(c,"<subject> {leap<s>|jump<s>|spring<s>|launch<es> <subjectPronounSelf>|lunge<s>} at <object>",e.gi(),d)},"$5","eJ",10,0,8],
vw:{"^":"a:3;",
$3:function(a,b,c){var z,y
if(a.gN()!==!0){if(!a.gaz()){z=a.fy
y=$.$get$bA()
z=z.a
y=y.a
y=z==null?y==null:z===y
z=y}else z=!0
z=z&&!c.ga0()&&!A.dq(a,b)}else z=!1
return z}},
vx:{"^":"a:3;",
$3:function(a,b,c){return F.fs(a,c)}},
vy:{"^":"a:3;",
$3:function(a,b,c){return V.dM(a,c,C.l)}},
vA:{"^":"a:3;",
$3:function(a,b,c){return a.gN()===!0&&a.gaz()&&!c.ga0()&&!A.dq(a,b)}},
vB:{"^":"a:3;",
$3:function(a,b,c){return F.fs(a,c)}},
vC:{"^":"a:3;",
$3:function(a,b,c){return V.dM(a,c,C.m)}},
vz:{"^":"a:3;",
$3:function(a,b,c){return a.ga4()?0.4:0.2}},
vD:{"^":"a:3;",
$3:function(a,b,c){return V.dM(a,c,C.p)}}}],["","",,U,{"^":"",
xY:[function(a){return new A.a2(U.eK(),null,null,new U.vE(),new U.vF(),new U.vG(),null,!0,"Punching someone hard enough can cause them to lose their footing. And it hurts.",!0,!0,"StartPunch",!1,null,"punch <object>",null,a,null)},"$1","wv",2,0,4],
xZ:[function(a){return new A.a2(U.eK(),new U.vH(),U.eK(),new U.vI(),new U.vJ(),new U.vK(),new U.vL(),!0,"Punching someone hard enough can cause them to lose their footing. And it hurts.",!0,!0,"StartPunchPlayer",!0,C.c,"punch <object>","will <subject> hit <objectPronoun>?",a,null)},"$1","ww",2,0,4],
y_:[function(a,b,c,d,e){c.jn(0,"<subject> {thrust<s>|swing<s>} <subject's> fist at <object>",e.gi(),!0,d,a)},"$5","eK",10,0,8],
vE:{"^":"a:3;",
$3:function(a,b,c){var z
if(a.gN()!==!0)z=(a.ga4()||a.dy===C.h)&&!c.ga0()&&a.gaz()
else z=!1
return z}},
vF:{"^":"a:3;",
$3:function(a,b,c){return Q.fP(a,c)}},
vG:{"^":"a:3;",
$3:function(a,b,c){return Z.e4(a,c,C.l)}},
vI:{"^":"a:3;",
$3:function(a,b,c){var z
if(a.gN()===!0)z=(a.ga4()||a.dy===C.h)&&!c.ga0()&&a.gaz()
else z=!1
return z}},
vJ:{"^":"a:3;",
$3:function(a,b,c){return Q.fP(a,c)}},
vK:{"^":"a:3;",
$3:function(a,b,c){return Z.e4(a,c,C.m)}},
vH:{"^":"a:3;",
$3:function(a,b,c){return 0.7}},
vL:{"^":"a:3;",
$3:function(a,b,c){return Z.e4(a,c,C.p)}}}],["","",,G,{"^":"",
y0:[function(a){return new A.a2(G.eL(),null,null,new G.vO(),new G.vP(),new G.vQ(),null,!0,"The basic swordfighting move is also often the most effective.",!0,!0,"StartSlash",!1,null,"swing at <object>",null,a,null)},"$1","wx",2,0,4],
y5:[function(a){return new A.a2(G.eL(),new G.vZ(),G.eL(),new G.w_(),new G.w0(),new G.w1(),new G.w2(),!0,"The basic swordfighting move is also often the most effective.",!0,!0,"StartSlashPlayer",!0,C.c,"swing at <object>","will <subject> hit <objectPronoun>?",a,null)},"$1","wy",2,0,4],
y6:[function(a,b,c,d,e){return a.dN(c,"<subject> swing<s> {"+H.b(U.ab(a))+" |}at <object>",e.gi(),!0,d)},"$5","eL",10,0,8],
vO:{"^":"a:3;",
$3:function(a,b,c){return a.gN()!==!0&&a.ga4()&&!c.ga0()&&a.e.gaV()}},
vP:{"^":"a:3;",
$3:function(a,b,c){return M.bc(a,c)}},
vQ:{"^":"a:3;",
$3:function(a,b,c){return L.aQ(a,c,C.l)}},
w_:{"^":"a:3;",
$3:function(a,b,c){return a.gN()===!0&&a.ga4()&&!c.ga0()&&a.e.gaV()}},
w0:{"^":"a:3;",
$3:function(a,b,c){return M.bc(a,c)}},
w1:{"^":"a:3;",
$3:function(a,b,c){return L.aQ(a,c,C.m)}},
vZ:{"^":"a:3;",
$3:function(a,b,c){return 0.7-(c.gal()!=null?0.2:0)}},
w2:{"^":"a:3;",
$3:function(a,b,c){return L.aQ(a,c,C.p)}}}],["","",,R,{"^":"",
y1:[function(a,b,c,d,e){return a.hv(c,"<subject> completely miss<es> <object> with "+H.b(U.ab(a)),!0,d)},"$5","iG",10,0,11],
y2:[function(a){return new A.a2(R.iH(),new R.vR(),R.iG(),new R.vS(),new R.vT(),new R.vU(),null,!1,"It's always better to fight with your feet firmly on the ground. But sometimes, it's necessary to act quickly.",!0,!0,"StartSlashOutOfBalance",!1,null,"swing at <object> (while out of balance)",null,a,null)},"$1","wz",2,0,4],
y3:[function(a){return new A.a2(R.iH(),new R.vV(),R.iG(),new R.vW(),new R.vX(),new R.vY(),null,!1,"It's always better to fight with your feet firmly on the ground. But sometimes, it's necessary to act quickly.",!0,!0,"StartSlashOutOfBalancePlayer",!1,null,"swing at <object> (while out of balance)",null,a,null)},"$1","wA",2,0,4],
y4:[function(a,b,c,d,e){return a.dN(c,"<subject> swing<s> {"+H.b(U.ab(a))+" |}at <object>",e.gi(),!0,d)},"$5","iH",10,0,8],
vS:{"^":"a:3;",
$3:function(a,b,c){return a.gN()!==!0&&a.gaq()&&!c.ga0()&&a.e.gaV()}},
vT:{"^":"a:3;",
$3:function(a,b,c){return M.bc(a,c)}},
vU:{"^":"a:3;",
$3:function(a,b,c){return L.aQ(a,c,C.l)}},
vR:{"^":"a:3;",
$3:function(a,b,c){return 0.7}},
vW:{"^":"a:3;",
$3:function(a,b,c){return a.gN()===!0&&a.gaq()&&!c.ga0()&&a.e.gaV()}},
vX:{"^":"a:3;",
$3:function(a,b,c){return M.bc(a,c)}},
vY:{"^":"a:3;",
$3:function(a,b,c){return L.aQ(a,c,C.m)}},
vV:{"^":"a:3;",
$3:function(a,b,c){return 0.5-(c.gal()!=null?0.2:0)}}}],["","",,D,{"^":"",
y7:[function(a){return new A.a2(D.eM(),null,null,new D.w3(),new D.w4(),new D.w5(),null,!0,"Opponents on the ground are often the most vulnerable.",!0,!0,"StartStrikeDown",!1,null,"strike down at <object>",null,a,null)},"$1","wB",2,0,4],
y8:[function(a){return new A.a2(D.eM(),new D.w6(),D.eM(),new D.w7(),new D.w8(),new D.w9(),new D.wa(),!0,"Opponents on the ground are often the most vulnerable.",!0,!0,"StartStrikeDownPlayer",!0,C.c,"strike down at <object>","will <subject> hit?",a,null)},"$1","wC",2,0,4],
y9:[function(a,b,c,d,e){return a.ac(c,"<subject> strike<s> down {with "+H.b(U.ab(a))+" |}at <object>",d)},"$5","eM",10,0,11],
w3:{"^":"a:3;",
$3:function(a,b,c){return a.gN()!==!0&&c.ga0()&&!a.ga0()&&a.e.gaV()}},
w4:{"^":"a:3;",
$3:function(a,b,c){return D.d7(a,c)}},
w5:{"^":"a:3;",
$3:function(a,b,c){return V.bJ(a,c,C.l)}},
w7:{"^":"a:3;",
$3:function(a,b,c){return a.gN()===!0&&c.ga0()&&!a.ga0()&&a.e.gaV()}},
w8:{"^":"a:3;",
$3:function(a,b,c){return D.d7(a,c)}},
w9:{"^":"a:3;",
$3:function(a,b,c){return V.bJ(a,c,C.m)}},
w6:{"^":"a:3;",
$3:function(a,b,c){var z,y
z=a.gaq()?0.2:0
y=c.gal()!=null?0.2:0
return 0.7-z-y}},
wa:{"^":"a:3;",
$3:function(a,b,c){return V.bJ(a,c,C.p)}}}],["","",,A,{"^":"",
ya:[function(a){return new A.a2(A.eN(),null,null,new A.wb(),new A.wc(),new A.wd(),null,!0,"The basic move with a spear.",!0,!0,"StartThrustSpear",!1,null,"thrust at <object>",null,a,null)},"$1","wD",2,0,4],
ye:[function(a){return new A.a2(A.eN(),new A.wm(),A.eN(),new A.wn(),new A.wo(),new A.wp(),new A.wq(),!0,"The basic move with a spear.",!0,!0,"StartThrustSpearPlayer",!0,C.c,"thrust at <object>","will <subject> hit <objectPronoun>?",a,null)},"$1","wE",2,0,4],
yf:[function(a,b,c,d,e){return a.dN(c,"<subject> thrust<s> {"+H.b(U.ab(a))+" |}at <object>",e.gi(),!0,d)},"$5","eN",10,0,8],
wb:{"^":"a:3;",
$3:function(a,b,c){return a.gN()!==!0&&a.ga4()&&!c.ga0()&&a.e instanceof Z.al}},
wc:{"^":"a:3;",
$3:function(a,b,c){return M.bc(a,c)}},
wd:{"^":"a:3;",
$3:function(a,b,c){return L.aQ(a,c,C.l)}},
wn:{"^":"a:3;",
$3:function(a,b,c){return a.gN()===!0&&a.ga4()&&!c.ga0()&&a.e instanceof Z.al}},
wo:{"^":"a:3;",
$3:function(a,b,c){return M.bc(a,c)}},
wp:{"^":"a:3;",
$3:function(a,b,c){return L.aQ(a,c,C.m)}},
wm:{"^":"a:3;",
$3:function(a,b,c){return 0.7-(c.gal()!=null?0.2:0)}},
wq:{"^":"a:3;",
$3:function(a,b,c){return L.aQ(a,c,C.p)}}}],["","",,O,{"^":"",
yb:[function(a){return new A.a2(O.eO(),null,null,new O.we(),new O.wf(),new O.wg(),null,!0,"Opponents on the ground are often the most vulnerable.",!0,!0,"StartThrustSpearDown",!1,null,"thrust down at <object>",null,a,null)},"$1","wF",2,0,4],
yc:[function(a){return new A.a2(O.eO(),new O.wh(),O.eO(),new O.wi(),new O.wj(),new O.wk(),new O.wl(),!0,"Opponents on the ground are often the most vulnerable.",!0,!0,"StartThrustSpearDownPlayer",!0,C.c,"thrust down at <object>","will <subject> hit?",a,null)},"$1","wG",2,0,4],
yd:[function(a,b,c,d,e){return a.ac(c,"<subject> thrust<s> down {with "+H.b(U.ab(a))+" |}at <object>",d)},"$5","eO",10,0,11],
we:{"^":"a:3;",
$3:function(a,b,c){return a.gN()!==!0&&c.ga0()&&!a.ga0()&&a.e instanceof Z.al}},
wf:{"^":"a:3;",
$3:function(a,b,c){return D.d7(a,c)}},
wg:{"^":"a:3;",
$3:function(a,b,c){return V.bJ(a,c,C.l)}},
wi:{"^":"a:3;",
$3:function(a,b,c){return a.gN()===!0&&c.ga0()&&!a.ga0()&&a.e instanceof Z.al}},
wj:{"^":"a:3;",
$3:function(a,b,c){return D.d7(a,c)}},
wk:{"^":"a:3;",
$3:function(a,b,c){return V.bJ(a,c,C.m)}},
wh:{"^":"a:3;",
$3:function(a,b,c){var z,y
z=a.gaq()?0.2:0
y=c.gal()!=null?0.2:0
return 0.7-z-y}},
wl:{"^":"a:3;",
$3:function(a,b,c){return V.bJ(a,c,C.p)}}}],["","",,E,{"^":"",ph:{"^":"ce;a1:c<,b,a",
ga6:function(){return"pick up <object>"},
gI:function(){return"A shield makes a huge difference in battle."},
gJ:function(){return!1},
gh:function(){return"TakeDroppedShield"},
gO:function(){return!1},
gK:function(){return},
P:[function(a,b,c){throw H.c(new P.Y(null))},"$3","gL",6,0,1],
R:[function(a,b,c){var z,y
z=b.f
y=z.length!==0?C.a.gw(z):null
b.c3(y.gi(),y.a2(new E.pi(this)))
b.X(a.gi(),new E.pj(this))
z=this.b
a.ac(c,"<subject> pick<s> <object> up",z)
return H.b(a.gh())+" picks up "+H.b(z.gh())},"$3","gM",6,0,1],
ab:function(a,b){return H.i(new P.Y(null))},
H:function(a,b){return 1},
G:function(a,b){if(!(this.b instanceof E.br))return!1
a.gfU()
if(a.d!=null)return!1
return!0},
v:{
xu:[function(a){return new E.ph(!0,a,null)},"$1","wM",2,0,29]}},pi:{"^":"a:13;a",
$1:function(a){a.gbn().a3(0,this.a.b)
return a}},pj:{"^":"a:0;a",
$1:function(a){a.sal(H.F(this.a.b,"$isbr"))}}}],["","",,M,{"^":"",pk:{"^":"ce;a1:c<,b,a",
ga6:function(){return"pick up <object>"},
gI:function(){return"A different weapon might change the battle."},
gJ:function(){return!1},
gh:function(){return"TakeDroppedWeapon"},
gO:function(){return!1},
gK:function(){return},
P:[function(a,b,c){throw H.c(new P.Y(null))},"$3","gL",6,0,1],
R:[function(a,b,c){var z,y
z=b.f
y=z.length!==0?C.a.gw(z):null
b.c3(y.gi(),y.a2(new M.pl(this)))
b.X(a.gi(),new M.pm(this,a))
z=this.b
a.ac(c,"<subject> pick<s> <object> up",z)
return H.b(a.gh())+" picks up "+H.b(z.gh())},"$3","gM",6,0,1],
ab:function(a,b){return H.i(new P.Y(null))},
H:function(a,b){return 1},
G:function(a,b){var z,y,x,w,v
z=this.b
y=J.o(z)
if(!y.$isaS)return!1
if(!!y.$isal)return!1
a.gfU()
x=a.e
w=x instanceof Z.al&&!!y.$isaH
z=z.gae()
x=x.gae()
if(typeof x!=="number")return H.x(x)
if(z<=x&&!w)return!1
v=b.c7("DisarmKick",a,!0)
if(v!=null&&v<=2)return!1
return!0},
v:{
xv:[function(a){return new M.pk(!0,a,null)},"$1","wN",2,0,29]}},pl:{"^":"a:13;a",
$1:function(a){a.gbn().a3(0,this.a.b)
return a}},pm:{"^":"a:0;a,b",
$1:function(a){if(!this.b.gaz())a.gaC().t(0,a.gS())
a.sS(H.F(this.a.b,"$isaS"))}}}],["","",,D,{"^":"",pt:{"^":"z;J:c<,a1:d<,I:e<,O:f<,K:r<,b,a",
ga6:function(){return"throw spear at <object>"},
gh:function(){return"ThrowSpear"},
gaf:function(){return"will <subject> hit <object>?"},
P:[function(a,b,c){var z,y
z=this.fu(a)
y=this.b
a.ac(c,"<subject> {throw<s>|hurl<s>|cast<s>} "+H.b(z.gaK()===!0?z.gh():"<subject's> "+H.b(z.gh()))+" at <object>",y)
if(y.gal()!=null)y.kT(c,"<subject> deflects it with <subject's> <object>",!0,y.gal(),!0)
else y.eW(c,"<subject> {dodge<s> it|move<s> out of the way}",!0,!0)
z.a8(c,"<subject> {drive<s>|plunge<s>|ram<s>|thrust<s>} into the "+H.b(U.bB(b))+"{| nearby| not far from here}")
this.fG(b,a,z)
return H.b(a.gh())+" fails to hit "+H.b(y.gh())+" with spear"},"$3","gL",6,0,1],
R:[function(a,b,c){var z,y,x,w,v,u,t
z=this.fu(a)
y=this.b
a.ac(c,"<subject> {throw<s>|hurl<s>|cast<s>} "+H.b(z.gaK()===!0?z.gh():"<subject's> "+H.b(z.gh()))+" at <object>",y)
if(y.gal()!=null)z.dO(c,"<subject> fl<ies> past <object-owner's> <object>",y.gal(),y,a,!0)
b.X(y.gi(),new D.px(z))
x=b.T(y.gi())
w=!x.gaH()&&x.gi()!==100
v=[P.q]
if(!w){u=S.bO("{shoulder|{left|right} arm|{left|right} thigh}")
t=a.gaY()
v=H.p([],v)
z.dO(c,"<subject> {pierce<s>|ram<s> into|drill<s> through} <object-owner's> <object>",new Y.aD(!1,u,v,t==null?$.$get$aM():t,!1,C.n),x,a,!0)
N.b4(c,x)}else{u=S.bO("{chest|eye|neck}")
t=a.gaY()
v=H.p([],v)
z.dO(c,"<subject> {pierce<s>|ram<s> into|drill<s> through} <object-owner's> <object>",new Y.aD(!1,u,v,t==null?$.$get$aM():t,!1,C.n),x,a,!0)
N.bj(c,b,x)}this.fG(b,a,z)
return H.b(a.gh())+" hits "+H.b(y.gh())+" with spear"},"$3","gM",6,0,1],
H:function(a,b){return 0.6-(this.b.gal()!=null?0.2:0)},
G:function(a,b){var z
if(a.gN()===!0)if(a.ga4())z=(C.a.a7(a.e.gf2(),C.r)||a.ha(C.r))&&J.e(b.as("FightSituation").gV(),0)
else z=!1
else z=!1
return z},
fu:function(a){var z,y
if(a.gS()!=null&&a.gS() instanceof Z.al)return a.gS()
for(z=a.gaC(),z=z.ga_(z);z.u();){y=z.d
if(y instanceof Z.al)return y}throw H.c(new P.w("No spear found in "+a.k(0)))},
fG:function(a,b,c){var z,y
z=a.as("FightSituation")
if(J.e(b.gS(),c)){y=b.jV()
if(y==null)y=$.$get$dk()
a.X(b.y,new D.pu(y))}else a.X(b.gi(),new D.pv(c))
a.c3(z.gi(),z.a2(new D.pw(c)))},
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
return a}}}],["","",,M,{"^":"",pF:{"^":"ah;I:b<,O:c<,K:d<,J:e<,a1:f<,a",
gW:function(){return"Regain clarity."},
gh:function(){return"Unconfuse"},
P:[function(a,b,c){throw H.c(new P.Y(null))},"$3","gL",6,0,1],
R:[function(a,b,c){a.a8(c,"<subject> shake<s> <subject's> head violently")
if(a.gN()===!0)c.t(0,"the {horrible|terrible} spell seems to recede")
a.kS(c,"<subject's> eyes regain focus and clarity",!0,!0)
return H.b(a.gh())+" regains clarity"},"$3","gM",6,0,1],
ab:function(a,b){return"WARNING this shouldn't be user-visible"},
H:function(a,b){return 1},
G:function(a,b){var z
if(a.dF(b)){z=b.c7("Confuse",a,!0)
if(typeof z!=="number")return z.bk()
z=z>4}else z=!1
return z}}}],["","",,R,{"^":"",lr:{"^":"z;I:c<,J:d<,a1:e<,O:f<,K:r<,b,a",
gh:function(){return"FinishBreakNeck"},
ga6:function(){return""},
gaf:function(){return"(WARNING should not be user-visible)"},
P:[function(a,b,c){throw H.c(new P.Y(null))},"$3","gL",6,0,1],
R:[function(a,b,c){var z,y
z=this.b
b.X(z.gi(),new R.ls())
y=b.T(z.gi())
if(J.e(y.gi(),100)){a.bp(c,"<subject> smash<es> <object's> head to the ground",y,!0)
N.b4(c,y)}else{a.bp(c,"<subject> break<s> <object's> neck",y,!0)
N.bj(c,b,y)}return H.b(a.gh())+" breaks "+H.b(z.gh())+"'s neck on ground"},"$3","gM",6,0,1],
H:function(a,b){return 1},
G:function(a,b){return!0},
v:{
x6:[function(a){return new R.lr(null,!0,!0,!0,C.c,a,null)},"$1","ug",2,0,4]}},ls:{"^":"a:0;",
$1:function(a){a.sag(0)
return a}}}],["","",,Y,{"^":"",
f1:function(a,b){var z=new Y.dx(null,null,null,null,null)
new Y.tI(a,b).$1(z)
return z.q()},
f0:{"^":"af;",
gaG:function(){return[R.ug()]},
gh:function(){return"BreakNeckOnGroundSituation"},
ay:function(){var z=new Y.dx(null,null,null,null,null)
z.m(this)
new Y.jU().$1(z)
return z.q()},
b_:function(a,b){if(a===0)return b.T(this.a)
return},
b6:function(a,b){return new H.K(a,new Y.jV(this),[H.l(a,0)])}},
tI:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a9().ar(1073741823)
a.gba().c=z
a.gba().e=0
z=this.a.gi()
a.gba().b=z
z=this.b.gi()
a.gba().d=z
return a}},
jU:{"^":"a:0;",
$1:function(a){var z=a.gba().e
if(typeof z!=="number")return z.aj()
a.gba().e=z+1
return a}},
jV:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.e(a.gi(),z.a)||J.e(a.gi(),z.c)}},
pX:{"^":"f0;a,i:b<,c,V:d<",
a2:function(a){var z=new Y.dx(null,null,null,null,null)
z.m(this)
a.$1(z)
return z.q()},
A:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof Y.f0))return!1
if(J.e(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y)if(J.e(this.c,b.c)){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1}else z=!1
return z},
gB:function(a){return Y.U(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
k:function(a){return"BreakNeckOnGroundSituation {attacker="+H.b(J.h(this.a))+",\nid="+J.h(this.b)+",\ntarget="+H.b(J.h(this.c))+",\ntime="+J.h(this.d)+",\n}"}},
dx:{"^":"d;a,b,c,d,e",
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
z=new Y.pX(y,x,w,v)
if(y==null)H.i(P.m("attacker"))
if(x==null)H.i(P.m("id"))
if(w==null)H.i(P.m("target"))
if(v==null)H.i(P.m("time"))}this.m(z)
return z}}}],["","",,Z,{"^":"",l9:{"^":"z;I:c<,J:d<,a1:e<,O:f<,K:r<,b,a",
ga6:function(){return"evade"},
gh:function(){return"EvadeNeckBreaking"},
gaf:function(){return"will <subject> evade?"},
P:[function(a,b,c){a.a8(c,"<subject> tr<ies> to {dodge it|break free}")
S.a7(new Z.la(a,c),new Z.lb(this,a,c),null,null)
b.aA()
return H.b(a.gh())+" fails to dodge "+H.b(this.b.gh())},"$3","gL",6,0,1],
R:[function(a,b,c){var z=this.b
a.bp(c,"<subject> {dodge<s> it|break<s> free}",z,!0)
b.aX("FightSituation")
return H.b(a.gh())+" evades "+H.b(z.gh())},"$3","gM",6,0,1],
H:function(a,b){var z
if(a.gN()===!0)return 0.6
z=b.f
return(z.length!==0?C.a.gw(z):null).gb5().b4(0.5)},
G:function(a,b){return!0},
v:{
x5:[function(a){return new Z.l9("This looks dangerous. Trying to evade this close-quarter move seems prudent.",!1,!1,!0,C.c,a,null)},"$1","ua",2,0,4]}},la:{"^":"a:2;a,b",
$0:function(){return this.a.ai(this.b,"<subject> {can't|fail<s>}",!0)}},lb:{"^":"a:2;a,b,c",
$0:function(){return this.a.b.bR(this.c,"<subject> <is> too quick for <object>",!0,this.b)}}}],["","",,S,{"^":"",
dX:function(a,b,c){var z=new S.dW(null,null,null,null,null,null)
new S.tH(a,b,c).$1(z)
return z.q()},
fF:{"^":"c8;",
gaG:function(){return[Z.ua()]},
gh:function(){return"OnGroundWrestleDefenseSituation"},
ay:function(){var z=new S.dW(null,null,null,null,null,null)
z.m(this)
new S.mW().$1(z)
return z.q()}},
tH:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$a9().ar(1073741823)
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
q6:{"^":"fF;cO:a<,i:b<,cr:c<,cu:d<,V:e<",
a2:function(a){var z=new S.dW(null,null,null,null,null,null)
z.m(this)
a.$1(z)
return z.q()},
A:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof S.fF))return!1
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
gB:function(a){return Y.U(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)))},
k:function(a){return"OnGroundWrestleDefenseSituation {attacker="+H.b(J.h(this.a))+",\nid="+J.h(this.b)+",\npredeterminedResult="+J.h(this.c)+",\ntarget="+H.b(J.h(this.d))+",\ntime="+J.h(this.e)+",\n}"}},
dW:{"^":"d;a,b,c,d,e,f",
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
z=new S.q6(y,x,w,v,u)
if(y==null)H.i(P.m("attacker"))
if(x==null)H.i(P.m("id"))
if(w==null)H.i(P.m("predeterminedResult"))
if(v==null)H.i(P.m("target"))
if(u==null)H.i(P.m("time"))}this.m(z)
return z}}}],["","",,A,{"^":"",
dq:function(a,b){var z,y,x,w
z=b.c7("KickToGround",a,!0)
if(z!=null&&z<=2)return!0
y=b.c7("Pound",a,!0)
if(y!=null&&y<=2)return!0
x=b.c7("FinishPunch",a,!0)
if(x!=null&&x<=2)return!0
w=b.c7("FinishLeap",a,!0)
if(w!=null&&w<=2)return!0
return!1}}],["","",,U,{"^":"",
c0:function(a){return a.gal().gaK()===!0?a.gal().gh():"<subject's> "+H.b(a.gal().gh())},
ab:function(a){return a.gS().gaK()===!0?a.gS().gh():"<subject's> "+H.b(a.gS().gh())}}],["","",,G,{"^":"",
xG:[function(a,b,c,d,e){a.a8(c,"<subject> tr<ies> to swing back")
a.eV(c,"<subject> {go<es> wide|miss<es>}",!0,!0)
if(a.ga4()){b.X(a.y,new G.tS())
a.c4(c,"<subject> lose<s> balance because of that",!0,!0)}else if(a.dy===C.h){b.X(a.y,new G.tT())
a.aD(c,"<subject> lose<s> balance because of that",!0)
a.c4(c,"<subject> fall<s> to the ground",!0,!0)}},"$5","ib",10,0,11],
xH:[function(a){return new A.a2(G.ic(),new G.tU(),G.ib(),new G.tV(),new G.tW(),new G.tX(),null,!1,"You can deal serious damage when countering because your opponent is often caught off guard. On the other hand, counters require fast reaction and could throw you out of balance.",!0,!0,"CounterSlash",!1,null,"swing back at <object>",null,a,null)},"$1","u1",2,0,4],
xJ:[function(a,b,c,d,e){return a.ac(c,"<subject> swing<s> back",d)},"$5","ic",10,0,8],
xI:[function(a){return new A.a2(G.ic(),new G.tY(),G.ib(),new G.tZ(),new G.u_(),new G.u0(),null,!1,"You can deal serious damage when countering because your opponent is often caught off guard. On the other hand, counters require fast reaction and could throw you out of balance.",!0,!0,"CounterSlashPlayer",!0,C.c,"swing back at <object>","will <subject> hit <objectPronoun>?",a,null)},"$1","u2",2,0,4],
tS:{"^":"a:0;",
$1:function(a){a.sah(C.h)
return a}},
tT:{"^":"a:0;",
$1:function(a){a.sah(C.f)
return a}},
tV:{"^":"a:3;",
$3:function(a,b,c){return a.gN()!==!0&&a.gS().gaV()&&!a.ga0()}},
tW:{"^":"a:3;",
$3:function(a,b,c){return M.bc(a,c)}},
tX:{"^":"a:3;",
$3:function(a,b,c){return L.aQ(a,c,C.l)}},
tU:{"^":"a:3;",
$3:function(a,b,c){return c.ga4()?0.7:0.9}},
tZ:{"^":"a:3;",
$3:function(a,b,c){return a.gN()===!0&&a.gS().gaV()&&!a.ga0()}},
u_:{"^":"a:3;",
$3:function(a,b,c){return M.bc(a,c)}},
u0:{"^":"a:3;",
$3:function(a,b,c){return L.aQ(a,c,C.m)}},
tY:{"^":"a:3;",
$3:function(a,b,c){return c.ga4()?0.7:0.9}}}],["","",,V,{"^":"",ke:{"^":"z;I:c<,J:d<,a1:e<,O:f<,K:r<,b,a",
ga6:function(){return"tackle <object>"},
gh:function(){return"CounterTackle"},
gaf:function(){return"will <subject> tackle <objectPronoun>?"},
P:[function(a,b,c){var z=this.b
a.ac(c,"<subject> tr<ies> to tackle <object>",z)
S.a7(new V.kf(a,c),new V.kg(this,c),null,null)
a.ac(c,"<subject> land<s> on the "+H.b(U.bB(b))+" next to <object>",z)
b.X(a.gi(),new V.kh())
return H.b(a.gh())+" fails to tackle "+H.b(z.gh())},"$3","gL",6,0,1],
R:[function(a,b,c){var z=this.b
a.ac(c,"<subject> tackle<s> <object> to the ground",z)
b.X(z.gi(),new V.ki())
b.X(a.gi(),new V.kj())
return H.b(a.gh())+" tackles "+H.b(z.gh())},"$3","gM",6,0,1],
H:function(a,b){var z=this.b.gaq()?0.2:0
if(a.gN()===!0)return 0.7+z
return 0.5+z},
G:function(a,b){return!a.ga0()&&a.e instanceof K.cd},
v:{
wZ:[function(a){return new V.ke("When an opponent misses you like that, it's a rare (though still dangerous) opportunity to bring them down.",!0,!0,!0,C.c,a,null)},"$1","u3",2,0,4]}},kf:{"^":"a:2;a,b",
$0:function(){return this.a.ai(this.b,"<subject> go<es> wide",!0)}},kg:{"^":"a:2;a,b",
$0:function(){return this.a.b.ai(this.b,"<subject> {evade<s>|sidestep<s>} it",!0)}},kh:{"^":"a:0;",
$1:function(a){a.sah(C.f)
return a}},ki:{"^":"a:0;",
$1:function(a){a.sah(C.f)
return a}},kj:{"^":"a:0;",
$1:function(a){a.sah(C.f)
return a}}}],["","",,S,{"^":"",
c6:function(a,b){var z=new S.dA(null,null,null,null,null)
new S.tA(a,b).$1(z)
return z.q()},
f7:{"^":"af;",
gaG:function(){return[G.u1(),G.u2(),V.u3()]},
gbO:function(){return[$.$get$dZ()]},
gh:function(){return"CounterAttackSituation"},
ay:function(){var z=new S.dA(null,null,null,null,null)
z.m(this)
new S.kc().$1(z)
return z.q()},
b_:function(a,b){if(a===0)return b.T(this.a)
return},
b6:function(a,b){return new H.K(a,new S.kd(this),[H.l(a,0)])}},
tA:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a9().ar(1073741823)
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
pY:{"^":"f7;a,i:b<,c,V:d<",
a2:function(a){var z=new S.dA(null,null,null,null,null)
z.m(this)
a.$1(z)
return z.q()},
A:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof S.f7))return!1
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
gB:function(a){return Y.U(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
k:function(a){return"CounterAttackSituation {counterAttacker="+J.h(this.a)+",\nid="+J.h(this.b)+",\ntarget="+H.b(J.h(this.c))+",\ntime="+J.h(this.d)+",\n}"}},
dA:{"^":"d;a,b,c,d,e",
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
z=new S.pY(y,x,w,v)
if(y==null)H.i(P.m("counterAttacker"))
if(x==null)H.i(P.m("id"))
if(w==null)H.i(P.m("target"))
if(v==null)H.i(P.m("time"))}this.m(z)
return z}}}],["","",,O,{"^":"",c8:{"^":"op;",
gdH:function(){return 1000},
b_:function(a,b){if(a===0)return b.T(this.gcu())
return},
b6:function(a,b){return new H.K(a,new O.ko(this),[H.l(a,0)])}},op:{"^":"af+ni;"},ko:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.e(a.gi(),z.gcO())||J.e(a.gi(),z.gcu())}}}],["","",,U,{"^":"",
bB:function(a){return a.as("FightSituation").gca()},
cc:function(a,b,c,d,e){var z=new U.cb(null,null,null,null,null,null,null,null,null)
new U.rV(a,b,c,d,e).$1(z)
return z.q()},
cT:{"^":"af;",
gaG:function(){return[N.tP(),V.u5(),R.v_(),Y.va(),T.wr(),T.ws(),M.wt(),M.wu(),U.wv(),U.ww(),G.wx(),G.wy(),D.wB(),D.wC(),R.wz(),R.wA(),A.wD(),A.wE(),O.wF(),O.wG(),E.wM(),M.wN(),D.wQ()]},
gbO:function(){return H.p([$.$get$fS(),$.$get$ha(),$.$get$fW(),$.$get$hA()],[Q.ah])},
gdH:function(){return 1000},
gh:function(){return"FightSituation"},
cP:function(a,b){var z=b.a
return(z&&C.a).bt(z,new U.le(a))},
ay:function(){var z=new U.cb(null,null,null,null,null,null,null,null,null)
z.m(this)
new U.lf().$1(z)
return z.q()},
b_:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j
z=X.i4(this.f,this.b)
y=H.bI(z,new U.lg(b),H.y(z,"B",0),null)
x=H.y(y,"B",0)
w=P.P(new H.K(y,new U.lh(),[x]),!1,x)
x=H.l(w,0)
v=P.P(new H.K(w,new U.li(),[x]),!1,x)
u=v.length===1?C.a.gcd(v):null
if(a===0)if(u!=null)return u
for(y=w.length,t=0,s=null,r=0;r<w.length;w.length===y||(0,H.at)(w),++r){q=w[r]
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
if(q.gN()===!0)j*=1.5
if(j>t){s=q
t=j}}return s},
b6:function(a,b){return new H.K(a,new U.ln(this),[H.l(a,0)])},
hl:function(a,b){var z,y
z=this.x
y=this.c.a
if(y.ad(z))y.j(0,z).$2(a,b)},
dI:function(a){var z,y,x,w,v,u,t
z=this.r
if(z!=null&&!this.cP(a,this.b)&&this.cP(a,this.f)){y=a.f5(z)
a.c3(y.gi(),y.a2(new U.lo()))
for(z=this.f,x=z.a,x=new J.bk(x,x.length,0,null,[H.l(x,0)]),w=a.a;x.u();){v=x.d
if(a.T(v).gap()){u=a.T(v)
t=u.a2(new U.lp())
w.a3(0,u)
w.t(0,t)}}C.a.t(a.f,X.mw(z,this.d,this.a,null))}else this.cP(a,this.f)},
df:function(a){var z=this.f
if(this.cP(a,z))if(this.cP(a,this.b)){z=z.a
z=(z&&C.a).bt(z,new U.lq(a))}else z=!1
else z=!1
return z}},
rV:{"^":"a:0;a,b,c,d,e",
$1:function(a){var z,y
z=$.$get$a9().ar(1073741823)
a.gan().f=z
a.gan().y=0
z=a.gan()
y=z.r
if(y==null){y=new S.O(null,null,[P.t])
y.ak()
y.m(C.d)
z.r=y
z=y}else z=y
z.m(J.eT(this.a,new U.rw()))
z=a.gan()
y=z.c
if(y==null){y=new S.O(null,null,[P.t])
y.ak()
y.m(C.d)
z.c=y
z=y}else z=y
y=this.b
z.m(new H.ar(y,new U.rx(),[H.l(y,0),null]))
a.gan().e=this.c
y=new S.O(null,null,[U.ae])
y.ak()
y.m(C.d)
a.gan().b=y
y=this.d.gi()
a.gan().x=y
y=new A.cY(null,null,[P.t,{func:1,v:true,args:[A.a4,Y.a3]}])
y.ci()
y.m(this.e)
a.gan().d=y
return a}},
rw:{"^":"a:0;",
$1:function(a){return a.gi()}},
rx:{"^":"a:0;",
$1:function(a){return a.gi()}},
le:{"^":"a:0;a",
$1:function(a){return this.a.T(a).gap()}},
lf:{"^":"a:0;",
$1:function(a){var z=a.gan().y
if(typeof z!=="number")return z.aj()
a.gan().y=z+1
return a}},
lg:{"^":"a:0;a",
$1:function(a){return this.a.T(a)}},
lh:{"^":"a:0;",
$1:function(a){return a.gap()}},
li:{"^":"a:0;",
$1:function(a){return a.gN()}},
lj:{"^":"a:0;a",
$1:function(a){return J.e(a.gcs(),this.a.gi())&&a.ghG()===!0}},
lk:{"^":"a:2;",
$0:function(){return}},
ll:{"^":"a:0;a",
$1:function(a){return J.e(a.gcs(),this.a.gi())}},
lm:{"^":"a:2;",
$0:function(){return}},
ln:{"^":"a:24;a",
$1:function(a){var z,y,x
if(a.gap()){z=this.a
y=a.gi()
x=z.f.a
if(!(x&&C.a).a7(x,y)){y=a.gi()
z=z.b.a
y=(z&&C.a).a7(z,y)
z=y}else z=!0}else z=!1
return z}},
lo:{"^":"a:0;",
$1:function(a){a.skB(!1)
return a}},
lp:{"^":"a:0;",
$1:function(a){a.sah(C.k)
return a}},
lq:{"^":"a:51;a",
$1:function(a){var z=this.a.T(a)
return z.gN()===!0&&z.gap()}},
q_:{"^":"cT;bn:a<,b,c,ca:d<,i:e<,d0:f<,r,V:x<",
a2:function(a){var z=new U.cb(null,null,null,null,null,null,null,null,null)
z.m(this)
a.$1(z)
return z.q()},
A:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof U.cT))return!1
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
gB:function(a){return Y.U(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)),J.j(this.f)),J.j(this.r)),J.j(this.x)))},
k:function(a){return"FightSituation {droppedItems="+J.h(this.a)+",\nenemyTeamIds="+J.h(this.b)+",\nevents="+J.h(this.c)+",\ngroundMaterial="+J.h(this.d)+",\nid="+J.h(this.e)+",\nplayerTeamIds="+J.h(this.f)+",\nroomRoamingSituationId="+H.b(J.h(this.r))+",\ntime="+J.h(this.x)+",\n}"}},
cb:{"^":"d;a,b,c,d,e,f,r,x,y",
gbn:function(){var z,y
z=this.gan()
y=z.b
if(y==null){y=new S.O(null,null,[U.ae])
y.ak()
y.m(C.d)
z.b=y
z=y}else z=y
return z},
gca:function(){return this.gan().e},
gi:function(){return this.gan().f},
gd0:function(){var z,y
z=this.gan()
y=z.r
if(y==null){y=new S.O(null,null,[P.t])
y.ak()
y.m(C.d)
z.r=y
z=y}else z=y
return z},
gV:function(){return this.gan().y},
gan:function(){var z,y
z=this.a
if(z!=null){z=z.a
if(!(z==null)){y=new S.O(null,null,[H.l(z,0)])
y.ak()
y.m(z)
z=y}this.b=z
z=this.a.b
if(!(z==null)){y=new S.O(null,null,[H.l(z,0)])
y.ak()
y.m(z)
z=y}this.c=z
z=this.a.c
if(!(z==null)){y=new A.cY(null,null,[H.l(z,0),H.l(z,1)])
y.ci()
y.m(z)
z=y}this.d=z
z=this.a
this.e=z.d
this.f=z.e
z=z.f
if(!(z==null)){y=new S.O(null,null,[H.l(z,0)])
y.ak()
y.m(z)
z=y}this.r=z
z=this.a
this.x=z.r
this.y=z.x
this.a=null}return this},
m:function(a){this.a=a},
q:function(){var z,y,x,w,v,u,t,s,r
z=this.a
if(z==null){y=this.gan()
x=y.b
if(x==null){x=new S.O(null,null,[U.ae])
x.ak()
x.m(C.d)
y.b=x
y=x}else y=x
y=y.q()
x=this.gan()
w=x.c
if(w==null){w=new S.O(null,null,[P.t])
w.ak()
w.m(C.d)
x.c=w
x=w}else x=w
x=x.q()
w=this.gan()
v=w.d
if(v==null){v=new A.cY(null,null,[P.t,{func:1,v:true,args:[A.a4,Y.a3]}])
v.ci()
v.m(C.a3)
w.d=v
w=v}else w=v
w=w.q()
v=this.gan().e
u=this.gan().f
t=this.gan()
s=t.r
if(s==null){s=new S.O(null,null,[P.t])
s.ak()
s.m(C.d)
t.r=s
t=s}else t=s
t=t.q()
s=this.gan().x
r=this.gan().y
z=new U.q_(y,x,w,v,u,t,s,r)
if(y==null)H.i(P.m("droppedItems"))
if(x==null)H.i(P.m("enemyTeamIds"))
if(w==null)H.i(P.m("events"))
if(v==null)H.i(P.m("groundMaterial"))
if(u==null)H.i(P.m("id"))
if(t==null)H.i(P.m("playerTeamIds"))
if(s==null)H.i(P.m("roomRoamingSituationId"))
if(r==null)H.i(P.m("time"))}this.m(z)
return z}}}],["","",,N,{"^":"",
bj:function(a,b,c){var z,y
z=b.as("FightSituation")
y=z.gca()
b.c3(z.gi(),z.a2(new N.v0(c)))
if(c.gah()===C.f){c.aD(a,"<subject> stop<s> moving",!0)
a.p(0,"\n\n",!0)
return}switch($.$get$hW().ar(3)){case 0:c.c4(a,"<subject> collapse<s>, dead",!0,!0)
break
case 1:c.aD(a,"<subject> fall<s> backward",!0)
c.aD(a,"<subject> twist<s>",!0)
c.c4(a,"<subject> hit<s> the "+H.b(y)+" face down",!0,!0)
break
case 2:c.aD(a,"<subject> drop<s> to <subject's> knees",!0)
c.aD(a,"<subject> keel<s> over",!0)
break}a.p(0,"\n\n",!0)},
b4:function(a,b){if(J.e(b.gi(),100)&&b.gag()===0){N.rF(a,b)
return}b.aD(a,"<subject> {scream|yell|grunt}<s> in pain",!0)},
rF:function(a,b){if(b.gah()===C.f){b.aD(a,"<subject> stop<s> moving",!0)
a.p(0,"\n\n",!0)
return}b.aD(a,"<subject> drop<s> to <subject's> knees",!0)
b.aD(a,"<subject> keel<s> over",!0)
a.p(0,"\n\n",!0)},
v0:{"^":"a:0;a",
$1:function(a){var z=this.a
if(!z.gaz())a.gbn().t(0,z.e)
if(z.d!=null)a.gbn().t(0,z.d)
return a}}}],["","",,R,{"^":"",lt:{"^":"z;I:c<,J:d<,a1:e<,O:f<,K:r<,b,a",
gh:function(){return"FinishLeap"},
ga6:function(){return""},
gaf:function(){return"(WARNING should not be user-visible)"},
P:[function(a,b,c){throw H.c(new P.Y(null))},"$3","gL",6,0,1],
R:[function(a,b,c){var z,y,x,w,v
z=this.b
b.X(z.gi(),new R.lu())
y=b.T(z.gi())
b.X(a.gi(),new R.lv())
x=b.as("LeapSituation").gi()
w=U.bB(b)
a.bS(c,"<subject> {ram<s>|smash<es>} into <object>",x,z,!0)
c.jk(0,"both "+(a.gN()===!0||z.gN()===!0?"of you":"")+" {land on|fall to} the "+H.b(w),x)
v=z.gag()
if(typeof v!=="number")return v.bk()
if(v>1){c.jl(0,"the impact almost {knocks <object> unconscious|knocks <object> out}",x,z)
N.b4(c,y)
b.X(z.gi(),new R.lw())}return H.b(a.gh())+" finishes leap at "+H.b(z.gh())},"$3","gM",6,0,1],
H:function(a,b){return 1},
G:function(a,b){return!0},
v:{
x7:[function(a){return new R.lt(null,!0,!0,!0,C.c,a,null)},"$1","uh",2,0,4]}},lu:{"^":"a:0;",
$1:function(a){a.sah(C.f)
return a}},lv:{"^":"a:0;",
$1:function(a){a.sah(C.f)
return a}},lw:{"^":"a:0;",
$1:function(a){var z=a.gag()
if(typeof z!=="number")return z.at()
a.sag(z-1)
return a}}}],["","",,S,{"^":"",kA:{"^":"z;I:c<,J:d<,a1:e<,O:f<,K:r<,b,a",
ga6:function(){return"dodge"},
gh:function(){return"DodgeLeap"},
gaf:function(){return"will <subject> dodge?"},
P:[function(a,b,c){var z=b.as("LeapSituation").gi()
a.hu(c,"<subject> tr<ies> to {dodge|sidestep}",z,!0)
if(a.gaq())a.c5(c,"<subject> <is> out of balance",z,!0,!0)
else S.a7(new S.kB(a,c,z),new S.kC(a,c,z),null,null)
b.aA()
return H.b(a.db)+" fails to dodge "+H.b(this.b.gh())},"$3","gL",6,0,1],
R:[function(a,b,c){var z,y,x
z=b.as("LeapSituation").gi()
y=U.bB(b)
x=this.b
a.bS(c,"<subject> {dodge<s>|sidestep<s>} <object>",z,x,!0)
x.aD(c,"<subject> {crash<es> to|fall<s> to|hit<s>} the "+H.b(y),!0)
b.X(x.gi(),new S.kD())
b.aX("FightSituation")
return H.b(a.gh())+" dodges "+H.b(x.gh())},"$3","gM",6,0,1],
H:function(a,b){var z,y,x
z=a.ga4()?0:0.2
y=this.b.ga0()?0.2:0
if(a.ch===!0)return 0.8-z+y
x=b.f
return(x.length!==0?C.a.gw(x):null).gb5().b4(0.5-z+y)},
G:function(a,b){return!a.ga0()},
v:{
x1:[function(a){return new S.kA("Dodging means moving your body out of harm's way. When successful, your opponent will miss and will hit the ground beside you.",!1,!1,!0,C.c,a,null)},"$1","u6",2,0,4]}},kB:{"^":"a:2;a,b,c",
$0:function(){return this.a.c5(this.b,"<subject> {can't|fail<s>|<does>n't succeed}",this.c,!0,!0)}},kC:{"^":"a:2;a,b,c",
$0:function(){return this.a.c5(this.b,"<subject> {<is> too slow|<is>n't fast enough}",this.c,!0,!0)}},kD:{"^":"a:0;",
$1:function(a){a.sah(C.f)
return a}}}],["","",,D,{"^":"",lQ:{"^":"z;I:c<,J:d<,a1:e<,O:f<,K:r<,b,a",
ga6:function(){return"impale"},
gh:function(){return"ImpaleLeaper"},
gaf:function(){return"will <subject> impale <objectPronoun>?"},
P:[function(a,b,c){var z,y
z=b.as("LeapSituation").gi()
y=this.b
a.dN(c,"<subject> tr<ies> to {move|swing|shift} "+H.b(U.ab(a))+" between <subjectPronounSelf> and <object>",z,!0,y)
if(a.gaq())a.c5(c,"<subject> <is> out of balance",z,!0,!0)
else S.a7(new D.lR(a,c,z),new D.lS(a,c,z),null,null)
b.aA()
return H.b(a.db)+" fails to impale "+H.b(y.gh())},"$3","gL",6,0,1],
R:[function(a,b,c){var z,y,x
z=b.as("LeapSituation").gi()
y=this.b
a.bS(c,"<subject> {move<s>|swing<s>|shift<s>} "+H.b(U.ab(a))+" between <subjectPronounSelf> and <object>",z,y,!0)
y.aD(c,"<subject> {leap<s>|run<s>|lunge<s>} right into it",!0)
b.X(y.gi(),new D.lT())
x=b.T(y.gi())
if(!(!x.gaH()&&x.gi()!==100)){a.gS().ac(c,"<subject> {cut<s> into|pierce<s>|go<es> into} <object's> flesh",x)
x.a8(c,"<subject> fall<s> to the ground")
N.b4(c,x)}else{a.gS().ac(c,"<subject> {go<es> right through|completely impale<s>|bore<s> through} <object's> {body|chest|stomach|neck}",x)
x.aD(c,"<subject> go<es> down",!0)
N.bj(c,b,x)}b.aX("FightSituation")
return H.b(a.gh())+" impales "+H.b(y.gh())},"$3","gM",6,0,1],
H:function(a,b){var z,y,x
z=a.ga4()?0:0.2
y=this.b.ga0()?0.2:0
if(a.ch===!0)return 0.5-z+y
x=b.f
return(x.length!==0?C.a.gw(x):null).gb5().b4(0.4-z+y)},
G:function(a,b){return!a.ga0()&&a.e.geP()},
v:{
xd:[function(a){return new D.lQ("You can move your weapon to point at the attacker. If successful, the weapon will pierce the attacker with the force of his own leap.",!1,!1,!0,C.c,a,null)},"$1","uS",2,0,4]}},lR:{"^":"a:2;a,b,c",
$0:function(){return this.a.c5(this.b,"<subject> {can't|fail<s>|<does>n't succeed}",this.c,!0,!0)}},lS:{"^":"a:2;a,b,c",
$0:function(){return this.a.c5(this.b,"<subject> {<is> too slow|<is>n't fast enough}",this.c,!0,!0)}},lT:{"^":"a:0;",
$1:function(a){var z=a.gag()
if(typeof z!=="number")return z.at()
a.sag(z-1)
a.sah(C.f)
return a}}}],["","",,V,{"^":"",
dM:function(a,b,c){var z=new V.dL(null,null,null,null,null,null)
new V.tF(a,b,c).$1(z)
return z.q()},
fq:{"^":"c8;",
gaG:function(){return[S.u6(),D.uS()]},
gh:function(){return"LeapDefenseSituation"},
ay:function(){var z=new V.dL(null,null,null,null,null,null)
z.m(this)
new V.mk().$1(z)
return z.q()}},
tF:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$a9().ar(1073741823)
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
q1:{"^":"fq;cO:a<,i:b<,cr:c<,cu:d<,V:e<",
a2:function(a){var z=new V.dL(null,null,null,null,null,null)
z.m(this)
a.$1(z)
return z.q()},
A:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof V.fq))return!1
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
gB:function(a){return Y.U(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)))},
k:function(a){return"LeapDefenseSituation {attacker="+H.b(J.h(this.a))+",\nid="+J.h(this.b)+",\npredeterminedResult="+J.h(this.c)+",\ntarget="+H.b(J.h(this.d))+",\ntime="+J.h(this.e)+",\n}"}},
dL:{"^":"d;a,b,c,d,e,f",
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
z=new V.q1(y,x,w,v,u)
if(y==null)H.i(P.m("attacker"))
if(x==null)H.i(P.m("id"))
if(w==null)H.i(P.m("predeterminedResult"))
if(v==null)H.i(P.m("target"))
if(u==null)H.i(P.m("time"))}this.m(z)
return z}}}],["","",,F,{"^":"",
fs:function(a,b){var z=new F.dN(null,null,null,null,null)
new F.tG(a,b).$1(z)
return z.q()},
fr:{"^":"af;",
gaG:function(){return[R.uh()]},
gh:function(){return"LeapSituation"},
ay:function(){var z=new F.dN(null,null,null,null,null)
z.m(this)
new F.ml().$1(z)
return z.q()},
b_:function(a,b){if(a===0)return b.T(this.a)
return},
b6:function(a,b){return new H.K(a,new F.mm(this),[H.l(a,0)])}},
tG:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a9().ar(1073741823)
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
q2:{"^":"fr;a,i:b<,c,V:d<",
a2:function(a){var z=new F.dN(null,null,null,null,null)
z.m(this)
a.$1(z)
return z.q()},
A:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof F.fr))return!1
if(J.e(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y)if(J.e(this.c,b.c)){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1}else z=!1
return z},
gB:function(a){return Y.U(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
k:function(a){return"LeapSituation {attacker="+H.b(J.h(this.a))+",\nid="+J.h(this.b)+",\ntarget="+H.b(J.h(this.c))+",\ntime="+J.h(this.d)+",\n}"}},
dN:{"^":"d;a,b,c,d,e",
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
z=new F.q2(y,x,w,v)
if(y==null)H.i(P.m("attacker"))
if(x==null)H.i(P.m("id"))
if(w==null)H.i(P.m("target"))
if(v==null)H.i(P.m("time"))}this.m(z)
return z}}}],["","",,Z,{"^":"",jC:{"^":"ah;J:b<,a1:c<,O:d<,K:e<,a",
gW:function(){return""},
gI:function(){return},
gh:function(){return"AutoLoot"},
P:[function(a,b,c){throw H.c(new P.Y(null))},"$3","gL",6,0,1],
R:[function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j
z=b.as("LootSituation")
y=b.T(100)
if(y.gc2()===!0&&!y.gaH()){a.ac(c,"<subject> kneel<s> next to <object>",y)
a.ac(c,"<subject> help<s> <object> to <object's> feet",y)
y.aL(c,'"I\'ll live," <subject> say<s>.',!0)
b.X(100,new Z.jP())}x=[]
for(w=z.gbn(),w=w.ga_(w),v=b.a,u=null,t=null;w.u();){s=w.d
r=b.T(a.gi())
q=r.gS() instanceof Z.al&&s instanceof G.aH
p=J.o(s)
if(!!p.$isaS){o=s.gbJ()
n=s.gbA()
m=s.gaK()?1:0
l=r.gS().gae()
if(typeof l!=="number")return H.x(l)
o=2+o+n+m>l||q}else o=!1
if(o){k=b.T(a.gi())
j=k.a2(new Z.jQ(s,r))
v.a3(0,k)
v.t(0,j)
u=s}else if(!!p.$isbr&&r.gal()==null){k=b.T(a.gi())
j=k.a2(new Z.jR(s))
v.a3(0,k)
v.t(0,j)
t=s}else{k=b.T(a.gi())
j=k.a2(new Z.jS(s))
v.a3(0,k)
v.t(0,j)
x.push(s)}}if(u!=null){a.ac(c,"<subject> pick<s> up <object>",u)
a.ac(c,"<subject> wield<s> <object>",u)}if(t!=null){a.ac(c,"<subject> pick<s> up <object>",t)
a.ac(c,"<subject> wield<s> <object>",t)}this.iD(x,a,z,b,c)
this.iC(x,a,z,b,c)
if(x.length!==0)c.jr("<subject> <also> take<s>",x,null,a)
return H.b(a.gh())+" auto-loots"},"$3","gM",6,0,1],
ab:function(a,b){return"WARNING this shouldn't be user-visible"},
H:function(a,b){return 1},
G:function(a,b){return a.gN()},
iD:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q
z=P.P(new H.K(a,new Z.jJ(),[H.l(a,0)]),!0,L.aS)
for(y=b.gaC(),y=y.ga_(y);y.u();){x=y.d
if(x instanceof L.aS)C.a.t(z,x)}if(z.length===0)return
C.a.ce(z,new Z.jK())
w=c.gd0().aJ(0,new Z.jL(d)).di(0,new Z.jM())
for(y=J.aj(w.a),v=new H.bT(y,w.b,[H.l(w,0)]),u=d.a;v.u();){t=y.gU()
if(z.length===0)break
s=C.a.hs(z)
r=d.T(t.gi())
q=r.a2(new Z.jN(s))
u.a3(0,r)
u.t(0,q)
C.a.a3(a,s)
r=d.T(b.gi())
q=r.a2(new Z.jO(s))
u.a3(0,r)
u.t(0,q)
b.ac(e,"<subject> give<s> the "+H.b(s.gh())+" to <object>",t)}},
iC:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q
z=P.P(new H.K(a,new Z.jD(),[H.l(a,0)]),!0,E.br)
for(y=b.gaC(),y=y.ga_(y);y.u();){x=y.d
if(x instanceof E.br)C.a.t(z,x)}if(z.length===0)return
C.a.ce(z,new Z.jE())
w=c.gd0().aJ(0,new Z.jF(d)).di(0,new Z.jG())
for(y=J.aj(w.a),v=new H.bT(y,w.b,[H.l(w,0)]),u=d.a;v.u();){t=y.gU()
if(z.length===0)break
s=C.a.hs(z)
r=d.T(t.gi())
q=r.a2(new Z.jH(s))
u.a3(0,r)
u.t(0,q)
C.a.a3(a,s)
r=d.T(b.gi())
q=r.a2(new Z.jI(s))
u.a3(0,r)
u.t(0,q)
b.ac(e,"<subject> give<s> the "+H.b(s.gh())+" to <object>",t)}}},jP:{"^":"a:0;",
$1:function(a){a.sah(C.h)
a.sag(1)
return a}},jQ:{"^":"a:0;a,b",
$1:function(a){var z=this.b
if(!(z.gS() instanceof K.cd))a.gaC().t(0,z.gS())
a.sS(this.a)}},jR:{"^":"a:0;a",
$1:function(a){var z=this.a
a.sal(z)
return z}},jS:{"^":"a:0;a",
$1:function(a){a.gaC().t(0,this.a)
return a}},jJ:{"^":"a:0;",
$1:function(a){return a instanceof L.aS}},jK:{"^":"a:6;",
$2:function(a,b){return J.bE(a.gae(),b.gae())}},jL:{"^":"a:0;a",
$1:function(a){return this.a.T(a)}},jM:{"^":"a:0;",
$1:function(a){return a.gap()&&a.gaz()}},jN:{"^":"a:0;a",
$1:function(a){a.sS(this.a)
return a}},jO:{"^":"a:0;a",
$1:function(a){a.gaC().a3(0,this.a)
return a}},jD:{"^":"a:0;",
$1:function(a){return a instanceof E.br}},jE:{"^":"a:6;",
$2:function(a,b){return J.bE(a.gae(),b.gae())}},jF:{"^":"a:0;a",
$1:function(a){return this.a.T(a)}},jG:{"^":"a:0;",
$1:function(a){return a.gap()&&a.gal()==null}},jH:{"^":"a:0;a",
$1:function(a){a.sal(this.a)
return a}},jI:{"^":"a:0;a",
$1:function(a){a.gaC().a3(0,this.a)
return a}}}],["","",,X,{"^":"",
mw:function(a,b,c,d){var z=new X.dR(null,null,null,null,null,null)
new X.rW(a,b,c).$1(z)
return z.q()},
fx:{"^":"af;",
gbO:function(){return H.p([$.$get$eY()],[Q.ah])},
gh:function(){return"LootSituation"},
ay:function(){var z=new X.dR(null,null,null,null,null,null)
z.m(this)
new X.my().$1(z)
return z.q()},
b_:function(a,b){if(typeof a!=="number")return a.bk()
if(a>0)return
return this.fv(b.a)},
b6:function(a,b){return[this.fv(a)]},
df:function(a){return!0},
fv:function(a){return a.cl(0,new X.mx())}},
rW:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$a9().ar(1073741823)
a.gaw().e=z
a.gaw().f=0
a.gaw().c=this.b
z=new S.O(null,null,[P.t])
z.ak()
z.m(this.a)
a.gaw().d=z
z=new S.O(null,null,[U.ae])
z.ak()
z.m(this.c)
a.gaw().b=z
return a}},
my:{"^":"a:0;",
$1:function(a){var z=a.gaw().f
if(typeof z!=="number")return z.aj()
a.gaw().f=z+1
return a}},
mx:{"^":"a:0;",
$1:function(a){return a.gN()===!0&&a.gap()}},
q3:{"^":"fx;bn:a<,ca:b<,d0:c<,i:d<,V:e<",
a2:function(a){var z=new X.dR(null,null,null,null,null,null)
z.m(this)
a.$1(z)
return z.q()},
A:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof X.fx))return!1
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
gB:function(a){return Y.U(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)))},
k:function(a){return"LootSituation {droppedItems="+J.h(this.a)+",\ngroundMaterial="+J.h(this.b)+",\nplayerTeamIds="+J.h(this.c)+",\nid="+J.h(this.d)+",\ntime="+J.h(this.e)+",\n}"}},
dR:{"^":"d;a,b,c,d,e,f",
gbn:function(){var z,y
z=this.gaw()
y=z.b
if(y==null){y=new S.O(null,null,[U.ae])
y.ak()
y.m(C.d)
z.b=y
z=y}else z=y
return z},
gca:function(){return this.gaw().c},
gd0:function(){var z,y
z=this.gaw()
y=z.d
if(y==null){y=new S.O(null,null,[P.t])
y.ak()
y.m(C.d)
z.d=y
z=y}else z=y
return z},
gi:function(){return this.gaw().e},
gV:function(){return this.gaw().f},
gaw:function(){var z,y
z=this.a
if(z!=null){z=z.a
if(!(z==null)){y=new S.O(null,null,[H.l(z,0)])
y.ak()
y.m(z)
z=y}this.b=z
z=this.a
this.c=z.b
z=z.c
if(!(z==null)){y=new S.O(null,null,[H.l(z,0)])
y.ak()
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
if(x==null){x=new S.O(null,null,[U.ae])
x.ak()
x.m(C.d)
y.b=x
y=x}else y=x
y=y.q()
x=this.gaw().c
w=this.gaw()
v=w.d
if(v==null){v=new S.O(null,null,[P.t])
v.ak()
v.m(C.d)
w.d=v
w=v}else w=v
w=w.q()
v=this.gaw().e
u=this.gaw().f
z=new X.q3(y,x,w,v,u)
if(y==null)H.i(P.m("droppedItems"))
if(x==null)H.i(P.m("groundMaterial"))
if(w==null)H.i(P.m("playerTeamIds"))
if(v==null)H.i(P.m("id"))
if(u==null)H.i(P.m("time"))}this.m(z)
return z}}}],["","",,A,{"^":"",mM:{"^":"z;I:c<,J:d<,a1:e<,O:f<,K:r<,b,a",
ga6:function(){return"stab <object>"},
gh:function(){return"OffBalanceOpportunityThrust"},
gaf:function(){return"will <subject> hit <objectPronoun>?"},
P:[function(a,b,c){var z=this.b
a.ac(c,"<subject> tr<ies> to stab <object>",z)
a.ai(c,"<subject> {go<es> wide|fail<s>|miss<es>}",!0)
return H.b(a.gh())+" fails to stab "+H.b(z.gh())},"$3","gL",6,0,1],
R:[function(a,b,c){var z,y
z=this.b
b.X(z.gi(),new A.mN(a))
y=b.T(z.gi())
if(!(!y.gaH()&&y.gi()!==100)){a.bp(c,"<subject> thrust<s> {|"+H.b(U.ab(a))+"} deep into <object's> {shoulder|hip|thigh}",y,!0)
N.b4(c,y)}else{a.bp(c,"<subject> {stab<s>|run<s> "+H.b(U.ab(a))+" through} <object>",y,!0)
N.bj(c,b,y)}return H.b(a.gh())+" stabs "+H.b(z.gh())},"$3","gM",6,0,1],
H:function(a,b){if(a.gN()===!0)return 0.6
return 0.5},
G:function(a,b){return a.ga4()&&this.b.gaq()&&a.e.geP()},
v:{
xi:[function(a){return new A.mM("When an opponent is out of balance they are the most vulnerable.",!0,!0,!0,C.c,a,null)},"$1","v4",2,0,4]}},mN:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gag()
y=this.a.gS().gbA()
if(typeof z!=="number")return z.at()
a.sag(z-y)
return a}}}],["","",,U,{"^":"",
mI:function(a,b){var z=new U.dU(null,null,null,null,null)
new U.tJ(a,b).$1(z)
return z.q()},
fD:{"^":"af;",
gaG:function(){return H.p([A.v4()],[{func:1,ret:Q.z,args:[R.A]}])},
gbO:function(){return[$.$get$dZ()]},
gh:function(){return"OffBalanceOpportunitySituation"},
ay:function(){var z=new U.dU(null,null,null,null,null)
z.m(this)
new U.mJ().$1(z)
return z.q()},
b_:function(a,b){var z,y,x,w,v
if(typeof a!=="number")return a.bk()
if(a>0)return
z=b.T(this.a)
y=b.a
x=H.l(y,0)
w=P.P(new H.K(y,new U.mK(this,b,z),[x]),!0,x)
if(w.length===0)return
v=C.a.geK(w)
if(v.ga4()&&z.gaq()&&v.e.geP())return v
return},
b6:function(a,b){return new H.K(a,new U.mL(b,b.T(this.a)),[H.l(a,0)])}},
tJ:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a9().ar(1073741823)
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
if(a.gap())if(a.eM(this.c,this.b)){z=a.y
y=this.a.b
y=z==null?y!=null:z!==y
z=y}else z=!1
else z=!1
return z}},
mL:{"^":"a:0;a,b",
$1:function(a){var z=this.b
return J.e(a,z)||a.eM(z,this.a)}},
q4:{"^":"fD;a,b,i:c<,V:d<",
a2:function(a){var z=new U.dU(null,null,null,null,null)
z.m(this)
a.$1(z)
return z.q()},
A:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof U.fD))return!1
if(J.e(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
if(z==null?y==null:z===y){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1}else z=!1
return z},
gB:function(a){return Y.U(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
k:function(a){return"OffBalanceOpportunitySituation {actorId="+H.b(J.h(this.a))+",\nculpritId="+J.h(this.b)+",\nid="+J.h(this.c)+",\ntime="+J.h(this.d)+",\n}"}},
dU:{"^":"d;a,b,c,d,e",
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
z=new U.q4(y,x,w,v)
if(y==null)H.i(P.m("actorId"))
if(w==null)H.i(P.m("id"))
if(v==null)H.i(P.m("time"))}this.m(z)
return z}}}],["","",,O,{"^":"",lx:{"^":"z;I:c<,J:d<,a1:e<,O:f<,b,a",
ga6:function(){return""},
gh:function(){return"FinishPunch"},
gK:function(){return},
gaf:function(){return"(WARNING should not be user-visible)"},
P:[function(a,b,c){throw H.c(new P.Y(null))},"$3","gL",6,0,1],
R:[function(a,b,c){var z,y,x,w
z=this.b
y=z.ga4()?C.h:C.f
x=b.as("PunchSituation").gi()
w=U.bB(b)
b.X(z.y,new O.ly(y))
switch(y){case C.k:throw H.c(new P.w("Enemy's pose should never be 'standing' after a successful punch"))
case C.h:c.fR(0,"<subject> {punch<es> <object> in the {face|nose|eye|jaw}|punch<es> <object's> {face|nose|eye|jaw}}",x,z,!0,a)
z.aD(c,"<subject> {stagger<s>|stumble<s>} off balance",!0)
break
case C.f:c.fR(0,"<subject> send<s> <object> to the "+H.b(w)+" with a {massive punch|well-placed fist} to the {face|nose|eye|jaw}",x,z,!0,a)
break}return H.b(a.gh())+" punches "+H.b(z.db)+" to "+y.k(0)},"$3","gM",6,0,1],
H:function(a,b){return 1},
G:function(a,b){return!0},
v:{
x8:[function(a){return new O.lx(null,!0,!0,!1,a,null)},"$1","ui",2,0,4]}},ly:{"^":"a:0;a",
$1:function(a){a.sah(this.a)
return a}}}],["","",,E,{"^":"",kE:{"^":"z;I:c<,J:d<,a1:e<,O:f<,K:r<,b,a",
ga6:function(){return"dodge"},
gh:function(){return"DodgePunch"},
gaf:function(){return"will <subject> dodge the fist?"},
P:[function(a,b,c){var z=b.as("PunchSituation").gi()
a.hu(c,"<subject> tr<ies> to {dodge|sidestep|move out of the way}",z,!0)
S.a7(new E.kF(a,c,z),new E.kG(this,a,c,z),null,null)
b.aA()
return H.b(a.gh())+" fails to dodge "+H.b(this.b.gh())},"$3","gL",6,0,1],
R:[function(a,b,c){var z=this.b
a.bS(c,"<subject> {dodge<s>|sidestep<s>} <object's> {punch|blow|jab}",b.as("PunchSituation").gi(),z,!0)
b.aX("FightSituation")
if(a.gN()===!0)c.t(0,"this opens an opportunity for a counter attack")
C.a.t(b.f,S.c6(a,z))
return H.b(a.gh())+" dodges punch from "+H.b(z.gh())},"$3","gM",6,0,1],
H:function(a,b){var z,y
z=a.ga4()?0:0.2
if(a.ch===!0)return 0.7-z
y=b.f
return(y.length!==0?C.a.gw(y):null).gb5().b4(0.4-z)},
G:function(a,b){return!0},
v:{
x2:[function(a){return new E.kE("Dodging means moving your body out of harm's way.",!1,!1,!0,C.c,a,null)},"$1","u7",2,0,4]}},kF:{"^":"a:2;a,b,c",
$0:function(){return this.a.c5(this.b,"<subject> {can't|fail<s>|<does>n't succeed}",this.c,!0,!0)}},kG:{"^":"a:2;a,b,c,d",
$0:function(){return this.a.b.kW(this.c,"<subject> <is> too quick for <object>",this.d,!0,!0,this.b)}}}],["","",,Z,{"^":"",
e4:function(a,b,c){var z=new Z.e3(null,null,null,null,null,null)
new Z.tD(a,b,c).$1(z)
return z.q()},
fN:{"^":"c8;",
gaG:function(){return[E.u7()]},
gh:function(){return"PunchDefenseSituation"},
ay:function(){var z=new Z.e3(null,null,null,null,null,null)
z.m(this)
new Z.ns().$1(z)
return z.q()}},
tD:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$a9().ar(1073741823)
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
q7:{"^":"fN;cO:a<,i:b<,cr:c<,cu:d<,V:e<",
a2:function(a){var z=new Z.e3(null,null,null,null,null,null)
z.m(this)
a.$1(z)
return z.q()},
A:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof Z.fN))return!1
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
gB:function(a){return Y.U(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)))},
k:function(a){return"PunchDefenseSituation {attacker="+H.b(J.h(this.a))+",\nid="+J.h(this.b)+",\npredeterminedResult="+J.h(this.c)+",\ntarget="+H.b(J.h(this.d))+",\ntime="+J.h(this.e)+",\n}"}},
e3:{"^":"d;a,b,c,d,e,f",
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
z=new Z.q7(y,x,w,v,u)
if(y==null)H.i(P.m("attacker"))
if(x==null)H.i(P.m("id"))
if(w==null)H.i(P.m("predeterminedResult"))
if(v==null)H.i(P.m("target"))
if(u==null)H.i(P.m("time"))}this.m(z)
return z}}}],["","",,Q,{"^":"",
fP:function(a,b){var z=new Q.e5(null,null,null,null,null)
new Q.tE(a,b).$1(z)
return z.q()},
fO:{"^":"af;",
gaG:function(){return[O.ui()]},
gh:function(){return"PunchSituation"},
ay:function(){var z=new Q.e5(null,null,null,null,null)
z.m(this)
new Q.nt().$1(z)
return z.q()},
b_:function(a,b){if(a===0)return b.T(this.a)
return},
b6:function(a,b){return new H.K(a,new Q.nu(this),[H.l(a,0)])}},
tE:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a9().ar(1073741823)
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
q8:{"^":"fO;a,i:b<,c,V:d<",
a2:function(a){var z=new Q.e5(null,null,null,null,null)
z.m(this)
a.$1(z)
return z.q()},
A:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof Q.fO))return!1
if(J.e(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y)if(J.e(this.c,b.c)){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1}else z=!1
return z},
gB:function(a){return Y.U(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
k:function(a){return"PunchSituation {attacker="+H.b(J.h(this.a))+",\nid="+J.h(this.b)+",\ntarget="+H.b(J.h(this.c))+",\ntime="+J.h(this.d)+",\n}"}},
e5:{"^":"d;a,b,c,d,e",
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
z=new Q.q8(y,x,w,v)
if(y==null)H.i(P.m("attacker"))
if(x==null)H.i(P.m("id"))
if(w==null)H.i(P.m("target"))
if(v==null)H.i(P.m("time"))}this.m(z)
return z}}}],["","",,O,{"^":"",lz:{"^":"z;I:c<,J:d<,a1:e<,O:f<,K:r<,b,a",
ga6:function(){return""},
gh:function(){return"FinishSlash"},
gaf:function(){return"(WARNING should not be user-visible)"},
P:[function(a,b,c){throw H.c(new P.Y(null))},"$3","gL",6,0,1],
R:[function(a,b,c){var z,y,x,w,v
z=this.b
b.X(z.gi(),new O.lC(a))
y=b.T(z.gi())
x=b.as("SlashSituation").gi()
w=!y.gaH()&&y.gi()!==100
if(!w){a.bS(c,"<subject> {slash<es>|cut<s>} <object's> {shoulder|abdomen|thigh}",x,y,!0)
N.b4(c,y)}else{a.bS(c,"<subject> {slash<es>|cut<s>} {across|through} <object's> {neck|abdomen|lower body}",x,y,!0)
if(J.e(a.gS().gh(),$.$get$cB().b)&&J.dt(z.gh(),"orc")===!0)a.e.aL(c,"<subject> slit<s> through the flesh like it isn't there.",!0)
N.bj(c,b,y)}v=H.b(a.gh())+" slashes"
return v+(w?" (and kills)":"")+" "+H.b(z.gh())},"$3","gM",6,0,1],
H:function(a,b){return 1},
G:function(a,b){return a.gS().gaV()},
v:{
xa:[function(a){return new O.lz(null,!0,!0,!0,C.c,a,null)},"$1","uj",2,0,4]}},lC:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gag()
y=this.a.gS().gbJ()
if(typeof z!=="number")return z.at()
a.sag(z-y)
return a}}}],["","",,V,{"^":"",lD:{"^":"z;I:c<,J:d<,a1:e<,O:f<,K:r<,b,a",
ga6:function(){return""},
gh:function(){return"FinishThrustSpear"},
gaf:function(){return"(WARNING should not be user-visible)"},
P:[function(a,b,c){throw H.c(new P.Y(null))},"$3","gL",6,0,1],
R:[function(a,b,c){var z,y,x,w,v
z=this.b
b.X(z.gi(),new V.lG(a))
y=b.T(z.gi())
x=b.as("SlashSituation").gi()
w=!y.gaH()&&y.gi()!==100
if(!w){a.bS(c,"<subject> {pierce<s>|stab<s>|bore<s> through} <object's> {shoulder|abdomen|thigh}",x,y,!0)
N.b4(c,y)}else{a.bS(c,"<subject> {pierce<s>|stab<s>|bore<s> through|impale<s>} <object's> {neck|chest|heart}",x,y,!0)
N.bj(c,b,y)}v=H.b(a.gh())+" pierces"
return v+(w?" (and kills)":"")+" "+H.b(z.gh())},"$3","gM",6,0,1],
H:function(a,b){return 1},
G:function(a,b){return a.gS() instanceof Z.al},
v:{
xc:[function(a){return new V.lD(null,!0,!0,!0,C.c,a,null)},"$1","ul",2,0,4]}},lG:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gag()
y=this.a.gS().gbA()
if(typeof z!=="number")return z.at()
a.sag(z-y)
return a}}}],["","",,X,{"^":"",kp:{"^":"z;I:c<,J:d<,a1:e<,O:f<,K:r<,b,a",
ga6:function(){return"step back and parry"},
gh:function(){return"DefensiveParrySlash"},
gaf:function(){return"will <subject> parry it?"},
P:[function(a,b,c){a.a8(c,"<subject> tr<ies> to {parry|deflect it|meet it with "+H.b(U.ab(a))+"|fend it off}")
if(a.gaq())a.ai(c,"<subject> <is> out of balance",!0)
else S.a7(new X.kq(a,c),new X.kr(this,a,c),null,null)
b.aA()
return H.b(a.db)+" fails to parry "+H.b(this.b.gh())},"$3","gL",6,0,1],
R:[function(a,b,c){if(a.gN()===!0)a.a8(c,"<subject> {step<s>|take<s> a step} back")
a.bi(c,"<subject> {parr<ies> it|deflect<s> it|meet<s> it with "+H.b(U.ab(a))+"|fend<s> it off}",!0)
if(!a.ga4()){b.X(a.y,new X.ks())
if(a.ch===!0)a.a8(c,"<subject> regain<s> balance")}b.aX("FightSituation")
return H.b(a.db)+" steps back and parries "+H.b(this.b.gh())},"$3","gM",6,0,1],
H:function(a,b){var z,y,x
if(a.gN()===!0)return 1
z=b.f
y=z.length!==0?C.a.gw(z):null
x=a.ga4()?0:0.2
return y.gb5().b4(0.5-x)},
G:function(a,b){return a.gS().gcj()},
v:{
x_:[function(a){return new X.kp("Stepping back is the safest way to get out of harm's way.",!1,!1,!0,C.c,a,null)},"$1","u4",2,0,4]}},kq:{"^":"a:2;a,b",
$0:function(){return this.a.ai(this.b,"<subject> {fail<s>|<does>n't succeed}",!0)}},kr:{"^":"a:2;a,b,c",
$0:function(){return this.a.b.bR(this.c,"<subject> <is> too quick for <object>",!0,this.b)}},ks:{"^":"a:0;",
$1:function(a){a.sah(C.k)
return a}}}],["","",,F,{"^":"",kH:{"^":"z;I:c<,J:d<,a1:e<,O:f<,K:r<,b,a",
gh:function(){return"DodgeSlash"},
ga6:function(){return"dodge and counter"},
gaf:function(){return"will <subject> dodge?"},
P:[function(a,b,c){a.a8(c,"<subject> tr<ies> to {dodge|sidestep}")
if(a.gaq())a.ai(c,"<subject> <is> out of balance",!0)
else S.a7(new F.kI(a,c),new F.kJ(this,a,c),null,null)
b.aA()
return H.b(a.db)+" fails to dodge "+H.b(this.b.gh())},"$3","gL",6,0,1],
R:[function(a,b,c){var z=this.b
a.bp(c,"<subject> {dodge<s>|sidestep<s>} it",z,!0)
if(z.ga4()){z.c4(c,"<subject> lose<s> balance because of that",!0,!0)
b.X(z.y,new F.kK())}b.aX("FightSituation")
if(a.gN()===!0)c.t(0,"this opens an opportunity for a counter attack")
C.a.t(b.f,S.c6(a,z))
return H.b(a.gh())+" dodges "+H.b(z.db)},"$3","gM",6,0,1],
H:function(a,b){var z,y
z=a.ga4()?0:0.2
if(a.ch===!0)return 0.7-z
y=b.f
return(y.length!==0?C.a.gw(y):null).gb5().b4(0.4-z)},
G:function(a,b){return!a.ga0()&&this.b.gS().gaV()},
v:{
x3:[function(a){return new F.kH("Dodging means moving your body out of harm's way. When done correctly, it will throw your opponent off balance and it will open an opportunity for a counter attack. When botched, it can get you killed.",!1,!1,!0,C.c,a,null)},"$1","u8",2,0,4]}},kI:{"^":"a:2;a,b",
$0:function(){return this.a.ai(this.b,"<subject> {can't|fail<s>|<does>n't succeed}",!0)}},kJ:{"^":"a:2;a,b,c",
$0:function(){return this.a.b.bR(this.c,"<subject> <is> too quick for <object>",!0,this.b)}},kK:{"^":"a:0;",
$1:function(a){a.sah(C.h)
return C.h}}}],["","",,M,{"^":"",kL:{"^":"z;I:c<,J:d<,a1:e<,O:f<,K:r<,b,a",
ga6:function(){return"dodge and counter"},
gh:function(){return"DodgeThrustSpear"},
gaf:function(){return"will <subject> dodge?"},
P:[function(a,b,c){a.a8(c,"<subject> tr<ies> to {dodge|sidestep}")
if(a.gaq())a.ai(c,"<subject> <is> out of balance",!0)
else S.a7(new M.kM(a,c),new M.kN(this,a,c),null,null)
b.aA()
return H.b(a.db)+" fails to dodge "+H.b(this.b.gh())+"'s spear"},"$3","gL",6,0,1],
R:[function(a,b,c){var z=this.b
a.bp(c,"<subject> {dodge<s>|sidestep<s>} it",z,!0)
if(z.ga4()){z.c4(c,"<subject> lose<s> balance because of that",!0,!0)
b.X(z.y,new M.kO())}b.aX("FightSituation")
if(a.gN()===!0)c.t(0,"this opens an opportunity for a counter attack")
C.a.t(b.f,S.c6(a,z))
return H.b(a.gh())+" dodges "+H.b(z.db)+"'s spear"},"$3","gM",6,0,1],
H:function(a,b){var z,y
z=a.ga4()?0:0.2
if(a.ch===!0)return 0.7-z
y=b.f
return(y.length!==0?C.a.gw(y):null).gb5().b4(0.4-z)},
G:function(a,b){return!a.ga0()&&this.b.gS() instanceof Z.al},
v:{
x4:[function(a){return new M.kL("Dodging means moving your body out of harm's way. When done correctly, it will throw your opponent off balance and it will open an opportunity for a counter attack. When botched, it can get you killed.",!1,!1,!0,C.c,a,null)},"$1","u9",2,0,4]}},kM:{"^":"a:2;a,b",
$0:function(){return this.a.ai(this.b,"<subject> {can't|fail<s>|<does>n't succeed}",!0)}},kN:{"^":"a:2;a,b,c",
$0:function(){return this.a.b.bR(this.c,"<subject> <is> too quick for <object>",!0,this.b)}},kO:{"^":"a:0;",
$1:function(a){a.sah(C.h)
return C.h}}}],["","",,O,{"^":"",mc:{"^":"z;I:c<,J:d<,a1:e<,O:f<,K:r<,b,a",
ga6:function(){return"jump back"},
gh:function(){return"JumpBackFromSlash"},
gaf:function(){return"will <subject> avoid the slash?"},
P:[function(a,b,c){a.aL(c,"<subject> {jump<s>|leap<s>} {back|backward} but <subject> <is> {not fast enough|too slow}.",!0)
b.aA()
return H.b(a.gh())+" fails to jump back from "+H.b(this.b.gh())},"$3","gL",6,0,1],
R:[function(a,b,c){var z
a.bi(c,"<subject> {leap<s>|jump<s>} {back|backwards|out of reach}",!0)
z=this.b
c.bX(0,"<owner's> <subject> {slash<es>|cut<s>} empty air",z,z.gS())
b.aX("FightSituation")
return H.b(a.gh())+" jumps back from "+H.b(z.gh())+"'s attack"},"$3","gM",6,0,1],
H:function(a,b){var z,y,x
if(a.gN()===!0)return 1
z=b.f
y=z.length!==0?C.a.gw(z):null
x=a.ga4()?0:0.2
return y.gb5().b4(0.5-x)},
G:function(a,b){return a.gaz()&&this.b.gS().gaV()},
v:{
xg:[function(a){return new O.mc("Jump back and the weapon can't reach you.",!1,!1,!0,C.c,a,null)},"$1","uZ",2,0,4]}}}],["","",,G,{"^":"",mZ:{"^":"z;I:c<,J:d<,a1:e<,O:f<,K:r<,b,a",
gh:function(){return"ParrySlash"},
ga6:function(){return"parry and counter"},
gaf:function(){return"will <subject> parry?"},
P:[function(a,b,c){a.a8(c,"<subject> tr<ies> to {parry|deflect it|meet it with "+H.b(U.ab(a))+"|fend it off}")
if(a.gaq())a.ai(c,"<subject> <is> out of balance",!0)
else S.a7(new G.n_(a,c),new G.n0(this,a,c),null,null)
b.aA()
return H.b(a.db)+" fails to parry "+H.b(this.b.gh())},"$3","gL",6,0,1],
R:[function(a,b,c){var z=this.b
if(z.gaq()){c.ez(0,"<subject> <is> out of balance",!0,!0,z)
c.bX(0,"so <ownerPronoun's> <subject> is {weak|feeble}",z,$.$get$iM())
a.bi(c,"<subject> {parr<ies> it easily|easily meet<s> it with "+H.b(U.ab(a))+"|fend<s> it off easily}",!0)}else a.bi(c,"<subject> {parr<ies> it|meet<s> it with "+H.b(U.ab(a))+"|fend<s> it off}",!0)
b.aX("FightSituation")
if(a.gN()===!0)c.t(0,"this opens an opportunity for a counter attack")
C.a.t(b.f,S.c6(a,z))
return H.b(a.gh())+" parries "+H.b(z.db)},"$3","gM",6,0,1],
H:function(a,b){var z,y,x
z=a.ga4()?0:0.2
y=this.b.gaq()?0.3:0
if(a.ch===!0)return 0.6-z+y
x=b.f
return(x.length!==0?C.a.gw(x):null).gb5().b4(0.3-z+y)},
G:function(a,b){return a.gS().gcj()},
v:{
xl:[function(a){return new G.mZ("Parrying means deflecting your opponent's move with your weapon. When successful, it will give you an opportunity for a counter attack. It won't throw your opponent off balance like dodging does, but it's also slightly easier to do.",!1,!1,!0,C.c,a,null)},"$1","v7",2,0,4]}},n_:{"^":"a:2;a,b",
$0:function(){return this.a.ai(this.b,"<subject> {fail<s>|<does>n't succeed}",!0)}},n0:{"^":"a:2;a,b,c",
$0:function(){return this.a.b.bR(this.c,"<subject> <is> too quick for <object>",!0,this.b)}}}],["","",,E,{"^":"",ol:{"^":"z;I:c<,J:d<,a1:e<,O:f<,K:r<,b,a",
ga6:function(){return"block with shield and counter"},
gh:function(){return"ShieldBlockSlash"},
gaf:function(){return"will <subject> block the slash?"},
P:[function(a,b,c){a.a8(c,"<subject> tr<ies> to {block|stop|deflect} the {swing|attack|strike} with "+H.b(U.c0(a)))
if(a.gaq())a.ai(c,"<subject> <is> out of balance",!0)
else S.a7(new E.om(a,c),new E.on(a,c),new E.oo(this,a,c),null)
b.aA()
return H.b(a.db)+" fails to block "+H.b(this.b.gh())+" with shield"},"$3","gL",6,0,1],
R:[function(a,b,c){var z=this.b
if(z.gaq()){c.ez(0,"<subject> <is> out of balance",!0,!0,z)
c.bX(0,"so <ownerPronoun's> <subject> is {weak|feeble}",z,$.$get$iL())
a.bi(c,"<subject> easily {block|stop|deflect} the {swing|attack|strike} with "+H.b(U.c0(a)),!0)}else a.bi(c,"<subject> {block|stop|deflect} the {swing|attack|strike} with "+H.b(U.c0(a)),!0)
b.aX("FightSituation")
if(a.gN()===!0)c.t(0,"this opens an opportunity for a counter attack")
C.a.t(b.f,S.c6(a,z))
return H.b(a.gh())+" blocks "+H.b(z.db)+" with a shield"},"$3","gM",6,0,1],
H:function(a,b){var z,y,x
z=a.ga4()?0:0.2
y=this.b.gaq()?0.2:0
if(a.ch===!0)return 0.8-z+y
x=b.f
return(x.length!==0?C.a.gw(x):null).gb5().b4(0.5-z+y)},
G:function(a,b){return a.gal()!=null},
v:{
xs:[function(a){return new E.ol("A shield blocks enemy attacks with the least amount of energy and movement. It is easy and quick to launch a counter-attack when the enemy's weapon is stopped in this way.",!1,!1,!0,C.c,a,null)},"$1","vm",2,0,4]}},om:{"^":"a:2;a,b",
$0:function(){return this.a.ai(this.b,"<subject> {fail<s>|<does>n't succeed}",!0)}},on:{"^":"a:2;a,b",
$0:function(){return this.a.ai(this.b,"<subject> <is> too slow",!0)}},oo:{"^":"a:2;a,b,c",
$0:function(){return this.a.b.bR(this.c,"<subject> <is> too quick for <object>",!0,this.b)}}}],["","",,L,{"^":"",
aQ:function(a,b,c){var z=new L.ea(null,null,null,null,null,null)
new L.tz(a,b,c).$1(z)
return z.q()},
h0:{"^":"c8;",
gaG:function(){return[X.u4(),F.u8(),M.u9(),O.uZ(),G.v7(),E.vm()]},
gh:function(){return"SlashDefenseSituation"},
ay:function(){var z=new L.ea(null,null,null,null,null,null)
z.m(this)
new L.os().$1(z)
return z.q()}},
tz:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$a9().ar(1073741823)
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
qa:{"^":"h0;cO:a<,i:b<,cr:c<,cu:d<,V:e<",
a2:function(a){var z=new L.ea(null,null,null,null,null,null)
z.m(this)
a.$1(z)
return z.q()},
A:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof L.h0))return!1
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
gB:function(a){return Y.U(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)))},
k:function(a){return"SlashDefenseSituation {attacker="+H.b(J.h(this.a))+",\nid="+J.h(this.b)+",\npredeterminedResult="+J.h(this.c)+",\ntarget="+H.b(J.h(this.d))+",\ntime="+J.h(this.e)+",\n}"}},
ea:{"^":"d;a,b,c,d,e,f",
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
z=new L.qa(y,x,w,v,u)
if(y==null)H.i(P.m("attacker"))
if(x==null)H.i(P.m("id"))
if(w==null)H.i(P.m("predeterminedResult"))
if(v==null)H.i(P.m("target"))
if(u==null)H.i(P.m("time"))}this.m(z)
return z}}}],["","",,M,{"^":"",
bc:function(a,b){var z=new M.eb(null,null,null,null,null)
new M.tC(a,b).$1(z)
return z.q()},
h1:{"^":"af;",
gaG:function(){return[O.uj(),V.ul()]},
gh:function(){return"SlashSituation"},
ay:function(){var z=new M.eb(null,null,null,null,null)
z.m(this)
new M.ot().$1(z)
return z.q()},
b_:function(a,b){if(a===0)return b.T(this.a)
return},
b6:function(a,b){return new H.K(a,new M.ou(this),[H.l(a,0)])}},
tC:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a9().ar(1073741823)
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
qb:{"^":"h1;a,i:b<,c,V:d<",
a2:function(a){var z=new M.eb(null,null,null,null,null)
z.m(this)
a.$1(z)
return z.q()},
A:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof M.h1))return!1
if(J.e(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y)if(J.e(this.c,b.c)){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1}else z=!1
return z},
gB:function(a){return Y.U(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
k:function(a){return"SlashSituation {attacker="+H.b(J.h(this.a))+",\nid="+J.h(this.b)+",\ntarget="+H.b(J.h(this.c))+",\ntime="+J.h(this.d)+",\n}"}},
eb:{"^":"d;a,b,c,d,e",
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
z=new M.qb(y,x,w,v)
if(y==null)H.i(P.m("attacker"))
if(x==null)H.i(P.m("id"))
if(w==null)H.i(P.m("target"))
if(v==null)H.i(P.m("time"))}this.m(z)
return z}}}],["","",,Q,{"^":"",lA:{"^":"z;I:c<,J:d<,a1:e<,O:f<,K:r<,b,a",
gh:function(){return"FinishSlashGroundedEnemy"},
ga6:function(){return""},
gaf:function(){return"(WARNING should not be user-visible)"},
P:[function(a,b,c){throw H.c(new P.Y(null))},"$3","gL",6,0,1],
R:[function(a,b,c){var z,y,x
z=this.b
b.X(z.gi(),new Q.lB())
y=b.T(z.gi())
x=J.e(y.gi(),100)
c.ey(0,"<subject> {cut<s>|slash<es>|slit<s>} <object's> "+(x?"side":"{throat|neck|side}"),y,a.gS())
if(x)N.b4(c,y)
else N.bj(c,b,y)
return H.b(a.gh())+" slains "+H.b(z.gh())+" on the ground"},"$3","gM",6,0,1],
H:function(a,b){return 1},
G:function(a,b){return this.b.ga0()&&a.gS().gaV()},
v:{
x9:[function(a){return new Q.lA(null,!0,!0,!0,C.c,a,null)},"$1","uk",2,0,4]}},lB:{"^":"a:0;",
$1:function(a){a.sag(0)
return a}}}],["","",,V,{"^":"",lE:{"^":"z;I:c<,J:d<,a1:e<,O:f<,K:r<,b,a",
ga6:function(){return""},
gh:function(){return"FinishThrustSpearAtGroundedEnemy"},
gaf:function(){return"(WARNING should not be user-visible)"},
P:[function(a,b,c){throw H.c(new P.Y(null))},"$3","gL",6,0,1],
R:[function(a,b,c){var z,y,x
z=this.b
b.X(z.gi(),new V.lF())
y=b.T(z.gi())
x=J.e(y.gi(),100)
c.ey(0,"<subject> {impale<s>|bore<s> through|pierce<s>} <object's> "+(x?"side":"{throat|neck|heart}"),y,a.gS())
if(x)N.b4(c,y)
else N.bj(c,b,y)
return H.b(a.gh())+" slains "+H.b(z.gh())+" on the ground with a spear"},"$3","gM",6,0,1],
H:function(a,b){return 1},
G:function(a,b){return this.b.ga0()&&a.gS() instanceof Z.al},
v:{
xb:[function(a){return new V.lE(null,!0,!0,!0,C.c,a,null)},"$1","um",2,0,4]}},lF:{"^":"a:0;",
$1:function(a){a.sag(0)
return a}}}],["","",,K,{"^":"",mP:{"^":"z;J:c<,a1:d<,O:e<,K:f<,I:r<,b,a",
gh:function(){return"OnGroundParry"},
ga6:function(){return"parry it"},
gaf:function(){return"will <subject> parry it?"},
P:[function(a,b,c){a.a8(c,"<subject> tr<ies> to {parry|deflect it|stop it{| with "+H.b(U.ab(a))+"}}")
S.a7(new K.mQ(a,c),new K.mR(this,a,c),null,null)
b.aA()
return H.b(a.gh())+" fails to parry "+H.b(this.b.gh())},"$3","gL",6,0,1],
R:[function(a,b,c){a.bi(c,"<subject> {parr<ies> it|stop<s> it with "+H.b(U.ab(a))+"}",!0)
b.aX("FightSituation")
return H.b(a.gh())+" parries "+H.b(this.b.gh())},"$3","gM",6,0,1],
H:function(a,b){var z
if(a.gN()===!0)return 0.6
z=b.f
return(z.length!==0?C.a.gw(z):null).gb5().b4(0.3)},
G:function(a,b){return this.b.gS().gaV()&&a.gS().gcj()},
v:{
xj:[function(a){return new K.mP(!1,!1,!0,C.c,"TODO",a,null)},"$1","v5",2,0,4]}},mQ:{"^":"a:2;a,b",
$0:function(){return this.a.ai(this.b,"<subject> {fail<s>|<does>n't succeed}",!0)}},mR:{"^":"a:2;a,b,c",
$0:function(){return this.a.b.bR(this.c,"<subject> <is> too quick for <object>",!0,this.b)}}}],["","",,L,{"^":"",mS:{"^":"z;I:c<,J:d<,a1:e<,O:f<,K:r<,b,a",
ga6:function(){return"block with shield"},
gh:function(){return"OnGroundShieldBlock"},
gaf:function(){return"will <subject> block the strike?"},
P:[function(a,b,c){a.a8(c,"<subject> tr<ies> to {block|stop|deflect} the {swing|attack|strike} with "+H.b(U.c0(a)))
S.a7(new L.mT(a,c),new L.mU(a,c),new L.mV(this,a,c),null)
b.aA()
return H.b(a.gh())+" fails to block "+H.b(this.b.gh())+" with shield on ground"},"$3","gL",6,0,1],
R:[function(a,b,c){var z=this.b
if(z.gaq()){c.ez(0,"<subject> <is> out of balance",!0,!0,z)
c.bX(0,"so <ownerPronoun's> <subject> is {weak|feeble}",z,$.$get$iK())
a.bi(c,"<subject> easily {block|stop|deflect} the {swing|attack|strike} with "+H.b(U.c0(a)),!0)}else a.bi(c,"<subject> {block|stop|deflect} the {swing|attack|strike} with "+H.b(U.c0(a)),!0)
b.aX("FightSituation")
return H.b(a.gh())+" blocks "+H.b(z.db)+" with a shield on ground"},"$3","gM",6,0,1],
H:function(a,b){var z
if(a.gN()===!0)return 0.8
z=b.f
return(z.length!==0?C.a.gw(z):null).gb5().b4(0.5)},
G:function(a,b){return a.gal()!=null},
v:{
xk:[function(a){return new L.mS("A shield blocks enemy attacks with the least amount of energy and movement.",!1,!1,!0,C.c,a,null)},"$1","v6",2,0,4]}},mT:{"^":"a:2;a,b",
$0:function(){return this.a.ai(this.b,"<subject> {fail<s>|<does>n't succeed}",!0)}},mU:{"^":"a:2;a,b",
$0:function(){return this.a.ai(this.b,"<subject> <is> too slow",!0)}},mV:{"^":"a:2;a,b,c",
$0:function(){return this.a.b.bR(this.c,"<subject> <is> too quick for <object>",!0,this.b)}}}],["","",,Y,{"^":"",nG:{"^":"z;I:c<,J:d<,a1:e<,O:f<,K:r<,b,a",
gh:function(){return"RollOutOfWay"},
ga6:function(){return"roll out of way"},
gaf:function(){return"will <subject> evade?"},
P:[function(a,b,c){a.a8(c,"<subject> tr<ies> to roll out of the way")
a.ai(c,"<subject> can't",!0)
b.aA()
return H.b(a.gh())+" fails to roll out of the way"},"$3","gL",6,0,1],
R:[function(a,b,c){a.eW(c,"<subject> <is> able to roll out of the way",!0,!0)
if(a.gN()===!0){b.X(a.gi(),new Y.nH())
a.bi(c,"<subject> jump<s> up on <subject's> feet",!0)}b.aX("FightSituation")
return H.b(a.gh())+" rolls out of the way of "+H.b(this.b.gh())+"'s strike"},"$3","gM",6,0,1],
H:function(a,b){var z
if(a.gN()===!0)return 1
z=b.f
return(z.length!==0?C.a.gw(z):null).gb5().b4(0.5)},
G:function(a,b){return!0},
v:{
xr:[function(a){return new Y.nG(null,!1,!1,!0,C.c,a,null)},"$1","vf",2,0,4]}},nH:{"^":"a:0;",
$1:function(a){a.sah(C.k)
return a}}}],["","",,V,{"^":"",
bJ:function(a,b,c){var z=new V.dV(null,null,null,null,null,null)
new V.tx(a,b,c).$1(z)
return z.q()},
fE:{"^":"c8;",
gaG:function(){return[K.v5(),L.v6(),Y.vf()]},
gh:function(){return"OnGroundDefenseSituation"},
ay:function(){var z=new V.dV(null,null,null,null,null,null)
z.m(this)
new V.mO().$1(z)
return z.q()}},
tx:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$a9().ar(1073741823)
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
q5:{"^":"fE;cO:a<,i:b<,cr:c<,cu:d<,V:e<",
a2:function(a){var z=new V.dV(null,null,null,null,null,null)
z.m(this)
a.$1(z)
return z.q()},
A:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof V.fE))return!1
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
gB:function(a){return Y.U(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)))},
k:function(a){return"OnGroundDefenseSituation {attacker="+H.b(J.h(this.a))+",\nid="+J.h(this.b)+",\npredeterminedResult="+J.h(this.c)+",\ntarget="+H.b(J.h(this.d))+",\ntime="+J.h(this.e)+",\n}"}},
dV:{"^":"d;a,b,c,d,e,f",
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
z=new V.q5(y,x,w,v,u)
if(y==null)H.i(P.m("attacker"))
if(x==null)H.i(P.m("id"))
if(w==null)H.i(P.m("predeterminedResult"))
if(v==null)H.i(P.m("target"))
if(u==null)H.i(P.m("time"))}this.m(z)
return z}}}],["","",,D,{"^":"",
d7:function(a,b){var z=new D.ec(null,null,null,null,null)
new D.ty(a,b).$1(z)
return z.q()},
hc:{"^":"af;",
gaG:function(){return[Q.uk(),V.um()]},
gh:function(){return"StrikeDownSituation"},
ay:function(){var z=new D.ec(null,null,null,null,null)
z.m(this)
new D.pc().$1(z)
return z.q()},
b_:function(a,b){if(a===0)return b.T(this.a)
return},
b6:function(a,b){return new H.K(a,new D.pd(this),[H.l(a,0)])}},
ty:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a9().ar(1073741823)
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
qc:{"^":"hc;a,i:b<,c,V:d<",
a2:function(a){var z=new D.ec(null,null,null,null,null)
z.m(this)
a.$1(z)
return z.q()},
A:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof D.hc))return!1
if(J.e(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y)if(J.e(this.c,b.c)){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1}else z=!1
return z},
gB:function(a){return Y.U(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
k:function(a){return"StrikeDownSituation {attacker="+H.b(J.h(this.a))+",\nid="+J.h(this.b)+",\ntargetOnGround="+H.b(J.h(this.c))+",\ntime="+J.h(this.d)+",\n}"}},
ec:{"^":"d;a,b,c,d,e",
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
z=new D.qc(y,x,w,v)
if(y==null)H.i(P.m("attacker"))
if(x==null)H.i(P.m("id"))
if(w==null)H.i(P.m("targetOnGround"))
if(v==null)H.i(P.m("time"))}this.m(z)
return z}}}],["","",,O,{"^":"",ni:{"^":"d;",
gb5:function(){switch(this.gcr()){case C.l:return C.a4
case C.m:return $.$get$fI()
case C.p:return $.$get$fJ()
default:throw H.c(P.G(this.gcr()))}},
$isaf:1}}],["","",,K,{"^":"",e1:{"^":"d;a,b",
k:function(a){return this.b}}}],["","",,D,{"^":"",ox:{"^":"ah;J:b<,O:c<,a1:d<,K:e<,a",
gW:function(){return""},
gI:function(){return},
gh:function(){return"SlayMonstersAction"},
P:[function(a,b,c){throw H.c(new P.Y(null))},"$3","gL",6,0,1],
R:[function(a,b,c){var z,y,x,w
z=b.f
y=z.length!==0?C.a.gw(z):null
x=b.dY(y.gbF())
w=b.a
C.a.t(z,x.jU(b,y,new H.K(w,new D.oy(a,x),[H.l(w,0)])))
return H.b(a.gh())+" initiated combat with monsters in "+x.k(0)},"$3","gM",6,0,1],
ab:function(a,b){return"WARNING should not be user-visible"},
H:function(a,b){return 1},
G:function(a,b){var z=b.f
return H.F(z.length!==0?C.a.gw(z):null,"$isJ").c}},oy:{"^":"a:0;a,b",
$1:function(a){return a.gap()&&a.gaY().he(this.a.gaY())&&J.e(a.gbF(),this.b.gh())}}}],["","",,Y,{"^":"",pn:{"^":"ca;J:c<,a1:d<,O:e<,K:f<,b,a",
gI:function(){return},
gh:function(){return"TakeExitAction"},
P:[function(a,b,c){throw H.c(new P.Y(null))},"$3","gL",6,0,1],
R:[function(a,b,c){var z,y
z=this.b
c.t(0,z.gaT())
y=b.f
H.F(y.length!==0?C.a.gw(y):null,"$isJ").kC(b,a,z.gh0(),c)
return H.b(a.gh())+" went through exit to "+z.a},"$3","gM",6,0,1],
ab:function(a,b){return"WARNING should not be user-visible"},
H:function(a,b){return 1},
G:function(a,b){var z=b.f
if(H.F(z.length!==0?C.a.gw(z):null,"$isJ").c===!0)return!1
this.b.gkl()
return!0},
v:{
xw:[function(a){return new Y.pn(!1,!0,!1,null,a,null)},"$1","wO",2,0,50]}}}],["","",,F,{"^":"",
fT:function(a,b){var z=new F.e8(null,null,null,null,null)
new F.to(a,b).$1(z)
return z.q()},
J:{"^":"af;",
gaG:function(){return[Y.wO()]},
gbO:function(){var z=[]
C.a.ax(z,$.$get$i2())
z.push($.$get$h4())
return z},
gdH:function(){return 1000},
gh:function(){return"RoomRoamingSituation"},
ay:function(){var z=new F.e8(null,null,null,null,null)
z.m(this)
new F.nI().$1(z)
return z.q()},
b_:function(a,b){return b.a.aU(0,new F.nJ(),new F.nK())},
b6:function(a,b){var z=this.b_(null,b)
if(z==null)return[]
return[z]},
cX:function(a,b,c,d,e){var z,y,x,w,v,u,t
z=a.dY(c)
a.c3(this.b,F.fT(z,!a.hN("TakeExitAction",b,!0).bt(0,new F.nL(c))&&z.gjT()!=null))
if(!e)if(this.io(a,b,z))z.i_(b,a,d)
else{d.p(0,"\n\n",!0)
z.jI(b,a,d)
d.p(0,"\n\n",!0)}for(y=R.io(b,a),y=P.P(y,!0,H.y(y,"B",0)),x=y.length,w=a.a,v=0;v<y.length;y.length===x||(0,H.at)(y),++v){u=a.T(y[v].gi())
t=u.a2(new F.nM(z))
w.a3(0,u)
w.t(0,t)}},
kC:function(a,b,c,d){return this.cX(a,b,c,d,!1)},
hk:function(a,b){a.a.iH(new F.nN(),!0)},
df:function(a){if(J.e(this.a,$.$get$eA().b))return!1
return!0},
io:function(a,b,c){var z,y
for(z=a.d,z=new P.dc(z,z.c,z.d,z.b,null,[H.l(z,0)]);z.u();){y=z.e
if(!J.e(y.gcs(),b.gi()))continue
if(y.gdv()!=="TakeExitAction")continue
if(J.dt(y.gaT(),c.gh())===!0)return!0}return!1}},
to:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a9().ar(1073741823)
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
$1:function(a){return a.gN()===!0&&a.gap()}},
nK:{"^":"a:2;",
$0:function(){return}},
nL:{"^":"a:0;a",
$1:function(a){return a.geH()===this.a}},
nM:{"^":"a:0;a",
$1:function(a){a.sbF(this.a.gh())
return a}},
nN:{"^":"a:0;",
$1:function(a){return!a.gaH()}},
q9:{"^":"J;bF:a<,i:b<,c,V:d<",
a2:function(a){var z=new F.e8(null,null,null,null,null)
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
gB:function(a){return Y.U(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
k:function(a){return"RoomRoamingSituation {currentRoomName="+H.b(J.h(this.a))+",\nid="+J.h(this.b)+",\nmonstersAlive="+J.h(this.c)+",\ntime="+J.h(this.d)+",\n}"}},
e8:{"^":"d;a,b,c,d,e",
gbF:function(){return this.gaF().b},
sbF:function(a){this.gaF().b=a
return a},
gi:function(){return this.gaF().c},
skB:function(a){this.gaF().d=a
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
z=new F.q9(y,x,w,v)
if(y==null)H.i(P.m("currentRoomName"))
if(x==null)H.i(P.m("id"))
if(w==null)H.i(P.m("monstersAlive"))
if(v==null)H.i(P.m("time"))}this.m(z)
return z}}}],["","",,O,{"^":"",
ub:function(a,b){var z=O.aa(a).gaC().cl(0,new O.uc())
a.X(O.aa(a).gi(),new O.ud(z))
a.as("RoomRoamingSituation").cX(a,O.aa(a),"war_forge",b,!0)},
xL:[function(a,b,c){var z,y
z=R.b6(6666,"Agruth",null,null,null,null,null,0,2,100,!1,2,!0,C.t,0,$.$get$bA())
y=z.y
a.gdw().t(0,z)
return U.cc(c,[z],"{rock|cavern} floor",b,P.a0([1,new O.uo(y),5,new O.up(y),9,new O.uq(y),12,new O.ur(y),17,new O.us(y)]))},"$3","wT",6,0,12],
xM:[function(a,b,c){var z,y,x,w,v
z=O.hU(2)
y=O.eu(!1)
x=new O.uC(z.y)
w=new O.uB(y.y)
v=[z,y]
a.gdw().ax(0,v)
return U.cc(c,v,"{rock|cavern} floor",b,P.a0([1,new O.uw(x,w,new O.uv()),4,new O.ux(x,w),6,new O.uy(),9,new O.uz(),12,new O.uA()]))},"$3","wU",6,0,12],
xN:[function(a,b,c){var z,y,x
z=a.ao("talk_to_briana_3")?"guardian":"orc"
y=R.b6(6667,z,null,null,null,new G.aH("rusty sword",1,1,!1,!0,!1,P.aE(C.o,null)),null,0,3,100,!1,3,!1,C.t,0,$.$get$bA())
x=y.y
a.a.t(0,y)
return U.cc(c,[y],"{rock|cavern} floor",b,P.a0([1,new O.uD(x),3,new O.uE(x),5,new O.uF(x)]))},"$3","wV",6,0,12],
xO:[function(a,b,c){var z,y,x,w,v
z=O.hU(2)
y=O.eu(!0)
x=new O.uK(z.y)
w=new O.uJ(y.y)
v=[z,y]
a.gdw().ax(0,v)
return U.cc(c,v,"{rough|stone} floor",b,P.a0([1,new O.uH(x,w,new O.uG()),3,new O.uI(x,w)]))},"$3","wW",6,0,12],
aa:function(a){return a.gdw().bC(0,new O.uM())},
uO:function(a){return a.X(O.aa(a).gi(),new O.uP())},
ir:function(a,b){a.X(O.aa(a).gi(),new O.uQ(b))},
eF:function(a){var z=a.f
if(H.F(z.length!==0?C.a.gw(z):null,"$isJ").c===!0)return!1
return C.a.a7(C.a_,H.F(z.length!==0?C.a.gw(z):null,"$isJ").a)},
bi:function(a,b){var z,y,x
z=O.aa(a)
for(y=a.d,y=new P.dc(y,y.c,y.d,y.b,null,[H.l(y,0)]);y.u();){x=y.e
if(!J.e(x.gcs(),z.gi()))continue
if(x.gdv()!=="TakeExitAction")continue
if(x.geH()===b)return!0
return!1}return!1},
ix:function(a,b){var z,y,x,w,v,u,t,s,r
for(z=a.a,y=z.ga_(z),x=new H.bT(y,new O.v1(),[H.l(z,0)]);x.u();){w=y.gU()
if(!w.gaz()){v=H.F(w.e,"$isaH")
y=b
x=v.c
u=v.d
v.r
t=P.P(C.o,!1,null)
t.fixed$length=Array
t.immutable$list=Array
s=a.T(w.y)
r=s.a2(new O.v2(new G.aH(y,x,u,!0,!0,!1,t)))
z.a3(0,s)
z.t(0,r)
break}}},
cC:function(a,b){var z,y,x
z=H.F(a.c,"$iscR").b
if(z>=5)return
b.p(0,C.a2[z],!0)
y=H.F(a.c,"$iscR")
y.toString
x=new M.ef(null,!1,0,0)
x.m(y)
a.c=new O.ve().$1(x).q()},
eH:function(a,b,c,d){var z,y
b.X(a.gi(),new O.vj())
if(!d){z=b.a
y=O.eu(!1)
z.t(0,y)
C.a.t(b.f,U.cc(new H.K(z,new O.vk(),[H.l(z,0)]),[y],"{smooth|} rock",b.as("RoomRoamingSituation"),P.a0([1,new O.vl(y.y)])))}},
wK:function(a,b){a.X(b.gi(),new O.wL(b))},
eu:function(a){var z,y
z=$.$get$ex().a++
y=a?new Z.al("spear",0,1,!1,!1,!1,P.aE(C.D,null)):new G.aH("scimitar",1,1,!1,!0,!1,P.aE(C.o,null))
return R.b6(z,"goblin",O.dl(),null,null,y,null,0,1,0,!1,1,!1,C.t,0,$.$get$bA())},
hU:function(a){return R.b6($.$get$ex().a++,"orc",O.dl(),null,null,new G.aH("sword",1,1,!1,!0,!1,P.aE(C.o,null)),null,0,a,0,!1,a,!1,C.t,0,$.$get$bA())},
uc:{"^":"a:0;",
$1:function(a){return C.a.a7(a.gf2(),C.r)}},
ud:{"^":"a:0;a",
$1:function(a){a.gaC().a3(0,this.a)
return a}},
uo:{"^":"a:6;a",
$2:function(a,b){var z,y,x
z=this.a
y=a.T(z)
x=new G.aH("sword",1,1,!1,!0,!1,P.aE(C.o,null))
y.a8(b,"<subject> {drop<s>|let<s> go of} the whip")
y.ac(b,"<subject> draw<s> <subject's> <object>",x)
a.X(z,new O.un(x))
y.dM(b,'"You\'re dead, slave," <subject> growl<s> at <object> with hatred.',O.aa(a),!0)}},
un:{"^":"a:0;a",
$1:function(a){a.sS(this.a)
return a}},
up:{"^":"a:6;a",
$2:function(a,b){a.T(this.a).a8(b,"<subject> spit<s> on the cavern floor")}},
uq:{"^":"a:6;a",
$2:function(a,b){var z=a.T(this.a)
b.eB()
z.aL(b,'"I\'ll enjoy eating your flesh, human," <subject> snarl<s>.',!0)
b.p(0,"\n\n",!0)}},
ur:{"^":"a:6;a",
$2:function(a,b){var z=a.T(this.a)
z.a8(b,"<subject> grit<s> <subject's> teeth")
z.ai(b,"<subject> do<es>n't talk any more",!0)}},
us:{"^":"a:6;a",
$2:function(a,b){a.T(this.a).a8(b,"<subject> scowl<s> with pure hatred")}},
uC:{"^":"a:10;a",
$1:function(a){return a.T(this.a)}},
uB:{"^":"a:10;a",
$1:function(a){return a.T(this.a)}},
uv:{"^":"a:25;",
$2:function(a,b){return a.gap()&&b.gap()}},
uw:{"^":"a:6;a,b,c",
$2:function(a,b){var z,y,x,w,v
z=this.a.$1(a)
y=this.b.$1(a)
x=O.aa(a)
if(this.c.$2(z,y)===!0){w=z.dF(a)?y:z
v=J.e(w,z)?y:z
w.aL(b,'"Look, Sgarr," <subject> say<s>. "Look at them. Give a puny slave some steel and suddenly they think they\'re mighty slayers."',!0)
v.a8(b,"<subject> laugh<s>")
if(J.e(x.gS().gh(),$.$get$cB().b)){v.ai(b,"<subject> stop<s> almost instantly",!0)
v.dM(b,"<subject> see<s> <object> in your hand.",x.gS(),!0)}}else{w=z.gap()?z:y
w.aL(b,'"Look at you," <subject> laugh<s>. "Give a puny slave some steel and suddenly you think you\'re mighty slayers."',!0)
if(J.e(x.gS().gh(),$.$get$cB().b))w.kU(b,"But then <subject> see<s> <object> in your hand and his face hardens.",!0,x.gS(),!0)}}},
ux:{"^":"a:6;a,b",
$2:function(a,b){var z,y,x,w,v,u,t,s,r,q,p
z=this.a.$1(a)
y=this.b.$1(a)
x=z.gap()?z:y
w=O.aa(a)
if(!x.gaz())v=w.gaz()&&w.d==null
else v=!0
u=v?"kicking":"slashing"
t=v?["Whoosh!","Swah!","Slam!"]:["Swish!","Whoosh!","Thunk!"]
x.bi(b,"<subject> start<s> wildly "+u+" in your direction",!0)
s=J.aA(b)
s.p(b,'"Insignificant..." '+t[0]+' "... little ..." '+t[1]+' "... vermin!" '+t[2],!0)
if(v)r="chest"
else r=w.gal()!=null?"shield":w.gS().gh()
q="That last blow hits your "+H.b(r)+" hard"
s.p(b,q+(w.ga0()?"":" and sends you a couple of steps back")+".",!0)
q=H.p([],[P.q])
p=$.$get$aM()
s.bX(b,"<owner's> <subject> glint<s> with intensity",x,new Y.aD(!1,"eyes",q,p,!1,C.E))}},
uy:{"^":"a:6;",
$2:function(a,b){J.c3(b,"From behind, you hear loud cries. Your pursuers must have reached the top of the stairs.",!0)}},
uz:{"^":"a:6;",
$2:function(a,b){J.c3(b,"Ear-splitting shouts come from behind. You wheel around and see a body of orcs and goblins approaching at top speed, their swords and spears at the ready.",!0)}},
uA:{"^":"a:6;",
$2:function(a,b){J.c3(b,"Your pursuers reach you from behind and a sword pierces your chest with formidable power.",!0)
a.X(O.aa(a).gi(),new O.uu())
a.aX("RoomRoamingSituation")
a.aA()}},
uu:{"^":"a:0;",
$1:function(a){a.sag(0)
return a}},
uD:{"^":"a:6;a",
$2:function(a,b){a.T(this.a).dM(b,'"Good good good," <subject> whisper<s>, eyeing <object>.',O.aa(a),!0)}},
uE:{"^":"a:6;a",
$2:function(a,b){var z,y
z=a.T(this.a)
y=a.T(100)
b.eB()
z.aL(b,'"Pain is good," <subject> chuckle<s>.',!0)
b.p(0,"\n\n",!0)
if(y.gap()){y.a8(b,"<subject> purse<s> <subject's> lips")
y.aL(b,'"Shut up and die."',!0)
b.p(0,"\n\n",!0)}}},
uF:{"^":"a:6;a",
$2:function(a,b){var z,y
z=a.T(this.a)
y=O.aa(a)
b.eB()
z.aL(b,'"You\'ll make a nice addition to my collection," <subject> say<s>, laughing.',!0)
z.a8(b,"<subject> nod<s> towards a heap of rotting bodies nearby")
b.p(0,"\n\n",!0)
y.aL(b,"<subject> glance<s> over at Briana, then back at the orc.",!0)
y.aL(b,'_"You had better shut up, and die."_',!0)
b.p(0,"\n\n",!0)}},
uK:{"^":"a:10;a",
$1:function(a){return a.T(this.a)}},
uJ:{"^":"a:10;a",
$1:function(a){return a.T(this.a)}},
uG:{"^":"a:25;",
$2:function(a,b){return a.gap()&&b.gaH()&&b.gc2()===!0}},
uH:{"^":"a:6;a,b,c",
$2:function(a,b){var z,y
z=this.a.$1(a)
y=this.b.$1(a)
if(!y.gaH()){z.ac(b,"<subject> look<s> at <object's> body",y)
z.aL(b,'"You\'ll pay for this, vermin," <subject> snarl<s>.',!0)
return}if(this.c.$2(z,y)===!0){z.ac(b,"<subject> look<s> at <object>",y)
z.dM(b,'"Now that is practice," <subject> say<s> to <objectPronoun>.',y,!0)}}},
uI:{"^":"a:6;a,b",
$2:function(a,b){var z,y,x
z=this.a.$1(a)
y=this.b.$1(a)
x=z.gap()?z:y
x.aL(b,'"You don\'t understand," <subject> growl<s>. "No matter how many of us you kill, there will be more. And when we get you, we will eat your face alive."',!0)
x.a8(b,"<subject> smirk<s>")
x.aL(b,'"You mean nothing."',!0)}},
uM:{"^":"a:0;",
$1:function(a){return a.gN()}},
uP:{"^":"a:0;",
$1:function(a){a.gaC().t(0,$.$get$er())
return a}},
uQ:{"^":"a:0;a",
$1:function(a){var z=a.gb8()
if(typeof z!=="number")return z.aj()
a.sb8(z+this.a)
return a}},
v1:{"^":"a:0;",
$1:function(a){return J.e(a.gaY(),$.$get$dn())}},
v2:{"^":"a:0;a",
$1:function(a){a.sS(this.a)
return a}},
ve:{"^":"a:0;",
$1:function(a){var z
a.gcz()
z=a.c
a.gcz()
a.c=z+1
return a}},
vj:{"^":"a:0;",
$1:function(a){a.sal(new E.br("shield",P.aE(C.a1,null)))
return a}},
vk:{"^":"a:0;",
$1:function(a){return J.e(a.gaY(),$.$get$dn())}},
vl:{"^":"a:6;a",
$2:function(a,b){var z,y
z=a.T(this.a)
y=O.aa(a)
if(a.fP("take_spear_in_underground_church")){z.eX(b,"<subject> look<s> at <object-owner's> <object>",$.$get$er(),y)
z.aL(b,'"Thief," <subject> mutter<s>.',!0)}}},
wL:{"^":"a:0;a",
$1:function(a){var z=this.a
if(!z.gaz())a.gaC().t(0,z.e)
a.sS($.$get$cB())}}}],["","",,V,{"^":"",
lI:function(){var z=new V.dD(null,null,null)
new V.tK().$1(z)
return z.q()},
tm:{"^":"a:5;",
$3:function(a,b,c){c.p(0,"",!0)}},
tn:{"^":"a:5;",
$3:function(a,b,c){c.p(0,"",!0)}},
tk:{"^":"a:5;",
$3:function(a,b,c){c.p(0,"The tunnel back to the main slave quarters is suicide. There will be too many orcs, and the Gate of Screams is a long way beyond, at the very base of Mount Bloodrock. That leaves two options: the black passage towards the war forges, and the deserted tunnel to the Unholy Church, an underground temple. Both these paths lead upwards and in the general direction of a small exit near the mountaintop \u2014 the Upper Door.\n",!0)}},
tl:{"^":"a:5;",
$3:function(a,b,c){c.p(0,"The corpse lies still, getting cold.\n\n\n",!0)
O.cC(b,c)
c.p(0,"",!0)}},
oi:{"^":"W;W:c<,h:d<,b,a",
G:function(a,b){var z=b.f
if(!J.e(H.F(z.length!==0?C.a.gw(z):null,"$isJ").a,"cave_with_agruth"))return!1
if(b.ao(this.d))return!1
return!0},
R:[function(a,b,c){c.p(0,"You search his pockets but turn up with nothing. Just then, you realize that if Agruth had something valuable on him, he would have hidden it well. You run your hand inside his vest and find a troma herb. This boosts your energy right when you need it--very handy. (Your stamina increases by 1.)\n",!0)
O.ir(b,1)
return H.b(a.gh())+" successfully performs SearchAgruth"},"$3","gM",6,0,1],
P:[function(a,b,c){throw H.c(new P.w("Success chance is 100%"))},"$3","gL",6,0,1],
H:function(a,b){return 1},
gO:function(){return!1},
ab:function(a,b){return"Will you be successful?"},
gK:function(){return},
gI:function(){return"You have taken his weapon but there might be other useful items in his pocket."},
gJ:function(){return!1}},
ti:{"^":"a:5;",
$3:function(a,b,c){c.p(0,'Only a few bends ahead, the tunnel get blindingly bright and the empty smell of mountain air fills your nose. After three years, you hear the howling wind. You run through a small stone portal and out of the mountain you thought would be your grave. \n\n\nYou have to close your eyes to keep the blinding sun out. You let the wind chill your muscles. \n\n\nBut merely two breaths later, you are again in motion, jumping down a sharply descending path. Outside, it\'s you and Briana who have the upper hand \u2014 the orcs and goblins groan and stumble. This is still their territory, but the bright sun and the lack of cave walls rubs against all their instincts. These are cave breeds.\n\n\nSoon, they stop following altogether, presumably leaving the two of you to their aboveground brothers. You don\'t dare to stop but you gradually slow down, and then lift your eyes from the treacherous terrain.\n\n\nAt first, you cannot make much sense of what you see \u2014 this is nothing like the country you left three years ago. You look at Briana but she doesn\'t seem surprised. You turn your eyes to the scenery again, to the black smoke of orc camps and razed villages, to the burned forests, to the cracks in the wall of the distant Fort Ironcast, just visible over the Glenview hill. \n\n\nNo birds, only some horrible dark eagle-like creatures with no head, circling in both directions above Mount Bloodrock.\n\n\n_"We must stop this."_\n\n\nBriana follows your gaze, then shakes her head. "This is much larger than us, Aren. We\'ve both seen what takes place in the mountain. Now you can see what has happend outside. This is a problem for kings, not peasants."\n\n\n_"No king has what we have."_\n\n\n',!0)
if(b.ao("take_orcthorn"))c.p(0,'"Orcthorn? Bah, you think they\'ll let you have it? A farm boy?" \n\n\n_"I\'m not a farm boy. And I don\'t mean Orcthorn, no. I have a connection. We both do."_\n',!0)
c.p(0,"\n",!0)
if(!b.ao("take_orcthorn"))c.p(0,"\"Let me guess. Muscles and a bit of brains? Don't be a fool, you're still a farm boy.\" \n\n\n_\"I'm not a farm boy. And I don't mean muscles or brains, no. I have a connection. We both do.\"_\n",!0)
c.p(0,'\n"A connection."\n\n\n_"With the Dead Prince. I dream his dreams. I think I have some of his power. He is more than people think. A lot more. You feel it, too \u2014 I am sure of it \u2014 but you have not been in the mountain for as long as I have. Most slaves are lucky to survive the first month. I survived three years."_\n\n\n"So the thing you have that kings don\'t is\u2026 a way to communicate? Negotiate?"\n\n\n_"I do not have anything the Dead Prince wants. No, I do not think any mortal man does. But I think I am starting to understand what that is, and how the Dead Prince wants to seize it."_\n\n\n"And your plan is?"\n\n\n[IMG long view of the road ahead]\n\n\n_"Not letting him have it. Giving him the exact opposite of what he wants."_\n\n\n"You know we could just run as fast as we can, slaying some orcs along the way, and getting as far away from this place as possible, right?"\n\n\n_"Yes."_\n\n\n"That others would do exactly that."\n\n\n_"But we will not."_\n\n\n"No. We will not."\n\n\nWith that, you both start down the road towards the black fort in the distance.\n',!0)}},
tj:{"^":"a:5;",
$3:function(a,b,c){c.p(0,"",!0)}},
tg:{"^":"a:5;",
$3:function(a,b,c){c.p(0,"The crevice is small.\n",!0)}},
th:{"^":"a:5;",
$3:function(a,b,c){c.p(0,"",!0)}},
td:{"^":"a:5;",
$3:function(a,b,c){c.p(0,"You enter a small, circular room. There are exits on three sides, all marked with crude writing.\n\n\n",!0)
if(O.bi(b,"smelter"))c.p(0,'The passage you came from is marked with the words "Hot iron", which must mean "smelter" in the orcs\' vocabulary. Another one has the words "Unholy Church" above it. Both of these slope downwards.',!0)
c.p(0,"\n",!0)
if(O.bi(b,"underground_church"))c.p(0,'The passage you came from is marked with the words "Unholy Church". Another one has the words "Hot iron" above it, which must mean "smelter" in the orcs\' vocabulary. Both of these slope downwards.',!0)
c.p(0,"\nA third passage is marked \"Up Door\", and a few paces beyond the opening, it turns into a steep stairway upwards. This is it, if you're ready for it. Your final path to escape, an end to those three horrible years.\n\n\nLeaning on the wall next to the third exit is a goblin guard. He's sleeping. He holds a sword in one hand, and there's a shield laid on his lap.\n\n\n",!0)
if(!b.ao("smelter_throw_spear")&&!b.ao("take_orcthorn"))c.p(0,'For the first time, you see a smile on Briana\'s face. Not a smirk or an angry taunt of a laugh, but a genuine smile. "_Up Door?_" she whispers, shaking hear head. "I can\'t believe we have made it this far. Although \u2014 I\'ll admit \u2014 it feels like we could have taken more from them." She motions at the goblin. "Wreak more havoc. I mean, we might be the first people to be in Mount Bloodrock, and live." \n\n\n_"Let us keep that second part true, then."_\n ',!0)
c.p(0,"",!0)}},
te:{"^":"a:5;",
$3:function(a,b,c){c.p(0,"",!0)
if(b.ao("guardpost_above_church_take_shield")&&!b.fP("guardpost_above_church_take_shield"))c.t(0,"The goblin's corpse is sprawled on the ground.")
else c.t(0,"The goblin is sleeping soundly.")
c.p(0,"",!0)}},
lH:{"^":"W;W:c<,h:d<,b,a",
G:function(a,b){var z=b.f
if(!J.e(H.F(z.length!==0?C.a.gw(z):null,"$isJ").a,"guardpost_above_church"))return!1
if(b.dP(this.d)!=null)return!1
return!0},
R:[function(a,b,c){c.p(0,"You silently approach the goblin's legs, wait a few moments, then lean over him and deftly lift the shield. The goblin sniffs, moves, but stays asleep.\n\n\nYou take a few slow steps back, then fix the shield on your offhand.\n",!0)
O.eH(a,b,c,!0)
return H.b(a.gh())+" successfully performs GuardpostAboveChurchTakeShield"},"$3","gM",6,0,1],
P:[function(a,b,c){c.p(0,"You silently approach the goblin's legs, and wait a few moments. You're trying to stay as far away from his nose as possible. The goblin sniffs, moves, but stays asleep. You shift your weight on the right leg, leaning over the goblin and using the other leg as a counterweigh. Briana watches you with amusement.\n\n\nYou touch the shield to lift it, but freeze. The goblin sniffs again, and shifts. If you move, he'll wake up.\n",!0)
C.a.t(b.f,V.lI())
return H.b(a.gh())+" fails to perform GuardpostAboveChurchTakeShield"},"$3","gL",6,0,1],
H:function(a,b){return 0.3},
gO:function(){return!1},
ab:function(a,b){return"Will you be successful?"},
gK:function(){return},
gI:function(){return"The goblin is asleep but not soundly \u2014 the floor here must be cold and uncomfortable. Taking the shield from its position on the goblin's lap will quite likely wake him up."},
gJ:function(){return!1}},
fd:{"^":"af;",
gbO:function(){return[new A.fZ(new V.lK(),new V.lL(),"Stay perfectly still","If you stop moving, the guard will go back to sleep. But in this position, staying perfectly still even for a single minute will be quite a feat. (It will cost you 1 stamina.)","guardpost_above_church_take_shield_rescue",!0,null),new A.fZ(new V.lM(),null,"Snatch the shield","You can quickly snatch the shield, jump back and prepare for a fight.","guardpost_above_church_take_shield_continuation_of_failure",!0,null)]},
gh:function(){return"guardpost_above_church_take_shield"},
ay:function(){var z=new V.dD(null,null,null)
z.m(this)
new V.lN().$1(z)
return z.q()},
b_:function(a,b){if(a!==0)return
return b.a.bC(0,new V.lO())},
b6:function(a,b){return[a.bC(0,new V.lP())]}},
tK:{"^":"a:0;",
$1:function(a){var z=$.$get$a9().ar(1073741823)
a.gbN().b=z
a.gbN().c=0
return a}},
lK:{"^":"a:26;",
$4:function(a,b,c,d){J.c3(c,"You stay frozen in place. After a while, the strain of holding the awkward position start to show. Your left leg is shaking, and a drop of sweat is forming on your nose, threatening to fall on the goblin's leg.\n\n\nFortunately, at about that moment the goblin shifts again and his expression gets visibly more relaxed. His breath is deep and regular again.\n\n\nYou deftly lift the shield, take a few slow steps back, then fix the shield on your offhand.",!0)
b.aA()
b.X(a.gi(),new V.lJ())
O.eH(a,b,c,!0)
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
$4:function(a,b,c,d){J.c3(c,"You snatch the shield and jump back next to Briana. The goblin wakes up instantly and gets his bearing suprisingly fast. He jumps up and gets into combat stance.\n\n\n\n\nYou hold the shield on your offhand and get ready to fight.",!0)
b.aA()
O.eH(a,b,c,!1)
return"GuardpostAboveChurchTakeShieldRescueSituation resolved with rescue/continuation (Snatch the shield)"}},
lN:{"^":"a:0;",
$1:function(a){var z=a.gbN().c
if(typeof z!=="number")return z.aj()
a.gbN().c=z+1
return a}},
lO:{"^":"a:0;",
$1:function(a){return a.gN()}},
lP:{"^":"a:0;",
$1:function(a){return a.gN()}},
tb:{"^":"a:5;",
$3:function(a,b,c){c.p(0,'You are Aren, a slave. You have spent three painful years inside this mountain, between the foul-smelling cave walls, and under the whip of the orcs and the goblins that live here. \n\n\nYou watch Briana straighten over Agruth\'s corpse. She smooths her hair, using a pool of Agruth\'s blood as a mirror. \n\n\n"What?" she says when she notices you\'re looking.\n\n\n_"We either go now, or die."_\n\n\nBriana spits down at the body. "He wasn\'t even the worst of them, you know."\n\n\n_"I know."_\n\n\n"They _all_ deserve this, or worse, and I like the fact we\'ll kill them by their own swords." She kicks the dead slaver in the hip. \n\n\n_"That one is already dead."_\n\n\n"I was making sure," she says, and turns her attention to the sword. "We should name it. Gods love named swords. And I refuse to carry it around referring to it as _Agruth\'s_." She makes a pained grimace when she says the orc\'s name.\n',!0)}},
tc:{"^":"a:5;",
$3:function(a,b,c){c.p(0,"",!0)}},
mD:{"^":"W;W:c<,h:d<,b,a",
G:function(a,b){var z=b.f
if(!J.e(H.F(z.length!==0?C.a.gw(z):null,"$isJ").a,"just_after_agruth_fight"))return!1
return!0},
R:[function(a,b,c){c.p(0,'_"We will call it Luck Bringer. We got lucky, and luck is our only chance to get out of this place."_\n\n\nBriana nods. "Luck Bringer it is. Now, you\'re right, let\'s just get out of here as quickly as possible."\n',!0)
O.ix(b,"Luck Bringer")
b.as("RoomRoamingSituation").cX(b,O.aa(b),"cave_with_agruth_pre",c,!1)
return H.b(a.gh())+" successfully performs NameAgruthSwordOpportunity"},"$3","gM",6,0,1],
P:[function(a,b,c){throw H.c(new P.w("Success chance is 100%"))},"$3","gL",6,0,1],
H:function(a,b){return 1},
gO:function(){return!1},
ab:function(a,b){return"Will you be successful?"},
gK:function(){return},
gI:function(){return""},
gJ:function(){return!1}},
mE:{"^":"W;W:c<,h:d<,b,a",
G:function(a,b){var z=b.f
if(!J.e(H.F(z.length!==0?C.a.gw(z):null,"$isJ").a,"just_after_agruth_fight"))return!1
return!0},
R:[function(a,b,c){c.p(0,'_"We will call it Savior. It was our first step to freedom. The sword should have killed us and instead it set us free."_\n\n\nBriana nods. "Savior it is. Now, you\'re right, let\'s just get out of here as quickly as possible."\n',!0)
O.ix(b,"Savior")
b.as("RoomRoamingSituation").cX(b,O.aa(b),"cave_with_agruth_pre",c,!1)
return H.b(a.gh())+" successfully performs NameAgruthSwordRedemption"},"$3","gM",6,0,1],
P:[function(a,b,c){throw H.c(new P.w("Success chance is 100%"))},"$3","gL",6,0,1],
H:function(a,b){return 1},
gO:function(){return!1},
ab:function(a,b){return"Will you be successful?"},
gK:function(){return},
gI:function(){return""},
gJ:function(){return!1}},
mC:{"^":"W;W:c<,h:d<,b,a",
G:function(a,b){var z=b.f
if(!J.e(H.F(z.length!==0?C.a.gw(z):null,"$isJ").a,"just_after_agruth_fight"))return!1
return!0},
R:[function(a,b,c){c.p(0,"_\"That is foolish. It is just a sword, after all.\"_\n\n\nBriana shrugs. \"Whatever, just don't ever call it _Agruth's._ I already have more respect to this piece of iron than to that worthless animal. Now, you're right, let's just get out of here as quickly as possible.\"\n",!0)
b.as("RoomRoamingSituation").cX(b,O.aa(b),"cave_with_agruth_pre",c,!1)
return H.b(a.gh())+" successfully performs NameAgruthSwordNothing"},"$3","gM",6,0,1],
P:[function(a,b,c){throw H.c(new P.w("Success chance is 100%"))},"$3","gL",6,0,1],
H:function(a,b){return 1},
gO:function(){return!1},
ab:function(a,b){return"Will you be successful?"},
gK:function(){return},
gI:function(){return""},
gJ:function(){return!1}},
t9:{"^":"a:5;",
$3:function(a,b,c){c.p(0,'Violent grunts and growls are coming through that door. Next to it, an orcish writing on the wall says "Danger mad. Give food go away."\n',!0)}},
ta:{"^":"a:5;",
$3:function(a,b,c){c.p(0,"TODO\n",!0)}},
t7:{"^":"a:5;",
$3:function(a,b,c){c.p(0,"The room is dark and wet. As you enter, the noises end. Smell of rotting flesh fills your nostrils and almost makes you vomit.\n\n\nWhen your eyes become accustomed to the dark, you see a figure standing in front of you, and next to a heap of dead bodies. You realize it's a male orc, but an especially large one, with huge muscles and many scars. His face is in constant motion, overwhelmed by tics and waves of hateful expressions.\n",!0)}},
t8:{"^":"a:5;",
$3:function(a,b,c){c.p(0,"The room is quiet. The mad guardian's huge body lies on the floor beneath the statue.\n",!0)}},
po:{"^":"W;W:c<,h:d<,b,a",
G:function(a,b){var z=b.f
if(!J.e(H.F(z.length!==0?C.a.gw(z):null,"$isJ").a,"orcthorn_room"))return!1
if(b.ao("talk_to_briana_3"))if(!b.ao(this.d))z=H.F(z.length!==0?C.a.gw(z):null,"$isJ").c!==!0
else z=!1
else z=!1
if(!z)return!1
return!0},
R:[function(a,b,c){c.p(0,'You and Briana nod at each other and start sweeping the room. The mad guardian has left many bizarre things scattered around the space. A box of severed orc hands. Crude drawings of tentacles covering one of the walls, with several gouged out eyes below it. A circle made from half-eaten rats, with a single pebble in the middle.\n\n\n"None of this makes any sense," Briana says, turning some useless apparatus made of sticks in hand. "He must _really_ have gone mad. From fear, or magic, or both."\n\n\nSoon, the last place in the room that hasn\'t been searched by either you or Briana is the large pile of rotting corpses. Mostly orcs, but there are also some human slaves, and many rats and bats. The reek of rotten flesh raises above it in visible, pale fumes. Briana hides her nose in an elbow and starts dragging out the upper, less rotten corpses. You join her.\n\n\n"The sword will be at the bottom, I bet."\n\n\n_"Of course. He tried to bury it."_\n\n\nIn what seems like hours of work, you get to the bottom. Among a slush of decayed meat, you feel something hard and cold. Pulling it uncovers a sword.\n\n\nYou fling the weapon and the green-red rot falls to the ground easily, as if it had no traction on the steel. You hold in your hand the brightest, sharpest sword you have ever seen.\n\n\n[IMG orcthorn]\n\n\n"Orcthorn," Briana nods and surveys the blade and the hilt. Gradually, she starts shaking her head. "Why would they keep the sword at all? Why wouldn\'t they destroy it? They were terrified of it."\n\n\n_"Fear. It is the ultimate authority. I do not think it was the orcs who decided to keep the sword."_\n\n\n"Well, now they can start fearing again." Briana crouches next to the corpse of the mad guardian. "And all this because of a common soldier and a farm boy," she says to the lifeless face.\n\n\n_"I am not a farm boy. And we still need to get out of here first."_\n',!0)
O.wK(b,a)
return H.b(a.gh())+" successfully performs TakeOrcthorn"},"$3","gM",6,0,1],
P:[function(a,b,c){throw H.c(new P.w("Success chance is 100%"))},"$3","gL",6,0,1],
H:function(a,b){return 1},
gO:function(){return!1},
ab:function(a,b){return"Will you be successful?"},
gK:function(){return},
gI:function(){return""},
gJ:function(){return!1}},
t5:{"^":"a:5;",
$3:function(a,b,c){c.p(0,"TODO\n",!0)}},
t6:{"^":"a:5;",
$3:function(a,b,c){c.p(0,"TODO\n",!0)}},
ov:{"^":"W;W:c<,h:d<,b,a",
G:function(a,b){var z=b.f
if(!J.e(H.F(z.length!==0?C.a.gw(z):null,"$isJ").a,"slave_quarters"))return!1
return!0},
R:[function(a,b,c){c.p(0,"TODO FIGHT\n",!0)
b.aA()
return H.b(a.gh())+" successfully performs SlaveQuartersContinue"},"$3","gM",6,0,1],
P:[function(a,b,c){throw H.c(new P.w("Success chance is 100%"))},"$3","gL",6,0,1],
H:function(a,b){return 1},
gO:function(){return!1},
ab:function(a,b){return"Will you be successful?"},
gK:function(){return},
gI:function(){return""},
gJ:function(){return!1}},
t2:{"^":"a:5;",
$3:function(a,b,c){c.p(0,"You can see Briana clutching her fists. \"Are we homesick already?\" she says. But she doesn't wait for reply, and presses on.\n\n\nIt doesn't take long before you start hearing voices. Orcs and goblins shouting commands, mostly. Then human screams.\n\n\nThe tunnel gets wider and better lit by torches. The walls are smoother. You stop down next to a small, reinforced door. Up ahead, something is happening. A human slave is running towards you. His hand is visibly broken just above the elbow and blood is streaming down his limping left leg. His lips are moving but there is no sound anymore, only pain. Eyes in tears, he doesn't see you or anything else.\n\n\nBefore you can so much as call to him, something long and sharp shoots from behind the slave, and into his back. A bloodied spearhead appears in the center of the man's chest, as if growing from there. The tearful eyes go down, looking at the fatal wound. Two more steps and the slave falls face down, the shaft of the spear protruding upwards from his back.\n\n\nAn orc and a goblin appear from the tunnel, walking towards the dead man. The orc is laughing, patting his companion on the back. \"Vicious throw, small one!\" he roars.\n\n\nYou step back and motion Briana to lean on the wall, hoping that the door's embossed frame will provide enough cover before the two slavers turn again. \n\n\nBut at that time, something or someone smashes on that very door from the inside. Then come angry growls and something akin to barking and howling.\n\n\nThe door stays shut but the two slavers are now looking directly at you. The goblin yanks his spear from the corpse, and the orc unsheathes his sword. They start towards you.\n\n\n\n\n\n\n[IMAGE goblin spearman + orc]\n",!0)}},
t3:{"^":"a:5;",
$3:function(a,b,c){c.p(0,"The small door is TODO open/close.\n\n\n",!0)
O.cC(b,c)
c.p(0,"",!0)}},
ow:{"^":"W;W:c<,h:d<,b,a",
G:function(a,b){var z=b.f
if(!J.e(H.F(z.length!==0?C.a.gw(z):null,"$isJ").a,"slave_quarters_passage"))return!1
if(!b.ao(this.d))z=H.F(z.length!==0?C.a.gw(z):null,"$isJ").c!==!0
else z=!1
if(!z)return!1
return!0},
R:[function(a,b,c){c.p(0,'Violent grunts and growls are coming through that door. Next to it, an orcish writing on the wall says "Danger mad. Give food go away."\n',!0)
return H.b(a.gh())+" successfully performs SlaveQuartersPassageExamineDoor"},"$3","gM",6,0,1],
P:[function(a,b,c){throw H.c(new P.w("Success chance is 100%"))},"$3","gL",6,0,1],
H:function(a,b){return 1},
gO:function(){return!1},
ab:function(a,b){return"Will you be successful?"},
gK:function(){return},
gI:function(){return""},
gJ:function(){return!1}},
t0:{"^":"a:5;",
$3:function(a,b,c){c.p(0,"A blast of smoke and heat greets you as you walk out of the passage and into the room. The roaring fire draws your attention to the far wall, where scores of orcs shovel coal into a giant furnace and tilt huge kettles of molten steel into white-hot rivers. This is the smelter.\n\n\n",!0)
if(O.bi(b,"war_forge"))c.p(0,"You see a smooth passage leading out of the smelter and sloping upwards. You'll be able to go there unnoticed.",!0)
c.p(0,"",!0)
if(O.bi(b,"guardpost_above_church"))c.p(0,"Not far from here there is a short tunnel, sloping down. It leads into the same room where the molten steel goes \u2014 the war forges. You'll be able to go there unnoticed.",!0)
c.p(0,"",!0)}},
t1:{"^":"a:5;",
$3:function(a,b,c){c.p(0,"The reds and whites of the molten steel reflect in the heaps of coal.\n\n\n",!0)
O.cC(b,c)
c.p(0,"",!0)}},
oz:{"^":"W;W:c<,h:d<,b,a",
G:function(a,b){var z=b.f
if(!J.e(H.F(z.length!==0?C.a.gw(z):null,"$isJ").a,"smelter"))return!1
if(b.ao(this.d))return!1
return!0},
R:[function(a,b,c){c.p(0,"The artificial rivers lead the molten iron across the room, into a large pool. From that pool, a single ogre is distributing the forge-ready liquid into troughs that descend to the war forges below. \n\n\nThe ogre is no more than a spear's throw away from you. But he doesn't notice. In fact, you realize he's blind, probably from all the molten steel around him. Yet he's performing his job without fault, listening to commands from orcs in the war forges beyond the wall, and operating the  floodgates accordingly.\n",!0)
return H.b(a.gh())+" successfully performs SmelterLookAround"},"$3","gM",6,0,1],
P:[function(a,b,c){throw H.c(new P.w("Success chance is 100%"))},"$3","gL",6,0,1],
H:function(a,b){return 1},
gO:function(){return!1},
ab:function(a,b){return"Will you be successful?"},
gK:function(){return},
gI:function(){return""},
gJ:function(){return!1}},
oA:{"^":"W;W:c<,h:d<,b,a",
G:function(a,b){var z=b.f
if(!J.e(H.F(z.length!==0?C.a.gw(z):null,"$isJ").a,"smelter"))return!1
if(!(!b.ao(this.d)&&b.ao("war_forge_watch_workers")&&b.ao("smelter_look_around")&&O.aa(b).ha(C.r)))return!1
return!0},
R:[function(a,b,c){c.p(0,'It is a long distance to the blind ogre, but you can\'t come any closer \u2014 there is the pool of molten steel between you and him, and going around it would surely make the orcs aware of your presence. You wait for the ogre to get an order from bellow and watch him open one of the gates. The molten steel starts flowing.\n\n\nYou move just a few steps closer to the ogre and withdraw the spear. \n\n\nBriana gives you a puzzled look. "Wait\u2026" she whispers.\n\n\nYou throw.\n\n\nThe spear sails over the molten steel and rams into the blind ogre\'s shoulder. Your heart skips a beat. It\'s not a killing throw. The ogre will scream, the orcs will hear it \u2014 you\'re dead. But then, the gods show mercy. The ogre wheels around, trying to reach the spear with his left hand. He gets away from the gate and tries to correct it by stepping back.\n\n\nThe last step takes him over the edge and into the pool of white-hot steel. He doesn\'t even have a chance to scream \u2014 the liquid swallows him. The orcs on the other side of the room don\'t notice.\n\n\n"Why would you do that?" Briana says with her hands thrown in the direction of the throw. "You wasted a perfectly good spear on a stupid ogre that posed no threat to us."\n\n\n_"Listen."_\n\n\nAt this point, the distant voices coming from the war forges get slightly louder. Then again. In the clamor and noise of the two rooms, the small increase in volume is almost imperceptible but Briana hears it. She looks at you and a smile starts to form on her lips. "Let\'s go," she says.\n\n\nYou pass the short passage and crouch at the walkway above the war forges. There is chaos below. Most orcs and ogres have stopped working and watch molten steel overflowing the troughs and raining down on the forges. A large part of the iron monster is obliterated and the orcs working there are either dead or running away. \n\n\nSoon, you see an orc using a rope ladder to scale the wall to the smelter. He\'ll be able to get to the gate and close it but it will take him some time to make the climb. And the damage has already been done.\n\n\n"That, my friend, was the most boring heroic deed in history." Briana seems amused, watching the havoc below. "You just threw a spear\u2026"\n\n\n_"A well placed throw."_\n\n\n"... and killed a _blind_ ogre \u2026"\n\n\n_"An important one."_\n\n\n"... a _dam_ worker. Who happened to trip and fall into molten steel."\n\n\n_"As I said, a well placed throw. The less simple you see the world, the easier it is for you to change it."_\n\n\n"Nonsense. You got lucky."\n',!0)
O.ub(b,c)
return H.b(a.gh())+" successfully performs SmelterThrowSpear"},"$3","gM",6,0,1],
P:[function(a,b,c){throw H.c(new P.w("Success chance is 100%"))},"$3","gL",6,0,1],
H:function(a,b){return 1},
gO:function(){return!1},
ab:function(a,b){return"Will you be successful?"},
gK:function(){return},
gI:function(){return""},
gJ:function(){return!1}},
rZ:{"^":"a:5;",
$3:function(a,b,c){c.p(0,"The path from slavery to power begins with a single crack of a whip. Briana wheels around, her face red with pain and anger. She is new here, but she knows what will follow. \n\n\n\n\nOnce Agruth starts whipping, the victim ends up dead. Agruth loves killing slaves. \n\n\n\n\nAnother crack and there is new blood on Briana's face. Agruth grins.\n\n\n\n\nNobody else is in sight. It's just you, Agruth and Briana. That's Agruth's main mistake.\n",!0)}},
t_:{"^":"a:5;",
$3:function(a,b,c){c.p(0,"",!0)}},
pq:{"^":"W;W:c<,h:d<,b,a",
G:function(a,b){if(!(b.dP(this.d)==null&&O.eF(b)))return!1
return!0},
R:[function(a,b,c){c.p(0,'"You were caught not too long ago, I think. What can you tell me about outside?"\n\n\n\n\nBriana: "How long have you been here?"\n\n\n\n\n"Three years."\n\n\n\n\n"Three years! Gods. A lot has happened in the last winter alone. The orcs have taken the upper valley, and make raids way beyond Fort Ironcast."\n\n\n\n\n"So when we escape from here \u2014 *if* we escape from here \u2014 we still have to cover miles of orc territory."\n\n\n\n\n"Correct. The closest safe place is the fort."\n',!0)
return H.b(a.gh())+" successfully performs TalkToBriana1"},"$3","gM",6,0,1],
P:[function(a,b,c){throw H.c(new P.w("Success chance is 100%"))},"$3","gL",6,0,1],
H:function(a,b){return 1},
gO:function(){return!1},
ab:function(a,b){return"Will you be successful?"},
gK:function(){return},
gI:function(){return""},
gJ:function(){return!1}},
pr:{"^":"W;W:c<,h:d<,b,a",
G:function(a,b){if(!(b.ao("talk_to_briana_1")&&b.dP(this.d)==null&&O.eF(b)))return!1
return!0},
R:[function(a,b,c){c.p(0,'"Where did they catch you?"\n\n\n\n\nBriana: "At the Gate of Screams. I was trying to sneak in."\n\n\n\n\n"You what?"\n\n\n\n\n"I know. It seemed like a stupid idea even then. I wanted to get in, steal back the Orcthorn, get out, help the fight."\n',!0)
return H.b(a.gh())+" successfully performs TalkToBriana2"},"$3","gM",6,0,1],
P:[function(a,b,c){throw H.c(new P.w("Success chance is 100%"))},"$3","gL",6,0,1],
H:function(a,b){return 1},
gO:function(){return!1},
ab:function(a,b){return"Will you be successful?"},
gK:function(){return},
gI:function(){return""},
gJ:function(){return!1}},
ps:{"^":"W;W:c<,h:d<,b,a",
G:function(a,b){if(!(b.ao("talk_to_briana_2")&&b.dP(this.d)==null&&O.eF(b)))return!1
return!0},
R:[function(a,b,c){c.p(0,'"What\'s Orcthorn?"\n\n\n"A sword. It has killed hundreds of orc, wielded by many different knights. Even more orcs died trying to seize it, almost to no avail."\n\n\n"Almost."\n\n\n"Yes. Last full moon, an orcish captain and a company of (TODO: alpha) warriors ambushed Lord TODO. He was the wielder of Orcthorn at that time, and they knew it. They slaughtered his company and brought the sword here, to Bloodrock. Since then, the orcs are bolder and more successful."\n\n\n"The mad guardian."\n\n\n"The mad who?"\n\n\n"That\'s what Agruth and the other slavers were talking about a couple of weeks back. One orc was tasked with guarding a sword. That seemed wierd enough to me. Guarding a sword? Stranger yet, that orc went mad after only a few days of doing this. Now they keep him in a cell, and call him _grach kamkorr_. The mad guardian. That sword is still with him. Hidden there in the cell."\n\n\n"Where is that cell?"\n\n\n"Somewhere in the slave quarters."\n',!0)
return H.b(a.gh())+" successfully performs TalkToBriana3"},"$3","gM",6,0,1],
P:[function(a,b,c){throw H.c(new P.w("Success chance is 100%"))},"$3","gL",6,0,1],
H:function(a,b){return 1},
gO:function(){return!1},
ab:function(a,b){return"Will you be successful?"},
gK:function(){return},
gI:function(){return""},
gJ:function(){return!1}},
rX:{"^":"a:5;",
$3:function(a,b,c){c.p(0,"This must be the place that the orcs call the Shafts. It's a tall, seemingly endless room, with many walkways across.\n\n\n\n\n\n\nYou realize there is really only one way out, over one of the walkways. You'll have to run, there is no hiding anymore.\n",!0)}},
rY:{"^":"a:5;",
$3:function(a,b,c){c.p(0,"",!0)}},
tM:{"^":"a:5;",
$3:function(a,b,c){c.p(0,'Almost as soon as you lose the circular room from sight, loud yells and shouting rises from the deep of the mountain. You hurry up, taking the high stairs by two. The voices from below quiet down a bit, and now you can hear stomping of dozens of orc and goblin feet.\n\n\nThe air gets colder and fresher, but there\'s still no end in sight, and the stairs are now so high that the climb feels like walking up a ladder.\n\n\n"I have\u2026" Briana gasps, trying to catch her breath. "I have not fought my way through the depths of mount bloodrock just to die of exhaution on its doorstep."\n\n\n_"That\u2026 that would be disappointing, yes."_\n\n\nThe sounds from behind get louder. You can now pick out individual voices, although not what they say. The stairway suddenly makes a sharp left and levels out. Tasting blood on the roof of your mouth, your whole body demands to stop \u2014 but you start running anyway. Briana closely follows.\n\n\nThe light in the tunnel gets brighter and the air colder. Then, suddenly, an orc and a goblin jump in front of you from a slimy crevice, swords in hands. \n\n\n![Orc and Goblin](img/orc_and_goblin_sketch.jpg)\n\n\nThis must be the guard of the Upper Door. There is no way around them.\n',!0)}},
tN:{"^":"a:5;",
$3:function(a,b,c){c.p(0,"",!0)}},
tB:{"^":"a:5;",
$3:function(a,b,c){c.p(0,"You enter something that at first looks like a large, twisting cave, but then opens into a high room with many columns. This must be what the orcs call the Underground Church. Your bare footsteps reverberate around the space, so you slow down to quiet them. There are no windows, of course, you are deep underground, but there is dim light coming from the far end of the place, where you expect the altar to be but can't quite see it. No torches here. Quiet. \n\n\n",!0)
if(O.bi(b,"cave_with_agruth"))c.t(0,"After a bit of searching, you also notice a twisty passage going from the right hand side of the Church and sloping upwards. That must be the way out.")
c.p(0,"",!0)
if(O.bi(b,"guardpost_above_church"))c.t(0,"Not far from here, a tunnel leads slightly downwards, to where you killed Agruth.")
c.p(0,"",!0)}},
tL:{"^":"a:5;",
$3:function(a,b,c){c.p(0,"The temple stands silent, as if holding breath.\n\n\n",!0)
O.cC(b,c)
c.p(0,"",!0)}},
lc:{"^":"W;W:c<,h:d<,b,a",
G:function(a,b){var z=b.f
if(!J.e(H.F(z.length!==0?C.a.gw(z):null,"$isJ").a,"underground_church"))return!1
if(b.ao(this.d))return!1
return!0},
R:[function(a,b,c){c.p(0,'This place was not built by the orcs or their slaves. Walls are straight and smooth. The columns are decorated with delicate embossments of skulls and tentacles.\n\n\n"What are these things?" Briana whispers.\n\n\n_"This place worships the Dead Prince."_\n\n\nSaying the name brings coldness and sweat. You hear the name every night in the Dead Prince\'s tongue \u2014 but it has been a long time since you said it yourself.\n\n\n"Worships?" Briana looks up at the high ceiling, then around the temple. "I though the Dead Prince was a warlord. A shaman. Something like that."\n\n\n_"He is god."_\n\n\n',!0)
if(!b.ao("wait_for_ritual"))c.p(0,"Briana smirks. \"Look, no. The Dead Prince is no god. The orcs might think so, you shouldn't. He's some talented illusionist at best.\" ",!0)
c.p(0,'\nThe glow coming from the altar dims for a moment, then lights up again.\n\n\n_"He is worse than god. He is fear itself."_\n\n\nBriana looks at you, narrowing her eyes.\n\n\n_"I think you have felt it."_\n',!0)
return H.b(a.gh())+" successfully performs ExamineUndergroundChurch"},"$3","gM",6,0,1],
P:[function(a,b,c){throw H.c(new P.w("Success chance is 100%"))},"$3","gL",6,0,1],
H:function(a,b){return 1},
gO:function(){return!1},
ab:function(a,b){return"Will you be successful?"},
gK:function(){return},
gI:function(){return""},
gJ:function(){return!1}},
tf:{"^":"a:5;",
$3:function(a,b,c){c.p(0,'The altar is a simple block of stone at the back of the temple. On the wall above it, there is a large ornament portraying an octopus with eight tentacles and eight black eyes at their tips. It\'s the sign of the Dead Prince. You have never seen it in real life but you know it well.\n\n\n"You\'re brave, my friend," Briana whispers. "I\'ll give you that. But if we must linger in this mountain, I\'d much rather kill some orcs than spy around a temple."\n\n\n_"You hate orcs? This is what made them."_\n\n\nBriana opens her mouth to reply, but at that point the otherwise steady light from the altar flickers like a flame, and you both slip behind a large column to move out of sight. A spear that lies here on the ground almost trips you up.\n',!0)}},
tq:{"^":"a:5;",
$3:function(a,b,c){c.p(0,"The altar glows with a dim red light that reflects in the eight black eyes above it.\n",!0)}},
pI:{"^":"W;W:c<,h:d<,b,a",
G:function(a,b){var z=b.f
if(!J.e(H.F(z.length!==0?C.a.gw(z):null,"$isJ").a,"underground_church_altar"))return!1
if(b.ao(this.d))return!1
return!0},
R:[function(a,b,c){c.p(0,'You move to a shadow and wait. After a few heartbeats, there is a scraping sound of stone against stone. You lean out from your hiding and see a part of the wall to the right of the altar opening.\n\n\nAn orc priest, tall and pale, enters from the stone door. At that time, the whole temple reverberates with a strong, dissonant tone that is somehow both sickening and appealing at the same time. It\'s like a groan of some large beast awakening.\n\n\nAfter the priest, a huge creature enters through the door, crouching below the frame. It\'s unclear what it is, but possibly some large breed of ogre, and judging by the braided hair, a female. Her sword \u2014 attached to her hip with a rope \u2014 is as long as you are tall. \n\n\nWhen she enters the temple and unbends, you can see that she leads someone on a chain. An orc. Despite being a strong one, probably a captain or even a chieftain, he is dwarfed by the creature before him, and he visibly shakes in horror.\n\n\nThe three of them \u2014 the priest, the ogre and the orc \u2014 go around the altar and stop before it, facing the symbol of the octopus, and away from you and Briana. The dissonant tone stops. You lean a little further out from your hiding, to have a better view.\n\n\nWithout words, the priest beckons the orc to lie at the altar. The orc is now shaking uncontrollably, but complies. You can hear his fitful breath, the rustle of his body against the stone as he glides into position, and nothing else.\n\n\nWhen the orc lies on the altar, the female ogre walks up to him and places her hands on his shoulders, pinning him down.\n\n\n_"Maggots."_\n\n\nSomehow, you know. Briana gives you a puzzled look, then turns back to the altar. From the shadows in the base of the altar, a swarm of large black insects starts to make its way to the top, towards the terrified orc. The priest lifts his arms as if in silent worship.\n\n\nThe ogre pushes down, preparing for the inevitable struggle. The orc senses it, tenses up and opens his mouth to scream.\n\n\nBut the scream doesn\'t come. Instead of it, the dissonant tone sounds again, more powerful than before.\n\n\nThe maggots crawl over the edge of the altar\'s top, onto the orc\'s body, heading straight towards his face. They move faster now.\n\n\n\n\nThe orc\'s eyes go wide. He struggles against the ogre\'s grip, pointlessly. The dissonant tone gets even louder. The temple quivers. The sound permeates everything.\n\n\nThis has a strange effect on you. Suddenly, the terror of the moment is fully replaced by something of an opposite \u2014 an invigorating feeling of power. You breathe in and feel stronger, refreshed. (Your stamina increases by +1.)\n\n\nYou notice that the priest takes a deep breath as well.\n\n\nThen, suddenly, the sound stops, and the orc\'s body sinks. The invigorating feeling is gone. You realize the maggots have eaten through the orc\'s eyes and cheeks, and that they are now scuttling back to the base of the altar.\n\n\nThe priest puts his arms down again, and \u2014 without ceremony \u2014 heads back to the stone door. The ogre takes the orc\'s dead body, puts it over her shoulder, and follows. In a few heartbeats, they are all gone and the door is closed. A new splash of blood on the altar is the only reminder of the scene.\n\n\nBriana doesn\'t look at you. "How did you know it would be maggots?"\n\n\n_"I do not know."_\n\n\n"Is this\u2026 I _felt_ that sound, somehow. I _felt_ it."\n\n\n_"This place does something weird to people."_\n\n\n"And if that orc was meant to be an offering, why did they not leave the body?" Briana shakes her head, still not looking at you. "Let\'s\u2026 let\'s just get out of here."\n',!0)
O.ir(b,1)
return H.b(a.gh())+" successfully performs WaitForRitual"},"$3","gM",6,0,1],
P:[function(a,b,c){throw H.c(new P.w("Success chance is 100%"))},"$3","gL",6,0,1],
H:function(a,b){return 1},
gO:function(){return!1},
ab:function(a,b){return"Will you be successful?"},
gK:function(){return},
gI:function(){return""},
gJ:function(){return!1}},
pp:{"^":"W;W:c<,h:d<,b,a",
G:function(a,b){var z=b.f
if(!J.e(H.F(z.length!==0?C.a.gw(z):null,"$isJ").a,"underground_church_altar"))return!1
if(b.ao(this.d))return!1
return!0},
R:[function(a,b,c){c.p(0,"It's a primive short spear that probably belonged to some goblin. You take it in your hand, feeling the wet wood and the patches of mire along its length. It must have been here for a while. \n\n\nBut it feels right in your hand, a good throwing weapon.\n",!0)
O.uO(b)
return H.b(a.gh())+" successfully performs TakeSpearInUndergroundChurch"},"$3","gM",6,0,1],
P:[function(a,b,c){throw H.c(new P.w("Success chance is 100%"))},"$3","gL",6,0,1],
H:function(a,b){return 1},
gO:function(){return!1},
ab:function(a,b){return"Will you be successful?"},
gK:function(){return},
gI:function(){return""},
gJ:function(){return!1}},
rU:{"^":"a:5;",
$3:function(a,b,c){c.p(0,"You enter the enormous cave that holds Mount Bloodrock's war forges. This space is so vast that it has its own climate, with dark clouds covering most of the ceiling, and what looks like black rain falling in the distance. Weird bats are circling just below the clouds, their shrieks mixing with the clangs of steel and angry shouts below.\n\n\n",!0)
if(O.bi(b,"cave_with_agruth"))c.p(0,"You and Briana duck behind some carts on a walkway above the floor of the cave. You can see that the walkway leads up a flight of stairs that hugs one side of the cave, and into a large stone wall. This must be the way through the smelter, and towards the Upper Door. Thankfully, there is nobody in the way. ",!0)
c.p(0,"\n",!0)
if(O.bi(b,"smelter"))c.p(0,"You and Briana stand on a walkway way above the floor of the cave. You can see the walkway leads down a flight of stairs that hugs one side of the cave, towards the bottom. Down there, you recognize a passage in the rock that you know must descend deeper into the mountain, towards the slave quarters, and therefore to where you slayed Agruth. There is nobody in the way. ",!0)
c.p(0,"",!0)}},
t4:{"^":"a:5;",
$3:function(a,b,c){c.p(0,"The air in the war forges is heavy and the noise overwhelming.\n\n\n",!0)
O.cC(b,c)
c.p(0,"",!0)}},
pJ:{"^":"W;W:c<,h:d<,b,a",
G:function(a,b){var z=b.f
if(!J.e(H.F(z.length!==0?C.a.gw(z):null,"$isJ").a,"war_forge"))return!1
if(b.ao(this.d))return!1
return!0},
R:[function(a,b,c){c.p(0,"The cave is natural, but on the side of the smelter there is an artificial wall, like a stone dam. From an opening high on that wall, suspended troughs of molten steel descend into all parts of the room like huge fiery tentacles. \n\n\nAt the end of each of the troughs, teams of orcs pour the steel into molds for axes, war hammers, and greatswords. The clamor of hammers hitting anvils is deafening, and the strong smell of iron and soot is almost stronger than the smell of all that orc sweat.\n",!0)
return H.b(a.gh())+" successfully performs WarForgeLookAround"},"$3","gM",6,0,1],
P:[function(a,b,c){throw H.c(new P.w("Success chance is 100%"))},"$3","gL",6,0,1],
H:function(a,b){return 1},
gO:function(){return!1},
ab:function(a,b){return"Will you be successful?"},
gK:function(){return},
gI:function(){return""},
gJ:function(){return!1}},
pK:{"^":"W;W:c<,h:d<,b,a",
G:function(a,b){var z=b.f
if(!J.e(H.F(z.length!==0?C.a.gw(z):null,"$isJ").a,"war_forge"))return!1
if(!(!b.ao(this.d)&&b.ao("war_forge_look_around")))return!1
return!0},
R:[function(a,b,c){c.p(0,'You crane your neck from your hiding and take the scene in. More likely than not, no human has ever seen this place and lived to tell the tale.\n\n\nBriana shakes her head: "The orcs are working together with ogres. They must be terrified."\n\n\nYou scan the workers, noticing the slow-moving ogres that tower over the orcs. "And they don\'t use slaves here," you say. "There must be something important going on here." Looking again at the molds they are using, you don\'t see anything out of the expected. Primitive axes and swords, some armor.\n\n\n"What is that thing!" Briana gasps. You follow her stare and at first all you see is just a cluster of slightly larger forges. Then you squint and an image appears. An image of an enormous, repulsive, half-assembled insect. Each leg, or whatever they are, is as long as a good rock\'s throw. There are eight of them. Then there\'s the body \u2014 a huge cockroach-like contraption. The teeth of steel are already completed, sharp and menacing and as long as a man. \n\n\nA full-sized ogre is pouring water over one part of the form just now, producing a cloud of steam. You can\'t see much else. From the high opening in the smelter wall, molten steel is starting to flow down to fill another part of the iron monster.\n',!0)
return H.b(a.gh())+" successfully performs WarForgeWatchWorkers"},"$3","gM",6,0,1],
P:[function(a,b,c){throw H.c(new P.w("Success chance is 100%"))},"$3","gL",6,0,1],
H:function(a,b){return 1},
gO:function(){return!1},
ab:function(a,b){return"Will you be successful?"},
gK:function(){return},
gI:function(){return""},
gJ:function(){return!1}},
q0:{"^":"fd;i:a<,V:b<",
a2:function(a){var z=new V.dD(null,null,null)
z.m(this)
a.$1(z)
return z.q()},
A:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof V.fd))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
y=z==null?y==null:z===y
z=y}else z=!1
return z},
gB:function(a){return Y.U(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)))},
k:function(a){return"GuardpostAboveChurchTakeShieldRescueSituation {id="+J.h(this.a)+",\ntime="+J.h(this.b)+",\n}"}},
dD:{"^":"d;a,b,c",
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
z=new V.q0(y,x)
if(y==null)H.i(P.m("id"))
if(x==null)H.i(P.m("time"))}this.m(z)
return z}}}],["","",,O,{"^":"",
xK:[function(a){var z,y
z=$.$get$dr()
y=z.C
if(y.length>0){y+=" "
z.C=y}z.C=y+a},"$1","vh",2,0,16],
xP:[function(a){$.eD=a},"$1","vi",2,0,16],
ia:[function(a,b,c,d,e,f,g){var z=L.f2(a,!1,!1,d,e,f,g)
$.$get$c_().t(0,z)
return z},function(a){return O.ia(a,!1,!1,null,null,null,null)},function(a,b,c){return O.ia(a,!1,!1,null,b,c,null)},"$7$deferToChoiceList$deferToEndOfPage$goto$helpMessage$script$submenu","$1","$3$helpMessage$script","vg",2,13,53,0,0,0,1,1,0],
nU:{"^":"o5;",
bB:function(){var z=0,y=P.aC(),x,w=2,v,u=[],t=this,s,r,q,p,o,n,m,l,k,j
var $async$bB=P.ay(function(a,b){if(a===1){v=b
z=w}while(true)switch(z){case 0:if($.cs){n=t.Q
n.toString
m=new A.u(667,null,null,null,null)
m.c="Sending updated stats."
n.a.F(m.E())
m=t.Q
n=Z.oJ()
m.toString
l=new A.u(100,null,null,null,null)
l.e=n.E()
m.a.F(l.E())
new P.H(0,$.r,null,[null]).bD(!0)}if(t.r){n=t.Q
n.toString
m=new A.u(667,null,null,null,null)
m.c="Saving player chronology."
n.a.F(m.E())
t.r=!1
m=t.Q
m.toString
n=new A.u(60,null,null,null,null)
n.b=t.f.cv(0)
m.a.F(n.E())}s=null
case 3:n=t.Q
n.toString
m=new A.u(667,null,null,null,null)
m.c="Calling _goOneStep()."
n.a.F(m.E())
w=7
z=10
return P.ax(t.cG(),$async$bB)
case 10:s=b
w=2
z=9
break
case 7:w=6
j=v
n=H.C(j)
if(n instanceof M.cK){r=n
q=H.E(j)
n=t.Q
m=H.b(r)+"\nStacktrace: "+H.b(q)
n.toString
l=new A.u(666,null,null,null,null)
l.c="AuthorScriptException: "+m
n.a.F(l.E())
z=1
break}else{p=n
o=H.E(j)
n=t.Q
m=H.b(p)+"\nStacktrace: "+H.b(o)
n.toString
l=new A.u(666,null,null,null,null)
l.c="Unknown Error (probably in egamebook itself): "+m
n.a.F(l.E())
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
n.a.F(m.E())
case 1:return P.aJ(x,y)
case 2:return P.aI(v,y)}})
return P.aK($async$bB,y)},
eY:function(){var z,y
this.fA()
this.f.bh(0)
this.r=!0
this.e=this.c
z=this.Q
Z.hz(Z.bR())
z.toString
y=new A.u(90,null,null,null,null)
y.b=Z.bR()
z.a.F(y.E())
this.bB()},
lh:[function(a){var z,y
z={}
z.a=null
y=$.$get$c_()
y.Z(0,new O.og(z,this,a))
z=z.a
if(z==null)throw H.c(P.G("The sent choice hash ("+H.b(a)+") is not one of those offered ("+J.h(y)+")"))
this.iY(z)
this.bB()},"$1","giJ",2,0,34],
iY:function(a){var z
if(a.gh4()!=null){z=a.r
$.$get$cy().aE(z)}z=a.x
if(z!=null)this.es(z)},
cG:function(){var z=0,y=P.aC(),x,w=[],v=this,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c
var $async$cG=P.ay(function(a,a0){if(a===1)return P.aI(a0,y)
while(true)switch(z){case 0:u={}
r=$.$get$cz()
q=r.b
if(q.b!==q.c){u=v.Q
u.toString
q=new A.u(667,null,null,null,null)
q.c="Awarding points."
u.a.F(q.E())
p=r.b.dL()
r=v.Q
q=p.gjv()
u=p.b
o=p.c
r.toString
n=new A.u(70,null,null,null,null)
n.b=[q,u]
n.c=o
r.a.F(n.E())
r=new P.H(0,$.r,null,[null])
r.bD(null)
r.c6(new O.o6(v))
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
o.a.F(k.E())
k=$.$get$c_()
k.iG(new O.o7(v),!1)
if(k.gl(k)!==0){r=v.Q
r.toString
o=new A.u(667,null,null,null,null)
o.c="We have choices."
r.a.F(o.E())
o=H.y(k,"ba",0)
o=P.P(new H.K(k,new O.o8(u,l),[o]),!0,o)
r=k.a
H.p([],[L.ad])
j=new L.f3(r,o)
if(!j.gY(j)){u=v.Q
r=u.e
if(r!=null){r.dC(new D.c5("Showing new choice before previous one was selected."))
u.e=null}r=P.t
u.e=new P.ct(new P.H(0,$.r,null,[r]),[r])
r=j.dS()
u.a.F(r.E())
u=u.e.a.c6(v.giJ())
i=new O.o9(v)
r=H.l(u,0)
q=$.r
if(q!==C.i){i=P.ev(i,q)
q.toString}u.dj(new P.em(null,new P.H(0,q,null,[r]),6,new O.oa(),i,[r,r]))
x=!0
z=1
break}else{h=k.aU(0,new O.ob(),new O.oc())
if(h!=null){if(h.gh4()!=null){r=h.r
$.$get$cy().aE(r)}r=h.x
if(r!=null)v.es(r)
k.a3(0,h)}}}r=$.$get$cy()
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
return P.ax(v.cH(f),$async$cG)
case 5:x=a0
z=1
break
case 4:r=$.eD
if(r!=null){v.es(r)
$.eD=null
x=!1
z=1
break}r=v.x
if(r==null){v.x=0
r=0}else if(r===q){r=v.e.gaB().length-1
v.x=r}else if($.hX)$.hX=!1
else{++r
v.x=r}u.a=r===v.e.gaB().length-1
r="Resolving block: '"+H.b(v.e.gh())+"' block "+H.b(v.x)+"."
q=v.Q
q.toString
o=new A.u(667,null,null,null,null)
o.c=r
q.a.F(o.E())
if(v.x===v.e.gaB().length){u=v.Q
u.toString
r=new A.u(667,null,null,null,null)
r.c="End of book."
u.a.F(r.E())
r=v.Q
u=v.ea()
r.toString
u=u.f0(50)
r.a.F(u.E())
v.Q.a.F(new A.u(80,null,null,null,null).E())
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
u.f=new P.ct(new P.H(0,$.r,null,[r]),[r])
r=new A.u(30,null,null,null,null)
r.c=q
u.a.F(r.E())
u.f.a.c6(new O.od(v))
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
r.a.F(q.E())
try{r=v.e.gaB()
q=v.x
if(q>>>0!==q||q>=r.length){x=H.f(r,q)
z=1
break}k.jt(r[q])}catch(b){u=H.C(b)
if(u instanceof M.cK){t=u
s=H.E(b)
u=v.Q
r=H.b(t)+"\nStacktrace: "+H.b(s)
u.toString
q=new A.u(666,null,null,null,null)
q.c="AuthorScriptException: "+r
u.a.F(q.E())
x=!0
z=1
break}else throw b}r=v.Q
r.toString
q=new A.u(667,null,null,null,null)
q.c="- choices added"
r.a.F(q.E())
if(k.bt(0,new O.oe(u,v))&&v.x===v.e.gaB().length-1){u=v.Q
u.toString
r=new A.u(667,null,null,null,null)
r.c="Creating & sending savegame"
u.a.F(r.E())
r=v.Q
u=v.ea()
r.toString
u=u.f0(50)
r.a.F(u.E())
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
r={func:1,ret:[P.Q,P.au]}
z=H.az(q,r)?12:14
break
case 12:d=v.x===v.e.gaB().length-1?v.ea():null
q=v.e.gaB()
o=v.x
if(o>>>0!==o||o>=q.length){x=H.f(q,o)
z=1
break}z=15
return P.ax(v.cH(H.ij(q[o],r)),$async$cG)
case 15:c=a0
if(k.bt(0,new O.of(u,v))&&v.x===v.e.gaB().length-1){u=v.Q
u.toString
r=d.f0(50)
u.a.F(r.E())}x=c
z=1
break
z=13
break
case 14:u=v.e.gaB()
r=v.x
if(r>>>0!==r||r>=u.length){x=H.f(u,r)
z=1
break}throw H.c(new P.w("Invalid block: "+H.b(u[r])))
case 13:case 10:case 7:case 1:return P.aJ(x,y)}})
return P.aK($async$cG,y)},
es:function(a){var z,y,x,w,v
z=$.$get$cO()
if(z.b.test(H.bz(a))){y=this.d
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
this.r=!0}if(this.f.a7(0,H.b(this.e.gh())+">>"+H.b(x.gh()))||x.ghE()){z=this.d
y=z==null
if((y?null:z.a)!=null)z=!(y?null:z.a).ghE()
else z=!1}else z=!1
$.hV=z
z="Points embargo = "+z
y=this.Q
y.toString
v=new A.u(667,null,null,null,null)
v.c=z
y.a.F(v.E())
v=this.e
this.d=new O.nV(v,this.x)
this.e=x
this.x=w
v.e=J.ap(v.gdT(),1)},
fA:function(){var z,y,x,w,v,u
this.x=null
$.$get$cy().bh(0)
$.$get$c_().sl(0,0)
$.rz=null
x=$.$get$cE()
x.bh(0)
w=$.$get$cz()
x.n(0,"points",w)
w.a=0
w.b.bh(0)
this.b.jx()
$.iu=!0
try{this.kf()}catch(v){z=H.C(v)
y=H.E(v)
x=this.Q
w=H.b(z)+"\n"+H.b(y)
x.toString
u=new A.u(666,null,null,null,null)
u.c="Author Exception in initBlock() (<variables>): "+w
x.a.F(u.E())
throw H.c(z)}this.hp()
$.iu=!1},
cH:function(a){var z=0,y=P.aC(),x,w=2,v,u=[],t=this,s,r,q,p,o,n,m
var $async$cH=P.ay(function(b,c){if(b===1){v=c
z=w}while(true)switch(z){case 0:q=$.$get$dr()
q.C=""
w=4
z=7
return P.ax(a.$0(),$async$cH)
case 7:w=2
z=6
break
case 4:w=3
m=v
s=H.C(m)
r=H.E(m)
q.C+="<code><pre>ERROR: "+H.b(s)+"\n\n"+H.b(r)+"</pre></code>"
q=J.h(s)
o=t.e.gh()
n=t.x
throw H.c(new M.cK(q,o,n))
z=6
break
case 3:z=2
break
case 6:if(q.C.length!==0){t.Q.f9(J.h(q)).c6(new O.oh(t))
x=!0
z=1
break}else{x=!1
z=1
break}case 1:return P.aJ(x,y)
case 2:return P.aI(v,y)}})
return P.aK($async$cH,y)},
iQ:[function(a){var z,y,x,w
z=a.x
if(z==null)return!1
if($.$get$cO().b.test(H.bz(z)))return!1
y=this.b.dX(z,this.e.gdZ())
if(y==null){z="Target page '"+H.b(z)+"' was not found."
x=this.Q
x.toString
w=new A.u(667,null,null,null,null)
w.c=z
x.a.F(w.E())
return!0}y.gl8()
return!1},"$1","gfE",2,0,35],
ea:function(){var z,y,x,w,v,u
this.hp()
try{x=this.e.gh()
w=$.$get$cE()
x=new Z.fU(x,this.b.jS(),null,null,null,null)
x.c=H.aN(Z.d3(w),"$isI",[P.q,P.d],"$asI")
x.f=Date.now()
x.e=C.e.l5(H.aF(x),16)
return x}catch(v){z=H.C(v)
y=H.E(v)
x=this.Q
w=H.b(z)+"\n"+H.b(y)
x.toString
u=new A.u(666,null,null,null,null)
u.c="Error when creating savegame: "+w
x.a.F(u.E())
throw H.c(z)}},
hf:function(a,b){var z,y,x
this.fA()
z=this.b
y=z.a
if(y.j(0,a.a)==null)throw H.c(new Z.dE("Trying to load page '"+H.b(a.a)+"' which doesn't exist in current egamebook."))
this.e=y.j(0,a.a)
this.x=this.y
y=this.Q
y.toString
x=new A.u(667,null,null,null,null)
x.c="Importing state from savegame."
y.a.F(x.E())
z.kc(a.b)
if(b!=null){z=this.Q
z.toString
y=new A.u(667,null,null,null,null)
y.c="Importing player chronology."
z.a.F(y.E())
this.f.ax(0,b)}z=this.Q
z.toString
y=new A.u(667,null,null,null,null)
y.c="Copying save variables into vars."
z.a.F(y.E())
y=$.$get$cE()
Z.nR(a,y,P.dO(P.q,P.bH))
this.cx=H.F(y.j(0,"game"),"$isf8")
this.cy=H.aN(y.j(0,"hitpoints"),"$isav",[P.aX],"$asav")
z=[P.t]
this.db=H.aN(y.j(0,"stamina"),"$isav",z,"$asav")
this.dx=H.aN(y.j(0,"gold"),"$isav",z,"$asav")
z=this.Q
Z.hz(Z.bR())
z.toString
y=new A.u(90,null,null,null,null)
y.b=Z.bR()
z.a.F(y.E())
y=this.Q
y.toString
z=new A.u(667,null,null,null,null)
z.c="loadFromSaveGame() done."
y.a.F(z.E())
this.bB()},
kw:function(a){return this.hf(a,null)},
e0:[function(a,b,c,d){var z=0,y=P.aC(),x,w=this,v,u,t
var $async$e0=P.ay(function(e,f){if(e===1)return P.aI(f,y)
while(true)switch(z){case 0:v=$.$get$dr()
if(v.C.length!==0){w.Q.f9(J.h(v))
v.C=""}v=w.Q
v.toString
u=new A.u(130,null,null,null,null)
u.b=[a,b,d,c]
v.a.F(u.E())
u=U.cq
t=new P.H(0,$.r,null,[u])
v.x=new P.ct(t,[u])
x=t
z=1
break
case 1:return P.aJ(x,y)}})
return P.aK($async$e0,y)},function(a,b){return this.e0(a,b,null,!1)},"ld","$4$rerollEffectDescription$rerollable","$2","gi0",4,5,54,1,0]},
og:{"^":"a:0;a,b,c",
$1:function(a){var z,y,x,w
a.sfa(!0)
if(a.d===this.c){z="Found choice that was selected: "+a.e
y=this.b.Q
y.toString
x=new A.u(667,null,null,null,null)
x.c=z
y.a.F(x.E())
this.a.a=a}else{z=a.x
if(z!=null){y=this.b
w=$.$get$cO().b.test(H.bz(z))?y.d.a:y.b.dX(z,y.e.gdZ())
if(w!=null){y.f.t(0,H.b(y.e.gh())+">>"+H.b(w.gh()))
y.r=!0}}}}},
o6:{"^":"a:0;a",
$1:function(a){return this.a.bB()}},
o7:{"^":"a:0;a",
$1:function(a){return a.gfa()||this.a.iQ(a)}},
o8:{"^":"a:37;a,b",
$1:function(a){return a.km(this.b,this.a.a)}},
o9:{"^":"a:0;a",
$1:function(a){var z,y,x
z=H.b(a)
y=this.a.Q
y.toString
x=new A.u(667,null,null,null,null)
x.c=z
y.a.F(x.E())
return}},
oa:{"^":"a:0;",
$1:function(a){return a instanceof D.c5}},
ob:{"^":"a:0;",
$1:function(a){return a.gkn()}},
oc:{"^":"a:2;",
$0:function(){return}},
od:{"^":"a:0;a",
$1:function(a){return this.a.bB()}},
oe:{"^":"a:0;a,b",
$1:function(a){return a.dE(!0,this.a.a,this.b.gfE())}},
of:{"^":"a:0;a,b",
$1:function(a){return a.dE(!0,this.a.a,this.b.gfE())}},
oh:{"^":"a:0;a",
$1:function(a){return this.a.bB()}},
ne:{"^":"d;a,b,fY:c<",
jj:function(a,b,c){var z
if(!$.hV){z=J.ap(this.a,b)
this.a=z
this.b.aE(new A.d_(b,z,c))}},
t:function(a,b){return this.jj(a,b,null)},
aj:function(a,b){this.t(0,b)
return this},
E:function(){return P.a0(["points",this.a])},
hD:function(a){this.a=a.j(0,"points")
this.b.bh(0)},
ib:function(){this.b=P.bb(null,A.d_)},
$ise9:1},
d4:{"^":"mY;aB:d<,dT:e@,a,b,c",
ghE:function(){return J.ac(this.e,0)}},
nV:{"^":"d;a,b"},
o1:{"^":"d;a",
j:function(a,b){return this.a.j(0,b)},
dX:function(a,b){var z
if(b!=null&&this.a.ad(b+": "+H.b(a)))return this.a.j(0,H.b(b)+": "+H.b(a))
else{z=this.a
if(z.ad(a))return z.j(0,a)
else return}},
n:function(a,b,c){this.a.n(0,b,c)
c.sh(b)},
jS:function(){var z=new H.R(0,null,null,null,null,null,0,[P.q,null])
this.a.Z(0,new O.o3(z))
return z},
kc:function(a){a.Z(0,new O.o4(this))},
jx:function(){this.a.Z(0,new O.o2())}},
o3:{"^":"a:6;a",
$2:function(a,b){this.a.n(0,a,P.a0(["visitCount",b.gdT()]))}},
o4:{"^":"a:6;a",
$2:function(a,b){var z=this.a.a
if(z.ad(a))z.j(0,a).sdT(J.aB(b,"visitCount"))}},
o2:{"^":"a:6;",
$2:function(a,b){b.sdT(0)}}}],["","",,M,{"^":"",cK:{"^":"d;a,b,c",
k:function(a){return"AuthorScriptException at page '"+H.b(this.b)+"', block #"+H.b(this.c)+": "+H.b(this.a)},
v:{
eX:function(a){return new M.cK(a,null,null)}}}}],["","",,M,{"^":"",o5:{"^":"d;"}}],["","",,Z,{"^":"",fU:{"^":"d;a,b,c,d,e,f",
f0:function(a){var z
if(a!==50&&a!==1020)throw H.c("Cannot create Message of type "+a+". Can only be MSG_SAVE_GAME (50) or MSG_LOAD_GAME (1020).")
z=new A.u(a,null,null,null,null)
z.c=this.dR()
return z},
dR:function(){var z,y
z=new H.R(0,null,null,null,null,null,0,[P.q,null])
z.n(0,"uid",this.e)
z.n(0,"currentPageName",this.a)
z.n(0,"pageMapState",this.b)
z.n(0,"vars",this.c)
z.n(0,"timestamp",this.f)
y=this.d
if(y!=null)z.n(0,"previousText",y)
return C.w.h2(z)},
k:function(a){return this.dR()},
v:{
fV:function(a){var z,y
if(a!=null)if(typeof a!=="string"){if(typeof a!=="number"||Math.floor(a)!==a)if(typeof a!=="number")if(typeof a!=="boolean"){z=J.o(a)
z=!!z.$isN||!!z.$isI}else z=!0
else z=!0
else z=!0
y=z}else y=!0
else y=!0
if(y)return!0
return!!J.o(a).$ise9},
d3:function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"&&Math.floor(a)===a||typeof a==="number"||typeof a==="boolean")return a
else{z=J.o(a)
if(!!z.$isN){y=[]
for(x=0;x<z.gl(a);++x)if(Z.fV(z.j(a,x)))y.push(Z.d3(z.j(a,x)))
return y}else if(!!z.$isI){w=new H.R(0,null,null,null,null,null,0,[null,null])
z.Z(a,new Z.nQ(a,w))
return w}else if(!!z.$ise9){v=a.E()
v.n(0,"_class",a.gfY())
return Z.d3(v)}else throw H.c("Function _dissolveToPrimitivess called with a non-saveable argument type.")}},
d2:function(a,b,c){var z,y,x,w,v,u
if(a==null||typeof a==="string"||typeof a==="number"&&Math.floor(a)===a||typeof a==="number"||typeof a==="boolean")return a
else{z=J.o(a)
if(!!z.$isN){y=[]
for(x=0;x<z.gl(a);++x)y.push(Z.d2(z.j(a,x),b,null))
return y}else{w=!!z.$isI
if(w&&!a.ad("_class")){v=new H.R(0,null,null,null,null,null,0,[null,null])
z.Z(a,new Z.nP(b,v))
return v}else if(w&&a.ad("_class"))if(c!=null){c.hD(a)
return c}else{u=z.j(a,"_class")
if(!b.ad(u))throw H.c(new Z.dE("Constructor for "+H.b(u)+" not set. Cannot assemble a new instance."))
else return b.j(0,u).$1(a)}else throw H.c("Function _assembleFromPrimitives called with a non-primitive argument type.")}}},
nR:function(a,b,c){a.c.Z(0,new Z.nS(b,c))}}},nQ:{"^":"a:6;a,b",
$2:function(a,b){if(Z.fV(this.a.j(0,a)))this.b.n(0,a,Z.d3(b))}},nP:{"^":"a:6;a,b",
$2:function(a,b){this.b.n(0,a,Z.d2(b,this.a,null))}},nS:{"^":"a:38;a,b",
$2:function(a,b){var z,y,x
z=this.a
y=z.j(0,a)
x=this.b
if(y==null)z.n(0,a,Z.d2(b,x,null))
else z.n(0,a,Z.d2(b,x,y))}},dE:{"^":"d;a",
k:function(a){return"IncompatibleSavegameException: "+this.a}},lW:{"^":"d;a",
k:function(a){return"InvalidSavegameException: "+this.a}}}],["","",,D,{"^":"",nk:{"^":"d;"},nj:{"^":"nk;"},m3:{"^":"nj;a,b,c,d,e,f,r,x",
ll:[function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
o=P.q
n=[o,P.d]
H.aN(a,"$isI",n,"$asI")
m=new A.u(a.j(0,"type"),null,null,null,null)
if(a.ad("strContent"))m.c=a.j(0,"strContent")
if(a.ad("listContent"))m.b=a.j(0,"listContent")
if(a.ad("intContent"))m.d=a.j(0,"intContent")
if(a.ad("mapContent"))m.e=H.aN(a.j(0,"mapContent"),"$isI",n,"$asI")
z=m
switch(z.ghB()){case 1070:o=this.e
if(o!=null){o.dC(new D.c5("Book Quit before choice was selected."))
this.e=null}o=this.b
o.a.bu()
o.b.bu()
return
case 1000:o=new A.u(667,null,null,null,null)
o.c="GET_BOOK_UID received."
n=this.a
n.F(o.E())
n.F(new A.u(10,null,this.c.ch,null,null).E())
return
case 1050:l=z.gkg()
this.e.bZ(l)
this.e=null
return
case 1060:o=new A.u(667,null,null,null,null)
o.c="New form state from player received."
this.a.F(o.E())
o=z.gky()
if(!o.ad("__submitted__"))o.n(0,"__submitted__",!1)
n=this.r
if(n.b>=4)H.i(n.cB())
n.bU(new G.kk(o))
return
case 1080:o=new A.u(667,null,null,null,null)
o.c="Received slot machine result."
this.a.F(o.E())
k=J.aB(z.geS(),0)
j=J.aB(z.geS(),1)
o=this.x
if(k>>>0!==k||k>=4)return H.f(C.C,k)
o.bZ(new U.cq(C.C[k],j))
this.x=null
return
case 1010:o=new A.u(667,null,null,null,null)
o.c="Starting book from scratch."
n=this.a
n.F(o.E())
o=this.e
if(o!=null){o.dC(new D.c5("Book Restart before choice was selected."))
this.e=null}try{this.c.eY()}catch(i){y=H.C(i)
x=H.E(i)
o=new A.u(666,null,null,null,null)
o.c="An error occured when initializing: "+H.b(y)+".\n"+H.b(x)
n.F(o.E())
throw H.c(y)}o=new A.u(90,null,null,null,null)
o.b=Z.bR()
n.F(o.E())
n.F(new A.d_(0,0,null).dS().E())
return
case 1020:h=new A.u(667,null,null,null,null)
h.c="Loading a saved game."
g=this.a
g.F(h.E())
h=this.e
if(h!=null){h.dC(new D.c5("Book Load before choice was selected."))
this.e=null}try{h=z.gi4()
f=new Z.fU(null,null,null,null,null,null)
e=H.aN(C.w.jE(h),"$isI",n,"$asI")
if(!e.ad("currentPageName")||!e.ad("vars"))H.i(new Z.lW("Invalid JSON for Savegame. Doesn't contain required fields 'currentPageName' or 'vars'. JSON='"+H.b(h)+"'."))
f.e=e.j(0,"uid")
f.a=e.j(0,"currentPageName")
f.f=e.j(0,"timestamp")
f.b=H.aN(e.j(0,"pageMapState"),"$isI",n,"$asI")
f.c=H.aN(e.j(0,"vars"),"$isI",n,"$asI")
if(e.ad("previousText"))f.d=e.j(0,"previousText")
w=f
v=H.aN(J.j2(z.geS()),"$isbP",[o],"$asbP")
o=this.c
if(v!=null)o.hf(w,v)
else o.kw(w)}catch(i){o=H.C(i)
if(o instanceof Z.dE){u=o
t=H.E(i)
o=new A.u(666,null,null,null,null)
o.c="Load failed due to incompatibility: "+H.b(u)+".\n"+H.b(t)
g.F(o.E())
this.c.eY()}else{s=o
r=H.E(i)
o=new A.u(666,null,null,null,null)
o.c="Load failed for unknown reason: "+H.b(s)+".\n"+H.b(r)
g.F(o.E())
this.c.eY()}}try{o=new A.u(90,null,null,null,null)
o.b=Z.bR()
g.F(o.E())}catch(i){q=H.C(i)
p=H.E(i)
o=new A.u(666,null,null,null,null)
o.c="Sending Stats failed for unknown reason: "+H.b(q)+".\n"+H.b(p)
g.F(o.E())
throw H.c(q)}this.c.toString
g.F(new A.d_(0,$.$get$cz().a,null).dS().E())
return
case 1090:this.f.bZ(!0)
this.f=null
return
case 1040:this.c.bB()
return
default:o=new A.u(666,null,null,null,null)
o.c="Wrong message type received by Scripter - "+H.b(z.ghB())+"."
this.a.F(o.E())}},"$1","giW",2,0,21],
f9:function(a){var z=P.X
this.f=new P.ct(new P.H(0,$.r,null,[z]),[z])
z=new A.u(30,null,null,null,null)
z.c=a
this.a.F(z.E())
return this.f.a}},c5:{"^":"d;a",
k:function(a){return"AsyncOperationOverridenException: "+this.a+"."}}}],["","",,G,{"^":"",kk:{"^":"d;a",
E:function(){return P.ck(this.a,null,null)},
k:function(a){return"<CurrentState submitted="+H.b(this.a.j(0,"__submitted__"))+">"}}}],["","",,A,{"^":"",u:{"^":"d;hB:a<,eS:b<,i4:c<,kg:d<,ky:e<",
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
dR:function(){return C.w.h2(this.E())},
E:function(){var z,y
z=new H.R(0,null,null,null,null,null,0,[P.q,P.d])
z.n(0,"type",this.a)
y=this.c
if(y!=null)z.n(0,"strContent",y)
y=this.b
if(y!=null)z.n(0,"listContent",y)
y=this.d
if(y!=null)z.n(0,"intContent",y)
y=this.e
if(y!=null)z.n(0,"mapContent",y)
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
y=J.iY(z,": ")
if(y>0)return J.j1(this.a,0,y)
else return}}}],["","",,A,{"^":"",d_:{"^":"d;jv:a<,b,c",
k:function(a){var z="Score +"+H.b(this.a)+"."
return z},
dS:function(){var z=new A.u(70,null,null,null,null)
z.b=[this.a,this.b]
z.c=this.c
return z}}}],["","",,L,{"^":"",ad:{"^":"d;fa:a@,b,c,d,b9:e<,I:f<,h4:r<,x,y",
gkn:function(){return this.e.length===0},
dE:function(a,b,c){if(this.a)return!1
if(this.e.length===0)return!1
b!=null
a!=null
if(c!=null&&c.$1(this)===!0)return!1
return!0},
km:function(a,b){return this.dE(a,b,null)},
l3:function(){return P.a0(["string",this.e,"hash",this.d,"submenu",this.y,"helpMessage",this.f])},
c6:function(a){this.r=a
return this},
bE:function(a,b){return C.b.bE(this.e,b.gb9())},
k:function(a){return"Choice: "+this.e+" ["+H.b(this.x)+"] ("+this.d+")"},
i8:function(a,b,c,d,e,f,g){if(a==null)throw H.c(P.G("String given to choice cannot be null."))
this.e=J.bh(a).f1(a)
this.d=C.b.gB(a)
this.r=f
this.b=!1
this.c=!1},
$isV:1,
$asV:function(){return[L.ad]},
v:{
f2:function(a,b,c,d,e,f,g){var z=new L.ad(!1,null,null,null,null,e,null,d,g)
z.i8(a,!1,!1,d,e,f,g)
return z}}},f3:{"^":"ft;a,b",
gl:function(a){return this.b.length},
sl:function(a,b){C.a.sl(this.b,b)
return b},
j:function(a,b){var z=this.b
if(b>>>0!==b||b>=z.length)return H.f(z,b)
return z[b]},
n:function(a,b,c){var z=this.b
if(b>>>0!==b||b>=z.length)return H.f(z,b)
z[b]=c},
jt:function(a){var z,y,x,w,v,u,t,s,r,q,p,o
if(J.aB(a,0)!=null){if(0>=a.length)return H.f(a,0)
v=!!J.o(a[0]).$isbH}else v=!1
if(v)try{if(0>=a.length)return H.f(a,0)
this.a=a[0].$0()}catch(u){z=H.C(u)
v=M.eX(J.h(z))
throw H.c(v)}else this.a=null
for(v=this.b,t={func:1,ret:[P.Q,P.au]},s=1;s<a.length;++s){y=a[s]
x=null
if(J.aB(y,"string")!=null&&!!J.o(J.aB(y,"string")).$isbH)try{x=J.aB(y,"string").$0()}catch(u){w=H.C(u)
v=M.eX(J.h(w))
throw H.c(v)}else x=""
r=x
q=J.aB(y,"goto")
p=H.ij(J.aB(y,"script"),t)
o=new L.ad(!1,null,null,null,null,null,null,q,J.aB(y,"submenu"))
if(r==null)H.i(P.G("String given to choice cannot be null."))
o.e=J.bh(r).f1(r)
o.d=C.b.gB(r)
o.r=p
o.b=!1
o.c=!1
C.a.t(v,o)}},
jp:function(a,b,c,d,e,f,g){if(b instanceof L.ad)C.a.t(this.b,b)
else if(typeof b==="string")C.a.t(this.b,L.f2(b,!1,!1,e,null,f,g))
else throw H.c(P.G("To add a choice to choices, one must provide either a new Choice element or a String."))},
t:function(a,b){return this.jp(a,b,!1,!1,null,null,null)},
l4:function(a,b,c,d){var z,y,x,w
z=this.b
y=H.l(z,0)
x=P.P(new H.K(z,new L.jZ(b,a,c),[y]),!0,y)
if(x.length===0)throw H.c("Choices is empty, but still choices.toMessage was called.")
w=new A.u(40,null,null,null,null)
z=[]
w.b=z
z.push(d)
z.push(this.a)
C.a.Z(x,new L.k_(w))
return w},
dS:function(){return this.l4(null,null,null,null)},
k:function(a){var z=this.b
return new H.ar(z,new L.k0(),[H.l(z,0),null]).cm(0,", ")},
$asft:function(){return[L.ad]},
$asfC:function(){return[L.ad]},
$asN:function(){return[L.ad]},
$asa_:function(){return[L.ad]}},jZ:{"^":"a:0;a,b,c",
$1:function(a){return a.dE(this.b,this.a,this.c)}},k_:{"^":"a:0;a",
$1:function(a){H.b(a)
J.ds(this.a.b,a.l3())
a.a=!0}},k0:{"^":"a:0;",
$1:function(a){return H.b(a)}}}],["","",,Z,{"^":"",d5:{"^":"d;dg:a<,b9:b<",
E:function(){return P.a0(["show",this.a,"string",this.b])}},oG:{"^":"d;a",
E:function(){var z=new H.R(0,null,null,null,null,null,0,[P.q,P.d])
this.a.Z(0,new Z.oH(z))
return z},
Z:function(a,b){this.a.Z(0,b)}},oH:{"^":"a:39;a",
$2:function(a,b){this.a.n(0,a,b.E())}},hy:{"^":"d;h:a@,aT:b<,fZ:c<,dK:d<,dg:e<,hj:f<,b9:r<",v:{
hz:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=H.p(new Array(a.length),[Z.hy])
for(y=a.length,x=z.length,w=0,v=0;v<a.length;a.length===y||(0,H.at)(a),++v){u=a[v]
t=J.L(u)
s=t.j(u,"name")
r=t.j(u,"description")
q=t.j(u,"color")
p=t.j(u,"priority")
o=t.j(u,"show")
n=t.j(u,"notifyOnChange")
t=t.j(u,"string")
if(w>=x)return H.f(z,w)
z[w]=new Z.hy(s,r,q,p,o,n,t);++w}C.a.ce(z,new Z.pE())
return z}}},pE:{"^":"a:6;",
$2:function(a,b){return J.bD(b.gdK(),a.gdK())}},av:{"^":"d;h:a<,aT:b<,c,fZ:d<,dK:e<,f,r,hj:x<,fW:y@,fY:z<,$ti",
gae:function(){return this.f},
sae:function(a){if(!J.e(this.f,a)){this.f=a
this.y=!0
$.cs=!0}},
gdg:function(){return this.r},
gb9:function(){return this.c.$1(this.f)},
E:function(){return P.a0(["name",this.a,"value",this.f,"show",this.r])},
hD:function(a){var z
this.sae(H.iJ(a.j(0,"value"),H.l(this,0)))
z=a.j(0,"show")
if(!J.e(this.r,z)){this.r=z
this.y=!0
$.cs=!0}},
$ise9:1,
v:{
bQ:function(a,b,c,d,e,f,g,h){var z,y
z=$.$get$d6()
y=z.ad(a)?H.aN(z.j(0,a),"$isav",[h],"$asav"):new Z.av(a,d,b,c,f,null,null,!0,!1,"Stat",[null])
y.f=H.iJ(e,h)
y.r=!0
z.n(0,a,y)
return y},
oJ:function(){var z,y
z=new Z.oG(new H.R(0,null,null,null,null,null,0,[P.q,Z.d5]))
y=$.$get$d6().gcw()
new H.K(y,new Z.oK(),[H.y(y,"B",0)]).Z(0,new Z.oL(z))
$.cs=!1
return z},
bR:function(){var z=H.p([],[[P.I,P.q,P.d]])
$.$get$d6().gcw().Z(0,new Z.oI(z))
return z}}},oK:{"^":"a:0;",
$1:function(a){return a.gfW()}},oL:{"^":"a:27;a",
$1:function(a){var z,y
z=a.gdg()
y=a.gb9()
a.sfW(!1)
this.a.a.n(0,a.a,new Z.d5(z,y))}},oI:{"^":"a:27;a",
$1:function(a){var z=new H.R(0,null,null,null,null,null,0,[P.q,P.d])
z.n(0,"name",a.gh())
z.n(0,"description",a.gaT())
z.n(0,"color",a.gfZ())
z.n(0,"priority",a.gdK())
z.n(0,"show",a.gdg())
z.n(0,"notifyOnChange",a.ghj())
z.n(0,"string",a.gb9())
this.a.push(z)}}}],["","",,N,{"^":"",dQ:{"^":"d;h:a<,b,c,iw:d<,e,f",
gh6:function(){var z,y,x
z=this.b
y=z==null||J.e(z.gh(),"")
x=this.a
return y?x:z.gh6()+"."+x},
geR:function(){if($.it){var z=this.b
if(z!=null)return z.geR()}return $.rH},
kx:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p,o
x=a.b
if(x>=this.geR().b){if(!!J.o(b).$isbH)b=b.$0()
w=b
if(typeof w!=="string"){v=b
b=J.h(b)}else v=null
if(d==null&&x>=$.vd.b)try{x="autogenerated stack trace for "+a.k(0)+" "+H.b(b)
throw H.c(x)}catch(u){z=H.C(u)
y=H.E(u)
d=y
if(c==null)c=z}e=$.r
x=b
w=this.gh6()
t=c
s=d
r=Date.now()
q=$.fu
$.fu=q+1
p=new N.mu(a,x,v,w,new P.cQ(r,!1),q,t,s,e)
if($.it)for(o=this;o!=null;){o.fI(p)
o=o.b}else $.$get$fw().fI(p)}},
co:function(a,b,c,d){return this.kx(a,b,c,d,null)},
jY:function(a,b,c){return this.co(C.V,a,b,c)},
am:function(a){return this.jY(a,null,null)},
jX:function(a,b,c){return this.co(C.U,a,b,c)},
bo:function(a){return this.jX(a,null,null)},
jW:function(a,b,c){return this.co(C.W,a,b,c)},
bP:function(a){return this.jW(a,null,null)},
ke:function(a,b,c){return this.co(C.B,a,b,c)},
hd:function(a){return this.ke(a,null,null)},
l9:function(a,b,c){return this.co(C.Z,a,b,c)},
f3:function(a){return this.l9(a,null,null)},
hZ:function(a,b,c){return this.co(C.Y,a,b,c)},
e_:function(a){return this.hZ(a,null,null)},
fI:function(a){},
v:{
bn:function(a){return $.$get$fv().kL(a,new N.tt(a))}}},tt:{"^":"a:2;a",
$0:function(){var z,y,x,w
z=this.a
if(C.b.dh(z,"."))H.i(P.G("name shouldn't start with a '.'"))
y=C.b.ku(z,".")
if(y===-1)x=z!==""?N.bn(""):null
else{x=N.bn(C.b.aM(z,0,y))
z=C.b.bK(z,y+1)}w=new H.R(0,null,null,null,null,null,0,[P.q,N.dQ])
w=new N.dQ(z,x,null,w,new P.hB(w,[null,null]),null)
if(x!=null)x.giw().n(0,z,w)
return w}},b_:{"^":"d;h:a<,ae:b<",
A:function(a,b){if(b==null)return!1
return b instanceof N.b_&&this.b===b.b},
b0:function(a,b){return C.e.b0(this.b,b.gae())},
da:function(a,b){var z=b.gae()
if(typeof z!=="number")return H.x(z)
return this.b<=z},
bk:function(a,b){var z=b.gae()
if(typeof z!=="number")return H.x(z)
return this.b>z},
bT:function(a,b){return this.b>=b.gae()},
bE:function(a,b){var z=b.gae()
if(typeof z!=="number")return H.x(z)
return this.b-z},
gB:function(a){return this.b},
k:function(a){return this.a},
$isV:1,
$asV:function(){return[N.b_]}},mu:{"^":"d;eR:a<,b,aW:c<,d,V:e<,f,bv:r<,br:x<,y",
k:function(a){return"["+this.a.a+"] "+this.d+": "+H.b(this.b)}}}],["","",,X,{"^":"",
bC:function(a){return X.dg(J.iV(a,0,new X.uR()))},
b3:function(a,b){var z=J.ap(a,b)
if(typeof z!=="number")return H.x(z)
a=536870911&z
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
dg:function(a){if(typeof a!=="number")return H.x(a)
a=536870911&a+((67108863&a)<<3)
a^=a>>>11
return 536870911&a+((16383&a)<<15)},
uR:{"^":"a:6;",
$2:function(a,b){return X.b3(a,J.j(b))}},
dY:{"^":"cf;a,$ti",
gae:function(){var z=this.a
if(z==null)throw H.c(new P.w("value called on absent Optional."))
return z},
b4:function(a){var z=this.a
return z==null?a:z},
ga_:function(a){var z=this.a
if(z!=null){z=H.p([z],this.$ti)
z=new J.bk(z,1,0,null,[H.l(z,0)])}else z=C.K
return z},
gB:function(a){return J.j(this.a)},
A:function(a,b){var z,y
if(b==null)return!1
if(b instanceof X.dY){z=b.a
y=this.a
y=z==null?y==null:z===y
z=y}else z=!1
return z},
k:function(a){var z=this.a
return z==null?"Optional { absent }":"Optional { value: "+H.b(z)+" }"},
ia:function(a,b){if(this.a==null)throw H.c(P.G("Must not be null."))},
v:{
fG:function(a,b){var z=new X.dY(a,[b])
z.ia(a,b)
return z}}}}],["","",,U,{"^":"",d1:{"^":"d;a,b",
k:function(a){return this.b}},cq:{"^":"d;a,la:b<",
geO:function(){return this.a===C.G},
k:function(a){return"SessionResult<"+this.a.b+",wasRerolled="+H.b(this.b)+">"},
A:function(a,b){if(b==null)return!1
return b instanceof U.cq&&b.a===this.a&&J.e(b.b,this.b)},
gB:function(a){return(this.b===!0?2:1)*100+this.a.a}}}],["","",,X,{"^":"",
xQ:[function(a,b){var z,y,x,w,v
z=new D.m3(b,null,null,null,null,null,null,null)
y=$.fR
$.fR=y+1
x=new H.co(y,null,!1)
w=init.globalState.d
w.e4(y,x)
w.cN()
w=new H.nA(x,null)
w.ic(x)
z.b=w
w=w.b
w.toString
new P.d9(w,[H.l(w,0)]).aI(z.giW(),null,null,null)
b.F(new H.cw(z.b.a,init.globalState.d.a))
v=N.nX()
z.c=v
v.Q=z},"$2","id",4,0,36]},1]]
setupProgram(dart,0)
J.o=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.fk.prototype
return J.fj.prototype}if(typeof a=="string")return J.cj.prototype
if(a==null)return J.fl.prototype
if(typeof a=="boolean")return J.fi.prototype
if(a.constructor==Array)return J.ch.prototype
if(!(a instanceof P.d))return J.bt.prototype
return a}
J.aA=function(a){if(a==null)return a
if(a.constructor==Array)return J.ch.prototype
if(!(a instanceof P.d))return J.bt.prototype
return a}
J.L=function(a){if(typeof a=="string")return J.cj.prototype
if(a==null)return a
if(a.constructor==Array)return J.ch.prototype
if(!(a instanceof P.d))return J.bt.prototype
return a}
J.an=function(a){if(typeof a=="number")return J.ci.prototype
if(a==null)return a
if(!(a instanceof P.d))return J.bt.prototype
return a}
J.eC=function(a){if(typeof a=="number")return J.ci.prototype
if(typeof a=="string")return J.cj.prototype
if(a==null)return a
if(!(a instanceof P.d))return J.bt.prototype
return a}
J.bh=function(a){if(typeof a=="string")return J.cj.prototype
if(a==null)return a
if(!(a instanceof P.d))return J.bt.prototype
return a}
J.ap=function(a,b){if(typeof a=="number"&&typeof b=="number")return a+b
return J.eC(a).aj(a,b)}
J.b5=function(a,b){if(typeof a=="number"&&typeof b=="number")return a/b
return J.an(a).d8(a,b)}
J.e=function(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.o(a).A(a,b)}
J.ac=function(a,b){if(typeof a=="number"&&typeof b=="number")return a>b
return J.an(a).bk(a,b)}
J.c1=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<b
return J.an(a).b0(a,b)}
J.c2=function(a,b){if(typeof a=="number"&&typeof b=="number")return a*b
return J.eC(a).cb(a,b)}
J.iT=function(a){if(typeof a=="number")return-a
return J.an(a).f7(a)}
J.bD=function(a,b){if(typeof a=="number"&&typeof b=="number")return a-b
return J.an(a).at(a,b)}
J.aB=function(a,b){if(typeof b==="number")if(a.constructor==Array||typeof a=="string")if(b>>>0===b&&b<a.length)return a[b]
return J.L(a).j(a,b)}
J.ds=function(a,b){return J.aA(a).t(a,b)}
J.iU=function(a,b,c,d,e,f,g,h,i,j,k,l,m,n){return J.aA(a).ji(a,b,c,d,e,f,g,h,i,j,k,l,m,n)}
J.c3=function(a,b,c){return J.aA(a).p(a,b,c)}
J.bE=function(a,b){return J.eC(a).bE(a,b)}
J.dt=function(a,b){return J.L(a).a7(a,b)}
J.eR=function(a,b){return J.aA(a).au(a,b)}
J.iV=function(a,b,c){return J.aA(a).bw(a,b,c)}
J.j=function(a){return J.o(a).gB(a)}
J.eS=function(a){return J.L(a).gY(a)}
J.aj=function(a){return J.aA(a).ga_(a)}
J.iW=function(a){return J.aA(a).gw(a)}
J.aO=function(a){return J.L(a).gl(a)}
J.iX=function(a){return J.o(a).gbz(a)}
J.iY=function(a,b){return J.L(a).b3(a,b)}
J.eT=function(a,b){return J.aA(a).aJ(a,b)}
J.iZ=function(a,b,c){return J.bh(a).hg(a,b,c)}
J.du=function(a,b,c){return J.bh(a).kP(a,b,c)}
J.cF=function(a,b,c){return J.bh(a).d1(a,b,c)}
J.j_=function(a){return J.an(a).hw(a)}
J.j0=function(a,b){return J.aA(a).e1(a,b)}
J.eU=function(a,b){return J.bh(a).dh(a,b)}
J.j1=function(a,b,c){return J.bh(a).aM(a,b,c)}
J.j2=function(a){return J.aA(a).bH(a)}
J.h=function(a){return J.o(a).k(a)}
J.c4=function(a,b){return J.an(a).bj(a,b)}
J.j3=function(a,b){return J.aA(a).c9(a,b)}
I.aY=function(a){a.immutable$list=Array
a.fixed$length=Array
return a}
var $=I.p
C.N=J.aZ.prototype
C.a=J.ch.prototype
C.O=J.fi.prototype
C.u=J.fj.prototype
C.e=J.fk.prototype
C.P=J.fl.prototype
C.j=J.ci.prototype
C.b=J.cj.prototype
C.H=new A.aq(0,0,0)
C.I=new A.aq(-1/0,-1/0,-1/0)
C.J=new A.cH(-10,0,100)
C.K=new H.l7([null])
C.L=new P.mX()
C.v=new P.qz()
C.M=new P.qS()
C.i=new P.r6()
C.x=new P.b8(0)
C.y=new U.cV(0,"ItemType.fist")
C.z=new U.cV(1,"ItemType.shield")
C.r=new U.cV(2,"ItemType.spear")
C.A=new U.cV(3,"ItemType.sword")
C.Q=function getTagFallback(o) {
  var s = Object.prototype.toString.call(o);
  return s.substring(8, s.length - 1);
}
C.w=new P.m8(null,null)
C.R=new P.ma(null)
C.S=new P.mb(null,null)
C.T=new O.mj(0,"KnownToMode.all")
C.U=new N.b_("FINER",400)
C.V=new N.b_("FINEST",300)
C.W=new N.b_("FINE",500)
C.B=new N.b_("INFO",800)
C.X=new N.b_("OFF",2000)
C.Y=new N.b_("SEVERE",1000)
C.Z=new N.b_("WARNING",900)
C.G=new U.d1(0,"Result.success")
C.a6=new U.d1(1,"Result.failure")
C.a7=new U.d1(2,"Result.criticalSuccess")
C.a8=new U.d1(3,"Result.criticalFailure")
C.C=I.aY([C.G,C.a6,C.a7,C.a8])
C.a_=I.aY(["cave_with_agruth","guardpost_above_church","orcthorn_room","slave_quarters_passage","smelter","underground_church","war_forge"])
C.a0=I.aY([C.y])
C.a1=I.aY([C.z])
C.D=I.aY([C.r])
C.o=I.aY([C.A])
C.d=I.aY([])
C.a2=I.aY(['Briana spits on the floor. "Can\'t wait to see some actual architecture \n  when we get out of here."',"Somewhere in the distance, there are yells that rise in intensity, \n  then suddenly stop entirely.",'Briana turns to you with an intense whisper. \n  "You know, I _have_ a right to hate orcs." \n  \n  "I didn\'t know people need to have a right to hate them, to be honest." \n  \n  She observes you for a moment. "I\'m glad we are in agreement."',"More yells from the distance.","Briana stops and listens for a moment. \"Aren, we're pushing our luck. \n  I'd hate to go all this way only to get \n  my head smashed in by some random orc patrol."])
C.a3=new H.k9(0,{},C.d,[null,null])
C.a4=new X.dY(null,[P.M])
C.k=new R.e0(0,"Pose.standing")
C.h=new R.e0(1,"Pose.offBalance")
C.f=new R.e0(2,"Pose.onGround")
C.l=new K.e1(0,"Predetermination.none")
C.p=new K.e1(1,"Predetermination.successGuaranteed")
C.m=new K.e1(2,"Predetermination.failureGuaranteed")
C.t=new Y.cl("he","him","his","himself")
C.n=new Y.cl("it","it","its","itself")
C.a5=new Y.cl("she","her","her","herself")
C.E=new Y.cl("they","them","their","themselves")
C.F=new Y.cl("you","you","your","yourself")
C.c=new Q.nF(0,"Resource.stamina")
C.a9=H.bf("fm")
C.aa=H.bf("au")
C.ab=H.bf("q")
C.ac=H.bf("X")
C.ad=H.bf("aX")
C.q=H.bf("dynamic")
C.ae=H.bf("t")
C.af=H.bf("M")
C.ag=new P.bU(null,2)
$.fR=1
$.fK="$cachedFunction"
$.fL="$cachedInvocation"
$.aP=0
$.bF=null
$.eZ=null
$.bw=null
$.bX=null
$.bY=null
$.es=!1
$.r=C.i
$.fb=0
$.eD=null
$.hV=!1
$.rz=null
$.hX=!1
$.iu=!0
$.cs=!1
$.it=!1
$.vd=C.X
$.rH=C.B
$.fu=0
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
I.$lazy(y,x,w)}})(["ff","$get$ff",function(){return H.m1()},"fg","$get$fg",function(){if(typeof WeakMap=="function")var z=new WeakMap()
else{z=$.fb
$.fb=z+1
z="expando$key$"+z}return new P.ld(null,z,[P.t])},"hn","$get$hn",function(){return H.aR(H.d8({
toString:function(){return"$receiver$"}}))},"ho","$get$ho",function(){return H.aR(H.d8({$method$:null,
toString:function(){return"$receiver$"}}))},"hp","$get$hp",function(){return H.aR(H.d8(null))},"hq","$get$hq",function(){return H.aR(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"hu","$get$hu",function(){return H.aR(H.d8(void 0))},"hv","$get$hv",function(){return H.aR(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"hs","$get$hs",function(){return H.aR(H.ht(null))},"hr","$get$hr",function(){return H.aR(function(){try{null.$method$}catch(z){return z.message}}())},"hx","$get$hx",function(){return H.aR(H.ht(void 0))},"hw","$get$hw",function(){return H.aR(function(){try{(void 0).$method$}catch(z){return z.message}}())},"eh","$get$eh",function(){return P.qh()},"bm","$get$bm",function(){var z,y
z=P.au
y=new P.H(0,P.pU(),null,[z])
y.il(null,z)
return y},"bZ","$get$bZ",function(){return[]},"dk","$get$dk",function(){return new K.cd("fist",P.aE(C.a0,null))},"bL","$get$bL",function(){return N.bn("PlannerRecommendation")},"ig","$get$ig",function(){return new K.rT()},"eA","$get$eA",function(){var z=$.$get$ig()
return K.a1("__END_OF_ROAM__",z,z,null,null,[],"ground")},"a9","$get$a9",function(){return P.e6(null)},"bN","$get$bN",function(){return P.e6(null)},"iw","$get$iw",function(){return N.bn("Storyline")},"hb","$get$hb",function(){return P.bq("(\\w)([\\.\\?\\!])([\"'])\\.(?=$|\\s)",!0,!1)},"bA","$get$bA",function(){return L.eg(new L.ts())},"aM","$get$aM",function(){return L.eg(new L.tO())},"dn","$get$dn",function(){return L.eg(new L.tr())},"dZ","$get$dZ",function(){return new F.n1("Sometimes, patience pays off. Especially when the other option is potentially dangerous.",!1,!0,!1,null,null)},"ey","$get$ey",function(){return Y.c9(!1,"balance",!0,C.n,$.$get$aM())},"iA","$get$iA",function(){return Y.c9(!1,"pounding",!1,C.n,$.$get$aM())},"fS","$get$fS",function(){return new B.nD("Most moves are easier and more effective when you are firmly in balance.",!1,!0,!1,null,null)},"fW","$get$fW",function(){return new O.nT(null,!1,!0,!1,null,null)},"ha","$get$ha",function(){return new Q.oC(null,!1,!0,!0,C.c,null)},"hA","$get$hA",function(){return new M.pF("",!0,C.c,!1,!0,null)},"hW","$get$hW",function(){return P.e6(null)},"eY","$get$eY",function(){return new Z.jC(!1,!0,!1,null,null)},"iM","$get$iM",function(){return Y.c9(!1,"swing",!0,C.n,$.$get$aM())},"iL","$get$iL",function(){return Y.c9(!1,"swing",!0,C.n,$.$get$aM())},"iK","$get$iK",function(){return Y.c9(!1,"swing",!0,C.n,$.$get$aM())},"fI","$get$fI",function(){return X.fG(0,P.M)},"fJ","$get$fJ",function(){return X.fG(1,P.M)},"h4","$get$h4",function(){return new D.ox(!1,!1,!0,null,null)},"cB","$get$cB",function(){return G.pg(!1,!0,"Orcthorn",!0,2,2)},"er","$get$er",function(){return Z.oB(!1,!1,"spear",!1,1)},"ex","$get$ex",function(){return new O.pG(1e4)},"i9","$get$i9",function(){return K.a1("cave_with_agruth_pre",new V.tm(),new V.tn(),null,null,H.p([new Q.v("cave_with_agruth","","You look around.",null)],[Q.v]),"ground")},"i8","$get$i8",function(){return K.a1("cave_with_agruth",new V.tk(),new V.tl(),null,null,H.p([new Q.v("underground_church","Go to the Unholy Church","You make it to the Church undetected.",null),new Q.v("war_forge","Go to the war forges","You sneak your way through the black passage, closing towards the sound of hundreds of anvils.",null),new Q.v("slave_quarters_passage","Go to the slave quarters","You and Briana hug the wall and start towards the slave quarters.",null)],[Q.v]),"ground")},"fX","$get$fX",function(){return new V.oi("Search Agruth","search_agruth",!0,null)},"ih","$get$ih",function(){return K.a1("exit_from_bloodrock",new V.ti(),new V.tj(),null,null,H.p([new Q.v("__END_OF_ROAM__"," (UNIMPLEMENTED)","...",null)],[Q.v]),"ground")},"ii","$get$ii",function(){return K.a1("forge_church_crevice",new V.tg(),new V.th(),null,null,H.p([new Q.v("tunnel","Continue along the crevice","You continue until the crevice open into a tunnel. You can smell fresh air.",null)],[Q.v]),"ground")},"is","$get$is",function(){return K.a1("guardpost_above_church",new V.td(),new V.te(),null,null,H.p([new Q.v("underground_church","Descend towards the Underground Church","You take the passage leading down towards the temple.",null),new Q.v("tunnel","Go to the upper gate","You take the passage that leads to the Upper Door and soon find yourself climbing a steep, poorly lit stairway.",null),new Q.v("smelter","Go to the smelter","You take the slightly downwards passage towards the smelter.",null)],[Q.v]),"ground")},"fe","$get$fe",function(){return new V.lH("Cautiously take the shield","guardpost_above_church_take_shield",!0,null)},"iv","$get$iv",function(){return K.a1("just_after_agruth_fight",new V.tb(),new V.tc(),null,null,H.p([],[Q.v]),"ground")},"fz","$get$fz",function(){return new V.mD('"Luck Bringer"',"name_agruth_sword_opportunity",!0,null)},"fA","$get$fA",function(){return new V.mE('"Savior"',"name_agruth_sword_redemption",!0,null)},"fy","$get$fy",function(){return new V.mC("No name","name_agruth_sword_nothing",!0,null)},"iy","$get$iy",function(){return K.a1("orcthorn_door",new V.t9(),new V.ta(),null,null,H.p([new Q.v("cave_with_agruth","Go to the cave with Agruth's corpse","You back out from the door, and go back where you left Agruth's body.",null),new Q.v("slave_quarters","Go further towards the Gate of Screams","TODO",null),new Q.v("orcthorn_room","Open the door","You open the door.",null)],[Q.v]),"ground")},"iz","$get$iz",function(){return K.a1("orcthorn_room",new V.t7(),new V.t8(),O.wV(),null,H.p([new Q.v("orcthorn_door","Exit the room","You go through the door. Once back in the corridor of the slave quarters, you close it behind you.",null)],[Q.v]),"ground")},"hg","$get$hg",function(){return new V.po("Search for Orcthorn","take_orcthorn",!0,null)},"iB","$get$iB",function(){return K.a1("slave_quarters",new V.t5(),new V.t6(),null,null,H.p([],[Q.v]),"ground")},"h2","$get$h2",function(){return new V.ov("Continue","slave_quarters_continue",!0,null)},"iC","$get$iC",function(){return K.a1("slave_quarters_passage",new V.t2(),new V.t3(),O.wW(),null,H.p([new Q.v("cave_with_agruth","Go back to the cave with Agruth's corpse","You back out from the door, and go back where you left Agruth's body.",null),new Q.v("slave_quarters","Go further towards the Gate of Screams","TODO",null),new Q.v("orcthorn_room","Open the door","You open the door.",null)],[Q.v]),"ground")},"h3","$get$h3",function(){return new V.ow("Examine the door","slave_quarters_passage_examine_door",!0,null)},"iD","$get$iD",function(){return K.a1("smelter",new V.t0(),new V.t1(),null,null,H.p([new Q.v("war_forge","Go to the war forges","You walk through a short passage set in stone, towards the sound of hundreds of anvils.",null),new Q.v("guardpost_above_church","Go through the smooth passage","You take the smooth passage and it leads you slightly upwards.",null)],[Q.v]),"ground")},"h5","$get$h5",function(){return new V.oz("Look around","smelter_look_around",!0,null)},"h6","$get$h6",function(){return new V.oA("Throw spear at the ogre","smelter_throw_spear",!0,null)},"iE","$get$iE",function(){return K.a1("start_adventure",new V.rZ(),new V.t_(),O.wT(),null,H.p([new Q.v("just_after_agruth_fight","","You look around. Fortunately, nobody is in sight.",null)],[Q.v]),"ground")},"hi","$get$hi",function(){return new V.pq("Talk to Briana","talk_to_briana_1",!0,null)},"hj","$get$hj",function(){return new V.pr("Talk to Briana","talk_to_briana_2",!0,null)},"hk","$get$hk",function(){return new V.ps("Talk to Briana","talk_to_briana_3",!0,null)},"iN","$get$iN",function(){return K.a1("the_shafts",new V.rX(),new V.rY(),null,null,H.p([new Q.v("tunnel","Run","You run over the passage. Orcs start to scream and yell commands. As you near the entrance, the air gets better.",null)],[Q.v]),"ground")},"iP","$get$iP",function(){return K.a1("tunnel",new V.tM(),new V.tN(),O.wU(),null,H.p([new Q.v("exit_from_bloodrock","Start running again","You start running again.",null)],[Q.v]),"ground")},"iQ","$get$iQ",function(){return K.a1("underground_church",new V.tB(),new V.tL(),null,null,H.p([new Q.v("guardpost_above_church","Enter the upwards passage","You take the sloping passage and go a long, slightly rising way.",null),new Q.v("cave_with_agruth","Go back to the cave with Agruth's corpse","You sneak out of the church, back towards where you left Agruth's body.",null),new Q.v("underground_church_altar","Go towards the altar","You sneak towards the front of the temple, trying to stay in the shadows.",null)],[Q.v]),"ground")},"fa","$get$fa",function(){return new V.lc("Look around","examine_underground_church",!0,null)},"iR","$get$iR",function(){return K.a1("underground_church_altar",new V.tf(),new V.tq(),null,null,H.p([new Q.v("underground_church","Sneak back","You crouch low and, keeping an eye on the altar, head back to the Church's entrance.",null)],[Q.v]),"ground")},"hC","$get$hC",function(){return new V.pI("Wait","wait_for_ritual",!0,null)},"hh","$get$hh",function(){return new V.pp("Take the spear","take_spear_in_underground_church",!0,null)},"iS","$get$iS",function(){return K.a1("war_forge",new V.rU(),new V.t4(),null,null,H.p([new Q.v("smelter","Go to smelter","You keep low, ascending the stairs. At the top you sense a draft of hot air coming from a passage through the wall. You make your way through it.",null),new Q.v("cave_with_agruth","Go back to the cave with Agruth's corpse","You sneak back towards where you left Agruth's body.",null)],[Q.v]),"ground")},"hD","$get$hD",function(){return new V.pJ("Look around","war_forge_look_around",!0,null)},"hE","$get$hE",function(){return new V.pK("Watch the workers","war_forge_watch_workers",!0,null)},"i3","$get$i3",function(){return H.p([$.$get$i9(),$.$get$i8(),$.$get$ih(),$.$get$ii(),$.$get$is(),$.$get$iv(),$.$get$iy(),$.$get$iz(),$.$get$iB(),$.$get$iC(),$.$get$iD(),$.$get$iE(),$.$get$iN(),$.$get$iP(),$.$get$iQ(),$.$get$iR(),$.$get$iS()],[K.cp])},"i2","$get$i2",function(){return H.p([$.$get$fX(),$.$get$fe(),$.$get$fz(),$.$get$fA(),$.$get$fy(),$.$get$hg(),$.$get$h2(),$.$get$h3(),$.$get$h5(),$.$get$h6(),$.$get$hi(),$.$get$hj(),$.$get$hk(),$.$get$fa(),$.$get$hC(),$.$get$hh(),$.$get$hD(),$.$get$hE()],[A.W])},"dr","$get$dr",function(){return P.pe("")},"cz","$get$cz",function(){var z=new O.ne(0,null,"PointsCounter")
z.ib()
return z},"c_","$get$c_",function(){return new L.f3(null,H.p([],[L.ad]))},"cE","$get$cE",function(){return H.fp(P.q,P.d)},"cy","$get$cy",function(){return P.bb(null,{func:1,ret:[P.Q,P.au]})},"cO","$get$cO",function(){return P.bq("^\\s*<<<\\s*$",!0,!1)},"d6","$get$d6",function(){return H.fp(P.q,Z.av)},"fw","$get$fw",function(){return N.bn("")},"fv","$get$fv",function(){return P.dO(P.q,N.dQ)}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=[null,!1]
init.types=[{func:1,args:[,]},{func:1,ret:P.q,args:[R.A,A.a4,Y.a3]},{func:1},{func:1,args:[,,,]},{func:1,ret:Q.z,args:[R.A]},{func:1,args:[R.A,A.a4,Y.a3]},{func:1,args:[,,]},{func:1,v:true},{func:1,v:true,args:[R.A,A.a4,Y.a3,R.A,S.af]},{func:1,args:[P.t]},{func:1,ret:R.A,args:[A.a4]},{func:1,v:true,args:[R.A,A.a4,Y.a3,R.A,,]},{func:1,ret:U.cT,args:[A.a4,F.J,[P.B,R.A]]},{func:1,args:[U.cb]},{func:1,ret:P.q,args:[P.t]},{func:1,v:true,args:[{func:1,v:true}]},{func:1,v:true,args:[P.q]},{func:1,args:[,P.b2]},{func:1,v:true,args:[P.d],opt:[P.b2]},{func:1,args:[P.aX]},{func:1,ret:P.Q},{func:1,v:true,args:[P.d]},{func:1,ret:Y.aD,args:[P.t]},{func:1,ret:P.q,args:[P.q]},{func:1,args:[R.A]},{func:1,ret:P.X,args:[R.A,R.A]},{func:1,args:[,,,,]},{func:1,args:[Z.av]},{func:1,ret:P.M,args:[A.aq]},{func:1,ret:Q.ce,args:[U.ae]},{func:1,args:[P.M,R.A]},{func:1,args:[P.X]},{func:1,ret:P.M,args:[A.cH]},{func:1,args:[P.t,,]},{func:1,v:true,args:[P.t]},{func:1,ret:P.X,args:[L.ad]},{func:1,v:true,args:[[P.N,P.q],P.fY]},{func:1,args:[L.ad]},{func:1,args:[P.q,,]},{func:1,args:[P.q,Z.d5]},{func:1,v:true,args:[,P.b2]},{func:1,args:[[P.N,Y.ai],Y.ai]},{func:1,ret:P.t,args:[P.V,P.V]},{func:1,args:[Y.ai]},{func:1,ret:P.M,args:[P.M,P.M]},{func:1,ret:P.t,args:[P.t,P.t]},{func:1,args:[P.bo]},{func:1,args:[{func:1,v:true}]},{func:1,v:true,args:[P.d,P.b2]},{func:1,ret:P.q,args:[Q.ah]},{func:1,ret:Q.ca,args:[Q.v]},{func:1,ret:P.X,args:[P.t]},{func:1,args:[,],opt:[,]},{func:1,ret:L.ad,args:[P.q],named:{deferToChoiceList:P.X,deferToEndOfPage:P.X,goto:P.q,helpMessage:P.q,script:{func:1,ret:[P.Q,P.au]},submenu:P.q}},{func:1,ret:[P.Q,U.cq],args:[P.aX,P.q],named:{rerollEffectDescription:P.q,rerollable:P.X}}]
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
Isolate.aY=a.aY
Isolate.bg=a.bg
return Isolate}}(function(a){if(typeof document==="undefined"){a(null)
return}if(typeof document.currentScript!='undefined'){a(document.currentScript)
return}var z=document.scripts
function onLoad(b){for(var x=0;x<z.length;++x)z[x].removeEventListener("load",onLoad,false)
a(b.target)}for(var y=0;y<z.length;++y)z[y].addEventListener("load",onLoad,false)})(function(a){init.currentScript=a
if(typeof dartMainRunner==="function")dartMainRunner(function(b){H.iF(X.id(),b)},[])
else (function(b){H.iF(X.id(),b)})([])})})()