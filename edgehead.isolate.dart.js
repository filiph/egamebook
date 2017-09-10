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
if(a0==="u"){processStatics(init.statics[b1]=b2.u,b3)
delete b2.u}else if(a1===43){w[g]=a0.substring(1)
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
e.$callName=null}}function tearOffGetter(c,d,e,f){return f?new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"(x) {"+"if (c === null) c = "+"H.er"+"("+"this, funcs, reflectionInfo, false, [x], name);"+"return new c(this, funcs[0], x, name);"+"}")(c,d,e,H,null):new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"() {"+"if (c === null) c = "+"H.er"+"("+"this, funcs, reflectionInfo, false, [], name);"+"return new c(this, funcs[0], null, name);"+"}")(c,d,e,H,null)}function tearOff(c,d,e,f,a0){var g
return e?function(){if(g===void 0)g=H.er(this,c,d,true,[],f).prototype
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
var dart=[["","",,H,{"^":"",wQ:{"^":"d;a"}}],["","",,J,{"^":"",
o:function(a){return void 0},
aZ:{"^":"d;",
w:function(a,b){return a===b},
gB:function(a){return H.aC(a)},
k:function(a){return H.cX(a)},
gby:function(a){return new H.au(H.ik(a),null)}},
fe:{"^":"aZ;",
k:function(a){return String(a)},
gB:function(a){return a?519018:218159},
gby:function(a){return C.ac},
$isa2:1},
fh:{"^":"aZ;",
w:function(a,b){return null==b},
k:function(a){return"null"},
gB:function(a){return 0},
gby:function(a){return C.aa},
$isas:1},
fk:{"^":"aZ;",
gB:function(a){return 0},
gby:function(a){return C.a9},
k:function(a){return String(a)},
$isfi:1},
wX:{"^":"fk;"},
bs:{"^":"fk;"},
ce:{"^":"aZ;$ti",
fT:function(a,b){if(!!a.immutable$list)throw H.c(new P.S(b))},
cO:function(a,b){if(!!a.fixed$length)throw H.c(new P.S(b))},
q:function(a,b){this.cO(a,"add")
a.push(b)},
hp:function(a){this.cO(a,"removeLast")
if(a.length===0)throw H.c(H.aI(a,-1))
return a.pop()},
a3:function(a,b){var z
this.cO(a,"remove")
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
c6:function(a,b){return new H.K(a,b,[H.m(a,0)])},
av:function(a,b){var z
this.cO(a,"addAll")
for(z=J.ai(b);z.t();)a.push(z.d)},
Z:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){b.$1(a[y])
if(a.length!==z)throw H.c(new P.C(a))}},
aF:function(a,b){return new H.ap(a,b,[H.m(a,0),null])},
dY:function(a,b){return H.ha(a,b,null,H.m(a,0))},
bv:function(a,b,c){var z,y,x
z=a.length
for(y=b,x=0;x<z;++x){y=c.$2(y,a[x])
if(a.length!==z)throw H.c(new P.C(a))}return y},
aQ:function(a,b,c){var z,y,x
z=a.length
for(y=0;y<z;++y){x=a[y]
if(b.$1(x)===!0)return x
if(a.length!==z)throw H.c(new P.C(a))}throw H.c(H.aj())},
cj:function(a,b){return this.aQ(a,b,null)},
ar:function(a,b){if(b>>>0!==b||b>=a.length)return H.f(a,b)
return a[b]},
geG:function(a){if(a.length>0)return a[0]
throw H.c(H.aj())},
gv:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.c(H.aj())},
gca:function(a){var z=a.length
if(z===1){if(0>=z)return H.f(a,0)
return a[0]}if(z===0)throw H.c(H.aj())
throw H.c(H.dz())},
b5:function(a,b,c,d,e){var z,y,x
this.fT(a,"setRange")
P.ck(b,c,a.length,null,null,null)
z=c-b
if(z===0)return
if(e<0)H.i(P.a6(e,0,null,"skipCount",null))
if(e+z>d.length)throw H.c(H.fd())
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
this.fT(a,"sort")
z=b==null?P.tH():b
H.co(a,0,a.length-1,z)},
f7:function(a){return this.cb(a,null)},
bP:function(a,b,c){var z
if(c>=a.length)return-1
for(z=c;z<a.length;++z)if(J.e(a[z],b))return z
return-1},
aY:function(a,b){return this.bP(a,b,0)},
a7:function(a,b){var z
for(z=0;z<a.length;++z)if(J.e(a[z],b))return!0
return!1},
gW:function(a){return a.length===0},
gas:function(a){return a.length!==0},
k:function(a){return P.cd(a,"[","]")},
bG:function(a){return P.b9(a,H.m(a,0))},
ga_:function(a){return new J.bj(a,a.length,0,null,[H.m(a,0)])},
gB:function(a){return H.aC(a)},
gl:function(a){return a.length},
sl:function(a,b){this.cO(a,"set length")
if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(P.cD(b,"newLength",null))
if(b<0)throw H.c(P.a6(b,0,null,"newLength",null))
a.length=b},
j:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(H.aI(a,b))
if(b>=a.length||b<0)throw H.c(H.aI(a,b))
return a[b]},
n:function(a,b,c){if(!!a.immutable$list)H.i(new P.S("indexed set"))
if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(H.aI(a,b))
if(b>=a.length||b<0)throw H.c(H.aI(a,b))
a[b]=c},
$iscT:1,
$ascT:I.bg,
$isN:1,
$isY:1},
wP:{"^":"ce;$ti"},
bj:{"^":"d;a,b,c,d,$ti",
gS:function(){return this.d},
t:function(){var z,y,x
z=this.a
y=z.length
if(this.b!==y)throw H.c(H.ar(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z[x]
this.c=x+1
return!0}},
cf:{"^":"aZ;",
bD:function(a,b){var z
if(typeof b!=="number")throw H.c(H.T(b))
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){z=this.gdB(b)
if(this.gdB(a)===z)return 0
if(this.gdB(a))return-1
return 1}return 0}else if(isNaN(a)){if(isNaN(b))return 0
return 1}else return-1},
gdB:function(a){return a===0?1/a<0:a<0},
hv:function(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw H.c(new P.S(""+a+".round()"))},
l0:function(a){return a},
bg:function(a,b){var z
if(b>20)throw H.c(P.a6(b,0,20,"fractionDigits",null))
z=a.toFixed(b)
if(a===0&&this.gdB(a))return"-"+z
return z},
l3:function(a,b){var z,y,x,w
if(b<2||b>36)throw H.c(P.a6(b,2,36,"radix",null))
z=a.toString(b)
if(C.b.cP(z,z.length-1)!==41)return z
y=/^([\da-z]+)(?:\.([\da-z]+))?\(e\+(\d+)\)$/.exec(z)
if(y==null)H.i(new P.S("Unexpected toString result: "+z))
x=J.J(y)
z=x.j(y,1)
w=+x.j(y,3)
if(x.j(y,2)!=null){z+=x.j(y,2)
w-=x.j(y,2).length}return z+C.b.c8("0",w)},
k:function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gB:function(a){return a&0x1FFFFFFF},
f3:function(a){return-a},
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
aV:function(a,b){if(typeof b!=="number")throw H.c(H.T(b))
return a<b},
bo:function(a,b){if(typeof b!=="number")throw H.c(H.T(b))
return a>b},
d8:function(a,b){if(typeof b!=="number")throw H.c(H.T(b))
return a<=b},
bS:function(a,b){if(typeof b!=="number")throw H.c(H.T(b))
return a>=b},
gby:function(a){return C.af},
$isL:1},
fg:{"^":"cf;",
gby:function(a){return C.ae},
$isaV:1,
$isL:1,
$ist:1},
ff:{"^":"cf;",
gby:function(a){return C.ad},
$isaV:1,
$isL:1},
cg:{"^":"aZ;",
cP:function(a,b){if(b<0)throw H.c(H.aI(a,b))
if(b>=a.length)H.i(H.aI(a,b))
return a.charCodeAt(b)},
cA:function(a,b){if(b>=a.length)throw H.c(H.aI(a,b))
return a.charCodeAt(b)},
dt:function(a,b,c){if(c>b.length)throw H.c(P.a6(c,0,b.length,null,null))
return new H.r4(b,a,c)},
ez:function(a,b){return this.dt(a,b,0)},
hd:function(a,b,c){var z,y
if(c<0||c>b.length)throw H.c(P.a6(c,0,b.length,null,null))
z=a.length
if(c+z>b.length)return
for(y=0;y<z;++y)if(this.cP(b,c+y)!==this.cA(a,y))return
return new H.h9(c,b,a)},
ai:function(a,b){if(typeof b!=="string")throw H.c(P.cD(b,null,null))
return a+b},
eE:function(a,b){var z,y
z=b.length
y=a.length
if(z>y)return!1
return b===this.bJ(a,y-z)},
kO:function(a,b,c){H.by(c)
return H.n(a,b,c)},
kP:function(a,b,c,d){H.by(c)
P.ns(d,0,a.length,"startIndex",null)
return H.iD(a,b,c,d)},
d_:function(a,b,c){return this.kP(a,b,c,0)},
i2:function(a,b,c){var z
if(c>a.length)throw H.c(P.a6(c,0,a.length,null,null))
if(typeof b==="string"){z=c+b.length
if(z>a.length)return!1
return b===a.substring(c,z)}return J.iU(b,a,c)!=null},
df:function(a,b){return this.i2(a,b,0)},
aH:function(a,b,c){if(c==null)c=a.length
if(typeof c!=="number"||Math.floor(c)!==c)H.i(H.T(c))
if(b<0)throw H.c(P.cj(b,null,null))
if(typeof c!=="number")return H.w(c)
if(b>c)throw H.c(P.cj(b,null,null))
if(c>a.length)throw H.c(P.cj(c,null,null))
return a.substring(b,c)},
bJ:function(a,b){return this.aH(a,b,null)},
eY:function(a){var z,y,x,w,v
z=a.trim()
y=z.length
if(y===0)return z
if(this.cA(z,0)===133){x=J.dA(z,1)
if(x===y)return""}else x=0
w=y-1
v=this.cP(z,w)===133?J.m_(z,w):y
if(x===0&&v===y)return z
return z.substring(x,v)},
l4:function(a){var z,y
if(typeof a.trimLeft!="undefined"){z=a.trimLeft()
if(z.length===0)return z
y=this.cA(z,0)===133?J.dA(z,1):0}else{y=J.dA(a,0)
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
aY:function(a,b){return this.bP(a,b,0)},
kv:function(a,b,c){var z
c=a.length
z=b.length
if(c+z>c)c-=z
return a.lastIndexOf(b,c)},
ku:function(a,b){return this.kv(a,b,null)},
jA:function(a,b,c){if(b==null)H.i(H.T(b))
if(c>a.length)throw H.c(P.a6(c,0,a.length,null,null))
return H.wh(a,b,c)},
a7:function(a,b){return this.jA(a,b,0)},
gW:function(a){return a.length===0},
gas:function(a){return a.length!==0},
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
$iscT:1,
$ascT:I.bg,
$isr:1,
$isdU:1,
u:{
fj:function(a){if(a<256)switch(a){case 9:case 10:case 11:case 12:case 13:case 32:case 133:case 160:return!0
default:return!1}switch(a){case 5760:case 8192:case 8193:case 8194:case 8195:case 8196:case 8197:case 8198:case 8199:case 8200:case 8201:case 8202:case 8232:case 8233:case 8239:case 8287:case 12288:case 65279:return!0
default:return!1}},
dA:function(a,b){var z,y
for(z=a.length;b<z;){y=C.b.cA(a,b)
if(y!==32&&y!==13&&!J.fj(y))break;++b}return b},
m_:function(a,b){var z,y
for(;b>0;b=z){z=b-1
y=C.b.cP(a,z)
if(y!==32&&y!==13&&!J.fj(y))break}return b}}}}],["","",,H,{"^":"",
hM:function(a){return a},
aj:function(){return new P.x("No element")},
dz:function(){return new P.x("Too many elements")},
fd:function(){return new P.x("Too few elements")},
co:function(a,b,c,d){if(c-b<=32)H.h3(a,b,c,d)
else H.h2(a,b,c,d)},
h3:function(a,b,c,d){var z,y,x,w,v
for(z=b+1,y=J.J(a);z<=c;++z){x=y.j(a,z)
w=z
while(!0){if(!(w>b&&J.a9(d.$2(y.j(a,w-1),x),0)))break
v=w-1
y.n(a,w,y.j(a,v))
w=v}y.n(a,w,x)}},
h2:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
z=C.e.bL(c-b+1,6)
y=b+z
x=c-z
w=C.e.bL(b+c,2)
v=w-z
u=w+z
t=J.J(a)
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
if(h.w(i,0))continue
if(h.aV(i,0)){if(k!==m){t.n(a,k,t.j(a,m))
t.n(a,m,j)}++m}else for(;!0;){i=d.$2(t.j(a,l),r)
h=J.al(i)
if(h.bo(i,0)){--l
continue}else{g=l-1
if(h.aV(i,0)){t.n(a,k,t.j(a,m))
f=m+1
t.n(a,m,t.j(a,l))
t.n(a,l,j)
l=g
m=f
break}else{t.n(a,k,t.j(a,l))
t.n(a,l,j)
l=g
break}}}}e=!0}else{for(k=m;k<=l;++k){j=t.j(a,k)
if(J.c0(d.$2(j,r),0)){if(k!==m){t.n(a,k,t.j(a,m))
t.n(a,m,j)}++m}else if(J.a9(d.$2(j,p),0))for(;!0;)if(J.a9(d.$2(t.j(a,l),p),0)){--l
if(l<k)break
continue}else{g=l-1
if(J.c0(d.$2(t.j(a,l),r),0)){t.n(a,k,t.j(a,m))
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
H.co(a,b,m-2,d)
H.co(a,l+2,c,d)
if(e)return
if(m<y&&l>x){for(;J.e(d.$2(t.j(a,m),r),0);)++m
for(;J.e(d.$2(t.j(a,l),p),0);)--l
for(k=m;k<=l;++k){j=t.j(a,k)
if(J.e(d.$2(j,r),0)){if(k!==m){t.n(a,k,t.j(a,m))
t.n(a,m,j)}++m}else if(J.e(d.$2(j,p),0))for(;!0;)if(J.e(d.$2(t.j(a,l),p),0)){--l
if(l<k)break
continue}else{g=l-1
if(J.c0(d.$2(t.j(a,l),r),0)){t.n(a,k,t.j(a,m))
f=m+1
t.n(a,m,t.j(a,l))
t.n(a,l,j)
m=f}else{t.n(a,k,t.j(a,l))
t.n(a,l,j)}l=g
break}}H.co(a,m,l,d)}else H.co(a,m,l,d)},
Y:{"^":"A;$ti"},
b0:{"^":"Y;$ti",
ga_:function(a){return new H.dJ(this,this.gl(this),0,null,[H.y(this,"b0",0)])},
Z:function(a,b){var z,y
z=this.gl(this)
for(y=0;y<z;++y){b.$1(this.ar(0,y))
if(z!==this.gl(this))throw H.c(new P.C(this))}},
gW:function(a){return this.gl(this)===0},
gv:function(a){if(this.gl(this)===0)throw H.c(H.aj())
return this.ar(0,this.gl(this)-1)},
a7:function(a,b){var z,y
z=this.gl(this)
for(y=0;y<z;++y){if(J.e(this.ar(0,y),b))return!0
if(z!==this.gl(this))throw H.c(new P.C(this))}return!1},
bs:function(a,b){var z,y
z=this.gl(this)
for(y=0;y<z;++y){if(b.$1(this.ar(0,y))===!0)return!0
if(z!==this.gl(this))throw H.c(new P.C(this))}return!1},
aQ:function(a,b,c){var z,y,x
z=this.gl(this)
for(y=0;y<z;++y){x=this.ar(0,y)
if(b.$1(x)===!0)return x
if(z!==this.gl(this))throw H.c(new P.C(this))}return c.$0()},
cl:function(a,b){var z,y,x,w
z=this.gl(this)
if(b.length!==0){if(z===0)return""
y=H.b(this.ar(0,0))
if(z!==this.gl(this))throw H.c(new P.C(this))
for(x=y,w=1;w<z;++w){x=x+b+H.b(this.ar(0,w))
if(z!==this.gl(this))throw H.c(new P.C(this))}return x.charCodeAt(0)==0?x:x}else{for(w=0,x="";w<z;++w){x+=H.b(this.ar(0,w))
if(z!==this.gl(this))throw H.c(new P.C(this))}return x.charCodeAt(0)==0?x:x}},
c6:function(a,b){return this.dg(0,b)},
aF:function(a,b){return new H.ap(this,b,[H.y(this,"b0",0),null])},
bv:function(a,b,c){var z,y,x
z=this.gl(this)
for(y=b,x=0;x<z;++x){y=c.$2(y,this.ar(0,x))
if(z!==this.gl(this))throw H.c(new P.C(this))}return y},
bF:function(a,b){var z,y,x,w
z=[H.y(this,"b0",0)]
if(b){y=H.p([],z)
C.a.sl(y,this.gl(this))}else{x=new Array(this.gl(this))
x.fixed$length=Array
y=H.p(x,z)}for(w=0;w<this.gl(this);++w){z=this.ar(0,w)
if(w>=y.length)return H.f(y,w)
y[w]=z}return y},
ct:function(a){return this.bF(a,!0)},
bG:function(a){var z,y
z=P.a4(null,null,null,H.y(this,"b0",0))
for(y=0;y<this.gl(this);++y)z.q(0,this.ar(0,y))
return z}},
p7:{"^":"b0;a,b,c,$ti",
giD:function(){var z=J.aL(this.a)
return z},
gj8:function(){var z,y
z=J.aL(this.a)
y=this.b
if(y>z)return z
return y},
gl:function(a){var z,y
z=J.aL(this.a)
y=this.b
if(y>=z)return 0
return z-y},
ar:function(a,b){var z,y
z=this.gj8()+b
if(!(b<0)){y=this.giD()
if(typeof y!=="number")return H.w(y)
y=z>=y}else y=!0
if(y)throw H.c(P.cQ(b,this,"index",null,null))
return J.eN(this.a,z)},
bF:function(a,b){var z,y,x,w,v,u,t,s,r
z=this.b
y=this.a
x=J.J(y)
w=x.gl(y)
v=w-z
if(v<0)v=0
u=this.$ti
if(b){t=H.p([],u)
C.a.sl(t,v)}else{s=new Array(v)
s.fixed$length=Array
t=H.p(s,u)}for(r=0;r<v;++r){u=x.ar(y,z+r)
if(r>=t.length)return H.f(t,r)
t[r]=u
if(x.gl(y)<w)throw H.c(new P.C(this))}return t},
ie:function(a,b,c,d){var z=this.b
if(z<0)H.i(P.a6(z,0,null,"start",null))},
u:{
ha:function(a,b,c,d){var z=new H.p7(a,b,c,[d])
z.ie(a,b,c,d)
return z}}},
dJ:{"^":"d;a,b,c,d,$ti",
gS:function(){return this.d},
t:function(){var z,y,x
z=this.a
y=z.gl(z)
if(this.b!==y)throw H.c(new P.C(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z.ar(0,x);++this.c
return!0}},
dM:{"^":"A;a,b,$ti",
ga_:function(a){return new H.mu(null,J.ai(this.a),this.b,this.$ti)},
gl:function(a){return J.aL(this.a)},
gW:function(a){return J.eO(this.a)},
gv:function(a){return this.b.$1(J.iR(this.a))},
$asA:function(a,b){return[b]},
u:{
bG:function(a,b,c,d){if(!!J.o(a).$isY)return new H.bE(a,b,[c,d])
return new H.dM(a,b,[c,d])}}},
bE:{"^":"dM;a,b,$ti",$isY:1,
$asY:function(a,b){return[b]}},
mu:{"^":"cS;a,b,c,$ti",
t:function(){var z=this.b
if(z.t()){this.a=this.c.$1(z.gS())
return!0}this.a=null
return!1},
gS:function(){return this.a},
$ascS:function(a,b){return[b]}},
ap:{"^":"b0;a,b,$ti",
gl:function(a){return J.aL(this.a)},
ar:function(a,b){return this.b.$1(J.eN(this.a,b))},
$asb0:function(a,b){return[b]},
$asY:function(a,b){return[b]},
$asA:function(a,b){return[b]}},
K:{"^":"A;a,b,$ti",
ga_:function(a){return new H.bR(J.ai(this.a),this.b,this.$ti)},
aF:function(a,b){return new H.dM(this,b,[H.m(this,0),null])}},
bR:{"^":"cS;a,b,$ti",
t:function(){var z,y
for(z=this.a,y=this.b;z.t();)if(y.$1(z.gS())===!0)return!0
return!1},
gS:function(){return this.a.gS()}},
fW:{"^":"A;a,b,$ti",
ga_:function(a){return new H.ol(J.ai(this.a),this.b,this.$ti)},
u:{
ok:function(a,b,c){if(!!J.o(a).$isY)return new H.l1(a,H.hM(b),[c])
return new H.fW(a,H.hM(b),[c])}}},
l1:{"^":"fW;a,b,$ti",
gl:function(a){var z=J.aL(this.a)-this.b
if(z>=0)return z
return 0},
$isY:1},
ol:{"^":"cS;a,b,$ti",
t:function(){var z,y
for(z=this.a,y=0;y<this.b;++y)z.t()
this.b=0
return z.t()},
gS:function(){return this.a.gS()}},
l2:{"^":"d;$ti",
t:function(){return!1},
gS:function(){return}}}],["","",,H,{"^":"",
cu:function(a,b){var z=a.cR(b)
if(!init.globalState.d.cy)init.globalState.f.bx()
return z},
iA:function(a,b){var z,y,x,w,v,u
z={}
z.a=b
if(b==null){b=[]
z.a=b
y=b}else y=b
if(!J.o(y).$isN)throw H.c(P.E("Arguments to main must be a List: "+H.b(y)))
init.globalState=new H.qR(0,0,1,null,null,null,null,null,null,null,null,null,a)
y=init.globalState
x=self.window==null
w=self.Worker
v=x&&!!self.postMessage
y.x=v
v=!v
if(v)w=w!=null&&$.$get$fb()!=null
else w=!0
y.y=w
y.r=x&&v
y.f=new H.qq(P.bb(null,H.cs),0)
x=P.t
y.z=new H.R(0,null,null,null,null,null,0,[x,H.eg])
y.ch=new H.R(0,null,null,null,null,null,0,[x,null])
if(y.x===!0){w=new H.qQ()
y.Q=w
self.onmessage=function(c,d){return function(e){c(d,e)}}(H.lS,w)
self.dartPrint=self.dartPrint||function(c){return function(d){if(self.console&&self.console.log)self.console.log(d)
else self.postMessage(c(d))}}(H.qS)}if(init.globalState.x===!0)return
y=init.globalState.a++
w=P.a4(null,null,null,x)
v=new H.cl(0,null,!1)
u=new H.eg(y,new H.R(0,null,null,null,null,null,0,[x,H.cl]),w,init.createNewIsolate(),v,new H.bk(H.dj()),new H.bk(H.dj()),!1,!1,[],P.a4(null,null,null,null),null,null,!1,!0,P.a4(null,null,null,null))
w.q(0,0)
u.e0(0,v)
init.globalState.e=u
init.globalState.d=u
if(H.ax(a,{func:1,args:[,]}))u.cR(new H.vm(z,a))
else if(H.ax(a,{func:1,args:[,,]}))u.cR(new H.vn(z,a))
else u.cR(a)
init.globalState.f.bx()},
lW:function(){var z=init.currentScript
if(z!=null)return String(z.src)
if(init.globalState.x===!0)return H.lX()
return},
lX:function(){var z,y
z=new Error().stack
if(z==null){z=function(){try{throw new Error()}catch(x){return x.stack}}()
if(z==null)throw H.c(new P.S("No stack trace"))}y=z.match(new RegExp("^ *at [^(]*\\((.*):[0-9]*:[0-9]*\\)$","m"))
if(y!=null)return y[1]
y=z.match(new RegExp("^[^@]*@(.*):[0-9]*$","m"))
if(y!=null)return y[1]
throw H.c(new P.S('Cannot extract URI from "'+z+'"'))},
lS:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=new H.d7(!0,[]).bY(b.data)
y=J.J(z)
switch(y.j(z,"command")){case"start":init.globalState.b=y.j(z,"id")
x=y.j(z,"functionName")
w=x==null?init.globalState.cx:init.globalFunctions[x]()
v=y.j(z,"args")
u=new H.d7(!0,[]).bY(y.j(z,"msg"))
t=y.j(z,"isSpawnUri")
s=y.j(z,"startPaused")
r=new H.d7(!0,[]).bY(y.j(z,"replyTo"))
y=init.globalState.a++
q=P.t
p=P.a4(null,null,null,q)
o=new H.cl(0,null,!1)
n=new H.eg(y,new H.R(0,null,null,null,null,null,0,[q,H.cl]),p,init.createNewIsolate(),o,new H.bk(H.dj()),new H.bk(H.dj()),!1,!1,[],P.a4(null,null,null,null),null,null,!1,!0,P.a4(null,null,null,null))
p.q(0,0)
n.e0(0,o)
init.globalState.f.a.aB(new H.cs(n,new H.lT(w,v,u,t,s,r),"worker-start"))
init.globalState.d=n
init.globalState.f.bx()
break
case"spawn-worker":break
case"message":if(y.j(z,"port")!=null)y.j(z,"port").F(y.j(z,"msg"))
init.globalState.f.bx()
break
case"close":init.globalState.ch.a3(0,$.$get$fc().j(0,a))
a.terminate()
init.globalState.f.bx()
break
case"log":H.lR(y.j(z,"msg"))
break
case"print":if(init.globalState.x===!0){y=init.globalState.Q
q=P.ag(["command","print","msg",z])
q=new H.bu(!0,P.bU(null,P.t)).bp(q)
y.toString
self.postMessage(q)}else P.ez(y.j(z,"msg"))
break
case"error":throw H.c(y.j(z,"msg"))}},
lR:function(a){var z,y,x,w
if(init.globalState.x===!0){y=init.globalState.Q
x=P.ag(["command","log","msg",a])
x=new H.bu(!0,P.bU(null,P.t)).bp(x)
y.toString
self.postMessage(x)}else try{self.console.log(a)}catch(w){H.B(w)
z=H.D(w)
y=P.cN(z)
throw H.c(y)}},
lU:function(a,b,c,d,e,f){var z,y,x,w
z=init.globalState.d
y=z.a
$.fG=$.fG+("_"+y)
$.fH=$.fH+("_"+y)
y=z.e
x=init.globalState.d.a
w=z.f
f.F(["spawned",new H.ct(y,x),w,z.r])
x=new H.lV(a,b,c,d,z)
if(e===!0){z.fP(w,w)
init.globalState.f.a.aB(new H.cs(z,x,"start isolate"))}else x.$0()},
rl:function(a){return new H.d7(!0,[]).bY(new H.bu(!1,P.bU(null,P.t)).bp(a))},
vm:{"^":"a:2;a,b",
$0:function(){this.b.$1(this.a.a)}},
vn:{"^":"a:2;a,b",
$0:function(){this.b.$2(this.a.a,null)}},
qR:{"^":"d;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",u:{
qS:function(a){var z=P.ag(["command","print","msg",a])
return new H.bu(!0,P.bU(null,P.t)).bp(z)}}},
eg:{"^":"d;i:a<,b,c,ks:d<,jC:e<,f,r,x,cU:y<,z,Q,ch,cx,cy,db,dx",
fP:function(a,b){if(!this.f.w(0,a))return
if(this.Q.q(0,b)&&!this.y)this.y=!0
this.cL()},
kN:function(a){var z,y,x
if(!this.y)return
z=this.Q
z.a3(0,a)
if(z.a===0){for(z=this.z;y=z.length,y!==0;){if(0>=y)return H.f(z,-1)
x=z.pop()
init.globalState.f.a.fN(x)}this.y=!1}this.cL()},
jq:function(a,b){var z,y,x
if(this.ch==null)this.ch=[]
for(z=J.o(a),y=0;x=this.ch,y<x.length;y+=2)if(z.w(a,x[y])){z=this.ch
x=y+1
if(x>=z.length)return H.f(z,x)
z[x]=b
return}x.push(a)
this.ch.push(b)},
kL:function(a){var z,y,x
if(this.ch==null)return
for(z=J.o(a),y=0;x=this.ch,y<x.length;y+=2)if(z.w(a,x[y])){z=this.ch
x=y+2
z.toString
if(typeof z!=="object"||z===null||!!z.fixed$length)H.i(new P.S("removeRange"))
P.ck(y,x,z.length,null,null,null)
z.splice(y,x-y)
return}},
hV:function(a,b){if(!this.r.w(0,a))return
this.db=b},
k0:function(a,b,c){var z=J.o(b)
if(!z.w(b,0))z=z.w(b,1)&&!this.cy
else z=!0
if(z){a.F(c)
return}z=this.cx
if(z==null){z=P.bb(null,null)
this.cx=z}z.aB(new H.qH(a,c))},
k_:function(a,b){var z
if(!this.r.w(0,a))return
z=J.o(b)
if(!z.w(b,0))z=z.w(b,1)&&!this.cy
else z=!0
if(z){this.eN()
return}z=this.cx
if(z==null){z=P.bb(null,null)
this.cx=z}z.aB(this.gkt())},
k5:function(a,b){var z,y,x
z=this.dx
if(z.a===0){if(this.db===!0&&this===init.globalState.e)return
if(self.console&&self.console.error)self.console.error(a,b)
else{P.ez(a)
if(b!=null)P.ez(b)}return}y=new Array(2)
y.fixed$length=Array
y[0]=J.h(a)
y[1]=b==null?null:J.h(b)
for(x=new P.ae(z,z.r,null,null,[null]),x.c=z.e;x.t();)x.d.F(y)},
cR:function(a){var z,y,x,w,v,u,t
z=init.globalState.d
init.globalState.d=this
$=this.d
y=null
x=this.cy
this.cy=!0
try{y=a.$0()}catch(u){w=H.B(u)
v=H.D(u)
this.k5(w,v)
if(this.db===!0){this.eN()
if(this===init.globalState.e)throw u}}finally{this.cy=x
init.globalState.d=z
if(z!=null)$=z.gks()
if(this.cx!=null)for(;t=this.cx,!t.gW(t);)this.cx.dH().$0()}return y},
co:function(a){return this.b.j(0,a)},
e0:function(a,b){var z=this.b
if(z.aa(a))throw H.c(P.cN("Registry: ports must be registered only once."))
z.n(0,a,b)},
cL:function(){var z=this.b
if(z.gl(z)-this.c.a>0||this.y||!this.x)init.globalState.z.n(0,this.a,this)
else this.eN()},
eN:[function(){var z,y,x,w,v
z=this.cx
if(z!=null)z.be(0)
for(z=this.b,y=z.gcu(),y=y.ga_(y);y.t();)y.gS().iw()
z.be(0)
this.c.be(0)
init.globalState.z.a3(0,this.a)
this.dx.be(0)
if(this.ch!=null){for(x=0;z=this.ch,y=z.length,x<y;x+=2){w=z[x]
v=x+1
if(v>=y)return H.f(z,v)
w.F(z[v])}this.ch=null}},"$0","gkt",0,0,7]},
qH:{"^":"a:7;a,b",
$0:function(){this.a.F(this.b)}},
qq:{"^":"d;a,b",
jH:function(){var z=this.a
if(z.b===z.c)return
return z.dH()},
hy:function(){var z,y,x
z=this.jH()
if(z==null){if(init.globalState.e!=null)if(init.globalState.z.aa(init.globalState.e.a))if(init.globalState.r===!0){y=init.globalState.e.b
y=y.gW(y)}else y=!1
else y=!1
else y=!1
if(y)H.i(P.cN("Program exited with open ReceivePorts."))
y=init.globalState
if(y.x===!0){x=y.z
x=x.gW(x)&&y.f.b===0}else x=!1
if(x){y=y.Q
x=P.ag(["command","close"])
x=new H.bu(!0,new P.hH(0,null,null,null,null,null,0,[null,P.t])).bp(x)
y.toString
self.postMessage(x)}return!1}z.kJ()
return!0},
fI:function(){if(self.window!=null)new H.qr(this).$0()
else for(;this.hy(););},
bx:function(){var z,y,x,w,v
if(init.globalState.x!==!0)this.fI()
else try{this.fI()}catch(x){z=H.B(x)
y=H.D(x)
w=init.globalState.Q
v=P.ag(["command","error","msg",H.b(z)+"\n"+H.b(y)])
v=new H.bu(!0,P.bU(null,P.t)).bp(v)
w.toString
self.postMessage(v)}}},
qr:{"^":"a:7;a",
$0:function(){if(!this.a.hy())return
P.pu(C.x,this)}},
cs:{"^":"d;a,b,c",
kJ:function(){var z=this.a
if(z.y){z.z.push(this)
return}z.cR(this.b)}},
qQ:{"^":"d;"},
lT:{"^":"a:2;a,b,c,d,e,f",
$0:function(){H.lU(this.a,this.b,this.c,this.d,this.e,this.f)}},
lV:{"^":"a:7;a,b,c,d,e",
$0:function(){var z,y
z=this.e
z.x=!0
if(this.d!==!0)this.a.$1(this.c)
else{y=this.a
if(H.ax(y,{func:1,args:[,,]}))y.$2(this.b,this.c)
else if(H.ax(y,{func:1,args:[,]}))y.$1(this.b)
else y.$0()}z.cL()}},
hB:{"^":"d;"},
ct:{"^":"hB;b,a",
F:function(a){var z,y,x
z=init.globalState.z.j(0,this.a)
if(z==null)return
y=this.b
if(y.gfv())return
x=H.rl(a)
if(z.gjC()===y){y=J.J(x)
switch(y.j(x,0)){case"pause":z.fP(y.j(x,1),y.j(x,2))
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
break}return}init.globalState.f.a.aB(new H.cs(z,new H.qU(this,x),"receive"))},
w:function(a,b){if(b==null)return!1
return b instanceof H.ct&&J.e(this.b,b.b)},
gB:function(a){return this.b.ged()}},
qU:{"^":"a:2;a,b",
$0:function(){var z=this.a.b
if(!z.gfv())z.il(this.b)}},
ej:{"^":"hB;b,c,a",
F:function(a){var z,y,x
z=P.ag(["command","message","port",this,"msg",a])
y=new H.bu(!0,P.bU(null,P.t)).bp(z)
if(init.globalState.x===!0){init.globalState.Q.toString
self.postMessage(y)}else{x=init.globalState.ch.j(0,this.b)
if(x!=null)x.postMessage(y)}},
w:function(a,b){if(b==null)return!1
return b instanceof H.ej&&J.e(this.b,b.b)&&J.e(this.a,b.a)&&J.e(this.c,b.c)},
gB:function(a){var z,y,x
z=this.b
if(typeof z!=="number")return z.f4()
y=this.a
if(typeof y!=="number")return y.f4()
x=this.c
if(typeof x!=="number")return H.w(x)
return(z<<16^y<<8^x)>>>0}},
cl:{"^":"d;ed:a<,b,fv:c<",
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
z.cL()},
il:function(a){if(this.c)return
this.b.$1(a)},
$isnt:1},
nu:{"^":"ak;a,b",
aE:function(a,b,c,d){var z=this.b
z.toString
return new P.d6(z,[H.m(z,0)]).aE(a,b,c,d)},
eQ:function(a,b,c){return this.aE(a,null,b,c)},
bt:[function(){this.a.bt()
this.b.bt()},"$0","gjy",0,0,7],
ib:function(a){var z=new P.r8(null,0,null,null,null,null,this.gjy(),[null])
this.b=z
this.a.b=z.gjh(z)},
$asak:I.bg},
pq:{"^":"d;a,b,c",
gck:function(){return this.c!=null},
ig:function(a,b){var z,y
if(a===0)z=self.setTimeout==null||init.globalState.x===!0
else z=!1
if(z){this.c=1
z=init.globalState.f
y=init.globalState.d
z.a.aB(new H.cs(y,new H.ps(this,b),"timer"))
this.b=!0}else if(self.setTimeout!=null){++init.globalState.f.b
this.c=self.setTimeout(H.df(new H.pt(this,b),0),a)}else throw H.c(new P.S("Timer greater than 0."))},
u:{
pr:function(a,b){var z=new H.pq(!0,!1,null)
z.ig(a,b)
return z}}},
ps:{"^":"a:7;a,b",
$0:function(){this.a.c=null
this.b.$0()}},
pt:{"^":"a:7;a,b",
$0:function(){this.a.c=null;--init.globalState.f.b
this.b.$0()}},
bk:{"^":"d;ed:a<",
gB:function(a){var z=this.a
if(typeof z!=="number")return z.lc()
z=C.j.ds(z,0)^C.j.bL(z,4294967296)
z=(~z>>>0)+(z<<15>>>0)&4294967295
z=((z^z>>>12)>>>0)*5&4294967295
z=((z^z>>>4)>>>0)*2057&4294967295
return(z^z>>>16)>>>0},
w:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(b instanceof H.bk){z=this.a
y=b.a
return z==null?y==null:z===y}return!1}},
bu:{"^":"d;a,b",
bp:[function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
z=this.b
y=z.j(0,a)
if(y!=null)return["ref",y]
z.n(0,a,z.gl(z))
z=J.o(a)
if(!!z.$iscT)return this.hR(a)
if(!!z.$islP){x=this.ghO()
z=a.gcm()
z=H.bG(z,x,H.y(z,"A",0),null)
z=P.P(z,!0,H.y(z,"A",0))
w=a.gcu()
w=H.bG(w,x,H.y(w,"A",0),null)
return["map",z,P.P(w,!0,H.y(w,"A",0))]}if(!!z.$isfi)return this.hS(a)
if(!!z.$isaZ)this.hB(a)
if(!!z.$isnt)this.d2(a,"RawReceivePorts can't be transmitted:")
if(!!z.$isct)return this.hT(a)
if(!!z.$isej)return this.hU(a)
if(!!z.$isa){v=a.$static_name
if(v==null)this.d2(a,"Closures can't be transmitted:")
return["function",v]}if(!!z.$isbk)return["capability",a.a]
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
hT:function(a){if(this.a)return["sendport",init.globalState.b,a.a,a.b.ged()]
return["raw sendport",a]}},
d7:{"^":"d;a,b",
bY:[function(a){var z,y,x,w,v,u
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
if(typeof a!=="object"||a===null||a.constructor!==Array)throw H.c(P.E("Bad serialized message: "+H.b(a)))
switch(C.a.geG(a)){case"ref":if(1>=a.length)return H.f(a,1)
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
y=H.p(this.cQ(x),[null])
y.fixed$length=Array
return y
case"extendable":if(1>=a.length)return H.f(a,1)
x=a[1]
this.b.push(x)
return H.p(this.cQ(x),[null])
case"mutable":if(1>=a.length)return H.f(a,1)
x=a[1]
this.b.push(x)
return this.cQ(x)
case"const":if(1>=a.length)return H.f(a,1)
x=a[1]
this.b.push(x)
y=H.p(this.cQ(x),[null])
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
return new H.bk(a[1])
case"dart":y=a.length
if(1>=y)return H.f(a,1)
w=a[1]
if(2>=y)return H.f(a,2)
v=a[2]
u=init.instanceFromClassId(w)
this.b.push(u)
this.cQ(v)
return init.initializeEmptyInstance(w,u,v)
default:throw H.c("couldn't deserialize: "+H.b(a))}},"$1","gjJ",2,0,0],
cQ:function(a){var z,y,x
z=J.J(a)
y=0
while(!0){x=z.gl(a)
if(typeof x!=="number")return H.w(x)
if(!(y<x))break
z.n(a,y,this.bY(z.j(a,y)));++y}return a},
jL:function(a){var z,y,x,w,v,u
z=a.length
if(1>=z)return H.f(a,1)
y=a[1]
if(2>=z)return H.f(a,2)
x=a[2]
w=P.aA()
this.b.push(w)
y=J.eP(y,this.gjJ()).ct(0)
for(z=J.J(y),v=J.J(x),u=0;u<z.gl(y);++u){if(u>=y.length)return H.f(y,u)
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
t=new H.ct(u,x)}else t=new H.ej(y,w,x)
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
z=J.J(y)
v=J.J(x)
u=0
while(!0){t=z.gl(y)
if(typeof t!=="number")return H.w(t)
if(!(u<t))break
w[z.j(y,u)]=this.bY(v.j(x,u));++u}return w}}}],["","",,H,{"^":"",
k3:function(){throw H.c(new P.S("Cannot modify unmodifiable Map"))},
ul:function(a){return init.types[a]},
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
bK:function(a){var z,y,x,w,v,u,t,s
z=J.o(a)
y=z.constructor
if(typeof y=="function"){x=y.name
w=typeof x==="string"?x:null}else w=null
if(w==null||z===C.M||!!J.o(a).$isbs){v=C.P(a)
if(v==="Object"){u=a.constructor
if(typeof u=="function"){t=String(u).match(/^\s*function\s*([\w$]*)\s*\(/)
s=t==null?null:t[1]
if(typeof s==="string"&&/^\w+$/.test(s))w=s}if(w==null)w=v}else w=v}w=w
if(w.length>1&&C.b.cA(w,0)===36)w=C.b.bJ(w,1)
return function(b,c){return b.replace(/[^<,> ]+/g,function(d){return c[d]||d})}(w+H.di(H.cx(a),0,null),init.mangledGlobalNames)},
cX:function(a){return"Instance of '"+H.bK(a)+"'"},
aq:function(a){var z
if(a<=65535)return String.fromCharCode(a)
if(a<=1114111){z=a-65536
return String.fromCharCode((55296|C.e.ds(z,10))>>>0,56320|z&1023)}throw H.c(P.a6(a,0,1114111,null,null))},
bo:function(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
nl:function(a){var z=H.bo(a).getFullYear()+0
return z},
nj:function(a){var z=H.bo(a).getMonth()+1
return z},
nf:function(a){var z=H.bo(a).getDate()+0
return z},
ng:function(a){var z=H.bo(a).getHours()+0
return z},
ni:function(a){var z=H.bo(a).getMinutes()+0
return z},
nk:function(a){var z=H.bo(a).getSeconds()+0
return z},
nh:function(a){var z=H.bo(a).getMilliseconds()+0
return z},
dX:function(a,b){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.c(H.T(a))
return a[b]},
fI:function(a,b,c){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.c(H.T(a))
a[b]=c},
w:function(a){throw H.c(H.T(a))},
f:function(a,b){if(a==null)J.aL(a)
throw H.c(H.aI(a,b))},
aI:function(a,b){var z,y
if(typeof b!=="number"||Math.floor(b)!==b)return new P.b7(!0,b,"index",null)
z=J.aL(a)
if(!(b<0)){if(typeof z!=="number")return H.w(z)
y=b>=z}else y=!0
if(y)return P.cQ(b,a,"index",null,z)
return P.cj(b,"index",null)},
T:function(a){return new P.b7(!0,a,null,null)},
dd:function(a){if(typeof a!=="number")throw H.c(H.T(a))
return a},
rH:function(a){if(typeof a!=="number"||Math.floor(a)!==a)throw H.c(H.T(a))
return a},
by:function(a){if(typeof a!=="string")throw H.c(H.T(a))
return a},
c:function(a){var z
if(a==null)a=new P.cV()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.iJ})
z.name=""}else z.toString=H.iJ
return z},
iJ:function(){return J.h(this.dartException)},
i:function(a){throw H.c(a)},
ar:function(a){throw H.c(new P.C(a))},
B:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.ws(a)
if(a==null)return
if(a instanceof H.dw)return z.$1(a.a)
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.e.ds(x,16)&8191)===10)switch(w){case 438:return z.$1(H.dD(H.b(y)+" (Error "+w+")",null))
case 445:case 5007:v=H.b(y)+" (Error "+w+")"
return z.$1(new H.fx(v,null))}}if(a instanceof TypeError){u=$.$get$hi()
t=$.$get$hj()
s=$.$get$hk()
r=$.$get$hl()
q=$.$get$hp()
p=$.$get$hq()
o=$.$get$hn()
$.$get$hm()
n=$.$get$hs()
m=$.$get$hr()
l=u.bw(y)
if(l!=null)return z.$1(H.dD(y,l))
else{l=t.bw(y)
if(l!=null){l.method="call"
return z.$1(H.dD(y,l))}else{l=s.bw(y)
if(l==null){l=r.bw(y)
if(l==null){l=q.bw(y)
if(l==null){l=p.bw(y)
if(l==null){l=o.bw(y)
if(l==null){l=r.bw(y)
if(l==null){l=n.bw(y)
if(l==null){l=m.bw(y)
v=l!=null}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0
if(v)return z.$1(new H.fx(y,l==null?null:l.method))}}return z.$1(new H.py(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.h4()
y=function(b){try{return String(b)}catch(k){}return null}(a)
return z.$1(new P.b7(!1,null,null,typeof y==="string"?y.replace(/^RangeError:\s*/,""):y))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.h4()
return a},
D:function(a){var z
if(a instanceof H.dw)return a.b
if(a==null)return new H.hJ(a,null)
z=a.$cachedTrace
if(z!=null)return z
return a.$cachedTrace=new H.hJ(a,null)},
uD:function(a){if(a==null||typeof a!='object')return J.j(a)
else return H.aC(a)},
u2:function(a,b){var z,y,x,w
z=a.length
for(y=0;y<z;y=w){x=y+1
w=x+1
b.n(0,a[y],a[x])}return b},
us:function(a,b,c,d,e,f,g){switch(c){case 0:return H.cu(b,new H.ut(a))
case 1:return H.cu(b,new H.uu(a,d))
case 2:return H.cu(b,new H.uv(a,d,e))
case 3:return H.cu(b,new H.uw(a,d,e,f))
case 4:return H.cu(b,new H.ux(a,d,e,f,g))}throw H.c(P.cN("Unsupported number of arguments for wrapped closure"))},
df:function(a,b){var z=a.$identity
if(!!z)return z
z=function(c,d,e,f){return function(g,h,i,j){return f(c,e,d,g,h,i,j)}}(a,b,init.globalState.d,H.us)
a.$identity=z
return z},
k_:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=z.$callName
if(!!J.o(c).$isN){z.$reflectionInfo=c
x=H.nw(z).r}else x=c
w=d?Object.create(new H.oE().constructor.prototype):Object.create(new H.dp(null,null,null,null).constructor.prototype)
w.$initialize=w.constructor
if(d)v=function(){this.$initialize()}
else{u=$.aM
$.aM=J.an(u,1)
v=new Function("a,b,c,d"+u,"this.$initialize(a,b,c,d"+u+")")}w.constructor=v
v.prototype=w
if(!d){t=e.length==1&&!0
s=H.f0(a,z,t)
s.$reflectionInfo=c}else{w.$static_name=f
s=z
t=!1}if(typeof x=="number")r=function(g,h){return function(){return g(h)}}(H.ul,x)
else if(typeof x=="function")if(d)r=x
else{q=t?H.eW:H.dq
r=function(g,h){return function(){return g.apply({$receiver:h(this)},arguments)}}(x,q)}else throw H.c("Error in reflectionInfo.")
w.$S=r
w[y]=s
for(u=b.length,p=1;p<u;++p){o=b[p]
n=o.$callName
if(n!=null){m=d?o:H.f0(a,o,t)
w[n]=m}}w["call*"]=s
w.$R=z.$R
w.$D=z.$D
return v},
jX:function(a,b,c,d){var z=H.dq
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},
f0:function(a,b,c){var z,y,x,w,v,u,t
if(c)return H.jZ(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
v=!w||y>=27
if(v)return H.jX(y,!w,z,b)
if(y===0){w=$.aM
$.aM=J.an(w,1)
u="self"+H.b(w)
w="return function(){var "+u+" = this."
v=$.bD
if(v==null){v=H.cG("self")
$.bD=v}return new Function(w+H.b(v)+";return "+u+"."+H.b(z)+"();}")()}t="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w=$.aM
$.aM=J.an(w,1)
t+=H.b(w)
w="return function("+t+"){return this."
v=$.bD
if(v==null){v=H.cG("self")
$.bD=v}return new Function(w+H.b(v)+"."+H.b(z)+"("+t+");}")()},
jY:function(a,b,c,d){var z,y
z=H.dq
y=H.eW
switch(b?-1:a){case 0:throw H.c(new H.nI("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,z,y)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,z,y)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,z,y)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,z,y)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,z,y)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,z,y)
default:return function(e,f,g,h){return function(){h=[g(this)]
Array.prototype.push.apply(h,arguments)
return e.apply(f(this),h)}}(d,z,y)}},
jZ:function(a,b){var z,y,x,w,v,u,t,s
z=H.jO()
y=$.eV
if(y==null){y=H.cG("receiver")
$.eV=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.jY(w,!u,x,b)
if(w===1){y="return function(){return this."+H.b(z)+"."+H.b(x)+"(this."+H.b(y)+");"
u=$.aM
$.aM=J.an(u,1)
return new Function(y+H.b(u)+"}")()}s="abcdefghijklmnopqrstuvwxyz".split("").splice(0,w-1).join(",")
y="return function("+s+"){return this."+H.b(z)+"."+H.b(x)+"(this."+H.b(y)+", "+s+");"
u=$.aM
$.aM=J.an(u,1)
return new Function(y+H.b(u)+"}")()},
er:function(a,b,c,d,e,f){var z
b.fixed$length=Array
if(!!J.o(c).$isN){c.fixed$length=Array
z=c}else z=c
return H.k_(a,b,z,!!d,e,f)},
uM:function(a,b){var z=J.J(b)
throw H.c(H.cI(H.bK(a),z.aH(b,3,z.gl(b))))},
H:function(a,b){var z
if(a!=null)z=(typeof a==="object"||typeof a==="function")&&J.o(a)[b]
else z=!0
if(z)return a
H.uM(a,b)},
et:function(a){var z=J.o(a)
return"$S" in z?z.$S():null},
ax:function(a,b){var z
if(a==null)return!1
z=H.et(a)
return z==null?!1:H.ew(z,b)},
id:function(a,b){var z,y
if(a==null)return a
if(H.ax(a,b))return a
z=H.X(b,null)
y=H.et(a)
throw H.c(H.cI(y!=null?H.X(y,null):H.bK(a),z))},
wp:function(a){throw H.c(new P.kg(a))},
dj:function(){return(Math.random()*0x100000000>>>0)+(Math.random()*0x100000000>>>0)*4294967296},
bf:function(a){return new H.au(a,null)},
p:function(a,b){a.$ti=b
return a},
cx:function(a){if(a==null)return
return a.$ti},
ij:function(a,b){return H.eK(a["$as"+H.b(b)],H.cx(a))},
y:function(a,b,c){var z=H.ij(a,b)
return z==null?null:z[c]},
m:function(a,b){var z=H.cx(a)
return z==null?null:z[b]},
X:function(a,b){var z
if(a==null)return"dynamic"
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a[0].builtin$cls+H.di(a,1,b)
if(typeof a=="function")return a.builtin$cls
if(typeof a==="number"&&Math.floor(a)===a)return H.b(b==null?a:b.$1(a))
if(typeof a.func!="undefined"){z=a.typedef
if(z!=null)return H.X(z,b)
return H.rq(a,b)}return"unknown-reified-type"},
rq:function(a,b){var z,y,x,w,v,u,t,s,r,q,p
z=!!a.v?"void":H.X(a.ret,b)
if("args" in a){y=a.args
for(x=y.length,w="",v="",u=0;u<x;++u,v=", "){t=y[u]
w=w+v+H.X(t,b)}}else{w=""
v=""}if("opt" in a){s=a.opt
w+=v+"["
for(x=s.length,v="",u=0;u<x;++u,v=", "){t=s[u]
w=w+v+H.X(t,b)}w+="]"}if("named" in a){r=a.named
w+=v+"{"
for(x=H.u1(r),q=x.length,v="",u=0;u<q;++u,v=", "){p=x[u]
w=w+v+H.X(r[p],b)+(" "+H.b(p))}w+="}"}return"("+w+") => "+z},
di:function(a,b,c){var z,y,x,w,v,u
if(a==null)return""
z=new P.bQ("")
for(y=b,x=!0,w=!0,v="";y<a.length;++y){if(x)x=!1
else z.C=v+", "
u=a[y]
if(u!=null)w=!1
v=z.C+=H.X(u,c)}return w?"":"<"+z.k(0)+">"},
ik:function(a){var z,y
if(a instanceof H.a){z=H.et(a)
if(z!=null)return H.X(z,null)}y=J.o(a).constructor.builtin$cls
if(a==null)return y
return y+H.di(a.$ti,0,null)},
eK:function(a,b){if(a==null)return b
a=a.apply(null,b)
if(a==null)return
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a
if(typeof a=="function")return a.apply(null,b)
return b},
aU:function(a,b,c,d){var z,y
if(a==null)return!1
z=H.cx(a)
y=J.o(a)
if(y[b]==null)return!1
return H.i1(H.eK(y[d],z),c)},
aK:function(a,b,c,d){if(a==null)return a
if(H.aU(a,b,c,d))return a
throw H.c(H.cI(H.bK(a),function(e,f){return e.replace(/[^<,> ]+/g,function(g){return f[g]||g})}(b.substring(3)+H.di(c,0,null),init.mangledGlobalNames)))},
i1:function(a,b){var z,y
if(a==null||b==null)return!0
z=a.length
for(y=0;y<z;++y)if(!H.am(a[y],b[y]))return!1
return!0},
be:function(a,b,c){return a.apply(b,H.ij(b,c))},
de:function(a,b){var z,y,x
if(a==null)return b==null||b.builtin$cls==="d"||b.builtin$cls==="as"
if(b==null)return!0
z=H.cx(a)
a=J.o(a)
y=a.constructor
if(z!=null){z=z.slice()
z.splice(0,0,y)
y=z}if('func' in b){x=a.$S
if(x==null)return!1
return H.ew(x.apply(a,null),b)}return H.am(y,b)},
iE:function(a,b){if(a!=null&&!H.de(a,b))throw H.c(H.cI(H.bK(a),H.X(b,null)))
return a},
am:function(a,b){var z,y,x,w,v,u
if(a===b)return!0
if(a==null||b==null)return!0
if(a.builtin$cls==="as")return!0
if('func' in b)return H.ew(a,b)
if('func' in a)return b.builtin$cls==="bF"||b.builtin$cls==="d"
z=typeof a==="object"&&a!==null&&a.constructor===Array
y=z?a[0]:a
x=typeof b==="object"&&b!==null&&b.constructor===Array
w=x?b[0]:b
if(w!==y){v=H.X(w,null)
if(!('$is'+v in y.prototype))return!1
u=y.prototype["$as"+v]}else u=null
if(!z&&u==null||!x)return!0
z=z?a.slice(1):null
x=b.slice(1)
return H.i1(H.eK(u,z),x)},
i0:function(a,b,c){var z,y,x,w,v
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
rB:function(a,b){var z,y,x,w,v,u
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
ew:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
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
if(t===s){if(!H.i0(x,w,!1))return!1
if(!H.i0(v,u,!0))return!1}else{for(p=0;p<t;++p){o=x[p]
n=w[p]
if(!(H.am(o,n)||H.am(n,o)))return!1}for(m=p,l=0;m<s;++l,++m){o=v[l]
n=w[m]
if(!(H.am(o,n)||H.am(n,o)))return!1}for(m=0;m<q;++l,++m){o=v[l]
n=u[m]
if(!(H.am(o,n)||H.am(n,o)))return!1}}return H.rB(a.named,b.named)},
wh:function(a,b,c){var z
if(typeof b==="string")return a.indexOf(b,c)>=0
else{z=J.o(b)
if(!!z.$isdB){z=C.b.bJ(a,c)
return b.b.test(z)}else{z=z.ez(b,C.b.bJ(a,c))
return!z.gW(z)}}},
wj:function(a,b,c,d){var z,y,x
z=b.fn(a,d)
if(z==null)return a
y=z.b
x=y.index
return H.eJ(a,x,x+y[0].length,c)},
n:function(a,b,c){var z,y,x
H.by(c)
if(b==="")if(a==="")return c
else{z=a.length
y=H.b(c)
for(x=0;x<z;++x)y=y+a[x]+H.b(c)
return y.charCodeAt(0)==0?y:y}else return a.replace(new RegExp(b.replace(/[[\]{}()*+?.\\^$|]/g,"\\$&"),'g'),c.replace(/\$/g,"$$$$"))},
xe:[function(a){return a},"$1","hN",2,0,24],
wi:function(a,b,c,d){var z,y,x,w,v,u
z=J.o(b)
if(!z.$isdU)throw H.c(P.cD(b,"pattern","is not a Pattern"))
for(z=z.ez(b,a),z=new H.hz(z.a,z.b,z.c,null),y=0,x="";z.t();){w=z.d
v=w.b
u=v.index
x=x+H.b(H.hN().$1(C.b.aH(a,y,u)))+H.b(c.$1(w))
y=u+v[0].length}z=x+H.b(H.hN().$1(C.b.bJ(a,y)))
return z.charCodeAt(0)==0?z:z},
iD:function(a,b,c,d){var z,y,x,w,v,u
if(typeof b==="string"){z=a.indexOf(b,d)
if(z<0)return a
return H.eJ(a,z,z+b.length,c)}y=J.o(b)
if(!!y.$isdB)return d===0?a.replace(b.b,c.replace(/\$/g,"$$$$")):H.wj(a,b,c,d)
if(b==null)H.i(H.T(b))
y=y.dt(b,a,d)
x=y.ga_(y)
if(!x.t())return a
w=x.gS()
y=w.gf8()
v=w.gh0()
H.by(c)
u=P.ck(y,v,a.length,null,null,null)
H.rH(u)
return H.eJ(a,y,u,c)},
eJ:function(a,b,c,d){var z,y
z=a.substring(0,b)
y=a.substring(c)
return z+H.b(d)+y},
k2:{"^":"d;$ti",
gW:function(a){return this.gl(this)===0},
gas:function(a){return this.gl(this)!==0},
k:function(a){return P.dN(this)},
n:function(a,b,c){return H.k3()},
$isG:1},
k4:{"^":"k2;a,b,c,$ti",
gl:function(a){return this.a},
aa:function(a){if(typeof a!=="string")return!1
if("__proto__"===a)return!1
return this.b.hasOwnProperty(a)},
j:function(a,b){if(!this.aa(b))return
return this.fo(b)},
fo:function(a){return this.b[a]},
Z:function(a,b){var z,y,x,w
z=this.c
for(y=z.length,x=0;x<y;++x){w=z[x]
b.$2(w,this.fo(w))}}},
nv:{"^":"d;a,b,c,d,e,f,r,x",u:{
nw:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z.fixed$length=Array
z=z
y=z[0]
x=z[1]
return new H.nv(a,z,(y&1)===1,y>>1,x>>1,(x&1)===1,z[2],null)}}},
pv:{"^":"d;a,b,c,d,e,f",
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
u:{
aP:function(a){var z,y,x,w,v,u
a=a.replace(String({}),'$receiver$').replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
z=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(z==null)z=[]
y=z.indexOf("\\$arguments\\$")
x=z.indexOf("\\$argumentsExpr\\$")
w=z.indexOf("\\$expr\\$")
v=z.indexOf("\\$method\\$")
u=z.indexOf("\\$receiver\\$")
return new H.pv(a.replace(new RegExp('\\\\\\$arguments\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$argumentsExpr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$expr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$method\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$receiver\\\\\\$','g'),'((?:x|[^x])*)'),y,x,w,v,u)},
d5:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},
ho:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},
fx:{"^":"a3;a,b",
k:function(a){var z=this.b
if(z==null)return"NullError: "+H.b(this.a)
return"NullError: method not found: '"+H.b(z)+"' on null"}},
m1:{"^":"a3;a,b,c",
k:function(a){var z,y
z=this.b
if(z==null)return"NoSuchMethodError: "+H.b(this.a)
y=this.c
if(y==null)return"NoSuchMethodError: method not found: '"+z+"' ("+H.b(this.a)+")"
return"NoSuchMethodError: method not found: '"+z+"' on '"+y+"' ("+H.b(this.a)+")"},
u:{
dD:function(a,b){var z,y
z=b==null
y=z?null:b.method
return new H.m1(a,y,z?null:b.receiver)}}},
py:{"^":"a3;a",
k:function(a){var z=this.a
return z.length===0?"Error":"Error: "+z}},
dw:{"^":"d;a,bq:b<"},
ws:{"^":"a:0;a",
$1:function(a){if(!!J.o(a).$isa3)if(a.$thrownJsError==null)a.$thrownJsError=this.a
return a}},
hJ:{"^":"d;a,b",
k:function(a){var z,y
z=this.b
if(z!=null)return z
z=this.a
y=z!==null&&typeof z==="object"?z.stack:null
z=y==null?"":y
this.b=z
return z}},
ut:{"^":"a:2;a",
$0:function(){return this.a.$0()}},
uu:{"^":"a:2;a,b",
$0:function(){return this.a.$1(this.b)}},
uv:{"^":"a:2;a,b,c",
$0:function(){return this.a.$2(this.b,this.c)}},
uw:{"^":"a:2;a,b,c,d",
$0:function(){return this.a.$3(this.b,this.c,this.d)}},
ux:{"^":"a:2;a,b,c,d,e",
$0:function(){return this.a.$4(this.b,this.c,this.d,this.e)}},
a:{"^":"d;",
k:function(a){return"Closure '"+H.bK(this).trim()+"'"},
ghJ:function(){return this},
$isbF:1,
ghJ:function(){return this}},
hh:{"^":"a;"},
oE:{"^":"hh;",
k:function(a){var z=this.$static_name
if(z==null)return"Closure of unknown static method"
return"Closure '"+z+"'"}},
dp:{"^":"hh;a,b,c,d",
w:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof H.dp))return!1
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
return"Closure '"+H.b(this.d)+"' of "+H.cX(z)},
u:{
dq:function(a){return a.a},
eW:function(a){return a.c},
jO:function(){var z=$.bD
if(z==null){z=H.cG("self")
$.bD=z}return z},
cG:function(a){var z,y,x,w,v
z=new H.dp("self","target","receiver","name")
y=Object.getOwnPropertyNames(z)
y.fixed$length=Array
x=y
for(y=x.length,w=0;w<y;++w){v=x[w]
if(z[v]===a)return v}}}},
jT:{"^":"a3;a",
k:function(a){return this.a},
u:{
cI:function(a,b){return new H.jT("CastError: Casting value of type '"+a+"' to incompatible type '"+b+"'")}}},
nI:{"^":"a3;a",
k:function(a){return"RuntimeError: "+H.b(this.a)}},
au:{"^":"d;a,b",
k:function(a){var z,y
z=this.b
if(z!=null)return z
y=function(b,c){return b.replace(/[^<,> ]+/g,function(d){return c[d]||d})}(this.a,init.mangledGlobalNames)
this.b=y
return y},
gB:function(a){return J.j(this.a)},
w:function(a,b){if(b==null)return!1
return b instanceof H.au&&J.e(this.a,b.a)}},
R:{"^":"d;a,b,c,d,e,f,r,$ti",
gl:function(a){return this.a},
gW:function(a){return this.a===0},
gas:function(a){return!this.gW(this)},
gcm:function(){return new H.mi(this,[H.m(this,0)])},
gcu:function(){return H.bG(this.gcm(),new H.m0(this),H.m(this,0),H.m(this,1))},
aa:function(a){var z,y
if(typeof a==="string"){z=this.b
if(z==null)return!1
return this.fj(z,a)}else if(typeof a==="number"&&(a&0x3ffffff)===a){y=this.c
if(y==null)return!1
return this.fj(y,a)}else return this.kh(a)},
kh:function(a){var z=this.d
if(z==null)return!1
return this.cT(this.dm(z,this.cS(a)),a)>=0},
j:function(a,b){var z,y,x
if(typeof b==="string"){z=this.b
if(z==null)return
y=this.cD(z,b)
return y==null?null:y.gc_()}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null)return
y=this.cD(x,b)
return y==null?null:y.gc_()}else return this.ki(b)},
ki:function(a){var z,y,x
z=this.d
if(z==null)return
y=this.dm(z,this.cS(a))
x=this.cT(y,a)
if(x<0)return
return y[x].gc_()},
n:function(a,b,c){var z,y
if(typeof b==="string"){z=this.b
if(z==null){z=this.ef()
this.b=z}this.fd(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=this.ef()
this.c=y}this.fd(y,b,c)}else this.kk(b,c)},
kk:function(a,b){var z,y,x,w
z=this.d
if(z==null){z=this.ef()
this.d=z}y=this.cS(a)
x=this.dm(z,y)
if(x==null)this.er(z,y,[this.eg(a,b)])
else{w=this.cT(x,a)
if(w>=0)x[w].sc_(b)
else x.push(this.eg(a,b))}},
kK:function(a,b){var z
if(this.aa(a))return this.j(0,a)
z=b.$0()
this.n(0,a,z)
return z},
a3:function(a,b){if(typeof b==="string")return this.fH(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.fH(this.c,b)
else return this.kj(b)},
kj:function(a){var z,y,x,w
z=this.d
if(z==null)return
y=this.dm(z,this.cS(a))
x=this.cT(y,a)
if(x<0)return
w=y.splice(x,1)[0]
this.fJ(w)
return w.gc_()},
be:function(a){if(this.a>0){this.f=null
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
fd:function(a,b,c){var z=this.cD(a,b)
if(z==null)this.er(a,b,this.eg(b,c))
else z.sc_(c)},
fH:function(a,b){var z
if(a==null)return
z=this.cD(a,b)
if(z==null)return
this.fJ(z)
this.fk(a,b)
return z.gc_()},
eg:function(a,b){var z,y
z=new H.mh(a,b,null,null,[null,null])
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.d=y
y.c=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
fJ:function(a){var z,y
z=a.giY()
y=a.c
if(z==null)this.e=y
else z.c=y
if(y==null)this.f=z
else y.d=z;--this.a
this.r=this.r+1&67108863},
cS:function(a){return J.j(a)&0x3ffffff},
cT:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.e(a[y].gh8(),b))return y
return-1},
k:function(a){return P.dN(this)},
cD:function(a,b){return a[b]},
dm:function(a,b){return a[b]},
er:function(a,b,c){a[b]=c},
fk:function(a,b){delete a[b]},
fj:function(a,b){return this.cD(a,b)!=null},
ef:function(){var z=Object.create(null)
this.er(z,"<non-identifier-key>",z)
this.fk(z,"<non-identifier-key>")
return z},
$islP:1,
$isG:1,
u:{
fl:function(a,b){return new H.R(0,null,null,null,null,null,0,[a,b])}}},
m0:{"^":"a:0;a",
$1:function(a){return this.a.j(0,a)}},
mh:{"^":"d;h8:a<,c_:b@,c,iY:d<,$ti"},
mi:{"^":"Y;a,$ti",
gl:function(a){return this.a.a},
gW:function(a){return this.a.a===0},
ga_:function(a){var z,y
z=this.a
y=new H.mj(z,z.r,null,null,this.$ti)
y.c=z.e
return y},
a7:function(a,b){return this.a.aa(b)},
Z:function(a,b){var z,y,x
z=this.a
y=z.e
x=z.r
for(;y!=null;){b.$1(y.a)
if(x!==z.r)throw H.c(new P.C(z))
y=y.c}}},
mj:{"^":"d;a,b,c,d,$ti",
gS:function(){return this.d},
t:function(){var z=this.a
if(this.b!==z.r)throw H.c(new P.C(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.c
return!0}}}},
dB:{"^":"d;a,b,c,d",
k:function(a){return"RegExp/"+this.a+"/"},
giU:function(){var z=this.c
if(z!=null)return z
z=this.b
z=H.dC(this.a,z.multiline,!z.ignoreCase,!0)
this.c=z
return z},
giT:function(){var z=this.d
if(z!=null)return z
z=this.b
z=H.dC(this.a+"|()",z.multiline,!z.ignoreCase,!0)
this.d=z
return z},
dt:function(a,b,c){if(c>b.length)throw H.c(P.a6(c,0,b.length,null,null))
return new H.q6(this,b,c)},
ez:function(a,b){return this.dt(a,b,0)},
fn:function(a,b){var z,y
z=this.giU()
z.lastIndex=b
y=z.exec(a)
if(y==null)return
return new H.hI(this,y)},
iE:function(a,b){var z,y
z=this.giT()
z.lastIndex=b
y=z.exec(a)
if(y==null)return
if(0>=y.length)return H.f(y,-1)
if(y.pop()!=null)return
return new H.hI(this,y)},
hd:function(a,b,c){if(c>b.length)throw H.c(P.a6(c,0,b.length,null,null))
return this.iE(b,c)},
$isdU:1,
u:{
dC:function(a,b,c,d){var z,y,x,w
z=b?"m":""
y=c?"":"i"
x=d?"g":""
w=function(e,f){try{return new RegExp(e,f)}catch(v){return v}}(a,z+y+x)
if(w instanceof RegExp)return w
throw H.c(new P.f8("Illegal RegExp pattern ("+String(w)+")",a,null))}}},
hI:{"^":"d;a,b",
gf8:function(){return this.b.index},
gh0:function(){var z=this.b
return z.index+z[0].length},
j:function(a,b){var z=this.b
if(b>>>0!==b||b>=z.length)return H.f(z,b)
return z[b]},
$isbn:1},
q6:{"^":"cc;a,b,c",
ga_:function(a){return new H.hz(this.a,this.b,this.c,null)},
$ascc:function(){return[P.bn]},
$asA:function(){return[P.bn]}},
hz:{"^":"d;a,b,c,d",
gS:function(){return this.d},
t:function(){var z,y,x,w
z=this.b
if(z==null)return!1
y=this.c
if(y<=z.length){x=this.a.fn(z,y)
if(x!=null){this.d=x
z=x.b
y=z.index
w=y+z[0].length
this.c=y===w?w+1:w
return!0}}this.d=null
this.b=null
return!1}},
h9:{"^":"d;f8:a<,b,c",
gh0:function(){return this.a+this.c.length},
j:function(a,b){if(b!==0)H.i(P.cj(b,null,null))
return this.c},
$isbn:1},
r4:{"^":"A;a,b,c",
ga_:function(a){return new H.r5(this.a,this.b,this.c,null)},
$asA:function(){return[P.bn]}},
r5:{"^":"d;a,b,c,d",
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
this.d=new H.h9(u,w,y)
this.c=t===this.c?t+1:t
return!0},
gS:function(){return this.d}}}],["","",,H,{"^":"",
u1:function(a){var z=H.p(a?Object.keys(a):[],[null])
z.fixed$length=Array
return z}}],["","",,H,{"^":"",
uL:function(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)}}],["","",,P,{"^":"",
q7:function(){var z,y,x
z={}
if(self.scheduleImmediate!=null)return P.rC()
if(self.MutationObserver!=null&&self.document!=null){y=self.document.createElement("div")
x=self.document.createElement("span")
z.a=null
new self.MutationObserver(H.df(new P.q9(z),1)).observe(y,{childList:true})
return new P.q8(z,y,x)}else if(self.setImmediate!=null)return P.rD()
return P.rE()},
x8:[function(a){++init.globalState.f.b
self.scheduleImmediate(H.df(new P.qa(a),0))},"$1","rC",2,0,13],
x9:[function(a){++init.globalState.f.b
self.setImmediate(H.df(new P.qb(a),0))},"$1","rD",2,0,13],
xa:[function(a){P.e6(C.x,a)},"$1","rE",2,0,13],
aH:function(a,b){P.ek(null,a)
return b.gh4()},
av:function(a,b){P.ek(a,b)},
aG:function(a,b){b.bX(a)},
aF:function(a,b){b.eD(H.B(a),H.D(a))},
ek:function(a,b){var z,y,x,w
z=new P.rf(b)
y=new P.rg(b)
x=J.o(a)
if(!!x.$isF)a.es(z,y)
else if(!!x.$isQ)a.eW(z,y)
else{w=new P.F(0,$.q,null,[null])
w.a=4
w.c=a
w.es(z,null)}},
aw:function(a){var z=function(b,c){return function(d,e){while(true)try{b(d,e)
break}catch(y){e=y
d=c}}}(a,1)
$.q.toString
return new P.rA(z)},
da:function(a,b,c){var z,y,x
if(b===0){if(c.geJ())c.c.eC()
else c.a.bt()
return}else if(b===1){if(c.geJ())c.c.eD(H.B(a),H.D(a))
else{z=H.B(a)
y=H.D(a)
c.a.ey(z,y)
c.a.bt()}return}if(a instanceof P.bS){if(c.geJ()){b.$2(2,null)
return}z=a.b
if(z===0){z=a.a
J.dm(c.a,z)
P.cy(new P.rd(b,c))
return}else if(z===1){x=a.a
c.a.ju(x,!1).c3(new P.re(b,c))
return}}P.ek(a,b)},
rz:function(a){return a.gdZ()},
eo:function(a,b){if(H.ax(a,{func:1,args:[P.as,P.as]})){b.toString
return a}else{b.toString
return a}},
az:function(a){return new P.r6(new P.F(0,$.q,null,[a]),[a])},
ro:function(a,b,c){$.q.toString
a.bj(b,c)},
rs:function(){var z,y
for(;z=$.bv,z!=null;){$.bW=null
y=z.gcp()
$.bv=y
if(y==null)$.bV=null
z.gjw().$0()}},
xd:[function(){$.el=!0
try{P.rs()}finally{$.bW=null
$.el=!1
if($.bv!=null)$.$get$ea().$1(P.i2())}},"$0","i2",0,0,7],
hX:function(a){var z=new P.hA(a,null)
if($.bv==null){$.bV=z
$.bv=z
if(!$.el)$.$get$ea().$1(P.i2())}else{$.bV.b=z
$.bV=z}},
ry:function(a){var z,y,x
z=$.bv
if(z==null){P.hX(a)
$.bW=$.bV
return}y=new P.hA(a,null)
x=$.bW
if(x==null){y.b=z
$.bW=y
$.bv=y}else{y.b=x.b
x.b=y
$.bW=y
if(y.b==null)$.bV=y}},
cy:function(a){var z=$.q
if(C.i===z){P.bx(null,null,C.i,a)
return}z.toString
P.bx(null,null,z,z.eA(a,!0))},
x3:function(a,b){return new P.r3(null,a,!1,[b])},
ep:function(a){var z,y,x,w
if(a==null)return
try{a.$0()}catch(x){z=H.B(x)
y=H.D(x)
w=$.q
w.toString
P.bw(null,null,w,z,y)}},
rt:[function(a,b){var z=$.q
z.toString
P.bw(null,null,z,a,b)},function(a){return P.rt(a,null)},"$2","$1","rG",2,2,16,0],
xc:[function(){},"$0","rF",0,0,7],
hW:function(a,b,c){var z,y,x,w,v,u,t
try{b.$1(a.$0())}catch(u){z=H.B(u)
y=H.D(u)
$.q.toString
x=null
if(x==null)c.$2(z,y)
else{t=x.gbu()
w=t
v=x.gbq()
c.$2(w,v)}}},
rh:function(a,b,c,d){var z=a.ci()
if(!!J.o(z).$isQ&&z!==$.$get$bl())z.c5(new P.rj(b,c,d))
else b.bj(c,d)},
hK:function(a,b){return new P.ri(a,b)},
hL:function(a,b,c){var z=a.ci()
if(!!J.o(z).$isQ&&z!==$.$get$bl())z.c5(new P.rk(b,c))
else b.bi(c)},
rc:function(a,b,c){$.q.toString
a.cc(b,c)},
pu:function(a,b){var z=$.q
if(z===C.i){z.toString
return P.e6(a,b)}return P.e6(a,z.eA(b,!0))},
e6:function(a,b){var z=C.e.bL(a.a,1000)
return H.pr(z<0?0:z,b)},
pK:function(){return $.q},
bw:function(a,b,c,d,e){var z={}
z.a=d
P.ry(new P.rw(z,e))},
hT:function(a,b,c,d){var z,y
y=$.q
if(y===c)return d.$0()
$.q=c
z=y
try{y=d.$0()
return y}finally{$.q=z}},
hV:function(a,b,c,d,e){var z,y
y=$.q
if(y===c)return d.$1(e)
$.q=c
z=y
try{y=d.$1(e)
return y}finally{$.q=z}},
hU:function(a,b,c,d,e,f){var z,y
y=$.q
if(y===c)return d.$2(e,f)
$.q=c
z=y
try{y=d.$2(e,f)
return y}finally{$.q=z}},
bx:function(a,b,c,d){var z=C.i!==c
if(z)d=c.eA(d,!(!z||!1))
P.hX(d)},
q9:{"^":"a:0;a",
$1:function(a){var z,y;--init.globalState.f.b
z=this.a
y=z.a
z.a=null
y.$0()}},
q8:{"^":"a:45;a,b,c",
$1:function(a){var z,y;++init.globalState.f.b
this.a.a=a
z=this.b
y=this.c
z.firstChild?z.removeChild(y):z.appendChild(y)}},
qa:{"^":"a:2;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
qb:{"^":"a:2;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
rf:{"^":"a:0;a",
$1:function(a){return this.a.$2(0,a)}},
rg:{"^":"a:21;a",
$2:function(a,b){this.a.$2(1,new H.dw(a,b))}},
rA:{"^":"a:50;a",
$2:function(a,b){this.a(a,b)}},
rd:{"^":"a:2;a,b",
$0:function(){var z=this.b
if(z.a.gcU()){z.b=!0
return}this.a.$2(null,0)}},
re:{"^":"a:0;a,b",
$1:function(a){var z=this.b.c!=null?2:0
this.a.$2(z,null)}},
qc:{"^":"d;a,b,c",
gdZ:function(){return this.a.gdZ()},
gcU:function(){return this.a.gcU()},
geJ:function(){return this.c!=null},
q:function(a,b){return J.dm(this.a,b)},
ey:function(a,b){return this.a.ey(a,b)},
bt:function(){return this.a.bt()},
ii:function(a){var z=new P.qf(a)
this.a=new P.qk(null,0,null,new P.qh(z),null,new P.qi(this,z),new P.qj(this,a),[null])},
u:{
qd:function(a){var z=new P.qc(null,!1,null)
z.ii(a)
return z}}},
qf:{"^":"a:2;a",
$0:function(){P.cy(new P.qg(this.a))}},
qg:{"^":"a:2;a",
$0:function(){this.a.$2(0,null)}},
qh:{"^":"a:2;a",
$0:function(){this.a.$0()}},
qi:{"^":"a:2;a,b",
$0:function(){var z=this.a
if(z.b===!0){z.b=!1
this.b.$0()}}},
qj:{"^":"a:2;a,b",
$0:function(){var z=this.a
if(!z.a.gkp()){z.c=new P.cq(new P.F(0,$.q,null,[null]),[null])
if(z.b===!0){z.b=!1
P.cy(new P.qe(this.b))}return z.c.gh4()}}},
qe:{"^":"a:2;a",
$0:function(){this.a.$2(2,null)}},
bS:{"^":"d;ab:a<,b",
k:function(a){return"IterationMarker("+this.b+", "+H.b(this.a)+")"},
u:{
bT:function(a){return new P.bS(a,1)},
aR:function(){return C.ag},
hF:function(a){return new P.bS(a,0)},
aS:function(a){return new P.bS(a,3)}}},
bd:{"^":"d;a,b,c,d",
gS:function(){var z=this.c
return z==null?this.b:z.gS()},
t:function(){var z,y,x,w
for(;!0;){z=this.c
if(z!=null)if(z.t())return!0
else this.c=null
y=function(a,b,c){var v,u=b
while(true)try{return a(u,v)}catch(t){v=t
u=c}}(this.a,0,1)
if(y instanceof P.bS){x=y.b
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
r7:{"^":"cc;a",
ga_:function(a){return new P.bd(this.a(),null,null,null)},
$ascc:I.bg,
$asA:I.bg,
u:{
aT:function(a){return new P.r7(a)}}},
Q:{"^":"d;$ti"},
hC:{"^":"d;h4:a<,$ti",
eD:function(a,b){if(a==null)a=new P.cV()
if(this.a.a!==0)throw H.c(new P.x("Future already completed"))
$.q.toString
this.bj(a,b)},
dw:function(a){return this.eD(a,null)}},
cq:{"^":"hC;a,$ti",
bX:function(a){var z=this.a
if(z.a!==0)throw H.c(new P.x("Future already completed"))
z.bC(a)},
eC:function(){return this.bX(null)},
bj:function(a,b){this.a.ff(a,b)}},
r6:{"^":"hC;a,$ti",
bX:function(a){var z=this.a
if(z.a!==0)throw H.c(new P.x("Future already completed"))
z.bi(a)},
eC:function(){return this.bX(null)},
bj:function(a,b){this.a.bj(a,b)}},
ef:{"^":"d;ei:a<,b,c,d,e,$ti",
gje:function(){return this.b.b},
gh6:function(){return(this.c&1)!==0},
gk8:function(){return(this.c&2)!==0},
gh5:function(){return this.c===8},
k6:function(a){return this.b.b.eV(this.d,a)},
kz:function(a){if(this.c!==6)return!0
return this.b.b.eV(this.d,a.gbu())},
jZ:function(a){var z,y
z=this.e
y=this.b.b
if(H.ax(z,{func:1,args:[,,]}))return y.kW(z,a.gbu(),a.gbq())
else return y.eV(z,a.gbu())},
k7:function(){return this.b.b.hw(this.d)}},
F:{"^":"d;cJ:a<,b,j2:c<,$ti",
giO:function(){return this.a===2},
gee:function(){return this.a>=4},
eW:function(a,b){var z=$.q
if(z!==C.i){z.toString
if(b!=null)b=P.eo(b,z)}return this.es(a,b)},
c3:function(a){return this.eW(a,null)},
es:function(a,b){var z,y
z=new P.F(0,$.q,null,[null])
y=b==null?1:3
this.dh(new P.ef(null,z,y,a,b,[H.m(this,0),null]))
return z},
c5:function(a){var z,y
z=$.q
y=new P.F(0,z,null,this.$ti)
if(z!==C.i)z.toString
z=H.m(this,0)
this.dh(new P.ef(null,y,8,a,null,[z,z]))
return y},
dh:function(a){var z,y
z=this.a
if(z<=1){a.a=this.c
this.c=a}else{if(z===2){y=this.c
if(!y.gee()){y.dh(a)
return}this.a=y.a
this.c=y.c}z=this.b
z.toString
P.bx(null,null,z,new P.qu(this,a))}},
fD:function(a){var z,y,x,w,v
z={}
z.a=a
if(a==null)return
y=this.a
if(y<=1){x=this.c
this.c=a
if(x!=null){for(w=a;w.gei()!=null;)w=w.a
w.a=x}}else{if(y===2){v=this.c
if(!v.gee()){v.fD(a)
return}this.a=v.a
this.c=v.c}z.a=this.dq(a)
y=this.b
y.toString
P.bx(null,null,y,new P.qB(z,this))}},
dn:function(){var z=this.c
this.c=null
return this.dq(z)},
dq:function(a){var z,y,x
for(z=a,y=null;z!=null;y=z,z=x){x=z.gei()
z.a=y}return y},
bi:function(a){var z,y
z=this.$ti
if(H.aU(a,"$isQ",z,"$asQ"))if(H.aU(a,"$isF",z,null))P.d8(a,this)
else P.hE(a,this)
else{y=this.dn()
this.a=4
this.c=a
P.bt(this,y)}},
bj:[function(a,b){var z=this.dn()
this.a=8
this.c=new P.cE(a,b)
P.bt(this,z)},function(a){return this.bj(a,null)},"le","$2","$1","gbU",2,2,16,0],
bC:function(a){var z
if(H.aU(a,"$isQ",this.$ti,"$asQ")){this.it(a)
return}this.a=1
z=this.b
z.toString
P.bx(null,null,z,new P.qw(this,a))},
it:function(a){var z
if(H.aU(a,"$isF",this.$ti,null)){if(a.a===8){this.a=1
z=this.b
z.toString
P.bx(null,null,z,new P.qA(this,a))}else P.d8(a,this)
return}P.hE(a,this)},
ff:function(a,b){var z
this.a=1
z=this.b
z.toString
P.bx(null,null,z,new P.qv(this,a,b))},
ik:function(a,b){this.a=4
this.c=a},
$isQ:1,
u:{
hE:function(a,b){var z,y,x
b.a=1
try{a.eW(new P.qx(b),new P.qy(b))}catch(x){z=H.B(x)
y=H.D(x)
P.cy(new P.qz(b,z,y))}},
d8:function(a,b){var z,y,x
for(;a.giO();)a=a.c
z=a.gee()
y=b.c
if(z){b.c=null
x=b.dq(y)
b.a=a.a
b.c=a.c
P.bt(b,x)}else{b.a=2
b.c=a
a.fD(y)}},
bt:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z={}
z.a=a
for(y=a;!0;){x={}
w=y.a===8
if(b==null){if(w){v=y.c
y=y.b
u=v.gbu()
t=v.gbq()
y.toString
P.bw(null,null,y,u,t)}return}for(;b.gei()!=null;b=s){s=b.a
b.a=null
P.bt(z.a,b)}r=z.a.c
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
P.bw(null,null,y,u,t)
return}p=$.q
if(p==null?q!=null:p!==q)$.q=q
else p=null
if(b.gh5())new P.qE(z,x,w,b).$0()
else if(y){if(b.gh6())new P.qD(x,b,r).$0()}else if(b.gk8())new P.qC(z,x,b).$0()
if(p!=null)$.q=p
y=x.b
if(!!J.o(y).$isQ){o=b.b
if(y.a>=4){n=o.c
o.c=null
b=o.dq(n)
o.a=y.a
o.c=y.c
z.a=y
continue}else P.d8(y,o)
return}}o=b.b
b=o.dn()
y=x.a
u=x.b
if(!y){o.a=4
o.c=u}else{o.a=8
o.c=u}z.a=o
y=o}}}},
qu:{"^":"a:2;a,b",
$0:function(){P.bt(this.a,this.b)}},
qB:{"^":"a:2;a,b",
$0:function(){P.bt(this.b,this.a.a)}},
qx:{"^":"a:0;a",
$1:function(a){var z=this.a
z.a=0
z.bi(a)}},
qy:{"^":"a:49;a",
$2:function(a,b){this.a.bj(a,b)},
$1:function(a){return this.$2(a,null)}},
qz:{"^":"a:2;a,b,c",
$0:function(){this.a.bj(this.b,this.c)}},
qw:{"^":"a:2;a,b",
$0:function(){var z,y
z=this.a
y=z.dn()
z.a=4
z.c=this.b
P.bt(z,y)}},
qA:{"^":"a:2;a,b",
$0:function(){P.d8(this.b,this.a)}},
qv:{"^":"a:2;a,b,c",
$0:function(){this.a.bj(this.b,this.c)}},
qE:{"^":"a:7;a,b,c,d",
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
else u.b=new P.cE(y,x)
u.a=!0
return}if(!!J.o(z).$isQ){if(z instanceof P.F&&z.gcJ()>=4){if(z.gcJ()===8){v=this.b
v.b=z.gj2()
v.a=!0}return}t=this.a.a
v=this.b
v.b=z.c3(new P.qF(t))
v.a=!1}}},
qF:{"^":"a:0;a",
$1:function(a){return this.a}},
qD:{"^":"a:7;a,b,c",
$0:function(){var z,y,x,w
try{this.a.b=this.b.k6(this.c)}catch(x){z=H.B(x)
y=H.D(x)
w=this.a
w.b=new P.cE(z,y)
w.a=!0}}},
qC:{"^":"a:7;a,b,c",
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
else s.b=new P.cE(y,x)
s.a=!0}}},
hA:{"^":"d;jw:a<,cp:b@"},
ak:{"^":"d;$ti",
aF:function(a,b){return new P.qT(b,this,[H.y(this,"ak",0),null])},
a7:function(a,b){var z,y
z={}
y=new P.F(0,$.q,null,[P.a2])
z.a=null
z.a=this.aE(new P.oP(z,this,b,y),!0,new P.oQ(y),y.gbU())
return y},
Z:function(a,b){var z,y
z={}
y=new P.F(0,$.q,null,[null])
z.a=null
z.a=this.aE(new P.oT(z,this,b,y),!0,new P.oU(y),y.gbU())
return y},
gl:function(a){var z,y
z={}
y=new P.F(0,$.q,null,[P.t])
z.a=0
this.aE(new P.oZ(z),!0,new P.p_(z,y),y.gbU())
return y},
gW:function(a){var z,y
z={}
y=new P.F(0,$.q,null,[P.a2])
z.a=null
z.a=this.aE(new P.oV(z,y),!0,new P.oW(y),y.gbU())
return y},
ct:function(a){var z,y,x
z=H.y(this,"ak",0)
y=H.p([],[z])
x=new P.F(0,$.q,null,[[P.N,z]])
this.aE(new P.p0(this,y),!0,new P.p1(y,x),x.gbU())
return x},
bG:function(a){var z,y,x
z=H.y(this,"ak",0)
y=P.a4(null,null,null,z)
x=new P.F(0,$.q,null,[[P.bN,z]])
this.aE(new P.p2(this,y),!0,new P.p3(y,x),x.gbU())
return x},
gv:function(a){var z,y
z={}
y=new P.F(0,$.q,null,[H.y(this,"ak",0)])
z.a=null
z.b=!1
this.aE(new P.oX(z,this),!0,new P.oY(z,y),y.gbU())
return y}},
oP:{"^":"a;a,b,c,d",
$1:function(a){var z,y
z=this.a
y=this.d
P.hW(new P.oN(this.c,a),new P.oO(z,y),P.hK(z.a,y))},
$S:function(){return H.be(function(a){return{func:1,args:[a]}},this.b,"ak")}},
oN:{"^":"a:2;a,b",
$0:function(){return J.e(this.b,this.a)}},
oO:{"^":"a:52;a,b",
$1:function(a){if(a===!0)P.hL(this.a.a,this.b,!0)}},
oQ:{"^":"a:2;a",
$0:function(){this.a.bi(!1)}},
oT:{"^":"a;a,b,c,d",
$1:function(a){P.hW(new P.oR(this.c,a),new P.oS(),P.hK(this.a.a,this.d))},
$S:function(){return H.be(function(a){return{func:1,args:[a]}},this.b,"ak")}},
oR:{"^":"a:2;a,b",
$0:function(){return this.a.$1(this.b)}},
oS:{"^":"a:0;",
$1:function(a){}},
oU:{"^":"a:2;a",
$0:function(){this.a.bi(null)}},
oZ:{"^":"a:0;a",
$1:function(a){++this.a.a}},
p_:{"^":"a:2;a,b",
$0:function(){this.b.bi(this.a.a)}},
oV:{"^":"a:0;a,b",
$1:function(a){P.hL(this.a.a,this.b,!1)}},
oW:{"^":"a:2;a",
$0:function(){this.a.bi(!0)}},
p0:{"^":"a;a,b",
$1:function(a){this.b.push(a)},
$S:function(){return H.be(function(a){return{func:1,args:[a]}},this.a,"ak")}},
p1:{"^":"a:2;a,b",
$0:function(){this.b.bi(this.a)}},
p2:{"^":"a;a,b",
$1:function(a){this.b.q(0,a)},
$S:function(){return H.be(function(a){return{func:1,args:[a]}},this.a,"ak")}},
p3:{"^":"a:2;a,b",
$0:function(){this.b.bi(this.a)}},
oX:{"^":"a;a,b",
$1:function(a){var z=this.a
z.b=!0
z.a=a},
$S:function(){return H.be(function(a){return{func:1,args:[a]}},this.b,"ak")}},
oY:{"^":"a:2;a,b",
$0:function(){var z,y,x,w
x=this.a
if(x.b){this.b.bi(x.a)
return}try{x=H.aj()
throw H.c(x)}catch(w){z=H.B(w)
y=H.D(w)
P.ro(this.b,z,y)}}},
d9:{"^":"d;cJ:b<,$ti",
gdZ:function(){return new P.d6(this,this.$ti)},
gkp:function(){return(this.b&4)!==0},
gcU:function(){var z=this.b
return(z&1)!==0?this.gbK().gfw():(z&2)===0},
giW:function(){if((this.b&8)===0)return this.a
return this.a.gd4()},
e7:function(){var z,y
if((this.b&8)===0){z=this.a
if(z==null){z=new P.ei(null,null,0,this.$ti)
this.a=z}return z}y=this.a
if(y.gd4()==null)y.c=new P.ei(null,null,0,this.$ti)
return y.c},
gbK:function(){if((this.b&8)!==0)return this.a.gd4()
return this.a},
cz:function(){if((this.b&4)!==0)return new P.x("Cannot add event after closing")
return new P.x("Cannot add event while adding a stream")},
ju:function(a,b){var z,y,x,w
z=this.b
if(z>=4)throw H.c(this.cz())
if((z&2)!==0){z=new P.F(0,$.q,null,[null])
z.bC(null)
return z}z=this.a
y=new P.F(0,$.q,null,[null])
x=a.aE(this.gir(),!1,this.gis(),this.gio())
w=this.b
if((w&1)!==0?this.gbK().gfw():(w&2)===0)x.cX()
this.a=new P.r_(z,y,x,this.$ti)
this.b|=8
return y},
fm:function(){var z=this.c
if(z==null){z=(this.b&2)!==0?$.$get$bl():new P.F(0,$.q,null,[null])
this.c=z}return z},
q:[function(a,b){if(this.b>=4)throw H.c(this.cz())
this.bT(b)},"$1","gjh",2,0,function(){return H.be(function(a){return{func:1,v:true,args:[a]}},this.$receiver,"d9")}],
ey:function(a,b){if(this.b>=4)throw H.c(this.cz())
if(a==null)a=new P.cV()
$.q.toString
this.cc(a,b)},
bt:function(){var z=this.b
if((z&4)!==0)return this.fm()
if(z>=4)throw H.c(this.cz())
z|=4
this.b=z
if((z&1)!==0)this.cH()
else if((z&3)===0)this.e7().q(0,C.v)
return this.fm()},
bT:[function(a){var z=this.b
if((z&1)!==0)this.cG(a)
else if((z&3)===0)this.e7().q(0,new P.eb(a,null,this.$ti))},"$1","gir",2,0,function(){return H.be(function(a){return{func:1,v:true,args:[a]}},this.$receiver,"d9")}],
cc:[function(a,b){var z=this.b
if((z&1)!==0)this.cI(a,b)
else if((z&3)===0)this.e7().q(0,new P.ec(a,b,null))},"$2","gio",4,0,47],
e1:[function(){var z=this.a
this.a=z.gd4()
this.b&=4294967287
z.a.bC(null)},"$0","gis",0,0,7],
j9:function(a,b,c,d){var z,y,x,w,v
if((this.b&3)!==0)throw H.c(new P.x("Stream has already been listened to."))
z=$.q
y=d?1:0
x=new P.qo(this,null,null,null,z,y,null,null,this.$ti)
x.fc(a,b,c,d,H.m(this,0))
w=this.giW()
y=this.b|=1
if((y&8)!==0){v=this.a
v.sd4(x)
v.b.d0()}else this.a=x
x.j7(w)
x.ec(new P.r1(this))
return x},
j_:function(a){var z,y,x,w,v,u
z=null
if((this.b&8)!==0)z=this.a.ci()
this.a=null
this.b=this.b&4294967286|2
w=this.r
if(w!=null)if(z==null)try{z=w.$0()}catch(v){y=H.B(v)
x=H.D(v)
u=new P.F(0,$.q,null,[null])
u.ff(y,x)
z=u}else z=z.c5(w)
w=new P.r0(this)
if(z!=null)z=z.c5(w)
else w.$0()
return z}},
r1:{"^":"a:2;a",
$0:function(){P.ep(this.a.d)}},
r0:{"^":"a:7;a",
$0:function(){var z=this.a.c
if(z!=null&&z.a===0)z.bC(null)}},
r9:{"^":"d;$ti",
cG:function(a){this.gbK().bT(a)},
cI:function(a,b){this.gbK().cc(a,b)},
cH:function(){this.gbK().e1()}},
ql:{"^":"d;$ti",
cG:function(a){this.gbK().cd(new P.eb(a,null,[H.m(this,0)]))},
cI:function(a,b){this.gbK().cd(new P.ec(a,b,null))},
cH:function(){this.gbK().cd(C.v)}},
qk:{"^":"d9+ql;a,b,c,d,e,f,r,$ti"},
r8:{"^":"d9+r9;a,b,c,d,e,f,r,$ti"},
d6:{"^":"r2;a,$ti",
gB:function(a){return(H.aC(this.a)^892482866)>>>0},
w:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof P.d6))return!1
return b.a===this.a}},
qo:{"^":"cr;x,a,b,c,d,e,f,r,$ti",
ej:function(){return this.x.j_(this)},
el:[function(){var z=this.x
if((z.b&8)!==0)z.a.cX()
P.ep(z.e)},"$0","gek",0,0,7],
en:[function(){var z=this.x
if((z.b&8)!==0)z.a.d0()
P.ep(z.f)},"$0","gem",0,0,7]},
q4:{"^":"d;$ti",
cX:function(){this.b.cX()},
d0:function(){this.b.d0()},
ci:function(){var z=this.b.ci()
if(z==null){this.a.bC(null)
return}return z.c5(new P.q5(this))},
eC:function(){this.a.bC(null)}},
q5:{"^":"a:2;a",
$0:function(){this.a.a.bC(null)}},
r_:{"^":"q4;d4:c@,a,b,$ti"},
cr:{"^":"d;cJ:e<,$ti",
j7:function(a){if(a==null)return
this.r=a
if(!a.gW(a)){this.e=(this.e|64)>>>0
this.r.d9(this)}},
kF:function(a){var z=this.e
if((z&8)!==0)return
this.e=(z+128|4)>>>0
if(z<128&&this.r!=null)this.r.fR()
if((z&4)===0&&(this.e&32)===0)this.ec(this.gek())},
cX:function(){return this.kF(null)},
d0:function(){var z=this.e
if((z&8)!==0)return
if(z>=128){z-=128
this.e=z
if(z<128){if((z&64)!==0){z=this.r
z=!z.gW(z)}else z=!1
if(z)this.r.d9(this)
else{z=(this.e&4294967291)>>>0
this.e=z
if((z&32)===0)this.ec(this.gem())}}}},
ci:function(){var z=(this.e&4294967279)>>>0
this.e=z
if((z&8)===0)this.e2()
z=this.f
return z==null?$.$get$bl():z},
gfw:function(){return(this.e&4)!==0},
gcU:function(){return this.e>=128},
e2:function(){var z=(this.e|8)>>>0
this.e=z
if((z&64)!==0)this.r.fR()
if((this.e&32)===0)this.r=null
this.f=this.ej()},
bT:["i4",function(a){var z=this.e
if((z&8)!==0)return
if(z<32)this.cG(a)
else this.cd(new P.eb(a,null,[H.y(this,"cr",0)]))}],
cc:["i5",function(a,b){var z=this.e
if((z&8)!==0)return
if(z<32)this.cI(a,b)
else this.cd(new P.ec(a,b,null))}],
e1:function(){var z=this.e
if((z&8)!==0)return
z=(z|2)>>>0
this.e=z
if(z<32)this.cH()
else this.cd(C.v)},
el:[function(){},"$0","gek",0,0,7],
en:[function(){},"$0","gem",0,0,7],
ej:function(){return},
cd:function(a){var z,y
z=this.r
if(z==null){z=new P.ei(null,null,0,[H.y(this,"cr",0)])
this.r=z}z.q(0,a)
y=this.e
if((y&64)===0){y=(y|64)>>>0
this.e=y
if(y<128)this.r.d9(this)}},
cG:function(a){var z=this.e
this.e=(z|32)>>>0
this.d.hz(this.a,a)
this.e=(this.e&4294967263)>>>0
this.e4((z&4)!==0)},
cI:function(a,b){var z,y
z=this.e
y=new P.qn(this,a,b)
if((z&1)!==0){this.e=(z|16)>>>0
this.e2()
z=this.f
if(!!J.o(z).$isQ&&z!==$.$get$bl())z.c5(y)
else y.$0()}else{y.$0()
this.e4((z&4)!==0)}},
cH:function(){var z,y
z=new P.qm(this)
this.e2()
this.e=(this.e|16)>>>0
y=this.f
if(!!J.o(y).$isQ&&y!==$.$get$bl())y.c5(z)
else z.$0()},
ec:function(a){var z=this.e
this.e=(z|32)>>>0
a.$0()
this.e=(this.e&4294967263)>>>0
this.e4((z&4)!==0)},
e4:function(a){var z,y
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
if(y)this.el()
else this.en()
this.e=(this.e&4294967263)>>>0}z=this.e
if((z&64)!==0&&z<128)this.r.d9(this)},
fc:function(a,b,c,d,e){var z=this.d
z.toString
this.a=a
this.b=P.eo(b==null?P.rG():b,z)
this.c=c==null?P.rF():c}},
qn:{"^":"a:7;a,b,c",
$0:function(){var z,y,x,w,v,u
z=this.a
y=z.e
if((y&8)!==0&&(y&16)===0)return
z.e=(y|32)>>>0
y=z.b
x=H.ax(y,{func:1,args:[P.d,P.b1]})
w=z.d
v=this.b
u=z.b
if(x)w.kX(u,v,this.c)
else w.hz(u,v)
z.e=(z.e&4294967263)>>>0}},
qm:{"^":"a:7;a",
$0:function(){var z,y
z=this.a
y=z.e
if((y&16)===0)return
z.e=(y|42)>>>0
z.d.hx(z.c)
z.e=(z.e&4294967263)>>>0}},
r2:{"^":"ak;$ti",
aE:function(a,b,c,d){return this.a.j9(a,d,c,!0===b)},
eQ:function(a,b,c){return this.aE(a,null,b,c)}},
ed:{"^":"d;cp:a@,$ti"},
eb:{"^":"ed;ab:b<,a,$ti",
eR:function(a){a.cG(this.b)}},
ec:{"^":"ed;bu:b<,bq:c<,a",
eR:function(a){a.cI(this.b,this.c)},
$ased:I.bg},
qp:{"^":"d;",
eR:function(a){a.cH()},
gcp:function(){return},
scp:function(a){throw H.c(new P.x("No events after a done."))}},
qV:{"^":"d;cJ:a<,$ti",
d9:function(a){var z=this.a
if(z===1)return
if(z>=1){this.a=1
return}P.cy(new P.qW(this,a))
this.a=1},
fR:function(){if(this.a===1)this.a=3}},
qW:{"^":"a:2;a,b",
$0:function(){var z,y,x,w
z=this.a
y=z.a
z.a=0
if(y===3)return
x=z.b
w=x.gcp()
z.b=w
if(w==null)z.c=null
x.eR(this.b)}},
ei:{"^":"qV;b,c,a,$ti",
gW:function(a){return this.c==null},
q:function(a,b){var z=this.c
if(z==null){this.c=b
this.b=b}else{z.scp(b)
this.c=b}}},
r3:{"^":"d;a,b,c,$ti"},
rj:{"^":"a:2;a,b,c",
$0:function(){return this.a.bj(this.b,this.c)}},
ri:{"^":"a:21;a,b",
$2:function(a,b){P.rh(this.a,this.b,a,b)}},
rk:{"^":"a:2;a,b",
$0:function(){return this.a.bi(this.b)}},
ee:{"^":"ak;$ti",
aE:function(a,b,c,d){return this.iA(a,d,c,!0===b)},
eQ:function(a,b,c){return this.aE(a,null,b,c)},
iA:function(a,b,c,d){return P.qt(this,a,b,c,d,H.y(this,"ee",0),H.y(this,"ee",1))},
ft:function(a,b){b.bT(a)},
iM:function(a,b,c){c.cc(a,b)},
$asak:function(a,b){return[b]}},
hD:{"^":"cr;x,y,a,b,c,d,e,f,r,$ti",
bT:function(a){if((this.e&2)!==0)return
this.i4(a)},
cc:function(a,b){if((this.e&2)!==0)return
this.i5(a,b)},
el:[function(){var z=this.y
if(z==null)return
z.cX()},"$0","gek",0,0,7],
en:[function(){var z=this.y
if(z==null)return
z.d0()},"$0","gem",0,0,7],
ej:function(){var z=this.y
if(z!=null){this.y=null
return z.ci()}return},
lg:[function(a){this.x.ft(a,this)},"$1","giJ",2,0,function(){return H.be(function(a,b){return{func:1,v:true,args:[a]}},this.$receiver,"hD")}],
li:[function(a,b){this.x.iM(a,b,this)},"$2","giL",4,0,46],
lh:[function(){this.e1()},"$0","giK",0,0,7],
ij:function(a,b,c,d,e,f,g){this.y=this.x.a.eQ(this.giJ(),this.giK(),this.giL())},
$ascr:function(a,b){return[b]},
u:{
qt:function(a,b,c,d,e,f,g){var z,y
z=$.q
y=e?1:0
y=new P.hD(a,null,null,null,null,z,y,null,null,[f,g])
y.fc(b,c,d,e,g)
y.ij(a,b,c,d,e,f,g)
return y}}},
qT:{"^":"ee;b,a,$ti",
ft:function(a,b){var z,y,x,w
z=null
try{z=this.b.$1(a)}catch(w){y=H.B(w)
x=H.D(w)
P.rc(b,y,x)
return}b.bT(z)}},
cE:{"^":"d;bu:a<,bq:b<",
k:function(a){return H.b(this.a)},
$isa3:1},
rb:{"^":"d;"},
rw:{"^":"a:2;a,b",
$0:function(){var z,y,x
z=this.a
y=z.a
if(y==null){x=new P.cV()
z.a=x
z=x}else z=y
y=this.b
if(y==null)throw H.c(z)
x=H.c(z)
x.stack=J.h(y)
throw x}},
qX:{"^":"rb;",
hx:function(a){var z,y,x,w
try{if(C.i===$.q){x=a.$0()
return x}x=P.hT(null,null,this,a)
return x}catch(w){z=H.B(w)
y=H.D(w)
x=P.bw(null,null,this,z,y)
return x}},
hz:function(a,b){var z,y,x,w
try{if(C.i===$.q){x=a.$1(b)
return x}x=P.hV(null,null,this,a,b)
return x}catch(w){z=H.B(w)
y=H.D(w)
x=P.bw(null,null,this,z,y)
return x}},
kX:function(a,b,c){var z,y,x,w
try{if(C.i===$.q){x=a.$2(b,c)
return x}x=P.hU(null,null,this,a,b,c)
return x}catch(w){z=H.B(w)
y=H.D(w)
x=P.bw(null,null,this,z,y)
return x}},
eA:function(a,b){if(b)return new P.qY(this,a)
else return new P.qZ(this,a)},
j:function(a,b){return},
hw:function(a){if($.q===C.i)return a.$0()
return P.hT(null,null,this,a)},
eV:function(a,b){if($.q===C.i)return a.$1(b)
return P.hV(null,null,this,a,b)},
kW:function(a,b,c){if($.q===C.i)return a.$2(b,c)
return P.hU(null,null,this,a,b,c)}},
qY:{"^":"a:2;a,b",
$0:function(){return this.a.hx(this.b)}},
qZ:{"^":"a:2;a,b",
$0:function(){return this.a.hw(this.b)}}}],["","",,P,{"^":"",
dI:function(a,b){return new H.R(0,null,null,null,null,null,0,[a,b])},
aA:function(){return new H.R(0,null,null,null,null,null,0,[null,null])},
ag:function(a){return H.u2(a,new H.R(0,null,null,null,null,null,0,[null,null]))},
lZ:function(a,b,c){var z,y
if(P.em(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}z=[]
y=$.$get$bX()
y.push(a)
try{P.rr(a,z)}finally{if(0>=y.length)return H.f(y,-1)
y.pop()}y=P.h8(b,z,", ")+c
return y.charCodeAt(0)==0?y:y},
cd:function(a,b,c){var z,y,x
if(P.em(a))return b+"..."+c
z=new P.bQ(b)
y=$.$get$bX()
y.push(a)
try{x=z
x.C=P.h8(x.gC(),a,", ")}finally{if(0>=y.length)return H.f(y,-1)
y.pop()}y=z
y.C=y.gC()+c
y=z.gC()
return y.charCodeAt(0)==0?y:y},
em:function(a){var z,y
for(z=0;y=$.$get$bX(),z<y.length;++z)if(a===y[z])return!0
return!1},
rr:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=a.ga_(a)
y=0
x=0
while(!0){if(!(y<80||x<3))break
if(!z.t())return
w=H.b(z.gS())
b.push(w)
y+=w.length+2;++x}if(!z.t()){if(x<=5)return
if(0>=b.length)return H.f(b,-1)
v=b.pop()
if(0>=b.length)return H.f(b,-1)
u=b.pop()}else{t=z.gS();++x
if(!z.t()){if(x<=4){b.push(H.b(t))
return}v=H.b(t)
if(0>=b.length)return H.f(b,-1)
u=b.pop()
y+=v.length+2}else{s=z.gS();++x
for(;z.t();t=s,s=r){r=z.gS();++x
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
mk:function(a,b,c,d,e){return new H.R(0,null,null,null,null,null,0,[d,e])},
ch:function(a,b,c){var z=P.mk(null,null,null,b,c)
a.Z(0,new P.rI(z))
return z},
a4:function(a,b,c,d){return new P.hG(0,null,null,null,null,null,0,[d])},
b9:function(a,b){var z,y
z=P.a4(null,null,null,b)
for(y=J.ai(a);y.t();)z.q(0,y.gS())
return z},
dN:function(a){var z,y,x
z={}
if(P.em(a))return"{...}"
y=new P.bQ("")
try{$.$get$bX().push(a)
x=y
x.C=x.gC()+"{"
z.a=!0
a.Z(0,new P.mv(z,y))
z=y
z.C=z.gC()+"}"}finally{z=$.$get$bX()
if(0>=z.length)return H.f(z,-1)
z.pop()}z=y.gC()
return z.charCodeAt(0)==0?z:z},
hH:{"^":"R;a,b,c,d,e,f,r,$ti",
cS:function(a){return H.uD(a)&0x3ffffff},
cT:function(a,b){var z,y,x
if(a==null)return-1
z=a.length
for(y=0;y<z;++y){x=a[y].gh8()
if(x==null?b==null:x===b)return y}return-1},
u:{
bU:function(a,b){return new P.hH(0,null,null,null,null,null,0,[a,b])}}},
hG:{"^":"qG;a,b,c,d,e,f,r,$ti",
eh:function(){return new P.hG(0,null,null,null,null,null,0,this.$ti)},
ga_:function(a){var z=new P.ae(this,this.r,null,null,[null])
z.c=this.e
return z},
gl:function(a){return this.a},
gW:function(a){return this.a===0},
gas:function(a){return this.a!==0},
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
return J.ay(y,x).gfl()},
Z:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$1(z.a)
if(y!==this.r)throw H.c(new P.C(this))
z=z.b}},
gv:function(a){var z=this.f
if(z==null)throw H.c(new P.x("No elements"))
return z.a},
q:function(a,b){var z,y,x
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.b=y
z=y}return this.fg(z,b)}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.c=y
x=y}return this.fg(x,b)}else return this.aB(b)},
aB:function(a){var z,y,x
z=this.d
if(z==null){z=P.qP()
this.d=z}y=this.dj(a)
x=z[y]
if(x==null)z[y]=[this.e5(a)]
else{if(this.dk(x,a)>=0)return!1
x.push(this.e5(a))}return!0},
a3:function(a,b){if(typeof b==="string"&&b!=="__proto__")return this.fh(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.fh(this.c,b)
else return this.j0(b)},
j0:function(a){var z,y,x
z=this.d
if(z==null)return!1
y=z[this.dj(a)]
x=this.dk(y,a)
if(x<0)return!1
this.fi(y.splice(x,1)[0])
return!0},
iG:function(a,b){var z,y,x,w,v
z=this.e
for(;z!=null;z=x){y=z.a
x=z.b
w=this.r
v=a.$1(y)
if(w!==this.r)throw H.c(new P.C(this))
if(b===v)this.a3(0,y)}},
be:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
fg:function(a,b){if(a[b]!=null)return!1
a[b]=this.e5(b)
return!0},
fh:function(a,b){var z
if(a==null)return!1
z=a[b]
if(z==null)return!1
this.fi(z)
delete a[b]
return!0},
e5:function(a){var z,y
z=new P.qO(a,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.c=y
y.b=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
fi:function(a){var z,y
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
for(y=0;y<z;++y)if(J.e(a[y].gfl(),b))return y
return-1},
$isbN:1,
$isY:1,
u:{
qP:function(){var z=Object.create(null)
z["<non-identifier-key>"]=z
delete z["<non-identifier-key>"]
return z}}},
qO:{"^":"d;fl:a<,b,ix:c<"},
ae:{"^":"d;a,b,c,d,$ti",
gS:function(){return this.d},
t:function(){var z=this.a
if(this.b!==z.r)throw H.c(new P.C(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.b
return!0}}}},
qG:{"^":"od;$ti",
bG:function(a){var z=this.eh()
z.av(0,this)
return z}},
cc:{"^":"A;$ti"},
rI:{"^":"a:6;a",
$2:function(a,b){this.a.n(0,a,b)}},
fp:{"^":"fy;$ti"},
fy:{"^":"d+ba;$ti",$asN:null,$asY:null,$isN:1,$isY:1},
ba:{"^":"d;$ti",
ga_:function(a){return new H.dJ(this,this.gl(this),0,null,[H.y(this,"ba",0)])},
ar:function(a,b){return this.j(0,b)},
Z:function(a,b){var z,y
z=this.gl(this)
for(y=0;y<z;++y){b.$1(this.j(0,y))
if(z!==this.gl(this))throw H.c(new P.C(this))}},
gW:function(a){return this.gl(this)===0},
gas:function(a){return!this.gW(this)},
gv:function(a){if(this.gl(this)===0)throw H.c(H.aj())
return this.j(0,this.gl(this)-1)},
a7:function(a,b){var z,y
z=this.gl(this)
for(y=0;y<this.gl(this);++y){if(J.e(this.j(0,y),b))return!0
if(z!==this.gl(this))throw H.c(new P.C(this))}return!1},
bs:function(a,b){var z,y
z=this.gl(this)
for(y=0;y<z;++y){if(b.$1(this.j(0,y))===!0)return!0
if(z!==this.gl(this))throw H.c(new P.C(this))}return!1},
aQ:function(a,b,c){var z,y,x
z=this.gl(this)
for(y=0;y<z;++y){x=this.j(0,y)
if(b.$1(x)===!0)return x
if(z!==this.gl(this))throw H.c(new P.C(this))}return c.$0()},
aF:function(a,b){return new H.ap(this,b,[H.y(this,"ba",0),null])},
dY:function(a,b){return H.ha(this,b,null,H.y(this,"ba",0))},
bG:function(a){var z,y
z=P.a4(null,null,null,H.y(this,"ba",0))
for(y=0;y<this.gl(this);++y)z.q(0,this.j(0,y))
return z},
q:function(a,b){var z=this.gl(this)
this.sl(0,z+1)
this.n(0,z,b)},
a3:function(a,b){var z
for(z=0;z<this.gl(this);++z)if(J.e(this.j(0,z),b)){this.b5(0,z,this.gl(this)-1,this,z+1)
this.sl(0,this.gl(this)-1)
return!0}return!1},
iF:function(a,b){var z,y,x,w
z=H.p([],[H.y(this,"ba",0)])
y=this.gl(this)
for(x=0;x<y;++x){w=this.j(0,x)
if(J.e(a.$1(w),b))z.push(w)
if(y!==this.gl(this))throw H.c(new P.C(this))}if(z.length!==this.gl(this)){this.hW(0,0,z.length,z)
this.sl(0,z.length)}},
b5:function(a,b,c,d,e){var z,y,x,w,v
P.ck(b,c,this.gl(this),null,null,null)
z=c-b
if(z===0)return
if(H.aU(d,"$isN",[H.y(this,"ba",0)],"$asN")){y=e
x=d}else{x=J.iW(d,e).bF(0,!1)
y=0}w=J.J(x)
if(y+z>w.gl(x))throw H.c(H.fd())
if(y<b)for(v=z-1;v>=0;--v)this.n(0,b+v,w.j(x,y+v))
else for(v=0;v<z;++v)this.n(0,b+v,w.j(x,y+v))},
hW:function(a,b,c,d){return this.b5(a,b,c,d,0)},
bP:function(a,b,c){var z
if(c>=this.gl(this))return-1
for(z=c;z<this.gl(this);++z)if(J.e(this.j(0,z),b))return z
return-1},
aY:function(a,b){return this.bP(a,b,0)},
k:function(a){return P.cd(this,"[","]")},
$isN:1,
$isY:1},
ra:{"^":"d;$ti",
n:function(a,b,c){throw H.c(new P.S("Cannot modify unmodifiable map"))},
$isG:1},
mt:{"^":"d;$ti",
j:function(a,b){return this.a.j(0,b)},
n:function(a,b,c){this.a.n(0,b,c)},
aa:function(a){return this.a.aa(a)},
Z:function(a,b){this.a.Z(0,b)},
gW:function(a){var z=this.a
return z.gW(z)},
gas:function(a){var z=this.a
return z.gas(z)},
gl:function(a){var z=this.a
return z.gl(z)},
k:function(a){return this.a.k(0)},
$isG:1},
hw:{"^":"mt+ra;a,$ti",$asG:null,$isG:1},
mv:{"^":"a:6;a,b",
$2:function(a,b){var z,y
z=this.a
if(!z.a)this.b.C+=", "
z.a=!1
z=this.b
y=z.C+=H.b(a)
z.C=y+": "
z.C+=H.b(b)}},
ml:{"^":"b0;a,b,c,d,$ti",
ga_:function(a){return new P.eh(this,this.c,this.d,this.b,null,this.$ti)},
Z:function(a,b){var z,y,x
z=this.d
for(y=this.b;y!==this.c;y=(y+1&this.a.length-1)>>>0){x=this.a
if(y<0||y>=x.length)return H.f(x,y)
b.$1(x[y])
if(z!==this.d)H.i(new P.C(this))}},
gW:function(a){return this.b===this.c},
gl:function(a){return(this.c-this.b&this.a.length-1)>>>0},
gv:function(a){var z,y,x
z=this.b
y=this.c
if(z===y)throw H.c(H.aj())
z=this.a
x=z.length
y=(y-1&x-1)>>>0
if(y<0||y>=x)return H.f(z,y)
return z[y]},
ar:function(a,b){var z,y,x,w
z=(this.c-this.b&this.a.length-1)>>>0
if(0>b||b>=z)H.i(P.cQ(b,this,"index",null,z))
y=this.a
x=y.length
w=(this.b+b&x-1)>>>0
if(w<0||w>=x)return H.f(y,w)
return y[w]},
q:function(a,b){this.aB(b)},
av:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=this.$ti
if(H.aU(b,"$isN",z,"$asN")){y=b.gl(b)
x=this.gl(this)
w=x+y
v=this.a
u=v.length
if(w>=u){t=P.mm(w+(w>>>1))
if(typeof t!=="number")return H.w(t)
v=new Array(t)
v.fixed$length=Array
s=H.p(v,z)
this.c=this.jd(s)
this.a=s
this.b=0
C.a.b5(s,x,w,b,0)
this.c+=y}else{z=this.c
r=u-z
if(y<r){C.a.b5(v,z,z+y,b,0)
this.c+=y}else{q=y-r
C.a.b5(v,z,z+r,b,0)
C.a.b5(this.a,0,q,b,r)
this.c=q}}++this.d}else for(z=new P.eh(b,b.c,b.d,b.b,null,[H.m(b,0)]);z.t();)this.aB(z.e)},
be:function(a){var z,y,x,w,v
z=this.b
y=this.c
if(z!==y){for(x=this.a,w=x.length,v=w-1;z!==y;z=(z+1&v)>>>0){if(z<0||z>=w)return H.f(x,z)
x[z]=null}this.c=0
this.b=0;++this.d}},
k:function(a){return P.cd(this,"{","}")},
fN:function(a){var z,y,x
z=this.b
y=this.a
x=y.length
z=(z-1&x-1)>>>0
this.b=z
if(z<0||z>=x)return H.f(y,z)
y[z]=a
if(z===this.c)this.fs();++this.d},
dH:function(){var z,y,x,w
z=this.b
if(z===this.c)throw H.c(H.aj());++this.d
y=this.a
x=y.length
if(z>=x)return H.f(y,z)
w=y[z]
y[z]=null
this.b=(z+1&x-1)>>>0
return w},
aB:function(a){var z,y,x
z=this.a
y=this.c
x=z.length
if(y<0||y>=x)return H.f(z,y)
z[y]=a
x=(y+1&x-1)>>>0
this.c=x
if(this.b===x)this.fs();++this.d},
fs:function(){var z,y,x,w
z=new Array(this.a.length*2)
z.fixed$length=Array
y=H.p(z,this.$ti)
z=this.a
x=this.b
w=z.length-x
C.a.b5(y,0,w,z,x)
C.a.b5(y,w,w+this.b,this.a,0)
this.b=0
this.c=this.a.length
this.a=y},
jd:function(a){var z,y,x,w,v
z=this.b
y=this.c
x=this.a
if(z<=y){w=y-z
C.a.b5(a,0,w,x,z)
return w}else{v=x.length-z
C.a.b5(a,0,v,x,z)
C.a.b5(a,v,v+this.c,this.a,0)
return this.c+v}},
i8:function(a,b){var z=new Array(8)
z.fixed$length=Array
this.a=H.p(z,[b])},
u:{
bb:function(a,b){var z=new P.ml(null,0,0,0,[b])
z.i8(a,b)
return z},
mm:function(a){var z
a=C.O.f4(a,1)-1
for(;!0;a=z)z=(a&a-1)>>>0}}},
eh:{"^":"d;a,b,c,d,e,$ti",
gS:function(){return this.e},
t:function(){var z,y,x
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
oe:{"^":"d;$ti",
gW:function(a){return this.a===0},
gas:function(a){return this.a!==0},
av:function(a,b){var z
for(z=J.ai(b);z.t();)this.q(0,z.gS())},
jB:function(a){var z,y
for(z=a.a,y=new P.ae(z,z.r,null,null,[null]),y.c=z.e;y.t();)if(!this.a7(0,y.d))return!1
return!0},
bF:function(a,b){var z,y,x,w,v
z=H.p([],this.$ti)
C.a.sl(z,this.a)
for(y=new P.ae(this,this.r,null,null,[null]),y.c=this.e,x=0;y.t();x=v){w=y.d
v=x+1
if(x>=z.length)return H.f(z,x)
z[x]=w}return z},
ct:function(a){return this.bF(a,!0)},
aF:function(a,b){return new H.bE(this,b,[H.m(this,0),null])},
k:function(a){return P.cd(this,"{","}")},
Z:function(a,b){var z
for(z=new P.ae(this,this.r,null,null,[null]),z.c=this.e;z.t();)b.$1(z.d)},
bv:function(a,b,c){var z,y
for(z=new P.ae(this,this.r,null,null,[null]),z.c=this.e,y=b;z.t();)y=c.$2(y,z.d)
return y},
gv:function(a){var z,y
z=new P.ae(this,this.r,null,null,[null])
z.c=this.e
if(!z.t())throw H.c(H.aj())
do y=z.d
while(z.t())
return y},
aQ:function(a,b,c){var z,y
for(z=new P.ae(this,this.r,null,null,[null]),z.c=this.e;z.t();){y=z.d
if(b.$1(y)===!0)return y}if(c!=null)return c.$0()
throw H.c(H.aj())},
cj:function(a,b){return this.aQ(a,b,null)},
bB:function(a,b){var z,y,x,w
for(z=new P.ae(this,this.r,null,null,[null]),z.c=this.e,y=null,x=!1;z.t();){w=z.d
if(b.$1(w)===!0){if(x)throw H.c(H.dz())
y=w
x=!0}}if(x)return y
throw H.c(H.aj())},
$isbN:1,
$isY:1},
od:{"^":"oe;$ti"}}],["","",,P,{"^":"",
db:function(a){var z
if(a==null)return
if(typeof a!="object")return a
if(Object.getPrototypeOf(a)!==Array.prototype)return new P.qJ(a,Object.create(null),null)
for(z=0;z<a.length;++z)a[z]=P.db(a[z])
return a},
ru:function(a,b){var z,y,x,w
if(typeof a!=="string")throw H.c(H.T(a))
z=null
try{z=JSON.parse(a)}catch(x){y=H.B(x)
w=String(y)
throw H.c(new P.f8(w,null,null))}w=P.db(z)
return w},
xb:[function(a){return a.dN()},"$1","tG",2,0,0],
qJ:{"^":"d;a,b,c",
j:function(a,b){var z,y
z=this.b
if(z==null)return this.c.j(0,b)
else if(typeof b!=="string")return
else{y=z[b]
return typeof y=="undefined"?this.iZ(b):y}},
gl:function(a){var z
if(this.b==null){z=this.c
z=z.gl(z)}else z=this.cB().length
return z},
gW:function(a){var z
if(this.b==null){z=this.c
z=z.gl(z)}else z=this.cB().length
return z===0},
gas:function(a){var z
if(this.b==null){z=this.c
z=z.gl(z)}else z=this.cB().length
return z>0},
n:function(a,b,c){var z,y
if(this.b==null)this.c.n(0,b,c)
else if(this.aa(b)){z=this.b
z[b]=c
y=this.a
if(y==null?z!=null:y!==z)y[b]=null}else this.jb().n(0,b,c)},
aa:function(a){if(this.b==null)return this.c.aa(a)
if(typeof a!=="string")return!1
return Object.prototype.hasOwnProperty.call(this.a,a)},
Z:function(a,b){var z,y,x,w
if(this.b==null)return this.c.Z(0,b)
z=this.cB()
for(y=0;y<z.length;++y){x=z[y]
w=this.b[x]
if(typeof w=="undefined"){w=P.db(this.a[x])
this.b[x]=w}b.$2(x,w)
if(z!==this.c)throw H.c(new P.C(this))}},
k:function(a){return P.dN(this)},
cB:function(){var z=this.c
if(z==null){z=Object.keys(this.a)
this.c=z}return z},
jb:function(){var z,y,x,w,v
if(this.b==null)return this.c
z=P.dI(P.r,null)
y=this.cB()
for(x=0;w=y.length,x<w;++x){v=y[x]
z.n(0,v,this.j(0,v))}if(w===0)y.push(null)
else C.a.sl(y,0)
this.b=null
this.a=null
this.c=z
return z},
iZ:function(a){var z
if(!Object.prototype.hasOwnProperty.call(this.a,a))return
z=P.db(this.a[a])
return this.b[a]=z},
$isG:1,
$asG:function(){return[P.r,null]}},
f1:{"^":"d;$ti"},
cK:{"^":"d;$ti"},
dE:{"^":"a3;a,b",
k:function(a){if(this.b!=null)return"Converting object to an encodable object failed."
else return"Converting object did not return an encodable object."}},
m3:{"^":"dE;a,b",
k:function(a){return"Cyclic error in JSON stringify"}},
m2:{"^":"f1;a,b",
jF:function(a,b){var z=P.ru(a,this.gjG().a)
return z},
jE:function(a){return this.jF(a,null)},
jO:function(a,b){var z=this.gjP()
z=P.qL(a,z.b,z.a)
return z},
h_:function(a){return this.jO(a,null)},
gjP:function(){return C.R},
gjG:function(){return C.Q},
$asf1:function(){return[P.d,P.r]}},
m5:{"^":"cK;a,b",
$ascK:function(){return[P.d,P.r]}},
m4:{"^":"cK;a",
$ascK:function(){return[P.r,P.d]}},
qM:{"^":"d;",
hI:function(a){var z,y,x,w,v,u,t
z=J.J(a)
y=z.gl(a)
if(typeof y!=="number")return H.w(y)
x=this.c
w=0
v=0
for(;v<y;++v){u=z.cP(a,v)
if(u>92)continue
if(u<32){if(v>w)x.C+=C.b.aH(a,w,v)
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
break}}else if(u===34||u===92){if(v>w)x.C+=C.b.aH(a,w,v)
w=v+1
x.C+=H.aq(92)
x.C+=H.aq(u)}}if(w===0)x.C+=H.b(a)
else if(w<y)x.C+=z.aH(a,w,y)},
e3:function(a){var z,y,x,w
for(z=this.a,y=z.length,x=0;x<y;++x){w=z[x]
if(a==null?w==null:a===w)throw H.c(new P.m3(a,null))}z.push(a)},
dQ:function(a){var z,y,x,w
if(this.hH(a))return
this.e3(a)
try{z=this.b.$1(a)
if(!this.hH(z))throw H.c(new P.dE(a,null))
x=this.a
if(0>=x.length)return H.f(x,-1)
x.pop()}catch(w){y=H.B(w)
throw H.c(new P.dE(a,y))}},
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
if(!!z.$isN){this.e3(a)
this.l9(a)
z=this.a
if(0>=z.length)return H.f(z,-1)
z.pop()
return!0}else if(!!z.$isG){this.e3(a)
y=this.la(a)
z=this.a
if(0>=z.length)return H.f(z,-1)
z.pop()
return y}else return!1}},
l9:function(a){var z,y,x
z=this.c
z.C+="["
y=J.J(a)
if(y.gl(a)>0){this.dQ(y.j(a,0))
for(x=1;x<y.gl(a);++x){z.C+=","
this.dQ(y.j(a,x))}}z.C+="]"},
la:function(a){var z,y,x,w,v,u,t
z={}
if(a.gW(a)){this.c.C+="{}"
return!0}y=a.gl(a)*2
x=new Array(y)
z.a=0
z.b=!0
a.Z(0,new P.qN(z,x))
if(!z.b)return!1
w=this.c
w.C+="{"
for(v='"',u=0;u<y;u+=2,v=',"'){w.C+=v
this.hI(x[u])
w.C+='":'
t=u+1
if(t>=y)return H.f(x,t)
this.dQ(x[t])}w.C+="}"
return!0}},
qN:{"^":"a:6;a,b",
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
qK:{"^":"qM;c,a,b",u:{
qL:function(a,b,c){var z,y,x
z=new P.bQ("")
y=new P.qK(z,[],P.tG())
y.dQ(a)
x=z.C
return x.charCodeAt(0)==0?x:x}}}}],["","",,P,{"^":"",
wx:[function(a,b){return J.bC(a,b)},"$2","tH",4,0,40],
f5:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.h(a)
if(typeof a==="string")return JSON.stringify(a)
return P.l3(a)},
l3:function(a){var z=J.o(a)
if(!!z.$isa)return z.k(a)
return H.cX(a)},
cN:function(a){return new P.qs(a)},
P:function(a,b,c){var z,y
z=H.p([],[c])
for(y=J.ai(a);y.t();)z.push(y.gS())
if(b)return z
z.fixed$length=Array
return z},
mn:function(a,b,c,d){var z,y,x
z=H.p(new Array(a),[d])
for(y=0;y<a;++y){x=b.$1(y)
if(y>=z.length)return H.f(z,y)
z[y]=x}return z},
aB:function(a,b){var z=P.P(a,!1,b)
z.fixed$length=Array
z.immutable$list=Array
return z},
ez:function(a){H.uL(H.b(a))},
bp:function(a,b,c){return new H.dB(a,H.dC(a,!1,b,!1),null,null)},
a2:{"^":"d;"},
"+bool":0,
V:{"^":"d;$ti"},
cL:{"^":"d;jc:a<,b",
w:function(a,b){if(b==null)return!1
if(!(b instanceof P.cL))return!1
return this.a===b.a&&!0},
bD:function(a,b){return C.e.bD(this.a,b.gjc())},
gB:function(a){var z=this.a
return(z^C.e.ds(z,30))&1073741823},
k:function(a){var z,y,x,w,v,u,t,s
z=P.kh(H.nl(this))
y=P.c5(H.nj(this))
x=P.c5(H.nf(this))
w=P.c5(H.ng(this))
v=P.c5(H.ni(this))
u=P.c5(H.nk(this))
t=P.ki(H.nh(this))
s=z+"-"+y+"-"+x+" "+w+":"+v+":"+u+"."+t
return s},
q:function(a,b){var z,y
z=this.a+b.gkd()
y=new P.cL(z,!1)
if(!(Math.abs(z)>864e13))z=!1
else z=!0
if(z)H.i(P.E(y.gkA()))
return y},
gkA:function(){return this.a},
$isV:1,
$asV:function(){return[P.cL]},
u:{
kh:function(a){var z,y
z=Math.abs(a)
y=a<0?"-":""
if(z>=1000)return""+a
if(z>=100)return y+"0"+H.b(z)
if(z>=10)return y+"00"+H.b(z)
return y+"000"+H.b(z)},
ki:function(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},
c5:function(a){if(a>=10)return""+a
return"0"+a}}},
aV:{"^":"L;",$isV:1,
$asV:function(){return[P.L]}},
"+double":0,
b8:{"^":"d;bV:a<",
ai:function(a,b){return new P.b8(this.a+b.gbV())},
aq:function(a,b){return new P.b8(this.a-b.gbV())},
c8:function(a,b){if(typeof b!=="number")return H.w(b)
return new P.b8(C.j.hv(this.a*b))},
aV:function(a,b){return C.e.aV(this.a,b.gbV())},
bo:function(a,b){return this.a>b.gbV()},
d8:function(a,b){return this.a<=b.gbV()},
bS:function(a,b){return C.e.bS(this.a,b.gbV())},
gkd:function(){return C.e.bL(this.a,1000)},
w:function(a,b){if(b==null)return!1
if(!(b instanceof P.b8))return!1
return this.a===b.a},
gB:function(a){return this.a&0x1FFFFFFF},
bD:function(a,b){return C.e.bD(this.a,b.gbV())},
k:function(a){var z,y,x,w,v
z=new P.kL()
y=this.a
if(y<0)return"-"+new P.b8(0-y).k(0)
x=z.$1(C.e.bL(y,6e7)%60)
w=z.$1(C.e.bL(y,1e6)%60)
v=new P.kK().$1(y%1e6)
return""+C.e.bL(y,36e8)+":"+H.b(x)+":"+H.b(w)+"."+H.b(v)},
f3:function(a){return new P.b8(0-this.a)},
$isV:1,
$asV:function(){return[P.b8]}},
kK:{"^":"a:12;",
$1:function(a){if(a>=1e5)return""+a
if(a>=1e4)return"0"+a
if(a>=1000)return"00"+a
if(a>=100)return"000"+a
if(a>=10)return"0000"+a
return"00000"+a}},
kL:{"^":"a:12;",
$1:function(a){if(a>=10)return""+a
return"0"+a}},
a3:{"^":"d;",
gbq:function(){return H.D(this.$thrownJsError)}},
cV:{"^":"a3;",
k:function(a){return"Throw of null."}},
b7:{"^":"a3;a,b,h:c<,d",
ge9:function(){return"Invalid argument"+(!this.a?"(s)":"")},
ge8:function(){return""},
k:function(a){var z,y,x,w,v,u
z=this.c
y=z!=null?" ("+z+")":""
z=this.d
x=z==null?"":": "+H.b(z)
w=this.ge9()+y+x
if(!this.a)return w
v=this.ge8()
u=P.f5(this.b)
return w+v+": "+H.b(u)},
u:{
E:function(a){return new P.b7(!1,null,null,a)},
cD:function(a,b,c){return new P.b7(!0,a,b,c)},
l:function(a){return new P.b7(!1,null,a,"Must not be null")}}},
e0:{"^":"b7;e,f,a,b,c,d",
ge9:function(){return"RangeError"},
ge8:function(){var z,y,x
z=this.e
if(z==null){z=this.f
y=z!=null?": Not less than or equal to "+H.b(z):""}else{x=this.f
if(x==null)y=": Not greater than or equal to "+H.b(z)
else if(x>z)y=": Not in range "+H.b(z)+".."+H.b(x)+", inclusive"
else y=x<z?": Valid value range is empty":": Only valid value is "+H.b(z)}return y},
u:{
nr:function(a){return new P.e0(null,null,!1,null,null,a)},
cj:function(a,b,c){return new P.e0(null,null,!0,a,b,"Value not in range")},
a6:function(a,b,c,d,e){return new P.e0(b,c,!0,a,d,"Invalid value")},
ns:function(a,b,c,d,e){if(a<b||a>c)throw H.c(P.a6(a,b,c,d,e))},
ck:function(a,b,c,d,e,f){if(0>a||a>c)throw H.c(P.a6(a,0,c,"start",f))
if(a>b||b>c)throw H.c(P.a6(b,a,c,"end",f))
return b}}},
lO:{"^":"b7;e,l:f>,a,b,c,d",
ge9:function(){return"RangeError"},
ge8:function(){if(J.c0(this.b,0))return": index must not be negative"
var z=this.f
if(z===0)return": no indices are valid"
return": index should be less than "+H.b(z)},
u:{
cQ:function(a,b,c,d,e){var z=e!=null?e:J.aL(b)
return new P.lO(b,z,!0,a,c,"Index out of range")}}},
S:{"^":"a3;a",
k:function(a){return"Unsupported operation: "+this.a}},
W:{"^":"a3;a",
k:function(a){var z=this.a
return z!=null?"UnimplementedError: "+z:"UnimplementedError"}},
x:{"^":"a3;a",
k:function(a){return"Bad state: "+this.a}},
C:{"^":"a3;a",
k:function(a){var z=this.a
if(z==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+H.b(P.f5(z))+"."}},
mR:{"^":"d;",
k:function(a){return"Out of Memory"},
gbq:function(){return},
$isa3:1},
h4:{"^":"d;",
k:function(a){return"Stack Overflow"},
gbq:function(){return},
$isa3:1},
kg:{"^":"a3;a",
k:function(a){var z=this.a
return z==null?"Reading static variable during its initialization":"Reading static variable '"+H.b(z)+"' during its initialization"}},
qs:{"^":"d;a",
k:function(a){var z=this.a
if(z==null)return"Exception"
return"Exception: "+H.b(z)}},
f8:{"^":"d;a,b,c",
k:function(a){var z,y,x
z=this.a
y=""!==z?"FormatException: "+z:"FormatException"
x=this.b
if(typeof x!=="string")return y
if(x.length>78)x=C.b.aH(x,0,75)+"..."
return y+"\n"+x}},
l8:{"^":"d;h:a<,fz,$ti",
k:function(a){return"Expando:"+H.b(this.a)},
j:function(a,b){var z,y
z=this.fz
if(typeof z!=="string"){if(b==null||typeof b==="boolean"||typeof b==="number"||typeof b==="string")H.i(P.cD(b,"Expandos are not allowed on strings, numbers, booleans or null",null))
return z.get(b)}y=H.dX(b,"expando$values")
return y==null?null:H.dX(y,z)},
n:function(a,b,c){var z,y
z=this.fz
if(typeof z!=="string")z.set(b,c)
else{y=H.dX(b,"expando$values")
if(y==null){y=new P.d()
H.fI(b,"expando$values",y)}H.fI(y,z,c)}}},
bF:{"^":"d;"},
t:{"^":"L;",$isV:1,
$asV:function(){return[P.L]}},
"+int":0,
A:{"^":"d;$ti",
aF:function(a,b){return H.bG(this,b,H.y(this,"A",0),null)},
c6:["dg",function(a,b){return new H.K(this,b,[H.y(this,"A",0)])}],
a7:function(a,b){var z
for(z=this.ga_(this);z.t();)if(J.e(z.gS(),b))return!0
return!1},
Z:function(a,b){var z
for(z=this.ga_(this);z.t();)b.$1(z.gS())},
bv:function(a,b,c){var z,y
for(z=this.ga_(this),y=b;z.t();)y=c.$2(y,z.gS())
return y},
bs:function(a,b){var z
for(z=this.ga_(this);z.t();)if(b.$1(z.gS())===!0)return!0
return!1},
bF:function(a,b){return P.P(this,b,H.y(this,"A",0))},
ct:function(a){return this.bF(a,!0)},
bG:function(a){return P.b9(this,H.y(this,"A",0))},
gl:function(a){var z,y
z=this.ga_(this)
for(y=0;z.t();)++y
return y},
gW:function(a){return!this.ga_(this).t()},
gas:function(a){return!this.gW(this)},
dY:function(a,b){return H.ok(this,b,H.y(this,"A",0))},
gv:function(a){var z,y
z=this.ga_(this)
if(!z.t())throw H.c(H.aj())
do y=z.gS()
while(z.t())
return y},
gca:function(a){var z,y
z=this.ga_(this)
if(!z.t())throw H.c(H.aj())
y=z.gS()
if(z.t())throw H.c(H.dz())
return y},
ar:function(a,b){var z,y,x
if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(P.l("index"))
if(b<0)H.i(P.a6(b,0,null,"index",null))
for(z=this.ga_(this),y=0;z.t();){x=z.gS()
if(b===y)return x;++y}throw H.c(P.cQ(b,this,"index",null,y))},
k:function(a){return P.lZ(this,"(",")")}},
cS:{"^":"d;$ti"},
N:{"^":"d;$ti",$isA:1,$isY:1},
"+List":0,
G:{"^":"d;$ti"},
as:{"^":"d;",
gB:function(a){return P.d.prototype.gB.call(this,this)},
k:function(a){return"null"}},
"+Null":0,
L:{"^":"d;",$isV:1,
$asV:function(){return[P.L]}},
"+num":0,
d:{"^":";",
w:function(a,b){return this===b},
gB:function(a){return H.aC(this)},
k:function(a){return H.cX(this)},
gby:function(a){return new H.au(H.ik(this),null)},
toString:function(){return this.k(this)}},
bn:{"^":"d;"},
bN:{"^":"Y;$ti"},
b1:{"^":"d;"},
r:{"^":"d;",$isV:1,
$asV:function(){return[P.r]},
$isdU:1},
"+String":0,
bQ:{"^":"d;C<",
gl:function(a){return this.C.length},
gW:function(a){return this.C.length===0},
gas:function(a){return this.C.length!==0},
k:function(a){var z=this.C
return z.charCodeAt(0)==0?z:z},
u:{
h8:function(a,b,c){var z=J.ai(b)
if(!z.t())return a
if(c.length===0){do a+=H.b(z.gS())
while(z.t())}else{a+=H.b(z.gS())
for(;z.t();)a=a+c+H.b(z.gS())}return a},
p6:function(a){return new P.bQ(a)}}}}],["","",,P,{"^":"",fU:{"^":"d;"}}],["","",,P,{"^":"",
cY:function(a){return C.L},
qI:{"^":"d;",
ao:function(a){if(a<=0||a>4294967296)throw H.c(P.nr("max must be in range 0 < max \u2264 2^32, was "+a))
return Math.random()*a>>>0},
kC:function(){return Math.random()}}}],["","",,S,{"^":"",k5:{"^":"d;a,b,$ti",
j:function(a,b){return this.b.j(0,b)},
aa:function(a){return this.b.aa(a)},
Z:function(a,b){return this.b.Z(0,b)},
gW:function(a){var z=this.b
return z.gW(z)},
gas:function(a){var z=this.b
return z.gas(z)},
gl:function(a){var z=this.b
return z.gl(z)},
n:function(a,b,c){this.iS()
this.b.n(0,b,c)},
k:function(a){return J.h(this.b)},
iS:function(){if(!this.a)return
this.a=!1
this.b=P.ch(this.b,H.m(this,0),H.m(this,1))},
$isG:1}}],["","",,A,{"^":"",k6:{"^":"d;a,b,$ti",
gl:function(a){return this.b.a},
co:function(a){return this.b.co(a)},
a7:function(a,b){return this.b.a7(0,b)},
Z:function(a,b){return this.b.Z(0,b)},
gW:function(a){return this.b.a===0},
gas:function(a){return this.b.a!==0},
ga_:function(a){var z,y
z=this.b
y=new P.ae(z,z.r,null,null,[null])
y.c=z.e
return y},
gv:function(a){var z=this.b
return z.gv(z)},
aF:function(a,b){var z=this.b
z.toString
return new H.bE(z,b,[H.m(z,0),null])},
bG:function(a){var z,y
z=this.b
y=z.eh()
y.av(0,z)
return y},
q:function(a,b){this.iz()
return this.b.q(0,b)},
k:function(a){return J.h(this.b)},
iz:function(){if(!this.a)return
this.a=!1
this.b=P.b9(this.b,H.m(this,0))},
$isbN:1,
$isY:1}}],["","",,S,{"^":"",ds:{"^":"d;fB:a<,b,$ti",
a1:function(a){var z=new S.O(null,null,this.$ti)
z.aj()
z.m(this)
a.$1(z)
return z.p()},
gB:function(a){var z=this.b
if(z==null){z=X.bA(this.a)
this.b=z}return z},
w:function(a,b){var z,y,x,w,v
if(b==null)return!1
if(b===this)return!0
z=J.o(b)
if(!z.$isds)return!1
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
aY:function(a,b){return this.bP(a,b,0)},
ga_:function(a){var z=this.a
return new J.bj(z,z.length,0,null,[H.m(z,0)])},
aF:function(a,b){var z=this.a
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
gas:function(a){return this.a.length!==0},
gv:function(a){var z=this.a
return(z&&C.a).gv(z)},
aj:function(){if(new H.au(H.X(H.m(this,0)),null).w(0,C.q))throw H.c(new P.S('explicit element type required, for example "new BuiltList<int>"'))}},O:{"^":"d;fB:a<,b,$ti",
p:function(){var z,y
z=this.b
if(z==null){z=this.a
y=new S.ds(z,null,this.$ti)
y.aj()
this.a=z
this.b=y
z=y}return z},
m:function(a){if(H.aU(a,"$isds",this.$ti,null)){this.a=a.gfB()
this.b=a}else{this.a=P.P(a,!0,H.m(this,0))
this.b=null}},
j:function(a,b){var z=this.a
if(b>>>0!==b||b>=z.length)return H.f(z,b)
return z[b]},
n:function(a,b,c){var z
if(c==null)H.i(P.E("null element"))
z=this.gep()
if(b>>>0!==b||b>=z.length)return H.f(z,b)
z[b]=c},
q:function(a,b){var z
if(b==null)H.i(P.E("null element"))
z=this.gep();(z&&C.a).q(z,b)},
a3:function(a,b){var z=this.gep();(z&&C.a).a3(z,b)},
aF:function(a,b){var z=this.a
z.toString
z=new H.ap(z,b,[H.m(z,0),null]).bF(0,!0)
this.a=z
this.b=null
this.iu(z)},
gep:function(){if(this.b!=null){this.a=P.P(this.a,!0,H.m(this,0))
this.b=null}return this.a},
aj:function(){if(new H.au(H.X(H.m(this,0)),null).w(0,C.q))throw H.c(new P.S('explicit element type required, for example "new ListBuilder<int>"'))},
iu:function(a){var z,y,x,w
for(z=a.length,y=H.m(this,0),x=0;x<a.length;a.length===z||(0,H.ar)(a),++x){w=a[x]
if(!H.de(w,y))throw H.c(P.E("invalid element: "+H.b(w)))}}}}],["","",,A,{"^":"",cH:{"^":"d;iR:a<,b,c,d,$ti",
a1:function(a){var z=new A.cU(null,null,this.$ti)
z.ce()
z.m(this)
a.$1(z)
return z.p()},
E:function(){return new S.k5(!0,this.a,this.$ti)},
gB:function(a){var z=this.b
if(z==null){z=this.a.gcm()
z=H.bG(z,new A.jR(this),H.y(z,"A",0),null)
z=P.P(z,!1,H.y(z,"A",0))
C.a.f7(z)
z=X.bA(z)
this.b=z}return z},
w:function(a,b){var z,y,x,w,v
if(b==null)return!1
if(b===this)return!0
z=J.o(b)
if(!z.$iscH)return!1
y=b.a
x=this.a
if(y.gl(y)!==x.gl(x))return!1
z=z.gB(b)
w=this.gB(this)
if(z==null?w!=null:z!==w)return!1
z=this.c
if(z==null){z=x.gcm()
this.c=z}z=z.ga_(z)
for(;z.t();){v=z.gS()
if(!J.e(y.j(0,v),x.j(0,v)))return!1}return!0},
k:function(a){return J.h(this.a)},
j:function(a,b){return this.a.j(0,b)},
Z:function(a,b){this.a.Z(0,b)},
gW:function(a){var z=this.a
return z.gW(z)},
gas:function(a){var z=this.a
return z.gas(z)},
gl:function(a){var z=this.a
return z.gl(z)},
ce:function(){if(new H.au(H.X(H.m(this,0)),null).w(0,C.q))throw H.c(new P.S('explicit key type required, for example "new BuiltMap<int, int>"'))
if(new H.au(H.X(H.m(this,1)),null).w(0,C.q))throw H.c(new P.S('explicit value type required, for example "new BuiltMap<int, int>"'))}},jR:{"^":"a:0;a",
$1:function(a){var z,y
z=J.j(a)
y=J.j(this.a.a.j(0,a))
return X.dc(X.b3(X.b3(0,J.j(z)),J.j(y)))}},cU:{"^":"d;a,b,$ti",
p:function(){var z=this.b
if(z==null){z=new A.cH(this.a,null,null,null,this.$ti)
z.ce()
this.b=z}return z},
m:function(a){var z
if(H.aU(a,"$iscH",this.$ti,null)){this.b=a
this.a=a.giR()}else if(!!a.$iscH){z=P.ch(a.a,H.m(this,0),H.m(this,1))
this.b=null
this.a=z}else if(!!a.$isG){z=P.ch(a,H.m(this,0),H.m(this,1))
this.b=null
this.a=z}else throw H.c(P.E("expected Map or BuiltMap, got "+H.b(a.gby(a))))},
j:function(a,b){return this.a.j(0,b)},
n:function(a,b,c){if(c==null)H.i(P.E("null value"))
this.gj3().n(0,b,c)},
gj3:function(){if(this.b!=null){this.a=P.ch(this.a,H.m(this,0),H.m(this,1))
this.b=null}return this.a},
ce:function(){if(new H.au(H.X(H.m(this,0)),null).w(0,C.q))throw H.c(new P.S('explicit key type required, for example "new MapBuilder<int, int>"'))
if(new H.au(H.X(H.m(this,1)),null).w(0,C.q))throw H.c(new P.S('explicit value type required, for example "new MapBuilder<int, int>"'))}}}],["","",,L,{"^":"",dt:{"^":"d;j5:a<,b,$ti",
a1:function(a){var z=new L.aD(null,null,this.$ti)
z.aX()
z.m(this)
a.$1(z)
return z.p()},
gB:function(a){var z=this.b
if(z==null){z=this.a
z.toString
z=P.P(new H.bE(z,new L.jS(),[H.m(z,0),null]),!1,null)
C.a.f7(z)
z=X.bA(z)
this.b=z}return z},
w:function(a,b){var z,y,x
if(b==null)return!1
if(b===this)return!0
z=J.o(b)
if(!z.$isdt)return!1
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
aF:function(a,b){var z=this.a
z.toString
return new H.bE(z,b,[H.m(z,0),null])},
a7:function(a,b){return this.a.a7(0,b)},
Z:function(a,b){return this.a.Z(0,b)},
bG:function(a){return new A.k6(!0,this.a,this.$ti)},
gW:function(a){return this.a.a===0},
gas:function(a){return this.a.a!==0},
gv:function(a){var z=this.a
return z.gv(z)},
aQ:function(a,b,c){return this.a.aQ(0,b,c)},
cj:function(a,b){return this.aQ(a,b,null)},
aX:function(){if(new H.au(H.X(H.m(this,0)),null).w(0,C.q))throw H.c(new P.S('explicit element type required, for example "new BuiltSet<int>"'))}},jS:{"^":"a:0;",
$1:function(a){return J.j(a)}},aD:{"^":"d;a,b,$ti",
p:function(){var z=this.b
if(z==null){z=new L.dt(this.a,null,this.$ti)
z.aX()
this.b=z}return z},
m:function(a){var z,y,x,w
if(H.aU(a,"$isdt",this.$ti,null)){this.a=a.gj5()
this.b=a}else{z=H.m(this,0)
y=P.a4(null,null,null,z)
for(x=J.ai(a);x.t();){w=x.gS()
if(H.de(w,z))y.q(0,w)
else throw H.c(P.E("iterable contained invalid element: "+H.b(w)))}this.b=null
this.a=y}},
q:function(a,b){if(b==null)H.i(P.E("null element"))
this.geq().q(0,b)},
a3:function(a,b){this.geq().a3(0,b)},
aF:function(a,b){var z=this.a
z.toString
z=P.b9(new H.bE(z,b,[H.m(z,0),null]),null)
this.b=null
this.a=z
this.j6(z)},
geq:function(){if(this.b!=null){this.a=P.b9(this.a,H.m(this,0))
this.b=null}return this.a},
aX:function(){if(new H.au(H.X(H.m(this,0)),null).w(0,C.q))throw H.c(new P.S('explicit element type required, for example "new SetBuilder<int>"'))},
j6:function(a){var z,y,x
for(z=new P.ae(a,a.r,null,null,[null]),z.c=a.e,y=H.m(this,0);z.t();){x=z.d
if(!H.de(x,y))throw H.c(P.E("invalid element: "+H.b(x)))}}}}],["","",,Y,{"^":"",
k:function(a,b){if(typeof b!=="number")return H.w(b)
a=536870911&a+b
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
U:function(a){a=536870911&a+((67108863&a)<<3)
a^=a>>>11
return 536870911&a+((16383&a)<<15)}}],["","",,N,{"^":"",nQ:{"^":"nO;ch,cx,ag:cy@,bh:db@,dx,b,c,d,e,f,r,x,y,z,Q,a",
hm:function(){var z=$.$get$cz()
z.n(0,"game",this.cx)
z.n(0,"hitpoints",this.cy)
z.n(0,"stamina",this.db)
z.n(0,"gold",this.dx)},
kf:function(){var z,y,x,w
this.cx=null
this.cy=Z.bO("Health",new N.nT(),"#CCCCCC","Your physical state",100,0,!0,P.aV)
z=P.t
this.db=Z.bO("Stamina",new N.nU(),"#CCCCCC","Spare physical energy",0,0,!0,z)
z=Z.bO("Gold",new N.nV(),"#CCCCCC","Gold coins",0,0,!0,z)
this.dx=z
y=$.$get$bY()
x=this.cy
w=this.db
y=new O.f4(N.bm("EdgeheadGame"),null,!1,null,null,null,null,null,null,null,null,new Y.a1(H.p([],[Y.ah]),0,P.aA()),x,w,z,O.uV(),O.uU(),O.uT(),y,this.gi_(),new P.bQ(""),!1,null)
y.hX()
this.cx=y
y.x="endGame"
$.$get$cw().q(0,0)},
ic:function(){var z,y
z=new O.d1(["# Insignificant Little Vermin",[null,P.ag(["goto","gameLoop"])]],0,null,!1,!1)
y=this.b.a
y.n(0,"start",z)
z.a="start"
z=new O.d1([new N.nS(this),[null,P.ag(["goto","gameLoop"])]],0,null,!1,!1)
y.n(0,"gameLoop",z)
z.a="gameLoop"
z=new O.d1(['<p class="meta">\n  Hit <strong>Restart</strong> (top left) to play again. It will be different.\n</p>'],0,null,!1,!1)
y.n(0,"endGame",z)
z.a="endGame"
this.c=y.j(0,"start")},
u:{
nR:function(){var z,y,x,w
z=Z.bO("Health",new N.ti(),"#CCCCCC","Your physical state",100,0,!0,P.aV)
y=P.t
x=Z.bO("Stamina",new N.tj(),"#CCCCCC","Spare physical energy",0,0,!0,y)
y=Z.bO("Gold",new N.tk(),"#CCCCCC","Gold coins",0,0,!0,y)
w=P.r
z=new N.nQ("net.filiph.edgehead.0.0.1",null,z,x,y,new O.nW(new H.R(0,null,null,null,null,null,0,[w,O.d1])),null,null,null,P.a4(null,null,null,w),!1,null,-9999,null,null,null)
z.ic()
return z}}},ti:{"^":"a:18;",
$1:function(a){var z=J.o(a)
if(z.w(a,0))return"\ud83d\udc80"
if(z.d8(a,0.5))return"\ud83d\ude23"
if(z.aV(a,1))return"\ud83d\ude27"
return"\ud83d\ude10"}},tj:{"^":"a:9;",
$1:function(a){return H.b(a)+" \ud83d\udd06"}},tk:{"^":"a:9;",
$1:function(a){return H.b(a)+" \ud83d\udcb0"}},nS:{"^":"a:19;a",
$0:function(){var z=0,y=P.az(),x=this
var $async$$0=P.aw(function(a,b){if(a===1)return P.aF(b,y)
while(true)switch(z){case 0:z=2
return P.av(x.a.cx.bx(),$async$$0)
case 2:return P.aG(null,y)}})
return P.aH($async$$0,y)}},nT:{"^":"a:18;",
$1:function(a){var z=J.o(a)
if(z.w(a,0))return"\ud83d\udc80"
if(z.d8(a,0.5))return"\ud83d\ude23"
if(z.aV(a,1))return"\ud83d\ude27"
return"\ud83d\ude10"}},nU:{"^":"a:9;",
$1:function(a){return H.b(a)+" \ud83d\udd06"}},nV:{"^":"a:9;",
$1:function(a){return H.b(a)+" \ud83d\udcb0"}}}],["","",,M,{"^":"",cM:{"^":"d;"},l0:{"^":"d;"},pP:{"^":"cM;a,b,c",
a1:function(a){var z=new M.e8(null,!1,0,0)
z.m(this)
a.$1(z)
return z.p()},
w:function(a,b){if(b==null)return!1
if(b===this)return!0
if(!(b instanceof M.cM))return!1
return this.a===b.a&&this.b===b.b&&!0},
gB:function(a){return Y.U(Y.k(Y.k(Y.k(0,this.a&0x1FFFFFFF),this.b&0x1FFFFFFF),C.N.gB(!1)))},
k:function(a){return"EdgeheadGlobalState {bloodrockFollowers="+C.e.k(this.a)+",\nbrianaQuoteIndex="+C.e.k(this.b)+",\nhasKegOfBeer="+String(!1)+",\n}"}},e8:{"^":"l0;d,a,b,c",
gcv:function(){var z=this.d
if(z!=null){this.b=z.a
this.c=this.d.b
this.d.c
this.a=!1
this.d=null}return this},
m:function(a){this.d=a},
p:function(){var z,y,x
z=this.d
if(z==null){this.gcv()
y=this.b
this.gcv()
x=this.c
this.gcv()
this.a
z=new M.pP(y,x,!1)}this.m(z)
return z}}}],["","",,O,{"^":"",
xf:[function(a){var z,y
z=a.gc9()
y=a.gbZ()
if(typeof y!=="number")return H.w(y)
return z-2*y},"$1","dh",2,0,20],
xr:[function(a){var z,y,x
z=a.gc9()
y=a.gd1()
x=a.gbZ()
if(typeof x!=="number")return H.w(x)
return z+y-x},"$1","i9",2,0,20],
f4:{"^":"mp;y,z,Q,ch,cx,cy,db,dx,dy,bH:fr<,fx,f9:fy<,ag:go<,bh:id<,k1,a,b,c,d,e,f,r,x",
hX:function(){var z,y,x,w,v,u
z=P.aB(C.o,null)
y=$.$get$bZ()
this.cy=R.b6(1000,"orc",O.dh(),null,null,new G.b2("sword",1,1,!1,!0,!1,z),null,0,2,0,!1,2,!1,C.t,0,y)
this.db=R.b6(1001,"goblin",O.dh(),null,null,new G.b2("scimitar",1,1,!1,!0,!1,P.aB(C.o,null)),null,0,1,0,!1,1,!1,C.t,0,y)
y=new S.O(null,null,[Q.u])
y.aj()
y.m([new Q.u("start_adventure","","",null)])
this.dx=new K.cm(y.p(),"preStartBook",new O.kS(),new O.kT(),null,null,"ground")
y=R.b6(1,"Filip",null,"preStartBook",null,null,null,0,2,1000,!0,2,!0,C.E,1,null)
this.ch=y
z=y.x
y=y.cy
if(typeof z!=="number")return z.d6()
if(typeof y!=="number")return H.w(y)
this.go.sab(z/y)
this.id.sab(this.ch.fx)
this.k1.sab(this.ch.r)
this.cx=R.b6(100,"Briana",null,this.dx.b,null,null,this.ch.y,0,2,0,!1,2,!0,C.a4,0,null)
this.dy=F.fP(this.dx,!1)
y=K.cm
x=P.P($.$get$hZ(),!0,y)
C.a.av(x,[this.dx,$.$get$es()])
w=new M.e8(null,!1,0,0).p()
z=this.ch
v=this.cx
u=this.dy
v=P.b9([z,v],R.I)
z=P.bb(null,O.cB)
u=new A.ad(v,P.a4(null,null,null,U.ab),w,z,P.b9(x,y),P.P([u],!0,S.ac),0,null)
this.fr=u
y=new Y.a1(H.p([],[Y.ah]),0,P.aA())
y.b=u.r
this.fx=new B.bI(u,null,y,1,1,!0,!1,!1,0)},
d3:function(){var z=0,y=P.az(),x,w=this,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
var $async$d3=P.aw(function(a,b){if(a===1)return P.aF(b,y)
while(true)switch(z){case 0:v=w.fy
u=w.gjN()
if(v.hj(u)){z=1
break}t=w.fr.Y(w.ch.y)
s=t.gag()
r=t.ghe()
if(typeof s!=="number"){x=s.d6()
z=1
break}if(typeof r!=="number"){x=H.w(r)
z=1
break}w.go.sab(s/r)
w.id.sab(t.gbh())
r=w.k1
s=t.gf2()
if(!J.e(r.f,s)){r.f=s
r.y=!0
$.cp=!0}s=w.y
s.ha("update() for world at time "+w.fr.r)
r=w.fr.f
if(r.length===0){w.r=!0
v.A(0,"\n\n",!0)
if(w.fr.k9(w.ch.y))v.A(0,"TO BE CONTINUED.",!0)
else v.A(0,"You died.",!0)
w.f.C+=v.cr()
z=1
break}q=C.a.gv(r)
p=q.dS(w.fr)
o=G.j1(p,w.fr)
z=3
return P.av(o.kH(),$async$d3)
case 3:r=o.f
if(r.gW(r)){n=o.a
m=o.b
n.f_("There are no actions available for actorId="+H.b(m)+".")
m="Actions not available for "+H.b(m)+" and "
l=o.c
k=l.a
j=J.o(k)
k="PlanConsequence<"+j.gB(k)+", "+j.k(k)+", "+J.h(l.b)+", "+H.b(l.d)+", "+l.y+", "
n.bO(m+(k+(l.x?"isSuccess":"")+">")+".")}n=Z.mY(r)
i=new Z.mX(new P.hw(r,[null,null]),n)
if(r.gW(r))$.$get$bJ().f_("Created with no recommendations.")
if(n.length===0){s.dW("No recommendation for "+H.b(p.gh()))
s.dW(new O.kV(w))
w.fr.fZ(q.gi());++w.fr.r
z=1
break}z=p.gH()===!0?4:6
break
case 4:u=n.length
if(u>1)for(h=0;r=n.length,h<r;r===u||(0,H.ar)(n),++h);s.bO("planner.generateTable for "+H.b(p.gh()))
o.f0().Z(0,new O.kW(w))
u=i.hl(q.gdC(),O.i9())
u.toString
g=P.P(u,!1,H.y(u,"A",0))
if(g.length!==0&&C.a.bs(g,new O.kX())){w.f.C+=v.cr()
C.a.sl(v.a,0)}v=new O.kY(new O.l_())
u=g.length-1
if(u-0<=32)H.h3(g,0,u,v)
else H.h2(g,0,u,v)
for(v=g.length,u=w.c,h=0;h<g.length;g.length===v||(0,H.ar)(g),++h){f=g[h]
u.$3$helpMessage$script(f.gV(),f.gJ(),new O.kZ(w,p,f))}z=1
break
z=5
break
case 6:s=p.gfW()
z=7
return P.av(w.cw(i.kG(s==null?O.i9():s),p,v),$async$d3)
case 7:case 5:v.hj(u)
case 1:return P.aG(x,y)}})
return P.aH($async$d3,y)},
cw:function(a,b,c){var z=0,y=P.az(),x,w=this,v,u,t
var $async$cw=P.aw(function(d,e){if(d===1)return P.aF(e,y)
while(true)switch(z){case 0:v=a.du(b,w.fx,w.fr)
u=P.P(v,!0,H.y(v,"A",0))
z=b.gH()===!0?3:5
break
case 3:z=6
return P.av(w.di(a,b,u),$async$cw)
case 6:z=4
break
case 5:t=S.np(new H.ap(u,new O.kP(),[H.m(u,0),null]),1)
if(t>=u.length){x=H.f(u,t)
z=1
break}w.fx=u[t]
case 4:C.a.av(c.a,w.fx.gf9().a)
w.fr=w.fx.gbH()
v=w.y
v.bO(new O.kQ(a,b))
v.ak(new O.kR(w,b))
case 1:return P.aG(x,y)}})
return P.aH($async$cw,y)},
di:function(a,b,c){var z=0,y=P.az(),x=this,w,v,u,t,s,r,q,p,o,n,m,l
var $async$di=P.aw(function(d,e){if(d===1)return P.aF(e,y)
while(true)switch(z){case 0:w=a.I(b,x.fr)
v=J.o(w)
z=v.w(w,1)?2:4
break
case 2:x.fx=C.a.gca(c)
z=3
break
case 4:z=v.w(w,0)?5:7
break
case 5:x.fx=C.a.gca(c)
z=6
break
case 7:u=C.a.gv(J.h(a.gL()).split("."))
v=v.l0(w)
t=a.ac(b,x.fr)
s=a.gO()&&b.kb(a.gL())
r="use "+H.b(u)
x.fF()
z=8
return P.av(x.e.$4$rerollEffectDescription$rerollable(v,t,r,s),$async$di)
case 8:q=e
s=new H.K(c,new O.kM(q),[H.m(c,0)])
x.fx=s.gca(s)
if(q.gl8()===!0){p=A.e7(x.fx.gbH())
p.X(b.gi(),new O.kN())
v=x.fx
t=v.gfK()
s=H.p([],[Y.ah])
r=new Y.a1(s,0,P.aA())
C.a.av(s,v.c.a)
s=v.d
o=v.e
n=v.f
m=v.r
l=v.x
v=v.y
r.b=p.r
x.fx=new B.bI(p,t,r,s,o,n,m,l,v)}case 6:case 3:return P.aG(null,y)}})
return P.aH($async$di,y)}},
kS:{"^":"a:3;",
$3:function(a,b,c){return c.A(0,"UNUSED because this is the first choice",!0)}},
kT:{"^":"a:3;",
$3:function(a,b,c){return H.i(new P.x("Room isn't to be revisited"))}},
kV:{"^":"a:2;a",
$0:function(){var z=this.a.fr.d
return"- how we got here: "+new H.ap(z,new O.kU(),[H.m(z,0),null]).cl(0," <- ")}},
kU:{"^":"a:0;",
$1:function(a){return a.gaP()}},
kW:{"^":"a:0;a",
$1:function(a){return this.a.y.bO(a)}},
l_:{"^":"a:41;",
$1:function(a){if(a instanceof Q.z)return H.b(a.b.gh())+" "+a.gV()
return"ZZZZZZ "+a.gV()}},
kX:{"^":"a:0;",
$1:function(a){return a.gV()!==""}},
kY:{"^":"a:6;a",
$2:function(a,b){var z=this.a
return J.bC(z.$1(a),z.$1(b))}},
kZ:{"^":"a:19;a,b,c",
$0:function(){var z=0,y=P.az(),x=this,w
var $async$$0=P.aw(function(a,b){if(a===1)return P.aF(b,y)
while(true)switch(z){case 0:w=x.a
z=2
return P.av(w.cw(x.c,x.b,w.fy),$async$$0)
case 2:return P.aG(null,y)}})
return P.aH($async$$0,y)}},
kP:{"^":"a:0;",
$1:function(a){return a.gkI()}},
kQ:{"^":"a:2;a,b",
$0:function(){return H.b(this.b.gh())+" selected "+this.a.gh()}},
kR:{"^":"a:2;a,b",
$0:function(){var z,y
z=this.a.fr.d
y=new H.ap(z,new O.kO(),[H.m(z,0),null]).cl(0," <- ")
return"- how "+H.b(this.b.gh())+" got here: "+y}},
kO:{"^":"a:0;",
$1:function(a){return a.gaP()}},
kM:{"^":"a:0;a",
$1:function(a){return a.geL()===this.a.geL()}},
kN:{"^":"a:0;",
$1:function(a){var z=a.gbh()
if(typeof z!=="number")return z.aq()
a.sbh(z-1)
return a}}}],["","",,Q,{"^":"",
ie:function(a,b,c){return P.aT(function(){var z=a,y=b,x=c
var w=0,v=1,u,t,s,r,q,p
return function $async$ie(d,e){if(d===1){u=e
w=v}while(true)switch(w){case 0:t=y.f
t=t.length!==0?C.a.gv(t):null
s=J.iZ(t.b4(y.a,y),new Q.ug(z))
t=J.ai(s.a),r=new H.bR(t,s.b,[H.m(s,0)])
case 2:if(!r.t()){w=3
break}q=t.gS()
p=x.$1(q)
if(p.gK()&&!z.eI(q,y)){w=2
break}w=4
return p
case 4:w=2
break
case 3:return P.aR()
case 1:return P.aS(u)}}})},
ig:function(a,b,c){return P.aT(function(){var z=a,y=b,x=c
var w=0,v=1,u,t
return function $async$ig(d,e){if(d===1){u=e
w=v}while(true)switch(w){case 0:t=y.f
t=y.dU((t.length!==0?C.a.gv(t):null).gbE()).gjR().a,t=new J.bj(t,t.length,0,null,[H.m(t,0)])
case 2:if(!t.t()){w=3
break}w=4
return x.$1(t.d)
case 4:w=2
break
case 3:return P.aR()
case 1:return P.aS(u)}}})},
ih:function(a,b,c){return P.aT(function(){var z=a,y=b,x=c
var w=0,v=1,u,t
return function $async$ih(d,e){if(d===1){u=e
w=v}while(true)switch(w){case 0:t=y.f
t=(t.length!==0?C.a.gv(t):null).gbk(),t=t.ga_(t)
case 2:if(!t.t()){w=3
break}w=4
return x.$1(t.d)
case 4:w=2
break
case 3:return P.aR()
case 1:return P.aS(u)}}})},
ug:{"^":"a:0;a",
$1:function(a){return!J.e(a,this.a)&&a.gaR()}},
af:{"^":"d;",
du:function(a,b,c){var z=this
return P.aT(function(){var y=a,x=b,w=c
var v=0,u=1,t,s,r,q,p
return function $async$du(d,e){if(d===1){t=e
v=u}while(true)switch(v){case 0:s=z.I(y,x.gbH())
r=J.al(s)
v=r.bo(s,0)?2:3
break
case 2:q=A.e7(w)
v=4
return B.fD(q,x,z,z.iq(q,y,w,z.gN(),!0),s,!1,!1,!0)
case 4:case 3:v=r.aV(s,1)?5:6
break
case 5:q=A.e7(w)
p=z.ip(q,y,w,z.gM(),!0)
if(typeof s!=="number")H.w(s)
v=7
return B.fD(q,x,z,p,1-s,!0,!1,!1)
case 7:case 6:return P.aR()
case 1:return P.aS(t)}}})},
fe:function(a,b,c,d,e,f){var z,y,x,w,v,u,t
a.x=this
z=a.a.bB(0,new Q.j_(b))
y=new O.eR(null,null,null,null,null,null,null,null,null,null,null,null,null)
x=this.gh()
y.ga5().c=x
x=b.gi()
y.ga5().r=x
y.ga5().f=C.S
y.ga5().cx=f
y.ga5().Q=e
x=this.gK()
y.ga5().z=x
x=this.ga0()
y.ga5().ch=x
if(!!this.$isz){x=y.ga5()
w=x.x
if(w==null){w=new L.aD(null,null,[P.t])
w.aX()
w.m(C.d)
x.x=w
x=w}else x=w
w=this.b.gi()
if(w==null)H.i(P.E("null element"))
x.geq().q(0,w)}if(!!this.$isc8){x=this.b.gfY()
y.ga5().d=x}v=new Y.a1(H.p([],[Y.ah]),0,P.aA())
x=a.f
u=(x.length!==0?C.a.gv(x):null).gi()
a.gB(a);(x.length!==0?C.a.gv(x):null).kD(a,v)
this.a=d.$3(z,a,v)
if(a.dl(u)!=null)a.fZ(u);++a.r
w=a.f1(u)
if(!(w==null))w.hh(a,v)
a.x=null
while(!0){w=x.length!==0?C.a.gv(x):null
if((w==null?w:w.dS(a))!=null){w=x.length!==0?C.a.gv(x):null
w=!J.e(w==null?w:w.dd(a),!0)}else w=!0
if(!w)break
if((x.length!==0?C.a.gv(x):null)==null)break
t=C.a.gv(x)
t.dE(a)
C.a.a3(x,t)}x=x.length!==0?C.a.gv(x):null
if(!(x==null))x.hi(a,v)
if(this.a==null)H.i(new P.x("No description given when executing "+this.k(0)+". You should return it from your world-modifying function."))
x=this.a
y.ga5().e=x
x=a.r
y.ga5().y=x
a.d.fN(y.p())
return v},
iq:function(a,b,c,d,e){return this.fe(a,b,c,d,!1,e)},
ip:function(a,b,c,d,e){return this.fe(a,b,c,d,e,!1)}},
j_:{"^":"a:0;a",
$1:function(a){return J.e(a.gi(),this.a.gi())}},
z:{"^":"af;bZ:b<",
gV:function(){var z=new Y.a1(H.p([],[Y.ah]),0,P.aA())
z.fL(0,this.ga6(),this.b)
return z.cr()},
ac:function(a,b){var z=new Y.a1(H.p([],[Y.ah]),0,P.aA())
z.jm(0,this.gaf(),this.b,a,!0)
return z.cr()},
k:function(a){var z=this.b
return"EnemyTargetAction<"+this.ga6()+"::enemy="+H.b(z.gi())+"/"+H.b(z.gh())+">"}},
c8:{"^":"af;",
gV:function(){return this.b.gV()},
k:function(a){return"ExitAction<"+this.b.gV()+">"}},
cb:{"^":"af;",
gV:function(){var z=new Y.a1(H.p([],[Y.ah]),0,P.aA())
z.fL(0,this.ga6(),this.b)
return z.cr()},
k:function(a){return"ItemAction<"+this.gV()+">"}},
nz:{"^":"d;a,b",
k:function(a){return this.b},
u:{"^":"x0<"}}}],["","",,O,{"^":"",cB:{"^":"d;",
k:function(a){return"ActionRecord<"+H.b(this.b)+", "+H.b(this.d)+">"}},md:{"^":"d;a,b",
k:function(a){return this.b}},pL:{"^":"cB;a,eu:b<,fX:c<,aP:d<,e,cZ:f<,fb:r<,U:x<,hE:y<,z,hF:Q<,hG:ch<",
a1:function(a){var z=new O.eR(null,null,null,null,null,null,null,null,null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
w:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof O.cB))return!1
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
k:function(a){return"ActionRecord {accomplices="+J.h(this.a)+",\nactionName="+J.h(this.b)+",\ndataString="+J.h(this.c)+",\ndescription="+H.b(J.h(this.d))+",\nknownTo="+J.h(this.e)+",\nprotagonist="+H.b(J.h(this.f))+",\nsufferers="+J.h(this.r)+",\ntime="+J.h(this.x)+",\nwasAggressive="+J.h(this.y)+",\nwasFailure="+J.h(this.z)+",\nwasProactive="+J.h(this.Q)+",\nwasSuccess="+J.h(this.ch)+",\n}"}},eR:{"^":"d;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",
geu:function(){return this.ga5().c},
gfX:function(){return this.ga5().d},
gaP:function(){return this.ga5().e},
gcZ:function(){return this.ga5().r},
gfb:function(){var z,y
z=this.ga5()
y=z.x
if(y==null){y=new L.aD(null,null,[P.t])
y.aX()
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
if(!(z==null)){y=new L.aD(null,null,[H.m(z,0)])
y.aX()
y.m(z)
z=y}this.b=z
z=this.a
this.c=z.b
this.d=z.c
this.e=z.d
this.f=z.e
this.r=z.f
z=z.r
if(!(z==null)){y=new L.aD(null,null,[H.m(z,0)])
y.aX()
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
x.aX()
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
r.aX()
r.m(C.d)
s.x=r
s=r}else s=r
s=s.p()
r=this.ga5().y
q=this.ga5().z
p=this.ga5().Q
o=this.ga5().ch
n=this.ga5().cx
z=new O.pL(y,x,w,v,u,t,s,r,q,p,o,n)
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
ii:function(a,b){return P.aT(function(){var z=a,y=b
var x=0,w=1,v,u
return function $async$ii(c,d){if(c===1){v=d
x=w}while(true)switch(x){case 0:x=2
return z
case 2:u=y.a
x=3
return P.bT(new H.K(u,new R.uj(z),[H.m(u,0)]))
case 3:return P.aR()
case 1:return P.aS(v)}}})},
b6:function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){var z=new R.eS(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
new R.td(a,b,k,m,n,f,e,i,l,o,j,h,d,g,p,c).$1(z)
return z.p()},
uj:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gh2()
y=this.a.gi()
return z==null?y==null:z===y}},
I:{"^":"mz;",
gfQ:function(){return!0},
gaZ:function(){var z=this.x
if(typeof z!=="number")return z.bo()
return z>0},
gb_:function(){return this.e instanceof K.ca},
gap:function(){return this.dy===C.h},
ga2:function(){return this.dy===C.f},
ga4:function(){return this.dy===C.k},
ka:function(a,b){var z,y,x
for(z=this.cx.a,y=new P.ae(z,z.r,null,null,[null]),y.c=z.e,x=0;y.t();){if(C.a.a7(y.d.geZ(),a))++x
if(x>=b)return!0}return!1},
h7:function(a){return this.ka(a,1)},
jV:function(){var z,y,x,w,v,u,t
for(z=this.cx.a,y=new P.ae(z,z.r,null,null,[null]),y.c=z.e,x=null,w=-9999999;y.t();){v=y.d
if(!(v instanceof L.aQ))continue
z=v.gbI()
u=v.gbz()
t=v.gaG()?1:0
if(2+z+u+t>w){z=v.gbI()
u=v.gbz()
t=v.gaG()?1:0
w=2+z+u+t
x=v}}return x},
kb:function(a){var z=this.fx
if(typeof z!=="number")return z.bS()
return z>=1},
eI:function(a,b){return this.h9(a,b)>0},
h9:function(a,b){var z,y
if(this.eK(b)){z=a.gb3()
y=this.fy.a
z=z.gi()
z=y==null?z==null:y===z}else z=!1
if(z)return 1000
if(this.iN(a,b,10))return 1
z=a.gb3()
y=this.fy.a
z=z.gi()
return(y==null?z!=null:y!==z)?1:0},
eK:function(a){var z,y
z=a.c4("Confuse",this,!0)
if(z==null)return!1
y=a.kY("Unconfuse",this,!0)
if(y==null)return!0
return y<z},
dc:function(a){var z,y,x,w,v,u,t,s,r,q,p
z=a.Y(this.y)
y=z.gag()
if(typeof y!=="number")return H.w(y)
x=2*y
if(!z.gaZ())x-=10
y=z.e
if(!(y instanceof K.ca))x+=4
y=J.b5(y.gab(),2)
if(typeof y!=="number")return H.w(y)
x+=y
for(y=z.cx.a,w=[null],v=new P.ae(y,y.r,null,null,w),v.c=y.e;v.t();){y=J.b5(v.d.gab(),10)
if(typeof y!=="number")return H.w(y)
x+=y}y=a.a
for(v=y.ga_(y),u=new H.bR(v,new R.jv(this),[H.m(y,0)]),t=0;u.t();){s=v.gS()
r=s.gaR()?2:0
q=s.gag()
if(typeof q!=="number")return H.w(q)
p=J.b5(s.e.gab(),2)
if(typeof p!=="number")return H.w(p)
t=t+r+2*q+p
for(r=s.cx.a,q=new P.ae(r,r.r,null,null,w),q.c=r.e;q.t();){r=J.b5(q.d.gab(),10)
if(typeof r!=="number")return H.w(r)
t+=r}}return new A.cC(x,t,y.bv(0,0,new R.jw(this,a)))},
iN:function(a,b,c){var z=b.kZ(a,this,!0)
if(z==null)return!1
return z<=c},
$isaN:1},
mz:{"^":"d+dv;"},
td:{"^":"a:0;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx",
$1:function(a){var z,y
a.gD().z=this.a
a.gD().dx=this.b
a.gD().dy=this.d
a.gD().fx=this.e
z=this.f
if(z==null)z=$.$get$dg()
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
z=new L.aD(null,null,[U.ab])
z.aX()
z.m(C.d)
a.gD().cy=z
z=this.db
if(z!=null){y=new L.br(null,null)
y.m(z)
z=y}else{z=$.$get$ey()
z.toString
y=new L.br(null,null)
y.m(z)
z=y}a.gD().go=z
a.gD().d=this.cx
a.gD().r=this.cy
a.gD().c=this.dx
return a}},
jv:{"^":"a:0;a",
$1:function(a){var z,y
z=this.a
if(J.e(a.gb3(),z.fy)){y=a.gi()
z=z.y
z=y==null?z!=null:y!==z}else z=!1
return z}},
jw:{"^":"a:28;a,b",
$2:function(a,b){var z,y
z=b.gaR()?1:0
y=b.gag()
if(typeof y!=="number")return H.w(y)
return J.an(a,(z+y)*this.a.h9(b,this.b))}},
dV:{"^":"d;a,b",
k:function(a){return this.b}},
pM:{"^":"I;a,fW:b<,bE:c<,an:d<,T:e<,h2:f<,f2:r<,ag:x<,i:y<,z,ck:Q<,H:ch<,ay:cx<,he:cy<,h:db<,aG:dx<,ah:dy<,a8:fr<,bh:fx<,b3:fy<",
a1:function(a){var z=new R.eS(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
w:function(a,b){var z,y
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
eS:{"^":"d;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go",
gfW:function(){return this.gD().c},
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
gf2:function(){return this.gD().x},
gag:function(){return this.gD().y},
sag:function(a){this.gD().y=a
return a},
gi:function(){return this.gD().z},
gck:function(){return this.gD().ch},
gH:function(){return this.gD().cx},
gay:function(){var z,y
z=this.gD()
y=z.cy
if(y==null){y=new L.aD(null,null,[U.ab])
y.aX()
y.m(C.d)
z.cy=y
z=y}else z=y
return z},
ghe:function(){return this.gD().db},
gh:function(){return this.gD().dx},
sh:function(a){this.gD().dx=a
return a},
gaG:function(){return this.gD().dy},
gah:function(){return this.gD().fr},
sah:function(a){this.gD().fr=a
return a},
ga8:function(){return this.gD().fx},
gbh:function(){return this.gD().fy},
sbh:function(a){this.gD().fy=a
return a},
gb3:function(){var z,y
z=this.gD()
y=z.go
if(y==null){y=new L.br(null,null)
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
if(!(z==null)){y=new L.aD(null,null,[H.m(z,0)])
y.aX()
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
if(!(z==null)){y=new L.br(null,null)
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
if(l==null){l=new L.aD(null,null,[U.ab])
l.aX()
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
if(e==null){e=new L.br(null,null)
f.go=e
f=e}else f=e
z=new R.pM(y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f.p())
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
return z}}}],["","",,A,{"^":"",cC:{"^":"d;c9:a<,d1:b<,bZ:c<",
aq:function(a,b){return new A.ao(this.a-b.gc9(),this.b-b.gd1(),J.bB(this.c,b.gbZ()))},
k:function(a){return"ActorScore<self="+C.j.bg(this.a,2)+",team="+C.j.bg(this.b,2)+",enemy="+J.c2(this.c,2)+">"}},ao:{"^":"d;c9:a<,d1:b<,bZ:c<",
gkr:function(){return this.a===-1/0&&this.b===-1/0&&J.e(this.c,-1/0)},
c8:function(a,b){if(typeof b!=="number")return H.w(b)
return new A.ao(this.a*b,this.b*b,J.c1(this.c,b))},
ai:function(a,b){return new A.ao(this.a+b.gc9(),this.b+b.gd1(),J.an(this.c,b.gbZ()))},
d6:function(a,b){if(typeof b!=="number")return H.w(b)
return new A.ao(this.a/b,this.b/b,J.b5(this.c,b))},
k:function(a){return"ActorScoreChange<self="+C.j.bg(this.a,2)+",team="+C.j.bg(this.b,2)+",enemy="+J.c2(this.c,2)+">"},
u:{
ju:function(a){var z,y,x,w,v,u,t,s,r
for(z=a.length,y=0,x=0,w=0,v=0,u=0;t=a.length,u<t;t===z||(0,H.ar)(a),++u){s=a[u];++y
x+=s.a
w+=s.b
r=s.c
if(typeof r!=="number")return H.w(r)
v+=r}if(y===0)throw H.c(P.E("Cannot average empty iterable"))
return new A.ao(x/y,w/y,v/y)}}}}],["","",,U,{"^":"",
wr:function(a){switch(a){case C.y:return"fist"
case C.z:return"shield"
case C.r:return"spear"
case C.A:return"sword"}throw H.c(P.E(a))},
ab:{"^":"mA;eZ:a<",
gaP:function(){return U.wr(C.a.geG(this.a))},
gi:function(){return H.aC(this)},
gck:function(){return!0},
gaZ:function(){return!1},
gH:function(){return!1},
gaG:function(){return!1},
ga8:function(){return C.n},
gb3:function(){return $.$get$aY()},
$isaN:1},
mA:{"^":"d+dv;"},
cR:{"^":"d;a,b",
k:function(a){return this.b}}}],["","",,K,{"^":"",ca:{"^":"aQ;h:b<,a"}}],["","",,E,{"^":"",bq:{"^":"ab;h:b<,a",
gab:function(){return 1},
$isaN:1}}],["","",,Z,{"^":"",aE:{"^":"aQ;h:b<,bI:c<,bz:d<,aG:e<,cg:f<,eB:r<,a"}}],["","",,G,{"^":"",b2:{"^":"aQ;h:b<,bI:c<,bz:d<,aG:e<,cg:f<,eB:r<,a",u:{
p8:function(a,b,c,d,e,f){return new G.b2(c,e,f,d,!0,!1,P.aB(C.o,null))}}}}],["","",,L,{"^":"",aQ:{"^":"ab;",
geB:function(){return!1},
gcg:function(){return!1},
gko:function(){return!1},
gbf:function(){return this.gbI()>0},
geM:function(){return this.gbz()>0},
gl:function(a){return 2},
gbI:function(){return 0},
gbz:function(){return 0},
gab:function(){var z,y,x
z=this.gbI()
y=this.gbz()
x=this.gaG()?1:0
return 2+z+y+x},
$isaN:1}}],["","",,G,{"^":"",mp:{"^":"d;",
fF:function(){var z,y
z=this.f
y=z.C
if(y.length!==0){this.b.$1(y.charCodeAt(0)==0?y:y)
z.C=""}},
lk:[function(a){this.f.C+=a},"$1","gjN",2,0,22],
bx:function(){var z=0,y=P.az(),x,w=this,v,u
var $async$bx=P.aw(function(a,b){if(a===1)return P.aF(b,y)
while(true)switch(z){case 0:if(w.x==null)throw H.c(new P.x("Cannot run a LoopedEvent before onFinishedGoto is defined."))
if(w.r){w.d.sl(0,0)
w.a.$1(w.x)
z=1
break}v=w.d
u=w.f
case 3:if(!!0){z=4
break}if(!(!w.r&&v.gl(v)===0&&u.C.length===0)){z=4
break}z=5
return P.av(w.d3(),$async$bx)
case 5:z=3
break
case 4:w.fF()
case 1:return P.aG(x,y)}})
return P.aH($async$bx,y)}}}],["","",,B,{"^":"",f2:{"^":"d;da:a<,dz:b<,cW:c<",
k:function(a){return"ConsequenceStats<order="+this.c+", cumProb="+J.c2(this.b,3)+", score="+this.a.k(0)+">"}},bI:{"^":"d;bH:a<,fK:b<,f9:c<,kI:d<,dz:e<,f,r,eL:x<,cW:y<",
gB:function(a){return X.bA(H.p([this.a,this.e,this.b,this.d,this.y,this.f,this.r,this.x],[P.d]))},
w:function(a,b){var z
if(b==null)return!1
z=J.o(b)
return!!z.$isbI&&this.gB(this)===z.gB(b)},
k:function(a){var z,y
z=this.a
y=J.o(z)
z="PlanConsequence<"+y.gB(z)+", "+y.k(z)+", "+J.h(this.b)+", "+H.b(this.d)+", "+this.y+", "
return z+(this.x?"isSuccess":"")+">"},
u:{
fD:function(a,b,c,d,e,f,g,h){var z,y
z=b==null
y=z?e:J.c1(e,b.gdz())
z=z?0:b.gcW()+1
d.b=a.r
return new B.bI(a,c,d,e,y,g,f,h,z)}}}}],["","",,G,{"^":"",j0:{"^":"d;a,b,c,d,e,f",
jz:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=this.a
z.ak("...")
z.ak("combining scores")
y=H.p([],[A.ao])
x=new G.jn()
for(w=J.ai(a),v=b.a,u=b.b,t=b.c,s=null;w.t();){r=w.gS()
z.ak(new G.jl(r))
if(J.a9(r.gdz(),0.15))if(s==null){z.ak("    - first _bestCase")
s=r}else if(J.a9(x.$1(r.gda()),x.$1(s.gda()))){z.ak("    - new _bestCase")
s=r}q=r.gda()
p=J.bB(q.c,t)
o=r.b
if(typeof o!=="number")return H.w(o)
n=new A.ao((q.a-v)*o,(q.b-u)*o,J.c1(p,o))
z.ak(new G.jm(n))
y.push(n)}m=A.ju(y)
w=s==null
if(w)l=C.G
else{q=s.gda()
l=new A.ao(q.a-v,q.b-u,J.bB(q.c,t))}w=w?s:s.gcW()
if(w==null)w=1
if(typeof w!=="number")return H.w(w)
v=l.a/w
u=l.b/w
w=J.b5(l.c,w)
t=m.a
q=m.b
p=m.c
z.ak("- uplifts average = "+("ActorScoreChange<self="+C.j.bg(t,2)+",team="+C.j.bg(q,2)+",enemy="+J.c2(p,2)+">"))
z.ak("- best = "+("ActorScoreChange<self="+C.u.bg(v,2)+",team="+C.u.bg(u,2)+",enemy="+J.c2(w,2)+">"))
t=v+t
q=u+q
p=w+p
z.ak("- result = "+("ActorScoreChange<self="+C.u.bg(t,2)+",team="+C.u.bg(q,2)+",enemy="+C.j.bg(p,2)+">"))
return new A.ao(t,q,p)},
f0:function(){var z=this
return P.aT(function(){var y=0,x=1,w,v,u,t,s
return function $async$f0(a,b){if(a===1){w=b
y=x}while(true)switch(y){case 0:v=z.f,u=v.gcm(),u=u.ga_(u),t=1
case 2:if(!u.t()){y=3
break}s=u.gS()
y=4
return""+t+") "+s.gV()+"\t"+H.b(v.j(0,s))
case 4:++t
y=2
break
case 3:return P.aR()
case 1:return P.aS(w)}}})},
dF:function(a,b,c){var z=0,y=P.az(),x=this,w,v,u,t,s,r,q,p,o,n,m
var $async$dF=P.aw(function(d,e){if(d===1)return P.aF(e,y)
while(true)switch(z){case 0:w=x.f
w.be(0)
v=x.c
u=v.a
t=u.a.bB(0,new G.jo(x))
s=t.dc(u)
r=x.a
r.bO("Planning for "+H.b(t.db)+", initialScore="+s.k(0))
q=new P.bd(x.eb(t,u).a(),null,null,null)
case 2:if(!q.t()){z=3
break}p=q.c
o=p==null?q.b:p.gS()
r.bl(new G.jp(t,o))
if(o.G(t,u)!==!0){r.bl(new G.jq(o))
z=2
break}z=4
return P.av(x.cC(v,o,b,a,c).ct(0),$async$dF)
case 4:n=e
if(J.eO(n)===!0){r.bl(new G.jr(o))
w.n(0,o,C.H)
z=2
break}r.bl(new G.js(s,o,n))
m=x.jz(n,s,b)
w.n(0,o,m)
r.bl(new G.jt(o,m))
z=2
break
case 3:x.e=!0
return P.aG(null,y)}})
return P.aH($async$dF,y)},
kH:function(){return this.dF(50,10,null)},
eb:function(a,b){return P.aT(function(){var z=a,y=b
var x=0,w=1,v,u,t,s,r,q,p,o
return function $async$eb(c,d){if(c===1){v=d
x=w}while(true)switch(x){case 0:u=y.f
x=2
return P.bT((u.length!==0?C.a.gv(u):null).gbN())
case 2:u=(u.length!==0?C.a.gv(u):null).gaD()
t=u.length
s={func:1,ret:Q.cb,args:[U.ab]}
r={func:1,ret:Q.c8,args:[Q.u]}
q={func:1,ret:Q.z,args:[R.I]}
p=0
case 3:if(!(p<u.length)){x=5
break}o=u[p]
x=H.ax(o,q)?6:8
break
case 6:x=9
return P.bT(Q.ie(z,y,o))
case 9:x=7
break
case 8:x=H.ax(o,r)?10:12
break
case 10:x=13
return P.bT(Q.ig(z,y,o))
case 13:x=11
break
case 12:x=H.ax(o,s)?14:16
break
case 14:x=17
return P.bT(Q.ih(z,y,o))
case 17:x=15
break
case 16:throw H.c(new P.x(o.k(0)+" is not one of the supported ones"))
case 15:case 11:case 7:case 4:u.length===t||(0,H.ar)(u),++p
x=3
break
case 5:return P.aR()
case 1:return P.aS(v)}}})},
cC:function(a5,a6,a7,a8,a9){var $async$cC=P.aw(function(b0,b1){switch(b0){case 2:u=x
z=u.pop()
break
case 1:v=b1
z=w}while(true)switch(z){case 0:s={}
r=a5.a
q=r.a.bB(0,new G.j4(t))
p=t.a
p.bl("=====")
p.bl(new G.j5(a6,q))
p.bl(new G.j6(a6))
if(a6.G(q,r)!==!0){p.bl("- firstAction not applicable")
z=1
break}o=q.dc(r)
p.bl(new G.jc(a5,o))
p.bl(new G.jd(a5))
n=P.bb(null,B.bI)
m=P.a4(null,null,null,A.ad)
l=J.o(r)
k=l.gB(r)
for(j=new P.bd(a6.du(q,a5,r).a(),null,null,null);j.t();){i=j.c
h=i==null?j.b:i.gS()
if(l.gB(r)!==k)throw H.c(new P.x("Action "+a6.k(0)+" modified world state when producing "+H.b(h)+"."))
n.aB(h)}s.a=0
r=t.b
case 3:if(!!n.gW(n)){z=4
break}++s.a
g=n.dH()
p.ak("----")
p.ak(new G.je(g))
p.ak(new G.jf(g))
if(g.gcW()>a7||s.a>a8){p.ak(new G.jg(s,a7,g))
p.ak(new G.jh(g))
z=4
break}z=g.gbH().f.length===0?5:6
break
case 5:p.ak("- leaf node: world.situations is empty (end of book)")
l=g.a
q=l.a.aQ(0,new G.ji(t),new G.jj())
if(q==null){p.ak("- this actor ("+H.b(r)+") has been removed")
z=3
break}f=new B.f2(q.dc(l),g.e,g.y)
p.ak(new G.j7(f))
z=7
x=[1]
return P.da(P.hF(f),$async$cC,y)
case 7:z=3
break
case 6:l=g.a
j=l.f
e=(j.length!==0?C.a.gv(j):null).dS(l)
j=l.a
i=new H.K(j,new G.j8(t),[H.m(j,0)])
d=i.gl(i)
if(d>1)throw H.c(new P.x("World has several duplicates of mainActor: "+J.h(l)))
else if(d===0){p.ha("mainActor "+H.b(r)+" dies and is removed in world - will use defaultScoreWhenDead")
q=null}else q=j.bB(0,new G.j9(t))
c=J.e(e,q)
p.ak("- actor: "+H.b(e.gh())+" (isMain=="+c+")")
j=q==null
p.ak("- mainActor: "+H.b(j?q:q.gh()))
b=j?q:q.dc(l)
if(b==null)b=C.I
f=new B.f2(b,g.e,g.y)
p.ak(new G.ja(o,f))
p.ak(new G.jb(g))
z=8
x=[1]
return P.da(P.hF(f),$async$cC,y)
case 8:p.ak("- generating all actions for "+H.b(e.gh()))
j=n.c
i=n.b
a=n.a
for(a0=new P.bd(t.eb(e,l).a(),null,null,null);a0.t();){a1=a0.c
a2=a1==null?a0.b:a1.gS()
if(a2.G(e,l)!==!0)continue
for(a1=new P.bd(a2.du(e,g,l).a(),null,null,null);a1.t();){a3=a1.c
a4=a3==null?a1.b:a3.gS();++t.d
if(J.c0(a4.gdz(),0.05))continue
if(m.a7(0,a4.gbH()))continue
n.aB(a4)}}p.ak("- added "+(((n.c-n.b&n.a.length-1)>>>0)-((j-i&a.length-1)>>>0))+" new PlanConsequences")
m.q(0,l)
z=3
break
case 4:case 1:return P.da(null,0,y)
case 2:return P.da(v,1,y)}})
var z=0,y=P.qd($async$cC),x,w=2,v,u=[],t=this,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4
return P.rz(y)},
i6:function(a,b){var z
if(a==null){z=b.d
throw H.c(P.E("Called ActorPlanner with actor == null. That may mean that a Situation returns getCurrentActor as null. Some action that you added should make sure it removes the Situation (maybe "+H.b(z.gv(z).gaP())+"?). World: "+J.h(b)+". Situation: "+H.b(b.gjD())+". Action Records: "+z.aF(0,new G.jk()).cl(0,"<-")))}},
u:{
j1:function(a,b){var z,y,x
z=N.bm("ActorPlanner")
y=a==null?a:a.gi()
x=new Y.a1(H.p([],[Y.ah]),0,P.aA())
x.b=b.r
z=new G.j0(z,y,new B.bI(b,null,x,1,1,!0,!1,!1,0),0,!1,new H.R(0,null,null,null,null,null,0,[null,null]))
z.i6(a,b)
return z}}},jk:{"^":"a:0;",
$1:function(a){return a.gaP()}},jn:{"^":"a:39;",
$1:function(a){var z=a.c
if(typeof z!=="number")return H.w(z)
return a.b-z}},jl:{"^":"a:2;a",
$0:function(){return"  - consequence: "+H.b(this.a)}},jm:{"^":"a:2;a",
$0:function(){return"    - uplift = "+this.a.k(0)}},jo:{"^":"a:0;a",
$1:function(a){return J.e(a.gi(),this.a.b)}},jp:{"^":"a:2;a,b",
$0:function(){return"Evaluating action '"+this.b.gV()+"' for "+H.b(this.a.db)}},jq:{"^":"a:2;a",
$0:function(){return"- action '"+this.a.gV()+"' isn't applicable"}},jr:{"^":"a:2;a",
$0:function(){return"- action '"+this.a.gV()+"' is possible but we couldn't get to any outcomes while planning. Scoring with negative infinity."}},js:{"^":"a:2;a,b,c",
$0:function(){return"- action '"+this.b.gV()+"' leads to "+H.b(J.aL(this.c))+" different ConsequenceStats, initialScore="+this.a.k(0)}},jt:{"^":"a:2;a,b",
$0:function(){return"- action '"+this.a.gV()+"' was scored "+this.b.k(0)}},j4:{"^":"a:0;a",
$1:function(a){return J.e(a.gi(),this.a.b)}},j5:{"^":"a:2;a,b",
$0:function(){return"_getConsequenceStats for firstAction '"+this.a.gV()+"' of "+H.b(this.b.gh())}},j6:{"^":"a:2;a",
$0:function(){return"- firstAction == "+H.b(this.a)}},jc:{"^":"a:2;a,b",
$0:function(){var z=this.a
return"- current: initialScore="+this.b.k(0)+", cumProb="+H.b(z.e)+" (prob="+H.b(z.d)+", ord="+z.y+")"}},jd:{"^":"a:2;a",
$0:function(){var z=this.a
return"- initial action: "+C.b.c8(" ",z.y)+"- "+J.h(z.b)}},je:{"^":"a:2;a",
$0:function(){return"evaluating a PlanConsequence of '"+this.a.gfK().gV()+"'"}},jf:{"^":"a:2;a",
$0:function(){var z=this.a.gbH().f
return"- situation: "+H.b(J.iS(z.length!==0?C.a.gv(z):null))}},jg:{"^":"a:2;a,b,c",
$0:function(){return"- order ("+this.c.gcW()+") higher than maximum ("+this.b+"), or consequences ("+this.a.a+") higher than maximum"}},jh:{"^":"a:2;a",
$0:function(){var z=this.a.gbH().d
return"- how we got here: "+new H.ap(z,new G.j3(),[H.m(z,0),null]).cl(0," <- ")}},j3:{"^":"a:0;",
$1:function(a){return a.gaP()}},ji:{"^":"a:0;a",
$1:function(a){return J.e(a.gi(),this.a.b)}},jj:{"^":"a:2;",
$0:function(){return}},j7:{"^":"a:2;a",
$0:function(){return"- "+this.a.k(0)}},j8:{"^":"a:0;a",
$1:function(a){return J.e(a.gi(),this.a.b)}},j9:{"^":"a:0;a",
$1:function(a){return J.e(a.gi(),this.a.b)}},ja:{"^":"a:2;a,b",
$0:function(){return"- mainActor's score == "+this.b.k(0)+" (initial="+this.a.k(0)+")"}},jb:{"^":"a:2;a",
$0:function(){var z=this.a.gbH().d
return"- how we got here: "+new H.ap(z,new G.j2(),[H.m(z,0),null]).cl(0," <- ")}},j2:{"^":"a:0;",
$1:function(a){return a.gaP()}}}],["","",,Z,{"^":"",mX:{"^":"d;a,b",
gbN:function(){return this.b},
gW:function(a){return this.b.length===0},
hl:function(a,b){var z=this
return P.aT(function(){var y=a,x=b
var w=0,v=2,u,t,s,r,q,p,o,n,m,l
return function $async$hl(c,d){if(c===1){u=d
w=v}while(true)switch(w){case 0:t=z.b
w=t.length<=y?3:4
break
case 3:w=5
return P.bT(t)
case 5:w=1
break
case 4:s=z.iH(new Z.n_())
r=z.ea(new Z.n0(),[s])
q=z.ea(new Z.n1(),[s,r])
w=s!=null?6:8
break
case 6:$.$get$bJ().bO("best self preserving: "+H.b(s))
w=9
return s
case 9:p=1
w=7
break
case 8:p=0
case 7:w=r!=null&&p<y?10:11
break
case 10:$.$get$bJ().bO("best enemy damaging: "+H.b(r))
w=12
return r
case 12:++p
case 11:w=q!=null&&p<y?13:14
break
case 13:$.$get$bJ().bO("best team preserving: "+H.b(q))
w=15
return q
case 15:++p
case 14:if(p===y){w=1
break}C.a.cb(t,new Z.n2(z,x))
o=t.length,n=0
case 16:if(!(n<t.length)){w=18
break}m=t[n]
l=J.o(m)
if(l.w(m,s)){w=17
break}if(l.w(m,r)){w=17
break}if(l.w(m,q)){w=17
break}w=19
return m
case 19:++p
if(p===y){w=18
break}case 17:t.length===o||(0,H.ar)(t),++n
w=16
break
case 18:case 1:return P.aR()
case 2:return P.aS(u)}}})},
kG:function(a){var z,y,x,w,v,u,t,s,r,q,p
z={}
y=this.b
if(y.length===1)return C.a.gca(y)
C.a.cb(y,new Z.n3(this,a))
x=this.a.a
w=x.gcu().bv(0,1/0,new Z.n4(a))
v=x.gcu().bv(0,-1/0,new Z.n5(a))
x=J.al(v)
u=J.al(w)
t=u.aq(w,J.c1(x.aq(v,w),0.1))
z.a=t
if(u.w(w,v)){t=J.bB(t,1)
z.a=t
u=t}else u=t
s=x.aq(v,u)
r=P.mn(y.length,new Z.n6(z,this,a,s),!1,P.L)
q=new H.ap(r,new Z.n7(C.a.bv(r,0,Z.uI())),[H.m(r,0),null]).bF(0,!1)
z=C.a.bv(q,0,Z.uJ())
if(typeof z!=="number")return H.w(z)
u=q.length
x=u-1
if(x<0)return H.f(q,x)
z=J.an(q[x],1000-z)
if(x>=q.length)return H.f(q,x)
q[x]=z
p=S.nq(q,1000)
if(p>=y.length)return H.f(y,p)
return y[p]},
ea:function(a,b){var z,y,x,w,v,u,t
for(z=this.b,y=z.length,x=this.a.a,w=null,v=null,u=0;u<z.length;z.length===y||(0,H.ar)(z),++u){t=z[u]
if(C.a.a7(b,t))continue
if(w==null||J.a9(a.$1(x.j(0,t)),v)){v=a.$1(x.j(0,t))
w=t
continue}}return w},
iH:function(a){return this.ea(a,C.d)},
u:{
mY:function(a){var z,y,x
z=a.gcm()
y=H.y(z,"A",0)
x=P.P(new H.K(z,new Z.mZ(a),[y]),!1,y)
if(x.length===0)$.$get$bJ().f_("After removing actions scored by undefined, there are no recommendations.")
return x},
wY:[function(a,b){return J.an(a,b)},"$2","uI",4,0,42],
wZ:[function(a,b){return J.an(a,b)},"$2","uJ",4,0,43]}},n_:{"^":"a:0;",
$1:function(a){return a.gc9()}},n0:{"^":"a:0;",
$1:function(a){return J.iO(a.gbZ())}},n1:{"^":"a:0;",
$1:function(a){return a.gd1()}},n2:{"^":"a:6;a,b",
$2:function(a,b){var z,y
z=this.b
y=this.a.a.a
return-J.bC(z.$1(y.j(0,a)),z.$1(y.j(0,b)))}},n3:{"^":"a:6;a,b",
$2:function(a,b){var z,y
z=this.b
y=this.a.a.a
return-J.bC(z.$1(y.j(0,a)),z.$1(y.j(0,b)))}},n4:{"^":"a:6;a",
$2:function(a,b){var z=this.a.$1(b)
return Math.min(H.dd(a),H.dd(z))}},n5:{"^":"a:6;a",
$2:function(a,b){var z=this.a.$1(b)
return Math.max(H.dd(a),H.dd(z))}},n6:{"^":"a:9;a,b,c,d",
$1:function(a){var z,y
z=this.b
y=z.b
if(a>=y.length)return H.f(y,a)
return J.b5(J.bB(this.c.$1(z.a.a.j(0,y[a])),this.a.a),this.d)}},n7:{"^":"a:0;a",
$1:function(a){return J.iV(J.c1(J.b5(a,this.a),1000))}},mZ:{"^":"a:0;a",
$1:function(a){return!this.a.j(0,a).gkr()}}}],["","",,K,{"^":"",rJ:{"^":"a:3;",
$3:function(a,b,c){}},cm:{"^":"d;a,h:b<,c,d,jT:e<,f,c7:r<",
gjR:function(){return this.a},
gB:function(a){return C.b.gB(this.b)},
w:function(a,b){if(b==null)return!1
return b instanceof K.cm&&b.b===this.b},
k:function(a){return"Room<"+this.b+">"},
jI:function(a,b,c){return this.c.$3(a,b,c)},
hZ:function(a,b,c){return this.d.$3(a,b,c)},
jU:function(a,b,c){return this.e.$3(a,b,c)},
u:{
a_:function(a,b,c,d,e,f,g){var z=new S.O(null,null,[Q.u])
z.aj()
z.m(f)
return new K.cm(z.p(),a,b,c,d,e,g)}}}}],["","",,Q,{"^":"",u:{"^":"d;fY:a<,V:b<,aP:c<,kl:d<"}}],["","",,S,{"^":"",ac:{"^":"d;",
gaD:function(){return C.d},
gbN:function(){return C.d},
gdC:function(){return 3},
dS:function(a){return this.aU(this.gU(),a)},
hh:function(a,b){},
hi:function(a,b){},
kD:function(a,b){},
dE:function(a){},
dd:function(a){return!0}}}],["","",,S,{"^":"",
fM:function(a){var z=$.$get$bL().ao(3)
if(z<0||z>=3)return H.f(a,z)
return a[z]},
np:function(a,b){var z,y,x,w,v
z=$.$get$bL().kC()*b
for(y=new H.dJ(a,a.gl(a),0,null,[H.y(a,"b0",0)]),x=0,w=0;y.t();){v=y.d
if(typeof v!=="number")return H.w(v)
x+=v
if(x>=z)return w;++w}throw H.c(P.E("The weights do not add up to total="+b))},
nq:function(a,b){var z,y,x,w,v,u,t
z=$.$get$bL().ao(b)
for(y=a.length,x=0,w=0,v=0;u=a.length,v<u;u===y||(0,H.ar)(a),++v){t=a[v]
if(typeof t!=="number")return H.w(t)
x+=t
if(x>=z)return w;++w}throw H.c(P.E("The weights do not add up to total="+b))},
bM:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=J.J(a)
y=z.aY(a,"{")
if(y!==-1){x=z.gl(a)
if(typeof x!=="number")return x.aq()
x=y<x-1}else x=!1
if(x){w=H.p([],[P.t])
w.push(y)
u=y+1
t=null
s=1
while(!0){x=z.gl(a)
if(typeof x!=="number")return H.w(x)
if(!(u<x)){v=null
break}r=z.j(a,u)
x=J.o(r)
if(x.w(r,"{"))++s
else if(x.w(r,"|")&&s===1)w.push(u)
else if(x.w(r,"}")){--s
if(s===0){w.push(u)
v=u
t=v
break}}q=u+1
t=u
u=q}p=w.length-1
if(p>1){o=$.$get$bL().ao(p)
z=z.aH(a,0,y)
x=w.length
if(o<0||o>=x)return H.f(w,o)
n=w[o]
m=o+1
if(m>=x)return H.f(w,m)
m=z+H.b(S.bM(C.b.aH(a,n+1,w[m])))
if(typeof v!=="number")return v.ai()
n=a.length
m+=C.b.aH(a,v+1,n)
z=m.charCodeAt(0)==0?m:m
if(t===n-1)return z
else return S.bM(z)}else{x=z.gl(a)
if(typeof x!=="number")return x.aq()
if(t===x-1)return a
else{if(typeof t!=="number")return t.ai()
x=t+1
return z.aH(a,0,x)+H.b(S.bM(C.b.bJ(a,x)))}}}else return a},
a5:function(a,b,c,d){var z=c!=null?3:2
switch($.$get$bL().ao(z)){case 0:a.$0()
break
case 1:b.$0()
break
case 2:c.$0()
break
case 4:d.$0()
break}}}],["","",,Y,{"^":"",ah:{"^":"d;b6:a<,aW:b<,aS:c<,hk:d<,e,dv:f@,hn:r<,hf:x<,fa:y<,jQ:z<,i1:Q<,d5:ch<,jg:cx<,kq:cy<,U:db<",
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
default:throw H.c(P.E("Invalid key "+H.b(b)+"."))}},
k:function(a){var z=this.a
z="Report<"+C.b.aH(z,0,Math.min(z.length,20))+"...,thread="+H.b(this.cx)
return z+(this.cy?"(sup)":"")+">"}},a1:{"^":"d;a,U:b<,c",
geH:function(){return C.a.bs(this.a,new Y.oH())},
aO:function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){var z,y
if(b==null||J.e(b,""))return
z=(J.bh(b).eE(b,".")||C.b.eE(b,"!")||C.b.eE(b,"?"))&&C.b.df(b,P.bp("[A-Z]",!0,!1))?!0:p
y=this.b
this.a.push(new Y.ah(b,m,h,j,i,d,k,g,!1,e,l,z,c,f,y))},
q:function(a,b){return this.aO(a,b,null,!1,!1,!1,!1,null,null,null,!1,!1,null,!1,null,!1)},
A:function(a,b,c){return this.aO(a,b,null,!1,!1,!1,!1,null,null,null,!1,!1,null,!1,null,c)},
ji:function(a,b,c,d,e,f,g,h,i,j,k,l,m,n){return this.aO(a,b,c,d,e,f,g,h,i,j,k,!1,l,m,null,n)},
fL:function(a,b,c){return this.aO(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,null,!1,null,!1)},
jo:function(a,b,c,d,e,f){return this.aO(a,b,null,!1,!1,!1,!1,c,null,d,!1,!1,e,!1,null,f)},
ex:function(a,b,c,d,e){return this.aO(a,b,null,!1,!1,!1,c,null,null,null,!1,d,e,!1,null,!1)},
cf:function(a,b,c,d){return this.aO(a,b,null,!1,!1,!1,!1,null,null,c,!1,!1,d,!1,null,!1)},
ew:function(a,b,c,d){return this.aO(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,d,!1,null,!1)},
cf:function(a,b,c,d){return this.aO(a,b,null,!1,!1,!1,!1,null,null,c,!1,!1,d,!1,null,!1)},
fM:function(a,b,c,d,e,f){return this.aO(a,b,c,!1,!1,!1,!1,d,null,null,e,!1,f,!1,null,!1)},
jn:function(a,b,c,d,e,f){return this.aO(a,b,c,!1,!1,d,!1,e,null,null,!1,!1,f,!1,null,!1)},
jk:function(a,b,c){return this.aO(a,b,c,!1,!1,!1,!1,null,null,null,!1,!1,null,!1,null,!1)},
jl:function(a,b,c,d){return this.aO(a,b,c,!1,!1,!1,!1,d,null,null,!1,!1,null,!1,null,!1)},
jm:function(a,b,c,d,e){return this.aO(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,d,!1,null,e)},
js:function(a,b,c,d,e,f,g,h){var z,y,x,w,v,u,t
if(b.length===0)return
z=H.b(new Y.oF().$1(a))+" "
for(y=b.length,x=e-1,w=0,v=0,u=0;u<b.length;b.length===y||(0,H.ar)(b),++u){t=b[u]
if(w>0){if(w===1&&J.e(t,C.a.gv(b)))z=z+" "+d
else z=w===x?z+(", "+d):z+","
z+=" "}z+=H.b(this.bW(t.gh(),t.gh(),t,null,this.b));++w
if(w>x||J.e(t,C.a.gv(b))){z+="."
this.jo(0,z.charCodeAt(0)==0?z:z,f,g,h,!0);++v
z=H.n(a,"<also>","also")+" "
w=0}}},
jr:function(a,b,c,d){return this.js(a,b,c,"and",3,null,null,d)},
fO:function(){return this.A(0,"\n\n",!0)},
bW:function(a,b,c,d,e){var z,y,x,w
if(d!=null){z=J.J(a)
z=z.aY(a,"<owner's> "+H.b(b))!==-1||z.aY(a,"<ownerPronoun's> "+H.b(b))!==-1||z.aY(a,"<object-owner's> "+H.b(b))!==-1||z.aY(a,"<object-ownerPronoun's> "+H.b(b))!==-1}else z=!1
if(z)return a
z=J.J(a)
if(z.aY(a,"<subject's> "+H.b(b))!==-1||z.aY(a,"<subjectPronoun's> "+H.b(b))!==-1)return a
if(c.gaG()!==!0){y=this.c
x=y.j(0,c.gi())
if((x==null?-1:x)<e)w=z.d_(a,b,"the "+H.b(b))
else{w=J.eQ(c.gh(),P.bp("[aeiouy]",!1,!1))?z.d_(a,b,"an "+H.b(b)):z.d_(a,b,"a "+H.b(b))
y.n(0,c.gi(),e)}}else w=null
return w==null?a:w},
eF:function(a,b){var z,y
if(!this.aT(a)||!this.aT(b))return!1
z=this.a
if(a<0||a>=z.length)return H.f(z,a)
if(z[a].gaW()!=null){if(b<0||b>=z.length)return H.f(z,b)
y=z[b].gaW()==null}else y=!0
if(y)return!1
if(a>=z.length)return H.f(z,a)
if(z[a].gaS()!=null){if(b<0||b>=z.length)return H.f(z,b)
y=z[b].gaS()==null}else y=!0
if(y)return!1
if(a>=z.length)return H.f(z,a)
y=z[a].gaW().gi()
if(b<0||b>=z.length)return H.f(z,b)
if(J.e(y,z[b].gaS().gi())){if(a>=z.length)return H.f(z,a)
y=z[a].gaS().gi()
if(b>=z.length)return H.f(z,b)
z=J.e(y,z[b].gaW().gi())}else z=!1
return z},
dR:function(a){var z=this
return P.aT(function(){var y=a
var x=0,w=2,v,u,t
return function $async$dR(b,c){if(b===1){v=c
x=w}while(true)switch(x){case 0:if(!z.aT(y)){x=1
break}u=z.a
if(y<0||y>=u.length)H.f(u,y)
t=u[y]
x=t.gaW()!=null?3:4
break
case 3:x=5
return t.gaW()
case 5:case 4:x=t.gaS()!=null?6:7
break
case 6:x=8
return t.gaS()
case 8:case 7:x=t.ghk()!=null?9:10
break
case 9:x=11
return t.d
case 11:case 10:u=t.e
x=u!=null?12:13
break
case 12:x=14
return u
case 14:case 13:case 1:return P.aR()
case 2:return P.aS(v)}}})},
cV:[function(a){var z=J.al(a)
if(z.aV(a,0)||z.bS(a,this.a.length))return
else{z=this.a
if(a>>>0!==a||a>=z.length)return H.f(z,a)
return z[a].gaS()}},"$1","gaS",2,0,23],
kE:function(a,b){var z
if(!this.aT(a)||!this.aT(b))return!1
if(this.eF(a,b)){z=this.a
if(a>=z.length)return H.f(z,a)
z[a].gfa()}return!1},
hj:function(a){var z
for(z=!1;this.geH();z=!0){a.$1(this.ho(!0))
this.kM()}return z},
ho:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c
z=this.a
y=C.a.bv(z,[],new Y.oI())
C.a.j1(z,new Y.oJ(y),!1)
x=a&&this.geH()?C.a.aY(z,C.a.cj(z,new Y.oK()))+1:z.length
if(x<1)return""
for(w=-1,v=!0,u=!1,t=!1,s=0,r="";s<x;++s){q=s===0
if(!q){p=s-1
o=this.eF(p,s)
if(s>=z.length)return H.f(z,s)
if(!z[s].gdv())n=this.kE(s,p)&&this.i0(s,p)
else n=!0
if(n){if(p<0||p>=z.length)return H.f(z,p)
t=!z[p].gdv()}else t=!1
if(s>=z.length)return H.f(z,s)
z[s].sdv(t)
n=s-w
if(n<3)if(!u){if(s>=z.length)return H.f(z,s)
if(!z[s].gi1()){if(p<0||p>=z.length)return H.f(z,p)
if(!z[p].gjQ()){if(s>=z.length)return H.f(z,s)
if(!z[s].gd5())if(this.dr(s,p)||o)if(!(t&&n>1)){if(t){if(p>=z.length)return H.f(z,p)
n=z[p].gdv()}else n=!1
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
u=!1}else if(t){r+=S.fM([" but "," but ",", but "])
u=!this.hN(s,s+1)&&!0}else{r+=S.fM([" and "," and ",", and "])
u=!0}}m=this.e_(s)
l=S.bM(m)
p=J.J(l)
if(p.a7(l,"{")===!0||p.a7(l,"}")===!0)$.$get$iq().dW('Storyline result includes { and/or } even after being parsed by Randomly. Is there a dangling bracket here? Input = """'+H.b(m)+'""" Output = """'+H.b(l)+'"""')
n=!v
if(n){k=s-1
k=this.dr(s,k)&&J.eQ(this.e_(k),"<subject> ")&&p.df(l,"<subject> ")}else k=!1
if(k)l=p.d_(l,"<subject> ","")
j=J.dn(l,"<action>",this.e_(s))
p=s-1
k=this.j4(s,p)
if(k)k=!(this.cV(s).ga8()===C.n&&this.br(s).ga8()===C.n)
else k=!1
if(k){j=H.n(j,"<object-owner's> <object>","<objectPronounAccusative>")
j=H.n(j,"<object-ownerPronoun's> <object>","<objectPronounAccusative>")
j=H.n(j,"<object>","<objectPronounAccusative>")
j=H.n(j,"<object's>","<objectPronoun's>")}k=this.dr(s,p)
if(k){j=H.n(j,"<owner's> <subject>","<subjectPronoun>")
j=H.n(j,"<ownerPronoun's> <subject>","<subjectPronoun>")
j=H.n(j,"<subject>","<subjectPronoun>")
j=H.n(j,"<subject's>","<subjectPronoun's>")}if(this.cV(p)!=null)if(this.br(s)!=null)if(this.br(p)!=null){k=this.cV(p)
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
j=H.n(j,"<subject's>","<subjectPronoun's>")}if(this.br(p)!=null)if(this.cV(s)!=null){k=this.br(p)
k=k==null?k:k.gi()
i=this.cV(s)
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
h=p.gaW()
g=p.gaS()
f=p.ghk()
e=p.e
k=h!=null
if(k){if(h.gH()===!0){d=H.n(j,"<subject>","<subjectPronoun>")
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
d=H.n(d,"<has>","has")}d=H.iD(d,"<subject>","<subjectNoun>",0)
i=h.ga8().a
d=H.n(d,"<subject>",i)
i=p.db
d=J.cA(this.bW(d,"<subjectNoun>",h,f,i),"<subjectNoun>",h.gh())
c=h.ga8().a
d=H.n(d,"<subjectPronoun>",c)
if(C.b.a7(j,P.bp("<subject>.+<subject's>",!0,!1))){c=h.ga8().c
d=H.n(d,"<subject's>",c)}d=J.cA(this.bW(d,"<subject's>",h,f,i),"<subject's>",H.b(h.gh())+"'s")
i=h.ga8().c
d=H.n(d,"<subject's>",i)
i=h.ga8().b
d=H.n(d,"<subjectPronounAccusative>",i)
i=h.ga8().d
d=H.n(d,"<subjectPronounSelf>",i)}else d=j
if(g!=null){if(g.gaG()===!0){d=H.n(d,"<subject's> <object>","<object>")
d=H.n(d,"<subjectPronoun's> <object>","<object>")}if(g.gH()===!0){d=H.n(d,"<object>","<objectPronoun>")
d=H.n(d,"<object's>","<objectPronoun's>")}else d=J.dn(this.bW(d,"<object>",g,e,p.db),"<object>",g.gh())
i=g.ga8().b
d=H.n(d,"<objectPronoun>",i)
if(C.b.a7(j,P.bp("<object>.+<object's>",!0,!1))){i=g.ga8().c
d=H.n(d,"<object's>",i)}d=J.cA(this.bW(d,"<object's>",g,e,p.db),"<object's>",H.b(g.gh())+"'s")
i=g.ga8().c
d=H.n(d,"<object's>",i)
i=g.ga8().c
d=H.n(d,"<objectPronoun's>",i)
i=g.ga8().b
d=H.n(d,"<objectPronounAccusative>",i)
i=g.ga8().a
d=H.n(d,"<objectPronounNominative>",i)}if(k){k=h.ga8().c
d=H.n(d,"<subjectPronoun's>",k)}p=p.db
j=this.fG(e,this.fG(f,d,j,"<owner>","<owner's>","<ownerPronoun>","<ownerPronoun's>",p),j,"<object-owner>","<object-owner's>","<object-ownerPronoun>","<object-ownerPronoun's>",p)
r+=(!n||q)&&!t?Y.oG(j):j
if(v)w=s
if(s>=z.length)return H.f(z,s)
if(z[s].gd5())u=!0}q=x-1
if(q>=z.length)return H.f(z,q)
z=!z[q].gd5()?r+".":r
return H.wi(z.charCodeAt(0)==0?z:z,$.$get$h6(),new Y.oL(),null)},
cr:function(){return this.ho(!1)},
kM:function(){var z,y
if(!this.geH()){C.a.sl(this.a,0)
return}z=this.a
y=C.a.aY(z,C.a.cj(z,new Y.oM()))+1
P.ck(0,y,z.length,null,null,null)
z.splice(0,y-0)},
hN:function(a,b){var z,y
if(!this.aT(a)||!this.aT(b))return!1
if(this.eF(a,b)){z=this.a
if(a>=z.length)return H.f(z,a)
z[a].gfa()}if(!this.dr(a,b))return!1
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
if(!this.aT(a)||!this.aT(b))return!1
for(z=new P.bd(this.dR(a).a(),null,null,null);z.t();){y=z.c
x=y==null?z.b:y.gS()
for(y=new P.bd(this.dR(b).a(),null,null,null);y.t();){w=y.c
v=w==null?y.b:w.gS()
if(J.e(x.gi(),v.gi()))return!0}}return!1},
e_:[function(a){var z=J.al(a)
if(z.aV(a,0)||z.bS(a,this.a.length))return
else{z=this.a
if(a>>>0!==a||a>=z.length)return H.f(z,a)
return z[a].gb6()}},"$1","gb6",2,0,12],
br:[function(a){var z=J.al(a)
if(z.aV(a,0)||z.bS(a,this.a.length))return
else{z=this.a
if(a>>>0!==a||a>=z.length)return H.f(z,a)
return z[a].gaW()}},"$1","gaW",2,0,23],
l_:function(a){var z,y,x
z=this.a
if(a>=z.length)return H.f(z,a)
if(z[a].gU()!=null){y=a-1
if(this.aT(y)){if(y<0||y>=z.length)return H.f(z,y)
y=z[y].gU()==null}else y=!0}else y=!0
if(y)return 1000
else{if(a>=z.length)return H.f(z,a)
y=z[a].gU()
x=a-1
if(x<0||x>=z.length)return H.f(z,x)
x=z[x].gU()
if(typeof y!=="number")return y.aq()
if(typeof x!=="number")return H.w(x)
return y-x}},
k:function(a){return this.cr()},
aT:function(a){if(a>=this.a.length||a<0)return!1
else return!0},
fG:function(a,b,c,d,e,f,g,h){var z
if(a!=null){z=a.gH()===!0?H.n(H.n(b,d,"you"),e,"your"):J.dn(this.bW(b,d,a,null,h),d,a.gh())
z=H.n(z,f,a.ga8().a)
z=H.n(H.n(J.cA(this.bW(C.b.a7(c,P.bp(d+".+"+e,!0,!1))?H.n(z,e,a.ga8().c):z,e,a,null,h),e,H.b(a.gh())+"'s"),e,a.ga8().c),g,a.ga8().c)}else z=H.n(H.n(H.n(H.n(b,d,""),e,""),f,""),g,"")
return z},
j4:function(a,b){var z,y
if(!this.aT(a)||!this.aT(b))return!1
z=this.a
if(a>=z.length)return H.f(z,a)
if(z[a].gaS()!=null){if(b<0||b>=z.length)return H.f(z,b)
y=z[b].gaS()==null}else y=!0
if(y)return!1
if(a>=z.length)return H.f(z,a)
y=z[a].gaS().gi()
if(b<0||b>=z.length)return H.f(z,b)
return J.e(y,z[b].gaS().gi())},
dr:function(a,b){var z,y
if(!this.aT(a)||!this.aT(b))return!1
z=this.a
if(a>=z.length)return H.f(z,a)
if(z[a].gaW()!=null){if(b<0||b>=z.length)return H.f(z,b)
y=z[b].gaW()==null}else y=!0
if(y)return!1
if(a>=z.length)return H.f(z,a)
y=z[a].gaW().gi()
if(b<0||b>=z.length)return H.f(z,b)
return J.e(y,z[b].gaW().gi())},
u:{
oG:function(a){var z,y,x
z=!C.b.a7(a,"\n\n")?C.b.l4(a):a
y=z.length
if(y===0)return z
if(0>=y)return H.f(z,0)
x=z[0].toUpperCase()
if(y===1)return x
else return x+C.b.bJ(z,1)}}},oH:{"^":"a:0;",
$1:function(a){return J.e(a.gb6(),"\n\n")}},oF:{"^":"a:24;",
$1:function(a){return C.b.eY(H.n(H.n(a,"<also> ",""),"  "," "))}},oI:{"^":"a:38;",
$2:function(a,b){var z,y,x
z=J.J(a)
y=z.gas(a)?z.gv(a):null
if(y!=null&&y.gkq()&&J.e(b.gjg(),y.cx)){x=z.gl(a)
if(typeof x!=="number")return x.aq()
z.n(a,x-1,b)}else z.q(a,b)
return a}},oJ:{"^":"a:31;a",
$1:function(a){return J.eM(this.a,a)}},oK:{"^":"a:0;",
$1:function(a){return J.e(a.gb6(),"\n\n")}},oL:{"^":"a:30;",
$1:function(a){return H.b(a.j(0,1))+H.b(a.j(0,2))+H.b(a.j(0,3))}},oM:{"^":"a:0;",
$1:function(a){return J.e(a.gb6(),"\n\n")}},aN:{"^":"mB;aG:a<,h:b<,c,b3:d<,H:e<,a8:f<",
gi:function(){return H.aC(this)},
gck:function(){return!0},
gaZ:function(){return!0},
u:{
c7:function(a,b,c,d,e){var z=H.p([],[P.r])
return new Y.aN(c,b,z,e==null?$.$get$aY():e,!1,d)}}},mB:{"^":"d+dv;"},dv:{"^":"d;",
gaR:function(){return this.gaZ()&&this.gck()===!0},
a9:function(a,b,c,d,e,f,g,h,i,j,k,l,m){J.iP(a,b,c,d,e,f,g,h,i,j,k,H.H(this,"$isaN"),!1,m)},
ad:function(a,b){return this.a9(a,b,null,!1,!1,!1,!1,null,null,null,!1,!1,!1)},
al:function(a,b,c){return this.a9(a,b,null,c,!1,!1,!1,null,null,null,!1,!1,!1)},
dI:function(a,b,c){return this.a9(a,b,null,!1,!1,!1,!1,null,null,null,!1,!1,c)},
ae:function(a,b,c){return this.a9(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,!1)},
hu:function(a,b,c,d){return this.a9(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,d)},
dK:function(a,b,c,d,e,f){return this.a9(a,b,null,!1,!1,!1,!1,c,d,e,f,!1,!1)},
dK:function(a,b,c,d,e,f){return this.a9(a,b,null,!1,!1,!1,!1,c,d,e,f,!1,!1)},
aA:function(a,b,c){return this.a9(a,b,null,!1,!1,!1,c,null,null,null,!1,!1,!1)},
c1:function(a,b,c,d){return this.a9(a,b,null,!1,c,!1,d,null,null,null,!1,!1,!1)},
kS:function(a,b,c,d,e){return this.a9(a,b,null,c,!1,!1,!1,d,null,null,e,!1,!1)},
eT:function(a,b,c,d){return this.a9(a,b,null,c,!1,!1,!1,null,null,null,d,!1,!1)},
eT:function(a,b,c,d){return this.a9(a,b,null,c,!1,!1,!1,null,null,null,d,!1,!1)},
bm:function(a,b,c){return this.a9(a,b,null,!1,!1,!1,!1,null,null,null,c,!1,!1)},
bQ:function(a,b,c,d){return this.a9(a,b,null,c,!1,!1,!1,d,null,null,!1,!1,!1)},
bR:function(a,b,c,d,e){return this.a9(a,b,c,!1,!1,!1,!1,d,null,null,e,!1,!1)},
eS:function(a,b,c,d){return this.a9(a,b,null,c,!1,!1,d,null,null,null,!1,!1,!1)},
bn:function(a,b,c,d){return this.a9(a,b,null,!1,!1,!1,!1,c,null,null,d,!1,!1)},
c1:function(a,b,c,d){return this.a9(a,b,null,!1,c,!1,d,null,null,null,!1,!1,!1)},
dJ:function(a,b,c,d,e){return this.a9(a,b,c,!1,!1,d,!1,e,null,null,!1,!1,!1)},
hs:function(a,b,c,d){return this.a9(a,b,null,!1,!1,!1,c,d,null,null,!1,!1,!1)},
hr:function(a,b,c,d){return this.a9(a,b,c,!1,!1,d,!1,null,null,null,!1,!1,!1)},
kU:function(a,b,c,d,e,f){return this.a9(a,b,c,d,!1,e,!1,f,null,null,!1,!1,!1)},
c2:function(a,b,c,d,e){return this.a9(a,b,c,d,!1,e,!1,null,null,null,!1,!1,!1)},
hq:function(a,b,c){return this.a9(a,b,c,!1,!1,!1,!1,null,null,null,!1,!1,!1)},
kQ:function(a,b,c,d){return this.a9(a,b,c,!1,!1,!1,!1,d,null,null,!1,!1,!1)},
ht:function(a,b,c,d){return this.a9(a,b,null,!1,!1,!1,!1,c,d,null,!1,!1,!1)},
kT:function(a,b,c,d,e){return this.a9(a,b,null,!1,c,!1,!1,d,null,null,e,!1,!1)},
kV:function(a,b,c,d,e,f){return this.a9(a,b,null,!1,c,!1,!1,d,e,null,f,!1,!1)},
eS:function(a,b,c,d){return this.a9(a,b,null,c,!1,!1,d,null,null,null,!1,!1,!1)},
kR:function(a,b,c,d){return this.a9(a,b,null,!1,c,!1,!1,null,null,null,d,!1,!1)}},ci:{"^":"d;a,b,c,d",
k:function(a){return this.a}}}],["","",,L,{"^":"",tf:{"^":"a:0;",
$1:function(a){a.gcK().b=2
return 2}},tl:{"^":"a:0;",
$1:function(a){a.gcK().b=0
return 0}},te:{"^":"a:0;",
$1:function(a){a.gcK().b=1
return 1}},hg:{"^":"d;",
hb:function(a){var z,y
z=this.a
y=a.gi()
return z==null?y==null:z===y}},q3:{"^":"hg;i:a<",
a1:function(a){var z=new L.br(null,null)
z.m(this)
a.$1(z)
return z.p()},
w:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof L.hg))return!1
z=this.a
y=b.a
return z==null?y==null:z===y},
gB:function(a){return Y.U(Y.k(0,J.j(this.a)))},
k:function(a){return"Team {id="+J.h(this.a)+",\n}"},
u:{
e9:function(a){var z=new L.br(null,null)
a.$1(z)
return z.p()}}},br:{"^":"d;a,b",
gi:function(){return this.gcK().b},
gcK:function(){var z=this.a
if(z!=null){this.b=z.a
this.a=null}return this},
m:function(a){this.a=a},
p:function(){var z,y
z=this.a
if(z==null){y=this.gcK().b
z=new L.q3(y)
if(y==null)H.i(P.l("id"))}this.m(z)
return z}}}],["","",,X,{"^":"",
i_:function(a,b){return P.aT(function(){var z=a,y=b
var x=0,w=1,v,u,t,s,r,q
return function $async$i_(c,d){if(c===1){v=d
x=w}while(true)switch(x){case 0:u=z.a
t=new J.bj(u,u.length,0,null,[H.m(u,0)])
u=y.a
s=new J.bj(u,u.length,0,null,[H.m(u,0)])
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
break}case 4:return P.aR()
case 1:return P.aS(v)}}})}}],["","",,A,{"^":"",ad:{"^":"d;ev:a<,ay:b<,c,d,e,f,U:r<,x",
gjD:function(){var z=this.f
return z.length!==0?C.a.gv(z):null},
gB:function(a){var z,y,x,w,v
z=X.bA(this.a)
y=X.bA(this.d)
x=X.bA(this.f)
w=this.r
v=this.c
v=X.dc(X.b3(X.b3(0,C.e.gB(w)),J.j(v)))
return X.dc(X.b3(X.b3(X.b3(X.b3(0,z&0x1FFFFFFF),y&0x1FFFFFFF),x&0x1FFFFFFF),v&0x1FFFFFFF))},
w:function(a,b){var z
if(b==null)return!1
z=J.o(b)
return!!z.$isad&&this.gB(this)===z.gB(b)},
jf:function(a){var z,y
z=this.hL(a,!0)
y=z.ga_(z)
if(y.t()){y.gS()
return!0}return!1},
aN:function(a){var z,y
z=this.hK(a)
y=z.ga_(z)
if(y.t()){y.gS()
return!0}return!1},
fZ:function(a){var z,y,x
z=this.dl(a)
if(z==null)throw H.c(new P.x("Tried to elapseSituationTime of situation id="+H.b(a)+" that doesn't exist in situations ("+H.b(this.f)+")."))
y=this.f
if(z!==(z|0)||z>=y.length)return H.f(y,z)
x=y[z].aw()
if(z!==(z|0)||z>=y.length)return H.f(y,z)
y[z]=x},
aw:function(){++this.r},
d7:function(a,b,c,d,e){var z=this.d
if(a!=null)z=z.dg(0,new A.pB(a))
if(b!=null)z=z.c6(0,new A.pC(b))
if(c!=null)z=z.c6(0,new A.pD(c))
if(e!=null)z=z.c6(0,new A.pE(e))
return d!=null?z.c6(0,new A.pF(d)):z},
hK:function(a){return this.d7(a,null,null,null,null)},
hL:function(a,b){return this.d7(a,null,null,null,b)},
hM:function(a,b,c){return this.d7(a,b,null,null,c)},
Y:function(a){return this.a.bB(0,new A.pG(a))},
dU:function(a){return this.e.bB(0,new A.pH(a))},
f1:function(a){var z,y
z=this.dl(a)
if(z==null)return
y=this.f
if(z!==(z|0)||z>=y.length)return H.f(y,z)
return y[z]},
at:function(a){var z,y
for(z=this.f,y=z.length-1;y>=0;--y){if(y>=z.length)return H.f(z,y)
if(J.e(z[y].gh(),a)){if(y>=z.length)return H.f(z,y)
return z[y]}}throw H.c(P.E("No situation with name="+a+" found."))},
k9:function(a){var z=this.a.aQ(0,new A.pI(a),new A.pJ())
if(z==null)return!1
return z.gaZ()},
az:function(){var z,y
z=this.f
y=C.a.gv(z)
y.dE(this)
C.a.a3(z,y)},
b1:function(a){var z,y
z=this.f
while(!0){if(!(z.length!==0&&!J.e(C.a.gv(z).gh(),a)))break
y=C.a.gv(z)
y.dE(this)
C.a.a3(z,y)}if(z.length===0)throw H.c(P.E("Tried to pop situations until "+a+" but none was found in stack."))},
c0:function(a,b){var z,y
z=this.dl(a)
if(z==null)throw H.c(P.E("Situation with id "+H.b(a)+" does not exist in "+H.b(this.f)))
y=this.f
if(z!==(z|0)||z>=y.length)return H.f(y,z)
y[z]=b},
dM:function(a,b,c,d,e){var z,y,x,w
z=this.d7(a,b,c,d,e)
y=z.ga_(z)
if(y.t()){x=y.gS()
y=this.r
w=x.gU()
if(typeof w!=="number")return H.w(w)
return y-w}return},
kZ:function(a,b,c){return this.dM(null,a,b,c,null)},
c4:function(a,b,c){return this.dM(a,null,b,null,c)},
kY:function(a,b,c){return this.dM(a,b,null,null,c)},
dL:function(a){return this.dM(a,null,null,null,null)},
k:function(a){var z,y
z=this.a
y=z.eh()
y.av(0,z)
return"World<"+P.cd(y,"{","}")+">"},
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
ih:function(a){this.a.av(0,a.a)
this.d.av(0,a.d)
this.b.av(0,a.b)
this.e.av(0,a.e)
C.a.av(this.f,a.f)
this.r=a.r},
u:{
e7:function(a){var z,y,x,w
z=P.a4(null,null,null,R.I)
y=P.bb(null,O.cB)
x=P.a4(null,null,null,U.ab)
w=P.a4(null,null,null,null)
w=new A.ad(z,x,a.c,y,w,[],null,null)
w.ih(a)
return w}}},pB:{"^":"a:0;a",
$1:function(a){return a.geu()===this.a}},pC:{"^":"a:0;a",
$1:function(a){return J.e(a.gcZ(),this.a.gi())}},pD:{"^":"a:0;a",
$1:function(a){return a.gfb().a7(0,this.a.gi())}},pE:{"^":"a:0;a",
$1:function(a){return a.ghG()===this.a}},pF:{"^":"a:0;a",
$1:function(a){return a.ghE()===this.a}},pG:{"^":"a:0;a",
$1:function(a){return J.e(a.gi(),this.a)}},pH:{"^":"a:0;a",
$1:function(a){return J.e(a.gh(),this.a)}},pI:{"^":"a:0;a",
$1:function(a){return J.e(a.gi(),this.a)}},pJ:{"^":"a:2;",
$0:function(){return}}}],["","",,A,{"^":"",Z:{"^":"af;a0:b<"},fV:{"^":"Z;c,V:d<,J:e<,h:f<,b,a",
P:[function(a,b,c){throw H.c(new P.x("SimpleAction always succeeds"))},"$3","gM",6,0,1],
R:[function(a,b,c){return this.c.$4(a,b,c,this)},"$3","gN",6,0,1],
ac:function(a,b){throw H.c(new P.x("SimpleAction shouldn't have to provide roll reason"))},
I:function(a,b){return 1},
gK:function(){return!1},
G:function(a,b){return!0},
gL:function(){return H.i(new P.x("Not rerollable"))},
gO:function(){return!1}}}],["","",,N,{"^":"",k0:{"^":"z;K:c<,a0:d<,J:e<,O:f<,L:r<,b,a",
ga6:function(){return"confuse <object>"},
gh:function(){return"Confuse"},
gaf:function(){return"will <subject> confuse <object>?"},
P:[function(a,b,c){var z
a.ad(c,"<subject> touch<es> <subject's> temple")
z=this.b
a.ae(c,"<subject> tr<ies> to {channel|implant} {terror|confusion} into <object's> mind",z)
a.eS(c,"<subject> fail<s>",!0,!0)
return H.b(a.gh())+" fails to confuse "+H.b(z.gh())},"$3","gM",6,0,1],
R:[function(a,b,c){var z
a.ad(c,"<subject> touch<es> <subject's> temple")
z=this.b
a.bn(c,"<subject> {channel<s>|implant<s>} {terror|confusion} into <object's> mind",z,!0)
z.aA(c,"<subject's> eyes go wide with terror",!0)
return H.b(a.gh())+" confuses "+H.b(z.gh())},"$3","gN",6,0,1],
I:function(a,b){return 0.6},
G:function(a,b){var z
if(a.gH()===!0)if(a.ga4()){z=b.a
z=new H.K(z,new N.k1(this),[H.m(z,0)])
z=z.gl(z)>=2&&!this.b.eK(b)}else z=!1
else z=!1
return z},
u:{
wy:[function(a){return new N.k0(!0,!0,"Channeling the terror of the Dead Prince into lesser minds is something you've been practicing. It makes the target rabid and disoriented. They might attack their own.",!0,C.c,a,null)},"$1","tF",2,0,4]}},k1:{"^":"a:0;a",
$1:function(a){return a.gaZ()&&a.gb3().hb(this.a.b.gb3())}}}],["","",,V,{"^":"",ko:{"^":"z;O:c<,L:d<,K:e<,a0:f<,J:r<,b,a",
ga6:function(){return"kick <object's> weapon off"},
gh:function(){return"DisarmKick"},
gaf:function(){return"will <subject> kick the weapon off?"},
P:[function(a,b,c){S.a5(new V.kp(this,a,c),new V.kq(this,a,c),null,null)
return H.b(a.gh())+" fails to kick "+H.b(this.b.gh())+"'s weapon off"},"$3","gM",6,0,1],
R:[function(a,b,c){var z,y
S.a5(new V.kr(this,a,c),new V.ks(this,a,c),null,null)
z=b.f
y=z.length!==0?C.a.gv(z):null
b.c0(y.gi(),y.a1(new V.kt(this)))
z=this.b
b.X(z.gi(),new V.ku())
return H.b(a.gh())+" kicks "+H.b(z.gh())+"'s weapon off"},"$3","gN",6,0,1],
I:function(a,b){var z=a.ga4()?0:0.2
if(a.ch===!0)return 0.7-z
return 0.5-z},
G:function(a,b){var z
if(a.ga4()||a.dy===C.h){z=this.b
z=z.ga2()&&!z.gb_()}else z=!1
return z},
u:{
wB:[function(a){return new V.ko(!0,C.c,!0,!0,"When enemies are on the ground, you can try to kick their weapon off to disarm them.",a,null)},"$1","tW",2,0,4]}},kp:{"^":"a:2;a,b,c",
$0:function(){var z,y
z=this.b
y=this.c
z.ae(y,"<subject> kick<s> {at|towards} <object's> weapon",this.a.b)
z.al(y,"<subject> mi<sses>",!0)}},kq:{"^":"a:2;a,b,c",
$0:function(){var z,y
z=this.c
y=this.a.b
this.b.ae(z,"<subject> kick<s> <object's> weapon",y)
y.al(z,"<subject> hold<s> onto it",!0)}},kr:{"^":"a:2;a,b,c",
$0:function(){var z=this.a.b
this.b.kV(this.c,"<subject> kick<s> <object-owner's> <object> off <object-owner's> hand",!0,z.gT(),z,!0)}},ks:{"^":"a:2;a,b,c",
$0:function(){var z,y
z=this.c
y=this.a.b
this.b.bn(z,"<subject> kick<s> <object's> {right|} hand",y,!0)
z.cf(0,"<owner's> <subject> fl<ies> away",y,y.gT())}},kt:{"^":"a:14;a",
$1:function(a){a.gbk().q(0,this.a.b.gT())
return a}},ku:{"^":"a:0;",
$1:function(a){a.sT($.$get$dg())
return a}}}],["","",,R,{"^":"",m7:{"^":"z;O:c<,L:d<,K:e<,a0:f<,J:r<,b,a",
gh:function(){return"KickToGround"},
ga6:function(){return"kick <object> to the ground"},
gaf:function(){return"will <subject> kick <object> prone?"},
P:[function(a,b,c){S.a5(new R.m8(this,a,c),new R.m9(this,a,c),null,null)
return H.b(a.gh())+" fails to sweep "+H.b(this.b.gh())+" off feet"},"$3","gM",6,0,1],
R:[function(a,b,c){var z
S.a5(new R.ma(this,a,c),new R.mb(this,a,c,U.bz(b)),null,null)
z=this.b
b.X(z.gi(),new R.mc())
return H.b(a.gh())+" sweeps "+H.b(z.gh())+" off feet"},"$3","gN",6,0,1],
I:function(a,b){var z=a.ga4()?0:0.2
if(a.ch===!0)return 0.7-z
return 0.5-z},
G:function(a,b){return(a.ga4()||a.dy===C.h)&&!this.b.ga2()},
u:{
wS:[function(a){return new R.m7(!0,C.c,!0,!0,"Sweeping opponents off their feet doesn't deal much damage but on the ground they will be much easier targets for you and your allies.",a,null)},"$1","uz",2,0,4]}},m8:{"^":"a:2;a,b,c",
$0:function(){var z,y
z=this.b
y=this.c
z.ae(y,"<subject> kick<s> {at|towards} <object's> feet",this.a.b)
z.al(y,"<subject> mi<sses>",!0)}},m9:{"^":"a:2;a,b,c",
$0:function(){var z,y
z=this.c
y=this.a.b
this.b.ae(z,"<subject> kick<s> <object's> shin",y)
y.al(z,"<subject> <does>n't budge",!0)}},ma:{"^":"a:2;a,b,c",
$0:function(){this.b.kT(this.c,"<subject> kick<s> <object> off <object's> feet and to the ground",!0,this.a.b,!0)}},mb:{"^":"a:2;a,b,c,d",
$0:function(){var z,y
z=this.c
y=this.a.b
this.b.bn(z,"<subject> kick<s> <object's> {right|left} shin",y,!0)
y.ad(z,"<subject> {grunt|shriek}<s>")
y.aA(z,"<subject> fall<s> to the "+H.b(this.d),!0)}},mc:{"^":"a:0;",
$1:function(a){a.sah(C.f)
return a}}}],["","",,F,{"^":"",mW:{"^":"af;J:b<,K:c<,a0:d<,O:e<,L:f<,a",
gV:function(){return"Stand off."},
gh:function(){return"Pass"},
P:[function(a,b,c){throw H.c(new P.W(null))},"$3","gM",6,0,1],
R:[function(a,b,c){if(a.gH()===!0)a.ad(c,"<subject> stand<s> off")
return H.b(a.gh())+" passes the opportunity"},"$3","gN",6,0,1],
ac:function(a,b){return"WARNING this shouldn't be user-visible"},
I:function(a,b){return 1},
G:function(a,b){return!0}}}],["","",,Y,{"^":"",n9:{"^":"z;O:c<,L:d<,K:e<,a0:f<,J:r<,b,a",
ga6:function(){return"force <object> off balance"},
gh:function(){return"Pound"},
gaf:function(){return"will <subject> force <object> off balance?"},
P:[function(a,b,c){var z=this.b
a.ht(c,"<subject> {fiercely|violently} {pound<s>|strike<s>|hammer<s>|batter<s>} on <object-owner's> {<object>|weapon}",z.gT(),z)
z.bm(c,"<subject> {retain<s>|keep<s>} <subject's> {|combat} {stance|footing}",!0)
return H.b(a.gh())+" kicks "+H.b(z.db)+" off balance"},"$3","gM",6,0,1],
R:[function(a,b,c){var z=this.b
a.ht(c,"<subject> {fiercely|violently} {pound<s>|strike<s>|hammer<s>|batter<s>} on <object-owner's> {<object>|weapon}",z.gT(),z)
if(z.ga4()){z.hs(c,"<subject> lose<s> <object>",!0,$.$get$eq())
b.X(z.y,new Y.na())
C.a.q(b.f,U.mC(z,a))
return H.b(a.gh())+" pounds "+H.b(z.db)+" off balance"}else if(z.gap()){z.ad(c,"<subject> <is> already off balance")
c.ew(0,"<subject> make<s> <object> fall to the "+H.b(U.bz(b)),z,$.$get$iv())
b.X(z.y,new Y.nb())
return H.b(a.gh())+" pounds "+H.b(z.db)+" to the ground"}throw H.c(new P.x("enemy pose must be either standing or off-balance"))},"$3","gN",6,0,1],
I:function(a,b){var z=a.ga4()?0:0.2
if(a.ch===!0)return 0.7-z
return 0.5-z},
G:function(a,b){var z,y
if(!a.ga2()){z=a.e
if(z.gbf()||z.gko()){z=this.b
if(!z.gT().gcg()){z.gT().geB()
y=!1}else y=!0
z=y&&!z.ga2()}else z=!1}else z=!1
return z},
u:{
x_:[function(a){return new Y.n9(!0,C.c,!0,!0,"Forcing enemies off balance often means hitting them heavily several times in a row. The goal is not to deal damage but to force the opponent to lose control of their combat stance. It can also give members of your party an opportunity to strike.",a,null)},"$1","uK",2,0,4]}},na:{"^":"a:0;",
$1:function(a){a.sah(C.h)
return a}},nb:{"^":"a:0;",
$1:function(a){a.sah(C.f)
return a}}}],["","",,B,{"^":"",nx:{"^":"af;J:b<,K:c<,a0:d<,O:e<,L:f<,a",
gV:function(){return"Regain balance."},
gh:function(){return"RegainBalance"},
P:[function(a,b,c){throw H.c(new P.W(null))},"$3","gM",6,0,1],
R:[function(a,b,c){if(a.gH()===!0)a.bn(c,"<subject> regain<s> <object>",$.$get$eq(),!0)
b.X(a.gi(),new B.ny())
return H.b(a.gh())+" regains balance"},"$3","gN",6,0,1],
ac:function(a,b){return"Will "+a.ga8().a+" regain balance?"},
I:function(a,b){return 1},
G:function(a,b){return a.gap()}},ny:{"^":"a:0;",
$1:function(a){a.sah(C.k)
return C.k}}}],["","",,O,{"^":"",nN:{"^":"af;J:b<,K:c<,a0:d<,O:e<,L:f<,a",
gV:function(){return"Scramble."},
gh:function(){return"Scramble"},
P:[function(a,b,c){throw H.c(new P.W(null))},"$3","gM",6,0,1],
R:[function(a,b,c){a.ad(c,"<subject> tr<ies> to {scramble|crawl} out of {reach|harm's way}")
return H.b(a.gh())+" scrambles on ground"},"$3","gN",6,0,1],
ac:function(a,b){return"Will "+a.ga8().a+" crawl out of harm's way?"},
I:function(a,b){return 1},
G:function(a,b){if(!a.ga2())return!1
if(A.dk(a,b))return!0
return!1}}}],["","",,Q,{"^":"",ou:{"^":"af;J:b<,K:c<,a0:d<,O:e<,L:f<,a",
gV:function(){return"Stand up."},
gh:function(){return"StandUp"},
P:[function(a,b,c){throw H.c(new P.W(null))},"$3","gM",6,0,1],
R:[function(a,b,c){a.ad(c,"<subject> {rise<s>|stand<s> up|get<s> to <subject's> feet|get<s> up|pick<s> <subjectPronounSelf> up}")
S.a5(new Q.ov(a,c),new Q.ow(a,c),null,null)
b.X(a.gi(),new Q.ox())
return H.b(a.gh())+" stands up"},"$3","gN",6,0,1],
ac:function(a,b){return"Will "+a.ga8().a+" stand up?"},
I:function(a,b){return 1},
G:function(a,b){if(!a.ga2())return!1
if(A.dk(a,b))return!1
return!0}},ov:{"^":"a:2;a,b",
$0:function(){return this.a.ad(this.b,"<subject> {stagger<s>|sway<s>} back before finding balance")}},ow:{"^":"a:2;a,b",
$0:function(){return this.a.ad(this.b,"<subject> stead<ies> <subjectPronounSelf>")}},ox:{"^":"a:0;",
$1:function(a){a.sah(C.k)
return C.k}}}],["","",,T,{"^":"",
xs:[function(a){return new A.a0(T.eC(),null,null,new T.uY(),new T.uZ(),new T.v_(),null,!0,"This move is hard, but when succesful, it's decisive.",!0,!0,"StartBreakNeckOnGround",!1,null,"break <object's> neck",null,a,null)},"$1","w1",2,0,4],
xt:[function(a){return new A.a0(T.eC(),new T.v0(),T.eC(),new T.v1(),new T.v2(),new T.v3(),new T.v4(),!0,"This move is hard, but when succesful, it's decisive.",!0,!0,"StartBreakNeckOnGroundPlayer",!0,C.c,"break <object's> neck","will <subject> succeed?",a,null)},"$1","w2",2,0,4],
xu:[function(a,b,c,d,e){a.ae(c,"<subject> throw<s> <subjectPronounSelf> {on|upon} <object>",d)
b.X(a.gi(),new T.v5())},"$5","eC",10,0,8],
uY:{"^":"a:3;",
$3:function(a,b,c){return a.gH()!==!0&&c.ga2()&&a.gb_()&&c.gb_()}},
uZ:{"^":"a:3;",
$3:function(a,b,c){return Y.eY(a,c)}},
v_:{"^":"a:3;",
$3:function(a,b,c){return S.dR(a,c,C.l)}},
v1:{"^":"a:3;",
$3:function(a,b,c){return a.gH()===!0&&c.ga2()&&a.gb_()&&c.gb_()}},
v2:{"^":"a:3;",
$3:function(a,b,c){return Y.eY(a,c)}},
v3:{"^":"a:3;",
$3:function(a,b,c){return S.dR(a,c,C.m)}},
v0:{"^":"a:3;",
$3:function(a,b,c){return 0.7}},
v4:{"^":"a:3;",
$3:function(a,b,c){return S.dR(a,c,C.p)}},
v5:{"^":"a:0;",
$1:function(a){a.sah(C.f)
return a}}}],["","",,A,{"^":"",a0:{"^":"z;c,d,e,f,r,x,y,z,J:Q<,K:ch<,a0:cx<,h:cy<,O:db<,L:dx<,a6:dy<,af:fr<,b,a",
P:[function(a,b,c){var z,y,x,w
z=this.b
y=this.e
if(this.z){x=this.r.$3(a,b,z)
w=this.y.$3(a,b,z)
y.$5(a,b,c,z,x)
y=b.f
C.a.q(y,x)
C.a.q(y,w)}else y.$5(a,b,c,z,null)
return H.b(a.gh())+" fails to start a "+this.cy+" (defensible situation) at "+H.b(z.gh())},"$3","gM",6,0,1],
R:[function(a,b,c){var z,y,x,w
z=this.b
y=this.r.$3(a,b,z)
x=this.x.$3(a,b,z)
this.c.$5(a,b,c,z,y)
w=b.f
C.a.q(w,y)
C.a.q(w,x)
return H.b(a.gh())+" starts a "+this.cy+" (defensible situation) at "+H.b(z.gh())},"$3","gN",6,0,1],
I:function(a,b){var z=this.d
if(z!=null)return z.$3(a,b,this.b)
return 1},
G:function(a,b){return this.f.$3(a,b,this.b)}}}],["","",,M,{"^":"",
xv:[function(a){return new A.a0(M.eD(),null,null,new M.v6(),new M.v7(),new M.v8(),null,!0,"Jumping and tackling an opponent is one of the most risky moves but it's a quick way to neutralize someone.",!0,!0,"StartLeap",!1,null,"leap at <object>",null,a,null)},"$1","w3",2,0,4],
xw:[function(a){return new A.a0(M.eD(),new M.v9(),M.eD(),new M.va(),new M.vb(),new M.vc(),new M.vd(),!0,"Jumping and tackling an opponent is one of the most risky moves but it's a quick way to neutralize someone.",!0,!0,"StartLeapPlayer",!0,C.c,"leap at <object>","will <subject> tackle <objectPronoun>?",a,null)},"$1","w4",2,0,4],
xx:[function(a,b,c,d,e){if(a.ga2()){a.hq(c,"<subject> roll<s>",e.gi())
a.hq(c,"<subject> put<s> <subject's> feet under <subjectPronounAccusative>",e.gi())}a.kQ(c,"<subject> {leap<s>|jump<s>|spring<s>|launch<es> <subjectPronounSelf>|lunge<s>} at <object>",e.gi(),d)},"$5","eD",10,0,8],
v6:{"^":"a:3;",
$3:function(a,b,c){return a.gH()!==!0&&!c.ga2()&&!A.dk(a,b)}},
v7:{"^":"a:3;",
$3:function(a,b,c){return F.fo(a,c)}},
v8:{"^":"a:3;",
$3:function(a,b,c){return V.dG(a,c,C.l)}},
va:{"^":"a:3;",
$3:function(a,b,c){return a.gH()===!0&&!c.ga2()&&!A.dk(a,b)}},
vb:{"^":"a:3;",
$3:function(a,b,c){return F.fo(a,c)}},
vc:{"^":"a:3;",
$3:function(a,b,c){return V.dG(a,c,C.m)}},
v9:{"^":"a:3;",
$3:function(a,b,c){return a.ga4()?0.4:0.2}},
vd:{"^":"a:3;",
$3:function(a,b,c){return V.dG(a,c,C.p)}}}],["","",,U,{"^":"",
xy:[function(a){return new A.a0(U.eE(),null,null,new U.ve(),new U.vf(),new U.vg(),null,!0,"Punching someone hard enough can cause them to lose their footing. And it hurts.",!0,!0,"StartPunch",!1,null,"punch <object>",null,a,null)},"$1","w5",2,0,4],
xz:[function(a){return new A.a0(U.eE(),new U.vh(),U.eE(),new U.vi(),new U.vj(),new U.vk(),new U.vl(),!0,"Punching someone hard enough can cause them to lose their footing. And it hurts.",!0,!0,"StartPunchPlayer",!0,C.c,"punch <object>","will <subject> hit <objectPronoun>?",a,null)},"$1","w6",2,0,4],
xA:[function(a,b,c,d,e){c.jn(0,"<subject> {thrust<s>|swing<s>} <subject's> fist at <object>",e.gi(),!0,d,a)},"$5","eE",10,0,8],
ve:{"^":"a:3;",
$3:function(a,b,c){var z
if(a.gH()!==!0)z=(a.ga4()||a.dy===C.h)&&!c.ga2()&&a.gb_()
else z=!1
return z}},
vf:{"^":"a:3;",
$3:function(a,b,c){return Q.fL(a,c)}},
vg:{"^":"a:3;",
$3:function(a,b,c){return Z.dZ(a,c,C.l)}},
vi:{"^":"a:3;",
$3:function(a,b,c){var z
if(a.gH()===!0)z=(a.ga4()||a.dy===C.h)&&!c.ga2()&&a.gb_()
else z=!1
return z}},
vj:{"^":"a:3;",
$3:function(a,b,c){return Q.fL(a,c)}},
vk:{"^":"a:3;",
$3:function(a,b,c){return Z.dZ(a,c,C.m)}},
vh:{"^":"a:3;",
$3:function(a,b,c){return 0.7}},
vl:{"^":"a:3;",
$3:function(a,b,c){return Z.dZ(a,c,C.p)}}}],["","",,G,{"^":"",
xB:[function(a){return new A.a0(G.eF(),null,null,new G.vo(),new G.vp(),new G.vq(),null,!0,"The basic swordfighting move is also often the most effective.",!0,!0,"StartSlash",!1,null,"swing at <object>",null,a,null)},"$1","w7",2,0,4],
xG:[function(a){return new A.a0(G.eF(),new G.vz(),G.eF(),new G.vA(),new G.vB(),new G.vC(),new G.vD(),!0,"The basic swordfighting move is also often the most effective.",!0,!0,"StartSlashPlayer",!0,C.c,"swing at <object>","will <subject> hit <objectPronoun>?",a,null)},"$1","w8",2,0,4],
xH:[function(a,b,c,d,e){return a.dJ(c,"<subject> swing<s> {"+H.b(U.a8(a))+" |}at <object>",e.gi(),!0,d)},"$5","eF",10,0,8],
vo:{"^":"a:3;",
$3:function(a,b,c){return a.gH()!==!0&&a.ga4()&&!c.ga2()&&a.e.gbf()}},
vp:{"^":"a:3;",
$3:function(a,b,c){return M.bc(a,c)}},
vq:{"^":"a:3;",
$3:function(a,b,c){return L.aO(a,c,C.l)}},
vA:{"^":"a:3;",
$3:function(a,b,c){return a.gH()===!0&&a.ga4()&&!c.ga2()&&a.e.gbf()}},
vB:{"^":"a:3;",
$3:function(a,b,c){return M.bc(a,c)}},
vC:{"^":"a:3;",
$3:function(a,b,c){return L.aO(a,c,C.m)}},
vz:{"^":"a:3;",
$3:function(a,b,c){return 0.7-(c.gan()!=null?0.2:0)}},
vD:{"^":"a:3;",
$3:function(a,b,c){return L.aO(a,c,C.p)}}}],["","",,R,{"^":"",
xC:[function(a,b,c,d,e){return a.hs(c,"<subject> completely miss<es> <object> with "+H.b(U.a8(a)),!0,d)},"$5","iB",10,0,11],
xD:[function(a){return new A.a0(R.iC(),new R.vr(),R.iB(),new R.vs(),new R.vt(),new R.vu(),null,!1,"It's always better to fight with your feet firmly on the ground. But sometimes, it's necessary to act quickly.",!0,!0,"StartSlashOutOfBalance",!1,null,"swing at <object> (while out of balance)",null,a,null)},"$1","w9",2,0,4],
xE:[function(a){return new A.a0(R.iC(),new R.vv(),R.iB(),new R.vw(),new R.vx(),new R.vy(),null,!1,"It's always better to fight with your feet firmly on the ground. But sometimes, it's necessary to act quickly.",!0,!0,"StartSlashOutOfBalancePlayer",!1,null,"swing at <object> (while out of balance)",null,a,null)},"$1","wa",2,0,4],
xF:[function(a,b,c,d,e){return a.dJ(c,"<subject> swing<s> {"+H.b(U.a8(a))+" |}at <object>",e.gi(),!0,d)},"$5","iC",10,0,8],
vs:{"^":"a:3;",
$3:function(a,b,c){return a.gH()!==!0&&a.gap()&&!c.ga2()&&a.e.gbf()}},
vt:{"^":"a:3;",
$3:function(a,b,c){return M.bc(a,c)}},
vu:{"^":"a:3;",
$3:function(a,b,c){return L.aO(a,c,C.l)}},
vr:{"^":"a:3;",
$3:function(a,b,c){return 0.7}},
vw:{"^":"a:3;",
$3:function(a,b,c){return a.gH()===!0&&a.gap()&&!c.ga2()&&a.e.gbf()}},
vx:{"^":"a:3;",
$3:function(a,b,c){return M.bc(a,c)}},
vy:{"^":"a:3;",
$3:function(a,b,c){return L.aO(a,c,C.m)}},
vv:{"^":"a:3;",
$3:function(a,b,c){return 0.5-(c.gan()!=null?0.2:0)}}}],["","",,D,{"^":"",
xI:[function(a){return new A.a0(D.eG(),null,null,new D.vE(),new D.vF(),new D.vG(),null,!0,"Opponents on the ground are often the most vulnerable.",!0,!0,"StartStrikeDown",!1,null,"strike down at <object>",null,a,null)},"$1","wb",2,0,4],
xJ:[function(a){return new A.a0(D.eG(),new D.vH(),D.eG(),new D.vI(),new D.vJ(),new D.vK(),new D.vL(),!0,"Opponents on the ground are often the most vulnerable.",!0,!0,"StartStrikeDownPlayer",!0,C.c,"strike down at <object>","will <subject> hit?",a,null)},"$1","wc",2,0,4],
xK:[function(a,b,c,d,e){return a.ae(c,"<subject> strike<s> down {with "+H.b(U.a8(a))+" |}at <object>",d)},"$5","eG",10,0,11],
vE:{"^":"a:3;",
$3:function(a,b,c){return a.gH()!==!0&&c.ga2()&&!a.ga2()&&a.e.gbf()}},
vF:{"^":"a:3;",
$3:function(a,b,c){return D.d4(a,c)}},
vG:{"^":"a:3;",
$3:function(a,b,c){return V.bH(a,c,C.l)}},
vI:{"^":"a:3;",
$3:function(a,b,c){return a.gH()===!0&&c.ga2()&&!a.ga2()&&a.e.gbf()}},
vJ:{"^":"a:3;",
$3:function(a,b,c){return D.d4(a,c)}},
vK:{"^":"a:3;",
$3:function(a,b,c){return V.bH(a,c,C.m)}},
vH:{"^":"a:3;",
$3:function(a,b,c){var z,y
z=a.gap()?0.2:0
y=c.gan()!=null?0.2:0
return 0.7-z-y}},
vL:{"^":"a:3;",
$3:function(a,b,c){return V.bH(a,c,C.p)}}}],["","",,A,{"^":"",
xL:[function(a){return new A.a0(A.eH(),null,null,new A.vM(),new A.vN(),new A.vO(),null,!0,"The basic move with a spear.",!0,!0,"StartThrustSpear",!1,null,"thrust at <object>",null,a,null)},"$1","wd",2,0,4],
xP:[function(a){return new A.a0(A.eH(),new A.vX(),A.eH(),new A.vY(),new A.vZ(),new A.w_(),new A.w0(),!0,"The basic move with a spear.",!0,!0,"StartThrustSpearPlayer",!0,C.c,"thrust at <object>","will <subject> hit <objectPronoun>?",a,null)},"$1","we",2,0,4],
xQ:[function(a,b,c,d,e){return a.dJ(c,"<subject> thrust<s> {"+H.b(U.a8(a))+" |}at <object>",e.gi(),!0,d)},"$5","eH",10,0,8],
vM:{"^":"a:3;",
$3:function(a,b,c){return a.gH()!==!0&&a.ga4()&&!c.ga2()&&a.e instanceof Z.aE}},
vN:{"^":"a:3;",
$3:function(a,b,c){return M.bc(a,c)}},
vO:{"^":"a:3;",
$3:function(a,b,c){return L.aO(a,c,C.l)}},
vY:{"^":"a:3;",
$3:function(a,b,c){return a.gH()===!0&&a.ga4()&&!c.ga2()&&a.e instanceof Z.aE}},
vZ:{"^":"a:3;",
$3:function(a,b,c){return M.bc(a,c)}},
w_:{"^":"a:3;",
$3:function(a,b,c){return L.aO(a,c,C.m)}},
vX:{"^":"a:3;",
$3:function(a,b,c){return 0.7-(c.gan()!=null?0.2:0)}},
w0:{"^":"a:3;",
$3:function(a,b,c){return L.aO(a,c,C.p)}}}],["","",,O,{"^":"",
xM:[function(a){return new A.a0(O.eI(),null,null,new O.vP(),new O.vQ(),new O.vR(),null,!0,"Opponents on the ground are often the most vulnerable.",!0,!0,"StartThrustSpearDown",!1,null,"thrust down at <object>",null,a,null)},"$1","wf",2,0,4],
xN:[function(a){return new A.a0(O.eI(),new O.vS(),O.eI(),new O.vT(),new O.vU(),new O.vV(),new O.vW(),!0,"Opponents on the ground are often the most vulnerable.",!0,!0,"StartThrustSpearDownPlayer",!0,C.c,"thrust down at <object>","will <subject> hit?",a,null)},"$1","wg",2,0,4],
xO:[function(a,b,c,d,e){return a.ae(c,"<subject> thrust<s> down {with "+H.b(U.a8(a))+" |}at <object>",d)},"$5","eI",10,0,11],
vP:{"^":"a:3;",
$3:function(a,b,c){return a.gH()!==!0&&c.ga2()&&!a.ga2()&&a.e instanceof Z.aE}},
vQ:{"^":"a:3;",
$3:function(a,b,c){return D.d4(a,c)}},
vR:{"^":"a:3;",
$3:function(a,b,c){return V.bH(a,c,C.l)}},
vT:{"^":"a:3;",
$3:function(a,b,c){return a.gH()===!0&&c.ga2()&&!a.ga2()&&a.e instanceof Z.aE}},
vU:{"^":"a:3;",
$3:function(a,b,c){return D.d4(a,c)}},
vV:{"^":"a:3;",
$3:function(a,b,c){return V.bH(a,c,C.m)}},
vS:{"^":"a:3;",
$3:function(a,b,c){var z,y
z=a.gap()?0.2:0
y=c.gan()!=null?0.2:0
return 0.7-z-y}},
vW:{"^":"a:3;",
$3:function(a,b,c){return V.bH(a,c,C.p)}}}],["","",,E,{"^":"",p9:{"^":"cb;a0:c<,b,a",
ga6:function(){return"pick up <object>"},
gJ:function(){return"A shield makes a huge difference in battle."},
gK:function(){return!1},
gh:function(){return"TakeDroppedShield"},
gO:function(){return!1},
gL:function(){return},
P:[function(a,b,c){throw H.c(new P.W(null))},"$3","gM",6,0,1],
R:[function(a,b,c){var z,y
z=b.f
y=z.length!==0?C.a.gv(z):null
b.c0(y.gi(),y.a1(new E.pa(this)))
b.X(a.gi(),new E.pb(this))
z=this.b
a.ae(c,"<subject> pick<s> <object> up",z)
return H.b(a.gh())+" picks up "+H.b(z.gh())},"$3","gN",6,0,1],
ac:function(a,b){return H.i(new P.W(null))},
I:function(a,b){return 1},
G:function(a,b){if(!(this.b instanceof E.bq))return!1
a.gfQ()
if(a.d!=null)return!1
return!0},
u:{
x4:[function(a){return new E.p9(!0,a,null)},"$1","wm",2,0,17]}},pa:{"^":"a:14;a",
$1:function(a){a.gbk().a3(0,this.a.b)
return a}},pb:{"^":"a:0;a",
$1:function(a){a.san(H.H(this.a.b,"$isbq"))}}}],["","",,M,{"^":"",pc:{"^":"cb;a0:c<,b,a",
ga6:function(){return"pick up <object>"},
gJ:function(){return"A different weapon might change the battle."},
gK:function(){return!1},
gh:function(){return"TakeDroppedWeapon"},
gO:function(){return!1},
gL:function(){return},
P:[function(a,b,c){throw H.c(new P.W(null))},"$3","gM",6,0,1],
R:[function(a,b,c){var z,y
z=b.f
y=z.length!==0?C.a.gv(z):null
b.c0(y.gi(),y.a1(new M.pd(this)))
b.X(a.gi(),new M.pe(this,a))
z=this.b
a.ae(c,"<subject> pick<s> <object> up",z)
return H.b(a.gh())+" picks up "+H.b(z.gh())},"$3","gN",6,0,1],
ac:function(a,b){return H.i(new P.W(null))},
I:function(a,b){return 1},
G:function(a,b){var z,y,x
z=this.b
y=J.o(z)
if(!y.$isaQ)return!1
if(!!y.$isaE)return!1
a.gfQ()
z=z.gab()
y=a.e.gab()
if(typeof y!=="number")return H.w(y)
if(z<=y)return!1
x=b.c4("DisarmKick",a,!0)
if(x!=null&&x<=2)return!1
return!0},
u:{
x5:[function(a){return new M.pc(!0,a,null)},"$1","wn",2,0,17]}},pd:{"^":"a:14;a",
$1:function(a){a.gbk().a3(0,this.a.b)
return a}},pe:{"^":"a:0;a,b",
$1:function(a){if(!this.b.gb_())a.gay().q(0,a.gT())
a.sT(H.H(this.a.b,"$isaQ"))}}}],["","",,D,{"^":"",pl:{"^":"z;K:c<,a0:d<,J:e<,O:f<,L:r<,b,a",
ga6:function(){return"throw spear at <object>"},
gh:function(){return"ThrowSpear"},
gaf:function(){return"will <subject> hit <object>?"},
P:[function(a,b,c){var z,y
z=this.fp(a)
y=this.b
a.ae(c,"<subject> {throw<s>|hurl<s>|cast<s>} "+H.b(z.gaG()===!0?z.gh():"<subject's> "+H.b(z.gh()))+" at <object>",y)
if(y.gan()!=null)y.kS(c,"<subject> deflects it with <subject's> <object>",!0,y.gan(),!0)
else y.eT(c,"<subject> {dodge<s> it|move<s> out of the way}",!0,!0)
z.ad(c,"<subject> {drive<s>|plunge<s>|ram<s>|thrust<s>} into the "+H.b(U.bz(b))+" {|nearby|not far from here}")
this.fC(b,a,z)
return H.b(a.gh())+" fails to hit "+H.b(y.gh())+" with spear"},"$3","gM",6,0,1],
R:[function(a,b,c){var z,y,x,w,v,u
z=this.fp(a)
y=this.b
a.ae(c,"<subject> {throw<s>|hurl<s>|cast<s>} "+H.b(z.gaG()===!0?z.gh():"<subject's> "+H.b(z.gh()))+" at <object>",y)
if(y.gan()!=null)z.dK(c,"<subject> fl<ies> past <object-owner's> <object>",y.gan(),y,a,!0)
b.X(y.gi(),new D.pp(z))
x=!b.Y(y.gi()).gaZ()&&y.gi()!==100
w=[P.r]
if(!x){v=S.bM("{shoulder|{left|right} arm|{left|right} thigh}")
u=a.gb3()
w=H.p([],w)
z.dK(c,"<subject> {pierce<s>|ram<s> into|drill<s> through} <object-owner's> <object>",new Y.aN(!1,v,w,u==null?$.$get$aY():u,!1,C.n),y,a,!0)
N.b4(c,y)}else{v=S.bM("{chest|eye|neck}")
u=a.gb3()
w=H.p([],w)
z.dK(c,"<subject> {pierce<s>|ram<s> into|drill<s> through} <object-owner's> <object>",new Y.aN(!1,v,w,u==null?$.$get$aY():u,!1,C.n),y,a,!0)
N.bi(c,b,y)}this.fC(b,a,z)
return H.b(a.gh())+" hits "+H.b(y.gh())+" with spear"},"$3","gN",6,0,1],
I:function(a,b){return 0.6-(this.b.gan()!=null?0.2:0)},
G:function(a,b){var z
if(a.gH()===!0)if(a.ga4())z=(C.a.a7(a.e.geZ(),C.r)||a.h7(C.r))&&J.e(b.at("FightSituation").gU(),0)
else z=!1
else z=!1
return z},
fp:function(a){var z,y
if(a.gT()!=null&&a.gT() instanceof Z.aE)return a.gT()
for(z=a.gay(),z=z.ga_(z);z.t();){y=z.d
if(y instanceof Z.aE)return y}throw H.c(new P.x("No spear found in "+a.k(0)))},
fC:function(a,b,c){var z,y
z=a.at("FightSituation")
if(J.e(b.gT(),c)){y=b.jV()
if(y==null)y=$.$get$dg()
a.X(b.y,new D.pm(y))}else a.X(b.gi(),new D.pn(c))
a.c0(z.gi(),z.a1(new D.po(c)))},
u:{
x7:[function(a){return new D.pl(!0,!0,"The enemy is far enough for you to throw a spear at them and ready your other weapon before they close in.",!0,C.c,a,null)},"$1","wq",2,0,4]}},pp:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gag()
y=this.a.gbz()
if(typeof z!=="number")return z.aq()
a.sag(z-y)
return a}},pm:{"^":"a:0;a",
$1:function(a){var z=this.a
a.sT(z)
a.gay().a3(0,z)
return a}},pn:{"^":"a:0;a",
$1:function(a){a.gay().a3(0,this.a)
return a}},po:{"^":"a:0;a",
$1:function(a){a.gbk().q(0,this.a)
return a}}}],["","",,M,{"^":"",px:{"^":"af;J:b<,O:c<,L:d<,K:e<,a0:f<,a",
gV:function(){return"Regain clarity."},
gh:function(){return"Unconfuse"},
P:[function(a,b,c){throw H.c(new P.W(null))},"$3","gM",6,0,1],
R:[function(a,b,c){a.ad(c,"<subject> shake<s> <subject's> head violently")
if(a.gH()===!0)c.q(0,"the {horrible|terrible} spell seems to recede")
a.kR(c,"<subject's> eyes regain focus and clarity",!0,!0)
return H.b(a.gh())+" regains clarity"},"$3","gN",6,0,1],
ac:function(a,b){return"WARNING this shouldn't be user-visible"},
I:function(a,b){return 1},
G:function(a,b){var z
if(a.eK(b)){z=b.c4("Confuse",a,!0)
if(typeof z!=="number")return z.bo()
z=z>4}else z=!1
return z}}}],["","",,R,{"^":"",lm:{"^":"z;J:c<,K:d<,a0:e<,O:f<,L:r<,b,a",
gh:function(){return"FinishBreakNeck"},
ga6:function(){return""},
gaf:function(){return"(WARNING should not be user-visible)"},
P:[function(a,b,c){throw H.c(new P.W(null))},"$3","gM",6,0,1],
R:[function(a,b,c){var z=this.b
b.X(z.gi(),new R.ln())
if(J.e(z.gi(),100)){a.bn(c,"<subject> smash<es> <object's> head to the ground",z,!0)
N.b4(c,z)}else{a.bn(c,"<subject> break<s> <object's> neck",z,!0)
N.bi(c,b,z)}return H.b(a.gh())+" breaks "+H.b(z.gh())+"'s neck on ground"},"$3","gN",6,0,1],
I:function(a,b){return 1},
G:function(a,b){return!0},
u:{
wH:[function(a){return new R.lm(null,!0,!0,!0,C.c,a,null)},"$1","u3",2,0,4]}},ln:{"^":"a:0;",
$1:function(a){a.sag(0)
return a}}}],["","",,Y,{"^":"",
eY:function(a,b){var z=new Y.dr(null,null,null,null,null)
new Y.ty(a,b).$1(z)
return z.p()},
eX:{"^":"ac;",
gaD:function(){return[R.u3()]},
gh:function(){return"BreakNeckOnGroundSituation"},
aw:function(){var z=new Y.dr(null,null,null,null,null)
z.m(this)
new Y.jP().$1(z)
return z.p()},
aU:function(a,b){if(a===0)return b.Y(this.a)
return},
b4:function(a,b){return new H.K(a,new Y.jQ(this),[H.m(a,0)])}},
ty:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a7().ao(1073741823)
a.gb7().c=z
a.gb7().e=0
z=this.a.gi()
a.gb7().b=z
z=this.b.gi()
a.gb7().d=z
return a}},
jP:{"^":"a:0;",
$1:function(a){var z=a.gb7().e
if(typeof z!=="number")return z.ai()
a.gb7().e=z+1
return a}},
jQ:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.e(a.gi(),z.a)||J.e(a.gi(),z.c)}},
pN:{"^":"eX;a,i:b<,c,U:d<",
a1:function(a){var z=new Y.dr(null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
w:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof Y.eX))return!1
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
dr:{"^":"d;a,b,c,d,e",
gi:function(){return this.gb7().c},
gU:function(){return this.gb7().e},
gb7:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
m:function(a){this.a=a},
p:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gb7().b
x=this.gb7().c
w=this.gb7().d
v=this.gb7().e
z=new Y.pN(y,x,w,v)
if(y==null)H.i(P.l("attacker"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("target"))
if(v==null)H.i(P.l("time"))}this.m(z)
return z}}}],["","",,Z,{"^":"",l4:{"^":"z;J:c<,K:d<,a0:e<,O:f<,L:r<,b,a",
ga6:function(){return"evade"},
gh:function(){return"EvadeNeckBreaking"},
gaf:function(){return"will <subject> evade?"},
P:[function(a,b,c){a.ad(c,"<subject> tr<ies> to {dodge it|break free}")
S.a5(new Z.l5(a,c),new Z.l6(this,a,c),null,null)
b.az()
return H.b(a.gh())+" fails to dodge "+H.b(this.b.gh())},"$3","gM",6,0,1],
R:[function(a,b,c){var z=this.b
a.bn(c,"<subject> {dodge<s> it|break<s> free}",z,!0)
b.b1("FightSituation")
return H.b(a.gh())+" evades "+H.b(z.gh())},"$3","gN",6,0,1],
I:function(a,b){var z
if(a.gH()===!0)return 0.6
z=b.f
return(z.length!==0?C.a.gv(z):null).gb2().b0(0.5)},
G:function(a,b){return!0},
u:{
wG:[function(a){return new Z.l4("This looks dangerous. Trying to evade this close-quarter move seems prudent.",!1,!1,!0,C.c,a,null)},"$1","u0",2,0,4]}},l5:{"^":"a:2;a,b",
$0:function(){return this.a.al(this.b,"<subject> {can't|fail<s>}",!0)}},l6:{"^":"a:2;a,b,c",
$0:function(){return this.a.b.bQ(this.c,"<subject> <is> too quick for <object>",!0,this.b)}}}],["","",,S,{"^":"",
dR:function(a,b,c){var z=new S.dQ(null,null,null,null,null,null)
new S.tx(a,b,c).$1(z)
return z.p()},
fB:{"^":"c6;",
gaD:function(){return[Z.u0()]},
gh:function(){return"OnGroundWrestleDefenseSituation"},
aw:function(){var z=new S.dQ(null,null,null,null,null,null)
z.m(this)
new S.mQ().$1(z)
return z.p()}},
tx:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$a7().ao(1073741823)
a.gaM().c=z
a.gaM().f=0
z=this.a.gi()
a.gaM().b=z
z=this.b.gi()
a.gaM().e=z
a.gaM().d=this.c
return a}},
mQ:{"^":"a:0;",
$1:function(a){var z=a.gaM().f
if(typeof z!=="number")return z.ai()
a.gaM().f=z+1
return a}},
pX:{"^":"fB;cM:a<,i:b<,cq:c<,cs:d<,U:e<",
a1:function(a){var z=new S.dQ(null,null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
w:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof S.fB))return!1
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
dQ:{"^":"d;a,b,c,d,e,f",
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
z=new S.pX(y,x,w,v,u)
if(y==null)H.i(P.l("attacker"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("predeterminedResult"))
if(v==null)H.i(P.l("target"))
if(u==null)H.i(P.l("time"))}this.m(z)
return z}}}],["","",,A,{"^":"",
dk:function(a,b){var z,y,x,w
z=b.c4("KickToGround",a,!0)
if(z!=null&&z<=2)return!0
y=b.c4("Pound",a,!0)
if(y!=null&&y<=2)return!0
x=b.c4("FinishPunch",a,!0)
if(x!=null&&x<=2)return!0
w=b.c4("FinishLeap",a,!0)
if(w!=null&&w<=2)return!0
return!1}}],["","",,U,{"^":"",
c_:function(a){return a.gan().gaG()===!0?a.gan().gh():"<subject's> "+H.b(a.gan().gh())},
a8:function(a){return a.gT().gaG()===!0?a.gT().gh():"<subject's> "+H.b(a.gT().gh())}}],["","",,G,{"^":"",
xg:[function(a,b,c,d,e){a.ad(c,"<subject> tr<ies> to swing back")
a.eS(c,"<subject> {go<es> wide|miss<es>}",!0,!0)
if(a.ga4()){b.X(a.y,new G.tI())
a.c1(c,"<subject> lose<s> balance because of that",!0,!0)}else if(a.dy===C.h){b.X(a.y,new G.tJ())
a.aA(c,"<subject> lose<s> balance because of that",!0)
a.c1(c,"<subject> fall<s> to the ground",!0,!0)}},"$5","i6",10,0,11],
xh:[function(a){return new A.a0(G.i7(),new G.tK(),G.i6(),new G.tL(),new G.tM(),new G.tN(),null,!1,"You can deal serious damage when countering because your opponent is often caught off guard. On the other hand, counters require fast reaction and could throw you out of balance.",!0,!0,"CounterSlash",!1,null,"swing back at <object>",null,a,null)},"$1","tS",2,0,4],
xj:[function(a,b,c,d,e){return a.ae(c,"<subject> swing<s> back",d)},"$5","i7",10,0,8],
xi:[function(a){return new A.a0(G.i7(),new G.tO(),G.i6(),new G.tP(),new G.tQ(),new G.tR(),null,!1,"You can deal serious damage when countering because your opponent is often caught off guard. On the other hand, counters require fast reaction and could throw you out of balance.",!0,!0,"CounterSlashPlayer",!0,C.c,"swing back at <object>","will <subject> hit <objectPronoun>?",a,null)},"$1","tT",2,0,4],
tI:{"^":"a:0;",
$1:function(a){a.sah(C.h)
return a}},
tJ:{"^":"a:0;",
$1:function(a){a.sah(C.f)
return a}},
tL:{"^":"a:3;",
$3:function(a,b,c){return a.gH()!==!0&&a.gT().gbf()&&!a.ga2()}},
tM:{"^":"a:3;",
$3:function(a,b,c){return M.bc(a,c)}},
tN:{"^":"a:3;",
$3:function(a,b,c){return L.aO(a,c,C.l)}},
tK:{"^":"a:3;",
$3:function(a,b,c){return c.ga4()?0.7:0.9}},
tP:{"^":"a:3;",
$3:function(a,b,c){return a.gH()===!0&&a.gT().gbf()&&!a.ga2()}},
tQ:{"^":"a:3;",
$3:function(a,b,c){return M.bc(a,c)}},
tR:{"^":"a:3;",
$3:function(a,b,c){return L.aO(a,c,C.m)}},
tO:{"^":"a:3;",
$3:function(a,b,c){return c.ga4()?0.7:0.9}}}],["","",,V,{"^":"",k9:{"^":"z;J:c<,K:d<,a0:e<,O:f<,L:r<,b,a",
ga6:function(){return"tackle <object>"},
gh:function(){return"CounterTackle"},
gaf:function(){return"will <subject> tackle <objectPronoun>?"},
P:[function(a,b,c){var z=this.b
a.ae(c,"<subject> tr<ies> to tackle <object>",z)
S.a5(new V.ka(a,c),new V.kb(this,c),null,null)
a.ae(c,"<subject> land<s> on the "+H.b(U.bz(b))+" next to <object>",z)
b.X(a.gi(),new V.kc())
return H.b(a.gh())+" fails to tackle "+H.b(z.gh())},"$3","gM",6,0,1],
R:[function(a,b,c){var z=this.b
a.ae(c,"<subject> tackle<s> <object> to the ground",z)
b.X(z.gi(),new V.kd())
b.X(a.gi(),new V.ke())
return H.b(a.gh())+" tackles "+H.b(z.gh())},"$3","gN",6,0,1],
I:function(a,b){var z=this.b.gap()?0.2:0
if(a.gH()===!0)return 0.7+z
return 0.5+z},
G:function(a,b){return!a.ga2()&&a.e instanceof K.ca},
u:{
wz:[function(a){return new V.k9("When an opponent misses you like that, it's a rare (though still dangerous) opportunity to bring them down.",!0,!0,!0,C.c,a,null)},"$1","tU",2,0,4]}},ka:{"^":"a:2;a,b",
$0:function(){return this.a.al(this.b,"<subject> go<es> wide",!0)}},kb:{"^":"a:2;a,b",
$0:function(){return this.a.b.al(this.b,"<subject> {evade<s>|sidestep<s>} it",!0)}},kc:{"^":"a:0;",
$1:function(a){a.sah(C.f)
return a}},kd:{"^":"a:0;",
$1:function(a){a.sah(C.f)
return a}},ke:{"^":"a:0;",
$1:function(a){a.sah(C.f)
return a}}}],["","",,S,{"^":"",
c4:function(a,b){var z=new S.du(null,null,null,null,null)
new S.tq(a,b).$1(z)
return z.p()},
f3:{"^":"ac;",
gaD:function(){return[G.tS(),G.tT(),V.tU()]},
gbN:function(){return[$.$get$dT()]},
gh:function(){return"CounterAttackSituation"},
aw:function(){var z=new S.du(null,null,null,null,null)
z.m(this)
new S.k7().$1(z)
return z.p()},
aU:function(a,b){if(a===0)return b.Y(this.a)
return},
b4:function(a,b){return new H.K(a,new S.k8(this),[H.m(a,0)])}},
tq:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a7().ao(1073741823)
a.gb8().c=z
a.gb8().e=0
z=this.a.gi()
a.gb8().b=z
z=this.b.gi()
a.gb8().d=z
return a}},
k7:{"^":"a:0;",
$1:function(a){var z=a.gb8().e
if(typeof z!=="number")return z.ai()
a.gb8().e=z+1
return a}},
k8:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.e(a.gi(),z.a)||J.e(a.gi(),z.c)}},
pO:{"^":"f3;a,i:b<,c,U:d<",
a1:function(a){var z=new S.du(null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
w:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof S.f3))return!1
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
du:{"^":"d;a,b,c,d,e",
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
z=new S.pO(y,x,w,v)
if(y==null)H.i(P.l("counterAttacker"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("target"))
if(v==null)H.i(P.l("time"))}this.m(z)
return z}}}],["","",,O,{"^":"",c6:{"^":"oj;",
gdC:function(){return 1000},
aU:function(a,b){if(a===0)return b.Y(this.gcs())
return},
b4:function(a,b){return new H.K(a,new O.kj(this),[H.m(a,0)])}},oj:{"^":"ac+nc;"},kj:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.e(a.gi(),z.gcM())||J.e(a.gi(),z.gcs())}}}],["","",,U,{"^":"",
bz:function(a){return a.at("FightSituation").gc7()},
cP:function(a,b,c,d,e){var z=new U.c9(null,null,null,null,null,null,null,null,null)
new U.tE(a,b,c,d,e).$1(z)
return z.p()},
cO:{"^":"ac;",
gaD:function(){return[N.tF(),V.tW(),R.uz(),Y.uK(),T.w1(),T.w2(),M.w3(),M.w4(),U.w5(),U.w6(),G.w7(),G.w8(),D.wb(),D.wc(),R.w9(),R.wa(),A.wd(),A.we(),O.wf(),O.wg(),E.wm(),M.wn(),D.wq()]},
gbN:function(){return H.p([$.$get$fO(),$.$get$h5(),$.$get$fS(),$.$get$hv()],[Q.af])},
gdC:function(){return 1000},
gh:function(){return"FightSituation"},
cN:function(a,b){var z=b.a
return(z&&C.a).bs(z,new U.l9(a))},
aw:function(){var z=new U.c9(null,null,null,null,null,null,null,null,null)
z.m(this)
new U.la().$1(z)
return z.p()},
aU:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j
z=X.i_(this.f,this.b)
y=H.bG(z,new U.lb(b),H.y(z,"A",0),null)
x=H.y(y,"A",0)
w=P.P(new H.K(y,new U.lc(),[x]),!1,x)
x=H.m(w,0)
v=P.P(new H.K(w,new U.ld(),[x]),!1,x)
u=v.length===1?C.a.gca(v):null
if(a===0)if(u!=null)return u
for(y=w.length,t=0,s=null,r=0;r<w.length;w.length===y||(0,H.ar)(w),++r){q=w[r]
x=b.d
p=x.aQ(0,new U.le(q),new U.lf())
o=p==null?p:p.gU()
if(o==null)o=-1
n=b.r
if(typeof o!=="number")return H.w(o)
m=n-o
if(m<=0)continue
l=x.aQ(0,new U.lg(q),new U.lh())
k=l==null?l:l.gU()
if(k==null)k=-1
x=b.r
if(typeof k!=="number")return H.w(k)
j=(x-k+m)/2
if(q.gH()===!0)j*=1.5
if(j>t){s=q
t=j}}return s},
b4:function(a,b){return new H.K(a,new U.li(this),[H.m(a,0)])},
hi:function(a,b){var z,y
z=this.x
y=this.c.a
if(y.aa(z))y.j(0,z).$2(a,b)},
dE:function(a){var z,y,x,w,v,u,t
z=this.r
if(z!=null&&!this.cN(a,this.b)&&this.cN(a,this.f)){y=a.f1(z)
a.c0(y.gi(),y.a1(new U.lj()))
for(z=this.f,x=z.a,x=new J.bj(x,x.length,0,null,[H.m(x,0)]),w=a.a;x.t();){v=x.d
if(a.Y(v).gaR()){u=a.Y(v)
t=u.a1(new U.lk())
w.a3(0,u)
w.q(0,t)}}C.a.q(a.f,X.mq(z,this.d,this.a,null))}else this.cN(a,this.f)},
dd:function(a){var z=this.f
if(this.cN(a,z))if(this.cN(a,this.b)){z=z.a
z=(z&&C.a).bs(z,new U.ll(a))}else z=!1
else z=!1
return z}},
tE:{"^":"a:0;a,b,c,d,e",
$1:function(a){var z,y
z=$.$get$a7().ao(1073741823)
a.gam().f=z
a.gam().y=0
z=a.gam()
y=z.r
if(y==null){y=new S.O(null,null,[P.t])
y.aj()
y.m(C.d)
z.r=y
z=y}else z=y
z.m(J.eP(this.a,new U.rm()))
z=a.gam()
y=z.c
if(y==null){y=new S.O(null,null,[P.t])
y.aj()
y.m(C.d)
z.c=y
z=y}else z=y
y=this.b
z.m(new H.ap(y,new U.rn(),[H.m(y,0),null]))
a.gam().e=this.c
y=new S.O(null,null,[U.ab])
y.aj()
y.m(C.d)
a.gam().b=y
y=this.d.gi()
a.gam().x=y
y=new A.cU(null,null,[P.t,{func:1,v:true,args:[A.ad,Y.a1]}])
y.ce()
y.m(this.e)
a.gam().d=y
return a}},
rm:{"^":"a:0;",
$1:function(a){return a.gi()}},
rn:{"^":"a:0;",
$1:function(a){return a.gi()}},
l9:{"^":"a:0;a",
$1:function(a){return this.a.Y(a).gaR()}},
la:{"^":"a:0;",
$1:function(a){var z=a.gam().y
if(typeof z!=="number")return z.ai()
a.gam().y=z+1
return a}},
lb:{"^":"a:0;a",
$1:function(a){return this.a.Y(a)}},
lc:{"^":"a:0;",
$1:function(a){return a.gaR()}},
ld:{"^":"a:0;",
$1:function(a){return a.gH()}},
le:{"^":"a:0;a",
$1:function(a){return J.e(a.gcZ(),this.a.gi())&&a.ghF()===!0}},
lf:{"^":"a:2;",
$0:function(){return}},
lg:{"^":"a:0;a",
$1:function(a){return J.e(a.gcZ(),this.a.gi())}},
lh:{"^":"a:2;",
$0:function(){return}},
li:{"^":"a:27;a",
$1:function(a){var z,y,x
if(a.gaR()){z=this.a
y=a.gi()
x=z.f.a
if(!(x&&C.a).a7(x,y)){y=a.gi()
z=z.b.a
y=(z&&C.a).a7(z,y)
z=y}else z=!0}else z=!1
return z}},
lj:{"^":"a:0;",
$1:function(a){a.skB(!1)
return a}},
lk:{"^":"a:0;",
$1:function(a){a.sah(C.k)
return a}},
ll:{"^":"a:29;a",
$1:function(a){var z=this.a.Y(a)
return z.gH()===!0&&z.gaR()}},
pQ:{"^":"cO;bk:a<,b,c,c7:d<,i:e<,cY:f<,r,U:x<",
a1:function(a){var z=new U.c9(null,null,null,null,null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
w:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof U.cO))return!1
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
c9:{"^":"d;a,b,c,d,e,f,r,x,y",
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
gcY:function(){var z,y
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
if(!(z==null)){y=new A.cU(null,null,[H.m(z,0),H.m(z,1)])
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
if(v==null){v=new A.cU(null,null,[P.t,{func:1,v:true,args:[A.ad,Y.a1]}])
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
z=new U.pQ(y,x,w,v,u,t,s,r)
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
z=b.at("FightSituation")
y=z.gc7()
b.c0(z.gi(),z.a1(new N.uA(c)))
if(c.gah()===C.f){c.aA(a,"<subject> stop<s> moving",!0)
a.A(0,"\n\n",!0)
return}switch($.$get$hR().ao(3)){case 0:c.c1(a,"<subject> collapse<s>, dead",!0,!0)
break
case 1:c.aA(a,"<subject> fall<s> backward",!0)
c.aA(a,"<subject> twist<s>",!0)
c.c1(a,"<subject> hit<s> the "+H.b(y)+" face down",!0,!0)
break
case 2:c.aA(a,"<subject> drop<s> to <subject's> knees",!0)
c.aA(a,"<subject> keel<s> over",!0)
break}a.A(0,"\n\n",!0)},
b4:function(a,b){if(J.e(b.gi(),100)&&b.gag()===0){N.rv(a,b)
return}b.aA(a,"<subject> {scream|yell|grunt}<s> in pain",!0)},
rv:function(a,b){if(b.gah()===C.f){b.aA(a,"<subject> stop<s> moving",!0)
a.A(0,"\n\n",!0)
return}b.aA(a,"<subject> drop<s> to <subject's> knees",!0)
b.aA(a,"<subject> keel<s> over",!0)
a.A(0,"\n\n",!0)},
uA:{"^":"a:0;a",
$1:function(a){var z=this.a
if(!z.gb_())a.gbk().q(0,z.e)
if(z.d!=null)a.gbk().q(0,z.d)
return a}}}],["","",,R,{"^":"",lo:{"^":"z;J:c<,K:d<,a0:e<,O:f<,L:r<,b,a",
gh:function(){return"FinishLeap"},
ga6:function(){return""},
gaf:function(){return"(WARNING should not be user-visible)"},
P:[function(a,b,c){throw H.c(new P.W(null))},"$3","gM",6,0,1],
R:[function(a,b,c){var z,y,x,w
z=this.b
b.X(z.gi(),new R.lp())
b.X(a.gi(),new R.lq())
y=b.at("LeapSituation").gi()
x=U.bz(b)
a.bR(c,"<subject> {ram<s>|smash<es>} into <object>",y,z,!0)
c.jk(0,"both "+(a.gH()===!0||z.gH()===!0?"of you":"")+" {land on|fall to} the "+H.b(x),y)
w=z.gag()
if(typeof w!=="number")return w.bo()
if(w>1){c.jl(0,"the impact almost {knocks <object> unconscious|knocks <object> out}",y,z)
N.b4(c,z)
b.X(z.gi(),new R.lr())}return H.b(a.gh())+" finishes leap at "+H.b(z.gh())},"$3","gN",6,0,1],
I:function(a,b){return 1},
G:function(a,b){return!0},
u:{
wI:[function(a){return new R.lo(null,!0,!0,!0,C.c,a,null)},"$1","u4",2,0,4]}},lp:{"^":"a:0;",
$1:function(a){a.sah(C.f)
return a}},lq:{"^":"a:0;",
$1:function(a){a.sah(C.f)
return a}},lr:{"^":"a:0;",
$1:function(a){var z=a.gag()
if(typeof z!=="number")return z.aq()
a.sag(z-1)
return a}}}],["","",,S,{"^":"",kv:{"^":"z;J:c<,K:d<,a0:e<,O:f<,L:r<,b,a",
ga6:function(){return"dodge"},
gh:function(){return"DodgeLeap"},
gaf:function(){return"will <subject> dodge?"},
P:[function(a,b,c){var z=b.at("LeapSituation").gi()
a.hr(c,"<subject> tr<ies> to {dodge|sidestep}",z,!0)
if(a.gap())a.c2(c,"<subject> <is> out of balance",z,!0,!0)
else S.a5(new S.kw(a,c,z),new S.kx(a,c,z),null,null)
b.az()
return H.b(a.db)+" fails to dodge "+H.b(this.b.gh())},"$3","gM",6,0,1],
R:[function(a,b,c){var z,y,x
z=b.at("LeapSituation").gi()
y=U.bz(b)
x=this.b
a.bR(c,"<subject> {dodge<s>|sidestep<s>} <object>",z,x,!0)
x.aA(c,"<subject> {crash<es> to|fall<s> to|hit<s>} the "+H.b(y),!0)
b.X(x.gi(),new S.ky())
b.b1("FightSituation")
return H.b(a.gh())+" dodges "+H.b(x.gh())},"$3","gN",6,0,1],
I:function(a,b){var z,y,x
z=a.ga4()?0:0.2
y=this.b.ga2()?0.2:0
if(a.ch===!0)return 0.8-z+y
x=b.f
return(x.length!==0?C.a.gv(x):null).gb2().b0(0.5-z+y)},
G:function(a,b){return!a.ga2()},
u:{
wC:[function(a){return new S.kv("Dodging means moving your body out of harm's way. When successful, your opponent will miss and will hit the ground beside you.",!1,!1,!0,C.c,a,null)},"$1","tX",2,0,4]}},kw:{"^":"a:2;a,b,c",
$0:function(){return this.a.c2(this.b,"<subject> {can't|fail<s>|<does>n't succeed}",this.c,!0,!0)}},kx:{"^":"a:2;a,b,c",
$0:function(){return this.a.c2(this.b,"<subject> {<is> too slow|<is>n't fast enough}",this.c,!0,!0)}},ky:{"^":"a:0;",
$1:function(a){a.sah(C.f)
return a}}}],["","",,D,{"^":"",lK:{"^":"z;J:c<,K:d<,a0:e<,O:f<,L:r<,b,a",
ga6:function(){return"impale"},
gh:function(){return"ImpaleLeaper"},
gaf:function(){return"will <subject> impale <objectPronoun>?"},
P:[function(a,b,c){var z,y
z=b.at("LeapSituation").gi()
y=this.b
a.dJ(c,"<subject> tr<ies> to {move|swing|shift} "+H.b(U.a8(a))+" between <subjectPronounSelf> and <object>",z,!0,y)
if(a.gap())a.c2(c,"<subject> <is> out of balance",z,!0,!0)
else S.a5(new D.lL(a,c,z),new D.lM(a,c,z),null,null)
b.az()
return H.b(a.db)+" fails to impale "+H.b(y.gh())},"$3","gM",6,0,1],
R:[function(a,b,c){var z,y
z=b.at("LeapSituation").gi()
y=this.b
a.bR(c,"<subject> {move<s>|swing<s>|shift<s>} "+H.b(U.a8(a))+" between <subjectPronounSelf> and <object>",z,y,!0)
y.aA(c,"<subject> {leap<s>|run<s>|lunge<s>} right into it",!0)
b.X(y.gi(),new D.lN())
if(!(!b.Y(y.gi()).gaZ()&&y.gi()!==100)){a.gT().ae(c,"<subject> {cut<s> into|pierce<s>|go<es> into} <object's> flesh",y)
y.ad(c,"<subject> fall<s> to the ground")
N.b4(c,y)}else{a.gT().ae(c,"<subject> {go<es> right through|completely impale<s>|bore<s> through} <object's> {body|chest|stomach|neck}",y)
y.aA(c,"<subject> go<es> down",!0)
N.bi(c,b,y)}b.b1("FightSituation")
return H.b(a.gh())+" impales "+H.b(y.gh())},"$3","gN",6,0,1],
I:function(a,b){var z,y,x
z=a.ga4()?0:0.2
y=this.b.ga2()?0.2:0
if(a.ch===!0)return 0.5-z+y
x=b.f
return(x.length!==0?C.a.gv(x):null).gb2().b0(0.4-z+y)},
G:function(a,b){return!a.ga2()&&a.e.geM()},
u:{
wO:[function(a){return new D.lK("You can move your weapon to point at the attacker. If successful, the weapon will pierce the attacker with the force of his own leap.",!1,!1,!0,C.c,a,null)},"$1","ur",2,0,4]}},lL:{"^":"a:2;a,b,c",
$0:function(){return this.a.c2(this.b,"<subject> {can't|fail<s>|<does>n't succeed}",this.c,!0,!0)}},lM:{"^":"a:2;a,b,c",
$0:function(){return this.a.c2(this.b,"<subject> {<is> too slow|<is>n't fast enough}",this.c,!0,!0)}},lN:{"^":"a:0;",
$1:function(a){var z=a.gag()
if(typeof z!=="number")return z.aq()
a.sag(z-1)
a.sah(C.f)
return a}}}],["","",,V,{"^":"",
dG:function(a,b,c){var z=new V.dF(null,null,null,null,null,null)
new V.tv(a,b,c).$1(z)
return z.p()},
fm:{"^":"c6;",
gaD:function(){return[S.tX(),D.ur()]},
gh:function(){return"LeapDefenseSituation"},
aw:function(){var z=new V.dF(null,null,null,null,null,null)
z.m(this)
new V.me().$1(z)
return z.p()}},
tv:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$a7().ao(1073741823)
a.gaI().c=z
a.gaI().f=0
z=this.a.gi()
a.gaI().b=z
z=this.b.gi()
a.gaI().e=z
a.gaI().d=this.c
return a}},
me:{"^":"a:0;",
$1:function(a){var z=a.gaI().f
if(typeof z!=="number")return z.ai()
a.gaI().f=z+1
return a}},
pS:{"^":"fm;cM:a<,i:b<,cq:c<,cs:d<,U:e<",
a1:function(a){var z=new V.dF(null,null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
w:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof V.fm))return!1
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
dF:{"^":"d;a,b,c,d,e,f",
gi:function(){return this.gaI().c},
gU:function(){return this.gaI().f},
gaI:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.f=z.e
this.a=null}return this},
m:function(a){this.a=a},
p:function(){var z,y,x,w,v,u
z=this.a
if(z==null){y=this.gaI().b
x=this.gaI().c
w=this.gaI().d
v=this.gaI().e
u=this.gaI().f
z=new V.pS(y,x,w,v,u)
if(y==null)H.i(P.l("attacker"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("predeterminedResult"))
if(v==null)H.i(P.l("target"))
if(u==null)H.i(P.l("time"))}this.m(z)
return z}}}],["","",,F,{"^":"",
fo:function(a,b){var z=new F.dH(null,null,null,null,null)
new F.tw(a,b).$1(z)
return z.p()},
fn:{"^":"ac;",
gaD:function(){return[R.u4()]},
gh:function(){return"LeapSituation"},
aw:function(){var z=new F.dH(null,null,null,null,null)
z.m(this)
new F.mf().$1(z)
return z.p()},
aU:function(a,b){if(a===0)return b.Y(this.a)
return},
b4:function(a,b){return new H.K(a,new F.mg(this),[H.m(a,0)])}},
tw:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a7().ao(1073741823)
a.gb9().c=z
a.gb9().e=0
z=this.a.gi()
a.gb9().b=z
z=this.b.gi()
a.gb9().d=z
return a}},
mf:{"^":"a:0;",
$1:function(a){var z=a.gb9().e
if(typeof z!=="number")return z.ai()
a.gb9().e=z+1
return a}},
mg:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.e(a.gi(),z.a)||J.e(a.gi(),z.c)}},
pT:{"^":"fn;a,i:b<,c,U:d<",
a1:function(a){var z=new F.dH(null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
w:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof F.fn))return!1
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
dH:{"^":"d;a,b,c,d,e",
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
z=new F.pT(y,x,w,v)
if(y==null)H.i(P.l("attacker"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("target"))
if(v==null)H.i(P.l("time"))}this.m(z)
return z}}}],["","",,Z,{"^":"",jx:{"^":"af;K:b<,a0:c<,O:d<,L:e<,a",
gV:function(){return""},
gJ:function(){return},
gh:function(){return"AutoLoot"},
P:[function(a,b,c){throw H.c(new P.W(null))},"$3","gM",6,0,1],
R:[function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=b.at("LootSituation")
y=b.Y(100)
if(y.gck()===!0&&!y.gaZ()){a.ae(c,"<subject> kneel<s> next to <object>",y)
a.ae(c,"<subject> help<s> <object> to <object's> feet",y)
y.dI(c,'"I\'ll live," <subject> say<s>.',!0)
b.X(100,new Z.jK())}x=[]
for(w=z.gbk(),w=w.ga_(w),v=b.a,u=null,t=null;w.t();){s=w.d
r=J.o(s)
if(!!r.$isaQ){q=s.gbI()
p=s.gbz()
o=s.gaG()?1:0
n=a.gT().gab()
if(typeof n!=="number")return H.w(n)
n=2+q+p+o>n
q=n}else q=!1
if(q){m=b.Y(a.gi())
l=m.a1(new Z.jL(a,s))
v.a3(0,m)
v.q(0,l)
u=s}else if(!!r.$isbq&&a.gan()==null){m=b.Y(a.gi())
l=m.a1(new Z.jM(s))
v.a3(0,m)
v.q(0,l)
t=s}else{m=b.Y(a.gi())
l=m.a1(new Z.jN(s))
v.a3(0,m)
v.q(0,l)
x.push(s)}}if(u!=null){a.ae(c,"<subject> pick<s> up <object>",u)
a.ae(c,"<subject> wield<s> <object>",u)}if(t!=null){a.ae(c,"<subject> pick<s> up <object>",t)
a.ae(c,"<subject> wield<s> <object>",t)}this.iC(x,a,z,b,c)
this.iB(x,a,z,b,c)
if(x.length!==0)c.jr("<subject> <also> take<s>",x,null,a)
return H.b(a.gh())+" auto-loots"},"$3","gN",6,0,1],
ac:function(a,b){return"WARNING this shouldn't be user-visible"},
I:function(a,b){return 1},
G:function(a,b){return a.gH()},
iC:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q
z=P.P(new H.K(a,new Z.jE(),[H.m(a,0)]),!0,L.aQ)
for(y=b.gay(),y=y.ga_(y);y.t();){x=y.d
if(x instanceof L.aQ)C.a.q(z,x)}if(z.length===0)return
C.a.cb(z,new Z.jF())
w=c.gcY().aF(0,new Z.jG(d)).dg(0,new Z.jH())
for(y=J.ai(w.a),v=new H.bR(y,w.b,[H.m(w,0)]),u=d.a;v.t();){t=y.gS()
if(z.length===0)break
s=C.a.hp(z)
r=d.Y(t.gi())
q=r.a1(new Z.jI(s))
u.a3(0,r)
u.q(0,q)
C.a.a3(a,s)
r=d.Y(b.gi())
q=r.a1(new Z.jJ(s))
u.a3(0,r)
u.q(0,q)
b.ae(e,"<subject> give<s> the "+H.b(s.gh())+" to <object>",t)}},
iB:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q
z=P.P(new H.K(a,new Z.jy(),[H.m(a,0)]),!0,E.bq)
for(y=b.gay(),y=y.ga_(y);y.t();){x=y.d
if(x instanceof E.bq)C.a.q(z,x)}if(z.length===0)return
C.a.cb(z,new Z.jz())
w=c.gcY().aF(0,new Z.jA(d)).dg(0,new Z.jB())
for(y=J.ai(w.a),v=new H.bR(y,w.b,[H.m(w,0)]),u=d.a;v.t();){t=y.gS()
if(z.length===0)break
s=C.a.hp(z)
r=d.Y(t.gi())
q=r.a1(new Z.jC(s))
u.a3(0,r)
u.q(0,q)
C.a.a3(a,s)
r=d.Y(b.gi())
q=r.a1(new Z.jD(s))
u.a3(0,r)
u.q(0,q)
b.ae(e,"<subject> give<s> the "+H.b(s.gh())+" to <object>",t)}}},jK:{"^":"a:0;",
$1:function(a){a.sah(C.h)
a.sag(1)
return a}},jL:{"^":"a:0;a,b",
$1:function(a){var z=this.a
if(!(z.gT() instanceof K.ca))a.gay().q(0,z.gT())
a.sT(this.b)}},jM:{"^":"a:0;a",
$1:function(a){var z=this.a
a.san(z)
return z}},jN:{"^":"a:0;a",
$1:function(a){a.gay().q(0,this.a)
return a}},jE:{"^":"a:0;",
$1:function(a){return a instanceof L.aQ}},jF:{"^":"a:6;",
$2:function(a,b){return J.bC(a.gab(),b.gab())}},jG:{"^":"a:0;a",
$1:function(a){return this.a.Y(a)}},jH:{"^":"a:0;",
$1:function(a){return a.gaR()&&a.gb_()}},jI:{"^":"a:0;a",
$1:function(a){a.sT(this.a)
return a}},jJ:{"^":"a:0;a",
$1:function(a){a.gay().a3(0,this.a)
return a}},jy:{"^":"a:0;",
$1:function(a){return a instanceof E.bq}},jz:{"^":"a:6;",
$2:function(a,b){return J.bC(a.gab(),b.gab())}},jA:{"^":"a:0;a",
$1:function(a){return this.a.Y(a)}},jB:{"^":"a:0;",
$1:function(a){return a.gaR()&&a.gan()==null}},jC:{"^":"a:0;a",
$1:function(a){a.san(this.a)
return a}},jD:{"^":"a:0;a",
$1:function(a){a.gay().a3(0,this.a)
return a}}}],["","",,X,{"^":"",
mq:function(a,b,c,d){var z=new X.dL(null,null,null,null,null,null)
new X.tm(a,b,c).$1(z)
return z.p()},
ft:{"^":"ac;",
gbN:function(){return H.p([$.$get$eU()],[Q.af])},
gh:function(){return"LootSituation"},
aw:function(){var z=new X.dL(null,null,null,null,null,null)
z.m(this)
new X.ms().$1(z)
return z.p()},
aU:function(a,b){if(typeof a!=="number")return a.bo()
if(a>0)return
return this.fq(b.a)},
b4:function(a,b){return[this.fq(a)]},
dd:function(a){return!0},
fq:function(a){return a.cj(0,new X.mr())}},
tm:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$a7().ao(1073741823)
a.gau().e=z
a.gau().f=0
a.gau().c=this.b
z=new S.O(null,null,[P.t])
z.aj()
z.m(this.a)
a.gau().d=z
z=new S.O(null,null,[U.ab])
z.aj()
z.m(this.c)
a.gau().b=z
return a}},
ms:{"^":"a:0;",
$1:function(a){var z=a.gau().f
if(typeof z!=="number")return z.ai()
a.gau().f=z+1
return a}},
mr:{"^":"a:0;",
$1:function(a){return a.gH()===!0&&a.gaR()}},
pU:{"^":"ft;bk:a<,c7:b<,cY:c<,i:d<,U:e<",
a1:function(a){var z=new X.dL(null,null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
w:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof X.ft))return!1
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
dL:{"^":"d;a,b,c,d,e,f",
gbk:function(){var z,y
z=this.gau()
y=z.b
if(y==null){y=new S.O(null,null,[U.ab])
y.aj()
y.m(C.d)
z.b=y
z=y}else z=y
return z},
gc7:function(){return this.gau().c},
gcY:function(){var z,y
z=this.gau()
y=z.d
if(y==null){y=new S.O(null,null,[P.t])
y.aj()
y.m(C.d)
z.d=y
z=y}else z=y
return z},
gi:function(){return this.gau().e},
gU:function(){return this.gau().f},
gau:function(){var z,y
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
if(z==null){y=this.gau()
x=y.b
if(x==null){x=new S.O(null,null,[U.ab])
x.aj()
x.m(C.d)
y.b=x
y=x}else y=x
y=y.p()
x=this.gau().c
w=this.gau()
v=w.d
if(v==null){v=new S.O(null,null,[P.t])
v.aj()
v.m(C.d)
w.d=v
w=v}else w=v
w=w.p()
v=this.gau().e
u=this.gau().f
z=new X.pU(y,x,w,v,u)
if(y==null)H.i(P.l("droppedItems"))
if(x==null)H.i(P.l("groundMaterial"))
if(w==null)H.i(P.l("playerTeamIds"))
if(v==null)H.i(P.l("id"))
if(u==null)H.i(P.l("time"))}this.m(z)
return z}}}],["","",,A,{"^":"",mG:{"^":"z;J:c<,K:d<,a0:e<,O:f<,L:r<,b,a",
ga6:function(){return"stab <object>"},
gh:function(){return"OffBalanceOpportunityThrust"},
gaf:function(){return"will <subject> hit <objectPronoun>?"},
P:[function(a,b,c){var z=this.b
a.ae(c,"<subject> tr<ies> to stab <object>",z)
a.al(c,"<subject> {go<es> wide|fail<s>|miss<es>}",!0)
return H.b(a.gh())+" fails to stab "+H.b(z.gh())},"$3","gM",6,0,1],
R:[function(a,b,c){var z=this.b
b.X(z.gi(),new A.mH(a))
if(!(!b.Y(z.gi()).gaZ()&&!J.e(z.gi(),100))){a.bn(c,"<subject> thrust<s> {|"+H.b(U.a8(a))+"} deep into <object's> {shoulder|hip|thigh}",z,!0)
N.b4(c,z)}else{a.bn(c,"<subject> {stab<s>|run<s> "+H.b(U.a8(a))+" through} <object>",z,!0)
N.bi(c,b,z)}return H.b(a.gh())+" stabs "+H.b(z.gh())},"$3","gN",6,0,1],
I:function(a,b){if(a.gH()===!0)return 0.6
return 0.5},
G:function(a,b){return a.ga4()&&this.b.gap()&&a.e.geM()},
u:{
wT:[function(a){return new A.mG("When an opponent is out of balance they are the most vulnerable.",!0,!0,!0,C.c,a,null)},"$1","uE",2,0,4]}},mH:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gag()
y=this.a.gT().gbz()
if(typeof z!=="number")return z.aq()
a.sag(z-y)
return a}}}],["","",,U,{"^":"",
mC:function(a,b){var z=new U.dO(null,null,null,null,null)
new U.tz(a,b).$1(z)
return z.p()},
fz:{"^":"ac;",
gaD:function(){return H.p([A.uE()],[{func:1,ret:Q.z,args:[R.I]}])},
gbN:function(){return[$.$get$dT()]},
gh:function(){return"OffBalanceOpportunitySituation"},
aw:function(){var z=new U.dO(null,null,null,null,null)
z.m(this)
new U.mD().$1(z)
return z.p()},
aU:function(a,b){var z,y,x,w,v
if(typeof a!=="number")return a.bo()
if(a>0)return
z=b.Y(this.a)
y=b.a
x=H.m(y,0)
w=P.P(new H.K(y,new U.mE(this,b,z),[x]),!0,x)
if(w.length===0)return
v=C.a.geG(w)
if(v.ga4()&&z.gap()&&v.e.geM())return v
return},
b4:function(a,b){return new H.K(a,new U.mF(b,b.Y(this.a)),[H.m(a,0)])}},
tz:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a7().ao(1073741823)
a.gba().d=z
a.gba().e=0
z=this.a.gi()
a.gba().b=z
z=this.b
z=z==null?z:z.gi()
a.gba().c=z
return a}},
mD:{"^":"a:0;",
$1:function(a){var z=a.gba().e
if(typeof z!=="number")return z.ai()
a.gba().e=z+1
return a}},
mE:{"^":"a:27;a,b,c",
$1:function(a){var z,y
if(a.gaR())if(a.eI(this.c,this.b)){z=a.y
y=this.a.b
y=z==null?y!=null:z!==y
z=y}else z=!1
else z=!1
return z}},
mF:{"^":"a:0;a,b",
$1:function(a){var z=this.b
return J.e(a,z)||a.eI(z,this.a)}},
pV:{"^":"fz;a,b,i:c<,U:d<",
a1:function(a){var z=new U.dO(null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
w:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof U.fz))return!1
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
dO:{"^":"d;a,b,c,d,e",
gi:function(){return this.gba().d},
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
z=new U.pV(y,x,w,v)
if(y==null)H.i(P.l("actorId"))
if(w==null)H.i(P.l("id"))
if(v==null)H.i(P.l("time"))}this.m(z)
return z}}}],["","",,O,{"^":"",ls:{"^":"z;J:c<,K:d<,a0:e<,O:f<,b,a",
ga6:function(){return""},
gh:function(){return"FinishPunch"},
gL:function(){return},
gaf:function(){return"(WARNING should not be user-visible)"},
P:[function(a,b,c){throw H.c(new P.W(null))},"$3","gM",6,0,1],
R:[function(a,b,c){var z,y,x,w
z=this.b
y=z.ga4()?C.h:C.f
x=b.at("PunchSituation").gi()
w=U.bz(b)
b.X(z.y,new O.lt(y))
switch(y){case C.k:throw H.c(new P.x("Enemy's pose should never be 'standing' after a successful punch"))
case C.h:c.fM(0,"<subject> {punch<es> <object> in the {face|nose|eye|jaw}|punch<es> <object's> {face|nose|eye|jaw}}",x,z,!0,a)
z.aA(c,"<subject> {stagger<s>|stumble<s>} off balance",!0)
break
case C.f:c.fM(0,"<subject> send<s> <object> to the "+H.b(w)+" with a {massive punch|well-placed fist} to the {face|nose|eye|jaw}",x,z,!0,a)
break}return H.b(a.gh())+" punches "+H.b(z.db)+" to "+y.k(0)},"$3","gN",6,0,1],
I:function(a,b){return 1},
G:function(a,b){return!0},
u:{
wJ:[function(a){return new O.ls(null,!0,!0,!1,a,null)},"$1","u5",2,0,4]}},lt:{"^":"a:0;a",
$1:function(a){a.sah(this.a)
return a}}}],["","",,E,{"^":"",kz:{"^":"z;J:c<,K:d<,a0:e<,O:f<,L:r<,b,a",
ga6:function(){return"dodge"},
gh:function(){return"DodgePunch"},
gaf:function(){return"will <subject> dodge the fist?"},
P:[function(a,b,c){var z=b.at("PunchSituation").gi()
a.hr(c,"<subject> tr<ies> to {dodge|sidestep|move out of the way}",z,!0)
S.a5(new E.kA(a,c,z),new E.kB(this,a,c,z),null,null)
b.az()
return H.b(a.gh())+" fails to dodge "+H.b(this.b.gh())},"$3","gM",6,0,1],
R:[function(a,b,c){var z=this.b
a.bR(c,"<subject> {dodge<s>|sidestep<s>} <object's> {punch|blow|jab}",b.at("PunchSituation").gi(),z,!0)
b.b1("FightSituation")
if(a.gH()===!0)c.q(0,"this opens an opportunity for a counter attack")
C.a.q(b.f,S.c4(a,z))
return H.b(a.gh())+" dodges punch from "+H.b(z.gh())},"$3","gN",6,0,1],
I:function(a,b){var z,y
z=a.ga4()?0:0.2
if(a.ch===!0)return 0.7-z
y=b.f
return(y.length!==0?C.a.gv(y):null).gb2().b0(0.4-z)},
G:function(a,b){return!0},
u:{
wD:[function(a){return new E.kz("Dodging means moving your body out of harm's way.",!1,!1,!0,C.c,a,null)},"$1","tY",2,0,4]}},kA:{"^":"a:2;a,b,c",
$0:function(){return this.a.c2(this.b,"<subject> {can't|fail<s>|<does>n't succeed}",this.c,!0,!0)}},kB:{"^":"a:2;a,b,c,d",
$0:function(){return this.a.b.kU(this.c,"<subject> <is> too quick for <object>",this.d,!0,!0,this.b)}}}],["","",,Z,{"^":"",
dZ:function(a,b,c){var z=new Z.dY(null,null,null,null,null,null)
new Z.tt(a,b,c).$1(z)
return z.p()},
fJ:{"^":"c6;",
gaD:function(){return[E.tY()]},
gh:function(){return"PunchDefenseSituation"},
aw:function(){var z=new Z.dY(null,null,null,null,null,null)
z.m(this)
new Z.nm().$1(z)
return z.p()}},
tt:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$a7().ao(1073741823)
a.gaK().c=z
a.gaK().f=0
z=this.a.gi()
a.gaK().b=z
z=this.b.gi()
a.gaK().e=z
a.gaK().d=this.c
return a}},
nm:{"^":"a:0;",
$1:function(a){var z=a.gaK().f
if(typeof z!=="number")return z.ai()
a.gaK().f=z+1
return a}},
pY:{"^":"fJ;cM:a<,i:b<,cq:c<,cs:d<,U:e<",
a1:function(a){var z=new Z.dY(null,null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
w:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof Z.fJ))return!1
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
dY:{"^":"d;a,b,c,d,e,f",
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
z=new Z.pY(y,x,w,v,u)
if(y==null)H.i(P.l("attacker"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("predeterminedResult"))
if(v==null)H.i(P.l("target"))
if(u==null)H.i(P.l("time"))}this.m(z)
return z}}}],["","",,Q,{"^":"",
fL:function(a,b){var z=new Q.e_(null,null,null,null,null)
new Q.tu(a,b).$1(z)
return z.p()},
fK:{"^":"ac;",
gaD:function(){return[O.u5()]},
gh:function(){return"PunchSituation"},
aw:function(){var z=new Q.e_(null,null,null,null,null)
z.m(this)
new Q.nn().$1(z)
return z.p()},
aU:function(a,b){if(a===0)return b.Y(this.a)
return},
b4:function(a,b){return new H.K(a,new Q.no(this),[H.m(a,0)])}},
tu:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a7().ao(1073741823)
a.gbb().c=z
a.gbb().e=0
z=this.a.gi()
a.gbb().b=z
z=this.b.gi()
a.gbb().d=z
return a}},
nn:{"^":"a:0;",
$1:function(a){var z=a.gbb().e
if(typeof z!=="number")return z.ai()
a.gbb().e=z+1
return a}},
no:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.e(a.gi(),z.a)||J.e(a.gi(),z.c)}},
pZ:{"^":"fK;a,i:b<,c,U:d<",
a1:function(a){var z=new Q.e_(null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
w:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof Q.fK))return!1
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
e_:{"^":"d;a,b,c,d,e",
gi:function(){return this.gbb().c},
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
z=new Q.pZ(y,x,w,v)
if(y==null)H.i(P.l("attacker"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("target"))
if(v==null)H.i(P.l("time"))}this.m(z)
return z}}}],["","",,O,{"^":"",lu:{"^":"z;J:c<,K:d<,a0:e<,O:f<,L:r<,b,a",
gh:function(){return"FinishSlash"},
ga6:function(){return""},
gaf:function(){return"(WARNING should not be user-visible)"},
P:[function(a,b,c){throw H.c(new P.W(null))},"$3","gM",6,0,1],
R:[function(a,b,c){var z,y,x,w
z=this.b
b.X(z.gi(),new O.lx(a))
y=b.at("SlashSituation").gi()
x=!b.Y(z.gi()).gaZ()&&!J.e(z.gi(),100)
if(!x){a.bR(c,"<subject> {slash<es>|cut<s>} <object's> {shoulder|abdomen|thigh}",y,z,!0)
N.b4(c,z)}else{a.bR(c,"<subject> {slash<es>|cut<s>} {across|through} <object's> {neck|abdomen|lower body}",y,z,!0)
N.bi(c,b,z)}w=H.b(a.gh())+" slashes"
return w+(x?" (and kills)":"")+" "+H.b(z.gh())},"$3","gN",6,0,1],
I:function(a,b){return 1},
G:function(a,b){return a.gT().gbf()},
u:{
wL:[function(a){return new O.lu(null,!0,!0,!0,C.c,a,null)},"$1","u6",2,0,4]}},lx:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gag()
y=this.a.gT().gbI()
if(typeof z!=="number")return z.aq()
a.sag(z-y)
return a}}}],["","",,V,{"^":"",ly:{"^":"z;J:c<,K:d<,a0:e<,O:f<,L:r<,b,a",
ga6:function(){return""},
gh:function(){return"FinishThrustSpear"},
gaf:function(){return"(WARNING should not be user-visible)"},
P:[function(a,b,c){throw H.c(new P.W(null))},"$3","gM",6,0,1],
R:[function(a,b,c){var z,y,x,w
z=this.b
b.X(z.gi(),new V.lB(a))
y=b.at("SlashSituation").gi()
x=!b.Y(z.gi()).gaZ()&&!J.e(z.gi(),100)
if(!x){a.bR(c,"<subject> {pierce<s>|stab<s>|bore<s> through} <object's> {shoulder|abdomen|thigh}",y,z,!0)
N.b4(c,z)}else{a.bR(c,"<subject> {pierce<s>|stab<s>|bore<s> through|impale<s>} <object's> {neck|chest|heart}",y,z,!0)
N.bi(c,b,z)}w=H.b(a.gh())+" pierces"
return w+(x?" (and kills)":"")+" "+H.b(z.gh())},"$3","gN",6,0,1],
I:function(a,b){return 1},
G:function(a,b){return a.gT() instanceof Z.aE},
u:{
wN:[function(a){return new V.ly(null,!0,!0,!0,C.c,a,null)},"$1","u8",2,0,4]}},lB:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gag()
y=this.a.gT().gbz()
if(typeof z!=="number")return z.aq()
a.sag(z-y)
return a}}}],["","",,X,{"^":"",kk:{"^":"z;J:c<,K:d<,a0:e<,O:f<,L:r<,b,a",
ga6:function(){return"step back and parry"},
gh:function(){return"DefensiveParrySlash"},
gaf:function(){return"will <subject> parry it?"},
P:[function(a,b,c){a.ad(c,"<subject> tr<ies> to {parry|deflect it|meet it with "+H.b(U.a8(a))+"|fend it off}")
if(a.gap())a.al(c,"<subject> <is> out of balance",!0)
else S.a5(new X.kl(a,c),new X.km(this,a,c),null,null)
b.az()
return H.b(a.db)+" fails to parry "+H.b(this.b.gh())},"$3","gM",6,0,1],
R:[function(a,b,c){if(a.gH()===!0)a.ad(c,"<subject> {step<s>|take<s> a step} back")
a.bm(c,"<subject> {parr<ies> it|deflect<s> it|meet<s> it with "+H.b(U.a8(a))+"|fend<s> it off}",!0)
if(!a.ga4()){b.X(a.y,new X.kn())
if(a.ch===!0)a.ad(c,"<subject> regain<s> balance")}b.b1("FightSituation")
return H.b(a.db)+" steps back and parries "+H.b(this.b.gh())},"$3","gN",6,0,1],
I:function(a,b){var z,y,x
if(a.gH()===!0)return 1
z=b.f
y=z.length!==0?C.a.gv(z):null
x=a.ga4()?0:0.2
return y.gb2().b0(0.5-x)},
G:function(a,b){return a.gT().gcg()},
u:{
wA:[function(a){return new X.kk("Stepping back is the safest way to get out of harm's way.",!1,!1,!0,C.c,a,null)},"$1","tV",2,0,4]}},kl:{"^":"a:2;a,b",
$0:function(){return this.a.al(this.b,"<subject> {fail<s>|<does>n't succeed}",!0)}},km:{"^":"a:2;a,b,c",
$0:function(){return this.a.b.bQ(this.c,"<subject> <is> too quick for <object>",!0,this.b)}},kn:{"^":"a:0;",
$1:function(a){a.sah(C.k)
return a}}}],["","",,F,{"^":"",kC:{"^":"z;J:c<,K:d<,a0:e<,O:f<,L:r<,b,a",
gh:function(){return"DodgeSlash"},
ga6:function(){return"dodge and counter"},
gaf:function(){return"will <subject> dodge?"},
P:[function(a,b,c){a.ad(c,"<subject> tr<ies> to {dodge|sidestep}")
if(a.gap())a.al(c,"<subject> <is> out of balance",!0)
else S.a5(new F.kD(a,c),new F.kE(this,a,c),null,null)
b.az()
return H.b(a.db)+" fails to dodge "+H.b(this.b.gh())},"$3","gM",6,0,1],
R:[function(a,b,c){var z=this.b
a.bn(c,"<subject> {dodge<s>|sidestep<s>} it",z,!0)
if(z.ga4()){z.c1(c,"<subject> lose<s> balance because of that",!0,!0)
b.X(z.y,new F.kF())}b.b1("FightSituation")
if(a.gH()===!0)c.q(0,"this opens an opportunity for a counter attack")
C.a.q(b.f,S.c4(a,z))
return H.b(a.gh())+" dodges "+H.b(z.db)},"$3","gN",6,0,1],
I:function(a,b){var z,y
z=a.ga4()?0:0.2
if(a.ch===!0)return 0.7-z
y=b.f
return(y.length!==0?C.a.gv(y):null).gb2().b0(0.4-z)},
G:function(a,b){return!a.ga2()},
u:{
wE:[function(a){return new F.kC("Dodging means moving your body out of harm's way. When done correctly, it will throw your opponent off balance and it will open an opportunity for a counter attack. When botched, it can get you killed.",!1,!1,!0,C.c,a,null)},"$1","tZ",2,0,4]}},kD:{"^":"a:2;a,b",
$0:function(){return this.a.al(this.b,"<subject> {can't|fail<s>|<does>n't succeed}",!0)}},kE:{"^":"a:2;a,b,c",
$0:function(){return this.a.b.bQ(this.c,"<subject> <is> too quick for <object>",!0,this.b)}},kF:{"^":"a:0;",
$1:function(a){a.sah(C.h)
return C.h}}}],["","",,M,{"^":"",kG:{"^":"z;J:c<,K:d<,a0:e<,O:f<,L:r<,b,a",
ga6:function(){return"dodge and counter"},
gh:function(){return"DodgeThrustSpear"},
gaf:function(){return"will <subject> dodge?"},
P:[function(a,b,c){a.ad(c,"<subject> tr<ies> to {dodge|sidestep}")
if(a.gap())a.al(c,"<subject> <is> out of balance",!0)
else S.a5(new M.kH(a,c),new M.kI(this,a,c),null,null)
b.az()
return H.b(a.db)+" fails to dodge "+H.b(this.b.gh())+"'s spear"},"$3","gM",6,0,1],
R:[function(a,b,c){var z=this.b
a.bn(c,"<subject> {dodge<s>|sidestep<s>} it",z,!0)
if(z.ga4()){z.c1(c,"<subject> lose<s> balance because of that",!0,!0)
b.X(z.y,new M.kJ())}b.b1("FightSituation")
if(a.gH()===!0)c.q(0,"this opens an opportunity for a counter attack")
C.a.q(b.f,S.c4(a,z))
return H.b(a.gh())+" dodges "+H.b(z.db)+"'s spear"},"$3","gN",6,0,1],
I:function(a,b){var z,y
z=a.ga4()?0:0.2
if(a.ch===!0)return 0.7-z
y=b.f
return(y.length!==0?C.a.gv(y):null).gb2().b0(0.4-z)},
G:function(a,b){return!a.ga2()},
u:{
wF:[function(a){return new M.kG("Dodging means moving your body out of harm's way. When done correctly, it will throw your opponent off balance and it will open an opportunity for a counter attack. When botched, it can get you killed.",!1,!1,!0,C.c,a,null)},"$1","u_",2,0,4]}},kH:{"^":"a:2;a,b",
$0:function(){return this.a.al(this.b,"<subject> {can't|fail<s>|<does>n't succeed}",!0)}},kI:{"^":"a:2;a,b,c",
$0:function(){return this.a.b.bQ(this.c,"<subject> <is> too quick for <object>",!0,this.b)}},kJ:{"^":"a:0;",
$1:function(a){a.sah(C.h)
return C.h}}}],["","",,O,{"^":"",m6:{"^":"z;J:c<,K:d<,a0:e<,O:f<,L:r<,b,a",
ga6:function(){return"jump back"},
gh:function(){return"JumpBackFromSlash"},
gaf:function(){return"will <subject> avoid the slash?"},
P:[function(a,b,c){a.dI(c,"<subject> {jump<s>|leap<s>} {back|backward} but <subject> <is> {not fast enough|too slow}.",!0)
b.az()
return H.b(a.gh())+" fails to jump back from "+H.b(this.b.gh())},"$3","gM",6,0,1],
R:[function(a,b,c){var z
a.bm(c,"<subject> {leap<s>|jump<s>} {back|backwards|out of reach}",!0)
z=this.b
c.cf(0,"<owner's> <subject> {slash<es>|cut<s>} empty air",z,z.gT())
b.b1("FightSituation")
return H.b(a.gh())+" jumps back from "+H.b(z.gh())+"'s attack"},"$3","gN",6,0,1],
I:function(a,b){var z,y,x
if(a.gH()===!0)return 1
z=b.f
y=z.length!==0?C.a.gv(z):null
x=a.ga4()?0:0.2
return y.gb2().b0(0.5-x)},
G:function(a,b){return a.gb_()},
u:{
wR:[function(a){return new O.m6("Jump back and the weapon can't reach you.",!1,!1,!0,C.c,a,null)},"$1","uy",2,0,4]}}}],["","",,G,{"^":"",mT:{"^":"z;J:c<,K:d<,a0:e<,O:f<,L:r<,b,a",
gh:function(){return"ParrySlash"},
ga6:function(){return"parry and counter"},
gaf:function(){return"will <subject> parry?"},
P:[function(a,b,c){a.ad(c,"<subject> tr<ies> to {parry|deflect it|meet it with "+H.b(U.a8(a))+"|fend it off}")
if(a.gap())a.al(c,"<subject> <is> out of balance",!0)
else S.a5(new G.mU(a,c),new G.mV(this,a,c),null,null)
b.az()
return H.b(a.db)+" fails to parry "+H.b(this.b.gh())},"$3","gM",6,0,1],
R:[function(a,b,c){var z=this.b
if(z.gap()){c.ex(0,"<subject> <is> out of balance",!0,!0,z)
c.cf(0,"so <ownerPronoun's> <subject> is {weak|feeble}",z,$.$get$iH())
a.bm(c,"<subject> {parr<ies> it easily|easily meet<s> it with "+H.b(U.a8(a))+"|fend<s> it off easily}",!0)}else a.bm(c,"<subject> {parr<ies> it|meet<s> it with "+H.b(U.a8(a))+"|fend<s> it off}",!0)
b.b1("FightSituation")
if(a.gH()===!0)c.q(0,"this opens an opportunity for a counter attack")
C.a.q(b.f,S.c4(a,z))
return H.b(a.gh())+" parries "+H.b(z.db)},"$3","gN",6,0,1],
I:function(a,b){var z,y,x
z=a.ga4()?0:0.2
y=this.b.gap()?0.3:0
if(a.ch===!0)return 0.6-z+y
x=b.f
return(x.length!==0?C.a.gv(x):null).gb2().b0(0.3-z+y)},
G:function(a,b){return a.gT().gcg()},
u:{
wW:[function(a){return new G.mT("Parrying means deflecting your opponent's move with your weapon. When successful, it will give you an opportunity for a counter attack. It won't throw your opponent off balance like dodging does, but it's also slightly easier to do.",!1,!1,!0,C.c,a,null)},"$1","uH",2,0,4]}},mU:{"^":"a:2;a,b",
$0:function(){return this.a.al(this.b,"<subject> {fail<s>|<does>n't succeed}",!0)}},mV:{"^":"a:2;a,b,c",
$0:function(){return this.a.b.bQ(this.c,"<subject> <is> too quick for <object>",!0,this.b)}}}],["","",,E,{"^":"",of:{"^":"z;J:c<,K:d<,a0:e<,O:f<,L:r<,b,a",
ga6:function(){return"block with shield and counter"},
gh:function(){return"ShieldBlockSlash"},
gaf:function(){return"will <subject> block the slash?"},
P:[function(a,b,c){a.ad(c,"<subject> tr<ies> to {block|stop|deflect} the {swing|attack|strike} with "+H.b(U.c_(a)))
if(a.gap())a.al(c,"<subject> <is> out of balance",!0)
else S.a5(new E.og(a,c),new E.oh(a,c),new E.oi(this,a,c),null)
b.az()
return H.b(a.db)+" fails to block "+H.b(this.b.gh())+" with shield"},"$3","gM",6,0,1],
R:[function(a,b,c){var z=this.b
if(z.gap()){c.ex(0,"<subject> <is> out of balance",!0,!0,z)
c.cf(0,"so <ownerPronoun's> <subject> is {weak|feeble}",z,$.$get$iG())
a.bm(c,"<subject> easily {block|stop|deflect} the {swing|attack|strike} with "+H.b(U.c_(a)),!0)}else a.bm(c,"<subject> {block|stop|deflect} the {swing|attack|strike} with "+H.b(U.c_(a)),!0)
b.b1("FightSituation")
if(a.gH()===!0)c.q(0,"this opens an opportunity for a counter attack")
C.a.q(b.f,S.c4(a,z))
return H.b(a.gh())+" blocks "+H.b(z.db)+" with a shield"},"$3","gN",6,0,1],
I:function(a,b){var z,y,x
z=a.ga4()?0:0.2
y=this.b.gap()?0.2:0
if(a.ch===!0)return 0.8-z+y
x=b.f
return(x.length!==0?C.a.gv(x):null).gb2().b0(0.5-z+y)},
G:function(a,b){return a.gan()!=null},
u:{
x2:[function(a){return new E.of("A shield blocks enemy attacks with the least amount of energy and movement. It is easy and quick to launch a counter-attack when the enemy's weapon is stopped in this way.",!1,!1,!0,C.c,a,null)},"$1","uX",2,0,4]}},og:{"^":"a:2;a,b",
$0:function(){return this.a.al(this.b,"<subject> {fail<s>|<does>n't succeed}",!0)}},oh:{"^":"a:2;a,b",
$0:function(){return this.a.al(this.b,"<subject> <is> too slow",!0)}},oi:{"^":"a:2;a,b,c",
$0:function(){return this.a.b.bQ(this.c,"<subject> <is> too quick for <object>",!0,this.b)}}}],["","",,L,{"^":"",
aO:function(a,b,c){var z=new L.e3(null,null,null,null,null,null)
new L.tp(a,b,c).$1(z)
return z.p()},
fX:{"^":"c6;",
gaD:function(){return[X.tV(),F.tZ(),M.u_(),O.uy(),G.uH(),E.uX()]},
gh:function(){return"SlashDefenseSituation"},
aw:function(){var z=new L.e3(null,null,null,null,null,null)
z.m(this)
new L.om().$1(z)
return z.p()}},
tp:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$a7().ao(1073741823)
a.gaL().c=z
a.gaL().f=0
z=this.a.gi()
a.gaL().b=z
z=this.b.gi()
a.gaL().e=z
a.gaL().d=this.c
return a}},
om:{"^":"a:0;",
$1:function(a){var z=a.gaL().f
if(typeof z!=="number")return z.ai()
a.gaL().f=z+1
return a}},
q0:{"^":"fX;cM:a<,i:b<,cq:c<,cs:d<,U:e<",
a1:function(a){var z=new L.e3(null,null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
w:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof L.fX))return!1
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
e3:{"^":"d;a,b,c,d,e,f",
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
z=new L.q0(y,x,w,v,u)
if(y==null)H.i(P.l("attacker"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("predeterminedResult"))
if(v==null)H.i(P.l("target"))
if(u==null)H.i(P.l("time"))}this.m(z)
return z}}}],["","",,M,{"^":"",
bc:function(a,b){var z=new M.e4(null,null,null,null,null)
new M.ts(a,b).$1(z)
return z.p()},
fY:{"^":"ac;",
gaD:function(){return[O.u6(),V.u8()]},
gh:function(){return"SlashSituation"},
aw:function(){var z=new M.e4(null,null,null,null,null)
z.m(this)
new M.on().$1(z)
return z.p()},
aU:function(a,b){if(a===0)return b.Y(this.a)
return},
b4:function(a,b){return new H.K(a,new M.oo(this),[H.m(a,0)])}},
ts:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a7().ao(1073741823)
a.gbc().c=z
a.gbc().e=0
z=this.a.gi()
a.gbc().b=z
z=this.b.gi()
a.gbc().d=z
return a}},
on:{"^":"a:0;",
$1:function(a){var z=a.gbc().e
if(typeof z!=="number")return z.ai()
a.gbc().e=z+1
return a}},
oo:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.e(a.gi(),z.a)||J.e(a.gi(),z.c)}},
q1:{"^":"fY;a,i:b<,c,U:d<",
a1:function(a){var z=new M.e4(null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
w:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof M.fY))return!1
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
e4:{"^":"d;a,b,c,d,e",
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
z=new M.q1(y,x,w,v)
if(y==null)H.i(P.l("attacker"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("target"))
if(v==null)H.i(P.l("time"))}this.m(z)
return z}}}],["","",,Q,{"^":"",lv:{"^":"z;J:c<,K:d<,a0:e<,O:f<,L:r<,b,a",
gh:function(){return"FinishSlashGroundedEnemy"},
ga6:function(){return""},
gaf:function(){return"(WARNING should not be user-visible)"},
P:[function(a,b,c){throw H.c(new P.W(null))},"$3","gM",6,0,1],
R:[function(a,b,c){var z,y
z=this.b
b.X(z.gi(),new Q.lw())
y=J.e(z.gi(),100)
c.ew(0,"<subject> {cut<s>|slash<es>|slit<s>} <object's> "+(y?"side":"{throat|neck|side}"),z,a.gT())
if(y)N.b4(c,z)
else N.bi(c,b,z)
return H.b(a.gh())+" slains "+H.b(z.gh())+" on the ground"},"$3","gN",6,0,1],
I:function(a,b){return 1},
G:function(a,b){return this.b.ga2()&&a.gT().gbf()},
u:{
wK:[function(a){return new Q.lv(null,!0,!0,!0,C.c,a,null)},"$1","u7",2,0,4]}},lw:{"^":"a:0;",
$1:function(a){a.sag(0)
return a}}}],["","",,V,{"^":"",lz:{"^":"z;J:c<,K:d<,a0:e<,O:f<,L:r<,b,a",
ga6:function(){return""},
gh:function(){return"FinishThrustSpearAtGroundedEnemy"},
gaf:function(){return"(WARNING should not be user-visible)"},
P:[function(a,b,c){throw H.c(new P.W(null))},"$3","gM",6,0,1],
R:[function(a,b,c){var z,y
z=this.b
b.X(z.gi(),new V.lA())
y=J.e(z.gi(),100)
c.ew(0,"<subject> {impale<s>|bore<s> through|pierce<s>} <object's> "+(y?"side":"{throat|neck|heart}"),z,a.gT())
if(y)N.b4(c,z)
else N.bi(c,b,z)
return H.b(a.gh())+" slains "+H.b(z.gh())+" on the ground with a spear"},"$3","gN",6,0,1],
I:function(a,b){return 1},
G:function(a,b){return this.b.ga2()&&a.gT() instanceof Z.aE},
u:{
wM:[function(a){return new V.lz(null,!0,!0,!0,C.c,a,null)},"$1","u9",2,0,4]}},lA:{"^":"a:0;",
$1:function(a){a.sag(0)
return a}}}],["","",,K,{"^":"",mJ:{"^":"z;K:c<,a0:d<,O:e<,L:f<,J:r<,b,a",
gh:function(){return"OnGroundParry"},
ga6:function(){return"parry it"},
gaf:function(){return"will <subject> parry it?"},
P:[function(a,b,c){a.ad(c,"<subject> tr<ies> to {parry|deflect it|stop it{| with "+H.b(U.a8(a))+"}}")
S.a5(new K.mK(a,c),new K.mL(this,a,c),null,null)
b.az()
return H.b(a.gh())+" fails to parry "+H.b(this.b.gh())},"$3","gM",6,0,1],
R:[function(a,b,c){a.bm(c,"<subject> {parr<ies> it|stop<s> it with "+H.b(U.a8(a))+"}",!0)
b.b1("FightSituation")
return H.b(a.gh())+" parries "+H.b(this.b.gh())},"$3","gN",6,0,1],
I:function(a,b){var z
if(a.gH()===!0)return 0.6
z=b.f
return(z.length!==0?C.a.gv(z):null).gb2().b0(0.3)},
G:function(a,b){return this.b.gT().gbf()&&a.gT().gcg()},
u:{
wU:[function(a){return new K.mJ(!1,!1,!0,C.c,"TODO",a,null)},"$1","uF",2,0,4]}},mK:{"^":"a:2;a,b",
$0:function(){return this.a.al(this.b,"<subject> {fail<s>|<does>n't succeed}",!0)}},mL:{"^":"a:2;a,b,c",
$0:function(){return this.a.b.bQ(this.c,"<subject> <is> too quick for <object>",!0,this.b)}}}],["","",,L,{"^":"",mM:{"^":"z;J:c<,K:d<,a0:e<,O:f<,L:r<,b,a",
ga6:function(){return"block with shield"},
gh:function(){return"OnGroundShieldBlock"},
gaf:function(){return"will <subject> block the strike?"},
P:[function(a,b,c){a.ad(c,"<subject> tr<ies> to {block|stop|deflect} the {swing|attack|strike} with "+H.b(U.c_(a)))
S.a5(new L.mN(a,c),new L.mO(a,c),new L.mP(this,a,c),null)
b.az()
return H.b(a.gh())+" fails to block "+H.b(this.b.gh())+" with shield on ground"},"$3","gM",6,0,1],
R:[function(a,b,c){var z=this.b
if(z.gap()){c.ex(0,"<subject> <is> out of balance",!0,!0,z)
c.cf(0,"so <ownerPronoun's> <subject> is {weak|feeble}",z,$.$get$iF())
a.bm(c,"<subject> easily {block|stop|deflect} the {swing|attack|strike} with "+H.b(U.c_(a)),!0)}else a.bm(c,"<subject> {block|stop|deflect} the {swing|attack|strike} with "+H.b(U.c_(a)),!0)
b.b1("FightSituation")
return H.b(a.gh())+" blocks "+H.b(z.db)+" with a shield on ground"},"$3","gN",6,0,1],
I:function(a,b){var z
if(a.gH()===!0)return 0.8
z=b.f
return(z.length!==0?C.a.gv(z):null).gb2().b0(0.5)},
G:function(a,b){return a.gan()!=null},
u:{
wV:[function(a){return new L.mM("A shield blocks enemy attacks with the least amount of energy and movement.",!1,!1,!0,C.c,a,null)},"$1","uG",2,0,4]}},mN:{"^":"a:2;a,b",
$0:function(){return this.a.al(this.b,"<subject> {fail<s>|<does>n't succeed}",!0)}},mO:{"^":"a:2;a,b",
$0:function(){return this.a.al(this.b,"<subject> <is> too slow",!0)}},mP:{"^":"a:2;a,b,c",
$0:function(){return this.a.b.bQ(this.c,"<subject> <is> too quick for <object>",!0,this.b)}}}],["","",,Y,{"^":"",nA:{"^":"z;J:c<,K:d<,a0:e<,O:f<,L:r<,b,a",
gh:function(){return"RollOutOfWay"},
ga6:function(){return"roll out of way"},
gaf:function(){return"will <subject> evade?"},
P:[function(a,b,c){a.ad(c,"<subject> tr<ies> to roll out of the way")
a.al(c,"<subject> can't",!0)
b.az()
return H.b(a.gh())+" fails to roll out of the way"},"$3","gM",6,0,1],
R:[function(a,b,c){a.eT(c,"<subject> <is> able to roll out of the way",!0,!0)
if(a.gH()===!0){b.X(a.gi(),new Y.nB())
a.bm(c,"<subject> jump<s> up on <subject's> feet",!0)}b.b1("FightSituation")
return H.b(a.gh())+" rolls out of the way of "+H.b(this.b.gh())+"'s strike"},"$3","gN",6,0,1],
I:function(a,b){var z
if(a.gH()===!0)return 1
z=b.f
return(z.length!==0?C.a.gv(z):null).gb2().b0(0.5)},
G:function(a,b){return!0},
u:{
x1:[function(a){return new Y.nA(null,!1,!1,!0,C.c,a,null)},"$1","uS",2,0,4]}},nB:{"^":"a:0;",
$1:function(a){a.sah(C.k)
return a}}}],["","",,V,{"^":"",
bH:function(a,b,c){var z=new V.dP(null,null,null,null,null,null)
new V.tn(a,b,c).$1(z)
return z.p()},
fA:{"^":"c6;",
gaD:function(){return[K.uF(),L.uG(),Y.uS()]},
gh:function(){return"OnGroundDefenseSituation"},
aw:function(){var z=new V.dP(null,null,null,null,null,null)
z.m(this)
new V.mI().$1(z)
return z.p()}},
tn:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$a7().ao(1073741823)
a.gaJ().c=z
a.gaJ().f=0
z=this.a.gi()
a.gaJ().b=z
z=this.b.gi()
a.gaJ().e=z
a.gaJ().d=this.c
return a}},
mI:{"^":"a:0;",
$1:function(a){var z=a.gaJ().f
if(typeof z!=="number")return z.ai()
a.gaJ().f=z+1
return a}},
pW:{"^":"fA;cM:a<,i:b<,cq:c<,cs:d<,U:e<",
a1:function(a){var z=new V.dP(null,null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
w:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof V.fA))return!1
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
dP:{"^":"d;a,b,c,d,e,f",
gi:function(){return this.gaJ().c},
gU:function(){return this.gaJ().f},
gaJ:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.f=z.e
this.a=null}return this},
m:function(a){this.a=a},
p:function(){var z,y,x,w,v,u
z=this.a
if(z==null){y=this.gaJ().b
x=this.gaJ().c
w=this.gaJ().d
v=this.gaJ().e
u=this.gaJ().f
z=new V.pW(y,x,w,v,u)
if(y==null)H.i(P.l("attacker"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("predeterminedResult"))
if(v==null)H.i(P.l("target"))
if(u==null)H.i(P.l("time"))}this.m(z)
return z}}}],["","",,D,{"^":"",
d4:function(a,b){var z=new D.e5(null,null,null,null,null)
new D.to(a,b).$1(z)
return z.p()},
h7:{"^":"ac;",
gaD:function(){return[Q.u7(),V.u9()]},
gh:function(){return"StrikeDownSituation"},
aw:function(){var z=new D.e5(null,null,null,null,null)
z.m(this)
new D.p4().$1(z)
return z.p()},
aU:function(a,b){if(a===0)return b.Y(this.a)
return},
b4:function(a,b){return new H.K(a,new D.p5(this),[H.m(a,0)])}},
to:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a7().ao(1073741823)
a.gbd().c=z
a.gbd().e=0
z=this.a.gi()
a.gbd().b=z
z=this.b.gi()
a.gbd().d=z
return a}},
p4:{"^":"a:0;",
$1:function(a){var z=a.gbd().e
if(typeof z!=="number")return z.ai()
a.gbd().e=z+1
return a}},
p5:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.e(a.gi(),z.a)||J.e(a.gi(),z.c)}},
q2:{"^":"h7;a,i:b<,c,U:d<",
a1:function(a){var z=new D.e5(null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
w:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof D.h7))return!1
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
e5:{"^":"d;a,b,c,d,e",
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
z=new D.q2(y,x,w,v)
if(y==null)H.i(P.l("attacker"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("targetOnGround"))
if(v==null)H.i(P.l("time"))}this.m(z)
return z}}}],["","",,O,{"^":"",nc:{"^":"d;",
gb2:function(){switch(this.gcq()){case C.l:return C.a3
case C.m:return $.$get$fE()
case C.p:return $.$get$fF()
default:throw H.c(P.E(this.gcq()))}},
$isac:1}}],["","",,K,{"^":"",dW:{"^":"d;a,b",
k:function(a){return this.b}}}],["","",,D,{"^":"",or:{"^":"af;K:b<,O:c<,a0:d<,L:e<,a",
gV:function(){return""},
gJ:function(){return},
gh:function(){return"SlayMonstersAction"},
P:[function(a,b,c){throw H.c(new P.W(null))},"$3","gM",6,0,1],
R:[function(a,b,c){var z,y,x,w
z=b.f
y=z.length!==0?C.a.gv(z):null
x=b.dU(y.gbE())
w=b.a
C.a.q(z,x.jU(b,y,new H.K(w,new D.os(a,x),[H.m(w,0)])))
return H.b(a.gh())+" initiated combat with monsters in "+x.k(0)},"$3","gN",6,0,1],
ac:function(a,b){return"WARNING should not be user-visible"},
I:function(a,b){return 1},
G:function(a,b){var z=b.f
return H.H(z.length!==0?C.a.gv(z):null,"$isM").c}},os:{"^":"a:0;a,b",
$1:function(a){var z,y
if(a.gaR())if(a.gb3().hb(this.a.gb3())){z=a.gbE()
y=this.b.gh()
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1
return z}}}],["","",,Y,{"^":"",pf:{"^":"c8;K:c<,a0:d<,O:e<,L:f<,b,a",
gJ:function(){return},
gh:function(){return"TakeExitAction"},
P:[function(a,b,c){throw H.c(new P.W(null))},"$3","gM",6,0,1],
R:[function(a,b,c){var z,y
z=this.b
c.q(0,z.gaP())
y=b.f
H.H(y.length!==0?C.a.gv(y):null,"$isM").dD(b,a,z.gfY(),c)
return H.b(a.gh())+" went through exit to "+z.a},"$3","gN",6,0,1],
ac:function(a,b){return"WARNING should not be user-visible"},
I:function(a,b){return 1},
G:function(a,b){var z=b.f
if(H.H(z.length!==0?C.a.gv(z):null,"$isM").c===!0)return!1
this.b.gkl()
return!0},
u:{
x6:[function(a){return new Y.pf(!1,!0,!1,null,a,null)},"$1","wo",2,0,48]}}}],["","",,F,{"^":"",
fP:function(a,b){var z=new F.e1(null,null,null,null,null)
new F.tc(a,b).$1(z)
return z.p()},
M:{"^":"ac;",
gaD:function(){return[Y.wo()]},
gbN:function(){var z=[]
C.a.av(z,$.$get$hY())
z.push($.$get$h0())
return z},
gdC:function(){return 1000},
gh:function(){return"RoomRoamingSituation"},
aw:function(){var z=new F.e1(null,null,null,null,null)
z.m(this)
new F.nC().$1(z)
return z.p()},
aU:function(a,b){return b.a.aQ(0,new F.nD(),new F.nE())},
b4:function(a,b){var z=this.aU(null,b)
if(z==null)return[]
return[z]},
dD:function(a,b,c,d){var z,y,x,w,v,u,t
z=a.dU(c)
a.c0(this.b,F.fP(z,!a.hM("TakeExitAction",b,!0).bs(0,new F.nF(c))&&z.gjT()!=null))
if(this.im(a,b,z))z.hZ(b,a,d)
else{d.A(0,"\n\n",!0)
z.jI(b,a,d)
d.A(0,"\n\n",!0)}for(y=R.ii(b,a),y=P.P(y,!0,H.y(y,"A",0)),x=y.length,w=a.a,v=0;v<y.length;y.length===x||(0,H.ar)(y),++v){u=a.Y(y[v].gi())
t=u.a1(new F.nG(z))
w.a3(0,u)
w.q(0,t)}},
hh:function(a,b){a.a.iG(new F.nH(),!0)},
dd:function(a){if(J.e(this.a,$.$get$es().b))return!1
return!0},
im:function(a,b,c){var z,y
for(z=a.d,z=new P.eh(z,z.c,z.d,z.b,null,[H.m(z,0)]);z.t();){y=z.e
if(!J.e(y.gcZ(),b.gi()))continue
if(y.geu()!=="TakeExitAction")continue
if(J.eM(y.gaP(),c.gh())===!0)return!0}return!1}},
tc:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a7().ao(1073741823)
a.gaC().c=z
a.gaC().e=0
z=this.a.gh()
a.gaC().b=z
a.gaC().d=this.b
return a}},
nC:{"^":"a:0;",
$1:function(a){var z=a.gaC().e
if(typeof z!=="number")return z.ai()
a.gaC().e=z+1
return a}},
nD:{"^":"a:0;",
$1:function(a){return a.gH()===!0&&a.gaR()}},
nE:{"^":"a:2;",
$0:function(){return}},
nF:{"^":"a:0;a",
$1:function(a){return a.gfX()===this.a}},
nG:{"^":"a:0;a",
$1:function(a){a.sbE(this.a.b)
return a}},
nH:{"^":"a:0;",
$1:function(a){return!a.gaZ()}},
q_:{"^":"M;bE:a<,i:b<,c,U:d<",
a1:function(a){var z=new F.e1(null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
w:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof F.M))return!1
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
e1:{"^":"d;a,b,c,d,e",
gbE:function(){return this.gaC().b},
sbE:function(a){this.gaC().b=a
return a},
gi:function(){return this.gaC().c},
skB:function(a){this.gaC().d=a
return a},
gU:function(){return this.gaC().e},
gaC:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
m:function(a){this.a=a},
p:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gaC().b
x=this.gaC().c
w=this.gaC().d
v=this.gaC().e
z=new F.q_(y,x,w,v)
if(y==null)H.i(P.l("currentRoomName"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("monstersAlive"))
if(v==null)H.i(P.l("time"))}this.m(z)
return z}}}],["","",,O,{"^":"",
xl:[function(a,b,c){var z,y
z=R.b6(6666,"Agruth",null,null,null,null,null,0,2,100,!1,2,!0,C.t,0,$.$get$bZ())
y=z.y
a.gev().q(0,z)
return U.cP(c,[z],"{rock|cavern} floor",b,P.ag([1,new O.ub(y),5,new O.uc(y),9,new O.ud(y),12,new O.ue(y),17,new O.uf(y)]))},"$3","wt",6,0,10],
xm:[function(a,b,c){var z=[O.hP(),O.hO(!1)]
a.gev().av(0,z)
return U.cP(c,z,"{rock|cavern} floor",b,P.aA())},"$3","wu",6,0,10],
xn:[function(a,b,c){var z,y,x
z=a.aN("talk_to_briana_3")?"guardian":"orc"
y=R.b6(6667,z,null,null,null,new G.b2("rusty sword",1,1,!1,!0,!1,P.aB(C.o,null)),null,0,3,100,!1,3,!1,C.t,0,$.$get$bZ())
x=y.y
a.a.q(0,y)
return U.cP(c,[y],"{rock|cavern} floor",b,P.ag([1,new O.uh(x),9,new O.ui(x)]))},"$3","wv",6,0,10],
xo:[function(a,b,c){var z=[O.hP(),O.hO(!0)]
a.gev().av(0,z)
return U.cP(c,z,"{rough|stone} floor",b,P.aA())},"$3","ww",6,0,10],
aW:function(a){return a.a.bB(0,new O.uk())},
um:function(a){return a.X(O.aW(a).gi(),new O.un())},
uo:function(a,b){a.X(O.aW(a).gi(),new O.up(b))},
ex:function(a){var z=a.f
if(H.H(z.length!==0?C.a.gv(z):null,"$isM").c===!0)return!1
return C.a.a7(C.Z,H.H(z.length!==0?C.a.gv(z):null,"$isM").a)},
ir:function(a,b){var z,y,x,w,v,u,t,s,r
for(z=a.a,y=z.ga_(z),x=new H.bR(y,new O.uB(),[H.m(z,0)]);x.t();){w=y.gS()
if(!w.gb_()){v=H.H(w.e,"$isb2")
y=b
x=v.c
u=v.d
v.r
t=P.P(C.o,!1,null)
t.fixed$length=Array
t.immutable$list=Array
s=a.Y(w.y)
r=s.a1(new O.uC(new G.b2(y,x,u,!0,!0,!1,t)))
z.a3(0,s)
z.q(0,r)
break}}},
uO:function(a){var z=O.aW(a).gay().cj(0,new O.uP())
a.X(O.aW(a).gi(),new O.uQ(z))},
eA:function(a,b){var z,y,x
z=H.H(a.c,"$iscM").b
if(z>=5)return
b.A(0,C.a1[z],!0)
y=H.H(a.c,"$iscM")
y.toString
x=new M.e8(null,!1,0,0)
x.m(y)
a.c=new O.uR().$1(x).p()},
eB:function(a,b,c,d){b.X(a.gi(),new O.uW())
if(!d)c.q(0,"TODO: create fight")},
wk:function(a,b){a.X(b.gi(),new O.wl(b))},
hO:function(a){var z,y
z=$.$get$en().ao(999999)
y=a?new Z.aE("spear",0,1,!1,!1,!1,P.aB(C.D,null)):new G.b2("scimitar",1,1,!1,!0,!1,P.aB(C.o,null))
return R.b6(1000+z,"goblin",O.dh(),null,null,y,null,0,1,0,!1,1,!1,C.t,0,$.$get$bZ())},
hP:function(){return R.b6(1000+$.$get$en().ao(999999),"orc",O.dh(),null,null,new G.b2("sword",1,1,!1,!0,!1,P.aB(C.o,null)),null,0,2,0,!1,2,!1,C.t,0,$.$get$bZ())},
ub:{"^":"a:6;a",
$2:function(a,b){var z,y,x
z=this.a
y=a.Y(z)
x=new G.b2("scimitar",1,1,!1,!0,!1,P.aB(C.o,null))
y.ad(b,"<subject> {drop<s>|let<s> go of} the whip")
y.ae(b,"<subject> draw<s> <subject's> <object>",x)
a.X(z,new O.ua(x))
y.hu(b,'"You\'re dead, slave," <subject> growl<s> at <object> with hatred.',O.aW(a),!0)}},
ua:{"^":"a:0;a",
$1:function(a){a.sT(this.a)
return a}},
uc:{"^":"a:6;a",
$2:function(a,b){a.Y(this.a).ad(b,"<subject> spit<s> on the cavern floor")}},
ud:{"^":"a:6;a",
$2:function(a,b){var z=a.Y(this.a)
b.fO()
z.dI(b,'"I\'ll enjoy eating your flesh, human," <subject> snarl<s>.',!0)
b.A(0,"\n\n",!0)}},
ue:{"^":"a:6;a",
$2:function(a,b){var z=a.Y(this.a)
z.ad(b,"<subject> grit<s> <subject's> teeth")
z.al(b,"<subject> do<es>n't talk any more",!0)}},
uf:{"^":"a:6;a",
$2:function(a,b){a.Y(this.a).ad(b,"<subject> scowl<s> with pure hatred")}},
uh:{"^":"a:6;a",
$2:function(a,b){a.Y(this.a).hu(b,'"Good good good," <subject> whisper<s>, eyeing <object>.',O.aW(a),!0)}},
ui:{"^":"a:6;a",
$2:function(a,b){var z=a.Y(this.a)
b.fO()
z.dI(b,'"Pain is good," <subject> chuckle<s>.',!0)
b.A(0,"\n\n",!0)}},
uk:{"^":"a:0;",
$1:function(a){return a.gH()}},
un:{"^":"a:0;",
$1:function(a){a.gay().q(0,new Z.aE("spear",0,1,!1,!1,!1,P.aB(C.D,null)))
return a}},
up:{"^":"a:0;a",
$1:function(a){var z=a.gbh()
if(typeof z!=="number")return z.ai()
a.sbh(z+this.a)
return a}},
uB:{"^":"a:0;",
$1:function(a){return J.e(a.gb3(),$.$get$ey())}},
uC:{"^":"a:0;a",
$1:function(a){a.sT(this.a)
return a}},
uP:{"^":"a:0;",
$1:function(a){return C.a.a7(a.geZ(),C.r)}},
uQ:{"^":"a:0;a",
$1:function(a){a.gay().a3(0,this.a)
return a}},
uR:{"^":"a:0;",
$1:function(a){var z
a.gcv()
z=a.c
a.gcv()
a.c=z+1
return a}},
uW:{"^":"a:0;",
$1:function(a){a.san(new E.bq("shield",P.aB(C.a0,null)))
return a}},
wl:{"^":"a:0;a",
$1:function(a){var z=this.a
if(!z.gb_())a.gay().q(0,z.e)
a.sT($.$get$is())}}}],["","",,V,{"^":"",
lD:function(){var z=new V.dx(null,null,null)
new V.tA().$1(z)
return z.p()},
ta:{"^":"a:5;",
$3:function(a,b,c){c.A(0,"",!0)}},
tb:{"^":"a:5;",
$3:function(a,b,c){c.A(0,"",!0)}},
t8:{"^":"a:5;",
$3:function(a,b,c){c.A(0,"The tunnel back to the main slave quarters is suicide. There will be too many orcs, and the Gate of Screams is a long way beyond. That leaves two options. The black passage towards the war forges, and the deserted tunnel to the Unholy Church, an underground temple.\n",!0)}},
t9:{"^":"a:5;",
$3:function(a,b,c){c.A(0,"The corpse lies still, getting cold.\n",!0)
O.eA(b,c)
c.A(0,"",!0)}},
oc:{"^":"Z;V:c<,h:d<,b,a",
G:function(a,b){var z=b.f
if(!J.e(H.H(z.length!==0?C.a.gv(z):null,"$isM").a,"cave_with_agruth"))return!1
if(b.aN(this.d))return!1
return!0},
R:[function(a,b,c){c.A(0,"You search his pockets but turn up with nothing. Just then, you realize that if Agruth had something valuable on him, he would have hidden it well. You run your hand inside his vest and find a troma herb. This boosts your energy right when you need it--very handy. (Your stamina increases by 1.)",!0)
O.uo(b,1)
return H.b(a.gh())+" successfully performs SearchAgruth"},"$3","gN",6,0,1],
P:[function(a,b,c){throw H.c(new P.x("Success chance is 100%"))},"$3","gM",6,0,1],
I:function(a,b){return 1},
gO:function(){return!1},
ac:function(a,b){return"Will you be successful?"},
gL:function(){return},
gJ:function(){return"You have taken his weapon but there might be other useful items in his pocket."},
gK:function(){return!1}},
t6:{"^":"a:5;",
$3:function(a,b,c){c.A(0,'There is light at the end of the tunnel, Briana points ahead. You approach it with suspicion, but soon there is no question about it. The fresh air, the howling of the wind, the brightness of the light. After three years, you step out of the mountain you thought would be your grave. \n\n\nYou have to close your eyes to keep the blinding sun out. You let the wind chill your muscles. \n\n\nThen you open your eyes and see the valley and beyond. The black smoke of orc camps and razed villages. The burned forests. The cracks in the wall of the distant fort ironcast, just visible over the TODO hill. No birds, only those horrible dark eagles, with no head, and eight eyes where the neck on a normal \n\n\n"We must stop this." \n\n\nBriana: "This is much larger than us, Aren. If the dead prince is back, that\'s a problem for kings, not peasants."\n\n\n"That may be so. But no kings have what I have."\n\n\n"Orcthorn? Bah, you think they\'ll let you have it? A farm boy? / Muscles and a bit of brains? Don\'t be a fool, you\'re still a farm boy."\n\n\n"I\'m not a farm boy. And I don\'t mean Orcthorn / my own smarts. No, I have a connection."\n\n\n\n\n"A connection."\n\n\n"With the dead prince. I dream his dreams. I think I have some of his power. You know  I survived 3 years even though  none other made it for more than a few months. I think he wants me for something."\n\n\n"And you plan is?"\n\n\n(IMG long view of the road ahead) \n\n\n"Not giving it to him. Giving him the exact opposite of what he wants."\n\n\nTODO: "you know we could just run as fast as we can, kicking some orcs in their faces along the way, right?" yes "that others would do exactly that." But we won\'t. "yeah. We won\'t."\n\n\nWith that, you sheathe (weapon) and start down the road towards the black fort in the distance.\n',!0)}},
t7:{"^":"a:5;",
$3:function(a,b,c){c.A(0,"",!0)}},
t3:{"^":"a:5;",
$3:function(a,b,c){c.A(0,"The crevice is small.\n",!0)}},
t4:{"^":"a:5;",
$3:function(a,b,c){c.A(0,"",!0)}},
t1:{"^":"a:5;",
$3:function(a,b,c){c.A(0,"It's a small, circular room. There are exits on four sides, all marked with where they lead to. \n\n\nLeaning on the wall next to one of the exits is a goblin guard. He's sleeping. He holds a sword in one hand, and there's a shield laid on his lap.\n",!0)}},
t2:{"^":"a:5;",
$3:function(a,b,c){c.A(0,"",!0)
if(b.aN("guardpost_above_church_take_shield")&&!b.jf("guardpost_above_church_take_shield"))c.q(0,"The goblin's corpse is sprawled on the ground.")
else c.q(0,"The goblin is sleeping soundly.")
c.A(0,"",!0)}},
lC:{"^":"Z;V:c<,h:d<,b,a",
G:function(a,b){var z=b.f
if(!J.e(H.H(z.length!==0?C.a.gv(z):null,"$isM").a,"guardpost_above_church"))return!1
if(b.dL(this.d)!=null)return!1
return!0},
R:[function(a,b,c){c.A(0,"TODO - take without waking the guard",!0)
O.eB(a,b,c,!0)
return H.b(a.gh())+" successfully performs GuardpostAboveChurchTakeShield"},"$3","gN",6,0,1],
P:[function(a,b,c){c.A(0,"TODO - start taking, guard is beginning to wake. You have to stay in an uncomfortable position for a minute before continuing",!0)
C.a.q(b.f,V.lD())
return H.b(a.gh())+" fails to perform GuardpostAboveChurchTakeShield"},"$3","gM",6,0,1],
I:function(a,b){return 0.8},
gO:function(){return!1},
ac:function(a,b){return"Will you be successful?"},
gL:function(){return},
gJ:function(){return"TODO"},
gK:function(){return!1}},
f9:{"^":"ac;",
gbN:function(){return[new A.fV(new V.lF(),"Stay perfectly still","If you stop moving, the guard will probably go back to sleep. But in this position, staying perfectly still even for a single minute will be quite a feat.","guardpost_above_church_take_shield_rescue",!0,null),new A.fV(new V.lG(),"Snag the shield","TODO","guardpost_above_church_take_shield_continuation_of_failure",!0,null)]},
gh:function(){return"guardpost_above_church_take_shield"},
aw:function(){var z=new V.dx(null,null,null)
z.m(this)
new V.lH().$1(z)
return z.p()},
aU:function(a,b){if(a!==0)return
return b.a.bB(0,new V.lI())},
b4:function(a,b){return[a.bB(0,new V.lJ())]}},
tA:{"^":"a:0;",
$1:function(a){var z=$.$get$a7().ao(1073741823)
a.gbM().b=z
a.gbM().c=0
return a}},
lF:{"^":"a:26;",
$4:function(a,b,c,d){J.eL(c,"TODO - staying still, drops of sweat dripping on the guard, but ultimately the guard goes back to sleep and you take the shield",!0)
b.X(a.gi(),new V.lE())
O.eB(a,b,c,!0)
b.az()
return"GuardpostAboveChurchTakeShieldRescueSituation resolved with rescue/continuation (Stay perfectly still)"}},
lE:{"^":"a:0;",
$1:function(a){var z=a.gbh()
if(typeof z!=="number")return z.aq()
a.sbh(z-1)
return a}},
lG:{"^":"a:26;",
$4:function(a,b,c,d){J.eL(c,"TODO",!0)
O.eB(a,b,c,!1)
b.az()
return"GuardpostAboveChurchTakeShieldRescueSituation resolved with rescue/continuation (Snag the shield)"}},
lH:{"^":"a:0;",
$1:function(a){var z=a.gbM().c
if(typeof z!=="number")return z.ai()
a.gbM().c=z+1
return a}},
lI:{"^":"a:0;",
$1:function(a){return a.gH()}},
lJ:{"^":"a:0;",
$1:function(a){return a.gH()}},
t_:{"^":"a:5;",
$3:function(a,b,c){c.A(0,'You are Aren, a slave. You have spent three painful years inside this mountain, between the foul-smelling cave walls, and under the whip of the orcs and the goblins that live here. \n\n\nYou watch Briana straighten over Agruth\'s corpse. The fear has gone from her face during the short battle but the anger remains. She kicks the dead slaver in the hip. When she notices you looking at her, she looks back. "What?" she says flatly. You shrug.\n\n\n"When someone hurts me, I hurt them back," Briana says. "I am a simple person."\n\n\n"The world, on the other hand, is often not that simple and\u2026"\n\n\n"Oh, but it is," Briana intercepts, smoothing her hair and using the quickly forming pool of Agruth\'s blood as a mirror.\n\n\n"... and this one is already dead."\n\n\n"I was making sure."\n\n\nShe spits on the body and turns the attention to the sword. "You know, we should name the weapon\u2014it\'s the only thing we have going for us right now. And I refuse to carry it around referring to it as _Agruth\'s_." She makes a pained grimace when she says the orc\'s name. "That creature does not deserve another mention."\n',!0)}},
t0:{"^":"a:5;",
$3:function(a,b,c){c.A(0,"",!0)}},
mx:{"^":"Z;V:c<,h:d<,b,a",
G:function(a,b){var z=b.f
if(!J.e(H.H(z.length!==0?C.a.gv(z):null,"$isM").a,"just_after_agruth_fight"))return!1
return!0},
R:[function(a,b,c){c.A(0,"You look at the sword. \"You're right. We'll call it Luck Bringer. It's our only chance to get out of this hell.\"\n\n\nBriana nods. \"Luck Bringer it is. Now let's just get out of here as quickly as possible\"",!0)
O.ir(b,"Luck Bringer")
b.at("RoomRoamingSituation").dD(b,O.aW(b),"cave_with_agruth_pre",c)
return H.b(a.gh())+" successfully performs NameAgruthSwordOpportunity"},"$3","gN",6,0,1],
P:[function(a,b,c){throw H.c(new P.x("Success chance is 100%"))},"$3","gM",6,0,1],
I:function(a,b){return 1},
gO:function(){return!1},
ac:function(a,b){return"Will you be successful?"},
gL:function(){return},
gJ:function(){return""},
gK:function(){return!1}},
my:{"^":"Z;V:c<,h:d<,b,a",
G:function(a,b){var z=b.f
if(!J.e(H.H(z.length!==0?C.a.gv(z):null,"$isM").a,"just_after_agruth_fight"))return!1
return!0},
R:[function(a,b,c){c.A(0,'You look at the sword. "You\'re right. We\'ll call it Savior. It is our first step to freedom."\n\n\nBriana nods. "Savior it is. Now let\'s just get out of here as quickly as possible"',!0)
O.ir(b,"Savior")
b.at("RoomRoamingSituation").dD(b,O.aW(b),"cave_with_agruth_pre",c)
return H.b(a.gh())+" successfully performs NameAgruthSwordRedemption"},"$3","gN",6,0,1],
P:[function(a,b,c){throw H.c(new P.x("Success chance is 100%"))},"$3","gM",6,0,1],
I:function(a,b){return 1},
gO:function(){return!1},
ac:function(a,b){return"Will you be successful?"},
gL:function(){return},
gJ:function(){return""},
gK:function(){return!1}},
mw:{"^":"Z;V:c<,h:d<,b,a",
G:function(a,b){var z=b.f
if(!J.e(H.H(z.length!==0?C.a.gv(z):null,"$isM").a,"just_after_agruth_fight"))return!1
return!0},
R:[function(a,b,c){c.A(0,"\"That's foolish. It's just a sword, after all.\"\n\n\nBriana shrugs. \"Whatever, just don't ever call it Agruth's. I already have more respect to the piece of iron than to that worthless animal over here. Now let's just get out of here as quickly as possible\"",!0)
b.at("RoomRoamingSituation").dD(b,O.aW(b),"cave_with_agruth_pre",c)
return H.b(a.gh())+" successfully performs NameAgruthSwordNothing"},"$3","gN",6,0,1],
P:[function(a,b,c){throw H.c(new P.x("Success chance is 100%"))},"$3","gM",6,0,1],
I:function(a,b){return 1},
gO:function(){return!1},
ac:function(a,b){return"Will you be successful?"},
gL:function(){return},
gJ:function(){return""},
gK:function(){return!1}},
rY:{"^":"a:5;",
$3:function(a,b,c){c.A(0,'Violent grunts and growls are coming through that door. Next to it, an orcish writing on the wall says "Danger mad. Give food go away."\n',!0)}},
rZ:{"^":"a:5;",
$3:function(a,b,c){c.A(0,"TODO\n",!0)}},
rW:{"^":"a:5;",
$3:function(a,b,c){c.A(0,"The room is dark and wet. As you enter, the noises end. \n\n\n\n\nWhen your eyes become accustomed to the dark, you see two figures standing in front of you. One is much higher, almost touching the room's ceiling, but you slowly realize it's a stone statue. The other figure, though, is living.\n\n\n\n\nIts face is in constant motion, overwhelmed by tics and waves of hateful expressions. You realize it's a male orc, but an especially large one, with huge muscles and many scars. If he wasn't locked up here, he'd surely make a captain.\n",!0)}},
rX:{"^":"a:5;",
$3:function(a,b,c){c.A(0,"The room is quiet. The mad guardian's huge body lies on the floor beneath the statue.\n",!0)}},
pg:{"^":"Z;V:c<,h:d<,b,a",
G:function(a,b){var z=b.f
if(!J.e(H.H(z.length!==0?C.a.gv(z):null,"$isM").a,"orcthorn_room"))return!1
if(b.aN("talk_to_briana_3"))if(!b.aN(this.d))z=H.H(z.length!==0?C.a.gv(z):null,"$isM").c!==!0
else z=!1
else z=!1
if(!z)return!1
return!0},
R:[function(a,b,c){c.A(0,'TODO - this must be it. you search to room and find the sword hidden well (under a loose tile? under a heap of corpses?). then "why would they keep the sword at all? why wouldn\'t they destroy it?" - "fear. it\'s the ultimate authority. I don\'t think it was the orcs who decided to keep the sword intact."\n\n\nBriana: "I can\'t believe we did it. A farm boy and a freak."\n\n\n"A freak?"\n\n\n"A simple thing like this. You don\'t understand how much the orcs learned to fear the sword. A single knight could hold two dozens of orcs in check just by wielding that sword."\n\n\n"Well, we still need to get out of here."',!0)
O.wk(b,a)
return H.b(a.gh())+" successfully performs TakeOrcthorn"},"$3","gN",6,0,1],
P:[function(a,b,c){throw H.c(new P.x("Success chance is 100%"))},"$3","gM",6,0,1],
I:function(a,b){return 1},
gO:function(){return!1},
ac:function(a,b){return"Will you be successful?"},
gL:function(){return},
gJ:function(){return""},
gK:function(){return!1}},
rT:{"^":"a:5;",
$3:function(a,b,c){c.A(0,"TODO\n",!0)}},
rU:{"^":"a:5;",
$3:function(a,b,c){c.A(0,"TODO\n",!0)}},
op:{"^":"Z;V:c<,h:d<,b,a",
G:function(a,b){var z=b.f
if(!J.e(H.H(z.length!==0?C.a.gv(z):null,"$isM").a,"slave_quarters"))return!1
return!0},
R:[function(a,b,c){c.A(0,"TODO FIGHT",!0)
b.az()
return H.b(a.gh())+" successfully performs SlaveQuartersContinue"},"$3","gN",6,0,1],
P:[function(a,b,c){throw H.c(new P.x("Success chance is 100%"))},"$3","gM",6,0,1],
I:function(a,b){return 1},
gO:function(){return!1},
ac:function(a,b){return"Will you be successful?"},
gL:function(){return},
gJ:function(){return""},
gK:function(){return!1}},
rR:{"^":"a:5;",
$3:function(a,b,c){c.A(0,"You can see Briana clutching her fists. \"Are we homesick already?\" she says. But she doesn't wait for reply, and presses on.\n\n\nIt doesn't take long before you start hearing voices. Orcs and goblins shouting commands, mostly. Then human screams.\n\n\nThe tunnel gets wider and better lit by torches. The walls are smoother. You stop down next to a small, reinforced door. Up ahead, something is happening. A human slave is running towards you. His hand is visibly broken just above the elbow and blood is streaming down his limping left leg. His lips are moving but there is no sound anymore, only pain. Eyes in tears, he doesn't see you or anything else.\n\n\nBefore you can so much as call to him, something long and sharp shoots from behind the slave, and into his back. A bloodied spearhead appears in the center of the man's chest, as if growing from there. The tearful eyes go down, looking at the fatal wound. Two more steps and the slave falls face down, the shaft of the spear protruding upwards from his back.\n\n\nAn orc and a goblin appear from the tunnel, walking towards the dead man. The orc is laughing, patting his companion on the back. \"Vicious throw, small one!\" he roars.\n\n\nYou step back and motion Briana to lean on the wall, hoping that the door's embossed frame will provide enough cover before the two slavers turn again. \n\n\nBut at that time, something or someone smashes on that very door from the inside. Then come angry growls and something akin to barking and howling.\n\n\nThe door stays shut but the two slavers are now looking directly at you. The goblin yanks his spear from the corpse, and the orc unsheathes his sword. They start towards you.\n\n\n\n\n\n\n[IMAGE goblin spearman + orc]\n",!0)}},
rS:{"^":"a:5;",
$3:function(a,b,c){c.A(0,"The small door is TODO open/close.\n",!0)}},
oq:{"^":"Z;V:c<,h:d<,b,a",
G:function(a,b){var z=b.f
if(!J.e(H.H(z.length!==0?C.a.gv(z):null,"$isM").a,"slave_quarters_passage"))return!1
if(!b.aN(this.d))z=H.H(z.length!==0?C.a.gv(z):null,"$isM").c!==!0
else z=!1
if(!z)return!1
return!0},
R:[function(a,b,c){c.A(0,'Violent grunts and growls are coming through that door. Next to it, an orcish writing on the wall says "Danger mad. Give food go away."',!0)
return H.b(a.gh())+" successfully performs SlaveQuartersPassageExamineDoor"},"$3","gN",6,0,1],
P:[function(a,b,c){throw H.c(new P.x("Success chance is 100%"))},"$3","gM",6,0,1],
I:function(a,b){return 1},
gO:function(){return!1},
ac:function(a,b){return"Will you be successful?"},
gL:function(){return},
gJ:function(){return""},
gK:function(){return!1}},
rP:{"^":"a:5;",
$3:function(a,b,c){c.A(0,"A blast of smoke and heat greets you as you enter this room. The roaring fire and the clanging of metal draws your attention to the far wall, where scores of orcs shovel coal into a giant furnace. These is the smelter.\n\n\nOrc teams tilt huge kettles of molten steel into troughs that lead the white-hot liquid across the room, into a large pool. From that pool, a single ogre is distributing the forge-ready steel into troughs that lead to the war forges below. \n\n\nHe's no more than a spear's throw away from you, but doesn't notice. In fact, he may well be blind, with all the molten steel around him. The orcs are much farther away and too busy to look around.\n\n\nA small crevice appears to be sucking the hot air. TODO describe  other exits\n",!0)}},
rQ:{"^":"a:5;",
$3:function(a,b,c){c.A(0,"The reds and whites of the molten steel reflect in the heaps of coal.\n",!0)}},
ot:{"^":"Z;V:c<,h:d<,b,a",
G:function(a,b){var z=b.f
if(!J.e(H.H(z.length!==0?C.a.gv(z):null,"$isM").a,"smelter"))return!1
if(!(!b.aN(this.d)&&b.aN("war_forge_look_around")&&O.aW(b).h7(C.r)))return!1
return!0},
R:[function(a,b,c){c.A(0,"throwing spear at the orc that holds the molten steel gate\n\n\nWhy would you do that? You just wasted a perfectly good spear on a stupid ogre that posed no threat to us.\n\n\nWatch.\n\n\n(molten steel ruins everything)\n\n\nThe less simple you see the world, the easier it is for you to change it. \n\n\nYou got lucky. \n\n\nThat was some throw! That thing downstairs.. I don't know what it is but I would not want to meet it in battle. - it is probably meant to scale castle walls. - so, fort ironcast. One well placed spear may have prevented the fall of Ironcast. - delayed. - what? - we delayed the fall of the fort, at best.",!0)
O.uO(b)
return H.b(a.gh())+" successfully performs SmelterThrowSpear"},"$3","gN",6,0,1],
P:[function(a,b,c){throw H.c(new P.x("Success chance is 100%"))},"$3","gM",6,0,1],
I:function(a,b){return 1},
gO:function(){return!1},
ac:function(a,b){return"Will you be successful?"},
gL:function(){return},
gJ:function(){return""},
gK:function(){return!1}},
rN:{"^":"a:5;",
$3:function(a,b,c){c.A(0,"The path from slavery to power begins with a single crack of a whip. Briana wheels around, her face red with pain and anger. She is new here, but she knows what will follow. \n\n\n\n\nOnce Agruth starts whipping, the victim ends up dead. Agruth loves killing slaves. \n\n\n\n\nAnother crack and there is new blood on Briana's face. Agruth grins.\n\n\n\n\nNobody else is in sight. It's just you, Agruth and Briana. That's Agruth's main mistake.\n",!0)}},
rO:{"^":"a:5;",
$3:function(a,b,c){c.A(0,"",!0)}},
pi:{"^":"Z;V:c<,h:d<,b,a",
G:function(a,b){if(!(b.dL(this.d)==null&&O.ex(b)))return!1
return!0},
R:[function(a,b,c){c.A(0,'"You were caught not too long ago, I think. What can you tell me about outside?"\n\n\n\n\nBriana: "How long have you been here?"\n\n\n\n\n"Three years."\n\n\n\n\n"Three years! Gods. A lot has happened in the last winter alone. The orcs have taken the upper valley, and make raids way beyond Fort Ironcast."\n\n\n\n\n"So when we escape from here \u2014 *if* we escape from here \u2014 we still have to cover miles of orc territory."\n\n\n\n\n"Correct. The closest safe place is the fort."',!0)
return H.b(a.gh())+" successfully performs TalkToBriana1"},"$3","gN",6,0,1],
P:[function(a,b,c){throw H.c(new P.x("Success chance is 100%"))},"$3","gM",6,0,1],
I:function(a,b){return 1},
gO:function(){return!1},
ac:function(a,b){return"Will you be successful?"},
gL:function(){return},
gJ:function(){return""},
gK:function(){return!1}},
pj:{"^":"Z;V:c<,h:d<,b,a",
G:function(a,b){if(!(b.aN("talk_to_briana_1")&&b.dL(this.d)==null&&O.ex(b)))return!1
return!0},
R:[function(a,b,c){c.A(0,'"Where did they catch you?"\n\n\n\n\nBriana: "At the Gate of Screams. I was trying to sneak in."\n\n\n\n\n"You what?"\n\n\n\n\n"I know. It seemed like a stupid idea even then. I wanted to get in, steal back the Orcthorn, get out, help the fight."',!0)
return H.b(a.gh())+" successfully performs TalkToBriana2"},"$3","gN",6,0,1],
P:[function(a,b,c){throw H.c(new P.x("Success chance is 100%"))},"$3","gM",6,0,1],
I:function(a,b){return 1},
gO:function(){return!1},
ac:function(a,b){return"Will you be successful?"},
gL:function(){return},
gJ:function(){return""},
gK:function(){return!1}},
pk:{"^":"Z;V:c<,h:d<,b,a",
G:function(a,b){if(!(b.aN("talk_to_briana_2")&&b.dL(this.d)==null&&O.ex(b)))return!1
return!0},
R:[function(a,b,c){c.A(0,'"What\'s Orcthorn?"\n\n\n"A sword. It has killed hundreds of orc, wielded by many different knights. Even more orcs died trying to seize it, almost to no avail."\n\n\n"Almost."\n\n\n"Yes. Last full moon, an orcish captain and a company of (TODO: alpha) warriors ambushed Lord TODO. He was the wielder of Orcthorn at that time, and they knew it. They slaughtered his company and brought the sword here, to Bloodrock. Since then, the orcs are bolder and more successful."\n\n\n"The mad guardian."\n\n\n"The mad who?"\n\n\n"That\'s what Agruth and the other slavers were talking about a couple of weeks back. One orc was tasked with guarding a sword. That seemed wierd enough to me. Guarding a sword? Stranger yet, that orc went mad after only a few days of doing this. Now they keep him in a cell, and call him _grach kamkorr_. The mad guardian. That sword is still with him. Hidden there in the cell."\n\n\n"Where is that cell?"\n\n\n"Somewhere in the slave quarters."',!0)
return H.b(a.gh())+" successfully performs TalkToBriana3"},"$3","gN",6,0,1],
P:[function(a,b,c){throw H.c(new P.x("Success chance is 100%"))},"$3","gM",6,0,1],
I:function(a,b){return 1},
gO:function(){return!1},
ac:function(a,b){return"Will you be successful?"},
gL:function(){return},
gJ:function(){return""},
gK:function(){return!1}},
rL:{"^":"a:5;",
$3:function(a,b,c){c.A(0,"This must be the place that the orcs call the Shafts. It's a tall, seemingly endless room, with many walkways across.\n\n\n\n\n\n\nYou realize there is really only one way out, over one of the walkways. You'll have to run, there is no hiding anymore.\n",!0)}},
rM:{"^":"a:5;",
$3:function(a,b,c){c.A(0,"",!0)}},
tC:{"^":"a:5;",
$3:function(a,b,c){c.A(0,"TODO - start chase\n\n\nSuddenly, an **orc** and a **goblin** jump in front of you from a slimy crevice, swords in hands.\n\n\n\n\n![Orc and Goblin](img/orc_and_goblin_sketch.jpg)\n",!0)}},
tD:{"^":"a:5;",
$3:function(a,b,c){c.A(0,"",!0)}},
tr:{"^":"a:5;",
$3:function(a,b,c){c.A(0,"You enter something that at first looks like a large, twisting cave, but then opens into a high room with many columns. This must be what the orcs call the Underground Church. Your bare footsteps reverberate around the space, so you slow down to quiet them. There are no windows, of course, you are deep underground, but there is dim light coming from the far end of the place, where you expect the altar to be but can't quite see it. No torches here. Quiet. \n\n\n\n\nAfter a bit of searching, you also notice a twisty passage going from the right hand side of the Church and sloping upwards. That must be the way out.\n",!0)}},
tB:{"^":"a:5;",
$3:function(a,b,c){c.A(0,"The Underground Church stands silent, as if holding breath.\n",!0)
O.eA(b,c)
c.A(0,"",!0)}},
l7:{"^":"Z;V:c<,h:d<,b,a",
G:function(a,b){var z=b.f
if(!J.e(H.H(z.length!==0?C.a.gv(z):null,"$isM").a,"underground_church"))return!1
if(b.aN(this.d))return!1
return!0},
R:[function(a,b,c){c.A(0,'This place was not built by the orcs or their slaves. Walls are straight and smooth. The columns are decorated with delicate embossments of skulls and tentacles.\n\n\nBriana: "So this is it? This is where the Dead Prince resides?"\n\n\n"This is one of many of these temples inside the mountain. So I think not."\n\n\n"So where is he? Everyone knows he\'s from Mt. Bloodrock."\n\n\n"The Dead Prince is _somewhere_ here, that\'s correct. But where exactly? The orcs say the whole mountain is his vessel. Whatever that means."\n\n\nThe glow coming from the altar dims for a moment, then lights up again.',!0)
return H.b(a.gh())+" successfully performs ExamineUndergroundChurch"},"$3","gN",6,0,1],
P:[function(a,b,c){throw H.c(new P.x("Success chance is 100%"))},"$3","gM",6,0,1],
I:function(a,b){return 1},
gO:function(){return!1},
ac:function(a,b){return"Will you be successful?"},
gL:function(){return},
gJ:function(){return""},
gK:function(){return!1}},
t5:{"^":"a:5;",
$3:function(a,b,c){c.A(0,'TODO - altar, "you are brave, my friend. Or stupid. So am I for following you.", "We are way over our head here." , eight black eyes, spear that some goblin must have forgotten here, there is motion behind the altar (wait)\n',!0)}},
tg:{"^":"a:5;",
$3:function(a,b,c){c.A(0,"The altar glows with a dim red light that reflect in the eight black eyes above it.\n",!0)}},
pz:{"^":"Z;V:c<,h:d<,b,a",
G:function(a,b){var z=b.f
if(!J.e(H.H(z.length!==0?C.a.gv(z):null,"$isM").a,"underground_church_altar"))return!1
if(b.aN(this.d))return!1
return!0},
R:[function(a,b,c){c.A(0,'TODO - build up with sounds\n\n\nA lich orc enters from a steel door on the right of the altar and the whole temple sounds a tone that is powerful and sickening at the same time. After the lich, a huge creature enters through the door, crouching below the door\'s frame. It\'s unclear what it is, but perhaps some large breed of ogre, and judging by the braided hair, a female. Her sword is as long as you are tall, but she doesn\'t wield it. She leads someone on a chain. An orc. Despite being a strong one, probably captain or even chieftain, he is dwarfed by the creature before him, and he visibly shakes in horror.\n\n\nTODO: the lich will take him on the altar. Aren says \'maggots\', somehow he knows. From underneath the altar, a large horde of maggots appears. The orc tries to escape, horrified, but the ogre pin him. The maggots crawl all over the orc, and as he screams, the church reacts with tones. The lich raises his hands as if in offering. Somehow, Aren find the whole experience invigorating (+2 stamina). Once the orc is dead, rychl\xfd process. Ogre drag the body. Leave. Briana : "how did you know it will be maggots?". Aren : "I\'ll explain when we get out of here." Briana : "And if it was meant to be an offering, why did they not leave the body?" Aren : "that I don\'t know"\n\n\nTODO: foreshadow \'special connection\' via "This place does something weird to people" - "I know" - "And I don\'t mean the abuse" - "I know"',!0)
return H.b(a.gh())+" successfully performs WaitForRitual"},"$3","gN",6,0,1],
P:[function(a,b,c){throw H.c(new P.x("Success chance is 100%"))},"$3","gM",6,0,1],
I:function(a,b){return 1},
gO:function(){return!1},
ac:function(a,b){return"Will you be successful?"},
gL:function(){return},
gJ:function(){return""},
gK:function(){return!1}},
ph:{"^":"Z;V:c<,h:d<,b,a",
G:function(a,b){var z=b.f
if(!J.e(H.H(z.length!==0?C.a.gv(z):null,"$isM").a,"underground_church_altar"))return!1
if(b.aN(this.d))return!1
return!0},
R:[function(a,b,c){c.A(0,"TODO - a forgotten, orcish spear",!0)
O.um(b)
return H.b(a.gh())+" successfully performs TakeSpearInUndergroundChurch"},"$3","gN",6,0,1],
P:[function(a,b,c){throw H.c(new P.x("Success chance is 100%"))},"$3","gM",6,0,1],
I:function(a,b){return 1},
gO:function(){return!1},
ac:function(a,b){return"Will you be successful?"},
gL:function(){return},
gJ:function(){return""},
gK:function(){return!1}},
rK:{"^":"a:5;",
$3:function(a,b,c){c.A(0,"You enter the enormous cave that holds Mount Bloodrock's war forges. This space is so vast that it has its own climate, with dark clouds covering most of the ceiling, and what looks like black rain falling in the distance. Weird bats are circling just below the clouds, their shrieks mixing with the clangs of steel and angry shouts below.\n\n\nOne side of the cave is artificial, like a room's wall, and beyond that is the smelter. From an opening high on the wall, troughs of molten steel descend into all parts of the room like huge fiery tentacles. At the end of each, teams of orcs pour the steel into molds for axes, war hammers, and greatswords. The strong smell of iron and soot almost overcomes all the orc sweat.\n\n\n\n\nYou and Briana duck behind some carts on a walkway way above the floor of the cave. You can guess which corridor leads to the smelter. It's up a flight of stairs that hugs one side of the room, and thankfully there is nobody in the way.\n",!0)}},
rV:{"^":"a:5;",
$3:function(a,b,c){c.A(0,"The air in the war forges is heavy and the noise overwhelming.\n",!0)
O.eA(b,c)
c.A(0,"",!0)}},
pA:{"^":"Z;V:c<,h:d<,b,a",
G:function(a,b){var z=b.f
if(!J.e(H.H(z.length!==0?C.a.gv(z):null,"$isM").a,"war_forge"))return!1
if(b.aN(this.d))return!1
return!0},
R:[function(a,b,c){c.A(0,'You crane your neck from your hiding and take the scene in. More likely than not, no human has ever seen this place and lived to tell the tale.\n\n\nBriana shakes her head: "The orcs are working together with ogres. They must be terrified."\n\n\nYou scan the workers, noticing the slow-moving ogres that tower over the orcs. "And they don\'t use slaves here," you say. "There must be something important going on here." Looking again at the molds they are using, you don\'t see anything out of the expected. Primitive axes and swords, some armor.\n\n\n"What is that thing!" Briana gasps. You follow her stare and at first all you see is just a cluster of slightly larger forges. Then you squint and an image appears. An image of an enormous, repulsive, half-assembled insect. Each leg, or whatever they are, is as long as a good rock\'s throw. There are eight of them. Then there\'s the body \u2014 a huge cockroach-like contraption. The teeth of steel are already completed, sharp and menacing and as long as a man. \n\n\nA full-sized ogre is pouring water over one part of the form just now, producing a cloud of steam. You can\'t see much else. From the high opening in the smelter wall, molten steel is starting to flow down to fill another part of the iron monster.',!0)
return H.b(a.gh())+" successfully performs WarForgeLookAround"},"$3","gN",6,0,1],
P:[function(a,b,c){throw H.c(new P.x("Success chance is 100%"))},"$3","gM",6,0,1],
I:function(a,b){return 1},
gO:function(){return!1},
ac:function(a,b){return"Will you be successful?"},
gL:function(){return},
gJ:function(){return""},
gK:function(){return!1}},
pR:{"^":"f9;i:a<,U:b<",
a1:function(a){var z=new V.dx(null,null,null)
z.m(this)
a.$1(z)
return z.p()},
w:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof V.f9))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
y=z==null?y==null:z===y
z=y}else z=!1
return z},
gB:function(a){return Y.U(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)))},
k:function(a){return"GuardpostAboveChurchTakeShieldRescueSituation {id="+J.h(this.a)+",\ntime="+J.h(this.b)+",\n}"}},
dx:{"^":"d;a,b,c",
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
z=new V.pR(y,x)
if(y==null)H.i(P.l("id"))
if(x==null)H.i(P.l("time"))}this.m(z)
return z}}}],["","",,O,{"^":"",
xk:[function(a){var z,y
z=$.$get$dl()
y=z.C
if(y.length>0){y+=" "
z.C=y}z.C=y+a},"$1","uU",2,0,15],
xp:[function(a){$.ev=a},"$1","uV",2,0,15],
i5:[function(a,b,c,d,e,f,g){var z=L.eZ(a,!1,!1,d,e,f,g)
$.$get$bY().q(0,z)
return z},function(a){return O.i5(a,!1,!1,null,null,null,null)},function(a,b,c){return O.i5(a,!1,!1,null,b,c,null)},"$7$deferToChoiceList$deferToEndOfPage$goto$helpMessage$script$submenu","$1","$3$helpMessage$script","uT",2,13,51,0,0,0,1,1,0],
nO:{"^":"o_;",
bA:function(){var z=0,y=P.az(),x,w=2,v,u=[],t=this,s,r,q,p,o,n,m,l,k,j
var $async$bA=P.aw(function(a,b){if(a===1){v=b
z=w}while(true)switch(z){case 0:if($.cp){n=t.Q
n.toString
m=new A.v(667,null,null,null,null)
m.c="Sending updated stats."
n.a.F(m.E())
m=t.Q
n=Z.oB()
m.toString
l=new A.v(100,null,null,null,null)
l.e=n.E()
m.a.F(l.E())
new P.F(0,$.q,null,[null]).bC(!0)}if(t.r){n=t.Q
n.toString
m=new A.v(667,null,null,null,null)
m.c="Saving player chronology."
n.a.F(m.E())
t.r=!1
m=t.Q
m.toString
n=new A.v(60,null,null,null,null)
n.b=t.f.ct(0)
m.a.F(n.E())}s=null
case 3:n=t.Q
n.toString
m=new A.v(667,null,null,null,null)
m.c="Calling _goOneStep()."
n.a.F(m.E())
w=7
z=10
return P.av(t.cE(),$async$bA)
case 10:s=b
w=2
z=9
break
case 7:w=6
j=v
n=H.B(j)
if(n instanceof M.cF){r=n
q=H.D(j)
n=t.Q
m=H.b(r)+"\nStacktrace: "+H.b(q)
n.toString
l=new A.v(666,null,null,null,null)
l.c="AuthorScriptException: "+m
n.a.F(l.E())
z=1
break}else{p=n
o=H.D(j)
n=t.Q
m=H.b(p)+"\nStacktrace: "+H.b(o)
n.toString
l=new A.v(666,null,null,null,null)
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
m=new A.v(667,null,null,null,null)
m.c="Ending _goOneStep() loop."
n.a.F(m.E())
case 1:return P.aG(x,y)
case 2:return P.aF(v,y)}})
return P.aH($async$bA,y)},
eU:function(){var z,y
this.fu()
this.f.be(0)
this.r=!0
this.e=this.c
z=this.Q
Z.hu(Z.bP())
z.toString
y=new A.v(90,null,null,null,null)
y.b=Z.bP()
z.a.F(y.E())
this.bA()},
lf:[function(a){var z,y
z={}
z.a=null
y=$.$get$bY()
y.Z(0,new O.oa(z,this,a))
z=z.a
if(z==null)throw H.c(P.E("The sent choice hash ("+H.b(a)+") is not one of those offered ("+J.h(y)+")"))
this.iX(z)
this.bA()},"$1","giI",2,0,32],
iX:function(a){var z
if(a.gh1()!=null){z=a.r
$.$get$cv().aB(z)}z=a.x
if(z!=null)this.eo(z)},
cE:function(){var z=0,y=P.az(),x,w=[],v=this,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c
var $async$cE=P.aw(function(a,a0){if(a===1)return P.aF(a0,y)
while(true)switch(z){case 0:u={}
r=$.$get$cw()
q=r.b
if(q.b!==q.c){u=v.Q
u.toString
q=new A.v(667,null,null,null,null)
q.c="Awarding points."
u.a.F(q.E())
p=r.b.dH()
r=v.Q
q=p.gjv()
u=p.b
o=p.c
r.toString
n=new A.v(70,null,null,null,null)
n.b=[q,u]
n.c=o
r.a.F(n.E())
r=new P.F(0,$.q,null,[null])
r.bC(null)
r.c3(new O.o0(v))
x=!0
z=1
break}m=v.x===v.e.gax().length-1||v.x===v.y
u.a=m
r=v.x
q=v.y
if(r!==q)if(r!=null){if(r<v.e.gax().length){r=v.e.gax()
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
k=new A.v(667,null,null,null,null)
k.c=r
o.a.F(k.E())
k=$.$get$bY()
k.iF(new O.o1(v),!1)
if(k.gl(k)!==0){r=v.Q
r.toString
o=new A.v(667,null,null,null,null)
o.c="We have choices."
r.a.F(o.E())
o=H.y(k,"ba",0)
o=P.P(new H.K(k,new O.o2(u,l),[o]),!0,o)
r=k.a
H.p([],[L.aa])
j=new L.f_(r,o)
if(!j.gW(j)){u=v.Q
r=u.e
if(r!=null){r.dw(new D.c3("Showing new choice before previous one was selected."))
u.e=null}r=P.t
u.e=new P.cq(new P.F(0,$.q,null,[r]),[r])
r=j.dO()
u.a.F(r.E())
u=u.e.a.c3(v.giI())
i=new O.o3(v)
r=H.m(u,0)
q=$.q
if(q!==C.i){i=P.eo(i,q)
q.toString}u.dh(new P.ef(null,new P.F(0,q,null,[r]),6,new O.o4(),i,[r,r]))
x=!0
z=1
break}else{h=k.aQ(0,new O.o5(),new O.o6())
if(h!=null){if(h.gh1()!=null){r=h.r
$.$get$cv().aB(r)}r=h.x
if(r!=null)v.eo(r)
k.a3(0,h)}}}r=$.$get$cv()
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
return P.av(v.cF(f),$async$cE)
case 5:x=a0
z=1
break
case 4:r=$.ev
if(r!=null){v.eo(r)
$.ev=null
x=!1
z=1
break}r=v.x
if(r==null){v.x=0
r=0}else if(r===q){r=v.e.gax().length-1
v.x=r}else if($.hS)$.hS=!1
else{++r
v.x=r}u.a=r===v.e.gax().length-1
r="Resolving block: '"+H.b(v.e.gh())+"' block "+H.b(v.x)+"."
q=v.Q
q.toString
o=new A.v(667,null,null,null,null)
o.c=r
q.a.F(o.E())
if(v.x===v.e.gax().length){u=v.Q
u.toString
r=new A.v(667,null,null,null,null)
r.c="End of book."
u.a.F(r.E())
r=v.Q
u=v.e6()
r.toString
u=u.eX(50)
r.a.F(u.E())
v.Q.a.F(new A.v(80,null,null,null,null).E())
x=!0
z=1
break}r=v.e.gax()
q=v.x
if(q>>>0!==q||q>=r.length){x=H.f(r,q)
z=1
break}q=r[q]
z=typeof q==="string"?6:8
break
case 6:u=v.Q
r=v.e.gax()
q=v.x
if(q>>>0!==q||q>=r.length){x=H.f(r,q)
z=1
break}q=r[q]
r=P.a2
u.f=new P.cq(new P.F(0,$.q,null,[r]),[r])
r=new A.v(30,null,null,null,null)
r.c=q
u.a.F(r.E())
u.f.a.c3(new O.o7(v))
x=!0
z=1
break
z=7
break
case 8:r=v.e.gax()
q=v.x
if(q>>>0!==q||q>=r.length){x=H.f(r,q)
z=1
break}z=!!J.o(r[q]).$isN?9:11
break
case 9:r=v.Q
r.toString
q=new A.v(667,null,null,null,null)
q.c="A ChoiceList encountered."
r.a.F(q.E())
try{r=v.e.gax()
q=v.x
if(q>>>0!==q||q>=r.length){x=H.f(r,q)
z=1
break}k.jt(r[q])}catch(b){u=H.B(b)
if(u instanceof M.cF){t=u
s=H.D(b)
u=v.Q
r=H.b(t)+"\nStacktrace: "+H.b(s)
u.toString
q=new A.v(666,null,null,null,null)
q.c="AuthorScriptException: "+r
u.a.F(q.E())
x=!0
z=1
break}else throw b}r=v.Q
r.toString
q=new A.v(667,null,null,null,null)
q.c="- choices added"
r.a.F(q.E())
if(k.bs(0,new O.o8(u,v))&&v.x===v.e.gax().length-1){u=v.Q
u.toString
r=new A.v(667,null,null,null,null)
r.c="Creating & sending savegame"
u.a.F(r.E())
r=v.Q
u=v.e6()
r.toString
u=u.eX(50)
r.a.F(u.E())
x=!1
z=1
break}x=!1
z=1
break
z=10
break
case 11:r=v.e.gax()
q=v.x
if(q>>>0!==q||q>=r.length){x=H.f(r,q)
z=1
break}q=r[q]
r={func:1,ret:[P.Q,P.as]}
z=H.ax(q,r)?12:14
break
case 12:d=v.x===v.e.gax().length-1?v.e6():null
q=v.e.gax()
o=v.x
if(o>>>0!==o||o>=q.length){x=H.f(q,o)
z=1
break}z=15
return P.av(v.cF(H.id(q[o],r)),$async$cE)
case 15:c=a0
if(k.bs(0,new O.o9(u,v))&&v.x===v.e.gax().length-1){u=v.Q
u.toString
r=d.eX(50)
u.a.F(r.E())}x=c
z=1
break
z=13
break
case 14:u=v.e.gax()
r=v.x
if(r>>>0!==r||r>=u.length){x=H.f(u,r)
z=1
break}throw H.c(new P.x("Invalid block: "+H.b(u[r])))
case 13:case 10:case 7:case 1:return P.aG(x,y)}})
return P.aH($async$cE,y)},
eo:function(a){var z,y,x,w,v
z=$.$get$cJ()
if(z.b.test(H.by(a))){y=this.d
if(y==null)throw H.c(new P.x("Cannot use ["+J.h(z)+"] when there is no _preGotoPosition."))
x=y.a
z=y.b
if(typeof z!=="number")return z.aq()
w=z-1}else{x=this.b.dT(a,this.e.gdV())
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
$.hQ=z
z="Points embargo = "+z
y=this.Q
y.toString
v=new A.v(667,null,null,null,null)
v.c=z
y.a.F(v.E())
v=this.e
this.d=new O.nP(v,this.x)
this.e=x
this.x=w
v.e=J.an(v.gdP(),1)},
fu:function(){var z,y,x,w,v,u
this.x=null
$.$get$cv().be(0)
$.$get$bY().sl(0,0)
$.rp=null
x=$.$get$cz()
x.be(0)
w=$.$get$cw()
x.n(0,"points",w)
w.a=0
w.b.be(0)
this.b.jx()
$.io=!0
try{this.kf()}catch(v){z=H.B(v)
y=H.D(v)
x=this.Q
w=H.b(z)+"\n"+H.b(y)
x.toString
u=new A.v(666,null,null,null,null)
u.c="Author Exception in initBlock() (<variables>): "+w
x.a.F(u.E())
throw H.c(z)}this.hm()
$.io=!1},
cF:function(a){var z=0,y=P.az(),x,w=2,v,u=[],t=this,s,r,q,p,o,n,m
var $async$cF=P.aw(function(b,c){if(b===1){v=c
z=w}while(true)switch(z){case 0:q=$.$get$dl()
q.C=""
w=4
z=7
return P.av(a.$0(),$async$cF)
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
throw H.c(new M.cF(q,o,n))
z=6
break
case 3:z=2
break
case 6:if(q.C.length!==0){t.Q.f5(J.h(q)).c3(new O.ob(t))
x=!0
z=1
break}else{x=!1
z=1
break}case 1:return P.aG(x,y)
case 2:return P.aF(v,y)}})
return P.aH($async$cF,y)},
iP:[function(a){var z,y,x,w
z=a.x
if(z==null)return!1
if($.$get$cJ().b.test(H.by(z)))return!1
y=this.b.dT(z,this.e.gdV())
if(y==null){z="Target page '"+H.b(z)+"' was not found."
x=this.Q
x.toString
w=new A.v(667,null,null,null,null)
w.c=z
x.a.F(w.E())
return!0}y.gl6()
return!1},"$1","gfA",2,0,33],
e6:function(){var z,y,x,w,v,u
this.hm()
try{x=this.e.gh()
w=$.$get$cz()
x=new Z.fQ(x,this.b.jS(),null,null,null,null)
x.c=H.aK(Z.d0(w),"$isG",[P.r,P.d],"$asG")
x.f=Date.now()
x.e=C.e.l3(H.aC(x),16)
return x}catch(v){z=H.B(v)
y=H.D(v)
x=this.Q
w=H.b(z)+"\n"+H.b(y)
x.toString
u=new A.v(666,null,null,null,null)
u.c="Error when creating savegame: "+w
x.a.F(u.E())
throw H.c(z)}},
hc:function(a,b){var z,y,x
this.fu()
z=this.b
y=z.a
if(y.j(0,a.a)==null)throw H.c(new Z.dy("Trying to load page '"+H.b(a.a)+"' which doesn't exist in current egamebook."))
this.e=y.j(0,a.a)
this.x=this.y
y=this.Q
y.toString
x=new A.v(667,null,null,null,null)
x.c="Importing state from savegame."
y.a.F(x.E())
z.kc(a.b)
if(b!=null){z=this.Q
z.toString
y=new A.v(667,null,null,null,null)
y.c="Importing player chronology."
z.a.F(y.E())
this.f.av(0,b)}z=this.Q
z.toString
y=new A.v(667,null,null,null,null)
y.c="Copying save variables into vars."
z.a.F(y.E())
y=$.$get$cz()
Z.nL(a,y,P.dI(P.r,P.bF))
this.cx=H.H(y.j(0,"game"),"$isf4")
this.cy=H.aK(y.j(0,"hitpoints"),"$isat",[P.aV],"$asat")
z=[P.t]
this.db=H.aK(y.j(0,"stamina"),"$isat",z,"$asat")
this.dx=H.aK(y.j(0,"gold"),"$isat",z,"$asat")
z=this.Q
Z.hu(Z.bP())
z.toString
y=new A.v(90,null,null,null,null)
y.b=Z.bP()
z.a.F(y.E())
y=this.Q
y.toString
z=new A.v(667,null,null,null,null)
z.c="loadFromSaveGame() done."
y.a.F(z.E())
this.bA()},
kw:function(a){return this.hc(a,null)},
dX:[function(a,b,c,d){var z=0,y=P.az(),x,w=this,v,u,t
var $async$dX=P.aw(function(e,f){if(e===1)return P.aF(f,y)
while(true)switch(z){case 0:v=$.$get$dl()
if(v.C.length!==0){w.Q.f5(J.h(v))
v.C=""}v=w.Q
v.toString
u=new A.v(130,null,null,null,null)
u.b=[a,b,d,c]
v.a.F(u.E())
u=U.cn
t=new P.F(0,$.q,null,[u])
v.x=new P.cq(t,[u])
x=t
z=1
break
case 1:return P.aG(x,y)}})
return P.aH($async$dX,y)},function(a,b){return this.dX(a,b,null,!1)},"lb","$4$rerollEffectDescription$rerollable","$2","gi_",4,5,44,1,0]},
oa:{"^":"a:0;a,b,c",
$1:function(a){var z,y,x,w
a.sf6(!0)
if(a.d===this.c){z="Found choice that was selected: "+a.e
y=this.b.Q
y.toString
x=new A.v(667,null,null,null,null)
x.c=z
y.a.F(x.E())
this.a.a=a}else{z=a.x
if(z!=null){y=this.b
w=$.$get$cJ().b.test(H.by(z))?y.d.a:y.b.dT(z,y.e.gdV())
if(w!=null){y.f.q(0,H.b(y.e.gh())+">>"+H.b(w.gh()))
y.r=!0}}}}},
o0:{"^":"a:0;a",
$1:function(a){return this.a.bA()}},
o1:{"^":"a:0;a",
$1:function(a){return a.gf6()||this.a.iP(a)}},
o2:{"^":"a:35;a,b",
$1:function(a){return a.km(this.b,this.a.a)}},
o3:{"^":"a:0;a",
$1:function(a){var z,y,x
z=H.b(a)
y=this.a.Q
y.toString
x=new A.v(667,null,null,null,null)
x.c=z
y.a.F(x.E())
return}},
o4:{"^":"a:0;",
$1:function(a){return a instanceof D.c3}},
o5:{"^":"a:0;",
$1:function(a){return a.gkn()}},
o6:{"^":"a:2;",
$0:function(){return}},
o7:{"^":"a:0;a",
$1:function(a){return this.a.bA()}},
o8:{"^":"a:0;a,b",
$1:function(a){return a.dA(!0,this.a.a,this.b.gfA())}},
o9:{"^":"a:0;a,b",
$1:function(a){return a.dA(!0,this.a.a,this.b.gfA())}},
ob:{"^":"a:0;a",
$1:function(a){return this.a.bA()}},
n8:{"^":"d;a,b,fU:c<",
jj:function(a,b,c){var z
if(!$.hQ){z=J.an(this.a,b)
this.a=z
this.b.aB(new A.cW(b,z,c))}},
q:function(a,b){return this.jj(a,b,null)},
ai:function(a,b){this.q(0,b)
return this},
E:function(){return P.ag(["points",this.a])},
hC:function(a){this.a=a.j(0,"points")
this.b.be(0)},
ia:function(){this.b=P.bb(null,A.cW)},
$ise2:1},
d1:{"^":"mS;ax:d<,dP:e@,a,b,c",
ghD:function(){return J.a9(this.e,0)}},
nP:{"^":"d;a,b"},
nW:{"^":"d;a",
j:function(a,b){return this.a.j(0,b)},
dT:function(a,b){var z
if(b!=null&&this.a.aa(b+": "+H.b(a)))return this.a.j(0,H.b(b)+": "+H.b(a))
else{z=this.a
if(z.aa(a))return z.j(0,a)
else return}},
n:function(a,b,c){this.a.n(0,b,c)
c.sh(b)},
jS:function(){var z=new H.R(0,null,null,null,null,null,0,[P.r,null])
this.a.Z(0,new O.nY(z))
return z},
kc:function(a){a.Z(0,new O.nZ(this))},
jx:function(){this.a.Z(0,new O.nX())}},
nY:{"^":"a:6;a",
$2:function(a,b){this.a.n(0,a,P.ag(["visitCount",b.gdP()]))}},
nZ:{"^":"a:6;a",
$2:function(a,b){var z=this.a.a
if(z.aa(a))z.j(0,a).sdP(J.ay(b,"visitCount"))}},
nX:{"^":"a:6;",
$2:function(a,b){b.sdP(0)}}}],["","",,M,{"^":"",cF:{"^":"d;a,b,c",
k:function(a){return"AuthorScriptException at page '"+H.b(this.b)+"', block #"+H.b(this.c)+": "+H.b(this.a)},
u:{
eT:function(a){return new M.cF(a,null,null)}}}}],["","",,M,{"^":"",o_:{"^":"d;"}}],["","",,Z,{"^":"",fQ:{"^":"d;a,b,c,d,e,f",
eX:function(a){var z
if(a!==50&&a!==1020)throw H.c("Cannot create Message of type "+a+". Can only be MSG_SAVE_GAME (50) or MSG_LOAD_GAME (1020).")
z=new A.v(a,null,null,null,null)
z.c=this.dN()
return z},
dN:function(){var z,y
z=new H.R(0,null,null,null,null,null,0,[P.r,null])
z.n(0,"uid",this.e)
z.n(0,"currentPageName",this.a)
z.n(0,"pageMapState",this.b)
z.n(0,"vars",this.c)
z.n(0,"timestamp",this.f)
y=this.d
if(y!=null)z.n(0,"previousText",y)
return C.w.h_(z)},
k:function(a){return this.dN()},
u:{
fR:function(a){var z,y
if(a!=null)if(typeof a!=="string"){if(typeof a!=="number"||Math.floor(a)!==a)if(typeof a!=="number")if(typeof a!=="boolean"){z=J.o(a)
z=!!z.$isN||!!z.$isG}else z=!0
else z=!0
else z=!0
y=z}else y=!0
else y=!0
if(y)return!0
return!!J.o(a).$ise2},
d0:function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"&&Math.floor(a)===a||typeof a==="number"||typeof a==="boolean")return a
else{z=J.o(a)
if(!!z.$isN){y=[]
for(x=0;x<z.gl(a);++x)if(Z.fR(z.j(a,x)))y.push(Z.d0(z.j(a,x)))
return y}else if(!!z.$isG){w=new H.R(0,null,null,null,null,null,0,[null,null])
z.Z(a,new Z.nK(a,w))
return w}else if(!!z.$ise2){v=a.E()
v.n(0,"_class",a.gfU())
return Z.d0(v)}else throw H.c("Function _dissolveToPrimitivess called with a non-saveable argument type.")}},
d_:function(a,b,c){var z,y,x,w,v,u
if(a==null||typeof a==="string"||typeof a==="number"&&Math.floor(a)===a||typeof a==="number"||typeof a==="boolean")return a
else{z=J.o(a)
if(!!z.$isN){y=[]
for(x=0;x<z.gl(a);++x)y.push(Z.d_(z.j(a,x),b,null))
return y}else{w=!!z.$isG
if(w&&!a.aa("_class")){v=new H.R(0,null,null,null,null,null,0,[null,null])
z.Z(a,new Z.nJ(b,v))
return v}else if(w&&a.aa("_class"))if(c!=null){c.hC(a)
return c}else{u=z.j(a,"_class")
if(!b.aa(u))throw H.c(new Z.dy("Constructor for "+H.b(u)+" not set. Cannot assemble a new instance."))
else return b.j(0,u).$1(a)}else throw H.c("Function _assembleFromPrimitives called with a non-primitive argument type.")}}},
nL:function(a,b,c){a.c.Z(0,new Z.nM(b,c))}}},nK:{"^":"a:6;a,b",
$2:function(a,b){if(Z.fR(this.a.j(0,a)))this.b.n(0,a,Z.d0(b))}},nJ:{"^":"a:6;a,b",
$2:function(a,b){this.b.n(0,a,Z.d_(b,this.a,null))}},nM:{"^":"a:36;a,b",
$2:function(a,b){var z,y,x
z=this.a
y=z.j(0,a)
x=this.b
if(y==null)z.n(0,a,Z.d_(b,x,null))
else z.n(0,a,Z.d_(b,x,y))}},dy:{"^":"d;a",
k:function(a){return"IncompatibleSavegameException: "+this.a}},lQ:{"^":"d;a",
k:function(a){return"InvalidSavegameException: "+this.a}}}],["","",,D,{"^":"",ne:{"^":"d;"},nd:{"^":"ne;"},lY:{"^":"nd;a,b,c,d,e,f,r,x",
lj:[function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
o=P.r
n=[o,P.d]
H.aK(a,"$isG",n,"$asG")
m=new A.v(a.j(0,"type"),null,null,null,null)
if(a.aa("strContent"))m.c=a.j(0,"strContent")
if(a.aa("listContent"))m.b=a.j(0,"listContent")
if(a.aa("intContent"))m.d=a.j(0,"intContent")
if(a.aa("mapContent"))m.e=H.aK(a.j(0,"mapContent"),"$isG",n,"$asG")
z=m
switch(z.ghA()){case 1070:o=this.e
if(o!=null){o.dw(new D.c3("Book Quit before choice was selected."))
this.e=null}o=this.b
o.a.bt()
o.b.bt()
return
case 1000:o=new A.v(667,null,null,null,null)
o.c="GET_BOOK_UID received."
n=this.a
n.F(o.E())
n.F(new A.v(10,null,this.c.ch,null,null).E())
return
case 1050:l=z.gkg()
this.e.bX(l)
this.e=null
return
case 1060:o=new A.v(667,null,null,null,null)
o.c="New form state from player received."
this.a.F(o.E())
o=z.gky()
if(!o.aa("__submitted__"))o.n(0,"__submitted__",!1)
n=this.r
if(n.b>=4)H.i(n.cz())
n.bT(new G.kf(o))
return
case 1080:o=new A.v(667,null,null,null,null)
o.c="Received slot machine result."
this.a.F(o.E())
k=J.ay(z.geP(),0)
j=J.ay(z.geP(),1)
o=this.x
if(k>>>0!==k||k>=4)return H.f(C.C,k)
o.bX(new U.cn(C.C[k],j))
this.x=null
return
case 1010:o=new A.v(667,null,null,null,null)
o.c="Starting book from scratch."
n=this.a
n.F(o.E())
o=this.e
if(o!=null){o.dw(new D.c3("Book Restart before choice was selected."))
this.e=null}try{this.c.eU()}catch(i){y=H.B(i)
x=H.D(i)
o=new A.v(666,null,null,null,null)
o.c="An error occured when initializing: "+H.b(y)+".\n"+H.b(x)
n.F(o.E())
throw H.c(y)}o=new A.v(90,null,null,null,null)
o.b=Z.bP()
n.F(o.E())
n.F(new A.cW(0,0,null).dO().E())
return
case 1020:h=new A.v(667,null,null,null,null)
h.c="Loading a saved game."
g=this.a
g.F(h.E())
h=this.e
if(h!=null){h.dw(new D.c3("Book Load before choice was selected."))
this.e=null}try{h=z.gi3()
f=new Z.fQ(null,null,null,null,null,null)
e=H.aK(C.w.jE(h),"$isG",n,"$asG")
if(!e.aa("currentPageName")||!e.aa("vars"))H.i(new Z.lQ("Invalid JSON for Savegame. Doesn't contain required fields 'currentPageName' or 'vars'. JSON='"+H.b(h)+"'."))
f.e=e.j(0,"uid")
f.a=e.j(0,"currentPageName")
f.f=e.j(0,"timestamp")
f.b=H.aK(e.j(0,"pageMapState"),"$isG",n,"$asG")
f.c=H.aK(e.j(0,"vars"),"$isG",n,"$asG")
if(e.aa("previousText"))f.d=e.j(0,"previousText")
w=f
v=H.aK(J.iY(z.geP()),"$isbN",[o],"$asbN")
o=this.c
if(v!=null)o.hc(w,v)
else o.kw(w)}catch(i){o=H.B(i)
if(o instanceof Z.dy){u=o
t=H.D(i)
o=new A.v(666,null,null,null,null)
o.c="Load failed due to incompatibility: "+H.b(u)+".\n"+H.b(t)
g.F(o.E())
this.c.eU()}else{s=o
r=H.D(i)
o=new A.v(666,null,null,null,null)
o.c="Load failed for unknown reason: "+H.b(s)+".\n"+H.b(r)
g.F(o.E())
this.c.eU()}}try{o=new A.v(90,null,null,null,null)
o.b=Z.bP()
g.F(o.E())}catch(i){q=H.B(i)
p=H.D(i)
o=new A.v(666,null,null,null,null)
o.c="Sending Stats failed for unknown reason: "+H.b(q)+".\n"+H.b(p)
g.F(o.E())
throw H.c(q)}this.c.toString
g.F(new A.cW(0,$.$get$cw().a,null).dO().E())
return
case 1090:this.f.bX(!0)
this.f=null
return
case 1040:this.c.bA()
return
default:o=new A.v(666,null,null,null,null)
o.c="Wrong message type received by Scripter - "+H.b(z.ghA())+"."
this.a.F(o.E())}},"$1","giV",2,0,22],
f5:function(a){var z=P.a2
this.f=new P.cq(new P.F(0,$.q,null,[z]),[z])
z=new A.v(30,null,null,null,null)
z.c=a
this.a.F(z.E())
return this.f.a}},c3:{"^":"d;a",
k:function(a){return"AsyncOperationOverridenException: "+this.a+"."}}}],["","",,G,{"^":"",kf:{"^":"d;a",
E:function(){return P.ch(this.a,null,null)},
k:function(a){return"<CurrentState submitted="+H.b(this.a.j(0,"__submitted__"))+">"}}}],["","",,A,{"^":"",v:{"^":"d;hA:a<,eP:b<,i3:c<,kg:d<,ky:e<",
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
dN:function(){return C.w.h_(this.E())},
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
return z+(x.w(y,50)||x.w(y,60)||x.w(y,90)||x.w(y,100)||x.w(y,666)||x.w(y,667)?" (async)":"")}}}],["","",,E,{"^":"",mS:{"^":"d;h:a@,l6:b<",
k:function(a){return this.a},
gdV:function(){var z,y
z=this.a
if(z==null)throw H.c("Accessed groupName Page has name = null.")
y=J.iT(z,": ")
if(y>0)return J.iX(this.a,0,y)
else return}}}],["","",,A,{"^":"",cW:{"^":"d;jv:a<,b,c",
k:function(a){var z="Score +"+H.b(this.a)+"."
return z},
dO:function(){var z=new A.v(70,null,null,null,null)
z.b=[this.a,this.b]
z.c=this.c
return z}}}],["","",,L,{"^":"",aa:{"^":"d;f6:a@,b,c,d,b6:e<,J:f<,h1:r<,x,y",
gkn:function(){return this.e.length===0},
dA:function(a,b,c){if(this.a)return!1
if(this.e.length===0)return!1
b!=null
a!=null
if(c!=null&&c.$1(this)===!0)return!1
return!0},
km:function(a,b){return this.dA(a,b,null)},
l1:function(){return P.ag(["string",this.e,"hash",this.d,"submenu",this.y,"helpMessage",this.f])},
c3:function(a){this.r=a
return this},
bD:function(a,b){return C.b.bD(this.e,b.gb6())},
k:function(a){return"Choice: "+this.e+" ["+H.b(this.x)+"] ("+this.d+")"},
i7:function(a,b,c,d,e,f,g){if(a==null)throw H.c(P.E("String given to choice cannot be null."))
this.e=J.bh(a).eY(a)
this.d=C.b.gB(a)
this.r=f
this.b=!1
this.c=!1},
$isV:1,
$asV:function(){return[L.aa]},
u:{
eZ:function(a,b,c,d,e,f,g){var z=new L.aa(!1,null,null,null,null,e,null,d,g)
z.i7(a,!1,!1,d,e,f,g)
return z}}},f_:{"^":"fp;a,b",
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
if(J.ay(a,0)!=null){if(0>=a.length)return H.f(a,0)
v=!!J.o(a[0]).$isbF}else v=!1
if(v)try{if(0>=a.length)return H.f(a,0)
this.a=a[0].$0()}catch(u){z=H.B(u)
v=M.eT(J.h(z))
throw H.c(v)}else this.a=null
for(v=this.b,t={func:1,ret:[P.Q,P.as]},s=1;s<a.length;++s){y=a[s]
x=null
if(J.ay(y,"string")!=null&&!!J.o(J.ay(y,"string")).$isbF)try{x=J.ay(y,"string").$0()}catch(u){w=H.B(u)
v=M.eT(J.h(w))
throw H.c(v)}else x=""
r=x
q=J.ay(y,"goto")
p=H.id(J.ay(y,"script"),t)
o=new L.aa(!1,null,null,null,null,null,null,q,J.ay(y,"submenu"))
if(r==null)H.i(P.E("String given to choice cannot be null."))
o.e=J.bh(r).eY(r)
o.d=C.b.gB(r)
o.r=p
o.b=!1
o.c=!1
C.a.q(v,o)}},
jp:function(a,b,c,d,e,f,g){if(b instanceof L.aa)C.a.q(this.b,b)
else if(typeof b==="string")C.a.q(this.b,L.eZ(b,!1,!1,e,null,f,g))
else throw H.c(P.E("To add a choice to choices, one must provide either a new Choice element or a String."))},
q:function(a,b){return this.jp(a,b,!1,!1,null,null,null)},
l2:function(a,b,c,d){var z,y,x,w
z=this.b
y=H.m(z,0)
x=P.P(new H.K(z,new L.jU(b,a,c),[y]),!0,y)
if(x.length===0)throw H.c("Choices is empty, but still choices.toMessage was called.")
w=new A.v(40,null,null,null,null)
z=[]
w.b=z
z.push(d)
z.push(this.a)
C.a.Z(x,new L.jV(w))
return w},
dO:function(){return this.l2(null,null,null,null)},
k:function(a){var z=this.b
return new H.ap(z,new L.jW(),[H.m(z,0),null]).cl(0,", ")},
$asfp:function(){return[L.aa]},
$asfy:function(){return[L.aa]},
$asN:function(){return[L.aa]},
$asY:function(){return[L.aa]}},jU:{"^":"a:0;a,b,c",
$1:function(a){return a.dA(this.b,this.a,this.c)}},jV:{"^":"a:0;a",
$1:function(a){H.b(a)
J.dm(this.a.b,a.l1())
a.a=!0}},jW:{"^":"a:0;",
$1:function(a){return H.b(a)}}}],["","",,Z,{"^":"",d2:{"^":"d;de:a<,b6:b<",
E:function(){return P.ag(["show",this.a,"string",this.b])}},oy:{"^":"d;a",
E:function(){var z=new H.R(0,null,null,null,null,null,0,[P.r,P.d])
this.a.Z(0,new Z.oz(z))
return z},
Z:function(a,b){this.a.Z(0,b)}},oz:{"^":"a:37;a",
$2:function(a,b){this.a.n(0,a,b.E())}},ht:{"^":"d;h:a@,aP:b<,fV:c<,dG:d<,de:e<,hg:f<,b6:r<",u:{
hu:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=H.p(new Array(a.length),[Z.ht])
for(y=a.length,x=z.length,w=0,v=0;v<a.length;a.length===y||(0,H.ar)(a),++v){u=a[v]
t=J.J(u)
s=t.j(u,"name")
r=t.j(u,"description")
q=t.j(u,"color")
p=t.j(u,"priority")
o=t.j(u,"show")
n=t.j(u,"notifyOnChange")
t=t.j(u,"string")
if(w>=x)return H.f(z,w)
z[w]=new Z.ht(s,r,q,p,o,n,t);++w}C.a.cb(z,new Z.pw())
return z}}},pw:{"^":"a:6;",
$2:function(a,b){return J.bB(b.gdG(),a.gdG())}},at:{"^":"d;h:a<,aP:b<,c,fV:d<,dG:e<,f,r,hg:x<,fS:y@,fU:z<,$ti",
gab:function(){return this.f},
sab:function(a){if(!J.e(this.f,a)){this.f=a
this.y=!0
$.cp=!0}},
gde:function(){return this.r},
gb6:function(){return this.c.$1(this.f)},
E:function(){return P.ag(["name",this.a,"value",this.f,"show",this.r])},
hC:function(a){var z
this.sab(H.iE(a.j(0,"value"),H.m(this,0)))
z=a.j(0,"show")
if(!J.e(this.r,z)){this.r=z
this.y=!0
$.cp=!0}},
$ise2:1,
u:{
bO:function(a,b,c,d,e,f,g,h){var z,y
z=$.$get$d3()
y=z.aa(a)?H.aK(z.j(0,a),"$isat",[h],"$asat"):new Z.at(a,d,b,c,f,null,null,!0,!1,"Stat",[null])
y.f=H.iE(e,h)
y.r=!0
z.n(0,a,y)
return y},
oB:function(){var z,y
z=new Z.oy(new H.R(0,null,null,null,null,null,0,[P.r,Z.d2]))
y=$.$get$d3().gcu()
new H.K(y,new Z.oC(),[H.y(y,"A",0)]).Z(0,new Z.oD(z))
$.cp=!1
return z},
bP:function(){var z=H.p([],[[P.G,P.r,P.d]])
$.$get$d3().gcu().Z(0,new Z.oA(z))
return z}}},oC:{"^":"a:0;",
$1:function(a){return a.gfS()}},oD:{"^":"a:25;a",
$1:function(a){var z,y
z=a.gde()
y=a.gb6()
a.sfS(!1)
this.a.a.n(0,a.a,new Z.d2(z,y))}},oA:{"^":"a:25;a",
$1:function(a){var z=new H.R(0,null,null,null,null,null,0,[P.r,P.d])
z.n(0,"name",a.gh())
z.n(0,"description",a.gaP())
z.n(0,"color",a.gfV())
z.n(0,"priority",a.gdG())
z.n(0,"show",a.gde())
z.n(0,"notifyOnChange",a.ghg())
z.n(0,"string",a.gb6())
this.a.push(z)}}}],["","",,N,{"^":"",dK:{"^":"d;h:a<,b,c,iv:d<,e,f",
gh3:function(){var z,y,x
z=this.b
y=z==null||J.e(z.gh(),"")
x=this.a
return y?x:z.gh3()+"."+x},
geO:function(){if($.im){var z=this.b
if(z!=null)return z.geO()}return $.rx},
kx:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p,o
x=a.b
if(x>=this.geO().b){if(!!J.o(b).$isbF)b=b.$0()
w=b
if(typeof w!=="string"){v=b
b=J.h(b)}else v=null
if(d==null&&x>=$.uN.b)try{x="autogenerated stack trace for "+a.k(0)+" "+H.b(b)
throw H.c(x)}catch(u){z=H.B(u)
y=H.D(u)
d=y
if(c==null)c=z}e=$.q
x=b
w=this.gh3()
t=c
s=d
r=Date.now()
q=$.fq
$.fq=q+1
p=new N.mo(a,x,v,w,new P.cL(r,!1),q,t,s,e)
if($.im)for(o=this;o!=null;){o.fE(p)
o=o.b}else $.$get$fs().fE(p)}},
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
f_:function(a){return this.l7(a,null,null)},
hY:function(a,b,c){return this.cn(C.X,a,b,c)},
dW:function(a){return this.hY(a,null,null)},
fE:function(a){},
u:{
bm:function(a){return $.$get$fr().kK(a,new N.th(a))}}},th:{"^":"a:2;a",
$0:function(){var z,y,x,w
z=this.a
if(C.b.df(z,"."))H.i(P.E("name shouldn't start with a '.'"))
y=C.b.ku(z,".")
if(y===-1)x=z!==""?N.bm(""):null
else{x=N.bm(C.b.aH(z,0,y))
z=C.b.bJ(z,y+1)}w=new H.R(0,null,null,null,null,null,0,[P.r,N.dK])
w=new N.dK(z,x,null,w,new P.hw(w,[null,null]),null)
if(x!=null)x.giv().n(0,z,w)
return w}},b_:{"^":"d;h:a<,ab:b<",
w:function(a,b){if(b==null)return!1
return b instanceof N.b_&&this.b===b.b},
aV:function(a,b){return C.e.aV(this.b,b.gab())},
d8:function(a,b){var z=b.gab()
if(typeof z!=="number")return H.w(z)
return this.b<=z},
bo:function(a,b){var z=b.gab()
if(typeof z!=="number")return H.w(z)
return this.b>z},
bS:function(a,b){return this.b>=b.gab()},
bD:function(a,b){var z=b.gab()
if(typeof z!=="number")return H.w(z)
return this.b-z},
gB:function(a){return this.b},
k:function(a){return this.a},
$isV:1,
$asV:function(){return[N.b_]}},mo:{"^":"d;eO:a<,b,aS:c<,d,U:e<,f,bu:r<,bq:x<,y",
k:function(a){return"["+this.a.a+"] "+this.d+": "+H.b(this.b)}}}],["","",,X,{"^":"",
bA:function(a){return X.dc(J.iQ(a,0,new X.uq()))},
b3:function(a,b){var z=J.an(a,b)
if(typeof z!=="number")return H.w(z)
a=536870911&z
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
dc:function(a){if(typeof a!=="number")return H.w(a)
a=536870911&a+((67108863&a)<<3)
a^=a>>>11
return 536870911&a+((16383&a)<<15)},
uq:{"^":"a:6;",
$2:function(a,b){return X.b3(a,J.j(b))}},
dS:{"^":"cc;a,$ti",
gab:function(){var z=this.a
if(z==null)throw H.c(new P.x("value called on absent Optional."))
return z},
b0:function(a){var z=this.a
return z==null?a:z},
ga_:function(a){var z=this.a
if(z!=null){z=H.p([z],this.$ti)
z=new J.bj(z,1,0,null,[H.m(z,0)])}else z=C.J
return z},
gB:function(a){return J.j(this.a)},
w:function(a,b){var z,y
if(b==null)return!1
if(b instanceof X.dS){z=b.a
y=this.a
y=z==null?y==null:z===y
z=y}else z=!1
return z},
k:function(a){var z=this.a
return z==null?"Optional { absent }":"Optional { value: "+H.b(z)+" }"},
i9:function(a,b){if(this.a==null)throw H.c(P.E("Must not be null."))},
u:{
fC:function(a,b){var z=new X.dS(a,[b])
z.i9(a,b)
return z}}}}],["","",,U,{"^":"",cZ:{"^":"d;a,b",
k:function(a){return this.b}},cn:{"^":"d;a,l8:b<",
geL:function(){return this.a===C.F},
k:function(a){return"SessionResult<"+this.a.b+",wasRerolled="+H.b(this.b)+">"},
w:function(a,b){if(b==null)return!1
return b instanceof U.cn&&b.a===this.a&&J.e(b.b,this.b)},
gB:function(a){return(this.b===!0?2:1)*100+this.a.a}}}],["","",,X,{"^":"",
xq:[function(a,b){var z,y,x,w,v
z=new D.lY(b,null,null,null,null,null,null,null)
y=$.fN
$.fN=y+1
x=new H.cl(y,null,!1)
w=init.globalState.d
w.e0(y,x)
w.cL()
w=new H.nu(x,null)
w.ib(x)
z.b=w
w=w.b
w.toString
new P.d6(w,[H.m(w,0)]).aE(z.giV(),null,null,null)
b.F(new H.ct(z.b.a,init.globalState.d.a))
v=N.nR()
z.c=v
v.Q=z},"$2","i8",4,0,34]},1]]
setupProgram(dart,0)
J.o=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.fg.prototype
return J.ff.prototype}if(typeof a=="string")return J.cg.prototype
if(a==null)return J.fh.prototype
if(typeof a=="boolean")return J.fe.prototype
if(a.constructor==Array)return J.ce.prototype
if(!(a instanceof P.d))return J.bs.prototype
return a}
J.aJ=function(a){if(a==null)return a
if(a.constructor==Array)return J.ce.prototype
if(!(a instanceof P.d))return J.bs.prototype
return a}
J.J=function(a){if(typeof a=="string")return J.cg.prototype
if(a==null)return a
if(a.constructor==Array)return J.ce.prototype
if(!(a instanceof P.d))return J.bs.prototype
return a}
J.al=function(a){if(typeof a=="number")return J.cf.prototype
if(a==null)return a
if(!(a instanceof P.d))return J.bs.prototype
return a}
J.eu=function(a){if(typeof a=="number")return J.cf.prototype
if(typeof a=="string")return J.cg.prototype
if(a==null)return a
if(!(a instanceof P.d))return J.bs.prototype
return a}
J.bh=function(a){if(typeof a=="string")return J.cg.prototype
if(a==null)return a
if(!(a instanceof P.d))return J.bs.prototype
return a}
J.an=function(a,b){if(typeof a=="number"&&typeof b=="number")return a+b
return J.eu(a).ai(a,b)}
J.b5=function(a,b){if(typeof a=="number"&&typeof b=="number")return a/b
return J.al(a).d6(a,b)}
J.e=function(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.o(a).w(a,b)}
J.a9=function(a,b){if(typeof a=="number"&&typeof b=="number")return a>b
return J.al(a).bo(a,b)}
J.c0=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<b
return J.al(a).aV(a,b)}
J.c1=function(a,b){if(typeof a=="number"&&typeof b=="number")return a*b
return J.eu(a).c8(a,b)}
J.iO=function(a){if(typeof a=="number")return-a
return J.al(a).f3(a)}
J.bB=function(a,b){if(typeof a=="number"&&typeof b=="number")return a-b
return J.al(a).aq(a,b)}
J.ay=function(a,b){if(typeof b==="number")if(a.constructor==Array||typeof a=="string")if(b>>>0===b&&b<a.length)return a[b]
return J.J(a).j(a,b)}
J.dm=function(a,b){return J.aJ(a).q(a,b)}
J.iP=function(a,b,c,d,e,f,g,h,i,j,k,l,m,n){return J.aJ(a).ji(a,b,c,d,e,f,g,h,i,j,k,l,m,n)}
J.eL=function(a,b,c){return J.aJ(a).A(a,b,c)}
J.bC=function(a,b){return J.eu(a).bD(a,b)}
J.eM=function(a,b){return J.J(a).a7(a,b)}
J.eN=function(a,b){return J.aJ(a).ar(a,b)}
J.iQ=function(a,b,c){return J.aJ(a).bv(a,b,c)}
J.j=function(a){return J.o(a).gB(a)}
J.eO=function(a){return J.J(a).gW(a)}
J.ai=function(a){return J.aJ(a).ga_(a)}
J.iR=function(a){return J.aJ(a).gv(a)}
J.aL=function(a){return J.J(a).gl(a)}
J.iS=function(a){return J.o(a).gby(a)}
J.iT=function(a,b){return J.J(a).aY(a,b)}
J.eP=function(a,b){return J.aJ(a).aF(a,b)}
J.iU=function(a,b,c){return J.bh(a).hd(a,b,c)}
J.dn=function(a,b,c){return J.bh(a).kO(a,b,c)}
J.cA=function(a,b,c){return J.bh(a).d_(a,b,c)}
J.iV=function(a){return J.al(a).hv(a)}
J.iW=function(a,b){return J.aJ(a).dY(a,b)}
J.eQ=function(a,b){return J.bh(a).df(a,b)}
J.iX=function(a,b,c){return J.bh(a).aH(a,b,c)}
J.iY=function(a){return J.aJ(a).bG(a)}
J.h=function(a){return J.o(a).k(a)}
J.c2=function(a,b){return J.al(a).bg(a,b)}
J.iZ=function(a,b){return J.aJ(a).c6(a,b)}
I.aX=function(a){a.immutable$list=Array
a.fixed$length=Array
return a}
var $=I.p
C.M=J.aZ.prototype
C.a=J.ce.prototype
C.N=J.fe.prototype
C.u=J.ff.prototype
C.e=J.fg.prototype
C.O=J.fh.prototype
C.j=J.cf.prototype
C.b=J.cg.prototype
C.G=new A.ao(0,0,0)
C.H=new A.ao(-1/0,-1/0,-1/0)
C.I=new A.cC(-10,0,100)
C.J=new H.l2([null])
C.K=new P.mR()
C.v=new P.qp()
C.L=new P.qI()
C.i=new P.qX()
C.x=new P.b8(0)
C.y=new U.cR(0,"ItemType.fist")
C.z=new U.cR(1,"ItemType.shield")
C.r=new U.cR(2,"ItemType.spear")
C.A=new U.cR(3,"ItemType.sword")
C.P=function getTagFallback(o) {
  var s = Object.prototype.toString.call(o);
  return s.substring(8, s.length - 1);
}
C.w=new P.m2(null,null)
C.Q=new P.m4(null)
C.R=new P.m5(null,null)
C.S=new O.md(0,"KnownToMode.all")
C.T=new N.b_("FINER",400)
C.U=new N.b_("FINEST",300)
C.V=new N.b_("FINE",500)
C.B=new N.b_("INFO",800)
C.W=new N.b_("OFF",2000)
C.X=new N.b_("SEVERE",1000)
C.Y=new N.b_("WARNING",900)
C.F=new U.cZ(0,"Result.success")
C.a6=new U.cZ(1,"Result.failure")
C.a7=new U.cZ(2,"Result.criticalSuccess")
C.a8=new U.cZ(3,"Result.criticalFailure")
C.C=I.aX([C.F,C.a6,C.a7,C.a8])
C.Z=I.aX(["cave_with_agruth","guardpost_above_church","orcthorn_room","slave_quarters_passage","smelter","underground_church","war_forge"])
C.a_=I.aX([C.y])
C.a0=I.aX([C.z])
C.D=I.aX([C.r])
C.o=I.aX([C.A])
C.d=I.aX([])
C.a1=I.aX(['Briana spits on the floor. "Can\'t wait to see some actual architecture \n  when we get out of here."',"Somewhere in the distance, there are yells that rise in intensity, \n  then suddenly stop entirely.",'Briana turns to you with an intense whisper. \n  "You know, I _have_ a right to hate orcs." \n  \n  "I didn\'t know people need to have a right to hate them, to be honest." \n  \n  She observes you for a moment. "I\'m glad we are in agreement."',"More yells from the distance.","Briana stops and listens for a moment. \"Aren, we're pushing our luck. \n  I'd hate to go all this way only to get \n  my head smashed in by some random orc patrol."])
C.a2=new H.k4(0,{},C.d,[null,null])
C.a3=new X.dS(null,[P.L])
C.k=new R.dV(0,"Pose.standing")
C.h=new R.dV(1,"Pose.offBalance")
C.f=new R.dV(2,"Pose.onGround")
C.l=new K.dW(0,"Predetermination.none")
C.p=new K.dW(1,"Predetermination.successGuaranteed")
C.m=new K.dW(2,"Predetermination.failureGuaranteed")
C.t=new Y.ci("he","him","his","himself")
C.n=new Y.ci("it","it","its","itself")
C.a4=new Y.ci("she","her","her","herself")
C.a5=new Y.ci("they","them","their","themselves")
C.E=new Y.ci("you","you","your","yourself")
C.c=new Q.nz(0,"Resource.stamina")
C.a9=H.bf("fi")
C.aa=H.bf("as")
C.ab=H.bf("r")
C.ac=H.bf("a2")
C.ad=H.bf("aV")
C.q=H.bf("dynamic")
C.ae=H.bf("t")
C.af=H.bf("L")
C.ag=new P.bS(null,2)
$.fN=1
$.fG="$cachedFunction"
$.fH="$cachedInvocation"
$.aM=0
$.bD=null
$.eV=null
$.bv=null
$.bV=null
$.bW=null
$.el=!1
$.q=C.i
$.f7=0
$.ev=null
$.hQ=!1
$.rp=null
$.hS=!1
$.io=!0
$.cp=!1
$.im=!1
$.uN=C.W
$.rx=C.B
$.fq=0
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
I.$lazy(y,x,w)}})(["fb","$get$fb",function(){return H.lW()},"fc","$get$fc",function(){if(typeof WeakMap=="function")var z=new WeakMap()
else{z=$.f7
$.f7=z+1
z="expando$key$"+z}return new P.l8(null,z,[P.t])},"hi","$get$hi",function(){return H.aP(H.d5({
toString:function(){return"$receiver$"}}))},"hj","$get$hj",function(){return H.aP(H.d5({$method$:null,
toString:function(){return"$receiver$"}}))},"hk","$get$hk",function(){return H.aP(H.d5(null))},"hl","$get$hl",function(){return H.aP(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"hp","$get$hp",function(){return H.aP(H.d5(void 0))},"hq","$get$hq",function(){return H.aP(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"hn","$get$hn",function(){return H.aP(H.ho(null))},"hm","$get$hm",function(){return H.aP(function(){try{null.$method$}catch(z){return z.message}}())},"hs","$get$hs",function(){return H.aP(H.ho(void 0))},"hr","$get$hr",function(){return H.aP(function(){try{(void 0).$method$}catch(z){return z.message}}())},"ea","$get$ea",function(){return P.q7()},"bl","$get$bl",function(){var z,y
z=P.as
y=new P.F(0,P.pK(),null,[z])
y.ik(null,z)
return y},"bX","$get$bX",function(){return[]},"dg","$get$dg",function(){return new K.ca("fist",P.aB(C.a_,null))},"bJ","$get$bJ",function(){return N.bm("PlannerRecommendation")},"ia","$get$ia",function(){return new K.rJ()},"es","$get$es",function(){var z=$.$get$ia()
return K.a_("__END_OF_ROAM__",z,z,null,null,[],"ground")},"a7","$get$a7",function(){return P.cY(null)},"bL","$get$bL",function(){return P.cY(null)},"iq","$get$iq",function(){return N.bm("Storyline")},"h6","$get$h6",function(){return P.bp("(\\w)([\\.\\?\\!])([\"'])\\.(?=$|\\s)",!0,!1)},"bZ","$get$bZ",function(){return L.e9(new L.tf())},"aY","$get$aY",function(){return L.e9(new L.tl())},"ey","$get$ey",function(){return L.e9(new L.te())},"dT","$get$dT",function(){return new F.mW("Sometimes, patience pays off. Especially when the other option is potentially dangerous.",!1,!0,!1,null,null)},"eq","$get$eq",function(){return Y.c7(!1,"balance",!0,C.n,$.$get$aY())},"iv","$get$iv",function(){return Y.c7(!1,"pounding",!1,C.n,$.$get$aY())},"fO","$get$fO",function(){return new B.nx("Most moves are easier and more effective when you are firmly in balance.",!1,!0,!1,null,null)},"fS","$get$fS",function(){return new O.nN(null,!1,!0,!1,null,null)},"h5","$get$h5",function(){return new Q.ou(null,!1,!0,!0,C.c,null)},"hv","$get$hv",function(){return new M.px("",!0,C.c,!1,!0,null)},"hR","$get$hR",function(){return P.cY(null)},"eU","$get$eU",function(){return new Z.jx(!1,!0,!1,null,null)},"iH","$get$iH",function(){return Y.c7(!1,"swing",!0,C.n,$.$get$aY())},"iG","$get$iG",function(){return Y.c7(!1,"swing",!0,C.n,$.$get$aY())},"iF","$get$iF",function(){return Y.c7(!1,"swing",!0,C.n,$.$get$aY())},"fE","$get$fE",function(){return X.fC(0,P.L)},"fF","$get$fF",function(){return X.fC(1,P.L)},"h0","$get$h0",function(){return new D.or(!1,!1,!0,null,null)},"is","$get$is",function(){return G.p8(!1,!0,"Orcthorn",!0,2,2)},"en","$get$en",function(){return P.cY(null)},"i4","$get$i4",function(){return K.a_("cave_with_agruth_pre",new V.ta(),new V.tb(),null,null,H.p([new Q.u("cave_with_agruth","","You look around.",null)],[Q.u]),"ground")},"i3","$get$i3",function(){return K.a_("cave_with_agruth",new V.t8(),new V.t9(),null,null,H.p([new Q.u("underground_church","Go to the Unholy Church","You make it to the Church undetected, slipping through one of the lower windows leading into the main hall.",null),new Q.u("war_forge","Go to the war forges","You sneak your way into the War Forges and hide in the shadows of an alcove.",null),new Q.u("slave_quarters_passage","Go to the slave quarters","You and Briana hug the wall and start towards the slave quarters.",null)],[Q.u]),"ground")},"fT","$get$fT",function(){return new V.oc("Search Agruth","search_agruth",!0,null)},"ib","$get$ib",function(){return K.a_("exit_from_bloodrock",new V.t6(),new V.t7(),null,null,H.p([new Q.u("__END_OF_ROAM__","Go forth (UNIMPLEMENTED)","You head down.",null)],[Q.u]),"ground")},"ic","$get$ic",function(){return K.a_("forge_church_crevice",new V.t3(),new V.t4(),null,null,H.p([new Q.u("tunnel","Continue along the crevice","You continue until the crevice open into a tunnel. You can smell fresh air.",null)],[Q.u]),"ground")},"il","$get$il",function(){return K.a_("guardpost_above_church",new V.t1(),new V.t2(),null,null,H.p([new Q.u("underground_church","Descend towards the Underground Church","You take the passage leading down.",null),new Q.u("tunnel","Go to the upper gate","You take the passage that leads out of here.",null),new Q.u("smelter","Go to the smelter","Something something.",null)],[Q.u]),"ground")},"fa","$get$fa",function(){return new V.lC("Cautiously take the shield","guardpost_above_church_take_shield",!0,null)},"ip","$get$ip",function(){return K.a_("just_after_agruth_fight",new V.t_(),new V.t0(),null,null,H.p([],[Q.u]),"ground")},"fv","$get$fv",function(){return new V.mx('"Luck Bringer"',"name_agruth_sword_opportunity",!0,null)},"fw","$get$fw",function(){return new V.my('"Savior"',"name_agruth_sword_redemption",!0,null)},"fu","$get$fu",function(){return new V.mw("No name","name_agruth_sword_nothing",!0,null)},"it","$get$it",function(){return K.a_("orcthorn_door",new V.rY(),new V.rZ(),null,null,H.p([new Q.u("cave_with_agruth","Go to the cave with Agruth's corpse","You back out from the door, and go back where you left Agruth's body.",null),new Q.u("slave_quarters","Go further towards the Gate of Screams","TODO",null),new Q.u("orcthorn_room","Open the door","You open the door.",null)],[Q.u]),"ground")},"iu","$get$iu",function(){return K.a_("orcthorn_room",new V.rW(),new V.rX(),O.wv(),null,H.p([new Q.u("orcthorn_door","Exit the room","You go through the door. Once back in the corridor of the slave quarters, you close it behind you.",null)],[Q.u]),"ground")},"hb","$get$hb",function(){return new V.pg("Search for Orcthorn","take_orcthorn",!0,null)},"iw","$get$iw",function(){return K.a_("slave_quarters",new V.rT(),new V.rU(),null,null,H.p([],[Q.u]),"ground")},"fZ","$get$fZ",function(){return new V.op("Continue","slave_quarters_continue",!0,null)},"ix","$get$ix",function(){return K.a_("slave_quarters_passage",new V.rR(),new V.rS(),O.ww(),null,H.p([new Q.u("cave_with_agruth","Go back to the cave with Agruth's corpse","You back out from the door, and go back where you left Agruth's body.",null),new Q.u("slave_quarters","Go further towards the Gate of Screams","TODO",null),new Q.u("orcthorn_room","Open the door","You open the door.",null)],[Q.u]),"ground")},"h_","$get$h_",function(){return new V.oq("Examine the door","slave_quarters_passage_examine_door",!0,null)},"iy","$get$iy",function(){return K.a_("smelter",new V.rP(),new V.rQ(),null,null,H.p([new Q.u("tunnel","Enter the crevice","You enter the crevice. The air flows around you, pushing into your back. After a while, the crevice joins with a larger tunnel. The draft isn't as strong here, but it's still noticable, and you follow it.",null),new Q.u("war_forge","Go to the war forges","A short passage leads to the top of the war forges room.",null),new Q.u("guardpost_above_church","Go through the smooth passage","You enter the passage and it leads you slightly upwards to a junction.",null)],[Q.u]),"ground")},"h1","$get$h1",function(){return new V.ot("Throw spear at","smelter_throw_spear",!0,null)},"iz","$get$iz",function(){return K.a_("start_adventure",new V.rN(),new V.rO(),O.wt(),null,H.p([new Q.u("just_after_agruth_fight","","You look around. Fortunately, nobody is in sight.",null)],[Q.u]),"ground")},"hd","$get$hd",function(){return new V.pi("Talk to Briana","talk_to_briana_1",!0,null)},"he","$get$he",function(){return new V.pj("Talk to Briana","talk_to_briana_2",!0,null)},"hf","$get$hf",function(){return new V.pk("Talk to Briana","talk_to_briana_3",!0,null)},"iI","$get$iI",function(){return K.a_("the_shafts",new V.rL(),new V.rM(),null,null,H.p([new Q.u("tunnel","Run","You run over the passage. Orcs start to scream and yell commands. As you near the entrance, the air gets better.",null)],[Q.u]),"ground")},"iK","$get$iK",function(){return K.a_("tunnel",new V.tC(),new V.tD(),O.wu(),null,H.p([new Q.u("exit_from_bloodrock","Start running again","You start running again.",null)],[Q.u]),"ground")},"iL","$get$iL",function(){return K.a_("underground_church",new V.tr(),new V.tB(),null,null,H.p([new Q.u("guardpost_above_church","Enter the passage","You enter the passage and go a long, slightly rising way.",null),new Q.u("cave_with_agruth","Go back to the cave with Agruth's corpse","You sneak out of the church, back towards where you left Agruth's body.",null),new Q.u("underground_church_altar","Go towards the altar","You sneak your way among the columns, trying to stay in the shadows.",null)],[Q.u]),"ground")},"f6","$get$f6",function(){return new V.l7("Look around","examine_underground_church",!0,null)},"iM","$get$iM",function(){return K.a_("underground_church_altar",new V.t5(),new V.tg(),null,null,H.p([new Q.u("underground_church","Sneak back","You keep low and, keeping an eye on the altar, head back to the Church's entrance.",null)],[Q.u]),"ground")},"hx","$get$hx",function(){return new V.pz("Wait","wait_for_ritual",!0,null)},"hc","$get$hc",function(){return new V.ph("Take spear","take_spear_in_underground_church",!0,null)},"iN","$get$iN",function(){return K.a_("war_forge",new V.rK(),new V.rV(),null,null,H.p([new Q.u("smelter","Go to smelter","You keep low, ascending the stairs. At the top the hot air hits you. You make your way through a short passage and arrive at the smelter.",null),new Q.u("cave_with_agruth","Go back to the cave with Agruth's corpse","You sneak back towards where you left Agruth's body.",null)],[Q.u]),"ground")},"hy","$get$hy",function(){return new V.pA("Watch the workers","war_forge_look_around",!0,null)},"hZ","$get$hZ",function(){return H.p([$.$get$i4(),$.$get$i3(),$.$get$ib(),$.$get$ic(),$.$get$il(),$.$get$ip(),$.$get$it(),$.$get$iu(),$.$get$iw(),$.$get$ix(),$.$get$iy(),$.$get$iz(),$.$get$iI(),$.$get$iK(),$.$get$iL(),$.$get$iM(),$.$get$iN()],[K.cm])},"hY","$get$hY",function(){return H.p([$.$get$fT(),$.$get$fa(),$.$get$fv(),$.$get$fw(),$.$get$fu(),$.$get$hb(),$.$get$fZ(),$.$get$h_(),$.$get$h1(),$.$get$hd(),$.$get$he(),$.$get$hf(),$.$get$f6(),$.$get$hx(),$.$get$hc(),$.$get$hy()],[A.Z])},"dl","$get$dl",function(){return P.p6("")},"cw","$get$cw",function(){var z=new O.n8(0,null,"PointsCounter")
z.ia()
return z},"bY","$get$bY",function(){return new L.f_(null,H.p([],[L.aa]))},"cz","$get$cz",function(){return H.fl(P.r,P.d)},"cv","$get$cv",function(){return P.bb(null,{func:1,ret:[P.Q,P.as]})},"cJ","$get$cJ",function(){return P.bp("^\\s*<<<\\s*$",!0,!1)},"d3","$get$d3",function(){return H.fl(P.r,Z.at)},"fs","$get$fs",function(){return N.bm("")},"fr","$get$fr",function(){return P.dI(P.r,N.dK)}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=[null,!1]
init.types=[{func:1,args:[,]},{func:1,ret:P.r,args:[R.I,A.ad,Y.a1]},{func:1},{func:1,args:[,,,]},{func:1,ret:Q.z,args:[R.I]},{func:1,args:[R.I,A.ad,Y.a1]},{func:1,args:[,,]},{func:1,v:true},{func:1,v:true,args:[R.I,A.ad,Y.a1,R.I,S.ac]},{func:1,args:[P.t]},{func:1,ret:U.cO,args:[A.ad,F.M,[P.A,R.I]]},{func:1,v:true,args:[R.I,A.ad,Y.a1,R.I,,]},{func:1,ret:P.r,args:[P.t]},{func:1,v:true,args:[{func:1,v:true}]},{func:1,args:[U.c9]},{func:1,v:true,args:[P.r]},{func:1,v:true,args:[P.d],opt:[P.b1]},{func:1,ret:Q.cb,args:[U.ab]},{func:1,args:[P.aV]},{func:1,ret:P.Q},{func:1,ret:P.L,args:[A.ao]},{func:1,args:[,P.b1]},{func:1,v:true,args:[P.d]},{func:1,ret:Y.aN,args:[P.t]},{func:1,ret:P.r,args:[P.r]},{func:1,args:[Z.at]},{func:1,args:[,,,,]},{func:1,args:[R.I]},{func:1,args:[P.L,R.I]},{func:1,ret:P.a2,args:[P.t]},{func:1,args:[P.bn]},{func:1,args:[Y.ah]},{func:1,v:true,args:[P.t]},{func:1,ret:P.a2,args:[L.aa]},{func:1,v:true,args:[[P.N,P.r],P.fU]},{func:1,args:[L.aa]},{func:1,args:[P.r,,]},{func:1,args:[P.r,Z.d2]},{func:1,args:[[P.N,Y.ah],Y.ah]},{func:1,ret:P.L,args:[A.cC]},{func:1,ret:P.t,args:[P.V,P.V]},{func:1,ret:P.r,args:[Q.af]},{func:1,ret:P.L,args:[P.L,P.L]},{func:1,ret:P.t,args:[P.t,P.t]},{func:1,ret:[P.Q,U.cn],args:[P.aV,P.r],named:{rerollEffectDescription:P.r,rerollable:P.a2}},{func:1,args:[{func:1,v:true}]},{func:1,v:true,args:[,P.b1]},{func:1,v:true,args:[P.d,P.b1]},{func:1,ret:Q.c8,args:[Q.u]},{func:1,args:[,],opt:[,]},{func:1,args:[P.t,,]},{func:1,ret:L.aa,args:[P.r],named:{deferToChoiceList:P.a2,deferToEndOfPage:P.a2,goto:P.r,helpMessage:P.r,script:{func:1,ret:[P.Q,P.as]},submenu:P.r}},{func:1,args:[P.a2]}]
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
if(x==y)H.wp(d||a)
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
if(typeof dartMainRunner==="function")dartMainRunner(function(b){H.iA(X.i8(),b)},[])
else (function(b){H.iA(X.i8(),b)})([])})})()