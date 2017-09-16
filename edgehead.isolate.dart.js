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
if(b5.$isb_)b5.$deferredAction()}var a3=Object.keys(a4.pending)
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
e.$callName=null}}function tearOffGetter(c,d,e,f){return f?new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"(x) {"+"if (c === null) c = "+"H.ev"+"("+"this, funcs, reflectionInfo, false, [x], name);"+"return new c(this, funcs[0], x, name);"+"}")(c,d,e,H,null):new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"() {"+"if (c === null) c = "+"H.ev"+"("+"this, funcs, reflectionInfo, false, [], name);"+"return new c(this, funcs[0], null, name);"+"}")(c,d,e,H,null)}function tearOff(c,d,e,f,a0){var g
return e?function(){if(g===void 0)g=H.ev(this,c,d,true,[],f).prototype
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
var dart=[["","",,H,{"^":"",x1:{"^":"d;a"}}],["","",,J,{"^":"",
o:function(a){return void 0},
b_:{"^":"d;",
A:function(a,b){return a===b},
gB:function(a){return H.aC(a)},
k:function(a){return H.cZ(a)},
gby:function(a){return new H.av(H.io(a),null)}},
fg:{"^":"b_;",
k:function(a){return String(a)},
gB:function(a){return a?519018:218159},
gby:function(a){return C.ac},
$isX:1},
fj:{"^":"b_;",
A:function(a,b){return null==b},
k:function(a){return"null"},
gB:function(a){return 0},
gby:function(a){return C.aa},
$isat:1},
fm:{"^":"b_;",
gB:function(a){return 0},
gby:function(a){return C.a9},
k:function(a){return String(a)},
$isfk:1},
x8:{"^":"fm;"},
bt:{"^":"fm;"},
cg:{"^":"b_;$ti",
fV:function(a,b){if(!!a.immutable$list)throw H.c(new P.S(b))},
cP:function(a,b){if(!!a.fixed$length)throw H.c(new P.S(b))},
q:function(a,b){this.cP(a,"add")
a.push(b)},
hq:function(a){this.cP(a,"removeLast")
if(a.length===0)throw H.c(H.aI(a,-1))
return a.pop()},
a3:function(a,b){var z
this.cP(a,"remove")
for(z=0;z<a.length;++z)if(J.e(a[z],b)){a.splice(z,1)
return!0}return!1},
j1:function(a,b,c){var z,y,x,w,v
z=[]
y=a.length
for(x=0;x<y;++x){w=a[x]
if(b.$1(w)!==!0===c)z.push(w)
if(a.length!==y)throw H.c(new P.D(a))}v=z.length
if(v===y)return
this.sl(a,v)
for(x=0;x<z.length;++x)a[x]=z[x]},
c7:function(a,b){return new H.K(a,b,[H.l(a,0)])},
aw:function(a,b){var z
this.cP(a,"addAll")
for(z=J.ai(b);z.u();)a.push(z.d)},
Z:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){b.$1(a[y])
if(a.length!==z)throw H.c(new P.D(a))}},
aJ:function(a,b){return new H.aq(a,b,[H.l(a,0),null])},
dZ:function(a,b){return H.hd(a,b,null,H.l(a,0))},
bv:function(a,b,c){var z,y,x
z=a.length
for(y=b,x=0;x<z;++x){y=c.$2(y,a[x])
if(a.length!==z)throw H.c(new P.D(a))}return y},
aT:function(a,b,c){var z,y,x
z=a.length
for(y=0;y<z;++y){x=a[y]
if(b.$1(x)===!0)return x
if(a.length!==z)throw H.c(new P.D(a))}throw H.c(H.aj())},
ck:function(a,b){return this.aT(a,b,null)},
at:function(a,b){if(b>>>0!==b||b>=a.length)return H.f(a,b)
return a[b]},
geH:function(a){if(a.length>0)return a[0]
throw H.c(H.aj())},
gw:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.c(H.aj())},
gcb:function(a){var z=a.length
if(z===1){if(0>=z)return H.f(a,0)
return a[0]}if(z===0)throw H.c(H.aj())
throw H.c(H.dC())},
b6:function(a,b,c,d,e){var z,y,x
this.fV(a,"setRange")
P.cm(b,c,a.length,null,null,null)
z=c-b
if(z===0)return
if(e<0)H.i(P.a7(e,0,null,"skipCount",null))
if(e+z>d.length)throw H.c(H.ff())
if(e<b)for(y=z-1;y>=0;--y){x=e+y
if(x>>>0!==x||x>=d.length)return H.f(d,x)
a[b+y]=d[x]}else for(y=0;y<z;++y){x=e+y
if(x>>>0!==x||x>=d.length)return H.f(d,x)
a[b+y]=d[x]}},
bs:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){if(b.$1(a[y])===!0)return!0
if(a.length!==z)throw H.c(new P.D(a))}return!1},
cc:function(a,b){var z
this.fV(a,"sort")
z=b==null?P.tP():b
H.cq(a,0,a.length-1,z)},
f9:function(a){return this.cc(a,null)},
bP:function(a,b,c){var z
if(c>=a.length)return-1
for(z=c;z<a.length;++z)if(J.e(a[z],b))return z
return-1},
b1:function(a,b){return this.bP(a,b,0)},
a7:function(a,b){var z
for(z=0;z<a.length;++z)if(J.e(a[z],b))return!0
return!1},
gX:function(a){return a.length===0},
gau:function(a){return a.length!==0},
k:function(a){return P.cf(a,"[","]")},
bG:function(a){return P.b9(a,H.l(a,0))},
ga_:function(a){return new J.bk(a,a.length,0,null,[H.l(a,0)])},
gB:function(a){return H.aC(a)},
gl:function(a){return a.length},
sl:function(a,b){this.cP(a,"set length")
if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(P.cG(b,"newLength",null))
if(b<0)throw H.c(P.a7(b,0,null,"newLength",null))
a.length=b},
j:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(H.aI(a,b))
if(b>=a.length||b<0)throw H.c(H.aI(a,b))
return a[b]},
n:function(a,b,c){if(!!a.immutable$list)H.i(new P.S("indexed set"))
if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(H.aI(a,b))
if(b>=a.length||b<0)throw H.c(H.aI(a,b))
a[b]=c},
$iscV:1,
$ascV:I.bg,
$isN:1,
$isa_:1},
x0:{"^":"cg;$ti"},
bk:{"^":"d;a,b,c,d,$ti",
gS:function(){return this.d},
u:function(){var z,y,x
z=this.a
y=z.length
if(this.b!==y)throw H.c(H.as(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z[x]
this.c=x+1
return!0}},
ch:{"^":"b_;",
bD:function(a,b){var z
if(typeof b!=="number")throw H.c(H.T(b))
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){z=this.gdD(b)
if(this.gdD(a)===z)return 0
if(this.gdD(a))return-1
return 1}return 0}else if(isNaN(a)){if(isNaN(b))return 0
return 1}else return-1},
gdD:function(a){return a===0?1/a<0:a<0},
hv:function(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw H.c(new P.S(""+a+".round()"))},
l0:function(a){return a},
bh:function(a,b){var z
if(b>20)throw H.c(P.a7(b,0,20,"fractionDigits",null))
z=a.toFixed(b)
if(a===0&&this.gdD(a))return"-"+z
return z},
l3:function(a,b){var z,y,x,w
if(b<2||b>36)throw H.c(P.a7(b,2,36,"radix",null))
z=a.toString(b)
if(C.b.cQ(z,z.length-1)!==41)return z
y=/^([\da-z]+)(?:\.([\da-z]+))?\(e\+(\d+)\)$/.exec(z)
if(y==null)H.i(new P.S("Unexpected toString result: "+z))
x=J.L(y)
z=x.j(y,1)
w=+x.j(y,3)
if(x.j(y,2)!=null){z+=x.j(y,2)
w-=x.j(y,2).length}return z+C.b.c9("0",w)},
k:function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gB:function(a){return a&0x1FFFFFFF},
f5:function(a){return-a},
ai:function(a,b){if(typeof b!=="number")throw H.c(H.T(b))
return a+b},
as:function(a,b){if(typeof b!=="number")throw H.c(H.T(b))
return a-b},
d7:function(a,b){if(typeof b!=="number")throw H.c(H.T(b))
return a/b},
c9:function(a,b){if(typeof b!=="number")throw H.c(H.T(b))
return a*b},
bL:function(a,b){return(a|0)===a?a/b|0:this.ja(a,b)},
ja:function(a,b){var z=a/b
if(z>=-2147483648&&z<=2147483647)return z|0
if(z>0){if(z!==1/0)return Math.floor(z)}else if(z>-1/0)return Math.ceil(z)
throw H.c(new P.S("Result of truncating division is "+H.b(z)+": "+H.b(a)+" ~/ "+b))},
dt:function(a,b){var z
if(a>0)z=b>31?0:a>>>b
else{z=b>31?31:b
z=a>>z>>>0}return z},
aZ:function(a,b){if(typeof b!=="number")throw H.c(H.T(b))
return a<b},
bi:function(a,b){if(typeof b!=="number")throw H.c(H.T(b))
return a>b},
d9:function(a,b){if(typeof b!=="number")throw H.c(H.T(b))
return a<=b},
bS:function(a,b){if(typeof b!=="number")throw H.c(H.T(b))
return a>=b},
gby:function(a){return C.af},
$isM:1},
fi:{"^":"ch;",
gby:function(a){return C.ae},
$isaX:1,
$isM:1,
$ist:1},
fh:{"^":"ch;",
gby:function(a){return C.ad},
$isaX:1,
$isM:1},
ci:{"^":"b_;",
cQ:function(a,b){if(b<0)throw H.c(H.aI(a,b))
if(b>=a.length)H.i(H.aI(a,b))
return a.charCodeAt(b)},
cB:function(a,b){if(b>=a.length)throw H.c(H.aI(a,b))
return a.charCodeAt(b)},
dv:function(a,b,c){if(c>b.length)throw H.c(P.a7(c,0,b.length,null,null))
return new H.rc(b,a,c)},
ez:function(a,b){return this.dv(a,b,0)},
he:function(a,b,c){var z,y
if(c<0||c>b.length)throw H.c(P.a7(c,0,b.length,null,null))
z=a.length
if(c+z>b.length)return
for(y=0;y<z;++y)if(this.cQ(b,c+y)!==this.cB(a,y))return
return new H.hc(c,b,a)},
ai:function(a,b){if(typeof b!=="string")throw H.c(P.cG(b,null,null))
return a+b},
eF:function(a,b){var z,y
z=b.length
y=a.length
if(z>y)return!1
return b===this.bJ(a,y-z)},
kO:function(a,b,c){H.bz(c)
return H.n(a,b,c)},
kP:function(a,b,c,d){H.bz(c)
P.nx(d,0,a.length,"startIndex",null)
return H.iH(a,b,c,d)},
d_:function(a,b,c){return this.kP(a,b,c,0)},
i2:function(a,b,c){var z
if(c>a.length)throw H.c(P.a7(c,0,a.length,null,null))
if(typeof b==="string"){z=c+b.length
if(z>a.length)return!1
return b===a.substring(c,z)}return J.iY(b,a,c)!=null},
dg:function(a,b){return this.i2(a,b,0)},
aL:function(a,b,c){if(c==null)c=a.length
if(typeof c!=="number"||Math.floor(c)!==c)H.i(H.T(c))
if(b<0)throw H.c(P.cl(b,null,null))
if(typeof c!=="number")return H.x(c)
if(b>c)throw H.c(P.cl(b,null,null))
if(c>a.length)throw H.c(P.cl(c,null,null))
return a.substring(b,c)},
bJ:function(a,b){return this.aL(a,b,null)},
f_:function(a){var z,y,x,w,v
z=a.trim()
y=z.length
if(y===0)return z
if(this.cB(z,0)===133){x=J.dD(z,1)
if(x===y)return""}else x=0
w=y-1
v=this.cQ(z,w)===133?J.m4(z,w):y
if(x===0&&v===y)return z
return z.substring(x,v)},
l4:function(a){var z,y
if(typeof a.trimLeft!="undefined"){z=a.trimLeft()
if(z.length===0)return z
y=this.cB(z,0)===133?J.dD(z,1):0}else{y=J.dD(a,0)
z=a}if(y===0)return z
if(y===z.length)return""
return z.substring(y)},
c9:function(a,b){var z,y
if(0>=b)return""
if(b===1||a.length===0)return a
if(b!==b>>>0)throw H.c(C.L)
for(z=a,y="";!0;){if((b&1)===1)y=z+y
b=b>>>1
if(b===0)break
z+=z}return y},
bP:function(a,b,c){var z
if(c>a.length)throw H.c(P.a7(c,0,a.length,null,null))
z=a.indexOf(b,c)
return z},
b1:function(a,b){return this.bP(a,b,0)},
kv:function(a,b,c){var z
c=a.length
z=b.length
if(c+z>c)c-=z
return a.lastIndexOf(b,c)},
ku:function(a,b){return this.kv(a,b,null)},
jA:function(a,b,c){if(b==null)H.i(H.T(b))
if(c>a.length)throw H.c(P.a7(c,0,a.length,null,null))
return H.wt(a,b,c)},
a7:function(a,b){return this.jA(a,b,0)},
gX:function(a){return a.length===0},
gau:function(a){return a.length!==0},
bD:function(a,b){var z
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
gby:function(a){return C.ab},
gl:function(a){return a.length},
j:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(H.aI(a,b))
if(b>=a.length||b<0)throw H.c(H.aI(a,b))
return a[b]},
$iscV:1,
$ascV:I.bg,
$isr:1,
$isdX:1,
v:{
fl:function(a){if(a<256)switch(a){case 9:case 10:case 11:case 12:case 13:case 32:case 133:case 160:return!0
default:return!1}switch(a){case 5760:case 8192:case 8193:case 8194:case 8195:case 8196:case 8197:case 8198:case 8199:case 8200:case 8201:case 8202:case 8232:case 8233:case 8239:case 8287:case 12288:case 65279:return!0
default:return!1}},
dD:function(a,b){var z,y
for(z=a.length;b<z;){y=C.b.cB(a,b)
if(y!==32&&y!==13&&!J.fl(y))break;++b}return b},
m4:function(a,b){var z,y
for(;b>0;b=z){z=b-1
y=C.b.cQ(a,z)
if(y!==32&&y!==13&&!J.fl(y))break}return b}}}}],["","",,H,{"^":"",
hQ:function(a){return a},
aj:function(){return new P.w("No element")},
dC:function(){return new P.w("Too many elements")},
ff:function(){return new P.w("Too few elements")},
cq:function(a,b,c,d){if(c-b<=32)H.h6(a,b,c,d)
else H.h5(a,b,c,d)},
h6:function(a,b,c,d){var z,y,x,w,v
for(z=b+1,y=J.L(a);z<=c;++z){x=y.j(a,z)
w=z
while(!0){if(!(w>b&&J.aa(d.$2(y.j(a,w-1),x),0)))break
v=w-1
y.n(a,w,y.j(a,v))
w=v}y.n(a,w,x)}},
h5:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
z=C.e.bL(c-b+1,6)
y=b+z
x=c-z
w=C.e.bL(b+c,2)
v=w-z
u=w+z
t=J.L(a)
s=t.j(a,y)
r=t.j(a,v)
q=t.j(a,w)
p=t.j(a,u)
o=t.j(a,x)
if(J.aa(d.$2(s,r),0)){n=r
r=s
s=n}if(J.aa(d.$2(p,o),0)){n=o
o=p
p=n}if(J.aa(d.$2(s,q),0)){n=q
q=s
s=n}if(J.aa(d.$2(r,q),0)){n=q
q=r
r=n}if(J.aa(d.$2(s,p),0)){n=p
p=s
s=n}if(J.aa(d.$2(q,p),0)){n=p
p=q
q=n}if(J.aa(d.$2(r,o),0)){n=o
o=r
r=n}if(J.aa(d.$2(r,q),0)){n=q
q=r
r=n}if(J.aa(d.$2(p,o),0)){n=o
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
if(h.bi(i,0)){--l
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
t.n(a,m,j)}++m}else if(J.aa(d.$2(j,p),0))for(;!0;)if(J.aa(d.$2(t.j(a,l),p),0)){--l
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
ga_:function(a){return new H.dM(this,this.gl(this),0,null,[H.y(this,"b1",0)])},
Z:function(a,b){var z,y
z=this.gl(this)
for(y=0;y<z;++y){b.$1(this.at(0,y))
if(z!==this.gl(this))throw H.c(new P.D(this))}},
gX:function(a){return this.gl(this)===0},
gw:function(a){if(this.gl(this)===0)throw H.c(H.aj())
return this.at(0,this.gl(this)-1)},
a7:function(a,b){var z,y
z=this.gl(this)
for(y=0;y<z;++y){if(J.e(this.at(0,y),b))return!0
if(z!==this.gl(this))throw H.c(new P.D(this))}return!1},
bs:function(a,b){var z,y
z=this.gl(this)
for(y=0;y<z;++y){if(b.$1(this.at(0,y))===!0)return!0
if(z!==this.gl(this))throw H.c(new P.D(this))}return!1},
aT:function(a,b,c){var z,y,x
z=this.gl(this)
for(y=0;y<z;++y){x=this.at(0,y)
if(b.$1(x)===!0)return x
if(z!==this.gl(this))throw H.c(new P.D(this))}return c.$0()},
cl:function(a,b){var z,y,x,w
z=this.gl(this)
if(b.length!==0){if(z===0)return""
y=H.b(this.at(0,0))
if(z!==this.gl(this))throw H.c(new P.D(this))
for(x=y,w=1;w<z;++w){x=x+b+H.b(this.at(0,w))
if(z!==this.gl(this))throw H.c(new P.D(this))}return x.charCodeAt(0)==0?x:x}else{for(w=0,x="";w<z;++w){x+=H.b(this.at(0,w))
if(z!==this.gl(this))throw H.c(new P.D(this))}return x.charCodeAt(0)==0?x:x}},
c7:function(a,b){return this.dh(0,b)},
aJ:function(a,b){return new H.aq(this,b,[H.y(this,"b1",0),null])},
bv:function(a,b,c){var z,y,x
z=this.gl(this)
for(y=b,x=0;x<z;++x){y=c.$2(y,this.at(0,x))
if(z!==this.gl(this))throw H.c(new P.D(this))}return y},
bF:function(a,b){var z,y,x,w
z=[H.y(this,"b1",0)]
if(b){y=H.p([],z)
C.a.sl(y,this.gl(this))}else{x=new Array(this.gl(this))
x.fixed$length=Array
y=H.p(x,z)}for(w=0;w<this.gl(this);++w){z=this.at(0,w)
if(w>=y.length)return H.f(y,w)
y[w]=z}return y},
cu:function(a){return this.bF(a,!0)},
bG:function(a){var z,y
z=P.a5(null,null,null,H.y(this,"b1",0))
for(y=0;y<this.gl(this);++y)z.q(0,this.at(0,y))
return z}},
pd:{"^":"b1;a,b,c,$ti",
giD:function(){var z=J.aM(this.a)
return z},
gj8:function(){var z,y
z=J.aM(this.a)
y=this.b
if(y>z)return z
return y},
gl:function(a){var z,y
z=J.aM(this.a)
y=this.b
if(y>=z)return 0
return z-y},
at:function(a,b){var z,y
z=this.gj8()+b
if(!(b<0)){y=this.giD()
if(typeof y!=="number")return H.x(y)
y=z>=y}else y=!0
if(y)throw H.c(P.cS(b,this,"index",null,null))
return J.eP(this.a,z)},
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
t=H.p(s,u)}for(r=0;r<v;++r){u=x.at(y,z+r)
if(r>=t.length)return H.f(t,r)
t[r]=u
if(x.gl(y)<w)throw H.c(new P.D(this))}return t},
ie:function(a,b,c,d){var z=this.b
if(z<0)H.i(P.a7(z,0,null,"start",null))},
v:{
hd:function(a,b,c,d){var z=new H.pd(a,b,c,[d])
z.ie(a,b,c,d)
return z}}},
dM:{"^":"d;a,b,c,d,$ti",
gS:function(){return this.d},
u:function(){var z,y,x
z=this.a
y=z.gl(z)
if(this.b!==y)throw H.c(new P.D(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z.at(0,x);++this.c
return!0}},
dP:{"^":"B;a,b,$ti",
ga_:function(a){return new H.mz(null,J.ai(this.a),this.b,this.$ti)},
gl:function(a){return J.aM(this.a)},
gX:function(a){return J.eQ(this.a)},
gw:function(a){return this.b.$1(J.iV(this.a))},
$asB:function(a,b){return[b]},
v:{
bI:function(a,b,c,d){if(!!J.o(a).$isa_)return new H.bG(a,b,[c,d])
return new H.dP(a,b,[c,d])}}},
bG:{"^":"dP;a,b,$ti",$isa_:1,
$asa_:function(a,b){return[b]}},
mz:{"^":"cU;a,b,c,$ti",
u:function(){var z=this.b
if(z.u()){this.a=this.c.$1(z.gS())
return!0}this.a=null
return!1},
gS:function(){return this.a},
$ascU:function(a,b){return[b]}},
aq:{"^":"b1;a,b,$ti",
gl:function(a){return J.aM(this.a)},
at:function(a,b){return this.b.$1(J.eP(this.a,b))},
$asb1:function(a,b){return[b]},
$asa_:function(a,b){return[b]},
$asB:function(a,b){return[b]}},
K:{"^":"B;a,b,$ti",
ga_:function(a){return new H.bT(J.ai(this.a),this.b,this.$ti)},
aJ:function(a,b){return new H.dP(this,b,[H.l(this,0),null])}},
bT:{"^":"cU;a,b,$ti",
u:function(){var z,y
for(z=this.a,y=this.b;z.u();)if(y.$1(z.gS())===!0)return!0
return!1},
gS:function(){return this.a.gS()}},
fY:{"^":"B;a,b,$ti",
ga_:function(a){return new H.oq(J.ai(this.a),this.b,this.$ti)},
v:{
op:function(a,b,c){if(!!J.o(a).$isa_)return new H.l5(a,H.hQ(b),[c])
return new H.fY(a,H.hQ(b),[c])}}},
l5:{"^":"fY;a,b,$ti",
gl:function(a){var z=J.aM(this.a)-this.b
if(z>=0)return z
return 0},
$isa_:1},
oq:{"^":"cU;a,b,$ti",
u:function(){var z,y
for(z=this.a,y=0;y<this.b;++y)z.u()
this.b=0
return z.u()},
gS:function(){return this.a.gS()}},
l6:{"^":"d;$ti",
u:function(){return!1},
gS:function(){return}}}],["","",,H,{"^":"",
cw:function(a,b){var z=a.cS(b)
if(!init.globalState.d.cy)init.globalState.f.bx()
return z},
iE:function(a,b){var z,y,x,w,v,u
z={}
z.a=b
if(b==null){b=[]
z.a=b
y=b}else y=b
if(!J.o(y).$isN)throw H.c(P.G("Arguments to main must be a List: "+H.b(y)))
init.globalState=new H.qZ(0,0,1,null,null,null,null,null,null,null,null,null,a)
y=init.globalState
x=self.window==null
w=self.Worker
v=x&&!!self.postMessage
y.x=v
v=!v
if(v)w=w!=null&&$.$get$fd()!=null
else w=!0
y.y=w
y.r=x&&v
y.f=new H.qy(P.bb(null,H.cu),0)
x=P.t
y.z=new H.R(0,null,null,null,null,null,0,[x,H.ek])
y.ch=new H.R(0,null,null,null,null,null,0,[x,null])
if(y.x===!0){w=new H.qY()
y.Q=w
self.onmessage=function(c,d){return function(e){c(d,e)}}(H.lX,w)
self.dartPrint=self.dartPrint||function(c){return function(d){if(self.console&&self.console.log)self.console.log(d)
else self.postMessage(c(d))}}(H.r_)}if(init.globalState.x===!0)return
y=init.globalState.a++
w=P.a5(null,null,null,x)
v=new H.cn(0,null,!1)
u=new H.ek(y,new H.R(0,null,null,null,null,null,0,[x,H.cn]),w,init.createNewIsolate(),v,new H.bl(H.dm()),new H.bl(H.dm()),!1,!1,[],P.a5(null,null,null,null),null,null,!1,!0,P.a5(null,null,null,null))
w.q(0,0)
u.e1(0,v)
init.globalState.e=u
init.globalState.d=u
if(H.ay(a,{func:1,args:[,]}))u.cS(new H.vy(z,a))
else if(H.ay(a,{func:1,args:[,,]}))u.cS(new H.vz(z,a))
else u.cS(a)
init.globalState.f.bx()},
m0:function(){var z=init.currentScript
if(z!=null)return String(z.src)
if(init.globalState.x===!0)return H.m1()
return},
m1:function(){var z,y
z=new Error().stack
if(z==null){z=function(){try{throw new Error()}catch(x){return x.stack}}()
if(z==null)throw H.c(new P.S("No stack trace"))}y=z.match(new RegExp("^ *at [^(]*\\((.*):[0-9]*:[0-9]*\\)$","m"))
if(y!=null)return y[1]
y=z.match(new RegExp("^[^@]*@(.*):[0-9]*$","m"))
if(y!=null)return y[1]
throw H.c(new P.S('Cannot extract URI from "'+z+'"'))},
lX:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=new H.d8(!0,[]).bY(b.data)
y=J.L(z)
switch(y.j(z,"command")){case"start":init.globalState.b=y.j(z,"id")
x=y.j(z,"functionName")
w=x==null?init.globalState.cx:init.globalFunctions[x]()
v=y.j(z,"args")
u=new H.d8(!0,[]).bY(y.j(z,"msg"))
t=y.j(z,"isSpawnUri")
s=y.j(z,"startPaused")
r=new H.d8(!0,[]).bY(y.j(z,"replyTo"))
y=init.globalState.a++
q=P.t
p=P.a5(null,null,null,q)
o=new H.cn(0,null,!1)
n=new H.ek(y,new H.R(0,null,null,null,null,null,0,[q,H.cn]),p,init.createNewIsolate(),o,new H.bl(H.dm()),new H.bl(H.dm()),!1,!1,[],P.a5(null,null,null,null),null,null,!1,!0,P.a5(null,null,null,null))
p.q(0,0)
n.e1(0,o)
init.globalState.f.a.aC(new H.cu(n,new H.lY(w,v,u,t,s,r),"worker-start"))
init.globalState.d=n
init.globalState.f.bx()
break
case"spawn-worker":break
case"message":if(y.j(z,"port")!=null)y.j(z,"port").F(y.j(z,"msg"))
init.globalState.f.bx()
break
case"close":init.globalState.ch.a3(0,$.$get$fe().j(0,a))
a.terminate()
init.globalState.f.bx()
break
case"log":H.lW(y.j(z,"msg"))
break
case"print":if(init.globalState.x===!0){y=init.globalState.Q
q=P.ad(["command","print","msg",z])
q=new H.bv(!0,P.bW(null,P.t)).bp(q)
y.toString
self.postMessage(q)}else P.eC(y.j(z,"msg"))
break
case"error":throw H.c(y.j(z,"msg"))}},
lW:function(a){var z,y,x,w
if(init.globalState.x===!0){y=init.globalState.Q
x=P.ad(["command","log","msg",a])
x=new H.bv(!0,P.bW(null,P.t)).bp(x)
y.toString
self.postMessage(x)}else try{self.console.log(a)}catch(w){H.C(w)
z=H.E(w)
y=P.cQ(z)
throw H.c(y)}},
lZ:function(a,b,c,d,e,f){var z,y,x,w
z=init.globalState.d
y=z.a
$.fI=$.fI+("_"+y)
$.fJ=$.fJ+("_"+y)
y=z.e
x=init.globalState.d.a
w=z.f
f.F(["spawned",new H.cv(y,x),w,z.r])
x=new H.m_(a,b,c,d,z)
if(e===!0){z.fR(w,w)
init.globalState.f.a.aC(new H.cu(z,x,"start isolate"))}else x.$0()},
rt:function(a){return new H.d8(!0,[]).bY(new H.bv(!1,P.bW(null,P.t)).bp(a))},
vy:{"^":"a:2;a,b",
$0:function(){this.b.$1(this.a.a)}},
vz:{"^":"a:2;a,b",
$0:function(){this.b.$2(this.a.a,null)}},
qZ:{"^":"d;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",v:{
r_:function(a){var z=P.ad(["command","print","msg",a])
return new H.bv(!0,P.bW(null,P.t)).bp(z)}}},
ek:{"^":"d;i:a<,b,c,ks:d<,jC:e<,f,r,x,cV:y<,z,Q,ch,cx,cy,db,dx",
fR:function(a,b){if(!this.f.A(0,a))return
if(this.Q.q(0,b)&&!this.y)this.y=!0
this.cM()},
kN:function(a){var z,y,x
if(!this.y)return
z=this.Q
z.a3(0,a)
if(z.a===0){for(z=this.z;y=z.length,y!==0;){if(0>=y)return H.f(z,-1)
x=z.pop()
init.globalState.f.a.fP(x)}this.y=!1}this.cM()},
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
hV:function(a,b){if(!this.r.A(0,a))return
this.db=b},
k0:function(a,b,c){var z=J.o(b)
if(!z.A(b,0))z=z.A(b,1)&&!this.cy
else z=!0
if(z){a.F(c)
return}z=this.cx
if(z==null){z=P.bb(null,null)
this.cx=z}z.aC(new H.qP(a,c))},
k_:function(a,b){var z
if(!this.r.A(0,a))return
z=J.o(b)
if(!z.A(b,0))z=z.A(b,1)&&!this.cy
else z=!0
if(z){this.eO()
return}z=this.cx
if(z==null){z=P.bb(null,null)
this.cx=z}z.aC(this.gkt())},
k5:function(a,b){var z,y,x
z=this.dx
if(z.a===0){if(this.db===!0&&this===init.globalState.e)return
if(self.console&&self.console.error)self.console.error(a,b)
else{P.eC(a)
if(b!=null)P.eC(b)}return}y=new Array(2)
y.fixed$length=Array
y[0]=J.h(a)
y[1]=b==null?null:J.h(b)
for(x=new P.af(z,z.r,null,null,[null]),x.c=z.e;x.u();)x.d.F(y)},
cS:function(a){var z,y,x,w,v,u,t
z=init.globalState.d
init.globalState.d=this
$=this.d
y=null
x=this.cy
this.cy=!0
try{y=a.$0()}catch(u){w=H.C(u)
v=H.E(u)
this.k5(w,v)
if(this.db===!0){this.eO()
if(this===init.globalState.e)throw u}}finally{this.cy=x
init.globalState.d=z
if(z!=null)$=z.gks()
if(this.cx!=null)for(;t=this.cx,!t.gX(t);)this.cx.dJ().$0()}return y},
co:function(a){return this.b.j(0,a)},
e1:function(a,b){var z=this.b
if(z.ac(a))throw H.c(P.cQ("Registry: ports must be registered only once."))
z.n(0,a,b)},
cM:function(){var z=this.b
if(z.gl(z)-this.c.a>0||this.y||!this.x)init.globalState.z.n(0,this.a,this)
else this.eO()},
eO:[function(){var z,y,x,w,v
z=this.cx
if(z!=null)z.bg(0)
for(z=this.b,y=z.gcv(),y=y.ga_(y);y.u();)y.gS().iw()
z.bg(0)
this.c.bg(0)
init.globalState.z.a3(0,this.a)
this.dx.bg(0)
if(this.ch!=null){for(x=0;z=this.ch,y=z.length,x<y;x+=2){w=z[x]
v=x+1
if(v>=y)return H.f(z,v)
w.F(z[v])}this.ch=null}},"$0","gkt",0,0,7]},
qP:{"^":"a:7;a,b",
$0:function(){this.a.F(this.b)}},
qy:{"^":"d;a,b",
jH:function(){var z=this.a
if(z.b===z.c)return
return z.dJ()},
hy:function(){var z,y,x
z=this.jH()
if(z==null){if(init.globalState.e!=null)if(init.globalState.z.ac(init.globalState.e.a))if(init.globalState.r===!0){y=init.globalState.e.b
y=y.gX(y)}else y=!1
else y=!1
else y=!1
if(y)H.i(P.cQ("Program exited with open ReceivePorts."))
y=init.globalState
if(y.x===!0){x=y.z
x=x.gX(x)&&y.f.b===0}else x=!1
if(x){y=y.Q
x=P.ad(["command","close"])
x=new H.bv(!0,new P.hL(0,null,null,null,null,null,0,[null,P.t])).bp(x)
y.toString
self.postMessage(x)}return!1}z.kJ()
return!0},
fK:function(){if(self.window!=null)new H.qz(this).$0()
else for(;this.hy(););},
bx:function(){var z,y,x,w,v
if(init.globalState.x!==!0)this.fK()
else try{this.fK()}catch(x){z=H.C(x)
y=H.E(x)
w=init.globalState.Q
v=P.ad(["command","error","msg",H.b(z)+"\n"+H.b(y)])
v=new H.bv(!0,P.bW(null,P.t)).bp(v)
w.toString
self.postMessage(v)}}},
qz:{"^":"a:7;a",
$0:function(){if(!this.a.hy())return
P.pA(C.x,this)}},
cu:{"^":"d;a,b,c",
kJ:function(){var z=this.a
if(z.y){z.z.push(this)
return}z.cS(this.b)}},
qY:{"^":"d;"},
lY:{"^":"a:2;a,b,c,d,e,f",
$0:function(){H.lZ(this.a,this.b,this.c,this.d,this.e,this.f)}},
m_:{"^":"a:7;a,b,c,d,e",
$0:function(){var z,y
z=this.e
z.x=!0
if(this.d!==!0)this.a.$1(this.c)
else{y=this.a
if(H.ay(y,{func:1,args:[,,]}))y.$2(this.b,this.c)
else if(H.ay(y,{func:1,args:[,]}))y.$1(this.b)
else y.$0()}z.cM()}},
hF:{"^":"d;"},
cv:{"^":"hF;b,a",
F:function(a){var z,y,x
z=init.globalState.z.j(0,this.a)
if(z==null)return
y=this.b
if(y.gfz())return
x=H.rt(a)
if(z.gjC()===y){y=J.L(x)
switch(y.j(x,0)){case"pause":z.fR(y.j(x,1),y.j(x,2))
break
case"resume":z.kN(y.j(x,1))
break
case"add-ondone":z.jq(y.j(x,1),y.j(x,2))
break
case"remove-ondone":z.kL(y.j(x,1))
break
case"set-errors-fatal":z.hV(y.j(x,1),y.j(x,2))
break
case"ping":z.k0(y.j(x,1),y.j(x,2),y.j(x,3))
break
case"kill":z.k_(y.j(x,1),y.j(x,2))
break
case"getErrors":y=y.j(x,1)
z.dx.q(0,y)
break
case"stopErrors":y=y.j(x,1)
z.dx.a3(0,y)
break}return}init.globalState.f.a.aC(new H.cu(z,new H.r1(this,x),"receive"))},
A:function(a,b){if(b==null)return!1
return b instanceof H.cv&&J.e(this.b,b.b)},
gB:function(a){return this.b.gee()}},
r1:{"^":"a:2;a,b",
$0:function(){var z=this.a.b
if(!z.gfz())z.il(this.b)}},
em:{"^":"hF;b,c,a",
F:function(a){var z,y,x
z=P.ad(["command","message","port",this,"msg",a])
y=new H.bv(!0,P.bW(null,P.t)).bp(z)
if(init.globalState.x===!0){init.globalState.Q.toString
self.postMessage(y)}else{x=init.globalState.ch.j(0,this.b)
if(x!=null)x.postMessage(y)}},
A:function(a,b){if(b==null)return!1
return b instanceof H.em&&J.e(this.b,b.b)&&J.e(this.a,b.a)&&J.e(this.c,b.c)},
gB:function(a){var z,y,x
z=this.b
if(typeof z!=="number")return z.f6()
y=this.a
if(typeof y!=="number")return y.f6()
x=this.c
if(typeof x!=="number")return H.x(x)
return(z<<16^y<<8^x)>>>0}},
cn:{"^":"d;ee:a<,b,fz:c<",
iw:function(){this.c=!0
this.b=null},
bt:function(){var z,y
if(this.c)return
this.c=!0
this.b=null
z=init.globalState.d
y=this.a
z.b.a3(0,y)
z.c.a3(0,y)
z.cM()},
il:function(a){if(this.c)return
this.b.$1(a)},
$isny:1},
nz:{"^":"al;a,b",
aI:function(a,b,c,d){var z=this.b
z.toString
return new P.d7(z,[H.l(z,0)]).aI(a,b,c,d)},
eR:function(a,b,c){return this.aI(a,null,b,c)},
bt:[function(){this.a.bt()
this.b.bt()},"$0","gjy",0,0,7],
ib:function(a){var z=new P.rg(null,0,null,null,null,null,this.gjy(),[null])
this.b=z
this.a.b=z.gjh(z)},
$asal:I.bg},
pw:{"^":"d;a,b,c",
gc0:function(){return this.c!=null},
ig:function(a,b){var z,y
if(a===0)z=self.setTimeout==null||init.globalState.x===!0
else z=!1
if(z){this.c=1
z=init.globalState.f
y=init.globalState.d
z.a.aC(new H.cu(y,new H.py(this,b),"timer"))
this.b=!0}else if(self.setTimeout!=null){++init.globalState.f.b
this.c=self.setTimeout(H.dh(new H.pz(this,b),0),a)}else throw H.c(new P.S("Timer greater than 0."))},
v:{
px:function(a,b){var z=new H.pw(!0,!1,null)
z.ig(a,b)
return z}}},
py:{"^":"a:7;a,b",
$0:function(){this.a.c=null
this.b.$0()}},
pz:{"^":"a:7;a,b",
$0:function(){this.a.c=null;--init.globalState.f.b
this.b.$0()}},
bl:{"^":"d;ee:a<",
gB:function(a){var z=this.a
if(typeof z!=="number")return z.lc()
z=C.j.dt(z,0)^C.j.bL(z,4294967296)
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
bp:[function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
z=this.b
y=z.j(0,a)
if(y!=null)return["ref",y]
z.n(0,a,z.gl(z))
z=J.o(a)
if(!!z.$iscV)return this.hR(a)
if(!!z.$islU){x=this.ghO()
z=a.gcm()
z=H.bI(z,x,H.y(z,"B",0),null)
z=P.P(z,!0,H.y(z,"B",0))
w=a.gcv()
w=H.bI(w,x,H.y(w,"B",0),null)
return["map",z,P.P(w,!0,H.y(w,"B",0))]}if(!!z.$isfk)return this.hS(a)
if(!!z.$isb_)this.hB(a)
if(!!z.$isny)this.d3(a,"RawReceivePorts can't be transmitted:")
if(!!z.$iscv)return this.hT(a)
if(!!z.$isem)return this.hU(a)
if(!!z.$isa){v=a.$static_name
if(v==null)this.d3(a,"Closures can't be transmitted:")
return["function",v]}if(!!z.$isbl)return["capability",a.a]
if(!(a instanceof P.d))this.hB(a)
return["dart",init.classIdExtractor(a),this.hQ(init.classFieldsExtractor(a))]},"$1","ghO",2,0,0],
d3:function(a,b){throw H.c(new P.S((b==null?"Can't transmit:":b)+" "+H.b(a)))},
hB:function(a){return this.d3(a,null)},
hR:function(a){var z=this.hP(a)
if(!!a.fixed$length)return["fixed",z]
if(!a.fixed$length)return["extendable",z]
if(!a.immutable$list)return["mutable",z]
if(a.constructor===Array)return["const",z]
this.d3(a,"Can't serialize indexable: ")},
hP:function(a){var z,y,x
z=[]
C.a.sl(z,a.length)
for(y=0;y<a.length;++y){x=this.bp(a[y])
if(y>=z.length)return H.f(z,y)
z[y]=x}return z},
hQ:function(a){var z
for(z=0;z<a.length;++z)C.a.n(a,z,this.bp(a[z]))
return a},
hS:function(a){var z,y,x,w
if(!!a.constructor&&a.constructor!==Object)this.d3(a,"Only plain JS Objects are supported:")
z=Object.keys(a)
y=[]
C.a.sl(y,z.length)
for(x=0;x<z.length;++x){w=this.bp(a[z[x]])
if(x>=y.length)return H.f(y,x)
y[x]=w}return["js-object",z,y]},
hU:function(a){if(this.a)return["sendport",a.b,a.a,a.c]
return["raw sendport",a]},
hT:function(a){if(this.a)return["sendport",init.globalState.b,a.a,a.b.gee()]
return["raw sendport",a]}},
d8:{"^":"d;a,b",
bY:[function(a){var z,y,x,w,v,u
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
if(typeof a!=="object"||a===null||a.constructor!==Array)throw H.c(P.G("Bad serialized message: "+H.b(a)))
switch(C.a.geH(a)){case"ref":if(1>=a.length)return H.f(a,1)
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
y=H.p(this.cR(x),[null])
y.fixed$length=Array
return y
case"extendable":if(1>=a.length)return H.f(a,1)
x=a[1]
this.b.push(x)
return H.p(this.cR(x),[null])
case"mutable":if(1>=a.length)return H.f(a,1)
x=a[1]
this.b.push(x)
return this.cR(x)
case"const":if(1>=a.length)return H.f(a,1)
x=a[1]
this.b.push(x)
y=H.p(this.cR(x),[null])
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
this.cR(v)
return init.initializeEmptyInstance(w,u,v)
default:throw H.c("couldn't deserialize: "+H.b(a))}},"$1","gjJ",2,0,0],
cR:function(a){var z,y,x
z=J.L(a)
y=0
while(!0){x=z.gl(a)
if(typeof x!=="number")return H.x(x)
if(!(y<x))break
z.n(a,y,this.bY(z.j(a,y)));++y}return a},
jL:function(a){var z,y,x,w,v,u
z=a.length
if(1>=z)return H.f(a,1)
y=a[1]
if(2>=z)return H.f(a,2)
x=a[2]
w=P.aP()
this.b.push(w)
y=J.eR(y,this.gjJ()).cu(0)
for(z=J.L(y),v=J.L(x),u=0;u<z.gl(y);++u){if(u>=y.length)return H.f(y,u)
w.n(0,y[u],this.bY(v.j(x,u)))}return w},
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
u=v.co(w)
if(u==null)return
t=new H.cv(u,x)}else t=new H.em(y,w,x)
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
w[z.j(y,u)]=this.bY(v.j(x,u));++u}return w}}}],["","",,H,{"^":"",
k7:function(){throw H.c(new P.S("Cannot modify unmodifiable Map"))},
ux:function(a){return init.types[a]},
b:function(a){var z
if(typeof a==="string")return a
if(typeof a==="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
z=J.h(a)
if(typeof z!=="string")throw H.c(H.T(a))
return z},
aC:function(a){var z=a.$identityHash
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
if(w.length>1&&C.b.cB(w,0)===36)w=C.b.bJ(w,1)
return function(b,c){return b.replace(/[^<,> ]+/g,function(d){return c[d]||d})}(w+H.dk(H.cz(a),0,null),init.mangledGlobalNames)},
cZ:function(a){return"Instance of '"+H.bM(a)+"'"},
ar:function(a){var z
if(a<=65535)return String.fromCharCode(a)
if(a<=1114111){z=a-65536
return String.fromCharCode((55296|C.e.dt(z,10))>>>0,56320|z&1023)}throw H.c(P.a7(a,0,1114111,null,null))},
bp:function(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
nq:function(a){var z=H.bp(a).getFullYear()+0
return z},
no:function(a){var z=H.bp(a).getMonth()+1
return z},
nk:function(a){var z=H.bp(a).getDate()+0
return z},
nl:function(a){var z=H.bp(a).getHours()+0
return z},
nn:function(a){var z=H.bp(a).getMinutes()+0
return z},
np:function(a){var z=H.bp(a).getSeconds()+0
return z},
nm:function(a){var z=H.bp(a).getMilliseconds()+0
return z},
e_:function(a,b){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.c(H.T(a))
return a[b]},
fK:function(a,b,c){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.c(H.T(a))
a[b]=c},
x:function(a){throw H.c(H.T(a))},
f:function(a,b){if(a==null)J.aM(a)
throw H.c(H.aI(a,b))},
aI:function(a,b){var z,y
if(typeof b!=="number"||Math.floor(b)!==b)return new P.b7(!0,b,"index",null)
z=J.aM(a)
if(!(b<0)){if(typeof z!=="number")return H.x(z)
y=b>=z}else y=!0
if(y)return P.cS(b,a,"index",null,z)
return P.cl(b,"index",null)},
T:function(a){return new P.b7(!0,a,null,null)},
df:function(a){if(typeof a!=="number")throw H.c(H.T(a))
return a},
rP:function(a){if(typeof a!=="number"||Math.floor(a)!==a)throw H.c(H.T(a))
return a},
bz:function(a){if(typeof a!=="string")throw H.c(H.T(a))
return a},
c:function(a){var z
if(a==null)a=new P.cX()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.iN})
z.name=""}else z.toString=H.iN
return z},
iN:function(){return J.h(this.dartException)},
i:function(a){throw H.c(a)},
as:function(a){throw H.c(new P.D(a))},
C:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.wE(a)
if(a==null)return
if(a instanceof H.dz)return z.$1(a.a)
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.e.dt(x,16)&8191)===10)switch(w){case 438:return z.$1(H.dG(H.b(y)+" (Error "+w+")",null))
case 445:case 5007:v=H.b(y)+" (Error "+w+")"
return z.$1(new H.fz(v,null))}}if(a instanceof TypeError){u=$.$get$hl()
t=$.$get$hm()
s=$.$get$hn()
r=$.$get$ho()
q=$.$get$hs()
p=$.$get$ht()
o=$.$get$hq()
$.$get$hp()
n=$.$get$hv()
m=$.$get$hu()
l=u.bw(y)
if(l!=null)return z.$1(H.dG(y,l))
else{l=t.bw(y)
if(l!=null){l.method="call"
return z.$1(H.dG(y,l))}else{l=s.bw(y)
if(l==null){l=r.bw(y)
if(l==null){l=q.bw(y)
if(l==null){l=p.bw(y)
if(l==null){l=o.bw(y)
if(l==null){l=r.bw(y)
if(l==null){l=n.bw(y)
if(l==null){l=m.bw(y)
v=l!=null}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0
if(v)return z.$1(new H.fz(y,l==null?null:l.method))}}return z.$1(new H.pF(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.h7()
y=function(b){try{return String(b)}catch(k){}return null}(a)
return z.$1(new P.b7(!1,null,null,typeof y==="string"?y.replace(/^RangeError:\s*/,""):y))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.h7()
return a},
E:function(a){var z
if(a instanceof H.dz)return a.b
if(a==null)return new H.hN(a,null)
z=a.$cachedTrace
if(z!=null)return z
return a.$cachedTrace=new H.hN(a,null)},
uO:function(a){if(a==null||typeof a!='object')return J.j(a)
else return H.aC(a)},
ua:function(a,b){var z,y,x,w
z=a.length
for(y=0;y<z;y=w){x=y+1
w=x+1
b.n(0,a[y],a[x])}return b},
uD:function(a,b,c,d,e,f,g){switch(c){case 0:return H.cw(b,new H.uE(a))
case 1:return H.cw(b,new H.uF(a,d))
case 2:return H.cw(b,new H.uG(a,d,e))
case 3:return H.cw(b,new H.uH(a,d,e,f))
case 4:return H.cw(b,new H.uI(a,d,e,f,g))}throw H.c(P.cQ("Unsupported number of arguments for wrapped closure"))},
dh:function(a,b){var z=a.$identity
if(!!z)return z
z=function(c,d,e,f){return function(g,h,i,j){return f(c,e,d,g,h,i,j)}}(a,b,init.globalState.d,H.uD)
a.$identity=z
return z},
k3:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=z.$callName
if(!!J.o(c).$isN){z.$reflectionInfo=c
x=H.nB(z).r}else x=c
w=d?Object.create(new H.oK().constructor.prototype):Object.create(new H.ds(null,null,null,null).constructor.prototype)
w.$initialize=w.constructor
if(d)v=function(){this.$initialize()}
else{u=$.aN
$.aN=J.ao(u,1)
v=new Function("a,b,c,d"+u,"this.$initialize(a,b,c,d"+u+")")}w.constructor=v
v.prototype=w
if(!d){t=e.length==1&&!0
s=H.f2(a,z,t)
s.$reflectionInfo=c}else{w.$static_name=f
s=z
t=!1}if(typeof x=="number")r=function(g,h){return function(){return g(h)}}(H.ux,x)
else if(typeof x=="function")if(d)r=x
else{q=t?H.eY:H.dt
r=function(g,h){return function(){return g.apply({$receiver:h(this)},arguments)}}(x,q)}else throw H.c("Error in reflectionInfo.")
w.$S=r
w[y]=s
for(u=b.length,p=1;p<u;++p){o=b[p]
n=o.$callName
if(n!=null){m=d?o:H.f2(a,o,t)
w[n]=m}}w["call*"]=s
w.$R=z.$R
w.$D=z.$D
return v},
k0:function(a,b,c,d){var z=H.dt
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},
f2:function(a,b,c){var z,y,x,w,v,u,t
if(c)return H.k2(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
v=!w||y>=27
if(v)return H.k0(y,!w,z,b)
if(y===0){w=$.aN
$.aN=J.ao(w,1)
u="self"+H.b(w)
w="return function(){var "+u+" = this."
v=$.bF
if(v==null){v=H.cJ("self")
$.bF=v}return new Function(w+H.b(v)+";return "+u+"."+H.b(z)+"();}")()}t="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w=$.aN
$.aN=J.ao(w,1)
t+=H.b(w)
w="return function("+t+"){return this."
v=$.bF
if(v==null){v=H.cJ("self")
$.bF=v}return new Function(w+H.b(v)+"."+H.b(z)+"("+t+");}")()},
k1:function(a,b,c,d){var z,y
z=H.dt
y=H.eY
switch(b?-1:a){case 0:throw H.c(new H.nN("Intercepted function with no arguments."))
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
y=$.eX
if(y==null){y=H.cJ("receiver")
$.eX=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.k1(w,!u,x,b)
if(w===1){y="return function(){return this."+H.b(z)+"."+H.b(x)+"(this."+H.b(y)+");"
u=$.aN
$.aN=J.ao(u,1)
return new Function(y+H.b(u)+"}")()}s="abcdefghijklmnopqrstuvwxyz".split("").splice(0,w-1).join(",")
y="return function("+s+"){return this."+H.b(z)+"."+H.b(x)+"(this."+H.b(y)+", "+s+");"
u=$.aN
$.aN=J.ao(u,1)
return new Function(y+H.b(u)+"}")()},
ev:function(a,b,c,d,e,f){var z
b.fixed$length=Array
if(!!J.o(c).$isN){c.fixed$length=Array
z=c}else z=c
return H.k3(a,b,z,!!d,e,f)},
uX:function(a,b){var z=J.L(b)
throw H.c(H.cL(H.bM(a),z.aL(b,3,z.gl(b))))},
F:function(a,b){var z
if(a!=null)z=(typeof a==="object"||typeof a==="function")&&J.o(a)[b]
else z=!0
if(z)return a
H.uX(a,b)},
ex:function(a){var z=J.o(a)
return"$S" in z?z.$S():null},
ay:function(a,b){var z
if(a==null)return!1
z=H.ex(a)
return z==null?!1:H.eA(z,b)},
ih:function(a,b){var z,y
if(a==null)return a
if(H.ay(a,b))return a
z=H.Z(b,null)
y=H.ex(a)
throw H.c(H.cL(y!=null?H.Z(y,null):H.bM(a),z))},
wB:function(a){throw H.c(new P.kk(a))},
dm:function(){return(Math.random()*0x100000000>>>0)+(Math.random()*0x100000000>>>0)*4294967296},
bf:function(a){return new H.av(a,null)},
p:function(a,b){a.$ti=b
return a},
cz:function(a){if(a==null)return
return a.$ti},
im:function(a,b){return H.eM(a["$as"+H.b(b)],H.cz(a))},
y:function(a,b,c){var z=H.im(a,b)
return z==null?null:z[c]},
l:function(a,b){var z=H.cz(a)
return z==null?null:z[b]},
Z:function(a,b){var z
if(a==null)return"dynamic"
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a[0].builtin$cls+H.dk(a,1,b)
if(typeof a=="function")return a.builtin$cls
if(typeof a==="number"&&Math.floor(a)===a)return H.b(b==null?a:b.$1(a))
if(typeof a.func!="undefined"){z=a.typedef
if(z!=null)return H.Z(z,b)
return H.ry(a,b)}return"unknown-reified-type"},
ry:function(a,b){var z,y,x,w,v,u,t,s,r,q,p
z=!!a.v?"void":H.Z(a.ret,b)
if("args" in a){y=a.args
for(x=y.length,w="",v="",u=0;u<x;++u,v=", "){t=y[u]
w=w+v+H.Z(t,b)}}else{w=""
v=""}if("opt" in a){s=a.opt
w+=v+"["
for(x=s.length,v="",u=0;u<x;++u,v=", "){t=s[u]
w=w+v+H.Z(t,b)}w+="]"}if("named" in a){r=a.named
w+=v+"{"
for(x=H.u9(r),q=x.length,v="",u=0;u<q;++u,v=", "){p=x[u]
w=w+v+H.Z(r[p],b)+(" "+H.b(p))}w+="}"}return"("+w+") => "+z},
dk:function(a,b,c){var z,y,x,w,v,u
if(a==null)return""
z=new P.bS("")
for(y=b,x=!0,w=!0,v="";y<a.length;++y){if(x)x=!1
else z.C=v+", "
u=a[y]
if(u!=null)w=!1
v=z.C+=H.Z(u,c)}return w?"":"<"+z.k(0)+">"},
io:function(a){var z,y
if(a instanceof H.a){z=H.ex(a)
if(z!=null)return H.Z(z,null)}y=J.o(a).constructor.builtin$cls
if(a==null)return y
return y+H.dk(a.$ti,0,null)},
eM:function(a,b){if(a==null)return b
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
return H.i4(H.eM(y[d],z),c)},
aL:function(a,b,c,d){if(a==null)return a
if(H.aW(a,b,c,d))return a
throw H.c(H.cL(H.bM(a),function(e,f){return e.replace(/[^<,> ]+/g,function(g){return f[g]||g})}(b.substring(3)+H.dk(c,0,null),init.mangledGlobalNames)))},
i4:function(a,b){var z,y
if(a==null||b==null)return!0
z=a.length
for(y=0;y<z;++y)if(!H.an(a[y],b[y]))return!1
return!0},
be:function(a,b,c){return a.apply(b,H.im(b,c))},
dg:function(a,b){var z,y,x
if(a==null)return b==null||b.builtin$cls==="d"||b.builtin$cls==="at"
if(b==null)return!0
z=H.cz(a)
a=J.o(a)
y=a.constructor
if(z!=null){z=z.slice()
z.splice(0,0,y)
y=z}if('func' in b){x=a.$S
if(x==null)return!1
return H.eA(x.apply(a,null),b)}return H.an(y,b)},
iI:function(a,b){if(a!=null&&!H.dg(a,b))throw H.c(H.cL(H.bM(a),H.Z(b,null)))
return a},
an:function(a,b){var z,y,x,w,v,u
if(a===b)return!0
if(a==null||b==null)return!0
if(a.builtin$cls==="at")return!0
if('func' in b)return H.eA(a,b)
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
return H.i4(H.eM(u,z),x)},
i3:function(a,b,c){var z,y,x,w,v
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
rJ:function(a,b){var z,y,x,w,v,u
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
eA:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
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
if(t===s){if(!H.i3(x,w,!1))return!1
if(!H.i3(v,u,!0))return!1}else{for(p=0;p<t;++p){o=x[p]
n=w[p]
if(!(H.an(o,n)||H.an(n,o)))return!1}for(m=p,l=0;m<s;++l,++m){o=v[l]
n=w[m]
if(!(H.an(o,n)||H.an(n,o)))return!1}for(m=0;m<q;++l,++m){o=v[l]
n=u[m]
if(!(H.an(o,n)||H.an(n,o)))return!1}}return H.rJ(a.named,b.named)},
wt:function(a,b,c){var z
if(typeof b==="string")return a.indexOf(b,c)>=0
else{z=J.o(b)
if(!!z.$isdE){z=C.b.bJ(a,c)
return b.b.test(z)}else{z=z.ez(b,C.b.bJ(a,c))
return!z.gX(z)}}},
wv:function(a,b,c,d){var z,y,x
z=b.fp(a,d)
if(z==null)return a
y=z.b
x=y.index
return H.eL(a,x,x+y[0].length,c)},
n:function(a,b,c){var z,y,x
H.bz(c)
if(b==="")if(a==="")return c
else{z=a.length
y=H.b(c)
for(x=0;x<z;++x)y=y+a[x]+H.b(c)
return y.charCodeAt(0)==0?y:y}else return a.replace(new RegExp(b.replace(/[[\]{}()*+?.\\^$|]/g,"\\$&"),'g'),c.replace(/\$/g,"$$$$"))},
xq:[function(a){return a},"$1","hR",2,0,22],
wu:function(a,b,c,d){var z,y,x,w,v,u
z=J.o(b)
if(!z.$isdX)throw H.c(P.cG(b,"pattern","is not a Pattern"))
for(z=z.ez(b,a),z=new H.hD(z.a,z.b,z.c,null),y=0,x="";z.u();){w=z.d
v=w.b
u=v.index
x=x+H.b(H.hR().$1(C.b.aL(a,y,u)))+H.b(c.$1(w))
y=u+v[0].length}z=x+H.b(H.hR().$1(C.b.bJ(a,y)))
return z.charCodeAt(0)==0?z:z},
iH:function(a,b,c,d){var z,y,x,w,v,u
if(typeof b==="string"){z=a.indexOf(b,d)
if(z<0)return a
return H.eL(a,z,z+b.length,c)}y=J.o(b)
if(!!y.$isdE)return d===0?a.replace(b.b,c.replace(/\$/g,"$$$$")):H.wv(a,b,c,d)
if(b==null)H.i(H.T(b))
y=y.dv(b,a,d)
x=y.ga_(y)
if(!x.u())return a
w=x.gS()
y=w.gfa()
v=w.gh1()
H.bz(c)
u=P.cm(y,v,a.length,null,null,null)
H.rP(u)
return H.eL(a,y,u,c)},
eL:function(a,b,c,d){var z,y
z=a.substring(0,b)
y=a.substring(c)
return z+H.b(d)+y},
k6:{"^":"d;$ti",
gX:function(a){return this.gl(this)===0},
gau:function(a){return this.gl(this)!==0},
k:function(a){return P.dQ(this)},
n:function(a,b,c){return H.k7()},
$isI:1},
k8:{"^":"k6;a,b,c,$ti",
gl:function(a){return this.a},
ac:function(a){if(typeof a!=="string")return!1
if("__proto__"===a)return!1
return this.b.hasOwnProperty(a)},
j:function(a,b){if(!this.ac(b))return
return this.fq(b)},
fq:function(a){return this.b[a]},
Z:function(a,b){var z,y,x,w
z=this.c
for(y=z.length,x=0;x<y;++x){w=z[x]
b.$2(w,this.fq(w))}}},
nA:{"^":"d;a,b,c,d,e,f,r,x",v:{
nB:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z.fixed$length=Array
z=z
y=z[0]
x=z[1]
return new H.nA(a,z,(y&1)===1,y>>1,x>>1,(x&1)===1,z[2],null)}}},
pB:{"^":"d;a,b,c,d,e,f",
bw:function(a){var z,y,x
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
return new H.pB(a.replace(new RegExp('\\\\\\$arguments\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$argumentsExpr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$expr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$method\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$receiver\\\\\\$','g'),'((?:x|[^x])*)'),y,x,w,v,u)},
d6:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},
hr:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},
fz:{"^":"a4;a,b",
k:function(a){var z=this.b
if(z==null)return"NullError: "+H.b(this.a)
return"NullError: method not found: '"+H.b(z)+"' on null"}},
m6:{"^":"a4;a,b,c",
k:function(a){var z,y
z=this.b
if(z==null)return"NoSuchMethodError: "+H.b(this.a)
y=this.c
if(y==null)return"NoSuchMethodError: method not found: '"+z+"' ("+H.b(this.a)+")"
return"NoSuchMethodError: method not found: '"+z+"' on '"+y+"' ("+H.b(this.a)+")"},
v:{
dG:function(a,b){var z,y
z=b==null
y=z?null:b.method
return new H.m6(a,y,z?null:b.receiver)}}},
pF:{"^":"a4;a",
k:function(a){var z=this.a
return z.length===0?"Error":"Error: "+z}},
dz:{"^":"d;a,bq:b<"},
wE:{"^":"a:0;a",
$1:function(a){if(!!J.o(a).$isa4)if(a.$thrownJsError==null)a.$thrownJsError=this.a
return a}},
hN:{"^":"d;a,b",
k:function(a){var z,y
z=this.b
if(z!=null)return z
z=this.a
y=z!==null&&typeof z==="object"?z.stack:null
z=y==null?"":y
this.b=z
return z}},
uE:{"^":"a:2;a",
$0:function(){return this.a.$0()}},
uF:{"^":"a:2;a,b",
$0:function(){return this.a.$1(this.b)}},
uG:{"^":"a:2;a,b,c",
$0:function(){return this.a.$2(this.b,this.c)}},
uH:{"^":"a:2;a,b,c,d",
$0:function(){return this.a.$3(this.b,this.c,this.d)}},
uI:{"^":"a:2;a,b,c,d,e",
$0:function(){return this.a.$4(this.b,this.c,this.d,this.e)}},
a:{"^":"d;",
k:function(a){return"Closure '"+H.bM(this).trim()+"'"},
ghJ:function(){return this},
$isbH:1,
ghJ:function(){return this}},
hk:{"^":"a;"},
oK:{"^":"hk;",
k:function(a){var z=this.$static_name
if(z==null)return"Closure of unknown static method"
return"Closure '"+z+"'"}},
ds:{"^":"hk;a,b,c,d",
A:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof H.ds))return!1
return this.a===b.a&&this.b===b.b&&this.c===b.c},
gB:function(a){var z,y
z=this.c
if(z==null)y=H.aC(this.a)
else y=typeof z!=="object"?J.j(z):H.aC(z)
z=H.aC(this.b)
if(typeof y!=="number")return y.ld()
return(y^z)>>>0},
k:function(a){var z=this.c
if(z==null)z=this.a
return"Closure '"+H.b(this.d)+"' of "+H.cZ(z)},
v:{
dt:function(a){return a.a},
eY:function(a){return a.c},
jS:function(){var z=$.bF
if(z==null){z=H.cJ("self")
$.bF=z}return z},
cJ:function(a){var z,y,x,w,v
z=new H.ds("self","target","receiver","name")
y=Object.getOwnPropertyNames(z)
y.fixed$length=Array
x=y
for(y=x.length,w=0;w<y;++w){v=x[w]
if(z[v]===a)return v}}}},
jX:{"^":"a4;a",
k:function(a){return this.a},
v:{
cL:function(a,b){return new H.jX("CastError: Casting value of type '"+a+"' to incompatible type '"+b+"'")}}},
nN:{"^":"a4;a",
k:function(a){return"RuntimeError: "+H.b(this.a)}},
av:{"^":"d;a,b",
k:function(a){var z,y
z=this.b
if(z!=null)return z
y=function(b,c){return b.replace(/[^<,> ]+/g,function(d){return c[d]||d})}(this.a,init.mangledGlobalNames)
this.b=y
return y},
gB:function(a){return J.j(this.a)},
A:function(a,b){if(b==null)return!1
return b instanceof H.av&&J.e(this.a,b.a)}},
R:{"^":"d;a,b,c,d,e,f,r,$ti",
gl:function(a){return this.a},
gX:function(a){return this.a===0},
gau:function(a){return!this.gX(this)},
gcm:function(){return new H.mn(this,[H.l(this,0)])},
gcv:function(){return H.bI(this.gcm(),new H.m5(this),H.l(this,0),H.l(this,1))},
ac:function(a){var z,y
if(typeof a==="string"){z=this.b
if(z==null)return!1
return this.fl(z,a)}else if(typeof a==="number"&&(a&0x3ffffff)===a){y=this.c
if(y==null)return!1
return this.fl(y,a)}else return this.kh(a)},
kh:function(a){var z=this.d
if(z==null)return!1
return this.cU(this.dn(z,this.cT(a)),a)>=0},
j:function(a,b){var z,y,x
if(typeof b==="string"){z=this.b
if(z==null)return
y=this.cE(z,b)
return y==null?null:y.gc_()}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null)return
y=this.cE(x,b)
return y==null?null:y.gc_()}else return this.ki(b)},
ki:function(a){var z,y,x
z=this.d
if(z==null)return
y=this.dn(z,this.cT(a))
x=this.cU(y,a)
if(x<0)return
return y[x].gc_()},
n:function(a,b,c){var z,y
if(typeof b==="string"){z=this.b
if(z==null){z=this.eg()
this.b=z}this.ff(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=this.eg()
this.c=y}this.ff(y,b,c)}else this.kk(b,c)},
kk:function(a,b){var z,y,x,w
z=this.d
if(z==null){z=this.eg()
this.d=z}y=this.cT(a)
x=this.dn(z,y)
if(x==null)this.es(z,y,[this.eh(a,b)])
else{w=this.cU(x,a)
if(w>=0)x[w].sc_(b)
else x.push(this.eh(a,b))}},
kK:function(a,b){var z
if(this.ac(a))return this.j(0,a)
z=b.$0()
this.n(0,a,z)
return z},
a3:function(a,b){if(typeof b==="string")return this.fJ(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.fJ(this.c,b)
else return this.kj(b)},
kj:function(a){var z,y,x,w
z=this.d
if(z==null)return
y=this.dn(z,this.cT(a))
x=this.cU(y,a)
if(x<0)return
w=y.splice(x,1)[0]
this.fL(w)
return w.gc_()},
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
ff:function(a,b,c){var z=this.cE(a,b)
if(z==null)this.es(a,b,this.eh(b,c))
else z.sc_(c)},
fJ:function(a,b){var z
if(a==null)return
z=this.cE(a,b)
if(z==null)return
this.fL(z)
this.fm(a,b)
return z.gc_()},
eh:function(a,b){var z,y
z=new H.mm(a,b,null,null,[null,null])
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.d=y
y.c=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
fL:function(a){var z,y
z=a.giY()
y=a.c
if(z==null)this.e=y
else z.c=y
if(y==null)this.f=z
else y.d=z;--this.a
this.r=this.r+1&67108863},
cT:function(a){return J.j(a)&0x3ffffff},
cU:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.e(a[y].gh9(),b))return y
return-1},
k:function(a){return P.dQ(this)},
cE:function(a,b){return a[b]},
dn:function(a,b){return a[b]},
es:function(a,b,c){a[b]=c},
fm:function(a,b){delete a[b]},
fl:function(a,b){return this.cE(a,b)!=null},
eg:function(){var z=Object.create(null)
this.es(z,"<non-identifier-key>",z)
this.fm(z,"<non-identifier-key>")
return z},
$islU:1,
$isI:1,
v:{
fn:function(a,b){return new H.R(0,null,null,null,null,null,0,[a,b])}}},
m5:{"^":"a:0;a",
$1:function(a){return this.a.j(0,a)}},
mm:{"^":"d;h9:a<,c_:b@,c,iY:d<,$ti"},
mn:{"^":"a_;a,$ti",
gl:function(a){return this.a.a},
gX:function(a){return this.a.a===0},
ga_:function(a){var z,y
z=this.a
y=new H.mo(z,z.r,null,null,this.$ti)
y.c=z.e
return y},
a7:function(a,b){return this.a.ac(b)},
Z:function(a,b){var z,y,x
z=this.a
y=z.e
x=z.r
for(;y!=null;){b.$1(y.a)
if(x!==z.r)throw H.c(new P.D(z))
y=y.c}}},
mo:{"^":"d;a,b,c,d,$ti",
gS:function(){return this.d},
u:function(){var z=this.a
if(this.b!==z.r)throw H.c(new P.D(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.c
return!0}}}},
dE:{"^":"d;a,b,c,d",
k:function(a){return"RegExp/"+this.a+"/"},
giU:function(){var z=this.c
if(z!=null)return z
z=this.b
z=H.dF(this.a,z.multiline,!z.ignoreCase,!0)
this.c=z
return z},
giT:function(){var z=this.d
if(z!=null)return z
z=this.b
z=H.dF(this.a+"|()",z.multiline,!z.ignoreCase,!0)
this.d=z
return z},
dv:function(a,b,c){if(c>b.length)throw H.c(P.a7(c,0,b.length,null,null))
return new H.qe(this,b,c)},
ez:function(a,b){return this.dv(a,b,0)},
fp:function(a,b){var z,y
z=this.giU()
z.lastIndex=b
y=z.exec(a)
if(y==null)return
return new H.hM(this,y)},
iE:function(a,b){var z,y
z=this.giT()
z.lastIndex=b
y=z.exec(a)
if(y==null)return
if(0>=y.length)return H.f(y,-1)
if(y.pop()!=null)return
return new H.hM(this,y)},
he:function(a,b,c){if(c>b.length)throw H.c(P.a7(c,0,b.length,null,null))
return this.iE(b,c)},
$isdX:1,
v:{
dF:function(a,b,c,d){var z,y,x,w
z=b?"m":""
y=c?"":"i"
x=d?"g":""
w=function(e,f){try{return new RegExp(e,f)}catch(v){return v}}(a,z+y+x)
if(w instanceof RegExp)return w
throw H.c(new P.fa("Illegal RegExp pattern ("+String(w)+")",a,null))}}},
hM:{"^":"d;a,b",
gfa:function(){return this.b.index},
gh1:function(){var z=this.b
return z.index+z[0].length},
j:function(a,b){var z=this.b
if(b>>>0!==b||b>=z.length)return H.f(z,b)
return z[b]},
$isbo:1},
qe:{"^":"ce;a,b,c",
ga_:function(a){return new H.hD(this.a,this.b,this.c,null)},
$asce:function(){return[P.bo]},
$asB:function(){return[P.bo]}},
hD:{"^":"d;a,b,c,d",
gS:function(){return this.d},
u:function(){var z,y,x,w
z=this.b
if(z==null)return!1
y=this.c
if(y<=z.length){x=this.a.fp(z,y)
if(x!=null){this.d=x
z=x.b
y=z.index
w=y+z[0].length
this.c=y===w?w+1:w
return!0}}this.d=null
this.b=null
return!1}},
hc:{"^":"d;fa:a<,b,c",
gh1:function(){return this.a+this.c.length},
j:function(a,b){if(b!==0)H.i(P.cl(b,null,null))
return this.c},
$isbo:1},
rc:{"^":"B;a,b,c",
ga_:function(a){return new H.rd(this.a,this.b,this.c,null)},
$asB:function(){return[P.bo]}},
rd:{"^":"d;a,b,c,d",
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
this.d=new H.hc(u,w,y)
this.c=t===this.c?t+1:t
return!0},
gS:function(){return this.d}}}],["","",,H,{"^":"",
u9:function(a){var z=H.p(a?Object.keys(a):[],[null])
z.fixed$length=Array
return z}}],["","",,H,{"^":"",
uW:function(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)}}],["","",,P,{"^":"",
qf:function(){var z,y,x
z={}
if(self.scheduleImmediate!=null)return P.rK()
if(self.MutationObserver!=null&&self.document!=null){y=self.document.createElement("div")
x=self.document.createElement("span")
z.a=null
new self.MutationObserver(H.dh(new P.qh(z),1)).observe(y,{childList:true})
return new P.qg(z,y,x)}else if(self.setImmediate!=null)return P.rL()
return P.rM()},
xk:[function(a){++init.globalState.f.b
self.scheduleImmediate(H.dh(new P.qi(a),0))},"$1","rK",2,0,14],
xl:[function(a){++init.globalState.f.b
self.setImmediate(H.dh(new P.qj(a),0))},"$1","rL",2,0,14],
xm:[function(a){P.ea(C.x,a)},"$1","rM",2,0,14],
aH:function(a,b){P.en(null,a)
return b.gh5()},
aw:function(a,b){P.en(a,b)},
aG:function(a,b){b.bX(a)},
aF:function(a,b){b.eD(H.C(a),H.E(a))},
en:function(a,b){var z,y,x,w
z=new P.rn(b)
y=new P.ro(b)
x=J.o(a)
if(!!x.$isH)a.eu(z,y)
else if(!!x.$isQ)a.eY(z,y)
else{w=new P.H(0,$.q,null,[null])
w.a=4
w.c=a
w.eu(z,null)}},
ax:function(a){var z=function(b,c){return function(d,e){while(true)try{b(d,e)
break}catch(y){e=y
d=c}}}(a,1)
$.q.toString
return new P.rI(z)},
dc:function(a,b,c){var z,y,x
if(b===0){if(c.geK())c.c.eC()
else c.a.bt()
return}else if(b===1){if(c.geK())c.c.eD(H.C(a),H.E(a))
else{z=H.C(a)
y=H.E(a)
c.a.ey(z,y)
c.a.bt()}return}if(a instanceof P.bU){if(c.geK()){b.$2(2,null)
return}z=a.b
if(z===0){z=a.a
J.dq(c.a,z)
P.cB(new P.rl(b,c))
return}else if(z===1){x=a.a
c.a.ju(x,!1).c4(new P.rm(b,c))
return}}P.en(a,b)},
rH:function(a){return a.ge_()},
er:function(a,b){if(H.ay(a,{func:1,args:[P.at,P.at]})){b.toString
return a}else{b.toString
return a}},
aA:function(a){return new P.re(new P.H(0,$.q,null,[a]),[a])},
rw:function(a,b,c){$.q.toString
a.bk(b,c)},
rA:function(){var z,y
for(;z=$.bw,z!=null;){$.bY=null
y=z.gcp()
$.bw=y
if(y==null)$.bX=null
z.gjw().$0()}},
xp:[function(){$.eo=!0
try{P.rA()}finally{$.bY=null
$.eo=!1
if($.bw!=null)$.$get$ee().$1(P.i5())}},"$0","i5",0,0,7],
i_:function(a){var z=new P.hE(a,null)
if($.bw==null){$.bX=z
$.bw=z
if(!$.eo)$.$get$ee().$1(P.i5())}else{$.bX.b=z
$.bX=z}},
rG:function(a){var z,y,x
z=$.bw
if(z==null){P.i_(a)
$.bY=$.bX
return}y=new P.hE(a,null)
x=$.bY
if(x==null){y.b=z
$.bY=y
$.bw=y}else{y.b=x.b
x.b=y
$.bY=y
if(y.b==null)$.bX=y}},
cB:function(a){var z=$.q
if(C.i===z){P.by(null,null,C.i,a)
return}z.toString
P.by(null,null,z,z.eA(a,!0))},
xf:function(a,b){return new P.rb(null,a,!1,[b])},
es:function(a){var z,y,x,w
if(a==null)return
try{a.$0()}catch(x){z=H.C(x)
y=H.E(x)
w=$.q
w.toString
P.bx(null,null,w,z,y)}},
rB:[function(a,b){var z=$.q
z.toString
P.bx(null,null,z,a,b)},function(a){return P.rB(a,null)},"$2","$1","rO",2,2,17,0],
xo:[function(){},"$0","rN",0,0,7],
hZ:function(a,b,c){var z,y,x,w,v,u,t
try{b.$1(a.$0())}catch(u){z=H.C(u)
y=H.E(u)
$.q.toString
x=null
if(x==null)c.$2(z,y)
else{t=x.gbu()
w=t
v=x.gbq()
c.$2(w,v)}}},
rp:function(a,b,c,d){var z=a.cj()
if(!!J.o(z).$isQ&&z!==$.$get$bm())z.c6(new P.rr(b,c,d))
else b.bk(c,d)},
hO:function(a,b){return new P.rq(a,b)},
hP:function(a,b,c){var z=a.cj()
if(!!J.o(z).$isQ&&z!==$.$get$bm())z.c6(new P.rs(b,c))
else b.bj(c)},
rk:function(a,b,c){$.q.toString
a.cd(b,c)},
pA:function(a,b){var z=$.q
if(z===C.i){z.toString
return P.ea(a,b)}return P.ea(a,z.eA(b,!0))},
ea:function(a,b){var z=C.e.bL(a.a,1000)
return H.px(z<0?0:z,b)},
pS:function(){return $.q},
bx:function(a,b,c,d,e){var z={}
z.a=d
P.rG(new P.rE(z,e))},
hW:function(a,b,c,d){var z,y
y=$.q
if(y===c)return d.$0()
$.q=c
z=y
try{y=d.$0()
return y}finally{$.q=z}},
hY:function(a,b,c,d,e){var z,y
y=$.q
if(y===c)return d.$1(e)
$.q=c
z=y
try{y=d.$1(e)
return y}finally{$.q=z}},
hX:function(a,b,c,d,e,f){var z,y
y=$.q
if(y===c)return d.$2(e,f)
$.q=c
z=y
try{y=d.$2(e,f)
return y}finally{$.q=z}},
by:function(a,b,c,d){var z=C.i!==c
if(z)d=c.eA(d,!(!z||!1))
P.i_(d)},
qh:{"^":"a:0;a",
$1:function(a){var z,y;--init.globalState.f.b
z=this.a
y=z.a
z.a=null
y.$0()}},
qg:{"^":"a:48;a,b,c",
$1:function(a){var z,y;++init.globalState.f.b
this.a.a=a
z=this.b
y=this.c
z.firstChild?z.removeChild(y):z.appendChild(y)}},
qi:{"^":"a:2;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
qj:{"^":"a:2;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
rn:{"^":"a:0;a",
$1:function(a){return this.a.$2(0,a)}},
ro:{"^":"a:16;a",
$2:function(a,b){this.a.$2(1,new H.dz(a,b))}},
rI:{"^":"a:40;a",
$2:function(a,b){this.a(a,b)}},
rl:{"^":"a:2;a,b",
$0:function(){var z=this.b
if(z.a.gcV()){z.b=!0
return}this.a.$2(null,0)}},
rm:{"^":"a:0;a,b",
$1:function(a){var z=this.b.c!=null?2:0
this.a.$2(z,null)}},
qk:{"^":"d;a,b,c",
ge_:function(){return this.a.ge_()},
gcV:function(){return this.a.gcV()},
geK:function(){return this.c!=null},
q:function(a,b){return J.dq(this.a,b)},
ey:function(a,b){return this.a.ey(a,b)},
bt:function(){return this.a.bt()},
ii:function(a){var z=new P.qn(a)
this.a=new P.qs(null,0,null,new P.qp(z),null,new P.qq(this,z),new P.qr(this,a),[null])},
v:{
ql:function(a){var z=new P.qk(null,!1,null)
z.ii(a)
return z}}},
qn:{"^":"a:2;a",
$0:function(){P.cB(new P.qo(this.a))}},
qo:{"^":"a:2;a",
$0:function(){this.a.$2(0,null)}},
qp:{"^":"a:2;a",
$0:function(){this.a.$0()}},
qq:{"^":"a:2;a,b",
$0:function(){var z=this.a
if(z.b===!0){z.b=!1
this.b.$0()}}},
qr:{"^":"a:2;a,b",
$0:function(){var z=this.a
if(!z.a.gkp()){z.c=new P.cs(new P.H(0,$.q,null,[null]),[null])
if(z.b===!0){z.b=!1
P.cB(new P.qm(this.b))}return z.c.gh5()}}},
qm:{"^":"a:2;a",
$0:function(){this.a.$2(2,null)}},
bU:{"^":"d;ad:a<,b",
k:function(a){return"IterationMarker("+this.b+", "+H.b(this.a)+")"},
v:{
bV:function(a){return new P.bU(a,1)},
aT:function(){return C.ag},
hJ:function(a){return new P.bU(a,0)},
aU:function(a){return new P.bU(a,3)}}},
bd:{"^":"d;a,b,c,d",
gS:function(){var z=this.c
return z==null?this.b:z.gS()},
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
rf:{"^":"ce;a",
ga_:function(a){return new P.bd(this.a(),null,null,null)},
$asce:I.bg,
$asB:I.bg,
v:{
aV:function(a){return new P.rf(a)}}},
Q:{"^":"d;$ti"},
hG:{"^":"d;h5:a<,$ti",
eD:function(a,b){if(a==null)a=new P.cX()
if(this.a.a!==0)throw H.c(new P.w("Future already completed"))
$.q.toString
this.bk(a,b)},
dA:function(a){return this.eD(a,null)}},
cs:{"^":"hG;a,$ti",
bX:function(a){var z=this.a
if(z.a!==0)throw H.c(new P.w("Future already completed"))
z.bC(a)},
eC:function(){return this.bX(null)},
bk:function(a,b){this.a.fh(a,b)}},
re:{"^":"hG;a,$ti",
bX:function(a){var z=this.a
if(z.a!==0)throw H.c(new P.w("Future already completed"))
z.bj(a)},
eC:function(){return this.bX(null)},
bk:function(a,b){this.a.bk(a,b)}},
ej:{"^":"d;ej:a<,b,c,d,e,$ti",
gje:function(){return this.b.b},
gh7:function(){return(this.c&1)!==0},
gk8:function(){return(this.c&2)!==0},
gh6:function(){return this.c===8},
k6:function(a){return this.b.b.eX(this.d,a)},
kz:function(a){if(this.c!==6)return!0
return this.b.b.eX(this.d,a.gbu())},
jZ:function(a){var z,y
z=this.e
y=this.b.b
if(H.ay(z,{func:1,args:[,,]}))return y.kW(z,a.gbu(),a.gbq())
else return y.eX(z,a.gbu())},
k7:function(){return this.b.b.hw(this.d)}},
H:{"^":"d;cK:a<,b,j2:c<,$ti",
giO:function(){return this.a===2},
gef:function(){return this.a>=4},
eY:function(a,b){var z=$.q
if(z!==C.i){z.toString
if(b!=null)b=P.er(b,z)}return this.eu(a,b)},
c4:function(a){return this.eY(a,null)},
eu:function(a,b){var z,y
z=new P.H(0,$.q,null,[null])
y=b==null?1:3
this.di(new P.ej(null,z,y,a,b,[H.l(this,0),null]))
return z},
c6:function(a){var z,y
z=$.q
y=new P.H(0,z,null,this.$ti)
if(z!==C.i)z.toString
z=H.l(this,0)
this.di(new P.ej(null,y,8,a,null,[z,z]))
return y},
di:function(a){var z,y
z=this.a
if(z<=1){a.a=this.c
this.c=a}else{if(z===2){y=this.c
if(!y.gef()){y.di(a)
return}this.a=y.a
this.c=y.c}z=this.b
z.toString
P.by(null,null,z,new P.qC(this,a))}},
fF:function(a){var z,y,x,w,v
z={}
z.a=a
if(a==null)return
y=this.a
if(y<=1){x=this.c
this.c=a
if(x!=null){for(w=a;w.gej()!=null;)w=w.a
w.a=x}}else{if(y===2){v=this.c
if(!v.gef()){v.fF(a)
return}this.a=v.a
this.c=v.c}z.a=this.dr(a)
y=this.b
y.toString
P.by(null,null,y,new P.qJ(z,this))}},
dq:function(){var z=this.c
this.c=null
return this.dr(z)},
dr:function(a){var z,y,x
for(z=a,y=null;z!=null;y=z,z=x){x=z.gej()
z.a=y}return y},
bj:function(a){var z,y
z=this.$ti
if(H.aW(a,"$isQ",z,"$asQ"))if(H.aW(a,"$isH",z,null))P.d9(a,this)
else P.hI(a,this)
else{y=this.dq()
this.a=4
this.c=a
P.bu(this,y)}},
bk:[function(a,b){var z=this.dq()
this.a=8
this.c=new P.cH(a,b)
P.bu(this,z)},function(a){return this.bk(a,null)},"le","$2","$1","gbU",2,2,17,0],
bC:function(a){var z
if(H.aW(a,"$isQ",this.$ti,"$asQ")){this.it(a)
return}this.a=1
z=this.b
z.toString
P.by(null,null,z,new P.qE(this,a))},
it:function(a){var z
if(H.aW(a,"$isH",this.$ti,null)){if(a.a===8){this.a=1
z=this.b
z.toString
P.by(null,null,z,new P.qI(this,a))}else P.d9(a,this)
return}P.hI(a,this)},
fh:function(a,b){var z
this.a=1
z=this.b
z.toString
P.by(null,null,z,new P.qD(this,a,b))},
ik:function(a,b){this.a=4
this.c=a},
$isQ:1,
v:{
hI:function(a,b){var z,y,x
b.a=1
try{a.eY(new P.qF(b),new P.qG(b))}catch(x){z=H.C(x)
y=H.E(x)
P.cB(new P.qH(b,z,y))}},
d9:function(a,b){var z,y,x
for(;a.giO();)a=a.c
z=a.gef()
y=b.c
if(z){b.c=null
x=b.dr(y)
b.a=a.a
b.c=a.c
P.bu(b,x)}else{b.a=2
b.c=a
a.fF(y)}},
bu:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z={}
z.a=a
for(y=a;!0;){x={}
w=y.a===8
if(b==null){if(w){v=y.c
y=y.b
u=v.gbu()
t=v.gbq()
y.toString
P.bx(null,null,y,u,t)}return}for(;b.gej()!=null;b=s){s=b.a
b.a=null
P.bu(z.a,b)}r=z.a.c
x.a=w
x.b=r
y=!w
if(!y||b.gh7()||b.gh6()){q=b.gje()
if(w){u=z.a.b
u.toString
u=u==null?q==null:u===q
if(!u)q.toString
else u=!0
u=!u}else u=!1
if(u){y=z.a
v=y.c
y=y.b
u=v.gbu()
t=v.gbq()
y.toString
P.bx(null,null,y,u,t)
return}p=$.q
if(p==null?q!=null:p!==q)$.q=q
else p=null
if(b.gh6())new P.qM(z,x,w,b).$0()
else if(y){if(b.gh7())new P.qL(x,b,r).$0()}else if(b.gk8())new P.qK(z,x,b).$0()
if(p!=null)$.q=p
y=x.b
if(!!J.o(y).$isQ){o=b.b
if(y.a>=4){n=o.c
o.c=null
b=o.dr(n)
o.a=y.a
o.c=y.c
z.a=y
continue}else P.d9(y,o)
return}}o=b.b
b=o.dq()
y=x.a
u=x.b
if(!y){o.a=4
o.c=u}else{o.a=8
o.c=u}z.a=o
y=o}}}},
qC:{"^":"a:2;a,b",
$0:function(){P.bu(this.a,this.b)}},
qJ:{"^":"a:2;a,b",
$0:function(){P.bu(this.b,this.a.a)}},
qF:{"^":"a:0;a",
$1:function(a){var z=this.a
z.a=0
z.bj(a)}},
qG:{"^":"a:30;a",
$2:function(a,b){this.a.bk(a,b)},
$1:function(a){return this.$2(a,null)}},
qH:{"^":"a:2;a,b,c",
$0:function(){this.a.bk(this.b,this.c)}},
qE:{"^":"a:2;a,b",
$0:function(){var z,y
z=this.a
y=z.dq()
z.a=4
z.c=this.b
P.bu(z,y)}},
qI:{"^":"a:2;a,b",
$0:function(){P.d9(this.b,this.a)}},
qD:{"^":"a:2;a,b,c",
$0:function(){this.a.bk(this.b,this.c)}},
qM:{"^":"a:7;a,b,c,d",
$0:function(){var z,y,x,w,v,u,t
z=null
try{z=this.d.k7()}catch(w){y=H.C(w)
x=H.E(w)
if(this.c){v=this.a.a.c.gbu()
u=y
u=v==null?u==null:v===u
v=u}else v=!1
u=this.b
if(v)u.b=this.a.a.c
else u.b=new P.cH(y,x)
u.a=!0
return}if(!!J.o(z).$isQ){if(z instanceof P.H&&z.gcK()>=4){if(z.gcK()===8){v=this.b
v.b=z.gj2()
v.a=!0}return}t=this.a.a
v=this.b
v.b=z.c4(new P.qN(t))
v.a=!1}}},
qN:{"^":"a:0;a",
$1:function(a){return this.a}},
qL:{"^":"a:7;a,b,c",
$0:function(){var z,y,x,w
try{this.a.b=this.b.k6(this.c)}catch(x){z=H.C(x)
y=H.E(x)
w=this.a
w.b=new P.cH(z,y)
w.a=!0}}},
qK:{"^":"a:7;a,b,c",
$0:function(){var z,y,x,w,v,u,t,s
try{z=this.a.a.c
w=this.c
if(w.kz(z)===!0&&w.e!=null){v=this.b
v.b=w.jZ(z)
v.a=!1}}catch(u){y=H.C(u)
x=H.E(u)
w=this.a
v=w.a.c.gbu()
t=y
s=this.b
if(v==null?t==null:v===t)s.b=w.a.c
else s.b=new P.cH(y,x)
s.a=!0}}},
hE:{"^":"d;jw:a<,cp:b@"},
al:{"^":"d;$ti",
aJ:function(a,b){return new P.r0(b,this,[H.y(this,"al",0),null])},
a7:function(a,b){var z,y
z={}
y=new P.H(0,$.q,null,[P.X])
z.a=null
z.a=this.aI(new P.oV(z,this,b,y),!0,new P.oW(y),y.gbU())
return y},
Z:function(a,b){var z,y
z={}
y=new P.H(0,$.q,null,[null])
z.a=null
z.a=this.aI(new P.oZ(z,this,b,y),!0,new P.p_(y),y.gbU())
return y},
gl:function(a){var z,y
z={}
y=new P.H(0,$.q,null,[P.t])
z.a=0
this.aI(new P.p4(z),!0,new P.p5(z,y),y.gbU())
return y},
gX:function(a){var z,y
z={}
y=new P.H(0,$.q,null,[P.X])
z.a=null
z.a=this.aI(new P.p0(z,y),!0,new P.p1(y),y.gbU())
return y},
cu:function(a){var z,y,x
z=H.y(this,"al",0)
y=H.p([],[z])
x=new P.H(0,$.q,null,[[P.N,z]])
this.aI(new P.p6(this,y),!0,new P.p7(y,x),x.gbU())
return x},
bG:function(a){var z,y,x
z=H.y(this,"al",0)
y=P.a5(null,null,null,z)
x=new P.H(0,$.q,null,[[P.bP,z]])
this.aI(new P.p8(this,y),!0,new P.p9(y,x),x.gbU())
return x},
gw:function(a){var z,y
z={}
y=new P.H(0,$.q,null,[H.y(this,"al",0)])
z.a=null
z.b=!1
this.aI(new P.p2(z,this),!0,new P.p3(z,y),y.gbU())
return y}},
oV:{"^":"a;a,b,c,d",
$1:function(a){var z,y
z=this.a
y=this.d
P.hZ(new P.oT(this.c,a),new P.oU(z,y),P.hO(z.a,y))},
$S:function(){return H.be(function(a){return{func:1,args:[a]}},this.b,"al")}},
oT:{"^":"a:2;a,b",
$0:function(){return J.e(this.b,this.a)}},
oU:{"^":"a:32;a,b",
$1:function(a){if(a===!0)P.hP(this.a.a,this.b,!0)}},
oW:{"^":"a:2;a",
$0:function(){this.a.bj(!1)}},
oZ:{"^":"a;a,b,c,d",
$1:function(a){P.hZ(new P.oX(this.c,a),new P.oY(),P.hO(this.a.a,this.d))},
$S:function(){return H.be(function(a){return{func:1,args:[a]}},this.b,"al")}},
oX:{"^":"a:2;a,b",
$0:function(){return this.a.$1(this.b)}},
oY:{"^":"a:0;",
$1:function(a){}},
p_:{"^":"a:2;a",
$0:function(){this.a.bj(null)}},
p4:{"^":"a:0;a",
$1:function(a){++this.a.a}},
p5:{"^":"a:2;a,b",
$0:function(){this.b.bj(this.a.a)}},
p0:{"^":"a:0;a,b",
$1:function(a){P.hP(this.a.a,this.b,!1)}},
p1:{"^":"a:2;a",
$0:function(){this.a.bj(!0)}},
p6:{"^":"a;a,b",
$1:function(a){this.b.push(a)},
$S:function(){return H.be(function(a){return{func:1,args:[a]}},this.a,"al")}},
p7:{"^":"a:2;a,b",
$0:function(){this.b.bj(this.a)}},
p8:{"^":"a;a,b",
$1:function(a){this.b.q(0,a)},
$S:function(){return H.be(function(a){return{func:1,args:[a]}},this.a,"al")}},
p9:{"^":"a:2;a,b",
$0:function(){this.b.bj(this.a)}},
p2:{"^":"a;a,b",
$1:function(a){var z=this.a
z.b=!0
z.a=a},
$S:function(){return H.be(function(a){return{func:1,args:[a]}},this.b,"al")}},
p3:{"^":"a:2;a,b",
$0:function(){var z,y,x,w
x=this.a
if(x.b){this.b.bj(x.a)
return}try{x=H.aj()
throw H.c(x)}catch(w){z=H.C(w)
y=H.E(w)
P.rw(this.b,z,y)}}},
db:{"^":"d;cK:b<,$ti",
ge_:function(){return new P.d7(this,this.$ti)},
gkp:function(){return(this.b&4)!==0},
gcV:function(){var z=this.b
return(z&1)!==0?this.gbK().gfA():(z&2)===0},
giW:function(){if((this.b&8)===0)return this.a
return this.a.gd5()},
e8:function(){var z,y
if((this.b&8)===0){z=this.a
if(z==null){z=new P.el(null,null,0,this.$ti)
this.a=z}return z}y=this.a
if(y.gd5()==null)y.c=new P.el(null,null,0,this.$ti)
return y.c},
gbK:function(){if((this.b&8)!==0)return this.a.gd5()
return this.a},
cA:function(){if((this.b&4)!==0)return new P.w("Cannot add event after closing")
return new P.w("Cannot add event while adding a stream")},
ju:function(a,b){var z,y,x,w
z=this.b
if(z>=4)throw H.c(this.cA())
if((z&2)!==0){z=new P.H(0,$.q,null,[null])
z.bC(null)
return z}z=this.a
y=new P.H(0,$.q,null,[null])
x=a.aI(this.gir(),!1,this.gis(),this.gio())
w=this.b
if((w&1)!==0?this.gbK().gfA():(w&2)===0)x.cY()
this.a=new P.r7(z,y,x,this.$ti)
this.b|=8
return y},
fo:function(){var z=this.c
if(z==null){z=(this.b&2)!==0?$.$get$bm():new P.H(0,$.q,null,[null])
this.c=z}return z},
q:[function(a,b){if(this.b>=4)throw H.c(this.cA())
this.bT(b)},"$1","gjh",2,0,function(){return H.be(function(a){return{func:1,v:true,args:[a]}},this.$receiver,"db")}],
ey:function(a,b){if(this.b>=4)throw H.c(this.cA())
if(a==null)a=new P.cX()
$.q.toString
this.cd(a,b)},
bt:function(){var z=this.b
if((z&4)!==0)return this.fo()
if(z>=4)throw H.c(this.cA())
z|=4
this.b=z
if((z&1)!==0)this.cI()
else if((z&3)===0)this.e8().q(0,C.v)
return this.fo()},
bT:[function(a){var z=this.b
if((z&1)!==0)this.cH(a)
else if((z&3)===0)this.e8().q(0,new P.ef(a,null,this.$ti))},"$1","gir",2,0,function(){return H.be(function(a){return{func:1,v:true,args:[a]}},this.$receiver,"db")}],
cd:[function(a,b){var z=this.b
if((z&1)!==0)this.cJ(a,b)
else if((z&3)===0)this.e8().q(0,new P.eg(a,b,null))},"$2","gio",4,0,49],
e2:[function(){var z=this.a
this.a=z.gd5()
this.b&=4294967287
z.a.bC(null)},"$0","gis",0,0,7],
j9:function(a,b,c,d){var z,y,x,w,v
if((this.b&3)!==0)throw H.c(new P.w("Stream has already been listened to."))
z=$.q
y=d?1:0
x=new P.qw(this,null,null,null,z,y,null,null,this.$ti)
x.fe(a,b,c,d,H.l(this,0))
w=this.giW()
y=this.b|=1
if((y&8)!==0){v=this.a
v.sd5(x)
v.b.d1()}else this.a=x
x.j7(w)
x.ed(new P.r9(this))
return x},
j_:function(a){var z,y,x,w,v,u
z=null
if((this.b&8)!==0)z=this.a.cj()
this.a=null
this.b=this.b&4294967286|2
w=this.r
if(w!=null)if(z==null)try{z=w.$0()}catch(v){y=H.C(v)
x=H.E(v)
u=new P.H(0,$.q,null,[null])
u.fh(y,x)
z=u}else z=z.c6(w)
w=new P.r8(this)
if(z!=null)z=z.c6(w)
else w.$0()
return z}},
r9:{"^":"a:2;a",
$0:function(){P.es(this.a.d)}},
r8:{"^":"a:7;a",
$0:function(){var z=this.a.c
if(z!=null&&z.a===0)z.bC(null)}},
rh:{"^":"d;$ti",
cH:function(a){this.gbK().bT(a)},
cJ:function(a,b){this.gbK().cd(a,b)},
cI:function(){this.gbK().e2()}},
qt:{"^":"d;$ti",
cH:function(a){this.gbK().ce(new P.ef(a,null,[H.l(this,0)]))},
cJ:function(a,b){this.gbK().ce(new P.eg(a,b,null))},
cI:function(){this.gbK().ce(C.v)}},
qs:{"^":"db+qt;a,b,c,d,e,f,r,$ti"},
rg:{"^":"db+rh;a,b,c,d,e,f,r,$ti"},
d7:{"^":"ra;a,$ti",
gB:function(a){return(H.aC(this.a)^892482866)>>>0},
A:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof P.d7))return!1
return b.a===this.a}},
qw:{"^":"ct;x,a,b,c,d,e,f,r,$ti",
ek:function(){return this.x.j_(this)},
em:[function(){var z=this.x
if((z.b&8)!==0)z.a.cY()
P.es(z.e)},"$0","gel",0,0,7],
eo:[function(){var z=this.x
if((z.b&8)!==0)z.a.d1()
P.es(z.f)},"$0","gen",0,0,7]},
qc:{"^":"d;$ti",
cY:function(){this.b.cY()},
d1:function(){this.b.d1()},
cj:function(){var z=this.b.cj()
if(z==null){this.a.bC(null)
return}return z.c6(new P.qd(this))},
eC:function(){this.a.bC(null)}},
qd:{"^":"a:2;a",
$0:function(){this.a.a.bC(null)}},
r7:{"^":"qc;d5:c@,a,b,$ti"},
ct:{"^":"d;cK:e<,$ti",
j7:function(a){if(a==null)return
this.r=a
if(!a.gX(a)){this.e=(this.e|64)>>>0
this.r.da(this)}},
kF:function(a){var z=this.e
if((z&8)!==0)return
this.e=(z+128|4)>>>0
if(z<128&&this.r!=null)this.r.fT()
if((z&4)===0&&(this.e&32)===0)this.ed(this.gel())},
cY:function(){return this.kF(null)},
d1:function(){var z=this.e
if((z&8)!==0)return
if(z>=128){z-=128
this.e=z
if(z<128){if((z&64)!==0){z=this.r
z=!z.gX(z)}else z=!1
if(z)this.r.da(this)
else{z=(this.e&4294967291)>>>0
this.e=z
if((z&32)===0)this.ed(this.gen())}}}},
cj:function(){var z=(this.e&4294967279)>>>0
this.e=z
if((z&8)===0)this.e3()
z=this.f
return z==null?$.$get$bm():z},
gfA:function(){return(this.e&4)!==0},
gcV:function(){return this.e>=128},
e3:function(){var z=(this.e|8)>>>0
this.e=z
if((z&64)!==0)this.r.fT()
if((this.e&32)===0)this.r=null
this.f=this.ek()},
bT:["i4",function(a){var z=this.e
if((z&8)!==0)return
if(z<32)this.cH(a)
else this.ce(new P.ef(a,null,[H.y(this,"ct",0)]))}],
cd:["i5",function(a,b){var z=this.e
if((z&8)!==0)return
if(z<32)this.cJ(a,b)
else this.ce(new P.eg(a,b,null))}],
e2:function(){var z=this.e
if((z&8)!==0)return
z=(z|2)>>>0
this.e=z
if(z<32)this.cI()
else this.ce(C.v)},
em:[function(){},"$0","gel",0,0,7],
eo:[function(){},"$0","gen",0,0,7],
ek:function(){return},
ce:function(a){var z,y
z=this.r
if(z==null){z=new P.el(null,null,0,[H.y(this,"ct",0)])
this.r=z}z.q(0,a)
y=this.e
if((y&64)===0){y=(y|64)>>>0
this.e=y
if(y<128)this.r.da(this)}},
cH:function(a){var z=this.e
this.e=(z|32)>>>0
this.d.hz(this.a,a)
this.e=(this.e&4294967263)>>>0
this.e5((z&4)!==0)},
cJ:function(a,b){var z,y
z=this.e
y=new P.qv(this,a,b)
if((z&1)!==0){this.e=(z|16)>>>0
this.e3()
z=this.f
if(!!J.o(z).$isQ&&z!==$.$get$bm())z.c6(y)
else y.$0()}else{y.$0()
this.e5((z&4)!==0)}},
cI:function(){var z,y
z=new P.qu(this)
this.e3()
this.e=(this.e|16)>>>0
y=this.f
if(!!J.o(y).$isQ&&y!==$.$get$bm())y.c6(z)
else z.$0()},
ed:function(a){var z=this.e
this.e=(z|32)>>>0
a.$0()
this.e=(this.e&4294967263)>>>0
this.e5((z&4)!==0)},
e5:function(a){var z,y
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
if(y)this.em()
else this.eo()
this.e=(this.e&4294967263)>>>0}z=this.e
if((z&64)!==0&&z<128)this.r.da(this)},
fe:function(a,b,c,d,e){var z=this.d
z.toString
this.a=a
this.b=P.er(b==null?P.rO():b,z)
this.c=c==null?P.rN():c}},
qv:{"^":"a:7;a,b,c",
$0:function(){var z,y,x,w,v,u
z=this.a
y=z.e
if((y&8)!==0&&(y&16)===0)return
z.e=(y|32)>>>0
y=z.b
x=H.ay(y,{func:1,args:[P.d,P.b2]})
w=z.d
v=this.b
u=z.b
if(x)w.kX(u,v,this.c)
else w.hz(u,v)
z.e=(z.e&4294967263)>>>0}},
qu:{"^":"a:7;a",
$0:function(){var z,y
z=this.a
y=z.e
if((y&16)===0)return
z.e=(y|42)>>>0
z.d.hx(z.c)
z.e=(z.e&4294967263)>>>0}},
ra:{"^":"al;$ti",
aI:function(a,b,c,d){return this.a.j9(a,d,c,!0===b)},
eR:function(a,b,c){return this.aI(a,null,b,c)}},
eh:{"^":"d;cp:a@,$ti"},
ef:{"^":"eh;ad:b<,a,$ti",
eS:function(a){a.cH(this.b)}},
eg:{"^":"eh;bu:b<,bq:c<,a",
eS:function(a){a.cJ(this.b,this.c)},
$aseh:I.bg},
qx:{"^":"d;",
eS:function(a){a.cI()},
gcp:function(){return},
scp:function(a){throw H.c(new P.w("No events after a done."))}},
r2:{"^":"d;cK:a<,$ti",
da:function(a){var z=this.a
if(z===1)return
if(z>=1){this.a=1
return}P.cB(new P.r3(this,a))
this.a=1},
fT:function(){if(this.a===1)this.a=3}},
r3:{"^":"a:2;a,b",
$0:function(){var z,y,x,w
z=this.a
y=z.a
z.a=0
if(y===3)return
x=z.b
w=x.gcp()
z.b=w
if(w==null)z.c=null
x.eS(this.b)}},
el:{"^":"r2;b,c,a,$ti",
gX:function(a){return this.c==null},
q:function(a,b){var z=this.c
if(z==null){this.c=b
this.b=b}else{z.scp(b)
this.c=b}}},
rb:{"^":"d;a,b,c,$ti"},
rr:{"^":"a:2;a,b,c",
$0:function(){return this.a.bk(this.b,this.c)}},
rq:{"^":"a:16;a,b",
$2:function(a,b){P.rp(this.a,this.b,a,b)}},
rs:{"^":"a:2;a,b",
$0:function(){return this.a.bj(this.b)}},
ei:{"^":"al;$ti",
aI:function(a,b,c,d){return this.iA(a,d,c,!0===b)},
eR:function(a,b,c){return this.aI(a,null,b,c)},
iA:function(a,b,c,d){return P.qB(this,a,b,c,d,H.y(this,"ei",0),H.y(this,"ei",1))},
fv:function(a,b){b.bT(a)},
iM:function(a,b,c){c.cd(a,b)},
$asal:function(a,b){return[b]}},
hH:{"^":"ct;x,y,a,b,c,d,e,f,r,$ti",
bT:function(a){if((this.e&2)!==0)return
this.i4(a)},
cd:function(a,b){if((this.e&2)!==0)return
this.i5(a,b)},
em:[function(){var z=this.y
if(z==null)return
z.cY()},"$0","gel",0,0,7],
eo:[function(){var z=this.y
if(z==null)return
z.d1()},"$0","gen",0,0,7],
ek:function(){var z=this.y
if(z!=null){this.y=null
return z.cj()}return},
lg:[function(a){this.x.fv(a,this)},"$1","giJ",2,0,function(){return H.be(function(a,b){return{func:1,v:true,args:[a]}},this.$receiver,"hH")}],
li:[function(a,b){this.x.iM(a,b,this)},"$2","giL",4,0,41],
lh:[function(){this.e2()},"$0","giK",0,0,7],
ij:function(a,b,c,d,e,f,g){this.y=this.x.a.eR(this.giJ(),this.giK(),this.giL())},
$asct:function(a,b){return[b]},
v:{
qB:function(a,b,c,d,e,f,g){var z,y
z=$.q
y=e?1:0
y=new P.hH(a,null,null,null,null,z,y,null,null,[f,g])
y.fe(b,c,d,e,g)
y.ij(a,b,c,d,e,f,g)
return y}}},
r0:{"^":"ei;b,a,$ti",
fv:function(a,b){var z,y,x,w
z=null
try{z=this.b.$1(a)}catch(w){y=H.C(w)
x=H.E(w)
P.rk(b,y,x)
return}b.bT(z)}},
cH:{"^":"d;bu:a<,bq:b<",
k:function(a){return H.b(this.a)},
$isa4:1},
rj:{"^":"d;"},
rE:{"^":"a:2;a,b",
$0:function(){var z,y,x
z=this.a
y=z.a
if(y==null){x=new P.cX()
z.a=x
z=x}else z=y
y=this.b
if(y==null)throw H.c(z)
x=H.c(z)
x.stack=J.h(y)
throw x}},
r4:{"^":"rj;",
hx:function(a){var z,y,x,w
try{if(C.i===$.q){x=a.$0()
return x}x=P.hW(null,null,this,a)
return x}catch(w){z=H.C(w)
y=H.E(w)
x=P.bx(null,null,this,z,y)
return x}},
hz:function(a,b){var z,y,x,w
try{if(C.i===$.q){x=a.$1(b)
return x}x=P.hY(null,null,this,a,b)
return x}catch(w){z=H.C(w)
y=H.E(w)
x=P.bx(null,null,this,z,y)
return x}},
kX:function(a,b,c){var z,y,x,w
try{if(C.i===$.q){x=a.$2(b,c)
return x}x=P.hX(null,null,this,a,b,c)
return x}catch(w){z=H.C(w)
y=H.E(w)
x=P.bx(null,null,this,z,y)
return x}},
eA:function(a,b){if(b)return new P.r5(this,a)
else return new P.r6(this,a)},
j:function(a,b){return},
hw:function(a){if($.q===C.i)return a.$0()
return P.hW(null,null,this,a)},
eX:function(a,b){if($.q===C.i)return a.$1(b)
return P.hY(null,null,this,a,b)},
kW:function(a,b,c){if($.q===C.i)return a.$2(b,c)
return P.hX(null,null,this,a,b,c)}},
r5:{"^":"a:2;a,b",
$0:function(){return this.a.hx(this.b)}},
r6:{"^":"a:2;a,b",
$0:function(){return this.a.hw(this.b)}}}],["","",,P,{"^":"",
dL:function(a,b){return new H.R(0,null,null,null,null,null,0,[a,b])},
aP:function(){return new H.R(0,null,null,null,null,null,0,[null,null])},
ad:function(a){return H.ua(a,new H.R(0,null,null,null,null,null,0,[null,null]))},
m3:function(a,b,c){var z,y
if(P.ep(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}z=[]
y=$.$get$bZ()
y.push(a)
try{P.rz(a,z)}finally{if(0>=y.length)return H.f(y,-1)
y.pop()}y=P.hb(b,z,", ")+c
return y.charCodeAt(0)==0?y:y},
cf:function(a,b,c){var z,y,x
if(P.ep(a))return b+"..."+c
z=new P.bS(b)
y=$.$get$bZ()
y.push(a)
try{x=z
x.C=P.hb(x.gC(),a,", ")}finally{if(0>=y.length)return H.f(y,-1)
y.pop()}y=z
y.C=y.gC()+c
y=z.gC()
return y.charCodeAt(0)==0?y:y},
ep:function(a){var z,y
for(z=0;y=$.$get$bZ(),z<y.length;++z)if(a===y[z])return!0
return!1},
rz:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=a.ga_(a)
y=0
x=0
while(!0){if(!(y<80||x<3))break
if(!z.u())return
w=H.b(z.gS())
b.push(w)
y+=w.length+2;++x}if(!z.u()){if(x<=5)return
if(0>=b.length)return H.f(b,-1)
v=b.pop()
if(0>=b.length)return H.f(b,-1)
u=b.pop()}else{t=z.gS();++x
if(!z.u()){if(x<=4){b.push(H.b(t))
return}v=H.b(t)
if(0>=b.length)return H.f(b,-1)
u=b.pop()
y+=v.length+2}else{s=z.gS();++x
for(;z.u();t=s,s=r){r=z.gS();++x
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
mp:function(a,b,c,d,e){return new H.R(0,null,null,null,null,null,0,[d,e])},
cj:function(a,b,c){var z=P.mp(null,null,null,b,c)
a.Z(0,new P.rQ(z))
return z},
a5:function(a,b,c,d){return new P.hK(0,null,null,null,null,null,0,[d])},
b9:function(a,b){var z,y
z=P.a5(null,null,null,b)
for(y=J.ai(a);y.u();)z.q(0,y.gS())
return z},
dQ:function(a){var z,y,x
z={}
if(P.ep(a))return"{...}"
y=new P.bS("")
try{$.$get$bZ().push(a)
x=y
x.C=x.gC()+"{"
z.a=!0
a.Z(0,new P.mA(z,y))
z=y
z.C=z.gC()+"}"}finally{z=$.$get$bZ()
if(0>=z.length)return H.f(z,-1)
z.pop()}z=y.gC()
return z.charCodeAt(0)==0?z:z},
hL:{"^":"R;a,b,c,d,e,f,r,$ti",
cT:function(a){return H.uO(a)&0x3ffffff},
cU:function(a,b){var z,y,x
if(a==null)return-1
z=a.length
for(y=0;y<z;++y){x=a[y].gh9()
if(x==null?b==null:x===b)return y}return-1},
v:{
bW:function(a,b){return new P.hL(0,null,null,null,null,null,0,[a,b])}}},
hK:{"^":"qO;a,b,c,d,e,f,r,$ti",
ei:function(){return new P.hK(0,null,null,null,null,null,0,this.$ti)},
ga_:function(a){var z=new P.af(this,this.r,null,null,[null])
z.c=this.e
return z},
gl:function(a){return this.a},
gX:function(a){return this.a===0},
gau:function(a){return this.a!==0},
a7:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null)return!1
return z[b]!=null}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null)return!1
return y[b]!=null}else return this.iy(b)},
iy:function(a){var z=this.d
if(z==null)return!1
return this.dl(z[this.dk(a)],a)>=0},
co:function(a){var z
if(!(typeof a==="string"&&a!=="__proto__"))z=typeof a==="number"&&(a&0x3ffffff)===a
else z=!0
if(z)return this.a7(0,a)?a:null
else return this.iQ(a)},
iQ:function(a){var z,y,x
z=this.d
if(z==null)return
y=z[this.dk(a)]
x=this.dl(y,a)
if(x<0)return
return J.az(y,x).gfn()},
Z:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$1(z.a)
if(y!==this.r)throw H.c(new P.D(this))
z=z.b}},
gw:function(a){var z=this.f
if(z==null)throw H.c(new P.w("No elements"))
return z.a},
q:function(a,b){var z,y,x
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.b=y
z=y}return this.fi(z,b)}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.c=y
x=y}return this.fi(x,b)}else return this.aC(b)},
aC:function(a){var z,y,x
z=this.d
if(z==null){z=P.qX()
this.d=z}y=this.dk(a)
x=z[y]
if(x==null)z[y]=[this.e6(a)]
else{if(this.dl(x,a)>=0)return!1
x.push(this.e6(a))}return!0},
a3:function(a,b){if(typeof b==="string"&&b!=="__proto__")return this.fj(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.fj(this.c,b)
else return this.j0(b)},
j0:function(a){var z,y,x
z=this.d
if(z==null)return!1
y=z[this.dk(a)]
x=this.dl(y,a)
if(x<0)return!1
this.fk(y.splice(x,1)[0])
return!0},
iG:function(a,b){var z,y,x,w,v
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
fi:function(a,b){if(a[b]!=null)return!1
a[b]=this.e6(b)
return!0},
fj:function(a,b){var z
if(a==null)return!1
z=a[b]
if(z==null)return!1
this.fk(z)
delete a[b]
return!0},
e6:function(a){var z,y
z=new P.qW(a,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.c=y
y.b=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
fk:function(a){var z,y
z=a.gix()
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
for(y=0;y<z;++y)if(J.e(a[y].gfn(),b))return y
return-1},
$isbP:1,
$isa_:1,
v:{
qX:function(){var z=Object.create(null)
z["<non-identifier-key>"]=z
delete z["<non-identifier-key>"]
return z}}},
qW:{"^":"d;fn:a<,b,ix:c<"},
af:{"^":"d;a,b,c,d,$ti",
gS:function(){return this.d},
u:function(){var z=this.a
if(this.b!==z.r)throw H.c(new P.D(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.b
return!0}}}},
qO:{"^":"oi;$ti",
bG:function(a){var z=this.ei()
z.aw(0,this)
return z}},
ce:{"^":"B;$ti"},
rQ:{"^":"a:6;a",
$2:function(a,b){this.a.n(0,a,b)}},
fr:{"^":"fA;$ti"},
fA:{"^":"d+ba;$ti",$asN:null,$asa_:null,$isN:1,$isa_:1},
ba:{"^":"d;$ti",
ga_:function(a){return new H.dM(this,this.gl(this),0,null,[H.y(this,"ba",0)])},
at:function(a,b){return this.j(0,b)},
Z:function(a,b){var z,y
z=this.gl(this)
for(y=0;y<z;++y){b.$1(this.j(0,y))
if(z!==this.gl(this))throw H.c(new P.D(this))}},
gX:function(a){return this.gl(this)===0},
gau:function(a){return!this.gX(this)},
gw:function(a){if(this.gl(this)===0)throw H.c(H.aj())
return this.j(0,this.gl(this)-1)},
a7:function(a,b){var z,y
z=this.gl(this)
for(y=0;y<this.gl(this);++y){if(J.e(this.j(0,y),b))return!0
if(z!==this.gl(this))throw H.c(new P.D(this))}return!1},
bs:function(a,b){var z,y
z=this.gl(this)
for(y=0;y<z;++y){if(b.$1(this.j(0,y))===!0)return!0
if(z!==this.gl(this))throw H.c(new P.D(this))}return!1},
aT:function(a,b,c){var z,y,x
z=this.gl(this)
for(y=0;y<z;++y){x=this.j(0,y)
if(b.$1(x)===!0)return x
if(z!==this.gl(this))throw H.c(new P.D(this))}return c.$0()},
aJ:function(a,b){return new H.aq(this,b,[H.y(this,"ba",0),null])},
dZ:function(a,b){return H.hd(this,b,null,H.y(this,"ba",0))},
bG:function(a){var z,y
z=P.a5(null,null,null,H.y(this,"ba",0))
for(y=0;y<this.gl(this);++y)z.q(0,this.j(0,y))
return z},
q:function(a,b){var z=this.gl(this)
this.sl(0,z+1)
this.n(0,z,b)},
a3:function(a,b){var z
for(z=0;z<this.gl(this);++z)if(J.e(this.j(0,z),b)){this.b6(0,z,this.gl(this)-1,this,z+1)
this.sl(0,this.gl(this)-1)
return!0}return!1},
iF:function(a,b){var z,y,x,w
z=H.p([],[H.y(this,"ba",0)])
y=this.gl(this)
for(x=0;x<y;++x){w=this.j(0,x)
if(J.e(a.$1(w),b))z.push(w)
if(y!==this.gl(this))throw H.c(new P.D(this))}if(z.length!==this.gl(this)){this.hW(0,0,z.length,z)
this.sl(0,z.length)}},
b6:function(a,b,c,d,e){var z,y,x,w,v
P.cm(b,c,this.gl(this),null,null,null)
z=c-b
if(z===0)return
if(H.aW(d,"$isN",[H.y(this,"ba",0)],"$asN")){y=e
x=d}else{x=J.j_(d,e).bF(0,!1)
y=0}w=J.L(x)
if(y+z>w.gl(x))throw H.c(H.ff())
if(y<b)for(v=z-1;v>=0;--v)this.n(0,b+v,w.j(x,y+v))
else for(v=0;v<z;++v)this.n(0,b+v,w.j(x,y+v))},
hW:function(a,b,c,d){return this.b6(a,b,c,d,0)},
bP:function(a,b,c){var z
if(c>=this.gl(this))return-1
for(z=c;z<this.gl(this);++z)if(J.e(this.j(0,z),b))return z
return-1},
b1:function(a,b){return this.bP(a,b,0)},
k:function(a){return P.cf(this,"[","]")},
$isN:1,
$isa_:1},
ri:{"^":"d;$ti",
n:function(a,b,c){throw H.c(new P.S("Cannot modify unmodifiable map"))},
$isI:1},
my:{"^":"d;$ti",
j:function(a,b){return this.a.j(0,b)},
n:function(a,b,c){this.a.n(0,b,c)},
ac:function(a){return this.a.ac(a)},
Z:function(a,b){this.a.Z(0,b)},
gX:function(a){var z=this.a
return z.gX(z)},
gau:function(a){var z=this.a
return z.gau(z)},
gl:function(a){var z=this.a
return z.gl(z)},
k:function(a){return this.a.k(0)},
$isI:1},
hz:{"^":"my+ri;a,$ti",$asI:null,$isI:1},
mA:{"^":"a:6;a,b",
$2:function(a,b){var z,y
z=this.a
if(!z.a)this.b.C+=", "
z.a=!1
z=this.b
y=z.C+=H.b(a)
z.C=y+": "
z.C+=H.b(b)}},
mq:{"^":"b1;a,b,c,d,$ti",
ga_:function(a){return new P.da(this,this.c,this.d,this.b,null,this.$ti)},
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
at:function(a,b){var z,y,x,w
z=(this.c-this.b&this.a.length-1)>>>0
if(0>b||b>=z)H.i(P.cS(b,this,"index",null,z))
y=this.a
x=y.length
w=(this.b+b&x-1)>>>0
if(w<0||w>=x)return H.f(y,w)
return y[w]},
q:function(a,b){this.aC(b)},
aw:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=this.$ti
if(H.aW(b,"$isN",z,"$asN")){y=b.gl(b)
x=this.gl(this)
w=x+y
v=this.a
u=v.length
if(w>=u){t=P.mr(w+(w>>>1))
if(typeof t!=="number")return H.x(t)
v=new Array(t)
v.fixed$length=Array
s=H.p(v,z)
this.c=this.jd(s)
this.a=s
this.b=0
C.a.b6(s,x,w,b,0)
this.c+=y}else{z=this.c
r=u-z
if(y<r){C.a.b6(v,z,z+y,b,0)
this.c+=y}else{q=y-r
C.a.b6(v,z,z+r,b,0)
C.a.b6(this.a,0,q,b,r)
this.c=q}}++this.d}else for(z=new P.da(b,b.c,b.d,b.b,null,[H.l(b,0)]);z.u();)this.aC(z.e)},
bg:function(a){var z,y,x,w,v
z=this.b
y=this.c
if(z!==y){for(x=this.a,w=x.length,v=w-1;z!==y;z=(z+1&v)>>>0){if(z<0||z>=w)return H.f(x,z)
x[z]=null}this.c=0
this.b=0;++this.d}},
k:function(a){return P.cf(this,"{","}")},
fP:function(a){var z,y,x
z=this.b
y=this.a
x=y.length
z=(z-1&x-1)>>>0
this.b=z
if(z<0||z>=x)return H.f(y,z)
y[z]=a
if(z===this.c)this.fu();++this.d},
dJ:function(){var z,y,x,w
z=this.b
if(z===this.c)throw H.c(H.aj());++this.d
y=this.a
x=y.length
if(z>=x)return H.f(y,z)
w=y[z]
y[z]=null
this.b=(z+1&x-1)>>>0
return w},
aC:function(a){var z,y,x
z=this.a
y=this.c
x=z.length
if(y<0||y>=x)return H.f(z,y)
z[y]=a
x=(y+1&x-1)>>>0
this.c=x
if(this.b===x)this.fu();++this.d},
fu:function(){var z,y,x,w
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
jd:function(a){var z,y,x,w,v
z=this.b
y=this.c
x=this.a
if(z<=y){w=y-z
C.a.b6(a,0,w,x,z)
return w}else{v=x.length-z
C.a.b6(a,0,v,x,z)
C.a.b6(a,v,v+this.c,this.a,0)
return this.c+v}},
i8:function(a,b){var z=new Array(8)
z.fixed$length=Array
this.a=H.p(z,[b])},
v:{
bb:function(a,b){var z=new P.mq(null,0,0,0,[b])
z.i8(a,b)
return z},
mr:function(a){var z
a=C.P.f6(a,1)-1
for(;!0;a=z)z=(a&a-1)>>>0}}},
da:{"^":"d;a,b,c,d,e,$ti",
gS:function(){return this.e},
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
oj:{"^":"d;$ti",
gX:function(a){return this.a===0},
gau:function(a){return this.a!==0},
aw:function(a,b){var z
for(z=J.ai(b);z.u();)this.q(0,z.gS())},
jB:function(a){var z,y
for(z=a.a,y=new P.af(z,z.r,null,null,[null]),y.c=z.e;y.u();)if(!this.a7(0,y.d))return!1
return!0},
bF:function(a,b){var z,y,x,w,v
z=H.p([],this.$ti)
C.a.sl(z,this.a)
for(y=new P.af(this,this.r,null,null,[null]),y.c=this.e,x=0;y.u();x=v){w=y.d
v=x+1
if(x>=z.length)return H.f(z,x)
z[x]=w}return z},
cu:function(a){return this.bF(a,!0)},
aJ:function(a,b){return new H.bG(this,b,[H.l(this,0),null])},
k:function(a){return P.cf(this,"{","}")},
Z:function(a,b){var z
for(z=new P.af(this,this.r,null,null,[null]),z.c=this.e;z.u();)b.$1(z.d)},
bv:function(a,b,c){var z,y
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
ck:function(a,b){return this.aT(a,b,null)},
bB:function(a,b){var z,y,x,w
for(z=new P.af(this,this.r,null,null,[null]),z.c=this.e,y=null,x=!1;z.u();){w=z.d
if(b.$1(w)===!0){if(x)throw H.c(H.dC())
y=w
x=!0}}if(x)return y
throw H.c(H.aj())},
$isbP:1,
$isa_:1},
oi:{"^":"oj;$ti"}}],["","",,P,{"^":"",
dd:function(a){var z
if(a==null)return
if(typeof a!="object")return a
if(Object.getPrototypeOf(a)!==Array.prototype)return new P.qR(a,Object.create(null),null)
for(z=0;z<a.length;++z)a[z]=P.dd(a[z])
return a},
rC:function(a,b){var z,y,x,w
if(typeof a!=="string")throw H.c(H.T(a))
z=null
try{z=JSON.parse(a)}catch(x){y=H.C(x)
w=String(y)
throw H.c(new P.fa(w,null,null))}w=P.dd(z)
return w},
xn:[function(a){return a.dO()},"$1","tO",2,0,0],
qR:{"^":"d;a,b,c",
j:function(a,b){var z,y
z=this.b
if(z==null)return this.c.j(0,b)
else if(typeof b!=="string")return
else{y=z[b]
return typeof y=="undefined"?this.iZ(b):y}},
gl:function(a){var z
if(this.b==null){z=this.c
z=z.gl(z)}else z=this.cC().length
return z},
gX:function(a){var z
if(this.b==null){z=this.c
z=z.gl(z)}else z=this.cC().length
return z===0},
gau:function(a){var z
if(this.b==null){z=this.c
z=z.gl(z)}else z=this.cC().length
return z>0},
n:function(a,b,c){var z,y
if(this.b==null)this.c.n(0,b,c)
else if(this.ac(b)){z=this.b
z[b]=c
y=this.a
if(y==null?z!=null:y!==z)y[b]=null}else this.jb().n(0,b,c)},
ac:function(a){if(this.b==null)return this.c.ac(a)
if(typeof a!=="string")return!1
return Object.prototype.hasOwnProperty.call(this.a,a)},
Z:function(a,b){var z,y,x,w
if(this.b==null)return this.c.Z(0,b)
z=this.cC()
for(y=0;y<z.length;++y){x=z[y]
w=this.b[x]
if(typeof w=="undefined"){w=P.dd(this.a[x])
this.b[x]=w}b.$2(x,w)
if(z!==this.c)throw H.c(new P.D(this))}},
k:function(a){return P.dQ(this)},
cC:function(){var z=this.c
if(z==null){z=Object.keys(this.a)
this.c=z}return z},
jb:function(){var z,y,x,w,v
if(this.b==null)return this.c
z=P.dL(P.r,null)
y=this.cC()
for(x=0;w=y.length,x<w;++x){v=y[x]
z.n(0,v,this.j(0,v))}if(w===0)y.push(null)
else C.a.sl(y,0)
this.b=null
this.a=null
this.c=z
return z},
iZ:function(a){var z
if(!Object.prototype.hasOwnProperty.call(this.a,a))return
z=P.dd(this.a[a])
return this.b[a]=z},
$isI:1,
$asI:function(){return[P.r,null]}},
f3:{"^":"d;$ti"},
cN:{"^":"d;$ti"},
dH:{"^":"a4;a,b",
k:function(a){if(this.b!=null)return"Converting object to an encodable object failed."
else return"Converting object did not return an encodable object."}},
m8:{"^":"dH;a,b",
k:function(a){return"Cyclic error in JSON stringify"}},
m7:{"^":"f3;a,b",
jF:function(a,b){var z=P.rC(a,this.gjG().a)
return z},
jE:function(a){return this.jF(a,null)},
jO:function(a,b){var z=this.gjP()
z=P.qT(a,z.b,z.a)
return z},
h0:function(a){return this.jO(a,null)},
gjP:function(){return C.S},
gjG:function(){return C.R},
$asf3:function(){return[P.d,P.r]}},
ma:{"^":"cN;a,b",
$ascN:function(){return[P.d,P.r]}},
m9:{"^":"cN;a",
$ascN:function(){return[P.r,P.d]}},
qU:{"^":"d;",
hI:function(a){var z,y,x,w,v,u,t
z=J.L(a)
y=z.gl(a)
if(typeof y!=="number")return H.x(y)
x=this.c
w=0
v=0
for(;v<y;++v){u=z.cQ(a,v)
if(u>92)continue
if(u<32){if(v>w)x.C+=C.b.aL(a,w,v)
w=v+1
x.C+=H.ar(92)
switch(u){case 8:x.C+=H.ar(98)
break
case 9:x.C+=H.ar(116)
break
case 10:x.C+=H.ar(110)
break
case 12:x.C+=H.ar(102)
break
case 13:x.C+=H.ar(114)
break
default:x.C+=H.ar(117)
x.C+=H.ar(48)
x.C+=H.ar(48)
t=u>>>4&15
x.C+=H.ar(t<10?48+t:87+t)
t=u&15
x.C+=H.ar(t<10?48+t:87+t)
break}}else if(u===34||u===92){if(v>w)x.C+=C.b.aL(a,w,v)
w=v+1
x.C+=H.ar(92)
x.C+=H.ar(u)}}if(w===0)x.C+=H.b(a)
else if(w<y)x.C+=z.aL(a,w,y)},
e4:function(a){var z,y,x,w
for(z=this.a,y=z.length,x=0;x<y;++x){w=z[x]
if(a==null?w==null:a===w)throw H.c(new P.m8(a,null))}z.push(a)},
dR:function(a){var z,y,x,w
if(this.hH(a))return
this.e4(a)
try{z=this.b.$1(a)
if(!this.hH(z))throw H.c(new P.dH(a,null))
x=this.a
if(0>=x.length)return H.f(x,-1)
x.pop()}catch(w){y=H.C(w)
throw H.c(new P.dH(a,y))}},
hH:function(a){var z,y
if(typeof a==="number"){if(!isFinite(a))return!1
this.c.C+=C.j.k(a)
return!0}else if(a===!0){this.c.C+="true"
return!0}else if(a===!1){this.c.C+="false"
return!0}else if(a==null){this.c.C+="null"
return!0}else if(typeof a==="string"){z=this.c
z.C+='"'
this.hI(a)
z.C+='"'
return!0}else{z=J.o(a)
if(!!z.$isN){this.e4(a)
this.l9(a)
z=this.a
if(0>=z.length)return H.f(z,-1)
z.pop()
return!0}else if(!!z.$isI){this.e4(a)
y=this.la(a)
z=this.a
if(0>=z.length)return H.f(z,-1)
z.pop()
return y}else return!1}},
l9:function(a){var z,y,x
z=this.c
z.C+="["
y=J.L(a)
if(y.gl(a)>0){this.dR(y.j(a,0))
for(x=1;x<y.gl(a);++x){z.C+=","
this.dR(y.j(a,x))}}z.C+="]"},
la:function(a){var z,y,x,w,v,u,t
z={}
if(a.gX(a)){this.c.C+="{}"
return!0}y=a.gl(a)*2
x=new Array(y)
z.a=0
z.b=!0
a.Z(0,new P.qV(z,x))
if(!z.b)return!1
w=this.c
w.C+="{"
for(v='"',u=0;u<y;u+=2,v=',"'){w.C+=v
this.hI(x[u])
w.C+='":'
t=u+1
if(t>=y)return H.f(x,t)
this.dR(x[t])}w.C+="}"
return!0}},
qV:{"^":"a:6;a,b",
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
qS:{"^":"qU;c,a,b",v:{
qT:function(a,b,c){var z,y,x
z=new P.bS("")
y=new P.qS(z,[],P.tO())
y.dR(a)
x=z.C
return x.charCodeAt(0)==0?x:x}}}}],["","",,P,{"^":"",
wJ:[function(a,b){return J.bE(a,b)},"$2","tP",4,0,42],
f7:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.h(a)
if(typeof a==="string")return JSON.stringify(a)
return P.l7(a)},
l7:function(a){var z=J.o(a)
if(!!z.$isa)return z.k(a)
return H.cZ(a)},
cQ:function(a){return new P.qA(a)},
P:function(a,b,c){var z,y
z=H.p([],[c])
for(y=J.ai(a);y.u();)z.push(y.gS())
if(b)return z
z.fixed$length=Array
return z},
ms:function(a,b,c,d){var z,y,x
z=H.p(new Array(a),[d])
for(y=0;y<a;++y){x=b.$1(y)
if(y>=z.length)return H.f(z,y)
z[y]=x}return z},
aB:function(a,b){var z=P.P(a,!1,b)
z.fixed$length=Array
z.immutable$list=Array
return z},
eC:function(a){H.uW(H.b(a))},
bq:function(a,b,c){return new H.dE(a,H.dF(a,!1,b,!1),null,null)},
X:{"^":"d;"},
"+bool":0,
V:{"^":"d;$ti"},
cO:{"^":"d;jc:a<,b",
A:function(a,b){if(b==null)return!1
if(!(b instanceof P.cO))return!1
return this.a===b.a&&!0},
bD:function(a,b){return C.e.bD(this.a,b.gjc())},
gB:function(a){var z=this.a
return(z^C.e.dt(z,30))&1073741823},
k:function(a){var z,y,x,w,v,u,t,s
z=P.kl(H.nq(this))
y=P.c6(H.no(this))
x=P.c6(H.nk(this))
w=P.c6(H.nl(this))
v=P.c6(H.nn(this))
u=P.c6(H.np(this))
t=P.km(H.nm(this))
s=z+"-"+y+"-"+x+" "+w+":"+v+":"+u+"."+t
return s},
q:function(a,b){var z,y
z=this.a+b.gkd()
y=new P.cO(z,!1)
if(!(Math.abs(z)>864e13))z=!1
else z=!0
if(z)H.i(P.G(y.gkA()))
return y},
gkA:function(){return this.a},
$isV:1,
$asV:function(){return[P.cO]},
v:{
kl:function(a){var z,y
z=Math.abs(a)
y=a<0?"-":""
if(z>=1000)return""+a
if(z>=100)return y+"0"+H.b(z)
if(z>=10)return y+"00"+H.b(z)
return y+"000"+H.b(z)},
km:function(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},
c6:function(a){if(a>=10)return""+a
return"0"+a}}},
aX:{"^":"M;",$isV:1,
$asV:function(){return[P.M]}},
"+double":0,
b8:{"^":"d;bV:a<",
ai:function(a,b){return new P.b8(this.a+b.gbV())},
as:function(a,b){return new P.b8(this.a-b.gbV())},
c9:function(a,b){if(typeof b!=="number")return H.x(b)
return new P.b8(C.j.hv(this.a*b))},
aZ:function(a,b){return C.e.aZ(this.a,b.gbV())},
bi:function(a,b){return this.a>b.gbV()},
d9:function(a,b){return this.a<=b.gbV()},
bS:function(a,b){return C.e.bS(this.a,b.gbV())},
gkd:function(){return C.e.bL(this.a,1000)},
A:function(a,b){if(b==null)return!1
if(!(b instanceof P.b8))return!1
return this.a===b.a},
gB:function(a){return this.a&0x1FFFFFFF},
bD:function(a,b){return C.e.bD(this.a,b.gbV())},
k:function(a){var z,y,x,w,v
z=new P.kP()
y=this.a
if(y<0)return"-"+new P.b8(0-y).k(0)
x=z.$1(C.e.bL(y,6e7)%60)
w=z.$1(C.e.bL(y,1e6)%60)
v=new P.kO().$1(y%1e6)
return""+C.e.bL(y,36e8)+":"+H.b(x)+":"+H.b(w)+"."+H.b(v)},
f5:function(a){return new P.b8(0-this.a)},
$isV:1,
$asV:function(){return[P.b8]}},
kO:{"^":"a:13;",
$1:function(a){if(a>=1e5)return""+a
if(a>=1e4)return"0"+a
if(a>=1000)return"00"+a
if(a>=100)return"000"+a
if(a>=10)return"0000"+a
return"00000"+a}},
kP:{"^":"a:13;",
$1:function(a){if(a>=10)return""+a
return"0"+a}},
a4:{"^":"d;",
gbq:function(){return H.E(this.$thrownJsError)}},
cX:{"^":"a4;",
k:function(a){return"Throw of null."}},
b7:{"^":"a4;a,b,h:c<,d",
gea:function(){return"Invalid argument"+(!this.a?"(s)":"")},
ge9:function(){return""},
k:function(a){var z,y,x,w,v,u
z=this.c
y=z!=null?" ("+z+")":""
z=this.d
x=z==null?"":": "+H.b(z)
w=this.gea()+y+x
if(!this.a)return w
v=this.ge9()
u=P.f7(this.b)
return w+v+": "+H.b(u)},
v:{
G:function(a){return new P.b7(!1,null,null,a)},
cG:function(a,b,c){return new P.b7(!0,a,b,c)},
m:function(a){return new P.b7(!1,null,a,"Must not be null")}}},
e4:{"^":"b7;e,f,a,b,c,d",
gea:function(){return"RangeError"},
ge9:function(){var z,y,x
z=this.e
if(z==null){z=this.f
y=z!=null?": Not less than or equal to "+H.b(z):""}else{x=this.f
if(x==null)y=": Not greater than or equal to "+H.b(z)
else if(x>z)y=": Not in range "+H.b(z)+".."+H.b(x)+", inclusive"
else y=x<z?": Valid value range is empty":": Only valid value is "+H.b(z)}return y},
v:{
nw:function(a){return new P.e4(null,null,!1,null,null,a)},
cl:function(a,b,c){return new P.e4(null,null,!0,a,b,"Value not in range")},
a7:function(a,b,c,d,e){return new P.e4(b,c,!0,a,d,"Invalid value")},
nx:function(a,b,c,d,e){if(a<b||a>c)throw H.c(P.a7(a,b,c,d,e))},
cm:function(a,b,c,d,e,f){if(0>a||a>c)throw H.c(P.a7(a,0,c,"start",f))
if(a>b||b>c)throw H.c(P.a7(b,a,c,"end",f))
return b}}},
lT:{"^":"b7;e,l:f>,a,b,c,d",
gea:function(){return"RangeError"},
ge9:function(){if(J.c1(this.b,0))return": index must not be negative"
var z=this.f
if(z===0)return": no indices are valid"
return": index should be less than "+H.b(z)},
v:{
cS:function(a,b,c,d,e){var z=e!=null?e:J.aM(b)
return new P.lT(b,z,!0,a,c,"Index out of range")}}},
S:{"^":"a4;a",
k:function(a){return"Unsupported operation: "+this.a}},
Y:{"^":"a4;a",
k:function(a){var z=this.a
return z!=null?"UnimplementedError: "+z:"UnimplementedError"}},
w:{"^":"a4;a",
k:function(a){return"Bad state: "+this.a}},
D:{"^":"a4;a",
k:function(a){var z=this.a
if(z==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+H.b(P.f7(z))+"."}},
mW:{"^":"d;",
k:function(a){return"Out of Memory"},
gbq:function(){return},
$isa4:1},
h7:{"^":"d;",
k:function(a){return"Stack Overflow"},
gbq:function(){return},
$isa4:1},
kk:{"^":"a4;a",
k:function(a){var z=this.a
return z==null?"Reading static variable during its initialization":"Reading static variable '"+H.b(z)+"' during its initialization"}},
qA:{"^":"d;a",
k:function(a){var z=this.a
if(z==null)return"Exception"
return"Exception: "+H.b(z)}},
fa:{"^":"d;a,b,c",
k:function(a){var z,y,x
z=this.a
y=""!==z?"FormatException: "+z:"FormatException"
x=this.b
if(typeof x!=="string")return y
if(x.length>78)x=C.b.aL(x,0,75)+"..."
return y+"\n"+x}},
lc:{"^":"d;h:a<,fB,$ti",
k:function(a){return"Expando:"+H.b(this.a)},
j:function(a,b){var z,y
z=this.fB
if(typeof z!=="string"){if(b==null||typeof b==="boolean"||typeof b==="number"||typeof b==="string")H.i(P.cG(b,"Expandos are not allowed on strings, numbers, booleans or null",null))
return z.get(b)}y=H.e_(b,"expando$values")
return y==null?null:H.e_(y,z)},
n:function(a,b,c){var z,y
z=this.fB
if(typeof z!=="string")z.set(b,c)
else{y=H.e_(b,"expando$values")
if(y==null){y=new P.d()
H.fK(b,"expando$values",y)}H.fK(y,z,c)}}},
bH:{"^":"d;"},
t:{"^":"M;",$isV:1,
$asV:function(){return[P.M]}},
"+int":0,
B:{"^":"d;$ti",
aJ:function(a,b){return H.bI(this,b,H.y(this,"B",0),null)},
c7:["dh",function(a,b){return new H.K(this,b,[H.y(this,"B",0)])}],
a7:function(a,b){var z
for(z=this.ga_(this);z.u();)if(J.e(z.gS(),b))return!0
return!1},
Z:function(a,b){var z
for(z=this.ga_(this);z.u();)b.$1(z.gS())},
bv:function(a,b,c){var z,y
for(z=this.ga_(this),y=b;z.u();)y=c.$2(y,z.gS())
return y},
bs:function(a,b){var z
for(z=this.ga_(this);z.u();)if(b.$1(z.gS())===!0)return!0
return!1},
bF:function(a,b){return P.P(this,b,H.y(this,"B",0))},
cu:function(a){return this.bF(a,!0)},
bG:function(a){return P.b9(this,H.y(this,"B",0))},
gl:function(a){var z,y
z=this.ga_(this)
for(y=0;z.u();)++y
return y},
gX:function(a){return!this.ga_(this).u()},
gau:function(a){return!this.gX(this)},
dZ:function(a,b){return H.op(this,b,H.y(this,"B",0))},
gw:function(a){var z,y
z=this.ga_(this)
if(!z.u())throw H.c(H.aj())
do y=z.gS()
while(z.u())
return y},
gcb:function(a){var z,y
z=this.ga_(this)
if(!z.u())throw H.c(H.aj())
y=z.gS()
if(z.u())throw H.c(H.dC())
return y},
at:function(a,b){var z,y,x
if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(P.m("index"))
if(b<0)H.i(P.a7(b,0,null,"index",null))
for(z=this.ga_(this),y=0;z.u();){x=z.gS()
if(b===y)return x;++y}throw H.c(P.cS(b,this,"index",null,y))},
k:function(a){return P.m3(this,"(",")")}},
cU:{"^":"d;$ti"},
N:{"^":"d;$ti",$isB:1,$isa_:1},
"+List":0,
I:{"^":"d;$ti"},
at:{"^":"d;",
gB:function(a){return P.d.prototype.gB.call(this,this)},
k:function(a){return"null"}},
"+Null":0,
M:{"^":"d;",$isV:1,
$asV:function(){return[P.M]}},
"+num":0,
d:{"^":";",
A:function(a,b){return this===b},
gB:function(a){return H.aC(this)},
k:function(a){return H.cZ(this)},
gby:function(a){return new H.av(H.io(this),null)},
toString:function(){return this.k(this)}},
bo:{"^":"d;"},
bP:{"^":"a_;$ti"},
b2:{"^":"d;"},
r:{"^":"d;",$isV:1,
$asV:function(){return[P.r]},
$isdX:1},
"+String":0,
bS:{"^":"d;C<",
gl:function(a){return this.C.length},
gX:function(a){return this.C.length===0},
gau:function(a){return this.C.length!==0},
k:function(a){var z=this.C
return z.charCodeAt(0)==0?z:z},
v:{
hb:function(a,b,c){var z=J.ai(b)
if(!z.u())return a
if(c.length===0){do a+=H.b(z.gS())
while(z.u())}else{a+=H.b(z.gS())
for(;z.u();)a=a+c+H.b(z.gS())}return a},
pc:function(a){return new P.bS(a)}}}}],["","",,P,{"^":"",fW:{"^":"d;"}}],["","",,P,{"^":"",
e3:function(a){return C.M},
qQ:{"^":"d;",
aq:function(a){if(a<=0||a>4294967296)throw H.c(P.nw("max must be in range 0 < max \u2264 2^32, was "+a))
return Math.random()*a>>>0},
kC:function(){return Math.random()}}}],["","",,S,{"^":"",k9:{"^":"d;a,b,$ti",
j:function(a,b){return this.b.j(0,b)},
ac:function(a){return this.b.ac(a)},
Z:function(a,b){return this.b.Z(0,b)},
gX:function(a){var z=this.b
return z.gX(z)},
gau:function(a){var z=this.b
return z.gau(z)},
gl:function(a){var z=this.b
return z.gl(z)},
n:function(a,b,c){this.iS()
this.b.n(0,b,c)},
k:function(a){return J.h(this.b)},
iS:function(){if(!this.a)return
this.a=!1
this.b=P.cj(this.b,H.l(this,0),H.l(this,1))},
$isI:1}}],["","",,A,{"^":"",ka:{"^":"d;a,b,$ti",
gl:function(a){return this.b.a},
co:function(a){return this.b.co(a)},
a7:function(a,b){return this.b.a7(0,b)},
Z:function(a,b){return this.b.Z(0,b)},
gX:function(a){return this.b.a===0},
gau:function(a){return this.b.a!==0},
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
bG:function(a){var z,y
z=this.b
y=z.ei()
y.aw(0,z)
return y},
q:function(a,b){this.iz()
return this.b.q(0,b)},
k:function(a){return J.h(this.b)},
iz:function(){if(!this.a)return
this.a=!1
this.b=P.b9(this.b,H.l(this,0))},
$isbP:1,
$isa_:1}}],["","",,S,{"^":"",dv:{"^":"d;fD:a<,b,$ti",
a1:function(a){var z=new S.O(null,null,this.$ti)
z.aj()
z.m(this)
a.$1(z)
return z.p()},
gB:function(a){var z=this.b
if(z==null){z=X.bC(this.a)
this.b=z}return z},
A:function(a,b){var z,y,x,w,v
if(b==null)return!1
if(b===this)return!0
z=J.o(b)
if(!z.$isdv)return!1
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
bP:function(a,b,c){var z=this.a
return(z&&C.a).bP(z,b,c)},
b1:function(a,b){return this.bP(a,b,0)},
ga_:function(a){var z=this.a
return new J.bk(z,z.length,0,null,[H.l(z,0)])},
aJ:function(a,b){var z=this.a
z.toString
return new H.aq(z,b,[H.l(z,0),null])},
a7:function(a,b){var z=this.a
return(z&&C.a).a7(z,b)},
Z:function(a,b){var z=this.a
return(z&&C.a).Z(z,b)},
bG:function(a){var z=this.a
z.toString
return P.b9(z,H.l(z,0))},
gX:function(a){return this.a.length===0},
gau:function(a){return this.a.length!==0},
gw:function(a){var z=this.a
return(z&&C.a).gw(z)},
aj:function(){if(new H.av(H.Z(H.l(this,0)),null).A(0,C.q))throw H.c(new P.S('explicit element type required, for example "new BuiltList<int>"'))}},O:{"^":"d;fD:a<,b,$ti",
p:function(){var z,y
z=this.b
if(z==null){z=this.a
y=new S.dv(z,null,this.$ti)
y.aj()
this.a=z
this.b=y
z=y}return z},
m:function(a){if(H.aW(a,"$isdv",this.$ti,null)){this.a=a.gfD()
this.b=a}else{this.a=P.P(a,!0,H.l(this,0))
this.b=null}},
j:function(a,b){var z=this.a
if(b>>>0!==b||b>=z.length)return H.f(z,b)
return z[b]},
n:function(a,b,c){var z
if(c==null)H.i(P.G("null element"))
z=this.geq()
if(b>>>0!==b||b>=z.length)return H.f(z,b)
z[b]=c},
q:function(a,b){var z
if(b==null)H.i(P.G("null element"))
z=this.geq();(z&&C.a).q(z,b)},
a3:function(a,b){var z=this.geq();(z&&C.a).a3(z,b)},
aJ:function(a,b){var z=this.a
z.toString
z=new H.aq(z,b,[H.l(z,0),null]).bF(0,!0)
this.a=z
this.b=null
this.iu(z)},
geq:function(){if(this.b!=null){this.a=P.P(this.a,!0,H.l(this,0))
this.b=null}return this.a},
aj:function(){if(new H.av(H.Z(H.l(this,0)),null).A(0,C.q))throw H.c(new P.S('explicit element type required, for example "new ListBuilder<int>"'))},
iu:function(a){var z,y,x,w
for(z=a.length,y=H.l(this,0),x=0;x<a.length;a.length===z||(0,H.as)(a),++x){w=a[x]
if(!H.dg(w,y))throw H.c(P.G("invalid element: "+H.b(w)))}}}}],["","",,A,{"^":"",cK:{"^":"d;iR:a<,b,c,d,$ti",
a1:function(a){var z=new A.cW(null,null,this.$ti)
z.cf()
z.m(this)
a.$1(z)
return z.p()},
E:function(){return new S.k9(!0,this.a,this.$ti)},
gB:function(a){var z=this.b
if(z==null){z=this.a.gcm()
z=H.bI(z,new A.jV(this),H.y(z,"B",0),null)
z=P.P(z,!1,H.y(z,"B",0))
C.a.f9(z)
z=X.bC(z)
this.b=z}return z},
A:function(a,b){var z,y,x,w,v
if(b==null)return!1
if(b===this)return!0
z=J.o(b)
if(!z.$iscK)return!1
y=b.a
x=this.a
if(y.gl(y)!==x.gl(x))return!1
z=z.gB(b)
w=this.gB(this)
if(z==null?w!=null:z!==w)return!1
z=this.c
if(z==null){z=x.gcm()
this.c=z}z=z.ga_(z)
for(;z.u();){v=z.gS()
if(!J.e(y.j(0,v),x.j(0,v)))return!1}return!0},
k:function(a){return J.h(this.a)},
j:function(a,b){return this.a.j(0,b)},
Z:function(a,b){this.a.Z(0,b)},
gX:function(a){var z=this.a
return z.gX(z)},
gau:function(a){var z=this.a
return z.gau(z)},
gl:function(a){var z=this.a
return z.gl(z)},
cf:function(){if(new H.av(H.Z(H.l(this,0)),null).A(0,C.q))throw H.c(new P.S('explicit key type required, for example "new BuiltMap<int, int>"'))
if(new H.av(H.Z(H.l(this,1)),null).A(0,C.q))throw H.c(new P.S('explicit value type required, for example "new BuiltMap<int, int>"'))}},jV:{"^":"a:0;a",
$1:function(a){var z,y
z=J.j(a)
y=J.j(this.a.a.j(0,a))
return X.de(X.b3(X.b3(0,J.j(z)),J.j(y)))}},cW:{"^":"d;a,b,$ti",
p:function(){var z=this.b
if(z==null){z=new A.cK(this.a,null,null,null,this.$ti)
z.cf()
this.b=z}return z},
m:function(a){var z
if(H.aW(a,"$iscK",this.$ti,null)){this.b=a
this.a=a.giR()}else if(!!a.$iscK){z=P.cj(a.a,H.l(this,0),H.l(this,1))
this.b=null
this.a=z}else if(!!a.$isI){z=P.cj(a,H.l(this,0),H.l(this,1))
this.b=null
this.a=z}else throw H.c(P.G("expected Map or BuiltMap, got "+H.b(a.gby(a))))},
j:function(a,b){return this.a.j(0,b)},
n:function(a,b,c){if(c==null)H.i(P.G("null value"))
this.gj3().n(0,b,c)},
gj3:function(){if(this.b!=null){this.a=P.cj(this.a,H.l(this,0),H.l(this,1))
this.b=null}return this.a},
cf:function(){if(new H.av(H.Z(H.l(this,0)),null).A(0,C.q))throw H.c(new P.S('explicit key type required, for example "new MapBuilder<int, int>"'))
if(new H.av(H.Z(H.l(this,1)),null).A(0,C.q))throw H.c(new P.S('explicit value type required, for example "new MapBuilder<int, int>"'))}}}],["","",,L,{"^":"",dw:{"^":"d;j5:a<,b,$ti",
a1:function(a){var z=new L.aD(null,null,this.$ti)
z.b0()
z.m(this)
a.$1(z)
return z.p()},
gB:function(a){var z=this.b
if(z==null){z=this.a
z.toString
z=P.P(new H.bG(z,new L.jW(),[H.l(z,0),null]),!1,null)
C.a.f9(z)
z=X.bC(z)
this.b=z}return z},
A:function(a,b){var z,y,x
if(b==null)return!1
if(b===this)return!0
z=J.o(b)
if(!z.$isdw)return!1
y=this.a
if(b.a.a!==y.a)return!1
z=z.gB(b)
x=this.gB(this)
if(z==null?x!=null:z!==x)return!1
return y.jB(b)},
k:function(a){return J.h(this.a)},
gl:function(a){return this.a.a},
co:function(a){return this.a.co(a)},
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
bG:function(a){return new A.ka(!0,this.a,this.$ti)},
gX:function(a){return this.a.a===0},
gau:function(a){return this.a.a!==0},
gw:function(a){var z=this.a
return z.gw(z)},
aT:function(a,b,c){return this.a.aT(0,b,c)},
ck:function(a,b){return this.aT(a,b,null)},
b0:function(){if(new H.av(H.Z(H.l(this,0)),null).A(0,C.q))throw H.c(new P.S('explicit element type required, for example "new BuiltSet<int>"'))}},jW:{"^":"a:0;",
$1:function(a){return J.j(a)}},aD:{"^":"d;a,b,$ti",
p:function(){var z=this.b
if(z==null){z=new L.dw(this.a,null,this.$ti)
z.b0()
this.b=z}return z},
m:function(a){var z,y,x,w
if(H.aW(a,"$isdw",this.$ti,null)){this.a=a.gj5()
this.b=a}else{z=H.l(this,0)
y=P.a5(null,null,null,z)
for(x=J.ai(a);x.u();){w=x.gS()
if(H.dg(w,z))y.q(0,w)
else throw H.c(P.G("iterable contained invalid element: "+H.b(w)))}this.b=null
this.a=y}},
q:function(a,b){if(b==null)H.i(P.G("null element"))
this.ger().q(0,b)},
a3:function(a,b){this.ger().a3(0,b)},
aJ:function(a,b){var z=this.a
z.toString
z=P.b9(new H.bG(z,b,[H.l(z,0),null]),null)
this.b=null
this.a=z
this.j6(z)},
ger:function(){if(this.b!=null){this.a=P.b9(this.a,H.l(this,0))
this.b=null}return this.a},
b0:function(){if(new H.av(H.Z(H.l(this,0)),null).A(0,C.q))throw H.c(new P.S('explicit element type required, for example "new SetBuilder<int>"'))},
j6:function(a){var z,y,x
for(z=new P.af(a,a.r,null,null,[null]),z.c=a.e,y=H.l(this,0);z.u();){x=z.d
if(!H.dg(x,y))throw H.c(P.G("invalid element: "+H.b(x)))}}}}],["","",,Y,{"^":"",
k:function(a,b){if(typeof b!=="number")return H.x(b)
a=536870911&a+b
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
U:function(a){a=536870911&a+((67108863&a)<<3)
a^=a>>>11
return 536870911&a+((16383&a)<<15)}}],["","",,N,{"^":"",nV:{"^":"nT;ch,cx,ag:cy@,b7:db@,dx,b,c,d,e,f,r,x,y,z,Q,a",
hn:function(){var z=$.$get$cC()
z.n(0,"game",this.cx)
z.n(0,"hitpoints",this.cy)
z.n(0,"stamina",this.db)
z.n(0,"gold",this.dx)},
kf:function(){var z,y,x,w
this.cx=null
this.cy=Z.bQ("Health",new N.nY(),"#CCCCCC","Your physical state",100,0,!0,P.aX)
z=P.t
this.db=Z.bQ("Stamina",new N.nZ(),"#CCCCCC","Spare physical energy",0,0,!0,z)
z=Z.bQ("Gold",new N.o_(),"#CCCCCC","Gold coins",0,0,!0,z)
this.dx=z
y=$.$get$c_()
x=this.cy
w=this.db
y=new O.f6(N.bn("EdgeheadGame"),null,!1,null,null,null,null,null,null,null,null,new Y.a2(H.p([],[Y.ah]),0,P.aP()),x,w,z,O.v5(),O.v4(),O.v3(),y,this.gi_(),new P.bS(""),!1,null)
y.hX()
this.cx=y
y.x="endGame"
$.$get$cy().q(0,0)},
ic:function(){var z,y
z=new O.d2(["# Insignificant Little Vermin",[null,P.ad(["goto","gameLoop"])]],0,null,!1,!1)
y=this.b.a
y.n(0,"start",z)
z.a="start"
z=new O.d2([new N.nX(this),[null,P.ad(["goto","gameLoop"])]],0,null,!1,!1)
y.n(0,"gameLoop",z)
z.a="gameLoop"
z=new O.d2(['<p class="meta">\n  Hit <strong>Restart</strong> (top left) to play again. It will be different.\n</p>'],0,null,!1,!1)
y.n(0,"endGame",z)
z.a="endGame"
this.c=y.j(0,"start")},
v:{
nW:function(){var z,y,x,w
z=Z.bQ("Health",new N.tq(),"#CCCCCC","Your physical state",100,0,!0,P.aX)
y=P.t
x=Z.bQ("Stamina",new N.tr(),"#CCCCCC","Spare physical energy",0,0,!0,y)
y=Z.bQ("Gold",new N.ts(),"#CCCCCC","Gold coins",0,0,!0,y)
w=P.r
z=new N.nV("net.filiph.edgehead.0.0.1",null,z,x,y,new O.o0(new H.R(0,null,null,null,null,null,0,[w,O.d2])),null,null,null,P.a5(null,null,null,w),!1,null,-9999,null,null,null)
z.ic()
return z}}},tq:{"^":"a:18;",
$1:function(a){var z=J.o(a)
if(z.A(a,0))return"\ud83d\udc80"
if(z.d9(a,0.5))return"\ud83d\ude23"
if(z.aZ(a,1))return"\ud83d\ude27"
return"\ud83d\ude10"}},tr:{"^":"a:9;",
$1:function(a){return H.b(a)+" \ud83d\udd06"}},ts:{"^":"a:9;",
$1:function(a){return H.b(a)+" \ud83d\udcb0"}},nX:{"^":"a:19;a",
$0:function(){var z=0,y=P.aA(),x=this
var $async$$0=P.ax(function(a,b){if(a===1)return P.aF(b,y)
while(true)switch(z){case 0:z=2
return P.aw(x.a.cx.bx(),$async$$0)
case 2:return P.aG(null,y)}})
return P.aH($async$$0,y)}},nY:{"^":"a:18;",
$1:function(a){var z=J.o(a)
if(z.A(a,0))return"\ud83d\udc80"
if(z.d9(a,0.5))return"\ud83d\ude23"
if(z.aZ(a,1))return"\ud83d\ude27"
return"\ud83d\ude10"}},nZ:{"^":"a:9;",
$1:function(a){return H.b(a)+" \ud83d\udd06"}},o_:{"^":"a:9;",
$1:function(a){return H.b(a)+" \ud83d\udcb0"}}}],["","",,M,{"^":"",cP:{"^":"d;"},l4:{"^":"d;"},pX:{"^":"cP;a,b,c",
a1:function(a){var z=new M.ec(null,!1,0,0)
z.m(this)
a.$1(z)
return z.p()},
A:function(a,b){if(b==null)return!1
if(b===this)return!0
if(!(b instanceof M.cP))return!1
return this.a===b.a&&this.b===b.b&&!0},
gB:function(a){return Y.U(Y.k(Y.k(Y.k(0,this.a&0x1FFFFFFF),this.b&0x1FFFFFFF),C.O.gB(!1)))},
k:function(a){return"EdgeheadGlobalState {bloodrockFollowers="+C.e.k(this.a)+",\nbrianaQuoteIndex="+C.e.k(this.b)+",\nhasKegOfBeer="+String(!1)+",\n}"}},ec:{"^":"l4;d,a,b,c",
gcw:function(){var z=this.d
if(z!=null){this.b=z.a
this.c=this.d.b
this.d.c
this.a=!1
this.d=null}return this},
m:function(a){this.d=a},
p:function(){var z,y,x
z=this.d
if(z==null){this.gcw()
y=this.b
this.gcw()
x=this.c
this.gcw()
this.a
z=new M.pX(y,x,!1)}this.m(z)
return z}}}],["","",,O,{"^":"",
xr:[function(a){var z,y
z=a.gca()
y=a.gbZ()
if(typeof y!=="number")return H.x(y)
return z-2*y},"$1","dj",2,0,27],
xD:[function(a){var z,y,x
z=a.gca()
y=a.gd2()
x=a.gbZ()
if(typeof x!=="number")return H.x(x)
return z+y-x},"$1","ic",2,0,27],
f6:{"^":"mu;y,z,Q,ch,cx,cy,db,dx,dy,bH:fr<,fx,fb:fy<,ag:go<,b7:id<,k1,a,b,c,d,e,f,r,x",
hX:function(){var z,y,x,w,v,u
z=P.aB(C.o,null)
y=$.$get$bA()
this.cy=R.b6(1000,"orc",O.dj(),null,null,new G.aE("sword",1,1,!1,!0,!1,z),null,0,2,0,!1,2,!1,C.t,0,y)
this.db=R.b6(1001,"goblin",O.dj(),null,null,new G.aE("scimitar",1,1,!1,!0,!1,P.aB(C.o,null)),null,0,1,0,!1,1,!1,C.t,0,y)
y=new S.O(null,null,[Q.v])
y.aj()
y.m([new Q.v("start_adventure","","",null)])
this.dx=new K.co(y.p(),"preStartBook",new O.kW(),new O.kX(),null,null,"ground")
y=R.b6(1,"Filip",null,"preStartBook",null,null,null,0,2,1000,!0,2,!0,C.F,1,null)
this.ch=y
z=y.x
y=y.cy
if(typeof z!=="number")return z.d7()
if(typeof y!=="number")return H.x(y)
this.go.sad(z/y)
this.id.sad(this.ch.fx)
this.k1.sad(this.ch.r)
this.cx=R.b6(100,"Briana",null,this.dx.b,null,null,this.ch.y,0,2,0,!1,2,!0,C.a4,0,null)
this.dy=F.fR(this.dx,!1)
y=K.co
x=P.P($.$get$i1(),!0,y)
C.a.aw(x,[this.dx,$.$get$ew()])
w=new M.ec(null,!1,0,0).p()
z=this.ch
v=this.cx
u=this.dy
v=P.b9([z,v],R.A)
z=P.bb(null,O.cE)
u=new A.a3(v,P.a5(null,null,null,U.ac),w,z,P.b9(x,y),P.P([u],!0,S.ae),0,null)
this.fr=u
y=new Y.a2(H.p([],[Y.ah]),0,P.aP())
y.b=u.r
this.fx=new B.bK(u,null,y,1,1,!0,!1,!1,0)},
d4:function(){var z=0,y=P.aA(),x,w=this,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
var $async$d4=P.ax(function(a,b){if(a===1)return P.aF(b,y)
while(true)switch(z){case 0:v=w.fy
u=w.gjN()
if(v.hk(u)){z=1
break}t=w.fr.U(w.ch.y)
s=t.gag()
r=t.ghf()
if(typeof s!=="number"){x=s.d7()
z=1
break}if(typeof r!=="number"){x=H.x(r)
z=1
break}w.go.sad(s/r)
w.id.sad(t.gb7())
r=w.k1
s=t.gf4()
if(!J.e(r.f,s)){r.f=s
r.y=!0
$.cr=!0}s=w.y
s.hb("update() for world at time "+w.fr.r)
r=w.fr.f
if(r.length===0){w.r=!0
v.t(0,"\n\n",!0)
if(w.fr.k9(w.ch.y))v.t(0,"TO BE CONTINUED.",!0)
else v.t(0,"You died.",!0)
w.f.C+=v.cs()
z=1
break}q=C.a.gw(r)
p=q.dT(w.fr)
o=G.j5(p,w.fr)
z=3
return P.aw(o.kH(),$async$d4)
case 3:r=o.f
if(r.gX(r)){n=o.a
m=o.b
n.f1("There are no actions available for actorId="+H.b(m)+".")
m="Actions not available for "+H.b(m)+" and "
l=o.c
k=l.a
j=J.o(k)
k="PlanConsequence<"+j.gB(k)+", "+j.k(k)+", "+J.h(l.b)+", "+H.b(l.d)+", "+l.y+", "
n.bO(m+(k+(l.x?"isSuccess":"")+">")+".")}n=Z.n2(r)
i=new Z.n1(new P.hz(r,[null,null]),n)
if(r.gX(r))$.$get$bL().f1("Created with no recommendations.")
if(n.length===0){s.dX("No recommendation for "+H.b(p.gh()))
s.dX(new O.kZ(w))
w.fr.h_(q.gi());++w.fr.r
z=1
break}z=p.gN()===!0?4:6
break
case 4:u=n.length
if(u>1)for(h=0;r=n.length,h<r;r===u||(0,H.as)(n),++h);s.bO("planner.generateTable for "+H.b(p.gh()))
o.f2().Z(0,new O.l_(w))
u=i.hm(q.gdE(),O.ic())
u.toString
g=P.P(u,!1,H.y(u,"B",0))
if(g.length!==0&&C.a.bs(g,new O.l0())){w.f.C+=v.cs()
C.a.sl(v.a,0)}v=new O.l1(new O.l3())
u=g.length-1
if(u-0<=32)H.h6(g,0,u,v)
else H.h5(g,0,u,v)
for(v=g.length,u=w.c,h=0;h<g.length;g.length===v||(0,H.as)(g),++h){f=g[h]
u.$3$helpMessage$script(f.gW(),f.gI(),new O.l2(w,p,f))}z=1
break
z=5
break
case 6:s=p.gfY()
z=7
return P.aw(w.cz(i.kG(s==null?O.ic():s),p,v),$async$d4)
case 7:case 5:v.hk(u)
case 1:return P.aG(x,y)}})
return P.aH($async$d4,y)},
cz:function(a,b,c){var z=0,y=P.aA(),x,w=this,v,u,t
var $async$cz=P.ax(function(d,e){if(d===1)return P.aF(e,y)
while(true)switch(z){case 0:v=a.dw(b,w.fx,w.fr)
u=P.P(v,!0,H.y(v,"B",0))
z=b.gN()===!0?3:5
break
case 3:z=6
return P.aw(w.dj(a,b,u),$async$cz)
case 6:z=4
break
case 5:t=S.nu(new H.aq(u,new O.kT(),[H.l(u,0),null]),1)
if(t>=u.length){x=H.f(u,t)
z=1
break}w.fx=u[t]
case 4:C.a.aw(c.a,w.fx.gfb().a)
w.fr=w.fx.gbH()
v=w.y
v.bO(new O.kU(a,b))
v.ak(new O.kV(w,b))
case 1:return P.aG(x,y)}})
return P.aH($async$cz,y)},
dj:function(a,b,c){var z=0,y=P.aA(),x=this,w,v,u,t,s,r,q,p,o,n,m,l
var $async$dj=P.ax(function(d,e){if(d===1)return P.aF(e,y)
while(true)switch(z){case 0:w=a.H(b,x.fr)
v=J.o(w)
z=v.A(w,1)?2:4
break
case 2:x.fx=C.a.gcb(c)
z=3
break
case 4:z=v.A(w,0)?5:7
break
case 5:x.fx=C.a.gcb(c)
z=6
break
case 7:u=C.a.gw(J.h(a.gK()).split("."))
v=v.l0(w)
t=a.a9(b,x.fr)
s=a.gO()&&b.kb(a.gK())
r="use "+H.b(u)
x.fH()
z=8
return P.aw(x.e.$4$rerollEffectDescription$rerollable(v,t,r,s),$async$dj)
case 8:q=e
s=new H.K(c,new O.kQ(q),[H.l(c,0)])
x.fx=s.gcb(s)
if(q.gl8()===!0){p=A.eb(x.fx.gbH())
p.Y(b.gi(),new O.kR())
v=x.fx
t=v.gfM()
s=H.p([],[Y.ah])
r=new Y.a2(s,0,P.aP())
C.a.aw(s,v.c.a)
s=v.d
o=v.e
n=v.f
m=v.r
l=v.x
v=v.y
r.b=p.r
x.fx=new B.bK(p,t,r,s,o,n,m,l,v)}case 6:case 3:return P.aG(null,y)}})
return P.aH($async$dj,y)}},
kW:{"^":"a:3;",
$3:function(a,b,c){return c.t(0,"UNUSED because this is the first choice",!0)}},
kX:{"^":"a:3;",
$3:function(a,b,c){return H.i(new P.w("Room isn't to be revisited"))}},
kZ:{"^":"a:2;a",
$0:function(){var z=this.a.fr.d
return"- how we got here: "+new H.aq(z,new O.kY(),[H.l(z,0),null]).cl(0," <- ")}},
kY:{"^":"a:0;",
$1:function(a){return a.gaS()}},
l_:{"^":"a:0;a",
$1:function(a){return this.a.y.bO(a)}},
l3:{"^":"a:51;",
$1:function(a){if(a instanceof Q.z)return H.b(a.b.gh())+" "+a.gW()
return"ZZZZZZ "+a.gW()}},
l0:{"^":"a:0;",
$1:function(a){return a.gW()!==""}},
l1:{"^":"a:6;a",
$2:function(a,b){var z=this.a
return J.bE(z.$1(a),z.$1(b))}},
l2:{"^":"a:19;a,b,c",
$0:function(){var z=0,y=P.aA(),x=this,w
var $async$$0=P.ax(function(a,b){if(a===1)return P.aF(b,y)
while(true)switch(z){case 0:w=x.a
z=2
return P.aw(w.cz(x.c,x.b,w.fy),$async$$0)
case 2:return P.aG(null,y)}})
return P.aH($async$$0,y)}},
kT:{"^":"a:0;",
$1:function(a){return a.gkI()}},
kU:{"^":"a:2;a,b",
$0:function(){return H.b(this.b.gh())+" selected "+this.a.gh()}},
kV:{"^":"a:2;a,b",
$0:function(){var z,y
z=this.a.fr.d
y=new H.aq(z,new O.kS(),[H.l(z,0),null]).cl(0," <- ")
return"- how "+H.b(this.b.gh())+" got here: "+y}},
kS:{"^":"a:0;",
$1:function(a){return a.gaS()}},
kQ:{"^":"a:0;a",
$1:function(a){return a.geM()===this.a.geM()}},
kR:{"^":"a:0;",
$1:function(a){var z=a.gb7()
if(typeof z!=="number")return z.as()
a.sb7(z-1)
return a}}}],["","",,Q,{"^":"",
ii:function(a,b,c){return P.aV(function(){var z=a,y=b,x=c
var w=0,v=1,u,t,s,r,q,p
return function $async$ii(d,e){if(d===1){u=e
w=v}while(true)switch(w){case 0:t=y.f
t=t.length!==0?C.a.gw(t):null
s=J.j2(t.b5(y.a,y),new Q.uo(z))
t=J.ai(s.a),r=new H.bT(t,s.b,[H.l(s,0)])
case 2:if(!r.u()){w=3
break}q=t.gS()
p=x.$1(q)
if(p.gJ()&&!z.eJ(q,y)){w=2
break}w=4
return p
case 4:w=2
break
case 3:return P.aT()
case 1:return P.aU(u)}}})},
ij:function(a,b,c){return P.aV(function(){var z=a,y=b,x=c
var w=0,v=1,u,t
return function $async$ij(d,e){if(d===1){u=e
w=v}while(true)switch(w){case 0:t=y.f
t=y.dV((t.length!==0?C.a.gw(t):null).gbE()).gjR().a,t=new J.bk(t,t.length,0,null,[H.l(t,0)])
case 2:if(!t.u()){w=3
break}w=4
return x.$1(t.d)
case 4:w=2
break
case 3:return P.aT()
case 1:return P.aU(u)}}})},
ik:function(a,b,c){return P.aV(function(){var z=a,y=b,x=c
var w=0,v=1,u,t
return function $async$ik(d,e){if(d===1){u=e
w=v}while(true)switch(w){case 0:t=y.f
t=(t.length!==0?C.a.gw(t):null).gbl(),t=t.ga_(t)
case 2:if(!t.u()){w=3
break}w=4
return x.$1(t.d)
case 4:w=2
break
case 3:return P.aT()
case 1:return P.aU(u)}}})},
uo:{"^":"a:0;a",
$1:function(a){return!J.e(a,this.a)&&a.gaG()}},
ag:{"^":"d;",
dw:function(a,b,c){var z=this
return P.aV(function(){var y=a,x=b,w=c
var v=0,u=1,t,s,r,q,p
return function $async$dw(d,e){if(d===1){t=e
v=u}while(true)switch(v){case 0:s=z.H(y,x.gbH())
r=J.am(s)
v=r.bi(s,0)?2:3
break
case 2:q=A.eb(w)
v=4
return B.fF(q,x,z,z.iq(q,y,w,z.gM(),!0),s,!1,!1,!0)
case 4:case 3:v=r.aZ(s,1)?5:6
break
case 5:q=A.eb(w)
p=z.ip(q,y,w,z.gL(),!0)
if(typeof s!=="number")H.x(s)
v=7
return B.fF(q,x,z,p,1-s,!0,!1,!1)
case 7:case 6:return P.aT()
case 1:return P.aU(t)}}})},
fg:function(a,b,c,d,e,f){var z,y,x,w,v,u,t
a.x=this
z=a.a.bB(0,new Q.j3(b))
y=new O.eT(null,null,null,null,null,null,null,null,null,null,null,null,null)
x=this.gh()
y.ga5().c=x
x=b.gi()
y.ga5().r=x
y.ga5().f=C.T
y.ga5().cx=f
y.ga5().Q=e
x=this.gJ()
y.ga5().z=x
x=this.ga0()
y.ga5().ch=x
if(!!this.$isz){x=y.ga5()
w=x.x
if(w==null){w=new L.aD(null,null,[P.t])
w.b0()
w.m(C.d)
x.x=w
x=w}else x=w
w=this.b.gi()
if(w==null)H.i(P.G("null element"))
x.ger().q(0,w)}if(!!this.$isc9){x=this.b.gfZ()
y.ga5().d=x}v=new Y.a2(H.p([],[Y.ah]),0,P.aP())
x=a.f
u=(x.length!==0?C.a.gw(x):null).gi()
a.gB(a);(x.length!==0?C.a.gw(x):null).kD(a,v)
this.a=d.$3(z,a,v)
if(a.dm(u)!=null)a.h_(u);++a.r
w=a.f3(u)
if(!(w==null))w.hi(a,v)
a.x=null
while(!0){w=x.length!==0?C.a.gw(x):null
if((w==null?w:w.dT(a))!=null){w=x.length!==0?C.a.gw(x):null
w=!J.e(w==null?w:w.de(a),!0)}else w=!0
if(!w)break
if((x.length!==0?C.a.gw(x):null)==null)break
t=C.a.gw(x)
t.dG(a)
C.a.a3(x,t)}x=x.length!==0?C.a.gw(x):null
if(!(x==null))x.hj(a,v)
if(this.a==null)H.i(new P.w("No description given when executing "+this.k(0)+". You should return it from your world-modifying function."))
x=this.a
y.ga5().e=x
x=a.r
y.ga5().y=x
a.d.fP(y.p())
return v},
iq:function(a,b,c,d,e){return this.fg(a,b,c,d,!1,e)},
ip:function(a,b,c,d,e){return this.fg(a,b,c,d,e,!1)}},
j3:{"^":"a:0;a",
$1:function(a){return J.e(a.gi(),this.a.gi())}},
z:{"^":"ag;bZ:b<",
gW:function(){var z=new Y.a2(H.p([],[Y.ah]),0,P.aP())
z.fN(0,this.ga6(),this.b)
return z.cs()},
a9:function(a,b){var z=new Y.a2(H.p([],[Y.ah]),0,P.aP())
z.jm(0,this.gaf(),this.b,a,!0)
return z.cs()},
k:function(a){var z=this.b
return"EnemyTargetAction<"+this.ga6()+"::enemy="+H.b(z.gi())+"/"+H.b(z.gh())+">"}},
c9:{"^":"ag;",
gW:function(){return this.b.gW()},
k:function(a){return"ExitAction<"+this.b.gW()+">"}},
cd:{"^":"ag;",
gW:function(){var z=new Y.a2(H.p([],[Y.ah]),0,P.aP())
z.fN(0,this.ga6(),this.b)
return z.cs()},
k:function(a){return"ItemAction<"+this.gW()+">"}},
nE:{"^":"d;a,b",
k:function(a){return this.b},
v:{"^":"xc<"}}}],["","",,O,{"^":"",cE:{"^":"d;",
k:function(a){return"ActionRecord<"+H.b(this.b)+", "+H.b(this.d)+">"}},mi:{"^":"d;a,b",
k:function(a){return this.b}},pT:{"^":"cE;a,du:b<,eE:c<,aS:d<,e,cr:f<,fd:r<,V:x<,hE:y<,z,hF:Q<,hG:ch<",
a1:function(a){var z=new O.eT(null,null,null,null,null,null,null,null,null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
A:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof O.cE))return!1
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
k:function(a){return"ActionRecord {accomplices="+J.h(this.a)+",\nactionName="+J.h(this.b)+",\ndataString="+J.h(this.c)+",\ndescription="+H.b(J.h(this.d))+",\nknownTo="+J.h(this.e)+",\nprotagonist="+H.b(J.h(this.f))+",\nsufferers="+J.h(this.r)+",\ntime="+J.h(this.x)+",\nwasAggressive="+J.h(this.y)+",\nwasFailure="+J.h(this.z)+",\nwasProactive="+J.h(this.Q)+",\nwasSuccess="+J.h(this.ch)+",\n}"}},eT:{"^":"d;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",
gdu:function(){return this.ga5().c},
geE:function(){return this.ga5().d},
gaS:function(){return this.ga5().e},
gcr:function(){return this.ga5().r},
gfd:function(){var z,y
z=this.ga5()
y=z.x
if(y==null){y=new L.aD(null,null,[P.t])
y.b0()
y.m(C.d)
z.x=y
z=y}else z=y
return z},
gV:function(){return this.ga5().y},
ghE:function(){return this.ga5().z},
ghF:function(){return this.ga5().ch},
ghG:function(){return this.ga5().cx},
ga5:function(){var z,y
z=this.a
if(z!=null){z=z.a
if(!(z==null)){y=new L.aD(null,null,[H.l(z,0)])
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
if(!(z==null)){y=new L.aD(null,null,[H.l(z,0)])
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
p:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=this.a
if(z==null){y=this.ga5()
x=y.b
if(x==null){x=new L.aD(null,null,[P.t])
x.b0()
x.m(C.d)
y.b=x
y=x}else y=x
y=y.p()
x=this.ga5().c
w=this.ga5().d
v=this.ga5().e
u=this.ga5().f
t=this.ga5().r
s=this.ga5()
r=s.x
if(r==null){r=new L.aD(null,null,[P.t])
r.b0()
r.m(C.d)
s.x=r
s=r}else s=r
s=s.p()
r=this.ga5().y
q=this.ga5().z
p=this.ga5().Q
o=this.ga5().ch
n=this.ga5().cx
z=new O.pT(y,x,w,v,u,t,s,r,q,p,o,n)
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
il:function(a,b){return P.aV(function(){var z=a,y=b
var x=0,w=1,v,u
return function $async$il(c,d){if(c===1){v=d
x=w}while(true)switch(x){case 0:x=2
return z
case 2:u=y.a
x=3
return P.bV(new H.K(u,new R.uv(z),[H.l(u,0)]))
case 3:return P.aT()
case 1:return P.aU(v)}}})},
b6:function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){var z=new R.eU(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
new R.tl(a,b,k,m,n,f,e,i,l,o,j,h,d,g,p,c).$1(z)
return z.p()},
uv:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gh3()
y=this.a.gi()
return z==null?y==null:z===y}},
A:{"^":"mE;",
gfS:function(){return!0},
gaF:function(){var z=this.x
if(typeof z!=="number")return z.bi()
return z>0},
gaH:function(){return this.e instanceof K.cc},
gap:function(){return this.dy===C.h},
ga2:function(){return this.dy===C.f},
ga4:function(){return this.dy===C.k},
ka:function(a,b){var z,y,x
for(z=this.cx.a,y=new P.af(z,z.r,null,null,[null]),y.c=z.e,x=0;y.u();){if(C.a.a7(y.d.gf0(),a))++x
if(x>=b)return!0}return!1},
h8:function(a){return this.ka(a,1)},
jV:function(){var z,y,x,w,v,u,t
for(z=this.cx.a,y=new P.af(z,z.r,null,null,[null]),y.c=z.e,x=null,w=-9999999;y.u();){v=y.d
if(!(v instanceof L.aS))continue
z=v.gbI()
u=v.gbz()
t=v.gaK()?1:0
if(2+z+u+t>w){z=v.gbI()
u=v.gbz()
t=v.gaK()?1:0
w=2+z+u+t
x=v}}return x},
kb:function(a){var z=this.fx
if(typeof z!=="number")return z.bS()
return z>=1},
eJ:function(a,b){return this.ha(a,b)>0},
ha:function(a,b){var z,y
if(this.eL(b)){z=a.gaW()
y=this.fy.a
z=z.gi()
z=y==null?z==null:y===z}else z=!1
if(z)return 1000
if(this.iN(a,b,10))return 1
z=a.gaW()
y=this.fy.a
z=z.gi()
return(y==null?z!=null:y!==z)?1:0},
eL:function(a){var z,y
z=a.c5("Confuse",this,!0)
if(z==null)return!1
y=a.kY("Unconfuse",this,!0)
if(y==null)return!0
return y<z},
dd:function(a){var z,y,x,w,v,u,t,s,r,q,p
z=a.U(this.y)
y=z.gag()
if(typeof y!=="number")return H.x(y)
x=2*y
if(!z.gaF())x-=10
y=z.e
if(!(y instanceof K.cc))x+=4
y=J.b5(y.gad(),2)
if(typeof y!=="number")return H.x(y)
x+=y
for(y=z.cx.a,w=[null],v=new P.af(y,y.r,null,null,w),v.c=y.e;v.u();){y=J.b5(v.d.gad(),10)
if(typeof y!=="number")return H.x(y)
x+=y}y=a.a
for(v=y.ga_(y),u=new H.bT(v,new R.jz(this),[H.l(y,0)]),t=0;u.u();){s=v.gS()
r=s.gaG()?2:0
q=s.gag()
if(typeof q!=="number")return H.x(q)
p=J.b5(s.e.gad(),2)
if(typeof p!=="number")return H.x(p)
t=t+r+2*q+p
for(r=s.cx.a,q=new P.af(r,r.r,null,null,w),q.c=r.e;q.u();){r=J.b5(q.d.gad(),10)
if(typeof r!=="number")return H.x(r)
t+=r}}return new A.cF(x,t,y.bv(0,0,new R.jA(this,a)))},
iN:function(a,b,c){var z=b.kZ(a,this,!0)
if(z==null)return!1
return z<=c},
$isaO:1},
mE:{"^":"d+dy;"},
tl:{"^":"a:0;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx",
$1:function(a){var z,y
a.gD().z=this.a
a.gD().dx=this.b
a.gD().dy=this.d
a.gD().fx=this.e
z=this.f
if(z==null)z=$.$get$di()
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
z=new L.aD(null,null,[U.ac])
z.b0()
z.m(C.d)
a.gD().cy=z
z=this.db
if(z!=null){y=new L.bs(null,null)
y.m(z)
z=y}else{z=$.$get$dl()
z.toString
y=new L.bs(null,null)
y.m(z)
z=y}a.gD().go=z
a.gD().d=this.cx
a.gD().r=this.cy
a.gD().c=this.dx
return a}},
jz:{"^":"a:0;a",
$1:function(a){var z,y
z=this.a
if(J.e(a.gaW(),z.fy)){y=a.gi()
z=z.y
z=y==null?z!=null:y!==z}else z=!1
return z}},
jA:{"^":"a:29;a,b",
$2:function(a,b){var z,y
z=b.gaG()?1:0
y=b.gag()
if(typeof y!=="number")return H.x(y)
return J.ao(a,(z+y)*this.a.ha(b,this.b))}},
dY:{"^":"d;a,b",
k:function(a){return this.b}},
pU:{"^":"A;a,fY:b<,bE:c<,an:d<,T:e<,h3:f<,f4:r<,ag:x<,i:y<,z,c0:Q<,N:ch<,az:cx<,hf:cy<,h:db<,aK:dx<,ah:dy<,a8:fr<,b7:fx<,aW:fy<",
a1:function(a){var z=new R.eU(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
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
eU:{"^":"d;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go",
gfY:function(){return this.gD().c},
gbE:function(){return this.gD().d},
sbE:function(a){this.gD().d=a
return a},
gan:function(){return this.gD().e},
san:function(a){this.gD().e=a
return a},
gT:function(){return this.gD().f},
sT:function(a){this.gD().f=a
return a},
gh3:function(){return this.gD().r},
gf4:function(){return this.gD().x},
gag:function(){return this.gD().y},
sag:function(a){this.gD().y=a
return a},
gi:function(){return this.gD().z},
gc0:function(){return this.gD().ch},
gN:function(){return this.gD().cx},
gaz:function(){var z,y
z=this.gD()
y=z.cy
if(y==null){y=new L.aD(null,null,[U.ac])
y.b0()
y.m(C.d)
z.cy=y
z=y}else z=y
return z},
ghf:function(){return this.gD().db},
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
if(!(z==null)){y=new L.aD(null,null,[H.l(z,0)])
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
p:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
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
if(l==null){l=new L.aD(null,null,[U.ac])
l.b0()
l.m(C.d)
m.cy=l
m=l}else m=l
m=m.p()
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
z=new R.pU(y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f.p())
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
return z}}}],["","",,A,{"^":"",cF:{"^":"d;ca:a<,d2:b<,bZ:c<",
as:function(a,b){return new A.ap(this.a-b.gca(),this.b-b.gd2(),J.bD(this.c,b.gbZ()))},
k:function(a){return"ActorScore<self="+C.j.bh(this.a,2)+",team="+C.j.bh(this.b,2)+",enemy="+J.c3(this.c,2)+">"}},ap:{"^":"d;ca:a<,d2:b<,bZ:c<",
gkr:function(){return this.a===-1/0&&this.b===-1/0&&J.e(this.c,-1/0)},
c9:function(a,b){if(typeof b!=="number")return H.x(b)
return new A.ap(this.a*b,this.b*b,J.c2(this.c,b))},
ai:function(a,b){return new A.ap(this.a+b.gca(),this.b+b.gd2(),J.ao(this.c,b.gbZ()))},
d7:function(a,b){if(typeof b!=="number")return H.x(b)
return new A.ap(this.a/b,this.b/b,J.b5(this.c,b))},
k:function(a){return"ActorScoreChange<self="+C.j.bh(this.a,2)+",team="+C.j.bh(this.b,2)+",enemy="+J.c3(this.c,2)+">"},
v:{
jy:function(a){var z,y,x,w,v,u,t,s,r
for(z=a.length,y=0,x=0,w=0,v=0,u=0;t=a.length,u<t;t===z||(0,H.as)(a),++u){s=a[u];++y
x+=s.a
w+=s.b
r=s.c
if(typeof r!=="number")return H.x(r)
v+=r}if(y===0)throw H.c(P.G("Cannot average empty iterable"))
return new A.ap(x/y,w/y,v/y)}}}}],["","",,U,{"^":"",
wD:function(a){switch(a){case C.y:return"fist"
case C.z:return"shield"
case C.r:return"spear"
case C.A:return"sword"}throw H.c(P.G(a))},
ac:{"^":"mF;f0:a<",
gaS:function(){return U.wD(C.a.geH(this.a))},
gi:function(){return H.aC(this)},
gc0:function(){return!0},
gaF:function(){return!1},
gN:function(){return!1},
gaK:function(){return!1},
ga8:function(){return C.n},
gaW:function(){return $.$get$aZ()},
$isaO:1},
mF:{"^":"d+dy;"},
cT:{"^":"d;a,b",
k:function(a){return this.b}}}],["","",,K,{"^":"",cc:{"^":"aS;h:b<,a"}}],["","",,E,{"^":"",br:{"^":"ac;h:b<,a",
gad:function(){return 1},
$isaO:1}}],["","",,Z,{"^":"",ak:{"^":"aS;h:b<,bI:c<,bz:d<,aK:e<,ci:f<,eB:r<,a"}}],["","",,G,{"^":"",aE:{"^":"aS;h:b<,bI:c<,bz:d<,aK:e<,ci:f<,eB:r<,a",v:{
pe:function(a,b,c,d,e,f){return new G.aE(c,e,f,d,!0,!1,P.aB(C.o,null))}}}}],["","",,L,{"^":"",aS:{"^":"ac;",
geB:function(){return!1},
gci:function(){return!1},
gko:function(){return!1},
gaU:function(){return this.gbI()>0},
geN:function(){return this.gbz()>0},
gl:function(a){return 2},
gbI:function(){return 0},
gbz:function(){return 0},
gad:function(){var z,y,x
z=this.gbI()
y=this.gbz()
x=this.gaK()?1:0
return 2+z+y+x},
$isaO:1}}],["","",,G,{"^":"",mu:{"^":"d;",
fH:function(){var z,y
z=this.f
y=z.C
if(y.length!==0){this.b.$1(y.charCodeAt(0)==0?y:y)
z.C=""}},
lk:[function(a){this.f.C+=a},"$1","gjN",2,0,20],
bx:function(){var z=0,y=P.aA(),x,w=this,v,u
var $async$bx=P.ax(function(a,b){if(a===1)return P.aF(b,y)
while(true)switch(z){case 0:if(w.x==null)throw H.c(new P.w("Cannot run a LoopedEvent before onFinishedGoto is defined."))
if(w.r){w.d.sl(0,0)
w.a.$1(w.x)
z=1
break}v=w.d
u=w.f
case 3:if(!!0){z=4
break}if(!(!w.r&&v.gl(v)===0&&u.C.length===0)){z=4
break}z=5
return P.aw(w.d4(),$async$bx)
case 5:z=3
break
case 4:w.fH()
case 1:return P.aG(x,y)}})
return P.aH($async$bx,y)}}}],["","",,B,{"^":"",f4:{"^":"d;dc:a<,dB:b<,cX:c<",
k:function(a){return"ConsequenceStats<order="+this.c+", cumProb="+J.c3(this.b,3)+", score="+this.a.k(0)+">"}},bK:{"^":"d;bH:a<,fM:b<,fb:c<,kI:d<,dB:e<,f,r,eM:x<,cX:y<",
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
fF:function(a,b,c,d,e,f,g,h){var z,y
z=b==null
y=z?e:J.c2(e,b.gdB())
z=z?0:b.gcX()+1
d.b=a.r
return new B.bK(a,c,d,e,y,g,f,h,z)}}}}],["","",,G,{"^":"",j4:{"^":"d;a,b,c,d,e,f",
jz:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=this.a
z.ak("...")
z.ak("combining scores")
y=H.p([],[A.ap])
x=new G.jr()
for(w=J.ai(a),v=b.a,u=b.b,t=b.c,s=null;w.u();){r=w.gS()
z.ak(new G.jp(r))
if(J.aa(r.gdB(),0.15))if(s==null){z.ak("    - first _bestCase")
s=r}else if(J.aa(x.$1(r.gdc()),x.$1(s.gdc()))){z.ak("    - new _bestCase")
s=r}q=r.gdc()
p=J.bD(q.c,t)
o=r.b
if(typeof o!=="number")return H.x(o)
n=new A.ap((q.a-v)*o,(q.b-u)*o,J.c2(p,o))
z.ak(new G.jq(n))
y.push(n)}m=A.jy(y)
w=s==null
if(w)l=C.H
else{q=s.gdc()
l=new A.ap(q.a-v,q.b-u,J.bD(q.c,t))}w=w?s:s.gcX()
if(w==null)w=1
if(typeof w!=="number")return H.x(w)
v=l.a/w
u=l.b/w
w=J.b5(l.c,w)
t=m.a
q=m.b
p=m.c
z.ak("- uplifts average = "+("ActorScoreChange<self="+C.j.bh(t,2)+",team="+C.j.bh(q,2)+",enemy="+J.c3(p,2)+">"))
z.ak("- best = "+("ActorScoreChange<self="+C.u.bh(v,2)+",team="+C.u.bh(u,2)+",enemy="+J.c3(w,2)+">"))
t=v+t
q=u+q
p=w+p
z.ak("- result = "+("ActorScoreChange<self="+C.u.bh(t,2)+",team="+C.u.bh(q,2)+",enemy="+C.j.bh(p,2)+">"))
return new A.ap(t,q,p)},
f2:function(){var z=this
return P.aV(function(){var y=0,x=1,w,v,u,t,s
return function $async$f2(a,b){if(a===1){w=b
y=x}while(true)switch(y){case 0:v=z.f,u=v.gcm(),u=u.ga_(u),t=1
case 2:if(!u.u()){y=3
break}s=u.gS()
y=4
return""+t+") "+s.gW()+"\t"+H.b(v.j(0,s))
case 4:++t
y=2
break
case 3:return P.aT()
case 1:return P.aU(w)}}})},
dH:function(a,b,c){var z=0,y=P.aA(),x=this,w,v,u,t,s,r,q,p,o,n,m
var $async$dH=P.ax(function(d,e){if(d===1)return P.aF(e,y)
while(true)switch(z){case 0:w=x.f
w.bg(0)
v=x.c
u=v.a
t=u.a.bB(0,new G.js(x))
s=t.dd(u)
r=x.a
r.bO("Planning for "+H.b(t.db)+", initialScore="+s.k(0))
q=new P.bd(x.ec(t,u).a(),null,null,null)
case 2:if(!q.u()){z=3
break}p=q.c
o=p==null?q.b:p.gS()
r.bm(new G.jt(t,o))
if(o.G(t,u)!==!0){r.bm(new G.ju(o))
z=2
break}z=4
return P.aw(x.cD(v,o,b,a,c).cu(0),$async$dH)
case 4:n=e
if(J.eQ(n)===!0){r.bm(new G.jv(o))
w.n(0,o,C.I)
z=2
break}r.bm(new G.jw(s,o,n))
m=x.jz(n,s,b)
w.n(0,o,m)
r.bm(new G.jx(o,m))
z=2
break
case 3:x.e=!0
return P.aG(null,y)}})
return P.aH($async$dH,y)},
kH:function(){return this.dH(50,10,null)},
ec:function(a,b){return P.aV(function(){var z=a,y=b
var x=0,w=1,v,u,t,s,r,q,p,o
return function $async$ec(c,d){if(c===1){v=d
x=w}while(true)switch(x){case 0:u=y.f
x=2
return P.bV((u.length!==0?C.a.gw(u):null).gbN())
case 2:u=(u.length!==0?C.a.gw(u):null).gaE()
t=u.length
s={func:1,ret:Q.cd,args:[U.ac]}
r={func:1,ret:Q.c9,args:[Q.v]}
q={func:1,ret:Q.z,args:[R.A]}
p=0
case 3:if(!(p<u.length)){x=5
break}o=u[p]
x=H.ay(o,q)?6:8
break
case 6:x=9
return P.bV(Q.ii(z,y,o))
case 9:x=7
break
case 8:x=H.ay(o,r)?10:12
break
case 10:x=13
return P.bV(Q.ij(z,y,o))
case 13:x=11
break
case 12:x=H.ay(o,s)?14:16
break
case 14:x=17
return P.bV(Q.ik(z,y,o))
case 17:x=15
break
case 16:throw H.c(new P.w(o.k(0)+" is not one of the supported ones"))
case 15:case 11:case 7:case 4:u.length===t||(0,H.as)(u),++p
x=3
break
case 5:return P.aT()
case 1:return P.aU(v)}}})},
cD:function(a5,a6,a7,a8,a9){var $async$cD=P.ax(function(b0,b1){switch(b0){case 2:u=x
z=u.pop()
break
case 1:v=b1
z=w}while(true)switch(z){case 0:s={}
r=a5.a
q=r.a.bB(0,new G.j8(t))
p=t.a
p.bm("=====")
p.bm(new G.j9(a6,q))
p.bm(new G.ja(a6))
if(a6.G(q,r)!==!0){p.bm("- firstAction not applicable")
z=1
break}o=q.dd(r)
p.bm(new G.jg(a5,o))
p.bm(new G.jh(a5))
n=P.bb(null,B.bK)
m=P.a5(null,null,null,A.a3)
l=J.o(r)
k=l.gB(r)
for(j=new P.bd(a6.dw(q,a5,r).a(),null,null,null);j.u();){i=j.c
h=i==null?j.b:i.gS()
if(l.gB(r)!==k)throw H.c(new P.w("Action "+a6.k(0)+" modified world state when producing "+H.b(h)+"."))
n.aC(h)}s.a=0
r=t.b
case 3:if(!!n.gX(n)){z=4
break}++s.a
g=n.dJ()
p.ak("----")
p.ak(new G.ji(g))
p.ak(new G.jj(g))
if(g.gcX()>a7||s.a>a8){p.ak(new G.jk(s,a7,g))
p.ak(new G.jl(g))
z=4
break}z=g.gbH().f.length===0?5:6
break
case 5:p.ak("- leaf node: world.situations is empty (end of book)")
l=g.a
q=l.a.aT(0,new G.jm(t),new G.jn())
if(q==null){p.ak("- this actor ("+H.b(r)+") has been removed")
z=3
break}f=new B.f4(q.dd(l),g.e,g.y)
p.ak(new G.jb(f))
z=7
x=[1]
return P.dc(P.hJ(f),$async$cD,y)
case 7:z=3
break
case 6:l=g.a
j=l.f
e=(j.length!==0?C.a.gw(j):null).dT(l)
j=l.a
i=new H.K(j,new G.jc(t),[H.l(j,0)])
d=i.gl(i)
if(d>1)throw H.c(new P.w("World has several duplicates of mainActor: "+J.h(l)))
else if(d===0){p.hb("mainActor "+H.b(r)+" dies and is removed in world - will use defaultScoreWhenDead")
q=null}else q=j.bB(0,new G.jd(t))
c=J.e(e,q)
p.ak("- actor: "+H.b(e.gh())+" (isMain=="+c+")")
j=q==null
p.ak("- mainActor: "+H.b(j?q:q.gh()))
b=j?q:q.dd(l)
if(b==null)b=C.J
f=new B.f4(b,g.e,g.y)
p.ak(new G.je(o,f))
p.ak(new G.jf(g))
z=8
x=[1]
return P.dc(P.hJ(f),$async$cD,y)
case 8:p.ak("- generating all actions for "+H.b(e.gh()))
j=n.c
i=n.b
a=n.a
for(a0=new P.bd(t.ec(e,l).a(),null,null,null);a0.u();){a1=a0.c
a2=a1==null?a0.b:a1.gS()
if(a2.G(e,l)!==!0)continue
for(a1=new P.bd(a2.dw(e,g,l).a(),null,null,null);a1.u();){a3=a1.c
a4=a3==null?a1.b:a3.gS();++t.d
if(J.c1(a4.gdB(),0.05))continue
if(m.a7(0,a4.gbH()))continue
n.aC(a4)}}p.ak("- added "+(((n.c-n.b&n.a.length-1)>>>0)-((j-i&a.length-1)>>>0))+" new PlanConsequences")
m.q(0,l)
z=3
break
case 4:case 1:return P.dc(null,0,y)
case 2:return P.dc(v,1,y)}})
var z=0,y=P.ql($async$cD),x,w=2,v,u=[],t=this,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4
return P.rH(y)},
i6:function(a,b){var z
if(a==null){z=b.d
throw H.c(P.G("Called ActorPlanner with actor == null. That may mean that a Situation returns getCurrentActor as null. Some action that you added should make sure it removes the Situation (maybe "+H.b(z.gw(z).gaS())+"?). World: "+J.h(b)+". Situation: "+H.b(b.gjD())+". Action Records: "+z.aJ(0,new G.jo()).cl(0,"<-")))}},
v:{
j5:function(a,b){var z,y,x
z=N.bn("ActorPlanner")
y=a==null?a:a.gi()
x=new Y.a2(H.p([],[Y.ah]),0,P.aP())
x.b=b.r
z=new G.j4(z,y,new B.bK(b,null,x,1,1,!0,!1,!1,0),0,!1,new H.R(0,null,null,null,null,null,0,[null,null]))
z.i6(a,b)
return z}}},jo:{"^":"a:0;",
$1:function(a){return a.gaS()}},jr:{"^":"a:33;",
$1:function(a){var z=a.c
if(typeof z!=="number")return H.x(z)
return a.b-z}},jp:{"^":"a:2;a",
$0:function(){return"  - consequence: "+H.b(this.a)}},jq:{"^":"a:2;a",
$0:function(){return"    - uplift = "+this.a.k(0)}},js:{"^":"a:0;a",
$1:function(a){return J.e(a.gi(),this.a.b)}},jt:{"^":"a:2;a,b",
$0:function(){return"Evaluating action '"+this.b.gW()+"' for "+H.b(this.a.db)}},ju:{"^":"a:2;a",
$0:function(){return"- action '"+this.a.gW()+"' isn't applicable"}},jv:{"^":"a:2;a",
$0:function(){return"- action '"+this.a.gW()+"' is possible but we couldn't get to any outcomes while planning. Scoring with negative infinity."}},jw:{"^":"a:2;a,b,c",
$0:function(){return"- action '"+this.b.gW()+"' leads to "+H.b(J.aM(this.c))+" different ConsequenceStats, initialScore="+this.a.k(0)}},jx:{"^":"a:2;a,b",
$0:function(){return"- action '"+this.a.gW()+"' was scored "+this.b.k(0)}},j8:{"^":"a:0;a",
$1:function(a){return J.e(a.gi(),this.a.b)}},j9:{"^":"a:2;a,b",
$0:function(){return"_getConsequenceStats for firstAction '"+this.a.gW()+"' of "+H.b(this.b.gh())}},ja:{"^":"a:2;a",
$0:function(){return"- firstAction == "+H.b(this.a)}},jg:{"^":"a:2;a,b",
$0:function(){var z=this.a
return"- current: initialScore="+this.b.k(0)+", cumProb="+H.b(z.e)+" (prob="+H.b(z.d)+", ord="+z.y+")"}},jh:{"^":"a:2;a",
$0:function(){var z=this.a
return"- initial action: "+C.b.c9(" ",z.y)+"- "+J.h(z.b)}},ji:{"^":"a:2;a",
$0:function(){return"evaluating a PlanConsequence of '"+this.a.gfM().gW()+"'"}},jj:{"^":"a:2;a",
$0:function(){var z=this.a.gbH().f
return"- situation: "+H.b(J.iW(z.length!==0?C.a.gw(z):null))}},jk:{"^":"a:2;a,b,c",
$0:function(){return"- order ("+this.c.gcX()+") higher than maximum ("+this.b+"), or consequences ("+this.a.a+") higher than maximum"}},jl:{"^":"a:2;a",
$0:function(){var z=this.a.gbH().d
return"- how we got here: "+new H.aq(z,new G.j7(),[H.l(z,0),null]).cl(0," <- ")}},j7:{"^":"a:0;",
$1:function(a){return a.gaS()}},jm:{"^":"a:0;a",
$1:function(a){return J.e(a.gi(),this.a.b)}},jn:{"^":"a:2;",
$0:function(){return}},jb:{"^":"a:2;a",
$0:function(){return"- "+this.a.k(0)}},jc:{"^":"a:0;a",
$1:function(a){return J.e(a.gi(),this.a.b)}},jd:{"^":"a:0;a",
$1:function(a){return J.e(a.gi(),this.a.b)}},je:{"^":"a:2;a,b",
$0:function(){return"- mainActor's score == "+this.b.k(0)+" (initial="+this.a.k(0)+")"}},jf:{"^":"a:2;a",
$0:function(){var z=this.a.gbH().d
return"- how we got here: "+new H.aq(z,new G.j6(),[H.l(z,0),null]).cl(0," <- ")}},j6:{"^":"a:0;",
$1:function(a){return a.gaS()}}}],["","",,Z,{"^":"",n1:{"^":"d;a,b",
gbN:function(){return this.b},
gX:function(a){return this.b.length===0},
hm:function(a,b){var z=this
return P.aV(function(){var y=a,x=b
var w=0,v=2,u,t,s,r,q,p,o,n,m,l
return function $async$hm(c,d){if(c===1){u=d
w=v}while(true)switch(w){case 0:t=z.b
w=t.length<=y?3:4
break
case 3:w=5
return P.bV(t)
case 5:w=1
break
case 4:s=z.iH(new Z.n4())
r=z.eb(new Z.n5(),[s])
q=z.eb(new Z.n6(),[s,r])
w=s!=null?6:8
break
case 6:$.$get$bL().bO("best self preserving: "+H.b(s))
w=9
return s
case 9:p=1
w=7
break
case 8:p=0
case 7:w=r!=null&&p<y?10:11
break
case 10:$.$get$bL().bO("best enemy damaging: "+H.b(r))
w=12
return r
case 12:++p
case 11:w=q!=null&&p<y?13:14
break
case 13:$.$get$bL().bO("best team preserving: "+H.b(q))
w=15
return q
case 15:++p
case 14:if(p===y){w=1
break}C.a.cc(t,new Z.n7(z,x))
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
case 18:case 1:return P.aT()
case 2:return P.aU(u)}}})},
kG:function(a){var z,y,x,w,v,u,t,s,r,q,p
z={}
y=this.b
if(y.length===1)return C.a.gcb(y)
C.a.cc(y,new Z.n8(this,a))
x=this.a.a
w=x.gcv().bv(0,1/0,new Z.n9(a))
v=x.gcv().bv(0,-1/0,new Z.na(a))
x=J.am(v)
u=J.am(w)
t=u.as(w,J.c2(x.as(v,w),0.1))
z.a=t
if(u.A(w,v)){t=J.bD(t,1)
z.a=t
u=t}else u=t
s=x.as(v,u)
r=P.ms(y.length,new Z.nb(z,this,a,s),!1,P.M)
q=new H.aq(r,new Z.nc(C.a.bv(r,0,Z.uT())),[H.l(r,0),null]).bF(0,!1)
z=C.a.bv(q,0,Z.uU())
if(typeof z!=="number")return H.x(z)
u=q.length
x=u-1
if(x<0)return H.f(q,x)
z=J.ao(q[x],1000-z)
if(x>=q.length)return H.f(q,x)
q[x]=z
p=S.nv(q,1000)
if(p>=y.length)return H.f(y,p)
return y[p]},
eb:function(a,b){var z,y,x,w,v,u,t
for(z=this.b,y=z.length,x=this.a.a,w=null,v=null,u=0;u<z.length;z.length===y||(0,H.as)(z),++u){t=z[u]
if(C.a.a7(b,t))continue
if(w==null||J.aa(a.$1(x.j(0,t)),v)){v=a.$1(x.j(0,t))
w=t
continue}}return w},
iH:function(a){return this.eb(a,C.d)},
v:{
n2:function(a){var z,y,x
z=a.gcm()
y=H.y(z,"B",0)
x=P.P(new H.K(z,new Z.n3(a),[y]),!1,y)
if(x.length===0)$.$get$bL().f1("After removing actions scored by undefined, there are no recommendations.")
return x},
x9:[function(a,b){return J.ao(a,b)},"$2","uT",4,0,44],
xa:[function(a,b){return J.ao(a,b)},"$2","uU",4,0,45]}},n4:{"^":"a:0;",
$1:function(a){return a.gca()}},n5:{"^":"a:0;",
$1:function(a){return J.iS(a.gbZ())}},n6:{"^":"a:0;",
$1:function(a){return a.gd2()}},n7:{"^":"a:6;a,b",
$2:function(a,b){var z,y
z=this.b
y=this.a.a.a
return-J.bE(z.$1(y.j(0,a)),z.$1(y.j(0,b)))}},n8:{"^":"a:6;a,b",
$2:function(a,b){var z,y
z=this.b
y=this.a.a.a
return-J.bE(z.$1(y.j(0,a)),z.$1(y.j(0,b)))}},n9:{"^":"a:6;a",
$2:function(a,b){var z=this.a.$1(b)
return Math.min(H.df(a),H.df(z))}},na:{"^":"a:6;a",
$2:function(a,b){var z=this.a.$1(b)
return Math.max(H.df(a),H.df(z))}},nb:{"^":"a:9;a,b,c,d",
$1:function(a){var z,y
z=this.b
y=z.b
if(a>=y.length)return H.f(y,a)
return J.b5(J.bD(this.c.$1(z.a.a.j(0,y[a])),this.a.a),this.d)}},nc:{"^":"a:0;a",
$1:function(a){return J.iZ(J.c2(J.b5(a,this.a),1000))}},n3:{"^":"a:0;a",
$1:function(a){return!this.a.j(0,a).gkr()}}}],["","",,K,{"^":"",rR:{"^":"a:3;",
$3:function(a,b,c){}},co:{"^":"d;a,h:b<,c,d,jT:e<,f,c8:r<",
gjR:function(){return this.a},
gB:function(a){return C.b.gB(this.b)},
A:function(a,b){if(b==null)return!1
return b instanceof K.co&&b.b===this.b},
k:function(a){return"Room<"+this.b+">"},
jI:function(a,b,c){return this.c.$3(a,b,c)},
hZ:function(a,b,c){return this.d.$3(a,b,c)},
jU:function(a,b,c){return this.e.$3(a,b,c)},
v:{
a0:function(a,b,c,d,e,f,g){var z=new S.O(null,null,[Q.v])
z.aj()
z.m(f)
return new K.co(z.p(),a,b,c,d,e,g)}}}}],["","",,Q,{"^":"",v:{"^":"d;fZ:a<,W:b<,aS:c<,kl:d<"}}],["","",,S,{"^":"",ae:{"^":"d;",
gaE:function(){return C.d},
gbN:function(){return C.d},
gdE:function(){return 3},
dT:function(a){return this.aY(this.gV(),a)},
hi:function(a,b){},
hj:function(a,b){},
kD:function(a,b){},
dG:function(a){},
de:function(a){return!0}}}],["","",,S,{"^":"",
fO:function(a){var z=$.$get$bN().aq(3)
if(z<0||z>=3)return H.f(a,z)
return a[z]},
nu:function(a,b){var z,y,x,w,v
z=$.$get$bN().kC()*b
for(y=new H.dM(a,a.gl(a),0,null,[H.y(a,"b1",0)]),x=0,w=0;y.u();){v=y.d
if(typeof v!=="number")return H.x(v)
x+=v
if(x>=z)return w;++w}throw H.c(P.G("The weights do not add up to total="+b))},
nv:function(a,b){var z,y,x,w,v,u,t
z=$.$get$bN().aq(b)
for(y=a.length,x=0,w=0,v=0;u=a.length,v<u;u===y||(0,H.as)(a),++v){t=a[v]
if(typeof t!=="number")return H.x(t)
x+=t
if(x>=z)return w;++w}throw H.c(P.G("The weights do not add up to total="+b))},
bO:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=J.L(a)
y=z.b1(a,"{")
if(y!==-1){x=z.gl(a)
if(typeof x!=="number")return x.as()
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
if(typeof v!=="number")return v.ai()
n=a.length
m+=C.b.aL(a,v+1,n)
z=m.charCodeAt(0)==0?m:m
if(t===n-1)return z
else return S.bO(z)}else{x=z.gl(a)
if(typeof x!=="number")return x.as()
if(t===x-1)return a
else{if(typeof t!=="number")return t.ai()
x=t+1
return z.aL(a,0,x)+H.b(S.bO(C.b.bJ(a,x)))}}}else return a},
a6:function(a,b,c,d){var z=c!=null?3:2
switch($.$get$bN().aq(z)){case 0:a.$0()
break
case 1:b.$0()
break
case 2:c.$0()
break
case 4:d.$0()
break}}}],["","",,Y,{"^":"",ah:{"^":"d;b8:a<,b_:b<,aV:c<,hl:d<,e,dz:f@,ho:r<,hg:x<,fc:y<,jQ:z<,i1:Q<,d6:ch<,jg:cx<,kq:cy<,V:db<",
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
return z+(this.cy?"(sup)":"")+">"}},a2:{"^":"d;a,V:b<,c",
geI:function(){return C.a.bs(this.a,new Y.oN())},
aR:function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){var z,y
if(b==null||J.e(b,""))return
z=(J.bh(b).eF(b,".")||C.b.eF(b,"!")||C.b.eF(b,"?"))&&C.b.dg(b,P.bq("[A-Z]",!0,!1))?!0:p
y=this.b
this.a.push(new Y.ah(b,m,h,j,i,d,k,g,!1,e,l,z,c,f,y))},
q:function(a,b){return this.aR(a,b,null,!1,!1,!1,!1,null,null,null,!1,!1,null,!1,null,!1)},
t:function(a,b,c){return this.aR(a,b,null,!1,!1,!1,!1,null,null,null,!1,!1,null,!1,null,c)},
ji:function(a,b,c,d,e,f,g,h,i,j,k,l,m,n){return this.aR(a,b,c,d,e,f,g,h,i,j,k,!1,l,m,null,n)},
fN:function(a,b,c){return this.aR(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,null,!1,null,!1)},
jo:function(a,b,c,d,e,f){return this.aR(a,b,null,!1,!1,!1,!1,c,null,d,!1,!1,e,!1,null,f)},
ex:function(a,b,c,d,e){return this.aR(a,b,null,!1,!1,!1,c,null,null,null,!1,d,e,!1,null,!1)},
cg:function(a,b,c,d){return this.aR(a,b,null,!1,!1,!1,!1,null,null,c,!1,!1,d,!1,null,!1)},
ew:function(a,b,c,d){return this.aR(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,d,!1,null,!1)},
cg:function(a,b,c,d){return this.aR(a,b,null,!1,!1,!1,!1,null,null,c,!1,!1,d,!1,null,!1)},
fO:function(a,b,c,d,e,f){return this.aR(a,b,c,!1,!1,!1,!1,d,null,null,e,!1,f,!1,null,!1)},
jn:function(a,b,c,d,e,f){return this.aR(a,b,c,!1,!1,d,!1,e,null,null,!1,!1,f,!1,null,!1)},
jk:function(a,b,c){return this.aR(a,b,c,!1,!1,!1,!1,null,null,null,!1,!1,null,!1,null,!1)},
jl:function(a,b,c,d){return this.aR(a,b,c,!1,!1,!1,!1,d,null,null,!1,!1,null,!1,null,!1)},
jm:function(a,b,c,d,e){return this.aR(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,d,!1,null,e)},
js:function(a,b,c,d,e,f,g,h){var z,y,x,w,v,u,t
if(b.length===0)return
z=H.b(new Y.oL().$1(a))+" "
for(y=b.length,x=e-1,w=0,v=0,u=0;u<b.length;b.length===y||(0,H.as)(b),++u){t=b[u]
if(w>0){if(w===1&&J.e(t,C.a.gw(b)))z=z+" "+d
else z=w===x?z+(", "+d):z+","
z+=" "}z+=H.b(this.bW(t.gh(),t.gh(),t,null,this.b));++w
if(w>x||J.e(t,C.a.gw(b))){z+="."
this.jo(0,z.charCodeAt(0)==0?z:z,f,g,h,!0);++v
z=H.n(a,"<also>","also")+" "
w=0}}},
jr:function(a,b,c,d){return this.js(a,b,c,"and",3,null,null,d)},
fQ:function(){return this.t(0,"\n\n",!0)},
bW:function(a,b,c,d,e){var z,y,x,w
if(d!=null){z=J.L(a)
z=z.b1(a,"<owner's> "+H.b(b))!==-1||z.b1(a,"<ownerPronoun's> "+H.b(b))!==-1||z.b1(a,"<object-owner's> "+H.b(b))!==-1||z.b1(a,"<object-ownerPronoun's> "+H.b(b))!==-1}else z=!1
if(z)return a
z=J.L(a)
if(z.b1(a,"<subject's> "+H.b(b))!==-1||z.b1(a,"<subjectPronoun's> "+H.b(b))!==-1)return a
if(c.gaK()!==!0){y=this.c
x=y.j(0,c.gi())
if((x==null?-1:x)<e)w=z.d_(a,b,"the "+H.b(b))
else{w=J.eS(c.gh(),P.bq("[aeiouy]",!1,!1))?z.d_(a,b,"an "+H.b(b)):z.d_(a,b,"a "+H.b(b))
y.n(0,c.gi(),e)}}else w=null
return w==null?a:w},
eG:function(a,b){var z,y
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
dS:function(a){var z=this
return P.aV(function(){var y=a
var x=0,w=2,v,u,t
return function $async$dS(b,c){if(b===1){v=c
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
case 8:case 7:x=t.ghl()!=null?9:10
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
cW:[function(a){var z=J.am(a)
if(z.aZ(a,0)||z.bS(a,this.a.length))return
else{z=this.a
if(a>>>0!==a||a>=z.length)return H.f(z,a)
return z[a].gaV()}},"$1","gaV",2,0,21],
kE:function(a,b){var z
if(!this.aX(a)||!this.aX(b))return!1
if(this.eG(a,b)){z=this.a
if(a>=z.length)return H.f(z,a)
z[a].gfc()}return!1},
hk:function(a){var z
for(z=!1;this.geI();z=!0){a.$1(this.hp(!0))
this.kM()}return z},
hp:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c
z=this.a
y=C.a.bv(z,[],new Y.oO())
C.a.j1(z,new Y.oP(y),!1)
x=a&&this.geI()?C.a.b1(z,C.a.ck(z,new Y.oQ()))+1:z.length
if(x<1)return""
for(w=-1,v=!0,u=!1,t=!1,s=0,r="";s<x;++s){q=s===0
if(!q){p=s-1
o=this.eG(p,s)
if(s>=z.length)return H.f(z,s)
if(!z[s].gdz())n=this.kE(s,p)&&this.i0(s,p)
else n=!0
if(n){if(p<0||p>=z.length)return H.f(z,p)
t=!z[p].gdz()}else t=!1
if(s>=z.length)return H.f(z,s)
z[s].sdz(t)
n=s-w
if(n<3)if(!u){if(s>=z.length)return H.f(z,s)
if(!z[s].gi1()){if(p<0||p>=z.length)return H.f(z,p)
if(!z[p].gjQ()){if(s>=z.length)return H.f(z,s)
if(!z[s].gd6())if(this.ds(s,p)||o)if(!(t&&n>1)){if(t){if(p>=z.length)return H.f(z,p)
n=z[p].gdz()}else n=!1
n=n||this.l_(s)>4}else n=!0
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
u=!1}else if(t){r+=S.fO([" but "," but ",", but "])
u=!this.hN(s,s+1)&&!0}else{r+=S.fO([" and "," and ",", and "])
u=!0}}m=this.e0(s)
l=S.bO(m)
p=J.L(l)
if(p.a7(l,"{")===!0||p.a7(l,"}")===!0)$.$get$iu().dX('Storyline result includes { and/or } even after being parsed by Randomly. Is there a dangling bracket here? Input = """'+H.b(m)+'""" Output = """'+H.b(l)+'"""')
n=!v
if(n){k=s-1
k=this.ds(s,k)&&J.eS(this.e0(k),"<subject> ")&&p.dg(l,"<subject> ")}else k=!1
if(k)l=p.d_(l,"<subject> ","")
j=J.dr(l,"<action>",this.e0(s))
p=s-1
k=this.j4(s,p)
if(k)k=!(this.cW(s).ga8()===C.n&&this.br(s).ga8()===C.n)
else k=!1
if(k){j=H.n(j,"<object-owner's> <object>","<objectPronounAccusative>")
j=H.n(j,"<object-ownerPronoun's> <object>","<objectPronounAccusative>")
j=H.n(j,"<object>","<objectPronounAccusative>")
j=H.n(j,"<object's>","<objectPronoun's>")}k=this.ds(s,p)
if(k){j=H.n(j,"<owner's> <subject>","<subjectPronoun>")
j=H.n(j,"<ownerPronoun's> <subject>","<subjectPronoun>")
j=H.n(j,"<subject>","<subjectPronoun>")
j=H.n(j,"<subject's>","<subjectPronoun's>")}if(this.cW(p)!=null)if(this.br(s)!=null)if(this.br(p)!=null){k=this.cW(p)
k=k==null?k:k.gi()
i=this.br(s)
if(J.e(k,i==null?i:i.gi())){k=this.br(p)
k=k==null?k:k.ga8()
i=this.br(s)
k=!J.e(k,i==null?i:i.ga8())}else k=!1}else k=!1
else k=!1
else k=!1
if(k){j=H.n(j,"<owner's> <subject>","<subjectPronoun>")
j=H.n(j,"<ownerPronoun's> <subject>","<subjectPronoun>")
j=H.n(j,"<subject>","<subjectPronoun>")
j=H.n(j,"<subject's>","<subjectPronoun's>")}if(this.br(p)!=null)if(this.cW(s)!=null){k=this.br(p)
k=k==null?k:k.gi()
i=this.cW(s)
if(J.e(k,i==null?i:i.gi())){p=this.br(p)
p=p==null?p:p.ga8()
k=this.br(s)
p=!J.e(p,k==null?k:k.ga8())}else p=!1}else p=!1
else p=!1
if(p){j=H.n(j,"<object-owner's> <object>","<objectPronoun>")
j=H.n(j,"<object-ownerPronoun's> <object>","<objectPronoun>")
j=H.n(j,"<object>","<objectPronounAccusative>")
j=H.n(j,"<object's>","<objectPronoun's>")}if(s>=z.length)return H.f(z,s)
p=z[s]
h=p.gb_()
g=p.gaV()
f=p.ghl()
e=p.e
k=h!=null
if(k){if(h.gN()===!0){d=H.n(j,"<subject>","<subjectPronoun>")
d=H.n(d,"<subject's>","<subjectPronoun's>")}else d=j
if(h.ga8()===C.F||h.ga8()===C.a5){d=H.n(d,"<s>","")
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
i=h.ga8().a
d=H.n(d,"<subject>",i)
i=p.db
d=J.cD(this.bW(d,"<subjectNoun>",h,f,i),"<subjectNoun>",h.gh())
c=h.ga8().a
d=H.n(d,"<subjectPronoun>",c)
if(C.b.a7(j,P.bq("<subject>.+<subject's>",!0,!1))){c=h.ga8().c
d=H.n(d,"<subject's>",c)}d=J.cD(this.bW(d,"<subject's>",h,f,i),"<subject's>",H.b(h.gh())+"'s")
i=h.ga8().c
d=H.n(d,"<subject's>",i)
i=h.ga8().b
d=H.n(d,"<subjectPronounAccusative>",i)
i=h.ga8().d
d=H.n(d,"<subjectPronounSelf>",i)}else d=j
if(g!=null){if(g.gaK()===!0){d=H.n(d,"<subject's> <object>","<object>")
d=H.n(d,"<subjectPronoun's> <object>","<object>")}if(g.gN()===!0){d=H.n(d,"<object>","<objectPronoun>")
d=H.n(d,"<object's>","<objectPronoun's>")}else d=J.dr(this.bW(d,"<object>",g,e,p.db),"<object>",g.gh())
i=g.ga8().b
d=H.n(d,"<objectPronoun>",i)
if(C.b.a7(j,P.bq("<object>.+<object's>",!0,!1))){i=g.ga8().c
d=H.n(d,"<object's>",i)}d=J.cD(this.bW(d,"<object's>",g,e,p.db),"<object's>",H.b(g.gh())+"'s")
i=g.ga8().c
d=H.n(d,"<object's>",i)
i=g.ga8().c
d=H.n(d,"<objectPronoun's>",i)
i=g.ga8().b
d=H.n(d,"<objectPronounAccusative>",i)
i=g.ga8().a
d=H.n(d,"<objectPronounNominative>",i)}if(k){k=h.ga8().c
d=H.n(d,"<subjectPronoun's>",k)}p=p.db
j=this.fI(e,this.fI(f,d,j,"<owner>","<owner's>","<ownerPronoun>","<ownerPronoun's>",p),j,"<object-owner>","<object-owner's>","<object-ownerPronoun>","<object-ownerPronoun's>",p)
r+=(!n||q)&&!t?Y.oM(j):j
if(v)w=s
if(s>=z.length)return H.f(z,s)
if(z[s].gd6())u=!0}q=x-1
if(q>=z.length)return H.f(z,q)
z=!z[q].gd6()?r+".":r
return H.wu(z.charCodeAt(0)==0?z:z,$.$get$h9(),new Y.oR(),null)},
cs:function(){return this.hp(!1)},
kM:function(){var z,y
if(!this.geI()){C.a.sl(this.a,0)
return}z=this.a
y=C.a.b1(z,C.a.ck(z,new Y.oS()))+1
P.cm(0,y,z.length,null,null,null)
z.splice(0,y-0)},
hN:function(a,b){var z,y
if(!this.aX(a)||!this.aX(b))return!1
if(this.eG(a,b)){z=this.a
if(a>=z.length)return H.f(z,a)
z[a].gfc()}if(!this.ds(a,b))return!1
z=this.a
if(a>=z.length)return H.f(z,a)
if(z[a].gho()){if(b>=z.length)return H.f(z,b)
y=z[b].gho()}else y=!1
if(y)return!0
if(a>=z.length)return H.f(z,a)
if(z[a].ghg()){if(b>=z.length)return H.f(z,b)
z=z[b].ghg()}else z=!1
if(z)return!0
else return!1},
i0:function(a,b){var z,y,x,w,v
if(!this.aX(a)||!this.aX(b))return!1
for(z=new P.bd(this.dS(a).a(),null,null,null);z.u();){y=z.c
x=y==null?z.b:y.gS()
for(y=new P.bd(this.dS(b).a(),null,null,null);y.u();){w=y.c
v=w==null?y.b:w.gS()
if(J.e(x.gi(),v.gi()))return!0}}return!1},
e0:[function(a){var z=J.am(a)
if(z.aZ(a,0)||z.bS(a,this.a.length))return
else{z=this.a
if(a>>>0!==a||a>=z.length)return H.f(z,a)
return z[a].gb8()}},"$1","gb8",2,0,13],
br:[function(a){var z=J.am(a)
if(z.aZ(a,0)||z.bS(a,this.a.length))return
else{z=this.a
if(a>>>0!==a||a>=z.length)return H.f(z,a)
return z[a].gb_()}},"$1","gb_",2,0,21],
l_:function(a){var z,y,x
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
if(typeof y!=="number")return y.as()
if(typeof x!=="number")return H.x(x)
return y-x}},
k:function(a){return this.cs()},
aX:function(a){if(a>=this.a.length||a<0)return!1
else return!0},
fI:function(a,b,c,d,e,f,g,h){var z
if(a!=null){z=a.gN()===!0?H.n(H.n(b,d,"you"),e,"your"):J.dr(this.bW(b,d,a,null,h),d,a.gh())
z=H.n(z,f,a.ga8().a)
z=H.n(H.n(J.cD(this.bW(C.b.a7(c,P.bq(d+".+"+e,!0,!1))?H.n(z,e,a.ga8().c):z,e,a,null,h),e,H.b(a.gh())+"'s"),e,a.ga8().c),g,a.ga8().c)}else z=H.n(H.n(H.n(H.n(b,d,""),e,""),f,""),g,"")
return z},
j4:function(a,b){var z,y
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
oM:function(a){var z,y,x
z=!C.b.a7(a,"\n\n")?C.b.l4(a):a
y=z.length
if(y===0)return z
if(0>=y)return H.f(z,0)
x=z[0].toUpperCase()
if(y===1)return x
else return x+C.b.bJ(z,1)}}},oN:{"^":"a:0;",
$1:function(a){return J.e(a.gb8(),"\n\n")}},oL:{"^":"a:22;",
$1:function(a){return C.b.f_(H.n(H.n(a,"<also> ",""),"  "," "))}},oO:{"^":"a:43;",
$2:function(a,b){var z,y,x
z=J.L(a)
y=z.gau(a)?z.gw(a):null
if(y!=null&&y.gkq()&&J.e(b.gjg(),y.cx)){x=z.gl(a)
if(typeof x!=="number")return x.as()
z.n(a,x-1,b)}else z.q(a,b)
return a}},oP:{"^":"a:46;a",
$1:function(a){return J.eO(this.a,a)}},oQ:{"^":"a:0;",
$1:function(a){return J.e(a.gb8(),"\n\n")}},oR:{"^":"a:47;",
$1:function(a){return H.b(a.j(0,1))+H.b(a.j(0,2))+H.b(a.j(0,3))}},oS:{"^":"a:0;",
$1:function(a){return J.e(a.gb8(),"\n\n")}},aO:{"^":"mG;aK:a<,h:b<,c,aW:d<,N:e<,a8:f<",
gi:function(){return H.aC(this)},
gc0:function(){return!0},
gaF:function(){return!0},
v:{
c8:function(a,b,c,d,e){var z=H.p([],[P.r])
return new Y.aO(c,b,z,e==null?$.$get$aZ():e,!1,d)}}},mG:{"^":"d+dy;"},dy:{"^":"d;",
gaG:function(){return this.gaF()&&this.gc0()===!0},
aa:function(a,b,c,d,e,f,g,h,i,j,k,l,m){J.iT(a,b,c,d,e,f,g,h,i,j,k,H.F(this,"$isaO"),!1,m)},
ae:function(a,b){return this.aa(a,b,null,!1,!1,!1,!1,null,null,null,!1,!1,!1)},
al:function(a,b,c){return this.aa(a,b,null,c,!1,!1,!1,null,null,null,!1,!1,!1)},
d0:function(a,b,c){return this.aa(a,b,null,!1,!1,!1,!1,null,null,null,!1,!1,c)},
ab:function(a,b,c){return this.aa(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,!1)},
eV:function(a,b,c,d){return this.aa(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,d)},
dL:function(a,b,c,d,e,f){return this.aa(a,b,null,!1,!1,!1,!1,c,d,e,f,!1,!1)},
dL:function(a,b,c,d,e,f){return this.aa(a,b,null,!1,!1,!1,!1,c,d,e,f,!1,!1)},
aB:function(a,b,c){return this.aa(a,b,null,!1,!1,!1,c,null,null,null,!1,!1,!1)},
c2:function(a,b,c,d){return this.aa(a,b,null,!1,c,!1,d,null,null,null,!1,!1,!1)},
kS:function(a,b,c,d,e){return this.aa(a,b,null,c,!1,!1,!1,d,null,null,e,!1,!1)},
eU:function(a,b,c,d){return this.aa(a,b,null,c,!1,!1,!1,null,null,null,d,!1,!1)},
eU:function(a,b,c,d){return this.aa(a,b,null,c,!1,!1,!1,null,null,null,d,!1,!1)},
bn:function(a,b,c){return this.aa(a,b,null,!1,!1,!1,!1,null,null,null,c,!1,!1)},
bQ:function(a,b,c,d){return this.aa(a,b,null,c,!1,!1,!1,d,null,null,!1,!1,!1)},
bR:function(a,b,c,d,e){return this.aa(a,b,c,!1,!1,!1,!1,d,null,null,e,!1,!1)},
eT:function(a,b,c,d){return this.aa(a,b,null,c,!1,!1,d,null,null,null,!1,!1,!1)},
bo:function(a,b,c,d){return this.aa(a,b,null,!1,!1,!1,!1,c,null,null,d,!1,!1)},
c2:function(a,b,c,d){return this.aa(a,b,null,!1,c,!1,d,null,null,null,!1,!1,!1)},
dK:function(a,b,c,d,e){return this.aa(a,b,c,!1,!1,d,!1,e,null,null,!1,!1,!1)},
ht:function(a,b,c,d){return this.aa(a,b,null,!1,!1,!1,c,d,null,null,!1,!1,!1)},
hs:function(a,b,c,d){return this.aa(a,b,c,!1,!1,d,!1,null,null,null,!1,!1,!1)},
kU:function(a,b,c,d,e,f){return this.aa(a,b,c,d,!1,e,!1,f,null,null,!1,!1,!1)},
c3:function(a,b,c,d,e){return this.aa(a,b,c,d,!1,e,!1,null,null,null,!1,!1,!1)},
hr:function(a,b,c){return this.aa(a,b,c,!1,!1,!1,!1,null,null,null,!1,!1,!1)},
kQ:function(a,b,c,d){return this.aa(a,b,c,!1,!1,!1,!1,d,null,null,!1,!1,!1)},
hu:function(a,b,c,d){return this.aa(a,b,null,!1,!1,!1,!1,c,d,null,!1,!1,!1)},
kT:function(a,b,c,d,e){return this.aa(a,b,null,!1,c,!1,!1,d,null,null,e,!1,!1)},
kV:function(a,b,c,d,e,f){return this.aa(a,b,null,!1,c,!1,!1,d,e,null,f,!1,!1)},
eT:function(a,b,c,d){return this.aa(a,b,null,c,!1,!1,d,null,null,null,!1,!1,!1)},
kR:function(a,b,c,d){return this.aa(a,b,null,!1,c,!1,!1,null,null,null,d,!1,!1)}},ck:{"^":"d;a,b,c,d",
k:function(a){return this.a}}}],["","",,L,{"^":"",tn:{"^":"a:0;",
$1:function(a){a.gcL().b=2
return 2}},tt:{"^":"a:0;",
$1:function(a){a.gcL().b=0
return 0}},tm:{"^":"a:0;",
$1:function(a){a.gcL().b=1
return 1}},hj:{"^":"d;",
hc:function(a){var z,y
z=this.a
y=a.gi()
return z==null?y==null:z===y}},qb:{"^":"hj;i:a<",
a1:function(a){var z=new L.bs(null,null)
z.m(this)
a.$1(z)
return z.p()},
A:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof L.hj))return!1
z=this.a
y=b.a
return z==null?y==null:z===y},
gB:function(a){return Y.U(Y.k(0,J.j(this.a)))},
k:function(a){return"Team {id="+J.h(this.a)+",\n}"},
v:{
ed:function(a){var z=new L.bs(null,null)
a.$1(z)
return z.p()}}},bs:{"^":"d;a,b",
gi:function(){return this.gcL().b},
gcL:function(){var z=this.a
if(z!=null){this.b=z.a
this.a=null}return this},
m:function(a){this.a=a},
p:function(){var z,y
z=this.a
if(z==null){y=this.gcL().b
z=new L.qb(y)
if(y==null)H.i(P.m("id"))}this.m(z)
return z}}}],["","",,O,{"^":"",pE:{"^":"d;a"}}],["","",,X,{"^":"",
i2:function(a,b){return P.aV(function(){var z=a,y=b
var x=0,w=1,v,u,t,s,r,q
return function $async$i2(c,d){if(c===1){v=d
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
case 1:return P.aU(v)}}})}}],["","",,A,{"^":"",a3:{"^":"d;ev:a<,az:b<,c,d,e,f,V:r<,x",
gjD:function(){var z=this.f
return z.length!==0?C.a.gw(z):null},
gB:function(a){var z,y,x,w,v
z=X.bC(this.a)
y=X.bC(this.d)
x=X.bC(this.f)
w=this.r
v=this.c
v=X.de(X.b3(X.b3(0,C.e.gB(w)),J.j(v)))
return X.de(X.b3(X.b3(X.b3(X.b3(0,z&0x1FFFFFFF),y&0x1FFFFFFF),x&0x1FFFFFFF),v&0x1FFFFFFF))},
A:function(a,b){var z
if(b==null)return!1
z=J.o(b)
return!!z.$isa3&&this.gB(this)===z.gB(b)},
jf:function(a){var z,y
z=this.hL(a,!0)
y=z.ga_(z)
if(y.u()){y.gS()
return!0}return!1},
ao:function(a){var z,y
z=this.hK(a)
y=z.ga_(z)
if(y.u()){y.gS()
return!0}return!1},
h_:function(a){var z,y,x
z=this.dm(a)
if(z==null)throw H.c(new P.w("Tried to elapseSituationTime of situation id="+H.b(a)+" that doesn't exist in situations ("+H.b(this.f)+")."))
y=this.f
if(z!==(z|0)||z>=y.length)return H.f(y,z)
x=y[z].ax()
if(z!==(z|0)||z>=y.length)return H.f(y,z)
y[z]=x},
ax:function(){++this.r},
d8:function(a,b,c,d,e){var z=this.d
if(a!=null)z=z.dh(0,new A.pJ(a))
if(b!=null)z=z.c7(0,new A.pK(b))
if(c!=null)z=z.c7(0,new A.pL(c))
if(e!=null)z=z.c7(0,new A.pM(e))
return d!=null?z.c7(0,new A.pN(d)):z},
hK:function(a){return this.d8(a,null,null,null,null)},
hL:function(a,b){return this.d8(a,null,null,null,b)},
hM:function(a,b,c){return this.d8(a,b,null,null,c)},
U:function(a){return this.a.bB(0,new A.pO(a))},
dV:function(a){return this.e.bB(0,new A.pP(a))},
f3:function(a){var z,y
z=this.dm(a)
if(z==null)return
y=this.f
if(z!==(z|0)||z>=y.length)return H.f(y,z)
return y[z]},
ar:function(a){var z,y
for(z=this.f,y=z.length-1;y>=0;--y){if(y>=z.length)return H.f(z,y)
if(J.e(z[y].gh(),a)){if(y>=z.length)return H.f(z,y)
return z[y]}}throw H.c(P.G("No situation with name="+a+" found."))},
k9:function(a){var z=this.a.aT(0,new A.pQ(a),new A.pR())
if(z==null)return!1
return z.gaF()},
aA:function(){var z,y
z=this.f
y=C.a.gw(z)
y.dG(this)
C.a.a3(z,y)},
b3:function(a){var z,y
z=this.f
while(!0){if(!(z.length!==0&&!J.e(C.a.gw(z).gh(),a)))break
y=C.a.gw(z)
y.dG(this)
C.a.a3(z,y)}if(z.length===0)throw H.c(P.G("Tried to pop situations until "+a+" but none was found in stack."))},
c1:function(a,b){var z,y
z=this.dm(a)
if(z==null)throw H.c(P.G("Situation with id "+H.b(a)+" does not exist in "+H.b(this.f)))
y=this.f
if(z!==(z|0)||z>=y.length)return H.f(y,z)
y[z]=b},
dN:function(a,b,c,d,e){var z,y,x,w
z=this.d8(a,b,c,d,e)
y=z.ga_(z)
if(y.u()){x=y.gS()
y=this.r
w=x.gV()
if(typeof w!=="number")return H.x(w)
return y-w}return},
kZ:function(a,b,c){return this.dN(null,a,b,c,null)},
c5:function(a,b,c){return this.dN(a,null,b,null,c)},
kY:function(a,b,c){return this.dN(a,b,null,null,c)},
dM:function(a){return this.dN(a,null,null,null,null)},
k:function(a){var z,y
z=this.a
y=z.ei()
y.aw(0,z)
return"World<"+P.cf(y,"{","}")+">"},
Y:function(a,b){var z,y,x
z=this.U(a)
y=z.a1(b)
x=this.a
x.a3(0,z)
x.q(0,y)},
dm:function(a){var z,y,x
y=this.f
x=0
while(!0){if(!(x<y.length)){z=null
break}if(J.e(y[x].gi(),a)){z=x
break}++x}return z},
ih:function(a){this.a.aw(0,a.a)
this.d.aw(0,a.d)
this.b.aw(0,a.b)
this.e.aw(0,a.e)
C.a.aw(this.f,a.f)
this.r=a.r},
v:{
eb:function(a){var z,y,x,w
z=P.a5(null,null,null,R.A)
y=P.bb(null,O.cE)
x=P.a5(null,null,null,U.ac)
w=P.a5(null,null,null,null)
w=new A.a3(z,x,a.c,y,w,[],null,null)
w.ih(a)
return w}}},pJ:{"^":"a:0;a",
$1:function(a){return a.gdu()===this.a}},pK:{"^":"a:0;a",
$1:function(a){return J.e(a.gcr(),this.a.gi())}},pL:{"^":"a:0;a",
$1:function(a){return a.gfd().a7(0,this.a.gi())}},pM:{"^":"a:0;a",
$1:function(a){return a.ghG()===this.a}},pN:{"^":"a:0;a",
$1:function(a){return a.ghE()===this.a}},pO:{"^":"a:0;a",
$1:function(a){return J.e(a.gi(),this.a)}},pP:{"^":"a:0;a",
$1:function(a){return J.e(a.gh(),this.a)}},pQ:{"^":"a:0;a",
$1:function(a){return J.e(a.gi(),this.a)}},pR:{"^":"a:2;",
$0:function(){return}}}],["","",,A,{"^":"",W:{"^":"ag;a0:b<"},fX:{"^":"W;c,d,W:e<,I:f<,h:r<,b,a",
gJ:function(){return!1},
gO:function(){return!1},
gK:function(){return H.i(new P.w("Not rerollable"))},
P:[function(a,b,c){throw H.c(new P.w("SimpleAction always succeeds"))},"$3","gL",6,0,1],
R:[function(a,b,c){return this.c.$4(a,b,c,this)},"$3","gM",6,0,1],
a9:function(a,b){throw H.c(new P.w("SimpleAction shouldn't have to provide roll reason"))},
H:function(a,b){return 1},
G:function(a,b){var z=this.d
if(z==null)return!0
return z.$3(a,b,this)}}}],["","",,N,{"^":"",k4:{"^":"z;J:c<,a0:d<,I:e<,O:f<,K:r<,b,a",
ga6:function(){return"confuse <object>"},
gh:function(){return"Confuse"},
gaf:function(){return"will <subject> confuse <object>?"},
P:[function(a,b,c){var z
a.ae(c,"<subject> touch<es> <subject's> temple")
z=this.b
a.ab(c,"<subject> tr<ies> to {channel|implant} {terror|confusion} into <object's> mind",z)
a.eT(c,"<subject> fail<s>",!0,!0)
return H.b(a.gh())+" fails to confuse "+H.b(z.gh())},"$3","gL",6,0,1],
R:[function(a,b,c){var z
a.ae(c,"<subject> touch<es> <subject's> temple")
z=this.b
a.bo(c,"<subject> {channel<s>|implant<s>} {terror|confusion} into <object's> mind",z,!0)
z.aB(c,"<subject's> eyes go wide with terror",!0)
return H.b(a.gh())+" confuses "+H.b(z.gh())},"$3","gM",6,0,1],
H:function(a,b){return 0.6},
G:function(a,b){var z
if(a.gN()===!0)if(a.ga4()){z=b.a
z=new H.K(z,new N.k5(this),[H.l(z,0)])
z=z.gl(z)>=2&&!this.b.eL(b)}else z=!1
else z=!1
return z},
v:{
wK:[function(a){return new N.k4(!0,!0,"Channeling the terror of the Dead Prince into lesser minds is something you've been practicing. It makes the target rabid and disoriented. They might attack their own.",!0,C.c,a,null)},"$1","tN",2,0,4]}},k5:{"^":"a:0;a",
$1:function(a){return a.gaF()&&a.gaW().hc(this.a.b.gaW())}}}],["","",,V,{"^":"",ks:{"^":"z;O:c<,K:d<,J:e<,a0:f<,I:r<,b,a",
ga6:function(){return"kick <object's> weapon off"},
gh:function(){return"DisarmKick"},
gaf:function(){return"will <subject> kick the weapon off?"},
P:[function(a,b,c){S.a6(new V.kt(this,a,c),new V.ku(this,a,c),null,null)
return H.b(a.gh())+" fails to kick "+H.b(this.b.gh())+"'s weapon off"},"$3","gL",6,0,1],
R:[function(a,b,c){var z,y
S.a6(new V.kv(this,a,c),new V.kw(this,a,c),null,null)
z=b.f
y=z.length!==0?C.a.gw(z):null
b.c1(y.gi(),y.a1(new V.kx(this)))
z=this.b
b.Y(z.gi(),new V.ky())
return H.b(a.gh())+" kicks "+H.b(z.gh())+"'s weapon off"},"$3","gM",6,0,1],
H:function(a,b){var z=a.ga4()?0:0.2
if(a.ch===!0)return 0.7-z
return 0.5-z},
G:function(a,b){var z
if(a.ga4()||a.dy===C.h){z=this.b
z=z.ga2()&&!z.gaH()}else z=!1
return z},
v:{
wN:[function(a){return new V.ks(!0,C.c,!0,!0,"When enemies are on the ground, you can try to kick their weapon off to disarm them.",a,null)},"$1","u3",2,0,4]}},kt:{"^":"a:2;a,b,c",
$0:function(){var z,y
z=this.b
y=this.c
z.ab(y,"<subject> kick<s> {at|towards} <object's> weapon",this.a.b)
z.al(y,"<subject> mi<sses>",!0)}},ku:{"^":"a:2;a,b,c",
$0:function(){var z,y
z=this.c
y=this.a.b
this.b.ab(z,"<subject> kick<s> <object's> weapon",y)
y.al(z,"<subject> hold<s> onto it",!0)}},kv:{"^":"a:2;a,b,c",
$0:function(){var z=this.a.b
this.b.kV(this.c,"<subject> kick<s> <object-owner's> <object> off <object-owner's> hand",!0,z.gT(),z,!0)}},kw:{"^":"a:2;a,b,c",
$0:function(){var z,y
z=this.c
y=this.a.b
this.b.bo(z,"<subject> kick<s> <object's> {right|} hand",y,!0)
z.cg(0,"<owner's> <subject> fl<ies> away",y,y.gT())}},kx:{"^":"a:12;a",
$1:function(a){a.gbl().q(0,this.a.b.gT())
return a}},ky:{"^":"a:0;",
$1:function(a){a.sT($.$get$di())
return a}}}],["","",,R,{"^":"",mc:{"^":"z;O:c<,K:d<,J:e<,a0:f<,I:r<,b,a",
gh:function(){return"KickToGround"},
ga6:function(){return"kick <object> to the ground"},
gaf:function(){return"will <subject> kick <object> prone?"},
P:[function(a,b,c){S.a6(new R.md(this,a,c),new R.me(this,a,c),null,null)
return H.b(a.gh())+" fails to sweep "+H.b(this.b.gh())+" off feet"},"$3","gL",6,0,1],
R:[function(a,b,c){var z
S.a6(new R.mf(this,a,c),new R.mg(this,a,c,U.bB(b)),null,null)
z=this.b
b.Y(z.gi(),new R.mh())
return H.b(a.gh())+" sweeps "+H.b(z.gh())+" off feet"},"$3","gM",6,0,1],
H:function(a,b){var z=a.ga4()?0:0.2
if(a.ch===!0)return 0.7-z
return 0.5-z},
G:function(a,b){return(a.ga4()||a.dy===C.h)&&!this.b.ga2()},
v:{
x3:[function(a){return new R.mc(!0,C.c,!0,!0,"Sweeping opponents off their feet doesn't deal much damage but on the ground they will be much easier targets for you and your allies.",a,null)},"$1","uK",2,0,4]}},md:{"^":"a:2;a,b,c",
$0:function(){var z,y
z=this.b
y=this.c
z.ab(y,"<subject> kick<s> {at|towards} <object's> feet",this.a.b)
z.al(y,"<subject> mi<sses>",!0)}},me:{"^":"a:2;a,b,c",
$0:function(){var z,y
z=this.c
y=this.a.b
this.b.ab(z,"<subject> kick<s> <object's> shin",y)
y.al(z,"<subject> <does>n't budge",!0)}},mf:{"^":"a:2;a,b,c",
$0:function(){this.b.kT(this.c,"<subject> kick<s> <object> off <object's> feet and to the ground",!0,this.a.b,!0)}},mg:{"^":"a:2;a,b,c,d",
$0:function(){var z,y
z=this.c
y=this.a.b
this.b.bo(z,"<subject> kick<s> <object's> {right|left} shin",y,!0)
y.ae(z,"<subject> {grunt|shriek}<s>")
y.aB(z,"<subject> fall<s> to the "+H.b(this.d),!0)}},mh:{"^":"a:0;",
$1:function(a){a.sah(C.f)
return a}}}],["","",,F,{"^":"",n0:{"^":"ag;I:b<,J:c<,a0:d<,O:e<,K:f<,a",
gW:function(){return"Stand off."},
gh:function(){return"Pass"},
P:[function(a,b,c){throw H.c(new P.Y(null))},"$3","gL",6,0,1],
R:[function(a,b,c){if(a.gN()===!0)a.ae(c,"<subject> stand<s> off")
return H.b(a.gh())+" passes the opportunity"},"$3","gM",6,0,1],
a9:function(a,b){return"WARNING this shouldn't be user-visible"},
H:function(a,b){return 1},
G:function(a,b){return!0}}}],["","",,Y,{"^":"",ne:{"^":"z;O:c<,K:d<,J:e<,a0:f<,I:r<,b,a",
ga6:function(){return"force <object> off balance"},
gh:function(){return"Pound"},
gaf:function(){return"will <subject> force <object> off balance?"},
P:[function(a,b,c){var z=this.b
a.hu(c,"<subject> {fiercely|violently} {pound<s>|strike<s>|hammer<s>|batter<s>} on <object-owner's> {<object>|weapon}",z.gT(),z)
z.bn(c,"<subject> {retain<s>|keep<s>} <subject's> {|combat} {stance|footing}",!0)
return H.b(a.gh())+" kicks "+H.b(z.db)+" off balance"},"$3","gL",6,0,1],
R:[function(a,b,c){var z=this.b
a.hu(c,"<subject> {fiercely|violently} {pound<s>|strike<s>|hammer<s>|batter<s>} on <object-owner's> {<object>|weapon}",z.gT(),z)
if(z.ga4()){z.ht(c,"<subject> lose<s> <object>",!0,$.$get$eu())
b.Y(z.y,new Y.nf())
C.a.q(b.f,U.mH(z,a))
return H.b(a.gh())+" pounds "+H.b(z.db)+" off balance"}else if(z.gap()){z.ae(c,"<subject> <is> already off balance")
c.ew(0,"<subject> make<s> <object> fall to the "+H.b(U.bB(b)),z,$.$get$iz())
b.Y(z.y,new Y.ng())
return H.b(a.gh())+" pounds "+H.b(z.db)+" to the ground"}throw H.c(new P.w("enemy pose must be either standing or off-balance"))},"$3","gM",6,0,1],
H:function(a,b){var z=a.ga4()?0:0.2
if(a.ch===!0)return 0.7-z
return 0.5-z},
G:function(a,b){var z,y
if(!a.ga2()){z=a.e
if(z.gaU()||z.gko()){z=this.b
if(!z.gT().gci()){z.gT().geB()
y=!1}else y=!0
z=y&&!z.ga2()}else z=!1}else z=!1
return z},
v:{
xb:[function(a){return new Y.ne(!0,C.c,!0,!0,"Forcing enemies off balance often means hitting them heavily several times in a row. The goal is not to deal damage but to force the opponent to lose control of their combat stance. It can also give members of your party an opportunity to strike.",a,null)},"$1","uV",2,0,4]}},nf:{"^":"a:0;",
$1:function(a){a.sah(C.h)
return a}},ng:{"^":"a:0;",
$1:function(a){a.sah(C.f)
return a}}}],["","",,B,{"^":"",nC:{"^":"ag;I:b<,J:c<,a0:d<,O:e<,K:f<,a",
gW:function(){return"Regain balance."},
gh:function(){return"RegainBalance"},
P:[function(a,b,c){throw H.c(new P.Y(null))},"$3","gL",6,0,1],
R:[function(a,b,c){if(a.gN()===!0)a.bo(c,"<subject> regain<s> <object>",$.$get$eu(),!0)
b.Y(a.gi(),new B.nD())
return H.b(a.gh())+" regains balance"},"$3","gM",6,0,1],
a9:function(a,b){return"Will "+a.ga8().a+" regain balance?"},
H:function(a,b){return 1},
G:function(a,b){return a.gap()}},nD:{"^":"a:0;",
$1:function(a){a.sah(C.k)
return C.k}}}],["","",,O,{"^":"",nS:{"^":"ag;I:b<,J:c<,a0:d<,O:e<,K:f<,a",
gW:function(){return"Scramble."},
gh:function(){return"Scramble"},
P:[function(a,b,c){throw H.c(new P.Y(null))},"$3","gL",6,0,1],
R:[function(a,b,c){a.ae(c,"<subject> tr<ies> to {scramble|crawl} out of {reach|harm's way}")
return H.b(a.gh())+" scrambles on ground"},"$3","gM",6,0,1],
a9:function(a,b){return"Will "+a.ga8().a+" crawl out of harm's way?"},
H:function(a,b){return 1},
G:function(a,b){if(!a.ga2())return!1
if(A.dn(a,b))return!0
return!1}}}],["","",,Q,{"^":"",oA:{"^":"ag;I:b<,J:c<,a0:d<,O:e<,K:f<,a",
gW:function(){return"Stand up."},
gh:function(){return"StandUp"},
P:[function(a,b,c){throw H.c(new P.Y(null))},"$3","gL",6,0,1],
R:[function(a,b,c){a.ae(c,"<subject> {rise<s>|stand<s> up|get<s> to <subject's> feet|get<s> up|pick<s> <subjectPronounSelf> up}")
S.a6(new Q.oB(a,c),new Q.oC(a,c),null,null)
b.Y(a.gi(),new Q.oD())
return H.b(a.gh())+" stands up"},"$3","gM",6,0,1],
a9:function(a,b){return"Will "+a.ga8().a+" stand up?"},
H:function(a,b){return 1},
G:function(a,b){if(!a.ga2())return!1
if(A.dn(a,b))return!1
return!0}},oB:{"^":"a:2;a,b",
$0:function(){return this.a.ae(this.b,"<subject> {stagger<s>|sway<s>} back before finding balance")}},oC:{"^":"a:2;a,b",
$0:function(){return this.a.ae(this.b,"<subject> stead<ies> <subjectPronounSelf>")}},oD:{"^":"a:0;",
$1:function(a){a.sah(C.k)
return C.k}}}],["","",,T,{"^":"",
xE:[function(a){return new A.a1(T.eE(),null,null,new T.v9(),new T.va(),new T.vb(),null,!0,"This move is hard, but when succesful, it's decisive.",!0,!0,"StartBreakNeckOnGround",!1,null,"break <object's> neck",null,a,null)},"$1","wd",2,0,4],
xF:[function(a){return new A.a1(T.eE(),new T.vc(),T.eE(),new T.vd(),new T.ve(),new T.vf(),new T.vg(),!0,"This move is hard, but when succesful, it's decisive.",!0,!0,"StartBreakNeckOnGroundPlayer",!0,C.c,"break <object's> neck","will <subject> succeed?",a,null)},"$1","we",2,0,4],
xG:[function(a,b,c,d,e){a.ab(c,"<subject> throw<s> <subjectPronounSelf> {on|upon} <object>",d)
b.Y(a.gi(),new T.vh())},"$5","eE",10,0,8],
v9:{"^":"a:3;",
$3:function(a,b,c){return a.gN()!==!0&&c.ga2()&&a.gaH()&&c.gaH()}},
va:{"^":"a:3;",
$3:function(a,b,c){return Y.f_(a,c)}},
vb:{"^":"a:3;",
$3:function(a,b,c){return S.dU(a,c,C.l)}},
vd:{"^":"a:3;",
$3:function(a,b,c){return a.gN()===!0&&c.ga2()&&a.gaH()&&c.gaH()}},
ve:{"^":"a:3;",
$3:function(a,b,c){return Y.f_(a,c)}},
vf:{"^":"a:3;",
$3:function(a,b,c){return S.dU(a,c,C.m)}},
vc:{"^":"a:3;",
$3:function(a,b,c){return 0.7}},
vg:{"^":"a:3;",
$3:function(a,b,c){return S.dU(a,c,C.p)}},
vh:{"^":"a:0;",
$1:function(a){a.sah(C.f)
return a}}}],["","",,A,{"^":"",a1:{"^":"z;c,d,e,f,r,x,y,z,I:Q<,J:ch<,a0:cx<,h:cy<,O:db<,K:dx<,a6:dy<,af:fr<,b,a",
P:[function(a,b,c){var z,y,x,w
z=this.b
y=this.e
if(this.z){x=this.r.$3(a,b,z)
w=this.y.$3(a,b,z)
y.$5(a,b,c,z,x)
y=b.f
C.a.q(y,x)
C.a.q(y,w)}else y.$5(a,b,c,z,null)
return H.b(a.gh())+" fails to start a "+this.cy+" (defensible situation) at "+H.b(z.gh())},"$3","gL",6,0,1],
R:[function(a,b,c){var z,y,x,w
z=this.b
y=this.r.$3(a,b,z)
x=this.x.$3(a,b,z)
this.c.$5(a,b,c,z,y)
w=b.f
C.a.q(w,y)
C.a.q(w,x)
return H.b(a.gh())+" starts a "+this.cy+" (defensible situation) at "+H.b(z.gh())},"$3","gM",6,0,1],
H:function(a,b){var z=this.d
if(z!=null)return z.$3(a,b,this.b)
return 1},
G:function(a,b){return this.f.$3(a,b,this.b)}}}],["","",,M,{"^":"",
xH:[function(a){return new A.a1(M.eF(),null,null,new M.vi(),new M.vj(),new M.vk(),null,!0,"Jumping and tackling an opponent is one of the most risky moves but it's a quick way to neutralize someone.",!0,!0,"StartLeap",!1,null,"leap at <object>",null,a,null)},"$1","wf",2,0,4],
xI:[function(a){return new A.a1(M.eF(),new M.vl(),M.eF(),new M.vm(),new M.vn(),new M.vo(),new M.vp(),!0,"Jumping and tackling an opponent is one of the most risky moves but it's a quick way to neutralize someone.",!0,!0,"StartLeapPlayer",!0,C.c,"leap at <object>","will <subject> tackle <objectPronoun>?",a,null)},"$1","wg",2,0,4],
xJ:[function(a,b,c,d,e){if(a.ga2()){a.hr(c,"<subject> roll<s>",e.gi())
a.hr(c,"<subject> put<s> <subject's> feet under <subjectPronounAccusative>",e.gi())}a.kQ(c,"<subject> {leap<s>|jump<s>|spring<s>|launch<es> <subjectPronounSelf>|lunge<s>} at <object>",e.gi(),d)},"$5","eF",10,0,8],
vi:{"^":"a:3;",
$3:function(a,b,c){var z,y
if(a.gN()!==!0){if(!a.gaH()){z=a.fy
y=$.$get$bA()
z=z.a
y=y.a
y=z==null?y==null:z===y
z=y}else z=!0
z=z&&!c.ga2()&&!A.dn(a,b)}else z=!1
return z}},
vj:{"^":"a:3;",
$3:function(a,b,c){return F.fq(a,c)}},
vk:{"^":"a:3;",
$3:function(a,b,c){return V.dJ(a,c,C.l)}},
vm:{"^":"a:3;",
$3:function(a,b,c){return a.gN()===!0&&a.gaH()&&!c.ga2()&&!A.dn(a,b)}},
vn:{"^":"a:3;",
$3:function(a,b,c){return F.fq(a,c)}},
vo:{"^":"a:3;",
$3:function(a,b,c){return V.dJ(a,c,C.m)}},
vl:{"^":"a:3;",
$3:function(a,b,c){return a.ga4()?0.4:0.2}},
vp:{"^":"a:3;",
$3:function(a,b,c){return V.dJ(a,c,C.p)}}}],["","",,U,{"^":"",
xK:[function(a){return new A.a1(U.eG(),null,null,new U.vq(),new U.vr(),new U.vs(),null,!0,"Punching someone hard enough can cause them to lose their footing. And it hurts.",!0,!0,"StartPunch",!1,null,"punch <object>",null,a,null)},"$1","wh",2,0,4],
xL:[function(a){return new A.a1(U.eG(),new U.vt(),U.eG(),new U.vu(),new U.vv(),new U.vw(),new U.vx(),!0,"Punching someone hard enough can cause them to lose their footing. And it hurts.",!0,!0,"StartPunchPlayer",!0,C.c,"punch <object>","will <subject> hit <objectPronoun>?",a,null)},"$1","wi",2,0,4],
xM:[function(a,b,c,d,e){c.jn(0,"<subject> {thrust<s>|swing<s>} <subject's> fist at <object>",e.gi(),!0,d,a)},"$5","eG",10,0,8],
vq:{"^":"a:3;",
$3:function(a,b,c){var z
if(a.gN()!==!0)z=(a.ga4()||a.dy===C.h)&&!c.ga2()&&a.gaH()
else z=!1
return z}},
vr:{"^":"a:3;",
$3:function(a,b,c){return Q.fN(a,c)}},
vs:{"^":"a:3;",
$3:function(a,b,c){return Z.e1(a,c,C.l)}},
vu:{"^":"a:3;",
$3:function(a,b,c){var z
if(a.gN()===!0)z=(a.ga4()||a.dy===C.h)&&!c.ga2()&&a.gaH()
else z=!1
return z}},
vv:{"^":"a:3;",
$3:function(a,b,c){return Q.fN(a,c)}},
vw:{"^":"a:3;",
$3:function(a,b,c){return Z.e1(a,c,C.m)}},
vt:{"^":"a:3;",
$3:function(a,b,c){return 0.7}},
vx:{"^":"a:3;",
$3:function(a,b,c){return Z.e1(a,c,C.p)}}}],["","",,G,{"^":"",
xN:[function(a){return new A.a1(G.eH(),null,null,new G.vA(),new G.vB(),new G.vC(),null,!0,"The basic swordfighting move is also often the most effective.",!0,!0,"StartSlash",!1,null,"swing at <object>",null,a,null)},"$1","wj",2,0,4],
xS:[function(a){return new A.a1(G.eH(),new G.vL(),G.eH(),new G.vM(),new G.vN(),new G.vO(),new G.vP(),!0,"The basic swordfighting move is also often the most effective.",!0,!0,"StartSlashPlayer",!0,C.c,"swing at <object>","will <subject> hit <objectPronoun>?",a,null)},"$1","wk",2,0,4],
xT:[function(a,b,c,d,e){return a.dK(c,"<subject> swing<s> {"+H.b(U.a9(a))+" |}at <object>",e.gi(),!0,d)},"$5","eH",10,0,8],
vA:{"^":"a:3;",
$3:function(a,b,c){return a.gN()!==!0&&a.ga4()&&!c.ga2()&&a.e.gaU()}},
vB:{"^":"a:3;",
$3:function(a,b,c){return M.bc(a,c)}},
vC:{"^":"a:3;",
$3:function(a,b,c){return L.aQ(a,c,C.l)}},
vM:{"^":"a:3;",
$3:function(a,b,c){return a.gN()===!0&&a.ga4()&&!c.ga2()&&a.e.gaU()}},
vN:{"^":"a:3;",
$3:function(a,b,c){return M.bc(a,c)}},
vO:{"^":"a:3;",
$3:function(a,b,c){return L.aQ(a,c,C.m)}},
vL:{"^":"a:3;",
$3:function(a,b,c){return 0.7-(c.gan()!=null?0.2:0)}},
vP:{"^":"a:3;",
$3:function(a,b,c){return L.aQ(a,c,C.p)}}}],["","",,R,{"^":"",
xO:[function(a,b,c,d,e){return a.ht(c,"<subject> completely miss<es> <object> with "+H.b(U.a9(a)),!0,d)},"$5","iF",10,0,10],
xP:[function(a){return new A.a1(R.iG(),new R.vD(),R.iF(),new R.vE(),new R.vF(),new R.vG(),null,!1,"It's always better to fight with your feet firmly on the ground. But sometimes, it's necessary to act quickly.",!0,!0,"StartSlashOutOfBalance",!1,null,"swing at <object> (while out of balance)",null,a,null)},"$1","wl",2,0,4],
xQ:[function(a){return new A.a1(R.iG(),new R.vH(),R.iF(),new R.vI(),new R.vJ(),new R.vK(),null,!1,"It's always better to fight with your feet firmly on the ground. But sometimes, it's necessary to act quickly.",!0,!0,"StartSlashOutOfBalancePlayer",!1,null,"swing at <object> (while out of balance)",null,a,null)},"$1","wm",2,0,4],
xR:[function(a,b,c,d,e){return a.dK(c,"<subject> swing<s> {"+H.b(U.a9(a))+" |}at <object>",e.gi(),!0,d)},"$5","iG",10,0,8],
vE:{"^":"a:3;",
$3:function(a,b,c){return a.gN()!==!0&&a.gap()&&!c.ga2()&&a.e.gaU()}},
vF:{"^":"a:3;",
$3:function(a,b,c){return M.bc(a,c)}},
vG:{"^":"a:3;",
$3:function(a,b,c){return L.aQ(a,c,C.l)}},
vD:{"^":"a:3;",
$3:function(a,b,c){return 0.7}},
vI:{"^":"a:3;",
$3:function(a,b,c){return a.gN()===!0&&a.gap()&&!c.ga2()&&a.e.gaU()}},
vJ:{"^":"a:3;",
$3:function(a,b,c){return M.bc(a,c)}},
vK:{"^":"a:3;",
$3:function(a,b,c){return L.aQ(a,c,C.m)}},
vH:{"^":"a:3;",
$3:function(a,b,c){return 0.5-(c.gan()!=null?0.2:0)}}}],["","",,D,{"^":"",
xU:[function(a){return new A.a1(D.eI(),null,null,new D.vQ(),new D.vR(),new D.vS(),null,!0,"Opponents on the ground are often the most vulnerable.",!0,!0,"StartStrikeDown",!1,null,"strike down at <object>",null,a,null)},"$1","wn",2,0,4],
xV:[function(a){return new A.a1(D.eI(),new D.vT(),D.eI(),new D.vU(),new D.vV(),new D.vW(),new D.vX(),!0,"Opponents on the ground are often the most vulnerable.",!0,!0,"StartStrikeDownPlayer",!0,C.c,"strike down at <object>","will <subject> hit?",a,null)},"$1","wo",2,0,4],
xW:[function(a,b,c,d,e){return a.ab(c,"<subject> strike<s> down {with "+H.b(U.a9(a))+" |}at <object>",d)},"$5","eI",10,0,10],
vQ:{"^":"a:3;",
$3:function(a,b,c){return a.gN()!==!0&&c.ga2()&&!a.ga2()&&a.e.gaU()}},
vR:{"^":"a:3;",
$3:function(a,b,c){return D.d5(a,c)}},
vS:{"^":"a:3;",
$3:function(a,b,c){return V.bJ(a,c,C.l)}},
vU:{"^":"a:3;",
$3:function(a,b,c){return a.gN()===!0&&c.ga2()&&!a.ga2()&&a.e.gaU()}},
vV:{"^":"a:3;",
$3:function(a,b,c){return D.d5(a,c)}},
vW:{"^":"a:3;",
$3:function(a,b,c){return V.bJ(a,c,C.m)}},
vT:{"^":"a:3;",
$3:function(a,b,c){var z,y
z=a.gap()?0.2:0
y=c.gan()!=null?0.2:0
return 0.7-z-y}},
vX:{"^":"a:3;",
$3:function(a,b,c){return V.bJ(a,c,C.p)}}}],["","",,A,{"^":"",
xX:[function(a){return new A.a1(A.eJ(),null,null,new A.vY(),new A.vZ(),new A.w_(),null,!0,"The basic move with a spear.",!0,!0,"StartThrustSpear",!1,null,"thrust at <object>",null,a,null)},"$1","wp",2,0,4],
y0:[function(a){return new A.a1(A.eJ(),new A.w8(),A.eJ(),new A.w9(),new A.wa(),new A.wb(),new A.wc(),!0,"The basic move with a spear.",!0,!0,"StartThrustSpearPlayer",!0,C.c,"thrust at <object>","will <subject> hit <objectPronoun>?",a,null)},"$1","wq",2,0,4],
y1:[function(a,b,c,d,e){return a.dK(c,"<subject> thrust<s> {"+H.b(U.a9(a))+" |}at <object>",e.gi(),!0,d)},"$5","eJ",10,0,8],
vY:{"^":"a:3;",
$3:function(a,b,c){return a.gN()!==!0&&a.ga4()&&!c.ga2()&&a.e instanceof Z.ak}},
vZ:{"^":"a:3;",
$3:function(a,b,c){return M.bc(a,c)}},
w_:{"^":"a:3;",
$3:function(a,b,c){return L.aQ(a,c,C.l)}},
w9:{"^":"a:3;",
$3:function(a,b,c){return a.gN()===!0&&a.ga4()&&!c.ga2()&&a.e instanceof Z.ak}},
wa:{"^":"a:3;",
$3:function(a,b,c){return M.bc(a,c)}},
wb:{"^":"a:3;",
$3:function(a,b,c){return L.aQ(a,c,C.m)}},
w8:{"^":"a:3;",
$3:function(a,b,c){return 0.7-(c.gan()!=null?0.2:0)}},
wc:{"^":"a:3;",
$3:function(a,b,c){return L.aQ(a,c,C.p)}}}],["","",,O,{"^":"",
xY:[function(a){return new A.a1(O.eK(),null,null,new O.w0(),new O.w1(),new O.w2(),null,!0,"Opponents on the ground are often the most vulnerable.",!0,!0,"StartThrustSpearDown",!1,null,"thrust down at <object>",null,a,null)},"$1","wr",2,0,4],
xZ:[function(a){return new A.a1(O.eK(),new O.w3(),O.eK(),new O.w4(),new O.w5(),new O.w6(),new O.w7(),!0,"Opponents on the ground are often the most vulnerable.",!0,!0,"StartThrustSpearDownPlayer",!0,C.c,"thrust down at <object>","will <subject> hit?",a,null)},"$1","ws",2,0,4],
y_:[function(a,b,c,d,e){return a.ab(c,"<subject> thrust<s> down {with "+H.b(U.a9(a))+" |}at <object>",d)},"$5","eK",10,0,10],
w0:{"^":"a:3;",
$3:function(a,b,c){return a.gN()!==!0&&c.ga2()&&!a.ga2()&&a.e instanceof Z.ak}},
w1:{"^":"a:3;",
$3:function(a,b,c){return D.d5(a,c)}},
w2:{"^":"a:3;",
$3:function(a,b,c){return V.bJ(a,c,C.l)}},
w4:{"^":"a:3;",
$3:function(a,b,c){return a.gN()===!0&&c.ga2()&&!a.ga2()&&a.e instanceof Z.ak}},
w5:{"^":"a:3;",
$3:function(a,b,c){return D.d5(a,c)}},
w6:{"^":"a:3;",
$3:function(a,b,c){return V.bJ(a,c,C.m)}},
w3:{"^":"a:3;",
$3:function(a,b,c){var z,y
z=a.gap()?0.2:0
y=c.gan()!=null?0.2:0
return 0.7-z-y}},
w7:{"^":"a:3;",
$3:function(a,b,c){return V.bJ(a,c,C.p)}}}],["","",,E,{"^":"",pf:{"^":"cd;a0:c<,b,a",
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
b.c1(y.gi(),y.a1(new E.pg(this)))
b.Y(a.gi(),new E.ph(this))
z=this.b
a.ab(c,"<subject> pick<s> <object> up",z)
return H.b(a.gh())+" picks up "+H.b(z.gh())},"$3","gM",6,0,1],
a9:function(a,b){return H.i(new P.Y(null))},
H:function(a,b){return 1},
G:function(a,b){if(!(this.b instanceof E.br))return!1
a.gfS()
if(a.d!=null)return!1
return!0},
v:{
xg:[function(a){return new E.pf(!0,a,null)},"$1","wy",2,0,28]}},pg:{"^":"a:12;a",
$1:function(a){a.gbl().a3(0,this.a.b)
return a}},ph:{"^":"a:0;a",
$1:function(a){a.san(H.F(this.a.b,"$isbr"))}}}],["","",,M,{"^":"",pi:{"^":"cd;a0:c<,b,a",
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
b.c1(y.gi(),y.a1(new M.pj(this)))
b.Y(a.gi(),new M.pk(this,a))
z=this.b
a.ab(c,"<subject> pick<s> <object> up",z)
return H.b(a.gh())+" picks up "+H.b(z.gh())},"$3","gM",6,0,1],
a9:function(a,b){return H.i(new P.Y(null))},
H:function(a,b){return 1},
G:function(a,b){var z,y,x,w,v
z=this.b
y=J.o(z)
if(!y.$isaS)return!1
if(!!y.$isak)return!1
a.gfS()
x=a.e
w=x instanceof Z.ak&&!!y.$isaE
z=z.gad()
x=x.gad()
if(typeof x!=="number")return H.x(x)
if(z<=x&&!w)return!1
v=b.c5("DisarmKick",a,!0)
if(v!=null&&v<=2)return!1
return!0},
v:{
xh:[function(a){return new M.pi(!0,a,null)},"$1","wz",2,0,28]}},pj:{"^":"a:12;a",
$1:function(a){a.gbl().a3(0,this.a.b)
return a}},pk:{"^":"a:0;a,b",
$1:function(a){if(!this.b.gaH())a.gaz().q(0,a.gT())
a.sT(H.F(this.a.b,"$isaS"))}}}],["","",,D,{"^":"",pr:{"^":"z;J:c<,a0:d<,I:e<,O:f<,K:r<,b,a",
ga6:function(){return"throw spear at <object>"},
gh:function(){return"ThrowSpear"},
gaf:function(){return"will <subject> hit <object>?"},
P:[function(a,b,c){var z,y
z=this.fs(a)
y=this.b
a.ab(c,"<subject> {throw<s>|hurl<s>|cast<s>} "+H.b(z.gaK()===!0?z.gh():"<subject's> "+H.b(z.gh()))+" at <object>",y)
if(y.gan()!=null)y.kS(c,"<subject> deflects it with <subject's> <object>",!0,y.gan(),!0)
else y.eU(c,"<subject> {dodge<s> it|move<s> out of the way}",!0,!0)
z.ae(c,"<subject> {drive<s>|plunge<s>|ram<s>|thrust<s>} into the "+H.b(U.bB(b))+" {|nearby|not far from here}")
this.fE(b,a,z)
return H.b(a.gh())+" fails to hit "+H.b(y.gh())+" with spear"},"$3","gL",6,0,1],
R:[function(a,b,c){var z,y,x,w,v,u,t
z=this.fs(a)
y=this.b
a.ab(c,"<subject> {throw<s>|hurl<s>|cast<s>} "+H.b(z.gaK()===!0?z.gh():"<subject's> "+H.b(z.gh()))+" at <object>",y)
if(y.gan()!=null)z.dL(c,"<subject> fl<ies> past <object-owner's> <object>",y.gan(),y,a,!0)
b.Y(y.gi(),new D.pv(z))
x=b.U(y.gi())
w=!x.gaF()&&x.gi()!==100
v=[P.r]
if(!w){u=S.bO("{shoulder|{left|right} arm|{left|right} thigh}")
t=a.gaW()
v=H.p([],v)
z.dL(c,"<subject> {pierce<s>|ram<s> into|drill<s> through} <object-owner's> <object>",new Y.aO(!1,u,v,t==null?$.$get$aZ():t,!1,C.n),x,a,!0)
N.b4(c,x)}else{u=S.bO("{chest|eye|neck}")
t=a.gaW()
v=H.p([],v)
z.dL(c,"<subject> {pierce<s>|ram<s> into|drill<s> through} <object-owner's> <object>",new Y.aO(!1,u,v,t==null?$.$get$aZ():t,!1,C.n),x,a,!0)
N.bj(c,b,x)}this.fE(b,a,z)
return H.b(a.gh())+" hits "+H.b(y.gh())+" with spear"},"$3","gM",6,0,1],
H:function(a,b){return 0.6-(this.b.gan()!=null?0.2:0)},
G:function(a,b){var z
if(a.gN()===!0)if(a.ga4())z=(C.a.a7(a.e.gf0(),C.r)||a.h8(C.r))&&J.e(b.ar("FightSituation").gV(),0)
else z=!1
else z=!1
return z},
fs:function(a){var z,y
if(a.gT()!=null&&a.gT() instanceof Z.ak)return a.gT()
for(z=a.gaz(),z=z.ga_(z);z.u();){y=z.d
if(y instanceof Z.ak)return y}throw H.c(new P.w("No spear found in "+a.k(0)))},
fE:function(a,b,c){var z,y
z=a.ar("FightSituation")
if(J.e(b.gT(),c)){y=b.jV()
if(y==null)y=$.$get$di()
a.Y(b.y,new D.ps(y))}else a.Y(b.gi(),new D.pt(c))
a.c1(z.gi(),z.a1(new D.pu(c)))},
v:{
xj:[function(a){return new D.pr(!0,!0,"The enemy is far enough for you to throw a spear at them and ready your other weapon before they close in.",!0,C.c,a,null)},"$1","wC",2,0,4]}},pv:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gag()
y=this.a.gbz()
if(typeof z!=="number")return z.as()
a.sag(z-y)
return a}},ps:{"^":"a:0;a",
$1:function(a){var z=this.a
a.sT(z)
a.gaz().a3(0,z)
return a}},pt:{"^":"a:0;a",
$1:function(a){a.gaz().a3(0,this.a)
return a}},pu:{"^":"a:0;a",
$1:function(a){a.gbl().q(0,this.a)
return a}}}],["","",,M,{"^":"",pD:{"^":"ag;I:b<,O:c<,K:d<,J:e<,a0:f<,a",
gW:function(){return"Regain clarity."},
gh:function(){return"Unconfuse"},
P:[function(a,b,c){throw H.c(new P.Y(null))},"$3","gL",6,0,1],
R:[function(a,b,c){a.ae(c,"<subject> shake<s> <subject's> head violently")
if(a.gN()===!0)c.q(0,"the {horrible|terrible} spell seems to recede")
a.kR(c,"<subject's> eyes regain focus and clarity",!0,!0)
return H.b(a.gh())+" regains clarity"},"$3","gM",6,0,1],
a9:function(a,b){return"WARNING this shouldn't be user-visible"},
H:function(a,b){return 1},
G:function(a,b){var z
if(a.eL(b)){z=b.c5("Confuse",a,!0)
if(typeof z!=="number")return z.bi()
z=z>4}else z=!1
return z}}}],["","",,R,{"^":"",lq:{"^":"z;I:c<,J:d<,a0:e<,O:f<,K:r<,b,a",
gh:function(){return"FinishBreakNeck"},
ga6:function(){return""},
gaf:function(){return"(WARNING should not be user-visible)"},
P:[function(a,b,c){throw H.c(new P.Y(null))},"$3","gL",6,0,1],
R:[function(a,b,c){var z,y
z=this.b
b.Y(z.gi(),new R.lr())
y=b.U(z.gi())
if(J.e(y.gi(),100)){a.bo(c,"<subject> smash<es> <object's> head to the ground",y,!0)
N.b4(c,y)}else{a.bo(c,"<subject> break<s> <object's> neck",y,!0)
N.bj(c,b,y)}return H.b(a.gh())+" breaks "+H.b(z.gh())+"'s neck on ground"},"$3","gM",6,0,1],
H:function(a,b){return 1},
G:function(a,b){return!0},
v:{
wT:[function(a){return new R.lq(null,!0,!0,!0,C.c,a,null)},"$1","ub",2,0,4]}},lr:{"^":"a:0;",
$1:function(a){a.sag(0)
return a}}}],["","",,Y,{"^":"",
f_:function(a,b){var z=new Y.du(null,null,null,null,null)
new Y.tG(a,b).$1(z)
return z.p()},
eZ:{"^":"ae;",
gaE:function(){return[R.ub()]},
gh:function(){return"BreakNeckOnGroundSituation"},
ax:function(){var z=new Y.du(null,null,null,null,null)
z.m(this)
new Y.jT().$1(z)
return z.p()},
aY:function(a,b){if(a===0)return b.U(this.a)
return},
b5:function(a,b){return new H.K(a,new Y.jU(this),[H.l(a,0)])}},
tG:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a8().aq(1073741823)
a.gb9().c=z
a.gb9().e=0
z=this.a.gi()
a.gb9().b=z
z=this.b.gi()
a.gb9().d=z
return a}},
jT:{"^":"a:0;",
$1:function(a){var z=a.gb9().e
if(typeof z!=="number")return z.ai()
a.gb9().e=z+1
return a}},
jU:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.e(a.gi(),z.a)||J.e(a.gi(),z.c)}},
pV:{"^":"eZ;a,i:b<,c,V:d<",
a1:function(a){var z=new Y.du(null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
A:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof Y.eZ))return!1
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
du:{"^":"d;a,b,c,d,e",
gi:function(){return this.gb9().c},
gV:function(){return this.gb9().e},
gb9:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
m:function(a){this.a=a},
p:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gb9().b
x=this.gb9().c
w=this.gb9().d
v=this.gb9().e
z=new Y.pV(y,x,w,v)
if(y==null)H.i(P.m("attacker"))
if(x==null)H.i(P.m("id"))
if(w==null)H.i(P.m("target"))
if(v==null)H.i(P.m("time"))}this.m(z)
return z}}}],["","",,Z,{"^":"",l8:{"^":"z;I:c<,J:d<,a0:e<,O:f<,K:r<,b,a",
ga6:function(){return"evade"},
gh:function(){return"EvadeNeckBreaking"},
gaf:function(){return"will <subject> evade?"},
P:[function(a,b,c){a.ae(c,"<subject> tr<ies> to {dodge it|break free}")
S.a6(new Z.l9(a,c),new Z.la(this,a,c),null,null)
b.aA()
return H.b(a.gh())+" fails to dodge "+H.b(this.b.gh())},"$3","gL",6,0,1],
R:[function(a,b,c){var z=this.b
a.bo(c,"<subject> {dodge<s> it|break<s> free}",z,!0)
b.b3("FightSituation")
return H.b(a.gh())+" evades "+H.b(z.gh())},"$3","gM",6,0,1],
H:function(a,b){var z
if(a.gN()===!0)return 0.6
z=b.f
return(z.length!==0?C.a.gw(z):null).gb4().b2(0.5)},
G:function(a,b){return!0},
v:{
wS:[function(a){return new Z.l8("This looks dangerous. Trying to evade this close-quarter move seems prudent.",!1,!1,!0,C.c,a,null)},"$1","u8",2,0,4]}},l9:{"^":"a:2;a,b",
$0:function(){return this.a.al(this.b,"<subject> {can't|fail<s>}",!0)}},la:{"^":"a:2;a,b,c",
$0:function(){return this.a.b.bQ(this.c,"<subject> <is> too quick for <object>",!0,this.b)}}}],["","",,S,{"^":"",
dU:function(a,b,c){var z=new S.dT(null,null,null,null,null,null)
new S.tF(a,b,c).$1(z)
return z.p()},
fD:{"^":"c7;",
gaE:function(){return[Z.u8()]},
gh:function(){return"OnGroundWrestleDefenseSituation"},
ax:function(){var z=new S.dT(null,null,null,null,null,null)
z.m(this)
new S.mV().$1(z)
return z.p()}},
tF:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$a8().aq(1073741823)
a.gaQ().c=z
a.gaQ().f=0
z=this.a.gi()
a.gaQ().b=z
z=this.b.gi()
a.gaQ().e=z
a.gaQ().d=this.c
return a}},
mV:{"^":"a:0;",
$1:function(a){var z=a.gaQ().f
if(typeof z!=="number")return z.ai()
a.gaQ().f=z+1
return a}},
q4:{"^":"fD;cN:a<,i:b<,cq:c<,ct:d<,V:e<",
a1:function(a){var z=new S.dT(null,null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
A:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof S.fD))return!1
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
dT:{"^":"d;a,b,c,d,e,f",
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
p:function(){var z,y,x,w,v,u
z=this.a
if(z==null){y=this.gaQ().b
x=this.gaQ().c
w=this.gaQ().d
v=this.gaQ().e
u=this.gaQ().f
z=new S.q4(y,x,w,v,u)
if(y==null)H.i(P.m("attacker"))
if(x==null)H.i(P.m("id"))
if(w==null)H.i(P.m("predeterminedResult"))
if(v==null)H.i(P.m("target"))
if(u==null)H.i(P.m("time"))}this.m(z)
return z}}}],["","",,A,{"^":"",
dn:function(a,b){var z,y,x,w
z=b.c5("KickToGround",a,!0)
if(z!=null&&z<=2)return!0
y=b.c5("Pound",a,!0)
if(y!=null&&y<=2)return!0
x=b.c5("FinishPunch",a,!0)
if(x!=null&&x<=2)return!0
w=b.c5("FinishLeap",a,!0)
if(w!=null&&w<=2)return!0
return!1}}],["","",,U,{"^":"",
c0:function(a){return a.gan().gaK()===!0?a.gan().gh():"<subject's> "+H.b(a.gan().gh())},
a9:function(a){return a.gT().gaK()===!0?a.gT().gh():"<subject's> "+H.b(a.gT().gh())}}],["","",,G,{"^":"",
xs:[function(a,b,c,d,e){a.ae(c,"<subject> tr<ies> to swing back")
a.eT(c,"<subject> {go<es> wide|miss<es>}",!0,!0)
if(a.ga4()){b.Y(a.y,new G.tQ())
a.c2(c,"<subject> lose<s> balance because of that",!0,!0)}else if(a.dy===C.h){b.Y(a.y,new G.tR())
a.aB(c,"<subject> lose<s> balance because of that",!0)
a.c2(c,"<subject> fall<s> to the ground",!0,!0)}},"$5","i9",10,0,10],
xt:[function(a){return new A.a1(G.ia(),new G.tS(),G.i9(),new G.tT(),new G.tU(),new G.tV(),null,!1,"You can deal serious damage when countering because your opponent is often caught off guard. On the other hand, counters require fast reaction and could throw you out of balance.",!0,!0,"CounterSlash",!1,null,"swing back at <object>",null,a,null)},"$1","u_",2,0,4],
xv:[function(a,b,c,d,e){return a.ab(c,"<subject> swing<s> back",d)},"$5","ia",10,0,8],
xu:[function(a){return new A.a1(G.ia(),new G.tW(),G.i9(),new G.tX(),new G.tY(),new G.tZ(),null,!1,"You can deal serious damage when countering because your opponent is often caught off guard. On the other hand, counters require fast reaction and could throw you out of balance.",!0,!0,"CounterSlashPlayer",!0,C.c,"swing back at <object>","will <subject> hit <objectPronoun>?",a,null)},"$1","u0",2,0,4],
tQ:{"^":"a:0;",
$1:function(a){a.sah(C.h)
return a}},
tR:{"^":"a:0;",
$1:function(a){a.sah(C.f)
return a}},
tT:{"^":"a:3;",
$3:function(a,b,c){return a.gN()!==!0&&a.gT().gaU()&&!a.ga2()}},
tU:{"^":"a:3;",
$3:function(a,b,c){return M.bc(a,c)}},
tV:{"^":"a:3;",
$3:function(a,b,c){return L.aQ(a,c,C.l)}},
tS:{"^":"a:3;",
$3:function(a,b,c){return c.ga4()?0.7:0.9}},
tX:{"^":"a:3;",
$3:function(a,b,c){return a.gN()===!0&&a.gT().gaU()&&!a.ga2()}},
tY:{"^":"a:3;",
$3:function(a,b,c){return M.bc(a,c)}},
tZ:{"^":"a:3;",
$3:function(a,b,c){return L.aQ(a,c,C.m)}},
tW:{"^":"a:3;",
$3:function(a,b,c){return c.ga4()?0.7:0.9}}}],["","",,V,{"^":"",kd:{"^":"z;I:c<,J:d<,a0:e<,O:f<,K:r<,b,a",
ga6:function(){return"tackle <object>"},
gh:function(){return"CounterTackle"},
gaf:function(){return"will <subject> tackle <objectPronoun>?"},
P:[function(a,b,c){var z=this.b
a.ab(c,"<subject> tr<ies> to tackle <object>",z)
S.a6(new V.ke(a,c),new V.kf(this,c),null,null)
a.ab(c,"<subject> land<s> on the "+H.b(U.bB(b))+" next to <object>",z)
b.Y(a.gi(),new V.kg())
return H.b(a.gh())+" fails to tackle "+H.b(z.gh())},"$3","gL",6,0,1],
R:[function(a,b,c){var z=this.b
a.ab(c,"<subject> tackle<s> <object> to the ground",z)
b.Y(z.gi(),new V.kh())
b.Y(a.gi(),new V.ki())
return H.b(a.gh())+" tackles "+H.b(z.gh())},"$3","gM",6,0,1],
H:function(a,b){var z=this.b.gap()?0.2:0
if(a.gN()===!0)return 0.7+z
return 0.5+z},
G:function(a,b){return!a.ga2()&&a.e instanceof K.cc},
v:{
wL:[function(a){return new V.kd("When an opponent misses you like that, it's a rare (though still dangerous) opportunity to bring them down.",!0,!0,!0,C.c,a,null)},"$1","u1",2,0,4]}},ke:{"^":"a:2;a,b",
$0:function(){return this.a.al(this.b,"<subject> go<es> wide",!0)}},kf:{"^":"a:2;a,b",
$0:function(){return this.a.b.al(this.b,"<subject> {evade<s>|sidestep<s>} it",!0)}},kg:{"^":"a:0;",
$1:function(a){a.sah(C.f)
return a}},kh:{"^":"a:0;",
$1:function(a){a.sah(C.f)
return a}},ki:{"^":"a:0;",
$1:function(a){a.sah(C.f)
return a}}}],["","",,S,{"^":"",
c5:function(a,b){var z=new S.dx(null,null,null,null,null)
new S.ty(a,b).$1(z)
return z.p()},
f5:{"^":"ae;",
gaE:function(){return[G.u_(),G.u0(),V.u1()]},
gbN:function(){return[$.$get$dW()]},
gh:function(){return"CounterAttackSituation"},
ax:function(){var z=new S.dx(null,null,null,null,null)
z.m(this)
new S.kb().$1(z)
return z.p()},
aY:function(a,b){if(a===0)return b.U(this.a)
return},
b5:function(a,b){return new H.K(a,new S.kc(this),[H.l(a,0)])}},
ty:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a8().aq(1073741823)
a.gba().c=z
a.gba().e=0
z=this.a.gi()
a.gba().b=z
z=this.b.gi()
a.gba().d=z
return a}},
kb:{"^":"a:0;",
$1:function(a){var z=a.gba().e
if(typeof z!=="number")return z.ai()
a.gba().e=z+1
return a}},
kc:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.e(a.gi(),z.a)||J.e(a.gi(),z.c)}},
pW:{"^":"f5;a,i:b<,c,V:d<",
a1:function(a){var z=new S.dx(null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
A:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof S.f5))return!1
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
p:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gba().b
x=this.gba().c
w=this.gba().d
v=this.gba().e
z=new S.pW(y,x,w,v)
if(y==null)H.i(P.m("counterAttacker"))
if(x==null)H.i(P.m("id"))
if(w==null)H.i(P.m("target"))
if(v==null)H.i(P.m("time"))}this.m(z)
return z}}}],["","",,O,{"^":"",c7:{"^":"oo;",
gdE:function(){return 1000},
aY:function(a,b){if(a===0)return b.U(this.gct())
return},
b5:function(a,b){return new H.K(a,new O.kn(this),[H.l(a,0)])}},oo:{"^":"ae+nh;"},kn:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.e(a.gi(),z.gcN())||J.e(a.gi(),z.gct())}}}],["","",,U,{"^":"",
bB:function(a){return a.ar("FightSituation").gc8()},
cb:function(a,b,c,d,e){var z=new U.ca(null,null,null,null,null,null,null,null,null)
new U.tM(a,b,c,d,e).$1(z)
return z.p()},
cR:{"^":"ae;",
gaE:function(){return[N.tN(),V.u3(),R.uK(),Y.uV(),T.wd(),T.we(),M.wf(),M.wg(),U.wh(),U.wi(),G.wj(),G.wk(),D.wn(),D.wo(),R.wl(),R.wm(),A.wp(),A.wq(),O.wr(),O.ws(),E.wy(),M.wz(),D.wC()]},
gbN:function(){return H.p([$.$get$fQ(),$.$get$h8(),$.$get$fU(),$.$get$hy()],[Q.ag])},
gdE:function(){return 1000},
gh:function(){return"FightSituation"},
cO:function(a,b){var z=b.a
return(z&&C.a).bs(z,new U.ld(a))},
ax:function(){var z=new U.ca(null,null,null,null,null,null,null,null,null)
z.m(this)
new U.le().$1(z)
return z.p()},
aY:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j
z=X.i2(this.f,this.b)
y=H.bI(z,new U.lf(b),H.y(z,"B",0),null)
x=H.y(y,"B",0)
w=P.P(new H.K(y,new U.lg(),[x]),!1,x)
x=H.l(w,0)
v=P.P(new H.K(w,new U.lh(),[x]),!1,x)
u=v.length===1?C.a.gcb(v):null
if(a===0)if(u!=null)return u
for(y=w.length,t=0,s=null,r=0;r<w.length;w.length===y||(0,H.as)(w),++r){q=w[r]
x=b.d
p=x.aT(0,new U.li(q),new U.lj())
o=p==null?p:p.gV()
if(o==null)o=-1
n=b.r
if(typeof o!=="number")return H.x(o)
m=n-o
if(m<=0)continue
l=x.aT(0,new U.lk(q),new U.ll())
k=l==null?l:l.gV()
if(k==null)k=-1
x=b.r
if(typeof k!=="number")return H.x(k)
j=(x-k+m)/2
if(q.gN()===!0)j*=1.5
if(j>t){s=q
t=j}}return s},
b5:function(a,b){return new H.K(a,new U.lm(this),[H.l(a,0)])},
hj:function(a,b){var z,y
z=this.x
y=this.c.a
if(y.ac(z))y.j(0,z).$2(a,b)},
dG:function(a){var z,y,x,w,v,u,t
z=this.r
if(z!=null&&!this.cO(a,this.b)&&this.cO(a,this.f)){y=a.f3(z)
a.c1(y.gi(),y.a1(new U.ln()))
for(z=this.f,x=z.a,x=new J.bk(x,x.length,0,null,[H.l(x,0)]),w=a.a;x.u();){v=x.d
if(a.U(v).gaG()){u=a.U(v)
t=u.a1(new U.lo())
w.a3(0,u)
w.q(0,t)}}C.a.q(a.f,X.mv(z,this.d,this.a,null))}else this.cO(a,this.f)},
de:function(a){var z=this.f
if(this.cO(a,z))if(this.cO(a,this.b)){z=z.a
z=(z&&C.a).bs(z,new U.lp(a))}else z=!1
else z=!1
return z}},
tM:{"^":"a:0;a,b,c,d,e",
$1:function(a){var z,y
z=$.$get$a8().aq(1073741823)
a.gam().f=z
a.gam().y=0
z=a.gam()
y=z.r
if(y==null){y=new S.O(null,null,[P.t])
y.aj()
y.m(C.d)
z.r=y
z=y}else z=y
z.m(J.eR(this.a,new U.ru()))
z=a.gam()
y=z.c
if(y==null){y=new S.O(null,null,[P.t])
y.aj()
y.m(C.d)
z.c=y
z=y}else z=y
y=this.b
z.m(new H.aq(y,new U.rv(),[H.l(y,0),null]))
a.gam().e=this.c
y=new S.O(null,null,[U.ac])
y.aj()
y.m(C.d)
a.gam().b=y
y=this.d.gi()
a.gam().x=y
y=new A.cW(null,null,[P.t,{func:1,v:true,args:[A.a3,Y.a2]}])
y.cf()
y.m(this.e)
a.gam().d=y
return a}},
ru:{"^":"a:0;",
$1:function(a){return a.gi()}},
rv:{"^":"a:0;",
$1:function(a){return a.gi()}},
ld:{"^":"a:0;a",
$1:function(a){return this.a.U(a).gaG()}},
le:{"^":"a:0;",
$1:function(a){var z=a.gam().y
if(typeof z!=="number")return z.ai()
a.gam().y=z+1
return a}},
lf:{"^":"a:0;a",
$1:function(a){return this.a.U(a)}},
lg:{"^":"a:0;",
$1:function(a){return a.gaG()}},
lh:{"^":"a:0;",
$1:function(a){return a.gN()}},
li:{"^":"a:0;a",
$1:function(a){return J.e(a.gcr(),this.a.gi())&&a.ghF()===!0}},
lj:{"^":"a:2;",
$0:function(){return}},
lk:{"^":"a:0;a",
$1:function(a){return J.e(a.gcr(),this.a.gi())}},
ll:{"^":"a:2;",
$0:function(){return}},
lm:{"^":"a:23;a",
$1:function(a){var z,y,x
if(a.gaG()){z=this.a
y=a.gi()
x=z.f.a
if(!(x&&C.a).a7(x,y)){y=a.gi()
z=z.b.a
y=(z&&C.a).a7(z,y)
z=y}else z=!0}else z=!1
return z}},
ln:{"^":"a:0;",
$1:function(a){a.skB(!1)
return a}},
lo:{"^":"a:0;",
$1:function(a){a.sah(C.k)
return a}},
lp:{"^":"a:52;a",
$1:function(a){var z=this.a.U(a)
return z.gN()===!0&&z.gaG()}},
pY:{"^":"cR;bl:a<,b,c,c8:d<,i:e<,cZ:f<,r,V:x<",
a1:function(a){var z=new U.ca(null,null,null,null,null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
A:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof U.cR))return!1
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
gbl:function(){var z,y
z=this.gam()
y=z.b
if(y==null){y=new S.O(null,null,[U.ac])
y.aj()
y.m(C.d)
z.b=y
z=y}else z=y
return z},
gc8:function(){return this.gam().e},
gi:function(){return this.gam().f},
gcZ:function(){var z,y
z=this.gam()
y=z.r
if(y==null){y=new S.O(null,null,[P.t])
y.aj()
y.m(C.d)
z.r=y
z=y}else z=y
return z},
gV:function(){return this.gam().y},
gam:function(){var z,y
z=this.a
if(z!=null){z=z.a
if(!(z==null)){y=new S.O(null,null,[H.l(z,0)])
y.aj()
y.m(z)
z=y}this.b=z
z=this.a.b
if(!(z==null)){y=new S.O(null,null,[H.l(z,0)])
y.aj()
y.m(z)
z=y}this.c=z
z=this.a.c
if(!(z==null)){y=new A.cW(null,null,[H.l(z,0),H.l(z,1)])
y.cf()
y.m(z)
z=y}this.d=z
z=this.a
this.e=z.d
this.f=z.e
z=z.f
if(!(z==null)){y=new S.O(null,null,[H.l(z,0)])
y.aj()
y.m(z)
z=y}this.r=z
z=this.a
this.x=z.r
this.y=z.x
this.a=null}return this},
m:function(a){this.a=a},
p:function(){var z,y,x,w,v,u,t,s,r
z=this.a
if(z==null){y=this.gam()
x=y.b
if(x==null){x=new S.O(null,null,[U.ac])
x.aj()
x.m(C.d)
y.b=x
y=x}else y=x
y=y.p()
x=this.gam()
w=x.c
if(w==null){w=new S.O(null,null,[P.t])
w.aj()
w.m(C.d)
x.c=w
x=w}else x=w
x=x.p()
w=this.gam()
v=w.d
if(v==null){v=new A.cW(null,null,[P.t,{func:1,v:true,args:[A.a3,Y.a2]}])
v.cf()
v.m(C.E)
w.d=v
w=v}else w=v
w=w.p()
v=this.gam().e
u=this.gam().f
t=this.gam()
s=t.r
if(s==null){s=new S.O(null,null,[P.t])
s.aj()
s.m(C.d)
t.r=s
t=s}else t=s
t=t.p()
s=this.gam().x
r=this.gam().y
z=new U.pY(y,x,w,v,u,t,s,r)
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
z=b.ar("FightSituation")
y=z.gc8()
b.c1(z.gi(),z.a1(new N.uL(c)))
if(c.gah()===C.f){c.aB(a,"<subject> stop<s> moving",!0)
a.t(0,"\n\n",!0)
return}switch($.$get$hU().aq(3)){case 0:c.c2(a,"<subject> collapse<s>, dead",!0,!0)
break
case 1:c.aB(a,"<subject> fall<s> backward",!0)
c.aB(a,"<subject> twist<s>",!0)
c.c2(a,"<subject> hit<s> the "+H.b(y)+" face down",!0,!0)
break
case 2:c.aB(a,"<subject> drop<s> to <subject's> knees",!0)
c.aB(a,"<subject> keel<s> over",!0)
break}a.t(0,"\n\n",!0)},
b4:function(a,b){if(J.e(b.gi(),100)&&b.gag()===0){N.rD(a,b)
return}b.aB(a,"<subject> {scream|yell|grunt}<s> in pain",!0)},
rD:function(a,b){if(b.gah()===C.f){b.aB(a,"<subject> stop<s> moving",!0)
a.t(0,"\n\n",!0)
return}b.aB(a,"<subject> drop<s> to <subject's> knees",!0)
b.aB(a,"<subject> keel<s> over",!0)
a.t(0,"\n\n",!0)},
uL:{"^":"a:0;a",
$1:function(a){var z=this.a
if(!z.gaH())a.gbl().q(0,z.e)
if(z.d!=null)a.gbl().q(0,z.d)
return a}}}],["","",,R,{"^":"",ls:{"^":"z;I:c<,J:d<,a0:e<,O:f<,K:r<,b,a",
gh:function(){return"FinishLeap"},
ga6:function(){return""},
gaf:function(){return"(WARNING should not be user-visible)"},
P:[function(a,b,c){throw H.c(new P.Y(null))},"$3","gL",6,0,1],
R:[function(a,b,c){var z,y,x,w,v
z=this.b
b.Y(z.gi(),new R.lt())
y=b.U(z.gi())
b.Y(a.gi(),new R.lu())
x=b.ar("LeapSituation").gi()
w=U.bB(b)
a.bR(c,"<subject> {ram<s>|smash<es>} into <object>",x,z,!0)
c.jk(0,"both "+(a.gN()===!0||z.gN()===!0?"of you":"")+" {land on|fall to} the "+H.b(w),x)
v=z.gag()
if(typeof v!=="number")return v.bi()
if(v>1){c.jl(0,"the impact almost {knocks <object> unconscious|knocks <object> out}",x,z)
N.b4(c,y)
b.Y(z.gi(),new R.lv())}return H.b(a.gh())+" finishes leap at "+H.b(z.gh())},"$3","gM",6,0,1],
H:function(a,b){return 1},
G:function(a,b){return!0},
v:{
wU:[function(a){return new R.ls(null,!0,!0,!0,C.c,a,null)},"$1","uc",2,0,4]}},lt:{"^":"a:0;",
$1:function(a){a.sah(C.f)
return a}},lu:{"^":"a:0;",
$1:function(a){a.sah(C.f)
return a}},lv:{"^":"a:0;",
$1:function(a){var z=a.gag()
if(typeof z!=="number")return z.as()
a.sag(z-1)
return a}}}],["","",,S,{"^":"",kz:{"^":"z;I:c<,J:d<,a0:e<,O:f<,K:r<,b,a",
ga6:function(){return"dodge"},
gh:function(){return"DodgeLeap"},
gaf:function(){return"will <subject> dodge?"},
P:[function(a,b,c){var z=b.ar("LeapSituation").gi()
a.hs(c,"<subject> tr<ies> to {dodge|sidestep}",z,!0)
if(a.gap())a.c3(c,"<subject> <is> out of balance",z,!0,!0)
else S.a6(new S.kA(a,c,z),new S.kB(a,c,z),null,null)
b.aA()
return H.b(a.db)+" fails to dodge "+H.b(this.b.gh())},"$3","gL",6,0,1],
R:[function(a,b,c){var z,y,x
z=b.ar("LeapSituation").gi()
y=U.bB(b)
x=this.b
a.bR(c,"<subject> {dodge<s>|sidestep<s>} <object>",z,x,!0)
x.aB(c,"<subject> {crash<es> to|fall<s> to|hit<s>} the "+H.b(y),!0)
b.Y(x.gi(),new S.kC())
b.b3("FightSituation")
return H.b(a.gh())+" dodges "+H.b(x.gh())},"$3","gM",6,0,1],
H:function(a,b){var z,y,x
z=a.ga4()?0:0.2
y=this.b.ga2()?0.2:0
if(a.ch===!0)return 0.8-z+y
x=b.f
return(x.length!==0?C.a.gw(x):null).gb4().b2(0.5-z+y)},
G:function(a,b){return!a.ga2()},
v:{
wO:[function(a){return new S.kz("Dodging means moving your body out of harm's way. When successful, your opponent will miss and will hit the ground beside you.",!1,!1,!0,C.c,a,null)},"$1","u4",2,0,4]}},kA:{"^":"a:2;a,b,c",
$0:function(){return this.a.c3(this.b,"<subject> {can't|fail<s>|<does>n't succeed}",this.c,!0,!0)}},kB:{"^":"a:2;a,b,c",
$0:function(){return this.a.c3(this.b,"<subject> {<is> too slow|<is>n't fast enough}",this.c,!0,!0)}},kC:{"^":"a:0;",
$1:function(a){a.sah(C.f)
return a}}}],["","",,D,{"^":"",lP:{"^":"z;I:c<,J:d<,a0:e<,O:f<,K:r<,b,a",
ga6:function(){return"impale"},
gh:function(){return"ImpaleLeaper"},
gaf:function(){return"will <subject> impale <objectPronoun>?"},
P:[function(a,b,c){var z,y
z=b.ar("LeapSituation").gi()
y=this.b
a.dK(c,"<subject> tr<ies> to {move|swing|shift} "+H.b(U.a9(a))+" between <subjectPronounSelf> and <object>",z,!0,y)
if(a.gap())a.c3(c,"<subject> <is> out of balance",z,!0,!0)
else S.a6(new D.lQ(a,c,z),new D.lR(a,c,z),null,null)
b.aA()
return H.b(a.db)+" fails to impale "+H.b(y.gh())},"$3","gL",6,0,1],
R:[function(a,b,c){var z,y,x
z=b.ar("LeapSituation").gi()
y=this.b
a.bR(c,"<subject> {move<s>|swing<s>|shift<s>} "+H.b(U.a9(a))+" between <subjectPronounSelf> and <object>",z,y,!0)
y.aB(c,"<subject> {leap<s>|run<s>|lunge<s>} right into it",!0)
b.Y(y.gi(),new D.lS())
x=b.U(y.gi())
if(!(!x.gaF()&&x.gi()!==100)){a.gT().ab(c,"<subject> {cut<s> into|pierce<s>|go<es> into} <object's> flesh",x)
x.ae(c,"<subject> fall<s> to the ground")
N.b4(c,x)}else{a.gT().ab(c,"<subject> {go<es> right through|completely impale<s>|bore<s> through} <object's> {body|chest|stomach|neck}",x)
x.aB(c,"<subject> go<es> down",!0)
N.bj(c,b,x)}b.b3("FightSituation")
return H.b(a.gh())+" impales "+H.b(y.gh())},"$3","gM",6,0,1],
H:function(a,b){var z,y,x
z=a.ga4()?0:0.2
y=this.b.ga2()?0.2:0
if(a.ch===!0)return 0.5-z+y
x=b.f
return(x.length!==0?C.a.gw(x):null).gb4().b2(0.4-z+y)},
G:function(a,b){return!a.ga2()&&a.e.geN()},
v:{
x_:[function(a){return new D.lP("You can move your weapon to point at the attacker. If successful, the weapon will pierce the attacker with the force of his own leap.",!1,!1,!0,C.c,a,null)},"$1","uC",2,0,4]}},lQ:{"^":"a:2;a,b,c",
$0:function(){return this.a.c3(this.b,"<subject> {can't|fail<s>|<does>n't succeed}",this.c,!0,!0)}},lR:{"^":"a:2;a,b,c",
$0:function(){return this.a.c3(this.b,"<subject> {<is> too slow|<is>n't fast enough}",this.c,!0,!0)}},lS:{"^":"a:0;",
$1:function(a){var z=a.gag()
if(typeof z!=="number")return z.as()
a.sag(z-1)
a.sah(C.f)
return a}}}],["","",,V,{"^":"",
dJ:function(a,b,c){var z=new V.dI(null,null,null,null,null,null)
new V.tD(a,b,c).$1(z)
return z.p()},
fo:{"^":"c7;",
gaE:function(){return[S.u4(),D.uC()]},
gh:function(){return"LeapDefenseSituation"},
ax:function(){var z=new V.dI(null,null,null,null,null,null)
z.m(this)
new V.mj().$1(z)
return z.p()}},
tD:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$a8().aq(1073741823)
a.gaM().c=z
a.gaM().f=0
z=this.a.gi()
a.gaM().b=z
z=this.b.gi()
a.gaM().e=z
a.gaM().d=this.c
return a}},
mj:{"^":"a:0;",
$1:function(a){var z=a.gaM().f
if(typeof z!=="number")return z.ai()
a.gaM().f=z+1
return a}},
q_:{"^":"fo;cN:a<,i:b<,cq:c<,ct:d<,V:e<",
a1:function(a){var z=new V.dI(null,null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
A:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof V.fo))return!1
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
dI:{"^":"d;a,b,c,d,e,f",
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
p:function(){var z,y,x,w,v,u
z=this.a
if(z==null){y=this.gaM().b
x=this.gaM().c
w=this.gaM().d
v=this.gaM().e
u=this.gaM().f
z=new V.q_(y,x,w,v,u)
if(y==null)H.i(P.m("attacker"))
if(x==null)H.i(P.m("id"))
if(w==null)H.i(P.m("predeterminedResult"))
if(v==null)H.i(P.m("target"))
if(u==null)H.i(P.m("time"))}this.m(z)
return z}}}],["","",,F,{"^":"",
fq:function(a,b){var z=new F.dK(null,null,null,null,null)
new F.tE(a,b).$1(z)
return z.p()},
fp:{"^":"ae;",
gaE:function(){return[R.uc()]},
gh:function(){return"LeapSituation"},
ax:function(){var z=new F.dK(null,null,null,null,null)
z.m(this)
new F.mk().$1(z)
return z.p()},
aY:function(a,b){if(a===0)return b.U(this.a)
return},
b5:function(a,b){return new H.K(a,new F.ml(this),[H.l(a,0)])}},
tE:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a8().aq(1073741823)
a.gbb().c=z
a.gbb().e=0
z=this.a.gi()
a.gbb().b=z
z=this.b.gi()
a.gbb().d=z
return a}},
mk:{"^":"a:0;",
$1:function(a){var z=a.gbb().e
if(typeof z!=="number")return z.ai()
a.gbb().e=z+1
return a}},
ml:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.e(a.gi(),z.a)||J.e(a.gi(),z.c)}},
q0:{"^":"fp;a,i:b<,c,V:d<",
a1:function(a){var z=new F.dK(null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
A:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof F.fp))return!1
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
dK:{"^":"d;a,b,c,d,e",
gi:function(){return this.gbb().c},
gV:function(){return this.gbb().e},
gbb:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
m:function(a){this.a=a},
p:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gbb().b
x=this.gbb().c
w=this.gbb().d
v=this.gbb().e
z=new F.q0(y,x,w,v)
if(y==null)H.i(P.m("attacker"))
if(x==null)H.i(P.m("id"))
if(w==null)H.i(P.m("target"))
if(v==null)H.i(P.m("time"))}this.m(z)
return z}}}],["","",,Z,{"^":"",jB:{"^":"ag;J:b<,a0:c<,O:d<,K:e<,a",
gW:function(){return""},
gI:function(){return},
gh:function(){return"AutoLoot"},
P:[function(a,b,c){throw H.c(new P.Y(null))},"$3","gL",6,0,1],
R:[function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j
z=b.ar("LootSituation")
y=b.U(100)
if(y.gc0()===!0&&!y.gaF()){a.ab(c,"<subject> kneel<s> next to <object>",y)
a.ab(c,"<subject> help<s> <object> to <object's> feet",y)
y.d0(c,'"I\'ll live," <subject> say<s>.',!0)
b.Y(100,new Z.jO())}x=[]
for(w=z.gbl(),w=w.ga_(w),v=b.a,u=null,t=null;w.u();){s=w.d
r=b.U(a.gi())
q=r.gT() instanceof Z.ak&&s instanceof G.aE
p=J.o(s)
if(!!p.$isaS){o=s.gbI()
n=s.gbz()
m=s.gaK()?1:0
l=r.gT().gad()
if(typeof l!=="number")return H.x(l)
o=2+o+n+m>l||q}else o=!1
if(o){k=b.U(a.gi())
j=k.a1(new Z.jP(s,r))
v.a3(0,k)
v.q(0,j)
u=s}else if(!!p.$isbr&&r.gan()==null){k=b.U(a.gi())
j=k.a1(new Z.jQ(s))
v.a3(0,k)
v.q(0,j)
t=s}else{k=b.U(a.gi())
j=k.a1(new Z.jR(s))
v.a3(0,k)
v.q(0,j)
x.push(s)}}if(u!=null){a.ab(c,"<subject> pick<s> up <object>",u)
a.ab(c,"<subject> wield<s> <object>",u)}if(t!=null){a.ab(c,"<subject> pick<s> up <object>",t)
a.ab(c,"<subject> wield<s> <object>",t)}this.iC(x,a,z,b,c)
this.iB(x,a,z,b,c)
if(x.length!==0)c.jr("<subject> <also> take<s>",x,null,a)
return H.b(a.gh())+" auto-loots"},"$3","gM",6,0,1],
a9:function(a,b){return"WARNING this shouldn't be user-visible"},
H:function(a,b){return 1},
G:function(a,b){return a.gN()},
iC:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q
z=P.P(new H.K(a,new Z.jI(),[H.l(a,0)]),!0,L.aS)
for(y=b.gaz(),y=y.ga_(y);y.u();){x=y.d
if(x instanceof L.aS)C.a.q(z,x)}if(z.length===0)return
C.a.cc(z,new Z.jJ())
w=c.gcZ().aJ(0,new Z.jK(d)).dh(0,new Z.jL())
for(y=J.ai(w.a),v=new H.bT(y,w.b,[H.l(w,0)]),u=d.a;v.u();){t=y.gS()
if(z.length===0)break
s=C.a.hq(z)
r=d.U(t.gi())
q=r.a1(new Z.jM(s))
u.a3(0,r)
u.q(0,q)
C.a.a3(a,s)
r=d.U(b.gi())
q=r.a1(new Z.jN(s))
u.a3(0,r)
u.q(0,q)
b.ab(e,"<subject> give<s> the "+H.b(s.gh())+" to <object>",t)}},
iB:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q
z=P.P(new H.K(a,new Z.jC(),[H.l(a,0)]),!0,E.br)
for(y=b.gaz(),y=y.ga_(y);y.u();){x=y.d
if(x instanceof E.br)C.a.q(z,x)}if(z.length===0)return
C.a.cc(z,new Z.jD())
w=c.gcZ().aJ(0,new Z.jE(d)).dh(0,new Z.jF())
for(y=J.ai(w.a),v=new H.bT(y,w.b,[H.l(w,0)]),u=d.a;v.u();){t=y.gS()
if(z.length===0)break
s=C.a.hq(z)
r=d.U(t.gi())
q=r.a1(new Z.jG(s))
u.a3(0,r)
u.q(0,q)
C.a.a3(a,s)
r=d.U(b.gi())
q=r.a1(new Z.jH(s))
u.a3(0,r)
u.q(0,q)
b.ab(e,"<subject> give<s> the "+H.b(s.gh())+" to <object>",t)}}},jO:{"^":"a:0;",
$1:function(a){a.sah(C.h)
a.sag(1)
return a}},jP:{"^":"a:0;a,b",
$1:function(a){var z=this.b
if(!(z.gT() instanceof K.cc))a.gaz().q(0,z.gT())
a.sT(this.a)}},jQ:{"^":"a:0;a",
$1:function(a){var z=this.a
a.san(z)
return z}},jR:{"^":"a:0;a",
$1:function(a){a.gaz().q(0,this.a)
return a}},jI:{"^":"a:0;",
$1:function(a){return a instanceof L.aS}},jJ:{"^":"a:6;",
$2:function(a,b){return J.bE(a.gad(),b.gad())}},jK:{"^":"a:0;a",
$1:function(a){return this.a.U(a)}},jL:{"^":"a:0;",
$1:function(a){return a.gaG()&&a.gaH()}},jM:{"^":"a:0;a",
$1:function(a){a.sT(this.a)
return a}},jN:{"^":"a:0;a",
$1:function(a){a.gaz().a3(0,this.a)
return a}},jC:{"^":"a:0;",
$1:function(a){return a instanceof E.br}},jD:{"^":"a:6;",
$2:function(a,b){return J.bE(a.gad(),b.gad())}},jE:{"^":"a:0;a",
$1:function(a){return this.a.U(a)}},jF:{"^":"a:0;",
$1:function(a){return a.gaG()&&a.gan()==null}},jG:{"^":"a:0;a",
$1:function(a){a.san(this.a)
return a}},jH:{"^":"a:0;a",
$1:function(a){a.gaz().a3(0,this.a)
return a}}}],["","",,X,{"^":"",
mv:function(a,b,c,d){var z=new X.dO(null,null,null,null,null,null)
new X.tu(a,b,c).$1(z)
return z.p()},
fv:{"^":"ae;",
gbN:function(){return H.p([$.$get$eW()],[Q.ag])},
gh:function(){return"LootSituation"},
ax:function(){var z=new X.dO(null,null,null,null,null,null)
z.m(this)
new X.mx().$1(z)
return z.p()},
aY:function(a,b){if(typeof a!=="number")return a.bi()
if(a>0)return
return this.ft(b.a)},
b5:function(a,b){return[this.ft(a)]},
de:function(a){return!0},
ft:function(a){return a.ck(0,new X.mw())}},
tu:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$a8().aq(1073741823)
a.gav().e=z
a.gav().f=0
a.gav().c=this.b
z=new S.O(null,null,[P.t])
z.aj()
z.m(this.a)
a.gav().d=z
z=new S.O(null,null,[U.ac])
z.aj()
z.m(this.c)
a.gav().b=z
return a}},
mx:{"^":"a:0;",
$1:function(a){var z=a.gav().f
if(typeof z!=="number")return z.ai()
a.gav().f=z+1
return a}},
mw:{"^":"a:0;",
$1:function(a){return a.gN()===!0&&a.gaG()}},
q1:{"^":"fv;bl:a<,c8:b<,cZ:c<,i:d<,V:e<",
a1:function(a){var z=new X.dO(null,null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
A:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof X.fv))return!1
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
dO:{"^":"d;a,b,c,d,e,f",
gbl:function(){var z,y
z=this.gav()
y=z.b
if(y==null){y=new S.O(null,null,[U.ac])
y.aj()
y.m(C.d)
z.b=y
z=y}else z=y
return z},
gc8:function(){return this.gav().c},
gcZ:function(){var z,y
z=this.gav()
y=z.d
if(y==null){y=new S.O(null,null,[P.t])
y.aj()
y.m(C.d)
z.d=y
z=y}else z=y
return z},
gi:function(){return this.gav().e},
gV:function(){return this.gav().f},
gav:function(){var z,y
z=this.a
if(z!=null){z=z.a
if(!(z==null)){y=new S.O(null,null,[H.l(z,0)])
y.aj()
y.m(z)
z=y}this.b=z
z=this.a
this.c=z.b
z=z.c
if(!(z==null)){y=new S.O(null,null,[H.l(z,0)])
y.aj()
y.m(z)
z=y}this.d=z
z=this.a
this.e=z.d
this.f=z.e
this.a=null}return this},
m:function(a){this.a=a},
p:function(){var z,y,x,w,v,u
z=this.a
if(z==null){y=this.gav()
x=y.b
if(x==null){x=new S.O(null,null,[U.ac])
x.aj()
x.m(C.d)
y.b=x
y=x}else y=x
y=y.p()
x=this.gav().c
w=this.gav()
v=w.d
if(v==null){v=new S.O(null,null,[P.t])
v.aj()
v.m(C.d)
w.d=v
w=v}else w=v
w=w.p()
v=this.gav().e
u=this.gav().f
z=new X.q1(y,x,w,v,u)
if(y==null)H.i(P.m("droppedItems"))
if(x==null)H.i(P.m("groundMaterial"))
if(w==null)H.i(P.m("playerTeamIds"))
if(v==null)H.i(P.m("id"))
if(u==null)H.i(P.m("time"))}this.m(z)
return z}}}],["","",,A,{"^":"",mL:{"^":"z;I:c<,J:d<,a0:e<,O:f<,K:r<,b,a",
ga6:function(){return"stab <object>"},
gh:function(){return"OffBalanceOpportunityThrust"},
gaf:function(){return"will <subject> hit <objectPronoun>?"},
P:[function(a,b,c){var z=this.b
a.ab(c,"<subject> tr<ies> to stab <object>",z)
a.al(c,"<subject> {go<es> wide|fail<s>|miss<es>}",!0)
return H.b(a.gh())+" fails to stab "+H.b(z.gh())},"$3","gL",6,0,1],
R:[function(a,b,c){var z,y
z=this.b
b.Y(z.gi(),new A.mM(a))
y=b.U(z.gi())
if(!(!y.gaF()&&y.gi()!==100)){a.bo(c,"<subject> thrust<s> {|"+H.b(U.a9(a))+"} deep into <object's> {shoulder|hip|thigh}",y,!0)
N.b4(c,y)}else{a.bo(c,"<subject> {stab<s>|run<s> "+H.b(U.a9(a))+" through} <object>",y,!0)
N.bj(c,b,y)}return H.b(a.gh())+" stabs "+H.b(z.gh())},"$3","gM",6,0,1],
H:function(a,b){if(a.gN()===!0)return 0.6
return 0.5},
G:function(a,b){return a.ga4()&&this.b.gap()&&a.e.geN()},
v:{
x4:[function(a){return new A.mL("When an opponent is out of balance they are the most vulnerable.",!0,!0,!0,C.c,a,null)},"$1","uP",2,0,4]}},mM:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gag()
y=this.a.gT().gbz()
if(typeof z!=="number")return z.as()
a.sag(z-y)
return a}}}],["","",,U,{"^":"",
mH:function(a,b){var z=new U.dR(null,null,null,null,null)
new U.tH(a,b).$1(z)
return z.p()},
fB:{"^":"ae;",
gaE:function(){return H.p([A.uP()],[{func:1,ret:Q.z,args:[R.A]}])},
gbN:function(){return[$.$get$dW()]},
gh:function(){return"OffBalanceOpportunitySituation"},
ax:function(){var z=new U.dR(null,null,null,null,null)
z.m(this)
new U.mI().$1(z)
return z.p()},
aY:function(a,b){var z,y,x,w,v
if(typeof a!=="number")return a.bi()
if(a>0)return
z=b.U(this.a)
y=b.a
x=H.l(y,0)
w=P.P(new H.K(y,new U.mJ(this,b,z),[x]),!0,x)
if(w.length===0)return
v=C.a.geH(w)
if(v.ga4()&&z.gap()&&v.e.geN())return v
return},
b5:function(a,b){return new H.K(a,new U.mK(b,b.U(this.a)),[H.l(a,0)])}},
tH:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a8().aq(1073741823)
a.gbc().d=z
a.gbc().e=0
z=this.a.gi()
a.gbc().b=z
z=this.b
z=z==null?z:z.gi()
a.gbc().c=z
return a}},
mI:{"^":"a:0;",
$1:function(a){var z=a.gbc().e
if(typeof z!=="number")return z.ai()
a.gbc().e=z+1
return a}},
mJ:{"^":"a:23;a,b,c",
$1:function(a){var z,y
if(a.gaG())if(a.eJ(this.c,this.b)){z=a.y
y=this.a.b
y=z==null?y!=null:z!==y
z=y}else z=!1
else z=!1
return z}},
mK:{"^":"a:0;a,b",
$1:function(a){var z=this.b
return J.e(a,z)||a.eJ(z,this.a)}},
q2:{"^":"fB;a,b,i:c<,V:d<",
a1:function(a){var z=new U.dR(null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
A:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof U.fB))return!1
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
dR:{"^":"d;a,b,c,d,e",
gi:function(){return this.gbc().d},
gV:function(){return this.gbc().e},
gbc:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
m:function(a){this.a=a},
p:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gbc().b
x=this.gbc().c
w=this.gbc().d
v=this.gbc().e
z=new U.q2(y,x,w,v)
if(y==null)H.i(P.m("actorId"))
if(w==null)H.i(P.m("id"))
if(v==null)H.i(P.m("time"))}this.m(z)
return z}}}],["","",,O,{"^":"",lw:{"^":"z;I:c<,J:d<,a0:e<,O:f<,b,a",
ga6:function(){return""},
gh:function(){return"FinishPunch"},
gK:function(){return},
gaf:function(){return"(WARNING should not be user-visible)"},
P:[function(a,b,c){throw H.c(new P.Y(null))},"$3","gL",6,0,1],
R:[function(a,b,c){var z,y,x,w
z=this.b
y=z.ga4()?C.h:C.f
x=b.ar("PunchSituation").gi()
w=U.bB(b)
b.Y(z.y,new O.lx(y))
switch(y){case C.k:throw H.c(new P.w("Enemy's pose should never be 'standing' after a successful punch"))
case C.h:c.fO(0,"<subject> {punch<es> <object> in the {face|nose|eye|jaw}|punch<es> <object's> {face|nose|eye|jaw}}",x,z,!0,a)
z.aB(c,"<subject> {stagger<s>|stumble<s>} off balance",!0)
break
case C.f:c.fO(0,"<subject> send<s> <object> to the "+H.b(w)+" with a {massive punch|well-placed fist} to the {face|nose|eye|jaw}",x,z,!0,a)
break}return H.b(a.gh())+" punches "+H.b(z.db)+" to "+y.k(0)},"$3","gM",6,0,1],
H:function(a,b){return 1},
G:function(a,b){return!0},
v:{
wV:[function(a){return new O.lw(null,!0,!0,!1,a,null)},"$1","ud",2,0,4]}},lx:{"^":"a:0;a",
$1:function(a){a.sah(this.a)
return a}}}],["","",,E,{"^":"",kD:{"^":"z;I:c<,J:d<,a0:e<,O:f<,K:r<,b,a",
ga6:function(){return"dodge"},
gh:function(){return"DodgePunch"},
gaf:function(){return"will <subject> dodge the fist?"},
P:[function(a,b,c){var z=b.ar("PunchSituation").gi()
a.hs(c,"<subject> tr<ies> to {dodge|sidestep|move out of the way}",z,!0)
S.a6(new E.kE(a,c,z),new E.kF(this,a,c,z),null,null)
b.aA()
return H.b(a.gh())+" fails to dodge "+H.b(this.b.gh())},"$3","gL",6,0,1],
R:[function(a,b,c){var z=this.b
a.bR(c,"<subject> {dodge<s>|sidestep<s>} <object's> {punch|blow|jab}",b.ar("PunchSituation").gi(),z,!0)
b.b3("FightSituation")
if(a.gN()===!0)c.q(0,"this opens an opportunity for a counter attack")
C.a.q(b.f,S.c5(a,z))
return H.b(a.gh())+" dodges punch from "+H.b(z.gh())},"$3","gM",6,0,1],
H:function(a,b){var z,y
z=a.ga4()?0:0.2
if(a.ch===!0)return 0.7-z
y=b.f
return(y.length!==0?C.a.gw(y):null).gb4().b2(0.4-z)},
G:function(a,b){return!0},
v:{
wP:[function(a){return new E.kD("Dodging means moving your body out of harm's way.",!1,!1,!0,C.c,a,null)},"$1","u5",2,0,4]}},kE:{"^":"a:2;a,b,c",
$0:function(){return this.a.c3(this.b,"<subject> {can't|fail<s>|<does>n't succeed}",this.c,!0,!0)}},kF:{"^":"a:2;a,b,c,d",
$0:function(){return this.a.b.kU(this.c,"<subject> <is> too quick for <object>",this.d,!0,!0,this.b)}}}],["","",,Z,{"^":"",
e1:function(a,b,c){var z=new Z.e0(null,null,null,null,null,null)
new Z.tB(a,b,c).$1(z)
return z.p()},
fL:{"^":"c7;",
gaE:function(){return[E.u5()]},
gh:function(){return"PunchDefenseSituation"},
ax:function(){var z=new Z.e0(null,null,null,null,null,null)
z.m(this)
new Z.nr().$1(z)
return z.p()}},
tB:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$a8().aq(1073741823)
a.gaO().c=z
a.gaO().f=0
z=this.a.gi()
a.gaO().b=z
z=this.b.gi()
a.gaO().e=z
a.gaO().d=this.c
return a}},
nr:{"^":"a:0;",
$1:function(a){var z=a.gaO().f
if(typeof z!=="number")return z.ai()
a.gaO().f=z+1
return a}},
q5:{"^":"fL;cN:a<,i:b<,cq:c<,ct:d<,V:e<",
a1:function(a){var z=new Z.e0(null,null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
A:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof Z.fL))return!1
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
e0:{"^":"d;a,b,c,d,e,f",
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
p:function(){var z,y,x,w,v,u
z=this.a
if(z==null){y=this.gaO().b
x=this.gaO().c
w=this.gaO().d
v=this.gaO().e
u=this.gaO().f
z=new Z.q5(y,x,w,v,u)
if(y==null)H.i(P.m("attacker"))
if(x==null)H.i(P.m("id"))
if(w==null)H.i(P.m("predeterminedResult"))
if(v==null)H.i(P.m("target"))
if(u==null)H.i(P.m("time"))}this.m(z)
return z}}}],["","",,Q,{"^":"",
fN:function(a,b){var z=new Q.e2(null,null,null,null,null)
new Q.tC(a,b).$1(z)
return z.p()},
fM:{"^":"ae;",
gaE:function(){return[O.ud()]},
gh:function(){return"PunchSituation"},
ax:function(){var z=new Q.e2(null,null,null,null,null)
z.m(this)
new Q.ns().$1(z)
return z.p()},
aY:function(a,b){if(a===0)return b.U(this.a)
return},
b5:function(a,b){return new H.K(a,new Q.nt(this),[H.l(a,0)])}},
tC:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a8().aq(1073741823)
a.gbd().c=z
a.gbd().e=0
z=this.a.gi()
a.gbd().b=z
z=this.b.gi()
a.gbd().d=z
return a}},
ns:{"^":"a:0;",
$1:function(a){var z=a.gbd().e
if(typeof z!=="number")return z.ai()
a.gbd().e=z+1
return a}},
nt:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.e(a.gi(),z.a)||J.e(a.gi(),z.c)}},
q6:{"^":"fM;a,i:b<,c,V:d<",
a1:function(a){var z=new Q.e2(null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
A:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof Q.fM))return!1
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
e2:{"^":"d;a,b,c,d,e",
gi:function(){return this.gbd().c},
gV:function(){return this.gbd().e},
gbd:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
m:function(a){this.a=a},
p:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gbd().b
x=this.gbd().c
w=this.gbd().d
v=this.gbd().e
z=new Q.q6(y,x,w,v)
if(y==null)H.i(P.m("attacker"))
if(x==null)H.i(P.m("id"))
if(w==null)H.i(P.m("target"))
if(v==null)H.i(P.m("time"))}this.m(z)
return z}}}],["","",,O,{"^":"",ly:{"^":"z;I:c<,J:d<,a0:e<,O:f<,K:r<,b,a",
gh:function(){return"FinishSlash"},
ga6:function(){return""},
gaf:function(){return"(WARNING should not be user-visible)"},
P:[function(a,b,c){throw H.c(new P.Y(null))},"$3","gL",6,0,1],
R:[function(a,b,c){var z,y,x,w,v
z=this.b
b.Y(z.gi(),new O.lB(a))
y=b.U(z.gi())
x=b.ar("SlashSituation").gi()
w=!y.gaF()&&y.gi()!==100
if(!w){a.bR(c,"<subject> {slash<es>|cut<s>} <object's> {shoulder|abdomen|thigh}",x,y,!0)
N.b4(c,y)}else{a.bR(c,"<subject> {slash<es>|cut<s>} {across|through} <object's> {neck|abdomen|lower body}",x,y,!0)
N.bj(c,b,y)}v=H.b(a.gh())+" slashes"
return v+(w?" (and kills)":"")+" "+H.b(z.gh())},"$3","gM",6,0,1],
H:function(a,b){return 1},
G:function(a,b){return a.gT().gaU()},
v:{
wX:[function(a){return new O.ly(null,!0,!0,!0,C.c,a,null)},"$1","ue",2,0,4]}},lB:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gag()
y=this.a.gT().gbI()
if(typeof z!=="number")return z.as()
a.sag(z-y)
return a}}}],["","",,V,{"^":"",lC:{"^":"z;I:c<,J:d<,a0:e<,O:f<,K:r<,b,a",
ga6:function(){return""},
gh:function(){return"FinishThrustSpear"},
gaf:function(){return"(WARNING should not be user-visible)"},
P:[function(a,b,c){throw H.c(new P.Y(null))},"$3","gL",6,0,1],
R:[function(a,b,c){var z,y,x,w,v
z=this.b
b.Y(z.gi(),new V.lF(a))
y=b.U(z.gi())
x=b.ar("SlashSituation").gi()
w=!y.gaF()&&y.gi()!==100
if(!w){a.bR(c,"<subject> {pierce<s>|stab<s>|bore<s> through} <object's> {shoulder|abdomen|thigh}",x,y,!0)
N.b4(c,y)}else{a.bR(c,"<subject> {pierce<s>|stab<s>|bore<s> through|impale<s>} <object's> {neck|chest|heart}",x,y,!0)
N.bj(c,b,y)}v=H.b(a.gh())+" pierces"
return v+(w?" (and kills)":"")+" "+H.b(z.gh())},"$3","gM",6,0,1],
H:function(a,b){return 1},
G:function(a,b){return a.gT() instanceof Z.ak},
v:{
wZ:[function(a){return new V.lC(null,!0,!0,!0,C.c,a,null)},"$1","ug",2,0,4]}},lF:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gag()
y=this.a.gT().gbz()
if(typeof z!=="number")return z.as()
a.sag(z-y)
return a}}}],["","",,X,{"^":"",ko:{"^":"z;I:c<,J:d<,a0:e<,O:f<,K:r<,b,a",
ga6:function(){return"step back and parry"},
gh:function(){return"DefensiveParrySlash"},
gaf:function(){return"will <subject> parry it?"},
P:[function(a,b,c){a.ae(c,"<subject> tr<ies> to {parry|deflect it|meet it with "+H.b(U.a9(a))+"|fend it off}")
if(a.gap())a.al(c,"<subject> <is> out of balance",!0)
else S.a6(new X.kp(a,c),new X.kq(this,a,c),null,null)
b.aA()
return H.b(a.db)+" fails to parry "+H.b(this.b.gh())},"$3","gL",6,0,1],
R:[function(a,b,c){if(a.gN()===!0)a.ae(c,"<subject> {step<s>|take<s> a step} back")
a.bn(c,"<subject> {parr<ies> it|deflect<s> it|meet<s> it with "+H.b(U.a9(a))+"|fend<s> it off}",!0)
if(!a.ga4()){b.Y(a.y,new X.kr())
if(a.ch===!0)a.ae(c,"<subject> regain<s> balance")}b.b3("FightSituation")
return H.b(a.db)+" steps back and parries "+H.b(this.b.gh())},"$3","gM",6,0,1],
H:function(a,b){var z,y,x
if(a.gN()===!0)return 1
z=b.f
y=z.length!==0?C.a.gw(z):null
x=a.ga4()?0:0.2
return y.gb4().b2(0.5-x)},
G:function(a,b){return a.gT().gci()},
v:{
wM:[function(a){return new X.ko("Stepping back is the safest way to get out of harm's way.",!1,!1,!0,C.c,a,null)},"$1","u2",2,0,4]}},kp:{"^":"a:2;a,b",
$0:function(){return this.a.al(this.b,"<subject> {fail<s>|<does>n't succeed}",!0)}},kq:{"^":"a:2;a,b,c",
$0:function(){return this.a.b.bQ(this.c,"<subject> <is> too quick for <object>",!0,this.b)}},kr:{"^":"a:0;",
$1:function(a){a.sah(C.k)
return a}}}],["","",,F,{"^":"",kG:{"^":"z;I:c<,J:d<,a0:e<,O:f<,K:r<,b,a",
gh:function(){return"DodgeSlash"},
ga6:function(){return"dodge and counter"},
gaf:function(){return"will <subject> dodge?"},
P:[function(a,b,c){a.ae(c,"<subject> tr<ies> to {dodge|sidestep}")
if(a.gap())a.al(c,"<subject> <is> out of balance",!0)
else S.a6(new F.kH(a,c),new F.kI(this,a,c),null,null)
b.aA()
return H.b(a.db)+" fails to dodge "+H.b(this.b.gh())},"$3","gL",6,0,1],
R:[function(a,b,c){var z=this.b
a.bo(c,"<subject> {dodge<s>|sidestep<s>} it",z,!0)
if(z.ga4()){z.c2(c,"<subject> lose<s> balance because of that",!0,!0)
b.Y(z.y,new F.kJ())}b.b3("FightSituation")
if(a.gN()===!0)c.q(0,"this opens an opportunity for a counter attack")
C.a.q(b.f,S.c5(a,z))
return H.b(a.gh())+" dodges "+H.b(z.db)},"$3","gM",6,0,1],
H:function(a,b){var z,y
z=a.ga4()?0:0.2
if(a.ch===!0)return 0.7-z
y=b.f
return(y.length!==0?C.a.gw(y):null).gb4().b2(0.4-z)},
G:function(a,b){return!a.ga2()&&this.b.gT().gaU()},
v:{
wQ:[function(a){return new F.kG("Dodging means moving your body out of harm's way. When done correctly, it will throw your opponent off balance and it will open an opportunity for a counter attack. When botched, it can get you killed.",!1,!1,!0,C.c,a,null)},"$1","u6",2,0,4]}},kH:{"^":"a:2;a,b",
$0:function(){return this.a.al(this.b,"<subject> {can't|fail<s>|<does>n't succeed}",!0)}},kI:{"^":"a:2;a,b,c",
$0:function(){return this.a.b.bQ(this.c,"<subject> <is> too quick for <object>",!0,this.b)}},kJ:{"^":"a:0;",
$1:function(a){a.sah(C.h)
return C.h}}}],["","",,M,{"^":"",kK:{"^":"z;I:c<,J:d<,a0:e<,O:f<,K:r<,b,a",
ga6:function(){return"dodge and counter"},
gh:function(){return"DodgeThrustSpear"},
gaf:function(){return"will <subject> dodge?"},
P:[function(a,b,c){a.ae(c,"<subject> tr<ies> to {dodge|sidestep}")
if(a.gap())a.al(c,"<subject> <is> out of balance",!0)
else S.a6(new M.kL(a,c),new M.kM(this,a,c),null,null)
b.aA()
return H.b(a.db)+" fails to dodge "+H.b(this.b.gh())+"'s spear"},"$3","gL",6,0,1],
R:[function(a,b,c){var z=this.b
a.bo(c,"<subject> {dodge<s>|sidestep<s>} it",z,!0)
if(z.ga4()){z.c2(c,"<subject> lose<s> balance because of that",!0,!0)
b.Y(z.y,new M.kN())}b.b3("FightSituation")
if(a.gN()===!0)c.q(0,"this opens an opportunity for a counter attack")
C.a.q(b.f,S.c5(a,z))
return H.b(a.gh())+" dodges "+H.b(z.db)+"'s spear"},"$3","gM",6,0,1],
H:function(a,b){var z,y
z=a.ga4()?0:0.2
if(a.ch===!0)return 0.7-z
y=b.f
return(y.length!==0?C.a.gw(y):null).gb4().b2(0.4-z)},
G:function(a,b){return!a.ga2()&&this.b.gT() instanceof Z.ak},
v:{
wR:[function(a){return new M.kK("Dodging means moving your body out of harm's way. When done correctly, it will throw your opponent off balance and it will open an opportunity for a counter attack. When botched, it can get you killed.",!1,!1,!0,C.c,a,null)},"$1","u7",2,0,4]}},kL:{"^":"a:2;a,b",
$0:function(){return this.a.al(this.b,"<subject> {can't|fail<s>|<does>n't succeed}",!0)}},kM:{"^":"a:2;a,b,c",
$0:function(){return this.a.b.bQ(this.c,"<subject> <is> too quick for <object>",!0,this.b)}},kN:{"^":"a:0;",
$1:function(a){a.sah(C.h)
return C.h}}}],["","",,O,{"^":"",mb:{"^":"z;I:c<,J:d<,a0:e<,O:f<,K:r<,b,a",
ga6:function(){return"jump back"},
gh:function(){return"JumpBackFromSlash"},
gaf:function(){return"will <subject> avoid the slash?"},
P:[function(a,b,c){a.d0(c,"<subject> {jump<s>|leap<s>} {back|backward} but <subject> <is> {not fast enough|too slow}.",!0)
b.aA()
return H.b(a.gh())+" fails to jump back from "+H.b(this.b.gh())},"$3","gL",6,0,1],
R:[function(a,b,c){var z
a.bn(c,"<subject> {leap<s>|jump<s>} {back|backwards|out of reach}",!0)
z=this.b
c.cg(0,"<owner's> <subject> {slash<es>|cut<s>} empty air",z,z.gT())
b.b3("FightSituation")
return H.b(a.gh())+" jumps back from "+H.b(z.gh())+"'s attack"},"$3","gM",6,0,1],
H:function(a,b){var z,y,x
if(a.gN()===!0)return 1
z=b.f
y=z.length!==0?C.a.gw(z):null
x=a.ga4()?0:0.2
return y.gb4().b2(0.5-x)},
G:function(a,b){return a.gaH()&&this.b.gT().gaU()},
v:{
x2:[function(a){return new O.mb("Jump back and the weapon can't reach you.",!1,!1,!0,C.c,a,null)},"$1","uJ",2,0,4]}}}],["","",,G,{"^":"",mY:{"^":"z;I:c<,J:d<,a0:e<,O:f<,K:r<,b,a",
gh:function(){return"ParrySlash"},
ga6:function(){return"parry and counter"},
gaf:function(){return"will <subject> parry?"},
P:[function(a,b,c){a.ae(c,"<subject> tr<ies> to {parry|deflect it|meet it with "+H.b(U.a9(a))+"|fend it off}")
if(a.gap())a.al(c,"<subject> <is> out of balance",!0)
else S.a6(new G.mZ(a,c),new G.n_(this,a,c),null,null)
b.aA()
return H.b(a.db)+" fails to parry "+H.b(this.b.gh())},"$3","gL",6,0,1],
R:[function(a,b,c){var z=this.b
if(z.gap()){c.ex(0,"<subject> <is> out of balance",!0,!0,z)
c.cg(0,"so <ownerPronoun's> <subject> is {weak|feeble}",z,$.$get$iL())
a.bn(c,"<subject> {parr<ies> it easily|easily meet<s> it with "+H.b(U.a9(a))+"|fend<s> it off easily}",!0)}else a.bn(c,"<subject> {parr<ies> it|meet<s> it with "+H.b(U.a9(a))+"|fend<s> it off}",!0)
b.b3("FightSituation")
if(a.gN()===!0)c.q(0,"this opens an opportunity for a counter attack")
C.a.q(b.f,S.c5(a,z))
return H.b(a.gh())+" parries "+H.b(z.db)},"$3","gM",6,0,1],
H:function(a,b){var z,y,x
z=a.ga4()?0:0.2
y=this.b.gap()?0.3:0
if(a.ch===!0)return 0.6-z+y
x=b.f
return(x.length!==0?C.a.gw(x):null).gb4().b2(0.3-z+y)},
G:function(a,b){return a.gT().gci()},
v:{
x7:[function(a){return new G.mY("Parrying means deflecting your opponent's move with your weapon. When successful, it will give you an opportunity for a counter attack. It won't throw your opponent off balance like dodging does, but it's also slightly easier to do.",!1,!1,!0,C.c,a,null)},"$1","uS",2,0,4]}},mZ:{"^":"a:2;a,b",
$0:function(){return this.a.al(this.b,"<subject> {fail<s>|<does>n't succeed}",!0)}},n_:{"^":"a:2;a,b,c",
$0:function(){return this.a.b.bQ(this.c,"<subject> <is> too quick for <object>",!0,this.b)}}}],["","",,E,{"^":"",ok:{"^":"z;I:c<,J:d<,a0:e<,O:f<,K:r<,b,a",
ga6:function(){return"block with shield and counter"},
gh:function(){return"ShieldBlockSlash"},
gaf:function(){return"will <subject> block the slash?"},
P:[function(a,b,c){a.ae(c,"<subject> tr<ies> to {block|stop|deflect} the {swing|attack|strike} with "+H.b(U.c0(a)))
if(a.gap())a.al(c,"<subject> <is> out of balance",!0)
else S.a6(new E.ol(a,c),new E.om(a,c),new E.on(this,a,c),null)
b.aA()
return H.b(a.db)+" fails to block "+H.b(this.b.gh())+" with shield"},"$3","gL",6,0,1],
R:[function(a,b,c){var z=this.b
if(z.gap()){c.ex(0,"<subject> <is> out of balance",!0,!0,z)
c.cg(0,"so <ownerPronoun's> <subject> is {weak|feeble}",z,$.$get$iK())
a.bn(c,"<subject> easily {block|stop|deflect} the {swing|attack|strike} with "+H.b(U.c0(a)),!0)}else a.bn(c,"<subject> {block|stop|deflect} the {swing|attack|strike} with "+H.b(U.c0(a)),!0)
b.b3("FightSituation")
if(a.gN()===!0)c.q(0,"this opens an opportunity for a counter attack")
C.a.q(b.f,S.c5(a,z))
return H.b(a.gh())+" blocks "+H.b(z.db)+" with a shield"},"$3","gM",6,0,1],
H:function(a,b){var z,y,x
z=a.ga4()?0:0.2
y=this.b.gap()?0.2:0
if(a.ch===!0)return 0.8-z+y
x=b.f
return(x.length!==0?C.a.gw(x):null).gb4().b2(0.5-z+y)},
G:function(a,b){return a.gan()!=null},
v:{
xe:[function(a){return new E.ok("A shield blocks enemy attacks with the least amount of energy and movement. It is easy and quick to launch a counter-attack when the enemy's weapon is stopped in this way.",!1,!1,!0,C.c,a,null)},"$1","v8",2,0,4]}},ol:{"^":"a:2;a,b",
$0:function(){return this.a.al(this.b,"<subject> {fail<s>|<does>n't succeed}",!0)}},om:{"^":"a:2;a,b",
$0:function(){return this.a.al(this.b,"<subject> <is> too slow",!0)}},on:{"^":"a:2;a,b,c",
$0:function(){return this.a.b.bQ(this.c,"<subject> <is> too quick for <object>",!0,this.b)}}}],["","",,L,{"^":"",
aQ:function(a,b,c){var z=new L.e7(null,null,null,null,null,null)
new L.tx(a,b,c).$1(z)
return z.p()},
fZ:{"^":"c7;",
gaE:function(){return[X.u2(),F.u6(),M.u7(),O.uJ(),G.uS(),E.v8()]},
gh:function(){return"SlashDefenseSituation"},
ax:function(){var z=new L.e7(null,null,null,null,null,null)
z.m(this)
new L.or().$1(z)
return z.p()}},
tx:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$a8().aq(1073741823)
a.gaP().c=z
a.gaP().f=0
z=this.a.gi()
a.gaP().b=z
z=this.b.gi()
a.gaP().e=z
a.gaP().d=this.c
return a}},
or:{"^":"a:0;",
$1:function(a){var z=a.gaP().f
if(typeof z!=="number")return z.ai()
a.gaP().f=z+1
return a}},
q8:{"^":"fZ;cN:a<,i:b<,cq:c<,ct:d<,V:e<",
a1:function(a){var z=new L.e7(null,null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
A:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof L.fZ))return!1
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
e7:{"^":"d;a,b,c,d,e,f",
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
p:function(){var z,y,x,w,v,u
z=this.a
if(z==null){y=this.gaP().b
x=this.gaP().c
w=this.gaP().d
v=this.gaP().e
u=this.gaP().f
z=new L.q8(y,x,w,v,u)
if(y==null)H.i(P.m("attacker"))
if(x==null)H.i(P.m("id"))
if(w==null)H.i(P.m("predeterminedResult"))
if(v==null)H.i(P.m("target"))
if(u==null)H.i(P.m("time"))}this.m(z)
return z}}}],["","",,M,{"^":"",
bc:function(a,b){var z=new M.e8(null,null,null,null,null)
new M.tA(a,b).$1(z)
return z.p()},
h_:{"^":"ae;",
gaE:function(){return[O.ue(),V.ug()]},
gh:function(){return"SlashSituation"},
ax:function(){var z=new M.e8(null,null,null,null,null)
z.m(this)
new M.os().$1(z)
return z.p()},
aY:function(a,b){if(a===0)return b.U(this.a)
return},
b5:function(a,b){return new H.K(a,new M.ot(this),[H.l(a,0)])}},
tA:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a8().aq(1073741823)
a.gbe().c=z
a.gbe().e=0
z=this.a.gi()
a.gbe().b=z
z=this.b.gi()
a.gbe().d=z
return a}},
os:{"^":"a:0;",
$1:function(a){var z=a.gbe().e
if(typeof z!=="number")return z.ai()
a.gbe().e=z+1
return a}},
ot:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.e(a.gi(),z.a)||J.e(a.gi(),z.c)}},
q9:{"^":"h_;a,i:b<,c,V:d<",
a1:function(a){var z=new M.e8(null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
A:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof M.h_))return!1
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
e8:{"^":"d;a,b,c,d,e",
gi:function(){return this.gbe().c},
gV:function(){return this.gbe().e},
gbe:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
m:function(a){this.a=a},
p:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gbe().b
x=this.gbe().c
w=this.gbe().d
v=this.gbe().e
z=new M.q9(y,x,w,v)
if(y==null)H.i(P.m("attacker"))
if(x==null)H.i(P.m("id"))
if(w==null)H.i(P.m("target"))
if(v==null)H.i(P.m("time"))}this.m(z)
return z}}}],["","",,Q,{"^":"",lz:{"^":"z;I:c<,J:d<,a0:e<,O:f<,K:r<,b,a",
gh:function(){return"FinishSlashGroundedEnemy"},
ga6:function(){return""},
gaf:function(){return"(WARNING should not be user-visible)"},
P:[function(a,b,c){throw H.c(new P.Y(null))},"$3","gL",6,0,1],
R:[function(a,b,c){var z,y,x
z=this.b
b.Y(z.gi(),new Q.lA())
y=b.U(z.gi())
x=J.e(y.gi(),100)
c.ew(0,"<subject> {cut<s>|slash<es>|slit<s>} <object's> "+(x?"side":"{throat|neck|side}"),y,a.gT())
if(x)N.b4(c,y)
else N.bj(c,b,y)
return H.b(a.gh())+" slains "+H.b(z.gh())+" on the ground"},"$3","gM",6,0,1],
H:function(a,b){return 1},
G:function(a,b){return this.b.ga2()&&a.gT().gaU()},
v:{
wW:[function(a){return new Q.lz(null,!0,!0,!0,C.c,a,null)},"$1","uf",2,0,4]}},lA:{"^":"a:0;",
$1:function(a){a.sag(0)
return a}}}],["","",,V,{"^":"",lD:{"^":"z;I:c<,J:d<,a0:e<,O:f<,K:r<,b,a",
ga6:function(){return""},
gh:function(){return"FinishThrustSpearAtGroundedEnemy"},
gaf:function(){return"(WARNING should not be user-visible)"},
P:[function(a,b,c){throw H.c(new P.Y(null))},"$3","gL",6,0,1],
R:[function(a,b,c){var z,y,x
z=this.b
b.Y(z.gi(),new V.lE())
y=b.U(z.gi())
x=J.e(y.gi(),100)
c.ew(0,"<subject> {impale<s>|bore<s> through|pierce<s>} <object's> "+(x?"side":"{throat|neck|heart}"),y,a.gT())
if(x)N.b4(c,y)
else N.bj(c,b,y)
return H.b(a.gh())+" slains "+H.b(z.gh())+" on the ground with a spear"},"$3","gM",6,0,1],
H:function(a,b){return 1},
G:function(a,b){return this.b.ga2()&&a.gT() instanceof Z.ak},
v:{
wY:[function(a){return new V.lD(null,!0,!0,!0,C.c,a,null)},"$1","uh",2,0,4]}},lE:{"^":"a:0;",
$1:function(a){a.sag(0)
return a}}}],["","",,K,{"^":"",mO:{"^":"z;J:c<,a0:d<,O:e<,K:f<,I:r<,b,a",
gh:function(){return"OnGroundParry"},
ga6:function(){return"parry it"},
gaf:function(){return"will <subject> parry it?"},
P:[function(a,b,c){a.ae(c,"<subject> tr<ies> to {parry|deflect it|stop it{| with "+H.b(U.a9(a))+"}}")
S.a6(new K.mP(a,c),new K.mQ(this,a,c),null,null)
b.aA()
return H.b(a.gh())+" fails to parry "+H.b(this.b.gh())},"$3","gL",6,0,1],
R:[function(a,b,c){a.bn(c,"<subject> {parr<ies> it|stop<s> it with "+H.b(U.a9(a))+"}",!0)
b.b3("FightSituation")
return H.b(a.gh())+" parries "+H.b(this.b.gh())},"$3","gM",6,0,1],
H:function(a,b){var z
if(a.gN()===!0)return 0.6
z=b.f
return(z.length!==0?C.a.gw(z):null).gb4().b2(0.3)},
G:function(a,b){return this.b.gT().gaU()&&a.gT().gci()},
v:{
x5:[function(a){return new K.mO(!1,!1,!0,C.c,"TODO",a,null)},"$1","uQ",2,0,4]}},mP:{"^":"a:2;a,b",
$0:function(){return this.a.al(this.b,"<subject> {fail<s>|<does>n't succeed}",!0)}},mQ:{"^":"a:2;a,b,c",
$0:function(){return this.a.b.bQ(this.c,"<subject> <is> too quick for <object>",!0,this.b)}}}],["","",,L,{"^":"",mR:{"^":"z;I:c<,J:d<,a0:e<,O:f<,K:r<,b,a",
ga6:function(){return"block with shield"},
gh:function(){return"OnGroundShieldBlock"},
gaf:function(){return"will <subject> block the strike?"},
P:[function(a,b,c){a.ae(c,"<subject> tr<ies> to {block|stop|deflect} the {swing|attack|strike} with "+H.b(U.c0(a)))
S.a6(new L.mS(a,c),new L.mT(a,c),new L.mU(this,a,c),null)
b.aA()
return H.b(a.gh())+" fails to block "+H.b(this.b.gh())+" with shield on ground"},"$3","gL",6,0,1],
R:[function(a,b,c){var z=this.b
if(z.gap()){c.ex(0,"<subject> <is> out of balance",!0,!0,z)
c.cg(0,"so <ownerPronoun's> <subject> is {weak|feeble}",z,$.$get$iJ())
a.bn(c,"<subject> easily {block|stop|deflect} the {swing|attack|strike} with "+H.b(U.c0(a)),!0)}else a.bn(c,"<subject> {block|stop|deflect} the {swing|attack|strike} with "+H.b(U.c0(a)),!0)
b.b3("FightSituation")
return H.b(a.gh())+" blocks "+H.b(z.db)+" with a shield on ground"},"$3","gM",6,0,1],
H:function(a,b){var z
if(a.gN()===!0)return 0.8
z=b.f
return(z.length!==0?C.a.gw(z):null).gb4().b2(0.5)},
G:function(a,b){return a.gan()!=null},
v:{
x6:[function(a){return new L.mR("A shield blocks enemy attacks with the least amount of energy and movement.",!1,!1,!0,C.c,a,null)},"$1","uR",2,0,4]}},mS:{"^":"a:2;a,b",
$0:function(){return this.a.al(this.b,"<subject> {fail<s>|<does>n't succeed}",!0)}},mT:{"^":"a:2;a,b",
$0:function(){return this.a.al(this.b,"<subject> <is> too slow",!0)}},mU:{"^":"a:2;a,b,c",
$0:function(){return this.a.b.bQ(this.c,"<subject> <is> too quick for <object>",!0,this.b)}}}],["","",,Y,{"^":"",nF:{"^":"z;I:c<,J:d<,a0:e<,O:f<,K:r<,b,a",
gh:function(){return"RollOutOfWay"},
ga6:function(){return"roll out of way"},
gaf:function(){return"will <subject> evade?"},
P:[function(a,b,c){a.ae(c,"<subject> tr<ies> to roll out of the way")
a.al(c,"<subject> can't",!0)
b.aA()
return H.b(a.gh())+" fails to roll out of the way"},"$3","gL",6,0,1],
R:[function(a,b,c){a.eU(c,"<subject> <is> able to roll out of the way",!0,!0)
if(a.gN()===!0){b.Y(a.gi(),new Y.nG())
a.bn(c,"<subject> jump<s> up on <subject's> feet",!0)}b.b3("FightSituation")
return H.b(a.gh())+" rolls out of the way of "+H.b(this.b.gh())+"'s strike"},"$3","gM",6,0,1],
H:function(a,b){var z
if(a.gN()===!0)return 1
z=b.f
return(z.length!==0?C.a.gw(z):null).gb4().b2(0.5)},
G:function(a,b){return!0},
v:{
xd:[function(a){return new Y.nF(null,!1,!1,!0,C.c,a,null)},"$1","v2",2,0,4]}},nG:{"^":"a:0;",
$1:function(a){a.sah(C.k)
return a}}}],["","",,V,{"^":"",
bJ:function(a,b,c){var z=new V.dS(null,null,null,null,null,null)
new V.tv(a,b,c).$1(z)
return z.p()},
fC:{"^":"c7;",
gaE:function(){return[K.uQ(),L.uR(),Y.v2()]},
gh:function(){return"OnGroundDefenseSituation"},
ax:function(){var z=new V.dS(null,null,null,null,null,null)
z.m(this)
new V.mN().$1(z)
return z.p()}},
tv:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$a8().aq(1073741823)
a.gaN().c=z
a.gaN().f=0
z=this.a.gi()
a.gaN().b=z
z=this.b.gi()
a.gaN().e=z
a.gaN().d=this.c
return a}},
mN:{"^":"a:0;",
$1:function(a){var z=a.gaN().f
if(typeof z!=="number")return z.ai()
a.gaN().f=z+1
return a}},
q3:{"^":"fC;cN:a<,i:b<,cq:c<,ct:d<,V:e<",
a1:function(a){var z=new V.dS(null,null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
A:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof V.fC))return!1
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
dS:{"^":"d;a,b,c,d,e,f",
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
p:function(){var z,y,x,w,v,u
z=this.a
if(z==null){y=this.gaN().b
x=this.gaN().c
w=this.gaN().d
v=this.gaN().e
u=this.gaN().f
z=new V.q3(y,x,w,v,u)
if(y==null)H.i(P.m("attacker"))
if(x==null)H.i(P.m("id"))
if(w==null)H.i(P.m("predeterminedResult"))
if(v==null)H.i(P.m("target"))
if(u==null)H.i(P.m("time"))}this.m(z)
return z}}}],["","",,D,{"^":"",
d5:function(a,b){var z=new D.e9(null,null,null,null,null)
new D.tw(a,b).$1(z)
return z.p()},
ha:{"^":"ae;",
gaE:function(){return[Q.uf(),V.uh()]},
gh:function(){return"StrikeDownSituation"},
ax:function(){var z=new D.e9(null,null,null,null,null)
z.m(this)
new D.pa().$1(z)
return z.p()},
aY:function(a,b){if(a===0)return b.U(this.a)
return},
b5:function(a,b){return new H.K(a,new D.pb(this),[H.l(a,0)])}},
tw:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a8().aq(1073741823)
a.gbf().c=z
a.gbf().e=0
z=this.a.gi()
a.gbf().b=z
z=this.b.gi()
a.gbf().d=z
return a}},
pa:{"^":"a:0;",
$1:function(a){var z=a.gbf().e
if(typeof z!=="number")return z.ai()
a.gbf().e=z+1
return a}},
pb:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.e(a.gi(),z.a)||J.e(a.gi(),z.c)}},
qa:{"^":"ha;a,i:b<,c,V:d<",
a1:function(a){var z=new D.e9(null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
A:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof D.ha))return!1
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
e9:{"^":"d;a,b,c,d,e",
gi:function(){return this.gbf().c},
gV:function(){return this.gbf().e},
gbf:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
m:function(a){this.a=a},
p:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gbf().b
x=this.gbf().c
w=this.gbf().d
v=this.gbf().e
z=new D.qa(y,x,w,v)
if(y==null)H.i(P.m("attacker"))
if(x==null)H.i(P.m("id"))
if(w==null)H.i(P.m("targetOnGround"))
if(v==null)H.i(P.m("time"))}this.m(z)
return z}}}],["","",,O,{"^":"",nh:{"^":"d;",
gb4:function(){switch(this.gcq()){case C.l:return C.a3
case C.m:return $.$get$fG()
case C.p:return $.$get$fH()
default:throw H.c(P.G(this.gcq()))}},
$isae:1}}],["","",,K,{"^":"",dZ:{"^":"d;a,b",
k:function(a){return this.b}}}],["","",,D,{"^":"",ow:{"^":"ag;J:b<,O:c<,a0:d<,K:e<,a",
gW:function(){return""},
gI:function(){return},
gh:function(){return"SlayMonstersAction"},
P:[function(a,b,c){throw H.c(new P.Y(null))},"$3","gL",6,0,1],
R:[function(a,b,c){var z,y,x,w
z=b.f
y=z.length!==0?C.a.gw(z):null
x=b.dV(y.gbE())
w=b.a
C.a.q(z,x.jU(b,y,new H.K(w,new D.ox(a,x),[H.l(w,0)])))
return H.b(a.gh())+" initiated combat with monsters in "+x.k(0)},"$3","gM",6,0,1],
a9:function(a,b){return"WARNING should not be user-visible"},
H:function(a,b){return 1},
G:function(a,b){var z=b.f
return H.F(z.length!==0?C.a.gw(z):null,"$isJ").c}},ox:{"^":"a:0;a,b",
$1:function(a){var z,y
if(a.gaG())if(a.gaW().hc(this.a.gaW())){z=a.gbE()
y=this.b.gh()
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1
return z}}}],["","",,Y,{"^":"",pl:{"^":"c9;J:c<,a0:d<,O:e<,K:f<,b,a",
gI:function(){return},
gh:function(){return"TakeExitAction"},
P:[function(a,b,c){throw H.c(new P.Y(null))},"$3","gL",6,0,1],
R:[function(a,b,c){var z,y
z=this.b
c.q(0,z.gaS())
y=b.f
H.F(y.length!==0?C.a.gw(y):null,"$isJ").dF(b,a,z.gfZ(),c)
return H.b(a.gh())+" went through exit to "+z.a},"$3","gM",6,0,1],
a9:function(a,b){return"WARNING should not be user-visible"},
H:function(a,b){return 1},
G:function(a,b){var z=b.f
if(H.F(z.length!==0?C.a.gw(z):null,"$isJ").c===!0)return!1
this.b.gkl()
return!0},
v:{
xi:[function(a){return new Y.pl(!1,!0,!1,null,a,null)},"$1","wA",2,0,50]}}}],["","",,F,{"^":"",
fR:function(a,b){var z=new F.e5(null,null,null,null,null)
new F.tk(a,b).$1(z)
return z.p()},
J:{"^":"ae;",
gaE:function(){return[Y.wA()]},
gbN:function(){var z=[]
C.a.aw(z,$.$get$i0())
z.push($.$get$h2())
return z},
gdE:function(){return 1000},
gh:function(){return"RoomRoamingSituation"},
ax:function(){var z=new F.e5(null,null,null,null,null)
z.m(this)
new F.nH().$1(z)
return z.p()},
aY:function(a,b){return b.a.aT(0,new F.nI(),new F.nJ())},
b5:function(a,b){var z=this.aY(null,b)
if(z==null)return[]
return[z]},
dF:function(a,b,c,d){var z,y,x,w,v,u,t
z=a.dV(c)
a.c1(this.b,F.fR(z,!a.hM("TakeExitAction",b,!0).bs(0,new F.nK(c))&&z.gjT()!=null))
if(this.im(a,b,z))z.hZ(b,a,d)
else{d.t(0,"\n\n",!0)
z.jI(b,a,d)
d.t(0,"\n\n",!0)}for(y=R.il(b,a),y=P.P(y,!0,H.y(y,"B",0)),x=y.length,w=a.a,v=0;v<y.length;y.length===x||(0,H.as)(y),++v){u=a.U(y[v].gi())
t=u.a1(new F.nL(z))
w.a3(0,u)
w.q(0,t)}},
hi:function(a,b){a.a.iG(new F.nM(),!0)},
de:function(a){if(J.e(this.a,$.$get$ew().b))return!1
return!0},
im:function(a,b,c){var z,y
for(z=a.d,z=new P.da(z,z.c,z.d,z.b,null,[H.l(z,0)]);z.u();){y=z.e
if(!J.e(y.gcr(),b.gi()))continue
if(y.gdu()!=="TakeExitAction")continue
if(J.eO(y.gaS(),c.gh())===!0)return!0}return!1}},
tk:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a8().aq(1073741823)
a.gaD().c=z
a.gaD().e=0
z=this.a.gh()
a.gaD().b=z
a.gaD().d=this.b
return a}},
nH:{"^":"a:0;",
$1:function(a){var z=a.gaD().e
if(typeof z!=="number")return z.ai()
a.gaD().e=z+1
return a}},
nI:{"^":"a:0;",
$1:function(a){return a.gN()===!0&&a.gaG()}},
nJ:{"^":"a:2;",
$0:function(){return}},
nK:{"^":"a:0;a",
$1:function(a){return a.geE()===this.a}},
nL:{"^":"a:0;a",
$1:function(a){a.sbE(this.a.b)
return a}},
nM:{"^":"a:0;",
$1:function(a){return!a.gaF()}},
q7:{"^":"J;bE:a<,i:b<,c,V:d<",
a1:function(a){var z=new F.e5(null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
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
e5:{"^":"d;a,b,c,d,e",
gbE:function(){return this.gaD().b},
sbE:function(a){this.gaD().b=a
return a},
gi:function(){return this.gaD().c},
skB:function(a){this.gaD().d=a
return a},
gV:function(){return this.gaD().e},
gaD:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
m:function(a){this.a=a},
p:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gaD().b
x=this.gaD().c
w=this.gaD().d
v=this.gaD().e
z=new F.q7(y,x,w,v)
if(y==null)H.i(P.m("currentRoomName"))
if(x==null)H.i(P.m("id"))
if(w==null)H.i(P.m("monstersAlive"))
if(v==null)H.i(P.m("time"))}this.m(z)
return z}}}],["","",,O,{"^":"",
xx:[function(a,b,c){var z,y
z=R.b6(6666,"Agruth",null,null,null,null,null,0,2,100,!1,2,!0,C.t,0,$.$get$bA())
y=z.y
a.gev().q(0,z)
return U.cb(c,[z],"{rock|cavern} floor",b,P.ad([1,new O.uj(y),5,new O.uk(y),9,new O.ul(y),12,new O.um(y),17,new O.un(y)]))},"$3","wF",6,0,11],
xy:[function(a,b,c){var z=[O.hS(),O.eq(!1)]
a.gev().aw(0,z)
return U.cb(c,z,"{rock|cavern} floor",b,P.aP())},"$3","wG",6,0,11],
xz:[function(a,b,c){var z,y,x
z=a.ao("talk_to_briana_3")?"guardian":"orc"
y=R.b6(6667,z,null,null,null,new G.aE("rusty sword",1,1,!1,!0,!1,P.aB(C.o,null)),null,0,3,100,!1,3,!1,C.t,0,$.$get$bA())
x=y.y
a.a.q(0,y)
return U.cb(c,[y],"{rock|cavern} floor",b,P.ad([1,new O.up(x),9,new O.uq(x)]))},"$3","wH",6,0,11],
xA:[function(a,b,c){var z,y,x
z=O.hS()
y=O.eq(!0)
x=[z,y]
a.gev().aw(0,x)
return U.cb(c,x,"{rough|stone} floor",b,P.ad([1,new O.us(new O.uu(z.y),new O.ut(y.y),new O.ur())]))},"$3","wI",6,0,11],
aK:function(a){return a.a.bB(0,new O.uw())},
uy:function(a){return a.Y(O.aK(a).gi(),new O.uz())},
ip:function(a,b){a.Y(O.aK(a).gi(),new O.uA(b))},
eB:function(a){var z=a.f
if(H.F(z.length!==0?C.a.gw(z):null,"$isJ").c===!0)return!1
return C.a.a7(C.a_,H.F(z.length!==0?C.a.gw(z):null,"$isJ").a)},
bi:function(a,b){var z,y,x
z=O.aK(a)
for(y=a.d,y=new P.da(y,y.c,y.d,y.b,null,[H.l(y,0)]);y.u();){x=y.e
if(!J.e(x.gcr(),z.gi()))continue
if(x.gdu()!=="TakeExitAction")continue
if(x.geE()===b)return!0
return!1}return!1},
iv:function(a,b){var z,y,x,w,v,u,t,s,r
for(z=a.a,y=z.ga_(z),x=new H.bT(y,new O.uM(),[H.l(z,0)]);x.u();){w=y.gS()
if(!w.gaH()){v=H.F(w.e,"$isaE")
y=b
x=v.c
u=v.d
v.r
t=P.P(C.o,!1,null)
t.fixed$length=Array
t.immutable$list=Array
s=a.U(w.y)
r=s.a1(new O.uN(new G.aE(y,x,u,!0,!0,!1,t)))
z.a3(0,s)
z.q(0,r)
break}}},
uZ:function(a){var z=O.aK(a).gaz().ck(0,new O.v_())
a.Y(O.aK(a).gi(),new O.v0(z))},
cA:function(a,b){var z,y,x
z=H.F(a.c,"$iscP").b
if(z>=5)return
b.t(0,C.a2[z],!0)
y=H.F(a.c,"$iscP")
y.toString
x=new M.ec(null,!1,0,0)
x.m(y)
a.c=new O.v1().$1(x).p()},
eD:function(a,b,c,d){var z,y
b.Y(a.gi(),new O.v6())
if(!d){z=b.a
y=O.eq(!1)
z.q(0,y)
C.a.q(b.f,U.cb(new H.K(z,new O.v7(),[H.l(z,0)]),[y],"{smooth|} rock",b.ar("RoomRoamingSituation"),C.E))}},
ww:function(a,b){a.Y(b.gi(),new O.wx(b))},
eq:function(a){var z,y
z=$.$get$et().a++
y=a?new Z.ak("spear",0,1,!1,!1,!1,P.aB(C.D,null)):new G.aE("scimitar",1,1,!1,!0,!1,P.aB(C.o,null))
return R.b6(z,"goblin",O.dj(),null,null,y,null,0,1,0,!1,1,!1,C.t,0,$.$get$bA())},
hS:function(){return R.b6($.$get$et().a++,"orc",O.dj(),null,null,new G.aE("sword",1,1,!1,!0,!1,P.aB(C.o,null)),null,0,2,0,!1,2,!1,C.t,0,$.$get$bA())},
uj:{"^":"a:6;a",
$2:function(a,b){var z,y,x
z=this.a
y=a.U(z)
x=new G.aE("sword",1,1,!1,!0,!1,P.aB(C.o,null))
y.ae(b,"<subject> {drop<s>|let<s> go of} the whip")
y.ab(b,"<subject> draw<s> <subject's> <object>",x)
a.Y(z,new O.ui(x))
y.eV(b,'"You\'re dead, slave," <subject> growl<s> at <object> with hatred.',O.aK(a),!0)}},
ui:{"^":"a:0;a",
$1:function(a){a.sT(this.a)
return a}},
uk:{"^":"a:6;a",
$2:function(a,b){a.U(this.a).ae(b,"<subject> spit<s> on the cavern floor")}},
ul:{"^":"a:6;a",
$2:function(a,b){var z=a.U(this.a)
b.fQ()
z.d0(b,'"I\'ll enjoy eating your flesh, human," <subject> snarl<s>.',!0)
b.t(0,"\n\n",!0)}},
um:{"^":"a:6;a",
$2:function(a,b){var z=a.U(this.a)
z.ae(b,"<subject> grit<s> <subject's> teeth")
z.al(b,"<subject> do<es>n't talk any more",!0)}},
un:{"^":"a:6;a",
$2:function(a,b){a.U(this.a).ae(b,"<subject> scowl<s> with pure hatred")}},
up:{"^":"a:6;a",
$2:function(a,b){a.U(this.a).eV(b,'"Good good good," <subject> whisper<s>, eyeing <object>.',O.aK(a),!0)}},
uq:{"^":"a:6;a",
$2:function(a,b){var z=a.U(this.a)
b.fQ()
z.d0(b,'"Pain is good," <subject> chuckle<s>.',!0)
b.t(0,"\n\n",!0)}},
uu:{"^":"a:24;a",
$1:function(a){return a.U(this.a)}},
ut:{"^":"a:24;a",
$1:function(a){return a.U(this.a)}},
ur:{"^":"a:31;",
$2:function(a,b){return a.gaG()&&b.gaF()&&b.gc0()===!0}},
us:{"^":"a:6;a,b,c",
$2:function(a,b){var z,y
z=this.a.$1(a)
y=this.b.$1(a)
if(!y.gaF()){z.ab(b,"<subject> look<s> at <object's> body",y)
z.d0(b,'"You\'ll pay for this, vermin," <subject> snarl<s>.',!0)
return}if(this.c.$2(z,y)===!0){z.ab(b,"<subject> look<s> at <object>",y)
z.eV(b,'"Now that is practice," <subject> say<s> to <objectPronoun>.',y,!0)}}},
uw:{"^":"a:0;",
$1:function(a){return a.gN()}},
uz:{"^":"a:0;",
$1:function(a){a.gaz().q(0,new Z.ak("spear",0,1,!1,!1,!1,P.aB(C.D,null)))
return a}},
uA:{"^":"a:0;a",
$1:function(a){var z=a.gb7()
if(typeof z!=="number")return z.ai()
a.sb7(z+this.a)
return a}},
uM:{"^":"a:0;",
$1:function(a){return J.e(a.gaW(),$.$get$dl())}},
uN:{"^":"a:0;a",
$1:function(a){a.sT(this.a)
return a}},
v_:{"^":"a:0;",
$1:function(a){return C.a.a7(a.gf0(),C.r)}},
v0:{"^":"a:0;a",
$1:function(a){a.gaz().a3(0,this.a)
return a}},
v1:{"^":"a:0;",
$1:function(a){var z
a.gcw()
z=a.c
a.gcw()
a.c=z+1
return a}},
v6:{"^":"a:0;",
$1:function(a){a.san(new E.br("shield",P.aB(C.a1,null)))
return a}},
v7:{"^":"a:0;",
$1:function(a){return J.e(a.gaW(),$.$get$dl())}},
wx:{"^":"a:0;a",
$1:function(a){var z=this.a
if(!z.gaH())a.gaz().q(0,z.e)
a.sT($.$get$iw())}}}],["","",,V,{"^":"",
lH:function(){var z=new V.dA(null,null,null)
new V.tI().$1(z)
return z.p()},
ti:{"^":"a:5;",
$3:function(a,b,c){c.t(0,"",!0)}},
tj:{"^":"a:5;",
$3:function(a,b,c){c.t(0,"",!0)}},
tg:{"^":"a:5;",
$3:function(a,b,c){c.t(0,"The tunnel back to the main slave quarters is suicide. There will be too many orcs, and the Gate of Screams is a long way beyond. That leaves two options. The black passage towards the war forges, and the deserted tunnel to the Unholy Church, an underground temple. Both paths should lead you towards the Upper Door, a small exit at the side of Mount Bloodrock.\n",!0)}},
th:{"^":"a:5;",
$3:function(a,b,c){c.t(0,"The corpse lies still, getting cold.\n\n\n",!0)
O.cA(b,c)
c.t(0,"",!0)}},
oh:{"^":"W;W:c<,h:d<,b,a",
G:function(a,b){var z=b.f
if(!J.e(H.F(z.length!==0?C.a.gw(z):null,"$isJ").a,"cave_with_agruth"))return!1
if(b.ao(this.d))return!1
return!0},
R:[function(a,b,c){c.t(0,"You search his pockets but turn up with nothing. Just then, you realize that if Agruth had something valuable on him, he would have hidden it well. You run your hand inside his vest and find a troma herb. This boosts your energy right when you need it--very handy. (Your stamina increases by 1.)\n",!0)
O.ip(b,1)
return H.b(a.gh())+" successfully performs SearchAgruth"},"$3","gM",6,0,1],
P:[function(a,b,c){throw H.c(new P.w("Success chance is 100%"))},"$3","gL",6,0,1],
H:function(a,b){return 1},
gO:function(){return!1},
a9:function(a,b){return"Will you be successful?"},
gK:function(){return},
gI:function(){return"You have taken his weapon but there might be other useful items in his pocket."},
gJ:function(){return!1}},
te:{"^":"a:5;",
$3:function(a,b,c){c.t(0,'There is light at the end of the tunnel, Briana points ahead. You approach it with suspicion, but soon there is no question about it. The fresh air, the howling of the wind, the brightness of the light. After three years, you step out of the mountain you thought would be your grave. \n\n\nYou have to close your eyes to keep the blinding sun out. You let the wind chill your muscles. \n\n\nThen you open your eyes and see the valley and beyond. The black smoke of orc camps and razed villages. The burned forests. The cracks in the wall of the distant fort ironcast, just visible over the TODO hill. No birds, only those horrible dark eagles, with no head, and eight eyes where the neck on a normal \n\n\n_"We must stop this."_\n\n\nBriana: "This is much larger than us, Aren. If the dead prince is back, that\'s a problem for kings, not peasants."\n\n\n"That may be so. But no kings have what I have."\n\n\n"Orcthorn? Bah, you think they\'ll let you have it? A farm boy? / Muscles and a bit of brains? Don\'t be a fool, you\'re still a farm boy."\n\n\n"I\'m not a farm boy. And I don\'t mean Orcthorn / my own smarts. No, I have a connection. We both do."\n\n\n\n\n"A connection."\n\n\n"With the dead prince. I dream his dreams. I think I have some of his power. I think he is more than people think. A lot more. I think you feel it, too, but you have not been in the mountain for as long as I have. Most slaves are lucky to survive the first month. I survived three years."\n\n\n"So the thing you have that kings don\'t is\u2026 a way to communicate? You want to negotiate?"\n\n\n"I do not have anything the Dead Prince wants. No, I do not think any man, king or peasant, has it. But I think I am starting to understand what that is, and how the Dead Prince wants to seize it."\n\n\n"And you plan is?"\n\n\n(IMG long view of the road ahead) \n\n\n"Not letting him have it. Giving him the exact opposite of what he wants."\n\n\n"You know we could just run as fast as we can, kicking some orcs in their faces along the way, right?"\n\n\n"yes" \n\n\n"that others would do exactly that."\n\n\n"But we will not." \n\n\n"Yeah. We will not."\n\n\nWith that, you start down the road towards the black fort in the distance.\n',!0)}},
tf:{"^":"a:5;",
$3:function(a,b,c){c.t(0,"",!0)}},
tb:{"^":"a:5;",
$3:function(a,b,c){c.t(0,"The crevice is small.\n",!0)}},
tc:{"^":"a:5;",
$3:function(a,b,c){c.t(0,"",!0)}},
t9:{"^":"a:5;",
$3:function(a,b,c){c.t(0,"You enter a small, circular room. There are exits on three sides, all marked with crude writing.\n\n\n",!0)
if(O.bi(b,"smelter"))c.t(0,'The passage you came from is marked with the words "Hot iron", which must mean "smelter" in the orcs\' vocabulary. Another one has the words "Unholy Church" above it. Both of these slope downwards.',!0)
c.t(0,"\n",!0)
if(O.bi(b,"underground_church"))c.t(0,'The passage you came from is marked with the words "Unholy Church". Another one has the words "Hot iron" above it, which must mean "smelter" in the orcs\' vocabulary. Both of these slope downwards.',!0)
c.t(0,"\nA third passage is marked \"Up Door\", and a few paces beyond the opening, it turns into a steep stairway upwards. This is it, if you're ready for it. Your final path to escape, an end of those three horrible years.\n\n\nLeaning on the wall next to the third exit is a goblin guard. He's sleeping. He holds a sword in one hand, and there's a shield laid on his lap.\n\n\n",!0)
if(!b.ao("smelter_throw_spear")&&!b.ao("take_orcthorn"))c.t(0,'For the first time, you see a smile on Briana\'s face. Not a smirk or an angry taunt of a laugh, but a genuine smile. "_Up Door?_" she whispers, shaking hear head. "I can\'t believe we have made it this far. Although \u2014 I\'ll admit \u2014 it feels like we could have taken more from them." She motions at the goblin. "Wreak more havoc. I mean, we might be the first people to be in Mount Bloodrock, and live." \n\n\n_"Let us keep that second part true, then."_\n ',!0)
c.t(0,"",!0)}},
ta:{"^":"a:5;",
$3:function(a,b,c){c.t(0,"",!0)
if(b.ao("guardpost_above_church_take_shield")&&!b.jf("guardpost_above_church_take_shield"))c.q(0,"The goblin's corpse is sprawled on the ground.")
else c.q(0,"The goblin is sleeping soundly.")
c.t(0,"",!0)}},
lG:{"^":"W;W:c<,h:d<,b,a",
G:function(a,b){var z=b.f
if(!J.e(H.F(z.length!==0?C.a.gw(z):null,"$isJ").a,"guardpost_above_church"))return!1
if(b.dM(this.d)!=null)return!1
return!0},
R:[function(a,b,c){c.t(0,"You silently approach the goblin's legs, wait a few moments, then lean over him and deftly lift the shield. The goblin sniffs, moves, but stays asleep.\n\n\nYou take a few slow steps back, then fix the shield on your offhand.\n",!0)
O.eD(a,b,c,!0)
return H.b(a.gh())+" successfully performs GuardpostAboveChurchTakeShield"},"$3","gM",6,0,1],
P:[function(a,b,c){c.t(0,"You silently approach the goblin's legs, and wait a few moments. You're trying to stay as far away from his nose as possible. The goblin sniffs, moves, but stays asleep. You shift your weight on the right leg, leaning over the goblin and using the other leg as a counterweigh. Briana watches you with amusement.\n\n\nYou touch the shield to lift it, but freeze. The goblin sniffs again, and shifts. If you move, he'll wake up.\n",!0)
C.a.q(b.f,V.lH())
return H.b(a.gh())+" fails to perform GuardpostAboveChurchTakeShield"},"$3","gL",6,0,1],
H:function(a,b){return 0.3},
gO:function(){return!1},
a9:function(a,b){return"Will you be successful?"},
gK:function(){return},
gI:function(){return"The goblin is asleep but not soundly \u2014 the floor here must be cold and uncomfortable. Taking the shield from its position on the goblin's lap will quite likely wake him up."},
gJ:function(){return!1}},
fb:{"^":"ae;",
gbN:function(){return[new A.fX(new V.lJ(),new V.lK(),"Stay perfectly still","If you stop moving, the guard will go back to sleep. But in this position, staying perfectly still even for a single minute will be quite a feat. (It will cost you 1 stamina.)","guardpost_above_church_take_shield_rescue",!0,null),new A.fX(new V.lL(),null,"Snatch the shield","You can quickly snatch the shield, jump back and prepare for a fight.","guardpost_above_church_take_shield_continuation_of_failure",!0,null)]},
gh:function(){return"guardpost_above_church_take_shield"},
ax:function(){var z=new V.dA(null,null,null)
z.m(this)
new V.lM().$1(z)
return z.p()},
aY:function(a,b){if(a!==0)return
return b.a.bB(0,new V.lN())},
b5:function(a,b){return[a.bB(0,new V.lO())]}},
tI:{"^":"a:0;",
$1:function(a){var z=$.$get$a8().aq(1073741823)
a.gbM().b=z
a.gbM().c=0
return a}},
lJ:{"^":"a:25;",
$4:function(a,b,c,d){J.eN(c,"You stay frozen in place. After a while, the strain of holding the awkward position start to show. Your left leg is shaking, and a drop of sweat is forming on your nose, threatening to fall on the goblin's leg.\n\n\nFortunately, at about that moment the goblin shifts again and his expression gets visibly more relaxed. His breath is deep and regular again.\n\n\nYou deftly lift the shield, take a few slow steps back, then fix the shield on your offhand.",!0)
b.aA()
b.Y(a.gi(),new V.lI())
O.eD(a,b,c,!0)
return"GuardpostAboveChurchTakeShieldRescueSituation resolved with rescue/continuation (Stay perfectly still)"}},
lI:{"^":"a:0;",
$1:function(a){var z=a.gb7()
if(typeof z!=="number")return z.as()
a.sb7(z-1)
return a}},
lK:{"^":"a:3;",
$3:function(a,b,c){var z=a.gb7()
if(typeof z!=="number")return z.bi()
return z>0}},
lL:{"^":"a:25;",
$4:function(a,b,c,d){J.eN(c,"You snatch the shield and jump back next to Briana. The goblin wakes up instantly and gets his bearing suprisingly fast. He jumps up and gets into combat stance.\n\n\n\n\nYou hold the shield on your offhand and get ready to fight.",!0)
b.aA()
O.eD(a,b,c,!1)
return"GuardpostAboveChurchTakeShieldRescueSituation resolved with rescue/continuation (Snatch the shield)"}},
lM:{"^":"a:0;",
$1:function(a){var z=a.gbM().c
if(typeof z!=="number")return z.ai()
a.gbM().c=z+1
return a}},
lN:{"^":"a:0;",
$1:function(a){return a.gN()}},
lO:{"^":"a:0;",
$1:function(a){return a.gN()}},
t7:{"^":"a:5;",
$3:function(a,b,c){c.t(0,'You are Aren, a slave. You have spent three painful years inside this mountain, between the foul-smelling cave walls, and under the whip of the orcs and the goblins that live here. \n\n\nYou watch Briana straighten over Agruth\'s corpse. She smooths her hair, using a pool of Agruth\'s blood as a mirror. \n\n\n"What?" she says when she notices you\'re looking.\n\n\n_"We either go now, or die."_\n\n\nBriana spits down at the body. "He wasn\'t even the worst of them, you know."\n\n\n_"I know."_\n\n\n"They _all_ deserve this, or worse. All of them. And I like the fact we\'ll kill them by their own swords." She kicks the dead slaver in the hip. \n\n\n_"That one is already dead."_\n\n\n"I was making sure. You understand that we should name the sword, right? It\'s the only thing we have going for us right now. Gods love named swords. And I refuse to carry it around referring to it as _Agruth\'s_." She makes a pained grimace when she says the orc\'s name.\n',!0)}},
t8:{"^":"a:5;",
$3:function(a,b,c){c.t(0,"",!0)}},
mC:{"^":"W;W:c<,h:d<,b,a",
G:function(a,b){var z=b.f
if(!J.e(H.F(z.length!==0?C.a.gw(z):null,"$isJ").a,"just_after_agruth_fight"))return!1
return!0},
R:[function(a,b,c){c.t(0,'_"We will call it Luck Bringer. It is our only chance to get out of this hell."_\n\n\nBriana nods. "Luck Bringer it is. Now, you\'re right, let\'s just get out of here as quickly as possible."\n',!0)
O.iv(b,"Luck Bringer")
b.ar("RoomRoamingSituation").dF(b,O.aK(b),"cave_with_agruth_pre",c)
return H.b(a.gh())+" successfully performs NameAgruthSwordOpportunity"},"$3","gM",6,0,1],
P:[function(a,b,c){throw H.c(new P.w("Success chance is 100%"))},"$3","gL",6,0,1],
H:function(a,b){return 1},
gO:function(){return!1},
a9:function(a,b){return"Will you be successful?"},
gK:function(){return},
gI:function(){return""},
gJ:function(){return!1}},
mD:{"^":"W;W:c<,h:d<,b,a",
G:function(a,b){var z=b.f
if(!J.e(H.F(z.length!==0?C.a.gw(z):null,"$isJ").a,"just_after_agruth_fight"))return!1
return!0},
R:[function(a,b,c){c.t(0,'_"We will call it Savior. It is our first step to freedom."_\n\n\nBriana nods. "Savior it is. Now, you\'re right, let\'s just get out of here as quickly as possible."\n',!0)
O.iv(b,"Savior")
b.ar("RoomRoamingSituation").dF(b,O.aK(b),"cave_with_agruth_pre",c)
return H.b(a.gh())+" successfully performs NameAgruthSwordRedemption"},"$3","gM",6,0,1],
P:[function(a,b,c){throw H.c(new P.w("Success chance is 100%"))},"$3","gL",6,0,1],
H:function(a,b){return 1},
gO:function(){return!1},
a9:function(a,b){return"Will you be successful?"},
gK:function(){return},
gI:function(){return""},
gJ:function(){return!1}},
mB:{"^":"W;W:c<,h:d<,b,a",
G:function(a,b){var z=b.f
if(!J.e(H.F(z.length!==0?C.a.gw(z):null,"$isJ").a,"just_after_agruth_fight"))return!1
return!0},
R:[function(a,b,c){c.t(0,"_\"That is foolish. It is just a sword, after all.\"_\n\n\nBriana shrugs. \"Whatever, just don't ever call it _Agruth's._ I already have more respect to this piece of iron than to that worthless animal. Now, you're right, let's just get out of here as quickly as possible.\"\n",!0)
b.ar("RoomRoamingSituation").dF(b,O.aK(b),"cave_with_agruth_pre",c)
return H.b(a.gh())+" successfully performs NameAgruthSwordNothing"},"$3","gM",6,0,1],
P:[function(a,b,c){throw H.c(new P.w("Success chance is 100%"))},"$3","gL",6,0,1],
H:function(a,b){return 1},
gO:function(){return!1},
a9:function(a,b){return"Will you be successful?"},
gK:function(){return},
gI:function(){return""},
gJ:function(){return!1}},
t5:{"^":"a:5;",
$3:function(a,b,c){c.t(0,'Violent grunts and growls are coming through that door. Next to it, an orcish writing on the wall says "Danger mad. Give food go away."\n',!0)}},
t6:{"^":"a:5;",
$3:function(a,b,c){c.t(0,"TODO\n",!0)}},
t3:{"^":"a:5;",
$3:function(a,b,c){c.t(0,"The room is dark and wet. As you enter, the noises end. \n\n\n\n\nWhen your eyes become accustomed to the dark, you see two figures standing in front of you. One is much higher, almost touching the room's ceiling, but you slowly realize it's a stone statue. The other figure, though, is living.\n\n\n\n\nIts face is in constant motion, overwhelmed by tics and waves of hateful expressions. You realize it's a male orc, but an especially large one, with huge muscles and many scars. If he wasn't locked up here, he'd surely make a captain.\n",!0)}},
t4:{"^":"a:5;",
$3:function(a,b,c){c.t(0,"The room is quiet. The mad guardian's huge body lies on the floor beneath the statue.\n",!0)}},
pm:{"^":"W;W:c<,h:d<,b,a",
G:function(a,b){var z=b.f
if(!J.e(H.F(z.length!==0?C.a.gw(z):null,"$isJ").a,"orcthorn_room"))return!1
if(b.ao("talk_to_briana_3"))if(!b.ao(this.d))z=H.F(z.length!==0?C.a.gw(z):null,"$isJ").c!==!0
else z=!1
else z=!1
if(!z)return!1
return!0},
R:[function(a,b,c){c.t(0,'TODO - this must be it. you search to room and find the sword hidden well (under a loose tile? under a heap of corpses?). then "why would they keep the sword at all? why wouldn\'t they destroy it?" - "fear. it\'s the ultimate authority. I don\'t think it was the orcs who decided to keep the sword intact."\n\n\nBriana: "I can\'t believe we did it. A farm boy and a freak."\n\n\n"A freak?"\n\n\n"A simple thing like this. You don\'t understand how much the orcs learned to fear the sword. A single knight could hold two dozens of orcs in check just by wielding that sword."\n\n\n"Well, we still need to get out of here."\n',!0)
O.ww(b,a)
return H.b(a.gh())+" successfully performs TakeOrcthorn"},"$3","gM",6,0,1],
P:[function(a,b,c){throw H.c(new P.w("Success chance is 100%"))},"$3","gL",6,0,1],
H:function(a,b){return 1},
gO:function(){return!1},
a9:function(a,b){return"Will you be successful?"},
gK:function(){return},
gI:function(){return""},
gJ:function(){return!1}},
t0:{"^":"a:5;",
$3:function(a,b,c){c.t(0,"TODO\n",!0)}},
t1:{"^":"a:5;",
$3:function(a,b,c){c.t(0,"TODO\n",!0)}},
ou:{"^":"W;W:c<,h:d<,b,a",
G:function(a,b){var z=b.f
if(!J.e(H.F(z.length!==0?C.a.gw(z):null,"$isJ").a,"slave_quarters"))return!1
return!0},
R:[function(a,b,c){c.t(0,"TODO FIGHT\n",!0)
b.aA()
return H.b(a.gh())+" successfully performs SlaveQuartersContinue"},"$3","gM",6,0,1],
P:[function(a,b,c){throw H.c(new P.w("Success chance is 100%"))},"$3","gL",6,0,1],
H:function(a,b){return 1},
gO:function(){return!1},
a9:function(a,b){return"Will you be successful?"},
gK:function(){return},
gI:function(){return""},
gJ:function(){return!1}},
rZ:{"^":"a:5;",
$3:function(a,b,c){c.t(0,"You can see Briana clutching her fists. \"Are we homesick already?\" she says. But she doesn't wait for reply, and presses on.\n\n\nIt doesn't take long before you start hearing voices. Orcs and goblins shouting commands, mostly. Then human screams.\n\n\nThe tunnel gets wider and better lit by torches. The walls are smoother. You stop down next to a small, reinforced door. Up ahead, something is happening. A human slave is running towards you. His hand is visibly broken just above the elbow and blood is streaming down his limping left leg. His lips are moving but there is no sound anymore, only pain. Eyes in tears, he doesn't see you or anything else.\n\n\nBefore you can so much as call to him, something long and sharp shoots from behind the slave, and into his back. A bloodied spearhead appears in the center of the man's chest, as if growing from there. The tearful eyes go down, looking at the fatal wound. Two more steps and the slave falls face down, the shaft of the spear protruding upwards from his back.\n\n\nAn orc and a goblin appear from the tunnel, walking towards the dead man. The orc is laughing, patting his companion on the back. \"Vicious throw, small one!\" he roars.\n\n\nYou step back and motion Briana to lean on the wall, hoping that the door's embossed frame will provide enough cover before the two slavers turn again. \n\n\nBut at that time, something or someone smashes on that very door from the inside. Then come angry growls and something akin to barking and howling.\n\n\nThe door stays shut but the two slavers are now looking directly at you. The goblin yanks his spear from the corpse, and the orc unsheathes his sword. They start towards you.\n\n\n\n\n\n\n[IMAGE goblin spearman + orc]\n",!0)}},
t_:{"^":"a:5;",
$3:function(a,b,c){c.t(0,"The small door is TODO open/close.\n\n\n",!0)
O.cA(b,c)
c.t(0,"",!0)}},
ov:{"^":"W;W:c<,h:d<,b,a",
G:function(a,b){var z=b.f
if(!J.e(H.F(z.length!==0?C.a.gw(z):null,"$isJ").a,"slave_quarters_passage"))return!1
if(!b.ao(this.d))z=H.F(z.length!==0?C.a.gw(z):null,"$isJ").c!==!0
else z=!1
if(!z)return!1
return!0},
R:[function(a,b,c){c.t(0,'Violent grunts and growls are coming through that door. Next to it, an orcish writing on the wall says "Danger mad. Give food go away."\n',!0)
return H.b(a.gh())+" successfully performs SlaveQuartersPassageExamineDoor"},"$3","gM",6,0,1],
P:[function(a,b,c){throw H.c(new P.w("Success chance is 100%"))},"$3","gL",6,0,1],
H:function(a,b){return 1},
gO:function(){return!1},
a9:function(a,b){return"Will you be successful?"},
gK:function(){return},
gI:function(){return""},
gJ:function(){return!1}},
rX:{"^":"a:5;",
$3:function(a,b,c){c.t(0,"A blast of smoke and heat greets you as you walk out of the passage and into the room. The roaring fire draws your attention to the far wall, where scores of orcs shovel coal into a giant furnace and tilt huge kettles of molten steel into white-hot rivers. This is the smelter.\n\n\n",!0)
if(O.bi(b,"war_forge"))c.t(0,"You see a smooth passage leading out of the smelter and sloping upwards. You'll be able to go there unnoticed.",!0)
c.t(0,"",!0)
if(O.bi(b,"guardpost_above_church"))c.t(0,"Not far from here there is a short tunnel, sloping down. It leads into the same room where the molten steel goes \u2014 the war forges. You'll be able to go there unnoticed.",!0)
c.t(0,"",!0)}},
rY:{"^":"a:5;",
$3:function(a,b,c){c.t(0,"The reds and whites of the molten steel reflect in the heaps of coal.\n\n\n",!0)
O.cA(b,c)
c.t(0,"",!0)}},
oy:{"^":"W;W:c<,h:d<,b,a",
G:function(a,b){var z=b.f
if(!J.e(H.F(z.length!==0?C.a.gw(z):null,"$isJ").a,"smelter"))return!1
if(b.ao(this.d))return!1
return!0},
R:[function(a,b,c){c.t(0,"The artificial rivers lead the molten iron across the room, into a large pool. From that pool, a single ogre is distributing the forge-ready liquid into troughs that descend to the war forges below. \n\n\nThe ogre is no more than a spear's throw away from you. But he doesn't notice. In fact, you realize he's blind, probably from all the molten steel around him. Yet he's performing his job without fault, listening to commands from orcs in the war forges beyond the wall, and operating the  floodgates accordingly.\n",!0)
return H.b(a.gh())+" successfully performs SmelterLookAround"},"$3","gM",6,0,1],
P:[function(a,b,c){throw H.c(new P.w("Success chance is 100%"))},"$3","gL",6,0,1],
H:function(a,b){return 1},
gO:function(){return!1},
a9:function(a,b){return"Will you be successful?"},
gK:function(){return},
gI:function(){return""},
gJ:function(){return!1}},
oz:{"^":"W;W:c<,h:d<,b,a",
G:function(a,b){var z=b.f
if(!J.e(H.F(z.length!==0?C.a.gw(z):null,"$isJ").a,"smelter"))return!1
if(!(!b.ao(this.d)&&b.ao("war_forge_watch_workers")&&b.ao("smelter_look_around")&&O.aK(b).h8(C.r)))return!1
return!0},
R:[function(a,b,c){c.t(0,"TODO - throwing spear at the orc that holds the molten steel gate\n\n\nWhy would you do that? You just wasted a perfectly good spear on a stupid ogre that posed no threat to us.\n\n\nWatch.\n\n\nTODO (molten steel ruins everything)\n\n\nThe less simple you see the world, the easier it is for you to change it. \n\n\nYou got lucky. \n\n\nThat was some throw! That thing downstairs.. I don't know what it is but I would not want to meet it in battle. - it is probably meant to scale castle walls. - so, fort ironcast. One well placed spear may have prevented the fall of Ironcast. - delayed. - what? - we delayed the fall of the fort, at best.\n",!0)
O.uZ(b)
return H.b(a.gh())+" successfully performs SmelterThrowSpear"},"$3","gM",6,0,1],
P:[function(a,b,c){throw H.c(new P.w("Success chance is 100%"))},"$3","gL",6,0,1],
H:function(a,b){return 1},
gO:function(){return!1},
a9:function(a,b){return"Will you be successful?"},
gK:function(){return},
gI:function(){return""},
gJ:function(){return!1}},
rV:{"^":"a:5;",
$3:function(a,b,c){c.t(0,"The path from slavery to power begins with a single crack of a whip. Briana wheels around, her face red with pain and anger. She is new here, but she knows what will follow. \n\n\n\n\nOnce Agruth starts whipping, the victim ends up dead. Agruth loves killing slaves. \n\n\n\n\nAnother crack and there is new blood on Briana's face. Agruth grins.\n\n\n\n\nNobody else is in sight. It's just you, Agruth and Briana. That's Agruth's main mistake.\n",!0)}},
rW:{"^":"a:5;",
$3:function(a,b,c){c.t(0,"",!0)}},
po:{"^":"W;W:c<,h:d<,b,a",
G:function(a,b){if(!(b.dM(this.d)==null&&O.eB(b)))return!1
return!0},
R:[function(a,b,c){c.t(0,'"You were caught not too long ago, I think. What can you tell me about outside?"\n\n\n\n\nBriana: "How long have you been here?"\n\n\n\n\n"Three years."\n\n\n\n\n"Three years! Gods. A lot has happened in the last winter alone. The orcs have taken the upper valley, and make raids way beyond Fort Ironcast."\n\n\n\n\n"So when we escape from here \u2014 *if* we escape from here \u2014 we still have to cover miles of orc territory."\n\n\n\n\n"Correct. The closest safe place is the fort."\n',!0)
return H.b(a.gh())+" successfully performs TalkToBriana1"},"$3","gM",6,0,1],
P:[function(a,b,c){throw H.c(new P.w("Success chance is 100%"))},"$3","gL",6,0,1],
H:function(a,b){return 1},
gO:function(){return!1},
a9:function(a,b){return"Will you be successful?"},
gK:function(){return},
gI:function(){return""},
gJ:function(){return!1}},
pp:{"^":"W;W:c<,h:d<,b,a",
G:function(a,b){if(!(b.ao("talk_to_briana_1")&&b.dM(this.d)==null&&O.eB(b)))return!1
return!0},
R:[function(a,b,c){c.t(0,'"Where did they catch you?"\n\n\n\n\nBriana: "At the Gate of Screams. I was trying to sneak in."\n\n\n\n\n"You what?"\n\n\n\n\n"I know. It seemed like a stupid idea even then. I wanted to get in, steal back the Orcthorn, get out, help the fight."\n',!0)
return H.b(a.gh())+" successfully performs TalkToBriana2"},"$3","gM",6,0,1],
P:[function(a,b,c){throw H.c(new P.w("Success chance is 100%"))},"$3","gL",6,0,1],
H:function(a,b){return 1},
gO:function(){return!1},
a9:function(a,b){return"Will you be successful?"},
gK:function(){return},
gI:function(){return""},
gJ:function(){return!1}},
pq:{"^":"W;W:c<,h:d<,b,a",
G:function(a,b){if(!(b.ao("talk_to_briana_2")&&b.dM(this.d)==null&&O.eB(b)))return!1
return!0},
R:[function(a,b,c){c.t(0,'"What\'s Orcthorn?"\n\n\n"A sword. It has killed hundreds of orc, wielded by many different knights. Even more orcs died trying to seize it, almost to no avail."\n\n\n"Almost."\n\n\n"Yes. Last full moon, an orcish captain and a company of (TODO: alpha) warriors ambushed Lord TODO. He was the wielder of Orcthorn at that time, and they knew it. They slaughtered his company and brought the sword here, to Bloodrock. Since then, the orcs are bolder and more successful."\n\n\n"The mad guardian."\n\n\n"The mad who?"\n\n\n"That\'s what Agruth and the other slavers were talking about a couple of weeks back. One orc was tasked with guarding a sword. That seemed wierd enough to me. Guarding a sword? Stranger yet, that orc went mad after only a few days of doing this. Now they keep him in a cell, and call him _grach kamkorr_. The mad guardian. That sword is still with him. Hidden there in the cell."\n\n\n"Where is that cell?"\n\n\n"Somewhere in the slave quarters."\n',!0)
return H.b(a.gh())+" successfully performs TalkToBriana3"},"$3","gM",6,0,1],
P:[function(a,b,c){throw H.c(new P.w("Success chance is 100%"))},"$3","gL",6,0,1],
H:function(a,b){return 1},
gO:function(){return!1},
a9:function(a,b){return"Will you be successful?"},
gK:function(){return},
gI:function(){return""},
gJ:function(){return!1}},
rT:{"^":"a:5;",
$3:function(a,b,c){c.t(0,"This must be the place that the orcs call the Shafts. It's a tall, seemingly endless room, with many walkways across.\n\n\n\n\n\n\nYou realize there is really only one way out, over one of the walkways. You'll have to run, there is no hiding anymore.\n",!0)}},
rU:{"^":"a:5;",
$3:function(a,b,c){c.t(0,"",!0)}},
tK:{"^":"a:5;",
$3:function(a,b,c){c.t(0,"TODO - start chase\n\n\nSuddenly, an **orc** and a **goblin** jump in front of you from a slimy crevice, swords in hands.\n\n\n\n\n![Orc and Goblin](img/orc_and_goblin_sketch.jpg)\n",!0)}},
tL:{"^":"a:5;",
$3:function(a,b,c){c.t(0,"",!0)}},
tz:{"^":"a:5;",
$3:function(a,b,c){c.t(0,"You enter something that at first looks like a large, twisting cave, but then opens into a high room with many columns. This must be what the orcs call the Underground Church. Your bare footsteps reverberate around the space, so you slow down to quiet them. There are no windows, of course, you are deep underground, but there is dim light coming from the far end of the place, where you expect the altar to be but can't quite see it. No torches here. Quiet. \n\n\n",!0)
if(O.bi(b,"cave_with_agruth"))c.q(0,"After a bit of searching, you also notice a twisty passage going from the right hand side of the Church and sloping upwards. That must be the way out.")
c.t(0,"",!0)
if(O.bi(b,"guardpost_above_church"))c.q(0,"Not far from here, a tunnel leads slightly downwards, to where you killed Agruth.")
c.t(0,"",!0)}},
tJ:{"^":"a:5;",
$3:function(a,b,c){c.t(0,"The temple stands silent, as if holding breath.\n\n\n",!0)
O.cA(b,c)
c.t(0,"",!0)}},
lb:{"^":"W;W:c<,h:d<,b,a",
G:function(a,b){var z=b.f
if(!J.e(H.F(z.length!==0?C.a.gw(z):null,"$isJ").a,"underground_church"))return!1
if(b.ao(this.d))return!1
return!0},
R:[function(a,b,c){c.t(0,'This place was not built by the orcs or their slaves. Walls are straight and smooth. The columns are decorated with delicate embossments of skulls and tentacles.\n\n\n"What are these things?" Briana whispers.\n\n\n_"This place worships the Dead Prince."_\n\n\nSaying the name brings coldness and sweat. You hear the name every night in the Dead Prince\'s tongue \u2014 but it has been a long time since you said it yourself.\n\n\n"Worships?" Briana looks up at the high ceiling, then around the temple. "I though the Dead Prince was a warlord. A shaman. Something like that."\n\n\n_"He is god."_\n\n\n',!0)
if(!b.ao("wait_for_ritual"))c.t(0,"Briana smirks. \"Look, no. The Dead Prince is no god. The orcs might think so, you shouldn't. He's some talented illusionist at best.\" ",!0)
c.t(0,'\nThe glow coming from the altar dims for a moment, then lights up again.\n\n\n_"He is worse than god. He is fear itself."_\n\n\nBriana looks at you, narrowing her eyes.\n\n\n_"I think you have felt it."_\n',!0)
return H.b(a.gh())+" successfully performs ExamineUndergroundChurch"},"$3","gM",6,0,1],
P:[function(a,b,c){throw H.c(new P.w("Success chance is 100%"))},"$3","gL",6,0,1],
H:function(a,b){return 1},
gO:function(){return!1},
a9:function(a,b){return"Will you be successful?"},
gK:function(){return},
gI:function(){return""},
gJ:function(){return!1}},
td:{"^":"a:5;",
$3:function(a,b,c){c.t(0,'The altar is a simple block of stone at the back of the temple. On the wall above it, there is a large ornament portraying an octopus with eight tentacles and eight black eyes at their tips. It\'s the sign of the Dead Prince. You have never seen it in real life but you know it well.\n\n\n"You\'re brave, my friend," Briana whispers. "I\'ll give you that. But if we must linger in this mountain, I\'d much rather kill some orcs than spy around a temple."\n\n\n_"You hate orcs? This is what made them."_\n\n\nBriana opens her mouth to reply, but at that point the otherwise steady light from the altar flickers like a flame, and you both slip behind a large column to move out of sight. A spear that lies here on the ground almost trips you up.\n',!0)}},
to:{"^":"a:5;",
$3:function(a,b,c){c.t(0,"The altar glows with a dim red light that reflects in the eight black eyes above it.\n",!0)}},
pG:{"^":"W;W:c<,h:d<,b,a",
G:function(a,b){var z=b.f
if(!J.e(H.F(z.length!==0?C.a.gw(z):null,"$isJ").a,"underground_church_altar"))return!1
if(b.ao(this.d))return!1
return!0},
R:[function(a,b,c){c.t(0,'You move to a shadow and wait. After a few heartbeats, there is a scraping sound of stone against stone. You lean out from your hiding and see a part of the wall to the right of the altar opening.\n\n\nAn orc priest, tall and pale, enters from the stone door. At that time, the whole temple reverberates with a strong, dissonant tone that is somehow both sickening and appealing at the same time. It\'s like a groan of some large beast awakening.\n\n\nAfter the priest, a huge creature enters through the door, crouching below the frame. It\'s unclear what it is, but possibly some large breed of ogre, and judging by the braided hair, a female. Her sword \u2014 attached to her hip with a rope \u2014 is as long as you are tall. \n\n\nWhen she enters the temple and unbends, you can see that she leads someone on a chain. An orc. Despite being a strong one, probably a captain or even a chieftain, he is dwarfed by the creature before him, and he visibly shakes in horror.\n\n\nThe three of them \u2014 the priest, the ogre and the orc \u2014 go around the altar and stop before it, facing the symbol of the octopus, and away from you and Briana. The dissonant tone stops. You lean a little further out from your hiding, to have a better view.\n\n\nWithout words, the priest beckons the orc to lie at the altar. The orc is now shaking uncontrollably, but complies. You can hear his fitful breath, the rustle of his body against the stone as he glides into position, and nothing else.\n\n\nWhen the orc lies on the altar, the female ogre walks up to him and places her hands on his shoulders, pinning him down.\n\n\n_"Maggots."_\n\n\nSomehow, you know. Briana gives you a puzzled look, then turns back to the altar. From the shadows in the base of the altar, a swarm of large black insects starts to make its way to the top, towards the terrified orc. The priest lifts his arms as if in silent worship.\n\n\nThe ogre pushes down, preparing for the inevitable struggle. The orc senses it, tenses up and opens his mouth to scream.\n\n\nBut the scream doesn\'t come. Instead of it, the dissonant tone sounds again, more powerful than before.\n\n\nThe maggots crawl over the edge of the altar\'s top, onto the orc\'s body, heading straight towards his face. They move faster now.\n\n\n\n\nThe orc\'s eyes go wide. He struggles against the ogre\'s grip, pointlessly. The dissonant tone gets even louder. The temple quivers. The sound permeates everything.\n\n\nThis has a strange effect on you. Suddenly, the terror of the moment is fully replaced by something of an opposite \u2014 an invigorating feeling of power. You breathe in and feel stronger, refreshed. (Your stamina increases by +1.)\n\n\nYou notice that the priest takes a deep breath as well.\n\n\nThen, suddenly, the sound stops, and the orc\'s body sinks. The invigorating feeling is gone. You realize the maggots have eaten through the orc\'s eyes and cheeks, and that they are now scuttling back to the base of the altar.\n\n\nThe priest puts his arms down again, and \u2014 without ceremony \u2014 heads back to the stone door. The ogre takes the orc\'s dead body, puts it over her shoulder, and follows. In a few heartbeats, they are all gone and the door is closed. A new splash of blood on the altar is the only reminder of the scene.\n\n\nBriana doesn\'t look at you. "How did you know it will be maggots?"\n\n\n_"I do not know."_\n\n\n"Is this\u2026 I _felt_ that sound, somehow. I _felt_ it."\n\n\n_"This place does something weird to people."_\n\n\n"And if that orc was meant to be an offering, why did they not leave the body?" Briana shakes her head, still not looking at you. "Let\'s\u2026 let\'s just get out of here."\n',!0)
O.ip(b,1)
return H.b(a.gh())+" successfully performs WaitForRitual"},"$3","gM",6,0,1],
P:[function(a,b,c){throw H.c(new P.w("Success chance is 100%"))},"$3","gL",6,0,1],
H:function(a,b){return 1},
gO:function(){return!1},
a9:function(a,b){return"Will you be successful?"},
gK:function(){return},
gI:function(){return""},
gJ:function(){return!1}},
pn:{"^":"W;W:c<,h:d<,b,a",
G:function(a,b){var z=b.f
if(!J.e(H.F(z.length!==0?C.a.gw(z):null,"$isJ").a,"underground_church_altar"))return!1
if(b.ao(this.d))return!1
return!0},
R:[function(a,b,c){c.t(0,"It's a primive short spear that probably belonged to some goblin. You take it in your hand, feeling the wet wood and the patches of mire along its length. It must have been here for a while. \n\n\nBut it feels right in your hand, a good throwing weapon.\n",!0)
O.uy(b)
return H.b(a.gh())+" successfully performs TakeSpearInUndergroundChurch"},"$3","gM",6,0,1],
P:[function(a,b,c){throw H.c(new P.w("Success chance is 100%"))},"$3","gL",6,0,1],
H:function(a,b){return 1},
gO:function(){return!1},
a9:function(a,b){return"Will you be successful?"},
gK:function(){return},
gI:function(){return""},
gJ:function(){return!1}},
rS:{"^":"a:5;",
$3:function(a,b,c){c.t(0,"You enter the enormous cave that holds Mount Bloodrock's war forges. This space is so vast that it has its own climate, with dark clouds covering most of the ceiling, and what looks like black rain falling in the distance. Weird bats are circling just below the clouds, their shrieks mixing with the clangs of steel and angry shouts below.\n\n\n",!0)
if(O.bi(b,"cave_with_agruth"))c.t(0,"You and Briana duck behind some carts on a walkway above the floor of the cave. You can see that the walkway leads up a flight of stairs that hugs one side of the cave, and into a large stone wall. This must be the way through the smelter, and towards the Upper Door. Thankfully, there is nobody in the way. ",!0)
c.t(0,"\n",!0)
if(O.bi(b,"smelter"))c.t(0,"You and Briana stand on a walkway way above the floor of the cave. You can see the walkway leads down a flight of stairs that hugs one side of the cave, towards the bottom. Down there, you recognize a passage in the rock that you know must descend deeper into the mountain, towards the slave quarters, and therefore to where you slayed Agruth. There is nobody in the way. ",!0)
c.t(0,"",!0)}},
t2:{"^":"a:5;",
$3:function(a,b,c){c.t(0,"The air in the war forges is heavy and the noise overwhelming.\n\n\n",!0)
O.cA(b,c)
c.t(0,"",!0)}},
pH:{"^":"W;W:c<,h:d<,b,a",
G:function(a,b){var z=b.f
if(!J.e(H.F(z.length!==0?C.a.gw(z):null,"$isJ").a,"war_forge"))return!1
if(b.ao(this.d))return!1
return!0},
R:[function(a,b,c){c.t(0,"The cave is natural, but on the side of the smelter there is an artificial wall, like a stone dam. From an opening high on that wall, suspended troughs of molten steel descend into all parts of the room like huge fiery tentacles. \n\n\nAt the end of each of the troughs, teams of orcs pour the steel into molds for axes, war hammers, and greatswords. The clamor of hammers hitting anvils is deafening, and the strong smell of iron and soot is almost stronger than the smell of all that orc sweat.\n",!0)
return H.b(a.gh())+" successfully performs WarForgeLookAround"},"$3","gM",6,0,1],
P:[function(a,b,c){throw H.c(new P.w("Success chance is 100%"))},"$3","gL",6,0,1],
H:function(a,b){return 1},
gO:function(){return!1},
a9:function(a,b){return"Will you be successful?"},
gK:function(){return},
gI:function(){return""},
gJ:function(){return!1}},
pI:{"^":"W;W:c<,h:d<,b,a",
G:function(a,b){var z=b.f
if(!J.e(H.F(z.length!==0?C.a.gw(z):null,"$isJ").a,"war_forge"))return!1
if(!(!b.ao(this.d)&&b.ao("war_forge_look_around")))return!1
return!0},
R:[function(a,b,c){c.t(0,'You crane your neck from your hiding and take the scene in. More likely than not, no human has ever seen this place and lived to tell the tale.\n\n\nBriana shakes her head: "The orcs are working together with ogres. They must be terrified."\n\n\nYou scan the workers, noticing the slow-moving ogres that tower over the orcs. "And they don\'t use slaves here," you say. "There must be something important going on here." Looking again at the molds they are using, you don\'t see anything out of the expected. Primitive axes and swords, some armor.\n\n\n"What is that thing!" Briana gasps. You follow her stare and at first all you see is just a cluster of slightly larger forges. Then you squint and an image appears. An image of an enormous, repulsive, half-assembled insect. Each leg, or whatever they are, is as long as a good rock\'s throw. There are eight of them. Then there\'s the body \u2014 a huge cockroach-like contraption. The teeth of steel are already completed, sharp and menacing and as long as a man. \n\n\nA full-sized ogre is pouring water over one part of the form just now, producing a cloud of steam. You can\'t see much else. From the high opening in the smelter wall, molten steel is starting to flow down to fill another part of the iron monster.\n',!0)
return H.b(a.gh())+" successfully performs WarForgeWatchWorkers"},"$3","gM",6,0,1],
P:[function(a,b,c){throw H.c(new P.w("Success chance is 100%"))},"$3","gL",6,0,1],
H:function(a,b){return 1},
gO:function(){return!1},
a9:function(a,b){return"Will you be successful?"},
gK:function(){return},
gI:function(){return""},
gJ:function(){return!1}},
pZ:{"^":"fb;i:a<,V:b<",
a1:function(a){var z=new V.dA(null,null,null)
z.m(this)
a.$1(z)
return z.p()},
A:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof V.fb))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
y=z==null?y==null:z===y
z=y}else z=!1
return z},
gB:function(a){return Y.U(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)))},
k:function(a){return"GuardpostAboveChurchTakeShieldRescueSituation {id="+J.h(this.a)+",\ntime="+J.h(this.b)+",\n}"}},
dA:{"^":"d;a,b,c",
gi:function(){return this.gbM().b},
gV:function(){return this.gbM().c},
gbM:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.a=null}return this},
m:function(a){this.a=a},
p:function(){var z,y,x
z=this.a
if(z==null){y=this.gbM().b
x=this.gbM().c
z=new V.pZ(y,x)
if(y==null)H.i(P.m("id"))
if(x==null)H.i(P.m("time"))}this.m(z)
return z}}}],["","",,O,{"^":"",
xw:[function(a){var z,y
z=$.$get$dp()
y=z.C
if(y.length>0){y+=" "
z.C=y}z.C=y+a},"$1","v4",2,0,15],
xB:[function(a){$.ez=a},"$1","v5",2,0,15],
i8:[function(a,b,c,d,e,f,g){var z=L.f0(a,!1,!1,d,e,f,g)
$.$get$c_().q(0,z)
return z},function(a){return O.i8(a,!1,!1,null,null,null,null)},function(a,b,c){return O.i8(a,!1,!1,null,b,c,null)},"$7$deferToChoiceList$deferToEndOfPage$goto$helpMessage$script$submenu","$1","$3$helpMessage$script","v3",2,13,53,0,0,0,1,1,0],
nT:{"^":"o4;",
bA:function(){var z=0,y=P.aA(),x,w=2,v,u=[],t=this,s,r,q,p,o,n,m,l,k,j
var $async$bA=P.ax(function(a,b){if(a===1){v=b
z=w}while(true)switch(z){case 0:if($.cr){n=t.Q
n.toString
m=new A.u(667,null,null,null,null)
m.c="Sending updated stats."
n.a.F(m.E())
m=t.Q
n=Z.oH()
m.toString
l=new A.u(100,null,null,null,null)
l.e=n.E()
m.a.F(l.E())
new P.H(0,$.q,null,[null]).bC(!0)}if(t.r){n=t.Q
n.toString
m=new A.u(667,null,null,null,null)
m.c="Saving player chronology."
n.a.F(m.E())
t.r=!1
m=t.Q
m.toString
n=new A.u(60,null,null,null,null)
n.b=t.f.cu(0)
m.a.F(n.E())}s=null
case 3:n=t.Q
n.toString
m=new A.u(667,null,null,null,null)
m.c="Calling _goOneStep()."
n.a.F(m.E())
w=7
z=10
return P.aw(t.cF(),$async$bA)
case 10:s=b
w=2
z=9
break
case 7:w=6
j=v
n=H.C(j)
if(n instanceof M.cI){r=n
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
case 1:return P.aG(x,y)
case 2:return P.aF(v,y)}})
return P.aH($async$bA,y)},
eW:function(){var z,y
this.fw()
this.f.bg(0)
this.r=!0
this.e=this.c
z=this.Q
Z.hx(Z.bR())
z.toString
y=new A.u(90,null,null,null,null)
y.b=Z.bR()
z.a.F(y.E())
this.bA()},
lf:[function(a){var z,y
z={}
z.a=null
y=$.$get$c_()
y.Z(0,new O.of(z,this,a))
z=z.a
if(z==null)throw H.c(P.G("The sent choice hash ("+H.b(a)+") is not one of those offered ("+J.h(y)+")"))
this.iX(z)
this.bA()},"$1","giI",2,0,34],
iX:function(a){var z
if(a.gh2()!=null){z=a.r
$.$get$cx().aC(z)}z=a.x
if(z!=null)this.ep(z)},
cF:function(){var z=0,y=P.aA(),x,w=[],v=this,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c
var $async$cF=P.ax(function(a,a0){if(a===1)return P.aF(a0,y)
while(true)switch(z){case 0:u={}
r=$.$get$cy()
q=r.b
if(q.b!==q.c){u=v.Q
u.toString
q=new A.u(667,null,null,null,null)
q.c="Awarding points."
u.a.F(q.E())
p=r.b.dJ()
r=v.Q
q=p.gjv()
u=p.b
o=p.c
r.toString
n=new A.u(70,null,null,null,null)
n.b=[q,u]
n.c=o
r.a.F(n.E())
r=new P.H(0,$.q,null,[null])
r.bC(null)
r.c4(new O.o5(v))
x=!0
z=1
break}m=v.x===v.e.gay().length-1||v.x===v.y
u.a=m
r=v.x
q=v.y
if(r!==q)if(r!=null){if(r<v.e.gay().length){r=v.e.gay()
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
k.iF(new O.o6(v),!1)
if(k.gl(k)!==0){r=v.Q
r.toString
o=new A.u(667,null,null,null,null)
o.c="We have choices."
r.a.F(o.E())
o=H.y(k,"ba",0)
o=P.P(new H.K(k,new O.o7(u,l),[o]),!0,o)
r=k.a
H.p([],[L.ab])
j=new L.f1(r,o)
if(!j.gX(j)){u=v.Q
r=u.e
if(r!=null){r.dA(new D.c4("Showing new choice before previous one was selected."))
u.e=null}r=P.t
u.e=new P.cs(new P.H(0,$.q,null,[r]),[r])
r=j.dP()
u.a.F(r.E())
u=u.e.a.c4(v.giI())
i=new O.o8(v)
r=H.l(u,0)
q=$.q
if(q!==C.i){i=P.er(i,q)
q.toString}u.di(new P.ej(null,new P.H(0,q,null,[r]),6,new O.o9(),i,[r,r]))
x=!0
z=1
break}else{h=k.aT(0,new O.oa(),new O.ob())
if(h!=null){if(h.gh2()!=null){r=h.r
$.$get$cx().aC(r)}r=h.x
if(r!=null)v.ep(r)
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
return P.aw(v.cG(f),$async$cF)
case 5:x=a0
z=1
break
case 4:r=$.ez
if(r!=null){v.ep(r)
$.ez=null
x=!1
z=1
break}r=v.x
if(r==null){v.x=0
r=0}else if(r===q){r=v.e.gay().length-1
v.x=r}else if($.hV)$.hV=!1
else{++r
v.x=r}u.a=r===v.e.gay().length-1
r="Resolving block: '"+H.b(v.e.gh())+"' block "+H.b(v.x)+"."
q=v.Q
q.toString
o=new A.u(667,null,null,null,null)
o.c=r
q.a.F(o.E())
if(v.x===v.e.gay().length){u=v.Q
u.toString
r=new A.u(667,null,null,null,null)
r.c="End of book."
u.a.F(r.E())
r=v.Q
u=v.e7()
r.toString
u=u.eZ(50)
r.a.F(u.E())
v.Q.a.F(new A.u(80,null,null,null,null).E())
x=!0
z=1
break}r=v.e.gay()
q=v.x
if(q>>>0!==q||q>=r.length){x=H.f(r,q)
z=1
break}q=r[q]
z=typeof q==="string"?6:8
break
case 6:u=v.Q
r=v.e.gay()
q=v.x
if(q>>>0!==q||q>=r.length){x=H.f(r,q)
z=1
break}q=r[q]
r=P.X
u.f=new P.cs(new P.H(0,$.q,null,[r]),[r])
r=new A.u(30,null,null,null,null)
r.c=q
u.a.F(r.E())
u.f.a.c4(new O.oc(v))
x=!0
z=1
break
z=7
break
case 8:r=v.e.gay()
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
try{r=v.e.gay()
q=v.x
if(q>>>0!==q||q>=r.length){x=H.f(r,q)
z=1
break}k.jt(r[q])}catch(b){u=H.C(b)
if(u instanceof M.cI){t=u
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
if(k.bs(0,new O.od(u,v))&&v.x===v.e.gay().length-1){u=v.Q
u.toString
r=new A.u(667,null,null,null,null)
r.c="Creating & sending savegame"
u.a.F(r.E())
r=v.Q
u=v.e7()
r.toString
u=u.eZ(50)
r.a.F(u.E())
x=!1
z=1
break}x=!1
z=1
break
z=10
break
case 11:r=v.e.gay()
q=v.x
if(q>>>0!==q||q>=r.length){x=H.f(r,q)
z=1
break}q=r[q]
r={func:1,ret:[P.Q,P.at]}
z=H.ay(q,r)?12:14
break
case 12:d=v.x===v.e.gay().length-1?v.e7():null
q=v.e.gay()
o=v.x
if(o>>>0!==o||o>=q.length){x=H.f(q,o)
z=1
break}z=15
return P.aw(v.cG(H.ih(q[o],r)),$async$cF)
case 15:c=a0
if(k.bs(0,new O.oe(u,v))&&v.x===v.e.gay().length-1){u=v.Q
u.toString
r=d.eZ(50)
u.a.F(r.E())}x=c
z=1
break
z=13
break
case 14:u=v.e.gay()
r=v.x
if(r>>>0!==r||r>=u.length){x=H.f(u,r)
z=1
break}throw H.c(new P.w("Invalid block: "+H.b(u[r])))
case 13:case 10:case 7:case 1:return P.aG(x,y)}})
return P.aH($async$cF,y)},
ep:function(a){var z,y,x,w,v
z=$.$get$cM()
if(z.b.test(H.bz(a))){y=this.d
if(y==null)throw H.c(new P.w("Cannot use ["+J.h(z)+"] when there is no _preGotoPosition."))
x=y.a
z=y.b
if(typeof z!=="number")return z.as()
w=z-1}else{x=this.b.dU(a,this.e.gdW())
if(x==null)throw H.c("Function goto() called with an invalid argument '"+H.b(a)+"'. No such page.")
w=null}z=this.d
y=z==null
if((y?null:z.a)!=null){z=y?null:z.a
y=this.e
this.f.q(0,H.b(z.gh())+">>"+H.b(y.gh()))
this.r=!0}if(this.f.a7(0,H.b(this.e.gh())+">>"+H.b(x.gh()))||x.ghD()){z=this.d
y=z==null
if((y?null:z.a)!=null)z=!(y?null:z.a).ghD()
else z=!1}else z=!1
$.hT=z
z="Points embargo = "+z
y=this.Q
y.toString
v=new A.u(667,null,null,null,null)
v.c=z
y.a.F(v.E())
v=this.e
this.d=new O.nU(v,this.x)
this.e=x
this.x=w
v.e=J.ao(v.gdQ(),1)},
fw:function(){var z,y,x,w,v,u
this.x=null
$.$get$cx().bg(0)
$.$get$c_().sl(0,0)
$.rx=null
x=$.$get$cC()
x.bg(0)
w=$.$get$cy()
x.n(0,"points",w)
w.a=0
w.b.bg(0)
this.b.jx()
$.is=!0
try{this.kf()}catch(v){z=H.C(v)
y=H.E(v)
x=this.Q
w=H.b(z)+"\n"+H.b(y)
x.toString
u=new A.u(666,null,null,null,null)
u.c="Author Exception in initBlock() (<variables>): "+w
x.a.F(u.E())
throw H.c(z)}this.hn()
$.is=!1},
cG:function(a){var z=0,y=P.aA(),x,w=2,v,u=[],t=this,s,r,q,p,o,n,m
var $async$cG=P.ax(function(b,c){if(b===1){v=c
z=w}while(true)switch(z){case 0:q=$.$get$dp()
q.C=""
w=4
z=7
return P.aw(a.$0(),$async$cG)
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
throw H.c(new M.cI(q,o,n))
z=6
break
case 3:z=2
break
case 6:if(q.C.length!==0){t.Q.f7(J.h(q)).c4(new O.og(t))
x=!0
z=1
break}else{x=!1
z=1
break}case 1:return P.aG(x,y)
case 2:return P.aF(v,y)}})
return P.aH($async$cG,y)},
iP:[function(a){var z,y,x,w
z=a.x
if(z==null)return!1
if($.$get$cM().b.test(H.bz(z)))return!1
y=this.b.dU(z,this.e.gdW())
if(y==null){z="Target page '"+H.b(z)+"' was not found."
x=this.Q
x.toString
w=new A.u(667,null,null,null,null)
w.c=z
x.a.F(w.E())
return!0}y.gl6()
return!1},"$1","gfC",2,0,35],
e7:function(){var z,y,x,w,v,u
this.hn()
try{x=this.e.gh()
w=$.$get$cC()
x=new Z.fS(x,this.b.jS(),null,null,null,null)
x.c=H.aL(Z.d1(w),"$isI",[P.r,P.d],"$asI")
x.f=Date.now()
x.e=C.e.l3(H.aC(x),16)
return x}catch(v){z=H.C(v)
y=H.E(v)
x=this.Q
w=H.b(z)+"\n"+H.b(y)
x.toString
u=new A.u(666,null,null,null,null)
u.c="Error when creating savegame: "+w
x.a.F(u.E())
throw H.c(z)}},
hd:function(a,b){var z,y,x
this.fw()
z=this.b
y=z.a
if(y.j(0,a.a)==null)throw H.c(new Z.dB("Trying to load page '"+H.b(a.a)+"' which doesn't exist in current egamebook."))
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
this.f.aw(0,b)}z=this.Q
z.toString
y=new A.u(667,null,null,null,null)
y.c="Copying save variables into vars."
z.a.F(y.E())
y=$.$get$cC()
Z.nQ(a,y,P.dL(P.r,P.bH))
this.cx=H.F(y.j(0,"game"),"$isf6")
this.cy=H.aL(y.j(0,"hitpoints"),"$isau",[P.aX],"$asau")
z=[P.t]
this.db=H.aL(y.j(0,"stamina"),"$isau",z,"$asau")
this.dx=H.aL(y.j(0,"gold"),"$isau",z,"$asau")
z=this.Q
Z.hx(Z.bR())
z.toString
y=new A.u(90,null,null,null,null)
y.b=Z.bR()
z.a.F(y.E())
y=this.Q
y.toString
z=new A.u(667,null,null,null,null)
z.c="loadFromSaveGame() done."
y.a.F(z.E())
this.bA()},
kw:function(a){return this.hd(a,null)},
dY:[function(a,b,c,d){var z=0,y=P.aA(),x,w=this,v,u,t
var $async$dY=P.ax(function(e,f){if(e===1)return P.aF(f,y)
while(true)switch(z){case 0:v=$.$get$dp()
if(v.C.length!==0){w.Q.f7(J.h(v))
v.C=""}v=w.Q
v.toString
u=new A.u(130,null,null,null,null)
u.b=[a,b,d,c]
v.a.F(u.E())
u=U.cp
t=new P.H(0,$.q,null,[u])
v.x=new P.cs(t,[u])
x=t
z=1
break
case 1:return P.aG(x,y)}})
return P.aH($async$dY,y)},function(a,b){return this.dY(a,b,null,!1)},"lb","$4$rerollEffectDescription$rerollable","$2","gi_",4,5,54,1,0]},
of:{"^":"a:0;a,b,c",
$1:function(a){var z,y,x,w
a.sf8(!0)
if(a.d===this.c){z="Found choice that was selected: "+a.e
y=this.b.Q
y.toString
x=new A.u(667,null,null,null,null)
x.c=z
y.a.F(x.E())
this.a.a=a}else{z=a.x
if(z!=null){y=this.b
w=$.$get$cM().b.test(H.bz(z))?y.d.a:y.b.dU(z,y.e.gdW())
if(w!=null){y.f.q(0,H.b(y.e.gh())+">>"+H.b(w.gh()))
y.r=!0}}}}},
o5:{"^":"a:0;a",
$1:function(a){return this.a.bA()}},
o6:{"^":"a:0;a",
$1:function(a){return a.gf8()||this.a.iP(a)}},
o7:{"^":"a:37;a,b",
$1:function(a){return a.km(this.b,this.a.a)}},
o8:{"^":"a:0;a",
$1:function(a){var z,y,x
z=H.b(a)
y=this.a.Q
y.toString
x=new A.u(667,null,null,null,null)
x.c=z
y.a.F(x.E())
return}},
o9:{"^":"a:0;",
$1:function(a){return a instanceof D.c4}},
oa:{"^":"a:0;",
$1:function(a){return a.gkn()}},
ob:{"^":"a:2;",
$0:function(){return}},
oc:{"^":"a:0;a",
$1:function(a){return this.a.bA()}},
od:{"^":"a:0;a,b",
$1:function(a){return a.dC(!0,this.a.a,this.b.gfC())}},
oe:{"^":"a:0;a,b",
$1:function(a){return a.dC(!0,this.a.a,this.b.gfC())}},
og:{"^":"a:0;a",
$1:function(a){return this.a.bA()}},
nd:{"^":"d;a,b,fW:c<",
jj:function(a,b,c){var z
if(!$.hT){z=J.ao(this.a,b)
this.a=z
this.b.aC(new A.cY(b,z,c))}},
q:function(a,b){return this.jj(a,b,null)},
ai:function(a,b){this.q(0,b)
return this},
E:function(){return P.ad(["points",this.a])},
hC:function(a){this.a=a.j(0,"points")
this.b.bg(0)},
ia:function(){this.b=P.bb(null,A.cY)},
$ise6:1},
d2:{"^":"mX;ay:d<,dQ:e@,a,b,c",
ghD:function(){return J.aa(this.e,0)}},
nU:{"^":"d;a,b"},
o0:{"^":"d;a",
j:function(a,b){return this.a.j(0,b)},
dU:function(a,b){var z
if(b!=null&&this.a.ac(b+": "+H.b(a)))return this.a.j(0,H.b(b)+": "+H.b(a))
else{z=this.a
if(z.ac(a))return z.j(0,a)
else return}},
n:function(a,b,c){this.a.n(0,b,c)
c.sh(b)},
jS:function(){var z=new H.R(0,null,null,null,null,null,0,[P.r,null])
this.a.Z(0,new O.o2(z))
return z},
kc:function(a){a.Z(0,new O.o3(this))},
jx:function(){this.a.Z(0,new O.o1())}},
o2:{"^":"a:6;a",
$2:function(a,b){this.a.n(0,a,P.ad(["visitCount",b.gdQ()]))}},
o3:{"^":"a:6;a",
$2:function(a,b){var z=this.a.a
if(z.ac(a))z.j(0,a).sdQ(J.az(b,"visitCount"))}},
o1:{"^":"a:6;",
$2:function(a,b){b.sdQ(0)}}}],["","",,M,{"^":"",cI:{"^":"d;a,b,c",
k:function(a){return"AuthorScriptException at page '"+H.b(this.b)+"', block #"+H.b(this.c)+": "+H.b(this.a)},
v:{
eV:function(a){return new M.cI(a,null,null)}}}}],["","",,M,{"^":"",o4:{"^":"d;"}}],["","",,Z,{"^":"",fS:{"^":"d;a,b,c,d,e,f",
eZ:function(a){var z
if(a!==50&&a!==1020)throw H.c("Cannot create Message of type "+a+". Can only be MSG_SAVE_GAME (50) or MSG_LOAD_GAME (1020).")
z=new A.u(a,null,null,null,null)
z.c=this.dO()
return z},
dO:function(){var z,y
z=new H.R(0,null,null,null,null,null,0,[P.r,null])
z.n(0,"uid",this.e)
z.n(0,"currentPageName",this.a)
z.n(0,"pageMapState",this.b)
z.n(0,"vars",this.c)
z.n(0,"timestamp",this.f)
y=this.d
if(y!=null)z.n(0,"previousText",y)
return C.w.h0(z)},
k:function(a){return this.dO()},
v:{
fT:function(a){var z,y
if(a!=null)if(typeof a!=="string"){if(typeof a!=="number"||Math.floor(a)!==a)if(typeof a!=="number")if(typeof a!=="boolean"){z=J.o(a)
z=!!z.$isN||!!z.$isI}else z=!0
else z=!0
else z=!0
y=z}else y=!0
else y=!0
if(y)return!0
return!!J.o(a).$ise6},
d1:function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"&&Math.floor(a)===a||typeof a==="number"||typeof a==="boolean")return a
else{z=J.o(a)
if(!!z.$isN){y=[]
for(x=0;x<z.gl(a);++x)if(Z.fT(z.j(a,x)))y.push(Z.d1(z.j(a,x)))
return y}else if(!!z.$isI){w=new H.R(0,null,null,null,null,null,0,[null,null])
z.Z(a,new Z.nP(a,w))
return w}else if(!!z.$ise6){v=a.E()
v.n(0,"_class",a.gfW())
return Z.d1(v)}else throw H.c("Function _dissolveToPrimitivess called with a non-saveable argument type.")}},
d0:function(a,b,c){var z,y,x,w,v,u
if(a==null||typeof a==="string"||typeof a==="number"&&Math.floor(a)===a||typeof a==="number"||typeof a==="boolean")return a
else{z=J.o(a)
if(!!z.$isN){y=[]
for(x=0;x<z.gl(a);++x)y.push(Z.d0(z.j(a,x),b,null))
return y}else{w=!!z.$isI
if(w&&!a.ac("_class")){v=new H.R(0,null,null,null,null,null,0,[null,null])
z.Z(a,new Z.nO(b,v))
return v}else if(w&&a.ac("_class"))if(c!=null){c.hC(a)
return c}else{u=z.j(a,"_class")
if(!b.ac(u))throw H.c(new Z.dB("Constructor for "+H.b(u)+" not set. Cannot assemble a new instance."))
else return b.j(0,u).$1(a)}else throw H.c("Function _assembleFromPrimitives called with a non-primitive argument type.")}}},
nQ:function(a,b,c){a.c.Z(0,new Z.nR(b,c))}}},nP:{"^":"a:6;a,b",
$2:function(a,b){if(Z.fT(this.a.j(0,a)))this.b.n(0,a,Z.d1(b))}},nO:{"^":"a:6;a,b",
$2:function(a,b){this.b.n(0,a,Z.d0(b,this.a,null))}},nR:{"^":"a:38;a,b",
$2:function(a,b){var z,y,x
z=this.a
y=z.j(0,a)
x=this.b
if(y==null)z.n(0,a,Z.d0(b,x,null))
else z.n(0,a,Z.d0(b,x,y))}},dB:{"^":"d;a",
k:function(a){return"IncompatibleSavegameException: "+this.a}},lV:{"^":"d;a",
k:function(a){return"InvalidSavegameException: "+this.a}}}],["","",,D,{"^":"",nj:{"^":"d;"},ni:{"^":"nj;"},m2:{"^":"ni;a,b,c,d,e,f,r,x",
lj:[function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
o=P.r
n=[o,P.d]
H.aL(a,"$isI",n,"$asI")
m=new A.u(a.j(0,"type"),null,null,null,null)
if(a.ac("strContent"))m.c=a.j(0,"strContent")
if(a.ac("listContent"))m.b=a.j(0,"listContent")
if(a.ac("intContent"))m.d=a.j(0,"intContent")
if(a.ac("mapContent"))m.e=H.aL(a.j(0,"mapContent"),"$isI",n,"$asI")
z=m
switch(z.ghA()){case 1070:o=this.e
if(o!=null){o.dA(new D.c4("Book Quit before choice was selected."))
this.e=null}o=this.b
o.a.bt()
o.b.bt()
return
case 1000:o=new A.u(667,null,null,null,null)
o.c="GET_BOOK_UID received."
n=this.a
n.F(o.E())
n.F(new A.u(10,null,this.c.ch,null,null).E())
return
case 1050:l=z.gkg()
this.e.bX(l)
this.e=null
return
case 1060:o=new A.u(667,null,null,null,null)
o.c="New form state from player received."
this.a.F(o.E())
o=z.gky()
if(!o.ac("__submitted__"))o.n(0,"__submitted__",!1)
n=this.r
if(n.b>=4)H.i(n.cA())
n.bT(new G.kj(o))
return
case 1080:o=new A.u(667,null,null,null,null)
o.c="Received slot machine result."
this.a.F(o.E())
k=J.az(z.geQ(),0)
j=J.az(z.geQ(),1)
o=this.x
if(k>>>0!==k||k>=4)return H.f(C.C,k)
o.bX(new U.cp(C.C[k],j))
this.x=null
return
case 1010:o=new A.u(667,null,null,null,null)
o.c="Starting book from scratch."
n=this.a
n.F(o.E())
o=this.e
if(o!=null){o.dA(new D.c4("Book Restart before choice was selected."))
this.e=null}try{this.c.eW()}catch(i){y=H.C(i)
x=H.E(i)
o=new A.u(666,null,null,null,null)
o.c="An error occured when initializing: "+H.b(y)+".\n"+H.b(x)
n.F(o.E())
throw H.c(y)}o=new A.u(90,null,null,null,null)
o.b=Z.bR()
n.F(o.E())
n.F(new A.cY(0,0,null).dP().E())
return
case 1020:h=new A.u(667,null,null,null,null)
h.c="Loading a saved game."
g=this.a
g.F(h.E())
h=this.e
if(h!=null){h.dA(new D.c4("Book Load before choice was selected."))
this.e=null}try{h=z.gi3()
f=new Z.fS(null,null,null,null,null,null)
e=H.aL(C.w.jE(h),"$isI",n,"$asI")
if(!e.ac("currentPageName")||!e.ac("vars"))H.i(new Z.lV("Invalid JSON for Savegame. Doesn't contain required fields 'currentPageName' or 'vars'. JSON='"+H.b(h)+"'."))
f.e=e.j(0,"uid")
f.a=e.j(0,"currentPageName")
f.f=e.j(0,"timestamp")
f.b=H.aL(e.j(0,"pageMapState"),"$isI",n,"$asI")
f.c=H.aL(e.j(0,"vars"),"$isI",n,"$asI")
if(e.ac("previousText"))f.d=e.j(0,"previousText")
w=f
v=H.aL(J.j1(z.geQ()),"$isbP",[o],"$asbP")
o=this.c
if(v!=null)o.hd(w,v)
else o.kw(w)}catch(i){o=H.C(i)
if(o instanceof Z.dB){u=o
t=H.E(i)
o=new A.u(666,null,null,null,null)
o.c="Load failed due to incompatibility: "+H.b(u)+".\n"+H.b(t)
g.F(o.E())
this.c.eW()}else{s=o
r=H.E(i)
o=new A.u(666,null,null,null,null)
o.c="Load failed for unknown reason: "+H.b(s)+".\n"+H.b(r)
g.F(o.E())
this.c.eW()}}try{o=new A.u(90,null,null,null,null)
o.b=Z.bR()
g.F(o.E())}catch(i){q=H.C(i)
p=H.E(i)
o=new A.u(666,null,null,null,null)
o.c="Sending Stats failed for unknown reason: "+H.b(q)+".\n"+H.b(p)
g.F(o.E())
throw H.c(q)}this.c.toString
g.F(new A.cY(0,$.$get$cy().a,null).dP().E())
return
case 1090:this.f.bX(!0)
this.f=null
return
case 1040:this.c.bA()
return
default:o=new A.u(666,null,null,null,null)
o.c="Wrong message type received by Scripter - "+H.b(z.ghA())+"."
this.a.F(o.E())}},"$1","giV",2,0,20],
f7:function(a){var z=P.X
this.f=new P.cs(new P.H(0,$.q,null,[z]),[z])
z=new A.u(30,null,null,null,null)
z.c=a
this.a.F(z.E())
return this.f.a}},c4:{"^":"d;a",
k:function(a){return"AsyncOperationOverridenException: "+this.a+"."}}}],["","",,G,{"^":"",kj:{"^":"d;a",
E:function(){return P.cj(this.a,null,null)},
k:function(a){return"<CurrentState submitted="+H.b(this.a.j(0,"__submitted__"))+">"}}}],["","",,A,{"^":"",u:{"^":"d;hA:a<,eQ:b<,i3:c<,kg:d<,ky:e<",
gl5:function(){var z=this.a
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
dO:function(){return C.w.h0(this.E())},
E:function(){var z,y
z=new H.R(0,null,null,null,null,null,0,[P.r,P.d])
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
z="Message "+this.gl5()
y=this.a
x=J.o(y)
return z+(x.A(y,50)||x.A(y,60)||x.A(y,90)||x.A(y,100)||x.A(y,666)||x.A(y,667)?" (async)":"")}}}],["","",,E,{"^":"",mX:{"^":"d;h:a@,l6:b<",
k:function(a){return this.a},
gdW:function(){var z,y
z=this.a
if(z==null)throw H.c("Accessed groupName Page has name = null.")
y=J.iX(z,": ")
if(y>0)return J.j0(this.a,0,y)
else return}}}],["","",,A,{"^":"",cY:{"^":"d;jv:a<,b,c",
k:function(a){var z="Score +"+H.b(this.a)+"."
return z},
dP:function(){var z=new A.u(70,null,null,null,null)
z.b=[this.a,this.b]
z.c=this.c
return z}}}],["","",,L,{"^":"",ab:{"^":"d;f8:a@,b,c,d,b8:e<,I:f<,h2:r<,x,y",
gkn:function(){return this.e.length===0},
dC:function(a,b,c){if(this.a)return!1
if(this.e.length===0)return!1
b!=null
a!=null
if(c!=null&&c.$1(this)===!0)return!1
return!0},
km:function(a,b){return this.dC(a,b,null)},
l1:function(){return P.ad(["string",this.e,"hash",this.d,"submenu",this.y,"helpMessage",this.f])},
c4:function(a){this.r=a
return this},
bD:function(a,b){return C.b.bD(this.e,b.gb8())},
k:function(a){return"Choice: "+this.e+" ["+H.b(this.x)+"] ("+this.d+")"},
i7:function(a,b,c,d,e,f,g){if(a==null)throw H.c(P.G("String given to choice cannot be null."))
this.e=J.bh(a).f_(a)
this.d=C.b.gB(a)
this.r=f
this.b=!1
this.c=!1},
$isV:1,
$asV:function(){return[L.ab]},
v:{
f0:function(a,b,c,d,e,f,g){var z=new L.ab(!1,null,null,null,null,e,null,d,g)
z.i7(a,!1,!1,d,e,f,g)
return z}}},f1:{"^":"fr;a,b",
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
if(J.az(a,0)!=null){if(0>=a.length)return H.f(a,0)
v=!!J.o(a[0]).$isbH}else v=!1
if(v)try{if(0>=a.length)return H.f(a,0)
this.a=a[0].$0()}catch(u){z=H.C(u)
v=M.eV(J.h(z))
throw H.c(v)}else this.a=null
for(v=this.b,t={func:1,ret:[P.Q,P.at]},s=1;s<a.length;++s){y=a[s]
x=null
if(J.az(y,"string")!=null&&!!J.o(J.az(y,"string")).$isbH)try{x=J.az(y,"string").$0()}catch(u){w=H.C(u)
v=M.eV(J.h(w))
throw H.c(v)}else x=""
r=x
q=J.az(y,"goto")
p=H.ih(J.az(y,"script"),t)
o=new L.ab(!1,null,null,null,null,null,null,q,J.az(y,"submenu"))
if(r==null)H.i(P.G("String given to choice cannot be null."))
o.e=J.bh(r).f_(r)
o.d=C.b.gB(r)
o.r=p
o.b=!1
o.c=!1
C.a.q(v,o)}},
jp:function(a,b,c,d,e,f,g){if(b instanceof L.ab)C.a.q(this.b,b)
else if(typeof b==="string")C.a.q(this.b,L.f0(b,!1,!1,e,null,f,g))
else throw H.c(P.G("To add a choice to choices, one must provide either a new Choice element or a String."))},
q:function(a,b){return this.jp(a,b,!1,!1,null,null,null)},
l2:function(a,b,c,d){var z,y,x,w
z=this.b
y=H.l(z,0)
x=P.P(new H.K(z,new L.jY(b,a,c),[y]),!0,y)
if(x.length===0)throw H.c("Choices is empty, but still choices.toMessage was called.")
w=new A.u(40,null,null,null,null)
z=[]
w.b=z
z.push(d)
z.push(this.a)
C.a.Z(x,new L.jZ(w))
return w},
dP:function(){return this.l2(null,null,null,null)},
k:function(a){var z=this.b
return new H.aq(z,new L.k_(),[H.l(z,0),null]).cl(0,", ")},
$asfr:function(){return[L.ab]},
$asfA:function(){return[L.ab]},
$asN:function(){return[L.ab]},
$asa_:function(){return[L.ab]}},jY:{"^":"a:0;a,b,c",
$1:function(a){return a.dC(this.b,this.a,this.c)}},jZ:{"^":"a:0;a",
$1:function(a){H.b(a)
J.dq(this.a.b,a.l1())
a.a=!0}},k_:{"^":"a:0;",
$1:function(a){return H.b(a)}}}],["","",,Z,{"^":"",d3:{"^":"d;df:a<,b8:b<",
E:function(){return P.ad(["show",this.a,"string",this.b])}},oE:{"^":"d;a",
E:function(){var z=new H.R(0,null,null,null,null,null,0,[P.r,P.d])
this.a.Z(0,new Z.oF(z))
return z},
Z:function(a,b){this.a.Z(0,b)}},oF:{"^":"a:39;a",
$2:function(a,b){this.a.n(0,a,b.E())}},hw:{"^":"d;h:a@,aS:b<,fX:c<,dI:d<,df:e<,hh:f<,b8:r<",v:{
hx:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=H.p(new Array(a.length),[Z.hw])
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
z[w]=new Z.hw(s,r,q,p,o,n,t);++w}C.a.cc(z,new Z.pC())
return z}}},pC:{"^":"a:6;",
$2:function(a,b){return J.bD(b.gdI(),a.gdI())}},au:{"^":"d;h:a<,aS:b<,c,fX:d<,dI:e<,f,r,hh:x<,fU:y@,fW:z<,$ti",
gad:function(){return this.f},
sad:function(a){if(!J.e(this.f,a)){this.f=a
this.y=!0
$.cr=!0}},
gdf:function(){return this.r},
gb8:function(){return this.c.$1(this.f)},
E:function(){return P.ad(["name",this.a,"value",this.f,"show",this.r])},
hC:function(a){var z
this.sad(H.iI(a.j(0,"value"),H.l(this,0)))
z=a.j(0,"show")
if(!J.e(this.r,z)){this.r=z
this.y=!0
$.cr=!0}},
$ise6:1,
v:{
bQ:function(a,b,c,d,e,f,g,h){var z,y
z=$.$get$d4()
y=z.ac(a)?H.aL(z.j(0,a),"$isau",[h],"$asau"):new Z.au(a,d,b,c,f,null,null,!0,!1,"Stat",[null])
y.f=H.iI(e,h)
y.r=!0
z.n(0,a,y)
return y},
oH:function(){var z,y
z=new Z.oE(new H.R(0,null,null,null,null,null,0,[P.r,Z.d3]))
y=$.$get$d4().gcv()
new H.K(y,new Z.oI(),[H.y(y,"B",0)]).Z(0,new Z.oJ(z))
$.cr=!1
return z},
bR:function(){var z=H.p([],[[P.I,P.r,P.d]])
$.$get$d4().gcv().Z(0,new Z.oG(z))
return z}}},oI:{"^":"a:0;",
$1:function(a){return a.gfU()}},oJ:{"^":"a:26;a",
$1:function(a){var z,y
z=a.gdf()
y=a.gb8()
a.sfU(!1)
this.a.a.n(0,a.a,new Z.d3(z,y))}},oG:{"^":"a:26;a",
$1:function(a){var z=new H.R(0,null,null,null,null,null,0,[P.r,P.d])
z.n(0,"name",a.gh())
z.n(0,"description",a.gaS())
z.n(0,"color",a.gfX())
z.n(0,"priority",a.gdI())
z.n(0,"show",a.gdf())
z.n(0,"notifyOnChange",a.ghh())
z.n(0,"string",a.gb8())
this.a.push(z)}}}],["","",,N,{"^":"",dN:{"^":"d;h:a<,b,c,iv:d<,e,f",
gh4:function(){var z,y,x
z=this.b
y=z==null||J.e(z.gh(),"")
x=this.a
return y?x:z.gh4()+"."+x},
geP:function(){if($.ir){var z=this.b
if(z!=null)return z.geP()}return $.rF},
kx:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p,o
x=a.b
if(x>=this.geP().b){if(!!J.o(b).$isbH)b=b.$0()
w=b
if(typeof w!=="string"){v=b
b=J.h(b)}else v=null
if(d==null&&x>=$.uY.b)try{x="autogenerated stack trace for "+a.k(0)+" "+H.b(b)
throw H.c(x)}catch(u){z=H.C(u)
y=H.E(u)
d=y
if(c==null)c=z}e=$.q
x=b
w=this.gh4()
t=c
s=d
r=Date.now()
q=$.fs
$.fs=q+1
p=new N.mt(a,x,v,w,new P.cO(r,!1),q,t,s,e)
if($.ir)for(o=this;o!=null;){o.fG(p)
o=o.b}else $.$get$fu().fG(p)}},
cn:function(a,b,c,d){return this.kx(a,b,c,d,null)},
jY:function(a,b,c){return this.cn(C.V,a,b,c)},
ak:function(a){return this.jY(a,null,null)},
jX:function(a,b,c){return this.cn(C.U,a,b,c)},
bm:function(a){return this.jX(a,null,null)},
jW:function(a,b,c){return this.cn(C.W,a,b,c)},
bO:function(a){return this.jW(a,null,null)},
ke:function(a,b,c){return this.cn(C.B,a,b,c)},
hb:function(a){return this.ke(a,null,null)},
l7:function(a,b,c){return this.cn(C.Z,a,b,c)},
f1:function(a){return this.l7(a,null,null)},
hY:function(a,b,c){return this.cn(C.Y,a,b,c)},
dX:function(a){return this.hY(a,null,null)},
fG:function(a){},
v:{
bn:function(a){return $.$get$ft().kK(a,new N.tp(a))}}},tp:{"^":"a:2;a",
$0:function(){var z,y,x,w
z=this.a
if(C.b.dg(z,"."))H.i(P.G("name shouldn't start with a '.'"))
y=C.b.ku(z,".")
if(y===-1)x=z!==""?N.bn(""):null
else{x=N.bn(C.b.aL(z,0,y))
z=C.b.bJ(z,y+1)}w=new H.R(0,null,null,null,null,null,0,[P.r,N.dN])
w=new N.dN(z,x,null,w,new P.hz(w,[null,null]),null)
if(x!=null)x.giv().n(0,z,w)
return w}},b0:{"^":"d;h:a<,ad:b<",
A:function(a,b){if(b==null)return!1
return b instanceof N.b0&&this.b===b.b},
aZ:function(a,b){return C.e.aZ(this.b,b.gad())},
d9:function(a,b){var z=b.gad()
if(typeof z!=="number")return H.x(z)
return this.b<=z},
bi:function(a,b){var z=b.gad()
if(typeof z!=="number")return H.x(z)
return this.b>z},
bS:function(a,b){return this.b>=b.gad()},
bD:function(a,b){var z=b.gad()
if(typeof z!=="number")return H.x(z)
return this.b-z},
gB:function(a){return this.b},
k:function(a){return this.a},
$isV:1,
$asV:function(){return[N.b0]}},mt:{"^":"d;eP:a<,b,aV:c<,d,V:e<,f,bu:r<,bq:x<,y",
k:function(a){return"["+this.a.a+"] "+this.d+": "+H.b(this.b)}}}],["","",,X,{"^":"",
bC:function(a){return X.de(J.iU(a,0,new X.uB()))},
b3:function(a,b){var z=J.ao(a,b)
if(typeof z!=="number")return H.x(z)
a=536870911&z
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
de:function(a){if(typeof a!=="number")return H.x(a)
a=536870911&a+((67108863&a)<<3)
a^=a>>>11
return 536870911&a+((16383&a)<<15)},
uB:{"^":"a:6;",
$2:function(a,b){return X.b3(a,J.j(b))}},
dV:{"^":"ce;a,$ti",
gad:function(){var z=this.a
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
if(b instanceof X.dV){z=b.a
y=this.a
y=z==null?y==null:z===y
z=y}else z=!1
return z},
k:function(a){var z=this.a
return z==null?"Optional { absent }":"Optional { value: "+H.b(z)+" }"},
i9:function(a,b){if(this.a==null)throw H.c(P.G("Must not be null."))},
v:{
fE:function(a,b){var z=new X.dV(a,[b])
z.i9(a,b)
return z}}}}],["","",,U,{"^":"",d_:{"^":"d;a,b",
k:function(a){return this.b}},cp:{"^":"d;a,l8:b<",
geM:function(){return this.a===C.G},
k:function(a){return"SessionResult<"+this.a.b+",wasRerolled="+H.b(this.b)+">"},
A:function(a,b){if(b==null)return!1
return b instanceof U.cp&&b.a===this.a&&J.e(b.b,this.b)},
gB:function(a){return(this.b===!0?2:1)*100+this.a.a}}}],["","",,X,{"^":"",
xC:[function(a,b){var z,y,x,w,v
z=new D.m2(b,null,null,null,null,null,null,null)
y=$.fP
$.fP=y+1
x=new H.cn(y,null,!1)
w=init.globalState.d
w.e1(y,x)
w.cM()
w=new H.nz(x,null)
w.ib(x)
z.b=w
w=w.b
w.toString
new P.d7(w,[H.l(w,0)]).aI(z.giV(),null,null,null)
b.F(new H.cv(z.b.a,init.globalState.d.a))
v=N.nW()
z.c=v
v.Q=z},"$2","ib",4,0,36]},1]]
setupProgram(dart,0)
J.o=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.fi.prototype
return J.fh.prototype}if(typeof a=="string")return J.ci.prototype
if(a==null)return J.fj.prototype
if(typeof a=="boolean")return J.fg.prototype
if(a.constructor==Array)return J.cg.prototype
if(!(a instanceof P.d))return J.bt.prototype
return a}
J.aJ=function(a){if(a==null)return a
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
J.ey=function(a){if(typeof a=="number")return J.ch.prototype
if(typeof a=="string")return J.ci.prototype
if(a==null)return a
if(!(a instanceof P.d))return J.bt.prototype
return a}
J.bh=function(a){if(typeof a=="string")return J.ci.prototype
if(a==null)return a
if(!(a instanceof P.d))return J.bt.prototype
return a}
J.ao=function(a,b){if(typeof a=="number"&&typeof b=="number")return a+b
return J.ey(a).ai(a,b)}
J.b5=function(a,b){if(typeof a=="number"&&typeof b=="number")return a/b
return J.am(a).d7(a,b)}
J.e=function(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.o(a).A(a,b)}
J.aa=function(a,b){if(typeof a=="number"&&typeof b=="number")return a>b
return J.am(a).bi(a,b)}
J.c1=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<b
return J.am(a).aZ(a,b)}
J.c2=function(a,b){if(typeof a=="number"&&typeof b=="number")return a*b
return J.ey(a).c9(a,b)}
J.iS=function(a){if(typeof a=="number")return-a
return J.am(a).f5(a)}
J.bD=function(a,b){if(typeof a=="number"&&typeof b=="number")return a-b
return J.am(a).as(a,b)}
J.az=function(a,b){if(typeof b==="number")if(a.constructor==Array||typeof a=="string")if(b>>>0===b&&b<a.length)return a[b]
return J.L(a).j(a,b)}
J.dq=function(a,b){return J.aJ(a).q(a,b)}
J.iT=function(a,b,c,d,e,f,g,h,i,j,k,l,m,n){return J.aJ(a).ji(a,b,c,d,e,f,g,h,i,j,k,l,m,n)}
J.eN=function(a,b,c){return J.aJ(a).t(a,b,c)}
J.bE=function(a,b){return J.ey(a).bD(a,b)}
J.eO=function(a,b){return J.L(a).a7(a,b)}
J.eP=function(a,b){return J.aJ(a).at(a,b)}
J.iU=function(a,b,c){return J.aJ(a).bv(a,b,c)}
J.j=function(a){return J.o(a).gB(a)}
J.eQ=function(a){return J.L(a).gX(a)}
J.ai=function(a){return J.aJ(a).ga_(a)}
J.iV=function(a){return J.aJ(a).gw(a)}
J.aM=function(a){return J.L(a).gl(a)}
J.iW=function(a){return J.o(a).gby(a)}
J.iX=function(a,b){return J.L(a).b1(a,b)}
J.eR=function(a,b){return J.aJ(a).aJ(a,b)}
J.iY=function(a,b,c){return J.bh(a).he(a,b,c)}
J.dr=function(a,b,c){return J.bh(a).kO(a,b,c)}
J.cD=function(a,b,c){return J.bh(a).d_(a,b,c)}
J.iZ=function(a){return J.am(a).hv(a)}
J.j_=function(a,b){return J.aJ(a).dZ(a,b)}
J.eS=function(a,b){return J.bh(a).dg(a,b)}
J.j0=function(a,b,c){return J.bh(a).aL(a,b,c)}
J.j1=function(a){return J.aJ(a).bG(a)}
J.h=function(a){return J.o(a).k(a)}
J.c3=function(a,b){return J.am(a).bh(a,b)}
J.j2=function(a,b){return J.aJ(a).c7(a,b)}
I.aY=function(a){a.immutable$list=Array
a.fixed$length=Array
return a}
var $=I.p
C.N=J.b_.prototype
C.a=J.cg.prototype
C.O=J.fg.prototype
C.u=J.fh.prototype
C.e=J.fi.prototype
C.P=J.fj.prototype
C.j=J.ch.prototype
C.b=J.ci.prototype
C.H=new A.ap(0,0,0)
C.I=new A.ap(-1/0,-1/0,-1/0)
C.J=new A.cF(-10,0,100)
C.K=new H.l6([null])
C.L=new P.mW()
C.v=new P.qx()
C.M=new P.qQ()
C.i=new P.r4()
C.x=new P.b8(0)
C.y=new U.cT(0,"ItemType.fist")
C.z=new U.cT(1,"ItemType.shield")
C.r=new U.cT(2,"ItemType.spear")
C.A=new U.cT(3,"ItemType.sword")
C.Q=function getTagFallback(o) {
  var s = Object.prototype.toString.call(o);
  return s.substring(8, s.length - 1);
}
C.w=new P.m7(null,null)
C.R=new P.m9(null)
C.S=new P.ma(null,null)
C.T=new O.mi(0,"KnownToMode.all")
C.U=new N.b0("FINER",400)
C.V=new N.b0("FINEST",300)
C.W=new N.b0("FINE",500)
C.B=new N.b0("INFO",800)
C.X=new N.b0("OFF",2000)
C.Y=new N.b0("SEVERE",1000)
C.Z=new N.b0("WARNING",900)
C.G=new U.d_(0,"Result.success")
C.a6=new U.d_(1,"Result.failure")
C.a7=new U.d_(2,"Result.criticalSuccess")
C.a8=new U.d_(3,"Result.criticalFailure")
C.C=I.aY([C.G,C.a6,C.a7,C.a8])
C.a_=I.aY(["cave_with_agruth","guardpost_above_church","orcthorn_room","slave_quarters_passage","smelter","underground_church","war_forge"])
C.a0=I.aY([C.y])
C.a1=I.aY([C.z])
C.D=I.aY([C.r])
C.o=I.aY([C.A])
C.d=I.aY([])
C.a2=I.aY(['Briana spits on the floor. "Can\'t wait to see some actual architecture \n  when we get out of here."',"Somewhere in the distance, there are yells that rise in intensity, \n  then suddenly stop entirely.",'Briana turns to you with an intense whisper. \n  "You know, I _have_ a right to hate orcs." \n  \n  "I didn\'t know people need to have a right to hate them, to be honest." \n  \n  She observes you for a moment. "I\'m glad we are in agreement."',"More yells from the distance.","Briana stops and listens for a moment. \"Aren, we're pushing our luck. \n  I'd hate to go all this way only to get \n  my head smashed in by some random orc patrol."])
C.E=new H.k8(0,{},C.d,[null,null])
C.a3=new X.dV(null,[P.M])
C.k=new R.dY(0,"Pose.standing")
C.h=new R.dY(1,"Pose.offBalance")
C.f=new R.dY(2,"Pose.onGround")
C.l=new K.dZ(0,"Predetermination.none")
C.p=new K.dZ(1,"Predetermination.successGuaranteed")
C.m=new K.dZ(2,"Predetermination.failureGuaranteed")
C.t=new Y.ck("he","him","his","himself")
C.n=new Y.ck("it","it","its","itself")
C.a4=new Y.ck("she","her","her","herself")
C.a5=new Y.ck("they","them","their","themselves")
C.F=new Y.ck("you","you","your","yourself")
C.c=new Q.nE(0,"Resource.stamina")
C.a9=H.bf("fk")
C.aa=H.bf("at")
C.ab=H.bf("r")
C.ac=H.bf("X")
C.ad=H.bf("aX")
C.q=H.bf("dynamic")
C.ae=H.bf("t")
C.af=H.bf("M")
C.ag=new P.bU(null,2)
$.fP=1
$.fI="$cachedFunction"
$.fJ="$cachedInvocation"
$.aN=0
$.bF=null
$.eX=null
$.bw=null
$.bX=null
$.bY=null
$.eo=!1
$.q=C.i
$.f9=0
$.ez=null
$.hT=!1
$.rx=null
$.hV=!1
$.is=!0
$.cr=!1
$.ir=!1
$.uY=C.X
$.rF=C.B
$.fs=0
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
I.$lazy(y,x,w)}})(["fd","$get$fd",function(){return H.m0()},"fe","$get$fe",function(){if(typeof WeakMap=="function")var z=new WeakMap()
else{z=$.f9
$.f9=z+1
z="expando$key$"+z}return new P.lc(null,z,[P.t])},"hl","$get$hl",function(){return H.aR(H.d6({
toString:function(){return"$receiver$"}}))},"hm","$get$hm",function(){return H.aR(H.d6({$method$:null,
toString:function(){return"$receiver$"}}))},"hn","$get$hn",function(){return H.aR(H.d6(null))},"ho","$get$ho",function(){return H.aR(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"hs","$get$hs",function(){return H.aR(H.d6(void 0))},"ht","$get$ht",function(){return H.aR(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"hq","$get$hq",function(){return H.aR(H.hr(null))},"hp","$get$hp",function(){return H.aR(function(){try{null.$method$}catch(z){return z.message}}())},"hv","$get$hv",function(){return H.aR(H.hr(void 0))},"hu","$get$hu",function(){return H.aR(function(){try{(void 0).$method$}catch(z){return z.message}}())},"ee","$get$ee",function(){return P.qf()},"bm","$get$bm",function(){var z,y
z=P.at
y=new P.H(0,P.pS(),null,[z])
y.ik(null,z)
return y},"bZ","$get$bZ",function(){return[]},"di","$get$di",function(){return new K.cc("fist",P.aB(C.a0,null))},"bL","$get$bL",function(){return N.bn("PlannerRecommendation")},"id","$get$id",function(){return new K.rR()},"ew","$get$ew",function(){var z=$.$get$id()
return K.a0("__END_OF_ROAM__",z,z,null,null,[],"ground")},"a8","$get$a8",function(){return P.e3(null)},"bN","$get$bN",function(){return P.e3(null)},"iu","$get$iu",function(){return N.bn("Storyline")},"h9","$get$h9",function(){return P.bq("(\\w)([\\.\\?\\!])([\"'])\\.(?=$|\\s)",!0,!1)},"bA","$get$bA",function(){return L.ed(new L.tn())},"aZ","$get$aZ",function(){return L.ed(new L.tt())},"dl","$get$dl",function(){return L.ed(new L.tm())},"dW","$get$dW",function(){return new F.n0("Sometimes, patience pays off. Especially when the other option is potentially dangerous.",!1,!0,!1,null,null)},"eu","$get$eu",function(){return Y.c8(!1,"balance",!0,C.n,$.$get$aZ())},"iz","$get$iz",function(){return Y.c8(!1,"pounding",!1,C.n,$.$get$aZ())},"fQ","$get$fQ",function(){return new B.nC("Most moves are easier and more effective when you are firmly in balance.",!1,!0,!1,null,null)},"fU","$get$fU",function(){return new O.nS(null,!1,!0,!1,null,null)},"h8","$get$h8",function(){return new Q.oA(null,!1,!0,!0,C.c,null)},"hy","$get$hy",function(){return new M.pD("",!0,C.c,!1,!0,null)},"hU","$get$hU",function(){return P.e3(null)},"eW","$get$eW",function(){return new Z.jB(!1,!0,!1,null,null)},"iL","$get$iL",function(){return Y.c8(!1,"swing",!0,C.n,$.$get$aZ())},"iK","$get$iK",function(){return Y.c8(!1,"swing",!0,C.n,$.$get$aZ())},"iJ","$get$iJ",function(){return Y.c8(!1,"swing",!0,C.n,$.$get$aZ())},"fG","$get$fG",function(){return X.fE(0,P.M)},"fH","$get$fH",function(){return X.fE(1,P.M)},"h2","$get$h2",function(){return new D.ow(!1,!1,!0,null,null)},"iw","$get$iw",function(){return G.pe(!1,!0,"Orcthorn",!0,2,2)},"et","$get$et",function(){return new O.pE(1e4)},"i7","$get$i7",function(){return K.a0("cave_with_agruth_pre",new V.ti(),new V.tj(),null,null,H.p([new Q.v("cave_with_agruth","","You look around.",null)],[Q.v]),"ground")},"i6","$get$i6",function(){return K.a0("cave_with_agruth",new V.tg(),new V.th(),null,null,H.p([new Q.v("underground_church","Go to the Unholy Church","You make it to the Church undetected.",null),new Q.v("war_forge","Go to the war forges","You sneak your way through the black passage, closing towards the sound of hundreds of anvils.",null),new Q.v("slave_quarters_passage","Go to the slave quarters","You and Briana hug the wall and start towards the slave quarters.",null)],[Q.v]),"ground")},"fV","$get$fV",function(){return new V.oh("Search Agruth","search_agruth",!0,null)},"ie","$get$ie",function(){return K.a0("exit_from_bloodrock",new V.te(),new V.tf(),null,null,H.p([new Q.v("__END_OF_ROAM__"," (UNIMPLEMENTED)","...",null)],[Q.v]),"ground")},"ig","$get$ig",function(){return K.a0("forge_church_crevice",new V.tb(),new V.tc(),null,null,H.p([new Q.v("tunnel","Continue along the crevice","You continue until the crevice open into a tunnel. You can smell fresh air.",null)],[Q.v]),"ground")},"iq","$get$iq",function(){return K.a0("guardpost_above_church",new V.t9(),new V.ta(),null,null,H.p([new Q.v("underground_church","Descend towards the Underground Church","You take the passage leading down towards the temple.",null),new Q.v("tunnel","Go to the upper gate","You take the passage that leads upwards.",null),new Q.v("smelter","Go to the smelter","You take the slightly downwards passage towards the smelter.",null)],[Q.v]),"ground")},"fc","$get$fc",function(){return new V.lG("Cautiously take the shield","guardpost_above_church_take_shield",!0,null)},"it","$get$it",function(){return K.a0("just_after_agruth_fight",new V.t7(),new V.t8(),null,null,H.p([],[Q.v]),"ground")},"fx","$get$fx",function(){return new V.mC('"Luck Bringer"',"name_agruth_sword_opportunity",!0,null)},"fy","$get$fy",function(){return new V.mD('"Savior"',"name_agruth_sword_redemption",!0,null)},"fw","$get$fw",function(){return new V.mB("No name","name_agruth_sword_nothing",!0,null)},"ix","$get$ix",function(){return K.a0("orcthorn_door",new V.t5(),new V.t6(),null,null,H.p([new Q.v("cave_with_agruth","Go to the cave with Agruth's corpse","You back out from the door, and go back where you left Agruth's body.",null),new Q.v("slave_quarters","Go further towards the Gate of Screams","TODO",null),new Q.v("orcthorn_room","Open the door","You open the door.",null)],[Q.v]),"ground")},"iy","$get$iy",function(){return K.a0("orcthorn_room",new V.t3(),new V.t4(),O.wH(),null,H.p([new Q.v("orcthorn_door","Exit the room","You go through the door. Once back in the corridor of the slave quarters, you close it behind you.",null)],[Q.v]),"ground")},"he","$get$he",function(){return new V.pm("Search for Orcthorn","take_orcthorn",!0,null)},"iA","$get$iA",function(){return K.a0("slave_quarters",new V.t0(),new V.t1(),null,null,H.p([],[Q.v]),"ground")},"h0","$get$h0",function(){return new V.ou("Continue","slave_quarters_continue",!0,null)},"iB","$get$iB",function(){return K.a0("slave_quarters_passage",new V.rZ(),new V.t_(),O.wI(),null,H.p([new Q.v("cave_with_agruth","Go back to the cave with Agruth's corpse","You back out from the door, and go back where you left Agruth's body.",null),new Q.v("slave_quarters","Go further towards the Gate of Screams","TODO",null),new Q.v("orcthorn_room","Open the door","You open the door.",null)],[Q.v]),"ground")},"h1","$get$h1",function(){return new V.ov("Examine the door","slave_quarters_passage_examine_door",!0,null)},"iC","$get$iC",function(){return K.a0("smelter",new V.rX(),new V.rY(),null,null,H.p([new Q.v("war_forge","Go to the war forges","You walk through a short passage set in stone, towards the sound of hundreds of anvils.",null),new Q.v("guardpost_above_church","Go through the smooth passage","You take the smooth passage and it leads you slightly upwards.",null)],[Q.v]),"ground")},"h3","$get$h3",function(){return new V.oy("Look around","smelter_look_around",!0,null)},"h4","$get$h4",function(){return new V.oz("Throw spear at the ogre","smelter_throw_spear",!0,null)},"iD","$get$iD",function(){return K.a0("start_adventure",new V.rV(),new V.rW(),O.wF(),null,H.p([new Q.v("just_after_agruth_fight","","You look around. Fortunately, nobody is in sight.",null)],[Q.v]),"ground")},"hg","$get$hg",function(){return new V.po("Talk to Briana","talk_to_briana_1",!0,null)},"hh","$get$hh",function(){return new V.pp("Talk to Briana","talk_to_briana_2",!0,null)},"hi","$get$hi",function(){return new V.pq("Talk to Briana","talk_to_briana_3",!0,null)},"iM","$get$iM",function(){return K.a0("the_shafts",new V.rT(),new V.rU(),null,null,H.p([new Q.v("tunnel","Run","You run over the passage. Orcs start to scream and yell commands. As you near the entrance, the air gets better.",null)],[Q.v]),"ground")},"iO","$get$iO",function(){return K.a0("tunnel",new V.tK(),new V.tL(),O.wG(),null,H.p([new Q.v("exit_from_bloodrock","Start running again","You start running again.",null)],[Q.v]),"ground")},"iP","$get$iP",function(){return K.a0("underground_church",new V.tz(),new V.tJ(),null,null,H.p([new Q.v("guardpost_above_church","Enter the passage","You take the sloping passage and go a long, slightly rising way.",null),new Q.v("cave_with_agruth","Go back to the cave with Agruth's corpse","You sneak out of the church, back towards where you left Agruth's body.",null),new Q.v("underground_church_altar","Go towards the altar","You sneak towards the front of the temple, trying to stay in the shadows.",null)],[Q.v]),"ground")},"f8","$get$f8",function(){return new V.lb("Look around","examine_underground_church",!0,null)},"iQ","$get$iQ",function(){return K.a0("underground_church_altar",new V.td(),new V.to(),null,null,H.p([new Q.v("underground_church","Sneak back","You crouch low and, keeping an eye on the altar, head back to the Church's entrance.",null)],[Q.v]),"ground")},"hA","$get$hA",function(){return new V.pG("Wait","wait_for_ritual",!0,null)},"hf","$get$hf",function(){return new V.pn("Take the spear","take_spear_in_underground_church",!0,null)},"iR","$get$iR",function(){return K.a0("war_forge",new V.rS(),new V.t2(),null,null,H.p([new Q.v("smelter","Go to smelter","You keep low, ascending the stairs. At the top you sense a draft of hot air coming from a passage through the wall. You make your way through it.",null),new Q.v("cave_with_agruth","Go back to the cave with Agruth's corpse","You sneak back towards where you left Agruth's body.",null)],[Q.v]),"ground")},"hB","$get$hB",function(){return new V.pH("Look around","war_forge_look_around",!0,null)},"hC","$get$hC",function(){return new V.pI("Watch the workers","war_forge_watch_workers",!0,null)},"i1","$get$i1",function(){return H.p([$.$get$i7(),$.$get$i6(),$.$get$ie(),$.$get$ig(),$.$get$iq(),$.$get$it(),$.$get$ix(),$.$get$iy(),$.$get$iA(),$.$get$iB(),$.$get$iC(),$.$get$iD(),$.$get$iM(),$.$get$iO(),$.$get$iP(),$.$get$iQ(),$.$get$iR()],[K.co])},"i0","$get$i0",function(){return H.p([$.$get$fV(),$.$get$fc(),$.$get$fx(),$.$get$fy(),$.$get$fw(),$.$get$he(),$.$get$h0(),$.$get$h1(),$.$get$h3(),$.$get$h4(),$.$get$hg(),$.$get$hh(),$.$get$hi(),$.$get$f8(),$.$get$hA(),$.$get$hf(),$.$get$hB(),$.$get$hC()],[A.W])},"dp","$get$dp",function(){return P.pc("")},"cy","$get$cy",function(){var z=new O.nd(0,null,"PointsCounter")
z.ia()
return z},"c_","$get$c_",function(){return new L.f1(null,H.p([],[L.ab]))},"cC","$get$cC",function(){return H.fn(P.r,P.d)},"cx","$get$cx",function(){return P.bb(null,{func:1,ret:[P.Q,P.at]})},"cM","$get$cM",function(){return P.bq("^\\s*<<<\\s*$",!0,!1)},"d4","$get$d4",function(){return H.fn(P.r,Z.au)},"fu","$get$fu",function(){return N.bn("")},"ft","$get$ft",function(){return P.dL(P.r,N.dN)}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=[null,!1]
init.types=[{func:1,args:[,]},{func:1,ret:P.r,args:[R.A,A.a3,Y.a2]},{func:1},{func:1,args:[,,,]},{func:1,ret:Q.z,args:[R.A]},{func:1,args:[R.A,A.a3,Y.a2]},{func:1,args:[,,]},{func:1,v:true},{func:1,v:true,args:[R.A,A.a3,Y.a2,R.A,S.ae]},{func:1,args:[P.t]},{func:1,v:true,args:[R.A,A.a3,Y.a2,R.A,,]},{func:1,ret:U.cR,args:[A.a3,F.J,[P.B,R.A]]},{func:1,args:[U.ca]},{func:1,ret:P.r,args:[P.t]},{func:1,v:true,args:[{func:1,v:true}]},{func:1,v:true,args:[P.r]},{func:1,args:[,P.b2]},{func:1,v:true,args:[P.d],opt:[P.b2]},{func:1,args:[P.aX]},{func:1,ret:P.Q},{func:1,v:true,args:[P.d]},{func:1,ret:Y.aO,args:[P.t]},{func:1,ret:P.r,args:[P.r]},{func:1,args:[R.A]},{func:1,ret:R.A,args:[A.a3]},{func:1,args:[,,,,]},{func:1,args:[Z.au]},{func:1,ret:P.M,args:[A.ap]},{func:1,ret:Q.cd,args:[U.ac]},{func:1,args:[P.M,R.A]},{func:1,args:[,],opt:[,]},{func:1,ret:P.X,args:[R.A,R.A]},{func:1,args:[P.X]},{func:1,ret:P.M,args:[A.cF]},{func:1,v:true,args:[P.t]},{func:1,ret:P.X,args:[L.ab]},{func:1,v:true,args:[[P.N,P.r],P.fW]},{func:1,args:[L.ab]},{func:1,args:[P.r,,]},{func:1,args:[P.r,Z.d3]},{func:1,args:[P.t,,]},{func:1,v:true,args:[,P.b2]},{func:1,ret:P.t,args:[P.V,P.V]},{func:1,args:[[P.N,Y.ah],Y.ah]},{func:1,ret:P.M,args:[P.M,P.M]},{func:1,ret:P.t,args:[P.t,P.t]},{func:1,args:[Y.ah]},{func:1,args:[P.bo]},{func:1,args:[{func:1,v:true}]},{func:1,v:true,args:[P.d,P.b2]},{func:1,ret:Q.c9,args:[Q.v]},{func:1,ret:P.r,args:[Q.ag]},{func:1,ret:P.X,args:[P.t]},{func:1,ret:L.ab,args:[P.r],named:{deferToChoiceList:P.X,deferToEndOfPage:P.X,goto:P.r,helpMessage:P.r,script:{func:1,ret:[P.Q,P.at]},submenu:P.r}},{func:1,ret:[P.Q,U.cp],args:[P.aX,P.r],named:{rerollEffectDescription:P.r,rerollable:P.X}}]
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
if(x==y)H.wB(d||a)
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
if(typeof dartMainRunner==="function")dartMainRunner(function(b){H.iE(X.ib(),b)},[])
else (function(b){H.iE(X.ib(),b)})([])})})()