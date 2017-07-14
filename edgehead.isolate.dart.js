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
if(b5.$isaR)b5.$deferredAction()}var a3=Object.keys(a4.pending)
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
if(a0==="w"){processStatics(init.statics[b1]=b2.w,b3)
delete b2.w}else if(a1===43){w[g]=a0.substring(1)
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
e.$callName=null}}function tearOffGetter(c,d,e,f){return f?new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"(x) {"+"if (c === null) c = "+"H.eh"+"("+"this, funcs, reflectionInfo, false, [x], name);"+"return new c(this, funcs[0], x, name);"+"}")(c,d,e,H,null):new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"() {"+"if (c === null) c = "+"H.eh"+"("+"this, funcs, reflectionInfo, false, [], name);"+"return new c(this, funcs[0], null, name);"+"}")(c,d,e,H,null)}function tearOff(c,d,e,f,a0){var g
return e?function(){if(g===void 0)g=H.eh(this,c,d,true,[],f).prototype
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
x.push([p,o,i,h,n,j,k,m])}finishClasses(s)}I.b4=function(){}
var dart=[["","",,H,{"^":"",uL:{"^":"d;a"}}],["","",,J,{"^":"",
n:function(a){return void 0},
aR:{"^":"d;",
u:function(a,b){return a===b},
gv:function(a){return H.az(a)},
k:function(a){return H.cK(a)},
gbk:function(a){return new H.ar(H.hS(a),null)}},
eY:{"^":"aR;",
k:function(a){return String(a)},
gv:function(a){return a?519018:218159},
gbk:function(a){return C.a6},
$isY:1},
f_:{"^":"aR;",
u:function(a,b){return null==b},
k:function(a){return"null"},
gv:function(a){return 0},
gbk:function(a){return C.a4},
$isao:1},
f2:{"^":"aR;",
gv:function(a){return 0},
gbk:function(a){return C.a3},
k:function(a){return String(a)},
$isf0:1},
uR:{"^":"f2;"},
bi:{"^":"f2;"},
c_:{"^":"aR;$ti",
fD:function(a,b){if(!!a.immutable$list)throw H.c(new P.P(b))},
cA:function(a,b){if(!!a.fixed$length)throw H.c(new P.P(b))},
q:function(a,b){this.cA(a,"add")
a.push(b)},
kn:function(a){this.cA(a,"removeLast")
if(a.length===0)throw H.c(H.aE(a,-1))
return a.pop()},
a8:function(a,b){var z
this.cA(a,"remove")
for(z=0;z<a.length;++z)if(J.h(a[z],b)){a.splice(z,1)
return!0}return!1},
iD:function(a,b,c){var z,y,x,w,v
z=[]
y=a.length
for(x=0;x<y;++x){w=a[x]
if(b.$1(w)!==!0===c)z.push(w)
if(a.length!==y)throw H.c(new P.B(a))}v=z.length
if(v===y)return
this.sl(a,v)
for(x=0;x<z.length;++x)a[x]=z[x]},
bY:function(a,b){return new H.K(a,b,[H.m(a,0)])},
ao:function(a,b){var z
this.cA(a,"addAll")
for(z=J.ah(b);z.t();)a.push(z.gF())},
L:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){b.$1(a[y])
if(a.length!==z)throw H.c(new P.B(a))}},
aP:function(a,b){return new H.aj(a,b,[H.m(a,0),null])},
dM:function(a,b){return H.fN(a,b,null,H.m(a,0))},
bh:function(a,b,c){var z,y,x
z=a.length
for(y=b,x=0;x<z;++x){y=c.$2(y,a[x])
if(a.length!==z)throw H.c(new P.B(a))}return y},
b6:function(a,b,c){var z,y,x
z=a.length
for(y=0;y<z;++y){x=a[y]
if(b.$1(x)===!0)return x
if(a.length!==z)throw H.c(new P.B(a))}throw H.c(H.aa())},
dl:function(a,b){return this.b6(a,b,null)},
ap:function(a,b){if(b>>>0!==b||b>=a.length)return H.e(a,b)
return a[b]},
geq:function(a){if(a.length>0)return a[0]
throw H.c(H.aa())},
gE:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.c(H.aa())},
gc1:function(a){var z=a.length
if(z===1){if(0>=z)return H.e(a,0)
return a[0]}if(z===0)throw H.c(H.aa())
throw H.c(H.dn())},
aQ:function(a,b,c,d,e){var z,y,x
this.fD(a,"setRange")
P.c5(b,c,a.length,null,null,null)
z=c-b
if(z===0)return
if(e<0)H.f(P.a_(e,0,null,"skipCount",null))
if(e+z>d.length)throw H.c(H.eX())
if(e<b)for(y=z-1;y>=0;--y){x=e+y
if(x>>>0!==x||x>=d.length)return H.e(d,x)
a[b+y]=d[x]}else for(y=0;y<z;++y){x=e+y
if(x>>>0!==x||x>=d.length)return H.e(d,x)
a[b+y]=d[x]}},
bO:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){if(b.$1(a[y])===!0)return!0
if(a.length!==z)throw H.c(new P.B(a))}return!1},
cg:function(a,b){var z
this.fD(a,"sort")
z=b==null?P.rA():b
H.c9(a,0,a.length-1,z)},
eR:function(a){return this.cg(a,null)},
bE:function(a,b,c){var z
if(c>=a.length)return-1
for(z=c;z<a.length;++z)if(J.h(a[z],b))return z
return-1},
aN:function(a,b){return this.bE(a,b,0)},
a1:function(a,b){var z
for(z=0;z<a.length;++z)if(J.h(a[z],b))return!0
return!1},
gK:function(a){return a.length===0},
gal:function(a){return a.length!==0},
k:function(a){return P.bZ(a,"[","]")},
bx:function(a){return P.aZ(a,H.m(a,0))},
gX:function(a){return new J.b7(a,a.length,0,null,[H.m(a,0)])},
gv:function(a){return H.az(a)},
gl:function(a){return a.length},
sl:function(a,b){this.cA(a,"set length")
if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(P.cq(b,"newLength",null))
if(b<0)throw H.c(P.a_(b,0,null,"newLength",null))
a.length=b},
i:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(H.aE(a,b))
if(b>=a.length||b<0)throw H.c(H.aE(a,b))
return a[b]},
n:function(a,b,c){if(!!a.immutable$list)H.f(new P.P("indexed set"))
if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(H.aE(a,b))
if(b>=a.length||b<0)throw H.c(H.aE(a,b))
a[b]=c},
$iscG:1,
$ascG:I.b4,
$isL:1,
$isV:1},
uK:{"^":"c_;$ti"},
b7:{"^":"d;a,b,c,d,$ti",
gF:function(){return this.d},
t:function(){var z,y,x
z=this.a
y=z.length
if(this.b!==y)throw H.c(H.al(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z[x]
this.c=x+1
return!0}},
c0:{"^":"aR;",
bs:function(a,b){var z
if(typeof b!=="number")throw H.c(H.Q(b))
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){z=this.gdn(b)
if(this.gdn(a)===z)return 0
if(this.gdn(a))return-1
return 1}return 0}else if(isNaN(a)){if(isNaN(b))return 0
return 1}else return-1},
gdn:function(a){return a===0?1/a<0:a<0},
hb:function(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw H.c(new P.P(""+a+".round()"))},
bW:function(a,b){var z
if(b>20)throw H.c(P.a_(b,0,20,"fractionDigits",null))
z=a.toFixed(b)
if(a===0&&this.gdn(a))return"-"+z
return z},
kG:function(a,b){var z,y,x,w
if(b<2||b>36)throw H.c(P.a_(b,2,36,"radix",null))
z=a.toString(b)
if(C.b.cB(z,z.length-1)!==41)return z
y=/^([\da-z]+)(?:\.([\da-z]+))?\(e\+(\d+)\)$/.exec(z)
if(y==null)H.f(new P.P("Unexpected toString result: "+z))
x=J.H(y)
z=x.i(y,1)
w=+x.i(y,3)
if(x.i(y,2)!=null){z+=x.i(y,2)
w-=x.i(y,2).length}return z+C.b.c_("0",w)},
k:function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gv:function(a){return a&0x1FFFFFFF},
eN:function(a){return-a},
a6:function(a,b){if(typeof b!=="number")throw H.c(H.Q(b))
return a+b},
aw:function(a,b){if(typeof b!=="number")throw H.c(H.Q(b))
return a-b},
cX:function(a,b){if(typeof b!=="number")throw H.c(H.Q(b))
return a/b},
c_:function(a,b){if(typeof b!=="number")throw H.c(H.Q(b))
return a*b},
bB:function(a,b){return(a|0)===a?a/b|0:this.iM(a,b)},
iM:function(a,b){var z=a/b
if(z>=-2147483648&&z<=2147483647)return z|0
if(z>0){if(z!==1/0)return Math.floor(z)}else if(z>-1/0)return Math.ceil(z)
throw H.c(new P.P("Result of truncating division is "+H.b(z)+": "+H.b(a)+" ~/ "+b))},
dd:function(a,b){var z
if(a>0)z=b>31?0:a>>>b
else{z=b>31?31:b
z=a>>z>>>0}return z},
aJ:function(a,b){if(typeof b!=="number")throw H.c(H.Q(b))
return a<b},
bp:function(a,b){if(typeof b!=="number")throw H.c(H.Q(b))
return a>b},
bZ:function(a,b){if(typeof b!=="number")throw H.c(H.Q(b))
return a<=b},
bI:function(a,b){if(typeof b!=="number")throw H.c(H.Q(b))
return a>=b},
gbk:function(a){return C.a9},
$isJ:1},
eZ:{"^":"c0;",
gbk:function(a){return C.a8},
$isaO:1,
$isJ:1,
$isu:1},
l1:{"^":"c0;",
gbk:function(a){return C.a7},
$isaO:1,
$isJ:1},
c1:{"^":"aR;",
cB:function(a,b){if(b<0)throw H.c(H.aE(a,b))
if(b>=a.length)H.f(H.aE(a,b))
return a.charCodeAt(b)},
ck:function(a,b){if(b>=a.length)throw H.c(H.aE(a,b))
return a.charCodeAt(b)},
df:function(a,b,c){if(c>b.length)throw H.c(P.a_(c,0,b.length,null,null))
return new H.q0(b,a,c)},
ek:function(a,b){return this.df(a,b,0)},
fV:function(a,b,c){var z,y
if(c<0||c>b.length)throw H.c(P.a_(c,0,b.length,null,null))
z=a.length
if(c+z>b.length)return
for(y=0;y<z;++y)if(this.cB(b,c+y)!==this.ck(a,y))return
return new H.fM(c,b,a)},
a6:function(a,b){if(typeof b!=="string")throw H.c(P.cq(b,null,null))
return a+b},
eo:function(a,b){var z,y
z=b.length
y=a.length
if(z>y)return!1
return b===this.bz(a,y-z)},
kp:function(a,b,c){H.bo(c)
return H.o(a,b,c)},
kq:function(a,b,c,d){H.bo(c)
P.ml(d,0,a.length,"startIndex",null)
return H.ia(a,b,c,d)},
cM:function(a,b,c){return this.kq(a,b,c,0)},
hH:function(a,b,c){var z
if(c>a.length)throw H.c(P.a_(c,0,a.length,null,null))
if(typeof b==="string"){z=c+b.length
if(z>a.length)return!1
return b===a.substring(c,z)}return J.it(b,a,c)!=null},
d2:function(a,b){return this.hH(a,b,0)},
aB:function(a,b,c){if(c==null)c=a.length
if(typeof c!=="number"||Math.floor(c)!==c)H.f(H.Q(c))
if(b<0)throw H.c(P.c4(b,null,null))
if(typeof c!=="number")return H.v(c)
if(b>c)throw H.c(P.c4(b,null,null))
if(c>a.length)throw H.c(P.c4(c,null,null))
return a.substring(b,c)},
bz:function(a,b){return this.aB(a,b,null)},
eJ:function(a){var z,y,x,w,v
z=a.trim()
y=z.length
if(y===0)return z
if(this.ck(z,0)===133){x=J.dp(z,1)
if(x===y)return""}else x=0
w=y-1
v=this.cB(z,w)===133?J.l2(z,w):y
if(x===0&&v===y)return z
return z.substring(x,v)},
kH:function(a){var z,y
if(typeof a.trimLeft!="undefined"){z=a.trimLeft()
if(z.length===0)return z
y=this.ck(z,0)===133?J.dp(z,1):0}else{y=J.dp(a,0)
z=a}if(y===0)return z
if(y===z.length)return""
return z.substring(y)},
c_:function(a,b){var z,y
if(0>=b)return""
if(b===1||a.length===0)return a
if(b!==b>>>0)throw H.c(C.H)
for(z=a,y="";!0;){if((b&1)===1)y=z+y
b=b>>>1
if(b===0)break
z+=z}return y},
bE:function(a,b,c){var z
if(c>a.length)throw H.c(P.a_(c,0,a.length,null,null))
z=a.indexOf(b,c)
return z},
aN:function(a,b){return this.bE(a,b,0)},
k5:function(a,b,c){var z
c=a.length
z=b.length
if(c+z>c)c-=z
return a.lastIndexOf(b,c)},
k0:function(a,b){return this.k5(a,b,null)},
jc:function(a,b,c){if(b==null)H.f(H.Q(b))
if(c>a.length)throw H.c(P.a_(c,0,a.length,null,null))
return H.un(a,b,c)},
a1:function(a,b){return this.jc(a,b,0)},
gK:function(a){return a.length===0},
gal:function(a){return a.length!==0},
bs:function(a,b){var z
if(typeof b!=="string")throw H.c(H.Q(b))
if(a===b)z=0
else z=a<b?-1:1
return z},
k:function(a){return a},
gv:function(a){var z,y,x
for(z=a.length,y=0,x=0;x<z;++x){y=536870911&y+a.charCodeAt(x)
y=536870911&y+((524287&y)<<10)
y^=y>>6}y=536870911&y+((67108863&y)<<3)
y^=y>>11
return 536870911&y+((16383&y)<<15)},
gbk:function(a){return C.a5},
gl:function(a){return a.length},
i:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(H.aE(a,b))
if(b>=a.length||b<0)throw H.c(H.aE(a,b))
return a[b]},
$iscG:1,
$ascG:I.b4,
$isq:1,
$isdH:1,
w:{
f1:function(a){if(a<256)switch(a){case 9:case 10:case 11:case 12:case 13:case 32:case 133:case 160:return!0
default:return!1}switch(a){case 5760:case 8192:case 8193:case 8194:case 8195:case 8196:case 8197:case 8198:case 8199:case 8200:case 8201:case 8202:case 8232:case 8233:case 8239:case 8287:case 12288:case 65279:return!0
default:return!1}},
dp:function(a,b){var z,y
for(z=a.length;b<z;){y=C.b.ck(a,b)
if(y!==32&&y!==13&&!J.f1(y))break;++b}return b},
l2:function(a,b){var z,y
for(;b>0;b=z){z=b-1
y=C.b.cB(a,z)
if(y!==32&&y!==13&&!J.f1(y))break}return b}}}}],["","",,H,{"^":"",
hn:function(a){return a},
aa:function(){return new P.D("No element")},
dn:function(){return new P.D("Too many elements")},
eX:function(){return new P.D("Too few elements")},
c9:function(a,b,c,d){if(c-b<=32)H.fF(a,b,c,d)
else H.fE(a,b,c,d)},
fF:function(a,b,c,d){var z,y,x,w,v
for(z=b+1,y=J.H(a);z<=c;++z){x=y.i(a,z)
w=z
while(!0){if(!(w>b&&J.a3(d.$2(y.i(a,w-1),x),0)))break
v=w-1
y.n(a,w,y.i(a,v))
w=v}y.n(a,w,x)}},
fE:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
z=C.d.bB(c-b+1,6)
y=b+z
x=c-z
w=C.d.bB(b+c,2)
v=w-z
u=w+z
t=J.H(a)
s=t.i(a,y)
r=t.i(a,v)
q=t.i(a,w)
p=t.i(a,u)
o=t.i(a,x)
if(J.a3(d.$2(s,r),0)){n=r
r=s
s=n}if(J.a3(d.$2(p,o),0)){n=o
o=p
p=n}if(J.a3(d.$2(s,q),0)){n=q
q=s
s=n}if(J.a3(d.$2(r,q),0)){n=q
q=r
r=n}if(J.a3(d.$2(s,p),0)){n=p
p=s
s=n}if(J.a3(d.$2(q,p),0)){n=p
p=q
q=n}if(J.a3(d.$2(r,o),0)){n=o
o=r
r=n}if(J.a3(d.$2(r,q),0)){n=q
q=r
r=n}if(J.a3(d.$2(p,o),0)){n=o
o=p
p=n}t.n(a,y,s)
t.n(a,w,q)
t.n(a,x,o)
t.n(a,v,t.i(a,b))
t.n(a,u,t.i(a,c))
m=b+1
l=c-1
if(J.h(d.$2(r,p),0)){for(k=m;k<=l;++k){j=t.i(a,k)
i=d.$2(j,r)
h=J.n(i)
if(h.u(i,0))continue
if(h.aJ(i,0)){if(k!==m){t.n(a,k,t.i(a,m))
t.n(a,m,j)}++m}else for(;!0;){i=d.$2(t.i(a,l),r)
h=J.af(i)
if(h.bp(i,0)){--l
continue}else{g=l-1
if(h.aJ(i,0)){t.n(a,k,t.i(a,m))
f=m+1
t.n(a,m,t.i(a,l))
t.n(a,l,j)
l=g
m=f
break}else{t.n(a,k,t.i(a,l))
t.n(a,l,j)
l=g
break}}}}e=!0}else{for(k=m;k<=l;++k){j=t.i(a,k)
if(J.bQ(d.$2(j,r),0)){if(k!==m){t.n(a,k,t.i(a,m))
t.n(a,m,j)}++m}else if(J.a3(d.$2(j,p),0))for(;!0;)if(J.a3(d.$2(t.i(a,l),p),0)){--l
if(l<k)break
continue}else{g=l-1
if(J.bQ(d.$2(t.i(a,l),r),0)){t.n(a,k,t.i(a,m))
f=m+1
t.n(a,m,t.i(a,l))
t.n(a,l,j)
m=f}else{t.n(a,k,t.i(a,l))
t.n(a,l,j)}l=g
break}}e=!1}h=m-1
t.n(a,b,t.i(a,h))
t.n(a,h,r)
h=l+1
t.n(a,c,t.i(a,h))
t.n(a,h,p)
H.c9(a,b,m-2,d)
H.c9(a,l+2,c,d)
if(e)return
if(m<y&&l>x){for(;J.h(d.$2(t.i(a,m),r),0);)++m
for(;J.h(d.$2(t.i(a,l),p),0);)--l
for(k=m;k<=l;++k){j=t.i(a,k)
if(J.h(d.$2(j,r),0)){if(k!==m){t.n(a,k,t.i(a,m))
t.n(a,m,j)}++m}else if(J.h(d.$2(j,p),0))for(;!0;)if(J.h(d.$2(t.i(a,l),p),0)){--l
if(l<k)break
continue}else{g=l-1
if(J.bQ(d.$2(t.i(a,l),r),0)){t.n(a,k,t.i(a,m))
f=m+1
t.n(a,m,t.i(a,l))
t.n(a,l,j)
m=f}else{t.n(a,k,t.i(a,l))
t.n(a,l,j)}l=g
break}}H.c9(a,m,l,d)}else H.c9(a,m,l,d)},
V:{"^":"y;$ti"},
aT:{"^":"V;$ti",
gX:function(a){return new H.dv(this,this.gl(this),0,null,[H.x(this,"aT",0)])},
L:function(a,b){var z,y
z=this.gl(this)
for(y=0;y<z;++y){b.$1(this.ap(0,y))
if(z!==this.gl(this))throw H.c(new P.B(this))}},
gK:function(a){return this.gl(this)===0},
gE:function(a){if(this.gl(this)===0)throw H.c(H.aa())
return this.ap(0,this.gl(this)-1)},
a1:function(a,b){var z,y
z=this.gl(this)
for(y=0;y<z;++y){if(J.h(this.ap(0,y),b))return!0
if(z!==this.gl(this))throw H.c(new P.B(this))}return!1},
b6:function(a,b,c){var z,y,x
z=this.gl(this)
for(y=0;y<z;++y){x=this.ap(0,y)
if(b.$1(x)===!0)return x
if(z!==this.gl(this))throw H.c(new P.B(this))}return c.$0()},
cH:function(a,b){var z,y,x,w
z=this.gl(this)
if(b.length!==0){if(z===0)return""
y=H.b(this.ap(0,0))
if(z!==this.gl(this))throw H.c(new P.B(this))
for(x=y,w=1;w<z;++w){x=x+b+H.b(this.ap(0,w))
if(z!==this.gl(this))throw H.c(new P.B(this))}return x.charCodeAt(0)==0?x:x}else{for(w=0,x="";w<z;++w){x+=H.b(this.ap(0,w))
if(z!==this.gl(this))throw H.c(new P.B(this))}return x.charCodeAt(0)==0?x:x}},
bY:function(a,b){return this.dP(0,b)},
aP:function(a,b){return new H.aj(this,b,[H.x(this,"aT",0),null])},
bh:function(a,b,c){var z,y,x
z=this.gl(this)
for(y=b,x=0;x<z;++x){y=c.$2(y,this.ap(0,x))
if(z!==this.gl(this))throw H.c(new P.B(this))}return y},
bw:function(a,b){var z,y,x,w
z=[H.x(this,"aT",0)]
if(b){y=H.r([],z)
C.a.sl(y,this.gl(this))}else{x=new Array(this.gl(this))
x.fixed$length=Array
y=H.r(x,z)}for(w=0;w<this.gl(this);++w){z=this.ap(0,w)
if(w>=y.length)return H.e(y,w)
y[w]=z}return y},
cd:function(a){return this.bw(a,!0)},
bx:function(a){var z,y
z=P.W(null,null,null,H.x(this,"aT",0))
for(y=0;y<this.gl(this);++y)z.q(0,this.ap(0,y))
return z}},
o0:{"^":"aT;a,b,c,$ti",
gib:function(){var z=J.aG(this.a)
return z},
giK:function(){var z,y
z=J.aG(this.a)
y=this.b
if(y>z)return z
return y},
gl:function(a){var z,y
z=J.aG(this.a)
y=this.b
if(y>=z)return 0
return z-y},
ap:function(a,b){var z,y
z=this.giK()+b
if(!(b<0)){y=this.gib()
if(typeof y!=="number")return H.v(y)
y=z>=y}else y=!0
if(y)throw H.c(P.cD(b,this,"index",null,null))
return J.ew(this.a,z)},
bw:function(a,b){var z,y,x,w,v,u,t,s,r
z=this.b
y=this.a
x=J.H(y)
w=x.gl(y)
v=w-z
if(v<0)v=0
u=this.$ti
if(b){t=H.r([],u)
C.a.sl(t,v)}else{s=new Array(v)
s.fixed$length=Array
t=H.r(s,u)}for(r=0;r<v;++r){u=x.ap(y,z+r)
if(r>=t.length)return H.e(t,r)
t[r]=u
if(x.gl(y)<w)throw H.c(new P.B(this))}return t},
hR:function(a,b,c,d){var z=this.b
if(z<0)H.f(P.a_(z,0,null,"start",null))},
w:{
fN:function(a,b,c,d){var z=new H.o0(a,b,c,[d])
z.hR(a,b,c,d)
return z}}},
dv:{"^":"d;a,b,c,d,$ti",
gF:function(){return this.d},
t:function(){var z,y,x
z=this.a
y=z.gl(z)
if(this.b!==y)throw H.c(new P.B(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z.ap(0,x);++this.c
return!0}},
dy:{"^":"y;a,b,$ti",
gX:function(a){return new H.lu(null,J.ah(this.a),this.b,this.$ti)},
gl:function(a){return J.aG(this.a)},
gK:function(a){return J.ex(this.a)},
gE:function(a){return this.b.$1(J.iq(this.a))},
$asy:function(a,b){return[b]},
w:{
bv:function(a,b,c,d){if(!!J.n(a).$isV)return new H.bs(a,b,[c,d])
return new H.dy(a,b,[c,d])}}},
bs:{"^":"dy;a,b,$ti",$isV:1,
$asV:function(a,b){return[b]}},
lu:{"^":"cF;a,b,c,$ti",
t:function(){var z=this.b
if(z.t()){this.a=this.c.$1(z.gF())
return!0}this.a=null
return!1},
gF:function(){return this.a},
$ascF:function(a,b){return[b]}},
aj:{"^":"aT;a,b,$ti",
gl:function(a){return J.aG(this.a)},
ap:function(a,b){return this.b.$1(J.ew(this.a,b))},
$asaT:function(a,b){return[b]},
$asV:function(a,b){return[b]},
$asy:function(a,b){return[b]}},
K:{"^":"y;a,b,$ti",
gX:function(a){return new H.cV(J.ah(this.a),this.b,this.$ti)},
aP:function(a,b){return new H.dy(this,b,[H.m(this,0),null])}},
cV:{"^":"cF;a,b,$ti",
t:function(){var z,y
for(z=this.a,y=this.b;z.t();)if(y.$1(z.gF())===!0)return!0
return!1},
gF:function(){return this.a.gF()}},
fx:{"^":"y;a,b,$ti",
gX:function(a){return new H.n9(J.ah(this.a),this.b,this.$ti)},
w:{
n8:function(a,b,c){if(!!J.n(a).$isV)return new H.kk(a,H.hn(b),[c])
return new H.fx(a,H.hn(b),[c])}}},
kk:{"^":"fx;a,b,$ti",
gl:function(a){var z=J.aG(this.a)-this.b
if(z>=0)return z
return 0},
$isV:1},
n9:{"^":"cF;a,b,$ti",
t:function(){var z,y
for(z=this.a,y=0;y<this.b;++y)z.t()
this.b=0
return z.t()},
gF:function(){return this.a.gF()}},
kl:{"^":"d;$ti",
t:function(){return!1},
gF:function(){return}}}],["","",,H,{"^":"",
cf:function(a,b){var z=a.cD(b)
if(!init.globalState.d.cy)init.globalState.f.bj()
return z},
i7:function(a,b){var z,y,x,w,v,u
z={}
z.a=b
if(b==null){b=[]
z.a=b
y=b}else y=b
if(!J.n(y).$isL)throw H.c(P.C("Arguments to main must be a List: "+H.b(y)))
init.globalState=new H.pN(0,0,1,null,null,null,null,null,null,null,null,null,a)
y=init.globalState
x=self.window==null
w=self.Worker
v=x&&!!self.postMessage
y.x=v
v=!v
if(v)w=w!=null&&$.$get$eV()!=null
else w=!0
y.y=w
y.r=x&&v
y.f=new H.pm(P.b0(null,H.cd),0)
x=P.u
y.z=new H.O(0,null,null,null,null,null,0,[x,H.e6])
y.ch=new H.O(0,null,null,null,null,null,0,[x,null])
if(y.x===!0){w=new H.pM()
y.Q=w
self.onmessage=function(c,d){return function(e){c(d,e)}}(H.kU,w)
self.dartPrint=self.dartPrint||function(c){return function(d){if(self.console&&self.console.log)self.console.log(d)
else self.postMessage(c(d))}}(H.pO)}if(init.globalState.x===!0)return
y=init.globalState.a++
w=P.W(null,null,null,x)
v=new H.c6(0,null,!1)
u=new H.e6(y,new H.O(0,null,null,null,null,null,0,[x,H.c6]),w,init.createNewIsolate(),v,new H.b8(H.d8()),new H.b8(H.d8()),!1,!1,[],P.W(null,null,null,null),null,null,!1,!0,P.W(null,null,null,null))
w.q(0,0)
u.dQ(0,v)
init.globalState.e=u
init.globalState.d=u
if(H.au(a,{func:1,args:[,]}))u.cD(new H.tO(z,a))
else if(H.au(a,{func:1,args:[,,]}))u.cD(new H.tP(z,a))
else u.cD(a)
init.globalState.f.bj()},
kY:function(){var z=init.currentScript
if(z!=null)return String(z.src)
if(init.globalState.x===!0)return H.kZ()
return},
kZ:function(){var z,y
z=new Error().stack
if(z==null){z=function(){try{throw new Error()}catch(x){return x.stack}}()
if(z==null)throw H.c(new P.P("No stack trace"))}y=z.match(new RegExp("^ *at [^(]*\\((.*):[0-9]*:[0-9]*\\)$","m"))
if(y!=null)return y[1]
y=z.match(new RegExp("^[^@]*@(.*):[0-9]*$","m"))
if(y!=null)return y[1]
throw H.c(new P.P('Cannot extract URI from "'+z+'"'))},
kU:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=new H.cX(!0,[]).bQ(b.data)
y=J.H(z)
switch(y.i(z,"command")){case"start":init.globalState.b=y.i(z,"id")
x=y.i(z,"functionName")
w=x==null?init.globalState.cx:init.globalFunctions[x]()
v=y.i(z,"args")
u=new H.cX(!0,[]).bQ(y.i(z,"msg"))
t=y.i(z,"isSpawnUri")
s=y.i(z,"startPaused")
r=new H.cX(!0,[]).bQ(y.i(z,"replyTo"))
y=init.globalState.a++
q=P.u
p=P.W(null,null,null,q)
o=new H.c6(0,null,!1)
n=new H.e6(y,new H.O(0,null,null,null,null,null,0,[q,H.c6]),p,init.createNewIsolate(),o,new H.b8(H.d8()),new H.b8(H.d8()),!1,!1,[],P.W(null,null,null,null),null,null,!1,!0,P.W(null,null,null,null))
p.q(0,0)
n.dQ(0,o)
init.globalState.f.a.ax(new H.cd(n,new H.kV(w,v,u,t,s,r),"worker-start"))
init.globalState.d=n
init.globalState.f.bj()
break
case"spawn-worker":break
case"message":if(y.i(z,"port")!=null)y.i(z,"port").D(y.i(z,"msg"))
init.globalState.f.bj()
break
case"close":init.globalState.ch.a8(0,$.$get$eW().i(0,a))
a.terminate()
init.globalState.f.bj()
break
case"log":H.kT(y.i(z,"msg"))
break
case"print":if(init.globalState.x===!0){y=init.globalState.Q
q=P.ab(["command","print","msg",z])
q=new H.bk(!0,P.bJ(null,P.u)).bb(q)
y.toString
self.postMessage(q)}else P.eo(y.i(z,"msg"))
break
case"error":throw H.c(y.i(z,"msg"))}},
kT:function(a){var z,y,x,w
if(init.globalState.x===!0){y=init.globalState.Q
x=P.ab(["command","log","msg",a])
x=new H.bk(!0,P.bJ(null,P.u)).bb(x)
y.toString
self.postMessage(x)}else try{self.console.log(a)}catch(w){H.z(w)
z=H.A(w)
y=P.cA(z)
throw H.c(y)}},
kW:function(a,b,c,d,e,f){var z,y,x,w
z=init.globalState.d
y=z.a
$.fi=$.fi+("_"+y)
$.fj=$.fj+("_"+y)
y=z.e
x=init.globalState.d.a
w=z.f
f.D(["spawned",new H.ce(y,x),w,z.r])
x=new H.kX(a,b,c,d,z)
if(e===!0){z.fz(w,w)
init.globalState.f.a.ax(new H.cd(z,x,"start isolate"))}else x.$0()},
qh:function(a){return new H.cX(!0,[]).bQ(new H.bk(!1,P.bJ(null,P.u)).bb(a))},
tO:{"^":"a:1;a,b",
$0:function(){this.b.$1(this.a.a)}},
tP:{"^":"a:1;a,b",
$0:function(){this.b.$2(this.a.a,null)}},
pN:{"^":"d;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",w:{
pO:function(a){var z=P.ab(["command","print","msg",a])
return new H.bk(!0,P.bJ(null,P.u)).bb(z)}}},
e6:{"^":"d;j:a<,b,c,jZ:d<,je:e<,f,r,x,cG:y<,z,Q,ch,cx,cy,db,dx",
fz:function(a,b){if(!this.f.u(0,a))return
if(this.Q.q(0,b)&&!this.y)this.y=!0
this.cv()},
ko:function(a){var z,y,x
if(!this.y)return
z=this.Q
z.a8(0,a)
if(z.a===0){for(z=this.z;y=z.length,y!==0;){if(0>=y)return H.e(z,-1)
x=z.pop()
init.globalState.f.a.fw(x)}this.y=!1}this.cv()},
j1:function(a,b){var z,y,x
if(this.ch==null)this.ch=[]
for(z=J.n(a),y=0;x=this.ch,y<x.length;y+=2)if(z.u(a,x[y])){z=this.ch
x=y+1
if(x>=z.length)return H.e(z,x)
z[x]=b
return}x.push(a)
this.ch.push(b)},
kl:function(a){var z,y,x
if(this.ch==null)return
for(z=J.n(a),y=0;x=this.ch,y<x.length;y+=2)if(z.u(a,x[y])){z=this.ch
x=y+2
z.toString
if(typeof z!=="object"||z===null||!!z.fixed$length)H.f(new P.P("removeRange"))
P.c5(y,x,z.length,null,null,null)
z.splice(y,x-y)
return}},
hA:function(a,b){if(!this.r.u(0,a))return
this.db=b},
jC:function(a,b,c){var z=J.n(b)
if(!z.u(b,0))z=z.u(b,1)&&!this.cy
else z=!0
if(z){a.D(c)
return}z=this.cx
if(z==null){z=P.b0(null,null)
this.cx=z}z.ax(new H.pD(a,c))},
jB:function(a,b){var z
if(!this.r.u(0,a))return
z=J.n(b)
if(!z.u(b,0))z=z.u(b,1)&&!this.cy
else z=!0
if(z){this.ey()
return}z=this.cx
if(z==null){z=P.b0(null,null)
this.cx=z}z.ax(this.gk_())},
jD:function(a,b){var z,y,x
z=this.dx
if(z.a===0){if(this.db===!0&&this===init.globalState.e)return
if(self.console&&self.console.error)self.console.error(a,b)
else{P.eo(a)
if(b!=null)P.eo(b)}return}y=new Array(2)
y.fixed$length=Array
y[0]=J.i(a)
y[1]=b==null?null:J.i(b)
for(x=new P.ae(z,z.r,null,null,[null]),x.c=z.e;x.t();)x.d.D(y)},
cD:function(a){var z,y,x,w,v,u,t
z=init.globalState.d
init.globalState.d=this
$=this.d
y=null
x=this.cy
this.cy=!0
try{y=a.$0()}catch(u){w=H.z(u)
v=H.A(u)
this.jD(w,v)
if(this.db===!0){this.ey()
if(this===init.globalState.e)throw u}}finally{this.cy=x
init.globalState.d=z
if(z!=null)$=z.gjZ()
if(this.cx!=null)for(;t=this.cx,!t.gK(t);)this.cx.dw().$0()}return y},
c8:function(a){return this.b.i(0,a)},
dQ:function(a,b){var z=this.b
if(z.a2(a))throw H.c(P.cA("Registry: ports must be registered only once."))
z.n(0,a,b)},
cv:function(){var z=this.b
if(z.gl(z)-this.c.a>0||this.y||!this.x)init.globalState.z.n(0,this.a,this)
else this.ey()},
ey:[function(){var z,y,x,w,v
z=this.cx
if(z!=null)z.aZ(0)
for(z=this.b,y=z.gce(),y=y.gX(y);y.t();)y.gF().i5()
z.aZ(0)
this.c.aZ(0)
init.globalState.z.a8(0,this.a)
this.dx.aZ(0)
if(this.ch!=null){for(x=0;z=this.ch,y=z.length,x<y;x+=2){w=z[x]
v=x+1
if(v>=y)return H.e(z,v)
w.D(z[v])}this.ch=null}},"$0","gk_",0,0,6]},
pD:{"^":"a:6;a,b",
$0:function(){this.a.D(this.b)}},
pm:{"^":"d;a,b",
jj:function(){var z=this.a
if(z.b===z.c)return
return z.dw()},
he:function(){var z,y,x
z=this.jj()
if(z==null){if(init.globalState.e!=null)if(init.globalState.z.a2(init.globalState.e.a))if(init.globalState.r===!0){y=init.globalState.e.b
y=y.gK(y)}else y=!1
else y=!1
else y=!1
if(y)H.f(P.cA("Program exited with open ReceivePorts."))
y=init.globalState
if(y.x===!0){x=y.z
x=x.gK(x)&&y.f.b===0}else x=!1
if(x){y=y.Q
x=P.ab(["command","close"])
x=new H.bk(!0,new P.hh(0,null,null,null,null,null,0,[null,P.u])).bb(x)
y.toString
self.postMessage(x)}return!1}z.kj()
return!0},
fm:function(){if(self.window!=null)new H.pn(this).$0()
else for(;this.he(););},
bj:function(){var z,y,x,w,v
if(init.globalState.x!==!0)this.fm()
else try{this.fm()}catch(x){z=H.z(x)
y=H.A(x)
w=init.globalState.Q
v=P.ab(["command","error","msg",H.b(z)+"\n"+H.b(y)])
v=new H.bk(!0,P.bJ(null,P.u)).bb(v)
w.toString
self.postMessage(v)}}},
pn:{"^":"a:6;a",
$0:function(){if(!this.a.he())return
P.os(C.w,this)}},
cd:{"^":"d;a,b,c",
kj:function(){var z=this.a
if(z.y){z.z.push(this)
return}z.cD(this.b)}},
pM:{"^":"d;"},
kV:{"^":"a:1;a,b,c,d,e,f",
$0:function(){H.kW(this.a,this.b,this.c,this.d,this.e,this.f)}},
kX:{"^":"a:6;a,b,c,d,e",
$0:function(){var z,y
z=this.e
z.x=!0
if(this.d!==!0)this.a.$1(this.c)
else{y=this.a
if(H.au(y,{func:1,args:[,,]}))y.$2(this.b,this.c)
else if(H.au(y,{func:1,args:[,]}))y.$1(this.b)
else y.$0()}z.cv()}},
hb:{"^":"d;"},
ce:{"^":"hb;b,a",
D:function(a){var z,y,x
z=init.globalState.z.i(0,this.a)
if(z==null)return
y=this.b
if(y.gfc())return
x=H.qh(a)
if(z.gje()===y){y=J.H(x)
switch(y.i(x,0)){case"pause":z.fz(y.i(x,1),y.i(x,2))
break
case"resume":z.ko(y.i(x,1))
break
case"add-ondone":z.j1(y.i(x,1),y.i(x,2))
break
case"remove-ondone":z.kl(y.i(x,1))
break
case"set-errors-fatal":z.hA(y.i(x,1),y.i(x,2))
break
case"ping":z.jC(y.i(x,1),y.i(x,2),y.i(x,3))
break
case"kill":z.jB(y.i(x,1),y.i(x,2))
break
case"getErrors":y=y.i(x,1)
z.dx.q(0,y)
break
case"stopErrors":y=y.i(x,1)
z.dx.a8(0,y)
break}return}init.globalState.f.a.ax(new H.cd(z,new H.pQ(this,x),"receive"))},
u:function(a,b){if(b==null)return!1
return b instanceof H.ce&&J.h(this.b,b.b)},
gv:function(a){return this.b.ge2()}},
pQ:{"^":"a:1;a,b",
$0:function(){var z=this.a.b
if(!z.gfc())z.hX(this.b)}},
e8:{"^":"hb;b,c,a",
D:function(a){var z,y,x
z=P.ab(["command","message","port",this,"msg",a])
y=new H.bk(!0,P.bJ(null,P.u)).bb(z)
if(init.globalState.x===!0){init.globalState.Q.toString
self.postMessage(y)}else{x=init.globalState.ch.i(0,this.b)
if(x!=null)x.postMessage(y)}},
u:function(a,b){if(b==null)return!1
return b instanceof H.e8&&J.h(this.b,b.b)&&J.h(this.a,b.a)&&J.h(this.c,b.c)},
gv:function(a){var z,y,x
z=this.b
if(typeof z!=="number")return z.eO()
y=this.a
if(typeof y!=="number")return y.eO()
x=this.c
if(typeof x!=="number")return H.v(x)
return(z<<16^y<<8^x)>>>0}},
c6:{"^":"d;e2:a<,b,fc:c<",
i5:function(){this.c=!0
this.b=null},
bf:function(){var z,y
if(this.c)return
this.c=!0
this.b=null
z=init.globalState.d
y=this.a
z.b.a8(0,y)
z.c.a8(0,y)
z.cv()},
hX:function(a){if(this.c)return
this.b.$1(a)},
$ismm:1},
mn:{"^":"ac;a,b",
az:function(a,b,c,d){var z=this.b
z.toString
return new P.cW(z,[H.m(z,0)]).az(a,b,c,d)},
eB:function(a,b,c){return this.az(a,null,b,c)},
bf:[function(){this.a.bf()
this.b.bf()},"$0","gja",0,0,6],
hP:function(a){var z=new P.q4(null,0,null,null,null,null,this.gja(),[null])
this.b=z
this.a.b=z.giU(z)},
$asac:I.b4},
oo:{"^":"d;a,b,c",
hS:function(a,b){var z,y
if(a===0)z=self.setTimeout==null||init.globalState.x===!0
else z=!1
if(z){this.c=1
z=init.globalState.f
y=init.globalState.d
z.a.ax(new H.cd(y,new H.oq(this,b),"timer"))
this.b=!0}else if(self.setTimeout!=null){++init.globalState.f.b
this.c=self.setTimeout(H.d4(new H.or(this,b),0),a)}else throw H.c(new P.P("Timer greater than 0."))},
w:{
op:function(a,b){var z=new H.oo(!0,!1,null)
z.hS(a,b)
return z}}},
oq:{"^":"a:6;a,b",
$0:function(){this.a.c=null
this.b.$0()}},
or:{"^":"a:6;a,b",
$0:function(){this.a.c=null;--init.globalState.f.b
this.b.$0()}},
b8:{"^":"d;e2:a<",
gv:function(a){var z=this.a
if(typeof z!=="number")return z.kP()
z=C.j.dd(z,0)^C.j.bB(z,4294967296)
z=(~z>>>0)+(z<<15>>>0)&4294967295
z=((z^z>>>12)>>>0)*5&4294967295
z=((z^z>>>4)>>>0)*2057&4294967295
return(z^z>>>16)>>>0},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(b instanceof H.b8){z=this.a
y=b.a
return z==null?y==null:z===y}return!1}},
bk:{"^":"d;a,b",
bb:[function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
z=this.b
y=z.i(0,a)
if(y!=null)return["ref",y]
z.n(0,a,z.gl(z))
z=J.n(a)
if(!!z.$iscG)return this.hw(a)
if(!!z.$iskR){x=this.ght()
z=a.gc6()
z=H.bv(z,x,H.x(z,"y",0),null)
z=P.T(z,!0,H.x(z,"y",0))
w=a.gce()
w=H.bv(w,x,H.x(w,"y",0),null)
return["map",z,P.T(w,!0,H.x(w,"y",0))]}if(!!z.$isf0)return this.hx(a)
if(!!z.$isaR)this.hh(a)
if(!!z.$ismm)this.cT(a,"RawReceivePorts can't be transmitted:")
if(!!z.$isce)return this.hy(a)
if(!!z.$ise8)return this.hz(a)
if(!!z.$isa){v=a.$static_name
if(v==null)this.cT(a,"Closures can't be transmitted:")
return["function",v]}if(!!z.$isb8)return["capability",a.a]
if(!(a instanceof P.d))this.hh(a)
return["dart",init.classIdExtractor(a),this.hv(init.classFieldsExtractor(a))]},"$1","ght",2,0,0],
cT:function(a,b){throw H.c(new P.P((b==null?"Can't transmit:":b)+" "+H.b(a)))},
hh:function(a){return this.cT(a,null)},
hw:function(a){var z=this.hu(a)
if(!!a.fixed$length)return["fixed",z]
if(!a.fixed$length)return["extendable",z]
if(!a.immutable$list)return["mutable",z]
if(a.constructor===Array)return["const",z]
this.cT(a,"Can't serialize indexable: ")},
hu:function(a){var z,y,x
z=[]
C.a.sl(z,a.length)
for(y=0;y<a.length;++y){x=this.bb(a[y])
if(y>=z.length)return H.e(z,y)
z[y]=x}return z},
hv:function(a){var z
for(z=0;z<a.length;++z)C.a.n(a,z,this.bb(a[z]))
return a},
hx:function(a){var z,y,x,w
if(!!a.constructor&&a.constructor!==Object)this.cT(a,"Only plain JS Objects are supported:")
z=Object.keys(a)
y=[]
C.a.sl(y,z.length)
for(x=0;x<z.length;++x){w=this.bb(a[z[x]])
if(x>=y.length)return H.e(y,x)
y[x]=w}return["js-object",z,y]},
hz:function(a){if(this.a)return["sendport",a.b,a.a,a.c]
return["raw sendport",a]},
hy:function(a){if(this.a)return["sendport",init.globalState.b,a.a,a.b.ge2()]
return["raw sendport",a]}},
cX:{"^":"d;a,b",
bQ:[function(a){var z,y,x,w,v,u
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
if(typeof a!=="object"||a===null||a.constructor!==Array)throw H.c(P.C("Bad serialized message: "+H.b(a)))
switch(C.a.geq(a)){case"ref":if(1>=a.length)return H.e(a,1)
z=a[1]
y=this.b
if(z>>>0!==z||z>=y.length)return H.e(y,z)
return y[z]
case"buffer":if(1>=a.length)return H.e(a,1)
x=a[1]
this.b.push(x)
return x
case"typed":if(1>=a.length)return H.e(a,1)
x=a[1]
this.b.push(x)
return x
case"fixed":if(1>=a.length)return H.e(a,1)
x=a[1]
this.b.push(x)
y=H.r(this.cC(x),[null])
y.fixed$length=Array
return y
case"extendable":if(1>=a.length)return H.e(a,1)
x=a[1]
this.b.push(x)
return H.r(this.cC(x),[null])
case"mutable":if(1>=a.length)return H.e(a,1)
x=a[1]
this.b.push(x)
return this.cC(x)
case"const":if(1>=a.length)return H.e(a,1)
x=a[1]
this.b.push(x)
y=H.r(this.cC(x),[null])
y.fixed$length=Array
return y
case"map":return this.jm(a)
case"sendport":return this.jn(a)
case"raw sendport":if(1>=a.length)return H.e(a,1)
x=a[1]
this.b.push(x)
return x
case"js-object":return this.jl(a)
case"function":if(1>=a.length)return H.e(a,1)
x=init.globalFunctions[a[1]]()
this.b.push(x)
return x
case"capability":if(1>=a.length)return H.e(a,1)
return new H.b8(a[1])
case"dart":y=a.length
if(1>=y)return H.e(a,1)
w=a[1]
if(2>=y)return H.e(a,2)
v=a[2]
u=init.instanceFromClassId(w)
this.b.push(u)
this.cC(v)
return init.initializeEmptyInstance(w,u,v)
default:throw H.c("couldn't deserialize: "+H.b(a))}},"$1","gjk",2,0,0],
cC:function(a){var z,y,x
z=J.H(a)
y=0
while(!0){x=z.gl(a)
if(typeof x!=="number")return H.v(x)
if(!(y<x))break
z.n(a,y,this.bQ(z.i(a,y)));++y}return a},
jm:function(a){var z,y,x,w,v,u
z=a.length
if(1>=z)return H.e(a,1)
y=a[1]
if(2>=z)return H.e(a,2)
x=a[2]
w=P.ay()
this.b.push(w)
y=J.ey(y,this.gjk()).cd(0)
for(z=J.H(y),v=J.H(x),u=0;u<z.gl(y);++u){if(u>=y.length)return H.e(y,u)
w.n(0,y[u],this.bQ(v.i(x,u)))}return w},
jn:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.e(a,1)
y=a[1]
if(2>=z)return H.e(a,2)
x=a[2]
if(3>=z)return H.e(a,3)
w=a[3]
if(J.h(y,init.globalState.b)){v=init.globalState.z.i(0,x)
if(v==null)return
u=v.c8(w)
if(u==null)return
t=new H.ce(u,x)}else t=new H.e8(y,w,x)
this.b.push(t)
return t},
jl:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.e(a,1)
y=a[1]
if(2>=z)return H.e(a,2)
x=a[2]
w={}
this.b.push(w)
z=J.H(y)
v=J.H(x)
u=0
while(!0){t=z.gl(y)
if(typeof t!=="number")return H.v(t)
if(!(u<t))break
w[z.i(y,u)]=this.bQ(v.i(x,u));++u}return w}}}],["","",,H,{"^":"",
ju:function(){throw H.c(new P.P("Cannot modify unmodifiable Map"))},
t8:function(a){return init.types[a]},
b:function(a){var z
if(typeof a==="string")return a
if(typeof a==="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
z=J.i(a)
if(typeof z!=="string")throw H.c(H.Q(a))
return z},
az:function(a){var z=a.$identityHash
if(z==null){z=Math.random()*0x3fffffff|0
a.$identityHash=z}return z},
by:function(a){var z,y,x,w,v,u,t,s
z=J.n(a)
y=z.constructor
if(typeof y=="function"){x=y.name
w=typeof x==="string"?x:null}else w=null
if(w==null||z===C.J||!!J.n(a).$isbi){v=C.M(a)
if(v==="Object"){u=a.constructor
if(typeof u=="function"){t=String(u).match(/^\s*function\s*([\w$]*)\s*\(/)
s=t==null?null:t[1]
if(typeof s==="string"&&/^\w+$/.test(s))w=s}if(w==null)w=v}else w=v}w=w
if(w.length>1&&C.b.ck(w,0)===36)w=C.b.bz(w,1)
return function(b,c){return b.replace(/[^<,> ]+/g,function(d){return c[d]||d})}(w+H.d6(H.cj(a),0,null),init.mangledGlobalNames)},
cK:function(a){return"Instance of '"+H.by(a)+"'"},
ak:function(a){var z
if(a<=65535)return String.fromCharCode(a)
if(a<=1114111){z=a-65536
return String.fromCharCode((55296|C.d.dd(z,10))>>>0,56320|z&1023)}throw H.c(P.a_(a,0,1114111,null,null))},
bd:function(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
me:function(a){var z=H.bd(a).getFullYear()+0
return z},
mc:function(a){var z=H.bd(a).getMonth()+1
return z},
m8:function(a){var z=H.bd(a).getDate()+0
return z},
m9:function(a){var z=H.bd(a).getHours()+0
return z},
mb:function(a){var z=H.bd(a).getMinutes()+0
return z},
md:function(a){var z=H.bd(a).getSeconds()+0
return z},
ma:function(a){var z=H.bd(a).getMilliseconds()+0
return z},
dK:function(a,b){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.c(H.Q(a))
return a[b]},
fk:function(a,b,c){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.c(H.Q(a))
a[b]=c},
v:function(a){throw H.c(H.Q(a))},
e:function(a,b){if(a==null)J.aG(a)
throw H.c(H.aE(a,b))},
aE:function(a,b){var z,y
if(typeof b!=="number"||Math.floor(b)!==b)return new P.aX(!0,b,"index",null)
z=J.aG(a)
if(!(b<0)){if(typeof z!=="number")return H.v(z)
y=b>=z}else y=!0
if(y)return P.cD(b,a,"index",null,z)
return P.c4(b,"index",null)},
Q:function(a){return new P.aX(!0,a,null,null)},
d2:function(a){if(typeof a!=="number")throw H.c(H.Q(a))
return a},
qC:function(a){if(typeof a!=="number"||Math.floor(a)!==a)throw H.c(H.Q(a))
return a},
bo:function(a){if(typeof a!=="string")throw H.c(H.Q(a))
return a},
c:function(a){var z
if(a==null)a=new P.cI()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.ie})
z.name=""}else z.toString=H.ie
return z},
ie:function(){return J.i(this.dartException)},
f:function(a){throw H.c(a)},
al:function(a){throw H.c(new P.B(a))},
z:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.uu(a)
if(a==null)return
if(a instanceof H.dj)return z.$1(a.a)
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.d.dd(x,16)&8191)===10)switch(w){case 438:return z.$1(H.ds(H.b(y)+" (Error "+w+")",null))
case 445:case 5007:v=H.b(y)+" (Error "+w+")"
return z.$1(new H.f9(v,null))}}if(a instanceof TypeError){u=$.$get$fV()
t=$.$get$fW()
s=$.$get$fX()
r=$.$get$fY()
q=$.$get$h1()
p=$.$get$h2()
o=$.$get$h_()
$.$get$fZ()
n=$.$get$h4()
m=$.$get$h3()
l=u.bi(y)
if(l!=null)return z.$1(H.ds(y,l))
else{l=t.bi(y)
if(l!=null){l.method="call"
return z.$1(H.ds(y,l))}else{l=s.bi(y)
if(l==null){l=r.bi(y)
if(l==null){l=q.bi(y)
if(l==null){l=p.bi(y)
if(l==null){l=o.bi(y)
if(l==null){l=r.bi(y)
if(l==null){l=n.bi(y)
if(l==null){l=m.bi(y)
v=l!=null}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0
if(v)return z.$1(new H.f9(y,l==null?null:l.method))}}return z.$1(new H.ow(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.fG()
y=function(b){try{return String(b)}catch(k){}return null}(a)
return z.$1(new P.aX(!1,null,null,typeof y==="string"?y.replace(/^RangeError:\s*/,""):y))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.fG()
return a},
A:function(a){var z
if(a instanceof H.dj)return a.b
if(a==null)return new H.hk(a,null)
z=a.$cachedTrace
if(z!=null)return z
return a.$cachedTrace=new H.hk(a,null)},
tl:function(a){if(a==null||typeof a!='object')return J.j(a)
else return H.az(a)},
rU:function(a,b){var z,y,x,w
z=a.length
for(y=0;y<z;y=w){x=y+1
w=x+1
b.n(0,a[y],a[x])}return b},
tc:function(a,b,c,d,e,f,g){switch(c){case 0:return H.cf(b,new H.td(a))
case 1:return H.cf(b,new H.te(a,d))
case 2:return H.cf(b,new H.tf(a,d,e))
case 3:return H.cf(b,new H.tg(a,d,e,f))
case 4:return H.cf(b,new H.th(a,d,e,f,g))}throw H.c(P.cA("Unsupported number of arguments for wrapped closure"))},
d4:function(a,b){var z=a.$identity
if(!!z)return z
z=function(c,d,e,f){return function(g,h,i,j){return f(c,e,d,g,h,i,j)}}(a,b,init.globalState.d,H.tc)
a.$identity=z
return z},
jq:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=z.$callName
if(!!J.n(c).$isL){z.$reflectionInfo=c
x=H.mp(z).r}else x=c
w=d?Object.create(new H.nx().constructor.prototype):Object.create(new H.db(null,null,null,null).constructor.prototype)
w.$initialize=w.constructor
if(d)v=function(){this.$initialize()}
else{u=$.aH
$.aH=J.am(u,1)
v=new Function("a,b,c,d"+u,"this.$initialize(a,b,c,d"+u+")")}w.constructor=v
v.prototype=w
if(!d){t=e.length==1&&!0
s=H.eK(a,z,t)
s.$reflectionInfo=c}else{w.$static_name=f
s=z
t=!1}if(typeof x=="number")r=function(g,h){return function(){return g(h)}}(H.t8,x)
else if(typeof x=="function")if(d)r=x
else{q=t?H.eF:H.dc
r=function(g,h){return function(){return g.apply({$receiver:h(this)},arguments)}}(x,q)}else throw H.c("Error in reflectionInfo.")
w.$S=r
w[y]=s
for(u=b.length,p=1;p<u;++p){o=b[p]
n=o.$callName
if(n!=null){m=d?o:H.eK(a,o,t)
w[n]=m}}w["call*"]=s
w.$R=z.$R
w.$D=z.$D
return v},
jn:function(a,b,c,d){var z=H.dc
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},
eK:function(a,b,c){var z,y,x,w,v,u,t
if(c)return H.jp(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
v=!w||y>=27
if(v)return H.jn(y,!w,z,b)
if(y===0){w=$.aH
$.aH=J.am(w,1)
u="self"+H.b(w)
w="return function(){var "+u+" = this."
v=$.br
if(v==null){v=H.ct("self")
$.br=v}return new Function(w+H.b(v)+";return "+u+"."+H.b(z)+"();}")()}t="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w=$.aH
$.aH=J.am(w,1)
t+=H.b(w)
w="return function("+t+"){return this."
v=$.br
if(v==null){v=H.ct("self")
$.br=v}return new Function(w+H.b(v)+"."+H.b(z)+"("+t+");}")()},
jo:function(a,b,c,d){var z,y
z=H.dc
y=H.eF
switch(b?-1:a){case 0:throw H.c(new H.mA("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,z,y)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,z,y)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,z,y)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,z,y)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,z,y)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,z,y)
default:return function(e,f,g,h){return function(){h=[g(this)]
Array.prototype.push.apply(h,arguments)
return e.apply(f(this),h)}}(d,z,y)}},
jp:function(a,b){var z,y,x,w,v,u,t,s
z=H.je()
y=$.eE
if(y==null){y=H.ct("receiver")
$.eE=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.jo(w,!u,x,b)
if(w===1){y="return function(){return this."+H.b(z)+"."+H.b(x)+"(this."+H.b(y)+");"
u=$.aH
$.aH=J.am(u,1)
return new Function(y+H.b(u)+"}")()}s="abcdefghijklmnopqrstuvwxyz".split("").splice(0,w-1).join(",")
y="return function("+s+"){return this."+H.b(z)+"."+H.b(x)+"(this."+H.b(y)+", "+s+");"
u=$.aH
$.aH=J.am(u,1)
return new Function(y+H.b(u)+"}")()},
eh:function(a,b,c,d,e,f){var z
b.fixed$length=Array
if(!!J.n(c).$isL){c.fixed$length=Array
z=c}else z=c
return H.jq(a,b,z,!!d,e,f)},
tr:function(a,b){var z=J.H(b)
throw H.c(H.cv(H.by(a),z.aB(b,3,z.gl(b))))},
a6:function(a,b){var z
if(a!=null)z=(typeof a==="object"||typeof a==="function")&&J.n(a)[b]
else z=!0
if(z)return a
H.tr(a,b)},
ek:function(a){var z=J.n(a)
return"$S" in z?z.$S():null},
au:function(a,b){var z
if(a==null)return!1
z=H.ek(a)
return z==null?!1:H.en(z,b)},
hM:function(a,b){var z,y
if(a==null)return a
if(H.au(a,b))return a
z=H.U(b,null)
y=H.ek(a)
throw H.c(H.cv(y!=null?H.U(y,null):H.by(a),z))},
us:function(a){throw H.c(new P.jH(a))},
d8:function(){return(Math.random()*0x100000000>>>0)+(Math.random()*0x100000000>>>0)*4294967296},
b3:function(a){return new H.ar(a,null)},
r:function(a,b){a.$ti=b
return a},
cj:function(a){if(a==null)return
return a.$ti},
hR:function(a,b){return H.eu(a["$as"+H.b(b)],H.cj(a))},
x:function(a,b,c){var z=H.hR(a,b)
return z==null?null:z[c]},
m:function(a,b){var z=H.cj(a)
return z==null?null:z[b]},
U:function(a,b){var z
if(a==null)return"dynamic"
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a[0].builtin$cls+H.d6(a,1,b)
if(typeof a=="function")return a.builtin$cls
if(typeof a==="number"&&Math.floor(a)===a)return H.b(b==null?a:b.$1(a))
if(typeof a.func!="undefined"){z=a.typedef
if(z!=null)return H.U(z,b)
return H.qm(a,b)}return"unknown-reified-type"},
qm:function(a,b){var z,y,x,w,v,u,t,s,r,q,p
z=!!a.v?"void":H.U(a.ret,b)
if("args" in a){y=a.args
for(x=y.length,w="",v="",u=0;u<x;++u,v=", "){t=y[u]
w=w+v+H.U(t,b)}}else{w=""
v=""}if("opt" in a){s=a.opt
w+=v+"["
for(x=s.length,v="",u=0;u<x;++u,v=", "){t=s[u]
w=w+v+H.U(t,b)}w+="]"}if("named" in a){r=a.named
w+=v+"{"
for(x=H.rT(r),q=x.length,v="",u=0;u<q;++u,v=", "){p=x[u]
w=w+v+H.U(r[p],b)+(" "+H.b(p))}w+="}"}return"("+w+") => "+z},
d6:function(a,b,c){var z,y,x,w,v,u
if(a==null)return""
z=new P.bF("")
for(y=b,x=!0,w=!0,v="";y<a.length;++y){if(x)x=!1
else z.A=v+", "
u=a[y]
if(u!=null)w=!1
v=z.A+=H.U(u,c)}return w?"":"<"+z.k(0)+">"},
hS:function(a){var z,y
if(a instanceof H.a){z=H.ek(a)
if(z!=null)return H.U(z,null)}y=J.n(a).constructor.builtin$cls
if(a==null)return y
return y+H.d6(a.$ti,0,null)},
eu:function(a,b){if(a==null)return b
a=a.apply(null,b)
if(a==null)return
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a
if(typeof a=="function")return a.apply(null,b)
return b},
aN:function(a,b,c,d){var z,y
if(a==null)return!1
z=H.cj(a)
y=J.n(a)
if(y[b]==null)return!1
return H.hC(H.eu(y[d],z),c)},
aF:function(a,b,c,d){if(a==null)return a
if(H.aN(a,b,c,d))return a
throw H.c(H.cv(H.by(a),function(e,f){return e.replace(/[^<,> ]+/g,function(g){return f[g]||g})}(b.substring(3)+H.d6(c,0,null),init.mangledGlobalNames)))},
hC:function(a,b){var z,y
if(a==null||b==null)return!0
z=a.length
for(y=0;y<z;++y)if(!H.ag(a[y],b[y]))return!1
return!0},
b2:function(a,b,c){return a.apply(b,H.hR(b,c))},
d3:function(a,b){var z,y,x
if(a==null)return b==null||b.builtin$cls==="d"||b.builtin$cls==="ao"
if(b==null)return!0
z=H.cj(a)
a=J.n(a)
y=a.constructor
if(z!=null){z=z.slice()
z.splice(0,0,y)
y=z}if('func' in b){x=a.$S
if(x==null)return!1
return H.en(x.apply(a,null),b)}return H.ag(y,b)},
ib:function(a,b){if(a!=null&&!H.d3(a,b))throw H.c(H.cv(H.by(a),H.U(b,null)))
return a},
ag:function(a,b){var z,y,x,w,v,u
if(a===b)return!0
if(a==null||b==null)return!0
if(a.builtin$cls==="ao")return!0
if('func' in b)return H.en(a,b)
if('func' in a)return b.builtin$cls==="bt"||b.builtin$cls==="d"
z=typeof a==="object"&&a!==null&&a.constructor===Array
y=z?a[0]:a
x=typeof b==="object"&&b!==null&&b.constructor===Array
w=x?b[0]:b
if(w!==y){v=H.U(w,null)
if(!('$is'+v in y.prototype))return!1
u=y.prototype["$as"+v]}else u=null
if(!z&&u==null||!x)return!0
z=z?a.slice(1):null
x=b.slice(1)
return H.hC(H.eu(u,z),x)},
hB:function(a,b,c){var z,y,x,w,v
z=b==null
if(z&&a==null)return!0
if(z)return c
if(a==null)return!1
y=a.length
x=b.length
if(c){if(y<x)return!1}else if(y!==x)return!1
for(w=0;w<x;++w){z=a[w]
v=b[w]
if(!(H.ag(z,v)||H.ag(v,z)))return!1}return!0},
qw:function(a,b){var z,y,x,w,v,u
if(b==null)return!0
if(a==null)return!1
z=Object.getOwnPropertyNames(b)
z.fixed$length=Array
y=z
for(z=y.length,x=0;x<z;++x){w=y[x]
if(!Object.hasOwnProperty.call(a,w))return!1
v=b[w]
u=a[w]
if(!(H.ag(v,u)||H.ag(u,v)))return!1}return!0},
en:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
if(!('func' in a))return!1
if("v" in a){if(!("v" in b)&&"ret" in b)return!1}else if(!("v" in b)){z=a.ret
y=b.ret
if(!(H.ag(z,y)||H.ag(y,z)))return!1}x=a.args
w=b.args
v=a.opt
u=b.opt
t=x!=null?x.length:0
s=w!=null?w.length:0
r=v!=null?v.length:0
q=u!=null?u.length:0
if(t>s)return!1
if(t+r<s+q)return!1
if(t===s){if(!H.hB(x,w,!1))return!1
if(!H.hB(v,u,!0))return!1}else{for(p=0;p<t;++p){o=x[p]
n=w[p]
if(!(H.ag(o,n)||H.ag(n,o)))return!1}for(m=p,l=0;m<s;++l,++m){o=v[l]
n=w[m]
if(!(H.ag(o,n)||H.ag(n,o)))return!1}for(m=0;m<q;++l,++m){o=v[l]
n=u[m]
if(!(H.ag(o,n)||H.ag(n,o)))return!1}}return H.qw(a.named,b.named)},
un:function(a,b,c){var z
if(typeof b==="string")return a.indexOf(b,c)>=0
else{z=J.n(b)
if(!!z.$isdq){z=C.b.bz(a,c)
return b.b.test(z)}else{z=z.ek(b,C.b.bz(a,c))
return!z.gK(z)}}},
up:function(a,b,c,d){var z,y,x
z=b.f6(a,d)
if(z==null)return a
y=z.b
x=y.index
return H.et(a,x,x+y[0].length,c)},
o:function(a,b,c){var z,y,x
H.bo(c)
if(b==="")if(a==="")return c
else{z=a.length
y=H.b(c)
for(x=0;x<z;++x)y=y+a[x]+H.b(c)
return y.charCodeAt(0)==0?y:y}else return a.replace(new RegExp(b.replace(/[[\]{}()*+?.\\^$|]/g,"\\$&"),'g'),c.replace(/\$/g,"$$$$"))},
v4:[function(a){return a},"$1","ho",2,0,22],
uo:function(a,b,c,d){var z,y,x,w,v,u
z=J.n(b)
if(!z.$isdH)throw H.c(P.cq(b,"pattern","is not a Pattern"))
for(z=z.ek(b,a),z=new H.h9(z.a,z.b,z.c,null),y=0,x="";z.t();){w=z.d
v=w.b
u=v.index
x=x+H.b(H.ho().$1(C.b.aB(a,y,u)))+H.b(c.$1(w))
y=u+v[0].length}z=x+H.b(H.ho().$1(C.b.bz(a,y)))
return z.charCodeAt(0)==0?z:z},
ia:function(a,b,c,d){var z,y,x,w,v,u
if(typeof b==="string"){z=a.indexOf(b,d)
if(z<0)return a
return H.et(a,z,z+b.length,c)}y=J.n(b)
if(!!y.$isdq)return d===0?a.replace(b.b,c.replace(/\$/g,"$$$$")):H.up(a,b,c,d)
if(b==null)H.f(H.Q(b))
y=y.df(b,a,d)
x=y.gX(y)
if(!x.t())return a
w=x.gF()
y=w.geS()
v=w.gfJ()
H.bo(c)
u=P.c5(y,v,a.length,null,null,null)
H.qC(u)
return H.et(a,y,u,c)},
et:function(a,b,c,d){var z,y
z=a.substring(0,b)
y=a.substring(c)
return z+H.b(d)+y},
jt:{"^":"d;$ti",
gK:function(a){return this.gl(this)===0},
gal:function(a){return this.gl(this)!==0},
k:function(a){return P.dz(this)},
n:function(a,b,c){return H.ju()},
$isF:1},
jv:{"^":"jt;a,b,c,$ti",
gl:function(a){return this.a},
a2:function(a){if(typeof a!=="string")return!1
if("__proto__"===a)return!1
return this.b.hasOwnProperty(a)},
i:function(a,b){if(!this.a2(b))return
return this.f7(b)},
f7:function(a){return this.b[a]},
L:function(a,b){var z,y,x,w
z=this.c
for(y=z.length,x=0;x<y;++x){w=z[x]
b.$2(w,this.f7(w))}}},
mo:{"^":"d;a,b,c,d,e,f,r,x",w:{
mp:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z.fixed$length=Array
z=z
y=z[0]
x=z[1]
return new H.mo(a,z,(y&1)===1,y>>1,x>>1,(x&1)===1,z[2],null)}}},
ot:{"^":"d;a,b,c,d,e,f",
bi:function(a){var z,y,x
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
w:{
aJ:function(a){var z,y,x,w,v,u
a=a.replace(String({}),'$receiver$').replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
z=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(z==null)z=[]
y=z.indexOf("\\$arguments\\$")
x=z.indexOf("\\$argumentsExpr\\$")
w=z.indexOf("\\$expr\\$")
v=z.indexOf("\\$method\\$")
u=z.indexOf("\\$receiver\\$")
return new H.ot(a.replace(new RegExp('\\\\\\$arguments\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$argumentsExpr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$expr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$method\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$receiver\\\\\\$','g'),'((?:x|[^x])*)'),y,x,w,v,u)},
cU:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},
h0:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},
f9:{"^":"Z;a,b",
k:function(a){var z=this.b
if(z==null)return"NullError: "+H.b(this.a)
return"NullError: method not found: '"+H.b(z)+"' on null"}},
l4:{"^":"Z;a,b,c",
k:function(a){var z,y
z=this.b
if(z==null)return"NoSuchMethodError: "+H.b(this.a)
y=this.c
if(y==null)return"NoSuchMethodError: method not found: '"+z+"' ("+H.b(this.a)+")"
return"NoSuchMethodError: method not found: '"+z+"' on '"+y+"' ("+H.b(this.a)+")"},
w:{
ds:function(a,b){var z,y
z=b==null
y=z?null:b.method
return new H.l4(a,y,z?null:b.receiver)}}},
ow:{"^":"Z;a",
k:function(a){var z=this.a
return z.length===0?"Error":"Error: "+z}},
dj:{"^":"d;a,bc:b<"},
uu:{"^":"a:0;a",
$1:function(a){if(!!J.n(a).$isZ)if(a.$thrownJsError==null)a.$thrownJsError=this.a
return a}},
hk:{"^":"d;a,b",
k:function(a){var z,y
z=this.b
if(z!=null)return z
z=this.a
y=z!==null&&typeof z==="object"?z.stack:null
z=y==null?"":y
this.b=z
return z}},
td:{"^":"a:1;a",
$0:function(){return this.a.$0()}},
te:{"^":"a:1;a,b",
$0:function(){return this.a.$1(this.b)}},
tf:{"^":"a:1;a,b,c",
$0:function(){return this.a.$2(this.b,this.c)}},
tg:{"^":"a:1;a,b,c,d",
$0:function(){return this.a.$3(this.b,this.c,this.d)}},
th:{"^":"a:1;a,b,c,d,e",
$0:function(){return this.a.$4(this.b,this.c,this.d,this.e)}},
a:{"^":"d;",
k:function(a){return"Closure '"+H.by(this).trim()+"'"},
ghp:function(){return this},
$isbt:1,
ghp:function(){return this}},
fR:{"^":"a;"},
nx:{"^":"fR;",
k:function(a){var z=this.$static_name
if(z==null)return"Closure of unknown static method"
return"Closure '"+z+"'"}},
db:{"^":"fR;a,b,c,d",
u:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof H.db))return!1
return this.a===b.a&&this.b===b.b&&this.c===b.c},
gv:function(a){var z,y
z=this.c
if(z==null)y=H.az(this.a)
else y=typeof z!=="object"?J.j(z):H.az(z)
z=H.az(this.b)
if(typeof y!=="number")return y.kQ()
return(y^z)>>>0},
k:function(a){var z=this.c
if(z==null)z=this.a
return"Closure '"+H.b(this.d)+"' of "+H.cK(z)},
w:{
dc:function(a){return a.a},
eF:function(a){return a.c},
je:function(){var z=$.br
if(z==null){z=H.ct("self")
$.br=z}return z},
ct:function(a){var z,y,x,w,v
z=new H.db("self","target","receiver","name")
y=Object.getOwnPropertyNames(z)
y.fixed$length=Array
x=y
for(y=x.length,w=0;w<y;++w){v=x[w]
if(z[v]===a)return v}}}},
jj:{"^":"Z;a",
k:function(a){return this.a},
w:{
cv:function(a,b){return new H.jj("CastError: Casting value of type '"+a+"' to incompatible type '"+b+"'")}}},
mA:{"^":"Z;a",
k:function(a){return"RuntimeError: "+H.b(this.a)}},
ar:{"^":"d;a,b",
k:function(a){var z,y
z=this.b
if(z!=null)return z
y=function(b,c){return b.replace(/[^<,> ]+/g,function(d){return c[d]||d})}(this.a,init.mangledGlobalNames)
this.b=y
return y},
gv:function(a){return J.j(this.a)},
u:function(a,b){if(b==null)return!1
return b instanceof H.ar&&J.h(this.a,b.a)}},
O:{"^":"d;a,b,c,d,e,f,r,$ti",
gl:function(a){return this.a},
gK:function(a){return this.a===0},
gal:function(a){return!this.gK(this)},
gc6:function(){return new H.li(this,[H.m(this,0)])},
gce:function(){return H.bv(this.gc6(),new H.l3(this),H.m(this,0),H.m(this,1))},
a2:function(a){var z,y
if(typeof a==="string"){z=this.b
if(z==null)return!1
return this.f2(z,a)}else if(typeof a==="number"&&(a&0x3ffffff)===a){y=this.c
if(y==null)return!1
return this.f2(y,a)}else return this.jO(a)},
jO:function(a){var z=this.d
if(z==null)return!1
return this.cF(this.d8(z,this.cE(a)),a)>=0},
i:function(a,b){var z,y,x
if(typeof b==="string"){z=this.b
if(z==null)return
y=this.cn(z,b)
return y==null?null:y.gbS()}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null)return
y=this.cn(x,b)
return y==null?null:y.gbS()}else return this.jP(b)},
jP:function(a){var z,y,x
z=this.d
if(z==null)return
y=this.d8(z,this.cE(a))
x=this.cF(y,a)
if(x<0)return
return y[x].gbS()},
n:function(a,b,c){var z,y
if(typeof b==="string"){z=this.b
if(z==null){z=this.e4()
this.b=z}this.eX(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=this.e4()
this.c=y}this.eX(y,b,c)}else this.jR(b,c)},
jR:function(a,b){var z,y,x,w
z=this.d
if(z==null){z=this.e4()
this.d=z}y=this.cE(a)
x=this.d8(z,y)
if(x==null)this.ef(z,y,[this.e5(a,b)])
else{w=this.cF(x,a)
if(w>=0)x[w].sbS(b)
else x.push(this.e5(a,b))}},
kk:function(a,b){var z
if(this.a2(a))return this.i(0,a)
z=b.$0()
this.n(0,a,z)
return z},
a8:function(a,b){if(typeof b==="string")return this.fl(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.fl(this.c,b)
else return this.jQ(b)},
jQ:function(a){var z,y,x,w
z=this.d
if(z==null)return
y=this.d8(z,this.cE(a))
x=this.cF(y,a)
if(x<0)return
w=y.splice(x,1)[0]
this.fo(w)
return w.gbS()},
aZ:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
L:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$2(z.a,z.b)
if(y!==this.r)throw H.c(new P.B(this))
z=z.c}},
eX:function(a,b,c){var z=this.cn(a,b)
if(z==null)this.ef(a,b,this.e5(b,c))
else z.sbS(c)},
fl:function(a,b){var z
if(a==null)return
z=this.cn(a,b)
if(z==null)return
this.fo(z)
this.f3(a,b)
return z.gbS()},
e5:function(a,b){var z,y
z=new H.lh(a,b,null,null,[null,null])
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.d=y
y.c=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
fo:function(a){var z,y
z=a.giz()
y=a.c
if(z==null)this.e=y
else z.c=y
if(y==null)this.f=z
else y.d=z;--this.a
this.r=this.r+1&67108863},
cE:function(a){return J.j(a)&0x3ffffff},
cF:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.h(a[y].gfQ(),b))return y
return-1},
k:function(a){return P.dz(this)},
cn:function(a,b){return a[b]},
d8:function(a,b){return a[b]},
ef:function(a,b,c){a[b]=c},
f3:function(a,b){delete a[b]},
f2:function(a,b){return this.cn(a,b)!=null},
e4:function(){var z=Object.create(null)
this.ef(z,"<non-identifier-key>",z)
this.f3(z,"<non-identifier-key>")
return z},
$iskR:1,
$isF:1,
w:{
f3:function(a,b){return new H.O(0,null,null,null,null,null,0,[a,b])}}},
l3:{"^":"a:0;a",
$1:function(a){return this.a.i(0,a)}},
lh:{"^":"d;fQ:a<,bS:b@,c,iz:d<,$ti"},
li:{"^":"V;a,$ti",
gl:function(a){return this.a.a},
gK:function(a){return this.a.a===0},
gX:function(a){var z,y
z=this.a
y=new H.lj(z,z.r,null,null,this.$ti)
y.c=z.e
return y},
a1:function(a,b){return this.a.a2(b)},
L:function(a,b){var z,y,x
z=this.a
y=z.e
x=z.r
for(;y!=null;){b.$1(y.a)
if(x!==z.r)throw H.c(new P.B(z))
y=y.c}}},
lj:{"^":"d;a,b,c,d,$ti",
gF:function(){return this.d},
t:function(){var z=this.a
if(this.b!==z.r)throw H.c(new P.B(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.c
return!0}}}},
dq:{"^":"d;a,b,c,d",
k:function(a){return"RegExp/"+this.a+"/"},
giv:function(){var z=this.c
if(z!=null)return z
z=this.b
z=H.dr(this.a,z.multiline,!z.ignoreCase,!0)
this.c=z
return z},
giu:function(){var z=this.d
if(z!=null)return z
z=this.b
z=H.dr(this.a+"|()",z.multiline,!z.ignoreCase,!0)
this.d=z
return z},
df:function(a,b,c){if(c>b.length)throw H.c(P.a_(c,0,b.length,null,null))
return new H.p2(this,b,c)},
ek:function(a,b){return this.df(a,b,0)},
f6:function(a,b){var z,y
z=this.giv()
z.lastIndex=b
y=z.exec(a)
if(y==null)return
return new H.hj(this,y)},
ic:function(a,b){var z,y
z=this.giu()
z.lastIndex=b
y=z.exec(a)
if(y==null)return
if(0>=y.length)return H.e(y,-1)
if(y.pop()!=null)return
return new H.hj(this,y)},
fV:function(a,b,c){if(c>b.length)throw H.c(P.a_(c,0,b.length,null,null))
return this.ic(b,c)},
$isdH:1,
w:{
dr:function(a,b,c,d){var z,y,x,w
z=b?"m":""
y=c?"":"i"
x=d?"g":""
w=function(e,f){try{return new RegExp(e,f)}catch(v){return v}}(a,z+y+x)
if(w instanceof RegExp)return w
throw H.c(new P.eU("Illegal RegExp pattern ("+String(w)+")",a,null))}}},
hj:{"^":"d;a,b",
geS:function(){return this.b.index},
gfJ:function(){var z=this.b
return z.index+z[0].length},
i:function(a,b){var z=this.b
if(b>>>0!==b||b>=z.length)return H.e(z,b)
return z[b]},
$isbc:1},
p2:{"^":"bY;a,b,c",
gX:function(a){return new H.h9(this.a,this.b,this.c,null)},
$asbY:function(){return[P.bc]},
$asy:function(){return[P.bc]}},
h9:{"^":"d;a,b,c,d",
gF:function(){return this.d},
t:function(){var z,y,x,w
z=this.b
if(z==null)return!1
y=this.c
if(y<=z.length){x=this.a.f6(z,y)
if(x!=null){this.d=x
z=x.b
y=z.index
w=y+z[0].length
this.c=y===w?w+1:w
return!0}}this.d=null
this.b=null
return!1}},
fM:{"^":"d;eS:a<,b,c",
gfJ:function(){return this.a+this.c.length},
i:function(a,b){if(b!==0)H.f(P.c4(b,null,null))
return this.c},
$isbc:1},
q0:{"^":"y;a,b,c",
gX:function(a){return new H.q1(this.a,this.b,this.c,null)},
$asy:function(){return[P.bc]}},
q1:{"^":"d;a,b,c,d",
t:function(){var z,y,x,w,v,u,t
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
this.d=new H.fM(u,w,y)
this.c=t===this.c?t+1:t
return!0},
gF:function(){return this.d}}}],["","",,H,{"^":"",
rT:function(a){var z=H.r(a?Object.keys(a):[],[null])
z.fixed$length=Array
return z}}],["","",,H,{"^":"",
tq:function(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)}}],["","",,P,{"^":"",
p3:function(){var z,y,x
z={}
if(self.scheduleImmediate!=null)return P.qx()
if(self.MutationObserver!=null&&self.document!=null){y=self.document.createElement("div")
x=self.document.createElement("span")
z.a=null
new self.MutationObserver(H.d4(new P.p5(z),1)).observe(y,{childList:true})
return new P.p4(z,y,x)}else if(self.setImmediate!=null)return P.qy()
return P.qz()},
uZ:[function(a){++init.globalState.f.b
self.scheduleImmediate(H.d4(new P.p6(a),0))},"$1","qx",2,0,12],
v_:[function(a){++init.globalState.f.b
self.setImmediate(H.d4(new P.p7(a),0))},"$1","qy",2,0,12],
v0:[function(a){P.dX(C.w,a)},"$1","qz",2,0,12],
aD:function(a,b){P.e9(null,a)
return b.gfN()},
as:function(a,b){P.e9(a,b)},
aC:function(a,b){b.bP(a)},
aB:function(a,b){b.en(H.z(a),H.A(a))},
e9:function(a,b){var z,y,x,w
z=new P.qb(b)
y=new P.qc(b)
x=J.n(a)
if(!!x.$isE)a.eg(z,y)
else if(!!x.$isN)a.eH(z,y)
else{w=new P.E(0,$.p,null,[null])
w.a=4
w.c=a
w.eg(z,null)}},
at:function(a){var z=function(b,c){return function(d,e){while(true)try{b(d,e)
break}catch(y){e=y
d=c}}}(a,1)
$.p.toString
return new P.qv(z)},
d_:function(a,b,c){var z,y,x
if(b===0){if(c.gev())c.c.em()
else c.a.bf()
return}else if(b===1){if(c.gev())c.c.en(H.z(a),H.A(a))
else{z=H.z(a)
y=H.A(a)
c.a.ei(z,y)
c.a.bf()}return}if(a instanceof P.bH){if(c.gev()){b.$2(2,null)
return}z=a.b
if(z===0){z=a.a
J.aQ(c.a,z)
P.ck(new P.q9(b,c))
return}else if(z===1){x=a.a
c.a.j5(x,!1).bV(new P.qa(b,c))
return}}P.e9(a,b)},
qu:function(a){return a.gdN()},
ee:function(a,b){if(H.au(a,{func:1,args:[P.ao,P.ao]})){b.toString
return a}else{b.toString
return a}},
ax:function(a){return new P.q2(new P.E(0,$.p,null,[a]),[a])},
qk:function(a,b,c){$.p.toString
a.b3(b,c)},
qo:function(){var z,y
for(;z=$.bl,z!=null;){$.bL=null
y=z.gc9()
$.bl=y
if(y==null)$.bK=null
z.gj7().$0()}},
v3:[function(){$.ea=!0
try{P.qo()}finally{$.bL=null
$.ea=!1
if($.bl!=null)$.$get$e0().$1(P.hD())}},"$0","hD",0,0,6],
hx:function(a){var z=new P.ha(a,null)
if($.bl==null){$.bK=z
$.bl=z
if(!$.ea)$.$get$e0().$1(P.hD())}else{$.bK.b=z
$.bK=z}},
qt:function(a){var z,y,x
z=$.bl
if(z==null){P.hx(a)
$.bL=$.bK
return}y=new P.ha(a,null)
x=$.bL
if(x==null){y.b=z
$.bL=y
$.bl=y}else{y.b=x.b
x.b=y
$.bL=y
if(y.b==null)$.bK=y}},
ck:function(a){var z=$.p
if(C.f===z){P.bn(null,null,C.f,a)
return}z.toString
P.bn(null,null,z,z.el(a,!0))},
uW:function(a,b){return new P.q_(null,a,!1,[b])},
ef:function(a){var z,y,x,w
if(a==null)return
try{a.$0()}catch(x){z=H.z(x)
y=H.A(x)
w=$.p
w.toString
P.bm(null,null,w,z,y)}},
qp:[function(a,b){var z=$.p
z.toString
P.bm(null,null,z,a,b)},function(a){return P.qp(a,null)},"$2","$1","qB",2,2,17,0],
v2:[function(){},"$0","qA",0,0,6],
hw:function(a,b,c){var z,y,x,w,v,u,t
try{b.$1(a.$0())}catch(u){z=H.z(u)
y=H.A(u)
$.p.toString
x=null
if(x==null)c.$2(z,y)
else{t=x.gbg()
w=t
v=x.gbc()
c.$2(w,v)}}},
qd:function(a,b,c,d){var z=a.c5()
if(!!J.n(z).$isN&&z!==$.$get$ba())z.bX(new P.qf(b,c,d))
else b.b3(c,d)},
hl:function(a,b){return new P.qe(a,b)},
hm:function(a,b,c){var z=a.c5()
if(!!J.n(z).$isN&&z!==$.$get$ba())z.bX(new P.qg(b,c))
else b.b2(c)},
q8:function(a,b,c){$.p.toString
a.c2(b,c)},
os:function(a,b){var z=$.p
if(z===C.f){z.toString
return P.dX(a,b)}return P.dX(a,z.el(b,!0))},
dX:function(a,b){var z=C.d.bB(a.a,1000)
return H.op(z<0?0:z,b)},
oG:function(){return $.p},
bm:function(a,b,c,d,e){var z={}
z.a=d
P.qt(new P.qr(z,e))},
ht:function(a,b,c,d){var z,y
y=$.p
if(y===c)return d.$0()
$.p=c
z=y
try{y=d.$0()
return y}finally{$.p=z}},
hv:function(a,b,c,d,e){var z,y
y=$.p
if(y===c)return d.$1(e)
$.p=c
z=y
try{y=d.$1(e)
return y}finally{$.p=z}},
hu:function(a,b,c,d,e,f){var z,y
y=$.p
if(y===c)return d.$2(e,f)
$.p=c
z=y
try{y=d.$2(e,f)
return y}finally{$.p=z}},
bn:function(a,b,c,d){var z=C.f!==c
if(z)d=c.el(d,!(!z||!1))
P.hx(d)},
p5:{"^":"a:0;a",
$1:function(a){var z,y;--init.globalState.f.b
z=this.a
y=z.a
z.a=null
y.$0()}},
p4:{"^":"a:48;a,b,c",
$1:function(a){var z,y;++init.globalState.f.b
this.a.a=a
z=this.b
y=this.c
z.firstChild?z.removeChild(y):z.appendChild(y)}},
p6:{"^":"a:1;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
p7:{"^":"a:1;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
qb:{"^":"a:0;a",
$1:function(a){return this.a.$2(0,a)}},
qc:{"^":"a:16;a",
$2:function(a,b){this.a.$2(1,new H.dj(a,b))}},
qv:{"^":"a:30;a",
$2:function(a,b){this.a(a,b)}},
q9:{"^":"a:1;a,b",
$0:function(){var z=this.b
if(z.a.gcG()){z.b=!0
return}this.a.$2(null,0)}},
qa:{"^":"a:0;a,b",
$1:function(a){var z=this.b.c!=null?2:0
this.a.$2(z,null)}},
p8:{"^":"d;a,b,c",
gdN:function(){return this.a.gdN()},
gcG:function(){return this.a.gcG()},
gev:function(){return this.c!=null},
q:function(a,b){return J.aQ(this.a,b)},
ei:function(a,b){return this.a.ei(a,b)},
bf:function(){return this.a.bf()},
hU:function(a){var z=new P.pb(a)
this.a=new P.pg(null,0,null,new P.pd(z),null,new P.pe(this,z),new P.pf(this,a),[null])},
w:{
p9:function(a){var z=new P.p8(null,!1,null)
z.hU(a)
return z}}},
pb:{"^":"a:1;a",
$0:function(){P.ck(new P.pc(this.a))}},
pc:{"^":"a:1;a",
$0:function(){this.a.$2(0,null)}},
pd:{"^":"a:1;a",
$0:function(){this.a.$0()}},
pe:{"^":"a:1;a,b",
$0:function(){var z=this.a
if(z.b===!0){z.b=!1
this.b.$0()}}},
pf:{"^":"a:1;a,b",
$0:function(){var z=this.a
if(!z.a.gjW()){z.c=new P.cb(new P.E(0,$.p,null,[null]),[null])
if(z.b===!0){z.b=!1
P.ck(new P.pa(this.b))}return z.c.gfN()}}},
pa:{"^":"a:1;a",
$0:function(){this.a.$2(2,null)}},
bH:{"^":"d;a9:a<,b",
k:function(a){return"IterationMarker("+this.b+", "+H.b(this.a)+")"},
w:{
bI:function(a){return new P.bH(a,1)},
aK:function(){return C.aa},
hf:function(a){return new P.bH(a,0)},
aL:function(a){return new P.bH(a,3)}}},
b1:{"^":"d;a,b,c,d",
gF:function(){var z=this.c
return z==null?this.b:z.gF()},
t:function(){var z,y,x,w
for(;!0;){z=this.c
if(z!=null)if(z.t())return!0
else this.c=null
y=function(a,b,c){var v,u=b
while(true)try{return a(u,v)}catch(t){v=t
u=c}}(this.a,0,1)
if(y instanceof P.bH){x=y.b
if(x===2){z=this.d
if(z==null||z.length===0){this.b=null
return!1}if(0>=z.length)return H.e(z,-1)
this.a=z.pop()
continue}else{z=y.a
if(x===3)throw z
else{w=J.ah(z)
if(!!w.$isb1){z=this.d
if(z==null){z=[]
this.d=z}z.push(this.a)
this.a=w.a
continue}else{this.c=w
continue}}}}else{this.b=y
return!0}}return!1}},
q3:{"^":"bY;a",
gX:function(a){return new P.b1(this.a(),null,null,null)},
$asbY:I.b4,
$asy:I.b4,
w:{
aM:function(a){return new P.q3(a)}}},
N:{"^":"d;$ti"},
hc:{"^":"d;fN:a<,$ti",
en:function(a,b){if(a==null)a=new P.cI()
if(this.a.a!==0)throw H.c(new P.D("Future already completed"))
$.p.toString
this.b3(a,b)},
dj:function(a){return this.en(a,null)}},
cb:{"^":"hc;a,$ti",
bP:function(a){var z=this.a
if(z.a!==0)throw H.c(new P.D("Future already completed"))
z.bq(a)},
em:function(){return this.bP(null)},
b3:function(a,b){this.a.eZ(a,b)}},
q2:{"^":"hc;a,$ti",
bP:function(a){var z=this.a
if(z.a!==0)throw H.c(new P.D("Future already completed"))
z.b2(a)},
em:function(){return this.bP(null)},
b3:function(a,b){this.a.b3(a,b)}},
e5:{"^":"d;e7:a<,b,c,d,e,$ti",
giQ:function(){return this.b.b},
gfP:function(){return(this.c&1)!==0},
gjG:function(){return(this.c&2)!==0},
gfO:function(){return this.c===8},
jE:function(a){return this.b.b.eG(this.d,a)},
k9:function(a){if(this.c!==6)return!0
return this.b.b.eG(this.d,a.gbg())},
jA:function(a){var z,y
z=this.e
y=this.b.b
if(H.au(z,{func:1,args:[,,]}))return y.ky(z,a.gbg(),a.gbc())
else return y.eG(z,a.gbg())},
jF:function(){return this.b.b.hc(this.d)}},
E:{"^":"d;ct:a<,b,iE:c<,$ti",
gip:function(){return this.a===2},
ge3:function(){return this.a>=4},
eH:function(a,b){var z=$.p
if(z!==C.f){z.toString
if(b!=null)b=P.ee(b,z)}return this.eg(a,b)},
bV:function(a){return this.eH(a,null)},
eg:function(a,b){var z,y
z=new P.E(0,$.p,null,[null])
y=b==null?1:3
this.d3(new P.e5(null,z,y,a,b,[H.m(this,0),null]))
return z},
bX:function(a){var z,y
z=$.p
y=new P.E(0,z,null,this.$ti)
if(z!==C.f)z.toString
z=H.m(this,0)
this.d3(new P.e5(null,y,8,a,null,[z,z]))
return y},
d3:function(a){var z,y
z=this.a
if(z<=1){a.a=this.c
this.c=a}else{if(z===2){y=this.c
if(!y.ge3()){y.d3(a)
return}this.a=y.a
this.c=y.c}z=this.b
z.toString
P.bn(null,null,z,new P.pq(this,a))}},
fh:function(a){var z,y,x,w,v
z={}
z.a=a
if(a==null)return
y=this.a
if(y<=1){x=this.c
this.c=a
if(x!=null){for(w=a;w.ge7()!=null;)w=w.a
w.a=x}}else{if(y===2){v=this.c
if(!v.ge3()){v.fh(a)
return}this.a=v.a
this.c=v.c}z.a=this.da(a)
y=this.b
y.toString
P.bn(null,null,y,new P.px(z,this))}},
d9:function(){var z=this.c
this.c=null
return this.da(z)},
da:function(a){var z,y,x
for(z=a,y=null;z!=null;y=z,z=x){x=z.ge7()
z.a=y}return y},
b2:function(a){var z,y
z=this.$ti
if(H.aN(a,"$isN",z,"$asN"))if(H.aN(a,"$isE",z,null))P.cY(a,this)
else P.he(a,this)
else{y=this.d9()
this.a=4
this.c=a
P.bj(this,y)}},
b3:[function(a,b){var z=this.d9()
this.a=8
this.c=new P.cr(a,b)
P.bj(this,z)},function(a){return this.b3(a,null)},"kR","$2","$1","gbL",2,2,17,0],
bq:function(a){var z
if(H.aN(a,"$isN",this.$ti,"$asN")){this.i2(a)
return}this.a=1
z=this.b
z.toString
P.bn(null,null,z,new P.ps(this,a))},
i2:function(a){var z
if(H.aN(a,"$isE",this.$ti,null)){if(a.a===8){this.a=1
z=this.b
z.toString
P.bn(null,null,z,new P.pw(this,a))}else P.cY(a,this)
return}P.he(a,this)},
eZ:function(a,b){var z
this.a=1
z=this.b
z.toString
P.bn(null,null,z,new P.pr(this,a,b))},
hW:function(a,b){this.a=4
this.c=a},
$isN:1,
w:{
he:function(a,b){var z,y,x
b.a=1
try{a.eH(new P.pt(b),new P.pu(b))}catch(x){z=H.z(x)
y=H.A(x)
P.ck(new P.pv(b,z,y))}},
cY:function(a,b){var z,y,x
for(;a.gip();)a=a.c
z=a.ge3()
y=b.c
if(z){b.c=null
x=b.da(y)
b.a=a.a
b.c=a.c
P.bj(b,x)}else{b.a=2
b.c=a
a.fh(y)}},
bj:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z={}
z.a=a
for(y=a;!0;){x={}
w=y.a===8
if(b==null){if(w){v=y.c
y=y.b
u=v.gbg()
t=v.gbc()
y.toString
P.bm(null,null,y,u,t)}return}for(;b.ge7()!=null;b=s){s=b.a
b.a=null
P.bj(z.a,b)}r=z.a.c
x.a=w
x.b=r
y=!w
if(!y||b.gfP()||b.gfO()){q=b.giQ()
if(w){u=z.a.b
u.toString
u=u==null?q==null:u===q
if(!u)q.toString
else u=!0
u=!u}else u=!1
if(u){y=z.a
v=y.c
y=y.b
u=v.gbg()
t=v.gbc()
y.toString
P.bm(null,null,y,u,t)
return}p=$.p
if(p==null?q!=null:p!==q)$.p=q
else p=null
if(b.gfO())new P.pA(z,x,w,b).$0()
else if(y){if(b.gfP())new P.pz(x,b,r).$0()}else if(b.gjG())new P.py(z,x,b).$0()
if(p!=null)$.p=p
y=x.b
if(!!J.n(y).$isN){o=b.b
if(y.a>=4){n=o.c
o.c=null
b=o.da(n)
o.a=y.a
o.c=y.c
z.a=y
continue}else P.cY(y,o)
return}}o=b.b
b=o.d9()
y=x.a
u=x.b
if(!y){o.a=4
o.c=u}else{o.a=8
o.c=u}z.a=o
y=o}}}},
pq:{"^":"a:1;a,b",
$0:function(){P.bj(this.a,this.b)}},
px:{"^":"a:1;a,b",
$0:function(){P.bj(this.b,this.a.a)}},
pt:{"^":"a:0;a",
$1:function(a){var z=this.a
z.a=0
z.b2(a)}},
pu:{"^":"a:49;a",
$2:function(a,b){this.a.b3(a,b)},
$1:function(a){return this.$2(a,null)}},
pv:{"^":"a:1;a,b,c",
$0:function(){this.a.b3(this.b,this.c)}},
ps:{"^":"a:1;a,b",
$0:function(){var z,y
z=this.a
y=z.d9()
z.a=4
z.c=this.b
P.bj(z,y)}},
pw:{"^":"a:1;a,b",
$0:function(){P.cY(this.b,this.a)}},
pr:{"^":"a:1;a,b,c",
$0:function(){this.a.b3(this.b,this.c)}},
pA:{"^":"a:6;a,b,c,d",
$0:function(){var z,y,x,w,v,u,t
z=null
try{z=this.d.jF()}catch(w){y=H.z(w)
x=H.A(w)
if(this.c){v=this.a.a.c.gbg()
u=y
u=v==null?u==null:v===u
v=u}else v=!1
u=this.b
if(v)u.b=this.a.a.c
else u.b=new P.cr(y,x)
u.a=!0
return}if(!!J.n(z).$isN){if(z instanceof P.E&&z.gct()>=4){if(z.gct()===8){v=this.b
v.b=z.giE()
v.a=!0}return}t=this.a.a
v=this.b
v.b=z.bV(new P.pB(t))
v.a=!1}}},
pB:{"^":"a:0;a",
$1:function(a){return this.a}},
pz:{"^":"a:6;a,b,c",
$0:function(){var z,y,x,w
try{this.a.b=this.b.jE(this.c)}catch(x){z=H.z(x)
y=H.A(x)
w=this.a
w.b=new P.cr(z,y)
w.a=!0}}},
py:{"^":"a:6;a,b,c",
$0:function(){var z,y,x,w,v,u,t,s
try{z=this.a.a.c
w=this.c
if(w.k9(z)===!0&&w.e!=null){v=this.b
v.b=w.jA(z)
v.a=!1}}catch(u){y=H.z(u)
x=H.A(u)
w=this.a
v=w.a.c.gbg()
t=y
s=this.b
if(v==null?t==null:v===t)s.b=w.a.c
else s.b=new P.cr(y,x)
s.a=!0}}},
ha:{"^":"d;j7:a<,c9:b@"},
ac:{"^":"d;$ti",
aP:function(a,b){return new P.pP(b,this,[H.x(this,"ac",0),null])},
a1:function(a,b){var z,y
z={}
y=new P.E(0,$.p,null,[P.Y])
z.a=null
z.a=this.az(new P.nI(z,this,b,y),!0,new P.nJ(y),y.gbL())
return y},
L:function(a,b){var z,y
z={}
y=new P.E(0,$.p,null,[null])
z.a=null
z.a=this.az(new P.nM(z,this,b,y),!0,new P.nN(y),y.gbL())
return y},
gl:function(a){var z,y
z={}
y=new P.E(0,$.p,null,[P.u])
z.a=0
this.az(new P.nS(z),!0,new P.nT(z,y),y.gbL())
return y},
gK:function(a){var z,y
z={}
y=new P.E(0,$.p,null,[P.Y])
z.a=null
z.a=this.az(new P.nO(z,y),!0,new P.nP(y),y.gbL())
return y},
cd:function(a){var z,y,x
z=H.x(this,"ac",0)
y=H.r([],[z])
x=new P.E(0,$.p,null,[[P.L,z]])
this.az(new P.nU(this,y),!0,new P.nV(y,x),x.gbL())
return x},
bx:function(a){var z,y,x
z=H.x(this,"ac",0)
y=P.W(null,null,null,z)
x=new P.E(0,$.p,null,[[P.bA,z]])
this.az(new P.nW(this,y),!0,new P.nX(y,x),x.gbL())
return x},
gE:function(a){var z,y
z={}
y=new P.E(0,$.p,null,[H.x(this,"ac",0)])
z.a=null
z.b=!1
this.az(new P.nQ(z,this),!0,new P.nR(z,y),y.gbL())
return y}},
nI:{"^":"a;a,b,c,d",
$1:function(a){var z,y
z=this.a
y=this.d
P.hw(new P.nG(this.c,a),new P.nH(z,y),P.hl(z.a,y))},
$S:function(){return H.b2(function(a){return{func:1,args:[a]}},this.b,"ac")}},
nG:{"^":"a:1;a,b",
$0:function(){return J.h(this.b,this.a)}},
nH:{"^":"a:51;a,b",
$1:function(a){if(a===!0)P.hm(this.a.a,this.b,!0)}},
nJ:{"^":"a:1;a",
$0:function(){this.a.b2(!1)}},
nM:{"^":"a;a,b,c,d",
$1:function(a){P.hw(new P.nK(this.c,a),new P.nL(),P.hl(this.a.a,this.d))},
$S:function(){return H.b2(function(a){return{func:1,args:[a]}},this.b,"ac")}},
nK:{"^":"a:1;a,b",
$0:function(){return this.a.$1(this.b)}},
nL:{"^":"a:0;",
$1:function(a){}},
nN:{"^":"a:1;a",
$0:function(){this.a.b2(null)}},
nS:{"^":"a:0;a",
$1:function(a){++this.a.a}},
nT:{"^":"a:1;a,b",
$0:function(){this.b.b2(this.a.a)}},
nO:{"^":"a:0;a,b",
$1:function(a){P.hm(this.a.a,this.b,!1)}},
nP:{"^":"a:1;a",
$0:function(){this.a.b2(!0)}},
nU:{"^":"a;a,b",
$1:function(a){this.b.push(a)},
$S:function(){return H.b2(function(a){return{func:1,args:[a]}},this.a,"ac")}},
nV:{"^":"a:1;a,b",
$0:function(){this.b.b2(this.a)}},
nW:{"^":"a;a,b",
$1:function(a){this.b.q(0,a)},
$S:function(){return H.b2(function(a){return{func:1,args:[a]}},this.a,"ac")}},
nX:{"^":"a:1;a,b",
$0:function(){this.b.b2(this.a)}},
nQ:{"^":"a;a,b",
$1:function(a){var z=this.a
z.b=!0
z.a=a},
$S:function(){return H.b2(function(a){return{func:1,args:[a]}},this.b,"ac")}},
nR:{"^":"a:1;a,b",
$0:function(){var z,y,x,w
x=this.a
if(x.b){this.b.b2(x.a)
return}try{x=H.aa()
throw H.c(x)}catch(w){z=H.z(w)
y=H.A(w)
P.qk(this.b,z,y)}}},
cZ:{"^":"d;ct:b<,$ti",
gdN:function(){return new P.cW(this,this.$ti)},
gjW:function(){return(this.b&4)!==0},
gcG:function(){var z=this.b
return(z&1)!==0?this.gbA().gfd():(z&2)===0},
gix:function(){if((this.b&8)===0)return this.a
return this.a.gcV()},
dX:function(){var z,y
if((this.b&8)===0){z=this.a
if(z==null){z=new P.e7(null,null,0,this.$ti)
this.a=z}return z}y=this.a
if(y.gcV()==null)y.c=new P.e7(null,null,0,this.$ti)
return y.c},
gbA:function(){if((this.b&8)!==0)return this.a.gcV()
return this.a},
cj:function(){if((this.b&4)!==0)return new P.D("Cannot add event after closing")
return new P.D("Cannot add event while adding a stream")},
j5:function(a,b){var z,y,x,w
z=this.b
if(z>=4)throw H.c(this.cj())
if((z&2)!==0){z=new P.E(0,$.p,null,[null])
z.bq(null)
return z}z=this.a
y=new P.E(0,$.p,null,[null])
x=a.az(this.gi0(),!1,this.gi1(),this.ghY())
w=this.b
if((w&1)!==0?this.gbA().gfd():(w&2)===0)x.cK()
this.a=new P.pW(z,y,x,this.$ti)
this.b|=8
return y},
f5:function(){var z=this.c
if(z==null){z=(this.b&2)!==0?$.$get$ba():new P.E(0,$.p,null,[null])
this.c=z}return z},
q:[function(a,b){if(this.b>=4)throw H.c(this.cj())
this.bK(b)},"$1","giU",2,0,function(){return H.b2(function(a){return{func:1,v:true,args:[a]}},this.$receiver,"cZ")}],
ei:function(a,b){if(this.b>=4)throw H.c(this.cj())
if(a==null)a=new P.cI()
$.p.toString
this.c2(a,b)},
bf:function(){var z=this.b
if((z&4)!==0)return this.f5()
if(z>=4)throw H.c(this.cj())
z|=4
this.b=z
if((z&1)!==0)this.cr()
else if((z&3)===0)this.dX().q(0,C.u)
return this.f5()},
bK:[function(a){var z=this.b
if((z&1)!==0)this.cq(a)
else if((z&3)===0)this.dX().q(0,new P.e1(a,null,this.$ti))},"$1","gi0",2,0,function(){return H.b2(function(a){return{func:1,v:true,args:[a]}},this.$receiver,"cZ")}],
c2:[function(a,b){var z=this.b
if((z&1)!==0)this.cs(a,b)
else if((z&3)===0)this.dX().q(0,new P.e2(a,b,null))},"$2","ghY",4,0,38],
dR:[function(){var z=this.a
this.a=z.gcV()
this.b&=4294967287
z.a.bq(null)},"$0","gi1",0,0,6],
iL:function(a,b,c,d){var z,y,x,w,v
if((this.b&3)!==0)throw H.c(new P.D("Stream has already been listened to."))
z=$.p
y=d?1:0
x=new P.pk(this,null,null,null,z,y,null,null,this.$ti)
x.eW(a,b,c,d,H.m(this,0))
w=this.gix()
y=this.b|=1
if((y&8)!==0){v=this.a
v.scV(x)
v.b.cP()}else this.a=x
x.iJ(w)
x.e1(new P.pY(this))
return x},
iB:function(a){var z,y,x,w,v,u
z=null
if((this.b&8)!==0)z=this.a.c5()
this.a=null
this.b=this.b&4294967286|2
w=this.r
if(w!=null)if(z==null)try{z=w.$0()}catch(v){y=H.z(v)
x=H.A(v)
u=new P.E(0,$.p,null,[null])
u.eZ(y,x)
z=u}else z=z.bX(w)
w=new P.pX(this)
if(z!=null)z=z.bX(w)
else w.$0()
return z}},
pY:{"^":"a:1;a",
$0:function(){P.ef(this.a.d)}},
pX:{"^":"a:6;a",
$0:function(){var z=this.a.c
if(z!=null&&z.a===0)z.bq(null)}},
q5:{"^":"d;$ti",
cq:function(a){this.gbA().bK(a)},
cs:function(a,b){this.gbA().c2(a,b)},
cr:function(){this.gbA().dR()}},
ph:{"^":"d;$ti",
cq:function(a){this.gbA().c3(new P.e1(a,null,[H.m(this,0)]))},
cs:function(a,b){this.gbA().c3(new P.e2(a,b,null))},
cr:function(){this.gbA().c3(C.u)}},
pg:{"^":"cZ+ph;a,b,c,d,e,f,r,$ti"},
q4:{"^":"cZ+q5;a,b,c,d,e,f,r,$ti"},
cW:{"^":"pZ;a,$ti",
gv:function(a){return(H.az(this.a)^892482866)>>>0},
u:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof P.cW))return!1
return b.a===this.a}},
pk:{"^":"cc;x,a,b,c,d,e,f,r,$ti",
e8:function(){return this.x.iB(this)},
ea:[function(){var z=this.x
if((z.b&8)!==0)z.a.cK()
P.ef(z.e)},"$0","ge9",0,0,6],
ec:[function(){var z=this.x
if((z.b&8)!==0)z.a.cP()
P.ef(z.f)},"$0","geb",0,0,6]},
p0:{"^":"d;$ti",
cK:function(){this.b.cK()},
cP:function(){this.b.cP()},
c5:function(){var z=this.b.c5()
if(z==null){this.a.bq(null)
return}return z.bX(new P.p1(this))},
em:function(){this.a.bq(null)}},
p1:{"^":"a:1;a",
$0:function(){this.a.a.bq(null)}},
pW:{"^":"p0;cV:c@,a,b,$ti"},
cc:{"^":"d;ct:e<,$ti",
iJ:function(a){if(a==null)return
this.r=a
if(!a.gK(a)){this.e=(this.e|64)>>>0
this.r.cY(this)}},
kf:function(a){var z=this.e
if((z&8)!==0)return
this.e=(z+128|4)>>>0
if(z<128&&this.r!=null)this.r.fB()
if((z&4)===0&&(this.e&32)===0)this.e1(this.ge9())},
cK:function(){return this.kf(null)},
cP:function(){var z=this.e
if((z&8)!==0)return
if(z>=128){z-=128
this.e=z
if(z<128){if((z&64)!==0){z=this.r
z=!z.gK(z)}else z=!1
if(z)this.r.cY(this)
else{z=(this.e&4294967291)>>>0
this.e=z
if((z&32)===0)this.e1(this.geb())}}}},
c5:function(){var z=(this.e&4294967279)>>>0
this.e=z
if((z&8)===0)this.dS()
z=this.f
return z==null?$.$get$ba():z},
gfd:function(){return(this.e&4)!==0},
gcG:function(){return this.e>=128},
dS:function(){var z=(this.e|8)>>>0
this.e=z
if((z&64)!==0)this.r.fB()
if((this.e&32)===0)this.r=null
this.f=this.e8()},
bK:["hJ",function(a){var z=this.e
if((z&8)!==0)return
if(z<32)this.cq(a)
else this.c3(new P.e1(a,null,[H.x(this,"cc",0)]))}],
c2:["hK",function(a,b){var z=this.e
if((z&8)!==0)return
if(z<32)this.cs(a,b)
else this.c3(new P.e2(a,b,null))}],
dR:function(){var z=this.e
if((z&8)!==0)return
z=(z|2)>>>0
this.e=z
if(z<32)this.cr()
else this.c3(C.u)},
ea:[function(){},"$0","ge9",0,0,6],
ec:[function(){},"$0","geb",0,0,6],
e8:function(){return},
c3:function(a){var z,y
z=this.r
if(z==null){z=new P.e7(null,null,0,[H.x(this,"cc",0)])
this.r=z}z.q(0,a)
y=this.e
if((y&64)===0){y=(y|64)>>>0
this.e=y
if(y<128)this.r.cY(this)}},
cq:function(a){var z=this.e
this.e=(z|32)>>>0
this.d.hf(this.a,a)
this.e=(this.e&4294967263)>>>0
this.dU((z&4)!==0)},
cs:function(a,b){var z,y
z=this.e
y=new P.pj(this,a,b)
if((z&1)!==0){this.e=(z|16)>>>0
this.dS()
z=this.f
if(!!J.n(z).$isN&&z!==$.$get$ba())z.bX(y)
else y.$0()}else{y.$0()
this.dU((z&4)!==0)}},
cr:function(){var z,y
z=new P.pi(this)
this.dS()
this.e=(this.e|16)>>>0
y=this.f
if(!!J.n(y).$isN&&y!==$.$get$ba())y.bX(z)
else z.$0()},
e1:function(a){var z=this.e
this.e=(z|32)>>>0
a.$0()
this.e=(this.e&4294967263)>>>0
this.dU((z&4)!==0)},
dU:function(a){var z,y
if((this.e&64)!==0){z=this.r
z=z.gK(z)}else z=!1
if(z){z=(this.e&4294967231)>>>0
this.e=z
if((z&4)!==0)if(z<128){z=this.r
z=z==null||z.gK(z)}else z=!1
else z=!1
if(z)this.e=(this.e&4294967291)>>>0}for(;!0;a=y){z=this.e
if((z&8)!==0){this.r=null
return}y=(z&4)!==0
if(a===y)break
this.e=(z^32)>>>0
if(y)this.ea()
else this.ec()
this.e=(this.e&4294967263)>>>0}z=this.e
if((z&64)!==0&&z<128)this.r.cY(this)},
eW:function(a,b,c,d,e){var z=this.d
z.toString
this.a=a
this.b=P.ee(b==null?P.qB():b,z)
this.c=c==null?P.qA():c}},
pj:{"^":"a:6;a,b,c",
$0:function(){var z,y,x,w,v,u
z=this.a
y=z.e
if((y&8)!==0&&(y&16)===0)return
z.e=(y|32)>>>0
y=z.b
x=H.au(y,{func:1,args:[P.d,P.aU]})
w=z.d
v=this.b
u=z.b
if(x)w.kz(u,v,this.c)
else w.hf(u,v)
z.e=(z.e&4294967263)>>>0}},
pi:{"^":"a:6;a",
$0:function(){var z,y
z=this.a
y=z.e
if((y&16)===0)return
z.e=(y|42)>>>0
z.d.hd(z.c)
z.e=(z.e&4294967263)>>>0}},
pZ:{"^":"ac;$ti",
az:function(a,b,c,d){return this.a.iL(a,d,c,!0===b)},
eB:function(a,b,c){return this.az(a,null,b,c)}},
e3:{"^":"d;c9:a@,$ti"},
e1:{"^":"e3;a9:b<,a,$ti",
eC:function(a){a.cq(this.b)}},
e2:{"^":"e3;bg:b<,bc:c<,a",
eC:function(a){a.cs(this.b,this.c)},
$ase3:I.b4},
pl:{"^":"d;",
eC:function(a){a.cr()},
gc9:function(){return},
sc9:function(a){throw H.c(new P.D("No events after a done."))}},
pR:{"^":"d;ct:a<,$ti",
cY:function(a){var z=this.a
if(z===1)return
if(z>=1){this.a=1
return}P.ck(new P.pS(this,a))
this.a=1},
fB:function(){if(this.a===1)this.a=3}},
pS:{"^":"a:1;a,b",
$0:function(){var z,y,x,w
z=this.a
y=z.a
z.a=0
if(y===3)return
x=z.b
w=x.gc9()
z.b=w
if(w==null)z.c=null
x.eC(this.b)}},
e7:{"^":"pR;b,c,a,$ti",
gK:function(a){return this.c==null},
q:function(a,b){var z=this.c
if(z==null){this.c=b
this.b=b}else{z.sc9(b)
this.c=b}}},
q_:{"^":"d;a,b,c,$ti"},
qf:{"^":"a:1;a,b,c",
$0:function(){return this.a.b3(this.b,this.c)}},
qe:{"^":"a:16;a,b",
$2:function(a,b){P.qd(this.a,this.b,a,b)}},
qg:{"^":"a:1;a,b",
$0:function(){return this.a.b2(this.b)}},
e4:{"^":"ac;$ti",
az:function(a,b,c,d){return this.i9(a,d,c,!0===b)},
eB:function(a,b,c){return this.az(a,null,b,c)},
i9:function(a,b,c,d){return P.pp(this,a,b,c,d,H.x(this,"e4",0),H.x(this,"e4",1))},
fa:function(a,b){b.bK(a)},
im:function(a,b,c){c.c2(a,b)},
$asac:function(a,b){return[b]}},
hd:{"^":"cc;x,y,a,b,c,d,e,f,r,$ti",
bK:function(a){if((this.e&2)!==0)return
this.hJ(a)},
c2:function(a,b){if((this.e&2)!==0)return
this.hK(a,b)},
ea:[function(){var z=this.y
if(z==null)return
z.cK()},"$0","ge9",0,0,6],
ec:[function(){var z=this.y
if(z==null)return
z.cP()},"$0","geb",0,0,6],
e8:function(){var z=this.y
if(z!=null){this.y=null
return z.c5()}return},
kT:[function(a){this.x.fa(a,this)},"$1","gij",2,0,function(){return H.b2(function(a,b){return{func:1,v:true,args:[a]}},this.$receiver,"hd")}],
kV:[function(a,b){this.x.im(a,b,this)},"$2","gil",4,0,39],
kU:[function(){this.dR()},"$0","gik",0,0,6],
hV:function(a,b,c,d,e,f,g){this.y=this.x.a.eB(this.gij(),this.gik(),this.gil())},
$ascc:function(a,b){return[b]},
w:{
pp:function(a,b,c,d,e,f,g){var z,y
z=$.p
y=e?1:0
y=new P.hd(a,null,null,null,null,z,y,null,null,[f,g])
y.eW(b,c,d,e,g)
y.hV(a,b,c,d,e,f,g)
return y}}},
pP:{"^":"e4;b,a,$ti",
fa:function(a,b){var z,y,x,w
z=null
try{z=this.b.$1(a)}catch(w){y=H.z(w)
x=H.A(w)
P.q8(b,y,x)
return}b.bK(z)}},
cr:{"^":"d;bg:a<,bc:b<",
k:function(a){return H.b(this.a)},
$isZ:1},
q7:{"^":"d;"},
qr:{"^":"a:1;a,b",
$0:function(){var z,y,x
z=this.a
y=z.a
if(y==null){x=new P.cI()
z.a=x
z=x}else z=y
y=this.b
if(y==null)throw H.c(z)
x=H.c(z)
x.stack=J.i(y)
throw x}},
pT:{"^":"q7;",
hd:function(a){var z,y,x,w
try{if(C.f===$.p){x=a.$0()
return x}x=P.ht(null,null,this,a)
return x}catch(w){z=H.z(w)
y=H.A(w)
x=P.bm(null,null,this,z,y)
return x}},
hf:function(a,b){var z,y,x,w
try{if(C.f===$.p){x=a.$1(b)
return x}x=P.hv(null,null,this,a,b)
return x}catch(w){z=H.z(w)
y=H.A(w)
x=P.bm(null,null,this,z,y)
return x}},
kz:function(a,b,c){var z,y,x,w
try{if(C.f===$.p){x=a.$2(b,c)
return x}x=P.hu(null,null,this,a,b,c)
return x}catch(w){z=H.z(w)
y=H.A(w)
x=P.bm(null,null,this,z,y)
return x}},
el:function(a,b){if(b)return new P.pU(this,a)
else return new P.pV(this,a)},
i:function(a,b){return},
hc:function(a){if($.p===C.f)return a.$0()
return P.ht(null,null,this,a)},
eG:function(a,b){if($.p===C.f)return a.$1(b)
return P.hv(null,null,this,a,b)},
ky:function(a,b,c){if($.p===C.f)return a.$2(b,c)
return P.hu(null,null,this,a,b,c)}},
pU:{"^":"a:1;a,b",
$0:function(){return this.a.hd(this.b)}},
pV:{"^":"a:1;a,b",
$0:function(){return this.a.hc(this.b)}}}],["","",,P,{"^":"",
du:function(a,b){return new H.O(0,null,null,null,null,null,0,[a,b])},
ay:function(){return new H.O(0,null,null,null,null,null,0,[null,null])},
ab:function(a){return H.rU(a,new H.O(0,null,null,null,null,null,0,[null,null]))},
l0:function(a,b,c){var z,y
if(P.eb(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}z=[]
y=$.$get$bM()
y.push(a)
try{P.qn(a,z)}finally{if(0>=y.length)return H.e(y,-1)
y.pop()}y=P.fL(b,z,", ")+c
return y.charCodeAt(0)==0?y:y},
bZ:function(a,b,c){var z,y,x
if(P.eb(a))return b+"..."+c
z=new P.bF(b)
y=$.$get$bM()
y.push(a)
try{x=z
x.A=P.fL(x.gA(),a,", ")}finally{if(0>=y.length)return H.e(y,-1)
y.pop()}y=z
y.A=y.gA()+c
y=z.gA()
return y.charCodeAt(0)==0?y:y},
eb:function(a){var z,y
for(z=0;y=$.$get$bM(),z<y.length;++z)if(a===y[z])return!0
return!1},
qn:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=a.gX(a)
y=0
x=0
while(!0){if(!(y<80||x<3))break
if(!z.t())return
w=H.b(z.gF())
b.push(w)
y+=w.length+2;++x}if(!z.t()){if(x<=5)return
if(0>=b.length)return H.e(b,-1)
v=b.pop()
if(0>=b.length)return H.e(b,-1)
u=b.pop()}else{t=z.gF();++x
if(!z.t()){if(x<=4){b.push(H.b(t))
return}v=H.b(t)
if(0>=b.length)return H.e(b,-1)
u=b.pop()
y+=v.length+2}else{s=z.gF();++x
for(;z.t();t=s,s=r){r=z.gF();++x
if(x>100){while(!0){if(!(y>75&&x>3))break
if(0>=b.length)return H.e(b,-1)
y-=b.pop().length+2;--x}b.push("...")
return}}u=H.b(t)
v=H.b(s)
y+=v.length+u.length+4}}if(x>b.length+2){y+=5
q="..."}else q=null
while(!0){if(!(y>80&&b.length>3))break
if(0>=b.length)return H.e(b,-1)
y-=b.pop().length+2
if(q==null){y+=5
q="..."}}if(q!=null)b.push(q)
b.push(u)
b.push(v)},
lk:function(a,b,c,d,e){return new H.O(0,null,null,null,null,null,0,[d,e])},
c2:function(a,b,c){var z=P.lk(null,null,null,b,c)
a.L(0,new P.qD(z))
return z},
W:function(a,b,c,d){return new P.hg(0,null,null,null,null,null,0,[d])},
aZ:function(a,b){var z,y
z=P.W(null,null,null,b)
for(y=J.ah(a);y.t();)z.q(0,y.gF())
return z},
dz:function(a){var z,y,x
z={}
if(P.eb(a))return"{...}"
y=new P.bF("")
try{$.$get$bM().push(a)
x=y
x.A=x.gA()+"{"
z.a=!0
a.L(0,new P.lv(z,y))
z=y
z.A=z.gA()+"}"}finally{z=$.$get$bM()
if(0>=z.length)return H.e(z,-1)
z.pop()}z=y.gA()
return z.charCodeAt(0)==0?z:z},
hh:{"^":"O;a,b,c,d,e,f,r,$ti",
cE:function(a){return H.tl(a)&0x3ffffff},
cF:function(a,b){var z,y,x
if(a==null)return-1
z=a.length
for(y=0;y<z;++y){x=a[y].gfQ()
if(x==null?b==null:x===b)return y}return-1},
w:{
bJ:function(a,b){return new P.hh(0,null,null,null,null,null,0,[a,b])}}},
hg:{"^":"pC;a,b,c,d,e,f,r,$ti",
e6:function(){return new P.hg(0,null,null,null,null,null,0,this.$ti)},
gX:function(a){var z=new P.ae(this,this.r,null,null,[null])
z.c=this.e
return z},
gl:function(a){return this.a},
gK:function(a){return this.a===0},
gal:function(a){return this.a!==0},
a1:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null)return!1
return z[b]!=null}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null)return!1
return y[b]!=null}else return this.i7(b)},
i7:function(a){var z=this.d
if(z==null)return!1
return this.d6(z[this.d5(a)],a)>=0},
c8:function(a){var z
if(!(typeof a==="string"&&a!=="__proto__"))z=typeof a==="number"&&(a&0x3ffffff)===a
else z=!0
if(z)return this.a1(0,a)?a:null
else return this.ir(a)},
ir:function(a){var z,y,x
z=this.d
if(z==null)return
y=z[this.d5(a)]
x=this.d6(y,a)
if(x<0)return
return J.aw(y,x).gf4()},
L:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$1(z.a)
if(y!==this.r)throw H.c(new P.B(this))
z=z.b}},
gE:function(a){var z=this.f
if(z==null)throw H.c(new P.D("No elements"))
return z.a},
q:function(a,b){var z,y,x
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.b=y
z=y}return this.f_(z,b)}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.c=y
x=y}return this.f_(x,b)}else return this.ax(b)},
ax:function(a){var z,y,x
z=this.d
if(z==null){z=P.pL()
this.d=z}y=this.d5(a)
x=z[y]
if(x==null)z[y]=[this.dV(a)]
else{if(this.d6(x,a)>=0)return!1
x.push(this.dV(a))}return!0},
a8:function(a,b){if(typeof b==="string"&&b!=="__proto__")return this.f0(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.f0(this.c,b)
else return this.iC(b)},
iC:function(a){var z,y,x
z=this.d
if(z==null)return!1
y=z[this.d5(a)]
x=this.d6(y,a)
if(x<0)return!1
this.f1(y.splice(x,1)[0])
return!0},
ig:function(a,b){var z,y,x,w,v
z=this.e
for(;z!=null;z=x){y=z.a
x=z.b
w=this.r
v=a.$1(y)
if(w!==this.r)throw H.c(new P.B(this))
if(b===v)this.a8(0,y)}},
aZ:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
f_:function(a,b){if(a[b]!=null)return!1
a[b]=this.dV(b)
return!0},
f0:function(a,b){var z
if(a==null)return!1
z=a[b]
if(z==null)return!1
this.f1(z)
delete a[b]
return!0},
dV:function(a){var z,y
z=new P.pK(a,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.c=y
y.b=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
f1:function(a){var z,y
z=a.gi6()
y=a.b
if(z==null)this.e=y
else z.b=y
if(y==null)this.f=z
else y.c=z;--this.a
this.r=this.r+1&67108863},
d5:function(a){return J.j(a)&0x3ffffff},
d6:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.h(a[y].gf4(),b))return y
return-1},
$isbA:1,
$isV:1,
w:{
pL:function(){var z=Object.create(null)
z["<non-identifier-key>"]=z
delete z["<non-identifier-key>"]
return z}}},
pK:{"^":"d;f4:a<,b,i6:c<"},
ae:{"^":"d;a,b,c,d,$ti",
gF:function(){return this.d},
t:function(){var z=this.a
if(this.b!==z.r)throw H.c(new P.B(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.b
return!0}}}},
pC:{"^":"n5;$ti",
bx:function(a){var z=this.e6()
z.ao(0,this)
return z}},
bY:{"^":"y;$ti"},
qD:{"^":"a:7;a",
$2:function(a,b){this.a.n(0,a,b)}},
f4:{"^":"fa;$ti"},
fa:{"^":"d+b_;$ti",$asL:null,$asV:null,$isL:1,$isV:1},
b_:{"^":"d;$ti",
gX:function(a){return new H.dv(this,this.gl(this),0,null,[H.x(this,"b_",0)])},
ap:function(a,b){return this.i(0,b)},
L:function(a,b){var z,y
z=this.gl(this)
for(y=0;y<z;++y){b.$1(this.i(0,y))
if(z!==this.gl(this))throw H.c(new P.B(this))}},
gK:function(a){return this.gl(this)===0},
gal:function(a){return!this.gK(this)},
gE:function(a){if(this.gl(this)===0)throw H.c(H.aa())
return this.i(0,this.gl(this)-1)},
a1:function(a,b){var z,y
z=this.gl(this)
for(y=0;y<this.gl(this);++y){if(J.h(this.i(0,y),b))return!0
if(z!==this.gl(this))throw H.c(new P.B(this))}return!1},
bO:function(a,b){var z,y
z=this.gl(this)
for(y=0;y<z;++y){if(b.$1(this.i(0,y))===!0)return!0
if(z!==this.gl(this))throw H.c(new P.B(this))}return!1},
b6:function(a,b,c){var z,y,x
z=this.gl(this)
for(y=0;y<z;++y){x=this.i(0,y)
if(b.$1(x)===!0)return x
if(z!==this.gl(this))throw H.c(new P.B(this))}return c.$0()},
aP:function(a,b){return new H.aj(this,b,[H.x(this,"b_",0),null])},
dM:function(a,b){return H.fN(this,b,null,H.x(this,"b_",0))},
bx:function(a){var z,y
z=P.W(null,null,null,H.x(this,"b_",0))
for(y=0;y<this.gl(this);++y)z.q(0,this.i(0,y))
return z},
q:function(a,b){var z=this.gl(this)
this.sl(0,z+1)
this.n(0,z,b)},
a8:function(a,b){var z
for(z=0;z<this.gl(this);++z)if(J.h(this.i(0,z),b)){this.aQ(0,z,this.gl(this)-1,this,z+1)
this.sl(0,this.gl(this)-1)
return!0}return!1},
ie:function(a,b){var z,y,x,w
z=H.r([],[H.x(this,"b_",0)])
y=this.gl(this)
for(x=0;x<y;++x){w=this.i(0,x)
if(J.h(a.$1(w),b))z.push(w)
if(y!==this.gl(this))throw H.c(new P.B(this))}if(z.length!==this.gl(this)){this.hB(0,0,z.length,z)
this.sl(0,z.length)}},
aQ:function(a,b,c,d,e){var z,y,x,w,v
P.c5(b,c,this.gl(this),null,null,null)
z=c-b
if(z===0)return
if(H.aN(d,"$isL",[H.x(this,"b_",0)],"$asL")){y=e
x=d}else{x=J.iv(d,e).bw(0,!1)
y=0}w=J.H(x)
if(y+z>w.gl(x))throw H.c(H.eX())
if(y<b)for(v=z-1;v>=0;--v)this.n(0,b+v,w.i(x,y+v))
else for(v=0;v<z;++v)this.n(0,b+v,w.i(x,y+v))},
hB:function(a,b,c,d){return this.aQ(a,b,c,d,0)},
bE:function(a,b,c){var z
if(c>=this.gl(this))return-1
for(z=c;z<this.gl(this);++z)if(J.h(this.i(0,z),b))return z
return-1},
aN:function(a,b){return this.bE(a,b,0)},
k:function(a){return P.bZ(this,"[","]")},
$isL:1,
$isV:1},
q6:{"^":"d;$ti",
n:function(a,b,c){throw H.c(new P.P("Cannot modify unmodifiable map"))},
$isF:1},
lt:{"^":"d;$ti",
i:function(a,b){return this.a.i(0,b)},
n:function(a,b,c){this.a.n(0,b,c)},
a2:function(a){return this.a.a2(a)},
L:function(a,b){this.a.L(0,b)},
gK:function(a){var z=this.a
return z.gK(z)},
gal:function(a){var z=this.a
return z.gal(z)},
gl:function(a){var z=this.a
return z.gl(z)},
k:function(a){return this.a.k(0)},
$isF:1},
h8:{"^":"lt+q6;a,$ti",$asF:null,$isF:1},
lv:{"^":"a:7;a,b",
$2:function(a,b){var z,y
z=this.a
if(!z.a)this.b.A+=", "
z.a=!1
z=this.b
y=z.A+=H.b(a)
z.A=y+": "
z.A+=H.b(b)}},
ll:{"^":"aT;a,b,c,d,$ti",
gX:function(a){return new P.hi(this,this.c,this.d,this.b,null,this.$ti)},
L:function(a,b){var z,y,x
z=this.d
for(y=this.b;y!==this.c;y=(y+1&this.a.length-1)>>>0){x=this.a
if(y<0||y>=x.length)return H.e(x,y)
b.$1(x[y])
if(z!==this.d)H.f(new P.B(this))}},
gK:function(a){return this.b===this.c},
gl:function(a){return(this.c-this.b&this.a.length-1)>>>0},
gE:function(a){var z,y,x
z=this.b
y=this.c
if(z===y)throw H.c(H.aa())
z=this.a
x=z.length
y=(y-1&x-1)>>>0
if(y<0||y>=x)return H.e(z,y)
return z[y]},
ap:function(a,b){var z,y,x,w
z=(this.c-this.b&this.a.length-1)>>>0
if(0>b||b>=z)H.f(P.cD(b,this,"index",null,z))
y=this.a
x=y.length
w=(this.b+b&x-1)>>>0
if(w<0||w>=x)return H.e(y,w)
return y[w]},
q:function(a,b){this.ax(b)},
ao:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=this.$ti
if(H.aN(b,"$isL",z,"$asL")){y=b.gl(b)
x=this.gl(this)
w=x+y
v=this.a
u=v.length
if(w>=u){t=P.lm(w+(w>>>1))
if(typeof t!=="number")return H.v(t)
v=new Array(t)
v.fixed$length=Array
s=H.r(v,z)
this.c=this.iP(s)
this.a=s
this.b=0
C.a.aQ(s,x,w,b,0)
this.c+=y}else{z=this.c
r=u-z
if(y<r){C.a.aQ(v,z,z+y,b,0)
this.c+=y}else{q=y-r
C.a.aQ(v,z,z+r,b,0)
C.a.aQ(this.a,0,q,b,r)
this.c=q}}++this.d}else for(z=new P.hi(b,b.c,b.d,b.b,null,[H.m(b,0)]);z.t();)this.ax(z.e)},
aZ:function(a){var z,y,x,w,v
z=this.b
y=this.c
if(z!==y){for(x=this.a,w=x.length,v=w-1;z!==y;z=(z+1&v)>>>0){if(z<0||z>=w)return H.e(x,z)
x[z]=null}this.c=0
this.b=0;++this.d}},
k:function(a){return P.bZ(this,"{","}")},
fw:function(a){var z,y,x
z=this.b
y=this.a
x=y.length
z=(z-1&x-1)>>>0
this.b=z
if(z<0||z>=x)return H.e(y,z)
y[z]=a
if(z===this.c)this.f9();++this.d},
dw:function(){var z,y,x,w
z=this.b
if(z===this.c)throw H.c(H.aa());++this.d
y=this.a
x=y.length
if(z>=x)return H.e(y,z)
w=y[z]
y[z]=null
this.b=(z+1&x-1)>>>0
return w},
ax:function(a){var z,y,x
z=this.a
y=this.c
x=z.length
if(y<0||y>=x)return H.e(z,y)
z[y]=a
x=(y+1&x-1)>>>0
this.c=x
if(this.b===x)this.f9();++this.d},
f9:function(){var z,y,x,w
z=new Array(this.a.length*2)
z.fixed$length=Array
y=H.r(z,this.$ti)
z=this.a
x=this.b
w=z.length-x
C.a.aQ(y,0,w,z,x)
C.a.aQ(y,w,w+this.b,this.a,0)
this.b=0
this.c=this.a.length
this.a=y},
iP:function(a){var z,y,x,w,v
z=this.b
y=this.c
x=this.a
if(z<=y){w=y-z
C.a.aQ(a,0,w,x,z)
return w}else{v=x.length-z
C.a.aQ(a,0,v,x,z)
C.a.aQ(a,v,v+this.c,this.a,0)
return this.c+v}},
hM:function(a,b){var z=new Array(8)
z.fixed$length=Array
this.a=H.r(z,[b])},
w:{
b0:function(a,b){var z=new P.ll(null,0,0,0,[b])
z.hM(a,b)
return z},
lm:function(a){var z
a=C.t.eO(a,1)-1
for(;!0;a=z)z=(a&a-1)>>>0}}},
hi:{"^":"d;a,b,c,d,e,$ti",
gF:function(){return this.e},
t:function(){var z,y,x
z=this.a
if(this.c!==z.d)H.f(new P.B(z))
y=this.d
if(y===this.b){this.e=null
return!1}z=z.a
x=z.length
if(y>=x)return H.e(z,y)
this.e=z[y]
this.d=(y+1&x-1)>>>0
return!0}},
n6:{"^":"d;$ti",
gK:function(a){return this.a===0},
gal:function(a){return this.a!==0},
ao:function(a,b){var z
for(z=J.ah(b);z.t();)this.q(0,z.gF())},
jd:function(a){var z,y
for(z=a.a,y=new P.ae(z,z.r,null,null,[null]),y.c=z.e;y.t();)if(!this.a1(0,y.d))return!1
return!0},
bw:function(a,b){var z,y,x,w,v
z=H.r([],this.$ti)
C.a.sl(z,this.a)
for(y=new P.ae(this,this.r,null,null,[null]),y.c=this.e,x=0;y.t();x=v){w=y.d
v=x+1
if(x>=z.length)return H.e(z,x)
z[x]=w}return z},
cd:function(a){return this.bw(a,!0)},
aP:function(a,b){return new H.bs(this,b,[H.m(this,0),null])},
k:function(a){return P.bZ(this,"{","}")},
L:function(a,b){var z
for(z=new P.ae(this,this.r,null,null,[null]),z.c=this.e;z.t();)b.$1(z.d)},
bh:function(a,b,c){var z,y
for(z=new P.ae(this,this.r,null,null,[null]),z.c=this.e,y=b;z.t();)y=c.$2(y,z.d)
return y},
gE:function(a){var z,y
z=new P.ae(this,this.r,null,null,[null])
z.c=this.e
if(!z.t())throw H.c(H.aa())
do y=z.d
while(z.t())
return y},
b6:function(a,b,c){var z,y
for(z=new P.ae(this,this.r,null,null,[null]),z.c=this.e;z.t();){y=z.d
if(b.$1(y)===!0)return y}if(c!=null)return c.$0()
throw H.c(H.aa())},
dl:function(a,b){return this.b6(a,b,null)},
aK:function(a,b){var z,y,x,w
for(z=new P.ae(this,this.r,null,null,[null]),z.c=this.e,y=null,x=!1;z.t();){w=z.d
if(b.$1(w)===!0){if(x)throw H.c(H.dn())
y=w
x=!0}}if(x)return y
throw H.c(H.aa())},
$isbA:1,
$isV:1},
n5:{"^":"n6;$ti"}}],["","",,P,{"^":"",
d0:function(a){var z
if(a==null)return
if(typeof a!="object")return a
if(Object.getPrototypeOf(a)!==Array.prototype)return new P.pF(a,Object.create(null),null)
for(z=0;z<a.length;++z)a[z]=P.d0(a[z])
return a},
qq:function(a,b){var z,y,x,w
if(typeof a!=="string")throw H.c(H.Q(a))
z=null
try{z=JSON.parse(a)}catch(x){y=H.z(x)
w=String(y)
throw H.c(new P.eU(w,null,null))}w=P.d0(z)
return w},
v1:[function(a){return a.dA()},"$1","rz",2,0,0],
pF:{"^":"d;a,b,c",
i:function(a,b){var z,y
z=this.b
if(z==null)return this.c.i(0,b)
else if(typeof b!=="string")return
else{y=z[b]
return typeof y=="undefined"?this.iA(b):y}},
gl:function(a){var z
if(this.b==null){z=this.c
z=z.gl(z)}else z=this.cl().length
return z},
gK:function(a){var z
if(this.b==null){z=this.c
z=z.gl(z)}else z=this.cl().length
return z===0},
gal:function(a){var z
if(this.b==null){z=this.c
z=z.gl(z)}else z=this.cl().length
return z>0},
n:function(a,b,c){var z,y
if(this.b==null)this.c.n(0,b,c)
else if(this.a2(b)){z=this.b
z[b]=c
y=this.a
if(y==null?z!=null:y!==z)y[b]=null}else this.iN().n(0,b,c)},
a2:function(a){if(this.b==null)return this.c.a2(a)
if(typeof a!=="string")return!1
return Object.prototype.hasOwnProperty.call(this.a,a)},
L:function(a,b){var z,y,x,w
if(this.b==null)return this.c.L(0,b)
z=this.cl()
for(y=0;y<z.length;++y){x=z[y]
w=this.b[x]
if(typeof w=="undefined"){w=P.d0(this.a[x])
this.b[x]=w}b.$2(x,w)
if(z!==this.c)throw H.c(new P.B(this))}},
k:function(a){return P.dz(this)},
cl:function(){var z=this.c
if(z==null){z=Object.keys(this.a)
this.c=z}return z},
iN:function(){var z,y,x,w,v
if(this.b==null)return this.c
z=P.du(P.q,null)
y=this.cl()
for(x=0;w=y.length,x<w;++x){v=y[x]
z.n(0,v,this.i(0,v))}if(w===0)y.push(null)
else C.a.sl(y,0)
this.b=null
this.a=null
this.c=z
return z},
iA:function(a){var z
if(!Object.prototype.hasOwnProperty.call(this.a,a))return
z=P.d0(this.a[a])
return this.b[a]=z},
$isF:1,
$asF:function(){return[P.q,null]}},
eL:{"^":"d;$ti"},
cx:{"^":"d;$ti"},
dt:{"^":"Z;a,b",
k:function(a){if(this.b!=null)return"Converting object to an encodable object failed."
else return"Converting object did not return an encodable object."}},
l6:{"^":"dt;a,b",
k:function(a){return"Cyclic error in JSON stringify"}},
l5:{"^":"eL;a,b",
jh:function(a,b){var z=P.qq(a,this.gji().a)
return z},
jg:function(a){return this.jh(a,null)},
jq:function(a,b){var z=this.gjr()
z=P.pH(a,z.b,z.a)
return z},
fI:function(a){return this.jq(a,null)},
gjr:function(){return C.O},
gji:function(){return C.N},
$aseL:function(){return[P.d,P.q]}},
l8:{"^":"cx;a,b",
$ascx:function(){return[P.d,P.q]}},
l7:{"^":"cx;a",
$ascx:function(){return[P.q,P.d]}},
pI:{"^":"d;",
ho:function(a){var z,y,x,w,v,u,t
z=J.H(a)
y=z.gl(a)
if(typeof y!=="number")return H.v(y)
x=this.c
w=0
v=0
for(;v<y;++v){u=z.cB(a,v)
if(u>92)continue
if(u<32){if(v>w)x.A+=C.b.aB(a,w,v)
w=v+1
x.A+=H.ak(92)
switch(u){case 8:x.A+=H.ak(98)
break
case 9:x.A+=H.ak(116)
break
case 10:x.A+=H.ak(110)
break
case 12:x.A+=H.ak(102)
break
case 13:x.A+=H.ak(114)
break
default:x.A+=H.ak(117)
x.A+=H.ak(48)
x.A+=H.ak(48)
t=u>>>4&15
x.A+=H.ak(t<10?48+t:87+t)
t=u&15
x.A+=H.ak(t<10?48+t:87+t)
break}}else if(u===34||u===92){if(v>w)x.A+=C.b.aB(a,w,v)
w=v+1
x.A+=H.ak(92)
x.A+=H.ak(u)}}if(w===0)x.A+=H.b(a)
else if(w<y)x.A+=z.aB(a,w,y)},
dT:function(a){var z,y,x,w
for(z=this.a,y=z.length,x=0;x<y;++x){w=z[x]
if(a==null?w==null:a===w)throw H.c(new P.l6(a,null))}z.push(a)},
dD:function(a){var z,y,x,w
if(this.hn(a))return
this.dT(a)
try{z=this.b.$1(a)
if(!this.hn(z))throw H.c(new P.dt(a,null))
x=this.a
if(0>=x.length)return H.e(x,-1)
x.pop()}catch(w){y=H.z(w)
throw H.c(new P.dt(a,y))}},
hn:function(a){var z,y
if(typeof a==="number"){if(!isFinite(a))return!1
this.c.A+=C.j.k(a)
return!0}else if(a===!0){this.c.A+="true"
return!0}else if(a===!1){this.c.A+="false"
return!0}else if(a==null){this.c.A+="null"
return!0}else if(typeof a==="string"){z=this.c
z.A+='"'
this.ho(a)
z.A+='"'
return!0}else{z=J.n(a)
if(!!z.$isL){this.dT(a)
this.kM(a)
z=this.a
if(0>=z.length)return H.e(z,-1)
z.pop()
return!0}else if(!!z.$isF){this.dT(a)
y=this.kN(a)
z=this.a
if(0>=z.length)return H.e(z,-1)
z.pop()
return y}else return!1}},
kM:function(a){var z,y,x
z=this.c
z.A+="["
y=J.H(a)
if(y.gl(a)>0){this.dD(y.i(a,0))
for(x=1;x<y.gl(a);++x){z.A+=","
this.dD(y.i(a,x))}}z.A+="]"},
kN:function(a){var z,y,x,w,v,u,t
z={}
if(a.gK(a)){this.c.A+="{}"
return!0}y=a.gl(a)*2
x=new Array(y)
z.a=0
z.b=!0
a.L(0,new P.pJ(z,x))
if(!z.b)return!1
w=this.c
w.A+="{"
for(v='"',u=0;u<y;u+=2,v=',"'){w.A+=v
this.ho(x[u])
w.A+='":'
t=u+1
if(t>=y)return H.e(x,t)
this.dD(x[t])}w.A+="}"
return!0}},
pJ:{"^":"a:7;a,b",
$2:function(a,b){var z,y,x,w,v
if(typeof a!=="string")this.a.b=!1
z=this.b
y=this.a
x=y.a
w=x+1
y.a=w
v=z.length
if(x>=v)return H.e(z,x)
z[x]=a
y.a=w+1
if(w>=v)return H.e(z,w)
z[w]=b}},
pG:{"^":"pI;c,a,b",w:{
pH:function(a,b,c){var z,y,x
z=new P.bF("")
y=new P.pG(z,[],P.rz())
y.dD(a)
x=z.A
return x.charCodeAt(0)==0?x:x}}}}],["","",,P,{"^":"",
uy:[function(a,b){return J.bS(a,b)},"$2","rA",4,0,40],
eQ:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.i(a)
if(typeof a==="string")return JSON.stringify(a)
return P.km(a)},
km:function(a){var z=J.n(a)
if(!!z.$isa)return z.k(a)
return H.cK(a)},
cA:function(a){return new P.po(a)},
T:function(a,b,c){var z,y
z=H.r([],[c])
for(y=J.ah(a);y.t();)z.push(y.gF())
if(b)return z
z.fixed$length=Array
return z},
ln:function(a,b,c,d){var z,y,x
z=H.r(new Array(a),[d])
for(y=0;y<a;++y){x=b.$1(y)
if(y>=z.length)return H.e(z,y)
z[y]=x}return z},
bu:function(a,b){var z=P.T(a,!1,b)
z.fixed$length=Array
z.immutable$list=Array
return z},
eo:function(a){H.tq(H.b(a))},
be:function(a,b,c){return new H.dq(a,H.dr(a,!1,b,!1),null,null)},
Y:{"^":"d;"},
"+bool":0,
S:{"^":"d;$ti"},
cy:{"^":"d;iO:a<,b",
u:function(a,b){if(b==null)return!1
if(!(b instanceof P.cy))return!1
return this.a===b.a&&!0},
bs:function(a,b){return C.d.bs(this.a,b.giO())},
gv:function(a){var z=this.a
return(z^C.d.dd(z,30))&1073741823},
k:function(a){var z,y,x,w,v,u,t,s
z=P.jI(H.me(this))
y=P.bU(H.mc(this))
x=P.bU(H.m8(this))
w=P.bU(H.m9(this))
v=P.bU(H.mb(this))
u=P.bU(H.md(this))
t=P.jJ(H.ma(this))
s=z+"-"+y+"-"+x+" "+w+":"+v+":"+u+"."+t
return s},
q:function(a,b){var z,y
z=this.a+b.gjK()
y=new P.cy(z,!1)
if(!(Math.abs(z)>864e13))z=!1
else z=!0
if(z)H.f(P.C(y.gka()))
return y},
gka:function(){return this.a},
$isS:1,
$asS:function(){return[P.cy]},
w:{
jI:function(a){var z,y
z=Math.abs(a)
y=a<0?"-":""
if(z>=1000)return""+a
if(z>=100)return y+"0"+H.b(z)
if(z>=10)return y+"00"+H.b(z)
return y+"000"+H.b(z)},
jJ:function(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},
bU:function(a){if(a>=10)return""+a
return"0"+a}}},
aO:{"^":"J;",$isS:1,
$asS:function(){return[P.J]}},
"+double":0,
aY:{"^":"d;bM:a<",
a6:function(a,b){return new P.aY(this.a+b.gbM())},
aw:function(a,b){return new P.aY(this.a-b.gbM())},
c_:function(a,b){if(typeof b!=="number")return H.v(b)
return new P.aY(C.j.hb(this.a*b))},
aJ:function(a,b){return C.d.aJ(this.a,b.gbM())},
bp:function(a,b){return this.a>b.gbM()},
bZ:function(a,b){return C.d.bZ(this.a,b.gbM())},
bI:function(a,b){return C.d.bI(this.a,b.gbM())},
gjK:function(){return C.d.bB(this.a,1000)},
u:function(a,b){if(b==null)return!1
if(!(b instanceof P.aY))return!1
return this.a===b.a},
gv:function(a){return this.a&0x1FFFFFFF},
bs:function(a,b){return C.d.bs(this.a,b.gbM())},
k:function(a){var z,y,x,w,v
z=new P.k3()
y=this.a
if(y<0)return"-"+new P.aY(0-y).k(0)
x=z.$1(C.d.bB(y,6e7)%60)
w=z.$1(C.d.bB(y,1e6)%60)
v=new P.k2().$1(y%1e6)
return""+C.d.bB(y,36e8)+":"+H.b(x)+":"+H.b(w)+"."+H.b(v)},
eN:function(a){return new P.aY(0-this.a)},
$isS:1,
$asS:function(){return[P.aY]}},
k2:{"^":"a:11;",
$1:function(a){if(a>=1e5)return""+a
if(a>=1e4)return"0"+a
if(a>=1000)return"00"+a
if(a>=100)return"000"+a
if(a>=10)return"0000"+a
return"00000"+a}},
k3:{"^":"a:11;",
$1:function(a){if(a>=10)return""+a
return"0"+a}},
Z:{"^":"d;",
gbc:function(){return H.A(this.$thrownJsError)}},
cI:{"^":"Z;",
k:function(a){return"Throw of null."}},
aX:{"^":"Z;a,b,h:c<,d",
gdZ:function(){return"Invalid argument"+(!this.a?"(s)":"")},
gdY:function(){return""},
k:function(a){var z,y,x,w,v,u
z=this.c
y=z!=null?" ("+z+")":""
z=this.d
x=z==null?"":": "+H.b(z)
w=this.gdZ()+y+x
if(!this.a)return w
v=this.gdY()
u=P.eQ(this.b)
return w+v+": "+H.b(u)},
w:{
C:function(a){return new P.aX(!1,null,null,a)},
cq:function(a,b,c){return new P.aX(!0,a,b,c)},
l:function(a){return new P.aX(!1,null,a,"Must not be null")}}},
dO:{"^":"aX;e,f,a,b,c,d",
gdZ:function(){return"RangeError"},
gdY:function(){var z,y,x
z=this.e
if(z==null){z=this.f
y=z!=null?": Not less than or equal to "+H.b(z):""}else{x=this.f
if(x==null)y=": Not greater than or equal to "+H.b(z)
else if(x>z)y=": Not in range "+H.b(z)+".."+H.b(x)+", inclusive"
else y=x<z?": Valid value range is empty":": Only valid value is "+H.b(z)}return y},
w:{
mk:function(a){return new P.dO(null,null,!1,null,null,a)},
c4:function(a,b,c){return new P.dO(null,null,!0,a,b,"Value not in range")},
a_:function(a,b,c,d,e){return new P.dO(b,c,!0,a,d,"Invalid value")},
ml:function(a,b,c,d,e){if(a<b||a>c)throw H.c(P.a_(a,b,c,d,e))},
c5:function(a,b,c,d,e,f){if(0>a||a>c)throw H.c(P.a_(a,0,c,"start",f))
if(a>b||b>c)throw H.c(P.a_(b,a,c,"end",f))
return b}}},
kQ:{"^":"aX;e,l:f>,a,b,c,d",
gdZ:function(){return"RangeError"},
gdY:function(){if(J.bQ(this.b,0))return": index must not be negative"
var z=this.f
if(z===0)return": no indices are valid"
return": index should be less than "+H.b(z)},
w:{
cD:function(a,b,c,d,e){var z=e!=null?e:J.aG(b)
return new P.kQ(b,z,!0,a,c,"Index out of range")}}},
P:{"^":"Z;a",
k:function(a){return"Unsupported operation: "+this.a}},
ad:{"^":"Z;a",
k:function(a){var z=this.a
return z!=null?"UnimplementedError: "+z:"UnimplementedError"}},
D:{"^":"Z;a",
k:function(a){return"Bad state: "+this.a}},
B:{"^":"Z;a",
k:function(a){var z=this.a
if(z==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+H.b(P.eQ(z))+"."}},
lK:{"^":"d;",
k:function(a){return"Out of Memory"},
gbc:function(){return},
$isZ:1},
fG:{"^":"d;",
k:function(a){return"Stack Overflow"},
gbc:function(){return},
$isZ:1},
jH:{"^":"Z;a",
k:function(a){var z=this.a
return z==null?"Reading static variable during its initialization":"Reading static variable '"+H.b(z)+"' during its initialization"}},
po:{"^":"d;a",
k:function(a){var z=this.a
if(z==null)return"Exception"
return"Exception: "+H.b(z)}},
eU:{"^":"d;a,b,c",
k:function(a){var z,y,x
z=this.a
y=""!==z?"FormatException: "+z:"FormatException"
x=this.b
if(typeof x!=="string")return y
if(x.length>78)x=C.b.aB(x,0,75)+"..."
return y+"\n"+x}},
kq:{"^":"d;h:a<,fe,$ti",
k:function(a){return"Expando:"+H.b(this.a)},
i:function(a,b){var z,y
z=this.fe
if(typeof z!=="string"){if(b==null||typeof b==="boolean"||typeof b==="number"||typeof b==="string")H.f(P.cq(b,"Expandos are not allowed on strings, numbers, booleans or null",null))
return z.get(b)}y=H.dK(b,"expando$values")
return y==null?null:H.dK(y,z)},
n:function(a,b,c){var z,y
z=this.fe
if(typeof z!=="string")z.set(b,c)
else{y=H.dK(b,"expando$values")
if(y==null){y=new P.d()
H.fk(b,"expando$values",y)}H.fk(y,z,c)}}},
bt:{"^":"d;"},
u:{"^":"J;",$isS:1,
$asS:function(){return[P.J]}},
"+int":0,
y:{"^":"d;$ti",
aP:function(a,b){return H.bv(this,b,H.x(this,"y",0),null)},
bY:["dP",function(a,b){return new H.K(this,b,[H.x(this,"y",0)])}],
a1:function(a,b){var z
for(z=this.gX(this);z.t();)if(J.h(z.gF(),b))return!0
return!1},
L:function(a,b){var z
for(z=this.gX(this);z.t();)b.$1(z.gF())},
bh:function(a,b,c){var z,y
for(z=this.gX(this),y=b;z.t();)y=c.$2(y,z.gF())
return y},
bw:function(a,b){return P.T(this,b,H.x(this,"y",0))},
cd:function(a){return this.bw(a,!0)},
bx:function(a){return P.aZ(this,H.x(this,"y",0))},
gl:function(a){var z,y
z=this.gX(this)
for(y=0;z.t();)++y
return y},
gK:function(a){return!this.gX(this).t()},
gal:function(a){return!this.gK(this)},
dM:function(a,b){return H.n8(this,b,H.x(this,"y",0))},
gE:function(a){var z,y
z=this.gX(this)
if(!z.t())throw H.c(H.aa())
do y=z.gF()
while(z.t())
return y},
gc1:function(a){var z,y
z=this.gX(this)
if(!z.t())throw H.c(H.aa())
y=z.gF()
if(z.t())throw H.c(H.dn())
return y},
ap:function(a,b){var z,y,x
if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(P.l("index"))
if(b<0)H.f(P.a_(b,0,null,"index",null))
for(z=this.gX(this),y=0;z.t();){x=z.gF()
if(b===y)return x;++y}throw H.c(P.cD(b,this,"index",null,y))},
k:function(a){return P.l0(this,"(",")")}},
cF:{"^":"d;$ti"},
L:{"^":"d;$ti",$isy:1,$isV:1},
"+List":0,
F:{"^":"d;$ti"},
ao:{"^":"d;",
gv:function(a){return P.d.prototype.gv.call(this,this)},
k:function(a){return"null"}},
"+Null":0,
J:{"^":"d;",$isS:1,
$asS:function(){return[P.J]}},
"+num":0,
d:{"^":";",
u:function(a,b){return this===b},
gv:function(a){return H.az(this)},
k:function(a){return H.cK(this)},
gbk:function(a){return new H.ar(H.hS(this),null)},
toString:function(){return this.k(this)}},
bc:{"^":"d;"},
bA:{"^":"V;$ti"},
aU:{"^":"d;"},
q:{"^":"d;",$isS:1,
$asS:function(){return[P.q]},
$isdH:1},
"+String":0,
bF:{"^":"d;A<",
gl:function(a){return this.A.length},
gK:function(a){return this.A.length===0},
gal:function(a){return this.A.length!==0},
k:function(a){var z=this.A
return z.charCodeAt(0)==0?z:z},
w:{
fL:function(a,b,c){var z=J.ah(b)
if(!z.t())return a
if(c.length===0){do a+=H.b(z.gF())
while(z.t())}else{a+=H.b(z.gF())
for(;z.t();)a=a+c+H.b(z.gF())}return a},
o_:function(a){return new P.bF(a)}}}}],["","",,P,{"^":"",fw:{"^":"d;"}}],["","",,P,{"^":"",
cL:function(a){return C.I},
pE:{"^":"d;",
af:function(a){if(a<=0||a>4294967296)throw H.c(P.mk("max must be in range 0 < max \u2264 2^32, was "+a))
return Math.random()*a>>>0},
kc:function(){return Math.random()}}}],["","",,S,{"^":"",jw:{"^":"d;a,b,$ti",
i:function(a,b){return this.b.i(0,b)},
a2:function(a){return this.b.a2(a)},
L:function(a,b){return this.b.L(0,b)},
gK:function(a){var z=this.b
return z.gK(z)},
gal:function(a){var z=this.b
return z.gal(z)},
gl:function(a){var z=this.b
return z.gl(z)},
n:function(a,b,c){this.it()
this.b.n(0,b,c)},
k:function(a){return J.i(this.b)},
it:function(){if(!this.a)return
this.a=!1
this.b=P.c2(this.b,H.m(this,0),H.m(this,1))},
$isF:1}}],["","",,A,{"^":"",jx:{"^":"d;a,b,$ti",
gl:function(a){return this.b.a},
c8:function(a){return this.b.c8(a)},
a1:function(a,b){return this.b.a1(0,b)},
L:function(a,b){return this.b.L(0,b)},
gK:function(a){return this.b.a===0},
gal:function(a){return this.b.a!==0},
gX:function(a){var z,y
z=this.b
y=new P.ae(z,z.r,null,null,[null])
y.c=z.e
return y},
gE:function(a){var z=this.b
return z.gE(z)},
aP:function(a,b){var z=this.b
z.toString
return new H.bs(z,b,[H.m(z,0),null])},
bx:function(a){var z,y
z=this.b
y=z.e6()
y.ao(0,z)
return y},
q:function(a,b){this.i8()
return this.b.q(0,b)},
k:function(a){return J.i(this.b)},
i8:function(){if(!this.a)return
this.a=!1
this.b=P.aZ(this.b,H.m(this,0))},
$isbA:1,
$isV:1}}],["","",,S,{"^":"",de:{"^":"d;fg:a<,b,$ti",
Z:function(a){var z=new S.M(null,null,this.$ti)
z.aa()
z.m(this)
a.$1(z)
return z.p()},
gv:function(a){var z=this.b
if(z==null){z=X.bp(this.a)
this.b=z}return z},
u:function(a,b){var z,y,x,w,v
if(b==null)return!1
if(b===this)return!0
z=J.n(b)
if(!z.$isde)return!1
y=b.a
x=this.a
if(y.length!==x.length)return!1
z=z.gv(b)
w=this.gv(this)
if(z==null?w!=null:z!==w)return!1
for(v=0;z=x.length,v!==z;++v){if(v>=y.length)return H.e(y,v)
w=y[v]
if(v>=z)return H.e(x,v)
if(!J.h(w,x[v]))return!1}return!0},
k:function(a){return J.i(this.a)},
i:function(a,b){var z=this.a
if(b>>>0!==b||b>=z.length)return H.e(z,b)
return z[b]},
gl:function(a){return this.a.length},
bE:function(a,b,c){var z=this.a
return(z&&C.a).bE(z,b,c)},
aN:function(a,b){return this.bE(a,b,0)},
gX:function(a){var z=this.a
return new J.b7(z,z.length,0,null,[H.m(z,0)])},
aP:function(a,b){var z=this.a
z.toString
return new H.aj(z,b,[H.m(z,0),null])},
a1:function(a,b){var z=this.a
return(z&&C.a).a1(z,b)},
L:function(a,b){var z=this.a
return(z&&C.a).L(z,b)},
bx:function(a){var z=this.a
z.toString
return P.aZ(z,H.m(z,0))},
gK:function(a){return this.a.length===0},
gal:function(a){return this.a.length!==0},
gE:function(a){var z=this.a
return(z&&C.a).gE(z)},
aa:function(){if(new H.ar(H.U(H.m(this,0)),null).u(0,C.l))throw H.c(new P.P('explicit element type required, for example "new BuiltList<int>"'))}},M:{"^":"d;fg:a<,b,$ti",
p:function(){var z,y
z=this.b
if(z==null){z=this.a
y=new S.de(z,null,this.$ti)
y.aa()
this.a=z
this.b=y
z=y}return z},
m:function(a){if(H.aN(a,"$isde",this.$ti,null)){this.a=a.gfg()
this.b=a}else{this.a=P.T(a,!0,H.m(this,0))
this.b=null}},
i:function(a,b){var z=this.a
if(b>>>0!==b||b>=z.length)return H.e(z,b)
return z[b]},
n:function(a,b,c){var z
if(c==null)H.f(P.C("null element"))
z=this.gee()
if(b>>>0!==b||b>=z.length)return H.e(z,b)
z[b]=c},
q:function(a,b){var z
if(b==null)H.f(P.C("null element"))
z=this.gee();(z&&C.a).q(z,b)},
a8:function(a,b){var z=this.gee();(z&&C.a).a8(z,b)},
aP:function(a,b){var z=this.a
z.toString
z=new H.aj(z,b,[H.m(z,0),null]).bw(0,!0)
this.a=z
this.b=null
this.i3(z)},
gee:function(){if(this.b!=null){this.a=P.T(this.a,!0,H.m(this,0))
this.b=null}return this.a},
aa:function(){if(new H.ar(H.U(H.m(this,0)),null).u(0,C.l))throw H.c(new P.P('explicit element type required, for example "new ListBuilder<int>"'))},
i3:function(a){var z,y,x,w
for(z=a.length,y=H.m(this,0),x=0;x<a.length;a.length===z||(0,H.al)(a),++x){w=a[x]
if(!H.d3(w,y))throw H.c(P.C("invalid element: "+H.b(w)))}}}}],["","",,A,{"^":"",cu:{"^":"d;is:a<,b,c,d,$ti",
Z:function(a){var z=new A.cH(null,null,this.$ti)
z.c4()
z.m(this)
a.$1(z)
return z.p()},
B:function(){return new S.jw(!0,this.a,this.$ti)},
gv:function(a){var z=this.b
if(z==null){z=this.a.gc6()
z=H.bv(z,new A.jh(this),H.x(z,"y",0),null)
z=P.T(z,!1,H.x(z,"y",0))
C.a.eR(z)
z=X.bp(z)
this.b=z}return z},
u:function(a,b){var z,y,x,w,v
if(b==null)return!1
if(b===this)return!0
z=J.n(b)
if(!z.$iscu)return!1
y=b.a
x=this.a
if(y.gl(y)!==x.gl(x))return!1
z=z.gv(b)
w=this.gv(this)
if(z==null?w!=null:z!==w)return!1
z=this.c
if(z==null){z=x.gc6()
this.c=z}z=z.gX(z)
for(;z.t();){v=z.gF()
if(!J.h(y.i(0,v),x.i(0,v)))return!1}return!0},
k:function(a){return J.i(this.a)},
i:function(a,b){return this.a.i(0,b)},
L:function(a,b){this.a.L(0,b)},
gK:function(a){var z=this.a
return z.gK(z)},
gal:function(a){var z=this.a
return z.gal(z)},
gl:function(a){var z=this.a
return z.gl(z)},
c4:function(){if(new H.ar(H.U(H.m(this,0)),null).u(0,C.l))throw H.c(new P.P('explicit key type required, for example "new BuiltMap<int, int>"'))
if(new H.ar(H.U(H.m(this,1)),null).u(0,C.l))throw H.c(new P.P('explicit value type required, for example "new BuiltMap<int, int>"'))}},jh:{"^":"a:0;a",
$1:function(a){var z,y
z=J.j(a)
y=J.j(this.a.a.i(0,a))
return X.d1(X.aV(X.aV(0,J.j(z)),J.j(y)))}},cH:{"^":"d;a,b,$ti",
p:function(){var z=this.b
if(z==null){z=new A.cu(this.a,null,null,null,this.$ti)
z.c4()
this.b=z}return z},
m:function(a){var z
if(H.aN(a,"$iscu",this.$ti,null)){this.b=a
this.a=a.gis()}else if(!!a.$iscu){z=P.c2(a.a,H.m(this,0),H.m(this,1))
this.b=null
this.a=z}else if(!!a.$isF){z=P.c2(a,H.m(this,0),H.m(this,1))
this.b=null
this.a=z}else throw H.c(P.C("expected Map or BuiltMap, got "+H.b(a.gbk(a))))},
i:function(a,b){return this.a.i(0,b)},
n:function(a,b,c){if(c==null)H.f(P.C("null value"))
this.giF().n(0,b,c)},
giF:function(){if(this.b!=null){this.a=P.c2(this.a,H.m(this,0),H.m(this,1))
this.b=null}return this.a},
c4:function(){if(new H.ar(H.U(H.m(this,0)),null).u(0,C.l))throw H.c(new P.P('explicit key type required, for example "new MapBuilder<int, int>"'))
if(new H.ar(H.U(H.m(this,1)),null).u(0,C.l))throw H.c(new P.P('explicit value type required, for example "new MapBuilder<int, int>"'))}}}],["","",,L,{"^":"",df:{"^":"d;iH:a<,b,$ti",
Z:function(a){var z=new L.bf(null,null,this.$ti)
z.br()
z.m(this)
a.$1(z)
return z.p()},
gv:function(a){var z=this.b
if(z==null){z=this.a
z.toString
z=P.T(new H.bs(z,new L.ji(),[H.m(z,0),null]),!1,null)
C.a.eR(z)
z=X.bp(z)
this.b=z}return z},
u:function(a,b){var z,y,x
if(b==null)return!1
if(b===this)return!0
z=J.n(b)
if(!z.$isdf)return!1
y=this.a
if(b.a.a!==y.a)return!1
z=z.gv(b)
x=this.gv(this)
if(z==null?x!=null:z!==x)return!1
return y.jd(b)},
k:function(a){return J.i(this.a)},
gl:function(a){return this.a.a},
c8:function(a){return this.a.c8(a)},
gX:function(a){var z,y
z=this.a
y=new P.ae(z,z.r,null,null,[null])
y.c=z.e
return y},
aP:function(a,b){var z=this.a
z.toString
return new H.bs(z,b,[H.m(z,0),null])},
a1:function(a,b){return this.a.a1(0,b)},
L:function(a,b){return this.a.L(0,b)},
bx:function(a){return new A.jx(!0,this.a,this.$ti)},
gK:function(a){return this.a.a===0},
gal:function(a){return this.a.a!==0},
gE:function(a){var z=this.a
return z.gE(z)},
br:function(){if(new H.ar(H.U(H.m(this,0)),null).u(0,C.l))throw H.c(new P.P('explicit element type required, for example "new BuiltSet<int>"'))}},ji:{"^":"a:0;",
$1:function(a){return J.j(a)}},bf:{"^":"d;a,b,$ti",
p:function(){var z=this.b
if(z==null){z=new L.df(this.a,null,this.$ti)
z.br()
this.b=z}return z},
m:function(a){var z,y,x,w
if(H.aN(a,"$isdf",this.$ti,null)){this.a=a.giH()
this.b=a}else{z=H.m(this,0)
y=P.W(null,null,null,z)
for(x=J.ah(a);x.t();){w=x.gF()
if(H.d3(w,z))y.q(0,w)
else throw H.c(P.C("iterable contained invalid element: "+H.b(w)))}this.b=null
this.a=y}},
q:function(a,b){if(b==null)H.f(P.C("null element"))
this.gfn().q(0,b)},
aP:function(a,b){var z=this.a
z.toString
z=P.aZ(new H.bs(z,b,[H.m(z,0),null]),null)
this.b=null
this.a=z
this.iI(z)},
gfn:function(){if(this.b!=null){this.a=P.aZ(this.a,H.m(this,0))
this.b=null}return this.a},
br:function(){if(new H.ar(H.U(H.m(this,0)),null).u(0,C.l))throw H.c(new P.P('explicit element type required, for example "new SetBuilder<int>"'))},
iI:function(a){var z,y,x
for(z=new P.ae(a,a.r,null,null,[null]),z.c=a.e,y=H.m(this,0);z.t();){x=z.d
if(!H.d3(x,y))throw H.c(P.C("invalid element: "+H.b(x)))}}}}],["","",,Y,{"^":"",
k:function(a,b){if(typeof b!=="number")return H.v(b)
a=536870911&a+b
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
R:function(a){a=536870911&a+((67108863&a)<<3)
a^=a>>>11
return 536870911&a+((16383&a)<<15)}}],["","",,N,{"^":"",mI:{"^":"mG;ch,cx,av:cy@,b1:db@,bn:dx@,b,c,d,e,f,r,x,y,z,Q,a",
h4:function(){var z=$.$get$cl()
z.n(0,"game",this.cx)
z.n(0,"hitpoints",this.cy)
z.n(0,"stamina",this.db)
z.n(0,"gold",this.dx)},
jM:function(){var z,y,x,w
this.cx=null
this.cy=Z.bD("Health",new N.mL(),"#CCCCCC","Your physical state",100,0,!0,P.aO)
z=P.u
this.db=Z.bD("Stamina",new N.mM(),"#CCCCCC","Spare physical energy",0,0,!0,z)
z=Z.bD("Gold",new N.mN(),"#CCCCCC","Gold coins",0,0,!0,z)
this.dx=z
y=$.$get$bN()
x=this.cy
w=this.db
y=new O.eP(N.bb("EdgeheadGame"),null,!1,null,null,null,null,null,null,null,null,new Y.X(H.r([],[Y.a8]),0,P.ay()),x,w,z,O.tw(),O.tv(),O.tu(),y,this.ghE(),new P.bF(""),!1,null)
y.hC()
this.cx=y
y.x="endGame"
$.$get$ch().q(0,0)},
hQ:function(){var z,y
z=new O.cQ([[null,P.ab(["goto","gameLoop"])]],0,null,!1,!1)
y=this.b.a
y.n(0,"start",z)
z.a="start"
z=new O.cQ([new N.mK(this),[null,P.ab(["goto","gameLoop"])]],0,null,!1,!1)
y.n(0,"gameLoop",z)
z.a="gameLoop"
z=new O.cQ(['<p class="meta">\n  Hit <strong>Restart</strong> (top left) to play again. It will be different.\n</p>'],0,null,!1,!1)
y.n(0,"endGame",z)
z.a="endGame"
this.c=y.i(0,"start")},
w:{
mJ:function(){var z,y,x,w
z=Z.bD("Health",new N.ra(),"#CCCCCC","Your physical state",100,0,!0,P.aO)
y=P.u
x=Z.bD("Stamina",new N.rc(),"#CCCCCC","Spare physical energy",0,0,!0,y)
y=Z.bD("Gold",new N.rd(),"#CCCCCC","Gold coins",0,0,!0,y)
w=P.q
z=new N.mI("net.filiph.edgehead.0.0.1",null,z,x,y,new O.mO(new H.O(0,null,null,null,null,null,0,[w,O.cQ])),null,null,null,P.W(null,null,null,w),!1,null,-9999,null,null,null)
z.hQ()
return z}}},ra:{"^":"a:18;",
$1:function(a){var z=J.n(a)
if(z.u(a,0))return"\ud83d\udc80"
if(z.bZ(a,0.5))return"\ud83d\ude23"
if(z.aJ(a,1))return"\ud83d\ude27"
return"\ud83d\ude10"}},rc:{"^":"a:9;",
$1:function(a){return H.b(a)+" \ud83d\udd06"}},rd:{"^":"a:9;",
$1:function(a){return H.b(a)+" \ud83d\udcb0"}},mK:{"^":"a:19;a",
$0:function(){var z=0,y=P.ax(),x=this
var $async$$0=P.at(function(a,b){if(a===1)return P.aB(b,y)
while(true)switch(z){case 0:z=2
return P.as(x.a.cx.bj(),$async$$0)
case 2:return P.aC(null,y)}})
return P.aD($async$$0,y)}},mL:{"^":"a:18;",
$1:function(a){var z=J.n(a)
if(z.u(a,0))return"\ud83d\udc80"
if(z.bZ(a,0.5))return"\ud83d\ude23"
if(z.aJ(a,1))return"\ud83d\ude27"
return"\ud83d\ude10"}},mM:{"^":"a:9;",
$1:function(a){return H.b(a)+" \ud83d\udd06"}},mN:{"^":"a:9;",
$1:function(a){return H.b(a)+" \ud83d\udcb0"}}}],["","",,M,{"^":"",bV:{"^":"d;"},kj:{"^":"d;"},oL:{"^":"bV;a,b",
Z:function(a){var z=new M.dZ(null,!1,0)
z.m(this)
a.$1(z)
return z.p()},
u:function(a,b){if(b==null)return!1
if(b===this)return!0
if(!(b instanceof M.bV))return!1
return this.a===b.a&&this.b===b.b},
gv:function(a){return Y.R(Y.k(Y.k(0,C.L.gv(this.a)),this.b&0x1FFFFFFF))},
k:function(a){return"EdgeheadGlobalState {hasKegOfBeer="+String(this.a)+",\nbloodrockFollowers="+C.d.k(this.b)+",\n}"}},dZ:{"^":"kj;c,a,b",
gbJ:function(){var z=this.c
if(z!=null){this.a=z.a
this.b=this.c.b
this.c=null}return this},
m:function(a){this.c=a},
p:function(){var z,y
z=this.c
if(z==null){this.gbJ()
y=this.a
this.gbJ()
z=new M.oL(y,this.b)}this.m(z)
return z}}}],["","",,O,{"^":"",
v5:[function(a){var z,y
z=a.gc0()
y=a.gbR()
if(typeof y!=="number")return H.v(y)
return z-2*y},"$1","d5",2,0,26],
vg:[function(a){var z,y,x
z=a.gc0()
y=a.gcR()
x=a.gbR()
if(typeof x!=="number")return H.v(x)
return z+y-x},"$1","hI",2,0,26],
eP:{"^":"lp;y,z,Q,ch,cx,cy,db,dx,dy,by:fr<,fx,eT:fy<,av:go<,b1:id<,bn:k1<,a,b,c,d,e,f,r,x",
hC:function(){var z,y,x,w,v,u
z=P.bu(C.p,null)
y=$.$get$ci()
this.cy=R.b6(1000,"orc",O.d5(),null,new G.ca("sword",1,1,!0,!1,z),null,0,2,0,!1,2,!1,C.r,0,y)
this.db=R.b6(1001,"goblin",O.d5(),null,new G.ca("scimitar",1,1,!0,!1,P.bu(C.p,null)),null,0,1,0,!1,1,!1,C.r,0,y)
y=new S.M(null,null,[Q.w])
y.aa()
y.m([new Q.w("kill_agruth","","",null)])
this.dx=new K.c7(y.p(),"preStartBook",new O.ka(),new O.kb(),null,null,"ground")
y=R.b6(1,"Filip",null,"preStartBook",null,null,0,2,1000,!0,2,!0,C.B,1,null)
this.ch=y
z=y.r
y=y.cx
if(typeof z!=="number")return z.cX()
if(typeof y!=="number")return H.v(y)
this.go.sa9(z/y)
this.id.sa9(this.ch.fx)
this.k1.sa9(this.ch.f)
this.cx=R.b6(100,"Briana",null,this.dx.b,null,this.ch.x,0,2,0,!1,2,!0,C.Z,0,null)
this.dy=F.fr(this.dx,!1)
y=K.c7
x=P.T($.$get$hz(),!0,y)
C.a.ao(x,[this.dx,$.$get$ej()])
w=new M.dZ(null,!1,0).p()
z=this.ch
v=this.cx
u=this.dy
v=P.aZ([z,v],R.G)
z=P.b0(null,O.co)
u=new A.a5(v,P.W(null,null,null,U.an),w,z,P.aZ(x,y),P.T([u],!0,S.a1),0,null)
this.fr=u
y=new Y.X(H.r([],[Y.a8]),0,P.ay())
y.b=u.r
this.fx=new B.bw(u,null,y,1,1,!0,!1,!1,0)},
cU:function(){var z=0,y=P.ax(),x,w=this,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
var $async$cU=P.at(function(a,b){if(a===1)return P.aB(b,y)
while(true)switch(z){case 0:v=w.fy
u=w.gjp()
if(v.h1(u)){z=1
break}t=w.fr.a_(w.ch.x)
s=t.gav()
r=t.gfX()
if(typeof s!=="number"){x=s.cX()
z=1
break}if(typeof r!=="number"){x=H.v(r)
z=1
break}w.go.sa9(s/r)
w.id.sa9(t.gb1())
w.k1.sa9(t.gbn())
r=w.y
r.fS("update() for world at time "+w.fr.r)
s=w.fr.f
if(s.length===0){w.r=!0
v.G(0,"\n\n",!0)
if(w.fr.jH(w.ch.x))v.G(0,"TO BE CONTINUED.",!0)
else v.G(0,"You died.",!0)
w.f.A+=v.ca()
z=1
break}q=C.a.gE(s)
p=q.dG(w.fr)
s=w.fr
o=N.bb("ActorPlanner")
n=new H.O(0,null,null,null,null,null,0,[null,null])
m=p==null
l=m?p:p.gj()
k=new Y.X(H.r([],[Y.a8]),0,P.ay())
k.b=s.r
j=new G.iA(o,l,new B.bw(s,null,k,1,1,!0,!1,!1,0),0,!1,n)
if(m)H.f(P.C("Called ActorPlanner with actor == null. That may mean that a Situation returns getCurrentActor as null. Some action that you added should make sure it removes the Situation. World: "+J.i(s)+". Situation: "+H.b(s.gjf())))
z=3
return P.as(j.kh(),$async$cU)
case 3:if(n.gK(n)){o.eK("There are no actions available for actorId="+H.b(l)+".")
m="Actions not available for "+H.b(l)+" and "
l=J.n(s)
s="PlanConsequence<"+l.gv(s)+", "+l.k(s)+", "+C.t.k(null)
o.bD(m+(s+", 1, 0, >")+".")}s=Z.lR(n)
i=new Z.lQ(new P.h8(n,[null,null]),s)
if(n.gK(n))$.$get$bx().eK("Created with no recommendations.")
if(s.length===0){r.dK("No recommendation for "+H.b(p.gh()))
r.dK(new O.kd(w))
w.fr.fH(q.gj());++w.fr.r
z=1
break}z=p.gH()===!0?4:6
break
case 4:u=s.length
if(u>1)for(h=0;o=s.length,h<o;o===u||(0,H.al)(s),++h);r.bD("planner.generateTable for "+H.b(p.gh()))
j.eL().L(0,new O.ke(w))
u=i.h3(q.gfW(),O.hI())
u.toString
g=P.T(u,!1,H.x(u,"y",0))
if(g.length!==0&&C.a.bO(g,new O.kf())){w.f.A+=v.ca()
C.a.sl(v.a,0)}v=new O.kg(new O.ki())
u=g.length-1
if(u-0<=32)H.fF(g,0,u,v)
else H.fE(g,0,u,v)
for(v=g.length,u=w.c,h=0;h<g.length;g.length===v||(0,H.al)(g),++h){f=g[h]
u.$3$helpMessage$script(f.gY(),f.gO(),new O.kh(w,p,f))}z=1
break
z=5
break
case 6:s=p.gfG()
z=7
return P.as(w.ci(i.kg(s==null?O.hI():s),p,v),$async$cU)
case 7:case 5:v.h1(u)
case 1:return P.aC(x,y)}})
return P.aD($async$cU,y)},
ci:function(a,b,c){var z=0,y=P.ax(),x,w=this,v,u,t
var $async$ci=P.at(function(d,e){if(d===1)return P.aB(e,y)
while(true)switch(z){case 0:v=a.dg(b,w.fx,w.fr)
u=P.T(v,!0,H.x(v,"y",0))
z=b.gH()===!0?3:5
break
case 3:z=6
return P.as(w.d4(a,b,u),$async$ci)
case 6:z=4
break
case 5:t=S.mi(new H.aj(u,new O.k7(),[H.m(u,0),null]),1)
if(t>=u.length){x=H.e(u,t)
z=1
break}w.fx=u[t]
case 4:C.a.ao(c.a,w.fx.geT().a)
w.fr=w.fx.gby()
v=w.y
v.bD(new O.k8(a,b))
v.ab(new O.k9(w,b))
case 1:return P.aC(x,y)}})
return P.aD($async$ci,y)},
d4:function(a,b,c){var z=0,y=P.ax(),x=this,w,v,u,t,s,r,q,p,o,n,m,l
var $async$d4=P.at(function(d,e){if(d===1)return P.aB(e,y)
while(true)switch(z){case 0:w=a.N(b,x.fr)
v=J.n(w)
z=v.u(w,1)?2:4
break
case 2:x.fx=C.a.gc1(c)
z=3
break
case 4:z=v.u(w,0)?5:7
break
case 5:x.fx=C.a.gc1(c)
z=6
break
case 7:u=C.a.gE(J.i(a.gR()).split("."))
v=a.ak(b,x.fr)
t=a.gU()&&b.jI(a.gR())
s="use "+H.b(u)
x.fj()
z=8
return P.as(x.e.$4$rerollEffectDescription$rerollable(w,v,s,t),$async$d4)
case 8:r=e
t=new H.K(c,new O.k4(r),[H.m(c,0)])
x.fx=t.gc1(t)
if(r.gkL()===!0){q=A.dY(x.fx.gby())
q.a5(b.gj(),new O.k5())
v=x.fx
t=v.gfp()
s=H.r([],[Y.a8])
p=new Y.X(s,0,P.ay())
C.a.ao(s,v.c.a)
s=v.d
o=v.e
n=v.f
m=v.r
l=v.x
v=v.y
p.b=q.r
x.fx=new B.bw(q,t,p,s,o,n,m,l,v)}case 6:case 3:return P.aC(null,y)}})
return P.aD($async$d4,y)}},
ka:{"^":"a:3;",
$3:function(a,b,c){return c.G(0,"UNUSED because this is the first choice",!0)}},
kb:{"^":"a:3;",
$3:function(a,b,c){return H.f(new P.D("Room isn't to be revisited"))}},
kd:{"^":"a:1;a",
$0:function(){var z=this.a.fr.d
return"- how we got here: "+new H.aj(z,new O.kc(),[H.m(z,0),null]).cH(0," <- ")}},
kc:{"^":"a:0;",
$1:function(a){return a.gb4()}},
ke:{"^":"a:0;a",
$1:function(a){return this.a.y.bD(a)}},
ki:{"^":"a:27;",
$1:function(a){if(a instanceof Q.I)return H.b(a.b.gh())+" "+a.gY()
return"ZZZZZZ "+a.gY()}},
kf:{"^":"a:0;",
$1:function(a){return a.gY()!==""}},
kg:{"^":"a:7;a",
$2:function(a,b){var z=this.a
return J.bS(z.$1(a),z.$1(b))}},
kh:{"^":"a:19;a,b,c",
$0:function(){var z=0,y=P.ax(),x=this,w
var $async$$0=P.at(function(a,b){if(a===1)return P.aB(b,y)
while(true)switch(z){case 0:w=x.a
z=2
return P.as(w.ci(x.c,x.b,w.fy),$async$$0)
case 2:return P.aC(null,y)}})
return P.aD($async$$0,y)}},
k7:{"^":"a:0;",
$1:function(a){return a.gki()}},
k8:{"^":"a:1;a,b",
$0:function(){return H.b(this.b.gh())+" selected "+this.a.gh()}},
k9:{"^":"a:1;a,b",
$0:function(){var z,y
z=this.a.fr.d
y=new H.aj(z,new O.k6(),[H.m(z,0),null]).cH(0," <- ")
return"- how "+H.b(this.b.gh())+" got here: "+y}},
k6:{"^":"a:0;",
$1:function(a){return a.gb4()}},
k4:{"^":"a:0;a",
$1:function(a){return a.gex()===this.a.gex()}},
k5:{"^":"a:0;",
$1:function(a){var z=a.gb1()
if(typeof z!=="number")return z.aw()
a.sb1(z-1)
return a}}}],["","",,Q,{"^":"",
hN:function(a,b,c){return P.aM(function(){var z=a,y=b,x=c
var w=0,v=1,u,t,s,r,q,p
return function $async$hN(d,e){if(d===1){u=e
w=v}while(true)switch(w){case 0:t=y.f
t=t.length!==0?C.a.gE(t):null
s=J.iy(t.aI(y.a,y),new Q.t5(z))
t=J.ah(s.a),r=new H.cV(t,s.b,[H.m(s,0)])
case 2:if(!r.t()){w=3
break}q=t.gF()
p=x.$1(q)
if(p.gP()&&!z.es(q,y)){w=2
break}w=4
return p
case 4:w=2
break
case 3:return P.aK()
case 1:return P.aL(u)}}})},
hO:function(a,b,c){return P.aM(function(){var z=a,y=b,x=c
var w=0,v=1,u,t
return function $async$hO(d,e){if(d===1){u=e
w=v}while(true)switch(w){case 0:t=y.f
t=y.dI((t.length!==0?C.a.gE(t):null).gbt()).gjt().a,t=new J.b7(t,t.length,0,null,[H.m(t,0)])
case 2:if(!t.t()){w=3
break}w=4
return x.$1(t.d)
case 4:w=2
break
case 3:return P.aK()
case 1:return P.aL(u)}}})},
hP:function(a,b,c){return P.aM(function(){var z=a,y=b,x=c
var w=0,v=1,u,t
return function $async$hP(d,e){if(d===1){u=e
w=v}while(true)switch(w){case 0:t=y.f
t=(t.length!==0?C.a.gE(t):null).gbC(),t=t.gX(t)
case 2:if(!t.t()){w=3
break}w=4
return x.$1(t.d)
case 4:w=2
break
case 3:return P.aK()
case 1:return P.aL(u)}}})},
t5:{"^":"a:0;a",
$1:function(a){return!J.h(a,this.a)&&a.gaO()}},
a7:{"^":"d;",
dg:function(a,b,c){var z=this
return P.aM(function(){var y=a,x=b,w=c
var v=0,u=1,t,s,r,q,p
return function $async$dg(d,e){if(d===1){t=e
v=u}while(true)switch(v){case 0:s=z.N(y,x.gby())
r=J.af(s)
v=r.bp(s,0)?2:3
break
case 2:q=A.dY(w)
v=4
return B.ff(q,x,z,z.i_(q,y,w,z.gT(),!0),s,!1,!1,!0)
case 4:case 3:v=r.aJ(s,1)?5:6
break
case 5:q=A.dY(w)
p=z.hZ(q,y,w,z.gS(),!0)
if(typeof s!=="number")H.v(s)
v=7
return B.ff(q,x,z,p,1-s,!0,!1,!1)
case 7:case 6:return P.aK()
case 1:return P.aL(t)}}})},
eY:function(a,b,c,d,e,f){var z,y,x,w,v,u,t
a.x=this
z=a.a.aK(0,new Q.iz(b))
y=new O.eA(null,null,null,null,null,null,null,null,null,null,null,null)
x=this.gh()
y.ga0().c=x
x=b.gj()
y.ga0().f=x
y.ga0().e=C.P
y.ga0().ch=f
y.ga0().Q=e
x=this.gP()
y.ga0().y=x
x=this.ga3()
y.ga0().z=x
if(!!this.$isI){x=y.ga0()
w=x.r
if(w==null){w=new L.bf(null,null,[P.u])
w.br()
w.m(C.e)
x.r=w
x=w}else x=w
w=this.b.gj()
if(w==null)H.f(P.C("null element"))
x.gfn().q(0,w)}v=new Y.X(H.r([],[Y.a8]),0,P.ay())
x=a.f
u=(x.length!==0?C.a.gE(x):null).gj()
a.gv(a);(x.length!==0?C.a.gE(x):null).kd(a,v)
this.a=d.$3(z,a,v)
if(a.d7(u)!=null)a.fH(u);++a.r
w=a.eM(u)
if(!(w==null))w.h_(a,v)
a.x=null
while(!0){w=x.length!==0?C.a.gE(x):null
if((w==null?w:w.dG(a))!=null){w=x.length!==0?C.a.gE(x):null
w=!J.h(w==null?w:w.d0(a),!0)}else w=!0
if(!w)break
if((x.length!==0?C.a.gE(x):null)==null)break
t=C.a.gE(x)
t.dr(a)
C.a.a8(x,t)}x=x.length!==0?C.a.gE(x):null
if(!(x==null))x.h0(a,v)
if(this.a==null)H.f(new P.D("No description given when executing "+this.k(0)+". You should return it from your world-modifying function."))
x=this.a
y.ga0().d=x
x=a.r
y.ga0().x=x
a.d.fw(y.p())
return v},
i_:function(a,b,c,d,e){return this.eY(a,b,c,d,!1,e)},
hZ:function(a,b,c,d,e){return this.eY(a,b,c,d,e,!1)}},
iz:{"^":"a:0;a",
$1:function(a){return J.h(a.gj(),this.a.gj())}},
I:{"^":"a7;bR:b<",
gY:function(){var z=new Y.X(H.r([],[Y.a8]),0,P.ay())
z.ft(0,this.gaj(),this.b)
return z.ca()},
ak:function(a,b){var z=new Y.X(H.r([],[Y.a8]),0,P.ay())
z.iY(0,this.gan(),this.b,a,!0)
return z.ca()},
k:function(a){var z=this.b
return"EnemyTargetAction<"+this.gaj()+"::enemy="+H.b(z.gj())+"/"+H.b(z.gh())+">"}},
cB:{"^":"a7;",
gY:function(){return this.b.gY()},
k:function(a){return"ExitAction<"+this.b.gY()+">"}},
cE:{"^":"a7;",
gY:function(){var z=new Y.X(H.r([],[Y.a8]),0,P.ay())
z.ft(0,"pick up <object>",this.b)
return z.ca()},
k:function(a){return"ItemAction<"+this.gY()+">"}},
ms:{"^":"d;a,b",
k:function(a){return this.b},
w:{"^":"uU<"}}}],["","",,O,{"^":"",co:{"^":"d;",
k:function(a){return"ActionRecord<"+H.b(this.b)+", "+H.b(this.c)+">"}},lg:{"^":"d;a,b",
k:function(a){return this.b}},oH:{"^":"co;a,fs:b<,b4:c<,d,dv:e<,eV:f<,I:r<,hk:x<,hl:y<,z,hm:Q<",
Z:function(a){var z=new O.eA(null,null,null,null,null,null,null,null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof O.co))return!1
if(J.h(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y)if(J.h(this.c,b.c)){z=this.d
y=b.d
if(z==null?y==null:z===y)if(J.h(this.e,b.e))if(J.h(this.f,b.f)){z=this.r
y=b.r
if(z==null?y==null:z===y){z=this.x
y=b.x
if(z==null?y==null:z===y){z=this.y
y=b.y
if(z==null?y==null:z===y){z=this.z
y=b.z
if(z==null?y==null:z===y){z=this.Q
y=b.Q
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1
else z=!1
else z=!1}else z=!1
else z=!1}else z=!1
return z},
gv:function(a){return Y.R(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)),J.j(this.f)),J.j(this.r)),J.j(this.x)),J.j(this.y)),J.j(this.z)),J.j(this.Q)))},
k:function(a){return"ActionRecord {accomplices="+J.i(this.a)+",\nactionName="+J.i(this.b)+",\ndescription="+H.b(J.i(this.c))+",\nknownTo="+J.i(this.d)+",\nprotagonist="+H.b(J.i(this.e))+",\nsufferers="+J.i(this.f)+",\ntime="+J.i(this.r)+",\nwasAggressive="+J.i(this.x)+",\nwasProactive="+J.i(this.y)+",\nwasFailure="+J.i(this.z)+",\nwasSuccess="+J.i(this.Q)+",\n}"}},eA:{"^":"d;a,b,c,d,e,f,r,x,y,z,Q,ch",
gfs:function(){return this.ga0().c},
gb4:function(){return this.ga0().d},
gdv:function(){return this.ga0().f},
geV:function(){var z,y
z=this.ga0()
y=z.r
if(y==null){y=new L.bf(null,null,[P.u])
y.br()
y.m(C.e)
z.r=y
z=y}else z=y
return z},
gI:function(){return this.ga0().x},
ghk:function(){return this.ga0().y},
ghl:function(){return this.ga0().z},
ghm:function(){return this.ga0().ch},
ga0:function(){var z,y
z=this.a
if(z!=null){z=z.a
if(!(z==null)){y=new L.bf(null,null,[H.m(z,0)])
y.br()
y.m(z)
z=y}this.b=z
z=this.a
this.c=z.b
this.d=z.c
this.e=z.d
this.f=z.e
z=z.f
if(!(z==null)){y=new L.bf(null,null,[H.m(z,0)])
y.br()
y.m(z)
z=y}this.r=z
z=this.a
this.x=z.r
this.y=z.x
this.z=z.y
this.Q=z.z
this.ch=z.Q
this.a=null}return this},
m:function(a){this.a=a},
p:function(){var z,y,x,w,v,u,t,s,r,q,p,o
z=this.a
if(z==null){y=this.ga0()
x=y.b
if(x==null){x=new L.bf(null,null,[P.u])
x.br()
x.m(C.e)
y.b=x
y=x}else y=x
y=y.p()
x=this.ga0().c
w=this.ga0().d
v=this.ga0().e
u=this.ga0().f
t=this.ga0()
s=t.r
if(s==null){s=new L.bf(null,null,[P.u])
s.br()
s.m(C.e)
t.r=s
t=s}else t=s
t=t.p()
s=this.ga0().x
r=this.ga0().y
q=this.ga0().z
p=this.ga0().Q
o=this.ga0().ch
z=new O.oH(y,x,w,v,u,t,s,r,q,p,o)
if(y==null)H.f(P.l("accomplices"))
if(x==null)H.f(P.l("actionName"))
if(w==null)H.f(P.l("description"))
if(v==null)H.f(P.l("knownTo"))
if(u==null)H.f(P.l("protagonist"))
if(t==null)H.f(P.l("sufferers"))
if(s==null)H.f(P.l("time"))
if(r==null)H.f(P.l("wasAggressive"))
if(q==null)H.f(P.l("wasProactive"))
if(p==null)H.f(P.l("wasFailure"))
if(o==null)H.f(P.l("wasSuccess"))}this.m(z)
return z}}}],["","",,R,{"^":"",
hQ:function(a,b){return P.aM(function(){var z=a,y=b
var x=0,w=1,v,u
return function $async$hQ(c,d){if(c===1){v=d
x=w}while(true)switch(x){case 0:x=2
return z
case 2:u=y.a
x=3
return P.bI(new H.K(u,new R.t6(z),[H.m(u,0)]))
case 3:return P.aK()
case 1:return P.aL(v)}}})},
b6:function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o){var z=new R.eB(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
new R.r6(a,b,j,l,m,e,h,k,n,i,g,d,f,o,c).$1(z)
return z.p()},
t6:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gfL()
y=this.a.gj()
return z==null?y==null:z===y}},
G:{"^":"lw;",
gj8:function(){return!0},
gbu:function(){var z=this.r
if(typeof z!=="number")return z.bp()
return z>0},
gb7:function(){return this.d instanceof K.bX},
gb_:function(){return this.dx===C.h},
gae:function(){return this.dx===C.i},
gac:function(){return this.dx===C.k},
jI:function(a){var z=this.fx
if(typeof z!=="number")return z.bI()
return z>=1},
es:function(a,b){return this.fR(a,b)>0},
fR:function(a,b){var z,y
if(this.ew(b)){z=a.gbl()
y=this.fy.a
z=z.gj()
z=y==null?z==null:y===z}else z=!1
if(z)return 1000
if(this.io(a,b,10))return 1
z=a.gbl()
y=this.fy.a
z=z.gj()
return(y==null?z!=null:y!==z)?1:0},
ew:function(a){var z,y
z=a.cc("Confuse",this,!0)
if(z==null)return!1
y=a.kB("Unconfuse",this,!0)
if(y==null)return!0
return y<z},
d_:function(a){var z,y,x,w,v,u,t,s,r,q,p
z=a.a_(this.x)
y=z.gav()
if(typeof y!=="number")return H.v(y)
x=2*y
if(!z.gbu())x-=10
y=z.d
if(!(y instanceof K.bX))x+=4
y=J.aW(y.ga9(),2)
if(typeof y!=="number")return H.v(y)
x+=y
for(y=z.ch,w=[null],v=new P.ae(y,y.r,null,null,w),v.c=y.e;v.t();){y=J.aW(v.d.ga9(),10)
if(typeof y!=="number")return H.v(y)
x+=y}y=a.a
for(v=y.gX(y),u=new H.cV(v,new R.j2(this),[H.m(y,0)]),t=0;u.t();){s=v.gF()
r=s.gaO()?2:0
q=s.gav()
if(typeof q!=="number")return H.v(q)
p=J.aW(s.d.ga9(),2)
if(typeof p!=="number")return H.v(p)
t=t+r+2*q+p
for(r=s.ch,q=new P.ae(r,r.r,null,null,w),q.c=r.e;q.t();){r=J.aW(q.d.ga9(),10)
if(typeof r!=="number")return H.v(r)
t+=r}}return new A.cp(x,t,y.bh(0,0,new R.j3(this,a)))},
io:function(a,b,c){var z=b.kC(a,this,!0)
if(z==null)return!1
return z<=c},
$isb9:1},
lw:{"^":"d+di;"},
r6:{"^":"a:0;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db",
$1:function(a){var z,y
a.gC().y=this.a
a.gC().db=this.b
a.gC().dx=this.d
a.gC().fr=this.e
z=this.f
if(z==null)z=$.$get$ei()
a.gC().e=z
a.gC().b=[]
a.gC().dy=C.k
a.gC().x=this.r
a.gC().cy=this.x
a.gC().r=this.Q
a.gC().fy=this.y
a.gC().z=this.z
a.gC().Q=!0
a.gC().ch=this.c
z=P.W(null,null,null,null)
a.gC().cx=z
z=this.cy
if(z!=null){y=new L.bh(null,null)
y.m(z)
z=y}else{z=$.$get$i3()
z.toString
y=new L.bh(null,null)
y.m(z)
z=y}a.gC().go=z
a.gC().d=this.ch
a.gC().f=this.cx
a.gC().c=this.db
return a}},
j2:{"^":"a:0;a",
$1:function(a){var z,y
z=this.a
if(J.h(a.gbl(),z.fy)){y=a.gj()
z=z.x
z=y==null?z!=null:y!==z}else z=!1
return z}},
j3:{"^":"a:28;a,b",
$2:function(a,b){var z,y
z=b.gaO()?1:0
y=b.gav()
if(typeof y!=="number")return H.v(y)
return J.am(a,(z+y)*this.a.fR(b,this.b))}},
dI:{"^":"d;a,b",
k:function(a){return this.b}},
oI:{"^":"G;a,fG:b<,bt:c<,J:d<,fL:e<,bn:f<,av:r<,j:x<,y,eu:z<,H:Q<,bT:ch<,fX:cx<,h:cy<,dq:db<,am:dx<,a4:dy<,fr,b1:fx<,bl:fy<",
Z:function(a){var z=new R.eB(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof R.G))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y)if(J.h(this.b,b.b)){z=this.c
y=b.c
if(z==null?y==null:z===y)if(J.h(this.d,b.d)){z=this.e
y=b.e
if(z==null?y==null:z===y){z=this.f
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
if(z==null?y==null:z===y){z=this.cy
y=b.cy
if(z==null?y==null:z===y){z=this.db
y=b.db
if(z==null?y==null:z===y){z=this.dx
y=b.dx
if(z==null?y==null:z===y){z=this.dy
y=b.dy
if(z==null?y==null:z===y){z=this.fx
y=b.fx
z=(z==null?y==null:z===y)&&J.h(this.fy,b.fy)}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1
else z=!1}else z=!1
else z=!1
return z},
gv:function(a){return Y.R(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)),J.j(this.f)),J.j(this.r)),J.j(this.x)),J.j(this.y)),J.j(this.z)),J.j(this.Q)),J.j(this.ch)),J.j(this.cx)),J.j(this.cy)),J.j(this.db)),J.j(this.dx)),J.j(this.dy)),C.t.gv(this.fr)),J.j(this.fx)),J.j(this.fy)))},
k:function(a){return"Actor {categories="+J.i(this.a)+",\ncombineFunction="+J.i(this.b)+",\ncurrentRoomName="+J.i(this.c)+",\ncurrentWeapon="+H.b(J.i(this.d))+",\nfollowingActorId="+J.i(this.e)+",\ngold="+J.i(this.f)+",\nhitpoints="+J.i(this.r)+",\nid="+J.i(this.x)+",\ninitiative="+J.i(this.y)+",\nisActive="+J.i(this.z)+",\nisPlayer="+J.i(this.Q)+",\nitems="+J.i(this.ch)+",\nmaxHitpoints="+J.i(this.cx)+",\nname="+J.i(this.cy)+",\nnameIsProperNoun="+J.i(this.db)+",\npose="+J.i(this.dx)+",\npronoun="+J.i(this.dy)+",\nshield="+C.t.k(this.fr)+",\nstamina="+J.i(this.fx)+",\nteam="+J.i(this.fy)+",\n}"}},
eB:{"^":"d;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go",
gfG:function(){return this.gC().c},
gbt:function(){return this.gC().d},
sbt:function(a){this.gC().d=a
return a},
gJ:function(){return this.gC().e},
sJ:function(a){this.gC().e=a
return a},
gfL:function(){return this.gC().f},
gbn:function(){return this.gC().r},
sbn:function(a){this.gC().r=a
return a},
gav:function(){return this.gC().x},
sav:function(a){this.gC().x=a
return a},
gj:function(){return this.gC().y},
gH:function(){return this.gC().ch},
gbT:function(){return this.gC().cx},
gfX:function(){return this.gC().cy},
gh:function(){return this.gC().db},
sh:function(a){this.gC().db=a
return a},
gdq:function(){return this.gC().dx},
gam:function(){return this.gC().dy},
sam:function(a){this.gC().dy=a
return a},
ga4:function(){return this.gC().fr},
gb1:function(){return this.gC().fy},
sb1:function(a){this.gC().fy=a
return a},
gbl:function(){var z,y
z=this.gC()
y=z.go
if(y==null){y=new L.bh(null,null)
z.go=y
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
this.db=z.cy
this.dx=z.db
this.dy=z.dx
this.fr=z.dy
this.fx=z.fr
this.fy=z.fx
z=z.fy
if(!(z==null)){y=new L.bh(null,null)
y.m(z)
z=y}this.go=z
this.a=null}return this},
m:function(a){this.a=a},
p:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
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
l=this.gC().db
k=this.gC().dx
j=this.gC().dy
i=this.gC().fr
h=this.gC().fx
g=this.gC().fy
f=this.gC()
e=f.go
if(e==null){e=new L.bh(null,null)
f.go=e
f=e}else f=e
z=new R.oI(y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f.p())
if(y==null)H.f(P.l("categories"))
if(v==null)H.f(P.l("currentWeapon"))
if(t==null)H.f(P.l("gold"))
if(s==null)H.f(P.l("hitpoints"))
if(r==null)H.f(P.l("id"))
if(q==null)H.f(P.l("initiative"))
if(p==null)H.f(P.l("isActive"))
if(o==null)H.f(P.l("isPlayer"))
if(n==null)H.f(P.l("items"))
if(m==null)H.f(P.l("maxHitpoints"))
if(l==null)H.f(P.l("name"))
if(k==null)H.f(P.l("nameIsProperNoun"))
if(j==null)H.f(P.l("pose"))
if(i==null)H.f(P.l("pronoun"))
if(g==null)H.f(P.l("stamina"))}this.m(z)
return z}}}],["","",,A,{"^":"",cp:{"^":"d;c0:a<,cR:b<,bR:c<",
aw:function(a,b){return new A.ai(this.a-b.gc0(),this.b-b.gcR(),J.bq(this.c,b.gbR()))},
k:function(a){return"ActorScore<self="+C.j.bW(this.a,2)+",team="+C.j.bW(this.b,2)+",enemy="+J.cn(this.c,2)+">"}},ai:{"^":"d;c0:a<,cR:b<,bR:c<",
gjY:function(){return this.a===-1/0&&this.b===-1/0&&J.h(this.c,-1/0)},
c_:function(a,b){if(typeof b!=="number")return H.v(b)
return new A.ai(this.a*b,this.b*b,J.bR(this.c,b))},
a6:function(a,b){return new A.ai(this.a+b.gc0(),this.b+b.gcR(),J.am(this.c,b.gbR()))},
cX:function(a,b){if(typeof b!=="number")return H.v(b)
return new A.ai(this.a/b,this.b/b,J.aW(this.c,b))},
k:function(a){return"ActorScoreChange<self="+C.j.bW(this.a,2)+",team="+C.j.bW(this.b,2)+",enemy="+J.cn(this.c,2)+">"},
w:{
j1:function(a){var z,y,x,w,v,u,t,s,r
for(z=a.length,y=0,x=0,w=0,v=0,u=0;t=a.length,u<t;t===z||(0,H.al)(a),++u){s=a[u];++y
x+=s.a
w+=s.b
r=s.c
if(typeof r!=="number")return H.v(r)
v+=r}if(y===0)throw H.c(P.C("Cannot average empty iterable"))
return new A.ai(x/y,w/y,v/y)}}}}],["","",,U,{"^":"",
ut:function(a){switch(a){case C.K:return"spear"
case C.x:return"sword"
case C.y:return"fist"
default:throw H.c(P.C(a))}},
an:{"^":"lx;",
gb4:function(){return U.ut(C.a.geq(this.a))},
gj:function(){return H.az(this)},
geu:function(){return!0},
gbu:function(){return!1},
gH:function(){return!1},
gdq:function(){return!1},
ga4:function(){return C.o},
gbl:function(){return $.$get$bP()},
$isb9:1},
lx:{"^":"d+di;"},
dm:{"^":"d;a,b",
k:function(a){return this.b}}}],["","",,K,{"^":"",bX:{"^":"bG;h:b<,a"}}],["","",,G,{"^":"",ca:{"^":"bG;h:b<,cf:c<,cS:d<,cz:e<,fA:f<,a"}}],["","",,L,{"^":"",bG:{"^":"an;",
gfA:function(){return!1},
gcz:function(){return!1},
gjV:function(){return!1},
gb8:function(){return this.gcf()>0},
gfT:function(){return this.gcS()>0},
gl:function(a){return 2},
gcf:function(){return 0},
gcS:function(){return 0},
ga9:function(){return this.gcf()+this.gcS()},
$isb9:1}}],["","",,G,{"^":"",lp:{"^":"d;",
fj:function(){var z,y
z=this.f
y=z.A
if(y.length!==0){this.b.$1(y.charCodeAt(0)==0?y:y)
z.A=""}},
kX:[function(a){this.f.A+=a},"$1","gjp",2,0,20],
bj:function(){var z=0,y=P.ax(),x,w=this,v,u
var $async$bj=P.at(function(a,b){if(a===1)return P.aB(b,y)
while(true)switch(z){case 0:if(w.x==null)throw H.c(new P.D("Cannot run a LoopedEvent before onFinishedGoto is defined."))
if(w.r){w.d.sl(0,0)
w.a.$1(w.x)
z=1
break}v=w.d
u=w.f
case 3:if(!!0){z=4
break}if(!(!w.r&&v.gl(v)===0&&u.A.length===0)){z=4
break}z=5
return P.as(w.cU(),$async$bj)
case 5:z=3
break
case 4:w.fj()
case 1:return P.aC(x,y)}})
return P.aD($async$bj,y)}}}],["","",,B,{"^":"",eM:{"^":"d;cZ:a<,dk:b<,cJ:c<",
k:function(a){return"ConsequenceStats<order="+this.c+", cumProb="+J.cn(this.b,3)+", score="+this.a.k(0)+">"}},bw:{"^":"d;by:a<,fp:b<,eT:c<,ki:d<,dk:e<,f,r,ex:x<,cJ:y<",
gv:function(a){return X.bp([this.a,this.e,this.b,this.d,this.y,this.f,this.r,this.x])},
u:function(a,b){var z
if(b==null)return!1
z=J.n(b)
return!!z.$isbw&&this.gv(this)===z.gv(b)},
k:function(a){var z,y
z=this.a
y=J.n(z)
z="PlanConsequence<"+y.gv(z)+", "+y.k(z)+", "+J.i(this.b)+", "+H.b(this.d)+", "+this.y+", "
return z+(this.x?"isSuccess":"")+">"},
w:{
ff:function(a,b,c,d,e,f,g,h){var z,y
z=b==null
y=z?e:J.bR(e,b.gdk())
z=z?0:b.gcJ()+1
d.b=a.r
return new B.bw(a,c,d,e,y,g,f,h,z)}}}}],["","",,G,{"^":"",iA:{"^":"d;a,b,c,d,e,f",
jb:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j
z=this.a
z.ab("...")
z.ab("combining scores")
y=H.r([],[A.ai])
x=new G.iV()
for(w=J.ah(a),v=b.a,u=b.b,t=b.c,s=null;w.t();){r=w.gF()
z.ab(new G.iT(r))
if(J.a3(r.gdk(),0.15))if(s==null){z.ab("    - first _bestCase")
s=r}else if(J.a3(x.$1(r.gcZ()),x.$1(s.gcZ()))){z.ab("    - new _bestCase")
s=r}q=r.gcZ()
p=J.bq(q.c,t)
o=r.b
if(typeof o!=="number")return H.v(o)
n=new A.ai((q.a-v)*o,(q.b-u)*o,J.bR(p,o))
z.ab(new G.iU(n))
y.push(n)}m=A.j1(y)
w=s==null
if(w)l=C.D
else{q=s.gcZ()
l=new A.ai(q.a-v,q.b-u,J.bq(q.c,t))}w=w?s:s.gcJ()
if(typeof w!=="number")return H.v(w)
k=new A.ai(l.a/w,l.b/w,J.aW(l.c,w))
z.ab("- uplifts average = "+("ActorScoreChange<self="+C.j.bW(m.a,2)+",team="+C.j.bW(m.b,2)+",enemy="+J.cn(m.c,2)+">"))
z.ab("- best = "+k.k(0))
j=k.a6(0,m)
z.ab("- result = "+j.k(0))
return j},
eL:function(){var z=this
return P.aM(function(){var y=0,x=1,w,v,u,t,s
return function $async$eL(a,b){if(a===1){w=b
y=x}while(true)switch(y){case 0:v=z.f,u=v.gc6(),u=u.gX(u),t=1
case 2:if(!u.t()){y=3
break}s=u.gF()
y=4
return""+t+") "+s.gY()+"\t"+H.b(v.i(0,s))
case 4:++t
y=2
break
case 3:return P.aK()
case 1:return P.aL(w)}}})},
ds:function(a,b,c){var z=0,y=P.ax(),x=this,w,v,u,t,s,r,q,p,o,n,m
var $async$ds=P.at(function(d,e){if(d===1)return P.aB(e,y)
while(true)switch(z){case 0:w=x.f
w.aZ(0)
v=x.c
u=v.a
t=u.a.aK(0,new G.iW(x))
s=t.d_(u)
r=x.a
r.bD("Planning for "+H.b(t.cy)+", initialScore="+s.k(0))
q=new P.b1(x.e0(t,u).a(),null,null,null)
case 2:if(!q.t()){z=3
break}p=q.c
o=p==null?q.b:p.gF()
r.b5(new G.iX(t,o))
if(o.M(t,u)!==!0){r.b5(new G.iY(o))
z=2
break}z=4
return P.as(x.cm(v,o,b,a,c).cd(0),$async$ds)
case 4:n=e
if(J.ex(n)===!0){r.b5(new G.iZ(o))
w.n(0,o,C.E)
z=2
break}r.b5(new G.j_(s,o,n))
m=x.jb(n,s,b)
w.n(0,o,m)
r.b5(new G.j0(o,m))
z=2
break
case 3:x.e=!0
return P.aC(null,y)}})
return P.aD($async$ds,y)},
kh:function(){return this.ds(50,10,null)},
e0:function(a,b){return P.aM(function(){var z=a,y=b
var x=0,w=1,v,u,t,s,r,q,p,o
return function $async$e0(c,d){if(c===1){v=d
x=w}while(true)switch(x){case 0:u=y.f
x=2
return P.bI((u.length!==0?C.a.gE(u):null).gbe())
case 2:u=(u.length!==0?C.a.gE(u):null).gaM()
t=u.length
s={func:1,ret:Q.cE,args:[U.an]}
r={func:1,ret:Q.cB,args:[Q.w]}
q={func:1,ret:Q.I,args:[R.G]}
p=0
case 3:if(!(p<u.length)){x=5
break}o=u[p]
x=H.au(o,q)?6:8
break
case 6:x=9
return P.bI(Q.hN(z,y,o))
case 9:x=7
break
case 8:x=H.au(o,r)?10:12
break
case 10:x=13
return P.bI(Q.hO(z,y,o))
case 13:x=11
break
case 12:x=H.au(o,s)?14:16
break
case 14:x=17
return P.bI(Q.hP(z,y,o))
case 17:x=15
break
case 16:throw H.c(new P.D(o.k(0)+" is not one of the supported ones"))
case 15:case 11:case 7:case 4:u.length===t||(0,H.al)(u),++p
x=3
break
case 5:return P.aK()
case 1:return P.aL(v)}}})},
cm:function(a5,a6,a7,a8,a9){var $async$cm=P.at(function(b0,b1){switch(b0){case 2:u=x
z=u.pop()
break
case 1:v=b1
z=w}while(true)switch(z){case 0:s={}
r=a5.a
q=r.a.aK(0,new G.iD(t))
p=t.a
p.b5("=====")
p.b5(new G.iE(a6,q))
p.b5(new G.iF(a6))
if(a6.M(q,r)!==!0){p.b5("- firstAction not applicable")
z=1
break}o=q.d_(r)
p.b5(new G.iL(a5,o))
p.b5(new G.iM(a5))
n=P.b0(null,B.bw)
m=P.W(null,null,null,A.a5)
l=J.n(r)
k=l.gv(r)
for(j=new P.b1(a6.dg(q,a5,r).a(),null,null,null);j.t();){i=j.c
h=i==null?j.b:i.gF()
if(l.gv(r)!==k)throw H.c(new P.D("Action "+a6.k(0)+" modified world state when producing "+H.b(h)+"."))
n.ax(h)}s.a=0
r=t.b
case 3:if(!!n.gK(n)){z=4
break}++s.a
g=n.dw()
p.ab("----")
p.ab(new G.iN(g))
p.ab(new G.iO(g))
if(g.gcJ()>a7||s.a>a8){p.ab(new G.iP(s,a7,g))
p.ab(new G.iQ(g))
z=4
break}z=g.gby().f.length===0?5:6
break
case 5:p.ab("- leaf node: world.situations is empty (end of book)")
l=g.a
q=l.a.b6(0,new G.iR(t),new G.iS())
if(q==null){p.ab("- this actor ("+H.b(r)+") has been removed")
z=3
break}f=new B.eM(q.d_(l),g.e,g.y)
p.ab(new G.iG(f))
z=7
x=[1]
return P.d_(P.hf(f),$async$cm,y)
case 7:z=3
break
case 6:l=g.a
j=l.f
e=(j.length!==0?C.a.gE(j):null).dG(l)
j=l.a
i=new H.K(j,new G.iH(t),[H.m(j,0)])
d=i.gl(i)
if(d>1)throw H.c(new P.D("World has several duplicates of mainActor: "+J.i(l)))
else if(d===0){p.fS("mainActor "+H.b(r)+" dies and is removed in world - will use defaultScoreWhenDead")
q=null}else q=j.aK(0,new G.iI(t))
c=J.h(e,q)
p.ab("- actor: "+H.b(e.gh())+" (isMain=="+c+")")
j=q==null
p.ab("- mainActor: "+H.b(j?q:q.gh()))
b=j?q:q.d_(l)
if(b==null)b=C.F
f=new B.eM(b,g.e,g.y)
p.ab(new G.iJ(o,f))
p.ab(new G.iK(g))
z=8
x=[1]
return P.d_(P.hf(f),$async$cm,y)
case 8:p.ab("- generating all actions for "+H.b(e.gh()))
j=n.c
i=n.b
a=n.a
for(a0=new P.b1(t.e0(e,l).a(),null,null,null);a0.t();){a1=a0.c
a2=a1==null?a0.b:a1.gF()
if(a2.M(e,l)!==!0)continue
for(a1=new P.b1(a2.dg(e,g,l).a(),null,null,null);a1.t();){a3=a1.c
a4=a3==null?a1.b:a3.gF();++t.d
if(J.bQ(a4.gdk(),0.05))continue
if(m.a1(0,a4.gby()))continue
n.ax(a4)}}p.ab("- added "+(((n.c-n.b&n.a.length-1)>>>0)-((j-i&a.length-1)>>>0))+" new PlanConsequences")
m.q(0,l)
z=3
break
case 4:case 1:return P.d_(null,0,y)
case 2:return P.d_(v,1,y)}})
var z=0,y=P.p9($async$cm),x,w=2,v,u=[],t=this,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4
return P.qu(y)}},iV:{"^":"a:31;",
$1:function(a){var z=a.c
if(typeof z!=="number")return H.v(z)
return a.b-z}},iT:{"^":"a:1;a",
$0:function(){return"  - consequence: "+H.b(this.a)}},iU:{"^":"a:1;a",
$0:function(){return"    - uplift = "+this.a.k(0)}},iW:{"^":"a:0;a",
$1:function(a){return J.h(a.gj(),this.a.b)}},iX:{"^":"a:1;a,b",
$0:function(){return"Evaluating action '"+this.b.gY()+"' for "+H.b(this.a.cy)}},iY:{"^":"a:1;a",
$0:function(){return"- action '"+this.a.gY()+"' isn't applicable"}},iZ:{"^":"a:1;a",
$0:function(){return"- action '"+this.a.gY()+"' is possible but we couldn't get to any outcomes while planning. Scoring with negative infinity."}},j_:{"^":"a:1;a,b,c",
$0:function(){return"- action '"+this.b.gY()+"' leads to "+H.b(J.aG(this.c))+" different ConsequenceStats, initialScore="+this.a.k(0)}},j0:{"^":"a:1;a,b",
$0:function(){return"- action '"+this.a.gY()+"' was scored "+H.b(this.b)}},iD:{"^":"a:0;a",
$1:function(a){return J.h(a.gj(),this.a.b)}},iE:{"^":"a:1;a,b",
$0:function(){return"_getConsequenceStats for firstAction '"+this.a.gY()+"' of "+H.b(this.b.gh())}},iF:{"^":"a:1;a",
$0:function(){return"- firstAction == "+H.b(this.a)}},iL:{"^":"a:1;a,b",
$0:function(){var z=this.a
return"- current: initialScore="+this.b.k(0)+", cumProb="+H.b(z.e)+" (prob="+H.b(z.d)+", ord="+z.y+")"}},iM:{"^":"a:1;a",
$0:function(){var z=this.a
return"- initial action: "+C.b.c_(" ",z.y)+"- "+J.i(z.b)}},iN:{"^":"a:1;a",
$0:function(){return"evaluating a PlanConsequence of '"+this.a.gfp().gY()+"'"}},iO:{"^":"a:1;a",
$0:function(){var z=this.a.gby().f
return"- situation: "+H.b(J.ir(z.length!==0?C.a.gE(z):null))}},iP:{"^":"a:1;a,b,c",
$0:function(){return"- order ("+this.c.gcJ()+") higher than maximum ("+this.b+"), or consequences ("+this.a.a+") higher than maximum"}},iQ:{"^":"a:1;a",
$0:function(){var z=this.a.gby().d
return"- how we got here: "+new H.aj(z,new G.iC(),[H.m(z,0),null]).cH(0," <- ")}},iC:{"^":"a:0;",
$1:function(a){return a.gb4()}},iR:{"^":"a:0;a",
$1:function(a){return J.h(a.gj(),this.a.b)}},iS:{"^":"a:1;",
$0:function(){return}},iG:{"^":"a:1;a",
$0:function(){return"- "+this.a.k(0)}},iH:{"^":"a:0;a",
$1:function(a){return J.h(a.gj(),this.a.b)}},iI:{"^":"a:0;a",
$1:function(a){return J.h(a.gj(),this.a.b)}},iJ:{"^":"a:1;a,b",
$0:function(){return"- mainActor's score == "+this.b.k(0)+" (initial="+this.a.k(0)+")"}},iK:{"^":"a:1;a",
$0:function(){var z=this.a.gby().d
return"- how we got here: "+new H.aj(z,new G.iB(),[H.m(z,0),null]).cH(0," <- ")}},iB:{"^":"a:0;",
$1:function(a){return a.gb4()}}}],["","",,Z,{"^":"",lQ:{"^":"d;a,b",
gbe:function(){return this.b},
gK:function(a){return this.b.length===0},
h3:function(a,b){var z=this
return P.aM(function(){var y=a,x=b
var w=0,v=2,u,t,s,r,q,p,o,n,m,l
return function $async$h3(c,d){if(c===1){u=d
w=v}while(true)switch(w){case 0:t=z.b
w=t.length<=y?3:4
break
case 3:w=5
return P.bI(t)
case 5:w=1
break
case 4:s=z.ih(new Z.lT())
r=z.e_(new Z.lU(),[s])
q=z.e_(new Z.lV(),[s,r])
w=s!=null?6:8
break
case 6:$.$get$bx().bD("best self preserving: "+H.b(s))
w=9
return s
case 9:p=1
w=7
break
case 8:p=0
case 7:w=r!=null&&p<y?10:11
break
case 10:$.$get$bx().bD("best enemy damaging: "+H.b(r))
w=12
return r
case 12:++p
case 11:w=q!=null&&p<y?13:14
break
case 13:$.$get$bx().bD("best team preserving: "+H.b(q))
w=15
return q
case 15:++p
case 14:if(p===y){w=1
break}C.a.cg(t,new Z.lW(z,x))
o=t.length,n=0
case 16:if(!(n<t.length)){w=18
break}m=t[n]
l=J.n(m)
if(l.u(m,s)){w=17
break}if(l.u(m,r)){w=17
break}if(l.u(m,q)){w=17
break}w=19
return m
case 19:++p
if(p===y){w=18
break}case 17:t.length===o||(0,H.al)(t),++n
w=16
break
case 18:case 1:return P.aK()
case 2:return P.aL(u)}}})},
kg:function(a){var z,y,x,w,v,u,t,s,r,q,p
z={}
y=this.b
if(y.length===1)return C.a.gc1(y)
C.a.cg(y,new Z.lX(this,a))
x=this.a.a
w=x.gce().bh(0,1/0,new Z.lY(a))
v=x.gce().bh(0,-1/0,new Z.lZ(a))
x=J.af(v)
u=J.af(w)
t=u.aw(w,J.bR(x.aw(v,w),0.1))
z.a=t
if(u.u(w,v)){t=J.bq(t,1)
z.a=t
u=t}else u=t
s=x.aw(v,u)
r=P.ln(y.length,new Z.m_(z,this,a,s),!1,P.J)
q=new H.aj(r,new Z.m0(C.a.bh(r,0,Z.i2())),[H.m(r,0),null]).bw(0,!1)
z=C.a.bh(q,0,Z.i2())
if(typeof z!=="number")return H.v(z)
u=q.length
x=u-1
if(x<0)return H.e(q,x)
z=J.am(q[x],1000-z)
if(x>=q.length)return H.e(q,x)
q[x]=z
p=S.mj(q,1000)
if(p>=y.length)return H.e(y,p)
return y[p]},
e_:function(a,b){var z,y,x,w,v,u,t
for(z=this.b,y=z.length,x=this.a.a,w=null,v=null,u=0;u<z.length;z.length===y||(0,H.al)(z),++u){t=z[u]
if(C.a.a1(b,t))continue
if(w==null||J.a3(a.$1(x.i(0,t)),v)){v=a.$1(x.i(0,t))
w=t
continue}}return w},
ih:function(a){return this.e_(a,C.e)},
w:{
lR:function(a){var z,y,x
z=a.gc6()
y=H.x(z,"y",0)
x=P.T(new H.K(z,new Z.lS(a),[y]),!1,y)
if(x.length===0)$.$get$bx().eK("After removing actions scored by undefined, there are no recommendations.")
return x},
uS:[function(a,b){return J.am(a,b)},"$2","i2",4,0,42]}},lT:{"^":"a:0;",
$1:function(a){return a.gc0()}},lU:{"^":"a:0;",
$1:function(a){return J.il(a.gbR())}},lV:{"^":"a:0;",
$1:function(a){return a.gcR()}},lW:{"^":"a:7;a,b",
$2:function(a,b){var z,y
z=this.b
y=this.a.a.a
return-J.bS(z.$1(y.i(0,a)),z.$1(y.i(0,b)))}},lX:{"^":"a:7;a,b",
$2:function(a,b){var z,y
z=this.b
y=this.a.a.a
return-J.bS(z.$1(y.i(0,a)),z.$1(y.i(0,b)))}},lY:{"^":"a:7;a",
$2:function(a,b){var z=this.a.$1(b)
return Math.min(H.d2(a),H.d2(z))}},lZ:{"^":"a:7;a",
$2:function(a,b){var z=this.a.$1(b)
return Math.max(H.d2(a),H.d2(z))}},m_:{"^":"a:9;a,b,c,d",
$1:function(a){var z,y
z=this.b
y=z.b
if(a>=y.length)return H.e(y,a)
return J.aW(J.bq(this.c.$1(z.a.a.i(0,y[a])),this.a.a),this.d)}},m0:{"^":"a:0;a",
$1:function(a){return J.iu(J.bR(J.aW(a,this.a),1000))}},lS:{"^":"a:0;a",
$1:function(a){return!this.a.i(0,a).gjY()}}}],["","",,K,{"^":"",qE:{"^":"a:3;",
$3:function(a,b,c){}},c7:{"^":"d;a,h:b<,c,d,jv:e<,f,bo:r<",
gjt:function(){return this.a},
gv:function(a){return C.b.gv(this.b)},
u:function(a,b){if(b==null)return!1
return b instanceof K.c7&&b.b===this.b},
k:function(a){return"Room<"+this.b+">"},
jw:function(a,b,c){return this.e.$3(a,b,c)},
w:{
a0:function(a,b,c,d,e,f,g){var z=new S.M(null,null,[Q.w])
z.aa()
z.m(f)
return new K.c7(z.p(),a,b,c,d,e,g)}}}}],["","",,Q,{"^":"",w:{"^":"d;jo:a<,Y:b<,b4:c<,jS:d<"}}],["","",,S,{"^":"",a1:{"^":"d;",
gaM:function(){return C.e},
gbe:function(){return C.e},
gfW:function(){return 3},
dG:function(a){return this.aA(this.gI(),a)},
h_:function(a,b){},
h0:function(a,b){},
kd:function(a,b){},
dr:function(a){},
d0:function(a){return!0}}}],["","",,S,{"^":"",
fo:function(a){var z=$.$get$bz().af(3)
if(z<0||z>=3)return H.e(a,z)
return a[z]},
mi:function(a,b){var z,y,x,w,v
z=$.$get$bz().kc()*b
for(y=new H.dv(a,a.gl(a),0,null,[H.x(a,"aT",0)]),x=0,w=0;y.t();){v=y.d
if(typeof v!=="number")return H.v(v)
x+=v
if(x>=z)return w;++w}throw H.c(P.C("The weights do not add up to total="+b))},
mj:function(a,b){var z,y,x,w,v,u,t
z=$.$get$bz().af(b)
for(y=a.length,x=0,w=0,v=0;u=a.length,v<u;u===y||(0,H.al)(a),++v){t=a[v]
if(typeof t!=="number")return H.v(t)
x+=t
if(x>=z)return w;++w}throw H.c(P.C("The weights do not add up to total="+b))},
cM:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=J.H(a)
y=z.aN(a,"{")
if(y!==-1){x=z.gl(a)
if(typeof x!=="number")return x.aw()
x=y<x-1}else x=!1
if(x){w=H.r([],[P.u])
w.push(y)
u=y+1
t=null
s=1
while(!0){x=z.gl(a)
if(typeof x!=="number")return H.v(x)
if(!(u<x)){v=null
break}r=z.i(a,u)
x=J.n(r)
if(x.u(r,"{"))++s
else if(x.u(r,"|")&&s===1)w.push(u)
else if(x.u(r,"}")){--s
if(s===0){w.push(u)
v=u
t=v
break}}q=u+1
t=u
u=q}p=w.length-1
if(p>1){o=$.$get$bz().af(p)
z=z.aB(a,0,y)
x=w.length
if(o<0||o>=x)return H.e(w,o)
n=w[o]
m=o+1
if(m>=x)return H.e(w,m)
m=z+H.b(S.cM(C.b.aB(a,n+1,w[m])))
if(typeof v!=="number")return v.a6()
n=a.length
m+=C.b.aB(a,v+1,n)
z=m.charCodeAt(0)==0?m:m
if(t===n-1)return z
else return S.cM(z)}else{x=z.gl(a)
if(typeof x!=="number")return x.aw()
if(t===x-1)return a
else{if(typeof t!=="number")return t.a6()
x=t+1
return z.aB(a,0,x)+H.b(S.cM(C.b.bz(a,x)))}}}else return a},
aA:function(a,b,c,d){switch($.$get$bz().af(2)){case 0:a.$0()
break
case 1:b.$0()
break
case 2:c.$0()
break
case 4:d.$0()
break}}}],["","",,Y,{"^":"",a8:{"^":"d;aR:a<,aL:b<,aG:c<,h2:d<,e,di:f@,h5:r<,fY:x<,eU:y<,js:z<,hG:Q<,cW:ch<,iT:cx<,jX:cy<,I:db<",
i:function(a,b){switch(b){case"string":return this.a
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
default:throw H.c(P.C("Invalid key "+H.b(b)+"."))}},
k:function(a){var z=this.a
z="Report<"+C.b.aB(z,0,Math.min(z.length,20))+"...,thread="+H.b(this.cx)
return z+(this.cy?"(sup)":"")+">"}},X:{"^":"d;a,I:b<,c",
ger:function(){return C.a.bO(this.a,new Y.nA())},
aY:function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){var z,y
if(b==null||J.h(b,""))return
z=(J.b5(b).eo(b,".")||C.b.eo(b,"!")||C.b.eo(b,"?"))&&C.b.d2(b,P.be("[A-Z]",!0,!1))?!0:p
y=this.b
this.a.push(new Y.a8(b,m,h,j,i,d,k,g,!1,e,l,z,c,f,y))},
q:function(a,b){return this.aY(a,b,null,!1,!1,!1,!1,null,null,null,!1,!1,null,!1,null,!1)},
G:function(a,b,c){return this.aY(a,b,null,!1,!1,!1,!1,null,null,null,!1,!1,null,!1,null,c)},
iV:function(a,b,c,d,e,f,g,h,i,j,k,l,m){return this.aY(a,b,c,d,e,f,g,h,i,null,j,!1,k,l,null,m)},
ft:function(a,b,c){return this.aY(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,null,!1,null,!1)},
j_:function(a,b,c,d,e,f){return this.aY(a,b,null,!1,!1,!1,!1,c,null,d,!1,!1,e,!1,null,f)},
de:function(a,b,c,d){return this.aY(a,b,null,!1,!1,!1,!1,null,null,c,!1,!1,d,!1,null,!1)},
iX:function(a,b,c,d,e){return this.aY(a,b,null,!1,!1,!1,c,null,null,null,!1,d,e,!1,null,!1)},
de:function(a,b,c,d){return this.aY(a,b,null,!1,!1,!1,!1,null,null,c,!1,!1,d,!1,null,!1)},
fu:function(a,b,c,d){return this.aY(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,d,!1,null,!1)},
fv:function(a,b,c,d,e,f){return this.aY(a,b,c,!1,!1,!1,!1,d,null,null,e,!1,f,!1,null,!1)},
iZ:function(a,b,c,d,e,f){return this.aY(a,b,c,!1,!1,d,!1,e,null,null,!1,!1,f,!1,null,!1)},
iY:function(a,b,c,d,e){return this.aY(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,d,!1,null,e)},
j3:function(a,b,c,d,e,f,g,h){var z,y,x,w,v,u,t
if(b.length===0)return
z=H.b(new Y.ny().$1(a))+" "
for(y=b.length,x=e-1,w=0,v=0,u=0;u<b.length;b.length===y||(0,H.al)(b),++u){t=b[u]
if(w>0){if(w===1&&J.h(t,C.a.gE(b)))z=z+" "+d
else z=w===x?z+(", "+d):z+","
z+=" "}z+=H.b(this.bN(t.gh(),t.gh(),t,null,this.b));++w
if(w>x||J.h(t,C.a.gE(b))){z+="."
this.j_(0,z.charCodeAt(0)==0?z:z,f,g,h,!0);++v
z=H.o(a,"<also>","also")+" "
w=0}}},
j2:function(a,b,c,d){return this.j3(a,b,c,"and",3,null,null,d)},
ej:function(){return this.G(0,"\n\n",!0)},
bN:function(a,b,c,d,e){var z,y,x,w
if(d!=null){z=J.H(a)
z=z.aN(a,"<owner's> "+H.b(b))!==-1||z.aN(a,"<ownerPronoun's> "+H.b(b))!==-1||z.aN(a,"<object-owner's> "+H.b(b))!==-1||z.aN(a,"<object-ownerPronoun's> "+H.b(b))!==-1}else z=!1
if(z)return a
z=J.H(a)
if(z.aN(a,"<subject's> "+H.b(b))!==-1||z.aN(a,"<subjectPronoun's> "+H.b(b))!==-1)return a
if(c.gdq()!==!0){y=this.c
x=y.i(0,c.gj())
if((x==null?-1:x)<e)w=z.cM(a,b,"the "+H.b(b))
else{w=J.ez(c.gh(),P.be("[aeiouy]",!1,!1))?z.cM(a,b,"an "+H.b(b)):z.cM(a,b,"a "+H.b(b))
y.n(0,c.gj(),e)}}else w=null
return w==null?a:w},
ep:function(a,b){var z,y
if(!this.aH(a)||!this.aH(b))return!1
z=this.a
if(a<0||a>=z.length)return H.e(z,a)
if(z[a].gaL()!=null){if(b<0||b>=z.length)return H.e(z,b)
y=z[b].gaL()==null}else y=!0
if(y)return!1
if(a>=z.length)return H.e(z,a)
if(z[a].gaG()!=null){if(b<0||b>=z.length)return H.e(z,b)
y=z[b].gaG()==null}else y=!0
if(y)return!1
if(a>=z.length)return H.e(z,a)
y=z[a].gaL().gj()
if(b<0||b>=z.length)return H.e(z,b)
if(J.h(y,z[b].gaG().gj())){if(a>=z.length)return H.e(z,a)
y=z[a].gaG().gj()
if(b>=z.length)return H.e(z,b)
z=J.h(y,z[b].gaL().gj())}else z=!1
return z},
dF:function(a){var z=this
return P.aM(function(){var y=a
var x=0,w=2,v,u,t
return function $async$dF(b,c){if(b===1){v=c
x=w}while(true)switch(x){case 0:if(!z.aH(y)){x=1
break}u=z.a
if(y<0||y>=u.length)H.e(u,y)
t=u[y]
x=t.gaL()!=null?3:4
break
case 3:x=5
return t.gaL()
case 5:case 4:x=t.gaG()!=null?6:7
break
case 6:x=8
return t.gaG()
case 8:case 7:x=t.gh2()!=null?9:10
break
case 9:x=11
return t.d
case 11:case 10:u=t.e
x=u!=null?12:13
break
case 12:x=14
return u
case 14:case 13:case 1:return P.aK()
case 2:return P.aL(v)}}})},
cI:[function(a){var z=J.af(a)
if(z.aJ(a,0)||z.bI(a,this.a.length))return
else{z=this.a
if(a>>>0!==a||a>=z.length)return H.e(z,a)
return z[a].gaG()}},"$1","gaG",2,0,21],
ke:function(a,b){var z
if(!this.aH(a)||!this.aH(b))return!1
if(this.ep(a,b)){z=this.a
if(a>=z.length)return H.e(z,a)
z[a].geU()}return!1},
h1:function(a){var z
for(z=!1;this.ger();z=!0){a.$1(this.h6(!0))
this.km()}return z},
h6:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c
z=this.a
y=C.a.bh(z,[],new Y.nB())
C.a.iD(z,new Y.nC(y),!1)
x=a&&this.ger()?C.a.aN(z,C.a.dl(z,new Y.nD()))+1:z.length
if(x<1)return""
for(w=-1,v=!0,u=!1,t=!1,s=0,r="";s<x;++s){q=s===0
if(!q){p=s-1
o=this.ep(p,s)
if(s>=z.length)return H.e(z,s)
if(!z[s].gdi())n=this.ke(s,p)&&this.hF(s,p)
else n=!0
if(n){if(p<0||p>=z.length)return H.e(z,p)
t=!z[p].gdi()}else t=!1
if(s>=z.length)return H.e(z,s)
z[s].sdi(t)
n=s-w
if(n<3)if(!u){if(s>=z.length)return H.e(z,s)
if(!z[s].ghG()){if(p<0||p>=z.length)return H.e(z,p)
if(!z[p].gjs()){if(s>=z.length)return H.e(z,s)
if(!z[s].gcW())if(this.dc(s,p)||o)if(!(t&&n>1)){if(t){if(p>=z.length)return H.e(z,p)
n=z[p].gdi()}else n=!1
n=n||this.kD(s)>4}else n=!0
else n=!0
else n=!0}else n=!0}else n=!0
v=n}else v=!0
else v=!0
if(v){if(p<0||p>=z.length)return H.e(z,p)
if(z[p].gcW()){r+=" "
p=r}else{r+=". "
p=r}if(t){if(s>=z.length)return H.e(z,s)
n=!z[s].gcW()}else n=!1
r=n?r+"But ":p
u=!1}else if(t){r+=S.fo([" but "," but ",", but "])
u=!this.hs(s,s+1)&&!0}else{r+=S.fo([" and "," and ",", and "])
u=!0}}m=this.dO(s)
l=S.cM(m)
p=J.H(l)
if(p.a1(l,"{")===!0||p.a1(l,"}")===!0)$.$get$hX().dK('Storyline result includes { and/or } even after being parsed by Randomly. Is there a dangling bracket here? Input = """'+H.b(m)+'""" Output = """'+H.b(l)+'"""')
n=!v
if(n){k=s-1
k=this.dc(s,k)&&J.ez(this.dO(k),"<subject> ")&&p.d2(l,"<subject> ")}else k=!1
if(k)l=p.cM(l,"<subject> ","")
j=J.da(l,"<action>",this.dO(s))
p=s-1
k=this.iG(s,p)
if(k)k=!(this.cI(s).ga4()===C.o&&this.bd(s).ga4()===C.o)
else k=!1
if(k){j=H.o(j,"<object-owner's> <object>","<objectPronounAccusative>")
j=H.o(j,"<object-ownerPronoun's> <object>","<objectPronounAccusative>")
j=H.o(j,"<object>","<objectPronounAccusative>")
j=H.o(j,"<object's>","<objectPronoun's>")}k=this.dc(s,p)
if(k){j=H.o(j,"<owner's> <subject>","<subjectPronoun>")
j=H.o(j,"<ownerPronoun's> <subject>","<subjectPronoun>")
j=H.o(j,"<subject>","<subjectPronoun>")
j=H.o(j,"<subject's>","<subjectPronoun's>")}if(this.cI(p)!=null)if(this.bd(s)!=null)if(this.bd(p)!=null){k=this.cI(p)
k=k==null?k:k.gj()
i=this.bd(s)
if(J.h(k,i==null?i:i.gj())){k=this.bd(p)
k=k==null?k:k.ga4()
i=this.bd(s)
k=!J.h(k,i==null?i:i.ga4())}else k=!1}else k=!1
else k=!1
else k=!1
if(k){j=H.o(j,"<owner's> <subject>","<subjectPronoun>")
j=H.o(j,"<ownerPronoun's> <subject>","<subjectPronoun>")
j=H.o(j,"<subject>","<subjectPronoun>")
j=H.o(j,"<subject's>","<subjectPronoun's>")}if(this.bd(p)!=null)if(this.cI(s)!=null){k=this.bd(p)
k=k==null?k:k.gj()
i=this.cI(s)
if(J.h(k,i==null?i:i.gj())){p=this.bd(p)
p=p==null?p:p.ga4()
k=this.bd(s)
p=!J.h(p,k==null?k:k.ga4())}else p=!1}else p=!1
else p=!1
if(p){j=H.o(j,"<object-owner's> <object>","<objectPronoun>")
j=H.o(j,"<object-ownerPronoun's> <object>","<objectPronoun>")
j=H.o(j,"<object>","<objectPronounAccusative>")
j=H.o(j,"<object's>","<objectPronoun's>")}if(s>=z.length)return H.e(z,s)
p=z[s]
h=p.gaL()
g=p.gaG()
f=p.gh2()
e=p.e
k=h!=null
if(k){if(h.gH()===!0){d=H.o(j,"<subject>","you")
d=H.o(d,"<subject's>","your")}else d=j
if(h.ga4()===C.B||h.ga4()===C.a_){d=H.o(d,"<s>","")
d=H.o(d,"<es>","")
d=H.o(d,"<sses>","ss")
d=H.o(d,"<ies>","y")
d=H.o(d,"<does>","do")
d=H.o(d,"<is>","are")
d=H.o(d,"<has>","have")}else{d=H.o(d,"<s>","s")
d=H.o(d,"<es>","es")
d=H.o(d,"<sses>","sses")
d=H.o(d,"<ies>","ies")
d=H.o(d,"<does>","does")
d=H.o(d,"<is>","is")
d=H.o(d,"<has>","has")}d=H.ia(d,"<subject>","<subjectNoun>",0)
i=h.ga4().a
d=H.o(d,"<subject>",i)
i=p.db
d=J.cm(this.bN(d,"<subjectNoun>",h,f,i),"<subjectNoun>",h.gh())
c=h.ga4().a
d=H.o(d,"<subjectPronoun>",c)
if(C.b.a1(j,P.be("<subject>.+<subject's>",!0,!1))){c=h.ga4().c
d=H.o(d,"<subject's>",c)}d=J.cm(this.bN(d,"<subject's>",h,f,i),"<subject's>",H.b(h.gh())+"'s")
i=h.ga4().c
d=H.o(d,"<subject's>",i)
i=h.ga4().d
d=H.o(d,"<subjectPronounSelf>",i)}else d=j
if(g!=null){if(g.gH()===!0){d=H.o(d,"<object>","you")
d=H.o(d,"<object's>","your")}else d=J.da(this.bN(d,"<object>",g,e,p.db),"<object>",g.gh())
i=g.ga4().b
d=H.o(d,"<objectPronoun>",i)
if(C.b.a1(j,P.be("<object>.+<object's>",!0,!1))){i=g.ga4().c
d=H.o(d,"<object's>",i)}d=J.cm(this.bN(d,"<object's>",g,e,p.db),"<object's>",H.b(g.gh())+"'s")
i=g.ga4().c
d=H.o(d,"<object's>",i)
i=g.ga4().c
d=H.o(d,"<objectPronoun's>",i)
i=g.ga4().b
d=H.o(d,"<objectPronounAccusative>",i)}if(k){k=h.ga4().c
d=H.o(d,"<subjectPronoun's>",k)}p=p.db
j=this.fk(e,this.fk(f,d,j,"<owner>","<owner's>","<ownerPronoun>","<ownerPronoun's>",p),j,"<object-owner>","<object-owner's>","<object-ownerPronoun>","<object-ownerPronoun's>",p)
r+=(!n||q)&&!t?Y.nz(j):j
if(v)w=s
if(s>=z.length)return H.e(z,s)
if(z[s].gcW())u=!0}q=x-1
if(q>=z.length)return H.e(z,q)
z=!z[q].gcW()?r+".":r
return H.uo(z.charCodeAt(0)==0?z:z,$.$get$fI(),new Y.nE(),null)},
ca:function(){return this.h6(!1)},
km:function(){var z,y
if(!this.ger()){C.a.sl(this.a,0)
return}z=this.a
y=C.a.aN(z,C.a.dl(z,new Y.nF()))+1
P.c5(0,y,z.length,null,null,null)
z.splice(0,y-0)},
hs:function(a,b){var z,y
if(!this.aH(a)||!this.aH(b))return!1
if(this.ep(a,b)){z=this.a
if(a>=z.length)return H.e(z,a)
z[a].geU()}if(!this.dc(a,b))return!1
z=this.a
if(a>=z.length)return H.e(z,a)
if(z[a].gh5()){if(b>=z.length)return H.e(z,b)
y=z[b].gh5()}else y=!1
if(y)return!0
if(a>=z.length)return H.e(z,a)
if(z[a].gfY()){if(b>=z.length)return H.e(z,b)
z=z[b].gfY()}else z=!1
if(z)return!0
else return!1},
hF:function(a,b){var z,y,x,w,v
if(!this.aH(a)||!this.aH(b))return!1
for(z=new P.b1(this.dF(a).a(),null,null,null);z.t();){y=z.c
x=y==null?z.b:y.gF()
for(y=new P.b1(this.dF(b).a(),null,null,null);y.t();){w=y.c
v=w==null?y.b:w.gF()
if(J.h(x.gj(),v.gj()))return!0}}return!1},
dO:[function(a){var z=J.af(a)
if(z.aJ(a,0)||z.bI(a,this.a.length))return
else{z=this.a
if(a>>>0!==a||a>=z.length)return H.e(z,a)
return z[a].gaR()}},"$1","gaR",2,0,11],
bd:[function(a){var z=J.af(a)
if(z.aJ(a,0)||z.bI(a,this.a.length))return
else{z=this.a
if(a>>>0!==a||a>=z.length)return H.e(z,a)
return z[a].gaL()}},"$1","gaL",2,0,21],
kD:function(a){var z,y,x
z=this.a
if(a>=z.length)return H.e(z,a)
if(z[a].gI()!=null){y=a-1
if(this.aH(y)){if(y<0||y>=z.length)return H.e(z,y)
y=z[y].gI()==null}else y=!0}else y=!0
if(y)return 1000
else{if(a>=z.length)return H.e(z,a)
y=z[a].gI()
x=a-1
if(x<0||x>=z.length)return H.e(z,x)
x=z[x].gI()
if(typeof y!=="number")return y.aw()
if(typeof x!=="number")return H.v(x)
return y-x}},
k:function(a){return this.ca()},
aH:function(a){if(a>=this.a.length||a<0)return!1
else return!0},
fk:function(a,b,c,d,e,f,g,h){var z
if(a!=null){z=a.gH()===!0?H.o(H.o(b,d,"you"),e,"your"):J.da(this.bN(b,d,a,null,h),d,a.gh())
z=H.o(z,f,a.ga4().a)
z=H.o(H.o(J.cm(this.bN(C.b.a1(c,P.be(d+".+"+e,!0,!1))?H.o(z,e,a.ga4().c):z,e,a,null,h),e,H.b(a.gh())+"'s"),e,a.ga4().c),g,a.ga4().c)}else z=H.o(H.o(H.o(H.o(b,d,""),e,""),f,""),g,"")
return z},
iG:function(a,b){var z,y
if(!this.aH(a)||!this.aH(b))return!1
z=this.a
if(a>=z.length)return H.e(z,a)
if(z[a].gaG()!=null){if(b<0||b>=z.length)return H.e(z,b)
y=z[b].gaG()==null}else y=!0
if(y)return!1
if(a>=z.length)return H.e(z,a)
y=z[a].gaG().gj()
if(b<0||b>=z.length)return H.e(z,b)
return J.h(y,z[b].gaG().gj())},
dc:function(a,b){var z,y
if(!this.aH(a)||!this.aH(b))return!1
z=this.a
if(a>=z.length)return H.e(z,a)
if(z[a].gaL()!=null){if(b<0||b>=z.length)return H.e(z,b)
y=z[b].gaL()==null}else y=!0
if(y)return!1
if(a>=z.length)return H.e(z,a)
y=z[a].gaL().gj()
if(b<0||b>=z.length)return H.e(z,b)
return J.h(y,z[b].gaL().gj())},
w:{
nz:function(a){var z,y,x
z=!C.b.a1(a,"\n\n")?C.b.kH(a):a
y=z.length
if(y===0)return z
if(0>=y)return H.e(z,0)
x=z[0].toUpperCase()
if(y===1)return x
else return x+C.b.bz(z,1)}}},nA:{"^":"a:0;",
$1:function(a){return J.h(a.gaR(),"\n\n")}},ny:{"^":"a:22;",
$1:function(a){return C.b.eJ(H.o(H.o(a,"<also> ",""),"  "," "))}},nB:{"^":"a:41;",
$2:function(a,b){var z,y,x
z=J.H(a)
y=z.gal(a)?z.gE(a):null
if(y!=null&&y.gjX()&&J.h(b.giT(),y.cx)){x=z.gl(a)
if(typeof x!=="number")return x.aw()
z.n(a,x-1,b)}else z.q(a,b)
return a}},nC:{"^":"a:44;a",
$1:function(a){return J.io(this.a,a)}},nD:{"^":"a:0;",
$1:function(a){return J.h(a.gaR(),"\n\n")}},nE:{"^":"a:45;",
$1:function(a){return H.b(a.i(0,1))+H.b(a.i(0,2))+H.b(a.i(0,3))}},nF:{"^":"a:0;",
$1:function(a){return J.h(a.gaR(),"\n\n")}},b9:{"^":"ly;dq:a<,h:b<,c,bl:d<,H:e<,a4:f<",
gj:function(){return H.az(this)},
geu:function(){return!0},
gbu:function(){return!0},
w:{
dh:function(a,b,c,d,e){var z=H.r([],[P.q])
return new Y.b9(c,b,z,e==null?$.$get$bP():e,!1,d)}}},ly:{"^":"d+di;"},di:{"^":"d;",
gaO:function(){return this.gbu()&&this.geu()===!0},
ag:function(a,b,c,d,e,f,g,h,i,j,k,l){J.im(a,b,c,d,e,f,g,h,i,j,H.a6(this,"$isb9"),!1,l)},
ah:function(a,b){return this.ag(a,b,null,!1,!1,!1,!1,null,null,!1,!1,!1)},
at:function(a,b,c){return this.ag(a,b,null,c,!1,!1,!1,null,null,!1,!1,!1)},
h7:function(a,b,c){return this.ag(a,b,null,!1,!1,!1,!1,null,null,!1,!1,c)},
aq:function(a,b,c){return this.ag(a,b,null,!1,!1,!1,!1,c,null,!1,!1,!1)},
bU:function(a,b,c){return this.ag(a,b,null,!1,!1,!1,!1,null,null,c,!1,!1)},
cO:function(a,b,c,d){return this.ag(a,b,null,c,!1,!1,!1,d,null,!1,!1,!1)},
eE:function(a,b,c,d,e){return this.ag(a,b,c,!1,!1,!1,!1,d,null,e,!1,!1)},
ba:function(a,b,c){return this.ag(a,b,null,!1,!1,!1,c,null,null,!1,!1,!1)},
cb:function(a,b,c,d){return this.ag(a,b,null,!1,c,!1,d,null,null,!1,!1,!1)},
eD:function(a,b,c,d){return this.ag(a,b,null,c,!1,!1,d,null,null,!1,!1,!1)},
bv:function(a,b,c,d){return this.ag(a,b,null,!1,!1,!1,!1,c,null,d,!1,!1)},
cb:function(a,b,c,d){return this.ag(a,b,null,!1,c,!1,d,null,null,!1,!1,!1)},
h8:function(a,b,c,d){return this.ag(a,b,null,!1,!1,!1,c,d,null,!1,!1,!1)},
ha:function(a,b,c,d,e){return this.ag(a,b,c,!1,!1,d,!1,e,null,!1,!1,!1)},
ks:function(a,b,c,d){return this.ag(a,b,null,c,!1,!1,!1,null,null,d,!1,!1)},
kr:function(a,b,c,d){return this.ag(a,b,c,!1,!1,d,!1,null,null,!1,!1,!1)},
kw:function(a,b,c,d,e,f){return this.ag(a,b,c,d,!1,e,!1,f,null,!1,!1,!1)},
ku:function(a,b,c,d,e){return this.ag(a,b,c,d,!1,e,!1,null,null,!1,!1,!1)},
h9:function(a,b,c,d){return this.ag(a,b,null,!1,!1,!1,!1,c,d,!1,!1,!1)},
kv:function(a,b,c,d,e){return this.ag(a,b,null,!1,c,!1,!1,d,null,e,!1,!1)},
kx:function(a,b,c,d,e,f){return this.ag(a,b,null,!1,c,!1,!1,d,e,f,!1,!1)},
eD:function(a,b,c,d){return this.ag(a,b,null,c,!1,!1,d,null,null,!1,!1,!1)},
kt:function(a,b,c,d){return this.ag(a,b,null,!1,c,!1,!1,null,null,d,!1,!1)}},c3:{"^":"d;a,b,c,d",
k:function(a){return this.a}}}],["","",,L,{"^":"",r8:{"^":"a:0;",
$1:function(a){a.gcu().b=2
return 2}},re:{"^":"a:0;",
$1:function(a){a.gcu().b=0
return 0}},r7:{"^":"a:0;",
$1:function(a){a.gcu().b=1
return 1}},fQ:{"^":"d;"},oZ:{"^":"fQ;j:a<",
Z:function(a){var z=new L.bh(null,null)
z.m(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof L.fQ))return!1
z=this.a
y=b.a
return z==null?y==null:z===y},
gv:function(a){return Y.R(Y.k(0,J.j(this.a)))},
k:function(a){return"Team {id="+J.i(this.a)+",\n}"},
w:{
e_:function(a){var z=new L.bh(null,null)
a.$1(z)
return z.p()}}},bh:{"^":"d;a,b",
gj:function(){return this.gcu().b},
gcu:function(){var z=this.a
if(z!=null){this.b=z.a
this.a=null}return this},
m:function(a){this.a=a},
p:function(){var z,y
z=this.a
if(z==null){y=this.gcu().b
z=new L.oZ(y)
if(y==null)H.f(P.l("id"))}this.m(z)
return z}}}],["","",,X,{"^":"",
hA:function(a,b){return P.aM(function(){var z=a,y=b
var x=0,w=1,v,u,t,s,r,q
return function $async$hA(c,d){if(c===1){v=d
x=w}while(true)switch(x){case 0:u=z.a
t=new J.b7(u,u.length,0,null,[H.m(u,0)])
u=y.a
s=new J.b7(u,u.length,0,null,[H.m(u,0)])
case 2:r=t.t()
q=s.t()
x=r?5:6
break
case 5:x=7
return t.d
case 7:case 6:x=q?8:9
break
case 8:x=10
return s.d
case 10:case 9:case 3:if(r||q){x=2
break}case 4:return P.aK()
case 1:return P.aL(v)}}})}}],["","",,A,{"^":"",a5:{"^":"d;eh:a<,bT:b<,c,d,e,f,I:r<,x",
gjf:function(){var z=this.f
return z.length!==0?C.a.gE(z):null},
gv:function(a){var z,y,x,w,v
z=X.bp(this.a)
y=X.bp(this.d)
x=X.bp(this.f)
w=this.r
v=this.c
v=X.d1(X.aV(X.aV(0,C.d.gv(w)),J.j(v)))
return X.d1(X.aV(X.aV(X.aV(X.aV(0,z&0x1FFFFFFF),y&0x1FFFFFFF),x&0x1FFFFFFF),v&0x1FFFFFFF))},
u:function(a,b){var z
if(b==null)return!1
z=J.n(b)
return!!z.$isa5&&this.gv(this)===z.gv(b)},
fq:function(a){var z,y
z=this.hr(a,!0)
y=z.gX(z)
if(y.t()){y.gF()
return!0}return!1},
iR:function(a){var z,y
z=this.hq(a)
y=z.gX(z)
if(y.t()){y.gF()
return!0}return!1},
iS:function(a){var z=this.x
if(z==null)return!1
return C.b.a1(z.gh(),a)},
fH:function(a){var z,y,x
z=this.d7(a)
if(z==null)throw H.c(new P.D("Tried to elapseSituationTime of situation id="+H.b(a)+" that doesn't exist in situations ("+H.b(this.f)+")."))
y=this.f
if(z!==(z|0)||z>=y.length)return H.e(y,z)
x=y[z].as()
if(z!==(z|0)||z>=y.length)return H.e(y,z)
y[z]=x},
as:function(){++this.r},
dE:function(a,b,c,d,e){var z=this.d
if(a!=null)z=z.dP(0,new A.ox(a))
if(b!=null)z=z.bY(0,new A.oy(b))
if(c!=null)z=z.bY(0,new A.oz(c))
if(e!=null)z=z.bY(0,new A.oA(e))
return d!=null?z.bY(0,new A.oB(d)):z},
hr:function(a,b){return this.dE(a,null,null,null,b)},
hq:function(a){return this.dE(a,null,null,null,null)},
a_:function(a){return this.a.aK(0,new A.oC(a))},
dI:function(a){return this.e.aK(0,new A.oD(a))},
eM:function(a){var z,y
z=this.d7(a)
if(z==null)return
y=this.f
if(z!==(z|0)||z>=y.length)return H.e(y,z)
return y[z]},
ai:function(a){var z,y
for(z=this.f,y=z.length-1;y>=0;--y){if(y>=z.length)return H.e(z,y)
if(J.h(z[y].gh(),a)){if(y>=z.length)return H.e(z,y)
return z[y]}}throw H.c(P.C("No situation with name="+a+" found."))},
jH:function(a){var z=this.a.b6(0,new A.oE(a),new A.oF())
if(z==null)return!1
return z.gbu()},
b0:function(){var z,y
z=this.f
y=C.a.gE(z)
y.dr(this)
C.a.a8(z,y)},
bG:function(a){var z,y
z=this.f
while(!0){if(!(z.length!==0&&!J.h(C.a.gE(z).gh(),a)))break
y=C.a.gE(z)
y.dr(this)
C.a.a8(z,y)}if(z.length===0)throw H.c(P.C("Tried to pop situations until "+a+" but none was found in stack."))},
cN:function(a,b){var z,y
z=this.d7(a)
if(z==null)throw H.c(P.C("Situation with id "+H.b(a)+" does not exist in "+H.b(this.f)))
y=this.f
if(z!==(z|0)||z>=y.length)return H.e(y,z)
y[z]=b},
dz:function(a,b,c,d,e){var z,y,x,w
z=this.dE(a,b,c,d,e)
y=z.gX(z)
if(y.t()){x=y.gF()
y=this.r
w=x.gI()
if(typeof w!=="number")return H.v(w)
return y-w}return},
kC:function(a,b,c){return this.dz(null,a,b,c,null)},
cc:function(a,b,c){return this.dz(a,null,b,null,c)},
kB:function(a,b,c){return this.dz(a,b,null,null,c)},
kA:function(a){return this.dz(a,null,null,null,null)},
k:function(a){var z,y
z=this.a
y=z.e6()
y.ao(0,z)
return"World<"+P.bZ(y,"{","}")+">"},
a5:function(a,b){var z,y,x
z=this.a_(a)
y=z.Z(b)
x=this.a
x.a8(0,z)
x.q(0,y)},
d7:function(a){var z,y,x
y=this.f
x=0
while(!0){if(!(x<y.length)){z=null
break}if(J.h(y[x].gj(),a)){z=x
break}++x}return z},
hT:function(a){this.a.ao(0,a.a)
this.d.ao(0,a.d)
this.b.ao(0,a.b)
this.e.ao(0,a.e)
C.a.ao(this.f,a.f)
this.r=a.r},
w:{
dY:function(a){var z,y,x,w
z=P.W(null,null,null,R.G)
y=P.b0(null,O.co)
x=P.W(null,null,null,U.an)
w=P.W(null,null,null,null)
w=new A.a5(z,x,a.c,y,w,[],null,null)
w.hT(a)
return w}}},ox:{"^":"a:0;a",
$1:function(a){return a.gfs()===this.a}},oy:{"^":"a:0;a",
$1:function(a){return J.h(a.gdv(),this.a.gj())}},oz:{"^":"a:0;a",
$1:function(a){return a.geV().a1(0,this.a.x)}},oA:{"^":"a:0;a",
$1:function(a){return a.ghm()===this.a}},oB:{"^":"a:0;a",
$1:function(a){return a.ghk()===this.a}},oC:{"^":"a:0;a",
$1:function(a){return J.h(a.gj(),this.a)}},oD:{"^":"a:0;a",
$1:function(a){return J.h(a.gh(),this.a)}},oE:{"^":"a:0;a",
$1:function(a){return J.h(a.gj(),this.a)}},oF:{"^":"a:1;",
$0:function(){return}}}],["","",,A,{"^":"",aI:{"^":"a7;a3:b<"},bB:{"^":"aI;c,Y:d<,O:e<,h:f<,b,a",
V:[function(a,b,c){throw H.c(new P.D("SimpleAction always succeeds"))},"$3","gS",6,0,2],
W:[function(a,b,c){return this.c.$4(a,b,c,this)},"$3","gT",6,0,2],
ak:function(a,b){throw H.c(new P.D("SimpleAction shouldn't have to provide roll reason"))},
N:function(a,b){return 1},
gP:function(){return!1},
M:function(a,b){return!0},
gR:function(){return H.f(new P.D("Not rerollable"))},
gU:function(){return!1}}}],["","",,N,{"^":"",jr:{"^":"I;P:c<,a3:d<,O:e<,U:f<,R:r<,b,a",
gaj:function(){return"confuse <object>"},
gh:function(){return"Confuse"},
gan:function(){return"will <subject> confuse <object>?"},
V:[function(a,b,c){var z
a.ah(c,"<subject> touch<es> <subject's> temple")
z=this.b
a.aq(c,"<subject> tr<ies> to {channel|implant} {terror|confusion} into <object's> mind",z)
a.eD(c,"<subject> fail<s>",!0,!0)
return H.b(a.gh())+" fails to confuse "+H.b(z.gh())},"$3","gS",6,0,2],
W:[function(a,b,c){var z
a.ah(c,"<subject> touch<es> <subject's> temple")
z=this.b
a.bv(c,"<subject> {channel<s>|implant<s>} {terror|confusion} into <object's> mind",z,!0)
z.ba(c,"<subject's> eyes go wide with terror",!0)
return H.b(a.gh())+" confuses "+H.b(z.gh())},"$3","gT",6,0,2],
N:function(a,b){return 0.6},
M:function(a,b){var z
if(a.gH()===!0)if(a.gac()){z=b.a
z=new H.K(z,new N.js(this),[H.m(z,0)])
z=z.gl(z)>=2&&!this.b.ew(b)}else z=!1
else z=!1
return z},
w:{
uz:[function(a){return new N.jr(!0,!0,"Channeling the terror of the Dead Prince into lesser minds is something you've been practicing. It makes the target rabid and disoriented. They might attack their own.",!0,C.c,a,null)},"$1","ry",2,0,5]}},js:{"^":"a:0;a",
$1:function(a){var z,y
if(a.gbu()){z=a.gbl()
y=this.a.b.gbl()
z=z.a
y=y.gj()
y=z==null?y==null:z===y
z=y}else z=!1
return z}}}],["","",,V,{"^":"",jP:{"^":"I;U:c<,R:d<,P:e<,a3:f<,O:r<,b,a",
gaj:function(){return"kick <object's> weapon off"},
gh:function(){return"DisarmKick"},
gan:function(){return"will <subject> kick the weapon off?"},
V:[function(a,b,c){S.aA(new V.jQ(this,a,c),new V.jR(this,a,c),null,null)
return H.b(a.gh())+" fails to kick "+H.b(this.b.gh())+"'s weapon off"},"$3","gS",6,0,2],
W:[function(a,b,c){var z,y
S.aA(new V.jS(this,a,c),new V.jT(this,a,c),null,null)
z=b.f
y=z.length!==0?C.a.gE(z):null
b.cN(y.gj(),y.Z(new V.jU(this)))
z=this.b
b.a5(z.gj(),new V.jV())
return H.b(a.gh())+" kicks "+H.b(z.gh())+"'s weapon off"},"$3","gT",6,0,2],
N:function(a,b){var z=a.gac()?0:0.2
if(a.Q===!0)return 0.7-z
return 0.5-z},
M:function(a,b){var z
if(a.gac()||a.dx===C.h){z=this.b
z=z.gae()&&!z.gb7()}else z=!1
return z},
w:{
uC:[function(a){return new V.jP(!0,C.c,!0,!0,"When enemies are on the ground, you can try to kick their weapon off to disarm them.",a,null)},"$1","rP",2,0,5]}},jQ:{"^":"a:1;a,b,c",
$0:function(){var z,y
z=this.b
y=this.c
z.aq(y,"<subject> kick<s> {at|towards} <object's> weapon",this.a.b)
z.at(y,"<subject> mi<sses>",!0)}},jR:{"^":"a:1;a,b,c",
$0:function(){var z,y
z=this.c
y=this.a.b
this.b.aq(z,"<subject> kick<s> <object's> weapon",y)
y.at(z,"<subject> hold<s> onto it",!0)}},jS:{"^":"a:1;a,b,c",
$0:function(){var z=this.a.b
this.b.kx(this.c,"<subject> kick<s> <object-owner's> <object> off <object-owner's> hand",!0,z.gJ(),z,!0)}},jT:{"^":"a:1;a,b,c",
$0:function(){var z,y
z=this.c
y=this.a.b
this.b.bv(z,"<subject> kick<s> <object's> {right|} hand",y,!0)
z.de(0,"<owner's> <subject> fl<ies> away",y,y.gJ())}},jU:{"^":"a:23;a",
$1:function(a){a.gbC().q(0,this.a.b.gJ())
return a}},jV:{"^":"a:0;",
$1:function(a){a.sJ($.$get$ei())
return a}}}],["","",,R,{"^":"",la:{"^":"I;U:c<,R:d<,P:e<,a3:f<,O:r<,b,a",
gh:function(){return"KickToGround"},
gaj:function(){return"kick <object> to the ground"},
gan:function(){return"will <subject> kick <object> prone?"},
V:[function(a,b,c){S.aA(new R.lb(this,a,c),new R.lc(this,a,c),null,null)
return H.b(a.gh())+" fails to sweep "+H.b(this.b.gh())+" off feet"},"$3","gS",6,0,2],
W:[function(a,b,c){var z
S.aA(new R.ld(this,a,c),new R.le(this,a,c,b.ai("FightSituation").gbo()),null,null)
z=this.b
b.a5(z.gj(),new R.lf())
return H.b(a.gh())+" sweeps "+H.b(z.gh())+" off feet"},"$3","gT",6,0,2],
N:function(a,b){var z=a.gac()?0:0.2
if(a.Q===!0)return 0.7-z
return 0.5-z},
M:function(a,b){return(a.gac()||a.dx===C.h)&&!this.b.gae()},
w:{
uN:[function(a){return new R.la(!0,C.c,!0,!0,"Sweeping opponents off their feet doesn't deal much damage but on the ground they will be much easier targets for you and your allies.",a,null)},"$1","tj",2,0,5]}},lb:{"^":"a:1;a,b,c",
$0:function(){var z,y
z=this.b
y=this.c
z.aq(y,"<subject> kick<s> {at|towards} <object's> feet",this.a.b)
z.at(y,"<subject> mi<sses>",!0)}},lc:{"^":"a:1;a,b,c",
$0:function(){var z,y
z=this.c
y=this.a.b
this.b.aq(z,"<subject> kick<s> <object's> shin",y)
y.at(z,"<subject> <does>n't budge",!0)}},ld:{"^":"a:1;a,b,c",
$0:function(){this.b.kv(this.c,"<subject> kick<s> <object> off <object's> feet and to the ground",!0,this.a.b,!0)}},le:{"^":"a:1;a,b,c,d",
$0:function(){var z,y
z=this.c
y=this.a.b
this.b.bv(z,"<subject> kick<s> <object's> {right|left} shin",y,!0)
y.ah(z,"<subject> {grunt|shriek}<s>")
y.ba(z,"<subject> fall<s> to the "+H.b(this.d),!0)}},lf:{"^":"a:0;",
$1:function(a){a.sam(C.i)
return a}}}],["","",,F,{"^":"",lP:{"^":"a7;O:b<,P:c<,a3:d<,U:e<,R:f<,a",
gY:function(){return"Stand off."},
gh:function(){return"Pass"},
V:[function(a,b,c){throw H.c(new P.ad(null))},"$3","gS",6,0,2],
W:[function(a,b,c){if(a.gH()===!0)a.ah(c,"<subject> stand<s> off")
return H.b(a.gh())+" passes the opportunity"},"$3","gT",6,0,2],
ak:function(a,b){return"WARNING this shouldn't be user-visible"},
N:function(a,b){return 1},
M:function(a,b){return!0}}}],["","",,Y,{"^":"",m2:{"^":"I;U:c<,R:d<,P:e<,a3:f<,O:r<,b,a",
gaj:function(){return"force <object> off balance"},
gh:function(){return"Pound"},
gan:function(){return"will <subject> force <object> off balance?"},
V:[function(a,b,c){var z=this.b
a.h9(c,"<subject> {fiercely|violently} {pound<s>|strike<s>|hammer<s>|batter<s>} on <object-owner's> {<object>|weapon}",z.gJ(),z)
z.bU(c,"<subject> {retain<s>|keep<s>} <subject's> {|combat} {stance|footing}",!0)
return H.b(a.gh())+" kicks "+H.b(z.cy)+" off balance"},"$3","gS",6,0,2],
W:[function(a,b,c){var z=this.b
a.h9(c,"<subject> {fiercely|violently} {pound<s>|strike<s>|hammer<s>|batter<s>} on <object-owner's> {<object>|weapon}",z.gJ(),z)
if(z.gac()){z.h8(c,"<subject> lose<s> <object>",!0,$.$get$eg())
b.a5(z.x,new Y.m3())
C.a.q(b.f,U.lz(z,a))
return H.b(a.gh())+" pounds "+H.b(z.cy)+" off balance"}else if(z.gb_()){z.ah(c,"<subject> <is> already off balance")
c.fu(0,"<subject> make<s> <object> fall to the "+H.b(b.ai("FightSituation").gbo()),z,$.$get$i4())
b.a5(z.x,new Y.m4())
return H.b(a.gh())+" pounds "+H.b(z.cy)+" to the ground"}throw H.c(new P.D("enemy pose must be either standing or off-balance"))},"$3","gT",6,0,2],
N:function(a,b){var z=a.gac()?0:0.2
if(a.Q===!0)return 0.7-z
return 0.5-z},
M:function(a,b){var z,y
if(!a.gae()){z=a.d
if(z.gb8()||z.gjV()){z=this.b
if(!z.gJ().gcz()){z.gJ().gfA()
y=!1}else y=!0
z=y&&!z.gae()}else z=!1}else z=!1
return z},
w:{
uT:[function(a){return new Y.m2(!0,C.c,!0,!0,"Forcing enemies off balance often means hitting them heavily several times in a row. The goal is not to deal damage but to force the opponent to lose control of their combat stance. It can also give members of your party an opportunity to strike.",a,null)},"$1","tp",2,0,5]}},m3:{"^":"a:0;",
$1:function(a){a.sam(C.h)
return a}},m4:{"^":"a:0;",
$1:function(a){a.sam(C.i)
return a}}}],["","",,B,{"^":"",mq:{"^":"a7;O:b<,P:c<,a3:d<,U:e<,R:f<,a",
gY:function(){return"Regain balance."},
gh:function(){return"RegainBalance"},
V:[function(a,b,c){throw H.c(new P.ad(null))},"$3","gS",6,0,2],
W:[function(a,b,c){if(a.gH()===!0)a.bv(c,"<subject> regain<s> <object>",$.$get$eg(),!0)
b.a5(a.gj(),new B.mr())
return H.b(a.gh())+" regains balance"},"$3","gT",6,0,2],
ak:function(a,b){return"Will "+a.ga4().a+" regain balance?"},
N:function(a,b){return 1},
M:function(a,b){return a.gb_()}},mr:{"^":"a:0;",
$1:function(a){a.sam(C.k)
return C.k}}}],["","",,O,{"^":"",mF:{"^":"a7;O:b<,P:c<,a3:d<,U:e<,R:f<,a",
gY:function(){return"Scramble."},
gh:function(){return"Scramble"},
V:[function(a,b,c){throw H.c(new P.ad(null))},"$3","gS",6,0,2],
W:[function(a,b,c){a.ah(c,"<subject> tr<ies> to {scramble|crawl} out of {reach|harm's way}")
return H.b(a.gh())+" scrambles on ground"},"$3","gT",6,0,2],
ak:function(a,b){return"Will "+a.ga4().a+" crawl out of harm's way?"},
N:function(a,b){return 1},
M:function(a,b){if(!a.gae())return!1
if(Q.i5(a,b))return!0
return!1}}}],["","",,Q,{"^":"",
i5:function(a,b){var z,y,x
z=b.cc("KickToGround",a,!0)
if(z!=null&&z<=2)return!0
y=b.cc("Pound",a,!0)
if(y!=null&&y<=2)return!0
x=b.cc("FinishPunch",a,!0)
if(x!=null&&x<=2)return!0
return!1},
np:{"^":"a7;O:b<,P:c<,a3:d<,U:e<,R:f<,a",
gY:function(){return"Stand up."},
gh:function(){return"StandUp"},
V:[function(a,b,c){throw H.c(new P.ad(null))},"$3","gS",6,0,2],
W:[function(a,b,c){a.ah(c,"<subject> stand<s> up")
b.a5(a.gj(),new Q.nq())
return H.b(a.gh())+" stands up"},"$3","gT",6,0,2],
ak:function(a,b){return"Will "+a.ga4().a+" stand up?"},
N:function(a,b){return 1},
M:function(a,b){if(!a.gae())return!1
if(Q.i5(a,b))return!1
return!0}},
nq:{"^":"a:0;",
$1:function(a){a.sam(C.k)
return C.k}}}],["","",,T,{"^":"",
vh:[function(a){return new A.ap(T.ep(),null,null,new T.tx(),new T.ty(),new T.tz(),null,!0,"This move is hard, but when succesful, it's decisive.",!0,!0,"StartBreakNeckOnGround",!1,null,"break <object's> neck",null,a,null)},"$1","ud",2,0,5],
vi:[function(a){return new A.ap(T.ep(),new T.tA(),T.ep(),new T.tB(),new T.tC(),new T.tD(),new T.tE(),!0,"This move is hard, but when succesful, it's decisive.",!0,!0,"StartBreakNeckOnGroundPlayer",!0,C.c,"break <object's> neck","will <subject> succeed?",a,null)},"$1","ue",2,0,5],
vj:[function(a,b,c,d,e){a.aq(c,"<subject> throw<s> <subjectPronounSelf> {on|upon} <object>",d)
b.a5(a.gj(),new T.tF())},"$5","ep",10,0,10],
tx:{"^":"a:3;",
$3:function(a,b,c){return a.gH()!==!0&&c.gae()&&a.gb7()&&c.gb7()}},
ty:{"^":"a:3;",
$3:function(a,b,c){return Y.eH(a,c)}},
tz:{"^":"a:3;",
$3:function(a,b,c){return S.dE(a,c,C.m)}},
tB:{"^":"a:3;",
$3:function(a,b,c){return a.gH()===!0&&c.gae()&&a.gb7()&&c.gb7()}},
tC:{"^":"a:3;",
$3:function(a,b,c){return Y.eH(a,c)}},
tD:{"^":"a:3;",
$3:function(a,b,c){return S.dE(a,c,C.n)}},
tA:{"^":"a:3;",
$3:function(a,b,c){return 0.7}},
tE:{"^":"a:3;",
$3:function(a,b,c){return S.dE(a,c,C.q)}},
tF:{"^":"a:0;",
$1:function(a){a.sam(C.i)
return a}}}],["","",,A,{"^":"",ap:{"^":"I;c,d,e,f,r,x,y,z,O:Q<,P:ch<,a3:cx<,h:cy<,U:db<,R:dx<,aj:dy<,an:fr<,b,a",
V:[function(a,b,c){var z,y,x,w
z=this.b
y=this.e
if(this.z){x=this.r.$3(a,b,z)
w=this.y.$3(a,b,z)
y.$5(a,b,c,z,x)
y=b.f
C.a.q(y,x)
C.a.q(y,w)}else y.$5(a,b,c,z,null)
return H.b(a.gh())+" fails to start a "+this.cy+" (defensible situation) at "+H.b(z.gh())},"$3","gS",6,0,2],
W:[function(a,b,c){var z,y,x,w
z=this.b
y=this.r.$3(a,b,z)
x=this.x.$3(a,b,z)
this.c.$5(a,b,c,z,y)
w=b.f
C.a.q(w,y)
C.a.q(w,x)
return H.b(a.gh())+" starts a "+this.cy+" (defensible situation) at "+H.b(z.gh())},"$3","gT",6,0,2],
N:function(a,b){var z=this.d
if(z!=null)return z.$3(a,b,this.b)
return 1},
M:function(a,b){return this.f.$3(a,b,this.b)}}}],["","",,U,{"^":"",
vk:[function(a){return new A.ap(U.eq(),null,null,new U.tG(),new U.tH(),new U.tI(),null,!0,"Punching someone hard enough can cause them to lose their footing. And it hurts.",!0,!0,"StartPunch",!1,null,"punch <object>",null,a,null)},"$1","uf",2,0,5],
vl:[function(a){return new A.ap(U.eq(),new U.tJ(),U.eq(),new U.tK(),new U.tL(),new U.tM(),new U.tN(),!0,"Punching someone hard enough can cause them to lose their footing. And it hurts.",!0,!0,"StartPunchPlayer",!0,C.c,"punch <object>","will <subject> hit <objectPronoun>?",a,null)},"$1","ug",2,0,5],
vm:[function(a,b,c,d,e){c.iZ(0,"<subject> {thrust<s>|swing<s>} <subject's> fist at <object>",e.gj(),!0,d,a)},"$5","eq",10,0,10],
tG:{"^":"a:3;",
$3:function(a,b,c){var z
if(a.gH()!==!0)z=(a.gac()||a.dx===C.h)&&!c.gae()&&a.gb7()
else z=!1
return z}},
tH:{"^":"a:3;",
$3:function(a,b,c){return M.fn(a,c)}},
tI:{"^":"a:3;",
$3:function(a,b,c){return Z.dM(a,c,C.m)}},
tK:{"^":"a:3;",
$3:function(a,b,c){var z
if(a.gH()===!0)z=(a.gac()||a.dx===C.h)&&!c.gae()&&a.gb7()
else z=!1
return z}},
tL:{"^":"a:3;",
$3:function(a,b,c){return M.fn(a,c)}},
tM:{"^":"a:3;",
$3:function(a,b,c){return Z.dM(a,c,C.n)}},
tJ:{"^":"a:3;",
$3:function(a,b,c){return 0.7}},
tN:{"^":"a:3;",
$3:function(a,b,c){return Z.dM(a,c,C.q)}}}],["","",,G,{"^":"",
vn:[function(a){return new A.ap(G.er(),null,null,new G.tQ(),new G.tR(),new G.tS(),null,!0,"The basic swordfighting move is also often the most effective.",!0,!0,"StartSlash",!1,null,"swing at <object>",null,a,null)},"$1","uh",2,0,5],
vs:[function(a){return new A.ap(G.er(),new G.u0(),G.er(),new G.u1(),new G.u2(),new G.u3(),new G.u4(),!0,"The basic swordfighting move is also often the most effective.",!0,!0,"StartSlashPlayer",!0,C.c,"swing at <object>","will <subject> hit <objectPronoun>?",a,null)},"$1","ui",2,0,5],
vt:[function(a,b,c,d,e){return a.ha(c,"<subject> swing<s> {<subject's> "+H.b(a.gJ().gh())+" |}at <object>",e.gj(),!0,d)},"$5","er",10,0,10],
tQ:{"^":"a:3;",
$3:function(a,b,c){return a.gH()!==!0&&a.gac()&&!c.gae()&&a.d.gb8()}},
tR:{"^":"a:3;",
$3:function(a,b,c){return M.bC(a,c)}},
tS:{"^":"a:3;",
$3:function(a,b,c){return L.bg(a,c,C.m)}},
u1:{"^":"a:3;",
$3:function(a,b,c){return a.gH()===!0&&a.gac()&&!c.gae()&&a.d.gb8()}},
u2:{"^":"a:3;",
$3:function(a,b,c){return M.bC(a,c)}},
u3:{"^":"a:3;",
$3:function(a,b,c){return L.bg(a,c,C.n)}},
u0:{"^":"a:3;",
$3:function(a,b,c){return 0.7}},
u4:{"^":"a:3;",
$3:function(a,b,c){return L.bg(a,c,C.q)}}}],["","",,R,{"^":"",
vo:[function(a,b,c,d,e){return a.h8(c,"<subject> completely miss<es> <object> with <subject's> "+H.b(a.gJ().gh()),!0,d)},"$5","i8",10,0,13],
vp:[function(a){return new A.ap(R.i9(),new R.tT(),R.i8(),new R.tU(),new R.tV(),new R.tW(),null,!1,"It's always better to fight with your feet firmly on the ground. But sometimes, it's necessary to act quickly.",!0,!0,"StartSlashOutOfBalance",!1,null,"swing at <object> (while out of balance)",null,a,null)},"$1","uj",2,0,5],
vq:[function(a){return new A.ap(R.i9(),new R.tX(),R.i8(),new R.tY(),new R.tZ(),new R.u_(),null,!1,"It's always better to fight with your feet firmly on the ground. But sometimes, it's necessary to act quickly.",!0,!0,"StartSlashOutOfBalancePlayer",!1,null,"swing at <object> (while out of balance)",null,a,null)},"$1","uk",2,0,5],
vr:[function(a,b,c,d,e){return a.ha(c,"<subject> swing<s> {<subject's> "+H.b(a.gJ().gh())+" |}at <object>",e.gj(),!0,d)},"$5","i9",10,0,10],
tU:{"^":"a:3;",
$3:function(a,b,c){return a.gH()!==!0&&a.gb_()&&!c.gae()&&a.d.gb8()}},
tV:{"^":"a:3;",
$3:function(a,b,c){return M.bC(a,c)}},
tW:{"^":"a:3;",
$3:function(a,b,c){return L.bg(a,c,C.m)}},
tT:{"^":"a:3;",
$3:function(a,b,c){return 0.7}},
tY:{"^":"a:3;",
$3:function(a,b,c){return a.gH()===!0&&a.gb_()&&!c.gae()&&a.d.gb8()}},
tZ:{"^":"a:3;",
$3:function(a,b,c){return M.bC(a,c)}},
u_:{"^":"a:3;",
$3:function(a,b,c){return L.bg(a,c,C.n)}},
tX:{"^":"a:3;",
$3:function(a,b,c){return 0.7}}}],["","",,D,{"^":"",
vu:[function(a){return new A.ap(D.es(),null,null,new D.u5(),new D.u6(),new D.u7(),null,!0,"Opponents on the ground are often the most vulnerable.",!0,!0,"StartStrikeDown",!1,null,"strike down at <object>",null,a,null)},"$1","ul",2,0,5],
vv:[function(a){return new A.ap(D.es(),new D.u8(),D.es(),new D.u9(),new D.ua(),new D.ub(),new D.uc(),!0,"Opponents on the ground are often the most vulnerable.",!0,!0,"StartStrikeDownPlayer",!0,C.c,"strike down at <object>","will <subject> hit?",a,null)},"$1","um",2,0,5],
vw:[function(a,b,c,d,e){return a.aq(c,"<subject> strike<s> down {with <subject's> "+H.b(a.gJ().gh())+" |}at <object>",d)},"$5","es",10,0,13],
u5:{"^":"a:3;",
$3:function(a,b,c){return a.gH()!==!0&&c.gae()&&!a.gae()&&a.d.gb8()}},
u6:{"^":"a:3;",
$3:function(a,b,c){return D.fK(a,c)}},
u7:{"^":"a:3;",
$3:function(a,b,c){return V.dC(a,c,C.m)}},
u9:{"^":"a:3;",
$3:function(a,b,c){return a.gH()===!0&&c.gae()&&!a.gae()&&a.d.gb8()}},
ua:{"^":"a:3;",
$3:function(a,b,c){return D.fK(a,c)}},
ub:{"^":"a:3;",
$3:function(a,b,c){return V.dC(a,c,C.n)}},
u8:{"^":"a:3;",
$3:function(a,b,c){return 0.7}},
uc:{"^":"a:3;",
$3:function(a,b,c){return V.dC(a,c,C.q)}}}],["","",,Y,{"^":"",o1:{"^":"cE;a3:c<,b,a",
gO:function(){return"A different weapon might change the battle."},
gP:function(){return!1},
gh:function(){return"TakeDroppedItem"},
gU:function(){return!1},
gR:function(){return},
V:[function(a,b,c){throw H.c(new P.ad(null))},"$3","gS",6,0,2],
W:[function(a,b,c){var z,y
z=b.f
y=z.length!==0?C.a.gE(z):null
b.cN(y.gj(),y.Z(new Y.o2(this)))
b.a5(a.gj(),new Y.o3(this,a))
z=this.b
a.aq(c,"<subject> pick<s> <object> up",z)
return H.b(a.gh())+" picks up "+H.b(z.gh())},"$3","gT",6,0,2],
ak:function(a,b){return H.f(new P.ad(null))},
N:function(a,b){return 1},
M:function(a,b){var z
a.gj8()
z=b.cc("DisarmKick",a,!0)
if(z!=null&&z<=2)return!1
return!0},
w:{
uX:[function(a){return new Y.o1(!0,a,null)},"$1","uq",2,0,46]}},o2:{"^":"a:23;a",
$1:function(a){a.gbC().a8(0,this.a.b)
return a}},o3:{"^":"a:0;a,b",
$1:function(a){if(!this.b.gb7())a.gbT().q(0,a.gJ())
a.sJ(this.a.b)
return a}}}],["","",,M,{"^":"",ov:{"^":"a7;O:b<,U:c<,R:d<,P:e<,a3:f<,a",
gY:function(){return"Regain clarity."},
gh:function(){return"Unconfuse"},
V:[function(a,b,c){throw H.c(new P.ad(null))},"$3","gS",6,0,2],
W:[function(a,b,c){a.ah(c,"<subject> shake<s> <subject's> head violently")
if(a.gH()===!0)c.q(0,"the {horrible|terrible} spell seems to recede")
a.kt(c,"<subject's> eyes regain focus and clarity",!0,!0)
return H.b(a.gh())+" regains clarity"},"$3","gT",6,0,2],
ak:function(a,b){return"WARNING this shouldn't be user-visible"},
N:function(a,b){return 1},
M:function(a,b){var z
if(a.ew(b)){z=b.cc("Confuse",a,!0)
if(typeof z!=="number")return z.bp()
z=z>4}else z=!1
return z}}}],["","",,R,{"^":"",kE:{"^":"I;O:c<,P:d<,a3:e<,U:f<,R:r<,b,a",
gh:function(){return"FinishBreakNeck"},
gaj:function(){return""},
gan:function(){return"(WARNING should not be user-visible)"},
V:[function(a,b,c){throw H.c(new P.ad(null))},"$3","gS",6,0,2],
W:[function(a,b,c){var z=this.b
b.a5(z.gj(),new R.kF())
a.bv(c,"<subject> break<s> <object's> neck",z,!0)
X.d7(c,b,z)
return H.b(a.gh())+" breaks "+H.b(z.gh())+"'s neck on ground"},"$3","gT",6,0,2],
N:function(a,b){return 1},
M:function(a,b){return!0},
w:{
uG:[function(a){return new R.kE(null,!0,!0,!0,C.c,a,null)},"$1","rV",2,0,5]}},kF:{"^":"a:0;",
$1:function(a){a.sav(0)
return a}}}],["","",,Y,{"^":"",
eH:function(a,b){var z=new Y.dd(null,null,null,null,null)
new Y.rp(a,b).$1(z)
return z.p()},
eG:{"^":"a1;",
gaM:function(){return[R.rV()]},
gh:function(){return"BreakNeckOnGroundSituation"},
as:function(){var z=new Y.dd(null,null,null,null,null)
z.m(this)
new Y.jf().$1(z)
return z.p()},
aA:function(a,b){if(a===0)return b.a_(this.a)
return},
aI:function(a,b){return new H.K(a,new Y.jg(this),[H.m(a,0)])}},
rp:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a2().af(1073741823)
a.gaS().c=z
a.gaS().e=0
z=this.a.gj()
a.gaS().b=z
z=this.b.gj()
a.gaS().d=z
return a}},
jf:{"^":"a:0;",
$1:function(a){var z=a.gaS().e
if(typeof z!=="number")return z.a6()
a.gaS().e=z+1
return a}},
jg:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.h(a.gj(),z.a)||J.h(a.gj(),z.c)}},
oJ:{"^":"eG;a,j:b<,c,I:d<",
Z:function(a){var z=new Y.dd(null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof Y.eG))return!1
if(J.h(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y)if(J.h(this.c,b.c)){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1}else z=!1
return z},
gv:function(a){return Y.R(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
k:function(a){return"BreakNeckOnGroundSituation {attacker="+H.b(J.i(this.a))+",\nid="+J.i(this.b)+",\ntarget="+H.b(J.i(this.c))+",\ntime="+J.i(this.d)+",\n}"}},
dd:{"^":"d;a,b,c,d,e",
gj:function(){return this.gaS().c},
gI:function(){return this.gaS().e},
gaS:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
m:function(a){this.a=a},
p:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gaS().b
x=this.gaS().c
w=this.gaS().d
v=this.gaS().e
z=new Y.oJ(y,x,w,v)
if(y==null)H.f(P.l("attacker"))
if(x==null)H.f(P.l("id"))
if(w==null)H.f(P.l("target"))
if(v==null)H.f(P.l("time"))}this.m(z)
return z}}}],["","",,Z,{"^":"",kn:{"^":"I;O:c<,P:d<,a3:e<,U:f<,R:r<,b,a",
gaj:function(){return"evade"},
gh:function(){return"EvadeNeckBreaking"},
gan:function(){return"will <subject> evade?"},
V:[function(a,b,c){a.ah(c,"<subject> tr<ies> to evade")
S.aA(new Z.ko(a,c),new Z.kp(this,a,c),null,null)
b.b0()
return H.b(a.gh())+" fails to dodge "+H.b(this.b.gh())},"$3","gS",6,0,2],
W:[function(a,b,c){var z=this.b
a.bv(c,"<subject> {dodge<s>|evade<s>} it",z,!0)
b.bG("FightSituation")
return H.b(a.gh())+" evades "+H.b(z.gh())},"$3","gT",6,0,2],
N:function(a,b){var z
if(a.gH()===!0)return 0.6
z=b.f
return(z.length!==0?C.a.gE(z):null).gbH().bF(0.5)},
M:function(a,b){return!0},
w:{
uF:[function(a){return new Z.kn("This looks dangerous. Trying to evade this close-quarter move seems prudent.",!1,!1,!0,C.c,a,null)},"$1","rS",2,0,5]}},ko:{"^":"a:1;a,b",
$0:function(){return this.a.at(this.b,"<subject> {can't|fail<s>}",!0)}},kp:{"^":"a:1;a,b,c",
$0:function(){return this.a.b.cO(this.c,"<subject> <is> too quick for <object>",!0,this.b)}}}],["","",,S,{"^":"",
dE:function(a,b,c){var z=new S.dD(null,null,null,null,null,null)
new S.ro(a,b,c).$1(z)
return z.p()},
fd:{"^":"cz;",
gaM:function(){return[Z.rS()]},
gh:function(){return"OnGroundWrestleDefenseSituation"},
as:function(){var z=new S.dD(null,null,null,null,null,null)
z.m(this)
new S.lJ().$1(z)
return z.p()}},
ro:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$a2().af(1073741823)
a.gaF().c=z
a.gaF().f=0
z=this.a.gj()
a.gaF().b=z
z=this.b.gj()
a.gaF().e=z
a.gaF().d=this.c
return a}},
lJ:{"^":"a:0;",
$1:function(a){var z=a.gaF().f
if(typeof z!=="number")return z.a6()
a.gaF().f=z+1
return a}},
oQ:{"^":"fd;dh:a<,j:b<,cL:c<,cQ:d<,I:e<",
Z:function(a){var z=new S.dD(null,null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof S.fd))return!1
if(J.h(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
if(z==null?y==null:z===y)if(J.h(this.d,b.d)){z=this.e
y=b.e
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1}else z=!1}else z=!1
return z},
gv:function(a){return Y.R(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)))},
k:function(a){return"OnGroundWrestleDefenseSituation {attacker="+H.b(J.i(this.a))+",\nid="+J.i(this.b)+",\npredeterminedResult="+J.i(this.c)+",\ntarget="+H.b(J.i(this.d))+",\ntime="+J.i(this.e)+",\n}"}},
dD:{"^":"d;a,b,c,d,e,f",
gj:function(){return this.gaF().c},
gI:function(){return this.gaF().f},
gaF:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.f=z.e
this.a=null}return this},
m:function(a){this.a=a},
p:function(){var z,y,x,w,v,u
z=this.a
if(z==null){y=this.gaF().b
x=this.gaF().c
w=this.gaF().d
v=this.gaF().e
u=this.gaF().f
z=new S.oQ(y,x,w,v,u)
if(y==null)H.f(P.l("attacker"))
if(x==null)H.f(P.l("id"))
if(w==null)H.f(P.l("predeterminedResult"))
if(v==null)H.f(P.l("target"))
if(u==null)H.f(P.l("time"))}this.m(z)
return z}}}],["","",,G,{"^":"",
v6:[function(a,b,c,d,e){a.ah(c,"<subject> tr<ies> to swing back")
a.eD(c,"<subject> {go<es> wide|miss<es>}",!0,!0)
if(a.gac()){b.a5(a.x,new G.rB())
a.cb(c,"<subject> lose<s> balance because of that",!0,!0)}else if(a.dx===C.h){b.a5(a.x,new G.rC())
a.ba(c,"<subject> lose<s> balance because of that",!0)
a.cb(c,"<subject> fall<s> to the ground",!0,!0)}},"$5","hF",10,0,13],
v7:[function(a){return new A.ap(G.hG(),new G.rD(),G.hF(),new G.rE(),new G.rF(),new G.rG(),null,!1,"You can deal serious damage when countering because your opponent is often caught off guard. On the other hand, counters require fast reaction and could throw you out of balance.",!0,!0,"CounterSlash",!1,null,"swing back at <object>",null,a,null)},"$1","rL",2,0,5],
v9:[function(a,b,c,d,e){return a.aq(c,"<subject> swing<s> back",d)},"$5","hG",10,0,10],
v8:[function(a){return new A.ap(G.hG(),new G.rH(),G.hF(),new G.rI(),new G.rJ(),new G.rK(),null,!1,"You can deal serious damage when countering because your opponent is often caught off guard. On the other hand, counters require fast reaction and could throw you out of balance.",!0,!0,"CounterSlashPlayer",!0,C.c,"swing back at <object>","will <subject> hit <objectPronoun>?",a,null)},"$1","rM",2,0,5],
rB:{"^":"a:0;",
$1:function(a){a.sam(C.h)
return a}},
rC:{"^":"a:0;",
$1:function(a){a.sam(C.i)
return a}},
rE:{"^":"a:3;",
$3:function(a,b,c){return a.gH()!==!0&&a.gJ().gb8()&&!a.gae()}},
rF:{"^":"a:3;",
$3:function(a,b,c){return M.bC(a,c)}},
rG:{"^":"a:3;",
$3:function(a,b,c){return L.bg(a,c,C.m)}},
rD:{"^":"a:3;",
$3:function(a,b,c){return c.gac()?0.7:0.9}},
rI:{"^":"a:3;",
$3:function(a,b,c){return a.gH()===!0&&a.gJ().gb8()&&!a.gae()}},
rJ:{"^":"a:3;",
$3:function(a,b,c){return M.bC(a,c)}},
rK:{"^":"a:3;",
$3:function(a,b,c){return L.bg(a,c,C.n)}},
rH:{"^":"a:3;",
$3:function(a,b,c){return c.gac()?0.7:0.9}}}],["","",,V,{"^":"",jA:{"^":"I;O:c<,P:d<,a3:e<,U:f<,R:r<,b,a",
gaj:function(){return"tackle <object>"},
gh:function(){return"CounterTackle"},
gan:function(){return"will <subject> tackle <objectPronoun>?"},
V:[function(a,b,c){var z=this.b
a.aq(c,"<subject> tr<ies> to tackle <object>",z)
S.aA(new V.jB(a,c),new V.jC(this,c),null,null)
a.aq(c,"<subject> land<s> on the "+H.b(b.ai("FightSituation").gbo())+" next to <object>",z)
b.a5(a.gj(),new V.jD())
return H.b(a.gh())+" fails to tackle "+H.b(z.gh())},"$3","gS",6,0,2],
W:[function(a,b,c){var z=this.b
a.aq(c,"<subject> tackle<s> <object> to the ground",z)
b.a5(z.gj(),new V.jE())
b.a5(a.gj(),new V.jF())
return H.b(a.gh())+" tackles "+H.b(z.gh())},"$3","gT",6,0,2],
N:function(a,b){var z=this.b.gb_()?0.2:0
if(a.gH()===!0)return 0.7+z
return 0.5+z},
M:function(a,b){return!a.gae()&&a.d instanceof K.bX},
w:{
uA:[function(a){return new V.jA("When an opponent misses you like that, it's a rare (though still dangerous) opportunity to bring them down.",!0,!0,!0,C.c,a,null)},"$1","rN",2,0,5]}},jB:{"^":"a:1;a,b",
$0:function(){return this.a.at(this.b,"<subject> go<es> wide",!0)}},jC:{"^":"a:1;a,b",
$0:function(){return this.a.b.at(this.b,"<subject> {evade<s>|sidestep<s>} it",!0)}},jD:{"^":"a:0;",
$1:function(a){a.sam(C.i)
return a}},jE:{"^":"a:0;",
$1:function(a){a.sam(C.i)
return a}},jF:{"^":"a:0;",
$1:function(a){a.sam(C.i)
return a}}}],["","",,S,{"^":"",
eO:function(a,b){var z=new S.dg(null,null,null,null,null)
new S.rh(a,b).$1(z)
return z.p()},
eN:{"^":"a1;",
gaM:function(){return[G.rL(),G.rM(),V.rN()]},
gbe:function(){return[$.$get$dG()]},
gh:function(){return"CounterAttackSituation"},
as:function(){var z=new S.dg(null,null,null,null,null)
z.m(this)
new S.jy().$1(z)
return z.p()},
aA:function(a,b){if(a===0)return b.a_(this.a)
return},
aI:function(a,b){return new H.K(a,new S.jz(this),[H.m(a,0)])}},
rh:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a2().af(1073741823)
a.gaT().c=z
a.gaT().e=0
z=this.a.gj()
a.gaT().b=z
z=this.b.gj()
a.gaT().d=z
return a}},
jy:{"^":"a:0;",
$1:function(a){var z=a.gaT().e
if(typeof z!=="number")return z.a6()
a.gaT().e=z+1
return a}},
jz:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.h(a.gj(),z.a)||J.h(a.gj(),z.c)}},
oK:{"^":"eN;a,j:b<,c,I:d<",
Z:function(a){var z=new S.dg(null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof S.eN))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
if(z==null?y==null:z===y)if(J.h(this.c,b.c)){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1}else z=!1
return z},
gv:function(a){return Y.R(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
k:function(a){return"CounterAttackSituation {counterAttacker="+J.i(this.a)+",\nid="+J.i(this.b)+",\ntarget="+H.b(J.i(this.c))+",\ntime="+J.i(this.d)+",\n}"}},
dg:{"^":"d;a,b,c,d,e",
gj:function(){return this.gaT().c},
gI:function(){return this.gaT().e},
gaT:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
m:function(a){this.a=a},
p:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gaT().b
x=this.gaT().c
w=this.gaT().d
v=this.gaT().e
z=new S.oK(y,x,w,v)
if(y==null)H.f(P.l("counterAttacker"))
if(x==null)H.f(P.l("id"))
if(w==null)H.f(P.l("target"))
if(v==null)H.f(P.l("time"))}this.m(z)
return z}}}],["","",,X,{"^":"",
d7:function(a,b,c){var z,y
z=b.ai("FightSituation")
y=z.gbo()
b.cN(z.gj(),z.Z(new X.tk(c)))
if(c.gam()===C.i){c.ba(a,"<subject> stop<s> moving",!0)
a.G(0,"\n\n",!0)
return}switch($.$get$hr().af(3)){case 0:c.cb(a,"<subject> collapse<s>, dead",!0,!0)
break
case 1:c.ba(a,"<subject> fall<s> backward",!0)
c.ba(a,"<subject> twist<s>",!0)
c.cb(a,"<subject> hit<s> the "+H.b(y)+" face down",!0,!0)
break
case 2:c.ba(a,"<subject> drop<s> to <subject's> knees",!0)
c.ba(a,"<subject> keel<s> over",!0)
break}a.G(0,"\n\n",!0)},
tk:{"^":"a:0;a",
$1:function(a){var z=this.a
if(!z.gb7())a.gbC().q(0,z.d)
return a}}}],["","",,O,{"^":"",cz:{"^":"n7;",
aA:function(a,b){if(a===0)return b.a_(this.gcQ())
return},
aI:function(a,b){return new H.K(a,new O.jK(this),[H.m(a,0)])}},n7:{"^":"a1+m5;"},jK:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.h(a.gj(),z.gdh())||J.h(a.gj(),z.gcQ())}}}],["","",,U,{"^":"",
dk:function(a,b,c,d,e){var z=new U.bW(null,null,null,null,null,null,null,null,null)
new U.qH(a,b,c,d,e).$1(z)
return z.p()},
cC:{"^":"a1;",
gaM:function(){return[N.ry(),V.rP(),R.tj(),Y.tp(),T.ud(),T.ue(),U.uf(),U.ug(),G.uh(),G.ui(),D.ul(),D.um(),R.uj(),R.uk(),Y.uq()]},
gbe:function(){return H.r([$.$get$fq(),$.$get$fH(),$.$get$fu(),$.$get$h7()],[Q.a7])},
gfW:function(){return 1000},
gh:function(){return"FightSituation"},
cw:function(a,b){var z=b.a
return(z&&C.a).bO(z,new U.kr(a))},
as:function(){var z=new U.bW(null,null,null,null,null,null,null,null,null)
z.m(this)
new U.ks().$1(z)
return z.p()},
aA:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j
z=X.hA(this.f,this.b)
y=H.bv(z,new U.kt(b),H.x(z,"y",0),null)
x=H.x(y,"y",0)
w=P.T(new H.K(y,new U.ku(),[x]),!1,x)
x=H.m(w,0)
v=P.T(new H.K(w,new U.kv(),[x]),!1,x)
u=v.length===1?C.a.gc1(v):null
if(a===0)if(u!=null)return u
for(y=w.length,t=0,s=null,r=0;r<w.length;w.length===y||(0,H.al)(w),++r){q=w[r]
x=b.d
p=x.b6(0,new U.kw(q),new U.kx())
o=p==null?p:p.gI()
if(o==null)o=-1
n=b.r
if(typeof o!=="number")return H.v(o)
m=n-o
if(m<=0)continue
l=x.b6(0,new U.ky(q),new U.kz())
k=l==null?l:l.gI()
if(k==null)k=-1
x=b.r
if(typeof k!=="number")return H.v(k)
j=(x-k+m)/2
if(q.gH()===!0)j*=1.5
if(j>t){s=q
t=j}}return s},
aI:function(a,b){return new H.K(a,new U.kA(this),[H.m(a,0)])},
h0:function(a,b){var z,y
z=this.x
y=this.c.a
if(y.a2(z))y.i(0,z).$2(a,b)},
dr:function(a){var z,y,x,w,v,u,t
z=this.r
if(z!=null&&!this.cw(a,this.b)&&this.cw(a,this.f)){y=a.eM(z)
a.cN(y.gj(),y.Z(new U.kB()))
for(z=this.f,x=z.a,x=new J.b7(x,x.length,0,null,[H.m(x,0)]),w=a.a;x.t();){v=x.d
if(a.a_(v).gaO()){u=a.a_(v)
t=u.Z(new U.kC())
w.a8(0,u)
w.q(0,t)}}C.a.q(a.f,X.lq(z,this.d,this.a,null))}else this.cw(a,this.f)},
d0:function(a){var z=this.f
if(this.cw(a,z))if(this.cw(a,this.b)){z=z.a
z=(z&&C.a).bO(z,new U.kD(a))}else z=!1
else z=!1
return z}},
qH:{"^":"a:0;a,b,c,d,e",
$1:function(a){var z,y
z=$.$get$a2().af(1073741823)
a.gad().f=z
a.gad().y=0
z=a.gad()
y=z.r
if(y==null){y=new S.M(null,null,[P.u])
y.aa()
y.m(C.e)
z.r=y
z=y}else z=y
z.m(J.ey(this.a,new U.qi()))
z=a.gad()
y=z.c
if(y==null){y=new S.M(null,null,[P.u])
y.aa()
y.m(C.e)
z.c=y
z=y}else z=y
y=this.b
z.m(new H.aj(y,new U.qj(),[H.m(y,0),null]))
a.gad().e=this.c
y=new S.M(null,null,[U.an])
y.aa()
y.m(C.e)
a.gad().b=y
y=this.d.gj()
a.gad().x=y
y=new A.cH(null,null,[P.u,{func:1,v:true,args:[A.a5,Y.X]}])
y.c4()
y.m(this.e)
a.gad().d=y
return a}},
qi:{"^":"a:0;",
$1:function(a){return a.gj()}},
qj:{"^":"a:0;",
$1:function(a){return a.gj()}},
kr:{"^":"a:0;a",
$1:function(a){return this.a.a_(a).gaO()}},
ks:{"^":"a:0;",
$1:function(a){var z=a.gad().y
if(typeof z!=="number")return z.a6()
a.gad().y=z+1
return a}},
kt:{"^":"a:0;a",
$1:function(a){return this.a.a_(a)}},
ku:{"^":"a:0;",
$1:function(a){return a.gaO()}},
kv:{"^":"a:0;",
$1:function(a){return a.gH()}},
kw:{"^":"a:0;a",
$1:function(a){return J.h(a.gdv(),this.a.gj())&&a.ghl()===!0}},
kx:{"^":"a:1;",
$0:function(){return}},
ky:{"^":"a:0;a",
$1:function(a){return J.h(a.gdv(),this.a.gj())}},
kz:{"^":"a:1;",
$0:function(){return}},
kA:{"^":"a:24;a",
$1:function(a){var z,y,x
if(a.gaO()){z=this.a
y=a.gj()
x=z.f.a
if(!(x&&C.a).a1(x,y)){y=a.gj()
z=z.b.a
y=(z&&C.a).a1(z,y)
z=y}else z=!0}else z=!1
return z}},
kB:{"^":"a:0;",
$1:function(a){a.skb(!1)
return a}},
kC:{"^":"a:0;",
$1:function(a){a.sam(C.k)
return a}},
kD:{"^":"a:29;a",
$1:function(a){var z=this.a.a_(a)
return z.gH()===!0&&z.gaO()}},
oM:{"^":"cC;bC:a<,b,c,bo:d<,j:e<,dt:f<,r,I:x<",
Z:function(a){var z=new U.bW(null,null,null,null,null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof U.cC))return!1
if(J.h(this.a,b.a))if(J.h(this.b,b.b))if(J.h(this.c,b.c)){z=this.d
y=b.d
if(z==null?y==null:z===y){z=this.e
y=b.e
if(z==null?y==null:z===y)if(J.h(this.f,b.f))if(J.h(this.r,b.r)){z=this.x
y=b.x
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1
else z=!1}else z=!1}else z=!1
else z=!1
else z=!1
return z},
gv:function(a){return Y.R(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)),J.j(this.f)),J.j(this.r)),J.j(this.x)))},
k:function(a){return"FightSituation {droppedItems="+J.i(this.a)+",\nenemyTeamIds="+J.i(this.b)+",\nevents="+J.i(this.c)+",\ngroundMaterial="+J.i(this.d)+",\nid="+J.i(this.e)+",\nplayerTeamIds="+J.i(this.f)+",\nroomRoamingSituationId="+H.b(J.i(this.r))+",\ntime="+J.i(this.x)+",\n}"}},
bW:{"^":"d;a,b,c,d,e,f,r,x,y",
gbC:function(){var z,y
z=this.gad()
y=z.b
if(y==null){y=new S.M(null,null,[U.an])
y.aa()
y.m(C.e)
z.b=y
z=y}else z=y
return z},
gbo:function(){return this.gad().e},
gj:function(){return this.gad().f},
gdt:function(){var z,y
z=this.gad()
y=z.r
if(y==null){y=new S.M(null,null,[P.u])
y.aa()
y.m(C.e)
z.r=y
z=y}else z=y
return z},
gI:function(){return this.gad().y},
gad:function(){var z,y
z=this.a
if(z!=null){z=z.a
if(!(z==null)){y=new S.M(null,null,[H.m(z,0)])
y.aa()
y.m(z)
z=y}this.b=z
z=this.a.b
if(!(z==null)){y=new S.M(null,null,[H.m(z,0)])
y.aa()
y.m(z)
z=y}this.c=z
z=this.a.c
if(!(z==null)){y=new A.cH(null,null,[H.m(z,0),H.m(z,1)])
y.c4()
y.m(z)
z=y}this.d=z
z=this.a
this.e=z.d
this.f=z.e
z=z.f
if(!(z==null)){y=new S.M(null,null,[H.m(z,0)])
y.aa()
y.m(z)
z=y}this.r=z
z=this.a
this.x=z.r
this.y=z.x
this.a=null}return this},
m:function(a){this.a=a},
p:function(){var z,y,x,w,v,u,t,s,r
z=this.a
if(z==null){y=this.gad()
x=y.b
if(x==null){x=new S.M(null,null,[U.an])
x.aa()
x.m(C.e)
y.b=x
y=x}else y=x
y=y.p()
x=this.gad()
w=x.c
if(w==null){w=new S.M(null,null,[P.u])
w.aa()
w.m(C.e)
x.c=w
x=w}else x=w
x=x.p()
w=this.gad()
v=w.d
if(v==null){v=new A.cH(null,null,[P.u,{func:1,v:true,args:[A.a5,Y.X]}])
v.c4()
v.m(C.X)
w.d=v
w=v}else w=v
w=w.p()
v=this.gad().e
u=this.gad().f
t=this.gad()
s=t.r
if(s==null){s=new S.M(null,null,[P.u])
s.aa()
s.m(C.e)
t.r=s
t=s}else t=s
t=t.p()
s=this.gad().x
r=this.gad().y
z=new U.oM(y,x,w,v,u,t,s,r)
if(y==null)H.f(P.l("droppedItems"))
if(x==null)H.f(P.l("enemyTeamIds"))
if(w==null)H.f(P.l("events"))
if(v==null)H.f(P.l("groundMaterial"))
if(u==null)H.f(P.l("id"))
if(t==null)H.f(P.l("playerTeamIds"))
if(s==null)H.f(P.l("roomRoamingSituationId"))
if(r==null)H.f(P.l("time"))}this.m(z)
return z}}}],["","",,Z,{"^":"",j4:{"^":"a7;P:b<,a3:c<,U:d<,R:e<,a",
gY:function(){return""},
gO:function(){return},
gh:function(){return"AutoLoot"},
V:[function(a,b,c){throw H.c(new P.ad(null))},"$3","gS",6,0,2],
W:[function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p
z=b.ai("LootSituation")
y=[]
for(x=z.gbC(),x=x.gX(x),w=b.a,v=null;x.t();){u=x.d
if(u instanceof L.bG){t=u.gcf()
s=u.gcS()
r=a.gJ().ga9()
if(typeof r!=="number")return H.v(r)
r=t+s>r
t=r}else t=!1
if(t){q=b.a_(a.gj())
p=q.Z(new Z.jc(a,u))
w.a8(0,q)
w.q(0,p)
v=u}else{q=b.a_(a.gj())
p=q.Z(new Z.jd(u))
w.a8(0,q)
w.q(0,p)
y.push(u)}}if(v!=null){a.aq(c,"<subject> pick<s> up <object>",v)
a.aq(c,"<subject> wield<s> <object>",v)}this.ia(y,a,z,b,c)
if(y.length!==0)c.j2("<subject> <also> take<s>",y,null,a)
return H.b(a.gh())+" auto-loots"},"$3","gT",6,0,2],
ak:function(a,b){return"WARNING this shouldn't be user-visible"},
N:function(a,b){return 1},
M:function(a,b){return a.gH()},
ia:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r
z=P.T(new H.K(a,new Z.j5(),[H.m(a,0)]),!0,L.bG)
y=b.gbT()
y.toString
C.a.ao(z,new H.K(y,new Z.j6(),[H.m(y,0)]))
if(z.length===0)return
C.a.cg(z,new Z.j7())
x=c.gdt().aP(0,new Z.j8(d)).dP(0,new Z.j9())
for(y=J.ah(x.a),w=new H.cV(y,x.b,[H.m(x,0)]),v=d.a;w.t();){u=y.gF()
if(z.length===0)break
t=C.a.kn(z)
s=d.a_(u.gj())
r=s.Z(new Z.ja(t))
v.a8(0,s)
v.q(0,r)
C.a.a8(a,t)
s=d.a_(b.gj())
r=s.Z(new Z.jb(t))
v.a8(0,s)
v.q(0,r)
b.aq(e,"<subject> give<s> the "+H.b(t.gh())+" to <object>",u)}}},jc:{"^":"a:0;a,b",
$1:function(a){var z=this.a
if(!(z.gJ() instanceof K.bX))a.gbT().q(0,z.gJ())
a.sJ(this.b)
return a}},jd:{"^":"a:0;a",
$1:function(a){a.gbT().q(0,this.a)
return a}},j5:{"^":"a:0;",
$1:function(a){return a instanceof L.bG}},j6:{"^":"a:0;",
$1:function(a){return a instanceof L.bG}},j7:{"^":"a:7;",
$2:function(a,b){return J.bS(a.ga9(),b.ga9())}},j8:{"^":"a:0;a",
$1:function(a){return this.a.a_(a)}},j9:{"^":"a:0;",
$1:function(a){return a.gaO()&&a.gb7()}},ja:{"^":"a:0;a",
$1:function(a){a.sJ(this.a)
return a}},jb:{"^":"a:0;a",
$1:function(a){a.gbT().a8(0,this.a)
return a}}}],["","",,X,{"^":"",
lq:function(a,b,c,d){var z=new X.dx(null,null,null,null,null,null)
new X.rf(a,b,c).$1(z)
return z.p()},
f8:{"^":"a1;",
gbe:function(){return H.r([$.$get$eD()],[Q.a7])},
gh:function(){return"LootSituation"},
as:function(){var z=new X.dx(null,null,null,null,null,null)
z.m(this)
new X.ls().$1(z)
return z.p()},
aA:function(a,b){if(typeof a!=="number")return a.bp()
if(a>0)return
return this.f8(b.a)},
aI:function(a,b){return[this.f8(a)]},
d0:function(a){return!0},
f8:function(a){return a.dl(0,new X.lr())}},
rf:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$a2().af(1073741823)
a.gar().e=z
a.gar().f=0
a.gar().c=this.b
z=new S.M(null,null,[P.u])
z.aa()
z.m(this.a)
a.gar().d=z
z=new S.M(null,null,[U.an])
z.aa()
z.m(this.c)
a.gar().b=z
return a}},
ls:{"^":"a:0;",
$1:function(a){var z=a.gar().f
if(typeof z!=="number")return z.a6()
a.gar().f=z+1
return a}},
lr:{"^":"a:0;",
$1:function(a){return a.gH()===!0&&a.gaO()}},
oN:{"^":"f8;bC:a<,bo:b<,dt:c<,j:d<,I:e<",
Z:function(a){var z=new X.dx(null,null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof X.f8))return!1
if(J.h(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y)if(J.h(this.c,b.c)){z=this.d
y=b.d
if(z==null?y==null:z===y){z=this.e
y=b.e
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1
else z=!1}else z=!1
return z},
gv:function(a){return Y.R(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)))},
k:function(a){return"LootSituation {droppedItems="+J.i(this.a)+",\ngroundMaterial="+J.i(this.b)+",\nplayerTeamIds="+J.i(this.c)+",\nid="+J.i(this.d)+",\ntime="+J.i(this.e)+",\n}"}},
dx:{"^":"d;a,b,c,d,e,f",
gbC:function(){var z,y
z=this.gar()
y=z.b
if(y==null){y=new S.M(null,null,[U.an])
y.aa()
y.m(C.e)
z.b=y
z=y}else z=y
return z},
gbo:function(){return this.gar().c},
gdt:function(){var z,y
z=this.gar()
y=z.d
if(y==null){y=new S.M(null,null,[P.u])
y.aa()
y.m(C.e)
z.d=y
z=y}else z=y
return z},
gj:function(){return this.gar().e},
gI:function(){return this.gar().f},
gar:function(){var z,y
z=this.a
if(z!=null){z=z.a
if(!(z==null)){y=new S.M(null,null,[H.m(z,0)])
y.aa()
y.m(z)
z=y}this.b=z
z=this.a
this.c=z.b
z=z.c
if(!(z==null)){y=new S.M(null,null,[H.m(z,0)])
y.aa()
y.m(z)
z=y}this.d=z
z=this.a
this.e=z.d
this.f=z.e
this.a=null}return this},
m:function(a){this.a=a},
p:function(){var z,y,x,w,v,u
z=this.a
if(z==null){y=this.gar()
x=y.b
if(x==null){x=new S.M(null,null,[U.an])
x.aa()
x.m(C.e)
y.b=x
y=x}else y=x
y=y.p()
x=this.gar().c
w=this.gar()
v=w.d
if(v==null){v=new S.M(null,null,[P.u])
v.aa()
v.m(C.e)
w.d=v
w=v}else w=v
w=w.p()
v=this.gar().e
u=this.gar().f
z=new X.oN(y,x,w,v,u)
if(y==null)H.f(P.l("droppedItems"))
if(x==null)H.f(P.l("groundMaterial"))
if(w==null)H.f(P.l("playerTeamIds"))
if(v==null)H.f(P.l("id"))
if(u==null)H.f(P.l("time"))}this.m(z)
return z}}}],["","",,A,{"^":"",lD:{"^":"I;O:c<,P:d<,a3:e<,U:f<,R:r<,b,a",
gh:function(){return"OffBalanceOpportunityThrust"},
gaj:function(){return"stab <object>"},
gan:function(){return"will <subject> hit <objectPronoun>?"},
V:[function(a,b,c){var z=this.b
a.aq(c,"<subject> tr<ies> to stab <object>",z)
a.at(c,"<subject> {go<es> wide|fail<s>|miss<es>}",!0)
return H.b(a.gh())+" fails to stab "+H.b(z.gh())},"$3","gS",6,0,2],
W:[function(a,b,c){var z=this.b
b.a5(z.gj(),new A.lE(a))
if(b.a_(z.gj()).gbu()){a.bv(c,"<subject> thrust<s> {|<subject's> "+H.b(a.gJ().gh())+"} deep into <object's> {shoulder|hip|thigh}",z,!0)
z.ba(c,"<subject> {scream|yell|grunt}<s> in pain",!0)}else{a.bv(c,"<subject> {stab<s>|run<s> <subject's> "+H.b(a.gJ().gh())+" through} <object>",z,!0)
X.d7(c,b,z)}return H.b(a.gh())+" stabs "+H.b(z.gh())},"$3","gT",6,0,2],
N:function(a,b){if(a.gH()===!0)return 0.6
return 0.5},
M:function(a,b){return a.gac()&&this.b.gb_()&&a.d.gfT()},
w:{
uO:[function(a){return new A.lD("When an opponent is out of balance they are the most vulnerable.",!0,!0,!0,C.c,a,null)},"$1","tm",2,0,5]}},lE:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gav()
y=this.a.gJ().gcS()
if(typeof z!=="number")return z.aw()
a.sav(z-y)
return a}}}],["","",,U,{"^":"",
lz:function(a,b){var z=new U.dA(null,null,null,null,null)
new U.rq(a,b).$1(z)
return z.p()},
fb:{"^":"a1;",
gaM:function(){return H.r([A.tm()],[{func:1,ret:Q.I,args:[R.G]}])},
gbe:function(){return[$.$get$dG()]},
gh:function(){return"OffBalanceOpportunitySituation"},
as:function(){var z=new U.dA(null,null,null,null,null)
z.m(this)
new U.lA().$1(z)
return z.p()},
aA:function(a,b){var z,y,x,w,v
if(typeof a!=="number")return a.bp()
if(a>0)return
z=b.a_(this.a)
y=b.a
x=H.m(y,0)
w=P.T(new H.K(y,new U.lB(this,b,z),[x]),!0,x)
if(w.length===0)return
v=C.a.geq(w)
if(v.gac()&&z.gb_()&&v.d.gfT())return v
return},
aI:function(a,b){return new H.K(a,new U.lC(b,b.a_(this.a)),[H.m(a,0)])}},
rq:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a2().af(1073741823)
a.gaU().d=z
a.gaU().e=0
z=this.a.gj()
a.gaU().b=z
z=this.b
z=z==null?z:z.gj()
a.gaU().c=z
return a}},
lA:{"^":"a:0;",
$1:function(a){var z=a.gaU().e
if(typeof z!=="number")return z.a6()
a.gaU().e=z+1
return a}},
lB:{"^":"a:24;a,b,c",
$1:function(a){var z,y
if(a.gaO())if(a.es(this.c,this.b)){z=a.x
y=this.a.b
y=z==null?y!=null:z!==y
z=y}else z=!1
else z=!1
return z}},
lC:{"^":"a:0;a,b",
$1:function(a){var z=this.b
return J.h(a,z)||a.es(z,this.a)}},
oO:{"^":"fb;a,b,j:c<,I:d<",
Z:function(a){var z=new U.dA(null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof U.fb))return!1
if(J.h(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
if(z==null?y==null:z===y){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1}else z=!1
return z},
gv:function(a){return Y.R(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
k:function(a){return"OffBalanceOpportunitySituation {actorId="+H.b(J.i(this.a))+",\nculpritId="+J.i(this.b)+",\nid="+J.i(this.c)+",\ntime="+J.i(this.d)+",\n}"}},
dA:{"^":"d;a,b,c,d,e",
gj:function(){return this.gaU().d},
gI:function(){return this.gaU().e},
gaU:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
m:function(a){this.a=a},
p:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gaU().b
x=this.gaU().c
w=this.gaU().d
v=this.gaU().e
z=new U.oO(y,x,w,v)
if(y==null)H.f(P.l("actorId"))
if(w==null)H.f(P.l("id"))
if(v==null)H.f(P.l("time"))}this.m(z)
return z}}}],["","",,O,{"^":"",kG:{"^":"I;O:c<,P:d<,a3:e<,U:f<,b,a",
gaj:function(){return""},
gh:function(){return"FinishPunch"},
gR:function(){return},
gan:function(){return"(WARNING should not be user-visible)"},
V:[function(a,b,c){throw H.c(new P.ad(null))},"$3","gS",6,0,2],
W:[function(a,b,c){var z,y,x,w
z=this.b
y=z.gac()?C.h:C.i
x=b.ai("PunchSituation").gj()
w=b.ai("FightSituation").gbo()
b.a5(z.x,new O.kH(y))
switch(y){case C.k:throw H.c(new P.D("Enemy's pose should never be 'standing' after a successful punch"))
case C.h:c.fv(0,"<subject> {punch<es> <object> in the {face|nose|eye|jaw}|punch<es> <object's> {face|nose|eye|jaw}}",x,z,!0,a)
z.ba(c,"<subject> {stagger<s>|stumble<s>} off balance",!0)
break
case C.i:c.fv(0,"<subject> send<s> <object> to the "+H.b(w)+" with a {massive punch|well-placed fist} to the {face|nose|eye|jaw}",x,z,!0,a)
break}return H.b(a.gh())+" punches "+H.b(z.cy)+" to "+y.k(0)},"$3","gT",6,0,2],
N:function(a,b){return 1},
M:function(a,b){return!0},
w:{
uH:[function(a){return new O.kG(null,!0,!0,!1,a,null)},"$1","rW",2,0,5]}},kH:{"^":"a:0;a",
$1:function(a){a.sam(this.a)
return a}}}],["","",,E,{"^":"",jW:{"^":"I;O:c<,P:d<,a3:e<,U:f<,R:r<,b,a",
gaj:function(){return"dodge"},
gh:function(){return"DodgePunch"},
gan:function(){return"will <subject> dodge the fist?"},
V:[function(a,b,c){var z=b.ai("PunchSituation").gj()
a.kr(c,"<subject> tr<ies> to {dodge|sidestep|move out of the way}",z,!0)
S.aA(new E.jX(a,c,z),new E.jY(this,a,c,z),null,null)
b.b0()
return H.b(a.gh())+" fails to dodge "+H.b(this.b.gh())},"$3","gS",6,0,2],
W:[function(a,b,c){var z=this.b
a.eE(c,"<subject> {dodge<s>|sidestep<s>} <object's> {punch|blow|jab}",b.ai("PunchSituation").gj(),z,!0)
b.bG("FightSituation")
return H.b(a.gh())+" dodges punch from "+H.b(z.gh())},"$3","gT",6,0,2],
N:function(a,b){var z,y
z=a.gac()?0:0.2
if(a.Q===!0)return 0.7-z
y=b.f
return(y.length!==0?C.a.gE(y):null).gbH().bF(0.4-z)},
M:function(a,b){return!0},
w:{
uD:[function(a){return new E.jW("Dodging means moving your body out of harm's way.",!1,!1,!0,C.c,a,null)},"$1","rQ",2,0,5]}},jX:{"^":"a:1;a,b,c",
$0:function(){return this.a.ku(this.b,"<subject> {can't|fail<s>|<does>n't succeed}",this.c,!0,!0)}},jY:{"^":"a:1;a,b,c,d",
$0:function(){return this.a.b.kw(this.c,"<subject> <is> too quick for <object>",this.d,!0,!0,this.b)}}}],["","",,Z,{"^":"",
dM:function(a,b,c){var z=new Z.dL(null,null,null,null,null,null)
new Z.rl(a,b,c).$1(z)
return z.p()},
fl:{"^":"cz;",
gaM:function(){return[E.rQ()]},
gh:function(){return"PunchDefenseSituation"},
as:function(){var z=new Z.dL(null,null,null,null,null,null)
z.m(this)
new Z.mf().$1(z)
return z.p()}},
rl:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$a2().af(1073741823)
a.gaD().c=z
a.gaD().f=0
z=this.a.gj()
a.gaD().b=z
z=this.b.gj()
a.gaD().e=z
a.gaD().d=this.c
return a}},
mf:{"^":"a:0;",
$1:function(a){var z=a.gaD().f
if(typeof z!=="number")return z.a6()
a.gaD().f=z+1
return a}},
oR:{"^":"fl;dh:a<,j:b<,cL:c<,cQ:d<,I:e<",
Z:function(a){var z=new Z.dL(null,null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof Z.fl))return!1
if(J.h(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
if(z==null?y==null:z===y)if(J.h(this.d,b.d)){z=this.e
y=b.e
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1}else z=!1}else z=!1
return z},
gv:function(a){return Y.R(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)))},
k:function(a){return"PunchDefenseSituation {attacker="+H.b(J.i(this.a))+",\nid="+J.i(this.b)+",\npredeterminedResult="+J.i(this.c)+",\ntarget="+H.b(J.i(this.d))+",\ntime="+J.i(this.e)+",\n}"}},
dL:{"^":"d;a,b,c,d,e,f",
gj:function(){return this.gaD().c},
gI:function(){return this.gaD().f},
gaD:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.f=z.e
this.a=null}return this},
m:function(a){this.a=a},
p:function(){var z,y,x,w,v,u
z=this.a
if(z==null){y=this.gaD().b
x=this.gaD().c
w=this.gaD().d
v=this.gaD().e
u=this.gaD().f
z=new Z.oR(y,x,w,v,u)
if(y==null)H.f(P.l("attacker"))
if(x==null)H.f(P.l("id"))
if(w==null)H.f(P.l("predeterminedResult"))
if(v==null)H.f(P.l("target"))
if(u==null)H.f(P.l("time"))}this.m(z)
return z}}}],["","",,M,{"^":"",
fn:function(a,b){var z=new M.dN(null,null,null,null,null)
new M.rn(a,b).$1(z)
return z.p()},
fm:{"^":"a1;",
gaM:function(){return[O.rW()]},
gh:function(){return"PunchSituation"},
as:function(){var z=new M.dN(null,null,null,null,null)
z.m(this)
new M.mg().$1(z)
return z.p()},
aA:function(a,b){if(a===0)return b.a_(this.a)
return},
aI:function(a,b){return new H.K(a,new M.mh(this),[H.m(a,0)])}},
rn:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a2().af(1073741823)
a.gaV().c=z
a.gaV().e=0
z=this.a.gj()
a.gaV().b=z
z=this.b.gj()
a.gaV().d=z
return a}},
mg:{"^":"a:0;",
$1:function(a){var z=a.gaV().e
if(typeof z!=="number")return z.a6()
a.gaV().e=z+1
return a}},
mh:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.h(a.gj(),z.a)||J.h(a.gj(),z.c)}},
oS:{"^":"fm;a,j:b<,c,I:d<",
Z:function(a){var z=new M.dN(null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof M.fm))return!1
if(J.h(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y)if(J.h(this.c,b.c)){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1}else z=!1
return z},
gv:function(a){return Y.R(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
k:function(a){return"PunchSituation {attacker="+H.b(J.i(this.a))+",\nid="+J.i(this.b)+",\ntarget="+H.b(J.i(this.c))+",\ntime="+J.i(this.d)+",\n}"}},
dN:{"^":"d;a,b,c,d,e",
gj:function(){return this.gaV().c},
gI:function(){return this.gaV().e},
gaV:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
m:function(a){this.a=a},
p:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gaV().b
x=this.gaV().c
w=this.gaV().d
v=this.gaV().e
z=new M.oS(y,x,w,v)
if(y==null)H.f(P.l("attacker"))
if(x==null)H.f(P.l("id"))
if(w==null)H.f(P.l("target"))
if(v==null)H.f(P.l("time"))}this.m(z)
return z}}}],["","",,O,{"^":"",kI:{"^":"I;O:c<,P:d<,a3:e<,U:f<,R:r<,b,a",
gh:function(){return"FinishSlash"},
gaj:function(){return""},
gan:function(){return"(WARNING should not be user-visible)"},
V:[function(a,b,c){throw H.c(new P.ad(null))},"$3","gS",6,0,2],
W:[function(a,b,c){var z,y,x,w
z=this.b
b.a5(z.gj(),new O.kL(a))
y=b.ai("SlashSituation").gj()
x=b.a_(z.gj()).gbu()
if(x){a.eE(c,"<subject> {slash<es>|cut<s>} <object's> {shoulder|abdomen|thigh}",y,z,!0)
z.ba(c,"<subject> {scream|yell|grunt}<s> in pain",!0)}else{a.eE(c,"<subject> {slash<es>|cut<s>} {across|through} <object's> {neck|abdomen|lower body}",y,z,!0)
X.d7(c,b,z)}w=H.b(a.gh())+" slashes"
return w+(!x?" (and kills)":"")+" "+H.b(z.gh())},"$3","gT",6,0,2],
N:function(a,b){return 1},
M:function(a,b){return a.gJ().gb8()},
w:{
uJ:[function(a){return new O.kI(null,!0,!0,!0,C.c,a,null)},"$1","rX",2,0,5]}},kL:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gav()
y=this.a.gJ().gcf()
if(typeof z!=="number")return z.aw()
a.sav(z-y)
return a}}}],["","",,X,{"^":"",jL:{"^":"I;O:c<,P:d<,a3:e<,U:f<,R:r<,b,a",
gh:function(){return"DefensiveParrySlash"},
gaj:function(){return"step back and parry"},
gan:function(){return"will <subject> parry it?"},
V:[function(a,b,c){a.ah(c,"<subject> tr<ies> to {parry|deflect it|meet it with <subject's> "+H.b(a.gJ().gh())+"|fend it off}")
if(a.gb_())a.at(c,"<subject> <is> out of balance",!0)
else S.aA(new X.jM(a,c),new X.jN(this,a,c),null,null)
b.b0()
return H.b(a.cy)+" fails to parry "+H.b(this.b.gh())},"$3","gS",6,0,2],
W:[function(a,b,c){if(a.gH()===!0)a.ah(c,"<subject> {step<s>|take<s> a step} back")
a.bU(c,"<subject> {parr<ies> it|deflect<s> it|meet<s> it with <subject's> "+H.b(a.gJ().gh())+"|fend<s> it off}",!0)
if(!a.gac()){b.a5(a.x,new X.jO())
if(a.Q===!0)a.ah(c,"<subject> regain<s> balance")}b.bG("FightSituation")
return H.b(a.cy)+" steps back and parries "+H.b(this.b.gh())},"$3","gT",6,0,2],
N:function(a,b){var z,y,x
if(a.gH()===!0)return 1
z=b.f
y=z.length!==0?C.a.gE(z):null
x=a.gac()?0:0.2
return y.gbH().bF(0.5-x)},
M:function(a,b){return a.gJ().gcz()},
w:{
uB:[function(a){return new X.jL("Stepping back is the safest way to get out of harm's way.",!1,!1,!0,C.c,a,null)},"$1","rO",2,0,5]}},jM:{"^":"a:1;a,b",
$0:function(){return this.a.at(this.b,"<subject> {fail<s>|<does>n't succeed}",!0)}},jN:{"^":"a:1;a,b,c",
$0:function(){return this.a.b.cO(this.c,"<subject> <is> too quick for <object>",!0,this.b)}},jO:{"^":"a:0;",
$1:function(a){a.sam(C.k)
return a}}}],["","",,F,{"^":"",jZ:{"^":"I;O:c<,P:d<,a3:e<,U:f<,R:r<,b,a",
gh:function(){return"DodgeSlash"},
gaj:function(){return"dodge and counter"},
gan:function(){return"will <subject> dodge?"},
V:[function(a,b,c){a.ah(c,"<subject> tr<ies> to {dodge|sidestep}")
if(a.gb_())a.at(c,"<subject> <is> out of balance",!0)
else S.aA(new F.k_(a,c),new F.k0(this,a,c),null,null)
b.b0()
return H.b(a.cy)+" fails to dodge "+H.b(this.b.gh())},"$3","gS",6,0,2],
W:[function(a,b,c){var z=this.b
a.bv(c,"<subject> {dodge<s>|sidestep<s>} it",z,!0)
if(z.gac()){z.cb(c,"<subject> lose<s> balance because of that",!0,!0)
b.a5(z.x,new F.k1())}b.bG("FightSituation")
if(a.gH()===!0)c.q(0,"this opens an opportunity for a counter attack")
C.a.q(b.f,S.eO(a,z))
return H.b(a.gh())+" dodges "+H.b(z.cy)},"$3","gT",6,0,2],
N:function(a,b){var z,y
z=a.gac()?0:0.2
if(a.Q===!0)return 0.7-z
y=b.f
return(y.length!==0?C.a.gE(y):null).gbH().bF(0.4-z)},
M:function(a,b){return!a.gae()},
w:{
uE:[function(a){return new F.jZ("Dodging means moving your body out of harm's way. When done correctly, it will throw your opponent off balance and it will open an opportunity for a counter attack. When botched, it can get you killed.",!1,!1,!0,C.c,a,null)},"$1","rR",2,0,5]}},k_:{"^":"a:1;a,b",
$0:function(){return this.a.at(this.b,"<subject> {can't|fail<s>|<does>n't succeed}",!0)}},k0:{"^":"a:1;a,b,c",
$0:function(){return this.a.b.cO(this.c,"<subject> <is> too quick for <object>",!0,this.b)}},k1:{"^":"a:0;",
$1:function(a){a.sam(C.h)
return C.h}}}],["","",,O,{"^":"",l9:{"^":"I;O:c<,P:d<,a3:e<,U:f<,R:r<,b,a",
gaj:function(){return"jump back"},
gh:function(){return"JumpBackFromSlash"},
gan:function(){return"will <subject> avoid the slash?"},
V:[function(a,b,c){a.h7(c,"<subject> {jump<s>|leap<s>} {back|backward} but <subject> <is> {not fast enough|too slow}.",!0)
b.b0()
return H.b(a.gh())+" fails to jump back from "+H.b(this.b.gh())},"$3","gS",6,0,2],
W:[function(a,b,c){var z
a.bU(c,"<subject> {leap<s>|jump<s>} {back|backwards|out of reach}",!0)
z=this.b
c.de(0,"<owner's> <subject> {slash<es>|cut<s>} empty air",z,z.gJ())
b.bG("FightSituation")
return H.b(a.gh())+" jumps back from "+H.b(z.gh())+"'s attack"},"$3","gT",6,0,2],
N:function(a,b){var z,y,x
if(a.gH()===!0)return 1
z=b.f
y=z.length!==0?C.a.gE(z):null
x=a.gac()?0:0.2
return y.gbH().bF(0.5-x)},
M:function(a,b){return a.gb7()},
w:{
uM:[function(a){return new O.l9("Jump back and the weapon can't reach you.",!1,!1,!0,C.c,a,null)},"$1","ti",2,0,5]}}}],["","",,G,{"^":"",lM:{"^":"I;O:c<,P:d<,a3:e<,U:f<,R:r<,b,a",
gh:function(){return"ParrySlash"},
gaj:function(){return"parry and counter"},
gan:function(){return"will <subject> parry?"},
V:[function(a,b,c){a.ah(c,"<subject> tr<ies> to {parry|deflect it|meet it with <subject's> "+H.b(a.gJ().gh())+"|fend it off}")
if(a.gb_())a.at(c,"<subject> <is> out of balance",!0)
else S.aA(new G.lN(a,c),new G.lO(this,a,c),null,null)
b.b0()
return H.b(a.cy)+" fails to parry "+H.b(this.b.gh())},"$3","gS",6,0,2],
W:[function(a,b,c){var z=this.b
if(z.gb_()){c.iX(0,"<subject> <is> out of balance",!0,!0,z)
c.de(0,"so <ownerPronoun's> <subject> is {weak|feeble}",z,$.$get$ic())
a.bU(c,"<subject> {parr<ies> it easily|easily meet<s> it with <subject's> "+H.b(a.gJ().gh())+"|fend<s> it off easily}",!0)}else a.bU(c,"<subject> {parr<ies> it|meet<s> it with <subject's> "+H.b(a.gJ().gh())+"|fend<s> it off}",!0)
b.bG("FightSituation")
if(a.gH()===!0)c.q(0,"this opens an opportunity for a counter attack")
C.a.q(b.f,S.eO(a,z))
return H.b(a.gh())+" parries "+H.b(z.cy)},"$3","gT",6,0,2],
N:function(a,b){var z,y,x
z=a.gac()?0:0.2
y=this.b.gb_()?0.3:0
if(a.Q===!0)return 0.6-z+y
x=b.f
return(x.length!==0?C.a.gE(x):null).gbH().bF(0.3-z+y)},
M:function(a,b){return a.gJ().gcz()},
w:{
uQ:[function(a){return new G.lM("Parrying means deflecting your opponent's move with your weapon. When successful, it will give you an opportunity for a counter attack. It won't throw your opponent off balance like dodging does, but it's also slightly easier to do.",!1,!1,!0,C.c,a,null)},"$1","to",2,0,5]}},lN:{"^":"a:1;a,b",
$0:function(){return this.a.at(this.b,"<subject> {fail<s>|<does>n't succeed}",!0)}},lO:{"^":"a:1;a,b,c",
$0:function(){return this.a.b.cO(this.c,"<subject> <is> too quick for <object>",!0,this.b)}}}],["","",,L,{"^":"",
bg:function(a,b,c){var z=new L.dR(null,null,null,null,null,null)
new L.rg(a,b,c).$1(z)
return z.p()},
fy:{"^":"cz;",
gaM:function(){return[F.rR(),G.to(),X.rO(),O.ti()]},
gh:function(){return"SlashDefenseSituation"},
as:function(){var z=new L.dR(null,null,null,null,null,null)
z.m(this)
new L.na().$1(z)
return z.p()}},
rg:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$a2().af(1073741823)
a.gaE().c=z
a.gaE().f=0
z=this.a.gj()
a.gaE().b=z
z=this.b.gj()
a.gaE().e=z
a.gaE().d=this.c
return a}},
na:{"^":"a:0;",
$1:function(a){var z=a.gaE().f
if(typeof z!=="number")return z.a6()
a.gaE().f=z+1
return a}},
oU:{"^":"fy;dh:a<,j:b<,cL:c<,cQ:d<,I:e<",
Z:function(a){var z=new L.dR(null,null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof L.fy))return!1
if(J.h(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
if(z==null?y==null:z===y)if(J.h(this.d,b.d)){z=this.e
y=b.e
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1}else z=!1}else z=!1
return z},
gv:function(a){return Y.R(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)))},
k:function(a){return"SlashDefenseSituation {attacker="+H.b(J.i(this.a))+",\nid="+J.i(this.b)+",\npredeterminedResult="+J.i(this.c)+",\ntarget="+H.b(J.i(this.d))+",\ntime="+J.i(this.e)+",\n}"}},
dR:{"^":"d;a,b,c,d,e,f",
gj:function(){return this.gaE().c},
gI:function(){return this.gaE().f},
gaE:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.f=z.e
this.a=null}return this},
m:function(a){this.a=a},
p:function(){var z,y,x,w,v,u
z=this.a
if(z==null){y=this.gaE().b
x=this.gaE().c
w=this.gaE().d
v=this.gaE().e
u=this.gaE().f
z=new L.oU(y,x,w,v,u)
if(y==null)H.f(P.l("attacker"))
if(x==null)H.f(P.l("id"))
if(w==null)H.f(P.l("predeterminedResult"))
if(v==null)H.f(P.l("target"))
if(u==null)H.f(P.l("time"))}this.m(z)
return z}}}],["","",,M,{"^":"",
bC:function(a,b){var z=new M.dS(null,null,null,null,null)
new M.ri(a,b).$1(z)
return z.p()},
fz:{"^":"a1;",
gaM:function(){return[O.rX()]},
gh:function(){return"SlashSituation"},
as:function(){var z=new M.dS(null,null,null,null,null)
z.m(this)
new M.nb().$1(z)
return z.p()},
aA:function(a,b){if(a===0)return b.a_(this.a)
return},
aI:function(a,b){return new H.K(a,new M.nc(this),[H.m(a,0)])}},
ri:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a2().af(1073741823)
a.gaW().c=z
a.gaW().e=0
z=this.a.gj()
a.gaW().b=z
z=this.b.gj()
a.gaW().d=z
return a}},
nb:{"^":"a:0;",
$1:function(a){var z=a.gaW().e
if(typeof z!=="number")return z.a6()
a.gaW().e=z+1
return a}},
nc:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.h(a.gj(),z.a)||J.h(a.gj(),z.c)}},
oV:{"^":"fz;a,j:b<,c,I:d<",
Z:function(a){var z=new M.dS(null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof M.fz))return!1
if(J.h(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y)if(J.h(this.c,b.c)){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1}else z=!1
return z},
gv:function(a){return Y.R(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
k:function(a){return"SlashSituation {attacker="+H.b(J.i(this.a))+",\nid="+J.i(this.b)+",\ntarget="+H.b(J.i(this.c))+",\ntime="+J.i(this.d)+",\n}"}},
dS:{"^":"d;a,b,c,d,e",
gj:function(){return this.gaW().c},
gI:function(){return this.gaW().e},
gaW:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
m:function(a){this.a=a},
p:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gaW().b
x=this.gaW().c
w=this.gaW().d
v=this.gaW().e
z=new M.oV(y,x,w,v)
if(y==null)H.f(P.l("attacker"))
if(x==null)H.f(P.l("id"))
if(w==null)H.f(P.l("target"))
if(v==null)H.f(P.l("time"))}this.m(z)
return z}}}],["","",,Q,{"^":"",kJ:{"^":"I;O:c<,P:d<,a3:e<,U:f<,R:r<,b,a",
gh:function(){return"FinishSlashGroundedEnemy"},
gaj:function(){return""},
gan:function(){return"(WARNING should not be user-visible)"},
V:[function(a,b,c){throw H.c(new P.ad(null))},"$3","gS",6,0,2],
W:[function(a,b,c){var z=this.b
b.a5(z.gj(),new Q.kK())
c.fu(0,"<subject> {cuts|slashes|slits} <object's> {throat|neck|side}",z,a.gJ())
X.d7(c,b,z)
return H.b(a.gh())+" slains "+H.b(z.gh())+" on the ground"},"$3","gT",6,0,2],
N:function(a,b){return 1},
M:function(a,b){return this.b.gae()&&a.gJ().gb8()},
w:{
uI:[function(a){return new Q.kJ(null,!0,!0,!0,C.c,a,null)},"$1","rY",2,0,5]}},kK:{"^":"a:0;",
$1:function(a){a.sav(0)
return a}}}],["","",,K,{"^":"",lG:{"^":"I;P:c<,a3:d<,U:e<,R:f<,O:r<,b,a",
gh:function(){return"OnGroundParry"},
gaj:function(){return"parry it"},
gan:function(){return"will <subject> parry it?"},
V:[function(a,b,c){a.ah(c,"<subject> tr<ies> to {parry|deflect it|stop it{| with <subject's> "+H.b(a.gJ().gh())+"}}")
S.aA(new K.lH(a,c),new K.lI(this,a,c),null,null)
return H.b(a.cy)+" fails to parry "+H.b(this.b.gh())},"$3","gS",6,0,2],
W:[function(a,b,c){a.bU(c,"<subject> {parr<ies> it|stop<s> it with <subject's> "+H.b(a.gJ().gh())+"}",!0)
b.bG("FightSituation")
return H.b(a.cy)+" parries "+H.b(this.b.gh())},"$3","gT",6,0,2],
N:function(a,b){var z
if(a.gH()===!0)return 0.6
z=b.f
return(z.length!==0?C.a.gE(z):null).gbH().bF(0.3)},
M:function(a,b){return a.gJ().gcz()},
w:{
uP:[function(a){return new K.lG(!1,!1,!0,C.c,"You can deal serious damage when countering because your opponent is often caught off guard. On the other hand, counters require fast reaction and could throw you out of balance.",a,null)},"$1","tn",2,0,5]}},lH:{"^":"a:1;a,b",
$0:function(){return this.a.at(this.b,"<subject> {fail<s>|<does>n't succeed}",!0)}},lI:{"^":"a:1;a,b,c",
$0:function(){return this.a.b.cO(this.c,"<subject> <is> too quick for <object>",!0,this.b)}}}],["","",,Y,{"^":"",mt:{"^":"I;O:c<,P:d<,a3:e<,U:f<,R:r<,b,a",
gh:function(){return"RollOutOfWay"},
gaj:function(){return"roll out of way"},
gan:function(){return"will <subject> evade?"},
V:[function(a,b,c){a.ah(c,"<subject> tr<ies> to roll out of the way")
a.at(c,"<subject> can't",!0)
return H.b(a.gh())+" fails to roll out of the way"},"$3","gS",6,0,2],
W:[function(a,b,c){a.ks(c,"<subject> <is> able to roll out of the way",!0,!0)
if(a.gH()===!0){b.a5(a.gj(),new Y.mu())
a.bU(c,"<subject> jump<s> up on <subject's> feet",!0)}b.bG("FightSituation")
return H.b(a.gh())+" rolls out of the way of "+H.b(this.b.gh())+"'s strike"},"$3","gT",6,0,2],
N:function(a,b){var z
if(a.gH()===!0)return 1
z=b.f
return(z.length!==0?C.a.gE(z):null).gbH().bF(0.5)},
M:function(a,b){return!0},
w:{
uV:[function(a){return new Y.mt(null,!1,!1,!0,C.c,a,null)},"$1","tt",2,0,5]}},mu:{"^":"a:0;",
$1:function(a){a.sam(C.k)
return a}}}],["","",,V,{"^":"",
dC:function(a,b,c){var z=new V.dB(null,null,null,null,null,null)
new V.rj(a,b,c).$1(z)
return z.p()},
fc:{"^":"cz;",
gaM:function(){return[K.tn(),Y.tt()]},
gh:function(){return"OnGroundDefenseSituation"},
as:function(){var z=new V.dB(null,null,null,null,null,null)
z.m(this)
new V.lF().$1(z)
return z.p()}},
rj:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$a2().af(1073741823)
a.gaC().c=z
a.gaC().f=0
z=this.a.gj()
a.gaC().b=z
z=this.b.gj()
a.gaC().e=z
a.gaC().d=this.c
return a}},
lF:{"^":"a:0;",
$1:function(a){var z=a.gaC().f
if(typeof z!=="number")return z.a6()
a.gaC().f=z+1
return a}},
oP:{"^":"fc;dh:a<,j:b<,cL:c<,cQ:d<,I:e<",
Z:function(a){var z=new V.dB(null,null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof V.fc))return!1
if(J.h(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
if(z==null?y==null:z===y)if(J.h(this.d,b.d)){z=this.e
y=b.e
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1}else z=!1}else z=!1
return z},
gv:function(a){return Y.R(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)))},
k:function(a){return"OnGroundDefenseSituation {attacker="+H.b(J.i(this.a))+",\nid="+J.i(this.b)+",\npredeterminedResult="+J.i(this.c)+",\ntarget="+H.b(J.i(this.d))+",\ntime="+J.i(this.e)+",\n}"}},
dB:{"^":"d;a,b,c,d,e,f",
gj:function(){return this.gaC().c},
gI:function(){return this.gaC().f},
gaC:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.f=z.e
this.a=null}return this},
m:function(a){this.a=a},
p:function(){var z,y,x,w,v,u
z=this.a
if(z==null){y=this.gaC().b
x=this.gaC().c
w=this.gaC().d
v=this.gaC().e
u=this.gaC().f
z=new V.oP(y,x,w,v,u)
if(y==null)H.f(P.l("attacker"))
if(x==null)H.f(P.l("id"))
if(w==null)H.f(P.l("predeterminedResult"))
if(v==null)H.f(P.l("target"))
if(u==null)H.f(P.l("time"))}this.m(z)
return z}}}],["","",,D,{"^":"",
fK:function(a,b){var z=new D.dU(null,null,null,null,null)
new D.rk(a,b).$1(z)
return z.p()},
fJ:{"^":"a1;",
gaM:function(){return[Q.rY()]},
gh:function(){return"StrikeDownSituation"},
as:function(){var z=new D.dU(null,null,null,null,null)
z.m(this)
new D.nY().$1(z)
return z.p()},
aA:function(a,b){if(a===0)return b.a_(this.a)
return},
aI:function(a,b){return new H.K(a,new D.nZ(this),[H.m(a,0)])}},
rk:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a2().af(1073741823)
a.gaX().c=z
a.gaX().e=0
z=this.a.gj()
a.gaX().b=z
z=this.b.gj()
a.gaX().d=z
return a}},
nY:{"^":"a:0;",
$1:function(a){var z=a.gaX().e
if(typeof z!=="number")return z.a6()
a.gaX().e=z+1
return a}},
nZ:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.h(a.gj(),z.a)||J.h(a.gj(),z.c)}},
oX:{"^":"fJ;a,j:b<,c,I:d<",
Z:function(a){var z=new D.dU(null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof D.fJ))return!1
if(J.h(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y)if(J.h(this.c,b.c)){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1}else z=!1
return z},
gv:function(a){return Y.R(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
k:function(a){return"StrikeDownSituation {attacker="+H.b(J.i(this.a))+",\nid="+J.i(this.b)+",\ntargetOnGround="+H.b(J.i(this.c))+",\ntime="+J.i(this.d)+",\n}"}},
dU:{"^":"d;a,b,c,d,e",
gj:function(){return this.gaX().c},
gI:function(){return this.gaX().e},
gaX:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
m:function(a){this.a=a},
p:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gaX().b
x=this.gaX().c
w=this.gaX().d
v=this.gaX().e
z=new D.oX(y,x,w,v)
if(y==null)H.f(P.l("attacker"))
if(x==null)H.f(P.l("id"))
if(w==null)H.f(P.l("targetOnGround"))
if(v==null)H.f(P.l("time"))}this.m(z)
return z}}}],["","",,O,{"^":"",m5:{"^":"d;",
gbH:function(){switch(this.gcL()){case C.m:return C.Y
case C.n:return $.$get$fg()
case C.q:return $.$get$fh()
default:throw H.c(P.C(this.gcL()))}},
$isa1:1}}],["","",,K,{"^":"",dJ:{"^":"d;a,b",
k:function(a){return this.b}}}],["","",,D,{"^":"",nd:{"^":"a7;P:b<,U:c<,a3:d<,R:e<,a",
gY:function(){return""},
gO:function(){return},
gh:function(){return"SlayMonstersAction"},
V:[function(a,b,c){throw H.c(new P.ad(null))},"$3","gS",6,0,2],
W:[function(a,b,c){var z,y,x,w
z=b.f
y=z.length!==0?C.a.gE(z):null
x=b.dI(y.gbt())
w=b.a
C.a.q(z,x.jw(b,y,new H.K(w,new D.ne(a,x),[H.m(w,0)])))
return H.b(a.gh())+" initiated combat with monsters in "+x.k(0)},"$3","gT",6,0,2],
ak:function(a,b){return"WARNING should not be user-visible"},
N:function(a,b){return 1},
M:function(a,b){var z=b.f
return H.a6(z.length!==0?C.a.gE(z):null,"$isa9").c}},ne:{"^":"a:0;a,b",
$1:function(a){var z,y
if(a.gaO()){z=a.gbl()
y=this.a.gbl()
z=z.a
y=y.gj()
if(z==null?y==null:z===y){z=a.gbt()
y=this.b.gh()
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1
return z}}}],["","",,Y,{"^":"",o4:{"^":"cB;P:c<,a3:d<,U:e<,R:f<,b,a",
gO:function(){return},
gh:function(){return"TakeExitAction"},
V:[function(a,b,c){throw H.c(new P.ad(null))},"$3","gS",6,0,2],
W:[function(a,b,c){var z,y
z=this.b
c.q(0,z.gb4())
y=b.f
H.a6(y.length!==0?C.a.gE(y):null,"$isa9").b9(b,a,z.gjo(),c)
return H.b(a.gh())+" went through exit to "+z.a},"$3","gT",6,0,2],
ak:function(a,b){return"WARNING should not be user-visible"},
N:function(a,b){return 1},
M:function(a,b){var z=b.f
if(H.a6(z.length!==0?C.a.gE(z):null,"$isa9").c===!0)return!1
this.b.gjS()
return!0},
w:{
uY:[function(a){return new Y.o4(!1,!0,!1,null,a,null)},"$1","ur",2,0,47]}}}],["","",,F,{"^":"",
fr:function(a,b){var z=new F.dP(null,null,null,null,null)
new F.r5(a,b).$1(z)
return z.p()},
a9:{"^":"a1;",
gaM:function(){return[Y.ur()]},
gbe:function(){var z=[]
C.a.ao(z,$.$get$hy())
z.push($.$get$fA())
return z},
gh:function(){return"RoomRoamingSituation"},
as:function(){var z=new F.dP(null,null,null,null,null)
z.m(this)
new F.mv().$1(z)
return z.p()},
aA:function(a,b){return b.a.b6(0,new F.mw(),new F.mx())},
aI:function(a,b){var z=this.aA(null,b)
if(z==null)return[]
return[z]},
h_:function(a,b){a.a.ig(new F.mz(),!0)},
b9:function(a,b,c,d){var z,y,x,w,v,u,t
z=a.dI(c)
a.cN(this.b,F.fr(z,z.gjv()!=null))
d.ej()
z.c.$3(b,a,d)
d.G(0,"\n\n",!0)
for(y=R.hQ(b,a),y=P.T(y,!0,H.x(y,"y",0)),x=y.length,w=a.a,v=0;v<y.length;y.length===x||(0,H.al)(y),++v){u=a.a_(y[v].gj())
t=u.Z(new F.my(z))
w.a8(0,u)
w.q(0,t)}},
d0:function(a){if(J.h(this.a,$.$get$ej().b))return!1
return!0}},
r5:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a2().af(1073741823)
a.gay().c=z
a.gay().e=0
z=this.a.gh()
a.gay().b=z
a.gay().d=this.b
return a}},
mv:{"^":"a:0;",
$1:function(a){var z=a.gay().e
if(typeof z!=="number")return z.a6()
a.gay().e=z+1
return a}},
mw:{"^":"a:0;",
$1:function(a){return a.gH()===!0&&a.gaO()}},
mx:{"^":"a:1;",
$0:function(){return}},
mz:{"^":"a:0;",
$1:function(a){return!a.gbu()}},
my:{"^":"a:0;a",
$1:function(a){a.sbt(this.a.b)
return a}},
oT:{"^":"a9;bt:a<,j:b<,c,I:d<",
Z:function(a){var z=new F.dP(null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof F.a9))return!1
if(J.h(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
if(z==null?y==null:z===y){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1}else z=!1
return z},
gv:function(a){return Y.R(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
k:function(a){return"RoomRoamingSituation {currentRoomName="+H.b(J.i(this.a))+",\nid="+J.i(this.b)+",\nmonstersAlive="+J.i(this.c)+",\ntime="+J.i(this.d)+",\n}"}},
dP:{"^":"d;a,b,c,d,e",
gbt:function(){return this.gay().b},
sbt:function(a){this.gay().b=a
return a},
gj:function(){return this.gay().c},
skb:function(a){this.gay().d=a
return a},
gI:function(){return this.gay().e},
gay:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
m:function(a){this.a=a},
p:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gay().b
x=this.gay().c
w=this.gay().d
v=this.gay().e
z=new F.oT(y,x,w,v)
if(y==null)H.f(P.l("currentRoomName"))
if(x==null)H.f(P.l("id"))
if(w==null)H.f(P.l("monstersAlive"))
if(v==null)H.f(P.l("time"))}this.m(z)
return z}}}],["","",,V,{"^":"",
o6:function(){var z=new V.dV(null,null,null)
new V.rt().$1(z)
return z.p()},
oh:function(){var z=new V.dW(null,null,null)
new V.rs().$1(z)
return z.p()},
ni:function(){var z=new V.dT(null,null,null)
new V.rr().$1(z)
return z.p()},
r3:{"^":"a:4;",
$3:function(a,b,c){c.G(0,"The crevice is small.\n",!0)}},
r4:{"^":"a:4;",
$3:function(a,b,c){c.G(0,"",!0)}},
r1:{"^":"a:4;",
$3:function(a,b,c){c.G(0,"The path from slavery to power begins with a single crack of a whip. Briana wheels around, her face red with pain and anger. She is new here, but she knows what will follow. \n\n\nOnce Agruth starts whipping, the victim ends up dead. Agruth loves killing slaves. \n\n\nAnother crack and there is new blood on Briana's face. Agruth grins.\n\n\nNobody else is in sight except for Agruth, Briana and you. That's Agruth's main mistake.\n",!0)}},
r2:{"^":"a:4;",
$3:function(a,b,c){c.G(0,"",!0)}},
qZ:{"^":"a:4;",
$3:function(a,b,c){c.G(0,'You are Aren, a slave. You have spent three painful years inside this mountain, between the foul-smelling cave walls, and under the barbed whip of Agruth. Your past life is almost forgotten, but it has to be revived. There is no turning back now. [a][b][c][d][e]\n\n\nBriana kneels down to Oddmund. "Dead," she says plainly.\n\n\nOddmund was the leader among the slaves. He was the only one brave enough to steal the disgusting but precious food from the goblins and give it to the other slaves. He was the only slave who knew how to get from here.\n',!0)}},
r_:{"^":"a:4;",
$3:function(a,b,c){c.G(0,"",!0)}},
kM:{"^":"aI;Y:c<,h:d<,b,a",
M:function(a,b){var z=b.f
if(!J.h(H.a6(z.length!==0?C.a.gE(z):null,"$isa9").a,"start_of_book"))return!1
return!0},
W:[function(a,b,c){c.q(0,"You make it to the Church undetected, slipping through one of the lower windows leading into the main hall.")
b.ai("RoomRoamingSituation").b9(b,N.av(b),"underground_church",c)
return H.b(a.gh())+" successfully performs FleeThroughNecromancersChurch"},"$3","gT",6,0,2],
V:[function(a,b,c){c.q(0,null)
c.q(0,"You manage to slip into a Church window, but a guard notices your shadow. As he squints in your direction, you disappear into the shadowy main hall.")
N.ev(b,new V.kN())
b.ai("RoomRoamingSituation").b9(b,N.av(b),"underground_church",c)
return H.b(a.gh())+" fails to perform FleeThroughNecromancersChurch"},"$3","gS",6,0,2],
N:function(a,b){return 0.9},
gU:function(){return!1},
ak:function(a,b){return"Will you be successful?"},
gR:function(){return},
gO:function(){return"The Underground Church will have fewer guards, so you're more likely to slip through unnoticed. Then again, you have no idea who--or what--lurks there."},
gP:function(){return!1}},
kN:{"^":"a:0;",
$1:function(a){var z
a.gbJ()
z=a.b
a.gbJ()
a.b=z+1
return a}},
kO:{"^":"aI;Y:c<,h:d<,b,a",
M:function(a,b){var z=b.f
if(!J.h(H.a6(z.length!==0?C.a.gE(z):null,"$isa9").a,"start_of_book"))return!1
return!0},
W:[function(a,b,c){c.q(0,"You sneak your way into the War Forges and hide in the shadows of an alcove.")
b.ai("RoomRoamingSituation").b9(b,N.av(b),"war_forge",c)
return H.b(a.gh())+" successfully performs FleeThroughWarForge"},"$3","gT",6,0,2],
V:[function(a,b,c){c.q(0,null)
c.q(0,"You manage to sneak into the War Forges, but a guard notices your shadow. You quickly duck into an alcove as he frowns in your direction and scratches his head.")
N.ev(b,new V.kP())
b.ai("RoomRoamingSituation").b9(b,N.av(b),"war_forge",c)
return H.b(a.gh())+" fails to perform FleeThroughWarForge"},"$3","gS",6,0,2],
N:function(a,b){return 0.7},
gU:function(){return!1},
ak:function(a,b){return"Will you be successful?"},
gR:function(){return},
gO:function(){return"The War Forges are where the orcs build their weapons and war machines. As a slave, you\u2019re familiar with the place and it's a more direct path to freedom, but almost certainly filled with orcs."},
gP:function(){return!1}},
kP:{"^":"a:0;",
$1:function(a){var z
a.gbJ()
z=a.b
a.gbJ()
a.b=z+1
return a}},
n4:{"^":"aI;Y:c<,h:d<,b,a",
M:function(a,b){var z=b.f
if(!J.h(H.a6(z.length!==0?C.a.gE(z):null,"$isa9").a,"start_of_book"))return!1
if(b.iR(this.d))return!1
return!0},
W:[function(a,b,c){c.q(0,"You search his pockets but turn up with nothing. Just then, you hear heavy footfalls approaching. Briana grabs your arm. \u201cWe\u2019ve got to go.\u201d  \n\n\nYou realize that if Agruth had something valuable on him, he would have hidden it well. You run your hand inside his vest and find a troma herb. This boosts your energy right when you need it--very handy. (Your stamina increases by 1.)")
N.t9(b,1)
return H.b(a.gh())+" successfully performs SearchAgruth"},"$3","gT",6,0,2],
V:[function(a,b,c){c.q(0,null)
c.q(0,"You search but don\u2019t find anything. Suddenly, heavy footfalls come your way. No choice--you have to go now.")
return H.b(a.gh())+" fails to perform SearchAgruth"},"$3","gS",6,0,2],
N:function(a,b){return 0.9},
gU:function(){return!1},
ak:function(a,b){return"Will you be successful?"},
gR:function(){return},
gO:function(){return"You have taken his weapon but there might be other useful items in his pocket."},
gP:function(){return!1}},
qX:{"^":"a:4;",
$3:function(a,b,c){c.G(0,"This must be the place that the orcs call the Shafts. It's a tall, seemingly endless room, with many walkways across.\n\n\n\n\n\n\nYou realize there is really only one way out, over one of the walkways. You'll have to run, there is no hiding anymore.\n",!0)}},
qY:{"^":"a:4;",
$3:function(a,b,c){c.G(0,"",!0)}},
qV:{"^":"a:4;",
$3:function(a,b,c){c.G(0,"Suddenly, an **orc** and a **goblin** jump in front of you from a slimy crevice, swords in hands.\n\n\n![Orc and Goblin](img/orc_and_goblin_sketch.jpg)\n",!0)}},
qW:{"^":"a:4;",
$3:function(a,b,c){c.G(0,"",!0)}},
qT:{"^":"a:4;",
$3:function(a,b,c){c.G(0,"The Underground Church is a dark, long, tall cave. In the distance, you see the altar. It's glowing. There are unnatural noises.\n\n\n\n\n",!0)
if(H.a6(b.c,"$isbV").b>=1)c.G(0,"You hear orders being yelled somewhere behind you.",!0)
c.G(0,"\nAfter a bit of searching, you find a twisty passage going from the right hand side of the Church.\n",!0)}},
qU:{"^":"a:4;",
$3:function(a,b,c){c.G(0,"",!0)}},
qR:{"^":"a:4;",
$3:function(a,b,c){c.G(0,'A blast of smoke and heat greets you as you enter this vast room. The roaring fire and the clanging of metal draws your attention to the far wall, where scores of orcs shovel coal into a giant furnace. These are the war forges.\n\n\nYou and Briana take a moment to stare; likely no living human has seen this and lived to tell others. Orc teams tilt huge kettles of molten steel into molds for axes, war hammers, and greatswords. They move as if in a trance, without a single complaint as they work. Strange. \n\n\nYou and Briana duck behind some carts. As you head towards what seems to be an exit, you hear strange whispering. You crane your neck and spot a dark-robed figure\u2014a priest?\u2014chanting softly to himself by the forge. Despite his whispering, his words crawl through your mind like a spider:\n\n\n> "_Pwarfa n\u2019ngen aradra._ The slow suffer. _Madraga n\u2019ngen nach santutra._ Only the hard-working prosper. _Nfarfi Arach m\u2019marrash._ The Dead Prince sees all."\n\n\n',!0)
if(H.a6(b.c,"$isbV").b>=1)c.G(0,"Somewhere behind you, a gutteral tongue bellows a string of orders. You must get moving.",!0)
c.G(0,"\nYou can guess which corridor will get you out. Fresh air is flowing into the forge through it, stirring the smoke. It's not far, and thankfully there is nobody in the way.\n",!0)}},
qS:{"^":"a:4;",
$3:function(a,b,c){c.G(0,"",!0)}},
qO:{"^":"a:4;",
$3:function(a,b,c){c.G(0,"The crevice is small.\n",!0)}},
qP:{"^":"a:4;",
$3:function(a,b,c){c.G(0,"",!0)}},
qM:{"^":"a:4;",
$3:function(a,b,c){c.G(0,'You emerge into blinding sunlight. You moan and cover your eyes as the world spins around you and your ears ring like glass chimes. \n\n\nBriana steadies you as sway on your feet. \u201cNow is absolutely the worst time to faint.\u201d\n\n\n\u201cI\u2019m fine,\u201d you mutter. \u201cIt\u2019s just\u2026the sun\u2026been so long\u2026\u201d\n\n\nShe guides you forward and you touch the cliff wall. \u201cI don\u2019t mean to rush you, this being your big reunion with fresh air and all, but we can\u2019t stay. Orcs will be coming through here any moment, and we\'re in no shape to face them. Look at us. We should run as far from this cursed mountain as possible."\n\n\n"I\'m going to the Fort and not a step further," you say, blinking tears from your eyes.\n\n\n"Are you crazy?" She looks at you, then at the cave, then in the direction of Fort Ironcast, a few miles down the mountain slope. "You saw what\'s in the mountain. The Fort has no chance of withstanding a force that size. It will fall within a day!"\n\n\n"If the Fort falls, there\'s no place far enough from here to be safe. You know that."\n\n\nBriana frowns. "I don\'t, actually." There\'s an orcish war cry coming from somewhere down the cave. The Orcs are coming out. Briana\u2019s frown deepens to a scowl. "We\'re losing time. We may never even make it to the Fort, and here we are talking about where to go from there. Well, I see two ways out. Which way do you think we should go?\u201d \n\n\nBlinking hard, you make out your surroundings. Before you lies the winding, beaten path that leads down the mountain. Seems simple enough, but that way inevitably means more orcs.\nBut Briana points you to the edge of a nearby cliff. You peer over the edge and study the descent. Without proper gear it\u2019s a difficult climb down, but not too sheer, and likely no resistance. Perhaps you could chance it?\n',!0)}},
qN:{"^":"a:4;",
$3:function(a,b,c){c.G(0,"The cavern entrance to Mt. Bloodrock yawns before you. The wind issuing from its depths gives you the disturbing impression that it\u2019s breathing.\n",!0)}},
qK:{"^":"a:4;",
$3:function(a,b,c){c.G(0,"The Bloodrock Pass winds down the slope of mountain. Though the weather-beaten path looks well-traveled, you thankfully come across no patrols at this time. \n\n\n",!0)
if(b.iS("sneak_onto_cart"))c.G(0,"You and Briana stay quiet and still in your hiding spot. An hour later, you peek out of the cart and see that you have reached level ground. You sneak off the cart and hide behind some rocks as it drives away.",!0)
else c.G(0,"You run down the mountain side as fast as your legs can carry you. When you pause, gulping for air, you find you have nearly reached the bottom.",!0)
c.G(0,"\nA few miles further down and you will reach Fort Ironcast.\n",!0)}},
qL:{"^":"a:4;",
$3:function(a,b,c){c.G(0,"The Bloodrock pass flows snakelike down the mountain.\n",!0)}},
qI:{"^":"a:4;",
$3:function(a,b,c){c.G(0,"The pass slopes down a short way before bending to the left. You inch forward and peer around the corner. Several feet away, a stone gate looms over the pass, flanked on both sides with thick walls too high to climb. An iron gate bearing the insignia of the many-eyed octopus lies between you and freedom. \n\n\nYou spy only two pairs of orc guards standing by the gate. An ox cart is parked before them, the rider apparently negotiating passage with the keepers. From your knowledge of orcish, you can tell that the guards are demanding the driver leave them some food.\n\n\n\u201cLooks like a supply cart,\u201d Briana says. \u201cAnd likely our way out of here. We can sneak onto the back while they\u2019re distracted.\u201d\n\n\nYou don\u2019t answer. With only four distracted orcs and the cart driver, you may be able to take them by surprise.\n\n\nBriana seems to sense what you\u2019re thinking. \u201cA direct attack sounds risky. If they have an alarm, they can bring reinforcements here in a matter of moments.\u201d\n",!0)}},
qJ:{"^":"a:4;",
$3:function(a,b,c){c.G(0,"The Bloodrock stone gate looms ahead of you.\n",!0)}},
rx:{"^":"a:4;",
$3:function(a,b,c){c.G(0,"The orcish guards see you approaching and raise their weapons. One of them smirks.\n\n\n\u201cWe\u2019re lucky, Ruglag!\u201d he says in a rumbling voice. \u201cToday we kill human.\u201d\n",!0)}},
qG:{"^":"a:4;",
$3:function(a,b,c){c.G(0,"The stone gate looms before you.\n",!0)}},
nf:{"^":"aI;Y:c<,h:d<,b,a",
M:function(a,b){var z=b.f
if(!J.h(H.a6(z.length!==0?C.a.gE(z):null,"$isa9").a,"mountain_pass_gate"))return!1
return!0},
W:[function(a,b,c){c.q(0,"You squeeze through the burlap sacks and hide under some rags. The orcs conclude their negotiations as the driver hurls a bag of turnips to a guard. The gates split open to the rattle of chains and the ominous creak of metal hinges. The ox cart lurches forward into the mountain pass.\nIn the cart you find a small keg of beer. You decide it is worth taking.")
N.ev(b,new V.ng())
b.ai("RoomRoamingSituation").b9(b,N.av(b),"mountain_pass",c)
return H.b(a.gh())+" successfully performs SneakOntoCart"},"$3","gT",6,0,2],
V:[function(a,b,c){throw H.c(new P.D("Success chance is 100%"))},"$3","gS",6,0,2],
N:function(a,b){return 1},
gU:function(){return!1},
ak:function(a,b){return"Will you be successful?"},
gR:function(){return},
gO:function(){return"With the guards distracted, it should be a simple matter to squeeze through the burlap sacks and hide under some rags."},
gP:function(){return!1}},
ng:{"^":"a:0;",
$1:function(a){a.gbJ()
a.a=!0
return a}},
o5:{"^":"aI;Y:c<,h:d<,b,a",
M:function(a,b){var z=b.f
if(!J.h(H.a6(z.length!==0?C.a.gE(z):null,"$isa9").a,"mountain_pass_gate"))return!1
if(b.kA(this.d)!=null)return!1
return!0},
W:[function(a,b,c){c.q(0,"You sneak forward as close as you can. There are four guards in total. Two of them are distracted with talking to the cart merchant. But the other two are on the other side of the road, leaning against a large rock. They\u2019re paying attention to the argument and not much else.\n\n\nYou and Briana successfully make it to the other side of the rock. With a vicious twist you snap one orc\u2019s neck while Briana digs her knife into the other guard\u2019s gullet. You drag them behind the rock, out of sight. In one guard\u2019s pouch you find 10 gold coins. You also take an orcish shield. \n\n\nOnce done, you sneak back away from the gate.")
b.a5(a.gj(),new V.oe())
return H.b(a.gh())+" successfully performs TakeOutGateGuards"},"$3","gT",6,0,2],
V:[function(a,b,c){c.q(0,"You sneak forward as close as you can. There are four guards in total. Two of them are distracted with talking to the cart merchant. But the other two are on the other side of the road, leaning against a large rock. They\u2019re paying attention to the argument and not much else.\n\n\nYou and Briana successfully make it to the other side of that rock. As luck would have it, though, the two orcs decide to look around at that very moment. You dive behind the rock and hope they didn\u2019t see you.")
C.a.q(b.f,V.o6())
return H.b(a.gh())+" fails to perform TakeOutGateGuards"},"$3","gS",6,0,2],
N:function(a,b){return 0.5},
gU:function(){return!1},
ak:function(a,b){return"Will you be successful?"},
gR:function(){return},
gO:function(){return"Two of the orcs seem distracted. You're not particularly good at camouflage but you can still try."},
gP:function(){return!1}},
oe:{"^":"a:0;",
$1:function(a){var z=a.gbn()
if(typeof z!=="number")return z.a6()
a.sbn(z+10)
return a}},
fO:{"^":"a1;",
gbe:function(){return[new A.bB(new V.o9(),"Take the guards out","You decide to finish the job, however improbable it seems that you\u2019ll succeed.","take_out_gate_guards_rescue",!0,null),new A.bB(new V.oa(),"Sneak away","It\u2019s too risky.","take_out_gate_guards_continuation_of_failure",!0,null)]},
gh:function(){return"take_out_gate_guards"},
as:function(){var z=new V.dV(null,null,null)
z.m(this)
new V.ob().$1(z)
return z.p()},
aA:function(a,b){if(a!==0)return
return b.a.aK(0,new V.oc())},
aI:function(a,b){return[a.aK(0,new V.od())]}},
rt:{"^":"a:0;",
$1:function(a){var z=$.$get$a2().af(1073741823)
a.ga7().b=z
a.ga7().c=0
return a}},
o9:{"^":"a:8;",
$4:function(a,b,c,d){J.aQ(c,"Suspicious, the orcs come close to investigate the disturbance. You let one pass behind the rock, then grab the other by the throat and into a choke hold. Briana takes the other one out silently with a knife in the back. You drag them to the other side of the rock, out of sight.\n\n\nYou find 10 gold coins in a pouch attached to one of the orcs\u2019 belt. You also take an orcish shield. Then, you sneak back away from the gate.")
b.a5(a.gj(),new V.o7())
b.a5(a.gj(),new V.o8())
b.b0()
return"TakeOutGateGuardsRescueSituation resolved with rescue/continuation (Take the guards out)"}},
o7:{"^":"a:0;",
$1:function(a){var z=a.gb1()
if(typeof z!=="number")return z.aw()
a.sb1(z-1)
return a}},
o8:{"^":"a:0;",
$1:function(a){var z=a.gbn()
if(typeof z!=="number")return z.a6()
a.sbn(z+10)
return a}},
oa:{"^":"a:8;",
$4:function(a,b,c,d){J.aQ(c,"Seeing that the window of opportunity has passed, you sneak away from the rock.")
b.b0()
return"TakeOutGateGuardsRescueSituation resolved with rescue/continuation (Sneak away)"}},
ob:{"^":"a:0;",
$1:function(a){var z=a.ga7().c
if(typeof z!=="number")return z.a6()
a.ga7().c=z+1
return a}},
oc:{"^":"a:0;",
$1:function(a){return a.gH()}},
od:{"^":"a:0;",
$1:function(a){return a.gH()}},
rv:{"^":"a:4;",
$3:function(a,b,c){c.G(0,"After hours of climbing with several stops on the way, you make it all the way down to the base of the mountain. Thankfully, there are no wandering orc patrols here or any other dangers, so you decide to camp behind some rocks and rest for a few hours. Briana takes the watch.\n\n\nWhen it is your turn to go on watch, you see something that you haven\u2019t noticed before. Carved onto the rock face is what appears to be an enormous door; cunning craftsmanship has disguised it to look like part of the mountainside. You point it out to Briana when she awakens and the two of you inspect it more closely. It seems tall enough for a giant and wide enough for a herd of cattle to pass through. Yet you find no indication that is has been opened in many years. And try as you might, neither of you can find a mechanism for opening it.\n\n\nYou give up after an hour\u2019s work of inspection and leave it alone for now. Fort Ironcast still awaits you.\n",!0)}},
rw:{"^":"a:4;",
$3:function(a,b,c){c.G(0,"The great stone doors still stands unopened on the mountainside.\n",!0)}},
rm:{"^":"a:4;",
$3:function(a,b,c){c.G(0,"You and Briana tie yourselves together with some rope. Then, with a deep breath you swing yourself over the side and gently find a toehold with your foot. You lower yourself to the next. And the next. \n\n\nOver the next agonizing hour, you inch your way down the mountainside. You keep looking down to see how much further is left before the slope becomes gentler, but it seems you are hardly making progress.\n\n\n\u201cRemind me again why we decided to go down this way?\u201d Briana grouses. You decide to save your breath. There\u2019s still a ways to go.\n",!0)}},
ru:{"^":"a:4;",
$3:function(a,b,c){c.G(0,"",!0)}},
of:{"^":"aI;Y:c<,h:d<,b,a",
M:function(a,b){var z=b.f
if(!J.h(H.a6(z.length!==0?C.a.gE(z):null,"$isa9").a,"winged_serpent_nest"))return!1
return!0},
W:[function(a,b,c){c.q(0,"Intimidated by your weapon, the winged serpent abandons its nest and flees to the mountaintop.")
b.ai("RoomRoamingSituation").b9(b,N.av(b),"mountainside_base",c)
return H.b(a.gh())+" successfully performs ThreatenWingedSerpent"},"$3","gT",6,0,2],
V:[function(a,b,c){c.q(0,"The serpent does not even look at your sword as you swing it wildly. Its reptilian eyes glitter as it opens its jaws wide.")
C.a.q(b.f,V.oh())
return H.b(a.gh())+" fails to perform ThreatenWingedSerpent"},"$3","gS",6,0,2],
N:function(a,b){return 0.3},
gU:function(){return!1},
ak:function(a,b){return"Will you be successful?"},
gR:function(){return},
gO:function(){return"You have a disadvantage this high up with your backs to the mountainside."},
gP:function(){return!1}},
fT:{"^":"a1;",
gbe:function(){return[new A.bB(new V.oj(),"Get Briana\u2019s help","Maybe your companion has an answer.","threaten_winged_serpent_rescue",!0,null),new A.bB(new V.ok(),"Face the winged serpent head on","You will attack the creature straight on.","threaten_winged_serpent_continuation_of_failure",!0,null)]},
gh:function(){return"threaten_winged_serpent"},
as:function(){var z=new V.dW(null,null,null)
z.m(this)
new V.ol().$1(z)
return z.p()},
aA:function(a,b){if(a!==0)return
return b.a.aK(0,new V.om())},
aI:function(a,b){return[a.aK(0,new V.on())]}},
rs:{"^":"a:0;",
$1:function(a){var z=$.$get$a2().af(1073741823)
a.ga7().b=z
a.ga7().c=0
return a}},
oj:{"^":"a:8;",
$4:function(a,b,c,d){J.aQ(c,"Just as the serpent strikes, Briana hurls her dagger at its wing. The weapon grazes the creature\u2019s wing just enough to keep it from directly biting you. Still, one poisoned fang grazes your skin.")
b.ai("RoomRoamingSituation").b9(b,N.av(b),"mountainside_base",c)
b.b0()
return"ThreatenWingedSerpentRescueSituation resolved with rescue/continuation (Get Briana\u2019s help)"}},
ok:{"^":"a:8;",
$4:function(a,b,c,d){J.aQ(c,"You slash at the serpent\u2019s head as it moves in to strike you!\n\n\nBut the sky is the creature\u2019s domain, and it easily weaves away from your blows before coiling itself around your sword arm. Before you can react it bites deeply into your neck. You topple over the edge of the mountain. It\u2019s now a matter of what kills you first: the fall or the venom.")
b.a5(a.gj(),new V.oi())
b.b0()
return"ThreatenWingedSerpentRescueSituation resolved with rescue/continuation (Face the winged serpent head on)"}},
oi:{"^":"a:0;",
$1:function(a){a.sav(0)
return a}},
ol:{"^":"a:0;",
$1:function(a){var z=a.ga7().c
if(typeof z!=="number")return z.a6()
a.ga7().c=z+1
return a}},
om:{"^":"a:0;",
$1:function(a){return a.gH()}},
on:{"^":"a:0;",
$1:function(a){return a.gH()}},
nh:{"^":"aI;Y:c<,h:d<,b,a",
M:function(a,b){var z=b.f
if(!J.h(H.a6(z.length!==0?C.a.gE(z):null,"$isa9").a,"winged_serpent_nest"))return!1
return!0},
W:[function(a,b,c){c.q(0,"Your sibilant words reach the winged serpent\u2019s ears. It coils in the air for a while longer, then whips towards its nest to clutch possessively at its eggs. You decide it\u2019s time to move on.")
b.ai("RoomRoamingSituation").b9(b,N.av(b),"mountainside_base",c)
return H.b(a.gh())+" successfully performs SootheWingedSerpent"},"$3","gT",6,0,2],
V:[function(a,b,c){c.q(0,"The serpent sways at your hissing, but is otherwise unimpressed as it opens its jaws menacingly.")
C.a.q(b.f,V.ni())
return H.b(a.gh())+" fails to perform SootheWingedSerpent"},"$3","gS",6,0,2],
N:function(a,b){return 0.8},
gU:function(){return!1},
ak:function(a,b){return"Will you be successful?"},
gR:function(){return},
gO:function(){return"The creature is only defending its nest\u2014maybe you can convince it that you mean no harm."},
gP:function(){return!1}},
fC:{"^":"a1;",
gbe:function(){return[new A.bB(new V.nk(),"Get Briana\u2019s help","Maybe your companion has an answer.","soothe_winged_serpent_rescue",!0,null),new A.bB(new V.nl(),"Face the winged serpent head on","You will attack the creature straight on.","soothe_winged_serpent_continuation_of_failure",!0,null)]},
gh:function(){return"soothe_winged_serpent"},
as:function(){var z=new V.dT(null,null,null)
z.m(this)
new V.nm().$1(z)
return z.p()},
aA:function(a,b){if(a!==0)return
return b.a.aK(0,new V.nn())},
aI:function(a,b){return[a.aK(0,new V.no())]}},
rr:{"^":"a:0;",
$1:function(a){var z=$.$get$a2().af(1073741823)
a.ga7().b=z
a.ga7().c=0
return a}},
nk:{"^":"a:8;",
$4:function(a,b,c,d){J.aQ(c,"Just as the serpent strikes, Briana hurls her dagger at its wing. The weapon grazes the creature\u2019s wing just enough to keep it from directly biting you. Still, one poisoned fang grazes your skin.")
b.ai("RoomRoamingSituation").b9(b,N.av(b),"mountainside_base",c)
b.b0()
return"SootheWingedSerpentRescueSituation resolved with rescue/continuation (Get Briana\u2019s help)"}},
nl:{"^":"a:8;",
$4:function(a,b,c,d){J.aQ(c,"You slash at the serpent\u2019s head as it moves in to strike you!\n\n\nBut the sky is the creature\u2019s domain, and it easily weaves away from your blows before coiling itself around your sword arm. Before you can react it bites deeply into your neck. You topple over the edge of the mountain. It\u2019s now a matter of what kills you first: the fall or the venom.")
b.a5(a.gj(),new V.nj())
b.b0()
return"SootheWingedSerpentRescueSituation resolved with rescue/continuation (Face the winged serpent head on)"}},
nj:{"^":"a:0;",
$1:function(a){a.sav(0)
return a}},
nm:{"^":"a:0;",
$1:function(a){var z=a.ga7().c
if(typeof z!=="number")return z.a6()
a.ga7().c=z+1
return a}},
nn:{"^":"a:0;",
$1:function(a){return a.gH()}},
no:{"^":"a:0;",
$1:function(a){return a.gH()}},
og:{"^":"aI;Y:c<,h:d<,b,a",
M:function(a,b){var z=b.f
if(!J.h(H.a6(z.length!==0?C.a.gE(z):null,"$isa9").a,"winged_serpent_nest"))return!1
return!0},
W:[function(a,b,c){c.q(0,"You grab one of the eggs from the nest and hold over the edge. The serpent hovers in place, hissing loudly, but otherwise holding off its attack. \n\n\n\n\nYou grin at it as you juggle the egg from one hand to the other. With one smooth motion you cock your arm back and throw. The serpent gives a piercing cry, then launches itself after its precious offspring.\n\n\n\n\n\u201cGood thinking, throwing that egg,\u201d said Briana.\n\n\n\n\n\u201cYes, well, I just had to make it think I threw it,\u201d you say, and show her the serpent egg in your hand. \u201cI just threw the rock I had in my other hand.\u201d\n\n\n\n\nBriana whistled. \u201cThat should fetch some coin from the right merchants. Now, let\u2019s get out of here before that thing comes back.\u201d")
b.ai("RoomRoamingSituation").b9(b,N.av(b),"mountainside_base",c)
return H.b(a.gh())+" successfully performs ThreatenWingedSerpentEggs"},"$3","gT",6,0,2],
V:[function(a,b,c){throw H.c(new P.D("Success chance is 100%"))},"$3","gS",6,0,2],
N:function(a,b){return 1},
gU:function(){return!1},
ak:function(a,b){return"Will you be successful?"},
gR:function(){return},
gO:function(){return"Perhaps you can divert its attention."},
gP:function(){return!1}},
r0:{"^":"a:4;",
$3:function(a,b,c){c.G(0,"After an hour, you find yourself at the limit of your endurance. Thankfully, you find a narrow ledge just a few feet below you. You lower yourself onto the edge and sit, leaning gratefully against the rock face. \n\n\nA few dozen feet below, you can see where the mountainside starts to slope less steeply. Perhaps you have another hour in the descent before you could rest again. \n\n\nBriana joins you, breathing hard from the exertion. \n\n\n\u201cI\u2019d rather the orcs kill us than do it ourselves,\u201d she says when she catches her breath. \u201cI\u2019d also like to stay on this ledge forever, if you don\u2019t mind.\u201d\n\n\nBefore you can reply, you spy something at the corner of your vision. Poking out from a crevice in the cliff side wall are dead leaves, branches, and dry grass. Your exhausted mind wonders about what these would be doing this far up, so you move in to investigate. \n\n\n\u201cIt\u2019s\u2026a nest?\u201d Briana says as you both peer into the crevice. Inside is a clutch of six leathery eggs.\n\n\nWhat manner of creature would build a nest here? You ask yourself. And the answer comes to you at the same time as a loud hissing noise fills the air. \n\n\nA large moss-green serpent adorned with black feathered wings hovers above you. It gives one more warning hiss, then dives to attack.\n\n\nYou must defend yourselves.\n",!0)}},
rb:{"^":"a:4;",
$3:function(a,b,c){c.G(0,"The sheer cliff of the mountainside impedes your progress.\n",!0)}},
qF:{"^":"a:4;",
$3:function(a,b,c){c.G(0,"You leave the dust of the Bloodrock mountain pass for the gentler plateaus of the Aelphremede mountain range. The road crawls along the spine of the mountains all the way to Fort Ironcast, which sits on the horizon like a sleeping sentinel.\n\n\nThe last time you saw this path you were still a child, shaking and crying, being led in chains through the grass by your orc captors. The lights from the distant Fort Ironcast may as well have been on the other side of the world. \n\n\nAnd now you are trudging the opposite way, in a bid to save the people who once failed to save you. \n\n\nA movement to your left catches your eye. You are aghast to see an orc patrol fanning out across the grasslands. \n\n\nWith only moments to act, you and Briana drop down to the grass. The patrol nears you, seemingly unconcerned with their proximity to the Fort. In a few moments they will be upon you.\n\n\nAnd right then you are seized by the presence of an alien power. Your vision blanks out as a dark and terrible voice, sonorous as a cathedral music, speaks in your mind.\n\n\n\u201cStand up.\u201d  \n\n\nYou grit your teeth and moan as the pain explodes in your skull. \u201cAren?\u201d hisses Briana. \u201cAren, what\u2019s wrong?\u201d \n\n\n\u201cGet out of my head!\u201d you moan, clutching at your head even as your legs start to lift you upright. Only Briana\u2019s death grip on your arm keeps you low in the grass. \n\n\nAnd still the voice speaks again, relentless as the sea. \u201cYou are mine,\u201d it says. \u201cYour flesh, your thoughts. Your very desires. You have run a long way, but now you will return home. Now I bid you: stand!\u201d \n\n\n\u201cNo!\u201d Yet another voice pierces your mind: Briana\u2019s. Her word cuts through the haze in your vision like a sunray. The dark voice retreats from your brain. When you come to, you are lying flat on the grass. Briana\u2019s hand is still on your arm, radiating a strange, soothing warmth that leaves you at peace.\n\n\n\u201cWhat did you...\u201d you began, but she clamps her other hand on your mouth. You peers through the grass and see the party of orcs that were passing just a few feet away. Thankfully, none of them have noticed you.\n\n\nWhen they leave, you turn to Briana. \u201cIt\u2019s a gift we fae have,\u201d she said. \u201cWe can sense possession and abjure it, at least temporarily. Seems even half-breeds like me have some talent with it. You feeling better yet?\u201d\n\n\n\u201cMuch,\u201d you reply. \u201cBriana...thanks.\u201d\n\n\n\u201cDon\u2019t mention it. You mind telling me what that...thing in your head was?\u201d\n\n\n\u201cAnother time.\u201d You get up and pull her along. \u201cRun now, talk later. Let\u2019s get to safety.\u201d\n\n\nTogether you jog all the way to the every growing silhouette of Fort Ironcast.\n",!0)}},
qQ:{"^":"a:4;",
$3:function(a,b,c){c.G(0,"A dirt road streaks through the grass. In the distance, a stone fort looms.\n",!0)}},
oY:{"^":"fO;j:a<,I:b<",
Z:function(a){var z=new V.dV(null,null,null)
z.m(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof V.fO))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
y=z==null?y==null:z===y
z=y}else z=!1
return z},
gv:function(a){return Y.R(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)))},
k:function(a){return"TakeOutGateGuardsRescueSituation {id="+J.i(this.a)+",\ntime="+J.i(this.b)+",\n}"}},
dV:{"^":"d;a,b,c",
gj:function(){return this.ga7().b},
gI:function(){return this.ga7().c},
ga7:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.a=null}return this},
m:function(a){this.a=a},
p:function(){var z,y,x
z=this.a
if(z==null){y=this.ga7().b
x=this.ga7().c
z=new V.oY(y,x)
if(y==null)H.f(P.l("id"))
if(x==null)H.f(P.l("time"))}this.m(z)
return z}},
p_:{"^":"fT;j:a<,I:b<",
Z:function(a){var z=new V.dW(null,null,null)
z.m(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof V.fT))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
y=z==null?y==null:z===y
z=y}else z=!1
return z},
gv:function(a){return Y.R(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)))},
k:function(a){return"ThreatenWingedSerpentRescueSituation {id="+J.i(this.a)+",\ntime="+J.i(this.b)+",\n}"}},
dW:{"^":"d;a,b,c",
gj:function(){return this.ga7().b},
gI:function(){return this.ga7().c},
ga7:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.a=null}return this},
m:function(a){this.a=a},
p:function(){var z,y,x
z=this.a
if(z==null){y=this.ga7().b
x=this.ga7().c
z=new V.p_(y,x)
if(y==null)H.f(P.l("id"))
if(x==null)H.f(P.l("time"))}this.m(z)
return z}},
oW:{"^":"fC;j:a<,I:b<",
Z:function(a){var z=new V.dT(null,null,null)
z.m(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof V.fC))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
y=z==null?y==null:z===y
z=y}else z=!1
return z},
gv:function(a){return Y.R(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)))},
k:function(a){return"SootheWingedSerpentRescueSituation {id="+J.i(this.a)+",\ntime="+J.i(this.b)+",\n}"}},
dT:{"^":"d;a,b,c",
gj:function(){return this.ga7().b},
gI:function(){return this.ga7().c},
ga7:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.a=null}return this},
m:function(a){this.a=a},
p:function(){var z,y,x
z=this.a
if(z==null){y=this.ga7().b
x=this.ga7().c
z=new V.oW(y,x)
if(y==null)H.f(P.l("id"))
if(x==null)H.f(P.l("time"))}this.m(z)
return z}}}],["","",,N,{"^":"",
vb:[function(a,b,c){var z,y
z=R.b6(6666,"Agruth",null,null,null,null,0,2,100,!1,2,!0,C.r,0,$.$get$ci())
y=z.x
a.geh().q(0,z)
return U.dk(c,[z],"{rock|cavern} floor",b,P.ab([1,new N.t_(y),3,new N.t0(),5,new N.t1(y),8,new N.t2(y),12,new N.t3(y),17,new N.t4(y)]))},"$3","uv",6,0,14],
vc:[function(a,b,c){var z=[N.ec(),N.hp()]
a.geh().ao(0,z)
return U.dk(c,z,"{rock|cavern} floor",b,P.ay())},"$3","uw",6,0,14],
vd:[function(a,b,c){var z=a.fq("take_out_gate_guards")||a.fq("take_out_gate_guards_rescue")?[N.ec()]:[N.ec(),N.hp()]
a.a.ao(0,z)
return U.dk(c,z,"ground",b,P.ay())},"$3","ux",6,0,14],
av:function(a){return a.geh().aK(0,new N.t7())},
t9:function(a,b){a.a5(N.av(a).gj(),new N.ta(b))},
ev:function(a,b){var z,y
z=H.a6(a.c,"$isbV")
z.toString
y=new M.dZ(null,!1,0)
y.m(z)
a.c=b.$1(y).p()},
hp:function(){return R.b6(1000+$.$get$ed().af(999999),"goblin",O.d5(),null,new G.ca("scimitar",1,1,!0,!1,P.bu(C.p,null)),null,0,1,0,!1,1,!1,C.r,0,$.$get$ci())},
ec:function(){return R.b6(1000+$.$get$ed().af(999999),"orc",O.d5(),null,new G.ca("sword",1,1,!0,!1,P.bu(C.p,null)),null,0,2,0,!1,2,!1,C.r,0,$.$get$ci())},
t_:{"^":"a:7;a",
$2:function(a,b){var z,y,x
z=this.a
y=a.a_(z)
x=new G.ca("scimitar",1,1,!0,!1,P.bu(C.p,null))
y.ah(b,"<subject> {drop<s>|let<s> go of} the whip")
y.aq(b,"<subject> draw<s> <subject's> <object>",x)
a.a5(z,new N.rZ(x))
y.aq(b,"<subject> eye<s> <object> with hatred",N.av(a))}},
rZ:{"^":"a:0;a",
$1:function(a){a.sJ(this.a)
return a}},
t0:{"^":"a:7;",
$2:function(a,b){b.ej()
b.G(0,"<p class='meta'>This fight and the whole adventure is procedurally generated. You can Restart (top left) and see how different choices and random events lead to very different results.</p>",!0)
b.G(0,"\n\n",!0)}},
t1:{"^":"a:7;a",
$2:function(a,b){var z=a.a_(this.a)
b.ej()
z.h7(b,'"I\'ll enjoy gutting you, human," <subject> snarl<s>.',!0)
b.G(0,"\n\n",!0)}},
t2:{"^":"a:7;a",
$2:function(a,b){a.a_(this.a).ah(b,"<subject> spit<s> on the cavern floor")}},
t3:{"^":"a:7;a",
$2:function(a,b){var z=a.a_(this.a)
z.ah(b,"<subject> grit<s> <subject's> teeth")
z.at(b,"<subject> do<es>n't talk any more",!0)}},
t4:{"^":"a:7;a",
$2:function(a,b){a.a_(this.a).ah(b,"<subject> scowl<s> with pure hatred")}},
t7:{"^":"a:0;",
$1:function(a){return a.gH()}},
ta:{"^":"a:0;a",
$1:function(a){var z=a.gb1()
if(typeof z!=="number")return z.a6()
a.sb1(z+this.a)
return a}}}],["","",,O,{"^":"",
va:[function(a){var z,y
z=$.$get$d9()
y=z.A
if(y.length>0){y+=" "
z.A=y}z.A=y+a},"$1","tv",2,0,15],
ve:[function(a){$.em=a},"$1","tw",2,0,15],
hE:[function(a,b,c,d,e,f,g){var z=L.eI(a,!1,!1,d,e,f,g)
$.$get$bN().q(0,z)
return z},function(a){return O.hE(a,!1,!1,null,null,null,null)},function(a,b,c){return O.hE(a,!1,!1,null,b,c,null)},"$7$deferToChoiceList$deferToEndOfPage$goto$helpMessage$script$submenu","$1","$3$helpMessage$script","tu",2,13,50,0,0,0,1,1,0],
mG:{"^":"mS;",
bm:function(){var z=0,y=P.ax(),x,w=2,v,u=[],t=this,s,r,q,p,o,n,m,l,k,j
var $async$bm=P.at(function(a,b){if(a===1){v=b
z=w}while(true)switch(z){case 0:if($.cT){n=t.Q
n.toString
m=new A.t(667,null,null,null,null)
m.c="Sending updated stats."
n.a.D(m.B())
m=t.Q
n=Z.nu()
m.toString
l=new A.t(100,null,null,null,null)
l.e=n.B()
m.a.D(l.B())
new P.E(0,$.p,null,[null]).bq(!0)}if(t.r){n=t.Q
n.toString
m=new A.t(667,null,null,null,null)
m.c="Saving player chronology."
n.a.D(m.B())
t.r=!1
m=t.Q
m.toString
n=new A.t(60,null,null,null,null)
n.b=t.f.cd(0)
m.a.D(n.B())}s=null
case 3:n=t.Q
n.toString
m=new A.t(667,null,null,null,null)
m.c="Calling _goOneStep()."
n.a.D(m.B())
w=7
z=10
return P.as(t.co(),$async$bm)
case 10:s=b
w=2
z=9
break
case 7:w=6
j=v
n=H.z(j)
if(n instanceof M.cs){r=n
q=H.A(j)
n=t.Q
m=H.b(r)+"\nStacktrace: "+H.b(q)
n.toString
l=new A.t(666,null,null,null,null)
l.c="AuthorScriptException: "+m
n.a.D(l.B())
z=1
break}else{p=n
o=H.A(j)
n=t.Q
m=H.b(p)+"\nStacktrace: "+H.b(o)
n.toString
l=new A.t(666,null,null,null,null)
l.c="Unknown Error (probably in egamebook itself): "+m
n.a.D(l.B())
z=1
break}z=9
break
case 6:z=2
break
case 9:case 4:if(J.h(s,!1)){z=3
break}case 5:n=t.Q
n.toString
m=new A.t(667,null,null,null,null)
m.c="Ending _goOneStep() loop."
n.a.D(m.B())
case 1:return P.aC(x,y)
case 2:return P.aB(v,y)}})
return P.aD($async$bm,y)},
eF:function(){var z,y
this.fb()
this.f.aZ(0)
this.r=!0
this.e=this.c
z=this.Q
Z.h6(Z.bE())
z.toString
y=new A.t(90,null,null,null,null)
y.b=Z.bE()
z.a.D(y.B())
this.bm()},
kS:[function(a){var z,y
z={}
z.a=null
y=$.$get$bN()
y.L(0,new O.n2(z,this,a))
z=z.a
if(z==null)throw H.c(P.C("The sent choice hash ("+H.b(a)+") is not one of those offered ("+J.i(y)+")"))
this.iy(z)
this.bm()},"$1","gii",2,0,32],
iy:function(a){var z
if(a.gfK()!=null){z=a.r
$.$get$cg().ax(z)}z=a.x
if(z!=null)this.ed(z)},
co:function(){var z=0,y=P.ax(),x,w=[],v=this,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c
var $async$co=P.at(function(a,a0){if(a===1)return P.aB(a0,y)
while(true)switch(z){case 0:u={}
r=$.$get$ch()
q=r.b
if(q.b!==q.c){u=v.Q
u.toString
q=new A.t(667,null,null,null,null)
q.c="Awarding points."
u.a.D(q.B())
p=r.b.dw()
r=v.Q
q=p.gj6()
u=p.b
o=p.c
r.toString
n=new A.t(70,null,null,null,null)
n.b=[q,u]
n.c=o
r.a.D(n.B())
r=new P.E(0,$.p,null,[null])
r.bq(null)
r.bV(new O.mT(v))
x=!0
z=1
break}m=v.x===v.e.gau().length-1||v.x===v.y
u.a=m
r=v.x
q=v.y
if(r!==q)if(r!=null){if(r<v.e.gau().length){r=v.e.gau()
o=v.x
if(o>>>0!==o||o>=r.length){x=H.e(r,o)
z=1
break}o=!!J.n(r[o]).$isL
r=o}else r=!1
l=r}else l=!1
else l=!1
r="atEndOfPage = "+m+", atStaticChoiceList = "+l
o=v.Q
o.toString
k=new A.t(667,null,null,null,null)
k.c=r
o.a.D(k.B())
k=$.$get$bN()
k.ie(new O.mU(v),!1)
if(k.gl(k)!==0){r=v.Q
r.toString
o=new A.t(667,null,null,null,null)
o.c="We have choices."
r.a.D(o.B())
o=H.x(k,"b_",0)
o=P.T(new H.K(k,new O.mV(u,l),[o]),!0,o)
r=k.a
H.r([],[L.a4])
j=new L.eJ(r,o)
if(!j.gK(j)){u=v.Q
r=u.e
if(r!=null){r.dj(new D.bT("Showing new choice before previous one was selected."))
u.e=null}r=P.u
u.e=new P.cb(new P.E(0,$.p,null,[r]),[r])
r=j.dB()
u.a.D(r.B())
u=u.e.a.bV(v.gii())
i=new O.mW(v)
r=H.m(u,0)
q=$.p
if(q!==C.f){i=P.ee(i,q)
q.toString}u.d3(new P.e5(null,new P.E(0,q,null,[r]),6,new O.mX(),i,[r,r]))
x=!0
z=1
break}else{h=k.b6(0,new O.mY(),new O.mZ())
if(h!=null){if(h.gfK()!=null){r=h.r
$.$get$cg().ax(r)}r=h.x
if(r!=null)v.ed(r)
k.a8(0,h)}}}r=$.$get$cg()
o=r.b
g=r.c
z=o!==g?3:4
break
case 3:++r.d
u=r.a
q=u.length
g=(g-1&q-1)>>>0
r.c=g
if(g<0||g>=q){x=H.e(u,g)
z=1
break}f=u[g]
u[g]=null
z=5
return P.as(v.cp(f),$async$co)
case 5:x=a0
z=1
break
case 4:r=$.em
if(r!=null){v.ed(r)
$.em=null
x=!1
z=1
break}r=v.x
if(r==null){v.x=0
r=0}else if(r===q){r=v.e.gau().length-1
v.x=r}else if($.hs)$.hs=!1
else{++r
v.x=r}u.a=r===v.e.gau().length-1
r="Resolving block: '"+H.b(v.e.gh())+"' block "+H.b(v.x)+"."
q=v.Q
q.toString
o=new A.t(667,null,null,null,null)
o.c=r
q.a.D(o.B())
if(v.x===v.e.gau().length){u=v.Q
u.toString
r=new A.t(667,null,null,null,null)
r.c="End of book."
u.a.D(r.B())
r=v.Q
u=v.dW()
r.toString
u=u.eI(50)
r.a.D(u.B())
v.Q.a.D(new A.t(80,null,null,null,null).B())
x=!0
z=1
break}r=v.e.gau()
q=v.x
if(q>>>0!==q||q>=r.length){x=H.e(r,q)
z=1
break}q=r[q]
z=typeof q==="string"?6:8
break
case 6:u=v.Q
r=v.e.gau()
q=v.x
if(q>>>0!==q||q>=r.length){x=H.e(r,q)
z=1
break}q=r[q]
r=P.Y
u.f=new P.cb(new P.E(0,$.p,null,[r]),[r])
r=new A.t(30,null,null,null,null)
r.c=q
u.a.D(r.B())
u.f.a.bV(new O.n_(v))
x=!0
z=1
break
z=7
break
case 8:r=v.e.gau()
q=v.x
if(q>>>0!==q||q>=r.length){x=H.e(r,q)
z=1
break}z=!!J.n(r[q]).$isL?9:11
break
case 9:r=v.Q
r.toString
q=new A.t(667,null,null,null,null)
q.c="A ChoiceList encountered."
r.a.D(q.B())
try{r=v.e.gau()
q=v.x
if(q>>>0!==q||q>=r.length){x=H.e(r,q)
z=1
break}k.j4(r[q])}catch(b){u=H.z(b)
if(u instanceof M.cs){t=u
s=H.A(b)
u=v.Q
r=H.b(t)+"\nStacktrace: "+H.b(s)
u.toString
q=new A.t(666,null,null,null,null)
q.c="AuthorScriptException: "+r
u.a.D(q.B())
x=!0
z=1
break}else throw b}r=v.Q
r.toString
q=new A.t(667,null,null,null,null)
q.c="- choices added"
r.a.D(q.B())
if(k.bO(0,new O.n0(u,v))&&v.x===v.e.gau().length-1){u=v.Q
u.toString
r=new A.t(667,null,null,null,null)
r.c="Creating & sending savegame"
u.a.D(r.B())
r=v.Q
u=v.dW()
r.toString
u=u.eI(50)
r.a.D(u.B())
x=!1
z=1
break}x=!1
z=1
break
z=10
break
case 11:r=v.e.gau()
q=v.x
if(q>>>0!==q||q>=r.length){x=H.e(r,q)
z=1
break}q=r[q]
r={func:1,ret:[P.N,P.ao]}
z=H.au(q,r)?12:14
break
case 12:d=v.x===v.e.gau().length-1?v.dW():null
q=v.e.gau()
o=v.x
if(o>>>0!==o||o>=q.length){x=H.e(q,o)
z=1
break}z=15
return P.as(v.cp(H.hM(q[o],r)),$async$co)
case 15:c=a0
if(k.bO(0,new O.n1(u,v))&&v.x===v.e.gau().length-1){u=v.Q
u.toString
r=d.eI(50)
u.a.D(r.B())}x=c
z=1
break
z=13
break
case 14:u=v.e.gau()
r=v.x
if(r>>>0!==r||r>=u.length){x=H.e(u,r)
z=1
break}throw H.c(new P.D("Invalid block: "+H.b(u[r])))
case 13:case 10:case 7:case 1:return P.aC(x,y)}})
return P.aD($async$co,y)},
ed:function(a){var z,y,x,w,v
z=$.$get$cw()
if(z.b.test(H.bo(a))){y=this.d
if(y==null)throw H.c(new P.D("Cannot use ["+J.i(z)+"] when there is no _preGotoPosition."))
x=y.a
z=y.b
if(typeof z!=="number")return z.aw()
w=z-1}else{x=this.b.dH(a,this.e.gdJ())
if(x==null)throw H.c("Function goto() called with an invalid argument '"+H.b(a)+"'. No such page.")
w=null}z=this.d
y=z==null
if((y?null:z.a)!=null){z=y?null:z.a
y=this.e
this.f.q(0,H.b(z.gh())+">>"+H.b(y.gh()))
this.r=!0}if(this.f.a1(0,H.b(this.e.gh())+">>"+H.b(x.gh()))||x.ghj()){z=this.d
y=z==null
if((y?null:z.a)!=null)z=!(y?null:z.a).ghj()
else z=!1}else z=!1
$.hq=z
z="Points embargo = "+z
y=this.Q
y.toString
v=new A.t(667,null,null,null,null)
v.c=z
y.a.D(v.B())
v=this.e
this.d=new O.mH(v,this.x)
this.e=x
this.x=w
v.e=J.am(v.gdC(),1)},
fb:function(){var z,y,x,w,v,u
this.x=null
$.$get$cg().aZ(0)
$.$get$bN().sl(0,0)
$.ql=null
x=$.$get$cl()
x.aZ(0)
w=$.$get$ch()
x.n(0,"points",w)
w.a=0
w.b.aZ(0)
this.b.j9()
$.hV=!0
try{this.jM()}catch(v){z=H.z(v)
y=H.A(v)
x=this.Q
w=H.b(z)+"\n"+H.b(y)
x.toString
u=new A.t(666,null,null,null,null)
u.c="Author Exception in initBlock() (<variables>): "+w
x.a.D(u.B())
throw H.c(z)}this.h4()
$.hV=!1},
cp:function(a){var z=0,y=P.ax(),x,w=2,v,u=[],t=this,s,r,q,p,o,n,m
var $async$cp=P.at(function(b,c){if(b===1){v=c
z=w}while(true)switch(z){case 0:q=$.$get$d9()
q.A=""
w=4
z=7
return P.as(a.$0(),$async$cp)
case 7:w=2
z=6
break
case 4:w=3
m=v
s=H.z(m)
r=H.A(m)
q.A+="<code><pre>ERROR: "+H.b(s)+"\n\n"+H.b(r)+"</pre></code>"
q=J.i(s)
o=t.e.gh()
n=t.x
throw H.c(new M.cs(q,o,n))
z=6
break
case 3:z=2
break
case 6:if(q.A.length!==0){t.Q.eP(J.i(q)).bV(new O.n3(t))
x=!0
z=1
break}else{x=!1
z=1
break}case 1:return P.aC(x,y)
case 2:return P.aB(v,y)}})
return P.aD($async$cp,y)},
iq:[function(a){var z,y,x,w
z=a.x
if(z==null)return!1
if($.$get$cw().b.test(H.bo(z)))return!1
y=this.b.dH(z,this.e.gdJ())
if(y==null){z="Target page '"+H.b(z)+"' was not found."
x=this.Q
x.toString
w=new A.t(667,null,null,null,null)
w.c=z
x.a.D(w.B())
return!0}y.gkJ()
return!1},"$1","gff",2,0,43],
dW:function(){var z,y,x,w,v,u
this.h4()
try{x=this.e.gh()
w=$.$get$cl()
x=new Z.fs(x,this.b.ju(),null,null,null,null)
x.c=H.aF(Z.cP(w),"$isF",[P.q,P.d],"$asF")
x.f=Date.now()
x.e=C.d.kG(H.az(x),16)
return x}catch(v){z=H.z(v)
y=H.A(v)
x=this.Q
w=H.b(z)+"\n"+H.b(y)
x.toString
u=new A.t(666,null,null,null,null)
u.c="Error when creating savegame: "+w
x.a.D(u.B())
throw H.c(z)}},
fU:function(a,b){var z,y,x
this.fb()
z=this.b
y=z.a
if(y.i(0,a.a)==null)throw H.c(new Z.dl("Trying to load page '"+H.b(a.a)+"' which doesn't exist in current egamebook."))
this.e=y.i(0,a.a)
this.x=this.y
y=this.Q
y.toString
x=new A.t(667,null,null,null,null)
x.c="Importing state from savegame."
y.a.D(x.B())
z.jJ(a.b)
if(b!=null){z=this.Q
z.toString
y=new A.t(667,null,null,null,null)
y.c="Importing player chronology."
z.a.D(y.B())
this.f.ao(0,b)}z=this.Q
z.toString
y=new A.t(667,null,null,null,null)
y.c="Copying save variables into vars."
z.a.D(y.B())
y=$.$get$cl()
Z.mD(a,y,P.du(P.q,P.bt))
this.cx=H.a6(y.i(0,"game"),"$iseP")
this.cy=H.aF(y.i(0,"hitpoints"),"$isaq",[P.aO],"$asaq")
z=[P.u]
this.db=H.aF(y.i(0,"stamina"),"$isaq",z,"$asaq")
this.dx=H.aF(y.i(0,"gold"),"$isaq",z,"$asaq")
z=this.Q
Z.h6(Z.bE())
z.toString
y=new A.t(90,null,null,null,null)
y.b=Z.bE()
z.a.D(y.B())
y=this.Q
y.toString
z=new A.t(667,null,null,null,null)
z.c="loadFromSaveGame() done."
y.a.D(z.B())
this.bm()},
k6:function(a){return this.fU(a,null)},
dL:[function(a,b,c,d){var z=0,y=P.ax(),x,w=this,v,u,t
var $async$dL=P.at(function(e,f){if(e===1)return P.aB(f,y)
while(true)switch(z){case 0:v=$.$get$d9()
if(v.A.length!==0){w.Q.eP(J.i(v))
v.A=""}v=w.Q
v.toString
u=new A.t(130,null,null,null,null)
u.b=[a,b,d,c]
v.a.D(u.B())
u=U.c8
t=new P.E(0,$.p,null,[u])
v.x=new P.cb(t,[u])
x=t
z=1
break
case 1:return P.aC(x,y)}})
return P.aD($async$dL,y)},function(a,b){return this.dL(a,b,null,!1)},"kO","$4$rerollEffectDescription$rerollable","$2","ghE",4,5,34,1,0]},
n2:{"^":"a:0;a,b,c",
$1:function(a){var z,y,x,w
a.seQ(!0)
if(a.d===this.c){z="Found choice that was selected: "+a.e
y=this.b.Q
y.toString
x=new A.t(667,null,null,null,null)
x.c=z
y.a.D(x.B())
this.a.a=a}else{z=a.x
if(z!=null){y=this.b
w=$.$get$cw().b.test(H.bo(z))?y.d.a:y.b.dH(z,y.e.gdJ())
if(w!=null){y.f.q(0,H.b(y.e.gh())+">>"+H.b(w.gh()))
y.r=!0}}}}},
mT:{"^":"a:0;a",
$1:function(a){return this.a.bm()}},
mU:{"^":"a:0;a",
$1:function(a){return a.geQ()||this.a.iq(a)}},
mV:{"^":"a:35;a,b",
$1:function(a){return a.jT(this.b,this.a.a)}},
mW:{"^":"a:0;a",
$1:function(a){var z,y,x
z=H.b(a)
y=this.a.Q
y.toString
x=new A.t(667,null,null,null,null)
x.c=z
y.a.D(x.B())
return}},
mX:{"^":"a:0;",
$1:function(a){return a instanceof D.bT}},
mY:{"^":"a:0;",
$1:function(a){return a.gjU()}},
mZ:{"^":"a:1;",
$0:function(){return}},
n_:{"^":"a:0;a",
$1:function(a){return this.a.bm()}},
n0:{"^":"a:0;a,b",
$1:function(a){return a.dm(!0,this.a.a,this.b.gff())}},
n1:{"^":"a:0;a,b",
$1:function(a){return a.dm(!0,this.a.a,this.b.gff())}},
n3:{"^":"a:0;a",
$1:function(a){return this.a.bm()}},
m1:{"^":"d;a,b,fE:c<",
iW:function(a,b,c){var z
if(!$.hq){z=J.am(this.a,b)
this.a=z
this.b.ax(new A.cJ(b,z,c))}},
q:function(a,b){return this.iW(a,b,null)},
a6:function(a,b){this.q(0,b)
return this},
B:function(){return P.ab(["points",this.a])},
hi:function(a){this.a=a.i(0,"points")
this.b.aZ(0)},
hO:function(){this.b=P.b0(null,A.cJ)},
$isdQ:1},
cQ:{"^":"lL;au:d<,dC:e@,a,b,c",
ghj:function(){return J.a3(this.e,0)}},
mH:{"^":"d;a,b"},
mO:{"^":"d;a",
i:function(a,b){return this.a.i(0,b)},
dH:function(a,b){var z
if(b!=null&&this.a.a2(b+": "+H.b(a)))return this.a.i(0,H.b(b)+": "+H.b(a))
else{z=this.a
if(z.a2(a))return z.i(0,a)
else return}},
n:function(a,b,c){this.a.n(0,b,c)
c.sh(b)},
ju:function(){var z=new H.O(0,null,null,null,null,null,0,[P.q,null])
this.a.L(0,new O.mQ(z))
return z},
jJ:function(a){a.L(0,new O.mR(this))},
j9:function(){this.a.L(0,new O.mP())}},
mQ:{"^":"a:7;a",
$2:function(a,b){this.a.n(0,a,P.ab(["visitCount",b.gdC()]))}},
mR:{"^":"a:7;a",
$2:function(a,b){var z=this.a.a
if(z.a2(a))z.i(0,a).sdC(J.aw(b,"visitCount"))}},
mP:{"^":"a:7;",
$2:function(a,b){b.sdC(0)}}}],["","",,M,{"^":"",cs:{"^":"d;a,b,c",
k:function(a){return"AuthorScriptException at page '"+H.b(this.b)+"', block #"+H.b(this.c)+": "+H.b(this.a)},
w:{
eC:function(a){return new M.cs(a,null,null)}}}}],["","",,M,{"^":"",mS:{"^":"d;"}}],["","",,Z,{"^":"",fs:{"^":"d;a,b,c,d,e,f",
eI:function(a){var z
if(a!==50&&a!==1020)throw H.c("Cannot create Message of type "+a+". Can only be MSG_SAVE_GAME (50) or MSG_LOAD_GAME (1020).")
z=new A.t(a,null,null,null,null)
z.c=this.dA()
return z},
dA:function(){var z,y
z=new H.O(0,null,null,null,null,null,0,[P.q,null])
z.n(0,"uid",this.e)
z.n(0,"currentPageName",this.a)
z.n(0,"pageMapState",this.b)
z.n(0,"vars",this.c)
z.n(0,"timestamp",this.f)
y=this.d
if(y!=null)z.n(0,"previousText",y)
return C.v.fI(z)},
k:function(a){return this.dA()},
w:{
ft:function(a){var z,y
if(a!=null)if(typeof a!=="string"){if(typeof a!=="number"||Math.floor(a)!==a)if(typeof a!=="number")if(typeof a!=="boolean"){z=J.n(a)
z=!!z.$isL||!!z.$isF}else z=!0
else z=!0
else z=!0
y=z}else y=!0
else y=!0
if(y)return!0
return!!J.n(a).$isdQ},
cP:function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"&&Math.floor(a)===a||typeof a==="number"||typeof a==="boolean")return a
else{z=J.n(a)
if(!!z.$isL){y=[]
for(x=0;x<z.gl(a);++x)if(Z.ft(z.i(a,x)))y.push(Z.cP(z.i(a,x)))
return y}else if(!!z.$isF){w=new H.O(0,null,null,null,null,null,0,[null,null])
z.L(a,new Z.mC(a,w))
return w}else if(!!z.$isdQ){v=a.B()
v.n(0,"_class",a.gfE())
return Z.cP(v)}else throw H.c("Function _dissolveToPrimitivess called with a non-saveable argument type.")}},
cO:function(a,b,c){var z,y,x,w,v,u
if(a==null||typeof a==="string"||typeof a==="number"&&Math.floor(a)===a||typeof a==="number"||typeof a==="boolean")return a
else{z=J.n(a)
if(!!z.$isL){y=[]
for(x=0;x<z.gl(a);++x)y.push(Z.cO(z.i(a,x),b,null))
return y}else{w=!!z.$isF
if(w&&!a.a2("_class")){v=new H.O(0,null,null,null,null,null,0,[null,null])
z.L(a,new Z.mB(b,v))
return v}else if(w&&a.a2("_class"))if(c!=null){c.hi(a)
return c}else{u=z.i(a,"_class")
if(!b.a2(u))throw H.c(new Z.dl("Constructor for "+H.b(u)+" not set. Cannot assemble a new instance."))
else return b.i(0,u).$1(a)}else throw H.c("Function _assembleFromPrimitives called with a non-primitive argument type.")}}},
mD:function(a,b,c){a.c.L(0,new Z.mE(b,c))}}},mC:{"^":"a:7;a,b",
$2:function(a,b){if(Z.ft(this.a.i(0,a)))this.b.n(0,a,Z.cP(b))}},mB:{"^":"a:7;a,b",
$2:function(a,b){this.b.n(0,a,Z.cO(b,this.a,null))}},mE:{"^":"a:36;a,b",
$2:function(a,b){var z,y,x
z=this.a
y=z.i(0,a)
x=this.b
if(y==null)z.n(0,a,Z.cO(b,x,null))
else z.n(0,a,Z.cO(b,x,y))}},dl:{"^":"d;a",
k:function(a){return"IncompatibleSavegameException: "+this.a}},kS:{"^":"d;a",
k:function(a){return"InvalidSavegameException: "+this.a}}}],["","",,D,{"^":"",m7:{"^":"d;"},m6:{"^":"m7;"},l_:{"^":"m6;a,b,c,d,e,f,r,x",
kW:[function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
o=P.q
n=[o,P.d]
H.aF(a,"$isF",n,"$asF")
m=new A.t(a.i(0,"type"),null,null,null,null)
if(a.a2("strContent"))m.c=a.i(0,"strContent")
if(a.a2("listContent"))m.b=a.i(0,"listContent")
if(a.a2("intContent"))m.d=a.i(0,"intContent")
if(a.a2("mapContent"))m.e=H.aF(a.i(0,"mapContent"),"$isF",n,"$asF")
z=m
switch(z.ghg()){case 1070:o=this.e
if(o!=null){o.dj(new D.bT("Book Quit before choice was selected."))
this.e=null}o=this.b
o.a.bf()
o.b.bf()
return
case 1000:o=new A.t(667,null,null,null,null)
o.c="GET_BOOK_UID received."
n=this.a
n.D(o.B())
n.D(new A.t(10,null,this.c.ch,null,null).B())
return
case 1050:l=z.gjN()
this.e.bP(l)
this.e=null
return
case 1060:o=new A.t(667,null,null,null,null)
o.c="New form state from player received."
this.a.D(o.B())
o=z.gk8()
if(!o.a2("__submitted__"))o.n(0,"__submitted__",!1)
n=this.r
if(n.b>=4)H.f(n.cj())
n.bK(new G.jG(o))
return
case 1080:o=new A.t(667,null,null,null,null)
o.c="Received slot machine result."
this.a.D(o.B())
k=J.aw(z.geA(),0)
j=J.aw(z.geA(),1)
o=this.x
if(k>>>0!==k||k>=4)return H.e(C.A,k)
o.bP(new U.c8(C.A[k],j))
this.x=null
return
case 1010:o=new A.t(667,null,null,null,null)
o.c="Starting book from scratch."
n=this.a
n.D(o.B())
o=this.e
if(o!=null){o.dj(new D.bT("Book Restart before choice was selected."))
this.e=null}try{this.c.eF()}catch(i){y=H.z(i)
x=H.A(i)
o=new A.t(666,null,null,null,null)
o.c="An error occured when initializing: "+H.b(y)+".\n"+H.b(x)
n.D(o.B())
throw H.c(y)}o=new A.t(90,null,null,null,null)
o.b=Z.bE()
n.D(o.B())
n.D(new A.cJ(0,0,null).dB().B())
return
case 1020:h=new A.t(667,null,null,null,null)
h.c="Loading a saved game."
g=this.a
g.D(h.B())
h=this.e
if(h!=null){h.dj(new D.bT("Book Load before choice was selected."))
this.e=null}try{h=z.ghI()
f=new Z.fs(null,null,null,null,null,null)
e=H.aF(C.v.jg(h),"$isF",n,"$asF")
if(!e.a2("currentPageName")||!e.a2("vars"))H.f(new Z.kS("Invalid JSON for Savegame. Doesn't contain required fields 'currentPageName' or 'vars'. JSON='"+H.b(h)+"'."))
f.e=e.i(0,"uid")
f.a=e.i(0,"currentPageName")
f.f=e.i(0,"timestamp")
f.b=H.aF(e.i(0,"pageMapState"),"$isF",n,"$asF")
f.c=H.aF(e.i(0,"vars"),"$isF",n,"$asF")
if(e.a2("previousText"))f.d=e.i(0,"previousText")
w=f
v=H.aF(J.ix(z.geA()),"$isbA",[o],"$asbA")
o=this.c
if(v!=null)o.fU(w,v)
else o.k6(w)}catch(i){o=H.z(i)
if(o instanceof Z.dl){u=o
t=H.A(i)
o=new A.t(666,null,null,null,null)
o.c="Load failed due to incompatibility: "+H.b(u)+".\n"+H.b(t)
g.D(o.B())
this.c.eF()}else{s=o
r=H.A(i)
o=new A.t(666,null,null,null,null)
o.c="Load failed for unknown reason: "+H.b(s)+".\n"+H.b(r)
g.D(o.B())
this.c.eF()}}try{o=new A.t(90,null,null,null,null)
o.b=Z.bE()
g.D(o.B())}catch(i){q=H.z(i)
p=H.A(i)
o=new A.t(666,null,null,null,null)
o.c="Sending Stats failed for unknown reason: "+H.b(q)+".\n"+H.b(p)
g.D(o.B())
throw H.c(q)}this.c.toString
g.D(new A.cJ(0,$.$get$ch().a,null).dB().B())
return
case 1090:this.f.bP(!0)
this.f=null
return
case 1040:this.c.bm()
return
default:o=new A.t(666,null,null,null,null)
o.c="Wrong message type received by Scripter - "+H.b(z.ghg())+"."
this.a.D(o.B())}},"$1","giw",2,0,20],
eP:function(a){var z=P.Y
this.f=new P.cb(new P.E(0,$.p,null,[z]),[z])
z=new A.t(30,null,null,null,null)
z.c=a
this.a.D(z.B())
return this.f.a}},bT:{"^":"d;a",
k:function(a){return"AsyncOperationOverridenException: "+this.a+"."}}}],["","",,G,{"^":"",jG:{"^":"d;a",
B:function(){return P.c2(this.a,null,null)},
k:function(a){return"<CurrentState submitted="+H.b(this.a.i(0,"__submitted__"))+">"}}}],["","",,A,{"^":"",t:{"^":"d;hg:a<,eA:b<,hI:c<,jN:d<,k8:e<",
gkI:function(){var z=this.a
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
dA:function(){return C.v.fI(this.B())},
B:function(){var z,y
z=new H.O(0,null,null,null,null,null,0,[P.q,P.d])
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
z="Message "+this.gkI()
y=this.a
x=J.n(y)
return z+(x.u(y,50)||x.u(y,60)||x.u(y,90)||x.u(y,100)||x.u(y,666)||x.u(y,667)?" (async)":"")}}}],["","",,E,{"^":"",lL:{"^":"d;h:a@,kJ:b<",
k:function(a){return this.a},
gdJ:function(){var z,y
z=this.a
if(z==null)throw H.c("Accessed groupName Page has name = null.")
y=J.is(z,": ")
if(y>0)return J.iw(this.a,0,y)
else return}}}],["","",,A,{"^":"",cJ:{"^":"d;j6:a<,b,c",
k:function(a){var z="Score +"+H.b(this.a)+"."
return z},
dB:function(){var z=new A.t(70,null,null,null,null)
z.b=[this.a,this.b]
z.c=this.c
return z}}}],["","",,L,{"^":"",a4:{"^":"d;eQ:a@,b,c,d,aR:e<,O:f<,fK:r<,x,y",
gjU:function(){return this.e.length===0},
dm:function(a,b,c){if(this.a)return!1
if(this.e.length===0)return!1
b!=null
a!=null
if(c!=null&&c.$1(this)===!0)return!1
return!0},
jT:function(a,b){return this.dm(a,b,null)},
kE:function(){return P.ab(["string",this.e,"hash",this.d,"submenu",this.y,"helpMessage",this.f])},
bV:function(a){this.r=a
return this},
bs:function(a,b){return C.b.bs(this.e,b.gaR())},
k:function(a){return"Choice: "+this.e+" ["+H.b(this.x)+"] ("+this.d+")"},
hL:function(a,b,c,d,e,f,g){if(a==null)throw H.c(P.C("String given to choice cannot be null."))
this.e=J.b5(a).eJ(a)
this.d=C.b.gv(a)
this.r=f
this.b=!1
this.c=!1},
$isS:1,
$asS:function(){return[L.a4]},
w:{
eI:function(a,b,c,d,e,f,g){var z=new L.a4(!1,null,null,null,null,e,null,d,g)
z.hL(a,!1,!1,d,e,f,g)
return z}}},eJ:{"^":"f4;a,b",
gl:function(a){return this.b.length},
sl:function(a,b){C.a.sl(this.b,b)
return b},
i:function(a,b){var z=this.b
if(b>>>0!==b||b>=z.length)return H.e(z,b)
return z[b]},
n:function(a,b,c){var z=this.b
if(b>>>0!==b||b>=z.length)return H.e(z,b)
z[b]=c},
j4:function(a){var z,y,x,w,v,u,t,s,r,q,p,o
if(J.aw(a,0)!=null){if(0>=a.length)return H.e(a,0)
v=!!J.n(a[0]).$isbt}else v=!1
if(v)try{if(0>=a.length)return H.e(a,0)
this.a=a[0].$0()}catch(u){z=H.z(u)
v=M.eC(J.i(z))
throw H.c(v)}else this.a=null
for(v=this.b,t={func:1,ret:[P.N,P.ao]},s=1;s<a.length;++s){y=a[s]
x=null
if(J.aw(y,"string")!=null&&!!J.n(J.aw(y,"string")).$isbt)try{x=J.aw(y,"string").$0()}catch(u){w=H.z(u)
v=M.eC(J.i(w))
throw H.c(v)}else x=""
r=x
q=J.aw(y,"goto")
p=H.hM(J.aw(y,"script"),t)
o=new L.a4(!1,null,null,null,null,null,null,q,J.aw(y,"submenu"))
if(r==null)H.f(P.C("String given to choice cannot be null."))
o.e=J.b5(r).eJ(r)
o.d=C.b.gv(r)
o.r=p
o.b=!1
o.c=!1
C.a.q(v,o)}},
j0:function(a,b,c,d,e,f,g){if(b instanceof L.a4)C.a.q(this.b,b)
else if(typeof b==="string")C.a.q(this.b,L.eI(b,!1,!1,e,null,f,g))
else throw H.c(P.C("To add a choice to choices, one must provide either a new Choice element or a String."))},
q:function(a,b){return this.j0(a,b,!1,!1,null,null,null)},
kF:function(a,b,c,d){var z,y,x,w
z=this.b
y=H.m(z,0)
x=P.T(new H.K(z,new L.jk(b,a,c),[y]),!0,y)
if(x.length===0)throw H.c("Choices is empty, but still choices.toMessage was called.")
w=new A.t(40,null,null,null,null)
z=[]
w.b=z
z.push(d)
z.push(this.a)
C.a.L(x,new L.jl(w))
return w},
dB:function(){return this.kF(null,null,null,null)},
k:function(a){var z=this.b
return new H.aj(z,new L.jm(),[H.m(z,0),null]).cH(0,", ")},
$asf4:function(){return[L.a4]},
$asfa:function(){return[L.a4]},
$asL:function(){return[L.a4]},
$asV:function(){return[L.a4]}},jk:{"^":"a:0;a,b,c",
$1:function(a){return a.dm(this.b,this.a,this.c)}},jl:{"^":"a:0;a",
$1:function(a){H.b(a)
J.aQ(this.a.b,a.kE())
a.a=!0}},jm:{"^":"a:0;",
$1:function(a){return H.b(a)}}}],["","",,Z,{"^":"",cR:{"^":"d;d1:a<,aR:b<",
B:function(){return P.ab(["show",this.a,"string",this.b])}},nr:{"^":"d;a",
B:function(){var z=new H.O(0,null,null,null,null,null,0,[P.q,P.d])
this.a.L(0,new Z.ns(z))
return z},
L:function(a,b){this.a.L(0,b)}},ns:{"^":"a:37;a",
$2:function(a,b){this.a.n(0,a,b.B())}},h5:{"^":"d;h:a@,b4:b<,fF:c<,du:d<,d1:e<,fZ:f<,aR:r<",w:{
h6:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=H.r(new Array(a.length),[Z.h5])
for(y=a.length,x=z.length,w=0,v=0;v<a.length;a.length===y||(0,H.al)(a),++v){u=a[v]
t=J.H(u)
s=t.i(u,"name")
r=t.i(u,"description")
q=t.i(u,"color")
p=t.i(u,"priority")
o=t.i(u,"show")
n=t.i(u,"notifyOnChange")
t=t.i(u,"string")
if(w>=x)return H.e(z,w)
z[w]=new Z.h5(s,r,q,p,o,n,t);++w}C.a.cg(z,new Z.ou())
return z}}},ou:{"^":"a:7;",
$2:function(a,b){return J.bq(b.gdu(),a.gdu())}},aq:{"^":"d;h:a<,b4:b<,c,fF:d<,du:e<,f,r,fZ:x<,fC:y@,fE:z<,$ti",
ga9:function(){return this.f},
sa9:function(a){if(!J.h(this.f,a)){this.f=a
this.y=!0
$.cT=!0}},
gd1:function(){return this.r},
gaR:function(){return this.c.$1(this.f)},
B:function(){return P.ab(["name",this.a,"value",this.f,"show",this.r])},
hi:function(a){var z
this.sa9(H.ib(a.i(0,"value"),H.m(this,0)))
z=a.i(0,"show")
if(!J.h(this.r,z)){this.r=z
this.y=!0
$.cT=!0}},
$isdQ:1,
w:{
bD:function(a,b,c,d,e,f,g,h){var z,y
z=$.$get$cS()
y=z.a2(a)?H.aF(z.i(0,a),"$isaq",[h],"$asaq"):new Z.aq(a,d,b,c,f,null,null,!0,!1,"Stat",[null])
y.f=H.ib(e,h)
y.r=!0
z.n(0,a,y)
return y},
nu:function(){var z,y
z=new Z.nr(new H.O(0,null,null,null,null,null,0,[P.q,Z.cR]))
y=$.$get$cS().gce()
new H.K(y,new Z.nv(),[H.x(y,"y",0)]).L(0,new Z.nw(z))
$.cT=!1
return z},
bE:function(){var z=H.r([],[[P.F,P.q,P.d]])
$.$get$cS().gce().L(0,new Z.nt(z))
return z}}},nv:{"^":"a:0;",
$1:function(a){return a.gfC()}},nw:{"^":"a:25;a",
$1:function(a){var z,y
z=a.gd1()
y=a.gaR()
a.sfC(!1)
this.a.a.n(0,a.a,new Z.cR(z,y))}},nt:{"^":"a:25;a",
$1:function(a){var z=new H.O(0,null,null,null,null,null,0,[P.q,P.d])
z.n(0,"name",a.gh())
z.n(0,"description",a.gb4())
z.n(0,"color",a.gfF())
z.n(0,"priority",a.gdu())
z.n(0,"show",a.gd1())
z.n(0,"notifyOnChange",a.gfZ())
z.n(0,"string",a.gaR())
this.a.push(z)}}}],["","",,N,{"^":"",dw:{"^":"d;h:a<,b,c,i4:d<,e,f",
gfM:function(){var z,y,x
z=this.b
y=z==null||J.h(z.gh(),"")
x=this.a
return y?x:z.gfM()+"."+x},
gez:function(){if($.hT){var z=this.b
if(z!=null)return z.gez()}return $.qs},
k7:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p,o
x=a.b
if(x>=this.gez().b){if(!!J.n(b).$isbt)b=b.$0()
w=b
if(typeof w!=="string"){v=b
b=J.i(b)}else v=null
if(d==null&&x>=$.ts.b)try{x="autogenerated stack trace for "+a.k(0)+" "+H.b(b)
throw H.c(x)}catch(u){z=H.z(u)
y=H.A(u)
d=y
if(c==null)c=z}e=$.p
x=b
w=this.gfM()
t=c
s=d
r=Date.now()
q=$.f5
$.f5=q+1
p=new N.lo(a,x,v,w,new P.cy(r,!1),q,t,s,e)
if($.hT)for(o=this;o!=null;){o.fi(p)
o=o.b}else $.$get$f7().fi(p)}},
c7:function(a,b,c,d){return this.k7(a,b,c,d,null)},
jz:function(a,b,c){return this.c7(C.R,a,b,c)},
ab:function(a){return this.jz(a,null,null)},
jy:function(a,b,c){return this.c7(C.Q,a,b,c)},
b5:function(a){return this.jy(a,null,null)},
jx:function(a,b,c){return this.c7(C.S,a,b,c)},
bD:function(a){return this.jx(a,null,null)},
jL:function(a,b,c){return this.c7(C.z,a,b,c)},
fS:function(a){return this.jL(a,null,null)},
kK:function(a,b,c){return this.c7(C.V,a,b,c)},
eK:function(a){return this.kK(a,null,null)},
hD:function(a,b,c){return this.c7(C.U,a,b,c)},
dK:function(a){return this.hD(a,null,null)},
fi:function(a){},
w:{
bb:function(a){return $.$get$f6().kk(a,new N.r9(a))}}},r9:{"^":"a:1;a",
$0:function(){var z,y,x,w
z=this.a
if(C.b.d2(z,"."))H.f(P.C("name shouldn't start with a '.'"))
y=C.b.k0(z,".")
if(y===-1)x=z!==""?N.bb(""):null
else{x=N.bb(C.b.aB(z,0,y))
z=C.b.bz(z,y+1)}w=new H.O(0,null,null,null,null,null,0,[P.q,N.dw])
w=new N.dw(z,x,null,w,new P.h8(w,[null,null]),null)
if(x!=null)x.gi4().n(0,z,w)
return w}},aS:{"^":"d;h:a<,a9:b<",
u:function(a,b){if(b==null)return!1
return b instanceof N.aS&&this.b===b.b},
aJ:function(a,b){return C.d.aJ(this.b,b.ga9())},
bZ:function(a,b){return C.d.bZ(this.b,b.ga9())},
bp:function(a,b){var z=b.ga9()
if(typeof z!=="number")return H.v(z)
return this.b>z},
bI:function(a,b){return this.b>=b.ga9()},
bs:function(a,b){var z=b.ga9()
if(typeof z!=="number")return H.v(z)
return this.b-z},
gv:function(a){return this.b},
k:function(a){return this.a},
$isS:1,
$asS:function(){return[N.aS]}},lo:{"^":"d;ez:a<,b,aG:c<,d,I:e<,f,bg:r<,bc:x<,y",
k:function(a){return"["+this.a.a+"] "+this.d+": "+H.b(this.b)}}}],["","",,X,{"^":"",
bp:function(a){return X.d1(J.ip(a,0,new X.tb()))},
aV:function(a,b){var z=J.am(a,b)
if(typeof z!=="number")return H.v(z)
a=536870911&z
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
d1:function(a){if(typeof a!=="number")return H.v(a)
a=536870911&a+((67108863&a)<<3)
a^=a>>>11
return 536870911&a+((16383&a)<<15)},
tb:{"^":"a:7;",
$2:function(a,b){return X.aV(a,J.j(b))}},
dF:{"^":"bY;a,$ti",
ga9:function(){var z=this.a
if(z==null)throw H.c(new P.D("value called on absent Optional."))
return z},
bF:function(a){var z=this.a
return z==null?a:z},
gX:function(a){var z=this.a
if(z!=null){z=H.r([z],this.$ti)
z=new J.b7(z,1,0,null,[H.m(z,0)])}else z=C.G
return z},
gv:function(a){return J.j(this.a)},
u:function(a,b){var z,y
if(b==null)return!1
if(b instanceof X.dF){z=b.a
y=this.a
y=z==null?y==null:z===y
z=y}else z=!1
return z},
k:function(a){var z=this.a
return z==null?"Optional { absent }":"Optional { value: "+H.b(z)+" }"},
hN:function(a,b){if(this.a==null)throw H.c(P.C("Must not be null."))},
w:{
fe:function(a,b){var z=new X.dF(a,[b])
z.hN(a,b)
return z}}}}],["","",,U,{"^":"",cN:{"^":"d;a,b",
k:function(a){return this.b}},c8:{"^":"d;a,kL:b<",
gex:function(){return this.a===C.C},
k:function(a){return"SessionResult<"+this.a.b+",wasRerolled="+H.b(this.b)+">"},
u:function(a,b){if(b==null)return!1
return b instanceof U.c8&&b.a===this.a&&J.h(b.b,this.b)},
gv:function(a){return(this.b===!0?2:1)*100+this.a.a}}}],["","",,X,{"^":"",
vf:[function(a,b){var z,y,x,w,v
z=new D.l_(b,null,null,null,null,null,null,null)
y=$.fp
$.fp=y+1
x=new H.c6(y,null,!1)
w=init.globalState.d
w.dQ(y,x)
w.cv()
w=new H.mn(x,null)
w.hP(x)
z.b=w
w=w.b
w.toString
new P.cW(w,[H.m(w,0)]).az(z.giw(),null,null,null)
b.D(new H.ce(z.b.a,init.globalState.d.a))
v=N.mJ()
z.c=v
v.Q=z},"$2","hH",4,0,33]},1]]
setupProgram(dart,0)
J.n=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.eZ.prototype
return J.l1.prototype}if(typeof a=="string")return J.c1.prototype
if(a==null)return J.f_.prototype
if(typeof a=="boolean")return J.eY.prototype
if(a.constructor==Array)return J.c_.prototype
if(!(a instanceof P.d))return J.bi.prototype
return a}
J.aP=function(a){if(a==null)return a
if(a.constructor==Array)return J.c_.prototype
if(!(a instanceof P.d))return J.bi.prototype
return a}
J.H=function(a){if(typeof a=="string")return J.c1.prototype
if(a==null)return a
if(a.constructor==Array)return J.c_.prototype
if(!(a instanceof P.d))return J.bi.prototype
return a}
J.af=function(a){if(typeof a=="number")return J.c0.prototype
if(a==null)return a
if(!(a instanceof P.d))return J.bi.prototype
return a}
J.el=function(a){if(typeof a=="number")return J.c0.prototype
if(typeof a=="string")return J.c1.prototype
if(a==null)return a
if(!(a instanceof P.d))return J.bi.prototype
return a}
J.b5=function(a){if(typeof a=="string")return J.c1.prototype
if(a==null)return a
if(!(a instanceof P.d))return J.bi.prototype
return a}
J.am=function(a,b){if(typeof a=="number"&&typeof b=="number")return a+b
return J.el(a).a6(a,b)}
J.aW=function(a,b){if(typeof a=="number"&&typeof b=="number")return a/b
return J.af(a).cX(a,b)}
J.h=function(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.n(a).u(a,b)}
J.a3=function(a,b){if(typeof a=="number"&&typeof b=="number")return a>b
return J.af(a).bp(a,b)}
J.bQ=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<b
return J.af(a).aJ(a,b)}
J.bR=function(a,b){if(typeof a=="number"&&typeof b=="number")return a*b
return J.el(a).c_(a,b)}
J.il=function(a){if(typeof a=="number")return-a
return J.af(a).eN(a)}
J.bq=function(a,b){if(typeof a=="number"&&typeof b=="number")return a-b
return J.af(a).aw(a,b)}
J.aw=function(a,b){if(typeof b==="number")if(a.constructor==Array||typeof a=="string")if(b>>>0===b&&b<a.length)return a[b]
return J.H(a).i(a,b)}
J.aQ=function(a,b){return J.aP(a).q(a,b)}
J.im=function(a,b,c,d,e,f,g,h,i,j,k,l,m){return J.aP(a).iV(a,b,c,d,e,f,g,h,i,j,k,l,m)}
J.bS=function(a,b){return J.el(a).bs(a,b)}
J.io=function(a,b){return J.H(a).a1(a,b)}
J.ew=function(a,b){return J.aP(a).ap(a,b)}
J.ip=function(a,b,c){return J.aP(a).bh(a,b,c)}
J.j=function(a){return J.n(a).gv(a)}
J.ex=function(a){return J.H(a).gK(a)}
J.ah=function(a){return J.aP(a).gX(a)}
J.iq=function(a){return J.aP(a).gE(a)}
J.aG=function(a){return J.H(a).gl(a)}
J.ir=function(a){return J.n(a).gbk(a)}
J.is=function(a,b){return J.H(a).aN(a,b)}
J.ey=function(a,b){return J.aP(a).aP(a,b)}
J.it=function(a,b,c){return J.b5(a).fV(a,b,c)}
J.da=function(a,b,c){return J.b5(a).kp(a,b,c)}
J.cm=function(a,b,c){return J.b5(a).cM(a,b,c)}
J.iu=function(a){return J.af(a).hb(a)}
J.iv=function(a,b){return J.aP(a).dM(a,b)}
J.ez=function(a,b){return J.b5(a).d2(a,b)}
J.iw=function(a,b,c){return J.b5(a).aB(a,b,c)}
J.ix=function(a){return J.aP(a).bx(a)}
J.i=function(a){return J.n(a).k(a)}
J.cn=function(a,b){return J.af(a).bW(a,b)}
J.iy=function(a,b){return J.aP(a).bY(a,b)}
I.bO=function(a){a.immutable$list=Array
a.fixed$length=Array
return a}
var $=I.p
C.J=J.aR.prototype
C.a=J.c_.prototype
C.L=J.eY.prototype
C.d=J.eZ.prototype
C.t=J.f_.prototype
C.j=J.c0.prototype
C.b=J.c1.prototype
C.D=new A.ai(0,0,0)
C.E=new A.ai(-1/0,-1/0,-1/0)
C.F=new A.cp(-10,0,100)
C.G=new H.kl([null])
C.H=new P.lK()
C.u=new P.pl()
C.I=new P.pE()
C.f=new P.pT()
C.w=new P.aY(0)
C.K=new U.dm(0,"ItemType.spear")
C.x=new U.dm(1,"ItemType.sword")
C.y=new U.dm(2,"ItemType.fist")
C.M=function getTagFallback(o) {
  var s = Object.prototype.toString.call(o);
  return s.substring(8, s.length - 1);
}
C.v=new P.l5(null,null)
C.N=new P.l7(null)
C.O=new P.l8(null,null)
C.P=new O.lg(0,"KnownToMode.all")
C.Q=new N.aS("FINER",400)
C.R=new N.aS("FINEST",300)
C.S=new N.aS("FINE",500)
C.z=new N.aS("INFO",800)
C.T=new N.aS("OFF",2000)
C.U=new N.aS("SEVERE",1000)
C.V=new N.aS("WARNING",900)
C.C=new U.cN(0,"Result.success")
C.a0=new U.cN(1,"Result.failure")
C.a1=new U.cN(2,"Result.criticalSuccess")
C.a2=new U.cN(3,"Result.criticalFailure")
C.A=I.bO([C.C,C.a0,C.a1,C.a2])
C.p=I.bO([C.x])
C.W=I.bO([C.y])
C.e=I.bO([])
C.X=new H.jv(0,{},C.e,[null,null])
C.Y=new X.dF(null,[P.J])
C.k=new R.dI(0,"Pose.standing")
C.h=new R.dI(1,"Pose.offBalance")
C.i=new R.dI(2,"Pose.onGround")
C.m=new K.dJ(0,"Predetermination.none")
C.q=new K.dJ(1,"Predetermination.successGuaranteed")
C.n=new K.dJ(2,"Predetermination.failureGuaranteed")
C.r=new Y.c3("he","him","his","himself")
C.o=new Y.c3("it","it","its","itself")
C.Z=new Y.c3("she","her","her","herself")
C.a_=new Y.c3("they","them","their","themselves")
C.B=new Y.c3("you","you","your","yourself")
C.c=new Q.ms(0,"Resource.stamina")
C.a3=H.b3("f0")
C.a4=H.b3("ao")
C.a5=H.b3("q")
C.a6=H.b3("Y")
C.a7=H.b3("aO")
C.l=H.b3("dynamic")
C.a8=H.b3("u")
C.a9=H.b3("J")
C.aa=new P.bH(null,2)
$.fp=1
$.fi="$cachedFunction"
$.fj="$cachedInvocation"
$.aH=0
$.br=null
$.eE=null
$.bl=null
$.bK=null
$.bL=null
$.ea=!1
$.p=C.f
$.eR=0
$.em=null
$.hq=!1
$.ql=null
$.hs=!1
$.hV=!0
$.cT=!1
$.hT=!1
$.ts=C.T
$.qs=C.z
$.f5=0
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
I.$lazy(y,x,w)}})(["eV","$get$eV",function(){return H.kY()},"eW","$get$eW",function(){if(typeof WeakMap=="function")var z=new WeakMap()
else{z=$.eR
$.eR=z+1
z="expando$key$"+z}return new P.kq(null,z,[P.u])},"fV","$get$fV",function(){return H.aJ(H.cU({
toString:function(){return"$receiver$"}}))},"fW","$get$fW",function(){return H.aJ(H.cU({$method$:null,
toString:function(){return"$receiver$"}}))},"fX","$get$fX",function(){return H.aJ(H.cU(null))},"fY","$get$fY",function(){return H.aJ(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"h1","$get$h1",function(){return H.aJ(H.cU(void 0))},"h2","$get$h2",function(){return H.aJ(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"h_","$get$h_",function(){return H.aJ(H.h0(null))},"fZ","$get$fZ",function(){return H.aJ(function(){try{null.$method$}catch(z){return z.message}}())},"h4","$get$h4",function(){return H.aJ(H.h0(void 0))},"h3","$get$h3",function(){return H.aJ(function(){try{(void 0).$method$}catch(z){return z.message}}())},"e0","$get$e0",function(){return P.p3()},"ba","$get$ba",function(){var z,y
z=P.ao
y=new P.E(0,P.oG(),null,[z])
y.hW(null,z)
return y},"bM","$get$bM",function(){return[]},"ei","$get$ei",function(){return new K.bX("fist",P.bu(C.W,null))},"bx","$get$bx",function(){return N.bb("PlannerRecommendation")},"hJ","$get$hJ",function(){return new K.qE()},"ej","$get$ej",function(){var z=$.$get$hJ()
return K.a0("__END_OF_ROAM__",z,z,null,null,[],"ground")},"a2","$get$a2",function(){return P.cL(null)},"bz","$get$bz",function(){return P.cL(null)},"hX","$get$hX",function(){return N.bb("Storyline")},"fI","$get$fI",function(){return P.be("(\\w)([\\.\\?\\!])([\"'])\\.(?=$|\\s)",!0,!1)},"ci","$get$ci",function(){return L.e_(new L.r8())},"bP","$get$bP",function(){return L.e_(new L.re())},"i3","$get$i3",function(){return L.e_(new L.r7())},"dG","$get$dG",function(){return new F.lP("Sometimes, patience pays off. Especially when the other option is potentially dangerous.",!1,!0,!1,null,null)},"eg","$get$eg",function(){return Y.dh(!1,"balance",!0,C.o,$.$get$bP())},"i4","$get$i4",function(){return Y.dh(!1,"pounding",!1,C.o,$.$get$bP())},"fq","$get$fq",function(){return new B.mq("Most moves are easier and more effective when you are firmly in balance.",!1,!0,!1,null,null)},"fu","$get$fu",function(){return new O.mF(null,!1,!0,!1,null,null)},"fH","$get$fH",function(){return new Q.np(null,!1,!0,!0,C.c,null)},"h7","$get$h7",function(){return new M.ov("",!0,C.c,!1,!0,null)},"hr","$get$hr",function(){return P.cL(null)},"eD","$get$eD",function(){return new Z.j4(!1,!0,!1,null,null)},"ic","$get$ic",function(){return Y.dh(!1,"swing",!0,C.o,$.$get$bP())},"fg","$get$fg",function(){return X.fe(0,P.J)},"fh","$get$fh",function(){return X.fe(1,P.J)},"fA","$get$fA",function(){return new D.nd(!1,!1,!0,null,null)},"hL","$get$hL",function(){return K.a0("forge_church_crevice",new V.r3(),new V.r4(),null,null,H.r([new Q.w("tunnel","Continue along the crevice","You continue until the crevice open into a tunnel. You can smell fresh air.",null)],[Q.w]),"ground")},"hW","$get$hW",function(){return K.a0("kill_agruth",new V.r1(),new V.r2(),N.uv(),null,H.r([new Q.w("start_of_book","","You look around. Fortunately, nobody is in sight.",null)],[Q.w]),"ground")},"i6","$get$i6",function(){return K.a0("start_of_book",new V.qZ(),new V.r_(),null,null,H.r([],[Q.w]),"ground")},"eS","$get$eS",function(){return new V.kM("Flee through the Underground Church","flee_through_necromancers_church",!0,null)},"eT","$get$eT",function(){return new V.kO("Flee through the War Forges","flee_through_war_forge",!0,null)},"fv","$get$fv",function(){return new V.n4("Search Agruth","search_agruth",!0,null)},"id","$get$id",function(){return K.a0("the_shafts",new V.qX(),new V.qY(),null,null,H.r([new Q.w("tunnel","Run","You run over the passage. Orcs start to scream and yell commands. As you near the entrance, the air gets better.",null)],[Q.w]),"ground")},"ig","$get$ig",function(){return K.a0("tunnel",new V.qV(),new V.qW(),N.uw(),null,H.r([new Q.w("entrance_to_bloodrock","Start running again","You finally arrive to the cave's entrance.",null)],[Q.w]),"ground")},"ih","$get$ih",function(){return K.a0("underground_church",new V.qT(),new V.qU(),null,null,H.r([new Q.w("forge_church_crevice","Enter the small passage","You enter the passage and go a long way.",null)],[Q.w]),"ground")},"ii","$get$ii",function(){return K.a0("war_forge",new V.qR(),new V.qS(),null,null,H.r([new Q.w("tunnel","Enter the corridor","You enter the corridor.",null),new Q.w("forge_church_crevice","Enter the crevice","You take the crevice.",null)],[Q.w]),"ground")},"ij","$get$ij",function(){return K.a0("war_forge_crevice",new V.qO(),new V.qP(),null,null,H.r([new Q.w("tunnel","Continue along the crevice","You continue until the crevice open into a tunnel. You can smell fresh air.",null)],[Q.w]),"ground")},"hK","$get$hK",function(){return K.a0("entrance_to_bloodrock",new V.qM(),new V.qN(),null,null,H.r([new Q.w("mountainside_path","Climb down the cliff","You decide to risk the mountainside. With a deep breath, you swing your leg over the edge, find a foothold, and lower yourself down.",null),new Q.w("mountain_pass_gate","Use the path","You steel yourself and trudge down the mountain pass.",null)],[Q.w]),"ground")},"hY","$get$hY",function(){return K.a0("mountain_pass",new V.qK(),new V.qL(),null,null,H.r([new Q.w("ironcast_road","Go to Fort Ironcast","You continue towards the fort.",null)],[Q.w]),"ground")},"hZ","$get$hZ",function(){return K.a0("mountain_pass_gate",new V.qI(),new V.qJ(),null,null,H.r([new Q.w("mountain_pass_guard_post","Go to the gate","You unsheathe your weapon and start towards the guards.",null)],[Q.w]),"ground")},"i_","$get$i_",function(){return K.a0("mountain_pass_guard_post",new V.rx(),new V.qG(),N.ux(),null,H.r([new Q.w("mountain_pass","Go through the gate","You release the winch holding the gate closed. The gate swings ponderously outward, just enough for you and Briana to squeeze through to freedom.",null)],[Q.w]),"ground")},"fB","$get$fB",function(){return new V.nf("Sneak onto the back of the cart","sneak_onto_cart",!0,null)},"fP","$get$fP",function(){return new V.o5("Stealthily take out some of the gate guards","take_out_gate_guards",!0,null)},"i0","$get$i0",function(){return K.a0("mountainside_base",new V.rv(),new V.rw(),null,null,H.r([new Q.w("ironcast_road","Go to Fort Ironcast","The Fort awaits, so you press on to only road to and from Mt. Bloodrock.",null)],[Q.w]),"ground")},"i1","$get$i1",function(){return K.a0("mountainside_path",new V.rm(),new V.ru(),null,null,H.r([new Q.w("winged_serpent_nest","Continue down","You find a ledge you might rest on for a bit.",null)],[Q.w]),"ground")},"fU","$get$fU",function(){return new V.of("Scare off the serpent","threaten_winged_serpent",!0,null)},"fD","$get$fD",function(){return new V.nh("Soothe the serpent","soothe_winged_serpent",!0,null)},"fS","$get$fS",function(){return new V.og("Threaten the serpent\u2019s eggs","threaten_winged_serpent_eggs",!0,null)},"ik","$get$ik",function(){return K.a0("winged_serpent_nest",new V.r0(),new V.rb(),null,null,H.r([new Q.w("mountainside_base","Continue down","You continue your descent to level ground. Thankfully, the end is in sight.",null)],[Q.w]),"ground")},"hU","$get$hU",function(){return K.a0("ironcast_road",new V.qF(),new V.qQ(),null,null,H.r([new Q.w("__END_OF_ROAM__","Go to Fort Ironcast (UNIMPLEMENTED)","You make your way closer to the fort.",null)],[Q.w]),"ground")},"hz","$get$hz",function(){return H.r([$.$get$hL(),$.$get$hW(),$.$get$i6(),$.$get$id(),$.$get$ig(),$.$get$ih(),$.$get$ii(),$.$get$ij(),$.$get$hK(),$.$get$hY(),$.$get$hZ(),$.$get$i_(),$.$get$i0(),$.$get$i1(),$.$get$ik(),$.$get$hU()],[K.c7])},"hy","$get$hy",function(){return H.r([$.$get$eS(),$.$get$eT(),$.$get$fv(),$.$get$fB(),$.$get$fP(),$.$get$fU(),$.$get$fD(),$.$get$fS()],[A.aI])},"ed","$get$ed",function(){return P.cL(null)},"d9","$get$d9",function(){return P.o_("")},"ch","$get$ch",function(){var z=new O.m1(0,null,"PointsCounter")
z.hO()
return z},"bN","$get$bN",function(){return new L.eJ(null,H.r([],[L.a4]))},"cl","$get$cl",function(){return H.f3(P.q,P.d)},"cg","$get$cg",function(){return P.b0(null,{func:1,ret:[P.N,P.ao]})},"cw","$get$cw",function(){return P.be("^\\s*<<<\\s*$",!0,!1)},"cS","$get$cS",function(){return H.f3(P.q,Z.aq)},"f7","$get$f7",function(){return N.bb("")},"f6","$get$f6",function(){return P.du(P.q,N.dw)}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=[null,!1]
init.types=[{func:1,args:[,]},{func:1},{func:1,ret:P.q,args:[R.G,A.a5,Y.X]},{func:1,args:[,,,]},{func:1,args:[R.G,A.a5,Y.X]},{func:1,ret:Q.I,args:[R.G]},{func:1,v:true},{func:1,args:[,,]},{func:1,args:[,,,,]},{func:1,args:[P.u]},{func:1,v:true,args:[R.G,A.a5,Y.X,R.G,S.a1]},{func:1,ret:P.q,args:[P.u]},{func:1,v:true,args:[{func:1,v:true}]},{func:1,v:true,args:[R.G,A.a5,Y.X,R.G,,]},{func:1,ret:U.cC,args:[A.a5,F.a9,[P.y,R.G]]},{func:1,v:true,args:[P.q]},{func:1,args:[,P.aU]},{func:1,v:true,args:[P.d],opt:[P.aU]},{func:1,args:[P.aO]},{func:1,ret:P.N},{func:1,v:true,args:[P.d]},{func:1,ret:Y.b9,args:[P.u]},{func:1,ret:P.q,args:[P.q]},{func:1,args:[U.bW]},{func:1,args:[R.G]},{func:1,args:[Z.aq]},{func:1,ret:P.J,args:[A.ai]},{func:1,ret:P.q,args:[Q.a7]},{func:1,args:[P.J,R.G]},{func:1,ret:P.Y,args:[P.u]},{func:1,args:[P.u,,]},{func:1,ret:P.J,args:[A.cp]},{func:1,v:true,args:[P.u]},{func:1,v:true,args:[[P.L,P.q],P.fw]},{func:1,ret:[P.N,U.c8],args:[P.aO,P.q],named:{rerollEffectDescription:P.q,rerollable:P.Y}},{func:1,args:[L.a4]},{func:1,args:[P.q,,]},{func:1,args:[P.q,Z.cR]},{func:1,v:true,args:[P.d,P.aU]},{func:1,v:true,args:[,P.aU]},{func:1,ret:P.u,args:[P.S,P.S]},{func:1,args:[[P.L,Y.a8],Y.a8]},{func:1,ret:P.J,args:[P.J,P.J]},{func:1,ret:P.Y,args:[L.a4]},{func:1,args:[Y.a8]},{func:1,args:[P.bc]},{func:1,ret:Q.cE,args:[U.an]},{func:1,ret:Q.cB,args:[Q.w]},{func:1,args:[{func:1,v:true}]},{func:1,args:[,],opt:[,]},{func:1,ret:L.a4,args:[P.q],named:{deferToChoiceList:P.Y,deferToEndOfPage:P.Y,goto:P.q,helpMessage:P.q,script:{func:1,ret:[P.N,P.ao]},submenu:P.q}},{func:1,args:[P.Y]}]
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
if(x==y)H.us(d||a)
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
Isolate.bO=a.bO
Isolate.b4=a.b4
return Isolate}}(function(a){if(typeof document==="undefined"){a(null)
return}if(typeof document.currentScript!='undefined'){a(document.currentScript)
return}var z=document.scripts
function onLoad(b){for(var x=0;x<z.length;++x)z[x].removeEventListener("load",onLoad,false)
a(b.target)}for(var y=0;y<z.length;++y)z[y].addEventListener("load",onLoad,false)})(function(a){init.currentScript=a
if(typeof dartMainRunner==="function")dartMainRunner(function(b){H.i7(X.hH(),b)},[])
else (function(b){H.i7(X.hH(),b)})([])})})()