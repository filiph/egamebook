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
e.$callName=null}}function tearOffGetter(c,d,e,f){return f?new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"(x) {"+"if (c === null) c = "+"H.ee"+"("+"this, funcs, reflectionInfo, false, [x], name);"+"return new c(this, funcs[0], x, name);"+"}")(c,d,e,H,null):new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"() {"+"if (c === null) c = "+"H.ee"+"("+"this, funcs, reflectionInfo, false, [], name);"+"return new c(this, funcs[0], null, name);"+"}")(c,d,e,H,null)}function tearOff(c,d,e,f,a0){var g
return e?function(){if(g===void 0)g=H.ee(this,c,d,true,[],f).prototype
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
var dart=[["","",,H,{"^":"",ux:{"^":"d;a"}}],["","",,J,{"^":"",
n:function(a){return void 0},
aP:{"^":"d;",
u:function(a,b){return a===b},
gv:function(a){return H.ax(a)},
k:function(a){return H.cJ(a)},
gbm:function(a){return new H.ar(H.hN(a),null)}},
eW:{"^":"aP;",
k:function(a){return String(a)},
gv:function(a){return a?519018:218159},
gbm:function(a){return C.a4},
$isY:1},
eY:{"^":"aP;",
u:function(a,b){return null==b},
k:function(a){return"null"},
gv:function(a){return 0},
gbm:function(a){return C.a2},
$isao:1},
f0:{"^":"aP;",
gv:function(a){return 0},
gbm:function(a){return C.a1},
k:function(a){return String(a)},
$iseZ:1},
uC:{"^":"f0;"},
bi:{"^":"f0;"},
c_:{"^":"aP;$ti",
fA:function(a,b){if(!!a.immutable$list)throw H.c(new P.P(b))},
cB:function(a,b){if(!!a.fixed$length)throw H.c(new P.P(b))},
q:function(a,b){this.cB(a,"add")
a.push(b)},
kj:function(a){this.cB(a,"removeLast")
if(a.length===0)throw H.c(H.aC(a,-1))
return a.pop()},
a7:function(a,b){var z
this.cB(a,"remove")
for(z=0;z<a.length;++z)if(J.i(a[z],b)){a.splice(z,1)
return!0}return!1},
iA:function(a,b,c){var z,y,x,w,v
z=[]
y=a.length
for(x=0;x<y;++x){w=a[x]
if(b.$1(w)!==!0===c)z.push(w)
if(a.length!==y)throw H.c(new P.B(a))}v=z.length
if(v===y)return
this.sl(a,v)
for(x=0;x<z.length;++x)a[x]=z[x]},
bY:function(a,b){return new H.J(a,b,[H.m(a,0)])},
aq:function(a,b){var z
this.cB(a,"addAll")
for(z=J.af(b);z.t();)a.push(z.gF())},
L:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){b.$1(a[y])
if(a.length!==z)throw H.c(new P.B(a))}},
aP:function(a,b){return new H.an(a,b,[H.m(a,0),null])},
dK:function(a,b){return H.fI(a,b,null,H.m(a,0))},
bi:function(a,b,c){var z,y,x
z=a.length
for(y=b,x=0;x<z;++x){y=c.$2(y,a[x])
if(a.length!==z)throw H.c(new P.B(a))}return y},
b6:function(a,b,c){var z,y,x
z=a.length
for(y=0;y<z;++y){x=a[y]
if(b.$1(x)===!0)return x
if(a.length!==z)throw H.c(new P.B(a))}throw H.c(H.a9())},
di:function(a,b){return this.b6(a,b,null)},
an:function(a,b){if(b>>>0!==b||b>=a.length)return H.e(a,b)
return a[b]},
gen:function(a){if(a.length>0)return a[0]
throw H.c(H.a9())},
gE:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.c(H.a9())},
gc1:function(a){var z=a.length
if(z===1){if(0>=z)return H.e(a,0)
return a[0]}if(z===0)throw H.c(H.a9())
throw H.c(H.dm())},
aR:function(a,b,c,d,e){var z,y,x
this.fA(a,"setRange")
P.c5(b,c,a.length,null,null,null)
z=c-b
if(z===0)return
if(e<0)H.f(P.X(e,0,null,"skipCount",null))
if(e+z>d.length)throw H.c(H.eV())
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
this.fA(a,"sort")
z=b==null?P.ru():b
H.c9(a,0,a.length-1,z)},
eO:function(a){return this.cg(a,null)},
bG:function(a,b,c){var z
if(c>=a.length)return-1
for(z=c;z<a.length;++z)if(J.i(a[z],b))return z
return-1},
b7:function(a,b){return this.bG(a,b,0)},
a1:function(a,b){var z
for(z=0;z<a.length;++z)if(J.i(a[z],b))return!0
return!1},
gK:function(a){return a.length===0},
gak:function(a){return a.length!==0},
k:function(a){return P.bZ(a,"[","]")},
bz:function(a){return P.b_(a,H.m(a,0))},
gZ:function(a){return new J.br(a,a.length,0,null,[H.m(a,0)])},
gv:function(a){return H.ax(a)},
gl:function(a){return a.length},
sl:function(a,b){this.cB(a,"set length")
if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(P.cp(b,"newLength",null))
if(b<0)throw H.c(P.X(b,0,null,"newLength",null))
a.length=b},
i:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(H.aC(a,b))
if(b>=a.length||b<0)throw H.c(H.aC(a,b))
return a[b]},
n:function(a,b,c){if(!!a.immutable$list)H.f(new P.P("indexed set"))
if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(H.aC(a,b))
if(b>=a.length||b<0)throw H.c(H.aC(a,b))
a[b]=c},
$iscF:1,
$ascF:I.b5,
$isK:1,
$isV:1},
uw:{"^":"c_;$ti"},
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
c0:{"^":"aP;",
bu:function(a,b){var z
if(typeof b!=="number")throw H.c(H.Q(b))
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){z=this.gdk(b)
if(this.gdk(a)===z)return 0
if(this.gdk(a))return-1
return 1}return 0}else if(isNaN(a)){if(isNaN(b))return 0
return 1}else return-1},
gdk:function(a){return a===0?1/a<0:a<0},
h9:function(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw H.c(new P.P(""+a+".round()"))},
bW:function(a,b){var z
if(b>20)throw H.c(P.X(b,0,20,"fractionDigits",null))
z=a.toFixed(b)
if(a===0&&this.gdk(a))return"-"+z
return z},
kC:function(a,b){var z,y,x,w
if(b<2||b>36)throw H.c(P.X(b,2,36,"radix",null))
z=a.toString(b)
if(C.b.cC(z,z.length-1)!==41)return z
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
eK:function(a){return-a},
a5:function(a,b){if(typeof b!=="number")throw H.c(H.Q(b))
return a+b},
ax:function(a,b){if(typeof b!=="number")throw H.c(H.Q(b))
return a-b},
cV:function(a,b){if(typeof b!=="number")throw H.c(H.Q(b))
return a/b},
c_:function(a,b){if(typeof b!=="number")throw H.c(H.Q(b))
return a*b},
bD:function(a,b){return(a|0)===a?a/b|0:this.iJ(a,b)},
iJ:function(a,b){var z=a/b
if(z>=-2147483648&&z<=2147483647)return z|0
if(z>0){if(z!==1/0)return Math.floor(z)}else if(z>-1/0)return Math.ceil(z)
throw H.c(new P.P("Result of truncating division is "+H.b(z)+": "+H.b(a)+" ~/ "+b))},
da:function(a,b){var z
if(a>0)z=b>31?0:a>>>b
else{z=b>31?31:b
z=a>>z>>>0}return z},
aK:function(a,b){if(typeof b!=="number")throw H.c(H.Q(b))
return a<b},
br:function(a,b){if(typeof b!=="number")throw H.c(H.Q(b))
return a>b},
bZ:function(a,b){if(typeof b!=="number")throw H.c(H.Q(b))
return a<=b},
bH:function(a,b){if(typeof b!=="number")throw H.c(H.Q(b))
return a>=b},
gbm:function(a){return C.a7},
$isM:1},
eX:{"^":"c0;",
gbm:function(a){return C.a6},
$isaN:1,
$isM:1,
$isu:1},
kW:{"^":"c0;",
gbm:function(a){return C.a5},
$isaN:1,
$isM:1},
c1:{"^":"aP;",
cC:function(a,b){if(b<0)throw H.c(H.aC(a,b))
if(b>=a.length)H.f(H.aC(a,b))
return a.charCodeAt(b)},
ck:function(a,b){if(b>=a.length)throw H.c(H.aC(a,b))
return a.charCodeAt(b)},
dc:function(a,b,c){if(c>b.length)throw H.c(P.X(c,0,b.length,null,null))
return new H.pV(b,a,c)},
eh:function(a,b){return this.dc(a,b,0)},
fT:function(a,b,c){var z,y
if(c<0||c>b.length)throw H.c(P.X(c,0,b.length,null,null))
z=a.length
if(c+z>b.length)return
for(y=0;y<z;++y)if(this.cC(b,c+y)!==this.ck(a,y))return
return new H.fH(c,b,a)},
a5:function(a,b){if(typeof b!=="string")throw H.c(P.cp(b,null,null))
return a+b},
el:function(a,b){var z,y
z=b.length
y=a.length
if(z>y)return!1
return b===this.bB(a,y-z)},
kl:function(a,b,c){H.bo(c)
return H.o(a,b,c)},
km:function(a,b,c,d){H.bo(c)
P.mf(d,0,a.length,"startIndex",null)
return H.i5(a,b,c,d)},
du:function(a,b,c){return this.km(a,b,c,0)},
hF:function(a,b,c){var z
if(c>a.length)throw H.c(P.X(c,0,a.length,null,null))
if(typeof b==="string"){z=c+b.length
if(z>a.length)return!1
return b===a.substring(c,z)}return J.im(b,a,c)!=null},
d0:function(a,b){return this.hF(a,b,0)},
aC:function(a,b,c){if(c==null)c=a.length
if(typeof c!=="number"||Math.floor(c)!==c)H.f(H.Q(c))
if(b<0)throw H.c(P.c4(b,null,null))
if(typeof c!=="number")return H.v(c)
if(b>c)throw H.c(P.c4(b,null,null))
if(c>a.length)throw H.c(P.c4(c,null,null))
return a.substring(b,c)},
bB:function(a,b){return this.aC(a,b,null)},
eG:function(a){var z,y,x,w,v
z=a.trim()
y=z.length
if(y===0)return z
if(this.ck(z,0)===133){x=J.dn(z,1)
if(x===y)return""}else x=0
w=y-1
v=this.cC(z,w)===133?J.kX(z,w):y
if(x===0&&v===y)return z
return z.substring(x,v)},
kD:function(a){var z,y
if(typeof a.trimLeft!="undefined"){z=a.trimLeft()
if(z.length===0)return z
y=this.ck(z,0)===133?J.dn(z,1):0}else{y=J.dn(a,0)
z=a}if(y===0)return z
if(y===z.length)return""
return z.substring(y)},
c_:function(a,b){var z,y
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
b7:function(a,b){return this.bG(a,b,0)},
jY:function(a,b,c){var z
c=a.length
z=b.length
if(c+z>c)c-=z
return a.lastIndexOf(b,c)},
jX:function(a,b){return this.jY(a,b,null)},
jb:function(a,b,c){if(b==null)H.f(H.Q(b))
if(c>a.length)throw H.c(P.X(c,0,a.length,null,null))
return H.u9(a,b,c)},
a1:function(a,b){return this.jb(a,b,0)},
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
gbm:function(a){return C.a3},
gl:function(a){return a.length},
i:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(H.aC(a,b))
if(b>=a.length||b<0)throw H.c(H.aC(a,b))
return a[b]},
$iscF:1,
$ascF:I.b5,
$isq:1,
$isdF:1,
A:{
f_:function(a){if(a<256)switch(a){case 9:case 10:case 11:case 12:case 13:case 32:case 133:case 160:return!0
default:return!1}switch(a){case 5760:case 8192:case 8193:case 8194:case 8195:case 8196:case 8197:case 8198:case 8199:case 8200:case 8201:case 8202:case 8232:case 8233:case 8239:case 8287:case 12288:case 65279:return!0
default:return!1}},
dn:function(a,b){var z,y
for(z=a.length;b<z;){y=C.b.ck(a,b)
if(y!==32&&y!==13&&!J.f_(y))break;++b}return b},
kX:function(a,b){var z,y
for(;b>0;b=z){z=b-1
y=C.b.cC(a,z)
if(y!==32&&y!==13&&!J.f_(y))break}return b}}}}],["","",,H,{"^":"",
hi:function(a){return a},
a9:function(){return new P.E("No element")},
dm:function(){return new P.E("Too many elements")},
eV:function(){return new P.E("Too few elements")},
c9:function(a,b,c,d){if(c-b<=32)H.fA(a,b,c,d)
else H.fz(a,b,c,d)},
fA:function(a,b,c,d){var z,y,x,w,v
for(z=b+1,y=J.H(a);z<=c;++z){x=y.i(a,z)
w=z
while(!0){if(!(w>b&&J.a3(d.$2(y.i(a,w-1),x),0)))break
v=w-1
y.n(a,w,y.i(a,v))
w=v}y.n(a,w,x)}},
fz:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
z=C.d.bD(c-b+1,6)
y=b+z
x=c-z
w=C.d.bD(b+c,2)
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
if(J.i(d.$2(r,p),0)){for(k=m;k<=l;++k){j=t.i(a,k)
i=d.$2(j,r)
h=J.n(i)
if(h.u(i,0))continue
if(h.aK(i,0)){if(k!==m){t.n(a,k,t.i(a,m))
t.n(a,m,j)}++m}else for(;!0;){i=d.$2(t.i(a,l),r)
h=J.ad(i)
if(h.br(i,0)){--l
continue}else{g=l-1
if(h.aK(i,0)){t.n(a,k,t.i(a,m))
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
break}}H.c9(a,m,l,d)}else H.c9(a,m,l,d)},
V:{"^":"y;$ti"},
aS:{"^":"V;$ti",
gZ:function(a){return new H.du(this,this.gl(this),0,null,[H.x(this,"aS",0)])},
L:function(a,b){var z,y
z=this.gl(this)
for(y=0;y<z;++y){b.$1(this.an(0,y))
if(z!==this.gl(this))throw H.c(new P.B(this))}},
gK:function(a){return this.gl(this)===0},
gE:function(a){if(this.gl(this)===0)throw H.c(H.a9())
return this.an(0,this.gl(this)-1)},
a1:function(a,b){var z,y
z=this.gl(this)
for(y=0;y<z;++y){if(J.i(this.an(0,y),b))return!0
if(z!==this.gl(this))throw H.c(new P.B(this))}return!1},
b6:function(a,b,c){var z,y,x
z=this.gl(this)
for(y=0;y<z;++y){x=this.an(0,y)
if(b.$1(x)===!0)return x
if(z!==this.gl(this))throw H.c(new P.B(this))}return c.$0()},
cI:function(a,b){var z,y,x,w
z=this.gl(this)
if(b.length!==0){if(z===0)return""
y=H.b(this.an(0,0))
if(z!==this.gl(this))throw H.c(new P.B(this))
for(x=y,w=1;w<z;++w){x=x+b+H.b(this.an(0,w))
if(z!==this.gl(this))throw H.c(new P.B(this))}return x.charCodeAt(0)==0?x:x}else{for(w=0,x="";w<z;++w){x+=H.b(this.an(0,w))
if(z!==this.gl(this))throw H.c(new P.B(this))}return x.charCodeAt(0)==0?x:x}},
bY:function(a,b){return this.dN(0,b)},
aP:function(a,b){return new H.an(this,b,[H.x(this,"aS",0),null])},
bi:function(a,b,c){var z,y,x
z=this.gl(this)
for(y=b,x=0;x<z;++x){y=c.$2(y,this.an(0,x))
if(z!==this.gl(this))throw H.c(new P.B(this))}return y},
by:function(a,b){var z,y,x,w
z=[H.x(this,"aS",0)]
if(b){y=H.r([],z)
C.a.sl(y,this.gl(this))}else{x=new Array(this.gl(this))
x.fixed$length=Array
y=H.r(x,z)}for(w=0;w<this.gl(this);++w){z=this.an(0,w)
if(w>=y.length)return H.e(y,w)
y[w]=z}return y},
cd:function(a){return this.by(a,!0)},
bz:function(a){var z,y
z=P.W(null,null,null,H.x(this,"aS",0))
for(y=0;y<this.gl(this);++y)z.q(0,this.an(0,y))
return z}},
nV:{"^":"aS;a,b,c,$ti",
gi8:function(){var z=J.aF(this.a)
return z},
giH:function(){var z,y
z=J.aF(this.a)
y=this.b
if(y>z)return z
return y},
gl:function(a){var z,y
z=J.aF(this.a)
y=this.b
if(y>=z)return 0
return z-y},
an:function(a,b){var z,y
z=this.giH()+b
if(!(b<0)){y=this.gi8()
if(typeof y!=="number")return H.v(y)
y=z>=y}else y=!0
if(y)throw H.c(P.cB(b,this,"index",null,null))
return J.et(this.a,z)},
by:function(a,b){var z,y,x,w,v,u,t,s,r
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
t=H.r(s,u)}for(r=0;r<v;++r){u=x.an(y,z+r)
if(r>=t.length)return H.e(t,r)
t[r]=u
if(x.gl(y)<w)throw H.c(new P.B(this))}return t},
hO:function(a,b,c,d){var z=this.b
if(z<0)H.f(P.X(z,0,null,"start",null))},
A:{
fI:function(a,b,c,d){var z=new H.nV(a,b,c,[d])
z.hO(a,b,c,d)
return z}}},
du:{"^":"d;a,b,c,d,$ti",
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
gZ:function(a){return new H.ln(null,J.af(this.a),this.b,this.$ti)},
gl:function(a){return J.aF(this.a)},
gK:function(a){return J.eu(this.a)},
gE:function(a){return this.b.$1(J.ij(this.a))},
$asy:function(a,b){return[b]},
A:{
bw:function(a,b,c,d){if(!!J.n(a).$isV)return new H.bt(a,b,[c,d])
return new H.cG(a,b,[c,d])}}},
bt:{"^":"cG;a,b,$ti",$isV:1,
$asV:function(a,b){return[b]}},
ln:{"^":"cE;a,b,c,$ti",
t:function(){var z=this.b
if(z.t()){this.a=this.c.$1(z.gF())
return!0}this.a=null
return!1},
gF:function(){return this.a},
$ascE:function(a,b){return[b]}},
an:{"^":"aS;a,b,$ti",
gl:function(a){return J.aF(this.a)},
an:function(a,b){return this.b.$1(J.et(this.a,b))},
$asaS:function(a,b){return[b]},
$asV:function(a,b){return[b]},
$asy:function(a,b){return[b]}},
J:{"^":"y;a,b,$ti",
gZ:function(a){return new H.cU(J.af(this.a),this.b,this.$ti)},
aP:function(a,b){return new H.cG(this,b,[H.m(this,0),null])}},
cU:{"^":"cE;a,b,$ti",
t:function(){var z,y
for(z=this.a,y=this.b;z.t();)if(y.$1(z.gF())===!0)return!0
return!1},
gF:function(){return this.a.gF()}},
fs:{"^":"y;a,b,$ti",
gZ:function(a){return new H.n3(J.af(this.a),this.b,this.$ti)},
A:{
n2:function(a,b,c){if(!!J.n(a).$isV)return new H.ke(a,H.hi(b),[c])
return new H.fs(a,H.hi(b),[c])}}},
ke:{"^":"fs;a,b,$ti",
gl:function(a){var z=J.aF(this.a)-this.b
if(z>=0)return z
return 0},
$isV:1},
n3:{"^":"cE;a,b,$ti",
t:function(){var z,y
for(z=this.a,y=0;y<this.b;++y)z.t()
this.b=0
return z.t()},
gF:function(){return this.a.gF()}}}],["","",,H,{"^":"",
cf:function(a,b){var z=a.cE(b)
if(!init.globalState.d.cy)init.globalState.f.bl()
return z},
i2:function(a,b){var z,y,x,w,v,u
z={}
z.a=b
if(b==null){b=[]
z.a=b
y=b}else y=b
if(!J.n(y).$isK)throw H.c(P.G("Arguments to main must be a List: "+H.b(y)))
init.globalState=new H.pH(0,0,1,null,null,null,null,null,null,null,null,null,a)
y=init.globalState
x=self.window==null
w=self.Worker
v=x&&!!self.postMessage
y.x=v
v=!v
if(v)w=w!=null&&$.$get$eT()!=null
else w=!0
y.y=w
y.r=x&&v
y.f=new H.pg(P.b1(null,H.cd),0)
x=P.u
y.z=new H.O(0,null,null,null,null,null,0,[x,H.e4])
y.ch=new H.O(0,null,null,null,null,null,0,[x,null])
if(y.x===!0){w=new H.pG()
y.Q=w
self.onmessage=function(c,d){return function(e){c(d,e)}}(H.kO,w)
self.dartPrint=self.dartPrint||function(c){return function(d){if(self.console&&self.console.log)self.console.log(d)
else self.postMessage(c(d))}}(H.pI)}if(init.globalState.x===!0)return
y=init.globalState.a++
w=P.W(null,null,null,x)
v=new H.c6(0,null,!1)
u=new H.e4(y,new H.O(0,null,null,null,null,null,0,[x,H.c6]),w,init.createNewIsolate(),v,new H.b7(H.d8()),new H.b7(H.d8()),!1,!1,[],P.W(null,null,null,null),null,null,!1,!0,P.W(null,null,null,null))
w.q(0,0)
u.dO(0,v)
init.globalState.e=u
init.globalState.d=u
if(H.au(a,{func:1,args:[,]}))u.cE(new H.tA(z,a))
else if(H.au(a,{func:1,args:[,,]}))u.cE(new H.tB(z,a))
else u.cE(a)
init.globalState.f.bl()},
kS:function(){var z=init.currentScript
if(z!=null)return String(z.src)
if(init.globalState.x===!0)return H.kT()
return},
kT:function(){var z,y
z=new Error().stack
if(z==null){z=function(){try{throw new Error()}catch(x){return x.stack}}()
if(z==null)throw H.c(new P.P("No stack trace"))}y=z.match(new RegExp("^ *at [^(]*\\((.*):[0-9]*:[0-9]*\\)$","m"))
if(y!=null)return y[1]
y=z.match(new RegExp("^[^@]*@(.*):[0-9]*$","m"))
if(y!=null)return y[1]
throw H.c(new P.P('Cannot extract URI from "'+z+'"'))},
kO:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=new H.cW(!0,[]).bQ(b.data)
y=J.H(z)
switch(y.i(z,"command")){case"start":init.globalState.b=y.i(z,"id")
x=y.i(z,"functionName")
w=x==null?init.globalState.cx:init.globalFunctions[x]()
v=y.i(z,"args")
u=new H.cW(!0,[]).bQ(y.i(z,"msg"))
t=y.i(z,"isSpawnUri")
s=y.i(z,"startPaused")
r=new H.cW(!0,[]).bQ(y.i(z,"replyTo"))
y=init.globalState.a++
q=P.u
p=P.W(null,null,null,q)
o=new H.c6(0,null,!1)
n=new H.e4(y,new H.O(0,null,null,null,null,null,0,[q,H.c6]),p,init.createNewIsolate(),o,new H.b7(H.d8()),new H.b7(H.d8()),!1,!1,[],P.W(null,null,null,null),null,null,!1,!0,P.W(null,null,null,null))
p.q(0,0)
n.dO(0,o)
init.globalState.f.a.ay(new H.cd(n,new H.kP(w,v,u,t,s,r),"worker-start"))
init.globalState.d=n
init.globalState.f.bl()
break
case"spawn-worker":break
case"message":if(y.i(z,"port")!=null)y.i(z,"port").D(y.i(z,"msg"))
init.globalState.f.bl()
break
case"close":init.globalState.ch.a7(0,$.$get$eU().i(0,a))
a.terminate()
init.globalState.f.bl()
break
case"log":H.kN(y.i(z,"msg"))
break
case"print":if(init.globalState.x===!0){y=init.globalState.Q
q=P.ah(["command","print","msg",z])
q=new H.bk(!0,P.bJ(null,P.u)).bd(q)
y.toString
self.postMessage(q)}else P.el(y.i(z,"msg"))
break
case"error":throw H.c(y.i(z,"msg"))}},
kN:function(a){var z,y,x,w
if(init.globalState.x===!0){y=init.globalState.Q
x=P.ah(["command","log","msg",a])
x=new H.bk(!0,P.bJ(null,P.u)).bd(x)
y.toString
self.postMessage(x)}else try{self.console.log(a)}catch(w){H.z(w)
z=H.A(w)
y=P.cz(z)
throw H.c(y)}},
kQ:function(a,b,c,d,e,f){var z,y,x,w
z=init.globalState.d
y=z.a
$.fd=$.fd+("_"+y)
$.fe=$.fe+("_"+y)
y=z.e
x=init.globalState.d.a
w=z.f
f.D(["spawned",new H.ce(y,x),w,z.r])
x=new H.kR(a,b,c,d,z)
if(e===!0){z.fu(w,w)
init.globalState.f.a.ay(new H.cd(z,x,"start isolate"))}else x.$0()},
qb:function(a){return new H.cW(!0,[]).bQ(new H.bk(!1,P.bJ(null,P.u)).bd(a))},
tA:{"^":"a:1;a,b",
$0:function(){this.b.$1(this.a.a)}},
tB:{"^":"a:1;a,b",
$0:function(){this.b.$2(this.a.a,null)}},
pH:{"^":"d;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",A:{
pI:function(a){var z=P.ah(["command","print","msg",a])
return new H.bk(!0,P.bJ(null,P.u)).bd(z)}}},
e4:{"^":"d;j:a<,b,c,jV:d<,jd:e<,f,r,x,cH:y<,z,Q,ch,cx,cy,db,dx",
fu:function(a,b){if(!this.f.u(0,a))return
if(this.Q.q(0,b)&&!this.y)this.y=!0
this.cw()},
kk:function(a){var z,y,x
if(!this.y)return
z=this.Q
z.a7(0,a)
if(z.a===0){for(z=this.z;y=z.length,y!==0;){if(0>=y)return H.e(z,-1)
x=z.pop()
init.globalState.f.a.ft(x)}this.y=!1}this.cw()},
j_:function(a,b){var z,y,x
if(this.ch==null)this.ch=[]
for(z=J.n(a),y=0;x=this.ch,y<x.length;y+=2)if(z.u(a,x[y])){z=this.ch
x=y+1
if(x>=z.length)return H.e(z,x)
z[x]=b
return}x.push(a)
this.ch.push(b)},
kh:function(a){var z,y,x
if(this.ch==null)return
for(z=J.n(a),y=0;x=this.ch,y<x.length;y+=2)if(z.u(a,x[y])){z=this.ch
x=y+2
z.toString
if(typeof z!=="object"||z===null||!!z.fixed$length)H.f(new P.P("removeRange"))
P.c5(y,x,z.length,null,null,null)
z.splice(y,x-y)
return}},
hy:function(a,b){if(!this.r.u(0,a))return
this.db=b},
jz:function(a,b,c){var z=J.n(b)
if(!z.u(b,0))z=z.u(b,1)&&!this.cy
else z=!0
if(z){a.D(c)
return}z=this.cx
if(z==null){z=P.b1(null,null)
this.cx=z}z.ay(new H.px(a,c))},
jy:function(a,b){var z
if(!this.r.u(0,a))return
z=J.n(b)
if(!z.u(b,0))z=z.u(b,1)&&!this.cy
else z=!0
if(z){this.ev()
return}z=this.cx
if(z==null){z=P.b1(null,null)
this.cx=z}z.ay(this.gjW())},
jA:function(a,b){var z,y,x
z=this.dx
if(z.a===0){if(this.db===!0&&this===init.globalState.e)return
if(self.console&&self.console.error)self.console.error(a,b)
else{P.el(a)
if(b!=null)P.el(b)}return}y=new Array(2)
y.fixed$length=Array
y[0]=J.h(a)
y[1]=b==null?null:J.h(b)
for(x=new P.ac(z,z.r,null,null,[null]),x.c=z.e;x.t();)x.d.D(y)},
cE:function(a){var z,y,x,w,v,u,t
z=init.globalState.d
init.globalState.d=this
$=this.d
y=null
x=this.cy
this.cy=!0
try{y=a.$0()}catch(u){w=H.z(u)
v=H.A(u)
this.jA(w,v)
if(this.db===!0){this.ev()
if(this===init.globalState.e)throw u}}finally{this.cy=x
init.globalState.d=z
if(z!=null)$=z.gjV()
if(this.cx!=null)for(;t=this.cx,!t.gK(t);)this.cx.dt().$0()}return y},
c7:function(a){return this.b.i(0,a)},
dO:function(a,b){var z=this.b
if(z.a2(a))throw H.c(P.cz("Registry: ports must be registered only once."))
z.n(0,a,b)},
cw:function(){var z=this.b
if(z.gl(z)-this.c.a>0||this.y||!this.x)init.globalState.z.n(0,this.a,this)
else this.ev()},
ev:[function(){var z,y,x,w,v
z=this.cx
if(z!=null)z.b_(0)
for(z=this.b,y=z.gce(),y=y.gZ(y);y.t();)y.gF().i2()
z.b_(0)
this.c.b_(0)
init.globalState.z.a7(0,this.a)
this.dx.b_(0)
if(this.ch!=null){for(x=0;z=this.ch,y=z.length,x<y;x+=2){w=z[x]
v=x+1
if(v>=y)return H.e(z,v)
w.D(z[v])}this.ch=null}},"$0","gjW",0,0,6]},
px:{"^":"a:6;a,b",
$0:function(){this.a.D(this.b)}},
pg:{"^":"d;a,b",
ji:function(){var z=this.a
if(z.b===z.c)return
return z.dt()},
hc:function(){var z,y,x
z=this.ji()
if(z==null){if(init.globalState.e!=null)if(init.globalState.z.a2(init.globalState.e.a))if(init.globalState.r===!0){y=init.globalState.e.b
y=y.gK(y)}else y=!1
else y=!1
else y=!1
if(y)H.f(P.cz("Program exited with open ReceivePorts."))
y=init.globalState
if(y.x===!0){x=y.z
x=x.gK(x)&&y.f.b===0}else x=!1
if(x){y=y.Q
x=P.ah(["command","close"])
x=new H.bk(!0,new P.hc(0,null,null,null,null,null,0,[null,P.u])).bd(x)
y.toString
self.postMessage(x)}return!1}z.kf()
return!0},
fj:function(){if(self.window!=null)new H.ph(this).$0()
else for(;this.hc(););},
bl:function(){var z,y,x,w,v
if(init.globalState.x!==!0)this.fj()
else try{this.fj()}catch(x){z=H.z(x)
y=H.A(x)
w=init.globalState.Q
v=P.ah(["command","error","msg",H.b(z)+"\n"+H.b(y)])
v=new H.bk(!0,P.bJ(null,P.u)).bd(v)
w.toString
self.postMessage(v)}}},
ph:{"^":"a:6;a",
$0:function(){if(!this.a.hc())return
P.om(C.w,this)}},
cd:{"^":"d;a,b,c",
kf:function(){var z=this.a
if(z.y){z.z.push(this)
return}z.cE(this.b)}},
pG:{"^":"d;"},
kP:{"^":"a:1;a,b,c,d,e,f",
$0:function(){H.kQ(this.a,this.b,this.c,this.d,this.e,this.f)}},
kR:{"^":"a:6;a,b,c,d,e",
$0:function(){var z,y
z=this.e
z.x=!0
if(this.d!==!0)this.a.$1(this.c)
else{y=this.a
if(H.au(y,{func:1,args:[,,]}))y.$2(this.b,this.c)
else if(H.au(y,{func:1,args:[,]}))y.$1(this.b)
else y.$0()}z.cw()}},
h6:{"^":"d;"},
ce:{"^":"h6;b,a",
D:function(a){var z,y,x
z=init.globalState.z.i(0,this.a)
if(z==null)return
y=this.b
if(y.gf9())return
x=H.qb(a)
if(z.gjd()===y){y=J.H(x)
switch(y.i(x,0)){case"pause":z.fu(y.i(x,1),y.i(x,2))
break
case"resume":z.kk(y.i(x,1))
break
case"add-ondone":z.j_(y.i(x,1),y.i(x,2))
break
case"remove-ondone":z.kh(y.i(x,1))
break
case"set-errors-fatal":z.hy(y.i(x,1),y.i(x,2))
break
case"ping":z.jz(y.i(x,1),y.i(x,2),y.i(x,3))
break
case"kill":z.jy(y.i(x,1),y.i(x,2))
break
case"getErrors":y=y.i(x,1)
z.dx.q(0,y)
break
case"stopErrors":y=y.i(x,1)
z.dx.a7(0,y)
break}return}init.globalState.f.a.ay(new H.cd(z,new H.pK(this,x),"receive"))},
u:function(a,b){if(b==null)return!1
return b instanceof H.ce&&J.i(this.b,b.b)},
gv:function(a){return this.b.ge0()}},
pK:{"^":"a:1;a,b",
$0:function(){var z=this.a.b
if(!z.gf9())z.hU(this.b)}},
e6:{"^":"h6;b,c,a",
D:function(a){var z,y,x
z=P.ah(["command","message","port",this,"msg",a])
y=new H.bk(!0,P.bJ(null,P.u)).bd(z)
if(init.globalState.x===!0){init.globalState.Q.toString
self.postMessage(y)}else{x=init.globalState.ch.i(0,this.b)
if(x!=null)x.postMessage(y)}},
u:function(a,b){if(b==null)return!1
return b instanceof H.e6&&J.i(this.b,b.b)&&J.i(this.a,b.a)&&J.i(this.c,b.c)},
gv:function(a){var z,y,x
z=this.b
if(typeof z!=="number")return z.eL()
y=this.a
if(typeof y!=="number")return y.eL()
x=this.c
if(typeof x!=="number")return H.v(x)
return(z<<16^y<<8^x)>>>0}},
c6:{"^":"d;e0:a<,b,f9:c<",
i2:function(){this.c=!0
this.b=null},
bg:function(){var z,y
if(this.c)return
this.c=!0
this.b=null
z=init.globalState.d
y=this.a
z.b.a7(0,y)
z.c.a7(0,y)
z.cw()},
hU:function(a){if(this.c)return
this.b.$1(a)},
$ismg:1},
mh:{"^":"aa;a,b",
aA:function(a,b,c,d){var z=this.b
z.toString
return new P.cV(z,[H.m(z,0)]).aA(a,b,c,d)},
ey:function(a,b,c){return this.aA(a,null,b,c)},
bg:[function(){this.a.bg()
this.b.bg()},"$0","gj9",0,0,6],
hM:function(a){var z=new P.pZ(null,0,null,null,null,null,this.gj9(),[null])
this.b=z
this.a.b=z.giS(z)},
$asaa:I.b5},
oi:{"^":"d;a,b,c",
hP:function(a,b){var z,y
if(a===0)z=self.setTimeout==null||init.globalState.x===!0
else z=!1
if(z){this.c=1
z=init.globalState.f
y=init.globalState.d
z.a.ay(new H.cd(y,new H.ok(this,b),"timer"))
this.b=!0}else if(self.setTimeout!=null){++init.globalState.f.b
this.c=self.setTimeout(H.d4(new H.ol(this,b),0),a)}else throw H.c(new P.P("Timer greater than 0."))},
A:{
oj:function(a,b){var z=new H.oi(!0,!1,null)
z.hP(a,b)
return z}}},
ok:{"^":"a:6;a,b",
$0:function(){this.a.c=null
this.b.$0()}},
ol:{"^":"a:6;a,b",
$0:function(){this.a.c=null;--init.globalState.f.b
this.b.$0()}},
b7:{"^":"d;e0:a<",
gv:function(a){var z=this.a
if(typeof z!=="number")return z.kL()
z=C.k.da(z,0)^C.k.bD(z,4294967296)
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
bd:[function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
z=this.b
y=z.i(0,a)
if(y!=null)return["ref",y]
z.n(0,a,z.gl(z))
z=J.n(a)
if(!!z.$iscF)return this.hu(a)
if(!!z.$iskL){x=this.ghr()
z=a.gc5()
z=H.bw(z,x,H.x(z,"y",0),null)
z=P.T(z,!0,H.x(z,"y",0))
w=a.gce()
w=H.bw(w,x,H.x(w,"y",0),null)
return["map",z,P.T(w,!0,H.x(w,"y",0))]}if(!!z.$iseZ)return this.hv(a)
if(!!z.$isaP)this.hf(a)
if(!!z.$ismg)this.cR(a,"RawReceivePorts can't be transmitted:")
if(!!z.$isce)return this.hw(a)
if(!!z.$ise6)return this.hx(a)
if(!!z.$isa){v=a.$static_name
if(v==null)this.cR(a,"Closures can't be transmitted:")
return["function",v]}if(!!z.$isb7)return["capability",a.a]
if(!(a instanceof P.d))this.hf(a)
return["dart",init.classIdExtractor(a),this.ht(init.classFieldsExtractor(a))]},"$1","ghr",2,0,0],
cR:function(a,b){throw H.c(new P.P((b==null?"Can't transmit:":b)+" "+H.b(a)))},
hf:function(a){return this.cR(a,null)},
hu:function(a){var z=this.hs(a)
if(!!a.fixed$length)return["fixed",z]
if(!a.fixed$length)return["extendable",z]
if(!a.immutable$list)return["mutable",z]
if(a.constructor===Array)return["const",z]
this.cR(a,"Can't serialize indexable: ")},
hs:function(a){var z,y,x
z=[]
C.a.sl(z,a.length)
for(y=0;y<a.length;++y){x=this.bd(a[y])
if(y>=z.length)return H.e(z,y)
z[y]=x}return z},
ht:function(a){var z
for(z=0;z<a.length;++z)C.a.n(a,z,this.bd(a[z]))
return a},
hv:function(a){var z,y,x,w
if(!!a.constructor&&a.constructor!==Object)this.cR(a,"Only plain JS Objects are supported:")
z=Object.keys(a)
y=[]
C.a.sl(y,z.length)
for(x=0;x<z.length;++x){w=this.bd(a[z[x]])
if(x>=y.length)return H.e(y,x)
y[x]=w}return["js-object",z,y]},
hx:function(a){if(this.a)return["sendport",a.b,a.a,a.c]
return["raw sendport",a]},
hw:function(a){if(this.a)return["sendport",init.globalState.b,a.a,a.b.ge0()]
return["raw sendport",a]}},
cW:{"^":"d;a,b",
bQ:[function(a){var z,y,x,w,v,u
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
if(typeof a!=="object"||a===null||a.constructor!==Array)throw H.c(P.G("Bad serialized message: "+H.b(a)))
switch(C.a.gen(a)){case"ref":if(1>=a.length)return H.e(a,1)
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
y=H.r(this.cD(x),[null])
y.fixed$length=Array
return y
case"extendable":if(1>=a.length)return H.e(a,1)
x=a[1]
this.b.push(x)
return H.r(this.cD(x),[null])
case"mutable":if(1>=a.length)return H.e(a,1)
x=a[1]
this.b.push(x)
return this.cD(x)
case"const":if(1>=a.length)return H.e(a,1)
x=a[1]
this.b.push(x)
y=H.r(this.cD(x),[null])
y.fixed$length=Array
return y
case"map":return this.jl(a)
case"sendport":return this.jm(a)
case"raw sendport":if(1>=a.length)return H.e(a,1)
x=a[1]
this.b.push(x)
return x
case"js-object":return this.jk(a)
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
this.cD(v)
return init.initializeEmptyInstance(w,u,v)
default:throw H.c("couldn't deserialize: "+H.b(a))}},"$1","gjj",2,0,0],
cD:function(a){var z,y,x
z=J.H(a)
y=0
while(!0){x=z.gl(a)
if(typeof x!=="number")return H.v(x)
if(!(y<x))break
z.n(a,y,this.bQ(z.i(a,y)));++y}return a},
jl:function(a){var z,y,x,w,v,u
z=a.length
if(1>=z)return H.e(a,1)
y=a[1]
if(2>=z)return H.e(a,2)
x=a[2]
w=P.aR()
this.b.push(w)
y=J.ev(y,this.gjj()).cd(0)
for(z=J.H(y),v=J.H(x),u=0;u<z.gl(y);++u){if(u>=y.length)return H.e(y,u)
w.n(0,y[u],this.bQ(v.i(x,u)))}return w},
jm:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.e(a,1)
y=a[1]
if(2>=z)return H.e(a,2)
x=a[2]
if(3>=z)return H.e(a,3)
w=a[3]
if(J.i(y,init.globalState.b)){v=init.globalState.z.i(0,x)
if(v==null)return
u=v.c7(w)
if(u==null)return
t=new H.ce(u,x)}else t=new H.e6(y,w,x)
this.b.push(t)
return t},
jk:function(a){var z,y,x,w,v,u,t
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
jo:function(){throw H.c(new P.P("Cannot modify unmodifiable Map"))},
rW:function(a){return init.types[a]},
b:function(a){var z
if(typeof a==="string")return a
if(typeof a==="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
z=J.h(a)
if(typeof z!=="string")throw H.c(H.Q(a))
return z},
ax:function(a){var z=a.$identityHash
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
if(w.length>1&&C.b.ck(w,0)===36)w=C.b.bB(w,1)
return function(b,c){return b.replace(/[^<,> ]+/g,function(d){return c[d]||d})}(w+H.d6(H.cj(a),0,null),init.mangledGlobalNames)},
cJ:function(a){return"Instance of '"+H.bz(a)+"'"},
ai:function(a){var z
if(a<=65535)return String.fromCharCode(a)
if(a<=1114111){z=a-65536
return String.fromCharCode((55296|C.d.da(z,10))>>>0,56320|z&1023)}throw H.c(P.X(a,0,1114111,null,null))},
bc:function(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
m7:function(a){var z=H.bc(a).getFullYear()+0
return z},
m5:function(a){var z=H.bc(a).getMonth()+1
return z},
m1:function(a){var z=H.bc(a).getDate()+0
return z},
m2:function(a){var z=H.bc(a).getHours()+0
return z},
m4:function(a){var z=H.bc(a).getMinutes()+0
return z},
m6:function(a){var z=H.bc(a).getSeconds()+0
return z},
m3:function(a){var z=H.bc(a).getMilliseconds()+0
return z},
dI:function(a,b){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.c(H.Q(a))
return a[b]},
ff:function(a,b,c){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.c(H.Q(a))
a[b]=c},
v:function(a){throw H.c(H.Q(a))},
e:function(a,b){if(a==null)J.aF(a)
throw H.c(H.aC(a,b))},
aC:function(a,b){var z,y
if(typeof b!=="number"||Math.floor(b)!==b)return new P.aY(!0,b,"index",null)
z=J.aF(a)
if(!(b<0)){if(typeof z!=="number")return H.v(z)
y=b>=z}else y=!0
if(y)return P.cB(b,a,"index",null,z)
return P.c4(b,"index",null)},
Q:function(a){return new P.aY(!0,a,null,null)},
d2:function(a){if(typeof a!=="number")throw H.c(H.Q(a))
return a},
qw:function(a){if(typeof a!=="number"||Math.floor(a)!==a)throw H.c(H.Q(a))
return a},
bo:function(a){if(typeof a!=="string")throw H.c(H.Q(a))
return a},
c:function(a){var z
if(a==null)a=new P.cH()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.i9})
z.name=""}else z.toString=H.i9
return z},
i9:function(){return J.h(this.dartException)},
f:function(a){throw H.c(a)},
ak:function(a){throw H.c(new P.B(a))},
z:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.ug(a)
if(a==null)return
if(a instanceof H.dj)return z.$1(a.a)
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.d.da(x,16)&8191)===10)switch(w){case 438:return z.$1(H.dr(H.b(y)+" (Error "+w+")",null))
case 445:case 5007:v=H.b(y)+" (Error "+w+")"
return z.$1(new H.f7(v,null))}}if(a instanceof TypeError){u=$.$get$fQ()
t=$.$get$fR()
s=$.$get$fS()
r=$.$get$fT()
q=$.$get$fX()
p=$.$get$fY()
o=$.$get$fV()
$.$get$fU()
n=$.$get$h_()
m=$.$get$fZ()
l=u.bk(y)
if(l!=null)return z.$1(H.dr(y,l))
else{l=t.bk(y)
if(l!=null){l.method="call"
return z.$1(H.dr(y,l))}else{l=s.bk(y)
if(l==null){l=r.bk(y)
if(l==null){l=q.bk(y)
if(l==null){l=p.bk(y)
if(l==null){l=o.bk(y)
if(l==null){l=r.bk(y)
if(l==null){l=n.bk(y)
if(l==null){l=m.bk(y)
v=l!=null}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0
if(v)return z.$1(new H.f7(y,l==null?null:l.method))}}return z.$1(new H.oq(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.fB()
y=function(b){try{return String(b)}catch(k){}return null}(a)
return z.$1(new P.aY(!1,null,null,typeof y==="string"?y.replace(/^RangeError:\s*/,""):y))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.fB()
return a},
A:function(a){var z
if(a instanceof H.dj)return a.b
if(a==null)return new H.hf(a,null)
z=a.$cachedTrace
if(z!=null)return z
return a.$cachedTrace=new H.hf(a,null)},
t7:function(a){if(a==null||typeof a!='object')return J.j(a)
else return H.ax(a)},
rO:function(a,b){var z,y,x,w
z=a.length
for(y=0;y<z;y=w){x=y+1
w=x+1
b.n(0,a[y],a[x])}return b},
t_:function(a,b,c,d,e,f,g){switch(c){case 0:return H.cf(b,new H.t0(a))
case 1:return H.cf(b,new H.t1(a,d))
case 2:return H.cf(b,new H.t2(a,d,e))
case 3:return H.cf(b,new H.t3(a,d,e,f))
case 4:return H.cf(b,new H.t4(a,d,e,f,g))}throw H.c(P.cz("Unsupported number of arguments for wrapped closure"))},
d4:function(a,b){var z=a.$identity
if(!!z)return z
z=function(c,d,e,f){return function(g,h,i,j){return f(c,e,d,g,h,i,j)}}(a,b,init.globalState.d,H.t_)
a.$identity=z
return z},
jk:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=z.$callName
if(!!J.n(c).$isK){z.$reflectionInfo=c
x=H.mj(z).r}else x=c
w=d?Object.create(new H.nr().constructor.prototype):Object.create(new H.db(null,null,null,null).constructor.prototype)
w.$initialize=w.constructor
if(d)v=function(){this.$initialize()}
else{u=$.aG
$.aG=J.al(u,1)
v=new Function("a,b,c,d"+u,"this.$initialize(a,b,c,d"+u+")")}w.constructor=v
v.prototype=w
if(!d){t=e.length==1&&!0
s=H.eH(a,z,t)
s.$reflectionInfo=c}else{w.$static_name=f
s=z
t=!1}if(typeof x=="number")r=function(g,h){return function(){return g(h)}}(H.rW,x)
else if(typeof x=="function")if(d)r=x
else{q=t?H.eC:H.dc
r=function(g,h){return function(){return g.apply({$receiver:h(this)},arguments)}}(x,q)}else throw H.c("Error in reflectionInfo.")
w.$S=r
w[y]=s
for(u=b.length,p=1;p<u;++p){o=b[p]
n=o.$callName
if(n!=null){m=d?o:H.eH(a,o,t)
w[n]=m}}w["call*"]=s
w.$R=z.$R
w.$D=z.$D
return v},
jh:function(a,b,c,d){var z=H.dc
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},
eH:function(a,b,c){var z,y,x,w,v,u,t
if(c)return H.jj(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
v=!w||y>=27
if(v)return H.jh(y,!w,z,b)
if(y===0){w=$.aG
$.aG=J.al(w,1)
u="self"+H.b(w)
w="return function(){var "+u+" = this."
v=$.bs
if(v==null){v=H.cs("self")
$.bs=v}return new Function(w+H.b(v)+";return "+u+"."+H.b(z)+"();}")()}t="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w=$.aG
$.aG=J.al(w,1)
t+=H.b(w)
w="return function("+t+"){return this."
v=$.bs
if(v==null){v=H.cs("self")
$.bs=v}return new Function(w+H.b(v)+"."+H.b(z)+"("+t+");}")()},
ji:function(a,b,c,d){var z,y
z=H.dc
y=H.eC
switch(b?-1:a){case 0:throw H.c(new H.mu("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,z,y)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,z,y)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,z,y)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,z,y)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,z,y)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,z,y)
default:return function(e,f,g,h){return function(){h=[g(this)]
Array.prototype.push.apply(h,arguments)
return e.apply(f(this),h)}}(d,z,y)}},
jj:function(a,b){var z,y,x,w,v,u,t,s
z=H.j8()
y=$.eB
if(y==null){y=H.cs("receiver")
$.eB=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.ji(w,!u,x,b)
if(w===1){y="return function(){return this."+H.b(z)+"."+H.b(x)+"(this."+H.b(y)+");"
u=$.aG
$.aG=J.al(u,1)
return new Function(y+H.b(u)+"}")()}s="abcdefghijklmnopqrstuvwxyz".split("").splice(0,w-1).join(",")
y="return function("+s+"){return this."+H.b(z)+"."+H.b(x)+"(this."+H.b(y)+", "+s+");"
u=$.aG
$.aG=J.al(u,1)
return new Function(y+H.b(u)+"}")()},
ee:function(a,b,c,d,e,f){var z
b.fixed$length=Array
if(!!J.n(c).$isK){c.fixed$length=Array
z=c}else z=c
return H.jk(a,b,z,!!d,e,f)},
td:function(a,b){var z=J.H(b)
throw H.c(H.cu(H.bz(a),z.aC(b,3,z.gl(b))))},
a5:function(a,b){var z
if(a!=null)z=(typeof a==="object"||typeof a==="function")&&J.n(a)[b]
else z=!0
if(z)return a
H.td(a,b)},
eh:function(a){var z=J.n(a)
return"$S" in z?z.$S():null},
au:function(a,b){var z
if(a==null)return!1
z=H.eh(a)
return z==null?!1:H.ek(z,b)},
hH:function(a,b){var z,y
if(a==null)return a
if(H.au(a,b))return a
z=H.U(b,null)
y=H.eh(a)
throw H.c(H.cu(y!=null?H.U(y,null):H.bz(a),z))},
ue:function(a){throw H.c(new P.jB(a))},
d8:function(){return(Math.random()*0x100000000>>>0)+(Math.random()*0x100000000>>>0)*4294967296},
b4:function(a){return new H.ar(a,null)},
r:function(a,b){a.$ti=b
return a},
cj:function(a){if(a==null)return
return a.$ti},
hM:function(a,b){return H.er(a["$as"+H.b(b)],H.cj(a))},
x:function(a,b,c){var z=H.hM(a,b)
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
return H.qg(a,b)}return"unknown-reified-type"},
qg:function(a,b){var z,y,x,w,v,u,t,s,r,q,p
z=!!a.v?"void":H.U(a.ret,b)
if("args" in a){y=a.args
for(x=y.length,w="",v="",u=0;u<x;++u,v=", "){t=y[u]
w=w+v+H.U(t,b)}}else{w=""
v=""}if("opt" in a){s=a.opt
w+=v+"["
for(x=s.length,v="",u=0;u<x;++u,v=", "){t=s[u]
w=w+v+H.U(t,b)}w+="]"}if("named" in a){r=a.named
w+=v+"{"
for(x=H.rN(r),q=x.length,v="",u=0;u<q;++u,v=", "){p=x[u]
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
if(a instanceof H.a){z=H.eh(a)
if(z!=null)return H.U(z,null)}y=J.n(a).constructor.builtin$cls
if(a==null)return y
return y+H.d6(a.$ti,0,null)},
er:function(a,b){if(a==null)return b
a=a.apply(null,b)
if(a==null)return
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a
if(typeof a=="function")return a.apply(null,b)
return b},
aM:function(a,b,c,d){var z,y
if(a==null)return!1
z=H.cj(a)
y=J.n(a)
if(y[b]==null)return!1
return H.hx(H.er(y[d],z),c)},
aE:function(a,b,c,d){if(a==null)return a
if(H.aM(a,b,c,d))return a
throw H.c(H.cu(H.bz(a),function(e,f){return e.replace(/[^<,> ]+/g,function(g){return f[g]||g})}(b.substring(3)+H.d6(c,0,null),init.mangledGlobalNames)))},
hx:function(a,b){var z,y
if(a==null||b==null)return!0
z=a.length
for(y=0;y<z;++y)if(!H.ae(a[y],b[y]))return!1
return!0},
b3:function(a,b,c){return a.apply(b,H.hM(b,c))},
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
return H.ek(x.apply(a,null),b)}return H.ae(y,b)},
i6:function(a,b){if(a!=null&&!H.d3(a,b))throw H.c(H.cu(H.bz(a),H.U(b,null)))
return a},
ae:function(a,b){var z,y,x,w,v,u
if(a===b)return!0
if(a==null||b==null)return!0
if(a.builtin$cls==="ao")return!0
if('func' in b)return H.ek(a,b)
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
return H.hx(H.er(u,z),x)},
hw:function(a,b,c){var z,y,x,w,v
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
qq:function(a,b){var z,y,x,w,v,u
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
ek:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
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
if(t===s){if(!H.hw(x,w,!1))return!1
if(!H.hw(v,u,!0))return!1}else{for(p=0;p<t;++p){o=x[p]
n=w[p]
if(!(H.ae(o,n)||H.ae(n,o)))return!1}for(m=p,l=0;m<s;++l,++m){o=v[l]
n=w[m]
if(!(H.ae(o,n)||H.ae(n,o)))return!1}for(m=0;m<q;++l,++m){o=v[l]
n=u[m]
if(!(H.ae(o,n)||H.ae(n,o)))return!1}}return H.qq(a.named,b.named)},
u9:function(a,b,c){var z
if(typeof b==="string")return a.indexOf(b,c)>=0
else{z=J.n(b)
if(!!z.$isdp){z=C.b.bB(a,c)
return b.b.test(z)}else{z=z.eh(b,C.b.bB(a,c))
return!z.gK(z)}}},
ub:function(a,b,c,d){var z,y,x
z=b.f3(a,d)
if(z==null)return a
y=z.b
x=y.index
return H.eq(a,x,x+y[0].length,c)},
o:function(a,b,c){var z,y,x
H.bo(c)
if(b==="")if(a==="")return c
else{z=a.length
y=H.b(c)
for(x=0;x<z;++x)y=y+a[x]+H.b(c)
return y.charCodeAt(0)==0?y:y}else return a.replace(new RegExp(b.replace(/[[\]{}()*+?.\\^$|]/g,"\\$&"),'g'),c.replace(/\$/g,"$$$$"))},
uQ:[function(a){return a},"$1","hj",2,0,22],
ua:function(a,b,c,d){var z,y,x,w,v,u
z=J.n(b)
if(!z.$isdF)throw H.c(P.cp(b,"pattern","is not a Pattern"))
for(z=z.eh(b,a),z=new H.h4(z.a,z.b,z.c,null),y=0,x="";z.t();){w=z.d
v=w.b
u=v.index
x=x+H.b(H.hj().$1(C.b.aC(a,y,u)))+H.b(c.$1(w))
y=u+v[0].length}z=x+H.b(H.hj().$1(C.b.bB(a,y)))
return z.charCodeAt(0)==0?z:z},
i5:function(a,b,c,d){var z,y,x,w,v,u
if(typeof b==="string"){z=a.indexOf(b,d)
if(z<0)return a
return H.eq(a,z,z+b.length,c)}y=J.n(b)
if(!!y.$isdp)return d===0?a.replace(b.b,c.replace(/\$/g,"$$$$")):H.ub(a,b,c,d)
if(b==null)H.f(H.Q(b))
y=y.dc(b,a,d)
x=y.gZ(y)
if(!x.t())return a
w=x.gF()
y=w.geP()
v=w.gfG()
H.bo(c)
u=P.c5(y,v,a.length,null,null,null)
H.qw(u)
return H.eq(a,y,u,c)},
eq:function(a,b,c,d){var z,y
z=a.substring(0,b)
y=a.substring(c)
return z+H.b(d)+y},
jn:{"^":"d;$ti",
gK:function(a){return this.gl(this)===0},
gak:function(a){return this.gl(this)!==0},
k:function(a){return P.dy(this)},
n:function(a,b,c){return H.jo()},
$isD:1},
jp:{"^":"jn;a,b,c,$ti",
gl:function(a){return this.a},
a2:function(a){if(typeof a!=="string")return!1
if("__proto__"===a)return!1
return this.b.hasOwnProperty(a)},
i:function(a,b){if(!this.a2(b))return
return this.f4(b)},
f4:function(a){return this.b[a]},
L:function(a,b){var z,y,x,w
z=this.c
for(y=z.length,x=0;x<y;++x){w=z[x]
b.$2(w,this.f4(w))}}},
mi:{"^":"d;a,b,c,d,e,f,r,x",A:{
mj:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z.fixed$length=Array
z=z
y=z[0]
x=z[1]
return new H.mi(a,z,(y&1)===1,y>>1,x>>1,(x&1)===1,z[2],null)}}},
on:{"^":"d;a,b,c,d,e,f",
bk:function(a){var z,y,x
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
return new H.on(a.replace(new RegExp('\\\\\\$arguments\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$argumentsExpr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$expr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$method\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$receiver\\\\\\$','g'),'((?:x|[^x])*)'),y,x,w,v,u)},
cT:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},
fW:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},
f7:{"^":"Z;a,b",
k:function(a){var z=this.b
if(z==null)return"NullError: "+H.b(this.a)
return"NullError: method not found: '"+H.b(z)+"' on null"}},
kZ:{"^":"Z;a,b,c",
k:function(a){var z,y
z=this.b
if(z==null)return"NoSuchMethodError: "+H.b(this.a)
y=this.c
if(y==null)return"NoSuchMethodError: method not found: '"+z+"' ("+H.b(this.a)+")"
return"NoSuchMethodError: method not found: '"+z+"' on '"+y+"' ("+H.b(this.a)+")"},
A:{
dr:function(a,b){var z,y
z=b==null
y=z?null:b.method
return new H.kZ(a,y,z?null:b.receiver)}}},
oq:{"^":"Z;a",
k:function(a){var z=this.a
return z.length===0?"Error":"Error: "+z}},
dj:{"^":"d;a,be:b<"},
ug:{"^":"a:0;a",
$1:function(a){if(!!J.n(a).$isZ)if(a.$thrownJsError==null)a.$thrownJsError=this.a
return a}},
hf:{"^":"d;a,b",
k:function(a){var z,y
z=this.b
if(z!=null)return z
z=this.a
y=z!==null&&typeof z==="object"?z.stack:null
z=y==null?"":y
this.b=z
return z}},
t0:{"^":"a:1;a",
$0:function(){return this.a.$0()}},
t1:{"^":"a:1;a,b",
$0:function(){return this.a.$1(this.b)}},
t2:{"^":"a:1;a,b,c",
$0:function(){return this.a.$2(this.b,this.c)}},
t3:{"^":"a:1;a,b,c,d",
$0:function(){return this.a.$3(this.b,this.c,this.d)}},
t4:{"^":"a:1;a,b,c,d,e",
$0:function(){return this.a.$4(this.b,this.c,this.d,this.e)}},
a:{"^":"d;",
k:function(a){return"Closure '"+H.bz(this).trim()+"'"},
ghn:function(){return this},
$isbu:1,
ghn:function(){return this}},
fM:{"^":"a;"},
nr:{"^":"fM;",
k:function(a){var z=this.$static_name
if(z==null)return"Closure of unknown static method"
return"Closure '"+z+"'"}},
db:{"^":"fM;a,b,c,d",
u:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof H.db))return!1
return this.a===b.a&&this.b===b.b&&this.c===b.c},
gv:function(a){var z,y
z=this.c
if(z==null)y=H.ax(this.a)
else y=typeof z!=="object"?J.j(z):H.ax(z)
z=H.ax(this.b)
if(typeof y!=="number")return y.kM()
return(y^z)>>>0},
k:function(a){var z=this.c
if(z==null)z=this.a
return"Closure '"+H.b(this.d)+"' of "+H.cJ(z)},
A:{
dc:function(a){return a.a},
eC:function(a){return a.c},
j8:function(){var z=$.bs
if(z==null){z=H.cs("self")
$.bs=z}return z},
cs:function(a){var z,y,x,w,v
z=new H.db("self","target","receiver","name")
y=Object.getOwnPropertyNames(z)
y.fixed$length=Array
x=y
for(y=x.length,w=0;w<y;++w){v=x[w]
if(z[v]===a)return v}}}},
jd:{"^":"Z;a",
k:function(a){return this.a},
A:{
cu:function(a,b){return new H.jd("CastError: Casting value of type '"+a+"' to incompatible type '"+b+"'")}}},
mu:{"^":"Z;a",
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
return b instanceof H.ar&&J.i(this.a,b.a)}},
O:{"^":"d;a,b,c,d,e,f,r,$ti",
gl:function(a){return this.a},
gK:function(a){return this.a===0},
gak:function(a){return!this.gK(this)},
gc5:function(){return new H.lb(this,[H.m(this,0)])},
gce:function(){return H.bw(this.gc5(),new H.kY(this),H.m(this,0),H.m(this,1))},
a2:function(a){var z,y
if(typeof a==="string"){z=this.b
if(z==null)return!1
return this.f_(z,a)}else if(typeof a==="number"&&(a&0x3ffffff)===a){y=this.c
if(y==null)return!1
return this.f_(y,a)}else return this.jL(a)},
jL:function(a){var z=this.d
if(z==null)return!1
return this.cG(this.d6(z,this.cF(a)),a)>=0},
i:function(a,b){var z,y,x
if(typeof b==="string"){z=this.b
if(z==null)return
y=this.cn(z,b)
return y==null?null:y.gbS()}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null)return
y=this.cn(x,b)
return y==null?null:y.gbS()}else return this.jM(b)},
jM:function(a){var z,y,x
z=this.d
if(z==null)return
y=this.d6(z,this.cF(a))
x=this.cG(y,a)
if(x<0)return
return y[x].gbS()},
n:function(a,b,c){var z,y
if(typeof b==="string"){z=this.b
if(z==null){z=this.e2()
this.b=z}this.eU(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=this.e2()
this.c=y}this.eU(y,b,c)}else this.jO(b,c)},
jO:function(a,b){var z,y,x,w
z=this.d
if(z==null){z=this.e2()
this.d=z}y=this.cF(a)
x=this.d6(z,y)
if(x==null)this.ed(z,y,[this.e3(a,b)])
else{w=this.cG(x,a)
if(w>=0)x[w].sbS(b)
else x.push(this.e3(a,b))}},
kg:function(a,b){var z
if(this.a2(a))return this.i(0,a)
z=b.$0()
this.n(0,a,z)
return z},
a7:function(a,b){if(typeof b==="string")return this.fi(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.fi(this.c,b)
else return this.jN(b)},
jN:function(a){var z,y,x,w
z=this.d
if(z==null)return
y=this.d6(z,this.cF(a))
x=this.cG(y,a)
if(x<0)return
w=y.splice(x,1)[0]
this.fl(w)
return w.gbS()},
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
eU:function(a,b,c){var z=this.cn(a,b)
if(z==null)this.ed(a,b,this.e3(b,c))
else z.sbS(c)},
fi:function(a,b){var z
if(a==null)return
z=this.cn(a,b)
if(z==null)return
this.fl(z)
this.f0(a,b)
return z.gbS()},
e3:function(a,b){var z,y
z=new H.la(a,b,null,null,[null,null])
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.d=y
y.c=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
fl:function(a){var z,y
z=a.giw()
y=a.c
if(z==null)this.e=y
else z.c=y
if(y==null)this.f=z
else y.d=z;--this.a
this.r=this.r+1&67108863},
cF:function(a){return J.j(a)&0x3ffffff},
cG:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.i(a[y].gfN(),b))return y
return-1},
k:function(a){return P.dy(this)},
cn:function(a,b){return a[b]},
d6:function(a,b){return a[b]},
ed:function(a,b,c){a[b]=c},
f0:function(a,b){delete a[b]},
f_:function(a,b){return this.cn(a,b)!=null},
e2:function(){var z=Object.create(null)
this.ed(z,"<non-identifier-key>",z)
this.f0(z,"<non-identifier-key>")
return z},
$iskL:1,
$isD:1,
A:{
f1:function(a,b){return new H.O(0,null,null,null,null,null,0,[a,b])}}},
kY:{"^":"a:0;a",
$1:function(a){return this.a.i(0,a)}},
la:{"^":"d;fN:a<,bS:b@,c,iw:d<,$ti"},
lb:{"^":"V;a,$ti",
gl:function(a){return this.a.a},
gK:function(a){return this.a.a===0},
gZ:function(a){var z,y
z=this.a
y=new H.lc(z,z.r,null,null,this.$ti)
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
lc:{"^":"d;a,b,c,d,$ti",
gF:function(){return this.d},
t:function(){var z=this.a
if(this.b!==z.r)throw H.c(new P.B(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.c
return!0}}}},
dp:{"^":"d;a,b,c,d",
k:function(a){return"RegExp/"+this.a+"/"},
gis:function(){var z=this.c
if(z!=null)return z
z=this.b
z=H.dq(this.a,z.multiline,!z.ignoreCase,!0)
this.c=z
return z},
gir:function(){var z=this.d
if(z!=null)return z
z=this.b
z=H.dq(this.a+"|()",z.multiline,!z.ignoreCase,!0)
this.d=z
return z},
dc:function(a,b,c){if(c>b.length)throw H.c(P.X(c,0,b.length,null,null))
return new H.oX(this,b,c)},
eh:function(a,b){return this.dc(a,b,0)},
f3:function(a,b){var z,y
z=this.gis()
z.lastIndex=b
y=z.exec(a)
if(y==null)return
return new H.he(this,y)},
i9:function(a,b){var z,y
z=this.gir()
z.lastIndex=b
y=z.exec(a)
if(y==null)return
if(0>=y.length)return H.e(y,-1)
if(y.pop()!=null)return
return new H.he(this,y)},
fT:function(a,b,c){if(c>b.length)throw H.c(P.X(c,0,b.length,null,null))
return this.i9(b,c)},
$isdF:1,
A:{
dq:function(a,b,c,d){var z,y,x,w
z=b?"m":""
y=c?"":"i"
x=d?"g":""
w=function(e,f){try{return new RegExp(e,f)}catch(v){return v}}(a,z+y+x)
if(w instanceof RegExp)return w
throw H.c(new P.eS("Illegal RegExp pattern ("+String(w)+")",a,null))}}},
he:{"^":"d;a,b",
geP:function(){return this.b.index},
gfG:function(){var z=this.b
return z.index+z[0].length},
i:function(a,b){var z=this.b
if(b>>>0!==b||b>=z.length)return H.e(z,b)
return z[b]},
$isbb:1},
oX:{"^":"cD;a,b,c",
gZ:function(a){return new H.h4(this.a,this.b,this.c,null)},
$ascD:function(){return[P.bb]},
$asy:function(){return[P.bb]}},
h4:{"^":"d;a,b,c,d",
gF:function(){return this.d},
t:function(){var z,y,x,w
z=this.b
if(z==null)return!1
y=this.c
if(y<=z.length){x=this.a.f3(z,y)
if(x!=null){this.d=x
z=x.b
y=z.index
w=y+z[0].length
this.c=y===w?w+1:w
return!0}}this.d=null
this.b=null
return!1}},
fH:{"^":"d;eP:a<,b,c",
gfG:function(){return this.a+this.c.length},
i:function(a,b){if(b!==0)H.f(P.c4(b,null,null))
return this.c},
$isbb:1},
pV:{"^":"y;a,b,c",
gZ:function(a){return new H.pW(this.a,this.b,this.c,null)},
$asy:function(){return[P.bb]}},
pW:{"^":"d;a,b,c,d",
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
this.d=new H.fH(u,w,y)
this.c=t===this.c?t+1:t
return!0},
gF:function(){return this.d}}}],["","",,H,{"^":"",
rN:function(a){var z=H.r(a?Object.keys(a):[],[null])
z.fixed$length=Array
return z}}],["","",,H,{"^":"",
tc:function(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)}}],["","",,P,{"^":"",
oY:function(){var z,y,x
z={}
if(self.scheduleImmediate!=null)return P.qr()
if(self.MutationObserver!=null&&self.document!=null){y=self.document.createElement("div")
x=self.document.createElement("span")
z.a=null
new self.MutationObserver(H.d4(new P.p_(z),1)).observe(y,{childList:true})
return new P.oZ(z,y,x)}else if(self.setImmediate!=null)return P.qs()
return P.qt()},
uK:[function(a){++init.globalState.f.b
self.scheduleImmediate(H.d4(new P.p0(a),0))},"$1","qr",2,0,12],
uL:[function(a){++init.globalState.f.b
self.setImmediate(H.d4(new P.p1(a),0))},"$1","qs",2,0,12],
uM:[function(a){P.dV(C.w,a)},"$1","qt",2,0,12],
aB:function(a,b){P.e7(null,a)
return b.gfK()},
as:function(a,b){P.e7(a,b)},
aA:function(a,b){b.bP(a)},
az:function(a,b){b.ek(H.z(a),H.A(a))},
e7:function(a,b){var z,y,x,w
z=new P.q5(b)
y=new P.q6(b)
x=J.n(a)
if(!!x.$isC)a.ee(z,y)
else if(!!x.$isN)a.eE(z,y)
else{w=new P.C(0,$.p,null,[null])
w.a=4
w.c=a
w.ee(z,null)}},
at:function(a){var z=function(b,c){return function(d,e){while(true)try{b(d,e)
break}catch(y){e=y
d=c}}}(a,1)
$.p.toString
return new P.qp(z)},
cZ:function(a,b,c){var z,y,x
if(b===0){if(c.ger())c.c.ej()
else c.a.bg()
return}else if(b===1){if(c.ger())c.c.ek(H.z(a),H.A(a))
else{z=H.z(a)
y=H.A(a)
c.a.eg(z,y)
c.a.bg()}return}if(a instanceof P.bH){if(c.ger()){b.$2(2,null)
return}z=a.b
if(z===0){z=a.a
J.aO(c.a,z)
P.ck(new P.q3(b,c))
return}else if(z===1){x=a.a
c.a.j4(x,!1).bV(new P.q4(b,c))
return}}P.e7(a,b)},
qo:function(a){return a.gdL()},
eb:function(a,b){if(H.au(a,{func:1,args:[P.ao,P.ao]})){b.toString
return a}else{b.toString
return a}},
aw:function(a){return new P.pX(new P.C(0,$.p,null,[a]),[a])},
qe:function(a,b,c){$.p.toString
a.b3(b,c)},
qi:function(){var z,y
for(;z=$.bl,z!=null;){$.bL=null
y=z.gc8()
$.bl=y
if(y==null)$.bK=null
z.gj6().$0()}},
uP:[function(){$.e8=!0
try{P.qi()}finally{$.bL=null
$.e8=!1
if($.bl!=null)$.$get$dZ().$1(P.hy())}},"$0","hy",0,0,6],
hs:function(a){var z=new P.h5(a,null)
if($.bl==null){$.bK=z
$.bl=z
if(!$.e8)$.$get$dZ().$1(P.hy())}else{$.bK.b=z
$.bK=z}},
qn:function(a){var z,y,x
z=$.bl
if(z==null){P.hs(a)
$.bL=$.bK
return}y=new P.h5(a,null)
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
P.bn(null,null,z,z.ei(a,!0))},
uH:function(a,b){return new P.pU(null,a,!1,[b])},
ec:function(a){var z,y,x,w
if(a==null)return
try{a.$0()}catch(x){z=H.z(x)
y=H.A(x)
w=$.p
w.toString
P.bm(null,null,w,z,y)}},
qj:[function(a,b){var z=$.p
z.toString
P.bm(null,null,z,a,b)},function(a){return P.qj(a,null)},"$2","$1","qv",2,2,17,0],
uO:[function(){},"$0","qu",0,0,6],
hr:function(a,b,c){var z,y,x,w,v,u,t
try{b.$1(a.$0())}catch(u){z=H.z(u)
y=H.A(u)
$.p.toString
x=null
if(x==null)c.$2(z,y)
else{t=x.gbh()
w=t
v=x.gbe()
c.$2(w,v)}}},
q7:function(a,b,c,d){var z=a.c4()
if(!!J.n(z).$isN&&z!==$.$get$b9())z.bX(new P.q9(b,c,d))
else b.b3(c,d)},
hg:function(a,b){return new P.q8(a,b)},
hh:function(a,b,c){var z=a.c4()
if(!!J.n(z).$isN&&z!==$.$get$b9())z.bX(new P.qa(b,c))
else b.b2(c)},
q2:function(a,b,c){$.p.toString
a.c2(b,c)},
om:function(a,b){var z=$.p
if(z===C.f){z.toString
return P.dV(a,b)}return P.dV(a,z.ei(b,!0))},
dV:function(a,b){var z=C.d.bD(a.a,1000)
return H.oj(z<0?0:z,b)},
oA:function(){return $.p},
bm:function(a,b,c,d,e){var z={}
z.a=d
P.qn(new P.ql(z,e))},
ho:function(a,b,c,d){var z,y
y=$.p
if(y===c)return d.$0()
$.p=c
z=y
try{y=d.$0()
return y}finally{$.p=z}},
hq:function(a,b,c,d,e){var z,y
y=$.p
if(y===c)return d.$1(e)
$.p=c
z=y
try{y=d.$1(e)
return y}finally{$.p=z}},
hp:function(a,b,c,d,e,f){var z,y
y=$.p
if(y===c)return d.$2(e,f)
$.p=c
z=y
try{y=d.$2(e,f)
return y}finally{$.p=z}},
bn:function(a,b,c,d){var z=C.f!==c
if(z)d=c.ei(d,!(!z||!1))
P.hs(d)},
p_:{"^":"a:0;a",
$1:function(a){var z,y;--init.globalState.f.b
z=this.a
y=z.a
z.a=null
y.$0()}},
oZ:{"^":"a:48;a,b,c",
$1:function(a){var z,y;++init.globalState.f.b
this.a.a=a
z=this.b
y=this.c
z.firstChild?z.removeChild(y):z.appendChild(y)}},
p0:{"^":"a:1;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
p1:{"^":"a:1;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
q5:{"^":"a:0;a",
$1:function(a){return this.a.$2(0,a)}},
q6:{"^":"a:16;a",
$2:function(a,b){this.a.$2(1,new H.dj(a,b))}},
qp:{"^":"a:30;a",
$2:function(a,b){this.a(a,b)}},
q3:{"^":"a:1;a,b",
$0:function(){var z=this.b
if(z.a.gcH()){z.b=!0
return}this.a.$2(null,0)}},
q4:{"^":"a:0;a,b",
$1:function(a){var z=this.b.c!=null?2:0
this.a.$2(z,null)}},
p2:{"^":"d;a,b,c",
gdL:function(){return this.a.gdL()},
gcH:function(){return this.a.gcH()},
ger:function(){return this.c!=null},
q:function(a,b){return J.aO(this.a,b)},
eg:function(a,b){return this.a.eg(a,b)},
bg:function(){return this.a.bg()},
hR:function(a){var z=new P.p5(a)
this.a=new P.pa(null,0,null,new P.p7(z),null,new P.p8(this,z),new P.p9(this,a),[null])},
A:{
p3:function(a){var z=new P.p2(null,!1,null)
z.hR(a)
return z}}},
p5:{"^":"a:1;a",
$0:function(){P.ck(new P.p6(this.a))}},
p6:{"^":"a:1;a",
$0:function(){this.a.$2(0,null)}},
p7:{"^":"a:1;a",
$0:function(){this.a.$0()}},
p8:{"^":"a:1;a,b",
$0:function(){var z=this.a
if(z.b===!0){z.b=!1
this.b.$0()}}},
p9:{"^":"a:1;a,b",
$0:function(){var z=this.a
if(!z.a.gjT()){z.c=new P.cb(new P.C(0,$.p,null,[null]),[null])
if(z.b===!0){z.b=!1
P.ck(new P.p4(this.b))}return z.c.gfK()}}},
p4:{"^":"a:1;a",
$0:function(){this.a.$2(2,null)}},
bH:{"^":"d;ac:a<,b",
k:function(a){return"IterationMarker("+this.b+", "+H.b(this.a)+")"},
A:{
bI:function(a){return new P.bH(a,1)},
aJ:function(){return C.a8},
ha:function(a){return new P.bH(a,0)},
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
pY:{"^":"cD;a",
gZ:function(a){return new P.b2(this.a(),null,null,null)},
$ascD:I.b5,
$asy:I.b5,
A:{
aL:function(a){return new P.pY(a)}}},
N:{"^":"d;$ti"},
h7:{"^":"d;fK:a<,$ti",
ek:function(a,b){if(a==null)a=new P.cH()
if(this.a.a!==0)throw H.c(new P.E("Future already completed"))
$.p.toString
this.b3(a,b)},
dg:function(a){return this.ek(a,null)}},
cb:{"^":"h7;a,$ti",
bP:function(a){var z=this.a
if(z.a!==0)throw H.c(new P.E("Future already completed"))
z.bs(a)},
ej:function(){return this.bP(null)},
b3:function(a,b){this.a.eW(a,b)}},
pX:{"^":"h7;a,$ti",
bP:function(a){var z=this.a
if(z.a!==0)throw H.c(new P.E("Future already completed"))
z.b2(a)},
ej:function(){return this.bP(null)},
b3:function(a,b){this.a.b3(a,b)}},
e3:{"^":"d;e5:a<,b,c,d,e,$ti",
giN:function(){return this.b.b},
gfM:function(){return(this.c&1)!==0},
gjD:function(){return(this.c&2)!==0},
gfL:function(){return this.c===8},
jB:function(a){return this.b.b.eD(this.d,a)},
k5:function(a){if(this.c!==6)return!0
return this.b.b.eD(this.d,a.gbh())},
jx:function(a){var z,y
z=this.e
y=this.b.b
if(H.au(z,{func:1,args:[,,]}))return y.ku(z,a.gbh(),a.gbe())
else return y.eD(z,a.gbh())},
jC:function(){return this.b.b.ha(this.d)}},
C:{"^":"d;cu:a<,b,iB:c<,$ti",
gil:function(){return this.a===2},
ge1:function(){return this.a>=4},
eE:function(a,b){var z=$.p
if(z!==C.f){z.toString
if(b!=null)b=P.eb(b,z)}return this.ee(a,b)},
bV:function(a){return this.eE(a,null)},
ee:function(a,b){var z,y
z=new P.C(0,$.p,null,[null])
y=b==null?1:3
this.d1(new P.e3(null,z,y,a,b,[H.m(this,0),null]))
return z},
bX:function(a){var z,y
z=$.p
y=new P.C(0,z,null,this.$ti)
if(z!==C.f)z.toString
z=H.m(this,0)
this.d1(new P.e3(null,y,8,a,null,[z,z]))
return y},
d1:function(a){var z,y
z=this.a
if(z<=1){a.a=this.c
this.c=a}else{if(z===2){y=this.c
if(!y.ge1()){y.d1(a)
return}this.a=y.a
this.c=y.c}z=this.b
z.toString
P.bn(null,null,z,new P.pk(this,a))}},
fe:function(a){var z,y,x,w,v
z={}
z.a=a
if(a==null)return
y=this.a
if(y<=1){x=this.c
this.c=a
if(x!=null){for(w=a;w.ge5()!=null;)w=w.a
w.a=x}}else{if(y===2){v=this.c
if(!v.ge1()){v.fe(a)
return}this.a=v.a
this.c=v.c}z.a=this.d8(a)
y=this.b
y.toString
P.bn(null,null,y,new P.pr(z,this))}},
d7:function(){var z=this.c
this.c=null
return this.d8(z)},
d8:function(a){var z,y,x
for(z=a,y=null;z!=null;y=z,z=x){x=z.ge5()
z.a=y}return y},
b2:function(a){var z,y
z=this.$ti
if(H.aM(a,"$isN",z,"$asN"))if(H.aM(a,"$isC",z,null))P.cX(a,this)
else P.h9(a,this)
else{y=this.d7()
this.a=4
this.c=a
P.bj(this,y)}},
b3:[function(a,b){var z=this.d7()
this.a=8
this.c=new P.cq(a,b)
P.bj(this,z)},function(a){return this.b3(a,null)},"kN","$2","$1","gbK",2,2,17,0],
bs:function(a){var z
if(H.aM(a,"$isN",this.$ti,"$asN")){this.i_(a)
return}this.a=1
z=this.b
z.toString
P.bn(null,null,z,new P.pm(this,a))},
i_:function(a){var z
if(H.aM(a,"$isC",this.$ti,null)){if(a.a===8){this.a=1
z=this.b
z.toString
P.bn(null,null,z,new P.pq(this,a))}else P.cX(a,this)
return}P.h9(a,this)},
eW:function(a,b){var z
this.a=1
z=this.b
z.toString
P.bn(null,null,z,new P.pl(this,a,b))},
hT:function(a,b){this.a=4
this.c=a},
$isN:1,
A:{
h9:function(a,b){var z,y,x
b.a=1
try{a.eE(new P.pn(b),new P.po(b))}catch(x){z=H.z(x)
y=H.A(x)
P.ck(new P.pp(b,z,y))}},
cX:function(a,b){var z,y,x
for(;a.gil();)a=a.c
z=a.ge1()
y=b.c
if(z){b.c=null
x=b.d8(y)
b.a=a.a
b.c=a.c
P.bj(b,x)}else{b.a=2
b.c=a
a.fe(y)}},
bj:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z={}
z.a=a
for(y=a;!0;){x={}
w=y.a===8
if(b==null){if(w){v=y.c
y=y.b
u=v.gbh()
t=v.gbe()
y.toString
P.bm(null,null,y,u,t)}return}for(;b.ge5()!=null;b=s){s=b.a
b.a=null
P.bj(z.a,b)}r=z.a.c
x.a=w
x.b=r
y=!w
if(!y||b.gfM()||b.gfL()){q=b.giN()
if(w){u=z.a.b
u.toString
u=u==null?q==null:u===q
if(!u)q.toString
else u=!0
u=!u}else u=!1
if(u){y=z.a
v=y.c
y=y.b
u=v.gbh()
t=v.gbe()
y.toString
P.bm(null,null,y,u,t)
return}p=$.p
if(p==null?q!=null:p!==q)$.p=q
else p=null
if(b.gfL())new P.pu(z,x,w,b).$0()
else if(y){if(b.gfM())new P.pt(x,b,r).$0()}else if(b.gjD())new P.ps(z,x,b).$0()
if(p!=null)$.p=p
y=x.b
if(!!J.n(y).$isN){o=b.b
if(y.a>=4){n=o.c
o.c=null
b=o.d8(n)
o.a=y.a
o.c=y.c
z.a=y
continue}else P.cX(y,o)
return}}o=b.b
b=o.d7()
y=x.a
u=x.b
if(!y){o.a=4
o.c=u}else{o.a=8
o.c=u}z.a=o
y=o}}}},
pk:{"^":"a:1;a,b",
$0:function(){P.bj(this.a,this.b)}},
pr:{"^":"a:1;a,b",
$0:function(){P.bj(this.b,this.a.a)}},
pn:{"^":"a:0;a",
$1:function(a){var z=this.a
z.a=0
z.b2(a)}},
po:{"^":"a:49;a",
$2:function(a,b){this.a.b3(a,b)},
$1:function(a){return this.$2(a,null)}},
pp:{"^":"a:1;a,b,c",
$0:function(){this.a.b3(this.b,this.c)}},
pm:{"^":"a:1;a,b",
$0:function(){var z,y
z=this.a
y=z.d7()
z.a=4
z.c=this.b
P.bj(z,y)}},
pq:{"^":"a:1;a,b",
$0:function(){P.cX(this.b,this.a)}},
pl:{"^":"a:1;a,b,c",
$0:function(){this.a.b3(this.b,this.c)}},
pu:{"^":"a:6;a,b,c,d",
$0:function(){var z,y,x,w,v,u,t
z=null
try{z=this.d.jC()}catch(w){y=H.z(w)
x=H.A(w)
if(this.c){v=this.a.a.c.gbh()
u=y
u=v==null?u==null:v===u
v=u}else v=!1
u=this.b
if(v)u.b=this.a.a.c
else u.b=new P.cq(y,x)
u.a=!0
return}if(!!J.n(z).$isN){if(z instanceof P.C&&z.gcu()>=4){if(z.gcu()===8){v=this.b
v.b=z.giB()
v.a=!0}return}t=this.a.a
v=this.b
v.b=z.bV(new P.pv(t))
v.a=!1}}},
pv:{"^":"a:0;a",
$1:function(a){return this.a}},
pt:{"^":"a:6;a,b,c",
$0:function(){var z,y,x,w
try{this.a.b=this.b.jB(this.c)}catch(x){z=H.z(x)
y=H.A(x)
w=this.a
w.b=new P.cq(z,y)
w.a=!0}}},
ps:{"^":"a:6;a,b,c",
$0:function(){var z,y,x,w,v,u,t,s
try{z=this.a.a.c
w=this.c
if(w.k5(z)===!0&&w.e!=null){v=this.b
v.b=w.jx(z)
v.a=!1}}catch(u){y=H.z(u)
x=H.A(u)
w=this.a
v=w.a.c.gbh()
t=y
s=this.b
if(v==null?t==null:v===t)s.b=w.a.c
else s.b=new P.cq(y,x)
s.a=!0}}},
h5:{"^":"d;j6:a<,c8:b@"},
aa:{"^":"d;$ti",
aP:function(a,b){return new P.pJ(b,this,[H.x(this,"aa",0),null])},
a1:function(a,b){var z,y
z={}
y=new P.C(0,$.p,null,[P.Y])
z.a=null
z.a=this.aA(new P.nC(z,this,b,y),!0,new P.nD(y),y.gbK())
return y},
L:function(a,b){var z,y
z={}
y=new P.C(0,$.p,null,[null])
z.a=null
z.a=this.aA(new P.nG(z,this,b,y),!0,new P.nH(y),y.gbK())
return y},
gl:function(a){var z,y
z={}
y=new P.C(0,$.p,null,[P.u])
z.a=0
this.aA(new P.nM(z),!0,new P.nN(z,y),y.gbK())
return y},
gK:function(a){var z,y
z={}
y=new P.C(0,$.p,null,[P.Y])
z.a=null
z.a=this.aA(new P.nI(z,y),!0,new P.nJ(y),y.gbK())
return y},
cd:function(a){var z,y,x
z=H.x(this,"aa",0)
y=H.r([],[z])
x=new P.C(0,$.p,null,[[P.K,z]])
this.aA(new P.nO(this,y),!0,new P.nP(y,x),x.gbK())
return x},
bz:function(a){var z,y,x
z=H.x(this,"aa",0)
y=P.W(null,null,null,z)
x=new P.C(0,$.p,null,[[P.bA,z]])
this.aA(new P.nQ(this,y),!0,new P.nR(y,x),x.gbK())
return x},
gE:function(a){var z,y
z={}
y=new P.C(0,$.p,null,[H.x(this,"aa",0)])
z.a=null
z.b=!1
this.aA(new P.nK(z,this),!0,new P.nL(z,y),y.gbK())
return y}},
nC:{"^":"a;a,b,c,d",
$1:function(a){var z,y
z=this.a
y=this.d
P.hr(new P.nA(this.c,a),new P.nB(z,y),P.hg(z.a,y))},
$S:function(){return H.b3(function(a){return{func:1,args:[a]}},this.b,"aa")}},
nA:{"^":"a:1;a,b",
$0:function(){return J.i(this.b,this.a)}},
nB:{"^":"a:51;a,b",
$1:function(a){if(a===!0)P.hh(this.a.a,this.b,!0)}},
nD:{"^":"a:1;a",
$0:function(){this.a.b2(!1)}},
nG:{"^":"a;a,b,c,d",
$1:function(a){P.hr(new P.nE(this.c,a),new P.nF(),P.hg(this.a.a,this.d))},
$S:function(){return H.b3(function(a){return{func:1,args:[a]}},this.b,"aa")}},
nE:{"^":"a:1;a,b",
$0:function(){return this.a.$1(this.b)}},
nF:{"^":"a:0;",
$1:function(a){}},
nH:{"^":"a:1;a",
$0:function(){this.a.b2(null)}},
nM:{"^":"a:0;a",
$1:function(a){++this.a.a}},
nN:{"^":"a:1;a,b",
$0:function(){this.b.b2(this.a.a)}},
nI:{"^":"a:0;a,b",
$1:function(a){P.hh(this.a.a,this.b,!1)}},
nJ:{"^":"a:1;a",
$0:function(){this.a.b2(!0)}},
nO:{"^":"a;a,b",
$1:function(a){this.b.push(a)},
$S:function(){return H.b3(function(a){return{func:1,args:[a]}},this.a,"aa")}},
nP:{"^":"a:1;a,b",
$0:function(){this.b.b2(this.a)}},
nQ:{"^":"a;a,b",
$1:function(a){this.b.q(0,a)},
$S:function(){return H.b3(function(a){return{func:1,args:[a]}},this.a,"aa")}},
nR:{"^":"a:1;a,b",
$0:function(){this.b.b2(this.a)}},
nK:{"^":"a;a,b",
$1:function(a){var z=this.a
z.b=!0
z.a=a},
$S:function(){return H.b3(function(a){return{func:1,args:[a]}},this.b,"aa")}},
nL:{"^":"a:1;a,b",
$0:function(){var z,y,x,w
x=this.a
if(x.b){this.b.b2(x.a)
return}try{x=H.a9()
throw H.c(x)}catch(w){z=H.z(w)
y=H.A(w)
P.qe(this.b,z,y)}}},
cY:{"^":"d;cu:b<,$ti",
gdL:function(){return new P.cV(this,this.$ti)},
gjT:function(){return(this.b&4)!==0},
gcH:function(){var z=this.b
return(z&1)!==0?this.gbC().gfa():(z&2)===0},
giu:function(){if((this.b&8)===0)return this.a
return this.a.gcT()},
dV:function(){var z,y
if((this.b&8)===0){z=this.a
if(z==null){z=new P.e5(null,null,0,this.$ti)
this.a=z}return z}y=this.a
if(y.gcT()==null)y.c=new P.e5(null,null,0,this.$ti)
return y.c},
gbC:function(){if((this.b&8)!==0)return this.a.gcT()
return this.a},
cj:function(){if((this.b&4)!==0)return new P.E("Cannot add event after closing")
return new P.E("Cannot add event while adding a stream")},
j4:function(a,b){var z,y,x,w
z=this.b
if(z>=4)throw H.c(this.cj())
if((z&2)!==0){z=new P.C(0,$.p,null,[null])
z.bs(null)
return z}z=this.a
y=new P.C(0,$.p,null,[null])
x=a.aA(this.ghY(),!1,this.ghZ(),this.ghV())
w=this.b
if((w&1)!==0?this.gbC().gfa():(w&2)===0)x.cK()
this.a=new P.pQ(z,y,x,this.$ti)
this.b|=8
return y},
f2:function(){var z=this.c
if(z==null){z=(this.b&2)!==0?$.$get$b9():new P.C(0,$.p,null,[null])
this.c=z}return z},
q:[function(a,b){if(this.b>=4)throw H.c(this.cj())
this.bJ(b)},"$1","giS",2,0,function(){return H.b3(function(a){return{func:1,v:true,args:[a]}},this.$receiver,"cY")}],
eg:function(a,b){if(this.b>=4)throw H.c(this.cj())
if(a==null)a=new P.cH()
$.p.toString
this.c2(a,b)},
bg:function(){var z=this.b
if((z&4)!==0)return this.f2()
if(z>=4)throw H.c(this.cj())
z|=4
this.b=z
if((z&1)!==0)this.cs()
else if((z&3)===0)this.dV().q(0,C.u)
return this.f2()},
bJ:[function(a){var z=this.b
if((z&1)!==0)this.cr(a)
else if((z&3)===0)this.dV().q(0,new P.e_(a,null,this.$ti))},"$1","ghY",2,0,function(){return H.b3(function(a){return{func:1,v:true,args:[a]}},this.$receiver,"cY")}],
c2:[function(a,b){var z=this.b
if((z&1)!==0)this.ct(a,b)
else if((z&3)===0)this.dV().q(0,new P.e0(a,b,null))},"$2","ghV",4,0,38],
dP:[function(){var z=this.a
this.a=z.gcT()
this.b&=4294967287
z.a.bs(null)},"$0","ghZ",0,0,6],
iI:function(a,b,c,d){var z,y,x,w,v
if((this.b&3)!==0)throw H.c(new P.E("Stream has already been listened to."))
z=$.p
y=d?1:0
x=new P.pe(this,null,null,null,z,y,null,null,this.$ti)
x.eT(a,b,c,d,H.m(this,0))
w=this.giu()
y=this.b|=1
if((y&8)!==0){v=this.a
v.scT(x)
v.b.cN()}else this.a=x
x.iG(w)
x.e_(new P.pS(this))
return x},
iy:function(a){var z,y,x,w,v,u
z=null
if((this.b&8)!==0)z=this.a.c4()
this.a=null
this.b=this.b&4294967286|2
w=this.r
if(w!=null)if(z==null)try{z=w.$0()}catch(v){y=H.z(v)
x=H.A(v)
u=new P.C(0,$.p,null,[null])
u.eW(y,x)
z=u}else z=z.bX(w)
w=new P.pR(this)
if(z!=null)z=z.bX(w)
else w.$0()
return z}},
pS:{"^":"a:1;a",
$0:function(){P.ec(this.a.d)}},
pR:{"^":"a:6;a",
$0:function(){var z=this.a.c
if(z!=null&&z.a===0)z.bs(null)}},
q_:{"^":"d;$ti",
cr:function(a){this.gbC().bJ(a)},
ct:function(a,b){this.gbC().c2(a,b)},
cs:function(){this.gbC().dP()}},
pb:{"^":"d;$ti",
cr:function(a){this.gbC().c3(new P.e_(a,null,[H.m(this,0)]))},
ct:function(a,b){this.gbC().c3(new P.e0(a,b,null))},
cs:function(){this.gbC().c3(C.u)}},
pa:{"^":"cY+pb;a,b,c,d,e,f,r,$ti"},
pZ:{"^":"cY+q_;a,b,c,d,e,f,r,$ti"},
cV:{"^":"pT;a,$ti",
gv:function(a){return(H.ax(this.a)^892482866)>>>0},
u:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof P.cV))return!1
return b.a===this.a}},
pe:{"^":"cc;x,a,b,c,d,e,f,r,$ti",
e6:function(){return this.x.iy(this)},
e8:[function(){var z=this.x
if((z.b&8)!==0)z.a.cK()
P.ec(z.e)},"$0","ge7",0,0,6],
ea:[function(){var z=this.x
if((z.b&8)!==0)z.a.cN()
P.ec(z.f)},"$0","ge9",0,0,6]},
oV:{"^":"d;$ti",
cK:function(){this.b.cK()},
cN:function(){this.b.cN()},
c4:function(){var z=this.b.c4()
if(z==null){this.a.bs(null)
return}return z.bX(new P.oW(this))},
ej:function(){this.a.bs(null)}},
oW:{"^":"a:1;a",
$0:function(){this.a.a.bs(null)}},
pQ:{"^":"oV;cT:c@,a,b,$ti"},
cc:{"^":"d;cu:e<,$ti",
iG:function(a){if(a==null)return
this.r=a
if(!a.gK(a)){this.e=(this.e|64)>>>0
this.r.cW(this)}},
kb:function(a){var z=this.e
if((z&8)!==0)return
this.e=(z+128|4)>>>0
if(z<128&&this.r!=null)this.r.fw()
if((z&4)===0&&(this.e&32)===0)this.e_(this.ge7())},
cK:function(){return this.kb(null)},
cN:function(){var z=this.e
if((z&8)!==0)return
if(z>=128){z-=128
this.e=z
if(z<128){if((z&64)!==0){z=this.r
z=!z.gK(z)}else z=!1
if(z)this.r.cW(this)
else{z=(this.e&4294967291)>>>0
this.e=z
if((z&32)===0)this.e_(this.ge9())}}}},
c4:function(){var z=(this.e&4294967279)>>>0
this.e=z
if((z&8)===0)this.dQ()
z=this.f
return z==null?$.$get$b9():z},
gfa:function(){return(this.e&4)!==0},
gcH:function(){return this.e>=128},
dQ:function(){var z=(this.e|8)>>>0
this.e=z
if((z&64)!==0)this.r.fw()
if((this.e&32)===0)this.r=null
this.f=this.e6()},
bJ:["hH",function(a){var z=this.e
if((z&8)!==0)return
if(z<32)this.cr(a)
else this.c3(new P.e_(a,null,[H.x(this,"cc",0)]))}],
c2:["hI",function(a,b){var z=this.e
if((z&8)!==0)return
if(z<32)this.ct(a,b)
else this.c3(new P.e0(a,b,null))}],
dP:function(){var z=this.e
if((z&8)!==0)return
z=(z|2)>>>0
this.e=z
if(z<32)this.cs()
else this.c3(C.u)},
e8:[function(){},"$0","ge7",0,0,6],
ea:[function(){},"$0","ge9",0,0,6],
e6:function(){return},
c3:function(a){var z,y
z=this.r
if(z==null){z=new P.e5(null,null,0,[H.x(this,"cc",0)])
this.r=z}z.q(0,a)
y=this.e
if((y&64)===0){y=(y|64)>>>0
this.e=y
if(y<128)this.r.cW(this)}},
cr:function(a){var z=this.e
this.e=(z|32)>>>0
this.d.hd(this.a,a)
this.e=(this.e&4294967263)>>>0
this.dS((z&4)!==0)},
ct:function(a,b){var z,y
z=this.e
y=new P.pd(this,a,b)
if((z&1)!==0){this.e=(z|16)>>>0
this.dQ()
z=this.f
if(!!J.n(z).$isN&&z!==$.$get$b9())z.bX(y)
else y.$0()}else{y.$0()
this.dS((z&4)!==0)}},
cs:function(){var z,y
z=new P.pc(this)
this.dQ()
this.e=(this.e|16)>>>0
y=this.f
if(!!J.n(y).$isN&&y!==$.$get$b9())y.bX(z)
else z.$0()},
e_:function(a){var z=this.e
this.e=(z|32)>>>0
a.$0()
this.e=(this.e&4294967263)>>>0
this.dS((z&4)!==0)},
dS:function(a){var z,y
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
if(y)this.e8()
else this.ea()
this.e=(this.e&4294967263)>>>0}z=this.e
if((z&64)!==0&&z<128)this.r.cW(this)},
eT:function(a,b,c,d,e){var z=this.d
z.toString
this.a=a
this.b=P.eb(b==null?P.qv():b,z)
this.c=c==null?P.qu():c}},
pd:{"^":"a:6;a,b,c",
$0:function(){var z,y,x,w,v,u
z=this.a
y=z.e
if((y&8)!==0&&(y&16)===0)return
z.e=(y|32)>>>0
y=z.b
x=H.au(y,{func:1,args:[P.d,P.aT]})
w=z.d
v=this.b
u=z.b
if(x)w.kv(u,v,this.c)
else w.hd(u,v)
z.e=(z.e&4294967263)>>>0}},
pc:{"^":"a:6;a",
$0:function(){var z,y
z=this.a
y=z.e
if((y&16)===0)return
z.e=(y|42)>>>0
z.d.hb(z.c)
z.e=(z.e&4294967263)>>>0}},
pT:{"^":"aa;$ti",
aA:function(a,b,c,d){return this.a.iI(a,d,c,!0===b)},
ey:function(a,b,c){return this.aA(a,null,b,c)}},
e1:{"^":"d;c8:a@,$ti"},
e_:{"^":"e1;ac:b<,a,$ti",
ez:function(a){a.cr(this.b)}},
e0:{"^":"e1;bh:b<,be:c<,a",
ez:function(a){a.ct(this.b,this.c)},
$ase1:I.b5},
pf:{"^":"d;",
ez:function(a){a.cs()},
gc8:function(){return},
sc8:function(a){throw H.c(new P.E("No events after a done."))}},
pL:{"^":"d;cu:a<,$ti",
cW:function(a){var z=this.a
if(z===1)return
if(z>=1){this.a=1
return}P.ck(new P.pM(this,a))
this.a=1},
fw:function(){if(this.a===1)this.a=3}},
pM:{"^":"a:1;a,b",
$0:function(){var z,y,x,w
z=this.a
y=z.a
z.a=0
if(y===3)return
x=z.b
w=x.gc8()
z.b=w
if(w==null)z.c=null
x.ez(this.b)}},
e5:{"^":"pL;b,c,a,$ti",
gK:function(a){return this.c==null},
q:function(a,b){var z=this.c
if(z==null){this.c=b
this.b=b}else{z.sc8(b)
this.c=b}}},
pU:{"^":"d;a,b,c,$ti"},
q9:{"^":"a:1;a,b,c",
$0:function(){return this.a.b3(this.b,this.c)}},
q8:{"^":"a:16;a,b",
$2:function(a,b){P.q7(this.a,this.b,a,b)}},
qa:{"^":"a:1;a,b",
$0:function(){return this.a.b2(this.b)}},
e2:{"^":"aa;$ti",
aA:function(a,b,c,d){return this.i6(a,d,c,!0===b)},
ey:function(a,b,c){return this.aA(a,null,b,c)},
i6:function(a,b,c,d){return P.pj(this,a,b,c,d,H.x(this,"e2",0),H.x(this,"e2",1))},
f7:function(a,b){b.bJ(a)},
ij:function(a,b,c){c.c2(a,b)},
$asaa:function(a,b){return[b]}},
h8:{"^":"cc;x,y,a,b,c,d,e,f,r,$ti",
bJ:function(a){if((this.e&2)!==0)return
this.hH(a)},
c2:function(a,b){if((this.e&2)!==0)return
this.hI(a,b)},
e8:[function(){var z=this.y
if(z==null)return
z.cK()},"$0","ge7",0,0,6],
ea:[function(){var z=this.y
if(z==null)return
z.cN()},"$0","ge9",0,0,6],
e6:function(){var z=this.y
if(z!=null){this.y=null
return z.c4()}return},
kP:[function(a){this.x.f7(a,this)},"$1","gig",2,0,function(){return H.b3(function(a,b){return{func:1,v:true,args:[a]}},this.$receiver,"h8")}],
kR:[function(a,b){this.x.ij(a,b,this)},"$2","gii",4,0,39],
kQ:[function(){this.dP()},"$0","gih",0,0,6],
hS:function(a,b,c,d,e,f,g){this.y=this.x.a.ey(this.gig(),this.gih(),this.gii())},
$ascc:function(a,b){return[b]},
A:{
pj:function(a,b,c,d,e,f,g){var z,y
z=$.p
y=e?1:0
y=new P.h8(a,null,null,null,null,z,y,null,null,[f,g])
y.eT(b,c,d,e,g)
y.hS(a,b,c,d,e,f,g)
return y}}},
pJ:{"^":"e2;b,a,$ti",
f7:function(a,b){var z,y,x,w
z=null
try{z=this.b.$1(a)}catch(w){y=H.z(w)
x=H.A(w)
P.q2(b,y,x)
return}b.bJ(z)}},
cq:{"^":"d;bh:a<,be:b<",
k:function(a){return H.b(this.a)},
$isZ:1},
q1:{"^":"d;"},
ql:{"^":"a:1;a,b",
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
pN:{"^":"q1;",
hb:function(a){var z,y,x,w
try{if(C.f===$.p){x=a.$0()
return x}x=P.ho(null,null,this,a)
return x}catch(w){z=H.z(w)
y=H.A(w)
x=P.bm(null,null,this,z,y)
return x}},
hd:function(a,b){var z,y,x,w
try{if(C.f===$.p){x=a.$1(b)
return x}x=P.hq(null,null,this,a,b)
return x}catch(w){z=H.z(w)
y=H.A(w)
x=P.bm(null,null,this,z,y)
return x}},
kv:function(a,b,c){var z,y,x,w
try{if(C.f===$.p){x=a.$2(b,c)
return x}x=P.hp(null,null,this,a,b,c)
return x}catch(w){z=H.z(w)
y=H.A(w)
x=P.bm(null,null,this,z,y)
return x}},
ei:function(a,b){if(b)return new P.pO(this,a)
else return new P.pP(this,a)},
i:function(a,b){return},
ha:function(a){if($.p===C.f)return a.$0()
return P.ho(null,null,this,a)},
eD:function(a,b){if($.p===C.f)return a.$1(b)
return P.hq(null,null,this,a,b)},
ku:function(a,b,c){if($.p===C.f)return a.$2(b,c)
return P.hp(null,null,this,a,b,c)}},
pO:{"^":"a:1;a,b",
$0:function(){return this.a.hb(this.b)}},
pP:{"^":"a:1;a,b",
$0:function(){return this.a.ha(this.b)}}}],["","",,P,{"^":"",
dt:function(a,b){return new H.O(0,null,null,null,null,null,0,[a,b])},
aR:function(){return new H.O(0,null,null,null,null,null,0,[null,null])},
ah:function(a){return H.rO(a,new H.O(0,null,null,null,null,null,0,[null,null]))},
kV:function(a,b,c){var z,y
if(P.e9(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}z=[]
y=$.$get$bM()
y.push(a)
try{P.qh(a,z)}finally{if(0>=y.length)return H.e(y,-1)
y.pop()}y=P.fG(b,z,", ")+c
return y.charCodeAt(0)==0?y:y},
bZ:function(a,b,c){var z,y,x
if(P.e9(a))return b+"..."+c
z=new P.bF(b)
y=$.$get$bM()
y.push(a)
try{x=z
x.w=P.fG(x.gw(),a,", ")}finally{if(0>=y.length)return H.e(y,-1)
y.pop()}y=z
y.w=y.gw()+c
y=z.gw()
return y.charCodeAt(0)==0?y:y},
e9:function(a){var z,y
for(z=0;y=$.$get$bM(),z<y.length;++z)if(a===y[z])return!0
return!1},
qh:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=a.gZ(a)
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
ld:function(a,b,c,d,e){return new H.O(0,null,null,null,null,null,0,[d,e])},
c2:function(a,b,c){var z=P.ld(null,null,null,b,c)
a.L(0,new P.qx(z))
return z},
W:function(a,b,c,d){return new P.hb(0,null,null,null,null,null,0,[d])},
b_:function(a,b){var z,y
z=P.W(null,null,null,b)
for(y=J.af(a);y.t();)z.q(0,y.gF())
return z},
dy:function(a){var z,y,x
z={}
if(P.e9(a))return"{...}"
y=new P.bF("")
try{$.$get$bM().push(a)
x=y
x.w=x.gw()+"{"
z.a=!0
a.L(0,new P.lo(z,y))
z=y
z.w=z.gw()+"}"}finally{z=$.$get$bM()
if(0>=z.length)return H.e(z,-1)
z.pop()}z=y.gw()
return z.charCodeAt(0)==0?z:z},
hc:{"^":"O;a,b,c,d,e,f,r,$ti",
cF:function(a){return H.t7(a)&0x3ffffff},
cG:function(a,b){var z,y,x
if(a==null)return-1
z=a.length
for(y=0;y<z;++y){x=a[y].gfN()
if(x==null?b==null:x===b)return y}return-1},
A:{
bJ:function(a,b){return new P.hc(0,null,null,null,null,null,0,[a,b])}}},
hb:{"^":"pw;a,b,c,d,e,f,r,$ti",
e4:function(){return new P.hb(0,null,null,null,null,null,0,this.$ti)},
gZ:function(a){var z=new P.ac(this,this.r,null,null,[null])
z.c=this.e
return z},
gl:function(a){return this.a},
gK:function(a){return this.a===0},
gak:function(a){return this.a!==0},
a1:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null)return!1
return z[b]!=null}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null)return!1
return y[b]!=null}else return this.i4(b)},
i4:function(a){var z=this.d
if(z==null)return!1
return this.d4(z[this.d3(a)],a)>=0},
c7:function(a){var z
if(!(typeof a==="string"&&a!=="__proto__"))z=typeof a==="number"&&(a&0x3ffffff)===a
else z=!0
if(z)return this.a1(0,a)?a:null
else return this.io(a)},
io:function(a){var z,y,x
z=this.d
if(z==null)return
y=z[this.d3(a)]
x=this.d4(y,a)
if(x<0)return
return J.av(y,x).gf1()},
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
z=y}return this.eX(z,b)}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.c=y
x=y}return this.eX(x,b)}else return this.ay(b)},
ay:function(a){var z,y,x
z=this.d
if(z==null){z=P.pF()
this.d=z}y=this.d3(a)
x=z[y]
if(x==null)z[y]=[this.dT(a)]
else{if(this.d4(x,a)>=0)return!1
x.push(this.dT(a))}return!0},
a7:function(a,b){if(typeof b==="string"&&b!=="__proto__")return this.eY(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.eY(this.c,b)
else return this.iz(b)},
iz:function(a){var z,y,x
z=this.d
if(z==null)return!1
y=z[this.d3(a)]
x=this.d4(y,a)
if(x<0)return!1
this.eZ(y.splice(x,1)[0])
return!0},
ib:function(a,b){var z,y,x,w,v
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
eX:function(a,b){if(a[b]!=null)return!1
a[b]=this.dT(b)
return!0},
eY:function(a,b){var z
if(a==null)return!1
z=a[b]
if(z==null)return!1
this.eZ(z)
delete a[b]
return!0},
dT:function(a){var z,y
z=new P.pE(a,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.c=y
y.b=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
eZ:function(a){var z,y
z=a.gi3()
y=a.b
if(z==null)this.e=y
else z.b=y
if(y==null)this.f=z
else y.c=z;--this.a
this.r=this.r+1&67108863},
d3:function(a){return J.j(a)&0x3ffffff},
d4:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.i(a[y].gf1(),b))return y
return-1},
$isbA:1,
$isV:1,
A:{
pF:function(){var z=Object.create(null)
z["<non-identifier-key>"]=z
delete z["<non-identifier-key>"]
return z}}},
pE:{"^":"d;f1:a<,b,i3:c<"},
ac:{"^":"d;a,b,c,d,$ti",
gF:function(){return this.d},
t:function(){var z=this.a
if(this.b!==z.r)throw H.c(new P.B(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.b
return!0}}}},
pw:{"^":"n_;$ti",
bz:function(a){var z=this.e4()
z.aq(0,this)
return z}},
cD:{"^":"y;$ti"},
qx:{"^":"a:7;a",
$2:function(a,b){this.a.n(0,a,b)}},
f2:{"^":"f8;$ti"},
f8:{"^":"d+b0;$ti",$asK:null,$asV:null,$isK:1,$isV:1},
b0:{"^":"d;$ti",
gZ:function(a){return new H.du(this,this.gl(this),0,null,[H.x(this,"b0",0)])},
an:function(a,b){return this.i(0,b)},
L:function(a,b){var z,y
z=this.gl(this)
for(y=0;y<z;++y){b.$1(this.i(0,y))
if(z!==this.gl(this))throw H.c(new P.B(this))}},
gK:function(a){return this.gl(this)===0},
gak:function(a){return!this.gK(this)},
gE:function(a){if(this.gl(this)===0)throw H.c(H.a9())
return this.i(0,this.gl(this)-1)},
a1:function(a,b){var z,y
z=this.gl(this)
for(y=0;y<this.gl(this);++y){if(J.i(this.i(0,y),b))return!0
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
aP:function(a,b){return new H.an(this,b,[H.x(this,"b0",0),null])},
dK:function(a,b){return H.fI(this,b,null,H.x(this,"b0",0))},
bz:function(a){var z,y
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
ia:function(a,b){var z,y,x,w
z=H.r([],[H.x(this,"b0",0)])
y=this.gl(this)
for(x=0;x<y;++x){w=this.i(0,x)
if(J.i(a.$1(w),b))z.push(w)
if(y!==this.gl(this))throw H.c(new P.B(this))}if(z.length!==this.gl(this)){this.hz(0,0,z.length,z)
this.sl(0,z.length)}},
aR:function(a,b,c,d,e){var z,y,x,w,v
P.c5(b,c,this.gl(this),null,null,null)
z=c-b
if(z===0)return
if(H.aM(d,"$isK",[H.x(this,"b0",0)],"$asK")){y=e
x=d}else{x=J.ip(d,e).by(0,!1)
y=0}w=J.H(x)
if(y+z>w.gl(x))throw H.c(H.eV())
if(y<b)for(v=z-1;v>=0;--v)this.n(0,b+v,w.i(x,y+v))
else for(v=0;v<z;++v)this.n(0,b+v,w.i(x,y+v))},
hz:function(a,b,c,d){return this.aR(a,b,c,d,0)},
bG:function(a,b,c){var z
if(c>=this.gl(this))return-1
for(z=c;z<this.gl(this);++z)if(J.i(this.i(0,z),b))return z
return-1},
b7:function(a,b){return this.bG(a,b,0)},
k:function(a){return P.bZ(this,"[","]")},
$isK:1,
$isV:1},
q0:{"^":"d;$ti",
n:function(a,b,c){throw H.c(new P.P("Cannot modify unmodifiable map"))},
$isD:1},
lm:{"^":"d;$ti",
i:function(a,b){return this.a.i(0,b)},
n:function(a,b,c){this.a.n(0,b,c)},
a2:function(a){return this.a.a2(a)},
L:function(a,b){this.a.L(0,b)},
gK:function(a){var z=this.a
return z.gK(z)},
gak:function(a){var z=this.a
return z.gak(z)},
gl:function(a){var z=this.a
return z.gl(z)},
k:function(a){return this.a.k(0)},
$isD:1},
h3:{"^":"lm+q0;a,$ti",$asD:null,$isD:1},
lo:{"^":"a:7;a,b",
$2:function(a,b){var z,y
z=this.a
if(!z.a)this.b.w+=", "
z.a=!1
z=this.b
y=z.w+=H.b(a)
z.w=y+": "
z.w+=H.b(b)}},
le:{"^":"aS;a,b,c,d,$ti",
gZ:function(a){return new P.hd(this,this.c,this.d,this.b,null,this.$ti)},
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
q:function(a,b){this.ay(b)},
aq:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=this.$ti
if(H.aM(b,"$isK",z,"$asK")){y=b.gl(b)
x=this.gl(this)
w=x+y
v=this.a
u=v.length
if(w>=u){t=P.lf(w+(w>>>1))
if(typeof t!=="number")return H.v(t)
v=new Array(t)
v.fixed$length=Array
s=H.r(v,z)
this.c=this.iM(s)
this.a=s
this.b=0
C.a.aR(s,x,w,b,0)
this.c+=y}else{z=this.c
r=u-z
if(y<r){C.a.aR(v,z,z+y,b,0)
this.c+=y}else{q=y-r
C.a.aR(v,z,z+r,b,0)
C.a.aR(this.a,0,q,b,r)
this.c=q}}++this.d}else for(z=new P.hd(b,b.c,b.d,b.b,null,[H.m(b,0)]);z.t();)this.ay(z.e)},
b_:function(a){var z,y,x,w,v
z=this.b
y=this.c
if(z!==y){for(x=this.a,w=x.length,v=w-1;z!==y;z=(z+1&v)>>>0){if(z<0||z>=w)return H.e(x,z)
x[z]=null}this.c=0
this.b=0;++this.d}},
k:function(a){return P.bZ(this,"{","}")},
ft:function(a){var z,y,x
z=this.b
y=this.a
x=y.length
z=(z-1&x-1)>>>0
this.b=z
if(z<0||z>=x)return H.e(y,z)
y[z]=a
if(z===this.c)this.f6();++this.d},
dt:function(){var z,y,x,w
z=this.b
if(z===this.c)throw H.c(H.a9());++this.d
y=this.a
x=y.length
if(z>=x)return H.e(y,z)
w=y[z]
y[z]=null
this.b=(z+1&x-1)>>>0
return w},
ay:function(a){var z,y,x
z=this.a
y=this.c
x=z.length
if(y<0||y>=x)return H.e(z,y)
z[y]=a
x=(y+1&x-1)>>>0
this.c=x
if(this.b===x)this.f6();++this.d},
f6:function(){var z,y,x,w
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
iM:function(a){var z,y,x,w,v
z=this.b
y=this.c
x=this.a
if(z<=y){w=y-z
C.a.aR(a,0,w,x,z)
return w}else{v=x.length-z
C.a.aR(a,0,v,x,z)
C.a.aR(a,v,v+this.c,this.a,0)
return this.c+v}},
hK:function(a,b){var z=new Array(8)
z.fixed$length=Array
this.a=H.r(z,[b])},
A:{
b1:function(a,b){var z=new P.le(null,0,0,0,[b])
z.hK(a,b)
return z},
lf:function(a){var z
a=C.t.eL(a,1)-1
for(;!0;a=z)z=(a&a-1)>>>0}}},
hd:{"^":"d;a,b,c,d,e,$ti",
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
n0:{"^":"d;$ti",
gK:function(a){return this.a===0},
gak:function(a){return this.a!==0},
aq:function(a,b){var z
for(z=J.af(b);z.t();)this.q(0,z.gF())},
jc:function(a){var z,y
for(z=a.a,y=new P.ac(z,z.r,null,null,[null]),y.c=z.e;y.t();)if(!this.a1(0,y.d))return!1
return!0},
by:function(a,b){var z,y,x,w,v
z=H.r([],this.$ti)
C.a.sl(z,this.a)
for(y=new P.ac(this,this.r,null,null,[null]),y.c=this.e,x=0;y.t();x=v){w=y.d
v=x+1
if(x>=z.length)return H.e(z,x)
z[x]=w}return z},
cd:function(a){return this.by(a,!0)},
aP:function(a,b){return new H.bt(this,b,[H.m(this,0),null])},
k:function(a){return P.bZ(this,"{","}")},
L:function(a,b){var z
for(z=new P.ac(this,this.r,null,null,[null]),z.c=this.e;z.t();)b.$1(z.d)},
bi:function(a,b,c){var z,y
for(z=new P.ac(this,this.r,null,null,[null]),z.c=this.e,y=b;z.t();)y=c.$2(y,z.d)
return y},
gE:function(a){var z,y
z=new P.ac(this,this.r,null,null,[null])
z.c=this.e
if(!z.t())throw H.c(H.a9())
do y=z.d
while(z.t())
return y},
b6:function(a,b,c){var z,y
for(z=new P.ac(this,this.r,null,null,[null]),z.c=this.e;z.t();){y=z.d
if(b.$1(y)===!0)return y}if(c!=null)return c.$0()
throw H.c(H.a9())},
di:function(a,b){return this.b6(a,b,null)},
aL:function(a,b){var z,y,x,w
for(z=new P.ac(this,this.r,null,null,[null]),z.c=this.e,y=null,x=!1;z.t();){w=z.d
if(b.$1(w)===!0){if(x)throw H.c(H.dm())
y=w
x=!0}}if(x)return y
throw H.c(H.a9())},
$isbA:1,
$isV:1},
n_:{"^":"n0;$ti"}}],["","",,P,{"^":"",
d_:function(a){var z
if(a==null)return
if(typeof a!="object")return a
if(Object.getPrototypeOf(a)!==Array.prototype)return new P.pz(a,Object.create(null),null)
for(z=0;z<a.length;++z)a[z]=P.d_(a[z])
return a},
qk:function(a,b){var z,y,x,w
if(typeof a!=="string")throw H.c(H.Q(a))
z=null
try{z=JSON.parse(a)}catch(x){y=H.z(x)
w=String(y)
throw H.c(new P.eS(w,null,null))}w=P.d_(z)
return w},
uN:[function(a){return a.dw()},"$1","rt",2,0,0],
pz:{"^":"d;a,b,c",
i:function(a,b){var z,y
z=this.b
if(z==null)return this.c.i(0,b)
else if(typeof b!=="string")return
else{y=z[b]
return typeof y=="undefined"?this.ix(b):y}},
gl:function(a){var z
if(this.b==null){z=this.c
z=z.gl(z)}else z=this.cl().length
return z},
gK:function(a){var z
if(this.b==null){z=this.c
z=z.gl(z)}else z=this.cl().length
return z===0},
gak:function(a){var z
if(this.b==null){z=this.c
z=z.gl(z)}else z=this.cl().length
return z>0},
n:function(a,b,c){var z,y
if(this.b==null)this.c.n(0,b,c)
else if(this.a2(b)){z=this.b
z[b]=c
y=this.a
if(y==null?z!=null:y!==z)y[b]=null}else this.iK().n(0,b,c)},
a2:function(a){if(this.b==null)return this.c.a2(a)
if(typeof a!=="string")return!1
return Object.prototype.hasOwnProperty.call(this.a,a)},
L:function(a,b){var z,y,x,w
if(this.b==null)return this.c.L(0,b)
z=this.cl()
for(y=0;y<z.length;++y){x=z[y]
w=this.b[x]
if(typeof w=="undefined"){w=P.d_(this.a[x])
this.b[x]=w}b.$2(x,w)
if(z!==this.c)throw H.c(new P.B(this))}},
k:function(a){return P.dy(this)},
cl:function(){var z=this.c
if(z==null){z=Object.keys(this.a)
this.c=z}return z},
iK:function(){var z,y,x,w,v
if(this.b==null)return this.c
z=P.dt(P.q,null)
y=this.cl()
for(x=0;w=y.length,x<w;++x){v=y[x]
z.n(0,v,this.i(0,v))}if(w===0)y.push(null)
else C.a.sl(y,0)
this.b=null
this.a=null
this.c=z
return z},
ix:function(a){var z
if(!Object.prototype.hasOwnProperty.call(this.a,a))return
z=P.d_(this.a[a])
return this.b[a]=z},
$isD:1,
$asD:function(){return[P.q,null]}},
eI:{"^":"d;$ti"},
cw:{"^":"d;$ti"},
ds:{"^":"Z;a,b",
k:function(a){if(this.b!=null)return"Converting object to an encodable object failed."
else return"Converting object did not return an encodable object."}},
l0:{"^":"ds;a,b",
k:function(a){return"Cyclic error in JSON stringify"}},
l_:{"^":"eI;a,b",
jg:function(a,b){var z=P.qk(a,this.gjh().a)
return z},
jf:function(a){return this.jg(a,null)},
jp:function(a,b){var z=this.gjq()
z=P.pB(a,z.b,z.a)
return z},
fF:function(a){return this.jp(a,null)},
gjq:function(){return C.N},
gjh:function(){return C.M},
$aseI:function(){return[P.d,P.q]}},
l2:{"^":"cw;a,b",
$ascw:function(){return[P.d,P.q]}},
l1:{"^":"cw;a",
$ascw:function(){return[P.q,P.d]}},
pC:{"^":"d;",
hm:function(a){var z,y,x,w,v,u,t
z=J.H(a)
y=z.gl(a)
if(typeof y!=="number")return H.v(y)
x=this.c
w=0
v=0
for(;v<y;++v){u=z.cC(a,v)
if(u>92)continue
if(u<32){if(v>w)x.w+=C.b.aC(a,w,v)
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
break}}else if(u===34||u===92){if(v>w)x.w+=C.b.aC(a,w,v)
w=v+1
x.w+=H.ai(92)
x.w+=H.ai(u)}}if(w===0)x.w+=H.b(a)
else if(w<y)x.w+=z.aC(a,w,y)},
dR:function(a){var z,y,x,w
for(z=this.a,y=z.length,x=0;x<y;++x){w=z[x]
if(a==null?w==null:a===w)throw H.c(new P.l0(a,null))}z.push(a)},
dB:function(a){var z,y,x,w
if(this.hl(a))return
this.dR(a)
try{z=this.b.$1(a)
if(!this.hl(z))throw H.c(new P.ds(a,null))
x=this.a
if(0>=x.length)return H.e(x,-1)
x.pop()}catch(w){y=H.z(w)
throw H.c(new P.ds(a,y))}},
hl:function(a){var z,y
if(typeof a==="number"){if(!isFinite(a))return!1
this.c.w+=C.k.k(a)
return!0}else if(a===!0){this.c.w+="true"
return!0}else if(a===!1){this.c.w+="false"
return!0}else if(a==null){this.c.w+="null"
return!0}else if(typeof a==="string"){z=this.c
z.w+='"'
this.hm(a)
z.w+='"'
return!0}else{z=J.n(a)
if(!!z.$isK){this.dR(a)
this.kI(a)
z=this.a
if(0>=z.length)return H.e(z,-1)
z.pop()
return!0}else if(!!z.$isD){this.dR(a)
y=this.kJ(a)
z=this.a
if(0>=z.length)return H.e(z,-1)
z.pop()
return y}else return!1}},
kI:function(a){var z,y,x
z=this.c
z.w+="["
y=J.H(a)
if(y.gl(a)>0){this.dB(y.i(a,0))
for(x=1;x<y.gl(a);++x){z.w+=","
this.dB(y.i(a,x))}}z.w+="]"},
kJ:function(a){var z,y,x,w,v,u,t
z={}
if(a.gK(a)){this.c.w+="{}"
return!0}y=a.gl(a)*2
x=new Array(y)
z.a=0
z.b=!0
a.L(0,new P.pD(z,x))
if(!z.b)return!1
w=this.c
w.w+="{"
for(v='"',u=0;u<y;u+=2,v=',"'){w.w+=v
this.hm(x[u])
w.w+='":'
t=u+1
if(t>=y)return H.e(x,t)
this.dB(x[t])}w.w+="}"
return!0}},
pD:{"^":"a:7;a,b",
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
pA:{"^":"pC;c,a,b",A:{
pB:function(a,b,c){var z,y,x
z=new P.bF("")
y=new P.pA(z,[],P.rt())
y.dB(a)
x=z.w
return x.charCodeAt(0)==0?x:x}}}}],["","",,P,{"^":"",
uk:[function(a,b){return J.bS(a,b)},"$2","ru",4,0,40],
eN:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.h(a)
if(typeof a==="string")return JSON.stringify(a)
return P.kf(a)},
kf:function(a){var z=J.n(a)
if(!!z.$isa)return z.k(a)
return H.cJ(a)},
cz:function(a){return new P.pi(a)},
T:function(a,b,c){var z,y
z=H.r([],[c])
for(y=J.af(a);y.t();)z.push(y.gF())
if(b)return z
z.fixed$length=Array
return z},
lg:function(a,b,c,d){var z,y,x
z=H.r(new Array(a),[d])
for(y=0;y<a;++y){x=b.$1(y)
if(y>=z.length)return H.e(z,y)
z[y]=x}return z},
bv:function(a,b){var z=P.T(a,!1,b)
z.fixed$length=Array
z.immutable$list=Array
return z},
el:function(a){H.tc(H.b(a))},
be:function(a,b,c){return new H.dp(a,H.dq(a,!1,b,!1),null,null)},
Y:{"^":"d;"},
"+bool":0,
S:{"^":"d;$ti"},
cx:{"^":"d;iL:a<,b",
u:function(a,b){if(b==null)return!1
if(!(b instanceof P.cx))return!1
return this.a===b.a&&!0},
bu:function(a,b){return C.d.bu(this.a,b.giL())},
gv:function(a){var z=this.a
return(z^C.d.da(z,30))&1073741823},
k:function(a){var z,y,x,w,v,u,t,s
z=P.jC(H.m7(this))
y=P.bV(H.m5(this))
x=P.bV(H.m1(this))
w=P.bV(H.m2(this))
v=P.bV(H.m4(this))
u=P.bV(H.m6(this))
t=P.jD(H.m3(this))
s=z+"-"+y+"-"+x+" "+w+":"+v+":"+u+"."+t
return s},
q:function(a,b){var z,y
z=this.a+b.gjH()
y=new P.cx(z,!1)
if(!(Math.abs(z)>864e13))z=!1
else z=!0
if(z)H.f(P.G(y.gk6()))
return y},
gk6:function(){return this.a},
$isS:1,
$asS:function(){return[P.cx]},
A:{
jC:function(a){var z,y
z=Math.abs(a)
y=a<0?"-":""
if(z>=1000)return""+a
if(z>=100)return y+"0"+H.b(z)
if(z>=10)return y+"00"+H.b(z)
return y+"000"+H.b(z)},
jD:function(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},
bV:function(a){if(a>=10)return""+a
return"0"+a}}},
aN:{"^":"M;",$isS:1,
$asS:function(){return[P.M]}},
"+double":0,
aZ:{"^":"d;bL:a<",
a5:function(a,b){return new P.aZ(this.a+b.gbL())},
ax:function(a,b){return new P.aZ(this.a-b.gbL())},
c_:function(a,b){if(typeof b!=="number")return H.v(b)
return new P.aZ(C.k.h9(this.a*b))},
aK:function(a,b){return C.d.aK(this.a,b.gbL())},
br:function(a,b){return this.a>b.gbL()},
bZ:function(a,b){return C.d.bZ(this.a,b.gbL())},
bH:function(a,b){return C.d.bH(this.a,b.gbL())},
gjH:function(){return C.d.bD(this.a,1000)},
u:function(a,b){if(b==null)return!1
if(!(b instanceof P.aZ))return!1
return this.a===b.a},
gv:function(a){return this.a&0x1FFFFFFF},
bu:function(a,b){return C.d.bu(this.a,b.gbL())},
k:function(a){var z,y,x,w,v
z=new P.jY()
y=this.a
if(y<0)return"-"+new P.aZ(0-y).k(0)
x=z.$1(C.d.bD(y,6e7)%60)
w=z.$1(C.d.bD(y,1e6)%60)
v=new P.jX().$1(y%1e6)
return""+C.d.bD(y,36e8)+":"+H.b(x)+":"+H.b(w)+"."+H.b(v)},
eK:function(a){return new P.aZ(0-this.a)},
$isS:1,
$asS:function(){return[P.aZ]}},
jX:{"^":"a:11;",
$1:function(a){if(a>=1e5)return""+a
if(a>=1e4)return"0"+a
if(a>=1000)return"00"+a
if(a>=100)return"000"+a
if(a>=10)return"0000"+a
return"00000"+a}},
jY:{"^":"a:11;",
$1:function(a){if(a>=10)return""+a
return"0"+a}},
Z:{"^":"d;",
gbe:function(){return H.A(this.$thrownJsError)}},
cH:{"^":"Z;",
k:function(a){return"Throw of null."}},
aY:{"^":"Z;a,b,h:c<,d",
gdX:function(){return"Invalid argument"+(!this.a?"(s)":"")},
gdW:function(){return""},
k:function(a){var z,y,x,w,v,u
z=this.c
y=z!=null?" ("+z+")":""
z=this.d
x=z==null?"":": "+H.b(z)
w=this.gdX()+y+x
if(!this.a)return w
v=this.gdW()
u=P.eN(this.b)
return w+v+": "+H.b(u)},
A:{
G:function(a){return new P.aY(!1,null,null,a)},
cp:function(a,b,c){return new P.aY(!0,a,b,c)},
l:function(a){return new P.aY(!1,null,a,"Must not be null")}}},
dM:{"^":"aY;e,f,a,b,c,d",
gdX:function(){return"RangeError"},
gdW:function(){var z,y,x
z=this.e
if(z==null){z=this.f
y=z!=null?": Not less than or equal to "+H.b(z):""}else{x=this.f
if(x==null)y=": Not greater than or equal to "+H.b(z)
else if(x>z)y=": Not in range "+H.b(z)+".."+H.b(x)+", inclusive"
else y=x<z?": Valid value range is empty":": Only valid value is "+H.b(z)}return y},
A:{
me:function(a){return new P.dM(null,null,!1,null,null,a)},
c4:function(a,b,c){return new P.dM(null,null,!0,a,b,"Value not in range")},
X:function(a,b,c,d,e){return new P.dM(b,c,!0,a,d,"Invalid value")},
mf:function(a,b,c,d,e){if(a<b||a>c)throw H.c(P.X(a,b,c,d,e))},
c5:function(a,b,c,d,e,f){if(0>a||a>c)throw H.c(P.X(a,0,c,"start",f))
if(a>b||b>c)throw H.c(P.X(b,a,c,"end",f))
return b}}},
kK:{"^":"aY;e,l:f>,a,b,c,d",
gdX:function(){return"RangeError"},
gdW:function(){if(J.bQ(this.b,0))return": index must not be negative"
var z=this.f
if(z===0)return": no indices are valid"
return": index should be less than "+H.b(z)},
A:{
cB:function(a,b,c,d,e){var z=e!=null?e:J.aF(b)
return new P.kK(b,z,!0,a,c,"Index out of range")}}},
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
return"Concurrent modification during iteration: "+H.b(P.eN(z))+"."}},
lD:{"^":"d;",
k:function(a){return"Out of Memory"},
gbe:function(){return},
$isZ:1},
fB:{"^":"d;",
k:function(a){return"Stack Overflow"},
gbe:function(){return},
$isZ:1},
jB:{"^":"Z;a",
k:function(a){var z=this.a
return z==null?"Reading static variable during its initialization":"Reading static variable '"+H.b(z)+"' during its initialization"}},
pi:{"^":"d;a",
k:function(a){var z=this.a
if(z==null)return"Exception"
return"Exception: "+H.b(z)}},
eS:{"^":"d;a,b,c",
k:function(a){var z,y,x
z=this.a
y=""!==z?"FormatException: "+z:"FormatException"
x=this.b
if(typeof x!=="string")return y
if(x.length>78)x=C.b.aC(x,0,75)+"..."
return y+"\n"+x}},
kj:{"^":"d;h:a<,fb,$ti",
k:function(a){return"Expando:"+H.b(this.a)},
i:function(a,b){var z,y
z=this.fb
if(typeof z!=="string"){if(b==null||typeof b==="boolean"||typeof b==="number"||typeof b==="string")H.f(P.cp(b,"Expandos are not allowed on strings, numbers, booleans or null",null))
return z.get(b)}y=H.dI(b,"expando$values")
return y==null?null:H.dI(y,z)},
n:function(a,b,c){var z,y
z=this.fb
if(typeof z!=="string")z.set(b,c)
else{y=H.dI(b,"expando$values")
if(y==null){y=new P.d()
H.ff(b,"expando$values",y)}H.ff(y,z,c)}}},
bu:{"^":"d;"},
u:{"^":"M;",$isS:1,
$asS:function(){return[P.M]}},
"+int":0,
y:{"^":"d;$ti",
aP:function(a,b){return H.bw(this,b,H.x(this,"y",0),null)},
bY:["dN",function(a,b){return new H.J(this,b,[H.x(this,"y",0)])}],
a1:function(a,b){var z
for(z=this.gZ(this);z.t();)if(J.i(z.gF(),b))return!0
return!1},
L:function(a,b){var z
for(z=this.gZ(this);z.t();)b.$1(z.gF())},
bi:function(a,b,c){var z,y
for(z=this.gZ(this),y=b;z.t();)y=c.$2(y,z.gF())
return y},
by:function(a,b){return P.T(this,b,H.x(this,"y",0))},
cd:function(a){return this.by(a,!0)},
bz:function(a){return P.b_(this,H.x(this,"y",0))},
gl:function(a){var z,y
z=this.gZ(this)
for(y=0;z.t();)++y
return y},
gK:function(a){return!this.gZ(this).t()},
gak:function(a){return!this.gK(this)},
dK:function(a,b){return H.n2(this,b,H.x(this,"y",0))},
gE:function(a){var z,y
z=this.gZ(this)
if(!z.t())throw H.c(H.a9())
do y=z.gF()
while(z.t())
return y},
gc1:function(a){var z,y
z=this.gZ(this)
if(!z.t())throw H.c(H.a9())
y=z.gF()
if(z.t())throw H.c(H.dm())
return y},
an:function(a,b){var z,y,x
if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(P.l("index"))
if(b<0)H.f(P.X(b,0,null,"index",null))
for(z=this.gZ(this),y=0;z.t();){x=z.gF()
if(b===y)return x;++y}throw H.c(P.cB(b,this,"index",null,y))},
k:function(a){return P.kV(this,"(",")")}},
cE:{"^":"d;$ti"},
K:{"^":"d;$ti",$isy:1,$isV:1},
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
gv:function(a){return H.ax(this)},
k:function(a){return H.cJ(this)},
gbm:function(a){return new H.ar(H.hN(this),null)},
toString:function(){return this.k(this)}},
bb:{"^":"d;"},
bA:{"^":"V;$ti"},
aT:{"^":"d;"},
q:{"^":"d;",$isS:1,
$asS:function(){return[P.q]},
$isdF:1},
"+String":0,
bF:{"^":"d;w<",
gl:function(a){return this.w.length},
gK:function(a){return this.w.length===0},
gak:function(a){return this.w.length!==0},
k:function(a){var z=this.w
return z.charCodeAt(0)==0?z:z},
A:{
fG:function(a,b,c){var z=J.af(b)
if(!z.t())return a
if(c.length===0){do a+=H.b(z.gF())
while(z.t())}else{a+=H.b(z.gF())
for(;z.t();)a=a+c+H.b(z.gF())}return a},
nU:function(a){return new P.bF(a)}}}}],["","",,P,{"^":"",fr:{"^":"d;"}}],["","",,P,{"^":"",
cK:function(a){return C.H},
py:{"^":"d;",
ab:function(a){if(a<=0||a>4294967296)throw H.c(P.me("max must be in range 0 < max \u2264 2^32, was "+a))
return Math.random()*a>>>0},
fX:function(){return Math.random()}}}],["","",,S,{"^":"",jq:{"^":"d;a,b,$ti",
i:function(a,b){return this.b.i(0,b)},
a2:function(a){return this.b.a2(a)},
L:function(a,b){return this.b.L(0,b)},
gK:function(a){var z=this.b
return z.gK(z)},
gak:function(a){var z=this.b
return z.gak(z)},
gl:function(a){var z=this.b
return z.gl(z)},
n:function(a,b,c){this.i5()
this.b.n(0,b,c)},
k:function(a){return J.h(this.b)},
i5:function(){if(!this.a)return
this.a=!1
this.b=P.c2(this.b,H.m(this,0),H.m(this,1))},
$isD:1}}],["","",,A,{"^":"",jr:{"^":"d;a,b,$ti",
gl:function(a){return this.b.a},
c7:function(a){return this.b.c7(a)},
a1:function(a,b){return this.b.a1(0,b)},
L:function(a,b){return this.b.L(0,b)},
gK:function(a){return this.b.a===0},
gak:function(a){return this.b.a!==0},
gZ:function(a){var z,y
z=this.b
y=new P.ac(z,z.r,null,null,[null])
y.c=z.e
return y},
gE:function(a){var z=this.b
return z.gE(z)},
aP:function(a,b){var z=this.b
z.toString
return new H.bt(z,b,[H.m(z,0),null])},
bz:function(a){var z,y
z=this.b
y=z.e4()
y.aq(0,z)
return y},
q:function(a,b){this.iq()
return this.b.q(0,b)},
k:function(a){return J.h(this.b)},
iq:function(){if(!this.a)return
this.a=!1
this.b=P.b_(this.b,H.m(this,0))},
$isbA:1,
$isV:1}}],["","",,S,{"^":"",de:{"^":"d;fd:a<,b,$ti",
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
if(!J.i(w,x[v]))return!1}return!0},
k:function(a){return J.h(this.a)},
i:function(a,b){var z=this.a
if(b>>>0!==b||b>=z.length)return H.e(z,b)
return z[b]},
gl:function(a){return this.a.length},
bG:function(a,b,c){var z=this.a
return(z&&C.a).bG(z,b,c)},
b7:function(a,b){return this.bG(a,b,0)},
gZ:function(a){var z=this.a
return new J.br(z,z.length,0,null,[H.m(z,0)])},
aP:function(a,b){var z=this.a
z.toString
return new H.an(z,b,[H.m(z,0),null])},
a1:function(a,b){var z=this.a
return(z&&C.a).a1(z,b)},
L:function(a,b){var z=this.a
return(z&&C.a).L(z,b)},
bz:function(a){var z=this.a
z.toString
return P.b_(z,H.m(z,0))},
gK:function(a){return this.a.length===0},
gak:function(a){return this.a.length!==0},
gE:function(a){var z=this.a
return(z&&C.a).gE(z)},
a9:function(){if(new H.ar(H.U(H.m(this,0)),null).u(0,C.m))throw H.c(new P.P('explicit element type required, for example "new BuiltList<int>"'))}},L:{"^":"d;fd:a<,b,$ti",
p:function(){var z,y
z=this.b
if(z==null){z=this.a
y=new S.de(z,null,this.$ti)
y.a9()
this.a=z
this.b=y
z=y}return z},
m:function(a){if(H.aM(a,"$isde",this.$ti,null)){this.a=a.gfd()
this.b=a}else{this.a=P.T(a,!0,H.m(this,0))
this.b=null}},
i:function(a,b){var z=this.a
if(b>>>0!==b||b>=z.length)return H.e(z,b)
return z[b]},
n:function(a,b,c){var z
if(c==null)H.f(P.G("null element"))
z=this.gec()
if(b>>>0!==b||b>=z.length)return H.e(z,b)
z[b]=c},
q:function(a,b){var z
if(b==null)H.f(P.G("null element"))
z=this.gec();(z&&C.a).q(z,b)},
a7:function(a,b){var z=this.gec();(z&&C.a).a7(z,b)},
aP:function(a,b){var z=this.a
z.toString
z=new H.an(z,b,[H.m(z,0),null]).by(0,!0)
this.a=z
this.b=null
this.i0(z)},
gec:function(){if(this.b!=null){this.a=P.T(this.a,!0,H.m(this,0))
this.b=null}return this.a},
a9:function(){if(new H.ar(H.U(H.m(this,0)),null).u(0,C.m))throw H.c(new P.P('explicit element type required, for example "new ListBuilder<int>"'))},
i0:function(a){var z,y,x,w
for(z=a.length,y=H.m(this,0),x=0;x<a.length;a.length===z||(0,H.ak)(a),++x){w=a[x]
if(!H.d3(w,y))throw H.c(P.G("invalid element: "+H.b(w)))}}}}],["","",,A,{"^":"",ct:{"^":"d;ip:a<,b,c,d,$ti",
a_:function(a){var z=new A.dx(null,null,this.$ti)
z.cp()
z.m(this)
a.$1(z)
return z.p()},
B:function(){return new S.jq(!0,this.a,this.$ti)},
gv:function(a){var z=this.b
if(z==null){z=this.a.gc5()
z=H.bw(z,new A.jb(this),H.x(z,"y",0),null)
z=P.T(z,!1,H.x(z,"y",0))
C.a.eO(z)
z=X.bp(z)
this.b=z}return z},
u:function(a,b){var z,y,x,w,v
if(b==null)return!1
if(b===this)return!0
z=J.n(b)
if(!z.$isct)return!1
y=b.a
x=this.a
if(y.gl(y)!==x.gl(x))return!1
z=z.gv(b)
w=this.gv(this)
if(z==null?w!=null:z!==w)return!1
z=this.c
if(z==null){z=x.gc5()
this.c=z}z=z.gZ(z)
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
cp:function(){if(new H.ar(H.U(H.m(this,0)),null).u(0,C.m))throw H.c(new P.P('explicit key type required, for example "new BuiltMap<int, int>"'))
if(new H.ar(H.U(H.m(this,1)),null).u(0,C.m))throw H.c(new P.P('explicit value type required, for example "new BuiltMap<int, int>"'))}},jb:{"^":"a:0;a",
$1:function(a){var z,y
z=J.j(a)
y=J.j(this.a.a.i(0,a))
return X.d0(X.aU(X.aU(0,J.j(z)),J.j(y)))}},dx:{"^":"d;a,b,$ti",
p:function(){var z=this.b
if(z==null){z=new A.ct(this.a,null,null,null,this.$ti)
z.cp()
this.b=z}return z},
m:function(a){var z
if(H.aM(a,"$isct",this.$ti,null)){this.b=a
this.a=a.gip()}else if(!!a.$isct){z=P.c2(a.a,H.m(this,0),H.m(this,1))
this.b=null
this.a=z}else if(!!a.$isD){z=P.c2(a,H.m(this,0),H.m(this,1))
this.b=null
this.a=z}else throw H.c(P.G("expected Map or BuiltMap, got "+H.b(a.gbm(a))))},
i:function(a,b){return this.a.i(0,b)},
n:function(a,b,c){if(c==null)H.f(P.G("null value"))
this.giC().n(0,b,c)},
giC:function(){if(this.b!=null){this.a=P.c2(this.a,H.m(this,0),H.m(this,1))
this.b=null}return this.a},
cp:function(){if(new H.ar(H.U(H.m(this,0)),null).u(0,C.m))throw H.c(new P.P('explicit key type required, for example "new MapBuilder<int, int>"'))
if(new H.ar(H.U(H.m(this,1)),null).u(0,C.m))throw H.c(new P.P('explicit value type required, for example "new MapBuilder<int, int>"'))}}}],["","",,L,{"^":"",df:{"^":"d;iE:a<,b,$ti",
a_:function(a){var z=new L.bf(null,null,this.$ti)
z.bt()
z.m(this)
a.$1(z)
return z.p()},
gv:function(a){var z=this.b
if(z==null){z=this.a
z.toString
z=P.T(new H.bt(z,new L.jc(),[H.m(z,0),null]),!1,null)
C.a.eO(z)
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
return y.jc(b)},
k:function(a){return J.h(this.a)},
gl:function(a){return this.a.a},
c7:function(a){return this.a.c7(a)},
gZ:function(a){var z,y
z=this.a
y=new P.ac(z,z.r,null,null,[null])
y.c=z.e
return y},
aP:function(a,b){var z=this.a
z.toString
return new H.bt(z,b,[H.m(z,0),null])},
a1:function(a,b){return this.a.a1(0,b)},
L:function(a,b){return this.a.L(0,b)},
bz:function(a){return new A.jr(!0,this.a,this.$ti)},
gK:function(a){return this.a.a===0},
gak:function(a){return this.a.a!==0},
gE:function(a){var z=this.a
return z.gE(z)},
bt:function(){if(new H.ar(H.U(H.m(this,0)),null).u(0,C.m))throw H.c(new P.P('explicit element type required, for example "new BuiltSet<int>"'))}},jc:{"^":"a:0;",
$1:function(a){return J.j(a)}},bf:{"^":"d;a,b,$ti",
p:function(){var z=this.b
if(z==null){z=new L.df(this.a,null,this.$ti)
z.bt()
this.b=z}return z},
m:function(a){var z,y,x,w
if(H.aM(a,"$isdf",this.$ti,null)){this.a=a.giE()
this.b=a}else{z=H.m(this,0)
y=P.W(null,null,null,z)
for(x=J.af(a);x.t();){w=x.gF()
if(H.d3(w,z))y.q(0,w)
else throw H.c(P.G("iterable contained invalid element: "+H.b(w)))}this.b=null
this.a=y}},
q:function(a,b){if(b==null)H.f(P.G("null element"))
this.gfk().q(0,b)},
aP:function(a,b){var z=this.a
z.toString
z=P.b_(new H.bt(z,b,[H.m(z,0),null]),null)
this.b=null
this.a=z
this.iF(z)},
gfk:function(){if(this.b!=null){this.a=P.b_(this.a,H.m(this,0))
this.b=null}return this.a},
bt:function(){if(new H.ar(H.U(H.m(this,0)),null).u(0,C.m))throw H.c(new P.P('explicit element type required, for example "new SetBuilder<int>"'))},
iF:function(a){var z,y,x
for(z=new P.ac(a,a.r,null,null,[null]),z.c=a.e,y=H.m(this,0);z.t();){x=z.d
if(!H.d3(x,y))throw H.c(P.G("invalid element: "+H.b(x)))}}}}],["","",,Y,{"^":"",
k:function(a,b){if(typeof b!=="number")return H.v(b)
a=536870911&a+b
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
R:function(a){a=536870911&a+((67108863&a)<<3)
a^=a>>>11
return 536870911&a+((16383&a)<<15)}}],["","",,N,{"^":"",mC:{"^":"mA;ch,cx,au:cy@,b1:db@,bp:dx@,b,c,d,e,f,r,x,y,z,Q,a",
h3:function(){var z=$.$get$cl()
z.n(0,"game",this.cx)
z.n(0,"hitpoints",this.cy)
z.n(0,"stamina",this.db)
z.n(0,"gold",this.dx)},
jJ:function(){var z,y,x,w
this.cx=null
this.cy=Z.bD("Health",new N.mF(),"#CCCCCC","Your physical state",100,0,!0,P.aN)
z=P.u
this.db=Z.bD("Stamina",new N.mG(),"#CCCCCC","Spare physical energy",0,0,!0,z)
z=Z.bD("Gold",new N.mH(),"#CCCCCC","Gold coins",0,0,!0,z)
this.dx=z
y=$.$get$bN()
x=this.cy
w=this.db
y=new O.eM(N.ba("EdgeheadGame"),null,!1,null,null,null,null,null,null,null,null,new Y.a1(H.r([],[Y.a7]),0,P.aR()),x,w,z,O.ti(),O.th(),O.tg(),y,this.ghC(),new P.bF(""),!1,null)
y.hA()
this.cx=y
y.x="endGame"
$.$get$ch().q(0,0)},
hN:function(){var z,y
z=new O.cP([[null,P.ah(["goto","gameLoop"])]],0,null,!1,!1)
y=this.b.a
y.n(0,"start",z)
z.a="start"
z=new O.cP([new N.mE(this),[null,P.ah(["goto","gameLoop"])]],0,null,!1,!1)
y.n(0,"gameLoop",z)
z.a="gameLoop"
z=new O.cP(['<p class="meta">\n  Hit <strong>Restart</strong> (top left) to play again. It will be different.\n</p>'],0,null,!1,!1)
y.n(0,"endGame",z)
z.a="endGame"
this.c=y.i(0,"start")},
A:{
mD:function(){var z,y,x,w
z=Z.bD("Health",new N.r3(),"#CCCCCC","Your physical state",100,0,!0,P.aN)
y=P.u
x=Z.bD("Stamina",new N.r4(),"#CCCCCC","Spare physical energy",0,0,!0,y)
y=Z.bD("Gold",new N.r6(),"#CCCCCC","Gold coins",0,0,!0,y)
w=P.q
z=new N.mC("net.filiph.edgehead.0.0.1",null,z,x,y,new O.mI(new H.O(0,null,null,null,null,null,0,[w,O.cP])),null,null,null,P.W(null,null,null,w),!1,null,-9999,null,null,null)
z.hN()
return z}}},r3:{"^":"a:18;",
$1:function(a){var z=J.n(a)
if(z.u(a,0))return"\ud83d\udc80"
if(z.bZ(a,0.5))return"\ud83d\ude23"
if(z.aK(a,1))return"\ud83d\ude27"
return"\ud83d\ude10"}},r4:{"^":"a:9;",
$1:function(a){return H.b(a)+" \ud83d\udd06"}},r6:{"^":"a:9;",
$1:function(a){return H.b(a)+" \ud83d\udcb0"}},mE:{"^":"a:19;a",
$0:function(){var z=0,y=P.aw(),x=this
var $async$$0=P.at(function(a,b){if(a===1)return P.az(b,y)
while(true)switch(z){case 0:z=2
return P.as(x.a.cx.bl(),$async$$0)
case 2:return P.aA(null,y)}})
return P.aB($async$$0,y)}},mF:{"^":"a:18;",
$1:function(a){var z=J.n(a)
if(z.u(a,0))return"\ud83d\udc80"
if(z.bZ(a,0.5))return"\ud83d\ude23"
if(z.aK(a,1))return"\ud83d\ude27"
return"\ud83d\ude10"}},mG:{"^":"a:9;",
$1:function(a){return H.b(a)+" \ud83d\udd06"}},mH:{"^":"a:9;",
$1:function(a){return H.b(a)+" \ud83d\udcb0"}}}],["","",,M,{"^":"",bW:{"^":"d;"},kd:{"^":"d;"},oF:{"^":"bW;a,b",
a_:function(a){var z=new M.dX(null,!1,0)
z.m(this)
a.$1(z)
return z.p()},
u:function(a,b){if(b==null)return!1
if(b===this)return!0
if(!(b instanceof M.bW))return!1
return this.a===b.a&&this.b===b.b},
gv:function(a){return Y.R(Y.k(Y.k(0,C.K.gv(this.a)),this.b&0x1FFFFFFF))},
k:function(a){return"EdgeheadGlobalState {hasKegOfBeer="+String(this.a)+",\nbloodrockFollowers="+C.d.k(this.b)+",\n}"}},dX:{"^":"kd;c,a,b",
gbI:function(){var z=this.c
if(z!=null){this.a=z.a
this.b=this.c.b
this.c=null}return this},
m:function(a){this.c=a},
p:function(){var z,y
z=this.c
if(z==null){this.gbI()
y=this.a
this.gbI()
z=new M.oF(y,this.b)}this.m(z)
return z}}}],["","",,O,{"^":"",
uR:[function(a){var z,y
z=a.gc0()
y=a.gbR()
if(typeof y!=="number")return H.v(y)
return z-2*y},"$1","d5",2,0,26],
v1:[function(a){var z,y,x
z=a.gc0()
y=a.gcP()
x=a.gbR()
if(typeof x!=="number")return H.v(x)
return z+y-x},"$1","hD",2,0,26],
eM:{"^":"li;y,z,Q,ch,cx,cy,db,dx,dy,bA:fr<,fx,eQ:fy<,au:go<,b1:id<,bp:k1<,a,b,c,d,e,f,r,x",
hA:function(){var z,y,x,w,v,u
z=P.bv(C.q,null)
y=$.$get$ci()
this.cy=R.b6(1000,"orc",O.d5(),null,new G.ca("sword",1,1,!0,!1,z),null,0,2,0,!1,2,!1,C.r,0,y)
this.db=R.b6(1001,"goblin",O.d5(),null,new G.ca("scimitar",1,1,!0,!1,P.bv(C.q,null)),null,0,1,0,!1,1,!1,C.r,0,y)
y=new S.L(null,null,[Q.w])
y.a9()
y.m([new Q.w("kill_agruth","","",null)])
this.dx=new K.c7(y.p(),"preStartBook",new O.k4(),new O.k5(),null,null,"ground")
y=R.b6(1,"Filip",null,"preStartBook",null,null,0,2,1000,!0,2,!0,C.B,1,null)
this.ch=y
z=y.r
y=y.cx
if(typeof z!=="number")return z.cV()
if(typeof y!=="number")return H.v(y)
this.go.sac(z/y)
this.id.sac(this.ch.fx)
this.k1.sac(this.ch.f)
this.cx=R.b6(100,"Briana",null,this.dx.b,null,this.ch.x,0,2,0,!1,2,!0,C.X,0,null)
this.dy=F.fm(this.dx,!1)
y=K.c7
x=P.T($.$get$hu(),!0,y)
C.a.aq(x,[this.dx,$.$get$eg()])
w=new M.dX(null,!1,0).p()
z=this.ch
v=this.cx
u=this.dy
v=P.b_([z,v],R.F)
z=P.b1(null,O.cn)
u=new A.a8(v,P.W(null,null,null,U.am),w,z,P.b_(x,y),P.T([u],!0,S.a0),0,null)
this.fr=u
y=new Y.a1(H.r([],[Y.a7]),0,P.aR())
y.b=u.r
this.fx=new B.bx(u,null,y,1,1,!0,!1,!1,0)},
cS:function(){var z=0,y=P.aw(),x,w=this,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
var $async$cS=P.at(function(a,b){if(a===1)return P.az(b,y)
while(true)switch(z){case 0:v=w.fy
u=w.gjo()
if(v.h0(u)){z=1
break}t=w.fr.a8(w.ch.x)
s=t.gau()
r=t.gfV()
if(typeof s!=="number"){x=s.cV()
z=1
break}if(typeof r!=="number"){x=H.v(r)
z=1
break}w.go.sac(s/r)
w.id.sac(t.gb1())
w.k1.sac(t.gbp())
r=w.y
r.fP("update() for world at time "+w.fr.r)
s=w.fr.f
if(s.length===0){w.r=!0
v.G(0,"\n\n",!0)
if(w.fr.jE(w.ch.x))v.G(0,"TO BE CONTINUED.",!0)
else v.G(0,"You died.",!0)
w.f.w+=v.c9()
z=1
break}q=C.a.gE(s)
p=q.dE(w.fr)
s=w.fr
o=N.ba("ActorPlanner")
n=new H.O(0,null,null,null,null,null,0,[null,null])
m=p==null
l=m?p:p.gj()
k=new Y.a1(H.r([],[Y.a7]),0,P.aR())
k.b=s.r
j=new G.iu(o,l,new B.bx(s,null,k,1,1,!0,!1,!1,0),0,!1,n)
if(m)H.f(P.G("Called ActorPlanner with actor == null. That may mean that a Situation returns getCurrentActor as null. Some action that you added should make sure it removes the Situation. World: "+J.h(s)+". Situation: "+H.b(s.gje())))
z=3
return P.as(j.kd(),$async$cS)
case 3:if(n.gK(n)){o.eH("There are no actions available for actorId="+H.b(l)+".")
m="Actions not available for "+H.b(l)+" and "
l=J.n(s)
s="PlanConsequence<"+l.gv(s)+", "+l.k(s)+", "+C.t.k(null)
o.bF(m+(s+", 1, 0, >")+".")}s=Z.lK(n)
i=new Z.lJ(new P.h3(n,[null,null]),s)
if(n.gK(n))$.$get$by().eH("Created with no recommendations.")
if(s.length===0){r.dI("No recommendation for "+H.b(p.gh()))
r.dI(new O.k7(w))
w.fr.fE(q.gj());++w.fr.r
z=1
break}z=p.gH()===!0?4:6
break
case 4:u=s.length
if(u>1)for(h=0;o=s.length,h<o;o===u||(0,H.ak)(s),++h);r.bF("planner.generateTable for "+H.b(p.gh()))
j.eI().L(0,new O.k8(w))
u=i.h2(q.gfU(),O.hD())
u.toString
g=P.T(u,!1,H.x(u,"y",0))
if(g.length!==0&&C.a.bO(g,new O.k9())){w.f.w+=v.c9()
C.a.sl(v.a,0)}v=new O.ka(new O.kc())
u=g.length-1
if(u-0<=32)H.fA(g,0,u,v)
else H.fz(g,0,u,v)
for(v=g.length,u=w.c,h=0;h<g.length;g.length===v||(0,H.ak)(g),++h){f=g[h]
u.$3$helpMessage$script(f.gY(),f.gP(),new O.kb(w,p,f))}z=1
break
z=5
break
case 6:s=p.gfD()
z=7
return P.as(w.ci(i.kc(s==null?O.hD():s),p,v),$async$cS)
case 7:case 5:v.h0(u)
case 1:return P.aA(x,y)}})
return P.aB($async$cS,y)},
ci:function(a,b,c){var z=0,y=P.aw(),x,w=this,v,u,t
var $async$ci=P.at(function(d,e){if(d===1)return P.az(e,y)
while(true)switch(z){case 0:v=a.dd(b,w.fx,w.fr)
u=P.T(v,!0,H.x(v,"y",0))
z=b.gH()===!0?3:5
break
case 3:z=6
return P.as(w.d2(a,b,u),$async$ci)
case 6:z=4
break
case 5:t=S.mb(new H.an(u,new O.k1(),[H.m(u,0),null]),1)
if(t>=u.length){x=H.e(u,t)
z=1
break}w.fx=u[t]
case 4:C.a.aq(c.a,w.fx.geQ().a)
w.fr=w.fx.gbA()
v=w.y
v.bF(new O.k2(a,b))
v.aa(new O.k3(w,b))
case 1:return P.aA(x,y)}})
return P.aB($async$ci,y)},
d2:function(a,b,c){var z=0,y=P.aw(),x=this,w,v,u,t,s,r,q,p,o,n,m,l
var $async$d2=P.at(function(d,e){if(d===1)return P.az(e,y)
while(true)switch(z){case 0:w=a.O(b,x.fr)
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
case 7:u=C.a.gE(J.h(a.gS()).split("."))
v=a.ai(b,x.fr)
t=a.gV()&&b.jF(a.gS())
s="use "+H.b(u)
x.fg()
z=8
return P.as(x.e.$4$rerollEffectDescription$rerollable(w,v,s,t),$async$d2)
case 8:r=e
t=new H.J(c,new O.jZ(r),[H.m(c,0)])
x.fx=t.gc1(t)
if(r.gkH()===!0){q=A.dW(x.fx.gbA())
q.a4(b.gj(),new O.k_())
v=x.fx
t=v.gfm()
s=H.r([],[Y.a7])
p=new Y.a1(s,0,P.aR())
C.a.aq(s,v.c.a)
s=v.d
o=v.e
n=v.f
m=v.r
l=v.x
v=v.y
p.b=q.r
x.fx=new B.bx(q,t,p,s,o,n,m,l,v)}case 6:case 3:return P.aA(null,y)}})
return P.aB($async$d2,y)}},
k4:{"^":"a:3;",
$3:function(a,b,c){return c.G(0,"UNUSED because this is the first choice",!0)}},
k5:{"^":"a:3;",
$3:function(a,b,c){return H.f(new P.E("Room isn't to be revisited"))}},
k7:{"^":"a:1;a",
$0:function(){var z=this.a.fr.d
return"- how we got here: "+new H.an(z,new O.k6(),[H.m(z,0),null]).cI(0," <- ")}},
k6:{"^":"a:0;",
$1:function(a){return a.gb4()}},
k8:{"^":"a:0;a",
$1:function(a){return this.a.y.bF(a)}},
kc:{"^":"a:27;",
$1:function(a){if(a instanceof Q.I)return H.b(a.b.gh())+" "+a.gY()
return"ZZZZZZ "+a.gY()}},
k9:{"^":"a:0;",
$1:function(a){return a.gY()!==""}},
ka:{"^":"a:7;a",
$2:function(a,b){var z=this.a
return J.bS(z.$1(a),z.$1(b))}},
kb:{"^":"a:19;a,b,c",
$0:function(){var z=0,y=P.aw(),x=this,w
var $async$$0=P.at(function(a,b){if(a===1)return P.az(b,y)
while(true)switch(z){case 0:w=x.a
z=2
return P.as(w.ci(x.c,x.b,w.fy),$async$$0)
case 2:return P.aA(null,y)}})
return P.aB($async$$0,y)}},
k1:{"^":"a:0;",
$1:function(a){return a.gke()}},
k2:{"^":"a:1;a,b",
$0:function(){return H.b(this.b.gh())+" selected "+this.a.gh()}},
k3:{"^":"a:1;a,b",
$0:function(){var z,y
z=this.a.fr.d
y=new H.an(z,new O.k0(),[H.m(z,0),null]).cI(0," <- ")
return"- how "+H.b(this.b.gh())+" got here: "+y}},
k0:{"^":"a:0;",
$1:function(a){return a.gb4()}},
jZ:{"^":"a:0;a",
$1:function(a){return a.geu()===this.a.geu()}},
k_:{"^":"a:0;",
$1:function(a){var z=a.gb1()
if(typeof z!=="number")return z.ax()
a.sb1(z-1)
return a}}}],["","",,Q,{"^":"",
hI:function(a,b,c){return P.aL(function(){var z=a,y=b,x=c
var w=0,v=1,u,t,s,r,q,p
return function $async$hI(d,e){if(d===1){u=e
w=v}while(true)switch(w){case 0:t=y.f
t=t.length!==0?C.a.gE(t):null
s=J.is(t.aJ(y.a,y),new Q.rT(z))
t=J.af(s.a),r=new H.cU(t,s.b,[H.m(s,0)])
case 2:if(!r.t()){w=3
break}q=t.gF()
p=x.$1(q)
if(p.gR()&&!z.ep(q,y)){w=2
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
t=y.dG((t.length!==0?C.a.gE(t):null).gbv()).gjs().a,t=new J.br(t,t.length,0,null,[H.m(t,0)])
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
t=(t.length!==0?C.a.gE(t):null).gbE(),t=t.gZ(t)
case 2:if(!t.t()){w=3
break}w=4
return x.$1(t.d)
case 4:w=2
break
case 3:return P.aJ()
case 1:return P.aK(u)}}})},
rT:{"^":"a:0;a",
$1:function(a){return!J.i(a,this.a)&&a.gaO()}},
a6:{"^":"d;",
dd:function(a,b,c){var z=this
return P.aL(function(){var y=a,x=b,w=c
var v=0,u=1,t,s,r,q,p
return function $async$dd(d,e){if(d===1){t=e
v=u}while(true)switch(v){case 0:s=z.O(y,x.gbA())
r=J.ad(s)
v=r.br(s,0)?2:3
break
case 2:q=A.dW(w)
v=4
return B.fc(q,x,z,z.hX(q,y,w,z.gU(),!0),s,!1,!1,!0)
case 4:case 3:v=r.aK(s,1)?5:6
break
case 5:q=A.dW(w)
p=z.hW(q,y,w,z.gT(),!0)
if(typeof s!=="number")H.v(s)
v=7
return B.fc(q,x,z,p,1-s,!0,!1,!1)
case 7:case 6:return P.aJ()
case 1:return P.aK(t)}}})},
eV:function(a,b,c,d,e,f){var z,y,x,w,v,u,t
a.x=this
z=a.a.aL(0,new Q.it(b))
y=new O.ex(null,null,null,null,null,null,null,null,null,null,null,null)
x=this.gh()
y.ga0().c=x
x=b.gj()
y.ga0().f=x
y.ga0().e=C.O
y.ga0().ch=f
y.ga0().Q=e
x=this.gR()
y.ga0().y=x
x=this.ga3()
y.ga0().z=x
if(!!this.$isI){x=y.ga0()
w=x.r
if(w==null){w=new L.bf(null,null,[P.u])
w.bt()
w.m(C.e)
x.r=w
x=w}else x=w
w=this.b.gj()
if(w==null)H.f(P.G("null element"))
x.gfk().q(0,w)}v=new Y.a1(H.r([],[Y.a7]),0,P.aR())
x=a.f
u=(x.length!==0?C.a.gE(x):null).gj()
a.gv(a);(x.length!==0?C.a.gE(x):null).h_(a,v)
this.a=d.$3(z,a,v)
if(a.d5(u)!=null)a.fE(u);++a.r
w=a.eJ(u)
if(!(w==null))w.fZ(a,v)
a.x=null
while(!0){w=x.length!==0?C.a.gE(x):null
if((w==null?w:w.dE(a))!=null){w=x.length!==0?C.a.gE(x):null
w=!J.i(w==null?w:w.cZ(a),!0)}else w=!0
if(!w)break
if((x.length!==0?C.a.gE(x):null)==null)break
t=C.a.gE(x)
t.dm(a)
C.a.a7(x,t)}if(this.a==null)H.f(new P.E("No description given when executing "+this.k(0)+". You should return it from your world-modifying function."))
x=this.a
y.ga0().d=x
x=a.r
y.ga0().x=x
a.d.ft(y.p())
return v},
hX:function(a,b,c,d,e){return this.eV(a,b,c,d,!1,e)},
hW:function(a,b,c,d,e){return this.eV(a,b,c,d,e,!1)}},
it:{"^":"a:0;a",
$1:function(a){return J.i(a.gj(),this.a.gj())}},
I:{"^":"a6;bR:b<",
gY:function(){var z=new Y.a1(H.r([],[Y.a7]),0,P.aR())
z.fp(0,this.gaj(),this.b)
return z.c9()},
ai:function(a,b){var z=new Y.a1(H.r([],[Y.a7]),0,P.aR())
z.iW(0,this.gao(),this.b,a,!0)
return z.c9()},
k:function(a){var z=this.b
return"EnemyTargetAction<"+this.gaj()+"::enemy="+H.b(z.gj())+"/"+H.b(z.gh())+">"}},
cA:{"^":"a6;",
gY:function(){return this.b.gY()},
k:function(a){return"ExitAction<"+this.b.gY()+">"}},
cC:{"^":"a6;",
gY:function(){var z=new Y.a1(H.r([],[Y.a7]),0,P.aR())
z.fp(0,"pick up <object>",this.b)
return z.c9()},
k:function(a){return"ItemAction<"+this.gY()+">"}},
mm:{"^":"d;a,b",
k:function(a){return this.b},
A:{"^":"uF<"}}}],["","",,O,{"^":"",cn:{"^":"d;",
k:function(a){return"ActionRecord<"+H.b(this.b)+", "+H.b(this.c)+">"}},l9:{"^":"d;a,b",
k:function(a){return this.b}},oB:{"^":"cn;a,fo:b<,b4:c<,d,ds:e<,eS:f<,I:r<,hi:x<,hj:y<,z,hk:Q<",
a_:function(a){var z=new O.ex(null,null,null,null,null,null,null,null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof O.cn))return!1
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
k:function(a){return"ActionRecord {accomplices="+J.h(this.a)+",\nactionName="+J.h(this.b)+",\ndescription="+H.b(J.h(this.c))+",\nknownTo="+J.h(this.d)+",\nprotagonist="+H.b(J.h(this.e))+",\nsufferers="+J.h(this.f)+",\ntime="+J.h(this.r)+",\nwasAggressive="+J.h(this.x)+",\nwasProactive="+J.h(this.y)+",\nwasFailure="+J.h(this.z)+",\nwasSuccess="+J.h(this.Q)+",\n}"}},ex:{"^":"d;a,b,c,d,e,f,r,x,y,z,Q,ch",
gfo:function(){return this.ga0().c},
gb4:function(){return this.ga0().d},
gds:function(){return this.ga0().f},
geS:function(){var z,y
z=this.ga0()
y=z.r
if(y==null){y=new L.bf(null,null,[P.u])
y.bt()
y.m(C.e)
z.r=y
z=y}else z=y
return z},
gI:function(){return this.ga0().x},
ghi:function(){return this.ga0().y},
ghj:function(){return this.ga0().z},
ghk:function(){return this.ga0().ch},
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
z=new O.oB(y,x,w,v,u,t,s,r,q,p,o)
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
return P.bI(new H.J(u,new R.rU(z),[H.m(u,0)]))
case 3:return P.aJ()
case 1:return P.aK(v)}}})},
b6:function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o){var z=new R.ey(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
new R.r_(a,b,j,l,m,e,h,k,n,i,g,d,f,o,c).$1(z)
return z.p()},
rU:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gfI()
y=this.a.gj()
return z==null?y==null:z===y}},
F:{"^":"lp;",
gj7:function(){return!0},
gbw:function(){var z=this.r
if(typeof z!=="number")return z.br()
return z>0},
gbj:function(){return this.d instanceof K.bY},
gb0:function(){return this.dx===C.h},
gad:function(){return this.dx===C.i},
gae:function(){return this.dx===C.l},
jF:function(a){var z=this.fx
if(typeof z!=="number")return z.bH()
return z>=1},
ep:function(a,b){return this.fO(a,b)>0},
fO:function(a,b){var z,y
if(this.es(b)){z=a.gbn()
y=this.fy.a
z=z.gj()
z=y==null?z==null:y===z}else z=!1
if(z)return 1000
if(this.ik(a,b,10))return 1
z=a.gbn()
y=this.fy.a
z=z.gj()
return(y==null?z!=null:y!==z)?1:0},
es:function(a){var z,y
z=a.cc("Confuse",this,!0)
if(z==null)return!1
y=a.kx("Unconfuse",this,!0)
if(y==null)return!0
return y<z},
cY:function(a){var z,y,x,w,v,u,t,s,r,q,p
z=a.a8(this.x)
y=z.gau()
if(typeof y!=="number")return H.v(y)
x=2*y
if(!z.gbw())x-=10
y=z.d
if(!(y instanceof K.bY))x+=4
y=J.aX(y.gac(),2)
if(typeof y!=="number")return H.v(y)
x+=y
for(y=z.ch,w=[null],v=new P.ac(y,y.r,null,null,w),v.c=y.e;v.t();){y=J.aX(v.d.gac(),10)
if(typeof y!=="number")return H.v(y)
x+=y}y=a.a
for(v=y.gZ(y),u=new H.cU(v,new R.iX(this),[H.m(y,0)]),t=0;u.t();){s=v.gF()
r=s.gaO()?2:0
q=s.gau()
if(typeof q!=="number")return H.v(q)
p=J.aX(s.d.gac(),2)
if(typeof p!=="number")return H.v(p)
t=t+r+2*q+p
for(r=s.ch,q=new P.ac(r,r.r,null,null,w),q.c=r.e;q.t();){r=J.aX(q.d.gac(),10)
if(typeof r!=="number")return H.v(r)
t+=r}}return new A.co(x,t,y.bi(0,0,new R.iY(this,a)))},
ik:function(a,b,c){var z=b.ky(a,this,!0)
if(z==null)return!1
return z<=c},
$isb8:1},
lp:{"^":"d+di;"},
r_:{"^":"a:0;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db",
$1:function(a){var z,y
a.gC().y=this.a
a.gC().db=this.b
a.gC().dx=this.d
a.gC().fr=this.e
z=this.f
if(z==null)z=$.$get$ef()
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
iX:{"^":"a:0;a",
$1:function(a){var z,y
z=this.a
if(J.i(a.gbn(),z.fy)){y=a.gj()
z=z.x
z=y==null?z!=null:y!==z}else z=!1
return z}},
iY:{"^":"a:28;a,b",
$2:function(a,b){var z,y
z=b.gaO()?1:0
y=b.gau()
if(typeof y!=="number")return H.v(y)
return J.al(a,(z+y)*this.a.fO(b,this.b))}},
dG:{"^":"d;a,b",
k:function(a){return this.b}},
oC:{"^":"F;a,fD:b<,bv:c<,M:d<,fI:e<,bp:f<,au:r<,j:x<,y,eq:z<,H:Q<,bT:ch<,fV:cx<,h:cy<,dl:db<,al:dx<,J:dy<,fr,b1:fx<,bn:fy<",
a_:function(a){var z=new R.ey(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
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
gv:function(a){return Y.R(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)),J.j(this.f)),J.j(this.r)),J.j(this.x)),J.j(this.y)),J.j(this.z)),J.j(this.Q)),J.j(this.ch)),J.j(this.cx)),J.j(this.cy)),J.j(this.db)),J.j(this.dx)),J.j(this.dy)),C.t.gv(this.fr)),J.j(this.fx)),J.j(this.fy)))},
k:function(a){return"Actor {categories="+J.h(this.a)+",\ncombineFunction="+J.h(this.b)+",\ncurrentRoomName="+J.h(this.c)+",\ncurrentWeapon="+H.b(J.h(this.d))+",\nfollowingActorId="+J.h(this.e)+",\ngold="+J.h(this.f)+",\nhitpoints="+J.h(this.r)+",\nid="+J.h(this.x)+",\ninitiative="+J.h(this.y)+",\nisActive="+J.h(this.z)+",\nisPlayer="+J.h(this.Q)+",\nitems="+J.h(this.ch)+",\nmaxHitpoints="+J.h(this.cx)+",\nname="+J.h(this.cy)+",\nnameIsProperNoun="+J.h(this.db)+",\npose="+J.h(this.dx)+",\npronoun="+J.h(this.dy)+",\nshield="+C.t.k(this.fr)+",\nstamina="+J.h(this.fx)+",\nteam="+J.h(this.fy)+",\n}"}},
ey:{"^":"d;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go",
gfD:function(){return this.gC().c},
gbv:function(){return this.gC().d},
sbv:function(a){this.gC().d=a
return a},
gM:function(){return this.gC().e},
sM:function(a){this.gC().e=a
return a},
gfI:function(){return this.gC().f},
gbp:function(){return this.gC().r},
sbp:function(a){this.gC().r=a
return a},
gau:function(){return this.gC().x},
sau:function(a){this.gC().x=a
return a},
gj:function(){return this.gC().y},
gH:function(){return this.gC().ch},
gbT:function(){return this.gC().cx},
gfV:function(){return this.gC().cy},
gh:function(){return this.gC().db},
sh:function(a){this.gC().db=a
return a},
gdl:function(){return this.gC().dx},
gal:function(){return this.gC().dy},
sal:function(a){this.gC().dy=a
return a},
gJ:function(){return this.gC().fr},
gb1:function(){return this.gC().fy},
sb1:function(a){this.gC().fy=a
return a},
gbn:function(){var z,y
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
z=new R.oC(y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f.p())
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
return z}}}],["","",,A,{"^":"",co:{"^":"d;c0:a<,cP:b<,bR:c<",
ax:function(a,b){return new A.ag(this.a-b.gc0(),this.b-b.gcP(),J.bq(this.c,b.gbR()))},
k:function(a){return"ActorScore<self="+C.k.bW(this.a,2)+",team="+C.k.bW(this.b,2)+",enemy="+J.cm(this.c,2)+">"}},ag:{"^":"d;c0:a<,cP:b<,bR:c<",
gjU:function(){return this.a===-1/0&&this.b===-1/0&&J.i(this.c,-1/0)},
c_:function(a,b){if(typeof b!=="number")return H.v(b)
return new A.ag(this.a*b,this.b*b,J.bR(this.c,b))},
a5:function(a,b){return new A.ag(this.a+b.gc0(),this.b+b.gcP(),J.al(this.c,b.gbR()))},
cV:function(a,b){if(typeof b!=="number")return H.v(b)
return new A.ag(this.a/b,this.b/b,J.aX(this.c,b))},
k:function(a){return"ActorScoreChange<self="+C.k.bW(this.a,2)+",team="+C.k.bW(this.b,2)+",enemy="+J.cm(this.c,2)+">"},
A:{
iW:function(a){var z,y,x,w,v,u,t,s,r
for(z=a.length,y=0,x=0,w=0,v=0,u=0;t=a.length,u<t;t===z||(0,H.ak)(a),++u){s=a[u];++y
x+=s.a
w+=s.b
r=s.c
if(typeof r!=="number")return H.v(r)
v+=r}if(y===0)throw H.c(P.G("Cannot average empty iterable"))
return new A.ag(x/y,w/y,v/y)}}}}],["","",,U,{"^":"",
uf:function(a){switch(a){case C.J:return"spear"
case C.x:return"sword"
case C.y:return"fist"
default:throw H.c(P.G(a))}},
am:{"^":"lq;",
gb4:function(){return U.uf(C.a.gen(this.a))},
gj:function(){return H.ax(this)},
geq:function(){return!0},
gbw:function(){return!1},
gH:function(){return!1},
gdl:function(){return!1},
gJ:function(){return C.p},
gbn:function(){return $.$get$bP()},
$isb8:1},
lq:{"^":"d+di;"},
dl:{"^":"d;a,b",
k:function(a){return this.b}}}],["","",,K,{"^":"",bY:{"^":"bG;h:b<,a"}}],["","",,G,{"^":"",ca:{"^":"bG;h:b<,cf:c<,cQ:d<,cA:e<,fv:f<,a"}}],["","",,L,{"^":"",bG:{"^":"am;",
gfv:function(){return!1},
gcA:function(){return!1},
gjS:function(){return!1},
gb8:function(){return this.gcf()>0},
gfR:function(){return this.gcQ()>0},
gl:function(a){return 2},
gcf:function(){return 0},
gcQ:function(){return 0},
gac:function(){return this.gcf()+this.gcQ()},
$isb8:1}}],["","",,G,{"^":"",li:{"^":"d;",
fg:function(){var z,y
z=this.f
y=z.w
if(y.length!==0){this.b.$1(y.charCodeAt(0)==0?y:y)
z.w=""}},
kT:[function(a){this.f.w+=a},"$1","gjo",2,0,20],
bl:function(){var z=0,y=P.aw(),x,w=this,v,u
var $async$bl=P.at(function(a,b){if(a===1)return P.az(b,y)
while(true)switch(z){case 0:if(w.x==null)throw H.c(new P.E("Cannot run a LoopedEvent before onFinishedGoto is defined."))
if(w.r){w.d.sl(0,0)
w.a.$1(w.x)
z=1
break}v=w.d
u=w.f
case 3:if(!!0){z=4
break}if(!(!w.r&&v.gl(v)===0&&u.w.length===0)){z=4
break}z=5
return P.as(w.cS(),$async$bl)
case 5:z=3
break
case 4:w.fg()
case 1:return P.aA(x,y)}})
return P.aB($async$bl,y)}}}],["","",,B,{"^":"",eJ:{"^":"d;cX:a<,dh:b<,cJ:c<",
k:function(a){return"ConsequenceStats<order="+this.c+", cumProb="+J.cm(this.b,3)+", score="+this.a.k(0)+">"}},bx:{"^":"d;bA:a<,fm:b<,eQ:c<,ke:d<,dh:e<,f,r,eu:x<,cJ:y<",
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
fc:function(a,b,c,d,e,f,g,h){var z,y
z=b==null
y=z?e:J.bR(e,b.gdh())
z=z?0:b.gcJ()+1
d.b=a.r
return new B.bx(a,c,d,e,y,g,f,h,z)}}}}],["","",,G,{"^":"",iu:{"^":"d;a,b,c,d,e,f",
ja:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j
z=this.a
z.aa("...")
z.aa("combining scores")
y=H.r([],[A.ag])
x=new G.iP()
for(w=J.af(a),v=b.a,u=b.b,t=b.c,s=null;w.t();){r=w.gF()
z.aa(new G.iN(r))
if(J.a3(r.gdh(),0.15))if(s==null){z.aa("    - first _bestCase")
s=r}else if(J.a3(x.$1(r.gcX()),x.$1(s.gcX()))){z.aa("    - new _bestCase")
s=r}q=r.gcX()
p=J.bq(q.c,t)
o=r.b
if(typeof o!=="number")return H.v(o)
n=new A.ag((q.a-v)*o,(q.b-u)*o,J.bR(p,o))
z.aa(new G.iO(n))
y.push(n)}m=A.iW(y)
w=s==null
if(w)l=C.D
else{q=s.gcX()
l=new A.ag(q.a-v,q.b-u,J.bq(q.c,t))}w=w?s:s.gcJ()
if(typeof w!=="number")return H.v(w)
k=new A.ag(l.a/w,l.b/w,J.aX(l.c,w))
z.aa("- uplifts average = "+("ActorScoreChange<self="+C.k.bW(m.a,2)+",team="+C.k.bW(m.b,2)+",enemy="+J.cm(m.c,2)+">"))
z.aa("- best = "+k.k(0))
j=k.a5(0,m)
z.aa("- result = "+j.k(0))
return j},
eI:function(){var z=this
return P.aL(function(){var y=0,x=1,w,v,u,t,s
return function $async$eI(a,b){if(a===1){w=b
y=x}while(true)switch(y){case 0:v=z.f,u=v.gc5(),u=u.gZ(u),t=1
case 2:if(!u.t()){y=3
break}s=u.gF()
y=4
return""+t+") "+s.gY()+"\t"+H.b(v.i(0,s))
case 4:++t
y=2
break
case 3:return P.aJ()
case 1:return P.aK(w)}}})},
dn:function(a,b,c){var z=0,y=P.aw(),x=this,w,v,u,t,s,r,q,p,o,n,m
var $async$dn=P.at(function(d,e){if(d===1)return P.az(e,y)
while(true)switch(z){case 0:w=x.f
w.b_(0)
v=x.c
u=v.a
t=u.a.aL(0,new G.iQ(x))
s=t.cY(u)
r=x.a
r.bF("Planning for "+H.b(t.cy)+", initialScore="+s.k(0))
q=new P.b2(x.dZ(t,u).a(),null,null,null)
case 2:if(!q.t()){z=3
break}p=q.c
o=p==null?q.b:p.gF()
r.b5(new G.iR(t,o))
if(o.N(t,u)!==!0){r.b5(new G.iS(o))
z=2
break}z=4
return P.as(x.cm(v,o,b,a,c).cd(0),$async$dn)
case 4:n=e
if(J.eu(n)===!0){r.b5(new G.iT(o))
w.n(0,o,C.E)
z=2
break}r.b5(new G.iU(s,o,n))
m=x.ja(n,s,b)
w.n(0,o,m)
r.b5(new G.iV(o,m))
z=2
break
case 3:x.e=!0
return P.aA(null,y)}})
return P.aB($async$dn,y)},
kd:function(){return this.dn(50,10,null)},
dZ:function(a,b){return P.aL(function(){var z=a,y=b
var x=0,w=1,v,u,t,s,r,q,p,o
return function $async$dZ(c,d){if(c===1){v=d
x=w}while(true)switch(x){case 0:u=y.f
x=2
return P.bI((u.length!==0?C.a.gE(u):null).gbf())
case 2:u=(u.length!==0?C.a.gE(u):null).gaN()
t=u.length
s={func:1,ret:Q.cC,args:[U.am]}
r={func:1,ret:Q.cA,args:[Q.w]}
q={func:1,ret:Q.I,args:[R.F]}
p=0
case 3:if(!(p<u.length)){x=5
break}o=u[p]
x=H.au(o,q)?6:8
break
case 6:x=9
return P.bI(Q.hI(z,y,o))
case 9:x=7
break
case 8:x=H.au(o,r)?10:12
break
case 10:x=13
return P.bI(Q.hJ(z,y,o))
case 13:x=11
break
case 12:x=H.au(o,s)?14:16
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
cm:function(a5,a6,a7,a8,a9){var $async$cm=P.at(function(b0,b1){switch(b0){case 2:u=x
z=u.pop()
break
case 1:v=b1
z=w}while(true)switch(z){case 0:s={}
r=a5.a
q=r.a.aL(0,new G.ix(t))
p=t.a
p.b5("=====")
p.b5(new G.iy(a6,q))
p.b5(new G.iz(a6))
if(a6.N(q,r)!==!0){p.b5("- firstAction not applicable")
z=1
break}o=q.cY(r)
p.b5(new G.iF(a5,o))
p.b5(new G.iG(a5))
n=P.b1(null,B.bx)
m=P.W(null,null,null,A.a8)
l=J.n(r)
k=l.gv(r)
for(j=new P.b2(a6.dd(q,a5,r).a(),null,null,null);j.t();){i=j.c
h=i==null?j.b:i.gF()
if(l.gv(r)!==k)throw H.c(new P.E("Action "+a6.k(0)+" modified world state when producing "+H.b(h)+"."))
n.ay(h)}s.a=0
r=t.b
case 3:if(!!n.gK(n)){z=4
break}++s.a
g=n.dt()
p.aa("----")
p.aa(new G.iH(g))
p.aa(new G.iI(g))
if(g.gcJ()>a7||s.a>a8){p.aa(new G.iJ(s,a7,g))
p.aa(new G.iK(g))
z=4
break}z=g.gbA().f.length===0?5:6
break
case 5:p.aa("- leaf node: world.situations is empty (end of book)")
l=g.a
q=l.a.b6(0,new G.iL(t),new G.iM())
if(q==null){p.aa("- this actor ("+H.b(r)+") has been removed")
z=3
break}f=new B.eJ(q.cY(l),g.e,g.y)
p.aa(new G.iA(f))
z=7
x=[1]
return P.cZ(P.ha(f),$async$cm,y)
case 7:z=3
break
case 6:l=g.a
j=l.f
e=(j.length!==0?C.a.gE(j):null).dE(l)
j=l.a
i=new H.J(j,new G.iB(t),[H.m(j,0)])
d=i.gl(i)
if(d>1)throw H.c(new P.E("World has several duplicates of mainActor: "+J.h(l)))
else if(d===0){p.fP("mainActor "+H.b(r)+" dies and is removed in world - will use defaultScoreWhenDead")
q=null}else q=j.aL(0,new G.iC(t))
c=J.i(e,q)
p.aa("- actor: "+H.b(e.gh())+" (isMain=="+c+")")
j=q==null
p.aa("- mainActor: "+H.b(j?q:q.gh()))
b=j?q:q.cY(l)
if(b==null)b=C.F
f=new B.eJ(b,g.e,g.y)
p.aa(new G.iD(o,f))
p.aa(new G.iE(g))
z=8
x=[1]
return P.cZ(P.ha(f),$async$cm,y)
case 8:p.aa("- generating all actions for "+H.b(e.gh()))
j=n.c
i=n.b
a=n.a
for(a0=new P.b2(t.dZ(e,l).a(),null,null,null);a0.t();){a1=a0.c
a2=a1==null?a0.b:a1.gF()
if(a2.N(e,l)!==!0)continue
for(a1=new P.b2(a2.dd(e,g,l).a(),null,null,null);a1.t();){a3=a1.c
a4=a3==null?a1.b:a3.gF();++t.d
if(J.bQ(a4.gdh(),0.05))continue
if(m.a1(0,a4.gbA()))continue
n.ay(a4)}}p.aa("- added "+(((n.c-n.b&n.a.length-1)>>>0)-((j-i&a.length-1)>>>0))+" new PlanConsequences")
m.q(0,l)
z=3
break
case 4:case 1:return P.cZ(null,0,y)
case 2:return P.cZ(v,1,y)}})
var z=0,y=P.p3($async$cm),x,w=2,v,u=[],t=this,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4
return P.qo(y)}},iP:{"^":"a:31;",
$1:function(a){var z=a.c
if(typeof z!=="number")return H.v(z)
return a.b-z}},iN:{"^":"a:1;a",
$0:function(){return"  - consequence: "+H.b(this.a)}},iO:{"^":"a:1;a",
$0:function(){return"    - uplift = "+this.a.k(0)}},iQ:{"^":"a:0;a",
$1:function(a){return J.i(a.gj(),this.a.b)}},iR:{"^":"a:1;a,b",
$0:function(){return"Evaluating action '"+this.b.gY()+"' for "+H.b(this.a.cy)}},iS:{"^":"a:1;a",
$0:function(){return"- action '"+this.a.gY()+"' isn't applicable"}},iT:{"^":"a:1;a",
$0:function(){return"- action '"+this.a.gY()+"' is possible but we couldn't get to any outcomes while planning. Scoring with negative infinity."}},iU:{"^":"a:1;a,b,c",
$0:function(){return"- action '"+this.b.gY()+"' leads to "+H.b(J.aF(this.c))+" different ConsequenceStats, initialScore="+this.a.k(0)}},iV:{"^":"a:1;a,b",
$0:function(){return"- action '"+this.a.gY()+"' was scored "+H.b(this.b)}},ix:{"^":"a:0;a",
$1:function(a){return J.i(a.gj(),this.a.b)}},iy:{"^":"a:1;a,b",
$0:function(){return"_getConsequenceStats for firstAction '"+this.a.gY()+"' of "+H.b(this.b.gh())}},iz:{"^":"a:1;a",
$0:function(){return"- firstAction == "+H.b(this.a)}},iF:{"^":"a:1;a,b",
$0:function(){var z=this.a
return"- current: initialScore="+this.b.k(0)+", cumProb="+H.b(z.e)+" (prob="+H.b(z.d)+", ord="+z.y+")"}},iG:{"^":"a:1;a",
$0:function(){var z=this.a
return"- initial action: "+C.b.c_(" ",z.y)+"- "+J.h(z.b)}},iH:{"^":"a:1;a",
$0:function(){return"evaluating a PlanConsequence of '"+this.a.gfm().gY()+"'"}},iI:{"^":"a:1;a",
$0:function(){var z=this.a.gbA().f
return"- situation: "+H.b(J.ik(z.length!==0?C.a.gE(z):null))}},iJ:{"^":"a:1;a,b,c",
$0:function(){return"- order ("+this.c.gcJ()+") higher than maximum ("+this.b+"), or consequences ("+this.a.a+") higher than maximum"}},iK:{"^":"a:1;a",
$0:function(){var z=this.a.gbA().d
return"- how we got here: "+new H.an(z,new G.iw(),[H.m(z,0),null]).cI(0," <- ")}},iw:{"^":"a:0;",
$1:function(a){return a.gb4()}},iL:{"^":"a:0;a",
$1:function(a){return J.i(a.gj(),this.a.b)}},iM:{"^":"a:1;",
$0:function(){return}},iA:{"^":"a:1;a",
$0:function(){return"- "+this.a.k(0)}},iB:{"^":"a:0;a",
$1:function(a){return J.i(a.gj(),this.a.b)}},iC:{"^":"a:0;a",
$1:function(a){return J.i(a.gj(),this.a.b)}},iD:{"^":"a:1;a,b",
$0:function(){return"- mainActor's score == "+this.b.k(0)+" (initial="+this.a.k(0)+")"}},iE:{"^":"a:1;a",
$0:function(){var z=this.a.gbA().d
return"- how we got here: "+new H.an(z,new G.iv(),[H.m(z,0),null]).cI(0," <- ")}},iv:{"^":"a:0;",
$1:function(a){return a.gb4()}}}],["","",,Z,{"^":"",lJ:{"^":"d;a,b",
gbf:function(){return this.b},
gK:function(a){return this.b.length===0},
h2:function(a,b){var z=this
return P.aL(function(){var y=a,x=b
var w=0,v=2,u,t,s,r,q,p,o,n,m,l
return function $async$h2(c,d){if(c===1){u=d
w=v}while(true)switch(w){case 0:t=z.b
w=t.length<=y?3:4
break
case 3:w=5
return P.bI(t)
case 5:w=1
break
case 4:s=z.ic(new Z.lM())
r=z.dY(new Z.lN(),[s])
q=z.dY(new Z.lO(),[s,r])
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
break}C.a.cg(t,new Z.lP(z,x))
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
kc:function(a){var z,y,x,w,v,u,t,s,r,q,p
z={}
y=this.b
if(y.length===1)return C.a.gc1(y)
C.a.cg(y,new Z.lQ(this,a))
x=this.a.a
w=x.gce().bi(0,1/0,new Z.lR(a))
v=x.gce().bi(0,-1/0,new Z.lS(a))
x=J.ad(v)
u=J.ad(w)
t=u.ax(w,J.bR(x.ax(v,w),0.1))
z.a=t
if(u.u(w,v)){t=J.bq(t,1)
z.a=t
u=t}else u=t
s=x.ax(v,u)
r=P.lg(y.length,new Z.lT(z,this,a,s),!1,P.M)
q=new H.an(r,new Z.lU(C.a.bi(r,0,Z.hY())),[H.m(r,0),null]).by(0,!1)
z=C.a.bi(q,0,Z.hY())
if(typeof z!=="number")return H.v(z)
u=q.length
x=u-1
if(x<0)return H.e(q,x)
z=J.al(q[x],1000-z)
if(x>=q.length)return H.e(q,x)
q[x]=z
p=S.mc(q,1000)
if(p>=y.length)return H.e(y,p)
return y[p]},
dY:function(a,b){var z,y,x,w,v,u,t
for(z=this.b,y=z.length,x=this.a.a,w=null,v=null,u=0;u<z.length;z.length===y||(0,H.ak)(z),++u){t=z[u]
if(C.a.a1(b,t))continue
if(w==null||J.a3(a.$1(x.i(0,t)),v)){v=a.$1(x.i(0,t))
w=t
continue}}return w},
ic:function(a){return this.dY(a,C.e)},
A:{
lK:function(a){var z,y,x
z=a.gc5()
y=H.x(z,"y",0)
x=P.T(new H.J(z,new Z.lL(a),[y]),!1,y)
if(x.length===0)$.$get$by().eH("After removing actions scored by undefined, there are no recommendations.")
return x},
uD:[function(a,b){return J.al(a,b)},"$2","hY",4,0,42]}},lM:{"^":"a:0;",
$1:function(a){return a.gc0()}},lN:{"^":"a:0;",
$1:function(a){return J.ig(a.gbR())}},lO:{"^":"a:0;",
$1:function(a){return a.gcP()}},lP:{"^":"a:7;a,b",
$2:function(a,b){var z,y
z=this.b
y=this.a.a.a
return-J.bS(z.$1(y.i(0,a)),z.$1(y.i(0,b)))}},lQ:{"^":"a:7;a,b",
$2:function(a,b){var z,y
z=this.b
y=this.a.a.a
return-J.bS(z.$1(y.i(0,a)),z.$1(y.i(0,b)))}},lR:{"^":"a:7;a",
$2:function(a,b){var z=this.a.$1(b)
return Math.min(H.d2(a),H.d2(z))}},lS:{"^":"a:7;a",
$2:function(a,b){var z=this.a.$1(b)
return Math.max(H.d2(a),H.d2(z))}},lT:{"^":"a:9;a,b,c,d",
$1:function(a){var z,y
z=this.b
y=z.b
if(a>=y.length)return H.e(y,a)
return J.aX(J.bq(this.c.$1(z.a.a.i(0,y[a])),this.a.a),this.d)}},lU:{"^":"a:0;a",
$1:function(a){return J.io(J.bR(J.aX(a,this.a),1000))}},lL:{"^":"a:0;a",
$1:function(a){return!this.a.i(0,a).gjU()}}}],["","",,K,{"^":"",qy:{"^":"a:3;",
$3:function(a,b,c){}},c7:{"^":"d;a,h:b<,c,d,k7:e<,f,bq:r<",
gjs:function(){return this.a},
gv:function(a){return C.b.gv(this.b)},
u:function(a,b){if(b==null)return!1
return b instanceof K.c7&&b.b===this.b},
k:function(a){return"Room<"+this.b+">"},
k8:function(a){return this.e.$1(a)},
A:{
a_:function(a,b,c,d,e,f,g){var z=new S.L(null,null,[Q.w])
z.a9()
z.m(f)
return new K.c7(z.p(),a,b,c,d,e,g)}}}}],["","",,Q,{"^":"",w:{"^":"d;jn:a<,Y:b<,b4:c<,jP:d<"}}],["","",,S,{"^":"",a0:{"^":"d;",
gaN:function(){return C.e},
gbf:function(){return C.e},
gfU:function(){return 3},
dE:function(a){return this.aB(this.gI(),a)},
fZ:function(a,b){},
h_:function(a,b){},
dm:function(a){},
cZ:function(a){return!0}}}],["","",,S,{"^":"",
fj:function(a){var z=$.$get$bd().ab(3)
if(z<0||z>=3)return H.e(a,z)
return a[z]},
mb:function(a,b){var z,y,x,w,v
z=$.$get$bd().fX()*b
for(y=new H.du(a,a.gl(a),0,null,[H.x(a,"aS",0)]),x=0,w=0;y.t();){v=y.d
if(typeof v!=="number")return H.v(v)
x+=v
if(x>=z)return w;++w}throw H.c(P.G("The weights do not add up to total="+b))},
mc:function(a,b){var z,y,x,w,v,u,t
z=$.$get$bd().ab(b)
for(y=a.length,x=0,w=0,v=0;u=a.length,v<u;u===y||(0,H.ak)(a),++v){t=a[v]
if(typeof t!=="number")return H.v(t)
x+=t
if(x>=z)return w;++w}throw H.c(P.G("The weights do not add up to total="+b))},
cL:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=J.H(a)
y=z.b7(a,"{")
if(y!==-1){x=z.gl(a)
if(typeof x!=="number")return x.ax()
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
if(p>1){o=$.$get$bd().ab(p)
z=z.aC(a,0,y)
x=w.length
if(o<0||o>=x)return H.e(w,o)
n=w[o]
m=o+1
if(m>=x)return H.e(w,m)
m=z+H.b(S.cL(C.b.aC(a,n+1,w[m])))
if(typeof v!=="number")return v.a5()
n=a.length
m+=C.b.aC(a,v+1,n)
z=m.charCodeAt(0)==0?m:m
if(t===n-1)return z
else return S.cL(z)}else{x=z.gl(a)
if(typeof x!=="number")return x.ax()
if(t===x-1)return a
else{if(typeof t!=="number")return t.a5()
x=t+1
return z.aC(a,0,x)+H.b(S.cL(C.b.bB(a,x)))}}}else return a},
ay:function(a,b,c,d){switch($.$get$bd().ab(2)){case 0:a.$0()
break
case 1:b.$0()
break
case 2:c.$0()
break
case 4:d.$0()
break}},
md:function(a){if(a<0||a>1)throw H.c(P.X(a,0,1,"Probability needs to be within <0,1>.",null))
if(a===0)return!1
if(a===1)return!0
return $.$get$bd().fX()<a}}],["","",,Y,{"^":"",a7:{"^":"d;aS:a<,aM:b<,aH:c<,h1:d<,e,df:f@,h4:r<,fW:x<,eR:y<,jr:z<,hE:Q<,cU:ch<,iQ:cx<,fQ:cy<,I:db<",
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
z="Report<"+C.b.aC(z,0,Math.min(z.length,20))+"...,thread="+H.b(this.cx)
return z+(this.cy?"(sup)":"")+">"}},a1:{"^":"d;a,I:b<,c",
geo:function(){return C.a.bO(this.a,new Y.nu())},
aZ:function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){var z,y
if(b==null||J.i(b,""))return
z=(J.aW(b).el(b,".")||C.b.el(b,"!")||C.b.el(b,"?"))&&C.b.d0(b,P.be("[A-Z]",!0,!1))?!0:p
y=this.b
this.a.push(new Y.a7(b,m,h,j,i,d,k,g,!1,e,l,z,c,f,y))},
q:function(a,b){return this.aZ(a,b,null,!1,!1,!1,!1,null,null,null,!1,!1,null,!1,null,!1)},
G:function(a,b,c){return this.aZ(a,b,null,!1,!1,!1,!1,null,null,null,!1,!1,null,!1,null,c)},
fp:function(a,b,c){return this.aZ(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,null,!1,null,!1)},
iY:function(a,b,c,d,e,f){return this.aZ(a,b,null,!1,!1,!1,!1,c,null,d,!1,!1,e,!1,null,f)},
iT:function(a,b,c,d,e,f,g,h,i,j,k,l){return this.aZ(a,b,c,d,e,f,g,h,i,null,j,!1,k,l,null,!1)},
iV:function(a,b,c,d,e){return this.aZ(a,b,null,!1,!1,!1,c,null,null,null,!1,d,e,!1,null,!1)},
ef:function(a,b,c,d){return this.aZ(a,b,null,!1,!1,!1,!1,null,null,c,!1,!1,d,!1,null,!1)},
fq:function(a,b,c,d){return this.aZ(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,d,!1,null,!1)},
fs:function(a,b,c,d,e,f){return this.aZ(a,b,c,!1,!1,!1,!1,d,null,null,e,!1,f,!1,null,!1)},
iX:function(a,b,c,d,e,f){return this.aZ(a,b,c,!1,!1,d,!1,e,null,null,!1,!1,f,!1,null,!1)},
ef:function(a,b,c,d){return this.aZ(a,b,null,!1,!1,!1,!1,null,null,c,!1,!1,d,!1,null,!1)},
iW:function(a,b,c,d,e){return this.aZ(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,d,!1,null,e)},
j1:function(a,b,c,d,e,f,g,h){var z,y,x,w,v,u,t
if(b.length===0)return
z=H.b(new Y.ns().$1(a))+" "
for(y=b.length,x=e-1,w=0,v=0,u=0;u<b.length;b.length===y||(0,H.ak)(b),++u){t=b[u]
if(w>0){if(w===1&&J.i(t,C.a.gE(b)))z=z+" "+d
else z=w===x?z+(", "+d):z+","
z+=" "}z+=H.b(this.bN(t.gh(),t.gh(),t,null,this.b));++w
if(w>x||J.i(t,C.a.gE(b))){z+="."
this.iY(0,z.charCodeAt(0)==0?z:z,f,g,h,!0);++v
z=H.o(a,"<also>","also")+" "
w=0}}},
j0:function(a,b,c,d){return this.j1(a,b,c,"and",3,null,null,d)},
j3:function(){return this.G(0,"\n\n",!0)},
bN:function(a,b,c,d,e){var z,y,x
if(d!=null){z=J.H(a)
z=z.b7(a,"<owner's> "+H.b(b))!==-1||z.b7(a,"<ownerPronoun's> "+H.b(b))!==-1||z.b7(a,"<object-owner's> "+H.b(b))!==-1||z.b7(a,"<object-ownerPronoun's> "+H.b(b))!==-1}else z=!1
if(z)return a
if(c.gdl()!==!0){z=this.c
y=z.i(0,c.gj())
if((y==null?-1:y)<e)x=J.bT(a,b,"the "+H.b(b))
else{y=J.aW(a)
x=J.ew(c.gh(),P.be("[aeiouy]",!1,!1))?y.du(a,b,"an "+H.b(b)):y.du(a,b,"a "+H.b(b))
z.n(0,c.gj(),e)}}else x=null
return x==null?a:x},
em:function(a,b){var z,y
if(!this.aI(a)||!this.aI(b))return!1
z=this.a
if(a<0||a>=z.length)return H.e(z,a)
if(z[a].gaM()!=null){if(b<0||b>=z.length)return H.e(z,b)
y=z[b].gaM()==null}else y=!0
if(y)return!1
if(a>=z.length)return H.e(z,a)
if(z[a].gaH()!=null){if(b<0||b>=z.length)return H.e(z,b)
y=z[b].gaH()==null}else y=!0
if(y)return!1
if(a>=z.length)return H.e(z,a)
y=z[a].gaM().gj()
if(b<0||b>=z.length)return H.e(z,b)
if(J.i(y,z[b].gaH().gj())){if(a>=z.length)return H.e(z,a)
y=z[a].gaH().gj()
if(b>=z.length)return H.e(z,b)
z=J.i(y,z[b].gaM().gj())}else z=!1
return z},
dD:function(a){var z=this
return P.aL(function(){var y=a
var x=0,w=2,v,u,t
return function $async$dD(b,c){if(b===1){v=c
x=w}while(true)switch(x){case 0:if(!z.aI(y)){x=1
break}u=z.a
if(y<0||y>=u.length)H.e(u,y)
t=u[y]
x=t.gaM()!=null?3:4
break
case 3:x=5
return t.gaM()
case 5:case 4:x=t.gaH()!=null?6:7
break
case 6:x=8
return t.gaH()
case 8:case 7:x=t.gh1()!=null?9:10
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
if(z.aK(a,0)||z.bH(a,this.a.length))return
else{z=this.a
if(a>>>0!==a||a>=z.length)return H.e(z,a)
return z[a].gaH()}},"$1","gaH",2,0,21],
ka:function(a,b){var z
if(!this.aI(a)||!this.aI(b))return!1
if(this.em(a,b)){z=this.a
if(a>=z.length)return H.e(z,a)
z[a].geR()}return!1},
h0:function(a){var z
for(z=!1;this.geo();z=!0){a.$1(this.h5(!0))
this.ki()}return z},
h5:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d
z=this.a
y=C.a.bi(z,[],new Y.nv())
C.a.iA(z,new Y.nw(y),!1)
x=a&&this.geo()?C.a.b7(z,C.a.di(z,new Y.nx()))+1:z.length
if(x<1)return""
for(w=-1,v=!0,u=!1,t=!1,s=0,r="";s<x;++s){q=s===0
if(!q){p=s-1
o=this.em(p,s)
if(s>=z.length)return H.e(z,s)
if(!z[s].gdf())n=this.ka(s,p)&&this.hD(s,p)
else n=!0
if(n){if(p<0||p>=z.length)return H.e(z,p)
t=!z[p].gdf()}else t=!1
if(s>=z.length)return H.e(z,s)
z[s].sdf(t)
n=s-w
if(n<3)if(!u){if(s>=z.length)return H.e(z,s)
if(!z[s].ghE()){if(p<0||p>=z.length)return H.e(z,p)
if(!z[p].gjr()){if(s>=z.length)return H.e(z,s)
if(!z[s].gcU())if(this.d9(s,p)||o)if(!(t&&n>1)){if(t){if(p>=z.length)return H.e(z,p)
n=z[p].gdf()}else n=!1
n=n||this.kz(s)>4}else n=!0
else n=!0
else n=!0}else n=!0}else n=!0
v=n}else v=!0
else v=!0
if(v){if(p<0||p>=z.length)return H.e(z,p)
if(z[p].gcU()){r+=" "
p=r}else{r+=". "
p=r}if(t){if(s>=z.length)return H.e(z,s)
n=!z[s].gcU()}else n=!1
r=n?r+"But ":p
u=!1}else if(t){r+=S.fj([" but "," but ",", but "])
u=!this.hq(s,s+1)&&!0}else{r+=S.fj([" and "," and ",", and "])
u=!0}}m=this.dM(s)
l=S.cL(m)
p=J.H(l)
if(p.a1(l,"{")===!0||p.a1(l,"}")===!0)$.$get$hS().dI('Storyline result includes { and/or } even after being parsed by Randomly. Is there a dangling bracket here? Input = """'+H.b(m)+'""" Output = """'+H.b(l)+'"""')
n=!v
if(n){k=s-1
k=this.d9(s,k)&&J.ew(this.dM(k),"<subject> ")&&p.d0(l,"<subject> ")}else k=!1
if(k)l=p.du(l,"<subject> ","")
j=J.da(l,"<action>",this.dM(s))
p=s-1
k=this.iD(s,p)
if(k)k=!(this.aQ(s).gJ()===C.p&&this.am(s).gJ()===C.p)
else k=!1
if(k){k=this.aQ(s).gJ().b
j=H.o(j,"<object-owner's> <object>",k)
k=this.aQ(s).gJ().b
j=H.o(j,"<object-ownerPronoun's> <object>",k)
k=this.aQ(s).gJ().b
j=H.o(j,"<object>",k)
k=this.aQ(s).gJ().c
j=H.o(j,"<object's>",k)}k=this.d9(s,p)
if(k){k=this.am(s).gJ().a
j=H.o(j,"<owner's> <subject>",k)
k=this.am(s).gJ().a
j=H.o(j,"<ownerPronoun's> <subject>",k)
k=this.am(s).gJ().a
j=H.o(j,"<subject>",k)
k=this.am(s).gJ().c
j=H.o(j,"<subject's>",k)}if(this.aQ(p)!=null)if(this.am(s)!=null)if(this.am(p)!=null){k=this.aQ(p)
k=k==null?k:k.gj()
i=this.am(s)
if(J.i(k,i==null?i:i.gj())){k=this.am(p)
k=k==null?k:k.gJ()
i=this.am(s)
k=!J.i(k,i==null?i:i.gJ())}else k=!1}else k=!1
else k=!1
else k=!1
if(k){k=this.am(s).gJ().a
j=H.o(j,"<owner's> <subject>",k)
k=this.am(s).gJ().a
j=H.o(j,"<ownerPronoun's> <subject>",k)
k=this.am(s).gJ().a
j=H.o(j,"<subject>",k)
k=this.am(s).gJ().c
j=H.o(j,"<subject's>",k)}if(this.am(p)!=null)if(this.aQ(s)!=null){k=this.am(p)
k=k==null?k:k.gj()
i=this.aQ(s)
if(J.i(k,i==null?i:i.gj())){p=this.am(p)
p=p==null?p:p.gJ()
k=this.am(s)
p=!J.i(p,k==null?k:k.gJ())}else p=!1}else p=!1
else p=!1
if(p){p=this.aQ(s).gJ().a
j=H.o(j,"<object-owner's> <object>",p)
p=this.aQ(s).gJ().a
j=H.o(j,"<object-ownerPronoun's> <object>",p)
p=this.aQ(s).gJ().b
j=H.o(j,"<object>",p)
p=this.aQ(s).gJ().c
j=H.o(j,"<object's>",p)}if(s>=z.length)return H.e(z,s)
p=z[s]
h=p.gaM()
g=p.gaH()
f=p.gh1()
e=p.e
if(h!=null){if(h.gH()===!0){d=H.o(j,"<subject>","you")
d=H.o(d,"<subject's>","your")}else d=j
if(h.gJ()===C.B||h.gJ()===C.Y){d=H.o(d,"<s>","")
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
d=H.o(d,"<has>","has")}d=H.i5(d,"<subject>","<subjectNoun>",0)
k=h.gJ().a
d=H.o(d,"<subject>",k)
k=p.db
d=J.bT(this.bN(d,"<subjectNoun>",h,f,k),"<subjectNoun>",h.gh())
i=h.gJ().a
d=H.o(d,"<subjectPronoun>",i)
if(C.b.a1(j,P.be("<subject>.+<subject's>",!0,!1))){i=h.gJ().c
d=H.o(d,"<subject's>",i)}d=J.bT(this.bN(d,"<subject's>",h,f,k),"<subject's>",H.b(h.gh())+"'s")
k=h.gJ().c
d=H.o(d,"<subject's>",k)
k=h.gJ().c
d=H.o(d,"<subjectPronoun's>",k)
k=h.gJ().d
d=H.o(d,"<subjectPronounSelf>",k)}else d=j
if(g!=null){if(g.gH()===!0){d=H.o(d,"<object>","you")
d=H.o(d,"<object's>","your")}else d=J.da(this.bN(d,"<object>",g,e,p.db),"<object>",g.gh())
k=g.gJ().b
d=H.o(d,"<objectPronoun>",k)
if(C.b.a1(j,P.be("<object>.+<object's>",!0,!1))){k=g.gJ().c
d=H.o(d,"<object's>",k)}d=J.bT(this.bN(d,"<object's>",g,e,p.db),"<object's>",H.b(g.gh())+"'s")
k=g.gJ().c
d=H.o(d,"<object's>",k)
k=g.gJ().c
d=H.o(d,"<objectPronoun's>",k)}p=p.db
j=this.fh(e,this.fh(f,d,j,"<owner>","<owner's>","<ownerPronoun>","<ownerPronoun's>",p),j,"<object-owner>","<object-owner's>","<object-ownerPronoun>","<object-ownerPronoun's>",p)
r+=(!n||q)&&!t?Y.nt(j):j
if(v)w=s
if(s>=z.length)return H.e(z,s)
if(z[s].gcU())u=!0}q=x-1
if(q>=z.length)return H.e(z,q)
z=!z[q].gcU()?r+".":r
return H.ua(z.charCodeAt(0)==0?z:z,$.$get$fD(),new Y.ny(),null)},
c9:function(){return this.h5(!1)},
ki:function(){var z,y
if(!this.geo()){C.a.sl(this.a,0)
return}z=this.a
y=C.a.b7(z,C.a.di(z,new Y.nz()))+1
P.c5(0,y,z.length,null,null,null)
z.splice(0,y-0)},
hq:function(a,b){var z,y
if(!this.aI(a)||!this.aI(b))return!1
if(this.em(a,b)){z=this.a
if(a>=z.length)return H.e(z,a)
z[a].geR()}if(!this.d9(a,b))return!1
z=this.a
if(a>=z.length)return H.e(z,a)
if(z[a].gh4()){if(b>=z.length)return H.e(z,b)
y=z[b].gh4()}else y=!1
if(y)return!0
if(a>=z.length)return H.e(z,a)
if(z[a].gfW()){if(b>=z.length)return H.e(z,b)
z=z[b].gfW()}else z=!1
if(z)return!0
else return!1},
hD:function(a,b){var z,y,x,w,v
if(!this.aI(a)||!this.aI(b))return!1
for(z=new P.b2(this.dD(a).a(),null,null,null);z.t();){y=z.c
x=y==null?z.b:y.gF()
for(y=new P.b2(this.dD(b).a(),null,null,null);y.t();){w=y.c
v=w==null?y.b:w.gF()
if(J.i(x.gj(),v.gj()))return!0}}return!1},
dM:[function(a){var z=J.ad(a)
if(z.aK(a,0)||z.bH(a,this.a.length))return
else{z=this.a
if(a>>>0!==a||a>=z.length)return H.e(z,a)
return z[a].gaS()}},"$1","gaS",2,0,11],
am:[function(a){var z=J.ad(a)
if(z.aK(a,0)||z.bH(a,this.a.length))return
else{z=this.a
if(a>>>0!==a||a>=z.length)return H.e(z,a)
return z[a].gaM()}},"$1","gaM",2,0,21],
kz:function(a){var z,y,x
z=this.a
if(a>=z.length)return H.e(z,a)
if(z[a].gI()!=null){y=a-1
if(this.aI(y)){if(y<0||y>=z.length)return H.e(z,y)
y=z[y].gI()==null}else y=!0}else y=!0
if(y)return 1000
else{if(a>=z.length)return H.e(z,a)
y=z[a].gI()
x=a-1
if(x<0||x>=z.length)return H.e(z,x)
x=z[x].gI()
if(typeof y!=="number")return y.ax()
if(typeof x!=="number")return H.v(x)
return y-x}},
k:function(a){return this.c9()},
aI:function(a){if(a>=this.a.length||a<0)return!1
else return!0},
fh:function(a,b,c,d,e,f,g,h){var z
if(a!=null){z=a.gH()===!0?H.o(H.o(b,d,"you"),e,"your"):J.da(this.bN(b,d,a,null,h),d,a.gh())
z=H.o(z,f,a.gJ().a)
z=H.o(H.o(J.bT(this.bN(C.b.a1(c,P.be(d+".+"+e,!0,!1))?H.o(z,e,a.gJ().c):z,e,a,null,h),e,H.b(a.gh())+"'s"),e,a.gJ().c),g,a.gJ().c)}else z=H.o(H.o(H.o(H.o(b,d,""),e,""),f,""),g,"")
return z},
iD:function(a,b){var z,y
if(!this.aI(a)||!this.aI(b))return!1
z=this.a
if(a>=z.length)return H.e(z,a)
if(z[a].gaH()!=null){if(b<0||b>=z.length)return H.e(z,b)
y=z[b].gaH()==null}else y=!0
if(y)return!1
if(a>=z.length)return H.e(z,a)
y=z[a].gaH().gj()
if(b<0||b>=z.length)return H.e(z,b)
return J.i(y,z[b].gaH().gj())},
d9:function(a,b){var z,y
if(!this.aI(a)||!this.aI(b))return!1
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
nt:function(a){var z,y,x
z=!C.b.a1(a,"\n\n")?C.b.kD(a):a
y=z.length
if(y===0)return z
if(0>=y)return H.e(z,0)
x=z[0].toUpperCase()
if(y===1)return x
else return x+C.b.bB(z,1)}}},nu:{"^":"a:0;",
$1:function(a){return J.i(a.gaS(),"\n\n")}},ns:{"^":"a:22;",
$1:function(a){return C.b.eG(H.o(H.o(a,"<also> ",""),"  "," "))}},nv:{"^":"a:41;",
$2:function(a,b){var z,y,x
z=J.H(a)
y=z.gak(a)?z.gE(a):null
if(y!=null&&y.gfQ()&&J.i(b.giQ(),y.cx)){x=z.gl(a)
if(typeof x!=="number")return x.ax()
z.n(a,x-1,b)}else z.q(a,b)
return a}},nw:{"^":"a:44;a",
$1:function(a){return J.ih(this.a,a)}},nx:{"^":"a:0;",
$1:function(a){return J.i(a.gaS(),"\n\n")}},ny:{"^":"a:45;",
$1:function(a){return H.b(a.i(0,1))+H.b(a.i(0,2))+H.b(a.i(0,3))}},nz:{"^":"a:0;",
$1:function(a){return J.i(a.gaS(),"\n\n")}},b8:{"^":"lr;dl:a<,h:b<,c,bn:d<,H:e<,J:f<",
gj:function(){return H.ax(this)},
geq:function(){return!0},
gbw:function(){return!0},
A:{
dh:function(a,b,c,d,e){var z=H.r([],[P.q])
return new Y.b8(c,b,z,e==null?$.$get$bP():e,!1,d)}}},lr:{"^":"d+di;"},di:{"^":"d;",
gaO:function(){return this.gbw()&&this.geq()===!0},
ag:function(a,b,c,d,e,f,g,h,i,j,k){a.iT(0,b,c,d,e,f,g,h,i,j,H.a5(this,"$isb8"),!1)},
aw:function(a,b,c){return this.ag(a,b,null,!1,!1,!1,!1,c,null,!1,!1)},
as:function(a,b){return this.ag(a,b,null,!1,!1,!1,!1,null,null,!1,!1)},
kp:function(a,b,c,d){return this.ag(a,b,null,!1,c,!1,!1,null,null,d,!1)},
bx:function(a,b,c,d){return this.ag(a,b,null,!1,!1,!1,!1,c,null,d,!1)},
ca:function(a,b,c){return this.ag(a,b,null,!1,!1,!1,!1,null,null,c,!1)},
av:function(a,b,c){return this.ag(a,b,null,c,!1,!1,!1,null,null,!1,!1)},
cM:function(a,b,c,d){return this.ag(a,b,null,c,!1,!1,!1,d,null,!1,!1)},
eB:function(a,b,c,d,e){return this.ag(a,b,c,!1,!1,!1,!1,d,null,e,!1)},
bc:function(a,b,c){return this.ag(a,b,null,!1,!1,!1,c,null,null,!1,!1)},
cb:function(a,b,c,d){return this.ag(a,b,null,!1,c,!1,d,null,null,!1,!1)},
eA:function(a,b,c,d){return this.ag(a,b,null,c,!1,!1,d,null,null,!1,!1)},
cb:function(a,b,c,d){return this.ag(a,b,null,!1,c,!1,d,null,null,!1,!1)},
h6:function(a,b,c,d){return this.ag(a,b,null,!1,!1,!1,c,d,null,!1,!1)},
h8:function(a,b,c,d,e){return this.ag(a,b,c,!1,!1,d,!1,e,null,!1,!1)},
ko:function(a,b,c,d){return this.ag(a,b,null,c,!1,!1,!1,null,null,d,!1)},
kn:function(a,b,c,d){return this.ag(a,b,c,!1,!1,d,!1,null,null,!1,!1)},
ks:function(a,b,c,d,e,f){return this.ag(a,b,c,d,!1,e,!1,f,null,!1,!1)},
kq:function(a,b,c,d,e){return this.ag(a,b,c,d,!1,e,!1,null,null,!1,!1)},
h7:function(a,b,c,d){return this.ag(a,b,null,!1,!1,!1,!1,c,d,!1,!1)},
kr:function(a,b,c,d,e){return this.ag(a,b,null,!1,c,!1,!1,d,null,e,!1)},
kt:function(a,b,c,d,e,f){return this.ag(a,b,null,!1,c,!1,!1,d,e,f,!1)},
eA:function(a,b,c,d){return this.ag(a,b,null,c,!1,!1,d,null,null,!1,!1)}},c3:{"^":"d;a,b,c,d",
k:function(a){return this.a}}}],["","",,L,{"^":"",r1:{"^":"a:0;",
$1:function(a){a.gcv().b=2
return 2}},r7:{"^":"a:0;",
$1:function(a){a.gcv().b=0
return 0}},r0:{"^":"a:0;",
$1:function(a){a.gcv().b=1
return 1}},fL:{"^":"d;"},oT:{"^":"fL;j:a<",
a_:function(a){var z=new L.bh(null,null)
z.m(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof L.fL))return!1
z=this.a
y=b.a
return z==null?y==null:z===y},
gv:function(a){return Y.R(Y.k(0,J.j(this.a)))},
k:function(a){return"Team {id="+J.h(this.a)+",\n}"},
A:{
dY:function(a){var z=new L.bh(null,null)
a.$1(z)
return z.p()}}},bh:{"^":"d;a,b",
gj:function(){return this.gcv().b},
gcv:function(){var z=this.a
if(z!=null){this.b=z.a
this.a=null}return this},
m:function(a){this.a=a},
p:function(){var z,y
z=this.a
if(z==null){y=this.gcv().b
z=new L.oT(y)
if(y==null)H.f(P.l("id"))}this.m(z)
return z}}}],["","",,X,{"^":"",
hv:function(a,b){return P.aL(function(){var z=a,y=b
var x=0,w=1,v,u,t,s,r,q
return function $async$hv(c,d){if(c===1){v=d
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
case 1:return P.aK(v)}}})}}],["","",,A,{"^":"",a8:{"^":"d;iR:a<,bT:b<,c,d,e,f,I:r<,x",
gje:function(){var z=this.f
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
fn:function(a){var z,y
z=this.hp(a,!0)
y=z.gZ(z)
if(y.t()){y.gF()
return!0}return!1},
iO:function(a){var z,y
z=this.ho(a)
y=z.gZ(z)
if(y.t()){y.gF()
return!0}return!1},
iP:function(a){var z=this.x
if(z==null)return!1
return C.b.a1(z.gh(),a)},
fE:function(a){var z,y,x
z=this.d5(a)
if(z==null)throw H.c(new P.E("Tried to elapseSituationTime of situation id="+H.b(a)+" that doesn't exist in situations ("+H.b(this.f)+")."))
y=this.f
if(z!==(z|0)||z>=y.length)return H.e(y,z)
x=y[z].ar()
if(z!==(z|0)||z>=y.length)return H.e(y,z)
y[z]=x},
ar:function(){++this.r},
dC:function(a,b,c,d,e){var z=this.d
if(a!=null)z=z.dN(0,new A.or(a))
if(b!=null)z=z.bY(0,new A.os(b))
if(c!=null)z=z.bY(0,new A.ot(c))
if(e!=null)z=z.bY(0,new A.ou(e))
return d!=null?z.bY(0,new A.ov(d)):z},
hp:function(a,b){return this.dC(a,null,null,null,b)},
ho:function(a){return this.dC(a,null,null,null,null)},
a8:function(a){return this.a.aL(0,new A.ow(a))},
dG:function(a){return this.e.aL(0,new A.ox(a))},
eJ:function(a){var z,y
z=this.d5(a)
if(z==null)return
y=this.f
if(z!==(z|0)||z>=y.length)return H.e(y,z)
return y[z]},
ah:function(a){var z,y
for(z=this.f,y=z.length-1;y>=0;--y){if(y>=z.length)return H.e(z,y)
if(J.i(z[y].gh(),a)){if(y>=z.length)return H.e(z,y)
return z[y]}}throw H.c(P.G("No situation with name="+a+" found."))},
jE:function(a){var z=this.a.b6(0,new A.oy(a),new A.oz())
if(z==null)return!1
return z.gbw()},
ba:function(){var z,y
z=this.f
y=C.a.gE(z)
y.dm(this)
C.a.a7(z,y)},
bU:function(a){var z,y
z=this.f
while(!0){if(!(z.length!==0&&!J.i(C.a.gE(z).gh(),a)))break
y=C.a.gE(z)
y.dm(this)
C.a.a7(z,y)}if(z.length===0)throw H.c(P.G("Tried to pop situations until "+a+" but none was found in stack."))},
cL:function(a,b){var z,y
z=this.d5(a)
if(z==null)throw H.c(P.G("Situation with id "+H.b(a)+" does not exist in "+H.b(this.f)))
y=this.f
if(z!==(z|0)||z>=y.length)return H.e(y,z)
y[z]=b},
dv:function(a,b,c,d,e){var z,y,x,w
z=this.dC(a,b,c,d,e)
y=z.gZ(z)
if(y.t()){x=y.gF()
y=this.r
w=x.gI()
if(typeof w!=="number")return H.v(w)
return y-w}return},
ky:function(a,b,c){return this.dv(null,a,b,c,null)},
cc:function(a,b,c){return this.dv(a,null,b,null,c)},
kx:function(a,b,c){return this.dv(a,b,null,null,c)},
kw:function(a){return this.dv(a,null,null,null,null)},
k:function(a){var z,y
z=this.a
y=z.e4()
y.aq(0,z)
return"World<"+P.bZ(y,"{","}")+">"},
a4:function(a,b){var z,y,x
z=this.a8(a)
y=z.a_(b)
x=this.a
x.a7(0,z)
x.q(0,y)},
d5:function(a){var z,y,x
y=this.f
x=0
while(!0){if(!(x<y.length)){z=null
break}if(J.i(y[x].gj(),a)){z=x
break}++x}return z},
hQ:function(a){this.a.aq(0,a.a)
this.d.aq(0,a.d)
this.b.aq(0,a.b)
this.e.aq(0,a.e)
C.a.aq(this.f,a.f)
this.r=a.r},
A:{
dW:function(a){var z,y,x,w
z=P.W(null,null,null,R.F)
y=P.b1(null,O.cn)
x=P.W(null,null,null,U.am)
w=P.W(null,null,null,null)
w=new A.a8(z,x,a.c,y,w,[],null,null)
w.hQ(a)
return w}}},or:{"^":"a:0;a",
$1:function(a){return a.gfo()===this.a}},os:{"^":"a:0;a",
$1:function(a){return J.i(a.gds(),this.a.gj())}},ot:{"^":"a:0;a",
$1:function(a){return a.geS().a1(0,this.a.x)}},ou:{"^":"a:0;a",
$1:function(a){return a.ghk()===this.a}},ov:{"^":"a:0;a",
$1:function(a){return a.ghi()===this.a}},ow:{"^":"a:0;a",
$1:function(a){return J.i(a.gj(),this.a)}},ox:{"^":"a:0;a",
$1:function(a){return J.i(a.gh(),this.a)}},oy:{"^":"a:0;a",
$1:function(a){return J.i(a.gj(),this.a)}},oz:{"^":"a:1;",
$0:function(){return}}}],["","",,A,{"^":"",aH:{"^":"a6;a3:b<"},bB:{"^":"aH;c,Y:d<,P:e<,h:f<,b,a",
W:[function(a,b,c){throw H.c(new P.E("SimpleAction always succeeds"))},"$3","gT",6,0,2],
X:[function(a,b,c){return this.c.$4(a,b,c,this)},"$3","gU",6,0,2],
ai:function(a,b){throw H.c(new P.E("SimpleAction shouldn't have to provide roll reason"))},
O:function(a,b){return 1},
gR:function(){return!1},
N:function(a,b){return!0},
gS:function(){return H.f(new P.E("Not rerollable"))},
gV:function(){return!1}}}],["","",,N,{"^":"",jl:{"^":"I;R:c<,a3:d<,P:e<,V:f<,S:r<,b,a",
gaj:function(){return"confuse <object>"},
gh:function(){return"Confuse"},
gao:function(){return"will <subject> confuse <object>?"},
W:[function(a,b,c){var z
a.as(c,"<subject> touch<es> <subject's> temple")
z=this.b
a.aw(c,"<subject> tr<ies> to {channel|implant} {terror|confusion} into <object's> mind",z)
a.eA(c,"<subject> fail<s>",!0,!0)
return H.b(a.gh())+" fails to confuse "+H.b(z.gh())},"$3","gT",6,0,2],
X:[function(a,b,c){var z
a.as(c,"<subject> touch<es> <subject's> temple")
z=this.b
a.bx(c,"<subject> {channel<s>|implant<s>} {terror|confusion} into <object's> mind",z,!0)
z.bc(c,"<subject's> eyes go wide with terror",!0)
return H.b(a.gh())+" confuses "+H.b(z.gh())},"$3","gU",6,0,2],
O:function(a,b){return 0.6},
N:function(a,b){var z
if(a.gH()===!0)if(a.gae()){z=b.a
z=new H.J(z,new N.jm(this),[H.m(z,0)])
z=z.gl(z)>=2&&!this.b.es(b)}else z=!1
else z=!1
return z},
A:{
ul:[function(a){return new N.jl(!0,!0,"Channeling the terror of the Dead Prince into lesser minds is something you've been practicing. It makes the target rabid and disoriented. They might attack their own.",!0,C.c,a,null)},"$1","rs",2,0,5]}},jm:{"^":"a:0;a",
$1:function(a){var z,y
if(a.gbw()){z=a.gbn()
y=this.a.b.gbn()
z=z.a
y=y.gj()
y=z==null?y==null:z===y
z=y}else z=!1
return z}}}],["","",,V,{"^":"",jJ:{"^":"I;V:c<,S:d<,R:e<,a3:f<,P:r<,b,a",
gaj:function(){return"kick <object's> weapon off"},
gh:function(){return"DisarmKick"},
gao:function(){return"will <subject> kick the weapon off?"},
W:[function(a,b,c){S.ay(new V.jK(this,a,c),new V.jL(this,a,c),null,null)
return H.b(a.gh())+" fails to kick "+H.b(this.b.gh())+"'s weapon off"},"$3","gT",6,0,2],
X:[function(a,b,c){var z,y
S.ay(new V.jM(this,a,c),new V.jN(this,a,c),null,null)
z=b.f
y=z.length!==0?C.a.gE(z):null
b.cL(y.gj(),y.a_(new V.jO(this)))
z=this.b
b.a4(z.gj(),new V.jP())
return H.b(a.gh())+" kicks "+H.b(z.gh())+"'s weapon off"},"$3","gU",6,0,2],
O:function(a,b){var z=a.gae()?0:0.2
if(a.Q===!0)return 0.7-z
return 0.5-z},
N:function(a,b){var z
if(a.gae()||a.dx===C.h){z=this.b
z=z.gad()&&!z.gbj()}else z=!1
return z},
A:{
uo:[function(a){return new V.jJ(!0,C.c,!0,!0,"When enemies are on the ground, you can try to kick their weapon off to disarm them.",a,null)},"$1","rJ",2,0,5]}},jK:{"^":"a:1;a,b,c",
$0:function(){var z,y
z=this.b
y=this.c
z.aw(y,"<subject> kick<s> {at|towards} <object's> weapon",this.a.b)
z.av(y,"<subject> mi<sses>",!0)}},jL:{"^":"a:1;a,b,c",
$0:function(){var z,y
z=this.c
y=this.a.b
this.b.aw(z,"<subject> kick<s> <object's> weapon",y)
y.av(z,"<subject> hold<s> onto it",!0)}},jM:{"^":"a:1;a,b,c",
$0:function(){var z=this.a.b
this.b.kt(this.c,"<subject> kick<s> <object-owner's> <object> off <object-owner's> hand",!0,z.gM(),z,!0)}},jN:{"^":"a:1;a,b,c",
$0:function(){var z,y
z=this.c
y=this.a.b
this.b.bx(z,"<subject> kick<s> <object's> {right|} hand",y,!0)
z.ef(0,"<owner's> <subject> fl<ies> away",y,y.gM())}},jO:{"^":"a:23;a",
$1:function(a){a.gbE().q(0,this.a.b.gM())
return a}},jP:{"^":"a:0;",
$1:function(a){a.sM($.$get$ef())
return a}}}],["","",,R,{"^":"",l3:{"^":"I;V:c<,S:d<,R:e<,a3:f<,P:r<,b,a",
gh:function(){return"KickToGround"},
gaj:function(){return"kick <object> to the ground"},
gao:function(){return"will <subject> kick <object> prone?"},
W:[function(a,b,c){S.ay(new R.l4(this,a,c),new R.l5(this,a,c),null,null)
return H.b(a.gh())+" fails to sweep "+H.b(this.b.gh())+" off feet"},"$3","gT",6,0,2],
X:[function(a,b,c){var z
S.ay(new R.l6(this,a,c),new R.l7(this,a,c,b.ah("FightSituation").gbq()),null,null)
z=this.b
b.a4(z.gj(),new R.l8())
return H.b(a.gh())+" sweeps "+H.b(z.gh())+" off feet"},"$3","gU",6,0,2],
O:function(a,b){var z=a.gae()?0:0.2
if(a.Q===!0)return 0.7-z
return 0.5-z},
N:function(a,b){return(a.gae()||a.dx===C.h)&&!this.b.gad()},
A:{
uy:[function(a){return new R.l3(!0,C.c,!0,!0,"Sweeping opponents off their feet doesn't deal much damage but on the ground they will be much easier targets for you and your allies.",a,null)},"$1","t5",2,0,5]}},l4:{"^":"a:1;a,b,c",
$0:function(){var z,y
z=this.b
y=this.c
z.aw(y,"<subject> kick<s> {at|towards} <object's> feet",this.a.b)
z.av(y,"<subject> mi<sses>",!0)}},l5:{"^":"a:1;a,b,c",
$0:function(){var z,y
z=this.c
y=this.a.b
this.b.aw(z,"<subject> kick<s> <object's> shin",y)
y.av(z,"<subject> <does>n't budge",!0)}},l6:{"^":"a:1;a,b,c",
$0:function(){this.b.kr(this.c,"<subject> kick<s> <object> off <object's> feet and to the ground",!0,this.a.b,!0)}},l7:{"^":"a:1;a,b,c,d",
$0:function(){var z,y
z=this.c
y=this.a.b
this.b.bx(z,"<subject> kick<s> <object's> {right|left} shin",y,!0)
y.as(z,"<subject> {grunt|shriek}<s>")
y.bc(z,"<subject> fall<s> to the "+H.b(this.d),!0)}},l8:{"^":"a:0;",
$1:function(a){a.sal(C.i)
return a}}}],["","",,F,{"^":"",lI:{"^":"a6;P:b<,R:c<,a3:d<,V:e<,S:f<,a",
gY:function(){return"Stand off."},
gh:function(){return"Pass"},
W:[function(a,b,c){throw H.c(new P.ab(null))},"$3","gT",6,0,2],
X:[function(a,b,c){if(a.gH()===!0)a.as(c,"<subject> stand<s> off")
return H.b(a.gh())+" passes the opportunity"},"$3","gU",6,0,2],
ai:function(a,b){return"WARNING this shouldn't be user-visible"},
O:function(a,b){return 1},
N:function(a,b){return!0}}}],["","",,Y,{"^":"",lW:{"^":"I;V:c<,S:d<,R:e<,a3:f<,P:r<,b,a",
gaj:function(){return"force <object> off balance"},
gh:function(){return"Pound"},
gao:function(){return"will <subject> force <object> off balance?"},
W:[function(a,b,c){var z=this.b
a.h7(c,"<subject> {fiercely|violently} {pound<s>|strike<s>|hammer<s>|batter<s>} on <object-owner's> {<object>|weapon}",z.gM(),z)
z.ca(c,"<subject> {retain<s>|keep<s>} <subject's> {|combat} {stance|footing}",!0)
return H.b(a.gh())+" kicks "+H.b(z.cy)+" off balance"},"$3","gT",6,0,2],
X:[function(a,b,c){var z=this.b
a.h7(c,"<subject> {fiercely|violently} {pound<s>|strike<s>|hammer<s>|batter<s>} on <object-owner's> {<object>|weapon}",z.gM(),z)
if(z.gae()){z.h6(c,"<subject> lose<s> <object>",!0,$.$get$ed())
b.a4(z.x,new Y.lX())
C.a.q(b.f,U.ls(z,a))
return H.b(a.gh())+" pounds "+H.b(z.cy)+" off balance"}else if(z.gb0()){z.as(c,"<subject> <is> already off balance")
c.fq(0,"<subject> make<s> <object> fall to the "+H.b(b.ah("FightSituation").gbq()),z,$.$get$i_())
b.a4(z.x,new Y.lY())
return H.b(a.gh())+" pounds "+H.b(z.cy)+" to the ground"}throw H.c(new P.E("enemy pose must be either standing or off-balance"))},"$3","gU",6,0,2],
O:function(a,b){var z=a.gae()?0:0.2
if(a.Q===!0)return 0.7-z
return 0.5-z},
N:function(a,b){var z,y
if(!a.gad()){z=a.d
if(z.gb8()||z.gjS()){z=this.b
if(!z.gM().gcA()){z.gM().gfv()
y=!1}else y=!0
z=y&&!z.gad()}else z=!1}else z=!1
return z},
A:{
uE:[function(a){return new Y.lW(!0,C.c,!0,!0,"Forcing enemies off balance often means hitting them heavily several times in a row. The goal is not to deal damage but to force the opponent to lose control of their combat stance. It can also give members of your party an opportunity to strike.",a,null)},"$1","tb",2,0,5]}},lX:{"^":"a:0;",
$1:function(a){a.sal(C.h)
return a}},lY:{"^":"a:0;",
$1:function(a){a.sal(C.i)
return a}}}],["","",,B,{"^":"",mk:{"^":"a6;P:b<,R:c<,a3:d<,V:e<,S:f<,a",
gY:function(){return"Regain balance."},
gh:function(){return"RegainBalance"},
W:[function(a,b,c){throw H.c(new P.ab(null))},"$3","gT",6,0,2],
X:[function(a,b,c){if(a.gH()===!0)a.bx(c,"<subject> regain<s> <object>",$.$get$ed(),!0)
b.a4(a.gj(),new B.ml())
return H.b(a.gh())+" regains balance"},"$3","gU",6,0,2],
ai:function(a,b){return"Will "+a.gJ().a+" regain balance?"},
O:function(a,b){return 1},
N:function(a,b){return a.gb0()}},ml:{"^":"a:0;",
$1:function(a){a.sal(C.l)
return C.l}}}],["","",,O,{"^":"",mz:{"^":"a6;P:b<,R:c<,a3:d<,V:e<,S:f<,a",
gY:function(){return"Scramble."},
gh:function(){return"Scramble"},
W:[function(a,b,c){throw H.c(new P.ab(null))},"$3","gT",6,0,2],
X:[function(a,b,c){a.as(c,"<subject> tr<ies> to {scramble|crawl} out of {reach|harm's way}")
return H.b(a.gh())+" scrambles on ground"},"$3","gU",6,0,2],
ai:function(a,b){return"Will "+a.gJ().a+" crawl out of harm's way?"},
O:function(a,b){return 1},
N:function(a,b){if(!a.gad())return!1
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
nj:{"^":"a6;P:b<,R:c<,a3:d<,V:e<,S:f<,a",
gY:function(){return"Stand up."},
gh:function(){return"StandUp"},
W:[function(a,b,c){throw H.c(new P.ab(null))},"$3","gT",6,0,2],
X:[function(a,b,c){a.as(c,"<subject> stand<s> up")
b.a4(a.gj(),new Q.nk())
return H.b(a.gh())+" stands up"},"$3","gU",6,0,2],
ai:function(a,b){return"Will "+a.gJ().a+" stand up?"},
O:function(a,b){return 1},
N:function(a,b){if(!a.gad())return!1
if(Q.i0(a,b))return!1
return!0}},
nk:{"^":"a:0;",
$1:function(a){a.sal(C.l)
return C.l}}}],["","",,T,{"^":"",
v2:[function(a){return new A.ap(T.em(),null,null,new T.tj(),new T.tk(),new T.tl(),null,!0,"This move is hard, but when succesful, it's decisive.",!0,!0,"StartBreakNeckOnGround",!1,null,"break <object's> neck",null,a,null)},"$1","u_",2,0,5],
v3:[function(a){return new A.ap(T.em(),new T.tm(),T.em(),new T.tn(),new T.to(),new T.tp(),new T.tq(),!0,"This move is hard, but when succesful, it's decisive.",!0,!0,"StartBreakNeckOnGroundPlayer",!0,C.c,"break <object's> neck","will <subject> succeed?",a,null)},"$1","u0",2,0,5],
v4:[function(a,b,c,d,e){a.aw(c,"<subject> throw<s> <subjectPronounSelf> {on|upon} <object>",d)
b.a4(a.gj(),new T.tr())},"$5","em",10,0,10],
tj:{"^":"a:3;",
$3:function(a,b,c){return a.gH()!==!0&&c.gad()&&a.gbj()&&c.gbj()}},
tk:{"^":"a:3;",
$3:function(a,b,c){return Y.eE(a,c)}},
tl:{"^":"a:3;",
$3:function(a,b,c){return S.dD(a,c,C.o)}},
tn:{"^":"a:3;",
$3:function(a,b,c){return a.gH()===!0&&c.gad()&&a.gbj()&&c.gbj()}},
to:{"^":"a:3;",
$3:function(a,b,c){return Y.eE(a,c)}},
tp:{"^":"a:3;",
$3:function(a,b,c){return S.dD(a,c,C.n)}},
tm:{"^":"a:3;",
$3:function(a,b,c){return 0.7}},
tq:{"^":"a:3;",
$3:function(a,b,c){return S.dD(a,c,C.j)}},
tr:{"^":"a:0;",
$1:function(a){a.sal(C.i)
return a}}}],["","",,A,{"^":"",ap:{"^":"I;c,d,e,f,r,x,y,z,P:Q<,R:ch<,a3:cx<,h:cy<,V:db<,S:dx<,aj:dy<,ao:fr<,b,a",
W:[function(a,b,c){var z,y,x,w
z=this.b
y=this.e
if(this.z){x=this.r.$3(a,b,z)
w=this.y.$3(a,b,z)
y.$5(a,b,c,z,x)
y=b.f
C.a.q(y,x)
C.a.q(y,w)}else y.$5(a,b,c,z,null)
return H.b(a.gh())+" fails to start a "+this.cy+" (defensible situation) at "+H.b(z.gh())},"$3","gT",6,0,2],
X:[function(a,b,c){var z,y,x,w
z=this.b
y=this.r.$3(a,b,z)
x=this.x.$3(a,b,z)
this.c.$5(a,b,c,z,y)
w=b.f
C.a.q(w,y)
C.a.q(w,x)
return H.b(a.gh())+" starts a "+this.cy+" (defensible situation) at "+H.b(z.gh())},"$3","gU",6,0,2],
O:function(a,b){var z=this.d
if(z!=null)return z.$3(a,b,this.b)
return 1},
N:function(a,b){return this.f.$3(a,b,this.b)}}}],["","",,U,{"^":"",
v5:[function(a){return new A.ap(U.en(),null,null,new U.ts(),new U.tt(),new U.tu(),null,!0,"Punching someone hard enough can cause them to lose their footing. And it hurts.",!0,!0,"StartPunch",!1,null,"punch <object>",null,a,null)},"$1","u1",2,0,5],
v6:[function(a){return new A.ap(U.en(),new U.tv(),U.en(),new U.tw(),new U.tx(),new U.ty(),new U.tz(),!0,"Punching someone hard enough can cause them to lose their footing. And it hurts.",!0,!0,"StartPunchPlayer",!0,C.c,"punch <object>","will <subject> hit <objectPronoun>?",a,null)},"$1","u2",2,0,5],
v7:[function(a,b,c,d,e){c.iX(0,"<subject> {thrust<s>|swing<s>} <subject's> fist at <object>",e.gj(),!0,d,a)},"$5","en",10,0,10],
ts:{"^":"a:3;",
$3:function(a,b,c){var z
if(a.gH()!==!0)z=(a.gae()||a.dx===C.h)&&!c.gad()&&a.gbj()
else z=!1
return z}},
tt:{"^":"a:3;",
$3:function(a,b,c){return M.fi(a,c)}},
tu:{"^":"a:3;",
$3:function(a,b,c){return Z.dK(a,c,C.o)}},
tw:{"^":"a:3;",
$3:function(a,b,c){var z
if(a.gH()===!0)z=(a.gae()||a.dx===C.h)&&!c.gad()&&a.gbj()
else z=!1
return z}},
tx:{"^":"a:3;",
$3:function(a,b,c){return M.fi(a,c)}},
ty:{"^":"a:3;",
$3:function(a,b,c){return Z.dK(a,c,C.n)}},
tv:{"^":"a:3;",
$3:function(a,b,c){return 0.7}},
tz:{"^":"a:3;",
$3:function(a,b,c){return Z.dK(a,c,C.j)}}}],["","",,G,{"^":"",
v8:[function(a){return new A.ap(G.eo(),null,null,new G.tC(),new G.tD(),new G.tE(),null,!0,"The basic swordfighting move is also often the most effective.",!0,!0,"StartSlash",!1,null,"swing at <object>",null,a,null)},"$1","u3",2,0,5],
vd:[function(a){return new A.ap(G.eo(),new G.tN(),G.eo(),new G.tO(),new G.tP(),new G.tQ(),new G.tR(),!0,"The basic swordfighting move is also often the most effective.",!0,!0,"StartSlashPlayer",!0,C.c,"swing at <object>","will <subject> hit <objectPronoun>?",a,null)},"$1","u4",2,0,5],
ve:[function(a,b,c,d,e){return a.h8(c,"<subject> swing<s> {<subject's> "+H.b(a.gM().gh())+" |}at <object>",e.gj(),!0,d)},"$5","eo",10,0,10],
tC:{"^":"a:3;",
$3:function(a,b,c){return a.gH()!==!0&&a.gae()&&!c.gad()&&a.d.gb8()}},
tD:{"^":"a:3;",
$3:function(a,b,c){return M.bC(a,c)}},
tE:{"^":"a:3;",
$3:function(a,b,c){return L.bg(a,c,C.o)}},
tO:{"^":"a:3;",
$3:function(a,b,c){return a.gH()===!0&&a.gae()&&!c.gad()&&a.d.gb8()}},
tP:{"^":"a:3;",
$3:function(a,b,c){return M.bC(a,c)}},
tQ:{"^":"a:3;",
$3:function(a,b,c){return L.bg(a,c,C.n)}},
tN:{"^":"a:3;",
$3:function(a,b,c){return 0.7}},
tR:{"^":"a:3;",
$3:function(a,b,c){return L.bg(a,c,C.j)}}}],["","",,R,{"^":"",
v9:[function(a,b,c,d,e){return a.h6(c,"<subject> completely miss<es> <object> with <subject's> "+H.b(a.gM().gh()),!0,d)},"$5","i3",10,0,13],
va:[function(a){return new A.ap(R.i4(),new R.tF(),R.i3(),new R.tG(),new R.tH(),new R.tI(),null,!1,"It's always better to fight with your feet firmly on the ground. But sometimes, it's necessary to act quickly.",!0,!0,"StartSlashOutOfBalance",!1,null,"swing at <object> (while out of balance)",null,a,null)},"$1","u5",2,0,5],
vb:[function(a){return new A.ap(R.i4(),new R.tJ(),R.i3(),new R.tK(),new R.tL(),new R.tM(),null,!1,"It's always better to fight with your feet firmly on the ground. But sometimes, it's necessary to act quickly.",!0,!0,"StartSlashOutOfBalancePlayer",!1,null,"swing at <object> (while out of balance)",null,a,null)},"$1","u6",2,0,5],
vc:[function(a,b,c,d,e){return a.h8(c,"<subject> swing<s> {<subject's> "+H.b(a.gM().gh())+" |}at <object>",e.gj(),!0,d)},"$5","i4",10,0,10],
tG:{"^":"a:3;",
$3:function(a,b,c){return a.gH()!==!0&&a.gb0()&&!c.gad()&&a.d.gb8()}},
tH:{"^":"a:3;",
$3:function(a,b,c){return M.bC(a,c)}},
tI:{"^":"a:3;",
$3:function(a,b,c){return L.bg(a,c,C.o)}},
tF:{"^":"a:3;",
$3:function(a,b,c){return 0.7}},
tK:{"^":"a:3;",
$3:function(a,b,c){return a.gH()===!0&&a.gb0()&&!c.gad()&&a.d.gb8()}},
tL:{"^":"a:3;",
$3:function(a,b,c){return M.bC(a,c)}},
tM:{"^":"a:3;",
$3:function(a,b,c){return L.bg(a,c,C.n)}},
tJ:{"^":"a:3;",
$3:function(a,b,c){return 0.7}}}],["","",,D,{"^":"",
vf:[function(a){return new A.ap(D.ep(),null,null,new D.tS(),new D.tT(),new D.tU(),null,!0,"Opponents on the ground are often the most vulnerable.",!0,!0,"StartStrikeDown",!1,null,"strike down at <object>",null,a,null)},"$1","u7",2,0,5],
vg:[function(a){return new A.ap(D.ep(),new D.tV(),D.ep(),new D.tW(),new D.tX(),new D.tY(),new D.tZ(),!0,"Opponents on the ground are often the most vulnerable.",!0,!0,"StartStrikeDownPlayer",!0,C.c,"strike down at <object>","will <subject> hit?",a,null)},"$1","u8",2,0,5],
vh:[function(a,b,c,d,e){return a.aw(c,"<subject> strike<s> down {with <subject's> "+H.b(a.gM().gh())+" |}at <object>",d)},"$5","ep",10,0,13],
tS:{"^":"a:3;",
$3:function(a,b,c){return a.gH()!==!0&&c.gad()&&!a.gad()&&a.d.gb8()}},
tT:{"^":"a:3;",
$3:function(a,b,c){return D.fF(a,c)}},
tU:{"^":"a:3;",
$3:function(a,b,c){return V.dB(a,c,C.o)}},
tW:{"^":"a:3;",
$3:function(a,b,c){return a.gH()===!0&&c.gad()&&!a.gad()&&a.d.gb8()}},
tX:{"^":"a:3;",
$3:function(a,b,c){return D.fF(a,c)}},
tY:{"^":"a:3;",
$3:function(a,b,c){return V.dB(a,c,C.n)}},
tV:{"^":"a:3;",
$3:function(a,b,c){return 0.7}},
tZ:{"^":"a:3;",
$3:function(a,b,c){return V.dB(a,c,C.j)}}}],["","",,Y,{"^":"",nW:{"^":"cC;a3:c<,b,a",
gP:function(){return"A different weapon might change the battle."},
gR:function(){return!1},
gh:function(){return"TakeDroppedItem"},
gV:function(){return!1},
gS:function(){return},
W:[function(a,b,c){throw H.c(new P.ab(null))},"$3","gT",6,0,2],
X:[function(a,b,c){var z,y
z=b.f
y=z.length!==0?C.a.gE(z):null
b.cL(y.gj(),y.a_(new Y.nX(this)))
b.a4(a.gj(),new Y.nY(this,a))
z=this.b
a.aw(c,"<subject> pick<s> <object> up",z)
return H.b(a.gh())+" picks up "+H.b(z.gh())},"$3","gU",6,0,2],
ai:function(a,b){return H.f(new P.ab(null))},
O:function(a,b){return 1},
N:function(a,b){var z
a.gj7()
z=b.cc("DisarmKick",a,!0)
if(z!=null&&z<=2)return!1
return!0},
A:{
uI:[function(a){return new Y.nW(!0,a,null)},"$1","uc",2,0,46]}},nX:{"^":"a:23;a",
$1:function(a){a.gbE().a7(0,this.a.b)
return a}},nY:{"^":"a:0;a,b",
$1:function(a){if(!this.b.gbj())a.gbT().q(0,a.gM())
a.sM(this.a.b)
return a}}}],["","",,M,{"^":"",op:{"^":"a6;P:b<,V:c<,S:d<,R:e<,a3:f<,a",
gY:function(){return"Regain clarity."},
gh:function(){return"Unconfuse"},
W:[function(a,b,c){throw H.c(new P.ab(null))},"$3","gT",6,0,2],
X:[function(a,b,c){a.as(c,"<subject> shake<s> <subject's> head violently")
if(a.gH()===!0)c.q(0,"the {horrible|terrible} spell seems to recede")
a.kp(c,"<subject's> eyes regain focus and clarity",!0,!0)
return H.b(a.gh())+" regains clarity"},"$3","gU",6,0,2],
ai:function(a,b){return"WARNING this shouldn't be user-visible"},
O:function(a,b){return 1},
N:function(a,b){var z
if(a.es(b)){z=b.cc("Confuse",a,!0)
if(typeof z!=="number")return z.br()
z=z>4}else z=!1
return z}}}],["","",,R,{"^":"",ky:{"^":"I;P:c<,R:d<,a3:e<,V:f<,S:r<,b,a",
gh:function(){return"FinishBreakNeck"},
gaj:function(){return""},
gao:function(){return"(WARNING should not be user-visible)"},
W:[function(a,b,c){throw H.c(new P.ab(null))},"$3","gT",6,0,2],
X:[function(a,b,c){var z=this.b
b.a4(z.gj(),new R.kz())
a.bx(c,"<subject> break<s> <object's> neck",z,!0)
X.d7(c,b,z)
return H.b(a.gh())+" breaks "+H.b(z.gh())+"'s neck on ground"},"$3","gU",6,0,2],
O:function(a,b){return 1},
N:function(a,b){return!0},
A:{
us:[function(a){return new R.ky(null,!0,!0,!0,C.c,a,null)},"$1","rP",2,0,5]}},kz:{"^":"a:0;",
$1:function(a){a.sau(0)
return a}}}],["","",,Y,{"^":"",
eE:function(a,b){var z=new Y.dd(null,null,null,null,null)
new Y.rj(a,b).$1(z)
return z.p()},
eD:{"^":"a0;",
gaN:function(){return[R.rP()]},
gh:function(){return"BreakNeckOnGroundSituation"},
ar:function(){var z=new Y.dd(null,null,null,null,null)
z.m(this)
new Y.j9().$1(z)
return z.p()},
aB:function(a,b){if(a===0)return b.a8(this.a)
return},
aJ:function(a,b){return new H.J(a,new Y.ja(this),[H.m(a,0)])}},
rj:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a2().ab(1073741823)
a.gaT().c=z
a.gaT().e=0
z=this.a.gj()
a.gaT().b=z
z=this.b.gj()
a.gaT().d=z
return a}},
j9:{"^":"a:0;",
$1:function(a){var z=a.gaT().e
if(typeof z!=="number")return z.a5()
a.gaT().e=z+1
return a}},
ja:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.i(a.gj(),z.a)||J.i(a.gj(),z.c)}},
oD:{"^":"eD;a,j:b<,c,I:d<",
a_:function(a){var z=new Y.dd(null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof Y.eD))return!1
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
dd:{"^":"d;a,b,c,d,e",
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
z=new Y.oD(y,x,w,v)
if(y==null)H.f(P.l("attacker"))
if(x==null)H.f(P.l("id"))
if(w==null)H.f(P.l("target"))
if(v==null)H.f(P.l("time"))}this.m(z)
return z}}}],["","",,Z,{"^":"",kg:{"^":"I;P:c<,R:d<,a3:e<,V:f<,S:r<,b,a",
gaj:function(){return"evade"},
gh:function(){return"EvadeNeckBreaking"},
gao:function(){return"will <subject> evade?"},
W:[function(a,b,c){a.as(c,"<subject> tr<ies> to evade")
S.ay(new Z.kh(a,c),new Z.ki(this,a,c),null,null)
b.ba()
return H.b(a.gh())+" fails to dodge "+H.b(this.b.gh())},"$3","gT",6,0,2],
X:[function(a,b,c){var z=this.b
a.bx(c,"<subject> {dodge<s>|evade<s>} it",z,!0)
b.bU("FightSituation")
return H.b(a.gh())+" evades "+H.b(z.gh())},"$3","gU",6,0,2],
O:function(a,b){var z,y
z=b.f
y=z.length!==0?C.a.gE(z):null
if(y.gbM())return 0
if(y.gbb()===C.j)return 1
if(a.gH()===!0)return 0.6
return 0.5},
N:function(a,b){return!0},
A:{
ur:[function(a){return new Z.kg("This looks dangerous. Trying to evade this close-quarter move seems prudent.",!1,!1,!0,C.c,a,null)},"$1","rM",2,0,5]}},kh:{"^":"a:1;a,b",
$0:function(){return this.a.av(this.b,"<subject> {can't|fail<s>}",!0)}},ki:{"^":"a:1;a,b,c",
$0:function(){return this.a.b.cM(this.c,"<subject> <is> too quick for <object>",!0,this.b)}}}],["","",,S,{"^":"",
dD:function(a,b,c){var z=new S.dC(null,null,null,null,null,null)
new S.ri(a,b,c).$1(z)
return z.p()},
fb:{"^":"cy;",
gaN:function(){return[Z.rM()]},
gh:function(){return"OnGroundWrestleDefenseSituation"},
ar:function(){var z=new S.dC(null,null,null,null,null,null)
z.m(this)
new S.lC().$1(z)
return z.p()}},
ri:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$a2().ab(1073741823)
a.gaG().c=z
a.gaG().f=0
z=this.a.gj()
a.gaG().b=z
z=this.b.gj()
a.gaG().e=z
a.gaG().d=this.c
return a}},
lC:{"^":"a:0;",
$1:function(a){var z=a.gaG().f
if(typeof z!=="number")return z.a5()
a.gaG().f=z+1
return a}},
oK:{"^":"fb;de:a<,j:b<,bb:c<,cO:d<,I:e<",
a_:function(a){var z=new S.dC(null,null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof S.fb))return!1
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
dC:{"^":"d;a,b,c,d,e,f",
gj:function(){return this.gaG().c},
gI:function(){return this.gaG().f},
gaG:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.f=z.e
this.a=null}return this},
m:function(a){this.a=a},
p:function(){var z,y,x,w,v,u
z=this.a
if(z==null){y=this.gaG().b
x=this.gaG().c
w=this.gaG().d
v=this.gaG().e
u=this.gaG().f
z=new S.oK(y,x,w,v,u)
if(y==null)H.f(P.l("attacker"))
if(x==null)H.f(P.l("id"))
if(w==null)H.f(P.l("predeterminedResult"))
if(v==null)H.f(P.l("target"))
if(u==null)H.f(P.l("time"))}this.m(z)
return z}}}],["","",,G,{"^":"",
uS:[function(a,b,c,d,e){a.as(c,"<subject> tr<ies> to swing back")
a.eA(c,"<subject> {go<es> wide|miss<es>}",!0,!0)
if(a.gae()){b.a4(a.x,new G.rv())
a.cb(c,"<subject> lose<s> balance because of that",!0,!0)}else if(a.dx===C.h){b.a4(a.x,new G.rw())
a.bc(c,"<subject> lose<s> balance because of that",!0)
a.cb(c,"<subject> fall<s> to the ground",!0,!0)}},"$5","hA",10,0,13],
uT:[function(a){return new A.ap(G.hB(),new G.rx(),G.hA(),new G.ry(),new G.rz(),new G.rA(),null,!1,"You can deal serious damage when countering because your opponent is often caught off guard. On the other hand, counters require fast reaction and could throw you out of balance.",!0,!0,"CounterSlash",!1,null,"swing back at <object>",null,a,null)},"$1","rF",2,0,5],
uV:[function(a,b,c,d,e){return a.aw(c,"<subject> swing<s> back",d)},"$5","hB",10,0,10],
uU:[function(a){return new A.ap(G.hB(),new G.rB(),G.hA(),new G.rC(),new G.rD(),new G.rE(),null,!1,"You can deal serious damage when countering because your opponent is often caught off guard. On the other hand, counters require fast reaction and could throw you out of balance.",!0,!0,"CounterSlashPlayer",!0,C.c,"swing back at <object>","will <subject> hit <objectPronoun>?",a,null)},"$1","rG",2,0,5],
rv:{"^":"a:0;",
$1:function(a){a.sal(C.h)
return a}},
rw:{"^":"a:0;",
$1:function(a){a.sal(C.i)
return a}},
ry:{"^":"a:3;",
$3:function(a,b,c){return a.gH()!==!0&&a.gM().gb8()&&!a.gad()}},
rz:{"^":"a:3;",
$3:function(a,b,c){return M.bC(a,c)}},
rA:{"^":"a:3;",
$3:function(a,b,c){return L.bg(a,c,C.o)}},
rx:{"^":"a:3;",
$3:function(a,b,c){return c.gae()?0.7:0.9}},
rC:{"^":"a:3;",
$3:function(a,b,c){return a.gH()===!0&&a.gM().gb8()&&!a.gad()}},
rD:{"^":"a:3;",
$3:function(a,b,c){return M.bC(a,c)}},
rE:{"^":"a:3;",
$3:function(a,b,c){return L.bg(a,c,C.n)}},
rB:{"^":"a:3;",
$3:function(a,b,c){return c.gae()?0.7:0.9}}}],["","",,V,{"^":"",ju:{"^":"I;P:c<,R:d<,a3:e<,V:f<,S:r<,b,a",
gaj:function(){return"tackle <object>"},
gh:function(){return"CounterTackle"},
gao:function(){return"will <subject> tackle <objectPronoun>?"},
W:[function(a,b,c){var z=this.b
a.aw(c,"<subject> tr<ies> to tackle <object>",z)
S.ay(new V.jv(a,c),new V.jw(this,c),null,null)
a.aw(c,"<subject> land<s> on the "+H.b(b.ah("FightSituation").gbq())+" next to <object>",z)
b.a4(a.gj(),new V.jx())
return H.b(a.gh())+" fails to tackle "+H.b(z.gh())},"$3","gT",6,0,2],
X:[function(a,b,c){var z=this.b
a.aw(c,"<subject> tackle<s> <object> to the ground",z)
b.a4(z.gj(),new V.jy())
b.a4(a.gj(),new V.jz())
return H.b(a.gh())+" tackles "+H.b(z.gh())},"$3","gU",6,0,2],
O:function(a,b){var z=this.b.gb0()?0.2:0
if(a.gH()===!0)return 0.7+z
return 0.5+z},
N:function(a,b){return!a.gad()&&a.d instanceof K.bY},
A:{
um:[function(a){return new V.ju("When an opponent misses you like that, it's a rare (though still dangerous) opportunity to bring them down.",!0,!0,!0,C.c,a,null)},"$1","rH",2,0,5]}},jv:{"^":"a:1;a,b",
$0:function(){return this.a.av(this.b,"<subject> go<es> wide",!0)}},jw:{"^":"a:1;a,b",
$0:function(){return this.a.b.av(this.b,"<subject> {evade<s>|sidestep<s>} it",!0)}},jx:{"^":"a:0;",
$1:function(a){a.sal(C.i)
return a}},jy:{"^":"a:0;",
$1:function(a){a.sal(C.i)
return a}},jz:{"^":"a:0;",
$1:function(a){a.sal(C.i)
return a}}}],["","",,S,{"^":"",
eL:function(a,b){var z=new S.dg(null,null,null,null,null)
new S.rb(a,b).$1(z)
return z.p()},
eK:{"^":"a0;",
gaN:function(){return[G.rF(),G.rG(),V.rH()]},
gbf:function(){return[$.$get$dE()]},
gh:function(){return"CounterAttackSituation"},
ar:function(){var z=new S.dg(null,null,null,null,null)
z.m(this)
new S.js().$1(z)
return z.p()},
aB:function(a,b){if(a===0)return b.a8(this.a)
return},
aJ:function(a,b){return new H.J(a,new S.jt(this),[H.m(a,0)])}},
rb:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a2().ab(1073741823)
a.gaU().c=z
a.gaU().e=0
z=this.a.gj()
a.gaU().b=z
z=this.b.gj()
a.gaU().d=z
return a}},
js:{"^":"a:0;",
$1:function(a){var z=a.gaU().e
if(typeof z!=="number")return z.a5()
a.gaU().e=z+1
return a}},
jt:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.i(a.gj(),z.a)||J.i(a.gj(),z.c)}},
oE:{"^":"eK;a,j:b<,c,I:d<",
a_:function(a){var z=new S.dg(null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof S.eK))return!1
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
dg:{"^":"d;a,b,c,d,e",
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
z=new S.oE(y,x,w,v)
if(y==null)H.f(P.l("counterAttacker"))
if(x==null)H.f(P.l("id"))
if(w==null)H.f(P.l("target"))
if(v==null)H.f(P.l("time"))}this.m(z)
return z}}}],["","",,X,{"^":"",
d7:function(a,b,c){var z,y
z=b.ah("FightSituation")
y=z.gbq()
b.cL(z.gj(),z.a_(new X.t6(c)))
if(c.gal()===C.i){c.bc(a,"<subject> stop<s> moving",!0)
a.G(0,"\n\n",!0)
return}switch($.$get$hm().ab(3)){case 0:c.cb(a,"<subject> collapse<s>, dead",!0,!0)
break
case 1:c.bc(a,"<subject> fall<s> backward",!0)
c.bc(a,"<subject> twist<s>",!0)
c.cb(a,"<subject> hit<s> the "+H.b(y)+" face down",!0,!0)
break
case 2:c.bc(a,"<subject> drop<s> to <subject's> knees",!0)
c.bc(a,"<subject> keel<s> over",!0)
break}a.G(0,"\n\n",!0)},
t6:{"^":"a:0;a",
$1:function(a){var z=this.a
if(!z.gbj())a.gbE().q(0,z.d)
return a}}}],["","",,O,{"^":"",cy:{"^":"n1;",
aB:function(a,b){if(a===0)return b.a8(this.gcO())
return},
aJ:function(a,b){return new H.J(a,new O.jE(this),[H.m(a,0)])}},n1:{"^":"a0+lZ;"},jE:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.i(a.gj(),z.gde())||J.i(a.gj(),z.gcO())}}}],["","",,U,{"^":"",
kk:function(a,b,c,d){var z=new U.bX(null,null,null,null,null,null,null,null,null)
new U.r8(a,b,c,d).$1(z)
return z.p()},
eP:{"^":"a0;",
gaN:function(){return[N.rs(),V.rJ(),R.t5(),Y.tb(),T.u_(),T.u0(),U.u1(),U.u2(),G.u3(),G.u4(),D.u7(),D.u8(),R.u5(),R.u6(),Y.uc()]},
gbf:function(){return H.r([$.$get$fl(),$.$get$fC(),$.$get$fp(),$.$get$h2()],[Q.a6])},
gfU:function(){return 1000},
gh:function(){return"FightSituation"},
cz:function(a,b){var z=b.a
return(z&&C.a).bO(z,new U.kl(a))},
ar:function(){var z=new U.bX(null,null,null,null,null,null,null,null,null)
z.m(this)
new U.km().$1(z)
return z.p()},
aB:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j
z=X.hv(this.f,this.b)
y=H.bw(z,new U.kn(b),H.x(z,"y",0),null)
x=H.x(y,"y",0)
w=P.T(new H.J(y,new U.ko(),[x]),!1,x)
x=H.m(w,0)
v=P.T(new H.J(w,new U.kp(),[x]),!1,x)
u=v.length===1?C.a.gc1(v):null
if(a===0)if(u!=null)return u
for(y=w.length,t=0,s=null,r=0;r<w.length;w.length===y||(0,H.ak)(w),++r){q=w[r]
x=b.d
p=x.b6(0,new U.kq(q),new U.kr())
o=p==null?p:p.gI()
if(o==null)o=-1
n=b.r
if(typeof o!=="number")return H.v(o)
m=n-o
if(m<=0)continue
l=x.b6(0,new U.ks(q),new U.kt())
k=l==null?l:l.gI()
if(k==null)k=-1
x=b.r
if(typeof k!=="number")return H.v(k)
j=(x-k+m)/2
if(q.gH()===!0)j*=1.5
if(j>t){s=q
t=j}}return s},
aJ:function(a,b){return new H.J(a,new U.ku(this),[H.m(a,0)])},
h_:function(a,b){var z,y
z=b.a
if(!(z.length!==0&&C.a.gE(z).gfQ())&&S.md(0.25))b.G(0,"\n\n",!0)
z=this.x
y=this.c.a
if(y.a2(z))y.i(0,z).$2(a,b)},
dm:function(a){var z,y,x,w,v,u,t
z=this.r
if(z!=null&&!this.cz(a,this.b)&&this.cz(a,this.f)){y=a.eJ(z)
a.cL(y.gj(),y.a_(new U.kv()))
for(z=this.f,x=z.a,x=new J.br(x,x.length,0,null,[H.m(x,0)]),w=a.a;x.t();){v=x.d
if(a.a8(v).gaO()){u=a.a8(v)
t=u.a_(new U.kw())
w.a7(0,u)
w.q(0,t)}}C.a.q(a.f,X.lj(z,this.d,this.a,null))}else this.cz(a,this.f)},
cZ:function(a){var z=this.f
if(this.cz(a,z))if(this.cz(a,this.b)){z=z.a
z=(z&&C.a).bO(z,new U.kx(a))}else z=!1
else z=!1
return z}},
r8:{"^":"a:0;a,b,c,d",
$1:function(a){var z,y
z=$.$get$a2().ab(1073741823)
a.gaf().f=z
a.gaf().y=0
z=a.gaf()
y=z.r
if(y==null){y=new S.L(null,null,[P.u])
y.a9()
y.m(C.e)
z.r=y
z=y}else z=y
y=this.a
z.m(new H.cG(y,new U.qc(),[H.m(y,0),null]))
y=a.gaf()
z=y.c
if(z==null){z=new S.L(null,null,[P.u])
z.a9()
z.m(C.e)
y.c=z}z.m(J.ev(this.b,new U.qd()))
a.gaf().e=this.c
z=new S.L(null,null,[U.am])
z.a9()
z.m(C.e)
a.gaf().b=z
z=this.d.gj()
a.gaf().x=z
return a}},
qc:{"^":"a:0;",
$1:function(a){return a.gj()}},
qd:{"^":"a:0;",
$1:function(a){return a.gj()}},
kl:{"^":"a:0;a",
$1:function(a){return this.a.a8(a).gaO()}},
km:{"^":"a:0;",
$1:function(a){var z=a.gaf().y
if(typeof z!=="number")return z.a5()
a.gaf().y=z+1
return a}},
kn:{"^":"a:0;a",
$1:function(a){return this.a.a8(a)}},
ko:{"^":"a:0;",
$1:function(a){return a.gaO()}},
kp:{"^":"a:0;",
$1:function(a){return a.gH()}},
kq:{"^":"a:0;a",
$1:function(a){return J.i(a.gds(),this.a.gj())&&a.ghj()===!0}},
kr:{"^":"a:1;",
$0:function(){return}},
ks:{"^":"a:0;a",
$1:function(a){return J.i(a.gds(),this.a.gj())}},
kt:{"^":"a:1;",
$0:function(){return}},
ku:{"^":"a:24;a",
$1:function(a){var z,y,x
if(a.gaO()){z=this.a
y=a.gj()
x=z.f.a
if(!(x&&C.a).a1(x,y)){y=a.gj()
z=z.b.a
y=(z&&C.a).a1(z,y)
z=y}else z=!0}else z=!1
return z}},
kv:{"^":"a:0;",
$1:function(a){a.sk9(!1)
return a}},
kw:{"^":"a:0;",
$1:function(a){a.sal(C.l)
return a}},
kx:{"^":"a:29;a",
$1:function(a){var z=this.a.a8(a)
return z.gH()===!0&&z.gaO()}},
oG:{"^":"eP;bE:a<,b,c,bq:d<,j:e<,dq:f<,r,I:x<",
a_:function(a){var z=new U.bX(null,null,null,null,null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof U.eP))return!1
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
z=this.gaf()
y=z.b
if(y==null){y=new S.L(null,null,[U.am])
y.a9()
y.m(C.e)
z.b=y
z=y}else z=y
return z},
gbq:function(){return this.gaf().e},
gj:function(){return this.gaf().f},
gdq:function(){var z,y
z=this.gaf()
y=z.r
if(y==null){y=new S.L(null,null,[P.u])
y.a9()
y.m(C.e)
z.r=y
z=y}else z=y
return z},
gI:function(){return this.gaf().y},
gaf:function(){var z,y
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
if(!(z==null)){y=new A.dx(null,null,[H.m(z,0),H.m(z,1)])
y.cp()
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
if(z==null){y=this.gaf()
x=y.b
if(x==null){x=new S.L(null,null,[U.am])
x.a9()
x.m(C.e)
y.b=x
y=x}else y=x
y=y.p()
x=this.gaf()
w=x.c
if(w==null){w=new S.L(null,null,[P.u])
w.a9()
w.m(C.e)
x.c=w
x=w}else x=w
x=x.p()
w=this.gaf()
v=w.d
if(v==null){v=new A.dx(null,null,[P.u,{func:1,v:true,args:[A.a8,Y.a1]}])
v.cp()
v.m(C.W)
w.d=v
w=v}else w=v
w=w.p()
v=this.gaf().e
u=this.gaf().f
t=this.gaf()
s=t.r
if(s==null){s=new S.L(null,null,[P.u])
s.a9()
s.m(C.e)
t.r=s
t=s}else t=s
t=t.p()
s=this.gaf().x
r=this.gaf().y
z=new U.oG(y,x,w,v,u,t,s,r)
if(y==null)H.f(P.l("droppedItems"))
if(x==null)H.f(P.l("enemyTeamIds"))
if(w==null)H.f(P.l("events"))
if(v==null)H.f(P.l("groundMaterial"))
if(u==null)H.f(P.l("id"))
if(t==null)H.f(P.l("playerTeamIds"))
if(r==null)H.f(P.l("time"))}this.m(z)
return z}}}],["","",,Z,{"^":"",iZ:{"^":"a6;R:b<,a3:c<,V:d<,S:e<,a",
gY:function(){return""},
gP:function(){return},
gh:function(){return"AutoLoot"},
W:[function(a,b,c){throw H.c(new P.ab(null))},"$3","gT",6,0,2],
X:[function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p
z=b.ah("LootSituation")
y=[]
for(x=z.gbE(),x=x.gZ(x),w=b.a,v=null;x.t();){u=x.d
if(u instanceof L.bG){t=u.gcf()
s=u.gcQ()
r=a.gM().gac()
if(typeof r!=="number")return H.v(r)
r=t+s>r
t=r}else t=!1
if(t){q=b.a8(a.gj())
p=q.a_(new Z.j6(a,u))
w.a7(0,q)
w.q(0,p)
v=u}else{q=b.a8(a.gj())
p=q.a_(new Z.j7(u))
w.a7(0,q)
w.q(0,p)
y.push(u)}}if(v!=null){a.aw(c,"<subject> pick<s> up <object>",v)
a.aw(c,"<subject> wield<s> <object>",v)}this.i7(y,a,z,b,c)
if(y.length!==0)c.j0("<subject> <also> take<s>",y,null,a)
return H.b(a.gh())+" auto-loots"},"$3","gU",6,0,2],
ai:function(a,b){return"WARNING this shouldn't be user-visible"},
O:function(a,b){return 1},
N:function(a,b){return a.gH()},
i7:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r
z=P.T(new H.J(a,new Z.j_(),[H.m(a,0)]),!0,L.bG)
y=b.gbT()
y.toString
C.a.aq(z,new H.J(y,new Z.j0(),[H.m(y,0)]))
if(z.length===0)return
C.a.cg(z,new Z.j1())
x=c.gdq().aP(0,new Z.j2(d)).dN(0,new Z.j3())
for(y=J.af(x.a),w=new H.cU(y,x.b,[H.m(x,0)]),v=d.a;w.t();){u=y.gF()
if(z.length===0)break
t=C.a.kj(z)
s=d.a8(u.gj())
r=s.a_(new Z.j4(t))
v.a7(0,s)
v.q(0,r)
C.a.a7(a,t)
s=d.a8(b.gj())
r=s.a_(new Z.j5(t))
v.a7(0,s)
v.q(0,r)
b.aw(e,"<subject> give<s> the "+H.b(t.gh())+" to <object>",u)}}},j6:{"^":"a:0;a,b",
$1:function(a){var z=this.a
if(!(z.gM() instanceof K.bY))a.gbT().q(0,z.gM())
a.sM(this.b)
return a}},j7:{"^":"a:0;a",
$1:function(a){a.gbT().q(0,this.a)
return a}},j_:{"^":"a:0;",
$1:function(a){return a instanceof L.bG}},j0:{"^":"a:0;",
$1:function(a){return a instanceof L.bG}},j1:{"^":"a:7;",
$2:function(a,b){return J.bS(a.gac(),b.gac())}},j2:{"^":"a:0;a",
$1:function(a){return this.a.a8(a)}},j3:{"^":"a:0;",
$1:function(a){return a.gaO()&&a.gbj()}},j4:{"^":"a:0;a",
$1:function(a){a.sM(this.a)
return a}},j5:{"^":"a:0;a",
$1:function(a){a.gbT().a7(0,this.a)
return a}}}],["","",,X,{"^":"",
lj:function(a,b,c,d){var z=new X.dw(null,null,null,null,null,null)
new X.r9(a,b,c).$1(z)
return z.p()},
f6:{"^":"a0;",
gbf:function(){return H.r([$.$get$eA()],[Q.a6])},
gh:function(){return"LootSituation"},
ar:function(){var z=new X.dw(null,null,null,null,null,null)
z.m(this)
new X.ll().$1(z)
return z.p()},
aB:function(a,b){if(typeof a!=="number")return a.br()
if(a>0)return
return this.f5(b.a)},
aJ:function(a,b){return[this.f5(a)]},
cZ:function(a){return!0},
f5:function(a){return a.di(0,new X.lk())}},
r9:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$a2().ab(1073741823)
a.gap().e=z
a.gap().f=0
a.gap().c=this.b
z=new S.L(null,null,[P.u])
z.a9()
z.m(this.a)
a.gap().d=z
z=new S.L(null,null,[U.am])
z.a9()
z.m(this.c)
a.gap().b=z
return a}},
ll:{"^":"a:0;",
$1:function(a){var z=a.gap().f
if(typeof z!=="number")return z.a5()
a.gap().f=z+1
return a}},
lk:{"^":"a:0;",
$1:function(a){return a.gH()===!0&&a.gaO()}},
oH:{"^":"f6;bE:a<,bq:b<,dq:c<,j:d<,I:e<",
a_:function(a){var z=new X.dw(null,null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof X.f6))return!1
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
dw:{"^":"d;a,b,c,d,e,f",
gbE:function(){var z,y
z=this.gap()
y=z.b
if(y==null){y=new S.L(null,null,[U.am])
y.a9()
y.m(C.e)
z.b=y
z=y}else z=y
return z},
gbq:function(){return this.gap().c},
gdq:function(){var z,y
z=this.gap()
y=z.d
if(y==null){y=new S.L(null,null,[P.u])
y.a9()
y.m(C.e)
z.d=y
z=y}else z=y
return z},
gj:function(){return this.gap().e},
gI:function(){return this.gap().f},
gap:function(){var z,y
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
if(z==null){y=this.gap()
x=y.b
if(x==null){x=new S.L(null,null,[U.am])
x.a9()
x.m(C.e)
y.b=x
y=x}else y=x
y=y.p()
x=this.gap().c
w=this.gap()
v=w.d
if(v==null){v=new S.L(null,null,[P.u])
v.a9()
v.m(C.e)
w.d=v
w=v}else w=v
w=w.p()
v=this.gap().e
u=this.gap().f
z=new X.oH(y,x,w,v,u)
if(y==null)H.f(P.l("droppedItems"))
if(x==null)H.f(P.l("groundMaterial"))
if(w==null)H.f(P.l("playerTeamIds"))
if(v==null)H.f(P.l("id"))
if(u==null)H.f(P.l("time"))}this.m(z)
return z}}}],["","",,A,{"^":"",lw:{"^":"I;P:c<,R:d<,a3:e<,V:f<,S:r<,b,a",
gh:function(){return"OffBalanceOpportunityThrust"},
gaj:function(){return"stab <object>"},
gao:function(){return"will <subject> hit <objectPronoun>?"},
W:[function(a,b,c){var z=this.b
a.aw(c,"<subject> tr<ies> to stab <object>",z)
a.av(c,"<subject> {go<es> wide|fail<s>|miss<es>}",!0)
return H.b(a.gh())+" fails to stab "+H.b(z.gh())},"$3","gT",6,0,2],
X:[function(a,b,c){var z=this.b
b.a4(z.gj(),new A.lx(a))
if(b.a8(z.gj()).gbw()){a.bx(c,"<subject> thrust<s> {|<subject's> "+H.b(a.gM().gh())+"} deep into <object's> {shoulder|hip|thigh}",z,!0)
z.bc(c,"<subject> {scream|yell|grunt}<s> in pain",!0)}else{a.bx(c,"<subject> {stab<s>|run<s> <subject's> "+H.b(a.gM().gh())+" through} <object>",z,!0)
X.d7(c,b,z)}return H.b(a.gh())+" stabs "+H.b(z.gh())},"$3","gU",6,0,2],
O:function(a,b){if(a.gH()===!0)return 0.6
return 0.5},
N:function(a,b){return a.gae()&&this.b.gb0()&&a.d.gfR()},
A:{
uz:[function(a){return new A.lw("When an opponent is out of balance they are the most vulnerable.",!0,!0,!0,C.c,a,null)},"$1","t8",2,0,5]}},lx:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gau()
y=this.a.gM().gcQ()
if(typeof z!=="number")return z.ax()
a.sau(z-y)
return a}}}],["","",,U,{"^":"",
ls:function(a,b){var z=new U.dz(null,null,null,null,null)
new U.rk(a,b).$1(z)
return z.p()},
f9:{"^":"a0;",
gaN:function(){return H.r([A.t8()],[{func:1,ret:Q.I,args:[R.F]}])},
gbf:function(){return[$.$get$dE()]},
gh:function(){return"OffBalanceOpportunitySituation"},
ar:function(){var z=new U.dz(null,null,null,null,null)
z.m(this)
new U.lt().$1(z)
return z.p()},
aB:function(a,b){var z,y,x,w,v
if(typeof a!=="number")return a.br()
if(a>0)return
z=b.a8(this.a)
y=b.a
x=H.m(y,0)
w=P.T(new H.J(y,new U.lu(this,b,z),[x]),!0,x)
if(w.length===0)return
v=C.a.gen(w)
if(v.gae()&&z.gb0()&&v.d.gfR())return v
return},
aJ:function(a,b){return new H.J(a,new U.lv(b,b.a8(this.a)),[H.m(a,0)])}},
rk:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a2().ab(1073741823)
a.gaV().d=z
a.gaV().e=0
z=this.a.gj()
a.gaV().b=z
z=this.b
z=z==null?z:z.gj()
a.gaV().c=z
return a}},
lt:{"^":"a:0;",
$1:function(a){var z=a.gaV().e
if(typeof z!=="number")return z.a5()
a.gaV().e=z+1
return a}},
lu:{"^":"a:24;a,b,c",
$1:function(a){var z,y
if(a.gaO())if(a.ep(this.c,this.b)){z=a.x
y=this.a.b
y=z==null?y!=null:z!==y
z=y}else z=!1
else z=!1
return z}},
lv:{"^":"a:0;a,b",
$1:function(a){var z=this.b
return J.i(a,z)||a.ep(z,this.a)}},
oI:{"^":"f9;a,b,j:c<,I:d<",
a_:function(a){var z=new U.dz(null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof U.f9))return!1
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
dz:{"^":"d;a,b,c,d,e",
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
z=new U.oI(y,x,w,v)
if(y==null)H.f(P.l("actorId"))
if(w==null)H.f(P.l("id"))
if(v==null)H.f(P.l("time"))}this.m(z)
return z}}}],["","",,O,{"^":"",kA:{"^":"I;P:c<,R:d<,a3:e<,V:f<,b,a",
gaj:function(){return""},
gh:function(){return"FinishPunch"},
gS:function(){return},
gao:function(){return"(WARNING should not be user-visible)"},
W:[function(a,b,c){throw H.c(new P.ab(null))},"$3","gT",6,0,2],
X:[function(a,b,c){var z,y,x,w
z=this.b
y=z.gae()?C.h:C.i
x=b.ah("PunchSituation").gj()
w=b.ah("FightSituation").gbq()
b.a4(z.x,new O.kB(y))
switch(y){case C.l:throw H.c(new P.E("Enemy's pose should never be 'standing' after a successful punch"))
case C.h:c.fs(0,"<subject> {punch<es> <object> in the {face|nose|eye|jaw}|punch<es> <object's> {face|nose|eye|jaw}}",x,z,!0,a)
z.bc(c,"<subject> {stagger<s>|stumble<s>} off balance",!0)
break
case C.i:c.fs(0,"<subject> send<s> <object> to the "+H.b(w)+" with a {massive punch|well-placed fist} to the {face|nose|eye|jaw}",x,z,!0,a)
break}return H.b(a.gh())+" punches "+H.b(z.cy)+" to "+y.k(0)},"$3","gU",6,0,2],
O:function(a,b){return 1},
N:function(a,b){return!0},
A:{
ut:[function(a){return new O.kA(null,!0,!0,!1,a,null)},"$1","rQ",2,0,5]}},kB:{"^":"a:0;a",
$1:function(a){a.sal(this.a)
return a}}}],["","",,E,{"^":"",jQ:{"^":"I;P:c<,R:d<,a3:e<,V:f<,S:r<,b,a",
gaj:function(){return"dodge"},
gh:function(){return"DodgePunch"},
gao:function(){return"will <subject> dodge the fist?"},
W:[function(a,b,c){var z=b.ah("PunchSituation").gj()
a.kn(c,"<subject> tr<ies> to {dodge|sidestep|move out of the way}",z,!0)
S.ay(new E.jR(a,c,z),new E.jS(this,a,c,z),null,null)
b.ba()
return H.b(a.gh())+" fails to dodge "+H.b(this.b.gh())},"$3","gT",6,0,2],
X:[function(a,b,c){var z=this.b
a.eB(c,"<subject> {dodge<s>|sidestep<s>} <object's> {punch|blow|jab}",b.ah("PunchSituation").gj(),z,!0)
b.bU("FightSituation")
return H.b(a.gh())+" dodges punch from "+H.b(z.gh())},"$3","gU",6,0,2],
O:function(a,b){var z,y,x
z=b.f
y=z.length!==0?C.a.gE(z):null
if(y.gbM())return 0
if(y.gbb()===C.j)return 1
x=a.gae()?0:0.2
if(a.Q===!0)return 0.7-x
return 0.4-x},
N:function(a,b){return!0},
A:{
up:[function(a){return new E.jQ("Dodging means moving your body out of harm's way.",!1,!1,!0,C.c,a,null)},"$1","rK",2,0,5]}},jR:{"^":"a:1;a,b,c",
$0:function(){return this.a.kq(this.b,"<subject> {can't|fail<s>|<does>n't succeed}",this.c,!0,!0)}},jS:{"^":"a:1;a,b,c,d",
$0:function(){return this.a.b.ks(this.c,"<subject> <is> too quick for <object>",this.d,!0,!0,this.b)}}}],["","",,Z,{"^":"",
dK:function(a,b,c){var z=new Z.dJ(null,null,null,null,null,null)
new Z.rf(a,b,c).$1(z)
return z.p()},
fg:{"^":"cy;",
gaN:function(){return[E.rK()]},
gh:function(){return"PunchDefenseSituation"},
ar:function(){var z=new Z.dJ(null,null,null,null,null,null)
z.m(this)
new Z.m8().$1(z)
return z.p()}},
rf:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$a2().ab(1073741823)
a.gaE().c=z
a.gaE().f=0
z=this.a.gj()
a.gaE().b=z
z=this.b.gj()
a.gaE().e=z
a.gaE().d=this.c
return a}},
m8:{"^":"a:0;",
$1:function(a){var z=a.gaE().f
if(typeof z!=="number")return z.a5()
a.gaE().f=z+1
return a}},
oL:{"^":"fg;de:a<,j:b<,bb:c<,cO:d<,I:e<",
a_:function(a){var z=new Z.dJ(null,null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof Z.fg))return!1
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
dJ:{"^":"d;a,b,c,d,e,f",
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
z=new Z.oL(y,x,w,v,u)
if(y==null)H.f(P.l("attacker"))
if(x==null)H.f(P.l("id"))
if(w==null)H.f(P.l("predeterminedResult"))
if(v==null)H.f(P.l("target"))
if(u==null)H.f(P.l("time"))}this.m(z)
return z}}}],["","",,M,{"^":"",
fi:function(a,b){var z=new M.dL(null,null,null,null,null)
new M.rh(a,b).$1(z)
return z.p()},
fh:{"^":"a0;",
gaN:function(){return[O.rQ()]},
gh:function(){return"PunchSituation"},
ar:function(){var z=new M.dL(null,null,null,null,null)
z.m(this)
new M.m9().$1(z)
return z.p()},
aB:function(a,b){if(a===0)return b.a8(this.a)
return},
aJ:function(a,b){return new H.J(a,new M.ma(this),[H.m(a,0)])}},
rh:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a2().ab(1073741823)
a.gaW().c=z
a.gaW().e=0
z=this.a.gj()
a.gaW().b=z
z=this.b.gj()
a.gaW().d=z
return a}},
m9:{"^":"a:0;",
$1:function(a){var z=a.gaW().e
if(typeof z!=="number")return z.a5()
a.gaW().e=z+1
return a}},
ma:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.i(a.gj(),z.a)||J.i(a.gj(),z.c)}},
oM:{"^":"fh;a,j:b<,c,I:d<",
a_:function(a){var z=new M.dL(null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof M.fh))return!1
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
dL:{"^":"d;a,b,c,d,e",
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
z=new M.oM(y,x,w,v)
if(y==null)H.f(P.l("attacker"))
if(x==null)H.f(P.l("id"))
if(w==null)H.f(P.l("target"))
if(v==null)H.f(P.l("time"))}this.m(z)
return z}}}],["","",,O,{"^":"",kC:{"^":"I;P:c<,R:d<,a3:e<,V:f<,S:r<,b,a",
gh:function(){return"FinishSlash"},
gaj:function(){return""},
gao:function(){return"(WARNING should not be user-visible)"},
W:[function(a,b,c){throw H.c(new P.ab(null))},"$3","gT",6,0,2],
X:[function(a,b,c){var z,y,x,w
z=this.b
b.a4(z.gj(),new O.kF(a))
y=b.ah("SlashSituation").gj()
x=b.a8(z.gj()).gbw()
if(x){a.eB(c,"<subject> {slash<es>|cut<s>} <object's> {shoulder|abdomen|thigh}",y,z,!0)
z.bc(c,"<subject> {scream|yell|grunt}<s> in pain",!0)}else{a.eB(c,"<subject> {slash<es>|cut<s>} {across|through} <object's> {neck|abdomen|lower body}",y,z,!0)
X.d7(c,b,z)}w=H.b(a.gh())+" slashes"
return w+(!x?" (and kills)":"")+" "+H.b(z.gh())},"$3","gU",6,0,2],
O:function(a,b){return 1},
N:function(a,b){return a.gM().gb8()},
A:{
uv:[function(a){return new O.kC(null,!0,!0,!0,C.c,a,null)},"$1","rR",2,0,5]}},kF:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gau()
y=this.a.gM().gcf()
if(typeof z!=="number")return z.ax()
a.sau(z-y)
return a}}}],["","",,X,{"^":"",jF:{"^":"I;P:c<,R:d<,a3:e<,V:f<,S:r<,b,a",
gh:function(){return"DefensiveParrySlash"},
gaj:function(){return"step back and parry"},
gao:function(){return"will <subject> parry it?"},
W:[function(a,b,c){a.as(c,"<subject> tr<ies> to {parry|deflect it|meet it with <subject's> "+H.b(a.gM().gh())+"|fend it off}")
if(a.gb0())a.av(c,"<subject> <is> out of balance",!0)
else S.ay(new X.jG(a,c),new X.jH(this,a,c),null,null)
b.ba()
return H.b(a.cy)+" fails to parry "+H.b(this.b.gh())},"$3","gT",6,0,2],
X:[function(a,b,c){if(a.gH()===!0)a.as(c,"<subject> {step<s>|take<s> a step} back")
a.ca(c,"<subject> {parr<ies> it|deflect<s> it|meet<s> it with <subject's> "+H.b(a.gM().gh())+"|fend<s> it off}",!0)
if(!a.gae()){b.a4(a.x,new X.jI())
if(a.Q===!0)a.as(c,"<subject> regain<s> balance")}b.bU("FightSituation")
return H.b(a.cy)+" steps back and parries "+H.b(this.b.gh())},"$3","gU",6,0,2],
O:function(a,b){var z,y
if(a.gH()===!0)return 1
z=b.f
y=z.length!==0?C.a.gE(z):null
if(y.gbM())return 0
if(y.gbb()===C.j)return 1
return 0.5-(a.gae()?0:0.2)},
N:function(a,b){return a.gM().gcA()},
A:{
un:[function(a){return new X.jF("Stepping back is the safest way to get out of harm's way.",!1,!1,!0,C.c,a,null)},"$1","rI",2,0,5]}},jG:{"^":"a:1;a,b",
$0:function(){return this.a.av(this.b,"<subject> {fail<s>|<does>n't succeed}",!0)}},jH:{"^":"a:1;a,b,c",
$0:function(){return this.a.b.cM(this.c,"<subject> <is> too quick for <object>",!0,this.b)}},jI:{"^":"a:0;",
$1:function(a){a.sal(C.l)
return a}}}],["","",,F,{"^":"",jT:{"^":"I;P:c<,R:d<,a3:e<,V:f<,S:r<,b,a",
gh:function(){return"DodgeSlash"},
gaj:function(){return"dodge and counter"},
gao:function(){return"will <subject> dodge?"},
W:[function(a,b,c){a.as(c,"<subject> tr<ies> to {dodge|sidestep}")
if(a.gb0())a.av(c,"<subject> <is> out of balance",!0)
else S.ay(new F.jU(a,c),new F.jV(this,a,c),null,null)
b.ba()
return H.b(a.cy)+" fails to dodge "+H.b(this.b.gh())},"$3","gT",6,0,2],
X:[function(a,b,c){var z=this.b
a.bx(c,"<subject> {dodge<s>|sidestep<s>} it",z,!0)
if(z.gae()){z.cb(c,"<subject> lose<s> balance because of that",!0,!0)
b.a4(z.x,new F.jW())}b.bU("FightSituation")
if(a.gH()===!0)c.q(0,"this opens an opportunity for a counter attack")
C.a.q(b.f,S.eL(a,z))
return H.b(a.gh())+" dodges "+H.b(z.cy)},"$3","gU",6,0,2],
O:function(a,b){var z,y,x
z=b.f
y=z.length!==0?C.a.gE(z):null
if(y.gbM())return 0
if(y.gbb()===C.j)return 1
x=a.gae()?0:0.2
if(a.Q===!0)return 0.7-x
return 0.4-x},
N:function(a,b){return!a.gad()},
A:{
uq:[function(a){return new F.jT("Dodging means moving your body out of harm's way. When done correctly, it will throw your opponent off balance and it will open an opportunity for a counter attack. When botched, it can get you killed.",!1,!1,!0,C.c,a,null)},"$1","rL",2,0,5]}},jU:{"^":"a:1;a,b",
$0:function(){return this.a.av(this.b,"<subject> {can't|fail<s>|<does>n't succeed}",!0)}},jV:{"^":"a:1;a,b,c",
$0:function(){return this.a.b.cM(this.c,"<subject> <is> too quick for <object>",!0,this.b)}},jW:{"^":"a:0;",
$1:function(a){a.sal(C.h)
return C.h}}}],["","",,G,{"^":"",lF:{"^":"I;P:c<,R:d<,a3:e<,V:f<,S:r<,b,a",
gh:function(){return"ParrySlash"},
gaj:function(){return"parry and counter"},
gao:function(){return"will <subject> parry?"},
W:[function(a,b,c){a.as(c,"<subject> tr<ies> to {parry|deflect it|meet it with <subject's> "+H.b(a.gM().gh())+"|fend it off}")
if(a.gb0())a.av(c,"<subject> <is> out of balance",!0)
else S.ay(new G.lG(a,c),new G.lH(this,a,c),null,null)
b.ba()
return H.b(a.cy)+" fails to parry "+H.b(this.b.gh())},"$3","gT",6,0,2],
X:[function(a,b,c){var z=this.b
if(z.gb0()){c.iV(0,"<subject> <is> out of balance",!0,!0,z)
c.ef(0,"so <ownerPronoun's> <subject> is {weak|feeble}",z,$.$get$i7())
a.ca(c,"<subject> {parr<ies> it easily|easily meet<s> it with <subject's> "+H.b(a.gM().gh())+"|fend<s> it off easily}",!0)}else a.ca(c,"<subject> {parr<ies> it|meet<s> it with <subject's> "+H.b(a.gM().gh())+"|fend<s> it off}",!0)
b.bU("FightSituation")
if(a.gH()===!0)c.q(0,"this opens an opportunity for a counter attack")
C.a.q(b.f,S.eL(a,z))
return H.b(a.gh())+" parries "+H.b(z.cy)},"$3","gU",6,0,2],
O:function(a,b){var z,y,x,w
z=b.f
y=z.length!==0?C.a.gE(z):null
if(y.gbM())return 0
if(y.gbb()===C.j)return 1
x=a.gae()?0:0.2
w=this.b.gb0()?0.3:0
if(a.Q===!0)return 0.6-x+w
return 0.3-x+w},
N:function(a,b){return a.gM().gcA()},
A:{
uB:[function(a){return new G.lF("Parrying means deflecting your opponent's move with your weapon. When successful, it will give you an opportunity for a counter attack. It won't throw your opponent off balance like dodging does, but it's also slightly easier to do.",!1,!1,!0,C.c,a,null)},"$1","ta",2,0,5]}},lG:{"^":"a:1;a,b",
$0:function(){return this.a.av(this.b,"<subject> {fail<s>|<does>n't succeed}",!0)}},lH:{"^":"a:1;a,b,c",
$0:function(){return this.a.b.cM(this.c,"<subject> <is> too quick for <object>",!0,this.b)}}}],["","",,L,{"^":"",
bg:function(a,b,c){var z=new L.dP(null,null,null,null,null,null)
new L.ra(a,b,c).$1(z)
return z.p()},
ft:{"^":"cy;",
gaN:function(){return[F.rL(),G.ta(),X.rI()]},
gh:function(){return"SlashDefenseSituation"},
ar:function(){var z=new L.dP(null,null,null,null,null,null)
z.m(this)
new L.n4().$1(z)
return z.p()}},
ra:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$a2().ab(1073741823)
a.gaF().c=z
a.gaF().f=0
z=this.a.gj()
a.gaF().b=z
z=this.b.gj()
a.gaF().e=z
a.gaF().d=this.c
return a}},
n4:{"^":"a:0;",
$1:function(a){var z=a.gaF().f
if(typeof z!=="number")return z.a5()
a.gaF().f=z+1
return a}},
oO:{"^":"ft;de:a<,j:b<,bb:c<,cO:d<,I:e<",
a_:function(a){var z=new L.dP(null,null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof L.ft))return!1
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
dP:{"^":"d;a,b,c,d,e,f",
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
z=new L.oO(y,x,w,v,u)
if(y==null)H.f(P.l("attacker"))
if(x==null)H.f(P.l("id"))
if(w==null)H.f(P.l("predeterminedResult"))
if(v==null)H.f(P.l("target"))
if(u==null)H.f(P.l("time"))}this.m(z)
return z}}}],["","",,M,{"^":"",
bC:function(a,b){var z=new M.dQ(null,null,null,null,null)
new M.rc(a,b).$1(z)
return z.p()},
fu:{"^":"a0;",
gaN:function(){return[O.rR()]},
gh:function(){return"SlashSituation"},
ar:function(){var z=new M.dQ(null,null,null,null,null)
z.m(this)
new M.n5().$1(z)
return z.p()},
aB:function(a,b){if(a===0)return b.a8(this.a)
return},
aJ:function(a,b){return new H.J(a,new M.n6(this),[H.m(a,0)])}},
rc:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a2().ab(1073741823)
a.gaX().c=z
a.gaX().e=0
z=this.a.gj()
a.gaX().b=z
z=this.b.gj()
a.gaX().d=z
return a}},
n5:{"^":"a:0;",
$1:function(a){var z=a.gaX().e
if(typeof z!=="number")return z.a5()
a.gaX().e=z+1
return a}},
n6:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.i(a.gj(),z.a)||J.i(a.gj(),z.c)}},
oP:{"^":"fu;a,j:b<,c,I:d<",
a_:function(a){var z=new M.dQ(null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof M.fu))return!1
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
dQ:{"^":"d;a,b,c,d,e",
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
z=new M.oP(y,x,w,v)
if(y==null)H.f(P.l("attacker"))
if(x==null)H.f(P.l("id"))
if(w==null)H.f(P.l("target"))
if(v==null)H.f(P.l("time"))}this.m(z)
return z}}}],["","",,Q,{"^":"",kD:{"^":"I;P:c<,R:d<,a3:e<,V:f<,S:r<,b,a",
gh:function(){return"FinishSlashGroundedEnemy"},
gaj:function(){return""},
gao:function(){return"(WARNING should not be user-visible)"},
W:[function(a,b,c){throw H.c(new P.ab(null))},"$3","gT",6,0,2],
X:[function(a,b,c){var z=this.b
b.a4(z.gj(),new Q.kE())
c.fq(0,"<subject> {cuts|slashes|slits} <object's> {throat|neck|side}",z,a.gM())
X.d7(c,b,z)
return H.b(a.gh())+" slains "+H.b(z.gh())+" on the ground"},"$3","gU",6,0,2],
O:function(a,b){return 1},
N:function(a,b){return this.b.gad()&&a.gM().gb8()},
A:{
uu:[function(a){return new Q.kD(null,!0,!0,!0,C.c,a,null)},"$1","rS",2,0,5]}},kE:{"^":"a:0;",
$1:function(a){a.sau(0)
return a}}}],["","",,K,{"^":"",lz:{"^":"I;R:c<,a3:d<,V:e<,S:f<,P:r<,b,a",
gh:function(){return"OnGroundParry"},
gaj:function(){return"parry it"},
gao:function(){return"will <subject> parry it?"},
W:[function(a,b,c){a.as(c,"<subject> tr<ies> to {parry|deflect it|stop it{| with <subject's> "+H.b(a.gM().gh())+"}}")
S.ay(new K.lA(a,c),new K.lB(this,a,c),null,null)
return H.b(a.cy)+" fails to parry "+H.b(this.b.gh())},"$3","gT",6,0,2],
X:[function(a,b,c){a.ca(c,"<subject> {parr<ies> it|stop<s> it with <subject's> "+H.b(a.gM().gh())+"}",!0)
b.bU("FightSituation")
return H.b(a.cy)+" parries "+H.b(this.b.gh())},"$3","gU",6,0,2],
O:function(a,b){var z,y
z=b.f
y=z.length!==0?C.a.gE(z):null
if(y.gbM())return 0
if(y.gbb()===C.j)return 1
if(a.gH()===!0)return 0.6
return 0.3},
N:function(a,b){return a.gM().gcA()},
A:{
uA:[function(a){return new K.lz(!1,!1,!0,C.c,"You can deal serious damage when countering because your opponent is often caught off guard. On the other hand, counters require fast reaction and could throw you out of balance.",a,null)},"$1","t9",2,0,5]}},lA:{"^":"a:1;a,b",
$0:function(){return this.a.av(this.b,"<subject> {fail<s>|<does>n't succeed}",!0)}},lB:{"^":"a:1;a,b,c",
$0:function(){return this.a.b.cM(this.c,"<subject> <is> too quick for <object>",!0,this.b)}}}],["","",,Y,{"^":"",mn:{"^":"I;P:c<,R:d<,a3:e<,V:f<,S:r<,b,a",
gh:function(){return"RollOutOfWay"},
gaj:function(){return"roll out of way"},
gao:function(){return"will <subject> evade?"},
W:[function(a,b,c){a.as(c,"<subject> tr<ies> to roll out of the way")
a.av(c,"<subject> can't",!0)
return H.b(a.gh())+" fails to roll out of the way"},"$3","gT",6,0,2],
X:[function(a,b,c){a.ko(c,"<subject> <is> able to roll out of the way",!0,!0)
if(a.gH()===!0){b.a4(a.gj(),new Y.mo())
a.ca(c,"<subject> jump<s> up on <subject's> feet",!0)}b.bU("FightSituation")
return H.b(a.gh())+" rolls out of the way of "+H.b(this.b.gh())+"'s strike"},"$3","gU",6,0,2],
O:function(a,b){var z,y
z=b.f
y=z.length!==0?C.a.gE(z):null
if(y.gbM())return 0
if(y.gbb()===C.j)return 1
if(a.gH()===!0)return 1
return 0.5},
N:function(a,b){return!0},
A:{
uG:[function(a){return new Y.mn(null,!1,!1,!0,C.c,a,null)},"$1","tf",2,0,5]}},mo:{"^":"a:0;",
$1:function(a){a.sal(C.l)
return a}}}],["","",,V,{"^":"",
dB:function(a,b,c){var z=new V.dA(null,null,null,null,null,null)
new V.rd(a,b,c).$1(z)
return z.p()},
fa:{"^":"cy;",
gaN:function(){return[K.t9(),Y.tf()]},
gh:function(){return"OnGroundDefenseSituation"},
ar:function(){var z=new V.dA(null,null,null,null,null,null)
z.m(this)
new V.ly().$1(z)
return z.p()}},
rd:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$a2().ab(1073741823)
a.gaD().c=z
a.gaD().f=0
z=this.a.gj()
a.gaD().b=z
z=this.b.gj()
a.gaD().e=z
a.gaD().d=this.c
return a}},
ly:{"^":"a:0;",
$1:function(a){var z=a.gaD().f
if(typeof z!=="number")return z.a5()
a.gaD().f=z+1
return a}},
oJ:{"^":"fa;de:a<,j:b<,bb:c<,cO:d<,I:e<",
a_:function(a){var z=new V.dA(null,null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof V.fa))return!1
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
dA:{"^":"d;a,b,c,d,e,f",
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
z=new V.oJ(y,x,w,v,u)
if(y==null)H.f(P.l("attacker"))
if(x==null)H.f(P.l("id"))
if(w==null)H.f(P.l("predeterminedResult"))
if(v==null)H.f(P.l("target"))
if(u==null)H.f(P.l("time"))}this.m(z)
return z}}}],["","",,D,{"^":"",
fF:function(a,b){var z=new D.dS(null,null,null,null,null)
new D.re(a,b).$1(z)
return z.p()},
fE:{"^":"a0;",
gaN:function(){return[Q.rS()]},
gh:function(){return"StrikeDownSituation"},
ar:function(){var z=new D.dS(null,null,null,null,null)
z.m(this)
new D.nS().$1(z)
return z.p()},
aB:function(a,b){if(a===0)return b.a8(this.a)
return},
aJ:function(a,b){return new H.J(a,new D.nT(this),[H.m(a,0)])}},
re:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a2().ab(1073741823)
a.gaY().c=z
a.gaY().e=0
z=this.a.gj()
a.gaY().b=z
z=this.b.gj()
a.gaY().d=z
return a}},
nS:{"^":"a:0;",
$1:function(a){var z=a.gaY().e
if(typeof z!=="number")return z.a5()
a.gaY().e=z+1
return a}},
nT:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.i(a.gj(),z.a)||J.i(a.gj(),z.c)}},
oR:{"^":"fE;a,j:b<,c,I:d<",
a_:function(a){var z=new D.dS(null,null,null,null,null)
z.m(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof D.fE))return!1
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
dS:{"^":"d;a,b,c,d,e",
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
z=new D.oR(y,x,w,v)
if(y==null)H.f(P.l("attacker"))
if(x==null)H.f(P.l("id"))
if(w==null)H.f(P.l("targetOnGround"))
if(v==null)H.f(P.l("time"))}this.m(z)
return z}}}],["","",,O,{"^":"",lZ:{"^":"d;",
gbM:function(){return this.gbb()===C.n},
$isa0:1}}],["","",,K,{"^":"",dH:{"^":"d;a,b",
k:function(a){return this.b}}}],["","",,D,{"^":"",n7:{"^":"a6;R:b<,V:c<,a3:d<,S:e<,a",
gY:function(){return""},
gP:function(){return},
gh:function(){return"SlayMonstersAction"},
W:[function(a,b,c){throw H.c(new P.ab(null))},"$3","gT",6,0,2],
X:[function(a,b,c){var z,y,x,w,v
z=b.f
y=z.length!==0?C.a.gE(z):null
x=b.dG(y.gbv())
w=b.a
v=x.k8(b)
w.aq(0,v)
C.a.q(z,U.kk(new H.J(w,new D.n8(a,x),[H.m(w,0)]),v,x.r,y))
return H.b(a.gh())+" initiated combat with monsters in "+x.k(0)},"$3","gU",6,0,2],
ai:function(a,b){return"WARNING should not be user-visible"},
O:function(a,b){return 1},
N:function(a,b){var z=b.f
return H.a5(z.length!==0?C.a.gE(z):null,"$isaj").c}},n8:{"^":"a:0;a,b",
$1:function(a){var z,y
if(a.gaO()){z=a.gbn()
y=this.a.gbn()
z=z.a
y=y.gj()
if(z==null?y==null:z===y){z=a.gbv()
y=this.b.gh()
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1
return z}}}],["","",,Y,{"^":"",nZ:{"^":"cA;R:c<,a3:d<,V:e<,S:f<,b,a",
gP:function(){return},
gh:function(){return"TakeExitAction"},
W:[function(a,b,c){throw H.c(new P.ab(null))},"$3","gT",6,0,2],
X:[function(a,b,c){var z,y
z=this.b
c.q(0,z.gb4())
y=b.f
H.a5(y.length!==0?C.a.gE(y):null,"$isaj").b9(b,a,z.gjn(),c)
return H.b(a.gh())+" went through exit to "+z.a},"$3","gU",6,0,2],
ai:function(a,b){return"WARNING should not be user-visible"},
O:function(a,b){return 1},
N:function(a,b){var z=b.f
if(H.a5(z.length!==0?C.a.gE(z):null,"$isaj").c===!0)return!1
this.b.gjP()
return!0},
A:{
uJ:[function(a){return new Y.nZ(!1,!0,!1,null,a,null)},"$1","ud",2,0,47]}}}],["","",,F,{"^":"",
fm:function(a,b){var z=new F.dN(null,null,null,null,null)
new F.qZ(a,b).$1(z)
return z.p()},
aj:{"^":"a0;",
gaN:function(){return[Y.ud()]},
gbf:function(){var z=[]
C.a.aq(z,$.$get$ht())
z.push($.$get$fv())
return z},
gh:function(){return"RoomRoamingSituation"},
ar:function(){var z=new F.dN(null,null,null,null,null)
z.m(this)
new F.mp().$1(z)
return z.p()},
aB:function(a,b){return b.a.b6(0,new F.mq(),new F.mr())},
aJ:function(a,b){var z=this.aB(null,b)
if(z==null)return[]
return[z]},
fZ:function(a,b){a.a.ib(new F.mt(),!0)},
b9:function(a,b,c,d){var z,y,x,w,v,u,t
z=a.dG(c)
a.cL(this.b,F.fm(z,z.gk7()!=null))
d.j3()
z.c.$3(b,a,d)
d.G(0,"\n\n",!0)
for(y=R.hL(b,a),y=P.T(y,!0,H.x(y,"y",0)),x=y.length,w=a.a,v=0;v<y.length;y.length===x||(0,H.ak)(y),++v){u=a.a8(y[v].gj())
t=u.a_(new F.ms(z))
w.a7(0,u)
w.q(0,t)}},
cZ:function(a){if(J.i(this.a,$.$get$eg().b))return!1
return!0}},
qZ:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a2().ab(1073741823)
a.gaz().c=z
a.gaz().e=0
z=this.a.gh()
a.gaz().b=z
a.gaz().d=this.b
return a}},
mp:{"^":"a:0;",
$1:function(a){var z=a.gaz().e
if(typeof z!=="number")return z.a5()
a.gaz().e=z+1
return a}},
mq:{"^":"a:0;",
$1:function(a){return a.gH()===!0&&a.gaO()}},
mr:{"^":"a:1;",
$0:function(){return}},
mt:{"^":"a:0;",
$1:function(a){return!a.gbw()}},
ms:{"^":"a:0;a",
$1:function(a){a.sbv(this.a.b)
return a}},
oN:{"^":"aj;bv:a<,j:b<,c,I:d<",
a_:function(a){var z=new F.dN(null,null,null,null,null)
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
dN:{"^":"d;a,b,c,d,e",
gbv:function(){return this.gaz().b},
sbv:function(a){this.gaz().b=a
return a},
gj:function(){return this.gaz().c},
sk9:function(a){this.gaz().d=a
return a},
gI:function(){return this.gaz().e},
gaz:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
m:function(a){this.a=a},
p:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gaz().b
x=this.gaz().c
w=this.gaz().d
v=this.gaz().e
z=new F.oN(y,x,w,v)
if(y==null)H.f(P.l("currentRoomName"))
if(x==null)H.f(P.l("id"))
if(w==null)H.f(P.l("monstersAlive"))
if(v==null)H.f(P.l("time"))}this.m(z)
return z}}}],["","",,V,{"^":"",
o0:function(){var z=new V.dT(null,null,null)
new V.rn().$1(z)
return z.p()},
ob:function(){var z=new V.dU(null,null,null)
new V.rm().$1(z)
return z.p()},
nc:function(){var z=new V.dR(null,null,null)
new V.rl().$1(z)
return z.p()},
qX:{"^":"a:4;",
$3:function(a,b,c){c.G(0,"The crevice is small.\n",!0)}},
qY:{"^":"a:4;",
$3:function(a,b,c){c.G(0,"",!0)}},
qU:{"^":"a:4;",
$3:function(a,b,c){c.G(0,'The journey from slavery to power begins with a single crack of a skull. Oddmund falls to the rock floor and his blond hair is quickly filled with blood. Above him, Agruth is grinning. He finds Oddmund\'s death funny. He always finds dying slaves funny.\n\n\nYou and Briana watch this in terror, unable to move.\n\n\nWhen the puddle of blood beneath Oddmund\'s head stops spreading, Agruth bends down to check the teeth in case there\'s gold in them. He stops when he notices you looking at him.\n\n\n"What the matter, human?" he says, smirking. "You have no work?"\n',!0)}},
qW:{"^":"a:4;",
$3:function(a,b,c){c.G(0,"",!0)}},
qS:{"^":"a:4;",
$3:function(a,b,c){c.G(0,'You are Aren, a slave. You have spent three painful years inside this mountain, between the foul-smelling cave walls, and under the barbed whip of Agruth. Your past life is almost forgotten, but it has to be revived. There is no turning back now. [a][b][c][d][e]\n\n\nBriana kneels down to Oddmund. "Dead," she says plainly.\n\n\nOddmund was the leader among the slaves. He was the only one brave enough to steal the disgusting but precious food from the goblins and give it to the other slaves. He was the only slave who knew how to get from here.\n',!0)}},
qT:{"^":"a:4;",
$3:function(a,b,c){c.G(0,"",!0)}},
kG:{"^":"aH;Y:c<,h:d<,b,a",
N:function(a,b){var z=b.f
if(!J.i(H.a5(z.length!==0?C.a.gE(z):null,"$isaj").a,"start_of_book"))return!1
return!0},
X:[function(a,b,c){c.q(0,"You make it to the Church undetected, slipping through one of the lower windows leading into the main hall.")
b.ah("RoomRoamingSituation").b9(b,N.aD(b),"underground_church",c)
return H.b(a.gh())+" successfully performs FleeThroughNecromancersChurch"},"$3","gU",6,0,2],
W:[function(a,b,c){c.q(0,null)
c.q(0,"You manage to slip into a Church window, but a guard notices your shadow. As he squints in your direction, you disappear into the shadowy main hall.")
N.es(b,new V.kH())
b.ah("RoomRoamingSituation").b9(b,N.aD(b),"underground_church",c)
return H.b(a.gh())+" fails to perform FleeThroughNecromancersChurch"},"$3","gT",6,0,2],
O:function(a,b){return 0.9},
gV:function(){return!1},
ai:function(a,b){return"Will you be successful?"},
gS:function(){return},
gP:function(){return"The Underground Church will have fewer guards, so you're more likely to slip through unnoticed. Then again, you have no idea who--or what--lurks there."},
gR:function(){return!1}},
kH:{"^":"a:0;",
$1:function(a){var z
a.gbI()
z=a.b
a.gbI()
a.b=z+1
return a}},
kI:{"^":"aH;Y:c<,h:d<,b,a",
N:function(a,b){var z=b.f
if(!J.i(H.a5(z.length!==0?C.a.gE(z):null,"$isaj").a,"start_of_book"))return!1
return!0},
X:[function(a,b,c){c.q(0,"You sneak your way into the War Forges and hide in the shadows of an alcove.")
b.ah("RoomRoamingSituation").b9(b,N.aD(b),"war_forge",c)
return H.b(a.gh())+" successfully performs FleeThroughWarForge"},"$3","gU",6,0,2],
W:[function(a,b,c){c.q(0,null)
c.q(0,"You manage to sneak into the War Forges, but a guard notices your shadow. You quickly duck into an alcove as he frowns in your direction and scratches his head.")
N.es(b,new V.kJ())
b.ah("RoomRoamingSituation").b9(b,N.aD(b),"war_forge",c)
return H.b(a.gh())+" fails to perform FleeThroughWarForge"},"$3","gT",6,0,2],
O:function(a,b){return 0.7},
gV:function(){return!1},
ai:function(a,b){return"Will you be successful?"},
gS:function(){return},
gP:function(){return"The War Forges are where the orcs build their weapons and war machines. As a slave, you\u2019re familiar with the place and it's a more direct path to freedom, but almost certainly filled with orcs."},
gR:function(){return!1}},
kJ:{"^":"a:0;",
$1:function(a){var z
a.gbI()
z=a.b
a.gbI()
a.b=z+1
return a}},
mZ:{"^":"aH;Y:c<,h:d<,b,a",
N:function(a,b){var z=b.f
if(!J.i(H.a5(z.length!==0?C.a.gE(z):null,"$isaj").a,"start_of_book"))return!1
if(b.iO(this.d))return!1
return!0},
X:[function(a,b,c){c.q(0,"You search his pockets but turn up with nothing. Just then, you hear heavy footfalls approaching. Briana grabs your arm. \u201cWe\u2019ve got to go.\u201d  \n\n\nYou realize that if Agruth had something valuable on him, he would have hidden it well. You run your hand inside his vest and find a troma herb. This boosts your energy right when you need it--very handy. (Your stamina increases by 1.)")
N.rX(b,1)
return H.b(a.gh())+" successfully performs SearchAgruth"},"$3","gU",6,0,2],
W:[function(a,b,c){c.q(0,null)
c.q(0,"You search but don\u2019t find anything. Suddenly, heavy footfalls come your way. No choice--you have to go now.")
return H.b(a.gh())+" fails to perform SearchAgruth"},"$3","gT",6,0,2],
O:function(a,b){return 0.9},
gV:function(){return!1},
ai:function(a,b){return"Will you be successful?"},
gS:function(){return},
gP:function(){return"You have taken his weapon but there might be other useful items in his pocket."},
gR:function(){return!1}},
qQ:{"^":"a:4;",
$3:function(a,b,c){c.G(0,"This must be the place that the orcs call the Shafts. It's a tall, seemingly endless room, with many walkways across.\n\n\n\n\n\n\nYou realize there is really only one way out, over one of the walkways. You'll have to run, there is no hiding anymore.\n",!0)}},
qR:{"^":"a:4;",
$3:function(a,b,c){c.G(0,"",!0)}},
qO:{"^":"a:4;",
$3:function(a,b,c){c.G(0,"Suddenly, an **orc** and a **goblin** jump in front of you from a slimy crevice, swords in hands.\n\n\n![Orc and Goblin](img/orc_and_goblin_sketch.jpg)\n",!0)}},
qP:{"^":"a:4;",
$3:function(a,b,c){c.G(0,"",!0)}},
qM:{"^":"a:4;",
$3:function(a,b,c){c.G(0,"The Underground Church is a dark, long, tall cave. In the distance, you see the altar. It's glowing. There are unnatural noises.\n\n\n\n\n",!0)
if(H.a5(b.c,"$isbW").b>=1)c.G(0,"You hear orders being yelled somewhere behind you.",!0)
c.G(0,"\nAfter a bit of searching, you find a twisty passage going from the right hand side of the Church.\n",!0)}},
qN:{"^":"a:4;",
$3:function(a,b,c){c.G(0,"",!0)}},
qJ:{"^":"a:4;",
$3:function(a,b,c){c.G(0,'A blast of smoke and heat greets you as you enter this vast room. The roaring fire and the clanging of metal draws your attention to the far wall, where scores of orcs shovel coal into a giant furnace. These are the war forges.\n\n\nYou and Briana take a moment to stare; likely no living human has seen this and lived to tell others. Orc teams tilt huge kettles of molten steel into molds for axes, war hammers, and greatswords. They move as if in a trance, without a single complaint as they work. Strange. \n\n\nYou and Briana duck behind some carts. As you head towards what seems to be an exit, you hear strange whispering. You crane your neck and spot a dark-robed figure\u2014a priest?\u2014chanting softly to himself by the forge. Despite his whispering, his words crawl through your mind like a spider:\n\n\n> "_Pwarfa n\u2019ngen aradra._ The slow suffer. _Madraga n\u2019ngen nach santutra._ Only the hard-working prosper. _Nfarfi Arach m\u2019marrash._ The Dead Prince sees all."\n\n\n',!0)
if(H.a5(b.c,"$isbW").b>=1)c.G(0,"Somewhere behind you, a gutteral tongue bellows a string of orders. You must get moving.",!0)
c.G(0,"\nYou can guess which corridor will get you out. Fresh air is flowing into the forge through it, stirring the smoke. It's not far, and thankfully there is nobody in the way.\n",!0)}},
qL:{"^":"a:4;",
$3:function(a,b,c){c.G(0,"",!0)}},
qH:{"^":"a:4;",
$3:function(a,b,c){c.G(0,"The crevice is small.\n",!0)}},
qI:{"^":"a:4;",
$3:function(a,b,c){c.G(0,"",!0)}},
qF:{"^":"a:4;",
$3:function(a,b,c){c.G(0,'You emerge into blinding sunlight. You moan and cover your eyes as the world spins around you and your ears ring like glass chimes. \n\n\nBriana steadies you as sway on your feet. \u201cNow is absolutely the worst time to faint.\u201d\n\n\n\u201cI\u2019m fine,\u201d you mutter. \u201cIt\u2019s just\u2026the sun\u2026been so long\u2026\u201d\n\n\nShe guides you forward and you touch the cliff wall. \u201cI don\u2019t mean to rush you, this being your big reunion with fresh air and all, but we can\u2019t stay. Orcs will be coming through here any moment, and we\'re in no shape to face them. Look at us. We should run as far from this cursed mountain as possible."\n\n\n"I\'m going to the Fort and not a step further," you say, blinking tears from your eyes.\n\n\n"Are you crazy?" She looks at you, then at the cave, then in the direction of Fort Ironcast, a few miles down the mountain slope. "You saw what\'s in the mountain. The Fort has no chance of withstanding a force that size. It will fall within a day!"\n\n\n"If the Fort falls, there\'s no place far enough from here to be safe. You know that."\n\n\nBriana frowns. "I don\'t, actually." There\'s an orcish war cry coming from somewhere down the cave. The Orcs are coming out. Briana\u2019s frown deepens to a scowl. "We\'re losing time. We may never even make it to the Fort, and here we are talking about where to go from there. Well, I see two ways out. Which way do you think we should go?\u201d \n\n\nBlinking hard, you make out your surroundings. Before you lies the winding, beaten path that leads down the mountain. Seems simple enough, but that way inevitably means more orcs.\nBut Briana points you to the edge of a nearby cliff. You peer over the edge and study the descent. Without proper gear it\u2019s a difficult climb down, but not too sheer, and likely no resistance. Perhaps you could chance it?\n',!0)}},
qG:{"^":"a:4;",
$3:function(a,b,c){c.G(0,"The cavern entrance to Mt. Bloodrock yawns before you. The wind issuing from its depths gives you the disturbing impression that it\u2019s breathing.\n",!0)}},
qD:{"^":"a:4;",
$3:function(a,b,c){c.G(0,"The Bloodrock Pass winds down the slope of mountain. Though the weather-beaten path looks well-traveled, you thankfully come across no patrols at this time. \n\n\n",!0)
if(b.iP("sneak_onto_cart"))c.G(0,"You and Briana stay quiet and still in your hiding spot. An hour later, you peek out of the cart and see that you have reached level ground. You sneak off the cart and hide behind some rocks as it drives away.",!0)
else c.G(0,"You run down the mountain side as fast as your legs can carry you. When you pause, gulping for air, you find you have nearly reached the bottom.",!0)
c.G(0,"\nA few miles further down and you will reach Fort Ironcast.\n",!0)}},
qE:{"^":"a:4;",
$3:function(a,b,c){c.G(0,"The Bloodrock pass flows snakelike down the mountain.\n",!0)}},
qB:{"^":"a:4;",
$3:function(a,b,c){c.G(0,"The pass slopes down a short way before bending to the left. You inch forward and peer around the corner. Several feet away, a stone gate looms over the pass, flanked on both sides with thick walls too high to climb. An iron gate bearing the insignia of the many-eyed octopus lies between you and freedom. \n\n\nYou spy only two pairs of orc guards standing by the gate. An ox cart is parked before them, the rider apparently negotiating passage with the keepers. From your knowledge of orcish, you can tell that the guards are demanding the driver leave them some food.\n\n\n\u201cLooks like a supply cart,\u201d Briana says. \u201cAnd likely our way out of here. We can sneak onto the back while they\u2019re distracted.\u201d\n\n\nYou don\u2019t answer. With only four distracted orcs and the cart driver, you may be able to take them by surprise.\n\n\nBriana seems to sense what you\u2019re thinking. \u201cA direct attack sounds risky. If they have an alarm, they can bring reinforcements here in a matter of moments.\u201d\n",!0)}},
qC:{"^":"a:4;",
$3:function(a,b,c){c.G(0,"The Bloodrock stone gate looms ahead of you.\n",!0)}},
rr:{"^":"a:4;",
$3:function(a,b,c){c.G(0,"The orcish guards see you approaching and raise their weapons. One of them smirks.\n\n\n\u201cWe\u2019re lucky, Ruglag!\u201d he says in a rumbling voice. \u201cToday we kill human.\u201d\n",!0)}},
qA:{"^":"a:4;",
$3:function(a,b,c){c.G(0,"The stone gate looms before you.\n",!0)}},
n9:{"^":"aH;Y:c<,h:d<,b,a",
N:function(a,b){var z=b.f
if(!J.i(H.a5(z.length!==0?C.a.gE(z):null,"$isaj").a,"mountain_pass_gate"))return!1
return!0},
X:[function(a,b,c){c.q(0,"You squeeze through the burlap sacks and hide under some rags. The orcs conclude their negotiations as the driver hurls a bag of turnips to a guard. The gates split open to the rattle of chains and the ominous creak of metal hinges. The ox cart lurches forward into the mountain pass.\nIn the cart you find a small keg of beer. You decide it is worth taking.")
N.es(b,new V.na())
b.ah("RoomRoamingSituation").b9(b,N.aD(b),"mountain_pass",c)
return H.b(a.gh())+" successfully performs SneakOntoCart"},"$3","gU",6,0,2],
W:[function(a,b,c){throw H.c(new P.E("Success chance is 100%"))},"$3","gT",6,0,2],
O:function(a,b){return 1},
gV:function(){return!1},
ai:function(a,b){return"Will you be successful?"},
gS:function(){return},
gP:function(){return"With the guards distracted, it should be a simple matter to squeeze through the burlap sacks and hide under some rags."},
gR:function(){return!1}},
na:{"^":"a:0;",
$1:function(a){a.gbI()
a.a=!0
return a}},
o_:{"^":"aH;Y:c<,h:d<,b,a",
N:function(a,b){var z=b.f
if(!J.i(H.a5(z.length!==0?C.a.gE(z):null,"$isaj").a,"mountain_pass_gate"))return!1
if(b.kw(this.d)!=null)return!1
return!0},
X:[function(a,b,c){c.q(0,"You sneak forward as close as you can. There are four guards in total. Two of them are distracted with talking to the cart merchant. But the other two are on the other side of the road, leaning against a large rock. They\u2019re paying attention to the argument and not much else.\n\n\nYou and Briana successfully make it to the other side of the rock. With a vicious twist you snap one orc\u2019s neck while Briana digs her knife into the other guard\u2019s gullet. You drag them behind the rock, out of sight. In one guard\u2019s pouch you find 10 gold coins. You also take an orcish shield. \n\n\nOnce done, you sneak back away from the gate.")
b.a4(a.gj(),new V.o8())
return H.b(a.gh())+" successfully performs TakeOutGateGuards"},"$3","gU",6,0,2],
W:[function(a,b,c){c.q(0,"You sneak forward as close as you can. There are four guards in total. Two of them are distracted with talking to the cart merchant. But the other two are on the other side of the road, leaning against a large rock. They\u2019re paying attention to the argument and not much else.\n\n\nYou and Briana successfully make it to the other side of that rock. As luck would have it, though, the two orcs decide to look around at that very moment. You dive behind the rock and hope they didn\u2019t see you.")
C.a.q(b.f,V.o0())
return H.b(a.gh())+" fails to perform TakeOutGateGuards"},"$3","gT",6,0,2],
O:function(a,b){return 0.5},
gV:function(){return!1},
ai:function(a,b){return"Will you be successful?"},
gS:function(){return},
gP:function(){return"Two of the orcs seem distracted. You're not particularly good at camouflage but you can still try."},
gR:function(){return!1}},
o8:{"^":"a:0;",
$1:function(a){var z=a.gbp()
if(typeof z!=="number")return z.a5()
a.sbp(z+10)
return a}},
fJ:{"^":"a0;",
gbf:function(){return[new A.bB(new V.o3(),"Take the guards out","You decide to finish the job, however improbable it seems that you\u2019ll succeed.","take_out_gate_guards_rescue",!0,null),new A.bB(new V.o4(),"Sneak away","It\u2019s too risky.","take_out_gate_guards_continuation_of_failure",!0,null)]},
gh:function(){return"take_out_gate_guards"},
ar:function(){var z=new V.dT(null,null,null)
z.m(this)
new V.o5().$1(z)
return z.p()},
aB:function(a,b){if(a!==0)return
return b.a.aL(0,new V.o6())},
aJ:function(a,b){return[a.aL(0,new V.o7())]}},
rn:{"^":"a:0;",
$1:function(a){var z=$.$get$a2().ab(1073741823)
a.ga6().b=z
a.ga6().c=0
return a}},
o3:{"^":"a:8;",
$4:function(a,b,c,d){J.aO(c,"Suspicious, the orcs come close to investigate the disturbance. You let one pass behind the rock, then grab the other by the throat and into a choke hold. Briana takes the other one out silently with a knife in the back. You drag them to the other side of the rock, out of sight.\n\n\nYou find 10 gold coins in a pouch attached to one of the orcs\u2019 belt. You also take an orcish shield. Then, you sneak back away from the gate.")
b.a4(a.gj(),new V.o1())
b.a4(a.gj(),new V.o2())
b.ba()
return"TakeOutGateGuardsRescueSituation resolved with rescue/continuation (Take the guards out)"}},
o1:{"^":"a:0;",
$1:function(a){var z=a.gb1()
if(typeof z!=="number")return z.ax()
a.sb1(z-1)
return a}},
o2:{"^":"a:0;",
$1:function(a){var z=a.gbp()
if(typeof z!=="number")return z.a5()
a.sbp(z+10)
return a}},
o4:{"^":"a:8;",
$4:function(a,b,c,d){J.aO(c,"Seeing that the window of opportunity has passed, you sneak away from the rock.")
b.ba()
return"TakeOutGateGuardsRescueSituation resolved with rescue/continuation (Sneak away)"}},
o5:{"^":"a:0;",
$1:function(a){var z=a.ga6().c
if(typeof z!=="number")return z.a5()
a.ga6().c=z+1
return a}},
o6:{"^":"a:0;",
$1:function(a){return a.gH()}},
o7:{"^":"a:0;",
$1:function(a){return a.gH()}},
rp:{"^":"a:4;",
$3:function(a,b,c){c.G(0,"After hours of climbing with several stops on the way, you make it all the way down to the base of the mountain. Thankfully, there are no wandering orc patrols here or any other dangers, so you decide to camp behind some rocks and rest for a few hours. Briana takes the watch.\n\n\nWhen it is your turn to go on watch, you see something that you haven\u2019t noticed before. Carved onto the rock face is what appears to be an enormous door; cunning craftsmanship has disguised it to look like part of the mountainside. You point it out to Briana when she awakens and the two of you inspect it more closely. It seems tall enough for a giant and wide enough for a herd of cattle to pass through. Yet you find no indication that is has been opened in many years. And try as you might, neither of you can find a mechanism for opening it.\n\n\nYou give up after an hour\u2019s work of inspection and leave it alone for now. Fort Ironcast still awaits you.\n",!0)}},
rq:{"^":"a:4;",
$3:function(a,b,c){c.G(0,"The great stone doors still stands unopened on the mountainside.\n",!0)}},
rg:{"^":"a:4;",
$3:function(a,b,c){c.G(0,"You and Briana tie yourselves together with some rope. Then, with a deep breath you swing yourself over the side and gently find a toehold with your foot. You lower yourself to the next. And the next. \n\n\nOver the next agonizing hour, you inch your way down the mountainside. You keep looking down to see how much further is left before the slope becomes gentler, but it seems you are hardly making progress.\n\n\n\u201cRemind me again why we decided to go down this way?\u201d Briana grouses. You decide to save your breath. There\u2019s still a ways to go.\n",!0)}},
ro:{"^":"a:4;",
$3:function(a,b,c){c.G(0,"",!0)}},
o9:{"^":"aH;Y:c<,h:d<,b,a",
N:function(a,b){var z=b.f
if(!J.i(H.a5(z.length!==0?C.a.gE(z):null,"$isaj").a,"winged_serpent_nest"))return!1
return!0},
X:[function(a,b,c){c.q(0,"Intimidated by your weapon, the winged serpent abandons its nest and flees to the mountaintop.")
b.ah("RoomRoamingSituation").b9(b,N.aD(b),"mountainside_base",c)
return H.b(a.gh())+" successfully performs ThreatenWingedSerpent"},"$3","gU",6,0,2],
W:[function(a,b,c){c.q(0,"The serpent does not even look at your sword as you swing it wildly. Its reptilian eyes glitter as it opens its jaws wide.")
C.a.q(b.f,V.ob())
return H.b(a.gh())+" fails to perform ThreatenWingedSerpent"},"$3","gT",6,0,2],
O:function(a,b){return 0.3},
gV:function(){return!1},
ai:function(a,b){return"Will you be successful?"},
gS:function(){return},
gP:function(){return"You have a disadvantage this high up with your backs to the mountainside."},
gR:function(){return!1}},
fO:{"^":"a0;",
gbf:function(){return[new A.bB(new V.od(),"Get Briana\u2019s help","Maybe your companion has an answer.","threaten_winged_serpent_rescue",!0,null),new A.bB(new V.oe(),"Face the winged serpent head on","You will attack the creature straight on.","threaten_winged_serpent_continuation_of_failure",!0,null)]},
gh:function(){return"threaten_winged_serpent"},
ar:function(){var z=new V.dU(null,null,null)
z.m(this)
new V.of().$1(z)
return z.p()},
aB:function(a,b){if(a!==0)return
return b.a.aL(0,new V.og())},
aJ:function(a,b){return[a.aL(0,new V.oh())]}},
rm:{"^":"a:0;",
$1:function(a){var z=$.$get$a2().ab(1073741823)
a.ga6().b=z
a.ga6().c=0
return a}},
od:{"^":"a:8;",
$4:function(a,b,c,d){J.aO(c,"Just as the serpent strikes, Briana hurls her dagger at its wing. The weapon grazes the creature\u2019s wing just enough to keep it from directly biting you. Still, one poisoned fang grazes your skin.")
b.ah("RoomRoamingSituation").b9(b,N.aD(b),"mountainside_base",c)
b.ba()
return"ThreatenWingedSerpentRescueSituation resolved with rescue/continuation (Get Briana\u2019s help)"}},
oe:{"^":"a:8;",
$4:function(a,b,c,d){J.aO(c,"You slash at the serpent\u2019s head as it moves in to strike you!\n\n\nBut the sky is the creature\u2019s domain, and it easily weaves away from your blows before coiling itself around your sword arm. Before you can react it bites deeply into your neck. You topple over the edge of the mountain. It\u2019s now a matter of what kills you first: the fall or the venom.")
b.a4(a.gj(),new V.oc())
b.ba()
return"ThreatenWingedSerpentRescueSituation resolved with rescue/continuation (Face the winged serpent head on)"}},
oc:{"^":"a:0;",
$1:function(a){a.sau(0)
return a}},
of:{"^":"a:0;",
$1:function(a){var z=a.ga6().c
if(typeof z!=="number")return z.a5()
a.ga6().c=z+1
return a}},
og:{"^":"a:0;",
$1:function(a){return a.gH()}},
oh:{"^":"a:0;",
$1:function(a){return a.gH()}},
nb:{"^":"aH;Y:c<,h:d<,b,a",
N:function(a,b){var z=b.f
if(!J.i(H.a5(z.length!==0?C.a.gE(z):null,"$isaj").a,"winged_serpent_nest"))return!1
return!0},
X:[function(a,b,c){c.q(0,"Your sibilant words reach the winged serpent\u2019s ears. It coils in the air for a while longer, then whips towards its nest to clutch possessively at its eggs. You decide it\u2019s time to move on.")
b.ah("RoomRoamingSituation").b9(b,N.aD(b),"mountainside_base",c)
return H.b(a.gh())+" successfully performs SootheWingedSerpent"},"$3","gU",6,0,2],
W:[function(a,b,c){c.q(0,"The serpent sways at your hissing, but is otherwise unimpressed as it opens its jaws menacingly.")
C.a.q(b.f,V.nc())
return H.b(a.gh())+" fails to perform SootheWingedSerpent"},"$3","gT",6,0,2],
O:function(a,b){return 0.8},
gV:function(){return!1},
ai:function(a,b){return"Will you be successful?"},
gS:function(){return},
gP:function(){return"The creature is only defending its nest\u2014maybe you can convince it that you mean no harm."},
gR:function(){return!1}},
fx:{"^":"a0;",
gbf:function(){return[new A.bB(new V.ne(),"Get Briana\u2019s help","Maybe your companion has an answer.","soothe_winged_serpent_rescue",!0,null),new A.bB(new V.nf(),"Face the winged serpent head on","You will attack the creature straight on.","soothe_winged_serpent_continuation_of_failure",!0,null)]},
gh:function(){return"soothe_winged_serpent"},
ar:function(){var z=new V.dR(null,null,null)
z.m(this)
new V.ng().$1(z)
return z.p()},
aB:function(a,b){if(a!==0)return
return b.a.aL(0,new V.nh())},
aJ:function(a,b){return[a.aL(0,new V.ni())]}},
rl:{"^":"a:0;",
$1:function(a){var z=$.$get$a2().ab(1073741823)
a.ga6().b=z
a.ga6().c=0
return a}},
ne:{"^":"a:8;",
$4:function(a,b,c,d){J.aO(c,"Just as the serpent strikes, Briana hurls her dagger at its wing. The weapon grazes the creature\u2019s wing just enough to keep it from directly biting you. Still, one poisoned fang grazes your skin.")
b.ah("RoomRoamingSituation").b9(b,N.aD(b),"mountainside_base",c)
b.ba()
return"SootheWingedSerpentRescueSituation resolved with rescue/continuation (Get Briana\u2019s help)"}},
nf:{"^":"a:8;",
$4:function(a,b,c,d){J.aO(c,"You slash at the serpent\u2019s head as it moves in to strike you!\n\n\nBut the sky is the creature\u2019s domain, and it easily weaves away from your blows before coiling itself around your sword arm. Before you can react it bites deeply into your neck. You topple over the edge of the mountain. It\u2019s now a matter of what kills you first: the fall or the venom.")
b.a4(a.gj(),new V.nd())
b.ba()
return"SootheWingedSerpentRescueSituation resolved with rescue/continuation (Face the winged serpent head on)"}},
nd:{"^":"a:0;",
$1:function(a){a.sau(0)
return a}},
ng:{"^":"a:0;",
$1:function(a){var z=a.ga6().c
if(typeof z!=="number")return z.a5()
a.ga6().c=z+1
return a}},
nh:{"^":"a:0;",
$1:function(a){return a.gH()}},
ni:{"^":"a:0;",
$1:function(a){return a.gH()}},
oa:{"^":"aH;Y:c<,h:d<,b,a",
N:function(a,b){var z=b.f
if(!J.i(H.a5(z.length!==0?C.a.gE(z):null,"$isaj").a,"winged_serpent_nest"))return!1
return!0},
X:[function(a,b,c){c.q(0,"You grab one of the eggs from the nest and hold over the edge. The serpent hovers in place, hissing loudly, but otherwise holding off its attack. \n\n\n\n\nYou grin at it as you juggle the egg from one hand to the other. With one smooth motion you cock your arm back and throw. The serpent gives a piercing cry, then launches itself after its precious offspring.\n\n\n\n\n\u201cGood thinking, throwing that egg,\u201d said Briana.\n\n\n\n\n\u201cYes, well, I just had to make it think I threw it,\u201d you say, and show her the serpent egg in your hand. \u201cI just threw the rock I had in my other hand.\u201d\n\n\n\n\nBriana whistled. \u201cThat should fetch some coin from the right merchants. Now, let\u2019s get out of here before that thing comes back.\u201d")
b.ah("RoomRoamingSituation").b9(b,N.aD(b),"mountainside_base",c)
return H.b(a.gh())+" successfully performs ThreatenWingedSerpentEggs"},"$3","gU",6,0,2],
W:[function(a,b,c){throw H.c(new P.E("Success chance is 100%"))},"$3","gT",6,0,2],
O:function(a,b){return 1},
gV:function(){return!1},
ai:function(a,b){return"Will you be successful?"},
gS:function(){return},
gP:function(){return"Perhaps you can divert its attention."},
gR:function(){return!1}},
qV:{"^":"a:4;",
$3:function(a,b,c){c.G(0,"After an hour, you find yourself at the limit of your endurance. Thankfully, you find a narrow ledge just a few feet below you. You lower yourself onto the edge and sit, leaning gratefully against the rock face. \n\n\nA few dozen feet below, you can see where the mountainside starts to slope less steeply. Perhaps you have another hour in the descent before you could rest again. \n\n\nBriana joins you, breathing hard from the exertion. \n\n\n\u201cI\u2019d rather the orcs kill us than do it ourselves,\u201d she says when she catches her breath. \u201cI\u2019d also like to stay on this ledge forever, if you don\u2019t mind.\u201d\n\n\nBefore you can reply, you spy something at the corner of your vision. Poking out from a crevice in the cliff side wall are dead leaves, branches, and dry grass. Your exhausted mind wonders about what these would be doing this far up, so you move in to investigate. \n\n\n\u201cIt\u2019s\u2026a nest?\u201d Briana says as you both peer into the crevice. Inside is a clutch of six leathery eggs.\n\n\nWhat manner of creature would build a nest here? You ask yourself. And the answer comes to you at the same time as a loud hissing noise fills the air. \n\n\nA large moss-green serpent adorned with black feathered wings hovers above you. It gives one more warning hiss, then dives to attack.\n\n\nYou must defend yourselves.\n",!0)}},
r5:{"^":"a:4;",
$3:function(a,b,c){c.G(0,"The sheer cliff of the mountainside impedes your progress.\n",!0)}},
qz:{"^":"a:4;",
$3:function(a,b,c){c.G(0,"You leave the dust of the Bloodrock mountain pass for the gentler plateaus of the Aelphremede mountain range. The road crawls along the spine of the mountains all the way to Fort Ironcast, which sits on the horizon like a sleeping sentinel.\n\n\nThe last time you saw this path you were still a child, shaking and crying, being led in chains through the grass by your orc captors. The lights from the distant Fort Ironcast may as well have been on the other side of the world. \n\n\nAnd now you are trudging the opposite way, in a bid to save the people who once failed to save you. \n\n\nA movement to your left catches your eye. You are aghast to see an orc patrol fanning out across the grasslands. \n\n\nWith only moments to act, you and Briana drop down to the grass. The patrol nears you, seemingly unconcerned with their proximity to the Fort. In a few moments they will be upon you.\n\n\nAnd right then you are seized by the presence of an alien power. Your vision blanks out as a dark and terrible voice, sonorous as a cathedral music, speaks in your mind.\n\n\n\u201cStand up.\u201d  \n\n\nYou grit your teeth and moan as the pain explodes in your skull. \u201cAren?\u201d hisses Briana. \u201cAren, what\u2019s wrong?\u201d \n\n\n\u201cGet out of my head!\u201d you moan, clutching at your head even as your legs start to lift you upright. Only Briana\u2019s death grip on your arm keeps you low in the grass. \n\n\nAnd still the voice speaks again, relentless as the sea. \u201cYou are mine,\u201d it says. \u201cYour flesh, your thoughts. Your very desires. You have run a long way, but now you will return home. Now I bid you: stand!\u201d \n\n\n\u201cNo!\u201d Yet another voice pierces your mind: Briana\u2019s. Her word cuts through the haze in your vision like a sunray. The dark voice retreats from your brain. When you come to, you are lying flat on the grass. Briana\u2019s hand is still on your arm, radiating a strange, soothing warmth that leaves you at peace.\n\n\n\u201cWhat did you...\u201d you began, but she clamps her other hand on your mouth. You peers through the grass and see the party of orcs that were passing just a few feet away. Thankfully, none of them have noticed you.\n\n\nWhen they leave, you turn to Briana. \u201cIt\u2019s a gift we fae have,\u201d she said. \u201cWe can sense possession and abjure it, at least temporarily. Seems even half-breeds like me have some talent with it. You feeling better yet?\u201d\n\n\n\u201cMuch,\u201d you reply. \u201cBriana...thanks.\u201d\n\n\n\u201cDon\u2019t mention it. You mind telling me what that...thing in your head was?\u201d\n\n\n\u201cAnother time.\u201d You get up and pull her along. \u201cRun now, talk later. Let\u2019s get to safety.\u201d\n\n\nTogether you jog all the way to the every growing silhouette of Fort Ironcast.\n",!0)}},
qK:{"^":"a:4;",
$3:function(a,b,c){c.G(0,"A dirt road streaks through the grass. In the distance, a stone fort looms.\n",!0)}},
oS:{"^":"fJ;j:a<,I:b<",
a_:function(a){var z=new V.dT(null,null,null)
z.m(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof V.fJ))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
y=z==null?y==null:z===y
z=y}else z=!1
return z},
gv:function(a){return Y.R(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)))},
k:function(a){return"TakeOutGateGuardsRescueSituation {id="+J.h(this.a)+",\ntime="+J.h(this.b)+",\n}"}},
dT:{"^":"d;a,b,c",
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
oU:{"^":"fO;j:a<,I:b<",
a_:function(a){var z=new V.dU(null,null,null)
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
k:function(a){return"ThreatenWingedSerpentRescueSituation {id="+J.h(this.a)+",\ntime="+J.h(this.b)+",\n}"}},
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
z=new V.oU(y,x)
if(y==null)H.f(P.l("id"))
if(x==null)H.f(P.l("time"))}this.m(z)
return z}},
oQ:{"^":"fx;j:a<,I:b<",
a_:function(a){var z=new V.dR(null,null,null)
z.m(this)
a.$1(z)
return z.p()},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof V.fx))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
y=z==null?y==null:z===y
z=y}else z=!1
return z},
gv:function(a){return Y.R(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)))},
k:function(a){return"SootheWingedSerpentRescueSituation {id="+J.h(this.a)+",\ntime="+J.h(this.b)+",\n}"}},
dR:{"^":"d;a,b,c",
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
return z}}}],["","",,N,{"^":"",
uX:[function(a){return[N.ea(),N.hk()]},"$1","uh",2,0,14],
uY:[function(a){return[R.b6(1000+$.$get$d1().ab(999999),"Agruth",null,null,new G.ca("scimitar",1,1,!0,!1,P.bv(C.q,null)),null,0,2,100,!1,2,!0,C.r,0,$.$get$ci())]},"$1","ui",2,0,14],
aD:function(a){return a.giR().aL(0,new N.rV())},
rX:function(a,b){a.a4(N.aD(a).gj(),new N.rY(b))},
v0:[function(a){if(a.fn("take_out_gate_guards")||a.fn("take_out_gate_guards_rescue"))return[N.ea()]
else return[N.ea(),N.hk()]},"$1","uj",2,0,14],
es:function(a,b){var z,y
z=H.a5(a.c,"$isbW")
z.toString
y=new M.dX(null,!1,0)
y.m(z)
a.c=b.$1(y).p()},
hk:function(){return R.b6(1000+$.$get$d1().ab(999999),"goblin",O.d5(),null,new G.ca("scimitar",1,1,!0,!1,P.bv(C.q,null)),null,0,1,0,!1,1,!1,C.r,0,$.$get$ci())},
ea:function(){return R.b6(1000+$.$get$d1().ab(999999),"orc",O.d5(),null,new G.ca("sword",1,1,!0,!1,P.bv(C.q,null)),null,0,2,0,!1,2,!1,C.r,0,$.$get$ci())},
rV:{"^":"a:0;",
$1:function(a){return a.gH()}},
rY:{"^":"a:0;a",
$1:function(a){var z=a.gb1()
if(typeof z!=="number")return z.a5()
a.sb1(z+this.a)
return a}}}],["","",,O,{"^":"",
uW:[function(a){var z,y
z=$.$get$d9()
y=z.w
if(y.length>0){y+=" "
z.w=y}z.w=y+a},"$1","th",2,0,15],
uZ:[function(a){$.ej=a},"$1","ti",2,0,15],
hz:[function(a,b,c,d,e,f,g){var z=L.eF(a,!1,!1,d,e,f,g)
$.$get$bN().q(0,z)
return z},function(a){return O.hz(a,!1,!1,null,null,null,null)},function(a,b,c){return O.hz(a,!1,!1,null,b,c,null)},"$7$deferToChoiceList$deferToEndOfPage$goto$helpMessage$script$submenu","$1","$3$helpMessage$script","tg",2,13,50,0,0,0,1,1,0],
mA:{"^":"mM;",
bo:function(){var z=0,y=P.aw(),x,w=2,v,u=[],t=this,s,r,q,p,o,n,m,l,k,j
var $async$bo=P.at(function(a,b){if(a===1){v=b
z=w}while(true)switch(z){case 0:if($.cS){n=t.Q
n.toString
m=new A.t(667,null,null,null,null)
m.c="Sending updated stats."
n.a.D(m.B())
m=t.Q
n=Z.no()
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
return P.as(t.co(),$async$bo)
case 10:s=b
w=2
z=9
break
case 7:w=6
j=v
n=H.z(j)
if(n instanceof M.cr){r=n
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
case 1:return P.aA(x,y)
case 2:return P.az(v,y)}})
return P.aB($async$bo,y)},
eC:function(){var z,y
this.f8()
this.f.b_(0)
this.r=!0
this.e=this.c
z=this.Q
Z.h1(Z.bE())
z.toString
y=new A.t(90,null,null,null,null)
y.b=Z.bE()
z.a.D(y.B())
this.bo()},
kO:[function(a){var z,y
z={}
z.a=null
y=$.$get$bN()
y.L(0,new O.mX(z,this,a))
z=z.a
if(z==null)throw H.c(P.G("The sent choice hash ("+H.b(a)+") is not one of those offered ("+J.h(y)+")"))
this.iv(z)
this.bo()},"$1","gie",2,0,32],
iv:function(a){var z
if(a.gfH()!=null){z=a.r
$.$get$cg().ay(z)}z=a.x
if(z!=null)this.eb(z)},
co:function(){var z=0,y=P.aw(),x,w=[],v=this,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c
var $async$co=P.at(function(a,a0){if(a===1)return P.az(a0,y)
while(true)switch(z){case 0:u={}
r=$.$get$ch()
q=r.b
if(q.b!==q.c){u=v.Q
u.toString
q=new A.t(667,null,null,null,null)
q.c="Awarding points."
u.a.D(q.B())
p=r.b.dt()
r=v.Q
q=p.gj5()
u=p.b
o=p.c
r.toString
n=new A.t(70,null,null,null,null)
n.b=[q,u]
n.c=o
r.a.D(n.B())
r=new P.C(0,$.p,null,[null])
r.bs(null)
r.bV(new O.mN(v))
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
break}o=!!J.n(r[o]).$isK
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
k.ia(new O.mO(v),!1)
if(k.gl(k)!==0){r=v.Q
r.toString
o=new A.t(667,null,null,null,null)
o.c="We have choices."
r.a.D(o.B())
o=H.x(k,"b0",0)
o=P.T(new H.J(k,new O.mP(u,l),[o]),!0,o)
r=k.a
H.r([],[L.a4])
j=new L.eG(r,o)
if(!j.gK(j)){u=v.Q
r=u.e
if(r!=null){r.dg(new D.bU("Showing new choice before previous one was selected."))
u.e=null}r=P.u
u.e=new P.cb(new P.C(0,$.p,null,[r]),[r])
r=j.dz()
u.a.D(r.B())
u=u.e.a.bV(v.gie())
i=new O.mQ(v)
r=H.m(u,0)
q=$.p
if(q!==C.f){i=P.eb(i,q)
q.toString}u.d1(new P.e3(null,new P.C(0,q,null,[r]),6,new O.mR(),i,[r,r]))
x=!0
z=1
break}else{h=k.b6(0,new O.mS(),new O.mT())
if(h!=null){if(h.gfH()!=null){r=h.r
$.$get$cg().ay(r)}r=h.x
if(r!=null)v.eb(r)
k.a7(0,h)}}}r=$.$get$cg()
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
return P.as(v.cq(f),$async$co)
case 5:x=a0
z=1
break
case 4:r=$.ej
if(r!=null){v.eb(r)
$.ej=null
x=!1
z=1
break}r=v.x
if(r==null){v.x=0
r=0}else if(r===q){r=v.e.gat().length-1
v.x=r}else if($.hn)$.hn=!1
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
u=v.dU()
r.toString
u=u.eF(50)
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
u.f=new P.cb(new P.C(0,$.p,null,[r]),[r])
r=new A.t(30,null,null,null,null)
r.c=q
u.a.D(r.B())
u.f.a.bV(new O.mU(v))
x=!0
z=1
break
z=7
break
case 8:r=v.e.gat()
q=v.x
if(q>>>0!==q||q>=r.length){x=H.e(r,q)
z=1
break}z=!!J.n(r[q]).$isK?9:11
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
break}k.j2(r[q])}catch(b){u=H.z(b)
if(u instanceof M.cr){t=u
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
if(k.bO(0,new O.mV(u,v))&&v.x===v.e.gat().length-1){u=v.Q
u.toString
r=new A.t(667,null,null,null,null)
r.c="Creating & sending savegame"
u.a.D(r.B())
r=v.Q
u=v.dU()
r.toString
u=u.eF(50)
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
z=H.au(q,r)?12:14
break
case 12:d=v.x===v.e.gat().length-1?v.dU():null
q=v.e.gat()
o=v.x
if(o>>>0!==o||o>=q.length){x=H.e(q,o)
z=1
break}z=15
return P.as(v.cq(H.hH(q[o],r)),$async$co)
case 15:c=a0
if(k.bO(0,new O.mW(u,v))&&v.x===v.e.gat().length-1){u=v.Q
u.toString
r=d.eF(50)
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
case 13:case 10:case 7:case 1:return P.aA(x,y)}})
return P.aB($async$co,y)},
eb:function(a){var z,y,x,w,v
z=$.$get$cv()
if(z.b.test(H.bo(a))){y=this.d
if(y==null)throw H.c(new P.E("Cannot use ["+J.h(z)+"] when there is no _preGotoPosition."))
x=y.a
z=y.b
if(typeof z!=="number")return z.ax()
w=z-1}else{x=this.b.dF(a,this.e.gdH())
if(x==null)throw H.c("Function goto() called with an invalid argument '"+H.b(a)+"'. No such page.")
w=null}z=this.d
y=z==null
if((y?null:z.a)!=null){z=y?null:z.a
y=this.e
this.f.q(0,H.b(z.gh())+">>"+H.b(y.gh()))
this.r=!0}if(this.f.a1(0,H.b(this.e.gh())+">>"+H.b(x.gh()))||x.ghh()){z=this.d
y=z==null
if((y?null:z.a)!=null)z=!(y?null:z.a).ghh()
else z=!1}else z=!1
$.hl=z
z="Points embargo = "+z
y=this.Q
y.toString
v=new A.t(667,null,null,null,null)
v.c=z
y.a.D(v.B())
v=this.e
this.d=new O.mB(v,this.x)
this.e=x
this.x=w
v.e=J.al(v.gdA(),1)},
f8:function(){var z,y,x,w,v,u
this.x=null
$.$get$cg().b_(0)
$.$get$bN().sl(0,0)
$.qf=null
x=$.$get$cl()
x.b_(0)
w=$.$get$ch()
x.n(0,"points",w)
w.a=0
w.b.b_(0)
this.b.j8()
$.hQ=!0
try{this.jJ()}catch(v){z=H.z(v)
y=H.A(v)
x=this.Q
w=H.b(z)+"\n"+H.b(y)
x.toString
u=new A.t(666,null,null,null,null)
u.c="Author Exception in initBlock() (<variables>): "+w
x.a.D(u.B())
throw H.c(z)}this.h3()
$.hQ=!1},
cq:function(a){var z=0,y=P.aw(),x,w=2,v,u=[],t=this,s,r,q,p,o,n,m
var $async$cq=P.at(function(b,c){if(b===1){v=c
z=w}while(true)switch(z){case 0:q=$.$get$d9()
q.w=""
w=4
z=7
return P.as(a.$0(),$async$cq)
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
throw H.c(new M.cr(q,o,n))
z=6
break
case 3:z=2
break
case 6:if(q.w.length!==0){t.Q.eM(J.h(q)).bV(new O.mY(t))
x=!0
z=1
break}else{x=!1
z=1
break}case 1:return P.aA(x,y)
case 2:return P.az(v,y)}})
return P.aB($async$cq,y)},
im:[function(a){var z,y,x,w
z=a.x
if(z==null)return!1
if($.$get$cv().b.test(H.bo(z)))return!1
y=this.b.dF(z,this.e.gdH())
if(y==null){z="Target page '"+H.b(z)+"' was not found."
x=this.Q
x.toString
w=new A.t(667,null,null,null,null)
w.c=z
x.a.D(w.B())
return!0}y.gkF()
return!1},"$1","gfc",2,0,43],
dU:function(){var z,y,x,w,v,u
this.h3()
try{x=this.e.gh()
w=$.$get$cl()
x=new Z.fn(x,this.b.jt(),null,null,null,null)
x.c=H.aE(Z.cO(w),"$isD",[P.q,P.d],"$asD")
x.f=Date.now()
x.e=C.d.kC(H.ax(x),16)
return x}catch(v){z=H.z(v)
y=H.A(v)
x=this.Q
w=H.b(z)+"\n"+H.b(y)
x.toString
u=new A.t(666,null,null,null,null)
u.c="Error when creating savegame: "+w
x.a.D(u.B())
throw H.c(z)}},
fS:function(a,b){var z,y,x
this.f8()
z=this.b
y=z.a
if(y.i(0,a.a)==null)throw H.c(new Z.dk("Trying to load page '"+H.b(a.a)+"' which doesn't exist in current egamebook."))
this.e=y.i(0,a.a)
this.x=this.y
y=this.Q
y.toString
x=new A.t(667,null,null,null,null)
x.c="Importing state from savegame."
y.a.D(x.B())
z.jG(a.b)
if(b!=null){z=this.Q
z.toString
y=new A.t(667,null,null,null,null)
y.c="Importing player chronology."
z.a.D(y.B())
this.f.aq(0,b)}z=this.Q
z.toString
y=new A.t(667,null,null,null,null)
y.c="Copying save variables into vars."
z.a.D(y.B())
y=$.$get$cl()
Z.mx(a,y,P.dt(P.q,P.bu))
this.cx=H.a5(y.i(0,"game"),"$iseM")
this.cy=H.aE(y.i(0,"hitpoints"),"$isaq",[P.aN],"$asaq")
z=[P.u]
this.db=H.aE(y.i(0,"stamina"),"$isaq",z,"$asaq")
this.dx=H.aE(y.i(0,"gold"),"$isaq",z,"$asaq")
z=this.Q
Z.h1(Z.bE())
z.toString
y=new A.t(90,null,null,null,null)
y.b=Z.bE()
z.a.D(y.B())
y=this.Q
y.toString
z=new A.t(667,null,null,null,null)
z.c="loadFromSaveGame() done."
y.a.D(z.B())
this.bo()},
jZ:function(a){return this.fS(a,null)},
dJ:[function(a,b,c,d){var z=0,y=P.aw(),x,w=this,v,u,t
var $async$dJ=P.at(function(e,f){if(e===1)return P.az(f,y)
while(true)switch(z){case 0:v=$.$get$d9()
if(v.w.length!==0){w.Q.eM(J.h(v))
v.w=""}v=w.Q
v.toString
u=new A.t(130,null,null,null,null)
u.b=[a,b,d,c]
v.a.D(u.B())
u=U.c8
t=new P.C(0,$.p,null,[u])
v.x=new P.cb(t,[u])
x=t
z=1
break
case 1:return P.aA(x,y)}})
return P.aB($async$dJ,y)},function(a,b){return this.dJ(a,b,null,!1)},"kK","$4$rerollEffectDescription$rerollable","$2","ghC",4,5,34,1,0]},
mX:{"^":"a:0;a,b,c",
$1:function(a){var z,y,x,w
a.seN(!0)
if(a.d===this.c){z="Found choice that was selected: "+a.e
y=this.b.Q
y.toString
x=new A.t(667,null,null,null,null)
x.c=z
y.a.D(x.B())
this.a.a=a}else{z=a.x
if(z!=null){y=this.b
w=$.$get$cv().b.test(H.bo(z))?y.d.a:y.b.dF(z,y.e.gdH())
if(w!=null){y.f.q(0,H.b(y.e.gh())+">>"+H.b(w.gh()))
y.r=!0}}}}},
mN:{"^":"a:0;a",
$1:function(a){return this.a.bo()}},
mO:{"^":"a:0;a",
$1:function(a){return a.geN()||this.a.im(a)}},
mP:{"^":"a:35;a,b",
$1:function(a){return a.jQ(this.b,this.a.a)}},
mQ:{"^":"a:0;a",
$1:function(a){var z,y,x
z=H.b(a)
y=this.a.Q
y.toString
x=new A.t(667,null,null,null,null)
x.c=z
y.a.D(x.B())
return}},
mR:{"^":"a:0;",
$1:function(a){return a instanceof D.bU}},
mS:{"^":"a:0;",
$1:function(a){return a.gjR()}},
mT:{"^":"a:1;",
$0:function(){return}},
mU:{"^":"a:0;a",
$1:function(a){return this.a.bo()}},
mV:{"^":"a:0;a,b",
$1:function(a){return a.dj(!0,this.a.a,this.b.gfc())}},
mW:{"^":"a:0;a,b",
$1:function(a){return a.dj(!0,this.a.a,this.b.gfc())}},
mY:{"^":"a:0;a",
$1:function(a){return this.a.bo()}},
lV:{"^":"d;a,b,fB:c<",
iU:function(a,b,c){var z
if(!$.hl){z=J.al(this.a,b)
this.a=z
this.b.ay(new A.cI(b,z,c))}},
q:function(a,b){return this.iU(a,b,null)},
a5:function(a,b){this.q(0,b)
return this},
B:function(){return P.ah(["points",this.a])},
hg:function(a){this.a=a.i(0,"points")
this.b.b_(0)},
hL:function(){this.b=P.b1(null,A.cI)},
$isdO:1},
cP:{"^":"lE;at:d<,dA:e@,a,b,c",
ghh:function(){return J.a3(this.e,0)}},
mB:{"^":"d;a,b"},
mI:{"^":"d;a",
i:function(a,b){return this.a.i(0,b)},
dF:function(a,b){var z
if(b!=null&&this.a.a2(b+": "+H.b(a)))return this.a.i(0,H.b(b)+": "+H.b(a))
else{z=this.a
if(z.a2(a))return z.i(0,a)
else return}},
n:function(a,b,c){this.a.n(0,b,c)
c.sh(b)},
jt:function(){var z=new H.O(0,null,null,null,null,null,0,[P.q,null])
this.a.L(0,new O.mK(z))
return z},
jG:function(a){a.L(0,new O.mL(this))},
j8:function(){this.a.L(0,new O.mJ())}},
mK:{"^":"a:7;a",
$2:function(a,b){this.a.n(0,a,P.ah(["visitCount",b.gdA()]))}},
mL:{"^":"a:7;a",
$2:function(a,b){var z=this.a.a
if(z.a2(a))z.i(0,a).sdA(J.av(b,"visitCount"))}},
mJ:{"^":"a:7;",
$2:function(a,b){b.sdA(0)}}}],["","",,M,{"^":"",cr:{"^":"d;a,b,c",
k:function(a){return"AuthorScriptException at page '"+H.b(this.b)+"', block #"+H.b(this.c)+": "+H.b(this.a)},
A:{
ez:function(a){return new M.cr(a,null,null)}}}}],["","",,M,{"^":"",mM:{"^":"d;"}}],["","",,Z,{"^":"",fn:{"^":"d;a,b,c,d,e,f",
eF:function(a){var z
if(a!==50&&a!==1020)throw H.c("Cannot create Message of type "+a+". Can only be MSG_SAVE_GAME (50) or MSG_LOAD_GAME (1020).")
z=new A.t(a,null,null,null,null)
z.c=this.dw()
return z},
dw:function(){var z,y
z=new H.O(0,null,null,null,null,null,0,[P.q,null])
z.n(0,"uid",this.e)
z.n(0,"currentPageName",this.a)
z.n(0,"pageMapState",this.b)
z.n(0,"vars",this.c)
z.n(0,"timestamp",this.f)
y=this.d
if(y!=null)z.n(0,"previousText",y)
return C.v.fF(z)},
k:function(a){return this.dw()},
A:{
fo:function(a){var z,y
if(a!=null)if(typeof a!=="string"){if(typeof a!=="number"||Math.floor(a)!==a)if(typeof a!=="number")if(typeof a!=="boolean"){z=J.n(a)
z=!!z.$isK||!!z.$isD}else z=!0
else z=!0
else z=!0
y=z}else y=!0
else y=!0
if(y)return!0
return!!J.n(a).$isdO},
cO:function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"&&Math.floor(a)===a||typeof a==="number"||typeof a==="boolean")return a
else{z=J.n(a)
if(!!z.$isK){y=[]
for(x=0;x<z.gl(a);++x)if(Z.fo(z.i(a,x)))y.push(Z.cO(z.i(a,x)))
return y}else if(!!z.$isD){w=new H.O(0,null,null,null,null,null,0,[null,null])
z.L(a,new Z.mw(a,w))
return w}else if(!!z.$isdO){v=a.B()
v.n(0,"_class",a.gfB())
return Z.cO(v)}else throw H.c("Function _dissolveToPrimitivess called with a non-saveable argument type.")}},
cN:function(a,b,c){var z,y,x,w,v,u
if(a==null||typeof a==="string"||typeof a==="number"&&Math.floor(a)===a||typeof a==="number"||typeof a==="boolean")return a
else{z=J.n(a)
if(!!z.$isK){y=[]
for(x=0;x<z.gl(a);++x)y.push(Z.cN(z.i(a,x),b,null))
return y}else{w=!!z.$isD
if(w&&!a.a2("_class")){v=new H.O(0,null,null,null,null,null,0,[null,null])
z.L(a,new Z.mv(b,v))
return v}else if(w&&a.a2("_class"))if(c!=null){c.hg(a)
return c}else{u=z.i(a,"_class")
if(!b.a2(u))throw H.c(new Z.dk("Constructor for "+H.b(u)+" not set. Cannot assemble a new instance."))
else return b.i(0,u).$1(a)}else throw H.c("Function _assembleFromPrimitives called with a non-primitive argument type.")}}},
mx:function(a,b,c){a.c.L(0,new Z.my(b,c))}}},mw:{"^":"a:7;a,b",
$2:function(a,b){if(Z.fo(this.a.i(0,a)))this.b.n(0,a,Z.cO(b))}},mv:{"^":"a:7;a,b",
$2:function(a,b){this.b.n(0,a,Z.cN(b,this.a,null))}},my:{"^":"a:36;a,b",
$2:function(a,b){var z,y,x
z=this.a
y=z.i(0,a)
x=this.b
if(y==null)z.n(0,a,Z.cN(b,x,null))
else z.n(0,a,Z.cN(b,x,y))}},dk:{"^":"d;a",
k:function(a){return"IncompatibleSavegameException: "+this.a}},kM:{"^":"d;a",
k:function(a){return"InvalidSavegameException: "+this.a}}}],["","",,D,{"^":"",m0:{"^":"d;"},m_:{"^":"m0;"},kU:{"^":"m_;a,b,c,d,e,f,r,x",
kS:[function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
o=P.q
n=[o,P.d]
H.aE(a,"$isD",n,"$asD")
m=new A.t(a.i(0,"type"),null,null,null,null)
if(a.a2("strContent"))m.c=a.i(0,"strContent")
if(a.a2("listContent"))m.b=a.i(0,"listContent")
if(a.a2("intContent"))m.d=a.i(0,"intContent")
if(a.a2("mapContent"))m.e=H.aE(a.i(0,"mapContent"),"$isD",n,"$asD")
z=m
switch(z.ghe()){case 1070:o=this.e
if(o!=null){o.dg(new D.bU("Book Quit before choice was selected."))
this.e=null}o=this.b
o.a.bg()
o.b.bg()
return
case 1000:o=new A.t(667,null,null,null,null)
o.c="GET_BOOK_UID received."
n=this.a
n.D(o.B())
n.D(new A.t(10,null,this.c.ch,null,null).B())
return
case 1050:l=z.gjK()
this.e.bP(l)
this.e=null
return
case 1060:o=new A.t(667,null,null,null,null)
o.c="New form state from player received."
this.a.D(o.B())
o=z.gk0()
if(!o.a2("__submitted__"))o.n(0,"__submitted__",!1)
n=this.r
if(n.b>=4)H.f(n.cj())
n.bJ(new G.jA(o))
return
case 1080:o=new A.t(667,null,null,null,null)
o.c="Received slot machine result."
this.a.D(o.B())
k=J.av(z.gex(),0)
j=J.av(z.gex(),1)
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
if(o!=null){o.dg(new D.bU("Book Restart before choice was selected."))
this.e=null}try{this.c.eC()}catch(i){y=H.z(i)
x=H.A(i)
o=new A.t(666,null,null,null,null)
o.c="An error occured when initializing: "+H.b(y)+".\n"+H.b(x)
n.D(o.B())
throw H.c(y)}o=new A.t(90,null,null,null,null)
o.b=Z.bE()
n.D(o.B())
n.D(new A.cI(0,0,null).dz().B())
return
case 1020:h=new A.t(667,null,null,null,null)
h.c="Loading a saved game."
g=this.a
g.D(h.B())
h=this.e
if(h!=null){h.dg(new D.bU("Book Load before choice was selected."))
this.e=null}try{h=z.ghG()
f=new Z.fn(null,null,null,null,null,null)
e=H.aE(C.v.jf(h),"$isD",n,"$asD")
if(!e.a2("currentPageName")||!e.a2("vars"))H.f(new Z.kM("Invalid JSON for Savegame. Doesn't contain required fields 'currentPageName' or 'vars'. JSON='"+H.b(h)+"'."))
f.e=e.i(0,"uid")
f.a=e.i(0,"currentPageName")
f.f=e.i(0,"timestamp")
f.b=H.aE(e.i(0,"pageMapState"),"$isD",n,"$asD")
f.c=H.aE(e.i(0,"vars"),"$isD",n,"$asD")
if(e.a2("previousText"))f.d=e.i(0,"previousText")
w=f
v=H.aE(J.ir(z.gex()),"$isbA",[o],"$asbA")
o=this.c
if(v!=null)o.fS(w,v)
else o.jZ(w)}catch(i){o=H.z(i)
if(o instanceof Z.dk){u=o
t=H.A(i)
o=new A.t(666,null,null,null,null)
o.c="Load failed due to incompatibility: "+H.b(u)+".\n"+H.b(t)
g.D(o.B())
this.c.eC()}else{s=o
r=H.A(i)
o=new A.t(666,null,null,null,null)
o.c="Load failed for unknown reason: "+H.b(s)+".\n"+H.b(r)
g.D(o.B())
this.c.eC()}}try{o=new A.t(90,null,null,null,null)
o.b=Z.bE()
g.D(o.B())}catch(i){q=H.z(i)
p=H.A(i)
o=new A.t(666,null,null,null,null)
o.c="Sending Stats failed for unknown reason: "+H.b(q)+".\n"+H.b(p)
g.D(o.B())
throw H.c(q)}this.c.toString
g.D(new A.cI(0,$.$get$ch().a,null).dz().B())
return
case 1090:this.f.bP(!0)
this.f=null
return
case 1040:this.c.bo()
return
default:o=new A.t(666,null,null,null,null)
o.c="Wrong message type received by Scripter - "+H.b(z.ghe())+"."
this.a.D(o.B())}},"$1","git",2,0,20],
eM:function(a){var z=P.Y
this.f=new P.cb(new P.C(0,$.p,null,[z]),[z])
z=new A.t(30,null,null,null,null)
z.c=a
this.a.D(z.B())
return this.f.a}},bU:{"^":"d;a",
k:function(a){return"AsyncOperationOverridenException: "+this.a+"."}}}],["","",,G,{"^":"",jA:{"^":"d;a",
B:function(){return P.c2(this.a,null,null)},
k:function(a){return"<CurrentState submitted="+H.b(this.a.i(0,"__submitted__"))+">"}}}],["","",,A,{"^":"",t:{"^":"d;he:a<,ex:b<,hG:c<,jK:d<,k0:e<",
gkE:function(){var z=this.a
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
dw:function(){return C.v.fF(this.B())},
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
z="Message "+this.gkE()
y=this.a
x=J.n(y)
return z+(x.u(y,50)||x.u(y,60)||x.u(y,90)||x.u(y,100)||x.u(y,666)||x.u(y,667)?" (async)":"")}}}],["","",,E,{"^":"",lE:{"^":"d;h:a@,kF:b<",
k:function(a){return this.a},
gdH:function(){var z,y
z=this.a
if(z==null)throw H.c("Accessed groupName Page has name = null.")
y=J.il(z,": ")
if(y>0)return J.iq(this.a,0,y)
else return}}}],["","",,A,{"^":"",cI:{"^":"d;j5:a<,b,c",
k:function(a){var z="Score +"+H.b(this.a)+"."
return z},
dz:function(){var z=new A.t(70,null,null,null,null)
z.b=[this.a,this.b]
z.c=this.c
return z}}}],["","",,L,{"^":"",a4:{"^":"d;eN:a@,b,c,d,aS:e<,P:f<,fH:r<,x,y",
gjR:function(){return this.e.length===0},
dj:function(a,b,c){if(this.a)return!1
if(this.e.length===0)return!1
b!=null
a!=null
if(c!=null&&c.$1(this)===!0)return!1
return!0},
jQ:function(a,b){return this.dj(a,b,null)},
kA:function(){return P.ah(["string",this.e,"hash",this.d,"submenu",this.y,"helpMessage",this.f])},
bV:function(a){this.r=a
return this},
bu:function(a,b){return C.b.bu(this.e,b.gaS())},
k:function(a){return"Choice: "+this.e+" ["+H.b(this.x)+"] ("+this.d+")"},
hJ:function(a,b,c,d,e,f,g){if(a==null)throw H.c(P.G("String given to choice cannot be null."))
this.e=J.aW(a).eG(a)
this.d=C.b.gv(a)
this.r=f
this.b=!1
this.c=!1},
$isS:1,
$asS:function(){return[L.a4]},
A:{
eF:function(a,b,c,d,e,f,g){var z=new L.a4(!1,null,null,null,null,e,null,d,g)
z.hJ(a,!1,!1,d,e,f,g)
return z}}},eG:{"^":"f2;a,b",
gl:function(a){return this.b.length},
sl:function(a,b){C.a.sl(this.b,b)
return b},
i:function(a,b){var z=this.b
if(b>>>0!==b||b>=z.length)return H.e(z,b)
return z[b]},
n:function(a,b,c){var z=this.b
if(b>>>0!==b||b>=z.length)return H.e(z,b)
z[b]=c},
j2:function(a){var z,y,x,w,v,u,t,s,r,q,p,o
if(J.av(a,0)!=null){if(0>=a.length)return H.e(a,0)
v=!!J.n(a[0]).$isbu}else v=!1
if(v)try{if(0>=a.length)return H.e(a,0)
this.a=a[0].$0()}catch(u){z=H.z(u)
v=M.ez(J.h(z))
throw H.c(v)}else this.a=null
for(v=this.b,t={func:1,ret:[P.N,P.ao]},s=1;s<a.length;++s){y=a[s]
x=null
if(J.av(y,"string")!=null&&!!J.n(J.av(y,"string")).$isbu)try{x=J.av(y,"string").$0()}catch(u){w=H.z(u)
v=M.ez(J.h(w))
throw H.c(v)}else x=""
r=x
q=J.av(y,"goto")
p=H.hH(J.av(y,"script"),t)
o=new L.a4(!1,null,null,null,null,null,null,q,J.av(y,"submenu"))
if(r==null)H.f(P.G("String given to choice cannot be null."))
o.e=J.aW(r).eG(r)
o.d=C.b.gv(r)
o.r=p
o.b=!1
o.c=!1
C.a.q(v,o)}},
iZ:function(a,b,c,d,e,f,g){if(b instanceof L.a4)C.a.q(this.b,b)
else if(typeof b==="string")C.a.q(this.b,L.eF(b,!1,!1,e,null,f,g))
else throw H.c(P.G("To add a choice to choices, one must provide either a new Choice element or a String."))},
q:function(a,b){return this.iZ(a,b,!1,!1,null,null,null)},
kB:function(a,b,c,d){var z,y,x,w
z=this.b
y=H.m(z,0)
x=P.T(new H.J(z,new L.je(b,a,c),[y]),!0,y)
if(x.length===0)throw H.c("Choices is empty, but still choices.toMessage was called.")
w=new A.t(40,null,null,null,null)
z=[]
w.b=z
z.push(d)
z.push(this.a)
C.a.L(x,new L.jf(w))
return w},
dz:function(){return this.kB(null,null,null,null)},
k:function(a){var z=this.b
return new H.an(z,new L.jg(),[H.m(z,0),null]).cI(0,", ")},
$asf2:function(){return[L.a4]},
$asf8:function(){return[L.a4]},
$asK:function(){return[L.a4]},
$asV:function(){return[L.a4]}},je:{"^":"a:0;a,b,c",
$1:function(a){return a.dj(this.b,this.a,this.c)}},jf:{"^":"a:0;a",
$1:function(a){H.b(a)
J.aO(this.a.b,a.kA())
a.a=!0}},jg:{"^":"a:0;",
$1:function(a){return H.b(a)}}}],["","",,Z,{"^":"",cQ:{"^":"d;d_:a<,aS:b<",
B:function(){return P.ah(["show",this.a,"string",this.b])}},nl:{"^":"d;a",
B:function(){var z=new H.O(0,null,null,null,null,null,0,[P.q,P.d])
this.a.L(0,new Z.nm(z))
return z},
L:function(a,b){this.a.L(0,b)}},nm:{"^":"a:37;a",
$2:function(a,b){this.a.n(0,a,b.B())}},h0:{"^":"d;h:a@,b4:b<,fC:c<,dr:d<,d_:e<,fY:f<,aS:r<",A:{
h1:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=H.r(new Array(a.length),[Z.h0])
for(y=a.length,x=z.length,w=0,v=0;v<a.length;a.length===y||(0,H.ak)(a),++v){u=a[v]
t=J.H(u)
s=t.i(u,"name")
r=t.i(u,"description")
q=t.i(u,"color")
p=t.i(u,"priority")
o=t.i(u,"show")
n=t.i(u,"notifyOnChange")
t=t.i(u,"string")
if(w>=x)return H.e(z,w)
z[w]=new Z.h0(s,r,q,p,o,n,t);++w}C.a.cg(z,new Z.oo())
return z}}},oo:{"^":"a:7;",
$2:function(a,b){return J.bq(b.gdr(),a.gdr())}},aq:{"^":"d;h:a<,b4:b<,c,fC:d<,dr:e<,f,r,fY:x<,fz:y@,fB:z<,$ti",
gac:function(){return this.f},
sac:function(a){if(!J.i(this.f,a)){this.f=a
this.y=!0
$.cS=!0}},
gd_:function(){return this.r},
gaS:function(){return this.c.$1(this.f)},
B:function(){return P.ah(["name",this.a,"value",this.f,"show",this.r])},
hg:function(a){var z
this.sac(H.i6(a.i(0,"value"),H.m(this,0)))
z=a.i(0,"show")
if(!J.i(this.r,z)){this.r=z
this.y=!0
$.cS=!0}},
$isdO:1,
A:{
bD:function(a,b,c,d,e,f,g,h){var z,y
z=$.$get$cR()
y=z.a2(a)?H.aE(z.i(0,a),"$isaq",[h],"$asaq"):new Z.aq(a,d,b,c,f,null,null,!0,!1,"Stat",[null])
y.f=H.i6(e,h)
y.r=!0
z.n(0,a,y)
return y},
no:function(){var z,y
z=new Z.nl(new H.O(0,null,null,null,null,null,0,[P.q,Z.cQ]))
y=$.$get$cR().gce()
new H.J(y,new Z.np(),[H.x(y,"y",0)]).L(0,new Z.nq(z))
$.cS=!1
return z},
bE:function(){var z=H.r([],[[P.D,P.q,P.d]])
$.$get$cR().gce().L(0,new Z.nn(z))
return z}}},np:{"^":"a:0;",
$1:function(a){return a.gfz()}},nq:{"^":"a:25;a",
$1:function(a){var z,y
z=a.gd_()
y=a.gaS()
a.sfz(!1)
this.a.a.n(0,a.a,new Z.cQ(z,y))}},nn:{"^":"a:25;a",
$1:function(a){var z=new H.O(0,null,null,null,null,null,0,[P.q,P.d])
z.n(0,"name",a.gh())
z.n(0,"description",a.gb4())
z.n(0,"color",a.gfC())
z.n(0,"priority",a.gdr())
z.n(0,"show",a.gd_())
z.n(0,"notifyOnChange",a.gfY())
z.n(0,"string",a.gaS())
this.a.push(z)}}}],["","",,N,{"^":"",dv:{"^":"d;h:a<,b,c,i1:d<,e,f",
gfJ:function(){var z,y,x
z=this.b
y=z==null||J.i(z.gh(),"")
x=this.a
return y?x:z.gfJ()+"."+x},
gew:function(){if($.hO){var z=this.b
if(z!=null)return z.gew()}return $.qm},
k_:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p,o
x=a.b
if(x>=this.gew().b){if(!!J.n(b).$isbu)b=b.$0()
w=b
if(typeof w!=="string"){v=b
b=J.h(b)}else v=null
if(d==null&&x>=$.te.b)try{x="autogenerated stack trace for "+a.k(0)+" "+H.b(b)
throw H.c(x)}catch(u){z=H.z(u)
y=H.A(u)
d=y
if(c==null)c=z}e=$.p
x=b
w=this.gfJ()
t=c
s=d
r=Date.now()
q=$.f3
$.f3=q+1
p=new N.lh(a,x,v,w,new P.cx(r,!1),q,t,s,e)
if($.hO)for(o=this;o!=null;){o.ff(p)
o=o.b}else $.$get$f5().ff(p)}},
c6:function(a,b,c,d){return this.k_(a,b,c,d,null)},
jw:function(a,b,c){return this.c6(C.Q,a,b,c)},
aa:function(a){return this.jw(a,null,null)},
jv:function(a,b,c){return this.c6(C.P,a,b,c)},
b5:function(a){return this.jv(a,null,null)},
ju:function(a,b,c){return this.c6(C.R,a,b,c)},
bF:function(a){return this.ju(a,null,null)},
jI:function(a,b,c){return this.c6(C.z,a,b,c)},
fP:function(a){return this.jI(a,null,null)},
kG:function(a,b,c){return this.c6(C.U,a,b,c)},
eH:function(a){return this.kG(a,null,null)},
hB:function(a,b,c){return this.c6(C.T,a,b,c)},
dI:function(a){return this.hB(a,null,null)},
ff:function(a){},
A:{
ba:function(a){return $.$get$f4().kg(a,new N.r2(a))}}},r2:{"^":"a:1;a",
$0:function(){var z,y,x,w
z=this.a
if(C.b.d0(z,"."))H.f(P.G("name shouldn't start with a '.'"))
y=C.b.jX(z,".")
if(y===-1)x=z!==""?N.ba(""):null
else{x=N.ba(C.b.aC(z,0,y))
z=C.b.bB(z,y+1)}w=new H.O(0,null,null,null,null,null,0,[P.q,N.dv])
w=new N.dv(z,x,null,w,new P.h3(w,[null,null]),null)
if(x!=null)x.gi1().n(0,z,w)
return w}},aQ:{"^":"d;h:a<,ac:b<",
u:function(a,b){if(b==null)return!1
return b instanceof N.aQ&&this.b===b.b},
aK:function(a,b){return C.d.aK(this.b,b.gac())},
bZ:function(a,b){return C.d.bZ(this.b,b.gac())},
br:function(a,b){var z=b.gac()
if(typeof z!=="number")return H.v(z)
return this.b>z},
bH:function(a,b){return this.b>=b.gac()},
bu:function(a,b){var z=b.gac()
if(typeof z!=="number")return H.v(z)
return this.b-z},
gv:function(a){return this.b},
k:function(a){return this.a},
$isS:1,
$asS:function(){return[N.aQ]}},lh:{"^":"d;ew:a<,b,aH:c<,d,I:e<,f,bh:r<,be:x<,y",
k:function(a){return"["+this.a.a+"] "+this.d+": "+H.b(this.b)}}}],["","",,X,{"^":"",
bp:function(a){return X.d0(J.ii(a,0,new X.rZ()))},
aU:function(a,b){var z=J.al(a,b)
if(typeof z!=="number")return H.v(z)
a=536870911&z
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
d0:function(a){if(typeof a!=="number")return H.v(a)
a=536870911&a+((67108863&a)<<3)
a^=a>>>11
return 536870911&a+((16383&a)<<15)},
rZ:{"^":"a:7;",
$2:function(a,b){return X.aU(a,J.j(b))}}}],["","",,U,{"^":"",cM:{"^":"d;a,b",
k:function(a){return this.b}},c8:{"^":"d;a,kH:b<",
geu:function(){return this.a===C.C},
k:function(a){return"SessionResult<"+this.a.b+",wasRerolled="+H.b(this.b)+">"},
u:function(a,b){if(b==null)return!1
return b instanceof U.c8&&b.a===this.a&&J.i(b.b,this.b)},
gv:function(a){return(this.b===!0?2:1)*100+this.a.a}}}],["","",,X,{"^":"",
v_:[function(a,b){var z,y,x,w,v
z=new D.kU(b,null,null,null,null,null,null,null)
y=$.fk
$.fk=y+1
x=new H.c6(y,null,!1)
w=init.globalState.d
w.dO(y,x)
w.cw()
w=new H.mh(x,null)
w.hM(x)
z.b=w
w=w.b
w.toString
new P.cV(w,[H.m(w,0)]).aA(z.git(),null,null,null)
b.D(new H.ce(z.b.a,init.globalState.d.a))
v=N.mD()
z.c=v
v.Q=z},"$2","hC",4,0,33]},1]]
setupProgram(dart,0)
J.n=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.eX.prototype
return J.kW.prototype}if(typeof a=="string")return J.c1.prototype
if(a==null)return J.eY.prototype
if(typeof a=="boolean")return J.eW.prototype
if(a.constructor==Array)return J.c_.prototype
if(!(a instanceof P.d))return J.bi.prototype
return a}
J.aV=function(a){if(a==null)return a
if(a.constructor==Array)return J.c_.prototype
if(!(a instanceof P.d))return J.bi.prototype
return a}
J.H=function(a){if(typeof a=="string")return J.c1.prototype
if(a==null)return a
if(a.constructor==Array)return J.c_.prototype
if(!(a instanceof P.d))return J.bi.prototype
return a}
J.ad=function(a){if(typeof a=="number")return J.c0.prototype
if(a==null)return a
if(!(a instanceof P.d))return J.bi.prototype
return a}
J.ei=function(a){if(typeof a=="number")return J.c0.prototype
if(typeof a=="string")return J.c1.prototype
if(a==null)return a
if(!(a instanceof P.d))return J.bi.prototype
return a}
J.aW=function(a){if(typeof a=="string")return J.c1.prototype
if(a==null)return a
if(!(a instanceof P.d))return J.bi.prototype
return a}
J.al=function(a,b){if(typeof a=="number"&&typeof b=="number")return a+b
return J.ei(a).a5(a,b)}
J.aX=function(a,b){if(typeof a=="number"&&typeof b=="number")return a/b
return J.ad(a).cV(a,b)}
J.i=function(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.n(a).u(a,b)}
J.a3=function(a,b){if(typeof a=="number"&&typeof b=="number")return a>b
return J.ad(a).br(a,b)}
J.bQ=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<b
return J.ad(a).aK(a,b)}
J.bR=function(a,b){if(typeof a=="number"&&typeof b=="number")return a*b
return J.ei(a).c_(a,b)}
J.ig=function(a){if(typeof a=="number")return-a
return J.ad(a).eK(a)}
J.bq=function(a,b){if(typeof a=="number"&&typeof b=="number")return a-b
return J.ad(a).ax(a,b)}
J.av=function(a,b){if(typeof b==="number")if(a.constructor==Array||typeof a=="string")if(b>>>0===b&&b<a.length)return a[b]
return J.H(a).i(a,b)}
J.aO=function(a,b){return J.aV(a).q(a,b)}
J.bS=function(a,b){return J.ei(a).bu(a,b)}
J.ih=function(a,b){return J.H(a).a1(a,b)}
J.et=function(a,b){return J.aV(a).an(a,b)}
J.ii=function(a,b,c){return J.aV(a).bi(a,b,c)}
J.j=function(a){return J.n(a).gv(a)}
J.eu=function(a){return J.H(a).gK(a)}
J.af=function(a){return J.aV(a).gZ(a)}
J.ij=function(a){return J.aV(a).gE(a)}
J.aF=function(a){return J.H(a).gl(a)}
J.ik=function(a){return J.n(a).gbm(a)}
J.il=function(a,b){return J.H(a).b7(a,b)}
J.ev=function(a,b){return J.aV(a).aP(a,b)}
J.im=function(a,b,c){return J.aW(a).fT(a,b,c)}
J.da=function(a,b,c){return J.aW(a).kl(a,b,c)}
J.bT=function(a,b,c){return J.aW(a).du(a,b,c)}
J.io=function(a){return J.ad(a).h9(a)}
J.ip=function(a,b){return J.aV(a).dK(a,b)}
J.ew=function(a,b){return J.aW(a).d0(a,b)}
J.iq=function(a,b,c){return J.aW(a).aC(a,b,c)}
J.ir=function(a){return J.aV(a).bz(a)}
J.h=function(a){return J.n(a).k(a)}
J.cm=function(a,b){return J.ad(a).bW(a,b)}
J.is=function(a,b){return J.aV(a).bY(a,b)}
I.bO=function(a){a.immutable$list=Array
a.fixed$length=Array
return a}
var $=I.p
C.I=J.aP.prototype
C.a=J.c_.prototype
C.K=J.eW.prototype
C.d=J.eX.prototype
C.t=J.eY.prototype
C.k=J.c0.prototype
C.b=J.c1.prototype
C.D=new A.ag(0,0,0)
C.E=new A.ag(-1/0,-1/0,-1/0)
C.F=new A.co(-10,0,100)
C.G=new P.lD()
C.u=new P.pf()
C.H=new P.py()
C.f=new P.pN()
C.w=new P.aZ(0)
C.J=new U.dl(0,"ItemType.spear")
C.x=new U.dl(1,"ItemType.sword")
C.y=new U.dl(2,"ItemType.fist")
C.L=function getTagFallback(o) {
  var s = Object.prototype.toString.call(o);
  return s.substring(8, s.length - 1);
}
C.v=new P.l_(null,null)
C.M=new P.l1(null)
C.N=new P.l2(null,null)
C.O=new O.l9(0,"KnownToMode.all")
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
C.q=I.bO([C.x])
C.V=I.bO([C.y])
C.e=I.bO([])
C.W=new H.jp(0,{},C.e,[null,null])
C.l=new R.dG(0,"Pose.standing")
C.h=new R.dG(1,"Pose.offBalance")
C.i=new R.dG(2,"Pose.onGround")
C.o=new K.dH(0,"Predetermination.none")
C.j=new K.dH(1,"Predetermination.successGuaranteed")
C.n=new K.dH(2,"Predetermination.failureGuaranteed")
C.r=new Y.c3("he","him","his","himself")
C.p=new Y.c3("it","it","its","itself")
C.X=new Y.c3("she","her","her","herself")
C.Y=new Y.c3("they","them","their","themselves")
C.B=new Y.c3("you","you","your","yourself")
C.c=new Q.mm(0,"Resource.stamina")
C.a1=H.b4("eZ")
C.a2=H.b4("ao")
C.a3=H.b4("q")
C.a4=H.b4("Y")
C.a5=H.b4("aN")
C.m=H.b4("dynamic")
C.a6=H.b4("u")
C.a7=H.b4("M")
C.a8=new P.bH(null,2)
$.fk=1
$.fd="$cachedFunction"
$.fe="$cachedInvocation"
$.aG=0
$.bs=null
$.eB=null
$.bl=null
$.bK=null
$.bL=null
$.e8=!1
$.p=C.f
$.eO=0
$.ej=null
$.hl=!1
$.qf=null
$.hn=!1
$.hQ=!0
$.cS=!1
$.hO=!1
$.te=C.S
$.qm=C.z
$.f3=0
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
I.$lazy(y,x,w)}})(["eT","$get$eT",function(){return H.kS()},"eU","$get$eU",function(){if(typeof WeakMap=="function")var z=new WeakMap()
else{z=$.eO
$.eO=z+1
z="expando$key$"+z}return new P.kj(null,z,[P.u])},"fQ","$get$fQ",function(){return H.aI(H.cT({
toString:function(){return"$receiver$"}}))},"fR","$get$fR",function(){return H.aI(H.cT({$method$:null,
toString:function(){return"$receiver$"}}))},"fS","$get$fS",function(){return H.aI(H.cT(null))},"fT","$get$fT",function(){return H.aI(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"fX","$get$fX",function(){return H.aI(H.cT(void 0))},"fY","$get$fY",function(){return H.aI(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"fV","$get$fV",function(){return H.aI(H.fW(null))},"fU","$get$fU",function(){return H.aI(function(){try{null.$method$}catch(z){return z.message}}())},"h_","$get$h_",function(){return H.aI(H.fW(void 0))},"fZ","$get$fZ",function(){return H.aI(function(){try{(void 0).$method$}catch(z){return z.message}}())},"dZ","$get$dZ",function(){return P.oY()},"b9","$get$b9",function(){var z,y
z=P.ao
y=new P.C(0,P.oA(),null,[z])
y.hT(null,z)
return y},"bM","$get$bM",function(){return[]},"ef","$get$ef",function(){return new K.bY("fist",P.bv(C.V,null))},"by","$get$by",function(){return N.ba("PlannerRecommendation")},"hE","$get$hE",function(){return new K.qy()},"eg","$get$eg",function(){var z=$.$get$hE()
return K.a_("__END_OF_ROAM__",z,z,null,null,[],"ground")},"a2","$get$a2",function(){return P.cK(null)},"bd","$get$bd",function(){return P.cK(null)},"hS","$get$hS",function(){return N.ba("Storyline")},"fD","$get$fD",function(){return P.be("(\\w)([\\.\\?\\!])([\"'])\\.(?=$|\\s)",!0,!1)},"ci","$get$ci",function(){return L.dY(new L.r1())},"bP","$get$bP",function(){return L.dY(new L.r7())},"hZ","$get$hZ",function(){return L.dY(new L.r0())},"dE","$get$dE",function(){return new F.lI("Sometimes, patience pays off. Especially when the other option is potentially dangerous.",!1,!0,!1,null,null)},"ed","$get$ed",function(){return Y.dh(!1,"balance",!0,C.p,$.$get$bP())},"i_","$get$i_",function(){return Y.dh(!1,"pounding",!1,C.p,$.$get$bP())},"fl","$get$fl",function(){return new B.mk("Most moves are easier and more effective when you are firmly in balance.",!1,!0,!1,null,null)},"fp","$get$fp",function(){return new O.mz(null,!1,!0,!1,null,null)},"fC","$get$fC",function(){return new Q.nj(null,!1,!0,!0,C.c,null)},"h2","$get$h2",function(){return new M.op("",!0,C.c,!1,!0,null)},"hm","$get$hm",function(){return P.cK(null)},"eA","$get$eA",function(){return new Z.iZ(!1,!0,!1,null,null)},"i7","$get$i7",function(){return Y.dh(!1,"swing",!0,C.p,$.$get$bP())},"fv","$get$fv",function(){return new D.n7(!1,!1,!0,null,null)},"hG","$get$hG",function(){return K.a_("forge_church_crevice",new V.qX(),new V.qY(),null,null,H.r([new Q.w("tunnel","Continue along the crevice","You continue until the crevice open into a tunnel. You can smell fresh air.",null)],[Q.w]),"ground")},"hR","$get$hR",function(){return K.a_("kill_agruth",new V.qU(),new V.qW(),N.ui(),null,H.r([new Q.w("start_of_book","","You look around. Fortunately, nobody is in sight.",null)],[Q.w]),"ground")},"i1","$get$i1",function(){return K.a_("start_of_book",new V.qS(),new V.qT(),null,null,H.r([],[Q.w]),"ground")},"eQ","$get$eQ",function(){return new V.kG("Flee through the Underground Church","flee_through_necromancers_church",!0,null)},"eR","$get$eR",function(){return new V.kI("Flee through the War Forges","flee_through_war_forge",!0,null)},"fq","$get$fq",function(){return new V.mZ("Search Agruth","search_agruth",!0,null)},"i8","$get$i8",function(){return K.a_("the_shafts",new V.qQ(),new V.qR(),null,null,H.r([new Q.w("tunnel","Run","You run over the passage. Orcs start to scream and yell commands. As you near the entrance, the air gets better.",null)],[Q.w]),"ground")},"ia","$get$ia",function(){return K.a_("tunnel",new V.qO(),new V.qP(),N.uh(),null,H.r([new Q.w("entrance_to_bloodrock","Start running again","You finally arrive to the cave's entrance.",null)],[Q.w]),"ground")},"ib","$get$ib",function(){return K.a_("underground_church",new V.qM(),new V.qN(),null,null,H.r([new Q.w("forge_church_crevice","Enter the small passage","You enter the passage and go a long way.",null)],[Q.w]),"ground")},"ic","$get$ic",function(){return K.a_("war_forge",new V.qJ(),new V.qL(),null,null,H.r([new Q.w("tunnel","Enter the corridor","You enter the corridor.",null),new Q.w("forge_church_crevice","Enter the crevice","You take the crevice.",null)],[Q.w]),"ground")},"id","$get$id",function(){return K.a_("war_forge_crevice",new V.qH(),new V.qI(),null,null,H.r([new Q.w("tunnel","Continue along the crevice","You continue until the crevice open into a tunnel. You can smell fresh air.",null)],[Q.w]),"ground")},"hF","$get$hF",function(){return K.a_("entrance_to_bloodrock",new V.qF(),new V.qG(),null,null,H.r([new Q.w("mountainside_path","Climb down the cliff","You decide to risk the mountainside. With a deep breath, you swing your leg over the edge, find a foothold, and lower yourself down.",null),new Q.w("mountain_pass_gate","Use the path","You steel yourself and trudge down the mountain pass.",null)],[Q.w]),"ground")},"hT","$get$hT",function(){return K.a_("mountain_pass",new V.qD(),new V.qE(),null,null,H.r([new Q.w("ironcast_road","Go to Fort Ironcast","You continue towards the fort.",null)],[Q.w]),"ground")},"hU","$get$hU",function(){return K.a_("mountain_pass_gate",new V.qB(),new V.qC(),null,null,H.r([new Q.w("mountain_pass_guard_post","Go to the gate","You unsheathe your weapon and start towards the guards.",null)],[Q.w]),"ground")},"hV","$get$hV",function(){return K.a_("mountain_pass_guard_post",new V.rr(),new V.qA(),N.uj(),null,H.r([new Q.w("mountain_pass","Go through the gate","You release the winch holding the gate closed. The gate swings ponderously outward, just enough for you and Briana to squeeze through to freedom.",null)],[Q.w]),"ground")},"fw","$get$fw",function(){return new V.n9("Sneak onto the back of the cart","sneak_onto_cart",!0,null)},"fK","$get$fK",function(){return new V.o_("Stealthily take out some of the gate guards","take_out_gate_guards",!0,null)},"hW","$get$hW",function(){return K.a_("mountainside_base",new V.rp(),new V.rq(),null,null,H.r([new Q.w("ironcast_road","Go to Fort Ironcast","The Fort awaits, so you press on to only road to and from Mt. Bloodrock.",null)],[Q.w]),"ground")},"hX","$get$hX",function(){return K.a_("mountainside_path",new V.rg(),new V.ro(),null,null,H.r([new Q.w("winged_serpent_nest","Continue down","You find a ledge you might rest on for a bit.",null)],[Q.w]),"ground")},"fP","$get$fP",function(){return new V.o9("Scare off the serpent","threaten_winged_serpent",!0,null)},"fy","$get$fy",function(){return new V.nb("Soothe the serpent","soothe_winged_serpent",!0,null)},"fN","$get$fN",function(){return new V.oa("Threaten the serpent\u2019s eggs","threaten_winged_serpent_eggs",!0,null)},"ie","$get$ie",function(){return K.a_("winged_serpent_nest",new V.qV(),new V.r5(),null,null,H.r([new Q.w("mountainside_base","Continue down","You continue your descent to level ground. Thankfully, the end is in sight.",null)],[Q.w]),"ground")},"hP","$get$hP",function(){return K.a_("ironcast_road",new V.qz(),new V.qK(),null,null,H.r([new Q.w("__END_OF_ROAM__","Go to Fort Ironcast (UNIMPLEMENTED)","You make your way closer to the fort.",null)],[Q.w]),"ground")},"hu","$get$hu",function(){return H.r([$.$get$hG(),$.$get$hR(),$.$get$i1(),$.$get$i8(),$.$get$ia(),$.$get$ib(),$.$get$ic(),$.$get$id(),$.$get$hF(),$.$get$hT(),$.$get$hU(),$.$get$hV(),$.$get$hW(),$.$get$hX(),$.$get$ie(),$.$get$hP()],[K.c7])},"ht","$get$ht",function(){return H.r([$.$get$eQ(),$.$get$eR(),$.$get$fq(),$.$get$fw(),$.$get$fK(),$.$get$fP(),$.$get$fy(),$.$get$fN()],[A.aH])},"d1","$get$d1",function(){return P.cK(null)},"d9","$get$d9",function(){return P.nU("")},"ch","$get$ch",function(){var z=new O.lV(0,null,"PointsCounter")
z.hL()
return z},"bN","$get$bN",function(){return new L.eG(null,H.r([],[L.a4]))},"cl","$get$cl",function(){return H.f1(P.q,P.d)},"cg","$get$cg",function(){return P.b1(null,{func:1,ret:[P.N,P.ao]})},"cv","$get$cv",function(){return P.be("^\\s*<<<\\s*$",!0,!1)},"cR","$get$cR",function(){return H.f1(P.q,Z.aq)},"f5","$get$f5",function(){return N.ba("")},"f4","$get$f4",function(){return P.dt(P.q,N.dv)}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=[null,!1]
init.types=[{func:1,args:[,]},{func:1},{func:1,ret:P.q,args:[R.F,A.a8,Y.a1]},{func:1,args:[,,,]},{func:1,args:[R.F,A.a8,Y.a1]},{func:1,ret:Q.I,args:[R.F]},{func:1,v:true},{func:1,args:[,,]},{func:1,args:[,,,,]},{func:1,args:[P.u]},{func:1,v:true,args:[R.F,A.a8,Y.a1,R.F,S.a0]},{func:1,ret:P.q,args:[P.u]},{func:1,v:true,args:[{func:1,v:true}]},{func:1,v:true,args:[R.F,A.a8,Y.a1,R.F,,]},{func:1,ret:[P.y,R.F],args:[A.a8]},{func:1,v:true,args:[P.q]},{func:1,args:[,P.aT]},{func:1,v:true,args:[P.d],opt:[P.aT]},{func:1,args:[P.aN]},{func:1,ret:P.N},{func:1,v:true,args:[P.d]},{func:1,ret:Y.b8,args:[P.u]},{func:1,ret:P.q,args:[P.q]},{func:1,args:[U.bX]},{func:1,args:[R.F]},{func:1,args:[Z.aq]},{func:1,ret:P.M,args:[A.ag]},{func:1,ret:P.q,args:[Q.a6]},{func:1,args:[P.M,R.F]},{func:1,ret:P.Y,args:[P.u]},{func:1,args:[P.u,,]},{func:1,ret:P.M,args:[A.co]},{func:1,v:true,args:[P.u]},{func:1,v:true,args:[[P.K,P.q],P.fr]},{func:1,ret:[P.N,U.c8],args:[P.aN,P.q],named:{rerollEffectDescription:P.q,rerollable:P.Y}},{func:1,args:[L.a4]},{func:1,args:[P.q,,]},{func:1,args:[P.q,Z.cQ]},{func:1,v:true,args:[P.d,P.aT]},{func:1,v:true,args:[,P.aT]},{func:1,ret:P.u,args:[P.S,P.S]},{func:1,args:[[P.K,Y.a7],Y.a7]},{func:1,ret:P.M,args:[P.M,P.M]},{func:1,ret:P.Y,args:[L.a4]},{func:1,args:[Y.a7]},{func:1,args:[P.bb]},{func:1,ret:Q.cC,args:[U.am]},{func:1,ret:Q.cA,args:[Q.w]},{func:1,args:[{func:1,v:true}]},{func:1,args:[,],opt:[,]},{func:1,ret:L.a4,args:[P.q],named:{deferToChoiceList:P.Y,deferToEndOfPage:P.Y,goto:P.q,helpMessage:P.q,script:{func:1,ret:[P.N,P.ao]},submenu:P.q}},{func:1,args:[P.Y]}]
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
if(x==y)H.ue(d||a)
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