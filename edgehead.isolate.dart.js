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
var dart=[["","",,H,{"^":"",xn:{"^":"d;a"}}],["","",,J,{"^":"",
o:function(a){return void 0},
aY:{"^":"d;",
B:function(a,b){return a===b},
gD:function(a){return H.aE(a)},
k:function(a){return H.d_(a)},
gbz:function(a){return new H.av(H.iq(a),null)}},
fi:{"^":"aY;",
k:function(a){return String(a)},
gD:function(a){return a?519018:218159},
gbz:function(a){return C.ac},
$isX:1},
fl:{"^":"aY;",
B:function(a,b){return null==b},
k:function(a){return"null"},
gD:function(a){return 0},
gbz:function(a){return C.aa},
$isat:1},
fo:{"^":"aY;",
gD:function(a){return 0},
gbz:function(a){return C.a9},
k:function(a){return String(a)},
$isfm:1},
xu:{"^":"fo;"},
bs:{"^":"fo;"},
ch:{"^":"aY;$ti",
fY:function(a,b){if(!!a.immutable$list)throw H.c(new P.T(b))},
cU:function(a,b){if(!!a.fixed$length)throw H.c(new P.T(b))},
t:function(a,b){this.cU(a,"add")
a.push(b)},
ht:function(a){this.cU(a,"removeLast")
if(a.length===0)throw H.c(H.aK(a,-1))
return a.pop()},
a3:function(a,b){var z
this.cU(a,"remove")
for(z=0;z<a.length;++z)if(J.e(a[z],b)){a.splice(z,1)
return!0}return!1},
j4:function(a,b,c){var z,y,x,w,v
z=[]
y=a.length
for(x=0;x<y;++x){w=a[x]
if(b.$1(w)!==!0===c)z.push(w)
if(a.length!==y)throw H.c(new P.D(a))}v=z.length
if(v===y)return
this.sl(a,v)
for(x=0;x<z.length;++x)a[x]=z[x]},
ca:function(a,b){return new H.K(a,b,[H.m(a,0)])},
ax:function(a,b){var z
this.cU(a,"addAll")
for(z=J.aj(b);z.u();)a.push(z.d)},
Z:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){b.$1(a[y])
if(a.length!==z)throw H.c(new P.D(a))}},
aK:function(a,b){return new H.aq(a,b,[H.m(a,0),null])},
e3:function(a,b){return H.hf(a,b,null,H.m(a,0))},
bw:function(a,b,c){var z,y,x
z=a.length
for(y=b,x=0;x<z;++x){y=c.$2(y,a[x])
if(a.length!==z)throw H.c(new P.D(a))}return y},
aU:function(a,b,c){var z,y,x
z=a.length
for(y=0;y<z;++y){x=a[y]
if(b.$1(x)===!0)return x
if(a.length!==z)throw H.c(new P.D(a))}throw H.c(H.ah())},
cn:function(a,b){return this.aU(a,b,null)},
au:function(a,b){if(b>>>0!==b||b>=a.length)return H.f(a,b)
return a[b]},
gcY:function(a){if(a.length>0)return a[0]
throw H.c(H.ah())},
gA:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.c(H.ah())},
gce:function(a){var z=a.length
if(z===1){if(0>=z)return H.f(a,0)
return a[0]}if(z===0)throw H.c(H.ah())
throw H.c(H.dE())},
b8:function(a,b,c,d,e){var z,y,x
this.fY(a,"setRange")
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
cf:function(a,b){var z
this.fY(a,"sort")
z=b==null?P.tX():b
H.cr(a,0,a.length-1,z)},
fd:function(a){return this.cf(a,null)},
bR:function(a,b,c){var z
if(c>=a.length)return-1
for(z=c;z<a.length;++z)if(J.e(a[z],b))return z
return-1},
b3:function(a,b){return this.bR(a,b,0)},
a4:function(a,b){var z
for(z=0;z<a.length;++z)if(J.e(a[z],b))return!0
return!1},
gY:function(a){return a.length===0},
gav:function(a){return a.length!==0},
k:function(a){return P.cg(a,"[","]")},
bH:function(a){return P.b9(a,H.m(a,0))},
ga_:function(a){return new J.bj(a,a.length,0,null,[H.m(a,0)])},
gD:function(a){return H.aE(a)},
gl:function(a){return a.length},
sl:function(a,b){this.cU(a,"set length")
if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(P.cI(b,"newLength",null))
if(b<0)throw H.c(P.a8(b,0,null,"newLength",null))
a.length=b},
j:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(H.aK(a,b))
if(b>=a.length||b<0)throw H.c(H.aK(a,b))
return a[b]},
p:function(a,b,c){if(!!a.immutable$list)H.i(new P.T("indexed set"))
if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(H.aK(a,b))
if(b>=a.length||b<0)throw H.c(H.aK(a,b))
a[b]=c},
$iscW:1,
$ascW:I.bg,
$isN:1,
$isa0:1},
xm:{"^":"ch;$ti"},
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
ci:{"^":"aY;",
bE:function(a,b){var z
if(typeof b!=="number")throw H.c(H.U(b))
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){z=this.gdJ(b)
if(this.gdJ(a)===z)return 0
if(this.gdJ(a))return-1
return 1}return 0}else if(isNaN(a)){if(isNaN(b))return 0
return 1}else return-1},
gdJ:function(a){return a===0?1/a<0:a<0},
hy:function(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw H.c(new P.T(""+a+".round()"))},
l4:function(a){return a},
bk:function(a,b){var z
if(b>20)throw H.c(P.a8(b,0,20,"fractionDigits",null))
z=a.toFixed(b)
if(a===0&&this.gdJ(a))return"-"+z
return z},
l7:function(a,b){var z,y,x,w
if(b<2||b>36)throw H.c(P.a8(b,2,36,"radix",null))
z=a.toString(b)
if(C.b.cV(z,z.length-1)!==41)return z
y=/^([\da-z]+)(?:\.([\da-z]+))?\(e\+(\d+)\)$/.exec(z)
if(y==null)H.i(new P.T("Unexpected toString result: "+z))
x=J.L(y)
z=x.j(y,1)
w=+x.j(y,3)
if(x.j(y,2)!=null){z+=x.j(y,2)
w-=x.j(y,2).length}return z+C.b.cc("0",w)},
k:function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gD:function(a){return a&0x1FFFFFFF},
f9:function(a){return-a},
ak:function(a,b){if(typeof b!=="number")throw H.c(H.U(b))
return a+b},
at:function(a,b){if(typeof b!=="number")throw H.c(H.U(b))
return a-b},
de:function(a,b){if(typeof b!=="number")throw H.c(H.U(b))
return a/b},
cc:function(a,b){if(typeof b!=="number")throw H.c(H.U(b))
return a*b},
bN:function(a,b){return(a|0)===a?a/b|0:this.jd(a,b)},
jd:function(a,b){var z=a/b
if(z>=-2147483648&&z<=2147483647)return z|0
if(z>0){if(z!==1/0)return Math.floor(z)}else if(z>-1/0)return Math.ceil(z)
throw H.c(new P.T("Result of truncating division is "+H.b(z)+": "+H.b(a)+" ~/ "+b))},
dB:function(a,b){var z
if(a>0)z=b>31?0:a>>>b
else{z=b>31?31:b
z=a>>z>>>0}return z},
b0:function(a,b){if(typeof b!=="number")throw H.c(H.U(b))
return a<b},
b7:function(a,b){if(typeof b!=="number")throw H.c(H.U(b))
return a>b},
dg:function(a,b){if(typeof b!=="number")throw H.c(H.U(b))
return a<=b},
bC:function(a,b){if(typeof b!=="number")throw H.c(H.U(b))
return a>=b},
gbz:function(a){return C.af},
$isM:1},
fk:{"^":"ci;",
gbz:function(a){return C.ae},
$isaW:1,
$isM:1,
$isu:1},
fj:{"^":"ci;",
gbz:function(a){return C.ad},
$isaW:1,
$isM:1},
cj:{"^":"aY;",
cV:function(a,b){if(b<0)throw H.c(H.aK(a,b))
if(b>=a.length)H.i(H.aK(a,b))
return a.charCodeAt(b)},
cG:function(a,b){if(b>=a.length)throw H.c(H.aK(a,b))
return a.charCodeAt(b)},
dD:function(a,b,c){if(c>b.length)throw H.c(P.a8(c,0,b.length,null,null))
return new H.ri(b,a,c)},
eF:function(a,b){return this.dD(a,b,0)},
hh:function(a,b,c){var z,y
if(c<0||c>b.length)throw H.c(P.a8(c,0,b.length,null,null))
z=a.length
if(c+z>b.length)return
for(y=0;y<z;++y)if(this.cV(b,c+y)!==this.cG(a,y))return
return new H.he(c,b,a)},
ak:function(a,b){if(typeof b!=="string")throw H.c(P.cI(b,null,null))
return a+b},
eL:function(a,b){var z,y
z=b.length
y=a.length
if(z>y)return!1
return b===this.bL(a,y-z)},
kS:function(a,b,c){H.by(c)
return H.n(a,b,c)},
kT:function(a,b,c,d){H.by(c)
P.nB(d,0,a.length,"startIndex",null)
return H.iI(a,b,c,d)},
d6:function(a,b,c){return this.kT(a,b,c,0)},
i5:function(a,b,c){var z
if(c>a.length)throw H.c(P.a8(c,0,a.length,null,null))
if(typeof b==="string"){z=c+b.length
if(z>a.length)return!1
return b===a.substring(c,z)}return J.j_(b,a,c)!=null},
dm:function(a,b){return this.i5(a,b,0)},
aM:function(a,b,c){if(c==null)c=a.length
if(typeof c!=="number"||Math.floor(c)!==c)H.i(H.U(c))
if(b<0)throw H.c(P.cm(b,null,null))
if(typeof c!=="number")return H.x(c)
if(b>c)throw H.c(P.cm(b,null,null))
if(c>a.length)throw H.c(P.cm(c,null,null))
return a.substring(b,c)},
bL:function(a,b){return this.aM(a,b,null)},
f4:function(a){var z,y,x,w,v
z=a.trim()
y=z.length
if(y===0)return z
if(this.cG(z,0)===133){x=J.dF(z,1)
if(x===y)return""}else x=0
w=y-1
v=this.cV(z,w)===133?J.m8(z,w):y
if(x===0&&v===y)return z
return z.substring(x,v)},
l8:function(a){var z,y
if(typeof a.trimLeft!="undefined"){z=a.trimLeft()
if(z.length===0)return z
y=this.cG(z,0)===133?J.dF(z,1):0}else{y=J.dF(a,0)
z=a}if(y===0)return z
if(y===z.length)return""
return z.substring(y)},
cc:function(a,b){var z,y
if(0>=b)return""
if(b===1||a.length===0)return a
if(b!==b>>>0)throw H.c(C.L)
for(z=a,y="";!0;){if((b&1)===1)y=z+y
b=b>>>1
if(b===0)break
z+=z}return y},
bR:function(a,b,c){var z
if(c>a.length)throw H.c(P.a8(c,0,a.length,null,null))
z=a.indexOf(b,c)
return z},
b3:function(a,b){return this.bR(a,b,0)},
ky:function(a,b,c){var z
c=a.length
z=b.length
if(c+z>c)c-=z
return a.lastIndexOf(b,c)},
kx:function(a,b){return this.ky(a,b,null)},
jC:function(a,b,c){if(b==null)H.i(H.U(b))
if(c>a.length)throw H.c(P.a8(c,0,a.length,null,null))
return H.wP(a,b,c)},
a4:function(a,b){return this.jC(a,b,0)},
gY:function(a){return a.length===0},
gav:function(a){return a.length!==0},
bE:function(a,b){var z
if(typeof b!=="string")throw H.c(H.U(b))
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
$isp:1,
$isdZ:1,
w:{
fn:function(a){if(a<256)switch(a){case 9:case 10:case 11:case 12:case 13:case 32:case 133:case 160:return!0
default:return!1}switch(a){case 5760:case 8192:case 8193:case 8194:case 8195:case 8196:case 8197:case 8198:case 8199:case 8200:case 8201:case 8202:case 8232:case 8233:case 8239:case 8287:case 12288:case 65279:return!0
default:return!1}},
dF:function(a,b){var z,y
for(z=a.length;b<z;){y=C.b.cG(a,b)
if(y!==32&&y!==13&&!J.fn(y))break;++b}return b},
m8:function(a,b){var z,y
for(;b>0;b=z){z=b-1
y=C.b.cV(a,z)
if(y!==32&&y!==13&&!J.fn(y))break}return b}}}}],["","",,H,{"^":"",
hS:function(a){return a},
ah:function(){return new P.w("No element")},
dE:function(){return new P.w("Too many elements")},
fh:function(){return new P.w("Too few elements")},
cr:function(a,b,c,d){if(c-b<=32)H.h8(a,b,c,d)
else H.h7(a,b,c,d)},
h8:function(a,b,c,d){var z,y,x,w,v
for(z=b+1,y=J.L(a);z<=c;++z){x=y.j(a,z)
w=z
while(!0){if(!(w>b&&J.ac(d.$2(y.j(a,w-1),x),0)))break
v=w-1
y.p(a,w,y.j(a,v))
w=v}y.p(a,w,x)}},
h7:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
z=C.e.bN(c-b+1,6)
y=b+z
x=c-z
w=C.e.bN(b+c,2)
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
if(h.B(i,0))continue
if(h.b0(i,0)){if(k!==m){t.p(a,k,t.j(a,m))
t.p(a,m,j)}++m}else for(;!0;){i=d.$2(t.j(a,l),r)
h=J.am(i)
if(h.b7(i,0)){--l
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
if(J.c1(d.$2(j,r),0)){if(k!==m){t.p(a,k,t.j(a,m))
t.p(a,m,j)}++m}else if(J.ac(d.$2(j,p),0))for(;!0;)if(J.ac(d.$2(t.j(a,l),p),0)){--l
if(l<k)break
continue}else{g=l-1
if(J.c1(d.$2(t.j(a,l),r),0)){t.p(a,k,t.j(a,m))
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
H.cr(a,b,m-2,d)
H.cr(a,l+2,c,d)
if(e)return
if(m<y&&l>x){for(;J.e(d.$2(t.j(a,m),r),0);)++m
for(;J.e(d.$2(t.j(a,l),p),0);)--l
for(k=m;k<=l;++k){j=t.j(a,k)
if(J.e(d.$2(j,r),0)){if(k!==m){t.p(a,k,t.j(a,m))
t.p(a,m,j)}++m}else if(J.e(d.$2(j,p),0))for(;!0;)if(J.e(d.$2(t.j(a,l),p),0)){--l
if(l<k)break
continue}else{g=l-1
if(J.c1(d.$2(t.j(a,l),r),0)){t.p(a,k,t.j(a,m))
f=m+1
t.p(a,m,t.j(a,l))
t.p(a,l,j)
m=f}else{t.p(a,k,t.j(a,l))
t.p(a,l,j)}l=g
break}}H.cr(a,m,l,d)}else H.cr(a,m,l,d)},
a0:{"^":"B;$ti"},
b0:{"^":"a0;$ti",
ga_:function(a){return new H.dO(this,this.gl(this),0,null,[H.y(this,"b0",0)])},
Z:function(a,b){var z,y
z=this.gl(this)
for(y=0;y<z;++y){b.$1(this.au(0,y))
if(z!==this.gl(this))throw H.c(new P.D(this))}},
gY:function(a){return this.gl(this)===0},
gA:function(a){if(this.gl(this)===0)throw H.c(H.ah())
return this.au(0,this.gl(this)-1)},
a4:function(a,b){var z,y
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
cp:function(a,b){var z,y,x,w
z=this.gl(this)
if(b.length!==0){if(z===0)return""
y=H.b(this.au(0,0))
if(z!==this.gl(this))throw H.c(new P.D(this))
for(x=y,w=1;w<z;++w){x=x+b+H.b(this.au(0,w))
if(z!==this.gl(this))throw H.c(new P.D(this))}return x.charCodeAt(0)==0?x:x}else{for(w=0,x="";w<z;++w){x+=H.b(this.au(0,w))
if(z!==this.gl(this))throw H.c(new P.D(this))}return x.charCodeAt(0)==0?x:x}},
ca:function(a,b){return this.dn(0,b)},
aK:function(a,b){return new H.aq(this,b,[H.y(this,"b0",0),null])},
bw:function(a,b,c){var z,y,x
z=this.gl(this)
for(y=b,x=0;x<z;++x){y=c.$2(y,this.au(0,x))
if(z!==this.gl(this))throw H.c(new P.D(this))}return y},
bG:function(a,b){var z,y,x,w
z=[H.y(this,"b0",0)]
if(b){y=H.q([],z)
C.a.sl(y,this.gl(this))}else{x=new Array(this.gl(this))
x.fixed$length=Array
y=H.q(x,z)}for(w=0;w<this.gl(this);++w){z=this.au(0,w)
if(w>=y.length)return H.f(y,w)
y[w]=z}return y},
cB:function(a){return this.bG(a,!0)},
bH:function(a){var z,y
z=P.a6(null,null,null,H.y(this,"b0",0))
for(y=0;y<this.gl(this);++y)z.t(0,this.au(0,y))
return z}},
pi:{"^":"b0;a,b,c,$ti",
giG:function(){var z=J.aN(this.a)
return z},
gjb:function(){var z,y
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
z=this.gjb()+b
if(!(b<0)){y=this.giG()
if(typeof y!=="number")return H.x(y)
y=z>=y}else y=!0
if(y)throw H.c(P.cU(b,this,"index",null,null))
return J.eQ(this.a,z)},
bG:function(a,b){var z,y,x,w,v,u,t,s,r
z=this.b
y=this.a
x=J.L(y)
w=x.gl(y)
v=w-z
if(v<0)v=0
u=this.$ti
if(b){t=H.q([],u)
C.a.sl(t,v)}else{s=new Array(v)
s.fixed$length=Array
t=H.q(s,u)}for(r=0;r<v;++r){u=x.au(y,z+r)
if(r>=t.length)return H.f(t,r)
t[r]=u
if(x.gl(y)<w)throw H.c(new P.D(this))}return t},
ii:function(a,b,c,d){var z=this.b
if(z<0)H.i(P.a8(z,0,null,"start",null))},
w:{
hf:function(a,b,c,d){var z=new H.pi(a,b,c,[d])
z.ii(a,b,c,d)
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
ga_:function(a){return new H.mD(null,J.aj(this.a),this.b,this.$ti)},
gl:function(a){return J.aN(this.a)},
gY:function(a){return J.eR(this.a)},
gA:function(a){return this.b.$1(J.iX(this.a))},
$asB:function(a,b){return[b]},
w:{
bI:function(a,b,c,d){if(!!J.o(a).$isa0)return new H.bF(a,b,[c,d])
return new H.dR(a,b,[c,d])}}},
bF:{"^":"dR;a,b,$ti",$isa0:1,
$asa0:function(a,b){return[b]}},
mD:{"^":"cV;a,b,c,$ti",
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
$asa0:function(a,b){return[b]},
$asB:function(a,b){return[b]}},
K:{"^":"B;a,b,$ti",
ga_:function(a){return new H.bT(J.aj(this.a),this.b,this.$ti)},
aK:function(a,b){return new H.dR(this,b,[H.m(this,0),null])}},
bT:{"^":"cV;a,b,$ti",
u:function(){var z,y
for(z=this.a,y=this.b;z.u();)if(y.$1(z.gU())===!0)return!0
return!1},
gU:function(){return this.a.gU()}},
h_:{"^":"B;a,b,$ti",
ga_:function(a){return new H.ou(J.aj(this.a),this.b,this.$ti)},
w:{
ot:function(a,b,c){if(!!J.o(a).$isa0)return new H.l8(a,H.hS(b),[c])
return new H.h_(a,H.hS(b),[c])}}},
l8:{"^":"h_;a,b,$ti",
gl:function(a){var z=J.aN(this.a)-this.b
if(z>=0)return z
return 0},
$isa0:1},
ou:{"^":"cV;a,b,$ti",
u:function(){var z,y
for(z=this.a,y=0;y<this.b;++y)z.u()
this.b=0
return z.u()},
gU:function(){return this.a.gU()}},
l9:{"^":"d;$ti",
u:function(){return!1},
gU:function(){return}}}],["","",,H,{"^":"",
cx:function(a,b){var z=a.cX(b)
if(!init.globalState.d.cy)init.globalState.f.by()
return z},
iF:function(a,b){var z,y,x,w,v,u
z={}
z.a=b
if(b==null){b=[]
z.a=b
y=b}else y=b
if(!J.o(y).$isN)throw H.c(P.G("Arguments to main must be a List: "+H.b(y)))
init.globalState=new H.r4(0,0,1,null,null,null,null,null,null,null,null,null,a)
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
y.f=new H.qE(P.bb(null,H.cv),0)
x=P.u
y.z=new H.R(0,null,null,null,null,null,0,[x,H.em])
y.ch=new H.R(0,null,null,null,null,null,0,[x,null])
if(y.x===!0){w=new H.r3()
y.Q=w
self.onmessage=function(c,d){return function(e){c(d,e)}}(H.m0,w)
self.dartPrint=self.dartPrint||function(c){return function(d){if(self.console&&self.console.log)self.console.log(d)
else self.postMessage(c(d))}}(H.r5)}if(init.globalState.x===!0)return
y=init.globalState.a++
w=P.a6(null,null,null,x)
v=new H.co(0,null,!1)
u=new H.em(y,new H.R(0,null,null,null,null,null,0,[x,H.co]),w,init.createNewIsolate(),v,new H.bk(H.dn()),new H.bk(H.dn()),!1,!1,[],P.a6(null,null,null,null),null,null,!1,!0,P.a6(null,null,null,null))
w.t(0,0)
u.e6(0,v)
init.globalState.e=u
init.globalState.d=u
if(H.ay(a,{func:1,args:[,]}))u.cX(new H.vU(z,a))
else if(H.ay(a,{func:1,args:[,,]}))u.cX(new H.vV(z,a))
else u.cX(a)
init.globalState.f.by()},
m4:function(){var z=init.currentScript
if(z!=null)return String(z.src)
if(init.globalState.x===!0)return H.m5()
return},
m5:function(){var z,y
z=new Error().stack
if(z==null){z=function(){try{throw new Error()}catch(x){return x.stack}}()
if(z==null)throw H.c(new P.T("No stack trace"))}y=z.match(new RegExp("^ *at [^(]*\\((.*):[0-9]*:[0-9]*\\)$","m"))
if(y!=null)return y[1]
y=z.match(new RegExp("^[^@]*@(.*):[0-9]*$","m"))
if(y!=null)return y[1]
throw H.c(new P.T('Cannot extract URI from "'+z+'"'))},
m0:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
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
q=P.u
p=P.a6(null,null,null,q)
o=new H.co(0,null,!1)
n=new H.em(y,new H.R(0,null,null,null,null,null,0,[q,H.co]),p,init.createNewIsolate(),o,new H.bk(H.dn()),new H.bk(H.dn()),!1,!1,[],P.a6(null,null,null,null),null,null,!1,!0,P.a6(null,null,null,null))
p.t(0,0)
n.e6(0,o)
init.globalState.f.a.aF(new H.cv(n,new H.m1(w,v,u,t,s,r),"worker-start"))
init.globalState.d=n
init.globalState.f.by()
break
case"spawn-worker":break
case"message":if(y.j(z,"port")!=null)y.j(z,"port").G(y.j(z,"msg"))
init.globalState.f.by()
break
case"close":init.globalState.ch.a3(0,$.$get$fg().j(0,a))
a.terminate()
init.globalState.f.by()
break
case"log":H.m_(y.j(z,"msg"))
break
case"print":if(init.globalState.x===!0){y=init.globalState.Q
q=P.a1(["command","print","msg",z])
q=new H.bu(!0,P.bW(null,P.u)).bq(q)
y.toString
self.postMessage(q)}else P.eF(y.j(z,"msg"))
break
case"error":throw H.c(y.j(z,"msg"))}},
m_:function(a){var z,y,x,w
if(init.globalState.x===!0){y=init.globalState.Q
x=P.a1(["command","log","msg",a])
x=new H.bu(!0,P.bW(null,P.u)).bq(x)
y.toString
self.postMessage(x)}else try{self.console.log(a)}catch(w){H.C(w)
z=H.E(w)
y=P.cS(z)
throw H.c(y)}},
m2:function(a,b,c,d,e,f){var z,y,x,w
z=init.globalState.d
y=z.a
$.fK=$.fK+("_"+y)
$.fL=$.fL+("_"+y)
y=z.e
x=init.globalState.d.a
w=z.f
f.G(["spawned",new H.cw(y,x),w,z.r])
x=new H.m3(a,b,c,d,z)
if(e===!0){z.fU(w,w)
init.globalState.f.a.aF(new H.cv(z,x,"start isolate"))}else x.$0()},
rz:function(a){return new H.d9(!0,[]).c_(new H.bu(!1,P.bW(null,P.u)).bq(a))},
vU:{"^":"a:2;a,b",
$0:function(){this.b.$1(this.a.a)}},
vV:{"^":"a:2;a,b",
$0:function(){this.b.$2(this.a.a,null)}},
r4:{"^":"d;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",w:{
r5:function(a){var z=P.a1(["command","print","msg",a])
return new H.bu(!0,P.bW(null,P.u)).bq(z)}}},
em:{"^":"d;i:a<,b,c,kv:d<,jE:e<,f,r,x,d0:y<,z,Q,ch,cx,cy,db,dx",
fU:function(a,b){if(!this.f.B(0,a))return
if(this.Q.t(0,b)&&!this.y)this.y=!0
this.cR()},
kR:function(a){var z,y,x
if(!this.y)return
z=this.Q
z.a3(0,a)
if(z.a===0){for(z=this.z;y=z.length,y!==0;){if(0>=y)return H.f(z,-1)
x=z.pop()
init.globalState.f.a.fT(x)}this.y=!1}this.cR()},
js:function(a,b){var z,y,x
if(this.ch==null)this.ch=[]
for(z=J.o(a),y=0;x=this.ch,y<x.length;y+=2)if(z.B(a,x[y])){z=this.ch
x=y+1
if(x>=z.length)return H.f(z,x)
z[x]=b
return}x.push(a)
this.ch.push(b)},
kP:function(a){var z,y,x
if(this.ch==null)return
for(z=J.o(a),y=0;x=this.ch,y<x.length;y+=2)if(z.B(a,x[y])){z=this.ch
x=y+2
z.toString
if(typeof z!=="object"||z===null||!!z.fixed$length)H.i(new P.T("removeRange"))
P.cn(y,x,z.length,null,null,null)
z.splice(y,x-y)
return}},
hY:function(a,b){if(!this.r.B(0,a))return
this.db=b},
k7:function(a,b,c){var z=J.o(b)
if(!z.B(b,0))z=z.B(b,1)&&!this.cy
else z=!0
if(z){a.G(c)
return}z=this.cx
if(z==null){z=P.bb(null,null)
this.cx=z}z.aF(new H.qV(a,c))},
k6:function(a,b){var z
if(!this.r.B(0,a))return
z=J.o(b)
if(!z.B(b,0))z=z.B(b,1)&&!this.cy
else z=!0
if(z){this.eS()
return}z=this.cx
if(z==null){z=P.bb(null,null)
this.cx=z}z.aF(this.gkw())},
k8:function(a,b){var z,y,x
z=this.dx
if(z.a===0){if(this.db===!0&&this===init.globalState.e)return
if(self.console&&self.console.error)self.console.error(a,b)
else{P.eF(a)
if(b!=null)P.eF(b)}return}y=new Array(2)
y.fixed$length=Array
y[0]=J.h(a)
y[1]=b==null?null:J.h(b)
for(x=new P.a9(z,z.r,null,null,[null]),x.c=z.e;x.u();)x.d.G(y)},
cX:function(a){var z,y,x,w,v,u,t
z=init.globalState.d
init.globalState.d=this
$=this.d
y=null
x=this.cy
this.cy=!0
try{y=a.$0()}catch(u){w=H.C(u)
v=H.E(u)
this.k8(w,v)
if(this.db===!0){this.eS()
if(this===init.globalState.e)throw u}}finally{this.cy=x
init.globalState.d=z
if(z!=null)$=z.gkv()
if(this.cx!=null)for(;t=this.cx,!t.gY(t);)this.cx.dN().$0()}return y},
cs:function(a){return this.b.j(0,a)},
e6:function(a,b){var z=this.b
if(z.ad(a))throw H.c(P.cS("Registry: ports must be registered only once."))
z.p(0,a,b)},
cR:function(){var z=this.b
if(z.gl(z)-this.c.a>0||this.y||!this.x)init.globalState.z.p(0,this.a,this)
else this.eS()},
eS:[function(){var z,y,x,w,v
z=this.cx
if(z!=null)z.bi(0)
for(z=this.b,y=z.gcC(),y=y.ga_(y);y.u();)y.gU().iz()
z.bi(0)
this.c.bi(0)
init.globalState.z.a3(0,this.a)
this.dx.bi(0)
if(this.ch!=null){for(x=0;z=this.ch,y=z.length,x<y;x+=2){w=z[x]
v=x+1
if(v>=y)return H.f(z,v)
w.G(z[v])}this.ch=null}},"$0","gkw",0,0,7]},
qV:{"^":"a:7;a,b",
$0:function(){this.a.G(this.b)}},
qE:{"^":"d;a,b",
jK:function(){var z=this.a
if(z.b===z.c)return
return z.dN()},
hB:function(){var z,y,x
z=this.jK()
if(z==null){if(init.globalState.e!=null)if(init.globalState.z.ad(init.globalState.e.a))if(init.globalState.r===!0){y=init.globalState.e.b
y=y.gY(y)}else y=!1
else y=!1
else y=!1
if(y)H.i(P.cS("Program exited with open ReceivePorts."))
y=init.globalState
if(y.x===!0){x=y.z
x=x.gY(x)&&y.f.b===0}else x=!1
if(x){y=y.Q
x=P.a1(["command","close"])
x=new H.bu(!0,new P.hN(0,null,null,null,null,null,0,[null,P.u])).bq(x)
y.toString
self.postMessage(x)}return!1}z.kN()
return!0},
fO:function(){if(self.window!=null)new H.qF(this).$0()
else for(;this.hB(););},
by:function(){var z,y,x,w,v
if(init.globalState.x!==!0)this.fO()
else try{this.fO()}catch(x){z=H.C(x)
y=H.E(x)
w=init.globalState.Q
v=P.a1(["command","error","msg",H.b(z)+"\n"+H.b(y)])
v=new H.bu(!0,P.bW(null,P.u)).bq(v)
w.toString
self.postMessage(v)}}},
qF:{"^":"a:7;a",
$0:function(){if(!this.a.hB())return
P.pF(C.z,this)}},
cv:{"^":"d;a,b,c",
kN:function(){var z=this.a
if(z.y){z.z.push(this)
return}z.cX(this.b)}},
r3:{"^":"d;"},
m1:{"^":"a:2;a,b,c,d,e,f",
$0:function(){H.m2(this.a,this.b,this.c,this.d,this.e,this.f)}},
m3:{"^":"a:7;a,b,c,d,e",
$0:function(){var z,y
z=this.e
z.x=!0
if(this.d!==!0)this.a.$1(this.c)
else{y=this.a
if(H.ay(y,{func:1,args:[,,]}))y.$2(this.b,this.c)
else if(H.ay(y,{func:1,args:[,]}))y.$1(this.b)
else y.$0()}z.cR()}},
hH:{"^":"d;"},
cw:{"^":"hH;b,a",
G:function(a){var z,y,x
z=init.globalState.z.j(0,this.a)
if(z==null)return
y=this.b
if(y.gfD())return
x=H.rz(a)
if(z.gjE()===y){y=J.L(x)
switch(y.j(x,0)){case"pause":z.fU(y.j(x,1),y.j(x,2))
break
case"resume":z.kR(y.j(x,1))
break
case"add-ondone":z.js(y.j(x,1),y.j(x,2))
break
case"remove-ondone":z.kP(y.j(x,1))
break
case"set-errors-fatal":z.hY(y.j(x,1),y.j(x,2))
break
case"ping":z.k7(y.j(x,1),y.j(x,2),y.j(x,3))
break
case"kill":z.k6(y.j(x,1),y.j(x,2))
break
case"getErrors":y=y.j(x,1)
z.dx.t(0,y)
break
case"stopErrors":y=y.j(x,1)
z.dx.a3(0,y)
break}return}init.globalState.f.a.aF(new H.cv(z,new H.r7(this,x),"receive"))},
B:function(a,b){if(b==null)return!1
return b instanceof H.cw&&J.e(this.b,b.b)},
gD:function(a){return this.b.gej()}},
r7:{"^":"a:2;a,b",
$0:function(){var z=this.a.b
if(!z.gfD())z.ip(this.b)}},
eo:{"^":"hH;b,c,a",
G:function(a){var z,y,x
z=P.a1(["command","message","port",this,"msg",a])
y=new H.bu(!0,P.bW(null,P.u)).bq(z)
if(init.globalState.x===!0){init.globalState.Q.toString
self.postMessage(y)}else{x=init.globalState.ch.j(0,this.b)
if(x!=null)x.postMessage(y)}},
B:function(a,b){if(b==null)return!1
return b instanceof H.eo&&J.e(this.b,b.b)&&J.e(this.a,b.a)&&J.e(this.c,b.c)},
gD:function(a){var z,y,x
z=this.b
if(typeof z!=="number")return z.fa()
y=this.a
if(typeof y!=="number")return y.fa()
x=this.c
if(typeof x!=="number")return H.x(x)
return(z<<16^y<<8^x)>>>0}},
co:{"^":"d;ej:a<,b,fD:c<",
iz:function(){this.c=!0
this.b=null},
bu:function(){var z,y
if(this.c)return
this.c=!0
this.b=null
z=init.globalState.d
y=this.a
z.b.a3(0,y)
z.c.a3(0,y)
z.cR()},
ip:function(a){if(this.c)return
this.b.$1(a)},
$isnC:1},
nD:{"^":"al;a,b",
aJ:function(a,b,c,d){var z=this.b
z.toString
return new P.d8(z,[H.m(z,0)]).aJ(a,b,c,d)},
eV:function(a,b,c){return this.aJ(a,null,b,c)},
bu:[function(){this.a.bu()
this.b.bu()},"$0","gjA",0,0,7],
ig:function(a){var z=new P.rm(null,0,null,null,null,null,this.gjA(),[null])
this.b=z
this.a.b=z.gjj(z)},
$asal:I.bg},
pB:{"^":"d;a,b,c",
gc2:function(){return this.c!=null},
ij:function(a,b){var z,y
if(a===0)z=self.setTimeout==null||init.globalState.x===!0
else z=!1
if(z){this.c=1
z=init.globalState.f
y=init.globalState.d
z.a.aF(new H.cv(y,new H.pD(this,b),"timer"))
this.b=!0}else if(self.setTimeout!=null){++init.globalState.f.b
this.c=self.setTimeout(H.di(new H.pE(this,b),0),a)}else throw H.c(new P.T("Timer greater than 0."))},
w:{
pC:function(a,b){var z=new H.pB(!0,!1,null)
z.ij(a,b)
return z}}},
pD:{"^":"a:7;a,b",
$0:function(){this.a.c=null
this.b.$0()}},
pE:{"^":"a:7;a,b",
$0:function(){this.a.c=null;--init.globalState.f.b
this.b.$0()}},
bk:{"^":"d;ej:a<",
gD:function(a){var z=this.a
if(typeof z!=="number")return z.lg()
z=C.j.dB(z,0)^C.j.bN(z,4294967296)
z=(~z>>>0)+(z<<15>>>0)&4294967295
z=((z^z>>>12)>>>0)*5&4294967295
z=((z^z>>>4)>>>0)*2057&4294967295
return(z^z>>>16)>>>0},
B:function(a,b){var z,y
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
if(!!z.$iscW)return this.hU(a)
if(!!z.$islY){x=this.ghR()
z=a.gcq()
z=H.bI(z,x,H.y(z,"B",0),null)
z=P.P(z,!0,H.y(z,"B",0))
w=a.gcC()
w=H.bI(w,x,H.y(w,"B",0),null)
return["map",z,P.P(w,!0,H.y(w,"B",0))]}if(!!z.$isfm)return this.hV(a)
if(!!z.$isaY)this.hE(a)
if(!!z.$isnC)this.d9(a,"RawReceivePorts can't be transmitted:")
if(!!z.$iscw)return this.hW(a)
if(!!z.$iseo)return this.hX(a)
if(!!z.$isa){v=a.$static_name
if(v==null)this.d9(a,"Closures can't be transmitted:")
return["function",v]}if(!!z.$isbk)return["capability",a.a]
if(!(a instanceof P.d))this.hE(a)
return["dart",init.classIdExtractor(a),this.hT(init.classFieldsExtractor(a))]},"$1","ghR",2,0,0],
d9:function(a,b){throw H.c(new P.T((b==null?"Can't transmit:":b)+" "+H.b(a)))},
hE:function(a){return this.d9(a,null)},
hU:function(a){var z=this.hS(a)
if(!!a.fixed$length)return["fixed",z]
if(!a.fixed$length)return["extendable",z]
if(!a.immutable$list)return["mutable",z]
if(a.constructor===Array)return["const",z]
this.d9(a,"Can't serialize indexable: ")},
hS:function(a){var z,y,x
z=[]
C.a.sl(z,a.length)
for(y=0;y<a.length;++y){x=this.bq(a[y])
if(y>=z.length)return H.f(z,y)
z[y]=x}return z},
hT:function(a){var z
for(z=0;z<a.length;++z)C.a.p(a,z,this.bq(a[z]))
return a},
hV:function(a){var z,y,x,w
if(!!a.constructor&&a.constructor!==Object)this.d9(a,"Only plain JS Objects are supported:")
z=Object.keys(a)
y=[]
C.a.sl(y,z.length)
for(x=0;x<z.length;++x){w=this.bq(a[z[x]])
if(x>=y.length)return H.f(y,x)
y[x]=w}return["js-object",z,y]},
hX:function(a){if(this.a)return["sendport",a.b,a.a,a.c]
return["raw sendport",a]},
hW:function(a){if(this.a)return["sendport",init.globalState.b,a.a,a.b.gej()]
return["raw sendport",a]}},
d9:{"^":"d;a,b",
c_:[function(a){var z,y,x,w,v,u
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
if(typeof a!=="object"||a===null||a.constructor!==Array)throw H.c(P.G("Bad serialized message: "+H.b(a)))
switch(C.a.gcY(a)){case"ref":if(1>=a.length)return H.f(a,1)
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
y=H.q(this.cW(x),[null])
y.fixed$length=Array
return y
case"extendable":if(1>=a.length)return H.f(a,1)
x=a[1]
this.b.push(x)
return H.q(this.cW(x),[null])
case"mutable":if(1>=a.length)return H.f(a,1)
x=a[1]
this.b.push(x)
return this.cW(x)
case"const":if(1>=a.length)return H.f(a,1)
x=a[1]
this.b.push(x)
y=H.q(this.cW(x),[null])
y.fixed$length=Array
return y
case"map":return this.jO(a)
case"sendport":return this.jP(a)
case"raw sendport":if(1>=a.length)return H.f(a,1)
x=a[1]
this.b.push(x)
return x
case"js-object":return this.jN(a)
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
this.cW(v)
return init.initializeEmptyInstance(w,u,v)
default:throw H.c("couldn't deserialize: "+H.b(a))}},"$1","gjM",2,0,0],
cW:function(a){var z,y,x
z=J.L(a)
y=0
while(!0){x=z.gl(a)
if(typeof x!=="number")return H.x(x)
if(!(y<x))break
z.p(a,y,this.c_(z.j(a,y)));++y}return a},
jO:function(a){var z,y,x,w,v,u
z=a.length
if(1>=z)return H.f(a,1)
y=a[1]
if(2>=z)return H.f(a,2)
x=a[2]
w=P.b_()
this.b.push(w)
y=J.eS(y,this.gjM()).cB(0)
for(z=J.L(y),v=J.L(x),u=0;u<z.gl(y);++u){if(u>=y.length)return H.f(y,u)
w.p(0,y[u],this.c_(v.j(x,u)))}return w},
jP:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.f(a,1)
y=a[1]
if(2>=z)return H.f(a,2)
x=a[2]
if(3>=z)return H.f(a,3)
w=a[3]
if(J.e(y,init.globalState.b)){v=init.globalState.z.j(0,x)
if(v==null)return
u=v.cs(w)
if(u==null)return
t=new H.cw(u,x)}else t=new H.eo(y,w,x)
this.b.push(t)
return t},
jN:function(a){var z,y,x,w,v,u,t
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
ka:function(){throw H.c(new P.T("Cannot modify unmodifiable Map"))},
uV:function(a){return init.types[a]},
b:function(a){var z
if(typeof a==="string")return a
if(typeof a==="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
z=J.h(a)
if(typeof z!=="string")throw H.c(H.U(a))
return z},
aE:function(a){var z=a.$identityHash
if(z==null){z=Math.random()*0x3fffffff|0
a.$identityHash=z}return z},
bM:function(a){var z,y,x,w,v,u,t,s
z=J.o(a)
y=z.constructor
if(typeof y=="function"){x=y.name
w=typeof x==="string"?x:null}else w=null
if(w==null||z===C.N||!!J.o(a).$isbs){v=C.Q(a)
if(v==="Object"){u=a.constructor
if(typeof u=="function"){t=String(u).match(/^\s*function\s*([\w$]*)\s*\(/)
s=t==null?null:t[1]
if(typeof s==="string"&&/^\w+$/.test(s))w=s}if(w==null)w=v}else w=v}w=w
if(w.length>1&&C.b.cG(w,0)===36)w=C.b.bL(w,1)
return function(b,c){return b.replace(/[^<,> ]+/g,function(d){return c[d]||d})}(w+H.dl(H.cA(a),0,null),init.mangledGlobalNames)},
d_:function(a){return"Instance of '"+H.bM(a)+"'"},
ar:function(a){var z
if(a<=65535)return String.fromCharCode(a)
if(a<=1114111){z=a-65536
return String.fromCharCode((55296|C.e.dB(z,10))>>>0,56320|z&1023)}throw H.c(P.a8(a,0,1114111,null,null))},
bo:function(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
nu:function(a){var z=H.bo(a).getFullYear()+0
return z},
ns:function(a){var z=H.bo(a).getMonth()+1
return z},
no:function(a){var z=H.bo(a).getDate()+0
return z},
np:function(a){var z=H.bo(a).getHours()+0
return z},
nr:function(a){var z=H.bo(a).getMinutes()+0
return z},
nt:function(a){var z=H.bo(a).getSeconds()+0
return z},
nq:function(a){var z=H.bo(a).getMilliseconds()+0
return z},
e1:function(a,b){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.c(H.U(a))
return a[b]},
fM:function(a,b,c){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.c(H.U(a))
a[b]=c},
x:function(a){throw H.c(H.U(a))},
f:function(a,b){if(a==null)J.aN(a)
throw H.c(H.aK(a,b))},
aK:function(a,b){var z,y
if(typeof b!=="number"||Math.floor(b)!==b)return new P.b7(!0,b,"index",null)
z=J.aN(a)
if(!(b<0)){if(typeof z!=="number")return H.x(z)
y=b>=z}else y=!0
if(y)return P.cU(b,a,"index",null,z)
return P.cm(b,"index",null)},
U:function(a){return new P.b7(!0,a,null,null)},
dg:function(a){if(typeof a!=="number")throw H.c(H.U(a))
return a},
rV:function(a){if(typeof a!=="number"||Math.floor(a)!==a)throw H.c(H.U(a))
return a},
by:function(a){if(typeof a!=="string")throw H.c(H.U(a))
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
as:function(a){throw H.c(new P.D(a))},
C:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.x_(a)
if(a==null)return
if(a instanceof H.dB)return z.$1(a.a)
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.e.dB(x,16)&8191)===10)switch(w){case 438:return z.$1(H.dI(H.b(y)+" (Error "+w+")",null))
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
if(v)return z.$1(new H.fB(y,l==null?null:l.method))}}return z.$1(new H.pL(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.h9()
y=function(b){try{return String(b)}catch(k){}return null}(a)
return z.$1(new P.b7(!1,null,null,typeof y==="string"?y.replace(/^RangeError:\s*/,""):y))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.h9()
return a},
E:function(a){var z
if(a instanceof H.dB)return a.b
if(a==null)return new H.hP(a,null)
z=a.$cachedTrace
if(z!=null)return z
return a.$cachedTrace=new H.hP(a,null)},
vb:function(a){if(a==null||typeof a!='object')return J.j(a)
else return H.aE(a)},
uo:function(a,b){var z,y,x,w
z=a.length
for(y=0;y<z;y=w){x=y+1
w=x+1
b.p(0,a[y],a[x])}return b},
v0:function(a,b,c,d,e,f,g){switch(c){case 0:return H.cx(b,new H.v1(a))
case 1:return H.cx(b,new H.v2(a,d))
case 2:return H.cx(b,new H.v3(a,d,e))
case 3:return H.cx(b,new H.v4(a,d,e,f))
case 4:return H.cx(b,new H.v5(a,d,e,f,g))}throw H.c(P.cS("Unsupported number of arguments for wrapped closure"))},
di:function(a,b){var z=a.$identity
if(!!z)return z
z=function(c,d,e,f){return function(g,h,i,j){return f(c,e,d,g,h,i,j)}}(a,b,init.globalState.d,H.v0)
a.$identity=z
return z},
k5:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=z.$callName
if(!!J.o(c).$isN){z.$reflectionInfo=c
x=H.nF(z).r}else x=c
w=d?Object.create(new H.oP().constructor.prototype):Object.create(new H.du(null,null,null,null).constructor.prototype)
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
t=!1}if(typeof x=="number")r=function(g,h){return function(){return g(h)}}(H.uV,x)
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
k2:function(a,b,c,d){var z=H.dv
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},
f3:function(a,b,c){var z,y,x,w,v,u,t
if(c)return H.k4(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
v=!w||y>=27
if(v)return H.k2(y,!w,z,b)
if(y===0){w=$.aO
$.aO=J.ao(w,1)
u="self"+H.b(w)
w="return function(){var "+u+" = this."
v=$.bE
if(v==null){v=H.cL("self")
$.bE=v}return new Function(w+H.b(v)+";return "+u+"."+H.b(z)+"();}")()}t="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w=$.aO
$.aO=J.ao(w,1)
t+=H.b(w)
w="return function("+t+"){return this."
v=$.bE
if(v==null){v=H.cL("self")
$.bE=v}return new Function(w+H.b(v)+"."+H.b(z)+"("+t+");}")()},
k3:function(a,b,c,d){var z,y
z=H.dv
y=H.eZ
switch(b?-1:a){case 0:throw H.c(new H.nR("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,z,y)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,z,y)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,z,y)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,z,y)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,z,y)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,z,y)
default:return function(e,f,g,h){return function(){h=[g(this)]
Array.prototype.push.apply(h,arguments)
return e.apply(f(this),h)}}(d,z,y)}},
k4:function(a,b){var z,y,x,w,v,u,t,s
z=H.jU()
y=$.eY
if(y==null){y=H.cL("receiver")
$.eY=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.k3(w,!u,x,b)
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
return H.k5(a,b,z,!!d,e,f)},
vk:function(a,b){var z=J.L(b)
throw H.c(H.cN(H.bM(a),z.aM(b,3,z.gl(b))))},
F:function(a,b){var z
if(a!=null)z=(typeof a==="object"||typeof a==="function")&&J.o(a)[b]
else z=!0
if(z)return a
H.vk(a,b)},
eA:function(a){var z=J.o(a)
return"$S" in z?z.$S():null},
ay:function(a,b){var z
if(a==null)return!1
z=H.eA(a)
return z==null?!1:H.eD(z,b)},
ij:function(a,b){var z,y
if(a==null)return a
if(H.ay(a,b))return a
z=H.a_(b,null)
y=H.eA(a)
throw H.c(H.cN(y!=null?H.a_(y,null):H.bM(a),z))},
wX:function(a){throw H.c(new P.kn(a))},
dn:function(){return(Math.random()*0x100000000>>>0)+(Math.random()*0x100000000>>>0)*4294967296},
bf:function(a){return new H.av(a,null)},
q:function(a,b){a.$ti=b
return a},
cA:function(a){if(a==null)return
return a.$ti},
ip:function(a,b){return H.eP(a["$as"+H.b(b)],H.cA(a))},
y:function(a,b,c){var z=H.ip(a,b)
return z==null?null:z[c]},
m:function(a,b){var z=H.cA(a)
return z==null?null:z[b]},
a_:function(a,b){var z
if(a==null)return"dynamic"
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a[0].builtin$cls+H.dl(a,1,b)
if(typeof a=="function")return a.builtin$cls
if(typeof a==="number"&&Math.floor(a)===a)return H.b(b==null?a:b.$1(a))
if(typeof a.func!="undefined"){z=a.typedef
if(z!=null)return H.a_(z,b)
return H.rE(a,b)}return"unknown-reified-type"},
rE:function(a,b){var z,y,x,w,v,u,t,s,r,q,p
z=!!a.v?"void":H.a_(a.ret,b)
if("args" in a){y=a.args
for(x=y.length,w="",v="",u=0;u<x;++u,v=", "){t=y[u]
w=w+v+H.a_(t,b)}}else{w=""
v=""}if("opt" in a){s=a.opt
w+=v+"["
for(x=s.length,v="",u=0;u<x;++u,v=", "){t=s[u]
w=w+v+H.a_(t,b)}w+="]"}if("named" in a){r=a.named
w+=v+"{"
for(x=H.un(r),q=x.length,v="",u=0;u<q;++u,v=", "){p=x[u]
w=w+v+H.a_(r[p],b)+(" "+H.b(p))}w+="}"}return"("+w+") => "+z},
dl:function(a,b,c){var z,y,x,w,v,u
if(a==null)return""
z=new P.bS("")
for(y=b,x=!0,w=!0,v="";y<a.length;++y){if(x)x=!1
else z.E=v+", "
u=a[y]
if(u!=null)w=!1
v=z.E+=H.a_(u,c)}return w?"":"<"+z.k(0)+">"},
iq:function(a){var z,y
if(a instanceof H.a){z=H.eA(a)
if(z!=null)return H.a_(z,null)}y=J.o(a).constructor.builtin$cls
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
z=H.cA(a)
y=J.o(a)
if(y[b]==null)return!1
return H.i6(H.eP(y[d],z),c)},
aM:function(a,b,c,d){if(a==null)return a
if(H.aV(a,b,c,d))return a
throw H.c(H.cN(H.bM(a),function(e,f){return e.replace(/[^<,> ]+/g,function(g){return f[g]||g})}(b.substring(3)+H.dl(c,0,null),init.mangledGlobalNames)))},
i6:function(a,b){var z,y
if(a==null||b==null)return!0
z=a.length
for(y=0;y<z;++y)if(!H.an(a[y],b[y]))return!1
return!0},
be:function(a,b,c){return a.apply(b,H.ip(b,c))},
dh:function(a,b){var z,y,x
if(a==null)return b==null||b.builtin$cls==="d"||b.builtin$cls==="at"
if(b==null)return!0
z=H.cA(a)
a=J.o(a)
y=a.constructor
if(z!=null){z=z.slice()
z.splice(0,0,y)
y=z}if('func' in b){x=a.$S
if(x==null)return!1
return H.eD(x.apply(a,null),b)}return H.an(y,b)},
iJ:function(a,b){if(a!=null&&!H.dh(a,b))throw H.c(H.cN(H.bM(a),H.a_(b,null)))
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
if(w!==y){v=H.a_(w,null)
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
if(!(H.an(z,v)||H.an(v,z)))return!1}return!0},
rP:function(a,b){var z,y,x,w,v,u
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
if(t===s){if(!H.i5(x,w,!1))return!1
if(!H.i5(v,u,!0))return!1}else{for(p=0;p<t;++p){o=x[p]
n=w[p]
if(!(H.an(o,n)||H.an(n,o)))return!1}for(m=p,l=0;m<s;++l,++m){o=v[l]
n=w[m]
if(!(H.an(o,n)||H.an(n,o)))return!1}for(m=0;m<q;++l,++m){o=v[l]
n=u[m]
if(!(H.an(o,n)||H.an(n,o)))return!1}}return H.rP(a.named,b.named)},
wP:function(a,b,c){var z
if(typeof b==="string")return a.indexOf(b,c)>=0
else{z=J.o(b)
if(!!z.$isdG){z=C.b.bL(a,c)
return b.b.test(z)}else{z=z.eF(b,C.b.bL(a,c))
return!z.gY(z)}}},
wR:function(a,b,c,d){var z,y,x
z=b.fu(a,d)
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
xM:[function(a){return a},"$1","hT",2,0,23],
wQ:function(a,b,c,d){var z,y,x,w,v,u
z=J.o(b)
if(!z.$isdZ)throw H.c(P.cI(b,"pattern","is not a Pattern"))
for(z=z.eF(b,a),z=new H.hF(z.a,z.b,z.c,null),y=0,x="";z.u();){w=z.d
v=w.b
u=v.index
x=x+H.b(H.hT().$1(C.b.aM(a,y,u)))+H.b(c.$1(w))
y=u+v[0].length}z=x+H.b(H.hT().$1(C.b.bL(a,y)))
return z.charCodeAt(0)==0?z:z},
iI:function(a,b,c,d){var z,y,x,w,v,u
if(typeof b==="string"){z=a.indexOf(b,d)
if(z<0)return a
return H.eO(a,z,z+b.length,c)}y=J.o(b)
if(!!y.$isdG)return d===0?a.replace(b.b,c.replace(/\$/g,"$$$$")):H.wR(a,b,c,d)
if(b==null)H.i(H.U(b))
y=y.dD(b,a,d)
x=y.ga_(y)
if(!x.u())return a
w=x.gU()
y=w.gfe()
v=w.gh4()
H.by(c)
u=P.cn(y,v,a.length,null,null,null)
H.rV(u)
return H.eO(a,y,u,c)},
eO:function(a,b,c,d){var z,y
z=a.substring(0,b)
y=a.substring(c)
return z+H.b(d)+y},
k9:{"^":"d;$ti",
gY:function(a){return this.gl(this)===0},
gav:function(a){return this.gl(this)!==0},
k:function(a){return P.dS(this)},
p:function(a,b,c){return H.ka()},
$isI:1},
kb:{"^":"k9;a,b,c,$ti",
gl:function(a){return this.a},
ad:function(a){if(typeof a!=="string")return!1
if("__proto__"===a)return!1
return this.b.hasOwnProperty(a)},
j:function(a,b){if(!this.ad(b))return
return this.fv(b)},
fv:function(a){return this.b[a]},
Z:function(a,b){var z,y,x,w
z=this.c
for(y=z.length,x=0;x<y;++x){w=z[x]
b.$2(w,this.fv(w))}}},
nE:{"^":"d;a,b,c,d,e,f,r,x",w:{
nF:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z.fixed$length=Array
z=z
y=z[0]
x=z[1]
return new H.nE(a,z,(y&1)===1,y>>1,x>>1,(x&1)===1,z[2],null)}}},
pG:{"^":"d;a,b,c,d,e,f",
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
w:{
aQ:function(a){var z,y,x,w,v,u
a=a.replace(String({}),'$receiver$').replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
z=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(z==null)z=[]
y=z.indexOf("\\$arguments\\$")
x=z.indexOf("\\$argumentsExpr\\$")
w=z.indexOf("\\$expr\\$")
v=z.indexOf("\\$method\\$")
u=z.indexOf("\\$receiver\\$")
return new H.pG(a.replace(new RegExp('\\\\\\$arguments\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$argumentsExpr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$expr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$method\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$receiver\\\\\\$','g'),'((?:x|[^x])*)'),y,x,w,v,u)},
d7:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},
ht:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},
fB:{"^":"a5;a,b",
k:function(a){var z=this.b
if(z==null)return"NullError: "+H.b(this.a)
return"NullError: method not found: '"+H.b(z)+"' on null"}},
ma:{"^":"a5;a,b,c",
k:function(a){var z,y
z=this.b
if(z==null)return"NoSuchMethodError: "+H.b(this.a)
y=this.c
if(y==null)return"NoSuchMethodError: method not found: '"+z+"' ("+H.b(this.a)+")"
return"NoSuchMethodError: method not found: '"+z+"' on '"+y+"' ("+H.b(this.a)+")"},
w:{
dI:function(a,b){var z,y
z=b==null
y=z?null:b.method
return new H.ma(a,y,z?null:b.receiver)}}},
pL:{"^":"a5;a",
k:function(a){var z=this.a
return z.length===0?"Error":"Error: "+z}},
dB:{"^":"d;a,br:b<"},
x_:{"^":"a:0;a",
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
v1:{"^":"a:2;a",
$0:function(){return this.a.$0()}},
v2:{"^":"a:2;a,b",
$0:function(){return this.a.$1(this.b)}},
v3:{"^":"a:2;a,b,c",
$0:function(){return this.a.$2(this.b,this.c)}},
v4:{"^":"a:2;a,b,c,d",
$0:function(){return this.a.$3(this.b,this.c,this.d)}},
v5:{"^":"a:2;a,b,c,d,e",
$0:function(){return this.a.$4(this.b,this.c,this.d,this.e)}},
a:{"^":"d;",
k:function(a){return"Closure '"+H.bM(this).trim()+"'"},
ghM:function(){return this},
$isbG:1,
ghM:function(){return this}},
hm:{"^":"a;"},
oP:{"^":"hm;",
k:function(a){var z=this.$static_name
if(z==null)return"Closure of unknown static method"
return"Closure '"+z+"'"}},
du:{"^":"hm;a,b,c,d",
B:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof H.du))return!1
return this.a===b.a&&this.b===b.b&&this.c===b.c},
gD:function(a){var z,y
z=this.c
if(z==null)y=H.aE(this.a)
else y=typeof z!=="object"?J.j(z):H.aE(z)
z=H.aE(this.b)
if(typeof y!=="number")return y.lh()
return(y^z)>>>0},
k:function(a){var z=this.c
if(z==null)z=this.a
return"Closure '"+H.b(this.d)+"' of "+H.d_(z)},
w:{
dv:function(a){return a.a},
eZ:function(a){return a.c},
jU:function(){var z=$.bE
if(z==null){z=H.cL("self")
$.bE=z}return z},
cL:function(a){var z,y,x,w,v
z=new H.du("self","target","receiver","name")
y=Object.getOwnPropertyNames(z)
y.fixed$length=Array
x=y
for(y=x.length,w=0;w<y;++w){v=x[w]
if(z[v]===a)return v}}}},
jZ:{"^":"a5;a",
k:function(a){return this.a},
w:{
cN:function(a,b){return new H.jZ("CastError: Casting value of type '"+a+"' to incompatible type '"+b+"'")}}},
nR:{"^":"a5;a",
k:function(a){return"RuntimeError: "+H.b(this.a)}},
av:{"^":"d;a,b",
k:function(a){var z,y
z=this.b
if(z!=null)return z
y=function(b,c){return b.replace(/[^<,> ]+/g,function(d){return c[d]||d})}(this.a,init.mangledGlobalNames)
this.b=y
return y},
gD:function(a){return J.j(this.a)},
B:function(a,b){if(b==null)return!1
return b instanceof H.av&&J.e(this.a,b.a)}},
R:{"^":"d;a,b,c,d,e,f,r,$ti",
gl:function(a){return this.a},
gY:function(a){return this.a===0},
gav:function(a){return!this.gY(this)},
gcq:function(){return new H.mr(this,[H.m(this,0)])},
gcC:function(){return H.bI(this.gcq(),new H.m9(this),H.m(this,0),H.m(this,1))},
ad:function(a){var z,y
if(typeof a==="string"){z=this.b
if(z==null)return!1
return this.fp(z,a)}else if(typeof a==="number"&&(a&0x3ffffff)===a){y=this.c
if(y==null)return!1
return this.fp(y,a)}else return this.kk(a)},
kk:function(a){var z=this.d
if(z==null)return!1
return this.d_(this.dv(z,this.cZ(a)),a)>=0},
j:function(a,b){var z,y,x
if(typeof b==="string"){z=this.b
if(z==null)return
y=this.cJ(z,b)
return y==null?null:y.gc1()}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null)return
y=this.cJ(x,b)
return y==null?null:y.gc1()}else return this.kl(b)},
kl:function(a){var z,y,x
z=this.d
if(z==null)return
y=this.dv(z,this.cZ(a))
x=this.d_(y,a)
if(x<0)return
return y[x].gc1()},
p:function(a,b,c){var z,y
if(typeof b==="string"){z=this.b
if(z==null){z=this.el()
this.b=z}this.fj(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=this.el()
this.c=y}this.fj(y,b,c)}else this.kn(b,c)},
kn:function(a,b){var z,y,x,w
z=this.d
if(z==null){z=this.el()
this.d=z}y=this.cZ(a)
x=this.dv(z,y)
if(x==null)this.ey(z,y,[this.em(a,b)])
else{w=this.d_(x,a)
if(w>=0)x[w].sc1(b)
else x.push(this.em(a,b))}},
kO:function(a,b){var z
if(this.ad(a))return this.j(0,a)
z=b.$0()
this.p(0,a,z)
return z},
a3:function(a,b){if(typeof b==="string")return this.fN(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.fN(this.c,b)
else return this.km(b)},
km:function(a){var z,y,x,w
z=this.d
if(z==null)return
y=this.dv(z,this.cZ(a))
x=this.d_(y,a)
if(x<0)return
w=y.splice(x,1)[0]
this.fP(w)
return w.gc1()},
bi:function(a){if(this.a>0){this.f=null
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
fj:function(a,b,c){var z=this.cJ(a,b)
if(z==null)this.ey(a,b,this.em(b,c))
else z.sc1(c)},
fN:function(a,b){var z
if(a==null)return
z=this.cJ(a,b)
if(z==null)return
this.fP(z)
this.fq(a,b)
return z.gc1()},
em:function(a,b){var z,y
z=new H.mq(a,b,null,null,[null,null])
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.d=y
y.c=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
fP:function(a){var z,y
z=a.gj0()
y=a.c
if(z==null)this.e=y
else z.c=y
if(y==null)this.f=z
else y.d=z;--this.a
this.r=this.r+1&67108863},
cZ:function(a){return J.j(a)&0x3ffffff},
d_:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.e(a[y].ghc(),b))return y
return-1},
k:function(a){return P.dS(this)},
cJ:function(a,b){return a[b]},
dv:function(a,b){return a[b]},
ey:function(a,b,c){a[b]=c},
fq:function(a,b){delete a[b]},
fp:function(a,b){return this.cJ(a,b)!=null},
el:function(){var z=Object.create(null)
this.ey(z,"<non-identifier-key>",z)
this.fq(z,"<non-identifier-key>")
return z},
$islY:1,
$isI:1,
w:{
fp:function(a,b){return new H.R(0,null,null,null,null,null,0,[a,b])}}},
m9:{"^":"a:0;a",
$1:function(a){return this.a.j(0,a)}},
mq:{"^":"d;hc:a<,c1:b@,c,j0:d<,$ti"},
mr:{"^":"a0;a,$ti",
gl:function(a){return this.a.a},
gY:function(a){return this.a.a===0},
ga_:function(a){var z,y
z=this.a
y=new H.ms(z,z.r,null,null,this.$ti)
y.c=z.e
return y},
a4:function(a,b){return this.a.ad(b)},
Z:function(a,b){var z,y,x
z=this.a
y=z.e
x=z.r
for(;y!=null;){b.$1(y.a)
if(x!==z.r)throw H.c(new P.D(z))
y=y.c}}},
ms:{"^":"d;a,b,c,d,$ti",
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
giX:function(){var z=this.c
if(z!=null)return z
z=this.b
z=H.dH(this.a,z.multiline,!z.ignoreCase,!0)
this.c=z
return z},
giW:function(){var z=this.d
if(z!=null)return z
z=this.b
z=H.dH(this.a+"|()",z.multiline,!z.ignoreCase,!0)
this.d=z
return z},
dD:function(a,b,c){if(c>b.length)throw H.c(P.a8(c,0,b.length,null,null))
return new H.qk(this,b,c)},
eF:function(a,b){return this.dD(a,b,0)},
fu:function(a,b){var z,y
z=this.giX()
z.lastIndex=b
y=z.exec(a)
if(y==null)return
return new H.hO(this,y)},
iH:function(a,b){var z,y
z=this.giW()
z.lastIndex=b
y=z.exec(a)
if(y==null)return
if(0>=y.length)return H.f(y,-1)
if(y.pop()!=null)return
return new H.hO(this,y)},
hh:function(a,b,c){if(c>b.length)throw H.c(P.a8(c,0,b.length,null,null))
return this.iH(b,c)},
$isdZ:1,
w:{
dH:function(a,b,c,d){var z,y,x,w
z=b?"m":""
y=c?"":"i"
x=d?"g":""
w=function(e,f){try{return new RegExp(e,f)}catch(v){return v}}(a,z+y+x)
if(w instanceof RegExp)return w
throw H.c(new P.fb("Illegal RegExp pattern ("+String(w)+")",a,null))}}},
hO:{"^":"d;a,b",
gfe:function(){return this.b.index},
gh4:function(){var z=this.b
return z.index+z[0].length},
j:function(a,b){var z=this.b
if(b>>>0!==b||b>=z.length)return H.f(z,b)
return z[b]},
$isbn:1},
qk:{"^":"cf;a,b,c",
ga_:function(a){return new H.hF(this.a,this.b,this.c,null)},
$ascf:function(){return[P.bn]},
$asB:function(){return[P.bn]}},
hF:{"^":"d;a,b,c,d",
gU:function(){return this.d},
u:function(){var z,y,x,w
z=this.b
if(z==null)return!1
y=this.c
if(y<=z.length){x=this.a.fu(z,y)
if(x!=null){this.d=x
z=x.b
y=z.index
w=y+z[0].length
this.c=y===w?w+1:w
return!0}}this.d=null
this.b=null
return!1}},
he:{"^":"d;fe:a<,b,c",
gh4:function(){return this.a+this.c.length},
j:function(a,b){if(b!==0)H.i(P.cm(b,null,null))
return this.c},
$isbn:1},
ri:{"^":"B;a,b,c",
ga_:function(a){return new H.rj(this.a,this.b,this.c,null)},
$asB:function(){return[P.bn]}},
rj:{"^":"d;a,b,c,d",
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
un:function(a){var z=H.q(a?Object.keys(a):[],[null])
z.fixed$length=Array
return z}}],["","",,H,{"^":"",
vj:function(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)}}],["","",,P,{"^":"",
ql:function(){var z,y,x
z={}
if(self.scheduleImmediate!=null)return P.rQ()
if(self.MutationObserver!=null&&self.document!=null){y=self.document.createElement("div")
x=self.document.createElement("span")
z.a=null
new self.MutationObserver(H.di(new P.qn(z),1)).observe(y,{childList:true})
return new P.qm(z,y,x)}else if(self.setImmediate!=null)return P.rR()
return P.rS()},
xG:[function(a){++init.globalState.f.b
self.scheduleImmediate(H.di(new P.qo(a),0))},"$1","rQ",2,0,15],
xH:[function(a){++init.globalState.f.b
self.setImmediate(H.di(new P.qp(a),0))},"$1","rR",2,0,15],
xI:[function(a){P.ec(C.z,a)},"$1","rS",2,0,15],
aJ:function(a,b){P.ep(null,a)
return b.gh8()},
aw:function(a,b){P.ep(a,b)},
aI:function(a,b){b.bZ(a)},
aH:function(a,b){b.eJ(H.C(a),H.E(a))},
ep:function(a,b){var z,y,x,w
z=new P.rt(b)
y=new P.ru(b)
x=J.o(a)
if(!!x.$isH)a.ez(z,y)
else if(!!x.$isQ)a.f1(z,y)
else{w=new P.H(0,$.r,null,[null])
w.a=4
w.c=a
w.ez(z,null)}},
ax:function(a){var z=function(b,c){return function(d,e){while(true)try{b(d,e)
break}catch(y){e=y
d=c}}}(a,1)
$.r.toString
return new P.rO(z)},
dd:function(a,b,c){var z,y,x
if(b===0){if(c.geP())c.c.eI()
else c.a.bu()
return}else if(b===1){if(c.geP())c.c.eJ(H.C(a),H.E(a))
else{z=H.C(a)
y=H.E(a)
c.a.eD(z,y)
c.a.bu()}return}if(a instanceof P.bU){if(c.geP()){b.$2(2,null)
return}z=a.b
if(z===0){z=a.a
J.dr(c.a,z)
P.cD(new P.rr(b,c))
return}else if(z===1){x=a.a
c.a.jw(x,!1).c8(new P.rs(b,c))
return}}P.ep(a,b)},
rN:function(a){return a.ge4()},
eu:function(a,b){if(H.ay(a,{func:1,args:[P.at,P.at]})){b.toString
return a}else{b.toString
return a}},
aB:function(a){return new P.rk(new P.H(0,$.r,null,[a]),[a])},
rC:function(a,b,c){$.r.toString
a.bm(b,c)},
rG:function(){var z,y
for(;z=$.bv,z!=null;){$.bY=null
y=z.gct()
$.bv=y
if(y==null)$.bX=null
z.gjy().$0()}},
xL:[function(){$.er=!0
try{P.rG()}finally{$.bY=null
$.er=!1
if($.bv!=null)$.$get$eg().$1(P.i7())}},"$0","i7",0,0,7],
i1:function(a){var z=new P.hG(a,null)
if($.bv==null){$.bX=z
$.bv=z
if(!$.er)$.$get$eg().$1(P.i7())}else{$.bX.b=z
$.bX=z}},
rM:function(a){var z,y,x
z=$.bv
if(z==null){P.i1(a)
$.bY=$.bX
return}y=new P.hG(a,null)
x=$.bY
if(x==null){y.b=z
$.bY=y
$.bv=y}else{y.b=x.b
x.b=y
$.bY=y
if(y.b==null)$.bX=y}},
cD:function(a){var z=$.r
if(C.i===z){P.bx(null,null,C.i,a)
return}z.toString
P.bx(null,null,z,z.eG(a,!0))},
xB:function(a,b){return new P.rh(null,a,!1,[b])},
ev:function(a){var z,y,x,w
if(a==null)return
try{a.$0()}catch(x){z=H.C(x)
y=H.E(x)
w=$.r
w.toString
P.bw(null,null,w,z,y)}},
rH:[function(a,b){var z=$.r
z.toString
P.bw(null,null,z,a,b)},function(a){return P.rH(a,null)},"$2","$1","rU",2,2,18,0],
xK:[function(){},"$0","rT",0,0,7],
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
rv:function(a,b,c,d){var z=a.cm()
if(!!J.o(z).$isQ&&z!==$.$get$bl())z.c9(new P.rx(b,c,d))
else b.bm(c,d)},
hQ:function(a,b){return new P.rw(a,b)},
hR:function(a,b,c){var z=a.cm()
if(!!J.o(z).$isQ&&z!==$.$get$bl())z.c9(new P.ry(b,c))
else b.bl(c)},
rq:function(a,b,c){$.r.toString
a.cg(b,c)},
pF:function(a,b){var z=$.r
if(z===C.i){z.toString
return P.ec(a,b)}return P.ec(a,z.eG(b,!0))},
ec:function(a,b){var z=C.e.bN(a.a,1000)
return H.pC(z<0?0:z,b)},
pY:function(){return $.r},
bw:function(a,b,c,d,e){var z={}
z.a=d
P.rM(new P.rK(z,e))},
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
bx:function(a,b,c,d){var z=C.i!==c
if(z)d=c.eG(d,!(!z||!1))
P.i1(d)},
qn:{"^":"a:0;a",
$1:function(a){var z,y;--init.globalState.f.b
z=this.a
y=z.a
z.a=null
y.$0()}},
qm:{"^":"a:48;a,b,c",
$1:function(a){var z,y;++init.globalState.f.b
this.a.a=a
z=this.b
y=this.c
z.firstChild?z.removeChild(y):z.appendChild(y)}},
qo:{"^":"a:2;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
qp:{"^":"a:2;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
rt:{"^":"a:0;a",
$1:function(a){return this.a.$2(0,a)}},
ru:{"^":"a:17;a",
$2:function(a,b){this.a.$2(1,new H.dB(a,b))}},
rO:{"^":"a:34;a",
$2:function(a,b){this.a(a,b)}},
rr:{"^":"a:2;a,b",
$0:function(){var z=this.b
if(z.a.gd0()){z.b=!0
return}this.a.$2(null,0)}},
rs:{"^":"a:0;a,b",
$1:function(a){var z=this.b.c!=null?2:0
this.a.$2(z,null)}},
qq:{"^":"d;a,b,c",
ge4:function(){return this.a.ge4()},
gd0:function(){return this.a.gd0()},
geP:function(){return this.c!=null},
t:function(a,b){return J.dr(this.a,b)},
eD:function(a,b){return this.a.eD(a,b)},
bu:function(){return this.a.bu()},
il:function(a){var z=new P.qt(a)
this.a=new P.qy(null,0,null,new P.qv(z),null,new P.qw(this,z),new P.qx(this,a),[null])},
w:{
qr:function(a){var z=new P.qq(null,!1,null)
z.il(a)
return z}}},
qt:{"^":"a:2;a",
$0:function(){P.cD(new P.qu(this.a))}},
qu:{"^":"a:2;a",
$0:function(){this.a.$2(0,null)}},
qv:{"^":"a:2;a",
$0:function(){this.a.$0()}},
qw:{"^":"a:2;a,b",
$0:function(){var z=this.a
if(z.b===!0){z.b=!1
this.b.$0()}}},
qx:{"^":"a:2;a,b",
$0:function(){var z=this.a
if(!z.a.gks()){z.c=new P.ct(new P.H(0,$.r,null,[null]),[null])
if(z.b===!0){z.b=!1
P.cD(new P.qs(this.b))}return z.c.gh8()}}},
qs:{"^":"a:2;a",
$0:function(){this.a.$2(2,null)}},
bU:{"^":"d;af:a<,b",
k:function(a){return"IterationMarker("+this.b+", "+H.b(this.a)+")"},
w:{
bV:function(a){return new P.bU(a,1)},
aS:function(){return C.ag},
hL:function(a){return new P.bU(a,0)},
aT:function(a){return new P.bU(a,3)}}},
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
rl:{"^":"cf;a",
ga_:function(a){return new P.bd(this.a(),null,null,null)},
$ascf:I.bg,
$asB:I.bg,
w:{
aU:function(a){return new P.rl(a)}}},
Q:{"^":"d;$ti"},
hI:{"^":"d;h8:a<,$ti",
eJ:function(a,b){if(a==null)a=new P.cY()
if(this.a.a!==0)throw H.c(new P.w("Future already completed"))
$.r.toString
this.bm(a,b)},
dG:function(a){return this.eJ(a,null)}},
ct:{"^":"hI;a,$ti",
bZ:function(a){var z=this.a
if(z.a!==0)throw H.c(new P.w("Future already completed"))
z.bD(a)},
eI:function(){return this.bZ(null)},
bm:function(a,b){this.a.fl(a,b)}},
rk:{"^":"hI;a,$ti",
bZ:function(a){var z=this.a
if(z.a!==0)throw H.c(new P.w("Future already completed"))
z.bl(a)},
eI:function(){return this.bZ(null)},
bm:function(a,b){this.a.bm(a,b)}},
el:{"^":"d;eo:a<,b,c,d,e,$ti",
gjh:function(){return this.b.b},
gha:function(){return(this.c&1)!==0},
gkb:function(){return(this.c&2)!==0},
gh9:function(){return this.c===8},
k9:function(a){return this.b.b.f0(this.d,a)},
kC:function(a){if(this.c!==6)return!0
return this.b.b.f0(this.d,a.gbv())},
k5:function(a){var z,y
z=this.e
y=this.b.b
if(H.ay(z,{func:1,args:[,,]}))return y.l0(z,a.gbv(),a.gbr())
else return y.f0(z,a.gbv())},
ka:function(){return this.b.b.hz(this.d)}},
H:{"^":"d;cP:a<,b,j5:c<,$ti",
giR:function(){return this.a===2},
gek:function(){return this.a>=4},
f1:function(a,b){var z=$.r
if(z!==C.i){z.toString
if(b!=null)b=P.eu(b,z)}return this.ez(a,b)},
c8:function(a){return this.f1(a,null)},
ez:function(a,b){var z,y
z=new P.H(0,$.r,null,[null])
y=b==null?1:3
this.dq(new P.el(null,z,y,a,b,[H.m(this,0),null]))
return z},
c9:function(a){var z,y
z=$.r
y=new P.H(0,z,null,this.$ti)
if(z!==C.i)z.toString
z=H.m(this,0)
this.dq(new P.el(null,y,8,a,null,[z,z]))
return y},
dq:function(a){var z,y
z=this.a
if(z<=1){a.a=this.c
this.c=a}else{if(z===2){y=this.c
if(!y.gek()){y.dq(a)
return}this.a=y.a
this.c=y.c}z=this.b
z.toString
P.bx(null,null,z,new P.qI(this,a))}},
fJ:function(a){var z,y,x,w,v
z={}
z.a=a
if(a==null)return
y=this.a
if(y<=1){x=this.c
this.c=a
if(x!=null){for(w=a;w.geo()!=null;)w=w.a
w.a=x}}else{if(y===2){v=this.c
if(!v.gek()){v.fJ(a)
return}this.a=v.a
this.c=v.c}z.a=this.dz(a)
y=this.b
y.toString
P.bx(null,null,y,new P.qP(z,this))}},
dw:function(){var z=this.c
this.c=null
return this.dz(z)},
dz:function(a){var z,y,x
for(z=a,y=null;z!=null;y=z,z=x){x=z.geo()
z.a=y}return y},
bl:function(a){var z,y
z=this.$ti
if(H.aV(a,"$isQ",z,"$asQ"))if(H.aV(a,"$isH",z,null))P.da(a,this)
else P.hK(a,this)
else{y=this.dw()
this.a=4
this.c=a
P.bt(this,y)}},
bm:[function(a,b){var z=this.dw()
this.a=8
this.c=new P.cJ(a,b)
P.bt(this,z)},function(a){return this.bm(a,null)},"li","$2","$1","gbV",2,2,18,0],
bD:function(a){var z
if(H.aV(a,"$isQ",this.$ti,"$asQ")){this.iw(a)
return}this.a=1
z=this.b
z.toString
P.bx(null,null,z,new P.qK(this,a))},
iw:function(a){var z
if(H.aV(a,"$isH",this.$ti,null)){if(a.a===8){this.a=1
z=this.b
z.toString
P.bx(null,null,z,new P.qO(this,a))}else P.da(a,this)
return}P.hK(a,this)},
fl:function(a,b){var z
this.a=1
z=this.b
z.toString
P.bx(null,null,z,new P.qJ(this,a,b))},
io:function(a,b){this.a=4
this.c=a},
$isQ:1,
w:{
hK:function(a,b){var z,y,x
b.a=1
try{a.f1(new P.qL(b),new P.qM(b))}catch(x){z=H.C(x)
y=H.E(x)
P.cD(new P.qN(b,z,y))}},
da:function(a,b){var z,y,x
for(;a.giR();)a=a.c
z=a.gek()
y=b.c
if(z){b.c=null
x=b.dz(y)
b.a=a.a
b.c=a.c
P.bt(b,x)}else{b.a=2
b.c=a
a.fJ(y)}},
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
P.bw(null,null,y,u,t)}return}for(;b.geo()!=null;b=s){s=b.a
b.a=null
P.bt(z.a,b)}r=z.a.c
x.a=w
x.b=r
y=!w
if(!y||b.gha()||b.gh9()){q=b.gjh()
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
if(b.gh9())new P.qS(z,x,w,b).$0()
else if(y){if(b.gha())new P.qR(x,b,r).$0()}else if(b.gkb())new P.qQ(z,x,b).$0()
if(p!=null)$.r=p
y=x.b
if(!!J.o(y).$isQ){o=b.b
if(y.a>=4){n=o.c
o.c=null
b=o.dz(n)
o.a=y.a
o.c=y.c
z.a=y
continue}else P.da(y,o)
return}}o=b.b
b=o.dw()
y=x.a
u=x.b
if(!y){o.a=4
o.c=u}else{o.a=8
o.c=u}z.a=o
y=o}}}},
qI:{"^":"a:2;a,b",
$0:function(){P.bt(this.a,this.b)}},
qP:{"^":"a:2;a,b",
$0:function(){P.bt(this.b,this.a.a)}},
qL:{"^":"a:0;a",
$1:function(a){var z=this.a
z.a=0
z.bl(a)}},
qM:{"^":"a:31;a",
$2:function(a,b){this.a.bm(a,b)},
$1:function(a){return this.$2(a,null)}},
qN:{"^":"a:2;a,b,c",
$0:function(){this.a.bm(this.b,this.c)}},
qK:{"^":"a:2;a,b",
$0:function(){var z,y
z=this.a
y=z.dw()
z.a=4
z.c=this.b
P.bt(z,y)}},
qO:{"^":"a:2;a,b",
$0:function(){P.da(this.b,this.a)}},
qJ:{"^":"a:2;a,b,c",
$0:function(){this.a.bm(this.b,this.c)}},
qS:{"^":"a:7;a,b,c,d",
$0:function(){var z,y,x,w,v,u,t
z=null
try{z=this.d.ka()}catch(w){y=H.C(w)
x=H.E(w)
if(this.c){v=this.a.a.c.gbv()
u=y
u=v==null?u==null:v===u
v=u}else v=!1
u=this.b
if(v)u.b=this.a.a.c
else u.b=new P.cJ(y,x)
u.a=!0
return}if(!!J.o(z).$isQ){if(z instanceof P.H&&z.gcP()>=4){if(z.gcP()===8){v=this.b
v.b=z.gj5()
v.a=!0}return}t=this.a.a
v=this.b
v.b=z.c8(new P.qT(t))
v.a=!1}}},
qT:{"^":"a:0;a",
$1:function(a){return this.a}},
qR:{"^":"a:7;a,b,c",
$0:function(){var z,y,x,w
try{this.a.b=this.b.k9(this.c)}catch(x){z=H.C(x)
y=H.E(x)
w=this.a
w.b=new P.cJ(z,y)
w.a=!0}}},
qQ:{"^":"a:7;a,b,c",
$0:function(){var z,y,x,w,v,u,t,s
try{z=this.a.a.c
w=this.c
if(w.kC(z)===!0&&w.e!=null){v=this.b
v.b=w.k5(z)
v.a=!1}}catch(u){y=H.C(u)
x=H.E(u)
w=this.a
v=w.a.c.gbv()
t=y
s=this.b
if(v==null?t==null:v===t)s.b=w.a.c
else s.b=new P.cJ(y,x)
s.a=!0}}},
hG:{"^":"d;jy:a<,ct:b@"},
al:{"^":"d;$ti",
aK:function(a,b){return new P.r6(b,this,[H.y(this,"al",0),null])},
a4:function(a,b){var z,y
z={}
y=new P.H(0,$.r,null,[P.X])
z.a=null
z.a=this.aJ(new P.p_(z,this,b,y),!0,new P.p0(y),y.gbV())
return y},
Z:function(a,b){var z,y
z={}
y=new P.H(0,$.r,null,[null])
z.a=null
z.a=this.aJ(new P.p3(z,this,b,y),!0,new P.p4(y),y.gbV())
return y},
gl:function(a){var z,y
z={}
y=new P.H(0,$.r,null,[P.u])
z.a=0
this.aJ(new P.p9(z),!0,new P.pa(z,y),y.gbV())
return y},
gY:function(a){var z,y
z={}
y=new P.H(0,$.r,null,[P.X])
z.a=null
z.a=this.aJ(new P.p5(z,y),!0,new P.p6(y),y.gbV())
return y},
cB:function(a){var z,y,x
z=H.y(this,"al",0)
y=H.q([],[z])
x=new P.H(0,$.r,null,[[P.N,z]])
this.aJ(new P.pb(this,y),!0,new P.pc(y,x),x.gbV())
return x},
bH:function(a){var z,y,x
z=H.y(this,"al",0)
y=P.a6(null,null,null,z)
x=new P.H(0,$.r,null,[[P.bP,z]])
this.aJ(new P.pd(this,y),!0,new P.pe(y,x),x.gbV())
return x},
gA:function(a){var z,y
z={}
y=new P.H(0,$.r,null,[H.y(this,"al",0)])
z.a=null
z.b=!1
this.aJ(new P.p7(z,this),!0,new P.p8(z,y),y.gbV())
return y}},
p_:{"^":"a;a,b,c,d",
$1:function(a){var z,y
z=this.a
y=this.d
P.i0(new P.oY(this.c,a),new P.oZ(z,y),P.hQ(z.a,y))},
$S:function(){return H.be(function(a){return{func:1,args:[a]}},this.b,"al")}},
oY:{"^":"a:2;a,b",
$0:function(){return J.e(this.b,this.a)}},
oZ:{"^":"a:32;a,b",
$1:function(a){if(a===!0)P.hR(this.a.a,this.b,!0)}},
p0:{"^":"a:2;a",
$0:function(){this.a.bl(!1)}},
p3:{"^":"a;a,b,c,d",
$1:function(a){P.i0(new P.p1(this.c,a),new P.p2(),P.hQ(this.a.a,this.d))},
$S:function(){return H.be(function(a){return{func:1,args:[a]}},this.b,"al")}},
p1:{"^":"a:2;a,b",
$0:function(){return this.a.$1(this.b)}},
p2:{"^":"a:0;",
$1:function(a){}},
p4:{"^":"a:2;a",
$0:function(){this.a.bl(null)}},
p9:{"^":"a:0;a",
$1:function(a){++this.a.a}},
pa:{"^":"a:2;a,b",
$0:function(){this.b.bl(this.a.a)}},
p5:{"^":"a:0;a,b",
$1:function(a){P.hR(this.a.a,this.b,!1)}},
p6:{"^":"a:2;a",
$0:function(){this.a.bl(!0)}},
pb:{"^":"a;a,b",
$1:function(a){this.b.push(a)},
$S:function(){return H.be(function(a){return{func:1,args:[a]}},this.a,"al")}},
pc:{"^":"a:2;a,b",
$0:function(){this.b.bl(this.a)}},
pd:{"^":"a;a,b",
$1:function(a){this.b.t(0,a)},
$S:function(){return H.be(function(a){return{func:1,args:[a]}},this.a,"al")}},
pe:{"^":"a:2;a,b",
$0:function(){this.b.bl(this.a)}},
p7:{"^":"a;a,b",
$1:function(a){var z=this.a
z.b=!0
z.a=a},
$S:function(){return H.be(function(a){return{func:1,args:[a]}},this.b,"al")}},
p8:{"^":"a:2;a,b",
$0:function(){var z,y,x,w
x=this.a
if(x.b){this.b.bl(x.a)
return}try{x=H.ah()
throw H.c(x)}catch(w){z=H.C(w)
y=H.E(w)
P.rC(this.b,z,y)}}},
dc:{"^":"d;cP:b<,$ti",
ge4:function(){return new P.d8(this,this.$ti)},
gks:function(){return(this.b&4)!==0},
gd0:function(){var z=this.b
return(z&1)!==0?this.gbM().gfE():(z&2)===0},
giZ:function(){if((this.b&8)===0)return this.a
return this.a.gdc()},
ed:function(){var z,y
if((this.b&8)===0){z=this.a
if(z==null){z=new P.en(null,null,0,this.$ti)
this.a=z}return z}y=this.a
if(y.gdc()==null)y.c=new P.en(null,null,0,this.$ti)
return y.c},
gbM:function(){if((this.b&8)!==0)return this.a.gdc()
return this.a},
cF:function(){if((this.b&4)!==0)return new P.w("Cannot add event after closing")
return new P.w("Cannot add event while adding a stream")},
jw:function(a,b){var z,y,x,w
z=this.b
if(z>=4)throw H.c(this.cF())
if((z&2)!==0){z=new P.H(0,$.r,null,[null])
z.bD(null)
return z}z=this.a
y=new P.H(0,$.r,null,[null])
x=a.aJ(this.giu(),!1,this.giv(),this.gir())
w=this.b
if((w&1)!==0?this.gbM().gfE():(w&2)===0)x.d4()
this.a=new P.rd(z,y,x,this.$ti)
this.b|=8
return y},
ft:function(){var z=this.c
if(z==null){z=(this.b&2)!==0?$.$get$bl():new P.H(0,$.r,null,[null])
this.c=z}return z},
t:[function(a,b){if(this.b>=4)throw H.c(this.cF())
this.bU(b)},"$1","gjj",2,0,function(){return H.be(function(a){return{func:1,v:true,args:[a]}},this.$receiver,"dc")}],
eD:function(a,b){if(this.b>=4)throw H.c(this.cF())
if(a==null)a=new P.cY()
$.r.toString
this.cg(a,b)},
bu:function(){var z=this.b
if((z&4)!==0)return this.ft()
if(z>=4)throw H.c(this.cF())
z|=4
this.b=z
if((z&1)!==0)this.cN()
else if((z&3)===0)this.ed().t(0,C.v)
return this.ft()},
bU:[function(a){var z=this.b
if((z&1)!==0)this.cM(a)
else if((z&3)===0)this.ed().t(0,new P.eh(a,null,this.$ti))},"$1","giu",2,0,function(){return H.be(function(a){return{func:1,v:true,args:[a]}},this.$receiver,"dc")}],
cg:[function(a,b){var z=this.b
if((z&1)!==0)this.cO(a,b)
else if((z&3)===0)this.ed().t(0,new P.ei(a,b,null))},"$2","gir",4,0,49],
e7:[function(){var z=this.a
this.a=z.gdc()
this.b&=4294967287
z.a.bD(null)},"$0","giv",0,0,7],
jc:function(a,b,c,d){var z,y,x,w,v
if((this.b&3)!==0)throw H.c(new P.w("Stream has already been listened to."))
z=$.r
y=d?1:0
x=new P.qC(this,null,null,null,z,y,null,null,this.$ti)
x.fi(a,b,c,d,H.m(this,0))
w=this.giZ()
y=this.b|=1
if((y&8)!==0){v=this.a
v.sdc(x)
v.b.d7()}else this.a=x
x.ja(w)
x.ei(new P.rf(this))
return x},
j2:function(a){var z,y,x,w,v,u
z=null
if((this.b&8)!==0)z=this.a.cm()
this.a=null
this.b=this.b&4294967286|2
w=this.r
if(w!=null)if(z==null)try{z=w.$0()}catch(v){y=H.C(v)
x=H.E(v)
u=new P.H(0,$.r,null,[null])
u.fl(y,x)
z=u}else z=z.c9(w)
w=new P.re(this)
if(z!=null)z=z.c9(w)
else w.$0()
return z}},
rf:{"^":"a:2;a",
$0:function(){P.ev(this.a.d)}},
re:{"^":"a:7;a",
$0:function(){var z=this.a.c
if(z!=null&&z.a===0)z.bD(null)}},
rn:{"^":"d;$ti",
cM:function(a){this.gbM().bU(a)},
cO:function(a,b){this.gbM().cg(a,b)},
cN:function(){this.gbM().e7()}},
qz:{"^":"d;$ti",
cM:function(a){this.gbM().ci(new P.eh(a,null,[H.m(this,0)]))},
cO:function(a,b){this.gbM().ci(new P.ei(a,b,null))},
cN:function(){this.gbM().ci(C.v)}},
qy:{"^":"dc+qz;a,b,c,d,e,f,r,$ti"},
rm:{"^":"dc+rn;a,b,c,d,e,f,r,$ti"},
d8:{"^":"rg;a,$ti",
gD:function(a){return(H.aE(this.a)^892482866)>>>0},
B:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof P.d8))return!1
return b.a===this.a}},
qC:{"^":"cu;x,a,b,c,d,e,f,r,$ti",
ep:function(){return this.x.j2(this)},
er:[function(){var z=this.x
if((z.b&8)!==0)z.a.d4()
P.ev(z.e)},"$0","geq",0,0,7],
eu:[function(){var z=this.x
if((z.b&8)!==0)z.a.d7()
P.ev(z.f)},"$0","ges",0,0,7]},
qi:{"^":"d;$ti",
d4:function(){this.b.d4()},
d7:function(){this.b.d7()},
cm:function(){var z=this.b.cm()
if(z==null){this.a.bD(null)
return}return z.c9(new P.qj(this))},
eI:function(){this.a.bD(null)}},
qj:{"^":"a:2;a",
$0:function(){this.a.a.bD(null)}},
rd:{"^":"qi;dc:c@,a,b,$ti"},
cu:{"^":"d;cP:e<,$ti",
ja:function(a){if(a==null)return
this.r=a
if(!a.gY(a)){this.e=(this.e|64)>>>0
this.r.dh(this)}},
kJ:function(a){var z=this.e
if((z&8)!==0)return
this.e=(z+128|4)>>>0
if(z<128&&this.r!=null)this.r.fW()
if((z&4)===0&&(this.e&32)===0)this.ei(this.geq())},
d4:function(){return this.kJ(null)},
d7:function(){var z=this.e
if((z&8)!==0)return
if(z>=128){z-=128
this.e=z
if(z<128){if((z&64)!==0){z=this.r
z=!z.gY(z)}else z=!1
if(z)this.r.dh(this)
else{z=(this.e&4294967291)>>>0
this.e=z
if((z&32)===0)this.ei(this.ges())}}}},
cm:function(){var z=(this.e&4294967279)>>>0
this.e=z
if((z&8)===0)this.e8()
z=this.f
return z==null?$.$get$bl():z},
gfE:function(){return(this.e&4)!==0},
gd0:function(){return this.e>=128},
e8:function(){var z=(this.e|8)>>>0
this.e=z
if((z&64)!==0)this.r.fW()
if((this.e&32)===0)this.r=null
this.f=this.ep()},
bU:["i7",function(a){var z=this.e
if((z&8)!==0)return
if(z<32)this.cM(a)
else this.ci(new P.eh(a,null,[H.y(this,"cu",0)]))}],
cg:["i8",function(a,b){var z=this.e
if((z&8)!==0)return
if(z<32)this.cO(a,b)
else this.ci(new P.ei(a,b,null))}],
e7:function(){var z=this.e
if((z&8)!==0)return
z=(z|2)>>>0
this.e=z
if(z<32)this.cN()
else this.ci(C.v)},
er:[function(){},"$0","geq",0,0,7],
eu:[function(){},"$0","ges",0,0,7],
ep:function(){return},
ci:function(a){var z,y
z=this.r
if(z==null){z=new P.en(null,null,0,[H.y(this,"cu",0)])
this.r=z}z.t(0,a)
y=this.e
if((y&64)===0){y=(y|64)>>>0
this.e=y
if(y<128)this.r.dh(this)}},
cM:function(a){var z=this.e
this.e=(z|32)>>>0
this.d.hC(this.a,a)
this.e=(this.e&4294967263)>>>0
this.ea((z&4)!==0)},
cO:function(a,b){var z,y
z=this.e
y=new P.qB(this,a,b)
if((z&1)!==0){this.e=(z|16)>>>0
this.e8()
z=this.f
if(!!J.o(z).$isQ&&z!==$.$get$bl())z.c9(y)
else y.$0()}else{y.$0()
this.ea((z&4)!==0)}},
cN:function(){var z,y
z=new P.qA(this)
this.e8()
this.e=(this.e|16)>>>0
y=this.f
if(!!J.o(y).$isQ&&y!==$.$get$bl())y.c9(z)
else z.$0()},
ei:function(a){var z=this.e
this.e=(z|32)>>>0
a.$0()
this.e=(this.e&4294967263)>>>0
this.ea((z&4)!==0)},
ea:function(a){var z,y
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
if(y)this.er()
else this.eu()
this.e=(this.e&4294967263)>>>0}z=this.e
if((z&64)!==0&&z<128)this.r.dh(this)},
fi:function(a,b,c,d,e){var z=this.d
z.toString
this.a=a
this.b=P.eu(b==null?P.rU():b,z)
this.c=c==null?P.rT():c}},
qB:{"^":"a:7;a,b,c",
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
if(x)w.l1(u,v,this.c)
else w.hC(u,v)
z.e=(z.e&4294967263)>>>0}},
qA:{"^":"a:7;a",
$0:function(){var z,y
z=this.a
y=z.e
if((y&16)===0)return
z.e=(y|42)>>>0
z.d.hA(z.c)
z.e=(z.e&4294967263)>>>0}},
rg:{"^":"al;$ti",
aJ:function(a,b,c,d){return this.a.jc(a,d,c,!0===b)},
eV:function(a,b,c){return this.aJ(a,null,b,c)}},
ej:{"^":"d;ct:a@,$ti"},
eh:{"^":"ej;af:b<,a,$ti",
eW:function(a){a.cM(this.b)}},
ei:{"^":"ej;bv:b<,br:c<,a",
eW:function(a){a.cO(this.b,this.c)},
$asej:I.bg},
qD:{"^":"d;",
eW:function(a){a.cN()},
gct:function(){return},
sct:function(a){throw H.c(new P.w("No events after a done."))}},
r8:{"^":"d;cP:a<,$ti",
dh:function(a){var z=this.a
if(z===1)return
if(z>=1){this.a=1
return}P.cD(new P.r9(this,a))
this.a=1},
fW:function(){if(this.a===1)this.a=3}},
r9:{"^":"a:2;a,b",
$0:function(){var z,y,x,w
z=this.a
y=z.a
z.a=0
if(y===3)return
x=z.b
w=x.gct()
z.b=w
if(w==null)z.c=null
x.eW(this.b)}},
en:{"^":"r8;b,c,a,$ti",
gY:function(a){return this.c==null},
t:function(a,b){var z=this.c
if(z==null){this.c=b
this.b=b}else{z.sct(b)
this.c=b}}},
rh:{"^":"d;a,b,c,$ti"},
rx:{"^":"a:2;a,b,c",
$0:function(){return this.a.bm(this.b,this.c)}},
rw:{"^":"a:17;a,b",
$2:function(a,b){P.rv(this.a,this.b,a,b)}},
ry:{"^":"a:2;a,b",
$0:function(){return this.a.bl(this.b)}},
ek:{"^":"al;$ti",
aJ:function(a,b,c,d){return this.iD(a,d,c,!0===b)},
eV:function(a,b,c){return this.aJ(a,null,b,c)},
iD:function(a,b,c,d){return P.qH(this,a,b,c,d,H.y(this,"ek",0),H.y(this,"ek",1))},
fB:function(a,b){b.bU(a)},
iP:function(a,b,c){c.cg(a,b)},
$asal:function(a,b){return[b]}},
hJ:{"^":"cu;x,y,a,b,c,d,e,f,r,$ti",
bU:function(a){if((this.e&2)!==0)return
this.i7(a)},
cg:function(a,b){if((this.e&2)!==0)return
this.i8(a,b)},
er:[function(){var z=this.y
if(z==null)return
z.d4()},"$0","geq",0,0,7],
eu:[function(){var z=this.y
if(z==null)return
z.d7()},"$0","ges",0,0,7],
ep:function(){var z=this.y
if(z!=null){this.y=null
return z.cm()}return},
lk:[function(a){this.x.fB(a,this)},"$1","giM",2,0,function(){return H.be(function(a,b){return{func:1,v:true,args:[a]}},this.$receiver,"hJ")}],
lm:[function(a,b){this.x.iP(a,b,this)},"$2","giO",4,0,41],
ll:[function(){this.e7()},"$0","giN",0,0,7],
im:function(a,b,c,d,e,f,g){this.y=this.x.a.eV(this.giM(),this.giN(),this.giO())},
$ascu:function(a,b){return[b]},
w:{
qH:function(a,b,c,d,e,f,g){var z,y
z=$.r
y=e?1:0
y=new P.hJ(a,null,null,null,null,z,y,null,null,[f,g])
y.fi(b,c,d,e,g)
y.im(a,b,c,d,e,f,g)
return y}}},
r6:{"^":"ek;b,a,$ti",
fB:function(a,b){var z,y,x,w
z=null
try{z=this.b.$1(a)}catch(w){y=H.C(w)
x=H.E(w)
P.rq(b,y,x)
return}b.bU(z)}},
cJ:{"^":"d;bv:a<,br:b<",
k:function(a){return H.b(this.a)},
$isa5:1},
rp:{"^":"d;"},
rK:{"^":"a:2;a,b",
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
ra:{"^":"rp;",
hA:function(a){var z,y,x,w
try{if(C.i===$.r){x=a.$0()
return x}x=P.hY(null,null,this,a)
return x}catch(w){z=H.C(w)
y=H.E(w)
x=P.bw(null,null,this,z,y)
return x}},
hC:function(a,b){var z,y,x,w
try{if(C.i===$.r){x=a.$1(b)
return x}x=P.i_(null,null,this,a,b)
return x}catch(w){z=H.C(w)
y=H.E(w)
x=P.bw(null,null,this,z,y)
return x}},
l1:function(a,b,c){var z,y,x,w
try{if(C.i===$.r){x=a.$2(b,c)
return x}x=P.hZ(null,null,this,a,b,c)
return x}catch(w){z=H.C(w)
y=H.E(w)
x=P.bw(null,null,this,z,y)
return x}},
eG:function(a,b){if(b)return new P.rb(this,a)
else return new P.rc(this,a)},
j:function(a,b){return},
hz:function(a){if($.r===C.i)return a.$0()
return P.hY(null,null,this,a)},
f0:function(a,b){if($.r===C.i)return a.$1(b)
return P.i_(null,null,this,a,b)},
l0:function(a,b,c){if($.r===C.i)return a.$2(b,c)
return P.hZ(null,null,this,a,b,c)}},
rb:{"^":"a:2;a,b",
$0:function(){return this.a.hA(this.b)}},
rc:{"^":"a:2;a,b",
$0:function(){return this.a.hz(this.b)}}}],["","",,P,{"^":"",
dN:function(a,b){return new H.R(0,null,null,null,null,null,0,[a,b])},
b_:function(){return new H.R(0,null,null,null,null,null,0,[null,null])},
a1:function(a){return H.uo(a,new H.R(0,null,null,null,null,null,0,[null,null]))},
m7:function(a,b,c){var z,y
if(P.es(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}z=[]
y=$.$get$bZ()
y.push(a)
try{P.rF(a,z)}finally{if(0>=y.length)return H.f(y,-1)
y.pop()}y=P.hd(b,z,", ")+c
return y.charCodeAt(0)==0?y:y},
cg:function(a,b,c){var z,y,x
if(P.es(a))return b+"..."+c
z=new P.bS(b)
y=$.$get$bZ()
y.push(a)
try{x=z
x.E=P.hd(x.gE(),a,", ")}finally{if(0>=y.length)return H.f(y,-1)
y.pop()}y=z
y.E=y.gE()+c
y=z.gE()
return y.charCodeAt(0)==0?y:y},
es:function(a){var z,y
for(z=0;y=$.$get$bZ(),z<y.length;++z)if(a===y[z])return!0
return!1},
rF:function(a,b){var z,y,x,w,v,u,t,s,r,q
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
mt:function(a,b,c,d,e){return new H.R(0,null,null,null,null,null,0,[d,e])},
ck:function(a,b,c){var z=P.mt(null,null,null,b,c)
a.Z(0,new P.rW(z))
return z},
a6:function(a,b,c,d){return new P.hM(0,null,null,null,null,null,0,[d])},
b9:function(a,b){var z,y
z=P.a6(null,null,null,b)
for(y=J.aj(a);y.u();)z.t(0,y.gU())
return z},
dS:function(a){var z,y,x
z={}
if(P.es(a))return"{...}"
y=new P.bS("")
try{$.$get$bZ().push(a)
x=y
x.E=x.gE()+"{"
z.a=!0
a.Z(0,new P.mE(z,y))
z=y
z.E=z.gE()+"}"}finally{z=$.$get$bZ()
if(0>=z.length)return H.f(z,-1)
z.pop()}z=y.gE()
return z.charCodeAt(0)==0?z:z},
hN:{"^":"R;a,b,c,d,e,f,r,$ti",
cZ:function(a){return H.vb(a)&0x3ffffff},
d_:function(a,b){var z,y,x
if(a==null)return-1
z=a.length
for(y=0;y<z;++y){x=a[y].ghc()
if(x==null?b==null:x===b)return y}return-1},
w:{
bW:function(a,b){return new P.hN(0,null,null,null,null,null,0,[a,b])}}},
hM:{"^":"qU;a,b,c,d,e,f,r,$ti",
en:function(){return new P.hM(0,null,null,null,null,null,0,this.$ti)},
ga_:function(a){var z=new P.a9(this,this.r,null,null,[null])
z.c=this.e
return z},
gl:function(a){return this.a},
gY:function(a){return this.a===0},
gav:function(a){return this.a!==0},
a4:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null)return!1
return z[b]!=null}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null)return!1
return y[b]!=null}else return this.iB(b)},
iB:function(a){var z=this.d
if(z==null)return!1
return this.dt(z[this.ds(a)],a)>=0},
cs:function(a){var z
if(!(typeof a==="string"&&a!=="__proto__"))z=typeof a==="number"&&(a&0x3ffffff)===a
else z=!0
if(z)return this.a4(0,a)?a:null
else return this.iT(a)},
iT:function(a){var z,y,x
z=this.d
if(z==null)return
y=z[this.ds(a)]
x=this.dt(y,a)
if(x<0)return
return J.aA(y,x).gfs()},
Z:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$1(z.a)
if(y!==this.r)throw H.c(new P.D(this))
z=z.b}},
gA:function(a){var z=this.f
if(z==null)throw H.c(new P.w("No elements"))
return z.a},
t:function(a,b){var z,y,x
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.b=y
z=y}return this.fm(z,b)}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.c=y
x=y}return this.fm(x,b)}else return this.aF(b)},
aF:function(a){var z,y,x
z=this.d
if(z==null){z=P.r2()
this.d=z}y=this.ds(a)
x=z[y]
if(x==null)z[y]=[this.eb(a)]
else{if(this.dt(x,a)>=0)return!1
x.push(this.eb(a))}return!0},
a3:function(a,b){if(typeof b==="string"&&b!=="__proto__")return this.fn(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.fn(this.c,b)
else return this.j3(b)},
j3:function(a){var z,y,x
z=this.d
if(z==null)return!1
y=z[this.ds(a)]
x=this.dt(y,a)
if(x<0)return!1
this.fo(y.splice(x,1)[0])
return!0},
iJ:function(a,b){var z,y,x,w,v
z=this.e
for(;z!=null;z=x){y=z.a
x=z.b
w=this.r
v=a.$1(y)
if(w!==this.r)throw H.c(new P.D(this))
if(b===v)this.a3(0,y)}},
bi:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
fm:function(a,b){if(a[b]!=null)return!1
a[b]=this.eb(b)
return!0},
fn:function(a,b){var z
if(a==null)return!1
z=a[b]
if(z==null)return!1
this.fo(z)
delete a[b]
return!0},
eb:function(a){var z,y
z=new P.r1(a,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.c=y
y.b=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
fo:function(a){var z,y
z=a.giA()
y=a.b
if(z==null)this.e=y
else z.b=y
if(y==null)this.f=z
else y.c=z;--this.a
this.r=this.r+1&67108863},
ds:function(a){return J.j(a)&0x3ffffff},
dt:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.e(a[y].gfs(),b))return y
return-1},
$isbP:1,
$isa0:1,
w:{
r2:function(){var z=Object.create(null)
z["<non-identifier-key>"]=z
delete z["<non-identifier-key>"]
return z}}},
r1:{"^":"d;fs:a<,b,iA:c<"},
a9:{"^":"d;a,b,c,d,$ti",
gU:function(){return this.d},
u:function(){var z=this.a
if(this.b!==z.r)throw H.c(new P.D(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.b
return!0}}}},
qU:{"^":"om;$ti",
bH:function(a){var z=this.en()
z.ax(0,this)
return z}},
cf:{"^":"B;$ti"},
rW:{"^":"a:6;a",
$2:function(a,b){this.a.p(0,a,b)}},
ft:{"^":"fC;$ti"},
fC:{"^":"d+ba;$ti",$asN:null,$asa0:null,$isN:1,$isa0:1},
ba:{"^":"d;$ti",
ga_:function(a){return new H.dO(this,this.gl(this),0,null,[H.y(this,"ba",0)])},
au:function(a,b){return this.j(0,b)},
Z:function(a,b){var z,y
z=this.gl(this)
for(y=0;y<z;++y){b.$1(this.j(0,y))
if(z!==this.gl(this))throw H.c(new P.D(this))}},
gY:function(a){return this.gl(this)===0},
gav:function(a){return!this.gY(this)},
gA:function(a){if(this.gl(this)===0)throw H.c(H.ah())
return this.j(0,this.gl(this)-1)},
a4:function(a,b){var z,y
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
aK:function(a,b){return new H.aq(this,b,[H.y(this,"ba",0),null])},
e3:function(a,b){return H.hf(this,b,null,H.y(this,"ba",0))},
bH:function(a){var z,y
z=P.a6(null,null,null,H.y(this,"ba",0))
for(y=0;y<this.gl(this);++y)z.t(0,this.j(0,y))
return z},
t:function(a,b){var z=this.gl(this)
this.sl(0,z+1)
this.p(0,z,b)},
a3:function(a,b){var z
for(z=0;z<this.gl(this);++z)if(J.e(this.j(0,z),b)){this.b8(0,z,this.gl(this)-1,this,z+1)
this.sl(0,this.gl(this)-1)
return!0}return!1},
iI:function(a,b){var z,y,x,w
z=H.q([],[H.y(this,"ba",0)])
y=this.gl(this)
for(x=0;x<y;++x){w=this.j(0,x)
if(J.e(a.$1(w),b))z.push(w)
if(y!==this.gl(this))throw H.c(new P.D(this))}if(z.length!==this.gl(this)){this.hZ(0,0,z.length,z)
this.sl(0,z.length)}},
b8:function(a,b,c,d,e){var z,y,x,w,v
P.cn(b,c,this.gl(this),null,null,null)
z=c-b
if(z===0)return
if(H.aV(d,"$isN",[H.y(this,"ba",0)],"$asN")){y=e
x=d}else{x=J.j1(d,e).bG(0,!1)
y=0}w=J.L(x)
if(y+z>w.gl(x))throw H.c(H.fh())
if(y<b)for(v=z-1;v>=0;--v)this.p(0,b+v,w.j(x,y+v))
else for(v=0;v<z;++v)this.p(0,b+v,w.j(x,y+v))},
hZ:function(a,b,c,d){return this.b8(a,b,c,d,0)},
bR:function(a,b,c){var z
if(c>=this.gl(this))return-1
for(z=c;z<this.gl(this);++z)if(J.e(this.j(0,z),b))return z
return-1},
b3:function(a,b){return this.bR(a,b,0)},
k:function(a){return P.cg(this,"[","]")},
$isN:1,
$isa0:1},
ro:{"^":"d;$ti",
p:function(a,b,c){throw H.c(new P.T("Cannot modify unmodifiable map"))},
$isI:1},
mC:{"^":"d;$ti",
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
hB:{"^":"mC+ro;a,$ti",$asI:null,$isI:1},
mE:{"^":"a:6;a,b",
$2:function(a,b){var z,y
z=this.a
if(!z.a)this.b.E+=", "
z.a=!1
z=this.b
y=z.E+=H.b(a)
z.E=y+": "
z.E+=H.b(b)}},
mu:{"^":"b0;a,b,c,d,$ti",
ga_:function(a){return new P.db(this,this.c,this.d,this.b,null,this.$ti)},
Z:function(a,b){var z,y,x
z=this.d
for(y=this.b;y!==this.c;y=(y+1&this.a.length-1)>>>0){x=this.a
if(y<0||y>=x.length)return H.f(x,y)
b.$1(x[y])
if(z!==this.d)H.i(new P.D(this))}},
gY:function(a){return this.b===this.c},
gl:function(a){return(this.c-this.b&this.a.length-1)>>>0},
gcY:function(a){var z,y
z=this.b
if(z===this.c)throw H.c(H.ah())
y=this.a
if(z>=y.length)return H.f(y,z)
return y[z]},
gA:function(a){var z,y,x
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
if(0>b||b>=z)H.i(P.cU(b,this,"index",null,z))
y=this.a
x=y.length
w=(this.b+b&x-1)>>>0
if(w<0||w>=x)return H.f(y,w)
return y[w]},
t:function(a,b){this.aF(b)},
ax:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=this.$ti
if(H.aV(b,"$isN",z,"$asN")){y=b.gl(b)
x=this.gl(this)
w=x+y
v=this.a
u=v.length
if(w>=u){t=P.mv(w+(w>>>1))
if(typeof t!=="number")return H.x(t)
v=new Array(t)
v.fixed$length=Array
s=H.q(v,z)
this.c=this.jg(s)
this.a=s
this.b=0
C.a.b8(s,x,w,b,0)
this.c+=y}else{z=this.c
r=u-z
if(y<r){C.a.b8(v,z,z+y,b,0)
this.c+=y}else{q=y-r
C.a.b8(v,z,z+r,b,0)
C.a.b8(this.a,0,q,b,r)
this.c=q}}++this.d}else for(z=new P.db(b,b.c,b.d,b.b,null,[H.m(b,0)]);z.u();)this.aF(z.e)},
bi:function(a){var z,y,x,w,v
z=this.b
y=this.c
if(z!==y){for(x=this.a,w=x.length,v=w-1;z!==y;z=(z+1&v)>>>0){if(z<0||z>=w)return H.f(x,z)
x[z]=null}this.c=0
this.b=0;++this.d}},
k:function(a){return P.cg(this,"{","}")},
fT:function(a){var z,y,x
z=this.b
y=this.a
x=y.length
z=(z-1&x-1)>>>0
this.b=z
if(z<0||z>=x)return H.f(y,z)
y[z]=a
if(z===this.c)this.fA();++this.d},
dN:function(){var z,y,x,w
z=this.b
if(z===this.c)throw H.c(H.ah());++this.d
y=this.a
x=y.length
if(z>=x)return H.f(y,z)
w=y[z]
y[z]=null
this.b=(z+1&x-1)>>>0
return w},
aF:function(a){var z,y,x
z=this.a
y=this.c
x=z.length
if(y<0||y>=x)return H.f(z,y)
z[y]=a
x=(y+1&x-1)>>>0
this.c=x
if(this.b===x)this.fA();++this.d},
fA:function(){var z,y,x,w
z=new Array(this.a.length*2)
z.fixed$length=Array
y=H.q(z,this.$ti)
z=this.a
x=this.b
w=z.length-x
C.a.b8(y,0,w,z,x)
C.a.b8(y,w,w+this.b,this.a,0)
this.b=0
this.c=this.a.length
this.a=y},
jg:function(a){var z,y,x,w,v
z=this.b
y=this.c
x=this.a
if(z<=y){w=y-z
C.a.b8(a,0,w,x,z)
return w}else{v=x.length-z
C.a.b8(a,0,v,x,z)
C.a.b8(a,v,v+this.c,this.a,0)
return this.c+v}},
ib:function(a,b){var z=new Array(8)
z.fixed$length=Array
this.a=H.q(z,[b])},
w:{
bb:function(a,b){var z=new P.mu(null,0,0,0,[b])
z.ib(a,b)
return z},
mv:function(a){var z
a=C.P.fa(a,1)-1
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
on:{"^":"d;$ti",
gY:function(a){return this.a===0},
gav:function(a){return this.a!==0},
ax:function(a,b){var z
for(z=J.aj(b);z.u();)this.t(0,z.gU())},
jD:function(a){var z,y
for(z=a.a,y=new P.a9(z,z.r,null,null,[null]),y.c=z.e;y.u();)if(!this.a4(0,y.d))return!1
return!0},
bG:function(a,b){var z,y,x,w,v
z=H.q([],this.$ti)
C.a.sl(z,this.a)
for(y=new P.a9(this,this.r,null,null,[null]),y.c=this.e,x=0;y.u();x=v){w=y.d
v=x+1
if(x>=z.length)return H.f(z,x)
z[x]=w}return z},
cB:function(a){return this.bG(a,!0)},
aK:function(a,b){return new H.bF(this,b,[H.m(this,0),null])},
k:function(a){return P.cg(this,"{","}")},
Z:function(a,b){var z
for(z=new P.a9(this,this.r,null,null,[null]),z.c=this.e;z.u();)b.$1(z.d)},
bw:function(a,b,c){var z,y
for(z=new P.a9(this,this.r,null,null,[null]),z.c=this.e,y=b;z.u();)y=c.$2(y,z.d)
return y},
gA:function(a){var z,y
z=new P.a9(this,this.r,null,null,[null])
z.c=this.e
if(!z.u())throw H.c(H.ah())
do y=z.d
while(z.u())
return y},
aU:function(a,b,c){var z,y
for(z=new P.a9(this,this.r,null,null,[null]),z.c=this.e;z.u();){y=z.d
if(b.$1(y)===!0)return y}if(c!=null)return c.$0()
throw H.c(H.ah())},
cn:function(a,b){return this.aU(a,b,null)},
bJ:function(a,b){var z,y,x,w
for(z=new P.a9(this,this.r,null,null,[null]),z.c=this.e,y=null,x=!1;z.u();){w=z.d
if(b.$1(w)===!0){if(x)throw H.c(H.dE())
y=w
x=!0}}if(x)return y
throw H.c(H.ah())},
$isbP:1,
$isa0:1},
om:{"^":"on;$ti"}}],["","",,P,{"^":"",
de:function(a){var z
if(a==null)return
if(typeof a!="object")return a
if(Object.getPrototypeOf(a)!==Array.prototype)return new P.qX(a,Object.create(null),null)
for(z=0;z<a.length;++z)a[z]=P.de(a[z])
return a},
rI:function(a,b){var z,y,x,w
if(typeof a!=="string")throw H.c(H.U(a))
z=null
try{z=JSON.parse(a)}catch(x){y=H.C(x)
w=String(y)
throw H.c(new P.fb(w,null,null))}w=P.de(z)
return w},
xJ:[function(a){return a.dS()},"$1","tW",2,0,0],
qX:{"^":"d;a,b,c",
j:function(a,b){var z,y
z=this.b
if(z==null)return this.c.j(0,b)
else if(typeof b!=="string")return
else{y=z[b]
return typeof y=="undefined"?this.j1(b):y}},
gl:function(a){var z
if(this.b==null){z=this.c
z=z.gl(z)}else z=this.cH().length
return z},
gY:function(a){var z
if(this.b==null){z=this.c
z=z.gl(z)}else z=this.cH().length
return z===0},
gav:function(a){var z
if(this.b==null){z=this.c
z=z.gl(z)}else z=this.cH().length
return z>0},
p:function(a,b,c){var z,y
if(this.b==null)this.c.p(0,b,c)
else if(this.ad(b)){z=this.b
z[b]=c
y=this.a
if(y==null?z!=null:y!==z)y[b]=null}else this.je().p(0,b,c)},
ad:function(a){if(this.b==null)return this.c.ad(a)
if(typeof a!=="string")return!1
return Object.prototype.hasOwnProperty.call(this.a,a)},
Z:function(a,b){var z,y,x,w
if(this.b==null)return this.c.Z(0,b)
z=this.cH()
for(y=0;y<z.length;++y){x=z[y]
w=this.b[x]
if(typeof w=="undefined"){w=P.de(this.a[x])
this.b[x]=w}b.$2(x,w)
if(z!==this.c)throw H.c(new P.D(this))}},
k:function(a){return P.dS(this)},
cH:function(){var z=this.c
if(z==null){z=Object.keys(this.a)
this.c=z}return z},
je:function(){var z,y,x,w,v
if(this.b==null)return this.c
z=P.dN(P.p,null)
y=this.cH()
for(x=0;w=y.length,x<w;++x){v=y[x]
z.p(0,v,this.j(0,v))}if(w===0)y.push(null)
else C.a.sl(y,0)
this.b=null
this.a=null
this.c=z
return z},
j1:function(a){var z
if(!Object.prototype.hasOwnProperty.call(this.a,a))return
z=P.de(this.a[a])
return this.b[a]=z},
$isI:1,
$asI:function(){return[P.p,null]}},
f4:{"^":"d;$ti"},
cP:{"^":"d;$ti"},
dJ:{"^":"a5;a,b",
k:function(a){if(this.b!=null)return"Converting object to an encodable object failed."
else return"Converting object did not return an encodable object."}},
mc:{"^":"dJ;a,b",
k:function(a){return"Cyclic error in JSON stringify"}},
mb:{"^":"f4;a,b",
jI:function(a,b){var z=P.rI(a,this.gjJ().a)
return z},
jH:function(a){return this.jI(a,null)},
jR:function(a,b){var z=this.gjS()
z=P.qZ(a,z.b,z.a)
return z},
h3:function(a){return this.jR(a,null)},
gjS:function(){return C.S},
gjJ:function(){return C.R},
$asf4:function(){return[P.d,P.p]}},
me:{"^":"cP;a,b",
$ascP:function(){return[P.d,P.p]}},
md:{"^":"cP;a",
$ascP:function(){return[P.p,P.d]}},
r_:{"^":"d;",
hL:function(a){var z,y,x,w,v,u,t
z=J.L(a)
y=z.gl(a)
if(typeof y!=="number")return H.x(y)
x=this.c
w=0
v=0
for(;v<y;++v){u=z.cV(a,v)
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
e9:function(a){var z,y,x,w
for(z=this.a,y=z.length,x=0;x<y;++x){w=z[x]
if(a==null?w==null:a===w)throw H.c(new P.mc(a,null))}z.push(a)},
dW:function(a){var z,y,x,w
if(this.hK(a))return
this.e9(a)
try{z=this.b.$1(a)
if(!this.hK(z))throw H.c(new P.dJ(a,null))
x=this.a
if(0>=x.length)return H.f(x,-1)
x.pop()}catch(w){y=H.C(w)
throw H.c(new P.dJ(a,y))}},
hK:function(a){var z,y
if(typeof a==="number"){if(!isFinite(a))return!1
this.c.E+=C.j.k(a)
return!0}else if(a===!0){this.c.E+="true"
return!0}else if(a===!1){this.c.E+="false"
return!0}else if(a==null){this.c.E+="null"
return!0}else if(typeof a==="string"){z=this.c
z.E+='"'
this.hL(a)
z.E+='"'
return!0}else{z=J.o(a)
if(!!z.$isN){this.e9(a)
this.ld(a)
z=this.a
if(0>=z.length)return H.f(z,-1)
z.pop()
return!0}else if(!!z.$isI){this.e9(a)
y=this.le(a)
z=this.a
if(0>=z.length)return H.f(z,-1)
z.pop()
return y}else return!1}},
ld:function(a){var z,y,x
z=this.c
z.E+="["
y=J.L(a)
if(y.gl(a)>0){this.dW(y.j(a,0))
for(x=1;x<y.gl(a);++x){z.E+=","
this.dW(y.j(a,x))}}z.E+="]"},
le:function(a){var z,y,x,w,v,u,t
z={}
if(a.gY(a)){this.c.E+="{}"
return!0}y=a.gl(a)*2
x=new Array(y)
z.a=0
z.b=!0
a.Z(0,new P.r0(z,x))
if(!z.b)return!1
w=this.c
w.E+="{"
for(v='"',u=0;u<y;u+=2,v=',"'){w.E+=v
this.hL(x[u])
w.E+='":'
t=u+1
if(t>=y)return H.f(x,t)
this.dW(x[t])}w.E+="}"
return!0}},
r0:{"^":"a:6;a,b",
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
qY:{"^":"r_;c,a,b",w:{
qZ:function(a,b,c){var z,y,x
z=new P.bS("")
y=new P.qY(z,[],P.tW())
y.dW(a)
x=z.E
return x.charCodeAt(0)==0?x:x}}}}],["","",,P,{"^":"",
x4:[function(a,b){return J.bD(a,b)},"$2","tX",4,0,43],
f8:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.h(a)
if(typeof a==="string")return JSON.stringify(a)
return P.la(a)},
la:function(a){var z=J.o(a)
if(!!z.$isa)return z.k(a)
return H.d_(a)},
cS:function(a){return new P.qG(a)},
P:function(a,b,c){var z,y
z=H.q([],[c])
for(y=J.aj(a);y.u();)z.push(y.gU())
if(b)return z
z.fixed$length=Array
return z},
mw:function(a,b,c,d){var z,y,x
z=H.q(new Array(a),[d])
for(y=0;y<a;++y){x=b.$1(y)
if(y>=z.length)return H.f(z,y)
z[y]=x}return z},
aD:function(a,b){var z=P.P(a,!1,b)
z.fixed$length=Array
z.immutable$list=Array
return z},
eF:function(a){H.vj(H.b(a))},
bp:function(a,b,c){return new H.dG(a,H.dH(a,!1,b,!1),null,null)},
X:{"^":"d;"},
"+bool":0,
W:{"^":"d;$ti"},
cQ:{"^":"d;jf:a<,b",
B:function(a,b){if(b==null)return!1
if(!(b instanceof P.cQ))return!1
return this.a===b.a&&!0},
bE:function(a,b){return C.e.bE(this.a,b.gjf())},
gD:function(a){var z=this.a
return(z^C.e.dB(z,30))&1073741823},
k:function(a){var z,y,x,w,v,u,t,s
z=P.ko(H.nu(this))
y=P.c7(H.ns(this))
x=P.c7(H.no(this))
w=P.c7(H.np(this))
v=P.c7(H.nr(this))
u=P.c7(H.nt(this))
t=P.kp(H.nq(this))
s=z+"-"+y+"-"+x+" "+w+":"+v+":"+u+"."+t
return s},
t:function(a,b){var z,y
z=this.a+b.gkg()
y=new P.cQ(z,!1)
if(!(Math.abs(z)>864e13))z=!1
else z=!0
if(z)H.i(P.G(y.gkD()))
return y},
gkD:function(){return this.a},
$isW:1,
$asW:function(){return[P.cQ]},
w:{
ko:function(a){var z,y
z=Math.abs(a)
y=a<0?"-":""
if(z>=1000)return""+a
if(z>=100)return y+"0"+H.b(z)
if(z>=10)return y+"00"+H.b(z)
return y+"000"+H.b(z)},
kp:function(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},
c7:function(a){if(a>=10)return""+a
return"0"+a}}},
aW:{"^":"M;",$isW:1,
$asW:function(){return[P.M]}},
"+double":0,
b8:{"^":"d;bW:a<",
ak:function(a,b){return new P.b8(this.a+b.gbW())},
at:function(a,b){return new P.b8(this.a-b.gbW())},
cc:function(a,b){if(typeof b!=="number")return H.x(b)
return new P.b8(C.j.hy(this.a*b))},
b0:function(a,b){return C.e.b0(this.a,b.gbW())},
b7:function(a,b){return this.a>b.gbW()},
dg:function(a,b){return this.a<=b.gbW()},
bC:function(a,b){return C.e.bC(this.a,b.gbW())},
gkg:function(){return C.e.bN(this.a,1000)},
B:function(a,b){if(b==null)return!1
if(!(b instanceof P.b8))return!1
return this.a===b.a},
gD:function(a){return this.a&0x1FFFFFFF},
bE:function(a,b){return C.e.bE(this.a,b.gbW())},
k:function(a){var z,y,x,w,v
z=new P.kS()
y=this.a
if(y<0)return"-"+new P.b8(0-y).k(0)
x=z.$1(C.e.bN(y,6e7)%60)
w=z.$1(C.e.bN(y,1e6)%60)
v=new P.kR().$1(y%1e6)
return""+C.e.bN(y,36e8)+":"+H.b(x)+":"+H.b(w)+"."+H.b(v)},
f9:function(a){return new P.b8(0-this.a)},
$isW:1,
$asW:function(){return[P.b8]}},
kR:{"^":"a:14;",
$1:function(a){if(a>=1e5)return""+a
if(a>=1e4)return"0"+a
if(a>=1000)return"00"+a
if(a>=100)return"000"+a
if(a>=10)return"0000"+a
return"00000"+a}},
kS:{"^":"a:14;",
$1:function(a){if(a>=10)return""+a
return"0"+a}},
a5:{"^":"d;",
gbr:function(){return H.E(this.$thrownJsError)}},
cY:{"^":"a5;",
k:function(a){return"Throw of null."}},
b7:{"^":"a5;a,b,h:c<,d",
gef:function(){return"Invalid argument"+(!this.a?"(s)":"")},
gee:function(){return""},
k:function(a){var z,y,x,w,v,u
z=this.c
y=z!=null?" ("+z+")":""
z=this.d
x=z==null?"":": "+H.b(z)
w=this.gef()+y+x
if(!this.a)return w
v=this.gee()
u=P.f8(this.b)
return w+v+": "+H.b(u)},
w:{
G:function(a){return new P.b7(!1,null,null,a)},
cI:function(a,b,c){return new P.b7(!0,a,b,c)},
l:function(a){return new P.b7(!1,null,a,"Must not be null")}}},
e6:{"^":"b7;e,f,a,b,c,d",
gef:function(){return"RangeError"},
gee:function(){var z,y,x
z=this.e
if(z==null){z=this.f
y=z!=null?": Not less than or equal to "+H.b(z):""}else{x=this.f
if(x==null)y=": Not greater than or equal to "+H.b(z)
else if(x>z)y=": Not in range "+H.b(z)+".."+H.b(x)+", inclusive"
else y=x<z?": Valid value range is empty":": Only valid value is "+H.b(z)}return y},
w:{
nA:function(a){return new P.e6(null,null,!1,null,null,a)},
cm:function(a,b,c){return new P.e6(null,null,!0,a,b,"Value not in range")},
a8:function(a,b,c,d,e){return new P.e6(b,c,!0,a,d,"Invalid value")},
nB:function(a,b,c,d,e){if(a<b||a>c)throw H.c(P.a8(a,b,c,d,e))},
cn:function(a,b,c,d,e,f){if(0>a||a>c)throw H.c(P.a8(a,0,c,"start",f))
if(a>b||b>c)throw H.c(P.a8(b,a,c,"end",f))
return b}}},
lX:{"^":"b7;e,l:f>,a,b,c,d",
gef:function(){return"RangeError"},
gee:function(){if(J.c1(this.b,0))return": index must not be negative"
var z=this.f
if(z===0)return": no indices are valid"
return": index should be less than "+H.b(z)},
w:{
cU:function(a,b,c,d,e){var z=e!=null?e:J.aN(b)
return new P.lX(b,z,!0,a,c,"Index out of range")}}},
T:{"^":"a5;a",
k:function(a){return"Unsupported operation: "+this.a}},
Z:{"^":"a5;a",
k:function(a){var z=this.a
return z!=null?"UnimplementedError: "+z:"UnimplementedError"}},
w:{"^":"a5;a",
k:function(a){return"Bad state: "+this.a}},
D:{"^":"a5;a",
k:function(a){var z=this.a
if(z==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+H.b(P.f8(z))+"."}},
n_:{"^":"d;",
k:function(a){return"Out of Memory"},
gbr:function(){return},
$isa5:1},
h9:{"^":"d;",
k:function(a){return"Stack Overflow"},
gbr:function(){return},
$isa5:1},
kn:{"^":"a5;a",
k:function(a){var z=this.a
return z==null?"Reading static variable during its initialization":"Reading static variable '"+H.b(z)+"' during its initialization"}},
qG:{"^":"d;a",
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
lf:{"^":"d;h:a<,fF,$ti",
k:function(a){return"Expando:"+H.b(this.a)},
j:function(a,b){var z,y
z=this.fF
if(typeof z!=="string"){if(b==null||typeof b==="boolean"||typeof b==="number"||typeof b==="string")H.i(P.cI(b,"Expandos are not allowed on strings, numbers, booleans or null",null))
return z.get(b)}y=H.e1(b,"expando$values")
return y==null?null:H.e1(y,z)},
p:function(a,b,c){var z,y
z=this.fF
if(typeof z!=="string")z.set(b,c)
else{y=H.e1(b,"expando$values")
if(y==null){y=new P.d()
H.fM(b,"expando$values",y)}H.fM(y,z,c)}}},
bG:{"^":"d;"},
u:{"^":"M;",$isW:1,
$asW:function(){return[P.M]}},
"+int":0,
B:{"^":"d;$ti",
aK:function(a,b){return H.bI(this,b,H.y(this,"B",0),null)},
ca:["dn",function(a,b){return new H.K(this,b,[H.y(this,"B",0)])}],
a4:function(a,b){var z
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
cB:function(a){return this.bG(a,!0)},
bH:function(a){return P.b9(this,H.y(this,"B",0))},
gl:function(a){var z,y
z=this.ga_(this)
for(y=0;z.u();)++y
return y},
gY:function(a){return!this.ga_(this).u()},
gav:function(a){return!this.gY(this)},
e3:function(a,b){return H.ot(this,b,H.y(this,"B",0))},
gA:function(a){var z,y
z=this.ga_(this)
if(!z.u())throw H.c(H.ah())
do y=z.gU()
while(z.u())
return y},
gce:function(a){var z,y
z=this.ga_(this)
if(!z.u())throw H.c(H.ah())
y=z.gU()
if(z.u())throw H.c(H.dE())
return y},
au:function(a,b){var z,y,x
if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(P.l("index"))
if(b<0)H.i(P.a8(b,0,null,"index",null))
for(z=this.ga_(this),y=0;z.u();){x=z.gU()
if(b===y)return x;++y}throw H.c(P.cU(b,this,"index",null,y))},
k:function(a){return P.m7(this,"(",")")}},
cV:{"^":"d;$ti"},
N:{"^":"d;$ti",$isB:1,$isa0:1},
"+List":0,
I:{"^":"d;$ti"},
at:{"^":"d;",
gD:function(a){return P.d.prototype.gD.call(this,this)},
k:function(a){return"null"}},
"+Null":0,
M:{"^":"d;",$isW:1,
$asW:function(){return[P.M]}},
"+num":0,
d:{"^":";",
B:function(a,b){return this===b},
gD:function(a){return H.aE(this)},
k:function(a){return H.d_(this)},
gbz:function(a){return new H.av(H.iq(this),null)},
toString:function(){return this.k(this)}},
bn:{"^":"d;"},
bP:{"^":"a0;$ti"},
b1:{"^":"d;"},
p:{"^":"d;",$isW:1,
$asW:function(){return[P.p]},
$isdZ:1},
"+String":0,
bS:{"^":"d;E<",
gl:function(a){return this.E.length},
gY:function(a){return this.E.length===0},
gav:function(a){return this.E.length!==0},
k:function(a){var z=this.E
return z.charCodeAt(0)==0?z:z},
w:{
hd:function(a,b,c){var z=J.aj(b)
if(!z.u())return a
if(c.length===0){do a+=H.b(z.gU())
while(z.u())}else{a+=H.b(z.gU())
for(;z.u();)a=a+c+H.b(z.gU())}return a},
ph:function(a){return new P.bS(a)}}}}],["","",,P,{"^":"",fY:{"^":"d;"}}],["","",,P,{"^":"",
e5:function(a){return C.M},
qW:{"^":"d;",
as:function(a){if(a<=0||a>4294967296)throw H.c(P.nA("max must be in range 0 < max \u2264 2^32, was "+a))
return Math.random()*a>>>0},
kG:function(){return Math.random()}}}],["","",,S,{"^":"",kc:{"^":"d;a,b,$ti",
j:function(a,b){return this.b.j(0,b)},
ad:function(a){return this.b.ad(a)},
Z:function(a,b){return this.b.Z(0,b)},
gY:function(a){var z=this.b
return z.gY(z)},
gav:function(a){var z=this.b
return z.gav(z)},
gl:function(a){var z=this.b
return z.gl(z)},
p:function(a,b,c){this.iV()
this.b.p(0,b,c)},
k:function(a){return J.h(this.b)},
iV:function(){if(!this.a)return
this.a=!1
this.b=P.ck(this.b,H.m(this,0),H.m(this,1))},
$isI:1}}],["","",,A,{"^":"",kd:{"^":"d;a,b,$ti",
gl:function(a){return this.b.a},
cs:function(a){return this.b.cs(a)},
a4:function(a,b){return this.b.a4(0,b)},
Z:function(a,b){return this.b.Z(0,b)},
gY:function(a){return this.b.a===0},
gav:function(a){return this.b.a!==0},
ga_:function(a){var z,y
z=this.b
y=new P.a9(z,z.r,null,null,[null])
y.c=z.e
return y},
gA:function(a){var z=this.b
return z.gA(z)},
aK:function(a,b){var z=this.b
z.toString
return new H.bF(z,b,[H.m(z,0),null])},
bH:function(a){var z,y
z=this.b
y=z.en()
y.ax(0,z)
return y},
t:function(a,b){this.iC()
return this.b.t(0,b)},
k:function(a){return J.h(this.b)},
iC:function(){if(!this.a)return
this.a=!1
this.b=P.b9(this.b,H.m(this,0))},
$isbP:1,
$isa0:1}}],["","",,S,{"^":"",dx:{"^":"d;fH:a<,b,$ti",
a2:function(a){var z=new S.O(null,null,this.$ti)
z.al()
z.m(this)
a.$1(z)
return z.q()},
gD:function(a){var z=this.b
if(z==null){z=X.bB(this.a)
this.b=z}return z},
B:function(a,b){var z,y,x,w,v
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
bR:function(a,b,c){var z=this.a
return(z&&C.a).bR(z,b,c)},
b3:function(a,b){return this.bR(a,b,0)},
ga_:function(a){var z=this.a
return new J.bj(z,z.length,0,null,[H.m(z,0)])},
aK:function(a,b){var z=this.a
z.toString
return new H.aq(z,b,[H.m(z,0),null])},
a4:function(a,b){var z=this.a
return(z&&C.a).a4(z,b)},
Z:function(a,b){var z=this.a
return(z&&C.a).Z(z,b)},
bH:function(a){var z=this.a
z.toString
return P.b9(z,H.m(z,0))},
gY:function(a){return this.a.length===0},
gav:function(a){return this.a.length!==0},
gA:function(a){var z=this.a
return(z&&C.a).gA(z)},
al:function(){if(new H.av(H.a_(H.m(this,0)),null).B(0,C.q))throw H.c(new P.T('explicit element type required, for example "new BuiltList<int>"'))}},O:{"^":"d;fH:a<,b,$ti",
q:function(){var z,y
z=this.b
if(z==null){z=this.a
y=new S.dx(z,null,this.$ti)
y.al()
this.a=z
this.b=y
z=y}return z},
m:function(a){if(H.aV(a,"$isdx",this.$ti,null)){this.a=a.gfH()
this.b=a}else{this.a=P.P(a,!0,H.m(this,0))
this.b=null}},
j:function(a,b){var z=this.a
if(b>>>0!==b||b>=z.length)return H.f(z,b)
return z[b]},
p:function(a,b,c){var z
if(c==null)H.i(P.G("null element"))
z=this.gew()
if(b>>>0!==b||b>=z.length)return H.f(z,b)
z[b]=c},
t:function(a,b){var z
if(b==null)H.i(P.G("null element"))
z=this.gew();(z&&C.a).t(z,b)},
a3:function(a,b){var z=this.gew();(z&&C.a).a3(z,b)},
aK:function(a,b){var z=this.a
z.toString
z=new H.aq(z,b,[H.m(z,0),null]).bG(0,!0)
this.a=z
this.b=null
this.ix(z)},
gew:function(){if(this.b!=null){this.a=P.P(this.a,!0,H.m(this,0))
this.b=null}return this.a},
al:function(){if(new H.av(H.a_(H.m(this,0)),null).B(0,C.q))throw H.c(new P.T('explicit element type required, for example "new ListBuilder<int>"'))},
ix:function(a){var z,y,x,w
for(z=a.length,y=H.m(this,0),x=0;x<a.length;a.length===z||(0,H.as)(a),++x){w=a[x]
if(!H.dh(w,y))throw H.c(P.G("invalid element: "+H.b(w)))}}}}],["","",,A,{"^":"",cM:{"^":"d;iU:a<,b,c,d,$ti",
a2:function(a){var z=new A.cX(null,null,this.$ti)
z.cj()
z.m(this)
a.$1(z)
return z.q()},
F:function(){return new S.kc(!0,this.a,this.$ti)},
gD:function(a){var z=this.b
if(z==null){z=this.a.gcq()
z=H.bI(z,new A.jX(this),H.y(z,"B",0),null)
z=P.P(z,!1,H.y(z,"B",0))
C.a.fd(z)
z=X.bB(z)
this.b=z}return z},
B:function(a,b){var z,y,x,w,v
if(b==null)return!1
if(b===this)return!0
z=J.o(b)
if(!z.$iscM)return!1
y=b.a
x=this.a
if(y.gl(y)!==x.gl(x))return!1
z=z.gD(b)
w=this.gD(this)
if(z==null?w!=null:z!==w)return!1
z=this.c
if(z==null){z=x.gcq()
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
cj:function(){if(new H.av(H.a_(H.m(this,0)),null).B(0,C.q))throw H.c(new P.T('explicit key type required, for example "new BuiltMap<int, int>"'))
if(new H.av(H.a_(H.m(this,1)),null).B(0,C.q))throw H.c(new P.T('explicit value type required, for example "new BuiltMap<int, int>"'))}},jX:{"^":"a:0;a",
$1:function(a){var z,y
z=J.j(a)
y=J.j(this.a.a.j(0,a))
return X.df(X.b2(X.b2(0,J.j(z)),J.j(y)))}},cX:{"^":"d;a,b,$ti",
q:function(){var z=this.b
if(z==null){z=new A.cM(this.a,null,null,null,this.$ti)
z.cj()
this.b=z}return z},
m:function(a){var z
if(H.aV(a,"$iscM",this.$ti,null)){this.b=a
this.a=a.giU()}else if(!!a.$iscM){z=P.ck(a.a,H.m(this,0),H.m(this,1))
this.b=null
this.a=z}else if(!!a.$isI){z=P.ck(a,H.m(this,0),H.m(this,1))
this.b=null
this.a=z}else throw H.c(P.G("expected Map or BuiltMap, got "+H.b(a.gbz(a))))},
j:function(a,b){return this.a.j(0,b)},
p:function(a,b,c){if(c==null)H.i(P.G("null value"))
this.gj6().p(0,b,c)},
gj6:function(){if(this.b!=null){this.a=P.ck(this.a,H.m(this,0),H.m(this,1))
this.b=null}return this.a},
cj:function(){if(new H.av(H.a_(H.m(this,0)),null).B(0,C.q))throw H.c(new P.T('explicit key type required, for example "new MapBuilder<int, int>"'))
if(new H.av(H.a_(H.m(this,1)),null).B(0,C.q))throw H.c(new P.T('explicit value type required, for example "new MapBuilder<int, int>"'))}}}],["","",,L,{"^":"",dy:{"^":"d;j8:a<,b,$ti",
a2:function(a){var z=new L.aF(null,null,this.$ti)
z.b2()
z.m(this)
a.$1(z)
return z.q()},
gD:function(a){var z=this.b
if(z==null){z=this.a
z.toString
z=P.P(new H.bF(z,new L.jY(),[H.m(z,0),null]),!1,null)
C.a.fd(z)
z=X.bB(z)
this.b=z}return z},
B:function(a,b){var z,y,x
if(b==null)return!1
if(b===this)return!0
z=J.o(b)
if(!z.$isdy)return!1
y=this.a
if(b.a.a!==y.a)return!1
z=z.gD(b)
x=this.gD(this)
if(z==null?x!=null:z!==x)return!1
return y.jD(b)},
k:function(a){return J.h(this.a)},
gl:function(a){return this.a.a},
cs:function(a){return this.a.cs(a)},
ga_:function(a){var z,y
z=this.a
y=new P.a9(z,z.r,null,null,[null])
y.c=z.e
return y},
aK:function(a,b){var z=this.a
z.toString
return new H.bF(z,b,[H.m(z,0),null])},
a4:function(a,b){return this.a.a4(0,b)},
Z:function(a,b){return this.a.Z(0,b)},
bH:function(a){return new A.kd(!0,this.a,this.$ti)},
gY:function(a){return this.a.a===0},
gav:function(a){return this.a.a!==0},
gA:function(a){var z=this.a
return z.gA(z)},
aU:function(a,b,c){return this.a.aU(0,b,c)},
cn:function(a,b){return this.aU(a,b,null)},
b2:function(){if(new H.av(H.a_(H.m(this,0)),null).B(0,C.q))throw H.c(new P.T('explicit element type required, for example "new BuiltSet<int>"'))}},jY:{"^":"a:0;",
$1:function(a){return J.j(a)}},aF:{"^":"d;a,b,$ti",
q:function(){var z=this.b
if(z==null){z=new L.dy(this.a,null,this.$ti)
z.b2()
this.b=z}return z},
m:function(a){var z,y,x,w
if(H.aV(a,"$isdy",this.$ti,null)){this.a=a.gj8()
this.b=a}else{z=H.m(this,0)
y=P.a6(null,null,null,z)
for(x=J.aj(a);x.u();){w=x.gU()
if(H.dh(w,z))y.t(0,w)
else throw H.c(P.G("iterable contained invalid element: "+H.b(w)))}this.b=null
this.a=y}},
t:function(a,b){if(b==null)H.i(P.G("null element"))
this.gex().t(0,b)},
a3:function(a,b){this.gex().a3(0,b)},
aK:function(a,b){var z=this.a
z.toString
z=P.b9(new H.bF(z,b,[H.m(z,0),null]),null)
this.b=null
this.a=z
this.j9(z)},
gex:function(){if(this.b!=null){this.a=P.b9(this.a,H.m(this,0))
this.b=null}return this.a},
b2:function(){if(new H.av(H.a_(H.m(this,0)),null).B(0,C.q))throw H.c(new P.T('explicit element type required, for example "new SetBuilder<int>"'))},
j9:function(a){var z,y,x
for(z=new P.a9(a,a.r,null,null,[null]),z.c=a.e,y=H.m(this,0);z.u();){x=z.d
if(!H.dh(x,y))throw H.c(P.G("invalid element: "+H.b(x)))}}}}],["","",,Y,{"^":"",
k:function(a,b){if(typeof b!=="number")return H.x(b)
a=536870911&a+b
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
V:function(a){a=536870911&a+((67108863&a)<<3)
a^=a>>>11
return 536870911&a+((16383&a)<<15)}}],["","",,N,{"^":"",nZ:{"^":"nX;ch,cx,ae:cy@,b9:db@,dx,b,c,d,e,f,r,x,y,z,Q,a",
hq:function(){var z=$.$get$cE()
z.p(0,"game",this.cx)
z.p(0,"hitpoints",this.cy)
z.p(0,"stamina",this.db)
z.p(0,"gold",this.dx)},
ki:function(){var z,y,x,w
this.cx=null
this.cy=Z.bQ("Health",new N.o1(),"#CCCCCC","Your physical state",100,0,!0,P.aW)
z=P.u
this.db=Z.bQ("Stamina",new N.o2(),"#CCCCCC","Spare physical energy",0,0,!0,z)
z=Z.bQ("Gold",new N.o3(),"#CCCCCC","Gold coins",0,0,!0,z)
this.dx=z
y=$.$get$c_()
x=this.cy
w=this.db
y=new O.f7(N.bm("EdgeheadGame"),null,!1,null,null,null,null,null,null,null,null,new Y.a3(H.q([],[Y.ai]),0,P.b_()),x,w,z,O.vq(),O.vp(),O.vo(),y,this.gi2(),new P.bS(""),!1,null)
y.i_()
this.cx=y
y.x="endGame"
$.$get$cz().t(0,0)},
ih:function(){var z,y
z=new O.d3(["# Insignificant Little Vermin",[null,P.a1(["goto","gameLoop"])]],0,null,!1,!1)
y=this.b.a
y.p(0,"start",z)
z.a="start"
z=new O.d3([new N.o0(this),[null,P.a1(["goto","gameLoop"])]],0,null,!1,!1)
y.p(0,"gameLoop",z)
z.a="gameLoop"
z=new O.d3(['<p class="meta">\n  Hit <strong>Restart</strong> (top left) to play again. It will be different.\n</p>'],0,null,!1,!1)
y.p(0,"endGame",z)
z.a="endGame"
this.c=y.j(0,"start")},
w:{
o_:function(){var z,y,x,w
z=Z.bQ("Health",new N.tA(),"#CCCCCC","Your physical state",100,0,!0,P.aW)
y=P.u
x=Z.bQ("Stamina",new N.tB(),"#CCCCCC","Spare physical energy",0,0,!0,y)
y=Z.bQ("Gold",new N.tC(),"#CCCCCC","Gold coins",0,0,!0,y)
w=P.p
z=new N.nZ("net.filiph.edgehead.0.0.1",null,z,x,y,new O.o4(new H.R(0,null,null,null,null,null,0,[w,O.d3])),null,null,null,P.a6(null,null,null,w),!1,null,-9999,null,null,null)
z.ih()
return z}}},tA:{"^":"a:19;",
$1:function(a){var z=J.o(a)
if(z.B(a,0))return"\ud83d\udc80"
if(z.dg(a,0.5))return"\ud83d\ude23"
if(z.b0(a,1))return"\ud83d\ude27"
return"\ud83d\ude10"}},tB:{"^":"a:9;",
$1:function(a){return H.b(a)+" \ud83d\udd06"}},tC:{"^":"a:9;",
$1:function(a){return H.b(a)+" \ud83d\udcb0"}},o0:{"^":"a:20;a",
$0:function(){var z=0,y=P.aB(),x=this
var $async$$0=P.ax(function(a,b){if(a===1)return P.aH(b,y)
while(true)switch(z){case 0:z=2
return P.aw(x.a.cx.by(),$async$$0)
case 2:return P.aI(null,y)}})
return P.aJ($async$$0,y)}},o1:{"^":"a:19;",
$1:function(a){var z=J.o(a)
if(z.B(a,0))return"\ud83d\udc80"
if(z.dg(a,0.5))return"\ud83d\ude23"
if(z.b0(a,1))return"\ud83d\ude27"
return"\ud83d\ude10"}},o2:{"^":"a:9;",
$1:function(a){return H.b(a)+" \ud83d\udd06"}},o3:{"^":"a:9;",
$1:function(a){return H.b(a)+" \ud83d\udcb0"}}}],["","",,M,{"^":"",cR:{"^":"d;"},l7:{"^":"d;"},q2:{"^":"cR;a,b,c",
a2:function(a){var z=new M.ee(null,!1,0,0)
z.m(this)
a.$1(z)
return z.q()},
B:function(a,b){if(b==null)return!1
if(b===this)return!0
if(!(b instanceof M.cR))return!1
return this.a===b.a&&this.b===b.b&&!0},
gD:function(a){return Y.V(Y.k(Y.k(Y.k(0,this.a&0x1FFFFFFF),this.b&0x1FFFFFFF),C.O.gD(!1)))},
k:function(a){return"EdgeheadGlobalState {bloodrockFollowers="+C.e.k(this.a)+",\nbrianaQuoteIndex="+C.e.k(this.b)+",\nhasKegOfBeer="+String(!1)+",\n}"}},ee:{"^":"l7;d,a,b,c",
gcD:function(){var z=this.d
if(z!=null){this.b=z.a
this.c=this.d.b
this.d.c
this.a=!1
this.d=null}return this},
m:function(a){this.d=a},
q:function(){var z,y,x
z=this.d
if(z==null){this.gcD()
y=this.b
this.gcD()
x=this.c
this.gcD()
this.a
z=new M.q2(y,x,!1)}this.m(z)
return z}}}],["","",,O,{"^":"",
xN:[function(a){var z,y
z=a.gcd()
y=a.gc0()
if(typeof y!=="number")return H.x(y)
return z-2*y},"$1","dk",2,0,28],
xZ:[function(a){var z,y,x
z=a.gcd()
y=a.gd8()
x=a.gc0()
if(typeof x!=="number")return H.x(x)
return z+y-x},"$1","ie",2,0,28],
f7:{"^":"my;y,z,Q,ch,cx,cy,db,dx,dy,bI:fr<,fx,ff:fy<,ae:go<,b9:id<,k1,a,b,c,d,e,f,r,x",
i_:function(){var z,y,x,w,v,u
z=P.aD(C.o,null)
y=$.$get$bz()
this.cy=R.b6(1000,"orc",O.dk(),null,null,new G.aG("sword",1,1,!1,!0,!1,z),null,0,2,0,!1,!1,2,!1,C.t,0,y)
this.db=R.b6(1001,"goblin",O.dk(),null,null,new G.aG("scimitar",1,1,!1,!0,!1,P.aD(C.o,null)),null,0,1,0,!1,!1,1,!1,C.t,0,y)
y=new S.O(null,null,[Q.t])
y.al()
y.m([new Q.t("start_adventure","","",null)])
this.dx=new K.cp(y.q(),"preStartBook",new O.kZ(),new O.l_(),null,null,"ground")
y=R.b6(1,"Filip",null,"preStartBook",null,null,null,0,2,1000,!1,!0,2,!0,C.F,1,null)
this.ch=y
z=y.x
y=y.db
if(typeof z!=="number")return z.de()
if(typeof y!=="number")return H.x(y)
this.go.saf(z/y)
this.id.saf(this.ch.fy)
this.k1.saf(this.ch.r)
this.cx=R.b6(100,"Briana",null,this.dx.b,null,null,this.ch.y,0,2,0,!1,!1,2,!0,C.a5,0,null)
this.dy=F.fT(this.dx,!1)
y=K.cp
x=P.P($.$get$i3(),!0,y)
C.a.ax(x,[this.dx,$.$get$ez()])
w=new M.ee(null,!1,0,0).q()
z=this.ch
v=this.cx
u=this.dy
v=P.b9([z,v],R.A)
z=P.bb(null,O.cG)
u=new A.a4(v,P.a6(null,null,null,U.ae),w,z,P.b9(x,y),P.P([u],!0,S.af),0,null)
this.fr=u
y=new Y.a3(H.q([],[Y.ai]),0,P.b_())
y.b=u.r
this.fx=new B.bK(u,null,y,1,1,!0,!1,!1,0)},
da:function(){var z=0,y=P.aB(),x,w=this,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
var $async$da=P.ax(function(a,b){if(a===1)return P.aH(b,y)
while(true)switch(z){case 0:v=w.fy
u=w.gjQ()
if(v.hn(u)){z=1
break}t=w.fr.v(w.ch.y)
s=t.gae()
r=t.ghi()
if(typeof s!=="number"){x=s.de()
z=1
break}if(typeof r!=="number"){x=H.x(r)
z=1
break}w.go.saf(s/r)
w.id.saf(t.gb9())
r=w.k1
s=t.gf8()
if(!J.e(r.f,s)){r.f=s
r.y=!0
$.cs=!0}s=w.y
s.he("update() for world at time "+w.fr.r)
r=w.fr.f
if(r.length===0){w.r=!0
v.n(0,"\n\n",!0)
if(w.fr.kc(w.ch.y))v.n(0,"TO BE CONTINUED.",!0)
else v.n(0,"You died.",!0)
w.f.E+=v.cw()
z=1
break}q=C.a.gA(r)
p=q.dY(w.fr)
if(p==null){v=w.fr
u=v.f
o=C.a.gA(u)
o.d2(v)
C.a.a3(u,o);++w.fr.r
z=1
break}n=G.j7(p,w.fr)
z=3
return P.aw(n.kL(),$async$da)
case 3:r=n.f
if(r.gY(r)){m=n.a
l=n.b
m.f5("There are no actions available for actorId="+H.b(l)+".")
l="Actions not available for "+H.b(l)+" and "
k=n.c
j=k.a
i=J.o(j)
j="PlanConsequence<"+i.gD(j)+", "+i.k(j)+", "+J.h(k.b)+", "+H.b(k.d)+", "+k.y+", "
m.bQ(l+(j+(k.x?"isSuccess":"")+">")+".")}m=Z.n6(r)
h=new Z.n5(new P.hB(r,[null,null]),m)
if(r.gY(r))$.$get$bL().f5("Created with no recommendations.")
if(m.length===0){s.e1("No recommendation for "+H.b(p.gh()))
s.e1(new O.l1(w))
w.fr.h2(q.gi());++w.fr.r
z=1
break}z=p.gT()===!0?4:6
break
case 4:u=m.length
if(u>1)for(g=0;r=m.length,g<r;r===u||(0,H.as)(m),++g);s.bQ("planner.generateTable for "+H.b(p.gh()))
n.f6().Z(0,new O.l2(w))
u=h.hp(q.gdK(),O.ie())
u.toString
f=P.P(u,!1,H.y(u,"B",0))
if(f.length!==0&&C.a.bt(f,new O.l3())){w.f.E+=v.cw()
C.a.sl(v.a,0)}v=new O.l4(new O.l6())
u=f.length-1
if(u-0<=32)H.h8(f,0,u,v)
else H.h7(f,0,u,v)
for(v=f.length,u=w.c,g=0;g<f.length;f.length===v||(0,H.as)(f),++g){e=f[g]
u.$3$helpMessage$script(e.gW(),e.gJ(),new O.l5(w,p,e))}z=1
break
z=5
break
case 6:s=p.gh0()
z=7
return P.aw(w.cE(h.kK(s==null?O.ie():s),p,v),$async$da)
case 7:case 5:v.hn(u)
case 1:return P.aI(x,y)}})
return P.aJ($async$da,y)},
dr:function(a,b,c){var z=0,y=P.aB(),x=this,w,v,u,t,s,r,q,p,o,n,m,l
var $async$dr=P.ax(function(d,e){if(d===1)return P.aH(e,y)
while(true)switch(z){case 0:w=a.I(b,x.fr)
v=J.o(w)
z=v.B(w,1)?2:4
break
case 2:x.fx=C.a.gce(c)
z=3
break
case 4:z=v.B(w,0)?5:7
break
case 5:x.fx=C.a.gce(c)
z=6
break
case 7:u=C.a.gA(J.h(a.gL()).split("."))
v=v.l4(w)
t=a.aa(b,x.fr)
s=a.gO()&&b.ke(a.gL())
r="use "+H.b(u)
x.fL()
z=8
return P.aw(x.e.$4$rerollEffectDescription$rerollable(v,t,r,s),$async$dr)
case 8:q=e
s=new H.K(c,new O.kT(q),[H.m(c,0)])
x.fx=s.gce(s)
if(q.glc()===!0){p=A.ed(x.fx.gbI())
p.X(b.gi(),new O.kU())
v=x.fx
t=v.gfQ()
s=H.q([],[Y.ai])
r=new Y.a3(s,0,P.b_())
C.a.ax(s,v.c.a)
s=v.d
o=v.e
n=v.f
m=v.r
l=v.x
v=v.y
r.b=p.r
x.fx=new B.bK(p,t,r,s,o,n,m,l,v)}case 6:case 3:return P.aI(null,y)}})
return P.aJ($async$dr,y)},
cE:function(a,b,c){var z=0,y=P.aB(),x,w=this,v,u,t
var $async$cE=P.ax(function(d,e){if(d===1)return P.aH(e,y)
while(true)switch(z){case 0:v=a.dE(b,w.fx,w.fr)
u=P.P(v,!0,H.y(v,"B",0))
z=b.gT()===!0?3:5
break
case 3:z=6
return P.aw(w.dr(a,b,u),$async$cE)
case 6:z=4
break
case 5:t=S.ny(new H.aq(u,new O.kW(),[H.m(u,0),null]),1)
if(t>=u.length){x=H.f(u,t)
z=1
break}w.fx=u[t]
case 4:C.a.ax(c.a,w.fx.gff().a)
w.fr=w.fx.gbI()
v=w.y
v.bQ(new O.kX(a,b))
v.an(new O.kY(w,b))
case 1:return P.aI(x,y)}})
return P.aJ($async$cE,y)}},
kZ:{"^":"a:3;",
$3:function(a,b,c){return c.n(0,"UNUSED because this is the first choice",!0)}},
l_:{"^":"a:3;",
$3:function(a,b,c){return H.i(new P.w("Room isn't to be revisited"))}},
l1:{"^":"a:2;a",
$0:function(){var z=this.a.fr.d
return"- how we got here: "+new H.aq(z,new O.l0(),[H.m(z,0),null]).cp(0," <- ")}},
l0:{"^":"a:0;",
$1:function(a){return a.gaT()}},
l2:{"^":"a:0;a",
$1:function(a){return this.a.y.bQ(a)}},
l6:{"^":"a:50;",
$1:function(a){if(a instanceof Q.z)return H.b(a.b.gh())+" "+a.gW()
return"ZZZZZZ "+a.gW()}},
l3:{"^":"a:0;",
$1:function(a){return a.gW()!==""}},
l4:{"^":"a:6;a",
$2:function(a,b){var z=this.a
return J.bD(z.$1(a),z.$1(b))}},
l5:{"^":"a:20;a,b,c",
$0:function(){var z=0,y=P.aB(),x=this,w
var $async$$0=P.ax(function(a,b){if(a===1)return P.aH(b,y)
while(true)switch(z){case 0:w=x.a
z=2
return P.aw(w.cE(x.c,x.b,w.fy),$async$$0)
case 2:return P.aI(null,y)}})
return P.aJ($async$$0,y)}},
kT:{"^":"a:0;a",
$1:function(a){return a.geQ()===this.a.geQ()}},
kU:{"^":"a:0;",
$1:function(a){var z=a.gb9()
if(typeof z!=="number")return z.at()
a.sb9(z-1)
return a}},
kW:{"^":"a:0;",
$1:function(a){return a.gkM()}},
kX:{"^":"a:2;a,b",
$0:function(){return H.b(this.b.gh())+" selected "+this.a.gh()}},
kY:{"^":"a:2;a,b",
$0:function(){var z,y
z=this.a.fr.d
y=new H.aq(z,new O.kV(),[H.m(z,0),null]).cp(0," <- ")
return"- how "+H.b(this.b.gh())+" got here: "+y}},
kV:{"^":"a:0;",
$1:function(a){return a.gaT()}}}],["","",,Q,{"^":"",
ik:function(a,b,c){return P.aU(function(){var z=a,y=b,x=c
var w=0,v=1,u,t,s,r,q,p
return function $async$ik(d,e){if(d===1){u=e
w=v}while(true)switch(w){case 0:t=y.f
t=t.length!==0?C.a.gA(t):null
s=J.j4(t.b6(y.a,y),new Q.uC(z))
t=J.aj(s.a),r=new H.bT(t,s.b,[H.m(s,0)])
case 2:if(!r.u()){w=3
break}q=t.gU()
p=x.$1(q)
if(p.gK()&&!z.eO(q,y)){w=2
break}w=4
return p
case 4:w=2
break
case 3:return P.aS()
case 1:return P.aT(u)}}})},
il:function(a,b,c){return P.aU(function(){var z=a,y=b,x=c
var w=0,v=1,u,t
return function $async$il(d,e){if(d===1){u=e
w=v}while(true)switch(w){case 0:t=y.f
t=y.e_((t.length!==0?C.a.gA(t):null).gbF()).gjU().a,t=new J.bj(t,t.length,0,null,[H.m(t,0)])
case 2:if(!t.u()){w=3
break}w=4
return x.$1(t.d)
case 4:w=2
break
case 3:return P.aS()
case 1:return P.aT(u)}}})},
im:function(a,b,c){return P.aU(function(){var z=a,y=b,x=c
var w=0,v=1,u,t
return function $async$im(d,e){if(d===1){u=e
w=v}while(true)switch(w){case 0:t=y.f
t=(t.length!==0?C.a.gA(t):null).gbn(),t=t.ga_(t)
case 2:if(!t.u()){w=3
break}w=4
return x.$1(t.d)
case 4:w=2
break
case 3:return P.aS()
case 1:return P.aT(u)}}})},
uC:{"^":"a:0;a",
$1:function(a){return!J.e(a,this.a)&&a.gaq()}},
ag:{"^":"d;",
dE:function(a,b,c){var z=this
return P.aU(function(){var y=a,x=b,w=c
var v=0,u=1,t,s,r,q,p
return function $async$dE(d,e){if(d===1){t=e
v=u}while(true)switch(v){case 0:s=z.I(y,x.gbI())
r=J.am(s)
v=r.b7(s,0)?2:3
break
case 2:q=A.ed(w)
v=4
return B.fH(q,x,z,z.it(q,y,w,z.gN(),!0),s,!1,!1,!0)
case 4:case 3:v=r.b0(s,1)?5:6
break
case 5:q=A.ed(w)
p=z.is(q,y,w,z.gM(),!0)
if(typeof s!=="number")H.x(s)
v=7
return B.fH(q,x,z,p,1-s,!0,!1,!1)
case 7:case 6:return P.aS()
case 1:return P.aT(t)}}})},
fk:function(a,b,c,d,e,f){var z,y,x,w,v,u,t
a.x=this
z=a.a.bJ(0,new Q.j5(b))
y=new O.eU(null,null,null,null,null,null,null,null,null,null,null,null,null)
x=this.gh()
y.ga7().c=x
x=b.gi()
y.ga7().r=x
y.ga7().f=C.T
y.ga7().cx=f
y.ga7().Q=e
x=this.gK()
y.ga7().z=x
x=this.ga1()
y.ga7().ch=x
if(!!this.$isz){x=y.ga7()
w=x.x
if(w==null){w=new L.aF(null,null,[P.u])
w.b2()
w.m(C.d)
x.x=w
x=w}else x=w
w=this.b.gi()
if(w==null)H.i(P.G("null element"))
x.gex().t(0,w)}if(!!this.$isca){x=this.b.gh1()
y.ga7().d=x}v=new Y.a3(H.q([],[Y.ai]),0,P.b_())
x=a.f
u=(x.length!==0?C.a.gA(x):null).gi()
a.gD(a);(x.length!==0?C.a.gA(x):null).kH(a,v)
this.a=d.$3(z,a,v)
if(a.du(u)!=null)a.h2(u);++a.r
w=a.f7(u)
if(!(w==null))w.hl(a,v)
a.x=null
while(!0){w=x.length!==0?C.a.gA(x):null
if((w==null?w:w.dY(a))!=null){w=x.length!==0?C.a.gA(x):null
w=!J.e(w==null?w:w.dk(a),!0)}else w=!0
if(!w)break
if((x.length!==0?C.a.gA(x):null)==null)break
t=C.a.gA(x)
t.d2(a)
C.a.a3(x,t)}x=x.length!==0?C.a.gA(x):null
if(!(x==null))x.hm(a,v)
if(this.a==null)H.i(new P.w("No description given when executing "+this.k(0)+". You should return it from your world-modifying function."))
x=this.a
y.ga7().e=x
x=a.r
y.ga7().y=x
a.d.fT(y.q())
return v},
it:function(a,b,c,d,e){return this.fk(a,b,c,d,!1,e)},
is:function(a,b,c,d,e){return this.fk(a,b,c,d,e,!1)}},
j5:{"^":"a:0;a",
$1:function(a){return J.e(a.gi(),this.a.gi())}},
z:{"^":"ag;c0:b<",
gW:function(){var z=new Y.a3(H.q([],[Y.ai]),0,P.b_())
z.fR(0,this.ga8(),this.b)
return z.cw()},
aa:function(a,b){var z=new Y.a3(H.q([],[Y.ai]),0,P.b_())
z.jo(0,this.gag(),this.b,a,!0)
return z.cw()},
k:function(a){var z=this.b
return"EnemyTargetAction<"+this.ga8()+"::enemy="+H.b(z.gi())+"/"+H.b(z.gh())+">"}},
ca:{"^":"ag;",
gW:function(){return this.b.gW()},
k:function(a){return"ExitAction<"+this.b.gW()+">"}},
ce:{"^":"ag;",
gW:function(){var z=new Y.a3(H.q([],[Y.ai]),0,P.b_())
z.fR(0,this.ga8(),this.b)
return z.cw()},
k:function(a){return"ItemAction<"+this.gW()+">"}},
nI:{"^":"d;a,b",
k:function(a){return this.b},
w:{"^":"xy<"}}}],["","",,O,{"^":"",cG:{"^":"d;",
k:function(a){return"ActionRecord<"+H.b(this.b)+", "+H.b(this.d)+">"}},mm:{"^":"d;a,b",
k:function(a){return this.b}},pZ:{"^":"cG;a,dC:b<,eK:c<,aT:d<,e,cv:f<,fh:r<,V:x<,hH:y<,z,hI:Q<,hJ:ch<",
a2:function(a){var z=new O.eU(null,null,null,null,null,null,null,null,null,null,null,null,null)
z.m(this)
a.$1(z)
return z.q()},
B:function(a,b){var z,y
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
gD:function(a){return Y.V(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)),J.j(this.f)),J.j(this.r)),J.j(this.x)),J.j(this.y)),J.j(this.z)),J.j(this.Q)),J.j(this.ch)))},
k:function(a){return"ActionRecord {accomplices="+J.h(this.a)+",\nactionName="+J.h(this.b)+",\ndataString="+J.h(this.c)+",\ndescription="+H.b(J.h(this.d))+",\nknownTo="+J.h(this.e)+",\nprotagonist="+H.b(J.h(this.f))+",\nsufferers="+J.h(this.r)+",\ntime="+J.h(this.x)+",\nwasAggressive="+J.h(this.y)+",\nwasFailure="+J.h(this.z)+",\nwasProactive="+J.h(this.Q)+",\nwasSuccess="+J.h(this.ch)+",\n}"}},eU:{"^":"d;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",
gdC:function(){return this.ga7().c},
geK:function(){return this.ga7().d},
gaT:function(){return this.ga7().e},
gcv:function(){return this.ga7().r},
gfh:function(){var z,y
z=this.ga7()
y=z.x
if(y==null){y=new L.aF(null,null,[P.u])
y.b2()
y.m(C.d)
z.x=y
z=y}else z=y
return z},
gV:function(){return this.ga7().y},
ghH:function(){return this.ga7().z},
ghI:function(){return this.ga7().ch},
ghJ:function(){return this.ga7().cx},
ga7:function(){var z,y
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
if(z==null){y=this.ga7()
x=y.b
if(x==null){x=new L.aF(null,null,[P.u])
x.b2()
x.m(C.d)
y.b=x
y=x}else y=x
y=y.q()
x=this.ga7().c
w=this.ga7().d
v=this.ga7().e
u=this.ga7().f
t=this.ga7().r
s=this.ga7()
r=s.x
if(r==null){r=new L.aF(null,null,[P.u])
r.b2()
r.m(C.d)
s.x=r
s=r}else s=r
s=s.q()
r=this.ga7().y
q=this.ga7().z
p=this.ga7().Q
o=this.ga7().ch
n=this.ga7().cx
z=new O.pZ(y,x,w,v,u,t,s,r,q,p,o,n)
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
io:function(a,b){return P.aU(function(){var z=a,y=b
var x=0,w=1,v,u
return function $async$io(c,d){if(c===1){v=d
x=w}while(true)switch(x){case 0:x=2
return z
case 2:u=y.a
x=3
return P.bV(new H.K(u,new R.uU(z),[H.m(u,0)]))
case 3:return P.aS()
case 1:return P.aT(v)}}})},
b6:function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q){var z=new R.eV(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
new R.tw(a,b,l,n,o,f,e,i,m,p,j,h,d,g,q,!1,c).$1(z)
return z.q()},
uU:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gh6()
y=this.a.gi()
return z==null?y==null:z===y}},
A:{"^":"mI;",
gfV:function(){return!0},
gaI:function(){var z=this.x
if(typeof z!=="number")return z.b7()
return z>0},
gaz:function(){return this.e instanceof K.cd},
gar:function(){return this.fr===C.h},
ga0:function(){return this.fr===C.f},
ga5:function(){return this.fr===C.k},
jF:function(a){var z,y,x
for(z=this.cy.a,y=new P.a9(z,z.r,null,null,[null]),y.c=z.e,x=0;y.u();)if(C.a.a4(y.d.gdU(),a))++x
return x},
jY:function(){var z,y,x,w,v,u,t
for(z=this.cy.a,y=new P.a9(z,z.r,null,null,[null]),y.c=z.e,x=null,w=-9999999;y.u();){v=y.d
if(!(v instanceof L.aR))continue
z=v.gbK()
u=v.gbA()
t=v.gaL()?1:0
if(2+z+u+t>w){z=v.gbK()
u=v.gbA()
t=v.gaL()?1:0
w=2+z+u+t
x=v}}return x},
kd:function(a,b){var z,y,x
for(z=this.cy.a,y=new P.a9(z,z.r,null,null,[null]),y.c=z.e,x=0;y.u();){if(C.a.a4(y.d.gdU(),a))++x
if(x>=b)return!0}return!1},
hb:function(a){return this.kd(a,1)},
ke:function(a){var z=this.fy
if(typeof z!=="number")return z.bC()
return z>=1},
eO:function(a,b){return this.hd(a,b)>0},
hd:function(a,b){var z,y
if(this.ch===!0){z=a.gaY()
y=this.go.a
z=z.gi()
z=y==null?z==null:y===z}else z=!1
if(z)return 1000
if(this.iQ(a,b,10))return 1
z=a.gaY()
y=this.go.a
z=z.gi()
return(y==null?z!=null:y!==z)?1:0},
dj:function(a){var z,y,x,w,v,u,t,s,r,q,p
z=a.v(this.y)
y=z.gae()
if(typeof y!=="number")return H.x(y)
x=2*y
if(!z.gaI())x-=10
y=z.e
if(!(y instanceof K.cd))x+=4
y=J.b5(y.gaf(),2)
if(typeof y!=="number")return H.x(y)
x+=y
for(y=z.cy.a,w=[null],v=new P.a9(y,y.r,null,null,w),v.c=y.e;v.u();){y=J.b5(v.d.gaf(),10)
if(typeof y!=="number")return H.x(y)
x+=y}y=a.a
for(v=y.ga_(y),u=new H.bT(v,new R.jB(this),[H.m(y,0)]),t=0;u.u();){s=v.gU()
r=s.gaq()?2:0
q=s.gae()
if(typeof q!=="number")return H.x(q)
p=J.b5(s.e.gaf(),2)
if(typeof p!=="number")return H.x(p)
t=t+r+2*q+p
for(r=s.cy.a,q=new P.a9(r,r.r,null,null,w),q.c=r.e;q.u();){r=J.b5(q.d.gaf(),10)
if(typeof r!=="number")return H.x(r)
t+=r}}return new A.cH(x,t,y.bw(0,0,new R.jC(this,a)))},
iQ:function(a,b,c){var z=b.l2(a,this,!0)
if(z==null)return!1
return z<=c},
$isaC:1},
mI:{"^":"d+dA;"},
tw:{"^":"a:0;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy",
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
z=new L.aF(null,null,[U.ae])
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
jB:{"^":"a:0;a",
$1:function(a){var z,y
z=this.a
if(J.e(a.gaY(),z.go)){y=a.gi()
z=z.y
z=y==null?z!=null:y!==z}else z=!1
return z}},
jC:{"^":"a:30;a,b",
$2:function(a,b){var z,y
z=b.gaq()?1:0
y=b.gae()
if(typeof y!=="number")return H.x(y)
return J.ao(a,(z+y)*this.a.hd(b,this.b))}},
e_:{"^":"d;a,b",
k:function(a){return this.b}},
q_:{"^":"A;a,h0:b<,bF:c<,am:d<,S:e<,h6:f<,f8:r<,ae:x<,i:y<,z,c2:Q<,c3:ch<,T:cx<,aD:cy<,hi:db<,h:dx<,aL:dy<,ai:fr<,ab:fx<,b9:fy<,aY:go<",
a2:function(a){var z=new R.eV(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
z.m(this)
a.$1(z)
return z.q()},
B:function(a,b){var z,y
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
gD:function(a){return Y.V(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)),J.j(this.f)),J.j(this.r)),J.j(this.x)),J.j(this.y)),J.j(this.z)),J.j(this.Q)),J.j(this.ch)),J.j(this.cx)),J.j(this.cy)),J.j(this.db)),J.j(this.dx)),J.j(this.dy)),J.j(this.fr)),J.j(this.fx)),J.j(this.fy)),J.j(this.go)))},
k:function(a){return"Actor {categories="+J.h(this.a)+",\ncombineFunction="+J.h(this.b)+",\ncurrentRoomName="+H.b(J.h(this.c))+",\ncurrentShield="+H.b(J.h(this.d))+",\ncurrentWeapon="+H.b(J.h(this.e))+",\nfollowingActorId="+J.h(this.f)+",\ngold="+J.h(this.r)+",\nhitpoints="+J.h(this.x)+",\nid="+J.h(this.y)+",\ninitiative="+J.h(this.z)+",\nisActive="+J.h(this.Q)+",\nisConfused="+J.h(this.ch)+",\nisPlayer="+J.h(this.cx)+",\nitems="+J.h(this.cy)+",\nmaxHitpoints="+J.h(this.db)+",\nname="+J.h(this.dx)+",\nnameIsProperNoun="+J.h(this.dy)+",\npose="+J.h(this.fr)+",\npronoun="+J.h(this.fx)+",\nstamina="+J.h(this.fy)+",\nteam="+J.h(this.go)+",\n}"}},
eV:{"^":"d;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id",
gh0:function(){return this.gC().c},
gbF:function(){return this.gC().d},
sbF:function(a){this.gC().d=a
return a},
gam:function(){return this.gC().e},
sam:function(a){this.gC().e=a
return a},
gS:function(){return this.gC().f},
sS:function(a){this.gC().f=a
return a},
gh6:function(){return this.gC().r},
gf8:function(){return this.gC().x},
gae:function(){return this.gC().y},
sae:function(a){this.gC().y=a
return a},
gi:function(){return this.gC().z},
gc2:function(){return this.gC().ch},
gc3:function(){return this.gC().cx},
sc3:function(a){this.gC().cx=a
return a},
gT:function(){return this.gC().cy},
gaD:function(){var z,y
z=this.gC()
y=z.db
if(y==null){y=new L.aF(null,null,[U.ae])
y.b2()
y.m(C.d)
z.db=y
z=y}else z=y
return z},
ghi:function(){return this.gC().dx},
gh:function(){return this.gC().dy},
sh:function(a){this.gC().dy=a
return a},
gaL:function(){return this.gC().fr},
gai:function(){return this.gC().fx},
sai:function(a){this.gC().fx=a
return a},
gab:function(){return this.gC().fy},
gb9:function(){return this.gC().go},
sb9:function(a){this.gC().go=a
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
if(k==null){k=new L.aF(null,null,[U.ae])
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
z=new R.q_(y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e.q())
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
return z}}}],["","",,A,{"^":"",cH:{"^":"d;cd:a<,d8:b<,c0:c<",
at:function(a,b){return new A.ap(this.a-b.gcd(),this.b-b.gd8(),J.bC(this.c,b.gc0()))},
k:function(a){return"ActorScore<self="+C.j.bk(this.a,2)+",team="+C.j.bk(this.b,2)+",enemy="+J.c4(this.c,2)+">"}},ap:{"^":"d;cd:a<,d8:b<,c0:c<",
gku:function(){return this.a===-1/0&&this.b===-1/0&&J.e(this.c,-1/0)},
cc:function(a,b){if(typeof b!=="number")return H.x(b)
return new A.ap(this.a*b,this.b*b,J.c2(this.c,b))},
ak:function(a,b){return new A.ap(this.a+b.gcd(),this.b+b.gd8(),J.ao(this.c,b.gc0()))},
de:function(a,b){if(typeof b!=="number")return H.x(b)
return new A.ap(this.a/b,this.b/b,J.b5(this.c,b))},
k:function(a){return"ActorScoreChange<self="+C.j.bk(this.a,2)+",team="+C.j.bk(this.b,2)+",enemy="+J.c4(this.c,2)+">"},
w:{
jA:function(a){var z,y,x,w,v,u,t,s,r
for(z=a.length,y=0,x=0,w=0,v=0,u=0;t=a.length,u<t;t===z||(0,H.as)(a),++u){s=a[u];++y
x+=s.a
w+=s.b
r=s.c
if(typeof r!=="number")return H.x(r)
v+=r}if(y===0)throw H.c(P.G("Cannot average empty iterable"))
return new A.ap(x/y,w/y,v/y)}}}}],["","",,U,{"^":"",
wZ:function(a){switch(a){case C.A:return"fist"
case C.w:return"shield"
case C.r:return"spear"
case C.x:return"sword"}throw H.c(P.G(a))},
ae:{"^":"mJ;dU:a<",
gaT:function(){return U.wZ(C.a.gcY(this.a))},
gi:function(){return H.aE(this)},
gc2:function(){return!0},
gaI:function(){return!1},
gT:function(){return!1},
gaL:function(){return!1},
gab:function(){return C.n},
gaY:function(){return $.$get$aL()},
$isaC:1},
mJ:{"^":"d+dA;"},
bH:{"^":"d;a,b",
k:function(a){return this.b}}}],["","",,K,{"^":"",cd:{"^":"aR;h:b<,a"}}],["","",,E,{"^":"",bq:{"^":"ae;h:b<,a",
gaf:function(){return 1},
$isaC:1}}],["","",,Z,{"^":"",ak:{"^":"aR;h:b<,bK:c<,bA:d<,aL:e<,cl:f<,eH:r<,a",w:{
oE:function(a,b,c,d,e){return new Z.ak(c,0,e,!1,!1,!1,P.aD(C.D,null))}}}}],["","",,G,{"^":"",aG:{"^":"aR;h:b<,bK:c<,bA:d<,aL:e<,cl:f<,eH:r<,a",w:{
pj:function(a,b,c,d,e,f){return new G.aG(c,e,f,d,!0,!1,P.aD(C.o,null))}}}}],["","",,L,{"^":"",aR:{"^":"ae;",
geH:function(){return!1},
gcl:function(){return!1},
gkr:function(){return!1},
gaV:function(){return this.gbK()>0},
geR:function(){return this.gbA()>0},
gl:function(a){return 2},
gbK:function(){return 0},
gbA:function(){return 0},
gaf:function(){var z,y,x
z=this.gbK()
y=this.gbA()
x=this.gaL()?1:0
return 2+z+y+x},
$isaC:1}}],["","",,G,{"^":"",my:{"^":"d;",
fL:function(){var z,y
z=this.f
y=z.E
if(y.length!==0){this.b.$1(y.charCodeAt(0)==0?y:y)
z.E=""}},
lo:[function(a){this.f.E+=a},"$1","gjQ",2,0,21],
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
return P.aw(w.da(),$async$by)
case 5:z=3
break
case 4:w.fL()
case 1:return P.aI(x,y)}})
return P.aJ($async$by,y)}}}],["","",,B,{"^":"",f5:{"^":"d;di:a<,dH:b<,d3:c<",
k:function(a){return"ConsequenceStats<order="+this.c+", cumProb="+J.c4(this.b,3)+", score="+this.a.k(0)+">"}},bK:{"^":"d;bI:a<,fQ:b<,ff:c<,kM:d<,dH:e<,f,r,eQ:x<,d3:y<",
gD:function(a){return X.bB(H.q([this.a,this.e,this.b,this.d,this.y,this.f,this.r,this.x],[P.d]))},
B:function(a,b){var z
if(b==null)return!1
z=J.o(b)
return!!z.$isbK&&this.gD(this)===z.gD(b)},
k:function(a){var z,y
z=this.a
y=J.o(z)
z="PlanConsequence<"+y.gD(z)+", "+y.k(z)+", "+J.h(this.b)+", "+H.b(this.d)+", "+this.y+", "
return z+(this.x?"isSuccess":"")+">"},
w:{
fH:function(a,b,c,d,e,f,g,h){var z,y
z=b==null
y=z?e:J.c2(e,b.gdH())
z=z?0:b.gd3()+1
d.b=a.r
return new B.bK(a,c,d,e,y,g,f,h,z)}}}}],["","",,G,{"^":"",j6:{"^":"d;a,b,c,d,e,f",
jB:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=this.a
z.an("...")
z.an("combining scores")
y=H.q([],[A.ap])
x=new G.jt()
for(w=J.aj(a),v=b.a,u=b.b,t=b.c,s=null;w.u();){r=w.gU()
z.an(new G.jr(r))
if(J.ac(r.gdH(),0.15))if(s==null){z.an("    - first _bestCase")
s=r}else if(J.ac(x.$1(r.gdi()),x.$1(s.gdi()))){z.an("    - new _bestCase")
s=r}q=r.gdi()
p=J.bC(q.c,t)
o=r.b
if(typeof o!=="number")return H.x(o)
n=new A.ap((q.a-v)*o,(q.b-u)*o,J.c2(p,o))
z.an(new G.js(n))
y.push(n)}m=A.jA(y)
w=s==null
if(w)l=C.H
else{q=s.gdi()
l=new A.ap(q.a-v,q.b-u,J.bC(q.c,t))}w=w?s:s.gd3()
if(w==null)w=1
if(typeof w!=="number")return H.x(w)
v=l.a/w
u=l.b/w
w=J.b5(l.c,w)
t=m.a
q=m.b
p=m.c
z.an("- uplifts average = "+("ActorScoreChange<self="+C.j.bk(t,2)+",team="+C.j.bk(q,2)+",enemy="+J.c4(p,2)+">"))
z.an("- best = "+("ActorScoreChange<self="+C.u.bk(v,2)+",team="+C.u.bk(u,2)+",enemy="+J.c4(w,2)+">"))
t=v+t
q=u+q
p=w+p
z.an("- result = "+("ActorScoreChange<self="+C.u.bk(t,2)+",team="+C.u.bk(q,2)+",enemy="+C.j.bk(p,2)+">"))
return new A.ap(t,q,p)},
f6:function(){var z=this
return P.aU(function(){var y=0,x=1,w,v,u,t,s
return function $async$f6(a,b){if(a===1){w=b
y=x}while(true)switch(y){case 0:v=z.f,u=v.gcq(),u=u.ga_(u),t=1
case 2:if(!u.u()){y=3
break}s=u.gU()
y=4
return""+t+") "+s.gW()+"\t"+H.b(v.j(0,s))
case 4:++t
y=2
break
case 3:return P.aS()
case 1:return P.aT(w)}}})},
dL:function(a,b,c){var z=0,y=P.aB(),x=this,w,v,u,t,s,r,q,p,o,n,m
var $async$dL=P.ax(function(d,e){if(d===1)return P.aH(e,y)
while(true)switch(z){case 0:w=x.f
w.bi(0)
v=x.c
u=v.a
t=u.a.bJ(0,new G.ju(x))
s=t.dj(u)
r=x.a
r.bQ("Planning for "+H.b(t.dx)+", initialScore="+s.k(0))
q=new P.bd(x.eh(t,u).a(),null,null,null)
case 2:if(!q.u()){z=3
break}p=q.c
o=p==null?q.b:p.gU()
r.bo(new G.jv(t,o))
if(o.H(t,u)!==!0){r.bo(new G.jw(o))
z=2
break}z=4
return P.aw(x.cI(v,o,b,a,c).cB(0),$async$dL)
case 4:n=e
if(J.eR(n)===!0){r.bo(new G.jx(o))
w.p(0,o,C.I)
z=2
break}r.bo(new G.jy(s,o,n))
m=x.jB(n,s,b)
w.p(0,o,m)
r.bo(new G.jz(o,m))
z=2
break
case 3:x.e=!0
return P.aI(null,y)}})
return P.aJ($async$dL,y)},
kL:function(){return this.dL(50,10,null)},
eh:function(a,b){return P.aU(function(){var z=a,y=b
var x=0,w=1,v,u,t,s,r,q,p,o
return function $async$eh(c,d){if(c===1){v=d
x=w}while(true)switch(x){case 0:u=y.f
x=2
return P.bV((u.length!==0?C.a.gA(u):null).gbP())
case 2:u=(u.length!==0?C.a.gA(u):null).gaH()
t=u.length
s={func:1,ret:Q.ce,args:[U.ae]}
r={func:1,ret:Q.ca,args:[Q.t]}
q={func:1,ret:Q.z,args:[R.A]}
p=0
case 3:if(!(p<u.length)){x=5
break}o=u[p]
x=H.ay(o,q)?6:8
break
case 6:x=9
return P.bV(Q.ik(z,y,o))
case 9:x=7
break
case 8:x=H.ay(o,r)?10:12
break
case 10:x=13
return P.bV(Q.il(z,y,o))
case 13:x=11
break
case 12:x=H.ay(o,s)?14:16
break
case 14:x=17
return P.bV(Q.im(z,y,o))
case 17:x=15
break
case 16:throw H.c(new P.w(o.k(0)+" is not one of the supported ones"))
case 15:case 11:case 7:case 4:u.length===t||(0,H.as)(u),++p
x=3
break
case 5:return P.aS()
case 1:return P.aT(v)}}})},
cI:function(a5,a6,a7,a8,a9){var $async$cI=P.ax(function(b0,b1){switch(b0){case 2:u=x
z=u.pop()
break
case 1:v=b1
z=w}while(true)switch(z){case 0:s={}
r=a5.a
q=r.a.bJ(0,new G.ja(t))
p=t.a
p.bo("=====")
p.bo(new G.jb(a6,q))
p.bo(new G.jc(a6))
if(a6.H(q,r)!==!0){p.bo("- firstAction not applicable")
z=1
break}o=q.dj(r)
p.bo(new G.ji(a5,o))
p.bo(new G.jj(a5))
n=P.bb(null,B.bK)
m=P.a6(null,null,null,A.a4)
l=J.o(r)
k=l.gD(r)
for(j=new P.bd(a6.dE(q,a5,r).a(),null,null,null);j.u();){i=j.c
h=i==null?j.b:i.gU()
if(l.gD(r)!==k)throw H.c(new P.w("Action "+a6.k(0)+" modified world state when producing "+H.b(h)+"."))
n.aF(h)}s.a=0
r=t.b
case 3:if(!!n.gY(n)){z=4
break}++s.a
g=n.dN()
p.an("----")
p.an(new G.jk(g))
p.an(new G.jl(g))
if(g.gd3()>a7||s.a>a8){p.an(new G.jm(s,a7,g))
p.an(new G.jn(g))
z=4
break}z=g.gbI().f.length===0?5:6
break
case 5:p.an("- leaf node: world.situations is empty (end of book)")
l=g.a
q=l.a.aU(0,new G.jo(t),new G.jp())
if(q==null){p.an("- this actor ("+H.b(r)+") has been removed")
z=3
break}f=new B.f5(q.dj(l),g.e,g.y)
p.an(new G.jd(f))
z=7
x=[1]
return P.dd(P.hL(f),$async$cI,y)
case 7:z=3
break
case 6:l=g.a
j=l.f
e=(j.length!==0?C.a.gA(j):null).dY(l)
j=l.a
i=new H.K(j,new G.je(t),[H.m(j,0)])
d=i.gl(i)
if(d>1)throw H.c(new P.w("World has several duplicates of mainActor: "+J.h(l)))
else if(d===0){p.he("mainActor "+H.b(r)+" dies and is removed in world - will use defaultScoreWhenDead")
q=null}else q=j.bJ(0,new G.jf(t))
c=J.e(e,q)
p.an("- actor: "+H.b(e.gh())+" (isMain=="+c+")")
j=q==null
p.an("- mainActor: "+H.b(j?q:q.gh()))
b=j?q:q.dj(l)
if(b==null)b=C.J
f=new B.f5(b,g.e,g.y)
p.an(new G.jg(o,f))
p.an(new G.jh(g))
z=8
x=[1]
return P.dd(P.hL(f),$async$cI,y)
case 8:p.an("- generating all actions for "+H.b(e.gh()))
j=n.c
i=n.b
a=n.a
for(a0=new P.bd(t.eh(e,l).a(),null,null,null);a0.u();){a1=a0.c
a2=a1==null?a0.b:a1.gU()
if(a2.H(e,l)!==!0)continue
for(a1=new P.bd(a2.dE(e,g,l).a(),null,null,null);a1.u();){a3=a1.c
a4=a3==null?a1.b:a3.gU();++t.d
if(J.c1(a4.gdH(),0.05))continue
if(m.a4(0,a4.gbI()))continue
n.aF(a4)}}p.an("- added "+(((n.c-n.b&n.a.length-1)>>>0)-((j-i&a.length-1)>>>0))+" new PlanConsequences")
m.t(0,l)
z=3
break
case 4:case 1:return P.dd(null,0,y)
case 2:return P.dd(v,1,y)}})
var z=0,y=P.qr($async$cI),x,w=2,v,u=[],t=this,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4
return P.rN(y)},
i9:function(a,b){var z
if(a==null){z=b.d
throw H.c(P.G("Called ActorPlanner with actor == null. That may mean that a Situation returns getCurrentActor as null. Some action that you added should make sure it removes the Situation (maybe "+H.b(z.gcY(z).gaT())+"?). World: "+J.h(b)+". Situation: "+H.b(b.gjG())+". Action Records: "+z.aK(0,new G.jq()).cp(0,"<-")))}},
w:{
j7:function(a,b){var z,y,x
z=N.bm("ActorPlanner")
y=a==null?a:a.gi()
x=new Y.a3(H.q([],[Y.ai]),0,P.b_())
x.b=b.r
z=new G.j6(z,y,new B.bK(b,null,x,1,1,!0,!1,!1,0),0,!1,new H.R(0,null,null,null,null,null,0,[null,null]))
z.i9(a,b)
return z}}},jq:{"^":"a:0;",
$1:function(a){return a.gaT()}},jt:{"^":"a:33;",
$1:function(a){var z=a.c
if(typeof z!=="number")return H.x(z)
return a.b-z}},jr:{"^":"a:2;a",
$0:function(){return"  - consequence: "+H.b(this.a)}},js:{"^":"a:2;a",
$0:function(){return"    - uplift = "+this.a.k(0)}},ju:{"^":"a:0;a",
$1:function(a){return J.e(a.gi(),this.a.b)}},jv:{"^":"a:2;a,b",
$0:function(){return"Evaluating action '"+this.b.gW()+"' for "+H.b(this.a.dx)}},jw:{"^":"a:2;a",
$0:function(){return"- action '"+this.a.gW()+"' isn't applicable"}},jx:{"^":"a:2;a",
$0:function(){return"- action '"+this.a.gW()+"' is possible but we couldn't get to any outcomes while planning. Scoring with negative infinity."}},jy:{"^":"a:2;a,b,c",
$0:function(){return"- action '"+this.b.gW()+"' leads to "+H.b(J.aN(this.c))+" different ConsequenceStats, initialScore="+this.a.k(0)}},jz:{"^":"a:2;a,b",
$0:function(){return"- action '"+this.a.gW()+"' was scored "+this.b.k(0)}},ja:{"^":"a:0;a",
$1:function(a){return J.e(a.gi(),this.a.b)}},jb:{"^":"a:2;a,b",
$0:function(){return"_getConsequenceStats for firstAction '"+this.a.gW()+"' of "+H.b(this.b.gh())}},jc:{"^":"a:2;a",
$0:function(){return"- firstAction == "+H.b(this.a)}},ji:{"^":"a:2;a,b",
$0:function(){var z=this.a
return"- current: initialScore="+this.b.k(0)+", cumProb="+H.b(z.e)+" (prob="+H.b(z.d)+", ord="+z.y+")"}},jj:{"^":"a:2;a",
$0:function(){var z=this.a
return"- initial action: "+C.b.cc(" ",z.y)+"- "+J.h(z.b)}},jk:{"^":"a:2;a",
$0:function(){return"evaluating a PlanConsequence of '"+this.a.gfQ().gW()+"'"}},jl:{"^":"a:2;a",
$0:function(){var z=this.a.gbI().f
return"- situation: "+H.b(J.iY(z.length!==0?C.a.gA(z):null))}},jm:{"^":"a:2;a,b,c",
$0:function(){return"- order ("+this.c.gd3()+") higher than maximum ("+this.b+"), or consequences ("+this.a.a+") higher than maximum"}},jn:{"^":"a:2;a",
$0:function(){var z=this.a.gbI().d
return"- how we got here: "+new H.aq(z,new G.j9(),[H.m(z,0),null]).cp(0," <- ")}},j9:{"^":"a:0;",
$1:function(a){return a.gaT()}},jo:{"^":"a:0;a",
$1:function(a){return J.e(a.gi(),this.a.b)}},jp:{"^":"a:2;",
$0:function(){return}},jd:{"^":"a:2;a",
$0:function(){return"- "+this.a.k(0)}},je:{"^":"a:0;a",
$1:function(a){return J.e(a.gi(),this.a.b)}},jf:{"^":"a:0;a",
$1:function(a){return J.e(a.gi(),this.a.b)}},jg:{"^":"a:2;a,b",
$0:function(){return"- mainActor's score == "+this.b.k(0)+" (initial="+this.a.k(0)+")"}},jh:{"^":"a:2;a",
$0:function(){var z=this.a.gbI().d
return"- how we got here: "+new H.aq(z,new G.j8(),[H.m(z,0),null]).cp(0," <- ")}},j8:{"^":"a:0;",
$1:function(a){return a.gaT()}}}],["","",,Z,{"^":"",n5:{"^":"d;a,b",
gbP:function(){return this.b},
gY:function(a){return this.b.length===0},
hp:function(a,b){var z=this
return P.aU(function(){var y=a,x=b
var w=0,v=2,u,t,s,r,q,p,o,n,m,l
return function $async$hp(c,d){if(c===1){u=d
w=v}while(true)switch(w){case 0:t=z.b
w=t.length<=y?3:4
break
case 3:w=5
return P.bV(t)
case 5:w=1
break
case 4:s=z.iK(new Z.n8())
r=z.eg(new Z.n9(),[s])
q=z.eg(new Z.na(),[s,r])
w=s!=null?6:8
break
case 6:$.$get$bL().bQ("best self preserving: "+H.b(s))
w=9
return s
case 9:p=1
w=7
break
case 8:p=0
case 7:w=r!=null&&p<y?10:11
break
case 10:$.$get$bL().bQ("best enemy damaging: "+H.b(r))
w=12
return r
case 12:++p
case 11:w=q!=null&&p<y?13:14
break
case 13:$.$get$bL().bQ("best team preserving: "+H.b(q))
w=15
return q
case 15:++p
case 14:if(p===y){w=1
break}C.a.cf(t,new Z.nb(z,x))
o=t.length,n=0
case 16:if(!(n<t.length)){w=18
break}m=t[n]
l=J.o(m)
if(l.B(m,s)){w=17
break}if(l.B(m,r)){w=17
break}if(l.B(m,q)){w=17
break}w=19
return m
case 19:++p
if(p===y){w=18
break}case 17:t.length===o||(0,H.as)(t),++n
w=16
break
case 18:case 1:return P.aS()
case 2:return P.aT(u)}}})},
kK:function(a){var z,y,x,w,v,u,t,s,r,q,p
z={}
y=this.b
if(y.length===1)return C.a.gce(y)
C.a.cf(y,new Z.nc(this,a))
x=this.a.a
w=x.gcC().bw(0,1/0,new Z.nd(a))
v=x.gcC().bw(0,-1/0,new Z.ne(a))
x=J.am(v)
u=J.am(w)
t=u.at(w,J.c2(x.at(v,w),0.1))
z.a=t
if(u.B(w,v)){t=J.bC(t,1)
z.a=t
u=t}else u=t
s=x.at(v,u)
r=P.mw(y.length,new Z.nf(z,this,a,s),!1,P.M)
q=new H.aq(r,new Z.ng(C.a.bw(r,0,Z.vg())),[H.m(r,0),null]).bG(0,!1)
z=C.a.bw(q,0,Z.vh())
if(typeof z!=="number")return H.x(z)
u=q.length
x=u-1
if(x<0)return H.f(q,x)
z=J.ao(q[x],1000-z)
if(x>=q.length)return H.f(q,x)
q[x]=z
p=S.nz(q,1000)
if(p>=y.length)return H.f(y,p)
return y[p]},
eg:function(a,b){var z,y,x,w,v,u,t
for(z=this.b,y=z.length,x=this.a.a,w=null,v=null,u=0;u<z.length;z.length===y||(0,H.as)(z),++u){t=z[u]
if(C.a.a4(b,t))continue
if(w==null||J.ac(a.$1(x.j(0,t)),v)){v=a.$1(x.j(0,t))
w=t
continue}}return w},
iK:function(a){return this.eg(a,C.d)},
w:{
n6:function(a){var z,y,x
z=a.gcq()
y=H.y(z,"B",0)
x=P.P(new H.K(z,new Z.n7(a),[y]),!1,y)
if(x.length===0)$.$get$bL().f5("After removing actions scored by undefined, there are no recommendations.")
return x},
xv:[function(a,b){return J.ao(a,b)},"$2","vg",4,0,45],
xw:[function(a,b){return J.ao(a,b)},"$2","vh",4,0,46]}},n8:{"^":"a:0;",
$1:function(a){return a.gcd()}},n9:{"^":"a:0;",
$1:function(a){return J.iU(a.gc0())}},na:{"^":"a:0;",
$1:function(a){return a.gd8()}},nb:{"^":"a:6;a,b",
$2:function(a,b){var z,y
z=this.b
y=this.a.a.a
return-J.bD(z.$1(y.j(0,a)),z.$1(y.j(0,b)))}},nc:{"^":"a:6;a,b",
$2:function(a,b){var z,y
z=this.b
y=this.a.a.a
return-J.bD(z.$1(y.j(0,a)),z.$1(y.j(0,b)))}},nd:{"^":"a:6;a",
$2:function(a,b){var z=this.a.$1(b)
return Math.min(H.dg(a),H.dg(z))}},ne:{"^":"a:6;a",
$2:function(a,b){var z=this.a.$1(b)
return Math.max(H.dg(a),H.dg(z))}},nf:{"^":"a:9;a,b,c,d",
$1:function(a){var z,y
z=this.b
y=z.b
if(a>=y.length)return H.f(y,a)
return J.b5(J.bC(this.c.$1(z.a.a.j(0,y[a])),this.a.a),this.d)}},ng:{"^":"a:0;a",
$1:function(a){return J.j0(J.c2(J.b5(a,this.a),1000))}},n7:{"^":"a:0;a",
$1:function(a){return!this.a.j(0,a).gku()}}}],["","",,K,{"^":"",rX:{"^":"a:3;",
$3:function(a,b,c){}},cp:{"^":"d;a,h:b<,c,d,jW:e<,f,cb:r<",
gjU:function(){return this.a},
gD:function(a){return C.b.gD(this.b)},
B:function(a,b){if(b==null)return!1
return b instanceof K.cp&&b.b===this.b},
k:function(a){return"Room<"+this.b+">"},
jL:function(a,b,c){return this.c.$3(a,b,c)},
i1:function(a,b,c){return this.d.$3(a,b,c)},
jX:function(a,b,c){return this.e.$3(a,b,c)},
w:{
Y:function(a,b,c,d,e,f,g){var z=new S.O(null,null,[Q.t])
z.al()
z.m(f)
return new K.cp(z.q(),a,b,c,d,e,g)}}}}],["","",,Q,{"^":"",t:{"^":"d;h1:a<,W:b<,aT:c<,ko:d<"}}],["","",,S,{"^":"",af:{"^":"d;",
gaH:function(){return C.d},
gbP:function(){return C.d},
gdK:function(){return 3},
dY:function(a){return this.b_(this.gV(),a)},
hl:function(a,b){},
hm:function(a,b){},
kH:function(a,b){},
d2:function(a){},
dk:function(a){return!0}}}],["","",,S,{"^":"",
fQ:function(a){var z=$.$get$bN().as(3)
if(z<0||z>=3)return H.f(a,z)
return a[z]},
ny:function(a,b){var z,y,x,w,v
z=$.$get$bN().kG()*b
for(y=new H.dO(a,a.gl(a),0,null,[H.y(a,"b0",0)]),x=0,w=0;y.u();){v=y.d
if(typeof v!=="number")return H.x(v)
x+=v
if(x>=z)return w;++w}throw H.c(P.G("The weights do not add up to total="+b))},
nz:function(a,b){var z,y,x,w,v,u,t
z=$.$get$bN().as(b)
for(y=a.length,x=0,w=0,v=0;u=a.length,v<u;u===y||(0,H.as)(a),++v){t=a[v]
if(typeof t!=="number")return H.x(t)
x+=t
if(x>=z)return w;++w}throw H.c(P.G("The weights do not add up to total="+b))},
bO:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=J.L(a)
y=z.b3(a,"{")
if(y!==-1){x=z.gl(a)
if(typeof x!=="number")return x.at()
x=y<x-1}else x=!1
if(x){w=H.q([],[P.u])
w.push(y)
u=y+1
t=null
s=1
while(!0){x=z.gl(a)
if(typeof x!=="number")return H.x(x)
if(!(u<x)){v=null
break}r=z.j(a,u)
x=J.o(r)
if(x.B(r,"{"))++s
else if(x.B(r,"|")&&s===1)w.push(u)
else if(x.B(r,"}")){--s
if(s===0){w.push(u)
v=u
t=v
break}}q=u+1
t=u
u=q}p=w.length-1
if(p>1){o=$.$get$bN().as(p)
z=z.aM(a,0,y)
x=w.length
if(o<0||o>=x)return H.f(w,o)
n=w[o]
m=o+1
if(m>=x)return H.f(w,m)
m=z+H.b(S.bO(C.b.aM(a,n+1,w[m])))
if(typeof v!=="number")return v.ak()
n=a.length
m+=C.b.aM(a,v+1,n)
z=m.charCodeAt(0)==0?m:m
if(t===n-1)return z
else return S.bO(z)}else{x=z.gl(a)
if(typeof x!=="number")return x.at()
if(t===x-1)return a
else{if(typeof t!=="number")return t.ak()
x=t+1
return z.aM(a,0,x)+H.b(S.bO(C.b.bL(a,x)))}}}else return a},
a7:function(a,b,c,d){var z=c!=null?3:2
switch($.$get$bN().as(z)){case 0:a.$0()
break
case 1:b.$0()
break
case 2:c.$0()
break
case 4:d.$0()
break}}}],["","",,Y,{"^":"",ai:{"^":"d;ba:a<,b1:b<,aW:c<,ho:d<,e,dF:f@,hr:r<,hj:x<,fg:y<,jT:z<,i4:Q<,dd:ch<,ji:cx<,kt:cy<,V:db<",
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
geN:function(){return C.a.bt(this.a,new Y.oS())},
aS:function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){var z,y
if(b==null||J.e(b,""))return
z=(J.bh(b).eL(b,".")||C.b.eL(b,"!")||C.b.eL(b,"?"))&&C.b.dm(b,P.bp("[A-Z]",!0,!1))?!0:p
y=this.b
this.a.push(new Y.ai(b,m,h,j,i,d,k,g,!1,e,l,z,c,f,y))},
t:function(a,b){return this.aS(a,b,null,!1,!1,!1,!1,null,null,null,!1,!1,null,!1,null,!1)},
n:function(a,b,c){return this.aS(a,b,null,!1,!1,!1,!1,null,null,null,!1,!1,null,!1,null,c)},
bX:function(a,b,c,d){return this.aS(a,b,null,!1,!1,!1,!1,null,null,c,!1,!1,d,!1,null,!1)},
jk:function(a,b,c,d,e,f,g,h,i,j,k,l,m,n){return this.aS(a,b,c,d,e,f,g,h,i,j,k,!1,l,m,null,n)},
fR:function(a,b,c){return this.aS(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,null,!1,null,!1)},
eC:function(a,b,c,d,e){return this.aS(a,b,null,!1,!1,!1,c,null,null,null,!1,d,e,!1,null,!1)},
eB:function(a,b,c,d){return this.aS(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,d,!1,null,!1)},
bX:function(a,b,c,d){return this.aS(a,b,null,!1,!1,!1,!1,null,null,c,!1,!1,d,!1,null,!1)},
fS:function(a,b,c,d,e,f){return this.aS(a,b,c,!1,!1,!1,!1,d,null,null,e,!1,f,!1,null,!1)},
jp:function(a,b,c,d,e,f){return this.aS(a,b,c,!1,!1,d,!1,e,null,null,!1,!1,f,!1,null,!1)},
jm:function(a,b,c){return this.aS(a,b,c,!1,!1,!1,!1,null,null,null,!1,!1,null,!1,null,!1)},
jn:function(a,b,c,d){return this.aS(a,b,c,!1,!1,!1,!1,d,null,null,!1,!1,null,!1,null,!1)},
jq:function(a,b,c,d,e,f){return this.aS(a,b,null,!1,!1,!1,!1,c,null,d,!1,!1,e,!1,null,f)},
jo:function(a,b,c,d,e){return this.aS(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,d,!1,null,e)},
ju:function(a,b,c,d,e,f,g,h){var z,y,x,w,v,u,t
if(b.length===0)return
z=H.b(new Y.oQ().$1(a))+" "
for(y=b.length,x=e-1,w=0,v=0,u=0;u<b.length;b.length===y||(0,H.as)(b),++u){t=b[u]
if(w>0){if(w===1&&J.e(t,C.a.gA(b)))z=z+" "+d
else z=w===x?z+(", "+d):z+","
z+=" "}z+=H.b(this.bY(t.gh(),t.gh(),t,null,this.b));++w
if(w>x||J.e(t,C.a.gA(b))){z+="."
this.jq(0,z.charCodeAt(0)==0?z:z,f,g,h,!0);++v
z=H.n(a,"<also>","also")+" "
w=0}}},
jt:function(a,b,c,d){return this.ju(a,b,c,"and",3,null,null,d)},
eE:function(){return this.n(0,"\n\n",!0)},
bY:function(a,b,c,d,e){var z,y,x,w
if(d!=null){z=J.L(a)
z=z.b3(a,"<owner's> "+H.b(b))!==-1||z.b3(a,"<ownerPronoun's> "+H.b(b))!==-1||z.b3(a,"<object-owner's> "+H.b(b))!==-1||z.b3(a,"<object-ownerPronoun's> "+H.b(b))!==-1}else z=!1
if(z)return a
z=J.L(a)
if(z.b3(a,"<subject's> "+H.b(b))!==-1||z.b3(a,"<subjectPronoun's> "+H.b(b))!==-1)return a
if(c.gaL()!==!0){y=this.c
x=y.j(0,c.gi())
if((x==null?-1:x)<e)w=z.d6(a,b,"the "+H.b(b))
else{w=J.eT(c.gh(),P.bp("[aeiouy]",!1,!1))?z.d6(a,b,"an "+H.b(b)):z.d6(a,b,"a "+H.b(b))
y.p(0,c.gi(),e)}}else w=null
return w==null?a:w},
eM:function(a,b){var z,y
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
dX:function(a){var z=this
return P.aU(function(){var y=a
var x=0,w=2,v,u,t
return function $async$dX(b,c){if(b===1){v=c
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
d1:[function(a){var z=J.am(a)
if(z.b0(a,0)||z.bC(a,this.a.length))return
else{z=this.a
if(a>>>0!==a||a>=z.length)return H.f(z,a)
return z[a].gaW()}},"$1","gaW",2,0,22],
kI:function(a,b){var z
if(!this.aZ(a)||!this.aZ(b))return!1
if(this.eM(a,b)){z=this.a
if(a>=z.length)return H.f(z,a)
z[a].gfg()}return!1},
hn:function(a){var z
for(z=!1;this.geN();z=!0){a.$1(this.hs(!0))
this.kQ()}return z},
hs:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c
z=this.a
y=C.a.bw(z,[],new Y.oT())
C.a.j4(z,new Y.oU(y),!1)
x=a&&this.geN()?C.a.b3(z,C.a.cn(z,new Y.oV()))+1:z.length
if(x<1)return""
for(w=-1,v=!0,u=!1,t=!1,s=0,r="";s<x;++s){q=s===0
if(!q){p=s-1
o=this.eM(p,s)
if(s>=z.length)return H.f(z,s)
if(!z[s].gdF())n=this.kI(s,p)&&this.i3(s,p)
else n=!0
if(n){if(p<0||p>=z.length)return H.f(z,p)
t=!z[p].gdF()}else t=!1
if(s>=z.length)return H.f(z,s)
z[s].sdF(t)
n=s-w
if(n<3)if(!u){if(s>=z.length)return H.f(z,s)
if(!z[s].gi4()){if(p<0||p>=z.length)return H.f(z,p)
if(!z[p].gjT()){if(s>=z.length)return H.f(z,s)
if(!z[s].gdd())if(this.dA(s,p)||o)if(!(t&&n>1)){if(t){if(p>=z.length)return H.f(z,p)
n=z[p].gdF()}else n=!1
n=n||this.l3(s)>4}else n=!0
else n=!0
else n=!0}else n=!0}else n=!0
v=n}else v=!0
else v=!0
if(v){if(p<0||p>=z.length)return H.f(z,p)
if(z[p].gdd()){r+=" "
p=r}else{r+=". "
p=r}if(t){if(s>=z.length)return H.f(z,s)
n=!z[s].gdd()}else n=!1
r=n?r+"But ":p
u=!1}else if(t){r+=S.fQ([" but "," but ",", but "])
u=!this.hQ(s,s+1)&&!0}else{r+=S.fQ([" and "," and ",", and "])
u=!0}}m=this.e5(s)
l=S.bO(m)
p=J.L(l)
if(p.a4(l,"{")===!0||p.a4(l,"}")===!0)$.$get$iw().e1('Storyline result includes { and/or } even after being parsed by Randomly. Is there a dangling bracket here? Input = """'+H.b(m)+'""" Output = """'+H.b(l)+'"""')
n=!v
if(n){k=s-1
k=this.dA(s,k)&&J.eT(this.e5(k),"<subject> ")&&p.dm(l,"<subject> ")}else k=!1
if(k)l=p.d6(l,"<subject> ","")
j=J.dt(l,"<action>",this.e5(s))
p=s-1
k=this.j7(s,p)
if(k)k=!(this.d1(s).gab()===C.n&&this.bs(s).gab()===C.n)
else k=!1
if(k){j=H.n(j,"<object-owner's> <object>","<objectPronounAccusative>")
j=H.n(j,"<object-ownerPronoun's> <object>","<objectPronounAccusative>")
j=H.n(j,"<object>","<objectPronounAccusative>")
j=H.n(j,"<object's>","<objectPronoun's>")}k=this.dA(s,p)
if(k){j=H.n(j,"<owner's> <subject>","<subjectPronoun>")
j=H.n(j,"<ownerPronoun's> <subject>","<subjectPronoun>")
j=H.n(j,"<subject>","<subjectPronoun>")
j=H.n(j,"<subject's>","<subjectPronoun's>")}if(this.d1(p)!=null)if(this.bs(s)!=null)if(this.bs(p)!=null){k=this.d1(p)
k=k==null?k:k.gi()
i=this.bs(s)
if(J.e(k,i==null?i:i.gi())){k=this.bs(p)
k=k==null?k:k.gab()
i=this.bs(s)
k=!J.e(k,i==null?i:i.gab())}else k=!1}else k=!1
else k=!1
else k=!1
if(k){j=H.n(j,"<owner's> <subject>","<subjectPronoun>")
j=H.n(j,"<ownerPronoun's> <subject>","<subjectPronoun>")
j=H.n(j,"<subject>","<subjectPronoun>")
j=H.n(j,"<subject's>","<subjectPronoun's>")}if(this.bs(p)!=null)if(this.d1(s)!=null){k=this.bs(p)
k=k==null?k:k.gi()
i=this.d1(s)
if(J.e(k,i==null?i:i.gi())){p=this.bs(p)
p=p==null?p:p.gab()
k=this.bs(s)
p=!J.e(p,k==null?k:k.gab())}else p=!1}else p=!1
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
if(h.gab()===C.F||h.gab()===C.E){d=H.n(d,"<s>","")
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
i=h.gab().a
d=H.n(d,"<subject>",i)
i=p.db
d=J.cF(this.bY(d,"<subjectNoun>",h,f,i),"<subjectNoun>",h.gh())
c=h.gab().a
d=H.n(d,"<subjectPronoun>",c)
if(C.b.a4(j,P.bp("<subject>.+<subject's>",!0,!1))){c=h.gab().c
d=H.n(d,"<subject's>",c)}d=J.cF(this.bY(d,"<subject's>",h,f,i),"<subject's>",H.b(h.gh())+"'s")
i=h.gab().c
d=H.n(d,"<subject's>",i)
i=h.gab().b
d=H.n(d,"<subjectPronounAccusative>",i)
i=h.gab().d
d=H.n(d,"<subjectPronounSelf>",i)}else d=j
if(g!=null){if(g.gaL()===!0){d=H.n(d,"<subject's> <object>","<object>")
d=H.n(d,"<subjectPronoun's> <object>","<object>")}if(g.gT()===!0){d=H.n(d,"<object>","<objectPronoun>")
d=H.n(d,"<object's>","<objectPronoun's>")}else d=J.dt(this.bY(d,"<object>",g,e,p.db),"<object>",g.gh())
i=g.gab().b
d=H.n(d,"<objectPronoun>",i)
if(C.b.a4(j,P.bp("<object>.+<object's>",!0,!1))){i=g.gab().c
d=H.n(d,"<object's>",i)}d=J.cF(this.bY(d,"<object's>",g,e,p.db),"<object's>",H.b(g.gh())+"'s")
i=g.gab().c
d=H.n(d,"<object's>",i)
i=g.gab().c
d=H.n(d,"<objectPronoun's>",i)
i=g.gab().b
d=H.n(d,"<objectPronounAccusative>",i)
i=g.gab().a
d=H.n(d,"<objectPronounNominative>",i)}if(k){k=h.gab().c
d=H.n(d,"<subjectPronoun's>",k)}p=p.db
j=this.fM(e,this.fM(f,d,j,"<owner>","<owner's>","<ownerPronoun>","<ownerPronoun's>",p),j,"<object-owner>","<object-owner's>","<object-ownerPronoun>","<object-ownerPronoun's>",p)
r+=(!n||q)&&!t?Y.oR(j):j
if(v)w=s
if(s>=z.length)return H.f(z,s)
if(z[s].gdd())u=!0}q=x-1
if(q>=z.length)return H.f(z,q)
z=!z[q].gdd()?r+".":r
return H.wQ(z.charCodeAt(0)==0?z:z,$.$get$hb(),new Y.oW(),null)},
cw:function(){return this.hs(!1)},
kQ:function(){var z,y
if(!this.geN()){C.a.sl(this.a,0)
return}z=this.a
y=C.a.b3(z,C.a.cn(z,new Y.oX()))+1
P.cn(0,y,z.length,null,null,null)
z.splice(0,y-0)},
hQ:function(a,b){var z,y
if(!this.aZ(a)||!this.aZ(b))return!1
if(this.eM(a,b)){z=this.a
if(a>=z.length)return H.f(z,a)
z[a].gfg()}if(!this.dA(a,b))return!1
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
i3:function(a,b){var z,y,x,w,v
if(!this.aZ(a)||!this.aZ(b))return!1
for(z=new P.bd(this.dX(a).a(),null,null,null);z.u();){y=z.c
x=y==null?z.b:y.gU()
for(y=new P.bd(this.dX(b).a(),null,null,null);y.u();){w=y.c
v=w==null?y.b:w.gU()
if(J.e(x.gi(),v.gi()))return!0}}return!1},
e5:[function(a){var z=J.am(a)
if(z.b0(a,0)||z.bC(a,this.a.length))return
else{z=this.a
if(a>>>0!==a||a>=z.length)return H.f(z,a)
return z[a].gba()}},"$1","gba",2,0,14],
bs:[function(a){var z=J.am(a)
if(z.b0(a,0)||z.bC(a,this.a.length))return
else{z=this.a
if(a>>>0!==a||a>=z.length)return H.f(z,a)
return z[a].gb1()}},"$1","gb1",2,0,22],
l3:function(a){var z,y,x
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
k:function(a){return this.cw()},
aZ:function(a){if(a>=this.a.length||a<0)return!1
else return!0},
fM:function(a,b,c,d,e,f,g,h){var z
if(a!=null){z=a.gT()===!0?H.n(H.n(b,d,"you"),e,"your"):J.dt(this.bY(b,d,a,null,h),d,a.gh())
z=H.n(z,f,a.gab().a)
z=H.n(H.n(J.cF(this.bY(C.b.a4(c,P.bp(d+".+"+e,!0,!1))?H.n(z,e,a.gab().c):z,e,a,null,h),e,H.b(a.gh())+"'s"),e,a.gab().c),g,a.gab().c)}else z=H.n(H.n(H.n(H.n(b,d,""),e,""),f,""),g,"")
return z},
j7:function(a,b){var z,y
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
dA:function(a,b){var z,y
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
w:{
oR:function(a){var z,y,x
z=!C.b.a4(a,"\n\n")?C.b.l8(a):a
y=z.length
if(y===0)return z
if(0>=y)return H.f(z,0)
x=z[0].toUpperCase()
if(y===1)return x
else return x+C.b.bL(z,1)}}},oS:{"^":"a:0;",
$1:function(a){return J.e(a.gba(),"\n\n")}},oQ:{"^":"a:23;",
$1:function(a){return C.b.f4(H.n(H.n(a,"<also> ",""),"  "," "))}},oT:{"^":"a:42;",
$2:function(a,b){var z,y,x
z=J.L(a)
y=z.gav(a)?z.gA(a):null
if(y!=null&&y.gkt()&&J.e(b.gji(),y.cx)){x=z.gl(a)
if(typeof x!=="number")return x.at()
z.p(a,x-1,b)}else z.t(a,b)
return a}},oU:{"^":"a:44;a",
$1:function(a){return J.ds(this.a,a)}},oV:{"^":"a:0;",
$1:function(a){return J.e(a.gba(),"\n\n")}},oW:{"^":"a:47;",
$1:function(a){return H.b(a.j(0,1))+H.b(a.j(0,2))+H.b(a.j(0,3))}},oX:{"^":"a:0;",
$1:function(a){return J.e(a.gba(),"\n\n")}},aC:{"^":"mK;aL:a<,h:b<,c,aY:d<,T:e<,ab:f<",
gi:function(){return H.aE(this)},
gc2:function(){return!0},
gaI:function(){return!0},
w:{
c9:function(a,b,c,d,e){var z=H.q([],[P.p])
return new Y.aC(c,b,z,e==null?$.$get$aL():e,!1,d)}}},mK:{"^":"d+dA;"},dA:{"^":"d;",
gaq:function(){return this.gaI()&&this.gc2()===!0},
a9:function(a,b,c,d,e,f,g,h,i,j,k,l,m){J.iV(a,b,c,d,e,f,g,h,i,j,k,H.F(this,"$isaC"),!1,m)},
bj:function(a,b,c){return this.a9(a,b,null,!1,!1,!1,!1,null,null,null,c,!1,!1)},
aB:function(a,b,c){return this.a9(a,b,null,!1,!1,!1,!1,null,null,null,!1,!1,c)},
a6:function(a,b){return this.a9(a,b,null,!1,!1,!1,!1,null,null,null,!1,!1,!1)},
aj:function(a,b,c){return this.a9(a,b,null,c,!1,!1,!1,null,null,null,!1,!1,!1)},
dO:function(a,b,c,d){return this.a9(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,d)},
kX:function(a,b,c,d,e){return this.a9(a,b,null,c,!1,!1,!1,d,null,null,!1,!1,e)},
ac:function(a,b,c){return this.a9(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,!1)},
hx:function(a,b,c,d){return this.a9(a,b,null,!1,!1,!1,c,null,null,null,d,!1,!1)},
dQ:function(a,b,c,d,e,f){return this.a9(a,b,null,!1,!1,!1,!1,c,d,e,f,!1,!1)},
dQ:function(a,b,c,d,e,f){return this.a9(a,b,null,!1,!1,!1,!1,c,d,e,f,!1,!1)},
aE:function(a,b,c){return this.a9(a,b,null,!1,!1,!1,c,null,null,null,!1,!1,!1)},
c6:function(a,b,c,d){return this.a9(a,b,null,!1,c,!1,d,null,null,null,!1,!1,!1)},
kW:function(a,b,c,d,e){return this.a9(a,b,null,c,!1,!1,!1,d,null,null,e,!1,!1)},
eY:function(a,b,c,d){return this.a9(a,b,null,c,!1,!1,!1,null,null,null,d,!1,!1)},
eY:function(a,b,c,d){return this.a9(a,b,null,c,!1,!1,!1,null,null,null,d,!1,!1)},
bS:function(a,b,c,d){return this.a9(a,b,null,c,!1,!1,!1,d,null,null,!1,!1,!1)},
bT:function(a,b,c,d,e){return this.a9(a,b,c,!1,!1,!1,!1,d,null,null,e,!1,!1)},
eX:function(a,b,c,d){return this.a9(a,b,null,c,!1,!1,d,null,null,null,!1,!1,!1)},
bp:function(a,b,c,d){return this.a9(a,b,null,!1,!1,!1,!1,c,null,null,d,!1,!1)},
c6:function(a,b,c,d){return this.a9(a,b,null,!1,c,!1,d,null,null,null,!1,!1,!1)},
dP:function(a,b,c,d,e){return this.a9(a,b,c,!1,!1,d,!1,e,null,null,!1,!1,!1)},
hw:function(a,b,c,d){return this.a9(a,b,null,!1,!1,!1,c,d,null,null,!1,!1,!1)},
hv:function(a,b,c,d){return this.a9(a,b,c,!1,!1,d,!1,null,null,null,!1,!1,!1)},
kZ:function(a,b,c,d,e,f){return this.a9(a,b,c,d,!1,e,!1,f,null,null,!1,!1,!1)},
c7:function(a,b,c,d,e){return this.a9(a,b,c,d,!1,e,!1,null,null,null,!1,!1,!1)},
hu:function(a,b,c){return this.a9(a,b,c,!1,!1,!1,!1,null,null,null,!1,!1,!1)},
kU:function(a,b,c,d){return this.a9(a,b,c,!1,!1,!1,!1,d,null,null,!1,!1,!1)},
eZ:function(a,b,c,d){return this.a9(a,b,null,!1,!1,!1,!1,c,d,null,!1,!1,!1)},
kY:function(a,b,c,d,e){return this.a9(a,b,null,!1,c,!1,!1,d,null,null,e,!1,!1)},
l_:function(a,b,c,d,e,f){return this.a9(a,b,null,!1,c,!1,!1,d,e,null,f,!1,!1)},
eX:function(a,b,c,d){return this.a9(a,b,null,c,!1,!1,d,null,null,null,!1,!1,!1)},
kV:function(a,b,c,d){return this.a9(a,b,null,!1,c,!1,!1,null,null,null,d,!1,!1)}},cl:{"^":"d;a,b,c,d",
k:function(a){return this.a}}}],["","",,L,{"^":"",ty:{"^":"a:0;",
$1:function(a){a.gcQ().b=2
return 2}},t_:{"^":"a:0;",
$1:function(a){a.gcQ().b=0
return 0}},tx:{"^":"a:0;",
$1:function(a){a.gcQ().b=1
return 1}},hl:{"^":"d;",
hf:function(a){var z,y
z=this.a
y=a.gi()
return z==null?y==null:z===y}},qh:{"^":"hl;i:a<",
a2:function(a){var z=new L.br(null,null)
z.m(this)
a.$1(z)
return z.q()},
B:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof L.hl))return!1
z=this.a
y=b.a
return z==null?y==null:z===y},
gD:function(a){return Y.V(Y.k(0,J.j(this.a)))},
k:function(a){return"Team {id="+J.h(this.a)+",\n}"},
w:{
ef:function(a){var z=new L.br(null,null)
a.$1(z)
return z.q()}}},br:{"^":"d;a,b",
gi:function(){return this.gcQ().b},
gcQ:function(){var z=this.a
if(z!=null){this.b=z.a
this.a=null}return this},
m:function(a){this.a=a},
q:function(){var z,y
z=this.a
if(z==null){y=this.gcQ().b
z=new L.qh(y)
if(y==null)H.i(P.l("id"))}this.m(z)
return z}}}],["","",,O,{"^":"",pK:{"^":"d;a"}}],["","",,X,{"^":"",
i4:function(a,b){return P.aU(function(){var z=a,y=b
var x=0,w=1,v,u,t,s,r,q
return function $async$i4(c,d){if(c===1){v=d
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
case 1:return P.aT(v)}}})}}],["","",,A,{"^":"",a4:{"^":"d;eA:a<,aD:b<,c,d,e,f,V:r<,x",
gjG:function(){var z=this.f
return z.length!==0?C.a.gA(z):null},
gD:function(a){var z,y,x,w,v
z=X.bB(this.a)
y=X.bB(this.d)
x=X.bB(this.f)
w=this.r
v=this.c
v=X.df(X.b2(X.b2(0,C.e.gD(w)),J.j(v)))
return X.df(X.b2(X.b2(X.b2(X.b2(0,z&0x1FFFFFFF),y&0x1FFFFFFF),x&0x1FFFFFFF),v&0x1FFFFFFF))},
B:function(a,b){var z
if(b==null)return!1
z=J.o(b)
return!!z.$isa4&&this.gD(this)===z.gD(b)},
ck:function(a){var z,y
z=this.hO(a,!0)
y=z.ga_(z)
if(y.u()){y.gU()
return!0}return!1},
ap:function(a){var z,y
z=this.hN(a)
y=z.ga_(z)
if(y.u()){y.gU()
return!0}return!1},
h2:function(a){var z,y,x
z=this.du(a)
if(z==null)throw H.c(new P.w("Tried to elapseSituationTime of situation id="+H.b(a)+" that doesn't exist in situations ("+H.b(this.f)+")."))
y=this.f
if(z!==(z|0)||z>=y.length)return H.f(y,z)
x=y[z].ay()
if(z!==(z|0)||z>=y.length)return H.f(y,z)
y[z]=x},
ay:function(){++this.r},
df:function(a,b,c,d,e){var z=this.d
if(a!=null)z=z.dn(0,new A.pP(a))
if(b!=null)z=z.ca(0,new A.pQ(b))
if(c!=null)z=z.ca(0,new A.pR(c))
if(e!=null)z=z.ca(0,new A.pS(e))
return d!=null?z.ca(0,new A.pT(d)):z},
hN:function(a){return this.df(a,null,null,null,null)},
hO:function(a,b){return this.df(a,null,null,null,b)},
hP:function(a,b,c){return this.df(a,b,null,null,c)},
v:function(a){return this.a.bJ(0,new A.pU(a))},
e_:function(a){return this.e.bJ(0,new A.pV(a))},
f7:function(a){var z,y
z=this.du(a)
if(z==null)return
y=this.f
if(z!==(z|0)||z>=y.length)return H.f(y,z)
return y[z]},
ah:function(a){var z,y
for(z=this.f,y=z.length-1;y>=0;--y){if(y>=z.length)return H.f(z,y)
if(J.e(z[y].gh(),a)){if(y>=z.length)return H.f(z,y)
return z[y]}}throw H.c(P.G("No situation with name="+a+" found."))},
kc:function(a){var z=this.a.aU(0,new A.pW(a),new A.pX())
if(z==null)return!1
return z.gaI()},
aA:function(){var z,y
z=this.f
y=C.a.gA(z)
y.d2(this)
C.a.a3(z,y)},
aX:function(a){var z,y
z=this.f
while(!0){if(!(z.length!==0&&!J.e(C.a.gA(z).gh(),a)))break
y=C.a.gA(z)
y.d2(this)
C.a.a3(z,y)}if(z.length===0)throw H.c(P.G("Tried to pop situations until "+a+" but none was found in stack."))},
c5:function(a,b){var z,y
z=this.du(a)
if(z==null)throw H.c(P.G("Situation with id "+H.b(a)+" does not exist in "+H.b(this.f)))
y=this.f
if(z!==(z|0)||z>=y.length)return H.f(y,z)
y[z]=b},
f2:function(a,b,c,d,e){var z,y,x,w
z=this.df(a,b,c,d,e)
y=z.ga_(z)
if(y.u()){x=y.gU()
y=this.r
w=x.gV()
if(typeof w!=="number")return H.x(w)
return y-w}return},
l2:function(a,b,c){return this.f2(null,a,b,c,null)},
cA:function(a,b,c){return this.f2(a,null,b,null,c)},
dR:function(a){return this.f2(a,null,null,null,null)},
k:function(a){var z,y
z=this.a
y=z.en()
y.ax(0,z)
return"World<"+P.cg(y,"{","}")+">"},
X:function(a,b){var z,y,x
z=this.v(a)
y=z.a2(b)
x=this.a
x.a3(0,z)
x.t(0,y)},
du:function(a){var z,y,x
y=this.f
x=0
while(!0){if(!(x<y.length)){z=null
break}if(J.e(y[x].gi(),a)){z=x
break}++x}return z},
ik:function(a){this.a.ax(0,a.a)
this.d.ax(0,a.d)
this.b.ax(0,a.b)
this.e.ax(0,a.e)
C.a.ax(this.f,a.f)
this.r=a.r},
w:{
ed:function(a){var z,y,x,w
z=P.a6(null,null,null,R.A)
y=P.bb(null,O.cG)
x=P.a6(null,null,null,U.ae)
w=P.a6(null,null,null,null)
w=new A.a4(z,x,a.c,y,w,[],null,null)
w.ik(a)
return w}}},pP:{"^":"a:0;a",
$1:function(a){return a.gdC()===this.a}},pQ:{"^":"a:0;a",
$1:function(a){return J.e(a.gcv(),this.a.gi())}},pR:{"^":"a:0;a",
$1:function(a){return a.gfh().a4(0,this.a.gi())}},pS:{"^":"a:0;a",
$1:function(a){return a.ghJ()===this.a}},pT:{"^":"a:0;a",
$1:function(a){return a.ghH()===this.a}},pU:{"^":"a:0;a",
$1:function(a){return J.e(a.gi(),this.a)}},pV:{"^":"a:0;a",
$1:function(a){return J.e(a.gh(),this.a)}},pW:{"^":"a:0;a",
$1:function(a){return J.e(a.gi(),this.a)}},pX:{"^":"a:2;",
$0:function(){return}}}],["","",,A,{"^":"",S:{"^":"ag;a1:b<"},fZ:{"^":"S;c,d,W:e<,J:f<,h:r<,b,a",
gK:function(){return!1},
gO:function(){return!1},
gL:function(){return H.i(new P.w("Not rerollable"))},
P:[function(a,b,c){throw H.c(new P.w("SimpleAction always succeeds"))},"$3","gM",6,0,1],
R:[function(a,b,c){return this.c.$4(a,b,c,this)},"$3","gN",6,0,1],
aa:function(a,b){throw H.c(new P.w("SimpleAction shouldn't have to provide roll reason"))},
I:function(a,b){return 1},
H:function(a,b){var z=this.d
if(z==null)return!0
return z.$3(a,b,this)}}}],["","",,N,{"^":"",k6:{"^":"z;K:c<,a1:d<,J:e<,O:f<,L:r<,b,a",
ga8:function(){return"confuse <object>"},
gh:function(){return"Confuse"},
gag:function(){return"will <subject> confuse <object>?"},
P:[function(a,b,c){var z
a.a6(c,"<subject> touch<es> <subject's> temple")
z=this.b
a.ac(c,"<subject> tr<ies> to {channel|implant} {terror|confusion} into <object's> mind",z)
a.eX(c,"<subject> fail<s>",!0,!0)
return H.b(a.gh())+" fails to confuse "+H.b(z.gh())},"$3","gM",6,0,1],
R:[function(a,b,c){var z
a.a6(c,"<subject> touch<es> <subject's> temple")
z=this.b
a.bp(c,"<subject> {channel<s>|implant<s>} {terror|confusion} into <object's> mind",z,!0)
z.aE(c,"<subject's> eyes go wide with terror",!0)
b.X(z.gi(),new N.k7())
return H.b(a.gh())+" confuses "+H.b(z.gh())},"$3","gN",6,0,1],
I:function(a,b){return 0.6},
H:function(a,b){var z
if(a.gT()===!0)if(a.ga5()){z=b.a
z=new H.K(z,new N.k8(this),[H.m(z,0)])
z=z.gl(z)>=2&&this.b.gc3()!==!0}else z=!1
else z=!1
return z},
w:{
x5:[function(a){return new N.k6(!0,!0,"Channeling the terror of the Dead Prince into lesser minds is something you've been practicing. It makes the target rabid and disoriented. They might attack their own.",!0,C.c,a,null)},"$1","tV",2,0,4]}},k7:{"^":"a:0;",
$1:function(a){a.sc3(!0)
return a}},k8:{"^":"a:0;a",
$1:function(a){return a.gaI()&&a.gaY().hf(this.a.b.gaY())}}}],["","",,V,{"^":"",kv:{"^":"z;O:c<,L:d<,K:e<,a1:f<,J:r<,b,a",
ga8:function(){return"kick <object's> weapon off"},
gh:function(){return"DisarmKick"},
gag:function(){return"will <subject> kick the weapon off?"},
P:[function(a,b,c){S.a7(new V.kw(this,a,c),new V.kx(this,a,c),null,null)
return H.b(a.gh())+" fails to kick "+H.b(this.b.gh())+"'s weapon off"},"$3","gM",6,0,1],
R:[function(a,b,c){var z,y
S.a7(new V.ky(this,a,c),new V.kz(this,a,c),null,null)
z=b.f
y=z.length!==0?C.a.gA(z):null
b.c5(y.gi(),y.a2(new V.kA(this)))
z=this.b
b.X(z.gi(),new V.kB())
return H.b(a.gh())+" kicks "+H.b(z.gh())+"'s weapon off"},"$3","gN",6,0,1],
I:function(a,b){var z=a.ga5()?0:0.2
if(a.cx===!0)return 0.7-z
return 0.5-z},
H:function(a,b){var z
if(a.ga5()||a.fr===C.h){z=this.b
z=z.ga0()&&!z.gaz()}else z=!1
return z},
w:{
x8:[function(a){return new V.kv(!0,C.c,!0,!0,"When enemies are on the ground, you can try to kick their weapon off to disarm them.",a,null)},"$1","ud",2,0,4]}},kw:{"^":"a:2;a,b,c",
$0:function(){var z,y
z=this.b
y=this.c
z.ac(y,"<subject> kick<s> {at|towards} <object's> weapon",this.a.b)
z.aj(y,"<subject> mi<sses>",!0)}},kx:{"^":"a:2;a,b,c",
$0:function(){var z,y
z=this.c
y=this.a.b
this.b.ac(z,"<subject> kick<s> <object's> weapon",y)
y.aj(z,"<subject> hold<s> onto it",!0)}},ky:{"^":"a:2;a,b,c",
$0:function(){var z=this.a.b
this.b.l_(this.c,"<subject> kick<s> <object-owner's> <object> off <object-owner's> hand",!0,z.gS(),z,!0)}},kz:{"^":"a:2;a,b,c",
$0:function(){var z,y
z=this.c
y=this.a.b
this.b.bp(z,"<subject> kick<s> <object's> {right|} hand",y,!0)
z.bX(0,"<owner's> <subject> fl<ies> away",y,y.gS())}},kA:{"^":"a:13;a",
$1:function(a){a.gbn().t(0,this.a.b.gS())
return a}},kB:{"^":"a:0;",
$1:function(a){a.sS($.$get$dj())
return a}}}],["","",,R,{"^":"",mg:{"^":"z;O:c<,L:d<,K:e<,a1:f<,J:r<,b,a",
gh:function(){return"KickToGround"},
ga8:function(){return"kick <object> to the ground"},
gag:function(){return"will <subject> kick <object> prone?"},
P:[function(a,b,c){S.a7(new R.mh(this,a,c),new R.mi(this,a,c),null,null)
return H.b(a.gh())+" fails to sweep "+H.b(this.b.gh())+" off feet"},"$3","gM",6,0,1],
R:[function(a,b,c){var z
S.a7(new R.mj(this,a,c),new R.mk(this,a,c,U.bA(b)),null,null)
z=this.b
b.X(z.gi(),new R.ml())
return H.b(a.gh())+" sweeps "+H.b(z.gh())+" off feet"},"$3","gN",6,0,1],
I:function(a,b){var z=a.ga5()?0:0.2
if(a.cx===!0)return 0.7-z
return 0.5-z},
H:function(a,b){return(a.ga5()||a.fr===C.h)&&!this.b.ga0()},
w:{
xp:[function(a){return new R.mg(!0,C.c,!0,!0,"Sweeping opponents off their feet doesn't deal much damage but on the ground they will be much easier targets for you and your allies.",a,null)},"$1","v7",2,0,4]}},mh:{"^":"a:2;a,b,c",
$0:function(){var z,y
z=this.b
y=this.c
z.ac(y,"<subject> kick<s> {at|towards} <object's> feet",this.a.b)
z.aj(y,"<subject> mi<sses>",!0)}},mi:{"^":"a:2;a,b,c",
$0:function(){var z,y
z=this.c
y=this.a.b
this.b.ac(z,"<subject> kick<s> <object's> shin",y)
y.aj(z,"<subject> <does>n't budge",!0)}},mj:{"^":"a:2;a,b,c",
$0:function(){this.b.kY(this.c,"<subject> kick<s> <object> off <object's> feet and to the ground",!0,this.a.b,!0)}},mk:{"^":"a:2;a,b,c,d",
$0:function(){var z,y
z=this.c
y=this.a.b
this.b.bp(z,"<subject> kick<s> <object's> {right|left} shin",y,!0)
y.a6(z,"<subject> {grunt|shriek}<s>")
y.aE(z,"<subject> fall<s> to the "+H.b(this.d),!0)}},ml:{"^":"a:0;",
$1:function(a){a.sai(C.f)
return a}}}],["","",,F,{"^":"",n4:{"^":"ag;J:b<,K:c<,a1:d<,O:e<,L:f<,a",
gW:function(){return"Stand off."},
gh:function(){return"Pass"},
P:[function(a,b,c){throw H.c(new P.Z(null))},"$3","gM",6,0,1],
R:[function(a,b,c){if(a.gT()===!0)a.a6(c,"<subject> stand<s> off")
return H.b(a.gh())+" passes the opportunity"},"$3","gN",6,0,1],
aa:function(a,b){return"WARNING this shouldn't be user-visible"},
I:function(a,b){return 1},
H:function(a,b){return!0}}}],["","",,Y,{"^":"",ni:{"^":"z;O:c<,L:d<,K:e<,a1:f<,J:r<,b,a",
ga8:function(){return"force <object> off balance"},
gh:function(){return"Pound"},
gag:function(){return"will <subject> force <object> off balance?"},
P:[function(a,b,c){var z=this.b
a.eZ(c,"<subject> {fiercely|violently} {strike<s>|hammer<s>|batter<s>} on <object-owner's> {<object>|weapon}",z.gS(),z)
z.bj(c,"<subject> {retain<s>|keep<s>} <subject's> {|combat} {stance|footing}",!0)
return H.b(a.gh())+" kicks "+H.b(z.dx)+" off balance"},"$3","gM",6,0,1],
R:[function(a,b,c){var z=this.b
a.eZ(c,"<subject> {fiercely|violently} {strike<s>|hammer<s>|batter<s>} on <object-owner's> {<object>|weapon}",z.gS(),z)
if(z.ga5()){z.hw(c,"<subject> lose<s> <object>",!0,$.$get$ex())
b.X(z.y,new Y.nj())
C.a.t(b.f,U.mL(z,a))
return H.b(a.gh())+" pounds "+H.b(z.dx)+" off balance"}else if(z.gar()){z.a6(c,"<subject> <is> already off balance")
c.eB(0,"<subject> make<s> <object> fall to the "+H.b(U.bA(b)),z,$.$get$iA())
b.X(z.y,new Y.nk())
return H.b(a.gh())+" pounds "+H.b(z.dx)+" to the ground"}throw H.c(new P.w("enemy pose must be either standing or off-balance"))},"$3","gN",6,0,1],
I:function(a,b){var z=a.ga5()?0:0.2
if(a.cx===!0)return 0.7-z
return 0.5-z},
H:function(a,b){var z,y
if(!a.ga0()){z=a.e
if(z.gaV()||z.gkr()){z=this.b
if(!z.gS().gcl()){z.gS().geH()
y=!1}else y=!0
z=y&&!z.ga0()}else z=!1}else z=!1
return z},
w:{
xx:[function(a){return new Y.ni(!0,C.c,!0,!0,"Forcing enemies off balance often means hitting them heavily several times in a row. The goal is not to deal damage but to force the opponent to lose control of their combat stance. It can also give members of your party an opportunity to strike.",a,null)},"$1","vi",2,0,4]}},nj:{"^":"a:0;",
$1:function(a){a.sai(C.h)
return a}},nk:{"^":"a:0;",
$1:function(a){a.sai(C.f)
return a}}}],["","",,B,{"^":"",nG:{"^":"ag;J:b<,K:c<,a1:d<,O:e<,L:f<,a",
gW:function(){return"Regain balance."},
gh:function(){return"RegainBalance"},
P:[function(a,b,c){throw H.c(new P.Z(null))},"$3","gM",6,0,1],
R:[function(a,b,c){if(a.gT()===!0)a.bp(c,"<subject> regain<s> <object>",$.$get$ex(),!0)
b.X(a.gi(),new B.nH())
return H.b(a.gh())+" regains balance"},"$3","gN",6,0,1],
aa:function(a,b){return"Will "+a.gab().a+" regain balance?"},
I:function(a,b){return 1},
H:function(a,b){return a.gar()}},nH:{"^":"a:0;",
$1:function(a){a.sai(C.k)
return C.k}}}],["","",,O,{"^":"",nW:{"^":"ag;J:b<,K:c<,a1:d<,O:e<,L:f<,a",
gW:function(){return"Scramble."},
gh:function(){return"Scramble"},
P:[function(a,b,c){throw H.c(new P.Z(null))},"$3","gM",6,0,1],
R:[function(a,b,c){a.a6(c,"<subject> tr<ies> to {scramble|crawl} out of {reach|harm's way}")
return H.b(a.gh())+" scrambles on ground"},"$3","gN",6,0,1],
aa:function(a,b){return"Will "+a.gab().a+" crawl out of harm's way?"},
I:function(a,b){return 1},
H:function(a,b){if(!a.ga0())return!1
if(A.dp(a,b))return!0
return!1}}}],["","",,Q,{"^":"",oF:{"^":"ag;J:b<,K:c<,a1:d<,O:e<,L:f<,a",
gW:function(){return"Stand up."},
gh:function(){return"StandUp"},
P:[function(a,b,c){throw H.c(new P.Z(null))},"$3","gM",6,0,1],
R:[function(a,b,c){a.a6(c,"<subject> {rise<s>|stand<s> up|get<s> to <subject's> feet|get<s> up|pick<s> <subjectPronounSelf> up}")
S.a7(new Q.oG(a,c),new Q.oH(a,c),null,null)
b.X(a.gi(),new Q.oI())
return H.b(a.gh())+" stands up"},"$3","gN",6,0,1],
aa:function(a,b){return"Will "+a.gab().a+" stand up?"},
I:function(a,b){return 1},
H:function(a,b){if(!a.ga0())return!1
if(A.dp(a,b))return!1
return!0}},oG:{"^":"a:2;a,b",
$0:function(){return this.a.a6(this.b,"<subject> {stagger<s>|sway<s>} back before finding balance")}},oH:{"^":"a:2;a,b",
$0:function(){return this.a.a6(this.b,"<subject> stead<ies> <subjectPronounSelf>")}},oI:{"^":"a:0;",
$1:function(a){a.sai(C.k)
return C.k}}}],["","",,T,{"^":"",
y_:[function(a){return new A.a2(T.eH(),null,null,new T.vv(),new T.vw(),new T.vx(),null,!0,"This move is hard, but when succesful, it's decisive.",!0,!0,"StartBreakNeckOnGround",!1,null,"break <object's> neck",null,a,null)},"$1","wz",2,0,4],
y0:[function(a){return new A.a2(T.eH(),new T.vy(),T.eH(),new T.vz(),new T.vA(),new T.vB(),new T.vC(),!0,"This move is hard, but when succesful, it's decisive.",!0,!0,"StartBreakNeckOnGroundPlayer",!0,C.c,"break <object's> neck","will <subject> succeed?",a,null)},"$1","wA",2,0,4],
y1:[function(a,b,c,d,e){a.ac(c,"<subject> throw<s> <subjectPronounSelf> {on|upon} <object>",d)
b.X(a.gi(),new T.vD())},"$5","eH",10,0,8],
vv:{"^":"a:3;",
$3:function(a,b,c){return a.gT()!==!0&&c.ga0()&&a.gaz()&&c.gaz()}},
vw:{"^":"a:3;",
$3:function(a,b,c){return Y.f0(a,c)}},
vx:{"^":"a:3;",
$3:function(a,b,c){return S.dW(a,c,C.l)}},
vz:{"^":"a:3;",
$3:function(a,b,c){return a.gT()===!0&&c.ga0()&&a.gaz()&&c.gaz()}},
vA:{"^":"a:3;",
$3:function(a,b,c){return Y.f0(a,c)}},
vB:{"^":"a:3;",
$3:function(a,b,c){return S.dW(a,c,C.m)}},
vy:{"^":"a:3;",
$3:function(a,b,c){return 0.7}},
vC:{"^":"a:3;",
$3:function(a,b,c){return S.dW(a,c,C.p)}},
vD:{"^":"a:0;",
$1:function(a){a.sai(C.f)
return a}}}],["","",,A,{"^":"",a2:{"^":"z;c,d,e,f,r,x,y,z,J:Q<,K:ch<,a1:cx<,h:cy<,O:db<,L:dx<,a8:dy<,ag:fr<,b,a",
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
y2:[function(a){return new A.a2(M.eI(),null,null,new M.vE(),new M.vF(),new M.vG(),null,!0,"Jumping and tackling an opponent is one of the most risky moves but it's a quick way to neutralize someone.",!0,!0,"StartLeap",!1,null,"leap at <object>",null,a,null)},"$1","wB",2,0,4],
y3:[function(a){return new A.a2(M.eI(),new M.vH(),M.eI(),new M.vI(),new M.vJ(),new M.vK(),new M.vL(),!0,"Jumping and tackling an opponent is one of the most risky moves but it's a quick way to neutralize someone.",!0,!0,"StartLeapPlayer",!0,C.c,"leap at <object>","will <subject> tackle <objectPronoun>?",a,null)},"$1","wC",2,0,4],
y4:[function(a,b,c,d,e){if(a.ga0()){a.hu(c,"<subject> roll<s>",e.gi())
a.hu(c,"<subject> put<s> <subject's> feet under <subjectPronounAccusative>",e.gi())}a.kU(c,"<subject> {leap<s>|jump<s>|spring<s>|launch<es> <subjectPronounSelf>|lunge<s>} at <object>",e.gi(),d)},"$5","eI",10,0,8],
vE:{"^":"a:3;",
$3:function(a,b,c){var z,y
if(a.gT()!==!0){if(!a.gaz()){z=a.go
y=$.$get$bz()
z=z.a
y=y.a
y=z==null?y==null:z===y
z=y}else z=!0
z=z&&!c.ga0()&&!A.dp(a,b)}else z=!1
return z}},
vF:{"^":"a:3;",
$3:function(a,b,c){return F.fs(a,c)}},
vG:{"^":"a:3;",
$3:function(a,b,c){return V.dL(a,c,C.l)}},
vI:{"^":"a:3;",
$3:function(a,b,c){return a.gT()===!0&&a.gaz()&&!c.ga0()&&!A.dp(a,b)}},
vJ:{"^":"a:3;",
$3:function(a,b,c){return F.fs(a,c)}},
vK:{"^":"a:3;",
$3:function(a,b,c){return V.dL(a,c,C.m)}},
vH:{"^":"a:3;",
$3:function(a,b,c){return a.ga5()?0.4:0.2}},
vL:{"^":"a:3;",
$3:function(a,b,c){return V.dL(a,c,C.p)}}}],["","",,U,{"^":"",
y5:[function(a){return new A.a2(U.eJ(),null,null,new U.vM(),new U.vN(),new U.vO(),null,!0,"Punching someone hard enough can cause them to lose their footing. And it hurts.",!0,!0,"StartPunch",!1,null,"punch <object>",null,a,null)},"$1","wD",2,0,4],
y6:[function(a){return new A.a2(U.eJ(),new U.vP(),U.eJ(),new U.vQ(),new U.vR(),new U.vS(),new U.vT(),!0,"Punching someone hard enough can cause them to lose their footing. And it hurts.",!0,!0,"StartPunchPlayer",!0,C.c,"punch <object>","will <subject> hit <objectPronoun>?",a,null)},"$1","wE",2,0,4],
y7:[function(a,b,c,d,e){c.jp(0,"<subject> {thrust<s>|swing<s>} <subject's> fist at <object>",e.gi(),!0,d,a)},"$5","eJ",10,0,8],
vM:{"^":"a:3;",
$3:function(a,b,c){var z
if(a.gT()!==!0)z=(a.ga5()||a.fr===C.h)&&!c.ga0()&&a.gaz()
else z=!1
return z}},
vN:{"^":"a:3;",
$3:function(a,b,c){return Q.fP(a,c)}},
vO:{"^":"a:3;",
$3:function(a,b,c){return Z.e3(a,c,C.l)}},
vQ:{"^":"a:3;",
$3:function(a,b,c){var z
if(a.gT()===!0)z=(a.ga5()||a.fr===C.h)&&!c.ga0()&&a.gaz()
else z=!1
return z}},
vR:{"^":"a:3;",
$3:function(a,b,c){return Q.fP(a,c)}},
vS:{"^":"a:3;",
$3:function(a,b,c){return Z.e3(a,c,C.m)}},
vP:{"^":"a:3;",
$3:function(a,b,c){return 0.7}},
vT:{"^":"a:3;",
$3:function(a,b,c){return Z.e3(a,c,C.p)}}}],["","",,G,{"^":"",
y8:[function(a){return new A.a2(G.eK(),null,null,new G.vW(),new G.vX(),new G.vY(),null,!0,"The basic swordfighting move is also often the most effective.",!0,!0,"StartSlash",!1,null,"swing at <object>",null,a,null)},"$1","wF",2,0,4],
yd:[function(a){return new A.a2(G.eK(),new G.w6(),G.eK(),new G.w7(),new G.w8(),new G.w9(),new G.wa(),!0,"The basic swordfighting move is also often the most effective.",!0,!0,"StartSlashPlayer",!0,C.c,"swing at <object>","will <subject> hit <objectPronoun>?",a,null)},"$1","wG",2,0,4],
ye:[function(a,b,c,d,e){return a.dP(c,"<subject> swing<s> {"+H.b(U.ab(a))+" |}at <object>",e.gi(),!0,d)},"$5","eK",10,0,8],
vW:{"^":"a:3;",
$3:function(a,b,c){return a.gT()!==!0&&a.ga5()&&!c.ga0()&&a.e.gaV()}},
vX:{"^":"a:3;",
$3:function(a,b,c){return M.bc(a,c)}},
vY:{"^":"a:3;",
$3:function(a,b,c){return L.aP(a,c,C.l)}},
w7:{"^":"a:3;",
$3:function(a,b,c){return a.gT()===!0&&a.ga5()&&!c.ga0()&&a.e.gaV()}},
w8:{"^":"a:3;",
$3:function(a,b,c){return M.bc(a,c)}},
w9:{"^":"a:3;",
$3:function(a,b,c){return L.aP(a,c,C.m)}},
w6:{"^":"a:3;",
$3:function(a,b,c){return 0.7-(c.gam()!=null?0.2:0)}},
wa:{"^":"a:3;",
$3:function(a,b,c){return L.aP(a,c,C.p)}}}],["","",,R,{"^":"",
y9:[function(a,b,c,d,e){return a.hw(c,"<subject> completely miss<es> <object> with "+H.b(U.ab(a)),!0,d)},"$5","iG",10,0,11],
ya:[function(a){return new A.a2(R.iH(),new R.vZ(),R.iG(),new R.w_(),new R.w0(),new R.w1(),null,!1,"It's always better to fight with your feet firmly on the ground. But sometimes, it's necessary to act quickly.",!0,!0,"StartSlashOutOfBalance",!1,null,"swing at <object> (while out of balance)",null,a,null)},"$1","wH",2,0,4],
yb:[function(a){return new A.a2(R.iH(),new R.w2(),R.iG(),new R.w3(),new R.w4(),new R.w5(),null,!1,"It's always better to fight with your feet firmly on the ground. But sometimes, it's necessary to act quickly.",!0,!0,"StartSlashOutOfBalancePlayer",!1,null,"swing at <object> (while out of balance)",null,a,null)},"$1","wI",2,0,4],
yc:[function(a,b,c,d,e){return a.dP(c,"<subject> swing<s> {"+H.b(U.ab(a))+" |}at <object>",e.gi(),!0,d)},"$5","iH",10,0,8],
w_:{"^":"a:3;",
$3:function(a,b,c){return a.gT()!==!0&&a.gar()&&!c.ga0()&&a.e.gaV()}},
w0:{"^":"a:3;",
$3:function(a,b,c){return M.bc(a,c)}},
w1:{"^":"a:3;",
$3:function(a,b,c){return L.aP(a,c,C.l)}},
vZ:{"^":"a:3;",
$3:function(a,b,c){return 0.7}},
w3:{"^":"a:3;",
$3:function(a,b,c){return a.gT()===!0&&a.gar()&&!c.ga0()&&a.e.gaV()}},
w4:{"^":"a:3;",
$3:function(a,b,c){return M.bc(a,c)}},
w5:{"^":"a:3;",
$3:function(a,b,c){return L.aP(a,c,C.m)}},
w2:{"^":"a:3;",
$3:function(a,b,c){return 0.5-(c.gam()!=null?0.2:0)}}}],["","",,D,{"^":"",
yf:[function(a){return new A.a2(D.eL(),null,null,new D.wb(),new D.wc(),new D.wd(),null,!0,"Opponents on the ground are often the most vulnerable.",!0,!0,"StartStrikeDown",!1,null,"strike down at <object>",null,a,null)},"$1","wJ",2,0,4],
yg:[function(a){return new A.a2(D.eL(),new D.we(),D.eL(),new D.wf(),new D.wg(),new D.wh(),new D.wi(),!0,"Opponents on the ground are often the most vulnerable.",!0,!0,"StartStrikeDownPlayer",!0,C.c,"strike down at <object>","will <subject> hit?",a,null)},"$1","wK",2,0,4],
yh:[function(a,b,c,d,e){return a.ac(c,"<subject> strike<s> down {with "+H.b(U.ab(a))+" |}at <object>",d)},"$5","eL",10,0,11],
wb:{"^":"a:3;",
$3:function(a,b,c){return a.gT()!==!0&&c.ga0()&&!a.ga0()&&a.e.gaV()}},
wc:{"^":"a:3;",
$3:function(a,b,c){return D.d6(a,c)}},
wd:{"^":"a:3;",
$3:function(a,b,c){return V.bJ(a,c,C.l)}},
wf:{"^":"a:3;",
$3:function(a,b,c){return a.gT()===!0&&c.ga0()&&!a.ga0()&&a.e.gaV()}},
wg:{"^":"a:3;",
$3:function(a,b,c){return D.d6(a,c)}},
wh:{"^":"a:3;",
$3:function(a,b,c){return V.bJ(a,c,C.m)}},
we:{"^":"a:3;",
$3:function(a,b,c){var z,y
z=a.gar()?0.2:0
y=c.gam()!=null?0.2:0
return 0.7-z-y}},
wi:{"^":"a:3;",
$3:function(a,b,c){return V.bJ(a,c,C.p)}}}],["","",,A,{"^":"",
yi:[function(a){return new A.a2(A.eM(),null,null,new A.wj(),new A.wk(),new A.wl(),null,!0,"The basic move with a spear.",!0,!0,"StartThrustSpear",!1,null,"thrust at <object>",null,a,null)},"$1","wL",2,0,4],
ym:[function(a){return new A.a2(A.eM(),new A.wu(),A.eM(),new A.wv(),new A.ww(),new A.wx(),new A.wy(),!0,"The basic move with a spear.",!0,!0,"StartThrustSpearPlayer",!0,C.c,"thrust at <object>","will <subject> hit <objectPronoun>?",a,null)},"$1","wM",2,0,4],
yn:[function(a,b,c,d,e){return a.dP(c,"<subject> thrust<s> {"+H.b(U.ab(a))+" |}at <object>",e.gi(),!0,d)},"$5","eM",10,0,8],
wj:{"^":"a:3;",
$3:function(a,b,c){return a.gT()!==!0&&a.ga5()&&!c.ga0()&&a.e instanceof Z.ak}},
wk:{"^":"a:3;",
$3:function(a,b,c){return M.bc(a,c)}},
wl:{"^":"a:3;",
$3:function(a,b,c){return L.aP(a,c,C.l)}},
wv:{"^":"a:3;",
$3:function(a,b,c){return a.gT()===!0&&a.ga5()&&!c.ga0()&&a.e instanceof Z.ak}},
ww:{"^":"a:3;",
$3:function(a,b,c){return M.bc(a,c)}},
wx:{"^":"a:3;",
$3:function(a,b,c){return L.aP(a,c,C.m)}},
wu:{"^":"a:3;",
$3:function(a,b,c){return 0.7-(c.gam()!=null?0.2:0)}},
wy:{"^":"a:3;",
$3:function(a,b,c){return L.aP(a,c,C.p)}}}],["","",,O,{"^":"",
yj:[function(a){return new A.a2(O.eN(),null,null,new O.wm(),new O.wn(),new O.wo(),null,!0,"Opponents on the ground are often the most vulnerable.",!0,!0,"StartThrustSpearDown",!1,null,"thrust down at <object>",null,a,null)},"$1","wN",2,0,4],
yk:[function(a){return new A.a2(O.eN(),new O.wp(),O.eN(),new O.wq(),new O.wr(),new O.ws(),new O.wt(),!0,"Opponents on the ground are often the most vulnerable.",!0,!0,"StartThrustSpearDownPlayer",!0,C.c,"thrust down at <object>","will <subject> hit?",a,null)},"$1","wO",2,0,4],
yl:[function(a,b,c,d,e){return a.ac(c,"<subject> thrust<s> down {with "+H.b(U.ab(a))+" |}at <object>",d)},"$5","eN",10,0,11],
wm:{"^":"a:3;",
$3:function(a,b,c){return a.gT()!==!0&&c.ga0()&&!a.ga0()&&a.e instanceof Z.ak}},
wn:{"^":"a:3;",
$3:function(a,b,c){return D.d6(a,c)}},
wo:{"^":"a:3;",
$3:function(a,b,c){return V.bJ(a,c,C.l)}},
wq:{"^":"a:3;",
$3:function(a,b,c){return a.gT()===!0&&c.ga0()&&!a.ga0()&&a.e instanceof Z.ak}},
wr:{"^":"a:3;",
$3:function(a,b,c){return D.d6(a,c)}},
ws:{"^":"a:3;",
$3:function(a,b,c){return V.bJ(a,c,C.m)}},
wp:{"^":"a:3;",
$3:function(a,b,c){var z,y
z=a.gar()?0.2:0
y=c.gam()!=null?0.2:0
return 0.7-z-y}},
wt:{"^":"a:3;",
$3:function(a,b,c){return V.bJ(a,c,C.p)}}}],["","",,E,{"^":"",pk:{"^":"ce;a1:c<,b,a",
ga8:function(){return"pick up <object>"},
gJ:function(){return"A shield makes a huge difference in battle."},
gK:function(){return!1},
gh:function(){return"TakeDroppedShield"},
gO:function(){return!1},
gL:function(){return},
P:[function(a,b,c){throw H.c(new P.Z(null))},"$3","gM",6,0,1],
R:[function(a,b,c){var z,y
z=b.f
y=z.length!==0?C.a.gA(z):null
b.c5(y.gi(),y.a2(new E.pl(this)))
b.X(a.gi(),new E.pm(this))
z=this.b
a.ac(c,"<subject> pick<s> <object> up",z)
return H.b(a.gh())+" picks up "+H.b(z.gh())},"$3","gN",6,0,1],
aa:function(a,b){return H.i(new P.Z(null))},
I:function(a,b){return 1},
H:function(a,b){if(!(this.b instanceof E.bq))return!1
a.gfV()
if(a.d!=null)return!1
return!0},
w:{
xC:[function(a){return new E.pk(!0,a,null)},"$1","wU",2,0,29]}},pl:{"^":"a:13;a",
$1:function(a){a.gbn().a3(0,this.a.b)
return a}},pm:{"^":"a:0;a",
$1:function(a){a.sam(H.F(this.a.b,"$isbq"))}}}],["","",,M,{"^":"",pn:{"^":"ce;a1:c<,b,a",
ga8:function(){return"pick up <object>"},
gJ:function(){return"A different weapon might change the battle."},
gK:function(){return!1},
gh:function(){return"TakeDroppedWeapon"},
gO:function(){return!1},
gL:function(){return},
P:[function(a,b,c){throw H.c(new P.Z(null))},"$3","gM",6,0,1],
R:[function(a,b,c){var z,y
z=b.f
y=z.length!==0?C.a.gA(z):null
b.c5(y.gi(),y.a2(new M.po(this)))
b.X(a.gi(),new M.pp(this,a))
z=this.b
a.ac(c,"<subject> pick<s> <object> up",z)
return H.b(a.gh())+" picks up "+H.b(z.gh())},"$3","gN",6,0,1],
aa:function(a,b){return H.i(new P.Z(null))},
I:function(a,b){return 1},
H:function(a,b){var z,y,x,w,v
z=this.b
y=J.o(z)
if(!y.$isaR)return!1
if(!!y.$isak)return!1
a.gfV()
x=a.e
w=x instanceof Z.ak&&!!y.$isaG
z=z.gaf()
x=x.gaf()
if(typeof x!=="number")return H.x(x)
if(z<=x&&!w)return!1
v=b.cA("DisarmKick",a,!0)
if(v!=null&&v<=2)return!1
return!0},
w:{
xD:[function(a){return new M.pn(!0,a,null)},"$1","wV",2,0,29]}},po:{"^":"a:13;a",
$1:function(a){a.gbn().a3(0,this.a.b)
return a}},pp:{"^":"a:0;a,b",
$1:function(a){if(!this.b.gaz())a.gaD().t(0,a.gS())
a.sS(H.F(this.a.b,"$isaR"))}}}],["","",,D,{"^":"",pw:{"^":"z;K:c<,a1:d<,J:e<,O:f<,L:r<,b,a",
ga8:function(){return"throw spear at <object>"},
gh:function(){return"ThrowSpear"},
gag:function(){return"will <subject> hit <object>?"},
P:[function(a,b,c){var z,y
z=this.fw(a)
y=this.b
a.ac(c,"<subject> {throw<s>|hurl<s>|cast<s>} "+H.b(z.gaL()===!0?z.gh():"<subject's> "+H.b(z.gh()))+" at <object>",y)
if(y.gam()!=null)y.kW(c,"<subject> deflects it with <subject's> <object>",!0,y.gam(),!0)
else y.eY(c,"<subject> {dodge<s> it|move<s> out of the way}",!0,!0)
z.a6(c,"<subject> {drive<s>|plunge<s>|ram<s>|thrust<s>} into the "+H.b(U.bA(b))+"{| nearby| not far from here}")
this.fI(b,a,z)
return H.b(a.gh())+" fails to hit "+H.b(y.gh())+" with spear"},"$3","gM",6,0,1],
R:[function(a,b,c){var z,y,x,w,v,u,t
z=this.fw(a)
y=this.b
a.ac(c,"<subject> {throw<s>|hurl<s>|cast<s>} "+H.b(z.gaL()===!0?z.gh():"<subject's> "+H.b(z.gh()))+" at <object>",y)
if(y.gam()!=null)z.dQ(c,"<subject> fl<ies> past <object-owner's> <object>",y.gam(),y,a,!0)
b.X(y.gi(),new D.pA(z))
x=b.v(y.gi())
w=!x.gaI()&&x.gi()!==100
v=[P.p]
if(!w){u=S.bO("{shoulder|{left|right} arm|{left|right} thigh}")
t=a.gaY()
v=H.q([],v)
z.dQ(c,"<subject> {pierce<s>|ram<s> into|drill<s> through} <object-owner's> <object>",new Y.aC(!1,u,v,t==null?$.$get$aL():t,!1,C.n),x,a,!0)
N.b4(c,x)}else{u=S.bO("{chest|eye|neck}")
t=a.gaY()
v=H.q([],v)
z.dQ(c,"<subject> {pierce<s>|ram<s> into|drill<s> through} <object-owner's> <object>",new Y.aC(!1,u,v,t==null?$.$get$aL():t,!1,C.n),x,a,!0)
N.bi(c,b,x)}this.fI(b,a,z)
return H.b(a.gh())+" hits "+H.b(y.gh())+" with spear"},"$3","gN",6,0,1],
I:function(a,b){return 0.6-(this.b.gam()!=null?0.2:0)},
H:function(a,b){var z
if(a.gT()===!0)if(a.ga5())z=(C.a.a4(a.e.gdU(),C.r)||a.hb(C.r))&&J.e(b.ah("FightSituation").gV(),0)
else z=!1
else z=!1
return z},
fw:function(a){var z,y
if(a.gS()!=null&&a.gS() instanceof Z.ak)return a.gS()
for(z=a.gaD(),z=z.ga_(z);z.u();){y=z.d
if(y instanceof Z.ak)return y}throw H.c(new P.w("No spear found in "+a.k(0)))},
fI:function(a,b,c){var z,y
z=a.ah("FightSituation")
if(J.e(b.gS(),c)){y=b.jY()
if(y==null)y=$.$get$dj()
a.X(b.y,new D.px(y))}else a.X(b.gi(),new D.py(c))
a.c5(z.gi(),z.a2(new D.pz(c)))},
w:{
xF:[function(a){return new D.pw(!0,!0,"The enemy is far enough for you to throw a spear at them and ready your other weapon before they close in.",!0,C.c,a,null)},"$1","wY",2,0,4]}},pA:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gae()
y=this.a.gbA()
if(typeof z!=="number")return z.at()
a.sae(z-y)
return a}},px:{"^":"a:0;a",
$1:function(a){var z=this.a
a.sS(z)
a.gaD().a3(0,z)
return a}},py:{"^":"a:0;a",
$1:function(a){a.gaD().a3(0,this.a)
return a}},pz:{"^":"a:0;a",
$1:function(a){a.gbn().t(0,this.a)
return a}}}],["","",,M,{"^":"",pI:{"^":"ag;J:b<,O:c<,L:d<,K:e<,a1:f<,a",
gW:function(){return"Regain clarity."},
gh:function(){return"Unconfuse"},
P:[function(a,b,c){throw H.c(new P.Z(null))},"$3","gM",6,0,1],
R:[function(a,b,c){a.a6(c,"<subject> shake<s> <subject's> head violently")
if(a.gT()===!0)c.t(0,"the {horrible|terrible} spell seems to recede")
a.kV(c,"<subject's> eyes regain focus and clarity",!0,!0)
b.X(a.gi(),new M.pJ())
return H.b(a.gh())+" regains clarity"},"$3","gN",6,0,1],
aa:function(a,b){return"WARNING this shouldn't be user-visible"},
I:function(a,b){return 1},
H:function(a,b){var z
if(a.gc3()===!0){z=b.cA("Confuse",a,!0)
if(typeof z!=="number")return z.b7()
z=z>8}else z=!1
return z}},pJ:{"^":"a:0;",
$1:function(a){a.sc3(!1)
return a}}}],["","",,R,{"^":"",lt:{"^":"z;J:c<,K:d<,a1:e<,O:f<,L:r<,b,a",
gh:function(){return"FinishBreakNeck"},
ga8:function(){return""},
gag:function(){return"(WARNING should not be user-visible)"},
P:[function(a,b,c){throw H.c(new P.Z(null))},"$3","gM",6,0,1],
R:[function(a,b,c){var z,y
z=this.b
b.X(z.gi(),new R.lu())
y=b.v(z.gi())
if(J.e(y.gi(),100)){a.bp(c,"<subject> smash<es> <object's> head to the ground",y,!0)
N.b4(c,y)}else{a.bp(c,"<subject> break<s> <object's> neck",y,!0)
N.bi(c,b,y)}return H.b(a.gh())+" breaks "+H.b(z.gh())+"'s neck on ground"},"$3","gN",6,0,1],
I:function(a,b){return 1},
H:function(a,b){return!0},
w:{
xe:[function(a){return new R.lt(null,!0,!0,!0,C.c,a,null)},"$1","up",2,0,4]}},lu:{"^":"a:0;",
$1:function(a){a.sae(0)
return a}}}],["","",,Y,{"^":"",
f0:function(a,b){var z=new Y.dw(null,null,null,null,null)
new Y.tO(a,b).$1(z)
return z.q()},
f_:{"^":"af;",
gaH:function(){return[R.up()]},
gh:function(){return"BreakNeckOnGroundSituation"},
ay:function(){var z=new Y.dw(null,null,null,null,null)
z.m(this)
new Y.jV().$1(z)
return z.q()},
b_:function(a,b){if(a===0)return b.v(this.a)
return},
b6:function(a,b){return new H.K(a,new Y.jW(this),[H.m(a,0)])}},
tO:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$aa().as(1073741823)
a.gbb().c=z
a.gbb().e=0
z=this.a.gi()
a.gbb().b=z
z=this.b.gi()
a.gbb().d=z
return a}},
jV:{"^":"a:0;",
$1:function(a){var z=a.gbb().e
if(typeof z!=="number")return z.ak()
a.gbb().e=z+1
return a}},
jW:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.e(a.gi(),z.a)||J.e(a.gi(),z.c)}},
q0:{"^":"f_;a,i:b<,c,V:d<",
a2:function(a){var z=new Y.dw(null,null,null,null,null)
z.m(this)
a.$1(z)
return z.q()},
B:function(a,b){var z,y
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
gD:function(a){return Y.V(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
k:function(a){return"BreakNeckOnGroundSituation {attacker="+H.b(J.h(this.a))+",\nid="+J.h(this.b)+",\ntarget="+H.b(J.h(this.c))+",\ntime="+J.h(this.d)+",\n}"}},
dw:{"^":"d;a,b,c,d,e",
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
z=new Y.q0(y,x,w,v)
if(y==null)H.i(P.l("attacker"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("target"))
if(v==null)H.i(P.l("time"))}this.m(z)
return z}}}],["","",,Z,{"^":"",lb:{"^":"z;J:c<,K:d<,a1:e<,O:f<,L:r<,b,a",
ga8:function(){return"evade"},
gh:function(){return"EvadeNeckBreaking"},
gag:function(){return"will <subject> evade?"},
P:[function(a,b,c){a.a6(c,"<subject> tr<ies> to {dodge it|break free}")
S.a7(new Z.lc(a,c),new Z.ld(this,a,c),null,null)
b.aA()
return H.b(a.gh())+" fails to dodge "+H.b(this.b.gh())},"$3","gM",6,0,1],
R:[function(a,b,c){var z=this.b
a.bp(c,"<subject> {dodge<s> it|break<s> free}",z,!0)
b.aX("FightSituation")
return H.b(a.gh())+" evades "+H.b(z.gh())},"$3","gN",6,0,1],
I:function(a,b){var z
if(a.gT()===!0)return 0.6
z=b.f
return(z.length!==0?C.a.gA(z):null).gb5().b4(0.5)},
H:function(a,b){return!0},
w:{
xd:[function(a){return new Z.lb("This looks dangerous. Trying to evade this close-quarter move seems prudent.",!1,!1,!0,C.c,a,null)},"$1","uj",2,0,4]}},lc:{"^":"a:2;a,b",
$0:function(){return this.a.aj(this.b,"<subject> {can't|fail<s>}",!0)}},ld:{"^":"a:2;a,b,c",
$0:function(){return this.a.b.bS(this.c,"<subject> <is> too quick for <object>",!0,this.b)}}}],["","",,S,{"^":"",
dW:function(a,b,c){var z=new S.dV(null,null,null,null,null,null)
new S.tN(a,b,c).$1(z)
return z.q()},
fF:{"^":"c8;",
gaH:function(){return[Z.uj()]},
gh:function(){return"OnGroundWrestleDefenseSituation"},
ay:function(){var z=new S.dV(null,null,null,null,null,null)
z.m(this)
new S.mZ().$1(z)
return z.q()}},
tN:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$aa().as(1073741823)
a.gaR().c=z
a.gaR().f=0
z=this.a.gi()
a.gaR().b=z
z=this.b.gi()
a.gaR().e=z
a.gaR().d=this.c
return a}},
mZ:{"^":"a:0;",
$1:function(a){var z=a.gaR().f
if(typeof z!=="number")return z.ak()
a.gaR().f=z+1
return a}},
qa:{"^":"fF;cS:a<,i:b<,cu:c<,cz:d<,V:e<",
a2:function(a){var z=new S.dV(null,null,null,null,null,null)
z.m(this)
a.$1(z)
return z.q()},
B:function(a,b){var z,y
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
gD:function(a){return Y.V(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)))},
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
z=new S.qa(y,x,w,v,u)
if(y==null)H.i(P.l("attacker"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("predeterminedResult"))
if(v==null)H.i(P.l("target"))
if(u==null)H.i(P.l("time"))}this.m(z)
return z}}}],["","",,A,{"^":"",
dp:function(a,b){var z,y,x,w
z=b.cA("KickToGround",a,!0)
if(z!=null&&z<=2)return!0
y=b.cA("Pound",a,!0)
if(y!=null&&y<=2)return!0
x=b.cA("FinishPunch",a,!0)
if(x!=null&&x<=2)return!0
w=b.cA("FinishLeap",a,!0)
if(w!=null&&w<=2)return!0
return!1}}],["","",,U,{"^":"",
c0:function(a){return a.gam().gaL()===!0?a.gam().gh():"<subject's> "+H.b(a.gam().gh())},
ab:function(a){return a.gS().gaL()===!0?a.gS().gh():"<subject's> "+H.b(a.gS().gh())}}],["","",,G,{"^":"",
xO:[function(a,b,c,d,e){a.a6(c,"<subject> tr<ies> to swing back")
a.eX(c,"<subject> {go<es> wide|miss<es>}",!0,!0)
if(a.ga5()){b.X(a.y,new G.tY())
a.c6(c,"<subject> lose<s> balance because of that",!0,!0)}else if(a.fr===C.h){b.X(a.y,new G.tZ())
a.aE(c,"<subject> lose<s> balance because of that",!0)
a.c6(c,"<subject> fall<s> to the ground",!0,!0)}},"$5","ib",10,0,11],
xP:[function(a){return new A.a2(G.ic(),new G.u_(),G.ib(),new G.u0(),new G.u1(),new G.u2(),null,!1,"You can deal serious damage when countering because your opponent is often caught off guard. On the other hand, counters require fast reaction and could throw you out of balance.",!0,!0,"CounterSlash",!1,null,"swing back at <object>",null,a,null)},"$1","u7",2,0,4],
xR:[function(a,b,c,d,e){return a.ac(c,"<subject> swing<s> back",d)},"$5","ic",10,0,8],
xQ:[function(a){return new A.a2(G.ic(),new G.u3(),G.ib(),new G.u4(),new G.u5(),new G.u6(),null,!1,"You can deal serious damage when countering because your opponent is often caught off guard. On the other hand, counters require fast reaction and could throw you out of balance.",!0,!0,"CounterSlashPlayer",!0,C.c,"swing back at <object>","will <subject> hit <objectPronoun>?",a,null)},"$1","u8",2,0,4],
tY:{"^":"a:0;",
$1:function(a){a.sai(C.h)
return a}},
tZ:{"^":"a:0;",
$1:function(a){a.sai(C.f)
return a}},
u0:{"^":"a:3;",
$3:function(a,b,c){return a.gT()!==!0&&a.gS().gaV()&&!a.ga0()}},
u1:{"^":"a:3;",
$3:function(a,b,c){return M.bc(a,c)}},
u2:{"^":"a:3;",
$3:function(a,b,c){return L.aP(a,c,C.l)}},
u_:{"^":"a:3;",
$3:function(a,b,c){return c.ga5()?0.7:0.9}},
u4:{"^":"a:3;",
$3:function(a,b,c){return a.gT()===!0&&a.gS().gaV()&&!a.ga0()}},
u5:{"^":"a:3;",
$3:function(a,b,c){return M.bc(a,c)}},
u6:{"^":"a:3;",
$3:function(a,b,c){return L.aP(a,c,C.m)}},
u3:{"^":"a:3;",
$3:function(a,b,c){return c.ga5()?0.7:0.9}}}],["","",,V,{"^":"",kg:{"^":"z;J:c<,K:d<,a1:e<,O:f<,L:r<,b,a",
ga8:function(){return"tackle <object>"},
gh:function(){return"CounterTackle"},
gag:function(){return"will <subject> tackle <objectPronoun>?"},
P:[function(a,b,c){var z=this.b
a.ac(c,"<subject> tr<ies> to tackle <object>",z)
S.a7(new V.kh(a,c),new V.ki(this,c),null,null)
a.ac(c,"<subject> land<s> on the "+H.b(U.bA(b))+" next to <object>",z)
b.X(a.gi(),new V.kj())
return H.b(a.gh())+" fails to tackle "+H.b(z.gh())},"$3","gM",6,0,1],
R:[function(a,b,c){var z=this.b
a.ac(c,"<subject> tackle<s> <object> to the ground",z)
b.X(z.gi(),new V.kk())
b.X(a.gi(),new V.kl())
return H.b(a.gh())+" tackles "+H.b(z.gh())},"$3","gN",6,0,1],
I:function(a,b){var z=this.b.gar()?0.2:0
if(a.gT()===!0)return 0.7+z
return 0.5+z},
H:function(a,b){return!a.ga0()&&a.e instanceof K.cd},
w:{
x6:[function(a){return new V.kg("When an opponent misses you like that, it's a rare (though still dangerous) opportunity to bring them down.",!0,!0,!0,C.c,a,null)},"$1","u9",2,0,4]}},kh:{"^":"a:2;a,b",
$0:function(){return this.a.aj(this.b,"<subject> go<es> wide",!0)}},ki:{"^":"a:2;a,b",
$0:function(){return this.a.b.aj(this.b,"<subject> {evade<s>|sidestep<s>} it",!0)}},kj:{"^":"a:0;",
$1:function(a){a.sai(C.f)
return a}},kk:{"^":"a:0;",
$1:function(a){a.sai(C.f)
return a}},kl:{"^":"a:0;",
$1:function(a){a.sai(C.f)
return a}}}],["","",,S,{"^":"",
c6:function(a,b){var z=new S.dz(null,null,null,null,null)
new S.tH(a,b).$1(z)
return z.q()},
f6:{"^":"af;",
gaH:function(){return[G.u7(),G.u8(),V.u9()]},
gbP:function(){return[$.$get$dY()]},
gh:function(){return"CounterAttackSituation"},
ay:function(){var z=new S.dz(null,null,null,null,null)
z.m(this)
new S.ke().$1(z)
return z.q()},
b_:function(a,b){if(a===0)return b.v(this.a)
return},
b6:function(a,b){return new H.K(a,new S.kf(this),[H.m(a,0)])}},
tH:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$aa().as(1073741823)
a.gbc().c=z
a.gbc().e=0
z=this.a.gi()
a.gbc().b=z
z=this.b.gi()
a.gbc().d=z
return a}},
ke:{"^":"a:0;",
$1:function(a){var z=a.gbc().e
if(typeof z!=="number")return z.ak()
a.gbc().e=z+1
return a}},
kf:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.e(a.gi(),z.a)||J.e(a.gi(),z.c)}},
q1:{"^":"f6;a,i:b<,c,V:d<",
a2:function(a){var z=new S.dz(null,null,null,null,null)
z.m(this)
a.$1(z)
return z.q()},
B:function(a,b){var z,y
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
gD:function(a){return Y.V(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
k:function(a){return"CounterAttackSituation {counterAttacker="+J.h(this.a)+",\nid="+J.h(this.b)+",\ntarget="+H.b(J.h(this.c))+",\ntime="+J.h(this.d)+",\n}"}},
dz:{"^":"d;a,b,c,d,e",
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
z=new S.q1(y,x,w,v)
if(y==null)H.i(P.l("counterAttacker"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("target"))
if(v==null)H.i(P.l("time"))}this.m(z)
return z}}}],["","",,O,{"^":"",c8:{"^":"os;",
gdK:function(){return 1000},
b_:function(a,b){if(a===0)return b.v(this.gcz())
return},
b6:function(a,b){return new H.K(a,new O.kq(this),[H.m(a,0)])}},os:{"^":"af+nl;"},kq:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.e(a.gi(),z.gcS())||J.e(a.gi(),z.gcz())}}}],["","",,U,{"^":"",
bA:function(a){return a.ah("FightSituation").gcb()},
cc:function(a,b,c,d,e){var z=new U.cb(null,null,null,null,null,null,null,null,null)
new U.t0(a,b,c,d,e).$1(z)
return z.q()},
cT:{"^":"af;",
gaH:function(){return[N.tV(),V.ud(),R.v7(),Y.vi(),T.wz(),T.wA(),M.wB(),M.wC(),U.wD(),U.wE(),G.wF(),G.wG(),D.wJ(),D.wK(),R.wH(),R.wI(),A.wL(),A.wM(),O.wN(),O.wO(),E.wU(),M.wV(),D.wY()]},
gbP:function(){return H.q([$.$get$fS(),$.$get$ha(),$.$get$fW(),$.$get$hA()],[Q.ag])},
gdK:function(){return 1000},
gh:function(){return"FightSituation"},
cT:function(a,b){var z=b.a
return(z&&C.a).bt(z,new U.lg(a))},
ay:function(){var z=new U.cb(null,null,null,null,null,null,null,null,null)
z.m(this)
new U.lh().$1(z)
return z.q()},
b_:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j
z=X.i4(this.f,this.b)
y=H.bI(z,new U.li(b),H.y(z,"B",0),null)
x=H.y(y,"B",0)
w=P.P(new H.K(y,new U.lj(),[x]),!1,x)
x=H.m(w,0)
v=P.P(new H.K(w,new U.lk(),[x]),!1,x)
u=v.length===1?C.a.gce(v):null
if(a===0)if(u!=null)return u
for(y=w.length,t=0,s=null,r=0;r<w.length;w.length===y||(0,H.as)(w),++r){q=w[r]
x=b.d
p=x.aU(0,new U.ll(q),new U.lm())
o=p==null?p:p.gV()
if(o==null)o=-1
n=b.r
if(typeof o!=="number")return H.x(o)
m=n-o
if(m<=0)continue
l=x.aU(0,new U.ln(q),new U.lo())
k=l==null?l:l.gV()
if(k==null)k=-1
x=b.r
if(typeof k!=="number")return H.x(k)
j=(x-k+m)/2
if(q.gT()===!0)j*=1.5
if(j>t){s=q
t=j}}return s},
b6:function(a,b){return new H.K(a,new U.lp(this),[H.m(a,0)])},
hm:function(a,b){var z,y
z=this.x
y=this.c.a
if(y.ad(z))y.j(0,z).$2(a,b)},
d2:function(a){var z,y,x,w,v,u,t
z=this.r
if(z!=null&&!this.cT(a,this.b)&&this.cT(a,this.f)){y=a.f7(z)
a.c5(y.gi(),y.a2(new U.lq()))
for(z=this.f,x=z.a,x=new J.bj(x,x.length,0,null,[H.m(x,0)]),w=a.a;x.u();){v=x.d
if(a.v(v).gaq()){u=a.v(v)
t=u.a2(new U.lr())
w.a3(0,u)
w.t(0,t)}}C.a.t(a.f,X.mz(z,this.d,this.a,null))}else this.cT(a,this.f)},
dk:function(a){var z=this.f
if(this.cT(a,z))if(this.cT(a,this.b)){z=z.a
z=(z&&C.a).bt(z,new U.ls(a))}else z=!1
else z=!1
return z}},
t0:{"^":"a:0;a,b,c,d,e",
$1:function(a){var z,y
z=$.$get$aa().as(1073741823)
a.gao().f=z
a.gao().y=0
z=a.gao()
y=z.r
if(y==null){y=new S.O(null,null,[P.u])
y.al()
y.m(C.d)
z.r=y
z=y}else z=y
z.m(J.eS(this.a,new U.rA()))
z=a.gao()
y=z.c
if(y==null){y=new S.O(null,null,[P.u])
y.al()
y.m(C.d)
z.c=y
z=y}else z=y
y=this.b
z.m(new H.aq(y,new U.rB(),[H.m(y,0),null]))
a.gao().e=this.c
y=new S.O(null,null,[U.ae])
y.al()
y.m(C.d)
a.gao().b=y
y=this.d.gi()
a.gao().x=y
y=new A.cX(null,null,[P.u,{func:1,v:true,args:[A.a4,Y.a3]}])
y.cj()
y.m(this.e)
a.gao().d=y
return a}},
rA:{"^":"a:0;",
$1:function(a){return a.gi()}},
rB:{"^":"a:0;",
$1:function(a){return a.gi()}},
lg:{"^":"a:0;a",
$1:function(a){return this.a.v(a).gaq()}},
lh:{"^":"a:0;",
$1:function(a){var z=a.gao().y
if(typeof z!=="number")return z.ak()
a.gao().y=z+1
return a}},
li:{"^":"a:0;a",
$1:function(a){return this.a.v(a)}},
lj:{"^":"a:0;",
$1:function(a){return a.gaq()}},
lk:{"^":"a:0;",
$1:function(a){return a.gT()}},
ll:{"^":"a:0;a",
$1:function(a){return J.e(a.gcv(),this.a.gi())&&a.ghI()===!0}},
lm:{"^":"a:2;",
$0:function(){return}},
ln:{"^":"a:0;a",
$1:function(a){return J.e(a.gcv(),this.a.gi())}},
lo:{"^":"a:2;",
$0:function(){return}},
lp:{"^":"a:24;a",
$1:function(a){var z,y,x
if(a.gaq()){z=this.a
y=a.gi()
x=z.f.a
if(!(x&&C.a).a4(x,y)){y=a.gi()
z=z.b.a
y=(z&&C.a).a4(z,y)
z=y}else z=!0}else z=!1
return z}},
lq:{"^":"a:0;",
$1:function(a){a.skE(!1)
return a}},
lr:{"^":"a:0;",
$1:function(a){a.sai(C.k)
return a}},
ls:{"^":"a:52;a",
$1:function(a){var z=this.a.v(a)
return z.gT()===!0&&z.gaq()}},
q3:{"^":"cT;bn:a<,b,c,cb:d<,i:e<,d5:f<,r,V:x<",
a2:function(a){var z=new U.cb(null,null,null,null,null,null,null,null,null)
z.m(this)
a.$1(z)
return z.q()},
B:function(a,b){var z,y
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
gD:function(a){return Y.V(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)),J.j(this.f)),J.j(this.r)),J.j(this.x)))},
k:function(a){return"FightSituation {droppedItems="+J.h(this.a)+",\nenemyTeamIds="+J.h(this.b)+",\nevents="+J.h(this.c)+",\ngroundMaterial="+J.h(this.d)+",\nid="+J.h(this.e)+",\nplayerTeamIds="+J.h(this.f)+",\nroomRoamingSituationId="+H.b(J.h(this.r))+",\ntime="+J.h(this.x)+",\n}"}},
cb:{"^":"d;a,b,c,d,e,f,r,x,y",
gbn:function(){var z,y
z=this.gao()
y=z.b
if(y==null){y=new S.O(null,null,[U.ae])
y.al()
y.m(C.d)
z.b=y
z=y}else z=y
return z},
gcb:function(){return this.gao().e},
gi:function(){return this.gao().f},
gd5:function(){var z,y
z=this.gao()
y=z.r
if(y==null){y=new S.O(null,null,[P.u])
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
y.cj()
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
if(x==null){x=new S.O(null,null,[U.ae])
x.al()
x.m(C.d)
y.b=x
y=x}else y=x
y=y.q()
x=this.gao()
w=x.c
if(w==null){w=new S.O(null,null,[P.u])
w.al()
w.m(C.d)
x.c=w
x=w}else x=w
x=x.q()
w=this.gao()
v=w.d
if(v==null){v=new A.cX(null,null,[P.u,{func:1,v:true,args:[A.a4,Y.a3]}])
v.cj()
v.m(C.a3)
w.d=v
w=v}else w=v
w=w.q()
v=this.gao().e
u=this.gao().f
t=this.gao()
s=t.r
if(s==null){s=new S.O(null,null,[P.u])
s.al()
s.m(C.d)
t.r=s
t=s}else t=s
t=t.q()
s=this.gao().x
r=this.gao().y
z=new U.q3(y,x,w,v,u,t,s,r)
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
z=b.ah("FightSituation")
y=z.gcb()
b.c5(z.gi(),z.a2(new N.v8(c)))
if(c.gai()===C.f){c.aE(a,"<subject> stop<s> moving",!0)
a.n(0,"\n\n",!0)
return}switch($.$get$hW().as(3)){case 0:c.c6(a,"<subject> collapse<s>, dead",!0,!0)
break
case 1:c.aE(a,"<subject> fall<s> backward",!0)
c.aE(a,"<subject> twist<s>",!0)
c.c6(a,"<subject> hit<s> the "+H.b(y)+" face down",!0,!0)
break
case 2:c.aE(a,"<subject> drop<s> to <subject's> knees",!0)
c.aE(a,"<subject> keel<s> over",!0)
break}a.n(0,"\n\n",!0)},
b4:function(a,b){if(J.e(b.gi(),100)&&b.gae()===0){N.rJ(a,b)
return}b.aE(a,"<subject> {scream|yell|grunt}<s> in pain",!0)},
rJ:function(a,b){if(b.gai()===C.f){b.aE(a,"<subject> stop<s> moving",!0)
a.n(0,"\n\n",!0)
return}b.aE(a,"<subject> drop<s> to <subject's> knees",!0)
b.aE(a,"<subject> keel<s> over",!0)
a.n(0,"\n\n",!0)},
v8:{"^":"a:0;a",
$1:function(a){var z=this.a
if(!z.gaz())a.gbn().t(0,z.e)
if(z.d!=null)a.gbn().t(0,z.d)
return a}}}],["","",,R,{"^":"",lv:{"^":"z;J:c<,K:d<,a1:e<,O:f<,L:r<,b,a",
gh:function(){return"FinishLeap"},
ga8:function(){return""},
gag:function(){return"(WARNING should not be user-visible)"},
P:[function(a,b,c){throw H.c(new P.Z(null))},"$3","gM",6,0,1],
R:[function(a,b,c){var z,y,x,w,v
z=this.b
b.X(z.gi(),new R.lw())
y=b.v(z.gi())
b.X(a.gi(),new R.lx())
x=b.ah("LeapSituation").gi()
w=U.bA(b)
a.bT(c,"<subject> {ram<s>|smash<es>} into <object>",x,z,!0)
c.jm(0,"both "+(a.gT()===!0||z.gT()===!0?"of you":"")+" {land on|fall to} the "+H.b(w),x)
v=z.gae()
if(typeof v!=="number")return v.b7()
if(v>1){c.jn(0,"the impact almost {knocks <object> unconscious|knocks <object> out}",x,z)
N.b4(c,y)
b.X(z.gi(),new R.ly())}return H.b(a.gh())+" finishes leap at "+H.b(z.gh())},"$3","gN",6,0,1],
I:function(a,b){return 1},
H:function(a,b){return!0},
w:{
xf:[function(a){return new R.lv(null,!0,!0,!0,C.c,a,null)},"$1","uq",2,0,4]}},lw:{"^":"a:0;",
$1:function(a){a.sai(C.f)
return a}},lx:{"^":"a:0;",
$1:function(a){a.sai(C.f)
return a}},ly:{"^":"a:0;",
$1:function(a){var z=a.gae()
if(typeof z!=="number")return z.at()
a.sae(z-1)
return a}}}],["","",,S,{"^":"",kC:{"^":"z;J:c<,K:d<,a1:e<,O:f<,L:r<,b,a",
ga8:function(){return"dodge"},
gh:function(){return"DodgeLeap"},
gag:function(){return"will <subject> dodge?"},
P:[function(a,b,c){var z=b.ah("LeapSituation").gi()
a.hv(c,"<subject> tr<ies> to {dodge|sidestep}",z,!0)
if(a.gar())a.c7(c,"<subject> <is> out of balance",z,!0,!0)
else S.a7(new S.kD(a,c,z),new S.kE(a,c,z),null,null)
b.aA()
return H.b(a.dx)+" fails to dodge "+H.b(this.b.gh())},"$3","gM",6,0,1],
R:[function(a,b,c){var z,y,x
z=b.ah("LeapSituation").gi()
y=U.bA(b)
x=this.b
a.bT(c,"<subject> {dodge<s>|sidestep<s>} <object>",z,x,!0)
x.aE(c,"<subject> {crash<es> to|fall<s> to|hit<s>} the "+H.b(y),!0)
b.X(x.gi(),new S.kF())
b.aX("FightSituation")
return H.b(a.gh())+" dodges "+H.b(x.gh())},"$3","gN",6,0,1],
I:function(a,b){var z,y,x
z=a.ga5()?0:0.2
y=this.b.ga0()?0.2:0
if(a.cx===!0)return 0.8-z+y
x=b.f
return(x.length!==0?C.a.gA(x):null).gb5().b4(0.5-z+y)},
H:function(a,b){return!a.ga0()},
w:{
x9:[function(a){return new S.kC("Dodging means moving your body out of harm's way. When successful, your opponent will miss and will hit the ground beside you.",!1,!1,!0,C.c,a,null)},"$1","ue",2,0,4]}},kD:{"^":"a:2;a,b,c",
$0:function(){return this.a.c7(this.b,"<subject> {can't|fail<s>|<does>n't succeed}",this.c,!0,!0)}},kE:{"^":"a:2;a,b,c",
$0:function(){return this.a.c7(this.b,"<subject> {<is> too slow|<is>n't fast enough}",this.c,!0,!0)}},kF:{"^":"a:0;",
$1:function(a){a.sai(C.f)
return a}}}],["","",,D,{"^":"",lT:{"^":"z;J:c<,K:d<,a1:e<,O:f<,L:r<,b,a",
ga8:function(){return"impale"},
gh:function(){return"ImpaleLeaper"},
gag:function(){return"will <subject> impale <objectPronoun>?"},
P:[function(a,b,c){var z,y
z=b.ah("LeapSituation").gi()
y=this.b
a.dP(c,"<subject> tr<ies> to {move|swing|shift} "+H.b(U.ab(a))+" between <subjectPronounSelf> and <object>",z,!0,y)
if(a.gar())a.c7(c,"<subject> <is> out of balance",z,!0,!0)
else S.a7(new D.lU(a,c,z),new D.lV(a,c,z),null,null)
b.aA()
return H.b(a.dx)+" fails to impale "+H.b(y.gh())},"$3","gM",6,0,1],
R:[function(a,b,c){var z,y,x
z=b.ah("LeapSituation").gi()
y=this.b
a.bT(c,"<subject> {move<s>|swing<s>|shift<s>} "+H.b(U.ab(a))+" between <subjectPronounSelf> and <object>",z,y,!0)
y.aE(c,"<subject> {leap<s>|run<s>|lunge<s>} right into it",!0)
b.X(y.gi(),new D.lW())
x=b.v(y.gi())
if(!(!x.gaI()&&x.gi()!==100)){a.gS().ac(c,"<subject> {cut<s> into|pierce<s>|go<es> into} <object's> flesh",x)
x.a6(c,"<subject> fall<s> to the ground")
N.b4(c,x)}else{a.gS().ac(c,"<subject> {go<es> right through|completely impale<s>|bore<s> through} <object's> {body|chest|stomach|neck}",x)
x.aE(c,"<subject> go<es> down",!0)
N.bi(c,b,x)}b.aX("FightSituation")
return H.b(a.gh())+" impales "+H.b(y.gh())},"$3","gN",6,0,1],
I:function(a,b){var z,y,x
z=a.ga5()?0:0.2
y=this.b.ga0()?0.2:0
if(a.cx===!0)return 0.5-z+y
x=b.f
return(x.length!==0?C.a.gA(x):null).gb5().b4(0.4-z+y)},
H:function(a,b){return!a.ga0()&&a.e.geR()},
w:{
xl:[function(a){return new D.lT("You can move your weapon to point at the attacker. If successful, the weapon will pierce the attacker with the force of his own leap.",!1,!1,!0,C.c,a,null)},"$1","v_",2,0,4]}},lU:{"^":"a:2;a,b,c",
$0:function(){return this.a.c7(this.b,"<subject> {can't|fail<s>|<does>n't succeed}",this.c,!0,!0)}},lV:{"^":"a:2;a,b,c",
$0:function(){return this.a.c7(this.b,"<subject> {<is> too slow|<is>n't fast enough}",this.c,!0,!0)}},lW:{"^":"a:0;",
$1:function(a){var z=a.gae()
if(typeof z!=="number")return z.at()
a.sae(z-1)
a.sai(C.f)
return a}}}],["","",,V,{"^":"",
dL:function(a,b,c){var z=new V.dK(null,null,null,null,null,null)
new V.tL(a,b,c).$1(z)
return z.q()},
fq:{"^":"c8;",
gaH:function(){return[S.ue(),D.v_()]},
gh:function(){return"LeapDefenseSituation"},
ay:function(){var z=new V.dK(null,null,null,null,null,null)
z.m(this)
new V.mn().$1(z)
return z.q()}},
tL:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$aa().as(1073741823)
a.gaN().c=z
a.gaN().f=0
z=this.a.gi()
a.gaN().b=z
z=this.b.gi()
a.gaN().e=z
a.gaN().d=this.c
return a}},
mn:{"^":"a:0;",
$1:function(a){var z=a.gaN().f
if(typeof z!=="number")return z.ak()
a.gaN().f=z+1
return a}},
q5:{"^":"fq;cS:a<,i:b<,cu:c<,cz:d<,V:e<",
a2:function(a){var z=new V.dK(null,null,null,null,null,null)
z.m(this)
a.$1(z)
return z.q()},
B:function(a,b){var z,y
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
gD:function(a){return Y.V(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)))},
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
z=new V.q5(y,x,w,v,u)
if(y==null)H.i(P.l("attacker"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("predeterminedResult"))
if(v==null)H.i(P.l("target"))
if(u==null)H.i(P.l("time"))}this.m(z)
return z}}}],["","",,F,{"^":"",
fs:function(a,b){var z=new F.dM(null,null,null,null,null)
new F.tM(a,b).$1(z)
return z.q()},
fr:{"^":"af;",
gaH:function(){return[R.uq()]},
gh:function(){return"LeapSituation"},
ay:function(){var z=new F.dM(null,null,null,null,null)
z.m(this)
new F.mo().$1(z)
return z.q()},
b_:function(a,b){if(a===0)return b.v(this.a)
return},
b6:function(a,b){return new H.K(a,new F.mp(this),[H.m(a,0)])}},
tM:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$aa().as(1073741823)
a.gbd().c=z
a.gbd().e=0
z=this.a.gi()
a.gbd().b=z
z=this.b.gi()
a.gbd().d=z
return a}},
mo:{"^":"a:0;",
$1:function(a){var z=a.gbd().e
if(typeof z!=="number")return z.ak()
a.gbd().e=z+1
return a}},
mp:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.e(a.gi(),z.a)||J.e(a.gi(),z.c)}},
q6:{"^":"fr;a,i:b<,c,V:d<",
a2:function(a){var z=new F.dM(null,null,null,null,null)
z.m(this)
a.$1(z)
return z.q()},
B:function(a,b){var z,y
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
gD:function(a){return Y.V(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
k:function(a){return"LeapSituation {attacker="+H.b(J.h(this.a))+",\nid="+J.h(this.b)+",\ntarget="+H.b(J.h(this.c))+",\ntime="+J.h(this.d)+",\n}"}},
dM:{"^":"d;a,b,c,d,e",
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
z=new F.q6(y,x,w,v)
if(y==null)H.i(P.l("attacker"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("target"))
if(v==null)H.i(P.l("time"))}this.m(z)
return z}}}],["","",,Z,{"^":"",jD:{"^":"ag;K:b<,a1:c<,O:d<,L:e<,a",
gW:function(){return""},
gJ:function(){return},
gh:function(){return"AutoLoot"},
P:[function(a,b,c){throw H.c(new P.Z(null))},"$3","gM",6,0,1],
R:[function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j
z=b.ah("LootSituation")
y=b.v(100)
if(y.gc2()===!0&&!y.gaI()){a.ac(c,"<subject> kneel<s> next to <object>",y)
a.ac(c,"<subject> help<s> <object> to <object's> feet",y)
y.aB(c,'"I\'ll live," <subject> say<s>.',!0)
b.X(100,new Z.jQ())}x=[]
for(w=z.gbn(),w=w.ga_(w),v=b.a,u=null,t=null;w.u();){s=w.d
r=b.v(a.gi())
q=r.gS() instanceof Z.ak&&s instanceof G.aG
p=J.o(s)
if(!!p.$isaR){o=s.gbK()
n=s.gbA()
m=s.gaL()?1:0
l=r.gS().gaf()
if(typeof l!=="number")return H.x(l)
o=2+o+n+m>l||q}else o=!1
if(o){k=b.v(a.gi())
j=k.a2(new Z.jR(s,r))
v.a3(0,k)
v.t(0,j)
u=s}else if(!!p.$isbq&&r.gam()==null){k=b.v(a.gi())
j=k.a2(new Z.jS(s))
v.a3(0,k)
v.t(0,j)
t=s}else{k=b.v(a.gi())
j=k.a2(new Z.jT(s))
v.a3(0,k)
v.t(0,j)
x.push(s)}}if(u!=null){a.ac(c,"<subject> pick<s> up <object>",u)
a.ac(c,"<subject> wield<s> <object>",u)}if(t!=null){a.ac(c,"<subject> pick<s> up <object>",t)
a.ac(c,"<subject> wield<s> <object>",t)}this.iF(x,a,z,b,c)
this.iE(x,a,z,b,c)
if(x.length!==0)c.jt("<subject> <also> take<s>",x,null,a)
return H.b(a.gh())+" auto-loots"},"$3","gN",6,0,1],
aa:function(a,b){return"WARNING this shouldn't be user-visible"},
I:function(a,b){return 1},
H:function(a,b){return a.gT()},
iF:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q
z=P.P(new H.K(a,new Z.jK(),[H.m(a,0)]),!0,L.aR)
for(y=b.gaD(),y=y.ga_(y);y.u();){x=y.d
if(x instanceof L.aR)C.a.t(z,x)}if(z.length===0)return
C.a.cf(z,new Z.jL())
w=c.gd5().aK(0,new Z.jM(d)).dn(0,new Z.jN())
for(y=J.aj(w.a),v=new H.bT(y,w.b,[H.m(w,0)]),u=d.a;v.u();){t=y.gU()
if(z.length===0)break
s=C.a.ht(z)
r=d.v(t.gi())
q=r.a2(new Z.jO(s))
u.a3(0,r)
u.t(0,q)
C.a.a3(a,s)
r=d.v(b.gi())
q=r.a2(new Z.jP(s))
u.a3(0,r)
u.t(0,q)
b.ac(e,"<subject> give<s> the "+H.b(s.gh())+" to <object>",t)}},
iE:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q
z=P.P(new H.K(a,new Z.jE(),[H.m(a,0)]),!0,E.bq)
for(y=b.gaD(),y=y.ga_(y);y.u();){x=y.d
if(x instanceof E.bq)C.a.t(z,x)}if(z.length===0)return
C.a.cf(z,new Z.jF())
w=c.gd5().aK(0,new Z.jG(d)).dn(0,new Z.jH())
for(y=J.aj(w.a),v=new H.bT(y,w.b,[H.m(w,0)]),u=d.a;v.u();){t=y.gU()
if(z.length===0)break
s=C.a.ht(z)
r=d.v(t.gi())
q=r.a2(new Z.jI(s))
u.a3(0,r)
u.t(0,q)
C.a.a3(a,s)
r=d.v(b.gi())
q=r.a2(new Z.jJ(s))
u.a3(0,r)
u.t(0,q)
b.ac(e,"<subject> give<s> the "+H.b(s.gh())+" to <object>",t)}}},jQ:{"^":"a:0;",
$1:function(a){a.sai(C.h)
a.sae(1)
return a}},jR:{"^":"a:0;a,b",
$1:function(a){var z=this.b
if(!(z.gS() instanceof K.cd))a.gaD().t(0,z.gS())
a.sS(this.a)}},jS:{"^":"a:0;a",
$1:function(a){var z=this.a
a.sam(z)
return z}},jT:{"^":"a:0;a",
$1:function(a){a.gaD().t(0,this.a)
return a}},jK:{"^":"a:0;",
$1:function(a){return a instanceof L.aR}},jL:{"^":"a:6;",
$2:function(a,b){return J.bD(a.gaf(),b.gaf())}},jM:{"^":"a:0;a",
$1:function(a){return this.a.v(a)}},jN:{"^":"a:0;",
$1:function(a){return a.gaq()&&a.gaz()}},jO:{"^":"a:0;a",
$1:function(a){a.sS(this.a)
return a}},jP:{"^":"a:0;a",
$1:function(a){a.gaD().a3(0,this.a)
return a}},jE:{"^":"a:0;",
$1:function(a){return a instanceof E.bq}},jF:{"^":"a:6;",
$2:function(a,b){return J.bD(a.gaf(),b.gaf())}},jG:{"^":"a:0;a",
$1:function(a){return this.a.v(a)}},jH:{"^":"a:0;",
$1:function(a){return a.gaq()&&a.gam()==null}},jI:{"^":"a:0;a",
$1:function(a){a.sam(this.a)
return a}},jJ:{"^":"a:0;a",
$1:function(a){a.gaD().a3(0,this.a)
return a}}}],["","",,X,{"^":"",
mz:function(a,b,c,d){var z=new X.dQ(null,null,null,null,null,null)
new X.t1(a,b,c).$1(z)
return z.q()},
fx:{"^":"af;",
gbP:function(){return H.q([$.$get$eX()],[Q.ag])},
gh:function(){return"LootSituation"},
ay:function(){var z=new X.dQ(null,null,null,null,null,null)
z.m(this)
new X.mB().$1(z)
return z.q()},
b_:function(a,b){if(typeof a!=="number")return a.b7()
if(a>0)return
return this.fz(b.a)},
b6:function(a,b){return[this.fz(a)]},
dk:function(a){return!0},
fz:function(a){return a.cn(0,new X.mA())}},
t1:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$aa().as(1073741823)
a.gaw().e=z
a.gaw().f=0
a.gaw().c=this.b
z=new S.O(null,null,[P.u])
z.al()
z.m(this.a)
a.gaw().d=z
z=new S.O(null,null,[U.ae])
z.al()
z.m(this.c)
a.gaw().b=z
return a}},
mB:{"^":"a:0;",
$1:function(a){var z=a.gaw().f
if(typeof z!=="number")return z.ak()
a.gaw().f=z+1
return a}},
mA:{"^":"a:0;",
$1:function(a){return a.gT()===!0&&a.gaq()}},
q7:{"^":"fx;bn:a<,cb:b<,d5:c<,i:d<,V:e<",
a2:function(a){var z=new X.dQ(null,null,null,null,null,null)
z.m(this)
a.$1(z)
return z.q()},
B:function(a,b){var z,y
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
gD:function(a){return Y.V(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)))},
k:function(a){return"LootSituation {droppedItems="+J.h(this.a)+",\ngroundMaterial="+J.h(this.b)+",\nplayerTeamIds="+J.h(this.c)+",\nid="+J.h(this.d)+",\ntime="+J.h(this.e)+",\n}"}},
dQ:{"^":"d;a,b,c,d,e,f",
gbn:function(){var z,y
z=this.gaw()
y=z.b
if(y==null){y=new S.O(null,null,[U.ae])
y.al()
y.m(C.d)
z.b=y
z=y}else z=y
return z},
gcb:function(){return this.gaw().c},
gd5:function(){var z,y
z=this.gaw()
y=z.d
if(y==null){y=new S.O(null,null,[P.u])
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
if(x==null){x=new S.O(null,null,[U.ae])
x.al()
x.m(C.d)
y.b=x
y=x}else y=x
y=y.q()
x=this.gaw().c
w=this.gaw()
v=w.d
if(v==null){v=new S.O(null,null,[P.u])
v.al()
v.m(C.d)
w.d=v
w=v}else w=v
w=w.q()
v=this.gaw().e
u=this.gaw().f
z=new X.q7(y,x,w,v,u)
if(y==null)H.i(P.l("droppedItems"))
if(x==null)H.i(P.l("groundMaterial"))
if(w==null)H.i(P.l("playerTeamIds"))
if(v==null)H.i(P.l("id"))
if(u==null)H.i(P.l("time"))}this.m(z)
return z}}}],["","",,A,{"^":"",mP:{"^":"z;J:c<,K:d<,a1:e<,O:f<,L:r<,b,a",
ga8:function(){return"stab <object>"},
gh:function(){return"OffBalanceOpportunityThrust"},
gag:function(){return"will <subject> hit <objectPronoun>?"},
P:[function(a,b,c){var z=this.b
a.ac(c,"<subject> tr<ies> to stab <object>",z)
a.aj(c,"<subject> {go<es> wide|fail<s>|miss<es>}",!0)
return H.b(a.gh())+" fails to stab "+H.b(z.gh())},"$3","gM",6,0,1],
R:[function(a,b,c){var z,y
z=this.b
b.X(z.gi(),new A.mQ(a))
y=b.v(z.gi())
if(!(!y.gaI()&&y.gi()!==100)){a.bp(c,"<subject> thrust<s> {|"+H.b(U.ab(a))+"} deep into <object's> {shoulder|hip|thigh}",y,!0)
N.b4(c,y)}else{a.bp(c,"<subject> {stab<s>|run<s> "+H.b(U.ab(a))+" through} <object>",y,!0)
N.bi(c,b,y)}return H.b(a.gh())+" stabs "+H.b(z.gh())},"$3","gN",6,0,1],
I:function(a,b){if(a.gT()===!0)return 0.6
return 0.5},
H:function(a,b){return a.ga5()&&this.b.gar()&&a.e.geR()},
w:{
xq:[function(a){return new A.mP("When an opponent is out of balance they are the most vulnerable.",!0,!0,!0,C.c,a,null)},"$1","vc",2,0,4]}},mQ:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gae()
y=this.a.gS().gbA()
if(typeof z!=="number")return z.at()
a.sae(z-y)
return a}}}],["","",,U,{"^":"",
mL:function(a,b){var z=new U.dT(null,null,null,null,null)
new U.tP(a,b).$1(z)
return z.q()},
fD:{"^":"af;",
gaH:function(){return H.q([A.vc()],[{func:1,ret:Q.z,args:[R.A]}])},
gbP:function(){return[$.$get$dY()]},
gh:function(){return"OffBalanceOpportunitySituation"},
ay:function(){var z=new U.dT(null,null,null,null,null)
z.m(this)
new U.mM().$1(z)
return z.q()},
b_:function(a,b){var z,y,x,w,v
if(typeof a!=="number")return a.b7()
if(a>0)return
z=b.v(this.a)
y=b.a
x=H.m(y,0)
w=P.P(new H.K(y,new U.mN(this,b,z),[x]),!0,x)
if(w.length===0)return
v=C.a.gcY(w)
if(v.ga5()&&z.gar()&&v.e.geR())return v
return},
b6:function(a,b){return new H.K(a,new U.mO(b,b.v(this.a)),[H.m(a,0)])}},
tP:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$aa().as(1073741823)
a.gbe().d=z
a.gbe().e=0
z=this.a.gi()
a.gbe().b=z
z=this.b
z=z==null?z:z.gi()
a.gbe().c=z
return a}},
mM:{"^":"a:0;",
$1:function(a){var z=a.gbe().e
if(typeof z!=="number")return z.ak()
a.gbe().e=z+1
return a}},
mN:{"^":"a:24;a,b,c",
$1:function(a){var z,y
if(a.gaq())if(a.eO(this.c,this.b)){z=a.y
y=this.a.b
y=z==null?y!=null:z!==y
z=y}else z=!1
else z=!1
return z}},
mO:{"^":"a:0;a,b",
$1:function(a){var z=this.b
return J.e(a,z)||a.eO(z,this.a)}},
q8:{"^":"fD;a,b,i:c<,V:d<",
a2:function(a){var z=new U.dT(null,null,null,null,null)
z.m(this)
a.$1(z)
return z.q()},
B:function(a,b){var z,y
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
gD:function(a){return Y.V(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
k:function(a){return"OffBalanceOpportunitySituation {actorId="+H.b(J.h(this.a))+",\nculpritId="+J.h(this.b)+",\nid="+J.h(this.c)+",\ntime="+J.h(this.d)+",\n}"}},
dT:{"^":"d;a,b,c,d,e",
gi:function(){return this.gbe().d},
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
z=new U.q8(y,x,w,v)
if(y==null)H.i(P.l("actorId"))
if(w==null)H.i(P.l("id"))
if(v==null)H.i(P.l("time"))}this.m(z)
return z}}}],["","",,O,{"^":"",lz:{"^":"z;J:c<,K:d<,a1:e<,O:f<,b,a",
ga8:function(){return""},
gh:function(){return"FinishPunch"},
gL:function(){return},
gag:function(){return"(WARNING should not be user-visible)"},
P:[function(a,b,c){throw H.c(new P.Z(null))},"$3","gM",6,0,1],
R:[function(a,b,c){var z,y,x,w
z=this.b
y=z.ga5()?C.h:C.f
x=b.ah("PunchSituation").gi()
w=U.bA(b)
b.X(z.y,new O.lA(y))
switch(y){case C.k:throw H.c(new P.w("Enemy's pose should never be 'standing' after a successful punch"))
case C.h:c.fS(0,"<subject> {punch<es> <object> in the {face|nose|eye|jaw}|punch<es> <object's> {face|nose|eye|jaw}}",x,z,!0,a)
z.aE(c,"<subject> {stagger<s>|stumble<s>} off balance",!0)
break
case C.f:c.fS(0,"<subject> send<s> <object> to the "+H.b(w)+" with a {massive punch|well-placed fist} to the {face|nose|eye|jaw}",x,z,!0,a)
break}return H.b(a.gh())+" punches "+H.b(z.dx)+" to "+y.k(0)},"$3","gN",6,0,1],
I:function(a,b){return 1},
H:function(a,b){return!0},
w:{
xg:[function(a){return new O.lz(null,!0,!0,!1,a,null)},"$1","ur",2,0,4]}},lA:{"^":"a:0;a",
$1:function(a){a.sai(this.a)
return a}}}],["","",,E,{"^":"",kG:{"^":"z;J:c<,K:d<,a1:e<,O:f<,L:r<,b,a",
ga8:function(){return"dodge"},
gh:function(){return"DodgePunch"},
gag:function(){return"will <subject> dodge the fist?"},
P:[function(a,b,c){var z=b.ah("PunchSituation").gi()
a.hv(c,"<subject> tr<ies> to {dodge|sidestep|move out of the way}",z,!0)
S.a7(new E.kH(a,c,z),new E.kI(this,a,c,z),null,null)
b.aA()
return H.b(a.gh())+" fails to dodge "+H.b(this.b.gh())},"$3","gM",6,0,1],
R:[function(a,b,c){var z=this.b
a.bT(c,"<subject> {dodge<s>|sidestep<s>} <object's> {punch|blow|jab}",b.ah("PunchSituation").gi(),z,!0)
b.aX("FightSituation")
if(a.gT()===!0)c.t(0,"this opens an opportunity for a counter attack")
C.a.t(b.f,S.c6(a,z))
return H.b(a.gh())+" dodges punch from "+H.b(z.gh())},"$3","gN",6,0,1],
I:function(a,b){var z,y
z=a.ga5()?0:0.2
if(a.cx===!0)return 0.7-z
y=b.f
return(y.length!==0?C.a.gA(y):null).gb5().b4(0.4-z)},
H:function(a,b){return!0},
w:{
xa:[function(a){return new E.kG("Dodging means moving your body out of harm's way.",!1,!1,!0,C.c,a,null)},"$1","uf",2,0,4]}},kH:{"^":"a:2;a,b,c",
$0:function(){return this.a.c7(this.b,"<subject> {can't|fail<s>|<does>n't succeed}",this.c,!0,!0)}},kI:{"^":"a:2;a,b,c,d",
$0:function(){return this.a.b.kZ(this.c,"<subject> <is> too quick for <object>",this.d,!0,!0,this.b)}}}],["","",,Z,{"^":"",
e3:function(a,b,c){var z=new Z.e2(null,null,null,null,null,null)
new Z.tJ(a,b,c).$1(z)
return z.q()},
fN:{"^":"c8;",
gaH:function(){return[E.uf()]},
gh:function(){return"PunchDefenseSituation"},
ay:function(){var z=new Z.e2(null,null,null,null,null,null)
z.m(this)
new Z.nv().$1(z)
return z.q()}},
tJ:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$aa().as(1073741823)
a.gaP().c=z
a.gaP().f=0
z=this.a.gi()
a.gaP().b=z
z=this.b.gi()
a.gaP().e=z
a.gaP().d=this.c
return a}},
nv:{"^":"a:0;",
$1:function(a){var z=a.gaP().f
if(typeof z!=="number")return z.ak()
a.gaP().f=z+1
return a}},
qb:{"^":"fN;cS:a<,i:b<,cu:c<,cz:d<,V:e<",
a2:function(a){var z=new Z.e2(null,null,null,null,null,null)
z.m(this)
a.$1(z)
return z.q()},
B:function(a,b){var z,y
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
gD:function(a){return Y.V(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)))},
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
z=new Z.qb(y,x,w,v,u)
if(y==null)H.i(P.l("attacker"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("predeterminedResult"))
if(v==null)H.i(P.l("target"))
if(u==null)H.i(P.l("time"))}this.m(z)
return z}}}],["","",,Q,{"^":"",
fP:function(a,b){var z=new Q.e4(null,null,null,null,null)
new Q.tK(a,b).$1(z)
return z.q()},
fO:{"^":"af;",
gaH:function(){return[O.ur()]},
gh:function(){return"PunchSituation"},
ay:function(){var z=new Q.e4(null,null,null,null,null)
z.m(this)
new Q.nw().$1(z)
return z.q()},
b_:function(a,b){if(a===0)return b.v(this.a)
return},
b6:function(a,b){return new H.K(a,new Q.nx(this),[H.m(a,0)])}},
tK:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$aa().as(1073741823)
a.gbf().c=z
a.gbf().e=0
z=this.a.gi()
a.gbf().b=z
z=this.b.gi()
a.gbf().d=z
return a}},
nw:{"^":"a:0;",
$1:function(a){var z=a.gbf().e
if(typeof z!=="number")return z.ak()
a.gbf().e=z+1
return a}},
nx:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.e(a.gi(),z.a)||J.e(a.gi(),z.c)}},
qc:{"^":"fO;a,i:b<,c,V:d<",
a2:function(a){var z=new Q.e4(null,null,null,null,null)
z.m(this)
a.$1(z)
return z.q()},
B:function(a,b){var z,y
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
gD:function(a){return Y.V(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
k:function(a){return"PunchSituation {attacker="+H.b(J.h(this.a))+",\nid="+J.h(this.b)+",\ntarget="+H.b(J.h(this.c))+",\ntime="+J.h(this.d)+",\n}"}},
e4:{"^":"d;a,b,c,d,e",
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
z=new Q.qc(y,x,w,v)
if(y==null)H.i(P.l("attacker"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("target"))
if(v==null)H.i(P.l("time"))}this.m(z)
return z}}}],["","",,O,{"^":"",lB:{"^":"z;J:c<,K:d<,a1:e<,O:f<,L:r<,b,a",
ga8:function(){return""},
gh:function(){return"FinishSlash"},
gag:function(){return"(WARNING should not be user-visible)"},
P:[function(a,b,c){throw H.c(new P.Z(null))},"$3","gM",6,0,1],
R:[function(a,b,c){var z,y,x,w,v
z=this.b
b.X(z.gi(),new O.lE(a))
y=b.v(z.gi())
x=b.ah("SlashSituation").gi()
w=!y.gaI()&&y.gi()!==100
if(!w){a.bT(c,"<subject> {slash<es>|cut<s>} <object's> {shoulder|abdomen|thigh}",x,y,!0)
N.b4(c,y)}else{a.bT(c,"<subject> {slash<es>|cut<s>} {across|through} <object's> {neck|abdomen|lower body}",x,y,!0)
if(J.e(a.gS().gh(),$.$get$cB().b)&&J.ds(z.gh(),"orc")===!0)a.e.aB(c,"<subject> slit<s> through the flesh like it isn't there.",!0)
N.bi(c,b,y)}v=H.b(a.gh())+" slashes"
return v+(w?" (and kills)":"")+" "+H.b(z.gh())},"$3","gN",6,0,1],
I:function(a,b){return 1},
H:function(a,b){return a.gS().gaV()},
w:{
xi:[function(a){return new O.lB(null,!0,!0,!0,C.c,a,null)},"$1","us",2,0,4]}},lE:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gae()
y=this.a.gS().gbK()
if(typeof z!=="number")return z.at()
a.sae(z-y)
return a}}}],["","",,V,{"^":"",lF:{"^":"z;J:c<,K:d<,a1:e<,O:f<,L:r<,b,a",
ga8:function(){return""},
gh:function(){return"FinishThrustSpear"},
gag:function(){return"(WARNING should not be user-visible)"},
P:[function(a,b,c){throw H.c(new P.Z(null))},"$3","gM",6,0,1],
R:[function(a,b,c){var z,y,x,w,v
z=this.b
b.X(z.gi(),new V.lI(a))
y=b.v(z.gi())
x=b.ah("SlashSituation").gi()
w=!y.gaI()&&y.gi()!==100
if(!w){a.bT(c,"<subject> {pierce<s>|stab<s>|bore<s> through} <object's> {shoulder|abdomen|thigh}",x,y,!0)
N.b4(c,y)}else{a.bT(c,"<subject> {pierce<s>|stab<s>|bore<s> through|impale<s>} <object's> {neck|chest|heart}",x,y,!0)
N.bi(c,b,y)}v=H.b(a.gh())+" pierces"
return v+(w?" (and kills)":"")+" "+H.b(z.gh())},"$3","gN",6,0,1],
I:function(a,b){return 1},
H:function(a,b){return a.gS() instanceof Z.ak},
w:{
xk:[function(a){return new V.lF(null,!0,!0,!0,C.c,a,null)},"$1","uu",2,0,4]}},lI:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gae()
y=this.a.gS().gbA()
if(typeof z!=="number")return z.at()
a.sae(z-y)
return a}}}],["","",,X,{"^":"",kr:{"^":"z;J:c<,K:d<,a1:e<,O:f<,L:r<,b,a",
ga8:function(){return"step back and parry"},
gh:function(){return"DefensiveParrySlash"},
gag:function(){return"will <subject> parry it?"},
P:[function(a,b,c){a.a6(c,"<subject> tr<ies> to {parry|deflect it|meet it with "+H.b(U.ab(a))+"|fend it off}")
if(a.gar())a.aj(c,"<subject> <is> out of balance",!0)
else S.a7(new X.ks(a,c),new X.kt(this,a,c),null,null)
b.aA()
return H.b(a.dx)+" fails to parry "+H.b(this.b.gh())},"$3","gM",6,0,1],
R:[function(a,b,c){if(a.gT()===!0)a.a6(c,"<subject> {step<s>|take<s> a step} back")
a.bj(c,"<subject> {parr<ies> it|deflect<s> it|meet<s> it with "+H.b(U.ab(a))+"|fend<s> it off}",!0)
if(!a.ga5()){b.X(a.y,new X.ku())
if(a.cx===!0)a.a6(c,"<subject> regain<s> balance")}b.aX("FightSituation")
return H.b(a.dx)+" steps back and parries "+H.b(this.b.gh())},"$3","gN",6,0,1],
I:function(a,b){var z,y,x
if(a.gT()===!0)return 1
z=b.f
y=z.length!==0?C.a.gA(z):null
x=a.ga5()?0:0.2
return y.gb5().b4(0.5-x)},
H:function(a,b){return a.gS().gcl()},
w:{
x7:[function(a){return new X.kr("Stepping back is the safest way to get out of harm's way.",!1,!1,!0,C.c,a,null)},"$1","ua",2,0,4]}},ks:{"^":"a:2;a,b",
$0:function(){return this.a.aj(this.b,"<subject> {fail<s>|<does>n't succeed}",!0)}},kt:{"^":"a:2;a,b,c",
$0:function(){return this.a.b.bS(this.c,"<subject> <is> too quick for <object>",!0,this.b)}},ku:{"^":"a:0;",
$1:function(a){a.sai(C.k)
return a}}}],["","",,F,{"^":"",kJ:{"^":"z;J:c<,K:d<,a1:e<,O:f<,L:r<,b,a",
gh:function(){return"DodgeSlash"},
ga8:function(){return"dodge and counter"},
gag:function(){return"will <subject> dodge?"},
P:[function(a,b,c){a.a6(c,"<subject> tr<ies> to {dodge|sidestep}")
if(a.gar())a.aj(c,"<subject> <is> out of balance",!0)
else S.a7(new F.kK(a,c),new F.kL(this,a,c),null,null)
b.aA()
return H.b(a.dx)+" fails to dodge "+H.b(this.b.gh())},"$3","gM",6,0,1],
R:[function(a,b,c){var z=this.b
a.bp(c,"<subject> {dodge<s>|sidestep<s>} it",z,!0)
if(z.ga5()){z.c6(c,"<subject> lose<s> balance because of that",!0,!0)
b.X(z.y,new F.kM())}b.aX("FightSituation")
if(a.gT()===!0)c.t(0,"this opens an opportunity for a counter attack")
C.a.t(b.f,S.c6(a,z))
return H.b(a.gh())+" dodges "+H.b(z.dx)},"$3","gN",6,0,1],
I:function(a,b){var z,y
z=a.ga5()?0:0.2
if(a.cx===!0)return 0.7-z
y=b.f
return(y.length!==0?C.a.gA(y):null).gb5().b4(0.4-z)},
H:function(a,b){return!a.ga0()&&this.b.gS().gaV()},
w:{
xb:[function(a){return new F.kJ("Dodging means moving your body out of harm's way. When done correctly, it will throw your opponent off balance and it will open an opportunity for a counter attack. When botched, it can get you killed.",!1,!1,!0,C.c,a,null)},"$1","ug",2,0,4]}},kK:{"^":"a:2;a,b",
$0:function(){return this.a.aj(this.b,"<subject> {can't|fail<s>|<does>n't succeed}",!0)}},kL:{"^":"a:2;a,b,c",
$0:function(){return this.a.b.bS(this.c,"<subject> <is> too quick for <object>",!0,this.b)}},kM:{"^":"a:0;",
$1:function(a){a.sai(C.h)
return C.h}}}],["","",,M,{"^":"",kN:{"^":"z;J:c<,K:d<,a1:e<,O:f<,L:r<,b,a",
ga8:function(){return"dodge and counter"},
gh:function(){return"DodgeThrustSpear"},
gag:function(){return"will <subject> dodge?"},
P:[function(a,b,c){a.a6(c,"<subject> tr<ies> to {dodge|sidestep}")
if(a.gar())a.aj(c,"<subject> <is> out of balance",!0)
else S.a7(new M.kO(a,c),new M.kP(this,a,c),null,null)
b.aA()
return H.b(a.dx)+" fails to dodge "+H.b(this.b.gh())+"'s spear"},"$3","gM",6,0,1],
R:[function(a,b,c){var z=this.b
a.bp(c,"<subject> {dodge<s>|sidestep<s>} it",z,!0)
if(z.ga5()){z.c6(c,"<subject> lose<s> balance because of that",!0,!0)
b.X(z.y,new M.kQ())}b.aX("FightSituation")
if(a.gT()===!0)c.t(0,"this opens an opportunity for a counter attack")
C.a.t(b.f,S.c6(a,z))
return H.b(a.gh())+" dodges "+H.b(z.dx)+"'s spear"},"$3","gN",6,0,1],
I:function(a,b){var z,y
z=a.ga5()?0:0.2
if(a.cx===!0)return 0.7-z
y=b.f
return(y.length!==0?C.a.gA(y):null).gb5().b4(0.4-z)},
H:function(a,b){return!a.ga0()&&this.b.gS() instanceof Z.ak},
w:{
xc:[function(a){return new M.kN("Dodging means moving your body out of harm's way. When done correctly, it will throw your opponent off balance and it will open an opportunity for a counter attack. When botched, it can get you killed.",!1,!1,!0,C.c,a,null)},"$1","uh",2,0,4]}},kO:{"^":"a:2;a,b",
$0:function(){return this.a.aj(this.b,"<subject> {can't|fail<s>|<does>n't succeed}",!0)}},kP:{"^":"a:2;a,b,c",
$0:function(){return this.a.b.bS(this.c,"<subject> <is> too quick for <object>",!0,this.b)}},kQ:{"^":"a:0;",
$1:function(a){a.sai(C.h)
return C.h}}}],["","",,O,{"^":"",mf:{"^":"z;J:c<,K:d<,a1:e<,O:f<,L:r<,b,a",
ga8:function(){return"jump back"},
gh:function(){return"JumpBackFromSlash"},
gag:function(){return"will <subject> avoid the slash?"},
P:[function(a,b,c){a.aB(c,"<subject> {jump<s>|leap<s>} {back|backward} but <subject> <is> {not fast enough|too slow}.",!0)
b.aA()
return H.b(a.gh())+" fails to jump back from "+H.b(this.b.gh())},"$3","gM",6,0,1],
R:[function(a,b,c){var z
a.bj(c,"<subject> {leap<s>|jump<s>} {back|backwards|out of reach}",!0)
z=this.b
c.bX(0,"<owner's> <subject> {slash<es>|cut<s>} empty air",z,z.gS())
b.aX("FightSituation")
return H.b(a.gh())+" jumps back from "+H.b(z.gh())+"'s attack"},"$3","gN",6,0,1],
I:function(a,b){var z,y,x
if(a.gT()===!0)return 1
z=b.f
y=z.length!==0?C.a.gA(z):null
x=a.ga5()?0:0.2
return y.gb5().b4(0.5-x)},
H:function(a,b){return a.gaz()&&this.b.gS().gaV()},
w:{
xo:[function(a){return new O.mf("Jump back and the weapon can't reach you.",!1,!1,!0,C.c,a,null)},"$1","v6",2,0,4]}}}],["","",,G,{"^":"",n1:{"^":"z;J:c<,K:d<,a1:e<,O:f<,L:r<,b,a",
gh:function(){return"ParrySlash"},
ga8:function(){return"parry and counter"},
gag:function(){return"will <subject> parry?"},
P:[function(a,b,c){a.a6(c,"<subject> tr<ies> to {parry|deflect it|meet it with "+H.b(U.ab(a))+"|fend it off}")
if(a.gar())a.aj(c,"<subject> <is> out of balance",!0)
else S.a7(new G.n2(a,c),new G.n3(this,a,c),null,null)
b.aA()
return H.b(a.dx)+" fails to parry "+H.b(this.b.gh())},"$3","gM",6,0,1],
R:[function(a,b,c){var z=this.b
if(z.gar()){c.eC(0,"<subject> <is> out of balance",!0,!0,z)
c.bX(0,"so <ownerPronoun's> <subject> is {weak|feeble}",z,$.$get$iM())
a.bj(c,"<subject> {parr<ies> it easily|easily meet<s> it with "+H.b(U.ab(a))+"|fend<s> it off easily}",!0)}else a.bj(c,"<subject> {parr<ies> it|meet<s> it with "+H.b(U.ab(a))+"|fend<s> it off}",!0)
b.aX("FightSituation")
if(a.gT()===!0)c.t(0,"this opens an opportunity for a counter attack")
C.a.t(b.f,S.c6(a,z))
return H.b(a.gh())+" parries "+H.b(z.dx)},"$3","gN",6,0,1],
I:function(a,b){var z,y,x
z=a.ga5()?0:0.2
y=this.b.gar()?0.3:0
if(a.cx===!0)return 0.6-z+y
x=b.f
return(x.length!==0?C.a.gA(x):null).gb5().b4(0.3-z+y)},
H:function(a,b){return a.gS().gcl()},
w:{
xt:[function(a){return new G.n1("Parrying means deflecting your opponent's move with your weapon. When successful, it will give you an opportunity for a counter attack. It won't throw your opponent off balance like dodging does, but it's also slightly easier to do.",!1,!1,!0,C.c,a,null)},"$1","vf",2,0,4]}},n2:{"^":"a:2;a,b",
$0:function(){return this.a.aj(this.b,"<subject> {fail<s>|<does>n't succeed}",!0)}},n3:{"^":"a:2;a,b,c",
$0:function(){return this.a.b.bS(this.c,"<subject> <is> too quick for <object>",!0,this.b)}}}],["","",,E,{"^":"",oo:{"^":"z;J:c<,K:d<,a1:e<,O:f<,L:r<,b,a",
ga8:function(){return"block with shield and counter"},
gh:function(){return"ShieldBlockSlash"},
gag:function(){return"will <subject> block the slash?"},
P:[function(a,b,c){a.a6(c,"<subject> tr<ies> to {block|stop|deflect} the {swing|attack|strike} with "+H.b(U.c0(a)))
if(a.gar())a.aj(c,"<subject> <is> out of balance",!0)
else S.a7(new E.op(a,c),new E.oq(a,c),new E.or(this,a,c),null)
b.aA()
return H.b(a.dx)+" fails to block "+H.b(this.b.gh())+" with shield"},"$3","gM",6,0,1],
R:[function(a,b,c){var z=this.b
if(z.gar()){c.eC(0,"<subject> <is> out of balance",!0,!0,z)
c.bX(0,"so <ownerPronoun's> <subject> is {weak|feeble}",z,$.$get$iL())
a.bj(c,"<subject> easily {block|stop|deflect} the {swing|attack|strike} with "+H.b(U.c0(a)),!0)}else a.bj(c,"<subject> {block|stop|deflect} the {swing|attack|strike} with "+H.b(U.c0(a)),!0)
b.aX("FightSituation")
if(a.gT()===!0)c.t(0,"this opens an opportunity for a counter attack")
C.a.t(b.f,S.c6(a,z))
return H.b(a.gh())+" blocks "+H.b(z.dx)+" with a shield"},"$3","gN",6,0,1],
I:function(a,b){var z,y,x
z=a.ga5()?0:0.2
y=this.b.gar()?0.2:0
if(a.cx===!0)return 0.8-z+y
x=b.f
return(x.length!==0?C.a.gA(x):null).gb5().b4(0.5-z+y)},
H:function(a,b){return a.gam()!=null},
w:{
xA:[function(a){return new E.oo("A shield blocks enemy attacks with the least amount of energy and movement. It is easy and quick to launch a counter-attack when the enemy's weapon is stopped in this way.",!1,!1,!0,C.c,a,null)},"$1","vu",2,0,4]}},op:{"^":"a:2;a,b",
$0:function(){return this.a.aj(this.b,"<subject> {fail<s>|<does>n't succeed}",!0)}},oq:{"^":"a:2;a,b",
$0:function(){return this.a.aj(this.b,"<subject> <is> too slow",!0)}},or:{"^":"a:2;a,b,c",
$0:function(){return this.a.b.bS(this.c,"<subject> <is> too quick for <object>",!0,this.b)}}}],["","",,L,{"^":"",
aP:function(a,b,c){var z=new L.e9(null,null,null,null,null,null)
new L.tG(a,b,c).$1(z)
return z.q()},
h0:{"^":"c8;",
gaH:function(){return[X.ua(),F.ug(),M.uh(),O.v6(),G.vf(),E.vu()]},
gh:function(){return"SlashDefenseSituation"},
ay:function(){var z=new L.e9(null,null,null,null,null,null)
z.m(this)
new L.ov().$1(z)
return z.q()}},
tG:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$aa().as(1073741823)
a.gaQ().c=z
a.gaQ().f=0
z=this.a.gi()
a.gaQ().b=z
z=this.b.gi()
a.gaQ().e=z
a.gaQ().d=this.c
return a}},
ov:{"^":"a:0;",
$1:function(a){var z=a.gaQ().f
if(typeof z!=="number")return z.ak()
a.gaQ().f=z+1
return a}},
qe:{"^":"h0;cS:a<,i:b<,cu:c<,cz:d<,V:e<",
a2:function(a){var z=new L.e9(null,null,null,null,null,null)
z.m(this)
a.$1(z)
return z.q()},
B:function(a,b){var z,y
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
gD:function(a){return Y.V(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)))},
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
z=new L.qe(y,x,w,v,u)
if(y==null)H.i(P.l("attacker"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("predeterminedResult"))
if(v==null)H.i(P.l("target"))
if(u==null)H.i(P.l("time"))}this.m(z)
return z}}}],["","",,M,{"^":"",
bc:function(a,b){var z=new M.ea(null,null,null,null,null)
new M.tI(a,b).$1(z)
return z.q()},
h1:{"^":"af;",
gaH:function(){return[O.us(),V.uu()]},
gh:function(){return"SlashSituation"},
ay:function(){var z=new M.ea(null,null,null,null,null)
z.m(this)
new M.ow().$1(z)
return z.q()},
b_:function(a,b){if(a===0)return b.v(this.a)
return},
b6:function(a,b){return new H.K(a,new M.ox(this),[H.m(a,0)])}},
tI:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$aa().as(1073741823)
a.gbg().c=z
a.gbg().e=0
z=this.a.gi()
a.gbg().b=z
z=this.b.gi()
a.gbg().d=z
return a}},
ow:{"^":"a:0;",
$1:function(a){var z=a.gbg().e
if(typeof z!=="number")return z.ak()
a.gbg().e=z+1
return a}},
ox:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.e(a.gi(),z.a)||J.e(a.gi(),z.c)}},
qf:{"^":"h1;a,i:b<,c,V:d<",
a2:function(a){var z=new M.ea(null,null,null,null,null)
z.m(this)
a.$1(z)
return z.q()},
B:function(a,b){var z,y
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
gD:function(a){return Y.V(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
k:function(a){return"SlashSituation {attacker="+H.b(J.h(this.a))+",\nid="+J.h(this.b)+",\ntarget="+H.b(J.h(this.c))+",\ntime="+J.h(this.d)+",\n}"}},
ea:{"^":"d;a,b,c,d,e",
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
z=new M.qf(y,x,w,v)
if(y==null)H.i(P.l("attacker"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("target"))
if(v==null)H.i(P.l("time"))}this.m(z)
return z}}}],["","",,Q,{"^":"",lC:{"^":"z;J:c<,K:d<,a1:e<,O:f<,L:r<,b,a",
gh:function(){return"FinishSlashGroundedEnemy"},
ga8:function(){return""},
gag:function(){return"(WARNING should not be user-visible)"},
P:[function(a,b,c){throw H.c(new P.Z(null))},"$3","gM",6,0,1],
R:[function(a,b,c){var z,y,x
z=this.b
b.X(z.gi(),new Q.lD())
y=b.v(z.gi())
x=J.e(y.gi(),100)
c.eB(0,"<subject> {cut<s>|slash<es>|slit<s>} <object's> "+(x?"side":"{throat|neck|side}"),y,a.gS())
if(x)N.b4(c,y)
else N.bi(c,b,y)
return H.b(a.gh())+" slains "+H.b(z.gh())+" on the ground"},"$3","gN",6,0,1],
I:function(a,b){return 1},
H:function(a,b){return this.b.ga0()&&a.gS().gaV()},
w:{
xh:[function(a){return new Q.lC(null,!0,!0,!0,C.c,a,null)},"$1","ut",2,0,4]}},lD:{"^":"a:0;",
$1:function(a){a.sae(0)
return a}}}],["","",,V,{"^":"",lG:{"^":"z;J:c<,K:d<,a1:e<,O:f<,L:r<,b,a",
ga8:function(){return""},
gh:function(){return"FinishThrustSpearAtGroundedEnemy"},
gag:function(){return"(WARNING should not be user-visible)"},
P:[function(a,b,c){throw H.c(new P.Z(null))},"$3","gM",6,0,1],
R:[function(a,b,c){var z,y,x
z=this.b
b.X(z.gi(),new V.lH())
y=b.v(z.gi())
x=J.e(y.gi(),100)
c.eB(0,"<subject> {impale<s>|bore<s> through|pierce<s>} <object's> "+(x?"side":"{throat|neck|heart}"),y,a.gS())
if(x)N.b4(c,y)
else N.bi(c,b,y)
return H.b(a.gh())+" slains "+H.b(z.gh())+" on the ground with a spear"},"$3","gN",6,0,1],
I:function(a,b){return 1},
H:function(a,b){return this.b.ga0()&&a.gS() instanceof Z.ak},
w:{
xj:[function(a){return new V.lG(null,!0,!0,!0,C.c,a,null)},"$1","uv",2,0,4]}},lH:{"^":"a:0;",
$1:function(a){a.sae(0)
return a}}}],["","",,K,{"^":"",mS:{"^":"z;K:c<,a1:d<,O:e<,L:f<,J:r<,b,a",
gh:function(){return"OnGroundParry"},
ga8:function(){return"parry it"},
gag:function(){return"will <subject> parry it?"},
P:[function(a,b,c){a.a6(c,"<subject> tr<ies> to {parry|deflect it|stop it{| with "+H.b(U.ab(a))+"}}")
S.a7(new K.mT(a,c),new K.mU(this,a,c),null,null)
b.aA()
return H.b(a.gh())+" fails to parry "+H.b(this.b.gh())},"$3","gM",6,0,1],
R:[function(a,b,c){a.bj(c,"<subject> {parr<ies> it|stop<s> it with "+H.b(U.ab(a))+"}",!0)
b.aX("FightSituation")
return H.b(a.gh())+" parries "+H.b(this.b.gh())},"$3","gN",6,0,1],
I:function(a,b){var z
if(a.gT()===!0)return 0.6
z=b.f
return(z.length!==0?C.a.gA(z):null).gb5().b4(0.3)},
H:function(a,b){return this.b.gS().gaV()&&a.gS().gcl()},
w:{
xr:[function(a){return new K.mS(!1,!1,!0,C.c,"TODO",a,null)},"$1","vd",2,0,4]}},mT:{"^":"a:2;a,b",
$0:function(){return this.a.aj(this.b,"<subject> {fail<s>|<does>n't succeed}",!0)}},mU:{"^":"a:2;a,b,c",
$0:function(){return this.a.b.bS(this.c,"<subject> <is> too quick for <object>",!0,this.b)}}}],["","",,L,{"^":"",mV:{"^":"z;J:c<,K:d<,a1:e<,O:f<,L:r<,b,a",
ga8:function(){return"block with shield"},
gh:function(){return"OnGroundShieldBlock"},
gag:function(){return"will <subject> block the strike?"},
P:[function(a,b,c){a.a6(c,"<subject> tr<ies> to {block|stop|deflect} the {swing|attack|strike} with "+H.b(U.c0(a)))
S.a7(new L.mW(a,c),new L.mX(a,c),new L.mY(this,a,c),null)
b.aA()
return H.b(a.gh())+" fails to block "+H.b(this.b.gh())+" with shield on ground"},"$3","gM",6,0,1],
R:[function(a,b,c){var z=this.b
if(z.gar()){c.eC(0,"<subject> <is> out of balance",!0,!0,z)
c.bX(0,"so <ownerPronoun's> <subject> is {weak|feeble}",z,$.$get$iK())
a.bj(c,"<subject> easily {block|stop|deflect} the {swing|attack|strike} with "+H.b(U.c0(a)),!0)}else a.bj(c,"<subject> {block|stop|deflect} the {swing|attack|strike} with "+H.b(U.c0(a)),!0)
b.aX("FightSituation")
return H.b(a.gh())+" blocks "+H.b(z.dx)+" with a shield on ground"},"$3","gN",6,0,1],
I:function(a,b){var z
if(a.gT()===!0)return 0.8
z=b.f
return(z.length!==0?C.a.gA(z):null).gb5().b4(0.5)},
H:function(a,b){return a.gam()!=null},
w:{
xs:[function(a){return new L.mV("A shield blocks enemy attacks with the least amount of energy and movement.",!1,!1,!0,C.c,a,null)},"$1","ve",2,0,4]}},mW:{"^":"a:2;a,b",
$0:function(){return this.a.aj(this.b,"<subject> {fail<s>|<does>n't succeed}",!0)}},mX:{"^":"a:2;a,b",
$0:function(){return this.a.aj(this.b,"<subject> <is> too slow",!0)}},mY:{"^":"a:2;a,b,c",
$0:function(){return this.a.b.bS(this.c,"<subject> <is> too quick for <object>",!0,this.b)}}}],["","",,Y,{"^":"",nJ:{"^":"z;J:c<,K:d<,a1:e<,O:f<,L:r<,b,a",
gh:function(){return"RollOutOfWay"},
ga8:function(){return"roll out of way"},
gag:function(){return"will <subject> evade?"},
P:[function(a,b,c){a.a6(c,"<subject> tr<ies> to roll out of the way")
a.aj(c,"<subject> can't",!0)
b.aA()
return H.b(a.gh())+" fails to roll out of the way"},"$3","gM",6,0,1],
R:[function(a,b,c){a.eY(c,"<subject> <is> able to roll out of the way",!0,!0)
if(a.gT()===!0){b.X(a.gi(),new Y.nK())
a.bj(c,"<subject> jump<s> up on <subject's> feet",!0)}b.aX("FightSituation")
return H.b(a.gh())+" rolls out of the way of "+H.b(this.b.gh())+"'s strike"},"$3","gN",6,0,1],
I:function(a,b){var z
if(a.gT()===!0)return 1
z=b.f
return(z.length!==0?C.a.gA(z):null).gb5().b4(0.5)},
H:function(a,b){return!0},
w:{
xz:[function(a){return new Y.nJ(null,!1,!1,!0,C.c,a,null)},"$1","vn",2,0,4]}},nK:{"^":"a:0;",
$1:function(a){a.sai(C.k)
return a}}}],["","",,V,{"^":"",
bJ:function(a,b,c){var z=new V.dU(null,null,null,null,null,null)
new V.tD(a,b,c).$1(z)
return z.q()},
fE:{"^":"c8;",
gaH:function(){return[K.vd(),L.ve(),Y.vn()]},
gh:function(){return"OnGroundDefenseSituation"},
ay:function(){var z=new V.dU(null,null,null,null,null,null)
z.m(this)
new V.mR().$1(z)
return z.q()}},
tD:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$aa().as(1073741823)
a.gaO().c=z
a.gaO().f=0
z=this.a.gi()
a.gaO().b=z
z=this.b.gi()
a.gaO().e=z
a.gaO().d=this.c
return a}},
mR:{"^":"a:0;",
$1:function(a){var z=a.gaO().f
if(typeof z!=="number")return z.ak()
a.gaO().f=z+1
return a}},
q9:{"^":"fE;cS:a<,i:b<,cu:c<,cz:d<,V:e<",
a2:function(a){var z=new V.dU(null,null,null,null,null,null)
z.m(this)
a.$1(z)
return z.q()},
B:function(a,b){var z,y
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
gD:function(a){return Y.V(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)))},
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
z=new V.q9(y,x,w,v,u)
if(y==null)H.i(P.l("attacker"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("predeterminedResult"))
if(v==null)H.i(P.l("target"))
if(u==null)H.i(P.l("time"))}this.m(z)
return z}}}],["","",,D,{"^":"",
d6:function(a,b){var z=new D.eb(null,null,null,null,null)
new D.tE(a,b).$1(z)
return z.q()},
hc:{"^":"af;",
gaH:function(){return[Q.ut(),V.uv()]},
gh:function(){return"StrikeDownSituation"},
ay:function(){var z=new D.eb(null,null,null,null,null)
z.m(this)
new D.pf().$1(z)
return z.q()},
b_:function(a,b){if(a===0)return b.v(this.a)
return},
b6:function(a,b){return new H.K(a,new D.pg(this),[H.m(a,0)])}},
tE:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$aa().as(1073741823)
a.gbh().c=z
a.gbh().e=0
z=this.a.gi()
a.gbh().b=z
z=this.b.gi()
a.gbh().d=z
return a}},
pf:{"^":"a:0;",
$1:function(a){var z=a.gbh().e
if(typeof z!=="number")return z.ak()
a.gbh().e=z+1
return a}},
pg:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.e(a.gi(),z.a)||J.e(a.gi(),z.c)}},
qg:{"^":"hc;a,i:b<,c,V:d<",
a2:function(a){var z=new D.eb(null,null,null,null,null)
z.m(this)
a.$1(z)
return z.q()},
B:function(a,b){var z,y
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
gD:function(a){return Y.V(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
k:function(a){return"StrikeDownSituation {attacker="+H.b(J.h(this.a))+",\nid="+J.h(this.b)+",\ntargetOnGround="+H.b(J.h(this.c))+",\ntime="+J.h(this.d)+",\n}"}},
eb:{"^":"d;a,b,c,d,e",
gi:function(){return this.gbh().c},
gV:function(){return this.gbh().e},
gbh:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
m:function(a){this.a=a},
q:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gbh().b
x=this.gbh().c
w=this.gbh().d
v=this.gbh().e
z=new D.qg(y,x,w,v)
if(y==null)H.i(P.l("attacker"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("targetOnGround"))
if(v==null)H.i(P.l("time"))}this.m(z)
return z}}}],["","",,O,{"^":"",nl:{"^":"d;",
gb5:function(){switch(this.gcu()){case C.l:return C.a4
case C.m:return $.$get$fI()
case C.p:return $.$get$fJ()
default:throw H.c(P.G(this.gcu()))}},
$isaf:1}}],["","",,K,{"^":"",e0:{"^":"d;a,b",
k:function(a){return this.b}}}],["","",,D,{"^":"",oA:{"^":"ag;K:b<,O:c<,a1:d<,L:e<,a",
gW:function(){return""},
gJ:function(){return},
gh:function(){return"SlayMonstersAction"},
P:[function(a,b,c){throw H.c(new P.Z(null))},"$3","gM",6,0,1],
R:[function(a,b,c){var z,y,x,w
z=b.f
y=z.length!==0?C.a.gA(z):null
x=b.e_(y.gbF())
w=b.a
C.a.t(z,x.jX(b,y,new H.K(w,new D.oB(a,x),[H.m(w,0)])))
return H.b(a.gh())+" initiated combat with monsters in "+x.k(0)},"$3","gN",6,0,1],
aa:function(a,b){return"WARNING should not be user-visible"},
I:function(a,b){return 1},
H:function(a,b){var z=b.f
return H.F(z.length!==0?C.a.gA(z):null,"$isJ").c}},oB:{"^":"a:0;a,b",
$1:function(a){return a.gaq()&&a.gaY().hf(this.a.gaY())&&J.e(a.gbF(),this.b.gh())}}}],["","",,Y,{"^":"",pq:{"^":"ca;K:c<,a1:d<,O:e<,L:f<,b,a",
gJ:function(){return},
gh:function(){return"TakeExitAction"},
P:[function(a,b,c){throw H.c(new P.Z(null))},"$3","gM",6,0,1],
R:[function(a,b,c){var z,y
z=this.b
c.t(0,z.gaT())
y=b.f
H.F(y.length!==0?C.a.gA(y):null,"$isJ").kF(b,a,z.gh1(),c)
return H.b(a.gh())+" went through exit to "+z.a},"$3","gN",6,0,1],
aa:function(a,b){return"WARNING should not be user-visible"},
I:function(a,b){return 1},
H:function(a,b){var z=b.f
if(H.F(z.length!==0?C.a.gA(z):null,"$isJ").c===!0)return!1
this.b.gko()
return!0},
w:{
xE:[function(a){return new Y.pq(!1,!0,!1,null,a,null)},"$1","wW",2,0,51]}}}],["","",,F,{"^":"",
fT:function(a,b){var z=new F.e7(null,null,null,null,null)
new F.tv(a,b).$1(z)
return z.q()},
J:{"^":"af;",
gaH:function(){return[Y.wW()]},
gbP:function(){var z=[]
C.a.ax(z,$.$get$i2())
z.push($.$get$h4())
return z},
gdK:function(){return 1000},
gh:function(){return"RoomRoamingSituation"},
ay:function(){var z=new F.e7(null,null,null,null,null)
z.m(this)
new F.nL().$1(z)
return z.q()},
b_:function(a,b){return b.a.aU(0,new F.nM(),new F.nN())},
b6:function(a,b){var z=this.b_(null,b)
if(z==null)return[]
return[z]},
co:function(a,b,c){return a.hP("TakeExitAction",b,!0).bt(0,new F.nO(c))},
c4:function(a,b,c,d,e){var z,y,x,w,v,u,t
z=a.e_(c)
a.c5(this.b,F.fT(z,!this.co(a,b,c)&&z.gjW()!=null))
if(!e)if(this.iq(a,b,z))z.i1(b,a,d)
else{d.n(0,"\n\n",!0)
z.jL(b,a,d)
d.n(0,"\n\n",!0)}for(y=R.io(b,a),y=P.P(y,!0,H.y(y,"B",0)),x=y.length,w=a.a,v=0;v<y.length;y.length===x||(0,H.as)(y),++v){u=a.v(y[v].gi())
t=u.a2(new F.nP(z))
w.a3(0,u)
w.t(0,t)}},
kF:function(a,b,c,d){return this.c4(a,b,c,d,!1)},
hl:function(a,b){a.a.iJ(new F.nQ(),!0)},
dk:function(a){if(J.e(this.a,$.$get$ez().b))return!1
return!0},
iq:function(a,b,c){var z,y
for(z=a.d,z=new P.db(z,z.c,z.d,z.b,null,[H.m(z,0)]);z.u();){y=z.e
if(!J.e(y.gcv(),b.gi()))continue
if(y.gdC()!=="TakeExitAction")continue
if(J.ds(y.gaT(),c.gh())===!0)return!0}return!1}},
tv:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$aa().as(1073741823)
a.gaG().c=z
a.gaG().e=0
z=this.a.gh()
a.gaG().b=z
a.gaG().d=this.b
return a}},
nL:{"^":"a:0;",
$1:function(a){var z=a.gaG().e
if(typeof z!=="number")return z.ak()
a.gaG().e=z+1
return a}},
nM:{"^":"a:0;",
$1:function(a){return a.gT()===!0&&a.gaq()}},
nN:{"^":"a:2;",
$0:function(){return}},
nO:{"^":"a:0;a",
$1:function(a){return a.geK()===this.a}},
nP:{"^":"a:0;a",
$1:function(a){a.sbF(this.a.gh())
return a}},
nQ:{"^":"a:0;",
$1:function(a){return!a.gaI()}},
qd:{"^":"J;bF:a<,i:b<,c,V:d<",
a2:function(a){var z=new F.e7(null,null,null,null,null)
z.m(this)
a.$1(z)
return z.q()},
B:function(a,b){var z,y
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
gD:function(a){return Y.V(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
k:function(a){return"RoomRoamingSituation {currentRoomName="+H.b(J.h(this.a))+",\nid="+J.h(this.b)+",\nmonstersAlive="+J.h(this.c)+",\ntime="+J.h(this.d)+",\n}"}},
e7:{"^":"d;a,b,c,d,e",
gbF:function(){return this.gaG().b},
sbF:function(a){this.gaG().b=a
return a},
gi:function(){return this.gaG().c},
skE:function(a){this.gaG().d=a
return a},
gV:function(){return this.gaG().e},
gaG:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
m:function(a){this.a=a},
q:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gaG().b
x=this.gaG().c
w=this.gaG().d
v=this.gaG().e
z=new F.qd(y,x,w,v)
if(y==null)H.i(P.l("currentRoomName"))
if(x==null)H.i(P.l("id"))
if(w==null)H.i(P.l("monstersAlive"))
if(v==null)H.i(P.l("time"))}this.m(z)
return z}}}],["","",,O,{"^":"",
ui:function(a,b){var z,y,x
z=a.ck("take_orcthorn")
y=a.ck("smelter_throw_spear")
x=a.ah("RoomRoamingSituation").co(a,a.v(1),"tunnel_cancel_chance")
if(z||y||x){a.ah("RoomRoamingSituation").c4(a,a.v(1),"tunnel",b,!1)
return}a.ah("RoomRoamingSituation").c4(a,a.v(1),"tunnel_cancel_chance",b,!1)},
ub:function(a,b){var z,y,x,w,v,u,t,s,r,q
b.n(0,"Thanks for playing _Insignificant Little Vermin._",!0)
z=a.ck("take_orcthorn")
y=a.ck("smelter_throw_spear")
x=a.v(1)
x.hx(b,"<subject> "+(z?"took":"didn't find")+" Orcthorn",!z,z)
x.hx(b,"<subject> "+(y?"destroyed":"didn't destroy")+" the iron monster",!y,y)
w=new O.uc(x)
v=w.$2(C.x,"sword")
u=w.$2(C.r,"spear")
t=w.$2(C.w,"shield")
x.aB(b,"<subject> <is> leaving Mount Bloodrock with "+H.b(v)+", "+H.b(u)+" and "+H.b(t),!0)
w=x.gae()
if(typeof w!=="number")return w.bC()
s=w>=2?"in good health":"seriously injured"
w=x.fy
if(typeof w!=="number")return w.b7()
r=w>0?"with energy to spare":"exhausted"
x.aB(b,"<subject> <is> "+s+" and "+r,!0)
q=a.v(100)
w=q.gae()
if(typeof w!=="number")return w.bC()
q.a6(b,"<subject> <is> "+(w>=2?"uninjured":"badly wounded"))},
uk:function(a,b){var z=a.v(1).gaD().cn(0,new O.ul())
a.X(a.v(1).gi(),new O.um(z))
a.ah("RoomRoamingSituation").c4(a,a.v(1),"war_forge",b,!0)},
xT:[function(a,b,c){var z,y
z=R.b6(6666,"Agruth",null,null,null,null,null,0,2,100,!1,!1,2,!0,C.t,0,$.$get$bz())
y=z.y
a.geA().t(0,z)
return U.cc(c,[z],"{rock|cavern} floor",b,P.a1([1,new O.ux(y),5,new O.uy(y),9,new O.uz(y),12,new O.uA(y),17,new O.uB(y)]))},"$3","x0",6,0,12],
xU:[function(a,b,c){var z,y,x,w,v
z=O.hU(2)
y=O.et(!1)
x=new O.uL(z.y)
w=new O.uK(y.y)
v=[z,y]
a.geA().ax(0,v)
return U.cc(c,v,"{rock|cavern} floor",b,P.a1([1,new O.uF(x,w,new O.uE()),4,new O.uG(x,w),6,new O.uH(),9,new O.uI(),12,new O.uJ()]))},"$3","x1",6,0,12],
xV:[function(a,b,c){var z,y,x
z=a.ap("talk_to_briana_3")?"guardian":"orc"
y=R.b6(6667,z,null,null,null,new G.aG("rusty sword",1,1,!1,!0,!1,P.aD(C.o,null)),null,0,3,100,!1,!1,3,!1,C.t,0,$.$get$bz())
x=y.y
a.a.t(0,y)
return U.cc(c,[y],"{rock|cavern} floor",b,P.a1([1,new O.uM(x),3,new O.uN(x),5,new O.uO(x)]))},"$3","x2",6,0,12],
xW:[function(a,b,c){var z,y,x,w,v
z=O.hU(2)
y=O.et(!0)
x=new O.uT(z.y)
w=new O.uS(y.y)
v=[z,y]
a.geA().ax(0,v)
return U.cc(c,v,"{rough|stone} floor",b,P.a1([1,new O.uQ(x,w,new O.uP()),3,new O.uR(x,w)]))},"$3","x3",6,0,12],
uW:function(a){return a.X(a.v(1).gi(),new O.uX())},
ir:function(a,b){a.X(a.v(1).gi(),new O.uY(b))},
eE:function(a){var z=a.f
if(H.F(z.length!==0?C.a.gA(z):null,"$isJ").c===!0)return!1
return C.a.a4(C.a_,H.F(z.length!==0?C.a.gA(z):null,"$isJ").a)},
b3:function(a,b){var z,y,x
z=a.v(1)
for(y=a.d,y=new P.db(y,y.c,y.d,y.b,null,[H.m(y,0)]);y.u();){x=y.e
if(!J.e(x.gcv(),z.gi()))continue
if(x.gdC()!=="TakeExitAction")continue
if(x.geK()===b)return!0
return!1}return!1},
ix:function(a,b){var z,y,x,w,v,u,t,s,r
for(z=a.a,y=z.ga_(z),x=new H.bT(y,new O.v9(),[H.m(z,0)]);x.u();){w=y.gU()
if(!w.gaz()){v=H.F(w.e,"$isaG")
y=b
x=v.c
u=v.d
v.r
t=P.P(C.o,!1,null)
t.fixed$length=Array
t.immutable$list=Array
s=a.v(w.y)
r=s.a2(new O.va(new G.aG(y,x,u,!0,!0,!1,t)))
z.a3(0,s)
z.t(0,r)
break}}},
cC:function(a,b){var z,y,x
z=H.F(a.c,"$iscR").b
if(z>=5)return
b.n(0,C.a2[z],!0)
y=H.F(a.c,"$iscR")
y.toString
x=new M.ee(null,!1,0,0)
x.m(y)
a.c=new O.vm().$1(x).q()},
eG:function(a,b,c,d){var z,y
b.X(a.gi(),new O.vr())
if(!d){z=b.a
y=O.et(!1)
z.t(0,y)
C.a.t(b.f,U.cc(new H.K(z,new O.vs(),[H.m(z,0)]),[y],"{smooth|} rock",b.ah("RoomRoamingSituation"),P.a1([1,new O.vt(y.y)])))}},
wS:function(a,b){a.X(b.gi(),new O.wT(b))},
et:function(a){var z,y
z=$.$get$ew().a++
y=a?new Z.ak("spear",0,1,!1,!1,!1,P.aD(C.D,null)):new G.aG("scimitar",1,1,!1,!0,!1,P.aD(C.o,null))
return R.b6(z,"goblin",O.dk(),null,null,y,null,0,1,0,!1,!1,1,!1,C.t,0,$.$get$bz())},
hU:function(a){return R.b6($.$get$ew().a++,"orc",O.dk(),null,null,new G.aG("sword",1,1,!1,!0,!1,P.aD(C.o,null)),null,0,a,0,!1,!1,a,!1,C.t,0,$.$get$bz())},
uc:{"^":"a:53;a",
$2:function(a,b){var z,y
z=this.a.jF(a)
if(z>1)y=b+"s"
else y=z===1?"a "+b:"no "+b
return y}},
ul:{"^":"a:0;",
$1:function(a){return C.a.a4(a.gdU(),C.r)}},
um:{"^":"a:0;a",
$1:function(a){a.gaD().a3(0,this.a)
return a}},
ux:{"^":"a:6;a",
$2:function(a,b){var z,y,x
z=this.a
y=a.v(z)
x=new G.aG("sword",1,1,!1,!0,!1,P.aD(C.o,null))
y.a6(b,"<subject> {drop<s>|let<s> go of} the whip")
y.ac(b,"<subject> draw<s> <subject's> <object>",x)
a.X(z,new O.uw(x))
y.dO(b,'"You\'re dead, slave," <subject> growl<s> at <object> with hatred.',a.v(1),!0)}},
uw:{"^":"a:0;a",
$1:function(a){a.sS(this.a)
return a}},
uy:{"^":"a:6;a",
$2:function(a,b){a.v(this.a).a6(b,"<subject> spit<s> on the cavern floor")}},
uz:{"^":"a:6;a",
$2:function(a,b){var z=a.v(this.a)
b.eE()
z.aB(b,'"I\'ll enjoy eating your flesh, human," <subject> snarl<s>.',!0)
b.n(0,"\n\n",!0)}},
uA:{"^":"a:6;a",
$2:function(a,b){var z=a.v(this.a)
z.a6(b,"<subject> grit<s> <subject's> teeth")
z.aj(b,"<subject> do<es>n't talk any more",!0)}},
uB:{"^":"a:6;a",
$2:function(a,b){a.v(this.a).a6(b,"<subject> scowl<s> with pure hatred")}},
uL:{"^":"a:10;a",
$1:function(a){return a.v(this.a)}},
uK:{"^":"a:10;a",
$1:function(a){return a.v(this.a)}},
uE:{"^":"a:25;",
$2:function(a,b){return a.gaq()&&b.gaq()}},
uF:{"^":"a:6;a,b,c",
$2:function(a,b){var z,y,x,w,v
z=this.a.$1(a)
y=this.b.$1(a)
x=a.v(1)
if(this.c.$2(z,y)===!0){w=z.gc3()===!0?y:z
v=J.e(w,z)?y:z
w.aB(b,'"Look, Sgarr," <subject> say<s>. "Look at them. Give a puny slave some steel and suddenly they think they\'re mighty slayers."',!0)
v.a6(b,"<subject> laugh<s>")
if(J.e(x.gS().gh(),$.$get$cB().b)){v.aj(b,"<subject> stop<s> almost instantly",!0)
v.dO(b,"<subject> see<s> <object> in your hand.",x.gS(),!0)}}else{w=z.gaq()?z:y
w.aB(b,'"Look at you," <subject> laugh<s>. "Give a puny slave some steel and suddenly you think you\'re mighty slayers."',!0)
if(J.e(x.gS().gh(),$.$get$cB().b))w.kX(b,"But then <subject> see<s> <object> in your hand and his face hardens.",!0,x.gS(),!0)}}},
uG:{"^":"a:6;a,b",
$2:function(a,b){var z,y,x,w,v,u,t,s,r,q,p
z=this.a.$1(a)
y=this.b.$1(a)
x=z.gaq()?z:y
w=a.v(1)
if(!x.gaz())v=w.gaz()&&w.d==null
else v=!0
u=v?"kicking":"slashing"
t=v?["Whoosh!","Swah!","Slam!"]:["Swish!","Whoosh!","Thunk!"]
x.bj(b,"<subject> start<s> wildly "+u+" in your direction",!0)
s=J.az(b)
s.n(b,'"Insignificant..." '+t[0]+' "... little ..." '+t[1]+' "... vermin!" '+t[2],!0)
if(v)r="chest"
else r=w.gam()!=null?"shield":w.gS().gh()
q="That last blow hits your "+H.b(r)+" hard"
s.n(b,q+(w.ga0()?"":" and sends you a couple of steps back")+".",!0)
q=H.q([],[P.p])
p=$.$get$aL()
s.bX(b,"<owner's> <subject> glint<s> with intensity",x,new Y.aC(!1,"eyes",q,p,!1,C.E))}},
uH:{"^":"a:6;",
$2:function(a,b){J.c3(b,"From behind, you hear loud cries. Your pursuers must have reached the top of the stairs.",!0)}},
uI:{"^":"a:6;",
$2:function(a,b){J.c3(b,"Ear-splitting shouts come from behind. You wheel around and see a body of orcs and goblins approaching at top speed, their swords and spears at the ready.",!0)}},
uJ:{"^":"a:6;",
$2:function(a,b){J.c3(b,"Your pursuers reach you from behind and a sword pierces your chest with formidable power.",!0)
a.X(a.v(1).gi(),new O.uD())
a.aX("RoomRoamingSituation")
a.aA()}},
uD:{"^":"a:0;",
$1:function(a){a.sae(0)
return a}},
uM:{"^":"a:6;a",
$2:function(a,b){a.v(this.a).dO(b,'"Good good good," <subject> whisper<s>, eyeing <object>.',a.v(1),!0)}},
uN:{"^":"a:6;a",
$2:function(a,b){var z,y
z=a.v(this.a)
y=a.v(100)
b.eE()
z.aB(b,'"Pain is good," <subject> chuckle<s>.',!0)
b.n(0,"\n\n",!0)
if(y.gaq()){y.a6(b,"<subject> glare<s> at him")
y.aB(b,'"Shut up and die."',!0)
b.n(0,"\n\n",!0)}}},
uO:{"^":"a:6;a",
$2:function(a,b){var z,y
z=a.v(this.a)
y=a.v(1)
b.eE()
z.aB(b,'"You\'ll make a nice addition to my collection," <subject> say<s>, laughing.',!0)
z.a6(b,"<subject> nod<s> towards a heap of rotting bodies nearby")
b.n(0,"\n\n",!0)
y.aB(b,"<subject> glance<s> over at Briana, then back at the orc.",!0)
y.aB(b,'_"You had better shut up, and die."_',!0)
b.n(0,"\n\n",!0)}},
uT:{"^":"a:10;a",
$1:function(a){return a.v(this.a)}},
uS:{"^":"a:10;a",
$1:function(a){return a.v(this.a)}},
uP:{"^":"a:25;",
$2:function(a,b){return a.gaq()&&b.gaI()&&b.gc2()===!0}},
uQ:{"^":"a:6;a,b,c",
$2:function(a,b){var z,y
z=this.a.$1(a)
y=this.b.$1(a)
if(!y.gaI()){z.ac(b,"<subject> look<s> at <object's> body",y)
z.aB(b,'"You\'ll pay for this, vermin," <subject> snarl<s>.',!0)
return}if(this.c.$2(z,y)===!0){z.ac(b,"<subject> look<s> at <object>",y)
z.dO(b,'"Now that is practice," <subject> say<s> to <objectPronoun>.',y,!0)}}},
uR:{"^":"a:6;a,b",
$2:function(a,b){var z,y,x
z=this.a.$1(a)
y=this.b.$1(a)
x=z.gaq()?z:y
x.aB(b,'"You don\'t understand," <subject> growl<s>. "No matter how many of us you kill, there will be more. And when we get you, we will eat your face alive."',!0)
x.a6(b,"<subject> smirk<s>")
x.aB(b,'"You mean nothing."',!0)}},
uX:{"^":"a:0;",
$1:function(a){a.gaD().t(0,$.$get$eq())
return a}},
uY:{"^":"a:0;a",
$1:function(a){var z=a.gb9()
if(typeof z!=="number")return z.ak()
a.sb9(z+this.a)
return a}},
v9:{"^":"a:0;",
$1:function(a){return J.e(a.gaY(),$.$get$dm())}},
va:{"^":"a:0;a",
$1:function(a){a.sS(this.a)
return a}},
vm:{"^":"a:0;",
$1:function(a){var z
a.gcD()
z=a.c
a.gcD()
a.c=z+1
return a}},
vr:{"^":"a:0;",
$1:function(a){a.sam(new E.bq("shield",P.aD(C.a1,null)))
return a}},
vs:{"^":"a:0;",
$1:function(a){return J.e(a.gaY(),$.$get$dm())}},
vt:{"^":"a:6;a",
$2:function(a,b){var z,y
z=a.v(this.a)
y=a.v(1)
if(a.ck("take_spear_in_underground_church")){z.eZ(b,"<subject> look<s> at <object-owner's> <object>",$.$get$eq(),y)
z.aB(b,'"Thief," <subject> hiss<es>.',!0)}}},
wT:{"^":"a:0;a",
$1:function(a){var z=this.a
if(!z.gaz())a.gaD().t(0,z.e)
a.sS($.$get$cB())}}}],["","",,V,{"^":"",
lL:function(){var z=new V.dC(null,null,null)
new V.tR().$1(z)
return z.q()},
ts:{"^":"a:5;",
$3:function(a,b,c){c.n(0,"",!0)}},
tt:{"^":"a:5;",
$3:function(a,b,c){c.n(0,"",!0)}},
tq:{"^":"a:5;",
$3:function(a,b,c){c.n(0,"The tunnel back to the main slave quarters is suicide. There will be too many orcs, and the Gate of Screams is a long way beyond, at the very base of Mount Bloodrock. That leaves two options: the black passage towards the war forges, and the deserted tunnel to the Unholy Church, an underground temple. Both these paths lead upwards and in the general direction of a small exit near the mountaintop \u2014 the Upper Door.\n",!0)}},
tr:{"^":"a:5;",
$3:function(a,b,c){c.n(0,"The corpse lies still, getting cold.\n\n\n",!0)
O.cC(b,c)
c.n(0,"",!0)}},
ol:{"^":"S;W:c<,h:d<,b,a",
H:function(a,b){var z=b.f
if(!J.e(H.F(z.length!==0?C.a.gA(z):null,"$isJ").a,"cave_with_agruth"))return!1
if(b.ap(this.d))return!1
return!0},
R:[function(a,b,c){c.n(0,"You search his pockets but turn up with nothing. Just then, you realize that if Agruth had something valuable on him, he would have hidden it well. You run your hand inside his vest and find a troma herb. This boosts your energy right when you need it--very handy. (Your stamina increases by 1.)\n",!0)
O.ir(b,1)
return H.b(a.gh())+" successfully performs SearchAgruth"},"$3","gN",6,0,1],
P:[function(a,b,c){throw H.c(new P.w("Success chance is 100%"))},"$3","gM",6,0,1],
I:function(a,b){return 1},
gO:function(){return!1},
aa:function(a,b){return"Will you be successful?"},
gL:function(){return},
gJ:function(){return"You have taken his weapon but there might be other useful items in his pocket."},
gK:function(){return!1}},
to:{"^":"a:5;",
$3:function(a,b,c){c.n(0,'Only a few bends ahead, the tunnel get blindingly bright and the empty smell of mountain air fills your nose. After three years, you hear the howling wind. You run through a small stone portal and out of the mountain you thought would be your grave. \n\n\nYou have to close your eyes to keep the blinding sun out. You let the wind chill your muscles. \n\n\nBut merely two breaths later, you are again in motion, jumping down a sharply descending path. Outside, it\'s you and Briana who have the upper hand \u2014 the orcs and goblins groan and stumble. This is still their territory, but the bright sun and the lack of cave walls rubs against all their instincts. These are cave breeds.\n\n\nSoon, they stop following altogether, presumably leaving the two of you to their aboveground brothers. You don\'t dare to stop but you gradually slow down, and then lift your eyes from the treacherous terrain.\n\n\nAt first, you cannot make much sense of what you see \u2014 this is nothing like the country you left three years ago. You look at Briana but she doesn\'t seem surprised. You turn your eyes to the scenery again, to the black smoke of orc camps and razed villages, to the burned forests, to the cracks in the wall of the distant Fort Ironcast, just visible over the Glenview hill. \n\n\nNo birds, only some horrible dark eagle-like creatures with no head, circling in both directions above Mount Bloodrock.\n\n\n_"We must stop this."_\n\n\nBriana follows your gaze, then shakes her head. "This is much larger than us, Aren. We\'ve both seen what takes place in the mountain. Now you can see what has happend outside. This is a problem for kings, not peasants."\n\n\n_"No king has what we have."_\n\n\n',!0)
if(b.ap("take_orcthorn"))c.n(0,'"Orcthorn? Bah, you think they\'ll let you have it? A farm boy?" \n\n\n_"I\'m not a farm boy. And I don\'t mean Orcthorn, no. I have a connection. We both do."_\n',!0)
c.n(0,"\n",!0)
if(!b.ap("take_orcthorn"))c.n(0,"\"Let me guess. Muscles and a bit of brains? Don't be a fool, you're still a farm boy.\" \n\n\n_\"I'm not a farm boy. And I don't mean muscles or brains, no. I have a connection. We both do.\"_\n",!0)
c.n(0,'\n"A connection."\n\n\n_"With the Dead Prince. I dream his dreams. I think I have some of his power. He is more than people think. A lot more. You feel it, too \u2014 I am sure of it \u2014 but you have not been in the mountain for as long as I have. Most slaves are lucky to survive the first month. I survived three years."_\n\n\n"So the thing you have that kings don\'t is\u2026 a way to communicate? Negotiate?"\n\n\n_"I do not have anything the Dead Prince wants. No, I do not think any mortal man does. But I think I am starting to understand what that is, and how the Dead Prince wants to seize it."_\n\n\n"And your plan is?"\n\n\n[IMG long view of the road ahead]\n\n\n_"Not letting him have it. Giving him the exact opposite of what he wants."_\n\n\n"You know we could just run as fast as we can, slaying some orcs along the way, and getting as far away from this place as possible, right?"\n\n\n_"Yes."_\n\n\n"That others would do exactly that."\n\n\n_"But we will not."_\n\n\n"No. We will not."\n\n\nWith that, you both start down the road towards the black fort in the distance. \n\n\n---\n\n\n### The End\n\n\n',!0)
O.ub(b,c)
c.n(0,"",!0)}},
tp:{"^":"a:5;",
$3:function(a,b,c){c.n(0,"",!0)}},
tm:{"^":"a:5;",
$3:function(a,b,c){c.n(0,"The crevice is small.\n",!0)}},
tn:{"^":"a:5;",
$3:function(a,b,c){c.n(0,"",!0)}},
tk:{"^":"a:5;",
$3:function(a,b,c){c.n(0,"You enter a small, circular room. There are exits on three sides, all marked with crude writing.\n\n\n",!0)
if(O.b3(b,"smelter"))c.n(0,'The passage you came from is marked with the words "Hot iron", which must mean "smelter" in the orcs\' vocabulary. Another one has the words "Unholy Church" above it. Both of these slope downwards.\n',!0)
c.n(0,"\n",!0)
if(O.b3(b,"underground_church"))c.n(0,'The passage you came from is marked with the words "Unholy Church". Another one has the words "Hot iron" above it, which must mean "smelter" in the orcs\' vocabulary. Both of these slope downwards.\n',!0)
c.n(0,"\nA third passage is marked \"Up Door\", and a few paces beyond the opening, it turns into a steep stairway upwards. This is it, if you're ready for it. Your final path to escape, an end to those three horrible years. For the first time, you see a smile on Briana's face. Not a smirk or an angry taunt of a laugh, but a genuine smile. \"_Up Door?_\" she whispers, shaking hear head. \"I can't believe we've made it this far.\"\n\n\nLeaning on the wall next to the third exit is a goblin guard. He's sleeping. He holds a sword in one hand, and there's a shield laid on his lap.\n",!0)}},
tl:{"^":"a:5;",
$3:function(a,b,c){c.n(0,"",!0)
if(b.ap("guardpost_above_church_take_shield")&&!b.ck("guardpost_above_church_take_shield"))c.t(0,"The goblin's corpse is sprawled on the ground in the middle of the circular room.")
else c.t(0,"The goblin is sleeping soundly next to the exit to the Upper Door.")
c.n(0,"",!0)}},
lJ:{"^":"S;W:c<,h:d<,b,a",
H:function(a,b){var z=b.f
if(!J.e(H.F(z.length!==0?C.a.gA(z):null,"$isJ").a,"guardpost_above_church"))return!1
return!0},
R:[function(a,b,c){c.n(0,"You take the passage that leads to the Upper Door.\n",!0)
O.ui(b,c)
return H.b(a.gh())+" successfully performs GuardpostAboveChurchEnterTunnelWithCancel"},"$3","gN",6,0,1],
P:[function(a,b,c){throw H.c(new P.w("Success chance is 100%"))},"$3","gM",6,0,1],
I:function(a,b){return 1},
gO:function(){return!1},
aa:function(a,b){return"Will you be successful?"},
gL:function(){return},
gJ:function(){return""},
gK:function(){return!1}},
lK:{"^":"S;W:c<,h:d<,b,a",
H:function(a,b){var z=b.f
if(!J.e(H.F(z.length!==0?C.a.gA(z):null,"$isJ").a,"guardpost_above_church"))return!1
if(b.dR(this.d)!=null)return!1
return!0},
R:[function(a,b,c){c.n(0,"You silently approach the goblin's legs, wait a few moments, then lean over him and deftly lift the shield. The goblin sniffs, moves, but stays asleep.\n\n\nYou take a few slow steps back, then fix the shield on your offhand.\n",!0)
O.eG(a,b,c,!0)
return H.b(a.gh())+" successfully performs GuardpostAboveChurchTakeShield"},"$3","gN",6,0,1],
P:[function(a,b,c){c.n(0,"You silently approach the goblin's legs, and wait a few moments. You're trying to stay as far away from his nose as possible. The goblin sniffs, moves, but stays asleep. You shift your weight on the right leg, leaning over the goblin and using the other leg as a counterweigh. Briana watches you with amusement.\n\n\nYou touch the shield to lift it, but freeze. The goblin sniffs again, and shifts. If you move, he'll wake up.\n",!0)
C.a.t(b.f,V.lL())
return H.b(a.gh())+" fails to perform GuardpostAboveChurchTakeShield"},"$3","gM",6,0,1],
I:function(a,b){return 0.3},
gO:function(){return!1},
aa:function(a,b){return"Will you be successful?"},
gL:function(){return},
gJ:function(){return"The goblin is asleep but not soundly \u2014 the floor here must be cold and uncomfortable. Taking the shield from its position on the goblin's lap will quite likely wake him up."},
gK:function(){return!1}},
fd:{"^":"af;",
gbP:function(){return[new A.fZ(new V.lN(),new V.lO(),"Stay perfectly still","If you stop moving, the guard will go back to sleep. But in this position, staying perfectly still even for a single minute will be quite a feat. (It will cost you 1 stamina.)","guardpost_above_church_take_shield_rescue",!0,null),new A.fZ(new V.lP(),null,"Snatch the shield","You can quickly snatch the shield, jump back and prepare for a fight.","guardpost_above_church_take_shield_continuation_of_failure",!0,null)]},
gh:function(){return"guardpost_above_church_take_shield"},
ay:function(){var z=new V.dC(null,null,null)
z.m(this)
new V.lQ().$1(z)
return z.q()},
b_:function(a,b){if(a!==0)return
return b.a.bJ(0,new V.lR())},
b6:function(a,b){return[a.bJ(0,new V.lS())]}},
tR:{"^":"a:0;",
$1:function(a){var z=$.$get$aa().as(1073741823)
a.gbO().b=z
a.gbO().c=0
return a}},
lN:{"^":"a:26;",
$4:function(a,b,c,d){J.c3(c,"You stay frozen in place. After a while, the strain of holding the awkward position start to show. Your left leg is shaking, and a drop of sweat is forming on your nose, threatening to fall on the goblin's leg.\n\n\nFortunately, at about that moment the goblin shifts again and his expression gets visibly more relaxed. His breath is deep and regular again.\n\n\nYou deftly lift the shield, take a few slow steps back, then fix the shield on your offhand.",!0)
b.aA()
b.X(a.gi(),new V.lM())
O.eG(a,b,c,!0)
return"GuardpostAboveChurchTakeShieldRescueSituation resolved with rescue/continuation (Stay perfectly still)"}},
lM:{"^":"a:0;",
$1:function(a){var z=a.gb9()
if(typeof z!=="number")return z.at()
a.sb9(z-1)
return a}},
lO:{"^":"a:3;",
$3:function(a,b,c){var z=a.gb9()
if(typeof z!=="number")return z.b7()
return z>0}},
lP:{"^":"a:26;",
$4:function(a,b,c,d){J.c3(c,"You snatch the shield and jump back next to Briana. The goblin wakes up instantly and gets his bearing suprisingly fast. He jumps up and gets into combat stance.\n\n\nYou hold the shield on your offhand and get ready to fight.",!0)
b.aA()
O.eG(a,b,c,!1)
return"GuardpostAboveChurchTakeShieldRescueSituation resolved with rescue/continuation (Snatch the shield)"}},
lQ:{"^":"a:0;",
$1:function(a){var z=a.gbO().c
if(typeof z!=="number")return z.ak()
a.gbO().c=z+1
return a}},
lR:{"^":"a:0;",
$1:function(a){return a.gT()}},
lS:{"^":"a:0;",
$1:function(a){return a.gT()}},
th:{"^":"a:5;",
$3:function(a,b,c){c.n(0,'You are Aren, a slave. You have spent three painful years inside this mountain, between the foul-smelling cave walls, and under the whip of the orcs and the goblins that live here. \n\n\nYou watch Briana straighten over Agruth\'s corpse. She smooths her hair, using a pool of Agruth\'s blood as a mirror. \n\n\n"What?" she says when she notices you\'re looking.\n\n\n_"We either go now, or die."_\n\n\nBriana spits down at the body. "He wasn\'t even the worst of them, you know."\n\n\n_"I know."_\n\n\n"They _all_ deserve this, or worse, and I like the fact we\'ll kill them by their own swords." She kicks the dead slaver in the hip. \n\n\n_"That one is already dead."_\n\n\n"I was making sure," she says, and turns her attention to the sword. "We should name it. Gods love named swords. And I refuse to carry it around referring to it as _Agruth\'s_." She makes a pained grimace when she says the orc\'s name.\n',!0)}},
ti:{"^":"a:5;",
$3:function(a,b,c){c.n(0,"",!0)}},
mG:{"^":"S;W:c<,h:d<,b,a",
H:function(a,b){var z=b.f
if(!J.e(H.F(z.length!==0?C.a.gA(z):null,"$isJ").a,"just_after_agruth_fight"))return!1
return!0},
R:[function(a,b,c){c.n(0,'_"We will call it Luck Bringer. We got lucky, and luck is our only chance to get out of this place."_\n\n\nBriana nods. "Luck Bringer it is. Now, you\'re right, let\'s just get out of here as quickly as possible."\n',!0)
O.ix(b,"Luck Bringer")
b.ah("RoomRoamingSituation").c4(b,b.v(1),"cave_with_agruth_pre",c,!1)
return H.b(a.gh())+" successfully performs NameAgruthSwordOpportunity"},"$3","gN",6,0,1],
P:[function(a,b,c){throw H.c(new P.w("Success chance is 100%"))},"$3","gM",6,0,1],
I:function(a,b){return 1},
gO:function(){return!1},
aa:function(a,b){return"Will you be successful?"},
gL:function(){return},
gJ:function(){return""},
gK:function(){return!1}},
mH:{"^":"S;W:c<,h:d<,b,a",
H:function(a,b){var z=b.f
if(!J.e(H.F(z.length!==0?C.a.gA(z):null,"$isJ").a,"just_after_agruth_fight"))return!1
return!0},
R:[function(a,b,c){c.n(0,'_"We will call it Savior. It was our first step to freedom. The sword should have killed us and instead it set us free."_\n\n\nBriana nods. "Savior it is. Now, you\'re right, let\'s just get out of here as quickly as possible."\n',!0)
O.ix(b,"Savior")
b.ah("RoomRoamingSituation").c4(b,b.v(1),"cave_with_agruth_pre",c,!1)
return H.b(a.gh())+" successfully performs NameAgruthSwordRedemption"},"$3","gN",6,0,1],
P:[function(a,b,c){throw H.c(new P.w("Success chance is 100%"))},"$3","gM",6,0,1],
I:function(a,b){return 1},
gO:function(){return!1},
aa:function(a,b){return"Will you be successful?"},
gL:function(){return},
gJ:function(){return""},
gK:function(){return!1}},
mF:{"^":"S;W:c<,h:d<,b,a",
H:function(a,b){var z=b.f
if(!J.e(H.F(z.length!==0?C.a.gA(z):null,"$isJ").a,"just_after_agruth_fight"))return!1
return!0},
R:[function(a,b,c){c.n(0,"_\"That is foolish. It is just a sword, after all.\"_\n\n\nBriana shrugs. \"Whatever, just don't ever call it _Agruth's._ I already have more respect to this piece of iron than to that worthless animal. Now, you're right, let's just get out of here as quickly as possible.\"\n",!0)
b.ah("RoomRoamingSituation").c4(b,b.v(1),"cave_with_agruth_pre",c,!1)
return H.b(a.gh())+" successfully performs NameAgruthSwordNothing"},"$3","gN",6,0,1],
P:[function(a,b,c){throw H.c(new P.w("Success chance is 100%"))},"$3","gM",6,0,1],
I:function(a,b){return 1},
gO:function(){return!1},
aa:function(a,b){return"Will you be successful?"},
gL:function(){return},
gJ:function(){return""},
gK:function(){return!1}},
tf:{"^":"a:5;",
$3:function(a,b,c){c.n(0,'Violent grunts and growls are coming through that door. Next to it, an orcish writing on the wall says "Danger mad. Give food go away."\n',!0)}},
tg:{"^":"a:5;",
$3:function(a,b,c){c.n(0,"TODO\n",!0)}},
td:{"^":"a:5;",
$3:function(a,b,c){c.n(0,"The room is dark and wet. As you enter, the noises end. Smell of rotting flesh fills your nostrils and almost makes you vomit.\n\n\nWhen your eyes become accustomed to the dark, you see a figure standing in front of you, and next to a heap of dead bodies. You realize it's a male orc, but an especially large one, with huge muscles and many scars. His face is in constant motion, overwhelmed by tics and waves of hateful expressions.\n",!0)}},
te:{"^":"a:5;",
$3:function(a,b,c){c.n(0,"The room is quiet. The mad guardian's huge body lies on the floor beneath the statue.\n",!0)}},
pr:{"^":"S;W:c<,h:d<,b,a",
H:function(a,b){var z=b.f
if(!J.e(H.F(z.length!==0?C.a.gA(z):null,"$isJ").a,"orcthorn_room"))return!1
if(b.ap("talk_to_briana_3"))if(!b.ap(this.d))z=H.F(z.length!==0?C.a.gA(z):null,"$isJ").c!==!0
else z=!1
else z=!1
if(!z)return!1
return!0},
R:[function(a,b,c){c.n(0,'You and Briana nod at each other and start sweeping the room. The mad guardian has left many bizarre things scattered around the space. A box of severed orc hands. Crude drawings of tentacles covering one of the walls, with several gouged out eyes below it. A circle made from half-eaten rats, with a single pebble in the middle.\n\n\n"None of this makes any sense," Briana says, turning some useless apparatus made of sticks in hand. "He must _really_ have gone mad. From fear, or magic, or both."\n\n\nSoon, the last place in the room that hasn\'t been searched by either you or Briana is the large pile of rotting corpses. Mostly orcs, but there are also some human slaves, and many rats and bats. The reek of rotten flesh raises above it in visible, pale fumes. Briana hides her nose in an elbow and starts dragging out the upper, less rotten corpses. You join her.\n\n\n"The sword will be at the bottom, I bet."\n\n\n_"Of course. He tried to bury it."_\n\n\nIn what seems like hours of work, you get to the bottom. Among a slush of decayed meat, you feel something hard and cold. Pulling it uncovers a sword.\n\n\nYou fling the weapon and the green-red rot falls to the ground easily, as if it had no traction on the steel. You hold in your hand the brightest, sharpest sword you have ever seen.\n\n\n[IMG orcthorn]\n\n\n"Orcthorn," Briana nods and surveys the blade and the hilt. Gradually, she starts shaking her head. "Why would they keep the sword at all? Why wouldn\'t they destroy it? They were terrified of it."\n\n\n_"Fear. It is the ultimate authority. I do not think it was the orcs who decided to keep the sword."_\n\n\n"Well, now they can start fearing again." Briana crouches next to the corpse of the mad guardian. "And all this because of a common soldier and a farm boy," she says to the lifeless face.\n\n\n_"I am not a farm boy. And we still need to get out of here first."_\n',!0)
O.wS(b,a)
return H.b(a.gh())+" successfully performs TakeOrcthorn"},"$3","gN",6,0,1],
P:[function(a,b,c){throw H.c(new P.w("Success chance is 100%"))},"$3","gM",6,0,1],
I:function(a,b){return 1},
gO:function(){return!1},
aa:function(a,b){return"Will you be successful?"},
gL:function(){return},
gJ:function(){return""},
gK:function(){return!1}},
tb:{"^":"a:5;",
$3:function(a,b,c){c.n(0,"TODO\n",!0)}},
tc:{"^":"a:5;",
$3:function(a,b,c){c.n(0,"TODO\n",!0)}},
oy:{"^":"S;W:c<,h:d<,b,a",
H:function(a,b){var z=b.f
if(!J.e(H.F(z.length!==0?C.a.gA(z):null,"$isJ").a,"slave_quarters"))return!1
return!0},
R:[function(a,b,c){c.n(0,"TODO FIGHT\n",!0)
b.aA()
return H.b(a.gh())+" successfully performs SlaveQuartersContinue"},"$3","gN",6,0,1],
P:[function(a,b,c){throw H.c(new P.w("Success chance is 100%"))},"$3","gM",6,0,1],
I:function(a,b){return 1},
gO:function(){return!1},
aa:function(a,b){return"Will you be successful?"},
gL:function(){return},
gJ:function(){return""},
gK:function(){return!1}},
t9:{"^":"a:5;",
$3:function(a,b,c){c.n(0,"You can see Briana clutching her fists. \"Are we homesick already?\" she says. But she doesn't wait for reply, and presses on.\n\n\nIt doesn't take long before you start hearing voices. Orcs and goblins shouting commands, mostly. Then human screams.\n\n\nThe tunnel gets wider and better lit by torches. The walls are smoother. You stop down next to a small, reinforced door. Up ahead, something is happening. A human slave is running towards you. His hand is visibly broken just above the elbow and blood is streaming down his limping left leg. His lips are moving but there is no sound anymore, only pain. Eyes in tears, he doesn't see you or anything else.\n\n\nBefore you can so much as call to him, something long and sharp shoots from behind the slave, and into his back. A bloodied spearhead appears in the center of the man's chest, as if growing from there. The tearful eyes go down, looking at the fatal wound. Two more steps and the slave falls face down, the shaft of the spear protruding upwards from his back.\n\n\nAn orc and a goblin appear from the tunnel, walking towards the dead man. The orc is laughing, patting his companion on the back. \"Vicious throw, small one!\" he roars.\n\n\nYou step back and motion Briana to lean on the wall, hoping that the door's embossed frame will provide enough cover before the two slavers turn again. \n\n\nBut at that time, something or someone smashes on that very door from the inside. Then come angry growls and something akin to barking and howling.\n\n\nThe door stays shut but the two slavers are now looking directly at you. The goblin yanks his spear from the corpse, and the orc unsheathes his sword. They start towards you.\n\n\n[IMAGE goblin spearman + orc]\n",!0)}},
ta:{"^":"a:5;",
$3:function(a,b,c){c.n(0,"",!0)
if(b.ah("RoomRoamingSituation").co(b,b.v(1),"orcthorn_room")&&!O.b3(b,"orcthorn_room"))c.n(0,"The small door on the side of the corridor is open.",!0)
c.n(0,"\n",!0)
if(!b.ah("RoomRoamingSituation").co(b,b.v(1),"orcthorn_room"))c.n(0,"The small door on the side of the corridor is closed.",!0)
c.n(0,"\n",!0)
O.cC(b,c)
c.n(0,"",!0)}},
oz:{"^":"S;W:c<,h:d<,b,a",
H:function(a,b){var z=b.f
if(!J.e(H.F(z.length!==0?C.a.gA(z):null,"$isJ").a,"slave_quarters_passage"))return!1
if(!b.ap(this.d))z=H.F(z.length!==0?C.a.gA(z):null,"$isJ").c!==!0&&!b.ah("RoomRoamingSituation").co(b,b.v(1),"orcthorn_room")
else z=!1
if(!z)return!1
return!0},
R:[function(a,b,c){c.n(0,'Violent grunts and growls are coming through that door. Next to it, an orcish writing on the wall says "Danger mad. Give food go away."\n',!0)
return H.b(a.gh())+" successfully performs SlaveQuartersPassageExamineDoor"},"$3","gN",6,0,1],
P:[function(a,b,c){throw H.c(new P.w("Success chance is 100%"))},"$3","gM",6,0,1],
I:function(a,b){return 1},
gO:function(){return!1},
aa:function(a,b){return"Will you be successful?"},
gL:function(){return},
gJ:function(){return""},
gK:function(){return!1}},
t6:{"^":"a:5;",
$3:function(a,b,c){c.n(0,"A blast of smoke and heat greets you as you walk out of the passage and into the room. The roaring fire draws your attention to the far wall, where scores of orcs shovel coal into a giant furnace and tilt huge kettles of molten steel into white-hot rivers. This is the smelter.\n\n\n",!0)
if(O.b3(b,"war_forge"))c.n(0,"You see a smooth passage leading out of the smelter and sloping upwards. You'll be able to go there unnoticed.",!0)
c.n(0,"",!0)
if(O.b3(b,"guardpost_above_church"))c.n(0,"Not far from here there is a short tunnel, sloping down. It leads into the same room where the molten steel goes \u2014 the war forges. You'll be able to go there unnoticed.",!0)
c.n(0,"",!0)}},
t7:{"^":"a:5;",
$3:function(a,b,c){c.n(0,"The reds and whites of the molten steel reflect in the heaps of coal.\n\n\n",!0)
O.cC(b,c)
c.n(0,"",!0)}},
oC:{"^":"S;W:c<,h:d<,b,a",
H:function(a,b){var z=b.f
if(!J.e(H.F(z.length!==0?C.a.gA(z):null,"$isJ").a,"smelter"))return!1
if(b.ap(this.d))return!1
return!0},
R:[function(a,b,c){c.n(0,"The artificial rivers lead the molten iron across the room, into a large pool. From that pool, a single ogre is distributing the forge-ready liquid into troughs that descend to the war forges below. \n\n\nThe ogre is no more than a spear's throw away from you. But he doesn't notice. In fact, you realize he's blind, probably from all the molten steel around him. Yet he's performing his job without fault, listening to commands from orcs in the war forges beyond the wall, and operating the  floodgates accordingly.\n",!0)
return H.b(a.gh())+" successfully performs SmelterLookAround"},"$3","gN",6,0,1],
P:[function(a,b,c){throw H.c(new P.w("Success chance is 100%"))},"$3","gM",6,0,1],
I:function(a,b){return 1},
gO:function(){return!1},
aa:function(a,b){return"Will you be successful?"},
gL:function(){return},
gJ:function(){return""},
gK:function(){return!1}},
oD:{"^":"S;W:c<,h:d<,b,a",
H:function(a,b){var z=b.f
if(!J.e(H.F(z.length!==0?C.a.gA(z):null,"$isJ").a,"smelter"))return!1
if(!(!b.ap(this.d)&&b.ap("war_forge_watch_workers")&&b.ap("smelter_look_around")&&b.v(1).hb(C.r)))return!1
return!0},
R:[function(a,b,c){c.n(0,'It is a long distance to the blind ogre, but you can\'t come any closer \u2014 there is the pool of molten steel between you and him, and going around it would surely make the orcs aware of your presence. You wait for the ogre to get an order from bellow and watch him open one of the gates. The molten steel starts flowing.\n\n\nYou move just a few steps closer to the ogre and withdraw the spear. \n\n\nBriana gives you a puzzled look. "Wait\u2026" she whispers.\n\n\nYou throw.\n\n\nThe spear sails over the molten steel and rams into the blind ogre\'s shoulder. Your heart skips a beat. It\'s not a killing throw. The ogre will scream, the orcs will hear it \u2014 you\'re dead. But then, the gods show mercy. The ogre wheels around, trying to reach the spear with his left hand. He gets away from the gate and tries to correct it by stepping back.\n\n\nThe last step takes him over the edge and into the pool of white-hot steel. He doesn\'t even have a chance to scream \u2014 the liquid swallows him. The orcs on the other side of the room don\'t notice.\n\n\n"Why would you do that?" Briana says with her hands thrown in the direction of the throw. "You wasted a perfectly good spear on a stupid ogre that posed no threat to us."\n\n\n_"Listen."_\n\n\nAt this point, the distant voices coming from the war forges get slightly louder. Then again. In the clamor and noise of the two rooms, the small increase in volume is almost imperceptible but Briana hears it. She looks at you and a smile starts to form on her lips. "Let\'s go," she says.\n\n\nYou pass the short passage and crouch at the walkway above the war forges. There is chaos below. Most orcs and ogres have stopped working and watch molten steel overflowing the troughs and raining down on the forges. A large part of the iron monster is obliterated and the orcs working there are either dead or running away. \n\n\nSoon, you see an orc using a rope ladder to scale the wall to the smelter. He\'ll be able to get to the gate and close it but it will take him some time to make the climb. And the damage has already been done.\n\n\n"That, my friend, was the most boring heroic deed in history." Briana seems amused, watching the havoc below. "You just threw a spear\u2026"\n\n\n_"A well placed throw."_\n\n\n"... and killed a _blind_ ogre \u2026"\n\n\n_"An important one."_\n\n\n"... a _dam_ worker. Who happened to trip and fall into molten steel."\n\n\n_"As I said, a well placed throw. The less simple you see the world, the easier it is for you to change it."_\n\n\n"Nonsense. You got lucky."\n',!0)
O.uk(b,c)
return H.b(a.gh())+" successfully performs SmelterThrowSpear"},"$3","gN",6,0,1],
P:[function(a,b,c){throw H.c(new P.w("Success chance is 100%"))},"$3","gM",6,0,1],
I:function(a,b){return 1},
gO:function(){return!1},
aa:function(a,b){return"Will you be successful?"},
gL:function(){return},
gJ:function(){return""},
gK:function(){return!1}},
t4:{"^":"a:5;",
$3:function(a,b,c){c.n(0,"The path from slavery to power begins with a single crack of a whip. Briana wheels around, her face red with pain and anger. She is new here, but she knows what will follow. \n\n\n\n\nOnce Agruth starts whipping, the victim ends up dead. Agruth loves killing slaves. \n\n\n\n\nAnother crack and there is new blood on Briana's face. Agruth grins.\n\n\n\n\nNobody else is in sight. It's just you, Agruth and Briana. That's Agruth's main mistake.\n",!0)}},
t5:{"^":"a:5;",
$3:function(a,b,c){c.n(0,"",!0)}},
pt:{"^":"S;W:c<,h:d<,b,a",
H:function(a,b){if(!(b.dR(this.d)==null&&O.eE(b)))return!1
return!0},
R:[function(a,b,c){c.n(0,'_"You were caught not too long ago, I think. What can you tell me about outside?"_\n\n\n\n\nBriana shrugs. "How long have you been here?"\n\n\n\n\n_"Three years."_\n\n\n\n\n"Three years! Gods. A lot has happened in the last winter alone. The orcs have taken the upper valley, and make raids way beyond Fort Ironcast."\n',!0)
return H.b(a.gh())+" successfully performs TalkToBriana1"},"$3","gN",6,0,1],
P:[function(a,b,c){throw H.c(new P.w("Success chance is 100%"))},"$3","gM",6,0,1],
I:function(a,b){return 1},
gO:function(){return!1},
aa:function(a,b){return"Will you be successful?"},
gL:function(){return},
gJ:function(){return""},
gK:function(){return!1}},
pu:{"^":"S;W:c<,h:d<,b,a",
H:function(a,b){if(!(b.ap("talk_to_briana_1")&&b.dR(this.d)==null&&O.eE(b)))return!1
return!0},
R:[function(a,b,c){c.n(0,'_"Where did they get you?"_\n\n\n\n\n"At the Gate of Screams. I was trying to sneak in."\n\n\n\n\n_"You what?"_\n\n\n\n\n"I know. It seemed like a stupid idea even then. I wanted to get in, steal back the Orcthorn, get out, help the fight."\n',!0)
return H.b(a.gh())+" successfully performs TalkToBriana2"},"$3","gN",6,0,1],
P:[function(a,b,c){throw H.c(new P.w("Success chance is 100%"))},"$3","gM",6,0,1],
I:function(a,b){return 1},
gO:function(){return!1},
aa:function(a,b){return"Will you be successful?"},
gL:function(){return},
gJ:function(){return""},
gK:function(){return!1}},
pv:{"^":"S;W:c<,h:d<,b,a",
H:function(a,b){if(!(b.ap("talk_to_briana_2")&&b.dR(this.d)==null&&O.eE(b)))return!1
return!0},
R:[function(a,b,c){c.n(0,'_"What\'s Orcthorn?"_\n\n\n"A sword. It has killed hundreds of orc, wielded by many different knights. Even more orcs died trying to seize it, almost to no avail."\n\n\n_"Almost."_\n\n\n"Yes. Last full moon, an orcish captain and a company of (TODO: alpha) warriors ambushed Lord TODO. He was the wielder of Orcthorn at that time, and they knew it. They slaughtered his company and brought the sword here, to Bloodrock. Since then, the orcs are bolder and more successful."\n\n\n_"The mad guardian."_\n\n\n"The mad who?"\n\n\n_"That\'s what Agruth and the other slavers were talking about a couple of weeks back. One orc was tasked with guarding a sword. That seemed wierd enough to me. Guarding a sword? Stranger yet, that orc went mad after only a few days of doing this. Now they keep him in a cell, and call him *grach kamkorr*. The mad guardian. That sword is still with him. Hidden there in the cell."_\n\n\n"Where is that cell?"\n\n\n_"Somewhere in the slave quarters."_\n\n\n',!0)
if(!b.ah("RoomRoamingSituation").co(b,b.v(1),"slave_quarters_passage"))c.n(0,'Briana tenses. "Well then, at least we have that choice." ',!0)
c.n(0,"",!0)
return H.b(a.gh())+" successfully performs TalkToBriana3"},"$3","gN",6,0,1],
P:[function(a,b,c){throw H.c(new P.w("Success chance is 100%"))},"$3","gM",6,0,1],
I:function(a,b){return 1},
gO:function(){return!1},
aa:function(a,b){return"Will you be successful?"},
gL:function(){return},
gJ:function(){return""},
gK:function(){return!1}},
t2:{"^":"a:5;",
$3:function(a,b,c){c.n(0,"This must be the place that the orcs call the Shafts. It's a tall, seemingly endless room, with many walkways across.\n\n\n\n\n\n\nYou realize there is really only one way out, over one of the walkways. You'll have to run, there is no hiding anymore.\n",!0)}},
t3:{"^":"a:5;",
$3:function(a,b,c){c.n(0,"",!0)}},
tU:{"^":"a:5;",
$3:function(a,b,c){c.n(0,'Almost as soon as you lose the circular room from sight, loud yells and shouting rises from the deep of the mountain. You hurry up, taking the high stairs by two. The voices from below quiet down a bit, and now you can hear stomping of dozens of orc and goblin feet.\n\n\nThe air gets colder and fresher, but there\'s still no end in sight, and the stairs are now so high that the climb feels like walking up a ladder.\n\n\n"I have\u2026" Briana gasps, trying to catch her breath. "I have not fought my way through the depths of mount bloodrock just to die of exhaution on its doorstep."\n\n\n_"That\u2026 that would be disappointing, yes."_\n\n\nThe sounds from behind get louder. You can now pick out individual voices, although not what they say. The stairway suddenly makes a sharp left and levels out. Tasting blood on the roof of your mouth, your whole body demands to stop \u2014 but you start running anyway. Briana closely follows.\n\n\nThe light in the tunnel gets brighter and the air colder. Then, suddenly, an orc and a goblin jump in front of you from a slimy crevice, swords in hands. \n\n\n![Orc and Goblin](img/orc_and_goblin_sketch.jpg)\n\n\nThis must be the guard of the Upper Door. There is no way around them.\n',!0)}},
rZ:{"^":"a:5;",
$3:function(a,b,c){c.n(0,"",!0)}},
tS:{"^":"a:5;",
$3:function(a,b,c){c.n(0,'After a few strides, you realize Briana still stands in the circular room behind.\n\n\n_"Are you not coming?"_\n\n\nBriana hesitates. "It feels like we could have done more." She motions at the goblin, then extends her gesture to the rest of the mountain. "Wreak more havoc. Take more. I mean, we might be the first people to be in Mount Bloodrock, and live."\n',!0)}},
tT:{"^":"a:5;",
$3:function(a,b,c){c.n(0,"",!0)}},
tF:{"^":"a:5;",
$3:function(a,b,c){c.n(0,"You enter something that at first looks like a large, twisting cave, but then opens into a high room with many columns. This must be what the orcs call the Underground Church. Your bare footsteps reverberate around the space, so you slow down to quiet them. There are no windows, of course, you are deep underground, but there is dim light coming from the far end of the place, where you expect the altar to be but can't quite see it. No torches here. Quiet. \n\n\n",!0)
if(O.b3(b,"cave_with_agruth"))c.t(0,"After a bit of searching, you also notice a twisty passage going from the right hand side of the Church and sloping upwards. That must be the way out.")
c.n(0,"",!0)
if(O.b3(b,"guardpost_above_church"))c.t(0,"Not far from here, a tunnel leads slightly downwards, to where you killed Agruth.")
c.n(0,"",!0)}},
tQ:{"^":"a:5;",
$3:function(a,b,c){c.n(0,"The temple stands silent, as if holding breath.\n\n\n",!0)
O.cC(b,c)
c.n(0,"",!0)}},
le:{"^":"S;W:c<,h:d<,b,a",
H:function(a,b){var z=b.f
if(!J.e(H.F(z.length!==0?C.a.gA(z):null,"$isJ").a,"underground_church"))return!1
if(b.ap(this.d))return!1
return!0},
R:[function(a,b,c){c.n(0,'This place was not built by the orcs or their slaves. Walls are straight and smooth. The columns are decorated with delicate embossments of skulls and tentacles.\n\n\n"What are these things?" Briana whispers.\n\n\n_"This place worships the Dead Prince."_\n\n\nSaying the name brings coldness and sweat. You hear the name every night in the Dead Prince\'s tongue \u2014 but it has been a long time since you said it yourself.\n\n\n"Worships?" Briana looks up at the high ceiling, then around the temple. "I though the Dead Prince was a warlord. A shaman. Something like that."\n\n\n_"He is god."_\n\n\n',!0)
if(!b.ap("wait_for_ritual"))c.n(0,"Briana smirks. \"Look, no. The Dead Prince is no god. The orcs might think so, you shouldn't. He's some talented illusionist at best.\" ",!0)
c.n(0,'\nThe glow coming from the altar dims for a moment, then lights up again.\n\n\n_"He is worse than god. He is fear itself."_\n\n\nBriana looks at you, narrowing her eyes.\n\n\n_"I think you have felt it."_\n',!0)
return H.b(a.gh())+" successfully performs ExamineUndergroundChurch"},"$3","gN",6,0,1],
P:[function(a,b,c){throw H.c(new P.w("Success chance is 100%"))},"$3","gM",6,0,1],
I:function(a,b){return 1},
gO:function(){return!1},
aa:function(a,b){return"Will you be successful?"},
gL:function(){return},
gJ:function(){return""},
gK:function(){return!1}},
tj:{"^":"a:5;",
$3:function(a,b,c){c.n(0,'The altar is a simple block of stone at the back of the temple. On the wall above it, there is a large ornament portraying an octopus with eight tentacles and eight black eyes at their tips. It\'s the sign of the Dead Prince. You have never seen it in real life but you know it well.\n\n\n"You\'re brave, my friend," Briana whispers. "I\'ll give you that. But if we must linger in this mountain, I\'d much rather kill some orcs than spy around a temple."\n\n\n_"You hate orcs? This is what made them."_\n\n\nBriana opens her mouth to reply, but at that point the otherwise steady light from the altar flickers like a flame, and you both slip behind a large column to move out of sight. A spear that lies here on the ground almost trips you up.\n',!0)}},
tu:{"^":"a:5;",
$3:function(a,b,c){c.n(0,"The altar glows with a dim red light that reflects in the eight black eyes above it.\n",!0)}},
pM:{"^":"S;W:c<,h:d<,b,a",
H:function(a,b){var z=b.f
if(!J.e(H.F(z.length!==0?C.a.gA(z):null,"$isJ").a,"underground_church_altar"))return!1
if(b.ap(this.d))return!1
return!0},
R:[function(a,b,c){c.n(0,'You move to a shadow and wait. After a few heartbeats, there is a scraping sound of stone against stone. You lean out from your hiding and see a part of the wall to the right of the altar opening.\n\n\nAn orc priest, tall and pale, enters from the stone door. At that time, the whole temple reverberates with a strong, dissonant tone that is somehow both sickening and appealing at the same time. It\'s like a groan of some large beast awakening.\n\n\nAfter the priest, a huge creature enters through the door, crouching below the frame. It\'s unclear what it is, but possibly some large breed of ogre, and judging by the braided hair, a female. Her sword \u2014 attached to her hip with a rope \u2014 is as long as you are tall. \n\n\nWhen she enters the temple and unbends, you can see that she leads someone on a chain. An orc. Despite being a strong one, probably a captain or even a chieftain, he is dwarfed by the creature before him, and he visibly shakes in horror.\n\n\nThe three of them \u2014 the priest, the ogre and the orc \u2014 go around the altar and stop before it, facing the symbol of the octopus, and away from you and Briana. The dissonant tone stops. You lean a little further out from your hiding, to have a better view.\n\n\nWithout words, the priest beckons the orc to lie at the altar. The orc is now shaking uncontrollably, but complies. You can hear his fitful breath, the rustle of his body against the stone as he glides into position, and nothing else.\n\n\nWhen the orc lies on the altar, the female ogre walks up to him and places her hands on his shoulders, pinning him down.\n\n\n_"Maggots."_\n\n\nSomehow, you know. Briana gives you a puzzled look, then turns back to the altar. From the shadows in the base of the altar, a swarm of large black insects starts to make its way to the top, towards the terrified orc. The priest lifts his arms as if in silent worship.\n\n\nThe ogre pushes down, preparing for the inevitable struggle. The orc senses it, tenses up and opens his mouth to scream.\n\n\nBut the scream doesn\'t come. Instead of it, the dissonant tone sounds again, more powerful than before.\n\n\nThe maggots crawl over the edge of the altar\'s top, onto the orc\'s body, heading straight towards his face. They move faster now.\n\n\n\n\nThe orc\'s eyes go wide. He struggles against the ogre\'s grip, pointlessly. The dissonant tone gets even louder. The temple quivers. The sound permeates everything.\n\n\nThis has a strange effect on you. Suddenly, the terror of the moment is fully replaced by something of an opposite \u2014 an invigorating feeling of power. You breathe in and feel stronger, refreshed. (Your stamina increases by +1.)\n\n\nYou notice that the priest takes a deep breath as well.\n\n\nThen, suddenly, the sound stops, and the orc\'s body sinks. The invigorating feeling is gone. You realize the maggots have eaten through the orc\'s eyes and cheeks, and that they are now scuttling back to the base of the altar.\n\n\nThe priest puts his arms down again, and \u2014 without ceremony \u2014 heads back to the stone door. The ogre takes the orc\'s dead body, puts it over her shoulder, and follows. In a few heartbeats, they are all gone and the door is closed. A new splash of blood on the altar is the only reminder of the scene.\n\n\nBriana doesn\'t look at you. "How did you know it would be maggots?"\n\n\n_"I do not know."_\n\n\n"Is this\u2026 I _felt_ that sound, somehow. I _felt_ it."\n\n\n_"This place does something weird to people."_\n\n\n"And if that orc was meant to be an offering, why did they not leave the body?" Briana shakes her head, still not looking at you. "Let\'s\u2026 let\'s just get out of here."\n',!0)
O.ir(b,1)
return H.b(a.gh())+" successfully performs WaitForRitual"},"$3","gN",6,0,1],
P:[function(a,b,c){throw H.c(new P.w("Success chance is 100%"))},"$3","gM",6,0,1],
I:function(a,b){return 1},
gO:function(){return!1},
aa:function(a,b){return"Will you be successful?"},
gL:function(){return},
gJ:function(){return""},
gK:function(){return!1}},
ps:{"^":"S;W:c<,h:d<,b,a",
H:function(a,b){var z=b.f
if(!J.e(H.F(z.length!==0?C.a.gA(z):null,"$isJ").a,"underground_church_altar"))return!1
if(b.ap(this.d))return!1
return!0},
R:[function(a,b,c){c.n(0,"It's a primive short spear that probably belonged to some goblin. You take it in your hand, feeling the wet wood and the patches of mire along its length. It must have been here for a while. \n\n\nBut it feels right in your hand, a good throwing weapon.\n",!0)
O.uW(b)
return H.b(a.gh())+" successfully performs TakeSpearInUndergroundChurch"},"$3","gN",6,0,1],
P:[function(a,b,c){throw H.c(new P.w("Success chance is 100%"))},"$3","gM",6,0,1],
I:function(a,b){return 1},
gO:function(){return!1},
aa:function(a,b){return"Will you be successful?"},
gL:function(){return},
gJ:function(){return""},
gK:function(){return!1}},
rY:{"^":"a:5;",
$3:function(a,b,c){c.n(0,"You enter the enormous cave that holds Mount Bloodrock's war forges. This space is so vast that it has its own climate, with dark clouds covering most of the ceiling, and what looks like black rain falling in the distance. Weird bats are circling just below the clouds, their shrieks mixing with the clangs of steel and angry shouts below.\n\n\n",!0)
if(O.b3(b,"cave_with_agruth"))c.n(0,"You and Briana duck behind some carts on a walkway above the floor of the cave. You can see that the walkway leads up a flight of stairs that hugs one side of the cave, and into a large stone wall. This must be the way through the smelter, and towards the Upper Door. Thankfully, there is nobody in the way. ",!0)
c.n(0,"\n",!0)
if(O.b3(b,"smelter"))c.n(0,"You and Briana stand on a walkway way above the floor of the cave. You can see the walkway leads down a flight of stairs that hugs one side of the cave, towards the bottom. Down there, you recognize a passage in the rock that you know must descend deeper into the mountain, towards the slave quarters, and therefore to where you slayed Agruth. There is nobody in the way. ",!0)
c.n(0,"",!0)}},
t8:{"^":"a:5;",
$3:function(a,b,c){c.n(0,"The air in the war forges is heavy and the noise overwhelming.\n\n\n",!0)
O.cC(b,c)
c.n(0,"",!0)}},
pN:{"^":"S;W:c<,h:d<,b,a",
H:function(a,b){var z=b.f
if(!J.e(H.F(z.length!==0?C.a.gA(z):null,"$isJ").a,"war_forge"))return!1
if(b.ap(this.d))return!1
return!0},
R:[function(a,b,c){c.n(0,"The cave is natural, but on the side of the smelter there is an artificial wall, like a stone dam. From an opening high on that wall, suspended troughs of molten steel descend into all parts of the room like huge fiery tentacles. \n\n\nAt the end of each of the troughs, teams of orcs pour the steel into molds for axes, war hammers, and greatswords. The clamor of hammers hitting anvils is deafening, and the strong smell of iron and soot is almost stronger than the smell of all that orc sweat.\n",!0)
return H.b(a.gh())+" successfully performs WarForgeLookAround"},"$3","gN",6,0,1],
P:[function(a,b,c){throw H.c(new P.w("Success chance is 100%"))},"$3","gM",6,0,1],
I:function(a,b){return 1},
gO:function(){return!1},
aa:function(a,b){return"Will you be successful?"},
gL:function(){return},
gJ:function(){return""},
gK:function(){return!1}},
pO:{"^":"S;W:c<,h:d<,b,a",
H:function(a,b){var z=b.f
if(!J.e(H.F(z.length!==0?C.a.gA(z):null,"$isJ").a,"war_forge"))return!1
if(!(!b.ap(this.d)&&b.ap("war_forge_look_around")))return!1
return!0},
R:[function(a,b,c){c.n(0,'You crane your neck from your hiding and take the scene in. More likely than not, no human has ever seen this place and lived to tell the tale.\n\n\nBriana shakes her head: "The orcs are working together with ogres. They must be terrified."\n\n\nYou scan the workers, noticing the slow-moving ogres that tower over the orcs. "And they don\'t use slaves here," you say. "There must be something important going on here." Looking again at the molds they are using, you don\'t see anything out of the expected. Primitive axes and swords, some armor.\n\n\n"What is that thing!" Briana gasps. You follow her stare and at first all you see is just a cluster of slightly larger forges. Then you squint and an image appears. An image of an enormous, repulsive, half-assembled insect. Each leg, or whatever they are, is as long as a good rock\'s throw. There are eight of them. Then there\'s the body \u2014 a huge cockroach-like contraption. The teeth of steel are already completed, sharp and menacing and as long as a man. \n\n\nA full-sized ogre is pouring water over one part of the form just now, producing a cloud of steam. You can\'t see much else. From the high opening in the smelter wall, molten steel is starting to flow down to fill another part of the iron monster.\n',!0)
return H.b(a.gh())+" successfully performs WarForgeWatchWorkers"},"$3","gN",6,0,1],
P:[function(a,b,c){throw H.c(new P.w("Success chance is 100%"))},"$3","gM",6,0,1],
I:function(a,b){return 1},
gO:function(){return!1},
aa:function(a,b){return"Will you be successful?"},
gL:function(){return},
gJ:function(){return""},
gK:function(){return!1}},
q4:{"^":"fd;i:a<,V:b<",
a2:function(a){var z=new V.dC(null,null,null)
z.m(this)
a.$1(z)
return z.q()},
B:function(a,b){var z,y
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
gD:function(a){return Y.V(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)))},
k:function(a){return"GuardpostAboveChurchTakeShieldRescueSituation {id="+J.h(this.a)+",\ntime="+J.h(this.b)+",\n}"}},
dC:{"^":"d;a,b,c",
gi:function(){return this.gbO().b},
gV:function(){return this.gbO().c},
gbO:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.a=null}return this},
m:function(a){this.a=a},
q:function(){var z,y,x
z=this.a
if(z==null){y=this.gbO().b
x=this.gbO().c
z=new V.q4(y,x)
if(y==null)H.i(P.l("id"))
if(x==null)H.i(P.l("time"))}this.m(z)
return z}}}],["","",,O,{"^":"",
xS:[function(a){var z,y
z=$.$get$dq()
y=z.E
if(y.length>0){y+=" "
z.E=y}z.E=y+a},"$1","vp",2,0,16],
xX:[function(a){$.eC=a},"$1","vq",2,0,16],
ia:[function(a,b,c,d,e,f,g){var z=L.f1(a,!1,!1,d,e,f,g)
$.$get$c_().t(0,z)
return z},function(a){return O.ia(a,!1,!1,null,null,null,null)},function(a,b,c){return O.ia(a,!1,!1,null,b,c,null)},"$7$deferToChoiceList$deferToEndOfPage$goto$helpMessage$script$submenu","$1","$3$helpMessage$script","vo",2,13,54,0,0,0,1,1,0],
nX:{"^":"o8;",
bB:function(){var z=0,y=P.aB(),x,w=2,v,u=[],t=this,s,r,q,p,o,n,m,l,k,j
var $async$bB=P.ax(function(a,b){if(a===1){v=b
z=w}while(true)switch(z){case 0:if($.cs){n=t.Q
n.toString
m=new A.v(667,null,null,null,null)
m.c="Sending updated stats."
n.a.G(m.F())
m=t.Q
n=Z.oM()
m.toString
l=new A.v(100,null,null,null,null)
l.e=n.F()
m.a.G(l.F())
new P.H(0,$.r,null,[null]).bD(!0)}if(t.r){n=t.Q
n.toString
m=new A.v(667,null,null,null,null)
m.c="Saving player chronology."
n.a.G(m.F())
t.r=!1
m=t.Q
m.toString
n=new A.v(60,null,null,null,null)
n.b=t.f.cB(0)
m.a.G(n.F())}s=null
case 3:n=t.Q
n.toString
m=new A.v(667,null,null,null,null)
m.c="Calling _goOneStep()."
n.a.G(m.F())
w=7
z=10
return P.aw(t.cK(),$async$bB)
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
l=new A.v(666,null,null,null,null)
l.c="AuthorScriptException: "+m
n.a.G(l.F())
z=1
break}else{p=n
o=H.E(j)
n=t.Q
m=H.b(p)+"\nStacktrace: "+H.b(o)
n.toString
l=new A.v(666,null,null,null,null)
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
m=new A.v(667,null,null,null,null)
m.c="Ending _goOneStep() loop."
n.a.G(m.F())
case 1:return P.aI(x,y)
case 2:return P.aH(v,y)}})
return P.aJ($async$bB,y)},
f_:function(){var z,y
this.fC()
this.f.bi(0)
this.r=!0
this.e=this.c
z=this.Q
Z.hz(Z.bR())
z.toString
y=new A.v(90,null,null,null,null)
y.b=Z.bR()
z.a.G(y.F())
this.bB()},
lj:[function(a){var z,y
z={}
z.a=null
y=$.$get$c_()
y.Z(0,new O.oj(z,this,a))
z=z.a
if(z==null)throw H.c(P.G("The sent choice hash ("+H.b(a)+") is not one of those offered ("+J.h(y)+")"))
this.j_(z)
this.bB()},"$1","giL",2,0,35],
j_:function(a){var z
if(a.gh5()!=null){z=a.r
$.$get$cy().aF(z)}z=a.x
if(z!=null)this.ev(z)},
cK:function(){var z=0,y=P.aB(),x,w=[],v=this,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c
var $async$cK=P.ax(function(a,a0){if(a===1)return P.aH(a0,y)
while(true)switch(z){case 0:u={}
r=$.$get$cz()
q=r.b
if(q.b!==q.c){u=v.Q
u.toString
q=new A.v(667,null,null,null,null)
q.c="Awarding points."
u.a.G(q.F())
p=r.b.dN()
r=v.Q
q=p.gjx()
u=p.b
o=p.c
r.toString
n=new A.v(70,null,null,null,null)
n.b=[q,u]
n.c=o
r.a.G(n.F())
r=new P.H(0,$.r,null,[null])
r.bD(null)
r.c8(new O.o9(v))
x=!0
z=1
break}m=v.x===v.e.gaC().length-1||v.x===v.y
u.a=m
r=v.x
q=v.y
if(r!==q)if(r!=null){if(r<v.e.gaC().length){r=v.e.gaC()
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
o.a.G(k.F())
k=$.$get$c_()
k.iI(new O.oa(v),!1)
if(k.gl(k)!==0){r=v.Q
r.toString
o=new A.v(667,null,null,null,null)
o.c="We have choices."
r.a.G(o.F())
o=H.y(k,"ba",0)
o=P.P(new H.K(k,new O.ob(u,l),[o]),!0,o)
r=k.a
H.q([],[L.ad])
j=new L.f2(r,o)
if(!j.gY(j)){u=v.Q
r=u.e
if(r!=null){r.dG(new D.c5("Showing new choice before previous one was selected."))
u.e=null}r=P.u
u.e=new P.ct(new P.H(0,$.r,null,[r]),[r])
r=j.dT()
u.a.G(r.F())
u=u.e.a.c8(v.giL())
i=new O.oc(v)
r=H.m(u,0)
q=$.r
if(q!==C.i){i=P.eu(i,q)
q.toString}u.dq(new P.el(null,new P.H(0,q,null,[r]),6,new O.od(),i,[r,r]))
x=!0
z=1
break}else{h=k.aU(0,new O.oe(),new O.of())
if(h!=null){if(h.gh5()!=null){r=h.r
$.$get$cy().aF(r)}r=h.x
if(r!=null)v.ev(r)
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
return P.aw(v.cL(f),$async$cK)
case 5:x=a0
z=1
break
case 4:r=$.eC
if(r!=null){v.ev(r)
$.eC=null
x=!1
z=1
break}r=v.x
if(r==null){v.x=0
r=0}else if(r===q){r=v.e.gaC().length-1
v.x=r}else if($.hX)$.hX=!1
else{++r
v.x=r}u.a=r===v.e.gaC().length-1
r="Resolving block: '"+H.b(v.e.gh())+"' block "+H.b(v.x)+"."
q=v.Q
q.toString
o=new A.v(667,null,null,null,null)
o.c=r
q.a.G(o.F())
if(v.x===v.e.gaC().length){u=v.Q
u.toString
r=new A.v(667,null,null,null,null)
r.c="End of book."
u.a.G(r.F())
r=v.Q
u=v.ec()
r.toString
u=u.f3(50)
r.a.G(u.F())
v.Q.a.G(new A.v(80,null,null,null,null).F())
x=!0
z=1
break}r=v.e.gaC()
q=v.x
if(q>>>0!==q||q>=r.length){x=H.f(r,q)
z=1
break}q=r[q]
z=typeof q==="string"?6:8
break
case 6:u=v.Q
r=v.e.gaC()
q=v.x
if(q>>>0!==q||q>=r.length){x=H.f(r,q)
z=1
break}q=r[q]
r=P.X
u.f=new P.ct(new P.H(0,$.r,null,[r]),[r])
r=new A.v(30,null,null,null,null)
r.c=q
u.a.G(r.F())
u.f.a.c8(new O.og(v))
x=!0
z=1
break
z=7
break
case 8:r=v.e.gaC()
q=v.x
if(q>>>0!==q||q>=r.length){x=H.f(r,q)
z=1
break}z=!!J.o(r[q]).$isN?9:11
break
case 9:r=v.Q
r.toString
q=new A.v(667,null,null,null,null)
q.c="A ChoiceList encountered."
r.a.G(q.F())
try{r=v.e.gaC()
q=v.x
if(q>>>0!==q||q>=r.length){x=H.f(r,q)
z=1
break}k.jv(r[q])}catch(b){u=H.C(b)
if(u instanceof M.cK){t=u
s=H.E(b)
u=v.Q
r=H.b(t)+"\nStacktrace: "+H.b(s)
u.toString
q=new A.v(666,null,null,null,null)
q.c="AuthorScriptException: "+r
u.a.G(q.F())
x=!0
z=1
break}else throw b}r=v.Q
r.toString
q=new A.v(667,null,null,null,null)
q.c="- choices added"
r.a.G(q.F())
if(k.bt(0,new O.oh(u,v))&&v.x===v.e.gaC().length-1){u=v.Q
u.toString
r=new A.v(667,null,null,null,null)
r.c="Creating & sending savegame"
u.a.G(r.F())
r=v.Q
u=v.ec()
r.toString
u=u.f3(50)
r.a.G(u.F())
x=!1
z=1
break}x=!1
z=1
break
z=10
break
case 11:r=v.e.gaC()
q=v.x
if(q>>>0!==q||q>=r.length){x=H.f(r,q)
z=1
break}q=r[q]
r={func:1,ret:[P.Q,P.at]}
z=H.ay(q,r)?12:14
break
case 12:d=v.x===v.e.gaC().length-1?v.ec():null
q=v.e.gaC()
o=v.x
if(o>>>0!==o||o>=q.length){x=H.f(q,o)
z=1
break}z=15
return P.aw(v.cL(H.ij(q[o],r)),$async$cK)
case 15:c=a0
if(k.bt(0,new O.oi(u,v))&&v.x===v.e.gaC().length-1){u=v.Q
u.toString
r=d.f3(50)
u.a.G(r.F())}x=c
z=1
break
z=13
break
case 14:u=v.e.gaC()
r=v.x
if(r>>>0!==r||r>=u.length){x=H.f(u,r)
z=1
break}throw H.c(new P.w("Invalid block: "+H.b(u[r])))
case 13:case 10:case 7:case 1:return P.aI(x,y)}})
return P.aJ($async$cK,y)},
ev:function(a){var z,y,x,w,v
z=$.$get$cO()
if(z.b.test(H.by(a))){y=this.d
if(y==null)throw H.c(new P.w("Cannot use ["+J.h(z)+"] when there is no _preGotoPosition."))
x=y.a
z=y.b
if(typeof z!=="number")return z.at()
w=z-1}else{x=this.b.dZ(a,this.e.ge0())
if(x==null)throw H.c("Function goto() called with an invalid argument '"+H.b(a)+"'. No such page.")
w=null}z=this.d
y=z==null
if((y?null:z.a)!=null){z=y?null:z.a
y=this.e
this.f.t(0,H.b(z.gh())+">>"+H.b(y.gh()))
this.r=!0}if(this.f.a4(0,H.b(this.e.gh())+">>"+H.b(x.gh()))||x.ghG()){z=this.d
y=z==null
if((y?null:z.a)!=null)z=!(y?null:z.a).ghG()
else z=!1}else z=!1
$.hV=z
z="Points embargo = "+z
y=this.Q
y.toString
v=new A.v(667,null,null,null,null)
v.c=z
y.a.G(v.F())
v=this.e
this.d=new O.nY(v,this.x)
this.e=x
this.x=w
v.e=J.ao(v.gdV(),1)},
fC:function(){var z,y,x,w,v,u
this.x=null
$.$get$cy().bi(0)
$.$get$c_().sl(0,0)
$.rD=null
x=$.$get$cE()
x.bi(0)
w=$.$get$cz()
x.p(0,"points",w)
w.a=0
w.b.bi(0)
this.b.jz()
$.iu=!0
try{this.ki()}catch(v){z=H.C(v)
y=H.E(v)
x=this.Q
w=H.b(z)+"\n"+H.b(y)
x.toString
u=new A.v(666,null,null,null,null)
u.c="Author Exception in initBlock() (<variables>): "+w
x.a.G(u.F())
throw H.c(z)}this.hq()
$.iu=!1},
cL:function(a){var z=0,y=P.aB(),x,w=2,v,u=[],t=this,s,r,q,p,o,n,m
var $async$cL=P.ax(function(b,c){if(b===1){v=c
z=w}while(true)switch(z){case 0:q=$.$get$dq()
q.E=""
w=4
z=7
return P.aw(a.$0(),$async$cL)
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
throw H.c(new M.cK(q,o,n))
z=6
break
case 3:z=2
break
case 6:if(q.E.length!==0){t.Q.fb(J.h(q)).c8(new O.ok(t))
x=!0
z=1
break}else{x=!1
z=1
break}case 1:return P.aI(x,y)
case 2:return P.aH(v,y)}})
return P.aJ($async$cL,y)},
iS:[function(a){var z,y,x,w
z=a.x
if(z==null)return!1
if($.$get$cO().b.test(H.by(z)))return!1
y=this.b.dZ(z,this.e.ge0())
if(y==null){z="Target page '"+H.b(z)+"' was not found."
x=this.Q
x.toString
w=new A.v(667,null,null,null,null)
w.c=z
x.a.G(w.F())
return!0}y.gla()
return!1},"$1","gfG",2,0,55],
ec:function(){var z,y,x,w,v,u
this.hq()
try{x=this.e.gh()
w=$.$get$cE()
x=new Z.fU(x,this.b.jV(),null,null,null,null)
x.c=H.aM(Z.d2(w),"$isI",[P.p,P.d],"$asI")
x.f=Date.now()
x.e=C.e.l7(H.aE(x),16)
return x}catch(v){z=H.C(v)
y=H.E(v)
x=this.Q
w=H.b(z)+"\n"+H.b(y)
x.toString
u=new A.v(666,null,null,null,null)
u.c="Error when creating savegame: "+w
x.a.G(u.F())
throw H.c(z)}},
hg:function(a,b){var z,y,x
this.fC()
z=this.b
y=z.a
if(y.j(0,a.a)==null)throw H.c(new Z.dD("Trying to load page '"+H.b(a.a)+"' which doesn't exist in current egamebook."))
this.e=y.j(0,a.a)
this.x=this.y
y=this.Q
y.toString
x=new A.v(667,null,null,null,null)
x.c="Importing state from savegame."
y.a.G(x.F())
z.kf(a.b)
if(b!=null){z=this.Q
z.toString
y=new A.v(667,null,null,null,null)
y.c="Importing player chronology."
z.a.G(y.F())
this.f.ax(0,b)}z=this.Q
z.toString
y=new A.v(667,null,null,null,null)
y.c="Copying save variables into vars."
z.a.G(y.F())
y=$.$get$cE()
Z.nU(a,y,P.dN(P.p,P.bG))
this.cx=H.F(y.j(0,"game"),"$isf7")
this.cy=H.aM(y.j(0,"hitpoints"),"$isau",[P.aW],"$asau")
z=[P.u]
this.db=H.aM(y.j(0,"stamina"),"$isau",z,"$asau")
this.dx=H.aM(y.j(0,"gold"),"$isau",z,"$asau")
z=this.Q
Z.hz(Z.bR())
z.toString
y=new A.v(90,null,null,null,null)
y.b=Z.bR()
z.a.G(y.F())
y=this.Q
y.toString
z=new A.v(667,null,null,null,null)
z.c="loadFromSaveGame() done."
y.a.G(z.F())
this.bB()},
kz:function(a){return this.hg(a,null)},
e2:[function(a,b,c,d){var z=0,y=P.aB(),x,w=this,v,u,t
var $async$e2=P.ax(function(e,f){if(e===1)return P.aH(f,y)
while(true)switch(z){case 0:v=$.$get$dq()
if(v.E.length!==0){w.Q.fb(J.h(v))
v.E=""}v=w.Q
v.toString
u=new A.v(130,null,null,null,null)
u.b=[a,b,d,c]
v.a.G(u.F())
u=U.cq
t=new P.H(0,$.r,null,[u])
v.x=new P.ct(t,[u])
x=t
z=1
break
case 1:return P.aI(x,y)}})
return P.aJ($async$e2,y)},function(a,b){return this.e2(a,b,null,!1)},"lf","$4$rerollEffectDescription$rerollable","$2","gi2",4,5,37,1,0]},
oj:{"^":"a:0;a,b,c",
$1:function(a){var z,y,x,w
a.sfc(!0)
if(a.d===this.c){z="Found choice that was selected: "+a.e
y=this.b.Q
y.toString
x=new A.v(667,null,null,null,null)
x.c=z
y.a.G(x.F())
this.a.a=a}else{z=a.x
if(z!=null){y=this.b
w=$.$get$cO().b.test(H.by(z))?y.d.a:y.b.dZ(z,y.e.ge0())
if(w!=null){y.f.t(0,H.b(y.e.gh())+">>"+H.b(w.gh()))
y.r=!0}}}}},
o9:{"^":"a:0;a",
$1:function(a){return this.a.bB()}},
oa:{"^":"a:0;a",
$1:function(a){return a.gfc()||this.a.iS(a)}},
ob:{"^":"a:38;a,b",
$1:function(a){return a.kp(this.b,this.a.a)}},
oc:{"^":"a:0;a",
$1:function(a){var z,y,x
z=H.b(a)
y=this.a.Q
y.toString
x=new A.v(667,null,null,null,null)
x.c=z
y.a.G(x.F())
return}},
od:{"^":"a:0;",
$1:function(a){return a instanceof D.c5}},
oe:{"^":"a:0;",
$1:function(a){return a.gkq()}},
of:{"^":"a:2;",
$0:function(){return}},
og:{"^":"a:0;a",
$1:function(a){return this.a.bB()}},
oh:{"^":"a:0;a,b",
$1:function(a){return a.dI(!0,this.a.a,this.b.gfG())}},
oi:{"^":"a:0;a,b",
$1:function(a){return a.dI(!0,this.a.a,this.b.gfG())}},
ok:{"^":"a:0;a",
$1:function(a){return this.a.bB()}},
nh:{"^":"d;a,b,fZ:c<",
jl:function(a,b,c){var z
if(!$.hV){z=J.ao(this.a,b)
this.a=z
this.b.aF(new A.cZ(b,z,c))}},
t:function(a,b){return this.jl(a,b,null)},
ak:function(a,b){this.t(0,b)
return this},
F:function(){return P.a1(["points",this.a])},
hF:function(a){this.a=a.j(0,"points")
this.b.bi(0)},
ie:function(){this.b=P.bb(null,A.cZ)},
$ise8:1},
d3:{"^":"n0;aC:d<,dV:e@,a,b,c",
ghG:function(){return J.ac(this.e,0)}},
nY:{"^":"d;a,b"},
o4:{"^":"d;a",
j:function(a,b){return this.a.j(0,b)},
dZ:function(a,b){var z
if(b!=null&&this.a.ad(b+": "+H.b(a)))return this.a.j(0,H.b(b)+": "+H.b(a))
else{z=this.a
if(z.ad(a))return z.j(0,a)
else return}},
p:function(a,b,c){this.a.p(0,b,c)
c.sh(b)},
jV:function(){var z=new H.R(0,null,null,null,null,null,0,[P.p,null])
this.a.Z(0,new O.o6(z))
return z},
kf:function(a){a.Z(0,new O.o7(this))},
jz:function(){this.a.Z(0,new O.o5())}},
o6:{"^":"a:6;a",
$2:function(a,b){this.a.p(0,a,P.a1(["visitCount",b.gdV()]))}},
o7:{"^":"a:6;a",
$2:function(a,b){var z=this.a.a
if(z.ad(a))z.j(0,a).sdV(J.aA(b,"visitCount"))}},
o5:{"^":"a:6;",
$2:function(a,b){b.sdV(0)}}}],["","",,M,{"^":"",cK:{"^":"d;a,b,c",
k:function(a){return"AuthorScriptException at page '"+H.b(this.b)+"', block #"+H.b(this.c)+": "+H.b(this.a)},
w:{
eW:function(a){return new M.cK(a,null,null)}}}}],["","",,M,{"^":"",o8:{"^":"d;"}}],["","",,Z,{"^":"",fU:{"^":"d;a,b,c,d,e,f",
f3:function(a){var z
if(a!==50&&a!==1020)throw H.c("Cannot create Message of type "+a+". Can only be MSG_SAVE_GAME (50) or MSG_LOAD_GAME (1020).")
z=new A.v(a,null,null,null,null)
z.c=this.dS()
return z},
dS:function(){var z,y
z=new H.R(0,null,null,null,null,null,0,[P.p,null])
z.p(0,"uid",this.e)
z.p(0,"currentPageName",this.a)
z.p(0,"pageMapState",this.b)
z.p(0,"vars",this.c)
z.p(0,"timestamp",this.f)
y=this.d
if(y!=null)z.p(0,"previousText",y)
return C.y.h3(z)},
k:function(a){return this.dS()},
w:{
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
z.Z(a,new Z.nT(a,w))
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
z.Z(a,new Z.nS(b,v))
return v}else if(w&&a.ad("_class"))if(c!=null){c.hF(a)
return c}else{u=z.j(a,"_class")
if(!b.ad(u))throw H.c(new Z.dD("Constructor for "+H.b(u)+" not set. Cannot assemble a new instance."))
else return b.j(0,u).$1(a)}else throw H.c("Function _assembleFromPrimitives called with a non-primitive argument type.")}}},
nU:function(a,b,c){a.c.Z(0,new Z.nV(b,c))}}},nT:{"^":"a:6;a,b",
$2:function(a,b){if(Z.fV(this.a.j(0,a)))this.b.p(0,a,Z.d2(b))}},nS:{"^":"a:6;a,b",
$2:function(a,b){this.b.p(0,a,Z.d1(b,this.a,null))}},nV:{"^":"a:39;a,b",
$2:function(a,b){var z,y,x
z=this.a
y=z.j(0,a)
x=this.b
if(y==null)z.p(0,a,Z.d1(b,x,null))
else z.p(0,a,Z.d1(b,x,y))}},dD:{"^":"d;a",
k:function(a){return"IncompatibleSavegameException: "+this.a}},lZ:{"^":"d;a",
k:function(a){return"InvalidSavegameException: "+this.a}}}],["","",,D,{"^":"",nn:{"^":"d;"},nm:{"^":"nn;"},m6:{"^":"nm;a,b,c,d,e,f,r,x",
ln:[function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
o=P.p
n=[o,P.d]
H.aM(a,"$isI",n,"$asI")
m=new A.v(a.j(0,"type"),null,null,null,null)
if(a.ad("strContent"))m.c=a.j(0,"strContent")
if(a.ad("listContent"))m.b=a.j(0,"listContent")
if(a.ad("intContent"))m.d=a.j(0,"intContent")
if(a.ad("mapContent"))m.e=H.aM(a.j(0,"mapContent"),"$isI",n,"$asI")
z=m
switch(z.ghD()){case 1070:o=this.e
if(o!=null){o.dG(new D.c5("Book Quit before choice was selected."))
this.e=null}o=this.b
o.a.bu()
o.b.bu()
return
case 1000:o=new A.v(667,null,null,null,null)
o.c="GET_BOOK_UID received."
n=this.a
n.G(o.F())
n.G(new A.v(10,null,this.c.ch,null,null).F())
return
case 1050:l=z.gkj()
this.e.bZ(l)
this.e=null
return
case 1060:o=new A.v(667,null,null,null,null)
o.c="New form state from player received."
this.a.G(o.F())
o=z.gkB()
if(!o.ad("__submitted__"))o.p(0,"__submitted__",!1)
n=this.r
if(n.b>=4)H.i(n.cF())
n.bU(new G.km(o))
return
case 1080:o=new A.v(667,null,null,null,null)
o.c="Received slot machine result."
this.a.G(o.F())
k=J.aA(z.geU(),0)
j=J.aA(z.geU(),1)
o=this.x
if(k>>>0!==k||k>=4)return H.f(C.C,k)
o.bZ(new U.cq(C.C[k],j))
this.x=null
return
case 1010:o=new A.v(667,null,null,null,null)
o.c="Starting book from scratch."
n=this.a
n.G(o.F())
o=this.e
if(o!=null){o.dG(new D.c5("Book Restart before choice was selected."))
this.e=null}try{this.c.f_()}catch(i){y=H.C(i)
x=H.E(i)
o=new A.v(666,null,null,null,null)
o.c="An error occured when initializing: "+H.b(y)+".\n"+H.b(x)
n.G(o.F())
throw H.c(y)}o=new A.v(90,null,null,null,null)
o.b=Z.bR()
n.G(o.F())
n.G(new A.cZ(0,0,null).dT().F())
return
case 1020:h=new A.v(667,null,null,null,null)
h.c="Loading a saved game."
g=this.a
g.G(h.F())
h=this.e
if(h!=null){h.dG(new D.c5("Book Load before choice was selected."))
this.e=null}try{h=z.gi6()
f=new Z.fU(null,null,null,null,null,null)
e=H.aM(C.y.jH(h),"$isI",n,"$asI")
if(!e.ad("currentPageName")||!e.ad("vars"))H.i(new Z.lZ("Invalid JSON for Savegame. Doesn't contain required fields 'currentPageName' or 'vars'. JSON='"+H.b(h)+"'."))
f.e=e.j(0,"uid")
f.a=e.j(0,"currentPageName")
f.f=e.j(0,"timestamp")
f.b=H.aM(e.j(0,"pageMapState"),"$isI",n,"$asI")
f.c=H.aM(e.j(0,"vars"),"$isI",n,"$asI")
if(e.ad("previousText"))f.d=e.j(0,"previousText")
w=f
v=H.aM(J.j3(z.geU()),"$isbP",[o],"$asbP")
o=this.c
if(v!=null)o.hg(w,v)
else o.kz(w)}catch(i){o=H.C(i)
if(o instanceof Z.dD){u=o
t=H.E(i)
o=new A.v(666,null,null,null,null)
o.c="Load failed due to incompatibility: "+H.b(u)+".\n"+H.b(t)
g.G(o.F())
this.c.f_()}else{s=o
r=H.E(i)
o=new A.v(666,null,null,null,null)
o.c="Load failed for unknown reason: "+H.b(s)+".\n"+H.b(r)
g.G(o.F())
this.c.f_()}}try{o=new A.v(90,null,null,null,null)
o.b=Z.bR()
g.G(o.F())}catch(i){q=H.C(i)
p=H.E(i)
o=new A.v(666,null,null,null,null)
o.c="Sending Stats failed for unknown reason: "+H.b(q)+".\n"+H.b(p)
g.G(o.F())
throw H.c(q)}this.c.toString
g.G(new A.cZ(0,$.$get$cz().a,null).dT().F())
return
case 1090:this.f.bZ(!0)
this.f=null
return
case 1040:this.c.bB()
return
default:o=new A.v(666,null,null,null,null)
o.c="Wrong message type received by Scripter - "+H.b(z.ghD())+"."
this.a.G(o.F())}},"$1","giY",2,0,21],
fb:function(a){var z=P.X
this.f=new P.ct(new P.H(0,$.r,null,[z]),[z])
z=new A.v(30,null,null,null,null)
z.c=a
this.a.G(z.F())
return this.f.a}},c5:{"^":"d;a",
k:function(a){return"AsyncOperationOverridenException: "+this.a+"."}}}],["","",,G,{"^":"",km:{"^":"d;a",
F:function(){return P.ck(this.a,null,null)},
k:function(a){return"<CurrentState submitted="+H.b(this.a.j(0,"__submitted__"))+">"}}}],["","",,A,{"^":"",v:{"^":"d;hD:a<,eU:b<,i6:c<,kj:d<,kB:e<",
gl9:function(){var z=this.a
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
dS:function(){return C.y.h3(this.F())},
F:function(){var z,y
z=new H.R(0,null,null,null,null,null,0,[P.p,P.d])
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
z="Message "+this.gl9()
y=this.a
x=J.o(y)
return z+(x.B(y,50)||x.B(y,60)||x.B(y,90)||x.B(y,100)||x.B(y,666)||x.B(y,667)?" (async)":"")}}}],["","",,E,{"^":"",n0:{"^":"d;h:a@,la:b<",
k:function(a){return this.a},
ge0:function(){var z,y
z=this.a
if(z==null)throw H.c("Accessed groupName Page has name = null.")
y=J.iZ(z,": ")
if(y>0)return J.j2(this.a,0,y)
else return}}}],["","",,A,{"^":"",cZ:{"^":"d;jx:a<,b,c",
k:function(a){var z="Score +"+H.b(this.a)+"."
return z},
dT:function(){var z=new A.v(70,null,null,null,null)
z.b=[this.a,this.b]
z.c=this.c
return z}}}],["","",,L,{"^":"",ad:{"^":"d;fc:a@,b,c,d,ba:e<,J:f<,h5:r<,x,y",
gkq:function(){return this.e.length===0},
dI:function(a,b,c){if(this.a)return!1
if(this.e.length===0)return!1
b!=null
a!=null
if(c!=null&&c.$1(this)===!0)return!1
return!0},
kp:function(a,b){return this.dI(a,b,null)},
l5:function(){return P.a1(["string",this.e,"hash",this.d,"submenu",this.y,"helpMessage",this.f])},
c8:function(a){this.r=a
return this},
bE:function(a,b){return C.b.bE(this.e,b.gba())},
k:function(a){return"Choice: "+this.e+" ["+H.b(this.x)+"] ("+this.d+")"},
ia:function(a,b,c,d,e,f,g){if(a==null)throw H.c(P.G("String given to choice cannot be null."))
this.e=J.bh(a).f4(a)
this.d=C.b.gD(a)
this.r=f
this.b=!1
this.c=!1},
$isW:1,
$asW:function(){return[L.ad]},
w:{
f1:function(a,b,c,d,e,f,g){var z=new L.ad(!1,null,null,null,null,e,null,d,g)
z.ia(a,!1,!1,d,e,f,g)
return z}}},f2:{"^":"ft;a,b",
gl:function(a){return this.b.length},
sl:function(a,b){C.a.sl(this.b,b)
return b},
j:function(a,b){var z=this.b
if(b>>>0!==b||b>=z.length)return H.f(z,b)
return z[b]},
p:function(a,b,c){var z=this.b
if(b>>>0!==b||b>=z.length)return H.f(z,b)
z[b]=c},
jv:function(a){var z,y,x,w,v,u,t,s,r,q,p,o
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
p=H.ij(J.aA(y,"script"),t)
o=new L.ad(!1,null,null,null,null,null,null,q,J.aA(y,"submenu"))
if(r==null)H.i(P.G("String given to choice cannot be null."))
o.e=J.bh(r).f4(r)
o.d=C.b.gD(r)
o.r=p
o.b=!1
o.c=!1
C.a.t(v,o)}},
jr:function(a,b,c,d,e,f,g){if(b instanceof L.ad)C.a.t(this.b,b)
else if(typeof b==="string")C.a.t(this.b,L.f1(b,!1,!1,e,null,f,g))
else throw H.c(P.G("To add a choice to choices, one must provide either a new Choice element or a String."))},
t:function(a,b){return this.jr(a,b,!1,!1,null,null,null)},
l6:function(a,b,c,d){var z,y,x,w
z=this.b
y=H.m(z,0)
x=P.P(new H.K(z,new L.k_(b,a,c),[y]),!0,y)
if(x.length===0)throw H.c("Choices is empty, but still choices.toMessage was called.")
w=new A.v(40,null,null,null,null)
z=[]
w.b=z
z.push(d)
z.push(this.a)
C.a.Z(x,new L.k0(w))
return w},
dT:function(){return this.l6(null,null,null,null)},
k:function(a){var z=this.b
return new H.aq(z,new L.k1(),[H.m(z,0),null]).cp(0,", ")},
$asft:function(){return[L.ad]},
$asfC:function(){return[L.ad]},
$asN:function(){return[L.ad]},
$asa0:function(){return[L.ad]}},k_:{"^":"a:0;a,b,c",
$1:function(a){return a.dI(this.b,this.a,this.c)}},k0:{"^":"a:0;a",
$1:function(a){H.b(a)
J.dr(this.a.b,a.l5())
a.a=!0}},k1:{"^":"a:0;",
$1:function(a){return H.b(a)}}}],["","",,Z,{"^":"",d4:{"^":"d;dl:a<,ba:b<",
F:function(){return P.a1(["show",this.a,"string",this.b])}},oJ:{"^":"d;a",
F:function(){var z=new H.R(0,null,null,null,null,null,0,[P.p,P.d])
this.a.Z(0,new Z.oK(z))
return z},
Z:function(a,b){this.a.Z(0,b)}},oK:{"^":"a:40;a",
$2:function(a,b){this.a.p(0,a,b.F())}},hy:{"^":"d;h:a@,aT:b<,h_:c<,dM:d<,dl:e<,hk:f<,ba:r<",w:{
hz:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=H.q(new Array(a.length),[Z.hy])
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
z[w]=new Z.hy(s,r,q,p,o,n,t);++w}C.a.cf(z,new Z.pH())
return z}}},pH:{"^":"a:6;",
$2:function(a,b){return J.bC(b.gdM(),a.gdM())}},au:{"^":"d;h:a<,aT:b<,c,h_:d<,dM:e<,f,r,hk:x<,fX:y@,fZ:z<,$ti",
gaf:function(){return this.f},
saf:function(a){if(!J.e(this.f,a)){this.f=a
this.y=!0
$.cs=!0}},
gdl:function(){return this.r},
gba:function(){return this.c.$1(this.f)},
F:function(){return P.a1(["name",this.a,"value",this.f,"show",this.r])},
hF:function(a){var z
this.saf(H.iJ(a.j(0,"value"),H.m(this,0)))
z=a.j(0,"show")
if(!J.e(this.r,z)){this.r=z
this.y=!0
$.cs=!0}},
$ise8:1,
w:{
bQ:function(a,b,c,d,e,f,g,h){var z,y
z=$.$get$d5()
y=z.ad(a)?H.aM(z.j(0,a),"$isau",[h],"$asau"):new Z.au(a,d,b,c,f,null,null,!0,!1,"Stat",[null])
y.f=H.iJ(e,h)
y.r=!0
z.p(0,a,y)
return y},
oM:function(){var z,y
z=new Z.oJ(new H.R(0,null,null,null,null,null,0,[P.p,Z.d4]))
y=$.$get$d5().gcC()
new H.K(y,new Z.oN(),[H.y(y,"B",0)]).Z(0,new Z.oO(z))
$.cs=!1
return z},
bR:function(){var z=H.q([],[[P.I,P.p,P.d]])
$.$get$d5().gcC().Z(0,new Z.oL(z))
return z}}},oN:{"^":"a:0;",
$1:function(a){return a.gfX()}},oO:{"^":"a:27;a",
$1:function(a){var z,y
z=a.gdl()
y=a.gba()
a.sfX(!1)
this.a.a.p(0,a.a,new Z.d4(z,y))}},oL:{"^":"a:27;a",
$1:function(a){var z=new H.R(0,null,null,null,null,null,0,[P.p,P.d])
z.p(0,"name",a.gh())
z.p(0,"description",a.gaT())
z.p(0,"color",a.gh_())
z.p(0,"priority",a.gdM())
z.p(0,"show",a.gdl())
z.p(0,"notifyOnChange",a.ghk())
z.p(0,"string",a.gba())
this.a.push(z)}}}],["","",,N,{"^":"",dP:{"^":"d;h:a<,b,c,iy:d<,e,f",
gh7:function(){var z,y,x
z=this.b
y=z==null||J.e(z.gh(),"")
x=this.a
return y?x:z.gh7()+"."+x},
geT:function(){if($.it){var z=this.b
if(z!=null)return z.geT()}return $.rL},
kA:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p,o
x=a.b
if(x>=this.geT().b){if(!!J.o(b).$isbG)b=b.$0()
w=b
if(typeof w!=="string"){v=b
b=J.h(b)}else v=null
if(d==null&&x>=$.vl.b)try{x="autogenerated stack trace for "+a.k(0)+" "+H.b(b)
throw H.c(x)}catch(u){z=H.C(u)
y=H.E(u)
d=y
if(c==null)c=z}e=$.r
x=b
w=this.gh7()
t=c
s=d
r=Date.now()
q=$.fu
$.fu=q+1
p=new N.mx(a,x,v,w,new P.cQ(r,!1),q,t,s,e)
if($.it)for(o=this;o!=null;){o.fK(p)
o=o.b}else $.$get$fw().fK(p)}},
cr:function(a,b,c,d){return this.kA(a,b,c,d,null)},
k0:function(a,b,c){return this.cr(C.V,a,b,c)},
an:function(a){return this.k0(a,null,null)},
k_:function(a,b,c){return this.cr(C.U,a,b,c)},
bo:function(a){return this.k_(a,null,null)},
jZ:function(a,b,c){return this.cr(C.W,a,b,c)},
bQ:function(a){return this.jZ(a,null,null)},
kh:function(a,b,c){return this.cr(C.B,a,b,c)},
he:function(a){return this.kh(a,null,null)},
lb:function(a,b,c){return this.cr(C.Z,a,b,c)},
f5:function(a){return this.lb(a,null,null)},
i0:function(a,b,c){return this.cr(C.Y,a,b,c)},
e1:function(a){return this.i0(a,null,null)},
fK:function(a){},
w:{
bm:function(a){return $.$get$fv().kO(a,new N.tz(a))}}},tz:{"^":"a:2;a",
$0:function(){var z,y,x,w
z=this.a
if(C.b.dm(z,"."))H.i(P.G("name shouldn't start with a '.'"))
y=C.b.kx(z,".")
if(y===-1)x=z!==""?N.bm(""):null
else{x=N.bm(C.b.aM(z,0,y))
z=C.b.bL(z,y+1)}w=new H.R(0,null,null,null,null,null,0,[P.p,N.dP])
w=new N.dP(z,x,null,w,new P.hB(w,[null,null]),null)
if(x!=null)x.giy().p(0,z,w)
return w}},aZ:{"^":"d;h:a<,af:b<",
B:function(a,b){if(b==null)return!1
return b instanceof N.aZ&&this.b===b.b},
b0:function(a,b){return C.e.b0(this.b,b.gaf())},
dg:function(a,b){var z=b.gaf()
if(typeof z!=="number")return H.x(z)
return this.b<=z},
b7:function(a,b){var z=b.gaf()
if(typeof z!=="number")return H.x(z)
return this.b>z},
bC:function(a,b){return this.b>=b.gaf()},
bE:function(a,b){var z=b.gaf()
if(typeof z!=="number")return H.x(z)
return this.b-z},
gD:function(a){return this.b},
k:function(a){return this.a},
$isW:1,
$asW:function(){return[N.aZ]}},mx:{"^":"d;eT:a<,b,aW:c<,d,V:e<,f,bv:r<,br:x<,y",
k:function(a){return"["+this.a.a+"] "+this.d+": "+H.b(this.b)}}}],["","",,X,{"^":"",
bB:function(a){return X.df(J.iW(a,0,new X.uZ()))},
b2:function(a,b){var z=J.ao(a,b)
if(typeof z!=="number")return H.x(z)
a=536870911&z
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
df:function(a){if(typeof a!=="number")return H.x(a)
a=536870911&a+((67108863&a)<<3)
a^=a>>>11
return 536870911&a+((16383&a)<<15)},
uZ:{"^":"a:6;",
$2:function(a,b){return X.b2(a,J.j(b))}},
dX:{"^":"cf;a,$ti",
gaf:function(){var z=this.a
if(z==null)throw H.c(new P.w("value called on absent Optional."))
return z},
b4:function(a){var z=this.a
return z==null?a:z},
ga_:function(a){var z=this.a
if(z!=null){z=H.q([z],this.$ti)
z=new J.bj(z,1,0,null,[H.m(z,0)])}else z=C.K
return z},
gD:function(a){return J.j(this.a)},
B:function(a,b){var z,y
if(b==null)return!1
if(b instanceof X.dX){z=b.a
y=this.a
y=z==null?y==null:z===y
z=y}else z=!1
return z},
k:function(a){var z=this.a
return z==null?"Optional { absent }":"Optional { value: "+H.b(z)+" }"},
ic:function(a,b){if(this.a==null)throw H.c(P.G("Must not be null."))},
w:{
fG:function(a,b){var z=new X.dX(a,[b])
z.ic(a,b)
return z}}}}],["","",,U,{"^":"",d0:{"^":"d;a,b",
k:function(a){return this.b}},cq:{"^":"d;a,lc:b<",
geQ:function(){return this.a===C.G},
k:function(a){return"SessionResult<"+this.a.b+",wasRerolled="+H.b(this.b)+">"},
B:function(a,b){if(b==null)return!1
return b instanceof U.cq&&b.a===this.a&&J.e(b.b,this.b)},
gD:function(a){return(this.b===!0?2:1)*100+this.a.a}}}],["","",,X,{"^":"",
xY:[function(a,b){var z,y,x,w,v
z=new D.m6(b,null,null,null,null,null,null,null)
y=$.fR
$.fR=y+1
x=new H.co(y,null,!1)
w=init.globalState.d
w.e6(y,x)
w.cR()
w=new H.nD(x,null)
w.ig(x)
z.b=w
w=w.b
w.toString
new P.d8(w,[H.m(w,0)]).aJ(z.giY(),null,null,null)
b.G(new H.cw(z.b.a,init.globalState.d.a))
v=N.o_()
z.c=v
v.Q=z},"$2","id",4,0,36]},1]]
setupProgram(dart,0)
J.o=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.fk.prototype
return J.fj.prototype}if(typeof a=="string")return J.cj.prototype
if(a==null)return J.fl.prototype
if(typeof a=="boolean")return J.fi.prototype
if(a.constructor==Array)return J.ch.prototype
if(!(a instanceof P.d))return J.bs.prototype
return a}
J.az=function(a){if(a==null)return a
if(a.constructor==Array)return J.ch.prototype
if(!(a instanceof P.d))return J.bs.prototype
return a}
J.L=function(a){if(typeof a=="string")return J.cj.prototype
if(a==null)return a
if(a.constructor==Array)return J.ch.prototype
if(!(a instanceof P.d))return J.bs.prototype
return a}
J.am=function(a){if(typeof a=="number")return J.ci.prototype
if(a==null)return a
if(!(a instanceof P.d))return J.bs.prototype
return a}
J.eB=function(a){if(typeof a=="number")return J.ci.prototype
if(typeof a=="string")return J.cj.prototype
if(a==null)return a
if(!(a instanceof P.d))return J.bs.prototype
return a}
J.bh=function(a){if(typeof a=="string")return J.cj.prototype
if(a==null)return a
if(!(a instanceof P.d))return J.bs.prototype
return a}
J.ao=function(a,b){if(typeof a=="number"&&typeof b=="number")return a+b
return J.eB(a).ak(a,b)}
J.b5=function(a,b){if(typeof a=="number"&&typeof b=="number")return a/b
return J.am(a).de(a,b)}
J.e=function(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.o(a).B(a,b)}
J.ac=function(a,b){if(typeof a=="number"&&typeof b=="number")return a>b
return J.am(a).b7(a,b)}
J.c1=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<b
return J.am(a).b0(a,b)}
J.c2=function(a,b){if(typeof a=="number"&&typeof b=="number")return a*b
return J.eB(a).cc(a,b)}
J.iU=function(a){if(typeof a=="number")return-a
return J.am(a).f9(a)}
J.bC=function(a,b){if(typeof a=="number"&&typeof b=="number")return a-b
return J.am(a).at(a,b)}
J.aA=function(a,b){if(typeof b==="number")if(a.constructor==Array||typeof a=="string")if(b>>>0===b&&b<a.length)return a[b]
return J.L(a).j(a,b)}
J.dr=function(a,b){return J.az(a).t(a,b)}
J.iV=function(a,b,c,d,e,f,g,h,i,j,k,l,m,n){return J.az(a).jk(a,b,c,d,e,f,g,h,i,j,k,l,m,n)}
J.c3=function(a,b,c){return J.az(a).n(a,b,c)}
J.bD=function(a,b){return J.eB(a).bE(a,b)}
J.ds=function(a,b){return J.L(a).a4(a,b)}
J.eQ=function(a,b){return J.az(a).au(a,b)}
J.iW=function(a,b,c){return J.az(a).bw(a,b,c)}
J.j=function(a){return J.o(a).gD(a)}
J.eR=function(a){return J.L(a).gY(a)}
J.aj=function(a){return J.az(a).ga_(a)}
J.iX=function(a){return J.az(a).gA(a)}
J.aN=function(a){return J.L(a).gl(a)}
J.iY=function(a){return J.o(a).gbz(a)}
J.iZ=function(a,b){return J.L(a).b3(a,b)}
J.eS=function(a,b){return J.az(a).aK(a,b)}
J.j_=function(a,b,c){return J.bh(a).hh(a,b,c)}
J.dt=function(a,b,c){return J.bh(a).kS(a,b,c)}
J.cF=function(a,b,c){return J.bh(a).d6(a,b,c)}
J.j0=function(a){return J.am(a).hy(a)}
J.j1=function(a,b){return J.az(a).e3(a,b)}
J.eT=function(a,b){return J.bh(a).dm(a,b)}
J.j2=function(a,b,c){return J.bh(a).aM(a,b,c)}
J.j3=function(a){return J.az(a).bH(a)}
J.h=function(a){return J.o(a).k(a)}
J.c4=function(a,b){return J.am(a).bk(a,b)}
J.j4=function(a,b){return J.az(a).ca(a,b)}
I.aX=function(a){a.immutable$list=Array
a.fixed$length=Array
return a}
var $=I.p
C.N=J.aY.prototype
C.a=J.ch.prototype
C.O=J.fi.prototype
C.u=J.fj.prototype
C.e=J.fk.prototype
C.P=J.fl.prototype
C.j=J.ci.prototype
C.b=J.cj.prototype
C.H=new A.ap(0,0,0)
C.I=new A.ap(-1/0,-1/0,-1/0)
C.J=new A.cH(-10,0,100)
C.K=new H.l9([null])
C.L=new P.n_()
C.v=new P.qD()
C.M=new P.qW()
C.i=new P.ra()
C.z=new P.b8(0)
C.A=new U.bH(0,"ItemType.fist")
C.w=new U.bH(1,"ItemType.shield")
C.r=new U.bH(2,"ItemType.spear")
C.x=new U.bH(3,"ItemType.sword")
C.Q=function getTagFallback(o) {
  var s = Object.prototype.toString.call(o);
  return s.substring(8, s.length - 1);
}
C.y=new P.mb(null,null)
C.R=new P.md(null)
C.S=new P.me(null,null)
C.T=new O.mm(0,"KnownToMode.all")
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
C.a0=I.aX([C.A])
C.a1=I.aX([C.w])
C.D=I.aX([C.r])
C.o=I.aX([C.x])
C.d=I.aX([])
C.a2=I.aX(['Briana spits on the floor. "Can\'t wait to see some actual architecture \n  when we get out of here."',"Somewhere in the distance, there are yells that rise in intensity, \n  then suddenly stop entirely.",'Briana turns to you with an intense whisper. \n  "You know, I _have_ a right to hate orcs." \n  \n  "I didn\'t know people need to have a right to hate them, to be honest." \n  \n  She observes you for a moment. "I\'m glad we are in agreement."',"More yells from the distance.","Briana stops and listens for a moment. \"Aren, we're pushing our luck. \n  I'd hate to go all this way only to get \n  my head smashed in by some random orc patrol."])
C.a3=new H.kb(0,{},C.d,[null,null])
C.a4=new X.dX(null,[P.M])
C.k=new R.e_(0,"Pose.standing")
C.h=new R.e_(1,"Pose.offBalance")
C.f=new R.e_(2,"Pose.onGround")
C.l=new K.e0(0,"Predetermination.none")
C.p=new K.e0(1,"Predetermination.successGuaranteed")
C.m=new K.e0(2,"Predetermination.failureGuaranteed")
C.t=new Y.cl("he","him","his","himself")
C.n=new Y.cl("it","it","its","itself")
C.a5=new Y.cl("she","her","her","herself")
C.E=new Y.cl("they","them","their","themselves")
C.F=new Y.cl("you","you","your","yourself")
C.c=new Q.nI(0,"Resource.stamina")
C.a9=H.bf("fm")
C.aa=H.bf("at")
C.ab=H.bf("p")
C.ac=H.bf("X")
C.ad=H.bf("aW")
C.q=H.bf("dynamic")
C.ae=H.bf("u")
C.af=H.bf("M")
C.ag=new P.bU(null,2)
$.fR=1
$.fK="$cachedFunction"
$.fL="$cachedInvocation"
$.aO=0
$.bE=null
$.eY=null
$.bv=null
$.bX=null
$.bY=null
$.er=!1
$.r=C.i
$.fa=0
$.eC=null
$.hV=!1
$.rD=null
$.hX=!1
$.iu=!0
$.cs=!1
$.it=!1
$.vl=C.X
$.rL=C.B
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
I.$lazy(y,x,w)}})(["ff","$get$ff",function(){return H.m4()},"fg","$get$fg",function(){if(typeof WeakMap=="function")var z=new WeakMap()
else{z=$.fa
$.fa=z+1
z="expando$key$"+z}return new P.lf(null,z,[P.u])},"hn","$get$hn",function(){return H.aQ(H.d7({
toString:function(){return"$receiver$"}}))},"ho","$get$ho",function(){return H.aQ(H.d7({$method$:null,
toString:function(){return"$receiver$"}}))},"hp","$get$hp",function(){return H.aQ(H.d7(null))},"hq","$get$hq",function(){return H.aQ(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"hu","$get$hu",function(){return H.aQ(H.d7(void 0))},"hv","$get$hv",function(){return H.aQ(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"hs","$get$hs",function(){return H.aQ(H.ht(null))},"hr","$get$hr",function(){return H.aQ(function(){try{null.$method$}catch(z){return z.message}}())},"hx","$get$hx",function(){return H.aQ(H.ht(void 0))},"hw","$get$hw",function(){return H.aQ(function(){try{(void 0).$method$}catch(z){return z.message}}())},"eg","$get$eg",function(){return P.ql()},"bl","$get$bl",function(){var z,y
z=P.at
y=new P.H(0,P.pY(),null,[z])
y.io(null,z)
return y},"bZ","$get$bZ",function(){return[]},"dj","$get$dj",function(){return new K.cd("fist",P.aD(C.a0,null))},"bL","$get$bL",function(){return N.bm("PlannerRecommendation")},"ig","$get$ig",function(){return new K.rX()},"ez","$get$ez",function(){var z=$.$get$ig()
return K.Y("__END_OF_ROAM__",z,z,null,null,[],"ground")},"aa","$get$aa",function(){return P.e5(null)},"bN","$get$bN",function(){return P.e5(null)},"iw","$get$iw",function(){return N.bm("Storyline")},"hb","$get$hb",function(){return P.bp("(\\w)([\\.\\?\\!])([\"'])\\.(?=$|\\s)",!0,!1)},"bz","$get$bz",function(){return L.ef(new L.ty())},"aL","$get$aL",function(){return L.ef(new L.t_())},"dm","$get$dm",function(){return L.ef(new L.tx())},"dY","$get$dY",function(){return new F.n4("Sometimes, patience pays off. Especially when the other option is potentially dangerous.",!1,!0,!1,null,null)},"ex","$get$ex",function(){return Y.c9(!1,"balance",!0,C.n,$.$get$aL())},"iA","$get$iA",function(){return Y.c9(!1,"pounding",!1,C.n,$.$get$aL())},"fS","$get$fS",function(){return new B.nG("Most moves are easier and more effective when you are firmly in balance.",!1,!0,!1,null,null)},"fW","$get$fW",function(){return new O.nW(null,!1,!0,!1,null,null)},"ha","$get$ha",function(){return new Q.oF(null,!1,!0,!0,C.c,null)},"hA","$get$hA",function(){return new M.pI("",!0,C.c,!1,!0,null)},"hW","$get$hW",function(){return P.e5(null)},"eX","$get$eX",function(){return new Z.jD(!1,!0,!1,null,null)},"iM","$get$iM",function(){return Y.c9(!1,"swing",!0,C.n,$.$get$aL())},"iL","$get$iL",function(){return Y.c9(!1,"swing",!0,C.n,$.$get$aL())},"iK","$get$iK",function(){return Y.c9(!1,"swing",!0,C.n,$.$get$aL())},"fI","$get$fI",function(){return X.fG(0,P.M)},"fJ","$get$fJ",function(){return X.fG(1,P.M)},"h4","$get$h4",function(){return new D.oA(!1,!1,!0,null,null)},"cB","$get$cB",function(){return G.pj(!1,!0,"Orcthorn",!0,2,2)},"eq","$get$eq",function(){return Z.oE(!1,!1,"spear",!1,1)},"ew","$get$ew",function(){return new O.pK(1e4)},"i9","$get$i9",function(){return K.Y("cave_with_agruth_pre",new V.ts(),new V.tt(),null,null,H.q([new Q.t("cave_with_agruth","","You look around.",null)],[Q.t]),"ground")},"i8","$get$i8",function(){return K.Y("cave_with_agruth",new V.tq(),new V.tr(),null,null,H.q([new Q.t("underground_church","Go to the Unholy Church","You make it to the Church undetected.",null),new Q.t("war_forge","Go to the war forges","You sneak your way through the black passage, closing towards the sound of hundreds of anvils.",null),new Q.t("slave_quarters_passage","Go to the slave quarters","You and Briana hug the wall and start towards the slave quarters.",null)],[Q.t]),"ground")},"fX","$get$fX",function(){return new V.ol("Search Agruth","search_agruth",!0,null)},"ih","$get$ih",function(){return K.Y("exit_from_bloodrock",new V.to(),new V.tp(),null,null,H.q([new Q.t("__END_OF_ROAM__"," (UNIMPLEMENTED)","...",null)],[Q.t]),"ground")},"ii","$get$ii",function(){return K.Y("forge_church_crevice",new V.tm(),new V.tn(),null,null,H.q([new Q.t("tunnel","Continue along the crevice","You continue until the crevice open into a tunnel. You can smell fresh air.",null)],[Q.t]),"ground")},"is","$get$is",function(){return K.Y("guardpost_above_church",new V.tk(),new V.tl(),null,null,H.q([new Q.t("underground_church","Descend towards the Underground Church","You take the passage leading down towards the temple.",null),new Q.t("smelter","Go to the smelter","You take the slightly downwards passage towards the smelter.",null)],[Q.t]),"ground")},"fc","$get$fc",function(){return new V.lJ("Go to the Upper Gate","guardpost_above_church_enter_tunnel_with_cancel",!0,null)},"fe","$get$fe",function(){return new V.lK("Cautiously take the shield","guardpost_above_church_take_shield",!0,null)},"iv","$get$iv",function(){return K.Y("just_after_agruth_fight",new V.th(),new V.ti(),null,null,H.q([],[Q.t]),"ground")},"fz","$get$fz",function(){return new V.mG('"Luck Bringer"',"name_agruth_sword_opportunity",!0,null)},"fA","$get$fA",function(){return new V.mH('"Savior"',"name_agruth_sword_redemption",!0,null)},"fy","$get$fy",function(){return new V.mF("No name","name_agruth_sword_nothing",!0,null)},"iy","$get$iy",function(){return K.Y("orcthorn_door",new V.tf(),new V.tg(),null,null,H.q([new Q.t("cave_with_agruth","Go to the cave with Agruth's corpse","You back out from the door, and go back where you left Agruth's body.",null),new Q.t("slave_quarters","Go further towards the Gate of Screams","TODO",null),new Q.t("orcthorn_room","Open the door","You open the door.",null)],[Q.t]),"ground")},"iz","$get$iz",function(){return K.Y("orcthorn_room",new V.td(),new V.te(),O.x2(),null,H.q([new Q.t("slave_quarters_passage","Exit the room","You leave through the door and find yourself back in the corridor of the slave quarters.",null)],[Q.t]),"ground")},"hg","$get$hg",function(){return new V.pr("Search for Orcthorn","take_orcthorn",!0,null)},"iB","$get$iB",function(){return K.Y("slave_quarters",new V.tb(),new V.tc(),null,null,H.q([],[Q.t]),"ground")},"h2","$get$h2",function(){return new V.oy("Continue","slave_quarters_continue",!0,null)},"iC","$get$iC",function(){return K.Y("slave_quarters_passage",new V.t9(),new V.ta(),O.x3(),null,H.q([new Q.t("cave_with_agruth","Go back to the cave with Agruth's corpse","You back out from the door, and go back where you left Agruth's body.",null),new Q.t("slave_quarters","Go further towards the Gate of Screams","TODO",null),new Q.t("orcthorn_room","Open the door","You open the door.",null)],[Q.t]),"ground")},"h3","$get$h3",function(){return new V.oz("Examine the door","slave_quarters_passage_examine_door",!0,null)},"iD","$get$iD",function(){return K.Y("smelter",new V.t6(),new V.t7(),null,null,H.q([new Q.t("war_forge","Go to the war forges","You walk through a short passage set in stone, towards the sound of hundreds of anvils.",null),new Q.t("guardpost_above_church","Go through the smooth passage","You take the smooth passage and it leads you slightly upwards.",null)],[Q.t]),"ground")},"h5","$get$h5",function(){return new V.oC("Look around","smelter_look_around",!0,null)},"h6","$get$h6",function(){return new V.oD("Throw spear at the ogre","smelter_throw_spear",!0,null)},"iE","$get$iE",function(){return K.Y("start_adventure",new V.t4(),new V.t5(),O.x0(),null,H.q([new Q.t("just_after_agruth_fight","","You look around. Fortunately, nobody is in sight.",null)],[Q.t]),"ground")},"hi","$get$hi",function(){return new V.pt("Talk to Briana","talk_to_briana_1",!0,null)},"hj","$get$hj",function(){return new V.pu("Ask Briana about her capture","talk_to_briana_2",!0,null)},"hk","$get$hk",function(){return new V.pv("Ask Briana about Orcthorn","talk_to_briana_3",!0,null)},"iN","$get$iN",function(){return K.Y("the_shafts",new V.t2(),new V.t3(),null,null,H.q([new Q.t("tunnel","Run","You run over the passage. Orcs start to scream and yell commands. As you near the entrance, the air gets better.",null)],[Q.t]),"ground")},"iP","$get$iP",function(){return K.Y("tunnel",new V.tU(),new V.rZ(),O.x1(),null,H.q([new Q.t("exit_from_bloodrock","Start running again","You start running again.",null)],[Q.t]),"ground")},"iQ","$get$iQ",function(){return K.Y("tunnel_cancel_chance",new V.tS(),new V.tT(),null,null,H.q([new Q.t("tunnel","Continue","You shake your head and continue through the passage. Soon, you find yourself climbing a steep, poorly lit stairway. Briana catches up with you.",null),new Q.t("guardpost_above_church","Return","You nod, and step back into the circular room.",null)],[Q.t]),"ground")},"iR","$get$iR",function(){return K.Y("underground_church",new V.tF(),new V.tQ(),null,null,H.q([new Q.t("guardpost_above_church","Enter the upwards passage","You take the sloping passage and go a long, slightly rising way.",null),new Q.t("cave_with_agruth","Go back to the cave with Agruth's corpse","You sneak out of the church, back towards where you left Agruth's body.",null),new Q.t("underground_church_altar","Go towards the altar","You sneak towards the front of the temple, trying to stay in the shadows.",null)],[Q.t]),"ground")},"f9","$get$f9",function(){return new V.le("Look around","examine_underground_church",!0,null)},"iS","$get$iS",function(){return K.Y("underground_church_altar",new V.tj(),new V.tu(),null,null,H.q([new Q.t("underground_church","Sneak back","You crouch low and, keeping an eye on the altar, head back to the Church's entrance.",null)],[Q.t]),"ground")},"hC","$get$hC",function(){return new V.pM("Wait","wait_for_ritual",!0,null)},"hh","$get$hh",function(){return new V.ps("Take the spear","take_spear_in_underground_church",!0,null)},"iT","$get$iT",function(){return K.Y("war_forge",new V.rY(),new V.t8(),null,null,H.q([new Q.t("smelter","Go to smelter","You keep low, ascending the stairs. At the top you sense a draft of hot air coming from a passage through the wall. You make your way through it.",null),new Q.t("cave_with_agruth","Go back to the cave with Agruth's corpse","You sneak back towards where you left Agruth's body.",null)],[Q.t]),"ground")},"hD","$get$hD",function(){return new V.pN("Look around","war_forge_look_around",!0,null)},"hE","$get$hE",function(){return new V.pO("Watch the workers","war_forge_watch_workers",!0,null)},"i3","$get$i3",function(){return H.q([$.$get$i9(),$.$get$i8(),$.$get$ih(),$.$get$ii(),$.$get$is(),$.$get$iv(),$.$get$iy(),$.$get$iz(),$.$get$iB(),$.$get$iC(),$.$get$iD(),$.$get$iE(),$.$get$iN(),$.$get$iP(),$.$get$iQ(),$.$get$iR(),$.$get$iS(),$.$get$iT()],[K.cp])},"i2","$get$i2",function(){return H.q([$.$get$fX(),$.$get$fc(),$.$get$fe(),$.$get$fz(),$.$get$fA(),$.$get$fy(),$.$get$hg(),$.$get$h2(),$.$get$h3(),$.$get$h5(),$.$get$h6(),$.$get$hi(),$.$get$hj(),$.$get$hk(),$.$get$f9(),$.$get$hC(),$.$get$hh(),$.$get$hD(),$.$get$hE()],[A.S])},"dq","$get$dq",function(){return P.ph("")},"cz","$get$cz",function(){var z=new O.nh(0,null,"PointsCounter")
z.ie()
return z},"c_","$get$c_",function(){return new L.f2(null,H.q([],[L.ad]))},"cE","$get$cE",function(){return H.fp(P.p,P.d)},"cy","$get$cy",function(){return P.bb(null,{func:1,ret:[P.Q,P.at]})},"cO","$get$cO",function(){return P.bp("^\\s*<<<\\s*$",!0,!1)},"d5","$get$d5",function(){return H.fp(P.p,Z.au)},"fw","$get$fw",function(){return N.bm("")},"fv","$get$fv",function(){return P.dN(P.p,N.dP)}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=[null,!1]
init.types=[{func:1,args:[,]},{func:1,ret:P.p,args:[R.A,A.a4,Y.a3]},{func:1},{func:1,args:[,,,]},{func:1,ret:Q.z,args:[R.A]},{func:1,args:[R.A,A.a4,Y.a3]},{func:1,args:[,,]},{func:1,v:true},{func:1,v:true,args:[R.A,A.a4,Y.a3,R.A,S.af]},{func:1,args:[P.u]},{func:1,ret:R.A,args:[A.a4]},{func:1,v:true,args:[R.A,A.a4,Y.a3,R.A,,]},{func:1,ret:U.cT,args:[A.a4,F.J,[P.B,R.A]]},{func:1,args:[U.cb]},{func:1,ret:P.p,args:[P.u]},{func:1,v:true,args:[{func:1,v:true}]},{func:1,v:true,args:[P.p]},{func:1,args:[,P.b1]},{func:1,v:true,args:[P.d],opt:[P.b1]},{func:1,args:[P.aW]},{func:1,ret:P.Q},{func:1,v:true,args:[P.d]},{func:1,ret:Y.aC,args:[P.u]},{func:1,ret:P.p,args:[P.p]},{func:1,args:[R.A]},{func:1,ret:P.X,args:[R.A,R.A]},{func:1,args:[,,,,]},{func:1,args:[Z.au]},{func:1,ret:P.M,args:[A.ap]},{func:1,ret:Q.ce,args:[U.ae]},{func:1,args:[P.M,R.A]},{func:1,args:[,],opt:[,]},{func:1,args:[P.X]},{func:1,ret:P.M,args:[A.cH]},{func:1,args:[P.u,,]},{func:1,v:true,args:[P.u]},{func:1,v:true,args:[[P.N,P.p],P.fY]},{func:1,ret:[P.Q,U.cq],args:[P.aW,P.p],named:{rerollEffectDescription:P.p,rerollable:P.X}},{func:1,args:[L.ad]},{func:1,args:[P.p,,]},{func:1,args:[P.p,Z.d4]},{func:1,v:true,args:[,P.b1]},{func:1,args:[[P.N,Y.ai],Y.ai]},{func:1,ret:P.u,args:[P.W,P.W]},{func:1,args:[Y.ai]},{func:1,ret:P.M,args:[P.M,P.M]},{func:1,ret:P.u,args:[P.u,P.u]},{func:1,args:[P.bn]},{func:1,args:[{func:1,v:true}]},{func:1,v:true,args:[P.d,P.b1]},{func:1,ret:P.p,args:[Q.ag]},{func:1,ret:Q.ca,args:[Q.t]},{func:1,ret:P.X,args:[P.u]},{func:1,ret:P.p,args:[U.bH,P.p]},{func:1,ret:L.ad,args:[P.p],named:{deferToChoiceList:P.X,deferToEndOfPage:P.X,goto:P.p,helpMessage:P.p,script:{func:1,ret:[P.Q,P.at]},submenu:P.p}},{func:1,ret:P.X,args:[L.ad]}]
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
if(x==y)H.wX(d||a)
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
if(typeof dartMainRunner==="function")dartMainRunner(function(b){H.iF(X.id(),b)},[])
else (function(b){H.iF(X.id(),b)})([])})})()