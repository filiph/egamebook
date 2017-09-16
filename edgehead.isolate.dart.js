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
e.$callName=null}}function tearOffGetter(c,d,e,f){return f?new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"(x) {"+"if (c === null) c = "+"H.et"+"("+"this, funcs, reflectionInfo, false, [x], name);"+"return new c(this, funcs[0], x, name);"+"}")(c,d,e,H,null):new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"() {"+"if (c === null) c = "+"H.et"+"("+"this, funcs, reflectionInfo, false, [], name);"+"return new c(this, funcs[0], null, name);"+"}")(c,d,e,H,null)}function tearOff(c,d,e,f,a0){var g
return e?function(){if(g===void 0)g=H.et(this,c,d,true,[],f).prototype
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
var dart=[["","",,H,{"^":"",wW:{"^":"d;a"}}],["","",,J,{"^":"",
o:function(a){return void 0},
aZ:{"^":"d;",
A:function(a,b){return a===b},
gB:function(a){return H.aD(a)},
k:function(a){return H.cZ(a)},
gby:function(a){return new H.av(H.io(a),null)}},
ff:{"^":"aZ;",
k:function(a){return String(a)},
gB:function(a){return a?519018:218159},
gby:function(a){return C.ac},
$isa2:1},
fi:{"^":"aZ;",
A:function(a,b){return null==b},
k:function(a){return"null"},
gB:function(a){return 0},
gby:function(a){return C.aa},
$isas:1},
fl:{"^":"aZ;",
gB:function(a){return 0},
gby:function(a){return C.a9},
k:function(a){return String(a)},
$isfj:1},
x2:{"^":"fl;"},
bt:{"^":"fl;"},
cf:{"^":"aZ;$ti",
fU:function(a,b){if(!!a.immutable$list)throw H.c(new P.S(b))},
cP:function(a,b){if(!!a.fixed$length)throw H.c(new P.S(b))},
q:function(a,b){this.cP(a,"add")
a.push(b)},
hp:function(a){this.cP(a,"removeLast")
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
if(a.length!==y)throw H.c(new P.C(a))}v=z.length
if(v===y)return
this.sl(a,v)
for(x=0;x<z.length;++x)a[x]=z[x]},
c6:function(a,b){return new H.L(a,b,[H.m(a,0)])},
aw:function(a,b){var z
this.cP(a,"addAll")
for(z=J.ai(b);z.u();)a.push(z.d)},
Z:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){b.$1(a[y])
if(a.length!==z)throw H.c(new P.C(a))}},
aH:function(a,b){return new H.ap(a,b,[H.m(a,0),null])},
dZ:function(a,b){return H.hc(a,b,null,H.m(a,0))},
bv:function(a,b,c){var z,y,x
z=a.length
for(y=b,x=0;x<z;++x){y=c.$2(y,a[x])
if(a.length!==z)throw H.c(new P.C(a))}return y},
aR:function(a,b,c){var z,y,x
z=a.length
for(y=0;y<z;++y){x=a[y]
if(b.$1(x)===!0)return x
if(a.length!==z)throw H.c(new P.C(a))}throw H.c(H.aj())},
cj:function(a,b){return this.aR(a,b,null)},
as:function(a,b){if(b>>>0!==b||b>=a.length)return H.f(a,b)
return a[b]},
geH:function(a){if(a.length>0)return a[0]
throw H.c(H.aj())},
gw:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.c(H.aj())},
gca:function(a){var z=a.length
if(z===1){if(0>=z)return H.f(a,0)
return a[0]}if(z===0)throw H.c(H.aj())
throw H.c(H.dB())},
b6:function(a,b,c,d,e){var z,y,x
this.fU(a,"setRange")
P.cl(b,c,a.length,null,null,null)
z=c-b
if(z===0)return
if(e<0)H.i(P.a6(e,0,null,"skipCount",null))
if(e+z>d.length)throw H.c(H.fe())
if(e<b)for(y=z-1;y>=0;--y){x=e+y
if(x>>>0!==x||x>=d.length)return H.f(d,x)
a[b+y]=d[x]}else for(y=0;y<z;++y){x=e+y
if(x>>>0!==x||x>=d.length)return H.f(d,x)
a[b+y]=d[x]}},
bs:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){if(b.$1(a[y])===!0)return!0
if(a.length!==z)throw H.c(new P.C(a))}return!1},
cb:function(a,b){var z
this.fU(a,"sort")
z=b==null?P.tO():b
H.cp(a,0,a.length-1,z)},
f8:function(a){return this.cb(a,null)},
bP:function(a,b,c){var z
if(c>=a.length)return-1
for(z=c;z<a.length;++z)if(J.e(a[z],b))return z
return-1},
b_:function(a,b){return this.bP(a,b,0)},
a7:function(a,b){var z
for(z=0;z<a.length;++z)if(J.e(a[z],b))return!0
return!1},
gW:function(a){return a.length===0},
gat:function(a){return a.length!==0},
k:function(a){return P.ce(a,"[","]")},
bG:function(a){return P.b9(a,H.m(a,0))},
ga_:function(a){return new J.bk(a,a.length,0,null,[H.m(a,0)])},
gB:function(a){return H.aD(a)},
gl:function(a){return a.length},
sl:function(a,b){this.cP(a,"set length")
if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(P.cF(b,"newLength",null))
if(b<0)throw H.c(P.a6(b,0,null,"newLength",null))
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
$isZ:1},
wV:{"^":"cf;$ti"},
bk:{"^":"d;a,b,c,d,$ti",
gS:function(){return this.d},
u:function(){var z,y,x
z=this.a
y=z.length
if(this.b!==y)throw H.c(H.ar(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z[x]
this.c=x+1
return!0}},
cg:{"^":"aZ;",
bD:function(a,b){var z
if(typeof b!=="number")throw H.c(H.T(b))
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){z=this.gdC(b)
if(this.gdC(a)===z)return 0
if(this.gdC(a))return-1
return 1}return 0}else if(isNaN(a)){if(isNaN(b))return 0
return 1}else return-1},
gdC:function(a){return a===0?1/a<0:a<0},
hv:function(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw H.c(new P.S(""+a+".round()"))},
l0:function(a){return a},
bg:function(a,b){var z
if(b>20)throw H.c(P.a6(b,0,20,"fractionDigits",null))
z=a.toFixed(b)
if(a===0&&this.gdC(a))return"-"+z
return z},
l3:function(a,b){var z,y,x,w
if(b<2||b>36)throw H.c(P.a6(b,2,36,"radix",null))
z=a.toString(b)
if(C.b.cQ(z,z.length-1)!==41)return z
y=/^([\da-z]+)(?:\.([\da-z]+))?\(e\+(\d+)\)$/.exec(z)
if(y==null)H.i(new P.S("Unexpected toString result: "+z))
x=J.K(y)
z=x.j(y,1)
w=+x.j(y,3)
if(x.j(y,2)!=null){z+=x.j(y,2)
w-=x.j(y,2).length}return z+C.b.c8("0",w)},
k:function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gB:function(a){return a&0x1FFFFFFF},
f4:function(a){return-a},
ai:function(a,b){if(typeof b!=="number")throw H.c(H.T(b))
return a+b},
aq:function(a,b){if(typeof b!=="number")throw H.c(H.T(b))
return a-b},
d6:function(a,b){if(typeof b!=="number")throw H.c(H.T(b))
return a/b},
c8:function(a,b){if(typeof b!=="number")throw H.c(H.T(b))
return a*b},
bL:function(a,b){return(a|0)===a?a/b|0:this.ja(a,b)},
ja:function(a,b){var z=a/b
if(z>=-2147483648&&z<=2147483647)return z|0
if(z>0){if(z!==1/0)return Math.floor(z)}else if(z>-1/0)return Math.ceil(z)
throw H.c(new P.S("Result of truncating division is "+H.b(z)+": "+H.b(a)+" ~/ "+b))},
ds:function(a,b){var z
if(a>0)z=b>31?0:a>>>b
else{z=b>31?31:b
z=a>>z>>>0}return z},
aX:function(a,b){if(typeof b!=="number")throw H.c(H.T(b))
return a<b},
bo:function(a,b){if(typeof b!=="number")throw H.c(H.T(b))
return a>b},
d8:function(a,b){if(typeof b!=="number")throw H.c(H.T(b))
return a<=b},
bS:function(a,b){if(typeof b!=="number")throw H.c(H.T(b))
return a>=b},
gby:function(a){return C.af},
$isM:1},
fh:{"^":"cg;",
gby:function(a){return C.ae},
$isaW:1,
$isM:1,
$ist:1},
fg:{"^":"cg;",
gby:function(a){return C.ad},
$isaW:1,
$isM:1},
ch:{"^":"aZ;",
cQ:function(a,b){if(b<0)throw H.c(H.aI(a,b))
if(b>=a.length)H.i(H.aI(a,b))
return a.charCodeAt(b)},
cB:function(a,b){if(b>=a.length)throw H.c(H.aI(a,b))
return a.charCodeAt(b)},
du:function(a,b,c){if(c>b.length)throw H.c(P.a6(c,0,b.length,null,null))
return new H.rb(b,a,c)},
ez:function(a,b){return this.du(a,b,0)},
hd:function(a,b,c){var z,y
if(c<0||c>b.length)throw H.c(P.a6(c,0,b.length,null,null))
z=a.length
if(c+z>b.length)return
for(y=0;y<z;++y)if(this.cQ(b,c+y)!==this.cB(a,y))return
return new H.hb(c,b,a)},
ai:function(a,b){if(typeof b!=="string")throw H.c(P.cF(b,null,null))
return a+b},
eF:function(a,b){var z,y
z=b.length
y=a.length
if(z>y)return!1
return b===this.bJ(a,y-z)},
kO:function(a,b,c){H.bz(c)
return H.n(a,b,c)},
kP:function(a,b,c,d){H.bz(c)
P.nw(d,0,a.length,"startIndex",null)
return H.iH(a,b,c,d)},
d_:function(a,b,c){return this.kP(a,b,c,0)},
i2:function(a,b,c){var z
if(c>a.length)throw H.c(P.a6(c,0,a.length,null,null))
if(typeof b==="string"){z=c+b.length
if(z>a.length)return!1
return b===a.substring(c,z)}return J.iY(b,a,c)!=null},
df:function(a,b){return this.i2(a,b,0)},
aJ:function(a,b,c){if(c==null)c=a.length
if(typeof c!=="number"||Math.floor(c)!==c)H.i(H.T(c))
if(b<0)throw H.c(P.ck(b,null,null))
if(typeof c!=="number")return H.x(c)
if(b>c)throw H.c(P.ck(b,null,null))
if(c>a.length)throw H.c(P.ck(c,null,null))
return a.substring(b,c)},
bJ:function(a,b){return this.aJ(a,b,null)},
eZ:function(a){var z,y,x,w,v
z=a.trim()
y=z.length
if(y===0)return z
if(this.cB(z,0)===133){x=J.dC(z,1)
if(x===y)return""}else x=0
w=y-1
v=this.cQ(z,w)===133?J.m3(z,w):y
if(x===0&&v===y)return z
return z.substring(x,v)},
l4:function(a){var z,y
if(typeof a.trimLeft!="undefined"){z=a.trimLeft()
if(z.length===0)return z
y=this.cB(z,0)===133?J.dC(z,1):0}else{y=J.dC(a,0)
z=a}if(y===0)return z
if(y===z.length)return""
return z.substring(y)},
c8:function(a,b){var z,y
if(0>=b)return""
if(b===1||a.length===0)return a
if(b!==b>>>0)throw H.c(C.K)
for(z=a,y="";!0;){if((b&1)===1)y=z+y
b=b>>>1
if(b===0)break
z+=z}return y},
bP:function(a,b,c){var z
if(c>a.length)throw H.c(P.a6(c,0,a.length,null,null))
z=a.indexOf(b,c)
return z},
b_:function(a,b){return this.bP(a,b,0)},
kv:function(a,b,c){var z
c=a.length
z=b.length
if(c+z>c)c-=z
return a.lastIndexOf(b,c)},
ku:function(a,b){return this.kv(a,b,null)},
jA:function(a,b,c){if(b==null)H.i(H.T(b))
if(c>a.length)throw H.c(P.a6(c,0,a.length,null,null))
return H.wn(a,b,c)},
a7:function(a,b){return this.jA(a,b,0)},
gW:function(a){return a.length===0},
gat:function(a){return a.length!==0},
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
$isdW:1,
v:{
fk:function(a){if(a<256)switch(a){case 9:case 10:case 11:case 12:case 13:case 32:case 133:case 160:return!0
default:return!1}switch(a){case 5760:case 8192:case 8193:case 8194:case 8195:case 8196:case 8197:case 8198:case 8199:case 8200:case 8201:case 8202:case 8232:case 8233:case 8239:case 8287:case 12288:case 65279:return!0
default:return!1}},
dC:function(a,b){var z,y
for(z=a.length;b<z;){y=C.b.cB(a,b)
if(y!==32&&y!==13&&!J.fk(y))break;++b}return b},
m3:function(a,b){var z,y
for(;b>0;b=z){z=b-1
y=C.b.cQ(a,z)
if(y!==32&&y!==13&&!J.fk(y))break}return b}}}}],["","",,H,{"^":"",
hP:function(a){return a},
aj:function(){return new P.w("No element")},
dB:function(){return new P.w("Too many elements")},
fe:function(){return new P.w("Too few elements")},
cp:function(a,b,c,d){if(c-b<=32)H.h5(a,b,c,d)
else H.h4(a,b,c,d)},
h5:function(a,b,c,d){var z,y,x,w,v
for(z=b+1,y=J.K(a);z<=c;++z){x=y.j(a,z)
w=z
while(!0){if(!(w>b&&J.a9(d.$2(y.j(a,w-1),x),0)))break
v=w-1
y.n(a,w,y.j(a,v))
w=v}y.n(a,w,x)}},
h4:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
z=C.e.bL(c-b+1,6)
y=b+z
x=c-z
w=C.e.bL(b+c,2)
v=w-z
u=w+z
t=J.K(a)
s=t.j(a,y)
r=t.j(a,v)
q=t.j(a,w)
p=t.j(a,u)
o=t.j(a,x)
if(J.a9(d.$2(s,r),0)){n=r
r=s
s=n}if(J.a9(d.$2(p,o),0)){n=o
o=p
p=n}if(J.a9(d.$2(s,q),0)){n=q
q=s
s=n}if(J.a9(d.$2(r,q),0)){n=q
q=r
r=n}if(J.a9(d.$2(s,p),0)){n=p
p=s
s=n}if(J.a9(d.$2(q,p),0)){n=p
p=q
q=n}if(J.a9(d.$2(r,o),0)){n=o
o=r
r=n}if(J.a9(d.$2(r,q),0)){n=q
q=r
r=n}if(J.a9(d.$2(p,o),0)){n=o
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
if(h.aX(i,0)){if(k!==m){t.n(a,k,t.j(a,m))
t.n(a,m,j)}++m}else for(;!0;){i=d.$2(t.j(a,l),r)
h=J.al(i)
if(h.bo(i,0)){--l
continue}else{g=l-1
if(h.aX(i,0)){t.n(a,k,t.j(a,m))
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
t.n(a,m,j)}++m}else if(J.a9(d.$2(j,p),0))for(;!0;)if(J.a9(d.$2(t.j(a,l),p),0)){--l
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
H.cp(a,b,m-2,d)
H.cp(a,l+2,c,d)
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
break}}H.cp(a,m,l,d)}else H.cp(a,m,l,d)},
Z:{"^":"A;$ti"},
b0:{"^":"Z;$ti",
ga_:function(a){return new H.dL(this,this.gl(this),0,null,[H.y(this,"b0",0)])},
Z:function(a,b){var z,y
z=this.gl(this)
for(y=0;y<z;++y){b.$1(this.as(0,y))
if(z!==this.gl(this))throw H.c(new P.C(this))}},
gW:function(a){return this.gl(this)===0},
gw:function(a){if(this.gl(this)===0)throw H.c(H.aj())
return this.as(0,this.gl(this)-1)},
a7:function(a,b){var z,y
z=this.gl(this)
for(y=0;y<z;++y){if(J.e(this.as(0,y),b))return!0
if(z!==this.gl(this))throw H.c(new P.C(this))}return!1},
bs:function(a,b){var z,y
z=this.gl(this)
for(y=0;y<z;++y){if(b.$1(this.as(0,y))===!0)return!0
if(z!==this.gl(this))throw H.c(new P.C(this))}return!1},
aR:function(a,b,c){var z,y,x
z=this.gl(this)
for(y=0;y<z;++y){x=this.as(0,y)
if(b.$1(x)===!0)return x
if(z!==this.gl(this))throw H.c(new P.C(this))}return c.$0()},
cl:function(a,b){var z,y,x,w
z=this.gl(this)
if(b.length!==0){if(z===0)return""
y=H.b(this.as(0,0))
if(z!==this.gl(this))throw H.c(new P.C(this))
for(x=y,w=1;w<z;++w){x=x+b+H.b(this.as(0,w))
if(z!==this.gl(this))throw H.c(new P.C(this))}return x.charCodeAt(0)==0?x:x}else{for(w=0,x="";w<z;++w){x+=H.b(this.as(0,w))
if(z!==this.gl(this))throw H.c(new P.C(this))}return x.charCodeAt(0)==0?x:x}},
c6:function(a,b){return this.dg(0,b)},
aH:function(a,b){return new H.ap(this,b,[H.y(this,"b0",0),null])},
bv:function(a,b,c){var z,y,x
z=this.gl(this)
for(y=b,x=0;x<z;++x){y=c.$2(y,this.as(0,x))
if(z!==this.gl(this))throw H.c(new P.C(this))}return y},
bF:function(a,b){var z,y,x,w
z=[H.y(this,"b0",0)]
if(b){y=H.p([],z)
C.a.sl(y,this.gl(this))}else{x=new Array(this.gl(this))
x.fixed$length=Array
y=H.p(x,z)}for(w=0;w<this.gl(this);++w){z=this.as(0,w)
if(w>=y.length)return H.f(y,w)
y[w]=z}return y},
cu:function(a){return this.bF(a,!0)},
bG:function(a){var z,y
z=P.a4(null,null,null,H.y(this,"b0",0))
for(y=0;y<this.gl(this);++y)z.q(0,this.as(0,y))
return z}},
pc:{"^":"b0;a,b,c,$ti",
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
as:function(a,b){var z,y
z=this.gj8()+b
if(!(b<0)){y=this.giD()
if(typeof y!=="number")return H.x(y)
y=z>=y}else y=!0
if(y)throw H.c(P.cS(b,this,"index",null,null))
return J.eO(this.a,z)},
bF:function(a,b){var z,y,x,w,v,u,t,s,r
z=this.b
y=this.a
x=J.K(y)
w=x.gl(y)
v=w-z
if(v<0)v=0
u=this.$ti
if(b){t=H.p([],u)
C.a.sl(t,v)}else{s=new Array(v)
s.fixed$length=Array
t=H.p(s,u)}for(r=0;r<v;++r){u=x.as(y,z+r)
if(r>=t.length)return H.f(t,r)
t[r]=u
if(x.gl(y)<w)throw H.c(new P.C(this))}return t},
ie:function(a,b,c,d){var z=this.b
if(z<0)H.i(P.a6(z,0,null,"start",null))},
v:{
hc:function(a,b,c,d){var z=new H.pc(a,b,c,[d])
z.ie(a,b,c,d)
return z}}},
dL:{"^":"d;a,b,c,d,$ti",
gS:function(){return this.d},
u:function(){var z,y,x
z=this.a
y=z.gl(z)
if(this.b!==y)throw H.c(new P.C(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z.as(0,x);++this.c
return!0}},
dO:{"^":"A;a,b,$ti",
ga_:function(a){return new H.my(null,J.ai(this.a),this.b,this.$ti)},
gl:function(a){return J.aM(this.a)},
gW:function(a){return J.eP(this.a)},
gw:function(a){return this.b.$1(J.iV(this.a))},
$asA:function(a,b){return[b]},
v:{
bI:function(a,b,c,d){if(!!J.o(a).$isZ)return new H.bG(a,b,[c,d])
return new H.dO(a,b,[c,d])}}},
bG:{"^":"dO;a,b,$ti",$isZ:1,
$asZ:function(a,b){return[b]}},
my:{"^":"cU;a,b,c,$ti",
u:function(){var z=this.b
if(z.u()){this.a=this.c.$1(z.gS())
return!0}this.a=null
return!1},
gS:function(){return this.a},
$ascU:function(a,b){return[b]}},
ap:{"^":"b0;a,b,$ti",
gl:function(a){return J.aM(this.a)},
as:function(a,b){return this.b.$1(J.eO(this.a,b))},
$asb0:function(a,b){return[b]},
$asZ:function(a,b){return[b]},
$asA:function(a,b){return[b]}},
L:{"^":"A;a,b,$ti",
ga_:function(a){return new H.bT(J.ai(this.a),this.b,this.$ti)},
aH:function(a,b){return new H.dO(this,b,[H.m(this,0),null])}},
bT:{"^":"cU;a,b,$ti",
u:function(){var z,y
for(z=this.a,y=this.b;z.u();)if(y.$1(z.gS())===!0)return!0
return!1},
gS:function(){return this.a.gS()}},
fX:{"^":"A;a,b,$ti",
ga_:function(a){return new H.op(J.ai(this.a),this.b,this.$ti)},
v:{
oo:function(a,b,c){if(!!J.o(a).$isZ)return new H.l5(a,H.hP(b),[c])
return new H.fX(a,H.hP(b),[c])}}},
l5:{"^":"fX;a,b,$ti",
gl:function(a){var z=J.aM(this.a)-this.b
if(z>=0)return z
return 0},
$isZ:1},
op:{"^":"cU;a,b,$ti",
u:function(){var z,y
for(z=this.a,y=0;y<this.b;++y)z.u()
this.b=0
return z.u()},
gS:function(){return this.a.gS()}},
l6:{"^":"d;$ti",
u:function(){return!1},
gS:function(){return}}}],["","",,H,{"^":"",
cv:function(a,b){var z=a.cS(b)
if(!init.globalState.d.cy)init.globalState.f.bx()
return z},
iE:function(a,b){var z,y,x,w,v,u
z={}
z.a=b
if(b==null){b=[]
z.a=b
y=b}else y=b
if(!J.o(y).$isN)throw H.c(P.F("Arguments to main must be a List: "+H.b(y)))
init.globalState=new H.qY(0,0,1,null,null,null,null,null,null,null,null,null,a)
y=init.globalState
x=self.window==null
w=self.Worker
v=x&&!!self.postMessage
y.x=v
v=!v
if(v)w=w!=null&&$.$get$fc()!=null
else w=!0
y.y=w
y.r=x&&v
y.f=new H.qx(P.bb(null,H.ct),0)
x=P.t
y.z=new H.R(0,null,null,null,null,null,0,[x,H.ej])
y.ch=new H.R(0,null,null,null,null,null,0,[x,null])
if(y.x===!0){w=new H.qX()
y.Q=w
self.onmessage=function(c,d){return function(e){c(d,e)}}(H.lW,w)
self.dartPrint=self.dartPrint||function(c){return function(d){if(self.console&&self.console.log)self.console.log(d)
else self.postMessage(c(d))}}(H.qZ)}if(init.globalState.x===!0)return
y=init.globalState.a++
w=P.a4(null,null,null,x)
v=new H.cm(0,null,!1)
u=new H.ej(y,new H.R(0,null,null,null,null,null,0,[x,H.cm]),w,init.createNewIsolate(),v,new H.bl(H.dl()),new H.bl(H.dl()),!1,!1,[],P.a4(null,null,null,null),null,null,!1,!0,P.a4(null,null,null,null))
w.q(0,0)
u.e1(0,v)
init.globalState.e=u
init.globalState.d=u
if(H.ay(a,{func:1,args:[,]}))u.cS(new H.vs(z,a))
else if(H.ay(a,{func:1,args:[,,]}))u.cS(new H.vt(z,a))
else u.cS(a)
init.globalState.f.bx()},
m_:function(){var z=init.currentScript
if(z!=null)return String(z.src)
if(init.globalState.x===!0)return H.m0()
return},
m0:function(){var z,y
z=new Error().stack
if(z==null){z=function(){try{throw new Error()}catch(x){return x.stack}}()
if(z==null)throw H.c(new P.S("No stack trace"))}y=z.match(new RegExp("^ *at [^(]*\\((.*):[0-9]*:[0-9]*\\)$","m"))
if(y!=null)return y[1]
y=z.match(new RegExp("^[^@]*@(.*):[0-9]*$","m"))
if(y!=null)return y[1]
throw H.c(new P.S('Cannot extract URI from "'+z+'"'))},
lW:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=new H.d8(!0,[]).bY(b.data)
y=J.K(z)
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
p=P.a4(null,null,null,q)
o=new H.cm(0,null,!1)
n=new H.ej(y,new H.R(0,null,null,null,null,null,0,[q,H.cm]),p,init.createNewIsolate(),o,new H.bl(H.dl()),new H.bl(H.dl()),!1,!1,[],P.a4(null,null,null,null),null,null,!1,!0,P.a4(null,null,null,null))
p.q(0,0)
n.e1(0,o)
init.globalState.f.a.aC(new H.ct(n,new H.lX(w,v,u,t,s,r),"worker-start"))
init.globalState.d=n
init.globalState.f.bx()
break
case"spawn-worker":break
case"message":if(y.j(z,"port")!=null)y.j(z,"port").F(y.j(z,"msg"))
init.globalState.f.bx()
break
case"close":init.globalState.ch.a3(0,$.$get$fd().j(0,a))
a.terminate()
init.globalState.f.bx()
break
case"log":H.lV(y.j(z,"msg"))
break
case"print":if(init.globalState.x===!0){y=init.globalState.Q
q=P.ag(["command","print","msg",z])
q=new H.bv(!0,P.bW(null,P.t)).bp(q)
y.toString
self.postMessage(q)}else P.eB(y.j(z,"msg"))
break
case"error":throw H.c(y.j(z,"msg"))}},
lV:function(a){var z,y,x,w
if(init.globalState.x===!0){y=init.globalState.Q
x=P.ag(["command","log","msg",a])
x=new H.bv(!0,P.bW(null,P.t)).bp(x)
y.toString
self.postMessage(x)}else try{self.console.log(a)}catch(w){H.B(w)
z=H.D(w)
y=P.cP(z)
throw H.c(y)}},
lY:function(a,b,c,d,e,f){var z,y,x,w
z=init.globalState.d
y=z.a
$.fH=$.fH+("_"+y)
$.fI=$.fI+("_"+y)
y=z.e
x=init.globalState.d.a
w=z.f
f.F(["spawned",new H.cu(y,x),w,z.r])
x=new H.lZ(a,b,c,d,z)
if(e===!0){z.fQ(w,w)
init.globalState.f.a.aC(new H.ct(z,x,"start isolate"))}else x.$0()},
rs:function(a){return new H.d8(!0,[]).bY(new H.bv(!1,P.bW(null,P.t)).bp(a))},
vs:{"^":"a:2;a,b",
$0:function(){this.b.$1(this.a.a)}},
vt:{"^":"a:2;a,b",
$0:function(){this.b.$2(this.a.a,null)}},
qY:{"^":"d;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",v:{
qZ:function(a){var z=P.ag(["command","print","msg",a])
return new H.bv(!0,P.bW(null,P.t)).bp(z)}}},
ej:{"^":"d;i:a<,b,c,ks:d<,jC:e<,f,r,x,cV:y<,z,Q,ch,cx,cy,db,dx",
fQ:function(a,b){if(!this.f.A(0,a))return
if(this.Q.q(0,b)&&!this.y)this.y=!0
this.cM()},
kN:function(a){var z,y,x
if(!this.y)return
z=this.Q
z.a3(0,a)
if(z.a===0){for(z=this.z;y=z.length,y!==0;){if(0>=y)return H.f(z,-1)
x=z.pop()
init.globalState.f.a.fO(x)}this.y=!1}this.cM()},
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
P.cl(y,x,z.length,null,null,null)
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
this.cx=z}z.aC(new H.qO(a,c))},
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
else{P.eB(a)
if(b!=null)P.eB(b)}return}y=new Array(2)
y.fixed$length=Array
y[0]=J.h(a)
y[1]=b==null?null:J.h(b)
for(x=new P.ae(z,z.r,null,null,[null]),x.c=z.e;x.u();)x.d.F(y)},
cS:function(a){var z,y,x,w,v,u,t
z=init.globalState.d
init.globalState.d=this
$=this.d
y=null
x=this.cy
this.cy=!0
try{y=a.$0()}catch(u){w=H.B(u)
v=H.D(u)
this.k5(w,v)
if(this.db===!0){this.eO()
if(this===init.globalState.e)throw u}}finally{this.cy=x
init.globalState.d=z
if(z!=null)$=z.gks()
if(this.cx!=null)for(;t=this.cx,!t.gW(t);)this.cx.dI().$0()}return y},
co:function(a){return this.b.j(0,a)},
e1:function(a,b){var z=this.b
if(z.ab(a))throw H.c(P.cP("Registry: ports must be registered only once."))
z.n(0,a,b)},
cM:function(){var z=this.b
if(z.gl(z)-this.c.a>0||this.y||!this.x)init.globalState.z.n(0,this.a,this)
else this.eO()},
eO:[function(){var z,y,x,w,v
z=this.cx
if(z!=null)z.bf(0)
for(z=this.b,y=z.gcv(),y=y.ga_(y);y.u();)y.gS().iw()
z.bf(0)
this.c.bf(0)
init.globalState.z.a3(0,this.a)
this.dx.bf(0)
if(this.ch!=null){for(x=0;z=this.ch,y=z.length,x<y;x+=2){w=z[x]
v=x+1
if(v>=y)return H.f(z,v)
w.F(z[v])}this.ch=null}},"$0","gkt",0,0,7]},
qO:{"^":"a:7;a,b",
$0:function(){this.a.F(this.b)}},
qx:{"^":"d;a,b",
jH:function(){var z=this.a
if(z.b===z.c)return
return z.dI()},
hy:function(){var z,y,x
z=this.jH()
if(z==null){if(init.globalState.e!=null)if(init.globalState.z.ab(init.globalState.e.a))if(init.globalState.r===!0){y=init.globalState.e.b
y=y.gW(y)}else y=!1
else y=!1
else y=!1
if(y)H.i(P.cP("Program exited with open ReceivePorts."))
y=init.globalState
if(y.x===!0){x=y.z
x=x.gW(x)&&y.f.b===0}else x=!1
if(x){y=y.Q
x=P.ag(["command","close"])
x=new H.bv(!0,new P.hK(0,null,null,null,null,null,0,[null,P.t])).bp(x)
y.toString
self.postMessage(x)}return!1}z.kJ()
return!0},
fJ:function(){if(self.window!=null)new H.qy(this).$0()
else for(;this.hy(););},
bx:function(){var z,y,x,w,v
if(init.globalState.x!==!0)this.fJ()
else try{this.fJ()}catch(x){z=H.B(x)
y=H.D(x)
w=init.globalState.Q
v=P.ag(["command","error","msg",H.b(z)+"\n"+H.b(y)])
v=new H.bv(!0,P.bW(null,P.t)).bp(v)
w.toString
self.postMessage(v)}}},
qy:{"^":"a:7;a",
$0:function(){if(!this.a.hy())return
P.pz(C.x,this)}},
ct:{"^":"d;a,b,c",
kJ:function(){var z=this.a
if(z.y){z.z.push(this)
return}z.cS(this.b)}},
qX:{"^":"d;"},
lX:{"^":"a:2;a,b,c,d,e,f",
$0:function(){H.lY(this.a,this.b,this.c,this.d,this.e,this.f)}},
lZ:{"^":"a:7;a,b,c,d,e",
$0:function(){var z,y
z=this.e
z.x=!0
if(this.d!==!0)this.a.$1(this.c)
else{y=this.a
if(H.ay(y,{func:1,args:[,,]}))y.$2(this.b,this.c)
else if(H.ay(y,{func:1,args:[,]}))y.$1(this.b)
else y.$0()}z.cM()}},
hE:{"^":"d;"},
cu:{"^":"hE;b,a",
F:function(a){var z,y,x
z=init.globalState.z.j(0,this.a)
if(z==null)return
y=this.b
if(y.gfw())return
x=H.rs(a)
if(z.gjC()===y){y=J.K(x)
switch(y.j(x,0)){case"pause":z.fQ(y.j(x,1),y.j(x,2))
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
break}return}init.globalState.f.a.aC(new H.ct(z,new H.r0(this,x),"receive"))},
A:function(a,b){if(b==null)return!1
return b instanceof H.cu&&J.e(this.b,b.b)},
gB:function(a){return this.b.gee()}},
r0:{"^":"a:2;a,b",
$0:function(){var z=this.a.b
if(!z.gfw())z.il(this.b)}},
el:{"^":"hE;b,c,a",
F:function(a){var z,y,x
z=P.ag(["command","message","port",this,"msg",a])
y=new H.bv(!0,P.bW(null,P.t)).bp(z)
if(init.globalState.x===!0){init.globalState.Q.toString
self.postMessage(y)}else{x=init.globalState.ch.j(0,this.b)
if(x!=null)x.postMessage(y)}},
A:function(a,b){if(b==null)return!1
return b instanceof H.el&&J.e(this.b,b.b)&&J.e(this.a,b.a)&&J.e(this.c,b.c)},
gB:function(a){var z,y,x
z=this.b
if(typeof z!=="number")return z.f5()
y=this.a
if(typeof y!=="number")return y.f5()
x=this.c
if(typeof x!=="number")return H.x(x)
return(z<<16^y<<8^x)>>>0}},
cm:{"^":"d;ee:a<,b,fw:c<",
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
$isnx:1},
ny:{"^":"ak;a,b",
aG:function(a,b,c,d){var z=this.b
z.toString
return new P.d7(z,[H.m(z,0)]).aG(a,b,c,d)},
eR:function(a,b,c){return this.aG(a,null,b,c)},
bt:[function(){this.a.bt()
this.b.bt()},"$0","gjy",0,0,7],
ib:function(a){var z=new P.rf(null,0,null,null,null,null,this.gjy(),[null])
this.b=z
this.a.b=z.gjh(z)},
$asak:I.bg},
pv:{"^":"d;a,b,c",
gck:function(){return this.c!=null},
ig:function(a,b){var z,y
if(a===0)z=self.setTimeout==null||init.globalState.x===!0
else z=!1
if(z){this.c=1
z=init.globalState.f
y=init.globalState.d
z.a.aC(new H.ct(y,new H.px(this,b),"timer"))
this.b=!0}else if(self.setTimeout!=null){++init.globalState.f.b
this.c=self.setTimeout(H.dh(new H.py(this,b),0),a)}else throw H.c(new P.S("Timer greater than 0."))},
v:{
pw:function(a,b){var z=new H.pv(!0,!1,null)
z.ig(a,b)
return z}}},
px:{"^":"a:7;a,b",
$0:function(){this.a.c=null
this.b.$0()}},
py:{"^":"a:7;a,b",
$0:function(){this.a.c=null;--init.globalState.f.b
this.b.$0()}},
bl:{"^":"d;ee:a<",
gB:function(a){var z=this.a
if(typeof z!=="number")return z.lc()
z=C.j.ds(z,0)^C.j.bL(z,4294967296)
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
if(!!z.$islT){x=this.ghO()
z=a.gcm()
z=H.bI(z,x,H.y(z,"A",0),null)
z=P.P(z,!0,H.y(z,"A",0))
w=a.gcv()
w=H.bI(w,x,H.y(w,"A",0),null)
return["map",z,P.P(w,!0,H.y(w,"A",0))]}if(!!z.$isfj)return this.hS(a)
if(!!z.$isaZ)this.hB(a)
if(!!z.$isnx)this.d2(a,"RawReceivePorts can't be transmitted:")
if(!!z.$iscu)return this.hT(a)
if(!!z.$isel)return this.hU(a)
if(!!z.$isa){v=a.$static_name
if(v==null)this.d2(a,"Closures can't be transmitted:")
return["function",v]}if(!!z.$isbl)return["capability",a.a]
if(!(a instanceof P.d))this.hB(a)
return["dart",init.classIdExtractor(a),this.hQ(init.classFieldsExtractor(a))]},"$1","ghO",2,0,0],
d2:function(a,b){throw H.c(new P.S((b==null?"Can't transmit:":b)+" "+H.b(a)))},
hB:function(a){return this.d2(a,null)},
hR:function(a){var z=this.hP(a)
if(!!a.fixed$length)return["fixed",z]
if(!a.fixed$length)return["extendable",z]
if(!a.immutable$list)return["mutable",z]
if(a.constructor===Array)return["const",z]
this.d2(a,"Can't serialize indexable: ")},
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
if(!!a.constructor&&a.constructor!==Object)this.d2(a,"Only plain JS Objects are supported:")
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
if(typeof a!=="object"||a===null||a.constructor!==Array)throw H.c(P.F("Bad serialized message: "+H.b(a)))
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
z=J.K(a)
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
w=P.aB()
this.b.push(w)
y=J.eQ(y,this.gjJ()).cu(0)
for(z=J.K(y),v=J.K(x),u=0;u<z.gl(y);++u){if(u>=y.length)return H.f(y,u)
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
t=new H.cu(u,x)}else t=new H.el(y,w,x)
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
z=J.K(y)
v=J.K(x)
u=0
while(!0){t=z.gl(y)
if(typeof t!=="number")return H.x(t)
if(!(u<t))break
w[z.j(y,u)]=this.bY(v.j(x,u));++u}return w}}}],["","",,H,{"^":"",
k7:function(){throw H.c(new P.S("Cannot modify unmodifiable Map"))},
us:function(a){return init.types[a]},
b:function(a){var z
if(typeof a==="string")return a
if(typeof a==="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
z=J.h(a)
if(typeof z!=="string")throw H.c(H.T(a))
return z},
aD:function(a){var z=a.$identityHash
if(z==null){z=Math.random()*0x3fffffff|0
a.$identityHash=z}return z},
bM:function(a){var z,y,x,w,v,u,t,s
z=J.o(a)
y=z.constructor
if(typeof y=="function"){x=y.name
w=typeof x==="string"?x:null}else w=null
if(w==null||z===C.M||!!J.o(a).$isbt){v=C.P(a)
if(v==="Object"){u=a.constructor
if(typeof u=="function"){t=String(u).match(/^\s*function\s*([\w$]*)\s*\(/)
s=t==null?null:t[1]
if(typeof s==="string"&&/^\w+$/.test(s))w=s}if(w==null)w=v}else w=v}w=w
if(w.length>1&&C.b.cB(w,0)===36)w=C.b.bJ(w,1)
return function(b,c){return b.replace(/[^<,> ]+/g,function(d){return c[d]||d})}(w+H.dk(H.cy(a),0,null),init.mangledGlobalNames)},
cZ:function(a){return"Instance of '"+H.bM(a)+"'"},
aq:function(a){var z
if(a<=65535)return String.fromCharCode(a)
if(a<=1114111){z=a-65536
return String.fromCharCode((55296|C.e.ds(z,10))>>>0,56320|z&1023)}throw H.c(P.a6(a,0,1114111,null,null))},
bp:function(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
np:function(a){var z=H.bp(a).getFullYear()+0
return z},
nn:function(a){var z=H.bp(a).getMonth()+1
return z},
nj:function(a){var z=H.bp(a).getDate()+0
return z},
nk:function(a){var z=H.bp(a).getHours()+0
return z},
nm:function(a){var z=H.bp(a).getMinutes()+0
return z},
no:function(a){var z=H.bp(a).getSeconds()+0
return z},
nl:function(a){var z=H.bp(a).getMilliseconds()+0
return z},
dZ:function(a,b){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.c(H.T(a))
return a[b]},
fJ:function(a,b,c){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.c(H.T(a))
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
return P.ck(b,"index",null)},
T:function(a){return new P.b7(!0,a,null,null)},
df:function(a){if(typeof a!=="number")throw H.c(H.T(a))
return a},
rO:function(a){if(typeof a!=="number"||Math.floor(a)!==a)throw H.c(H.T(a))
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
ar:function(a){throw H.c(new P.C(a))},
B:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.wy(a)
if(a==null)return
if(a instanceof H.dy)return z.$1(a.a)
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.e.ds(x,16)&8191)===10)switch(w){case 438:return z.$1(H.dF(H.b(y)+" (Error "+w+")",null))
case 445:case 5007:v=H.b(y)+" (Error "+w+")"
return z.$1(new H.fy(v,null))}}if(a instanceof TypeError){u=$.$get$hk()
t=$.$get$hl()
s=$.$get$hm()
r=$.$get$hn()
q=$.$get$hr()
p=$.$get$hs()
o=$.$get$hp()
$.$get$ho()
n=$.$get$hu()
m=$.$get$ht()
l=u.bw(y)
if(l!=null)return z.$1(H.dF(y,l))
else{l=t.bw(y)
if(l!=null){l.method="call"
return z.$1(H.dF(y,l))}else{l=s.bw(y)
if(l==null){l=r.bw(y)
if(l==null){l=q.bw(y)
if(l==null){l=p.bw(y)
if(l==null){l=o.bw(y)
if(l==null){l=r.bw(y)
if(l==null){l=n.bw(y)
if(l==null){l=m.bw(y)
v=l!=null}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0
if(v)return z.$1(new H.fy(y,l==null?null:l.method))}}return z.$1(new H.pE(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.h6()
y=function(b){try{return String(b)}catch(k){}return null}(a)
return z.$1(new P.b7(!1,null,null,typeof y==="string"?y.replace(/^RangeError:\s*/,""):y))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.h6()
return a},
D:function(a){var z
if(a instanceof H.dy)return a.b
if(a==null)return new H.hM(a,null)
z=a.$cachedTrace
if(z!=null)return z
return a.$cachedTrace=new H.hM(a,null)},
uJ:function(a){if(a==null||typeof a!='object')return J.j(a)
else return H.aD(a)},
u9:function(a,b){var z,y,x,w
z=a.length
for(y=0;y<z;y=w){x=y+1
w=x+1
b.n(0,a[y],a[x])}return b},
uy:function(a,b,c,d,e,f,g){switch(c){case 0:return H.cv(b,new H.uz(a))
case 1:return H.cv(b,new H.uA(a,d))
case 2:return H.cv(b,new H.uB(a,d,e))
case 3:return H.cv(b,new H.uC(a,d,e,f))
case 4:return H.cv(b,new H.uD(a,d,e,f,g))}throw H.c(P.cP("Unsupported number of arguments for wrapped closure"))},
dh:function(a,b){var z=a.$identity
if(!!z)return z
z=function(c,d,e,f){return function(g,h,i,j){return f(c,e,d,g,h,i,j)}}(a,b,init.globalState.d,H.uy)
a.$identity=z
return z},
k3:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=z.$callName
if(!!J.o(c).$isN){z.$reflectionInfo=c
x=H.nA(z).r}else x=c
w=d?Object.create(new H.oJ().constructor.prototype):Object.create(new H.dr(null,null,null,null).constructor.prototype)
w.$initialize=w.constructor
if(d)v=function(){this.$initialize()}
else{u=$.aN
$.aN=J.an(u,1)
v=new Function("a,b,c,d"+u,"this.$initialize(a,b,c,d"+u+")")}w.constructor=v
v.prototype=w
if(!d){t=e.length==1&&!0
s=H.f1(a,z,t)
s.$reflectionInfo=c}else{w.$static_name=f
s=z
t=!1}if(typeof x=="number")r=function(g,h){return function(){return g(h)}}(H.us,x)
else if(typeof x=="function")if(d)r=x
else{q=t?H.eX:H.ds
r=function(g,h){return function(){return g.apply({$receiver:h(this)},arguments)}}(x,q)}else throw H.c("Error in reflectionInfo.")
w.$S=r
w[y]=s
for(u=b.length,p=1;p<u;++p){o=b[p]
n=o.$callName
if(n!=null){m=d?o:H.f1(a,o,t)
w[n]=m}}w["call*"]=s
w.$R=z.$R
w.$D=z.$D
return v},
k0:function(a,b,c,d){var z=H.ds
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},
f1:function(a,b,c){var z,y,x,w,v,u,t
if(c)return H.k2(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
v=!w||y>=27
if(v)return H.k0(y,!w,z,b)
if(y===0){w=$.aN
$.aN=J.an(w,1)
u="self"+H.b(w)
w="return function(){var "+u+" = this."
v=$.bF
if(v==null){v=H.cI("self")
$.bF=v}return new Function(w+H.b(v)+";return "+u+"."+H.b(z)+"();}")()}t="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w=$.aN
$.aN=J.an(w,1)
t+=H.b(w)
w="return function("+t+"){return this."
v=$.bF
if(v==null){v=H.cI("self")
$.bF=v}return new Function(w+H.b(v)+"."+H.b(z)+"("+t+");}")()},
k1:function(a,b,c,d){var z,y
z=H.ds
y=H.eX
switch(b?-1:a){case 0:throw H.c(new H.nM("Intercepted function with no arguments."))
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
y=$.eW
if(y==null){y=H.cI("receiver")
$.eW=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.k1(w,!u,x,b)
if(w===1){y="return function(){return this."+H.b(z)+"."+H.b(x)+"(this."+H.b(y)+");"
u=$.aN
$.aN=J.an(u,1)
return new Function(y+H.b(u)+"}")()}s="abcdefghijklmnopqrstuvwxyz".split("").splice(0,w-1).join(",")
y="return function("+s+"){return this."+H.b(z)+"."+H.b(x)+"(this."+H.b(y)+", "+s+");"
u=$.aN
$.aN=J.an(u,1)
return new Function(y+H.b(u)+"}")()},
et:function(a,b,c,d,e,f){var z
b.fixed$length=Array
if(!!J.o(c).$isN){c.fixed$length=Array
z=c}else z=c
return H.k3(a,b,z,!!d,e,f)},
uS:function(a,b){var z=J.K(b)
throw H.c(H.cK(H.bM(a),z.aJ(b,3,z.gl(b))))},
E:function(a,b){var z
if(a!=null)z=(typeof a==="object"||typeof a==="function")&&J.o(a)[b]
else z=!0
if(z)return a
H.uS(a,b)},
ev:function(a){var z=J.o(a)
return"$S" in z?z.$S():null},
ay:function(a,b){var z
if(a==null)return!1
z=H.ev(a)
return z==null?!1:H.ey(z,b)},
ih:function(a,b){var z,y
if(a==null)return a
if(H.ay(a,b))return a
z=H.Y(b,null)
y=H.ev(a)
throw H.c(H.cK(y!=null?H.Y(y,null):H.bM(a),z))},
wv:function(a){throw H.c(new P.kk(a))},
dl:function(){return(Math.random()*0x100000000>>>0)+(Math.random()*0x100000000>>>0)*4294967296},
bf:function(a){return new H.av(a,null)},
p:function(a,b){a.$ti=b
return a},
cy:function(a){if(a==null)return
return a.$ti},
im:function(a,b){return H.eL(a["$as"+H.b(b)],H.cy(a))},
y:function(a,b,c){var z=H.im(a,b)
return z==null?null:z[c]},
m:function(a,b){var z=H.cy(a)
return z==null?null:z[b]},
Y:function(a,b){var z
if(a==null)return"dynamic"
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a[0].builtin$cls+H.dk(a,1,b)
if(typeof a=="function")return a.builtin$cls
if(typeof a==="number"&&Math.floor(a)===a)return H.b(b==null?a:b.$1(a))
if(typeof a.func!="undefined"){z=a.typedef
if(z!=null)return H.Y(z,b)
return H.rx(a,b)}return"unknown-reified-type"},
rx:function(a,b){var z,y,x,w,v,u,t,s,r,q,p
z=!!a.v?"void":H.Y(a.ret,b)
if("args" in a){y=a.args
for(x=y.length,w="",v="",u=0;u<x;++u,v=", "){t=y[u]
w=w+v+H.Y(t,b)}}else{w=""
v=""}if("opt" in a){s=a.opt
w+=v+"["
for(x=s.length,v="",u=0;u<x;++u,v=", "){t=s[u]
w=w+v+H.Y(t,b)}w+="]"}if("named" in a){r=a.named
w+=v+"{"
for(x=H.u8(r),q=x.length,v="",u=0;u<q;++u,v=", "){p=x[u]
w=w+v+H.Y(r[p],b)+(" "+H.b(p))}w+="}"}return"("+w+") => "+z},
dk:function(a,b,c){var z,y,x,w,v,u
if(a==null)return""
z=new P.bS("")
for(y=b,x=!0,w=!0,v="";y<a.length;++y){if(x)x=!1
else z.C=v+", "
u=a[y]
if(u!=null)w=!1
v=z.C+=H.Y(u,c)}return w?"":"<"+z.k(0)+">"},
io:function(a){var z,y
if(a instanceof H.a){z=H.ev(a)
if(z!=null)return H.Y(z,null)}y=J.o(a).constructor.builtin$cls
if(a==null)return y
return y+H.dk(a.$ti,0,null)},
eL:function(a,b){if(a==null)return b
a=a.apply(null,b)
if(a==null)return
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a
if(typeof a=="function")return a.apply(null,b)
return b},
aV:function(a,b,c,d){var z,y
if(a==null)return!1
z=H.cy(a)
y=J.o(a)
if(y[b]==null)return!1
return H.i4(H.eL(y[d],z),c)},
aL:function(a,b,c,d){if(a==null)return a
if(H.aV(a,b,c,d))return a
throw H.c(H.cK(H.bM(a),function(e,f){return e.replace(/[^<,> ]+/g,function(g){return f[g]||g})}(b.substring(3)+H.dk(c,0,null),init.mangledGlobalNames)))},
i4:function(a,b){var z,y
if(a==null||b==null)return!0
z=a.length
for(y=0;y<z;++y)if(!H.am(a[y],b[y]))return!1
return!0},
be:function(a,b,c){return a.apply(b,H.im(b,c))},
dg:function(a,b){var z,y,x
if(a==null)return b==null||b.builtin$cls==="d"||b.builtin$cls==="as"
if(b==null)return!0
z=H.cy(a)
a=J.o(a)
y=a.constructor
if(z!=null){z=z.slice()
z.splice(0,0,y)
y=z}if('func' in b){x=a.$S
if(x==null)return!1
return H.ey(x.apply(a,null),b)}return H.am(y,b)},
iI:function(a,b){if(a!=null&&!H.dg(a,b))throw H.c(H.cK(H.bM(a),H.Y(b,null)))
return a},
am:function(a,b){var z,y,x,w,v,u
if(a===b)return!0
if(a==null||b==null)return!0
if(a.builtin$cls==="as")return!0
if('func' in b)return H.ey(a,b)
if('func' in a)return b.builtin$cls==="bH"||b.builtin$cls==="d"
z=typeof a==="object"&&a!==null&&a.constructor===Array
y=z?a[0]:a
x=typeof b==="object"&&b!==null&&b.constructor===Array
w=x?b[0]:b
if(w!==y){v=H.Y(w,null)
if(!('$is'+v in y.prototype))return!1
u=y.prototype["$as"+v]}else u=null
if(!z&&u==null||!x)return!0
z=z?a.slice(1):null
x=b.slice(1)
return H.i4(H.eL(u,z),x)},
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
if(!(H.am(z,v)||H.am(v,z)))return!1}return!0},
rI:function(a,b){var z,y,x,w,v,u
if(b==null)return!0
if(a==null)return!1
z=Object.getOwnPropertyNames(b)
z.fixed$length=Array
y=z
for(z=y.length,x=0;x<z;++x){w=y[x]
if(!Object.hasOwnProperty.call(a,w))return!1
v=b[w]
u=a[w]
if(!(H.am(v,u)||H.am(u,v)))return!1}return!0},
ey:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
if(!('func' in a))return!1
if("v" in a){if(!("v" in b)&&"ret" in b)return!1}else if(!("v" in b)){z=a.ret
y=b.ret
if(!(H.am(z,y)||H.am(y,z)))return!1}x=a.args
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
if(!(H.am(o,n)||H.am(n,o)))return!1}for(m=p,l=0;m<s;++l,++m){o=v[l]
n=w[m]
if(!(H.am(o,n)||H.am(n,o)))return!1}for(m=0;m<q;++l,++m){o=v[l]
n=u[m]
if(!(H.am(o,n)||H.am(n,o)))return!1}}return H.rI(a.named,b.named)},
wn:function(a,b,c){var z
if(typeof b==="string")return a.indexOf(b,c)>=0
else{z=J.o(b)
if(!!z.$isdD){z=C.b.bJ(a,c)
return b.b.test(z)}else{z=z.ez(b,C.b.bJ(a,c))
return!z.gW(z)}}},
wp:function(a,b,c,d){var z,y,x
z=b.fo(a,d)
if(z==null)return a
y=z.b
x=y.index
return H.eK(a,x,x+y[0].length,c)},
n:function(a,b,c){var z,y,x
H.bz(c)
if(b==="")if(a==="")return c
else{z=a.length
y=H.b(c)
for(x=0;x<z;++x)y=y+a[x]+H.b(c)
return y.charCodeAt(0)==0?y:y}else return a.replace(new RegExp(b.replace(/[[\]{}()*+?.\\^$|]/g,"\\$&"),'g'),c.replace(/\$/g,"$$$$"))},
xk:[function(a){return a},"$1","hQ",2,0,24],
wo:function(a,b,c,d){var z,y,x,w,v,u
z=J.o(b)
if(!z.$isdW)throw H.c(P.cF(b,"pattern","is not a Pattern"))
for(z=z.ez(b,a),z=new H.hC(z.a,z.b,z.c,null),y=0,x="";z.u();){w=z.d
v=w.b
u=v.index
x=x+H.b(H.hQ().$1(C.b.aJ(a,y,u)))+H.b(c.$1(w))
y=u+v[0].length}z=x+H.b(H.hQ().$1(C.b.bJ(a,y)))
return z.charCodeAt(0)==0?z:z},
iH:function(a,b,c,d){var z,y,x,w,v,u
if(typeof b==="string"){z=a.indexOf(b,d)
if(z<0)return a
return H.eK(a,z,z+b.length,c)}y=J.o(b)
if(!!y.$isdD)return d===0?a.replace(b.b,c.replace(/\$/g,"$$$$")):H.wp(a,b,c,d)
if(b==null)H.i(H.T(b))
y=y.du(b,a,d)
x=y.ga_(y)
if(!x.u())return a
w=x.gS()
y=w.gf9()
v=w.gh0()
H.bz(c)
u=P.cl(y,v,a.length,null,null,null)
H.rO(u)
return H.eK(a,y,u,c)},
eK:function(a,b,c,d){var z,y
z=a.substring(0,b)
y=a.substring(c)
return z+H.b(d)+y},
k6:{"^":"d;$ti",
gW:function(a){return this.gl(this)===0},
gat:function(a){return this.gl(this)!==0},
k:function(a){return P.dP(this)},
n:function(a,b,c){return H.k7()},
$isH:1},
k8:{"^":"k6;a,b,c,$ti",
gl:function(a){return this.a},
ab:function(a){if(typeof a!=="string")return!1
if("__proto__"===a)return!1
return this.b.hasOwnProperty(a)},
j:function(a,b){if(!this.ab(b))return
return this.fp(b)},
fp:function(a){return this.b[a]},
Z:function(a,b){var z,y,x,w
z=this.c
for(y=z.length,x=0;x<y;++x){w=z[x]
b.$2(w,this.fp(w))}}},
nz:{"^":"d;a,b,c,d,e,f,r,x",v:{
nA:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z.fixed$length=Array
z=z
y=z[0]
x=z[1]
return new H.nz(a,z,(y&1)===1,y>>1,x>>1,(x&1)===1,z[2],null)}}},
pA:{"^":"d;a,b,c,d,e,f",
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
aQ:function(a){var z,y,x,w,v,u
a=a.replace(String({}),'$receiver$').replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
z=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(z==null)z=[]
y=z.indexOf("\\$arguments\\$")
x=z.indexOf("\\$argumentsExpr\\$")
w=z.indexOf("\\$expr\\$")
v=z.indexOf("\\$method\\$")
u=z.indexOf("\\$receiver\\$")
return new H.pA(a.replace(new RegExp('\\\\\\$arguments\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$argumentsExpr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$expr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$method\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$receiver\\\\\\$','g'),'((?:x|[^x])*)'),y,x,w,v,u)},
d6:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},
hq:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},
fy:{"^":"a3;a,b",
k:function(a){var z=this.b
if(z==null)return"NullError: "+H.b(this.a)
return"NullError: method not found: '"+H.b(z)+"' on null"}},
m5:{"^":"a3;a,b,c",
k:function(a){var z,y
z=this.b
if(z==null)return"NoSuchMethodError: "+H.b(this.a)
y=this.c
if(y==null)return"NoSuchMethodError: method not found: '"+z+"' ("+H.b(this.a)+")"
return"NoSuchMethodError: method not found: '"+z+"' on '"+y+"' ("+H.b(this.a)+")"},
v:{
dF:function(a,b){var z,y
z=b==null
y=z?null:b.method
return new H.m5(a,y,z?null:b.receiver)}}},
pE:{"^":"a3;a",
k:function(a){var z=this.a
return z.length===0?"Error":"Error: "+z}},
dy:{"^":"d;a,bq:b<"},
wy:{"^":"a:0;a",
$1:function(a){if(!!J.o(a).$isa3)if(a.$thrownJsError==null)a.$thrownJsError=this.a
return a}},
hM:{"^":"d;a,b",
k:function(a){var z,y
z=this.b
if(z!=null)return z
z=this.a
y=z!==null&&typeof z==="object"?z.stack:null
z=y==null?"":y
this.b=z
return z}},
uz:{"^":"a:2;a",
$0:function(){return this.a.$0()}},
uA:{"^":"a:2;a,b",
$0:function(){return this.a.$1(this.b)}},
uB:{"^":"a:2;a,b,c",
$0:function(){return this.a.$2(this.b,this.c)}},
uC:{"^":"a:2;a,b,c,d",
$0:function(){return this.a.$3(this.b,this.c,this.d)}},
uD:{"^":"a:2;a,b,c,d,e",
$0:function(){return this.a.$4(this.b,this.c,this.d,this.e)}},
a:{"^":"d;",
k:function(a){return"Closure '"+H.bM(this).trim()+"'"},
ghJ:function(){return this},
$isbH:1,
ghJ:function(){return this}},
hj:{"^":"a;"},
oJ:{"^":"hj;",
k:function(a){var z=this.$static_name
if(z==null)return"Closure of unknown static method"
return"Closure '"+z+"'"}},
dr:{"^":"hj;a,b,c,d",
A:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof H.dr))return!1
return this.a===b.a&&this.b===b.b&&this.c===b.c},
gB:function(a){var z,y
z=this.c
if(z==null)y=H.aD(this.a)
else y=typeof z!=="object"?J.j(z):H.aD(z)
z=H.aD(this.b)
if(typeof y!=="number")return y.ld()
return(y^z)>>>0},
k:function(a){var z=this.c
if(z==null)z=this.a
return"Closure '"+H.b(this.d)+"' of "+H.cZ(z)},
v:{
ds:function(a){return a.a},
eX:function(a){return a.c},
jS:function(){var z=$.bF
if(z==null){z=H.cI("self")
$.bF=z}return z},
cI:function(a){var z,y,x,w,v
z=new H.dr("self","target","receiver","name")
y=Object.getOwnPropertyNames(z)
y.fixed$length=Array
x=y
for(y=x.length,w=0;w<y;++w){v=x[w]
if(z[v]===a)return v}}}},
jX:{"^":"a3;a",
k:function(a){return this.a},
v:{
cK:function(a,b){return new H.jX("CastError: Casting value of type '"+a+"' to incompatible type '"+b+"'")}}},
nM:{"^":"a3;a",
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
gW:function(a){return this.a===0},
gat:function(a){return!this.gW(this)},
gcm:function(){return new H.mm(this,[H.m(this,0)])},
gcv:function(){return H.bI(this.gcm(),new H.m4(this),H.m(this,0),H.m(this,1))},
ab:function(a){var z,y
if(typeof a==="string"){z=this.b
if(z==null)return!1
return this.fk(z,a)}else if(typeof a==="number"&&(a&0x3ffffff)===a){y=this.c
if(y==null)return!1
return this.fk(y,a)}else return this.kh(a)},
kh:function(a){var z=this.d
if(z==null)return!1
return this.cU(this.dm(z,this.cT(a)),a)>=0},
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
y=this.dm(z,this.cT(a))
x=this.cU(y,a)
if(x<0)return
return y[x].gc_()},
n:function(a,b,c){var z,y
if(typeof b==="string"){z=this.b
if(z==null){z=this.eg()
this.b=z}this.fe(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=this.eg()
this.c=y}this.fe(y,b,c)}else this.kk(b,c)},
kk:function(a,b){var z,y,x,w
z=this.d
if(z==null){z=this.eg()
this.d=z}y=this.cT(a)
x=this.dm(z,y)
if(x==null)this.es(z,y,[this.eh(a,b)])
else{w=this.cU(x,a)
if(w>=0)x[w].sc_(b)
else x.push(this.eh(a,b))}},
kK:function(a,b){var z
if(this.ab(a))return this.j(0,a)
z=b.$0()
this.n(0,a,z)
return z},
a3:function(a,b){if(typeof b==="string")return this.fI(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.fI(this.c,b)
else return this.kj(b)},
kj:function(a){var z,y,x,w
z=this.d
if(z==null)return
y=this.dm(z,this.cT(a))
x=this.cU(y,a)
if(x<0)return
w=y.splice(x,1)[0]
this.fK(w)
return w.gc_()},
bf:function(a){if(this.a>0){this.f=null
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
if(y!==this.r)throw H.c(new P.C(this))
z=z.c}},
fe:function(a,b,c){var z=this.cE(a,b)
if(z==null)this.es(a,b,this.eh(b,c))
else z.sc_(c)},
fI:function(a,b){var z
if(a==null)return
z=this.cE(a,b)
if(z==null)return
this.fK(z)
this.fl(a,b)
return z.gc_()},
eh:function(a,b){var z,y
z=new H.ml(a,b,null,null,[null,null])
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.d=y
y.c=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
fK:function(a){var z,y
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
for(y=0;y<z;++y)if(J.e(a[y].gh8(),b))return y
return-1},
k:function(a){return P.dP(this)},
cE:function(a,b){return a[b]},
dm:function(a,b){return a[b]},
es:function(a,b,c){a[b]=c},
fl:function(a,b){delete a[b]},
fk:function(a,b){return this.cE(a,b)!=null},
eg:function(){var z=Object.create(null)
this.es(z,"<non-identifier-key>",z)
this.fl(z,"<non-identifier-key>")
return z},
$islT:1,
$isH:1,
v:{
fm:function(a,b){return new H.R(0,null,null,null,null,null,0,[a,b])}}},
m4:{"^":"a:0;a",
$1:function(a){return this.a.j(0,a)}},
ml:{"^":"d;h8:a<,c_:b@,c,iY:d<,$ti"},
mm:{"^":"Z;a,$ti",
gl:function(a){return this.a.a},
gW:function(a){return this.a.a===0},
ga_:function(a){var z,y
z=this.a
y=new H.mn(z,z.r,null,null,this.$ti)
y.c=z.e
return y},
a7:function(a,b){return this.a.ab(b)},
Z:function(a,b){var z,y,x
z=this.a
y=z.e
x=z.r
for(;y!=null;){b.$1(y.a)
if(x!==z.r)throw H.c(new P.C(z))
y=y.c}}},
mn:{"^":"d;a,b,c,d,$ti",
gS:function(){return this.d},
u:function(){var z=this.a
if(this.b!==z.r)throw H.c(new P.C(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.c
return!0}}}},
dD:{"^":"d;a,b,c,d",
k:function(a){return"RegExp/"+this.a+"/"},
giU:function(){var z=this.c
if(z!=null)return z
z=this.b
z=H.dE(this.a,z.multiline,!z.ignoreCase,!0)
this.c=z
return z},
giT:function(){var z=this.d
if(z!=null)return z
z=this.b
z=H.dE(this.a+"|()",z.multiline,!z.ignoreCase,!0)
this.d=z
return z},
du:function(a,b,c){if(c>b.length)throw H.c(P.a6(c,0,b.length,null,null))
return new H.qd(this,b,c)},
ez:function(a,b){return this.du(a,b,0)},
fo:function(a,b){var z,y
z=this.giU()
z.lastIndex=b
y=z.exec(a)
if(y==null)return
return new H.hL(this,y)},
iE:function(a,b){var z,y
z=this.giT()
z.lastIndex=b
y=z.exec(a)
if(y==null)return
if(0>=y.length)return H.f(y,-1)
if(y.pop()!=null)return
return new H.hL(this,y)},
hd:function(a,b,c){if(c>b.length)throw H.c(P.a6(c,0,b.length,null,null))
return this.iE(b,c)},
$isdW:1,
v:{
dE:function(a,b,c,d){var z,y,x,w
z=b?"m":""
y=c?"":"i"
x=d?"g":""
w=function(e,f){try{return new RegExp(e,f)}catch(v){return v}}(a,z+y+x)
if(w instanceof RegExp)return w
throw H.c(new P.f9("Illegal RegExp pattern ("+String(w)+")",a,null))}}},
hL:{"^":"d;a,b",
gf9:function(){return this.b.index},
gh0:function(){var z=this.b
return z.index+z[0].length},
j:function(a,b){var z=this.b
if(b>>>0!==b||b>=z.length)return H.f(z,b)
return z[b]},
$isbo:1},
qd:{"^":"cd;a,b,c",
ga_:function(a){return new H.hC(this.a,this.b,this.c,null)},
$ascd:function(){return[P.bo]},
$asA:function(){return[P.bo]}},
hC:{"^":"d;a,b,c,d",
gS:function(){return this.d},
u:function(){var z,y,x,w
z=this.b
if(z==null)return!1
y=this.c
if(y<=z.length){x=this.a.fo(z,y)
if(x!=null){this.d=x
z=x.b
y=z.index
w=y+z[0].length
this.c=y===w?w+1:w
return!0}}this.d=null
this.b=null
return!1}},
hb:{"^":"d;f9:a<,b,c",
gh0:function(){return this.a+this.c.length},
j:function(a,b){if(b!==0)H.i(P.ck(b,null,null))
return this.c},
$isbo:1},
rb:{"^":"A;a,b,c",
ga_:function(a){return new H.rc(this.a,this.b,this.c,null)},
$asA:function(){return[P.bo]}},
rc:{"^":"d;a,b,c,d",
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
this.d=new H.hb(u,w,y)
this.c=t===this.c?t+1:t
return!0},
gS:function(){return this.d}}}],["","",,H,{"^":"",
u8:function(a){var z=H.p(a?Object.keys(a):[],[null])
z.fixed$length=Array
return z}}],["","",,H,{"^":"",
uR:function(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)}}],["","",,P,{"^":"",
qe:function(){var z,y,x
z={}
if(self.scheduleImmediate!=null)return P.rJ()
if(self.MutationObserver!=null&&self.document!=null){y=self.document.createElement("div")
x=self.document.createElement("span")
z.a=null
new self.MutationObserver(H.dh(new P.qg(z),1)).observe(y,{childList:true})
return new P.qf(z,y,x)}else if(self.setImmediate!=null)return P.rK()
return P.rL()},
xe:[function(a){++init.globalState.f.b
self.scheduleImmediate(H.dh(new P.qh(a),0))},"$1","rJ",2,0,13],
xf:[function(a){++init.globalState.f.b
self.setImmediate(H.dh(new P.qi(a),0))},"$1","rK",2,0,13],
xg:[function(a){P.e9(C.x,a)},"$1","rL",2,0,13],
aH:function(a,b){P.em(null,a)
return b.gh4()},
aw:function(a,b){P.em(a,b)},
aG:function(a,b){b.bX(a)},
aF:function(a,b){b.eD(H.B(a),H.D(a))},
em:function(a,b){var z,y,x,w
z=new P.rm(b)
y=new P.rn(b)
x=J.o(a)
if(!!x.$isG)a.eu(z,y)
else if(!!x.$isQ)a.eX(z,y)
else{w=new P.G(0,$.q,null,[null])
w.a=4
w.c=a
w.eu(z,null)}},
ax:function(a){var z=function(b,c){return function(d,e){while(true)try{b(d,e)
break}catch(y){e=y
d=c}}}(a,1)
$.q.toString
return new P.rH(z)},
dc:function(a,b,c){var z,y,x
if(b===0){if(c.geK())c.c.eC()
else c.a.bt()
return}else if(b===1){if(c.geK())c.c.eD(H.B(a),H.D(a))
else{z=H.B(a)
y=H.D(a)
c.a.ey(z,y)
c.a.bt()}return}if(a instanceof P.bU){if(c.geK()){b.$2(2,null)
return}z=a.b
if(z===0){z=a.a
J.dp(c.a,z)
P.cA(new P.rk(b,c))
return}else if(z===1){x=a.a
c.a.ju(x,!1).c3(new P.rl(b,c))
return}}P.em(a,b)},
rG:function(a){return a.ge_()},
ep:function(a,b){if(H.ay(a,{func:1,args:[P.as,P.as]})){b.toString
return a}else{b.toString
return a}},
aA:function(a){return new P.rd(new P.G(0,$.q,null,[a]),[a])},
rv:function(a,b,c){$.q.toString
a.bj(b,c)},
rz:function(){var z,y
for(;z=$.bw,z!=null;){$.bY=null
y=z.gcp()
$.bw=y
if(y==null)$.bX=null
z.gjw().$0()}},
xj:[function(){$.en=!0
try{P.rz()}finally{$.bY=null
$.en=!1
if($.bw!=null)$.$get$ed().$1(P.i5())}},"$0","i5",0,0,7],
i_:function(a){var z=new P.hD(a,null)
if($.bw==null){$.bX=z
$.bw=z
if(!$.en)$.$get$ed().$1(P.i5())}else{$.bX.b=z
$.bX=z}},
rF:function(a){var z,y,x
z=$.bw
if(z==null){P.i_(a)
$.bY=$.bX
return}y=new P.hD(a,null)
x=$.bY
if(x==null){y.b=z
$.bY=y
$.bw=y}else{y.b=x.b
x.b=y
$.bY=y
if(y.b==null)$.bX=y}},
cA:function(a){var z=$.q
if(C.i===z){P.by(null,null,C.i,a)
return}z.toString
P.by(null,null,z,z.eA(a,!0))},
x9:function(a,b){return new P.ra(null,a,!1,[b])},
eq:function(a){var z,y,x,w
if(a==null)return
try{a.$0()}catch(x){z=H.B(x)
y=H.D(x)
w=$.q
w.toString
P.bx(null,null,w,z,y)}},
rA:[function(a,b){var z=$.q
z.toString
P.bx(null,null,z,a,b)},function(a){return P.rA(a,null)},"$2","$1","rN",2,2,16,0],
xi:[function(){},"$0","rM",0,0,7],
hZ:function(a,b,c){var z,y,x,w,v,u,t
try{b.$1(a.$0())}catch(u){z=H.B(u)
y=H.D(u)
$.q.toString
x=null
if(x==null)c.$2(z,y)
else{t=x.gbu()
w=t
v=x.gbq()
c.$2(w,v)}}},
ro:function(a,b,c,d){var z=a.ci()
if(!!J.o(z).$isQ&&z!==$.$get$bm())z.c5(new P.rq(b,c,d))
else b.bj(c,d)},
hN:function(a,b){return new P.rp(a,b)},
hO:function(a,b,c){var z=a.ci()
if(!!J.o(z).$isQ&&z!==$.$get$bm())z.c5(new P.rr(b,c))
else b.bi(c)},
rj:function(a,b,c){$.q.toString
a.cc(b,c)},
pz:function(a,b){var z=$.q
if(z===C.i){z.toString
return P.e9(a,b)}return P.e9(a,z.eA(b,!0))},
e9:function(a,b){var z=C.e.bL(a.a,1000)
return H.pw(z<0?0:z,b)},
pR:function(){return $.q},
bx:function(a,b,c,d,e){var z={}
z.a=d
P.rF(new P.rD(z,e))},
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
qg:{"^":"a:0;a",
$1:function(a){var z,y;--init.globalState.f.b
z=this.a
y=z.a
z.a=null
y.$0()}},
qf:{"^":"a:45;a,b,c",
$1:function(a){var z,y;++init.globalState.f.b
this.a.a=a
z=this.b
y=this.c
z.firstChild?z.removeChild(y):z.appendChild(y)}},
qh:{"^":"a:2;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
qi:{"^":"a:2;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
rm:{"^":"a:0;a",
$1:function(a){return this.a.$2(0,a)}},
rn:{"^":"a:21;a",
$2:function(a,b){this.a.$2(1,new H.dy(a,b))}},
rH:{"^":"a:50;a",
$2:function(a,b){this.a(a,b)}},
rk:{"^":"a:2;a,b",
$0:function(){var z=this.b
if(z.a.gcV()){z.b=!0
return}this.a.$2(null,0)}},
rl:{"^":"a:0;a,b",
$1:function(a){var z=this.b.c!=null?2:0
this.a.$2(z,null)}},
qj:{"^":"d;a,b,c",
ge_:function(){return this.a.ge_()},
gcV:function(){return this.a.gcV()},
geK:function(){return this.c!=null},
q:function(a,b){return J.dp(this.a,b)},
ey:function(a,b){return this.a.ey(a,b)},
bt:function(){return this.a.bt()},
ii:function(a){var z=new P.qm(a)
this.a=new P.qr(null,0,null,new P.qo(z),null,new P.qp(this,z),new P.qq(this,a),[null])},
v:{
qk:function(a){var z=new P.qj(null,!1,null)
z.ii(a)
return z}}},
qm:{"^":"a:2;a",
$0:function(){P.cA(new P.qn(this.a))}},
qn:{"^":"a:2;a",
$0:function(){this.a.$2(0,null)}},
qo:{"^":"a:2;a",
$0:function(){this.a.$0()}},
qp:{"^":"a:2;a,b",
$0:function(){var z=this.a
if(z.b===!0){z.b=!1
this.b.$0()}}},
qq:{"^":"a:2;a,b",
$0:function(){var z=this.a
if(!z.a.gkp()){z.c=new P.cr(new P.G(0,$.q,null,[null]),[null])
if(z.b===!0){z.b=!1
P.cA(new P.ql(this.b))}return z.c.gh4()}}},
ql:{"^":"a:2;a",
$0:function(){this.a.$2(2,null)}},
bU:{"^":"d;ac:a<,b",
k:function(a){return"IterationMarker("+this.b+", "+H.b(this.a)+")"},
v:{
bV:function(a){return new P.bU(a,1)},
aS:function(){return C.ag},
hI:function(a){return new P.bU(a,0)},
aT:function(a){return new P.bU(a,3)}}},
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
re:{"^":"cd;a",
ga_:function(a){return new P.bd(this.a(),null,null,null)},
$ascd:I.bg,
$asA:I.bg,
v:{
aU:function(a){return new P.re(a)}}},
Q:{"^":"d;$ti"},
hF:{"^":"d;h4:a<,$ti",
eD:function(a,b){if(a==null)a=new P.cX()
if(this.a.a!==0)throw H.c(new P.w("Future already completed"))
$.q.toString
this.bj(a,b)},
dz:function(a){return this.eD(a,null)}},
cr:{"^":"hF;a,$ti",
bX:function(a){var z=this.a
if(z.a!==0)throw H.c(new P.w("Future already completed"))
z.bC(a)},
eC:function(){return this.bX(null)},
bj:function(a,b){this.a.fg(a,b)}},
rd:{"^":"hF;a,$ti",
bX:function(a){var z=this.a
if(z.a!==0)throw H.c(new P.w("Future already completed"))
z.bi(a)},
eC:function(){return this.bX(null)},
bj:function(a,b){this.a.bj(a,b)}},
ei:{"^":"d;ej:a<,b,c,d,e,$ti",
gje:function(){return this.b.b},
gh6:function(){return(this.c&1)!==0},
gk8:function(){return(this.c&2)!==0},
gh5:function(){return this.c===8},
k6:function(a){return this.b.b.eW(this.d,a)},
kz:function(a){if(this.c!==6)return!0
return this.b.b.eW(this.d,a.gbu())},
jZ:function(a){var z,y
z=this.e
y=this.b.b
if(H.ay(z,{func:1,args:[,,]}))return y.kW(z,a.gbu(),a.gbq())
else return y.eW(z,a.gbu())},
k7:function(){return this.b.b.hw(this.d)}},
G:{"^":"d;cK:a<,b,j2:c<,$ti",
giO:function(){return this.a===2},
gef:function(){return this.a>=4},
eX:function(a,b){var z=$.q
if(z!==C.i){z.toString
if(b!=null)b=P.ep(b,z)}return this.eu(a,b)},
c3:function(a){return this.eX(a,null)},
eu:function(a,b){var z,y
z=new P.G(0,$.q,null,[null])
y=b==null?1:3
this.dh(new P.ei(null,z,y,a,b,[H.m(this,0),null]))
return z},
c5:function(a){var z,y
z=$.q
y=new P.G(0,z,null,this.$ti)
if(z!==C.i)z.toString
z=H.m(this,0)
this.dh(new P.ei(null,y,8,a,null,[z,z]))
return y},
dh:function(a){var z,y
z=this.a
if(z<=1){a.a=this.c
this.c=a}else{if(z===2){y=this.c
if(!y.gef()){y.dh(a)
return}this.a=y.a
this.c=y.c}z=this.b
z.toString
P.by(null,null,z,new P.qB(this,a))}},
fE:function(a){var z,y,x,w,v
z={}
z.a=a
if(a==null)return
y=this.a
if(y<=1){x=this.c
this.c=a
if(x!=null){for(w=a;w.gej()!=null;)w=w.a
w.a=x}}else{if(y===2){v=this.c
if(!v.gef()){v.fE(a)
return}this.a=v.a
this.c=v.c}z.a=this.dq(a)
y=this.b
y.toString
P.by(null,null,y,new P.qI(z,this))}},
dn:function(){var z=this.c
this.c=null
return this.dq(z)},
dq:function(a){var z,y,x
for(z=a,y=null;z!=null;y=z,z=x){x=z.gej()
z.a=y}return y},
bi:function(a){var z,y
z=this.$ti
if(H.aV(a,"$isQ",z,"$asQ"))if(H.aV(a,"$isG",z,null))P.d9(a,this)
else P.hH(a,this)
else{y=this.dn()
this.a=4
this.c=a
P.bu(this,y)}},
bj:[function(a,b){var z=this.dn()
this.a=8
this.c=new P.cG(a,b)
P.bu(this,z)},function(a){return this.bj(a,null)},"le","$2","$1","gbU",2,2,16,0],
bC:function(a){var z
if(H.aV(a,"$isQ",this.$ti,"$asQ")){this.it(a)
return}this.a=1
z=this.b
z.toString
P.by(null,null,z,new P.qD(this,a))},
it:function(a){var z
if(H.aV(a,"$isG",this.$ti,null)){if(a.a===8){this.a=1
z=this.b
z.toString
P.by(null,null,z,new P.qH(this,a))}else P.d9(a,this)
return}P.hH(a,this)},
fg:function(a,b){var z
this.a=1
z=this.b
z.toString
P.by(null,null,z,new P.qC(this,a,b))},
ik:function(a,b){this.a=4
this.c=a},
$isQ:1,
v:{
hH:function(a,b){var z,y,x
b.a=1
try{a.eX(new P.qE(b),new P.qF(b))}catch(x){z=H.B(x)
y=H.D(x)
P.cA(new P.qG(b,z,y))}},
d9:function(a,b){var z,y,x
for(;a.giO();)a=a.c
z=a.gef()
y=b.c
if(z){b.c=null
x=b.dq(y)
b.a=a.a
b.c=a.c
P.bu(b,x)}else{b.a=2
b.c=a
a.fE(y)}},
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
if(!y||b.gh6()||b.gh5()){q=b.gje()
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
if(b.gh5())new P.qL(z,x,w,b).$0()
else if(y){if(b.gh6())new P.qK(x,b,r).$0()}else if(b.gk8())new P.qJ(z,x,b).$0()
if(p!=null)$.q=p
y=x.b
if(!!J.o(y).$isQ){o=b.b
if(y.a>=4){n=o.c
o.c=null
b=o.dq(n)
o.a=y.a
o.c=y.c
z.a=y
continue}else P.d9(y,o)
return}}o=b.b
b=o.dn()
y=x.a
u=x.b
if(!y){o.a=4
o.c=u}else{o.a=8
o.c=u}z.a=o
y=o}}}},
qB:{"^":"a:2;a,b",
$0:function(){P.bu(this.a,this.b)}},
qI:{"^":"a:2;a,b",
$0:function(){P.bu(this.b,this.a.a)}},
qE:{"^":"a:0;a",
$1:function(a){var z=this.a
z.a=0
z.bi(a)}},
qF:{"^":"a:49;a",
$2:function(a,b){this.a.bj(a,b)},
$1:function(a){return this.$2(a,null)}},
qG:{"^":"a:2;a,b,c",
$0:function(){this.a.bj(this.b,this.c)}},
qD:{"^":"a:2;a,b",
$0:function(){var z,y
z=this.a
y=z.dn()
z.a=4
z.c=this.b
P.bu(z,y)}},
qH:{"^":"a:2;a,b",
$0:function(){P.d9(this.b,this.a)}},
qC:{"^":"a:2;a,b,c",
$0:function(){this.a.bj(this.b,this.c)}},
qL:{"^":"a:7;a,b,c,d",
$0:function(){var z,y,x,w,v,u,t
z=null
try{z=this.d.k7()}catch(w){y=H.B(w)
x=H.D(w)
if(this.c){v=this.a.a.c.gbu()
u=y
u=v==null?u==null:v===u
v=u}else v=!1
u=this.b
if(v)u.b=this.a.a.c
else u.b=new P.cG(y,x)
u.a=!0
return}if(!!J.o(z).$isQ){if(z instanceof P.G&&z.gcK()>=4){if(z.gcK()===8){v=this.b
v.b=z.gj2()
v.a=!0}return}t=this.a.a
v=this.b
v.b=z.c3(new P.qM(t))
v.a=!1}}},
qM:{"^":"a:0;a",
$1:function(a){return this.a}},
qK:{"^":"a:7;a,b,c",
$0:function(){var z,y,x,w
try{this.a.b=this.b.k6(this.c)}catch(x){z=H.B(x)
y=H.D(x)
w=this.a
w.b=new P.cG(z,y)
w.a=!0}}},
qJ:{"^":"a:7;a,b,c",
$0:function(){var z,y,x,w,v,u,t,s
try{z=this.a.a.c
w=this.c
if(w.kz(z)===!0&&w.e!=null){v=this.b
v.b=w.jZ(z)
v.a=!1}}catch(u){y=H.B(u)
x=H.D(u)
w=this.a
v=w.a.c.gbu()
t=y
s=this.b
if(v==null?t==null:v===t)s.b=w.a.c
else s.b=new P.cG(y,x)
s.a=!0}}},
hD:{"^":"d;jw:a<,cp:b@"},
ak:{"^":"d;$ti",
aH:function(a,b){return new P.r_(b,this,[H.y(this,"ak",0),null])},
a7:function(a,b){var z,y
z={}
y=new P.G(0,$.q,null,[P.a2])
z.a=null
z.a=this.aG(new P.oU(z,this,b,y),!0,new P.oV(y),y.gbU())
return y},
Z:function(a,b){var z,y
z={}
y=new P.G(0,$.q,null,[null])
z.a=null
z.a=this.aG(new P.oY(z,this,b,y),!0,new P.oZ(y),y.gbU())
return y},
gl:function(a){var z,y
z={}
y=new P.G(0,$.q,null,[P.t])
z.a=0
this.aG(new P.p3(z),!0,new P.p4(z,y),y.gbU())
return y},
gW:function(a){var z,y
z={}
y=new P.G(0,$.q,null,[P.a2])
z.a=null
z.a=this.aG(new P.p_(z,y),!0,new P.p0(y),y.gbU())
return y},
cu:function(a){var z,y,x
z=H.y(this,"ak",0)
y=H.p([],[z])
x=new P.G(0,$.q,null,[[P.N,z]])
this.aG(new P.p5(this,y),!0,new P.p6(y,x),x.gbU())
return x},
bG:function(a){var z,y,x
z=H.y(this,"ak",0)
y=P.a4(null,null,null,z)
x=new P.G(0,$.q,null,[[P.bP,z]])
this.aG(new P.p7(this,y),!0,new P.p8(y,x),x.gbU())
return x},
gw:function(a){var z,y
z={}
y=new P.G(0,$.q,null,[H.y(this,"ak",0)])
z.a=null
z.b=!1
this.aG(new P.p1(z,this),!0,new P.p2(z,y),y.gbU())
return y}},
oU:{"^":"a;a,b,c,d",
$1:function(a){var z,y
z=this.a
y=this.d
P.hZ(new P.oS(this.c,a),new P.oT(z,y),P.hN(z.a,y))},
$S:function(){return H.be(function(a){return{func:1,args:[a]}},this.b,"ak")}},
oS:{"^":"a:2;a,b",
$0:function(){return J.e(this.b,this.a)}},
oT:{"^":"a:52;a,b",
$1:function(a){if(a===!0)P.hO(this.a.a,this.b,!0)}},
oV:{"^":"a:2;a",
$0:function(){this.a.bi(!1)}},
oY:{"^":"a;a,b,c,d",
$1:function(a){P.hZ(new P.oW(this.c,a),new P.oX(),P.hN(this.a.a,this.d))},
$S:function(){return H.be(function(a){return{func:1,args:[a]}},this.b,"ak")}},
oW:{"^":"a:2;a,b",
$0:function(){return this.a.$1(this.b)}},
oX:{"^":"a:0;",
$1:function(a){}},
oZ:{"^":"a:2;a",
$0:function(){this.a.bi(null)}},
p3:{"^":"a:0;a",
$1:function(a){++this.a.a}},
p4:{"^":"a:2;a,b",
$0:function(){this.b.bi(this.a.a)}},
p_:{"^":"a:0;a,b",
$1:function(a){P.hO(this.a.a,this.b,!1)}},
p0:{"^":"a:2;a",
$0:function(){this.a.bi(!0)}},
p5:{"^":"a;a,b",
$1:function(a){this.b.push(a)},
$S:function(){return H.be(function(a){return{func:1,args:[a]}},this.a,"ak")}},
p6:{"^":"a:2;a,b",
$0:function(){this.b.bi(this.a)}},
p7:{"^":"a;a,b",
$1:function(a){this.b.q(0,a)},
$S:function(){return H.be(function(a){return{func:1,args:[a]}},this.a,"ak")}},
p8:{"^":"a:2;a,b",
$0:function(){this.b.bi(this.a)}},
p1:{"^":"a;a,b",
$1:function(a){var z=this.a
z.b=!0
z.a=a},
$S:function(){return H.be(function(a){return{func:1,args:[a]}},this.b,"ak")}},
p2:{"^":"a:2;a,b",
$0:function(){var z,y,x,w
x=this.a
if(x.b){this.b.bi(x.a)
return}try{x=H.aj()
throw H.c(x)}catch(w){z=H.B(w)
y=H.D(w)
P.rv(this.b,z,y)}}},
db:{"^":"d;cK:b<,$ti",
ge_:function(){return new P.d7(this,this.$ti)},
gkp:function(){return(this.b&4)!==0},
gcV:function(){var z=this.b
return(z&1)!==0?this.gbK().gfz():(z&2)===0},
giW:function(){if((this.b&8)===0)return this.a
return this.a.gd4()},
e8:function(){var z,y
if((this.b&8)===0){z=this.a
if(z==null){z=new P.ek(null,null,0,this.$ti)
this.a=z}return z}y=this.a
if(y.gd4()==null)y.c=new P.ek(null,null,0,this.$ti)
return y.c},
gbK:function(){if((this.b&8)!==0)return this.a.gd4()
return this.a},
cA:function(){if((this.b&4)!==0)return new P.w("Cannot add event after closing")
return new P.w("Cannot add event while adding a stream")},
ju:function(a,b){var z,y,x,w
z=this.b
if(z>=4)throw H.c(this.cA())
if((z&2)!==0){z=new P.G(0,$.q,null,[null])
z.bC(null)
return z}z=this.a
y=new P.G(0,$.q,null,[null])
x=a.aG(this.gir(),!1,this.gis(),this.gio())
w=this.b
if((w&1)!==0?this.gbK().gfz():(w&2)===0)x.cY()
this.a=new P.r6(z,y,x,this.$ti)
this.b|=8
return y},
fn:function(){var z=this.c
if(z==null){z=(this.b&2)!==0?$.$get$bm():new P.G(0,$.q,null,[null])
this.c=z}return z},
q:[function(a,b){if(this.b>=4)throw H.c(this.cA())
this.bT(b)},"$1","gjh",2,0,function(){return H.be(function(a){return{func:1,v:true,args:[a]}},this.$receiver,"db")}],
ey:function(a,b){if(this.b>=4)throw H.c(this.cA())
if(a==null)a=new P.cX()
$.q.toString
this.cc(a,b)},
bt:function(){var z=this.b
if((z&4)!==0)return this.fn()
if(z>=4)throw H.c(this.cA())
z|=4
this.b=z
if((z&1)!==0)this.cI()
else if((z&3)===0)this.e8().q(0,C.v)
return this.fn()},
bT:[function(a){var z=this.b
if((z&1)!==0)this.cH(a)
else if((z&3)===0)this.e8().q(0,new P.ee(a,null,this.$ti))},"$1","gir",2,0,function(){return H.be(function(a){return{func:1,v:true,args:[a]}},this.$receiver,"db")}],
cc:[function(a,b){var z=this.b
if((z&1)!==0)this.cJ(a,b)
else if((z&3)===0)this.e8().q(0,new P.ef(a,b,null))},"$2","gio",4,0,47],
e2:[function(){var z=this.a
this.a=z.gd4()
this.b&=4294967287
z.a.bC(null)},"$0","gis",0,0,7],
j9:function(a,b,c,d){var z,y,x,w,v
if((this.b&3)!==0)throw H.c(new P.w("Stream has already been listened to."))
z=$.q
y=d?1:0
x=new P.qv(this,null,null,null,z,y,null,null,this.$ti)
x.fd(a,b,c,d,H.m(this,0))
w=this.giW()
y=this.b|=1
if((y&8)!==0){v=this.a
v.sd4(x)
v.b.d0()}else this.a=x
x.j7(w)
x.ed(new P.r8(this))
return x},
j_:function(a){var z,y,x,w,v,u
z=null
if((this.b&8)!==0)z=this.a.ci()
this.a=null
this.b=this.b&4294967286|2
w=this.r
if(w!=null)if(z==null)try{z=w.$0()}catch(v){y=H.B(v)
x=H.D(v)
u=new P.G(0,$.q,null,[null])
u.fg(y,x)
z=u}else z=z.c5(w)
w=new P.r7(this)
if(z!=null)z=z.c5(w)
else w.$0()
return z}},
r8:{"^":"a:2;a",
$0:function(){P.eq(this.a.d)}},
r7:{"^":"a:7;a",
$0:function(){var z=this.a.c
if(z!=null&&z.a===0)z.bC(null)}},
rg:{"^":"d;$ti",
cH:function(a){this.gbK().bT(a)},
cJ:function(a,b){this.gbK().cc(a,b)},
cI:function(){this.gbK().e2()}},
qs:{"^":"d;$ti",
cH:function(a){this.gbK().cd(new P.ee(a,null,[H.m(this,0)]))},
cJ:function(a,b){this.gbK().cd(new P.ef(a,b,null))},
cI:function(){this.gbK().cd(C.v)}},
qr:{"^":"db+qs;a,b,c,d,e,f,r,$ti"},
rf:{"^":"db+rg;a,b,c,d,e,f,r,$ti"},
d7:{"^":"r9;a,$ti",
gB:function(a){return(H.aD(this.a)^892482866)>>>0},
A:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof P.d7))return!1
return b.a===this.a}},
qv:{"^":"cs;x,a,b,c,d,e,f,r,$ti",
ek:function(){return this.x.j_(this)},
em:[function(){var z=this.x
if((z.b&8)!==0)z.a.cY()
P.eq(z.e)},"$0","gel",0,0,7],
eo:[function(){var z=this.x
if((z.b&8)!==0)z.a.d0()
P.eq(z.f)},"$0","gen",0,0,7]},
qb:{"^":"d;$ti",
cY:function(){this.b.cY()},
d0:function(){this.b.d0()},
ci:function(){var z=this.b.ci()
if(z==null){this.a.bC(null)
return}return z.c5(new P.qc(this))},
eC:function(){this.a.bC(null)}},
qc:{"^":"a:2;a",
$0:function(){this.a.a.bC(null)}},
r6:{"^":"qb;d4:c@,a,b,$ti"},
cs:{"^":"d;cK:e<,$ti",
j7:function(a){if(a==null)return
this.r=a
if(!a.gW(a)){this.e=(this.e|64)>>>0
this.r.d9(this)}},
kF:function(a){var z=this.e
if((z&8)!==0)return
this.e=(z+128|4)>>>0
if(z<128&&this.r!=null)this.r.fS()
if((z&4)===0&&(this.e&32)===0)this.ed(this.gel())},
cY:function(){return this.kF(null)},
d0:function(){var z=this.e
if((z&8)!==0)return
if(z>=128){z-=128
this.e=z
if(z<128){if((z&64)!==0){z=this.r
z=!z.gW(z)}else z=!1
if(z)this.r.d9(this)
else{z=(this.e&4294967291)>>>0
this.e=z
if((z&32)===0)this.ed(this.gen())}}}},
ci:function(){var z=(this.e&4294967279)>>>0
this.e=z
if((z&8)===0)this.e3()
z=this.f
return z==null?$.$get$bm():z},
gfz:function(){return(this.e&4)!==0},
gcV:function(){return this.e>=128},
e3:function(){var z=(this.e|8)>>>0
this.e=z
if((z&64)!==0)this.r.fS()
if((this.e&32)===0)this.r=null
this.f=this.ek()},
bT:["i4",function(a){var z=this.e
if((z&8)!==0)return
if(z<32)this.cH(a)
else this.cd(new P.ee(a,null,[H.y(this,"cs",0)]))}],
cc:["i5",function(a,b){var z=this.e
if((z&8)!==0)return
if(z<32)this.cJ(a,b)
else this.cd(new P.ef(a,b,null))}],
e2:function(){var z=this.e
if((z&8)!==0)return
z=(z|2)>>>0
this.e=z
if(z<32)this.cI()
else this.cd(C.v)},
em:[function(){},"$0","gel",0,0,7],
eo:[function(){},"$0","gen",0,0,7],
ek:function(){return},
cd:function(a){var z,y
z=this.r
if(z==null){z=new P.ek(null,null,0,[H.y(this,"cs",0)])
this.r=z}z.q(0,a)
y=this.e
if((y&64)===0){y=(y|64)>>>0
this.e=y
if(y<128)this.r.d9(this)}},
cH:function(a){var z=this.e
this.e=(z|32)>>>0
this.d.hz(this.a,a)
this.e=(this.e&4294967263)>>>0
this.e5((z&4)!==0)},
cJ:function(a,b){var z,y
z=this.e
y=new P.qu(this,a,b)
if((z&1)!==0){this.e=(z|16)>>>0
this.e3()
z=this.f
if(!!J.o(z).$isQ&&z!==$.$get$bm())z.c5(y)
else y.$0()}else{y.$0()
this.e5((z&4)!==0)}},
cI:function(){var z,y
z=new P.qt(this)
this.e3()
this.e=(this.e|16)>>>0
y=this.f
if(!!J.o(y).$isQ&&y!==$.$get$bm())y.c5(z)
else z.$0()},
ed:function(a){var z=this.e
this.e=(z|32)>>>0
a.$0()
this.e=(this.e&4294967263)>>>0
this.e5((z&4)!==0)},
e5:function(a){var z,y
if((this.e&64)!==0){z=this.r
z=z.gW(z)}else z=!1
if(z){z=(this.e&4294967231)>>>0
this.e=z
if((z&4)!==0)if(z<128){z=this.r
z=z==null||z.gW(z)}else z=!1
else z=!1
if(z)this.e=(this.e&4294967291)>>>0}for(;!0;a=y){z=this.e
if((z&8)!==0){this.r=null
return}y=(z&4)!==0
if(a===y)break
this.e=(z^32)>>>0
if(y)this.em()
else this.eo()
this.e=(this.e&4294967263)>>>0}z=this.e
if((z&64)!==0&&z<128)this.r.d9(this)},
fd:function(a,b,c,d,e){var z=this.d
z.toString
this.a=a
this.b=P.ep(b==null?P.rN():b,z)
this.c=c==null?P.rM():c}},
qu:{"^":"a:7;a,b,c",
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
if(x)w.kX(u,v,this.c)
else w.hz(u,v)
z.e=(z.e&4294967263)>>>0}},
qt:{"^":"a:7;a",
$0:function(){var z,y
z=this.a
y=z.e
if((y&16)===0)return
z.e=(y|42)>>>0
z.d.hx(z.c)
z.e=(z.e&4294967263)>>>0}},
r9:{"^":"ak;$ti",
aG:function(a,b,c,d){return this.a.j9(a,d,c,!0===b)},
eR:function(a,b,c){return this.aG(a,null,b,c)}},
eg:{"^":"d;cp:a@,$ti"},
ee:{"^":"eg;ac:b<,a,$ti",
eS:function(a){a.cH(this.b)}},
ef:{"^":"eg;bu:b<,bq:c<,a",
eS:function(a){a.cJ(this.b,this.c)},
$aseg:I.bg},
qw:{"^":"d;",
eS:function(a){a.cI()},
gcp:function(){return},
scp:function(a){throw H.c(new P.w("No events after a done."))}},
r1:{"^":"d;cK:a<,$ti",
d9:function(a){var z=this.a
if(z===1)return
if(z>=1){this.a=1
return}P.cA(new P.r2(this,a))
this.a=1},
fS:function(){if(this.a===1)this.a=3}},
r2:{"^":"a:2;a,b",
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
ek:{"^":"r1;b,c,a,$ti",
gW:function(a){return this.c==null},
q:function(a,b){var z=this.c
if(z==null){this.c=b
this.b=b}else{z.scp(b)
this.c=b}}},
ra:{"^":"d;a,b,c,$ti"},
rq:{"^":"a:2;a,b,c",
$0:function(){return this.a.bj(this.b,this.c)}},
rp:{"^":"a:21;a,b",
$2:function(a,b){P.ro(this.a,this.b,a,b)}},
rr:{"^":"a:2;a,b",
$0:function(){return this.a.bi(this.b)}},
eh:{"^":"ak;$ti",
aG:function(a,b,c,d){return this.iA(a,d,c,!0===b)},
eR:function(a,b,c){return this.aG(a,null,b,c)},
iA:function(a,b,c,d){return P.qA(this,a,b,c,d,H.y(this,"eh",0),H.y(this,"eh",1))},
fu:function(a,b){b.bT(a)},
iM:function(a,b,c){c.cc(a,b)},
$asak:function(a,b){return[b]}},
hG:{"^":"cs;x,y,a,b,c,d,e,f,r,$ti",
bT:function(a){if((this.e&2)!==0)return
this.i4(a)},
cc:function(a,b){if((this.e&2)!==0)return
this.i5(a,b)},
em:[function(){var z=this.y
if(z==null)return
z.cY()},"$0","gel",0,0,7],
eo:[function(){var z=this.y
if(z==null)return
z.d0()},"$0","gen",0,0,7],
ek:function(){var z=this.y
if(z!=null){this.y=null
return z.ci()}return},
lg:[function(a){this.x.fu(a,this)},"$1","giJ",2,0,function(){return H.be(function(a,b){return{func:1,v:true,args:[a]}},this.$receiver,"hG")}],
li:[function(a,b){this.x.iM(a,b,this)},"$2","giL",4,0,46],
lh:[function(){this.e2()},"$0","giK",0,0,7],
ij:function(a,b,c,d,e,f,g){this.y=this.x.a.eR(this.giJ(),this.giK(),this.giL())},
$ascs:function(a,b){return[b]},
v:{
qA:function(a,b,c,d,e,f,g){var z,y
z=$.q
y=e?1:0
y=new P.hG(a,null,null,null,null,z,y,null,null,[f,g])
y.fd(b,c,d,e,g)
y.ij(a,b,c,d,e,f,g)
return y}}},
r_:{"^":"eh;b,a,$ti",
fu:function(a,b){var z,y,x,w
z=null
try{z=this.b.$1(a)}catch(w){y=H.B(w)
x=H.D(w)
P.rj(b,y,x)
return}b.bT(z)}},
cG:{"^":"d;bu:a<,bq:b<",
k:function(a){return H.b(this.a)},
$isa3:1},
ri:{"^":"d;"},
rD:{"^":"a:2;a,b",
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
r3:{"^":"ri;",
hx:function(a){var z,y,x,w
try{if(C.i===$.q){x=a.$0()
return x}x=P.hW(null,null,this,a)
return x}catch(w){z=H.B(w)
y=H.D(w)
x=P.bx(null,null,this,z,y)
return x}},
hz:function(a,b){var z,y,x,w
try{if(C.i===$.q){x=a.$1(b)
return x}x=P.hY(null,null,this,a,b)
return x}catch(w){z=H.B(w)
y=H.D(w)
x=P.bx(null,null,this,z,y)
return x}},
kX:function(a,b,c){var z,y,x,w
try{if(C.i===$.q){x=a.$2(b,c)
return x}x=P.hX(null,null,this,a,b,c)
return x}catch(w){z=H.B(w)
y=H.D(w)
x=P.bx(null,null,this,z,y)
return x}},
eA:function(a,b){if(b)return new P.r4(this,a)
else return new P.r5(this,a)},
j:function(a,b){return},
hw:function(a){if($.q===C.i)return a.$0()
return P.hW(null,null,this,a)},
eW:function(a,b){if($.q===C.i)return a.$1(b)
return P.hY(null,null,this,a,b)},
kW:function(a,b,c){if($.q===C.i)return a.$2(b,c)
return P.hX(null,null,this,a,b,c)}},
r4:{"^":"a:2;a,b",
$0:function(){return this.a.hx(this.b)}},
r5:{"^":"a:2;a,b",
$0:function(){return this.a.hw(this.b)}}}],["","",,P,{"^":"",
dK:function(a,b){return new H.R(0,null,null,null,null,null,0,[a,b])},
aB:function(){return new H.R(0,null,null,null,null,null,0,[null,null])},
ag:function(a){return H.u9(a,new H.R(0,null,null,null,null,null,0,[null,null]))},
m2:function(a,b,c){var z,y
if(P.eo(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}z=[]
y=$.$get$bZ()
y.push(a)
try{P.ry(a,z)}finally{if(0>=y.length)return H.f(y,-1)
y.pop()}y=P.ha(b,z,", ")+c
return y.charCodeAt(0)==0?y:y},
ce:function(a,b,c){var z,y,x
if(P.eo(a))return b+"..."+c
z=new P.bS(b)
y=$.$get$bZ()
y.push(a)
try{x=z
x.C=P.ha(x.gC(),a,", ")}finally{if(0>=y.length)return H.f(y,-1)
y.pop()}y=z
y.C=y.gC()+c
y=z.gC()
return y.charCodeAt(0)==0?y:y},
eo:function(a){var z,y
for(z=0;y=$.$get$bZ(),z<y.length;++z)if(a===y[z])return!0
return!1},
ry:function(a,b){var z,y,x,w,v,u,t,s,r,q
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
mo:function(a,b,c,d,e){return new H.R(0,null,null,null,null,null,0,[d,e])},
ci:function(a,b,c){var z=P.mo(null,null,null,b,c)
a.Z(0,new P.rP(z))
return z},
a4:function(a,b,c,d){return new P.hJ(0,null,null,null,null,null,0,[d])},
b9:function(a,b){var z,y
z=P.a4(null,null,null,b)
for(y=J.ai(a);y.u();)z.q(0,y.gS())
return z},
dP:function(a){var z,y,x
z={}
if(P.eo(a))return"{...}"
y=new P.bS("")
try{$.$get$bZ().push(a)
x=y
x.C=x.gC()+"{"
z.a=!0
a.Z(0,new P.mz(z,y))
z=y
z.C=z.gC()+"}"}finally{z=$.$get$bZ()
if(0>=z.length)return H.f(z,-1)
z.pop()}z=y.gC()
return z.charCodeAt(0)==0?z:z},
hK:{"^":"R;a,b,c,d,e,f,r,$ti",
cT:function(a){return H.uJ(a)&0x3ffffff},
cU:function(a,b){var z,y,x
if(a==null)return-1
z=a.length
for(y=0;y<z;++y){x=a[y].gh8()
if(x==null?b==null:x===b)return y}return-1},
v:{
bW:function(a,b){return new P.hK(0,null,null,null,null,null,0,[a,b])}}},
hJ:{"^":"qN;a,b,c,d,e,f,r,$ti",
ei:function(){return new P.hJ(0,null,null,null,null,null,0,this.$ti)},
ga_:function(a){var z=new P.ae(this,this.r,null,null,[null])
z.c=this.e
return z},
gl:function(a){return this.a},
gW:function(a){return this.a===0},
gat:function(a){return this.a!==0},
a7:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null)return!1
return z[b]!=null}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null)return!1
return y[b]!=null}else return this.iy(b)},
iy:function(a){var z=this.d
if(z==null)return!1
return this.dk(z[this.dj(a)],a)>=0},
co:function(a){var z
if(!(typeof a==="string"&&a!=="__proto__"))z=typeof a==="number"&&(a&0x3ffffff)===a
else z=!0
if(z)return this.a7(0,a)?a:null
else return this.iQ(a)},
iQ:function(a){var z,y,x
z=this.d
if(z==null)return
y=z[this.dj(a)]
x=this.dk(y,a)
if(x<0)return
return J.az(y,x).gfm()},
Z:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$1(z.a)
if(y!==this.r)throw H.c(new P.C(this))
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
z=y}return this.fh(z,b)}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.c=y
x=y}return this.fh(x,b)}else return this.aC(b)},
aC:function(a){var z,y,x
z=this.d
if(z==null){z=P.qW()
this.d=z}y=this.dj(a)
x=z[y]
if(x==null)z[y]=[this.e6(a)]
else{if(this.dk(x,a)>=0)return!1
x.push(this.e6(a))}return!0},
a3:function(a,b){if(typeof b==="string"&&b!=="__proto__")return this.fi(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.fi(this.c,b)
else return this.j0(b)},
j0:function(a){var z,y,x
z=this.d
if(z==null)return!1
y=z[this.dj(a)]
x=this.dk(y,a)
if(x<0)return!1
this.fj(y.splice(x,1)[0])
return!0},
iG:function(a,b){var z,y,x,w,v
z=this.e
for(;z!=null;z=x){y=z.a
x=z.b
w=this.r
v=a.$1(y)
if(w!==this.r)throw H.c(new P.C(this))
if(b===v)this.a3(0,y)}},
bf:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
fh:function(a,b){if(a[b]!=null)return!1
a[b]=this.e6(b)
return!0},
fi:function(a,b){var z
if(a==null)return!1
z=a[b]
if(z==null)return!1
this.fj(z)
delete a[b]
return!0},
e6:function(a){var z,y
z=new P.qV(a,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.c=y
y.b=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
fj:function(a){var z,y
z=a.gix()
y=a.b
if(z==null)this.e=y
else z.b=y
if(y==null)this.f=z
else y.c=z;--this.a
this.r=this.r+1&67108863},
dj:function(a){return J.j(a)&0x3ffffff},
dk:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.e(a[y].gfm(),b))return y
return-1},
$isbP:1,
$isZ:1,
v:{
qW:function(){var z=Object.create(null)
z["<non-identifier-key>"]=z
delete z["<non-identifier-key>"]
return z}}},
qV:{"^":"d;fm:a<,b,ix:c<"},
ae:{"^":"d;a,b,c,d,$ti",
gS:function(){return this.d},
u:function(){var z=this.a
if(this.b!==z.r)throw H.c(new P.C(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.b
return!0}}}},
qN:{"^":"oh;$ti",
bG:function(a){var z=this.ei()
z.aw(0,this)
return z}},
cd:{"^":"A;$ti"},
rP:{"^":"a:6;a",
$2:function(a,b){this.a.n(0,a,b)}},
fq:{"^":"fz;$ti"},
fz:{"^":"d+ba;$ti",$asN:null,$asZ:null,$isN:1,$isZ:1},
ba:{"^":"d;$ti",
ga_:function(a){return new H.dL(this,this.gl(this),0,null,[H.y(this,"ba",0)])},
as:function(a,b){return this.j(0,b)},
Z:function(a,b){var z,y
z=this.gl(this)
for(y=0;y<z;++y){b.$1(this.j(0,y))
if(z!==this.gl(this))throw H.c(new P.C(this))}},
gW:function(a){return this.gl(this)===0},
gat:function(a){return!this.gW(this)},
gw:function(a){if(this.gl(this)===0)throw H.c(H.aj())
return this.j(0,this.gl(this)-1)},
a7:function(a,b){var z,y
z=this.gl(this)
for(y=0;y<this.gl(this);++y){if(J.e(this.j(0,y),b))return!0
if(z!==this.gl(this))throw H.c(new P.C(this))}return!1},
bs:function(a,b){var z,y
z=this.gl(this)
for(y=0;y<z;++y){if(b.$1(this.j(0,y))===!0)return!0
if(z!==this.gl(this))throw H.c(new P.C(this))}return!1},
aR:function(a,b,c){var z,y,x
z=this.gl(this)
for(y=0;y<z;++y){x=this.j(0,y)
if(b.$1(x)===!0)return x
if(z!==this.gl(this))throw H.c(new P.C(this))}return c.$0()},
aH:function(a,b){return new H.ap(this,b,[H.y(this,"ba",0),null])},
dZ:function(a,b){return H.hc(this,b,null,H.y(this,"ba",0))},
bG:function(a){var z,y
z=P.a4(null,null,null,H.y(this,"ba",0))
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
if(y!==this.gl(this))throw H.c(new P.C(this))}if(z.length!==this.gl(this)){this.hW(0,0,z.length,z)
this.sl(0,z.length)}},
b6:function(a,b,c,d,e){var z,y,x,w,v
P.cl(b,c,this.gl(this),null,null,null)
z=c-b
if(z===0)return
if(H.aV(d,"$isN",[H.y(this,"ba",0)],"$asN")){y=e
x=d}else{x=J.j_(d,e).bF(0,!1)
y=0}w=J.K(x)
if(y+z>w.gl(x))throw H.c(H.fe())
if(y<b)for(v=z-1;v>=0;--v)this.n(0,b+v,w.j(x,y+v))
else for(v=0;v<z;++v)this.n(0,b+v,w.j(x,y+v))},
hW:function(a,b,c,d){return this.b6(a,b,c,d,0)},
bP:function(a,b,c){var z
if(c>=this.gl(this))return-1
for(z=c;z<this.gl(this);++z)if(J.e(this.j(0,z),b))return z
return-1},
b_:function(a,b){return this.bP(a,b,0)},
k:function(a){return P.ce(this,"[","]")},
$isN:1,
$isZ:1},
rh:{"^":"d;$ti",
n:function(a,b,c){throw H.c(new P.S("Cannot modify unmodifiable map"))},
$isH:1},
mx:{"^":"d;$ti",
j:function(a,b){return this.a.j(0,b)},
n:function(a,b,c){this.a.n(0,b,c)},
ab:function(a){return this.a.ab(a)},
Z:function(a,b){this.a.Z(0,b)},
gW:function(a){var z=this.a
return z.gW(z)},
gat:function(a){var z=this.a
return z.gat(z)},
gl:function(a){var z=this.a
return z.gl(z)},
k:function(a){return this.a.k(0)},
$isH:1},
hy:{"^":"mx+rh;a,$ti",$asH:null,$isH:1},
mz:{"^":"a:6;a,b",
$2:function(a,b){var z,y
z=this.a
if(!z.a)this.b.C+=", "
z.a=!1
z=this.b
y=z.C+=H.b(a)
z.C=y+": "
z.C+=H.b(b)}},
mp:{"^":"b0;a,b,c,d,$ti",
ga_:function(a){return new P.da(this,this.c,this.d,this.b,null,this.$ti)},
Z:function(a,b){var z,y,x
z=this.d
for(y=this.b;y!==this.c;y=(y+1&this.a.length-1)>>>0){x=this.a
if(y<0||y>=x.length)return H.f(x,y)
b.$1(x[y])
if(z!==this.d)H.i(new P.C(this))}},
gW:function(a){return this.b===this.c},
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
as:function(a,b){var z,y,x,w
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
if(H.aV(b,"$isN",z,"$asN")){y=b.gl(b)
x=this.gl(this)
w=x+y
v=this.a
u=v.length
if(w>=u){t=P.mq(w+(w>>>1))
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
this.c=q}}++this.d}else for(z=new P.da(b,b.c,b.d,b.b,null,[H.m(b,0)]);z.u();)this.aC(z.e)},
bf:function(a){var z,y,x,w,v
z=this.b
y=this.c
if(z!==y){for(x=this.a,w=x.length,v=w-1;z!==y;z=(z+1&v)>>>0){if(z<0||z>=w)return H.f(x,z)
x[z]=null}this.c=0
this.b=0;++this.d}},
k:function(a){return P.ce(this,"{","}")},
fO:function(a){var z,y,x
z=this.b
y=this.a
x=y.length
z=(z-1&x-1)>>>0
this.b=z
if(z<0||z>=x)return H.f(y,z)
y[z]=a
if(z===this.c)this.ft();++this.d},
dI:function(){var z,y,x,w
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
if(this.b===x)this.ft();++this.d},
ft:function(){var z,y,x,w
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
bb:function(a,b){var z=new P.mp(null,0,0,0,[b])
z.i8(a,b)
return z},
mq:function(a){var z
a=C.O.f5(a,1)-1
for(;!0;a=z)z=(a&a-1)>>>0}}},
da:{"^":"d;a,b,c,d,e,$ti",
gS:function(){return this.e},
u:function(){var z,y,x
z=this.a
if(this.c!==z.d)H.i(new P.C(z))
y=this.d
if(y===this.b){this.e=null
return!1}z=z.a
x=z.length
if(y>=x)return H.f(z,y)
this.e=z[y]
this.d=(y+1&x-1)>>>0
return!0}},
oi:{"^":"d;$ti",
gW:function(a){return this.a===0},
gat:function(a){return this.a!==0},
aw:function(a,b){var z
for(z=J.ai(b);z.u();)this.q(0,z.gS())},
jB:function(a){var z,y
for(z=a.a,y=new P.ae(z,z.r,null,null,[null]),y.c=z.e;y.u();)if(!this.a7(0,y.d))return!1
return!0},
bF:function(a,b){var z,y,x,w,v
z=H.p([],this.$ti)
C.a.sl(z,this.a)
for(y=new P.ae(this,this.r,null,null,[null]),y.c=this.e,x=0;y.u();x=v){w=y.d
v=x+1
if(x>=z.length)return H.f(z,x)
z[x]=w}return z},
cu:function(a){return this.bF(a,!0)},
aH:function(a,b){return new H.bG(this,b,[H.m(this,0),null])},
k:function(a){return P.ce(this,"{","}")},
Z:function(a,b){var z
for(z=new P.ae(this,this.r,null,null,[null]),z.c=this.e;z.u();)b.$1(z.d)},
bv:function(a,b,c){var z,y
for(z=new P.ae(this,this.r,null,null,[null]),z.c=this.e,y=b;z.u();)y=c.$2(y,z.d)
return y},
gw:function(a){var z,y
z=new P.ae(this,this.r,null,null,[null])
z.c=this.e
if(!z.u())throw H.c(H.aj())
do y=z.d
while(z.u())
return y},
aR:function(a,b,c){var z,y
for(z=new P.ae(this,this.r,null,null,[null]),z.c=this.e;z.u();){y=z.d
if(b.$1(y)===!0)return y}if(c!=null)return c.$0()
throw H.c(H.aj())},
cj:function(a,b){return this.aR(a,b,null)},
bB:function(a,b){var z,y,x,w
for(z=new P.ae(this,this.r,null,null,[null]),z.c=this.e,y=null,x=!1;z.u();){w=z.d
if(b.$1(w)===!0){if(x)throw H.c(H.dB())
y=w
x=!0}}if(x)return y
throw H.c(H.aj())},
$isbP:1,
$isZ:1},
oh:{"^":"oi;$ti"}}],["","",,P,{"^":"",
dd:function(a){var z
if(a==null)return
if(typeof a!="object")return a
if(Object.getPrototypeOf(a)!==Array.prototype)return new P.qQ(a,Object.create(null),null)
for(z=0;z<a.length;++z)a[z]=P.dd(a[z])
return a},
rB:function(a,b){var z,y,x,w
if(typeof a!=="string")throw H.c(H.T(a))
z=null
try{z=JSON.parse(a)}catch(x){y=H.B(x)
w=String(y)
throw H.c(new P.f9(w,null,null))}w=P.dd(z)
return w},
xh:[function(a){return a.dO()},"$1","tN",2,0,0],
qQ:{"^":"d;a,b,c",
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
gW:function(a){var z
if(this.b==null){z=this.c
z=z.gl(z)}else z=this.cC().length
return z===0},
gat:function(a){var z
if(this.b==null){z=this.c
z=z.gl(z)}else z=this.cC().length
return z>0},
n:function(a,b,c){var z,y
if(this.b==null)this.c.n(0,b,c)
else if(this.ab(b)){z=this.b
z[b]=c
y=this.a
if(y==null?z!=null:y!==z)y[b]=null}else this.jb().n(0,b,c)},
ab:function(a){if(this.b==null)return this.c.ab(a)
if(typeof a!=="string")return!1
return Object.prototype.hasOwnProperty.call(this.a,a)},
Z:function(a,b){var z,y,x,w
if(this.b==null)return this.c.Z(0,b)
z=this.cC()
for(y=0;y<z.length;++y){x=z[y]
w=this.b[x]
if(typeof w=="undefined"){w=P.dd(this.a[x])
this.b[x]=w}b.$2(x,w)
if(z!==this.c)throw H.c(new P.C(this))}},
k:function(a){return P.dP(this)},
cC:function(){var z=this.c
if(z==null){z=Object.keys(this.a)
this.c=z}return z},
jb:function(){var z,y,x,w,v
if(this.b==null)return this.c
z=P.dK(P.r,null)
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
$isH:1,
$asH:function(){return[P.r,null]}},
f2:{"^":"d;$ti"},
cM:{"^":"d;$ti"},
dG:{"^":"a3;a,b",
k:function(a){if(this.b!=null)return"Converting object to an encodable object failed."
else return"Converting object did not return an encodable object."}},
m7:{"^":"dG;a,b",
k:function(a){return"Cyclic error in JSON stringify"}},
m6:{"^":"f2;a,b",
jF:function(a,b){var z=P.rB(a,this.gjG().a)
return z},
jE:function(a){return this.jF(a,null)},
jO:function(a,b){var z=this.gjP()
z=P.qS(a,z.b,z.a)
return z},
h_:function(a){return this.jO(a,null)},
gjP:function(){return C.R},
gjG:function(){return C.Q},
$asf2:function(){return[P.d,P.r]}},
m9:{"^":"cM;a,b",
$ascM:function(){return[P.d,P.r]}},
m8:{"^":"cM;a",
$ascM:function(){return[P.r,P.d]}},
qT:{"^":"d;",
hI:function(a){var z,y,x,w,v,u,t
z=J.K(a)
y=z.gl(a)
if(typeof y!=="number")return H.x(y)
x=this.c
w=0
v=0
for(;v<y;++v){u=z.cQ(a,v)
if(u>92)continue
if(u<32){if(v>w)x.C+=C.b.aJ(a,w,v)
w=v+1
x.C+=H.aq(92)
switch(u){case 8:x.C+=H.aq(98)
break
case 9:x.C+=H.aq(116)
break
case 10:x.C+=H.aq(110)
break
case 12:x.C+=H.aq(102)
break
case 13:x.C+=H.aq(114)
break
default:x.C+=H.aq(117)
x.C+=H.aq(48)
x.C+=H.aq(48)
t=u>>>4&15
x.C+=H.aq(t<10?48+t:87+t)
t=u&15
x.C+=H.aq(t<10?48+t:87+t)
break}}else if(u===34||u===92){if(v>w)x.C+=C.b.aJ(a,w,v)
w=v+1
x.C+=H.aq(92)
x.C+=H.aq(u)}}if(w===0)x.C+=H.b(a)
else if(w<y)x.C+=z.aJ(a,w,y)},
e4:function(a){var z,y,x,w
for(z=this.a,y=z.length,x=0;x<y;++x){w=z[x]
if(a==null?w==null:a===w)throw H.c(new P.m7(a,null))}z.push(a)},
dR:function(a){var z,y,x,w
if(this.hH(a))return
this.e4(a)
try{z=this.b.$1(a)
if(!this.hH(z))throw H.c(new P.dG(a,null))
x=this.a
if(0>=x.length)return H.f(x,-1)
x.pop()}catch(w){y=H.B(w)
throw H.c(new P.dG(a,y))}},
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
return!0}else if(!!z.$isH){this.e4(a)
y=this.la(a)
z=this.a
if(0>=z.length)return H.f(z,-1)
z.pop()
return y}else return!1}},
l9:function(a){var z,y,x
z=this.c
z.C+="["
y=J.K(a)
if(y.gl(a)>0){this.dR(y.j(a,0))
for(x=1;x<y.gl(a);++x){z.C+=","
this.dR(y.j(a,x))}}z.C+="]"},
la:function(a){var z,y,x,w,v,u,t
z={}
if(a.gW(a)){this.c.C+="{}"
return!0}y=a.gl(a)*2
x=new Array(y)
z.a=0
z.b=!0
a.Z(0,new P.qU(z,x))
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
qU:{"^":"a:6;a,b",
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
qR:{"^":"qT;c,a,b",v:{
qS:function(a,b,c){var z,y,x
z=new P.bS("")
y=new P.qR(z,[],P.tN())
y.dR(a)
x=z.C
return x.charCodeAt(0)==0?x:x}}}}],["","",,P,{"^":"",
wD:[function(a,b){return J.bE(a,b)},"$2","tO",4,0,40],
f6:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.h(a)
if(typeof a==="string")return JSON.stringify(a)
return P.l7(a)},
l7:function(a){var z=J.o(a)
if(!!z.$isa)return z.k(a)
return H.cZ(a)},
cP:function(a){return new P.qz(a)},
P:function(a,b,c){var z,y
z=H.p([],[c])
for(y=J.ai(a);y.u();)z.push(y.gS())
if(b)return z
z.fixed$length=Array
return z},
mr:function(a,b,c,d){var z,y,x
z=H.p(new Array(a),[d])
for(y=0;y<a;++y){x=b.$1(y)
if(y>=z.length)return H.f(z,y)
z[y]=x}return z},
aC:function(a,b){var z=P.P(a,!1,b)
z.fixed$length=Array
z.immutable$list=Array
return z},
eB:function(a){H.uR(H.b(a))},
bq:function(a,b,c){return new H.dD(a,H.dE(a,!1,b,!1),null,null)},
a2:{"^":"d;"},
"+bool":0,
V:{"^":"d;$ti"},
cN:{"^":"d;jc:a<,b",
A:function(a,b){if(b==null)return!1
if(!(b instanceof P.cN))return!1
return this.a===b.a&&!0},
bD:function(a,b){return C.e.bD(this.a,b.gjc())},
gB:function(a){var z=this.a
return(z^C.e.ds(z,30))&1073741823},
k:function(a){var z,y,x,w,v,u,t,s
z=P.kl(H.np(this))
y=P.c6(H.nn(this))
x=P.c6(H.nj(this))
w=P.c6(H.nk(this))
v=P.c6(H.nm(this))
u=P.c6(H.no(this))
t=P.km(H.nl(this))
s=z+"-"+y+"-"+x+" "+w+":"+v+":"+u+"."+t
return s},
q:function(a,b){var z,y
z=this.a+b.gkd()
y=new P.cN(z,!1)
if(!(Math.abs(z)>864e13))z=!1
else z=!0
if(z)H.i(P.F(y.gkA()))
return y},
gkA:function(){return this.a},
$isV:1,
$asV:function(){return[P.cN]},
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
aW:{"^":"M;",$isV:1,
$asV:function(){return[P.M]}},
"+double":0,
b8:{"^":"d;bV:a<",
ai:function(a,b){return new P.b8(this.a+b.gbV())},
aq:function(a,b){return new P.b8(this.a-b.gbV())},
c8:function(a,b){if(typeof b!=="number")return H.x(b)
return new P.b8(C.j.hv(this.a*b))},
aX:function(a,b){return C.e.aX(this.a,b.gbV())},
bo:function(a,b){return this.a>b.gbV()},
d8:function(a,b){return this.a<=b.gbV()},
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
f4:function(a){return new P.b8(0-this.a)},
$isV:1,
$asV:function(){return[P.b8]}},
kO:{"^":"a:12;",
$1:function(a){if(a>=1e5)return""+a
if(a>=1e4)return"0"+a
if(a>=1000)return"00"+a
if(a>=100)return"000"+a
if(a>=10)return"0000"+a
return"00000"+a}},
kP:{"^":"a:12;",
$1:function(a){if(a>=10)return""+a
return"0"+a}},
a3:{"^":"d;",
gbq:function(){return H.D(this.$thrownJsError)}},
cX:{"^":"a3;",
k:function(a){return"Throw of null."}},
b7:{"^":"a3;a,b,h:c<,d",
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
u=P.f6(this.b)
return w+v+": "+H.b(u)},
v:{
F:function(a){return new P.b7(!1,null,null,a)},
cF:function(a,b,c){return new P.b7(!0,a,b,c)},
l:function(a){return new P.b7(!1,null,a,"Must not be null")}}},
e3:{"^":"b7;e,f,a,b,c,d",
gea:function(){return"RangeError"},
ge9:function(){var z,y,x
z=this.e
if(z==null){z=this.f
y=z!=null?": Not less than or equal to "+H.b(z):""}else{x=this.f
if(x==null)y=": Not greater than or equal to "+H.b(z)
else if(x>z)y=": Not in range "+H.b(z)+".."+H.b(x)+", inclusive"
else y=x<z?": Valid value range is empty":": Only valid value is "+H.b(z)}return y},
v:{
nv:function(a){return new P.e3(null,null,!1,null,null,a)},
ck:function(a,b,c){return new P.e3(null,null,!0,a,b,"Value not in range")},
a6:function(a,b,c,d,e){return new P.e3(b,c,!0,a,d,"Invalid value")},
nw:function(a,b,c,d,e){if(a<b||a>c)throw H.c(P.a6(a,b,c,d,e))},
cl:function(a,b,c,d,e,f){if(0>a||a>c)throw H.c(P.a6(a,0,c,"start",f))
if(a>b||b>c)throw H.c(P.a6(b,a,c,"end",f))
return b}}},
lS:{"^":"b7;e,l:f>,a,b,c,d",
gea:function(){return"RangeError"},
ge9:function(){if(J.c1(this.b,0))return": index must not be negative"
var z=this.f
if(z===0)return": no indices are valid"
return": index should be less than "+H.b(z)},
v:{
cS:function(a,b,c,d,e){var z=e!=null?e:J.aM(b)
return new P.lS(b,z,!0,a,c,"Index out of range")}}},
S:{"^":"a3;a",
k:function(a){return"Unsupported operation: "+this.a}},
X:{"^":"a3;a",
k:function(a){var z=this.a
return z!=null?"UnimplementedError: "+z:"UnimplementedError"}},
w:{"^":"a3;a",
k:function(a){return"Bad state: "+this.a}},
C:{"^":"a3;a",
k:function(a){var z=this.a
if(z==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+H.b(P.f6(z))+"."}},
mV:{"^":"d;",
k:function(a){return"Out of Memory"},
gbq:function(){return},
$isa3:1},
h6:{"^":"d;",
k:function(a){return"Stack Overflow"},
gbq:function(){return},
$isa3:1},
kk:{"^":"a3;a",
k:function(a){var z=this.a
return z==null?"Reading static variable during its initialization":"Reading static variable '"+H.b(z)+"' during its initialization"}},
qz:{"^":"d;a",
k:function(a){var z=this.a
if(z==null)return"Exception"
return"Exception: "+H.b(z)}},
f9:{"^":"d;a,b,c",
k:function(a){var z,y,x
z=this.a
y=""!==z?"FormatException: "+z:"FormatException"
x=this.b
if(typeof x!=="string")return y
if(x.length>78)x=C.b.aJ(x,0,75)+"..."
return y+"\n"+x}},
lc:{"^":"d;h:a<,fA,$ti",
k:function(a){return"Expando:"+H.b(this.a)},
j:function(a,b){var z,y
z=this.fA
if(typeof z!=="string"){if(b==null||typeof b==="boolean"||typeof b==="number"||typeof b==="string")H.i(P.cF(b,"Expandos are not allowed on strings, numbers, booleans or null",null))
return z.get(b)}y=H.dZ(b,"expando$values")
return y==null?null:H.dZ(y,z)},
n:function(a,b,c){var z,y
z=this.fA
if(typeof z!=="string")z.set(b,c)
else{y=H.dZ(b,"expando$values")
if(y==null){y=new P.d()
H.fJ(b,"expando$values",y)}H.fJ(y,z,c)}}},
bH:{"^":"d;"},
t:{"^":"M;",$isV:1,
$asV:function(){return[P.M]}},
"+int":0,
A:{"^":"d;$ti",
aH:function(a,b){return H.bI(this,b,H.y(this,"A",0),null)},
c6:["dg",function(a,b){return new H.L(this,b,[H.y(this,"A",0)])}],
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
bF:function(a,b){return P.P(this,b,H.y(this,"A",0))},
cu:function(a){return this.bF(a,!0)},
bG:function(a){return P.b9(this,H.y(this,"A",0))},
gl:function(a){var z,y
z=this.ga_(this)
for(y=0;z.u();)++y
return y},
gW:function(a){return!this.ga_(this).u()},
gat:function(a){return!this.gW(this)},
dZ:function(a,b){return H.oo(this,b,H.y(this,"A",0))},
gw:function(a){var z,y
z=this.ga_(this)
if(!z.u())throw H.c(H.aj())
do y=z.gS()
while(z.u())
return y},
gca:function(a){var z,y
z=this.ga_(this)
if(!z.u())throw H.c(H.aj())
y=z.gS()
if(z.u())throw H.c(H.dB())
return y},
as:function(a,b){var z,y,x
if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(P.l("index"))
if(b<0)H.i(P.a6(b,0,null,"index",null))
for(z=this.ga_(this),y=0;z.u();){x=z.gS()
if(b===y)return x;++y}throw H.c(P.cS(b,this,"index",null,y))},
k:function(a){return P.m2(this,"(",")")}},
cU:{"^":"d;$ti"},
N:{"^":"d;$ti",$isA:1,$isZ:1},
"+List":0,
H:{"^":"d;$ti"},
as:{"^":"d;",
gB:function(a){return P.d.prototype.gB.call(this,this)},
k:function(a){return"null"}},
"+Null":0,
M:{"^":"d;",$isV:1,
$asV:function(){return[P.M]}},
"+num":0,
d:{"^":";",
A:function(a,b){return this===b},
gB:function(a){return H.aD(this)},
k:function(a){return H.cZ(this)},
gby:function(a){return new H.av(H.io(this),null)},
toString:function(){return this.k(this)}},
bo:{"^":"d;"},
bP:{"^":"Z;$ti"},
b1:{"^":"d;"},
r:{"^":"d;",$isV:1,
$asV:function(){return[P.r]},
$isdW:1},
"+String":0,
bS:{"^":"d;C<",
gl:function(a){return this.C.length},
gW:function(a){return this.C.length===0},
gat:function(a){return this.C.length!==0},
k:function(a){var z=this.C
return z.charCodeAt(0)==0?z:z},
v:{
ha:function(a,b,c){var z=J.ai(b)
if(!z.u())return a
if(c.length===0){do a+=H.b(z.gS())
while(z.u())}else{a+=H.b(z.gS())
for(;z.u();)a=a+c+H.b(z.gS())}return a},
pb:function(a){return new P.bS(a)}}}}],["","",,P,{"^":"",fV:{"^":"d;"}}],["","",,P,{"^":"",
e2:function(a){return C.L},
qP:{"^":"d;",
ap:function(a){if(a<=0||a>4294967296)throw H.c(P.nv("max must be in range 0 < max \u2264 2^32, was "+a))
return Math.random()*a>>>0},
kC:function(){return Math.random()}}}],["","",,S,{"^":"",k9:{"^":"d;a,b,$ti",
j:function(a,b){return this.b.j(0,b)},
ab:function(a){return this.b.ab(a)},
Z:function(a,b){return this.b.Z(0,b)},
gW:function(a){var z=this.b
return z.gW(z)},
gat:function(a){var z=this.b
return z.gat(z)},
gl:function(a){var z=this.b
return z.gl(z)},
n:function(a,b,c){this.iS()
this.b.n(0,b,c)},
k:function(a){return J.h(this.b)},
iS:function(){if(!this.a)return
this.a=!1
this.b=P.ci(this.b,H.m(this,0),H.m(this,1))},
$isH:1}}],["","",,A,{"^":"",ka:{"^":"d;a,b,$ti",
gl:function(a){return this.b.a},
co:function(a){return this.b.co(a)},
a7:function(a,b){return this.b.a7(0,b)},
Z:function(a,b){return this.b.Z(0,b)},
gW:function(a){return this.b.a===0},
gat:function(a){return this.b.a!==0},
ga_:function(a){var z,y
z=this.b
y=new P.ae(z,z.r,null,null,[null])
y.c=z.e
return y},
gw:function(a){var z=this.b
return z.gw(z)},
aH:function(a,b){var z=this.b
z.toString
return new H.bG(z,b,[H.m(z,0),null])},
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
this.b=P.b9(this.b,H.m(this,0))},
$isbP:1,
$isZ:1}}],["","",,S,{"^":"",du:{"^":"d;fC:a<,b,$ti",
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
if(!z.$isdu)return!1
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
b_:function(a,b){return this.bP(a,b,0)},
ga_:function(a){var z=this.a
return new J.bk(z,z.length,0,null,[H.m(z,0)])},
aH:function(a,b){var z=this.a
z.toString
return new H.ap(z,b,[H.m(z,0),null])},
a7:function(a,b){var z=this.a
return(z&&C.a).a7(z,b)},
Z:function(a,b){var z=this.a
return(z&&C.a).Z(z,b)},
bG:function(a){var z=this.a
z.toString
return P.b9(z,H.m(z,0))},
gW:function(a){return this.a.length===0},
gat:function(a){return this.a.length!==0},
gw:function(a){var z=this.a
return(z&&C.a).gw(z)},
aj:function(){if(new H.av(H.Y(H.m(this,0)),null).A(0,C.q))throw H.c(new P.S('explicit element type required, for example "new BuiltList<int>"'))}},O:{"^":"d;fC:a<,b,$ti",
p:function(){var z,y
z=this.b
if(z==null){z=this.a
y=new S.du(z,null,this.$ti)
y.aj()
this.a=z
this.b=y
z=y}return z},
m:function(a){if(H.aV(a,"$isdu",this.$ti,null)){this.a=a.gfC()
this.b=a}else{this.a=P.P(a,!0,H.m(this,0))
this.b=null}},
j:function(a,b){var z=this.a
if(b>>>0!==b||b>=z.length)return H.f(z,b)
return z[b]},
n:function(a,b,c){var z
if(c==null)H.i(P.F("null element"))
z=this.geq()
if(b>>>0!==b||b>=z.length)return H.f(z,b)
z[b]=c},
q:function(a,b){var z
if(b==null)H.i(P.F("null element"))
z=this.geq();(z&&C.a).q(z,b)},
a3:function(a,b){var z=this.geq();(z&&C.a).a3(z,b)},
aH:function(a,b){var z=this.a
z.toString
z=new H.ap(z,b,[H.m(z,0),null]).bF(0,!0)
this.a=z
this.b=null
this.iu(z)},
geq:function(){if(this.b!=null){this.a=P.P(this.a,!0,H.m(this,0))
this.b=null}return this.a},
aj:function(){if(new H.av(H.Y(H.m(this,0)),null).A(0,C.q))throw H.c(new P.S('explicit element type required, for example "new ListBuilder<int>"'))},
iu:function(a){var z,y,x,w
for(z=a.length,y=H.m(this,0),x=0;x<a.length;a.length===z||(0,H.ar)(a),++x){w=a[x]
if(!H.dg(w,y))throw H.c(P.F("invalid element: "+H.b(w)))}}}}],["","",,A,{"^":"",cJ:{"^":"d;iR:a<,b,c,d,$ti",
a1:function(a){var z=new A.cW(null,null,this.$ti)
z.ce()
z.m(this)
a.$1(z)
return z.p()},
E:function(){return new S.k9(!0,this.a,this.$ti)},
gB:function(a){var z=this.b
if(z==null){z=this.a.gcm()
z=H.bI(z,new A.jV(this),H.y(z,"A",0),null)
z=P.P(z,!1,H.y(z,"A",0))
C.a.f8(z)
z=X.bC(z)
this.b=z}return z},
A:function(a,b){var z,y,x,w,v
if(b==null)return!1
if(b===this)return!0
z=J.o(b)
if(!z.$iscJ)return!1
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
gW:function(a){var z=this.a
return z.gW(z)},
gat:function(a){var z=this.a
return z.gat(z)},
gl:function(a){var z=this.a
return z.gl(z)},
ce:function(){if(new H.av(H.Y(H.m(this,0)),null).A(0,C.q))throw H.c(new P.S('explicit key type required, for example "new BuiltMap<int, int>"'))
if(new H.av(H.Y(H.m(this,1)),null).A(0,C.q))throw H.c(new P.S('explicit value type required, for example "new BuiltMap<int, int>"'))}},jV:{"^":"a:0;a",
$1:function(a){var z,y
z=J.j(a)
y=J.j(this.a.a.j(0,a))
return X.de(X.b3(X.b3(0,J.j(z)),J.j(y)))}},cW:{"^":"d;a,b,$ti",
p:function(){var z=this.b
if(z==null){z=new A.cJ(this.a,null,null,null,this.$ti)
z.ce()
this.b=z}return z},
m:function(a){var z
if(H.aV(a,"$iscJ",this.$ti,null)){this.b=a
this.a=a.giR()}else if(!!a.$iscJ){z=P.ci(a.a,H.m(this,0),H.m(this,1))
this.b=null
this.a=z}else if(!!a.$isH){z=P.ci(a,H.m(this,0),H.m(this,1))
this.b=null
this.a=z}else throw H.c(P.F("expected Map or BuiltMap, got "+H.b(a.gby(a))))},
j:function(a,b){return this.a.j(0,b)},
n:function(a,b,c){if(c==null)H.i(P.F("null value"))
this.gj3().n(0,b,c)},
gj3:function(){if(this.b!=null){this.a=P.ci(this.a,H.m(this,0),H.m(this,1))
this.b=null}return this.a},
ce:function(){if(new H.av(H.Y(H.m(this,0)),null).A(0,C.q))throw H.c(new P.S('explicit key type required, for example "new MapBuilder<int, int>"'))
if(new H.av(H.Y(H.m(this,1)),null).A(0,C.q))throw H.c(new P.S('explicit value type required, for example "new MapBuilder<int, int>"'))}}}],["","",,L,{"^":"",dv:{"^":"d;j5:a<,b,$ti",
a1:function(a){var z=new L.aE(null,null,this.$ti)
z.aZ()
z.m(this)
a.$1(z)
return z.p()},
gB:function(a){var z=this.b
if(z==null){z=this.a
z.toString
z=P.P(new H.bG(z,new L.jW(),[H.m(z,0),null]),!1,null)
C.a.f8(z)
z=X.bC(z)
this.b=z}return z},
A:function(a,b){var z,y,x
if(b==null)return!1
if(b===this)return!0
z=J.o(b)
if(!z.$isdv)return!1
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
y=new P.ae(z,z.r,null,null,[null])
y.c=z.e
return y},
aH:function(a,b){var z=this.a
z.toString
return new H.bG(z,b,[H.m(z,0),null])},
a7:function(a,b){return this.a.a7(0,b)},
Z:function(a,b){return this.a.Z(0,b)},
bG:function(a){return new A.ka(!0,this.a,this.$ti)},
gW:function(a){return this.a.a===0},
gat:function(a){return this.a.a!==0},
gw:function(a){var z=this.a
return z.gw(z)},
aR:function(a,b,c){return this.a.aR(0,b,c)},
cj:function(a,b){return this.aR(a,b,null)},
aZ:function(){if(new H.av(H.Y(H.m(this,0)),null).A(0,C.q))throw H.c(new P.S('explicit element type required, for example "new BuiltSet<int>"'))}},jW:{"^":"a:0;",
$1:function(a){return J.j(a)}},aE:{"^":"d;a,b,$ti",
p:function(){var z=this.b
if(z==null){z=new L.dv(this.a,null,this.$ti)
z.aZ()
this.b=z}return z},
m:function(a){var z,y,x,w
if(H.aV(a,"$isdv",this.$ti,null)){this.a=a.gj5()
this.b=a}else{z=H.m(this,0)
y=P.a4(null,null,null,z)
for(x=J.ai(a);x.u();){w=x.gS()
if(H.dg(w,z))y.q(0,w)
else throw H.c(P.F("iterable contained invalid element: "+H.b(w)))}this.b=null
this.a=y}},
q:function(a,b){if(b==null)H.i(P.F("null element"))
this.ger().q(0,b)},
a3:function(a,b){this.ger().a3(0,b)},
aH:function(a,b){var z=this.a
z.toString
z=P.b9(new H.bG(z,b,[H.m(z,0),null]),null)
this.b=null
this.a=z
this.j6(z)},
ger:function(){if(this.b!=null){this.a=P.b9(this.a,H.m(this,0))
this.b=null}return this.a},
aZ:function(){if(new H.av(H.Y(H.m(this,0)),null).A(0,C.q))throw H.c(new P.S('explicit element type required, for example "new SetBuilder<int>"'))},
j6:function(a){var z,y,x
for(z=new P.ae(a,a.r,null,null,[null]),z.c=a.e,y=H.m(this,0);z.u();){x=z.d
if(!H.dg(x,y))throw H.c(P.F("invalid element: "+H.b(x)))}}}}],["","",,Y,{"^":"",
k:function(a,b){if(typeof b!=="number")return H.x(b)
a=536870911&a+b
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
U:function(a){a=536870911&a+((67108863&a)<<3)
a^=a>>>11
return 536870911&a+((16383&a)<<15)}}],["","",,N,{"^":"",nU:{"^":"nS;ch,cx,ag:cy@,bh:db@,dx,b,c,d,e,f,r,x,y,z,Q,a",
hm:function(){var z=$.$get$cB()
z.n(0,"game",this.cx)
z.n(0,"hitpoints",this.cy)
z.n(0,"stamina",this.db)
z.n(0,"gold",this.dx)},
kf:function(){var z,y,x,w
this.cx=null
this.cy=Z.bQ("Health",new N.nX(),"#CCCCCC","Your physical state",100,0,!0,P.aW)
z=P.t
this.db=Z.bQ("Stamina",new N.nY(),"#CCCCCC","Spare physical energy",0,0,!0,z)
z=Z.bQ("Gold",new N.nZ(),"#CCCCCC","Gold coins",0,0,!0,z)
this.dx=z
y=$.$get$c_()
x=this.cy
w=this.db
y=new O.f5(N.bn("EdgeheadGame"),null,!1,null,null,null,null,null,null,null,null,new Y.a1(H.p([],[Y.ah]),0,P.aB()),x,w,z,O.v0(),O.v_(),O.uZ(),y,this.gi_(),new P.bS(""),!1,null)
y.hX()
this.cx=y
y.x="endGame"
$.$get$cx().q(0,0)},
ic:function(){var z,y
z=new O.d2(["# Insignificant Little Vermin",[null,P.ag(["goto","gameLoop"])]],0,null,!1,!1)
y=this.b.a
y.n(0,"start",z)
z.a="start"
z=new O.d2([new N.nW(this),[null,P.ag(["goto","gameLoop"])]],0,null,!1,!1)
y.n(0,"gameLoop",z)
z.a="gameLoop"
z=new O.d2(['<p class="meta">\n  Hit <strong>Restart</strong> (top left) to play again. It will be different.\n</p>'],0,null,!1,!1)
y.n(0,"endGame",z)
z.a="endGame"
this.c=y.j(0,"start")},
v:{
nV:function(){var z,y,x,w
z=Z.bQ("Health",new N.tp(),"#CCCCCC","Your physical state",100,0,!0,P.aW)
y=P.t
x=Z.bQ("Stamina",new N.tq(),"#CCCCCC","Spare physical energy",0,0,!0,y)
y=Z.bQ("Gold",new N.tr(),"#CCCCCC","Gold coins",0,0,!0,y)
w=P.r
z=new N.nU("net.filiph.edgehead.0.0.1",null,z,x,y,new O.o_(new H.R(0,null,null,null,null,null,0,[w,O.d2])),null,null,null,P.a4(null,null,null,w),!1,null,-9999,null,null,null)
z.ic()
return z}}},tp:{"^":"a:18;",
$1:function(a){var z=J.o(a)
if(z.A(a,0))return"\ud83d\udc80"
if(z.d8(a,0.5))return"\ud83d\ude23"
if(z.aX(a,1))return"\ud83d\ude27"
return"\ud83d\ude10"}},tq:{"^":"a:9;",
$1:function(a){return H.b(a)+" \ud83d\udd06"}},tr:{"^":"a:9;",
$1:function(a){return H.b(a)+" \ud83d\udcb0"}},nW:{"^":"a:19;a",
$0:function(){var z=0,y=P.aA(),x=this
var $async$$0=P.ax(function(a,b){if(a===1)return P.aF(b,y)
while(true)switch(z){case 0:z=2
return P.aw(x.a.cx.bx(),$async$$0)
case 2:return P.aG(null,y)}})
return P.aH($async$$0,y)}},nX:{"^":"a:18;",
$1:function(a){var z=J.o(a)
if(z.A(a,0))return"\ud83d\udc80"
if(z.d8(a,0.5))return"\ud83d\ude23"
if(z.aX(a,1))return"\ud83d\ude27"
return"\ud83d\ude10"}},nY:{"^":"a:9;",
$1:function(a){return H.b(a)+" \ud83d\udd06"}},nZ:{"^":"a:9;",
$1:function(a){return H.b(a)+" \ud83d\udcb0"}}}],["","",,M,{"^":"",cO:{"^":"d;"},l4:{"^":"d;"},pW:{"^":"cO;a,b,c",
a1:function(a){var z=new M.eb(null,!1,0,0)
z.m(this)
a.$1(z)
return z.p()},
A:function(a,b){if(b==null)return!1
if(b===this)return!0
if(!(b instanceof M.cO))return!1
return this.a===b.a&&this.b===b.b&&!0},
gB:function(a){return Y.U(Y.k(Y.k(Y.k(0,this.a&0x1FFFFFFF),this.b&0x1FFFFFFF),C.N.gB(!1)))},
k:function(a){return"EdgeheadGlobalState {bloodrockFollowers="+C.e.k(this.a)+",\nbrianaQuoteIndex="+C.e.k(this.b)+",\nhasKegOfBeer="+String(!1)+",\n}"}},eb:{"^":"l4;d,a,b,c",
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
z=new M.pW(y,x,!1)}this.m(z)
return z}}}],["","",,O,{"^":"",
xl:[function(a){var z,y
z=a.gc9()
y=a.gbZ()
if(typeof y!=="number")return H.x(y)
return z-2*y},"$1","dj",2,0,20],
xx:[function(a){var z,y,x
z=a.gc9()
y=a.gd1()
x=a.gbZ()
if(typeof x!=="number")return H.x(x)
return z+y-x},"$1","ic",2,0,20],
f5:{"^":"mt;y,z,Q,ch,cx,cy,db,dx,dy,bH:fr<,fx,fa:fy<,ag:go<,bh:id<,k1,a,b,c,d,e,f,r,x",
hX:function(){var z,y,x,w,v,u
z=P.aC(C.o,null)
y=$.$get$bA()
this.cy=R.b6(1000,"orc",O.dj(),null,null,new G.b2("sword",1,1,!1,!0,!1,z),null,0,2,0,!1,2,!1,C.t,0,y)
this.db=R.b6(1001,"goblin",O.dj(),null,null,new G.b2("scimitar",1,1,!1,!0,!1,P.aC(C.o,null)),null,0,1,0,!1,1,!1,C.t,0,y)
y=new S.O(null,null,[Q.v])
y.aj()
y.m([new Q.v("start_adventure","","",null)])
this.dx=new K.cn(y.p(),"preStartBook",new O.kW(),new O.kX(),null,null,"ground")
y=R.b6(1,"Filip",null,"preStartBook",null,null,null,0,2,1000,!0,2,!0,C.E,1,null)
this.ch=y
z=y.x
y=y.cy
if(typeof z!=="number")return z.d6()
if(typeof y!=="number")return H.x(y)
this.go.sac(z/y)
this.id.sac(this.ch.fx)
this.k1.sac(this.ch.r)
this.cx=R.b6(100,"Briana",null,this.dx.b,null,null,this.ch.y,0,2,0,!1,2,!0,C.a4,0,null)
this.dy=F.fQ(this.dx,!1)
y=K.cn
x=P.P($.$get$i1(),!0,y)
C.a.aw(x,[this.dx,$.$get$eu()])
w=new M.eb(null,!1,0,0).p()
z=this.ch
v=this.cx
u=this.dy
v=P.b9([z,v],R.I)
z=P.bb(null,O.cD)
u=new A.ad(v,P.a4(null,null,null,U.ab),w,z,P.b9(x,y),P.P([u],!0,S.ac),0,null)
this.fr=u
y=new Y.a1(H.p([],[Y.ah]),0,P.aB())
y.b=u.r
this.fx=new B.bK(u,null,y,1,1,!0,!1,!1,0)},
d3:function(){var z=0,y=P.aA(),x,w=this,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
var $async$d3=P.ax(function(a,b){if(a===1)return P.aF(b,y)
while(true)switch(z){case 0:v=w.fy
u=w.gjN()
if(v.hj(u)){z=1
break}t=w.fr.Y(w.ch.y)
s=t.gag()
r=t.ghe()
if(typeof s!=="number"){x=s.d6()
z=1
break}if(typeof r!=="number"){x=H.x(r)
z=1
break}w.go.sac(s/r)
w.id.sac(t.gbh())
r=w.k1
s=t.gf3()
if(!J.e(r.f,s)){r.f=s
r.y=!0
$.cq=!0}s=w.y
s.ha("update() for world at time "+w.fr.r)
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
return P.aw(o.kH(),$async$d3)
case 3:r=o.f
if(r.gW(r)){n=o.a
m=o.b
n.f0("There are no actions available for actorId="+H.b(m)+".")
m="Actions not available for "+H.b(m)+" and "
l=o.c
k=l.a
j=J.o(k)
k="PlanConsequence<"+j.gB(k)+", "+j.k(k)+", "+J.h(l.b)+", "+H.b(l.d)+", "+l.y+", "
n.bO(m+(k+(l.x?"isSuccess":"")+">")+".")}n=Z.n1(r)
i=new Z.n0(new P.hy(r,[null,null]),n)
if(r.gW(r))$.$get$bL().f0("Created with no recommendations.")
if(n.length===0){s.dX("No recommendation for "+H.b(p.gh()))
s.dX(new O.kZ(w))
w.fr.fZ(q.gi());++w.fr.r
z=1
break}z=p.gN()===!0?4:6
break
case 4:u=n.length
if(u>1)for(h=0;r=n.length,h<r;r===u||(0,H.ar)(n),++h);s.bO("planner.generateTable for "+H.b(p.gh()))
o.f1().Z(0,new O.l_(w))
u=i.hl(q.gdD(),O.ic())
u.toString
g=P.P(u,!1,H.y(u,"A",0))
if(g.length!==0&&C.a.bs(g,new O.l0())){w.f.C+=v.cs()
C.a.sl(v.a,0)}v=new O.l1(new O.l3())
u=g.length-1
if(u-0<=32)H.h5(g,0,u,v)
else H.h4(g,0,u,v)
for(v=g.length,u=w.c,h=0;h<g.length;g.length===v||(0,H.ar)(g),++h){f=g[h]
u.$3$helpMessage$script(f.gV(),f.gI(),new O.l2(w,p,f))}z=1
break
z=5
break
case 6:s=p.gfX()
z=7
return P.aw(w.cz(i.kG(s==null?O.ic():s),p,v),$async$d3)
case 7:case 5:v.hj(u)
case 1:return P.aG(x,y)}})
return P.aH($async$d3,y)},
cz:function(a,b,c){var z=0,y=P.aA(),x,w=this,v,u,t
var $async$cz=P.ax(function(d,e){if(d===1)return P.aF(e,y)
while(true)switch(z){case 0:v=a.dv(b,w.fx,w.fr)
u=P.P(v,!0,H.y(v,"A",0))
z=b.gN()===!0?3:5
break
case 3:z=6
return P.aw(w.di(a,b,u),$async$cz)
case 6:z=4
break
case 5:t=S.nt(new H.ap(u,new O.kT(),[H.m(u,0),null]),1)
if(t>=u.length){x=H.f(u,t)
z=1
break}w.fx=u[t]
case 4:C.a.aw(c.a,w.fx.gfa().a)
w.fr=w.fx.gbH()
v=w.y
v.bO(new O.kU(a,b))
v.ak(new O.kV(w,b))
case 1:return P.aG(x,y)}})
return P.aH($async$cz,y)},
di:function(a,b,c){var z=0,y=P.aA(),x=this,w,v,u,t,s,r,q,p,o,n,m,l
var $async$di=P.ax(function(d,e){if(d===1)return P.aF(e,y)
while(true)switch(z){case 0:w=a.H(b,x.fr)
v=J.o(w)
z=v.A(w,1)?2:4
break
case 2:x.fx=C.a.gca(c)
z=3
break
case 4:z=v.A(w,0)?5:7
break
case 5:x.fx=C.a.gca(c)
z=6
break
case 7:u=C.a.gw(J.h(a.gK()).split("."))
v=v.l0(w)
t=a.a9(b,x.fr)
s=a.gO()&&b.kb(a.gK())
r="use "+H.b(u)
x.fG()
z=8
return P.aw(x.e.$4$rerollEffectDescription$rerollable(v,t,r,s),$async$di)
case 8:q=e
s=new H.L(c,new O.kQ(q),[H.m(c,0)])
x.fx=s.gca(s)
if(q.gl8()===!0){p=A.ea(x.fx.gbH())
p.X(b.gi(),new O.kR())
v=x.fx
t=v.gfL()
s=H.p([],[Y.ah])
r=new Y.a1(s,0,P.aB())
C.a.aw(s,v.c.a)
s=v.d
o=v.e
n=v.f
m=v.r
l=v.x
v=v.y
r.b=p.r
x.fx=new B.bK(p,t,r,s,o,n,m,l,v)}case 6:case 3:return P.aG(null,y)}})
return P.aH($async$di,y)}},
kW:{"^":"a:3;",
$3:function(a,b,c){return c.t(0,"UNUSED because this is the first choice",!0)}},
kX:{"^":"a:3;",
$3:function(a,b,c){return H.i(new P.w("Room isn't to be revisited"))}},
kZ:{"^":"a:2;a",
$0:function(){var z=this.a.fr.d
return"- how we got here: "+new H.ap(z,new O.kY(),[H.m(z,0),null]).cl(0," <- ")}},
kY:{"^":"a:0;",
$1:function(a){return a.gaQ()}},
l_:{"^":"a:0;a",
$1:function(a){return this.a.y.bO(a)}},
l3:{"^":"a:41;",
$1:function(a){if(a instanceof Q.z)return H.b(a.b.gh())+" "+a.gV()
return"ZZZZZZ "+a.gV()}},
l0:{"^":"a:0;",
$1:function(a){return a.gV()!==""}},
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
y=new H.ap(z,new O.kS(),[H.m(z,0),null]).cl(0," <- ")
return"- how "+H.b(this.b.gh())+" got here: "+y}},
kS:{"^":"a:0;",
$1:function(a){return a.gaQ()}},
kQ:{"^":"a:0;a",
$1:function(a){return a.geM()===this.a.geM()}},
kR:{"^":"a:0;",
$1:function(a){var z=a.gbh()
if(typeof z!=="number")return z.aq()
a.sbh(z-1)
return a}}}],["","",,Q,{"^":"",
ii:function(a,b,c){return P.aU(function(){var z=a,y=b,x=c
var w=0,v=1,u,t,s,r,q,p
return function $async$ii(d,e){if(d===1){u=e
w=v}while(true)switch(w){case 0:t=y.f
t=t.length!==0?C.a.gw(t):null
s=J.j2(t.b5(y.a,y),new Q.un(z))
t=J.ai(s.a),r=new H.bT(t,s.b,[H.m(s,0)])
case 2:if(!r.u()){w=3
break}q=t.gS()
p=x.$1(q)
if(p.gJ()&&!z.eJ(q,y)){w=2
break}w=4
return p
case 4:w=2
break
case 3:return P.aS()
case 1:return P.aT(u)}}})},
ij:function(a,b,c){return P.aU(function(){var z=a,y=b,x=c
var w=0,v=1,u,t
return function $async$ij(d,e){if(d===1){u=e
w=v}while(true)switch(w){case 0:t=y.f
t=y.dV((t.length!==0?C.a.gw(t):null).gbE()).gjR().a,t=new J.bk(t,t.length,0,null,[H.m(t,0)])
case 2:if(!t.u()){w=3
break}w=4
return x.$1(t.d)
case 4:w=2
break
case 3:return P.aS()
case 1:return P.aT(u)}}})},
ik:function(a,b,c){return P.aU(function(){var z=a,y=b,x=c
var w=0,v=1,u,t
return function $async$ik(d,e){if(d===1){u=e
w=v}while(true)switch(w){case 0:t=y.f
t=(t.length!==0?C.a.gw(t):null).gbk(),t=t.ga_(t)
case 2:if(!t.u()){w=3
break}w=4
return x.$1(t.d)
case 4:w=2
break
case 3:return P.aS()
case 1:return P.aT(u)}}})},
un:{"^":"a:0;a",
$1:function(a){return!J.e(a,this.a)&&a.gaS()}},
af:{"^":"d;",
dv:function(a,b,c){var z=this
return P.aU(function(){var y=a,x=b,w=c
var v=0,u=1,t,s,r,q,p
return function $async$dv(d,e){if(d===1){t=e
v=u}while(true)switch(v){case 0:s=z.H(y,x.gbH())
r=J.al(s)
v=r.bo(s,0)?2:3
break
case 2:q=A.ea(w)
v=4
return B.fE(q,x,z,z.iq(q,y,w,z.gM(),!0),s,!1,!1,!0)
case 4:case 3:v=r.aX(s,1)?5:6
break
case 5:q=A.ea(w)
p=z.ip(q,y,w,z.gL(),!0)
if(typeof s!=="number")H.x(s)
v=7
return B.fE(q,x,z,p,1-s,!0,!1,!1)
case 7:case 6:return P.aS()
case 1:return P.aT(t)}}})},
ff:function(a,b,c,d,e,f){var z,y,x,w,v,u,t
a.x=this
z=a.a.bB(0,new Q.j3(b))
y=new O.eS(null,null,null,null,null,null,null,null,null,null,null,null,null)
x=this.gh()
y.ga5().c=x
x=b.gi()
y.ga5().r=x
y.ga5().f=C.S
y.ga5().cx=f
y.ga5().Q=e
x=this.gJ()
y.ga5().z=x
x=this.ga0()
y.ga5().ch=x
if(!!this.$isz){x=y.ga5()
w=x.x
if(w==null){w=new L.aE(null,null,[P.t])
w.aZ()
w.m(C.d)
x.x=w
x=w}else x=w
w=this.b.gi()
if(w==null)H.i(P.F("null element"))
x.ger().q(0,w)}if(!!this.$isc9){x=this.b.gfY()
y.ga5().d=x}v=new Y.a1(H.p([],[Y.ah]),0,P.aB())
x=a.f
u=(x.length!==0?C.a.gw(x):null).gi()
a.gB(a);(x.length!==0?C.a.gw(x):null).kD(a,v)
this.a=d.$3(z,a,v)
if(a.dl(u)!=null)a.fZ(u);++a.r
w=a.f2(u)
if(!(w==null))w.hh(a,v)
a.x=null
while(!0){w=x.length!==0?C.a.gw(x):null
if((w==null?w:w.dT(a))!=null){w=x.length!==0?C.a.gw(x):null
w=!J.e(w==null?w:w.dd(a),!0)}else w=!0
if(!w)break
if((x.length!==0?C.a.gw(x):null)==null)break
t=C.a.gw(x)
t.dF(a)
C.a.a3(x,t)}x=x.length!==0?C.a.gw(x):null
if(!(x==null))x.hi(a,v)
if(this.a==null)H.i(new P.w("No description given when executing "+this.k(0)+". You should return it from your world-modifying function."))
x=this.a
y.ga5().e=x
x=a.r
y.ga5().y=x
a.d.fO(y.p())
return v},
iq:function(a,b,c,d,e){return this.ff(a,b,c,d,!1,e)},
ip:function(a,b,c,d,e){return this.ff(a,b,c,d,e,!1)}},
j3:{"^":"a:0;a",
$1:function(a){return J.e(a.gi(),this.a.gi())}},
z:{"^":"af;bZ:b<",
gV:function(){var z=new Y.a1(H.p([],[Y.ah]),0,P.aB())
z.fM(0,this.ga6(),this.b)
return z.cs()},
a9:function(a,b){var z=new Y.a1(H.p([],[Y.ah]),0,P.aB())
z.jm(0,this.gaf(),this.b,a,!0)
return z.cs()},
k:function(a){var z=this.b
return"EnemyTargetAction<"+this.ga6()+"::enemy="+H.b(z.gi())+"/"+H.b(z.gh())+">"}},
c9:{"^":"af;",
gV:function(){return this.b.gV()},
k:function(a){return"ExitAction<"+this.b.gV()+">"}},
cc:{"^":"af;",
gV:function(){var z=new Y.a1(H.p([],[Y.ah]),0,P.aB())
z.fM(0,this.ga6(),this.b)
return z.cs()},
k:function(a){return"ItemAction<"+this.gV()+">"}},
nD:{"^":"d;a,b",
k:function(a){return this.b},
v:{"^":"x6<"}}}],["","",,O,{"^":"",cD:{"^":"d;",
k:function(a){return"ActionRecord<"+H.b(this.b)+", "+H.b(this.d)+">"}},mh:{"^":"d;a,b",
k:function(a){return this.b}},pS:{"^":"cD;a,dt:b<,eE:c<,aQ:d<,e,cr:f<,fc:r<,U:x<,hE:y<,z,hF:Q<,hG:ch<",
a1:function(a){var z=new O.eS(null,null,null,null,null,null,null,null,null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
A:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof O.cD))return!1
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
k:function(a){return"ActionRecord {accomplices="+J.h(this.a)+",\nactionName="+J.h(this.b)+",\ndataString="+J.h(this.c)+",\ndescription="+H.b(J.h(this.d))+",\nknownTo="+J.h(this.e)+",\nprotagonist="+H.b(J.h(this.f))+",\nsufferers="+J.h(this.r)+",\ntime="+J.h(this.x)+",\nwasAggressive="+J.h(this.y)+",\nwasFailure="+J.h(this.z)+",\nwasProactive="+J.h(this.Q)+",\nwasSuccess="+J.h(this.ch)+",\n}"}},eS:{"^":"d;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",
gdt:function(){return this.ga5().c},
geE:function(){return this.ga5().d},
gaQ:function(){return this.ga5().e},
gcr:function(){return this.ga5().r},
gfc:function(){var z,y
z=this.ga5()
y=z.x
if(y==null){y=new L.aE(null,null,[P.t])
y.aZ()
y.m(C.d)
z.x=y
z=y}else z=y
return z},
gU:function(){return this.ga5().y},
ghE:function(){return this.ga5().z},
ghF:function(){return this.ga5().ch},
ghG:function(){return this.ga5().cx},
ga5:function(){var z,y
z=this.a
if(z!=null){z=z.a
if(!(z==null)){y=new L.aE(null,null,[H.m(z,0)])
y.aZ()
y.m(z)
z=y}this.b=z
z=this.a
this.c=z.b
this.d=z.c
this.e=z.d
this.f=z.e
this.r=z.f
z=z.r
if(!(z==null)){y=new L.aE(null,null,[H.m(z,0)])
y.aZ()
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
if(x==null){x=new L.aE(null,null,[P.t])
x.aZ()
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
if(r==null){r=new L.aE(null,null,[P.t])
r.aZ()
r.m(C.d)
s.x=r
s=r}else s=r
s=s.p()
r=this.ga5().y
q=this.ga5().z
p=this.ga5().Q
o=this.ga5().ch
n=this.ga5().cx
z=new O.pS(y,x,w,v,u,t,s,r,q,p,o,n)
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
il:function(a,b){return P.aU(function(){var z=a,y=b
var x=0,w=1,v,u
return function $async$il(c,d){if(c===1){v=d
x=w}while(true)switch(x){case 0:x=2
return z
case 2:u=y.a
x=3
return P.bV(new H.L(u,new R.uq(z),[H.m(u,0)]))
case 3:return P.aS()
case 1:return P.aT(v)}}})},
b6:function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){var z=new R.eT(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
new R.tk(a,b,k,m,n,f,e,i,l,o,j,h,d,g,p,c).$1(z)
return z.p()},
uq:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gh2()
y=this.a.gi()
return z==null?y==null:z===y}},
I:{"^":"mD;",
gfR:function(){return!0},
gb0:function(){var z=this.x
if(typeof z!=="number")return z.bo()
return z>0},
gaF:function(){return this.e instanceof K.cb},
gao:function(){return this.dy===C.h},
ga2:function(){return this.dy===C.f},
ga4:function(){return this.dy===C.k},
ka:function(a,b){var z,y,x
for(z=this.cx.a,y=new P.ae(z,z.r,null,null,[null]),y.c=z.e,x=0;y.u();){if(C.a.a7(y.d.gf_(),a))++x
if(x>=b)return!0}return!1},
h7:function(a){return this.ka(a,1)},
jV:function(){var z,y,x,w,v,u,t
for(z=this.cx.a,y=new P.ae(z,z.r,null,null,[null]),y.c=z.e,x=null,w=-9999999;y.u();){v=y.d
if(!(v instanceof L.aR))continue
z=v.gbI()
u=v.gbz()
t=v.gaI()?1:0
if(2+z+u+t>w){z=v.gbI()
u=v.gbz()
t=v.gaI()?1:0
w=2+z+u+t
x=v}}return x},
kb:function(a){var z=this.fx
if(typeof z!=="number")return z.bS()
return z>=1},
eJ:function(a,b){return this.h9(a,b)>0},
h9:function(a,b){var z,y
if(this.eL(b)){z=a.gb4()
y=this.fy.a
z=z.gi()
z=y==null?z==null:y===z}else z=!1
if(z)return 1000
if(this.iN(a,b,10))return 1
z=a.gb4()
y=this.fy.a
z=z.gi()
return(y==null?z!=null:y!==z)?1:0},
eL:function(a){var z,y
z=a.c4("Confuse",this,!0)
if(z==null)return!1
y=a.kY("Unconfuse",this,!0)
if(y==null)return!0
return y<z},
dc:function(a){var z,y,x,w,v,u,t,s,r,q,p
z=a.Y(this.y)
y=z.gag()
if(typeof y!=="number")return H.x(y)
x=2*y
if(!z.gb0())x-=10
y=z.e
if(!(y instanceof K.cb))x+=4
y=J.b5(y.gac(),2)
if(typeof y!=="number")return H.x(y)
x+=y
for(y=z.cx.a,w=[null],v=new P.ae(y,y.r,null,null,w),v.c=y.e;v.u();){y=J.b5(v.d.gac(),10)
if(typeof y!=="number")return H.x(y)
x+=y}y=a.a
for(v=y.ga_(y),u=new H.bT(v,new R.jz(this),[H.m(y,0)]),t=0;u.u();){s=v.gS()
r=s.gaS()?2:0
q=s.gag()
if(typeof q!=="number")return H.x(q)
p=J.b5(s.e.gac(),2)
if(typeof p!=="number")return H.x(p)
t=t+r+2*q+p
for(r=s.cx.a,q=new P.ae(r,r.r,null,null,w),q.c=r.e;q.u();){r=J.b5(q.d.gac(),10)
if(typeof r!=="number")return H.x(r)
t+=r}}return new A.cE(x,t,y.bv(0,0,new R.jA(this,a)))},
iN:function(a,b,c){var z=b.kZ(a,this,!0)
if(z==null)return!1
return z<=c},
$isaO:1},
mD:{"^":"d+dx;"},
tk:{"^":"a:0;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx",
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
z=new L.aE(null,null,[U.ab])
z.aZ()
z.m(C.d)
a.gD().cy=z
z=this.db
if(z!=null){y=new L.bs(null,null)
y.m(z)
z=y}else{z=$.$get$eA()
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
if(J.e(a.gb4(),z.fy)){y=a.gi()
z=z.y
z=y==null?z!=null:y!==z}else z=!1
return z}},
jA:{"^":"a:28;a,b",
$2:function(a,b){var z,y
z=b.gaS()?1:0
y=b.gag()
if(typeof y!=="number")return H.x(y)
return J.an(a,(z+y)*this.a.h9(b,this.b))}},
dX:{"^":"d;a,b",
k:function(a){return this.b}},
pT:{"^":"I;a,fX:b<,bE:c<,an:d<,T:e<,h2:f<,f3:r<,ag:x<,i:y<,z,ck:Q<,N:ch<,az:cx<,he:cy<,h:db<,aI:dx<,ah:dy<,a8:fr<,bh:fx<,b4:fy<",
a1:function(a){var z=new R.eT(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
A:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof R.I))return!1
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
eT:{"^":"d;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go",
gfX:function(){return this.gD().c},
gbE:function(){return this.gD().d},
sbE:function(a){this.gD().d=a
return a},
gan:function(){return this.gD().e},
san:function(a){this.gD().e=a
return a},
gT:function(){return this.gD().f},
sT:function(a){this.gD().f=a
return a},
gh2:function(){return this.gD().r},
gf3:function(){return this.gD().x},
gag:function(){return this.gD().y},
sag:function(a){this.gD().y=a
return a},
gi:function(){return this.gD().z},
gck:function(){return this.gD().ch},
gN:function(){return this.gD().cx},
gaz:function(){var z,y
z=this.gD()
y=z.cy
if(y==null){y=new L.aE(null,null,[U.ab])
y.aZ()
y.m(C.d)
z.cy=y
z=y}else z=y
return z},
ghe:function(){return this.gD().db},
gh:function(){return this.gD().dx},
sh:function(a){this.gD().dx=a
return a},
gaI:function(){return this.gD().dy},
gah:function(){return this.gD().fr},
sah:function(a){this.gD().fr=a
return a},
ga8:function(){return this.gD().fx},
gbh:function(){return this.gD().fy},
sbh:function(a){this.gD().fy=a
return a},
gb4:function(){var z,y
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
if(!(z==null)){y=new L.aE(null,null,[H.m(z,0)])
y.aZ()
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
if(l==null){l=new L.aE(null,null,[U.ab])
l.aZ()
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
z=new R.pT(y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f.p())
if(y==null)H.i(P.l("categories"))
if(u==null)H.i(P.l("currentWeapon"))
if(s==null)H.i(P.l("gold"))
if(r==null)H.i(P.l("hitpoints"))
if(q==null)H.i(P.l("id"))
if(p==null)H.i(P.l("initiative"))
if(o==null)H.i(P.l("isActive"))
if(n==null)H.i(P.l("isPlayer"))
if(m==null)H.i(P.l("items"))
if(l==null)H.i(P.l("maxHitpoints"))
if(k==null)H.i(P.l("name"))
if(j==null)H.i(P.l("nameIsProperNoun"))
if(i==null)H.i(P.l("pose"))
if(h==null)H.i(P.l("pronoun"))
if(g==null)H.i(P.l("stamina"))}this.m(z)
return z}}}],["","",,A,{"^":"",cE:{"^":"d;c9:a<,d1:b<,bZ:c<",
aq:function(a,b){return new A.ao(this.a-b.gc9(),this.b-b.gd1(),J.bD(this.c,b.gbZ()))},
k:function(a){return"ActorScore<self="+C.j.bg(this.a,2)+",team="+C.j.bg(this.b,2)+",enemy="+J.c3(this.c,2)+">"}},ao:{"^":"d;c9:a<,d1:b<,bZ:c<",
gkr:function(){return this.a===-1/0&&this.b===-1/0&&J.e(this.c,-1/0)},
c8:function(a,b){if(typeof b!=="number")return H.x(b)
return new A.ao(this.a*b,this.b*b,J.c2(this.c,b))},
ai:function(a,b){return new A.ao(this.a+b.gc9(),this.b+b.gd1(),J.an(this.c,b.gbZ()))},
d6:function(a,b){if(typeof b!=="number")return H.x(b)
return new A.ao(this.a/b,this.b/b,J.b5(this.c,b))},
k:function(a){return"ActorScoreChange<self="+C.j.bg(this.a,2)+",team="+C.j.bg(this.b,2)+",enemy="+J.c3(this.c,2)+">"},
v:{
jy:function(a){var z,y,x,w,v,u,t,s,r
for(z=a.length,y=0,x=0,w=0,v=0,u=0;t=a.length,u<t;t===z||(0,H.ar)(a),++u){s=a[u];++y
x+=s.a
w+=s.b
r=s.c
if(typeof r!=="number")return H.x(r)
v+=r}if(y===0)throw H.c(P.F("Cannot average empty iterable"))
return new A.ao(x/y,w/y,v/y)}}}}],["","",,U,{"^":"",
wx:function(a){switch(a){case C.y:return"fist"
case C.z:return"shield"
case C.r:return"spear"
case C.A:return"sword"}throw H.c(P.F(a))},
ab:{"^":"mE;f_:a<",
gaQ:function(){return U.wx(C.a.geH(this.a))},
gi:function(){return H.aD(this)},
gck:function(){return!0},
gb0:function(){return!1},
gN:function(){return!1},
gaI:function(){return!1},
ga8:function(){return C.n},
gb4:function(){return $.$get$aY()},
$isaO:1},
mE:{"^":"d+dx;"},
cT:{"^":"d;a,b",
k:function(a){return this.b}}}],["","",,K,{"^":"",cb:{"^":"aR;h:b<,a"}}],["","",,E,{"^":"",br:{"^":"ab;h:b<,a",
gac:function(){return 1},
$isaO:1}}],["","",,Z,{"^":"",at:{"^":"aR;h:b<,bI:c<,bz:d<,aI:e<,cg:f<,eB:r<,a"}}],["","",,G,{"^":"",b2:{"^":"aR;h:b<,bI:c<,bz:d<,aI:e<,cg:f<,eB:r<,a",v:{
pd:function(a,b,c,d,e,f){return new G.b2(c,e,f,d,!0,!1,P.aC(C.o,null))}}}}],["","",,L,{"^":"",aR:{"^":"ab;",
geB:function(){return!1},
gcg:function(){return!1},
gko:function(){return!1},
gaT:function(){return this.gbI()>0},
geN:function(){return this.gbz()>0},
gl:function(a){return 2},
gbI:function(){return 0},
gbz:function(){return 0},
gac:function(){var z,y,x
z=this.gbI()
y=this.gbz()
x=this.gaI()?1:0
return 2+z+y+x},
$isaO:1}}],["","",,G,{"^":"",mt:{"^":"d;",
fG:function(){var z,y
z=this.f
y=z.C
if(y.length!==0){this.b.$1(y.charCodeAt(0)==0?y:y)
z.C=""}},
lk:[function(a){this.f.C+=a},"$1","gjN",2,0,22],
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
return P.aw(w.d3(),$async$bx)
case 5:z=3
break
case 4:w.fG()
case 1:return P.aG(x,y)}})
return P.aH($async$bx,y)}}}],["","",,B,{"^":"",f3:{"^":"d;da:a<,dA:b<,cX:c<",
k:function(a){return"ConsequenceStats<order="+this.c+", cumProb="+J.c3(this.b,3)+", score="+this.a.k(0)+">"}},bK:{"^":"d;bH:a<,fL:b<,fa:c<,kI:d<,dA:e<,f,r,eM:x<,cX:y<",
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
fE:function(a,b,c,d,e,f,g,h){var z,y
z=b==null
y=z?e:J.c2(e,b.gdA())
z=z?0:b.gcX()+1
d.b=a.r
return new B.bK(a,c,d,e,y,g,f,h,z)}}}}],["","",,G,{"^":"",j4:{"^":"d;a,b,c,d,e,f",
jz:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=this.a
z.ak("...")
z.ak("combining scores")
y=H.p([],[A.ao])
x=new G.jr()
for(w=J.ai(a),v=b.a,u=b.b,t=b.c,s=null;w.u();){r=w.gS()
z.ak(new G.jp(r))
if(J.a9(r.gdA(),0.15))if(s==null){z.ak("    - first _bestCase")
s=r}else if(J.a9(x.$1(r.gda()),x.$1(s.gda()))){z.ak("    - new _bestCase")
s=r}q=r.gda()
p=J.bD(q.c,t)
o=r.b
if(typeof o!=="number")return H.x(o)
n=new A.ao((q.a-v)*o,(q.b-u)*o,J.c2(p,o))
z.ak(new G.jq(n))
y.push(n)}m=A.jy(y)
w=s==null
if(w)l=C.G
else{q=s.gda()
l=new A.ao(q.a-v,q.b-u,J.bD(q.c,t))}w=w?s:s.gcX()
if(w==null)w=1
if(typeof w!=="number")return H.x(w)
v=l.a/w
u=l.b/w
w=J.b5(l.c,w)
t=m.a
q=m.b
p=m.c
z.ak("- uplifts average = "+("ActorScoreChange<self="+C.j.bg(t,2)+",team="+C.j.bg(q,2)+",enemy="+J.c3(p,2)+">"))
z.ak("- best = "+("ActorScoreChange<self="+C.u.bg(v,2)+",team="+C.u.bg(u,2)+",enemy="+J.c3(w,2)+">"))
t=v+t
q=u+q
p=w+p
z.ak("- result = "+("ActorScoreChange<self="+C.u.bg(t,2)+",team="+C.u.bg(q,2)+",enemy="+C.j.bg(p,2)+">"))
return new A.ao(t,q,p)},
f1:function(){var z=this
return P.aU(function(){var y=0,x=1,w,v,u,t,s
return function $async$f1(a,b){if(a===1){w=b
y=x}while(true)switch(y){case 0:v=z.f,u=v.gcm(),u=u.ga_(u),t=1
case 2:if(!u.u()){y=3
break}s=u.gS()
y=4
return""+t+") "+s.gV()+"\t"+H.b(v.j(0,s))
case 4:++t
y=2
break
case 3:return P.aS()
case 1:return P.aT(w)}}})},
dG:function(a,b,c){var z=0,y=P.aA(),x=this,w,v,u,t,s,r,q,p,o,n,m
var $async$dG=P.ax(function(d,e){if(d===1)return P.aF(e,y)
while(true)switch(z){case 0:w=x.f
w.bf(0)
v=x.c
u=v.a
t=u.a.bB(0,new G.js(x))
s=t.dc(u)
r=x.a
r.bO("Planning for "+H.b(t.db)+", initialScore="+s.k(0))
q=new P.bd(x.ec(t,u).a(),null,null,null)
case 2:if(!q.u()){z=3
break}p=q.c
o=p==null?q.b:p.gS()
r.bl(new G.jt(t,o))
if(o.G(t,u)!==!0){r.bl(new G.ju(o))
z=2
break}z=4
return P.aw(x.cD(v,o,b,a,c).cu(0),$async$dG)
case 4:n=e
if(J.eP(n)===!0){r.bl(new G.jv(o))
w.n(0,o,C.H)
z=2
break}r.bl(new G.jw(s,o,n))
m=x.jz(n,s,b)
w.n(0,o,m)
r.bl(new G.jx(o,m))
z=2
break
case 3:x.e=!0
return P.aG(null,y)}})
return P.aH($async$dG,y)},
kH:function(){return this.dG(50,10,null)},
ec:function(a,b){return P.aU(function(){var z=a,y=b
var x=0,w=1,v,u,t,s,r,q,p,o
return function $async$ec(c,d){if(c===1){v=d
x=w}while(true)switch(x){case 0:u=y.f
x=2
return P.bV((u.length!==0?C.a.gw(u):null).gbN())
case 2:u=(u.length!==0?C.a.gw(u):null).gaE()
t=u.length
s={func:1,ret:Q.cc,args:[U.ab]}
r={func:1,ret:Q.c9,args:[Q.v]}
q={func:1,ret:Q.z,args:[R.I]}
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
case 15:case 11:case 7:case 4:u.length===t||(0,H.ar)(u),++p
x=3
break
case 5:return P.aS()
case 1:return P.aT(v)}}})},
cD:function(a5,a6,a7,a8,a9){var $async$cD=P.ax(function(b0,b1){switch(b0){case 2:u=x
z=u.pop()
break
case 1:v=b1
z=w}while(true)switch(z){case 0:s={}
r=a5.a
q=r.a.bB(0,new G.j8(t))
p=t.a
p.bl("=====")
p.bl(new G.j9(a6,q))
p.bl(new G.ja(a6))
if(a6.G(q,r)!==!0){p.bl("- firstAction not applicable")
z=1
break}o=q.dc(r)
p.bl(new G.jg(a5,o))
p.bl(new G.jh(a5))
n=P.bb(null,B.bK)
m=P.a4(null,null,null,A.ad)
l=J.o(r)
k=l.gB(r)
for(j=new P.bd(a6.dv(q,a5,r).a(),null,null,null);j.u();){i=j.c
h=i==null?j.b:i.gS()
if(l.gB(r)!==k)throw H.c(new P.w("Action "+a6.k(0)+" modified world state when producing "+H.b(h)+"."))
n.aC(h)}s.a=0
r=t.b
case 3:if(!!n.gW(n)){z=4
break}++s.a
g=n.dI()
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
q=l.a.aR(0,new G.jm(t),new G.jn())
if(q==null){p.ak("- this actor ("+H.b(r)+") has been removed")
z=3
break}f=new B.f3(q.dc(l),g.e,g.y)
p.ak(new G.jb(f))
z=7
x=[1]
return P.dc(P.hI(f),$async$cD,y)
case 7:z=3
break
case 6:l=g.a
j=l.f
e=(j.length!==0?C.a.gw(j):null).dT(l)
j=l.a
i=new H.L(j,new G.jc(t),[H.m(j,0)])
d=i.gl(i)
if(d>1)throw H.c(new P.w("World has several duplicates of mainActor: "+J.h(l)))
else if(d===0){p.ha("mainActor "+H.b(r)+" dies and is removed in world - will use defaultScoreWhenDead")
q=null}else q=j.bB(0,new G.jd(t))
c=J.e(e,q)
p.ak("- actor: "+H.b(e.gh())+" (isMain=="+c+")")
j=q==null
p.ak("- mainActor: "+H.b(j?q:q.gh()))
b=j?q:q.dc(l)
if(b==null)b=C.I
f=new B.f3(b,g.e,g.y)
p.ak(new G.je(o,f))
p.ak(new G.jf(g))
z=8
x=[1]
return P.dc(P.hI(f),$async$cD,y)
case 8:p.ak("- generating all actions for "+H.b(e.gh()))
j=n.c
i=n.b
a=n.a
for(a0=new P.bd(t.ec(e,l).a(),null,null,null);a0.u();){a1=a0.c
a2=a1==null?a0.b:a1.gS()
if(a2.G(e,l)!==!0)continue
for(a1=new P.bd(a2.dv(e,g,l).a(),null,null,null);a1.u();){a3=a1.c
a4=a3==null?a1.b:a3.gS();++t.d
if(J.c1(a4.gdA(),0.05))continue
if(m.a7(0,a4.gbH()))continue
n.aC(a4)}}p.ak("- added "+(((n.c-n.b&n.a.length-1)>>>0)-((j-i&a.length-1)>>>0))+" new PlanConsequences")
m.q(0,l)
z=3
break
case 4:case 1:return P.dc(null,0,y)
case 2:return P.dc(v,1,y)}})
var z=0,y=P.qk($async$cD),x,w=2,v,u=[],t=this,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4
return P.rG(y)},
i6:function(a,b){var z
if(a==null){z=b.d
throw H.c(P.F("Called ActorPlanner with actor == null. That may mean that a Situation returns getCurrentActor as null. Some action that you added should make sure it removes the Situation (maybe "+H.b(z.gw(z).gaQ())+"?). World: "+J.h(b)+". Situation: "+H.b(b.gjD())+". Action Records: "+z.aH(0,new G.jo()).cl(0,"<-")))}},
v:{
j5:function(a,b){var z,y,x
z=N.bn("ActorPlanner")
y=a==null?a:a.gi()
x=new Y.a1(H.p([],[Y.ah]),0,P.aB())
x.b=b.r
z=new G.j4(z,y,new B.bK(b,null,x,1,1,!0,!1,!1,0),0,!1,new H.R(0,null,null,null,null,null,0,[null,null]))
z.i6(a,b)
return z}}},jo:{"^":"a:0;",
$1:function(a){return a.gaQ()}},jr:{"^":"a:39;",
$1:function(a){var z=a.c
if(typeof z!=="number")return H.x(z)
return a.b-z}},jp:{"^":"a:2;a",
$0:function(){return"  - consequence: "+H.b(this.a)}},jq:{"^":"a:2;a",
$0:function(){return"    - uplift = "+this.a.k(0)}},js:{"^":"a:0;a",
$1:function(a){return J.e(a.gi(),this.a.b)}},jt:{"^":"a:2;a,b",
$0:function(){return"Evaluating action '"+this.b.gV()+"' for "+H.b(this.a.db)}},ju:{"^":"a:2;a",
$0:function(){return"- action '"+this.a.gV()+"' isn't applicable"}},jv:{"^":"a:2;a",
$0:function(){return"- action '"+this.a.gV()+"' is possible but we couldn't get to any outcomes while planning. Scoring with negative infinity."}},jw:{"^":"a:2;a,b,c",
$0:function(){return"- action '"+this.b.gV()+"' leads to "+H.b(J.aM(this.c))+" different ConsequenceStats, initialScore="+this.a.k(0)}},jx:{"^":"a:2;a,b",
$0:function(){return"- action '"+this.a.gV()+"' was scored "+this.b.k(0)}},j8:{"^":"a:0;a",
$1:function(a){return J.e(a.gi(),this.a.b)}},j9:{"^":"a:2;a,b",
$0:function(){return"_getConsequenceStats for firstAction '"+this.a.gV()+"' of "+H.b(this.b.gh())}},ja:{"^":"a:2;a",
$0:function(){return"- firstAction == "+H.b(this.a)}},jg:{"^":"a:2;a,b",
$0:function(){var z=this.a
return"- current: initialScore="+this.b.k(0)+", cumProb="+H.b(z.e)+" (prob="+H.b(z.d)+", ord="+z.y+")"}},jh:{"^":"a:2;a",
$0:function(){var z=this.a
return"- initial action: "+C.b.c8(" ",z.y)+"- "+J.h(z.b)}},ji:{"^":"a:2;a",
$0:function(){return"evaluating a PlanConsequence of '"+this.a.gfL().gV()+"'"}},jj:{"^":"a:2;a",
$0:function(){var z=this.a.gbH().f
return"- situation: "+H.b(J.iW(z.length!==0?C.a.gw(z):null))}},jk:{"^":"a:2;a,b,c",
$0:function(){return"- order ("+this.c.gcX()+") higher than maximum ("+this.b+"), or consequences ("+this.a.a+") higher than maximum"}},jl:{"^":"a:2;a",
$0:function(){var z=this.a.gbH().d
return"- how we got here: "+new H.ap(z,new G.j7(),[H.m(z,0),null]).cl(0," <- ")}},j7:{"^":"a:0;",
$1:function(a){return a.gaQ()}},jm:{"^":"a:0;a",
$1:function(a){return J.e(a.gi(),this.a.b)}},jn:{"^":"a:2;",
$0:function(){return}},jb:{"^":"a:2;a",
$0:function(){return"- "+this.a.k(0)}},jc:{"^":"a:0;a",
$1:function(a){return J.e(a.gi(),this.a.b)}},jd:{"^":"a:0;a",
$1:function(a){return J.e(a.gi(),this.a.b)}},je:{"^":"a:2;a,b",
$0:function(){return"- mainActor's score == "+this.b.k(0)+" (initial="+this.a.k(0)+")"}},jf:{"^":"a:2;a",
$0:function(){var z=this.a.gbH().d
return"- how we got here: "+new H.ap(z,new G.j6(),[H.m(z,0),null]).cl(0," <- ")}},j6:{"^":"a:0;",
$1:function(a){return a.gaQ()}}}],["","",,Z,{"^":"",n0:{"^":"d;a,b",
gbN:function(){return this.b},
gW:function(a){return this.b.length===0},
hl:function(a,b){var z=this
return P.aU(function(){var y=a,x=b
var w=0,v=2,u,t,s,r,q,p,o,n,m,l
return function $async$hl(c,d){if(c===1){u=d
w=v}while(true)switch(w){case 0:t=z.b
w=t.length<=y?3:4
break
case 3:w=5
return P.bV(t)
case 5:w=1
break
case 4:s=z.iH(new Z.n3())
r=z.eb(new Z.n4(),[s])
q=z.eb(new Z.n5(),[s,r])
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
break}C.a.cb(t,new Z.n6(z,x))
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
break}case 17:t.length===o||(0,H.ar)(t),++n
w=16
break
case 18:case 1:return P.aS()
case 2:return P.aT(u)}}})},
kG:function(a){var z,y,x,w,v,u,t,s,r,q,p
z={}
y=this.b
if(y.length===1)return C.a.gca(y)
C.a.cb(y,new Z.n7(this,a))
x=this.a.a
w=x.gcv().bv(0,1/0,new Z.n8(a))
v=x.gcv().bv(0,-1/0,new Z.n9(a))
x=J.al(v)
u=J.al(w)
t=u.aq(w,J.c2(x.aq(v,w),0.1))
z.a=t
if(u.A(w,v)){t=J.bD(t,1)
z.a=t
u=t}else u=t
s=x.aq(v,u)
r=P.mr(y.length,new Z.na(z,this,a,s),!1,P.M)
q=new H.ap(r,new Z.nb(C.a.bv(r,0,Z.uO())),[H.m(r,0),null]).bF(0,!1)
z=C.a.bv(q,0,Z.uP())
if(typeof z!=="number")return H.x(z)
u=q.length
x=u-1
if(x<0)return H.f(q,x)
z=J.an(q[x],1000-z)
if(x>=q.length)return H.f(q,x)
q[x]=z
p=S.nu(q,1000)
if(p>=y.length)return H.f(y,p)
return y[p]},
eb:function(a,b){var z,y,x,w,v,u,t
for(z=this.b,y=z.length,x=this.a.a,w=null,v=null,u=0;u<z.length;z.length===y||(0,H.ar)(z),++u){t=z[u]
if(C.a.a7(b,t))continue
if(w==null||J.a9(a.$1(x.j(0,t)),v)){v=a.$1(x.j(0,t))
w=t
continue}}return w},
iH:function(a){return this.eb(a,C.d)},
v:{
n1:function(a){var z,y,x
z=a.gcm()
y=H.y(z,"A",0)
x=P.P(new H.L(z,new Z.n2(a),[y]),!1,y)
if(x.length===0)$.$get$bL().f0("After removing actions scored by undefined, there are no recommendations.")
return x},
x3:[function(a,b){return J.an(a,b)},"$2","uO",4,0,42],
x4:[function(a,b){return J.an(a,b)},"$2","uP",4,0,43]}},n3:{"^":"a:0;",
$1:function(a){return a.gc9()}},n4:{"^":"a:0;",
$1:function(a){return J.iS(a.gbZ())}},n5:{"^":"a:0;",
$1:function(a){return a.gd1()}},n6:{"^":"a:6;a,b",
$2:function(a,b){var z,y
z=this.b
y=this.a.a.a
return-J.bE(z.$1(y.j(0,a)),z.$1(y.j(0,b)))}},n7:{"^":"a:6;a,b",
$2:function(a,b){var z,y
z=this.b
y=this.a.a.a
return-J.bE(z.$1(y.j(0,a)),z.$1(y.j(0,b)))}},n8:{"^":"a:6;a",
$2:function(a,b){var z=this.a.$1(b)
return Math.min(H.df(a),H.df(z))}},n9:{"^":"a:6;a",
$2:function(a,b){var z=this.a.$1(b)
return Math.max(H.df(a),H.df(z))}},na:{"^":"a:9;a,b,c,d",
$1:function(a){var z,y
z=this.b
y=z.b
if(a>=y.length)return H.f(y,a)
return J.b5(J.bD(this.c.$1(z.a.a.j(0,y[a])),this.a.a),this.d)}},nb:{"^":"a:0;a",
$1:function(a){return J.iZ(J.c2(J.b5(a,this.a),1000))}},n2:{"^":"a:0;a",
$1:function(a){return!this.a.j(0,a).gkr()}}}],["","",,K,{"^":"",rQ:{"^":"a:3;",
$3:function(a,b,c){}},cn:{"^":"d;a,h:b<,c,d,jT:e<,f,c7:r<",
gjR:function(){return this.a},
gB:function(a){return C.b.gB(this.b)},
A:function(a,b){if(b==null)return!1
return b instanceof K.cn&&b.b===this.b},
k:function(a){return"Room<"+this.b+">"},
jI:function(a,b,c){return this.c.$3(a,b,c)},
hZ:function(a,b,c){return this.d.$3(a,b,c)},
jU:function(a,b,c){return this.e.$3(a,b,c)},
v:{
a_:function(a,b,c,d,e,f,g){var z=new S.O(null,null,[Q.v])
z.aj()
z.m(f)
return new K.cn(z.p(),a,b,c,d,e,g)}}}}],["","",,Q,{"^":"",v:{"^":"d;fY:a<,V:b<,aQ:c<,kl:d<"}}],["","",,S,{"^":"",ac:{"^":"d;",
gaE:function(){return C.d},
gbN:function(){return C.d},
gdD:function(){return 3},
dT:function(a){return this.aW(this.gU(),a)},
hh:function(a,b){},
hi:function(a,b){},
kD:function(a,b){},
dF:function(a){},
dd:function(a){return!0}}}],["","",,S,{"^":"",
fN:function(a){var z=$.$get$bN().ap(3)
if(z<0||z>=3)return H.f(a,z)
return a[z]},
nt:function(a,b){var z,y,x,w,v
z=$.$get$bN().kC()*b
for(y=new H.dL(a,a.gl(a),0,null,[H.y(a,"b0",0)]),x=0,w=0;y.u();){v=y.d
if(typeof v!=="number")return H.x(v)
x+=v
if(x>=z)return w;++w}throw H.c(P.F("The weights do not add up to total="+b))},
nu:function(a,b){var z,y,x,w,v,u,t
z=$.$get$bN().ap(b)
for(y=a.length,x=0,w=0,v=0;u=a.length,v<u;u===y||(0,H.ar)(a),++v){t=a[v]
if(typeof t!=="number")return H.x(t)
x+=t
if(x>=z)return w;++w}throw H.c(P.F("The weights do not add up to total="+b))},
bO:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=J.K(a)
y=z.b_(a,"{")
if(y!==-1){x=z.gl(a)
if(typeof x!=="number")return x.aq()
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
if(p>1){o=$.$get$bN().ap(p)
z=z.aJ(a,0,y)
x=w.length
if(o<0||o>=x)return H.f(w,o)
n=w[o]
m=o+1
if(m>=x)return H.f(w,m)
m=z+H.b(S.bO(C.b.aJ(a,n+1,w[m])))
if(typeof v!=="number")return v.ai()
n=a.length
m+=C.b.aJ(a,v+1,n)
z=m.charCodeAt(0)==0?m:m
if(t===n-1)return z
else return S.bO(z)}else{x=z.gl(a)
if(typeof x!=="number")return x.aq()
if(t===x-1)return a
else{if(typeof t!=="number")return t.ai()
x=t+1
return z.aJ(a,0,x)+H.b(S.bO(C.b.bJ(a,x)))}}}else return a},
a5:function(a,b,c,d){var z=c!=null?3:2
switch($.$get$bN().ap(z)){case 0:a.$0()
break
case 1:b.$0()
break
case 2:c.$0()
break
case 4:d.$0()
break}}}],["","",,Y,{"^":"",ah:{"^":"d;b7:a<,aY:b<,aU:c<,hk:d<,e,dw:f@,hn:r<,hf:x<,fb:y<,jQ:z<,i1:Q<,d5:ch<,jg:cx<,kq:cy<,U:db<",
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
default:throw H.c(P.F("Invalid key "+H.b(b)+"."))}},
k:function(a){var z=this.a
z="Report<"+C.b.aJ(z,0,Math.min(z.length,20))+"...,thread="+H.b(this.cx)
return z+(this.cy?"(sup)":"")+">"}},a1:{"^":"d;a,U:b<,c",
geI:function(){return C.a.bs(this.a,new Y.oM())},
aP:function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){var z,y
if(b==null||J.e(b,""))return
z=(J.bh(b).eF(b,".")||C.b.eF(b,"!")||C.b.eF(b,"?"))&&C.b.df(b,P.bq("[A-Z]",!0,!1))?!0:p
y=this.b
this.a.push(new Y.ah(b,m,h,j,i,d,k,g,!1,e,l,z,c,f,y))},
q:function(a,b){return this.aP(a,b,null,!1,!1,!1,!1,null,null,null,!1,!1,null,!1,null,!1)},
t:function(a,b,c){return this.aP(a,b,null,!1,!1,!1,!1,null,null,null,!1,!1,null,!1,null,c)},
ji:function(a,b,c,d,e,f,g,h,i,j,k,l,m,n){return this.aP(a,b,c,d,e,f,g,h,i,j,k,!1,l,m,null,n)},
fM:function(a,b,c){return this.aP(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,null,!1,null,!1)},
jo:function(a,b,c,d,e,f){return this.aP(a,b,null,!1,!1,!1,!1,c,null,d,!1,!1,e,!1,null,f)},
ex:function(a,b,c,d,e){return this.aP(a,b,null,!1,!1,!1,c,null,null,null,!1,d,e,!1,null,!1)},
cf:function(a,b,c,d){return this.aP(a,b,null,!1,!1,!1,!1,null,null,c,!1,!1,d,!1,null,!1)},
ew:function(a,b,c,d){return this.aP(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,d,!1,null,!1)},
cf:function(a,b,c,d){return this.aP(a,b,null,!1,!1,!1,!1,null,null,c,!1,!1,d,!1,null,!1)},
fN:function(a,b,c,d,e,f){return this.aP(a,b,c,!1,!1,!1,!1,d,null,null,e,!1,f,!1,null,!1)},
jn:function(a,b,c,d,e,f){return this.aP(a,b,c,!1,!1,d,!1,e,null,null,!1,!1,f,!1,null,!1)},
jk:function(a,b,c){return this.aP(a,b,c,!1,!1,!1,!1,null,null,null,!1,!1,null,!1,null,!1)},
jl:function(a,b,c,d){return this.aP(a,b,c,!1,!1,!1,!1,d,null,null,!1,!1,null,!1,null,!1)},
jm:function(a,b,c,d,e){return this.aP(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,d,!1,null,e)},
js:function(a,b,c,d,e,f,g,h){var z,y,x,w,v,u,t
if(b.length===0)return
z=H.b(new Y.oK().$1(a))+" "
for(y=b.length,x=e-1,w=0,v=0,u=0;u<b.length;b.length===y||(0,H.ar)(b),++u){t=b[u]
if(w>0){if(w===1&&J.e(t,C.a.gw(b)))z=z+" "+d
else z=w===x?z+(", "+d):z+","
z+=" "}z+=H.b(this.bW(t.gh(),t.gh(),t,null,this.b));++w
if(w>x||J.e(t,C.a.gw(b))){z+="."
this.jo(0,z.charCodeAt(0)==0?z:z,f,g,h,!0);++v
z=H.n(a,"<also>","also")+" "
w=0}}},
jr:function(a,b,c,d){return this.js(a,b,c,"and",3,null,null,d)},
fP:function(){return this.t(0,"\n\n",!0)},
bW:function(a,b,c,d,e){var z,y,x,w
if(d!=null){z=J.K(a)
z=z.b_(a,"<owner's> "+H.b(b))!==-1||z.b_(a,"<ownerPronoun's> "+H.b(b))!==-1||z.b_(a,"<object-owner's> "+H.b(b))!==-1||z.b_(a,"<object-ownerPronoun's> "+H.b(b))!==-1}else z=!1
if(z)return a
z=J.K(a)
if(z.b_(a,"<subject's> "+H.b(b))!==-1||z.b_(a,"<subjectPronoun's> "+H.b(b))!==-1)return a
if(c.gaI()!==!0){y=this.c
x=y.j(0,c.gi())
if((x==null?-1:x)<e)w=z.d_(a,b,"the "+H.b(b))
else{w=J.eR(c.gh(),P.bq("[aeiouy]",!1,!1))?z.d_(a,b,"an "+H.b(b)):z.d_(a,b,"a "+H.b(b))
y.n(0,c.gi(),e)}}else w=null
return w==null?a:w},
eG:function(a,b){var z,y
if(!this.aV(a)||!this.aV(b))return!1
z=this.a
if(a<0||a>=z.length)return H.f(z,a)
if(z[a].gaY()!=null){if(b<0||b>=z.length)return H.f(z,b)
y=z[b].gaY()==null}else y=!0
if(y)return!1
if(a>=z.length)return H.f(z,a)
if(z[a].gaU()!=null){if(b<0||b>=z.length)return H.f(z,b)
y=z[b].gaU()==null}else y=!0
if(y)return!1
if(a>=z.length)return H.f(z,a)
y=z[a].gaY().gi()
if(b<0||b>=z.length)return H.f(z,b)
if(J.e(y,z[b].gaU().gi())){if(a>=z.length)return H.f(z,a)
y=z[a].gaU().gi()
if(b>=z.length)return H.f(z,b)
z=J.e(y,z[b].gaY().gi())}else z=!1
return z},
dS:function(a){var z=this
return P.aU(function(){var y=a
var x=0,w=2,v,u,t
return function $async$dS(b,c){if(b===1){v=c
x=w}while(true)switch(x){case 0:if(!z.aV(y)){x=1
break}u=z.a
if(y<0||y>=u.length)H.f(u,y)
t=u[y]
x=t.gaY()!=null?3:4
break
case 3:x=5
return t.gaY()
case 5:case 4:x=t.gaU()!=null?6:7
break
case 6:x=8
return t.gaU()
case 8:case 7:x=t.ghk()!=null?9:10
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
cW:[function(a){var z=J.al(a)
if(z.aX(a,0)||z.bS(a,this.a.length))return
else{z=this.a
if(a>>>0!==a||a>=z.length)return H.f(z,a)
return z[a].gaU()}},"$1","gaU",2,0,23],
kE:function(a,b){var z
if(!this.aV(a)||!this.aV(b))return!1
if(this.eG(a,b)){z=this.a
if(a>=z.length)return H.f(z,a)
z[a].gfb()}return!1},
hj:function(a){var z
for(z=!1;this.geI();z=!0){a.$1(this.ho(!0))
this.kM()}return z},
ho:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c
z=this.a
y=C.a.bv(z,[],new Y.oN())
C.a.j1(z,new Y.oO(y),!1)
x=a&&this.geI()?C.a.b_(z,C.a.cj(z,new Y.oP()))+1:z.length
if(x<1)return""
for(w=-1,v=!0,u=!1,t=!1,s=0,r="";s<x;++s){q=s===0
if(!q){p=s-1
o=this.eG(p,s)
if(s>=z.length)return H.f(z,s)
if(!z[s].gdw())n=this.kE(s,p)&&this.i0(s,p)
else n=!0
if(n){if(p<0||p>=z.length)return H.f(z,p)
t=!z[p].gdw()}else t=!1
if(s>=z.length)return H.f(z,s)
z[s].sdw(t)
n=s-w
if(n<3)if(!u){if(s>=z.length)return H.f(z,s)
if(!z[s].gi1()){if(p<0||p>=z.length)return H.f(z,p)
if(!z[p].gjQ()){if(s>=z.length)return H.f(z,s)
if(!z[s].gd5())if(this.dr(s,p)||o)if(!(t&&n>1)){if(t){if(p>=z.length)return H.f(z,p)
n=z[p].gdw()}else n=!1
n=n||this.l_(s)>4}else n=!0
else n=!0
else n=!0}else n=!0}else n=!0
v=n}else v=!0
else v=!0
if(v){if(p<0||p>=z.length)return H.f(z,p)
if(z[p].gd5()){r+=" "
p=r}else{r+=". "
p=r}if(t){if(s>=z.length)return H.f(z,s)
n=!z[s].gd5()}else n=!1
r=n?r+"But ":p
u=!1}else if(t){r+=S.fN([" but "," but ",", but "])
u=!this.hN(s,s+1)&&!0}else{r+=S.fN([" and "," and ",", and "])
u=!0}}m=this.e0(s)
l=S.bO(m)
p=J.K(l)
if(p.a7(l,"{")===!0||p.a7(l,"}")===!0)$.$get$iu().dX('Storyline result includes { and/or } even after being parsed by Randomly. Is there a dangling bracket here? Input = """'+H.b(m)+'""" Output = """'+H.b(l)+'"""')
n=!v
if(n){k=s-1
k=this.dr(s,k)&&J.eR(this.e0(k),"<subject> ")&&p.df(l,"<subject> ")}else k=!1
if(k)l=p.d_(l,"<subject> ","")
j=J.dq(l,"<action>",this.e0(s))
p=s-1
k=this.j4(s,p)
if(k)k=!(this.cW(s).ga8()===C.n&&this.br(s).ga8()===C.n)
else k=!1
if(k){j=H.n(j,"<object-owner's> <object>","<objectPronounAccusative>")
j=H.n(j,"<object-ownerPronoun's> <object>","<objectPronounAccusative>")
j=H.n(j,"<object>","<objectPronounAccusative>")
j=H.n(j,"<object's>","<objectPronoun's>")}k=this.dr(s,p)
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
h=p.gaY()
g=p.gaU()
f=p.ghk()
e=p.e
k=h!=null
if(k){if(h.gN()===!0){d=H.n(j,"<subject>","<subjectPronoun>")
d=H.n(d,"<subject's>","<subjectPronoun's>")}else d=j
if(h.ga8()===C.E||h.ga8()===C.a5){d=H.n(d,"<s>","")
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
d=J.cC(this.bW(d,"<subjectNoun>",h,f,i),"<subjectNoun>",h.gh())
c=h.ga8().a
d=H.n(d,"<subjectPronoun>",c)
if(C.b.a7(j,P.bq("<subject>.+<subject's>",!0,!1))){c=h.ga8().c
d=H.n(d,"<subject's>",c)}d=J.cC(this.bW(d,"<subject's>",h,f,i),"<subject's>",H.b(h.gh())+"'s")
i=h.ga8().c
d=H.n(d,"<subject's>",i)
i=h.ga8().b
d=H.n(d,"<subjectPronounAccusative>",i)
i=h.ga8().d
d=H.n(d,"<subjectPronounSelf>",i)}else d=j
if(g!=null){if(g.gaI()===!0){d=H.n(d,"<subject's> <object>","<object>")
d=H.n(d,"<subjectPronoun's> <object>","<object>")}if(g.gN()===!0){d=H.n(d,"<object>","<objectPronoun>")
d=H.n(d,"<object's>","<objectPronoun's>")}else d=J.dq(this.bW(d,"<object>",g,e,p.db),"<object>",g.gh())
i=g.ga8().b
d=H.n(d,"<objectPronoun>",i)
if(C.b.a7(j,P.bq("<object>.+<object's>",!0,!1))){i=g.ga8().c
d=H.n(d,"<object's>",i)}d=J.cC(this.bW(d,"<object's>",g,e,p.db),"<object's>",H.b(g.gh())+"'s")
i=g.ga8().c
d=H.n(d,"<object's>",i)
i=g.ga8().c
d=H.n(d,"<objectPronoun's>",i)
i=g.ga8().b
d=H.n(d,"<objectPronounAccusative>",i)
i=g.ga8().a
d=H.n(d,"<objectPronounNominative>",i)}if(k){k=h.ga8().c
d=H.n(d,"<subjectPronoun's>",k)}p=p.db
j=this.fH(e,this.fH(f,d,j,"<owner>","<owner's>","<ownerPronoun>","<ownerPronoun's>",p),j,"<object-owner>","<object-owner's>","<object-ownerPronoun>","<object-ownerPronoun's>",p)
r+=(!n||q)&&!t?Y.oL(j):j
if(v)w=s
if(s>=z.length)return H.f(z,s)
if(z[s].gd5())u=!0}q=x-1
if(q>=z.length)return H.f(z,q)
z=!z[q].gd5()?r+".":r
return H.wo(z.charCodeAt(0)==0?z:z,$.$get$h8(),new Y.oQ(),null)},
cs:function(){return this.ho(!1)},
kM:function(){var z,y
if(!this.geI()){C.a.sl(this.a,0)
return}z=this.a
y=C.a.b_(z,C.a.cj(z,new Y.oR()))+1
P.cl(0,y,z.length,null,null,null)
z.splice(0,y-0)},
hN:function(a,b){var z,y
if(!this.aV(a)||!this.aV(b))return!1
if(this.eG(a,b)){z=this.a
if(a>=z.length)return H.f(z,a)
z[a].gfb()}if(!this.dr(a,b))return!1
z=this.a
if(a>=z.length)return H.f(z,a)
if(z[a].ghn()){if(b>=z.length)return H.f(z,b)
y=z[b].ghn()}else y=!1
if(y)return!0
if(a>=z.length)return H.f(z,a)
if(z[a].ghf()){if(b>=z.length)return H.f(z,b)
z=z[b].ghf()}else z=!1
if(z)return!0
else return!1},
i0:function(a,b){var z,y,x,w,v
if(!this.aV(a)||!this.aV(b))return!1
for(z=new P.bd(this.dS(a).a(),null,null,null);z.u();){y=z.c
x=y==null?z.b:y.gS()
for(y=new P.bd(this.dS(b).a(),null,null,null);y.u();){w=y.c
v=w==null?y.b:w.gS()
if(J.e(x.gi(),v.gi()))return!0}}return!1},
e0:[function(a){var z=J.al(a)
if(z.aX(a,0)||z.bS(a,this.a.length))return
else{z=this.a
if(a>>>0!==a||a>=z.length)return H.f(z,a)
return z[a].gb7()}},"$1","gb7",2,0,12],
br:[function(a){var z=J.al(a)
if(z.aX(a,0)||z.bS(a,this.a.length))return
else{z=this.a
if(a>>>0!==a||a>=z.length)return H.f(z,a)
return z[a].gaY()}},"$1","gaY",2,0,23],
l_:function(a){var z,y,x
z=this.a
if(a>=z.length)return H.f(z,a)
if(z[a].gU()!=null){y=a-1
if(this.aV(y)){if(y<0||y>=z.length)return H.f(z,y)
y=z[y].gU()==null}else y=!0}else y=!0
if(y)return 1000
else{if(a>=z.length)return H.f(z,a)
y=z[a].gU()
x=a-1
if(x<0||x>=z.length)return H.f(z,x)
x=z[x].gU()
if(typeof y!=="number")return y.aq()
if(typeof x!=="number")return H.x(x)
return y-x}},
k:function(a){return this.cs()},
aV:function(a){if(a>=this.a.length||a<0)return!1
else return!0},
fH:function(a,b,c,d,e,f,g,h){var z
if(a!=null){z=a.gN()===!0?H.n(H.n(b,d,"you"),e,"your"):J.dq(this.bW(b,d,a,null,h),d,a.gh())
z=H.n(z,f,a.ga8().a)
z=H.n(H.n(J.cC(this.bW(C.b.a7(c,P.bq(d+".+"+e,!0,!1))?H.n(z,e,a.ga8().c):z,e,a,null,h),e,H.b(a.gh())+"'s"),e,a.ga8().c),g,a.ga8().c)}else z=H.n(H.n(H.n(H.n(b,d,""),e,""),f,""),g,"")
return z},
j4:function(a,b){var z,y
if(!this.aV(a)||!this.aV(b))return!1
z=this.a
if(a>=z.length)return H.f(z,a)
if(z[a].gaU()!=null){if(b<0||b>=z.length)return H.f(z,b)
y=z[b].gaU()==null}else y=!0
if(y)return!1
if(a>=z.length)return H.f(z,a)
y=z[a].gaU().gi()
if(b<0||b>=z.length)return H.f(z,b)
return J.e(y,z[b].gaU().gi())},
dr:function(a,b){var z,y
if(!this.aV(a)||!this.aV(b))return!1
z=this.a
if(a>=z.length)return H.f(z,a)
if(z[a].gaY()!=null){if(b<0||b>=z.length)return H.f(z,b)
y=z[b].gaY()==null}else y=!0
if(y)return!1
if(a>=z.length)return H.f(z,a)
y=z[a].gaY().gi()
if(b<0||b>=z.length)return H.f(z,b)
return J.e(y,z[b].gaY().gi())},
v:{
oL:function(a){var z,y,x
z=!C.b.a7(a,"\n\n")?C.b.l4(a):a
y=z.length
if(y===0)return z
if(0>=y)return H.f(z,0)
x=z[0].toUpperCase()
if(y===1)return x
else return x+C.b.bJ(z,1)}}},oM:{"^":"a:0;",
$1:function(a){return J.e(a.gb7(),"\n\n")}},oK:{"^":"a:24;",
$1:function(a){return C.b.eZ(H.n(H.n(a,"<also> ",""),"  "," "))}},oN:{"^":"a:38;",
$2:function(a,b){var z,y,x
z=J.K(a)
y=z.gat(a)?z.gw(a):null
if(y!=null&&y.gkq()&&J.e(b.gjg(),y.cx)){x=z.gl(a)
if(typeof x!=="number")return x.aq()
z.n(a,x-1,b)}else z.q(a,b)
return a}},oO:{"^":"a:31;a",
$1:function(a){return J.eN(this.a,a)}},oP:{"^":"a:0;",
$1:function(a){return J.e(a.gb7(),"\n\n")}},oQ:{"^":"a:30;",
$1:function(a){return H.b(a.j(0,1))+H.b(a.j(0,2))+H.b(a.j(0,3))}},oR:{"^":"a:0;",
$1:function(a){return J.e(a.gb7(),"\n\n")}},aO:{"^":"mF;aI:a<,h:b<,c,b4:d<,N:e<,a8:f<",
gi:function(){return H.aD(this)},
gck:function(){return!0},
gb0:function(){return!0},
v:{
c8:function(a,b,c,d,e){var z=H.p([],[P.r])
return new Y.aO(c,b,z,e==null?$.$get$aY():e,!1,d)}}},mF:{"^":"d+dx;"},dx:{"^":"d;",
gaS:function(){return this.gb0()&&this.gck()===!0},
aa:function(a,b,c,d,e,f,g,h,i,j,k,l,m){J.iT(a,b,c,d,e,f,g,h,i,j,k,H.E(this,"$isaO"),!1,m)},
ad:function(a,b){return this.aa(a,b,null,!1,!1,!1,!1,null,null,null,!1,!1,!1)},
al:function(a,b,c){return this.aa(a,b,null,c,!1,!1,!1,null,null,null,!1,!1,!1)},
dJ:function(a,b,c){return this.aa(a,b,null,!1,!1,!1,!1,null,null,null,!1,!1,c)},
ae:function(a,b,c){return this.aa(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,!1)},
hu:function(a,b,c,d){return this.aa(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,d)},
dL:function(a,b,c,d,e,f){return this.aa(a,b,null,!1,!1,!1,!1,c,d,e,f,!1,!1)},
dL:function(a,b,c,d,e,f){return this.aa(a,b,null,!1,!1,!1,!1,c,d,e,f,!1,!1)},
aB:function(a,b,c){return this.aa(a,b,null,!1,!1,!1,c,null,null,null,!1,!1,!1)},
c1:function(a,b,c,d){return this.aa(a,b,null,!1,c,!1,d,null,null,null,!1,!1,!1)},
kS:function(a,b,c,d,e){return this.aa(a,b,null,c,!1,!1,!1,d,null,null,e,!1,!1)},
eU:function(a,b,c,d){return this.aa(a,b,null,c,!1,!1,!1,null,null,null,d,!1,!1)},
eU:function(a,b,c,d){return this.aa(a,b,null,c,!1,!1,!1,null,null,null,d,!1,!1)},
bm:function(a,b,c){return this.aa(a,b,null,!1,!1,!1,!1,null,null,null,c,!1,!1)},
bQ:function(a,b,c,d){return this.aa(a,b,null,c,!1,!1,!1,d,null,null,!1,!1,!1)},
bR:function(a,b,c,d,e){return this.aa(a,b,c,!1,!1,!1,!1,d,null,null,e,!1,!1)},
eT:function(a,b,c,d){return this.aa(a,b,null,c,!1,!1,d,null,null,null,!1,!1,!1)},
bn:function(a,b,c,d){return this.aa(a,b,null,!1,!1,!1,!1,c,null,null,d,!1,!1)},
c1:function(a,b,c,d){return this.aa(a,b,null,!1,c,!1,d,null,null,null,!1,!1,!1)},
dK:function(a,b,c,d,e){return this.aa(a,b,c,!1,!1,d,!1,e,null,null,!1,!1,!1)},
hs:function(a,b,c,d){return this.aa(a,b,null,!1,!1,!1,c,d,null,null,!1,!1,!1)},
hr:function(a,b,c,d){return this.aa(a,b,c,!1,!1,d,!1,null,null,null,!1,!1,!1)},
kU:function(a,b,c,d,e,f){return this.aa(a,b,c,d,!1,e,!1,f,null,null,!1,!1,!1)},
c2:function(a,b,c,d,e){return this.aa(a,b,c,d,!1,e,!1,null,null,null,!1,!1,!1)},
hq:function(a,b,c){return this.aa(a,b,c,!1,!1,!1,!1,null,null,null,!1,!1,!1)},
kQ:function(a,b,c,d){return this.aa(a,b,c,!1,!1,!1,!1,d,null,null,!1,!1,!1)},
ht:function(a,b,c,d){return this.aa(a,b,null,!1,!1,!1,!1,c,d,null,!1,!1,!1)},
kT:function(a,b,c,d,e){return this.aa(a,b,null,!1,c,!1,!1,d,null,null,e,!1,!1)},
kV:function(a,b,c,d,e,f){return this.aa(a,b,null,!1,c,!1,!1,d,e,null,f,!1,!1)},
eT:function(a,b,c,d){return this.aa(a,b,null,c,!1,!1,d,null,null,null,!1,!1,!1)},
kR:function(a,b,c,d){return this.aa(a,b,null,!1,c,!1,!1,null,null,null,d,!1,!1)}},cj:{"^":"d;a,b,c,d",
k:function(a){return this.a}}}],["","",,L,{"^":"",tm:{"^":"a:0;",
$1:function(a){a.gcL().b=2
return 2}},ts:{"^":"a:0;",
$1:function(a){a.gcL().b=0
return 0}},tl:{"^":"a:0;",
$1:function(a){a.gcL().b=1
return 1}},hi:{"^":"d;",
hb:function(a){var z,y
z=this.a
y=a.gi()
return z==null?y==null:z===y}},qa:{"^":"hi;i:a<",
a1:function(a){var z=new L.bs(null,null)
z.m(this)
a.$1(z)
return z.p()},
A:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof L.hi))return!1
z=this.a
y=b.a
return z==null?y==null:z===y},
gB:function(a){return Y.U(Y.k(0,J.j(this.a)))},
k:function(a){return"Team {id="+J.h(this.a)+",\n}"},
v:{
ec:function(a){var z=new L.bs(null,null)
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
z=new L.qa(y)
if(y==null)H.i(P.l("id"))}this.m(z)
return z}}}],["","",,O,{"^":"",pD:{"^":"d;a"}}],["","",,X,{"^":"",
i2:function(a,b){return P.aU(function(){var z=a,y=b
var x=0,w=1,v,u,t,s,r,q
return function $async$i2(c,d){if(c===1){v=d
x=w}while(true)switch(x){case 0:u=z.a
t=new J.bk(u,u.length,0,null,[H.m(u,0)])
u=y.a
s=new J.bk(u,u.length,0,null,[H.m(u,0)])
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
case 1:return P.aT(v)}}})}}],["","",,A,{"^":"",ad:{"^":"d;ev:a<,az:b<,c,d,e,f,U:r<,x",
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
return!!z.$isad&&this.gB(this)===z.gB(b)},
jf:function(a){var z,y
z=this.hL(a,!0)
y=z.ga_(z)
if(y.u()){y.gS()
return!0}return!1},
ar:function(a){var z,y
z=this.hK(a)
y=z.ga_(z)
if(y.u()){y.gS()
return!0}return!1},
fZ:function(a){var z,y,x
z=this.dl(a)
if(z==null)throw H.c(new P.w("Tried to elapseSituationTime of situation id="+H.b(a)+" that doesn't exist in situations ("+H.b(this.f)+")."))
y=this.f
if(z!==(z|0)||z>=y.length)return H.f(y,z)
x=y[z].ax()
if(z!==(z|0)||z>=y.length)return H.f(y,z)
y[z]=x},
ax:function(){++this.r},
d7:function(a,b,c,d,e){var z=this.d
if(a!=null)z=z.dg(0,new A.pI(a))
if(b!=null)z=z.c6(0,new A.pJ(b))
if(c!=null)z=z.c6(0,new A.pK(c))
if(e!=null)z=z.c6(0,new A.pL(e))
return d!=null?z.c6(0,new A.pM(d)):z},
hK:function(a){return this.d7(a,null,null,null,null)},
hL:function(a,b){return this.d7(a,null,null,null,b)},
hM:function(a,b,c){return this.d7(a,b,null,null,c)},
Y:function(a){return this.a.bB(0,new A.pN(a))},
dV:function(a){return this.e.bB(0,new A.pO(a))},
f2:function(a){var z,y
z=this.dl(a)
if(z==null)return
y=this.f
if(z!==(z|0)||z>=y.length)return H.f(y,z)
return y[z]},
au:function(a){var z,y
for(z=this.f,y=z.length-1;y>=0;--y){if(y>=z.length)return H.f(z,y)
if(J.e(z[y].gh(),a)){if(y>=z.length)return H.f(z,y)
return z[y]}}throw H.c(P.F("No situation with name="+a+" found."))},
k9:function(a){var z=this.a.aR(0,new A.pP(a),new A.pQ())
if(z==null)return!1
return z.gb0()},
aA:function(){var z,y
z=this.f
y=C.a.gw(z)
y.dF(this)
C.a.a3(z,y)},
b2:function(a){var z,y
z=this.f
while(!0){if(!(z.length!==0&&!J.e(C.a.gw(z).gh(),a)))break
y=C.a.gw(z)
y.dF(this)
C.a.a3(z,y)}if(z.length===0)throw H.c(P.F("Tried to pop situations until "+a+" but none was found in stack."))},
c0:function(a,b){var z,y
z=this.dl(a)
if(z==null)throw H.c(P.F("Situation with id "+H.b(a)+" does not exist in "+H.b(this.f)))
y=this.f
if(z!==(z|0)||z>=y.length)return H.f(y,z)
y[z]=b},
dN:function(a,b,c,d,e){var z,y,x,w
z=this.d7(a,b,c,d,e)
y=z.ga_(z)
if(y.u()){x=y.gS()
y=this.r
w=x.gU()
if(typeof w!=="number")return H.x(w)
return y-w}return},
kZ:function(a,b,c){return this.dN(null,a,b,c,null)},
c4:function(a,b,c){return this.dN(a,null,b,null,c)},
kY:function(a,b,c){return this.dN(a,b,null,null,c)},
dM:function(a){return this.dN(a,null,null,null,null)},
k:function(a){var z,y
z=this.a
y=z.ei()
y.aw(0,z)
return"World<"+P.ce(y,"{","}")+">"},
X:function(a,b){var z,y,x
z=this.Y(a)
y=z.a1(b)
x=this.a
x.a3(0,z)
x.q(0,y)},
dl:function(a){var z,y,x
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
ea:function(a){var z,y,x,w
z=P.a4(null,null,null,R.I)
y=P.bb(null,O.cD)
x=P.a4(null,null,null,U.ab)
w=P.a4(null,null,null,null)
w=new A.ad(z,x,a.c,y,w,[],null,null)
w.ih(a)
return w}}},pI:{"^":"a:0;a",
$1:function(a){return a.gdt()===this.a}},pJ:{"^":"a:0;a",
$1:function(a){return J.e(a.gcr(),this.a.gi())}},pK:{"^":"a:0;a",
$1:function(a){return a.gfc().a7(0,this.a.gi())}},pL:{"^":"a:0;a",
$1:function(a){return a.ghG()===this.a}},pM:{"^":"a:0;a",
$1:function(a){return a.ghE()===this.a}},pN:{"^":"a:0;a",
$1:function(a){return J.e(a.gi(),this.a)}},pO:{"^":"a:0;a",
$1:function(a){return J.e(a.gh(),this.a)}},pP:{"^":"a:0;a",
$1:function(a){return J.e(a.gi(),this.a)}},pQ:{"^":"a:2;",
$0:function(){return}}}],["","",,A,{"^":"",W:{"^":"af;a0:b<"},fW:{"^":"W;c,V:d<,I:e<,h:f<,b,a",
P:[function(a,b,c){throw H.c(new P.w("SimpleAction always succeeds"))},"$3","gL",6,0,1],
R:[function(a,b,c){return this.c.$4(a,b,c,this)},"$3","gM",6,0,1],
a9:function(a,b){throw H.c(new P.w("SimpleAction shouldn't have to provide roll reason"))},
H:function(a,b){return 1},
gJ:function(){return!1},
G:function(a,b){return!0},
gK:function(){return H.i(new P.w("Not rerollable"))},
gO:function(){return!1}}}],["","",,N,{"^":"",k4:{"^":"z;J:c<,a0:d<,I:e<,O:f<,K:r<,b,a",
ga6:function(){return"confuse <object>"},
gh:function(){return"Confuse"},
gaf:function(){return"will <subject> confuse <object>?"},
P:[function(a,b,c){var z
a.ad(c,"<subject> touch<es> <subject's> temple")
z=this.b
a.ae(c,"<subject> tr<ies> to {channel|implant} {terror|confusion} into <object's> mind",z)
a.eT(c,"<subject> fail<s>",!0,!0)
return H.b(a.gh())+" fails to confuse "+H.b(z.gh())},"$3","gL",6,0,1],
R:[function(a,b,c){var z
a.ad(c,"<subject> touch<es> <subject's> temple")
z=this.b
a.bn(c,"<subject> {channel<s>|implant<s>} {terror|confusion} into <object's> mind",z,!0)
z.aB(c,"<subject's> eyes go wide with terror",!0)
return H.b(a.gh())+" confuses "+H.b(z.gh())},"$3","gM",6,0,1],
H:function(a,b){return 0.6},
G:function(a,b){var z
if(a.gN()===!0)if(a.ga4()){z=b.a
z=new H.L(z,new N.k5(this),[H.m(z,0)])
z=z.gl(z)>=2&&!this.b.eL(b)}else z=!1
else z=!1
return z},
v:{
wE:[function(a){return new N.k4(!0,!0,"Channeling the terror of the Dead Prince into lesser minds is something you've been practicing. It makes the target rabid and disoriented. They might attack their own.",!0,C.c,a,null)},"$1","tM",2,0,4]}},k5:{"^":"a:0;a",
$1:function(a){return a.gb0()&&a.gb4().hb(this.a.b.gb4())}}}],["","",,V,{"^":"",ks:{"^":"z;O:c<,K:d<,J:e<,a0:f<,I:r<,b,a",
ga6:function(){return"kick <object's> weapon off"},
gh:function(){return"DisarmKick"},
gaf:function(){return"will <subject> kick the weapon off?"},
P:[function(a,b,c){S.a5(new V.kt(this,a,c),new V.ku(this,a,c),null,null)
return H.b(a.gh())+" fails to kick "+H.b(this.b.gh())+"'s weapon off"},"$3","gL",6,0,1],
R:[function(a,b,c){var z,y
S.a5(new V.kv(this,a,c),new V.kw(this,a,c),null,null)
z=b.f
y=z.length!==0?C.a.gw(z):null
b.c0(y.gi(),y.a1(new V.kx(this)))
z=this.b
b.X(z.gi(),new V.ky())
return H.b(a.gh())+" kicks "+H.b(z.gh())+"'s weapon off"},"$3","gM",6,0,1],
H:function(a,b){var z=a.ga4()?0:0.2
if(a.ch===!0)return 0.7-z
return 0.5-z},
G:function(a,b){var z
if(a.ga4()||a.dy===C.h){z=this.b
z=z.ga2()&&!z.gaF()}else z=!1
return z},
v:{
wH:[function(a){return new V.ks(!0,C.c,!0,!0,"When enemies are on the ground, you can try to kick their weapon off to disarm them.",a,null)},"$1","u2",2,0,4]}},kt:{"^":"a:2;a,b,c",
$0:function(){var z,y
z=this.b
y=this.c
z.ae(y,"<subject> kick<s> {at|towards} <object's> weapon",this.a.b)
z.al(y,"<subject> mi<sses>",!0)}},ku:{"^":"a:2;a,b,c",
$0:function(){var z,y
z=this.c
y=this.a.b
this.b.ae(z,"<subject> kick<s> <object's> weapon",y)
y.al(z,"<subject> hold<s> onto it",!0)}},kv:{"^":"a:2;a,b,c",
$0:function(){var z=this.a.b
this.b.kV(this.c,"<subject> kick<s> <object-owner's> <object> off <object-owner's> hand",!0,z.gT(),z,!0)}},kw:{"^":"a:2;a,b,c",
$0:function(){var z,y
z=this.c
y=this.a.b
this.b.bn(z,"<subject> kick<s> <object's> {right|} hand",y,!0)
z.cf(0,"<owner's> <subject> fl<ies> away",y,y.gT())}},kx:{"^":"a:14;a",
$1:function(a){a.gbk().q(0,this.a.b.gT())
return a}},ky:{"^":"a:0;",
$1:function(a){a.sT($.$get$di())
return a}}}],["","",,R,{"^":"",mb:{"^":"z;O:c<,K:d<,J:e<,a0:f<,I:r<,b,a",
gh:function(){return"KickToGround"},
ga6:function(){return"kick <object> to the ground"},
gaf:function(){return"will <subject> kick <object> prone?"},
P:[function(a,b,c){S.a5(new R.mc(this,a,c),new R.md(this,a,c),null,null)
return H.b(a.gh())+" fails to sweep "+H.b(this.b.gh())+" off feet"},"$3","gL",6,0,1],
R:[function(a,b,c){var z
S.a5(new R.me(this,a,c),new R.mf(this,a,c,U.bB(b)),null,null)
z=this.b
b.X(z.gi(),new R.mg())
return H.b(a.gh())+" sweeps "+H.b(z.gh())+" off feet"},"$3","gM",6,0,1],
H:function(a,b){var z=a.ga4()?0:0.2
if(a.ch===!0)return 0.7-z
return 0.5-z},
G:function(a,b){return(a.ga4()||a.dy===C.h)&&!this.b.ga2()},
v:{
wY:[function(a){return new R.mb(!0,C.c,!0,!0,"Sweeping opponents off their feet doesn't deal much damage but on the ground they will be much easier targets for you and your allies.",a,null)},"$1","uF",2,0,4]}},mc:{"^":"a:2;a,b,c",
$0:function(){var z,y
z=this.b
y=this.c
z.ae(y,"<subject> kick<s> {at|towards} <object's> feet",this.a.b)
z.al(y,"<subject> mi<sses>",!0)}},md:{"^":"a:2;a,b,c",
$0:function(){var z,y
z=this.c
y=this.a.b
this.b.ae(z,"<subject> kick<s> <object's> shin",y)
y.al(z,"<subject> <does>n't budge",!0)}},me:{"^":"a:2;a,b,c",
$0:function(){this.b.kT(this.c,"<subject> kick<s> <object> off <object's> feet and to the ground",!0,this.a.b,!0)}},mf:{"^":"a:2;a,b,c,d",
$0:function(){var z,y
z=this.c
y=this.a.b
this.b.bn(z,"<subject> kick<s> <object's> {right|left} shin",y,!0)
y.ad(z,"<subject> {grunt|shriek}<s>")
y.aB(z,"<subject> fall<s> to the "+H.b(this.d),!0)}},mg:{"^":"a:0;",
$1:function(a){a.sah(C.f)
return a}}}],["","",,F,{"^":"",n_:{"^":"af;I:b<,J:c<,a0:d<,O:e<,K:f<,a",
gV:function(){return"Stand off."},
gh:function(){return"Pass"},
P:[function(a,b,c){throw H.c(new P.X(null))},"$3","gL",6,0,1],
R:[function(a,b,c){if(a.gN()===!0)a.ad(c,"<subject> stand<s> off")
return H.b(a.gh())+" passes the opportunity"},"$3","gM",6,0,1],
a9:function(a,b){return"WARNING this shouldn't be user-visible"},
H:function(a,b){return 1},
G:function(a,b){return!0}}}],["","",,Y,{"^":"",nd:{"^":"z;O:c<,K:d<,J:e<,a0:f<,I:r<,b,a",
ga6:function(){return"force <object> off balance"},
gh:function(){return"Pound"},
gaf:function(){return"will <subject> force <object> off balance?"},
P:[function(a,b,c){var z=this.b
a.ht(c,"<subject> {fiercely|violently} {pound<s>|strike<s>|hammer<s>|batter<s>} on <object-owner's> {<object>|weapon}",z.gT(),z)
z.bm(c,"<subject> {retain<s>|keep<s>} <subject's> {|combat} {stance|footing}",!0)
return H.b(a.gh())+" kicks "+H.b(z.db)+" off balance"},"$3","gL",6,0,1],
R:[function(a,b,c){var z=this.b
a.ht(c,"<subject> {fiercely|violently} {pound<s>|strike<s>|hammer<s>|batter<s>} on <object-owner's> {<object>|weapon}",z.gT(),z)
if(z.ga4()){z.hs(c,"<subject> lose<s> <object>",!0,$.$get$es())
b.X(z.y,new Y.ne())
C.a.q(b.f,U.mG(z,a))
return H.b(a.gh())+" pounds "+H.b(z.db)+" off balance"}else if(z.gao()){z.ad(c,"<subject> <is> already off balance")
c.ew(0,"<subject> make<s> <object> fall to the "+H.b(U.bB(b)),z,$.$get$iz())
b.X(z.y,new Y.nf())
return H.b(a.gh())+" pounds "+H.b(z.db)+" to the ground"}throw H.c(new P.w("enemy pose must be either standing or off-balance"))},"$3","gM",6,0,1],
H:function(a,b){var z=a.ga4()?0:0.2
if(a.ch===!0)return 0.7-z
return 0.5-z},
G:function(a,b){var z,y
if(!a.ga2()){z=a.e
if(z.gaT()||z.gko()){z=this.b
if(!z.gT().gcg()){z.gT().geB()
y=!1}else y=!0
z=y&&!z.ga2()}else z=!1}else z=!1
return z},
v:{
x5:[function(a){return new Y.nd(!0,C.c,!0,!0,"Forcing enemies off balance often means hitting them heavily several times in a row. The goal is not to deal damage but to force the opponent to lose control of their combat stance. It can also give members of your party an opportunity to strike.",a,null)},"$1","uQ",2,0,4]}},ne:{"^":"a:0;",
$1:function(a){a.sah(C.h)
return a}},nf:{"^":"a:0;",
$1:function(a){a.sah(C.f)
return a}}}],["","",,B,{"^":"",nB:{"^":"af;I:b<,J:c<,a0:d<,O:e<,K:f<,a",
gV:function(){return"Regain balance."},
gh:function(){return"RegainBalance"},
P:[function(a,b,c){throw H.c(new P.X(null))},"$3","gL",6,0,1],
R:[function(a,b,c){if(a.gN()===!0)a.bn(c,"<subject> regain<s> <object>",$.$get$es(),!0)
b.X(a.gi(),new B.nC())
return H.b(a.gh())+" regains balance"},"$3","gM",6,0,1],
a9:function(a,b){return"Will "+a.ga8().a+" regain balance?"},
H:function(a,b){return 1},
G:function(a,b){return a.gao()}},nC:{"^":"a:0;",
$1:function(a){a.sah(C.k)
return C.k}}}],["","",,O,{"^":"",nR:{"^":"af;I:b<,J:c<,a0:d<,O:e<,K:f<,a",
gV:function(){return"Scramble."},
gh:function(){return"Scramble"},
P:[function(a,b,c){throw H.c(new P.X(null))},"$3","gL",6,0,1],
R:[function(a,b,c){a.ad(c,"<subject> tr<ies> to {scramble|crawl} out of {reach|harm's way}")
return H.b(a.gh())+" scrambles on ground"},"$3","gM",6,0,1],
a9:function(a,b){return"Will "+a.ga8().a+" crawl out of harm's way?"},
H:function(a,b){return 1},
G:function(a,b){if(!a.ga2())return!1
if(A.dm(a,b))return!0
return!1}}}],["","",,Q,{"^":"",oz:{"^":"af;I:b<,J:c<,a0:d<,O:e<,K:f<,a",
gV:function(){return"Stand up."},
gh:function(){return"StandUp"},
P:[function(a,b,c){throw H.c(new P.X(null))},"$3","gL",6,0,1],
R:[function(a,b,c){a.ad(c,"<subject> {rise<s>|stand<s> up|get<s> to <subject's> feet|get<s> up|pick<s> <subjectPronounSelf> up}")
S.a5(new Q.oA(a,c),new Q.oB(a,c),null,null)
b.X(a.gi(),new Q.oC())
return H.b(a.gh())+" stands up"},"$3","gM",6,0,1],
a9:function(a,b){return"Will "+a.ga8().a+" stand up?"},
H:function(a,b){return 1},
G:function(a,b){if(!a.ga2())return!1
if(A.dm(a,b))return!1
return!0}},oA:{"^":"a:2;a,b",
$0:function(){return this.a.ad(this.b,"<subject> {stagger<s>|sway<s>} back before finding balance")}},oB:{"^":"a:2;a,b",
$0:function(){return this.a.ad(this.b,"<subject> stead<ies> <subjectPronounSelf>")}},oC:{"^":"a:0;",
$1:function(a){a.sah(C.k)
return C.k}}}],["","",,T,{"^":"",
xy:[function(a){return new A.a0(T.eD(),null,null,new T.v3(),new T.v4(),new T.v5(),null,!0,"This move is hard, but when succesful, it's decisive.",!0,!0,"StartBreakNeckOnGround",!1,null,"break <object's> neck",null,a,null)},"$1","w7",2,0,4],
xz:[function(a){return new A.a0(T.eD(),new T.v6(),T.eD(),new T.v7(),new T.v8(),new T.v9(),new T.va(),!0,"This move is hard, but when succesful, it's decisive.",!0,!0,"StartBreakNeckOnGroundPlayer",!0,C.c,"break <object's> neck","will <subject> succeed?",a,null)},"$1","w8",2,0,4],
xA:[function(a,b,c,d,e){a.ae(c,"<subject> throw<s> <subjectPronounSelf> {on|upon} <object>",d)
b.X(a.gi(),new T.vb())},"$5","eD",10,0,8],
v3:{"^":"a:3;",
$3:function(a,b,c){return a.gN()!==!0&&c.ga2()&&a.gaF()&&c.gaF()}},
v4:{"^":"a:3;",
$3:function(a,b,c){return Y.eZ(a,c)}},
v5:{"^":"a:3;",
$3:function(a,b,c){return S.dT(a,c,C.l)}},
v7:{"^":"a:3;",
$3:function(a,b,c){return a.gN()===!0&&c.ga2()&&a.gaF()&&c.gaF()}},
v8:{"^":"a:3;",
$3:function(a,b,c){return Y.eZ(a,c)}},
v9:{"^":"a:3;",
$3:function(a,b,c){return S.dT(a,c,C.m)}},
v6:{"^":"a:3;",
$3:function(a,b,c){return 0.7}},
va:{"^":"a:3;",
$3:function(a,b,c){return S.dT(a,c,C.p)}},
vb:{"^":"a:0;",
$1:function(a){a.sah(C.f)
return a}}}],["","",,A,{"^":"",a0:{"^":"z;c,d,e,f,r,x,y,z,I:Q<,J:ch<,a0:cx<,h:cy<,O:db<,K:dx<,a6:dy<,af:fr<,b,a",
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
xB:[function(a){return new A.a0(M.eE(),null,null,new M.vc(),new M.vd(),new M.ve(),null,!0,"Jumping and tackling an opponent is one of the most risky moves but it's a quick way to neutralize someone.",!0,!0,"StartLeap",!1,null,"leap at <object>",null,a,null)},"$1","w9",2,0,4],
xC:[function(a){return new A.a0(M.eE(),new M.vf(),M.eE(),new M.vg(),new M.vh(),new M.vi(),new M.vj(),!0,"Jumping and tackling an opponent is one of the most risky moves but it's a quick way to neutralize someone.",!0,!0,"StartLeapPlayer",!0,C.c,"leap at <object>","will <subject> tackle <objectPronoun>?",a,null)},"$1","wa",2,0,4],
xD:[function(a,b,c,d,e){if(a.ga2()){a.hq(c,"<subject> roll<s>",e.gi())
a.hq(c,"<subject> put<s> <subject's> feet under <subjectPronounAccusative>",e.gi())}a.kQ(c,"<subject> {leap<s>|jump<s>|spring<s>|launch<es> <subjectPronounSelf>|lunge<s>} at <object>",e.gi(),d)},"$5","eE",10,0,8],
vc:{"^":"a:3;",
$3:function(a,b,c){var z,y
if(a.gN()!==!0){if(!a.gaF()){z=a.fy
y=$.$get$bA()
z=z.a
y=y.a
y=z==null?y==null:z===y
z=y}else z=!0
z=z&&!c.ga2()&&!A.dm(a,b)}else z=!1
return z}},
vd:{"^":"a:3;",
$3:function(a,b,c){return F.fp(a,c)}},
ve:{"^":"a:3;",
$3:function(a,b,c){return V.dI(a,c,C.l)}},
vg:{"^":"a:3;",
$3:function(a,b,c){return a.gN()===!0&&a.gaF()&&!c.ga2()&&!A.dm(a,b)}},
vh:{"^":"a:3;",
$3:function(a,b,c){return F.fp(a,c)}},
vi:{"^":"a:3;",
$3:function(a,b,c){return V.dI(a,c,C.m)}},
vf:{"^":"a:3;",
$3:function(a,b,c){return a.ga4()?0.4:0.2}},
vj:{"^":"a:3;",
$3:function(a,b,c){return V.dI(a,c,C.p)}}}],["","",,U,{"^":"",
xE:[function(a){return new A.a0(U.eF(),null,null,new U.vk(),new U.vl(),new U.vm(),null,!0,"Punching someone hard enough can cause them to lose their footing. And it hurts.",!0,!0,"StartPunch",!1,null,"punch <object>",null,a,null)},"$1","wb",2,0,4],
xF:[function(a){return new A.a0(U.eF(),new U.vn(),U.eF(),new U.vo(),new U.vp(),new U.vq(),new U.vr(),!0,"Punching someone hard enough can cause them to lose their footing. And it hurts.",!0,!0,"StartPunchPlayer",!0,C.c,"punch <object>","will <subject> hit <objectPronoun>?",a,null)},"$1","wc",2,0,4],
xG:[function(a,b,c,d,e){c.jn(0,"<subject> {thrust<s>|swing<s>} <subject's> fist at <object>",e.gi(),!0,d,a)},"$5","eF",10,0,8],
vk:{"^":"a:3;",
$3:function(a,b,c){var z
if(a.gN()!==!0)z=(a.ga4()||a.dy===C.h)&&!c.ga2()&&a.gaF()
else z=!1
return z}},
vl:{"^":"a:3;",
$3:function(a,b,c){return Q.fM(a,c)}},
vm:{"^":"a:3;",
$3:function(a,b,c){return Z.e0(a,c,C.l)}},
vo:{"^":"a:3;",
$3:function(a,b,c){var z
if(a.gN()===!0)z=(a.ga4()||a.dy===C.h)&&!c.ga2()&&a.gaF()
else z=!1
return z}},
vp:{"^":"a:3;",
$3:function(a,b,c){return Q.fM(a,c)}},
vq:{"^":"a:3;",
$3:function(a,b,c){return Z.e0(a,c,C.m)}},
vn:{"^":"a:3;",
$3:function(a,b,c){return 0.7}},
vr:{"^":"a:3;",
$3:function(a,b,c){return Z.e0(a,c,C.p)}}}],["","",,G,{"^":"",
xH:[function(a){return new A.a0(G.eG(),null,null,new G.vu(),new G.vv(),new G.vw(),null,!0,"The basic swordfighting move is also often the most effective.",!0,!0,"StartSlash",!1,null,"swing at <object>",null,a,null)},"$1","wd",2,0,4],
xM:[function(a){return new A.a0(G.eG(),new G.vF(),G.eG(),new G.vG(),new G.vH(),new G.vI(),new G.vJ(),!0,"The basic swordfighting move is also often the most effective.",!0,!0,"StartSlashPlayer",!0,C.c,"swing at <object>","will <subject> hit <objectPronoun>?",a,null)},"$1","we",2,0,4],
xN:[function(a,b,c,d,e){return a.dK(c,"<subject> swing<s> {"+H.b(U.a8(a))+" |}at <object>",e.gi(),!0,d)},"$5","eG",10,0,8],
vu:{"^":"a:3;",
$3:function(a,b,c){return a.gN()!==!0&&a.ga4()&&!c.ga2()&&a.e.gaT()}},
vv:{"^":"a:3;",
$3:function(a,b,c){return M.bc(a,c)}},
vw:{"^":"a:3;",
$3:function(a,b,c){return L.aP(a,c,C.l)}},
vG:{"^":"a:3;",
$3:function(a,b,c){return a.gN()===!0&&a.ga4()&&!c.ga2()&&a.e.gaT()}},
vH:{"^":"a:3;",
$3:function(a,b,c){return M.bc(a,c)}},
vI:{"^":"a:3;",
$3:function(a,b,c){return L.aP(a,c,C.m)}},
vF:{"^":"a:3;",
$3:function(a,b,c){return 0.7-(c.gan()!=null?0.2:0)}},
vJ:{"^":"a:3;",
$3:function(a,b,c){return L.aP(a,c,C.p)}}}],["","",,R,{"^":"",
xI:[function(a,b,c,d,e){return a.hs(c,"<subject> completely miss<es> <object> with "+H.b(U.a8(a)),!0,d)},"$5","iF",10,0,11],
xJ:[function(a){return new A.a0(R.iG(),new R.vx(),R.iF(),new R.vy(),new R.vz(),new R.vA(),null,!1,"It's always better to fight with your feet firmly on the ground. But sometimes, it's necessary to act quickly.",!0,!0,"StartSlashOutOfBalance",!1,null,"swing at <object> (while out of balance)",null,a,null)},"$1","wf",2,0,4],
xK:[function(a){return new A.a0(R.iG(),new R.vB(),R.iF(),new R.vC(),new R.vD(),new R.vE(),null,!1,"It's always better to fight with your feet firmly on the ground. But sometimes, it's necessary to act quickly.",!0,!0,"StartSlashOutOfBalancePlayer",!1,null,"swing at <object> (while out of balance)",null,a,null)},"$1","wg",2,0,4],
xL:[function(a,b,c,d,e){return a.dK(c,"<subject> swing<s> {"+H.b(U.a8(a))+" |}at <object>",e.gi(),!0,d)},"$5","iG",10,0,8],
vy:{"^":"a:3;",
$3:function(a,b,c){return a.gN()!==!0&&a.gao()&&!c.ga2()&&a.e.gaT()}},
vz:{"^":"a:3;",
$3:function(a,b,c){return M.bc(a,c)}},
vA:{"^":"a:3;",
$3:function(a,b,c){return L.aP(a,c,C.l)}},
vx:{"^":"a:3;",
$3:function(a,b,c){return 0.7}},
vC:{"^":"a:3;",
$3:function(a,b,c){return a.gN()===!0&&a.gao()&&!c.ga2()&&a.e.gaT()}},
vD:{"^":"a:3;",
$3:function(a,b,c){return M.bc(a,c)}},
vE:{"^":"a:3;",
$3:function(a,b,c){return L.aP(a,c,C.m)}},
vB:{"^":"a:3;",
$3:function(a,b,c){return 0.5-(c.gan()!=null?0.2:0)}}}],["","",,D,{"^":"",
xO:[function(a){return new A.a0(D.eH(),null,null,new D.vK(),new D.vL(),new D.vM(),null,!0,"Opponents on the ground are often the most vulnerable.",!0,!0,"StartStrikeDown",!1,null,"strike down at <object>",null,a,null)},"$1","wh",2,0,4],
xP:[function(a){return new A.a0(D.eH(),new D.vN(),D.eH(),new D.vO(),new D.vP(),new D.vQ(),new D.vR(),!0,"Opponents on the ground are often the most vulnerable.",!0,!0,"StartStrikeDownPlayer",!0,C.c,"strike down at <object>","will <subject> hit?",a,null)},"$1","wi",2,0,4],
xQ:[function(a,b,c,d,e){return a.ae(c,"<subject> strike<s> down {with "+H.b(U.a8(a))+" |}at <object>",d)},"$5","eH",10,0,11],
vK:{"^":"a:3;",
$3:function(a,b,c){return a.gN()!==!0&&c.ga2()&&!a.ga2()&&a.e.gaT()}},
vL:{"^":"a:3;",
$3:function(a,b,c){return D.d5(a,c)}},
vM:{"^":"a:3;",
$3:function(a,b,c){return V.bJ(a,c,C.l)}},
vO:{"^":"a:3;",
$3:function(a,b,c){return a.gN()===!0&&c.ga2()&&!a.ga2()&&a.e.gaT()}},
vP:{"^":"a:3;",
$3:function(a,b,c){return D.d5(a,c)}},
vQ:{"^":"a:3;",
$3:function(a,b,c){return V.bJ(a,c,C.m)}},
vN:{"^":"a:3;",
$3:function(a,b,c){var z,y
z=a.gao()?0.2:0
y=c.gan()!=null?0.2:0
return 0.7-z-y}},
vR:{"^":"a:3;",
$3:function(a,b,c){return V.bJ(a,c,C.p)}}}],["","",,A,{"^":"",
xR:[function(a){return new A.a0(A.eI(),null,null,new A.vS(),new A.vT(),new A.vU(),null,!0,"The basic move with a spear.",!0,!0,"StartThrustSpear",!1,null,"thrust at <object>",null,a,null)},"$1","wj",2,0,4],
xV:[function(a){return new A.a0(A.eI(),new A.w2(),A.eI(),new A.w3(),new A.w4(),new A.w5(),new A.w6(),!0,"The basic move with a spear.",!0,!0,"StartThrustSpearPlayer",!0,C.c,"thrust at <object>","will <subject> hit <objectPronoun>?",a,null)},"$1","wk",2,0,4],
xW:[function(a,b,c,d,e){return a.dK(c,"<subject> thrust<s> {"+H.b(U.a8(a))+" |}at <object>",e.gi(),!0,d)},"$5","eI",10,0,8],
vS:{"^":"a:3;",
$3:function(a,b,c){return a.gN()!==!0&&a.ga4()&&!c.ga2()&&a.e instanceof Z.at}},
vT:{"^":"a:3;",
$3:function(a,b,c){return M.bc(a,c)}},
vU:{"^":"a:3;",
$3:function(a,b,c){return L.aP(a,c,C.l)}},
w3:{"^":"a:3;",
$3:function(a,b,c){return a.gN()===!0&&a.ga4()&&!c.ga2()&&a.e instanceof Z.at}},
w4:{"^":"a:3;",
$3:function(a,b,c){return M.bc(a,c)}},
w5:{"^":"a:3;",
$3:function(a,b,c){return L.aP(a,c,C.m)}},
w2:{"^":"a:3;",
$3:function(a,b,c){return 0.7-(c.gan()!=null?0.2:0)}},
w6:{"^":"a:3;",
$3:function(a,b,c){return L.aP(a,c,C.p)}}}],["","",,O,{"^":"",
xS:[function(a){return new A.a0(O.eJ(),null,null,new O.vV(),new O.vW(),new O.vX(),null,!0,"Opponents on the ground are often the most vulnerable.",!0,!0,"StartThrustSpearDown",!1,null,"thrust down at <object>",null,a,null)},"$1","wl",2,0,4],
xT:[function(a){return new A.a0(O.eJ(),new O.vY(),O.eJ(),new O.vZ(),new O.w_(),new O.w0(),new O.w1(),!0,"Opponents on the ground are often the most vulnerable.",!0,!0,"StartThrustSpearDownPlayer",!0,C.c,"thrust down at <object>","will <subject> hit?",a,null)},"$1","wm",2,0,4],
xU:[function(a,b,c,d,e){return a.ae(c,"<subject> thrust<s> down {with "+H.b(U.a8(a))+" |}at <object>",d)},"$5","eJ",10,0,11],
vV:{"^":"a:3;",
$3:function(a,b,c){return a.gN()!==!0&&c.ga2()&&!a.ga2()&&a.e instanceof Z.at}},
vW:{"^":"a:3;",
$3:function(a,b,c){return D.d5(a,c)}},
vX:{"^":"a:3;",
$3:function(a,b,c){return V.bJ(a,c,C.l)}},
vZ:{"^":"a:3;",
$3:function(a,b,c){return a.gN()===!0&&c.ga2()&&!a.ga2()&&a.e instanceof Z.at}},
w_:{"^":"a:3;",
$3:function(a,b,c){return D.d5(a,c)}},
w0:{"^":"a:3;",
$3:function(a,b,c){return V.bJ(a,c,C.m)}},
vY:{"^":"a:3;",
$3:function(a,b,c){var z,y
z=a.gao()?0.2:0
y=c.gan()!=null?0.2:0
return 0.7-z-y}},
w1:{"^":"a:3;",
$3:function(a,b,c){return V.bJ(a,c,C.p)}}}],["","",,E,{"^":"",pe:{"^":"cc;a0:c<,b,a",
ga6:function(){return"pick up <object>"},
gI:function(){return"A shield makes a huge difference in battle."},
gJ:function(){return!1},
gh:function(){return"TakeDroppedShield"},
gO:function(){return!1},
gK:function(){return},
P:[function(a,b,c){throw H.c(new P.X(null))},"$3","gL",6,0,1],
R:[function(a,b,c){var z,y
z=b.f
y=z.length!==0?C.a.gw(z):null
b.c0(y.gi(),y.a1(new E.pf(this)))
b.X(a.gi(),new E.pg(this))
z=this.b
a.ae(c,"<subject> pick<s> <object> up",z)
return H.b(a.gh())+" picks up "+H.b(z.gh())},"$3","gM",6,0,1],
a9:function(a,b){return H.i(new P.X(null))},
H:function(a,b){return 1},
G:function(a,b){if(!(this.b instanceof E.br))return!1
a.gfR()
if(a.d!=null)return!1
return!0},
v:{
xa:[function(a){return new E.pe(!0,a,null)},"$1","ws",2,0,17]}},pf:{"^":"a:14;a",
$1:function(a){a.gbk().a3(0,this.a.b)
return a}},pg:{"^":"a:0;a",
$1:function(a){a.san(H.E(this.a.b,"$isbr"))}}}],["","",,M,{"^":"",ph:{"^":"cc;a0:c<,b,a",
ga6:function(){return"pick up <object>"},
gI:function(){return"A different weapon might change the battle."},
gJ:function(){return!1},
gh:function(){return"TakeDroppedWeapon"},
gO:function(){return!1},
gK:function(){return},
P:[function(a,b,c){throw H.c(new P.X(null))},"$3","gL",6,0,1],
R:[function(a,b,c){var z,y
z=b.f
y=z.length!==0?C.a.gw(z):null
b.c0(y.gi(),y.a1(new M.pi(this)))
b.X(a.gi(),new M.pj(this,a))
z=this.b
a.ae(c,"<subject> pick<s> <object> up",z)
return H.b(a.gh())+" picks up "+H.b(z.gh())},"$3","gM",6,0,1],
a9:function(a,b){return H.i(new P.X(null))},
H:function(a,b){return 1},
G:function(a,b){var z,y,x
z=this.b
y=J.o(z)
if(!y.$isaR)return!1
if(!!y.$isat)return!1
a.gfR()
z=z.gac()
y=a.e.gac()
if(typeof y!=="number")return H.x(y)
if(z<=y)return!1
x=b.c4("DisarmKick",a,!0)
if(x!=null&&x<=2)return!1
return!0},
v:{
xb:[function(a){return new M.ph(!0,a,null)},"$1","wt",2,0,17]}},pi:{"^":"a:14;a",
$1:function(a){a.gbk().a3(0,this.a.b)
return a}},pj:{"^":"a:0;a,b",
$1:function(a){if(!this.b.gaF())a.gaz().q(0,a.gT())
a.sT(H.E(this.a.b,"$isaR"))}}}],["","",,D,{"^":"",pq:{"^":"z;J:c<,a0:d<,I:e<,O:f<,K:r<,b,a",
ga6:function(){return"throw spear at <object>"},
gh:function(){return"ThrowSpear"},
gaf:function(){return"will <subject> hit <object>?"},
P:[function(a,b,c){var z,y
z=this.fq(a)
y=this.b
a.ae(c,"<subject> {throw<s>|hurl<s>|cast<s>} "+H.b(z.gaI()===!0?z.gh():"<subject's> "+H.b(z.gh()))+" at <object>",y)
if(y.gan()!=null)y.kS(c,"<subject> deflects it with <subject's> <object>",!0,y.gan(),!0)
else y.eU(c,"<subject> {dodge<s> it|move<s> out of the way}",!0,!0)
z.ad(c,"<subject> {drive<s>|plunge<s>|ram<s>|thrust<s>} into the "+H.b(U.bB(b))+" {|nearby|not far from here}")
this.fD(b,a,z)
return H.b(a.gh())+" fails to hit "+H.b(y.gh())+" with spear"},"$3","gL",6,0,1],
R:[function(a,b,c){var z,y,x,w,v,u
z=this.fq(a)
y=this.b
a.ae(c,"<subject> {throw<s>|hurl<s>|cast<s>} "+H.b(z.gaI()===!0?z.gh():"<subject's> "+H.b(z.gh()))+" at <object>",y)
if(y.gan()!=null)z.dL(c,"<subject> fl<ies> past <object-owner's> <object>",y.gan(),y,a,!0)
b.X(y.gi(),new D.pu(z))
x=!b.Y(y.gi()).gb0()&&y.gi()!==100
w=[P.r]
if(!x){v=S.bO("{shoulder|{left|right} arm|{left|right} thigh}")
u=a.gb4()
w=H.p([],w)
z.dL(c,"<subject> {pierce<s>|ram<s> into|drill<s> through} <object-owner's> <object>",new Y.aO(!1,v,w,u==null?$.$get$aY():u,!1,C.n),y,a,!0)
N.b4(c,y)}else{v=S.bO("{chest|eye|neck}")
u=a.gb4()
w=H.p([],w)
z.dL(c,"<subject> {pierce<s>|ram<s> into|drill<s> through} <object-owner's> <object>",new Y.aO(!1,v,w,u==null?$.$get$aY():u,!1,C.n),y,a,!0)
N.bj(c,b,y)}this.fD(b,a,z)
return H.b(a.gh())+" hits "+H.b(y.gh())+" with spear"},"$3","gM",6,0,1],
H:function(a,b){return 0.6-(this.b.gan()!=null?0.2:0)},
G:function(a,b){var z
if(a.gN()===!0)if(a.ga4())z=(C.a.a7(a.e.gf_(),C.r)||a.h7(C.r))&&J.e(b.au("FightSituation").gU(),0)
else z=!1
else z=!1
return z},
fq:function(a){var z,y
if(a.gT()!=null&&a.gT() instanceof Z.at)return a.gT()
for(z=a.gaz(),z=z.ga_(z);z.u();){y=z.d
if(y instanceof Z.at)return y}throw H.c(new P.w("No spear found in "+a.k(0)))},
fD:function(a,b,c){var z,y
z=a.au("FightSituation")
if(J.e(b.gT(),c)){y=b.jV()
if(y==null)y=$.$get$di()
a.X(b.y,new D.pr(y))}else a.X(b.gi(),new D.ps(c))
a.c0(z.gi(),z.a1(new D.pt(c)))},
v:{
xd:[function(a){return new D.pq(!0,!0,"The enemy is far enough for you to throw a spear at them and ready your other weapon before they close in.",!0,C.c,a,null)},"$1","ww",2,0,4]}},pu:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gag()
y=this.a.gbz()
if(typeof z!=="number")return z.aq()
a.sag(z-y)
return a}},pr:{"^":"a:0;a",
$1:function(a){var z=this.a
a.sT(z)
a.gaz().a3(0,z)
return a}},ps:{"^":"a:0;a",
$1:function(a){a.gaz().a3(0,this.a)
return a}},pt:{"^":"a:0;a",
$1:function(a){a.gbk().q(0,this.a)
return a}}}],["","",,M,{"^":"",pC:{"^":"af;I:b<,O:c<,K:d<,J:e<,a0:f<,a",
gV:function(){return"Regain clarity."},
gh:function(){return"Unconfuse"},
P:[function(a,b,c){throw H.c(new P.X(null))},"$3","gL",6,0,1],
R:[function(a,b,c){a.ad(c,"<subject> shake<s> <subject's> head violently")
if(a.gN()===!0)c.q(0,"the {horrible|terrible} spell seems to recede")
a.kR(c,"<subject's> eyes regain focus and clarity",!0,!0)
return H.b(a.gh())+" regains clarity"},"$3","gM",6,0,1],
a9:function(a,b){return"WARNING this shouldn't be user-visible"},
H:function(a,b){return 1},
G:function(a,b){var z
if(a.eL(b)){z=b.c4("Confuse",a,!0)
if(typeof z!=="number")return z.bo()
z=z>4}else z=!1
return z}}}],["","",,R,{"^":"",lq:{"^":"z;I:c<,J:d<,a0:e<,O:f<,K:r<,b,a",
gh:function(){return"FinishBreakNeck"},
ga6:function(){return""},
gaf:function(){return"(WARNING should not be user-visible)"},
P:[function(a,b,c){throw H.c(new P.X(null))},"$3","gL",6,0,1],
R:[function(a,b,c){var z=this.b
b.X(z.gi(),new R.lr())
if(J.e(z.gi(),100)){a.bn(c,"<subject> smash<es> <object's> head to the ground",z,!0)
N.b4(c,z)}else{a.bn(c,"<subject> break<s> <object's> neck",z,!0)
N.bj(c,b,z)}return H.b(a.gh())+" breaks "+H.b(z.gh())+"'s neck on ground"},"$3","gM",6,0,1],
H:function(a,b){return 1},
G:function(a,b){return!0},
v:{
wN:[function(a){return new R.lq(null,!0,!0,!0,C.c,a,null)},"$1","ua",2,0,4]}},lr:{"^":"a:0;",
$1:function(a){a.sag(0)
return a}}}],["","",,Y,{"^":"",
eZ:function(a,b){var z=new Y.dt(null,null,null,null,null)
new Y.tF(a,b).$1(z)
return z.p()},
eY:{"^":"ac;",
gaE:function(){return[R.ua()]},
gh:function(){return"BreakNeckOnGroundSituation"},
ax:function(){var z=new Y.dt(null,null,null,null,null)
z.m(this)
new Y.jT().$1(z)
return z.p()},
aW:function(a,b){if(a===0)return b.Y(this.a)
return},
b5:function(a,b){return new H.L(a,new Y.jU(this),[H.m(a,0)])}},
tF:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a7().ap(1073741823)
a.gb8().c=z
a.gb8().e=0
z=this.a.gi()
a.gb8().b=z
z=this.b.gi()
a.gb8().d=z
return a}},
jT:{"^":"a:0;",
$1:function(a){var z=a.gb8().e
if(typeof z!=="number")return z.ai()
a.gb8().e=z+1
return a}},
jU:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.e(a.gi(),z.a)||J.e(a.gi(),z.c)}},
pU:{"^":"eY;a,i:b<,c,U:d<",
a1:function(a){var z=new Y.dt(null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
A:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof Y.eY))return!1
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
dt:{"^":"d;a,b,c,d,e",
gi:function(){return this.gb8().c},
gU:function(){return this.gb8().e},
gb8:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
m:function(a){this.a=a},
p:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gb8().b
x=this.gb8().c
w=this.gb8().d
v=this.gb8().e
z=new Y.pU(y,x,w,v)
if(y==null)H.i(P.l("attacker"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("target"))
if(v==null)H.i(P.l("time"))}this.m(z)
return z}}}],["","",,Z,{"^":"",l8:{"^":"z;I:c<,J:d<,a0:e<,O:f<,K:r<,b,a",
ga6:function(){return"evade"},
gh:function(){return"EvadeNeckBreaking"},
gaf:function(){return"will <subject> evade?"},
P:[function(a,b,c){a.ad(c,"<subject> tr<ies> to {dodge it|break free}")
S.a5(new Z.l9(a,c),new Z.la(this,a,c),null,null)
b.aA()
return H.b(a.gh())+" fails to dodge "+H.b(this.b.gh())},"$3","gL",6,0,1],
R:[function(a,b,c){var z=this.b
a.bn(c,"<subject> {dodge<s> it|break<s> free}",z,!0)
b.b2("FightSituation")
return H.b(a.gh())+" evades "+H.b(z.gh())},"$3","gM",6,0,1],
H:function(a,b){var z
if(a.gN()===!0)return 0.6
z=b.f
return(z.length!==0?C.a.gw(z):null).gb3().b1(0.5)},
G:function(a,b){return!0},
v:{
wM:[function(a){return new Z.l8("This looks dangerous. Trying to evade this close-quarter move seems prudent.",!1,!1,!0,C.c,a,null)},"$1","u7",2,0,4]}},l9:{"^":"a:2;a,b",
$0:function(){return this.a.al(this.b,"<subject> {can't|fail<s>}",!0)}},la:{"^":"a:2;a,b,c",
$0:function(){return this.a.b.bQ(this.c,"<subject> <is> too quick for <object>",!0,this.b)}}}],["","",,S,{"^":"",
dT:function(a,b,c){var z=new S.dS(null,null,null,null,null,null)
new S.tE(a,b,c).$1(z)
return z.p()},
fC:{"^":"c7;",
gaE:function(){return[Z.u7()]},
gh:function(){return"OnGroundWrestleDefenseSituation"},
ax:function(){var z=new S.dS(null,null,null,null,null,null)
z.m(this)
new S.mU().$1(z)
return z.p()}},
tE:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$a7().ap(1073741823)
a.gaO().c=z
a.gaO().f=0
z=this.a.gi()
a.gaO().b=z
z=this.b.gi()
a.gaO().e=z
a.gaO().d=this.c
return a}},
mU:{"^":"a:0;",
$1:function(a){var z=a.gaO().f
if(typeof z!=="number")return z.ai()
a.gaO().f=z+1
return a}},
q3:{"^":"fC;cN:a<,i:b<,cq:c<,ct:d<,U:e<",
a1:function(a){var z=new S.dS(null,null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
A:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof S.fC))return!1
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
dS:{"^":"d;a,b,c,d,e,f",
gi:function(){return this.gaO().c},
gU:function(){return this.gaO().f},
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
z=new S.q3(y,x,w,v,u)
if(y==null)H.i(P.l("attacker"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("predeterminedResult"))
if(v==null)H.i(P.l("target"))
if(u==null)H.i(P.l("time"))}this.m(z)
return z}}}],["","",,A,{"^":"",
dm:function(a,b){var z,y,x,w
z=b.c4("KickToGround",a,!0)
if(z!=null&&z<=2)return!0
y=b.c4("Pound",a,!0)
if(y!=null&&y<=2)return!0
x=b.c4("FinishPunch",a,!0)
if(x!=null&&x<=2)return!0
w=b.c4("FinishLeap",a,!0)
if(w!=null&&w<=2)return!0
return!1}}],["","",,U,{"^":"",
c0:function(a){return a.gan().gaI()===!0?a.gan().gh():"<subject's> "+H.b(a.gan().gh())},
a8:function(a){return a.gT().gaI()===!0?a.gT().gh():"<subject's> "+H.b(a.gT().gh())}}],["","",,G,{"^":"",
xm:[function(a,b,c,d,e){a.ad(c,"<subject> tr<ies> to swing back")
a.eT(c,"<subject> {go<es> wide|miss<es>}",!0,!0)
if(a.ga4()){b.X(a.y,new G.tP())
a.c1(c,"<subject> lose<s> balance because of that",!0,!0)}else if(a.dy===C.h){b.X(a.y,new G.tQ())
a.aB(c,"<subject> lose<s> balance because of that",!0)
a.c1(c,"<subject> fall<s> to the ground",!0,!0)}},"$5","i9",10,0,11],
xn:[function(a){return new A.a0(G.ia(),new G.tR(),G.i9(),new G.tS(),new G.tT(),new G.tU(),null,!1,"You can deal serious damage when countering because your opponent is often caught off guard. On the other hand, counters require fast reaction and could throw you out of balance.",!0,!0,"CounterSlash",!1,null,"swing back at <object>",null,a,null)},"$1","tZ",2,0,4],
xp:[function(a,b,c,d,e){return a.ae(c,"<subject> swing<s> back",d)},"$5","ia",10,0,8],
xo:[function(a){return new A.a0(G.ia(),new G.tV(),G.i9(),new G.tW(),new G.tX(),new G.tY(),null,!1,"You can deal serious damage when countering because your opponent is often caught off guard. On the other hand, counters require fast reaction and could throw you out of balance.",!0,!0,"CounterSlashPlayer",!0,C.c,"swing back at <object>","will <subject> hit <objectPronoun>?",a,null)},"$1","u_",2,0,4],
tP:{"^":"a:0;",
$1:function(a){a.sah(C.h)
return a}},
tQ:{"^":"a:0;",
$1:function(a){a.sah(C.f)
return a}},
tS:{"^":"a:3;",
$3:function(a,b,c){return a.gN()!==!0&&a.gT().gaT()&&!a.ga2()}},
tT:{"^":"a:3;",
$3:function(a,b,c){return M.bc(a,c)}},
tU:{"^":"a:3;",
$3:function(a,b,c){return L.aP(a,c,C.l)}},
tR:{"^":"a:3;",
$3:function(a,b,c){return c.ga4()?0.7:0.9}},
tW:{"^":"a:3;",
$3:function(a,b,c){return a.gN()===!0&&a.gT().gaT()&&!a.ga2()}},
tX:{"^":"a:3;",
$3:function(a,b,c){return M.bc(a,c)}},
tY:{"^":"a:3;",
$3:function(a,b,c){return L.aP(a,c,C.m)}},
tV:{"^":"a:3;",
$3:function(a,b,c){return c.ga4()?0.7:0.9}}}],["","",,V,{"^":"",kd:{"^":"z;I:c<,J:d<,a0:e<,O:f<,K:r<,b,a",
ga6:function(){return"tackle <object>"},
gh:function(){return"CounterTackle"},
gaf:function(){return"will <subject> tackle <objectPronoun>?"},
P:[function(a,b,c){var z=this.b
a.ae(c,"<subject> tr<ies> to tackle <object>",z)
S.a5(new V.ke(a,c),new V.kf(this,c),null,null)
a.ae(c,"<subject> land<s> on the "+H.b(U.bB(b))+" next to <object>",z)
b.X(a.gi(),new V.kg())
return H.b(a.gh())+" fails to tackle "+H.b(z.gh())},"$3","gL",6,0,1],
R:[function(a,b,c){var z=this.b
a.ae(c,"<subject> tackle<s> <object> to the ground",z)
b.X(z.gi(),new V.kh())
b.X(a.gi(),new V.ki())
return H.b(a.gh())+" tackles "+H.b(z.gh())},"$3","gM",6,0,1],
H:function(a,b){var z=this.b.gao()?0.2:0
if(a.gN()===!0)return 0.7+z
return 0.5+z},
G:function(a,b){return!a.ga2()&&a.e instanceof K.cb},
v:{
wF:[function(a){return new V.kd("When an opponent misses you like that, it's a rare (though still dangerous) opportunity to bring them down.",!0,!0,!0,C.c,a,null)},"$1","u0",2,0,4]}},ke:{"^":"a:2;a,b",
$0:function(){return this.a.al(this.b,"<subject> go<es> wide",!0)}},kf:{"^":"a:2;a,b",
$0:function(){return this.a.b.al(this.b,"<subject> {evade<s>|sidestep<s>} it",!0)}},kg:{"^":"a:0;",
$1:function(a){a.sah(C.f)
return a}},kh:{"^":"a:0;",
$1:function(a){a.sah(C.f)
return a}},ki:{"^":"a:0;",
$1:function(a){a.sah(C.f)
return a}}}],["","",,S,{"^":"",
c5:function(a,b){var z=new S.dw(null,null,null,null,null)
new S.tx(a,b).$1(z)
return z.p()},
f4:{"^":"ac;",
gaE:function(){return[G.tZ(),G.u_(),V.u0()]},
gbN:function(){return[$.$get$dV()]},
gh:function(){return"CounterAttackSituation"},
ax:function(){var z=new S.dw(null,null,null,null,null)
z.m(this)
new S.kb().$1(z)
return z.p()},
aW:function(a,b){if(a===0)return b.Y(this.a)
return},
b5:function(a,b){return new H.L(a,new S.kc(this),[H.m(a,0)])}},
tx:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a7().ap(1073741823)
a.gb9().c=z
a.gb9().e=0
z=this.a.gi()
a.gb9().b=z
z=this.b.gi()
a.gb9().d=z
return a}},
kb:{"^":"a:0;",
$1:function(a){var z=a.gb9().e
if(typeof z!=="number")return z.ai()
a.gb9().e=z+1
return a}},
kc:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.e(a.gi(),z.a)||J.e(a.gi(),z.c)}},
pV:{"^":"f4;a,i:b<,c,U:d<",
a1:function(a){var z=new S.dw(null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
A:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof S.f4))return!1
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
dw:{"^":"d;a,b,c,d,e",
gi:function(){return this.gb9().c},
gU:function(){return this.gb9().e},
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
z=new S.pV(y,x,w,v)
if(y==null)H.i(P.l("counterAttacker"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("target"))
if(v==null)H.i(P.l("time"))}this.m(z)
return z}}}],["","",,O,{"^":"",c7:{"^":"on;",
gdD:function(){return 1000},
aW:function(a,b){if(a===0)return b.Y(this.gct())
return},
b5:function(a,b){return new H.L(a,new O.kn(this),[H.m(a,0)])}},on:{"^":"ac+ng;"},kn:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.e(a.gi(),z.gcN())||J.e(a.gi(),z.gct())}}}],["","",,U,{"^":"",
bB:function(a){return a.au("FightSituation").gc7()},
cR:function(a,b,c,d,e){var z=new U.ca(null,null,null,null,null,null,null,null,null)
new U.tL(a,b,c,d,e).$1(z)
return z.p()},
cQ:{"^":"ac;",
gaE:function(){return[N.tM(),V.u2(),R.uF(),Y.uQ(),T.w7(),T.w8(),M.w9(),M.wa(),U.wb(),U.wc(),G.wd(),G.we(),D.wh(),D.wi(),R.wf(),R.wg(),A.wj(),A.wk(),O.wl(),O.wm(),E.ws(),M.wt(),D.ww()]},
gbN:function(){return H.p([$.$get$fP(),$.$get$h7(),$.$get$fT(),$.$get$hx()],[Q.af])},
gdD:function(){return 1000},
gh:function(){return"FightSituation"},
cO:function(a,b){var z=b.a
return(z&&C.a).bs(z,new U.ld(a))},
ax:function(){var z=new U.ca(null,null,null,null,null,null,null,null,null)
z.m(this)
new U.le().$1(z)
return z.p()},
aW:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j
z=X.i2(this.f,this.b)
y=H.bI(z,new U.lf(b),H.y(z,"A",0),null)
x=H.y(y,"A",0)
w=P.P(new H.L(y,new U.lg(),[x]),!1,x)
x=H.m(w,0)
v=P.P(new H.L(w,new U.lh(),[x]),!1,x)
u=v.length===1?C.a.gca(v):null
if(a===0)if(u!=null)return u
for(y=w.length,t=0,s=null,r=0;r<w.length;w.length===y||(0,H.ar)(w),++r){q=w[r]
x=b.d
p=x.aR(0,new U.li(q),new U.lj())
o=p==null?p:p.gU()
if(o==null)o=-1
n=b.r
if(typeof o!=="number")return H.x(o)
m=n-o
if(m<=0)continue
l=x.aR(0,new U.lk(q),new U.ll())
k=l==null?l:l.gU()
if(k==null)k=-1
x=b.r
if(typeof k!=="number")return H.x(k)
j=(x-k+m)/2
if(q.gN()===!0)j*=1.5
if(j>t){s=q
t=j}}return s},
b5:function(a,b){return new H.L(a,new U.lm(this),[H.m(a,0)])},
hi:function(a,b){var z,y
z=this.x
y=this.c.a
if(y.ab(z))y.j(0,z).$2(a,b)},
dF:function(a){var z,y,x,w,v,u,t
z=this.r
if(z!=null&&!this.cO(a,this.b)&&this.cO(a,this.f)){y=a.f2(z)
a.c0(y.gi(),y.a1(new U.ln()))
for(z=this.f,x=z.a,x=new J.bk(x,x.length,0,null,[H.m(x,0)]),w=a.a;x.u();){v=x.d
if(a.Y(v).gaS()){u=a.Y(v)
t=u.a1(new U.lo())
w.a3(0,u)
w.q(0,t)}}C.a.q(a.f,X.mu(z,this.d,this.a,null))}else this.cO(a,this.f)},
dd:function(a){var z=this.f
if(this.cO(a,z))if(this.cO(a,this.b)){z=z.a
z=(z&&C.a).bs(z,new U.lp(a))}else z=!1
else z=!1
return z}},
tL:{"^":"a:0;a,b,c,d,e",
$1:function(a){var z,y
z=$.$get$a7().ap(1073741823)
a.gam().f=z
a.gam().y=0
z=a.gam()
y=z.r
if(y==null){y=new S.O(null,null,[P.t])
y.aj()
y.m(C.d)
z.r=y
z=y}else z=y
z.m(J.eQ(this.a,new U.rt()))
z=a.gam()
y=z.c
if(y==null){y=new S.O(null,null,[P.t])
y.aj()
y.m(C.d)
z.c=y
z=y}else z=y
y=this.b
z.m(new H.ap(y,new U.ru(),[H.m(y,0),null]))
a.gam().e=this.c
y=new S.O(null,null,[U.ab])
y.aj()
y.m(C.d)
a.gam().b=y
y=this.d.gi()
a.gam().x=y
y=new A.cW(null,null,[P.t,{func:1,v:true,args:[A.ad,Y.a1]}])
y.ce()
y.m(this.e)
a.gam().d=y
return a}},
rt:{"^":"a:0;",
$1:function(a){return a.gi()}},
ru:{"^":"a:0;",
$1:function(a){return a.gi()}},
ld:{"^":"a:0;a",
$1:function(a){return this.a.Y(a).gaS()}},
le:{"^":"a:0;",
$1:function(a){var z=a.gam().y
if(typeof z!=="number")return z.ai()
a.gam().y=z+1
return a}},
lf:{"^":"a:0;a",
$1:function(a){return this.a.Y(a)}},
lg:{"^":"a:0;",
$1:function(a){return a.gaS()}},
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
lm:{"^":"a:27;a",
$1:function(a){var z,y,x
if(a.gaS()){z=this.a
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
lp:{"^":"a:29;a",
$1:function(a){var z=this.a.Y(a)
return z.gN()===!0&&z.gaS()}},
pX:{"^":"cQ;bk:a<,b,c,c7:d<,i:e<,cZ:f<,r,U:x<",
a1:function(a){var z=new U.ca(null,null,null,null,null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
A:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof U.cQ))return!1
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
gbk:function(){var z,y
z=this.gam()
y=z.b
if(y==null){y=new S.O(null,null,[U.ab])
y.aj()
y.m(C.d)
z.b=y
z=y}else z=y
return z},
gc7:function(){return this.gam().e},
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
gU:function(){return this.gam().y},
gam:function(){var z,y
z=this.a
if(z!=null){z=z.a
if(!(z==null)){y=new S.O(null,null,[H.m(z,0)])
y.aj()
y.m(z)
z=y}this.b=z
z=this.a.b
if(!(z==null)){y=new S.O(null,null,[H.m(z,0)])
y.aj()
y.m(z)
z=y}this.c=z
z=this.a.c
if(!(z==null)){y=new A.cW(null,null,[H.m(z,0),H.m(z,1)])
y.ce()
y.m(z)
z=y}this.d=z
z=this.a
this.e=z.d
this.f=z.e
z=z.f
if(!(z==null)){y=new S.O(null,null,[H.m(z,0)])
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
if(x==null){x=new S.O(null,null,[U.ab])
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
if(v==null){v=new A.cW(null,null,[P.t,{func:1,v:true,args:[A.ad,Y.a1]}])
v.ce()
v.m(C.a2)
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
z=new U.pX(y,x,w,v,u,t,s,r)
if(y==null)H.i(P.l("droppedItems"))
if(x==null)H.i(P.l("enemyTeamIds"))
if(w==null)H.i(P.l("events"))
if(v==null)H.i(P.l("groundMaterial"))
if(u==null)H.i(P.l("id"))
if(t==null)H.i(P.l("playerTeamIds"))
if(s==null)H.i(P.l("roomRoamingSituationId"))
if(r==null)H.i(P.l("time"))}this.m(z)
return z}}}],["","",,N,{"^":"",
bj:function(a,b,c){var z,y
z=b.au("FightSituation")
y=z.gc7()
b.c0(z.gi(),z.a1(new N.uG(c)))
if(c.gah()===C.f){c.aB(a,"<subject> stop<s> moving",!0)
a.t(0,"\n\n",!0)
return}switch($.$get$hU().ap(3)){case 0:c.c1(a,"<subject> collapse<s>, dead",!0,!0)
break
case 1:c.aB(a,"<subject> fall<s> backward",!0)
c.aB(a,"<subject> twist<s>",!0)
c.c1(a,"<subject> hit<s> the "+H.b(y)+" face down",!0,!0)
break
case 2:c.aB(a,"<subject> drop<s> to <subject's> knees",!0)
c.aB(a,"<subject> keel<s> over",!0)
break}a.t(0,"\n\n",!0)},
b4:function(a,b){if(J.e(b.gi(),100)&&b.gag()===0){N.rC(a,b)
return}b.aB(a,"<subject> {scream|yell|grunt}<s> in pain",!0)},
rC:function(a,b){if(b.gah()===C.f){b.aB(a,"<subject> stop<s> moving",!0)
a.t(0,"\n\n",!0)
return}b.aB(a,"<subject> drop<s> to <subject's> knees",!0)
b.aB(a,"<subject> keel<s> over",!0)
a.t(0,"\n\n",!0)},
uG:{"^":"a:0;a",
$1:function(a){var z=this.a
if(!z.gaF())a.gbk().q(0,z.e)
if(z.d!=null)a.gbk().q(0,z.d)
return a}}}],["","",,R,{"^":"",ls:{"^":"z;I:c<,J:d<,a0:e<,O:f<,K:r<,b,a",
gh:function(){return"FinishLeap"},
ga6:function(){return""},
gaf:function(){return"(WARNING should not be user-visible)"},
P:[function(a,b,c){throw H.c(new P.X(null))},"$3","gL",6,0,1],
R:[function(a,b,c){var z,y,x,w
z=this.b
b.X(z.gi(),new R.lt())
b.X(a.gi(),new R.lu())
y=b.au("LeapSituation").gi()
x=U.bB(b)
a.bR(c,"<subject> {ram<s>|smash<es>} into <object>",y,z,!0)
c.jk(0,"both "+(a.gN()===!0||z.gN()===!0?"of you":"")+" {land on|fall to} the "+H.b(x),y)
w=z.gag()
if(typeof w!=="number")return w.bo()
if(w>1){c.jl(0,"the impact almost {knocks <object> unconscious|knocks <object> out}",y,z)
N.b4(c,z)
b.X(z.gi(),new R.lv())}return H.b(a.gh())+" finishes leap at "+H.b(z.gh())},"$3","gM",6,0,1],
H:function(a,b){return 1},
G:function(a,b){return!0},
v:{
wO:[function(a){return new R.ls(null,!0,!0,!0,C.c,a,null)},"$1","ub",2,0,4]}},lt:{"^":"a:0;",
$1:function(a){a.sah(C.f)
return a}},lu:{"^":"a:0;",
$1:function(a){a.sah(C.f)
return a}},lv:{"^":"a:0;",
$1:function(a){var z=a.gag()
if(typeof z!=="number")return z.aq()
a.sag(z-1)
return a}}}],["","",,S,{"^":"",kz:{"^":"z;I:c<,J:d<,a0:e<,O:f<,K:r<,b,a",
ga6:function(){return"dodge"},
gh:function(){return"DodgeLeap"},
gaf:function(){return"will <subject> dodge?"},
P:[function(a,b,c){var z=b.au("LeapSituation").gi()
a.hr(c,"<subject> tr<ies> to {dodge|sidestep}",z,!0)
if(a.gao())a.c2(c,"<subject> <is> out of balance",z,!0,!0)
else S.a5(new S.kA(a,c,z),new S.kB(a,c,z),null,null)
b.aA()
return H.b(a.db)+" fails to dodge "+H.b(this.b.gh())},"$3","gL",6,0,1],
R:[function(a,b,c){var z,y,x
z=b.au("LeapSituation").gi()
y=U.bB(b)
x=this.b
a.bR(c,"<subject> {dodge<s>|sidestep<s>} <object>",z,x,!0)
x.aB(c,"<subject> {crash<es> to|fall<s> to|hit<s>} the "+H.b(y),!0)
b.X(x.gi(),new S.kC())
b.b2("FightSituation")
return H.b(a.gh())+" dodges "+H.b(x.gh())},"$3","gM",6,0,1],
H:function(a,b){var z,y,x
z=a.ga4()?0:0.2
y=this.b.ga2()?0.2:0
if(a.ch===!0)return 0.8-z+y
x=b.f
return(x.length!==0?C.a.gw(x):null).gb3().b1(0.5-z+y)},
G:function(a,b){return!a.ga2()},
v:{
wI:[function(a){return new S.kz("Dodging means moving your body out of harm's way. When successful, your opponent will miss and will hit the ground beside you.",!1,!1,!0,C.c,a,null)},"$1","u3",2,0,4]}},kA:{"^":"a:2;a,b,c",
$0:function(){return this.a.c2(this.b,"<subject> {can't|fail<s>|<does>n't succeed}",this.c,!0,!0)}},kB:{"^":"a:2;a,b,c",
$0:function(){return this.a.c2(this.b,"<subject> {<is> too slow|<is>n't fast enough}",this.c,!0,!0)}},kC:{"^":"a:0;",
$1:function(a){a.sah(C.f)
return a}}}],["","",,D,{"^":"",lO:{"^":"z;I:c<,J:d<,a0:e<,O:f<,K:r<,b,a",
ga6:function(){return"impale"},
gh:function(){return"ImpaleLeaper"},
gaf:function(){return"will <subject> impale <objectPronoun>?"},
P:[function(a,b,c){var z,y
z=b.au("LeapSituation").gi()
y=this.b
a.dK(c,"<subject> tr<ies> to {move|swing|shift} "+H.b(U.a8(a))+" between <subjectPronounSelf> and <object>",z,!0,y)
if(a.gao())a.c2(c,"<subject> <is> out of balance",z,!0,!0)
else S.a5(new D.lP(a,c,z),new D.lQ(a,c,z),null,null)
b.aA()
return H.b(a.db)+" fails to impale "+H.b(y.gh())},"$3","gL",6,0,1],
R:[function(a,b,c){var z,y
z=b.au("LeapSituation").gi()
y=this.b
a.bR(c,"<subject> {move<s>|swing<s>|shift<s>} "+H.b(U.a8(a))+" between <subjectPronounSelf> and <object>",z,y,!0)
y.aB(c,"<subject> {leap<s>|run<s>|lunge<s>} right into it",!0)
b.X(y.gi(),new D.lR())
if(!(!b.Y(y.gi()).gb0()&&y.gi()!==100)){a.gT().ae(c,"<subject> {cut<s> into|pierce<s>|go<es> into} <object's> flesh",y)
y.ad(c,"<subject> fall<s> to the ground")
N.b4(c,y)}else{a.gT().ae(c,"<subject> {go<es> right through|completely impale<s>|bore<s> through} <object's> {body|chest|stomach|neck}",y)
y.aB(c,"<subject> go<es> down",!0)
N.bj(c,b,y)}b.b2("FightSituation")
return H.b(a.gh())+" impales "+H.b(y.gh())},"$3","gM",6,0,1],
H:function(a,b){var z,y,x
z=a.ga4()?0:0.2
y=this.b.ga2()?0.2:0
if(a.ch===!0)return 0.5-z+y
x=b.f
return(x.length!==0?C.a.gw(x):null).gb3().b1(0.4-z+y)},
G:function(a,b){return!a.ga2()&&a.e.geN()},
v:{
wU:[function(a){return new D.lO("You can move your weapon to point at the attacker. If successful, the weapon will pierce the attacker with the force of his own leap.",!1,!1,!0,C.c,a,null)},"$1","ux",2,0,4]}},lP:{"^":"a:2;a,b,c",
$0:function(){return this.a.c2(this.b,"<subject> {can't|fail<s>|<does>n't succeed}",this.c,!0,!0)}},lQ:{"^":"a:2;a,b,c",
$0:function(){return this.a.c2(this.b,"<subject> {<is> too slow|<is>n't fast enough}",this.c,!0,!0)}},lR:{"^":"a:0;",
$1:function(a){var z=a.gag()
if(typeof z!=="number")return z.aq()
a.sag(z-1)
a.sah(C.f)
return a}}}],["","",,V,{"^":"",
dI:function(a,b,c){var z=new V.dH(null,null,null,null,null,null)
new V.tC(a,b,c).$1(z)
return z.p()},
fn:{"^":"c7;",
gaE:function(){return[S.u3(),D.ux()]},
gh:function(){return"LeapDefenseSituation"},
ax:function(){var z=new V.dH(null,null,null,null,null,null)
z.m(this)
new V.mi().$1(z)
return z.p()}},
tC:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$a7().ap(1073741823)
a.gaK().c=z
a.gaK().f=0
z=this.a.gi()
a.gaK().b=z
z=this.b.gi()
a.gaK().e=z
a.gaK().d=this.c
return a}},
mi:{"^":"a:0;",
$1:function(a){var z=a.gaK().f
if(typeof z!=="number")return z.ai()
a.gaK().f=z+1
return a}},
pZ:{"^":"fn;cN:a<,i:b<,cq:c<,ct:d<,U:e<",
a1:function(a){var z=new V.dH(null,null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
A:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof V.fn))return!1
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
dH:{"^":"d;a,b,c,d,e,f",
gi:function(){return this.gaK().c},
gU:function(){return this.gaK().f},
gaK:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.f=z.e
this.a=null}return this},
m:function(a){this.a=a},
p:function(){var z,y,x,w,v,u
z=this.a
if(z==null){y=this.gaK().b
x=this.gaK().c
w=this.gaK().d
v=this.gaK().e
u=this.gaK().f
z=new V.pZ(y,x,w,v,u)
if(y==null)H.i(P.l("attacker"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("predeterminedResult"))
if(v==null)H.i(P.l("target"))
if(u==null)H.i(P.l("time"))}this.m(z)
return z}}}],["","",,F,{"^":"",
fp:function(a,b){var z=new F.dJ(null,null,null,null,null)
new F.tD(a,b).$1(z)
return z.p()},
fo:{"^":"ac;",
gaE:function(){return[R.ub()]},
gh:function(){return"LeapSituation"},
ax:function(){var z=new F.dJ(null,null,null,null,null)
z.m(this)
new F.mj().$1(z)
return z.p()},
aW:function(a,b){if(a===0)return b.Y(this.a)
return},
b5:function(a,b){return new H.L(a,new F.mk(this),[H.m(a,0)])}},
tD:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a7().ap(1073741823)
a.gba().c=z
a.gba().e=0
z=this.a.gi()
a.gba().b=z
z=this.b.gi()
a.gba().d=z
return a}},
mj:{"^":"a:0;",
$1:function(a){var z=a.gba().e
if(typeof z!=="number")return z.ai()
a.gba().e=z+1
return a}},
mk:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.e(a.gi(),z.a)||J.e(a.gi(),z.c)}},
q_:{"^":"fo;a,i:b<,c,U:d<",
a1:function(a){var z=new F.dJ(null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
A:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof F.fo))return!1
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
dJ:{"^":"d;a,b,c,d,e",
gi:function(){return this.gba().c},
gU:function(){return this.gba().e},
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
z=new F.q_(y,x,w,v)
if(y==null)H.i(P.l("attacker"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("target"))
if(v==null)H.i(P.l("time"))}this.m(z)
return z}}}],["","",,Z,{"^":"",jB:{"^":"af;J:b<,a0:c<,O:d<,K:e<,a",
gV:function(){return""},
gI:function(){return},
gh:function(){return"AutoLoot"},
P:[function(a,b,c){throw H.c(new P.X(null))},"$3","gL",6,0,1],
R:[function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=b.au("LootSituation")
y=b.Y(100)
if(y.gck()===!0&&!y.gb0()){a.ae(c,"<subject> kneel<s> next to <object>",y)
a.ae(c,"<subject> help<s> <object> to <object's> feet",y)
y.dJ(c,'"I\'ll live," <subject> say<s>.',!0)
b.X(100,new Z.jO())}x=[]
for(w=z.gbk(),w=w.ga_(w),v=b.a,u=null,t=null;w.u();){s=w.d
r=J.o(s)
if(!!r.$isaR){q=s.gbI()
p=s.gbz()
o=s.gaI()?1:0
n=a.gT().gac()
if(typeof n!=="number")return H.x(n)
n=2+q+p+o>n
q=n}else q=!1
if(q){m=b.Y(a.gi())
l=m.a1(new Z.jP(a,s))
v.a3(0,m)
v.q(0,l)
u=s}else if(!!r.$isbr&&a.gan()==null){m=b.Y(a.gi())
l=m.a1(new Z.jQ(s))
v.a3(0,m)
v.q(0,l)
t=s}else{m=b.Y(a.gi())
l=m.a1(new Z.jR(s))
v.a3(0,m)
v.q(0,l)
x.push(s)}}if(u!=null){a.ae(c,"<subject> pick<s> up <object>",u)
a.ae(c,"<subject> wield<s> <object>",u)}if(t!=null){a.ae(c,"<subject> pick<s> up <object>",t)
a.ae(c,"<subject> wield<s> <object>",t)}this.iC(x,a,z,b,c)
this.iB(x,a,z,b,c)
if(x.length!==0)c.jr("<subject> <also> take<s>",x,null,a)
return H.b(a.gh())+" auto-loots"},"$3","gM",6,0,1],
a9:function(a,b){return"WARNING this shouldn't be user-visible"},
H:function(a,b){return 1},
G:function(a,b){return a.gN()},
iC:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q
z=P.P(new H.L(a,new Z.jI(),[H.m(a,0)]),!0,L.aR)
for(y=b.gaz(),y=y.ga_(y);y.u();){x=y.d
if(x instanceof L.aR)C.a.q(z,x)}if(z.length===0)return
C.a.cb(z,new Z.jJ())
w=c.gcZ().aH(0,new Z.jK(d)).dg(0,new Z.jL())
for(y=J.ai(w.a),v=new H.bT(y,w.b,[H.m(w,0)]),u=d.a;v.u();){t=y.gS()
if(z.length===0)break
s=C.a.hp(z)
r=d.Y(t.gi())
q=r.a1(new Z.jM(s))
u.a3(0,r)
u.q(0,q)
C.a.a3(a,s)
r=d.Y(b.gi())
q=r.a1(new Z.jN(s))
u.a3(0,r)
u.q(0,q)
b.ae(e,"<subject> give<s> the "+H.b(s.gh())+" to <object>",t)}},
iB:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q
z=P.P(new H.L(a,new Z.jC(),[H.m(a,0)]),!0,E.br)
for(y=b.gaz(),y=y.ga_(y);y.u();){x=y.d
if(x instanceof E.br)C.a.q(z,x)}if(z.length===0)return
C.a.cb(z,new Z.jD())
w=c.gcZ().aH(0,new Z.jE(d)).dg(0,new Z.jF())
for(y=J.ai(w.a),v=new H.bT(y,w.b,[H.m(w,0)]),u=d.a;v.u();){t=y.gS()
if(z.length===0)break
s=C.a.hp(z)
r=d.Y(t.gi())
q=r.a1(new Z.jG(s))
u.a3(0,r)
u.q(0,q)
C.a.a3(a,s)
r=d.Y(b.gi())
q=r.a1(new Z.jH(s))
u.a3(0,r)
u.q(0,q)
b.ae(e,"<subject> give<s> the "+H.b(s.gh())+" to <object>",t)}}},jO:{"^":"a:0;",
$1:function(a){a.sah(C.h)
a.sag(1)
return a}},jP:{"^":"a:0;a,b",
$1:function(a){var z=this.a
if(!(z.gT() instanceof K.cb))a.gaz().q(0,z.gT())
a.sT(this.b)}},jQ:{"^":"a:0;a",
$1:function(a){var z=this.a
a.san(z)
return z}},jR:{"^":"a:0;a",
$1:function(a){a.gaz().q(0,this.a)
return a}},jI:{"^":"a:0;",
$1:function(a){return a instanceof L.aR}},jJ:{"^":"a:6;",
$2:function(a,b){return J.bE(a.gac(),b.gac())}},jK:{"^":"a:0;a",
$1:function(a){return this.a.Y(a)}},jL:{"^":"a:0;",
$1:function(a){return a.gaS()&&a.gaF()}},jM:{"^":"a:0;a",
$1:function(a){a.sT(this.a)
return a}},jN:{"^":"a:0;a",
$1:function(a){a.gaz().a3(0,this.a)
return a}},jC:{"^":"a:0;",
$1:function(a){return a instanceof E.br}},jD:{"^":"a:6;",
$2:function(a,b){return J.bE(a.gac(),b.gac())}},jE:{"^":"a:0;a",
$1:function(a){return this.a.Y(a)}},jF:{"^":"a:0;",
$1:function(a){return a.gaS()&&a.gan()==null}},jG:{"^":"a:0;a",
$1:function(a){a.san(this.a)
return a}},jH:{"^":"a:0;a",
$1:function(a){a.gaz().a3(0,this.a)
return a}}}],["","",,X,{"^":"",
mu:function(a,b,c,d){var z=new X.dN(null,null,null,null,null,null)
new X.tt(a,b,c).$1(z)
return z.p()},
fu:{"^":"ac;",
gbN:function(){return H.p([$.$get$eV()],[Q.af])},
gh:function(){return"LootSituation"},
ax:function(){var z=new X.dN(null,null,null,null,null,null)
z.m(this)
new X.mw().$1(z)
return z.p()},
aW:function(a,b){if(typeof a!=="number")return a.bo()
if(a>0)return
return this.fs(b.a)},
b5:function(a,b){return[this.fs(a)]},
dd:function(a){return!0},
fs:function(a){return a.cj(0,new X.mv())}},
tt:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$a7().ap(1073741823)
a.gav().e=z
a.gav().f=0
a.gav().c=this.b
z=new S.O(null,null,[P.t])
z.aj()
z.m(this.a)
a.gav().d=z
z=new S.O(null,null,[U.ab])
z.aj()
z.m(this.c)
a.gav().b=z
return a}},
mw:{"^":"a:0;",
$1:function(a){var z=a.gav().f
if(typeof z!=="number")return z.ai()
a.gav().f=z+1
return a}},
mv:{"^":"a:0;",
$1:function(a){return a.gN()===!0&&a.gaS()}},
q0:{"^":"fu;bk:a<,c7:b<,cZ:c<,i:d<,U:e<",
a1:function(a){var z=new X.dN(null,null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
A:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof X.fu))return!1
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
dN:{"^":"d;a,b,c,d,e,f",
gbk:function(){var z,y
z=this.gav()
y=z.b
if(y==null){y=new S.O(null,null,[U.ab])
y.aj()
y.m(C.d)
z.b=y
z=y}else z=y
return z},
gc7:function(){return this.gav().c},
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
gU:function(){return this.gav().f},
gav:function(){var z,y
z=this.a
if(z!=null){z=z.a
if(!(z==null)){y=new S.O(null,null,[H.m(z,0)])
y.aj()
y.m(z)
z=y}this.b=z
z=this.a
this.c=z.b
z=z.c
if(!(z==null)){y=new S.O(null,null,[H.m(z,0)])
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
if(x==null){x=new S.O(null,null,[U.ab])
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
z=new X.q0(y,x,w,v,u)
if(y==null)H.i(P.l("droppedItems"))
if(x==null)H.i(P.l("groundMaterial"))
if(w==null)H.i(P.l("playerTeamIds"))
if(v==null)H.i(P.l("id"))
if(u==null)H.i(P.l("time"))}this.m(z)
return z}}}],["","",,A,{"^":"",mK:{"^":"z;I:c<,J:d<,a0:e<,O:f<,K:r<,b,a",
ga6:function(){return"stab <object>"},
gh:function(){return"OffBalanceOpportunityThrust"},
gaf:function(){return"will <subject> hit <objectPronoun>?"},
P:[function(a,b,c){var z=this.b
a.ae(c,"<subject> tr<ies> to stab <object>",z)
a.al(c,"<subject> {go<es> wide|fail<s>|miss<es>}",!0)
return H.b(a.gh())+" fails to stab "+H.b(z.gh())},"$3","gL",6,0,1],
R:[function(a,b,c){var z=this.b
b.X(z.gi(),new A.mL(a))
if(!(!b.Y(z.gi()).gb0()&&!J.e(z.gi(),100))){a.bn(c,"<subject> thrust<s> {|"+H.b(U.a8(a))+"} deep into <object's> {shoulder|hip|thigh}",z,!0)
N.b4(c,z)}else{a.bn(c,"<subject> {stab<s>|run<s> "+H.b(U.a8(a))+" through} <object>",z,!0)
N.bj(c,b,z)}return H.b(a.gh())+" stabs "+H.b(z.gh())},"$3","gM",6,0,1],
H:function(a,b){if(a.gN()===!0)return 0.6
return 0.5},
G:function(a,b){return a.ga4()&&this.b.gao()&&a.e.geN()},
v:{
wZ:[function(a){return new A.mK("When an opponent is out of balance they are the most vulnerable.",!0,!0,!0,C.c,a,null)},"$1","uK",2,0,4]}},mL:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gag()
y=this.a.gT().gbz()
if(typeof z!=="number")return z.aq()
a.sag(z-y)
return a}}}],["","",,U,{"^":"",
mG:function(a,b){var z=new U.dQ(null,null,null,null,null)
new U.tG(a,b).$1(z)
return z.p()},
fA:{"^":"ac;",
gaE:function(){return H.p([A.uK()],[{func:1,ret:Q.z,args:[R.I]}])},
gbN:function(){return[$.$get$dV()]},
gh:function(){return"OffBalanceOpportunitySituation"},
ax:function(){var z=new U.dQ(null,null,null,null,null)
z.m(this)
new U.mH().$1(z)
return z.p()},
aW:function(a,b){var z,y,x,w,v
if(typeof a!=="number")return a.bo()
if(a>0)return
z=b.Y(this.a)
y=b.a
x=H.m(y,0)
w=P.P(new H.L(y,new U.mI(this,b,z),[x]),!0,x)
if(w.length===0)return
v=C.a.geH(w)
if(v.ga4()&&z.gao()&&v.e.geN())return v
return},
b5:function(a,b){return new H.L(a,new U.mJ(b,b.Y(this.a)),[H.m(a,0)])}},
tG:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a7().ap(1073741823)
a.gbb().d=z
a.gbb().e=0
z=this.a.gi()
a.gbb().b=z
z=this.b
z=z==null?z:z.gi()
a.gbb().c=z
return a}},
mH:{"^":"a:0;",
$1:function(a){var z=a.gbb().e
if(typeof z!=="number")return z.ai()
a.gbb().e=z+1
return a}},
mI:{"^":"a:27;a,b,c",
$1:function(a){var z,y
if(a.gaS())if(a.eJ(this.c,this.b)){z=a.y
y=this.a.b
y=z==null?y!=null:z!==y
z=y}else z=!1
else z=!1
return z}},
mJ:{"^":"a:0;a,b",
$1:function(a){var z=this.b
return J.e(a,z)||a.eJ(z,this.a)}},
q1:{"^":"fA;a,b,i:c<,U:d<",
a1:function(a){var z=new U.dQ(null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
A:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof U.fA))return!1
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
dQ:{"^":"d;a,b,c,d,e",
gi:function(){return this.gbb().d},
gU:function(){return this.gbb().e},
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
z=new U.q1(y,x,w,v)
if(y==null)H.i(P.l("actorId"))
if(w==null)H.i(P.l("id"))
if(v==null)H.i(P.l("time"))}this.m(z)
return z}}}],["","",,O,{"^":"",lw:{"^":"z;I:c<,J:d<,a0:e<,O:f<,b,a",
ga6:function(){return""},
gh:function(){return"FinishPunch"},
gK:function(){return},
gaf:function(){return"(WARNING should not be user-visible)"},
P:[function(a,b,c){throw H.c(new P.X(null))},"$3","gL",6,0,1],
R:[function(a,b,c){var z,y,x,w
z=this.b
y=z.ga4()?C.h:C.f
x=b.au("PunchSituation").gi()
w=U.bB(b)
b.X(z.y,new O.lx(y))
switch(y){case C.k:throw H.c(new P.w("Enemy's pose should never be 'standing' after a successful punch"))
case C.h:c.fN(0,"<subject> {punch<es> <object> in the {face|nose|eye|jaw}|punch<es> <object's> {face|nose|eye|jaw}}",x,z,!0,a)
z.aB(c,"<subject> {stagger<s>|stumble<s>} off balance",!0)
break
case C.f:c.fN(0,"<subject> send<s> <object> to the "+H.b(w)+" with a {massive punch|well-placed fist} to the {face|nose|eye|jaw}",x,z,!0,a)
break}return H.b(a.gh())+" punches "+H.b(z.db)+" to "+y.k(0)},"$3","gM",6,0,1],
H:function(a,b){return 1},
G:function(a,b){return!0},
v:{
wP:[function(a){return new O.lw(null,!0,!0,!1,a,null)},"$1","uc",2,0,4]}},lx:{"^":"a:0;a",
$1:function(a){a.sah(this.a)
return a}}}],["","",,E,{"^":"",kD:{"^":"z;I:c<,J:d<,a0:e<,O:f<,K:r<,b,a",
ga6:function(){return"dodge"},
gh:function(){return"DodgePunch"},
gaf:function(){return"will <subject> dodge the fist?"},
P:[function(a,b,c){var z=b.au("PunchSituation").gi()
a.hr(c,"<subject> tr<ies> to {dodge|sidestep|move out of the way}",z,!0)
S.a5(new E.kE(a,c,z),new E.kF(this,a,c,z),null,null)
b.aA()
return H.b(a.gh())+" fails to dodge "+H.b(this.b.gh())},"$3","gL",6,0,1],
R:[function(a,b,c){var z=this.b
a.bR(c,"<subject> {dodge<s>|sidestep<s>} <object's> {punch|blow|jab}",b.au("PunchSituation").gi(),z,!0)
b.b2("FightSituation")
if(a.gN()===!0)c.q(0,"this opens an opportunity for a counter attack")
C.a.q(b.f,S.c5(a,z))
return H.b(a.gh())+" dodges punch from "+H.b(z.gh())},"$3","gM",6,0,1],
H:function(a,b){var z,y
z=a.ga4()?0:0.2
if(a.ch===!0)return 0.7-z
y=b.f
return(y.length!==0?C.a.gw(y):null).gb3().b1(0.4-z)},
G:function(a,b){return!0},
v:{
wJ:[function(a){return new E.kD("Dodging means moving your body out of harm's way.",!1,!1,!0,C.c,a,null)},"$1","u4",2,0,4]}},kE:{"^":"a:2;a,b,c",
$0:function(){return this.a.c2(this.b,"<subject> {can't|fail<s>|<does>n't succeed}",this.c,!0,!0)}},kF:{"^":"a:2;a,b,c,d",
$0:function(){return this.a.b.kU(this.c,"<subject> <is> too quick for <object>",this.d,!0,!0,this.b)}}}],["","",,Z,{"^":"",
e0:function(a,b,c){var z=new Z.e_(null,null,null,null,null,null)
new Z.tA(a,b,c).$1(z)
return z.p()},
fK:{"^":"c7;",
gaE:function(){return[E.u4()]},
gh:function(){return"PunchDefenseSituation"},
ax:function(){var z=new Z.e_(null,null,null,null,null,null)
z.m(this)
new Z.nq().$1(z)
return z.p()}},
tA:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$a7().ap(1073741823)
a.gaM().c=z
a.gaM().f=0
z=this.a.gi()
a.gaM().b=z
z=this.b.gi()
a.gaM().e=z
a.gaM().d=this.c
return a}},
nq:{"^":"a:0;",
$1:function(a){var z=a.gaM().f
if(typeof z!=="number")return z.ai()
a.gaM().f=z+1
return a}},
q4:{"^":"fK;cN:a<,i:b<,cq:c<,ct:d<,U:e<",
a1:function(a){var z=new Z.e_(null,null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
A:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof Z.fK))return!1
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
e_:{"^":"d;a,b,c,d,e,f",
gi:function(){return this.gaM().c},
gU:function(){return this.gaM().f},
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
z=new Z.q4(y,x,w,v,u)
if(y==null)H.i(P.l("attacker"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("predeterminedResult"))
if(v==null)H.i(P.l("target"))
if(u==null)H.i(P.l("time"))}this.m(z)
return z}}}],["","",,Q,{"^":"",
fM:function(a,b){var z=new Q.e1(null,null,null,null,null)
new Q.tB(a,b).$1(z)
return z.p()},
fL:{"^":"ac;",
gaE:function(){return[O.uc()]},
gh:function(){return"PunchSituation"},
ax:function(){var z=new Q.e1(null,null,null,null,null)
z.m(this)
new Q.nr().$1(z)
return z.p()},
aW:function(a,b){if(a===0)return b.Y(this.a)
return},
b5:function(a,b){return new H.L(a,new Q.ns(this),[H.m(a,0)])}},
tB:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a7().ap(1073741823)
a.gbc().c=z
a.gbc().e=0
z=this.a.gi()
a.gbc().b=z
z=this.b.gi()
a.gbc().d=z
return a}},
nr:{"^":"a:0;",
$1:function(a){var z=a.gbc().e
if(typeof z!=="number")return z.ai()
a.gbc().e=z+1
return a}},
ns:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.e(a.gi(),z.a)||J.e(a.gi(),z.c)}},
q5:{"^":"fL;a,i:b<,c,U:d<",
a1:function(a){var z=new Q.e1(null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
A:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof Q.fL))return!1
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
e1:{"^":"d;a,b,c,d,e",
gi:function(){return this.gbc().c},
gU:function(){return this.gbc().e},
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
z=new Q.q5(y,x,w,v)
if(y==null)H.i(P.l("attacker"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("target"))
if(v==null)H.i(P.l("time"))}this.m(z)
return z}}}],["","",,O,{"^":"",ly:{"^":"z;I:c<,J:d<,a0:e<,O:f<,K:r<,b,a",
gh:function(){return"FinishSlash"},
ga6:function(){return""},
gaf:function(){return"(WARNING should not be user-visible)"},
P:[function(a,b,c){throw H.c(new P.X(null))},"$3","gL",6,0,1],
R:[function(a,b,c){var z,y,x,w
z=this.b
b.X(z.gi(),new O.lB(a))
y=b.au("SlashSituation").gi()
x=!b.Y(z.gi()).gb0()&&!J.e(z.gi(),100)
if(!x){a.bR(c,"<subject> {slash<es>|cut<s>} <object's> {shoulder|abdomen|thigh}",y,z,!0)
N.b4(c,z)}else{a.bR(c,"<subject> {slash<es>|cut<s>} {across|through} <object's> {neck|abdomen|lower body}",y,z,!0)
N.bj(c,b,z)}w=H.b(a.gh())+" slashes"
return w+(x?" (and kills)":"")+" "+H.b(z.gh())},"$3","gM",6,0,1],
H:function(a,b){return 1},
G:function(a,b){return a.gT().gaT()},
v:{
wR:[function(a){return new O.ly(null,!0,!0,!0,C.c,a,null)},"$1","ud",2,0,4]}},lB:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gag()
y=this.a.gT().gbI()
if(typeof z!=="number")return z.aq()
a.sag(z-y)
return a}}}],["","",,V,{"^":"",lC:{"^":"z;I:c<,J:d<,a0:e<,O:f<,K:r<,b,a",
ga6:function(){return""},
gh:function(){return"FinishThrustSpear"},
gaf:function(){return"(WARNING should not be user-visible)"},
P:[function(a,b,c){throw H.c(new P.X(null))},"$3","gL",6,0,1],
R:[function(a,b,c){var z,y,x,w
z=this.b
b.X(z.gi(),new V.lF(a))
y=b.au("SlashSituation").gi()
x=!b.Y(z.gi()).gb0()&&!J.e(z.gi(),100)
if(!x){a.bR(c,"<subject> {pierce<s>|stab<s>|bore<s> through} <object's> {shoulder|abdomen|thigh}",y,z,!0)
N.b4(c,z)}else{a.bR(c,"<subject> {pierce<s>|stab<s>|bore<s> through|impale<s>} <object's> {neck|chest|heart}",y,z,!0)
N.bj(c,b,z)}w=H.b(a.gh())+" pierces"
return w+(x?" (and kills)":"")+" "+H.b(z.gh())},"$3","gM",6,0,1],
H:function(a,b){return 1},
G:function(a,b){return a.gT() instanceof Z.at},
v:{
wT:[function(a){return new V.lC(null,!0,!0,!0,C.c,a,null)},"$1","uf",2,0,4]}},lF:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gag()
y=this.a.gT().gbz()
if(typeof z!=="number")return z.aq()
a.sag(z-y)
return a}}}],["","",,X,{"^":"",ko:{"^":"z;I:c<,J:d<,a0:e<,O:f<,K:r<,b,a",
ga6:function(){return"step back and parry"},
gh:function(){return"DefensiveParrySlash"},
gaf:function(){return"will <subject> parry it?"},
P:[function(a,b,c){a.ad(c,"<subject> tr<ies> to {parry|deflect it|meet it with "+H.b(U.a8(a))+"|fend it off}")
if(a.gao())a.al(c,"<subject> <is> out of balance",!0)
else S.a5(new X.kp(a,c),new X.kq(this,a,c),null,null)
b.aA()
return H.b(a.db)+" fails to parry "+H.b(this.b.gh())},"$3","gL",6,0,1],
R:[function(a,b,c){if(a.gN()===!0)a.ad(c,"<subject> {step<s>|take<s> a step} back")
a.bm(c,"<subject> {parr<ies> it|deflect<s> it|meet<s> it with "+H.b(U.a8(a))+"|fend<s> it off}",!0)
if(!a.ga4()){b.X(a.y,new X.kr())
if(a.ch===!0)a.ad(c,"<subject> regain<s> balance")}b.b2("FightSituation")
return H.b(a.db)+" steps back and parries "+H.b(this.b.gh())},"$3","gM",6,0,1],
H:function(a,b){var z,y,x
if(a.gN()===!0)return 1
z=b.f
y=z.length!==0?C.a.gw(z):null
x=a.ga4()?0:0.2
return y.gb3().b1(0.5-x)},
G:function(a,b){return a.gT().gcg()},
v:{
wG:[function(a){return new X.ko("Stepping back is the safest way to get out of harm's way.",!1,!1,!0,C.c,a,null)},"$1","u1",2,0,4]}},kp:{"^":"a:2;a,b",
$0:function(){return this.a.al(this.b,"<subject> {fail<s>|<does>n't succeed}",!0)}},kq:{"^":"a:2;a,b,c",
$0:function(){return this.a.b.bQ(this.c,"<subject> <is> too quick for <object>",!0,this.b)}},kr:{"^":"a:0;",
$1:function(a){a.sah(C.k)
return a}}}],["","",,F,{"^":"",kG:{"^":"z;I:c<,J:d<,a0:e<,O:f<,K:r<,b,a",
gh:function(){return"DodgeSlash"},
ga6:function(){return"dodge and counter"},
gaf:function(){return"will <subject> dodge?"},
P:[function(a,b,c){a.ad(c,"<subject> tr<ies> to {dodge|sidestep}")
if(a.gao())a.al(c,"<subject> <is> out of balance",!0)
else S.a5(new F.kH(a,c),new F.kI(this,a,c),null,null)
b.aA()
return H.b(a.db)+" fails to dodge "+H.b(this.b.gh())},"$3","gL",6,0,1],
R:[function(a,b,c){var z=this.b
a.bn(c,"<subject> {dodge<s>|sidestep<s>} it",z,!0)
if(z.ga4()){z.c1(c,"<subject> lose<s> balance because of that",!0,!0)
b.X(z.y,new F.kJ())}b.b2("FightSituation")
if(a.gN()===!0)c.q(0,"this opens an opportunity for a counter attack")
C.a.q(b.f,S.c5(a,z))
return H.b(a.gh())+" dodges "+H.b(z.db)},"$3","gM",6,0,1],
H:function(a,b){var z,y
z=a.ga4()?0:0.2
if(a.ch===!0)return 0.7-z
y=b.f
return(y.length!==0?C.a.gw(y):null).gb3().b1(0.4-z)},
G:function(a,b){return!a.ga2()&&this.b.gT().gaT()},
v:{
wK:[function(a){return new F.kG("Dodging means moving your body out of harm's way. When done correctly, it will throw your opponent off balance and it will open an opportunity for a counter attack. When botched, it can get you killed.",!1,!1,!0,C.c,a,null)},"$1","u5",2,0,4]}},kH:{"^":"a:2;a,b",
$0:function(){return this.a.al(this.b,"<subject> {can't|fail<s>|<does>n't succeed}",!0)}},kI:{"^":"a:2;a,b,c",
$0:function(){return this.a.b.bQ(this.c,"<subject> <is> too quick for <object>",!0,this.b)}},kJ:{"^":"a:0;",
$1:function(a){a.sah(C.h)
return C.h}}}],["","",,M,{"^":"",kK:{"^":"z;I:c<,J:d<,a0:e<,O:f<,K:r<,b,a",
ga6:function(){return"dodge and counter"},
gh:function(){return"DodgeThrustSpear"},
gaf:function(){return"will <subject> dodge?"},
P:[function(a,b,c){a.ad(c,"<subject> tr<ies> to {dodge|sidestep}")
if(a.gao())a.al(c,"<subject> <is> out of balance",!0)
else S.a5(new M.kL(a,c),new M.kM(this,a,c),null,null)
b.aA()
return H.b(a.db)+" fails to dodge "+H.b(this.b.gh())+"'s spear"},"$3","gL",6,0,1],
R:[function(a,b,c){var z=this.b
a.bn(c,"<subject> {dodge<s>|sidestep<s>} it",z,!0)
if(z.ga4()){z.c1(c,"<subject> lose<s> balance because of that",!0,!0)
b.X(z.y,new M.kN())}b.b2("FightSituation")
if(a.gN()===!0)c.q(0,"this opens an opportunity for a counter attack")
C.a.q(b.f,S.c5(a,z))
return H.b(a.gh())+" dodges "+H.b(z.db)+"'s spear"},"$3","gM",6,0,1],
H:function(a,b){var z,y
z=a.ga4()?0:0.2
if(a.ch===!0)return 0.7-z
y=b.f
return(y.length!==0?C.a.gw(y):null).gb3().b1(0.4-z)},
G:function(a,b){return!a.ga2()&&this.b.gT() instanceof Z.at},
v:{
wL:[function(a){return new M.kK("Dodging means moving your body out of harm's way. When done correctly, it will throw your opponent off balance and it will open an opportunity for a counter attack. When botched, it can get you killed.",!1,!1,!0,C.c,a,null)},"$1","u6",2,0,4]}},kL:{"^":"a:2;a,b",
$0:function(){return this.a.al(this.b,"<subject> {can't|fail<s>|<does>n't succeed}",!0)}},kM:{"^":"a:2;a,b,c",
$0:function(){return this.a.b.bQ(this.c,"<subject> <is> too quick for <object>",!0,this.b)}},kN:{"^":"a:0;",
$1:function(a){a.sah(C.h)
return C.h}}}],["","",,O,{"^":"",ma:{"^":"z;I:c<,J:d<,a0:e<,O:f<,K:r<,b,a",
ga6:function(){return"jump back"},
gh:function(){return"JumpBackFromSlash"},
gaf:function(){return"will <subject> avoid the slash?"},
P:[function(a,b,c){a.dJ(c,"<subject> {jump<s>|leap<s>} {back|backward} but <subject> <is> {not fast enough|too slow}.",!0)
b.aA()
return H.b(a.gh())+" fails to jump back from "+H.b(this.b.gh())},"$3","gL",6,0,1],
R:[function(a,b,c){var z
a.bm(c,"<subject> {leap<s>|jump<s>} {back|backwards|out of reach}",!0)
z=this.b
c.cf(0,"<owner's> <subject> {slash<es>|cut<s>} empty air",z,z.gT())
b.b2("FightSituation")
return H.b(a.gh())+" jumps back from "+H.b(z.gh())+"'s attack"},"$3","gM",6,0,1],
H:function(a,b){var z,y,x
if(a.gN()===!0)return 1
z=b.f
y=z.length!==0?C.a.gw(z):null
x=a.ga4()?0:0.2
return y.gb3().b1(0.5-x)},
G:function(a,b){return a.gaF()&&this.b.gT().gaT()},
v:{
wX:[function(a){return new O.ma("Jump back and the weapon can't reach you.",!1,!1,!0,C.c,a,null)},"$1","uE",2,0,4]}}}],["","",,G,{"^":"",mX:{"^":"z;I:c<,J:d<,a0:e<,O:f<,K:r<,b,a",
gh:function(){return"ParrySlash"},
ga6:function(){return"parry and counter"},
gaf:function(){return"will <subject> parry?"},
P:[function(a,b,c){a.ad(c,"<subject> tr<ies> to {parry|deflect it|meet it with "+H.b(U.a8(a))+"|fend it off}")
if(a.gao())a.al(c,"<subject> <is> out of balance",!0)
else S.a5(new G.mY(a,c),new G.mZ(this,a,c),null,null)
b.aA()
return H.b(a.db)+" fails to parry "+H.b(this.b.gh())},"$3","gL",6,0,1],
R:[function(a,b,c){var z=this.b
if(z.gao()){c.ex(0,"<subject> <is> out of balance",!0,!0,z)
c.cf(0,"so <ownerPronoun's> <subject> is {weak|feeble}",z,$.$get$iL())
a.bm(c,"<subject> {parr<ies> it easily|easily meet<s> it with "+H.b(U.a8(a))+"|fend<s> it off easily}",!0)}else a.bm(c,"<subject> {parr<ies> it|meet<s> it with "+H.b(U.a8(a))+"|fend<s> it off}",!0)
b.b2("FightSituation")
if(a.gN()===!0)c.q(0,"this opens an opportunity for a counter attack")
C.a.q(b.f,S.c5(a,z))
return H.b(a.gh())+" parries "+H.b(z.db)},"$3","gM",6,0,1],
H:function(a,b){var z,y,x
z=a.ga4()?0:0.2
y=this.b.gao()?0.3:0
if(a.ch===!0)return 0.6-z+y
x=b.f
return(x.length!==0?C.a.gw(x):null).gb3().b1(0.3-z+y)},
G:function(a,b){return a.gT().gcg()},
v:{
x1:[function(a){return new G.mX("Parrying means deflecting your opponent's move with your weapon. When successful, it will give you an opportunity for a counter attack. It won't throw your opponent off balance like dodging does, but it's also slightly easier to do.",!1,!1,!0,C.c,a,null)},"$1","uN",2,0,4]}},mY:{"^":"a:2;a,b",
$0:function(){return this.a.al(this.b,"<subject> {fail<s>|<does>n't succeed}",!0)}},mZ:{"^":"a:2;a,b,c",
$0:function(){return this.a.b.bQ(this.c,"<subject> <is> too quick for <object>",!0,this.b)}}}],["","",,E,{"^":"",oj:{"^":"z;I:c<,J:d<,a0:e<,O:f<,K:r<,b,a",
ga6:function(){return"block with shield and counter"},
gh:function(){return"ShieldBlockSlash"},
gaf:function(){return"will <subject> block the slash?"},
P:[function(a,b,c){a.ad(c,"<subject> tr<ies> to {block|stop|deflect} the {swing|attack|strike} with "+H.b(U.c0(a)))
if(a.gao())a.al(c,"<subject> <is> out of balance",!0)
else S.a5(new E.ok(a,c),new E.ol(a,c),new E.om(this,a,c),null)
b.aA()
return H.b(a.db)+" fails to block "+H.b(this.b.gh())+" with shield"},"$3","gL",6,0,1],
R:[function(a,b,c){var z=this.b
if(z.gao()){c.ex(0,"<subject> <is> out of balance",!0,!0,z)
c.cf(0,"so <ownerPronoun's> <subject> is {weak|feeble}",z,$.$get$iK())
a.bm(c,"<subject> easily {block|stop|deflect} the {swing|attack|strike} with "+H.b(U.c0(a)),!0)}else a.bm(c,"<subject> {block|stop|deflect} the {swing|attack|strike} with "+H.b(U.c0(a)),!0)
b.b2("FightSituation")
if(a.gN()===!0)c.q(0,"this opens an opportunity for a counter attack")
C.a.q(b.f,S.c5(a,z))
return H.b(a.gh())+" blocks "+H.b(z.db)+" with a shield"},"$3","gM",6,0,1],
H:function(a,b){var z,y,x
z=a.ga4()?0:0.2
y=this.b.gao()?0.2:0
if(a.ch===!0)return 0.8-z+y
x=b.f
return(x.length!==0?C.a.gw(x):null).gb3().b1(0.5-z+y)},
G:function(a,b){return a.gan()!=null},
v:{
x8:[function(a){return new E.oj("A shield blocks enemy attacks with the least amount of energy and movement. It is easy and quick to launch a counter-attack when the enemy's weapon is stopped in this way.",!1,!1,!0,C.c,a,null)},"$1","v2",2,0,4]}},ok:{"^":"a:2;a,b",
$0:function(){return this.a.al(this.b,"<subject> {fail<s>|<does>n't succeed}",!0)}},ol:{"^":"a:2;a,b",
$0:function(){return this.a.al(this.b,"<subject> <is> too slow",!0)}},om:{"^":"a:2;a,b,c",
$0:function(){return this.a.b.bQ(this.c,"<subject> <is> too quick for <object>",!0,this.b)}}}],["","",,L,{"^":"",
aP:function(a,b,c){var z=new L.e6(null,null,null,null,null,null)
new L.tw(a,b,c).$1(z)
return z.p()},
fY:{"^":"c7;",
gaE:function(){return[X.u1(),F.u5(),M.u6(),O.uE(),G.uN(),E.v2()]},
gh:function(){return"SlashDefenseSituation"},
ax:function(){var z=new L.e6(null,null,null,null,null,null)
z.m(this)
new L.oq().$1(z)
return z.p()}},
tw:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$a7().ap(1073741823)
a.gaN().c=z
a.gaN().f=0
z=this.a.gi()
a.gaN().b=z
z=this.b.gi()
a.gaN().e=z
a.gaN().d=this.c
return a}},
oq:{"^":"a:0;",
$1:function(a){var z=a.gaN().f
if(typeof z!=="number")return z.ai()
a.gaN().f=z+1
return a}},
q7:{"^":"fY;cN:a<,i:b<,cq:c<,ct:d<,U:e<",
a1:function(a){var z=new L.e6(null,null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
A:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof L.fY))return!1
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
e6:{"^":"d;a,b,c,d,e,f",
gi:function(){return this.gaN().c},
gU:function(){return this.gaN().f},
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
z=new L.q7(y,x,w,v,u)
if(y==null)H.i(P.l("attacker"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("predeterminedResult"))
if(v==null)H.i(P.l("target"))
if(u==null)H.i(P.l("time"))}this.m(z)
return z}}}],["","",,M,{"^":"",
bc:function(a,b){var z=new M.e7(null,null,null,null,null)
new M.tz(a,b).$1(z)
return z.p()},
fZ:{"^":"ac;",
gaE:function(){return[O.ud(),V.uf()]},
gh:function(){return"SlashSituation"},
ax:function(){var z=new M.e7(null,null,null,null,null)
z.m(this)
new M.or().$1(z)
return z.p()},
aW:function(a,b){if(a===0)return b.Y(this.a)
return},
b5:function(a,b){return new H.L(a,new M.os(this),[H.m(a,0)])}},
tz:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a7().ap(1073741823)
a.gbd().c=z
a.gbd().e=0
z=this.a.gi()
a.gbd().b=z
z=this.b.gi()
a.gbd().d=z
return a}},
or:{"^":"a:0;",
$1:function(a){var z=a.gbd().e
if(typeof z!=="number")return z.ai()
a.gbd().e=z+1
return a}},
os:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.e(a.gi(),z.a)||J.e(a.gi(),z.c)}},
q8:{"^":"fZ;a,i:b<,c,U:d<",
a1:function(a){var z=new M.e7(null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
A:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof M.fZ))return!1
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
e7:{"^":"d;a,b,c,d,e",
gi:function(){return this.gbd().c},
gU:function(){return this.gbd().e},
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
z=new M.q8(y,x,w,v)
if(y==null)H.i(P.l("attacker"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("target"))
if(v==null)H.i(P.l("time"))}this.m(z)
return z}}}],["","",,Q,{"^":"",lz:{"^":"z;I:c<,J:d<,a0:e<,O:f<,K:r<,b,a",
gh:function(){return"FinishSlashGroundedEnemy"},
ga6:function(){return""},
gaf:function(){return"(WARNING should not be user-visible)"},
P:[function(a,b,c){throw H.c(new P.X(null))},"$3","gL",6,0,1],
R:[function(a,b,c){var z,y
z=this.b
b.X(z.gi(),new Q.lA())
y=J.e(z.gi(),100)
c.ew(0,"<subject> {cut<s>|slash<es>|slit<s>} <object's> "+(y?"side":"{throat|neck|side}"),z,a.gT())
if(y)N.b4(c,z)
else N.bj(c,b,z)
return H.b(a.gh())+" slains "+H.b(z.gh())+" on the ground"},"$3","gM",6,0,1],
H:function(a,b){return 1},
G:function(a,b){return this.b.ga2()&&a.gT().gaT()},
v:{
wQ:[function(a){return new Q.lz(null,!0,!0,!0,C.c,a,null)},"$1","ue",2,0,4]}},lA:{"^":"a:0;",
$1:function(a){a.sag(0)
return a}}}],["","",,V,{"^":"",lD:{"^":"z;I:c<,J:d<,a0:e<,O:f<,K:r<,b,a",
ga6:function(){return""},
gh:function(){return"FinishThrustSpearAtGroundedEnemy"},
gaf:function(){return"(WARNING should not be user-visible)"},
P:[function(a,b,c){throw H.c(new P.X(null))},"$3","gL",6,0,1],
R:[function(a,b,c){var z,y
z=this.b
b.X(z.gi(),new V.lE())
y=J.e(z.gi(),100)
c.ew(0,"<subject> {impale<s>|bore<s> through|pierce<s>} <object's> "+(y?"side":"{throat|neck|heart}"),z,a.gT())
if(y)N.b4(c,z)
else N.bj(c,b,z)
return H.b(a.gh())+" slains "+H.b(z.gh())+" on the ground with a spear"},"$3","gM",6,0,1],
H:function(a,b){return 1},
G:function(a,b){return this.b.ga2()&&a.gT() instanceof Z.at},
v:{
wS:[function(a){return new V.lD(null,!0,!0,!0,C.c,a,null)},"$1","ug",2,0,4]}},lE:{"^":"a:0;",
$1:function(a){a.sag(0)
return a}}}],["","",,K,{"^":"",mN:{"^":"z;J:c<,a0:d<,O:e<,K:f<,I:r<,b,a",
gh:function(){return"OnGroundParry"},
ga6:function(){return"parry it"},
gaf:function(){return"will <subject> parry it?"},
P:[function(a,b,c){a.ad(c,"<subject> tr<ies> to {parry|deflect it|stop it{| with "+H.b(U.a8(a))+"}}")
S.a5(new K.mO(a,c),new K.mP(this,a,c),null,null)
b.aA()
return H.b(a.gh())+" fails to parry "+H.b(this.b.gh())},"$3","gL",6,0,1],
R:[function(a,b,c){a.bm(c,"<subject> {parr<ies> it|stop<s> it with "+H.b(U.a8(a))+"}",!0)
b.b2("FightSituation")
return H.b(a.gh())+" parries "+H.b(this.b.gh())},"$3","gM",6,0,1],
H:function(a,b){var z
if(a.gN()===!0)return 0.6
z=b.f
return(z.length!==0?C.a.gw(z):null).gb3().b1(0.3)},
G:function(a,b){return this.b.gT().gaT()&&a.gT().gcg()},
v:{
x_:[function(a){return new K.mN(!1,!1,!0,C.c,"TODO",a,null)},"$1","uL",2,0,4]}},mO:{"^":"a:2;a,b",
$0:function(){return this.a.al(this.b,"<subject> {fail<s>|<does>n't succeed}",!0)}},mP:{"^":"a:2;a,b,c",
$0:function(){return this.a.b.bQ(this.c,"<subject> <is> too quick for <object>",!0,this.b)}}}],["","",,L,{"^":"",mQ:{"^":"z;I:c<,J:d<,a0:e<,O:f<,K:r<,b,a",
ga6:function(){return"block with shield"},
gh:function(){return"OnGroundShieldBlock"},
gaf:function(){return"will <subject> block the strike?"},
P:[function(a,b,c){a.ad(c,"<subject> tr<ies> to {block|stop|deflect} the {swing|attack|strike} with "+H.b(U.c0(a)))
S.a5(new L.mR(a,c),new L.mS(a,c),new L.mT(this,a,c),null)
b.aA()
return H.b(a.gh())+" fails to block "+H.b(this.b.gh())+" with shield on ground"},"$3","gL",6,0,1],
R:[function(a,b,c){var z=this.b
if(z.gao()){c.ex(0,"<subject> <is> out of balance",!0,!0,z)
c.cf(0,"so <ownerPronoun's> <subject> is {weak|feeble}",z,$.$get$iJ())
a.bm(c,"<subject> easily {block|stop|deflect} the {swing|attack|strike} with "+H.b(U.c0(a)),!0)}else a.bm(c,"<subject> {block|stop|deflect} the {swing|attack|strike} with "+H.b(U.c0(a)),!0)
b.b2("FightSituation")
return H.b(a.gh())+" blocks "+H.b(z.db)+" with a shield on ground"},"$3","gM",6,0,1],
H:function(a,b){var z
if(a.gN()===!0)return 0.8
z=b.f
return(z.length!==0?C.a.gw(z):null).gb3().b1(0.5)},
G:function(a,b){return a.gan()!=null},
v:{
x0:[function(a){return new L.mQ("A shield blocks enemy attacks with the least amount of energy and movement.",!1,!1,!0,C.c,a,null)},"$1","uM",2,0,4]}},mR:{"^":"a:2;a,b",
$0:function(){return this.a.al(this.b,"<subject> {fail<s>|<does>n't succeed}",!0)}},mS:{"^":"a:2;a,b",
$0:function(){return this.a.al(this.b,"<subject> <is> too slow",!0)}},mT:{"^":"a:2;a,b,c",
$0:function(){return this.a.b.bQ(this.c,"<subject> <is> too quick for <object>",!0,this.b)}}}],["","",,Y,{"^":"",nE:{"^":"z;I:c<,J:d<,a0:e<,O:f<,K:r<,b,a",
gh:function(){return"RollOutOfWay"},
ga6:function(){return"roll out of way"},
gaf:function(){return"will <subject> evade?"},
P:[function(a,b,c){a.ad(c,"<subject> tr<ies> to roll out of the way")
a.al(c,"<subject> can't",!0)
b.aA()
return H.b(a.gh())+" fails to roll out of the way"},"$3","gL",6,0,1],
R:[function(a,b,c){a.eU(c,"<subject> <is> able to roll out of the way",!0,!0)
if(a.gN()===!0){b.X(a.gi(),new Y.nF())
a.bm(c,"<subject> jump<s> up on <subject's> feet",!0)}b.b2("FightSituation")
return H.b(a.gh())+" rolls out of the way of "+H.b(this.b.gh())+"'s strike"},"$3","gM",6,0,1],
H:function(a,b){var z
if(a.gN()===!0)return 1
z=b.f
return(z.length!==0?C.a.gw(z):null).gb3().b1(0.5)},
G:function(a,b){return!0},
v:{
x7:[function(a){return new Y.nE(null,!1,!1,!0,C.c,a,null)},"$1","uY",2,0,4]}},nF:{"^":"a:0;",
$1:function(a){a.sah(C.k)
return a}}}],["","",,V,{"^":"",
bJ:function(a,b,c){var z=new V.dR(null,null,null,null,null,null)
new V.tu(a,b,c).$1(z)
return z.p()},
fB:{"^":"c7;",
gaE:function(){return[K.uL(),L.uM(),Y.uY()]},
gh:function(){return"OnGroundDefenseSituation"},
ax:function(){var z=new V.dR(null,null,null,null,null,null)
z.m(this)
new V.mM().$1(z)
return z.p()}},
tu:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$a7().ap(1073741823)
a.gaL().c=z
a.gaL().f=0
z=this.a.gi()
a.gaL().b=z
z=this.b.gi()
a.gaL().e=z
a.gaL().d=this.c
return a}},
mM:{"^":"a:0;",
$1:function(a){var z=a.gaL().f
if(typeof z!=="number")return z.ai()
a.gaL().f=z+1
return a}},
q2:{"^":"fB;cN:a<,i:b<,cq:c<,ct:d<,U:e<",
a1:function(a){var z=new V.dR(null,null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
A:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof V.fB))return!1
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
dR:{"^":"d;a,b,c,d,e,f",
gi:function(){return this.gaL().c},
gU:function(){return this.gaL().f},
gaL:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.f=z.e
this.a=null}return this},
m:function(a){this.a=a},
p:function(){var z,y,x,w,v,u
z=this.a
if(z==null){y=this.gaL().b
x=this.gaL().c
w=this.gaL().d
v=this.gaL().e
u=this.gaL().f
z=new V.q2(y,x,w,v,u)
if(y==null)H.i(P.l("attacker"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("predeterminedResult"))
if(v==null)H.i(P.l("target"))
if(u==null)H.i(P.l("time"))}this.m(z)
return z}}}],["","",,D,{"^":"",
d5:function(a,b){var z=new D.e8(null,null,null,null,null)
new D.tv(a,b).$1(z)
return z.p()},
h9:{"^":"ac;",
gaE:function(){return[Q.ue(),V.ug()]},
gh:function(){return"StrikeDownSituation"},
ax:function(){var z=new D.e8(null,null,null,null,null)
z.m(this)
new D.p9().$1(z)
return z.p()},
aW:function(a,b){if(a===0)return b.Y(this.a)
return},
b5:function(a,b){return new H.L(a,new D.pa(this),[H.m(a,0)])}},
tv:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a7().ap(1073741823)
a.gbe().c=z
a.gbe().e=0
z=this.a.gi()
a.gbe().b=z
z=this.b.gi()
a.gbe().d=z
return a}},
p9:{"^":"a:0;",
$1:function(a){var z=a.gbe().e
if(typeof z!=="number")return z.ai()
a.gbe().e=z+1
return a}},
pa:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.e(a.gi(),z.a)||J.e(a.gi(),z.c)}},
q9:{"^":"h9;a,i:b<,c,U:d<",
a1:function(a){var z=new D.e8(null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
A:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof D.h9))return!1
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
e8:{"^":"d;a,b,c,d,e",
gi:function(){return this.gbe().c},
gU:function(){return this.gbe().e},
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
z=new D.q9(y,x,w,v)
if(y==null)H.i(P.l("attacker"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("targetOnGround"))
if(v==null)H.i(P.l("time"))}this.m(z)
return z}}}],["","",,O,{"^":"",ng:{"^":"d;",
gb3:function(){switch(this.gcq()){case C.l:return C.a3
case C.m:return $.$get$fF()
case C.p:return $.$get$fG()
default:throw H.c(P.F(this.gcq()))}},
$isac:1}}],["","",,K,{"^":"",dY:{"^":"d;a,b",
k:function(a){return this.b}}}],["","",,D,{"^":"",ov:{"^":"af;J:b<,O:c<,a0:d<,K:e<,a",
gV:function(){return""},
gI:function(){return},
gh:function(){return"SlayMonstersAction"},
P:[function(a,b,c){throw H.c(new P.X(null))},"$3","gL",6,0,1],
R:[function(a,b,c){var z,y,x,w
z=b.f
y=z.length!==0?C.a.gw(z):null
x=b.dV(y.gbE())
w=b.a
C.a.q(z,x.jU(b,y,new H.L(w,new D.ow(a,x),[H.m(w,0)])))
return H.b(a.gh())+" initiated combat with monsters in "+x.k(0)},"$3","gM",6,0,1],
a9:function(a,b){return"WARNING should not be user-visible"},
H:function(a,b){return 1},
G:function(a,b){var z=b.f
return H.E(z.length!==0?C.a.gw(z):null,"$isJ").c}},ow:{"^":"a:0;a,b",
$1:function(a){var z,y
if(a.gaS())if(a.gb4().hb(this.a.gb4())){z=a.gbE()
y=this.b.gh()
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1
return z}}}],["","",,Y,{"^":"",pk:{"^":"c9;J:c<,a0:d<,O:e<,K:f<,b,a",
gI:function(){return},
gh:function(){return"TakeExitAction"},
P:[function(a,b,c){throw H.c(new P.X(null))},"$3","gL",6,0,1],
R:[function(a,b,c){var z,y
z=this.b
c.q(0,z.gaQ())
y=b.f
H.E(y.length!==0?C.a.gw(y):null,"$isJ").dE(b,a,z.gfY(),c)
return H.b(a.gh())+" went through exit to "+z.a},"$3","gM",6,0,1],
a9:function(a,b){return"WARNING should not be user-visible"},
H:function(a,b){return 1},
G:function(a,b){var z=b.f
if(H.E(z.length!==0?C.a.gw(z):null,"$isJ").c===!0)return!1
this.b.gkl()
return!0},
v:{
xc:[function(a){return new Y.pk(!1,!0,!1,null,a,null)},"$1","wu",2,0,48]}}}],["","",,F,{"^":"",
fQ:function(a,b){var z=new F.e4(null,null,null,null,null)
new F.tj(a,b).$1(z)
return z.p()},
J:{"^":"ac;",
gaE:function(){return[Y.wu()]},
gbN:function(){var z=[]
C.a.aw(z,$.$get$i0())
z.push($.$get$h1())
return z},
gdD:function(){return 1000},
gh:function(){return"RoomRoamingSituation"},
ax:function(){var z=new F.e4(null,null,null,null,null)
z.m(this)
new F.nG().$1(z)
return z.p()},
aW:function(a,b){return b.a.aR(0,new F.nH(),new F.nI())},
b5:function(a,b){var z=this.aW(null,b)
if(z==null)return[]
return[z]},
dE:function(a,b,c,d){var z,y,x,w,v,u,t
z=a.dV(c)
a.c0(this.b,F.fQ(z,!a.hM("TakeExitAction",b,!0).bs(0,new F.nJ(c))&&z.gjT()!=null))
if(this.im(a,b,z))z.hZ(b,a,d)
else{d.t(0,"\n\n",!0)
z.jI(b,a,d)
d.t(0,"\n\n",!0)}for(y=R.il(b,a),y=P.P(y,!0,H.y(y,"A",0)),x=y.length,w=a.a,v=0;v<y.length;y.length===x||(0,H.ar)(y),++v){u=a.Y(y[v].gi())
t=u.a1(new F.nK(z))
w.a3(0,u)
w.q(0,t)}},
hh:function(a,b){a.a.iG(new F.nL(),!0)},
dd:function(a){if(J.e(this.a,$.$get$eu().b))return!1
return!0},
im:function(a,b,c){var z,y
for(z=a.d,z=new P.da(z,z.c,z.d,z.b,null,[H.m(z,0)]);z.u();){y=z.e
if(!J.e(y.gcr(),b.gi()))continue
if(y.gdt()!=="TakeExitAction")continue
if(J.eN(y.gaQ(),c.gh())===!0)return!0}return!1}},
tj:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a7().ap(1073741823)
a.gaD().c=z
a.gaD().e=0
z=this.a.gh()
a.gaD().b=z
a.gaD().d=this.b
return a}},
nG:{"^":"a:0;",
$1:function(a){var z=a.gaD().e
if(typeof z!=="number")return z.ai()
a.gaD().e=z+1
return a}},
nH:{"^":"a:0;",
$1:function(a){return a.gN()===!0&&a.gaS()}},
nI:{"^":"a:2;",
$0:function(){return}},
nJ:{"^":"a:0;a",
$1:function(a){return a.geE()===this.a}},
nK:{"^":"a:0;a",
$1:function(a){a.sbE(this.a.b)
return a}},
nL:{"^":"a:0;",
$1:function(a){return!a.gb0()}},
q6:{"^":"J;bE:a<,i:b<,c,U:d<",
a1:function(a){var z=new F.e4(null,null,null,null,null)
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
e4:{"^":"d;a,b,c,d,e",
gbE:function(){return this.gaD().b},
sbE:function(a){this.gaD().b=a
return a},
gi:function(){return this.gaD().c},
skB:function(a){this.gaD().d=a
return a},
gU:function(){return this.gaD().e},
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
z=new F.q6(y,x,w,v)
if(y==null)H.i(P.l("currentRoomName"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("monstersAlive"))
if(v==null)H.i(P.l("time"))}this.m(z)
return z}}}],["","",,O,{"^":"",
xr:[function(a,b,c){var z,y
z=R.b6(6666,"Agruth",null,null,null,null,null,0,2,100,!1,2,!0,C.t,0,$.$get$bA())
y=z.y
a.gev().q(0,z)
return U.cR(c,[z],"{rock|cavern} floor",b,P.ag([1,new O.ui(y),5,new O.uj(y),9,new O.uk(y),12,new O.ul(y),17,new O.um(y)]))},"$3","wz",6,0,10],
xs:[function(a,b,c){var z=[O.hS(),O.hR(!1)]
a.gev().aw(0,z)
return U.cR(c,z,"{rock|cavern} floor",b,P.aB())},"$3","wA",6,0,10],
xt:[function(a,b,c){var z,y,x
z=a.ar("talk_to_briana_3")?"guardian":"orc"
y=R.b6(6667,z,null,null,null,new G.b2("rusty sword",1,1,!1,!0,!1,P.aC(C.o,null)),null,0,3,100,!1,3,!1,C.t,0,$.$get$bA())
x=y.y
a.a.q(0,y)
return U.cR(c,[y],"{rock|cavern} floor",b,P.ag([1,new O.uo(x),9,new O.up(x)]))},"$3","wB",6,0,10],
xu:[function(a,b,c){var z=[O.hS(),O.hR(!0)]
a.gev().aw(0,z)
return U.cR(c,z,"{rough|stone} floor",b,P.aB())},"$3","wC",6,0,10],
aK:function(a){return a.a.bB(0,new O.ur())},
ut:function(a){return a.X(O.aK(a).gi(),new O.uu())},
ip:function(a,b){a.X(O.aK(a).gi(),new O.uv(b))},
ez:function(a){var z=a.f
if(H.E(z.length!==0?C.a.gw(z):null,"$isJ").c===!0)return!1
return C.a.a7(C.Z,H.E(z.length!==0?C.a.gw(z):null,"$isJ").a)},
bi:function(a,b){var z,y,x
z=O.aK(a)
for(y=a.d,y=new P.da(y,y.c,y.d,y.b,null,[H.m(y,0)]);y.u();){x=y.e
if(!J.e(x.gcr(),z.gi()))continue
if(x.gdt()!=="TakeExitAction")continue
if(x.geE()===b)return!0
return!1}return!1},
iv:function(a,b){var z,y,x,w,v,u,t,s,r
for(z=a.a,y=z.ga_(z),x=new H.bT(y,new O.uH(),[H.m(z,0)]);x.u();){w=y.gS()
if(!w.gaF()){v=H.E(w.e,"$isb2")
y=b
x=v.c
u=v.d
v.r
t=P.P(C.o,!1,null)
t.fixed$length=Array
t.immutable$list=Array
s=a.Y(w.y)
r=s.a1(new O.uI(new G.b2(y,x,u,!0,!0,!1,t)))
z.a3(0,s)
z.q(0,r)
break}}},
uU:function(a){var z=O.aK(a).gaz().cj(0,new O.uV())
a.X(O.aK(a).gi(),new O.uW(z))},
cz:function(a,b){var z,y,x
z=H.E(a.c,"$iscO").b
if(z>=5)return
b.t(0,C.a1[z],!0)
y=H.E(a.c,"$iscO")
y.toString
x=new M.eb(null,!1,0,0)
x.m(y)
a.c=new O.uX().$1(x).p()},
eC:function(a,b,c,d){b.X(a.gi(),new O.v1())
if(!d)c.q(0,"TODO: create fight")},
wq:function(a,b){a.X(b.gi(),new O.wr(b))},
hR:function(a){var z,y
z=$.$get$er().a++
y=a?new Z.at("spear",0,1,!1,!1,!1,P.aC(C.D,null)):new G.b2("scimitar",1,1,!1,!0,!1,P.aC(C.o,null))
return R.b6(z,"goblin",O.dj(),null,null,y,null,0,1,0,!1,1,!1,C.t,0,$.$get$bA())},
hS:function(){return R.b6($.$get$er().a++,"orc",O.dj(),null,null,new G.b2("sword",1,1,!1,!0,!1,P.aC(C.o,null)),null,0,2,0,!1,2,!1,C.t,0,$.$get$bA())},
ui:{"^":"a:6;a",
$2:function(a,b){var z,y,x
z=this.a
y=a.Y(z)
x=new G.b2("sword",1,1,!1,!0,!1,P.aC(C.o,null))
y.ad(b,"<subject> {drop<s>|let<s> go of} the whip")
y.ae(b,"<subject> draw<s> <subject's> <object>",x)
a.X(z,new O.uh(x))
y.hu(b,'"You\'re dead, slave," <subject> growl<s> at <object> with hatred.',O.aK(a),!0)}},
uh:{"^":"a:0;a",
$1:function(a){a.sT(this.a)
return a}},
uj:{"^":"a:6;a",
$2:function(a,b){a.Y(this.a).ad(b,"<subject> spit<s> on the cavern floor")}},
uk:{"^":"a:6;a",
$2:function(a,b){var z=a.Y(this.a)
b.fP()
z.dJ(b,'"I\'ll enjoy eating your flesh, human," <subject> snarl<s>.',!0)
b.t(0,"\n\n",!0)}},
ul:{"^":"a:6;a",
$2:function(a,b){var z=a.Y(this.a)
z.ad(b,"<subject> grit<s> <subject's> teeth")
z.al(b,"<subject> do<es>n't talk any more",!0)}},
um:{"^":"a:6;a",
$2:function(a,b){a.Y(this.a).ad(b,"<subject> scowl<s> with pure hatred")}},
uo:{"^":"a:6;a",
$2:function(a,b){a.Y(this.a).hu(b,'"Good good good," <subject> whisper<s>, eyeing <object>.',O.aK(a),!0)}},
up:{"^":"a:6;a",
$2:function(a,b){var z=a.Y(this.a)
b.fP()
z.dJ(b,'"Pain is good," <subject> chuckle<s>.',!0)
b.t(0,"\n\n",!0)}},
ur:{"^":"a:0;",
$1:function(a){return a.gN()}},
uu:{"^":"a:0;",
$1:function(a){a.gaz().q(0,new Z.at("spear",0,1,!1,!1,!1,P.aC(C.D,null)))
return a}},
uv:{"^":"a:0;a",
$1:function(a){var z=a.gbh()
if(typeof z!=="number")return z.ai()
a.sbh(z+this.a)
return a}},
uH:{"^":"a:0;",
$1:function(a){return J.e(a.gb4(),$.$get$eA())}},
uI:{"^":"a:0;a",
$1:function(a){a.sT(this.a)
return a}},
uV:{"^":"a:0;",
$1:function(a){return C.a.a7(a.gf_(),C.r)}},
uW:{"^":"a:0;a",
$1:function(a){a.gaz().a3(0,this.a)
return a}},
uX:{"^":"a:0;",
$1:function(a){var z
a.gcw()
z=a.c
a.gcw()
a.c=z+1
return a}},
v1:{"^":"a:0;",
$1:function(a){a.san(new E.br("shield",P.aC(C.a0,null)))
return a}},
wr:{"^":"a:0;a",
$1:function(a){var z=this.a
if(!z.gaF())a.gaz().q(0,z.e)
a.sT($.$get$iw())}}}],["","",,V,{"^":"",
lH:function(){var z=new V.dz(null,null,null)
new V.tH().$1(z)
return z.p()},
th:{"^":"a:5;",
$3:function(a,b,c){c.t(0,"",!0)}},
ti:{"^":"a:5;",
$3:function(a,b,c){c.t(0,"",!0)}},
tf:{"^":"a:5;",
$3:function(a,b,c){c.t(0,"The tunnel back to the main slave quarters is suicide. There will be too many orcs, and the Gate of Screams is a long way beyond. That leaves two options. The black passage towards the war forges, and the deserted tunnel to the Unholy Church, an underground temple. Both paths should lead you towards the Upper Door, a small exit at the side of Mount Bloodrock.\n",!0)}},
tg:{"^":"a:5;",
$3:function(a,b,c){c.t(0,"The corpse lies still, getting cold.\n\n\n",!0)
O.cz(b,c)
c.t(0,"",!0)}},
og:{"^":"W;V:c<,h:d<,b,a",
G:function(a,b){var z=b.f
if(!J.e(H.E(z.length!==0?C.a.gw(z):null,"$isJ").a,"cave_with_agruth"))return!1
if(b.ar(this.d))return!1
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
td:{"^":"a:5;",
$3:function(a,b,c){c.t(0,'There is light at the end of the tunnel, Briana points ahead. You approach it with suspicion, but soon there is no question about it. The fresh air, the howling of the wind, the brightness of the light. After three years, you step out of the mountain you thought would be your grave. \n\n\nYou have to close your eyes to keep the blinding sun out. You let the wind chill your muscles. \n\n\nThen you open your eyes and see the valley and beyond. The black smoke of orc camps and razed villages. The burned forests. The cracks in the wall of the distant fort ironcast, just visible over the TODO hill. No birds, only those horrible dark eagles, with no head, and eight eyes where the neck on a normal \n\n\n_"We must stop this."_\n\n\nBriana: "This is much larger than us, Aren. If the dead prince is back, that\'s a problem for kings, not peasants."\n\n\n"That may be so. But no kings have what I have."\n\n\n"Orcthorn? Bah, you think they\'ll let you have it? A farm boy? / Muscles and a bit of brains? Don\'t be a fool, you\'re still a farm boy."\n\n\n"I\'m not a farm boy. And I don\'t mean Orcthorn / my own smarts. No, I have a connection. We both do."\n\n\n\n\n"A connection."\n\n\n"With the dead prince. I dream his dreams. I think I have some of his power. I think he is more than people think. A lot more. I think you feel it, too, but you have not been in the mountain for as long as I have. Most slaves are lucky to survive the first month. I survived three years."\n\n\n"So the thing you have that kings don\'t is\u2026 a way to communicate? You want to negotiate?"\n\n\n"I do not have anything the Dead Prince wants. No, I do not think any man, king or peasant, has it. But I think I am starting to understand what that is, and how the Dead Prince wants to seize it."\n\n\n"And you plan is?"\n\n\n(IMG long view of the road ahead) \n\n\n"Not letting him have it. Giving him the exact opposite of what he wants."\n\n\n"You know we could just run as fast as we can, kicking some orcs in their faces along the way, right?"\n\n\n"yes" \n\n\n"that others would do exactly that."\n\n\n"But we will not." \n\n\n"Yeah. We will not."\n\n\nWith that, you sheathe (weapon) and start down the road towards the black fort in the distance.\n',!0)}},
te:{"^":"a:5;",
$3:function(a,b,c){c.t(0,"",!0)}},
ta:{"^":"a:5;",
$3:function(a,b,c){c.t(0,"The crevice is small.\n",!0)}},
tb:{"^":"a:5;",
$3:function(a,b,c){c.t(0,"",!0)}},
t8:{"^":"a:5;",
$3:function(a,b,c){c.t(0,"You enter a small, circular room. There are exits on three sides, all marked with where they lead to.\n\n\n",!0)
if(O.bi(b,"smelter"))c.q(0,'The passage you came from is marked with the words "Hot iron", which must mean "smelter" in the orcs\' vocabulary. Another one has the words "Unholy Church" above it. Both of these slope downwards.')
c.t(0,"\n",!0)
if(O.bi(b,"underground_church"))c.q(0,'The passage you came from is marked with the words "Unholy Church". Another one has the words "Hot iron" above it, which must mean "smelter" in the orcs\' vocabulary. Both of these slope downwards.')
c.t(0,"\nA third passage is marked \"Up Door\", and a few paces beyond the opening, it turns into a steep stairway upwards. This is it, if you're ready for it. Your final path to escape, an end of those three horrible years.\n\n\n\n\nLeaning on the wall next to the third exit is a goblin guard. He's sleeping. He holds a sword in one hand, and there's a shield laid on his lap.\n",!0)}},
t9:{"^":"a:5;",
$3:function(a,b,c){c.t(0,"",!0)
if(b.ar("guardpost_above_church_take_shield")&&!b.jf("guardpost_above_church_take_shield"))c.q(0,"The goblin's corpse is sprawled on the ground.")
else c.q(0,"The goblin is sleeping soundly.")
c.t(0,"",!0)}},
lG:{"^":"W;V:c<,h:d<,b,a",
G:function(a,b){var z=b.f
if(!J.e(H.E(z.length!==0?C.a.gw(z):null,"$isJ").a,"guardpost_above_church"))return!1
if(b.dM(this.d)!=null)return!1
return!0},
R:[function(a,b,c){c.t(0,"TODO - take without waking the guard\n",!0)
O.eC(a,b,c,!0)
return H.b(a.gh())+" successfully performs GuardpostAboveChurchTakeShield"},"$3","gM",6,0,1],
P:[function(a,b,c){c.t(0,"TODO - start taking, guard is beginning to wake. You have to stay in an uncomfortable position for a minute before continuing\n",!0)
C.a.q(b.f,V.lH())
return H.b(a.gh())+" fails to perform GuardpostAboveChurchTakeShield"},"$3","gL",6,0,1],
H:function(a,b){return 0.4},
gO:function(){return!1},
a9:function(a,b){return"Will you be successful?"},
gK:function(){return},
gI:function(){return"TODO"},
gJ:function(){return!1}},
fa:{"^":"ac;",
gbN:function(){return[new A.fW(new V.lJ(),"Stay perfectly still","If you stop moving, the guard will probably go back to sleep. But in this position, staying perfectly still even for a single minute will be quite a feat.","guardpost_above_church_take_shield_rescue",!0,null),new A.fW(new V.lK(),"Snag the shield","TODO","guardpost_above_church_take_shield_continuation_of_failure",!0,null)]},
gh:function(){return"guardpost_above_church_take_shield"},
ax:function(){var z=new V.dz(null,null,null)
z.m(this)
new V.lL().$1(z)
return z.p()},
aW:function(a,b){if(a!==0)return
return b.a.bB(0,new V.lM())},
b5:function(a,b){return[a.bB(0,new V.lN())]}},
tH:{"^":"a:0;",
$1:function(a){var z=$.$get$a7().ap(1073741823)
a.gbM().b=z
a.gbM().c=0
return a}},
lJ:{"^":"a:26;",
$4:function(a,b,c,d){J.eM(c,"TODO - staying still, drops of sweat dripping on the guard, but ultimately the guard goes back to sleep and you take the shield",!0)
b.X(a.gi(),new V.lI())
O.eC(a,b,c,!0)
b.aA()
return"GuardpostAboveChurchTakeShieldRescueSituation resolved with rescue/continuation (Stay perfectly still)"}},
lI:{"^":"a:0;",
$1:function(a){var z=a.gbh()
if(typeof z!=="number")return z.aq()
a.sbh(z-1)
return a}},
lK:{"^":"a:26;",
$4:function(a,b,c,d){J.eM(c,"TODO",!0)
O.eC(a,b,c,!1)
b.aA()
return"GuardpostAboveChurchTakeShieldRescueSituation resolved with rescue/continuation (Snag the shield)"}},
lL:{"^":"a:0;",
$1:function(a){var z=a.gbM().c
if(typeof z!=="number")return z.ai()
a.gbM().c=z+1
return a}},
lM:{"^":"a:0;",
$1:function(a){return a.gN()}},
lN:{"^":"a:0;",
$1:function(a){return a.gN()}},
t6:{"^":"a:5;",
$3:function(a,b,c){c.t(0,'You are Aren, a slave. You have spent three painful years inside this mountain, between the foul-smelling cave walls, and under the whip of the orcs and the goblins that live here. \n\n\nYou watch Briana straighten over Agruth\'s corpse. She smooths her hair, using a pool of Agruth\'s blood as a mirror. \n\n\n"What?" she says when she notices you\'re looking.\n\n\n_"We either go now, or die."_\n\n\nBriana spits down at the body. "He wasn\'t even the worst of them, you know."\n\n\n_"I know."_\n\n\n"They _all_ deserve this, or worse. All of them. And I like the fact we\'ll kill them by their own swords." She kicks the dead slaver in the hip. \n\n\n_"That one is already dead."_\n\n\n"I was making sure. You understand that we should name the sword, right? It\'s the only thing we have going for us right now. Gods love named swords. And I refuse to carry it around referring to it as _Agruth\'s_." She makes a pained grimace when she says the orc\'s name.\n',!0)}},
t7:{"^":"a:5;",
$3:function(a,b,c){c.t(0,"",!0)}},
mB:{"^":"W;V:c<,h:d<,b,a",
G:function(a,b){var z=b.f
if(!J.e(H.E(z.length!==0?C.a.gw(z):null,"$isJ").a,"just_after_agruth_fight"))return!1
return!0},
R:[function(a,b,c){c.t(0,'_"We will call it Luck Bringer. It is our only chance to get out of this hell."_\n\n\nBriana nods. "Luck Bringer it is. Now, you\'re right, let\'s just get out of here as quickly as possible."\n',!0)
O.iv(b,"Luck Bringer")
b.au("RoomRoamingSituation").dE(b,O.aK(b),"cave_with_agruth_pre",c)
return H.b(a.gh())+" successfully performs NameAgruthSwordOpportunity"},"$3","gM",6,0,1],
P:[function(a,b,c){throw H.c(new P.w("Success chance is 100%"))},"$3","gL",6,0,1],
H:function(a,b){return 1},
gO:function(){return!1},
a9:function(a,b){return"Will you be successful?"},
gK:function(){return},
gI:function(){return""},
gJ:function(){return!1}},
mC:{"^":"W;V:c<,h:d<,b,a",
G:function(a,b){var z=b.f
if(!J.e(H.E(z.length!==0?C.a.gw(z):null,"$isJ").a,"just_after_agruth_fight"))return!1
return!0},
R:[function(a,b,c){c.t(0,'_"We will call it Savior. It is our first step to freedom."_\n\n\nBriana nods. "Savior it is. Now, you\'re right, let\'s just get out of here as quickly as possible."\n',!0)
O.iv(b,"Savior")
b.au("RoomRoamingSituation").dE(b,O.aK(b),"cave_with_agruth_pre",c)
return H.b(a.gh())+" successfully performs NameAgruthSwordRedemption"},"$3","gM",6,0,1],
P:[function(a,b,c){throw H.c(new P.w("Success chance is 100%"))},"$3","gL",6,0,1],
H:function(a,b){return 1},
gO:function(){return!1},
a9:function(a,b){return"Will you be successful?"},
gK:function(){return},
gI:function(){return""},
gJ:function(){return!1}},
mA:{"^":"W;V:c<,h:d<,b,a",
G:function(a,b){var z=b.f
if(!J.e(H.E(z.length!==0?C.a.gw(z):null,"$isJ").a,"just_after_agruth_fight"))return!1
return!0},
R:[function(a,b,c){c.t(0,"_\"That is foolish. It is just a sword, after all.\"_\n\n\nBriana shrugs. \"Whatever, just don't ever call it _Agruth's._ I already have more respect to this piece of iron than to that worthless animal. Now, you're right, let's just get out of here as quickly as possible.\"\n",!0)
b.au("RoomRoamingSituation").dE(b,O.aK(b),"cave_with_agruth_pre",c)
return H.b(a.gh())+" successfully performs NameAgruthSwordNothing"},"$3","gM",6,0,1],
P:[function(a,b,c){throw H.c(new P.w("Success chance is 100%"))},"$3","gL",6,0,1],
H:function(a,b){return 1},
gO:function(){return!1},
a9:function(a,b){return"Will you be successful?"},
gK:function(){return},
gI:function(){return""},
gJ:function(){return!1}},
t4:{"^":"a:5;",
$3:function(a,b,c){c.t(0,'Violent grunts and growls are coming through that door. Next to it, an orcish writing on the wall says "Danger mad. Give food go away."\n',!0)}},
t5:{"^":"a:5;",
$3:function(a,b,c){c.t(0,"TODO\n",!0)}},
t2:{"^":"a:5;",
$3:function(a,b,c){c.t(0,"The room is dark and wet. As you enter, the noises end. \n\n\n\n\nWhen your eyes become accustomed to the dark, you see two figures standing in front of you. One is much higher, almost touching the room's ceiling, but you slowly realize it's a stone statue. The other figure, though, is living.\n\n\n\n\nIts face is in constant motion, overwhelmed by tics and waves of hateful expressions. You realize it's a male orc, but an especially large one, with huge muscles and many scars. If he wasn't locked up here, he'd surely make a captain.\n",!0)}},
t3:{"^":"a:5;",
$3:function(a,b,c){c.t(0,"The room is quiet. The mad guardian's huge body lies on the floor beneath the statue.\n",!0)}},
pl:{"^":"W;V:c<,h:d<,b,a",
G:function(a,b){var z=b.f
if(!J.e(H.E(z.length!==0?C.a.gw(z):null,"$isJ").a,"orcthorn_room"))return!1
if(b.ar("talk_to_briana_3"))if(!b.ar(this.d))z=H.E(z.length!==0?C.a.gw(z):null,"$isJ").c!==!0
else z=!1
else z=!1
if(!z)return!1
return!0},
R:[function(a,b,c){c.t(0,'TODO - this must be it. you search to room and find the sword hidden well (under a loose tile? under a heap of corpses?). then "why would they keep the sword at all? why wouldn\'t they destroy it?" - "fear. it\'s the ultimate authority. I don\'t think it was the orcs who decided to keep the sword intact."\n\n\nBriana: "I can\'t believe we did it. A farm boy and a freak."\n\n\n"A freak?"\n\n\n"A simple thing like this. You don\'t understand how much the orcs learned to fear the sword. A single knight could hold two dozens of orcs in check just by wielding that sword."\n\n\n"Well, we still need to get out of here."\n',!0)
O.wq(b,a)
return H.b(a.gh())+" successfully performs TakeOrcthorn"},"$3","gM",6,0,1],
P:[function(a,b,c){throw H.c(new P.w("Success chance is 100%"))},"$3","gL",6,0,1],
H:function(a,b){return 1},
gO:function(){return!1},
a9:function(a,b){return"Will you be successful?"},
gK:function(){return},
gI:function(){return""},
gJ:function(){return!1}},
t_:{"^":"a:5;",
$3:function(a,b,c){c.t(0,"TODO\n",!0)}},
t0:{"^":"a:5;",
$3:function(a,b,c){c.t(0,"TODO\n",!0)}},
ot:{"^":"W;V:c<,h:d<,b,a",
G:function(a,b){var z=b.f
if(!J.e(H.E(z.length!==0?C.a.gw(z):null,"$isJ").a,"slave_quarters"))return!1
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
rY:{"^":"a:5;",
$3:function(a,b,c){c.t(0,"You can see Briana clutching her fists. \"Are we homesick already?\" she says. But she doesn't wait for reply, and presses on.\n\n\nIt doesn't take long before you start hearing voices. Orcs and goblins shouting commands, mostly. Then human screams.\n\n\nThe tunnel gets wider and better lit by torches. The walls are smoother. You stop down next to a small, reinforced door. Up ahead, something is happening. A human slave is running towards you. His hand is visibly broken just above the elbow and blood is streaming down his limping left leg. His lips are moving but there is no sound anymore, only pain. Eyes in tears, he doesn't see you or anything else.\n\n\nBefore you can so much as call to him, something long and sharp shoots from behind the slave, and into his back. A bloodied spearhead appears in the center of the man's chest, as if growing from there. The tearful eyes go down, looking at the fatal wound. Two more steps and the slave falls face down, the shaft of the spear protruding upwards from his back.\n\n\nAn orc and a goblin appear from the tunnel, walking towards the dead man. The orc is laughing, patting his companion on the back. \"Vicious throw, small one!\" he roars.\n\n\nYou step back and motion Briana to lean on the wall, hoping that the door's embossed frame will provide enough cover before the two slavers turn again. \n\n\nBut at that time, something or someone smashes on that very door from the inside. Then come angry growls and something akin to barking and howling.\n\n\nThe door stays shut but the two slavers are now looking directly at you. The goblin yanks his spear from the corpse, and the orc unsheathes his sword. They start towards you.\n\n\n\n\n\n\n[IMAGE goblin spearman + orc]\n",!0)}},
rZ:{"^":"a:5;",
$3:function(a,b,c){c.t(0,"The small door is TODO open/close.\n\n\n",!0)
O.cz(b,c)
c.t(0,"",!0)}},
ou:{"^":"W;V:c<,h:d<,b,a",
G:function(a,b){var z=b.f
if(!J.e(H.E(z.length!==0?C.a.gw(z):null,"$isJ").a,"slave_quarters_passage"))return!1
if(!b.ar(this.d))z=H.E(z.length!==0?C.a.gw(z):null,"$isJ").c!==!0
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
rW:{"^":"a:5;",
$3:function(a,b,c){c.t(0,"A blast of smoke and heat greets you as you walk out of the passage and into the room. The roaring fire draws your attention to the far wall, where scores of orcs shovel coal into a giant furnace and tilt huge kettles of molten steel into white-hot rivers. This is the smelter.\n\n\n",!0)
if(O.bi(b,"war_forge"))c.t(0,"You see a smooth passage leading out of the smelter and sloping upwards. You'll be able to go there unnoticed.",!0)
c.t(0,"",!0)
if(O.bi(b,"guardpost_above_church"))c.t(0,"Not far from here there is a short tunnel, sloping down. It leads into the same room as the molten steel \u2014 the war forges. You'll be able to go there unnoticed.",!0)
c.t(0,"",!0)}},
rX:{"^":"a:5;",
$3:function(a,b,c){c.t(0,"The reds and whites of the molten steel reflect in the heaps of coal.\n\n\n",!0)
O.cz(b,c)
c.t(0,"",!0)}},
ox:{"^":"W;V:c<,h:d<,b,a",
G:function(a,b){var z=b.f
if(!J.e(H.E(z.length!==0?C.a.gw(z):null,"$isJ").a,"smelter"))return!1
if(b.ar(this.d))return!1
return!0},
R:[function(a,b,c){c.t(0,"The artificial rivers lead the molten iron across the room, into a large pool. From that pool, a single ogre is distributing the forge-ready liquid into troughs that lead to the war forges below. \n\n\nThe ogre is no more than a spear's throw away from you. But he doesn't notice. In fact, you realize he's blind, probably from all the molten steel around him. Yet he's performing his job without fault, listening to commands from the war forges beyond the wall, and operating the  floodgates accordingly.\n",!0)
return H.b(a.gh())+" successfully performs SmelterLookAround"},"$3","gM",6,0,1],
P:[function(a,b,c){throw H.c(new P.w("Success chance is 100%"))},"$3","gL",6,0,1],
H:function(a,b){return 1},
gO:function(){return!1},
a9:function(a,b){return"Will you be successful?"},
gK:function(){return},
gI:function(){return""},
gJ:function(){return!1}},
oy:{"^":"W;V:c<,h:d<,b,a",
G:function(a,b){var z=b.f
if(!J.e(H.E(z.length!==0?C.a.gw(z):null,"$isJ").a,"smelter"))return!1
if(!(!b.ar(this.d)&&b.ar("war_forge_watch_workers")&&b.ar("smelter_look_around")&&O.aK(b).h7(C.r)))return!1
return!0},
R:[function(a,b,c){c.t(0,"TODO - throwing spear at the orc that holds the molten steel gate\n\n\nWhy would you do that? You just wasted a perfectly good spear on a stupid ogre that posed no threat to us.\n\n\nWatch.\n\n\nTODO (molten steel ruins everything)\n\n\nThe less simple you see the world, the easier it is for you to change it. \n\n\nYou got lucky. \n\n\nThat was some throw! That thing downstairs.. I don't know what it is but I would not want to meet it in battle. - it is probably meant to scale castle walls. - so, fort ironcast. One well placed spear may have prevented the fall of Ironcast. - delayed. - what? - we delayed the fall of the fort, at best.\n",!0)
O.uU(b)
return H.b(a.gh())+" successfully performs SmelterThrowSpear"},"$3","gM",6,0,1],
P:[function(a,b,c){throw H.c(new P.w("Success chance is 100%"))},"$3","gL",6,0,1],
H:function(a,b){return 1},
gO:function(){return!1},
a9:function(a,b){return"Will you be successful?"},
gK:function(){return},
gI:function(){return""},
gJ:function(){return!1}},
rU:{"^":"a:5;",
$3:function(a,b,c){c.t(0,"The path from slavery to power begins with a single crack of a whip. Briana wheels around, her face red with pain and anger. She is new here, but she knows what will follow. \n\n\n\n\nOnce Agruth starts whipping, the victim ends up dead. Agruth loves killing slaves. \n\n\n\n\nAnother crack and there is new blood on Briana's face. Agruth grins.\n\n\n\n\nNobody else is in sight. It's just you, Agruth and Briana. That's Agruth's main mistake.\n",!0)}},
rV:{"^":"a:5;",
$3:function(a,b,c){c.t(0,"",!0)}},
pn:{"^":"W;V:c<,h:d<,b,a",
G:function(a,b){if(!(b.dM(this.d)==null&&O.ez(b)))return!1
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
po:{"^":"W;V:c<,h:d<,b,a",
G:function(a,b){if(!(b.ar("talk_to_briana_1")&&b.dM(this.d)==null&&O.ez(b)))return!1
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
pp:{"^":"W;V:c<,h:d<,b,a",
G:function(a,b){if(!(b.ar("talk_to_briana_2")&&b.dM(this.d)==null&&O.ez(b)))return!1
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
rS:{"^":"a:5;",
$3:function(a,b,c){c.t(0,"This must be the place that the orcs call the Shafts. It's a tall, seemingly endless room, with many walkways across.\n\n\n\n\n\n\nYou realize there is really only one way out, over one of the walkways. You'll have to run, there is no hiding anymore.\n",!0)}},
rT:{"^":"a:5;",
$3:function(a,b,c){c.t(0,"",!0)}},
tJ:{"^":"a:5;",
$3:function(a,b,c){c.t(0,"TODO - start chase\n\n\nSuddenly, an **orc** and a **goblin** jump in front of you from a slimy crevice, swords in hands.\n\n\n\n\n![Orc and Goblin](img/orc_and_goblin_sketch.jpg)\n",!0)}},
tK:{"^":"a:5;",
$3:function(a,b,c){c.t(0,"",!0)}},
ty:{"^":"a:5;",
$3:function(a,b,c){c.t(0,"You enter something that at first looks like a large, twisting cave, but then opens into a high room with many columns. This must be what the orcs call the Underground Church. Your bare footsteps reverberate around the space, so you slow down to quiet them. There are no windows, of course, you are deep underground, but there is dim light coming from the far end of the place, where you expect the altar to be but can't quite see it. No torches here. Quiet. \n\n\n",!0)
if(O.bi(b,"cave_with_agruth"))c.q(0,"After a bit of searching, you also notice a twisty passage going from the right hand side of the Church and sloping upwards. That must be the way out.")
c.t(0,"",!0)
if(O.bi(b,"guardpost_above_church"))c.q(0,"Not far from here, a tunnel leads slightly downwards, to where you killed Agruth.")
c.t(0,"",!0)}},
tI:{"^":"a:5;",
$3:function(a,b,c){c.t(0,"The Underground Church stands silent, as if holding breath.\n\n\n",!0)
O.cz(b,c)
c.t(0,"",!0)}},
lb:{"^":"W;V:c<,h:d<,b,a",
G:function(a,b){var z=b.f
if(!J.e(H.E(z.length!==0?C.a.gw(z):null,"$isJ").a,"underground_church"))return!1
if(b.ar(this.d))return!1
return!0},
R:[function(a,b,c){c.t(0,'This place was not built by the orcs or their slaves. Walls are straight and smooth. The columns are decorated with delicate embossments of skulls and tentacles.\n\n\n"What are these things?" Briana whispers.\n\n\n_"This place worships the Dead Prince."_\n\n\nSaying the name brings coldness and sweat. You hear the name every night in the Dead Prince\'s tongue \u2014 but it has been a long time since you said it yourself.\n\n\n"Worships?" Briana looks up at the high ceiling, then around the temple. "I though the Dead Prince was a warlord. A shaman. Something like that."\n\n\n_"He is god."_\n\n\n',!0)
if(!b.ar("wait_for_ritual"))c.t(0,"Briana smirks. \"Look, no. The Dead Prince is no god. The orcs might think so, you shouldn't. He's some talented illusionist at best.\" ",!0)
c.t(0,'\nThe glow coming from the altar dims for a moment, then lights up again.\n\n\n_"He is worse than god. He is fear itself."_\n\n\nBriana looks at you, narrowing her eyes.\n\n\n_"I think you have felt it."_\n',!0)
return H.b(a.gh())+" successfully performs ExamineUndergroundChurch"},"$3","gM",6,0,1],
P:[function(a,b,c){throw H.c(new P.w("Success chance is 100%"))},"$3","gL",6,0,1],
H:function(a,b){return 1},
gO:function(){return!1},
a9:function(a,b){return"Will you be successful?"},
gK:function(){return},
gI:function(){return""},
gJ:function(){return!1}},
tc:{"^":"a:5;",
$3:function(a,b,c){c.t(0,'The altar a simple block of stone underneath a large wall-mounted ornament portraying an octopus with eight tentacles and eight black eyes at their tips. \n\n\nIt\'s the sign of the Dead Prince. You have never seen it in real life but you know it well.\n\n\n"You\'re brave, my friend," Briana says. "I\'ll give you that. But if we must linger in this mountain, I\'d much rather kill some orcs than spy around a temple."\n\n\n_"You hate orcs? This is what made them."_\n\n\nBriana opens her mouth to reply, but at that point the otherwise steady light from the altar flickers like a flame, and you both slip behind a large column to move out of sight. A spear that lies here on the ground almost trips you up.\n',!0)}},
tn:{"^":"a:5;",
$3:function(a,b,c){c.t(0,"The altar glows with a dim red light that reflects in the eight black eyes above it.\n",!0)}},
pF:{"^":"W;V:c<,h:d<,b,a",
G:function(a,b){var z=b.f
if(!J.e(H.E(z.length!==0?C.a.gw(z):null,"$isJ").a,"underground_church_altar"))return!1
if(b.ar(this.d))return!1
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
pm:{"^":"W;V:c<,h:d<,b,a",
G:function(a,b){var z=b.f
if(!J.e(H.E(z.length!==0?C.a.gw(z):null,"$isJ").a,"underground_church_altar"))return!1
if(b.ar(this.d))return!1
return!0},
R:[function(a,b,c){c.t(0,"It's a primive short spear that probably belonged to some goblin. You take it in your hand, feeling the wet wood and the patches of mire along its length. It must have been here for a while. \n\n\nBut it feels right in your hand, a good throwing weapon.\n",!0)
O.ut(b)
return H.b(a.gh())+" successfully performs TakeSpearInUndergroundChurch"},"$3","gM",6,0,1],
P:[function(a,b,c){throw H.c(new P.w("Success chance is 100%"))},"$3","gL",6,0,1],
H:function(a,b){return 1},
gO:function(){return!1},
a9:function(a,b){return"Will you be successful?"},
gK:function(){return},
gI:function(){return""},
gJ:function(){return!1}},
rR:{"^":"a:5;",
$3:function(a,b,c){c.t(0,"You enter the enormous cave that holds Mount Bloodrock's war forges. This space is so vast that it has its own climate, with dark clouds covering most of the ceiling, and what looks like black rain falling in the distance. Weird bats are circling just below the clouds, their shrieks mixing with the clangs of steel and angry shouts below.\n\n\n",!0)
if(O.bi(b,"cave_with_agruth"))c.t(0,"You and Briana duck behind some carts on a walkway above the floor of the cave. You can see that the walkway leads up a flight of stairs that hugs one side of the cave, and into a large stone wall. This must be the way through the smelter, and towards the Upper Door. Thankfully, there is nobody in the way. ",!0)
c.t(0,"\n",!0)
if(O.bi(b,"smelter"))c.t(0,"You and Briana stand on a walkway way above the floor of the cave. You can see the walkway leads down a flight of stairs that hugs one side of the cave, towards the bottom. Down there, you recognize a passage in the rock that you know must descend deeper into the mountain, towards the slave quarters, and therefore to where you slayed Agruth. There is nobody in the way. ",!0)
c.t(0,"",!0)}},
t1:{"^":"a:5;",
$3:function(a,b,c){c.t(0,"The air in the war forges is heavy and the noise overwhelming.\n\n\n",!0)
O.cz(b,c)
c.t(0,"",!0)}},
pG:{"^":"W;V:c<,h:d<,b,a",
G:function(a,b){var z=b.f
if(!J.e(H.E(z.length!==0?C.a.gw(z):null,"$isJ").a,"war_forge"))return!1
if(b.ar(this.d))return!1
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
pH:{"^":"W;V:c<,h:d<,b,a",
G:function(a,b){var z=b.f
if(!J.e(H.E(z.length!==0?C.a.gw(z):null,"$isJ").a,"war_forge"))return!1
if(!(!b.ar(this.d)&&b.ar("war_forge_look_around")))return!1
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
pY:{"^":"fa;i:a<,U:b<",
a1:function(a){var z=new V.dz(null,null,null)
z.m(this)
a.$1(z)
return z.p()},
A:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof V.fa))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
y=z==null?y==null:z===y
z=y}else z=!1
return z},
gB:function(a){return Y.U(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)))},
k:function(a){return"GuardpostAboveChurchTakeShieldRescueSituation {id="+J.h(this.a)+",\ntime="+J.h(this.b)+",\n}"}},
dz:{"^":"d;a,b,c",
gi:function(){return this.gbM().b},
gU:function(){return this.gbM().c},
gbM:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.a=null}return this},
m:function(a){this.a=a},
p:function(){var z,y,x
z=this.a
if(z==null){y=this.gbM().b
x=this.gbM().c
z=new V.pY(y,x)
if(y==null)H.i(P.l("id"))
if(x==null)H.i(P.l("time"))}this.m(z)
return z}}}],["","",,O,{"^":"",
xq:[function(a){var z,y
z=$.$get$dn()
y=z.C
if(y.length>0){y+=" "
z.C=y}z.C=y+a},"$1","v_",2,0,15],
xv:[function(a){$.ex=a},"$1","v0",2,0,15],
i8:[function(a,b,c,d,e,f,g){var z=L.f_(a,!1,!1,d,e,f,g)
$.$get$c_().q(0,z)
return z},function(a){return O.i8(a,!1,!1,null,null,null,null)},function(a,b,c){return O.i8(a,!1,!1,null,b,c,null)},"$7$deferToChoiceList$deferToEndOfPage$goto$helpMessage$script$submenu","$1","$3$helpMessage$script","uZ",2,13,51,0,0,0,1,1,0],
nS:{"^":"o3;",
bA:function(){var z=0,y=P.aA(),x,w=2,v,u=[],t=this,s,r,q,p,o,n,m,l,k,j
var $async$bA=P.ax(function(a,b){if(a===1){v=b
z=w}while(true)switch(z){case 0:if($.cq){n=t.Q
n.toString
m=new A.u(667,null,null,null,null)
m.c="Sending updated stats."
n.a.F(m.E())
m=t.Q
n=Z.oG()
m.toString
l=new A.u(100,null,null,null,null)
l.e=n.E()
m.a.F(l.E())
new P.G(0,$.q,null,[null]).bC(!0)}if(t.r){n=t.Q
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
n=H.B(j)
if(n instanceof M.cH){r=n
q=H.D(j)
n=t.Q
m=H.b(r)+"\nStacktrace: "+H.b(q)
n.toString
l=new A.u(666,null,null,null,null)
l.c="AuthorScriptException: "+m
n.a.F(l.E())
z=1
break}else{p=n
o=H.D(j)
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
eV:function(){var z,y
this.fv()
this.f.bf(0)
this.r=!0
this.e=this.c
z=this.Q
Z.hw(Z.bR())
z.toString
y=new A.u(90,null,null,null,null)
y.b=Z.bR()
z.a.F(y.E())
this.bA()},
lf:[function(a){var z,y
z={}
z.a=null
y=$.$get$c_()
y.Z(0,new O.oe(z,this,a))
z=z.a
if(z==null)throw H.c(P.F("The sent choice hash ("+H.b(a)+") is not one of those offered ("+J.h(y)+")"))
this.iX(z)
this.bA()},"$1","giI",2,0,32],
iX:function(a){var z
if(a.gh1()!=null){z=a.r
$.$get$cw().aC(z)}z=a.x
if(z!=null)this.ep(z)},
cF:function(){var z=0,y=P.aA(),x,w=[],v=this,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c
var $async$cF=P.ax(function(a,a0){if(a===1)return P.aF(a0,y)
while(true)switch(z){case 0:u={}
r=$.$get$cx()
q=r.b
if(q.b!==q.c){u=v.Q
u.toString
q=new A.u(667,null,null,null,null)
q.c="Awarding points."
u.a.F(q.E())
p=r.b.dI()
r=v.Q
q=p.gjv()
u=p.b
o=p.c
r.toString
n=new A.u(70,null,null,null,null)
n.b=[q,u]
n.c=o
r.a.F(n.E())
r=new P.G(0,$.q,null,[null])
r.bC(null)
r.c3(new O.o4(v))
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
k.iF(new O.o5(v),!1)
if(k.gl(k)!==0){r=v.Q
r.toString
o=new A.u(667,null,null,null,null)
o.c="We have choices."
r.a.F(o.E())
o=H.y(k,"ba",0)
o=P.P(new H.L(k,new O.o6(u,l),[o]),!0,o)
r=k.a
H.p([],[L.aa])
j=new L.f0(r,o)
if(!j.gW(j)){u=v.Q
r=u.e
if(r!=null){r.dz(new D.c4("Showing new choice before previous one was selected."))
u.e=null}r=P.t
u.e=new P.cr(new P.G(0,$.q,null,[r]),[r])
r=j.dP()
u.a.F(r.E())
u=u.e.a.c3(v.giI())
i=new O.o7(v)
r=H.m(u,0)
q=$.q
if(q!==C.i){i=P.ep(i,q)
q.toString}u.dh(new P.ei(null,new P.G(0,q,null,[r]),6,new O.o8(),i,[r,r]))
x=!0
z=1
break}else{h=k.aR(0,new O.o9(),new O.oa())
if(h!=null){if(h.gh1()!=null){r=h.r
$.$get$cw().aC(r)}r=h.x
if(r!=null)v.ep(r)
k.a3(0,h)}}}r=$.$get$cw()
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
case 4:r=$.ex
if(r!=null){v.ep(r)
$.ex=null
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
u=u.eY(50)
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
r=P.a2
u.f=new P.cr(new P.G(0,$.q,null,[r]),[r])
r=new A.u(30,null,null,null,null)
r.c=q
u.a.F(r.E())
u.f.a.c3(new O.ob(v))
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
break}k.jt(r[q])}catch(b){u=H.B(b)
if(u instanceof M.cH){t=u
s=H.D(b)
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
if(k.bs(0,new O.oc(u,v))&&v.x===v.e.gay().length-1){u=v.Q
u.toString
r=new A.u(667,null,null,null,null)
r.c="Creating & sending savegame"
u.a.F(r.E())
r=v.Q
u=v.e7()
r.toString
u=u.eY(50)
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
r={func:1,ret:[P.Q,P.as]}
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
if(k.bs(0,new O.od(u,v))&&v.x===v.e.gay().length-1){u=v.Q
u.toString
r=d.eY(50)
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
z=$.$get$cL()
if(z.b.test(H.bz(a))){y=this.d
if(y==null)throw H.c(new P.w("Cannot use ["+J.h(z)+"] when there is no _preGotoPosition."))
x=y.a
z=y.b
if(typeof z!=="number")return z.aq()
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
this.d=new O.nT(v,this.x)
this.e=x
this.x=w
v.e=J.an(v.gdQ(),1)},
fv:function(){var z,y,x,w,v,u
this.x=null
$.$get$cw().bf(0)
$.$get$c_().sl(0,0)
$.rw=null
x=$.$get$cB()
x.bf(0)
w=$.$get$cx()
x.n(0,"points",w)
w.a=0
w.b.bf(0)
this.b.jx()
$.is=!0
try{this.kf()}catch(v){z=H.B(v)
y=H.D(v)
x=this.Q
w=H.b(z)+"\n"+H.b(y)
x.toString
u=new A.u(666,null,null,null,null)
u.c="Author Exception in initBlock() (<variables>): "+w
x.a.F(u.E())
throw H.c(z)}this.hm()
$.is=!1},
cG:function(a){var z=0,y=P.aA(),x,w=2,v,u=[],t=this,s,r,q,p,o,n,m
var $async$cG=P.ax(function(b,c){if(b===1){v=c
z=w}while(true)switch(z){case 0:q=$.$get$dn()
q.C=""
w=4
z=7
return P.aw(a.$0(),$async$cG)
case 7:w=2
z=6
break
case 4:w=3
m=v
s=H.B(m)
r=H.D(m)
q.C+="<code><pre>ERROR: "+H.b(s)+"\n\n"+H.b(r)+"</pre></code>"
q=J.h(s)
o=t.e.gh()
n=t.x
throw H.c(new M.cH(q,o,n))
z=6
break
case 3:z=2
break
case 6:if(q.C.length!==0){t.Q.f6(J.h(q)).c3(new O.of(t))
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
if($.$get$cL().b.test(H.bz(z)))return!1
y=this.b.dU(z,this.e.gdW())
if(y==null){z="Target page '"+H.b(z)+"' was not found."
x=this.Q
x.toString
w=new A.u(667,null,null,null,null)
w.c=z
x.a.F(w.E())
return!0}y.gl6()
return!1},"$1","gfB",2,0,33],
e7:function(){var z,y,x,w,v,u
this.hm()
try{x=this.e.gh()
w=$.$get$cB()
x=new Z.fR(x,this.b.jS(),null,null,null,null)
x.c=H.aL(Z.d1(w),"$isH",[P.r,P.d],"$asH")
x.f=Date.now()
x.e=C.e.l3(H.aD(x),16)
return x}catch(v){z=H.B(v)
y=H.D(v)
x=this.Q
w=H.b(z)+"\n"+H.b(y)
x.toString
u=new A.u(666,null,null,null,null)
u.c="Error when creating savegame: "+w
x.a.F(u.E())
throw H.c(z)}},
hc:function(a,b){var z,y,x
this.fv()
z=this.b
y=z.a
if(y.j(0,a.a)==null)throw H.c(new Z.dA("Trying to load page '"+H.b(a.a)+"' which doesn't exist in current egamebook."))
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
y=$.$get$cB()
Z.nP(a,y,P.dK(P.r,P.bH))
this.cx=H.E(y.j(0,"game"),"$isf5")
this.cy=H.aL(y.j(0,"hitpoints"),"$isau",[P.aW],"$asau")
z=[P.t]
this.db=H.aL(y.j(0,"stamina"),"$isau",z,"$asau")
this.dx=H.aL(y.j(0,"gold"),"$isau",z,"$asau")
z=this.Q
Z.hw(Z.bR())
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
kw:function(a){return this.hc(a,null)},
dY:[function(a,b,c,d){var z=0,y=P.aA(),x,w=this,v,u,t
var $async$dY=P.ax(function(e,f){if(e===1)return P.aF(f,y)
while(true)switch(z){case 0:v=$.$get$dn()
if(v.C.length!==0){w.Q.f6(J.h(v))
v.C=""}v=w.Q
v.toString
u=new A.u(130,null,null,null,null)
u.b=[a,b,d,c]
v.a.F(u.E())
u=U.co
t=new P.G(0,$.q,null,[u])
v.x=new P.cr(t,[u])
x=t
z=1
break
case 1:return P.aG(x,y)}})
return P.aH($async$dY,y)},function(a,b){return this.dY(a,b,null,!1)},"lb","$4$rerollEffectDescription$rerollable","$2","gi_",4,5,44,1,0]},
oe:{"^":"a:0;a,b,c",
$1:function(a){var z,y,x,w
a.sf7(!0)
if(a.d===this.c){z="Found choice that was selected: "+a.e
y=this.b.Q
y.toString
x=new A.u(667,null,null,null,null)
x.c=z
y.a.F(x.E())
this.a.a=a}else{z=a.x
if(z!=null){y=this.b
w=$.$get$cL().b.test(H.bz(z))?y.d.a:y.b.dU(z,y.e.gdW())
if(w!=null){y.f.q(0,H.b(y.e.gh())+">>"+H.b(w.gh()))
y.r=!0}}}}},
o4:{"^":"a:0;a",
$1:function(a){return this.a.bA()}},
o5:{"^":"a:0;a",
$1:function(a){return a.gf7()||this.a.iP(a)}},
o6:{"^":"a:35;a,b",
$1:function(a){return a.km(this.b,this.a.a)}},
o7:{"^":"a:0;a",
$1:function(a){var z,y,x
z=H.b(a)
y=this.a.Q
y.toString
x=new A.u(667,null,null,null,null)
x.c=z
y.a.F(x.E())
return}},
o8:{"^":"a:0;",
$1:function(a){return a instanceof D.c4}},
o9:{"^":"a:0;",
$1:function(a){return a.gkn()}},
oa:{"^":"a:2;",
$0:function(){return}},
ob:{"^":"a:0;a",
$1:function(a){return this.a.bA()}},
oc:{"^":"a:0;a,b",
$1:function(a){return a.dB(!0,this.a.a,this.b.gfB())}},
od:{"^":"a:0;a,b",
$1:function(a){return a.dB(!0,this.a.a,this.b.gfB())}},
of:{"^":"a:0;a",
$1:function(a){return this.a.bA()}},
nc:{"^":"d;a,b,fV:c<",
jj:function(a,b,c){var z
if(!$.hT){z=J.an(this.a,b)
this.a=z
this.b.aC(new A.cY(b,z,c))}},
q:function(a,b){return this.jj(a,b,null)},
ai:function(a,b){this.q(0,b)
return this},
E:function(){return P.ag(["points",this.a])},
hC:function(a){this.a=a.j(0,"points")
this.b.bf(0)},
ia:function(){this.b=P.bb(null,A.cY)},
$ise5:1},
d2:{"^":"mW;ay:d<,dQ:e@,a,b,c",
ghD:function(){return J.a9(this.e,0)}},
nT:{"^":"d;a,b"},
o_:{"^":"d;a",
j:function(a,b){return this.a.j(0,b)},
dU:function(a,b){var z
if(b!=null&&this.a.ab(b+": "+H.b(a)))return this.a.j(0,H.b(b)+": "+H.b(a))
else{z=this.a
if(z.ab(a))return z.j(0,a)
else return}},
n:function(a,b,c){this.a.n(0,b,c)
c.sh(b)},
jS:function(){var z=new H.R(0,null,null,null,null,null,0,[P.r,null])
this.a.Z(0,new O.o1(z))
return z},
kc:function(a){a.Z(0,new O.o2(this))},
jx:function(){this.a.Z(0,new O.o0())}},
o1:{"^":"a:6;a",
$2:function(a,b){this.a.n(0,a,P.ag(["visitCount",b.gdQ()]))}},
o2:{"^":"a:6;a",
$2:function(a,b){var z=this.a.a
if(z.ab(a))z.j(0,a).sdQ(J.az(b,"visitCount"))}},
o0:{"^":"a:6;",
$2:function(a,b){b.sdQ(0)}}}],["","",,M,{"^":"",cH:{"^":"d;a,b,c",
k:function(a){return"AuthorScriptException at page '"+H.b(this.b)+"', block #"+H.b(this.c)+": "+H.b(this.a)},
v:{
eU:function(a){return new M.cH(a,null,null)}}}}],["","",,M,{"^":"",o3:{"^":"d;"}}],["","",,Z,{"^":"",fR:{"^":"d;a,b,c,d,e,f",
eY:function(a){var z
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
return C.w.h_(z)},
k:function(a){return this.dO()},
v:{
fS:function(a){var z,y
if(a!=null)if(typeof a!=="string"){if(typeof a!=="number"||Math.floor(a)!==a)if(typeof a!=="number")if(typeof a!=="boolean"){z=J.o(a)
z=!!z.$isN||!!z.$isH}else z=!0
else z=!0
else z=!0
y=z}else y=!0
else y=!0
if(y)return!0
return!!J.o(a).$ise5},
d1:function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"&&Math.floor(a)===a||typeof a==="number"||typeof a==="boolean")return a
else{z=J.o(a)
if(!!z.$isN){y=[]
for(x=0;x<z.gl(a);++x)if(Z.fS(z.j(a,x)))y.push(Z.d1(z.j(a,x)))
return y}else if(!!z.$isH){w=new H.R(0,null,null,null,null,null,0,[null,null])
z.Z(a,new Z.nO(a,w))
return w}else if(!!z.$ise5){v=a.E()
v.n(0,"_class",a.gfV())
return Z.d1(v)}else throw H.c("Function _dissolveToPrimitivess called with a non-saveable argument type.")}},
d0:function(a,b,c){var z,y,x,w,v,u
if(a==null||typeof a==="string"||typeof a==="number"&&Math.floor(a)===a||typeof a==="number"||typeof a==="boolean")return a
else{z=J.o(a)
if(!!z.$isN){y=[]
for(x=0;x<z.gl(a);++x)y.push(Z.d0(z.j(a,x),b,null))
return y}else{w=!!z.$isH
if(w&&!a.ab("_class")){v=new H.R(0,null,null,null,null,null,0,[null,null])
z.Z(a,new Z.nN(b,v))
return v}else if(w&&a.ab("_class"))if(c!=null){c.hC(a)
return c}else{u=z.j(a,"_class")
if(!b.ab(u))throw H.c(new Z.dA("Constructor for "+H.b(u)+" not set. Cannot assemble a new instance."))
else return b.j(0,u).$1(a)}else throw H.c("Function _assembleFromPrimitives called with a non-primitive argument type.")}}},
nP:function(a,b,c){a.c.Z(0,new Z.nQ(b,c))}}},nO:{"^":"a:6;a,b",
$2:function(a,b){if(Z.fS(this.a.j(0,a)))this.b.n(0,a,Z.d1(b))}},nN:{"^":"a:6;a,b",
$2:function(a,b){this.b.n(0,a,Z.d0(b,this.a,null))}},nQ:{"^":"a:36;a,b",
$2:function(a,b){var z,y,x
z=this.a
y=z.j(0,a)
x=this.b
if(y==null)z.n(0,a,Z.d0(b,x,null))
else z.n(0,a,Z.d0(b,x,y))}},dA:{"^":"d;a",
k:function(a){return"IncompatibleSavegameException: "+this.a}},lU:{"^":"d;a",
k:function(a){return"InvalidSavegameException: "+this.a}}}],["","",,D,{"^":"",ni:{"^":"d;"},nh:{"^":"ni;"},m1:{"^":"nh;a,b,c,d,e,f,r,x",
lj:[function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
o=P.r
n=[o,P.d]
H.aL(a,"$isH",n,"$asH")
m=new A.u(a.j(0,"type"),null,null,null,null)
if(a.ab("strContent"))m.c=a.j(0,"strContent")
if(a.ab("listContent"))m.b=a.j(0,"listContent")
if(a.ab("intContent"))m.d=a.j(0,"intContent")
if(a.ab("mapContent"))m.e=H.aL(a.j(0,"mapContent"),"$isH",n,"$asH")
z=m
switch(z.ghA()){case 1070:o=this.e
if(o!=null){o.dz(new D.c4("Book Quit before choice was selected."))
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
if(!o.ab("__submitted__"))o.n(0,"__submitted__",!1)
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
o.bX(new U.co(C.C[k],j))
this.x=null
return
case 1010:o=new A.u(667,null,null,null,null)
o.c="Starting book from scratch."
n=this.a
n.F(o.E())
o=this.e
if(o!=null){o.dz(new D.c4("Book Restart before choice was selected."))
this.e=null}try{this.c.eV()}catch(i){y=H.B(i)
x=H.D(i)
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
if(h!=null){h.dz(new D.c4("Book Load before choice was selected."))
this.e=null}try{h=z.gi3()
f=new Z.fR(null,null,null,null,null,null)
e=H.aL(C.w.jE(h),"$isH",n,"$asH")
if(!e.ab("currentPageName")||!e.ab("vars"))H.i(new Z.lU("Invalid JSON for Savegame. Doesn't contain required fields 'currentPageName' or 'vars'. JSON='"+H.b(h)+"'."))
f.e=e.j(0,"uid")
f.a=e.j(0,"currentPageName")
f.f=e.j(0,"timestamp")
f.b=H.aL(e.j(0,"pageMapState"),"$isH",n,"$asH")
f.c=H.aL(e.j(0,"vars"),"$isH",n,"$asH")
if(e.ab("previousText"))f.d=e.j(0,"previousText")
w=f
v=H.aL(J.j1(z.geQ()),"$isbP",[o],"$asbP")
o=this.c
if(v!=null)o.hc(w,v)
else o.kw(w)}catch(i){o=H.B(i)
if(o instanceof Z.dA){u=o
t=H.D(i)
o=new A.u(666,null,null,null,null)
o.c="Load failed due to incompatibility: "+H.b(u)+".\n"+H.b(t)
g.F(o.E())
this.c.eV()}else{s=o
r=H.D(i)
o=new A.u(666,null,null,null,null)
o.c="Load failed for unknown reason: "+H.b(s)+".\n"+H.b(r)
g.F(o.E())
this.c.eV()}}try{o=new A.u(90,null,null,null,null)
o.b=Z.bR()
g.F(o.E())}catch(i){q=H.B(i)
p=H.D(i)
o=new A.u(666,null,null,null,null)
o.c="Sending Stats failed for unknown reason: "+H.b(q)+".\n"+H.b(p)
g.F(o.E())
throw H.c(q)}this.c.toString
g.F(new A.cY(0,$.$get$cx().a,null).dP().E())
return
case 1090:this.f.bX(!0)
this.f=null
return
case 1040:this.c.bA()
return
default:o=new A.u(666,null,null,null,null)
o.c="Wrong message type received by Scripter - "+H.b(z.ghA())+"."
this.a.F(o.E())}},"$1","giV",2,0,22],
f6:function(a){var z=P.a2
this.f=new P.cr(new P.G(0,$.q,null,[z]),[z])
z=new A.u(30,null,null,null,null)
z.c=a
this.a.F(z.E())
return this.f.a}},c4:{"^":"d;a",
k:function(a){return"AsyncOperationOverridenException: "+this.a+"."}}}],["","",,G,{"^":"",kj:{"^":"d;a",
E:function(){return P.ci(this.a,null,null)},
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
dO:function(){return C.w.h_(this.E())},
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
return z+(x.A(y,50)||x.A(y,60)||x.A(y,90)||x.A(y,100)||x.A(y,666)||x.A(y,667)?" (async)":"")}}}],["","",,E,{"^":"",mW:{"^":"d;h:a@,l6:b<",
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
return z}}}],["","",,L,{"^":"",aa:{"^":"d;f7:a@,b,c,d,b7:e<,I:f<,h1:r<,x,y",
gkn:function(){return this.e.length===0},
dB:function(a,b,c){if(this.a)return!1
if(this.e.length===0)return!1
b!=null
a!=null
if(c!=null&&c.$1(this)===!0)return!1
return!0},
km:function(a,b){return this.dB(a,b,null)},
l1:function(){return P.ag(["string",this.e,"hash",this.d,"submenu",this.y,"helpMessage",this.f])},
c3:function(a){this.r=a
return this},
bD:function(a,b){return C.b.bD(this.e,b.gb7())},
k:function(a){return"Choice: "+this.e+" ["+H.b(this.x)+"] ("+this.d+")"},
i7:function(a,b,c,d,e,f,g){if(a==null)throw H.c(P.F("String given to choice cannot be null."))
this.e=J.bh(a).eZ(a)
this.d=C.b.gB(a)
this.r=f
this.b=!1
this.c=!1},
$isV:1,
$asV:function(){return[L.aa]},
v:{
f_:function(a,b,c,d,e,f,g){var z=new L.aa(!1,null,null,null,null,e,null,d,g)
z.i7(a,!1,!1,d,e,f,g)
return z}}},f0:{"^":"fq;a,b",
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
this.a=a[0].$0()}catch(u){z=H.B(u)
v=M.eU(J.h(z))
throw H.c(v)}else this.a=null
for(v=this.b,t={func:1,ret:[P.Q,P.as]},s=1;s<a.length;++s){y=a[s]
x=null
if(J.az(y,"string")!=null&&!!J.o(J.az(y,"string")).$isbH)try{x=J.az(y,"string").$0()}catch(u){w=H.B(u)
v=M.eU(J.h(w))
throw H.c(v)}else x=""
r=x
q=J.az(y,"goto")
p=H.ih(J.az(y,"script"),t)
o=new L.aa(!1,null,null,null,null,null,null,q,J.az(y,"submenu"))
if(r==null)H.i(P.F("String given to choice cannot be null."))
o.e=J.bh(r).eZ(r)
o.d=C.b.gB(r)
o.r=p
o.b=!1
o.c=!1
C.a.q(v,o)}},
jp:function(a,b,c,d,e,f,g){if(b instanceof L.aa)C.a.q(this.b,b)
else if(typeof b==="string")C.a.q(this.b,L.f_(b,!1,!1,e,null,f,g))
else throw H.c(P.F("To add a choice to choices, one must provide either a new Choice element or a String."))},
q:function(a,b){return this.jp(a,b,!1,!1,null,null,null)},
l2:function(a,b,c,d){var z,y,x,w
z=this.b
y=H.m(z,0)
x=P.P(new H.L(z,new L.jY(b,a,c),[y]),!0,y)
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
return new H.ap(z,new L.k_(),[H.m(z,0),null]).cl(0,", ")},
$asfq:function(){return[L.aa]},
$asfz:function(){return[L.aa]},
$asN:function(){return[L.aa]},
$asZ:function(){return[L.aa]}},jY:{"^":"a:0;a,b,c",
$1:function(a){return a.dB(this.b,this.a,this.c)}},jZ:{"^":"a:0;a",
$1:function(a){H.b(a)
J.dp(this.a.b,a.l1())
a.a=!0}},k_:{"^":"a:0;",
$1:function(a){return H.b(a)}}}],["","",,Z,{"^":"",d3:{"^":"d;de:a<,b7:b<",
E:function(){return P.ag(["show",this.a,"string",this.b])}},oD:{"^":"d;a",
E:function(){var z=new H.R(0,null,null,null,null,null,0,[P.r,P.d])
this.a.Z(0,new Z.oE(z))
return z},
Z:function(a,b){this.a.Z(0,b)}},oE:{"^":"a:37;a",
$2:function(a,b){this.a.n(0,a,b.E())}},hv:{"^":"d;h:a@,aQ:b<,fW:c<,dH:d<,de:e<,hg:f<,b7:r<",v:{
hw:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=H.p(new Array(a.length),[Z.hv])
for(y=a.length,x=z.length,w=0,v=0;v<a.length;a.length===y||(0,H.ar)(a),++v){u=a[v]
t=J.K(u)
s=t.j(u,"name")
r=t.j(u,"description")
q=t.j(u,"color")
p=t.j(u,"priority")
o=t.j(u,"show")
n=t.j(u,"notifyOnChange")
t=t.j(u,"string")
if(w>=x)return H.f(z,w)
z[w]=new Z.hv(s,r,q,p,o,n,t);++w}C.a.cb(z,new Z.pB())
return z}}},pB:{"^":"a:6;",
$2:function(a,b){return J.bD(b.gdH(),a.gdH())}},au:{"^":"d;h:a<,aQ:b<,c,fW:d<,dH:e<,f,r,hg:x<,fT:y@,fV:z<,$ti",
gac:function(){return this.f},
sac:function(a){if(!J.e(this.f,a)){this.f=a
this.y=!0
$.cq=!0}},
gde:function(){return this.r},
gb7:function(){return this.c.$1(this.f)},
E:function(){return P.ag(["name",this.a,"value",this.f,"show",this.r])},
hC:function(a){var z
this.sac(H.iI(a.j(0,"value"),H.m(this,0)))
z=a.j(0,"show")
if(!J.e(this.r,z)){this.r=z
this.y=!0
$.cq=!0}},
$ise5:1,
v:{
bQ:function(a,b,c,d,e,f,g,h){var z,y
z=$.$get$d4()
y=z.ab(a)?H.aL(z.j(0,a),"$isau",[h],"$asau"):new Z.au(a,d,b,c,f,null,null,!0,!1,"Stat",[null])
y.f=H.iI(e,h)
y.r=!0
z.n(0,a,y)
return y},
oG:function(){var z,y
z=new Z.oD(new H.R(0,null,null,null,null,null,0,[P.r,Z.d3]))
y=$.$get$d4().gcv()
new H.L(y,new Z.oH(),[H.y(y,"A",0)]).Z(0,new Z.oI(z))
$.cq=!1
return z},
bR:function(){var z=H.p([],[[P.H,P.r,P.d]])
$.$get$d4().gcv().Z(0,new Z.oF(z))
return z}}},oH:{"^":"a:0;",
$1:function(a){return a.gfT()}},oI:{"^":"a:25;a",
$1:function(a){var z,y
z=a.gde()
y=a.gb7()
a.sfT(!1)
this.a.a.n(0,a.a,new Z.d3(z,y))}},oF:{"^":"a:25;a",
$1:function(a){var z=new H.R(0,null,null,null,null,null,0,[P.r,P.d])
z.n(0,"name",a.gh())
z.n(0,"description",a.gaQ())
z.n(0,"color",a.gfW())
z.n(0,"priority",a.gdH())
z.n(0,"show",a.gde())
z.n(0,"notifyOnChange",a.ghg())
z.n(0,"string",a.gb7())
this.a.push(z)}}}],["","",,N,{"^":"",dM:{"^":"d;h:a<,b,c,iv:d<,e,f",
gh3:function(){var z,y,x
z=this.b
y=z==null||J.e(z.gh(),"")
x=this.a
return y?x:z.gh3()+"."+x},
geP:function(){if($.ir){var z=this.b
if(z!=null)return z.geP()}return $.rE},
kx:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p,o
x=a.b
if(x>=this.geP().b){if(!!J.o(b).$isbH)b=b.$0()
w=b
if(typeof w!=="string"){v=b
b=J.h(b)}else v=null
if(d==null&&x>=$.uT.b)try{x="autogenerated stack trace for "+a.k(0)+" "+H.b(b)
throw H.c(x)}catch(u){z=H.B(u)
y=H.D(u)
d=y
if(c==null)c=z}e=$.q
x=b
w=this.gh3()
t=c
s=d
r=Date.now()
q=$.fr
$.fr=q+1
p=new N.ms(a,x,v,w,new P.cN(r,!1),q,t,s,e)
if($.ir)for(o=this;o!=null;){o.fF(p)
o=o.b}else $.$get$ft().fF(p)}},
cn:function(a,b,c,d){return this.kx(a,b,c,d,null)},
jY:function(a,b,c){return this.cn(C.U,a,b,c)},
ak:function(a){return this.jY(a,null,null)},
jX:function(a,b,c){return this.cn(C.T,a,b,c)},
bl:function(a){return this.jX(a,null,null)},
jW:function(a,b,c){return this.cn(C.V,a,b,c)},
bO:function(a){return this.jW(a,null,null)},
ke:function(a,b,c){return this.cn(C.B,a,b,c)},
ha:function(a){return this.ke(a,null,null)},
l7:function(a,b,c){return this.cn(C.Y,a,b,c)},
f0:function(a){return this.l7(a,null,null)},
hY:function(a,b,c){return this.cn(C.X,a,b,c)},
dX:function(a){return this.hY(a,null,null)},
fF:function(a){},
v:{
bn:function(a){return $.$get$fs().kK(a,new N.to(a))}}},to:{"^":"a:2;a",
$0:function(){var z,y,x,w
z=this.a
if(C.b.df(z,"."))H.i(P.F("name shouldn't start with a '.'"))
y=C.b.ku(z,".")
if(y===-1)x=z!==""?N.bn(""):null
else{x=N.bn(C.b.aJ(z,0,y))
z=C.b.bJ(z,y+1)}w=new H.R(0,null,null,null,null,null,0,[P.r,N.dM])
w=new N.dM(z,x,null,w,new P.hy(w,[null,null]),null)
if(x!=null)x.giv().n(0,z,w)
return w}},b_:{"^":"d;h:a<,ac:b<",
A:function(a,b){if(b==null)return!1
return b instanceof N.b_&&this.b===b.b},
aX:function(a,b){return C.e.aX(this.b,b.gac())},
d8:function(a,b){var z=b.gac()
if(typeof z!=="number")return H.x(z)
return this.b<=z},
bo:function(a,b){var z=b.gac()
if(typeof z!=="number")return H.x(z)
return this.b>z},
bS:function(a,b){return this.b>=b.gac()},
bD:function(a,b){var z=b.gac()
if(typeof z!=="number")return H.x(z)
return this.b-z},
gB:function(a){return this.b},
k:function(a){return this.a},
$isV:1,
$asV:function(){return[N.b_]}},ms:{"^":"d;eP:a<,b,aU:c<,d,U:e<,f,bu:r<,bq:x<,y",
k:function(a){return"["+this.a.a+"] "+this.d+": "+H.b(this.b)}}}],["","",,X,{"^":"",
bC:function(a){return X.de(J.iU(a,0,new X.uw()))},
b3:function(a,b){var z=J.an(a,b)
if(typeof z!=="number")return H.x(z)
a=536870911&z
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
de:function(a){if(typeof a!=="number")return H.x(a)
a=536870911&a+((67108863&a)<<3)
a^=a>>>11
return 536870911&a+((16383&a)<<15)},
uw:{"^":"a:6;",
$2:function(a,b){return X.b3(a,J.j(b))}},
dU:{"^":"cd;a,$ti",
gac:function(){var z=this.a
if(z==null)throw H.c(new P.w("value called on absent Optional."))
return z},
b1:function(a){var z=this.a
return z==null?a:z},
ga_:function(a){var z=this.a
if(z!=null){z=H.p([z],this.$ti)
z=new J.bk(z,1,0,null,[H.m(z,0)])}else z=C.J
return z},
gB:function(a){return J.j(this.a)},
A:function(a,b){var z,y
if(b==null)return!1
if(b instanceof X.dU){z=b.a
y=this.a
y=z==null?y==null:z===y
z=y}else z=!1
return z},
k:function(a){var z=this.a
return z==null?"Optional { absent }":"Optional { value: "+H.b(z)+" }"},
i9:function(a,b){if(this.a==null)throw H.c(P.F("Must not be null."))},
v:{
fD:function(a,b){var z=new X.dU(a,[b])
z.i9(a,b)
return z}}}}],["","",,U,{"^":"",d_:{"^":"d;a,b",
k:function(a){return this.b}},co:{"^":"d;a,l8:b<",
geM:function(){return this.a===C.F},
k:function(a){return"SessionResult<"+this.a.b+",wasRerolled="+H.b(this.b)+">"},
A:function(a,b){if(b==null)return!1
return b instanceof U.co&&b.a===this.a&&J.e(b.b,this.b)},
gB:function(a){return(this.b===!0?2:1)*100+this.a.a}}}],["","",,X,{"^":"",
xw:[function(a,b){var z,y,x,w,v
z=new D.m1(b,null,null,null,null,null,null,null)
y=$.fO
$.fO=y+1
x=new H.cm(y,null,!1)
w=init.globalState.d
w.e1(y,x)
w.cM()
w=new H.ny(x,null)
w.ib(x)
z.b=w
w=w.b
w.toString
new P.d7(w,[H.m(w,0)]).aG(z.giV(),null,null,null)
b.F(new H.cu(z.b.a,init.globalState.d.a))
v=N.nV()
z.c=v
v.Q=z},"$2","ib",4,0,34]},1]]
setupProgram(dart,0)
J.o=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.fh.prototype
return J.fg.prototype}if(typeof a=="string")return J.ch.prototype
if(a==null)return J.fi.prototype
if(typeof a=="boolean")return J.ff.prototype
if(a.constructor==Array)return J.cf.prototype
if(!(a instanceof P.d))return J.bt.prototype
return a}
J.aJ=function(a){if(a==null)return a
if(a.constructor==Array)return J.cf.prototype
if(!(a instanceof P.d))return J.bt.prototype
return a}
J.K=function(a){if(typeof a=="string")return J.ch.prototype
if(a==null)return a
if(a.constructor==Array)return J.cf.prototype
if(!(a instanceof P.d))return J.bt.prototype
return a}
J.al=function(a){if(typeof a=="number")return J.cg.prototype
if(a==null)return a
if(!(a instanceof P.d))return J.bt.prototype
return a}
J.ew=function(a){if(typeof a=="number")return J.cg.prototype
if(typeof a=="string")return J.ch.prototype
if(a==null)return a
if(!(a instanceof P.d))return J.bt.prototype
return a}
J.bh=function(a){if(typeof a=="string")return J.ch.prototype
if(a==null)return a
if(!(a instanceof P.d))return J.bt.prototype
return a}
J.an=function(a,b){if(typeof a=="number"&&typeof b=="number")return a+b
return J.ew(a).ai(a,b)}
J.b5=function(a,b){if(typeof a=="number"&&typeof b=="number")return a/b
return J.al(a).d6(a,b)}
J.e=function(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.o(a).A(a,b)}
J.a9=function(a,b){if(typeof a=="number"&&typeof b=="number")return a>b
return J.al(a).bo(a,b)}
J.c1=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<b
return J.al(a).aX(a,b)}
J.c2=function(a,b){if(typeof a=="number"&&typeof b=="number")return a*b
return J.ew(a).c8(a,b)}
J.iS=function(a){if(typeof a=="number")return-a
return J.al(a).f4(a)}
J.bD=function(a,b){if(typeof a=="number"&&typeof b=="number")return a-b
return J.al(a).aq(a,b)}
J.az=function(a,b){if(typeof b==="number")if(a.constructor==Array||typeof a=="string")if(b>>>0===b&&b<a.length)return a[b]
return J.K(a).j(a,b)}
J.dp=function(a,b){return J.aJ(a).q(a,b)}
J.iT=function(a,b,c,d,e,f,g,h,i,j,k,l,m,n){return J.aJ(a).ji(a,b,c,d,e,f,g,h,i,j,k,l,m,n)}
J.eM=function(a,b,c){return J.aJ(a).t(a,b,c)}
J.bE=function(a,b){return J.ew(a).bD(a,b)}
J.eN=function(a,b){return J.K(a).a7(a,b)}
J.eO=function(a,b){return J.aJ(a).as(a,b)}
J.iU=function(a,b,c){return J.aJ(a).bv(a,b,c)}
J.j=function(a){return J.o(a).gB(a)}
J.eP=function(a){return J.K(a).gW(a)}
J.ai=function(a){return J.aJ(a).ga_(a)}
J.iV=function(a){return J.aJ(a).gw(a)}
J.aM=function(a){return J.K(a).gl(a)}
J.iW=function(a){return J.o(a).gby(a)}
J.iX=function(a,b){return J.K(a).b_(a,b)}
J.eQ=function(a,b){return J.aJ(a).aH(a,b)}
J.iY=function(a,b,c){return J.bh(a).hd(a,b,c)}
J.dq=function(a,b,c){return J.bh(a).kO(a,b,c)}
J.cC=function(a,b,c){return J.bh(a).d_(a,b,c)}
J.iZ=function(a){return J.al(a).hv(a)}
J.j_=function(a,b){return J.aJ(a).dZ(a,b)}
J.eR=function(a,b){return J.bh(a).df(a,b)}
J.j0=function(a,b,c){return J.bh(a).aJ(a,b,c)}
J.j1=function(a){return J.aJ(a).bG(a)}
J.h=function(a){return J.o(a).k(a)}
J.c3=function(a,b){return J.al(a).bg(a,b)}
J.j2=function(a,b){return J.aJ(a).c6(a,b)}
I.aX=function(a){a.immutable$list=Array
a.fixed$length=Array
return a}
var $=I.p
C.M=J.aZ.prototype
C.a=J.cf.prototype
C.N=J.ff.prototype
C.u=J.fg.prototype
C.e=J.fh.prototype
C.O=J.fi.prototype
C.j=J.cg.prototype
C.b=J.ch.prototype
C.G=new A.ao(0,0,0)
C.H=new A.ao(-1/0,-1/0,-1/0)
C.I=new A.cE(-10,0,100)
C.J=new H.l6([null])
C.K=new P.mV()
C.v=new P.qw()
C.L=new P.qP()
C.i=new P.r3()
C.x=new P.b8(0)
C.y=new U.cT(0,"ItemType.fist")
C.z=new U.cT(1,"ItemType.shield")
C.r=new U.cT(2,"ItemType.spear")
C.A=new U.cT(3,"ItemType.sword")
C.P=function getTagFallback(o) {
  var s = Object.prototype.toString.call(o);
  return s.substring(8, s.length - 1);
}
C.w=new P.m6(null,null)
C.Q=new P.m8(null)
C.R=new P.m9(null,null)
C.S=new O.mh(0,"KnownToMode.all")
C.T=new N.b_("FINER",400)
C.U=new N.b_("FINEST",300)
C.V=new N.b_("FINE",500)
C.B=new N.b_("INFO",800)
C.W=new N.b_("OFF",2000)
C.X=new N.b_("SEVERE",1000)
C.Y=new N.b_("WARNING",900)
C.F=new U.d_(0,"Result.success")
C.a6=new U.d_(1,"Result.failure")
C.a7=new U.d_(2,"Result.criticalSuccess")
C.a8=new U.d_(3,"Result.criticalFailure")
C.C=I.aX([C.F,C.a6,C.a7,C.a8])
C.Z=I.aX(["cave_with_agruth","guardpost_above_church","orcthorn_room","slave_quarters_passage","smelter","underground_church","war_forge"])
C.a_=I.aX([C.y])
C.a0=I.aX([C.z])
C.D=I.aX([C.r])
C.o=I.aX([C.A])
C.d=I.aX([])
C.a1=I.aX(['Briana spits on the floor. "Can\'t wait to see some actual architecture \n  when we get out of here."',"Somewhere in the distance, there are yells that rise in intensity, \n  then suddenly stop entirely.",'Briana turns to you with an intense whisper. \n  "You know, I _have_ a right to hate orcs." \n  \n  "I didn\'t know people need to have a right to hate them, to be honest." \n  \n  She observes you for a moment. "I\'m glad we are in agreement."',"More yells from the distance.","Briana stops and listens for a moment. \"Aren, we're pushing our luck. \n  I'd hate to go all this way only to get \n  my head smashed in by some random orc patrol."])
C.a2=new H.k8(0,{},C.d,[null,null])
C.a3=new X.dU(null,[P.M])
C.k=new R.dX(0,"Pose.standing")
C.h=new R.dX(1,"Pose.offBalance")
C.f=new R.dX(2,"Pose.onGround")
C.l=new K.dY(0,"Predetermination.none")
C.p=new K.dY(1,"Predetermination.successGuaranteed")
C.m=new K.dY(2,"Predetermination.failureGuaranteed")
C.t=new Y.cj("he","him","his","himself")
C.n=new Y.cj("it","it","its","itself")
C.a4=new Y.cj("she","her","her","herself")
C.a5=new Y.cj("they","them","their","themselves")
C.E=new Y.cj("you","you","your","yourself")
C.c=new Q.nD(0,"Resource.stamina")
C.a9=H.bf("fj")
C.aa=H.bf("as")
C.ab=H.bf("r")
C.ac=H.bf("a2")
C.ad=H.bf("aW")
C.q=H.bf("dynamic")
C.ae=H.bf("t")
C.af=H.bf("M")
C.ag=new P.bU(null,2)
$.fO=1
$.fH="$cachedFunction"
$.fI="$cachedInvocation"
$.aN=0
$.bF=null
$.eW=null
$.bw=null
$.bX=null
$.bY=null
$.en=!1
$.q=C.i
$.f8=0
$.ex=null
$.hT=!1
$.rw=null
$.hV=!1
$.is=!0
$.cq=!1
$.ir=!1
$.uT=C.W
$.rE=C.B
$.fr=0
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
I.$lazy(y,x,w)}})(["fc","$get$fc",function(){return H.m_()},"fd","$get$fd",function(){if(typeof WeakMap=="function")var z=new WeakMap()
else{z=$.f8
$.f8=z+1
z="expando$key$"+z}return new P.lc(null,z,[P.t])},"hk","$get$hk",function(){return H.aQ(H.d6({
toString:function(){return"$receiver$"}}))},"hl","$get$hl",function(){return H.aQ(H.d6({$method$:null,
toString:function(){return"$receiver$"}}))},"hm","$get$hm",function(){return H.aQ(H.d6(null))},"hn","$get$hn",function(){return H.aQ(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"hr","$get$hr",function(){return H.aQ(H.d6(void 0))},"hs","$get$hs",function(){return H.aQ(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"hp","$get$hp",function(){return H.aQ(H.hq(null))},"ho","$get$ho",function(){return H.aQ(function(){try{null.$method$}catch(z){return z.message}}())},"hu","$get$hu",function(){return H.aQ(H.hq(void 0))},"ht","$get$ht",function(){return H.aQ(function(){try{(void 0).$method$}catch(z){return z.message}}())},"ed","$get$ed",function(){return P.qe()},"bm","$get$bm",function(){var z,y
z=P.as
y=new P.G(0,P.pR(),null,[z])
y.ik(null,z)
return y},"bZ","$get$bZ",function(){return[]},"di","$get$di",function(){return new K.cb("fist",P.aC(C.a_,null))},"bL","$get$bL",function(){return N.bn("PlannerRecommendation")},"id","$get$id",function(){return new K.rQ()},"eu","$get$eu",function(){var z=$.$get$id()
return K.a_("__END_OF_ROAM__",z,z,null,null,[],"ground")},"a7","$get$a7",function(){return P.e2(null)},"bN","$get$bN",function(){return P.e2(null)},"iu","$get$iu",function(){return N.bn("Storyline")},"h8","$get$h8",function(){return P.bq("(\\w)([\\.\\?\\!])([\"'])\\.(?=$|\\s)",!0,!1)},"bA","$get$bA",function(){return L.ec(new L.tm())},"aY","$get$aY",function(){return L.ec(new L.ts())},"eA","$get$eA",function(){return L.ec(new L.tl())},"dV","$get$dV",function(){return new F.n_("Sometimes, patience pays off. Especially when the other option is potentially dangerous.",!1,!0,!1,null,null)},"es","$get$es",function(){return Y.c8(!1,"balance",!0,C.n,$.$get$aY())},"iz","$get$iz",function(){return Y.c8(!1,"pounding",!1,C.n,$.$get$aY())},"fP","$get$fP",function(){return new B.nB("Most moves are easier and more effective when you are firmly in balance.",!1,!0,!1,null,null)},"fT","$get$fT",function(){return new O.nR(null,!1,!0,!1,null,null)},"h7","$get$h7",function(){return new Q.oz(null,!1,!0,!0,C.c,null)},"hx","$get$hx",function(){return new M.pC("",!0,C.c,!1,!0,null)},"hU","$get$hU",function(){return P.e2(null)},"eV","$get$eV",function(){return new Z.jB(!1,!0,!1,null,null)},"iL","$get$iL",function(){return Y.c8(!1,"swing",!0,C.n,$.$get$aY())},"iK","$get$iK",function(){return Y.c8(!1,"swing",!0,C.n,$.$get$aY())},"iJ","$get$iJ",function(){return Y.c8(!1,"swing",!0,C.n,$.$get$aY())},"fF","$get$fF",function(){return X.fD(0,P.M)},"fG","$get$fG",function(){return X.fD(1,P.M)},"h1","$get$h1",function(){return new D.ov(!1,!1,!0,null,null)},"iw","$get$iw",function(){return G.pd(!1,!0,"Orcthorn",!0,2,2)},"er","$get$er",function(){return new O.pD(1e4)},"i7","$get$i7",function(){return K.a_("cave_with_agruth_pre",new V.th(),new V.ti(),null,null,H.p([new Q.v("cave_with_agruth","","You look around.",null)],[Q.v]),"ground")},"i6","$get$i6",function(){return K.a_("cave_with_agruth",new V.tf(),new V.tg(),null,null,H.p([new Q.v("underground_church","Go to the Unholy Church","You make it to the Church undetected.",null),new Q.v("war_forge","Go to the war forges","You sneak your way through the black passage, closing towards the sound of hundreds of anvils.",null),new Q.v("slave_quarters_passage","Go to the slave quarters","You and Briana hug the wall and start towards the slave quarters.",null)],[Q.v]),"ground")},"fU","$get$fU",function(){return new V.og("Search Agruth","search_agruth",!0,null)},"ie","$get$ie",function(){return K.a_("exit_from_bloodrock",new V.td(),new V.te(),null,null,H.p([new Q.v("__END_OF_ROAM__","Go forth (UNIMPLEMENTED)","You head down.",null)],[Q.v]),"ground")},"ig","$get$ig",function(){return K.a_("forge_church_crevice",new V.ta(),new V.tb(),null,null,H.p([new Q.v("tunnel","Continue along the crevice","You continue until the crevice open into a tunnel. You can smell fresh air.",null)],[Q.v]),"ground")},"iq","$get$iq",function(){return K.a_("guardpost_above_church",new V.t8(),new V.t9(),null,null,H.p([new Q.v("underground_church","Descend towards the Underground Church","You take the passage leading down towards the temple.",null),new Q.v("tunnel","Go to the upper gate","You take the passage that leads upwards.",null),new Q.v("smelter","Go to the smelter","You take the slightly downwards passage towards the smelter.",null)],[Q.v]),"ground")},"fb","$get$fb",function(){return new V.lG("Cautiously take the shield","guardpost_above_church_take_shield",!0,null)},"it","$get$it",function(){return K.a_("just_after_agruth_fight",new V.t6(),new V.t7(),null,null,H.p([],[Q.v]),"ground")},"fw","$get$fw",function(){return new V.mB('"Luck Bringer"',"name_agruth_sword_opportunity",!0,null)},"fx","$get$fx",function(){return new V.mC('"Savior"',"name_agruth_sword_redemption",!0,null)},"fv","$get$fv",function(){return new V.mA("No name","name_agruth_sword_nothing",!0,null)},"ix","$get$ix",function(){return K.a_("orcthorn_door",new V.t4(),new V.t5(),null,null,H.p([new Q.v("cave_with_agruth","Go to the cave with Agruth's corpse","You back out from the door, and go back where you left Agruth's body.",null),new Q.v("slave_quarters","Go further towards the Gate of Screams","TODO",null),new Q.v("orcthorn_room","Open the door","You open the door.",null)],[Q.v]),"ground")},"iy","$get$iy",function(){return K.a_("orcthorn_room",new V.t2(),new V.t3(),O.wB(),null,H.p([new Q.v("orcthorn_door","Exit the room","You go through the door. Once back in the corridor of the slave quarters, you close it behind you.",null)],[Q.v]),"ground")},"hd","$get$hd",function(){return new V.pl("Search for Orcthorn","take_orcthorn",!0,null)},"iA","$get$iA",function(){return K.a_("slave_quarters",new V.t_(),new V.t0(),null,null,H.p([],[Q.v]),"ground")},"h_","$get$h_",function(){return new V.ot("Continue","slave_quarters_continue",!0,null)},"iB","$get$iB",function(){return K.a_("slave_quarters_passage",new V.rY(),new V.rZ(),O.wC(),null,H.p([new Q.v("cave_with_agruth","Go back to the cave with Agruth's corpse","You back out from the door, and go back where you left Agruth's body.",null),new Q.v("slave_quarters","Go further towards the Gate of Screams","TODO",null),new Q.v("orcthorn_room","Open the door","You open the door.",null)],[Q.v]),"ground")},"h0","$get$h0",function(){return new V.ou("Examine the door","slave_quarters_passage_examine_door",!0,null)},"iC","$get$iC",function(){return K.a_("smelter",new V.rW(),new V.rX(),null,null,H.p([new Q.v("war_forge","Go to the war forges","You walk through a short passage set in stone, towards the sound of hundreds of anvils.",null),new Q.v("guardpost_above_church","Go through the smooth passage","You take the smooth passage and it leads you slightly upwards.",null)],[Q.v]),"ground")},"h2","$get$h2",function(){return new V.ox("Look around","smelter_look_around",!0,null)},"h3","$get$h3",function(){return new V.oy("Throw spear at the ogre","smelter_throw_spear",!0,null)},"iD","$get$iD",function(){return K.a_("start_adventure",new V.rU(),new V.rV(),O.wz(),null,H.p([new Q.v("just_after_agruth_fight","","You look around. Fortunately, nobody is in sight.",null)],[Q.v]),"ground")},"hf","$get$hf",function(){return new V.pn("Talk to Briana","talk_to_briana_1",!0,null)},"hg","$get$hg",function(){return new V.po("Talk to Briana","talk_to_briana_2",!0,null)},"hh","$get$hh",function(){return new V.pp("Talk to Briana","talk_to_briana_3",!0,null)},"iM","$get$iM",function(){return K.a_("the_shafts",new V.rS(),new V.rT(),null,null,H.p([new Q.v("tunnel","Run","You run over the passage. Orcs start to scream and yell commands. As you near the entrance, the air gets better.",null)],[Q.v]),"ground")},"iO","$get$iO",function(){return K.a_("tunnel",new V.tJ(),new V.tK(),O.wA(),null,H.p([new Q.v("exit_from_bloodrock","Start running again","You start running again.",null)],[Q.v]),"ground")},"iP","$get$iP",function(){return K.a_("underground_church",new V.ty(),new V.tI(),null,null,H.p([new Q.v("guardpost_above_church","Enter the passage","You take the sloping passage and go a long, slightly rising way.",null),new Q.v("cave_with_agruth","Go back to the cave with Agruth's corpse","You sneak out of the church, back towards where you left Agruth's body.",null),new Q.v("underground_church_altar","Go towards the altar","You sneak towards the front of the temple, trying to stay in the shadows.",null)],[Q.v]),"ground")},"f7","$get$f7",function(){return new V.lb("Look around","examine_underground_church",!0,null)},"iQ","$get$iQ",function(){return K.a_("underground_church_altar",new V.tc(),new V.tn(),null,null,H.p([new Q.v("underground_church","Sneak back","You keep low and, keeping an eye on the altar, head back to the Church's entrance.",null)],[Q.v]),"ground")},"hz","$get$hz",function(){return new V.pF("Wait","wait_for_ritual",!0,null)},"he","$get$he",function(){return new V.pm("Take the spear","take_spear_in_underground_church",!0,null)},"iR","$get$iR",function(){return K.a_("war_forge",new V.rR(),new V.t1(),null,null,H.p([new Q.v("smelter","Go to smelter","You keep low, ascending the stairs. At the top you sense a draft of hot air coming from a passage through the wall. You make your way through it.",null),new Q.v("cave_with_agruth","Go back to the cave with Agruth's corpse","You sneak back towards where you left Agruth's body.",null)],[Q.v]),"ground")},"hA","$get$hA",function(){return new V.pG("Look around","war_forge_look_around",!0,null)},"hB","$get$hB",function(){return new V.pH("Watch the workers","war_forge_watch_workers",!0,null)},"i1","$get$i1",function(){return H.p([$.$get$i7(),$.$get$i6(),$.$get$ie(),$.$get$ig(),$.$get$iq(),$.$get$it(),$.$get$ix(),$.$get$iy(),$.$get$iA(),$.$get$iB(),$.$get$iC(),$.$get$iD(),$.$get$iM(),$.$get$iO(),$.$get$iP(),$.$get$iQ(),$.$get$iR()],[K.cn])},"i0","$get$i0",function(){return H.p([$.$get$fU(),$.$get$fb(),$.$get$fw(),$.$get$fx(),$.$get$fv(),$.$get$hd(),$.$get$h_(),$.$get$h0(),$.$get$h2(),$.$get$h3(),$.$get$hf(),$.$get$hg(),$.$get$hh(),$.$get$f7(),$.$get$hz(),$.$get$he(),$.$get$hA(),$.$get$hB()],[A.W])},"dn","$get$dn",function(){return P.pb("")},"cx","$get$cx",function(){var z=new O.nc(0,null,"PointsCounter")
z.ia()
return z},"c_","$get$c_",function(){return new L.f0(null,H.p([],[L.aa]))},"cB","$get$cB",function(){return H.fm(P.r,P.d)},"cw","$get$cw",function(){return P.bb(null,{func:1,ret:[P.Q,P.as]})},"cL","$get$cL",function(){return P.bq("^\\s*<<<\\s*$",!0,!1)},"d4","$get$d4",function(){return H.fm(P.r,Z.au)},"ft","$get$ft",function(){return N.bn("")},"fs","$get$fs",function(){return P.dK(P.r,N.dM)}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=[null,!1]
init.types=[{func:1,args:[,]},{func:1,ret:P.r,args:[R.I,A.ad,Y.a1]},{func:1},{func:1,args:[,,,]},{func:1,ret:Q.z,args:[R.I]},{func:1,args:[R.I,A.ad,Y.a1]},{func:1,args:[,,]},{func:1,v:true},{func:1,v:true,args:[R.I,A.ad,Y.a1,R.I,S.ac]},{func:1,args:[P.t]},{func:1,ret:U.cQ,args:[A.ad,F.J,[P.A,R.I]]},{func:1,v:true,args:[R.I,A.ad,Y.a1,R.I,,]},{func:1,ret:P.r,args:[P.t]},{func:1,v:true,args:[{func:1,v:true}]},{func:1,args:[U.ca]},{func:1,v:true,args:[P.r]},{func:1,v:true,args:[P.d],opt:[P.b1]},{func:1,ret:Q.cc,args:[U.ab]},{func:1,args:[P.aW]},{func:1,ret:P.Q},{func:1,ret:P.M,args:[A.ao]},{func:1,args:[,P.b1]},{func:1,v:true,args:[P.d]},{func:1,ret:Y.aO,args:[P.t]},{func:1,ret:P.r,args:[P.r]},{func:1,args:[Z.au]},{func:1,args:[,,,,]},{func:1,args:[R.I]},{func:1,args:[P.M,R.I]},{func:1,ret:P.a2,args:[P.t]},{func:1,args:[P.bo]},{func:1,args:[Y.ah]},{func:1,v:true,args:[P.t]},{func:1,ret:P.a2,args:[L.aa]},{func:1,v:true,args:[[P.N,P.r],P.fV]},{func:1,args:[L.aa]},{func:1,args:[P.r,,]},{func:1,args:[P.r,Z.d3]},{func:1,args:[[P.N,Y.ah],Y.ah]},{func:1,ret:P.M,args:[A.cE]},{func:1,ret:P.t,args:[P.V,P.V]},{func:1,ret:P.r,args:[Q.af]},{func:1,ret:P.M,args:[P.M,P.M]},{func:1,ret:P.t,args:[P.t,P.t]},{func:1,ret:[P.Q,U.co],args:[P.aW,P.r],named:{rerollEffectDescription:P.r,rerollable:P.a2}},{func:1,args:[{func:1,v:true}]},{func:1,v:true,args:[,P.b1]},{func:1,v:true,args:[P.d,P.b1]},{func:1,ret:Q.c9,args:[Q.v]},{func:1,args:[,],opt:[,]},{func:1,args:[P.t,,]},{func:1,ret:L.aa,args:[P.r],named:{deferToChoiceList:P.a2,deferToEndOfPage:P.a2,goto:P.r,helpMessage:P.r,script:{func:1,ret:[P.Q,P.as]},submenu:P.r}},{func:1,args:[P.a2]}]
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
if(x==y)H.wv(d||a)
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
if(typeof dartMainRunner==="function")dartMainRunner(function(b){H.iE(X.ib(),b)},[])
else (function(b){H.iE(X.ib(),b)})([])})})()