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
var dart=[["","",,H,{"^":"",xa:{"^":"d;a"}}],["","",,J,{"^":"",
o:function(a){return void 0},
aZ:{"^":"d;",
A:function(a,b){return a===b},
gB:function(a){return H.aF(a)},
k:function(a){return H.d_(a)},
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
xh:{"^":"fo;"},
bt:{"^":"fo;"},
cg:{"^":"aZ;$ti",
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
for(z=J.ai(b);z.u();)a.push(z.d)},
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
aT:function(a,b,c){var z,y,x
z=a.length
for(y=0;y<z;++y){x=a[y]
if(b.$1(x)===!0)return x
if(a.length!==z)throw H.c(new P.D(a))}throw H.c(H.aj())},
cl:function(a,b){return this.aT(a,b,null)},
au:function(a,b){if(b>>>0!==b||b>=a.length)return H.f(a,b)
return a[b]},
geJ:function(a){if(a.length>0)return a[0]
throw H.c(H.aj())},
gw:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.c(H.aj())},
gcd:function(a){var z=a.length
if(z===1){if(0>=z)return H.f(a,0)
return a[0]}if(z===0)throw H.c(H.aj())
throw H.c(H.dE())},
b6:function(a,b,c,d,e){var z,y,x
this.fX(a,"setRange")
P.cm(b,c,a.length,null,null,null)
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
H.cq(a,0,a.length-1,z)},
fa:function(a){return this.ce(a,null)},
bQ:function(a,b,c){var z
if(c>=a.length)return-1
for(z=c;z<a.length;++z)if(J.e(a[z],b))return z
return-1},
b1:function(a,b){return this.bQ(a,b,0)},
a7:function(a,b){var z
for(z=0;z<a.length;++z)if(J.e(a[z],b))return!0
return!1},
gX:function(a){return a.length===0},
gav:function(a){return a.length!==0},
k:function(a){return P.cf(a,"[","]")},
bH:function(a){return P.b9(a,H.l(a,0))},
ga_:function(a){return new J.bk(a,a.length,0,null,[H.l(a,0)])},
gB:function(a){return H.aF(a)},
gl:function(a){return a.length},
sl:function(a,b){this.cQ(a,"set length")
if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(P.cH(b,"newLength",null))
if(b<0)throw H.c(P.a8(b,0,null,"newLength",null))
a.length=b},
j:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(H.aL(a,b))
if(b>=a.length||b<0)throw H.c(H.aL(a,b))
return a[b]},
n:function(a,b,c){if(!!a.immutable$list)H.i(new P.S("indexed set"))
if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(H.aL(a,b))
if(b>=a.length||b<0)throw H.c(H.aL(a,b))
a[b]=c},
$iscW:1,
$ascW:I.bg,
$isN:1,
$isa_:1},
x9:{"^":"cg;$ti"},
bk:{"^":"d;a,b,c,d,$ti",
gT:function(){return this.d},
u:function(){var z,y,x
z=this.a
y=z.length
if(this.b!==y)throw H.c(H.at(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z[x]
this.c=x+1
return!0}},
ch:{"^":"aZ;",
bE:function(a,b){var z
if(typeof b!=="number")throw H.c(H.T(b))
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){z=this.gdF(b)
if(this.gdF(a)===z)return 0
if(this.gdF(a))return-1
return 1}return 0}else if(isNaN(a)){if(isNaN(b))return 0
return 1}else return-1},
gdF:function(a){return a===0?1/a<0:a<0},
hw:function(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw H.c(new P.S(""+a+".round()"))},
l1:function(a){return a},
bi:function(a,b){var z
if(b>20)throw H.c(P.a8(b,0,20,"fractionDigits",null))
z=a.toFixed(b)
if(a===0&&this.gdF(a))return"-"+z
return z},
l4:function(a,b){var z,y,x,w
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
f6:function(a){return-a},
aj:function(a,b){if(typeof b!=="number")throw H.c(H.T(b))
return a+b},
at:function(a,b){if(typeof b!=="number")throw H.c(H.T(b))
return a-b},
d7:function(a,b){if(typeof b!=="number")throw H.c(H.T(b))
return a/b},
cb:function(a,b){if(typeof b!=="number")throw H.c(H.T(b))
return a*b},
bM:function(a,b){return(a|0)===a?a/b|0:this.jb(a,b)},
jb:function(a,b){var z=a/b
if(z>=-2147483648&&z<=2147483647)return z|0
if(z>0){if(z!==1/0)return Math.floor(z)}else if(z>-1/0)return Math.ceil(z)
throw H.c(new P.S("Result of truncating division is "+H.b(z)+": "+H.b(a)+" ~/ "+b))},
dt:function(a,b){var z
if(a>0)z=b>31?0:a>>>b
else{z=b>31?31:b
z=a>>z>>>0}return z},
aZ:function(a,b){if(typeof b!=="number")throw H.c(H.T(b))
return a<b},
bj:function(a,b){if(typeof b!=="number")throw H.c(H.T(b))
return a>b},
d9:function(a,b){if(typeof b!=="number")throw H.c(H.T(b))
return a<=b},
bT:function(a,b){if(typeof b!=="number")throw H.c(H.T(b))
return a>=b},
gbz:function(a){return C.af},
$isM:1},
fk:{"^":"ch;",
gbz:function(a){return C.ae},
$isaX:1,
$isM:1,
$ist:1},
fj:{"^":"ch;",
gbz:function(a){return C.ad},
$isaX:1,
$isM:1},
ci:{"^":"aZ;",
cR:function(a,b){if(b<0)throw H.c(H.aL(a,b))
if(b>=a.length)H.i(H.aL(a,b))
return a.charCodeAt(b)},
cC:function(a,b){if(b>=a.length)throw H.c(H.aL(a,b))
return a.charCodeAt(b)},
dw:function(a,b,c){if(c>b.length)throw H.c(P.a8(c,0,b.length,null,null))
return new H.re(b,a,c)},
eB:function(a,b){return this.dw(a,b,0)},
hg:function(a,b,c){var z,y
if(c<0||c>b.length)throw H.c(P.a8(c,0,b.length,null,null))
z=a.length
if(c+z>b.length)return
for(y=0;y<z;++y)if(this.cR(b,c+y)!==this.cC(a,y))return
return new H.he(c,b,a)},
aj:function(a,b){if(typeof b!=="string")throw H.c(P.cH(b,null,null))
return a+b},
eH:function(a,b){var z,y
z=b.length
y=a.length
if(z>y)return!1
return b===this.bK(a,y-z)},
kO:function(a,b,c){H.bz(c)
return H.n(a,b,c)},
kP:function(a,b,c,d){H.bz(c)
P.ny(d,0,a.length,"startIndex",null)
return H.iI(a,b,c,d)},
d0:function(a,b,c){return this.kP(a,b,c,0)},
i3:function(a,b,c){var z
if(c>a.length)throw H.c(P.a8(c,0,a.length,null,null))
if(typeof b==="string"){z=c+b.length
if(z>a.length)return!1
return b===a.substring(c,z)}return J.iZ(b,a,c)!=null},
dg:function(a,b){return this.i3(a,b,0)},
aL:function(a,b,c){if(c==null)c=a.length
if(typeof c!=="number"||Math.floor(c)!==c)H.i(H.T(c))
if(b<0)throw H.c(P.cl(b,null,null))
if(typeof c!=="number")return H.x(c)
if(b>c)throw H.c(P.cl(b,null,null))
if(c>a.length)throw H.c(P.cl(c,null,null))
return a.substring(b,c)},
bK:function(a,b){return this.aL(a,b,null)},
f0:function(a){var z,y,x,w,v
z=a.trim()
y=z.length
if(y===0)return z
if(this.cC(z,0)===133){x=J.dF(z,1)
if(x===y)return""}else x=0
w=y-1
v=this.cR(z,w)===133?J.m5(z,w):y
if(x===0&&v===y)return z
return z.substring(x,v)},
l5:function(a){var z,y
if(typeof a.trimLeft!="undefined"){z=a.trimLeft()
if(z.length===0)return z
y=this.cC(z,0)===133?J.dF(z,1):0}else{y=J.dF(a,0)
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
b1:function(a,b){return this.bQ(a,b,0)},
kv:function(a,b,c){var z
c=a.length
z=b.length
if(c+z>c)c-=z
return a.lastIndexOf(b,c)},
ku:function(a,b){return this.kv(a,b,null)},
jA:function(a,b,c){if(b==null)H.i(H.T(b))
if(c>a.length)throw H.c(P.a8(c,0,a.length,null,null))
return H.wC(a,b,c)},
a7:function(a,b){return this.jA(a,b,0)},
gX:function(a){return a.length===0},
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
$iscW:1,
$ascW:I.bg,
$isq:1,
$isdZ:1,
v:{
fn:function(a){if(a<256)switch(a){case 9:case 10:case 11:case 12:case 13:case 32:case 133:case 160:return!0
default:return!1}switch(a){case 5760:case 8192:case 8193:case 8194:case 8195:case 8196:case 8197:case 8198:case 8199:case 8200:case 8201:case 8202:case 8232:case 8233:case 8239:case 8287:case 12288:case 65279:return!0
default:return!1}},
dF:function(a,b){var z,y
for(z=a.length;b<z;){y=C.b.cC(a,b)
if(y!==32&&y!==13&&!J.fn(y))break;++b}return b},
m5:function(a,b){var z,y
for(;b>0;b=z){z=b-1
y=C.b.cR(a,z)
if(y!==32&&y!==13&&!J.fn(y))break}return b}}}}],["","",,H,{"^":"",
hS:function(a){return a},
aj:function(){return new P.w("No element")},
dE:function(){return new P.w("Too many elements")},
fh:function(){return new P.w("Too few elements")},
cq:function(a,b,c,d){if(c-b<=32)H.h8(a,b,c,d)
else H.h7(a,b,c,d)},
h8:function(a,b,c,d){var z,y,x,w,v
for(z=b+1,y=J.L(a);z<=c;++z){x=y.j(a,z)
w=z
while(!0){if(!(w>b&&J.ab(d.$2(y.j(a,w-1),x),0)))break
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
if(h.aZ(i,0)){if(k!==m){t.n(a,k,t.j(a,m))
t.n(a,m,j)}++m}else for(;!0;){i=d.$2(t.j(a,l),r)
h=J.am(i)
if(h.bj(i,0)){--l
continue}else{g=l-1
if(h.aZ(i,0)){t.n(a,k,t.j(a,m))
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
t.n(a,m,j)}++m}else if(J.ab(d.$2(j,p),0))for(;!0;)if(J.ab(d.$2(t.j(a,l),p),0)){--l
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
H.cq(a,b,m-2,d)
H.cq(a,l+2,c,d)
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
break}}H.cq(a,m,l,d)}else H.cq(a,m,l,d)},
a_:{"^":"B;$ti"},
b1:{"^":"a_;$ti",
ga_:function(a){return new H.dO(this,this.gl(this),0,null,[H.y(this,"b1",0)])},
Z:function(a,b){var z,y
z=this.gl(this)
for(y=0;y<z;++y){b.$1(this.au(0,y))
if(z!==this.gl(this))throw H.c(new P.D(this))}},
gX:function(a){return this.gl(this)===0},
gw:function(a){if(this.gl(this)===0)throw H.c(H.aj())
return this.au(0,this.gl(this)-1)},
a7:function(a,b){var z,y
z=this.gl(this)
for(y=0;y<z;++y){if(J.e(this.au(0,y),b))return!0
if(z!==this.gl(this))throw H.c(new P.D(this))}return!1},
bt:function(a,b){var z,y
z=this.gl(this)
for(y=0;y<z;++y){if(b.$1(this.au(0,y))===!0)return!0
if(z!==this.gl(this))throw H.c(new P.D(this))}return!1},
aT:function(a,b,c){var z,y,x
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
c9:function(a,b){return this.dh(0,b)},
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
if(y)throw H.c(P.cT(b,this,"index",null,null))
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
dO:{"^":"d;a,b,c,d,$ti",
gT:function(){return this.d},
u:function(){var z,y,x
z=this.a
y=z.gl(z)
if(this.b!==y)throw H.c(new P.D(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z.au(0,x);++this.c
return!0}},
dR:{"^":"B;a,b,$ti",
ga_:function(a){return new H.mA(null,J.ai(this.a),this.b,this.$ti)},
gl:function(a){return J.aO(this.a)},
gX:function(a){return J.eS(this.a)},
gw:function(a){return this.b.$1(J.iW(this.a))},
$asB:function(a,b){return[b]},
v:{
bI:function(a,b,c,d){if(!!J.o(a).$isa_)return new H.bG(a,b,[c,d])
return new H.dR(a,b,[c,d])}}},
bG:{"^":"dR;a,b,$ti",$isa_:1,
$asa_:function(a,b){return[b]}},
mA:{"^":"cV;a,b,c,$ti",
u:function(){var z=this.b
if(z.u()){this.a=this.c.$1(z.gT())
return!0}this.a=null
return!1},
gT:function(){return this.a},
$ascV:function(a,b){return[b]}},
ar:{"^":"b1;a,b,$ti",
gl:function(a){return J.aO(this.a)},
au:function(a,b){return this.b.$1(J.eR(this.a,b))},
$asb1:function(a,b){return[b]},
$asa_:function(a,b){return[b]},
$asB:function(a,b){return[b]}},
K:{"^":"B;a,b,$ti",
ga_:function(a){return new H.bT(J.ai(this.a),this.b,this.$ti)},
aJ:function(a,b){return new H.dR(this,b,[H.l(this,0),null])}},
bT:{"^":"cV;a,b,$ti",
u:function(){var z,y
for(z=this.a,y=this.b;z.u();)if(y.$1(z.gT())===!0)return!0
return!1},
gT:function(){return this.a.gT()}},
h_:{"^":"B;a,b,$ti",
ga_:function(a){return new H.or(J.ai(this.a),this.b,this.$ti)},
v:{
oq:function(a,b,c){if(!!J.o(a).$isa_)return new H.l6(a,H.hS(b),[c])
return new H.h_(a,H.hS(b),[c])}}},
l6:{"^":"h_;a,b,$ti",
gl:function(a){var z=J.aO(this.a)-this.b
if(z>=0)return z
return 0},
$isa_:1},
or:{"^":"cV;a,b,$ti",
u:function(){var z,y
for(z=this.a,y=0;y<this.b;++y)z.u()
this.b=0
return z.u()},
gT:function(){return this.a.gT()}},
l7:{"^":"d;$ti",
u:function(){return!1},
gT:function(){return}}}],["","",,H,{"^":"",
cw:function(a,b){var z=a.cT(b)
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
y.f=new H.qA(P.bb(null,H.cu),0)
x=P.t
y.z=new H.R(0,null,null,null,null,null,0,[x,H.em])
y.ch=new H.R(0,null,null,null,null,null,0,[x,null])
if(y.x===!0){w=new H.r_()
y.Q=w
self.onmessage=function(c,d){return function(e){c(d,e)}}(H.lY,w)
self.dartPrint=self.dartPrint||function(c){return function(d){if(self.console&&self.console.log)self.console.log(d)
else self.postMessage(c(d))}}(H.r1)}if(init.globalState.x===!0)return
y=init.globalState.a++
w=P.a6(null,null,null,x)
v=new H.cn(0,null,!1)
u=new H.em(y,new H.R(0,null,null,null,null,null,0,[x,H.cn]),w,init.createNewIsolate(),v,new H.bl(H.dn()),new H.bl(H.dn()),!1,!1,[],P.a6(null,null,null,null),null,null,!1,!0,P.a6(null,null,null,null))
w.t(0,0)
u.e4(0,v)
init.globalState.e=u
init.globalState.d=u
if(H.az(a,{func:1,args:[,]}))u.cT(new H.vH(z,a))
else if(H.az(a,{func:1,args:[,,]}))u.cT(new H.vI(z,a))
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
n=new H.em(y,new H.R(0,null,null,null,null,null,0,[q,H.cn]),p,init.createNewIsolate(),o,new H.bl(H.dn()),new H.bl(H.dn()),!1,!1,[],P.a6(null,null,null,null),null,null,!1,!0,P.a6(null,null,null,null))
p.t(0,0)
n.e4(0,o)
init.globalState.f.a.aE(new H.cu(n,new H.lZ(w,v,u,t,s,r),"worker-start"))
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
self.postMessage(q)}else P.eF(y.j(z,"msg"))
break
case"error":throw H.c(y.j(z,"msg"))}},
lX:function(a){var z,y,x,w
if(init.globalState.x===!0){y=init.globalState.Q
x=P.a0(["command","log","msg",a])
x=new H.bv(!0,P.bW(null,P.t)).bq(x)
y.toString
self.postMessage(x)}else try{self.console.log(a)}catch(w){H.C(w)
z=H.E(w)
y=P.cR(z)
throw H.c(y)}},
m_:function(a,b,c,d,e,f){var z,y,x,w
z=init.globalState.d
y=z.a
$.fK=$.fK+("_"+y)
$.fL=$.fL+("_"+y)
y=z.e
x=init.globalState.d.a
w=z.f
f.F(["spawned",new H.cv(y,x),w,z.r])
x=new H.m0(a,b,c,d,z)
if(e===!0){z.fT(w,w)
init.globalState.f.a.aE(new H.cu(z,x,"start isolate"))}else x.$0()},
rv:function(a){return new H.d9(!0,[]).c_(new H.bv(!1,P.bW(null,P.t)).bq(a))},
vH:{"^":"a:2;a,b",
$0:function(){this.b.$1(this.a.a)}},
vI:{"^":"a:2;a,b",
$0:function(){this.b.$2(this.a.a,null)}},
r0:{"^":"d;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",v:{
r1:function(a){var z=P.a0(["command","print","msg",a])
return new H.bv(!0,P.bW(null,P.t)).bq(z)}}},
em:{"^":"d;i:a<,b,c,ks:d<,jC:e<,f,r,x,cW:y<,z,Q,ch,cx,cy,db,dx",
fT:function(a,b){if(!this.f.A(0,a))return
if(this.Q.t(0,b)&&!this.y)this.y=!0
this.cN()},
kN:function(a){var z,y,x
if(!this.y)return
z=this.Q
z.a3(0,a)
if(z.a===0){for(z=this.z;y=z.length,y!==0;){if(0>=y)return H.f(z,-1)
x=z.pop()
init.globalState.f.a.fR(x)}this.y=!1}this.cN()},
jq:function(a,b){var z,y,x
if(this.ch==null)this.ch=[]
for(z=J.o(a),y=0;x=this.ch,y<x.length;y+=2)if(z.A(a,x[y])){z=this.ch
x=y+1
if(x>=z.length)return H.f(z,x)
z[x]=b
return}x.push(a)
this.ch.push(b)},
kL:function(a){var z,y,x
if(this.ch==null)return
for(z=J.o(a),y=0;x=this.ch,y<x.length;y+=2)if(z.A(a,x[y])){z=this.ch
x=y+2
z.toString
if(typeof z!=="object"||z===null||!!z.fixed$length)H.i(new P.S("removeRange"))
P.cm(y,x,z.length,null,null,null)
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
if(z){this.eP()
return}z=this.cx
if(z==null){z=P.bb(null,null)
this.cx=z}z.aE(this.gkt())},
k5:function(a,b){var z,y,x
z=this.dx
if(z.a===0){if(this.db===!0&&this===init.globalState.e)return
if(self.console&&self.console.error)self.console.error(a,b)
else{P.eF(a)
if(b!=null)P.eF(b)}return}y=new Array(2)
y.fixed$length=Array
y[0]=J.h(a)
y[1]=b==null?null:J.h(b)
for(x=new P.af(z,z.r,null,null,[null]),x.c=z.e;x.u();)x.d.F(y)},
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
if(this.db===!0){this.eP()
if(this===init.globalState.e)throw u}}finally{this.cy=x
init.globalState.d=z
if(z!=null)$=z.gks()
if(this.cx!=null)for(;t=this.cx,!t.gX(t);)this.cx.dL().$0()}return y},
cp:function(a){return this.b.j(0,a)},
e4:function(a,b){var z=this.b
if(z.ad(a))throw H.c(P.cR("Registry: ports must be registered only once."))
z.n(0,a,b)},
cN:function(){var z=this.b
if(z.gl(z)-this.c.a>0||this.y||!this.x)init.globalState.z.n(0,this.a,this)
else this.eP()},
eP:[function(){var z,y,x,w,v
z=this.cx
if(z!=null)z.bg(0)
for(z=this.b,y=z.gcw(),y=y.ga_(y);y.u();)y.gT().ix()
z.bg(0)
this.c.bg(0)
init.globalState.z.a3(0,this.a)
this.dx.bg(0)
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
y=y.gX(y)}else y=!1
else y=!1
else y=!1
if(y)H.i(P.cR("Program exited with open ReceivePorts."))
y=init.globalState
if(y.x===!0){x=y.z
x=x.gX(x)&&y.f.b===0}else x=!1
if(x){y=y.Q
x=P.a0(["command","close"])
x=new H.bv(!0,new P.hN(0,null,null,null,null,null,0,[null,P.t])).bq(x)
y.toString
self.postMessage(x)}return!1}z.kJ()
return!0},
fL:function(){if(self.window!=null)new H.qB(this).$0()
else for(;this.hz(););},
by:function(){var z,y,x,w,v
if(init.globalState.x!==!0)this.fL()
else try{this.fL()}catch(x){z=H.C(x)
y=H.E(x)
w=init.globalState.Q
v=P.a0(["command","error","msg",H.b(z)+"\n"+H.b(y)])
v=new H.bv(!0,P.bW(null,P.t)).bq(v)
w.toString
self.postMessage(v)}}},
qB:{"^":"a:7;a",
$0:function(){if(!this.a.hz())return
P.pC(C.x,this)}},
cu:{"^":"d;a,b,c",
kJ:function(){var z=this.a
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
cv:{"^":"hH;b,a",
F:function(a){var z,y,x
z=init.globalState.z.j(0,this.a)
if(z==null)return
y=this.b
if(y.gfA())return
x=H.rv(a)
if(z.gjC()===y){y=J.L(x)
switch(y.j(x,0)){case"pause":z.fT(y.j(x,1),y.j(x,2))
break
case"resume":z.kN(y.j(x,1))
break
case"add-ondone":z.jq(y.j(x,1),y.j(x,2))
break
case"remove-ondone":z.kL(y.j(x,1))
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
break}return}init.globalState.f.a.aE(new H.cu(z,new H.r3(this,x),"receive"))},
A:function(a,b){if(b==null)return!1
return b instanceof H.cv&&J.e(this.b,b.b)},
gB:function(a){return this.b.geh()}},
r3:{"^":"a:2;a,b",
$0:function(){var z=this.a.b
if(!z.gfA())z.im(this.b)}},
eo:{"^":"hH;b,c,a",
F:function(a){var z,y,x
z=P.a0(["command","message","port",this,"msg",a])
y=new H.bv(!0,P.bW(null,P.t)).bq(z)
if(init.globalState.x===!0){init.globalState.Q.toString
self.postMessage(y)}else{x=init.globalState.ch.j(0,this.b)
if(x!=null)x.postMessage(y)}},
A:function(a,b){if(b==null)return!1
return b instanceof H.eo&&J.e(this.b,b.b)&&J.e(this.a,b.a)&&J.e(this.c,b.c)},
gB:function(a){var z,y,x
z=this.b
if(typeof z!=="number")return z.f7()
y=this.a
if(typeof y!=="number")return y.f7()
x=this.c
if(typeof x!=="number")return H.x(x)
return(z<<16^y<<8^x)>>>0}},
cn:{"^":"d;eh:a<,b,fA:c<",
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
nA:{"^":"al;a,b",
aI:function(a,b,c,d){var z=this.b
z.toString
return new P.d8(z,[H.l(z,0)]).aI(a,b,c,d)},
eS:function(a,b,c){return this.aI(a,null,b,c)},
bu:[function(){this.a.bu()
this.b.bu()},"$0","gjy",0,0,7],
ic:function(a){var z=new P.ri(null,0,null,null,null,null,this.gjy(),[null])
this.b=z
this.a.b=z.gjh(z)},
$asal:I.bg},
py:{"^":"d;a,b,c",
gc2:function(){return this.c!=null},
ih:function(a,b){var z,y
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
if(typeof z!=="number")return z.ld()
z=C.j.dt(z,0)^C.j.bM(z,4294967296)
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
if(!!z.$iscW)return this.hS(a)
if(!!z.$islV){x=this.ghP()
z=a.gcn()
z=H.bI(z,x,H.y(z,"B",0),null)
z=P.P(z,!0,H.y(z,"B",0))
w=a.gcw()
w=H.bI(w,x,H.y(w,"B",0),null)
return["map",z,P.P(w,!0,H.y(w,"B",0))]}if(!!z.$isfm)return this.hT(a)
if(!!z.$isaZ)this.hC(a)
if(!!z.$isnz)this.d3(a,"RawReceivePorts can't be transmitted:")
if(!!z.$iscv)return this.hU(a)
if(!!z.$iseo)return this.hV(a)
if(!!z.$isa){v=a.$static_name
if(v==null)this.d3(a,"Closures can't be transmitted:")
return["function",v]}if(!!z.$isbl)return["capability",a.a]
if(!(a instanceof P.d))this.hC(a)
return["dart",init.classIdExtractor(a),this.hR(init.classFieldsExtractor(a))]},"$1","ghP",2,0,0],
d3:function(a,b){throw H.c(new P.S((b==null?"Can't transmit:":b)+" "+H.b(a)))},
hC:function(a){return this.d3(a,null)},
hS:function(a){var z=this.hQ(a)
if(!!a.fixed$length)return["fixed",z]
if(!a.fixed$length)return["extendable",z]
if(!a.immutable$list)return["mutable",z]
if(a.constructor===Array)return["const",z]
this.d3(a,"Can't serialize indexable: ")},
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
if(!!a.constructor&&a.constructor!==Object)this.d3(a,"Only plain JS Objects are supported:")
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
d9:{"^":"d;a,b",
c_:[function(a){var z,y,x,w,v,u
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
if(typeof a!=="object"||a===null||a.constructor!==Array)throw H.c(P.G("Bad serialized message: "+H.b(a)))
switch(C.a.geJ(a)){case"ref":if(1>=a.length)return H.f(a,1)
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
t=new H.cv(u,x)}else t=new H.eo(y,w,x)
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
uF:function(a){return init.types[a]},
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
return function(b,c){return b.replace(/[^<,> ]+/g,function(d){return c[d]||d})}(w+H.dl(H.cz(a),0,null),init.mangledGlobalNames)},
d_:function(a){return"Instance of '"+H.bM(a)+"'"},
as:function(a){var z
if(a<=65535)return String.fromCharCode(a)
if(a<=1114111){z=a-65536
return String.fromCharCode((55296|C.e.dt(z,10))>>>0,56320|z&1023)}throw H.c(P.a8(a,0,1114111,null,null))},
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
e1:function(a,b){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.c(H.T(a))
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
if(y)return P.cT(b,a,"index",null,z)
return P.cl(b,"index",null)},
T:function(a){return new P.b7(!0,a,null,null)},
dg:function(a){if(typeof a!=="number")throw H.c(H.T(a))
return a},
rR:function(a){if(typeof a!=="number"||Math.floor(a)!==a)throw H.c(H.T(a))
return a},
bz:function(a){if(typeof a!=="string")throw H.c(H.T(a))
return a},
c:function(a){var z
if(a==null)a=new P.cY()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.iO})
z.name=""}else z.toString=H.iO
return z},
iO:function(){return J.h(this.dartException)},
i:function(a){throw H.c(a)},
at:function(a){throw H.c(new P.D(a))},
C:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.wN(a)
if(a==null)return
if(a instanceof H.dB)return z.$1(a.a)
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.e.dt(x,16)&8191)===10)switch(w){case 438:return z.$1(H.dI(H.b(y)+" (Error "+w+")",null))
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
if(v)return z.$1(new H.fB(y,l==null?null:l.method))}}return z.$1(new H.pH(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.h9()
y=function(b){try{return String(b)}catch(k){}return null}(a)
return z.$1(new P.b7(!1,null,null,typeof y==="string"?y.replace(/^RangeError:\s*/,""):y))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.h9()
return a},
E:function(a){var z
if(a instanceof H.dB)return a.b
if(a==null)return new H.hP(a,null)
z=a.$cachedTrace
if(z!=null)return z
return a.$cachedTrace=new H.hP(a,null)},
uW:function(a){if(a==null||typeof a!='object')return J.j(a)
else return H.aF(a)},
uc:function(a,b){var z,y,x,w
z=a.length
for(y=0;y<z;y=w){x=y+1
w=x+1
b.n(0,a[y],a[x])}return b},
uL:function(a,b,c,d,e,f,g){switch(c){case 0:return H.cw(b,new H.uM(a))
case 1:return H.cw(b,new H.uN(a,d))
case 2:return H.cw(b,new H.uO(a,d,e))
case 3:return H.cw(b,new H.uP(a,d,e,f))
case 4:return H.cw(b,new H.uQ(a,d,e,f,g))}throw H.c(P.cR("Unsupported number of arguments for wrapped closure"))},
di:function(a,b){var z=a.$identity
if(!!z)return z
z=function(c,d,e,f){return function(g,h,i,j){return f(c,e,d,g,h,i,j)}}(a,b,init.globalState.d,H.uL)
a.$identity=z
return z},
k4:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=z.$callName
if(!!J.o(c).$isN){z.$reflectionInfo=c
x=H.nC(z).r}else x=c
w=d?Object.create(new H.oM().constructor.prototype):Object.create(new H.du(null,null,null,null).constructor.prototype)
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
t=!1}if(typeof x=="number")r=function(g,h){return function(){return g(h)}}(H.uF,x)
else if(typeof x=="function")if(d)r=x
else{q=t?H.f_:H.dv
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
k1:function(a,b,c,d){var z=H.dv
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
if(v==null){v=H.cK("self")
$.bF=v}return new Function(w+H.b(v)+";return "+u+"."+H.b(z)+"();}")()}t="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w=$.aP
$.aP=J.ap(w,1)
t+=H.b(w)
w="return function("+t+"){return this."
v=$.bF
if(v==null){v=H.cK("self")
$.bF=v}return new Function(w+H.b(v)+"."+H.b(z)+"("+t+");}")()},
k2:function(a,b,c,d){var z,y
z=H.dv
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
if(y==null){y=H.cK("receiver")
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
ey:function(a,b,c,d,e,f){var z
b.fixed$length=Array
if(!!J.o(c).$isN){c.fixed$length=Array
z=c}else z=c
return H.k4(a,b,z,!!d,e,f)},
v4:function(a,b){var z=J.L(b)
throw H.c(H.cM(H.bM(a),z.aL(b,3,z.gl(b))))},
F:function(a,b){var z
if(a!=null)z=(typeof a==="object"||typeof a==="function")&&J.o(a)[b]
else z=!0
if(z)return a
H.v4(a,b)},
eA:function(a){var z=J.o(a)
return"$S" in z?z.$S():null},
az:function(a,b){var z
if(a==null)return!1
z=H.eA(a)
return z==null?!1:H.eD(z,b)},
ij:function(a,b){var z,y
if(a==null)return a
if(H.az(a,b))return a
z=H.Z(b,null)
y=H.eA(a)
throw H.c(H.cM(y!=null?H.Z(y,null):H.bM(a),z))},
wK:function(a){throw H.c(new P.kl(a))},
dn:function(){return(Math.random()*0x100000000>>>0)+(Math.random()*0x100000000>>>0)*4294967296},
bf:function(a){return new H.aw(a,null)},
p:function(a,b){a.$ti=b
return a},
cz:function(a){if(a==null)return
return a.$ti},
ip:function(a,b){return H.eP(a["$as"+H.b(b)],H.cz(a))},
y:function(a,b,c){var z=H.ip(a,b)
return z==null?null:z[c]},
l:function(a,b){var z=H.cz(a)
return z==null?null:z[b]},
Z:function(a,b){var z
if(a==null)return"dynamic"
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a[0].builtin$cls+H.dl(a,1,b)
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
for(x=H.ub(r),q=x.length,v="",u=0;u<q;++u,v=", "){p=x[u]
w=w+v+H.Z(r[p],b)+(" "+H.b(p))}w+="}"}return"("+w+") => "+z},
dl:function(a,b,c){var z,y,x,w,v,u
if(a==null)return""
z=new P.bS("")
for(y=b,x=!0,w=!0,v="";y<a.length;++y){if(x)x=!1
else z.C=v+", "
u=a[y]
if(u!=null)w=!1
v=z.C+=H.Z(u,c)}return w?"":"<"+z.k(0)+">"},
iq:function(a){var z,y
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
aW:function(a,b,c,d){var z,y
if(a==null)return!1
z=H.cz(a)
y=J.o(a)
if(y[b]==null)return!1
return H.i6(H.eP(y[d],z),c)},
aN:function(a,b,c,d){if(a==null)return a
if(H.aW(a,b,c,d))return a
throw H.c(H.cM(H.bM(a),function(e,f){return e.replace(/[^<,> ]+/g,function(g){return f[g]||g})}(b.substring(3)+H.dl(c,0,null),init.mangledGlobalNames)))},
i6:function(a,b){var z,y
if(a==null||b==null)return!0
z=a.length
for(y=0;y<z;++y)if(!H.ao(a[y],b[y]))return!1
return!0},
be:function(a,b,c){return a.apply(b,H.ip(b,c))},
dh:function(a,b){var z,y,x
if(a==null)return b==null||b.builtin$cls==="d"||b.builtin$cls==="au"
if(b==null)return!0
z=H.cz(a)
a=J.o(a)
y=a.constructor
if(z!=null){z=z.slice()
z.splice(0,0,y)
y=z}if('func' in b){x=a.$S
if(x==null)return!1
return H.eD(x.apply(a,null),b)}return H.ao(y,b)},
iJ:function(a,b){if(a!=null&&!H.dh(a,b))throw H.c(H.cM(H.bM(a),H.Z(b,null)))
return a},
ao:function(a,b){var z,y,x,w,v,u
if(a===b)return!0
if(a==null||b==null)return!0
if(a.builtin$cls==="au")return!0
if('func' in b)return H.eD(a,b)
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
return H.i6(H.eP(u,z),x)},
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
eD:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
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
wC:function(a,b,c){var z
if(typeof b==="string")return a.indexOf(b,c)>=0
else{z=J.o(b)
if(!!z.$isdG){z=C.b.bK(a,c)
return b.b.test(z)}else{z=z.eB(b,C.b.bK(a,c))
return!z.gX(z)}}},
wE:function(a,b,c,d){var z,y,x
z=b.fq(a,d)
if(z==null)return a
y=z.b
x=y.index
return H.eO(a,x,x+y[0].length,c)},
n:function(a,b,c){var z,y,x
H.bz(c)
if(b==="")if(a==="")return c
else{z=a.length
y=H.b(c)
for(x=0;x<z;++x)y=y+a[x]+H.b(c)
return y.charCodeAt(0)==0?y:y}else return a.replace(new RegExp(b.replace(/[[\]{}()*+?.\\^$|]/g,"\\$&"),'g'),c.replace(/\$/g,"$$$$"))},
xz:[function(a){return a},"$1","hT",2,0,23],
wD:function(a,b,c,d){var z,y,x,w,v,u
z=J.o(b)
if(!z.$isdZ)throw H.c(P.cH(b,"pattern","is not a Pattern"))
for(z=z.eB(b,a),z=new H.hF(z.a,z.b,z.c,null),y=0,x="";z.u();){w=z.d
v=w.b
u=v.index
x=x+H.b(H.hT().$1(C.b.aL(a,y,u)))+H.b(c.$1(w))
y=u+v[0].length}z=x+H.b(H.hT().$1(C.b.bK(a,y)))
return z.charCodeAt(0)==0?z:z},
iI:function(a,b,c,d){var z,y,x,w,v,u
if(typeof b==="string"){z=a.indexOf(b,d)
if(z<0)return a
return H.eO(a,z,z+b.length,c)}y=J.o(b)
if(!!y.$isdG)return d===0?a.replace(b.b,c.replace(/\$/g,"$$$$")):H.wE(a,b,c,d)
if(b==null)H.i(H.T(b))
y=y.dw(b,a,d)
x=y.ga_(y)
if(!x.u())return a
w=x.gT()
y=w.gfb()
v=w.gh3()
H.bz(c)
u=P.cm(y,v,a.length,null,null,null)
H.rR(u)
return H.eO(a,y,u,c)},
eO:function(a,b,c,d){var z,y
z=a.substring(0,b)
y=a.substring(c)
return z+H.b(d)+y},
k7:{"^":"d;$ti",
gX:function(a){return this.gl(this)===0},
gav:function(a){return this.gl(this)!==0},
k:function(a){return P.dS(this)},
n:function(a,b,c){return H.k8()},
$isI:1},
k9:{"^":"k7;a,b,c,$ti",
gl:function(a){return this.a},
ad:function(a){if(typeof a!=="string")return!1
if("__proto__"===a)return!1
return this.b.hasOwnProperty(a)},
j:function(a,b){if(!this.ad(b))return
return this.fs(b)},
fs:function(a){return this.b[a]},
Z:function(a,b){var z,y,x,w
z=this.c
for(y=z.length,x=0;x<y;++x){w=z[x]
b.$2(w,this.fs(w))}}},
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
d7:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
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
dI:function(a,b){var z,y
z=b==null
y=z?null:b.method
return new H.m7(a,y,z?null:b.receiver)}}},
pH:{"^":"a5;a",
k:function(a){var z=this.a
return z.length===0?"Error":"Error: "+z}},
dB:{"^":"d;a,br:b<"},
wN:{"^":"a:0;a",
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
uM:{"^":"a:2;a",
$0:function(){return this.a.$0()}},
uN:{"^":"a:2;a,b",
$0:function(){return this.a.$1(this.b)}},
uO:{"^":"a:2;a,b,c",
$0:function(){return this.a.$2(this.b,this.c)}},
uP:{"^":"a:2;a,b,c,d",
$0:function(){return this.a.$3(this.b,this.c,this.d)}},
uQ:{"^":"a:2;a,b,c,d,e",
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
du:{"^":"hm;a,b,c,d",
A:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof H.du))return!1
return this.a===b.a&&this.b===b.b&&this.c===b.c},
gB:function(a){var z,y
z=this.c
if(z==null)y=H.aF(this.a)
else y=typeof z!=="object"?J.j(z):H.aF(z)
z=H.aF(this.b)
if(typeof y!=="number")return y.le()
return(y^z)>>>0},
k:function(a){var z=this.c
if(z==null)z=this.a
return"Closure '"+H.b(this.d)+"' of "+H.d_(z)},
v:{
dv:function(a){return a.a},
f_:function(a){return a.c},
jT:function(){var z=$.bF
if(z==null){z=H.cK("self")
$.bF=z}return z},
cK:function(a){var z,y,x,w,v
z=new H.du("self","target","receiver","name")
y=Object.getOwnPropertyNames(z)
y.fixed$length=Array
x=y
for(y=x.length,w=0;w<y;++w){v=x[w]
if(z[v]===a)return v}}}},
jY:{"^":"a5;a",
k:function(a){return this.a},
v:{
cM:function(a,b){return new H.jY("CastError: Casting value of type '"+a+"' to incompatible type '"+b+"'")}}},
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
gX:function(a){return this.a===0},
gav:function(a){return!this.gX(this)},
gcn:function(){return new H.mo(this,[H.l(this,0)])},
gcw:function(){return H.bI(this.gcn(),new H.m6(this),H.l(this,0),H.l(this,1))},
ad:function(a){var z,y
if(typeof a==="string"){z=this.b
if(z==null)return!1
return this.fm(z,a)}else if(typeof a==="number"&&(a&0x3ffffff)===a){y=this.c
if(y==null)return!1
return this.fm(y,a)}else return this.kh(a)},
kh:function(a){var z=this.d
if(z==null)return!1
return this.cV(this.dn(z,this.cU(a)),a)>=0},
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
y=this.dn(z,this.cU(a))
x=this.cV(y,a)
if(x<0)return
return y[x].gc1()},
n:function(a,b,c){var z,y
if(typeof b==="string"){z=this.b
if(z==null){z=this.ej()
this.b=z}this.fg(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=this.ej()
this.c=y}this.fg(y,b,c)}else this.kk(b,c)},
kk:function(a,b){var z,y,x,w
z=this.d
if(z==null){z=this.ej()
this.d=z}y=this.cU(a)
x=this.dn(z,y)
if(x==null)this.ew(z,y,[this.ek(a,b)])
else{w=this.cV(x,a)
if(w>=0)x[w].sc1(b)
else x.push(this.ek(a,b))}},
kK:function(a,b){var z
if(this.ad(a))return this.j(0,a)
z=b.$0()
this.n(0,a,z)
return z},
a3:function(a,b){if(typeof b==="string")return this.fK(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.fK(this.c,b)
else return this.kj(b)},
kj:function(a){var z,y,x,w
z=this.d
if(z==null)return
y=this.dn(z,this.cU(a))
x=this.cV(y,a)
if(x<0)return
w=y.splice(x,1)[0]
this.fM(w)
return w.gc1()},
bg:function(a){if(this.a>0){this.f=null
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
fg:function(a,b,c){var z=this.cF(a,b)
if(z==null)this.ew(a,b,this.ek(b,c))
else z.sc1(c)},
fK:function(a,b){var z
if(a==null)return
z=this.cF(a,b)
if(z==null)return
this.fM(z)
this.fn(a,b)
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
fM:function(a){var z,y
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
k:function(a){return P.dS(this)},
cF:function(a,b){return a[b]},
dn:function(a,b){return a[b]},
ew:function(a,b,c){a[b]=c},
fn:function(a,b){delete a[b]},
fm:function(a,b){return this.cF(a,b)!=null},
ej:function(){var z=Object.create(null)
this.ew(z,"<non-identifier-key>",z)
this.fn(z,"<non-identifier-key>")
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
gX:function(a){return this.a.a===0},
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
gT:function(){return this.d},
u:function(){var z=this.a
if(this.b!==z.r)throw H.c(new P.D(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.c
return!0}}}},
dG:{"^":"d;a,b,c,d",
k:function(a){return"RegExp/"+this.a+"/"},
giV:function(){var z=this.c
if(z!=null)return z
z=this.b
z=H.dH(this.a,z.multiline,!z.ignoreCase,!0)
this.c=z
return z},
giU:function(){var z=this.d
if(z!=null)return z
z=this.b
z=H.dH(this.a+"|()",z.multiline,!z.ignoreCase,!0)
this.d=z
return z},
dw:function(a,b,c){if(c>b.length)throw H.c(P.a8(c,0,b.length,null,null))
return new H.qg(this,b,c)},
eB:function(a,b){return this.dw(a,b,0)},
fq:function(a,b){var z,y
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
$isdZ:1,
v:{
dH:function(a,b,c,d){var z,y,x,w
z=b?"m":""
y=c?"":"i"
x=d?"g":""
w=function(e,f){try{return new RegExp(e,f)}catch(v){return v}}(a,z+y+x)
if(w instanceof RegExp)return w
throw H.c(new P.fc("Illegal RegExp pattern ("+String(w)+")",a,null))}}},
hO:{"^":"d;a,b",
gfb:function(){return this.b.index},
gh3:function(){var z=this.b
return z.index+z[0].length},
j:function(a,b){var z=this.b
if(b>>>0!==b||b>=z.length)return H.f(z,b)
return z[b]},
$isbo:1},
qg:{"^":"ce;a,b,c",
ga_:function(a){return new H.hF(this.a,this.b,this.c,null)},
$asce:function(){return[P.bo]},
$asB:function(){return[P.bo]}},
hF:{"^":"d;a,b,c,d",
gT:function(){return this.d},
u:function(){var z,y,x,w
z=this.b
if(z==null)return!1
y=this.c
if(y<=z.length){x=this.a.fq(z,y)
if(x!=null){this.d=x
z=x.b
y=z.index
w=y+z[0].length
this.c=y===w?w+1:w
return!0}}this.d=null
this.b=null
return!1}},
he:{"^":"d;fb:a<,b,c",
gh3:function(){return this.a+this.c.length},
j:function(a,b){if(b!==0)H.i(P.cl(b,null,null))
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
gT:function(){return this.d}}}],["","",,H,{"^":"",
ub:function(a){var z=H.p(a?Object.keys(a):[],[null])
z.fixed$length=Array
return z}}],["","",,H,{"^":"",
v3:function(a){if(typeof dartPrint=="function"){dartPrint(a)
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
new self.MutationObserver(H.di(new P.qj(z),1)).observe(y,{childList:true})
return new P.qi(z,y,x)}else if(self.setImmediate!=null)return P.rN()
return P.rO()},
xt:[function(a){++init.globalState.f.b
self.scheduleImmediate(H.di(new P.qk(a),0))},"$1","rM",2,0,15],
xu:[function(a){++init.globalState.f.b
self.setImmediate(H.di(new P.ql(a),0))},"$1","rN",2,0,15],
xv:[function(a){P.ec(C.x,a)},"$1","rO",2,0,15],
aK:function(a,b){P.ep(null,a)
return b.gh7()},
ax:function(a,b){P.ep(a,b)},
aJ:function(a,b){b.bZ(a)},
aI:function(a,b){b.eF(H.C(a),H.E(a))},
ep:function(a,b){var z,y,x,w
z=new P.rp(b)
y=new P.rq(b)
x=J.o(a)
if(!!x.$isH)a.ex(z,y)
else if(!!x.$isQ)a.eZ(z,y)
else{w=new P.H(0,$.r,null,[null])
w.a=4
w.c=a
w.ex(z,null)}},
ay:function(a){var z=function(b,c){return function(d,e){while(true)try{b(d,e)
break}catch(y){e=y
d=c}}}(a,1)
$.r.toString
return new P.rK(z)},
dd:function(a,b,c){var z,y,x
if(b===0){if(c.geM())c.c.eE()
else c.a.bu()
return}else if(b===1){if(c.geM())c.c.eF(H.C(a),H.E(a))
else{z=H.C(a)
y=H.E(a)
c.a.eA(z,y)
c.a.bu()}return}if(a instanceof P.bU){if(c.geM()){b.$2(2,null)
return}z=a.b
if(z===0){z=a.a
J.dr(c.a,z)
P.cC(new P.rn(b,c))
return}else if(z===1){x=a.a
c.a.ju(x,!1).c6(new P.ro(b,c))
return}}P.ep(a,b)},
rJ:function(a){return a.ge2()},
eu:function(a,b){if(H.az(a,{func:1,args:[P.au,P.au]})){b.toString
return a}else{b.toString
return a}},
aC:function(a){return new P.rg(new P.H(0,$.r,null,[a]),[a])},
ry:function(a,b,c){$.r.toString
a.bl(b,c)},
rC:function(){var z,y
for(;z=$.bw,z!=null;){$.bY=null
y=z.gcq()
$.bw=y
if(y==null)$.bX=null
z.gjw().$0()}},
xy:[function(){$.er=!0
try{P.rC()}finally{$.bY=null
$.er=!1
if($.bw!=null)$.$get$eg().$1(P.i7())}},"$0","i7",0,0,7],
i1:function(a){var z=new P.hG(a,null)
if($.bw==null){$.bX=z
$.bw=z
if(!$.er)$.$get$eg().$1(P.i7())}else{$.bX.b=z
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
cC:function(a){var z=$.r
if(C.i===z){P.by(null,null,C.i,a)
return}z.toString
P.by(null,null,z,z.eC(a,!0))},
xo:function(a,b){return new P.rd(null,a,!1,[b])},
ev:function(a){var z,y,x,w
if(a==null)return
try{a.$0()}catch(x){z=H.C(x)
y=H.E(x)
w=$.r
w.toString
P.bx(null,null,w,z,y)}},
rD:[function(a,b){var z=$.r
z.toString
P.bx(null,null,z,a,b)},function(a){return P.rD(a,null)},"$2","$1","rQ",2,2,18,0],
xx:[function(){},"$0","rP",0,0,7],
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
else b.bl(c,d)},
hQ:function(a,b){return new P.rs(a,b)},
hR:function(a,b,c){var z=a.ck()
if(!!J.o(z).$isQ&&z!==$.$get$bm())z.c8(new P.ru(b,c))
else b.bk(c)},
rm:function(a,b,c){$.r.toString
a.cf(b,c)},
pC:function(a,b){var z=$.r
if(z===C.i){z.toString
return P.ec(a,b)}return P.ec(a,z.eC(b,!0))},
ec:function(a,b){var z=C.e.bM(a.a,1000)
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
if(z)d=c.eC(d,!(!z||!1))
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
$2:function(a,b){this.a.$2(1,new H.dB(a,b))}},
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
geM:function(){return this.c!=null},
t:function(a,b){return J.dr(this.a,b)},
eA:function(a,b){return this.a.eA(a,b)},
bu:function(){return this.a.bu()},
ij:function(a){var z=new P.qp(a)
this.a=new P.qu(null,0,null,new P.qr(z),null,new P.qs(this,z),new P.qt(this,a),[null])},
v:{
qn:function(a){var z=new P.qm(null,!1,null)
z.ij(a)
return z}}},
qp:{"^":"a:2;a",
$0:function(){P.cC(new P.qq(this.a))}},
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
if(!z.a.gkp()){z.c=new P.cs(new P.H(0,$.r,null,[null]),[null])
if(z.b===!0){z.b=!1
P.cC(new P.qo(this.b))}return z.c.gh7()}}},
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
gT:function(){var z=this.c
return z==null?this.b:z.gT()},
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
else{w=J.ai(z)
if(!!w.$isbd){z=this.d
if(z==null){z=[]
this.d=z}z.push(this.a)
this.a=w.a
continue}else{this.c=w
continue}}}}else{this.b=y
return!0}}return!1}},
rh:{"^":"ce;a",
ga_:function(a){return new P.bd(this.a(),null,null,null)},
$asce:I.bg,
$asB:I.bg,
v:{
aV:function(a){return new P.rh(a)}}},
Q:{"^":"d;$ti"},
hI:{"^":"d;h7:a<,$ti",
eF:function(a,b){if(a==null)a=new P.cY()
if(this.a.a!==0)throw H.c(new P.w("Future already completed"))
$.r.toString
this.bl(a,b)},
dB:function(a){return this.eF(a,null)}},
cs:{"^":"hI;a,$ti",
bZ:function(a){var z=this.a
if(z.a!==0)throw H.c(new P.w("Future already completed"))
z.bD(a)},
eE:function(){return this.bZ(null)},
bl:function(a,b){this.a.fi(a,b)}},
rg:{"^":"hI;a,$ti",
bZ:function(a){var z=this.a
if(z.a!==0)throw H.c(new P.w("Future already completed"))
z.bk(a)},
eE:function(){return this.bZ(null)},
bl:function(a,b){this.a.bl(a,b)}},
el:{"^":"d;em:a<,b,c,d,e,$ti",
gjf:function(){return this.b.b},
gh9:function(){return(this.c&1)!==0},
gk8:function(){return(this.c&2)!==0},
gh8:function(){return this.c===8},
k6:function(a){return this.b.b.eY(this.d,a)},
kz:function(a){if(this.c!==6)return!0
return this.b.b.eY(this.d,a.gbv())},
jZ:function(a){var z,y
z=this.e
y=this.b.b
if(H.az(z,{func:1,args:[,,]}))return y.kX(z,a.gbv(),a.gbr())
else return y.eY(z,a.gbv())},
k7:function(){return this.b.b.hx(this.d)}},
H:{"^":"d;cL:a<,b,j3:c<,$ti",
giP:function(){return this.a===2},
gei:function(){return this.a>=4},
eZ:function(a,b){var z=$.r
if(z!==C.i){z.toString
if(b!=null)b=P.eu(b,z)}return this.ex(a,b)},
c6:function(a){return this.eZ(a,null)},
ex:function(a,b){var z,y
z=new P.H(0,$.r,null,[null])
y=b==null?1:3
this.di(new P.el(null,z,y,a,b,[H.l(this,0),null]))
return z},
c8:function(a){var z,y
z=$.r
y=new P.H(0,z,null,this.$ti)
if(z!==C.i)z.toString
z=H.l(this,0)
this.di(new P.el(null,y,8,a,null,[z,z]))
return y},
di:function(a){var z,y
z=this.a
if(z<=1){a.a=this.c
this.c=a}else{if(z===2){y=this.c
if(!y.gei()){y.di(a)
return}this.a=y.a
this.c=y.c}z=this.b
z.toString
P.by(null,null,z,new P.qE(this,a))}},
fG:function(a){var z,y,x,w,v
z={}
z.a=a
if(a==null)return
y=this.a
if(y<=1){x=this.c
this.c=a
if(x!=null){for(w=a;w.gem()!=null;)w=w.a
w.a=x}}else{if(y===2){v=this.c
if(!v.gei()){v.fG(a)
return}this.a=v.a
this.c=v.c}z.a=this.dr(a)
y=this.b
y.toString
P.by(null,null,y,new P.qL(z,this))}},
dq:function(){var z=this.c
this.c=null
return this.dr(z)},
dr:function(a){var z,y,x
for(z=a,y=null;z!=null;y=z,z=x){x=z.gem()
z.a=y}return y},
bk:function(a){var z,y
z=this.$ti
if(H.aW(a,"$isQ",z,"$asQ"))if(H.aW(a,"$isH",z,null))P.da(a,this)
else P.hK(a,this)
else{y=this.dq()
this.a=4
this.c=a
P.bu(this,y)}},
bl:[function(a,b){var z=this.dq()
this.a=8
this.c=new P.cI(a,b)
P.bu(this,z)},function(a){return this.bl(a,null)},"lf","$2","$1","gbV",2,2,18,0],
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
P.by(null,null,z,new P.qK(this,a))}else P.da(a,this)
return}P.hK(a,this)},
fi:function(a,b){var z
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
try{a.eZ(new P.qH(b),new P.qI(b))}catch(x){z=H.C(x)
y=H.E(x)
P.cC(new P.qJ(b,z,y))}},
da:function(a,b){var z,y,x
for(;a.giP();)a=a.c
z=a.gei()
y=b.c
if(z){b.c=null
x=b.dr(y)
b.a=a.a
b.c=a.c
P.bu(b,x)}else{b.a=2
b.c=a
a.fG(y)}},
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
b=o.dr(n)
o.a=y.a
o.c=y.c
z.a=y
continue}else P.da(y,o)
return}}o=b.b
b=o.dq()
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
z.bk(a)}},
qI:{"^":"a:52;a",
$2:function(a,b){this.a.bl(a,b)},
$1:function(a){return this.$2(a,null)}},
qJ:{"^":"a:2;a,b,c",
$0:function(){this.a.bl(this.b,this.c)}},
qG:{"^":"a:2;a,b",
$0:function(){var z,y
z=this.a
y=z.dq()
z.a=4
z.c=this.b
P.bu(z,y)}},
qK:{"^":"a:2;a,b",
$0:function(){P.da(this.b,this.a)}},
qF:{"^":"a:2;a,b,c",
$0:function(){this.a.bl(this.b,this.c)}},
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
else u.b=new P.cI(y,x)
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
w.b=new P.cI(z,y)
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
else s.b=new P.cI(y,x)
s.a=!0}}},
hG:{"^":"d;jw:a<,cq:b@"},
al:{"^":"d;$ti",
aJ:function(a,b){return new P.r2(b,this,[H.y(this,"al",0),null])},
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
gX:function(a){var z,y
z={}
y=new P.H(0,$.r,null,[P.X])
z.a=null
z.a=this.aI(new P.p2(z,y),!0,new P.p3(y),y.gbV())
return y},
cv:function(a){var z,y,x
z=H.y(this,"al",0)
y=H.p([],[z])
x=new P.H(0,$.r,null,[[P.N,z]])
this.aI(new P.p8(this,y),!0,new P.p9(y,x),x.gbV())
return x},
bH:function(a){var z,y,x
z=H.y(this,"al",0)
y=P.a6(null,null,null,z)
x=new P.H(0,$.r,null,[[P.bP,z]])
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
P.i0(new P.oV(this.c,a),new P.oW(z,y),P.hQ(z.a,y))},
$S:function(){return H.be(function(a){return{func:1,args:[a]}},this.b,"al")}},
oV:{"^":"a:2;a,b",
$0:function(){return J.e(this.b,this.a)}},
oW:{"^":"a:31;a,b",
$1:function(a){if(a===!0)P.hR(this.a.a,this.b,!0)}},
oY:{"^":"a:2;a",
$0:function(){this.a.bk(!1)}},
p0:{"^":"a;a,b,c,d",
$1:function(a){P.i0(new P.oZ(this.c,a),new P.p_(),P.hQ(this.a.a,this.d))},
$S:function(){return H.be(function(a){return{func:1,args:[a]}},this.b,"al")}},
oZ:{"^":"a:2;a,b",
$0:function(){return this.a.$1(this.b)}},
p_:{"^":"a:0;",
$1:function(a){}},
p1:{"^":"a:2;a",
$0:function(){this.a.bk(null)}},
p6:{"^":"a:0;a",
$1:function(a){++this.a.a}},
p7:{"^":"a:2;a,b",
$0:function(){this.b.bk(this.a.a)}},
p2:{"^":"a:0;a,b",
$1:function(a){P.hR(this.a.a,this.b,!1)}},
p3:{"^":"a:2;a",
$0:function(){this.a.bk(!0)}},
p8:{"^":"a;a,b",
$1:function(a){this.b.push(a)},
$S:function(){return H.be(function(a){return{func:1,args:[a]}},this.a,"al")}},
p9:{"^":"a:2;a,b",
$0:function(){this.b.bk(this.a)}},
pa:{"^":"a;a,b",
$1:function(a){this.b.t(0,a)},
$S:function(){return H.be(function(a){return{func:1,args:[a]}},this.a,"al")}},
pb:{"^":"a:2;a,b",
$0:function(){this.b.bk(this.a)}},
p4:{"^":"a;a,b",
$1:function(a){var z=this.a
z.b=!0
z.a=a},
$S:function(){return H.be(function(a){return{func:1,args:[a]}},this.b,"al")}},
p5:{"^":"a:2;a,b",
$0:function(){var z,y,x,w
x=this.a
if(x.b){this.b.bk(x.a)
return}try{x=H.aj()
throw H.c(x)}catch(w){z=H.C(w)
y=H.E(w)
P.ry(this.b,z,y)}}},
dc:{"^":"d;cL:b<,$ti",
ge2:function(){return new P.d8(this,this.$ti)},
gkp:function(){return(this.b&4)!==0},
gcW:function(){var z=this.b
return(z&1)!==0?this.gbL().gfB():(z&2)===0},
giX:function(){if((this.b&8)===0)return this.a
return this.a.gd5()},
eb:function(){var z,y
if((this.b&8)===0){z=this.a
if(z==null){z=new P.en(null,null,0,this.$ti)
this.a=z}return z}y=this.a
if(y.gd5()==null)y.c=new P.en(null,null,0,this.$ti)
return y.c},
gbL:function(){if((this.b&8)!==0)return this.a.gd5()
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
if((w&1)!==0?this.gbL().gfB():(w&2)===0)x.cZ()
this.a=new P.r9(z,y,x,this.$ti)
this.b|=8
return y},
fp:function(){var z=this.c
if(z==null){z=(this.b&2)!==0?$.$get$bm():new P.H(0,$.r,null,[null])
this.c=z}return z},
t:[function(a,b){if(this.b>=4)throw H.c(this.cB())
this.bU(b)},"$1","gjh",2,0,function(){return H.be(function(a){return{func:1,v:true,args:[a]}},this.$receiver,"dc")}],
eA:function(a,b){if(this.b>=4)throw H.c(this.cB())
if(a==null)a=new P.cY()
$.r.toString
this.cf(a,b)},
bu:function(){var z=this.b
if((z&4)!==0)return this.fp()
if(z>=4)throw H.c(this.cB())
z|=4
this.b=z
if((z&1)!==0)this.cJ()
else if((z&3)===0)this.eb().t(0,C.v)
return this.fp()},
bU:[function(a){var z=this.b
if((z&1)!==0)this.cI(a)
else if((z&3)===0)this.eb().t(0,new P.eh(a,null,this.$ti))},"$1","gis",2,0,function(){return H.be(function(a){return{func:1,v:true,args:[a]}},this.$receiver,"dc")}],
cf:[function(a,b){var z=this.b
if((z&1)!==0)this.cK(a,b)
else if((z&3)===0)this.eb().t(0,new P.ei(a,b,null))},"$2","gip",4,0,48],
e5:[function(){var z=this.a
this.a=z.gd5()
this.b&=4294967287
z.a.bD(null)},"$0","git",0,0,7],
ja:function(a,b,c,d){var z,y,x,w,v
if((this.b&3)!==0)throw H.c(new P.w("Stream has already been listened to."))
z=$.r
y=d?1:0
x=new P.qy(this,null,null,null,z,y,null,null,this.$ti)
x.ff(a,b,c,d,H.l(this,0))
w=this.giX()
y=this.b|=1
if((y&8)!==0){v=this.a
v.sd5(x)
v.b.d1()}else this.a=x
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
u.fi(y,x)
z=u}else z=z.c8(w)
w=new P.ra(this)
if(z!=null)z=z.c8(w)
else w.$0()
return z}},
rb:{"^":"a:2;a",
$0:function(){P.ev(this.a.d)}},
ra:{"^":"a:7;a",
$0:function(){var z=this.a.c
if(z!=null&&z.a===0)z.bD(null)}},
rj:{"^":"d;$ti",
cI:function(a){this.gbL().bU(a)},
cK:function(a,b){this.gbL().cf(a,b)},
cJ:function(){this.gbL().e5()}},
qv:{"^":"d;$ti",
cI:function(a){this.gbL().cg(new P.eh(a,null,[H.l(this,0)]))},
cK:function(a,b){this.gbL().cg(new P.ei(a,b,null))},
cJ:function(){this.gbL().cg(C.v)}},
qu:{"^":"dc+qv;a,b,c,d,e,f,r,$ti"},
ri:{"^":"dc+rj;a,b,c,d,e,f,r,$ti"},
d8:{"^":"rc;a,$ti",
gB:function(a){return(H.aF(this.a)^892482866)>>>0},
A:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof P.d8))return!1
return b.a===this.a}},
qy:{"^":"ct;x,a,b,c,d,e,f,r,$ti",
en:function(){return this.x.j0(this)},
ep:[function(){var z=this.x
if((z.b&8)!==0)z.a.cZ()
P.ev(z.e)},"$0","geo",0,0,7],
er:[function(){var z=this.x
if((z.b&8)!==0)z.a.d1()
P.ev(z.f)},"$0","geq",0,0,7]},
qe:{"^":"d;$ti",
cZ:function(){this.b.cZ()},
d1:function(){this.b.d1()},
ck:function(){var z=this.b.ck()
if(z==null){this.a.bD(null)
return}return z.c8(new P.qf(this))},
eE:function(){this.a.bD(null)}},
qf:{"^":"a:2;a",
$0:function(){this.a.a.bD(null)}},
r9:{"^":"qe;d5:c@,a,b,$ti"},
ct:{"^":"d;cL:e<,$ti",
j8:function(a){if(a==null)return
this.r=a
if(!a.gX(a)){this.e=(this.e|64)>>>0
this.r.da(this)}},
kF:function(a){var z=this.e
if((z&8)!==0)return
this.e=(z+128|4)>>>0
if(z<128&&this.r!=null)this.r.fV()
if((z&4)===0&&(this.e&32)===0)this.eg(this.geo())},
cZ:function(){return this.kF(null)},
d1:function(){var z=this.e
if((z&8)!==0)return
if(z>=128){z-=128
this.e=z
if(z<128){if((z&64)!==0){z=this.r
z=!z.gX(z)}else z=!1
if(z)this.r.da(this)
else{z=(this.e&4294967291)>>>0
this.e=z
if((z&32)===0)this.eg(this.geq())}}}},
ck:function(){var z=(this.e&4294967279)>>>0
this.e=z
if((z&8)===0)this.e6()
z=this.f
return z==null?$.$get$bm():z},
gfB:function(){return(this.e&4)!==0},
gcW:function(){return this.e>=128},
e6:function(){var z=(this.e|8)>>>0
this.e=z
if((z&64)!==0)this.r.fV()
if((this.e&32)===0)this.r=null
this.f=this.en()},
bU:["i5",function(a){var z=this.e
if((z&8)!==0)return
if(z<32)this.cI(a)
else this.cg(new P.eh(a,null,[H.y(this,"ct",0)]))}],
cf:["i6",function(a,b){var z=this.e
if((z&8)!==0)return
if(z<32)this.cK(a,b)
else this.cg(new P.ei(a,b,null))}],
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
if(z==null){z=new P.en(null,null,0,[H.y(this,"ct",0)])
this.r=z}z.t(0,a)
y=this.e
if((y&64)===0){y=(y|64)>>>0
this.e=y
if(y<128)this.r.da(this)}},
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
z=z.gX(z)}else z=!1
if(z){z=(this.e&4294967231)>>>0
this.e=z
if((z&4)!==0)if(z<128){z=this.r
z=z==null||z.gX(z)}else z=!1
else z=!1
if(z)this.e=(this.e&4294967291)>>>0}for(;!0;a=y){z=this.e
if((z&8)!==0){this.r=null
return}y=(z&4)!==0
if(a===y)break
this.e=(z^32)>>>0
if(y)this.ep()
else this.er()
this.e=(this.e&4294967263)>>>0}z=this.e
if((z&64)!==0&&z<128)this.r.da(this)},
ff:function(a,b,c,d,e){var z=this.d
z.toString
this.a=a
this.b=P.eu(b==null?P.rQ():b,z)
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
if(x)w.kY(u,v,this.c)
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
rc:{"^":"al;$ti",
aI:function(a,b,c,d){return this.a.ja(a,d,c,!0===b)},
eS:function(a,b,c){return this.aI(a,null,b,c)}},
ej:{"^":"d;cq:a@,$ti"},
eh:{"^":"ej;ae:b<,a,$ti",
eT:function(a){a.cI(this.b)}},
ei:{"^":"ej;bv:b<,br:c<,a",
eT:function(a){a.cK(this.b,this.c)},
$asej:I.bg},
qz:{"^":"d;",
eT:function(a){a.cJ()},
gcq:function(){return},
scq:function(a){throw H.c(new P.w("No events after a done."))}},
r4:{"^":"d;cL:a<,$ti",
da:function(a){var z=this.a
if(z===1)return
if(z>=1){this.a=1
return}P.cC(new P.r5(this,a))
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
x.eT(this.b)}},
en:{"^":"r4;b,c,a,$ti",
gX:function(a){return this.c==null},
t:function(a,b){var z=this.c
if(z==null){this.c=b
this.b=b}else{z.scq(b)
this.c=b}}},
rd:{"^":"d;a,b,c,$ti"},
rt:{"^":"a:2;a,b,c",
$0:function(){return this.a.bl(this.b,this.c)}},
rs:{"^":"a:17;a,b",
$2:function(a,b){P.rr(this.a,this.b,a,b)}},
ru:{"^":"a:2;a,b",
$0:function(){return this.a.bk(this.b)}},
ek:{"^":"al;$ti",
aI:function(a,b,c,d){return this.iB(a,d,c,!0===b)},
eS:function(a,b,c){return this.aI(a,null,b,c)},
iB:function(a,b,c,d){return P.qD(this,a,b,c,d,H.y(this,"ek",0),H.y(this,"ek",1))},
fw:function(a,b){b.bU(a)},
iN:function(a,b,c){c.cf(a,b)},
$asal:function(a,b){return[b]}},
hJ:{"^":"ct;x,y,a,b,c,d,e,f,r,$ti",
bU:function(a){if((this.e&2)!==0)return
this.i5(a)},
cf:function(a,b){if((this.e&2)!==0)return
this.i6(a,b)},
ep:[function(){var z=this.y
if(z==null)return
z.cZ()},"$0","geo",0,0,7],
er:[function(){var z=this.y
if(z==null)return
z.d1()},"$0","geq",0,0,7],
en:function(){var z=this.y
if(z!=null){this.y=null
return z.ck()}return},
lh:[function(a){this.x.fw(a,this)},"$1","giK",2,0,function(){return H.be(function(a,b){return{func:1,v:true,args:[a]}},this.$receiver,"hJ")}],
lj:[function(a,b){this.x.iN(a,b,this)},"$2","giM",4,0,40],
li:[function(){this.e5()},"$0","giL",0,0,7],
ik:function(a,b,c,d,e,f,g){this.y=this.x.a.eS(this.giK(),this.giL(),this.giM())},
$asct:function(a,b){return[b]},
v:{
qD:function(a,b,c,d,e,f,g){var z,y
z=$.r
y=e?1:0
y=new P.hJ(a,null,null,null,null,z,y,null,null,[f,g])
y.ff(b,c,d,e,g)
y.ik(a,b,c,d,e,f,g)
return y}}},
r2:{"^":"ek;b,a,$ti",
fw:function(a,b){var z,y,x,w
z=null
try{z=this.b.$1(a)}catch(w){y=H.C(w)
x=H.E(w)
P.rm(b,y,x)
return}b.bU(z)}},
cI:{"^":"d;bv:a<,br:b<",
k:function(a){return H.b(this.a)},
$isa5:1},
rl:{"^":"d;"},
rG:{"^":"a:2;a,b",
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
kY:function(a,b,c){var z,y,x,w
try{if(C.i===$.r){x=a.$2(b,c)
return x}x=P.hZ(null,null,this,a,b,c)
return x}catch(w){z=H.C(w)
y=H.E(w)
x=P.bx(null,null,this,z,y)
return x}},
eC:function(a,b){if(b)return new P.r7(this,a)
else return new P.r8(this,a)},
j:function(a,b){return},
hx:function(a){if($.r===C.i)return a.$0()
return P.hY(null,null,this,a)},
eY:function(a,b){if($.r===C.i)return a.$1(b)
return P.i_(null,null,this,a,b)},
kX:function(a,b,c){if($.r===C.i)return a.$2(b,c)
return P.hZ(null,null,this,a,b,c)}},
r7:{"^":"a:2;a,b",
$0:function(){return this.a.hy(this.b)}},
r8:{"^":"a:2;a,b",
$0:function(){return this.a.hx(this.b)}}}],["","",,P,{"^":"",
dN:function(a,b){return new H.R(0,null,null,null,null,null,0,[a,b])},
b0:function(){return new H.R(0,null,null,null,null,null,0,[null,null])},
a0:function(a){return H.uc(a,new H.R(0,null,null,null,null,null,0,[null,null]))},
m4:function(a,b,c){var z,y
if(P.es(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}z=[]
y=$.$get$bZ()
y.push(a)
try{P.rB(a,z)}finally{if(0>=y.length)return H.f(y,-1)
y.pop()}y=P.hd(b,z,", ")+c
return y.charCodeAt(0)==0?y:y},
cf:function(a,b,c){var z,y,x
if(P.es(a))return b+"..."+c
z=new P.bS(b)
y=$.$get$bZ()
y.push(a)
try{x=z
x.C=P.hd(x.gC(),a,", ")}finally{if(0>=y.length)return H.f(y,-1)
y.pop()}y=z
y.C=y.gC()+c
y=z.gC()
return y.charCodeAt(0)==0?y:y},
es:function(a){var z,y
for(z=0;y=$.$get$bZ(),z<y.length;++z)if(a===y[z])return!0
return!1},
rB:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=a.ga_(a)
y=0
x=0
while(!0){if(!(y<80||x<3))break
if(!z.u())return
w=H.b(z.gT())
b.push(w)
y+=w.length+2;++x}if(!z.u()){if(x<=5)return
if(0>=b.length)return H.f(b,-1)
v=b.pop()
if(0>=b.length)return H.f(b,-1)
u=b.pop()}else{t=z.gT();++x
if(!z.u()){if(x<=4){b.push(H.b(t))
return}v=H.b(t)
if(0>=b.length)return H.f(b,-1)
u=b.pop()
y+=v.length+2}else{s=z.gT();++x
for(;z.u();t=s,s=r){r=z.gT();++x
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
a.Z(0,new P.rS(z))
return z},
a6:function(a,b,c,d){return new P.hM(0,null,null,null,null,null,0,[d])},
b9:function(a,b){var z,y
z=P.a6(null,null,null,b)
for(y=J.ai(a);y.u();)z.t(0,y.gT())
return z},
dS:function(a){var z,y,x
z={}
if(P.es(a))return"{...}"
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
cU:function(a){return H.uW(a)&0x3ffffff},
cV:function(a,b){var z,y,x
if(a==null)return-1
z=a.length
for(y=0;y<z;++y){x=a[y].ghb()
if(x==null?b==null:x===b)return y}return-1},
v:{
bW:function(a,b){return new P.hN(0,null,null,null,null,null,0,[a,b])}}},
hM:{"^":"qQ;a,b,c,d,e,f,r,$ti",
el:function(){return new P.hM(0,null,null,null,null,null,0,this.$ti)},
ga_:function(a){var z=new P.af(this,this.r,null,null,[null])
z.c=this.e
return z},
gl:function(a){return this.a},
gX:function(a){return this.a===0},
gav:function(a){return this.a!==0},
a7:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null)return!1
return z[b]!=null}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null)return!1
return y[b]!=null}else return this.iz(b)},
iz:function(a){var z=this.d
if(z==null)return!1
return this.dl(z[this.dk(a)],a)>=0},
cp:function(a){var z
if(!(typeof a==="string"&&a!=="__proto__"))z=typeof a==="number"&&(a&0x3ffffff)===a
else z=!0
if(z)return this.a7(0,a)?a:null
else return this.iR(a)},
iR:function(a){var z,y,x
z=this.d
if(z==null)return
y=z[this.dk(a)]
x=this.dl(y,a)
if(x<0)return
return J.aB(y,x).gfo()},
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
z=y}return this.fj(z,b)}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.c=y
x=y}return this.fj(x,b)}else return this.aE(b)},
aE:function(a){var z,y,x
z=this.d
if(z==null){z=P.qZ()
this.d=z}y=this.dk(a)
x=z[y]
if(x==null)z[y]=[this.e9(a)]
else{if(this.dl(x,a)>=0)return!1
x.push(this.e9(a))}return!0},
a3:function(a,b){if(typeof b==="string"&&b!=="__proto__")return this.fk(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.fk(this.c,b)
else return this.j1(b)},
j1:function(a){var z,y,x
z=this.d
if(z==null)return!1
y=z[this.dk(a)]
x=this.dl(y,a)
if(x<0)return!1
this.fl(y.splice(x,1)[0])
return!0},
iH:function(a,b){var z,y,x,w,v
z=this.e
for(;z!=null;z=x){y=z.a
x=z.b
w=this.r
v=a.$1(y)
if(w!==this.r)throw H.c(new P.D(this))
if(b===v)this.a3(0,y)}},
bg:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
fj:function(a,b){if(a[b]!=null)return!1
a[b]=this.e9(b)
return!0},
fk:function(a,b){var z
if(a==null)return!1
z=a[b]
if(z==null)return!1
this.fl(z)
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
fl:function(a){var z,y
z=a.giy()
y=a.b
if(z==null)this.e=y
else z.b=y
if(y==null)this.f=z
else y.c=z;--this.a
this.r=this.r+1&67108863},
dk:function(a){return J.j(a)&0x3ffffff},
dl:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.e(a[y].gfo(),b))return y
return-1},
$isbP:1,
$isa_:1,
v:{
qZ:function(){var z=Object.create(null)
z["<non-identifier-key>"]=z
delete z["<non-identifier-key>"]
return z}}},
qY:{"^":"d;fo:a<,b,iy:c<"},
af:{"^":"d;a,b,c,d,$ti",
gT:function(){return this.d},
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
ce:{"^":"B;$ti"},
rS:{"^":"a:6;a",
$2:function(a,b){this.a.n(0,a,b)}},
ft:{"^":"fC;$ti"},
fC:{"^":"d+ba;$ti",$asN:null,$asa_:null,$isN:1,$isa_:1},
ba:{"^":"d;$ti",
ga_:function(a){return new H.dO(this,this.gl(this),0,null,[H.y(this,"ba",0)])},
au:function(a,b){return this.j(0,b)},
Z:function(a,b){var z,y
z=this.gl(this)
for(y=0;y<z;++y){b.$1(this.j(0,y))
if(z!==this.gl(this))throw H.c(new P.D(this))}},
gX:function(a){return this.gl(this)===0},
gav:function(a){return!this.gX(this)},
gw:function(a){if(this.gl(this)===0)throw H.c(H.aj())
return this.j(0,this.gl(this)-1)},
a7:function(a,b){var z,y
z=this.gl(this)
for(y=0;y<this.gl(this);++y){if(J.e(this.j(0,y),b))return!0
if(z!==this.gl(this))throw H.c(new P.D(this))}return!1},
bt:function(a,b){var z,y
z=this.gl(this)
for(y=0;y<z;++y){if(b.$1(this.j(0,y))===!0)return!0
if(z!==this.gl(this))throw H.c(new P.D(this))}return!1},
aT:function(a,b,c){var z,y,x
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
for(z=0;z<this.gl(this);++z)if(J.e(this.j(0,z),b)){this.b6(0,z,this.gl(this)-1,this,z+1)
this.sl(0,this.gl(this)-1)
return!0}return!1},
iG:function(a,b){var z,y,x,w
z=H.p([],[H.y(this,"ba",0)])
y=this.gl(this)
for(x=0;x<y;++x){w=this.j(0,x)
if(J.e(a.$1(w),b))z.push(w)
if(y!==this.gl(this))throw H.c(new P.D(this))}if(z.length!==this.gl(this)){this.hX(0,0,z.length,z)
this.sl(0,z.length)}},
b6:function(a,b,c,d,e){var z,y,x,w,v
P.cm(b,c,this.gl(this),null,null,null)
z=c-b
if(z===0)return
if(H.aW(d,"$isN",[H.y(this,"ba",0)],"$asN")){y=e
x=d}else{x=J.j0(d,e).bG(0,!1)
y=0}w=J.L(x)
if(y+z>w.gl(x))throw H.c(H.fh())
if(y<b)for(v=z-1;v>=0;--v)this.n(0,b+v,w.j(x,y+v))
else for(v=0;v<z;++v)this.n(0,b+v,w.j(x,y+v))},
hX:function(a,b,c,d){return this.b6(a,b,c,d,0)},
bQ:function(a,b,c){var z
if(c>=this.gl(this))return-1
for(z=c;z<this.gl(this);++z)if(J.e(this.j(0,z),b))return z
return-1},
b1:function(a,b){return this.bQ(a,b,0)},
k:function(a){return P.cf(this,"[","]")},
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
gX:function(a){var z=this.a
return z.gX(z)},
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
ga_:function(a){return new P.db(this,this.c,this.d,this.b,null,this.$ti)},
Z:function(a,b){var z,y,x
z=this.d
for(y=this.b;y!==this.c;y=(y+1&this.a.length-1)>>>0){x=this.a
if(y<0||y>=x.length)return H.f(x,y)
b.$1(x[y])
if(z!==this.d)H.i(new P.D(this))}},
gX:function(a){return this.b===this.c},
gl:function(a){return(this.c-this.b&this.a.length-1)>>>0},
gw:function(a){var z,y,x
z=this.b
y=this.c
if(z===y)throw H.c(H.aj())
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
C.a.b6(s,x,w,b,0)
this.c+=y}else{z=this.c
r=u-z
if(y<r){C.a.b6(v,z,z+y,b,0)
this.c+=y}else{q=y-r
C.a.b6(v,z,z+r,b,0)
C.a.b6(this.a,0,q,b,r)
this.c=q}}++this.d}else for(z=new P.db(b,b.c,b.d,b.b,null,[H.l(b,0)]);z.u();)this.aE(z.e)},
bg:function(a){var z,y,x,w,v
z=this.b
y=this.c
if(z!==y){for(x=this.a,w=x.length,v=w-1;z!==y;z=(z+1&v)>>>0){if(z<0||z>=w)return H.f(x,z)
x[z]=null}this.c=0
this.b=0;++this.d}},
k:function(a){return P.cf(this,"{","}")},
fR:function(a){var z,y,x
z=this.b
y=this.a
x=y.length
z=(z-1&x-1)>>>0
this.b=z
if(z<0||z>=x)return H.f(y,z)
y[z]=a
if(z===this.c)this.fv();++this.d},
dL:function(){var z,y,x,w
z=this.b
if(z===this.c)throw H.c(H.aj());++this.d
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
if(this.b===x)this.fv();++this.d},
fv:function(){var z,y,x,w
z=new Array(this.a.length*2)
z.fixed$length=Array
y=H.p(z,this.$ti)
z=this.a
x=this.b
w=z.length-x
C.a.b6(y,0,w,z,x)
C.a.b6(y,w,w+this.b,this.a,0)
this.b=0
this.c=this.a.length
this.a=y},
je:function(a){var z,y,x,w,v
z=this.b
y=this.c
x=this.a
if(z<=y){w=y-z
C.a.b6(a,0,w,x,z)
return w}else{v=x.length-z
C.a.b6(a,0,v,x,z)
C.a.b6(a,v,v+this.c,this.a,0)
return this.c+v}},
i9:function(a,b){var z=new Array(8)
z.fixed$length=Array
this.a=H.p(z,[b])},
v:{
bb:function(a,b){var z=new P.mr(null,0,0,0,[b])
z.i9(a,b)
return z},
ms:function(a){var z
a=C.P.f7(a,1)-1
for(;!0;a=z)z=(a&a-1)>>>0}}},
db:{"^":"d;a,b,c,d,e,$ti",
gT:function(){return this.e},
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
gX:function(a){return this.a===0},
gav:function(a){return this.a!==0},
ax:function(a,b){var z
for(z=J.ai(b);z.u();)this.t(0,z.gT())},
jB:function(a){var z,y
for(z=a.a,y=new P.af(z,z.r,null,null,[null]),y.c=z.e;y.u();)if(!this.a7(0,y.d))return!1
return!0},
bG:function(a,b){var z,y,x,w,v
z=H.p([],this.$ti)
C.a.sl(z,this.a)
for(y=new P.af(this,this.r,null,null,[null]),y.c=this.e,x=0;y.u();x=v){w=y.d
v=x+1
if(x>=z.length)return H.f(z,x)
z[x]=w}return z},
cv:function(a){return this.bG(a,!0)},
aJ:function(a,b){return new H.bG(this,b,[H.l(this,0),null])},
k:function(a){return P.cf(this,"{","}")},
Z:function(a,b){var z
for(z=new P.af(this,this.r,null,null,[null]),z.c=this.e;z.u();)b.$1(z.d)},
bw:function(a,b,c){var z,y
for(z=new P.af(this,this.r,null,null,[null]),z.c=this.e,y=b;z.u();)y=c.$2(y,z.d)
return y},
gw:function(a){var z,y
z=new P.af(this,this.r,null,null,[null])
z.c=this.e
if(!z.u())throw H.c(H.aj())
do y=z.d
while(z.u())
return y},
aT:function(a,b,c){var z,y
for(z=new P.af(this,this.r,null,null,[null]),z.c=this.e;z.u();){y=z.d
if(b.$1(y)===!0)return y}if(c!=null)return c.$0()
throw H.c(H.aj())},
cl:function(a,b){return this.aT(a,b,null)},
bC:function(a,b){var z,y,x,w
for(z=new P.af(this,this.r,null,null,[null]),z.c=this.e,y=null,x=!1;z.u();){w=z.d
if(b.$1(w)===!0){if(x)throw H.c(H.dE())
y=w
x=!0}}if(x)return y
throw H.c(H.aj())},
$isbP:1,
$isa_:1},
oj:{"^":"ok;$ti"}}],["","",,P,{"^":"",
de:function(a){var z
if(a==null)return
if(typeof a!="object")return a
if(Object.getPrototypeOf(a)!==Array.prototype)return new P.qT(a,Object.create(null),null)
for(z=0;z<a.length;++z)a[z]=P.de(a[z])
return a},
rE:function(a,b){var z,y,x,w
if(typeof a!=="string")throw H.c(H.T(a))
z=null
try{z=JSON.parse(a)}catch(x){y=H.C(x)
w=String(y)
throw H.c(new P.fc(w,null,null))}w=P.de(z)
return w},
xw:[function(a){return a.dR()},"$1","tQ",2,0,0],
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
gX:function(a){var z
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
if(typeof w=="undefined"){w=P.de(this.a[x])
this.b[x]=w}b.$2(x,w)
if(z!==this.c)throw H.c(new P.D(this))}},
k:function(a){return P.dS(this)},
cD:function(){var z=this.c
if(z==null){z=Object.keys(this.a)
this.c=z}return z},
jc:function(){var z,y,x,w,v
if(this.b==null)return this.c
z=P.dN(P.q,null)
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
z=P.de(this.a[a])
return this.b[a]=z},
$isI:1,
$asI:function(){return[P.q,null]}},
f5:{"^":"d;$ti"},
cO:{"^":"d;$ti"},
dJ:{"^":"a5;a,b",
k:function(a){if(this.b!=null)return"Converting object to an encodable object failed."
else return"Converting object did not return an encodable object."}},
m9:{"^":"dJ;a,b",
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
mb:{"^":"cO;a,b",
$ascO:function(){return[P.d,P.q]}},
ma:{"^":"cO;a",
$ascO:function(){return[P.q,P.d]}},
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
if(u<32){if(v>w)x.C+=C.b.aL(a,w,v)
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
break}}else if(u===34||u===92){if(v>w)x.C+=C.b.aL(a,w,v)
w=v+1
x.C+=H.as(92)
x.C+=H.as(u)}}if(w===0)x.C+=H.b(a)
else if(w<y)x.C+=z.aL(a,w,y)},
e7:function(a){var z,y,x,w
for(z=this.a,y=z.length,x=0;x<y;++x){w=z[x]
if(a==null?w==null:a===w)throw H.c(new P.m9(a,null))}z.push(a)},
dU:function(a){var z,y,x,w
if(this.hI(a))return
this.e7(a)
try{z=this.b.$1(a)
if(!this.hI(z))throw H.c(new P.dJ(a,null))
x=this.a
if(0>=x.length)return H.f(x,-1)
x.pop()}catch(w){y=H.C(w)
throw H.c(new P.dJ(a,y))}},
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
this.la(a)
z=this.a
if(0>=z.length)return H.f(z,-1)
z.pop()
return!0}else if(!!z.$isI){this.e7(a)
y=this.lb(a)
z=this.a
if(0>=z.length)return H.f(z,-1)
z.pop()
return y}else return!1}},
la:function(a){var z,y,x
z=this.c
z.C+="["
y=J.L(a)
if(y.gl(a)>0){this.dU(y.j(a,0))
for(x=1;x<y.gl(a);++x){z.C+=","
this.dU(y.j(a,x))}}z.C+="]"},
lb:function(a){var z,y,x,w,v,u,t
z={}
if(a.gX(a)){this.c.C+="{}"
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
wS:[function(a,b){return J.bE(a,b)},"$2","tR",4,0,42],
f9:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.h(a)
if(typeof a==="string")return JSON.stringify(a)
return P.l8(a)},
l8:function(a){var z=J.o(a)
if(!!z.$isa)return z.k(a)
return H.d_(a)},
cR:function(a){return new P.qC(a)},
P:function(a,b,c){var z,y
z=H.p([],[c])
for(y=J.ai(a);y.u();)z.push(y.gT())
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
eF:function(a){H.v3(H.b(a))},
bq:function(a,b,c){return new H.dG(a,H.dH(a,!1,b,!1),null,null)},
X:{"^":"d;"},
"+bool":0,
V:{"^":"d;$ti"},
cP:{"^":"d;jd:a<,b",
A:function(a,b){if(b==null)return!1
if(!(b instanceof P.cP))return!1
return this.a===b.a&&!0},
bE:function(a,b){return C.e.bE(this.a,b.gjd())},
gB:function(a){var z=this.a
return(z^C.e.dt(z,30))&1073741823},
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
z=this.a+b.gkd()
y=new P.cP(z,!1)
if(!(Math.abs(z)>864e13))z=!1
else z=!0
if(z)H.i(P.G(y.gkA()))
return y},
gkA:function(){return this.a},
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
aX:{"^":"M;",$isV:1,
$asV:function(){return[P.M]}},
"+double":0,
b8:{"^":"d;bW:a<",
aj:function(a,b){return new P.b8(this.a+b.gbW())},
at:function(a,b){return new P.b8(this.a-b.gbW())},
cb:function(a,b){if(typeof b!=="number")return H.x(b)
return new P.b8(C.j.hw(this.a*b))},
aZ:function(a,b){return C.e.aZ(this.a,b.gbW())},
bj:function(a,b){return this.a>b.gbW()},
d9:function(a,b){return this.a<=b.gbW()},
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
f6:function(a){return new P.b8(0-this.a)},
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
u=P.f9(this.b)
return w+v+": "+H.b(u)},
v:{
G:function(a){return new P.b7(!1,null,null,a)},
cH:function(a,b,c){return new P.b7(!0,a,b,c)},
m:function(a){return new P.b7(!1,null,a,"Must not be null")}}},
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
gec:function(){if(J.c1(this.b,0))return": index must not be negative"
var z=this.f
if(z===0)return": no indices are valid"
return": index should be less than "+H.b(z)},
v:{
cT:function(a,b,c,d,e){var z=e!=null?e:J.aO(b)
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
if(x.length>78)x=C.b.aL(x,0,75)+"..."
return y+"\n"+x}},
ld:{"^":"d;h:a<,fC,$ti",
k:function(a){return"Expando:"+H.b(this.a)},
j:function(a,b){var z,y
z=this.fC
if(typeof z!=="string"){if(b==null||typeof b==="boolean"||typeof b==="number"||typeof b==="string")H.i(P.cH(b,"Expandos are not allowed on strings, numbers, booleans or null",null))
return z.get(b)}y=H.e1(b,"expando$values")
return y==null?null:H.e1(y,z)},
n:function(a,b,c){var z,y
z=this.fC
if(typeof z!=="string")z.set(b,c)
else{y=H.e1(b,"expando$values")
if(y==null){y=new P.d()
H.fM(b,"expando$values",y)}H.fM(y,z,c)}}},
bH:{"^":"d;"},
t:{"^":"M;",$isV:1,
$asV:function(){return[P.M]}},
"+int":0,
B:{"^":"d;$ti",
aJ:function(a,b){return H.bI(this,b,H.y(this,"B",0),null)},
c9:["dh",function(a,b){return new H.K(this,b,[H.y(this,"B",0)])}],
a7:function(a,b){var z
for(z=this.ga_(this);z.u();)if(J.e(z.gT(),b))return!0
return!1},
Z:function(a,b){var z
for(z=this.ga_(this);z.u();)b.$1(z.gT())},
bw:function(a,b,c){var z,y
for(z=this.ga_(this),y=b;z.u();)y=c.$2(y,z.gT())
return y},
bt:function(a,b){var z
for(z=this.ga_(this);z.u();)if(b.$1(z.gT())===!0)return!0
return!1},
bG:function(a,b){return P.P(this,b,H.y(this,"B",0))},
cv:function(a){return this.bG(a,!0)},
bH:function(a){return P.b9(this,H.y(this,"B",0))},
gl:function(a){var z,y
z=this.ga_(this)
for(y=0;z.u();)++y
return y},
gX:function(a){return!this.ga_(this).u()},
gav:function(a){return!this.gX(this)},
e1:function(a,b){return H.oq(this,b,H.y(this,"B",0))},
gw:function(a){var z,y
z=this.ga_(this)
if(!z.u())throw H.c(H.aj())
do y=z.gT()
while(z.u())
return y},
gcd:function(a){var z,y
z=this.ga_(this)
if(!z.u())throw H.c(H.aj())
y=z.gT()
if(z.u())throw H.c(H.dE())
return y},
au:function(a,b){var z,y,x
if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(P.m("index"))
if(b<0)H.i(P.a8(b,0,null,"index",null))
for(z=this.ga_(this),y=0;z.u();){x=z.gT()
if(b===y)return x;++y}throw H.c(P.cT(b,this,"index",null,y))},
k:function(a){return P.m4(this,"(",")")}},
cV:{"^":"d;$ti"},
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
k:function(a){return H.d_(this)},
gbz:function(a){return new H.aw(H.iq(this),null)},
toString:function(){return this.k(this)}},
bo:{"^":"d;"},
bP:{"^":"a_;$ti"},
b2:{"^":"d;"},
q:{"^":"d;",$isV:1,
$asV:function(){return[P.q]},
$isdZ:1},
"+String":0,
bS:{"^":"d;C<",
gl:function(a){return this.C.length},
gX:function(a){return this.C.length===0},
gav:function(a){return this.C.length!==0},
k:function(a){var z=this.C
return z.charCodeAt(0)==0?z:z},
v:{
hd:function(a,b,c){var z=J.ai(b)
if(!z.u())return a
if(c.length===0){do a+=H.b(z.gT())
while(z.u())}else{a+=H.b(z.gT())
for(;z.u();)a=a+c+H.b(z.gT())}return a},
pe:function(a){return new P.bS(a)}}}}],["","",,P,{"^":"",fY:{"^":"d;"}}],["","",,P,{"^":"",
e5:function(a){return C.M},
qS:{"^":"d;",
aq:function(a){if(a<=0||a>4294967296)throw H.c(P.nx("max must be in range 0 < max \u2264 2^32, was "+a))
return Math.random()*a>>>0},
kC:function(){return Math.random()}}}],["","",,S,{"^":"",ka:{"^":"d;a,b,$ti",
j:function(a,b){return this.b.j(0,b)},
ad:function(a){return this.b.ad(a)},
Z:function(a,b){return this.b.Z(0,b)},
gX:function(a){var z=this.b
return z.gX(z)},
gav:function(a){var z=this.b
return z.gav(z)},
gl:function(a){var z=this.b
return z.gl(z)},
n:function(a,b,c){this.iT()
this.b.n(0,b,c)},
k:function(a){return J.h(this.b)},
iT:function(){if(!this.a)return
this.a=!1
this.b=P.cj(this.b,H.l(this,0),H.l(this,1))},
$isI:1}}],["","",,A,{"^":"",kb:{"^":"d;a,b,$ti",
gl:function(a){return this.b.a},
cp:function(a){return this.b.cp(a)},
a7:function(a,b){return this.b.a7(0,b)},
Z:function(a,b){return this.b.Z(0,b)},
gX:function(a){return this.b.a===0},
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
$isa_:1}}],["","",,S,{"^":"",dx:{"^":"d;fE:a<,b,$ti",
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
if(!z.$isdx)return!1
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
b1:function(a,b){return this.bQ(a,b,0)},
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
gX:function(a){return this.a.length===0},
gav:function(a){return this.a.length!==0},
gw:function(a){var z=this.a
return(z&&C.a).gw(z)},
ak:function(){if(new H.aw(H.Z(H.l(this,0)),null).A(0,C.q))throw H.c(new P.S('explicit element type required, for example "new BuiltList<int>"'))}},O:{"^":"d;fE:a<,b,$ti",
q:function(){var z,y
z=this.b
if(z==null){z=this.a
y=new S.dx(z,null,this.$ti)
y.ak()
this.a=z
this.b=y
z=y}return z},
m:function(a){if(H.aW(a,"$isdx",this.$ti,null)){this.a=a.gfE()
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
if(!H.dh(w,y))throw H.c(P.G("invalid element: "+H.b(w)))}}}}],["","",,A,{"^":"",cL:{"^":"d;iS:a<,b,c,d,$ti",
a2:function(a){var z=new A.cX(null,null,this.$ti)
z.ci()
z.m(this)
a.$1(z)
return z.q()},
E:function(){return new S.ka(!0,this.a,this.$ti)},
gB:function(a){var z=this.b
if(z==null){z=this.a.gcn()
z=H.bI(z,new A.jW(this),H.y(z,"B",0),null)
z=P.P(z,!1,H.y(z,"B",0))
C.a.fa(z)
z=X.bC(z)
this.b=z}return z},
A:function(a,b){var z,y,x,w,v
if(b==null)return!1
if(b===this)return!0
z=J.o(b)
if(!z.$iscL)return!1
y=b.a
x=this.a
if(y.gl(y)!==x.gl(x))return!1
z=z.gB(b)
w=this.gB(this)
if(z==null?w!=null:z!==w)return!1
z=this.c
if(z==null){z=x.gcn()
this.c=z}z=z.ga_(z)
for(;z.u();){v=z.gT()
if(!J.e(y.j(0,v),x.j(0,v)))return!1}return!0},
k:function(a){return J.h(this.a)},
j:function(a,b){return this.a.j(0,b)},
Z:function(a,b){this.a.Z(0,b)},
gX:function(a){var z=this.a
return z.gX(z)},
gav:function(a){var z=this.a
return z.gav(z)},
gl:function(a){var z=this.a
return z.gl(z)},
ci:function(){if(new H.aw(H.Z(H.l(this,0)),null).A(0,C.q))throw H.c(new P.S('explicit key type required, for example "new BuiltMap<int, int>"'))
if(new H.aw(H.Z(H.l(this,1)),null).A(0,C.q))throw H.c(new P.S('explicit value type required, for example "new BuiltMap<int, int>"'))}},jW:{"^":"a:0;a",
$1:function(a){var z,y
z=J.j(a)
y=J.j(this.a.a.j(0,a))
return X.df(X.b3(X.b3(0,J.j(z)),J.j(y)))}},cX:{"^":"d;a,b,$ti",
q:function(){var z=this.b
if(z==null){z=new A.cL(this.a,null,null,null,this.$ti)
z.ci()
this.b=z}return z},
m:function(a){var z
if(H.aW(a,"$iscL",this.$ti,null)){this.b=a
this.a=a.giS()}else if(!!a.$iscL){z=P.cj(a.a,H.l(this,0),H.l(this,1))
this.b=null
this.a=z}else if(!!a.$isI){z=P.cj(a,H.l(this,0),H.l(this,1))
this.b=null
this.a=z}else throw H.c(P.G("expected Map or BuiltMap, got "+H.b(a.gbz(a))))},
j:function(a,b){return this.a.j(0,b)},
n:function(a,b,c){if(c==null)H.i(P.G("null value"))
this.gj4().n(0,b,c)},
gj4:function(){if(this.b!=null){this.a=P.cj(this.a,H.l(this,0),H.l(this,1))
this.b=null}return this.a},
ci:function(){if(new H.aw(H.Z(H.l(this,0)),null).A(0,C.q))throw H.c(new P.S('explicit key type required, for example "new MapBuilder<int, int>"'))
if(new H.aw(H.Z(H.l(this,1)),null).A(0,C.q))throw H.c(new P.S('explicit value type required, for example "new MapBuilder<int, int>"'))}}}],["","",,L,{"^":"",dy:{"^":"d;j6:a<,b,$ti",
a2:function(a){var z=new L.aG(null,null,this.$ti)
z.b0()
z.m(this)
a.$1(z)
return z.q()},
gB:function(a){var z=this.b
if(z==null){z=this.a
z.toString
z=P.P(new H.bG(z,new L.jX(),[H.l(z,0),null]),!1,null)
C.a.fa(z)
z=X.bC(z)
this.b=z}return z},
A:function(a,b){var z,y,x
if(b==null)return!1
if(b===this)return!0
z=J.o(b)
if(!z.$isdy)return!1
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
y=new P.af(z,z.r,null,null,[null])
y.c=z.e
return y},
aJ:function(a,b){var z=this.a
z.toString
return new H.bG(z,b,[H.l(z,0),null])},
a7:function(a,b){return this.a.a7(0,b)},
Z:function(a,b){return this.a.Z(0,b)},
bH:function(a){return new A.kb(!0,this.a,this.$ti)},
gX:function(a){return this.a.a===0},
gav:function(a){return this.a.a!==0},
gw:function(a){var z=this.a
return z.gw(z)},
aT:function(a,b,c){return this.a.aT(0,b,c)},
cl:function(a,b){return this.aT(a,b,null)},
b0:function(){if(new H.aw(H.Z(H.l(this,0)),null).A(0,C.q))throw H.c(new P.S('explicit element type required, for example "new BuiltSet<int>"'))}},jX:{"^":"a:0;",
$1:function(a){return J.j(a)}},aG:{"^":"d;a,b,$ti",
q:function(){var z=this.b
if(z==null){z=new L.dy(this.a,null,this.$ti)
z.b0()
this.b=z}return z},
m:function(a){var z,y,x,w
if(H.aW(a,"$isdy",this.$ti,null)){this.a=a.gj6()
this.b=a}else{z=H.l(this,0)
y=P.a6(null,null,null,z)
for(x=J.ai(a);x.u();){w=x.gT()
if(H.dh(w,z))y.t(0,w)
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
b0:function(){if(new H.aw(H.Z(H.l(this,0)),null).A(0,C.q))throw H.c(new P.S('explicit element type required, for example "new SetBuilder<int>"'))},
j7:function(a){var z,y,x
for(z=new P.af(a,a.r,null,null,[null]),z.c=a.e,y=H.l(this,0);z.u();){x=z.d
if(!H.dh(x,y))throw H.c(P.G("invalid element: "+H.b(x)))}}}}],["","",,Y,{"^":"",
k:function(a,b){if(typeof b!=="number")return H.x(b)
a=536870911&a+b
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
U:function(a){a=536870911&a+((67108863&a)<<3)
a^=a>>>11
return 536870911&a+((16383&a)<<15)}}],["","",,N,{"^":"",nW:{"^":"nU;ch,cx,ag:cy@,b7:db@,dx,b,c,d,e,f,r,x,y,z,Q,a",
hp:function(){var z=$.$get$cD()
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
y=new O.f8(N.bn("EdgeheadGame"),null,!1,null,null,null,null,null,null,null,null,new Y.a3(H.p([],[Y.ah]),0,P.b0()),x,w,z,O.vd(),O.vc(),O.vb(),y,this.gi0(),new P.bS(""),!1,null)
y.hY()
this.cx=y
y.x="endGame"
$.$get$cy().t(0,0)},
ie:function(){var z,y
z=new O.d3(["# Insignificant Little Vermin",[null,P.a0(["goto","gameLoop"])]],0,null,!1,!1)
y=this.b.a
y.n(0,"start",z)
z.a="start"
z=new O.d3([new N.nY(this),[null,P.a0(["goto","gameLoop"])]],0,null,!1,!1)
y.n(0,"gameLoop",z)
z.a="gameLoop"
z=new O.d3(['<p class="meta">\n  Hit <strong>Restart</strong> (top left) to play again. It will be different.\n</p>'],0,null,!1,!1)
y.n(0,"endGame",z)
z.a="endGame"
this.c=y.j(0,"start")},
v:{
nX:function(){var z,y,x,w
z=Z.bQ("Health",new N.tt(),"#CCCCCC","Your physical state",100,0,!0,P.aX)
y=P.t
x=Z.bQ("Stamina",new N.tu(),"#CCCCCC","Spare physical energy",0,0,!0,y)
y=Z.bQ("Gold",new N.tv(),"#CCCCCC","Gold coins",0,0,!0,y)
w=P.q
z=new N.nW("net.filiph.edgehead.0.0.1",null,z,x,y,new O.o1(new H.R(0,null,null,null,null,null,0,[w,O.d3])),null,null,null,P.a6(null,null,null,w),!1,null,-9999,null,null,null)
z.ie()
return z}}},tt:{"^":"a:19;",
$1:function(a){var z=J.o(a)
if(z.A(a,0))return"\ud83d\udc80"
if(z.d9(a,0.5))return"\ud83d\ude23"
if(z.aZ(a,1))return"\ud83d\ude27"
return"\ud83d\ude10"}},tu:{"^":"a:9;",
$1:function(a){return H.b(a)+" \ud83d\udd06"}},tv:{"^":"a:9;",
$1:function(a){return H.b(a)+" \ud83d\udcb0"}},nY:{"^":"a:20;a",
$0:function(){var z=0,y=P.aC(),x=this
var $async$$0=P.ay(function(a,b){if(a===1)return P.aI(b,y)
while(true)switch(z){case 0:z=2
return P.ax(x.a.cx.by(),$async$$0)
case 2:return P.aJ(null,y)}})
return P.aK($async$$0,y)}},nZ:{"^":"a:19;",
$1:function(a){var z=J.o(a)
if(z.A(a,0))return"\ud83d\udc80"
if(z.d9(a,0.5))return"\ud83d\ude23"
if(z.aZ(a,1))return"\ud83d\ude27"
return"\ud83d\ude10"}},o_:{"^":"a:9;",
$1:function(a){return H.b(a)+" \ud83d\udd06"}},o0:{"^":"a:9;",
$1:function(a){return H.b(a)+" \ud83d\udcb0"}}}],["","",,M,{"^":"",cQ:{"^":"d;"},l5:{"^":"d;"},pZ:{"^":"cQ;a,b,c",
a2:function(a){var z=new M.ee(null,!1,0,0)
z.m(this)
a.$1(z)
return z.q()},
A:function(a,b){if(b==null)return!1
if(b===this)return!0
if(!(b instanceof M.cQ))return!1
return this.a===b.a&&this.b===b.b&&!0},
gB:function(a){return Y.U(Y.k(Y.k(Y.k(0,this.a&0x1FFFFFFF),this.b&0x1FFFFFFF),C.O.gB(!1)))},
k:function(a){return"EdgeheadGlobalState {bloodrockFollowers="+C.e.k(this.a)+",\nbrianaQuoteIndex="+C.e.k(this.b)+",\nhasKegOfBeer="+String(!1)+",\n}"}},ee:{"^":"l5;d,a,b,c",
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
xA:[function(a){var z,y
z=a.gcc()
y=a.gc0()
if(typeof y!=="number")return H.x(y)
return z-2*y},"$1","dk",2,0,28],
xM:[function(a){var z,y,x
z=a.gcc()
y=a.gd2()
x=a.gc0()
if(typeof x!=="number")return H.x(x)
return z+y-x},"$1","ie",2,0,28],
f8:{"^":"mv;y,z,Q,ch,cx,cy,db,dx,dy,bI:fr<,fx,fc:fy<,ag:go<,b7:id<,k1,a,b,c,d,e,f,r,x",
hY:function(){var z,y,x,w,v,u
z=P.aE(C.o,null)
y=$.$get$bA()
this.cy=R.b6(1000,"orc",O.dk(),null,null,new G.aH("sword",1,1,!1,!0,!1,z),null,0,2,0,!1,2,!1,C.t,0,y)
this.db=R.b6(1001,"goblin",O.dk(),null,null,new G.aH("scimitar",1,1,!1,!0,!1,P.aE(C.o,null)),null,0,1,0,!1,1,!1,C.t,0,y)
y=new S.O(null,null,[Q.v])
y.ak()
y.m([new Q.v("start_adventure","","",null)])
this.dx=new K.co(y.q(),"preStartBook",new O.kX(),new O.kY(),null,null,"ground")
y=R.b6(1,"Filip",null,"preStartBook",null,null,null,0,2,1000,!0,2,!0,C.F,1,null)
this.ch=y
z=y.x
y=y.cy
if(typeof z!=="number")return z.d7()
if(typeof y!=="number")return H.x(y)
this.go.sae(z/y)
this.id.sae(this.ch.fx)
this.k1.sae(this.ch.r)
this.cx=R.b6(100,"Briana",null,this.dx.b,null,null,this.ch.y,0,2,0,!1,2,!0,C.a5,0,null)
this.dy=F.fT(this.dx,!1)
y=K.co
x=P.P($.$get$i3(),!0,y)
C.a.ax(x,[this.dx,$.$get$ez()])
w=new M.ee(null,!1,0,0).q()
z=this.ch
v=this.cx
u=this.dy
v=P.b9([z,v],R.A)
z=P.bb(null,O.cF)
u=new A.a4(v,P.a6(null,null,null,U.ad),w,z,P.b9(x,y),P.P([u],!0,S.ae),0,null)
this.fr=u
y=new Y.a3(H.p([],[Y.ah]),0,P.b0())
y.b=u.r
this.fx=new B.bK(u,null,y,1,1,!0,!1,!1,0)},
d4:function(){var z=0,y=P.aC(),x,w=this,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
var $async$d4=P.ay(function(a,b){if(a===1)return P.aI(b,y)
while(true)switch(z){case 0:v=w.fy
u=w.gjN()
if(v.hm(u)){z=1
break}t=w.fr.U(w.ch.y)
s=t.gag()
r=t.ghh()
if(typeof s!=="number"){x=s.d7()
z=1
break}if(typeof r!=="number"){x=H.x(r)
z=1
break}w.go.sae(s/r)
w.id.sae(t.gb7())
r=w.k1
s=t.gf5()
if(!J.e(r.f,s)){r.f=s
r.y=!0
$.cr=!0}s=w.y
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
return P.ax(o.kH(),$async$d4)
case 3:r=o.f
if(r.gX(r)){n=o.a
m=o.b
n.f2("There are no actions available for actorId="+H.b(m)+".")
m="Actions not available for "+H.b(m)+" and "
l=o.c
k=l.a
j=J.o(k)
k="PlanConsequence<"+j.gB(k)+", "+j.k(k)+", "+J.h(l.b)+", "+H.b(l.d)+", "+l.y+", "
n.bP(m+(k+(l.x?"isSuccess":"")+">")+".")}n=Z.n3(r)
i=new Z.n2(new P.hB(r,[null,null]),n)
if(r.gX(r))$.$get$bL().f2("Created with no recommendations.")
if(n.length===0){s.e_("No recommendation for "+H.b(p.gh()))
s.e_(new O.l_(w))
w.fr.h1(q.gi());++w.fr.r
z=1
break}z=p.gN()===!0?4:6
break
case 4:u=n.length
if(u>1)for(h=0;r=n.length,h<r;r===u||(0,H.at)(n),++h);s.bP("planner.generateTable for "+H.b(p.gh()))
o.f3().Z(0,new O.l0(w))
u=i.ho(q.gdG(),O.ie())
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
return P.ax(w.cA(i.kG(s==null?O.ie():s),p,v),$async$d4)
case 7:case 5:v.hm(u)
case 1:return P.aJ(x,y)}})
return P.aK($async$d4,y)},
cA:function(a,b,c){var z=0,y=P.aC(),x,w=this,v,u,t
var $async$cA=P.ay(function(d,e){if(d===1)return P.aI(e,y)
while(true)switch(z){case 0:v=a.dz(b,w.fx,w.fr)
u=P.P(v,!0,H.y(v,"B",0))
z=b.gN()===!0?3:5
break
case 3:z=6
return P.ax(w.dj(a,b,u),$async$cA)
case 6:z=4
break
case 5:t=S.nv(new H.ar(u,new O.kU(),[H.l(u,0),null]),1)
if(t>=u.length){x=H.f(u,t)
z=1
break}w.fx=u[t]
case 4:C.a.ax(c.a,w.fx.gfc().a)
w.fr=w.fx.gbI()
v=w.y
v.bP(new O.kV(a,b))
v.am(new O.kW(w,b))
case 1:return P.aJ(x,y)}})
return P.aK($async$cA,y)},
dj:function(a,b,c){var z=0,y=P.aC(),x=this,w,v,u,t,s,r,q,p,o,n,m,l
var $async$dj=P.ay(function(d,e){if(d===1)return P.aI(e,y)
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
v=v.l1(w)
t=a.aa(b,x.fr)
s=a.gO()&&b.kb(a.gK())
r="use "+H.b(u)
x.fI()
z=8
return P.ax(x.e.$4$rerollEffectDescription$rerollable(v,t,r,s),$async$dj)
case 8:q=e
s=new H.K(c,new O.kR(q),[H.l(c,0)])
x.fx=s.gcd(s)
if(q.gl9()===!0){p=A.ed(x.fx.gbI())
p.Y(b.gi(),new O.kS())
v=x.fx
t=v.gfN()
s=H.p([],[Y.ah])
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
return P.aK($async$dj,y)}},
kX:{"^":"a:3;",
$3:function(a,b,c){return c.p(0,"UNUSED because this is the first choice",!0)}},
kY:{"^":"a:3;",
$3:function(a,b,c){return H.i(new P.w("Room isn't to be revisited"))}},
l_:{"^":"a:2;a",
$0:function(){var z=this.a.fr.d
return"- how we got here: "+new H.ar(z,new O.kZ(),[H.l(z,0),null]).cm(0," <- ")}},
kZ:{"^":"a:0;",
$1:function(a){return a.gaS()}},
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
$1:function(a){return a.gkI()}},
kV:{"^":"a:2;a,b",
$0:function(){return H.b(this.b.gh())+" selected "+this.a.gh()}},
kW:{"^":"a:2;a,b",
$0:function(){var z,y
z=this.a.fr.d
y=new H.ar(z,new O.kT(),[H.l(z,0),null]).cm(0," <- ")
return"- how "+H.b(this.b.gh())+" got here: "+y}},
kT:{"^":"a:0;",
$1:function(a){return a.gaS()}},
kR:{"^":"a:0;a",
$1:function(a){return a.geN()===this.a.geN()}},
kS:{"^":"a:0;",
$1:function(a){var z=a.gb7()
if(typeof z!=="number")return z.at()
a.sb7(z-1)
return a}}}],["","",,Q,{"^":"",
ik:function(a,b,c){return P.aV(function(){var z=a,y=b,x=c
var w=0,v=1,u,t,s,r,q,p
return function $async$ik(d,e){if(d===1){u=e
w=v}while(true)switch(w){case 0:t=y.f
t=t.length!==0?C.a.gw(t):null
s=J.j3(t.b5(y.a,y),new Q.uq(z))
t=J.ai(s.a),r=new H.bT(t,s.b,[H.l(s,0)])
case 2:if(!r.u()){w=3
break}q=t.gT()
p=x.$1(q)
if(p.gJ()&&!z.eL(q,y)){w=2
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
t=(t.length!==0?C.a.gw(t):null).gbm(),t=t.ga_(t)
case 2:if(!t.u()){w=3
break}w=4
return x.$1(t.d)
case 4:w=2
break
case 3:return P.aT()
case 1:return P.aU(u)}}})},
uq:{"^":"a:0;a",
$1:function(a){return!J.e(a,this.a)&&a.gar()}},
ag:{"^":"d;",
dz:function(a,b,c){var z=this
return P.aV(function(){var y=a,x=b,w=c
var v=0,u=1,t,s,r,q,p
return function $async$dz(d,e){if(d===1){t=e
v=u}while(true)switch(v){case 0:s=z.H(y,x.gbI())
r=J.am(s)
v=r.bj(s,0)?2:3
break
case 2:q=A.ed(w)
v=4
return B.fH(q,x,z,z.ir(q,y,w,z.gM(),!0),s,!1,!1,!0)
case 4:case 3:v=r.aZ(s,1)?5:6
break
case 5:q=A.ed(w)
p=z.iq(q,y,w,z.gL(),!0)
if(typeof s!=="number")H.x(s)
v=7
return B.fH(q,x,z,p,1-s,!0,!1,!1)
case 7:case 6:return P.aT()
case 1:return P.aU(t)}}})},
fh:function(a,b,c,d,e,f){var z,y,x,w,v,u,t
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
w.b0()
w.m(C.d)
x.x=w
x=w}else x=w
w=this.b.gi()
if(w==null)H.i(P.G("null element"))
x.gev().t(0,w)}if(!!this.$isc9){x=this.b.gh0()
y.ga5().d=x}v=new Y.a3(H.p([],[Y.ah]),0,P.b0())
x=a.f
u=(x.length!==0?C.a.gw(x):null).gi()
a.gB(a);(x.length!==0?C.a.gw(x):null).kD(a,v)
this.a=d.$3(z,a,v)
if(a.dm(u)!=null)a.h1(u);++a.r
w=a.f4(u)
if(!(w==null))w.hk(a,v)
a.x=null
while(!0){w=x.length!==0?C.a.gw(x):null
if((w==null?w:w.dW(a))!=null){w=x.length!==0?C.a.gw(x):null
w=!J.e(w==null?w:w.de(a),!0)}else w=!0
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
a.d.fR(y.q())
return v},
ir:function(a,b,c,d,e){return this.fh(a,b,c,d,!1,e)},
iq:function(a,b,c,d,e){return this.fh(a,b,c,d,e,!1)}},
j4:{"^":"a:0;a",
$1:function(a){return J.e(a.gi(),this.a.gi())}},
z:{"^":"ag;c0:b<",
gW:function(){var z=new Y.a3(H.p([],[Y.ah]),0,P.b0())
z.fP(0,this.ga6(),this.b)
return z.ct()},
aa:function(a,b){var z=new Y.a3(H.p([],[Y.ah]),0,P.b0())
z.jm(0,this.gaf(),this.b,a,!0)
return z.ct()},
k:function(a){var z=this.b
return"EnemyTargetAction<"+this.ga6()+"::enemy="+H.b(z.gi())+"/"+H.b(z.gh())+">"}},
c9:{"^":"ag;",
gW:function(){return this.b.gW()},
k:function(a){return"ExitAction<"+this.b.gW()+">"}},
cd:{"^":"ag;",
gW:function(){var z=new Y.a3(H.p([],[Y.ah]),0,P.b0())
z.fP(0,this.ga6(),this.b)
return z.ct()},
k:function(a){return"ItemAction<"+this.gW()+">"}},
nF:{"^":"d;a,b",
k:function(a){return this.b},
v:{"^":"xl<"}}}],["","",,O,{"^":"",cF:{"^":"d;",
k:function(a){return"ActionRecord<"+H.b(this.b)+", "+H.b(this.d)+">"}},mj:{"^":"d;a,b",
k:function(a){return this.b}},pV:{"^":"cF;a,du:b<,eG:c<,aS:d<,e,cs:f<,fe:r<,V:x<,hF:y<,z,hG:Q<,hH:ch<",
a2:function(a){var z=new O.eV(null,null,null,null,null,null,null,null,null,null,null,null,null)
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
gB:function(a){return Y.U(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)),J.j(this.f)),J.j(this.r)),J.j(this.x)),J.j(this.y)),J.j(this.z)),J.j(this.Q)),J.j(this.ch)))},
k:function(a){return"ActionRecord {accomplices="+J.h(this.a)+",\nactionName="+J.h(this.b)+",\ndataString="+J.h(this.c)+",\ndescription="+H.b(J.h(this.d))+",\nknownTo="+J.h(this.e)+",\nprotagonist="+H.b(J.h(this.f))+",\nsufferers="+J.h(this.r)+",\ntime="+J.h(this.x)+",\nwasAggressive="+J.h(this.y)+",\nwasFailure="+J.h(this.z)+",\nwasProactive="+J.h(this.Q)+",\nwasSuccess="+J.h(this.ch)+",\n}"}},eV:{"^":"d;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",
gdu:function(){return this.ga5().c},
geG:function(){return this.ga5().d},
gaS:function(){return this.ga5().e},
gcs:function(){return this.ga5().r},
gfe:function(){var z,y
z=this.ga5()
y=z.x
if(y==null){y=new L.aG(null,null,[P.t])
y.b0()
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
y.b0()
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
y.b0()
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
x.b0()
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
r.b0()
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
return P.bV(new H.K(u,new R.uD(z),[H.l(u,0)]))
case 3:return P.aT()
case 1:return P.aU(v)}}})},
b6:function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){var z=new R.eW(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
new R.to(a,b,k,m,n,f,e,i,l,o,j,h,d,g,p,c).$1(z)
return z.q()},
uD:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gh5()
y=this.a.gi()
return z==null?y==null:z===y}},
A:{"^":"mF;",
gfU:function(){return!0},
gaH:function(){var z=this.x
if(typeof z!=="number")return z.bj()
return z>0},
gaz:function(){return this.e instanceof K.cc},
gap:function(){return this.dy===C.h},
ga0:function(){return this.dy===C.f},
ga4:function(){return this.dy===C.k},
ka:function(a,b){var z,y,x
for(z=this.cx.a,y=new P.af(z,z.r,null,null,[null]),y.c=z.e,x=0;y.u();){if(C.a.a7(y.d.gf1(),a))++x
if(x>=b)return!0}return!1},
ha:function(a){return this.ka(a,1)},
jV:function(){var z,y,x,w,v,u,t
for(z=this.cx.a,y=new P.af(z,z.r,null,null,[null]),y.c=z.e,x=null,w=-9999999;y.u();){v=y.d
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
eL:function(a,b){return this.hc(a,b)>0},
hc:function(a,b){var z,y
if(this.dE(b)){z=a.gaW()
y=this.fy.a
z=z.gi()
z=y==null?z==null:y===z}else z=!1
if(z)return 1000
if(this.iO(a,b,10))return 1
z=a.gaW()
y=this.fy.a
z=z.gi()
return(y==null?z!=null:y!==z)?1:0},
dE:function(a){var z,y
z=a.c7("Confuse",this,!0)
if(z==null)return!1
y=a.kZ("Unconfuse",this,!0)
if(y==null)return!0
return y<z},
dd:function(a){var z,y,x,w,v,u,t,s,r,q,p
z=a.U(this.y)
y=z.gag()
if(typeof y!=="number")return H.x(y)
x=2*y
if(!z.gaH())x-=10
y=z.e
if(!(y instanceof K.cc))x+=4
y=J.b5(y.gae(),2)
if(typeof y!=="number")return H.x(y)
x+=y
for(y=z.cx.a,w=[null],v=new P.af(y,y.r,null,null,w),v.c=y.e;v.u();){y=J.b5(v.d.gae(),10)
if(typeof y!=="number")return H.x(y)
x+=y}y=a.a
for(v=y.ga_(y),u=new H.bT(v,new R.jA(this),[H.l(y,0)]),t=0;u.u();){s=v.gT()
r=s.gar()?2:0
q=s.gag()
if(typeof q!=="number")return H.x(q)
p=J.b5(s.e.gae(),2)
if(typeof p!=="number")return H.x(p)
t=t+r+2*q+p
for(r=s.cx.a,q=new P.af(r,r.r,null,null,w),q.c=r.e;q.u();){r=J.b5(q.d.gae(),10)
if(typeof r!=="number")return H.x(r)
t+=r}}return new A.cG(x,t,y.bw(0,0,new R.jB(this,a)))},
iO:function(a,b,c){var z=b.l_(a,this,!0)
if(z==null)return!1
return z<=c},
$isaD:1},
mF:{"^":"d+dA;"},
to:{"^":"a:0;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx",
$1:function(a){var z,y
a.gD().z=this.a
a.gD().dx=this.b
a.gD().dy=this.d
a.gD().fx=this.e
z=this.f
if(z==null)z=$.$get$dj()
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
z=new L.aG(null,null,[U.ad])
z.b0()
z.m(C.d)
a.gD().cy=z
z=this.db
if(z!=null){y=new L.bs(null,null)
y.m(z)
z=y}else{z=$.$get$dm()
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
if(J.e(a.gaW(),z.fy)){y=a.gi()
z=z.y
z=y==null?z!=null:y!==z}else z=!1
return z}},
jB:{"^":"a:30;a,b",
$2:function(a,b){var z,y
z=b.gar()?1:0
y=b.gag()
if(typeof y!=="number")return H.x(y)
return J.ap(a,(z+y)*this.a.hc(b,this.b))}},
e_:{"^":"d;a,b",
k:function(a){return this.b}},
pW:{"^":"A;a,h_:b<,bF:c<,al:d<,S:e<,h5:f<,f5:r<,ag:x<,i:y<,z,c2:Q<,N:ch<,aB:cx<,hh:cy<,h:db<,aK:dx<,ah:dy<,a8:fr<,b7:fx<,aW:fy<",
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
if(z==null?y==null:z===y)if(J.e(this.b,b.b)){z=this.c
y=b.c
if(z==null?y==null:z===y)if(J.e(this.d,b.d))if(J.e(this.e,b.e)){z=this.f
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
else z=!1}else z=!1
else z=!1
return z},
gB:function(a){return Y.U(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)),J.j(this.f)),J.j(this.r)),J.j(this.x)),J.j(this.y)),J.j(this.z)),J.j(this.Q)),J.j(this.ch)),J.j(this.cx)),J.j(this.cy)),J.j(this.db)),J.j(this.dx)),J.j(this.dy)),J.j(this.fr)),J.j(this.fx)),J.j(this.fy)))},
k:function(a){return"Actor {categories="+J.h(this.a)+",\ncombineFunction="+J.h(this.b)+",\ncurrentRoomName="+J.h(this.c)+",\ncurrentShield="+H.b(J.h(this.d))+",\ncurrentWeapon="+H.b(J.h(this.e))+",\nfollowingActorId="+J.h(this.f)+",\ngold="+J.h(this.r)+",\nhitpoints="+J.h(this.x)+",\nid="+J.h(this.y)+",\ninitiative="+J.h(this.z)+",\nisActive="+J.h(this.Q)+",\nisPlayer="+J.h(this.ch)+",\nitems="+J.h(this.cx)+",\nmaxHitpoints="+J.h(this.cy)+",\nname="+J.h(this.db)+",\nnameIsProperNoun="+J.h(this.dx)+",\npose="+J.h(this.dy)+",\npronoun="+J.h(this.fr)+",\nstamina="+J.h(this.fx)+",\nteam="+J.h(this.fy)+",\n}"}},
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
gf5:function(){return this.gD().x},
gag:function(){return this.gD().y},
sag:function(a){this.gD().y=a
return a},
gi:function(){return this.gD().z},
gc2:function(){return this.gD().ch},
gN:function(){return this.gD().cx},
gaB:function(){var z,y
z=this.gD()
y=z.cy
if(y==null){y=new L.aG(null,null,[U.ad])
y.b0()
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
ga8:function(){return this.gD().fx},
gb7:function(){return this.gD().fy},
sb7:function(a){this.gD().fy=a
return a},
gaW:function(){var z,y
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
y.b0()
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
if(l==null){l=new L.aG(null,null,[U.ad])
l.b0()
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
return z}}}],["","",,A,{"^":"",cG:{"^":"d;cc:a<,d2:b<,c0:c<",
at:function(a,b){return new A.aq(this.a-b.gcc(),this.b-b.gd2(),J.bD(this.c,b.gc0()))},
k:function(a){return"ActorScore<self="+C.j.bi(this.a,2)+",team="+C.j.bi(this.b,2)+",enemy="+J.c3(this.c,2)+">"}},aq:{"^":"d;cc:a<,d2:b<,c0:c<",
gkr:function(){return this.a===-1/0&&this.b===-1/0&&J.e(this.c,-1/0)},
cb:function(a,b){if(typeof b!=="number")return H.x(b)
return new A.aq(this.a*b,this.b*b,J.c2(this.c,b))},
aj:function(a,b){return new A.aq(this.a+b.gcc(),this.b+b.gd2(),J.ap(this.c,b.gc0()))},
d7:function(a,b){if(typeof b!=="number")return H.x(b)
return new A.aq(this.a/b,this.b/b,J.b5(this.c,b))},
k:function(a){return"ActorScoreChange<self="+C.j.bi(this.a,2)+",team="+C.j.bi(this.b,2)+",enemy="+J.c3(this.c,2)+">"},
v:{
jz:function(a){var z,y,x,w,v,u,t,s,r
for(z=a.length,y=0,x=0,w=0,v=0,u=0;t=a.length,u<t;t===z||(0,H.at)(a),++u){s=a[u];++y
x+=s.a
w+=s.b
r=s.c
if(typeof r!=="number")return H.x(r)
v+=r}if(y===0)throw H.c(P.G("Cannot average empty iterable"))
return new A.aq(x/y,w/y,v/y)}}}}],["","",,U,{"^":"",
wM:function(a){switch(a){case C.y:return"fist"
case C.z:return"shield"
case C.r:return"spear"
case C.A:return"sword"}throw H.c(P.G(a))},
ad:{"^":"mG;f1:a<",
gaS:function(){return U.wM(C.a.geJ(this.a))},
gi:function(){return H.aF(this)},
gc2:function(){return!0},
gaH:function(){return!1},
gN:function(){return!1},
gaK:function(){return!1},
ga8:function(){return C.n},
gaW:function(){return $.$get$aM()},
$isaD:1},
mG:{"^":"d+dA;"},
cU:{"^":"d;a,b",
k:function(a){return this.b}}}],["","",,K,{"^":"",cc:{"^":"aS;h:b<,a"}}],["","",,E,{"^":"",br:{"^":"ad;h:b<,a",
gae:function(){return 1},
$isaD:1}}],["","",,Z,{"^":"",ak:{"^":"aS;h:b<,bJ:c<,bA:d<,aK:e<,cj:f<,eD:r<,a",v:{
oB:function(a,b,c,d,e){return new Z.ak(c,0,e,!1,!1,!1,P.aE(C.D,null))}}}}],["","",,G,{"^":"",aH:{"^":"aS;h:b<,bJ:c<,bA:d<,aK:e<,cj:f<,eD:r<,a",v:{
pg:function(a,b,c,d,e,f){return new G.aH(c,e,f,d,!0,!1,P.aE(C.o,null))}}}}],["","",,L,{"^":"",aS:{"^":"ad;",
geD:function(){return!1},
gcj:function(){return!1},
gko:function(){return!1},
gaU:function(){return this.gbJ()>0},
geO:function(){return this.gbA()>0},
gl:function(a){return 2},
gbJ:function(){return 0},
gbA:function(){return 0},
gae:function(){var z,y,x
z=this.gbJ()
y=this.gbA()
x=this.gaK()?1:0
return 2+z+y+x},
$isaD:1}}],["","",,G,{"^":"",mv:{"^":"d;",
fI:function(){var z,y
z=this.f
y=z.C
if(y.length!==0){this.b.$1(y.charCodeAt(0)==0?y:y)
z.C=""}},
ll:[function(a){this.f.C+=a},"$1","gjN",2,0,21],
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
return P.ax(w.d4(),$async$by)
case 5:z=3
break
case 4:w.fI()
case 1:return P.aJ(x,y)}})
return P.aK($async$by,y)}}}],["","",,B,{"^":"",f6:{"^":"d;dc:a<,dC:b<,cY:c<",
k:function(a){return"ConsequenceStats<order="+this.c+", cumProb="+J.c3(this.b,3)+", score="+this.a.k(0)+">"}},bK:{"^":"d;bI:a<,fN:b<,fc:c<,kI:d<,dC:e<,f,r,eN:x<,cY:y<",
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
y=z?e:J.c2(e,b.gdC())
z=z?0:b.gcY()+1
d.b=a.r
return new B.bK(a,c,d,e,y,g,f,h,z)}}}}],["","",,G,{"^":"",j5:{"^":"d;a,b,c,d,e,f",
jz:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=this.a
z.am("...")
z.am("combining scores")
y=H.p([],[A.aq])
x=new G.js()
for(w=J.ai(a),v=b.a,u=b.b,t=b.c,s=null;w.u();){r=w.gT()
z.am(new G.jq(r))
if(J.ab(r.gdC(),0.15))if(s==null){z.am("    - first _bestCase")
s=r}else if(J.ab(x.$1(r.gdc()),x.$1(s.gdc()))){z.am("    - new _bestCase")
s=r}q=r.gdc()
p=J.bD(q.c,t)
o=r.b
if(typeof o!=="number")return H.x(o)
n=new A.aq((q.a-v)*o,(q.b-u)*o,J.c2(p,o))
z.am(new G.jr(n))
y.push(n)}m=A.jz(y)
w=s==null
if(w)l=C.H
else{q=s.gdc()
l=new A.aq(q.a-v,q.b-u,J.bD(q.c,t))}w=w?s:s.gcY()
if(w==null)w=1
if(typeof w!=="number")return H.x(w)
v=l.a/w
u=l.b/w
w=J.b5(l.c,w)
t=m.a
q=m.b
p=m.c
z.am("- uplifts average = "+("ActorScoreChange<self="+C.j.bi(t,2)+",team="+C.j.bi(q,2)+",enemy="+J.c3(p,2)+">"))
z.am("- best = "+("ActorScoreChange<self="+C.u.bi(v,2)+",team="+C.u.bi(u,2)+",enemy="+J.c3(w,2)+">"))
t=v+t
q=u+q
p=w+p
z.am("- result = "+("ActorScoreChange<self="+C.u.bi(t,2)+",team="+C.u.bi(q,2)+",enemy="+C.j.bi(p,2)+">"))
return new A.aq(t,q,p)},
f3:function(){var z=this
return P.aV(function(){var y=0,x=1,w,v,u,t,s
return function $async$f3(a,b){if(a===1){w=b
y=x}while(true)switch(y){case 0:v=z.f,u=v.gcn(),u=u.ga_(u),t=1
case 2:if(!u.u()){y=3
break}s=u.gT()
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
w.bg(0)
v=x.c
u=v.a
t=u.a.bC(0,new G.jt(x))
s=t.dd(u)
r=x.a
r.bP("Planning for "+H.b(t.db)+", initialScore="+s.k(0))
q=new P.bd(x.ef(t,u).a(),null,null,null)
case 2:if(!q.u()){z=3
break}p=q.c
o=p==null?q.b:p.gT()
r.bn(new G.ju(t,o))
if(o.G(t,u)!==!0){r.bn(new G.jv(o))
z=2
break}z=4
return P.ax(x.cE(v,o,b,a,c).cv(0),$async$dJ)
case 4:n=e
if(J.eS(n)===!0){r.bn(new G.jw(o))
w.n(0,o,C.I)
z=2
break}r.bn(new G.jx(s,o,n))
m=x.jz(n,s,b)
w.n(0,o,m)
r.bn(new G.jy(o,m))
z=2
break
case 3:x.e=!0
return P.aJ(null,y)}})
return P.aK($async$dJ,y)},
kH:function(){return this.dJ(50,10,null)},
ef:function(a,b){return P.aV(function(){var z=a,y=b
var x=0,w=1,v,u,t,s,r,q,p,o
return function $async$ef(c,d){if(c===1){v=d
x=w}while(true)switch(x){case 0:u=y.f
x=2
return P.bV((u.length!==0?C.a.gw(u):null).gbO())
case 2:u=(u.length!==0?C.a.gw(u):null).gaG()
t=u.length
s={func:1,ret:Q.cd,args:[U.ad]}
r={func:1,ret:Q.c9,args:[Q.v]}
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
p.bn("=====")
p.bn(new G.ja(a6,q))
p.bn(new G.jb(a6))
if(a6.G(q,r)!==!0){p.bn("- firstAction not applicable")
z=1
break}o=q.dd(r)
p.bn(new G.jh(a5,o))
p.bn(new G.ji(a5))
n=P.bb(null,B.bK)
m=P.a6(null,null,null,A.a4)
l=J.o(r)
k=l.gB(r)
for(j=new P.bd(a6.dz(q,a5,r).a(),null,null,null);j.u();){i=j.c
h=i==null?j.b:i.gT()
if(l.gB(r)!==k)throw H.c(new P.w("Action "+a6.k(0)+" modified world state when producing "+H.b(h)+"."))
n.aE(h)}s.a=0
r=t.b
case 3:if(!!n.gX(n)){z=4
break}++s.a
g=n.dL()
p.am("----")
p.am(new G.jj(g))
p.am(new G.jk(g))
if(g.gcY()>a7||s.a>a8){p.am(new G.jl(s,a7,g))
p.am(new G.jm(g))
z=4
break}z=g.gbI().f.length===0?5:6
break
case 5:p.am("- leaf node: world.situations is empty (end of book)")
l=g.a
q=l.a.aT(0,new G.jn(t),new G.jo())
if(q==null){p.am("- this actor ("+H.b(r)+") has been removed")
z=3
break}f=new B.f6(q.dd(l),g.e,g.y)
p.am(new G.jc(f))
z=7
x=[1]
return P.dd(P.hL(f),$async$cE,y)
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
b=j?q:q.dd(l)
if(b==null)b=C.J
f=new B.f6(b,g.e,g.y)
p.am(new G.jf(o,f))
p.am(new G.jg(g))
z=8
x=[1]
return P.dd(P.hL(f),$async$cE,y)
case 8:p.am("- generating all actions for "+H.b(e.gh()))
j=n.c
i=n.b
a=n.a
for(a0=new P.bd(t.ef(e,l).a(),null,null,null);a0.u();){a1=a0.c
a2=a1==null?a0.b:a1.gT()
if(a2.G(e,l)!==!0)continue
for(a1=new P.bd(a2.dz(e,g,l).a(),null,null,null);a1.u();){a3=a1.c
a4=a3==null?a1.b:a3.gT();++t.d
if(J.c1(a4.gdC(),0.05))continue
if(m.a7(0,a4.gbI()))continue
n.aE(a4)}}p.am("- added "+(((n.c-n.b&n.a.length-1)>>>0)-((j-i&a.length-1)>>>0))+" new PlanConsequences")
m.t(0,l)
z=3
break
case 4:case 1:return P.dd(null,0,y)
case 2:return P.dd(v,1,y)}})
var z=0,y=P.qn($async$cE),x,w=2,v,u=[],t=this,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4
return P.rJ(y)},
i7:function(a,b){var z
if(a==null){z=b.d
throw H.c(P.G("Called ActorPlanner with actor == null. That may mean that a Situation returns getCurrentActor as null. Some action that you added should make sure it removes the Situation (maybe "+H.b(z.gw(z).gaS())+"?). World: "+J.h(b)+". Situation: "+H.b(b.gjD())+". Action Records: "+z.aJ(0,new G.jp()).cm(0,"<-")))}},
v:{
j6:function(a,b){var z,y,x
z=N.bn("ActorPlanner")
y=a==null?a:a.gi()
x=new Y.a3(H.p([],[Y.ah]),0,P.b0())
x.b=b.r
z=new G.j5(z,y,new B.bK(b,null,x,1,1,!0,!1,!1,0),0,!1,new H.R(0,null,null,null,null,null,0,[null,null]))
z.i7(a,b)
return z}}},jp:{"^":"a:0;",
$1:function(a){return a.gaS()}},js:{"^":"a:32;",
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
$0:function(){return"evaluating a PlanConsequence of '"+this.a.gfN().gW()+"'"}},jk:{"^":"a:2;a",
$0:function(){var z=this.a.gbI().f
return"- situation: "+H.b(J.iX(z.length!==0?C.a.gw(z):null))}},jl:{"^":"a:2;a,b,c",
$0:function(){return"- order ("+this.c.gcY()+") higher than maximum ("+this.b+"), or consequences ("+this.a.a+") higher than maximum"}},jm:{"^":"a:2;a",
$0:function(){var z=this.a.gbI().d
return"- how we got here: "+new H.ar(z,new G.j8(),[H.l(z,0),null]).cm(0," <- ")}},j8:{"^":"a:0;",
$1:function(a){return a.gaS()}},jn:{"^":"a:0;a",
$1:function(a){return J.e(a.gi(),this.a.b)}},jo:{"^":"a:2;",
$0:function(){return}},jc:{"^":"a:2;a",
$0:function(){return"- "+this.a.k(0)}},jd:{"^":"a:0;a",
$1:function(a){return J.e(a.gi(),this.a.b)}},je:{"^":"a:0;a",
$1:function(a){return J.e(a.gi(),this.a.b)}},jf:{"^":"a:2;a,b",
$0:function(){return"- mainActor's score == "+this.b.k(0)+" (initial="+this.a.k(0)+")"}},jg:{"^":"a:2;a",
$0:function(){var z=this.a.gbI().d
return"- how we got here: "+new H.ar(z,new G.j7(),[H.l(z,0),null]).cm(0," <- ")}},j7:{"^":"a:0;",
$1:function(a){return a.gaS()}}}],["","",,Z,{"^":"",n2:{"^":"d;a,b",
gbO:function(){return this.b},
gX:function(a){return this.b.length===0},
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
kG:function(a){var z,y,x,w,v,u,t,s,r,q,p
z={}
y=this.b
if(y.length===1)return C.a.gcd(y)
C.a.ce(y,new Z.n9(this,a))
x=this.a.a
w=x.gcw().bw(0,1/0,new Z.na(a))
v=x.gcw().bw(0,-1/0,new Z.nb(a))
x=J.am(v)
u=J.am(w)
t=u.at(w,J.c2(x.at(v,w),0.1))
z.a=t
if(u.A(w,v)){t=J.bD(t,1)
z.a=t
u=t}else u=t
s=x.at(v,u)
r=P.mt(y.length,new Z.nc(z,this,a,s),!1,P.M)
q=new H.ar(r,new Z.nd(C.a.bw(r,0,Z.v0())),[H.l(r,0),null]).bG(0,!1)
z=C.a.bw(q,0,Z.v1())
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
if(w==null||J.ab(a.$1(x.j(0,t)),v)){v=a.$1(x.j(0,t))
w=t
continue}}return w},
iI:function(a){return this.ee(a,C.d)},
v:{
n3:function(a){var z,y,x
z=a.gcn()
y=H.y(z,"B",0)
x=P.P(new H.K(z,new Z.n4(a),[y]),!1,y)
if(x.length===0)$.$get$bL().f2("After removing actions scored by undefined, there are no recommendations.")
return x},
xi:[function(a,b){return J.ap(a,b)},"$2","v0",4,0,44],
xj:[function(a,b){return J.ap(a,b)},"$2","v1",4,0,45]}},n5:{"^":"a:0;",
$1:function(a){return a.gcc()}},n6:{"^":"a:0;",
$1:function(a){return J.iT(a.gc0())}},n7:{"^":"a:0;",
$1:function(a){return a.gd2()}},n8:{"^":"a:6;a,b",
$2:function(a,b){var z,y
z=this.b
y=this.a.a.a
return-J.bE(z.$1(y.j(0,a)),z.$1(y.j(0,b)))}},n9:{"^":"a:6;a,b",
$2:function(a,b){var z,y
z=this.b
y=this.a.a.a
return-J.bE(z.$1(y.j(0,a)),z.$1(y.j(0,b)))}},na:{"^":"a:6;a",
$2:function(a,b){var z=this.a.$1(b)
return Math.min(H.dg(a),H.dg(z))}},nb:{"^":"a:6;a",
$2:function(a,b){var z=this.a.$1(b)
return Math.max(H.dg(a),H.dg(z))}},nc:{"^":"a:9;a,b,c,d",
$1:function(a){var z,y
z=this.b
y=z.b
if(a>=y.length)return H.f(y,a)
return J.b5(J.bD(this.c.$1(z.a.a.j(0,y[a])),this.a.a),this.d)}},nd:{"^":"a:0;a",
$1:function(a){return J.j_(J.c2(J.b5(a,this.a),1000))}},n4:{"^":"a:0;a",
$1:function(a){return!this.a.j(0,a).gkr()}}}],["","",,K,{"^":"",rT:{"^":"a:3;",
$3:function(a,b,c){}},co:{"^":"d;a,h:b<,c,d,jT:e<,f,ca:r<",
gjR:function(){return this.a},
gB:function(a){return C.b.gB(this.b)},
A:function(a,b){if(b==null)return!1
return b instanceof K.co&&b.b===this.b},
k:function(a){return"Room<"+this.b+">"},
jI:function(a,b,c){return this.c.$3(a,b,c)},
i_:function(a,b,c){return this.d.$3(a,b,c)},
jU:function(a,b,c){return this.e.$3(a,b,c)},
v:{
a1:function(a,b,c,d,e,f,g){var z=new S.O(null,null,[Q.v])
z.ak()
z.m(f)
return new K.co(z.q(),a,b,c,d,e,g)}}}}],["","",,Q,{"^":"",v:{"^":"d;h0:a<,W:b<,aS:c<,kl:d<"}}],["","",,S,{"^":"",ae:{"^":"d;",
gaG:function(){return C.d},
gbO:function(){return C.d},
gdG:function(){return 3},
dW:function(a){return this.aY(this.gV(),a)},
hk:function(a,b){},
hl:function(a,b){},
kD:function(a,b){},
dI:function(a){},
de:function(a){return!0}}}],["","",,S,{"^":"",
fQ:function(a){var z=$.$get$bN().aq(3)
if(z<0||z>=3)return H.f(a,z)
return a[z]},
nv:function(a,b){var z,y,x,w,v
z=$.$get$bN().kC()*b
for(y=new H.dO(a,a.gl(a),0,null,[H.y(a,"b1",0)]),x=0,w=0;y.u();){v=y.d
if(typeof v!=="number")return H.x(v)
x+=v
if(x>=z)return w;++w}throw H.c(P.G("The weights do not add up to total="+b))},
nw:function(a,b){var z,y,x,w,v,u,t
z=$.$get$bN().aq(b)
for(y=a.length,x=0,w=0,v=0;u=a.length,v<u;u===y||(0,H.at)(a),++v){t=a[v]
if(typeof t!=="number")return H.x(t)
x+=t
if(x>=z)return w;++w}throw H.c(P.G("The weights do not add up to total="+b))},
bO:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=J.L(a)
y=z.b1(a,"{")
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
if(p>1){o=$.$get$bN().aq(p)
z=z.aL(a,0,y)
x=w.length
if(o<0||o>=x)return H.f(w,o)
n=w[o]
m=o+1
if(m>=x)return H.f(w,m)
m=z+H.b(S.bO(C.b.aL(a,n+1,w[m])))
if(typeof v!=="number")return v.aj()
n=a.length
m+=C.b.aL(a,v+1,n)
z=m.charCodeAt(0)==0?m:m
if(t===n-1)return z
else return S.bO(z)}else{x=z.gl(a)
if(typeof x!=="number")return x.at()
if(t===x-1)return a
else{if(typeof t!=="number")return t.aj()
x=t+1
return z.aL(a,0,x)+H.b(S.bO(C.b.bK(a,x)))}}}else return a},
a7:function(a,b,c,d){var z=c!=null?3:2
switch($.$get$bN().aq(z)){case 0:a.$0()
break
case 1:b.$0()
break
case 2:c.$0()
break
case 4:d.$0()
break}}}],["","",,Y,{"^":"",ah:{"^":"d;b8:a<,b_:b<,aV:c<,hn:d<,e,dA:f@,hq:r<,hi:x<,fd:y<,jQ:z<,i2:Q<,d6:ch<,jg:cx<,kq:cy<,V:db<",
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
z="Report<"+C.b.aL(z,0,Math.min(z.length,20))+"...,thread="+H.b(this.cx)
return z+(this.cy?"(sup)":"")+">"}},a3:{"^":"d;a,V:b<,c",
geK:function(){return C.a.bt(this.a,new Y.oP())},
aR:function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){var z,y
if(b==null||J.e(b,""))return
z=(J.bh(b).eH(b,".")||C.b.eH(b,"!")||C.b.eH(b,"?"))&&C.b.dg(b,P.bq("[A-Z]",!0,!1))?!0:p
y=this.b
this.a.push(new Y.ah(b,m,h,j,i,d,k,g,!1,e,l,z,c,f,y))},
t:function(a,b){return this.aR(a,b,null,!1,!1,!1,!1,null,null,null,!1,!1,null,!1,null,!1)},
p:function(a,b,c){return this.aR(a,b,null,!1,!1,!1,!1,null,null,null,!1,!1,null,!1,null,c)},
bX:function(a,b,c,d){return this.aR(a,b,null,!1,!1,!1,!1,null,null,c,!1,!1,d,!1,null,!1)},
ji:function(a,b,c,d,e,f,g,h,i,j,k,l,m,n){return this.aR(a,b,c,d,e,f,g,h,i,j,k,!1,l,m,null,n)},
fP:function(a,b,c){return this.aR(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,null,!1,null,!1)},
jo:function(a,b,c,d,e,f){return this.aR(a,b,null,!1,!1,!1,!1,c,null,d,!1,!1,e,!1,null,f)},
ez:function(a,b,c,d,e){return this.aR(a,b,null,!1,!1,!1,c,null,null,null,!1,d,e,!1,null,!1)},
ey:function(a,b,c,d){return this.aR(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,d,!1,null,!1)},
bX:function(a,b,c,d){return this.aR(a,b,null,!1,!1,!1,!1,null,null,c,!1,!1,d,!1,null,!1)},
fQ:function(a,b,c,d,e,f){return this.aR(a,b,c,!1,!1,!1,!1,d,null,null,e,!1,f,!1,null,!1)},
jn:function(a,b,c,d,e,f){return this.aR(a,b,c,!1,!1,d,!1,e,null,null,!1,!1,f,!1,null,!1)},
jk:function(a,b,c){return this.aR(a,b,c,!1,!1,!1,!1,null,null,null,!1,!1,null,!1,null,!1)},
jl:function(a,b,c,d){return this.aR(a,b,c,!1,!1,!1,!1,d,null,null,!1,!1,null,!1,null,!1)},
jm:function(a,b,c,d,e){return this.aR(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,d,!1,null,e)},
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
fS:function(){return this.p(0,"\n\n",!0)},
bY:function(a,b,c,d,e){var z,y,x,w
if(d!=null){z=J.L(a)
z=z.b1(a,"<owner's> "+H.b(b))!==-1||z.b1(a,"<ownerPronoun's> "+H.b(b))!==-1||z.b1(a,"<object-owner's> "+H.b(b))!==-1||z.b1(a,"<object-ownerPronoun's> "+H.b(b))!==-1}else z=!1
if(z)return a
z=J.L(a)
if(z.b1(a,"<subject's> "+H.b(b))!==-1||z.b1(a,"<subjectPronoun's> "+H.b(b))!==-1)return a
if(c.gaK()!==!0){y=this.c
x=y.j(0,c.gi())
if((x==null?-1:x)<e)w=z.d0(a,b,"the "+H.b(b))
else{w=J.eU(c.gh(),P.bq("[aeiouy]",!1,!1))?z.d0(a,b,"an "+H.b(b)):z.d0(a,b,"a "+H.b(b))
y.n(0,c.gi(),e)}}else w=null
return w==null?a:w},
eI:function(a,b){var z,y
if(!this.aX(a)||!this.aX(b))return!1
z=this.a
if(a<0||a>=z.length)return H.f(z,a)
if(z[a].gb_()!=null){if(b<0||b>=z.length)return H.f(z,b)
y=z[b].gb_()==null}else y=!0
if(y)return!1
if(a>=z.length)return H.f(z,a)
if(z[a].gaV()!=null){if(b<0||b>=z.length)return H.f(z,b)
y=z[b].gaV()==null}else y=!0
if(y)return!1
if(a>=z.length)return H.f(z,a)
y=z[a].gb_().gi()
if(b<0||b>=z.length)return H.f(z,b)
if(J.e(y,z[b].gaV().gi())){if(a>=z.length)return H.f(z,a)
y=z[a].gaV().gi()
if(b>=z.length)return H.f(z,b)
z=J.e(y,z[b].gb_().gi())}else z=!1
return z},
dV:function(a){var z=this
return P.aV(function(){var y=a
var x=0,w=2,v,u,t
return function $async$dV(b,c){if(b===1){v=c
x=w}while(true)switch(x){case 0:if(!z.aX(y)){x=1
break}u=z.a
if(y<0||y>=u.length)H.f(u,y)
t=u[y]
x=t.gb_()!=null?3:4
break
case 3:x=5
return t.gb_()
case 5:case 4:x=t.gaV()!=null?6:7
break
case 6:x=8
return t.gaV()
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
cX:[function(a){var z=J.am(a)
if(z.aZ(a,0)||z.bT(a,this.a.length))return
else{z=this.a
if(a>>>0!==a||a>=z.length)return H.f(z,a)
return z[a].gaV()}},"$1","gaV",2,0,22],
kE:function(a,b){var z
if(!this.aX(a)||!this.aX(b))return!1
if(this.eI(a,b)){z=this.a
if(a>=z.length)return H.f(z,a)
z[a].gfd()}return!1},
hm:function(a){var z
for(z=!1;this.geK();z=!0){a.$1(this.hr(!0))
this.kM()}return z},
hr:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c
z=this.a
y=C.a.bw(z,[],new Y.oQ())
C.a.j2(z,new Y.oR(y),!1)
x=a&&this.geK()?C.a.b1(z,C.a.cl(z,new Y.oS()))+1:z.length
if(x<1)return""
for(w=-1,v=!0,u=!1,t=!1,s=0,r="";s<x;++s){q=s===0
if(!q){p=s-1
o=this.eI(p,s)
if(s>=z.length)return H.f(z,s)
if(!z[s].gdA())n=this.kE(s,p)&&this.i1(s,p)
else n=!0
if(n){if(p<0||p>=z.length)return H.f(z,p)
t=!z[p].gdA()}else t=!1
if(s>=z.length)return H.f(z,s)
z[s].sdA(t)
n=s-w
if(n<3)if(!u){if(s>=z.length)return H.f(z,s)
if(!z[s].gi2()){if(p<0||p>=z.length)return H.f(z,p)
if(!z[p].gjQ()){if(s>=z.length)return H.f(z,s)
if(!z[s].gd6())if(this.ds(s,p)||o)if(!(t&&n>1)){if(t){if(p>=z.length)return H.f(z,p)
n=z[p].gdA()}else n=!1
n=n||this.l0(s)>4}else n=!0
else n=!0
else n=!0}else n=!0}else n=!0
v=n}else v=!0
else v=!0
if(v){if(p<0||p>=z.length)return H.f(z,p)
if(z[p].gd6()){r+=" "
p=r}else{r+=". "
p=r}if(t){if(s>=z.length)return H.f(z,s)
n=!z[s].gd6()}else n=!1
r=n?r+"But ":p
u=!1}else if(t){r+=S.fQ([" but "," but ",", but "])
u=!this.hO(s,s+1)&&!0}else{r+=S.fQ([" and "," and ",", and "])
u=!0}}m=this.e3(s)
l=S.bO(m)
p=J.L(l)
if(p.a7(l,"{")===!0||p.a7(l,"}")===!0)$.$get$iw().e_('Storyline result includes { and/or } even after being parsed by Randomly. Is there a dangling bracket here? Input = """'+H.b(m)+'""" Output = """'+H.b(l)+'"""')
n=!v
if(n){k=s-1
k=this.ds(s,k)&&J.eU(this.e3(k),"<subject> ")&&p.dg(l,"<subject> ")}else k=!1
if(k)l=p.d0(l,"<subject> ","")
j=J.dt(l,"<action>",this.e3(s))
p=s-1
k=this.j5(s,p)
if(k)k=!(this.cX(s).ga8()===C.n&&this.bs(s).ga8()===C.n)
else k=!1
if(k){j=H.n(j,"<object-owner's> <object>","<objectPronounAccusative>")
j=H.n(j,"<object-ownerPronoun's> <object>","<objectPronounAccusative>")
j=H.n(j,"<object>","<objectPronounAccusative>")
j=H.n(j,"<object's>","<objectPronoun's>")}k=this.ds(s,p)
if(k){j=H.n(j,"<owner's> <subject>","<subjectPronoun>")
j=H.n(j,"<ownerPronoun's> <subject>","<subjectPronoun>")
j=H.n(j,"<subject>","<subjectPronoun>")
j=H.n(j,"<subject's>","<subjectPronoun's>")}if(this.cX(p)!=null)if(this.bs(s)!=null)if(this.bs(p)!=null){k=this.cX(p)
k=k==null?k:k.gi()
i=this.bs(s)
if(J.e(k,i==null?i:i.gi())){k=this.bs(p)
k=k==null?k:k.ga8()
i=this.bs(s)
k=!J.e(k,i==null?i:i.ga8())}else k=!1}else k=!1
else k=!1
else k=!1
if(k){j=H.n(j,"<owner's> <subject>","<subjectPronoun>")
j=H.n(j,"<ownerPronoun's> <subject>","<subjectPronoun>")
j=H.n(j,"<subject>","<subjectPronoun>")
j=H.n(j,"<subject's>","<subjectPronoun's>")}if(this.bs(p)!=null)if(this.cX(s)!=null){k=this.bs(p)
k=k==null?k:k.gi()
i=this.cX(s)
if(J.e(k,i==null?i:i.gi())){p=this.bs(p)
p=p==null?p:p.ga8()
k=this.bs(s)
p=!J.e(p,k==null?k:k.ga8())}else p=!1}else p=!1
else p=!1
if(p){j=H.n(j,"<object-owner's> <object>","<objectPronoun>")
j=H.n(j,"<object-ownerPronoun's> <object>","<objectPronoun>")
j=H.n(j,"<object>","<objectPronounAccusative>")
j=H.n(j,"<object's>","<objectPronoun's>")}if(s>=z.length)return H.f(z,s)
p=z[s]
h=p.gb_()
g=p.gaV()
f=p.ghn()
e=p.e
k=h!=null
if(k){if(h.gN()===!0){d=H.n(j,"<subject>","<subjectPronoun>")
d=H.n(d,"<subject's>","<subjectPronoun's>")}else d=j
if(h.ga8()===C.F||h.ga8()===C.E){d=H.n(d,"<s>","")
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
i=h.ga8().a
d=H.n(d,"<subject>",i)
i=p.db
d=J.cE(this.bY(d,"<subjectNoun>",h,f,i),"<subjectNoun>",h.gh())
c=h.ga8().a
d=H.n(d,"<subjectPronoun>",c)
if(C.b.a7(j,P.bq("<subject>.+<subject's>",!0,!1))){c=h.ga8().c
d=H.n(d,"<subject's>",c)}d=J.cE(this.bY(d,"<subject's>",h,f,i),"<subject's>",H.b(h.gh())+"'s")
i=h.ga8().c
d=H.n(d,"<subject's>",i)
i=h.ga8().b
d=H.n(d,"<subjectPronounAccusative>",i)
i=h.ga8().d
d=H.n(d,"<subjectPronounSelf>",i)}else d=j
if(g!=null){if(g.gaK()===!0){d=H.n(d,"<subject's> <object>","<object>")
d=H.n(d,"<subjectPronoun's> <object>","<object>")}if(g.gN()===!0){d=H.n(d,"<object>","<objectPronoun>")
d=H.n(d,"<object's>","<objectPronoun's>")}else d=J.dt(this.bY(d,"<object>",g,e,p.db),"<object>",g.gh())
i=g.ga8().b
d=H.n(d,"<objectPronoun>",i)
if(C.b.a7(j,P.bq("<object>.+<object's>",!0,!1))){i=g.ga8().c
d=H.n(d,"<object's>",i)}d=J.cE(this.bY(d,"<object's>",g,e,p.db),"<object's>",H.b(g.gh())+"'s")
i=g.ga8().c
d=H.n(d,"<object's>",i)
i=g.ga8().c
d=H.n(d,"<objectPronoun's>",i)
i=g.ga8().b
d=H.n(d,"<objectPronounAccusative>",i)
i=g.ga8().a
d=H.n(d,"<objectPronounNominative>",i)}if(k){k=h.ga8().c
d=H.n(d,"<subjectPronoun's>",k)}p=p.db
j=this.fJ(e,this.fJ(f,d,j,"<owner>","<owner's>","<ownerPronoun>","<ownerPronoun's>",p),j,"<object-owner>","<object-owner's>","<object-ownerPronoun>","<object-ownerPronoun's>",p)
r+=(!n||q)&&!t?Y.oO(j):j
if(v)w=s
if(s>=z.length)return H.f(z,s)
if(z[s].gd6())u=!0}q=x-1
if(q>=z.length)return H.f(z,q)
z=!z[q].gd6()?r+".":r
return H.wD(z.charCodeAt(0)==0?z:z,$.$get$hb(),new Y.oT(),null)},
ct:function(){return this.hr(!1)},
kM:function(){var z,y
if(!this.geK()){C.a.sl(this.a,0)
return}z=this.a
y=C.a.b1(z,C.a.cl(z,new Y.oU()))+1
P.cm(0,y,z.length,null,null,null)
z.splice(0,y-0)},
hO:function(a,b){var z,y
if(!this.aX(a)||!this.aX(b))return!1
if(this.eI(a,b)){z=this.a
if(a>=z.length)return H.f(z,a)
z[a].gfd()}if(!this.ds(a,b))return!1
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
if(!this.aX(a)||!this.aX(b))return!1
for(z=new P.bd(this.dV(a).a(),null,null,null);z.u();){y=z.c
x=y==null?z.b:y.gT()
for(y=new P.bd(this.dV(b).a(),null,null,null);y.u();){w=y.c
v=w==null?y.b:w.gT()
if(J.e(x.gi(),v.gi()))return!0}}return!1},
e3:[function(a){var z=J.am(a)
if(z.aZ(a,0)||z.bT(a,this.a.length))return
else{z=this.a
if(a>>>0!==a||a>=z.length)return H.f(z,a)
return z[a].gb8()}},"$1","gb8",2,0,14],
bs:[function(a){var z=J.am(a)
if(z.aZ(a,0)||z.bT(a,this.a.length))return
else{z=this.a
if(a>>>0!==a||a>=z.length)return H.f(z,a)
return z[a].gb_()}},"$1","gb_",2,0,22],
l0:function(a){var z,y,x
z=this.a
if(a>=z.length)return H.f(z,a)
if(z[a].gV()!=null){y=a-1
if(this.aX(y)){if(y<0||y>=z.length)return H.f(z,y)
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
aX:function(a){if(a>=this.a.length||a<0)return!1
else return!0},
fJ:function(a,b,c,d,e,f,g,h){var z
if(a!=null){z=a.gN()===!0?H.n(H.n(b,d,"you"),e,"your"):J.dt(this.bY(b,d,a,null,h),d,a.gh())
z=H.n(z,f,a.ga8().a)
z=H.n(H.n(J.cE(this.bY(C.b.a7(c,P.bq(d+".+"+e,!0,!1))?H.n(z,e,a.ga8().c):z,e,a,null,h),e,H.b(a.gh())+"'s"),e,a.ga8().c),g,a.ga8().c)}else z=H.n(H.n(H.n(H.n(b,d,""),e,""),f,""),g,"")
return z},
j5:function(a,b){var z,y
if(!this.aX(a)||!this.aX(b))return!1
z=this.a
if(a>=z.length)return H.f(z,a)
if(z[a].gaV()!=null){if(b<0||b>=z.length)return H.f(z,b)
y=z[b].gaV()==null}else y=!0
if(y)return!1
if(a>=z.length)return H.f(z,a)
y=z[a].gaV().gi()
if(b<0||b>=z.length)return H.f(z,b)
return J.e(y,z[b].gaV().gi())},
ds:function(a,b){var z,y
if(!this.aX(a)||!this.aX(b))return!1
z=this.a
if(a>=z.length)return H.f(z,a)
if(z[a].gb_()!=null){if(b<0||b>=z.length)return H.f(z,b)
y=z[b].gb_()==null}else y=!0
if(y)return!1
if(a>=z.length)return H.f(z,a)
y=z[a].gb_().gi()
if(b<0||b>=z.length)return H.f(z,b)
return J.e(y,z[b].gb_().gi())},
v:{
oO:function(a){var z,y,x
z=!C.b.a7(a,"\n\n")?C.b.l5(a):a
y=z.length
if(y===0)return z
if(0>=y)return H.f(z,0)
x=z[0].toUpperCase()
if(y===1)return x
else return x+C.b.bK(z,1)}}},oP:{"^":"a:0;",
$1:function(a){return J.e(a.gb8(),"\n\n")}},oN:{"^":"a:23;",
$1:function(a){return C.b.f0(H.n(H.n(a,"<also> ",""),"  "," "))}},oQ:{"^":"a:41;",
$2:function(a,b){var z,y,x
z=J.L(a)
y=z.gav(a)?z.gw(a):null
if(y!=null&&y.gkq()&&J.e(b.gjg(),y.cx)){x=z.gl(a)
if(typeof x!=="number")return x.at()
z.n(a,x-1,b)}else z.t(a,b)
return a}},oR:{"^":"a:43;a",
$1:function(a){return J.ds(this.a,a)}},oS:{"^":"a:0;",
$1:function(a){return J.e(a.gb8(),"\n\n")}},oT:{"^":"a:46;",
$1:function(a){return H.b(a.j(0,1))+H.b(a.j(0,2))+H.b(a.j(0,3))}},oU:{"^":"a:0;",
$1:function(a){return J.e(a.gb8(),"\n\n")}},aD:{"^":"mH;aK:a<,h:b<,c,aW:d<,N:e<,a8:f<",
gi:function(){return H.aF(this)},
gc2:function(){return!0},
gaH:function(){return!0},
v:{
c8:function(a,b,c,d,e){var z=H.p([],[P.q])
return new Y.aD(c,b,z,e==null?$.$get$aM():e,!1,d)}}},mH:{"^":"d+dA;"},dA:{"^":"d;",
gar:function(){return this.gaH()&&this.gc2()===!0},
a9:function(a,b,c,d,e,f,g,h,i,j,k,l,m){J.iU(a,b,c,d,e,f,g,h,i,j,k,H.F(this,"$isaD"),!1,m)},
bh:function(a,b,c){return this.a9(a,b,null,!1,!1,!1,!1,null,null,null,c,!1,!1)},
bo:function(a,b,c){return this.a9(a,b,null,!1,!1,!1,!1,null,null,null,!1,!1,c)},
ab:function(a,b){return this.a9(a,b,null,!1,!1,!1,!1,null,null,null,!1,!1,!1)},
ai:function(a,b,c){return this.a9(a,b,null,c,!1,!1,!1,null,null,null,!1,!1,!1)},
dM:function(a,b,c,d){return this.a9(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,d)},
kT:function(a,b,c,d,e){return this.a9(a,b,null,c,!1,!1,!1,d,null,null,!1,!1,e)},
ac:function(a,b,c){return this.a9(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,!1)},
dO:function(a,b,c,d,e,f){return this.a9(a,b,null,!1,!1,!1,!1,c,d,e,f,!1,!1)},
dO:function(a,b,c,d,e,f){return this.a9(a,b,null,!1,!1,!1,!1,c,d,e,f,!1,!1)},
aD:function(a,b,c){return this.a9(a,b,null,!1,!1,!1,c,null,null,null,!1,!1,!1)},
c4:function(a,b,c,d){return this.a9(a,b,null,!1,c,!1,d,null,null,null,!1,!1,!1)},
kS:function(a,b,c,d,e){return this.a9(a,b,null,c,!1,!1,!1,d,null,null,e,!1,!1)},
eV:function(a,b,c,d){return this.a9(a,b,null,c,!1,!1,!1,null,null,null,d,!1,!1)},
eV:function(a,b,c,d){return this.a9(a,b,null,c,!1,!1,!1,null,null,null,d,!1,!1)},
bR:function(a,b,c,d){return this.a9(a,b,null,c,!1,!1,!1,d,null,null,!1,!1,!1)},
bS:function(a,b,c,d,e){return this.a9(a,b,c,!1,!1,!1,!1,d,null,null,e,!1,!1)},
eU:function(a,b,c,d){return this.a9(a,b,null,c,!1,!1,d,null,null,null,!1,!1,!1)},
bp:function(a,b,c,d){return this.a9(a,b,null,!1,!1,!1,!1,c,null,null,d,!1,!1)},
c4:function(a,b,c,d){return this.a9(a,b,null,!1,c,!1,d,null,null,null,!1,!1,!1)},
dN:function(a,b,c,d,e){return this.a9(a,b,c,!1,!1,d,!1,e,null,null,!1,!1,!1)},
hv:function(a,b,c,d){return this.a9(a,b,null,!1,!1,!1,c,d,null,null,!1,!1,!1)},
hu:function(a,b,c,d){return this.a9(a,b,c,!1,!1,d,!1,null,null,null,!1,!1,!1)},
kV:function(a,b,c,d,e,f){return this.a9(a,b,c,d,!1,e,!1,f,null,null,!1,!1,!1)},
c5:function(a,b,c,d,e){return this.a9(a,b,c,d,!1,e,!1,null,null,null,!1,!1,!1)},
ht:function(a,b,c){return this.a9(a,b,c,!1,!1,!1,!1,null,null,null,!1,!1,!1)},
kQ:function(a,b,c,d){return this.a9(a,b,c,!1,!1,!1,!1,d,null,null,!1,!1,!1)},
eW:function(a,b,c,d){return this.a9(a,b,null,!1,!1,!1,!1,c,d,null,!1,!1,!1)},
kU:function(a,b,c,d,e){return this.a9(a,b,null,!1,c,!1,!1,d,null,null,e,!1,!1)},
kW:function(a,b,c,d,e,f){return this.a9(a,b,null,!1,c,!1,!1,d,e,null,f,!1,!1)},
eU:function(a,b,c,d){return this.a9(a,b,null,c,!1,!1,d,null,null,null,!1,!1,!1)},
kR:function(a,b,c,d){return this.a9(a,b,null,!1,c,!1,!1,null,null,null,d,!1,!1)}},ck:{"^":"d;a,b,c,d",
k:function(a){return this.a}}}],["","",,L,{"^":"",tr:{"^":"a:0;",
$1:function(a){a.gcM().b=2
return 2}},tO:{"^":"a:0;",
$1:function(a){a.gcM().b=0
return 0}},tp:{"^":"a:0;",
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
ef:function(a){var z=new L.bs(null,null)
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
case 1:return P.aU(v)}}})}}],["","",,A,{"^":"",a4:{"^":"d;dv:a<,aB:b<,c,d,e,f,V:r<,x",
gjD:function(){var z=this.f
return z.length!==0?C.a.gw(z):null},
gB:function(a){var z,y,x,w,v
z=X.bC(this.a)
y=X.bC(this.d)
x=X.bC(this.f)
w=this.r
v=this.c
v=X.df(X.b3(X.b3(0,C.e.gB(w)),J.j(v)))
return X.df(X.b3(X.b3(X.b3(X.b3(0,z&0x1FFFFFFF),y&0x1FFFFFFF),x&0x1FFFFFFF),v&0x1FFFFFFF))},
A:function(a,b){var z
if(b==null)return!1
z=J.o(b)
return!!z.$isa4&&this.gB(this)===z.gB(b)},
fO:function(a){var z,y
z=this.hM(a,!0)
y=z.ga_(z)
if(y.u()){y.gT()
return!0}return!1},
ao:function(a){var z,y
z=this.hL(a)
y=z.ga_(z)
if(y.u()){y.gT()
return!0}return!1},
h1:function(a){var z,y,x
z=this.dm(a)
if(z==null)throw H.c(new P.w("Tried to elapseSituationTime of situation id="+H.b(a)+" that doesn't exist in situations ("+H.b(this.f)+")."))
y=this.f
if(z!==(z|0)||z>=y.length)return H.f(y,z)
x=y[z].ay()
if(z!==(z|0)||z>=y.length)return H.f(y,z)
y[z]=x},
ay:function(){++this.r},
d8:function(a,b,c,d,e){var z=this.d
if(a!=null)z=z.dh(0,new A.pL(a))
if(b!=null)z=z.c9(0,new A.pM(b))
if(c!=null)z=z.c9(0,new A.pN(c))
if(e!=null)z=z.c9(0,new A.pO(e))
return d!=null?z.c9(0,new A.pP(d)):z},
hL:function(a){return this.d8(a,null,null,null,null)},
hM:function(a,b){return this.d8(a,null,null,null,b)},
hN:function(a,b,c){return this.d8(a,b,null,null,c)},
U:function(a){return this.a.bC(0,new A.pQ(a))},
dY:function(a){return this.e.bC(0,new A.pR(a))},
f4:function(a){var z,y
z=this.dm(a)
if(z==null)return
y=this.f
if(z!==(z|0)||z>=y.length)return H.f(y,z)
return y[z]},
as:function(a){var z,y
for(z=this.f,y=z.length-1;y>=0;--y){if(y>=z.length)return H.f(z,y)
if(J.e(z[y].gh(),a)){if(y>=z.length)return H.f(z,y)
return z[y]}}throw H.c(P.G("No situation with name="+a+" found."))},
k9:function(a){var z=this.a.aT(0,new A.pS(a),new A.pT())
if(z==null)return!1
return z.gaH()},
aC:function(){var z,y
z=this.f
y=C.a.gw(z)
y.dI(this)
C.a.a3(z,y)},
b3:function(a){var z,y
z=this.f
while(!0){if(!(z.length!==0&&!J.e(C.a.gw(z).gh(),a)))break
y=C.a.gw(z)
y.dI(this)
C.a.a3(z,y)}if(z.length===0)throw H.c(P.G("Tried to pop situations until "+a+" but none was found in stack."))},
c3:function(a,b){var z,y
z=this.dm(a)
if(z==null)throw H.c(P.G("Situation with id "+H.b(a)+" does not exist in "+H.b(this.f)))
y=this.f
if(z!==(z|0)||z>=y.length)return H.f(y,z)
y[z]=b},
dQ:function(a,b,c,d,e){var z,y,x,w
z=this.d8(a,b,c,d,e)
y=z.ga_(z)
if(y.u()){x=y.gT()
y=this.r
w=x.gV()
if(typeof w!=="number")return H.x(w)
return y-w}return},
c7:function(a,b,c){return this.dQ(a,null,b,null,c)},
kZ:function(a,b,c){return this.dQ(a,b,null,null,c)},
l_:function(a,b,c){return this.dQ(null,a,b,c,null)},
dP:function(a){return this.dQ(a,null,null,null,null)},
k:function(a){var z,y
z=this.a
y=z.el()
y.ax(0,z)
return"World<"+P.cf(y,"{","}")+">"},
Y:function(a,b){var z,y,x
z=this.U(a)
y=z.a2(b)
x=this.a
x.a3(0,z)
x.t(0,y)},
dm:function(a){var z,y,x
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
ed:function(a){var z,y,x,w
z=P.a6(null,null,null,R.A)
y=P.bb(null,O.cF)
x=P.a6(null,null,null,U.ad)
w=P.a6(null,null,null,null)
w=new A.a4(z,x,a.c,y,w,[],null,null)
w.ii(a)
return w}}},pL:{"^":"a:0;a",
$1:function(a){return a.gdu()===this.a}},pM:{"^":"a:0;a",
$1:function(a){return J.e(a.gcs(),this.a.gi())}},pN:{"^":"a:0;a",
$1:function(a){return a.gfe().a7(0,this.a.gi())}},pO:{"^":"a:0;a",
$1:function(a){return a.ghH()===this.a}},pP:{"^":"a:0;a",
$1:function(a){return a.ghF()===this.a}},pQ:{"^":"a:0;a",
$1:function(a){return J.e(a.gi(),this.a)}},pR:{"^":"a:0;a",
$1:function(a){return J.e(a.gh(),this.a)}},pS:{"^":"a:0;a",
$1:function(a){return J.e(a.gi(),this.a)}},pT:{"^":"a:2;",
$0:function(){return}}}],["","",,A,{"^":"",W:{"^":"ag;a1:b<"},fZ:{"^":"W;c,d,W:e<,I:f<,h:r<,b,a",
gJ:function(){return!1},
gO:function(){return!1},
gK:function(){return H.i(new P.w("Not rerollable"))},
P:[function(a,b,c){throw H.c(new P.w("SimpleAction always succeeds"))},"$3","gL",6,0,1],
R:[function(a,b,c){return this.c.$4(a,b,c,this)},"$3","gM",6,0,1],
aa:function(a,b){throw H.c(new P.w("SimpleAction shouldn't have to provide roll reason"))},
H:function(a,b){return 1},
G:function(a,b){var z=this.d
if(z==null)return!0
return z.$3(a,b,this)}}}],["","",,N,{"^":"",k5:{"^":"z;J:c<,a1:d<,I:e<,O:f<,K:r<,b,a",
ga6:function(){return"confuse <object>"},
gh:function(){return"Confuse"},
gaf:function(){return"will <subject> confuse <object>?"},
P:[function(a,b,c){var z
a.ab(c,"<subject> touch<es> <subject's> temple")
z=this.b
a.ac(c,"<subject> tr<ies> to {channel|implant} {terror|confusion} into <object's> mind",z)
a.eU(c,"<subject> fail<s>",!0,!0)
return H.b(a.gh())+" fails to confuse "+H.b(z.gh())},"$3","gL",6,0,1],
R:[function(a,b,c){var z
a.ab(c,"<subject> touch<es> <subject's> temple")
z=this.b
a.bp(c,"<subject> {channel<s>|implant<s>} {terror|confusion} into <object's> mind",z,!0)
z.aD(c,"<subject's> eyes go wide with terror",!0)
return H.b(a.gh())+" confuses "+H.b(z.gh())},"$3","gM",6,0,1],
H:function(a,b){return 0.6},
G:function(a,b){var z
if(a.gN()===!0)if(a.ga4()){z=b.a
z=new H.K(z,new N.k6(this),[H.l(z,0)])
z=z.gl(z)>=2&&!this.b.dE(b)}else z=!1
else z=!1
return z},
v:{
wT:[function(a){return new N.k5(!0,!0,"Channeling the terror of the Dead Prince into lesser minds is something you've been practicing. It makes the target rabid and disoriented. They might attack their own.",!0,C.c,a,null)},"$1","tP",2,0,4]}},k6:{"^":"a:0;a",
$1:function(a){return a.gaH()&&a.gaW().he(this.a.b.gaW())}}}],["","",,V,{"^":"",kt:{"^":"z;O:c<,K:d<,J:e<,a1:f<,I:r<,b,a",
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
b.Y(z.gi(),new V.kz())
return H.b(a.gh())+" kicks "+H.b(z.gh())+"'s weapon off"},"$3","gM",6,0,1],
H:function(a,b){var z=a.ga4()?0:0.2
if(a.ch===!0)return 0.7-z
return 0.5-z},
G:function(a,b){var z
if(a.ga4()||a.dy===C.h){z=this.b
z=z.ga0()&&!z.gaz()}else z=!1
return z},
v:{
wW:[function(a){return new V.kt(!0,C.c,!0,!0,"When enemies are on the ground, you can try to kick their weapon off to disarm them.",a,null)},"$1","u5",2,0,4]}},ku:{"^":"a:2;a,b,c",
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
this.b.kW(this.c,"<subject> kick<s> <object-owner's> <object> off <object-owner's> hand",!0,z.gS(),z,!0)}},kx:{"^":"a:2;a,b,c",
$0:function(){var z,y
z=this.c
y=this.a.b
this.b.bp(z,"<subject> kick<s> <object's> {right|} hand",y,!0)
z.bX(0,"<owner's> <subject> fl<ies> away",y,y.gS())}},ky:{"^":"a:13;a",
$1:function(a){a.gbm().t(0,this.a.b.gS())
return a}},kz:{"^":"a:0;",
$1:function(a){a.sS($.$get$dj())
return a}}}],["","",,R,{"^":"",md:{"^":"z;O:c<,K:d<,J:e<,a1:f<,I:r<,b,a",
gh:function(){return"KickToGround"},
ga6:function(){return"kick <object> to the ground"},
gaf:function(){return"will <subject> kick <object> prone?"},
P:[function(a,b,c){S.a7(new R.me(this,a,c),new R.mf(this,a,c),null,null)
return H.b(a.gh())+" fails to sweep "+H.b(this.b.gh())+" off feet"},"$3","gL",6,0,1],
R:[function(a,b,c){var z
S.a7(new R.mg(this,a,c),new R.mh(this,a,c,U.bB(b)),null,null)
z=this.b
b.Y(z.gi(),new R.mi())
return H.b(a.gh())+" sweeps "+H.b(z.gh())+" off feet"},"$3","gM",6,0,1],
H:function(a,b){var z=a.ga4()?0:0.2
if(a.ch===!0)return 0.7-z
return 0.5-z},
G:function(a,b){return(a.ga4()||a.dy===C.h)&&!this.b.ga0()},
v:{
xc:[function(a){return new R.md(!0,C.c,!0,!0,"Sweeping opponents off their feet doesn't deal much damage but on the ground they will be much easier targets for you and your allies.",a,null)},"$1","uS",2,0,4]}},me:{"^":"a:2;a,b,c",
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
$0:function(){this.b.kU(this.c,"<subject> kick<s> <object> off <object's> feet and to the ground",!0,this.a.b,!0)}},mh:{"^":"a:2;a,b,c,d",
$0:function(){var z,y
z=this.c
y=this.a.b
this.b.bp(z,"<subject> kick<s> <object's> {right|left} shin",y,!0)
y.ab(z,"<subject> {grunt|shriek}<s>")
y.aD(z,"<subject> fall<s> to the "+H.b(this.d),!0)}},mi:{"^":"a:0;",
$1:function(a){a.sah(C.f)
return a}}}],["","",,F,{"^":"",n1:{"^":"ag;I:b<,J:c<,a1:d<,O:e<,K:f<,a",
gW:function(){return"Stand off."},
gh:function(){return"Pass"},
P:[function(a,b,c){throw H.c(new P.Y(null))},"$3","gL",6,0,1],
R:[function(a,b,c){if(a.gN()===!0)a.ab(c,"<subject> stand<s> off")
return H.b(a.gh())+" passes the opportunity"},"$3","gM",6,0,1],
aa:function(a,b){return"WARNING this shouldn't be user-visible"},
H:function(a,b){return 1},
G:function(a,b){return!0}}}],["","",,Y,{"^":"",nf:{"^":"z;O:c<,K:d<,J:e<,a1:f<,I:r<,b,a",
ga6:function(){return"force <object> off balance"},
gh:function(){return"Pound"},
gaf:function(){return"will <subject> force <object> off balance?"},
P:[function(a,b,c){var z=this.b
a.eW(c,"<subject> {fiercely|violently} {pound<s>|strike<s>|hammer<s>|batter<s>} on <object-owner's> {<object>|weapon}",z.gS(),z)
z.bh(c,"<subject> {retain<s>|keep<s>} <subject's> {|combat} {stance|footing}",!0)
return H.b(a.gh())+" kicks "+H.b(z.db)+" off balance"},"$3","gL",6,0,1],
R:[function(a,b,c){var z=this.b
a.eW(c,"<subject> {fiercely|violently} {pound<s>|strike<s>|hammer<s>|batter<s>} on <object-owner's> {<object>|weapon}",z.gS(),z)
if(z.ga4()){z.hv(c,"<subject> lose<s> <object>",!0,$.$get$ex())
b.Y(z.y,new Y.ng())
C.a.t(b.f,U.mI(z,a))
return H.b(a.gh())+" pounds "+H.b(z.db)+" off balance"}else if(z.gap()){z.ab(c,"<subject> <is> already off balance")
c.ey(0,"<subject> make<s> <object> fall to the "+H.b(U.bB(b)),z,$.$get$iA())
b.Y(z.y,new Y.nh())
return H.b(a.gh())+" pounds "+H.b(z.db)+" to the ground"}throw H.c(new P.w("enemy pose must be either standing or off-balance"))},"$3","gM",6,0,1],
H:function(a,b){var z=a.ga4()?0:0.2
if(a.ch===!0)return 0.7-z
return 0.5-z},
G:function(a,b){var z,y
if(!a.ga0()){z=a.e
if(z.gaU()||z.gko()){z=this.b
if(!z.gS().gcj()){z.gS().geD()
y=!1}else y=!0
z=y&&!z.ga0()}else z=!1}else z=!1
return z},
v:{
xk:[function(a){return new Y.nf(!0,C.c,!0,!0,"Forcing enemies off balance often means hitting them heavily several times in a row. The goal is not to deal damage but to force the opponent to lose control of their combat stance. It can also give members of your party an opportunity to strike.",a,null)},"$1","v2",2,0,4]}},ng:{"^":"a:0;",
$1:function(a){a.sah(C.h)
return a}},nh:{"^":"a:0;",
$1:function(a){a.sah(C.f)
return a}}}],["","",,B,{"^":"",nD:{"^":"ag;I:b<,J:c<,a1:d<,O:e<,K:f<,a",
gW:function(){return"Regain balance."},
gh:function(){return"RegainBalance"},
P:[function(a,b,c){throw H.c(new P.Y(null))},"$3","gL",6,0,1],
R:[function(a,b,c){if(a.gN()===!0)a.bp(c,"<subject> regain<s> <object>",$.$get$ex(),!0)
b.Y(a.gi(),new B.nE())
return H.b(a.gh())+" regains balance"},"$3","gM",6,0,1],
aa:function(a,b){return"Will "+a.ga8().a+" regain balance?"},
H:function(a,b){return 1},
G:function(a,b){return a.gap()}},nE:{"^":"a:0;",
$1:function(a){a.sah(C.k)
return C.k}}}],["","",,O,{"^":"",nT:{"^":"ag;I:b<,J:c<,a1:d<,O:e<,K:f<,a",
gW:function(){return"Scramble."},
gh:function(){return"Scramble"},
P:[function(a,b,c){throw H.c(new P.Y(null))},"$3","gL",6,0,1],
R:[function(a,b,c){a.ab(c,"<subject> tr<ies> to {scramble|crawl} out of {reach|harm's way}")
return H.b(a.gh())+" scrambles on ground"},"$3","gM",6,0,1],
aa:function(a,b){return"Will "+a.ga8().a+" crawl out of harm's way?"},
H:function(a,b){return 1},
G:function(a,b){if(!a.ga0())return!1
if(A.dp(a,b))return!0
return!1}}}],["","",,Q,{"^":"",oC:{"^":"ag;I:b<,J:c<,a1:d<,O:e<,K:f<,a",
gW:function(){return"Stand up."},
gh:function(){return"StandUp"},
P:[function(a,b,c){throw H.c(new P.Y(null))},"$3","gL",6,0,1],
R:[function(a,b,c){a.ab(c,"<subject> {rise<s>|stand<s> up|get<s> to <subject's> feet|get<s> up|pick<s> <subjectPronounSelf> up}")
S.a7(new Q.oD(a,c),new Q.oE(a,c),null,null)
b.Y(a.gi(),new Q.oF())
return H.b(a.gh())+" stands up"},"$3","gM",6,0,1],
aa:function(a,b){return"Will "+a.ga8().a+" stand up?"},
H:function(a,b){return 1},
G:function(a,b){if(!a.ga0())return!1
if(A.dp(a,b))return!1
return!0}},oD:{"^":"a:2;a,b",
$0:function(){return this.a.ab(this.b,"<subject> {stagger<s>|sway<s>} back before finding balance")}},oE:{"^":"a:2;a,b",
$0:function(){return this.a.ab(this.b,"<subject> stead<ies> <subjectPronounSelf>")}},oF:{"^":"a:0;",
$1:function(a){a.sah(C.k)
return C.k}}}],["","",,T,{"^":"",
xN:[function(a){return new A.a2(T.eH(),null,null,new T.vi(),new T.vj(),new T.vk(),null,!0,"This move is hard, but when succesful, it's decisive.",!0,!0,"StartBreakNeckOnGround",!1,null,"break <object's> neck",null,a,null)},"$1","wm",2,0,4],
xO:[function(a){return new A.a2(T.eH(),new T.vl(),T.eH(),new T.vm(),new T.vn(),new T.vo(),new T.vp(),!0,"This move is hard, but when succesful, it's decisive.",!0,!0,"StartBreakNeckOnGroundPlayer",!0,C.c,"break <object's> neck","will <subject> succeed?",a,null)},"$1","wn",2,0,4],
xP:[function(a,b,c,d,e){a.ac(c,"<subject> throw<s> <subjectPronounSelf> {on|upon} <object>",d)
b.Y(a.gi(),new T.vq())},"$5","eH",10,0,8],
vi:{"^":"a:3;",
$3:function(a,b,c){return a.gN()!==!0&&c.ga0()&&a.gaz()&&c.gaz()}},
vj:{"^":"a:3;",
$3:function(a,b,c){return Y.f1(a,c)}},
vk:{"^":"a:3;",
$3:function(a,b,c){return S.dW(a,c,C.l)}},
vm:{"^":"a:3;",
$3:function(a,b,c){return a.gN()===!0&&c.ga0()&&a.gaz()&&c.gaz()}},
vn:{"^":"a:3;",
$3:function(a,b,c){return Y.f1(a,c)}},
vo:{"^":"a:3;",
$3:function(a,b,c){return S.dW(a,c,C.m)}},
vl:{"^":"a:3;",
$3:function(a,b,c){return 0.7}},
vp:{"^":"a:3;",
$3:function(a,b,c){return S.dW(a,c,C.p)}},
vq:{"^":"a:0;",
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
xQ:[function(a){return new A.a2(M.eI(),null,null,new M.vr(),new M.vs(),new M.vt(),null,!0,"Jumping and tackling an opponent is one of the most risky moves but it's a quick way to neutralize someone.",!0,!0,"StartLeap",!1,null,"leap at <object>",null,a,null)},"$1","wo",2,0,4],
xR:[function(a){return new A.a2(M.eI(),new M.vu(),M.eI(),new M.vv(),new M.vw(),new M.vx(),new M.vy(),!0,"Jumping and tackling an opponent is one of the most risky moves but it's a quick way to neutralize someone.",!0,!0,"StartLeapPlayer",!0,C.c,"leap at <object>","will <subject> tackle <objectPronoun>?",a,null)},"$1","wp",2,0,4],
xS:[function(a,b,c,d,e){if(a.ga0()){a.ht(c,"<subject> roll<s>",e.gi())
a.ht(c,"<subject> put<s> <subject's> feet under <subjectPronounAccusative>",e.gi())}a.kQ(c,"<subject> {leap<s>|jump<s>|spring<s>|launch<es> <subjectPronounSelf>|lunge<s>} at <object>",e.gi(),d)},"$5","eI",10,0,8],
vr:{"^":"a:3;",
$3:function(a,b,c){var z,y
if(a.gN()!==!0){if(!a.gaz()){z=a.fy
y=$.$get$bA()
z=z.a
y=y.a
y=z==null?y==null:z===y
z=y}else z=!0
z=z&&!c.ga0()&&!A.dp(a,b)}else z=!1
return z}},
vs:{"^":"a:3;",
$3:function(a,b,c){return F.fs(a,c)}},
vt:{"^":"a:3;",
$3:function(a,b,c){return V.dL(a,c,C.l)}},
vv:{"^":"a:3;",
$3:function(a,b,c){return a.gN()===!0&&a.gaz()&&!c.ga0()&&!A.dp(a,b)}},
vw:{"^":"a:3;",
$3:function(a,b,c){return F.fs(a,c)}},
vx:{"^":"a:3;",
$3:function(a,b,c){return V.dL(a,c,C.m)}},
vu:{"^":"a:3;",
$3:function(a,b,c){return a.ga4()?0.4:0.2}},
vy:{"^":"a:3;",
$3:function(a,b,c){return V.dL(a,c,C.p)}}}],["","",,U,{"^":"",
xT:[function(a){return new A.a2(U.eJ(),null,null,new U.vz(),new U.vA(),new U.vB(),null,!0,"Punching someone hard enough can cause them to lose their footing. And it hurts.",!0,!0,"StartPunch",!1,null,"punch <object>",null,a,null)},"$1","wq",2,0,4],
xU:[function(a){return new A.a2(U.eJ(),new U.vC(),U.eJ(),new U.vD(),new U.vE(),new U.vF(),new U.vG(),!0,"Punching someone hard enough can cause them to lose their footing. And it hurts.",!0,!0,"StartPunchPlayer",!0,C.c,"punch <object>","will <subject> hit <objectPronoun>?",a,null)},"$1","wr",2,0,4],
xV:[function(a,b,c,d,e){c.jn(0,"<subject> {thrust<s>|swing<s>} <subject's> fist at <object>",e.gi(),!0,d,a)},"$5","eJ",10,0,8],
vz:{"^":"a:3;",
$3:function(a,b,c){var z
if(a.gN()!==!0)z=(a.ga4()||a.dy===C.h)&&!c.ga0()&&a.gaz()
else z=!1
return z}},
vA:{"^":"a:3;",
$3:function(a,b,c){return Q.fP(a,c)}},
vB:{"^":"a:3;",
$3:function(a,b,c){return Z.e3(a,c,C.l)}},
vD:{"^":"a:3;",
$3:function(a,b,c){var z
if(a.gN()===!0)z=(a.ga4()||a.dy===C.h)&&!c.ga0()&&a.gaz()
else z=!1
return z}},
vE:{"^":"a:3;",
$3:function(a,b,c){return Q.fP(a,c)}},
vF:{"^":"a:3;",
$3:function(a,b,c){return Z.e3(a,c,C.m)}},
vC:{"^":"a:3;",
$3:function(a,b,c){return 0.7}},
vG:{"^":"a:3;",
$3:function(a,b,c){return Z.e3(a,c,C.p)}}}],["","",,G,{"^":"",
xW:[function(a){return new A.a2(G.eK(),null,null,new G.vJ(),new G.vK(),new G.vL(),null,!0,"The basic swordfighting move is also often the most effective.",!0,!0,"StartSlash",!1,null,"swing at <object>",null,a,null)},"$1","ws",2,0,4],
y0:[function(a){return new A.a2(G.eK(),new G.vU(),G.eK(),new G.vV(),new G.vW(),new G.vX(),new G.vY(),!0,"The basic swordfighting move is also often the most effective.",!0,!0,"StartSlashPlayer",!0,C.c,"swing at <object>","will <subject> hit <objectPronoun>?",a,null)},"$1","wt",2,0,4],
y1:[function(a,b,c,d,e){return a.dN(c,"<subject> swing<s> {"+H.b(U.aa(a))+" |}at <object>",e.gi(),!0,d)},"$5","eK",10,0,8],
vJ:{"^":"a:3;",
$3:function(a,b,c){return a.gN()!==!0&&a.ga4()&&!c.ga0()&&a.e.gaU()}},
vK:{"^":"a:3;",
$3:function(a,b,c){return M.bc(a,c)}},
vL:{"^":"a:3;",
$3:function(a,b,c){return L.aQ(a,c,C.l)}},
vV:{"^":"a:3;",
$3:function(a,b,c){return a.gN()===!0&&a.ga4()&&!c.ga0()&&a.e.gaU()}},
vW:{"^":"a:3;",
$3:function(a,b,c){return M.bc(a,c)}},
vX:{"^":"a:3;",
$3:function(a,b,c){return L.aQ(a,c,C.m)}},
vU:{"^":"a:3;",
$3:function(a,b,c){return 0.7-(c.gal()!=null?0.2:0)}},
vY:{"^":"a:3;",
$3:function(a,b,c){return L.aQ(a,c,C.p)}}}],["","",,R,{"^":"",
xX:[function(a,b,c,d,e){return a.hv(c,"<subject> completely miss<es> <object> with "+H.b(U.aa(a)),!0,d)},"$5","iG",10,0,11],
xY:[function(a){return new A.a2(R.iH(),new R.vM(),R.iG(),new R.vN(),new R.vO(),new R.vP(),null,!1,"It's always better to fight with your feet firmly on the ground. But sometimes, it's necessary to act quickly.",!0,!0,"StartSlashOutOfBalance",!1,null,"swing at <object> (while out of balance)",null,a,null)},"$1","wu",2,0,4],
xZ:[function(a){return new A.a2(R.iH(),new R.vQ(),R.iG(),new R.vR(),new R.vS(),new R.vT(),null,!1,"It's always better to fight with your feet firmly on the ground. But sometimes, it's necessary to act quickly.",!0,!0,"StartSlashOutOfBalancePlayer",!1,null,"swing at <object> (while out of balance)",null,a,null)},"$1","wv",2,0,4],
y_:[function(a,b,c,d,e){return a.dN(c,"<subject> swing<s> {"+H.b(U.aa(a))+" |}at <object>",e.gi(),!0,d)},"$5","iH",10,0,8],
vN:{"^":"a:3;",
$3:function(a,b,c){return a.gN()!==!0&&a.gap()&&!c.ga0()&&a.e.gaU()}},
vO:{"^":"a:3;",
$3:function(a,b,c){return M.bc(a,c)}},
vP:{"^":"a:3;",
$3:function(a,b,c){return L.aQ(a,c,C.l)}},
vM:{"^":"a:3;",
$3:function(a,b,c){return 0.7}},
vR:{"^":"a:3;",
$3:function(a,b,c){return a.gN()===!0&&a.gap()&&!c.ga0()&&a.e.gaU()}},
vS:{"^":"a:3;",
$3:function(a,b,c){return M.bc(a,c)}},
vT:{"^":"a:3;",
$3:function(a,b,c){return L.aQ(a,c,C.m)}},
vQ:{"^":"a:3;",
$3:function(a,b,c){return 0.5-(c.gal()!=null?0.2:0)}}}],["","",,D,{"^":"",
y2:[function(a){return new A.a2(D.eL(),null,null,new D.vZ(),new D.w_(),new D.w0(),null,!0,"Opponents on the ground are often the most vulnerable.",!0,!0,"StartStrikeDown",!1,null,"strike down at <object>",null,a,null)},"$1","ww",2,0,4],
y3:[function(a){return new A.a2(D.eL(),new D.w1(),D.eL(),new D.w2(),new D.w3(),new D.w4(),new D.w5(),!0,"Opponents on the ground are often the most vulnerable.",!0,!0,"StartStrikeDownPlayer",!0,C.c,"strike down at <object>","will <subject> hit?",a,null)},"$1","wx",2,0,4],
y4:[function(a,b,c,d,e){return a.ac(c,"<subject> strike<s> down {with "+H.b(U.aa(a))+" |}at <object>",d)},"$5","eL",10,0,11],
vZ:{"^":"a:3;",
$3:function(a,b,c){return a.gN()!==!0&&c.ga0()&&!a.ga0()&&a.e.gaU()}},
w_:{"^":"a:3;",
$3:function(a,b,c){return D.d6(a,c)}},
w0:{"^":"a:3;",
$3:function(a,b,c){return V.bJ(a,c,C.l)}},
w2:{"^":"a:3;",
$3:function(a,b,c){return a.gN()===!0&&c.ga0()&&!a.ga0()&&a.e.gaU()}},
w3:{"^":"a:3;",
$3:function(a,b,c){return D.d6(a,c)}},
w4:{"^":"a:3;",
$3:function(a,b,c){return V.bJ(a,c,C.m)}},
w1:{"^":"a:3;",
$3:function(a,b,c){var z,y
z=a.gap()?0.2:0
y=c.gal()!=null?0.2:0
return 0.7-z-y}},
w5:{"^":"a:3;",
$3:function(a,b,c){return V.bJ(a,c,C.p)}}}],["","",,A,{"^":"",
y5:[function(a){return new A.a2(A.eM(),null,null,new A.w6(),new A.w7(),new A.w8(),null,!0,"The basic move with a spear.",!0,!0,"StartThrustSpear",!1,null,"thrust at <object>",null,a,null)},"$1","wy",2,0,4],
y9:[function(a){return new A.a2(A.eM(),new A.wh(),A.eM(),new A.wi(),new A.wj(),new A.wk(),new A.wl(),!0,"The basic move with a spear.",!0,!0,"StartThrustSpearPlayer",!0,C.c,"thrust at <object>","will <subject> hit <objectPronoun>?",a,null)},"$1","wz",2,0,4],
ya:[function(a,b,c,d,e){return a.dN(c,"<subject> thrust<s> {"+H.b(U.aa(a))+" |}at <object>",e.gi(),!0,d)},"$5","eM",10,0,8],
w6:{"^":"a:3;",
$3:function(a,b,c){return a.gN()!==!0&&a.ga4()&&!c.ga0()&&a.e instanceof Z.ak}},
w7:{"^":"a:3;",
$3:function(a,b,c){return M.bc(a,c)}},
w8:{"^":"a:3;",
$3:function(a,b,c){return L.aQ(a,c,C.l)}},
wi:{"^":"a:3;",
$3:function(a,b,c){return a.gN()===!0&&a.ga4()&&!c.ga0()&&a.e instanceof Z.ak}},
wj:{"^":"a:3;",
$3:function(a,b,c){return M.bc(a,c)}},
wk:{"^":"a:3;",
$3:function(a,b,c){return L.aQ(a,c,C.m)}},
wh:{"^":"a:3;",
$3:function(a,b,c){return 0.7-(c.gal()!=null?0.2:0)}},
wl:{"^":"a:3;",
$3:function(a,b,c){return L.aQ(a,c,C.p)}}}],["","",,O,{"^":"",
y6:[function(a){return new A.a2(O.eN(),null,null,new O.w9(),new O.wa(),new O.wb(),null,!0,"Opponents on the ground are often the most vulnerable.",!0,!0,"StartThrustSpearDown",!1,null,"thrust down at <object>",null,a,null)},"$1","wA",2,0,4],
y7:[function(a){return new A.a2(O.eN(),new O.wc(),O.eN(),new O.wd(),new O.we(),new O.wf(),new O.wg(),!0,"Opponents on the ground are often the most vulnerable.",!0,!0,"StartThrustSpearDownPlayer",!0,C.c,"thrust down at <object>","will <subject> hit?",a,null)},"$1","wB",2,0,4],
y8:[function(a,b,c,d,e){return a.ac(c,"<subject> thrust<s> down {with "+H.b(U.aa(a))+" |}at <object>",d)},"$5","eN",10,0,11],
w9:{"^":"a:3;",
$3:function(a,b,c){return a.gN()!==!0&&c.ga0()&&!a.ga0()&&a.e instanceof Z.ak}},
wa:{"^":"a:3;",
$3:function(a,b,c){return D.d6(a,c)}},
wb:{"^":"a:3;",
$3:function(a,b,c){return V.bJ(a,c,C.l)}},
wd:{"^":"a:3;",
$3:function(a,b,c){return a.gN()===!0&&c.ga0()&&!a.ga0()&&a.e instanceof Z.ak}},
we:{"^":"a:3;",
$3:function(a,b,c){return D.d6(a,c)}},
wf:{"^":"a:3;",
$3:function(a,b,c){return V.bJ(a,c,C.m)}},
wc:{"^":"a:3;",
$3:function(a,b,c){var z,y
z=a.gap()?0.2:0
y=c.gal()!=null?0.2:0
return 0.7-z-y}},
wg:{"^":"a:3;",
$3:function(a,b,c){return V.bJ(a,c,C.p)}}}],["","",,E,{"^":"",ph:{"^":"cd;a1:c<,b,a",
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
b.Y(a.gi(),new E.pj(this))
z=this.b
a.ac(c,"<subject> pick<s> <object> up",z)
return H.b(a.gh())+" picks up "+H.b(z.gh())},"$3","gM",6,0,1],
aa:function(a,b){return H.i(new P.Y(null))},
H:function(a,b){return 1},
G:function(a,b){if(!(this.b instanceof E.br))return!1
a.gfU()
if(a.d!=null)return!1
return!0},
v:{
xp:[function(a){return new E.ph(!0,a,null)},"$1","wH",2,0,29]}},pi:{"^":"a:13;a",
$1:function(a){a.gbm().a3(0,this.a.b)
return a}},pj:{"^":"a:0;a",
$1:function(a){a.sal(H.F(this.a.b,"$isbr"))}}}],["","",,M,{"^":"",pk:{"^":"cd;a1:c<,b,a",
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
b.Y(a.gi(),new M.pm(this,a))
z=this.b
a.ac(c,"<subject> pick<s> <object> up",z)
return H.b(a.gh())+" picks up "+H.b(z.gh())},"$3","gM",6,0,1],
aa:function(a,b){return H.i(new P.Y(null))},
H:function(a,b){return 1},
G:function(a,b){var z,y,x,w,v
z=this.b
y=J.o(z)
if(!y.$isaS)return!1
if(!!y.$isak)return!1
a.gfU()
x=a.e
w=x instanceof Z.ak&&!!y.$isaH
z=z.gae()
x=x.gae()
if(typeof x!=="number")return H.x(x)
if(z<=x&&!w)return!1
v=b.c7("DisarmKick",a,!0)
if(v!=null&&v<=2)return!1
return!0},
v:{
xq:[function(a){return new M.pk(!0,a,null)},"$1","wI",2,0,29]}},pl:{"^":"a:13;a",
$1:function(a){a.gbm().a3(0,this.a.b)
return a}},pm:{"^":"a:0;a,b",
$1:function(a){if(!this.b.gaz())a.gaB().t(0,a.gS())
a.sS(H.F(this.a.b,"$isaS"))}}}],["","",,D,{"^":"",pt:{"^":"z;J:c<,a1:d<,I:e<,O:f<,K:r<,b,a",
ga6:function(){return"throw spear at <object>"},
gh:function(){return"ThrowSpear"},
gaf:function(){return"will <subject> hit <object>?"},
P:[function(a,b,c){var z,y
z=this.ft(a)
y=this.b
a.ac(c,"<subject> {throw<s>|hurl<s>|cast<s>} "+H.b(z.gaK()===!0?z.gh():"<subject's> "+H.b(z.gh()))+" at <object>",y)
if(y.gal()!=null)y.kS(c,"<subject> deflects it with <subject's> <object>",!0,y.gal(),!0)
else y.eV(c,"<subject> {dodge<s> it|move<s> out of the way}",!0,!0)
z.ab(c,"<subject> {drive<s>|plunge<s>|ram<s>|thrust<s>} into the "+H.b(U.bB(b))+"{| nearby| not far from here}")
this.fF(b,a,z)
return H.b(a.gh())+" fails to hit "+H.b(y.gh())+" with spear"},"$3","gL",6,0,1],
R:[function(a,b,c){var z,y,x,w,v,u,t
z=this.ft(a)
y=this.b
a.ac(c,"<subject> {throw<s>|hurl<s>|cast<s>} "+H.b(z.gaK()===!0?z.gh():"<subject's> "+H.b(z.gh()))+" at <object>",y)
if(y.gal()!=null)z.dO(c,"<subject> fl<ies> past <object-owner's> <object>",y.gal(),y,a,!0)
b.Y(y.gi(),new D.px(z))
x=b.U(y.gi())
w=!x.gaH()&&x.gi()!==100
v=[P.q]
if(!w){u=S.bO("{shoulder|{left|right} arm|{left|right} thigh}")
t=a.gaW()
v=H.p([],v)
z.dO(c,"<subject> {pierce<s>|ram<s> into|drill<s> through} <object-owner's> <object>",new Y.aD(!1,u,v,t==null?$.$get$aM():t,!1,C.n),x,a,!0)
N.b4(c,x)}else{u=S.bO("{chest|eye|neck}")
t=a.gaW()
v=H.p([],v)
z.dO(c,"<subject> {pierce<s>|ram<s> into|drill<s> through} <object-owner's> <object>",new Y.aD(!1,u,v,t==null?$.$get$aM():t,!1,C.n),x,a,!0)
N.bj(c,b,x)}this.fF(b,a,z)
return H.b(a.gh())+" hits "+H.b(y.gh())+" with spear"},"$3","gM",6,0,1],
H:function(a,b){return 0.6-(this.b.gal()!=null?0.2:0)},
G:function(a,b){var z
if(a.gN()===!0)if(a.ga4())z=(C.a.a7(a.e.gf1(),C.r)||a.ha(C.r))&&J.e(b.as("FightSituation").gV(),0)
else z=!1
else z=!1
return z},
ft:function(a){var z,y
if(a.gS()!=null&&a.gS() instanceof Z.ak)return a.gS()
for(z=a.gaB(),z=z.ga_(z);z.u();){y=z.d
if(y instanceof Z.ak)return y}throw H.c(new P.w("No spear found in "+a.k(0)))},
fF:function(a,b,c){var z,y
z=a.as("FightSituation")
if(J.e(b.gS(),c)){y=b.jV()
if(y==null)y=$.$get$dj()
a.Y(b.y,new D.pu(y))}else a.Y(b.gi(),new D.pv(c))
a.c3(z.gi(),z.a2(new D.pw(c)))},
v:{
xs:[function(a){return new D.pt(!0,!0,"The enemy is far enough for you to throw a spear at them and ready your other weapon before they close in.",!0,C.c,a,null)},"$1","wL",2,0,4]}},px:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gag()
y=this.a.gbA()
if(typeof z!=="number")return z.at()
a.sag(z-y)
return a}},pu:{"^":"a:0;a",
$1:function(a){var z=this.a
a.sS(z)
a.gaB().a3(0,z)
return a}},pv:{"^":"a:0;a",
$1:function(a){a.gaB().a3(0,this.a)
return a}},pw:{"^":"a:0;a",
$1:function(a){a.gbm().t(0,this.a)
return a}}}],["","",,M,{"^":"",pF:{"^":"ag;I:b<,O:c<,K:d<,J:e<,a1:f<,a",
gW:function(){return"Regain clarity."},
gh:function(){return"Unconfuse"},
P:[function(a,b,c){throw H.c(new P.Y(null))},"$3","gL",6,0,1],
R:[function(a,b,c){a.ab(c,"<subject> shake<s> <subject's> head violently")
if(a.gN()===!0)c.t(0,"the {horrible|terrible} spell seems to recede")
a.kR(c,"<subject's> eyes regain focus and clarity",!0,!0)
return H.b(a.gh())+" regains clarity"},"$3","gM",6,0,1],
aa:function(a,b){return"WARNING this shouldn't be user-visible"},
H:function(a,b){return 1},
G:function(a,b){var z
if(a.dE(b)){z=b.c7("Confuse",a,!0)
if(typeof z!=="number")return z.bj()
z=z>4}else z=!1
return z}}}],["","",,R,{"^":"",lr:{"^":"z;I:c<,J:d<,a1:e<,O:f<,K:r<,b,a",
gh:function(){return"FinishBreakNeck"},
ga6:function(){return""},
gaf:function(){return"(WARNING should not be user-visible)"},
P:[function(a,b,c){throw H.c(new P.Y(null))},"$3","gL",6,0,1],
R:[function(a,b,c){var z,y
z=this.b
b.Y(z.gi(),new R.ls())
y=b.U(z.gi())
if(J.e(y.gi(),100)){a.bp(c,"<subject> smash<es> <object's> head to the ground",y,!0)
N.b4(c,y)}else{a.bp(c,"<subject> break<s> <object's> neck",y,!0)
N.bj(c,b,y)}return H.b(a.gh())+" breaks "+H.b(z.gh())+"'s neck on ground"},"$3","gM",6,0,1],
H:function(a,b){return 1},
G:function(a,b){return!0},
v:{
x1:[function(a){return new R.lr(null,!0,!0,!0,C.c,a,null)},"$1","ud",2,0,4]}},ls:{"^":"a:0;",
$1:function(a){a.sag(0)
return a}}}],["","",,Y,{"^":"",
f1:function(a,b){var z=new Y.dw(null,null,null,null,null)
new Y.tI(a,b).$1(z)
return z.q()},
f0:{"^":"ae;",
gaG:function(){return[R.ud()]},
gh:function(){return"BreakNeckOnGroundSituation"},
ay:function(){var z=new Y.dw(null,null,null,null,null)
z.m(this)
new Y.jU().$1(z)
return z.q()},
aY:function(a,b){if(a===0)return b.U(this.a)
return},
b5:function(a,b){return new H.K(a,new Y.jV(this),[H.l(a,0)])}},
tI:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a9().aq(1073741823)
a.gb9().c=z
a.gb9().e=0
z=this.a.gi()
a.gb9().b=z
z=this.b.gi()
a.gb9().d=z
return a}},
jU:{"^":"a:0;",
$1:function(a){var z=a.gb9().e
if(typeof z!=="number")return z.aj()
a.gb9().e=z+1
return a}},
jV:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.e(a.gi(),z.a)||J.e(a.gi(),z.c)}},
pX:{"^":"f0;a,i:b<,c,V:d<",
a2:function(a){var z=new Y.dw(null,null,null,null,null)
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
dw:{"^":"d;a,b,c,d,e",
gi:function(){return this.gb9().c},
gV:function(){return this.gb9().e},
gb9:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
m:function(a){this.a=a},
q:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gb9().b
x=this.gb9().c
w=this.gb9().d
v=this.gb9().e
z=new Y.pX(y,x,w,v)
if(y==null)H.i(P.m("attacker"))
if(x==null)H.i(P.m("id"))
if(w==null)H.i(P.m("target"))
if(v==null)H.i(P.m("time"))}this.m(z)
return z}}}],["","",,Z,{"^":"",l9:{"^":"z;I:c<,J:d<,a1:e<,O:f<,K:r<,b,a",
ga6:function(){return"evade"},
gh:function(){return"EvadeNeckBreaking"},
gaf:function(){return"will <subject> evade?"},
P:[function(a,b,c){a.ab(c,"<subject> tr<ies> to {dodge it|break free}")
S.a7(new Z.la(a,c),new Z.lb(this,a,c),null,null)
b.aC()
return H.b(a.gh())+" fails to dodge "+H.b(this.b.gh())},"$3","gL",6,0,1],
R:[function(a,b,c){var z=this.b
a.bp(c,"<subject> {dodge<s> it|break<s> free}",z,!0)
b.b3("FightSituation")
return H.b(a.gh())+" evades "+H.b(z.gh())},"$3","gM",6,0,1],
H:function(a,b){var z
if(a.gN()===!0)return 0.6
z=b.f
return(z.length!==0?C.a.gw(z):null).gb4().b2(0.5)},
G:function(a,b){return!0},
v:{
x0:[function(a){return new Z.l9("This looks dangerous. Trying to evade this close-quarter move seems prudent.",!1,!1,!0,C.c,a,null)},"$1","ua",2,0,4]}},la:{"^":"a:2;a,b",
$0:function(){return this.a.ai(this.b,"<subject> {can't|fail<s>}",!0)}},lb:{"^":"a:2;a,b,c",
$0:function(){return this.a.b.bR(this.c,"<subject> <is> too quick for <object>",!0,this.b)}}}],["","",,S,{"^":"",
dW:function(a,b,c){var z=new S.dV(null,null,null,null,null,null)
new S.tH(a,b,c).$1(z)
return z.q()},
fF:{"^":"c7;",
gaG:function(){return[Z.ua()]},
gh:function(){return"OnGroundWrestleDefenseSituation"},
ay:function(){var z=new S.dV(null,null,null,null,null,null)
z.m(this)
new S.mW().$1(z)
return z.q()}},
tH:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$a9().aq(1073741823)
a.gaQ().c=z
a.gaQ().f=0
z=this.a.gi()
a.gaQ().b=z
z=this.b.gi()
a.gaQ().e=z
a.gaQ().d=this.c
return a}},
mW:{"^":"a:0;",
$1:function(a){var z=a.gaQ().f
if(typeof z!=="number")return z.aj()
a.gaQ().f=z+1
return a}},
q6:{"^":"fF;cO:a<,i:b<,cr:c<,cu:d<,V:e<",
a2:function(a){var z=new S.dV(null,null,null,null,null,null)
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
dV:{"^":"d;a,b,c,d,e,f",
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
z=new S.q6(y,x,w,v,u)
if(y==null)H.i(P.m("attacker"))
if(x==null)H.i(P.m("id"))
if(w==null)H.i(P.m("predeterminedResult"))
if(v==null)H.i(P.m("target"))
if(u==null)H.i(P.m("time"))}this.m(z)
return z}}}],["","",,A,{"^":"",
dp:function(a,b){var z,y,x,w
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
aa:function(a){return a.gS().gaK()===!0?a.gS().gh():"<subject's> "+H.b(a.gS().gh())}}],["","",,G,{"^":"",
xB:[function(a,b,c,d,e){a.ab(c,"<subject> tr<ies> to swing back")
a.eU(c,"<subject> {go<es> wide|miss<es>}",!0,!0)
if(a.ga4()){b.Y(a.y,new G.tS())
a.c4(c,"<subject> lose<s> balance because of that",!0,!0)}else if(a.dy===C.h){b.Y(a.y,new G.tT())
a.aD(c,"<subject> lose<s> balance because of that",!0)
a.c4(c,"<subject> fall<s> to the ground",!0,!0)}},"$5","ib",10,0,11],
xC:[function(a){return new A.a2(G.ic(),new G.tU(),G.ib(),new G.tV(),new G.tW(),new G.tX(),null,!1,"You can deal serious damage when countering because your opponent is often caught off guard. On the other hand, counters require fast reaction and could throw you out of balance.",!0,!0,"CounterSlash",!1,null,"swing back at <object>",null,a,null)},"$1","u1",2,0,4],
xE:[function(a,b,c,d,e){return a.ac(c,"<subject> swing<s> back",d)},"$5","ic",10,0,8],
xD:[function(a){return new A.a2(G.ic(),new G.tY(),G.ib(),new G.tZ(),new G.u_(),new G.u0(),null,!1,"You can deal serious damage when countering because your opponent is often caught off guard. On the other hand, counters require fast reaction and could throw you out of balance.",!0,!0,"CounterSlashPlayer",!0,C.c,"swing back at <object>","will <subject> hit <objectPronoun>?",a,null)},"$1","u2",2,0,4],
tS:{"^":"a:0;",
$1:function(a){a.sah(C.h)
return a}},
tT:{"^":"a:0;",
$1:function(a){a.sah(C.f)
return a}},
tV:{"^":"a:3;",
$3:function(a,b,c){return a.gN()!==!0&&a.gS().gaU()&&!a.ga0()}},
tW:{"^":"a:3;",
$3:function(a,b,c){return M.bc(a,c)}},
tX:{"^":"a:3;",
$3:function(a,b,c){return L.aQ(a,c,C.l)}},
tU:{"^":"a:3;",
$3:function(a,b,c){return c.ga4()?0.7:0.9}},
tZ:{"^":"a:3;",
$3:function(a,b,c){return a.gN()===!0&&a.gS().gaU()&&!a.ga0()}},
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
b.Y(a.gi(),new V.kh())
return H.b(a.gh())+" fails to tackle "+H.b(z.gh())},"$3","gL",6,0,1],
R:[function(a,b,c){var z=this.b
a.ac(c,"<subject> tackle<s> <object> to the ground",z)
b.Y(z.gi(),new V.ki())
b.Y(a.gi(),new V.kj())
return H.b(a.gh())+" tackles "+H.b(z.gh())},"$3","gM",6,0,1],
H:function(a,b){var z=this.b.gap()?0.2:0
if(a.gN()===!0)return 0.7+z
return 0.5+z},
G:function(a,b){return!a.ga0()&&a.e instanceof K.cc},
v:{
wU:[function(a){return new V.ke("When an opponent misses you like that, it's a rare (though still dangerous) opportunity to bring them down.",!0,!0,!0,C.c,a,null)},"$1","u3",2,0,4]}},kf:{"^":"a:2;a,b",
$0:function(){return this.a.ai(this.b,"<subject> go<es> wide",!0)}},kg:{"^":"a:2;a,b",
$0:function(){return this.a.b.ai(this.b,"<subject> {evade<s>|sidestep<s>} it",!0)}},kh:{"^":"a:0;",
$1:function(a){a.sah(C.f)
return a}},ki:{"^":"a:0;",
$1:function(a){a.sah(C.f)
return a}},kj:{"^":"a:0;",
$1:function(a){a.sah(C.f)
return a}}}],["","",,S,{"^":"",
c5:function(a,b){var z=new S.dz(null,null,null,null,null)
new S.tA(a,b).$1(z)
return z.q()},
f7:{"^":"ae;",
gaG:function(){return[G.u1(),G.u2(),V.u3()]},
gbO:function(){return[$.$get$dY()]},
gh:function(){return"CounterAttackSituation"},
ay:function(){var z=new S.dz(null,null,null,null,null)
z.m(this)
new S.kc().$1(z)
return z.q()},
aY:function(a,b){if(a===0)return b.U(this.a)
return},
b5:function(a,b){return new H.K(a,new S.kd(this),[H.l(a,0)])}},
tA:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a9().aq(1073741823)
a.gba().c=z
a.gba().e=0
z=this.a.gi()
a.gba().b=z
z=this.b.gi()
a.gba().d=z
return a}},
kc:{"^":"a:0;",
$1:function(a){var z=a.gba().e
if(typeof z!=="number")return z.aj()
a.gba().e=z+1
return a}},
kd:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.e(a.gi(),z.a)||J.e(a.gi(),z.c)}},
pY:{"^":"f7;a,i:b<,c,V:d<",
a2:function(a){var z=new S.dz(null,null,null,null,null)
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
dz:{"^":"d;a,b,c,d,e",
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
z=new S.pY(y,x,w,v)
if(y==null)H.i(P.m("counterAttacker"))
if(x==null)H.i(P.m("id"))
if(w==null)H.i(P.m("target"))
if(v==null)H.i(P.m("time"))}this.m(z)
return z}}}],["","",,O,{"^":"",c7:{"^":"op;",
gdG:function(){return 1000},
aY:function(a,b){if(a===0)return b.U(this.gcu())
return},
b5:function(a,b){return new H.K(a,new O.ko(this),[H.l(a,0)])}},op:{"^":"ae+ni;"},ko:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.e(a.gi(),z.gcO())||J.e(a.gi(),z.gcu())}}}],["","",,U,{"^":"",
bB:function(a){return a.as("FightSituation").gca()},
cb:function(a,b,c,d,e){var z=new U.ca(null,null,null,null,null,null,null,null,null)
new U.rV(a,b,c,d,e).$1(z)
return z.q()},
cS:{"^":"ae;",
gaG:function(){return[N.tP(),V.u5(),R.uS(),Y.v2(),T.wm(),T.wn(),M.wo(),M.wp(),U.wq(),U.wr(),G.ws(),G.wt(),D.ww(),D.wx(),R.wu(),R.wv(),A.wy(),A.wz(),O.wA(),O.wB(),E.wH(),M.wI(),D.wL()]},
gbO:function(){return H.p([$.$get$fS(),$.$get$ha(),$.$get$fW(),$.$get$hA()],[Q.ag])},
gdG:function(){return 1000},
gh:function(){return"FightSituation"},
cP:function(a,b){var z=b.a
return(z&&C.a).bt(z,new U.le(a))},
ay:function(){var z=new U.ca(null,null,null,null,null,null,null,null,null)
z.m(this)
new U.lf().$1(z)
return z.q()},
aY:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j
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
p=x.aT(0,new U.lj(q),new U.lk())
o=p==null?p:p.gV()
if(o==null)o=-1
n=b.r
if(typeof o!=="number")return H.x(o)
m=n-o
if(m<=0)continue
l=x.aT(0,new U.ll(q),new U.lm())
k=l==null?l:l.gV()
if(k==null)k=-1
x=b.r
if(typeof k!=="number")return H.x(k)
j=(x-k+m)/2
if(q.gN()===!0)j*=1.5
if(j>t){s=q
t=j}}return s},
b5:function(a,b){return new H.K(a,new U.ln(this),[H.l(a,0)])},
hl:function(a,b){var z,y
z=this.x
y=this.c.a
if(y.ad(z))y.j(0,z).$2(a,b)},
dI:function(a){var z,y,x,w,v,u,t
z=this.r
if(z!=null&&!this.cP(a,this.b)&&this.cP(a,this.f)){y=a.f4(z)
a.c3(y.gi(),y.a2(new U.lo()))
for(z=this.f,x=z.a,x=new J.bk(x,x.length,0,null,[H.l(x,0)]),w=a.a;x.u();){v=x.d
if(a.U(v).gar()){u=a.U(v)
t=u.a2(new U.lp())
w.a3(0,u)
w.t(0,t)}}C.a.t(a.f,X.mw(z,this.d,this.a,null))}else this.cP(a,this.f)},
de:function(a){var z=this.f
if(this.cP(a,z))if(this.cP(a,this.b)){z=z.a
z=(z&&C.a).bt(z,new U.lq(a))}else z=!1
else z=!1
return z}},
rV:{"^":"a:0;a,b,c,d,e",
$1:function(a){var z,y
z=$.$get$a9().aq(1073741823)
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
y=new S.O(null,null,[U.ad])
y.ak()
y.m(C.d)
a.gan().b=y
y=this.d.gi()
a.gan().x=y
y=new A.cX(null,null,[P.t,{func:1,v:true,args:[A.a4,Y.a3]}])
y.ci()
y.m(this.e)
a.gan().d=y
return a}},
rw:{"^":"a:0;",
$1:function(a){return a.gi()}},
rx:{"^":"a:0;",
$1:function(a){return a.gi()}},
le:{"^":"a:0;a",
$1:function(a){return this.a.U(a).gar()}},
lf:{"^":"a:0;",
$1:function(a){var z=a.gan().y
if(typeof z!=="number")return z.aj()
a.gan().y=z+1
return a}},
lg:{"^":"a:0;a",
$1:function(a){return this.a.U(a)}},
lh:{"^":"a:0;",
$1:function(a){return a.gar()}},
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
if(a.gar()){z=this.a
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
$1:function(a){var z=this.a.U(a)
return z.gN()===!0&&z.gar()}},
q_:{"^":"cS;bm:a<,b,c,ca:d<,i:e<,d_:f<,r,V:x<",
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
gB:function(a){return Y.U(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)),J.j(this.f)),J.j(this.r)),J.j(this.x)))},
k:function(a){return"FightSituation {droppedItems="+J.h(this.a)+",\nenemyTeamIds="+J.h(this.b)+",\nevents="+J.h(this.c)+",\ngroundMaterial="+J.h(this.d)+",\nid="+J.h(this.e)+",\nplayerTeamIds="+J.h(this.f)+",\nroomRoamingSituationId="+H.b(J.h(this.r))+",\ntime="+J.h(this.x)+",\n}"}},
ca:{"^":"d;a,b,c,d,e,f,r,x,y",
gbm:function(){var z,y
z=this.gan()
y=z.b
if(y==null){y=new S.O(null,null,[U.ad])
y.ak()
y.m(C.d)
z.b=y
z=y}else z=y
return z},
gca:function(){return this.gan().e},
gi:function(){return this.gan().f},
gd_:function(){var z,y
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
if(!(z==null)){y=new A.cX(null,null,[H.l(z,0),H.l(z,1)])
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
if(x==null){x=new S.O(null,null,[U.ad])
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
if(v==null){v=new A.cX(null,null,[P.t,{func:1,v:true,args:[A.a4,Y.a3]}])
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
b.c3(z.gi(),z.a2(new N.uT(c)))
if(c.gah()===C.f){c.aD(a,"<subject> stop<s> moving",!0)
a.p(0,"\n\n",!0)
return}switch($.$get$hW().aq(3)){case 0:c.c4(a,"<subject> collapse<s>, dead",!0,!0)
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
uT:{"^":"a:0;a",
$1:function(a){var z=this.a
if(!z.gaz())a.gbm().t(0,z.e)
if(z.d!=null)a.gbm().t(0,z.d)
return a}}}],["","",,R,{"^":"",lt:{"^":"z;I:c<,J:d<,a1:e<,O:f<,K:r<,b,a",
gh:function(){return"FinishLeap"},
ga6:function(){return""},
gaf:function(){return"(WARNING should not be user-visible)"},
P:[function(a,b,c){throw H.c(new P.Y(null))},"$3","gL",6,0,1],
R:[function(a,b,c){var z,y,x,w,v
z=this.b
b.Y(z.gi(),new R.lu())
y=b.U(z.gi())
b.Y(a.gi(),new R.lv())
x=b.as("LeapSituation").gi()
w=U.bB(b)
a.bS(c,"<subject> {ram<s>|smash<es>} into <object>",x,z,!0)
c.jk(0,"both "+(a.gN()===!0||z.gN()===!0?"of you":"")+" {land on|fall to} the "+H.b(w),x)
v=z.gag()
if(typeof v!=="number")return v.bj()
if(v>1){c.jl(0,"the impact almost {knocks <object> unconscious|knocks <object> out}",x,z)
N.b4(c,y)
b.Y(z.gi(),new R.lw())}return H.b(a.gh())+" finishes leap at "+H.b(z.gh())},"$3","gM",6,0,1],
H:function(a,b){return 1},
G:function(a,b){return!0},
v:{
x2:[function(a){return new R.lt(null,!0,!0,!0,C.c,a,null)},"$1","ue",2,0,4]}},lu:{"^":"a:0;",
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
if(a.gap())a.c5(c,"<subject> <is> out of balance",z,!0,!0)
else S.a7(new S.kB(a,c,z),new S.kC(a,c,z),null,null)
b.aC()
return H.b(a.db)+" fails to dodge "+H.b(this.b.gh())},"$3","gL",6,0,1],
R:[function(a,b,c){var z,y,x
z=b.as("LeapSituation").gi()
y=U.bB(b)
x=this.b
a.bS(c,"<subject> {dodge<s>|sidestep<s>} <object>",z,x,!0)
x.aD(c,"<subject> {crash<es> to|fall<s> to|hit<s>} the "+H.b(y),!0)
b.Y(x.gi(),new S.kD())
b.b3("FightSituation")
return H.b(a.gh())+" dodges "+H.b(x.gh())},"$3","gM",6,0,1],
H:function(a,b){var z,y,x
z=a.ga4()?0:0.2
y=this.b.ga0()?0.2:0
if(a.ch===!0)return 0.8-z+y
x=b.f
return(x.length!==0?C.a.gw(x):null).gb4().b2(0.5-z+y)},
G:function(a,b){return!a.ga0()},
v:{
wX:[function(a){return new S.kA("Dodging means moving your body out of harm's way. When successful, your opponent will miss and will hit the ground beside you.",!1,!1,!0,C.c,a,null)},"$1","u6",2,0,4]}},kB:{"^":"a:2;a,b,c",
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
a.dN(c,"<subject> tr<ies> to {move|swing|shift} "+H.b(U.aa(a))+" between <subjectPronounSelf> and <object>",z,!0,y)
if(a.gap())a.c5(c,"<subject> <is> out of balance",z,!0,!0)
else S.a7(new D.lR(a,c,z),new D.lS(a,c,z),null,null)
b.aC()
return H.b(a.db)+" fails to impale "+H.b(y.gh())},"$3","gL",6,0,1],
R:[function(a,b,c){var z,y,x
z=b.as("LeapSituation").gi()
y=this.b
a.bS(c,"<subject> {move<s>|swing<s>|shift<s>} "+H.b(U.aa(a))+" between <subjectPronounSelf> and <object>",z,y,!0)
y.aD(c,"<subject> {leap<s>|run<s>|lunge<s>} right into it",!0)
b.Y(y.gi(),new D.lT())
x=b.U(y.gi())
if(!(!x.gaH()&&x.gi()!==100)){a.gS().ac(c,"<subject> {cut<s> into|pierce<s>|go<es> into} <object's> flesh",x)
x.ab(c,"<subject> fall<s> to the ground")
N.b4(c,x)}else{a.gS().ac(c,"<subject> {go<es> right through|completely impale<s>|bore<s> through} <object's> {body|chest|stomach|neck}",x)
x.aD(c,"<subject> go<es> down",!0)
N.bj(c,b,x)}b.b3("FightSituation")
return H.b(a.gh())+" impales "+H.b(y.gh())},"$3","gM",6,0,1],
H:function(a,b){var z,y,x
z=a.ga4()?0:0.2
y=this.b.ga0()?0.2:0
if(a.ch===!0)return 0.5-z+y
x=b.f
return(x.length!==0?C.a.gw(x):null).gb4().b2(0.4-z+y)},
G:function(a,b){return!a.ga0()&&a.e.geO()},
v:{
x8:[function(a){return new D.lQ("You can move your weapon to point at the attacker. If successful, the weapon will pierce the attacker with the force of his own leap.",!1,!1,!0,C.c,a,null)},"$1","uK",2,0,4]}},lR:{"^":"a:2;a,b,c",
$0:function(){return this.a.c5(this.b,"<subject> {can't|fail<s>|<does>n't succeed}",this.c,!0,!0)}},lS:{"^":"a:2;a,b,c",
$0:function(){return this.a.c5(this.b,"<subject> {<is> too slow|<is>n't fast enough}",this.c,!0,!0)}},lT:{"^":"a:0;",
$1:function(a){var z=a.gag()
if(typeof z!=="number")return z.at()
a.sag(z-1)
a.sah(C.f)
return a}}}],["","",,V,{"^":"",
dL:function(a,b,c){var z=new V.dK(null,null,null,null,null,null)
new V.tF(a,b,c).$1(z)
return z.q()},
fq:{"^":"c7;",
gaG:function(){return[S.u6(),D.uK()]},
gh:function(){return"LeapDefenseSituation"},
ay:function(){var z=new V.dK(null,null,null,null,null,null)
z.m(this)
new V.mk().$1(z)
return z.q()}},
tF:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$a9().aq(1073741823)
a.gaM().c=z
a.gaM().f=0
z=this.a.gi()
a.gaM().b=z
z=this.b.gi()
a.gaM().e=z
a.gaM().d=this.c
return a}},
mk:{"^":"a:0;",
$1:function(a){var z=a.gaM().f
if(typeof z!=="number")return z.aj()
a.gaM().f=z+1
return a}},
q1:{"^":"fq;cO:a<,i:b<,cr:c<,cu:d<,V:e<",
a2:function(a){var z=new V.dK(null,null,null,null,null,null)
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
dK:{"^":"d;a,b,c,d,e,f",
gi:function(){return this.gaM().c},
gV:function(){return this.gaM().f},
gaM:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.f=z.e
this.a=null}return this},
m:function(a){this.a=a},
q:function(){var z,y,x,w,v,u
z=this.a
if(z==null){y=this.gaM().b
x=this.gaM().c
w=this.gaM().d
v=this.gaM().e
u=this.gaM().f
z=new V.q1(y,x,w,v,u)
if(y==null)H.i(P.m("attacker"))
if(x==null)H.i(P.m("id"))
if(w==null)H.i(P.m("predeterminedResult"))
if(v==null)H.i(P.m("target"))
if(u==null)H.i(P.m("time"))}this.m(z)
return z}}}],["","",,F,{"^":"",
fs:function(a,b){var z=new F.dM(null,null,null,null,null)
new F.tG(a,b).$1(z)
return z.q()},
fr:{"^":"ae;",
gaG:function(){return[R.ue()]},
gh:function(){return"LeapSituation"},
ay:function(){var z=new F.dM(null,null,null,null,null)
z.m(this)
new F.ml().$1(z)
return z.q()},
aY:function(a,b){if(a===0)return b.U(this.a)
return},
b5:function(a,b){return new H.K(a,new F.mm(this),[H.l(a,0)])}},
tG:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a9().aq(1073741823)
a.gbb().c=z
a.gbb().e=0
z=this.a.gi()
a.gbb().b=z
z=this.b.gi()
a.gbb().d=z
return a}},
ml:{"^":"a:0;",
$1:function(a){var z=a.gbb().e
if(typeof z!=="number")return z.aj()
a.gbb().e=z+1
return a}},
mm:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.e(a.gi(),z.a)||J.e(a.gi(),z.c)}},
q2:{"^":"fr;a,i:b<,c,V:d<",
a2:function(a){var z=new F.dM(null,null,null,null,null)
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
dM:{"^":"d;a,b,c,d,e",
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
z=new F.q2(y,x,w,v)
if(y==null)H.i(P.m("attacker"))
if(x==null)H.i(P.m("id"))
if(w==null)H.i(P.m("target"))
if(v==null)H.i(P.m("time"))}this.m(z)
return z}}}],["","",,Z,{"^":"",jC:{"^":"ag;J:b<,a1:c<,O:d<,K:e<,a",
gW:function(){return""},
gI:function(){return},
gh:function(){return"AutoLoot"},
P:[function(a,b,c){throw H.c(new P.Y(null))},"$3","gL",6,0,1],
R:[function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j
z=b.as("LootSituation")
y=b.U(100)
if(y.gc2()===!0&&!y.gaH()){a.ac(c,"<subject> kneel<s> next to <object>",y)
a.ac(c,"<subject> help<s> <object> to <object's> feet",y)
y.bo(c,'"I\'ll live," <subject> say<s>.',!0)
b.Y(100,new Z.jP())}x=[]
for(w=z.gbm(),w=w.ga_(w),v=b.a,u=null,t=null;w.u();){s=w.d
r=b.U(a.gi())
q=r.gS() instanceof Z.ak&&s instanceof G.aH
p=J.o(s)
if(!!p.$isaS){o=s.gbJ()
n=s.gbA()
m=s.gaK()?1:0
l=r.gS().gae()
if(typeof l!=="number")return H.x(l)
o=2+o+n+m>l||q}else o=!1
if(o){k=b.U(a.gi())
j=k.a2(new Z.jQ(s,r))
v.a3(0,k)
v.t(0,j)
u=s}else if(!!p.$isbr&&r.gal()==null){k=b.U(a.gi())
j=k.a2(new Z.jR(s))
v.a3(0,k)
v.t(0,j)
t=s}else{k=b.U(a.gi())
j=k.a2(new Z.jS(s))
v.a3(0,k)
v.t(0,j)
x.push(s)}}if(u!=null){a.ac(c,"<subject> pick<s> up <object>",u)
a.ac(c,"<subject> wield<s> <object>",u)}if(t!=null){a.ac(c,"<subject> pick<s> up <object>",t)
a.ac(c,"<subject> wield<s> <object>",t)}this.iD(x,a,z,b,c)
this.iC(x,a,z,b,c)
if(x.length!==0)c.jr("<subject> <also> take<s>",x,null,a)
return H.b(a.gh())+" auto-loots"},"$3","gM",6,0,1],
aa:function(a,b){return"WARNING this shouldn't be user-visible"},
H:function(a,b){return 1},
G:function(a,b){return a.gN()},
iD:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q
z=P.P(new H.K(a,new Z.jJ(),[H.l(a,0)]),!0,L.aS)
for(y=b.gaB(),y=y.ga_(y);y.u();){x=y.d
if(x instanceof L.aS)C.a.t(z,x)}if(z.length===0)return
C.a.ce(z,new Z.jK())
w=c.gd_().aJ(0,new Z.jL(d)).dh(0,new Z.jM())
for(y=J.ai(w.a),v=new H.bT(y,w.b,[H.l(w,0)]),u=d.a;v.u();){t=y.gT()
if(z.length===0)break
s=C.a.hs(z)
r=d.U(t.gi())
q=r.a2(new Z.jN(s))
u.a3(0,r)
u.t(0,q)
C.a.a3(a,s)
r=d.U(b.gi())
q=r.a2(new Z.jO(s))
u.a3(0,r)
u.t(0,q)
b.ac(e,"<subject> give<s> the "+H.b(s.gh())+" to <object>",t)}},
iC:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q
z=P.P(new H.K(a,new Z.jD(),[H.l(a,0)]),!0,E.br)
for(y=b.gaB(),y=y.ga_(y);y.u();){x=y.d
if(x instanceof E.br)C.a.t(z,x)}if(z.length===0)return
C.a.ce(z,new Z.jE())
w=c.gd_().aJ(0,new Z.jF(d)).dh(0,new Z.jG())
for(y=J.ai(w.a),v=new H.bT(y,w.b,[H.l(w,0)]),u=d.a;v.u();){t=y.gT()
if(z.length===0)break
s=C.a.hs(z)
r=d.U(t.gi())
q=r.a2(new Z.jH(s))
u.a3(0,r)
u.t(0,q)
C.a.a3(a,s)
r=d.U(b.gi())
q=r.a2(new Z.jI(s))
u.a3(0,r)
u.t(0,q)
b.ac(e,"<subject> give<s> the "+H.b(s.gh())+" to <object>",t)}}},jP:{"^":"a:0;",
$1:function(a){a.sah(C.h)
a.sag(1)
return a}},jQ:{"^":"a:0;a,b",
$1:function(a){var z=this.b
if(!(z.gS() instanceof K.cc))a.gaB().t(0,z.gS())
a.sS(this.a)}},jR:{"^":"a:0;a",
$1:function(a){var z=this.a
a.sal(z)
return z}},jS:{"^":"a:0;a",
$1:function(a){a.gaB().t(0,this.a)
return a}},jJ:{"^":"a:0;",
$1:function(a){return a instanceof L.aS}},jK:{"^":"a:6;",
$2:function(a,b){return J.bE(a.gae(),b.gae())}},jL:{"^":"a:0;a",
$1:function(a){return this.a.U(a)}},jM:{"^":"a:0;",
$1:function(a){return a.gar()&&a.gaz()}},jN:{"^":"a:0;a",
$1:function(a){a.sS(this.a)
return a}},jO:{"^":"a:0;a",
$1:function(a){a.gaB().a3(0,this.a)
return a}},jD:{"^":"a:0;",
$1:function(a){return a instanceof E.br}},jE:{"^":"a:6;",
$2:function(a,b){return J.bE(a.gae(),b.gae())}},jF:{"^":"a:0;a",
$1:function(a){return this.a.U(a)}},jG:{"^":"a:0;",
$1:function(a){return a.gar()&&a.gal()==null}},jH:{"^":"a:0;a",
$1:function(a){a.sal(this.a)
return a}},jI:{"^":"a:0;a",
$1:function(a){a.gaB().a3(0,this.a)
return a}}}],["","",,X,{"^":"",
mw:function(a,b,c,d){var z=new X.dQ(null,null,null,null,null,null)
new X.tw(a,b,c).$1(z)
return z.q()},
fx:{"^":"ae;",
gbO:function(){return H.p([$.$get$eY()],[Q.ag])},
gh:function(){return"LootSituation"},
ay:function(){var z=new X.dQ(null,null,null,null,null,null)
z.m(this)
new X.my().$1(z)
return z.q()},
aY:function(a,b){if(typeof a!=="number")return a.bj()
if(a>0)return
return this.fu(b.a)},
b5:function(a,b){return[this.fu(a)]},
de:function(a){return!0},
fu:function(a){return a.cl(0,new X.mx())}},
tw:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$a9().aq(1073741823)
a.gaw().e=z
a.gaw().f=0
a.gaw().c=this.b
z=new S.O(null,null,[P.t])
z.ak()
z.m(this.a)
a.gaw().d=z
z=new S.O(null,null,[U.ad])
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
$1:function(a){return a.gN()===!0&&a.gar()}},
q3:{"^":"fx;bm:a<,ca:b<,d_:c<,i:d<,V:e<",
a2:function(a){var z=new X.dQ(null,null,null,null,null,null)
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
dQ:{"^":"d;a,b,c,d,e,f",
gbm:function(){var z,y
z=this.gaw()
y=z.b
if(y==null){y=new S.O(null,null,[U.ad])
y.ak()
y.m(C.d)
z.b=y
z=y}else z=y
return z},
gca:function(){return this.gaw().c},
gd_:function(){var z,y
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
if(x==null){x=new S.O(null,null,[U.ad])
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
b.Y(z.gi(),new A.mN(a))
y=b.U(z.gi())
if(!(!y.gaH()&&y.gi()!==100)){a.bp(c,"<subject> thrust<s> {|"+H.b(U.aa(a))+"} deep into <object's> {shoulder|hip|thigh}",y,!0)
N.b4(c,y)}else{a.bp(c,"<subject> {stab<s>|run<s> "+H.b(U.aa(a))+" through} <object>",y,!0)
N.bj(c,b,y)}return H.b(a.gh())+" stabs "+H.b(z.gh())},"$3","gM",6,0,1],
H:function(a,b){if(a.gN()===!0)return 0.6
return 0.5},
G:function(a,b){return a.ga4()&&this.b.gap()&&a.e.geO()},
v:{
xd:[function(a){return new A.mM("When an opponent is out of balance they are the most vulnerable.",!0,!0,!0,C.c,a,null)},"$1","uX",2,0,4]}},mN:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gag()
y=this.a.gS().gbA()
if(typeof z!=="number")return z.at()
a.sag(z-y)
return a}}}],["","",,U,{"^":"",
mI:function(a,b){var z=new U.dT(null,null,null,null,null)
new U.tJ(a,b).$1(z)
return z.q()},
fD:{"^":"ae;",
gaG:function(){return H.p([A.uX()],[{func:1,ret:Q.z,args:[R.A]}])},
gbO:function(){return[$.$get$dY()]},
gh:function(){return"OffBalanceOpportunitySituation"},
ay:function(){var z=new U.dT(null,null,null,null,null)
z.m(this)
new U.mJ().$1(z)
return z.q()},
aY:function(a,b){var z,y,x,w,v
if(typeof a!=="number")return a.bj()
if(a>0)return
z=b.U(this.a)
y=b.a
x=H.l(y,0)
w=P.P(new H.K(y,new U.mK(this,b,z),[x]),!0,x)
if(w.length===0)return
v=C.a.geJ(w)
if(v.ga4()&&z.gap()&&v.e.geO())return v
return},
b5:function(a,b){return new H.K(a,new U.mL(b,b.U(this.a)),[H.l(a,0)])}},
tJ:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a9().aq(1073741823)
a.gbc().d=z
a.gbc().e=0
z=this.a.gi()
a.gbc().b=z
z=this.b
z=z==null?z:z.gi()
a.gbc().c=z
return a}},
mJ:{"^":"a:0;",
$1:function(a){var z=a.gbc().e
if(typeof z!=="number")return z.aj()
a.gbc().e=z+1
return a}},
mK:{"^":"a:24;a,b,c",
$1:function(a){var z,y
if(a.gar())if(a.eL(this.c,this.b)){z=a.y
y=this.a.b
y=z==null?y!=null:z!==y
z=y}else z=!1
else z=!1
return z}},
mL:{"^":"a:0;a,b",
$1:function(a){var z=this.b
return J.e(a,z)||a.eL(z,this.a)}},
q4:{"^":"fD;a,b,i:c<,V:d<",
a2:function(a){var z=new U.dT(null,null,null,null,null)
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
dT:{"^":"d;a,b,c,d,e",
gi:function(){return this.gbc().d},
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
b.Y(z.y,new O.ly(y))
switch(y){case C.k:throw H.c(new P.w("Enemy's pose should never be 'standing' after a successful punch"))
case C.h:c.fQ(0,"<subject> {punch<es> <object> in the {face|nose|eye|jaw}|punch<es> <object's> {face|nose|eye|jaw}}",x,z,!0,a)
z.aD(c,"<subject> {stagger<s>|stumble<s>} off balance",!0)
break
case C.f:c.fQ(0,"<subject> send<s> <object> to the "+H.b(w)+" with a {massive punch|well-placed fist} to the {face|nose|eye|jaw}",x,z,!0,a)
break}return H.b(a.gh())+" punches "+H.b(z.db)+" to "+y.k(0)},"$3","gM",6,0,1],
H:function(a,b){return 1},
G:function(a,b){return!0},
v:{
x3:[function(a){return new O.lx(null,!0,!0,!1,a,null)},"$1","uf",2,0,4]}},ly:{"^":"a:0;a",
$1:function(a){a.sah(this.a)
return a}}}],["","",,E,{"^":"",kE:{"^":"z;I:c<,J:d<,a1:e<,O:f<,K:r<,b,a",
ga6:function(){return"dodge"},
gh:function(){return"DodgePunch"},
gaf:function(){return"will <subject> dodge the fist?"},
P:[function(a,b,c){var z=b.as("PunchSituation").gi()
a.hu(c,"<subject> tr<ies> to {dodge|sidestep|move out of the way}",z,!0)
S.a7(new E.kF(a,c,z),new E.kG(this,a,c,z),null,null)
b.aC()
return H.b(a.gh())+" fails to dodge "+H.b(this.b.gh())},"$3","gL",6,0,1],
R:[function(a,b,c){var z=this.b
a.bS(c,"<subject> {dodge<s>|sidestep<s>} <object's> {punch|blow|jab}",b.as("PunchSituation").gi(),z,!0)
b.b3("FightSituation")
if(a.gN()===!0)c.t(0,"this opens an opportunity for a counter attack")
C.a.t(b.f,S.c5(a,z))
return H.b(a.gh())+" dodges punch from "+H.b(z.gh())},"$3","gM",6,0,1],
H:function(a,b){var z,y
z=a.ga4()?0:0.2
if(a.ch===!0)return 0.7-z
y=b.f
return(y.length!==0?C.a.gw(y):null).gb4().b2(0.4-z)},
G:function(a,b){return!0},
v:{
wY:[function(a){return new E.kE("Dodging means moving your body out of harm's way.",!1,!1,!0,C.c,a,null)},"$1","u7",2,0,4]}},kF:{"^":"a:2;a,b,c",
$0:function(){return this.a.c5(this.b,"<subject> {can't|fail<s>|<does>n't succeed}",this.c,!0,!0)}},kG:{"^":"a:2;a,b,c,d",
$0:function(){return this.a.b.kV(this.c,"<subject> <is> too quick for <object>",this.d,!0,!0,this.b)}}}],["","",,Z,{"^":"",
e3:function(a,b,c){var z=new Z.e2(null,null,null,null,null,null)
new Z.tD(a,b,c).$1(z)
return z.q()},
fN:{"^":"c7;",
gaG:function(){return[E.u7()]},
gh:function(){return"PunchDefenseSituation"},
ay:function(){var z=new Z.e2(null,null,null,null,null,null)
z.m(this)
new Z.ns().$1(z)
return z.q()}},
tD:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$a9().aq(1073741823)
a.gaO().c=z
a.gaO().f=0
z=this.a.gi()
a.gaO().b=z
z=this.b.gi()
a.gaO().e=z
a.gaO().d=this.c
return a}},
ns:{"^":"a:0;",
$1:function(a){var z=a.gaO().f
if(typeof z!=="number")return z.aj()
a.gaO().f=z+1
return a}},
q7:{"^":"fN;cO:a<,i:b<,cr:c<,cu:d<,V:e<",
a2:function(a){var z=new Z.e2(null,null,null,null,null,null)
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
e2:{"^":"d;a,b,c,d,e,f",
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
z=new Z.q7(y,x,w,v,u)
if(y==null)H.i(P.m("attacker"))
if(x==null)H.i(P.m("id"))
if(w==null)H.i(P.m("predeterminedResult"))
if(v==null)H.i(P.m("target"))
if(u==null)H.i(P.m("time"))}this.m(z)
return z}}}],["","",,Q,{"^":"",
fP:function(a,b){var z=new Q.e4(null,null,null,null,null)
new Q.tE(a,b).$1(z)
return z.q()},
fO:{"^":"ae;",
gaG:function(){return[O.uf()]},
gh:function(){return"PunchSituation"},
ay:function(){var z=new Q.e4(null,null,null,null,null)
z.m(this)
new Q.nt().$1(z)
return z.q()},
aY:function(a,b){if(a===0)return b.U(this.a)
return},
b5:function(a,b){return new H.K(a,new Q.nu(this),[H.l(a,0)])}},
tE:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a9().aq(1073741823)
a.gbd().c=z
a.gbd().e=0
z=this.a.gi()
a.gbd().b=z
z=this.b.gi()
a.gbd().d=z
return a}},
nt:{"^":"a:0;",
$1:function(a){var z=a.gbd().e
if(typeof z!=="number")return z.aj()
a.gbd().e=z+1
return a}},
nu:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.e(a.gi(),z.a)||J.e(a.gi(),z.c)}},
q8:{"^":"fO;a,i:b<,c,V:d<",
a2:function(a){var z=new Q.e4(null,null,null,null,null)
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
e4:{"^":"d;a,b,c,d,e",
gi:function(){return this.gbd().c},
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
b.Y(z.gi(),new O.lC(a))
y=b.U(z.gi())
x=b.as("SlashSituation").gi()
w=!y.gaH()&&y.gi()!==100
if(!w){a.bS(c,"<subject> {slash<es>|cut<s>} <object's> {shoulder|abdomen|thigh}",x,y,!0)
N.b4(c,y)}else{a.bS(c,"<subject> {slash<es>|cut<s>} {across|through} <object's> {neck|abdomen|lower body}",x,y,!0)
if(J.e(a.gS().gh(),$.$get$cA().b)&&J.ds(z.gh(),"orc")===!0)a.e.bo(c,"<subject> slit<s> through the flesh like it isn't there.",!0)
N.bj(c,b,y)}v=H.b(a.gh())+" slashes"
return v+(w?" (and kills)":"")+" "+H.b(z.gh())},"$3","gM",6,0,1],
H:function(a,b){return 1},
G:function(a,b){return a.gS().gaU()},
v:{
x5:[function(a){return new O.lz(null,!0,!0,!0,C.c,a,null)},"$1","ug",2,0,4]}},lC:{"^":"a:0;a",
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
b.Y(z.gi(),new V.lG(a))
y=b.U(z.gi())
x=b.as("SlashSituation").gi()
w=!y.gaH()&&y.gi()!==100
if(!w){a.bS(c,"<subject> {pierce<s>|stab<s>|bore<s> through} <object's> {shoulder|abdomen|thigh}",x,y,!0)
N.b4(c,y)}else{a.bS(c,"<subject> {pierce<s>|stab<s>|bore<s> through|impale<s>} <object's> {neck|chest|heart}",x,y,!0)
N.bj(c,b,y)}v=H.b(a.gh())+" pierces"
return v+(w?" (and kills)":"")+" "+H.b(z.gh())},"$3","gM",6,0,1],
H:function(a,b){return 1},
G:function(a,b){return a.gS() instanceof Z.ak},
v:{
x7:[function(a){return new V.lD(null,!0,!0,!0,C.c,a,null)},"$1","ui",2,0,4]}},lG:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gag()
y=this.a.gS().gbA()
if(typeof z!=="number")return z.at()
a.sag(z-y)
return a}}}],["","",,X,{"^":"",kp:{"^":"z;I:c<,J:d<,a1:e<,O:f<,K:r<,b,a",
ga6:function(){return"step back and parry"},
gh:function(){return"DefensiveParrySlash"},
gaf:function(){return"will <subject> parry it?"},
P:[function(a,b,c){a.ab(c,"<subject> tr<ies> to {parry|deflect it|meet it with "+H.b(U.aa(a))+"|fend it off}")
if(a.gap())a.ai(c,"<subject> <is> out of balance",!0)
else S.a7(new X.kq(a,c),new X.kr(this,a,c),null,null)
b.aC()
return H.b(a.db)+" fails to parry "+H.b(this.b.gh())},"$3","gL",6,0,1],
R:[function(a,b,c){if(a.gN()===!0)a.ab(c,"<subject> {step<s>|take<s> a step} back")
a.bh(c,"<subject> {parr<ies> it|deflect<s> it|meet<s> it with "+H.b(U.aa(a))+"|fend<s> it off}",!0)
if(!a.ga4()){b.Y(a.y,new X.ks())
if(a.ch===!0)a.ab(c,"<subject> regain<s> balance")}b.b3("FightSituation")
return H.b(a.db)+" steps back and parries "+H.b(this.b.gh())},"$3","gM",6,0,1],
H:function(a,b){var z,y,x
if(a.gN()===!0)return 1
z=b.f
y=z.length!==0?C.a.gw(z):null
x=a.ga4()?0:0.2
return y.gb4().b2(0.5-x)},
G:function(a,b){return a.gS().gcj()},
v:{
wV:[function(a){return new X.kp("Stepping back is the safest way to get out of harm's way.",!1,!1,!0,C.c,a,null)},"$1","u4",2,0,4]}},kq:{"^":"a:2;a,b",
$0:function(){return this.a.ai(this.b,"<subject> {fail<s>|<does>n't succeed}",!0)}},kr:{"^":"a:2;a,b,c",
$0:function(){return this.a.b.bR(this.c,"<subject> <is> too quick for <object>",!0,this.b)}},ks:{"^":"a:0;",
$1:function(a){a.sah(C.k)
return a}}}],["","",,F,{"^":"",kH:{"^":"z;I:c<,J:d<,a1:e<,O:f<,K:r<,b,a",
gh:function(){return"DodgeSlash"},
ga6:function(){return"dodge and counter"},
gaf:function(){return"will <subject> dodge?"},
P:[function(a,b,c){a.ab(c,"<subject> tr<ies> to {dodge|sidestep}")
if(a.gap())a.ai(c,"<subject> <is> out of balance",!0)
else S.a7(new F.kI(a,c),new F.kJ(this,a,c),null,null)
b.aC()
return H.b(a.db)+" fails to dodge "+H.b(this.b.gh())},"$3","gL",6,0,1],
R:[function(a,b,c){var z=this.b
a.bp(c,"<subject> {dodge<s>|sidestep<s>} it",z,!0)
if(z.ga4()){z.c4(c,"<subject> lose<s> balance because of that",!0,!0)
b.Y(z.y,new F.kK())}b.b3("FightSituation")
if(a.gN()===!0)c.t(0,"this opens an opportunity for a counter attack")
C.a.t(b.f,S.c5(a,z))
return H.b(a.gh())+" dodges "+H.b(z.db)},"$3","gM",6,0,1],
H:function(a,b){var z,y
z=a.ga4()?0:0.2
if(a.ch===!0)return 0.7-z
y=b.f
return(y.length!==0?C.a.gw(y):null).gb4().b2(0.4-z)},
G:function(a,b){return!a.ga0()&&this.b.gS().gaU()},
v:{
wZ:[function(a){return new F.kH("Dodging means moving your body out of harm's way. When done correctly, it will throw your opponent off balance and it will open an opportunity for a counter attack. When botched, it can get you killed.",!1,!1,!0,C.c,a,null)},"$1","u8",2,0,4]}},kI:{"^":"a:2;a,b",
$0:function(){return this.a.ai(this.b,"<subject> {can't|fail<s>|<does>n't succeed}",!0)}},kJ:{"^":"a:2;a,b,c",
$0:function(){return this.a.b.bR(this.c,"<subject> <is> too quick for <object>",!0,this.b)}},kK:{"^":"a:0;",
$1:function(a){a.sah(C.h)
return C.h}}}],["","",,M,{"^":"",kL:{"^":"z;I:c<,J:d<,a1:e<,O:f<,K:r<,b,a",
ga6:function(){return"dodge and counter"},
gh:function(){return"DodgeThrustSpear"},
gaf:function(){return"will <subject> dodge?"},
P:[function(a,b,c){a.ab(c,"<subject> tr<ies> to {dodge|sidestep}")
if(a.gap())a.ai(c,"<subject> <is> out of balance",!0)
else S.a7(new M.kM(a,c),new M.kN(this,a,c),null,null)
b.aC()
return H.b(a.db)+" fails to dodge "+H.b(this.b.gh())+"'s spear"},"$3","gL",6,0,1],
R:[function(a,b,c){var z=this.b
a.bp(c,"<subject> {dodge<s>|sidestep<s>} it",z,!0)
if(z.ga4()){z.c4(c,"<subject> lose<s> balance because of that",!0,!0)
b.Y(z.y,new M.kO())}b.b3("FightSituation")
if(a.gN()===!0)c.t(0,"this opens an opportunity for a counter attack")
C.a.t(b.f,S.c5(a,z))
return H.b(a.gh())+" dodges "+H.b(z.db)+"'s spear"},"$3","gM",6,0,1],
H:function(a,b){var z,y
z=a.ga4()?0:0.2
if(a.ch===!0)return 0.7-z
y=b.f
return(y.length!==0?C.a.gw(y):null).gb4().b2(0.4-z)},
G:function(a,b){return!a.ga0()&&this.b.gS() instanceof Z.ak},
v:{
x_:[function(a){return new M.kL("Dodging means moving your body out of harm's way. When done correctly, it will throw your opponent off balance and it will open an opportunity for a counter attack. When botched, it can get you killed.",!1,!1,!0,C.c,a,null)},"$1","u9",2,0,4]}},kM:{"^":"a:2;a,b",
$0:function(){return this.a.ai(this.b,"<subject> {can't|fail<s>|<does>n't succeed}",!0)}},kN:{"^":"a:2;a,b,c",
$0:function(){return this.a.b.bR(this.c,"<subject> <is> too quick for <object>",!0,this.b)}},kO:{"^":"a:0;",
$1:function(a){a.sah(C.h)
return C.h}}}],["","",,O,{"^":"",mc:{"^":"z;I:c<,J:d<,a1:e<,O:f<,K:r<,b,a",
ga6:function(){return"jump back"},
gh:function(){return"JumpBackFromSlash"},
gaf:function(){return"will <subject> avoid the slash?"},
P:[function(a,b,c){a.bo(c,"<subject> {jump<s>|leap<s>} {back|backward} but <subject> <is> {not fast enough|too slow}.",!0)
b.aC()
return H.b(a.gh())+" fails to jump back from "+H.b(this.b.gh())},"$3","gL",6,0,1],
R:[function(a,b,c){var z
a.bh(c,"<subject> {leap<s>|jump<s>} {back|backwards|out of reach}",!0)
z=this.b
c.bX(0,"<owner's> <subject> {slash<es>|cut<s>} empty air",z,z.gS())
b.b3("FightSituation")
return H.b(a.gh())+" jumps back from "+H.b(z.gh())+"'s attack"},"$3","gM",6,0,1],
H:function(a,b){var z,y,x
if(a.gN()===!0)return 1
z=b.f
y=z.length!==0?C.a.gw(z):null
x=a.ga4()?0:0.2
return y.gb4().b2(0.5-x)},
G:function(a,b){return a.gaz()&&this.b.gS().gaU()},
v:{
xb:[function(a){return new O.mc("Jump back and the weapon can't reach you.",!1,!1,!0,C.c,a,null)},"$1","uR",2,0,4]}}}],["","",,G,{"^":"",mZ:{"^":"z;I:c<,J:d<,a1:e<,O:f<,K:r<,b,a",
gh:function(){return"ParrySlash"},
ga6:function(){return"parry and counter"},
gaf:function(){return"will <subject> parry?"},
P:[function(a,b,c){a.ab(c,"<subject> tr<ies> to {parry|deflect it|meet it with "+H.b(U.aa(a))+"|fend it off}")
if(a.gap())a.ai(c,"<subject> <is> out of balance",!0)
else S.a7(new G.n_(a,c),new G.n0(this,a,c),null,null)
b.aC()
return H.b(a.db)+" fails to parry "+H.b(this.b.gh())},"$3","gL",6,0,1],
R:[function(a,b,c){var z=this.b
if(z.gap()){c.ez(0,"<subject> <is> out of balance",!0,!0,z)
c.bX(0,"so <ownerPronoun's> <subject> is {weak|feeble}",z,$.$get$iM())
a.bh(c,"<subject> {parr<ies> it easily|easily meet<s> it with "+H.b(U.aa(a))+"|fend<s> it off easily}",!0)}else a.bh(c,"<subject> {parr<ies> it|meet<s> it with "+H.b(U.aa(a))+"|fend<s> it off}",!0)
b.b3("FightSituation")
if(a.gN()===!0)c.t(0,"this opens an opportunity for a counter attack")
C.a.t(b.f,S.c5(a,z))
return H.b(a.gh())+" parries "+H.b(z.db)},"$3","gM",6,0,1],
H:function(a,b){var z,y,x
z=a.ga4()?0:0.2
y=this.b.gap()?0.3:0
if(a.ch===!0)return 0.6-z+y
x=b.f
return(x.length!==0?C.a.gw(x):null).gb4().b2(0.3-z+y)},
G:function(a,b){return a.gS().gcj()},
v:{
xg:[function(a){return new G.mZ("Parrying means deflecting your opponent's move with your weapon. When successful, it will give you an opportunity for a counter attack. It won't throw your opponent off balance like dodging does, but it's also slightly easier to do.",!1,!1,!0,C.c,a,null)},"$1","v_",2,0,4]}},n_:{"^":"a:2;a,b",
$0:function(){return this.a.ai(this.b,"<subject> {fail<s>|<does>n't succeed}",!0)}},n0:{"^":"a:2;a,b,c",
$0:function(){return this.a.b.bR(this.c,"<subject> <is> too quick for <object>",!0,this.b)}}}],["","",,E,{"^":"",ol:{"^":"z;I:c<,J:d<,a1:e<,O:f<,K:r<,b,a",
ga6:function(){return"block with shield and counter"},
gh:function(){return"ShieldBlockSlash"},
gaf:function(){return"will <subject> block the slash?"},
P:[function(a,b,c){a.ab(c,"<subject> tr<ies> to {block|stop|deflect} the {swing|attack|strike} with "+H.b(U.c0(a)))
if(a.gap())a.ai(c,"<subject> <is> out of balance",!0)
else S.a7(new E.om(a,c),new E.on(a,c),new E.oo(this,a,c),null)
b.aC()
return H.b(a.db)+" fails to block "+H.b(this.b.gh())+" with shield"},"$3","gL",6,0,1],
R:[function(a,b,c){var z=this.b
if(z.gap()){c.ez(0,"<subject> <is> out of balance",!0,!0,z)
c.bX(0,"so <ownerPronoun's> <subject> is {weak|feeble}",z,$.$get$iL())
a.bh(c,"<subject> easily {block|stop|deflect} the {swing|attack|strike} with "+H.b(U.c0(a)),!0)}else a.bh(c,"<subject> {block|stop|deflect} the {swing|attack|strike} with "+H.b(U.c0(a)),!0)
b.b3("FightSituation")
if(a.gN()===!0)c.t(0,"this opens an opportunity for a counter attack")
C.a.t(b.f,S.c5(a,z))
return H.b(a.gh())+" blocks "+H.b(z.db)+" with a shield"},"$3","gM",6,0,1],
H:function(a,b){var z,y,x
z=a.ga4()?0:0.2
y=this.b.gap()?0.2:0
if(a.ch===!0)return 0.8-z+y
x=b.f
return(x.length!==0?C.a.gw(x):null).gb4().b2(0.5-z+y)},
G:function(a,b){return a.gal()!=null},
v:{
xn:[function(a){return new E.ol("A shield blocks enemy attacks with the least amount of energy and movement. It is easy and quick to launch a counter-attack when the enemy's weapon is stopped in this way.",!1,!1,!0,C.c,a,null)},"$1","vh",2,0,4]}},om:{"^":"a:2;a,b",
$0:function(){return this.a.ai(this.b,"<subject> {fail<s>|<does>n't succeed}",!0)}},on:{"^":"a:2;a,b",
$0:function(){return this.a.ai(this.b,"<subject> <is> too slow",!0)}},oo:{"^":"a:2;a,b,c",
$0:function(){return this.a.b.bR(this.c,"<subject> <is> too quick for <object>",!0,this.b)}}}],["","",,L,{"^":"",
aQ:function(a,b,c){var z=new L.e9(null,null,null,null,null,null)
new L.tz(a,b,c).$1(z)
return z.q()},
h0:{"^":"c7;",
gaG:function(){return[X.u4(),F.u8(),M.u9(),O.uR(),G.v_(),E.vh()]},
gh:function(){return"SlashDefenseSituation"},
ay:function(){var z=new L.e9(null,null,null,null,null,null)
z.m(this)
new L.os().$1(z)
return z.q()}},
tz:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$a9().aq(1073741823)
a.gaP().c=z
a.gaP().f=0
z=this.a.gi()
a.gaP().b=z
z=this.b.gi()
a.gaP().e=z
a.gaP().d=this.c
return a}},
os:{"^":"a:0;",
$1:function(a){var z=a.gaP().f
if(typeof z!=="number")return z.aj()
a.gaP().f=z+1
return a}},
qa:{"^":"h0;cO:a<,i:b<,cr:c<,cu:d<,V:e<",
a2:function(a){var z=new L.e9(null,null,null,null,null,null)
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
e9:{"^":"d;a,b,c,d,e,f",
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
z=new L.qa(y,x,w,v,u)
if(y==null)H.i(P.m("attacker"))
if(x==null)H.i(P.m("id"))
if(w==null)H.i(P.m("predeterminedResult"))
if(v==null)H.i(P.m("target"))
if(u==null)H.i(P.m("time"))}this.m(z)
return z}}}],["","",,M,{"^":"",
bc:function(a,b){var z=new M.ea(null,null,null,null,null)
new M.tC(a,b).$1(z)
return z.q()},
h1:{"^":"ae;",
gaG:function(){return[O.ug(),V.ui()]},
gh:function(){return"SlashSituation"},
ay:function(){var z=new M.ea(null,null,null,null,null)
z.m(this)
new M.ot().$1(z)
return z.q()},
aY:function(a,b){if(a===0)return b.U(this.a)
return},
b5:function(a,b){return new H.K(a,new M.ou(this),[H.l(a,0)])}},
tC:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a9().aq(1073741823)
a.gbe().c=z
a.gbe().e=0
z=this.a.gi()
a.gbe().b=z
z=this.b.gi()
a.gbe().d=z
return a}},
ot:{"^":"a:0;",
$1:function(a){var z=a.gbe().e
if(typeof z!=="number")return z.aj()
a.gbe().e=z+1
return a}},
ou:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.e(a.gi(),z.a)||J.e(a.gi(),z.c)}},
qb:{"^":"h1;a,i:b<,c,V:d<",
a2:function(a){var z=new M.ea(null,null,null,null,null)
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
ea:{"^":"d;a,b,c,d,e",
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
b.Y(z.gi(),new Q.lB())
y=b.U(z.gi())
x=J.e(y.gi(),100)
c.ey(0,"<subject> {cut<s>|slash<es>|slit<s>} <object's> "+(x?"side":"{throat|neck|side}"),y,a.gS())
if(x)N.b4(c,y)
else N.bj(c,b,y)
return H.b(a.gh())+" slains "+H.b(z.gh())+" on the ground"},"$3","gM",6,0,1],
H:function(a,b){return 1},
G:function(a,b){return this.b.ga0()&&a.gS().gaU()},
v:{
x4:[function(a){return new Q.lA(null,!0,!0,!0,C.c,a,null)},"$1","uh",2,0,4]}},lB:{"^":"a:0;",
$1:function(a){a.sag(0)
return a}}}],["","",,V,{"^":"",lE:{"^":"z;I:c<,J:d<,a1:e<,O:f<,K:r<,b,a",
ga6:function(){return""},
gh:function(){return"FinishThrustSpearAtGroundedEnemy"},
gaf:function(){return"(WARNING should not be user-visible)"},
P:[function(a,b,c){throw H.c(new P.Y(null))},"$3","gL",6,0,1],
R:[function(a,b,c){var z,y,x
z=this.b
b.Y(z.gi(),new V.lF())
y=b.U(z.gi())
x=J.e(y.gi(),100)
c.ey(0,"<subject> {impale<s>|bore<s> through|pierce<s>} <object's> "+(x?"side":"{throat|neck|heart}"),y,a.gS())
if(x)N.b4(c,y)
else N.bj(c,b,y)
return H.b(a.gh())+" slains "+H.b(z.gh())+" on the ground with a spear"},"$3","gM",6,0,1],
H:function(a,b){return 1},
G:function(a,b){return this.b.ga0()&&a.gS() instanceof Z.ak},
v:{
x6:[function(a){return new V.lE(null,!0,!0,!0,C.c,a,null)},"$1","uj",2,0,4]}},lF:{"^":"a:0;",
$1:function(a){a.sag(0)
return a}}}],["","",,K,{"^":"",mP:{"^":"z;J:c<,a1:d<,O:e<,K:f<,I:r<,b,a",
gh:function(){return"OnGroundParry"},
ga6:function(){return"parry it"},
gaf:function(){return"will <subject> parry it?"},
P:[function(a,b,c){a.ab(c,"<subject> tr<ies> to {parry|deflect it|stop it{| with "+H.b(U.aa(a))+"}}")
S.a7(new K.mQ(a,c),new K.mR(this,a,c),null,null)
b.aC()
return H.b(a.gh())+" fails to parry "+H.b(this.b.gh())},"$3","gL",6,0,1],
R:[function(a,b,c){a.bh(c,"<subject> {parr<ies> it|stop<s> it with "+H.b(U.aa(a))+"}",!0)
b.b3("FightSituation")
return H.b(a.gh())+" parries "+H.b(this.b.gh())},"$3","gM",6,0,1],
H:function(a,b){var z
if(a.gN()===!0)return 0.6
z=b.f
return(z.length!==0?C.a.gw(z):null).gb4().b2(0.3)},
G:function(a,b){return this.b.gS().gaU()&&a.gS().gcj()},
v:{
xe:[function(a){return new K.mP(!1,!1,!0,C.c,"TODO",a,null)},"$1","uY",2,0,4]}},mQ:{"^":"a:2;a,b",
$0:function(){return this.a.ai(this.b,"<subject> {fail<s>|<does>n't succeed}",!0)}},mR:{"^":"a:2;a,b,c",
$0:function(){return this.a.b.bR(this.c,"<subject> <is> too quick for <object>",!0,this.b)}}}],["","",,L,{"^":"",mS:{"^":"z;I:c<,J:d<,a1:e<,O:f<,K:r<,b,a",
ga6:function(){return"block with shield"},
gh:function(){return"OnGroundShieldBlock"},
gaf:function(){return"will <subject> block the strike?"},
P:[function(a,b,c){a.ab(c,"<subject> tr<ies> to {block|stop|deflect} the {swing|attack|strike} with "+H.b(U.c0(a)))
S.a7(new L.mT(a,c),new L.mU(a,c),new L.mV(this,a,c),null)
b.aC()
return H.b(a.gh())+" fails to block "+H.b(this.b.gh())+" with shield on ground"},"$3","gL",6,0,1],
R:[function(a,b,c){var z=this.b
if(z.gap()){c.ez(0,"<subject> <is> out of balance",!0,!0,z)
c.bX(0,"so <ownerPronoun's> <subject> is {weak|feeble}",z,$.$get$iK())
a.bh(c,"<subject> easily {block|stop|deflect} the {swing|attack|strike} with "+H.b(U.c0(a)),!0)}else a.bh(c,"<subject> {block|stop|deflect} the {swing|attack|strike} with "+H.b(U.c0(a)),!0)
b.b3("FightSituation")
return H.b(a.gh())+" blocks "+H.b(z.db)+" with a shield on ground"},"$3","gM",6,0,1],
H:function(a,b){var z
if(a.gN()===!0)return 0.8
z=b.f
return(z.length!==0?C.a.gw(z):null).gb4().b2(0.5)},
G:function(a,b){return a.gal()!=null},
v:{
xf:[function(a){return new L.mS("A shield blocks enemy attacks with the least amount of energy and movement.",!1,!1,!0,C.c,a,null)},"$1","uZ",2,0,4]}},mT:{"^":"a:2;a,b",
$0:function(){return this.a.ai(this.b,"<subject> {fail<s>|<does>n't succeed}",!0)}},mU:{"^":"a:2;a,b",
$0:function(){return this.a.ai(this.b,"<subject> <is> too slow",!0)}},mV:{"^":"a:2;a,b,c",
$0:function(){return this.a.b.bR(this.c,"<subject> <is> too quick for <object>",!0,this.b)}}}],["","",,Y,{"^":"",nG:{"^":"z;I:c<,J:d<,a1:e<,O:f<,K:r<,b,a",
gh:function(){return"RollOutOfWay"},
ga6:function(){return"roll out of way"},
gaf:function(){return"will <subject> evade?"},
P:[function(a,b,c){a.ab(c,"<subject> tr<ies> to roll out of the way")
a.ai(c,"<subject> can't",!0)
b.aC()
return H.b(a.gh())+" fails to roll out of the way"},"$3","gL",6,0,1],
R:[function(a,b,c){a.eV(c,"<subject> <is> able to roll out of the way",!0,!0)
if(a.gN()===!0){b.Y(a.gi(),new Y.nH())
a.bh(c,"<subject> jump<s> up on <subject's> feet",!0)}b.b3("FightSituation")
return H.b(a.gh())+" rolls out of the way of "+H.b(this.b.gh())+"'s strike"},"$3","gM",6,0,1],
H:function(a,b){var z
if(a.gN()===!0)return 1
z=b.f
return(z.length!==0?C.a.gw(z):null).gb4().b2(0.5)},
G:function(a,b){return!0},
v:{
xm:[function(a){return new Y.nG(null,!1,!1,!0,C.c,a,null)},"$1","va",2,0,4]}},nH:{"^":"a:0;",
$1:function(a){a.sah(C.k)
return a}}}],["","",,V,{"^":"",
bJ:function(a,b,c){var z=new V.dU(null,null,null,null,null,null)
new V.tx(a,b,c).$1(z)
return z.q()},
fE:{"^":"c7;",
gaG:function(){return[K.uY(),L.uZ(),Y.va()]},
gh:function(){return"OnGroundDefenseSituation"},
ay:function(){var z=new V.dU(null,null,null,null,null,null)
z.m(this)
new V.mO().$1(z)
return z.q()}},
tx:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$a9().aq(1073741823)
a.gaN().c=z
a.gaN().f=0
z=this.a.gi()
a.gaN().b=z
z=this.b.gi()
a.gaN().e=z
a.gaN().d=this.c
return a}},
mO:{"^":"a:0;",
$1:function(a){var z=a.gaN().f
if(typeof z!=="number")return z.aj()
a.gaN().f=z+1
return a}},
q5:{"^":"fE;cO:a<,i:b<,cr:c<,cu:d<,V:e<",
a2:function(a){var z=new V.dU(null,null,null,null,null,null)
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
dU:{"^":"d;a,b,c,d,e,f",
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
z=new V.q5(y,x,w,v,u)
if(y==null)H.i(P.m("attacker"))
if(x==null)H.i(P.m("id"))
if(w==null)H.i(P.m("predeterminedResult"))
if(v==null)H.i(P.m("target"))
if(u==null)H.i(P.m("time"))}this.m(z)
return z}}}],["","",,D,{"^":"",
d6:function(a,b){var z=new D.eb(null,null,null,null,null)
new D.ty(a,b).$1(z)
return z.q()},
hc:{"^":"ae;",
gaG:function(){return[Q.uh(),V.uj()]},
gh:function(){return"StrikeDownSituation"},
ay:function(){var z=new D.eb(null,null,null,null,null)
z.m(this)
new D.pc().$1(z)
return z.q()},
aY:function(a,b){if(a===0)return b.U(this.a)
return},
b5:function(a,b){return new H.K(a,new D.pd(this),[H.l(a,0)])}},
ty:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a9().aq(1073741823)
a.gbf().c=z
a.gbf().e=0
z=this.a.gi()
a.gbf().b=z
z=this.b.gi()
a.gbf().d=z
return a}},
pc:{"^":"a:0;",
$1:function(a){var z=a.gbf().e
if(typeof z!=="number")return z.aj()
a.gbf().e=z+1
return a}},
pd:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.e(a.gi(),z.a)||J.e(a.gi(),z.c)}},
qc:{"^":"hc;a,i:b<,c,V:d<",
a2:function(a){var z=new D.eb(null,null,null,null,null)
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
z=new D.qc(y,x,w,v)
if(y==null)H.i(P.m("attacker"))
if(x==null)H.i(P.m("id"))
if(w==null)H.i(P.m("targetOnGround"))
if(v==null)H.i(P.m("time"))}this.m(z)
return z}}}],["","",,O,{"^":"",ni:{"^":"d;",
gb4:function(){switch(this.gcr()){case C.l:return C.a4
case C.m:return $.$get$fI()
case C.p:return $.$get$fJ()
default:throw H.c(P.G(this.gcr()))}},
$isae:1}}],["","",,K,{"^":"",e0:{"^":"d;a,b",
k:function(a){return this.b}}}],["","",,D,{"^":"",ox:{"^":"ag;J:b<,O:c<,a1:d<,K:e<,a",
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
aa:function(a,b){return"WARNING should not be user-visible"},
H:function(a,b){return 1},
G:function(a,b){var z=b.f
return H.F(z.length!==0?C.a.gw(z):null,"$isJ").c}},oy:{"^":"a:0;a,b",
$1:function(a){var z,y
if(a.gar())if(a.gaW().he(this.a.gaW())){z=a.gbF()
y=this.b.gh()
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1
return z}}}],["","",,Y,{"^":"",pn:{"^":"c9;J:c<,a1:d<,O:e<,K:f<,b,a",
gI:function(){return},
gh:function(){return"TakeExitAction"},
P:[function(a,b,c){throw H.c(new P.Y(null))},"$3","gL",6,0,1],
R:[function(a,b,c){var z,y
z=this.b
c.t(0,z.gaS())
y=b.f
H.F(y.length!==0?C.a.gw(y):null,"$isJ").dH(b,a,z.gh0(),c)
return H.b(a.gh())+" went through exit to "+z.a},"$3","gM",6,0,1],
aa:function(a,b){return"WARNING should not be user-visible"},
H:function(a,b){return 1},
G:function(a,b){var z=b.f
if(H.F(z.length!==0?C.a.gw(z):null,"$isJ").c===!0)return!1
this.b.gkl()
return!0},
v:{
xr:[function(a){return new Y.pn(!1,!0,!1,null,a,null)},"$1","wJ",2,0,50]}}}],["","",,F,{"^":"",
fT:function(a,b){var z=new F.e7(null,null,null,null,null)
new F.tn(a,b).$1(z)
return z.q()},
J:{"^":"ae;",
gaG:function(){return[Y.wJ()]},
gbO:function(){var z=[]
C.a.ax(z,$.$get$i2())
z.push($.$get$h4())
return z},
gdG:function(){return 1000},
gh:function(){return"RoomRoamingSituation"},
ay:function(){var z=new F.e7(null,null,null,null,null)
z.m(this)
new F.nI().$1(z)
return z.q()},
aY:function(a,b){return b.a.aT(0,new F.nJ(),new F.nK())},
b5:function(a,b){var z=this.aY(null,b)
if(z==null)return[]
return[z]},
dH:function(a,b,c,d){var z,y,x,w,v,u,t
z=a.dY(c)
a.c3(this.b,F.fT(z,!a.hN("TakeExitAction",b,!0).bt(0,new F.nL(c))&&z.gjT()!=null))
if(this.io(a,b,z))z.i_(b,a,d)
else{d.p(0,"\n\n",!0)
z.jI(b,a,d)
d.p(0,"\n\n",!0)}for(y=R.io(b,a),y=P.P(y,!0,H.y(y,"B",0)),x=y.length,w=a.a,v=0;v<y.length;y.length===x||(0,H.at)(y),++v){u=a.U(y[v].gi())
t=u.a2(new F.nM(z))
w.a3(0,u)
w.t(0,t)}},
hk:function(a,b){a.a.iH(new F.nN(),!0)},
de:function(a){if(J.e(this.a,$.$get$ez().b))return!1
return!0},
io:function(a,b,c){var z,y
for(z=a.d,z=new P.db(z,z.c,z.d,z.b,null,[H.l(z,0)]);z.u();){y=z.e
if(!J.e(y.gcs(),b.gi()))continue
if(y.gdu()!=="TakeExitAction")continue
if(J.ds(y.gaS(),c.gh())===!0)return!0}return!1}},
tn:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a9().aq(1073741823)
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
$1:function(a){return a.gN()===!0&&a.gar()}},
nK:{"^":"a:2;",
$0:function(){return}},
nL:{"^":"a:0;a",
$1:function(a){return a.geG()===this.a}},
nM:{"^":"a:0;a",
$1:function(a){a.sbF(this.a.b)
return a}},
nN:{"^":"a:0;",
$1:function(a){return!a.gaH()}},
q9:{"^":"J;bF:a<,i:b<,c,V:d<",
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
gB:function(a){return Y.U(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
k:function(a){return"RoomRoamingSituation {currentRoomName="+H.b(J.h(this.a))+",\nid="+J.h(this.b)+",\nmonstersAlive="+J.h(this.c)+",\ntime="+J.h(this.d)+",\n}"}},
e7:{"^":"d;a,b,c,d,e",
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
xG:[function(a,b,c){var z,y
z=R.b6(6666,"Agruth",null,null,null,null,null,0,2,100,!1,2,!0,C.t,0,$.$get$bA())
y=z.y
a.gdv().t(0,z)
return U.cb(c,[z],"{rock|cavern} floor",b,P.a0([1,new O.ul(y),5,new O.um(y),9,new O.un(y),12,new O.uo(y),17,new O.up(y)]))},"$3","wO",6,0,12],
xH:[function(a,b,c){var z,y,x,w,v
z=O.hU(2)
y=O.et(!1)
x=new O.uv(z.y)
w=new O.uu(y.y)
v=[z,y]
a.gdv().ax(0,v)
return U.cb(c,v,"{rock|cavern} floor",b,P.a0([1,new O.us(x,w,new O.ur()),4,new O.ut(x,w)]))},"$3","wP",6,0,12],
xI:[function(a,b,c){var z,y,x
z=a.ao("talk_to_briana_3")?"guardian":"orc"
y=R.b6(6667,z,null,null,null,new G.aH("rusty sword",1,1,!1,!0,!1,P.aE(C.o,null)),null,0,3,100,!1,3,!1,C.t,0,$.$get$bA())
x=y.y
a.a.t(0,y)
return U.cb(c,[y],"{rock|cavern} floor",b,P.a0([1,new O.uw(x),9,new O.ux(x)]))},"$3","wQ",6,0,12],
xJ:[function(a,b,c){var z,y,x,w,v
z=O.hU(2)
y=O.et(!0)
x=new O.uC(z.y)
w=new O.uB(y.y)
v=[z,y]
a.gdv().ax(0,v)
return U.cb(c,v,"{rough|stone} floor",b,P.a0([1,new O.uz(x,w,new O.uy()),3,new O.uA(x,w)]))},"$3","wR",6,0,12],
an:function(a){return a.gdv().bC(0,new O.uE())},
uG:function(a){return a.Y(O.an(a).gi(),new O.uH())},
ir:function(a,b){a.Y(O.an(a).gi(),new O.uI(b))},
eE:function(a){var z=a.f
if(H.F(z.length!==0?C.a.gw(z):null,"$isJ").c===!0)return!1
return C.a.a7(C.a_,H.F(z.length!==0?C.a.gw(z):null,"$isJ").a)},
bi:function(a,b){var z,y,x
z=O.an(a)
for(y=a.d,y=new P.db(y,y.c,y.d,y.b,null,[H.l(y,0)]);y.u();){x=y.e
if(!J.e(x.gcs(),z.gi()))continue
if(x.gdu()!=="TakeExitAction")continue
if(x.geG()===b)return!0
return!1}return!1},
ix:function(a,b){var z,y,x,w,v,u,t,s,r
for(z=a.a,y=z.ga_(z),x=new H.bT(y,new O.uU(),[H.l(z,0)]);x.u();){w=y.gT()
if(!w.gaz()){v=H.F(w.e,"$isaH")
y=b
x=v.c
u=v.d
v.r
t=P.P(C.o,!1,null)
t.fixed$length=Array
t.immutable$list=Array
s=a.U(w.y)
r=s.a2(new O.uV(new G.aH(y,x,u,!0,!0,!1,t)))
z.a3(0,s)
z.t(0,r)
break}}},
v6:function(a){var z=O.an(a).gaB().cl(0,new O.v7())
a.Y(O.an(a).gi(),new O.v8(z))},
cB:function(a,b){var z,y,x
z=H.F(a.c,"$iscQ").b
if(z>=5)return
b.p(0,C.a2[z],!0)
y=H.F(a.c,"$iscQ")
y.toString
x=new M.ee(null,!1,0,0)
x.m(y)
a.c=new O.v9().$1(x).q()},
eG:function(a,b,c,d){var z,y
b.Y(a.gi(),new O.ve())
if(!d){z=b.a
y=O.et(!1)
z.t(0,y)
C.a.t(b.f,U.cb(new H.K(z,new O.vf(),[H.l(z,0)]),[y],"{smooth|} rock",b.as("RoomRoamingSituation"),P.a0([1,new O.vg(y.y)])))}},
wF:function(a,b){a.Y(b.gi(),new O.wG(b))},
et:function(a){var z,y
z=$.$get$ew().a++
y=a?new Z.ak("spear",0,1,!1,!1,!1,P.aE(C.D,null)):new G.aH("scimitar",1,1,!1,!0,!1,P.aE(C.o,null))
return R.b6(z,"goblin",O.dk(),null,null,y,null,0,1,0,!1,1,!1,C.t,0,$.$get$bA())},
hU:function(a){return R.b6($.$get$ew().a++,"orc",O.dk(),null,null,new G.aH("sword",1,1,!1,!0,!1,P.aE(C.o,null)),null,0,a,0,!1,a,!1,C.t,0,$.$get$bA())},
ul:{"^":"a:6;a",
$2:function(a,b){var z,y,x
z=this.a
y=a.U(z)
x=new G.aH("sword",1,1,!1,!0,!1,P.aE(C.o,null))
y.ab(b,"<subject> {drop<s>|let<s> go of} the whip")
y.ac(b,"<subject> draw<s> <subject's> <object>",x)
a.Y(z,new O.uk(x))
y.dM(b,'"You\'re dead, slave," <subject> growl<s> at <object> with hatred.',O.an(a),!0)}},
uk:{"^":"a:0;a",
$1:function(a){a.sS(this.a)
return a}},
um:{"^":"a:6;a",
$2:function(a,b){a.U(this.a).ab(b,"<subject> spit<s> on the cavern floor")}},
un:{"^":"a:6;a",
$2:function(a,b){var z=a.U(this.a)
b.fS()
z.bo(b,'"I\'ll enjoy eating your flesh, human," <subject> snarl<s>.',!0)
b.p(0,"\n\n",!0)}},
uo:{"^":"a:6;a",
$2:function(a,b){var z=a.U(this.a)
z.ab(b,"<subject> grit<s> <subject's> teeth")
z.ai(b,"<subject> do<es>n't talk any more",!0)}},
up:{"^":"a:6;a",
$2:function(a,b){a.U(this.a).ab(b,"<subject> scowl<s> with pure hatred")}},
uv:{"^":"a:10;a",
$1:function(a){return a.U(this.a)}},
uu:{"^":"a:10;a",
$1:function(a){return a.U(this.a)}},
ur:{"^":"a:25;",
$2:function(a,b){return a.gar()&&b.gar()}},
us:{"^":"a:6;a,b,c",
$2:function(a,b){var z,y,x,w,v
z=this.a.$1(a)
y=this.b.$1(a)
x=O.an(a)
if(this.c.$2(z,y)===!0){w=z.dE(a)?y:z
v=J.e(w,z)?y:z
w.bo(b,'"Look, Sgarr," <subject> say<s>. "Look at them. Give a puny slave some steel and suddenly they think they\'re mighty slayers."',!0)
v.ab(b,"<subject> laugh<s>")
if(J.e(x.gS().gh(),$.$get$cA().b)){v.ai(b,"<subject> stop<s> almost instantly",!0)
v.dM(b,"<subject> see<s> <object> in your hand.",x.gS(),!0)}}else{w=z.gar()?z:y
w.bo(b,'"Look at you," <subject> laugh<s>. "Give a puny slave some steel and suddenly you think you\'re mighty slayers."',!0)
if(J.e(x.gS().gh(),$.$get$cA().b))w.kT(b,"But then <subject> see<s> <object> in your hand and his face hardens.",!0,x.gS(),!0)}}},
ut:{"^":"a:6;a,b",
$2:function(a,b){var z,y,x,w,v,u,t,s,r,q,p
z=this.a.$1(a)
y=this.b.$1(a)
x=z.gar()?z:y
w=O.an(a)
if(!x.gaz())v=w.gaz()&&w.d==null
else v=!0
u=v?"kicking":"slashing"
t=v?["Whoosh!","Swah!","Slam!"]:["Swish!","Whoosh!","Thunk!"]
x.bh(b,"<subject> start<s> wildly "+u+" in your direction",!0)
s=J.aA(b)
s.p(b,'"Insignificant..." '+t[0]+' "... little ..." '+t[1]+' "... vermin!" '+t[2],!0)
if(v)r="chest"
else r=w.gal()!=null?"shield":w.gS().gh()
q="That last blow hits your "+H.b(r)+" hard"
s.p(b,q+(w.ga0()?"":" and sends you a couple of steps back")+".",!0)
q=H.p([],[P.q])
p=$.$get$aM()
s.bX(b,"<owner's> <subject> glint<s> with intensity",x,new Y.aD(!1,"eyes",q,p,!1,C.E))}},
uw:{"^":"a:6;a",
$2:function(a,b){a.U(this.a).dM(b,'"Good good good," <subject> whisper<s>, eyeing <object>.',O.an(a),!0)}},
ux:{"^":"a:6;a",
$2:function(a,b){var z=a.U(this.a)
b.fS()
z.bo(b,'"Pain is good," <subject> chuckle<s>.',!0)
b.p(0,"\n\n",!0)}},
uC:{"^":"a:10;a",
$1:function(a){return a.U(this.a)}},
uB:{"^":"a:10;a",
$1:function(a){return a.U(this.a)}},
uy:{"^":"a:25;",
$2:function(a,b){return a.gar()&&b.gaH()&&b.gc2()===!0}},
uz:{"^":"a:6;a,b,c",
$2:function(a,b){var z,y
z=this.a.$1(a)
y=this.b.$1(a)
if(!y.gaH()){z.ac(b,"<subject> look<s> at <object's> body",y)
z.bo(b,'"You\'ll pay for this, vermin," <subject> snarl<s>.',!0)
return}if(this.c.$2(z,y)===!0){z.ac(b,"<subject> look<s> at <object>",y)
z.dM(b,'"Now that is practice," <subject> say<s> to <objectPronoun>.',y,!0)}}},
uA:{"^":"a:6;a,b",
$2:function(a,b){var z,y,x
z=this.a.$1(a)
y=this.b.$1(a)
x=z.gar()?z:y
x.bo(b,'"You don\'t understand," <subject> growl<s>. "No matter how many of us you kill, there will be more. And when they get you, they will eat your face alive."',!0)
x.ab(b,"<subject> smirk<s>")
x.bo(b,'"You mean nothing."',!0)}},
uE:{"^":"a:0;",
$1:function(a){return a.gN()}},
uH:{"^":"a:0;",
$1:function(a){a.gaB().t(0,$.$get$eq())
return a}},
uI:{"^":"a:0;a",
$1:function(a){var z=a.gb7()
if(typeof z!=="number")return z.aj()
a.sb7(z+this.a)
return a}},
uU:{"^":"a:0;",
$1:function(a){return J.e(a.gaW(),$.$get$dm())}},
uV:{"^":"a:0;a",
$1:function(a){a.sS(this.a)
return a}},
v7:{"^":"a:0;",
$1:function(a){return C.a.a7(a.gf1(),C.r)}},
v8:{"^":"a:0;a",
$1:function(a){a.gaB().a3(0,this.a)
return a}},
v9:{"^":"a:0;",
$1:function(a){var z
a.gcz()
z=a.c
a.gcz()
a.c=z+1
return a}},
ve:{"^":"a:0;",
$1:function(a){a.sal(new E.br("shield",P.aE(C.a1,null)))
return a}},
vf:{"^":"a:0;",
$1:function(a){return J.e(a.gaW(),$.$get$dm())}},
vg:{"^":"a:6;a",
$2:function(a,b){var z,y
z=a.U(this.a)
y=O.an(a)
if(a.fO("take_spear_in_underground_church")){z.eW(b,"<subject> look<s> at <object-owner's> <object>",$.$get$eq(),y)
z.bo(b,'"Thief," <subject> mutter<s>.',!0)}}},
wG:{"^":"a:0;a",
$1:function(a){var z=this.a
if(!z.gaz())a.gaB().t(0,z.e)
a.sS($.$get$cA())}}}],["","",,V,{"^":"",
lI:function(){var z=new V.dC(null,null,null)
new V.tK().$1(z)
return z.q()},
tl:{"^":"a:5;",
$3:function(a,b,c){c.p(0,"",!0)}},
tm:{"^":"a:5;",
$3:function(a,b,c){c.p(0,"",!0)}},
tj:{"^":"a:5;",
$3:function(a,b,c){c.p(0,"The tunnel back to the main slave quarters is suicide. There will be too many orcs, and the Gate of Screams is a long way beyond. That leaves two options. The black passage towards the war forges, and the deserted tunnel to the Unholy Church, an underground temple. Both paths should lead you towards the Upper Door, a small exit at the side of Mount Bloodrock.\n",!0)}},
tk:{"^":"a:5;",
$3:function(a,b,c){c.p(0,"The corpse lies still, getting cold.\n\n\n",!0)
O.cB(b,c)
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
aa:function(a,b){return"Will you be successful?"},
gK:function(){return},
gI:function(){return"You have taken his weapon but there might be other useful items in his pocket."},
gJ:function(){return!1}},
th:{"^":"a:5;",
$3:function(a,b,c){c.p(0,'There is light at the end of the tunnel, Briana points ahead. You approach it with suspicion, but soon there is no question about it. The fresh air, the howling of the wind, the brightness of the light. After three years, you step out of the mountain you thought would be your grave. \n\n\nYou have to close your eyes to keep the blinding sun out. You let the wind chill your muscles. \n\n\nThen you open your eyes and see the valley and beyond. The black smoke of orc camps and razed villages. The burned forests. The cracks in the wall of the distant fort ironcast, just visible over the TODO hill. No birds, only those horrible dark eagles, with no head, and eight eyes where the neck on a normal \n\n\n_"We must stop this."_\n\n\nBriana: "This is much larger than us, Aren. If the dead prince is back, that\'s a problem for kings, not peasants."\n\n\n"That may be so. But no kings have what I have."\n\n\n"Orcthorn? Bah, you think they\'ll let you have it? A farm boy? / Muscles and a bit of brains? Don\'t be a fool, you\'re still a farm boy."\n\n\n"I\'m not a farm boy. And I don\'t mean Orcthorn / my own smarts. No, I have a connection. We both do."\n\n\n\n\n"A connection."\n\n\n"With the dead prince. I dream his dreams. I think I have some of his power. He is more than people think. A lot more. I think you feel it, too, but you have not been in the mountain for as long as I have. Most slaves are lucky to survive the first month. I survived three years."\n\n\n"So the thing you have that kings don\'t is\u2026 a way to communicate? You want to negotiate?"\n\n\n"I do not have anything the Dead Prince wants. No, I do not think any man, king or peasant, has it. But I think I am starting to understand what that is, and how the Dead Prince wants to seize it."\n\n\n"And you plan is?"\n\n\n(IMG long view of the road ahead) \n\n\n"Not letting him have it. Giving him the exact opposite of what he wants."\n\n\n"You know we could just run as fast as we can, kicking some orcs in their faces along the way, right?"\n\n\n"yes" \n\n\n"that others would do exactly that."\n\n\n"But we will not." \n\n\n"Yeah. We will not."\n\n\nWith that, you start down the road towards the black fort in the distance.\n',!0)}},
ti:{"^":"a:5;",
$3:function(a,b,c){c.p(0,"",!0)}},
te:{"^":"a:5;",
$3:function(a,b,c){c.p(0,"The crevice is small.\n",!0)}},
tg:{"^":"a:5;",
$3:function(a,b,c){c.p(0,"",!0)}},
tc:{"^":"a:5;",
$3:function(a,b,c){c.p(0,"You enter a small, circular room. There are exits on three sides, all marked with crude writing.\n\n\n",!0)
if(O.bi(b,"smelter"))c.p(0,'The passage you came from is marked with the words "Hot iron", which must mean "smelter" in the orcs\' vocabulary. Another one has the words "Unholy Church" above it. Both of these slope downwards.',!0)
c.p(0,"\n",!0)
if(O.bi(b,"underground_church"))c.p(0,'The passage you came from is marked with the words "Unholy Church". Another one has the words "Hot iron" above it, which must mean "smelter" in the orcs\' vocabulary. Both of these slope downwards.',!0)
c.p(0,"\nA third passage is marked \"Up Door\", and a few paces beyond the opening, it turns into a steep stairway upwards. This is it, if you're ready for it. Your final path to escape, an end of those three horrible years.\n\n\nLeaning on the wall next to the third exit is a goblin guard. He's sleeping. He holds a sword in one hand, and there's a shield laid on his lap.\n\n\n",!0)
if(!b.ao("smelter_throw_spear")&&!b.ao("take_orcthorn"))c.p(0,'For the first time, you see a smile on Briana\'s face. Not a smirk or an angry taunt of a laugh, but a genuine smile. "_Up Door?_" she whispers, shaking hear head. "I can\'t believe we have made it this far. Although \u2014 I\'ll admit \u2014 it feels like we could have taken more from them." She motions at the goblin. "Wreak more havoc. I mean, we might be the first people to be in Mount Bloodrock, and live." \n\n\n_"Let us keep that second part true, then."_\n ',!0)
c.p(0,"",!0)}},
td:{"^":"a:5;",
$3:function(a,b,c){c.p(0,"",!0)
if(b.ao("guardpost_above_church_take_shield")&&!b.fO("guardpost_above_church_take_shield"))c.t(0,"The goblin's corpse is sprawled on the ground.")
else c.t(0,"The goblin is sleeping soundly.")
c.p(0,"",!0)}},
lH:{"^":"W;W:c<,h:d<,b,a",
G:function(a,b){var z=b.f
if(!J.e(H.F(z.length!==0?C.a.gw(z):null,"$isJ").a,"guardpost_above_church"))return!1
if(b.dP(this.d)!=null)return!1
return!0},
R:[function(a,b,c){c.p(0,"You silently approach the goblin's legs, wait a few moments, then lean over him and deftly lift the shield. The goblin sniffs, moves, but stays asleep.\n\n\nYou take a few slow steps back, then fix the shield on your offhand.\n",!0)
O.eG(a,b,c,!0)
return H.b(a.gh())+" successfully performs GuardpostAboveChurchTakeShield"},"$3","gM",6,0,1],
P:[function(a,b,c){c.p(0,"You silently approach the goblin's legs, and wait a few moments. You're trying to stay as far away from his nose as possible. The goblin sniffs, moves, but stays asleep. You shift your weight on the right leg, leaning over the goblin and using the other leg as a counterweigh. Briana watches you with amusement.\n\n\nYou touch the shield to lift it, but freeze. The goblin sniffs again, and shifts. If you move, he'll wake up.\n",!0)
C.a.t(b.f,V.lI())
return H.b(a.gh())+" fails to perform GuardpostAboveChurchTakeShield"},"$3","gL",6,0,1],
H:function(a,b){return 0.3},
gO:function(){return!1},
aa:function(a,b){return"Will you be successful?"},
gK:function(){return},
gI:function(){return"The goblin is asleep but not soundly \u2014 the floor here must be cold and uncomfortable. Taking the shield from its position on the goblin's lap will quite likely wake him up."},
gJ:function(){return!1}},
fd:{"^":"ae;",
gbO:function(){return[new A.fZ(new V.lK(),new V.lL(),"Stay perfectly still","If you stop moving, the guard will go back to sleep. But in this position, staying perfectly still even for a single minute will be quite a feat. (It will cost you 1 stamina.)","guardpost_above_church_take_shield_rescue",!0,null),new A.fZ(new V.lM(),null,"Snatch the shield","You can quickly snatch the shield, jump back and prepare for a fight.","guardpost_above_church_take_shield_continuation_of_failure",!0,null)]},
gh:function(){return"guardpost_above_church_take_shield"},
ay:function(){var z=new V.dC(null,null,null)
z.m(this)
new V.lN().$1(z)
return z.q()},
aY:function(a,b){if(a!==0)return
return b.a.bC(0,new V.lO())},
b5:function(a,b){return[a.bC(0,new V.lP())]}},
tK:{"^":"a:0;",
$1:function(a){var z=$.$get$a9().aq(1073741823)
a.gbN().b=z
a.gbN().c=0
return a}},
lK:{"^":"a:26;",
$4:function(a,b,c,d){J.eQ(c,"You stay frozen in place. After a while, the strain of holding the awkward position start to show. Your left leg is shaking, and a drop of sweat is forming on your nose, threatening to fall on the goblin's leg.\n\n\nFortunately, at about that moment the goblin shifts again and his expression gets visibly more relaxed. His breath is deep and regular again.\n\n\nYou deftly lift the shield, take a few slow steps back, then fix the shield on your offhand.",!0)
b.aC()
b.Y(a.gi(),new V.lJ())
O.eG(a,b,c,!0)
return"GuardpostAboveChurchTakeShieldRescueSituation resolved with rescue/continuation (Stay perfectly still)"}},
lJ:{"^":"a:0;",
$1:function(a){var z=a.gb7()
if(typeof z!=="number")return z.at()
a.sb7(z-1)
return a}},
lL:{"^":"a:3;",
$3:function(a,b,c){var z=a.gb7()
if(typeof z!=="number")return z.bj()
return z>0}},
lM:{"^":"a:26;",
$4:function(a,b,c,d){J.eQ(c,"You snatch the shield and jump back next to Briana. The goblin wakes up instantly and gets his bearing suprisingly fast. He jumps up and gets into combat stance.\n\n\n\n\nYou hold the shield on your offhand and get ready to fight.",!0)
b.aC()
O.eG(a,b,c,!1)
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
ta:{"^":"a:5;",
$3:function(a,b,c){c.p(0,'You are Aren, a slave. You have spent three painful years inside this mountain, between the foul-smelling cave walls, and under the whip of the orcs and the goblins that live here. \n\n\nYou watch Briana straighten over Agruth\'s corpse. She smooths her hair, using a pool of Agruth\'s blood as a mirror. \n\n\n"What?" she says when she notices you\'re looking.\n\n\n_"We either go now, or die."_\n\n\nBriana spits down at the body. "He wasn\'t even the worst of them, you know."\n\n\n_"I know."_\n\n\n"They _all_ deserve this, or worse. All of them. And I like the fact we\'ll kill them by their own swords." She kicks the dead slaver in the hip. \n\n\n_"That one is already dead."_\n\n\n"I was making sure. You understand that we should name the sword, right? It\'s the only thing we have going for us right now. Gods love named swords. And I refuse to carry it around referring to it as _Agruth\'s_." She makes a pained grimace when she says the orc\'s name.\n',!0)}},
tb:{"^":"a:5;",
$3:function(a,b,c){c.p(0,"",!0)}},
mD:{"^":"W;W:c<,h:d<,b,a",
G:function(a,b){var z=b.f
if(!J.e(H.F(z.length!==0?C.a.gw(z):null,"$isJ").a,"just_after_agruth_fight"))return!1
return!0},
R:[function(a,b,c){c.p(0,'_"We will call it Luck Bringer. It is our only chance to get out of this hell."_\n\n\nBriana nods. "Luck Bringer it is. Now, you\'re right, let\'s just get out of here as quickly as possible."\n',!0)
O.ix(b,"Luck Bringer")
b.as("RoomRoamingSituation").dH(b,O.an(b),"cave_with_agruth_pre",c)
return H.b(a.gh())+" successfully performs NameAgruthSwordOpportunity"},"$3","gM",6,0,1],
P:[function(a,b,c){throw H.c(new P.w("Success chance is 100%"))},"$3","gL",6,0,1],
H:function(a,b){return 1},
gO:function(){return!1},
aa:function(a,b){return"Will you be successful?"},
gK:function(){return},
gI:function(){return""},
gJ:function(){return!1}},
mE:{"^":"W;W:c<,h:d<,b,a",
G:function(a,b){var z=b.f
if(!J.e(H.F(z.length!==0?C.a.gw(z):null,"$isJ").a,"just_after_agruth_fight"))return!1
return!0},
R:[function(a,b,c){c.p(0,'_"We will call it Savior. It is our first step to freedom."_\n\n\nBriana nods. "Savior it is. Now, you\'re right, let\'s just get out of here as quickly as possible."\n',!0)
O.ix(b,"Savior")
b.as("RoomRoamingSituation").dH(b,O.an(b),"cave_with_agruth_pre",c)
return H.b(a.gh())+" successfully performs NameAgruthSwordRedemption"},"$3","gM",6,0,1],
P:[function(a,b,c){throw H.c(new P.w("Success chance is 100%"))},"$3","gL",6,0,1],
H:function(a,b){return 1},
gO:function(){return!1},
aa:function(a,b){return"Will you be successful?"},
gK:function(){return},
gI:function(){return""},
gJ:function(){return!1}},
mC:{"^":"W;W:c<,h:d<,b,a",
G:function(a,b){var z=b.f
if(!J.e(H.F(z.length!==0?C.a.gw(z):null,"$isJ").a,"just_after_agruth_fight"))return!1
return!0},
R:[function(a,b,c){c.p(0,"_\"That is foolish. It is just a sword, after all.\"_\n\n\nBriana shrugs. \"Whatever, just don't ever call it _Agruth's._ I already have more respect to this piece of iron than to that worthless animal. Now, you're right, let's just get out of here as quickly as possible.\"\n",!0)
b.as("RoomRoamingSituation").dH(b,O.an(b),"cave_with_agruth_pre",c)
return H.b(a.gh())+" successfully performs NameAgruthSwordNothing"},"$3","gM",6,0,1],
P:[function(a,b,c){throw H.c(new P.w("Success chance is 100%"))},"$3","gL",6,0,1],
H:function(a,b){return 1},
gO:function(){return!1},
aa:function(a,b){return"Will you be successful?"},
gK:function(){return},
gI:function(){return""},
gJ:function(){return!1}},
t8:{"^":"a:5;",
$3:function(a,b,c){c.p(0,'Violent grunts and growls are coming through that door. Next to it, an orcish writing on the wall says "Danger mad. Give food go away."\n',!0)}},
t9:{"^":"a:5;",
$3:function(a,b,c){c.p(0,"TODO\n",!0)}},
t6:{"^":"a:5;",
$3:function(a,b,c){c.p(0,"The room is dark and wet. As you enter, the noises end. \n\n\n\n\nWhen your eyes become accustomed to the dark, you see two figures standing in front of you. One is much higher, almost touching the room's ceiling, but you slowly realize it's a stone statue. The other figure, though, is living.\n\n\n\n\nIts face is in constant motion, overwhelmed by tics and waves of hateful expressions. You realize it's a male orc, but an especially large one, with huge muscles and many scars. If he wasn't locked up here, he'd surely make a captain.\n",!0)}},
t7:{"^":"a:5;",
$3:function(a,b,c){c.p(0,"The room is quiet. The mad guardian's huge body lies on the floor beneath the statue.\n",!0)}},
po:{"^":"W;W:c<,h:d<,b,a",
G:function(a,b){var z=b.f
if(!J.e(H.F(z.length!==0?C.a.gw(z):null,"$isJ").a,"orcthorn_room"))return!1
if(b.ao("talk_to_briana_3"))if(!b.ao(this.d))z=H.F(z.length!==0?C.a.gw(z):null,"$isJ").c!==!0
else z=!1
else z=!1
if(!z)return!1
return!0},
R:[function(a,b,c){c.p(0,'TODO - this must be it. you search to room and find the sword hidden well (under a loose tile? under a heap of corpses?). then "why would they keep the sword at all? why wouldn\'t they destroy it?" - "fear. it\'s the ultimate authority. I don\'t think it was the orcs who decided to keep the sword intact."\n\n\nBriana: "I can\'t believe we did it. A farm boy and a freak."\n\n\n"A freak?"\n\n\n"A simple thing like this. You don\'t understand how much the orcs learned to fear the sword. A single knight could hold two dozens of orcs in check just by wielding that sword."\n\n\n"Well, we still need to get out of here."\n',!0)
O.wF(b,a)
return H.b(a.gh())+" successfully performs TakeOrcthorn"},"$3","gM",6,0,1],
P:[function(a,b,c){throw H.c(new P.w("Success chance is 100%"))},"$3","gL",6,0,1],
H:function(a,b){return 1},
gO:function(){return!1},
aa:function(a,b){return"Will you be successful?"},
gK:function(){return},
gI:function(){return""},
gJ:function(){return!1}},
t3:{"^":"a:5;",
$3:function(a,b,c){c.p(0,"TODO\n",!0)}},
t5:{"^":"a:5;",
$3:function(a,b,c){c.p(0,"TODO\n",!0)}},
ov:{"^":"W;W:c<,h:d<,b,a",
G:function(a,b){var z=b.f
if(!J.e(H.F(z.length!==0?C.a.gw(z):null,"$isJ").a,"slave_quarters"))return!1
return!0},
R:[function(a,b,c){c.p(0,"TODO FIGHT\n",!0)
b.aC()
return H.b(a.gh())+" successfully performs SlaveQuartersContinue"},"$3","gM",6,0,1],
P:[function(a,b,c){throw H.c(new P.w("Success chance is 100%"))},"$3","gL",6,0,1],
H:function(a,b){return 1},
gO:function(){return!1},
aa:function(a,b){return"Will you be successful?"},
gK:function(){return},
gI:function(){return""},
gJ:function(){return!1}},
t1:{"^":"a:5;",
$3:function(a,b,c){c.p(0,"You can see Briana clutching her fists. \"Are we homesick already?\" she says. But she doesn't wait for reply, and presses on.\n\n\nIt doesn't take long before you start hearing voices. Orcs and goblins shouting commands, mostly. Then human screams.\n\n\nThe tunnel gets wider and better lit by torches. The walls are smoother. You stop down next to a small, reinforced door. Up ahead, something is happening. A human slave is running towards you. His hand is visibly broken just above the elbow and blood is streaming down his limping left leg. His lips are moving but there is no sound anymore, only pain. Eyes in tears, he doesn't see you or anything else.\n\n\nBefore you can so much as call to him, something long and sharp shoots from behind the slave, and into his back. A bloodied spearhead appears in the center of the man's chest, as if growing from there. The tearful eyes go down, looking at the fatal wound. Two more steps and the slave falls face down, the shaft of the spear protruding upwards from his back.\n\n\nAn orc and a goblin appear from the tunnel, walking towards the dead man. The orc is laughing, patting his companion on the back. \"Vicious throw, small one!\" he roars.\n\n\nYou step back and motion Briana to lean on the wall, hoping that the door's embossed frame will provide enough cover before the two slavers turn again. \n\n\nBut at that time, something or someone smashes on that very door from the inside. Then come angry growls and something akin to barking and howling.\n\n\nThe door stays shut but the two slavers are now looking directly at you. The goblin yanks his spear from the corpse, and the orc unsheathes his sword. They start towards you.\n\n\n\n\n\n\n[IMAGE goblin spearman + orc]\n",!0)}},
t2:{"^":"a:5;",
$3:function(a,b,c){c.p(0,"The small door is TODO open/close.\n\n\n",!0)
O.cB(b,c)
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
aa:function(a,b){return"Will you be successful?"},
gK:function(){return},
gI:function(){return""},
gJ:function(){return!1}},
t_:{"^":"a:5;",
$3:function(a,b,c){c.p(0,"A blast of smoke and heat greets you as you walk out of the passage and into the room. The roaring fire draws your attention to the far wall, where scores of orcs shovel coal into a giant furnace and tilt huge kettles of molten steel into white-hot rivers. This is the smelter.\n\n\n",!0)
if(O.bi(b,"war_forge"))c.p(0,"You see a smooth passage leading out of the smelter and sloping upwards. You'll be able to go there unnoticed.",!0)
c.p(0,"",!0)
if(O.bi(b,"guardpost_above_church"))c.p(0,"Not far from here there is a short tunnel, sloping down. It leads into the same room where the molten steel goes \u2014 the war forges. You'll be able to go there unnoticed.",!0)
c.p(0,"",!0)}},
t0:{"^":"a:5;",
$3:function(a,b,c){c.p(0,"The reds and whites of the molten steel reflect in the heaps of coal.\n\n\n",!0)
O.cB(b,c)
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
aa:function(a,b){return"Will you be successful?"},
gK:function(){return},
gI:function(){return""},
gJ:function(){return!1}},
oA:{"^":"W;W:c<,h:d<,b,a",
G:function(a,b){var z=b.f
if(!J.e(H.F(z.length!==0?C.a.gw(z):null,"$isJ").a,"smelter"))return!1
if(!(!b.ao(this.d)&&b.ao("war_forge_watch_workers")&&b.ao("smelter_look_around")&&O.an(b).ha(C.r)))return!1
return!0},
R:[function(a,b,c){c.p(0,"TODO - throwing spear at the orc that holds the molten steel gate\n\n\nWhy would you do that? You just wasted a perfectly good spear on a stupid ogre that posed no threat to us.\n\n\nWatch.\n\n\nTODO (molten steel ruins everything)\n\n\nThe less simple you see the world, the easier it is for you to change it. \n\n\nYou got lucky. \n\n\nThat was some throw! That thing downstairs.. I don't know what it is but I would not want to meet it in battle. - it is probably meant to scale castle walls. - so, fort ironcast. One well placed spear may have prevented the fall of Ironcast. - delayed. - what? - we delayed the fall of the fort, at best.\n",!0)
O.v6(b)
return H.b(a.gh())+" successfully performs SmelterThrowSpear"},"$3","gM",6,0,1],
P:[function(a,b,c){throw H.c(new P.w("Success chance is 100%"))},"$3","gL",6,0,1],
H:function(a,b){return 1},
gO:function(){return!1},
aa:function(a,b){return"Will you be successful?"},
gK:function(){return},
gI:function(){return""},
gJ:function(){return!1}},
rY:{"^":"a:5;",
$3:function(a,b,c){c.p(0,"The path from slavery to power begins with a single crack of a whip. Briana wheels around, her face red with pain and anger. She is new here, but she knows what will follow. \n\n\n\n\nOnce Agruth starts whipping, the victim ends up dead. Agruth loves killing slaves. \n\n\n\n\nAnother crack and there is new blood on Briana's face. Agruth grins.\n\n\n\n\nNobody else is in sight. It's just you, Agruth and Briana. That's Agruth's main mistake.\n",!0)}},
rZ:{"^":"a:5;",
$3:function(a,b,c){c.p(0,"",!0)}},
pq:{"^":"W;W:c<,h:d<,b,a",
G:function(a,b){if(!(b.dP(this.d)==null&&O.eE(b)))return!1
return!0},
R:[function(a,b,c){c.p(0,'"You were caught not too long ago, I think. What can you tell me about outside?"\n\n\n\n\nBriana: "How long have you been here?"\n\n\n\n\n"Three years."\n\n\n\n\n"Three years! Gods. A lot has happened in the last winter alone. The orcs have taken the upper valley, and make raids way beyond Fort Ironcast."\n\n\n\n\n"So when we escape from here \u2014 *if* we escape from here \u2014 we still have to cover miles of orc territory."\n\n\n\n\n"Correct. The closest safe place is the fort."\n',!0)
return H.b(a.gh())+" successfully performs TalkToBriana1"},"$3","gM",6,0,1],
P:[function(a,b,c){throw H.c(new P.w("Success chance is 100%"))},"$3","gL",6,0,1],
H:function(a,b){return 1},
gO:function(){return!1},
aa:function(a,b){return"Will you be successful?"},
gK:function(){return},
gI:function(){return""},
gJ:function(){return!1}},
pr:{"^":"W;W:c<,h:d<,b,a",
G:function(a,b){if(!(b.ao("talk_to_briana_1")&&b.dP(this.d)==null&&O.eE(b)))return!1
return!0},
R:[function(a,b,c){c.p(0,'"Where did they catch you?"\n\n\n\n\nBriana: "At the Gate of Screams. I was trying to sneak in."\n\n\n\n\n"You what?"\n\n\n\n\n"I know. It seemed like a stupid idea even then. I wanted to get in, steal back the Orcthorn, get out, help the fight."\n',!0)
return H.b(a.gh())+" successfully performs TalkToBriana2"},"$3","gM",6,0,1],
P:[function(a,b,c){throw H.c(new P.w("Success chance is 100%"))},"$3","gL",6,0,1],
H:function(a,b){return 1},
gO:function(){return!1},
aa:function(a,b){return"Will you be successful?"},
gK:function(){return},
gI:function(){return""},
gJ:function(){return!1}},
ps:{"^":"W;W:c<,h:d<,b,a",
G:function(a,b){if(!(b.ao("talk_to_briana_2")&&b.dP(this.d)==null&&O.eE(b)))return!1
return!0},
R:[function(a,b,c){c.p(0,'"What\'s Orcthorn?"\n\n\n"A sword. It has killed hundreds of orc, wielded by many different knights. Even more orcs died trying to seize it, almost to no avail."\n\n\n"Almost."\n\n\n"Yes. Last full moon, an orcish captain and a company of (TODO: alpha) warriors ambushed Lord TODO. He was the wielder of Orcthorn at that time, and they knew it. They slaughtered his company and brought the sword here, to Bloodrock. Since then, the orcs are bolder and more successful."\n\n\n"The mad guardian."\n\n\n"The mad who?"\n\n\n"That\'s what Agruth and the other slavers were talking about a couple of weeks back. One orc was tasked with guarding a sword. That seemed wierd enough to me. Guarding a sword? Stranger yet, that orc went mad after only a few days of doing this. Now they keep him in a cell, and call him _grach kamkorr_. The mad guardian. That sword is still with him. Hidden there in the cell."\n\n\n"Where is that cell?"\n\n\n"Somewhere in the slave quarters."\n',!0)
return H.b(a.gh())+" successfully performs TalkToBriana3"},"$3","gM",6,0,1],
P:[function(a,b,c){throw H.c(new P.w("Success chance is 100%"))},"$3","gL",6,0,1],
H:function(a,b){return 1},
gO:function(){return!1},
aa:function(a,b){return"Will you be successful?"},
gK:function(){return},
gI:function(){return""},
gJ:function(){return!1}},
rW:{"^":"a:5;",
$3:function(a,b,c){c.p(0,"This must be the place that the orcs call the Shafts. It's a tall, seemingly endless room, with many walkways across.\n\n\n\n\n\n\nYou realize there is really only one way out, over one of the walkways. You'll have to run, there is no hiding anymore.\n",!0)}},
rX:{"^":"a:5;",
$3:function(a,b,c){c.p(0,"",!0)}},
tM:{"^":"a:5;",
$3:function(a,b,c){c.p(0,"TODO - start chase\n\n\nSuddenly, an **orc** and a **goblin** jump in front of you from a slimy crevice, swords in hands.\n\n\n\n\n![Orc and Goblin](img/orc_and_goblin_sketch.jpg)\n",!0)}},
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
O.cB(b,c)
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
aa:function(a,b){return"Will you be successful?"},
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
R:[function(a,b,c){c.p(0,'You move to a shadow and wait. After a few heartbeats, there is a scraping sound of stone against stone. You lean out from your hiding and see a part of the wall to the right of the altar opening.\n\n\nAn orc priest, tall and pale, enters from the stone door. At that time, the whole temple reverberates with a strong, dissonant tone that is somehow both sickening and appealing at the same time. It\'s like a groan of some large beast awakening.\n\n\nAfter the priest, a huge creature enters through the door, crouching below the frame. It\'s unclear what it is, but possibly some large breed of ogre, and judging by the braided hair, a female. Her sword \u2014 attached to her hip with a rope \u2014 is as long as you are tall. \n\n\nWhen she enters the temple and unbends, you can see that she leads someone on a chain. An orc. Despite being a strong one, probably a captain or even a chieftain, he is dwarfed by the creature before him, and he visibly shakes in horror.\n\n\nThe three of them \u2014 the priest, the ogre and the orc \u2014 go around the altar and stop before it, facing the symbol of the octopus, and away from you and Briana. The dissonant tone stops. You lean a little further out from your hiding, to have a better view.\n\n\nWithout words, the priest beckons the orc to lie at the altar. The orc is now shaking uncontrollably, but complies. You can hear his fitful breath, the rustle of his body against the stone as he glides into position, and nothing else.\n\n\nWhen the orc lies on the altar, the female ogre walks up to him and places her hands on his shoulders, pinning him down.\n\n\n_"Maggots."_\n\n\nSomehow, you know. Briana gives you a puzzled look, then turns back to the altar. From the shadows in the base of the altar, a swarm of large black insects starts to make its way to the top, towards the terrified orc. The priest lifts his arms as if in silent worship.\n\n\nThe ogre pushes down, preparing for the inevitable struggle. The orc senses it, tenses up and opens his mouth to scream.\n\n\nBut the scream doesn\'t come. Instead of it, the dissonant tone sounds again, more powerful than before.\n\n\nThe maggots crawl over the edge of the altar\'s top, onto the orc\'s body, heading straight towards his face. They move faster now.\n\n\n\n\nThe orc\'s eyes go wide. He struggles against the ogre\'s grip, pointlessly. The dissonant tone gets even louder. The temple quivers. The sound permeates everything.\n\n\nThis has a strange effect on you. Suddenly, the terror of the moment is fully replaced by something of an opposite \u2014 an invigorating feeling of power. You breathe in and feel stronger, refreshed. (Your stamina increases by +1.)\n\n\nYou notice that the priest takes a deep breath as well.\n\n\nThen, suddenly, the sound stops, and the orc\'s body sinks. The invigorating feeling is gone. You realize the maggots have eaten through the orc\'s eyes and cheeks, and that they are now scuttling back to the base of the altar.\n\n\nThe priest puts his arms down again, and \u2014 without ceremony \u2014 heads back to the stone door. The ogre takes the orc\'s dead body, puts it over her shoulder, and follows. In a few heartbeats, they are all gone and the door is closed. A new splash of blood on the altar is the only reminder of the scene.\n\n\nBriana doesn\'t look at you. "How did you know it will be maggots?"\n\n\n_"I do not know."_\n\n\n"Is this\u2026 I _felt_ that sound, somehow. I _felt_ it."\n\n\n_"This place does something weird to people."_\n\n\n"And if that orc was meant to be an offering, why did they not leave the body?" Briana shakes her head, still not looking at you. "Let\'s\u2026 let\'s just get out of here."\n',!0)
O.ir(b,1)
return H.b(a.gh())+" successfully performs WaitForRitual"},"$3","gM",6,0,1],
P:[function(a,b,c){throw H.c(new P.w("Success chance is 100%"))},"$3","gL",6,0,1],
H:function(a,b){return 1},
gO:function(){return!1},
aa:function(a,b){return"Will you be successful?"},
gK:function(){return},
gI:function(){return""},
gJ:function(){return!1}},
pp:{"^":"W;W:c<,h:d<,b,a",
G:function(a,b){var z=b.f
if(!J.e(H.F(z.length!==0?C.a.gw(z):null,"$isJ").a,"underground_church_altar"))return!1
if(b.ao(this.d))return!1
return!0},
R:[function(a,b,c){c.p(0,"It's a primive short spear that probably belonged to some goblin. You take it in your hand, feeling the wet wood and the patches of mire along its length. It must have been here for a while. \n\n\nBut it feels right in your hand, a good throwing weapon.\n",!0)
O.uG(b)
return H.b(a.gh())+" successfully performs TakeSpearInUndergroundChurch"},"$3","gM",6,0,1],
P:[function(a,b,c){throw H.c(new P.w("Success chance is 100%"))},"$3","gL",6,0,1],
H:function(a,b){return 1},
gO:function(){return!1},
aa:function(a,b){return"Will you be successful?"},
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
O.cB(b,c)
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
aa:function(a,b){return"Will you be successful?"},
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
aa:function(a,b){return"Will you be successful?"},
gK:function(){return},
gI:function(){return""},
gJ:function(){return!1}},
q0:{"^":"fd;i:a<,V:b<",
a2:function(a){var z=new V.dC(null,null,null)
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
z=new V.q0(y,x)
if(y==null)H.i(P.m("id"))
if(x==null)H.i(P.m("time"))}this.m(z)
return z}}}],["","",,O,{"^":"",
xF:[function(a){var z,y
z=$.$get$dq()
y=z.C
if(y.length>0){y+=" "
z.C=y}z.C=y+a},"$1","vc",2,0,16],
xK:[function(a){$.eC=a},"$1","vd",2,0,16],
ia:[function(a,b,c,d,e,f,g){var z=L.f2(a,!1,!1,d,e,f,g)
$.$get$c_().t(0,z)
return z},function(a){return O.ia(a,!1,!1,null,null,null,null)},function(a,b,c){return O.ia(a,!1,!1,null,b,c,null)},"$7$deferToChoiceList$deferToEndOfPage$goto$helpMessage$script$submenu","$1","$3$helpMessage$script","vb",2,13,53,0,0,0,1,1,0],
nU:{"^":"o5;",
bB:function(){var z=0,y=P.aC(),x,w=2,v,u=[],t=this,s,r,q,p,o,n,m,l,k,j
var $async$bB=P.ay(function(a,b){if(a===1){v=b
z=w}while(true)switch(z){case 0:if($.cr){n=t.Q
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
if(n instanceof M.cJ){r=n
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
eX:function(){var z,y
this.fz()
this.f.bg(0)
this.r=!0
this.e=this.c
z=this.Q
Z.hz(Z.bR())
z.toString
y=new A.u(90,null,null,null,null)
y.b=Z.bR()
z.a.F(y.E())
this.bB()},
lg:[function(a){var z,y
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
$.$get$cx().aE(z)}z=a.x
if(z!=null)this.es(z)},
cG:function(){var z=0,y=P.aC(),x,w=[],v=this,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c
var $async$cG=P.ay(function(a,a0){if(a===1)return P.aI(a0,y)
while(true)switch(z){case 0:u={}
r=$.$get$cy()
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
break}m=v.x===v.e.gaA().length-1||v.x===v.y
u.a=m
r=v.x
q=v.y
if(r!==q)if(r!=null){if(r<v.e.gaA().length){r=v.e.gaA()
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
H.p([],[L.ac])
j=new L.f3(r,o)
if(!j.gX(j)){u=v.Q
r=u.e
if(r!=null){r.dB(new D.c4("Showing new choice before previous one was selected."))
u.e=null}r=P.t
u.e=new P.cs(new P.H(0,$.r,null,[r]),[r])
r=j.dS()
u.a.F(r.E())
u=u.e.a.c6(v.giJ())
i=new O.o9(v)
r=H.l(u,0)
q=$.r
if(q!==C.i){i=P.eu(i,q)
q.toString}u.di(new P.el(null,new P.H(0,q,null,[r]),6,new O.oa(),i,[r,r]))
x=!0
z=1
break}else{h=k.aT(0,new O.ob(),new O.oc())
if(h!=null){if(h.gh4()!=null){r=h.r
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
return P.ax(v.cH(f),$async$cG)
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
r=0}else if(r===q){r=v.e.gaA().length-1
v.x=r}else if($.hX)$.hX=!1
else{++r
v.x=r}u.a=r===v.e.gaA().length-1
r="Resolving block: '"+H.b(v.e.gh())+"' block "+H.b(v.x)+"."
q=v.Q
q.toString
o=new A.u(667,null,null,null,null)
o.c=r
q.a.F(o.E())
if(v.x===v.e.gaA().length){u=v.Q
u.toString
r=new A.u(667,null,null,null,null)
r.c="End of book."
u.a.F(r.E())
r=v.Q
u=v.ea()
r.toString
u=u.f_(50)
r.a.F(u.E())
v.Q.a.F(new A.u(80,null,null,null,null).E())
x=!0
z=1
break}r=v.e.gaA()
q=v.x
if(q>>>0!==q||q>=r.length){x=H.f(r,q)
z=1
break}q=r[q]
z=typeof q==="string"?6:8
break
case 6:u=v.Q
r=v.e.gaA()
q=v.x
if(q>>>0!==q||q>=r.length){x=H.f(r,q)
z=1
break}q=r[q]
r=P.X
u.f=new P.cs(new P.H(0,$.r,null,[r]),[r])
r=new A.u(30,null,null,null,null)
r.c=q
u.a.F(r.E())
u.f.a.c6(new O.od(v))
x=!0
z=1
break
z=7
break
case 8:r=v.e.gaA()
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
try{r=v.e.gaA()
q=v.x
if(q>>>0!==q||q>=r.length){x=H.f(r,q)
z=1
break}k.jt(r[q])}catch(b){u=H.C(b)
if(u instanceof M.cJ){t=u
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
if(k.bt(0,new O.oe(u,v))&&v.x===v.e.gaA().length-1){u=v.Q
u.toString
r=new A.u(667,null,null,null,null)
r.c="Creating & sending savegame"
u.a.F(r.E())
r=v.Q
u=v.ea()
r.toString
u=u.f_(50)
r.a.F(u.E())
x=!1
z=1
break}x=!1
z=1
break
z=10
break
case 11:r=v.e.gaA()
q=v.x
if(q>>>0!==q||q>=r.length){x=H.f(r,q)
z=1
break}q=r[q]
r={func:1,ret:[P.Q,P.au]}
z=H.az(q,r)?12:14
break
case 12:d=v.x===v.e.gaA().length-1?v.ea():null
q=v.e.gaA()
o=v.x
if(o>>>0!==o||o>=q.length){x=H.f(q,o)
z=1
break}z=15
return P.ax(v.cH(H.ij(q[o],r)),$async$cG)
case 15:c=a0
if(k.bt(0,new O.of(u,v))&&v.x===v.e.gaA().length-1){u=v.Q
u.toString
r=d.f_(50)
u.a.F(r.E())}x=c
z=1
break
z=13
break
case 14:u=v.e.gaA()
r=v.x
if(r>>>0!==r||r>=u.length){x=H.f(u,r)
z=1
break}throw H.c(new P.w("Invalid block: "+H.b(u[r])))
case 13:case 10:case 7:case 1:return P.aJ(x,y)}})
return P.aK($async$cG,y)},
es:function(a){var z,y,x,w,v
z=$.$get$cN()
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
fz:function(){var z,y,x,w,v,u
this.x=null
$.$get$cx().bg(0)
$.$get$c_().sl(0,0)
$.rz=null
x=$.$get$cD()
x.bg(0)
w=$.$get$cy()
x.n(0,"points",w)
w.a=0
w.b.bg(0)
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
z=w}while(true)switch(z){case 0:q=$.$get$dq()
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
throw H.c(new M.cJ(q,o,n))
z=6
break
case 3:z=2
break
case 6:if(q.C.length!==0){t.Q.f8(J.h(q)).c6(new O.oh(t))
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
if($.$get$cN().b.test(H.bz(z)))return!1
y=this.b.dX(z,this.e.gdZ())
if(y==null){z="Target page '"+H.b(z)+"' was not found."
x=this.Q
x.toString
w=new A.u(667,null,null,null,null)
w.c=z
x.a.F(w.E())
return!0}y.gl7()
return!1},"$1","gfD",2,0,35],
ea:function(){var z,y,x,w,v,u
this.hp()
try{x=this.e.gh()
w=$.$get$cD()
x=new Z.fU(x,this.b.jS(),null,null,null,null)
x.c=H.aN(Z.d2(w),"$isI",[P.q,P.d],"$asI")
x.f=Date.now()
x.e=C.e.l4(H.aF(x),16)
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
this.fz()
z=this.b
y=z.a
if(y.j(0,a.a)==null)throw H.c(new Z.dD("Trying to load page '"+H.b(a.a)+"' which doesn't exist in current egamebook."))
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
y=$.$get$cD()
Z.nR(a,y,P.dN(P.q,P.bH))
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
while(true)switch(z){case 0:v=$.$get$dq()
if(v.C.length!==0){w.Q.f8(J.h(v))
v.C=""}v=w.Q
v.toString
u=new A.u(130,null,null,null,null)
u.b=[a,b,d,c]
v.a.F(u.E())
u=U.cp
t=new P.H(0,$.r,null,[u])
v.x=new P.cs(t,[u])
x=t
z=1
break
case 1:return P.aJ(x,y)}})
return P.aK($async$e0,y)},function(a,b){return this.e0(a,b,null,!1)},"lc","$4$rerollEffectDescription$rerollable","$2","gi0",4,5,54,1,0]},
og:{"^":"a:0;a,b,c",
$1:function(a){var z,y,x,w
a.sf9(!0)
if(a.d===this.c){z="Found choice that was selected: "+a.e
y=this.b.Q
y.toString
x=new A.u(667,null,null,null,null)
x.c=z
y.a.F(x.E())
this.a.a=a}else{z=a.x
if(z!=null){y=this.b
w=$.$get$cN().b.test(H.bz(z))?y.d.a:y.b.dX(z,y.e.gdZ())
if(w!=null){y.f.t(0,H.b(y.e.gh())+">>"+H.b(w.gh()))
y.r=!0}}}}},
o6:{"^":"a:0;a",
$1:function(a){return this.a.bB()}},
o7:{"^":"a:0;a",
$1:function(a){return a.gf9()||this.a.iQ(a)}},
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
$1:function(a){return a instanceof D.c4}},
ob:{"^":"a:0;",
$1:function(a){return a.gkn()}},
oc:{"^":"a:2;",
$0:function(){return}},
od:{"^":"a:0;a",
$1:function(a){return this.a.bB()}},
oe:{"^":"a:0;a,b",
$1:function(a){return a.dD(!0,this.a.a,this.b.gfD())}},
of:{"^":"a:0;a,b",
$1:function(a){return a.dD(!0,this.a.a,this.b.gfD())}},
oh:{"^":"a:0;a",
$1:function(a){return this.a.bB()}},
ne:{"^":"d;a,b,fY:c<",
jj:function(a,b,c){var z
if(!$.hV){z=J.ap(this.a,b)
this.a=z
this.b.aE(new A.cZ(b,z,c))}},
t:function(a,b){return this.jj(a,b,null)},
aj:function(a,b){this.t(0,b)
return this},
E:function(){return P.a0(["points",this.a])},
hD:function(a){this.a=a.j(0,"points")
this.b.bg(0)},
ib:function(){this.b=P.bb(null,A.cZ)},
$ise8:1},
d3:{"^":"mY;aA:d<,dT:e@,a,b,c",
ghE:function(){return J.ab(this.e,0)}},
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
$2:function(a,b){b.sdT(0)}}}],["","",,M,{"^":"",cJ:{"^":"d;a,b,c",
k:function(a){return"AuthorScriptException at page '"+H.b(this.b)+"', block #"+H.b(this.c)+": "+H.b(this.a)},
v:{
eX:function(a){return new M.cJ(a,null,null)}}}}],["","",,M,{"^":"",o5:{"^":"d;"}}],["","",,Z,{"^":"",fU:{"^":"d;a,b,c,d,e,f",
f_:function(a){var z
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
return!!J.o(a).$ise8},
d2:function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"&&Math.floor(a)===a||typeof a==="number"||typeof a==="boolean")return a
else{z=J.o(a)
if(!!z.$isN){y=[]
for(x=0;x<z.gl(a);++x)if(Z.fV(z.j(a,x)))y.push(Z.d2(z.j(a,x)))
return y}else if(!!z.$isI){w=new H.R(0,null,null,null,null,null,0,[null,null])
z.Z(a,new Z.nQ(a,w))
return w}else if(!!z.$ise8){v=a.E()
v.n(0,"_class",a.gfY())
return Z.d2(v)}else throw H.c("Function _dissolveToPrimitivess called with a non-saveable argument type.")}},
d1:function(a,b,c){var z,y,x,w,v,u
if(a==null||typeof a==="string"||typeof a==="number"&&Math.floor(a)===a||typeof a==="number"||typeof a==="boolean")return a
else{z=J.o(a)
if(!!z.$isN){y=[]
for(x=0;x<z.gl(a);++x)y.push(Z.d1(z.j(a,x),b,null))
return y}else{w=!!z.$isI
if(w&&!a.ad("_class")){v=new H.R(0,null,null,null,null,null,0,[null,null])
z.Z(a,new Z.nP(b,v))
return v}else if(w&&a.ad("_class"))if(c!=null){c.hD(a)
return c}else{u=z.j(a,"_class")
if(!b.ad(u))throw H.c(new Z.dD("Constructor for "+H.b(u)+" not set. Cannot assemble a new instance."))
else return b.j(0,u).$1(a)}else throw H.c("Function _assembleFromPrimitives called with a non-primitive argument type.")}}},
nR:function(a,b,c){a.c.Z(0,new Z.nS(b,c))}}},nQ:{"^":"a:6;a,b",
$2:function(a,b){if(Z.fV(this.a.j(0,a)))this.b.n(0,a,Z.d2(b))}},nP:{"^":"a:6;a,b",
$2:function(a,b){this.b.n(0,a,Z.d1(b,this.a,null))}},nS:{"^":"a:38;a,b",
$2:function(a,b){var z,y,x
z=this.a
y=z.j(0,a)
x=this.b
if(y==null)z.n(0,a,Z.d1(b,x,null))
else z.n(0,a,Z.d1(b,x,y))}},dD:{"^":"d;a",
k:function(a){return"IncompatibleSavegameException: "+this.a}},lW:{"^":"d;a",
k:function(a){return"InvalidSavegameException: "+this.a}}}],["","",,D,{"^":"",nk:{"^":"d;"},nj:{"^":"nk;"},m3:{"^":"nj;a,b,c,d,e,f,r,x",
lk:[function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
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
if(o!=null){o.dB(new D.c4("Book Quit before choice was selected."))
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
k=J.aB(z.geR(),0)
j=J.aB(z.geR(),1)
o=this.x
if(k>>>0!==k||k>=4)return H.f(C.C,k)
o.bZ(new U.cp(C.C[k],j))
this.x=null
return
case 1010:o=new A.u(667,null,null,null,null)
o.c="Starting book from scratch."
n=this.a
n.F(o.E())
o=this.e
if(o!=null){o.dB(new D.c4("Book Restart before choice was selected."))
this.e=null}try{this.c.eX()}catch(i){y=H.C(i)
x=H.E(i)
o=new A.u(666,null,null,null,null)
o.c="An error occured when initializing: "+H.b(y)+".\n"+H.b(x)
n.F(o.E())
throw H.c(y)}o=new A.u(90,null,null,null,null)
o.b=Z.bR()
n.F(o.E())
n.F(new A.cZ(0,0,null).dS().E())
return
case 1020:h=new A.u(667,null,null,null,null)
h.c="Loading a saved game."
g=this.a
g.F(h.E())
h=this.e
if(h!=null){h.dB(new D.c4("Book Load before choice was selected."))
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
v=H.aN(J.j2(z.geR()),"$isbP",[o],"$asbP")
o=this.c
if(v!=null)o.hf(w,v)
else o.kw(w)}catch(i){o=H.C(i)
if(o instanceof Z.dD){u=o
t=H.E(i)
o=new A.u(666,null,null,null,null)
o.c="Load failed due to incompatibility: "+H.b(u)+".\n"+H.b(t)
g.F(o.E())
this.c.eX()}else{s=o
r=H.E(i)
o=new A.u(666,null,null,null,null)
o.c="Load failed for unknown reason: "+H.b(s)+".\n"+H.b(r)
g.F(o.E())
this.c.eX()}}try{o=new A.u(90,null,null,null,null)
o.b=Z.bR()
g.F(o.E())}catch(i){q=H.C(i)
p=H.E(i)
o=new A.u(666,null,null,null,null)
o.c="Sending Stats failed for unknown reason: "+H.b(q)+".\n"+H.b(p)
g.F(o.E())
throw H.c(q)}this.c.toString
g.F(new A.cZ(0,$.$get$cy().a,null).dS().E())
return
case 1090:this.f.bZ(!0)
this.f=null
return
case 1040:this.c.bB()
return
default:o=new A.u(666,null,null,null,null)
o.c="Wrong message type received by Scripter - "+H.b(z.ghB())+"."
this.a.F(o.E())}},"$1","giW",2,0,21],
f8:function(a){var z=P.X
this.f=new P.cs(new P.H(0,$.r,null,[z]),[z])
z=new A.u(30,null,null,null,null)
z.c=a
this.a.F(z.E())
return this.f.a}},c4:{"^":"d;a",
k:function(a){return"AsyncOperationOverridenException: "+this.a+"."}}}],["","",,G,{"^":"",kk:{"^":"d;a",
E:function(){return P.cj(this.a,null,null)},
k:function(a){return"<CurrentState submitted="+H.b(this.a.j(0,"__submitted__"))+">"}}}],["","",,A,{"^":"",u:{"^":"d;hB:a<,eR:b<,i4:c<,kg:d<,ky:e<",
gl6:function(){var z=this.a
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
z="Message "+this.gl6()
y=this.a
x=J.o(y)
return z+(x.A(y,50)||x.A(y,60)||x.A(y,90)||x.A(y,100)||x.A(y,666)||x.A(y,667)?" (async)":"")}}}],["","",,E,{"^":"",mY:{"^":"d;h:a@,l7:b<",
k:function(a){return this.a},
gdZ:function(){var z,y
z=this.a
if(z==null)throw H.c("Accessed groupName Page has name = null.")
y=J.iY(z,": ")
if(y>0)return J.j1(this.a,0,y)
else return}}}],["","",,A,{"^":"",cZ:{"^":"d;jv:a<,b,c",
k:function(a){var z="Score +"+H.b(this.a)+"."
return z},
dS:function(){var z=new A.u(70,null,null,null,null)
z.b=[this.a,this.b]
z.c=this.c
return z}}}],["","",,L,{"^":"",ac:{"^":"d;f9:a@,b,c,d,b8:e<,I:f<,h4:r<,x,y",
gkn:function(){return this.e.length===0},
dD:function(a,b,c){if(this.a)return!1
if(this.e.length===0)return!1
b!=null
a!=null
if(c!=null&&c.$1(this)===!0)return!1
return!0},
km:function(a,b){return this.dD(a,b,null)},
l2:function(){return P.a0(["string",this.e,"hash",this.d,"submenu",this.y,"helpMessage",this.f])},
c6:function(a){this.r=a
return this},
bE:function(a,b){return C.b.bE(this.e,b.gb8())},
k:function(a){return"Choice: "+this.e+" ["+H.b(this.x)+"] ("+this.d+")"},
i8:function(a,b,c,d,e,f,g){if(a==null)throw H.c(P.G("String given to choice cannot be null."))
this.e=J.bh(a).f0(a)
this.d=C.b.gB(a)
this.r=f
this.b=!1
this.c=!1},
$isV:1,
$asV:function(){return[L.ac]},
v:{
f2:function(a,b,c,d,e,f,g){var z=new L.ac(!1,null,null,null,null,e,null,d,g)
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
o=new L.ac(!1,null,null,null,null,null,null,q,J.aB(y,"submenu"))
if(r==null)H.i(P.G("String given to choice cannot be null."))
o.e=J.bh(r).f0(r)
o.d=C.b.gB(r)
o.r=p
o.b=!1
o.c=!1
C.a.t(v,o)}},
jp:function(a,b,c,d,e,f,g){if(b instanceof L.ac)C.a.t(this.b,b)
else if(typeof b==="string")C.a.t(this.b,L.f2(b,!1,!1,e,null,f,g))
else throw H.c(P.G("To add a choice to choices, one must provide either a new Choice element or a String."))},
t:function(a,b){return this.jp(a,b,!1,!1,null,null,null)},
l3:function(a,b,c,d){var z,y,x,w
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
dS:function(){return this.l3(null,null,null,null)},
k:function(a){var z=this.b
return new H.ar(z,new L.k0(),[H.l(z,0),null]).cm(0,", ")},
$asft:function(){return[L.ac]},
$asfC:function(){return[L.ac]},
$asN:function(){return[L.ac]},
$asa_:function(){return[L.ac]}},jZ:{"^":"a:0;a,b,c",
$1:function(a){return a.dD(this.b,this.a,this.c)}},k_:{"^":"a:0;a",
$1:function(a){H.b(a)
J.dr(this.a.b,a.l2())
a.a=!0}},k0:{"^":"a:0;",
$1:function(a){return H.b(a)}}}],["","",,Z,{"^":"",d4:{"^":"d;df:a<,b8:b<",
E:function(){return P.a0(["show",this.a,"string",this.b])}},oG:{"^":"d;a",
E:function(){var z=new H.R(0,null,null,null,null,null,0,[P.q,P.d])
this.a.Z(0,new Z.oH(z))
return z},
Z:function(a,b){this.a.Z(0,b)}},oH:{"^":"a:39;a",
$2:function(a,b){this.a.n(0,a,b.E())}},hy:{"^":"d;h:a@,aS:b<,fZ:c<,dK:d<,df:e<,hj:f<,b8:r<",v:{
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
$2:function(a,b){return J.bD(b.gdK(),a.gdK())}},av:{"^":"d;h:a<,aS:b<,c,fZ:d<,dK:e<,f,r,hj:x<,fW:y@,fY:z<,$ti",
gae:function(){return this.f},
sae:function(a){if(!J.e(this.f,a)){this.f=a
this.y=!0
$.cr=!0}},
gdf:function(){return this.r},
gb8:function(){return this.c.$1(this.f)},
E:function(){return P.a0(["name",this.a,"value",this.f,"show",this.r])},
hD:function(a){var z
this.sae(H.iJ(a.j(0,"value"),H.l(this,0)))
z=a.j(0,"show")
if(!J.e(this.r,z)){this.r=z
this.y=!0
$.cr=!0}},
$ise8:1,
v:{
bQ:function(a,b,c,d,e,f,g,h){var z,y
z=$.$get$d5()
y=z.ad(a)?H.aN(z.j(0,a),"$isav",[h],"$asav"):new Z.av(a,d,b,c,f,null,null,!0,!1,"Stat",[null])
y.f=H.iJ(e,h)
y.r=!0
z.n(0,a,y)
return y},
oJ:function(){var z,y
z=new Z.oG(new H.R(0,null,null,null,null,null,0,[P.q,Z.d4]))
y=$.$get$d5().gcw()
new H.K(y,new Z.oK(),[H.y(y,"B",0)]).Z(0,new Z.oL(z))
$.cr=!1
return z},
bR:function(){var z=H.p([],[[P.I,P.q,P.d]])
$.$get$d5().gcw().Z(0,new Z.oI(z))
return z}}},oK:{"^":"a:0;",
$1:function(a){return a.gfW()}},oL:{"^":"a:27;a",
$1:function(a){var z,y
z=a.gdf()
y=a.gb8()
a.sfW(!1)
this.a.a.n(0,a.a,new Z.d4(z,y))}},oI:{"^":"a:27;a",
$1:function(a){var z=new H.R(0,null,null,null,null,null,0,[P.q,P.d])
z.n(0,"name",a.gh())
z.n(0,"description",a.gaS())
z.n(0,"color",a.gfZ())
z.n(0,"priority",a.gdK())
z.n(0,"show",a.gdf())
z.n(0,"notifyOnChange",a.ghj())
z.n(0,"string",a.gb8())
this.a.push(z)}}}],["","",,N,{"^":"",dP:{"^":"d;h:a<,b,c,iw:d<,e,f",
gh6:function(){var z,y,x
z=this.b
y=z==null||J.e(z.gh(),"")
x=this.a
return y?x:z.gh6()+"."+x},
geQ:function(){if($.it){var z=this.b
if(z!=null)return z.geQ()}return $.rH},
kx:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p,o
x=a.b
if(x>=this.geQ().b){if(!!J.o(b).$isbH)b=b.$0()
w=b
if(typeof w!=="string"){v=b
b=J.h(b)}else v=null
if(d==null&&x>=$.v5.b)try{x="autogenerated stack trace for "+a.k(0)+" "+H.b(b)
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
p=new N.mu(a,x,v,w,new P.cP(r,!1),q,t,s,e)
if($.it)for(o=this;o!=null;){o.fH(p)
o=o.b}else $.$get$fw().fH(p)}},
co:function(a,b,c,d){return this.kx(a,b,c,d,null)},
jY:function(a,b,c){return this.co(C.V,a,b,c)},
am:function(a){return this.jY(a,null,null)},
jX:function(a,b,c){return this.co(C.U,a,b,c)},
bn:function(a){return this.jX(a,null,null)},
jW:function(a,b,c){return this.co(C.W,a,b,c)},
bP:function(a){return this.jW(a,null,null)},
ke:function(a,b,c){return this.co(C.B,a,b,c)},
hd:function(a){return this.ke(a,null,null)},
l8:function(a,b,c){return this.co(C.Z,a,b,c)},
f2:function(a){return this.l8(a,null,null)},
hZ:function(a,b,c){return this.co(C.Y,a,b,c)},
e_:function(a){return this.hZ(a,null,null)},
fH:function(a){},
v:{
bn:function(a){return $.$get$fv().kK(a,new N.ts(a))}}},ts:{"^":"a:2;a",
$0:function(){var z,y,x,w
z=this.a
if(C.b.dg(z,"."))H.i(P.G("name shouldn't start with a '.'"))
y=C.b.ku(z,".")
if(y===-1)x=z!==""?N.bn(""):null
else{x=N.bn(C.b.aL(z,0,y))
z=C.b.bK(z,y+1)}w=new H.R(0,null,null,null,null,null,0,[P.q,N.dP])
w=new N.dP(z,x,null,w,new P.hB(w,[null,null]),null)
if(x!=null)x.giw().n(0,z,w)
return w}},b_:{"^":"d;h:a<,ae:b<",
A:function(a,b){if(b==null)return!1
return b instanceof N.b_&&this.b===b.b},
aZ:function(a,b){return C.e.aZ(this.b,b.gae())},
d9:function(a,b){var z=b.gae()
if(typeof z!=="number")return H.x(z)
return this.b<=z},
bj:function(a,b){var z=b.gae()
if(typeof z!=="number")return H.x(z)
return this.b>z},
bT:function(a,b){return this.b>=b.gae()},
bE:function(a,b){var z=b.gae()
if(typeof z!=="number")return H.x(z)
return this.b-z},
gB:function(a){return this.b},
k:function(a){return this.a},
$isV:1,
$asV:function(){return[N.b_]}},mu:{"^":"d;eQ:a<,b,aV:c<,d,V:e<,f,bv:r<,br:x<,y",
k:function(a){return"["+this.a.a+"] "+this.d+": "+H.b(this.b)}}}],["","",,X,{"^":"",
bC:function(a){return X.df(J.iV(a,0,new X.uJ()))},
b3:function(a,b){var z=J.ap(a,b)
if(typeof z!=="number")return H.x(z)
a=536870911&z
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
df:function(a){if(typeof a!=="number")return H.x(a)
a=536870911&a+((67108863&a)<<3)
a^=a>>>11
return 536870911&a+((16383&a)<<15)},
uJ:{"^":"a:6;",
$2:function(a,b){return X.b3(a,J.j(b))}},
dX:{"^":"ce;a,$ti",
gae:function(){var z=this.a
if(z==null)throw H.c(new P.w("value called on absent Optional."))
return z},
b2:function(a){var z=this.a
return z==null?a:z},
ga_:function(a){var z=this.a
if(z!=null){z=H.p([z],this.$ti)
z=new J.bk(z,1,0,null,[H.l(z,0)])}else z=C.K
return z},
gB:function(a){return J.j(this.a)},
A:function(a,b){var z,y
if(b==null)return!1
if(b instanceof X.dX){z=b.a
y=this.a
y=z==null?y==null:z===y
z=y}else z=!1
return z},
k:function(a){var z=this.a
return z==null?"Optional { absent }":"Optional { value: "+H.b(z)+" }"},
ia:function(a,b){if(this.a==null)throw H.c(P.G("Must not be null."))},
v:{
fG:function(a,b){var z=new X.dX(a,[b])
z.ia(a,b)
return z}}}}],["","",,U,{"^":"",d0:{"^":"d;a,b",
k:function(a){return this.b}},cp:{"^":"d;a,l9:b<",
geN:function(){return this.a===C.G},
k:function(a){return"SessionResult<"+this.a.b+",wasRerolled="+H.b(this.b)+">"},
A:function(a,b){if(b==null)return!1
return b instanceof U.cp&&b.a===this.a&&J.e(b.b,this.b)},
gB:function(a){return(this.b===!0?2:1)*100+this.a.a}}}],["","",,X,{"^":"",
xL:[function(a,b){var z,y,x,w,v
z=new D.m3(b,null,null,null,null,null,null,null)
y=$.fR
$.fR=y+1
x=new H.cn(y,null,!1)
w=init.globalState.d
w.e4(y,x)
w.cN()
w=new H.nA(x,null)
w.ic(x)
z.b=w
w=w.b
w.toString
new P.d8(w,[H.l(w,0)]).aI(z.giW(),null,null,null)
b.F(new H.cv(z.b.a,init.globalState.d.a))
v=N.nX()
z.c=v
v.Q=z},"$2","id",4,0,36]},1]]
setupProgram(dart,0)
J.o=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.fk.prototype
return J.fj.prototype}if(typeof a=="string")return J.ci.prototype
if(a==null)return J.fl.prototype
if(typeof a=="boolean")return J.fi.prototype
if(a.constructor==Array)return J.cg.prototype
if(!(a instanceof P.d))return J.bt.prototype
return a}
J.aA=function(a){if(a==null)return a
if(a.constructor==Array)return J.cg.prototype
if(!(a instanceof P.d))return J.bt.prototype
return a}
J.L=function(a){if(typeof a=="string")return J.ci.prototype
if(a==null)return a
if(a.constructor==Array)return J.cg.prototype
if(!(a instanceof P.d))return J.bt.prototype
return a}
J.am=function(a){if(typeof a=="number")return J.ch.prototype
if(a==null)return a
if(!(a instanceof P.d))return J.bt.prototype
return a}
J.eB=function(a){if(typeof a=="number")return J.ch.prototype
if(typeof a=="string")return J.ci.prototype
if(a==null)return a
if(!(a instanceof P.d))return J.bt.prototype
return a}
J.bh=function(a){if(typeof a=="string")return J.ci.prototype
if(a==null)return a
if(!(a instanceof P.d))return J.bt.prototype
return a}
J.ap=function(a,b){if(typeof a=="number"&&typeof b=="number")return a+b
return J.eB(a).aj(a,b)}
J.b5=function(a,b){if(typeof a=="number"&&typeof b=="number")return a/b
return J.am(a).d7(a,b)}
J.e=function(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.o(a).A(a,b)}
J.ab=function(a,b){if(typeof a=="number"&&typeof b=="number")return a>b
return J.am(a).bj(a,b)}
J.c1=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<b
return J.am(a).aZ(a,b)}
J.c2=function(a,b){if(typeof a=="number"&&typeof b=="number")return a*b
return J.eB(a).cb(a,b)}
J.iT=function(a){if(typeof a=="number")return-a
return J.am(a).f6(a)}
J.bD=function(a,b){if(typeof a=="number"&&typeof b=="number")return a-b
return J.am(a).at(a,b)}
J.aB=function(a,b){if(typeof b==="number")if(a.constructor==Array||typeof a=="string")if(b>>>0===b&&b<a.length)return a[b]
return J.L(a).j(a,b)}
J.dr=function(a,b){return J.aA(a).t(a,b)}
J.iU=function(a,b,c,d,e,f,g,h,i,j,k,l,m,n){return J.aA(a).ji(a,b,c,d,e,f,g,h,i,j,k,l,m,n)}
J.eQ=function(a,b,c){return J.aA(a).p(a,b,c)}
J.bE=function(a,b){return J.eB(a).bE(a,b)}
J.ds=function(a,b){return J.L(a).a7(a,b)}
J.eR=function(a,b){return J.aA(a).au(a,b)}
J.iV=function(a,b,c){return J.aA(a).bw(a,b,c)}
J.j=function(a){return J.o(a).gB(a)}
J.eS=function(a){return J.L(a).gX(a)}
J.ai=function(a){return J.aA(a).ga_(a)}
J.iW=function(a){return J.aA(a).gw(a)}
J.aO=function(a){return J.L(a).gl(a)}
J.iX=function(a){return J.o(a).gbz(a)}
J.iY=function(a,b){return J.L(a).b1(a,b)}
J.eT=function(a,b){return J.aA(a).aJ(a,b)}
J.iZ=function(a,b,c){return J.bh(a).hg(a,b,c)}
J.dt=function(a,b,c){return J.bh(a).kO(a,b,c)}
J.cE=function(a,b,c){return J.bh(a).d0(a,b,c)}
J.j_=function(a){return J.am(a).hw(a)}
J.j0=function(a,b){return J.aA(a).e1(a,b)}
J.eU=function(a,b){return J.bh(a).dg(a,b)}
J.j1=function(a,b,c){return J.bh(a).aL(a,b,c)}
J.j2=function(a){return J.aA(a).bH(a)}
J.h=function(a){return J.o(a).k(a)}
J.c3=function(a,b){return J.am(a).bi(a,b)}
J.j3=function(a,b){return J.aA(a).c9(a,b)}
I.aY=function(a){a.immutable$list=Array
a.fixed$length=Array
return a}
var $=I.p
C.N=J.aZ.prototype
C.a=J.cg.prototype
C.O=J.fi.prototype
C.u=J.fj.prototype
C.e=J.fk.prototype
C.P=J.fl.prototype
C.j=J.ch.prototype
C.b=J.ci.prototype
C.H=new A.aq(0,0,0)
C.I=new A.aq(-1/0,-1/0,-1/0)
C.J=new A.cG(-10,0,100)
C.K=new H.l7([null])
C.L=new P.mX()
C.v=new P.qz()
C.M=new P.qS()
C.i=new P.r6()
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
C.U=new N.b_("FINER",400)
C.V=new N.b_("FINEST",300)
C.W=new N.b_("FINE",500)
C.B=new N.b_("INFO",800)
C.X=new N.b_("OFF",2000)
C.Y=new N.b_("SEVERE",1000)
C.Z=new N.b_("WARNING",900)
C.G=new U.d0(0,"Result.success")
C.a6=new U.d0(1,"Result.failure")
C.a7=new U.d0(2,"Result.criticalSuccess")
C.a8=new U.d0(3,"Result.criticalFailure")
C.C=I.aY([C.G,C.a6,C.a7,C.a8])
C.a_=I.aY(["cave_with_agruth","guardpost_above_church","orcthorn_room","slave_quarters_passage","smelter","underground_church","war_forge"])
C.a0=I.aY([C.y])
C.a1=I.aY([C.z])
C.D=I.aY([C.r])
C.o=I.aY([C.A])
C.d=I.aY([])
C.a2=I.aY(['Briana spits on the floor. "Can\'t wait to see some actual architecture \n  when we get out of here."',"Somewhere in the distance, there are yells that rise in intensity, \n  then suddenly stop entirely.",'Briana turns to you with an intense whisper. \n  "You know, I _have_ a right to hate orcs." \n  \n  "I didn\'t know people need to have a right to hate them, to be honest." \n  \n  She observes you for a moment. "I\'m glad we are in agreement."',"More yells from the distance.","Briana stops and listens for a moment. \"Aren, we're pushing our luck. \n  I'd hate to go all this way only to get \n  my head smashed in by some random orc patrol."])
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
$.er=!1
$.r=C.i
$.fb=0
$.eC=null
$.hV=!1
$.rz=null
$.hX=!1
$.iu=!0
$.cr=!1
$.it=!1
$.v5=C.X
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
z="expando$key$"+z}return new P.ld(null,z,[P.t])},"hn","$get$hn",function(){return H.aR(H.d7({
toString:function(){return"$receiver$"}}))},"ho","$get$ho",function(){return H.aR(H.d7({$method$:null,
toString:function(){return"$receiver$"}}))},"hp","$get$hp",function(){return H.aR(H.d7(null))},"hq","$get$hq",function(){return H.aR(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"hu","$get$hu",function(){return H.aR(H.d7(void 0))},"hv","$get$hv",function(){return H.aR(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"hs","$get$hs",function(){return H.aR(H.ht(null))},"hr","$get$hr",function(){return H.aR(function(){try{null.$method$}catch(z){return z.message}}())},"hx","$get$hx",function(){return H.aR(H.ht(void 0))},"hw","$get$hw",function(){return H.aR(function(){try{(void 0).$method$}catch(z){return z.message}}())},"eg","$get$eg",function(){return P.qh()},"bm","$get$bm",function(){var z,y
z=P.au
y=new P.H(0,P.pU(),null,[z])
y.il(null,z)
return y},"bZ","$get$bZ",function(){return[]},"dj","$get$dj",function(){return new K.cc("fist",P.aE(C.a0,null))},"bL","$get$bL",function(){return N.bn("PlannerRecommendation")},"ig","$get$ig",function(){return new K.rT()},"ez","$get$ez",function(){var z=$.$get$ig()
return K.a1("__END_OF_ROAM__",z,z,null,null,[],"ground")},"a9","$get$a9",function(){return P.e5(null)},"bN","$get$bN",function(){return P.e5(null)},"iw","$get$iw",function(){return N.bn("Storyline")},"hb","$get$hb",function(){return P.bq("(\\w)([\\.\\?\\!])([\"'])\\.(?=$|\\s)",!0,!1)},"bA","$get$bA",function(){return L.ef(new L.tr())},"aM","$get$aM",function(){return L.ef(new L.tO())},"dm","$get$dm",function(){return L.ef(new L.tp())},"dY","$get$dY",function(){return new F.n1("Sometimes, patience pays off. Especially when the other option is potentially dangerous.",!1,!0,!1,null,null)},"ex","$get$ex",function(){return Y.c8(!1,"balance",!0,C.n,$.$get$aM())},"iA","$get$iA",function(){return Y.c8(!1,"pounding",!1,C.n,$.$get$aM())},"fS","$get$fS",function(){return new B.nD("Most moves are easier and more effective when you are firmly in balance.",!1,!0,!1,null,null)},"fW","$get$fW",function(){return new O.nT(null,!1,!0,!1,null,null)},"ha","$get$ha",function(){return new Q.oC(null,!1,!0,!0,C.c,null)},"hA","$get$hA",function(){return new M.pF("",!0,C.c,!1,!0,null)},"hW","$get$hW",function(){return P.e5(null)},"eY","$get$eY",function(){return new Z.jC(!1,!0,!1,null,null)},"iM","$get$iM",function(){return Y.c8(!1,"swing",!0,C.n,$.$get$aM())},"iL","$get$iL",function(){return Y.c8(!1,"swing",!0,C.n,$.$get$aM())},"iK","$get$iK",function(){return Y.c8(!1,"swing",!0,C.n,$.$get$aM())},"fI","$get$fI",function(){return X.fG(0,P.M)},"fJ","$get$fJ",function(){return X.fG(1,P.M)},"h4","$get$h4",function(){return new D.ox(!1,!1,!0,null,null)},"cA","$get$cA",function(){return G.pg(!1,!0,"Orcthorn",!0,2,2)},"ew","$get$ew",function(){return new O.pG(1e4)},"eq","$get$eq",function(){return Z.oB(!1,!1,"spear",!1,1)},"i9","$get$i9",function(){return K.a1("cave_with_agruth_pre",new V.tl(),new V.tm(),null,null,H.p([new Q.v("cave_with_agruth","","You look around.",null)],[Q.v]),"ground")},"i8","$get$i8",function(){return K.a1("cave_with_agruth",new V.tj(),new V.tk(),null,null,H.p([new Q.v("underground_church","Go to the Unholy Church","You make it to the Church undetected.",null),new Q.v("war_forge","Go to the war forges","You sneak your way through the black passage, closing towards the sound of hundreds of anvils.",null),new Q.v("slave_quarters_passage","Go to the slave quarters","You and Briana hug the wall and start towards the slave quarters.",null)],[Q.v]),"ground")},"fX","$get$fX",function(){return new V.oi("Search Agruth","search_agruth",!0,null)},"ih","$get$ih",function(){return K.a1("exit_from_bloodrock",new V.th(),new V.ti(),null,null,H.p([new Q.v("__END_OF_ROAM__"," (UNIMPLEMENTED)","...",null)],[Q.v]),"ground")},"ii","$get$ii",function(){return K.a1("forge_church_crevice",new V.te(),new V.tg(),null,null,H.p([new Q.v("tunnel","Continue along the crevice","You continue until the crevice open into a tunnel. You can smell fresh air.",null)],[Q.v]),"ground")},"is","$get$is",function(){return K.a1("guardpost_above_church",new V.tc(),new V.td(),null,null,H.p([new Q.v("underground_church","Descend towards the Underground Church","You take the passage leading down towards the temple.",null),new Q.v("tunnel","Go to the upper gate","You take the passage that leads upwards.",null),new Q.v("smelter","Go to the smelter","You take the slightly downwards passage towards the smelter.",null)],[Q.v]),"ground")},"fe","$get$fe",function(){return new V.lH("Cautiously take the shield","guardpost_above_church_take_shield",!0,null)},"iv","$get$iv",function(){return K.a1("just_after_agruth_fight",new V.ta(),new V.tb(),null,null,H.p([],[Q.v]),"ground")},"fz","$get$fz",function(){return new V.mD('"Luck Bringer"',"name_agruth_sword_opportunity",!0,null)},"fA","$get$fA",function(){return new V.mE('"Savior"',"name_agruth_sword_redemption",!0,null)},"fy","$get$fy",function(){return new V.mC("No name","name_agruth_sword_nothing",!0,null)},"iy","$get$iy",function(){return K.a1("orcthorn_door",new V.t8(),new V.t9(),null,null,H.p([new Q.v("cave_with_agruth","Go to the cave with Agruth's corpse","You back out from the door, and go back where you left Agruth's body.",null),new Q.v("slave_quarters","Go further towards the Gate of Screams","TODO",null),new Q.v("orcthorn_room","Open the door","You open the door.",null)],[Q.v]),"ground")},"iz","$get$iz",function(){return K.a1("orcthorn_room",new V.t6(),new V.t7(),O.wQ(),null,H.p([new Q.v("orcthorn_door","Exit the room","You go through the door. Once back in the corridor of the slave quarters, you close it behind you.",null)],[Q.v]),"ground")},"hg","$get$hg",function(){return new V.po("Search for Orcthorn","take_orcthorn",!0,null)},"iB","$get$iB",function(){return K.a1("slave_quarters",new V.t3(),new V.t5(),null,null,H.p([],[Q.v]),"ground")},"h2","$get$h2",function(){return new V.ov("Continue","slave_quarters_continue",!0,null)},"iC","$get$iC",function(){return K.a1("slave_quarters_passage",new V.t1(),new V.t2(),O.wR(),null,H.p([new Q.v("cave_with_agruth","Go back to the cave with Agruth's corpse","You back out from the door, and go back where you left Agruth's body.",null),new Q.v("slave_quarters","Go further towards the Gate of Screams","TODO",null),new Q.v("orcthorn_room","Open the door","You open the door.",null)],[Q.v]),"ground")},"h3","$get$h3",function(){return new V.ow("Examine the door","slave_quarters_passage_examine_door",!0,null)},"iD","$get$iD",function(){return K.a1("smelter",new V.t_(),new V.t0(),null,null,H.p([new Q.v("war_forge","Go to the war forges","You walk through a short passage set in stone, towards the sound of hundreds of anvils.",null),new Q.v("guardpost_above_church","Go through the smooth passage","You take the smooth passage and it leads you slightly upwards.",null)],[Q.v]),"ground")},"h5","$get$h5",function(){return new V.oz("Look around","smelter_look_around",!0,null)},"h6","$get$h6",function(){return new V.oA("Throw spear at the ogre","smelter_throw_spear",!0,null)},"iE","$get$iE",function(){return K.a1("start_adventure",new V.rY(),new V.rZ(),O.wO(),null,H.p([new Q.v("just_after_agruth_fight","","You look around. Fortunately, nobody is in sight.",null)],[Q.v]),"ground")},"hi","$get$hi",function(){return new V.pq("Talk to Briana","talk_to_briana_1",!0,null)},"hj","$get$hj",function(){return new V.pr("Talk to Briana","talk_to_briana_2",!0,null)},"hk","$get$hk",function(){return new V.ps("Talk to Briana","talk_to_briana_3",!0,null)},"iN","$get$iN",function(){return K.a1("the_shafts",new V.rW(),new V.rX(),null,null,H.p([new Q.v("tunnel","Run","You run over the passage. Orcs start to scream and yell commands. As you near the entrance, the air gets better.",null)],[Q.v]),"ground")},"iP","$get$iP",function(){return K.a1("tunnel",new V.tM(),new V.tN(),O.wP(),null,H.p([new Q.v("exit_from_bloodrock","Start running again","You start running again.",null)],[Q.v]),"ground")},"iQ","$get$iQ",function(){return K.a1("underground_church",new V.tB(),new V.tL(),null,null,H.p([new Q.v("guardpost_above_church","Enter the passage","You take the sloping passage and go a long, slightly rising way.",null),new Q.v("cave_with_agruth","Go back to the cave with Agruth's corpse","You sneak out of the church, back towards where you left Agruth's body.",null),new Q.v("underground_church_altar","Go towards the altar","You sneak towards the front of the temple, trying to stay in the shadows.",null)],[Q.v]),"ground")},"fa","$get$fa",function(){return new V.lc("Look around","examine_underground_church",!0,null)},"iR","$get$iR",function(){return K.a1("underground_church_altar",new V.tf(),new V.tq(),null,null,H.p([new Q.v("underground_church","Sneak back","You crouch low and, keeping an eye on the altar, head back to the Church's entrance.",null)],[Q.v]),"ground")},"hC","$get$hC",function(){return new V.pI("Wait","wait_for_ritual",!0,null)},"hh","$get$hh",function(){return new V.pp("Take the spear","take_spear_in_underground_church",!0,null)},"iS","$get$iS",function(){return K.a1("war_forge",new V.rU(),new V.t4(),null,null,H.p([new Q.v("smelter","Go to smelter","You keep low, ascending the stairs. At the top you sense a draft of hot air coming from a passage through the wall. You make your way through it.",null),new Q.v("cave_with_agruth","Go back to the cave with Agruth's corpse","You sneak back towards where you left Agruth's body.",null)],[Q.v]),"ground")},"hD","$get$hD",function(){return new V.pJ("Look around","war_forge_look_around",!0,null)},"hE","$get$hE",function(){return new V.pK("Watch the workers","war_forge_watch_workers",!0,null)},"i3","$get$i3",function(){return H.p([$.$get$i9(),$.$get$i8(),$.$get$ih(),$.$get$ii(),$.$get$is(),$.$get$iv(),$.$get$iy(),$.$get$iz(),$.$get$iB(),$.$get$iC(),$.$get$iD(),$.$get$iE(),$.$get$iN(),$.$get$iP(),$.$get$iQ(),$.$get$iR(),$.$get$iS()],[K.co])},"i2","$get$i2",function(){return H.p([$.$get$fX(),$.$get$fe(),$.$get$fz(),$.$get$fA(),$.$get$fy(),$.$get$hg(),$.$get$h2(),$.$get$h3(),$.$get$h5(),$.$get$h6(),$.$get$hi(),$.$get$hj(),$.$get$hk(),$.$get$fa(),$.$get$hC(),$.$get$hh(),$.$get$hD(),$.$get$hE()],[A.W])},"dq","$get$dq",function(){return P.pe("")},"cy","$get$cy",function(){var z=new O.ne(0,null,"PointsCounter")
z.ib()
return z},"c_","$get$c_",function(){return new L.f3(null,H.p([],[L.ac]))},"cD","$get$cD",function(){return H.fp(P.q,P.d)},"cx","$get$cx",function(){return P.bb(null,{func:1,ret:[P.Q,P.au]})},"cN","$get$cN",function(){return P.bq("^\\s*<<<\\s*$",!0,!1)},"d5","$get$d5",function(){return H.fp(P.q,Z.av)},"fw","$get$fw",function(){return N.bn("")},"fv","$get$fv",function(){return P.dN(P.q,N.dP)}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=[null,!1]
init.types=[{func:1,args:[,]},{func:1,ret:P.q,args:[R.A,A.a4,Y.a3]},{func:1},{func:1,args:[,,,]},{func:1,ret:Q.z,args:[R.A]},{func:1,args:[R.A,A.a4,Y.a3]},{func:1,args:[,,]},{func:1,v:true},{func:1,v:true,args:[R.A,A.a4,Y.a3,R.A,S.ae]},{func:1,args:[P.t]},{func:1,ret:R.A,args:[A.a4]},{func:1,v:true,args:[R.A,A.a4,Y.a3,R.A,,]},{func:1,ret:U.cS,args:[A.a4,F.J,[P.B,R.A]]},{func:1,args:[U.ca]},{func:1,ret:P.q,args:[P.t]},{func:1,v:true,args:[{func:1,v:true}]},{func:1,v:true,args:[P.q]},{func:1,args:[,P.b2]},{func:1,v:true,args:[P.d],opt:[P.b2]},{func:1,args:[P.aX]},{func:1,ret:P.Q},{func:1,v:true,args:[P.d]},{func:1,ret:Y.aD,args:[P.t]},{func:1,ret:P.q,args:[P.q]},{func:1,args:[R.A]},{func:1,ret:P.X,args:[R.A,R.A]},{func:1,args:[,,,,]},{func:1,args:[Z.av]},{func:1,ret:P.M,args:[A.aq]},{func:1,ret:Q.cd,args:[U.ad]},{func:1,args:[P.M,R.A]},{func:1,args:[P.X]},{func:1,ret:P.M,args:[A.cG]},{func:1,args:[P.t,,]},{func:1,v:true,args:[P.t]},{func:1,ret:P.X,args:[L.ac]},{func:1,v:true,args:[[P.N,P.q],P.fY]},{func:1,args:[L.ac]},{func:1,args:[P.q,,]},{func:1,args:[P.q,Z.d4]},{func:1,v:true,args:[,P.b2]},{func:1,args:[[P.N,Y.ah],Y.ah]},{func:1,ret:P.t,args:[P.V,P.V]},{func:1,args:[Y.ah]},{func:1,ret:P.M,args:[P.M,P.M]},{func:1,ret:P.t,args:[P.t,P.t]},{func:1,args:[P.bo]},{func:1,args:[{func:1,v:true}]},{func:1,v:true,args:[P.d,P.b2]},{func:1,ret:P.q,args:[Q.ag]},{func:1,ret:Q.c9,args:[Q.v]},{func:1,ret:P.X,args:[P.t]},{func:1,args:[,],opt:[,]},{func:1,ret:L.ac,args:[P.q],named:{deferToChoiceList:P.X,deferToEndOfPage:P.X,goto:P.q,helpMessage:P.q,script:{func:1,ret:[P.Q,P.au]},submenu:P.q}},{func:1,ret:[P.Q,U.cp],args:[P.aX,P.q],named:{rerollEffectDescription:P.q,rerollable:P.X}}]
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
if(x==y)H.wK(d||a)
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