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
if(b5.$isaP)b5.$deferredAction()}var a3=Object.keys(a4.pending)
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
if(a0==="A"){processStatics(init.statics[b1]=b2.A,b3)
delete b2.A}else if(a1===43){w[g]=a0.substring(1)
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
e.$callName=null}}function tearOffGetter(c,d,e,f){return f?new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"(x) {"+"if (c === null) c = "+"H.ef"+"("+"this, funcs, reflectionInfo, false, [x], name);"+"return new c(this, funcs[0], x, name);"+"}")(c,d,e,H,null):new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"() {"+"if (c === null) c = "+"H.ef"+"("+"this, funcs, reflectionInfo, false, [], name);"+"return new c(this, funcs[0], null, name);"+"}")(c,d,e,H,null)}function tearOff(c,d,e,f,a0){var g
return e?function(){if(g===void 0)g=H.ef(this,c,d,true,[],f).prototype
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
x.push([p,o,i,h,n,j,k,m])}finishClasses(s)}I.b5=function(){}
var dart=[["","",,H,{"^":"",ul:{"^":"d;a"}}],["","",,J,{"^":"",
n:function(a){return void 0},
aP:{"^":"d;",
u:function(a,b){return a===b},
gv:function(a){return H.aw(a)},
k:function(a){return H.cJ(a)},
gbn:function(a){return new H.aq(H.hN(a),null)}},
eY:{"^":"aP;",
k:function(a){return String(a)},
gv:function(a){return a?519018:218159},
gbn:function(a){return C.a4},
$isY:1},
f_:{"^":"aP;",
u:function(a,b){return null==b},
k:function(a){return"null"},
gv:function(a){return 0},
gbn:function(a){return C.a2},
$isao:1},
f2:{"^":"aP;",
gv:function(a){return 0},
gbn:function(a){return C.a1},
k:function(a){return String(a)},
$isf0:1},
uq:{"^":"f2;"},
bi:{"^":"f2;"},
bZ:{"^":"aP;$ti",
fw:function(a,b){if(!!a.immutable$list)throw H.c(new P.P(b))},
cz:function(a,b){if(!!a.fixed$length)throw H.c(new P.P(b))},
q:function(a,b){this.cz(a,"add")
a.push(b)},
kf:function(a){this.cz(a,"removeLast")
if(a.length===0)throw H.c(H.aA(a,-1))
return a.pop()},
a7:function(a,b){var z
this.cz(a,"remove")
for(z=0;z<a.length;++z)if(J.i(a[z],b)){a.splice(z,1)
return!0}return!1},
ix:function(a,b,c){var z,y,x,w,v
z=[]
y=a.length
for(x=0;x<y;++x){w=a[x]
if(b.$1(w)!==!0===c)z.push(w)
if(a.length!==y)throw H.c(new P.B(a))}v=z.length
if(v===y)return
this.sl(a,v)
for(x=0;x<z.length;++x)a[x]=z[x]},
bZ:function(a,b){return new H.I(a,b,[H.m(a,0)])},
ar:function(a,b){var z
this.cz(a,"addAll")
for(z=J.af(b);z.t();)a.push(z.gF())},
L:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){b.$1(a[y])
if(a.length!==z)throw H.c(new P.B(a))}},
aP:function(a,b){return new H.an(a,b,[H.m(a,0),null])},
dH:function(a,b){return H.fK(a,b,null,H.m(a,0))},
bj:function(a,b,c){var z,y,x
z=a.length
for(y=b,x=0;x<z;++x){y=c.$2(y,a[x])
if(a.length!==z)throw H.c(new P.B(a))}return y},
b7:function(a,b,c){var z,y,x
z=a.length
for(y=0;y<z;++y){x=a[y]
if(b.$1(x)===!0)return x
if(a.length!==z)throw H.c(new P.B(a))}throw H.c(H.a9())},
de:function(a,b){return this.b7(a,b,null)},
an:function(a,b){if(b>>>0!==b||b>=a.length)return H.e(a,b)
return a[b]},
gem:function(a){if(a.length>0)return a[0]
throw H.c(H.a9())},
gE:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.c(H.a9())},
gc2:function(a){var z=a.length
if(z===1){if(0>=z)return H.e(a,0)
return a[0]}if(z===0)throw H.c(H.a9())
throw H.c(H.dn())},
aR:function(a,b,c,d,e){var z,y,x
this.fw(a,"setRange")
P.c4(b,c,a.length,null,null,null)
z=c-b
if(z===0)return
if(e<0)H.f(P.X(e,0,null,"skipCount",null))
if(e+z>d.length)throw H.c(H.eX())
if(e<b)for(y=z-1;y>=0;--y){x=e+y
if(x>>>0!==x||x>=d.length)return H.e(d,x)
a[b+y]=d[x]}else for(y=0;y<z;++y){x=e+y
if(x>>>0!==x||x>=d.length)return H.e(d,x)
a[b+y]=d[x]}},
bP:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){if(b.$1(a[y])===!0)return!0
if(a.length!==z)throw H.c(new P.B(a))}return!1},
cf:function(a,b){var z
this.fw(a,"sort")
z=b==null?P.rs():b
H.c8(a,0,a.length-1,z)},
eN:function(a){return this.cf(a,null)},
bG:function(a,b,c){var z
if(c>=a.length)return-1
for(z=c;z<a.length;++z)if(J.i(a[z],b))return z
return-1},
b8:function(a,b){return this.bG(a,b,0)},
Z:function(a,b){var z
for(z=0;z<a.length;++z)if(J.i(a[z],b))return!0
return!1},
gK:function(a){return a.length===0},
gak:function(a){return a.length!==0},
k:function(a){return P.bY(a,"[","]")},
by:function(a){return P.b_(a,H.m(a,0))},
gY:function(a){return new J.br(a,a.length,0,null,[H.m(a,0)])},
gv:function(a){return H.aw(a)},
gl:function(a){return a.length},
sl:function(a,b){this.cz(a,"set length")
if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(P.co(b,"newLength",null))
if(b<0)throw H.c(P.X(b,0,null,"newLength",null))
a.length=b},
i:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(H.aA(a,b))
if(b>=a.length||b<0)throw H.c(H.aA(a,b))
return a[b]},
n:function(a,b,c){if(!!a.immutable$list)H.f(new P.P("indexed set"))
if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(H.aA(a,b))
if(b>=a.length||b<0)throw H.c(H.aA(a,b))
a[b]=c},
$iscF:1,
$ascF:I.b5,
$isJ:1,
$isV:1},
uk:{"^":"bZ;$ti"},
br:{"^":"d;a,b,c,d,$ti",
gF:function(){return this.d},
t:function(){var z,y,x
z=this.a
y=z.length
if(this.b!==y)throw H.c(H.ak(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z[x]
this.c=x+1
return!0}},
c_:{"^":"aP;",
bu:function(a,b){var z
if(typeof b!=="number")throw H.c(H.Q(b))
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){z=this.gdg(b)
if(this.gdg(a)===z)return 0
if(this.gdg(a))return-1
return 1}return 0}else if(isNaN(a)){if(isNaN(b))return 0
return 1}else return-1},
gdg:function(a){return a===0?1/a<0:a<0},
h6:function(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw H.c(new P.P(""+a+".round()"))},
bX:function(a,b){var z
if(b>20)throw H.c(P.X(b,0,20,"fractionDigits",null))
z=a.toFixed(b)
if(a===0&&this.gdg(a))return"-"+z
return z},
ky:function(a,b){var z,y,x,w
if(b<2||b>36)throw H.c(P.X(b,2,36,"radix",null))
z=a.toString(b)
if(C.b.cA(z,z.length-1)!==41)return z
y=/^([\da-z]+)(?:\.([\da-z]+))?\(e\+(\d+)\)$/.exec(z)
if(y==null)H.f(new P.P("Unexpected toString result: "+z))
x=J.K(y)
z=x.i(y,1)
w=+x.i(y,3)
if(x.i(y,2)!=null){z+=x.i(y,2)
w-=x.i(y,2).length}return z+C.b.c0("0",w)},
k:function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gv:function(a){return a&0x1FFFFFFF},
eJ:function(a){return-a},
a4:function(a,b){if(typeof b!=="number")throw H.c(H.Q(b))
return a+b},
aL:function(a,b){if(typeof b!=="number")throw H.c(H.Q(b))
return a-b},
cS:function(a,b){if(typeof b!=="number")throw H.c(H.Q(b))
return a/b},
c0:function(a,b){if(typeof b!=="number")throw H.c(H.Q(b))
return a*b},
bD:function(a,b){return(a|0)===a?a/b|0:this.iG(a,b)},
iG:function(a,b){var z=a/b
if(z>=-2147483648&&z<=2147483647)return z|0
if(z>0){if(z!==1/0)return Math.floor(z)}else if(z>-1/0)return Math.ceil(z)
throw H.c(new P.P("Result of truncating division is "+H.b(z)+": "+H.b(a)+" ~/ "+b))},
d6:function(a,b){var z
if(a>0)z=b>31?0:a>>>b
else{z=b>31?31:b
z=a>>z>>>0}return z},
aJ:function(a,b){if(typeof b!=="number")throw H.c(H.Q(b))
return a<b},
br:function(a,b){if(typeof b!=="number")throw H.c(H.Q(b))
return a>b},
c_:function(a,b){if(typeof b!=="number")throw H.c(H.Q(b))
return a<=b},
bI:function(a,b){if(typeof b!=="number")throw H.c(H.Q(b))
return a>=b},
gbn:function(a){return C.a7},
$isM:1},
eZ:{"^":"c_;",
gbn:function(a){return C.a6},
$isaN:1,
$isM:1,
$isu:1},
kU:{"^":"c_;",
gbn:function(a){return C.a5},
$isaN:1,
$isM:1},
c0:{"^":"aP;",
cA:function(a,b){if(b<0)throw H.c(H.aA(a,b))
if(b>=a.length)H.f(H.aA(a,b))
return a.charCodeAt(b)},
cj:function(a,b){if(b>=a.length)throw H.c(H.aA(a,b))
return a.charCodeAt(b)},
d7:function(a,b,c){if(c>b.length)throw H.c(P.X(c,0,b.length,null,null))
return new H.pT(b,a,c)},
eg:function(a,b){return this.d7(a,b,0)},
fQ:function(a,b,c){var z,y
if(c<0||c>b.length)throw H.c(P.X(c,0,b.length,null,null))
z=a.length
if(c+z>b.length)return
for(y=0;y<z;++y)if(this.cA(b,c+y)!==this.cj(a,y))return
return new H.fJ(c,b,a)},
a4:function(a,b){if(typeof b!=="string")throw H.c(P.co(b,null,null))
return a+b},
ek:function(a,b){var z,y
z=b.length
y=a.length
if(z>y)return!1
return b===this.bB(a,y-z)},
kh:function(a,b,c){H.bo(c)
return H.o(a,b,c)},
ki:function(a,b,c,d){H.bo(c)
P.md(d,0,a.length,"startIndex",null)
return H.er(a,b,c,d)},
ez:function(a,b,c){return this.ki(a,b,c,0)},
hC:function(a,b,c){var z
if(c>a.length)throw H.c(P.X(c,0,a.length,null,null))
if(typeof b==="string"){z=c+b.length
if(z>a.length)return!1
return b===a.substring(c,z)}return J.il(b,a,c)!=null},
dJ:function(a,b){return this.hC(a,b,0)},
az:function(a,b,c){if(c==null)c=a.length
if(typeof c!=="number"||Math.floor(c)!==c)H.f(H.Q(c))
if(b<0)throw H.c(P.c3(b,null,null))
if(typeof c!=="number")return H.v(c)
if(b>c)throw H.c(P.c3(b,null,null))
if(c>a.length)throw H.c(P.c3(c,null,null))
return a.substring(b,c)},
bB:function(a,b){return this.az(a,b,null)},
eF:function(a){var z,y,x,w,v
z=a.trim()
y=z.length
if(y===0)return z
if(this.cj(z,0)===133){x=J.dp(z,1)
if(x===y)return""}else x=0
w=y-1
v=this.cA(z,w)===133?J.kV(z,w):y
if(x===0&&v===y)return z
return z.substring(x,v)},
kz:function(a){var z,y
if(typeof a.trimLeft!="undefined"){z=a.trimLeft()
if(z.length===0)return z
y=this.cj(z,0)===133?J.dp(z,1):0}else{y=J.dp(a,0)
z=a}if(y===0)return z
if(y===z.length)return""
return z.substring(y)},
c0:function(a,b){var z,y
if(0>=b)return""
if(b===1||a.length===0)return a
if(b!==b>>>0)throw H.c(C.G)
for(z=a,y="";!0;){if((b&1)===1)y=z+y
b=b>>>1
if(b===0)break
z+=z}return y},
bG:function(a,b,c){var z
if(c>a.length)throw H.c(P.X(c,0,a.length,null,null))
z=a.indexOf(b,c)
return z},
b8:function(a,b){return this.bG(a,b,0)},
jU:function(a,b,c){var z
c=a.length
z=b.length
if(c+z>c)c-=z
return a.lastIndexOf(b,c)},
jT:function(a,b){return this.jU(a,b,null)},
j8:function(a,b,c){if(b==null)H.f(H.Q(b))
if(c>a.length)throw H.c(P.X(c,0,a.length,null,null))
return H.tX(a,b,c)},
Z:function(a,b){return this.j8(a,b,0)},
gK:function(a){return a.length===0},
gak:function(a){return a.length!==0},
bu:function(a,b){var z
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
gbn:function(a){return C.a3},
gl:function(a){return a.length},
i:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(H.aA(a,b))
if(b>=a.length||b<0)throw H.c(H.aA(a,b))
return a[b]},
$iscF:1,
$ascF:I.b5,
$isq:1,
$isdG:1,
A:{
f1:function(a){if(a<256)switch(a){case 9:case 10:case 11:case 12:case 13:case 32:case 133:case 160:return!0
default:return!1}switch(a){case 5760:case 8192:case 8193:case 8194:case 8195:case 8196:case 8197:case 8198:case 8199:case 8200:case 8201:case 8202:case 8232:case 8233:case 8239:case 8287:case 12288:case 65279:return!0
default:return!1}},
dp:function(a,b){var z,y
for(z=a.length;b<z;){y=C.b.cj(a,b)
if(y!==32&&y!==13&&!J.f1(y))break;++b}return b},
kV:function(a,b){var z,y
for(;b>0;b=z){z=b-1
y=C.b.cA(a,z)
if(y!==32&&y!==13&&!J.f1(y))break}return b}}}}],["","",,H,{"^":"",
hk:function(a){return a},
a9:function(){return new P.E("No element")},
dn:function(){return new P.E("Too many elements")},
eX:function(){return new P.E("Too few elements")},
c8:function(a,b,c,d){if(c-b<=32)H.fC(a,b,c,d)
else H.fB(a,b,c,d)},
fC:function(a,b,c,d){var z,y,x,w,v
for(z=b+1,y=J.K(a);z<=c;++z){x=y.i(a,z)
w=z
while(!0){if(!(w>b&&J.a3(d.$2(y.i(a,w-1),x),0)))break
v=w-1
y.n(a,w,y.i(a,v))
w=v}y.n(a,w,x)}},
fB:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
z=C.d.bD(c-b+1,6)
y=b+z
x=c-z
w=C.d.bD(b+c,2)
v=w-z
u=w+z
t=J.K(a)
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
if(J.i(d.$2(r,p),0)){for(k=m;k<=l;++k){j=t.i(a,k)
i=d.$2(j,r)
h=J.n(i)
if(h.u(i,0))continue
if(h.aJ(i,0)){if(k!==m){t.n(a,k,t.i(a,m))
t.n(a,m,j)}++m}else for(;!0;){i=d.$2(t.i(a,l),r)
h=J.ad(i)
if(h.br(i,0)){--l
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
H.c8(a,b,m-2,d)
H.c8(a,l+2,c,d)
if(e)return
if(m<y&&l>x){for(;J.i(d.$2(t.i(a,m),r),0);)++m
for(;J.i(d.$2(t.i(a,l),p),0);)--l
for(k=m;k<=l;++k){j=t.i(a,k)
if(J.i(d.$2(j,r),0)){if(k!==m){t.n(a,k,t.i(a,m))
t.n(a,m,j)}++m}else if(J.i(d.$2(j,p),0))for(;!0;)if(J.i(d.$2(t.i(a,l),p),0)){--l
if(l<k)break
continue}else{g=l-1
if(J.bQ(d.$2(t.i(a,l),r),0)){t.n(a,k,t.i(a,m))
f=m+1
t.n(a,m,t.i(a,l))
t.n(a,l,j)
m=f}else{t.n(a,k,t.i(a,l))
t.n(a,l,j)}l=g
break}}H.c8(a,m,l,d)}else H.c8(a,m,l,d)},
V:{"^":"y;$ti"},
aS:{"^":"V;$ti",
gY:function(a){return new H.dv(this,this.gl(this),0,null,[H.x(this,"aS",0)])},
L:function(a,b){var z,y
z=this.gl(this)
for(y=0;y<z;++y){b.$1(this.an(0,y))
if(z!==this.gl(this))throw H.c(new P.B(this))}},
gK:function(a){return this.gl(this)===0},
gE:function(a){if(this.gl(this)===0)throw H.c(H.a9())
return this.an(0,this.gl(this)-1)},
Z:function(a,b){var z,y
z=this.gl(this)
for(y=0;y<z;++y){if(J.i(this.an(0,y),b))return!0
if(z!==this.gl(this))throw H.c(new P.B(this))}return!1},
b7:function(a,b,c){var z,y,x
z=this.gl(this)
for(y=0;y<z;++y){x=this.an(0,y)
if(b.$1(x)===!0)return x
if(z!==this.gl(this))throw H.c(new P.B(this))}return c.$0()},
cG:function(a,b){var z,y,x,w
z=this.gl(this)
if(b.length!==0){if(z===0)return""
y=H.b(this.an(0,0))
if(z!==this.gl(this))throw H.c(new P.B(this))
for(x=y,w=1;w<z;++w){x=x+b+H.b(this.an(0,w))
if(z!==this.gl(this))throw H.c(new P.B(this))}return x.charCodeAt(0)==0?x:x}else{for(w=0,x="";w<z;++w){x+=H.b(this.an(0,w))
if(z!==this.gl(this))throw H.c(new P.B(this))}return x.charCodeAt(0)==0?x:x}},
bZ:function(a,b){return this.dM(0,b)},
aP:function(a,b){return new H.an(this,b,[H.x(this,"aS",0),null])},
bj:function(a,b,c){var z,y,x
z=this.gl(this)
for(y=b,x=0;x<z;++x){y=c.$2(y,this.an(0,x))
if(z!==this.gl(this))throw H.c(new P.B(this))}return y},
bx:function(a,b){var z,y,x,w
z=[H.x(this,"aS",0)]
if(b){y=H.r([],z)
C.a.sl(y,this.gl(this))}else{x=new Array(this.gl(this))
x.fixed$length=Array
y=H.r(x,z)}for(w=0;w<this.gl(this);++w){z=this.an(0,w)
if(w>=y.length)return H.e(y,w)
y[w]=z}return y},
cd:function(a){return this.bx(a,!0)},
by:function(a){var z,y
z=P.W(null,null,null,H.x(this,"aS",0))
for(y=0;y<this.gl(this);++y)z.q(0,this.an(0,y))
return z}},
nT:{"^":"aS;a,b,c,$ti",
gi5:function(){var z=J.aD(this.a)
return z},
giE:function(){var z,y
z=J.aD(this.a)
y=this.b
if(y>z)return z
return y},
gl:function(a){var z,y
z=J.aD(this.a)
y=this.b
if(y>=z)return 0
return z-y},
an:function(a,b){var z,y
z=this.giE()+b
if(!(b<0)){y=this.gi5()
if(typeof y!=="number")return H.v(y)
y=z>=y}else y=!0
if(y)throw H.c(P.cB(b,this,"index",null,null))
return J.ev(this.a,z)},
bx:function(a,b){var z,y,x,w,v,u,t,s,r
z=this.b
y=this.a
x=J.K(y)
w=x.gl(y)
v=w-z
if(v<0)v=0
u=this.$ti
if(b){t=H.r([],u)
C.a.sl(t,v)}else{s=new Array(v)
s.fixed$length=Array
t=H.r(s,u)}for(r=0;r<v;++r){u=x.an(y,z+r)
if(r>=t.length)return H.e(t,r)
t[r]=u
if(x.gl(y)<w)throw H.c(new P.B(this))}return t},
hL:function(a,b,c,d){var z=this.b
if(z<0)H.f(P.X(z,0,null,"start",null))},
A:{
fK:function(a,b,c,d){var z=new H.nT(a,b,c,[d])
z.hL(a,b,c,d)
return z}}},
dv:{"^":"d;a,b,c,d,$ti",
gF:function(){return this.d},
t:function(){var z,y,x
z=this.a
y=z.gl(z)
if(this.b!==y)throw H.c(new P.B(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z.an(0,x);++this.c
return!0}},
cG:{"^":"y;a,b,$ti",
gY:function(a){return new H.ll(null,J.af(this.a),this.b,this.$ti)},
gl:function(a){return J.aD(this.a)},
gK:function(a){return J.ew(this.a)},
gE:function(a){return this.b.$1(J.ii(this.a))},
$asy:function(a,b){return[b]},
A:{
bw:function(a,b,c,d){if(!!J.n(a).$isV)return new H.bt(a,b,[c,d])
return new H.cG(a,b,[c,d])}}},
bt:{"^":"cG;a,b,$ti",$isV:1,
$asV:function(a,b){return[b]}},
ll:{"^":"cE;a,b,c,$ti",
t:function(){var z=this.b
if(z.t()){this.a=this.c.$1(z.gF())
return!0}this.a=null
return!1},
gF:function(){return this.a},
$ascE:function(a,b){return[b]}},
an:{"^":"aS;a,b,$ti",
gl:function(a){return J.aD(this.a)},
an:function(a,b){return this.b.$1(J.ev(this.a,b))},
$asaS:function(a,b){return[b]},
$asV:function(a,b){return[b]},
$asy:function(a,b){return[b]}},
I:{"^":"y;a,b,$ti",
gY:function(a){return new H.cU(J.af(this.a),this.b,this.$ti)},
aP:function(a,b){return new H.cG(this,b,[H.m(this,0),null])}},
cU:{"^":"cE;a,b,$ti",
t:function(){var z,y
for(z=this.a,y=this.b;z.t();)if(y.$1(z.gF())===!0)return!0
return!1},
gF:function(){return this.a.gF()}},
fu:{"^":"y;a,b,$ti",
gY:function(a){return new H.n1(J.af(this.a),this.b,this.$ti)},
A:{
n0:function(a,b,c){if(!!J.n(a).$isV)return new H.kc(a,H.hk(b),[c])
return new H.fu(a,H.hk(b),[c])}}},
kc:{"^":"fu;a,b,$ti",
gl:function(a){var z=J.aD(this.a)-this.b
if(z>=0)return z
return 0},
$isV:1},
n1:{"^":"cE;a,b,$ti",
t:function(){var z,y
for(z=this.a,y=0;y<this.b;++y)z.t()
this.b=0
return z.t()},
gF:function(){return this.a.gF()}}}],["","",,H,{"^":"",
ce:function(a,b){var z=a.cC(b)
if(!init.globalState.d.cy)init.globalState.f.bm()
return z},
i2:function(a,b){var z,y,x,w,v,u
z={}
z.a=b
if(b==null){b=[]
z.a=b
y=b}else y=b
if(!J.n(y).$isJ)throw H.c(P.G("Arguments to main must be a List: "+H.b(y)))
init.globalState=new H.pF(0,0,1,null,null,null,null,null,null,null,null,null,a)
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
y.f=new H.pe(P.b1(null,H.cc),0)
x=P.u
y.z=new H.O(0,null,null,null,null,null,0,[x,H.e5])
y.ch=new H.O(0,null,null,null,null,null,0,[x,null])
if(y.x===!0){w=new H.pE()
y.Q=w
self.onmessage=function(c,d){return function(e){c(d,e)}}(H.kM,w)
self.dartPrint=self.dartPrint||function(c){return function(d){if(self.console&&self.console.log)self.console.log(d)
else self.postMessage(c(d))}}(H.pG)}if(init.globalState.x===!0)return
y=init.globalState.a++
w=P.W(null,null,null,x)
v=new H.c5(0,null,!1)
u=new H.e5(y,new H.O(0,null,null,null,null,null,0,[x,H.c5]),w,init.createNewIsolate(),v,new H.b7(H.d8()),new H.b7(H.d8()),!1,!1,[],P.W(null,null,null,null),null,null,!1,!0,P.W(null,null,null,null))
w.q(0,0)
u.dN(0,v)
init.globalState.e=u
init.globalState.d=u
if(H.at(a,{func:1,args:[,]}))u.cC(new H.tn(z,a))
else if(H.at(a,{func:1,args:[,,]}))u.cC(new H.to(z,a))
else u.cC(a)
init.globalState.f.bm()},
kQ:function(){var z=init.currentScript
if(z!=null)return String(z.src)
if(init.globalState.x===!0)return H.kR()
return},
kR:function(){var z,y
z=new Error().stack
if(z==null){z=function(){try{throw new Error()}catch(x){return x.stack}}()
if(z==null)throw H.c(new P.P("No stack trace"))}y=z.match(new RegExp("^ *at [^(]*\\((.*):[0-9]*:[0-9]*\\)$","m"))
if(y!=null)return y[1]
y=z.match(new RegExp("^[^@]*@(.*):[0-9]*$","m"))
if(y!=null)return y[1]
throw H.c(new P.P('Cannot extract URI from "'+z+'"'))},
kM:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=new H.cW(!0,[]).bR(b.data)
y=J.K(z)
switch(y.i(z,"command")){case"start":init.globalState.b=y.i(z,"id")
x=y.i(z,"functionName")
w=x==null?init.globalState.cx:init.globalFunctions[x]()
v=y.i(z,"args")
u=new H.cW(!0,[]).bR(y.i(z,"msg"))
t=y.i(z,"isSpawnUri")
s=y.i(z,"startPaused")
r=new H.cW(!0,[]).bR(y.i(z,"replyTo"))
y=init.globalState.a++
q=P.u
p=P.W(null,null,null,q)
o=new H.c5(0,null,!1)
n=new H.e5(y,new H.O(0,null,null,null,null,null,0,[q,H.c5]),p,init.createNewIsolate(),o,new H.b7(H.d8()),new H.b7(H.d8()),!1,!1,[],P.W(null,null,null,null),null,null,!1,!0,P.W(null,null,null,null))
p.q(0,0)
n.dN(0,o)
init.globalState.f.a.av(new H.cc(n,new H.kN(w,v,u,t,s,r),"worker-start"))
init.globalState.d=n
init.globalState.f.bm()
break
case"spawn-worker":break
case"message":if(y.i(z,"port")!=null)y.i(z,"port").D(y.i(z,"msg"))
init.globalState.f.bm()
break
case"close":init.globalState.ch.a7(0,$.$get$eW().i(0,a))
a.terminate()
init.globalState.f.bm()
break
case"log":H.kL(y.i(z,"msg"))
break
case"print":if(init.globalState.x===!0){y=init.globalState.Q
q=P.ah(["command","print","msg",z])
q=new H.bk(!0,P.bJ(null,P.u)).be(q)
y.toString
self.postMessage(q)}else P.em(y.i(z,"msg"))
break
case"error":throw H.c(y.i(z,"msg"))}},
kL:function(a){var z,y,x,w
if(init.globalState.x===!0){y=init.globalState.Q
x=P.ah(["command","log","msg",a])
x=new H.bk(!0,P.bJ(null,P.u)).be(x)
y.toString
self.postMessage(x)}else try{self.console.log(a)}catch(w){H.z(w)
z=H.A(w)
y=P.cy(z)
throw H.c(y)}},
kO:function(a,b,c,d,e,f){var z,y,x,w
z=init.globalState.d
y=z.a
$.ff=$.ff+("_"+y)
$.fg=$.fg+("_"+y)
y=z.e
x=init.globalState.d.a
w=z.f
f.D(["spawned",new H.cd(y,x),w,z.r])
x=new H.kP(a,b,c,d,z)
if(e===!0){z.ft(w,w)
init.globalState.f.a.av(new H.cc(z,x,"start isolate"))}else x.$0()},
q9:function(a){return new H.cW(!0,[]).bR(new H.bk(!1,P.bJ(null,P.u)).be(a))},
tn:{"^":"a:1;a,b",
$0:function(){this.b.$1(this.a.a)}},
to:{"^":"a:1;a,b",
$0:function(){this.b.$2(this.a.a,null)}},
pF:{"^":"d;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",A:{
pG:function(a){var z=P.ah(["command","print","msg",a])
return new H.bk(!0,P.bJ(null,P.u)).be(z)}}},
e5:{"^":"d;j:a<,b,c,jR:d<,ja:e<,f,r,x,cF:y<,z,Q,ch,cx,cy,db,dx",
ft:function(a,b){if(!this.f.u(0,a))return
if(this.Q.q(0,b)&&!this.y)this.y=!0
this.cv()},
kg:function(a){var z,y,x
if(!this.y)return
z=this.Q
z.a7(0,a)
if(z.a===0){for(z=this.z;y=z.length,y!==0;){if(0>=y)return H.e(z,-1)
x=z.pop()
init.globalState.f.a.fs(x)}this.y=!1}this.cv()},
iX:function(a,b){var z,y,x
if(this.ch==null)this.ch=[]
for(z=J.n(a),y=0;x=this.ch,y<x.length;y+=2)if(z.u(a,x[y])){z=this.ch
x=y+1
if(x>=z.length)return H.e(z,x)
z[x]=b
return}x.push(a)
this.ch.push(b)},
kd:function(a){var z,y,x
if(this.ch==null)return
for(z=J.n(a),y=0;x=this.ch,y<x.length;y+=2)if(z.u(a,x[y])){z=this.ch
x=y+2
z.toString
if(typeof z!=="object"||z===null||!!z.fixed$length)H.f(new P.P("removeRange"))
P.c4(y,x,z.length,null,null,null)
z.splice(y,x-y)
return}},
hv:function(a,b){if(!this.r.u(0,a))return
this.db=b},
jw:function(a,b,c){var z=J.n(b)
if(!z.u(b,0))z=z.u(b,1)&&!this.cy
else z=!0
if(z){a.D(c)
return}z=this.cx
if(z==null){z=P.b1(null,null)
this.cx=z}z.av(new H.pv(a,c))},
jv:function(a,b){var z
if(!this.r.u(0,a))return
z=J.n(b)
if(!z.u(b,0))z=z.u(b,1)&&!this.cy
else z=!0
if(z){this.eu()
return}z=this.cx
if(z==null){z=P.b1(null,null)
this.cx=z}z.av(this.gjS())},
jx:function(a,b){var z,y,x
z=this.dx
if(z.a===0){if(this.db===!0&&this===init.globalState.e)return
if(self.console&&self.console.error)self.console.error(a,b)
else{P.em(a)
if(b!=null)P.em(b)}return}y=new Array(2)
y.fixed$length=Array
y[0]=J.h(a)
y[1]=b==null?null:J.h(b)
for(x=new P.ac(z,z.r,null,null,[null]),x.c=z.e;x.t();)x.d.D(y)},
cC:function(a){var z,y,x,w,v,u,t
z=init.globalState.d
init.globalState.d=this
$=this.d
y=null
x=this.cy
this.cy=!0
try{y=a.$0()}catch(u){w=H.z(u)
v=H.A(u)
this.jx(w,v)
if(this.db===!0){this.eu()
if(this===init.globalState.e)throw u}}finally{this.cy=x
init.globalState.d=z
if(z!=null)$=z.gjR()
if(this.cx!=null)for(;t=this.cx,!t.gK(t);)this.cx.dn().$0()}return y},
c8:function(a){return this.b.i(0,a)},
dN:function(a,b){var z=this.b
if(z.a1(a))throw H.c(P.cy("Registry: ports must be registered only once."))
z.n(0,a,b)},
cv:function(){var z=this.b
if(z.gl(z)-this.c.a>0||this.y||!this.x)init.globalState.z.n(0,this.a,this)
else this.eu()},
eu:[function(){var z,y,x,w,v
z=this.cx
if(z!=null)z.b_(0)
for(z=this.b,y=z.gce(),y=y.gY(y);y.t();)y.gF().i_()
z.b_(0)
this.c.b_(0)
init.globalState.z.a7(0,this.a)
this.dx.b_(0)
if(this.ch!=null){for(x=0;z=this.ch,y=z.length,x<y;x+=2){w=z[x]
v=x+1
if(v>=y)return H.e(z,v)
w.D(z[v])}this.ch=null}},"$0","gjS",0,0,6]},
pv:{"^":"a:6;a,b",
$0:function(){this.a.D(this.b)}},
pe:{"^":"d;a,b",
jf:function(){var z=this.a
if(z.b===z.c)return
return z.dn()},
h9:function(){var z,y,x
z=this.jf()
if(z==null){if(init.globalState.e!=null)if(init.globalState.z.a1(init.globalState.e.a))if(init.globalState.r===!0){y=init.globalState.e.b
y=y.gK(y)}else y=!1
else y=!1
else y=!1
if(y)H.f(P.cy("Program exited with open ReceivePorts."))
y=init.globalState
if(y.x===!0){x=y.z
x=x.gK(x)&&y.f.b===0}else x=!1
if(x){y=y.Q
x=P.ah(["command","close"])
x=new H.bk(!0,new P.he(0,null,null,null,null,null,0,[null,P.u])).be(x)
y.toString
self.postMessage(x)}return!1}z.kb()
return!0},
fi:function(){if(self.window!=null)new H.pf(this).$0()
else for(;this.h9(););},
bm:function(){var z,y,x,w,v
if(init.globalState.x!==!0)this.fi()
else try{this.fi()}catch(x){z=H.z(x)
y=H.A(x)
w=init.globalState.Q
v=P.ah(["command","error","msg",H.b(z)+"\n"+H.b(y)])
v=new H.bk(!0,P.bJ(null,P.u)).be(v)
w.toString
self.postMessage(v)}}},
pf:{"^":"a:6;a",
$0:function(){if(!this.a.h9())return
P.ok(C.x,this)}},
cc:{"^":"d;a,b,c",
kb:function(){var z=this.a
if(z.y){z.z.push(this)
return}z.cC(this.b)}},
pE:{"^":"d;"},
kN:{"^":"a:1;a,b,c,d,e,f",
$0:function(){H.kO(this.a,this.b,this.c,this.d,this.e,this.f)}},
kP:{"^":"a:6;a,b,c,d,e",
$0:function(){var z,y
z=this.e
z.x=!0
if(this.d!==!0)this.a.$1(this.c)
else{y=this.a
if(H.at(y,{func:1,args:[,,]}))y.$2(this.b,this.c)
else if(H.at(y,{func:1,args:[,]}))y.$1(this.b)
else y.$0()}z.cv()}},
h8:{"^":"d;"},
cd:{"^":"h8;b,a",
D:function(a){var z,y,x
z=init.globalState.z.i(0,this.a)
if(z==null)return
y=this.b
if(y.gf8())return
x=H.q9(a)
if(z.gja()===y){y=J.K(x)
switch(y.i(x,0)){case"pause":z.ft(y.i(x,1),y.i(x,2))
break
case"resume":z.kg(y.i(x,1))
break
case"add-ondone":z.iX(y.i(x,1),y.i(x,2))
break
case"remove-ondone":z.kd(y.i(x,1))
break
case"set-errors-fatal":z.hv(y.i(x,1),y.i(x,2))
break
case"ping":z.jw(y.i(x,1),y.i(x,2),y.i(x,3))
break
case"kill":z.jv(y.i(x,1),y.i(x,2))
break
case"getErrors":y=y.i(x,1)
z.dx.q(0,y)
break
case"stopErrors":y=y.i(x,1)
z.dx.a7(0,y)
break}return}init.globalState.f.a.av(new H.cc(z,new H.pI(this,x),"receive"))},
u:function(a,b){if(b==null)return!1
return b instanceof H.cd&&J.i(this.b,b.b)},
gv:function(a){return this.b.ge_()}},
pI:{"^":"a:1;a,b",
$0:function(){var z=this.a.b
if(!z.gf8())z.hR(this.b)}},
e7:{"^":"h8;b,c,a",
D:function(a){var z,y,x
z=P.ah(["command","message","port",this,"msg",a])
y=new H.bk(!0,P.bJ(null,P.u)).be(z)
if(init.globalState.x===!0){init.globalState.Q.toString
self.postMessage(y)}else{x=init.globalState.ch.i(0,this.b)
if(x!=null)x.postMessage(y)}},
u:function(a,b){if(b==null)return!1
return b instanceof H.e7&&J.i(this.b,b.b)&&J.i(this.a,b.a)&&J.i(this.c,b.c)},
gv:function(a){var z,y,x
z=this.b
if(typeof z!=="number")return z.eK()
y=this.a
if(typeof y!=="number")return y.eK()
x=this.c
if(typeof x!=="number")return H.v(x)
return(z<<16^y<<8^x)>>>0}},
c5:{"^":"d;e_:a<,b,f8:c<",
i_:function(){this.c=!0
this.b=null},
bh:function(){var z,y
if(this.c)return
this.c=!0
this.b=null
z=init.globalState.d
y=this.a
z.b.a7(0,y)
z.c.a7(0,y)
z.cv()},
hR:function(a){if(this.c)return
this.b.$1(a)},
$isme:1},
mf:{"^":"aa;a,b",
ax:function(a,b,c,d){var z=this.b
z.toString
return new P.cV(z,[H.m(z,0)]).ax(a,b,c,d)},
ex:function(a,b,c){return this.ax(a,null,b,c)},
bh:[function(){this.a.bh()
this.b.bh()},"$0","gj6",0,0,6],
hJ:function(a){var z=new P.pX(null,0,null,null,null,null,this.gj6(),[null])
this.b=z
this.a.b=z.giP(z)},
$asaa:I.b5},
og:{"^":"d;a,b,c",
hM:function(a,b){var z,y
if(a===0)z=self.setTimeout==null||init.globalState.x===!0
else z=!1
if(z){this.c=1
z=init.globalState.f
y=init.globalState.d
z.a.av(new H.cc(y,new H.oi(this,b),"timer"))
this.b=!0}else if(self.setTimeout!=null){++init.globalState.f.b
this.c=self.setTimeout(H.d4(new H.oj(this,b),0),a)}else throw H.c(new P.P("Timer greater than 0."))},
A:{
oh:function(a,b){var z=new H.og(!0,!1,null)
z.hM(a,b)
return z}}},
oi:{"^":"a:6;a,b",
$0:function(){this.a.c=null
this.b.$0()}},
oj:{"^":"a:6;a,b",
$0:function(){this.a.c=null;--init.globalState.f.b
this.b.$0()}},
b7:{"^":"d;e_:a<",
gv:function(a){var z=this.a
if(typeof z!=="number")return z.kH()
z=C.k.d6(z,0)^C.k.bD(z,4294967296)
z=(~z>>>0)+(z<<15>>>0)&4294967295
z=((z^z>>>12)>>>0)*5&4294967295
z=((z^z>>>4)>>>0)*2057&4294967295
return(z^z>>>16)>>>0},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(b instanceof H.b7){z=this.a
y=b.a
return z==null?y==null:z===y}return!1}},
bk:{"^":"d;a,b",
be:[function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
z=this.b
y=z.i(0,a)
if(y!=null)return["ref",y]
z.n(0,a,z.gl(z))
z=J.n(a)
if(!!z.$iscF)return this.hr(a)
if(!!z.$iskJ){x=this.gho()
z=a.gc6()
z=H.bw(z,x,H.x(z,"y",0),null)
z=P.T(z,!0,H.x(z,"y",0))
w=a.gce()
w=H.bw(w,x,H.x(w,"y",0),null)
return["map",z,P.T(w,!0,H.x(w,"y",0))]}if(!!z.$isf0)return this.hs(a)
if(!!z.$isaP)this.hc(a)
if(!!z.$isme)this.cO(a,"RawReceivePorts can't be transmitted:")
if(!!z.$iscd)return this.ht(a)
if(!!z.$ise7)return this.hu(a)
if(!!z.$isa){v=a.$static_name
if(v==null)this.cO(a,"Closures can't be transmitted:")
return["function",v]}if(!!z.$isb7)return["capability",a.a]
if(!(a instanceof P.d))this.hc(a)
return["dart",init.classIdExtractor(a),this.hq(init.classFieldsExtractor(a))]},"$1","gho",2,0,0],
cO:function(a,b){throw H.c(new P.P((b==null?"Can't transmit:":b)+" "+H.b(a)))},
hc:function(a){return this.cO(a,null)},
hr:function(a){var z=this.hp(a)
if(!!a.fixed$length)return["fixed",z]
if(!a.fixed$length)return["extendable",z]
if(!a.immutable$list)return["mutable",z]
if(a.constructor===Array)return["const",z]
this.cO(a,"Can't serialize indexable: ")},
hp:function(a){var z,y,x
z=[]
C.a.sl(z,a.length)
for(y=0;y<a.length;++y){x=this.be(a[y])
if(y>=z.length)return H.e(z,y)
z[y]=x}return z},
hq:function(a){var z
for(z=0;z<a.length;++z)C.a.n(a,z,this.be(a[z]))
return a},
hs:function(a){var z,y,x,w
if(!!a.constructor&&a.constructor!==Object)this.cO(a,"Only plain JS Objects are supported:")
z=Object.keys(a)
y=[]
C.a.sl(y,z.length)
for(x=0;x<z.length;++x){w=this.be(a[z[x]])
if(x>=y.length)return H.e(y,x)
y[x]=w}return["js-object",z,y]},
hu:function(a){if(this.a)return["sendport",a.b,a.a,a.c]
return["raw sendport",a]},
ht:function(a){if(this.a)return["sendport",init.globalState.b,a.a,a.b.ge_()]
return["raw sendport",a]}},
cW:{"^":"d;a,b",
bR:[function(a){var z,y,x,w,v,u
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
if(typeof a!=="object"||a===null||a.constructor!==Array)throw H.c(P.G("Bad serialized message: "+H.b(a)))
switch(C.a.gem(a)){case"ref":if(1>=a.length)return H.e(a,1)
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
y=H.r(this.cB(x),[null])
y.fixed$length=Array
return y
case"extendable":if(1>=a.length)return H.e(a,1)
x=a[1]
this.b.push(x)
return H.r(this.cB(x),[null])
case"mutable":if(1>=a.length)return H.e(a,1)
x=a[1]
this.b.push(x)
return this.cB(x)
case"const":if(1>=a.length)return H.e(a,1)
x=a[1]
this.b.push(x)
y=H.r(this.cB(x),[null])
y.fixed$length=Array
return y
case"map":return this.ji(a)
case"sendport":return this.jj(a)
case"raw sendport":if(1>=a.length)return H.e(a,1)
x=a[1]
this.b.push(x)
return x
case"js-object":return this.jh(a)
case"function":if(1>=a.length)return H.e(a,1)
x=init.globalFunctions[a[1]]()
this.b.push(x)
return x
case"capability":if(1>=a.length)return H.e(a,1)
return new H.b7(a[1])
case"dart":y=a.length
if(1>=y)return H.e(a,1)
w=a[1]
if(2>=y)return H.e(a,2)
v=a[2]
u=init.instanceFromClassId(w)
this.b.push(u)
this.cB(v)
return init.initializeEmptyInstance(w,u,v)
default:throw H.c("couldn't deserialize: "+H.b(a))}},"$1","gjg",2,0,0],
cB:function(a){var z,y,x
z=J.K(a)
y=0
while(!0){x=z.gl(a)
if(typeof x!=="number")return H.v(x)
if(!(y<x))break
z.n(a,y,this.bR(z.i(a,y)));++y}return a},
ji:function(a){var z,y,x,w,v,u
z=a.length
if(1>=z)return H.e(a,1)
y=a[1]
if(2>=z)return H.e(a,2)
x=a[2]
w=P.aR()
this.b.push(w)
y=J.ex(y,this.gjg()).cd(0)
for(z=J.K(y),v=J.K(x),u=0;u<z.gl(y);++u){if(u>=y.length)return H.e(y,u)
w.n(0,y[u],this.bR(v.i(x,u)))}return w},
jj:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.e(a,1)
y=a[1]
if(2>=z)return H.e(a,2)
x=a[2]
if(3>=z)return H.e(a,3)
w=a[3]
if(J.i(y,init.globalState.b)){v=init.globalState.z.i(0,x)
if(v==null)return
u=v.c8(w)
if(u==null)return
t=new H.cd(u,x)}else t=new H.e7(y,w,x)
this.b.push(t)
return t},
jh:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.e(a,1)
y=a[1]
if(2>=z)return H.e(a,2)
x=a[2]
w={}
this.b.push(w)
z=J.K(y)
v=J.K(x)
u=0
while(!0){t=z.gl(y)
if(typeof t!=="number")return H.v(t)
if(!(u<t))break
w[z.i(y,u)]=this.bR(v.i(x,u));++u}return w}}}],["","",,H,{"^":"",
jn:function(){throw H.c(new P.P("Cannot modify unmodifiable Map"))},
rJ:function(a){return init.types[a]},
b:function(a){var z
if(typeof a==="string")return a
if(typeof a==="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
z=J.h(a)
if(typeof z!=="string")throw H.c(H.Q(a))
return z},
aw:function(a){var z=a.$identityHash
if(z==null){z=Math.random()*0x3fffffff|0
a.$identityHash=z}return z},
bz:function(a){var z,y,x,w,v,u,t,s
z=J.n(a)
y=z.constructor
if(typeof y=="function"){x=y.name
w=typeof x==="string"?x:null}else w=null
if(w==null||z===C.I||!!J.n(a).$isbi){v=C.L(a)
if(v==="Object"){u=a.constructor
if(typeof u=="function"){t=String(u).match(/^\s*function\s*([\w$]*)\s*\(/)
s=t==null?null:t[1]
if(typeof s==="string"&&/^\w+$/.test(s))w=s}if(w==null)w=v}else w=v}w=w
if(w.length>1&&C.b.cj(w,0)===36)w=C.b.bB(w,1)
return function(b,c){return b.replace(/[^<,> ]+/g,function(d){return c[d]||d})}(w+H.d6(H.ci(a),0,null),init.mangledGlobalNames)},
cJ:function(a){return"Instance of '"+H.bz(a)+"'"},
ai:function(a){var z
if(a<=65535)return String.fromCharCode(a)
if(a<=1114111){z=a-65536
return String.fromCharCode((55296|C.d.d6(z,10))>>>0,56320|z&1023)}throw H.c(P.X(a,0,1114111,null,null))},
bc:function(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
m5:function(a){var z=H.bc(a).getFullYear()+0
return z},
m3:function(a){var z=H.bc(a).getMonth()+1
return z},
m_:function(a){var z=H.bc(a).getDate()+0
return z},
m0:function(a){var z=H.bc(a).getHours()+0
return z},
m2:function(a){var z=H.bc(a).getMinutes()+0
return z},
m4:function(a){var z=H.bc(a).getSeconds()+0
return z},
m1:function(a){var z=H.bc(a).getMilliseconds()+0
return z},
dJ:function(a,b){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.c(H.Q(a))
return a[b]},
fh:function(a,b,c){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.c(H.Q(a))
a[b]=c},
v:function(a){throw H.c(H.Q(a))},
e:function(a,b){if(a==null)J.aD(a)
throw H.c(H.aA(a,b))},
aA:function(a,b){var z,y
if(typeof b!=="number"||Math.floor(b)!==b)return new P.aY(!0,b,"index",null)
z=J.aD(a)
if(!(b<0)){if(typeof z!=="number")return H.v(z)
y=b>=z}else y=!0
if(y)return P.cB(b,a,"index",null,z)
return P.c3(b,"index",null)},
Q:function(a){return new P.aY(!0,a,null,null)},
d2:function(a){if(typeof a!=="number")throw H.c(H.Q(a))
return a},
qu:function(a){if(typeof a!=="number"||Math.floor(a)!==a)throw H.c(H.Q(a))
return a},
bo:function(a){if(typeof a!=="string")throw H.c(H.Q(a))
return a},
c:function(a){var z
if(a==null)a=new P.cH()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.i8})
z.name=""}else z.toString=H.i8
return z},
i8:function(){return J.h(this.dartException)},
f:function(a){throw H.c(a)},
ak:function(a){throw H.c(new P.B(a))},
z:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.u3(a)
if(a==null)return
if(a instanceof H.dk)return z.$1(a.a)
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.d.d6(x,16)&8191)===10)switch(w){case 438:return z.$1(H.ds(H.b(y)+" (Error "+w+")",null))
case 445:case 5007:v=H.b(y)+" (Error "+w+")"
return z.$1(new H.f9(v,null))}}if(a instanceof TypeError){u=$.$get$fS()
t=$.$get$fT()
s=$.$get$fU()
r=$.$get$fV()
q=$.$get$fZ()
p=$.$get$h_()
o=$.$get$fX()
$.$get$fW()
n=$.$get$h1()
m=$.$get$h0()
l=u.bl(y)
if(l!=null)return z.$1(H.ds(y,l))
else{l=t.bl(y)
if(l!=null){l.method="call"
return z.$1(H.ds(y,l))}else{l=s.bl(y)
if(l==null){l=r.bl(y)
if(l==null){l=q.bl(y)
if(l==null){l=p.bl(y)
if(l==null){l=o.bl(y)
if(l==null){l=r.bl(y)
if(l==null){l=n.bl(y)
if(l==null){l=m.bl(y)
v=l!=null}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0
if(v)return z.$1(new H.f9(y,l==null?null:l.method))}}return z.$1(new H.oo(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.fD()
y=function(b){try{return String(b)}catch(k){}return null}(a)
return z.$1(new P.aY(!1,null,null,typeof y==="string"?y.replace(/^RangeError:\s*/,""):y))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.fD()
return a},
A:function(a){var z
if(a instanceof H.dk)return a.b
if(a==null)return new H.hh(a,null)
z=a.$cachedTrace
if(z!=null)return z
return a.$cachedTrace=new H.hh(a,null)},
rV:function(a){if(a==null||typeof a!='object')return J.j(a)
else return H.aw(a)},
rB:function(a,b){var z,y,x,w
z=a.length
for(y=0;y<z;y=w){x=y+1
w=x+1
b.n(0,a[y],a[x])}return b},
rN:function(a,b,c,d,e,f,g){switch(c){case 0:return H.ce(b,new H.rO(a))
case 1:return H.ce(b,new H.rP(a,d))
case 2:return H.ce(b,new H.rQ(a,d,e))
case 3:return H.ce(b,new H.rR(a,d,e,f))
case 4:return H.ce(b,new H.rS(a,d,e,f,g))}throw H.c(P.cy("Unsupported number of arguments for wrapped closure"))},
d4:function(a,b){var z=a.$identity
if(!!z)return z
z=function(c,d,e,f){return function(g,h,i,j){return f(c,e,d,g,h,i,j)}}(a,b,init.globalState.d,H.rN)
a.$identity=z
return z},
jj:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=z.$callName
if(!!J.n(c).$isJ){z.$reflectionInfo=c
x=H.mh(z).r}else x=c
w=d?Object.create(new H.np().constructor.prototype):Object.create(new H.dc(null,null,null,null).constructor.prototype)
w.$initialize=w.constructor
if(d)v=function(){this.$initialize()}
else{u=$.aE
$.aE=J.al(u,1)
v=new Function("a,b,c,d"+u,"this.$initialize(a,b,c,d"+u+")")}w.constructor=v
v.prototype=w
if(!d){t=e.length==1&&!0
s=H.eI(a,z,t)
s.$reflectionInfo=c}else{w.$static_name=f
s=z
t=!1}if(typeof x=="number")r=function(g,h){return function(){return g(h)}}(H.rJ,x)
else if(typeof x=="function")if(d)r=x
else{q=t?H.eD:H.dd
r=function(g,h){return function(){return g.apply({$receiver:h(this)},arguments)}}(x,q)}else throw H.c("Error in reflectionInfo.")
w.$S=r
w[y]=s
for(u=b.length,p=1;p<u;++p){o=b[p]
n=o.$callName
if(n!=null){m=d?o:H.eI(a,o,t)
w[n]=m}}w["call*"]=s
w.$R=z.$R
w.$D=z.$D
return v},
jg:function(a,b,c,d){var z=H.dd
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},
eI:function(a,b,c){var z,y,x,w,v,u,t
if(c)return H.ji(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
v=!w||y>=27
if(v)return H.jg(y,!w,z,b)
if(y===0){w=$.aE
$.aE=J.al(w,1)
u="self"+H.b(w)
w="return function(){var "+u+" = this."
v=$.bs
if(v==null){v=H.cr("self")
$.bs=v}return new Function(w+H.b(v)+";return "+u+"."+H.b(z)+"();}")()}t="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w=$.aE
$.aE=J.al(w,1)
t+=H.b(w)
w="return function("+t+"){return this."
v=$.bs
if(v==null){v=H.cr("self")
$.bs=v}return new Function(w+H.b(v)+"."+H.b(z)+"("+t+");}")()},
jh:function(a,b,c,d){var z,y
z=H.dd
y=H.eD
switch(b?-1:a){case 0:throw H.c(new H.ms("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,z,y)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,z,y)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,z,y)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,z,y)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,z,y)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,z,y)
default:return function(e,f,g,h){return function(){h=[g(this)]
Array.prototype.push.apply(h,arguments)
return e.apply(f(this),h)}}(d,z,y)}},
ji:function(a,b){var z,y,x,w,v,u,t,s
z=H.j7()
y=$.eC
if(y==null){y=H.cr("receiver")
$.eC=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.jh(w,!u,x,b)
if(w===1){y="return function(){return this."+H.b(z)+"."+H.b(x)+"(this."+H.b(y)+");"
u=$.aE
$.aE=J.al(u,1)
return new Function(y+H.b(u)+"}")()}s="abcdefghijklmnopqrstuvwxyz".split("").splice(0,w-1).join(",")
y="return function("+s+"){return this."+H.b(z)+"."+H.b(x)+"(this."+H.b(y)+", "+s+");"
u=$.aE
$.aE=J.al(u,1)
return new Function(y+H.b(u)+"}")()},
ef:function(a,b,c,d,e,f){var z
b.fixed$length=Array
if(!!J.n(c).$isJ){c.fixed$length=Array
z=c}else z=c
return H.jj(a,b,z,!!d,e,f)},
t0:function(a,b){var z=J.K(b)
throw H.c(H.ct(H.bz(a),z.az(b,3,z.gl(b))))},
a5:function(a,b){var z
if(a!=null)z=(typeof a==="object"||typeof a==="function")&&J.n(a)[b]
else z=!0
if(z)return a
H.t0(a,b)},
ei:function(a){var z=J.n(a)
return"$S" in z?z.$S():null},
at:function(a,b){var z
if(a==null)return!1
z=H.ei(a)
return z==null?!1:H.el(z,b)},
hH:function(a,b){var z,y
if(a==null)return a
if(H.at(a,b))return a
z=H.U(b,null)
y=H.ei(a)
throw H.c(H.ct(y!=null?H.U(y,null):H.bz(a),z))},
u1:function(a){throw H.c(new P.jz(a))},
d8:function(){return(Math.random()*0x100000000>>>0)+(Math.random()*0x100000000>>>0)*4294967296},
b4:function(a){return new H.aq(a,null)},
r:function(a,b){a.$ti=b
return a},
ci:function(a){if(a==null)return
return a.$ti},
hM:function(a,b){return H.et(a["$as"+H.b(b)],H.ci(a))},
x:function(a,b,c){var z=H.hM(a,b)
return z==null?null:z[c]},
m:function(a,b){var z=H.ci(a)
return z==null?null:z[b]},
U:function(a,b){var z
if(a==null)return"dynamic"
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a[0].builtin$cls+H.d6(a,1,b)
if(typeof a=="function")return a.builtin$cls
if(typeof a==="number"&&Math.floor(a)===a)return H.b(b==null?a:b.$1(a))
if(typeof a.func!="undefined"){z=a.typedef
if(z!=null)return H.U(z,b)
return H.qe(a,b)}return"unknown-reified-type"},
qe:function(a,b){var z,y,x,w,v,u,t,s,r,q,p
z=!!a.v?"void":H.U(a.ret,b)
if("args" in a){y=a.args
for(x=y.length,w="",v="",u=0;u<x;++u,v=", "){t=y[u]
w=w+v+H.U(t,b)}}else{w=""
v=""}if("opt" in a){s=a.opt
w+=v+"["
for(x=s.length,v="",u=0;u<x;++u,v=", "){t=s[u]
w=w+v+H.U(t,b)}w+="]"}if("named" in a){r=a.named
w+=v+"{"
for(x=H.rA(r),q=x.length,v="",u=0;u<q;++u,v=", "){p=x[u]
w=w+v+H.U(r[p],b)+(" "+H.b(p))}w+="}"}return"("+w+") => "+z},
d6:function(a,b,c){var z,y,x,w,v,u
if(a==null)return""
z=new P.bF("")
for(y=b,x=!0,w=!0,v="";y<a.length;++y){if(x)x=!1
else z.w=v+", "
u=a[y]
if(u!=null)w=!1
v=z.w+=H.U(u,c)}return w?"":"<"+z.k(0)+">"},
hN:function(a){var z,y
if(a instanceof H.a){z=H.ei(a)
if(z!=null)return H.U(z,null)}y=J.n(a).constructor.builtin$cls
if(a==null)return y
return y+H.d6(a.$ti,0,null)},
et:function(a,b){if(a==null)return b
a=a.apply(null,b)
if(a==null)return
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a
if(typeof a=="function")return a.apply(null,b)
return b},
aM:function(a,b,c,d){var z,y
if(a==null)return!1
z=H.ci(a)
y=J.n(a)
if(y[b]==null)return!1
return H.hz(H.et(y[d],z),c)},
aC:function(a,b,c,d){if(a==null)return a
if(H.aM(a,b,c,d))return a
throw H.c(H.ct(H.bz(a),function(e,f){return e.replace(/[^<,> ]+/g,function(g){return f[g]||g})}(b.substring(3)+H.d6(c,0,null),init.mangledGlobalNames)))},
hz:function(a,b){var z,y
if(a==null||b==null)return!0
z=a.length
for(y=0;y<z;++y)if(!H.ae(a[y],b[y]))return!1
return!0},
b3:function(a,b,c){return a.apply(b,H.hM(b,c))},
d3:function(a,b){var z,y,x
if(a==null)return b==null||b.builtin$cls==="d"||b.builtin$cls==="ao"
if(b==null)return!0
z=H.ci(a)
a=J.n(a)
y=a.constructor
if(z!=null){z=z.slice()
z.splice(0,0,y)
y=z}if('func' in b){x=a.$S
if(x==null)return!1
return H.el(x.apply(a,null),b)}return H.ae(y,b)},
i5:function(a,b){if(a!=null&&!H.d3(a,b))throw H.c(H.ct(H.bz(a),H.U(b,null)))
return a},
ae:function(a,b){var z,y,x,w,v,u
if(a===b)return!0
if(a==null||b==null)return!0
if(a.builtin$cls==="ao")return!0
if('func' in b)return H.el(a,b)
if('func' in a)return b.builtin$cls==="bu"||b.builtin$cls==="d"
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
return H.hz(H.et(u,z),x)},
hy:function(a,b,c){var z,y,x,w,v
z=b==null
if(z&&a==null)return!0
if(z)return c
if(a==null)return!1
y=a.length
x=b.length
if(c){if(y<x)return!1}else if(y!==x)return!1
for(w=0;w<x;++w){z=a[w]
v=b[w]
if(!(H.ae(z,v)||H.ae(v,z)))return!1}return!0},
qo:function(a,b){var z,y,x,w,v,u
if(b==null)return!0
if(a==null)return!1
z=Object.getOwnPropertyNames(b)
z.fixed$length=Array
y=z
for(z=y.length,x=0;x<z;++x){w=y[x]
if(!Object.hasOwnProperty.call(a,w))return!1
v=b[w]
u=a[w]
if(!(H.ae(v,u)||H.ae(u,v)))return!1}return!0},
el:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
if(!('func' in a))return!1
if("v" in a){if(!("v" in b)&&"ret" in b)return!1}else if(!("v" in b)){z=a.ret
y=b.ret
if(!(H.ae(z,y)||H.ae(y,z)))return!1}x=a.args
w=b.args
v=a.opt
u=b.opt
t=x!=null?x.length:0
s=w!=null?w.length:0
r=v!=null?v.length:0
q=u!=null?u.length:0
if(t>s)return!1
if(t+r<s+q)return!1
if(t===s){if(!H.hy(x,w,!1))return!1
if(!H.hy(v,u,!0))return!1}else{for(p=0;p<t;++p){o=x[p]
n=w[p]
if(!(H.ae(o,n)||H.ae(n,o)))return!1}for(m=p,l=0;m<s;++l,++m){o=v[l]
n=w[m]
if(!(H.ae(o,n)||H.ae(n,o)))return!1}for(m=0;m<q;++l,++m){o=v[l]
n=u[m]
if(!(H.ae(o,n)||H.ae(n,o)))return!1}}return H.qo(a.named,b.named)},
tX:function(a,b,c){var z
if(typeof b==="string")return a.indexOf(b,c)>=0
else{z=J.n(b)
if(!!z.$isdq){z=C.b.bB(a,c)
return b.b.test(z)}else{z=z.eg(b,C.b.bB(a,c))
return!z.gK(z)}}},
tZ:function(a,b,c,d){var z,y,x
z=b.f2(a,d)
if(z==null)return a
y=z.b
x=y.index
return H.es(a,x,x+y[0].length,c)},
o:function(a,b,c){var z,y,x
H.bo(c)
if(b==="")if(a==="")return c
else{z=a.length
y=H.b(c)
for(x=0;x<z;++x)y=y+a[x]+H.b(c)
return y.charCodeAt(0)==0?y:y}else return a.replace(new RegExp(b.replace(/[[\]{}()*+?.\\^$|]/g,"\\$&"),'g'),c.replace(/\$/g,"$$$$"))},
uE:[function(a){return a},"$1","hl",2,0,21],
tY:function(a,b,c,d){var z,y,x,w,v,u
z=J.n(b)
if(!z.$isdG)throw H.c(P.co(b,"pattern","is not a Pattern"))
for(z=z.eg(b,a),z=new H.h6(z.a,z.b,z.c,null),y=0,x="";z.t();){w=z.d
v=w.b
u=v.index
x=x+H.b(H.hl().$1(C.b.az(a,y,u)))+H.b(c.$1(w))
y=u+v[0].length}z=x+H.b(H.hl().$1(C.b.bB(a,y)))
return z.charCodeAt(0)==0?z:z},
er:function(a,b,c,d){var z,y,x,w,v,u
if(typeof b==="string"){z=a.indexOf(b,d)
if(z<0)return a
return H.es(a,z,z+b.length,c)}y=J.n(b)
if(!!y.$isdq)return d===0?a.replace(b.b,c.replace(/\$/g,"$$$$")):H.tZ(a,b,c,d)
if(b==null)H.f(H.Q(b))
y=y.d7(b,a,d)
x=y.gY(y)
if(!x.t())return a
w=x.gF()
y=w.geO()
v=w.gfE()
H.bo(c)
u=P.c4(y,v,a.length,null,null,null)
H.qu(u)
return H.es(a,y,u,c)},
es:function(a,b,c,d){var z,y
z=a.substring(0,b)
y=a.substring(c)
return z+H.b(d)+y},
jm:{"^":"d;$ti",
gK:function(a){return this.gl(this)===0},
gak:function(a){return this.gl(this)!==0},
k:function(a){return P.dz(this)},
n:function(a,b,c){return H.jn()},
$isD:1},
jo:{"^":"jm;a,b,c,$ti",
gl:function(a){return this.a},
a1:function(a){if(typeof a!=="string")return!1
if("__proto__"===a)return!1
return this.b.hasOwnProperty(a)},
i:function(a,b){if(!this.a1(b))return
return this.f3(b)},
f3:function(a){return this.b[a]},
L:function(a,b){var z,y,x,w
z=this.c
for(y=z.length,x=0;x<y;++x){w=z[x]
b.$2(w,this.f3(w))}}},
mg:{"^":"d;a,b,c,d,e,f,r,x",A:{
mh:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z.fixed$length=Array
z=z
y=z[0]
x=z[1]
return new H.mg(a,z,(y&1)===1,y>>1,x>>1,(x&1)===1,z[2],null)}}},
ol:{"^":"d;a,b,c,d,e,f",
bl:function(a){var z,y,x
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
A:{
aI:function(a){var z,y,x,w,v,u
a=a.replace(String({}),'$receiver$').replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
z=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(z==null)z=[]
y=z.indexOf("\\$arguments\\$")
x=z.indexOf("\\$argumentsExpr\\$")
w=z.indexOf("\\$expr\\$")
v=z.indexOf("\\$method\\$")
u=z.indexOf("\\$receiver\\$")
return new H.ol(a.replace(new RegExp('\\\\\\$arguments\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$argumentsExpr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$expr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$method\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$receiver\\\\\\$','g'),'((?:x|[^x])*)'),y,x,w,v,u)},
cT:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},
fY:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},
f9:{"^":"Z;a,b",
k:function(a){var z=this.b
if(z==null)return"NullError: "+H.b(this.a)
return"NullError: method not found: '"+H.b(z)+"' on null"}},
kX:{"^":"Z;a,b,c",
k:function(a){var z,y
z=this.b
if(z==null)return"NoSuchMethodError: "+H.b(this.a)
y=this.c
if(y==null)return"NoSuchMethodError: method not found: '"+z+"' ("+H.b(this.a)+")"
return"NoSuchMethodError: method not found: '"+z+"' on '"+y+"' ("+H.b(this.a)+")"},
A:{
ds:function(a,b){var z,y
z=b==null
y=z?null:b.method
return new H.kX(a,y,z?null:b.receiver)}}},
oo:{"^":"Z;a",
k:function(a){var z=this.a
return z.length===0?"Error":"Error: "+z}},
dk:{"^":"d;a,bf:b<"},
u3:{"^":"a:0;a",
$1:function(a){if(!!J.n(a).$isZ)if(a.$thrownJsError==null)a.$thrownJsError=this.a
return a}},
hh:{"^":"d;a,b",
k:function(a){var z,y
z=this.b
if(z!=null)return z
z=this.a
y=z!==null&&typeof z==="object"?z.stack:null
z=y==null?"":y
this.b=z
return z}},
rO:{"^":"a:1;a",
$0:function(){return this.a.$0()}},
rP:{"^":"a:1;a,b",
$0:function(){return this.a.$1(this.b)}},
rQ:{"^":"a:1;a,b,c",
$0:function(){return this.a.$2(this.b,this.c)}},
rR:{"^":"a:1;a,b,c,d",
$0:function(){return this.a.$3(this.b,this.c,this.d)}},
rS:{"^":"a:1;a,b,c,d,e",
$0:function(){return this.a.$4(this.b,this.c,this.d,this.e)}},
a:{"^":"d;",
k:function(a){return"Closure '"+H.bz(this).trim()+"'"},
ghk:function(){return this},
$isbu:1,
ghk:function(){return this}},
fO:{"^":"a;"},
np:{"^":"fO;",
k:function(a){var z=this.$static_name
if(z==null)return"Closure of unknown static method"
return"Closure '"+z+"'"}},
dc:{"^":"fO;a,b,c,d",
u:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof H.dc))return!1
return this.a===b.a&&this.b===b.b&&this.c===b.c},
gv:function(a){var z,y
z=this.c
if(z==null)y=H.aw(this.a)
else y=typeof z!=="object"?J.j(z):H.aw(z)
z=H.aw(this.b)
if(typeof y!=="number")return y.kI()
return(y^z)>>>0},
k:function(a){var z=this.c
if(z==null)z=this.a
return"Closure '"+H.b(this.d)+"' of "+H.cJ(z)},
A:{
dd:function(a){return a.a},
eD:function(a){return a.c},
j7:function(){var z=$.bs
if(z==null){z=H.cr("self")
$.bs=z}return z},
cr:function(a){var z,y,x,w,v
z=new H.dc("self","target","receiver","name")
y=Object.getOwnPropertyNames(z)
y.fixed$length=Array
x=y
for(y=x.length,w=0;w<y;++w){v=x[w]
if(z[v]===a)return v}}}},
jc:{"^":"Z;a",
k:function(a){return this.a},
A:{
ct:function(a,b){return new H.jc("CastError: Casting value of type '"+a+"' to incompatible type '"+b+"'")}}},
ms:{"^":"Z;a",
k:function(a){return"RuntimeError: "+H.b(this.a)}},
aq:{"^":"d;a,b",
k:function(a){var z,y
z=this.b
if(z!=null)return z
y=function(b,c){return b.replace(/[^<,> ]+/g,function(d){return c[d]||d})}(this.a,init.mangledGlobalNames)
this.b=y
return y},
gv:function(a){return J.j(this.a)},
u:function(a,b){if(b==null)return!1
return b instanceof H.aq&&J.i(this.a,b.a)}},
O:{"^":"d;a,b,c,d,e,f,r,$ti",
gl:function(a){return this.a},
gK:function(a){return this.a===0},
gak:function(a){return!this.gK(this)},
gc6:function(){return new H.l9(this,[H.m(this,0)])},
gce:function(){return H.bw(this.gc6(),new H.kW(this),H.m(this,0),H.m(this,1))},
a1:function(a){var z,y
if(typeof a==="string"){z=this.b
if(z==null)return!1
return this.eZ(z,a)}else if(typeof a==="number"&&(a&0x3ffffff)===a){y=this.c
if(y==null)return!1
return this.eZ(y,a)}else return this.jI(a)},
jI:function(a){var z=this.d
if(z==null)return!1
return this.cE(this.d2(z,this.cD(a)),a)>=0},
i:function(a,b){var z,y,x
if(typeof b==="string"){z=this.b
if(z==null)return
y=this.cm(z,b)
return y==null?null:y.gbT()}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null)return
y=this.cm(x,b)
return y==null?null:y.gbT()}else return this.jJ(b)},
jJ:function(a){var z,y,x
z=this.d
if(z==null)return
y=this.d2(z,this.cD(a))
x=this.cE(y,a)
if(x<0)return
return y[x].gbT()},
n:function(a,b,c){var z,y
if(typeof b==="string"){z=this.b
if(z==null){z=this.e1()
this.b=z}this.eT(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=this.e1()
this.c=y}this.eT(y,b,c)}else this.jL(b,c)},
jL:function(a,b){var z,y,x,w
z=this.d
if(z==null){z=this.e1()
this.d=z}y=this.cD(a)
x=this.d2(z,y)
if(x==null)this.ec(z,y,[this.e2(a,b)])
else{w=this.cE(x,a)
if(w>=0)x[w].sbT(b)
else x.push(this.e2(a,b))}},
kc:function(a,b){var z
if(this.a1(a))return this.i(0,a)
z=b.$0()
this.n(0,a,z)
return z},
a7:function(a,b){if(typeof b==="string")return this.fh(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.fh(this.c,b)
else return this.jK(b)},
jK:function(a){var z,y,x,w
z=this.d
if(z==null)return
y=this.d2(z,this.cD(a))
x=this.cE(y,a)
if(x<0)return
w=y.splice(x,1)[0]
this.fk(w)
return w.gbT()},
b_:function(a){if(this.a>0){this.f=null
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
eT:function(a,b,c){var z=this.cm(a,b)
if(z==null)this.ec(a,b,this.e2(b,c))
else z.sbT(c)},
fh:function(a,b){var z
if(a==null)return
z=this.cm(a,b)
if(z==null)return
this.fk(z)
this.f_(a,b)
return z.gbT()},
e2:function(a,b){var z,y
z=new H.l8(a,b,null,null,[null,null])
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.d=y
y.c=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
fk:function(a){var z,y
z=a.git()
y=a.c
if(z==null)this.e=y
else z.c=y
if(y==null)this.f=z
else y.d=z;--this.a
this.r=this.r+1&67108863},
cD:function(a){return J.j(a)&0x3ffffff},
cE:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.i(a[y].gfL(),b))return y
return-1},
k:function(a){return P.dz(this)},
cm:function(a,b){return a[b]},
d2:function(a,b){return a[b]},
ec:function(a,b,c){a[b]=c},
f_:function(a,b){delete a[b]},
eZ:function(a,b){return this.cm(a,b)!=null},
e1:function(){var z=Object.create(null)
this.ec(z,"<non-identifier-key>",z)
this.f_(z,"<non-identifier-key>")
return z},
$iskJ:1,
$isD:1,
A:{
f3:function(a,b){return new H.O(0,null,null,null,null,null,0,[a,b])}}},
kW:{"^":"a:0;a",
$1:function(a){return this.a.i(0,a)}},
l8:{"^":"d;fL:a<,bT:b@,c,it:d<,$ti"},
l9:{"^":"V;a,$ti",
gl:function(a){return this.a.a},
gK:function(a){return this.a.a===0},
gY:function(a){var z,y
z=this.a
y=new H.la(z,z.r,null,null,this.$ti)
y.c=z.e
return y},
Z:function(a,b){return this.a.a1(b)},
L:function(a,b){var z,y,x
z=this.a
y=z.e
x=z.r
for(;y!=null;){b.$1(y.a)
if(x!==z.r)throw H.c(new P.B(z))
y=y.c}}},
la:{"^":"d;a,b,c,d,$ti",
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
gip:function(){var z=this.c
if(z!=null)return z
z=this.b
z=H.dr(this.a,z.multiline,!z.ignoreCase,!0)
this.c=z
return z},
gio:function(){var z=this.d
if(z!=null)return z
z=this.b
z=H.dr(this.a+"|()",z.multiline,!z.ignoreCase,!0)
this.d=z
return z},
d7:function(a,b,c){if(c>b.length)throw H.c(P.X(c,0,b.length,null,null))
return new H.oV(this,b,c)},
eg:function(a,b){return this.d7(a,b,0)},
f2:function(a,b){var z,y
z=this.gip()
z.lastIndex=b
y=z.exec(a)
if(y==null)return
return new H.hg(this,y)},
i6:function(a,b){var z,y
z=this.gio()
z.lastIndex=b
y=z.exec(a)
if(y==null)return
if(0>=y.length)return H.e(y,-1)
if(y.pop()!=null)return
return new H.hg(this,y)},
fQ:function(a,b,c){if(c>b.length)throw H.c(P.X(c,0,b.length,null,null))
return this.i6(b,c)},
$isdG:1,
A:{
dr:function(a,b,c,d){var z,y,x,w
z=b?"m":""
y=c?"":"i"
x=d?"g":""
w=function(e,f){try{return new RegExp(e,f)}catch(v){return v}}(a,z+y+x)
if(w instanceof RegExp)return w
throw H.c(new P.eU("Illegal RegExp pattern ("+String(w)+")",a,null))}}},
hg:{"^":"d;a,b",
geO:function(){return this.b.index},
gfE:function(){var z=this.b
return z.index+z[0].length},
i:function(a,b){var z=this.b
if(b>>>0!==b||b>=z.length)return H.e(z,b)
return z[b]},
$isbb:1},
oV:{"^":"cD;a,b,c",
gY:function(a){return new H.h6(this.a,this.b,this.c,null)},
$ascD:function(){return[P.bb]},
$asy:function(){return[P.bb]}},
h6:{"^":"d;a,b,c,d",
gF:function(){return this.d},
t:function(){var z,y,x,w
z=this.b
if(z==null)return!1
y=this.c
if(y<=z.length){x=this.a.f2(z,y)
if(x!=null){this.d=x
z=x.b
y=z.index
w=y+z[0].length
this.c=y===w?w+1:w
return!0}}this.d=null
this.b=null
return!1}},
fJ:{"^":"d;eO:a<,b,c",
gfE:function(){return this.a+this.c.length},
i:function(a,b){if(b!==0)H.f(P.c3(b,null,null))
return this.c},
$isbb:1},
pT:{"^":"y;a,b,c",
gY:function(a){return new H.pU(this.a,this.b,this.c,null)},
$asy:function(){return[P.bb]}},
pU:{"^":"d;a,b,c,d",
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
this.d=new H.fJ(u,w,y)
this.c=t===this.c?t+1:t
return!0},
gF:function(){return this.d}}}],["","",,H,{"^":"",
rA:function(a){var z=H.r(a?Object.keys(a):[],[null])
z.fixed$length=Array
return z}}],["","",,H,{"^":"",
t_:function(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)}}],["","",,P,{"^":"",
oW:function(){var z,y,x
z={}
if(self.scheduleImmediate!=null)return P.qp()
if(self.MutationObserver!=null&&self.document!=null){y=self.document.createElement("div")
x=self.document.createElement("span")
z.a=null
new self.MutationObserver(H.d4(new P.oY(z),1)).observe(y,{childList:true})
return new P.oX(z,y,x)}else if(self.setImmediate!=null)return P.qq()
return P.qr()},
uy:[function(a){++init.globalState.f.b
self.scheduleImmediate(H.d4(new P.oZ(a),0))},"$1","qp",2,0,12],
uz:[function(a){++init.globalState.f.b
self.setImmediate(H.d4(new P.p_(a),0))},"$1","qq",2,0,12],
uA:[function(a){P.dW(C.x,a)},"$1","qr",2,0,12],
az:function(a,b){P.e8(null,a)
return b.gfI()},
ar:function(a,b){P.e8(a,b)},
ay:function(a,b){b.bQ(a)},
ax:function(a,b){b.ej(H.z(a),H.A(a))},
e8:function(a,b){var z,y,x,w
z=new P.q3(b)
y=new P.q4(b)
x=J.n(a)
if(!!x.$isC)a.ed(z,y)
else if(!!x.$isN)a.eD(z,y)
else{w=new P.C(0,$.p,null,[null])
w.a=4
w.c=a
w.ed(z,null)}},
as:function(a){var z=function(b,c){return function(d,e){while(true)try{b(d,e)
break}catch(y){e=y
d=c}}}(a,1)
$.p.toString
return new P.qn(z)},
cZ:function(a,b,c){var z,y,x
if(b===0){if(c.geq())c.c.ei()
else c.a.bh()
return}else if(b===1){if(c.geq())c.c.ej(H.z(a),H.A(a))
else{z=H.z(a)
y=H.A(a)
c.a.ef(z,y)
c.a.bh()}return}if(a instanceof P.bH){if(c.geq()){b.$2(2,null)
return}z=a.b
if(z===0){z=a.a
J.aO(c.a,z)
P.cj(new P.q1(b,c))
return}else if(z===1){x=a.a
c.a.j1(x,!1).bW(new P.q2(b,c))
return}}P.e8(a,b)},
qm:function(a){return a.gdK()},
ec:function(a,b){if(H.at(a,{func:1,args:[P.ao,P.ao]})){b.toString
return a}else{b.toString
return a}},
av:function(a){return new P.pV(new P.C(0,$.p,null,[a]),[a])},
qc:function(a,b,c){$.p.toString
a.b4(b,c)},
qg:function(){var z,y
for(;z=$.bl,z!=null;){$.bL=null
y=z.gc9()
$.bl=y
if(y==null)$.bK=null
z.gj3().$0()}},
uD:[function(){$.e9=!0
try{P.qg()}finally{$.bL=null
$.e9=!1
if($.bl!=null)$.$get$e_().$1(P.hA())}},"$0","hA",0,0,6],
hu:function(a){var z=new P.h7(a,null)
if($.bl==null){$.bK=z
$.bl=z
if(!$.e9)$.$get$e_().$1(P.hA())}else{$.bK.b=z
$.bK=z}},
ql:function(a){var z,y,x
z=$.bl
if(z==null){P.hu(a)
$.bL=$.bK
return}y=new P.h7(a,null)
x=$.bL
if(x==null){y.b=z
$.bL=y
$.bl=y}else{y.b=x.b
x.b=y
$.bL=y
if(y.b==null)$.bK=y}},
cj:function(a){var z=$.p
if(C.h===z){P.bn(null,null,C.h,a)
return}z.toString
P.bn(null,null,z,z.eh(a,!0))},
uv:function(a,b){return new P.pS(null,a,!1,[b])},
ed:function(a){var z,y,x,w
if(a==null)return
try{a.$0()}catch(x){z=H.z(x)
y=H.A(x)
w=$.p
w.toString
P.bm(null,null,w,z,y)}},
qh:[function(a,b){var z=$.p
z.toString
P.bm(null,null,z,a,b)},function(a){return P.qh(a,null)},"$2","$1","qt",2,2,16,0],
uC:[function(){},"$0","qs",0,0,6],
ht:function(a,b,c){var z,y,x,w,v,u,t
try{b.$1(a.$0())}catch(u){z=H.z(u)
y=H.A(u)
$.p.toString
x=null
if(x==null)c.$2(z,y)
else{t=x.gbi()
w=t
v=x.gbf()
c.$2(w,v)}}},
q5:function(a,b,c,d){var z=a.c5()
if(!!J.n(z).$isN&&z!==$.$get$b9())z.bY(new P.q7(b,c,d))
else b.b4(c,d)},
hi:function(a,b){return new P.q6(a,b)},
hj:function(a,b,c){var z=a.c5()
if(!!J.n(z).$isN&&z!==$.$get$b9())z.bY(new P.q8(b,c))
else b.b3(c)},
q0:function(a,b,c){$.p.toString
a.c3(b,c)},
ok:function(a,b){var z=$.p
if(z===C.h){z.toString
return P.dW(a,b)}return P.dW(a,z.eh(b,!0))},
dW:function(a,b){var z=C.d.bD(a.a,1000)
return H.oh(z<0?0:z,b)},
oy:function(){return $.p},
bm:function(a,b,c,d,e){var z={}
z.a=d
P.ql(new P.qj(z,e))},
hq:function(a,b,c,d){var z,y
y=$.p
if(y===c)return d.$0()
$.p=c
z=y
try{y=d.$0()
return y}finally{$.p=z}},
hs:function(a,b,c,d,e){var z,y
y=$.p
if(y===c)return d.$1(e)
$.p=c
z=y
try{y=d.$1(e)
return y}finally{$.p=z}},
hr:function(a,b,c,d,e,f){var z,y
y=$.p
if(y===c)return d.$2(e,f)
$.p=c
z=y
try{y=d.$2(e,f)
return y}finally{$.p=z}},
bn:function(a,b,c,d){var z=C.h!==c
if(z)d=c.eh(d,!(!z||!1))
P.hu(d)},
oY:{"^":"a:0;a",
$1:function(a){var z,y;--init.globalState.f.b
z=this.a
y=z.a
z.a=null
y.$0()}},
oX:{"^":"a:48;a,b,c",
$1:function(a){var z,y;++init.globalState.f.b
this.a.a=a
z=this.b
y=this.c
z.firstChild?z.removeChild(y):z.appendChild(y)}},
oZ:{"^":"a:1;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
p_:{"^":"a:1;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
q3:{"^":"a:0;a",
$1:function(a){return this.a.$2(0,a)}},
q4:{"^":"a:15;a",
$2:function(a,b){this.a.$2(1,new H.dk(a,b))}},
qn:{"^":"a:30;a",
$2:function(a,b){this.a(a,b)}},
q1:{"^":"a:1;a,b",
$0:function(){var z=this.b
if(z.a.gcF()){z.b=!0
return}this.a.$2(null,0)}},
q2:{"^":"a:0;a,b",
$1:function(a){var z=this.b.c!=null?2:0
this.a.$2(z,null)}},
p0:{"^":"d;a,b,c",
gdK:function(){return this.a.gdK()},
gcF:function(){return this.a.gcF()},
geq:function(){return this.c!=null},
q:function(a,b){return J.aO(this.a,b)},
ef:function(a,b){return this.a.ef(a,b)},
bh:function(){return this.a.bh()},
hO:function(a){var z=new P.p3(a)
this.a=new P.p8(null,0,null,new P.p5(z),null,new P.p6(this,z),new P.p7(this,a),[null])},
A:{
p1:function(a){var z=new P.p0(null,!1,null)
z.hO(a)
return z}}},
p3:{"^":"a:1;a",
$0:function(){P.cj(new P.p4(this.a))}},
p4:{"^":"a:1;a",
$0:function(){this.a.$2(0,null)}},
p5:{"^":"a:1;a",
$0:function(){this.a.$0()}},
p6:{"^":"a:1;a,b",
$0:function(){var z=this.a
if(z.b===!0){z.b=!1
this.b.$0()}}},
p7:{"^":"a:1;a,b",
$0:function(){var z=this.a
if(!z.a.gjP()){z.c=new P.ca(new P.C(0,$.p,null,[null]),[null])
if(z.b===!0){z.b=!1
P.cj(new P.p2(this.b))}return z.c.gfI()}}},
p2:{"^":"a:1;a",
$0:function(){this.a.$2(2,null)}},
bH:{"^":"d;ad:a<,b",
k:function(a){return"IterationMarker("+this.b+", "+H.b(this.a)+")"},
A:{
bI:function(a){return new P.bH(a,1)},
aJ:function(){return C.a8},
hc:function(a){return new P.bH(a,0)},
aK:function(a){return new P.bH(a,3)}}},
b2:{"^":"d;a,b,c,d",
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
else{w=J.af(z)
if(!!w.$isb2){z=this.d
if(z==null){z=[]
this.d=z}z.push(this.a)
this.a=w.a
continue}else{this.c=w
continue}}}}else{this.b=y
return!0}}return!1}},
pW:{"^":"cD;a",
gY:function(a){return new P.b2(this.a(),null,null,null)},
$ascD:I.b5,
$asy:I.b5,
A:{
aL:function(a){return new P.pW(a)}}},
N:{"^":"d;$ti"},
h9:{"^":"d;fI:a<,$ti",
ej:function(a,b){if(a==null)a=new P.cH()
if(this.a.a!==0)throw H.c(new P.E("Future already completed"))
$.p.toString
this.b4(a,b)},
dc:function(a){return this.ej(a,null)}},
ca:{"^":"h9;a,$ti",
bQ:function(a){var z=this.a
if(z.a!==0)throw H.c(new P.E("Future already completed"))
z.bs(a)},
ei:function(){return this.bQ(null)},
b4:function(a,b){this.a.eV(a,b)}},
pV:{"^":"h9;a,$ti",
bQ:function(a){var z=this.a
if(z.a!==0)throw H.c(new P.E("Future already completed"))
z.b3(a)},
ei:function(){return this.bQ(null)},
b4:function(a,b){this.a.b4(a,b)}},
e4:{"^":"d;e4:a<,b,c,d,e,$ti",
giK:function(){return this.b.b},
gfK:function(){return(this.c&1)!==0},
gjA:function(){return(this.c&2)!==0},
gfJ:function(){return this.c===8},
jy:function(a){return this.b.b.eC(this.d,a)},
jY:function(a){if(this.c!==6)return!0
return this.b.b.eC(this.d,a.gbi())},
ju:function(a){var z,y
z=this.e
y=this.b.b
if(H.at(z,{func:1,args:[,,]}))return y.kq(z,a.gbi(),a.gbf())
else return y.eC(z,a.gbi())},
jz:function(){return this.b.b.h7(this.d)}},
C:{"^":"d;ct:a<,b,iy:c<,$ti",
gii:function(){return this.a===2},
ge0:function(){return this.a>=4},
eD:function(a,b){var z=$.p
if(z!==C.h){z.toString
if(b!=null)b=P.ec(b,z)}return this.ed(a,b)},
bW:function(a){return this.eD(a,null)},
ed:function(a,b){var z,y
z=new P.C(0,$.p,null,[null])
y=b==null?1:3
this.cY(new P.e4(null,z,y,a,b,[H.m(this,0),null]))
return z},
bY:function(a){var z,y
z=$.p
y=new P.C(0,z,null,this.$ti)
if(z!==C.h)z.toString
z=H.m(this,0)
this.cY(new P.e4(null,y,8,a,null,[z,z]))
return y},
cY:function(a){var z,y
z=this.a
if(z<=1){a.a=this.c
this.c=a}else{if(z===2){y=this.c
if(!y.ge0()){y.cY(a)
return}this.a=y.a
this.c=y.c}z=this.b
z.toString
P.bn(null,null,z,new P.pi(this,a))}},
fd:function(a){var z,y,x,w,v
z={}
z.a=a
if(a==null)return
y=this.a
if(y<=1){x=this.c
this.c=a
if(x!=null){for(w=a;w.ge4()!=null;)w=w.a
w.a=x}}else{if(y===2){v=this.c
if(!v.ge0()){v.fd(a)
return}this.a=v.a
this.c=v.c}z.a=this.d4(a)
y=this.b
y.toString
P.bn(null,null,y,new P.pp(z,this))}},
d3:function(){var z=this.c
this.c=null
return this.d4(z)},
d4:function(a){var z,y,x
for(z=a,y=null;z!=null;y=z,z=x){x=z.ge4()
z.a=y}return y},
b3:function(a){var z,y
z=this.$ti
if(H.aM(a,"$isN",z,"$asN"))if(H.aM(a,"$isC",z,null))P.cX(a,this)
else P.hb(a,this)
else{y=this.d3()
this.a=4
this.c=a
P.bj(this,y)}},
b4:[function(a,b){var z=this.d3()
this.a=8
this.c=new P.cp(a,b)
P.bj(this,z)},function(a){return this.b4(a,null)},"kJ","$2","$1","gbL",2,2,16,0],
bs:function(a){var z
if(H.aM(a,"$isN",this.$ti,"$asN")){this.hX(a)
return}this.a=1
z=this.b
z.toString
P.bn(null,null,z,new P.pk(this,a))},
hX:function(a){var z
if(H.aM(a,"$isC",this.$ti,null)){if(a.a===8){this.a=1
z=this.b
z.toString
P.bn(null,null,z,new P.po(this,a))}else P.cX(a,this)
return}P.hb(a,this)},
eV:function(a,b){var z
this.a=1
z=this.b
z.toString
P.bn(null,null,z,new P.pj(this,a,b))},
hQ:function(a,b){this.a=4
this.c=a},
$isN:1,
A:{
hb:function(a,b){var z,y,x
b.a=1
try{a.eD(new P.pl(b),new P.pm(b))}catch(x){z=H.z(x)
y=H.A(x)
P.cj(new P.pn(b,z,y))}},
cX:function(a,b){var z,y,x
for(;a.gii();)a=a.c
z=a.ge0()
y=b.c
if(z){b.c=null
x=b.d4(y)
b.a=a.a
b.c=a.c
P.bj(b,x)}else{b.a=2
b.c=a
a.fd(y)}},
bj:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z={}
z.a=a
for(y=a;!0;){x={}
w=y.a===8
if(b==null){if(w){v=y.c
y=y.b
u=v.gbi()
t=v.gbf()
y.toString
P.bm(null,null,y,u,t)}return}for(;b.ge4()!=null;b=s){s=b.a
b.a=null
P.bj(z.a,b)}r=z.a.c
x.a=w
x.b=r
y=!w
if(!y||b.gfK()||b.gfJ()){q=b.giK()
if(w){u=z.a.b
u.toString
u=u==null?q==null:u===q
if(!u)q.toString
else u=!0
u=!u}else u=!1
if(u){y=z.a
v=y.c
y=y.b
u=v.gbi()
t=v.gbf()
y.toString
P.bm(null,null,y,u,t)
return}p=$.p
if(p==null?q!=null:p!==q)$.p=q
else p=null
if(b.gfJ())new P.ps(z,x,w,b).$0()
else if(y){if(b.gfK())new P.pr(x,b,r).$0()}else if(b.gjA())new P.pq(z,x,b).$0()
if(p!=null)$.p=p
y=x.b
if(!!J.n(y).$isN){o=b.b
if(y.a>=4){n=o.c
o.c=null
b=o.d4(n)
o.a=y.a
o.c=y.c
z.a=y
continue}else P.cX(y,o)
return}}o=b.b
b=o.d3()
y=x.a
u=x.b
if(!y){o.a=4
o.c=u}else{o.a=8
o.c=u}z.a=o
y=o}}}},
pi:{"^":"a:1;a,b",
$0:function(){P.bj(this.a,this.b)}},
pp:{"^":"a:1;a,b",
$0:function(){P.bj(this.b,this.a.a)}},
pl:{"^":"a:0;a",
$1:function(a){var z=this.a
z.a=0
z.b3(a)}},
pm:{"^":"a:49;a",
$2:function(a,b){this.a.b4(a,b)},
$1:function(a){return this.$2(a,null)}},
pn:{"^":"a:1;a,b,c",
$0:function(){this.a.b4(this.b,this.c)}},
pk:{"^":"a:1;a,b",
$0:function(){var z,y
z=this.a
y=z.d3()
z.a=4
z.c=this.b
P.bj(z,y)}},
po:{"^":"a:1;a,b",
$0:function(){P.cX(this.b,this.a)}},
pj:{"^":"a:1;a,b,c",
$0:function(){this.a.b4(this.b,this.c)}},
ps:{"^":"a:6;a,b,c,d",
$0:function(){var z,y,x,w,v,u,t
z=null
try{z=this.d.jz()}catch(w){y=H.z(w)
x=H.A(w)
if(this.c){v=this.a.a.c.gbi()
u=y
u=v==null?u==null:v===u
v=u}else v=!1
u=this.b
if(v)u.b=this.a.a.c
else u.b=new P.cp(y,x)
u.a=!0
return}if(!!J.n(z).$isN){if(z instanceof P.C&&z.gct()>=4){if(z.gct()===8){v=this.b
v.b=z.giy()
v.a=!0}return}t=this.a.a
v=this.b
v.b=z.bW(new P.pt(t))
v.a=!1}}},
pt:{"^":"a:0;a",
$1:function(a){return this.a}},
pr:{"^":"a:6;a,b,c",
$0:function(){var z,y,x,w
try{this.a.b=this.b.jy(this.c)}catch(x){z=H.z(x)
y=H.A(x)
w=this.a
w.b=new P.cp(z,y)
w.a=!0}}},
pq:{"^":"a:6;a,b,c",
$0:function(){var z,y,x,w,v,u,t,s
try{z=this.a.a.c
w=this.c
if(w.jY(z)===!0&&w.e!=null){v=this.b
v.b=w.ju(z)
v.a=!1}}catch(u){y=H.z(u)
x=H.A(u)
w=this.a
v=w.a.c.gbi()
t=y
s=this.b
if(v==null?t==null:v===t)s.b=w.a.c
else s.b=new P.cp(y,x)
s.a=!0}}},
h7:{"^":"d;j3:a<,c9:b@"},
aa:{"^":"d;$ti",
aP:function(a,b){return new P.pH(b,this,[H.x(this,"aa",0),null])},
Z:function(a,b){var z,y
z={}
y=new P.C(0,$.p,null,[P.Y])
z.a=null
z.a=this.ax(new P.nA(z,this,b,y),!0,new P.nB(y),y.gbL())
return y},
L:function(a,b){var z,y
z={}
y=new P.C(0,$.p,null,[null])
z.a=null
z.a=this.ax(new P.nE(z,this,b,y),!0,new P.nF(y),y.gbL())
return y},
gl:function(a){var z,y
z={}
y=new P.C(0,$.p,null,[P.u])
z.a=0
this.ax(new P.nK(z),!0,new P.nL(z,y),y.gbL())
return y},
gK:function(a){var z,y
z={}
y=new P.C(0,$.p,null,[P.Y])
z.a=null
z.a=this.ax(new P.nG(z,y),!0,new P.nH(y),y.gbL())
return y},
cd:function(a){var z,y,x
z=H.x(this,"aa",0)
y=H.r([],[z])
x=new P.C(0,$.p,null,[[P.J,z]])
this.ax(new P.nM(this,y),!0,new P.nN(y,x),x.gbL())
return x},
by:function(a){var z,y,x
z=H.x(this,"aa",0)
y=P.W(null,null,null,z)
x=new P.C(0,$.p,null,[[P.bA,z]])
this.ax(new P.nO(this,y),!0,new P.nP(y,x),x.gbL())
return x},
gE:function(a){var z,y
z={}
y=new P.C(0,$.p,null,[H.x(this,"aa",0)])
z.a=null
z.b=!1
this.ax(new P.nI(z,this),!0,new P.nJ(z,y),y.gbL())
return y}},
nA:{"^":"a;a,b,c,d",
$1:function(a){var z,y
z=this.a
y=this.d
P.ht(new P.ny(this.c,a),new P.nz(z,y),P.hi(z.a,y))},
$S:function(){return H.b3(function(a){return{func:1,args:[a]}},this.b,"aa")}},
ny:{"^":"a:1;a,b",
$0:function(){return J.i(this.b,this.a)}},
nz:{"^":"a:51;a,b",
$1:function(a){if(a===!0)P.hj(this.a.a,this.b,!0)}},
nB:{"^":"a:1;a",
$0:function(){this.a.b3(!1)}},
nE:{"^":"a;a,b,c,d",
$1:function(a){P.ht(new P.nC(this.c,a),new P.nD(),P.hi(this.a.a,this.d))},
$S:function(){return H.b3(function(a){return{func:1,args:[a]}},this.b,"aa")}},
nC:{"^":"a:1;a,b",
$0:function(){return this.a.$1(this.b)}},
nD:{"^":"a:0;",
$1:function(a){}},
nF:{"^":"a:1;a",
$0:function(){this.a.b3(null)}},
nK:{"^":"a:0;a",
$1:function(a){++this.a.a}},
nL:{"^":"a:1;a,b",
$0:function(){this.b.b3(this.a.a)}},
nG:{"^":"a:0;a,b",
$1:function(a){P.hj(this.a.a,this.b,!1)}},
nH:{"^":"a:1;a",
$0:function(){this.a.b3(!0)}},
nM:{"^":"a;a,b",
$1:function(a){this.b.push(a)},
$S:function(){return H.b3(function(a){return{func:1,args:[a]}},this.a,"aa")}},
nN:{"^":"a:1;a,b",
$0:function(){this.b.b3(this.a)}},
nO:{"^":"a;a,b",
$1:function(a){this.b.q(0,a)},
$S:function(){return H.b3(function(a){return{func:1,args:[a]}},this.a,"aa")}},
nP:{"^":"a:1;a,b",
$0:function(){this.b.b3(this.a)}},
nI:{"^":"a;a,b",
$1:function(a){var z=this.a
z.b=!0
z.a=a},
$S:function(){return H.b3(function(a){return{func:1,args:[a]}},this.b,"aa")}},
nJ:{"^":"a:1;a,b",
$0:function(){var z,y,x,w
x=this.a
if(x.b){this.b.b3(x.a)
return}try{x=H.a9()
throw H.c(x)}catch(w){z=H.z(w)
y=H.A(w)
P.qc(this.b,z,y)}}},
cY:{"^":"d;ct:b<,$ti",
gdK:function(){return new P.cV(this,this.$ti)},
gjP:function(){return(this.b&4)!==0},
gcF:function(){var z=this.b
return(z&1)!==0?this.gbC().gf9():(z&2)===0},
gir:function(){if((this.b&8)===0)return this.a
return this.a.gcQ()},
dU:function(){var z,y
if((this.b&8)===0){z=this.a
if(z==null){z=new P.e6(null,null,0,this.$ti)
this.a=z}return z}y=this.a
if(y.gcQ()==null)y.c=new P.e6(null,null,0,this.$ti)
return y.c},
gbC:function(){if((this.b&8)!==0)return this.a.gcQ()
return this.a},
ci:function(){if((this.b&4)!==0)return new P.E("Cannot add event after closing")
return new P.E("Cannot add event while adding a stream")},
j1:function(a,b){var z,y,x,w
z=this.b
if(z>=4)throw H.c(this.ci())
if((z&2)!==0){z=new P.C(0,$.p,null,[null])
z.bs(null)
return z}z=this.a
y=new P.C(0,$.p,null,[null])
x=a.ax(this.ghV(),!1,this.ghW(),this.ghS())
w=this.b
if((w&1)!==0?this.gbC().gf9():(w&2)===0)x.cI()
this.a=new P.pO(z,y,x,this.$ti)
this.b|=8
return y},
f1:function(){var z=this.c
if(z==null){z=(this.b&2)!==0?$.$get$b9():new P.C(0,$.p,null,[null])
this.c=z}return z},
q:[function(a,b){if(this.b>=4)throw H.c(this.ci())
this.bK(b)},"$1","giP",2,0,function(){return H.b3(function(a){return{func:1,v:true,args:[a]}},this.$receiver,"cY")}],
ef:function(a,b){if(this.b>=4)throw H.c(this.ci())
if(a==null)a=new P.cH()
$.p.toString
this.c3(a,b)},
bh:function(){var z=this.b
if((z&4)!==0)return this.f1()
if(z>=4)throw H.c(this.ci())
z|=4
this.b=z
if((z&1)!==0)this.cr()
else if((z&3)===0)this.dU().q(0,C.v)
return this.f1()},
bK:[function(a){var z=this.b
if((z&1)!==0)this.cq(a)
else if((z&3)===0)this.dU().q(0,new P.e0(a,null,this.$ti))},"$1","ghV",2,0,function(){return H.b3(function(a){return{func:1,v:true,args:[a]}},this.$receiver,"cY")}],
c3:[function(a,b){var z=this.b
if((z&1)!==0)this.cs(a,b)
else if((z&3)===0)this.dU().q(0,new P.e1(a,b,null))},"$2","ghS",4,0,38],
dO:[function(){var z=this.a
this.a=z.gcQ()
this.b&=4294967287
z.a.bs(null)},"$0","ghW",0,0,6],
iF:function(a,b,c,d){var z,y,x,w,v
if((this.b&3)!==0)throw H.c(new P.E("Stream has already been listened to."))
z=$.p
y=d?1:0
x=new P.pc(this,null,null,null,z,y,null,null,this.$ti)
x.eS(a,b,c,d,H.m(this,0))
w=this.gir()
y=this.b|=1
if((y&8)!==0){v=this.a
v.scQ(x)
v.b.cL()}else this.a=x
x.iD(w)
x.dZ(new P.pQ(this))
return x},
iv:function(a){var z,y,x,w,v,u
z=null
if((this.b&8)!==0)z=this.a.c5()
this.a=null
this.b=this.b&4294967286|2
w=this.r
if(w!=null)if(z==null)try{z=w.$0()}catch(v){y=H.z(v)
x=H.A(v)
u=new P.C(0,$.p,null,[null])
u.eV(y,x)
z=u}else z=z.bY(w)
w=new P.pP(this)
if(z!=null)z=z.bY(w)
else w.$0()
return z}},
pQ:{"^":"a:1;a",
$0:function(){P.ed(this.a.d)}},
pP:{"^":"a:6;a",
$0:function(){var z=this.a.c
if(z!=null&&z.a===0)z.bs(null)}},
pY:{"^":"d;$ti",
cq:function(a){this.gbC().bK(a)},
cs:function(a,b){this.gbC().c3(a,b)},
cr:function(){this.gbC().dO()}},
p9:{"^":"d;$ti",
cq:function(a){this.gbC().c4(new P.e0(a,null,[H.m(this,0)]))},
cs:function(a,b){this.gbC().c4(new P.e1(a,b,null))},
cr:function(){this.gbC().c4(C.v)}},
p8:{"^":"cY+p9;a,b,c,d,e,f,r,$ti"},
pX:{"^":"cY+pY;a,b,c,d,e,f,r,$ti"},
cV:{"^":"pR;a,$ti",
gv:function(a){return(H.aw(this.a)^892482866)>>>0},
u:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof P.cV))return!1
return b.a===this.a}},
pc:{"^":"cb;x,a,b,c,d,e,f,r,$ti",
e5:function(){return this.x.iv(this)},
e7:[function(){var z=this.x
if((z.b&8)!==0)z.a.cI()
P.ed(z.e)},"$0","ge6",0,0,6],
e9:[function(){var z=this.x
if((z.b&8)!==0)z.a.cL()
P.ed(z.f)},"$0","ge8",0,0,6]},
oT:{"^":"d;$ti",
cI:function(){this.b.cI()},
cL:function(){this.b.cL()},
c5:function(){var z=this.b.c5()
if(z==null){this.a.bs(null)
return}return z.bY(new P.oU(this))},
ei:function(){this.a.bs(null)}},
oU:{"^":"a:1;a",
$0:function(){this.a.a.bs(null)}},
pO:{"^":"oT;cQ:c@,a,b,$ti"},
cb:{"^":"d;ct:e<,$ti",
iD:function(a){if(a==null)return
this.r=a
if(!a.gK(a)){this.e=(this.e|64)>>>0
this.r.cT(this)}},
k7:function(a){var z=this.e
if((z&8)!==0)return
this.e=(z+128|4)>>>0
if(z<128&&this.r!=null)this.r.fu()
if((z&4)===0&&(this.e&32)===0)this.dZ(this.ge6())},
cI:function(){return this.k7(null)},
cL:function(){var z=this.e
if((z&8)!==0)return
if(z>=128){z-=128
this.e=z
if(z<128){if((z&64)!==0){z=this.r
z=!z.gK(z)}else z=!1
if(z)this.r.cT(this)
else{z=(this.e&4294967291)>>>0
this.e=z
if((z&32)===0)this.dZ(this.ge8())}}}},
c5:function(){var z=(this.e&4294967279)>>>0
this.e=z
if((z&8)===0)this.dP()
z=this.f
return z==null?$.$get$b9():z},
gf9:function(){return(this.e&4)!==0},
gcF:function(){return this.e>=128},
dP:function(){var z=(this.e|8)>>>0
this.e=z
if((z&64)!==0)this.r.fu()
if((this.e&32)===0)this.r=null
this.f=this.e5()},
bK:["hE",function(a){var z=this.e
if((z&8)!==0)return
if(z<32)this.cq(a)
else this.c4(new P.e0(a,null,[H.x(this,"cb",0)]))}],
c3:["hF",function(a,b){var z=this.e
if((z&8)!==0)return
if(z<32)this.cs(a,b)
else this.c4(new P.e1(a,b,null))}],
dO:function(){var z=this.e
if((z&8)!==0)return
z=(z|2)>>>0
this.e=z
if(z<32)this.cr()
else this.c4(C.v)},
e7:[function(){},"$0","ge6",0,0,6],
e9:[function(){},"$0","ge8",0,0,6],
e5:function(){return},
c4:function(a){var z,y
z=this.r
if(z==null){z=new P.e6(null,null,0,[H.x(this,"cb",0)])
this.r=z}z.q(0,a)
y=this.e
if((y&64)===0){y=(y|64)>>>0
this.e=y
if(y<128)this.r.cT(this)}},
cq:function(a){var z=this.e
this.e=(z|32)>>>0
this.d.ha(this.a,a)
this.e=(this.e&4294967263)>>>0
this.dR((z&4)!==0)},
cs:function(a,b){var z,y
z=this.e
y=new P.pb(this,a,b)
if((z&1)!==0){this.e=(z|16)>>>0
this.dP()
z=this.f
if(!!J.n(z).$isN&&z!==$.$get$b9())z.bY(y)
else y.$0()}else{y.$0()
this.dR((z&4)!==0)}},
cr:function(){var z,y
z=new P.pa(this)
this.dP()
this.e=(this.e|16)>>>0
y=this.f
if(!!J.n(y).$isN&&y!==$.$get$b9())y.bY(z)
else z.$0()},
dZ:function(a){var z=this.e
this.e=(z|32)>>>0
a.$0()
this.e=(this.e&4294967263)>>>0
this.dR((z&4)!==0)},
dR:function(a){var z,y
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
if(y)this.e7()
else this.e9()
this.e=(this.e&4294967263)>>>0}z=this.e
if((z&64)!==0&&z<128)this.r.cT(this)},
eS:function(a,b,c,d,e){var z=this.d
z.toString
this.a=a
this.b=P.ec(b==null?P.qt():b,z)
this.c=c==null?P.qs():c}},
pb:{"^":"a:6;a,b,c",
$0:function(){var z,y,x,w,v,u
z=this.a
y=z.e
if((y&8)!==0&&(y&16)===0)return
z.e=(y|32)>>>0
y=z.b
x=H.at(y,{func:1,args:[P.d,P.aT]})
w=z.d
v=this.b
u=z.b
if(x)w.kr(u,v,this.c)
else w.ha(u,v)
z.e=(z.e&4294967263)>>>0}},
pa:{"^":"a:6;a",
$0:function(){var z,y
z=this.a
y=z.e
if((y&16)===0)return
z.e=(y|42)>>>0
z.d.h8(z.c)
z.e=(z.e&4294967263)>>>0}},
pR:{"^":"aa;$ti",
ax:function(a,b,c,d){return this.a.iF(a,d,c,!0===b)},
ex:function(a,b,c){return this.ax(a,null,b,c)}},
e2:{"^":"d;c9:a@,$ti"},
e0:{"^":"e2;ad:b<,a,$ti",
ey:function(a){a.cq(this.b)}},
e1:{"^":"e2;bi:b<,bf:c<,a",
ey:function(a){a.cs(this.b,this.c)},
$ase2:I.b5},
pd:{"^":"d;",
ey:function(a){a.cr()},
gc9:function(){return},
sc9:function(a){throw H.c(new P.E("No events after a done."))}},
pJ:{"^":"d;ct:a<,$ti",
cT:function(a){var z=this.a
if(z===1)return
if(z>=1){this.a=1
return}P.cj(new P.pK(this,a))
this.a=1},
fu:function(){if(this.a===1)this.a=3}},
pK:{"^":"a:1;a,b",
$0:function(){var z,y,x,w
z=this.a
y=z.a
z.a=0
if(y===3)return
x=z.b
w=x.gc9()
z.b=w
if(w==null)z.c=null
x.ey(this.b)}},
e6:{"^":"pJ;b,c,a,$ti",
gK:function(a){return this.c==null},
q:function(a,b){var z=this.c
if(z==null){this.c=b
this.b=b}else{z.sc9(b)
this.c=b}}},
pS:{"^":"d;a,b,c,$ti"},
q7:{"^":"a:1;a,b,c",
$0:function(){return this.a.b4(this.b,this.c)}},
q6:{"^":"a:15;a,b",
$2:function(a,b){P.q5(this.a,this.b,a,b)}},
q8:{"^":"a:1;a,b",
$0:function(){return this.a.b3(this.b)}},
e3:{"^":"aa;$ti",
ax:function(a,b,c,d){return this.i3(a,d,c,!0===b)},
ex:function(a,b,c){return this.ax(a,null,b,c)},
i3:function(a,b,c,d){return P.ph(this,a,b,c,d,H.x(this,"e3",0),H.x(this,"e3",1))},
f6:function(a,b){b.bK(a)},
ig:function(a,b,c){c.c3(a,b)},
$asaa:function(a,b){return[b]}},
ha:{"^":"cb;x,y,a,b,c,d,e,f,r,$ti",
bK:function(a){if((this.e&2)!==0)return
this.hE(a)},
c3:function(a,b){if((this.e&2)!==0)return
this.hF(a,b)},
e7:[function(){var z=this.y
if(z==null)return
z.cI()},"$0","ge6",0,0,6],
e9:[function(){var z=this.y
if(z==null)return
z.cL()},"$0","ge8",0,0,6],
e5:function(){var z=this.y
if(z!=null){this.y=null
return z.c5()}return},
kL:[function(a){this.x.f6(a,this)},"$1","gib",2,0,function(){return H.b3(function(a,b){return{func:1,v:true,args:[a]}},this.$receiver,"ha")}],
kN:[function(a,b){this.x.ig(a,b,this)},"$2","gie",4,0,39],
kM:[function(){this.dO()},"$0","gic",0,0,6],
hP:function(a,b,c,d,e,f,g){this.y=this.x.a.ex(this.gib(),this.gic(),this.gie())},
$ascb:function(a,b){return[b]},
A:{
ph:function(a,b,c,d,e,f,g){var z,y
z=$.p
y=e?1:0
y=new P.ha(a,null,null,null,null,z,y,null,null,[f,g])
y.eS(b,c,d,e,g)
y.hP(a,b,c,d,e,f,g)
return y}}},
pH:{"^":"e3;b,a,$ti",
f6:function(a,b){var z,y,x,w
z=null
try{z=this.b.$1(a)}catch(w){y=H.z(w)
x=H.A(w)
P.q0(b,y,x)
return}b.bK(z)}},
cp:{"^":"d;bi:a<,bf:b<",
k:function(a){return H.b(this.a)},
$isZ:1},
q_:{"^":"d;"},
qj:{"^":"a:1;a,b",
$0:function(){var z,y,x
z=this.a
y=z.a
if(y==null){x=new P.cH()
z.a=x
z=x}else z=y
y=this.b
if(y==null)throw H.c(z)
x=H.c(z)
x.stack=J.h(y)
throw x}},
pL:{"^":"q_;",
h8:function(a){var z,y,x,w
try{if(C.h===$.p){x=a.$0()
return x}x=P.hq(null,null,this,a)
return x}catch(w){z=H.z(w)
y=H.A(w)
x=P.bm(null,null,this,z,y)
return x}},
ha:function(a,b){var z,y,x,w
try{if(C.h===$.p){x=a.$1(b)
return x}x=P.hs(null,null,this,a,b)
return x}catch(w){z=H.z(w)
y=H.A(w)
x=P.bm(null,null,this,z,y)
return x}},
kr:function(a,b,c){var z,y,x,w
try{if(C.h===$.p){x=a.$2(b,c)
return x}x=P.hr(null,null,this,a,b,c)
return x}catch(w){z=H.z(w)
y=H.A(w)
x=P.bm(null,null,this,z,y)
return x}},
eh:function(a,b){if(b)return new P.pM(this,a)
else return new P.pN(this,a)},
i:function(a,b){return},
h7:function(a){if($.p===C.h)return a.$0()
return P.hq(null,null,this,a)},
eC:function(a,b){if($.p===C.h)return a.$1(b)
return P.hs(null,null,this,a,b)},
kq:function(a,b,c){if($.p===C.h)return a.$2(b,c)
return P.hr(null,null,this,a,b,c)}},
pM:{"^":"a:1;a,b",
$0:function(){return this.a.h8(this.b)}},
pN:{"^":"a:1;a,b",
$0:function(){return this.a.h7(this.b)}}}],["","",,P,{"^":"",
du:function(a,b){return new H.O(0,null,null,null,null,null,0,[a,b])},
aR:function(){return new H.O(0,null,null,null,null,null,0,[null,null])},
ah:function(a){return H.rB(a,new H.O(0,null,null,null,null,null,0,[null,null]))},
kT:function(a,b,c){var z,y
if(P.ea(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}z=[]
y=$.$get$bM()
y.push(a)
try{P.qf(a,z)}finally{if(0>=y.length)return H.e(y,-1)
y.pop()}y=P.fI(b,z,", ")+c
return y.charCodeAt(0)==0?y:y},
bY:function(a,b,c){var z,y,x
if(P.ea(a))return b+"..."+c
z=new P.bF(b)
y=$.$get$bM()
y.push(a)
try{x=z
x.w=P.fI(x.gw(),a,", ")}finally{if(0>=y.length)return H.e(y,-1)
y.pop()}y=z
y.w=y.gw()+c
y=z.gw()
return y.charCodeAt(0)==0?y:y},
ea:function(a){var z,y
for(z=0;y=$.$get$bM(),z<y.length;++z)if(a===y[z])return!0
return!1},
qf:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=a.gY(a)
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
lb:function(a,b,c,d,e){return new H.O(0,null,null,null,null,null,0,[d,e])},
c1:function(a,b,c){var z=P.lb(null,null,null,b,c)
a.L(0,new P.qv(z))
return z},
W:function(a,b,c,d){return new P.hd(0,null,null,null,null,null,0,[d])},
b_:function(a,b){var z,y
z=P.W(null,null,null,b)
for(y=J.af(a);y.t();)z.q(0,y.gF())
return z},
dz:function(a){var z,y,x
z={}
if(P.ea(a))return"{...}"
y=new P.bF("")
try{$.$get$bM().push(a)
x=y
x.w=x.gw()+"{"
z.a=!0
a.L(0,new P.lm(z,y))
z=y
z.w=z.gw()+"}"}finally{z=$.$get$bM()
if(0>=z.length)return H.e(z,-1)
z.pop()}z=y.gw()
return z.charCodeAt(0)==0?z:z},
he:{"^":"O;a,b,c,d,e,f,r,$ti",
cD:function(a){return H.rV(a)&0x3ffffff},
cE:function(a,b){var z,y,x
if(a==null)return-1
z=a.length
for(y=0;y<z;++y){x=a[y].gfL()
if(x==null?b==null:x===b)return y}return-1},
A:{
bJ:function(a,b){return new P.he(0,null,null,null,null,null,0,[a,b])}}},
hd:{"^":"pu;a,b,c,d,e,f,r,$ti",
e3:function(){return new P.hd(0,null,null,null,null,null,0,this.$ti)},
gY:function(a){var z=new P.ac(this,this.r,null,null,[null])
z.c=this.e
return z},
gl:function(a){return this.a},
gK:function(a){return this.a===0},
gak:function(a){return this.a!==0},
Z:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null)return!1
return z[b]!=null}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null)return!1
return y[b]!=null}else return this.i1(b)},
i1:function(a){var z=this.d
if(z==null)return!1
return this.d0(z[this.d_(a)],a)>=0},
c8:function(a){var z
if(!(typeof a==="string"&&a!=="__proto__"))z=typeof a==="number"&&(a&0x3ffffff)===a
else z=!0
if(z)return this.Z(0,a)?a:null
else return this.ik(a)},
ik:function(a){var z,y,x
z=this.d
if(z==null)return
y=z[this.d_(a)]
x=this.d0(y,a)
if(x<0)return
return J.au(y,x).gf0()},
L:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$1(z.a)
if(y!==this.r)throw H.c(new P.B(this))
z=z.b}},
gE:function(a){var z=this.f
if(z==null)throw H.c(new P.E("No elements"))
return z.a},
q:function(a,b){var z,y,x
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.b=y
z=y}return this.eW(z,b)}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.c=y
x=y}return this.eW(x,b)}else return this.av(b)},
av:function(a){var z,y,x
z=this.d
if(z==null){z=P.pD()
this.d=z}y=this.d_(a)
x=z[y]
if(x==null)z[y]=[this.dS(a)]
else{if(this.d0(x,a)>=0)return!1
x.push(this.dS(a))}return!0},
a7:function(a,b){if(typeof b==="string"&&b!=="__proto__")return this.eX(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.eX(this.c,b)
else return this.iw(b)},
iw:function(a){var z,y,x
z=this.d
if(z==null)return!1
y=z[this.d_(a)]
x=this.d0(y,a)
if(x<0)return!1
this.eY(y.splice(x,1)[0])
return!0},
i8:function(a,b){var z,y,x,w,v
z=this.e
for(;z!=null;z=x){y=z.a
x=z.b
w=this.r
v=a.$1(y)
if(w!==this.r)throw H.c(new P.B(this))
if(b===v)this.a7(0,y)}},
b_:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
eW:function(a,b){if(a[b]!=null)return!1
a[b]=this.dS(b)
return!0},
eX:function(a,b){var z
if(a==null)return!1
z=a[b]
if(z==null)return!1
this.eY(z)
delete a[b]
return!0},
dS:function(a){var z,y
z=new P.pC(a,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.c=y
y.b=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
eY:function(a){var z,y
z=a.gi0()
y=a.b
if(z==null)this.e=y
else z.b=y
if(y==null)this.f=z
else y.c=z;--this.a
this.r=this.r+1&67108863},
d_:function(a){return J.j(a)&0x3ffffff},
d0:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.i(a[y].gf0(),b))return y
return-1},
$isbA:1,
$isV:1,
A:{
pD:function(){var z=Object.create(null)
z["<non-identifier-key>"]=z
delete z["<non-identifier-key>"]
return z}}},
pC:{"^":"d;f0:a<,b,i0:c<"},
ac:{"^":"d;a,b,c,d,$ti",
gF:function(){return this.d},
t:function(){var z=this.a
if(this.b!==z.r)throw H.c(new P.B(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.b
return!0}}}},
pu:{"^":"mY;$ti",
by:function(a){var z=this.e3()
z.ar(0,this)
return z}},
cD:{"^":"y;$ti"},
qv:{"^":"a:7;a",
$2:function(a,b){this.a.n(0,a,b)}},
f4:{"^":"fa;$ti"},
fa:{"^":"d+b0;$ti",$asJ:null,$asV:null,$isJ:1,$isV:1},
b0:{"^":"d;$ti",
gY:function(a){return new H.dv(this,this.gl(this),0,null,[H.x(this,"b0",0)])},
an:function(a,b){return this.i(0,b)},
L:function(a,b){var z,y
z=this.gl(this)
for(y=0;y<z;++y){b.$1(this.i(0,y))
if(z!==this.gl(this))throw H.c(new P.B(this))}},
gK:function(a){return this.gl(this)===0},
gak:function(a){return!this.gK(this)},
gE:function(a){if(this.gl(this)===0)throw H.c(H.a9())
return this.i(0,this.gl(this)-1)},
Z:function(a,b){var z,y
z=this.gl(this)
for(y=0;y<this.gl(this);++y){if(J.i(this.i(0,y),b))return!0
if(z!==this.gl(this))throw H.c(new P.B(this))}return!1},
bP:function(a,b){var z,y
z=this.gl(this)
for(y=0;y<z;++y){if(b.$1(this.i(0,y))===!0)return!0
if(z!==this.gl(this))throw H.c(new P.B(this))}return!1},
b7:function(a,b,c){var z,y,x
z=this.gl(this)
for(y=0;y<z;++y){x=this.i(0,y)
if(b.$1(x)===!0)return x
if(z!==this.gl(this))throw H.c(new P.B(this))}return c.$0()},
aP:function(a,b){return new H.an(this,b,[H.x(this,"b0",0),null])},
dH:function(a,b){return H.fK(this,b,null,H.x(this,"b0",0))},
by:function(a){var z,y
z=P.W(null,null,null,H.x(this,"b0",0))
for(y=0;y<this.gl(this);++y)z.q(0,this.i(0,y))
return z},
q:function(a,b){var z=this.gl(this)
this.sl(0,z+1)
this.n(0,z,b)},
a7:function(a,b){var z
for(z=0;z<this.gl(this);++z)if(J.i(this.i(0,z),b)){this.aR(0,z,this.gl(this)-1,this,z+1)
this.sl(0,this.gl(this)-1)
return!0}return!1},
i7:function(a,b){var z,y,x,w
z=H.r([],[H.x(this,"b0",0)])
y=this.gl(this)
for(x=0;x<y;++x){w=this.i(0,x)
if(J.i(a.$1(w),b))z.push(w)
if(y!==this.gl(this))throw H.c(new P.B(this))}if(z.length!==this.gl(this)){this.hw(0,0,z.length,z)
this.sl(0,z.length)}},
aR:function(a,b,c,d,e){var z,y,x,w,v
P.c4(b,c,this.gl(this),null,null,null)
z=c-b
if(z===0)return
if(H.aM(d,"$isJ",[H.x(this,"b0",0)],"$asJ")){y=e
x=d}else{x=J.io(d,e).bx(0,!1)
y=0}w=J.K(x)
if(y+z>w.gl(x))throw H.c(H.eX())
if(y<b)for(v=z-1;v>=0;--v)this.n(0,b+v,w.i(x,y+v))
else for(v=0;v<z;++v)this.n(0,b+v,w.i(x,y+v))},
hw:function(a,b,c,d){return this.aR(a,b,c,d,0)},
bG:function(a,b,c){var z
if(c>=this.gl(this))return-1
for(z=c;z<this.gl(this);++z)if(J.i(this.i(0,z),b))return z
return-1},
b8:function(a,b){return this.bG(a,b,0)},
k:function(a){return P.bY(this,"[","]")},
$isJ:1,
$isV:1},
pZ:{"^":"d;$ti",
n:function(a,b,c){throw H.c(new P.P("Cannot modify unmodifiable map"))},
$isD:1},
lk:{"^":"d;$ti",
i:function(a,b){return this.a.i(0,b)},
n:function(a,b,c){this.a.n(0,b,c)},
a1:function(a){return this.a.a1(a)},
L:function(a,b){this.a.L(0,b)},
gK:function(a){var z=this.a
return z.gK(z)},
gak:function(a){var z=this.a
return z.gak(z)},
gl:function(a){var z=this.a
return z.gl(z)},
k:function(a){return this.a.k(0)},
$isD:1},
h5:{"^":"lk+pZ;a,$ti",$asD:null,$isD:1},
lm:{"^":"a:7;a,b",
$2:function(a,b){var z,y
z=this.a
if(!z.a)this.b.w+=", "
z.a=!1
z=this.b
y=z.w+=H.b(a)
z.w=y+": "
z.w+=H.b(b)}},
lc:{"^":"aS;a,b,c,d,$ti",
gY:function(a){return new P.hf(this,this.c,this.d,this.b,null,this.$ti)},
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
if(z===y)throw H.c(H.a9())
z=this.a
x=z.length
y=(y-1&x-1)>>>0
if(y<0||y>=x)return H.e(z,y)
return z[y]},
an:function(a,b){var z,y,x,w
z=(this.c-this.b&this.a.length-1)>>>0
if(0>b||b>=z)H.f(P.cB(b,this,"index",null,z))
y=this.a
x=y.length
w=(this.b+b&x-1)>>>0
if(w<0||w>=x)return H.e(y,w)
return y[w]},
q:function(a,b){this.av(b)},
ar:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=this.$ti
if(H.aM(b,"$isJ",z,"$asJ")){y=b.gl(b)
x=this.gl(this)
w=x+y
v=this.a
u=v.length
if(w>=u){t=P.ld(w+(w>>>1))
if(typeof t!=="number")return H.v(t)
v=new Array(t)
v.fixed$length=Array
s=H.r(v,z)
this.c=this.iJ(s)
this.a=s
this.b=0
C.a.aR(s,x,w,b,0)
this.c+=y}else{z=this.c
r=u-z
if(y<r){C.a.aR(v,z,z+y,b,0)
this.c+=y}else{q=y-r
C.a.aR(v,z,z+r,b,0)
C.a.aR(this.a,0,q,b,r)
this.c=q}}++this.d}else for(z=new P.hf(b,b.c,b.d,b.b,null,[H.m(b,0)]);z.t();)this.av(z.e)},
b_:function(a){var z,y,x,w,v
z=this.b
y=this.c
if(z!==y){for(x=this.a,w=x.length,v=w-1;z!==y;z=(z+1&v)>>>0){if(z<0||z>=w)return H.e(x,z)
x[z]=null}this.c=0
this.b=0;++this.d}},
k:function(a){return P.bY(this,"{","}")},
fs:function(a){var z,y,x
z=this.b
y=this.a
x=y.length
z=(z-1&x-1)>>>0
this.b=z
if(z<0||z>=x)return H.e(y,z)
y[z]=a
if(z===this.c)this.f5();++this.d},
dn:function(){var z,y,x,w
z=this.b
if(z===this.c)throw H.c(H.a9());++this.d
y=this.a
x=y.length
if(z>=x)return H.e(y,z)
w=y[z]
y[z]=null
this.b=(z+1&x-1)>>>0
return w},
av:function(a){var z,y,x
z=this.a
y=this.c
x=z.length
if(y<0||y>=x)return H.e(z,y)
z[y]=a
x=(y+1&x-1)>>>0
this.c=x
if(this.b===x)this.f5();++this.d},
f5:function(){var z,y,x,w
z=new Array(this.a.length*2)
z.fixed$length=Array
y=H.r(z,this.$ti)
z=this.a
x=this.b
w=z.length-x
C.a.aR(y,0,w,z,x)
C.a.aR(y,w,w+this.b,this.a,0)
this.b=0
this.c=this.a.length
this.a=y},
iJ:function(a){var z,y,x,w,v
z=this.b
y=this.c
x=this.a
if(z<=y){w=y-z
C.a.aR(a,0,w,x,z)
return w}else{v=x.length-z
C.a.aR(a,0,v,x,z)
C.a.aR(a,v,v+this.c,this.a,0)
return this.c+v}},
hH:function(a,b){var z=new Array(8)
z.fixed$length=Array
this.a=H.r(z,[b])},
A:{
b1:function(a,b){var z=new P.lc(null,0,0,0,[b])
z.hH(a,b)
return z},
ld:function(a){var z
a=C.u.eK(a,1)-1
for(;!0;a=z)z=(a&a-1)>>>0}}},
hf:{"^":"d;a,b,c,d,e,$ti",
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
mZ:{"^":"d;$ti",
gK:function(a){return this.a===0},
gak:function(a){return this.a!==0},
ar:function(a,b){var z
for(z=J.af(b);z.t();)this.q(0,z.gF())},
j9:function(a){var z,y
for(z=a.a,y=new P.ac(z,z.r,null,null,[null]),y.c=z.e;y.t();)if(!this.Z(0,y.d))return!1
return!0},
bx:function(a,b){var z,y,x,w,v
z=H.r([],this.$ti)
C.a.sl(z,this.a)
for(y=new P.ac(this,this.r,null,null,[null]),y.c=this.e,x=0;y.t();x=v){w=y.d
v=x+1
if(x>=z.length)return H.e(z,x)
z[x]=w}return z},
cd:function(a){return this.bx(a,!0)},
aP:function(a,b){return new H.bt(this,b,[H.m(this,0),null])},
k:function(a){return P.bY(this,"{","}")},
L:function(a,b){var z
for(z=new P.ac(this,this.r,null,null,[null]),z.c=this.e;z.t();)b.$1(z.d)},
bj:function(a,b,c){var z,y
for(z=new P.ac(this,this.r,null,null,[null]),z.c=this.e,y=b;z.t();)y=c.$2(y,z.d)
return y},
gE:function(a){var z,y
z=new P.ac(this,this.r,null,null,[null])
z.c=this.e
if(!z.t())throw H.c(H.a9())
do y=z.d
while(z.t())
return y},
b7:function(a,b,c){var z,y
for(z=new P.ac(this,this.r,null,null,[null]),z.c=this.e;z.t();){y=z.d
if(b.$1(y)===!0)return y}if(c!=null)return c.$0()
throw H.c(H.a9())},
de:function(a,b){return this.b7(a,b,null)},
aK:function(a,b){var z,y,x,w
for(z=new P.ac(this,this.r,null,null,[null]),z.c=this.e,y=null,x=!1;z.t();){w=z.d
if(b.$1(w)===!0){if(x)throw H.c(H.dn())
y=w
x=!0}}if(x)return y
throw H.c(H.a9())},
$isbA:1,
$isV:1},
mY:{"^":"mZ;$ti"}}],["","",,P,{"^":"",
d_:function(a){var z
if(a==null)return
if(typeof a!="object")return a
if(Object.getPrototypeOf(a)!==Array.prototype)return new P.px(a,Object.create(null),null)
for(z=0;z<a.length;++z)a[z]=P.d_(a[z])
return a},
qi:function(a,b){var z,y,x,w
if(typeof a!=="string")throw H.c(H.Q(a))
z=null
try{z=JSON.parse(a)}catch(x){y=H.z(x)
w=String(y)
throw H.c(new P.eU(w,null,null))}w=P.d_(z)
return w},
uB:[function(a){return a.ds()},"$1","rr",2,0,0],
px:{"^":"d;a,b,c",
i:function(a,b){var z,y
z=this.b
if(z==null)return this.c.i(0,b)
else if(typeof b!=="string")return
else{y=z[b]
return typeof y=="undefined"?this.iu(b):y}},
gl:function(a){var z
if(this.b==null){z=this.c
z=z.gl(z)}else z=this.ck().length
return z},
gK:function(a){var z
if(this.b==null){z=this.c
z=z.gl(z)}else z=this.ck().length
return z===0},
gak:function(a){var z
if(this.b==null){z=this.c
z=z.gl(z)}else z=this.ck().length
return z>0},
n:function(a,b,c){var z,y
if(this.b==null)this.c.n(0,b,c)
else if(this.a1(b)){z=this.b
z[b]=c
y=this.a
if(y==null?z!=null:y!==z)y[b]=null}else this.iH().n(0,b,c)},
a1:function(a){if(this.b==null)return this.c.a1(a)
if(typeof a!=="string")return!1
return Object.prototype.hasOwnProperty.call(this.a,a)},
L:function(a,b){var z,y,x,w
if(this.b==null)return this.c.L(0,b)
z=this.ck()
for(y=0;y<z.length;++y){x=z[y]
w=this.b[x]
if(typeof w=="undefined"){w=P.d_(this.a[x])
this.b[x]=w}b.$2(x,w)
if(z!==this.c)throw H.c(new P.B(this))}},
k:function(a){return P.dz(this)},
ck:function(){var z=this.c
if(z==null){z=Object.keys(this.a)
this.c=z}return z},
iH:function(){var z,y,x,w,v
if(this.b==null)return this.c
z=P.du(P.q,null)
y=this.ck()
for(x=0;w=y.length,x<w;++x){v=y[x]
z.n(0,v,this.i(0,v))}if(w===0)y.push(null)
else C.a.sl(y,0)
this.b=null
this.a=null
this.c=z
return z},
iu:function(a){var z
if(!Object.prototype.hasOwnProperty.call(this.a,a))return
z=P.d_(this.a[a])
return this.b[a]=z},
$isD:1,
$asD:function(){return[P.q,null]}},
eJ:{"^":"d;$ti"},
cv:{"^":"d;$ti"},
dt:{"^":"Z;a,b",
k:function(a){if(this.b!=null)return"Converting object to an encodable object failed."
else return"Converting object did not return an encodable object."}},
kZ:{"^":"dt;a,b",
k:function(a){return"Cyclic error in JSON stringify"}},
kY:{"^":"eJ;a,b",
jd:function(a,b){var z=P.qi(a,this.gje().a)
return z},
jc:function(a){return this.jd(a,null)},
jm:function(a,b){var z=this.gjn()
z=P.pz(a,z.b,z.a)
return z},
fD:function(a){return this.jm(a,null)},
gjn:function(){return C.N},
gje:function(){return C.M},
$aseJ:function(){return[P.d,P.q]}},
l0:{"^":"cv;a,b",
$ascv:function(){return[P.d,P.q]}},
l_:{"^":"cv;a",
$ascv:function(){return[P.q,P.d]}},
pA:{"^":"d;",
hj:function(a){var z,y,x,w,v,u,t
z=J.K(a)
y=z.gl(a)
if(typeof y!=="number")return H.v(y)
x=this.c
w=0
v=0
for(;v<y;++v){u=z.cA(a,v)
if(u>92)continue
if(u<32){if(v>w)x.w+=C.b.az(a,w,v)
w=v+1
x.w+=H.ai(92)
switch(u){case 8:x.w+=H.ai(98)
break
case 9:x.w+=H.ai(116)
break
case 10:x.w+=H.ai(110)
break
case 12:x.w+=H.ai(102)
break
case 13:x.w+=H.ai(114)
break
default:x.w+=H.ai(117)
x.w+=H.ai(48)
x.w+=H.ai(48)
t=u>>>4&15
x.w+=H.ai(t<10?48+t:87+t)
t=u&15
x.w+=H.ai(t<10?48+t:87+t)
break}}else if(u===34||u===92){if(v>w)x.w+=C.b.az(a,w,v)
w=v+1
x.w+=H.ai(92)
x.w+=H.ai(u)}}if(w===0)x.w+=H.b(a)
else if(w<y)x.w+=z.az(a,w,y)},
dQ:function(a){var z,y,x,w
for(z=this.a,y=z.length,x=0;x<y;++x){w=z[x]
if(a==null?w==null:a===w)throw H.c(new P.kZ(a,null))}z.push(a)},
dw:function(a){var z,y,x,w
if(this.hi(a))return
this.dQ(a)
try{z=this.b.$1(a)
if(!this.hi(z))throw H.c(new P.dt(a,null))
x=this.a
if(0>=x.length)return H.e(x,-1)
x.pop()}catch(w){y=H.z(w)
throw H.c(new P.dt(a,y))}},
hi:function(a){var z,y
if(typeof a==="number"){if(!isFinite(a))return!1
this.c.w+=C.k.k(a)
return!0}else if(a===!0){this.c.w+="true"
return!0}else if(a===!1){this.c.w+="false"
return!0}else if(a==null){this.c.w+="null"
return!0}else if(typeof a==="string"){z=this.c
z.w+='"'
this.hj(a)
z.w+='"'
return!0}else{z=J.n(a)
if(!!z.$isJ){this.dQ(a)
this.kE(a)
z=this.a
if(0>=z.length)return H.e(z,-1)
z.pop()
return!0}else if(!!z.$isD){this.dQ(a)
y=this.kF(a)
z=this.a
if(0>=z.length)return H.e(z,-1)
z.pop()
return y}else return!1}},
kE:function(a){var z,y,x
z=this.c
z.w+="["
y=J.K(a)
if(y.gl(a)>0){this.dw(y.i(a,0))
for(x=1;x<y.gl(a);++x){z.w+=","
this.dw(y.i(a,x))}}z.w+="]"},
kF:function(a){var z,y,x,w,v,u,t
z={}
if(a.gK(a)){this.c.w+="{}"
return!0}y=a.gl(a)*2
x=new Array(y)
z.a=0
z.b=!0
a.L(0,new P.pB(z,x))
if(!z.b)return!1
w=this.c
w.w+="{"
for(v='"',u=0;u<y;u+=2,v=',"'){w.w+=v
this.hj(x[u])
w.w+='":'
t=u+1
if(t>=y)return H.e(x,t)
this.dw(x[t])}w.w+="}"
return!0}},
pB:{"^":"a:7;a,b",
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
py:{"^":"pA;c,a,b",A:{
pz:function(a,b,c){var z,y,x
z=new P.bF("")
y=new P.py(z,[],P.rr())
y.dw(a)
x=z.w
return x.charCodeAt(0)==0?x:x}}}}],["","",,P,{"^":"",
u7:[function(a,b){return J.bS(a,b)},"$2","rs",4,0,40],
eP:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.h(a)
if(typeof a==="string")return JSON.stringify(a)
return P.kd(a)},
kd:function(a){var z=J.n(a)
if(!!z.$isa)return z.k(a)
return H.cJ(a)},
cy:function(a){return new P.pg(a)},
T:function(a,b,c){var z,y
z=H.r([],[c])
for(y=J.af(a);y.t();)z.push(y.gF())
if(b)return z
z.fixed$length=Array
return z},
le:function(a,b,c,d){var z,y,x
z=H.r(new Array(a),[d])
for(y=0;y<a;++y){x=b.$1(y)
if(y>=z.length)return H.e(z,y)
z[y]=x}return z},
bv:function(a,b){var z=P.T(a,!1,b)
z.fixed$length=Array
z.immutable$list=Array
return z},
em:function(a){H.t_(H.b(a))},
be:function(a,b,c){return new H.dq(a,H.dr(a,!1,b,!1),null,null)},
Y:{"^":"d;"},
"+bool":0,
S:{"^":"d;$ti"},
cw:{"^":"d;iI:a<,b",
u:function(a,b){if(b==null)return!1
if(!(b instanceof P.cw))return!1
return this.a===b.a&&!0},
bu:function(a,b){return C.d.bu(this.a,b.giI())},
gv:function(a){var z=this.a
return(z^C.d.d6(z,30))&1073741823},
k:function(a){var z,y,x,w,v,u,t,s
z=P.jA(H.m5(this))
y=P.bV(H.m3(this))
x=P.bV(H.m_(this))
w=P.bV(H.m0(this))
v=P.bV(H.m2(this))
u=P.bV(H.m4(this))
t=P.jB(H.m1(this))
s=z+"-"+y+"-"+x+" "+w+":"+v+":"+u+"."+t
return s},
q:function(a,b){var z,y
z=this.a+b.gjE()
y=new P.cw(z,!1)
if(!(Math.abs(z)>864e13))z=!1
else z=!0
if(z)H.f(P.G(y.gjZ()))
return y},
gjZ:function(){return this.a},
$isS:1,
$asS:function(){return[P.cw]},
A:{
jA:function(a){var z,y
z=Math.abs(a)
y=a<0?"-":""
if(z>=1000)return""+a
if(z>=100)return y+"0"+H.b(z)
if(z>=10)return y+"00"+H.b(z)
return y+"000"+H.b(z)},
jB:function(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},
bV:function(a){if(a>=10)return""+a
return"0"+a}}},
aN:{"^":"M;",$isS:1,
$asS:function(){return[P.M]}},
"+double":0,
aZ:{"^":"d;bM:a<",
a4:function(a,b){return new P.aZ(this.a+b.gbM())},
aL:function(a,b){return new P.aZ(this.a-b.gbM())},
c0:function(a,b){if(typeof b!=="number")return H.v(b)
return new P.aZ(C.k.h6(this.a*b))},
aJ:function(a,b){return C.d.aJ(this.a,b.gbM())},
br:function(a,b){return this.a>b.gbM()},
c_:function(a,b){return C.d.c_(this.a,b.gbM())},
bI:function(a,b){return C.d.bI(this.a,b.gbM())},
gjE:function(){return C.d.bD(this.a,1000)},
u:function(a,b){if(b==null)return!1
if(!(b instanceof P.aZ))return!1
return this.a===b.a},
gv:function(a){return this.a&0x1FFFFFFF},
bu:function(a,b){return C.d.bu(this.a,b.gbM())},
k:function(a){var z,y,x,w,v
z=new P.jW()
y=this.a
if(y<0)return"-"+new P.aZ(0-y).k(0)
x=z.$1(C.d.bD(y,6e7)%60)
w=z.$1(C.d.bD(y,1e6)%60)
v=new P.jV().$1(y%1e6)
return""+C.d.bD(y,36e8)+":"+H.b(x)+":"+H.b(w)+"."+H.b(v)},
eJ:function(a){return new P.aZ(0-this.a)},
$isS:1,
$asS:function(){return[P.aZ]}},
jV:{"^":"a:11;",
$1:function(a){if(a>=1e5)return""+a
if(a>=1e4)return"0"+a
if(a>=1000)return"00"+a
if(a>=100)return"000"+a
if(a>=10)return"0000"+a
return"00000"+a}},
jW:{"^":"a:11;",
$1:function(a){if(a>=10)return""+a
return"0"+a}},
Z:{"^":"d;",
gbf:function(){return H.A(this.$thrownJsError)}},
cH:{"^":"Z;",
k:function(a){return"Throw of null."}},
aY:{"^":"Z;a,b,h:c<,d",
gdW:function(){return"Invalid argument"+(!this.a?"(s)":"")},
gdV:function(){return""},
k:function(a){var z,y,x,w,v,u
z=this.c
y=z!=null?" ("+z+")":""
z=this.d
x=z==null?"":": "+H.b(z)
w=this.gdW()+y+x
if(!this.a)return w
v=this.gdV()
u=P.eP(this.b)
return w+v+": "+H.b(u)},
A:{
G:function(a){return new P.aY(!1,null,null,a)},
co:function(a,b,c){return new P.aY(!0,a,b,c)},
l:function(a){return new P.aY(!1,null,a,"Must not be null")}}},
dN:{"^":"aY;e,f,a,b,c,d",
gdW:function(){return"RangeError"},
gdV:function(){var z,y,x
z=this.e
if(z==null){z=this.f
y=z!=null?": Not less than or equal to "+H.b(z):""}else{x=this.f
if(x==null)y=": Not greater than or equal to "+H.b(z)
else if(x>z)y=": Not in range "+H.b(z)+".."+H.b(x)+", inclusive"
else y=x<z?": Valid value range is empty":": Only valid value is "+H.b(z)}return y},
A:{
mc:function(a){return new P.dN(null,null,!1,null,null,a)},
c3:function(a,b,c){return new P.dN(null,null,!0,a,b,"Value not in range")},
X:function(a,b,c,d,e){return new P.dN(b,c,!0,a,d,"Invalid value")},
md:function(a,b,c,d,e){if(a<b||a>c)throw H.c(P.X(a,b,c,d,e))},
c4:function(a,b,c,d,e,f){if(0>a||a>c)throw H.c(P.X(a,0,c,"start",f))
if(a>b||b>c)throw H.c(P.X(b,a,c,"end",f))
return b}}},
kI:{"^":"aY;e,l:f>,a,b,c,d",
gdW:function(){return"RangeError"},
gdV:function(){if(J.bQ(this.b,0))return": index must not be negative"
var z=this.f
if(z===0)return": no indices are valid"
return": index should be less than "+H.b(z)},
A:{
cB:function(a,b,c,d,e){var z=e!=null?e:J.aD(b)
return new P.kI(b,z,!0,a,c,"Index out of range")}}},
P:{"^":"Z;a",
k:function(a){return"Unsupported operation: "+this.a}},
ab:{"^":"Z;a",
k:function(a){var z=this.a
return z!=null?"UnimplementedError: "+z:"UnimplementedError"}},
E:{"^":"Z;a",
k:function(a){return"Bad state: "+this.a}},
B:{"^":"Z;a",
k:function(a){var z=this.a
if(z==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+H.b(P.eP(z))+"."}},
lB:{"^":"d;",
k:function(a){return"Out of Memory"},
gbf:function(){return},
$isZ:1},
fD:{"^":"d;",
k:function(a){return"Stack Overflow"},
gbf:function(){return},
$isZ:1},
jz:{"^":"Z;a",
k:function(a){var z=this.a
return z==null?"Reading static variable during its initialization":"Reading static variable '"+H.b(z)+"' during its initialization"}},
pg:{"^":"d;a",
k:function(a){var z=this.a
if(z==null)return"Exception"
return"Exception: "+H.b(z)}},
eU:{"^":"d;a,b,c",
k:function(a){var z,y,x
z=this.a
y=""!==z?"FormatException: "+z:"FormatException"
x=this.b
if(typeof x!=="string")return y
if(x.length>78)x=C.b.az(x,0,75)+"..."
return y+"\n"+x}},
kh:{"^":"d;h:a<,fa,$ti",
k:function(a){return"Expando:"+H.b(this.a)},
i:function(a,b){var z,y
z=this.fa
if(typeof z!=="string"){if(b==null||typeof b==="boolean"||typeof b==="number"||typeof b==="string")H.f(P.co(b,"Expandos are not allowed on strings, numbers, booleans or null",null))
return z.get(b)}y=H.dJ(b,"expando$values")
return y==null?null:H.dJ(y,z)},
n:function(a,b,c){var z,y
z=this.fa
if(typeof z!=="string")z.set(b,c)
else{y=H.dJ(b,"expando$values")
if(y==null){y=new P.d()
H.fh(b,"expando$values",y)}H.fh(y,z,c)}}},
bu:{"^":"d;"},
u:{"^":"M;",$isS:1,
$asS:function(){return[P.M]}},
"+int":0,
y:{"^":"d;$ti",
aP:function(a,b){return H.bw(this,b,H.x(this,"y",0),null)},
bZ:["dM",function(a,b){return new H.I(this,b,[H.x(this,"y",0)])}],
Z:function(a,b){var z
for(z=this.gY(this);z.t();)if(J.i(z.gF(),b))return!0
return!1},
L:function(a,b){var z
for(z=this.gY(this);z.t();)b.$1(z.gF())},
bj:function(a,b,c){var z,y
for(z=this.gY(this),y=b;z.t();)y=c.$2(y,z.gF())
return y},
bx:function(a,b){return P.T(this,b,H.x(this,"y",0))},
cd:function(a){return this.bx(a,!0)},
by:function(a){return P.b_(this,H.x(this,"y",0))},
gl:function(a){var z,y
z=this.gY(this)
for(y=0;z.t();)++y
return y},
gK:function(a){return!this.gY(this).t()},
gak:function(a){return!this.gK(this)},
dH:function(a,b){return H.n0(this,b,H.x(this,"y",0))},
gE:function(a){var z,y
z=this.gY(this)
if(!z.t())throw H.c(H.a9())
do y=z.gF()
while(z.t())
return y},
gc2:function(a){var z,y
z=this.gY(this)
if(!z.t())throw H.c(H.a9())
y=z.gF()
if(z.t())throw H.c(H.dn())
return y},
an:function(a,b){var z,y,x
if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(P.l("index"))
if(b<0)H.f(P.X(b,0,null,"index",null))
for(z=this.gY(this),y=0;z.t();){x=z.gF()
if(b===y)return x;++y}throw H.c(P.cB(b,this,"index",null,y))},
k:function(a){return P.kT(this,"(",")")}},
cE:{"^":"d;$ti"},
J:{"^":"d;$ti",$isy:1,$isV:1},
"+List":0,
D:{"^":"d;$ti"},
ao:{"^":"d;",
gv:function(a){return P.d.prototype.gv.call(this,this)},
k:function(a){return"null"}},
"+Null":0,
M:{"^":"d;",$isS:1,
$asS:function(){return[P.M]}},
"+num":0,
d:{"^":";",
u:function(a,b){return this===b},
gv:function(a){return H.aw(this)},
k:function(a){return H.cJ(this)},
gbn:function(a){return new H.aq(H.hN(this),null)},
toString:function(){return this.k(this)}},
bb:{"^":"d;"},
bA:{"^":"V;$ti"},
aT:{"^":"d;"},
q:{"^":"d;",$isS:1,
$asS:function(){return[P.q]},
$isdG:1},
"+String":0,
bF:{"^":"d;w<",
gl:function(a){return this.w.length},
gK:function(a){return this.w.length===0},
gak:function(a){return this.w.length!==0},
k:function(a){var z=this.w
return z.charCodeAt(0)==0?z:z},
A:{
fI:function(a,b,c){var z=J.af(b)
if(!z.t())return a
if(c.length===0){do a+=H.b(z.gF())
while(z.t())}else{a+=H.b(z.gF())
for(;z.t();)a=a+c+H.b(z.gF())}return a},
nS:function(a){return new P.bF(a)}}}}],["","",,P,{"^":"",ft:{"^":"d;"}}],["","",,P,{"^":"",
cK:function(a){return C.H},
pw:{"^":"d;",
ac:function(a){if(a<=0||a>4294967296)throw H.c(P.mc("max must be in range 0 < max \u2264 2^32, was "+a))
return Math.random()*a>>>0},
fU:function(){return Math.random()}}}],["","",,S,{"^":"",jp:{"^":"d;a,b,$ti",
i:function(a,b){return this.b.i(0,b)},
a1:function(a){return this.b.a1(a)},
L:function(a,b){return this.b.L(0,b)},
gK:function(a){var z=this.b
return z.gK(z)},
gak:function(a){var z=this.b
return z.gak(z)},
gl:function(a){var z=this.b
return z.gl(z)},
n:function(a,b,c){this.i2()
this.b.n(0,b,c)},
k:function(a){return J.h(this.b)},
i2:function(){if(!this.a)return
this.a=!1
this.b=P.c1(this.b,H.m(this,0),H.m(this,1))},
$isD:1}}],["","",,A,{"^":"",jq:{"^":"d;a,b,$ti",
gl:function(a){return this.b.a},
c8:function(a){return this.b.c8(a)},
Z:function(a,b){return this.b.Z(0,b)},
L:function(a,b){return this.b.L(0,b)},
gK:function(a){return this.b.a===0},
gak:function(a){return this.b.a!==0},
gY:function(a){var z,y
z=this.b
y=new P.ac(z,z.r,null,null,[null])
y.c=z.e
return y},
gE:function(a){var z=this.b
return z.gE(z)},
aP:function(a,b){var z=this.b
z.toString
return new H.bt(z,b,[H.m(z,0),null])},
by:function(a){var z,y
z=this.b
y=z.e3()
y.ar(0,z)
return y},
q:function(a,b){this.im()
return this.b.q(0,b)},
k:function(a){return J.h(this.b)},
im:function(){if(!this.a)return
this.a=!1
this.b=P.b_(this.b,H.m(this,0))},
$isbA:1,
$isV:1}}],["","",,S,{"^":"",df:{"^":"d;fc:a<,b,$ti",
a_:function(a){var z=new S.L(null,null,this.$ti)
z.a9()
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
if(!z.$isdf)return!1
y=b.a
x=this.a
if(y.length!==x.length)return!1
z=z.gv(b)
w=this.gv(this)
if(z==null?w!=null:z!==w)return!1
for(v=0;z=x.length,v!==z;++v){if(v>=y.length)return H.e(y,v)
w=y[v]
if(v>=z)return H.e(x,v)
if(!J.i(w,x[v]))return!1}return!0},
k:function(a){return J.h(this.a)},
i:function(a,b){var z=this.a
if(b>>>0!==b||b>=z.length)return H.e(z,b)
return z[b]},
gl:function(a){return this.a.length},
bG:function(a,b,c){var z=this.a
return(z&&C.a).bG(z,b,c)},
b8:function(a,b){return this.bG(a,b,0)},
gY:function(a){var z=this.a
return new J.br(z,z.length,0,null,[H.m(z,0)])},
aP:function(a,b){var z=this.a
z.toString
return new H.an(z,b,[H.m(z,0),null])},
Z:function(a,b){var z=this.a
return(z&&C.a).Z(z,b)},
L:function(a,b){var z=this.a
return(z&&C.a).L(z,b)},
by:function(a){var z=this.a
z.toString
return P.b_(z,H.m(z,0))},
gK:function(a){return this.a.length===0},
gak:function(a){return this.a.length!==0},
gE:function(a){var z=this.a
return(z&&C.a).gE(z)},
a9:function(){if(new H.aq(H.U(H.m(this,0)),null).u(0,C.n))throw H.c(new P.P('explicit element type required, for example "new BuiltList<int>"'))}},L:{"^":"d;fc:a<,b,$ti",
p:function(){var z,y
z=this.b
if(z==null){z=this.a
y=new S.df(z,null,this.$ti)
y.a9()
this.a=z
this.b=y
z=y}return z},
m:function(a){if(H.aM(a,"$isdf",this.$ti,null)){this.a=a.gfc()
this.b=a}else{this.a=P.T(a,!0,H.m(this,0))
this.b=null}},
i:function(a,b){var z=this.a
if(b>>>0!==b||b>=z.length)return H.e(z,b)
return z[b]},
n:function(a,b,c){var z
if(c==null)H.f(P.G("null element"))
z=this.geb()
if(b>>>0!==b||b>=z.length)return H.e(z,b)
z[b]=c},
q:function(a,b){var z
if(b==null)H.f(P.G("null element"))
z=this.geb();(z&&C.a).q(z,b)},
a7:function(a,b){var z=this.geb();(z&&C.a).a7(z,b)},
aP:function(a,b){var z=this.a
z.toString
z=new H.an(z,b,[H.m(z,0),null]).bx(0,!0)
this.a=z
this.b=null
this.hY(z)},
geb:function(){if(this.b!=null){this.a=P.T(this.a,!0,H.m(this,0))
this.b=null}return this.a},
a9:function(){if(new H.aq(H.U(H.m(this,0)),null).u(0,C.n))throw H.c(new P.P('explicit element type required, for example "new ListBuilder<int>"'))},
hY:function(a){var z,y,x,w
for(z=a.length,y=H.m(this,0),x=0;x<a.length;a.length===z||(0,H.ak)(a),++x){w=a[x]
if(!H.d3(w,y))throw H.c(P.G("invalid element: "+H.b(w)))}}}}],["","",,A,{"^":"",cs:{"^":"d;il:a<,b,c,d,$ti",
a_:function(a){var z=new A.dy(null,null,this.$ti)
z.co()
z.m(this)
a.$1(z)
return z.p()},
B:function(){return new S.jp(!0,this.a,this.$ti)},
gv:function(a){var z=this.b
if(z==null){z=this.a.gc6()
z=H.bw(z,new A.ja(this),H.x(z,"y",0),null)
z=P.T(z,!1,H.x(z,"y",0))
C.a.eN(z)
z=X.bp(z)
this.b=z}return z},
u:function(a,b){var z,y,x,w,v
if(b==null)return!1
if(b===this)return!0
z=J.n(b)
if(!z.$iscs)return!1
y=b.a
x=this.a
if(y.gl(y)!==x.gl(x))return!1
z=z.gv(b)
w=this.gv(this)
if(z==null?w!=null:z!==w)return!1
z=this.c
if(z==null){z=x.gc6()
this.c=z}z=z.gY(z)
for(;z.t();){v=z.gF()
if(!J.i(y.i(0,v),x.i(0,v)))return!1}return!0},
k:function(a){return J.h(this.a)},
i:function(a,b){return this.a.i(0,b)},
L:function(a,b){this.a.L(0,b)},
gK:function(a){var z=this.a
return z.gK(z)},
gak:function(a){var z=this.a
return z.gak(z)},
gl:function(a){var z=this.a
return z.gl(z)},
co:function(){if(new H.aq(H.U(H.m(this,0)),null).u(0,C.n))throw H.c(new P.P('explicit key type required, for example "new BuiltMap<int, int>"'))
if(new H.aq(H.U(H.m(this,1)),null).u(0,C.n))throw H.c(new P.P('explicit value type required, for example "new BuiltMap<int, int>"'))}},ja:{"^":"a:0;a",
$1:function(a){var z,y
z=J.j(a)
y=J.j(this.a.a.i(0,a))
return X.d0(X.aU(X.aU(0,J.j(z)),J.j(y)))}},dy:{"^":"d;a,b,$ti",
p:function(){var z=this.b
if(z==null){z=new A.cs(this.a,null,null,null,this.$ti)
z.co()
this.b=z}return z},
m:function(a){var z
if(H.aM(a,"$iscs",this.$ti,null)){this.b=a
this.a=a.gil()}else if(!!a.$iscs){z=P.c1(a.a,H.m(this,0),H.m(this,1))
this.b=null
this.a=z}else if(!!a.$isD){z=P.c1(a,H.m(this,0),H.m(this,1))
this.b=null
this.a=z}else throw H.c(P.G("expected Map or BuiltMap, got "+H.b(a.gbn(a))))},
i:function(a,b){return this.a.i(0,b)},
n:function(a,b,c){if(c==null)H.f(P.G("null value"))
this.giz().n(0,b,c)},
giz:function(){if(this.b!=null){this.a=P.c1(this.a,H.m(this,0),H.m(this,1))
this.b=null}return this.a},
co:function(){if(new H.aq(H.U(H.m(this,0)),null).u(0,C.n))throw H.c(new P.P('explicit key type required, for example "new MapBuilder<int, int>"'))
if(new H.aq(H.U(H.m(this,1)),null).u(0,C.n))throw H.c(new P.P('explicit value type required, for example "new MapBuilder<int, int>"'))}}}],["","",,L,{"^":"",dg:{"^":"d;iB:a<,b,$ti",
a_:function(a){var z=new L.bf(null,null,this.$ti)
z.bt()
z.m(this)
a.$1(z)
return z.p()},
gv:function(a){var z=this.b
if(z==null){z=this.a
z.toString
z=P.T(new H.bt(z,new L.jb(),[H.m(z,0),null]),!1,null)
C.a.eN(z)
z=X.bp(z)
this.b=z}return z},
u:function(a,b){var z,y,x
if(b==null)return!1
if(b===this)return!0
z=J.n(b)
if(!z.$isdg)return!1
y=this.a
if(b.a.a!==y.a)return!1
z=z.gv(b)
x=this.gv(this)
if(z==null?x!=null:z!==x)return!1
return y.j9(b)},
k:function(a){return J.h(this.a)},
gl:function(a){return this.a.a},
c8:function(a){return this.a.c8(a)},
gY:function(a){var z,y
z=this.a
y=new P.ac(z,z.r,null,null,[null])
y.c=z.e
return y},
aP:function(a,b){var z=this.a
z.toString
return new H.bt(z,b,[H.m(z,0),null])},
Z:function(a,b){return this.a.Z(0,b)},
L:function(a,b){return this.a.L(0,b)},
by:function(a){return new A.jq(!0,this.a,this.$ti)},
gK:function(a){return this.a.a===0},
gak:function(a){return this.a.a!==0},
gE:function(a){var z=this.a
return z.gE(z)},
bt:function(){if(new H.aq(H.U(H.m(this,0)),null).u(0,C.n))throw H.c(new P.P('explicit element type required, for example "new BuiltSet<int>"'))}},jb:{"^":"a:0;",
$1:function(a){return J.j(a)}},bf:{"^":"d;a,b,$ti",
p:function(){var z=this.b
if(z==null){z=new L.dg(this.a,null,this.$ti)
z.bt()
this.b=z}return z},
m:function(a){var z,y,x,w
if(H.aM(a,"$isdg",this.$ti,null)){this.a=a.giB()
this.b=a}else{z=H.m(this,0)
y=P.W(null,null,null,z)
for(x=J.af(a);x.t();){w=x.gF()
if(H.d3(w,z))y.q(0,w)
else throw H.c(P.G("iterable contained invalid element: "+H.b(w)))}this.b=null
this.a=y}},
q:function(a,b){if(b==null)H.f(P.G("null element"))
this.gfj().q(0,b)},
aP:function(a,b){var z=this.a
z.toString
z=P.b_(new H.bt(z,b,[H.m(z,0),null]),null)
this.b=null
this.a=z
this.iC(z)},
gfj:function(){if(this.b!=null){this.a=P.b_(this.a,H.m(this,0))
this.b=null}return this.a},
bt:function(){if(new H.aq(H.U(H.m(this,0)),null).u(0,C.n))throw H.c(new P.P('explicit element type required, for example "new SetBuilder<int>"'))},
iC:function(a){var z,y,x
for(z=new P.ac(a,a.r,null,null,[null]),z.c=a.e,y=H.m(this,0);z.t();){x=z.d
if(!H.d3(x,y))throw H.c(P.G("invalid element: "+H.b(x)))}}}}],["","",,Y,{"^":"",
k:function(a,b){if(typeof b!=="number")return H.v(b)
a=536870911&a+b
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
R:function(a){a=536870911&a+((67108863&a)<<3)
a^=a>>>11
return 536870911&a+((16383&a)<<15)}}],["","",,N,{"^":"",mA:{"^":"my;ch,cx,au:cy@,b2:db@,bq:dx@,b,c,d,e,f,r,x,y,z,Q,a",
h0:function(){var z=$.$get$ck()
z.n(0,"game",this.cx)
z.n(0,"hitpoints",this.cy)
z.n(0,"stamina",this.db)
z.n(0,"gold",this.dx)},
jG:function(){var z,y,x,w
this.cx=null
this.cy=Z.bD("Health",new N.mD(),"#CCCCCC","Your physical state",100,0,!0,P.aN)
z=P.u
this.db=Z.bD("Stamina",new N.mE(),"#CCCCCC","Spare physical energy",0,0,!0,z)
z=Z.bD("Gold",new N.mF(),"#CCCCCC","Gold coins",0,0,!0,z)
this.dx=z
y=$.$get$bN()
x=this.cy
w=this.db
y=new O.eO(N.ba("EdgeheadGame"),null,!1,null,null,null,null,null,null,null,null,new Y.a1(H.r([],[Y.a7]),0,P.aR()),x,w,z,O.t5(),O.t4(),O.t3(),y,this.ghz(),new P.bF(""),!1,null)
y.hx()
this.cx=y
y.x="endGame"
$.$get$cg().q(0,0)},
hK:function(){var z,y
z=new O.cP([[null,P.ah(["goto","gameLoop"])]],0,null,!1,!1)
y=this.b.a
y.n(0,"start",z)
z.a="start"
z=new O.cP([new N.mC(this),[null,P.ah(["goto","gameLoop"])]],0,null,!1,!1)
y.n(0,"gameLoop",z)
z.a="gameLoop"
z=new O.cP(['<p class="meta">\n  Hit <strong>Restart</strong> (top left) to play again. It will be different.\n</p>'],0,null,!1,!1)
y.n(0,"endGame",z)
z.a="endGame"
this.c=y.i(0,"start")},
A:{
mB:function(){var z,y,x,w
z=Z.bD("Health",new N.r1(),"#CCCCCC","Your physical state",100,0,!0,P.aN)
y=P.u
x=Z.bD("Stamina",new N.r2(),"#CCCCCC","Spare physical energy",0,0,!0,y)
y=Z.bD("Gold",new N.r4(),"#CCCCCC","Gold coins",0,0,!0,y)
w=P.q
z=new N.mA("net.filiph.edgehead.0.0.1",null,z,x,y,new O.mG(new H.O(0,null,null,null,null,null,0,[w,O.cP])),null,null,null,P.W(null,null,null,w),!1,null,-9999,null,null,null)
z.hK()
return z}}},r1:{"^":"a:17;",
$1:function(a){var z=J.n(a)
if(z.u(a,0))return"\ud83d\udc80"
if(z.c_(a,0.5))return"\ud83d\ude23"
if(z.aJ(a,1))return"\ud83d\ude27"
return"\ud83d\ude10"}},r2:{"^":"a:9;",
$1:function(a){return H.b(a)+" \ud83d\udd06"}},r4:{"^":"a:9;",
$1:function(a){return H.b(a)+" \ud83d\udcb0"}},mC:{"^":"a:18;a",
$0:function(){var z=0,y=P.av(),x=this
var $async$$0=P.as(function(a,b){if(a===1)return P.ax(b,y)
while(true)switch(z){case 0:z=2
return P.ar(x.a.cx.bm(),$async$$0)
case 2:return P.ay(null,y)}})
return P.az($async$$0,y)}},mD:{"^":"a:17;",
$1:function(a){var z=J.n(a)
if(z.u(a,0))return"\ud83d\udc80"
if(z.c_(a,0.5))return"\ud83d\ude23"
if(z.aJ(a,1))return"\ud83d\ude27"
return"\ud83d\ude10"}},mE:{"^":"a:9;",
$1:function(a){return H.b(a)+" \ud83d\udd06"}},mF:{"^":"a:9;",
$1:function(a){return H.b(a)+" \ud83d\udcb0"}}}],["","",,M,{"^":"",bW:{"^":"d;"},kb:{"^":"d;"},oD:{"^":"bW;a,b",
a_:function(a){var z=new M.dY(null,!1,0)
z.m(this)
a.$1(z)
return z.p()},
u:function(a,b){if(b==null)return!1
if(b===this)return!0
if(!(b instanceof M.bW))return!1
return this.a===b.a&&this.b===b.b},
gv:function(a){return Y.R(Y.k(Y.k(0,C.K.gv(this.a)),this.b&0x1FFFFFFF))},
k:function(a){return"EdgeheadGlobalState {hasKegOfBeer="+String(this.a)+",\nbloodrockFollowers="+C.d.k(this.b)+",\n}"}},dY:{"^":"kb;c,a,b",
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
z=new M.oD(y,this.b)}this.m(z)
return z}}}],["","",,O,{"^":"",
uF:[function(a){var z,y
z=a.gc1()
y=a.gbS()
if(typeof y!=="number")return H.v(y)
return z-2*y},"$1","d5",2,0,25],
uM:[function(a){var z,y,x
z=a.gc1()
y=a.gcN()
x=a.gbS()
if(typeof x!=="number")return H.v(x)
return z+y-x},"$1","hD",2,0,25],
eO:{"^":"lg;y,z,Q,ch,cx,cy,db,dx,dy,bz:fr<,fx,eP:fy<,au:go<,b2:id<,bq:k1<,a,b,c,d,e,f,r,x",
hx:function(){var z,y,x,w,v,u
z=P.bv(C.r,null)
y=$.$get$ch()
this.cy=R.b6(1000,"orc",O.d5(),null,new G.c9("sword",1,z),null,0,2,0,!1,2,!1,C.t,0,y)
this.db=R.b6(1001,"goblin",O.d5(),null,new G.c9("scimitar",1,P.bv(C.r,null)),null,0,1,0,!1,1,!1,C.t,0,y)
y=new S.L(null,null,[Q.w])
y.a9()
y.m([new Q.w("kill_agruth","","",null)])
this.dx=new K.c6(y.p(),"preStartBook",new O.k2(),new O.k3(),null,null,"ground")
y=R.b6(1,"Filip",null,"preStartBook",null,null,0,2,1000,!0,2,!0,C.B,1,null)
this.ch=y
z=y.r
y=y.cx
if(typeof z!=="number")return z.cS()
if(typeof y!=="number")return H.v(y)
this.go.sad(z/y)
this.id.sad(this.ch.fx)
this.k1.sad(this.ch.f)
this.cx=R.b6(100,"Briana",null,this.dx.b,null,this.ch.x,0,2,0,!1,2,!0,C.X,0,null)
this.dy=F.fo(this.dx,!1)
y=K.c6
x=P.T($.$get$hw(),!0,y)
C.a.ar(x,[this.dx,$.$get$eh()])
w=new M.dY(null,!1,0).p()
z=this.ch
v=this.cx
u=this.dy
v=P.b_([z,v],R.F)
z=P.b1(null,O.cm)
u=new A.a8(v,P.W(null,null,null,U.am),w,z,P.b_(x,y),P.T([u],!0,S.a0),0,null)
this.fr=u
y=new Y.a1(H.r([],[Y.a7]),0,P.aR())
y.b=u.r
this.fx=new B.bx(u,null,y,1,1,!0,!1,!1,0)},
cP:function(){var z=0,y=P.av(),x,w=this,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
var $async$cP=P.as(function(a,b){if(a===1)return P.ax(b,y)
while(true)switch(z){case 0:v=w.fy
u=w.gjl()
if(v.fY(u)){z=1
break}t=w.fr.a8(w.ch.x)
s=t.gau()
r=t.gfS()
if(typeof s!=="number"){x=s.cS()
z=1
break}if(typeof r!=="number"){x=H.v(r)
z=1
break}w.go.sad(s/r)
w.id.sad(t.gb2())
w.k1.sad(t.gbq())
r=w.y
r.fN("update() for world at time "+w.fr.r)
s=w.fr.f
if(s.length===0){w.r=!0
v.G(0,"\n\n",!0)
if(w.fr.jB(w.ch.x))v.G(0,"TO BE CONTINUED.",!0)
else v.G(0,"You died.",!0)
w.f.w+=v.ca()
z=1
break}q=C.a.gE(s)
p=q.dB(w.fr)
s=w.fr
o=N.ba("ActorPlanner")
n=new H.O(0,null,null,null,null,null,0,[null,null])
m=p==null
l=m?p:p.gj()
k=new Y.a1(H.r([],[Y.a7]),0,P.aR())
k.b=s.r
j=new G.it(o,l,new B.bx(s,null,k,1,1,!0,!1,!1,0),0,!1,n)
if(m)H.f(P.G("Called ActorPlanner with actor == null. That may mean that a Situation returns getCurrentActor as null. Some action that you added should make sure it removes the Situation. World: "+J.h(s)+". Situation: "+H.b(s.gjb())))
z=3
return P.ar(j.k9(),$async$cP)
case 3:if(n.gK(n)){o.eG("There are no actions available for actorId="+H.b(l)+".")
m="Actions not available for "+H.b(l)+" and "
l=J.n(s)
s="PlanConsequence<"+l.gv(s)+", "+l.k(s)+", "+C.u.k(null)
o.bF(m+(s+", 1, 0, >")+".")}s=Z.lI(n)
i=new Z.lH(new P.h5(n,[null,null]),s)
if(n.gK(n))$.$get$by().eG("Created with no recommendations.")
if(s.length===0){r.dF("No recommendation for "+H.b(p.gh()))
r.dF(new O.k5(w))
w.fr.fC(q.gj());++w.fr.r
z=1
break}z=p.gH()===!0?4:6
break
case 4:u=s.length
if(u>1)for(h=0;o=s.length,h<o;o===u||(0,H.ak)(s),++h);r.bF("planner.generateTable for "+H.b(p.gh()))
j.eH().L(0,new O.k6(w))
u=i.h_(q.gfR(),O.hD())
u.toString
g=P.T(u,!1,H.x(u,"y",0))
if(g.length!==0&&C.a.bP(g,new O.k7())){w.f.w+=v.ca()
C.a.sl(v.a,0)}v=new O.k8(new O.ka())
u=g.length-1
if(u-0<=32)H.fC(g,0,u,v)
else H.fB(g,0,u,v)
for(v=g.length,u=w.c,h=0;h<g.length;g.length===v||(0,H.ak)(g),++h){f=g[h]
u.$3$helpMessage$script(f.gX(),f.gS(),new O.k9(w,p,f))}z=1
break
z=5
break
case 6:s=p.gfB()
z=7
return P.ar(w.cg(i.k8(s==null?O.hD():s),p,v),$async$cP)
case 7:case 5:v.fY(u)
case 1:return P.ay(x,y)}})
return P.az($async$cP,y)},
cg:function(a,b,c){var z=0,y=P.av(),x,w=this,v,u,t
var $async$cg=P.as(function(d,e){if(d===1)return P.ax(e,y)
while(true)switch(z){case 0:v=a.d8(b,w.fx,w.fr)
u=P.T(v,!0,H.x(v,"y",0))
z=b.gH()===!0?3:5
break
case 3:z=6
return P.ar(w.cZ(a,b,u),$async$cg)
case 6:z=4
break
case 5:t=S.m9(new H.an(u,new O.k_(),[H.m(u,0),null]),1)
if(t>=u.length){x=H.e(u,t)
z=1
break}w.fx=u[t]
case 4:C.a.ar(c.a,w.fx.geP().a)
w.fr=w.fx.gbz()
v=w.y
v.bF(new O.k0(a,b))
v.aa(new O.k1(w,b))
case 1:return P.ay(x,y)}})
return P.az($async$cg,y)},
cZ:function(a,b,c){var z=0,y=P.av(),x=this,w,v,u,t,s,r,q,p,o,n,m,l
var $async$cZ=P.as(function(d,e){if(d===1)return P.ax(e,y)
while(true)switch(z){case 0:w=a.N(b,x.fr)
v=J.n(w)
z=v.u(w,1)?2:4
break
case 2:x.fx=C.a.gc2(c)
z=3
break
case 4:z=v.u(w,0)?5:7
break
case 5:x.fx=C.a.gc2(c)
z=6
break
case 7:u=C.a.gE(J.h(a.gO()).split("."))
v=a.ai(b,x.fr)
t=a.gU()&&b.jC(a.gO())
s="use "+H.b(u)
x.ff()
z=8
return P.ar(x.e.$4$rerollEffectDescription$rerollable(w,v,s,t),$async$cZ)
case 8:r=e
t=new H.I(c,new O.jX(r),[H.m(c,0)])
x.fx=t.gc2(t)
if(r.gkD()===!0){q=A.dX(x.fx.gbz())
q.a5(b.gj(),new O.jY())
v=x.fx
t=v.gfl()
s=H.r([],[Y.a7])
p=new Y.a1(s,0,P.aR())
C.a.ar(s,v.c.a)
s=v.d
o=v.e
n=v.f
m=v.r
l=v.x
v=v.y
p.b=q.r
x.fx=new B.bx(q,t,p,s,o,n,m,l,v)}case 6:case 3:return P.ay(null,y)}})
return P.az($async$cZ,y)}},
k2:{"^":"a:3;",
$3:function(a,b,c){return c.G(0,"UNUSED because this is the first choice",!0)}},
k3:{"^":"a:3;",
$3:function(a,b,c){return H.f(new P.E("Room isn't to be revisited"))}},
k5:{"^":"a:1;a",
$0:function(){var z=this.a.fr.d
return"- how we got here: "+new H.an(z,new O.k4(),[H.m(z,0),null]).cG(0," <- ")}},
k4:{"^":"a:0;",
$1:function(a){return a.gb5()}},
k6:{"^":"a:0;a",
$1:function(a){return this.a.y.bF(a)}},
ka:{"^":"a:27;",
$1:function(a){if(a instanceof Q.H)return H.b(a.b.gh())+" "+a.gX()
return"ZZZZZZ "+a.gX()}},
k7:{"^":"a:0;",
$1:function(a){return a.gX()!==""}},
k8:{"^":"a:7;a",
$2:function(a,b){var z=this.a
return J.bS(z.$1(a),z.$1(b))}},
k9:{"^":"a:18;a,b,c",
$0:function(){var z=0,y=P.av(),x=this,w
var $async$$0=P.as(function(a,b){if(a===1)return P.ax(b,y)
while(true)switch(z){case 0:w=x.a
z=2
return P.ar(w.cg(x.c,x.b,w.fy),$async$$0)
case 2:return P.ay(null,y)}})
return P.az($async$$0,y)}},
k_:{"^":"a:0;",
$1:function(a){return a.gka()}},
k0:{"^":"a:1;a,b",
$0:function(){return H.b(this.b.gh())+" selected "+this.a.gh()}},
k1:{"^":"a:1;a,b",
$0:function(){var z,y
z=this.a.fr.d
y=new H.an(z,new O.jZ(),[H.m(z,0),null]).cG(0," <- ")
return"- how "+H.b(this.b.gh())+" got here: "+y}},
jZ:{"^":"a:0;",
$1:function(a){return a.gb5()}},
jX:{"^":"a:0;a",
$1:function(a){return a.ges()===this.a.ges()}},
jY:{"^":"a:0;",
$1:function(a){var z=a.gb2()
if(typeof z!=="number")return z.aL()
a.sb2(z-1)
return a}}}],["","",,Q,{"^":"",
hI:function(a,b,c){return P.aL(function(){var z=a,y=b,x=c
var w=0,v=1,u,t,s,r,q,p
return function $async$hI(d,e){if(d===1){u=e
w=v}while(true)switch(w){case 0:t=y.f
t=t.length!==0?C.a.gE(t):null
s=J.ir(t.aI(y.a,y),new Q.rG(z))
t=J.af(s.a),r=new H.cU(t,s.b,[H.m(s,0)])
case 2:if(!r.t()){w=3
break}q=t.gF()
p=x.$1(q)
if(p.gT()&&!z.eo(q,y)){w=2
break}w=4
return p
case 4:w=2
break
case 3:return P.aJ()
case 1:return P.aK(u)}}})},
hJ:function(a,b,c){return P.aL(function(){var z=a,y=b,x=c
var w=0,v=1,u,t
return function $async$hJ(d,e){if(d===1){u=e
w=v}while(true)switch(w){case 0:t=y.f
t=y.dD((t.length!==0?C.a.gE(t):null).gbv()).gjp().a,t=new J.br(t,t.length,0,null,[H.m(t,0)])
case 2:if(!t.t()){w=3
break}w=4
return x.$1(t.d)
case 4:w=2
break
case 3:return P.aJ()
case 1:return P.aK(u)}}})},
hK:function(a,b,c){return P.aL(function(){var z=a,y=b,x=c
var w=0,v=1,u,t
return function $async$hK(d,e){if(d===1){u=e
w=v}while(true)switch(w){case 0:t=y.f
t=(t.length!==0?C.a.gE(t):null).gbE(),t=t.gY(t)
case 2:if(!t.t()){w=3
break}w=4
return x.$1(t.d)
case 4:w=2
break
case 3:return P.aJ()
case 1:return P.aK(u)}}})},
rG:{"^":"a:0;a",
$1:function(a){return!J.i(a,this.a)&&a.gaO()}},
a6:{"^":"d;",
d8:function(a,b,c){var z=this
return P.aL(function(){var y=a,x=b,w=c
var v=0,u=1,t,s,r,q,p
return function $async$d8(d,e){if(d===1){t=e
v=u}while(true)switch(v){case 0:s=z.N(y,x.gbz())
r=J.ad(s)
v=r.br(s,0)?2:3
break
case 2:q=A.dX(w)
v=4
return B.fe(q,x,z,z.hU(q,y,w,z.gR(),!0),s,!1,!1,!0)
case 4:case 3:v=r.aJ(s,1)?5:6
break
case 5:q=A.dX(w)
p=z.hT(q,y,w,z.gP(),!0)
if(typeof s!=="number")H.v(s)
v=7
return B.fe(q,x,z,p,1-s,!0,!1,!1)
case 7:case 6:return P.aJ()
case 1:return P.aK(t)}}})},
eU:function(a,b,c,d,e,f){var z,y,x,w,v,u,t
a.x=this
z=a.a.aK(0,new Q.is(b))
y=new O.ey(null,null,null,null,null,null,null,null,null,null,null,null)
x=this.gh()
y.ga0().c=x
x=b.gj()
y.ga0().f=x
y.ga0().e=C.O
y.ga0().ch=f
y.ga0().Q=e
x=this.gT()
y.ga0().y=x
x=this.ga3()
y.ga0().z=x
if(!!this.$isH){x=y.ga0()
w=x.r
if(w==null){w=new L.bf(null,null,[P.u])
w.bt()
w.m(C.e)
x.r=w
x=w}else x=w
w=this.b.gj()
if(w==null)H.f(P.G("null element"))
x.gfj().q(0,w)}v=new Y.a1(H.r([],[Y.a7]),0,P.aR())
x=a.f
u=(x.length!==0?C.a.gE(x):null).gj()
a.gv(a);(x.length!==0?C.a.gE(x):null).fX(a,v)
this.a=d.$3(z,a,v)
if(a.d1(u)!=null)a.fC(u);++a.r
w=a.eI(u)
if(!(w==null))w.fW(a,v)
a.x=null
while(!0){w=x.length!==0?C.a.gE(x):null
if((w==null?w:w.dB(a))!=null){w=x.length!==0?C.a.gE(x):null
w=!J.i(w==null?w:w.cW(a),!0)}else w=!0
if(!w)break
if((x.length!==0?C.a.gE(x):null)==null)break
t=C.a.gE(x)
t.di(a)
C.a.a7(x,t)}if(this.a==null)H.f(new P.E("No description given when executing "+this.k(0)+". You should return it from your world-modifying function."))
x=this.a
y.ga0().d=x
x=a.r
y.ga0().x=x
a.d.fs(y.p())
return v},
hU:function(a,b,c,d,e){return this.eU(a,b,c,d,!1,e)},
hT:function(a,b,c,d,e){return this.eU(a,b,c,d,e,!1)}},
is:{"^":"a:0;a",
$1:function(a){return J.i(a.gj(),this.a.gj())}},
H:{"^":"a6;bS:b<",
gX:function(){var z=new Y.a1(H.r([],[Y.a7]),0,P.aR())
z.fo(0,this.gah(),this.b)
return z.ca()},
ai:function(a,b){var z=new Y.a1(H.r([],[Y.a7]),0,P.aR())
z.iT(0,this.gal(),this.b,a,!0)
return z.ca()},
k:function(a){var z=this.b
return"EnemyTargetAction<"+this.gah()+"::enemy="+H.b(z.gj())+"/"+H.b(z.gh())+">"}},
cz:{"^":"a6;",
gX:function(){return this.b.gX()},
k:function(a){return"ExitAction<"+this.b.gX()+">"}},
cC:{"^":"a6;",
gX:function(){var z=new Y.a1(H.r([],[Y.a7]),0,P.aR())
z.fo(0,"pick up <object>",this.b)
return z.ca()},
k:function(a){return"ItemAction<"+this.gX()+">"}},
mk:{"^":"d;a,b",
k:function(a){return this.b},
A:{"^":"ut<"}}}],["","",,O,{"^":"",cm:{"^":"d;",
k:function(a){return"ActionRecord<"+H.b(this.b)+", "+H.b(this.c)+">"}},l7:{"^":"d;a,b",
k:function(a){return this.b}},oz:{"^":"cm;a,fn:b<,b5:c<,d,dm:e<,eR:f<,I:r<,hf:x<,hg:y<,z,hh:Q<",
a_:function(a){var z=new O.ey(null,null,null,null,null,null,null,null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof O.cm))return!1
if(J.i(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y)if(J.i(this.c,b.c)){z=this.d
y=b.d
if(z==null?y==null:z===y)if(J.i(this.e,b.e))if(J.i(this.f,b.f)){z=this.r
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
k:function(a){return"ActionRecord {accomplices="+J.h(this.a)+",\nactionName="+J.h(this.b)+",\ndescription="+H.b(J.h(this.c))+",\nknownTo="+J.h(this.d)+",\nprotagonist="+H.b(J.h(this.e))+",\nsufferers="+J.h(this.f)+",\ntime="+J.h(this.r)+",\nwasAggressive="+J.h(this.x)+",\nwasProactive="+J.h(this.y)+",\nwasFailure="+J.h(this.z)+",\nwasSuccess="+J.h(this.Q)+",\n}"}},ey:{"^":"d;a,b,c,d,e,f,r,x,y,z,Q,ch",
gfn:function(){return this.ga0().c},
gb5:function(){return this.ga0().d},
gdm:function(){return this.ga0().f},
geR:function(){var z,y
z=this.ga0()
y=z.r
if(y==null){y=new L.bf(null,null,[P.u])
y.bt()
y.m(C.e)
z.r=y
z=y}else z=y
return z},
gI:function(){return this.ga0().x},
ghf:function(){return this.ga0().y},
ghg:function(){return this.ga0().z},
ghh:function(){return this.ga0().ch},
ga0:function(){var z,y
z=this.a
if(z!=null){z=z.a
if(!(z==null)){y=new L.bf(null,null,[H.m(z,0)])
y.bt()
y.m(z)
z=y}this.b=z
z=this.a
this.c=z.b
this.d=z.c
this.e=z.d
this.f=z.e
z=z.f
if(!(z==null)){y=new L.bf(null,null,[H.m(z,0)])
y.bt()
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
x.bt()
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
s.bt()
s.m(C.e)
t.r=s
t=s}else t=s
t=t.p()
s=this.ga0().x
r=this.ga0().y
q=this.ga0().z
p=this.ga0().Q
o=this.ga0().ch
z=new O.oz(y,x,w,v,u,t,s,r,q,p,o)
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
hL:function(a,b){return P.aL(function(){var z=a,y=b
var x=0,w=1,v,u
return function $async$hL(c,d){if(c===1){v=d
x=w}while(true)switch(x){case 0:x=2
return z
case 2:u=y.a
x=3
return P.bI(new H.I(u,new R.rH(z),[H.m(u,0)]))
case 3:return P.aJ()
case 1:return P.aK(v)}}})},
b6:function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o){var z=new R.ez(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
new R.qY(a,b,j,l,m,e,h,k,n,i,g,d,f,o,c).$1(z)
return z.p()},
rH:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gfG()
y=this.a.gj()
return z==null?y==null:z===y}},
F:{"^":"ln;",
gj4:function(){return!0},
gbw:function(){var z=this.r
if(typeof z!=="number")return z.br()
return z>0},
gbk:function(){return this.d instanceof K.cA},
gb9:function(){return this.dx===C.i},
gaf:function(){return this.dx===C.m},
gab:function(){return this.dx===C.l},
jC:function(a){var z=this.fx
if(typeof z!=="number")return z.bI()
return z>=1},
eo:function(a,b){return this.fM(a,b)>0},
fM:function(a,b){var z,y
if(this.er(b)){z=a.gbo()
y=this.fy.a
z=z.gj()
z=y==null?z==null:y===z}else z=!1
if(z)return 1000
if(this.ih(a,b,10))return 1
z=a.gbo()
y=this.fy.a
z=z.gj()
return(y==null?z!=null:y!==z)?1:0},
er:function(a){var z,y
z=a.cc("Confuse",this,!0)
if(z==null)return!1
y=a.kt("Unconfuse",this,!0)
if(y==null)return!0
return y<z},
cV:function(a){var z,y,x,w,v,u,t,s,r,q,p
z=a.a8(this.x)
y=z.gau()
if(typeof y!=="number")return H.v(y)
x=2*y
if(!z.gbw())x-=10
y=z.d
if(!(y instanceof K.cA))x+=4
y=J.aX(y.gad(),2)
if(typeof y!=="number")return H.v(y)
x+=y
for(y=z.ch,w=[null],v=new P.ac(y,y.r,null,null,w),v.c=y.e;v.t();){y=J.aX(v.d.gad(),10)
if(typeof y!=="number")return H.v(y)
x+=y}y=a.a
for(v=y.gY(y),u=new H.cU(v,new R.iW(this),[H.m(y,0)]),t=0;u.t();){s=v.gF()
r=s.gaO()?2:0
q=s.gau()
if(typeof q!=="number")return H.v(q)
p=J.aX(s.d.gad(),2)
if(typeof p!=="number")return H.v(p)
t=t+r+2*q+p
for(r=s.ch,q=new P.ac(r,r.r,null,null,w),q.c=r.e;q.t();){r=J.aX(q.d.gad(),10)
if(typeof r!=="number")return H.v(r)
t+=r}}return new A.cn(x,t,y.bj(0,0,new R.iX(this,a)))},
aH:function(a){return C.a.Z(this.d.gdu(),a)},
ih:function(a,b,c){var z=b.ku(a,this,!0)
if(z==null)return!1
return z<=c},
$isb8:1},
ln:{"^":"d+dj;"},
qY:{"^":"a:0;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db",
$1:function(a){var z,y
a.gC().y=this.a
a.gC().db=this.b
a.gC().dx=this.d
a.gC().fr=this.e
z=this.f
if(z==null)z=$.$get$eg()
a.gC().e=z
a.gC().b=[]
a.gC().dy=C.l
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
z=y}else{z=$.$get$hZ()
z.toString
y=new L.bh(null,null)
y.m(z)
z=y}a.gC().go=z
a.gC().d=this.ch
a.gC().f=this.cx
a.gC().c=this.db
return a}},
iW:{"^":"a:0;a",
$1:function(a){var z,y
z=this.a
if(J.i(a.gbo(),z.fy)){y=a.gj()
z=z.x
z=y==null?z!=null:y!==z}else z=!1
return z}},
iX:{"^":"a:28;a,b",
$2:function(a,b){var z,y
z=b.gaO()?1:0
y=b.gau()
if(typeof y!=="number")return H.v(y)
return J.al(a,(z+y)*this.a.fM(b,this.b))}},
dH:{"^":"d;a,b",
k:function(a){return this.b}},
oA:{"^":"F;a,fB:b<,bv:c<,a2:d<,fG:e<,bq:f<,au:r<,j:x<,y,ep:z<,H:Q<,bU:ch<,fS:cx<,h:cy<,dh:db<,ao:dx<,J:dy<,fr,b2:fx<,bo:fy<",
a_:function(a){var z=new R.ez(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof R.F))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y)if(J.i(this.b,b.b)){z=this.c
y=b.c
if(z==null?y==null:z===y)if(J.i(this.d,b.d)){z=this.e
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
z=(z==null?y==null:z===y)&&J.i(this.fy,b.fy)}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1
else z=!1}else z=!1
else z=!1
return z},
gv:function(a){return Y.R(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)),J.j(this.f)),J.j(this.r)),J.j(this.x)),J.j(this.y)),J.j(this.z)),J.j(this.Q)),J.j(this.ch)),J.j(this.cx)),J.j(this.cy)),J.j(this.db)),J.j(this.dx)),J.j(this.dy)),C.u.gv(this.fr)),J.j(this.fx)),J.j(this.fy)))},
k:function(a){return"Actor {categories="+J.h(this.a)+",\ncombineFunction="+J.h(this.b)+",\ncurrentRoomName="+J.h(this.c)+",\ncurrentWeapon="+H.b(J.h(this.d))+",\nfollowingActorId="+J.h(this.e)+",\ngold="+J.h(this.f)+",\nhitpoints="+J.h(this.r)+",\nid="+J.h(this.x)+",\ninitiative="+J.h(this.y)+",\nisActive="+J.h(this.z)+",\nisPlayer="+J.h(this.Q)+",\nitems="+J.h(this.ch)+",\nmaxHitpoints="+J.h(this.cx)+",\nname="+J.h(this.cy)+",\nnameIsProperNoun="+J.h(this.db)+",\npose="+J.h(this.dx)+",\npronoun="+J.h(this.dy)+",\nshield="+C.u.k(this.fr)+",\nstamina="+J.h(this.fx)+",\nteam="+J.h(this.fy)+",\n}"}},
ez:{"^":"d;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go",
gfB:function(){return this.gC().c},
gbv:function(){return this.gC().d},
sbv:function(a){this.gC().d=a
return a},
ga2:function(){return this.gC().e},
sa2:function(a){this.gC().e=a
return a},
gfG:function(){return this.gC().f},
gbq:function(){return this.gC().r},
sbq:function(a){this.gC().r=a
return a},
gau:function(){return this.gC().x},
sau:function(a){this.gC().x=a
return a},
gj:function(){return this.gC().y},
gH:function(){return this.gC().ch},
gbU:function(){return this.gC().cx},
gfS:function(){return this.gC().cy},
gh:function(){return this.gC().db},
sh:function(a){this.gC().db=a
return a},
gdh:function(){return this.gC().dx},
gao:function(){return this.gC().dy},
sao:function(a){this.gC().dy=a
return a},
gJ:function(){return this.gC().fr},
gb2:function(){return this.gC().fy},
sb2:function(a){this.gC().fy=a
return a},
gbo:function(){var z,y
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
z=new R.oA(y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f.p())
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
return z}}}],["","",,A,{"^":"",cn:{"^":"d;c1:a<,cN:b<,bS:c<",
aL:function(a,b){return new A.ag(this.a-b.gc1(),this.b-b.gcN(),J.bq(this.c,b.gbS()))},
k:function(a){return"ActorScore<self="+C.k.bX(this.a,2)+",team="+C.k.bX(this.b,2)+",enemy="+J.cl(this.c,2)+">"}},ag:{"^":"d;c1:a<,cN:b<,bS:c<",
gjQ:function(){return this.a===-1/0&&this.b===-1/0&&J.i(this.c,-1/0)},
c0:function(a,b){if(typeof b!=="number")return H.v(b)
return new A.ag(this.a*b,this.b*b,J.bR(this.c,b))},
a4:function(a,b){return new A.ag(this.a+b.gc1(),this.b+b.gcN(),J.al(this.c,b.gbS()))},
cS:function(a,b){if(typeof b!=="number")return H.v(b)
return new A.ag(this.a/b,this.b/b,J.aX(this.c,b))},
k:function(a){return"ActorScoreChange<self="+C.k.bX(this.a,2)+",team="+C.k.bX(this.b,2)+",enemy="+J.cl(this.c,2)+">"},
A:{
iV:function(a){var z,y,x,w,v,u,t,s,r
for(z=a.length,y=0,x=0,w=0,v=0,u=0;t=a.length,u<t;t===z||(0,H.ak)(a),++u){s=a[u];++y
x+=s.a
w+=s.b
r=s.c
if(typeof r!=="number")return H.v(r)
v+=r}if(y===0)throw H.c(P.G("Cannot average empty iterable"))
return new A.ag(x/y,w/y,v/y)}}}}],["","",,U,{"^":"",
u2:function(a){switch(a){case C.J:return"spear"
case C.f:return"sword"
case C.y:return"fist"
default:throw H.c(P.G(a))}},
am:{"^":"lo;du:a<",
gb5:function(){return U.u2(C.a.gem(this.a))},
gj:function(){return H.aw(this)},
gep:function(){return!0},
gbw:function(){return!1},
gH:function(){return!1},
gdh:function(){return!1},
gJ:function(){return C.q},
gbo:function(){return $.$get$bP()},
$isb8:1},
lo:{"^":"d+dj;"},
dm:{"^":"d;a,b",
k:function(a){return this.b}}}],["","",,K,{"^":"",cA:{"^":"bG;h:b<,a"}}],["","",,G,{"^":"",c9:{"^":"bG;h:b<,dI:c<,a"}}],["","",,L,{"^":"",bG:{"^":"am;",
gl:function(a){return 2},
gdI:function(){return 0},
gad:function(){return this.gdI()},
$isb8:1}}],["","",,G,{"^":"",lg:{"^":"d;",
ff:function(){var z,y
z=this.f
y=z.w
if(y.length!==0){this.b.$1(y.charCodeAt(0)==0?y:y)
z.w=""}},
kP:[function(a){this.f.w+=a},"$1","gjl",2,0,19],
bm:function(){var z=0,y=P.av(),x,w=this,v,u
var $async$bm=P.as(function(a,b){if(a===1)return P.ax(b,y)
while(true)switch(z){case 0:if(w.x==null)throw H.c(new P.E("Cannot run a LoopedEvent before onFinishedGoto is defined."))
if(w.r){w.d.sl(0,0)
w.a.$1(w.x)
z=1
break}v=w.d
u=w.f
case 3:if(!!0){z=4
break}if(!(!w.r&&v.gl(v)===0&&u.w.length===0)){z=4
break}z=5
return P.ar(w.cP(),$async$bm)
case 5:z=3
break
case 4:w.ff()
case 1:return P.ay(x,y)}})
return P.az($async$bm,y)}}}],["","",,B,{"^":"",eK:{"^":"d;cU:a<,dd:b<,cH:c<",
k:function(a){return"ConsequenceStats<order="+this.c+", cumProb="+J.cl(this.b,3)+", score="+this.a.k(0)+">"}},bx:{"^":"d;bz:a<,fl:b<,eP:c<,ka:d<,dd:e<,f,r,es:x<,cH:y<",
gv:function(a){return X.bp([this.a,this.e,this.b,this.d,this.y,this.f,this.r,this.x])},
u:function(a,b){var z
if(b==null)return!1
z=J.n(b)
return!!z.$isbx&&this.gv(this)===z.gv(b)},
k:function(a){var z,y
z=this.a
y=J.n(z)
z="PlanConsequence<"+y.gv(z)+", "+y.k(z)+", "+J.h(this.b)+", "+H.b(this.d)+", "+this.y+", "
return z+(this.x?"isSuccess":"")+">"},
A:{
fe:function(a,b,c,d,e,f,g,h){var z,y
z=b==null
y=z?e:J.bR(e,b.gdd())
z=z?0:b.gcH()+1
d.b=a.r
return new B.bx(a,c,d,e,y,g,f,h,z)}}}}],["","",,G,{"^":"",it:{"^":"d;a,b,c,d,e,f",
j7:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j
z=this.a
z.aa("...")
z.aa("combining scores")
y=H.r([],[A.ag])
x=new G.iO()
for(w=J.af(a),v=b.a,u=b.b,t=b.c,s=null;w.t();){r=w.gF()
z.aa(new G.iM(r))
if(J.a3(r.gdd(),0.15))if(s==null){z.aa("    - first _bestCase")
s=r}else if(J.a3(x.$1(r.gcU()),x.$1(s.gcU()))){z.aa("    - new _bestCase")
s=r}q=r.gcU()
p=J.bq(q.c,t)
o=r.b
if(typeof o!=="number")return H.v(o)
n=new A.ag((q.a-v)*o,(q.b-u)*o,J.bR(p,o))
z.aa(new G.iN(n))
y.push(n)}m=A.iV(y)
w=s==null
if(w)l=C.D
else{q=s.gcU()
l=new A.ag(q.a-v,q.b-u,J.bq(q.c,t))}w=w?s:s.gcH()
if(typeof w!=="number")return H.v(w)
k=new A.ag(l.a/w,l.b/w,J.aX(l.c,w))
z.aa("- uplifts average = "+("ActorScoreChange<self="+C.k.bX(m.a,2)+",team="+C.k.bX(m.b,2)+",enemy="+J.cl(m.c,2)+">"))
z.aa("- best = "+k.k(0))
j=k.a4(0,m)
z.aa("- result = "+j.k(0))
return j},
eH:function(){var z=this
return P.aL(function(){var y=0,x=1,w,v,u,t,s
return function $async$eH(a,b){if(a===1){w=b
y=x}while(true)switch(y){case 0:v=z.f,u=v.gc6(),u=u.gY(u),t=1
case 2:if(!u.t()){y=3
break}s=u.gF()
y=4
return""+t+") "+s.gX()+"\t"+H.b(v.i(0,s))
case 4:++t
y=2
break
case 3:return P.aJ()
case 1:return P.aK(w)}}})},
dj:function(a,b,c){var z=0,y=P.av(),x=this,w,v,u,t,s,r,q,p,o,n,m
var $async$dj=P.as(function(d,e){if(d===1)return P.ax(e,y)
while(true)switch(z){case 0:w=x.f
w.b_(0)
v=x.c
u=v.a
t=u.a.aK(0,new G.iP(x))
s=t.cV(u)
r=x.a
r.bF("Planning for "+H.b(t.cy)+", initialScore="+s.k(0))
q=new P.b2(x.dY(t,u).a(),null,null,null)
case 2:if(!q.t()){z=3
break}p=q.c
o=p==null?q.b:p.gF()
r.b6(new G.iQ(t,o))
if(o.M(t,u)!==!0){r.b6(new G.iR(o))
z=2
break}z=4
return P.ar(x.cl(v,o,b,a,c).cd(0),$async$dj)
case 4:n=e
if(J.ew(n)===!0){r.b6(new G.iS(o))
w.n(0,o,C.E)
z=2
break}r.b6(new G.iT(s,o,n))
m=x.j7(n,s,b)
w.n(0,o,m)
r.b6(new G.iU(o,m))
z=2
break
case 3:x.e=!0
return P.ay(null,y)}})
return P.az($async$dj,y)},
k9:function(){return this.dj(50,10,null)},
dY:function(a,b){return P.aL(function(){var z=a,y=b
var x=0,w=1,v,u,t,s,r,q,p,o
return function $async$dY(c,d){if(c===1){v=d
x=w}while(true)switch(x){case 0:u=y.f
x=2
return P.bI((u.length!==0?C.a.gE(u):null).gbg())
case 2:u=(u.length!==0?C.a.gE(u):null).gaN()
t=u.length
s={func:1,ret:Q.cC,args:[U.am]}
r={func:1,ret:Q.cz,args:[Q.w]}
q={func:1,ret:Q.H,args:[R.F]}
p=0
case 3:if(!(p<u.length)){x=5
break}o=u[p]
x=H.at(o,q)?6:8
break
case 6:x=9
return P.bI(Q.hI(z,y,o))
case 9:x=7
break
case 8:x=H.at(o,r)?10:12
break
case 10:x=13
return P.bI(Q.hJ(z,y,o))
case 13:x=11
break
case 12:x=H.at(o,s)?14:16
break
case 14:x=17
return P.bI(Q.hK(z,y,o))
case 17:x=15
break
case 16:throw H.c(new P.E(o.k(0)+" is not one of the supported ones"))
case 15:case 11:case 7:case 4:u.length===t||(0,H.ak)(u),++p
x=3
break
case 5:return P.aJ()
case 1:return P.aK(v)}}})},
cl:function(a5,a6,a7,a8,a9){var $async$cl=P.as(function(b0,b1){switch(b0){case 2:u=x
z=u.pop()
break
case 1:v=b1
z=w}while(true)switch(z){case 0:s={}
r=a5.a
q=r.a.aK(0,new G.iw(t))
p=t.a
p.b6("=====")
p.b6(new G.ix(a6,q))
p.b6(new G.iy(a6))
if(a6.M(q,r)!==!0){p.b6("- firstAction not applicable")
z=1
break}o=q.cV(r)
p.b6(new G.iE(a5,o))
p.b6(new G.iF(a5))
n=P.b1(null,B.bx)
m=P.W(null,null,null,A.a8)
l=J.n(r)
k=l.gv(r)
for(j=new P.b2(a6.d8(q,a5,r).a(),null,null,null);j.t();){i=j.c
h=i==null?j.b:i.gF()
if(l.gv(r)!==k)throw H.c(new P.E("Action "+a6.k(0)+" modified world state when producing "+H.b(h)+"."))
n.av(h)}s.a=0
r=t.b
case 3:if(!!n.gK(n)){z=4
break}++s.a
g=n.dn()
p.aa("----")
p.aa(new G.iG(g))
p.aa(new G.iH(g))
if(g.gcH()>a7||s.a>a8){p.aa(new G.iI(s,a7,g))
p.aa(new G.iJ(g))
z=4
break}z=g.gbz().f.length===0?5:6
break
case 5:p.aa("- leaf node: world.situations is empty (end of book)")
l=g.a
q=l.a.b7(0,new G.iK(t),new G.iL())
if(q==null){p.aa("- this actor ("+H.b(r)+") has been removed")
z=3
break}f=new B.eK(q.cV(l),g.e,g.y)
p.aa(new G.iz(f))
z=7
x=[1]
return P.cZ(P.hc(f),$async$cl,y)
case 7:z=3
break
case 6:l=g.a
j=l.f
e=(j.length!==0?C.a.gE(j):null).dB(l)
j=l.a
i=new H.I(j,new G.iA(t),[H.m(j,0)])
d=i.gl(i)
if(d>1)throw H.c(new P.E("World has several duplicates of mainActor: "+J.h(l)))
else if(d===0){p.fN("mainActor "+H.b(r)+" dies and is removed in world - will use defaultScoreWhenDead")
q=null}else q=j.aK(0,new G.iB(t))
c=J.i(e,q)
p.aa("- actor: "+H.b(e.gh())+" (isMain=="+c+")")
j=q==null
p.aa("- mainActor: "+H.b(j?q:q.gh()))
b=j?q:q.cV(l)
if(b==null)b=C.F
f=new B.eK(b,g.e,g.y)
p.aa(new G.iC(o,f))
p.aa(new G.iD(g))
z=8
x=[1]
return P.cZ(P.hc(f),$async$cl,y)
case 8:p.aa("- generating all actions for "+H.b(e.gh()))
j=n.c
i=n.b
a=n.a
for(a0=new P.b2(t.dY(e,l).a(),null,null,null);a0.t();){a1=a0.c
a2=a1==null?a0.b:a1.gF()
if(a2.M(e,l)!==!0)continue
for(a1=new P.b2(a2.d8(e,g,l).a(),null,null,null);a1.t();){a3=a1.c
a4=a3==null?a1.b:a3.gF();++t.d
if(J.bQ(a4.gdd(),0.05))continue
if(m.Z(0,a4.gbz()))continue
n.av(a4)}}p.aa("- added "+(((n.c-n.b&n.a.length-1)>>>0)-((j-i&a.length-1)>>>0))+" new PlanConsequences")
m.q(0,l)
z=3
break
case 4:case 1:return P.cZ(null,0,y)
case 2:return P.cZ(v,1,y)}})
var z=0,y=P.p1($async$cl),x,w=2,v,u=[],t=this,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4
return P.qm(y)}},iO:{"^":"a:31;",
$1:function(a){var z=a.c
if(typeof z!=="number")return H.v(z)
return a.b-z}},iM:{"^":"a:1;a",
$0:function(){return"  - consequence: "+H.b(this.a)}},iN:{"^":"a:1;a",
$0:function(){return"    - uplift = "+this.a.k(0)}},iP:{"^":"a:0;a",
$1:function(a){return J.i(a.gj(),this.a.b)}},iQ:{"^":"a:1;a,b",
$0:function(){return"Evaluating action '"+this.b.gX()+"' for "+H.b(this.a.cy)}},iR:{"^":"a:1;a",
$0:function(){return"- action '"+this.a.gX()+"' isn't applicable"}},iS:{"^":"a:1;a",
$0:function(){return"- action '"+this.a.gX()+"' is possible but we couldn't get to any outcomes while planning. Scoring with negative infinity."}},iT:{"^":"a:1;a,b,c",
$0:function(){return"- action '"+this.b.gX()+"' leads to "+H.b(J.aD(this.c))+" different ConsequenceStats, initialScore="+this.a.k(0)}},iU:{"^":"a:1;a,b",
$0:function(){return"- action '"+this.a.gX()+"' was scored "+H.b(this.b)}},iw:{"^":"a:0;a",
$1:function(a){return J.i(a.gj(),this.a.b)}},ix:{"^":"a:1;a,b",
$0:function(){return"_getConsequenceStats for firstAction '"+this.a.gX()+"' of "+H.b(this.b.gh())}},iy:{"^":"a:1;a",
$0:function(){return"- firstAction == "+H.b(this.a)}},iE:{"^":"a:1;a,b",
$0:function(){var z=this.a
return"- current: initialScore="+this.b.k(0)+", cumProb="+H.b(z.e)+" (prob="+H.b(z.d)+", ord="+z.y+")"}},iF:{"^":"a:1;a",
$0:function(){var z=this.a
return"- initial action: "+C.b.c0(" ",z.y)+"- "+J.h(z.b)}},iG:{"^":"a:1;a",
$0:function(){return"evaluating a PlanConsequence of '"+this.a.gfl().gX()+"'"}},iH:{"^":"a:1;a",
$0:function(){var z=this.a.gbz().f
return"- situation: "+H.b(J.ij(z.length!==0?C.a.gE(z):null))}},iI:{"^":"a:1;a,b,c",
$0:function(){return"- order ("+this.c.gcH()+") higher than maximum ("+this.b+"), or consequences ("+this.a.a+") higher than maximum"}},iJ:{"^":"a:1;a",
$0:function(){var z=this.a.gbz().d
return"- how we got here: "+new H.an(z,new G.iv(),[H.m(z,0),null]).cG(0," <- ")}},iv:{"^":"a:0;",
$1:function(a){return a.gb5()}},iK:{"^":"a:0;a",
$1:function(a){return J.i(a.gj(),this.a.b)}},iL:{"^":"a:1;",
$0:function(){return}},iz:{"^":"a:1;a",
$0:function(){return"- "+this.a.k(0)}},iA:{"^":"a:0;a",
$1:function(a){return J.i(a.gj(),this.a.b)}},iB:{"^":"a:0;a",
$1:function(a){return J.i(a.gj(),this.a.b)}},iC:{"^":"a:1;a,b",
$0:function(){return"- mainActor's score == "+this.b.k(0)+" (initial="+this.a.k(0)+")"}},iD:{"^":"a:1;a",
$0:function(){var z=this.a.gbz().d
return"- how we got here: "+new H.an(z,new G.iu(),[H.m(z,0),null]).cG(0," <- ")}},iu:{"^":"a:0;",
$1:function(a){return a.gb5()}}}],["","",,Z,{"^":"",lH:{"^":"d;a,b",
gbg:function(){return this.b},
gK:function(a){return this.b.length===0},
h_:function(a,b){var z=this
return P.aL(function(){var y=a,x=b
var w=0,v=2,u,t,s,r,q,p,o,n,m,l
return function $async$h_(c,d){if(c===1){u=d
w=v}while(true)switch(w){case 0:t=z.b
w=t.length<=y?3:4
break
case 3:w=5
return P.bI(t)
case 5:w=1
break
case 4:s=z.i9(new Z.lK())
r=z.dX(new Z.lL(),[s])
q=z.dX(new Z.lM(),[s,r])
w=s!=null?6:8
break
case 6:$.$get$by().bF("best self preserving: "+H.b(s))
w=9
return s
case 9:p=1
w=7
break
case 8:p=0
case 7:w=r!=null&&p<y?10:11
break
case 10:$.$get$by().bF("best enemy damaging: "+H.b(r))
w=12
return r
case 12:++p
case 11:w=q!=null&&p<y?13:14
break
case 13:$.$get$by().bF("best team preserving: "+H.b(q))
w=15
return q
case 15:++p
case 14:if(p===y){w=1
break}C.a.cf(t,new Z.lN(z,x))
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
break}case 17:t.length===o||(0,H.ak)(t),++n
w=16
break
case 18:case 1:return P.aJ()
case 2:return P.aK(u)}}})},
k8:function(a){var z,y,x,w,v,u,t,s,r,q,p
z={}
y=this.b
if(y.length===1)return C.a.gc2(y)
C.a.cf(y,new Z.lO(this,a))
x=this.a.a
w=x.gce().bj(0,1/0,new Z.lP(a))
v=x.gce().bj(0,-1/0,new Z.lQ(a))
x=J.ad(v)
u=J.ad(w)
t=u.aL(w,J.bR(x.aL(v,w),0.1))
z.a=t
if(u.u(w,v)){t=J.bq(t,1)
z.a=t
u=t}else u=t
s=x.aL(v,u)
r=P.le(y.length,new Z.lR(z,this,a,s),!1,P.M)
q=new H.an(r,new Z.lS(C.a.bj(r,0,Z.hY())),[H.m(r,0),null]).bx(0,!1)
z=C.a.bj(q,0,Z.hY())
if(typeof z!=="number")return H.v(z)
u=q.length
x=u-1
if(x<0)return H.e(q,x)
z=J.al(q[x],1000-z)
if(x>=q.length)return H.e(q,x)
q[x]=z
p=S.ma(q,1000)
if(p>=y.length)return H.e(y,p)
return y[p]},
dX:function(a,b){var z,y,x,w,v,u,t
for(z=this.b,y=z.length,x=this.a.a,w=null,v=null,u=0;u<z.length;z.length===y||(0,H.ak)(z),++u){t=z[u]
if(C.a.Z(b,t))continue
if(w==null||J.a3(a.$1(x.i(0,t)),v)){v=a.$1(x.i(0,t))
w=t
continue}}return w},
i9:function(a){return this.dX(a,C.e)},
A:{
lI:function(a){var z,y,x
z=a.gc6()
y=H.x(z,"y",0)
x=P.T(new H.I(z,new Z.lJ(a),[y]),!1,y)
if(x.length===0)$.$get$by().eG("After removing actions scored by undefined, there are no recommendations.")
return x},
ur:[function(a,b){return J.al(a,b)},"$2","hY",4,0,42]}},lK:{"^":"a:0;",
$1:function(a){return a.gc1()}},lL:{"^":"a:0;",
$1:function(a){return J.ie(a.gbS())}},lM:{"^":"a:0;",
$1:function(a){return a.gcN()}},lN:{"^":"a:7;a,b",
$2:function(a,b){var z,y
z=this.b
y=this.a.a.a
return-J.bS(z.$1(y.i(0,a)),z.$1(y.i(0,b)))}},lO:{"^":"a:7;a,b",
$2:function(a,b){var z,y
z=this.b
y=this.a.a.a
return-J.bS(z.$1(y.i(0,a)),z.$1(y.i(0,b)))}},lP:{"^":"a:7;a",
$2:function(a,b){var z=this.a.$1(b)
return Math.min(H.d2(a),H.d2(z))}},lQ:{"^":"a:7;a",
$2:function(a,b){var z=this.a.$1(b)
return Math.max(H.d2(a),H.d2(z))}},lR:{"^":"a:9;a,b,c,d",
$1:function(a){var z,y
z=this.b
y=z.b
if(a>=y.length)return H.e(y,a)
return J.aX(J.bq(this.c.$1(z.a.a.i(0,y[a])),this.a.a),this.d)}},lS:{"^":"a:0;a",
$1:function(a){return J.im(J.bR(J.aX(a,this.a),1000))}},lJ:{"^":"a:0;a",
$1:function(a){return!this.a.i(0,a).gjQ()}}}],["","",,K,{"^":"",qw:{"^":"a:3;",
$3:function(a,b,c){}},c6:{"^":"d;a,h:b<,c,d,k_:e<,f,bA:r<",
gjp:function(){return this.a},
gv:function(a){return C.b.gv(this.b)},
u:function(a,b){if(b==null)return!1
return b instanceof K.c6&&b.b===this.b},
k:function(a){return"Room<"+this.b+">"},
k0:function(a){return this.e.$1(a)},
A:{
a_:function(a,b,c,d,e,f,g){var z=new S.L(null,null,[Q.w])
z.a9()
z.m(f)
return new K.c6(z.p(),a,b,c,d,e,g)}}}}],["","",,Q,{"^":"",w:{"^":"d;jk:a<,X:b<,b5:c<,jM:d<"}}],["","",,S,{"^":"",a0:{"^":"d;",
gaN:function(){return C.e},
gbg:function(){return C.e},
gfR:function(){return 3},
dB:function(a){return this.ay(this.gI(),a)},
fW:function(a,b){},
fX:function(a,b){},
di:function(a){},
cW:function(a){return!0}}}],["","",,S,{"^":"",
fl:function(a){var z=$.$get$bd().ac(3)
if(z<0||z>=3)return H.e(a,z)
return a[z]},
m9:function(a,b){var z,y,x,w,v
z=$.$get$bd().fU()*b
for(y=new H.dv(a,a.gl(a),0,null,[H.x(a,"aS",0)]),x=0,w=0;y.t();){v=y.d
if(typeof v!=="number")return H.v(v)
x+=v
if(x>=z)return w;++w}throw H.c(P.G("The weights do not add up to total="+b))},
ma:function(a,b){var z,y,x,w,v,u,t
z=$.$get$bd().ac(b)
for(y=a.length,x=0,w=0,v=0;u=a.length,v<u;u===y||(0,H.ak)(a),++v){t=a[v]
if(typeof t!=="number")return H.v(t)
x+=t
if(x>=z)return w;++w}throw H.c(P.G("The weights do not add up to total="+b))},
cL:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=C.b.b8(a,"{")
if(z!==-1&&z<a.length-1){y=H.r([],[P.u])
y.push(z)
w=z+1
v=a.length
u=null
t=1
while(!0){if(!(w<v)){x=null
break}if(w<0)return H.e(a,w)
s=a[w]
if(s==="{")++t
else if(s==="|"&&t===1)y.push(w)
else if(s==="}"){--t
if(t===0){y.push(w)
x=w
u=x
break}}r=w+1
u=w
w=r}q=y.length-1
if(q>1){p=$.$get$bd().ac(q)
o=C.b.az(a,0,z)
n=y.length
if(p<0||p>=n)return H.e(y,p)
m=y[p]
l=p+1
if(l>=n)return H.e(y,l)
l=o+S.cL(C.b.az(a,m+1,y[l]))
if(typeof x!=="number")return x.a4()
l+=C.b.az(a,x+1,v)
o=l.charCodeAt(0)==0?l:l
if(u===v-1)return o
else return S.cL(o)}else if(u===v-1)return a
else{if(typeof u!=="number")return u.a4()
v=u+1
return C.b.az(a,0,v)+S.cL(C.b.bB(a,v))}}else return a},
aF:function(a,b,c,d){switch($.$get$bd().ac(2)){case 0:a.$0()
break
case 1:b.$0()
break
case 2:c.$0()
break
case 4:d.$0()
break}},
mb:function(a){if(a<0||a>1)throw H.c(P.X(a,0,1,"Probability needs to be within <0,1>.",null))
if(a===0)return!1
if(a===1)return!0
return $.$get$bd().fU()<a}}],["","",,Y,{"^":"",a7:{"^":"d;aS:a<,aM:b<,aE:c<,fZ:d<,e,da:f@,h1:r<,fT:x<,eQ:y<,jo:z<,hB:Q<,cR:ch<,iN:cx<,fO:cy<,I:db<",
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
default:throw H.c(P.G("Invalid key "+H.b(b)+"."))}},
k:function(a){var z=this.a
z="Report<"+C.b.az(z,0,Math.min(z.length,20))+"...,thread="+H.b(this.cx)
return z+(this.cy?"(sup)":"")+">"}},a1:{"^":"d;a,I:b<,c",
gen:function(){return C.a.bP(this.a,new Y.ns())},
aZ:function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){var z,y
if(b==null||J.i(b,""))return
z=(J.aW(b).ek(b,".")||C.b.ek(b,"!")||C.b.ek(b,"?"))&&C.b.dJ(b,P.be("[A-Z]",!0,!1))?!0:p
y=this.b
this.a.push(new Y.a7(b,m,h,j,i,d,k,g,!1,e,l,z,c,f,y))},
q:function(a,b){return this.aZ(a,b,null,!1,!1,!1,!1,null,null,null,!1,!1,null,!1,null,!1)},
G:function(a,b,c){return this.aZ(a,b,null,!1,!1,!1,!1,null,null,null,!1,!1,null,!1,null,c)},
fo:function(a,b,c){return this.aZ(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,null,!1,null,!1)},
iV:function(a,b,c,d,e,f){return this.aZ(a,b,null,!1,!1,!1,!1,c,null,d,!1,!1,e,!1,null,f)},
iQ:function(a,b,c,d,e,f,g,h,i,j,k,l){return this.aZ(a,b,c,d,e,f,g,h,i,null,j,!1,k,l,null,!1)},
iS:function(a,b,c,d,e){return this.aZ(a,b,null,!1,!1,!1,c,null,null,null,!1,d,e,!1,null,!1)},
ee:function(a,b,c,d){return this.aZ(a,b,null,!1,!1,!1,!1,null,null,c,!1,!1,d,!1,null,!1)},
fp:function(a,b,c,d){return this.aZ(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,d,!1,null,!1)},
fq:function(a,b,c,d,e,f){return this.aZ(a,b,c,!1,!1,!1,!1,d,null,null,e,!1,f,!1,null,!1)},
iU:function(a,b,c,d,e,f){return this.aZ(a,b,c,!1,!1,d,!1,e,null,null,!1,!1,f,!1,null,!1)},
ee:function(a,b,c,d){return this.aZ(a,b,null,!1,!1,!1,!1,null,null,c,!1,!1,d,!1,null,!1)},
iT:function(a,b,c,d,e){return this.aZ(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,d,!1,null,e)},
iZ:function(a,b,c,d,e,f,g,h){var z,y,x,w,v,u,t
if(b.length===0)return
z=H.b(new Y.nq().$1(a))+" "
for(y=b.length,x=e-1,w=0,v=0,u=0;u<b.length;b.length===y||(0,H.ak)(b),++u){t=b[u]
if(w>0){if(w===1&&J.i(t,C.a.gE(b)))z=z+" "+d
else z=w===x?z+(", "+d):z+","
z+=" "}z+=H.b(this.bO(t.gh(),t.gh(),t,null,this.b));++w
if(w>x||J.i(t,C.a.gE(b))){z+="."
this.iV(0,z.charCodeAt(0)==0?z:z,f,g,h,!0);++v
z=H.o(a,"<also>","also")+" "
w=0}}},
iY:function(a,b,c,d){return this.iZ(a,b,c,"and",3,null,null,d)},
j0:function(){return this.G(0,"\n\n",!0)},
bO:function(a,b,c,d,e){var z,y,x
if(d!=null){z=J.K(a)
z=z.b8(a,"<owner's> "+H.b(b))!==-1||z.b8(a,"<ownerPronoun's> "+H.b(b))!==-1||z.b8(a,"<object-owner's> "+H.b(b))!==-1||z.b8(a,"<object-ownerPronoun's> "+H.b(b))!==-1}else z=!1
if(z)return a
if(c.gdh()!==!0){z=this.c
y=z.i(0,c.gj())
if((y==null?-1:y)<e)x=J.bT(a,b,"the "+H.b(b))
else{y=J.aW(a)
x=J.db(c.gh(),P.be("[aeiouy]",!1,!1))?y.ez(a,b,"an "+H.b(b)):y.ez(a,b,"a "+H.b(b))
z.n(0,c.gj(),e)}}else x=null
return x==null?a:x},
el:function(a,b){var z,y
if(!this.aG(a)||!this.aG(b))return!1
z=this.a
if(a<0||a>=z.length)return H.e(z,a)
if(z[a].gaM()!=null){if(b<0||b>=z.length)return H.e(z,b)
y=z[b].gaM()==null}else y=!0
if(y)return!1
if(a>=z.length)return H.e(z,a)
if(z[a].gaE()!=null){if(b<0||b>=z.length)return H.e(z,b)
y=z[b].gaE()==null}else y=!0
if(y)return!1
if(a>=z.length)return H.e(z,a)
y=z[a].gaM().gj()
if(b<0||b>=z.length)return H.e(z,b)
if(J.i(y,z[b].gaE().gj())){if(a>=z.length)return H.e(z,a)
y=z[a].gaE().gj()
if(b>=z.length)return H.e(z,b)
z=J.i(y,z[b].gaM().gj())}else z=!1
return z},
dA:function(a){var z=this
return P.aL(function(){var y=a
var x=0,w=2,v,u,t
return function $async$dA(b,c){if(b===1){v=c
x=w}while(true)switch(x){case 0:if(!z.aG(y)){x=1
break}u=z.a
if(y<0||y>=u.length)H.e(u,y)
t=u[y]
x=t.gaM()!=null?3:4
break
case 3:x=5
return t.gaM()
case 5:case 4:x=t.gaE()!=null?6:7
break
case 6:x=8
return t.gaE()
case 8:case 7:x=t.gfZ()!=null?9:10
break
case 9:x=11
return t.d
case 11:case 10:u=t.e
x=u!=null?12:13
break
case 12:x=14
return u
case 14:case 13:case 1:return P.aJ()
case 2:return P.aK(v)}}})},
aQ:[function(a){var z=J.ad(a)
if(z.aJ(a,0)||z.bI(a,this.a.length))return
else{z=this.a
if(a>>>0!==a||a>=z.length)return H.e(z,a)
return z[a].gaE()}},"$1","gaE",2,0,20],
k6:function(a,b){var z
if(!this.aG(a)||!this.aG(b))return!1
if(this.el(a,b)){z=this.a
if(a>=z.length)return H.e(z,a)
z[a].geQ()}return!1},
fY:function(a){var z
for(z=!1;this.gen();z=!0){a.$1(this.h2(!0))
this.ke()}return z},
h2:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
z=this.a
y=C.a.bj(z,[],new Y.nt())
C.a.ix(z,new Y.nu(y),!1)
x=a&&this.gen()?C.a.b8(z,C.a.de(z,new Y.nv()))+1:z.length
if(x<1)return""
for(w=-1,v=!0,u=!1,t=!1,s=0,r="";s<x;++s){q=s===0
if(!q){p=s-1
o=this.el(p,s)
if(s>=z.length)return H.e(z,s)
if(!z[s].gda())n=this.k6(s,p)&&this.hA(s,p)
else n=!0
if(n){if(p<0||p>=z.length)return H.e(z,p)
t=!z[p].gda()}else t=!1
if(s>=z.length)return H.e(z,s)
z[s].sda(t)
n=s-w
if(n<3)if(!u){if(s>=z.length)return H.e(z,s)
if(!z[s].ghB()){if(p<0||p>=z.length)return H.e(z,p)
if(!z[p].gjo()){if(s>=z.length)return H.e(z,s)
if(!z[s].gcR())if(this.d5(s,p)||o)if(!(t&&n>1)){if(t){if(p>=z.length)return H.e(z,p)
n=z[p].gda()}else n=!1
n=n||this.kv(s)>4}else n=!0
else n=!0
else n=!0}else n=!0}else n=!0
v=n}else v=!0
else v=!0
if(v){if(p<0||p>=z.length)return H.e(z,p)
if(z[p].gcR()){r+=" "
p=r}else{r+=". "
p=r}if(t){if(s>=z.length)return H.e(z,s)
n=!z[s].gcR()}else n=!1
r=n?r+"But ":p
u=!1}else if(t){r+=S.fl([" but "," but ",", but "])
u=!this.hn(s,s+1)&&!0}else{r+=S.fl([" and "," and ",", and "])
u=!0}}m=this.dL(s)
p=!v
if(p){n=s-1
if(this.d5(s,n))if(J.db(this.dL(n),"<subject> "))if(J.db(m,"<subject> "))m=H.er(m,"<subject> ","",0)}l=J.da(m,"<action>",this.dL(s))
n=s-1
k=this.iA(s,n)
if(k)k=!(this.aQ(s).gJ()===C.q&&this.am(s).gJ()===C.q)
else k=!1
if(k){k=this.aQ(s).gJ().b
l=H.o(l,"<object-owner's> <object>",k)
k=this.aQ(s).gJ().b
l=H.o(l,"<object-ownerPronoun's> <object>",k)
k=this.aQ(s).gJ().b
l=H.o(l,"<object>",k)
k=this.aQ(s).gJ().c
l=H.o(l,"<object's>",k)}k=this.d5(s,n)
if(k){k=this.am(s).gJ().a
l=H.o(l,"<owner's> <subject>",k)
k=this.am(s).gJ().a
l=H.o(l,"<ownerPronoun's> <subject>",k)
k=this.am(s).gJ().a
l=H.o(l,"<subject>",k)
k=this.am(s).gJ().c
l=H.o(l,"<subject's>",k)}if(this.aQ(n)!=null)if(this.am(s)!=null)if(this.am(n)!=null){k=this.aQ(n)
k=k==null?k:k.gj()
j=this.am(s)
if(J.i(k,j==null?j:j.gj())){k=this.am(n)
k=k==null?k:k.gJ()
j=this.am(s)
k=!J.i(k,j==null?j:j.gJ())}else k=!1}else k=!1
else k=!1
else k=!1
if(k){k=this.am(s).gJ().a
l=H.o(l,"<owner's> <subject>",k)
k=this.am(s).gJ().a
l=H.o(l,"<ownerPronoun's> <subject>",k)
k=this.am(s).gJ().a
l=H.o(l,"<subject>",k)
k=this.am(s).gJ().c
l=H.o(l,"<subject's>",k)}if(this.am(n)!=null)if(this.aQ(s)!=null){k=this.am(n)
k=k==null?k:k.gj()
j=this.aQ(s)
if(J.i(k,j==null?j:j.gj())){n=this.am(n)
n=n==null?n:n.gJ()
k=this.am(s)
n=!J.i(n,k==null?k:k.gJ())}else n=!1}else n=!1
else n=!1
if(n){n=this.aQ(s).gJ().a
l=H.o(l,"<object-owner's> <object>",n)
n=this.aQ(s).gJ().a
l=H.o(l,"<object-ownerPronoun's> <object>",n)
n=this.aQ(s).gJ().b
l=H.o(l,"<object>",n)
n=this.aQ(s).gJ().c
l=H.o(l,"<object's>",n)}if(s>=z.length)return H.e(z,s)
n=z[s]
i=n.gaM()
h=n.gaE()
g=n.gfZ()
f=n.e
e=S.cL(l)
if(C.b.Z(e,"{")||C.b.Z(e,"}"))$.$get$hS().dF('Storyline result includes { and/or } even after being parsed by Randomly. Is there a dangling bracket here? Input = """'+l+'""" Output = """'+e+'"""')
if(i!=null){if(i.gH()===!0){e=H.o(e,"<subject>","you")
e=H.o(e,"<subject's>","your")}if(i.gJ()===C.B||i.gJ()===C.Y){e=H.o(e,"<s>","")
e=H.o(e,"<es>","")
e=H.o(e,"<sses>","ss")
e=H.o(e,"<ies>","y")
e=H.o(e,"<does>","do")
e=H.o(e,"<is>","are")
e=H.o(e,"<has>","have")}else{e=H.o(e,"<s>","s")
e=H.o(e,"<es>","es")
e=H.o(e,"<sses>","sses")
e=H.o(e,"<ies>","ies")
e=H.o(e,"<does>","does")
e=H.o(e,"<is>","is")
e=H.o(e,"<has>","has")}e=H.er(e,"<subject>","<subjectNoun>",0)
k=i.gJ().a
e=H.o(e,"<subject>",k)
k=n.db
e=J.bT(this.bO(e,"<subjectNoun>",i,g,k),"<subjectNoun>",i.gh())
j=i.gJ().a
e=H.o(e,"<subjectPronoun>",j)
if(C.b.Z(l,P.be("<subject>.+<subject's>",!0,!1))){j=i.gJ().c
e=H.o(e,"<subject's>",j)}e=J.bT(this.bO(e,"<subject's>",i,g,k),"<subject's>",H.b(i.gh())+"'s")
k=i.gJ().c
e=H.o(e,"<subject's>",k)
k=i.gJ().c
e=H.o(e,"<subjectPronoun's>",k)
k=i.gJ().d
e=H.o(e,"<subjectPronounSelf>",k)}if(h!=null){if(h.gH()===!0){e=H.o(e,"<object>","you")
e=H.o(e,"<object's>","your")}else e=J.da(this.bO(e,"<object>",h,f,n.db),"<object>",h.gh())
k=h.gJ().b
e=H.o(e,"<objectPronoun>",k)
if(C.b.Z(l,P.be("<object>.+<object's>",!0,!1))){k=h.gJ().c
e=H.o(e,"<object's>",k)}e=J.bT(this.bO(e,"<object's>",h,f,n.db),"<object's>",H.b(h.gh())+"'s")
k=h.gJ().c
e=H.o(e,"<object's>",k)
k=h.gJ().c
e=H.o(e,"<objectPronoun's>",k)}n=n.db
l=this.fg(f,this.fg(g,e,l,"<owner>","<owner's>","<ownerPronoun>","<ownerPronoun's>",n),l,"<object-owner>","<object-owner's>","<object-ownerPronoun>","<object-ownerPronoun's>",n)
r+=(!p||q)&&!t?Y.nr(l):l
if(v)w=s
if(s>=z.length)return H.e(z,s)
if(z[s].gcR())u=!0}q=x-1
if(q>=z.length)return H.e(z,q)
z=!z[q].gcR()?r+".":r
return H.tY(z.charCodeAt(0)==0?z:z,$.$get$fF(),new Y.nw(),null)},
ca:function(){return this.h2(!1)},
ke:function(){var z,y
if(!this.gen()){C.a.sl(this.a,0)
return}z=this.a
y=C.a.b8(z,C.a.de(z,new Y.nx()))+1
P.c4(0,y,z.length,null,null,null)
z.splice(0,y-0)},
hn:function(a,b){var z,y
if(!this.aG(a)||!this.aG(b))return!1
if(this.el(a,b)){z=this.a
if(a>=z.length)return H.e(z,a)
z[a].geQ()}if(!this.d5(a,b))return!1
z=this.a
if(a>=z.length)return H.e(z,a)
if(z[a].gh1()){if(b>=z.length)return H.e(z,b)
y=z[b].gh1()}else y=!1
if(y)return!0
if(a>=z.length)return H.e(z,a)
if(z[a].gfT()){if(b>=z.length)return H.e(z,b)
z=z[b].gfT()}else z=!1
if(z)return!0
else return!1},
hA:function(a,b){var z,y,x,w,v
if(!this.aG(a)||!this.aG(b))return!1
for(z=new P.b2(this.dA(a).a(),null,null,null);z.t();){y=z.c
x=y==null?z.b:y.gF()
for(y=new P.b2(this.dA(b).a(),null,null,null);y.t();){w=y.c
v=w==null?y.b:w.gF()
if(J.i(x.gj(),v.gj()))return!0}}return!1},
dL:[function(a){var z=J.ad(a)
if(z.aJ(a,0)||z.bI(a,this.a.length))return
else{z=this.a
if(a>>>0!==a||a>=z.length)return H.e(z,a)
return z[a].gaS()}},"$1","gaS",2,0,11],
am:[function(a){var z=J.ad(a)
if(z.aJ(a,0)||z.bI(a,this.a.length))return
else{z=this.a
if(a>>>0!==a||a>=z.length)return H.e(z,a)
return z[a].gaM()}},"$1","gaM",2,0,20],
kv:function(a){var z,y,x
z=this.a
if(a>=z.length)return H.e(z,a)
if(z[a].gI()!=null){y=a-1
if(this.aG(y)){if(y<0||y>=z.length)return H.e(z,y)
y=z[y].gI()==null}else y=!0}else y=!0
if(y)return 1000
else{if(a>=z.length)return H.e(z,a)
y=z[a].gI()
x=a-1
if(x<0||x>=z.length)return H.e(z,x)
x=z[x].gI()
if(typeof y!=="number")return y.aL()
if(typeof x!=="number")return H.v(x)
return y-x}},
k:function(a){return this.ca()},
aG:function(a){if(a>=this.a.length||a<0)return!1
else return!0},
fg:function(a,b,c,d,e,f,g,h){var z
if(a!=null){z=a.gH()===!0?H.o(H.o(b,d,"you"),e,"your"):J.da(this.bO(b,d,a,null,h),d,a.gh())
z=H.o(z,f,a.gJ().a)
z=H.o(H.o(J.bT(this.bO(C.b.Z(c,P.be(d+".+"+e,!0,!1))?H.o(z,e,a.gJ().c):z,e,a,null,h),e,H.b(a.gh())+"'s"),e,a.gJ().c),g,a.gJ().c)}else z=H.o(H.o(H.o(H.o(b,d,""),e,""),f,""),g,"")
return z},
iA:function(a,b){var z,y
if(!this.aG(a)||!this.aG(b))return!1
z=this.a
if(a>=z.length)return H.e(z,a)
if(z[a].gaE()!=null){if(b<0||b>=z.length)return H.e(z,b)
y=z[b].gaE()==null}else y=!0
if(y)return!1
if(a>=z.length)return H.e(z,a)
y=z[a].gaE().gj()
if(b<0||b>=z.length)return H.e(z,b)
return J.i(y,z[b].gaE().gj())},
d5:function(a,b){var z,y
if(!this.aG(a)||!this.aG(b))return!1
z=this.a
if(a>=z.length)return H.e(z,a)
if(z[a].gaM()!=null){if(b<0||b>=z.length)return H.e(z,b)
y=z[b].gaM()==null}else y=!0
if(y)return!1
if(a>=z.length)return H.e(z,a)
y=z[a].gaM().gj()
if(b<0||b>=z.length)return H.e(z,b)
return J.i(y,z[b].gaM().gj())},
A:{
nr:function(a){var z,y,x
z=!C.b.Z(a,"\n\n")?C.b.kz(a):a
y=z.length
if(y===0)return z
if(0>=y)return H.e(z,0)
x=z[0].toUpperCase()
if(y===1)return x
else return x+C.b.bB(z,1)}}},ns:{"^":"a:0;",
$1:function(a){return J.i(a.gaS(),"\n\n")}},nq:{"^":"a:21;",
$1:function(a){return C.b.eF(H.o(H.o(a,"<also> ",""),"  "," "))}},nt:{"^":"a:41;",
$2:function(a,b){var z,y,x
z=J.K(a)
y=z.gak(a)?z.gE(a):null
if(y!=null&&y.gfO()&&J.i(b.giN(),y.cx)){x=z.gl(a)
if(typeof x!=="number")return x.aL()
z.n(a,x-1,b)}else z.q(a,b)
return a}},nu:{"^":"a:44;a",
$1:function(a){return J.ig(this.a,a)}},nv:{"^":"a:0;",
$1:function(a){return J.i(a.gaS(),"\n\n")}},nw:{"^":"a:45;",
$1:function(a){return H.b(a.i(0,1))+H.b(a.i(0,2))+H.b(a.i(0,3))}},nx:{"^":"a:0;",
$1:function(a){return J.i(a.gaS(),"\n\n")}},b8:{"^":"lp;dh:a<,h:b<,c,bo:d<,H:e<,J:f<",
gj:function(){return H.aw(this)},
gep:function(){return!0},
gbw:function(){return!0},
A:{
di:function(a,b,c,d,e){var z=H.r([],[P.q])
return new Y.b8(c,b,z,e==null?$.$get$bP():e,!1,d)}}},lp:{"^":"d+dj;"},dj:{"^":"d;",
gaO:function(){return this.gbw()&&this.gep()===!0},
ag:function(a,b,c,d,e,f,g,h,i,j,k){a.iQ(0,b,c,d,e,f,g,h,i,j,H.a5(this,"$isb8"),!1)},
b1:function(a,b,c){return this.ag(a,b,null,!1,!1,!1,!1,c,null,!1,!1)},
ap:function(a,b){return this.ag(a,b,null,!1,!1,!1,!1,null,null,!1,!1)},
kl:function(a,b,c,d){return this.ag(a,b,null,!1,c,!1,!1,null,null,d,!1)},
bd:function(a,b,c,d){return this.ag(a,b,null,!1,!1,!1,!1,c,null,d,!1)},
cb:function(a,b,c){return this.ag(a,b,null,!1,!1,!1,!1,null,null,c,!1)},
aF:function(a,b,c){return this.ag(a,b,null,c,!1,!1,!1,null,null,!1,!1)},
cK:function(a,b,c,d){return this.ag(a,b,null,c,!1,!1,!1,d,null,!1,!1)},
eA:function(a,b,c,d,e){return this.ag(a,b,c,!1,!1,!1,!1,d,null,e,!1)},
b0:function(a,b,c){return this.ag(a,b,null,!1,!1,!1,c,null,null,!1,!1)},
bH:function(a,b,c,d){return this.ag(a,b,null,!1,c,!1,d,null,null,!1,!1)},
dq:function(a,b,c,d){return this.ag(a,b,null,c,!1,!1,d,null,null,!1,!1)},
bH:function(a,b,c,d){return this.ag(a,b,null,!1,c,!1,d,null,null,!1,!1)},
h3:function(a,b,c,d){return this.ag(a,b,null,!1,!1,!1,c,d,null,!1,!1)},
h5:function(a,b,c,d,e){return this.ag(a,b,c,!1,!1,d,!1,e,null,!1,!1)},
kk:function(a,b,c,d){return this.ag(a,b,null,c,!1,!1,!1,null,null,d,!1)},
kj:function(a,b,c,d){return this.ag(a,b,c,!1,!1,d,!1,null,null,!1,!1)},
ko:function(a,b,c,d,e,f){return this.ag(a,b,c,d,!1,e,!1,f,null,!1,!1)},
km:function(a,b,c,d,e){return this.ag(a,b,c,d,!1,e,!1,null,null,!1,!1)},
h4:function(a,b,c,d){return this.ag(a,b,null,!1,!1,!1,!1,c,d,!1,!1)},
kn:function(a,b,c,d,e){return this.ag(a,b,null,!1,c,!1,!1,d,null,e,!1)},
kp:function(a,b,c,d,e,f){return this.ag(a,b,null,!1,c,!1,!1,d,e,f,!1)},
dq:function(a,b,c,d){return this.ag(a,b,null,c,!1,!1,d,null,null,!1,!1)}},c2:{"^":"d;a,b,c,d",
k:function(a){return this.a}}}],["","",,L,{"^":"",r_:{"^":"a:0;",
$1:function(a){a.gcu().b=2
return 2}},r5:{"^":"a:0;",
$1:function(a){a.gcu().b=0
return 0}},qZ:{"^":"a:0;",
$1:function(a){a.gcu().b=1
return 1}},fN:{"^":"d;"},oR:{"^":"fN;j:a<",
a_:function(a){var z=new L.bh(null,null)
z.m(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof L.fN))return!1
z=this.a
y=b.a
return z==null?y==null:z===y},
gv:function(a){return Y.R(Y.k(0,J.j(this.a)))},
k:function(a){return"Team {id="+J.h(this.a)+",\n}"},
A:{
dZ:function(a){var z=new L.bh(null,null)
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
z=new L.oR(y)
if(y==null)H.f(P.l("id"))}this.m(z)
return z}}}],["","",,X,{"^":"",
hx:function(a,b){return P.aL(function(){var z=a,y=b
var x=0,w=1,v,u,t,s,r,q
return function $async$hx(c,d){if(c===1){v=d
x=w}while(true)switch(x){case 0:u=z.a
t=new J.br(u,u.length,0,null,[H.m(u,0)])
u=y.a
s=new J.br(u,u.length,0,null,[H.m(u,0)])
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
break}case 4:return P.aJ()
case 1:return P.aK(v)}}})}}],["","",,A,{"^":"",a8:{"^":"d;iO:a<,bU:b<,c,d,e,f,I:r<,x",
gjb:function(){var z=this.f
return z.length!==0?C.a.gE(z):null},
gv:function(a){var z,y,x,w,v
z=X.bp(this.a)
y=X.bp(this.d)
x=X.bp(this.f)
w=this.r
v=this.c
v=X.d0(X.aU(X.aU(0,C.d.gv(w)),J.j(v)))
return X.d0(X.aU(X.aU(X.aU(X.aU(0,z&0x1FFFFFFF),y&0x1FFFFFFF),x&0x1FFFFFFF),v&0x1FFFFFFF))},
u:function(a,b){var z
if(b==null)return!1
z=J.n(b)
return!!z.$isa8&&this.gv(this)===z.gv(b)},
fm:function(a){var z,y
z=this.hm(a,!0)
y=z.gY(z)
if(y.t()){y.gF()
return!0}return!1},
iL:function(a){var z,y
z=this.hl(a)
y=z.gY(z)
if(y.t()){y.gF()
return!0}return!1},
iM:function(a){var z=this.x
if(z==null)return!1
return C.b.Z(z.gh(),a)},
fC:function(a){var z,y,x
z=this.d1(a)
if(z==null)throw H.c(new P.E("Tried to elapseSituationTime of situation id="+H.b(a)+" that doesn't exist in situations ("+H.b(this.f)+")."))
y=this.f
if(z!==(z|0)||z>=y.length)return H.e(y,z)
x=y[z].as()
if(z!==(z|0)||z>=y.length)return H.e(y,z)
y[z]=x},
as:function(){++this.r},
dz:function(a,b,c,d,e){var z=this.d
if(a!=null)z=z.dM(0,new A.op(a))
if(b!=null)z=z.bZ(0,new A.oq(b))
if(c!=null)z=z.bZ(0,new A.or(c))
if(e!=null)z=z.bZ(0,new A.os(e))
return d!=null?z.bZ(0,new A.ot(d)):z},
hm:function(a,b){return this.dz(a,null,null,null,b)},
hl:function(a){return this.dz(a,null,null,null,null)},
a8:function(a){return this.a.aK(0,new A.ou(a))},
dD:function(a){return this.e.aK(0,new A.ov(a))},
eI:function(a){var z,y
z=this.d1(a)
if(z==null)return
y=this.f
if(z!==(z|0)||z>=y.length)return H.e(y,z)
return y[z]},
aj:function(a){var z,y
for(z=this.f,y=z.length-1;y>=0;--y){if(y>=z.length)return H.e(z,y)
if(J.i(z[y].gh(),a)){if(y>=z.length)return H.e(z,y)
return z[y]}}throw H.c(P.G("No situation with name="+a+" found."))},
jB:function(a){var z=this.a.b7(0,new A.ow(a),new A.ox())
if(z==null)return!1
return z.gbw()},
bb:function(){var z,y
z=this.f
y=C.a.gE(z)
y.di(this)
C.a.a7(z,y)},
bV:function(a){var z,y
z=this.f
while(!0){if(!(z.length!==0&&!J.i(C.a.gE(z).gh(),a)))break
y=C.a.gE(z)
y.di(this)
C.a.a7(z,y)}if(z.length===0)throw H.c(P.G("Tried to pop situations until "+a+" but none was found in stack."))},
cJ:function(a,b){var z,y
z=this.d1(a)
if(z==null)throw H.c(P.G("Situation with id "+H.b(a)+" does not exist in "+H.b(this.f)))
y=this.f
if(z!==(z|0)||z>=y.length)return H.e(y,z)
y[z]=b},
dr:function(a,b,c,d,e){var z,y,x,w
z=this.dz(a,b,c,d,e)
y=z.gY(z)
if(y.t()){x=y.gF()
y=this.r
w=x.gI()
if(typeof w!=="number")return H.v(w)
return y-w}return},
ku:function(a,b,c){return this.dr(null,a,b,c,null)},
cc:function(a,b,c){return this.dr(a,null,b,null,c)},
kt:function(a,b,c){return this.dr(a,b,null,null,c)},
ks:function(a){return this.dr(a,null,null,null,null)},
k:function(a){var z,y
z=this.a
y=z.e3()
y.ar(0,z)
return"World<"+P.bY(y,"{","}")+">"},
a5:function(a,b){var z,y,x
z=this.a8(a)
y=z.a_(b)
x=this.a
x.a7(0,z)
x.q(0,y)},
d1:function(a){var z,y,x
y=this.f
x=0
while(!0){if(!(x<y.length)){z=null
break}if(J.i(y[x].gj(),a)){z=x
break}++x}return z},
hN:function(a){this.a.ar(0,a.a)
this.d.ar(0,a.d)
this.b.ar(0,a.b)
this.e.ar(0,a.e)
C.a.ar(this.f,a.f)
this.r=a.r},
A:{
dX:function(a){var z,y,x,w
z=P.W(null,null,null,R.F)
y=P.b1(null,O.cm)
x=P.W(null,null,null,U.am)
w=P.W(null,null,null,null)
w=new A.a8(z,x,a.c,y,w,[],null,null)
w.hN(a)
return w}}},op:{"^":"a:0;a",
$1:function(a){return a.gfn()===this.a}},oq:{"^":"a:0;a",
$1:function(a){return J.i(a.gdm(),this.a.gj())}},or:{"^":"a:0;a",
$1:function(a){return a.geR().Z(0,this.a.x)}},os:{"^":"a:0;a",
$1:function(a){return a.ghh()===this.a}},ot:{"^":"a:0;a",
$1:function(a){return a.ghf()===this.a}},ou:{"^":"a:0;a",
$1:function(a){return J.i(a.gj(),this.a)}},ov:{"^":"a:0;a",
$1:function(a){return J.i(a.gh(),this.a)}},ow:{"^":"a:0;a",
$1:function(a){return J.i(a.gj(),this.a)}},ox:{"^":"a:1;",
$0:function(){return}}}],["","",,A,{"^":"",aG:{"^":"a6;a3:b<"},bB:{"^":"aG;c,X:d<,S:e<,h:f<,b,a",
V:[function(a,b,c){throw H.c(new P.E("SimpleAction always succeeds"))},"$3","gP",6,0,2],
W:[function(a,b,c){return this.c.$4(a,b,c,this)},"$3","gR",6,0,2],
ai:function(a,b){throw H.c(new P.E("SimpleAction shouldn't have to provide roll reason"))},
N:function(a,b){return 1},
gT:function(){return!1},
M:function(a,b){return!0},
gO:function(){return H.f(new P.E("Not rerollable"))},
gU:function(){return!1}}}],["","",,N,{"^":"",jk:{"^":"H;T:c<,a3:d<,S:e<,U:f<,O:r<,b,a",
gah:function(){return"confuse <object>"},
gh:function(){return"Confuse"},
gal:function(){return"will <subject> confuse <object>?"},
V:[function(a,b,c){var z
a.ap(c,"<subject> touch<es> <subject's> temple")
z=this.b
a.b1(c,"<subject> tr<ies> to {channel|implant} {terror|confusion} into <object's> mind",z)
a.dq(c,"<subject> fail<s>",!0,!0)
return H.b(a.gh())+" fails to confuse "+H.b(z.gh())},"$3","gP",6,0,2],
W:[function(a,b,c){var z
a.ap(c,"<subject> touch<es> <subject's> temple")
z=this.b
a.bd(c,"<subject> {channel<s>|implant<s>} {terror|confusion} into <object's> mind",z,!0)
z.b0(c,"<subject's> eyes go wide with terror",!0)
return H.b(a.gh())+" confuses "+H.b(z.gh())},"$3","gR",6,0,2],
N:function(a,b){return 0.6},
M:function(a,b){var z
if(a.gH()===!0)if(a.gab()){z=b.a
z=new H.I(z,new N.jl(this),[H.m(z,0)])
z=z.gl(z)>=2&&!this.b.er(b)}else z=!1
else z=!1
return z},
A:{
u8:[function(a){return new N.jk(!0,!0,"Channeling the terror of the Dead Prince into lesser minds is something you've been practicing. It makes the target rabid and disoriented. They might attack their own.",!0,C.c,a,null)},"$1","rq",2,0,5]}},jl:{"^":"a:0;a",
$1:function(a){var z,y
if(a.gbw()){z=a.gbo()
y=this.a.b.gbo()
z=z.a
y=y.gj()
y=z==null?y==null:z===y
z=y}else z=!1
return z}}}],["","",,V,{"^":"",jH:{"^":"H;U:c<,O:d<,T:e<,a3:f<,S:r<,b,a",
gah:function(){return"kick <object's> weapon off"},
gh:function(){return"DisarmKick"},
gal:function(){return"will <subject> kick the weapon off?"},
V:[function(a,b,c){S.aF(new V.jI(this,a,c),new V.jJ(this,a,c),null,null)
return H.b(a.gh())+" fails to kick "+H.b(this.b.gh())+"'s weapon off"},"$3","gP",6,0,2],
W:[function(a,b,c){var z,y
S.aF(new V.jK(this,a,c),new V.jL(this,a,c),null,null)
z=b.f
y=z.length!==0?C.a.gE(z):null
b.cJ(y.gj(),y.a_(new V.jM(this)))
z=this.b
b.a5(z.gj(),new V.jN())
return H.b(a.gh())+" kicks "+H.b(z.gh())+"'s weapon off"},"$3","gR",6,0,2],
N:function(a,b){var z=a.gab()?0:0.2
if(a.Q===!0)return 0.7-z
return 0.5-z},
M:function(a,b){var z
if(a.gab()||a.dx===C.i){z=this.b
z=z.gaf()&&!z.gbk()}else z=!1
return z},
A:{
uc:[function(a){return new V.jH(!0,C.c,!0,!0,"When enemies are on the ground, you can try to kick their weapon off to disarm them.",a,null)},"$1","rw",2,0,5]}},jI:{"^":"a:1;a,b,c",
$0:function(){var z,y
z=this.b
y=this.c
z.b1(y,"<subject> kick<s> {at|towards} <object's> weapon",this.a.b)
z.aF(y,"<subject> mi<sses>",!0)}},jJ:{"^":"a:1;a,b,c",
$0:function(){var z,y
z=this.c
y=this.a.b
this.b.b1(z,"<subject> kick<s> <object's> weapon",y)
y.aF(z,"<subject> hold<s> onto it",!0)}},jK:{"^":"a:1;a,b,c",
$0:function(){var z=this.a.b
this.b.kp(this.c,"<subject> kick<s> <object-owner's> <object> off <object-owner's> hand",!0,z.ga2(),z,!0)}},jL:{"^":"a:1;a,b,c",
$0:function(){var z,y
z=this.c
y=this.a.b
this.b.bd(z,"<subject> kick<s> <object's> {right|} hand",y,!0)
z.ee(0,"<owner's> <subject> fl<ies> away",y,y.ga2())}},jM:{"^":"a:22;a",
$1:function(a){a.gbE().q(0,this.a.b.ga2())
return a}},jN:{"^":"a:0;",
$1:function(a){a.sa2($.$get$eg())
return a}}}],["","",,R,{"^":"",l1:{"^":"H;U:c<,O:d<,T:e<,a3:f<,S:r<,b,a",
gh:function(){return"KickToGround"},
gah:function(){return"kick <object> to the ground"},
gal:function(){return"will <subject> kick <object> prone?"},
V:[function(a,b,c){S.aF(new R.l2(this,a,c),new R.l3(this,a,c),null,null)
return H.b(a.gh())+" fails to sweep "+H.b(this.b.gh())+" off feet"},"$3","gP",6,0,2],
W:[function(a,b,c){var z
S.aF(new R.l4(this,a,c),new R.l5(this,a,c,b.aj("FightSituation").gbA()),null,null)
z=this.b
b.a5(z.gj(),new R.l6())
return H.b(a.gh())+" sweeps "+H.b(z.gh())+" off feet"},"$3","gR",6,0,2],
N:function(a,b){var z=a.gab()?0:0.2
if(a.Q===!0)return 0.7-z
return 0.5-z},
M:function(a,b){return(a.gab()||a.dx===C.i)&&!this.b.gaf()},
A:{
um:[function(a){return new R.l1(!0,C.c,!0,!0,"Sweeping opponents off their feet doesn't deal much damage but on the ground they will be much easier targets for you and your allies.",a,null)},"$1","rT",2,0,5]}},l2:{"^":"a:1;a,b,c",
$0:function(){var z,y
z=this.b
y=this.c
z.b1(y,"<subject> kick<s> {at|towards} <object's> feet",this.a.b)
z.aF(y,"<subject> mi<sses>",!0)}},l3:{"^":"a:1;a,b,c",
$0:function(){var z,y
z=this.c
y=this.a.b
this.b.b1(z,"<subject> kick<s> <object's> shin",y)
y.aF(z,"<subject> <does>n't budge",!0)}},l4:{"^":"a:1;a,b,c",
$0:function(){this.b.kn(this.c,"<subject> kick<s> <object> off <object's> feet and to the ground",!0,this.a.b,!0)}},l5:{"^":"a:1;a,b,c,d",
$0:function(){var z,y
z=this.c
y=this.a.b
this.b.bd(z,"<subject> kick<s> <object's> {right|left} shin",y,!0)
y.ap(z,"<subject> {grunt|shriek}<s>")
y.b0(z,"<subject> fall<s> to the "+H.b(this.d),!0)}},l6:{"^":"a:0;",
$1:function(a){a.sao(C.m)
return a}}}],["","",,F,{"^":"",lG:{"^":"a6;S:b<,T:c<,a3:d<,U:e<,O:f<,a",
gX:function(){return"Stand off."},
gh:function(){return"Pass"},
V:[function(a,b,c){throw H.c(new P.ab(null))},"$3","gP",6,0,2],
W:[function(a,b,c){if(a.gH()===!0)a.ap(c,"<subject> stand<s> off")
return H.b(a.gh())+" passes the opportunity"},"$3","gR",6,0,2],
ai:function(a,b){return"WARNING this shouldn't be user-visible"},
N:function(a,b){return 1},
M:function(a,b){return!0}}}],["","",,Y,{"^":"",lU:{"^":"H;U:c<,O:d<,T:e<,a3:f<,S:r<,b,a",
gah:function(){return"force <object> off balance"},
gh:function(){return"Pound"},
gal:function(){return"will <subject> force <object> off balance?"},
V:[function(a,b,c){var z=this.b
a.h4(c,"<subject> {fiercely|violently} {pound<s>|strike<s>|hammer<s>|batter<s>} on <object-owner's> {<object>|weapon}",z.ga2(),z)
z.cb(c,"<subject> {retain<s>|keep<s>} <subject's> {|combat} {stance|footing}",!0)
return H.b(a.gh())+" kicks "+H.b(z.cy)+" off balance"},"$3","gP",6,0,2],
W:[function(a,b,c){var z=this.b
a.h4(c,"<subject> {fiercely|violently} {pound<s>|strike<s>|hammer<s>|batter<s>} on <object-owner's> {<object>|weapon}",z.ga2(),z)
if(z.gab()){z.h3(c,"<subject> lose<s> <object>",!0,$.$get$ee())
b.a5(z.x,new Y.lV())
C.a.q(b.f,U.lq(z,a))
return H.b(a.gh())+" pounds "+H.b(z.cy)+" off balance"}else if(z.gb9()){z.ap(c,"<subject> <is> already off balance")
c.fp(0,"<subject> make<s> <object> fall to the "+H.b(b.aj("FightSituation").gbA()),z,$.$get$i_())
b.a5(z.x,new Y.lW())
return H.b(a.gh())+" pounds "+H.b(z.cy)+" to the ground"}throw H.c(new P.E("enemy pose must be either standing or off-balance"))},"$3","gR",6,0,2],
N:function(a,b){var z=a.gab()?0:0.2
if(a.Q===!0)return 0.7-z
return 0.5-z},
M:function(a,b){var z
if(!a.gaf())if(C.a.Z(a.d.gdu(),C.f)){z=this.b
z=z.aH(C.f)&&!z.gaf()}else z=!1
else z=!1
return z},
A:{
us:[function(a){return new Y.lU(!0,C.c,!0,!0,"Forcing enemies off balance often means hitting them heavily several times in a row. The goal is not to deal damage but to force the opponent to lose control of their combat stance. It can also give members of your party an opportunity to strike.",a,null)},"$1","rZ",2,0,5]}},lV:{"^":"a:0;",
$1:function(a){a.sao(C.i)
return a}},lW:{"^":"a:0;",
$1:function(a){a.sao(C.m)
return a}}}],["","",,B,{"^":"",mi:{"^":"a6;S:b<,T:c<,a3:d<,U:e<,O:f<,a",
gX:function(){return"Regain balance."},
gh:function(){return"RegainBalance"},
V:[function(a,b,c){throw H.c(new P.ab(null))},"$3","gP",6,0,2],
W:[function(a,b,c){if(a.gH()===!0)a.bd(c,"<subject> regain<s> <object>",$.$get$ee(),!0)
b.a5(a.gj(),new B.mj())
return H.b(a.gh())+" regains balance"},"$3","gR",6,0,2],
ai:function(a,b){return"Will "+a.gJ().a+" regain balance?"},
N:function(a,b){return 1},
M:function(a,b){return a.gb9()}},mj:{"^":"a:0;",
$1:function(a){a.sao(C.l)
return C.l}}}],["","",,O,{"^":"",mx:{"^":"a6;S:b<,T:c<,a3:d<,U:e<,O:f<,a",
gX:function(){return"Scramble."},
gh:function(){return"Scramble"},
V:[function(a,b,c){throw H.c(new P.ab(null))},"$3","gP",6,0,2],
W:[function(a,b,c){a.ap(c,"<subject> tr<ies> to {scramble|crawl} out of {reach|harm's way}")
return H.b(a.gh())+" scrambles on ground"},"$3","gR",6,0,2],
ai:function(a,b){return"Will "+a.gJ().a+" crawl out of harm's way?"},
N:function(a,b){return 1},
M:function(a,b){if(!a.gaf())return!1
if(Q.i0(a,b))return!0
return!1}}}],["","",,Q,{"^":"",
i0:function(a,b){var z,y,x
z=b.cc("KickToGround",a,!0)
if(z!=null&&z<=2)return!0
y=b.cc("Pound",a,!0)
if(y!=null&&y<=2)return!0
x=b.cc("FinishPunch",a,!0)
if(x!=null&&x<=2)return!0
return!1},
nh:{"^":"a6;S:b<,T:c<,a3:d<,U:e<,O:f<,a",
gX:function(){return"Stand up."},
gh:function(){return"StandUp"},
V:[function(a,b,c){throw H.c(new P.ab(null))},"$3","gP",6,0,2],
W:[function(a,b,c){a.ap(c,"<subject> stand<s> up")
b.a5(a.gj(),new Q.ni())
return H.b(a.gh())+" stands up"},"$3","gR",6,0,2],
ai:function(a,b){return"Will "+a.gJ().a+" stand up?"},
N:function(a,b){return 1},
M:function(a,b){if(!a.gaf())return!1
if(Q.i0(a,b))return!1
return!0}},
ni:{"^":"a:0;",
$1:function(a){a.sao(C.l)
return C.l}}}],["","",,T,{"^":"",
uN:[function(a){return new A.aH(T.en(),null,null,new T.t6(),new T.t7(),new T.t8(),null,!0,"This move is hard, but when succesful, it's decisive.",!0,!0,"StartBreakNeckOnGround",!1,null,"break <object's> neck",null,a,null)},"$1","tN",2,0,5],
uO:[function(a){return new A.aH(T.en(),new T.t9(),T.en(),new T.ta(),new T.tb(),new T.tc(),new T.td(),!0,"This move is hard, but when succesful, it's decisive.",!0,!0,"StartBreakNeckOnGroundPlayer",!0,C.c,"break <object's> neck","will <subject> succeed?",a,null)},"$1","tO",2,0,5],
uP:[function(a,b,c,d,e){a.b1(c,"<subject> throw<s> <subjectPronounSelf> {on|upon} <object>",d)
b.a5(a.gj(),new T.te())},"$5","en",10,0,10],
t6:{"^":"a:3;",
$3:function(a,b,c){return a.gH()!==!0&&c.gaf()&&a.gbk()&&c.gbk()}},
t7:{"^":"a:3;",
$3:function(a,b,c){return Y.eF(a,c)}},
t8:{"^":"a:3;",
$3:function(a,b,c){return S.dE(a,c,C.p)}},
ta:{"^":"a:3;",
$3:function(a,b,c){return a.gH()===!0&&c.gaf()&&a.gbk()&&c.gbk()}},
tb:{"^":"a:3;",
$3:function(a,b,c){return Y.eF(a,c)}},
tc:{"^":"a:3;",
$3:function(a,b,c){return S.dE(a,c,C.o)}},
t9:{"^":"a:3;",
$3:function(a,b,c){return 0.7}},
td:{"^":"a:3;",
$3:function(a,b,c){return S.dE(a,c,C.j)}},
te:{"^":"a:0;",
$1:function(a){a.sao(C.m)
return a}}}],["","",,A,{"^":"",aH:{"^":"H;c,d,e,f,r,x,y,z,S:Q<,T:ch<,a3:cx<,h:cy<,U:db<,O:dx<,ah:dy<,al:fr<,b,a",
V:[function(a,b,c){var z,y,x,w
z=this.b
y=this.e
if(this.z){x=this.r.$3(a,b,z)
w=this.y.$3(a,b,z)
y.$5(a,b,c,z,x)
y=b.f
C.a.q(y,x)
C.a.q(y,w)}else y.$5(a,b,c,z,null)
return H.b(a.gh())+" fails to start a "+this.cy+" (defensible situation) at "+H.b(z.gh())},"$3","gP",6,0,2],
W:[function(a,b,c){var z,y,x,w
z=this.b
y=this.r.$3(a,b,z)
x=this.x.$3(a,b,z)
this.c.$5(a,b,c,z,y)
w=b.f
C.a.q(w,y)
C.a.q(w,x)
return H.b(a.gh())+" starts a "+this.cy+" (defensible situation) at "+H.b(z.gh())},"$3","gR",6,0,2],
N:function(a,b){var z=this.d
if(z!=null)return z.$3(a,b,this.b)
return 1},
M:function(a,b){return this.f.$3(a,b,this.b)}}}],["","",,U,{"^":"",
uQ:[function(a){return new A.aH(U.eo(),null,null,new U.tf(),new U.tg(),new U.th(),null,!0,"Punching someone hard enough can cause them to lose their footing. And it hurts.",!0,!0,"StartPunch",!1,null,"punch <object>",null,a,null)},"$1","tP",2,0,5],
uR:[function(a){return new A.aH(U.eo(),new U.ti(),U.eo(),new U.tj(),new U.tk(),new U.tl(),new U.tm(),!0,"Punching someone hard enough can cause them to lose their footing. And it hurts.",!0,!0,"StartPunchPlayer",!0,C.c,"punch <object>","will <subject> hit <objectPronoun>?",a,null)},"$1","tQ",2,0,5],
uS:[function(a,b,c,d,e){c.iU(0,"<subject> {thrust<s>|swing<s>} <subject's> fist at <object>",e.gj(),!0,d,a)},"$5","eo",10,0,10],
tf:{"^":"a:3;",
$3:function(a,b,c){var z
if(a.gH()!==!0)z=(a.gab()||a.dx===C.i)&&!c.gaf()&&a.gbk()
else z=!1
return z}},
tg:{"^":"a:3;",
$3:function(a,b,c){return M.fk(a,c)}},
th:{"^":"a:3;",
$3:function(a,b,c){return Z.dL(a,c,C.p)}},
tj:{"^":"a:3;",
$3:function(a,b,c){var z
if(a.gH()===!0)z=(a.gab()||a.dx===C.i)&&!c.gaf()&&a.gbk()
else z=!1
return z}},
tk:{"^":"a:3;",
$3:function(a,b,c){return M.fk(a,c)}},
tl:{"^":"a:3;",
$3:function(a,b,c){return Z.dL(a,c,C.o)}},
ti:{"^":"a:3;",
$3:function(a,b,c){return 0.7}},
tm:{"^":"a:3;",
$3:function(a,b,c){return Z.dL(a,c,C.j)}}}],["","",,G,{"^":"",
uT:[function(a){return new A.aH(G.ep(),null,null,new G.tp(),new G.tq(),new G.tr(),null,!0,"The basic swordfighting move is also often the most effective.",!0,!0,"StartSlash",!1,null,"swing at <object>",null,a,null)},"$1","tR",2,0,5],
uY:[function(a){return new A.aH(G.ep(),new G.tA(),G.ep(),new G.tB(),new G.tC(),new G.tD(),new G.tE(),!0,"The basic swordfighting move is also often the most effective.",!0,!0,"StartSlashPlayer",!0,C.c,"swing at <object>","will <subject> hit <objectPronoun>?",a,null)},"$1","tS",2,0,5],
uZ:[function(a,b,c,d,e){return a.h5(c,"<subject> swing<s> {<subject's> "+H.b(a.ga2().gh())+" |}at <object>",e.gj(),!0,d)},"$5","ep",10,0,10],
tp:{"^":"a:3;",
$3:function(a,b,c){return a.gH()!==!0&&a.gab()&&!c.gaf()&&a.aH(C.f)}},
tq:{"^":"a:3;",
$3:function(a,b,c){return M.bC(a,c)}},
tr:{"^":"a:3;",
$3:function(a,b,c){return L.bg(a,c,C.p)}},
tB:{"^":"a:3;",
$3:function(a,b,c){return a.gH()===!0&&a.gab()&&!c.gaf()&&a.aH(C.f)}},
tC:{"^":"a:3;",
$3:function(a,b,c){return M.bC(a,c)}},
tD:{"^":"a:3;",
$3:function(a,b,c){return L.bg(a,c,C.o)}},
tA:{"^":"a:3;",
$3:function(a,b,c){return 0.7}},
tE:{"^":"a:3;",
$3:function(a,b,c){return L.bg(a,c,C.j)}}}],["","",,R,{"^":"",
uU:[function(a,b,c,d,e){return a.h3(c,"<subject> completely miss<es> <object> with <subject's> "+H.b(a.ga2().gh()),!0,d)},"$5","i3",10,0,26],
uV:[function(a){return new A.aH(R.i4(),new R.ts(),R.i3(),new R.tt(),new R.tu(),new R.tv(),null,!1,"It's always better to fight with your feet firmly on the ground. But sometimes, it's necessary to act quickly.",!0,!0,"StartSlashOutOfBalance",!1,null,"swing at <object> (while out of balance)",null,a,null)},"$1","tT",2,0,5],
uW:[function(a){return new A.aH(R.i4(),new R.tw(),R.i3(),new R.tx(),new R.ty(),new R.tz(),null,!1,"It's always better to fight with your feet firmly on the ground. But sometimes, it's necessary to act quickly.",!0,!0,"StartSlashOutOfBalancePlayer",!1,null,"swing at <object> (while out of balance)",null,a,null)},"$1","tU",2,0,5],
uX:[function(a,b,c,d,e){return a.h5(c,"<subject> swing<s> {<subject's> "+H.b(a.ga2().gh())+" |}at <object>",e.gj(),!0,d)},"$5","i4",10,0,10],
tt:{"^":"a:3;",
$3:function(a,b,c){return a.gH()!==!0&&a.gb9()&&!c.gaf()&&a.aH(C.f)}},
tu:{"^":"a:3;",
$3:function(a,b,c){return M.bC(a,c)}},
tv:{"^":"a:3;",
$3:function(a,b,c){return L.bg(a,c,C.p)}},
ts:{"^":"a:3;",
$3:function(a,b,c){return 0.7}},
tx:{"^":"a:3;",
$3:function(a,b,c){return a.gH()===!0&&a.gb9()&&!c.gaf()&&a.aH(C.f)}},
ty:{"^":"a:3;",
$3:function(a,b,c){return M.bC(a,c)}},
tz:{"^":"a:3;",
$3:function(a,b,c){return L.bg(a,c,C.o)}},
tw:{"^":"a:3;",
$3:function(a,b,c){return 0.7}}}],["","",,D,{"^":"",
v_:[function(a){return new A.aH(D.eq(),null,null,new D.tF(),new D.tG(),new D.tH(),null,!0,"Opponents on the ground are often the most vulnerable.",!0,!0,"StartStrikeDown",!1,null,"strike down at <object>",null,a,null)},"$1","tV",2,0,5],
v0:[function(a){return new A.aH(D.eq(),new D.tI(),D.eq(),new D.tJ(),new D.tK(),new D.tL(),new D.tM(),!0,"Opponents on the ground are often the most vulnerable.",!0,!0,"StartStrikeDownPlayer",!0,C.c,"strike down at <object>","will <subject> hit?",a,null)},"$1","tW",2,0,5],
v1:[function(a,b,c,d,e){return a.b1(c,"<subject> strike<s> down {with <subject's> "+H.b(a.ga2().gh())+" |}at <object>",d)},"$5","eq",10,0,26],
tF:{"^":"a:3;",
$3:function(a,b,c){return a.gH()!==!0&&c.gaf()&&!a.gaf()&&a.aH(C.f)}},
tG:{"^":"a:3;",
$3:function(a,b,c){return D.fH(a,c)}},
tH:{"^":"a:3;",
$3:function(a,b,c){return V.dC(a,c,C.p)}},
tJ:{"^":"a:3;",
$3:function(a,b,c){return a.gH()===!0&&c.gaf()&&!a.gaf()&&a.aH(C.f)}},
tK:{"^":"a:3;",
$3:function(a,b,c){return D.fH(a,c)}},
tL:{"^":"a:3;",
$3:function(a,b,c){return V.dC(a,c,C.o)}},
tI:{"^":"a:3;",
$3:function(a,b,c){return 0.7}},
tM:{"^":"a:3;",
$3:function(a,b,c){return V.dC(a,c,C.j)}}}],["","",,Y,{"^":"",nU:{"^":"cC;a3:c<,b,a",
gS:function(){return"A different weapon might change the battle."},
gT:function(){return!1},
gh:function(){return"TakeDroppedItem"},
gU:function(){return!1},
gO:function(){return},
V:[function(a,b,c){throw H.c(new P.ab(null))},"$3","gP",6,0,2],
W:[function(a,b,c){var z,y
z=b.f
y=z.length!==0?C.a.gE(z):null
b.cJ(y.gj(),y.a_(new Y.nV(this)))
b.a5(a.gj(),new Y.nW(this,a))
z=this.b
a.b1(c,"<subject> pick<s> <object> up",z)
return H.b(a.gh())+" picks up "+H.b(z.gh())},"$3","gR",6,0,2],
ai:function(a,b){return H.f(new P.ab(null))},
N:function(a,b){return 1},
M:function(a,b){var z
a.gj4()
z=b.cc("DisarmKick",a,!0)
if(z!=null&&z<=2)return!1
return!0},
A:{
uw:[function(a){return new Y.nU(!0,a,null)},"$1","u_",2,0,46]}},nV:{"^":"a:22;a",
$1:function(a){a.gbE().a7(0,this.a.b)
return a}},nW:{"^":"a:0;a,b",
$1:function(a){if(!this.b.gbk())a.gbU().q(0,a.ga2())
a.sa2(this.a.b)
return a}}}],["","",,M,{"^":"",on:{"^":"a6;S:b<,U:c<,O:d<,T:e<,a3:f<,a",
gX:function(){return"Regain clarity."},
gh:function(){return"Unconfuse"},
V:[function(a,b,c){throw H.c(new P.ab(null))},"$3","gP",6,0,2],
W:[function(a,b,c){a.ap(c,"<subject> shake<s> <subject's> head violently")
if(a.gH()===!0)c.q(0,"the {horrible|terrible} spell seems to recede")
a.kl(c,"<subject's> eyes regain focus and clarity",!0,!0)
return H.b(a.gh())+" regains clarity"},"$3","gR",6,0,2],
ai:function(a,b){return"WARNING this shouldn't be user-visible"},
N:function(a,b){return 1},
M:function(a,b){var z
if(a.er(b)){z=b.cc("Confuse",a,!0)
if(typeof z!=="number")return z.br()
z=z>4}else z=!1
return z}}}],["","",,R,{"^":"",kw:{"^":"H;S:c<,T:d<,a3:e<,U:f<,O:r<,b,a",
gh:function(){return"FinishBreakNeck"},
gah:function(){return""},
gal:function(){return"(WARNING should not be user-visible)"},
V:[function(a,b,c){throw H.c(new P.ab(null))},"$3","gP",6,0,2],
W:[function(a,b,c){var z=this.b
b.a5(z.gj(),new R.kx())
a.bd(c,"<subject> break<s> <object's> neck",z,!0)
X.d7(c,b,z)
return H.b(a.gh())+" breaks "+H.b(z.gh())+"'s neck on ground"},"$3","gR",6,0,2],
N:function(a,b){return 1},
M:function(a,b){return!0},
A:{
ug:[function(a){return new R.kw(null,!0,!0,!0,C.c,a,null)},"$1","rC",2,0,5]}},kx:{"^":"a:0;",
$1:function(a){a.sau(0)
return a}}}],["","",,Y,{"^":"",
eF:function(a,b){var z=new Y.de(null,null,null,null,null)
new Y.rh(a,b).$1(z)
return z.p()},
eE:{"^":"a0;",
gaN:function(){return[R.rC()]},
gh:function(){return"BreakNeckOnGroundSituation"},
as:function(){var z=new Y.de(null,null,null,null,null)
z.m(this)
new Y.j8().$1(z)
return z.p()},
ay:function(a,b){if(a===0)return b.a8(this.a)
return},
aI:function(a,b){return new H.I(a,new Y.j9(this),[H.m(a,0)])}},
rh:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a2().ac(1073741823)
a.gaT().c=z
a.gaT().e=0
z=this.a.gj()
a.gaT().b=z
z=this.b.gj()
a.gaT().d=z
return a}},
j8:{"^":"a:0;",
$1:function(a){var z=a.gaT().e
if(typeof z!=="number")return z.a4()
a.gaT().e=z+1
return a}},
j9:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.i(a.gj(),z.a)||J.i(a.gj(),z.c)}},
oB:{"^":"eE;a,j:b<,c,I:d<",
a_:function(a){var z=new Y.de(null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof Y.eE))return!1
if(J.i(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y)if(J.i(this.c,b.c)){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1}else z=!1
return z},
gv:function(a){return Y.R(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
k:function(a){return"BreakNeckOnGroundSituation {attacker="+H.b(J.h(this.a))+",\nid="+J.h(this.b)+",\ntarget="+H.b(J.h(this.c))+",\ntime="+J.h(this.d)+",\n}"}},
de:{"^":"d;a,b,c,d,e",
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
z=new Y.oB(y,x,w,v)
if(y==null)H.f(P.l("attacker"))
if(x==null)H.f(P.l("id"))
if(w==null)H.f(P.l("target"))
if(v==null)H.f(P.l("time"))}this.m(z)
return z}}}],["","",,Z,{"^":"",ke:{"^":"H;S:c<,T:d<,a3:e<,U:f<,O:r<,b,a",
gah:function(){return"evade"},
gh:function(){return"EvadeNeckBreaking"},
gal:function(){return"will <subject> evade?"},
V:[function(a,b,c){a.ap(c,"<subject> tr<ies> to evade")
S.aF(new Z.kf(a,c),new Z.kg(this,a,c),null,null)
b.bb()
return H.b(a.gh())+" fails to dodge "+H.b(this.b.gh())},"$3","gP",6,0,2],
W:[function(a,b,c){var z=this.b
a.bd(c,"<subject> {dodge<s>|evade<s>} it",z,!0)
b.bV("FightSituation")
return H.b(a.gh())+" evades "+H.b(z.gh())},"$3","gR",6,0,2],
N:function(a,b){var z,y
z=b.f
y=z.length!==0?C.a.gE(z):null
if(y.gbN())return 0
if(y.gbc()===C.j)return 1
if(a.gH()===!0)return 0.6
return 0.5},
M:function(a,b){return!0},
A:{
uf:[function(a){return new Z.ke("This looks dangerous. Trying to evade this close-quarter move seems prudent.",!1,!1,!0,C.c,a,null)},"$1","rz",2,0,5]}},kf:{"^":"a:1;a,b",
$0:function(){return this.a.aF(this.b,"<subject> {can't|fail<s>}",!0)}},kg:{"^":"a:1;a,b,c",
$0:function(){return this.a.b.cK(this.c,"<subject> <is> too quick for <object>",!0,this.b)}}}],["","",,S,{"^":"",
dE:function(a,b,c){var z=new S.dD(null,null,null,null,null,null)
new S.rg(a,b,c).$1(z)
return z.p()},
fd:{"^":"cx;",
gaN:function(){return[Z.rz()]},
gh:function(){return"OnGroundWrestleDefenseSituation"},
as:function(){var z=new S.dD(null,null,null,null,null,null)
z.m(this)
new S.lA().$1(z)
return z.p()}},
rg:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$a2().ac(1073741823)
a.gaD().c=z
a.gaD().f=0
z=this.a.gj()
a.gaD().b=z
z=this.b.gj()
a.gaD().e=z
a.gaD().d=this.c
return a}},
lA:{"^":"a:0;",
$1:function(a){var z=a.gaD().f
if(typeof z!=="number")return z.a4()
a.gaD().f=z+1
return a}},
oI:{"^":"fd;d9:a<,j:b<,bc:c<,cM:d<,I:e<",
a_:function(a){var z=new S.dD(null,null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof S.fd))return!1
if(J.i(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
if(z==null?y==null:z===y)if(J.i(this.d,b.d)){z=this.e
y=b.e
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1}else z=!1}else z=!1
return z},
gv:function(a){return Y.R(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)))},
k:function(a){return"OnGroundWrestleDefenseSituation {attacker="+H.b(J.h(this.a))+",\nid="+J.h(this.b)+",\npredeterminedResult="+J.h(this.c)+",\ntarget="+H.b(J.h(this.d))+",\ntime="+J.h(this.e)+",\n}"}},
dD:{"^":"d;a,b,c,d,e,f",
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
z=new S.oI(y,x,w,v,u)
if(y==null)H.f(P.l("attacker"))
if(x==null)H.f(P.l("id"))
if(w==null)H.f(P.l("predeterminedResult"))
if(v==null)H.f(P.l("target"))
if(u==null)H.f(P.l("time"))}this.m(z)
return z}}}],["","",,G,{"^":"",eN:{"^":"H;S:c<,T:d<,a3:e<,b,a",
gh:function(){return"CounterSlash"},
gU:function(){return!1},
gO:function(){return},
gah:function(){return"swing back at <object>"},
gal:function(){return"will <subject> keep <subject's> balance?"},
V:[function(a,b,c){a.ap(c,"<subject> tr<ies> to swing back")
a.dq(c,"<subject> {go<es> wide|miss<es>}",!0,!0)
if(a.gab()){b.a5(a.x,new G.jw())
a.bH(c,"<subject> lose<s> balance because of that",!0,!0)}else if(a.dx===C.i){b.a5(a.x,new G.jx())
a.b0(c,"<subject> lose<s> balance because of that",!0)
a.bH(c,"<subject> fall<s> to the ground",!0,!0)}return H.b(a.cy)+" fails to swing back at "+H.b(this.b.gh())},"$3","gP",6,0,2],
W:[function(a,b,c){var z,y
z=this.b
a.bd(c,"<subject> swing<s> back at <object>",z,!0)
y=b.f
C.a.q(y,M.bC(a,z))
C.a.q(y,L.bg(a,z,C.p))
return H.b(a.gh())+" swings back at "+H.b(z.gh())},"$3","gR",6,0,2],
N:function(a,b){return this.b.gab()?0.7:0.9},
M:function(a,b){return a.gH()!==!0&&a.aH(C.f)&&!a.gaf()},
A:{
ua:[function(a){return new G.eN("You can deal serious damage when countering because your opponent is often caught off guard. On the other hand, counters require fast reaction and could throw you out of balance.",!0,!0,a,null)},"$1","rt",2,0,5]}},jw:{"^":"a:0;",
$1:function(a){a.sao(C.i)
return a}},jx:{"^":"a:0;",
$1:function(a){a.sao(C.m)
return a}}}],["","",,D,{"^":"",jt:{"^":"eN;c,d,e,b,a",
gU:function(){return!0},
gO:function(){return C.c},
gah:function(){return"swing back at <object>"},
gal:function(){return"will <subject> hit <objectPronoun>?"},
V:[function(a,b,c){a.ap(c,"<subject> tr<ies> to swing back")
a.dq(c,"<subject> {go<es> wide|miss<es>}",!0,!0)
if(a.gab()){b.a5(a.x,new D.ju())
a.bH(c,"<subject> lose<s> balance because of that",!0,!0)}else if(a.dx===C.i){b.a5(a.x,new D.jv())
a.b0(c,"<subject> lose<s> balance because of that",!0)
a.bH(c,"<subject> fall<s> to the ground",!0,!0)}return H.b(a.cy)+" fails to swing back at "+H.b(this.b.gh())},"$3","gP",6,0,2],
W:[function(a,b,c){var z,y
z=this.b
a.bd(c,"<subject> swing<s> back at <object>",z,!0)
y=b.f
C.a.q(y,M.bC(a,z))
C.a.q(y,L.bg(a,z,C.o))
return H.b(a.gh())+" swings successfully back at "+H.b(z.gh())},"$3","gR",6,0,2],
N:function(a,b){return this.b.gab()?0.7:0.9},
M:function(a,b){return a.gH()===!0&&a.aH(C.f)&&!a.gaf()},
A:{
u9:[function(a){return new D.jt("You can deal serious damage when countering because your opponent is often caught off guard. On the other hand, counters require fast reaction and could throw you out of balance.",!0,!0,a,null)},"$1","ru",2,0,5]}},ju:{"^":"a:0;",
$1:function(a){a.sao(C.i)
return a}},jv:{"^":"a:0;",
$1:function(a){a.sao(C.m)
return a}}}],["","",,S,{"^":"",
eM:function(a,b){var z=new S.dh(null,null,null,null,null)
new S.r9(a,b).$1(z)
return z.p()},
eL:{"^":"a0;",
gaN:function(){return[G.rt(),D.ru()]},
gbg:function(){return[$.$get$dF()]},
gh:function(){return"CounterAttackSituation"},
as:function(){var z=new S.dh(null,null,null,null,null)
z.m(this)
new S.jr().$1(z)
return z.p()},
ay:function(a,b){if(a===0)return b.a8(this.a)
return},
aI:function(a,b){return new H.I(a,new S.js(this),[H.m(a,0)])}},
r9:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a2().ac(1073741823)
a.gaU().c=z
a.gaU().e=0
z=this.a.gj()
a.gaU().b=z
z=this.b.gj()
a.gaU().d=z
return a}},
jr:{"^":"a:0;",
$1:function(a){var z=a.gaU().e
if(typeof z!=="number")return z.a4()
a.gaU().e=z+1
return a}},
js:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.i(a.gj(),z.a)||J.i(a.gj(),z.c)}},
oC:{"^":"eL;a,j:b<,c,I:d<",
a_:function(a){var z=new S.dh(null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof S.eL))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
if(z==null?y==null:z===y)if(J.i(this.c,b.c)){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1}else z=!1
return z},
gv:function(a){return Y.R(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
k:function(a){return"CounterAttackSituation {counterAttacker="+J.h(this.a)+",\nid="+J.h(this.b)+",\ntarget="+H.b(J.h(this.c))+",\ntime="+J.h(this.d)+",\n}"}},
dh:{"^":"d;a,b,c,d,e",
gj:function(){return this.gaU().c},
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
z=new S.oC(y,x,w,v)
if(y==null)H.f(P.l("counterAttacker"))
if(x==null)H.f(P.l("id"))
if(w==null)H.f(P.l("target"))
if(v==null)H.f(P.l("time"))}this.m(z)
return z}}}],["","",,X,{"^":"",
d7:function(a,b,c){var z,y
z=b.aj("FightSituation")
y=z.gbA()
b.cJ(z.gj(),z.a_(new X.rU(c)))
if(c.gao()===C.m){c.b0(a,"<subject> stop<s> moving",!0)
a.G(0,"\n\n",!0)
return}switch($.$get$ho().ac(3)){case 0:c.bH(a,"<subject> collapse<s>, dead",!0,!0)
break
case 1:c.b0(a,"<subject> fall<s> backward",!0)
c.b0(a,"<subject> twist<s>",!0)
c.bH(a,"<subject> hit<s> the "+H.b(y)+" face down",!0,!0)
break
case 2:c.b0(a,"<subject> drop<s> to <subject's> knees",!0)
c.b0(a,"<subject> keel<s> over",!0)
break}a.G(0,"\n\n",!0)},
rU:{"^":"a:0;a",
$1:function(a){var z=this.a
if(!z.gbk())a.gbE().q(0,z.d)
return a}}}],["","",,O,{"^":"",cx:{"^":"n_;",
ay:function(a,b){if(a===0)return b.a8(this.gcM())
return},
aI:function(a,b){return new H.I(a,new O.jC(this),[H.m(a,0)])}},n_:{"^":"a0+lX;"},jC:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.i(a.gj(),z.gd9())||J.i(a.gj(),z.gcM())}}}],["","",,U,{"^":"",
ki:function(a,b,c,d){var z=new U.bX(null,null,null,null,null,null,null,null,null)
new U.r6(a,b,c,d).$1(z)
return z.p()},
eR:{"^":"a0;",
gaN:function(){return[N.rq(),V.rw(),R.rT(),Y.rZ(),T.tN(),T.tO(),U.tP(),U.tQ(),G.tR(),G.tS(),D.tV(),D.tW(),R.tT(),R.tU(),Y.u_()]},
gbg:function(){return H.r([$.$get$fn(),$.$get$fE(),$.$get$fr(),$.$get$h4()],[Q.a6])},
gfR:function(){return 1000},
gh:function(){return"FightSituation"},
cw:function(a,b){var z=b.a
return(z&&C.a).bP(z,new U.kj(a))},
as:function(){var z=new U.bX(null,null,null,null,null,null,null,null,null)
z.m(this)
new U.kk().$1(z)
return z.p()},
ay:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j
z=X.hx(this.f,this.b)
y=H.bw(z,new U.kl(b),H.x(z,"y",0),null)
x=H.x(y,"y",0)
w=P.T(new H.I(y,new U.km(),[x]),!1,x)
x=H.m(w,0)
v=P.T(new H.I(w,new U.kn(),[x]),!1,x)
u=v.length===1?C.a.gc2(v):null
if(a===0)if(u!=null)return u
for(y=w.length,t=0,s=null,r=0;r<w.length;w.length===y||(0,H.ak)(w),++r){q=w[r]
x=b.d
p=x.b7(0,new U.ko(q),new U.kp())
o=p==null?p:p.gI()
if(o==null)o=-1
n=b.r
if(typeof o!=="number")return H.v(o)
m=n-o
if(m<=0)continue
l=x.b7(0,new U.kq(q),new U.kr())
k=l==null?l:l.gI()
if(k==null)k=-1
x=b.r
if(typeof k!=="number")return H.v(k)
j=(x-k+m)/2
if(q.gH()===!0)j*=1.5
if(j>t){s=q
t=j}}return s},
aI:function(a,b){return new H.I(a,new U.ks(this),[H.m(a,0)])},
fX:function(a,b){var z,y
z=b.a
if(!(z.length!==0&&C.a.gE(z).gfO())&&S.mb(0.25))b.G(0,"\n\n",!0)
z=this.x
y=this.c.a
if(y.a1(z))y.i(0,z).$2(a,b)},
di:function(a){var z,y,x,w,v,u,t
z=this.r
if(z!=null&&!this.cw(a,this.b)&&this.cw(a,this.f)){y=a.eI(z)
a.cJ(y.gj(),y.a_(new U.kt()))
for(z=this.f,x=z.a,x=new J.br(x,x.length,0,null,[H.m(x,0)]),w=a.a;x.t();){v=x.d
if(a.a8(v).gaO()){u=a.a8(v)
t=u.a_(new U.ku())
w.a7(0,u)
w.q(0,t)}}C.a.q(a.f,X.lh(z,this.d,this.a,null))}else this.cw(a,this.f)},
cW:function(a){var z=this.f
if(this.cw(a,z))if(this.cw(a,this.b)){z=z.a
z=(z&&C.a).bP(z,new U.kv(a))}else z=!1
else z=!1
return z}},
r6:{"^":"a:0;a,b,c,d",
$1:function(a){var z,y
z=$.$get$a2().ac(1073741823)
a.gae().f=z
a.gae().y=0
z=a.gae()
y=z.r
if(y==null){y=new S.L(null,null,[P.u])
y.a9()
y.m(C.e)
z.r=y
z=y}else z=y
y=this.a
z.m(new H.cG(y,new U.qa(),[H.m(y,0),null]))
y=a.gae()
z=y.c
if(z==null){z=new S.L(null,null,[P.u])
z.a9()
z.m(C.e)
y.c=z}z.m(J.ex(this.b,new U.qb()))
a.gae().e=this.c
z=new S.L(null,null,[U.am])
z.a9()
z.m(C.e)
a.gae().b=z
z=this.d.gj()
a.gae().x=z
return a}},
qa:{"^":"a:0;",
$1:function(a){return a.gj()}},
qb:{"^":"a:0;",
$1:function(a){return a.gj()}},
kj:{"^":"a:0;a",
$1:function(a){return this.a.a8(a).gaO()}},
kk:{"^":"a:0;",
$1:function(a){var z=a.gae().y
if(typeof z!=="number")return z.a4()
a.gae().y=z+1
return a}},
kl:{"^":"a:0;a",
$1:function(a){return this.a.a8(a)}},
km:{"^":"a:0;",
$1:function(a){return a.gaO()}},
kn:{"^":"a:0;",
$1:function(a){return a.gH()}},
ko:{"^":"a:0;a",
$1:function(a){return J.i(a.gdm(),this.a.gj())&&a.ghg()===!0}},
kp:{"^":"a:1;",
$0:function(){return}},
kq:{"^":"a:0;a",
$1:function(a){return J.i(a.gdm(),this.a.gj())}},
kr:{"^":"a:1;",
$0:function(){return}},
ks:{"^":"a:23;a",
$1:function(a){var z,y,x
if(a.gaO()){z=this.a
y=a.gj()
x=z.f.a
if(!(x&&C.a).Z(x,y)){y=a.gj()
z=z.b.a
y=(z&&C.a).Z(z,y)
z=y}else z=!0}else z=!1
return z}},
kt:{"^":"a:0;",
$1:function(a){a.sk5(!1)
return a}},
ku:{"^":"a:0;",
$1:function(a){a.sao(C.l)
return a}},
kv:{"^":"a:29;a",
$1:function(a){var z=this.a.a8(a)
return z.gH()===!0&&z.gaO()}},
oE:{"^":"eR;bE:a<,b,c,bA:d<,j:e<,dk:f<,r,I:x<",
a_:function(a){var z=new U.bX(null,null,null,null,null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof U.eR))return!1
if(J.i(this.a,b.a))if(J.i(this.b,b.b))if(J.i(this.c,b.c)){z=this.d
y=b.d
if(z==null?y==null:z===y){z=this.e
y=b.e
if(z==null?y==null:z===y)if(J.i(this.f,b.f)){z=this.r
y=b.r
if(z==null?y==null:z===y){z=this.x
y=b.x
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1
else z=!1}else z=!1}else z=!1
else z=!1
else z=!1
return z},
gv:function(a){return Y.R(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)),J.j(this.f)),J.j(this.r)),J.j(this.x)))},
k:function(a){return"FightSituation {droppedItems="+J.h(this.a)+",\nenemyTeamIds="+J.h(this.b)+",\nevents="+J.h(this.c)+",\ngroundMaterial="+J.h(this.d)+",\nid="+J.h(this.e)+",\nplayerTeamIds="+J.h(this.f)+",\nroomRoamingSituationId="+J.h(this.r)+",\ntime="+J.h(this.x)+",\n}"}},
bX:{"^":"d;a,b,c,d,e,f,r,x,y",
gbE:function(){var z,y
z=this.gae()
y=z.b
if(y==null){y=new S.L(null,null,[U.am])
y.a9()
y.m(C.e)
z.b=y
z=y}else z=y
return z},
gbA:function(){return this.gae().e},
gj:function(){return this.gae().f},
gdk:function(){var z,y
z=this.gae()
y=z.r
if(y==null){y=new S.L(null,null,[P.u])
y.a9()
y.m(C.e)
z.r=y
z=y}else z=y
return z},
gI:function(){return this.gae().y},
gae:function(){var z,y
z=this.a
if(z!=null){z=z.a
if(!(z==null)){y=new S.L(null,null,[H.m(z,0)])
y.a9()
y.m(z)
z=y}this.b=z
z=this.a.b
if(!(z==null)){y=new S.L(null,null,[H.m(z,0)])
y.a9()
y.m(z)
z=y}this.c=z
z=this.a.c
if(!(z==null)){y=new A.dy(null,null,[H.m(z,0),H.m(z,1)])
y.co()
y.m(z)
z=y}this.d=z
z=this.a
this.e=z.d
this.f=z.e
z=z.f
if(!(z==null)){y=new S.L(null,null,[H.m(z,0)])
y.a9()
y.m(z)
z=y}this.r=z
z=this.a
this.x=z.r
this.y=z.x
this.a=null}return this},
m:function(a){this.a=a},
p:function(){var z,y,x,w,v,u,t,s,r
z=this.a
if(z==null){y=this.gae()
x=y.b
if(x==null){x=new S.L(null,null,[U.am])
x.a9()
x.m(C.e)
y.b=x
y=x}else y=x
y=y.p()
x=this.gae()
w=x.c
if(w==null){w=new S.L(null,null,[P.u])
w.a9()
w.m(C.e)
x.c=w
x=w}else x=w
x=x.p()
w=this.gae()
v=w.d
if(v==null){v=new A.dy(null,null,[P.u,{func:1,v:true,args:[A.a8,Y.a1]}])
v.co()
v.m(C.W)
w.d=v
w=v}else w=v
w=w.p()
v=this.gae().e
u=this.gae().f
t=this.gae()
s=t.r
if(s==null){s=new S.L(null,null,[P.u])
s.a9()
s.m(C.e)
t.r=s
t=s}else t=s
t=t.p()
s=this.gae().x
r=this.gae().y
z=new U.oE(y,x,w,v,u,t,s,r)
if(y==null)H.f(P.l("droppedItems"))
if(x==null)H.f(P.l("enemyTeamIds"))
if(w==null)H.f(P.l("events"))
if(v==null)H.f(P.l("groundMaterial"))
if(u==null)H.f(P.l("id"))
if(t==null)H.f(P.l("playerTeamIds"))
if(r==null)H.f(P.l("time"))}this.m(z)
return z}}}],["","",,Z,{"^":"",iY:{"^":"a6;T:b<,a3:c<,U:d<,O:e<,a",
gX:function(){return""},
gS:function(){return},
gh:function(){return"AutoLoot"},
V:[function(a,b,c){throw H.c(new P.ab(null))},"$3","gP",6,0,2],
W:[function(a,b,c){var z,y,x,w,v,u,t,s,r,q
z=b.aj("LootSituation")
y=[]
for(x=z.gbE(),x=x.gY(x),w=b.a,v=null;x.t();){u=x.d
if(u instanceof L.bG){t=u.gdI()
s=a.ga2().gad()
if(typeof s!=="number")return H.v(s)
s=t>s
t=s}else t=!1
if(t){r=b.a8(a.gj())
q=r.a_(new Z.j5(a,u))
w.a7(0,r)
w.q(0,q)
v=u}else{r=b.a8(a.gj())
q=r.a_(new Z.j6(u))
w.a7(0,r)
w.q(0,q)
y.push(u)}}if(v!=null){a.b1(c,"<subject> pick<s> up <object>",v)
a.b1(c,"<subject> wield<s> <object>",v)}this.i4(y,a,z,b,c)
if(y.length!==0)c.iY("<subject> <also> take<s>",y,null,a)
return H.b(a.gh())+" auto-loots"},"$3","gR",6,0,2],
ai:function(a,b){return"WARNING this shouldn't be user-visible"},
N:function(a,b){return 1},
M:function(a,b){return a.gH()},
i4:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r
z=P.T(new H.I(a,new Z.iZ(),[H.m(a,0)]),!0,L.bG)
y=b.gbU()
y.toString
C.a.ar(z,new H.I(y,new Z.j_(),[H.m(y,0)]))
if(z.length===0)return
C.a.cf(z,new Z.j0())
x=c.gdk().aP(0,new Z.j1(d)).dM(0,new Z.j2())
for(y=J.af(x.a),w=new H.cU(y,x.b,[H.m(x,0)]),v=d.a;w.t();){u=y.gF()
if(z.length===0)break
t=C.a.kf(z)
s=d.a8(u.gj())
r=s.a_(new Z.j3(t))
v.a7(0,s)
v.q(0,r)
C.a.a7(a,t)
s=d.a8(b.gj())
r=s.a_(new Z.j4(t))
v.a7(0,s)
v.q(0,r)
b.b1(e,"<subject> give<s> the "+H.b(t.gh())+" to <object>",u)}}},j5:{"^":"a:0;a,b",
$1:function(a){var z=this.a
if(!(z.ga2() instanceof K.cA))a.gbU().q(0,z.ga2())
a.sa2(this.b)
return a}},j6:{"^":"a:0;a",
$1:function(a){a.gbU().q(0,this.a)
return a}},iZ:{"^":"a:0;",
$1:function(a){return a instanceof L.bG}},j_:{"^":"a:0;",
$1:function(a){return a instanceof L.bG}},j0:{"^":"a:7;",
$2:function(a,b){return J.bS(a.gad(),b.gad())}},j1:{"^":"a:0;a",
$1:function(a){return this.a.a8(a)}},j2:{"^":"a:0;",
$1:function(a){return a.gaO()&&a.gbk()}},j3:{"^":"a:0;a",
$1:function(a){a.sa2(this.a)
return a}},j4:{"^":"a:0;a",
$1:function(a){a.gbU().a7(0,this.a)
return a}}}],["","",,X,{"^":"",
lh:function(a,b,c,d){var z=new X.dx(null,null,null,null,null,null)
new X.r7(a,b,c).$1(z)
return z.p()},
f8:{"^":"a0;",
gbg:function(){return H.r([$.$get$eB()],[Q.a6])},
gh:function(){return"LootSituation"},
as:function(){var z=new X.dx(null,null,null,null,null,null)
z.m(this)
new X.lj().$1(z)
return z.p()},
ay:function(a,b){if(typeof a!=="number")return a.br()
if(a>0)return
return this.f4(b.a)},
aI:function(a,b){return[this.f4(a)]},
cW:function(a){return!0},
f4:function(a){return a.de(0,new X.li())}},
r7:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$a2().ac(1073741823)
a.gaq().e=z
a.gaq().f=0
a.gaq().c=this.b
z=new S.L(null,null,[P.u])
z.a9()
z.m(this.a)
a.gaq().d=z
z=new S.L(null,null,[U.am])
z.a9()
z.m(this.c)
a.gaq().b=z
return a}},
lj:{"^":"a:0;",
$1:function(a){var z=a.gaq().f
if(typeof z!=="number")return z.a4()
a.gaq().f=z+1
return a}},
li:{"^":"a:0;",
$1:function(a){return a.gH()===!0&&a.gaO()}},
oF:{"^":"f8;bE:a<,bA:b<,dk:c<,j:d<,I:e<",
a_:function(a){var z=new X.dx(null,null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof X.f8))return!1
if(J.i(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y)if(J.i(this.c,b.c)){z=this.d
y=b.d
if(z==null?y==null:z===y){z=this.e
y=b.e
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1
else z=!1}else z=!1
return z},
gv:function(a){return Y.R(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)))},
k:function(a){return"LootSituation {droppedItems="+J.h(this.a)+",\ngroundMaterial="+J.h(this.b)+",\nplayerTeamIds="+J.h(this.c)+",\nid="+J.h(this.d)+",\ntime="+J.h(this.e)+",\n}"}},
dx:{"^":"d;a,b,c,d,e,f",
gbE:function(){var z,y
z=this.gaq()
y=z.b
if(y==null){y=new S.L(null,null,[U.am])
y.a9()
y.m(C.e)
z.b=y
z=y}else z=y
return z},
gbA:function(){return this.gaq().c},
gdk:function(){var z,y
z=this.gaq()
y=z.d
if(y==null){y=new S.L(null,null,[P.u])
y.a9()
y.m(C.e)
z.d=y
z=y}else z=y
return z},
gj:function(){return this.gaq().e},
gI:function(){return this.gaq().f},
gaq:function(){var z,y
z=this.a
if(z!=null){z=z.a
if(!(z==null)){y=new S.L(null,null,[H.m(z,0)])
y.a9()
y.m(z)
z=y}this.b=z
z=this.a
this.c=z.b
z=z.c
if(!(z==null)){y=new S.L(null,null,[H.m(z,0)])
y.a9()
y.m(z)
z=y}this.d=z
z=this.a
this.e=z.d
this.f=z.e
this.a=null}return this},
m:function(a){this.a=a},
p:function(){var z,y,x,w,v,u
z=this.a
if(z==null){y=this.gaq()
x=y.b
if(x==null){x=new S.L(null,null,[U.am])
x.a9()
x.m(C.e)
y.b=x
y=x}else y=x
y=y.p()
x=this.gaq().c
w=this.gaq()
v=w.d
if(v==null){v=new S.L(null,null,[P.u])
v.a9()
v.m(C.e)
w.d=v
w=v}else w=v
w=w.p()
v=this.gaq().e
u=this.gaq().f
z=new X.oF(y,x,w,v,u)
if(y==null)H.f(P.l("droppedItems"))
if(x==null)H.f(P.l("groundMaterial"))
if(w==null)H.f(P.l("playerTeamIds"))
if(v==null)H.f(P.l("id"))
if(u==null)H.f(P.l("time"))}this.m(z)
return z}}}],["","",,A,{"^":"",lu:{"^":"H;S:c<,T:d<,a3:e<,U:f<,O:r<,b,a",
gh:function(){return"OffBalanceOpportunityThrust"},
gah:function(){return"stab <object>"},
gal:function(){return"will <subject> hit <objectPronoun>?"},
V:[function(a,b,c){var z=this.b
a.b1(c,"<subject> tr<ies> to stab <object>",z)
a.aF(c,"<subject> {go<es> wide|fail<s>|miss<es>}",!0)
return H.b(a.gh())+" fails to stab "+H.b(z.gh())},"$3","gP",6,0,2],
W:[function(a,b,c){var z=this.b
b.a5(z.gj(),new A.lv())
if(b.a8(z.gj()).gbw()){a.bd(c,"<subject> thrust<s> {|<subject's> "+H.b(a.ga2().gh())+"} deep into <object's> {shoulder|hip|thigh}",z,!0)
z.b0(c,"<subject> {scream|yell|grunt}<s> in pain",!0)}else{a.bd(c,"<subject> {stab<s>|run<s> <subject's> "+H.b(a.ga2().gh())+" through} <object>",z,!0)
X.d7(c,b,z)}return H.b(a.gh())+" stabs "+H.b(z.gh())},"$3","gR",6,0,2],
N:function(a,b){if(a.gH()===!0)return 0.6
return 0.5},
M:function(a,b){return a.gab()&&this.b.gb9()&&C.a.Z(a.d.gdu(),C.f)},
A:{
un:[function(a){return new A.lu("When an opponent is out of balance they are the most vulnerable.",!0,!0,!0,C.c,a,null)},"$1","rW",2,0,5]}},lv:{"^":"a:0;",
$1:function(a){var z=a.gau()
if(typeof z!=="number")return z.aL()
a.sau(z-1)
return a}}}],["","",,U,{"^":"",
lq:function(a,b){var z=new U.dA(null,null,null,null,null)
new U.ri(a,b).$1(z)
return z.p()},
fb:{"^":"a0;",
gaN:function(){return H.r([A.rW()],[{func:1,ret:Q.H,args:[R.F]}])},
gbg:function(){return[$.$get$dF()]},
gh:function(){return"OffBalanceOpportunitySituation"},
as:function(){var z=new U.dA(null,null,null,null,null)
z.m(this)
new U.lr().$1(z)
return z.p()},
ay:function(a,b){var z,y,x,w,v
if(typeof a!=="number")return a.br()
if(a>0)return
z=b.a8(this.a)
y=b.a
x=H.m(y,0)
w=P.T(new H.I(y,new U.ls(this,b,z),[x]),!0,x)
if(w.length===0)return
v=C.a.gem(w)
if(v.gab()&&z.gb9()&&C.a.Z(v.d.gdu(),C.f))return v
return},
aI:function(a,b){return new H.I(a,new U.lt(b,b.a8(this.a)),[H.m(a,0)])}},
ri:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a2().ac(1073741823)
a.gaV().d=z
a.gaV().e=0
z=this.a.gj()
a.gaV().b=z
z=this.b
z=z==null?z:z.gj()
a.gaV().c=z
return a}},
lr:{"^":"a:0;",
$1:function(a){var z=a.gaV().e
if(typeof z!=="number")return z.a4()
a.gaV().e=z+1
return a}},
ls:{"^":"a:23;a,b,c",
$1:function(a){var z,y
if(a.gaO())if(a.eo(this.c,this.b)){z=a.x
y=this.a.b
y=z==null?y!=null:z!==y
z=y}else z=!1
else z=!1
return z}},
lt:{"^":"a:0;a,b",
$1:function(a){var z=this.b
return J.i(a,z)||a.eo(z,this.a)}},
oG:{"^":"fb;a,b,j:c<,I:d<",
a_:function(a){var z=new U.dA(null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof U.fb))return!1
if(J.i(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
if(z==null?y==null:z===y){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1}else z=!1
return z},
gv:function(a){return Y.R(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
k:function(a){return"OffBalanceOpportunitySituation {actorId="+H.b(J.h(this.a))+",\nculpritId="+J.h(this.b)+",\nid="+J.h(this.c)+",\ntime="+J.h(this.d)+",\n}"}},
dA:{"^":"d;a,b,c,d,e",
gj:function(){return this.gaV().d},
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
z=new U.oG(y,x,w,v)
if(y==null)H.f(P.l("actorId"))
if(w==null)H.f(P.l("id"))
if(v==null)H.f(P.l("time"))}this.m(z)
return z}}}],["","",,O,{"^":"",ky:{"^":"H;S:c<,T:d<,a3:e<,U:f<,b,a",
gah:function(){return""},
gh:function(){return"FinishPunch"},
gO:function(){return},
gal:function(){return"(WARNING should not be user-visible)"},
V:[function(a,b,c){throw H.c(new P.ab(null))},"$3","gP",6,0,2],
W:[function(a,b,c){var z,y,x,w
z=this.b
y=z.gab()?C.i:C.m
x=b.aj("PunchSituation").gj()
w=b.aj("FightSituation").gbA()
b.a5(z.x,new O.kz(y))
switch(y){case C.l:throw H.c(new P.E("Enemy's pose should never be 'standing' after a successful punch"))
case C.i:c.fq(0,"<subject> {punch<es> <object> in the {face|nose|eye|jaw}|punch<es> <object's> {face|nose|eye|jaw}}",x,z,!0,a)
z.b0(c,"<subject> {stagger<s>|stumble<s>} off balance",!0)
break
case C.m:c.fq(0,"<subject> send<s> <object> to the "+H.b(w)+" with a {massive punch|well-placed fist} to the {face|nose|eye|jaw}",x,z,!0,a)
break}return H.b(a.gh())+" punches "+H.b(z.cy)+" to "+y.k(0)},"$3","gR",6,0,2],
N:function(a,b){return 1},
M:function(a,b){return!0},
A:{
uh:[function(a){return new O.ky(null,!0,!0,!1,a,null)},"$1","rD",2,0,5]}},kz:{"^":"a:0;a",
$1:function(a){a.sao(this.a)
return a}}}],["","",,E,{"^":"",jO:{"^":"H;S:c<,T:d<,a3:e<,U:f<,O:r<,b,a",
gah:function(){return"dodge"},
gh:function(){return"DodgePunch"},
gal:function(){return"will <subject> dodge the fist?"},
V:[function(a,b,c){var z=b.aj("PunchSituation").gj()
a.kj(c,"<subject> tr<ies> to {dodge|sidestep|move out of the way}",z,!0)
S.aF(new E.jP(a,c,z),new E.jQ(this,a,c,z),null,null)
b.bb()
return H.b(a.gh())+" fails to dodge "+H.b(this.b.gh())},"$3","gP",6,0,2],
W:[function(a,b,c){var z=this.b
a.eA(c,"<subject> {dodge<s>|sidestep<s>} <object's> {punch|blow|jab}",b.aj("PunchSituation").gj(),z,!0)
b.bV("FightSituation")
return H.b(a.gh())+" dodges punch from "+H.b(z.gh())},"$3","gR",6,0,2],
N:function(a,b){var z,y,x
z=b.f
y=z.length!==0?C.a.gE(z):null
if(y.gbN())return 0
if(y.gbc()===C.j)return 1
x=a.gab()?0:0.2
if(a.Q===!0)return 0.7-x
return 0.4-x},
M:function(a,b){return!0},
A:{
ud:[function(a){return new E.jO("Dodging means moving your body out of harm's way.",!1,!1,!0,C.c,a,null)},"$1","rx",2,0,5]}},jP:{"^":"a:1;a,b,c",
$0:function(){return this.a.km(this.b,"<subject> {can't|fail<s>|<does>n't succeed}",this.c,!0,!0)}},jQ:{"^":"a:1;a,b,c,d",
$0:function(){return this.a.b.ko(this.c,"<subject> <is> too quick for <object>",this.d,!0,!0,this.b)}}}],["","",,Z,{"^":"",
dL:function(a,b,c){var z=new Z.dK(null,null,null,null,null,null)
new Z.rd(a,b,c).$1(z)
return z.p()},
fi:{"^":"cx;",
gaN:function(){return[E.rx()]},
gh:function(){return"PunchDefenseSituation"},
as:function(){var z=new Z.dK(null,null,null,null,null,null)
z.m(this)
new Z.m6().$1(z)
return z.p()}},
rd:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$a2().ac(1073741823)
a.gaB().c=z
a.gaB().f=0
z=this.a.gj()
a.gaB().b=z
z=this.b.gj()
a.gaB().e=z
a.gaB().d=this.c
return a}},
m6:{"^":"a:0;",
$1:function(a){var z=a.gaB().f
if(typeof z!=="number")return z.a4()
a.gaB().f=z+1
return a}},
oJ:{"^":"fi;d9:a<,j:b<,bc:c<,cM:d<,I:e<",
a_:function(a){var z=new Z.dK(null,null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof Z.fi))return!1
if(J.i(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
if(z==null?y==null:z===y)if(J.i(this.d,b.d)){z=this.e
y=b.e
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1}else z=!1}else z=!1
return z},
gv:function(a){return Y.R(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)))},
k:function(a){return"PunchDefenseSituation {attacker="+H.b(J.h(this.a))+",\nid="+J.h(this.b)+",\npredeterminedResult="+J.h(this.c)+",\ntarget="+H.b(J.h(this.d))+",\ntime="+J.h(this.e)+",\n}"}},
dK:{"^":"d;a,b,c,d,e,f",
gj:function(){return this.gaB().c},
gI:function(){return this.gaB().f},
gaB:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.f=z.e
this.a=null}return this},
m:function(a){this.a=a},
p:function(){var z,y,x,w,v,u
z=this.a
if(z==null){y=this.gaB().b
x=this.gaB().c
w=this.gaB().d
v=this.gaB().e
u=this.gaB().f
z=new Z.oJ(y,x,w,v,u)
if(y==null)H.f(P.l("attacker"))
if(x==null)H.f(P.l("id"))
if(w==null)H.f(P.l("predeterminedResult"))
if(v==null)H.f(P.l("target"))
if(u==null)H.f(P.l("time"))}this.m(z)
return z}}}],["","",,M,{"^":"",
fk:function(a,b){var z=new M.dM(null,null,null,null,null)
new M.rf(a,b).$1(z)
return z.p()},
fj:{"^":"a0;",
gaN:function(){return[O.rD()]},
gh:function(){return"PunchSituation"},
as:function(){var z=new M.dM(null,null,null,null,null)
z.m(this)
new M.m7().$1(z)
return z.p()},
ay:function(a,b){if(a===0)return b.a8(this.a)
return},
aI:function(a,b){return new H.I(a,new M.m8(this),[H.m(a,0)])}},
rf:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a2().ac(1073741823)
a.gaW().c=z
a.gaW().e=0
z=this.a.gj()
a.gaW().b=z
z=this.b.gj()
a.gaW().d=z
return a}},
m7:{"^":"a:0;",
$1:function(a){var z=a.gaW().e
if(typeof z!=="number")return z.a4()
a.gaW().e=z+1
return a}},
m8:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.i(a.gj(),z.a)||J.i(a.gj(),z.c)}},
oK:{"^":"fj;a,j:b<,c,I:d<",
a_:function(a){var z=new M.dM(null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof M.fj))return!1
if(J.i(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y)if(J.i(this.c,b.c)){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1}else z=!1
return z},
gv:function(a){return Y.R(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
k:function(a){return"PunchSituation {attacker="+H.b(J.h(this.a))+",\nid="+J.h(this.b)+",\ntarget="+H.b(J.h(this.c))+",\ntime="+J.h(this.d)+",\n}"}},
dM:{"^":"d;a,b,c,d,e",
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
z=new M.oK(y,x,w,v)
if(y==null)H.f(P.l("attacker"))
if(x==null)H.f(P.l("id"))
if(w==null)H.f(P.l("target"))
if(v==null)H.f(P.l("time"))}this.m(z)
return z}}}],["","",,O,{"^":"",kA:{"^":"H;S:c<,T:d<,a3:e<,U:f<,O:r<,b,a",
gh:function(){return"FinishSlash"},
gah:function(){return""},
gal:function(){return"(WARNING should not be user-visible)"},
V:[function(a,b,c){throw H.c(new P.ab(null))},"$3","gP",6,0,2],
W:[function(a,b,c){var z,y,x,w
z=this.b
b.a5(z.gj(),new O.kD())
y=b.aj("SlashSituation").gj()
x=b.a8(z.gj()).gbw()
if(x){a.eA(c,"<subject> {slash<es>|cut<s>} <object's> {shoulder|abdomen|thigh}",y,z,!0)
z.b0(c,"<subject> {scream|yell|grunt}<s> in pain",!0)}else{a.eA(c,"<subject> {slash<es>|cut<s>} {across|through} <object's> {neck|abdomen|lower body}",y,z,!0)
X.d7(c,b,z)}w=H.b(a.gh())+" slashes"
return w+(!x?" (and kills)":"")+" "+H.b(z.gh())},"$3","gR",6,0,2],
N:function(a,b){return 1},
M:function(a,b){return a.aH(C.f)},
A:{
uj:[function(a){return new O.kA(null,!0,!0,!0,C.c,a,null)},"$1","rE",2,0,5]}},kD:{"^":"a:0;",
$1:function(a){var z=a.gau()
if(typeof z!=="number")return z.aL()
a.sau(z-1)
return a}}}],["","",,X,{"^":"",jD:{"^":"H;S:c<,T:d<,a3:e<,U:f<,O:r<,b,a",
gh:function(){return"DefensiveParrySlash"},
gah:function(){return"step back and parry"},
gal:function(){return"will <subject> parry it?"},
V:[function(a,b,c){a.ap(c,"<subject> tr<ies> to {parry|deflect it|meet it with <subject's> "+H.b(a.ga2().gh())+"|fend it off}")
if(a.gb9())a.aF(c,"<subject> <is> out of balance",!0)
else S.aF(new X.jE(a,c),new X.jF(this,a,c),null,null)
b.bb()
return H.b(a.cy)+" fails to parry "+H.b(this.b.gh())},"$3","gP",6,0,2],
W:[function(a,b,c){if(a.gH()===!0)a.ap(c,"<subject> {step<s>|take<s> a step} back")
a.cb(c,"<subject> {parr<ies> it|deflect<s> it|meet<s> it with <subject's> "+H.b(a.ga2().gh())+"|fend<s> it off}",!0)
if(!a.gab()){b.a5(a.x,new X.jG())
if(a.Q===!0)a.ap(c,"<subject> regain<s> balance")}b.bV("FightSituation")
return H.b(a.cy)+" steps back and parries "+H.b(this.b.gh())},"$3","gR",6,0,2],
N:function(a,b){var z,y
if(a.gH()===!0)return 1
z=b.f
y=z.length!==0?C.a.gE(z):null
if(y.gbN())return 0
if(y.gbc()===C.j)return 1
return 0.5-(a.gab()?0:0.2)},
M:function(a,b){return a.aH(C.f)},
A:{
ub:[function(a){return new X.jD("Stepping back is the safest way to get out of harm's way.",!1,!1,!0,C.c,a,null)},"$1","rv",2,0,5]}},jE:{"^":"a:1;a,b",
$0:function(){return this.a.aF(this.b,"<subject> {fail<s>|<does>n't succeed}",!0)}},jF:{"^":"a:1;a,b,c",
$0:function(){return this.a.b.cK(this.c,"<subject> <is> too quick for <object>",!0,this.b)}},jG:{"^":"a:0;",
$1:function(a){a.sao(C.l)
return a}}}],["","",,F,{"^":"",jR:{"^":"H;S:c<,T:d<,a3:e<,U:f<,O:r<,b,a",
gh:function(){return"DodgeSlash"},
gah:function(){return"dodge and counter"},
gal:function(){return"will <subject> dodge?"},
V:[function(a,b,c){a.ap(c,"<subject> tr<ies> to {dodge|sidestep}")
if(a.gb9())a.aF(c,"<subject> <is> out of balance",!0)
else S.aF(new F.jS(a,c),new F.jT(this,a,c),null,null)
b.bb()
return H.b(a.cy)+" fails to dodge "+H.b(this.b.gh())},"$3","gP",6,0,2],
W:[function(a,b,c){var z=this.b
a.bd(c,"<subject> {dodge<s>|sidestep<s>} it",z,!0)
if(z.gab()){z.bH(c,"<subject> lose<s> balance because of that",!0,!0)
b.a5(z.x,new F.jU())}b.bV("FightSituation")
if(a.gH()===!0)c.q(0,"this opens an opportunity for a counter attack")
C.a.q(b.f,S.eM(a,z))
return H.b(a.gh())+" dodges "+H.b(z.cy)},"$3","gR",6,0,2],
N:function(a,b){var z,y,x
z=b.f
y=z.length!==0?C.a.gE(z):null
if(y.gbN())return 0
if(y.gbc()===C.j)return 1
x=a.gab()?0:0.2
if(a.Q===!0)return 0.7-x
return 0.4-x},
M:function(a,b){return!a.gaf()},
A:{
ue:[function(a){return new F.jR("Dodging means moving your body out of harm's way. When done correctly, it will throw your opponent off balance and it will open an opportunity for a counter attack. When botched, it can get you killed.",!1,!1,!0,C.c,a,null)},"$1","ry",2,0,5]}},jS:{"^":"a:1;a,b",
$0:function(){return this.a.aF(this.b,"<subject> {can't|fail<s>|<does>n't succeed}",!0)}},jT:{"^":"a:1;a,b,c",
$0:function(){return this.a.b.cK(this.c,"<subject> <is> too quick for <object>",!0,this.b)}},jU:{"^":"a:0;",
$1:function(a){a.sao(C.i)
return C.i}}}],["","",,G,{"^":"",lD:{"^":"H;S:c<,T:d<,a3:e<,U:f<,O:r<,b,a",
gh:function(){return"ParrySlash"},
gah:function(){return"parry and counter"},
gal:function(){return"will <subject> parry?"},
V:[function(a,b,c){a.ap(c,"<subject> tr<ies> to {parry|deflect it|meet it with <subject's> "+H.b(a.ga2().gh())+"|fend it off}")
if(a.gb9())a.aF(c,"<subject> <is> out of balance",!0)
else S.aF(new G.lE(a,c),new G.lF(this,a,c),null,null)
b.bb()
return H.b(a.cy)+" fails to parry "+H.b(this.b.gh())},"$3","gP",6,0,2],
W:[function(a,b,c){var z=this.b
if(z.gb9()){c.iS(0,"<subject> <is> out of balance",!0,!0,z)
c.ee(0,"so <ownerPronoun's> <subject> is {weak|feeble}",z,$.$get$i6())
a.cb(c,"<subject> {parr<ies> it easily|easily meet<s> it with <subject's> "+H.b(a.ga2().gh())+"|fend<s> it off easily}",!0)}else a.cb(c,"<subject> {parr<ies> it|meet<s> it with <subject's> "+H.b(a.ga2().gh())+"|fend<s> it off}",!0)
b.bV("FightSituation")
if(a.gH()===!0)c.q(0,"this opens an opportunity for a counter attack")
C.a.q(b.f,S.eM(a,z))
return H.b(a.gh())+" parries "+H.b(z.cy)},"$3","gR",6,0,2],
N:function(a,b){var z,y,x,w
z=b.f
y=z.length!==0?C.a.gE(z):null
if(y.gbN())return 0
if(y.gbc()===C.j)return 1
x=a.gab()?0:0.2
w=this.b.gb9()?0.3:0
if(a.Q===!0)return 0.6-x+w
return 0.3-x+w},
M:function(a,b){return a.aH(C.f)},
A:{
up:[function(a){return new G.lD("Parrying means deflecting your opponent's move with your weapon. When successful, it will give you an opportunity for a counter attack. It won't throw your opponent off balance like dodging does, but it's also slightly easier to do.",!1,!1,!0,C.c,a,null)},"$1","rY",2,0,5]}},lE:{"^":"a:1;a,b",
$0:function(){return this.a.aF(this.b,"<subject> {fail<s>|<does>n't succeed}",!0)}},lF:{"^":"a:1;a,b,c",
$0:function(){return this.a.b.cK(this.c,"<subject> <is> too quick for <object>",!0,this.b)}}}],["","",,L,{"^":"",
bg:function(a,b,c){var z=new L.dQ(null,null,null,null,null,null)
new L.r8(a,b,c).$1(z)
return z.p()},
fv:{"^":"cx;",
gaN:function(){return[F.ry(),G.rY(),X.rv()]},
gh:function(){return"SlashDefenseSituation"},
as:function(){var z=new L.dQ(null,null,null,null,null,null)
z.m(this)
new L.n2().$1(z)
return z.p()}},
r8:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$a2().ac(1073741823)
a.gaC().c=z
a.gaC().f=0
z=this.a.gj()
a.gaC().b=z
z=this.b.gj()
a.gaC().e=z
a.gaC().d=this.c
return a}},
n2:{"^":"a:0;",
$1:function(a){var z=a.gaC().f
if(typeof z!=="number")return z.a4()
a.gaC().f=z+1
return a}},
oM:{"^":"fv;d9:a<,j:b<,bc:c<,cM:d<,I:e<",
a_:function(a){var z=new L.dQ(null,null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof L.fv))return!1
if(J.i(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
if(z==null?y==null:z===y)if(J.i(this.d,b.d)){z=this.e
y=b.e
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1}else z=!1}else z=!1
return z},
gv:function(a){return Y.R(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)))},
k:function(a){return"SlashDefenseSituation {attacker="+H.b(J.h(this.a))+",\nid="+J.h(this.b)+",\npredeterminedResult="+J.h(this.c)+",\ntarget="+H.b(J.h(this.d))+",\ntime="+J.h(this.e)+",\n}"}},
dQ:{"^":"d;a,b,c,d,e,f",
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
z=new L.oM(y,x,w,v,u)
if(y==null)H.f(P.l("attacker"))
if(x==null)H.f(P.l("id"))
if(w==null)H.f(P.l("predeterminedResult"))
if(v==null)H.f(P.l("target"))
if(u==null)H.f(P.l("time"))}this.m(z)
return z}}}],["","",,M,{"^":"",
bC:function(a,b){var z=new M.dR(null,null,null,null,null)
new M.ra(a,b).$1(z)
return z.p()},
fw:{"^":"a0;",
gaN:function(){return[O.rE()]},
gh:function(){return"SlashSituation"},
as:function(){var z=new M.dR(null,null,null,null,null)
z.m(this)
new M.n3().$1(z)
return z.p()},
ay:function(a,b){if(a===0)return b.a8(this.a)
return},
aI:function(a,b){return new H.I(a,new M.n4(this),[H.m(a,0)])}},
ra:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a2().ac(1073741823)
a.gaX().c=z
a.gaX().e=0
z=this.a.gj()
a.gaX().b=z
z=this.b.gj()
a.gaX().d=z
return a}},
n3:{"^":"a:0;",
$1:function(a){var z=a.gaX().e
if(typeof z!=="number")return z.a4()
a.gaX().e=z+1
return a}},
n4:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.i(a.gj(),z.a)||J.i(a.gj(),z.c)}},
oN:{"^":"fw;a,j:b<,c,I:d<",
a_:function(a){var z=new M.dR(null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof M.fw))return!1
if(J.i(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y)if(J.i(this.c,b.c)){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1}else z=!1
return z},
gv:function(a){return Y.R(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
k:function(a){return"SlashSituation {attacker="+H.b(J.h(this.a))+",\nid="+J.h(this.b)+",\ntarget="+H.b(J.h(this.c))+",\ntime="+J.h(this.d)+",\n}"}},
dR:{"^":"d;a,b,c,d,e",
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
z=new M.oN(y,x,w,v)
if(y==null)H.f(P.l("attacker"))
if(x==null)H.f(P.l("id"))
if(w==null)H.f(P.l("target"))
if(v==null)H.f(P.l("time"))}this.m(z)
return z}}}],["","",,Q,{"^":"",kB:{"^":"H;S:c<,T:d<,a3:e<,U:f<,O:r<,b,a",
gh:function(){return"FinishSlashGroundedEnemy"},
gah:function(){return""},
gal:function(){return"(WARNING should not be user-visible)"},
V:[function(a,b,c){throw H.c(new P.ab(null))},"$3","gP",6,0,2],
W:[function(a,b,c){var z=this.b
b.a5(z.gj(),new Q.kC())
c.fp(0,"<subject> {cuts|slashes|slits} <object's> {throat|neck|side}",z,a.ga2())
X.d7(c,b,z)
return H.b(a.gh())+" slains "+H.b(z.gh())+" on the ground"},"$3","gR",6,0,2],
N:function(a,b){return 1},
M:function(a,b){return this.b.gaf()&&a.aH(C.f)},
A:{
ui:[function(a){return new Q.kB(null,!0,!0,!0,C.c,a,null)},"$1","rF",2,0,5]}},kC:{"^":"a:0;",
$1:function(a){a.sau(0)
return a}}}],["","",,K,{"^":"",lx:{"^":"H;T:c<,a3:d<,U:e<,O:f<,S:r<,b,a",
gh:function(){return"OnGroundParry"},
gah:function(){return"parry it"},
gal:function(){return"will <subject> parry it?"},
V:[function(a,b,c){a.ap(c,"<subject> tr<ies> to {parry|deflect it|stop it{| with <subject's> "+H.b(a.ga2().gh())+"}}")
S.aF(new K.ly(a,c),new K.lz(this,a,c),null,null)
return H.b(a.cy)+" fails to parry "+H.b(this.b.gh())},"$3","gP",6,0,2],
W:[function(a,b,c){a.cb(c,"<subject> {parr<ies> it|stop<s> it with <subject's> "+H.b(a.ga2().gh())+"}",!0)
b.bV("FightSituation")
return H.b(a.cy)+" parries "+H.b(this.b.gh())},"$3","gR",6,0,2],
N:function(a,b){var z,y
z=b.f
y=z.length!==0?C.a.gE(z):null
if(y.gbN())return 0
if(y.gbc()===C.j)return 1
if(a.gH()===!0)return 0.6
return 0.3},
M:function(a,b){return a.aH(C.f)},
A:{
uo:[function(a){return new K.lx(!1,!1,!0,C.c,"You can deal serious damage when countering because your opponent is often caught off guard. On the other hand, counters require fast reaction and could throw you out of balance.",a,null)},"$1","rX",2,0,5]}},ly:{"^":"a:1;a,b",
$0:function(){return this.a.aF(this.b,"<subject> {fail<s>|<does>n't succeed}",!0)}},lz:{"^":"a:1;a,b,c",
$0:function(){return this.a.b.cK(this.c,"<subject> <is> too quick for <object>",!0,this.b)}}}],["","",,Y,{"^":"",ml:{"^":"H;S:c<,T:d<,a3:e<,U:f<,O:r<,b,a",
gh:function(){return"RollOutOfWay"},
gah:function(){return"roll out of way"},
gal:function(){return"will <subject> evade?"},
V:[function(a,b,c){a.ap(c,"<subject> tr<ies> to roll out of the way")
a.aF(c,"<subject> can't",!0)
return H.b(a.gh())+" fails to roll out of the way"},"$3","gP",6,0,2],
W:[function(a,b,c){a.kk(c,"<subject> <is> able to roll out of the way",!0,!0)
if(a.gH()===!0){b.a5(a.gj(),new Y.mm())
a.cb(c,"<subject> jump<s> up on <subject's> feet",!0)}b.bV("FightSituation")
return H.b(a.gh())+" rolls out of the way of "+H.b(this.b.gh())+"'s strike"},"$3","gR",6,0,2],
N:function(a,b){var z,y
z=b.f
y=z.length!==0?C.a.gE(z):null
if(y.gbN())return 0
if(y.gbc()===C.j)return 1
if(a.gH()===!0)return 1
return 0.5},
M:function(a,b){return!0},
A:{
uu:[function(a){return new Y.ml(null,!1,!1,!0,C.c,a,null)},"$1","t2",2,0,5]}},mm:{"^":"a:0;",
$1:function(a){a.sao(C.l)
return a}}}],["","",,V,{"^":"",
dC:function(a,b,c){var z=new V.dB(null,null,null,null,null,null)
new V.rb(a,b,c).$1(z)
return z.p()},
fc:{"^":"cx;",
gaN:function(){return[K.rX(),Y.t2()]},
gh:function(){return"OnGroundDefenseSituation"},
as:function(){var z=new V.dB(null,null,null,null,null,null)
z.m(this)
new V.lw().$1(z)
return z.p()}},
rb:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$a2().ac(1073741823)
a.gaA().c=z
a.gaA().f=0
z=this.a.gj()
a.gaA().b=z
z=this.b.gj()
a.gaA().e=z
a.gaA().d=this.c
return a}},
lw:{"^":"a:0;",
$1:function(a){var z=a.gaA().f
if(typeof z!=="number")return z.a4()
a.gaA().f=z+1
return a}},
oH:{"^":"fc;d9:a<,j:b<,bc:c<,cM:d<,I:e<",
a_:function(a){var z=new V.dB(null,null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof V.fc))return!1
if(J.i(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
if(z==null?y==null:z===y)if(J.i(this.d,b.d)){z=this.e
y=b.e
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1}else z=!1}else z=!1
return z},
gv:function(a){return Y.R(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)))},
k:function(a){return"OnGroundDefenseSituation {attacker="+H.b(J.h(this.a))+",\nid="+J.h(this.b)+",\npredeterminedResult="+J.h(this.c)+",\ntarget="+H.b(J.h(this.d))+",\ntime="+J.h(this.e)+",\n}"}},
dB:{"^":"d;a,b,c,d,e,f",
gj:function(){return this.gaA().c},
gI:function(){return this.gaA().f},
gaA:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.f=z.e
this.a=null}return this},
m:function(a){this.a=a},
p:function(){var z,y,x,w,v,u
z=this.a
if(z==null){y=this.gaA().b
x=this.gaA().c
w=this.gaA().d
v=this.gaA().e
u=this.gaA().f
z=new V.oH(y,x,w,v,u)
if(y==null)H.f(P.l("attacker"))
if(x==null)H.f(P.l("id"))
if(w==null)H.f(P.l("predeterminedResult"))
if(v==null)H.f(P.l("target"))
if(u==null)H.f(P.l("time"))}this.m(z)
return z}}}],["","",,D,{"^":"",
fH:function(a,b){var z=new D.dT(null,null,null,null,null)
new D.rc(a,b).$1(z)
return z.p()},
fG:{"^":"a0;",
gaN:function(){return[Q.rF()]},
gh:function(){return"StrikeDownSituation"},
as:function(){var z=new D.dT(null,null,null,null,null)
z.m(this)
new D.nQ().$1(z)
return z.p()},
ay:function(a,b){if(a===0)return b.a8(this.a)
return},
aI:function(a,b){return new H.I(a,new D.nR(this),[H.m(a,0)])}},
rc:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a2().ac(1073741823)
a.gaY().c=z
a.gaY().e=0
z=this.a.gj()
a.gaY().b=z
z=this.b.gj()
a.gaY().d=z
return a}},
nQ:{"^":"a:0;",
$1:function(a){var z=a.gaY().e
if(typeof z!=="number")return z.a4()
a.gaY().e=z+1
return a}},
nR:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.i(a.gj(),z.a)||J.i(a.gj(),z.c)}},
oP:{"^":"fG;a,j:b<,c,I:d<",
a_:function(a){var z=new D.dT(null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof D.fG))return!1
if(J.i(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y)if(J.i(this.c,b.c)){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1}else z=!1
return z},
gv:function(a){return Y.R(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
k:function(a){return"StrikeDownSituation {attacker="+H.b(J.h(this.a))+",\nid="+J.h(this.b)+",\ntargetOnGround="+H.b(J.h(this.c))+",\ntime="+J.h(this.d)+",\n}"}},
dT:{"^":"d;a,b,c,d,e",
gj:function(){return this.gaY().c},
gI:function(){return this.gaY().e},
gaY:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
m:function(a){this.a=a},
p:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gaY().b
x=this.gaY().c
w=this.gaY().d
v=this.gaY().e
z=new D.oP(y,x,w,v)
if(y==null)H.f(P.l("attacker"))
if(x==null)H.f(P.l("id"))
if(w==null)H.f(P.l("targetOnGround"))
if(v==null)H.f(P.l("time"))}this.m(z)
return z}}}],["","",,O,{"^":"",lX:{"^":"d;",
gbN:function(){return this.gbc()===C.o},
$isa0:1}}],["","",,K,{"^":"",dI:{"^":"d;a,b",
k:function(a){return this.b}}}],["","",,D,{"^":"",n5:{"^":"a6;T:b<,U:c<,a3:d<,O:e<,a",
gX:function(){return""},
gS:function(){return},
gh:function(){return"SlayMonstersAction"},
V:[function(a,b,c){throw H.c(new P.ab(null))},"$3","gP",6,0,2],
W:[function(a,b,c){var z,y,x,w,v
z=b.f
y=z.length!==0?C.a.gE(z):null
x=b.dD(y.gbv())
w=b.a
v=x.k0(b)
w.ar(0,v)
C.a.q(z,U.ki(new H.I(w,new D.n6(a,x),[H.m(w,0)]),v,x.r,y))
return H.b(a.gh())+" initiated combat with monsters in "+x.k(0)},"$3","gR",6,0,2],
ai:function(a,b){return"WARNING should not be user-visible"},
N:function(a,b){return 1},
M:function(a,b){var z=b.f
return H.a5(z.length!==0?C.a.gE(z):null,"$isaj").c}},n6:{"^":"a:0;a,b",
$1:function(a){var z,y
if(a.gaO()){z=a.gbo()
y=this.a.gbo()
z=z.a
y=y.gj()
if(z==null?y==null:z===y){z=a.gbv()
y=this.b.gh()
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1
return z}}}],["","",,Y,{"^":"",nX:{"^":"cz;T:c<,a3:d<,U:e<,O:f<,b,a",
gS:function(){return},
gh:function(){return"TakeExitAction"},
V:[function(a,b,c){throw H.c(new P.ab(null))},"$3","gP",6,0,2],
W:[function(a,b,c){var z,y
z=this.b
c.q(0,z.gb5())
y=b.f
H.a5(y.length!==0?C.a.gE(y):null,"$isaj").ba(b,a,z.gjk(),c)
return H.b(a.gh())+" went through exit to "+z.a},"$3","gR",6,0,2],
ai:function(a,b){return"WARNING should not be user-visible"},
N:function(a,b){return 1},
M:function(a,b){var z=b.f
if(H.a5(z.length!==0?C.a.gE(z):null,"$isaj").c===!0)return!1
this.b.gjM()
return!0},
A:{
ux:[function(a){return new Y.nX(!1,!0,!1,null,a,null)},"$1","u0",2,0,47]}}}],["","",,F,{"^":"",
fo:function(a,b){var z=new F.dO(null,null,null,null,null)
new F.qX(a,b).$1(z)
return z.p()},
aj:{"^":"a0;",
gaN:function(){return[Y.u0()]},
gbg:function(){var z=[]
C.a.ar(z,$.$get$hv())
z.push($.$get$fx())
return z},
gh:function(){return"RoomRoamingSituation"},
as:function(){var z=new F.dO(null,null,null,null,null)
z.m(this)
new F.mn().$1(z)
return z.p()},
ay:function(a,b){return b.a.b7(0,new F.mo(),new F.mp())},
aI:function(a,b){var z=this.ay(null,b)
if(z==null)return[]
return[z]},
fW:function(a,b){a.a.i8(new F.mr(),!0)},
ba:function(a,b,c,d){var z,y,x,w,v,u,t
z=a.dD(c)
a.cJ(this.b,F.fo(z,z.gk_()!=null))
d.j0()
z.c.$3(b,a,d)
d.G(0,"\n\n",!0)
for(y=R.hL(b,a),y=P.T(y,!0,H.x(y,"y",0)),x=y.length,w=a.a,v=0;v<y.length;y.length===x||(0,H.ak)(y),++v){u=a.a8(y[v].gj())
t=u.a_(new F.mq(z))
w.a7(0,u)
w.q(0,t)}},
cW:function(a){if(J.i(this.a,$.$get$eh().b))return!1
return!0}},
qX:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a2().ac(1073741823)
a.gaw().c=z
a.gaw().e=0
z=this.a.gh()
a.gaw().b=z
a.gaw().d=this.b
return a}},
mn:{"^":"a:0;",
$1:function(a){var z=a.gaw().e
if(typeof z!=="number")return z.a4()
a.gaw().e=z+1
return a}},
mo:{"^":"a:0;",
$1:function(a){return a.gH()===!0&&a.gaO()}},
mp:{"^":"a:1;",
$0:function(){return}},
mr:{"^":"a:0;",
$1:function(a){return!a.gbw()}},
mq:{"^":"a:0;a",
$1:function(a){a.sbv(this.a.b)
return a}},
oL:{"^":"aj;bv:a<,j:b<,c,I:d<",
a_:function(a){var z=new F.dO(null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof F.aj))return!1
if(J.i(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
if(z==null?y==null:z===y){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1}else z=!1
return z},
gv:function(a){return Y.R(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
k:function(a){return"RoomRoamingSituation {currentRoomName="+H.b(J.h(this.a))+",\nid="+J.h(this.b)+",\nmonstersAlive="+J.h(this.c)+",\ntime="+J.h(this.d)+",\n}"}},
dO:{"^":"d;a,b,c,d,e",
gbv:function(){return this.gaw().b},
sbv:function(a){this.gaw().b=a
return a},
gj:function(){return this.gaw().c},
sk5:function(a){this.gaw().d=a
return a},
gI:function(){return this.gaw().e},
gaw:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
m:function(a){this.a=a},
p:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gaw().b
x=this.gaw().c
w=this.gaw().d
v=this.gaw().e
z=new F.oL(y,x,w,v)
if(y==null)H.f(P.l("currentRoomName"))
if(x==null)H.f(P.l("id"))
if(w==null)H.f(P.l("monstersAlive"))
if(v==null)H.f(P.l("time"))}this.m(z)
return z}}}],["","",,V,{"^":"",
nZ:function(){var z=new V.dU(null,null,null)
new V.rl().$1(z)
return z.p()},
o9:function(){var z=new V.dV(null,null,null)
new V.rk().$1(z)
return z.p()},
na:function(){var z=new V.dS(null,null,null)
new V.rj().$1(z)
return z.p()},
qV:{"^":"a:4;",
$3:function(a,b,c){c.G(0,"The crevice is small.\n",!0)}},
qW:{"^":"a:4;",
$3:function(a,b,c){c.G(0,"",!0)}},
qS:{"^":"a:4;",
$3:function(a,b,c){c.G(0,'The journey from slavery to power begins with a single crack of a skull. Oddmund falls to the rock floor and his blond hair is quickly filled with blood. Above him, Agruth is grinning. He finds Oddmund\'s death funny. He always finds dying slaves funny.\n\n\nYou and Briana watch this in terror, unable to move.\n\n\nWhen the puddle of blood beneath Oddmund\'s head stops spreading, Agruth bends down to check the teeth in case there\'s gold in them. He stops when he notices you looking at him.\n\n\n"What the matter, human?" he says, smirking. "You have no work?"\n',!0)}},
qU:{"^":"a:4;",
$3:function(a,b,c){c.G(0,"",!0)}},
qQ:{"^":"a:4;",
$3:function(a,b,c){c.G(0,'You are Aren, a slave. You have spent three painful years inside this mountain, between the foul-smelling cave walls, and under the barbed whip of Agruth. Your past life is almost forgotten, but it has to be revived. There is no turning back now. [a][b][c][d][e]\n\n\nBriana kneels down to Oddmund. "Dead," she says plainly.\n\n\nOddmund was the leader among the slaves. He was the only one brave enough to steal the disgusting but precious food from the goblins and give it to the other slaves. He was the only slave who knew how to get from here.\n',!0)}},
qR:{"^":"a:4;",
$3:function(a,b,c){c.G(0,"",!0)}},
kE:{"^":"aG;X:c<,h:d<,b,a",
M:function(a,b){var z=b.f
if(!J.i(H.a5(z.length!==0?C.a.gE(z):null,"$isaj").a,"start_of_book"))return!1
return!0},
W:[function(a,b,c){c.q(0,"You make it to the Church undetected, slipping through one of the lower windows leading into the main hall.")
b.aj("RoomRoamingSituation").ba(b,N.aB(b),"underground_church",c)
return H.b(a.gh())+" successfully performs FleeThroughNecromancersChurch"},"$3","gR",6,0,2],
V:[function(a,b,c){c.q(0,null)
c.q(0,"You manage to slip into a Church window, but a guard notices your shadow. As he squints in your direction, you disappear into the shadowy main hall.")
N.eu(b,new V.kF())
b.aj("RoomRoamingSituation").ba(b,N.aB(b),"underground_church",c)
return H.b(a.gh())+" fails to perform FleeThroughNecromancersChurch"},"$3","gP",6,0,2],
N:function(a,b){return 0.9},
gU:function(){return!1},
ai:function(a,b){return"Will you be successful?"},
gO:function(){return},
gS:function(){return"The Underground Church will have fewer guards, so you're more likely to slip through unnoticed. Then again, you have no idea who--or what--lurks there."},
gT:function(){return!1}},
kF:{"^":"a:0;",
$1:function(a){var z
a.gbJ()
z=a.b
a.gbJ()
a.b=z+1
return a}},
kG:{"^":"aG;X:c<,h:d<,b,a",
M:function(a,b){var z=b.f
if(!J.i(H.a5(z.length!==0?C.a.gE(z):null,"$isaj").a,"start_of_book"))return!1
return!0},
W:[function(a,b,c){c.q(0,"You sneak your way into the War Forges and hide in the shadows of an alcove.")
b.aj("RoomRoamingSituation").ba(b,N.aB(b),"war_forge",c)
return H.b(a.gh())+" successfully performs FleeThroughWarForge"},"$3","gR",6,0,2],
V:[function(a,b,c){c.q(0,null)
c.q(0,"You manage to sneak into the War Forges, but a guard notices your shadow. You quickly duck into an alcove as he frowns in your direction and scratches his head.")
N.eu(b,new V.kH())
b.aj("RoomRoamingSituation").ba(b,N.aB(b),"war_forge",c)
return H.b(a.gh())+" fails to perform FleeThroughWarForge"},"$3","gP",6,0,2],
N:function(a,b){return 0.7},
gU:function(){return!1},
ai:function(a,b){return"Will you be successful?"},
gO:function(){return},
gS:function(){return"The War Forges are where the orcs build their weapons and war machines. As a slave, you\u2019re familiar with the place and it's a more direct path to freedom, but almost certainly filled with orcs."},
gT:function(){return!1}},
kH:{"^":"a:0;",
$1:function(a){var z
a.gbJ()
z=a.b
a.gbJ()
a.b=z+1
return a}},
mX:{"^":"aG;X:c<,h:d<,b,a",
M:function(a,b){var z=b.f
if(!J.i(H.a5(z.length!==0?C.a.gE(z):null,"$isaj").a,"start_of_book"))return!1
if(b.iL(this.d))return!1
return!0},
W:[function(a,b,c){c.q(0,"You search his pockets but turn up with nothing. Just then, you hear heavy footfalls approaching. Briana grabs your arm. \u201cWe\u2019ve got to go.\u201d  \n\n\nYou realize that if Agruth had something valuable on him, he would have hidden it well. You run your hand inside his vest and find a troma herb. This boosts your energy right when you need it--very handy. (Your stamina increases by 1.)")
N.rK(b,1)
return H.b(a.gh())+" successfully performs SearchAgruth"},"$3","gR",6,0,2],
V:[function(a,b,c){c.q(0,null)
c.q(0,"You search but don\u2019t find anything. Suddenly, heavy footfalls come your way. No choice--you have to go now.")
return H.b(a.gh())+" fails to perform SearchAgruth"},"$3","gP",6,0,2],
N:function(a,b){return 0.9},
gU:function(){return!1},
ai:function(a,b){return"Will you be successful?"},
gO:function(){return},
gS:function(){return"You have taken his weapon but there might be other useful items in his pocket."},
gT:function(){return!1}},
qO:{"^":"a:4;",
$3:function(a,b,c){c.G(0,"This must be the place that the orcs call the Shafts. It's a tall, seemingly endless room, with many walkways across.\n\n\n\n\n\n\nYou realize there is really only one way out, over one of the walkways. You'll have to run, there is no hiding anymore.\n",!0)}},
qP:{"^":"a:4;",
$3:function(a,b,c){c.G(0,"",!0)}},
qM:{"^":"a:4;",
$3:function(a,b,c){c.G(0,"Suddenly, an **orc** and a **goblin** jump in front of you from a slimy crevice, swords in hands.\n\n\n![Orc and Goblin](img/orc_and_goblin_sketch.jpg)\n",!0)}},
qN:{"^":"a:4;",
$3:function(a,b,c){c.G(0,"",!0)}},
qK:{"^":"a:4;",
$3:function(a,b,c){c.G(0,"The Underground Church is a dark, long, tall cave. In the distance, you see the altar. It's glowing. There are unnatural noises.\n\n\n\n\n",!0)
if(H.a5(b.c,"$isbW").b>=1)c.G(0,"You hear orders being yelled somewhere behind you.",!0)
c.G(0,"\nAfter a bit of searching, you find a twisty passage going from the right hand side of the Church.\n",!0)}},
qL:{"^":"a:4;",
$3:function(a,b,c){c.G(0,"",!0)}},
qH:{"^":"a:4;",
$3:function(a,b,c){c.G(0,'A blast of smoke and heat greets you as you enter this vast room. The roaring fire and the clanging of metal draws your attention to the far wall, where scores of orcs shovel coal into a giant furnace. These are the war forges.\n\n\nYou and Briana take a moment to stare; likely no living human has seen this and lived to tell others. Orc teams tilt huge kettles of molten steel into molds for axes, war hammers, and greatswords. They move as if in a trance, without a single complaint as they work. Strange. \n\n\nYou and Briana duck behind some carts. As you head towards what seems to be an exit, you hear strange whispering. You crane your neck and spot a dark-robed figure\u2014a priest?\u2014chanting softly to himself by the forge. Despite his whispering, his words crawl through your mind like a spider:\n\n\n> "_Pwarfa n\u2019ngen aradra._ The slow suffer. _Madraga n\u2019ngen nach santutra._ Only the hard-working prosper. _Nfarfi Arach m\u2019marrash._ The Dead Prince sees all."\n\n\n',!0)
if(H.a5(b.c,"$isbW").b>=1)c.G(0,"Somewhere behind you, a gutteral tongue bellows a string of orders. You must get moving.",!0)
c.G(0,"\nYou can guess which corridor will get you out. Fresh air is flowing into the forge through it, stirring the smoke. It's not far, and thankfully there is nobody in the way.\n",!0)}},
qJ:{"^":"a:4;",
$3:function(a,b,c){c.G(0,"",!0)}},
qF:{"^":"a:4;",
$3:function(a,b,c){c.G(0,"The crevice is small.\n",!0)}},
qG:{"^":"a:4;",
$3:function(a,b,c){c.G(0,"",!0)}},
qD:{"^":"a:4;",
$3:function(a,b,c){c.G(0,'You emerge into blinding sunlight. You moan and cover your eyes as the world spins around you and your ears ring like glass chimes. \n\n\nBriana steadies you as sway on your feet. \u201cNow is absolutely the worst time to faint.\u201d\n\n\n\u201cI\u2019m fine,\u201d you mutter. \u201cIt\u2019s just\u2026the sun\u2026been so long\u2026\u201d\n\n\nShe guides you forward and you touch the cliff wall. \u201cI don\u2019t mean to rush you, this being your big reunion with fresh air and all, but we can\u2019t stay. Orcs will be coming through here any moment, and we\'re in no shape to face them. Look at us. We should run as far from this cursed mountain as possible."\n\n\n"I\'m going to the Fort and not a step further," you say, blinking tears from your eyes.\n\n\n"Are you crazy?" She looks at you, then at the cave, then in the direction of Fort Ironcast, a few miles down the mountain slope. "You saw what\'s in the mountain. The Fort has no chance of withstanding a force that size. It will fall within a day!"\n\n\n"If the Fort falls, there\'s no place far enough from here to be safe. You know that."\n\n\nBriana frowns. "I don\'t, actually." There\'s an orcish war cry coming from somewhere down the cave. The Orcs are coming out. Briana\u2019s frown deepens to a scowl. "We\'re losing time. We may never even make it to the Fort, and here we are talking about where to go from there. Well, I see two ways out. Which way do you think we should go?\u201d \n\n\nBlinking hard, you make out your surroundings. Before you lies the winding, beaten path that leads down the mountain. Seems simple enough, but that way inevitably means more orcs.\nBut Briana points you to the edge of a nearby cliff. You peer over the edge and study the descent. Without proper gear it\u2019s a difficult climb down, but not too sheer, and likely no resistance. Perhaps you could chance it?\n',!0)}},
qE:{"^":"a:4;",
$3:function(a,b,c){c.G(0,"The cavern entrance to Mt. Bloodrock yawns before you. The wind issuing from its depths gives you the disturbing impression that it\u2019s breathing.\n",!0)}},
qB:{"^":"a:4;",
$3:function(a,b,c){c.G(0,"The Bloodrock Pass winds down the slope of mountain. Though the weather-beaten path looks well-traveled, you thankfully come across no patrols at this time. \n\n\n",!0)
if(b.iM("sneak_onto_cart"))c.G(0,"You and Briana stay quiet and still in your hiding spot. An hour later, you peek out of the cart and see that you have reached level ground. You sneak off the cart and hide behind some rocks as it drives away.",!0)
else c.G(0,"You run down the mountain side as fast as your legs can carry you. When you pause, gulping for air, you find you have nearly reached the bottom.",!0)
c.G(0,"\nA few miles further down and you will reach Fort Ironcast.\n",!0)}},
qC:{"^":"a:4;",
$3:function(a,b,c){c.G(0,"The Bloodrock pass flows snakelike down the mountain.\n",!0)}},
qz:{"^":"a:4;",
$3:function(a,b,c){c.G(0,"The pass slopes down a short way before bending to the left. You inch forward and peer around the corner. Several feet away, a stone gate looms over the pass, flanked on both sides with thick walls too high to climb. An iron gate bearing the insignia of the many-eyed octopus lies between you and freedom. \n\n\nYou spy only two pairs of orc guards standing by the gate. An ox cart is parked before them, the rider apparently negotiating passage with the keepers. From your knowledge of orcish, you can tell that the guards are demanding the driver leave them some food.\n\n\n\u201cLooks like a supply cart,\u201d Briana says. \u201cAnd likely our way out of here. We can sneak onto the back while they\u2019re distracted.\u201d\n\n\nYou don\u2019t answer. With only four distracted orcs and the cart driver, you may be able to take them by surprise.\n\n\nBriana seems to sense what you\u2019re thinking. \u201cA direct attack sounds risky. If they have an alarm, they can bring reinforcements here in a matter of moments.\u201d\n",!0)}},
qA:{"^":"a:4;",
$3:function(a,b,c){c.G(0,"The Bloodrock stone gate looms ahead of you.\n",!0)}},
rp:{"^":"a:4;",
$3:function(a,b,c){c.G(0,"The orcish guards see you approaching and raise their weapons. One of them smirks.\n\n\n\u201cWe\u2019re lucky, Ruglag!\u201d he says in a rumbling voice. \u201cToday we kill human.\u201d\n",!0)}},
qy:{"^":"a:4;",
$3:function(a,b,c){c.G(0,"The stone gate looms before you.\n",!0)}},
n7:{"^":"aG;X:c<,h:d<,b,a",
M:function(a,b){var z=b.f
if(!J.i(H.a5(z.length!==0?C.a.gE(z):null,"$isaj").a,"mountain_pass_gate"))return!1
return!0},
W:[function(a,b,c){c.q(0,"You squeeze through the burlap sacks and hide under some rags. The orcs conclude their negotiations as the driver hurls a bag of turnips to a guard. The gates split open to the rattle of chains and the ominous creak of metal hinges. The ox cart lurches forward into the mountain pass.\nIn the cart you find a small keg of beer. You decide it is worth taking.")
N.eu(b,new V.n8())
b.aj("RoomRoamingSituation").ba(b,N.aB(b),"mountain_pass",c)
return H.b(a.gh())+" successfully performs SneakOntoCart"},"$3","gR",6,0,2],
V:[function(a,b,c){throw H.c(new P.E("Success chance is 100%"))},"$3","gP",6,0,2],
N:function(a,b){return 1},
gU:function(){return!1},
ai:function(a,b){return"Will you be successful?"},
gO:function(){return},
gS:function(){return"With the guards distracted, it should be a simple matter to squeeze through the burlap sacks and hide under some rags."},
gT:function(){return!1}},
n8:{"^":"a:0;",
$1:function(a){a.gbJ()
a.a=!0
return a}},
nY:{"^":"aG;X:c<,h:d<,b,a",
M:function(a,b){var z=b.f
if(!J.i(H.a5(z.length!==0?C.a.gE(z):null,"$isaj").a,"mountain_pass_gate"))return!1
if(b.ks(this.d)!=null)return!1
return!0},
W:[function(a,b,c){c.q(0,"You sneak forward as close as you can. There are four guards in total. Two of them are distracted with talking to the cart merchant. But the other two are on the other side of the road, leaning against a large rock. They\u2019re paying attention to the argument and not much else.\n\n\nYou and Briana successfully make it to the other side of the rock. With a vicious twist you snap one orc\u2019s neck while Briana digs her knife into the other guard\u2019s gullet. You drag them behind the rock, out of sight. In one guard\u2019s pouch you find 10 gold coins. You also take an orcish shield. \n\n\nOnce done, you sneak back away from the gate.")
b.a5(a.gj(),new V.o6())
return H.b(a.gh())+" successfully performs TakeOutGateGuards"},"$3","gR",6,0,2],
V:[function(a,b,c){c.q(0,"You sneak forward as close as you can. There are four guards in total. Two of them are distracted with talking to the cart merchant. But the other two are on the other side of the road, leaning against a large rock. They\u2019re paying attention to the argument and not much else.\n\n\nYou and Briana successfully make it to the other side of that rock. As luck would have it, though, the two orcs decide to look around at that very moment. You dive behind the rock and hope they didn\u2019t see you.")
C.a.q(b.f,V.nZ())
return H.b(a.gh())+" fails to perform TakeOutGateGuards"},"$3","gP",6,0,2],
N:function(a,b){return 0.5},
gU:function(){return!1},
ai:function(a,b){return"Will you be successful?"},
gO:function(){return},
gS:function(){return"Two of the orcs seem distracted. You're not particularly good at camouflage but you can still try."},
gT:function(){return!1}},
o6:{"^":"a:0;",
$1:function(a){var z=a.gbq()
if(typeof z!=="number")return z.a4()
a.sbq(z+10)
return a}},
fL:{"^":"a0;",
gbg:function(){return[new A.bB(new V.o1(),"Take the guards out","You decide to finish the job, however improbable it seems that you\u2019ll succeed.","take_out_gate_guards_rescue",!0,null),new A.bB(new V.o2(),"Sneak away","It\u2019s too risky.","take_out_gate_guards_continuation_of_failure",!0,null)]},
gh:function(){return"take_out_gate_guards"},
as:function(){var z=new V.dU(null,null,null)
z.m(this)
new V.o3().$1(z)
return z.p()},
ay:function(a,b){if(a!==0)return
return b.a.aK(0,new V.o4())},
aI:function(a,b){return[a.aK(0,new V.o5())]}},
rl:{"^":"a:0;",
$1:function(a){var z=$.$get$a2().ac(1073741823)
a.ga6().b=z
a.ga6().c=0
return a}},
o1:{"^":"a:8;",
$4:function(a,b,c,d){J.aO(c,"Suspicious, the orcs come close to investigate the disturbance. You let one pass behind the rock, then grab the other by the throat and into a choke hold. Briana takes the other one out silently with a knife in the back. You drag them to the other side of the rock, out of sight.\n\n\nYou find 10 gold coins in a pouch attached to one of the orcs\u2019 belt. You also take an orcish shield. Then, you sneak back away from the gate.")
b.a5(a.gj(),new V.o_())
b.a5(a.gj(),new V.o0())
b.bb()
return"TakeOutGateGuardsRescueSituation resolved with rescue/continuation (Take the guards out)"}},
o_:{"^":"a:0;",
$1:function(a){var z=a.gb2()
if(typeof z!=="number")return z.aL()
a.sb2(z-1)
return a}},
o0:{"^":"a:0;",
$1:function(a){var z=a.gbq()
if(typeof z!=="number")return z.a4()
a.sbq(z+10)
return a}},
o2:{"^":"a:8;",
$4:function(a,b,c,d){J.aO(c,"Seeing that the window of opportunity has passed, you sneak away from the rock.")
b.bb()
return"TakeOutGateGuardsRescueSituation resolved with rescue/continuation (Sneak away)"}},
o3:{"^":"a:0;",
$1:function(a){var z=a.ga6().c
if(typeof z!=="number")return z.a4()
a.ga6().c=z+1
return a}},
o4:{"^":"a:0;",
$1:function(a){return a.gH()}},
o5:{"^":"a:0;",
$1:function(a){return a.gH()}},
rn:{"^":"a:4;",
$3:function(a,b,c){c.G(0,"After hours of climbing with several stops on the way, you make it all the way down to the base of the mountain. Thankfully, there are no wandering orc patrols here or any other dangers, so you decide to camp behind some rocks and rest for a few hours. Briana takes the watch.\n\n\nWhen it is your turn to go on watch, you see something that you haven\u2019t noticed before. Carved onto the rock face is what appears to be an enormous door; cunning craftsmanship has disguised it to look like part of the mountainside. You point it out to Briana when she awakens and the two of you inspect it more closely. It seems tall enough for a giant and wide enough for a herd of cattle to pass through. Yet you find no indication that is has been opened in many years. And try as you might, neither of you can find a mechanism for opening it.\n\n\nYou give up after an hour\u2019s work of inspection and leave it alone for now. Fort Ironcast still awaits you.\n",!0)}},
ro:{"^":"a:4;",
$3:function(a,b,c){c.G(0,"The great stone doors still stands unopened on the mountainside.\n",!0)}},
re:{"^":"a:4;",
$3:function(a,b,c){c.G(0,"You and Briana tie yourselves together with some rope. Then, with a deep breath you swing yourself over the side and gently find a toehold with your foot. You lower yourself to the next. And the next. \n\n\nOver the next agonizing hour, you inch your way down the mountainside. You keep looking down to see how much further is left before the slope becomes gentler, but it seems you are hardly making progress.\n\n\n\u201cRemind me again why we decided to go down this way?\u201d Briana grouses. You decide to save your breath. There\u2019s still a ways to go.\n",!0)}},
rm:{"^":"a:4;",
$3:function(a,b,c){c.G(0,"",!0)}},
o7:{"^":"aG;X:c<,h:d<,b,a",
M:function(a,b){var z=b.f
if(!J.i(H.a5(z.length!==0?C.a.gE(z):null,"$isaj").a,"winged_serpent_nest"))return!1
return!0},
W:[function(a,b,c){c.q(0,"Intimidated by your weapon, the winged serpent abandons its nest and flees to the mountaintop.")
b.aj("RoomRoamingSituation").ba(b,N.aB(b),"mountainside_base",c)
return H.b(a.gh())+" successfully performs ThreatenWingedSerpent"},"$3","gR",6,0,2],
V:[function(a,b,c){c.q(0,"The serpent does not even look at your sword as you swing it wildly. Its reptilian eyes glitter as it opens its jaws wide.")
C.a.q(b.f,V.o9())
return H.b(a.gh())+" fails to perform ThreatenWingedSerpent"},"$3","gP",6,0,2],
N:function(a,b){return 0.3},
gU:function(){return!1},
ai:function(a,b){return"Will you be successful?"},
gO:function(){return},
gS:function(){return"You have a disadvantage this high up with your backs to the mountainside."},
gT:function(){return!1}},
fQ:{"^":"a0;",
gbg:function(){return[new A.bB(new V.ob(),"Get Briana\u2019s help","Maybe your companion has an answer.","threaten_winged_serpent_rescue",!0,null),new A.bB(new V.oc(),"Face the winged serpent head on","You will attack the creature straight on.","threaten_winged_serpent_continuation_of_failure",!0,null)]},
gh:function(){return"threaten_winged_serpent"},
as:function(){var z=new V.dV(null,null,null)
z.m(this)
new V.od().$1(z)
return z.p()},
ay:function(a,b){if(a!==0)return
return b.a.aK(0,new V.oe())},
aI:function(a,b){return[a.aK(0,new V.of())]}},
rk:{"^":"a:0;",
$1:function(a){var z=$.$get$a2().ac(1073741823)
a.ga6().b=z
a.ga6().c=0
return a}},
ob:{"^":"a:8;",
$4:function(a,b,c,d){J.aO(c,"Just as the serpent strikes, Briana hurls her dagger at its wing. The weapon grazes the creature\u2019s wing just enough to keep it from directly biting you. Still, one poisoned fang grazes your skin.")
b.aj("RoomRoamingSituation").ba(b,N.aB(b),"mountainside_base",c)
b.bb()
return"ThreatenWingedSerpentRescueSituation resolved with rescue/continuation (Get Briana\u2019s help)"}},
oc:{"^":"a:8;",
$4:function(a,b,c,d){J.aO(c,"You slash at the serpent\u2019s head as it moves in to strike you!\n\n\nBut the sky is the creature\u2019s domain, and it easily weaves away from your blows before coiling itself around your sword arm. Before you can react it bites deeply into your neck. You topple over the edge of the mountain. It\u2019s now a matter of what kills you first: the fall or the venom.")
b.a5(a.gj(),new V.oa())
b.bb()
return"ThreatenWingedSerpentRescueSituation resolved with rescue/continuation (Face the winged serpent head on)"}},
oa:{"^":"a:0;",
$1:function(a){a.sau(0)
return a}},
od:{"^":"a:0;",
$1:function(a){var z=a.ga6().c
if(typeof z!=="number")return z.a4()
a.ga6().c=z+1
return a}},
oe:{"^":"a:0;",
$1:function(a){return a.gH()}},
of:{"^":"a:0;",
$1:function(a){return a.gH()}},
n9:{"^":"aG;X:c<,h:d<,b,a",
M:function(a,b){var z=b.f
if(!J.i(H.a5(z.length!==0?C.a.gE(z):null,"$isaj").a,"winged_serpent_nest"))return!1
return!0},
W:[function(a,b,c){c.q(0,"Your sibilant words reach the winged serpent\u2019s ears. It coils in the air for a while longer, then whips towards its nest to clutch possessively at its eggs. You decide it\u2019s time to move on.")
b.aj("RoomRoamingSituation").ba(b,N.aB(b),"mountainside_base",c)
return H.b(a.gh())+" successfully performs SootheWingedSerpent"},"$3","gR",6,0,2],
V:[function(a,b,c){c.q(0,"The serpent sways at your hissing, but is otherwise unimpressed as it opens its jaws menacingly.")
C.a.q(b.f,V.na())
return H.b(a.gh())+" fails to perform SootheWingedSerpent"},"$3","gP",6,0,2],
N:function(a,b){return 0.8},
gU:function(){return!1},
ai:function(a,b){return"Will you be successful?"},
gO:function(){return},
gS:function(){return"The creature is only defending its nest\u2014maybe you can convince it that you mean no harm."},
gT:function(){return!1}},
fz:{"^":"a0;",
gbg:function(){return[new A.bB(new V.nc(),"Get Briana\u2019s help","Maybe your companion has an answer.","soothe_winged_serpent_rescue",!0,null),new A.bB(new V.nd(),"Face the winged serpent head on","You will attack the creature straight on.","soothe_winged_serpent_continuation_of_failure",!0,null)]},
gh:function(){return"soothe_winged_serpent"},
as:function(){var z=new V.dS(null,null,null)
z.m(this)
new V.ne().$1(z)
return z.p()},
ay:function(a,b){if(a!==0)return
return b.a.aK(0,new V.nf())},
aI:function(a,b){return[a.aK(0,new V.ng())]}},
rj:{"^":"a:0;",
$1:function(a){var z=$.$get$a2().ac(1073741823)
a.ga6().b=z
a.ga6().c=0
return a}},
nc:{"^":"a:8;",
$4:function(a,b,c,d){J.aO(c,"Just as the serpent strikes, Briana hurls her dagger at its wing. The weapon grazes the creature\u2019s wing just enough to keep it from directly biting you. Still, one poisoned fang grazes your skin.")
b.aj("RoomRoamingSituation").ba(b,N.aB(b),"mountainside_base",c)
b.bb()
return"SootheWingedSerpentRescueSituation resolved with rescue/continuation (Get Briana\u2019s help)"}},
nd:{"^":"a:8;",
$4:function(a,b,c,d){J.aO(c,"You slash at the serpent\u2019s head as it moves in to strike you!\n\n\nBut the sky is the creature\u2019s domain, and it easily weaves away from your blows before coiling itself around your sword arm. Before you can react it bites deeply into your neck. You topple over the edge of the mountain. It\u2019s now a matter of what kills you first: the fall or the venom.")
b.a5(a.gj(),new V.nb())
b.bb()
return"SootheWingedSerpentRescueSituation resolved with rescue/continuation (Face the winged serpent head on)"}},
nb:{"^":"a:0;",
$1:function(a){a.sau(0)
return a}},
ne:{"^":"a:0;",
$1:function(a){var z=a.ga6().c
if(typeof z!=="number")return z.a4()
a.ga6().c=z+1
return a}},
nf:{"^":"a:0;",
$1:function(a){return a.gH()}},
ng:{"^":"a:0;",
$1:function(a){return a.gH()}},
o8:{"^":"aG;X:c<,h:d<,b,a",
M:function(a,b){var z=b.f
if(!J.i(H.a5(z.length!==0?C.a.gE(z):null,"$isaj").a,"winged_serpent_nest"))return!1
return!0},
W:[function(a,b,c){c.q(0,"You grab one of the eggs from the nest and hold over the edge. The serpent hovers in place, hissing loudly, but otherwise holding off its attack. \n\n\n\n\nYou grin at it as you juggle the egg from one hand to the other. With one smooth motion you cock your arm back and throw. The serpent gives a piercing cry, then launches itself after its precious offspring.\n\n\n\n\n\u201cGood thinking, throwing that egg,\u201d said Briana.\n\n\n\n\n\u201cYes, well, I just had to make it think I threw it,\u201d you say, and show her the serpent egg in your hand. \u201cI just threw the rock I had in my other hand.\u201d\n\n\n\n\nBriana whistled. \u201cThat should fetch some coin from the right merchants. Now, let\u2019s get out of here before that thing comes back.\u201d")
b.aj("RoomRoamingSituation").ba(b,N.aB(b),"mountainside_base",c)
return H.b(a.gh())+" successfully performs ThreatenWingedSerpentEggs"},"$3","gR",6,0,2],
V:[function(a,b,c){throw H.c(new P.E("Success chance is 100%"))},"$3","gP",6,0,2],
N:function(a,b){return 1},
gU:function(){return!1},
ai:function(a,b){return"Will you be successful?"},
gO:function(){return},
gS:function(){return"Perhaps you can divert its attention."},
gT:function(){return!1}},
qT:{"^":"a:4;",
$3:function(a,b,c){c.G(0,"After an hour, you find yourself at the limit of your endurance. Thankfully, you find a narrow ledge just a few feet below you. You lower yourself onto the edge and sit, leaning gratefully against the rock face. \n\n\nA few dozen feet below, you can see where the mountainside starts to slope less steeply. Perhaps you have another hour in the descent before you could rest again. \n\n\nBriana joins you, breathing hard from the exertion. \n\n\n\u201cI\u2019d rather the orcs kill us than do it ourselves,\u201d she says when she catches her breath. \u201cI\u2019d also like to stay on this ledge forever, if you don\u2019t mind.\u201d\n\n\nBefore you can reply, you spy something at the corner of your vision. Poking out from a crevice in the cliff side wall are dead leaves, branches, and dry grass. Your exhausted mind wonders about what these would be doing this far up, so you move in to investigate. \n\n\n\u201cIt\u2019s\u2026a nest?\u201d Briana says as you both peer into the crevice. Inside is a clutch of six leathery eggs.\n\n\nWhat manner of creature would build a nest here? You ask yourself. And the answer comes to you at the same time as a loud hissing noise fills the air. \n\n\nA large moss-green serpent adorned with black feathered wings hovers above you. It gives one more warning hiss, then dives to attack.\n\n\nYou must defend yourselves.\n",!0)}},
r3:{"^":"a:4;",
$3:function(a,b,c){c.G(0,"The sheer cliff of the mountainside impedes your progress.\n",!0)}},
qx:{"^":"a:4;",
$3:function(a,b,c){c.G(0,"You leave the dust of the Bloodrock mountain pass for the gentler plateaus of the Aelphremede mountain range. The road crawls along the spine of the mountains all the way to Fort Ironcast, which sits on the horizon like a sleeping sentinel.\n\n\nThe last time you saw this path you were still a child, shaking and crying, being led in chains through the grass by your orc captors. The lights from the distant Fort Ironcast may as well have been on the other side of the world. \n\n\nAnd now you are trudging the opposite way, in a bid to save the people who once failed to save you. \n\n\nA movement to your left catches your eye. You are aghast to see an orc patrol fanning out across the grasslands. \n\n\nWith only moments to act, you and Briana drop down to the grass. The patrol nears you, seemingly unconcerned with their proximity to the Fort. In a few moments they will be upon you.\n\n\nAnd right then you are seized by the presence of an alien power. Your vision blanks out as a dark and terrible voice, sonorous as a cathedral music, speaks in your mind.\n\n\n\u201cStand up.\u201d  \n\n\nYou grit your teeth and moan as the pain explodes in your skull. \u201cAren?\u201d hisses Briana. \u201cAren, what\u2019s wrong?\u201d \n\n\n\u201cGet out of my head!\u201d you moan, clutching at your head even as your legs start to lift you upright. Only Briana\u2019s death grip on your arm keeps you low in the grass. \n\n\nAnd still the voice speaks again, relentless as the sea. \u201cYou are mine,\u201d it says. \u201cYour flesh, your thoughts. Your very desires. You have run a long way, but now you will return home. Now I bid you: stand!\u201d \n\n\n\u201cNo!\u201d Yet another voice pierces your mind: Briana\u2019s. Her word cuts through the haze in your vision like a sunray. The dark voice retreats from your brain. When you come to, you are lying flat on the grass. Briana\u2019s hand is still on your arm, radiating a strange, soothing warmth that leaves you at peace.\n\n\n\u201cWhat did you...\u201d you began, but she clamps her other hand on your mouth. You peers through the grass and see the party of orcs that were passing just a few feet away. Thankfully, none of them have noticed you.\n\n\nWhen they leave, you turn to Briana. \u201cIt\u2019s a gift we fae have,\u201d she said. \u201cWe can sense possession and abjure it, at least temporarily. Seems even half-breeds like me have some talent with it. You feeling better yet?\u201d\n\n\n\u201cMuch,\u201d you reply. \u201cBriana...thanks.\u201d\n\n\n\u201cDon\u2019t mention it. You mind telling me what that...thing in your head was?\u201d\n\n\n\u201cAnother time.\u201d You get up and pull her along. \u201cRun now, talk later. Let\u2019s get to safety.\u201d\n\n\nTogether you jog all the way to the every growing silhouette of Fort Ironcast.\n",!0)}},
qI:{"^":"a:4;",
$3:function(a,b,c){c.G(0,"A dirt road streaks through the grass. In the distance, a stone fort looms.\n",!0)}},
oQ:{"^":"fL;j:a<,I:b<",
a_:function(a){var z=new V.dU(null,null,null)
z.m(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof V.fL))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
y=z==null?y==null:z===y
z=y}else z=!1
return z},
gv:function(a){return Y.R(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)))},
k:function(a){return"TakeOutGateGuardsRescueSituation {id="+J.h(this.a)+",\ntime="+J.h(this.b)+",\n}"}},
dU:{"^":"d;a,b,c",
gj:function(){return this.ga6().b},
gI:function(){return this.ga6().c},
ga6:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.a=null}return this},
m:function(a){this.a=a},
p:function(){var z,y,x
z=this.a
if(z==null){y=this.ga6().b
x=this.ga6().c
z=new V.oQ(y,x)
if(y==null)H.f(P.l("id"))
if(x==null)H.f(P.l("time"))}this.m(z)
return z}},
oS:{"^":"fQ;j:a<,I:b<",
a_:function(a){var z=new V.dV(null,null,null)
z.m(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof V.fQ))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
y=z==null?y==null:z===y
z=y}else z=!1
return z},
gv:function(a){return Y.R(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)))},
k:function(a){return"ThreatenWingedSerpentRescueSituation {id="+J.h(this.a)+",\ntime="+J.h(this.b)+",\n}"}},
dV:{"^":"d;a,b,c",
gj:function(){return this.ga6().b},
gI:function(){return this.ga6().c},
ga6:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.a=null}return this},
m:function(a){this.a=a},
p:function(){var z,y,x
z=this.a
if(z==null){y=this.ga6().b
x=this.ga6().c
z=new V.oS(y,x)
if(y==null)H.f(P.l("id"))
if(x==null)H.f(P.l("time"))}this.m(z)
return z}},
oO:{"^":"fz;j:a<,I:b<",
a_:function(a){var z=new V.dS(null,null,null)
z.m(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof V.fz))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
y=z==null?y==null:z===y
z=y}else z=!1
return z},
gv:function(a){return Y.R(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)))},
k:function(a){return"SootheWingedSerpentRescueSituation {id="+J.h(this.a)+",\ntime="+J.h(this.b)+",\n}"}},
dS:{"^":"d;a,b,c",
gj:function(){return this.ga6().b},
gI:function(){return this.ga6().c},
ga6:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.a=null}return this},
m:function(a){this.a=a},
p:function(){var z,y,x
z=this.a
if(z==null){y=this.ga6().b
x=this.ga6().c
z=new V.oO(y,x)
if(y==null)H.f(P.l("id"))
if(x==null)H.f(P.l("time"))}this.m(z)
return z}}}],["","",,N,{"^":"",
uH:[function(a){return[N.eb(),N.hm()]},"$1","u4",2,0,13],
uI:[function(a){return[R.b6(1000+$.$get$d1().ac(999999),"Agruth",null,null,new G.c9("scimitar",1,P.bv(C.r,null)),null,0,2,100,!1,2,!0,C.t,0,$.$get$ch())]},"$1","u5",2,0,13],
aB:function(a){return a.giO().aK(0,new N.rI())},
rK:function(a,b){a.a5(N.aB(a).gj(),new N.rL(b))},
uL:[function(a){if(a.fm("take_out_gate_guards")||a.fm("take_out_gate_guards_rescue"))return[N.eb()]
else return[N.eb(),N.hm()]},"$1","u6",2,0,13],
eu:function(a,b){var z,y
z=H.a5(a.c,"$isbW")
z.toString
y=new M.dY(null,!1,0)
y.m(z)
a.c=b.$1(y).p()},
hm:function(){return R.b6(1000+$.$get$d1().ac(999999),"goblin",O.d5(),null,new G.c9("scimitar",1,P.bv(C.r,null)),null,0,1,0,!1,1,!1,C.t,0,$.$get$ch())},
eb:function(){return R.b6(1000+$.$get$d1().ac(999999),"orc",O.d5(),null,new G.c9("sword",1,P.bv(C.r,null)),null,0,2,0,!1,2,!1,C.t,0,$.$get$ch())},
rI:{"^":"a:0;",
$1:function(a){return a.gH()}},
rL:{"^":"a:0;a",
$1:function(a){var z=a.gb2()
if(typeof z!=="number")return z.a4()
a.sb2(z+this.a)
return a}}}],["","",,O,{"^":"",
uG:[function(a){var z,y
z=$.$get$d9()
y=z.w
if(y.length>0){y+=" "
z.w=y}z.w=y+a},"$1","t4",2,0,14],
uJ:[function(a){$.ek=a},"$1","t5",2,0,14],
hB:[function(a,b,c,d,e,f,g){var z=L.eG(a,!1,!1,d,e,f,g)
$.$get$bN().q(0,z)
return z},function(a){return O.hB(a,!1,!1,null,null,null,null)},function(a,b,c){return O.hB(a,!1,!1,null,b,c,null)},"$7$deferToChoiceList$deferToEndOfPage$goto$helpMessage$script$submenu","$1","$3$helpMessage$script","t3",2,13,50,0,0,0,1,1,0],
my:{"^":"mK;",
bp:function(){var z=0,y=P.av(),x,w=2,v,u=[],t=this,s,r,q,p,o,n,m,l,k,j
var $async$bp=P.as(function(a,b){if(a===1){v=b
z=w}while(true)switch(z){case 0:if($.cS){n=t.Q
n.toString
m=new A.t(667,null,null,null,null)
m.c="Sending updated stats."
n.a.D(m.B())
m=t.Q
n=Z.nm()
m.toString
l=new A.t(100,null,null,null,null)
l.e=n.B()
m.a.D(l.B())
new P.C(0,$.p,null,[null]).bs(!0)}if(t.r){n=t.Q
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
return P.ar(t.cn(),$async$bp)
case 10:s=b
w=2
z=9
break
case 7:w=6
j=v
n=H.z(j)
if(n instanceof M.cq){r=n
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
case 9:case 4:if(J.i(s,!1)){z=3
break}case 5:n=t.Q
n.toString
m=new A.t(667,null,null,null,null)
m.c="Ending _goOneStep() loop."
n.a.D(m.B())
case 1:return P.ay(x,y)
case 2:return P.ax(v,y)}})
return P.az($async$bp,y)},
eB:function(){var z,y
this.f7()
this.f.b_(0)
this.r=!0
this.e=this.c
z=this.Q
Z.h3(Z.bE())
z.toString
y=new A.t(90,null,null,null,null)
y.b=Z.bE()
z.a.D(y.B())
this.bp()},
kK:[function(a){var z,y
z={}
z.a=null
y=$.$get$bN()
y.L(0,new O.mV(z,this,a))
z=z.a
if(z==null)throw H.c(P.G("The sent choice hash ("+H.b(a)+") is not one of those offered ("+J.h(y)+")"))
this.is(z)
this.bp()},"$1","gia",2,0,32],
is:function(a){var z
if(a.gfF()!=null){z=a.r
$.$get$cf().av(z)}z=a.x
if(z!=null)this.ea(z)},
cn:function(){var z=0,y=P.av(),x,w=[],v=this,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c
var $async$cn=P.as(function(a,a0){if(a===1)return P.ax(a0,y)
while(true)switch(z){case 0:u={}
r=$.$get$cg()
q=r.b
if(q.b!==q.c){u=v.Q
u.toString
q=new A.t(667,null,null,null,null)
q.c="Awarding points."
u.a.D(q.B())
p=r.b.dn()
r=v.Q
q=p.gj2()
u=p.b
o=p.c
r.toString
n=new A.t(70,null,null,null,null)
n.b=[q,u]
n.c=o
r.a.D(n.B())
r=new P.C(0,$.p,null,[null])
r.bs(null)
r.bW(new O.mL(v))
x=!0
z=1
break}m=v.x===v.e.gat().length-1||v.x===v.y
u.a=m
r=v.x
q=v.y
if(r!==q)if(r!=null){if(r<v.e.gat().length){r=v.e.gat()
o=v.x
if(o>>>0!==o||o>=r.length){x=H.e(r,o)
z=1
break}o=!!J.n(r[o]).$isJ
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
k.i7(new O.mM(v),!1)
if(k.gl(k)!==0){r=v.Q
r.toString
o=new A.t(667,null,null,null,null)
o.c="We have choices."
r.a.D(o.B())
o=H.x(k,"b0",0)
o=P.T(new H.I(k,new O.mN(u,l),[o]),!0,o)
r=k.a
H.r([],[L.a4])
j=new L.eH(r,o)
if(!j.gK(j)){u=v.Q
r=u.e
if(r!=null){r.dc(new D.bU("Showing new choice before previous one was selected."))
u.e=null}r=P.u
u.e=new P.ca(new P.C(0,$.p,null,[r]),[r])
r=j.dt()
u.a.D(r.B())
u=u.e.a.bW(v.gia())
i=new O.mO(v)
r=H.m(u,0)
q=$.p
if(q!==C.h){i=P.ec(i,q)
q.toString}u.cY(new P.e4(null,new P.C(0,q,null,[r]),6,new O.mP(),i,[r,r]))
x=!0
z=1
break}else{h=k.b7(0,new O.mQ(),new O.mR())
if(h!=null){if(h.gfF()!=null){r=h.r
$.$get$cf().av(r)}r=h.x
if(r!=null)v.ea(r)
k.a7(0,h)}}}r=$.$get$cf()
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
return P.ar(v.cp(f),$async$cn)
case 5:x=a0
z=1
break
case 4:r=$.ek
if(r!=null){v.ea(r)
$.ek=null
x=!1
z=1
break}r=v.x
if(r==null){v.x=0
r=0}else if(r===q){r=v.e.gat().length-1
v.x=r}else if($.hp)$.hp=!1
else{++r
v.x=r}u.a=r===v.e.gat().length-1
r="Resolving block: '"+H.b(v.e.gh())+"' block "+H.b(v.x)+"."
q=v.Q
q.toString
o=new A.t(667,null,null,null,null)
o.c=r
q.a.D(o.B())
if(v.x===v.e.gat().length){u=v.Q
u.toString
r=new A.t(667,null,null,null,null)
r.c="End of book."
u.a.D(r.B())
r=v.Q
u=v.dT()
r.toString
u=u.eE(50)
r.a.D(u.B())
v.Q.a.D(new A.t(80,null,null,null,null).B())
x=!0
z=1
break}r=v.e.gat()
q=v.x
if(q>>>0!==q||q>=r.length){x=H.e(r,q)
z=1
break}q=r[q]
z=typeof q==="string"?6:8
break
case 6:u=v.Q
r=v.e.gat()
q=v.x
if(q>>>0!==q||q>=r.length){x=H.e(r,q)
z=1
break}q=r[q]
r=P.Y
u.f=new P.ca(new P.C(0,$.p,null,[r]),[r])
r=new A.t(30,null,null,null,null)
r.c=q
u.a.D(r.B())
u.f.a.bW(new O.mS(v))
x=!0
z=1
break
z=7
break
case 8:r=v.e.gat()
q=v.x
if(q>>>0!==q||q>=r.length){x=H.e(r,q)
z=1
break}z=!!J.n(r[q]).$isJ?9:11
break
case 9:r=v.Q
r.toString
q=new A.t(667,null,null,null,null)
q.c="A ChoiceList encountered."
r.a.D(q.B())
try{r=v.e.gat()
q=v.x
if(q>>>0!==q||q>=r.length){x=H.e(r,q)
z=1
break}k.j_(r[q])}catch(b){u=H.z(b)
if(u instanceof M.cq){t=u
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
if(k.bP(0,new O.mT(u,v))&&v.x===v.e.gat().length-1){u=v.Q
u.toString
r=new A.t(667,null,null,null,null)
r.c="Creating & sending savegame"
u.a.D(r.B())
r=v.Q
u=v.dT()
r.toString
u=u.eE(50)
r.a.D(u.B())
x=!1
z=1
break}x=!1
z=1
break
z=10
break
case 11:r=v.e.gat()
q=v.x
if(q>>>0!==q||q>=r.length){x=H.e(r,q)
z=1
break}q=r[q]
r={func:1,ret:[P.N,P.ao]}
z=H.at(q,r)?12:14
break
case 12:d=v.x===v.e.gat().length-1?v.dT():null
q=v.e.gat()
o=v.x
if(o>>>0!==o||o>=q.length){x=H.e(q,o)
z=1
break}z=15
return P.ar(v.cp(H.hH(q[o],r)),$async$cn)
case 15:c=a0
if(k.bP(0,new O.mU(u,v))&&v.x===v.e.gat().length-1){u=v.Q
u.toString
r=d.eE(50)
u.a.D(r.B())}x=c
z=1
break
z=13
break
case 14:u=v.e.gat()
r=v.x
if(r>>>0!==r||r>=u.length){x=H.e(u,r)
z=1
break}throw H.c(new P.E("Invalid block: "+H.b(u[r])))
case 13:case 10:case 7:case 1:return P.ay(x,y)}})
return P.az($async$cn,y)},
ea:function(a){var z,y,x,w,v
z=$.$get$cu()
if(z.b.test(H.bo(a))){y=this.d
if(y==null)throw H.c(new P.E("Cannot use ["+J.h(z)+"] when there is no _preGotoPosition."))
x=y.a
z=y.b
if(typeof z!=="number")return z.aL()
w=z-1}else{x=this.b.dC(a,this.e.gdE())
if(x==null)throw H.c("Function goto() called with an invalid argument '"+H.b(a)+"'. No such page.")
w=null}z=this.d
y=z==null
if((y?null:z.a)!=null){z=y?null:z.a
y=this.e
this.f.q(0,H.b(z.gh())+">>"+H.b(y.gh()))
this.r=!0}if(this.f.Z(0,H.b(this.e.gh())+">>"+H.b(x.gh()))||x.ghe()){z=this.d
y=z==null
if((y?null:z.a)!=null)z=!(y?null:z.a).ghe()
else z=!1}else z=!1
$.hn=z
z="Points embargo = "+z
y=this.Q
y.toString
v=new A.t(667,null,null,null,null)
v.c=z
y.a.D(v.B())
v=this.e
this.d=new O.mz(v,this.x)
this.e=x
this.x=w
v.e=J.al(v.gdv(),1)},
f7:function(){var z,y,x,w,v,u
this.x=null
$.$get$cf().b_(0)
$.$get$bN().sl(0,0)
$.qd=null
x=$.$get$ck()
x.b_(0)
w=$.$get$cg()
x.n(0,"points",w)
w.a=0
w.b.b_(0)
this.b.j5()
$.hQ=!0
try{this.jG()}catch(v){z=H.z(v)
y=H.A(v)
x=this.Q
w=H.b(z)+"\n"+H.b(y)
x.toString
u=new A.t(666,null,null,null,null)
u.c="Author Exception in initBlock() (<variables>): "+w
x.a.D(u.B())
throw H.c(z)}this.h0()
$.hQ=!1},
cp:function(a){var z=0,y=P.av(),x,w=2,v,u=[],t=this,s,r,q,p,o,n,m
var $async$cp=P.as(function(b,c){if(b===1){v=c
z=w}while(true)switch(z){case 0:q=$.$get$d9()
q.w=""
w=4
z=7
return P.ar(a.$0(),$async$cp)
case 7:w=2
z=6
break
case 4:w=3
m=v
s=H.z(m)
r=H.A(m)
q.w+="<code><pre>ERROR: "+H.b(s)+"\n\n"+H.b(r)+"</pre></code>"
q=J.h(s)
o=t.e.gh()
n=t.x
throw H.c(new M.cq(q,o,n))
z=6
break
case 3:z=2
break
case 6:if(q.w.length!==0){t.Q.eL(J.h(q)).bW(new O.mW(t))
x=!0
z=1
break}else{x=!1
z=1
break}case 1:return P.ay(x,y)
case 2:return P.ax(v,y)}})
return P.az($async$cp,y)},
ij:[function(a){var z,y,x,w
z=a.x
if(z==null)return!1
if($.$get$cu().b.test(H.bo(z)))return!1
y=this.b.dC(z,this.e.gdE())
if(y==null){z="Target page '"+H.b(z)+"' was not found."
x=this.Q
x.toString
w=new A.t(667,null,null,null,null)
w.c=z
x.a.D(w.B())
return!0}y.gkB()
return!1},"$1","gfb",2,0,43],
dT:function(){var z,y,x,w,v,u
this.h0()
try{x=this.e.gh()
w=$.$get$ck()
x=new Z.fp(x,this.b.jq(),null,null,null,null)
x.c=H.aC(Z.cO(w),"$isD",[P.q,P.d],"$asD")
x.f=Date.now()
x.e=C.d.ky(H.aw(x),16)
return x}catch(v){z=H.z(v)
y=H.A(v)
x=this.Q
w=H.b(z)+"\n"+H.b(y)
x.toString
u=new A.t(666,null,null,null,null)
u.c="Error when creating savegame: "+w
x.a.D(u.B())
throw H.c(z)}},
fP:function(a,b){var z,y,x
this.f7()
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
z.jD(a.b)
if(b!=null){z=this.Q
z.toString
y=new A.t(667,null,null,null,null)
y.c="Importing player chronology."
z.a.D(y.B())
this.f.ar(0,b)}z=this.Q
z.toString
y=new A.t(667,null,null,null,null)
y.c="Copying save variables into vars."
z.a.D(y.B())
y=$.$get$ck()
Z.mv(a,y,P.du(P.q,P.bu))
this.cx=H.a5(y.i(0,"game"),"$iseO")
this.cy=H.aC(y.i(0,"hitpoints"),"$isap",[P.aN],"$asap")
z=[P.u]
this.db=H.aC(y.i(0,"stamina"),"$isap",z,"$asap")
this.dx=H.aC(y.i(0,"gold"),"$isap",z,"$asap")
z=this.Q
Z.h3(Z.bE())
z.toString
y=new A.t(90,null,null,null,null)
y.b=Z.bE()
z.a.D(y.B())
y=this.Q
y.toString
z=new A.t(667,null,null,null,null)
z.c="loadFromSaveGame() done."
y.a.D(z.B())
this.bp()},
jV:function(a){return this.fP(a,null)},
dG:[function(a,b,c,d){var z=0,y=P.av(),x,w=this,v,u,t
var $async$dG=P.as(function(e,f){if(e===1)return P.ax(f,y)
while(true)switch(z){case 0:v=$.$get$d9()
if(v.w.length!==0){w.Q.eL(J.h(v))
v.w=""}v=w.Q
v.toString
u=new A.t(130,null,null,null,null)
u.b=[a,b,d,c]
v.a.D(u.B())
u=U.c7
t=new P.C(0,$.p,null,[u])
v.x=new P.ca(t,[u])
x=t
z=1
break
case 1:return P.ay(x,y)}})
return P.az($async$dG,y)},function(a,b){return this.dG(a,b,null,!1)},"kG","$4$rerollEffectDescription$rerollable","$2","ghz",4,5,34,1,0]},
mV:{"^":"a:0;a,b,c",
$1:function(a){var z,y,x,w
a.seM(!0)
if(a.d===this.c){z="Found choice that was selected: "+a.e
y=this.b.Q
y.toString
x=new A.t(667,null,null,null,null)
x.c=z
y.a.D(x.B())
this.a.a=a}else{z=a.x
if(z!=null){y=this.b
w=$.$get$cu().b.test(H.bo(z))?y.d.a:y.b.dC(z,y.e.gdE())
if(w!=null){y.f.q(0,H.b(y.e.gh())+">>"+H.b(w.gh()))
y.r=!0}}}}},
mL:{"^":"a:0;a",
$1:function(a){return this.a.bp()}},
mM:{"^":"a:0;a",
$1:function(a){return a.geM()||this.a.ij(a)}},
mN:{"^":"a:35;a,b",
$1:function(a){return a.jN(this.b,this.a.a)}},
mO:{"^":"a:0;a",
$1:function(a){var z,y,x
z=H.b(a)
y=this.a.Q
y.toString
x=new A.t(667,null,null,null,null)
x.c=z
y.a.D(x.B())
return}},
mP:{"^":"a:0;",
$1:function(a){return a instanceof D.bU}},
mQ:{"^":"a:0;",
$1:function(a){return a.gjO()}},
mR:{"^":"a:1;",
$0:function(){return}},
mS:{"^":"a:0;a",
$1:function(a){return this.a.bp()}},
mT:{"^":"a:0;a,b",
$1:function(a){return a.df(!0,this.a.a,this.b.gfb())}},
mU:{"^":"a:0;a,b",
$1:function(a){return a.df(!0,this.a.a,this.b.gfb())}},
mW:{"^":"a:0;a",
$1:function(a){return this.a.bp()}},
lT:{"^":"d;a,b,fz:c<",
iR:function(a,b,c){var z
if(!$.hn){z=J.al(this.a,b)
this.a=z
this.b.av(new A.cI(b,z,c))}},
q:function(a,b){return this.iR(a,b,null)},
a4:function(a,b){this.q(0,b)
return this},
B:function(){return P.ah(["points",this.a])},
hd:function(a){this.a=a.i(0,"points")
this.b.b_(0)},
hI:function(){this.b=P.b1(null,A.cI)},
$isdP:1},
cP:{"^":"lC;at:d<,dv:e@,a,b,c",
ghe:function(){return J.a3(this.e,0)}},
mz:{"^":"d;a,b"},
mG:{"^":"d;a",
i:function(a,b){return this.a.i(0,b)},
dC:function(a,b){var z
if(b!=null&&this.a.a1(b+": "+H.b(a)))return this.a.i(0,H.b(b)+": "+H.b(a))
else{z=this.a
if(z.a1(a))return z.i(0,a)
else return}},
n:function(a,b,c){this.a.n(0,b,c)
c.sh(b)},
jq:function(){var z=new H.O(0,null,null,null,null,null,0,[P.q,null])
this.a.L(0,new O.mI(z))
return z},
jD:function(a){a.L(0,new O.mJ(this))},
j5:function(){this.a.L(0,new O.mH())}},
mI:{"^":"a:7;a",
$2:function(a,b){this.a.n(0,a,P.ah(["visitCount",b.gdv()]))}},
mJ:{"^":"a:7;a",
$2:function(a,b){var z=this.a.a
if(z.a1(a))z.i(0,a).sdv(J.au(b,"visitCount"))}},
mH:{"^":"a:7;",
$2:function(a,b){b.sdv(0)}}}],["","",,M,{"^":"",cq:{"^":"d;a,b,c",
k:function(a){return"AuthorScriptException at page '"+H.b(this.b)+"', block #"+H.b(this.c)+": "+H.b(this.a)},
A:{
eA:function(a){return new M.cq(a,null,null)}}}}],["","",,M,{"^":"",mK:{"^":"d;"}}],["","",,Z,{"^":"",fp:{"^":"d;a,b,c,d,e,f",
eE:function(a){var z
if(a!==50&&a!==1020)throw H.c("Cannot create Message of type "+a+". Can only be MSG_SAVE_GAME (50) or MSG_LOAD_GAME (1020).")
z=new A.t(a,null,null,null,null)
z.c=this.ds()
return z},
ds:function(){var z,y
z=new H.O(0,null,null,null,null,null,0,[P.q,null])
z.n(0,"uid",this.e)
z.n(0,"currentPageName",this.a)
z.n(0,"pageMapState",this.b)
z.n(0,"vars",this.c)
z.n(0,"timestamp",this.f)
y=this.d
if(y!=null)z.n(0,"previousText",y)
return C.w.fD(z)},
k:function(a){return this.ds()},
A:{
fq:function(a){var z,y
if(a!=null)if(typeof a!=="string"){if(typeof a!=="number"||Math.floor(a)!==a)if(typeof a!=="number")if(typeof a!=="boolean"){z=J.n(a)
z=!!z.$isJ||!!z.$isD}else z=!0
else z=!0
else z=!0
y=z}else y=!0
else y=!0
if(y)return!0
return!!J.n(a).$isdP},
cO:function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"&&Math.floor(a)===a||typeof a==="number"||typeof a==="boolean")return a
else{z=J.n(a)
if(!!z.$isJ){y=[]
for(x=0;x<z.gl(a);++x)if(Z.fq(z.i(a,x)))y.push(Z.cO(z.i(a,x)))
return y}else if(!!z.$isD){w=new H.O(0,null,null,null,null,null,0,[null,null])
z.L(a,new Z.mu(a,w))
return w}else if(!!z.$isdP){v=a.B()
v.n(0,"_class",a.gfz())
return Z.cO(v)}else throw H.c("Function _dissolveToPrimitivess called with a non-saveable argument type.")}},
cN:function(a,b,c){var z,y,x,w,v,u
if(a==null||typeof a==="string"||typeof a==="number"&&Math.floor(a)===a||typeof a==="number"||typeof a==="boolean")return a
else{z=J.n(a)
if(!!z.$isJ){y=[]
for(x=0;x<z.gl(a);++x)y.push(Z.cN(z.i(a,x),b,null))
return y}else{w=!!z.$isD
if(w&&!a.a1("_class")){v=new H.O(0,null,null,null,null,null,0,[null,null])
z.L(a,new Z.mt(b,v))
return v}else if(w&&a.a1("_class"))if(c!=null){c.hd(a)
return c}else{u=z.i(a,"_class")
if(!b.a1(u))throw H.c(new Z.dl("Constructor for "+H.b(u)+" not set. Cannot assemble a new instance."))
else return b.i(0,u).$1(a)}else throw H.c("Function _assembleFromPrimitives called with a non-primitive argument type.")}}},
mv:function(a,b,c){a.c.L(0,new Z.mw(b,c))}}},mu:{"^":"a:7;a,b",
$2:function(a,b){if(Z.fq(this.a.i(0,a)))this.b.n(0,a,Z.cO(b))}},mt:{"^":"a:7;a,b",
$2:function(a,b){this.b.n(0,a,Z.cN(b,this.a,null))}},mw:{"^":"a:36;a,b",
$2:function(a,b){var z,y,x
z=this.a
y=z.i(0,a)
x=this.b
if(y==null)z.n(0,a,Z.cN(b,x,null))
else z.n(0,a,Z.cN(b,x,y))}},dl:{"^":"d;a",
k:function(a){return"IncompatibleSavegameException: "+this.a}},kK:{"^":"d;a",
k:function(a){return"InvalidSavegameException: "+this.a}}}],["","",,D,{"^":"",lZ:{"^":"d;"},lY:{"^":"lZ;"},kS:{"^":"lY;a,b,c,d,e,f,r,x",
kO:[function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
o=P.q
n=[o,P.d]
H.aC(a,"$isD",n,"$asD")
m=new A.t(a.i(0,"type"),null,null,null,null)
if(a.a1("strContent"))m.c=a.i(0,"strContent")
if(a.a1("listContent"))m.b=a.i(0,"listContent")
if(a.a1("intContent"))m.d=a.i(0,"intContent")
if(a.a1("mapContent"))m.e=H.aC(a.i(0,"mapContent"),"$isD",n,"$asD")
z=m
switch(z.ghb()){case 1070:o=this.e
if(o!=null){o.dc(new D.bU("Book Quit before choice was selected."))
this.e=null}o=this.b
o.a.bh()
o.b.bh()
return
case 1000:o=new A.t(667,null,null,null,null)
o.c="GET_BOOK_UID received."
n=this.a
n.D(o.B())
n.D(new A.t(10,null,this.c.ch,null,null).B())
return
case 1050:l=z.gjH()
this.e.bQ(l)
this.e=null
return
case 1060:o=new A.t(667,null,null,null,null)
o.c="New form state from player received."
this.a.D(o.B())
o=z.gjX()
if(!o.a1("__submitted__"))o.n(0,"__submitted__",!1)
n=this.r
if(n.b>=4)H.f(n.ci())
n.bK(new G.jy(o))
return
case 1080:o=new A.t(667,null,null,null,null)
o.c="Received slot machine result."
this.a.D(o.B())
k=J.au(z.gew(),0)
j=J.au(z.gew(),1)
o=this.x
if(k>>>0!==k||k>=4)return H.e(C.A,k)
o.bQ(new U.c7(C.A[k],j))
this.x=null
return
case 1010:o=new A.t(667,null,null,null,null)
o.c="Starting book from scratch."
n=this.a
n.D(o.B())
o=this.e
if(o!=null){o.dc(new D.bU("Book Restart before choice was selected."))
this.e=null}try{this.c.eB()}catch(i){y=H.z(i)
x=H.A(i)
o=new A.t(666,null,null,null,null)
o.c="An error occured when initializing: "+H.b(y)+".\n"+H.b(x)
n.D(o.B())
throw H.c(y)}o=new A.t(90,null,null,null,null)
o.b=Z.bE()
n.D(o.B())
n.D(new A.cI(0,0,null).dt().B())
return
case 1020:h=new A.t(667,null,null,null,null)
h.c="Loading a saved game."
g=this.a
g.D(h.B())
h=this.e
if(h!=null){h.dc(new D.bU("Book Load before choice was selected."))
this.e=null}try{h=z.ghD()
f=new Z.fp(null,null,null,null,null,null)
e=H.aC(C.w.jc(h),"$isD",n,"$asD")
if(!e.a1("currentPageName")||!e.a1("vars"))H.f(new Z.kK("Invalid JSON for Savegame. Doesn't contain required fields 'currentPageName' or 'vars'. JSON='"+H.b(h)+"'."))
f.e=e.i(0,"uid")
f.a=e.i(0,"currentPageName")
f.f=e.i(0,"timestamp")
f.b=H.aC(e.i(0,"pageMapState"),"$isD",n,"$asD")
f.c=H.aC(e.i(0,"vars"),"$isD",n,"$asD")
if(e.a1("previousText"))f.d=e.i(0,"previousText")
w=f
v=H.aC(J.iq(z.gew()),"$isbA",[o],"$asbA")
o=this.c
if(v!=null)o.fP(w,v)
else o.jV(w)}catch(i){o=H.z(i)
if(o instanceof Z.dl){u=o
t=H.A(i)
o=new A.t(666,null,null,null,null)
o.c="Load failed due to incompatibility: "+H.b(u)+".\n"+H.b(t)
g.D(o.B())
this.c.eB()}else{s=o
r=H.A(i)
o=new A.t(666,null,null,null,null)
o.c="Load failed for unknown reason: "+H.b(s)+".\n"+H.b(r)
g.D(o.B())
this.c.eB()}}try{o=new A.t(90,null,null,null,null)
o.b=Z.bE()
g.D(o.B())}catch(i){q=H.z(i)
p=H.A(i)
o=new A.t(666,null,null,null,null)
o.c="Sending Stats failed for unknown reason: "+H.b(q)+".\n"+H.b(p)
g.D(o.B())
throw H.c(q)}this.c.toString
g.D(new A.cI(0,$.$get$cg().a,null).dt().B())
return
case 1090:this.f.bQ(!0)
this.f=null
return
case 1040:this.c.bp()
return
default:o=new A.t(666,null,null,null,null)
o.c="Wrong message type received by Scripter - "+H.b(z.ghb())+"."
this.a.D(o.B())}},"$1","giq",2,0,19],
eL:function(a){var z=P.Y
this.f=new P.ca(new P.C(0,$.p,null,[z]),[z])
z=new A.t(30,null,null,null,null)
z.c=a
this.a.D(z.B())
return this.f.a}},bU:{"^":"d;a",
k:function(a){return"AsyncOperationOverridenException: "+this.a+"."}}}],["","",,G,{"^":"",jy:{"^":"d;a",
B:function(){return P.c1(this.a,null,null)},
k:function(a){return"<CurrentState submitted="+H.b(this.a.i(0,"__submitted__"))+">"}}}],["","",,A,{"^":"",t:{"^":"d;hb:a<,ew:b<,hD:c<,jH:d<,jX:e<",
gkA:function(){var z=this.a
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
ds:function(){return C.w.fD(this.B())},
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
z="Message "+this.gkA()
y=this.a
x=J.n(y)
return z+(x.u(y,50)||x.u(y,60)||x.u(y,90)||x.u(y,100)||x.u(y,666)||x.u(y,667)?" (async)":"")}}}],["","",,E,{"^":"",lC:{"^":"d;h:a@,kB:b<",
k:function(a){return this.a},
gdE:function(){var z,y
z=this.a
if(z==null)throw H.c("Accessed groupName Page has name = null.")
y=J.ik(z,": ")
if(y>0)return J.ip(this.a,0,y)
else return}}}],["","",,A,{"^":"",cI:{"^":"d;j2:a<,b,c",
k:function(a){var z="Score +"+H.b(this.a)+"."
return z},
dt:function(){var z=new A.t(70,null,null,null,null)
z.b=[this.a,this.b]
z.c=this.c
return z}}}],["","",,L,{"^":"",a4:{"^":"d;eM:a@,b,c,d,aS:e<,S:f<,fF:r<,x,y",
gjO:function(){return this.e.length===0},
df:function(a,b,c){if(this.a)return!1
if(this.e.length===0)return!1
b!=null
a!=null
if(c!=null&&c.$1(this)===!0)return!1
return!0},
jN:function(a,b){return this.df(a,b,null)},
kw:function(){return P.ah(["string",this.e,"hash",this.d,"submenu",this.y,"helpMessage",this.f])},
bW:function(a){this.r=a
return this},
bu:function(a,b){return C.b.bu(this.e,b.gaS())},
k:function(a){return"Choice: "+this.e+" ["+H.b(this.x)+"] ("+this.d+")"},
hG:function(a,b,c,d,e,f,g){if(a==null)throw H.c(P.G("String given to choice cannot be null."))
this.e=J.aW(a).eF(a)
this.d=C.b.gv(a)
this.r=f
this.b=!1
this.c=!1},
$isS:1,
$asS:function(){return[L.a4]},
A:{
eG:function(a,b,c,d,e,f,g){var z=new L.a4(!1,null,null,null,null,e,null,d,g)
z.hG(a,!1,!1,d,e,f,g)
return z}}},eH:{"^":"f4;a,b",
gl:function(a){return this.b.length},
sl:function(a,b){C.a.sl(this.b,b)
return b},
i:function(a,b){var z=this.b
if(b>>>0!==b||b>=z.length)return H.e(z,b)
return z[b]},
n:function(a,b,c){var z=this.b
if(b>>>0!==b||b>=z.length)return H.e(z,b)
z[b]=c},
j_:function(a){var z,y,x,w,v,u,t,s,r,q,p,o
if(J.au(a,0)!=null){if(0>=a.length)return H.e(a,0)
v=!!J.n(a[0]).$isbu}else v=!1
if(v)try{if(0>=a.length)return H.e(a,0)
this.a=a[0].$0()}catch(u){z=H.z(u)
v=M.eA(J.h(z))
throw H.c(v)}else this.a=null
for(v=this.b,t={func:1,ret:[P.N,P.ao]},s=1;s<a.length;++s){y=a[s]
x=null
if(J.au(y,"string")!=null&&!!J.n(J.au(y,"string")).$isbu)try{x=J.au(y,"string").$0()}catch(u){w=H.z(u)
v=M.eA(J.h(w))
throw H.c(v)}else x=""
r=x
q=J.au(y,"goto")
p=H.hH(J.au(y,"script"),t)
o=new L.a4(!1,null,null,null,null,null,null,q,J.au(y,"submenu"))
if(r==null)H.f(P.G("String given to choice cannot be null."))
o.e=J.aW(r).eF(r)
o.d=C.b.gv(r)
o.r=p
o.b=!1
o.c=!1
C.a.q(v,o)}},
iW:function(a,b,c,d,e,f,g){if(b instanceof L.a4)C.a.q(this.b,b)
else if(typeof b==="string")C.a.q(this.b,L.eG(b,!1,!1,e,null,f,g))
else throw H.c(P.G("To add a choice to choices, one must provide either a new Choice element or a String."))},
q:function(a,b){return this.iW(a,b,!1,!1,null,null,null)},
kx:function(a,b,c,d){var z,y,x,w
z=this.b
y=H.m(z,0)
x=P.T(new H.I(z,new L.jd(b,a,c),[y]),!0,y)
if(x.length===0)throw H.c("Choices is empty, but still choices.toMessage was called.")
w=new A.t(40,null,null,null,null)
z=[]
w.b=z
z.push(d)
z.push(this.a)
C.a.L(x,new L.je(w))
return w},
dt:function(){return this.kx(null,null,null,null)},
k:function(a){var z=this.b
return new H.an(z,new L.jf(),[H.m(z,0),null]).cG(0,", ")},
$asf4:function(){return[L.a4]},
$asfa:function(){return[L.a4]},
$asJ:function(){return[L.a4]},
$asV:function(){return[L.a4]}},jd:{"^":"a:0;a,b,c",
$1:function(a){return a.df(this.b,this.a,this.c)}},je:{"^":"a:0;a",
$1:function(a){H.b(a)
J.aO(this.a.b,a.kw())
a.a=!0}},jf:{"^":"a:0;",
$1:function(a){return H.b(a)}}}],["","",,Z,{"^":"",cQ:{"^":"d;cX:a<,aS:b<",
B:function(){return P.ah(["show",this.a,"string",this.b])}},nj:{"^":"d;a",
B:function(){var z=new H.O(0,null,null,null,null,null,0,[P.q,P.d])
this.a.L(0,new Z.nk(z))
return z},
L:function(a,b){this.a.L(0,b)}},nk:{"^":"a:37;a",
$2:function(a,b){this.a.n(0,a,b.B())}},h2:{"^":"d;h:a@,b5:b<,fA:c<,dl:d<,cX:e<,fV:f<,aS:r<",A:{
h3:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=H.r(new Array(a.length),[Z.h2])
for(y=a.length,x=z.length,w=0,v=0;v<a.length;a.length===y||(0,H.ak)(a),++v){u=a[v]
t=J.K(u)
s=t.i(u,"name")
r=t.i(u,"description")
q=t.i(u,"color")
p=t.i(u,"priority")
o=t.i(u,"show")
n=t.i(u,"notifyOnChange")
t=t.i(u,"string")
if(w>=x)return H.e(z,w)
z[w]=new Z.h2(s,r,q,p,o,n,t);++w}C.a.cf(z,new Z.om())
return z}}},om:{"^":"a:7;",
$2:function(a,b){return J.bq(b.gdl(),a.gdl())}},ap:{"^":"d;h:a<,b5:b<,c,fA:d<,dl:e<,f,r,fV:x<,fv:y@,fz:z<,$ti",
gad:function(){return this.f},
sad:function(a){if(!J.i(this.f,a)){this.f=a
this.y=!0
$.cS=!0}},
gcX:function(){return this.r},
gaS:function(){return this.c.$1(this.f)},
B:function(){return P.ah(["name",this.a,"value",this.f,"show",this.r])},
hd:function(a){var z
this.sad(H.i5(a.i(0,"value"),H.m(this,0)))
z=a.i(0,"show")
if(!J.i(this.r,z)){this.r=z
this.y=!0
$.cS=!0}},
$isdP:1,
A:{
bD:function(a,b,c,d,e,f,g,h){var z,y
z=$.$get$cR()
y=z.a1(a)?H.aC(z.i(0,a),"$isap",[h],"$asap"):new Z.ap(a,d,b,c,f,null,null,!0,!1,"Stat",[null])
y.f=H.i5(e,h)
y.r=!0
z.n(0,a,y)
return y},
nm:function(){var z,y
z=new Z.nj(new H.O(0,null,null,null,null,null,0,[P.q,Z.cQ]))
y=$.$get$cR().gce()
new H.I(y,new Z.nn(),[H.x(y,"y",0)]).L(0,new Z.no(z))
$.cS=!1
return z},
bE:function(){var z=H.r([],[[P.D,P.q,P.d]])
$.$get$cR().gce().L(0,new Z.nl(z))
return z}}},nn:{"^":"a:0;",
$1:function(a){return a.gfv()}},no:{"^":"a:24;a",
$1:function(a){var z,y
z=a.gcX()
y=a.gaS()
a.sfv(!1)
this.a.a.n(0,a.a,new Z.cQ(z,y))}},nl:{"^":"a:24;a",
$1:function(a){var z=new H.O(0,null,null,null,null,null,0,[P.q,P.d])
z.n(0,"name",a.gh())
z.n(0,"description",a.gb5())
z.n(0,"color",a.gfA())
z.n(0,"priority",a.gdl())
z.n(0,"show",a.gcX())
z.n(0,"notifyOnChange",a.gfV())
z.n(0,"string",a.gaS())
this.a.push(z)}}}],["","",,N,{"^":"",dw:{"^":"d;h:a<,b,c,hZ:d<,e,f",
gfH:function(){var z,y,x
z=this.b
y=z==null||J.i(z.gh(),"")
x=this.a
return y?x:z.gfH()+"."+x},
gev:function(){if($.hO){var z=this.b
if(z!=null)return z.gev()}return $.qk},
jW:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p,o
x=a.b
if(x>=this.gev().b){if(!!J.n(b).$isbu)b=b.$0()
w=b
if(typeof w!=="string"){v=b
b=J.h(b)}else v=null
if(d==null&&x>=$.t1.b)try{x="autogenerated stack trace for "+a.k(0)+" "+H.b(b)
throw H.c(x)}catch(u){z=H.z(u)
y=H.A(u)
d=y
if(c==null)c=z}e=$.p
x=b
w=this.gfH()
t=c
s=d
r=Date.now()
q=$.f5
$.f5=q+1
p=new N.lf(a,x,v,w,new P.cw(r,!1),q,t,s,e)
if($.hO)for(o=this;o!=null;){o.fe(p)
o=o.b}else $.$get$f7().fe(p)}},
c7:function(a,b,c,d){return this.jW(a,b,c,d,null)},
jt:function(a,b,c){return this.c7(C.Q,a,b,c)},
aa:function(a){return this.jt(a,null,null)},
js:function(a,b,c){return this.c7(C.P,a,b,c)},
b6:function(a){return this.js(a,null,null)},
jr:function(a,b,c){return this.c7(C.R,a,b,c)},
bF:function(a){return this.jr(a,null,null)},
jF:function(a,b,c){return this.c7(C.z,a,b,c)},
fN:function(a){return this.jF(a,null,null)},
kC:function(a,b,c){return this.c7(C.U,a,b,c)},
eG:function(a){return this.kC(a,null,null)},
hy:function(a,b,c){return this.c7(C.T,a,b,c)},
dF:function(a){return this.hy(a,null,null)},
fe:function(a){},
A:{
ba:function(a){return $.$get$f6().kc(a,new N.r0(a))}}},r0:{"^":"a:1;a",
$0:function(){var z,y,x,w
z=this.a
if(C.b.dJ(z,"."))H.f(P.G("name shouldn't start with a '.'"))
y=C.b.jT(z,".")
if(y===-1)x=z!==""?N.ba(""):null
else{x=N.ba(C.b.az(z,0,y))
z=C.b.bB(z,y+1)}w=new H.O(0,null,null,null,null,null,0,[P.q,N.dw])
w=new N.dw(z,x,null,w,new P.h5(w,[null,null]),null)
if(x!=null)x.ghZ().n(0,z,w)
return w}},aQ:{"^":"d;h:a<,ad:b<",
u:function(a,b){if(b==null)return!1
return b instanceof N.aQ&&this.b===b.b},
aJ:function(a,b){return C.d.aJ(this.b,b.gad())},
c_:function(a,b){return C.d.c_(this.b,b.gad())},
br:function(a,b){var z=b.gad()
if(typeof z!=="number")return H.v(z)
return this.b>z},
bI:function(a,b){return this.b>=b.gad()},
bu:function(a,b){var z=b.gad()
if(typeof z!=="number")return H.v(z)
return this.b-z},
gv:function(a){return this.b},
k:function(a){return this.a},
$isS:1,
$asS:function(){return[N.aQ]}},lf:{"^":"d;ev:a<,b,aE:c<,d,I:e<,f,bi:r<,bf:x<,y",
k:function(a){return"["+this.a.a+"] "+this.d+": "+H.b(this.b)}}}],["","",,X,{"^":"",
bp:function(a){return X.d0(J.ih(a,0,new X.rM()))},
aU:function(a,b){var z=J.al(a,b)
if(typeof z!=="number")return H.v(z)
a=536870911&z
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
d0:function(a){if(typeof a!=="number")return H.v(a)
a=536870911&a+((67108863&a)<<3)
a^=a>>>11
return 536870911&a+((16383&a)<<15)},
rM:{"^":"a:7;",
$2:function(a,b){return X.aU(a,J.j(b))}}}],["","",,U,{"^":"",cM:{"^":"d;a,b",
k:function(a){return this.b}},c7:{"^":"d;a,kD:b<",
ges:function(){return this.a===C.C},
k:function(a){return"SessionResult<"+this.a.b+",wasRerolled="+H.b(this.b)+">"},
u:function(a,b){if(b==null)return!1
return b instanceof U.c7&&b.a===this.a&&J.i(b.b,this.b)},
gv:function(a){return(this.b===!0?2:1)*100+this.a.a}}}],["","",,X,{"^":"",
uK:[function(a,b){var z,y,x,w,v
z=new D.kS(b,null,null,null,null,null,null,null)
y=$.fm
$.fm=y+1
x=new H.c5(y,null,!1)
w=init.globalState.d
w.dN(y,x)
w.cv()
w=new H.mf(x,null)
w.hJ(x)
z.b=w
w=w.b
w.toString
new P.cV(w,[H.m(w,0)]).ax(z.giq(),null,null,null)
b.D(new H.cd(z.b.a,init.globalState.d.a))
v=N.mB()
z.c=v
v.Q=z},"$2","hC",4,0,33]},1]]
setupProgram(dart,0)
J.n=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.eZ.prototype
return J.kU.prototype}if(typeof a=="string")return J.c0.prototype
if(a==null)return J.f_.prototype
if(typeof a=="boolean")return J.eY.prototype
if(a.constructor==Array)return J.bZ.prototype
if(!(a instanceof P.d))return J.bi.prototype
return a}
J.aV=function(a){if(a==null)return a
if(a.constructor==Array)return J.bZ.prototype
if(!(a instanceof P.d))return J.bi.prototype
return a}
J.K=function(a){if(typeof a=="string")return J.c0.prototype
if(a==null)return a
if(a.constructor==Array)return J.bZ.prototype
if(!(a instanceof P.d))return J.bi.prototype
return a}
J.ad=function(a){if(typeof a=="number")return J.c_.prototype
if(a==null)return a
if(!(a instanceof P.d))return J.bi.prototype
return a}
J.ej=function(a){if(typeof a=="number")return J.c_.prototype
if(typeof a=="string")return J.c0.prototype
if(a==null)return a
if(!(a instanceof P.d))return J.bi.prototype
return a}
J.aW=function(a){if(typeof a=="string")return J.c0.prototype
if(a==null)return a
if(!(a instanceof P.d))return J.bi.prototype
return a}
J.al=function(a,b){if(typeof a=="number"&&typeof b=="number")return a+b
return J.ej(a).a4(a,b)}
J.aX=function(a,b){if(typeof a=="number"&&typeof b=="number")return a/b
return J.ad(a).cS(a,b)}
J.i=function(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.n(a).u(a,b)}
J.a3=function(a,b){if(typeof a=="number"&&typeof b=="number")return a>b
return J.ad(a).br(a,b)}
J.bQ=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<b
return J.ad(a).aJ(a,b)}
J.bR=function(a,b){if(typeof a=="number"&&typeof b=="number")return a*b
return J.ej(a).c0(a,b)}
J.ie=function(a){if(typeof a=="number")return-a
return J.ad(a).eJ(a)}
J.bq=function(a,b){if(typeof a=="number"&&typeof b=="number")return a-b
return J.ad(a).aL(a,b)}
J.au=function(a,b){if(typeof b==="number")if(a.constructor==Array||typeof a=="string")if(b>>>0===b&&b<a.length)return a[b]
return J.K(a).i(a,b)}
J.aO=function(a,b){return J.aV(a).q(a,b)}
J.bS=function(a,b){return J.ej(a).bu(a,b)}
J.ig=function(a,b){return J.K(a).Z(a,b)}
J.ev=function(a,b){return J.aV(a).an(a,b)}
J.ih=function(a,b,c){return J.aV(a).bj(a,b,c)}
J.j=function(a){return J.n(a).gv(a)}
J.ew=function(a){return J.K(a).gK(a)}
J.af=function(a){return J.aV(a).gY(a)}
J.ii=function(a){return J.aV(a).gE(a)}
J.aD=function(a){return J.K(a).gl(a)}
J.ij=function(a){return J.n(a).gbn(a)}
J.ik=function(a,b){return J.K(a).b8(a,b)}
J.ex=function(a,b){return J.aV(a).aP(a,b)}
J.il=function(a,b,c){return J.aW(a).fQ(a,b,c)}
J.da=function(a,b,c){return J.aW(a).kh(a,b,c)}
J.bT=function(a,b,c){return J.aW(a).ez(a,b,c)}
J.im=function(a){return J.ad(a).h6(a)}
J.io=function(a,b){return J.aV(a).dH(a,b)}
J.db=function(a,b){return J.aW(a).dJ(a,b)}
J.ip=function(a,b,c){return J.aW(a).az(a,b,c)}
J.iq=function(a){return J.aV(a).by(a)}
J.h=function(a){return J.n(a).k(a)}
J.cl=function(a,b){return J.ad(a).bX(a,b)}
J.ir=function(a,b){return J.aV(a).bZ(a,b)}
I.bO=function(a){a.immutable$list=Array
a.fixed$length=Array
return a}
var $=I.p
C.I=J.aP.prototype
C.a=J.bZ.prototype
C.K=J.eY.prototype
C.d=J.eZ.prototype
C.u=J.f_.prototype
C.k=J.c_.prototype
C.b=J.c0.prototype
C.D=new A.ag(0,0,0)
C.E=new A.ag(-1/0,-1/0,-1/0)
C.F=new A.cn(-10,0,100)
C.G=new P.lB()
C.v=new P.pd()
C.H=new P.pw()
C.h=new P.pL()
C.x=new P.aZ(0)
C.J=new U.dm(0,"ItemType.spear")
C.f=new U.dm(1,"ItemType.sword")
C.y=new U.dm(2,"ItemType.fist")
C.L=function getTagFallback(o) {
  var s = Object.prototype.toString.call(o);
  return s.substring(8, s.length - 1);
}
C.w=new P.kY(null,null)
C.M=new P.l_(null)
C.N=new P.l0(null,null)
C.O=new O.l7(0,"KnownToMode.all")
C.P=new N.aQ("FINER",400)
C.Q=new N.aQ("FINEST",300)
C.R=new N.aQ("FINE",500)
C.z=new N.aQ("INFO",800)
C.S=new N.aQ("OFF",2000)
C.T=new N.aQ("SEVERE",1000)
C.U=new N.aQ("WARNING",900)
C.C=new U.cM(0,"Result.success")
C.Z=new U.cM(1,"Result.failure")
C.a_=new U.cM(2,"Result.criticalSuccess")
C.a0=new U.cM(3,"Result.criticalFailure")
C.A=I.bO([C.C,C.Z,C.a_,C.a0])
C.r=I.bO([C.f])
C.V=I.bO([C.y])
C.e=I.bO([])
C.W=new H.jo(0,{},C.e,[null,null])
C.l=new R.dH(0,"Pose.standing")
C.i=new R.dH(1,"Pose.offBalance")
C.m=new R.dH(2,"Pose.onGround")
C.p=new K.dI(0,"Predetermination.none")
C.j=new K.dI(1,"Predetermination.successGuaranteed")
C.o=new K.dI(2,"Predetermination.failureGuaranteed")
C.t=new Y.c2("he","him","his","himself")
C.q=new Y.c2("it","it","its","itself")
C.X=new Y.c2("she","her","her","herself")
C.Y=new Y.c2("they","them","their","themselves")
C.B=new Y.c2("you","you","your","yourself")
C.c=new Q.mk(0,"Resource.stamina")
C.a1=H.b4("f0")
C.a2=H.b4("ao")
C.a3=H.b4("q")
C.a4=H.b4("Y")
C.a5=H.b4("aN")
C.n=H.b4("dynamic")
C.a6=H.b4("u")
C.a7=H.b4("M")
C.a8=new P.bH(null,2)
$.fm=1
$.ff="$cachedFunction"
$.fg="$cachedInvocation"
$.aE=0
$.bs=null
$.eC=null
$.bl=null
$.bK=null
$.bL=null
$.e9=!1
$.p=C.h
$.eQ=0
$.ek=null
$.hn=!1
$.qd=null
$.hp=!1
$.hQ=!0
$.cS=!1
$.hO=!1
$.t1=C.S
$.qk=C.z
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
I.$lazy(y,x,w)}})(["eV","$get$eV",function(){return H.kQ()},"eW","$get$eW",function(){if(typeof WeakMap=="function")var z=new WeakMap()
else{z=$.eQ
$.eQ=z+1
z="expando$key$"+z}return new P.kh(null,z,[P.u])},"fS","$get$fS",function(){return H.aI(H.cT({
toString:function(){return"$receiver$"}}))},"fT","$get$fT",function(){return H.aI(H.cT({$method$:null,
toString:function(){return"$receiver$"}}))},"fU","$get$fU",function(){return H.aI(H.cT(null))},"fV","$get$fV",function(){return H.aI(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"fZ","$get$fZ",function(){return H.aI(H.cT(void 0))},"h_","$get$h_",function(){return H.aI(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"fX","$get$fX",function(){return H.aI(H.fY(null))},"fW","$get$fW",function(){return H.aI(function(){try{null.$method$}catch(z){return z.message}}())},"h1","$get$h1",function(){return H.aI(H.fY(void 0))},"h0","$get$h0",function(){return H.aI(function(){try{(void 0).$method$}catch(z){return z.message}}())},"e_","$get$e_",function(){return P.oW()},"b9","$get$b9",function(){var z,y
z=P.ao
y=new P.C(0,P.oy(),null,[z])
y.hQ(null,z)
return y},"bM","$get$bM",function(){return[]},"eg","$get$eg",function(){return new K.cA("fist",P.bv(C.V,null))},"by","$get$by",function(){return N.ba("PlannerRecommendation")},"hE","$get$hE",function(){return new K.qw()},"eh","$get$eh",function(){var z=$.$get$hE()
return K.a_("__END_OF_ROAM__",z,z,null,null,[],"ground")},"a2","$get$a2",function(){return P.cK(null)},"bd","$get$bd",function(){return P.cK(null)},"hS","$get$hS",function(){return N.ba("Storyline")},"fF","$get$fF",function(){return P.be("(\\w)([\\.\\?\\!])([\"'])\\.(?=$|\\s)",!0,!1)},"ch","$get$ch",function(){return L.dZ(new L.r_())},"bP","$get$bP",function(){return L.dZ(new L.r5())},"hZ","$get$hZ",function(){return L.dZ(new L.qZ())},"dF","$get$dF",function(){return new F.lG("Sometimes, patience pays off. Especially when the other option is potentially dangerous.",!1,!0,!1,null,null)},"ee","$get$ee",function(){return Y.di(!1,"balance",!0,C.q,$.$get$bP())},"i_","$get$i_",function(){return Y.di(!1,"pounding",!1,C.q,$.$get$bP())},"fn","$get$fn",function(){return new B.mi("Most moves are easier and more effective when you are firmly in balance.",!1,!0,!1,null,null)},"fr","$get$fr",function(){return new O.mx(null,!1,!0,!1,null,null)},"fE","$get$fE",function(){return new Q.nh(null,!1,!0,!0,C.c,null)},"h4","$get$h4",function(){return new M.on("",!0,C.c,!1,!0,null)},"ho","$get$ho",function(){return P.cK(null)},"eB","$get$eB",function(){return new Z.iY(!1,!0,!1,null,null)},"i6","$get$i6",function(){return Y.di(!1,"swing",!0,C.q,$.$get$bP())},"fx","$get$fx",function(){return new D.n5(!1,!1,!0,null,null)},"hG","$get$hG",function(){return K.a_("forge_church_crevice",new V.qV(),new V.qW(),null,null,H.r([new Q.w("tunnel","Continue along the crevice","You continue until the crevice open into a tunnel. You can smell fresh air.",null)],[Q.w]),"ground")},"hR","$get$hR",function(){return K.a_("kill_agruth",new V.qS(),new V.qU(),N.u5(),null,H.r([new Q.w("start_of_book","","You look around. Fortunately, nobody is in sight.",null)],[Q.w]),"ground")},"i1","$get$i1",function(){return K.a_("start_of_book",new V.qQ(),new V.qR(),null,null,H.r([],[Q.w]),"ground")},"eS","$get$eS",function(){return new V.kE("Flee through the Underground Church","flee_through_necromancers_church",!0,null)},"eT","$get$eT",function(){return new V.kG("Flee through the War Forges","flee_through_war_forge",!0,null)},"fs","$get$fs",function(){return new V.mX("Search Agruth","search_agruth",!0,null)},"i7","$get$i7",function(){return K.a_("the_shafts",new V.qO(),new V.qP(),null,null,H.r([new Q.w("tunnel","Run","You run over the passage. Orcs start to scream and yell commands. As you near the entrance, the air gets better.",null)],[Q.w]),"ground")},"i9","$get$i9",function(){return K.a_("tunnel",new V.qM(),new V.qN(),N.u4(),null,H.r([new Q.w("entrance_to_bloodrock","Start running again","You finally arrive to the cave's entrance.",null)],[Q.w]),"ground")},"ia","$get$ia",function(){return K.a_("underground_church",new V.qK(),new V.qL(),null,null,H.r([new Q.w("forge_church_crevice","Enter the small passage","You enter the passage and go a long way.",null)],[Q.w]),"ground")},"ib","$get$ib",function(){return K.a_("war_forge",new V.qH(),new V.qJ(),null,null,H.r([new Q.w("tunnel","Enter the corridor","You enter the corridor.",null),new Q.w("forge_church_crevice","Enter the crevice","You take the crevice.",null)],[Q.w]),"ground")},"ic","$get$ic",function(){return K.a_("war_forge_crevice",new V.qF(),new V.qG(),null,null,H.r([new Q.w("tunnel","Continue along the crevice","You continue until the crevice open into a tunnel. You can smell fresh air.",null)],[Q.w]),"ground")},"hF","$get$hF",function(){return K.a_("entrance_to_bloodrock",new V.qD(),new V.qE(),null,null,H.r([new Q.w("mountainside_path","Climb down the cliff","You decide to risk the mountainside. With a deep breath, you swing your leg over the edge, find a foothold, and lower yourself down.",null),new Q.w("mountain_pass_gate","Use the path","You steel yourself and trudge down the mountain pass.",null)],[Q.w]),"ground")},"hT","$get$hT",function(){return K.a_("mountain_pass",new V.qB(),new V.qC(),null,null,H.r([new Q.w("ironcast_road","Go to Fort Ironcast","You continue towards the fort.",null)],[Q.w]),"ground")},"hU","$get$hU",function(){return K.a_("mountain_pass_gate",new V.qz(),new V.qA(),null,null,H.r([new Q.w("mountain_pass_guard_post","Go to the gate","You unsheathe your weapon and start towards the guards.",null)],[Q.w]),"ground")},"hV","$get$hV",function(){return K.a_("mountain_pass_guard_post",new V.rp(),new V.qy(),N.u6(),null,H.r([new Q.w("mountain_pass","Go through the gate","You release the winch holding the gate closed. The gate swings ponderously outward, just enough for you and Briana to squeeze through to freedom.",null)],[Q.w]),"ground")},"fy","$get$fy",function(){return new V.n7("Sneak onto the back of the cart","sneak_onto_cart",!0,null)},"fM","$get$fM",function(){return new V.nY("Stealthily take out some of the gate guards","take_out_gate_guards",!0,null)},"hW","$get$hW",function(){return K.a_("mountainside_base",new V.rn(),new V.ro(),null,null,H.r([new Q.w("ironcast_road","Go to Fort Ironcast","The Fort awaits, so you press on to only road to and from Mt. Bloodrock.",null)],[Q.w]),"ground")},"hX","$get$hX",function(){return K.a_("mountainside_path",new V.re(),new V.rm(),null,null,H.r([new Q.w("winged_serpent_nest","Continue down","You find a ledge you might rest on for a bit.",null)],[Q.w]),"ground")},"fR","$get$fR",function(){return new V.o7("Scare off the serpent","threaten_winged_serpent",!0,null)},"fA","$get$fA",function(){return new V.n9("Soothe the serpent","soothe_winged_serpent",!0,null)},"fP","$get$fP",function(){return new V.o8("Threaten the serpent\u2019s eggs","threaten_winged_serpent_eggs",!0,null)},"id","$get$id",function(){return K.a_("winged_serpent_nest",new V.qT(),new V.r3(),null,null,H.r([new Q.w("mountainside_base","Continue down","You continue your descent to level ground. Thankfully, the end is in sight.",null)],[Q.w]),"ground")},"hP","$get$hP",function(){return K.a_("ironcast_road",new V.qx(),new V.qI(),null,null,H.r([new Q.w("__END_OF_ROAM__","Go to Fort Ironcast (UNIMPLEMENTED)","You make your way closer to the fort.",null)],[Q.w]),"ground")},"hw","$get$hw",function(){return H.r([$.$get$hG(),$.$get$hR(),$.$get$i1(),$.$get$i7(),$.$get$i9(),$.$get$ia(),$.$get$ib(),$.$get$ic(),$.$get$hF(),$.$get$hT(),$.$get$hU(),$.$get$hV(),$.$get$hW(),$.$get$hX(),$.$get$id(),$.$get$hP()],[K.c6])},"hv","$get$hv",function(){return H.r([$.$get$eS(),$.$get$eT(),$.$get$fs(),$.$get$fy(),$.$get$fM(),$.$get$fR(),$.$get$fA(),$.$get$fP()],[A.aG])},"d1","$get$d1",function(){return P.cK(null)},"d9","$get$d9",function(){return P.nS("")},"cg","$get$cg",function(){var z=new O.lT(0,null,"PointsCounter")
z.hI()
return z},"bN","$get$bN",function(){return new L.eH(null,H.r([],[L.a4]))},"ck","$get$ck",function(){return H.f3(P.q,P.d)},"cf","$get$cf",function(){return P.b1(null,{func:1,ret:[P.N,P.ao]})},"cu","$get$cu",function(){return P.be("^\\s*<<<\\s*$",!0,!1)},"cR","$get$cR",function(){return H.f3(P.q,Z.ap)},"f7","$get$f7",function(){return N.ba("")},"f6","$get$f6",function(){return P.du(P.q,N.dw)}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=[null,!1]
init.types=[{func:1,args:[,]},{func:1},{func:1,ret:P.q,args:[R.F,A.a8,Y.a1]},{func:1,args:[,,,]},{func:1,args:[R.F,A.a8,Y.a1]},{func:1,ret:Q.H,args:[R.F]},{func:1,v:true},{func:1,args:[,,]},{func:1,args:[,,,,]},{func:1,args:[P.u]},{func:1,v:true,args:[R.F,A.a8,Y.a1,R.F,S.a0]},{func:1,ret:P.q,args:[P.u]},{func:1,v:true,args:[{func:1,v:true}]},{func:1,ret:[P.y,R.F],args:[A.a8]},{func:1,v:true,args:[P.q]},{func:1,args:[,P.aT]},{func:1,v:true,args:[P.d],opt:[P.aT]},{func:1,args:[P.aN]},{func:1,ret:P.N},{func:1,v:true,args:[P.d]},{func:1,ret:Y.b8,args:[P.u]},{func:1,ret:P.q,args:[P.q]},{func:1,args:[U.bX]},{func:1,args:[R.F]},{func:1,args:[Z.ap]},{func:1,ret:P.M,args:[A.ag]},{func:1,v:true,args:[R.F,A.a8,Y.a1,R.F,,]},{func:1,ret:P.q,args:[Q.a6]},{func:1,args:[P.M,R.F]},{func:1,ret:P.Y,args:[P.u]},{func:1,args:[P.u,,]},{func:1,ret:P.M,args:[A.cn]},{func:1,v:true,args:[P.u]},{func:1,v:true,args:[[P.J,P.q],P.ft]},{func:1,ret:[P.N,U.c7],args:[P.aN,P.q],named:{rerollEffectDescription:P.q,rerollable:P.Y}},{func:1,args:[L.a4]},{func:1,args:[P.q,,]},{func:1,args:[P.q,Z.cQ]},{func:1,v:true,args:[P.d,P.aT]},{func:1,v:true,args:[,P.aT]},{func:1,ret:P.u,args:[P.S,P.S]},{func:1,args:[[P.J,Y.a7],Y.a7]},{func:1,ret:P.M,args:[P.M,P.M]},{func:1,ret:P.Y,args:[L.a4]},{func:1,args:[Y.a7]},{func:1,args:[P.bb]},{func:1,ret:Q.cC,args:[U.am]},{func:1,ret:Q.cz,args:[Q.w]},{func:1,args:[{func:1,v:true}]},{func:1,args:[,],opt:[,]},{func:1,ret:L.a4,args:[P.q],named:{deferToChoiceList:P.Y,deferToEndOfPage:P.Y,goto:P.q,helpMessage:P.q,script:{func:1,ret:[P.N,P.ao]},submenu:P.q}},{func:1,args:[P.Y]}]
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
if(x==y)H.u1(d||a)
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
Isolate.b5=a.b5
return Isolate}}(function(a){if(typeof document==="undefined"){a(null)
return}if(typeof document.currentScript!='undefined'){a(document.currentScript)
return}var z=document.scripts
function onLoad(b){for(var x=0;x<z.length;++x)z[x].removeEventListener("load",onLoad,false)
a(b.target)}for(var y=0;y<z.length;++y)z[y].addEventListener("load",onLoad,false)})(function(a){init.currentScript=a
if(typeof dartMainRunner==="function")dartMainRunner(function(b){H.i2(X.hC(),b)},[])
else (function(b){H.i2(X.hC(),b)})([])})})()