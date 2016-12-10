self.$dart_deferred_initializers$=self.$dart_deferred_initializers$||Object.create(null)
$dart_deferred_initializers$.current=function($globals$,$){var A=$globals$.A
var B=$globals$.B
var C=$globals$.C
var D=$globals$.D
var E=$globals$.E
var F=$globals$.F
var G=$globals$.G
var H=$globals$.H
var J=$globals$.J
var K=$globals$.K
var L=$globals$.L
var M=$globals$.M
var N=$globals$.N
var O=$globals$.O
var P=$globals$.P
var Q=$globals$.Q
var R=$globals$.R
var S=$globals$.S
var T=$globals$.T
var U=$globals$.U
var V=$globals$.V
var W=$globals$.W
var X=$globals$.X
var Y=$globals$.Y
var Z=$globals$.Z
var init=$globals$.init
var setupProgram=$globals$.setupProgram
var I=$globals$.I
var dart=[["","",,P,{"^":"",
cC:function(a,b,c){var z,y,x
if(b===0){if(c.geo())J.jE(c.c)
else J.dQ(c.a)
return}else if(b===1){if(c.geo())c.c.d_(H.D(a),H.O(a))
else{z=H.D(a)
y=H.O(a)
c.a.ca(z,y)
J.dQ(c.a)}return}if(a instanceof P.bX){if(c.geo()){b.$2(2,null)
return}z=a.b
if(z===0){z=a.a
J.cM(c.a,z)
P.cK(new P.rv(b,c))
return}else if(z===1){x=a.a
c.a.fS(x,!1).a_(new P.rw(b,c))
return}}P.iP(a,b)},
ti:function(a){return J.fp(a)},
rv:{"^":"a:1;a,b",
$0:function(){var z=this.b
if(z.a.gaS()){z.b=!0
return}this.a.$2(null,0)}},
rw:{"^":"a:0;a,b",
$1:function(a){var z=this.b.c!=null?2:0
this.a.$2(z,null)}},
q2:{"^":"b;a,b,c",
gbX:function(a){return J.fp(this.a)},
gaS:function(){return this.a.gaS()},
geo:function(){return this.c!=null},
l:function(a,b){return J.cM(this.a,b)},
ca:function(a,b){return this.a.ca(a,b)},
ap:function(a){return J.dQ(this.a)},
ib:function(a){var z=new P.q5(a)
this.a=P.hV(new P.q7(this,a),new P.q8(z),null,new P.q9(this,z),!1,null)},
q:{
q3:function(a){var z=new P.q2(null,!1,null)
z.ib(a)
return z}}},
q5:{"^":"a:1;a",
$0:function(){P.cK(new P.q6(this.a))}},
q6:{"^":"a:1;a",
$0:function(){this.a.$2(0,null)}},
q8:{"^":"a:1;a",
$0:function(){this.a.$0()}},
q9:{"^":"a:1;a,b",
$0:function(){var z=this.a
if(z.b===!0){z.b=!1
this.b.$0()}}},
q7:{"^":"a:1;a,b",
$0:function(){var z=this.a
if(!z.a.gha()){z.c=new P.aM(new P.v(0,$.h,null,[null]),[null])
if(z.b===!0){z.b=!1
P.cK(new P.q4(this.b))}return z.c.gh6()}}},
q4:{"^":"a:1;a",
$0:function(){this.a.$2(2,null)}},
bX:{"^":"b;a,ah:b>",
j:function(a){return"IterationMarker("+this.b+", "+H.d(this.a)+")"},
q:{
iG:function(a){return new P.bX(a,1)},
dv:function(){return C.ao},
iF:function(a){return new P.bX(a,0)},
dw:function(a){return new P.bX(a,3)}}},
bZ:{"^":"b;a,b,c,d",
gw:function(){var z=this.c
return z==null?this.b:z.gw()},
m:function(){var z,y,x,w
for(;!0;){z=this.c
if(z!=null)if(z.m()===!0)return!0
else this.c=null
y=function(a,b,c){var v,u=b
while(true)try{return a(u,v)}catch(t){v=t
u=c}}(this.a,0,1)
if(y instanceof P.bX){x=y.b
if(x===2){z=this.d
if(z==null||z.length===0){this.b=null
return!1}if(0>=z.length)return H.e(z,-1)
this.a=z.pop()
continue}else{z=y.a
if(x===3)throw z
else{w=J.aD(z)
if(w instanceof P.bZ){z=this.d
if(z==null){z=[]
this.d=z}z.push(this.a)
this.a=w.a
continue}else{this.c=w
continue}}}}else{this.b=y
return!0}}return!1}},
rn:{"^":"d2;a",
gH:function(a){return new P.bZ(this.a(),null,null,null)},
$asd2:I.Y,
$asF:I.Y,
q:{
dz:function(a){return new P.rn(a)}}}}],["","",,P,{"^":"",
eo:function(a){return C.X},
qI:{"^":"b;",
bD:function(a){if(a<=0||a>4294967296)throw H.c(P.nO("max must be in range 0 < max \u2264 2^32, was "+a))
return Math.random()*a>>>0},
he:function(){return Math.random()}}}],["","",,S,{"^":"",cV:{"^":"b;a,b,$ti",
af:function(a){var z,y,x
z=new S.mX(null,null,this.$ti)
z.cI()
y=H.p(z,0)
x=[y]
if(H.f2(this,"$iscV",x,null)){z.a=this.a
z.b=this}else{z.a=P.a6(this,!0,y)
z.b=null}a.$1(z)
y=z.b
if(y==null){y=z.a
x=new S.cV(y,null,x)
x.cI()
z.a=y
z.b=x
z=x}else z=y
return z},
gu:function(a){var z=this.b
if(z==null){z=X.aO(this.a)
this.b=z}return z},
p:function(a,b){var z,y,x,w,v
if(b==null)return!1
if(b===this)return!0
z=J.l(b)
if(!z.$iscV)return!1
y=b.a
x=this.a
if(y.length!==x.length)return!1
z=z.gu(b)
w=this.gu(this)
if(z==null?w!=null:z!==w)return!1
for(v=0;z=x.length,v!==z;++v){if(v>=y.length)return H.e(y,v)
w=y[v]
if(v>=z)return H.e(x,v)
if(!J.f(w,x[v]))return!1}return!0},
j:function(a){return J.A(this.a)},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=z.length)return H.e(z,b)
return z[b]},
gi:function(a){return this.a.length},
bb:function(a,b,c){var z=this.a
return(z&&C.a).bb(z,b,c)},
at:function(a,b){return this.bb(a,b,0)},
gH:function(a){var z=this.a
return new J.bi(z,z.length,0,null,[H.p(z,0)])},
aI:function(a,b){var z=this.a
z.toString
return new H.ax(z,b,[null,null])},
E:function(a,b){var z=this.a
return(z&&C.a).E(z,b)},
v:function(a,b){var z=this.a
return(z&&C.a).v(z,b)},
gC:function(a){return this.a.length===0},
gZ:function(a){return this.a.length!==0},
gO:function(a){var z=this.a
return(z&&C.a).gO(z)},
gB:function(a){var z=this.a
return(z&&C.a).gB(z)},
R:function(a,b){var z=this.a
if(b>>>0!==b||b>=z.length)return H.e(z,b)
return z[b]},
cI:function(){if(new H.b7(H.b_(H.p(this,0)),null).p(0,C.o))throw H.c(new P.C('explicit element type required, for example "new BuiltList<int>"'))},
i1:function(a,b){var z,y,x,w
this.cI()
for(z=this.a,y=z.length,x=0;x<z.length;z.length===y||(0,H.a7)(z),++x){w=z[x]
if(!H.dG(w,b))throw H.c(P.X("iterable contained invalid element: "+H.d(w)))}},
q:{
fw:function(a,b){return S.ku(a,b)},
ku:function(a,b){var z=new S.cV(P.a6(a,!1,b),null,[b])
z.i1(a,b)
return z}}},mX:{"^":"b;a,b,$ti",
k:function(a,b,c){var z
if(c==null)H.u(P.X("null element"))
z=this.ge6()
if(b>>>0!==b||b>=z.length)return H.e(z,b)
z[b]=c},
l:function(a,b){var z
if(b==null)H.u(P.X("null element"))
z=this.ge6();(z&&C.a).l(z,b)},
D:function(a,b){var z=this.ge6();(z&&C.a).D(z,b)},
aI:function(a,b){var z=this.a
z.toString
z=new H.ax(z,b,[null,null]).ay(0,!0)
this.a=z
this.b=null
this.im(z)},
ge6:function(){if(this.b!=null){this.a=P.a6(this.a,!0,H.p(this,0))
this.b=null}return this.a},
cI:function(){if(new H.b7(H.b_(H.p(this,0)),null).p(0,C.o))throw H.c(new P.C('explicit element type required, for example "new ListBuilder<int>"'))},
im:function(a){var z,y,x,w
for(z=a.length,y=H.p(this,0),x=0;x<a.length;a.length===z||(0,H.a7)(a),++x){w=a[x]
if(!H.dG(w,y))throw H.c(P.X("invalid element: "+H.d(w)))}}}}],["","",,A,{"^":"",cW:{"^":"b;iJ:a<,b,c,d,$ti",
af:function(a){var z=new A.cm(null,null,this.$ti)
z.bl()
z.cq(0,this)
a.$1(z)
return z.I()},
gu:function(a){var z=this.b
if(z==null){z=this.a
z=z.gV(z)
z=H.bn(z,new A.kv(this),H.x(z,"F",0),null)
z=P.a6(z,!1,H.x(z,"F",0))
C.a.hK(z)
z=X.aO(z)
this.b=z}return z},
p:function(a,b){var z,y,x,w,v
if(b==null)return!1
if(b===this)return!0
z=J.l(b)
if(!z.$iscW)return!1
y=b.a
x=this.a
if(y.gi(y)!==x.gi(x))return!1
z=z.gu(b)
w=this.gu(this)
if(z==null?w!=null:z!==w)return!1
for(z=this.gV(this),z=z.gH(z);z.m();){v=z.gw()
if(!J.f(y.h(0,v),x.h(0,v)))return!1}return!0},
j:function(a){return J.A(this.a)},
h:function(a,b){return this.a.h(0,b)},
v:function(a,b){this.a.v(0,b)},
gC:function(a){var z=this.a
return z.gC(z)},
gZ:function(a){var z=this.a
return z.gZ(z)},
gV:function(a){var z=this.c
if(z==null){z=this.a
z=z.gV(z)
this.c=z}return z},
gi:function(a){var z=this.a
return z.gi(z)},
bl:function(){if(new H.b7(H.b_(H.p(this,0)),null).p(0,C.o))throw H.c(new P.C('explicit key type required, for example "new BuiltMap<int, int>"'))
if(new H.b7(H.b_(H.p(this,1)),null).p(0,C.o))throw H.c(new P.C('explicit value type required, for example "new BuiltMap<int, int>"'))}},kv:{"^":"a:0;a",
$1:function(a){var z,y
z=J.E(a)
y=J.E(this.a.a.h(0,a))
return X.eS(X.bv(X.bv(0,J.E(z)),J.E(y)))}},cm:{"^":"b;a,b,$ti",
I:function(){var z=this.b
if(z==null){z=new A.cW(this.a,null,null,null,this.$ti)
z.bl()
this.b=z}return z},
cq:function(a,b){var z
if(H.f2(b,"$iscW",this.$ti,null)){this.b=b
this.a=b.giJ()}else if(!!b.$iscW){z=P.ei(b.a,H.p(this,0),H.p(this,1))
this.b=null
this.a=z}else if(!!b.$isQ){z=P.ei(b,H.p(this,0),H.p(this,1))
this.b=null
this.a=z}else throw H.c(P.X("expected Map or BuiltMap, got "+H.d(b.gkQ(b))))},
k:function(a,b,c){if(b==null)H.u(P.X("null key"))
if(c==null)H.u(P.X("null value"))
this.gcP().k(0,b,c)},
D:function(a,b){this.gcP().D(0,b)},
gcP:function(){if(this.b!=null){this.a=P.ei(this.a,H.p(this,0),H.p(this,1))
this.b=null}return this.a},
bl:function(){if(new H.b7(H.b_(H.p(this,0)),null).p(0,C.o))throw H.c(new P.C('explicit key type required, for example "new MapBuilder<int, int>"'))
if(new H.b7(H.b_(H.p(this,1)),null).p(0,C.o))throw H.c(new P.C('explicit value type required, for example "new MapBuilder<int, int>"'))}}}],["","",,Y,{"^":"",
B:function(a,b){if(typeof b!=="number")return H.n(b)
a=536870911&a+b
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
aP:function(a){a=536870911&a+((67108863&a)<<3)
a^=a>>>11
return 536870911&a+((16383&a)<<15)}}],["","",,M,{"^":"",bJ:{"^":"b;$ti",
h:function(a,b){var z
if(!this.cH(b))return
z=this.c.h(0,this.a.$1(H.fg(b,H.x(this,"bJ",1))))
return z==null?null:J.cQ(z)},
k:function(a,b,c){if(!this.cH(b))return
this.c.k(0,this.a.$1(b),new B.hx(b,c,[null,null]))},
N:function(a,b){if(!this.cH(b))return!1
return this.c.N(0,this.a.$1(H.fg(b,H.x(this,"bJ",1))))},
v:function(a,b){this.c.v(0,new M.kw(b))},
gC:function(a){var z=this.c
return z.gC(z)},
gZ:function(a){var z=this.c
return z.gZ(z)},
gV:function(a){var z=this.c
z=z.gan(z)
return H.bn(z,new M.kx(),H.x(z,"F",0),null)},
gi:function(a){var z=this.c
return z.gi(z)},
D:function(a,b){var z
if(!this.cH(b))return
z=this.c.D(0,this.a.$1(H.fg(b,H.x(this,"bJ",1))))
return z==null?null:J.cQ(z)},
gan:function(a){var z=this.c
z=z.gan(z)
return H.bn(z,new M.ky(),H.x(z,"F",0),null)},
j:function(a){return P.d5(this)},
cH:function(a){var z
if(a==null||H.dG(a,H.x(this,"bJ",1)))z=this.b.$1(a)===!0
else z=!1
return z},
$isQ:1,
$asQ:function(a,b,c){return[b,c]}},kw:{"^":"a:3;a",
$2:function(a,b){var z=J.af(b)
return this.a.$2(z.gO(b),z.gB(b))}},kx:{"^":"a:0;",
$1:function(a){return J.fm(a)}},ky:{"^":"a:0;",
$1:function(a){return J.cQ(a)}}}],["","",,B,{"^":"",hx:{"^":"b;O:a>,B:b>,$ti"}}],["","",,N,{"^":"",o1:{"^":"o_;Q,ch,a,b,c,d,e,f,r,x,y,z",
hg:function(){$.$get$c6().k(0,"game",this.ch)},
jR:function(){this.ch=H.c4($.$get$c6().h(0,"game"),"$isfS")},
k9:function(){this.ch=null
var z=$.$get$c3()
z=new O.fS(null,null,null,null,null,null,null,new Y.ah(H.r([],[Y.az]),0),O.vm(),O.vl(),O.vk(),z,new P.b6(""),!1,null)
z.dv()
this.ch=z
z.r="endGame"},
i7:function(){var z,y
z=new O.dh(["You and Briana sprint through the giant worm\u2019s tunnel.","Suddenly, an **orc** and a **goblin** jump in front of you from a slimy crevice, swords in hands.","![Orc and Goblin](img/orc_and_goblin_sketch.jpg)",[null,P.aU(["goto","gameLoop"])]],0,null,!1,!1)
y=this.a.a
y.k(0,"start",z)
z.a="start"
z=new O.dh([new N.o3(this),[null,P.aU(["goto","gameLoop"])]],0,null,!1,!1)
y.k(0,"gameLoop",z)
z.a="gameLoop"
z=new O.dh(['<p class="meta">\n  Hit <strong>Restart</strong> (top left) to play again. It will be different.\n</p>'],0,null,!1,!1)
y.k(0,"endGame",z)
z.a="endGame"
this.b=y.h(0,"start")},
q:{
o2:function(){var z,y
z=P.i
y=new H.a1(0,null,null,null,null,null,0,[z,O.dh])
z=new N.o1("net.filiph.edgehead.0.0.1",null,new O.o4(y),null,null,null,P.H(null,null,null,z),!1,null,-9999,null,null)
z.i7()
return z}}},o3:{"^":"a:26;a",
$0:function(){var z=0,y=new P.aS(),x=1,w,v=this
var $async$$0=P.aN(function(a,b){if(a===1){w=b
z=x}while(true)switch(z){case 0:z=2
return P.z(v.a.ch.aO(),$async$$0,y)
case 2:return P.z(null,0,y)
case 1:return P.z(w,1,y)}})
return P.z(null,$async$$0,y)}}}],["","",,O,{"^":"",
xw:[function(a,b){var z,y
z=b.gja()
z=new H.a3(z,new O.tr(a),[H.p(z,0)]).ae(0,0,new O.ts())
if(typeof z!=="number")return H.n(z)
y=b.a
y=new H.a3(y,new O.tt(a),[H.p(y,0)]).ae(0,0,new O.tu())
if(typeof y!=="number")return H.n(y)
return 0+z-y},"$2","ja",4,0,4],
fS:{"^":"n8;x,y,z,Q,ch,cu:cx<,cy,f0:db<,a,b,c,d,e,f,r",
dv:function(){var z,y,x,w
z=[P.i]
y=H.r([],z)
x=P.H(null,null,null,null)
w=$.$get$fe()
x=new R.cA(null,!0,y,null,null,C.c,1,null,100,!0,!1,x,null,!0,C.k,w,null)
new O.l9().$1(x)
this.x=x.I()
y=new R.cA(null,!0,H.r([],z),null,null,C.c,1,null,100,!0,!1,P.H(null,null,null,null),null,!0,C.k,w,null)
new O.la().$1(y)
this.y=y.I()
y=new R.cA(null,!0,H.r([],z),null,null,C.c,1,null,100,!0,!1,P.H(null,null,null,null),null,!0,C.k,w,null)
new O.lb().$1(y)
this.z=y.I()
z=new R.cA(null,!0,H.r([],z),null,null,C.c,1,null,100,!0,!1,P.H(null,null,null,null),null,!0,C.k,w,null)
new O.lc().$1(z)
this.Q=z.I()
z=new A.cm(null,null,[P.t,{func:1,v:true,args:[A.ai,Y.ah]}])
z.bl()
z.cq(0,C.v)
z=new U.io(null,0,null,null,z)
new O.ld(this).$1(z)
this.ch=S.aW(z.I())
z=P.aV([this.x,this.y,this.z,this.Q],null)
y=this.ch
x=P.H(null,null,null,null)
y=new A.ai(z,P.H(null,null,null,null),x,P.H(null,null,null,null),P.a6([y],!0,null),0)
this.cx=y
x=new Y.ah(H.r([],[Y.az]),0)
z=new B.cp(y,null,x,1,1,!0,!1,!1,0)
z.f3(y,null,null,x,1,!1,!0,!1)
this.cy=z},
di:function(){var z=0,y=new P.aS(),x,w=2,v,u=this,t,s,r,q,p,o,n,m,l,k,j,i,h
var $async$di=P.aN(function(a,b){if(a===1){v=b
z=w}while(true)switch(z){case 0:t=u.cx.e
if(t.length===0){u.f=!0
t=u.db
t.aR(0,"\n\n",!0)
s=u.cx.a0(u.x.r)
if(s.gbB()){t.ea(0,"<subject> look<s> behind",s)
t.ea(0,"<subject> see<s> the giant worm's hideous head approaching",s)
if(u.cx.a0(u.y.r).gbB())t.aR(0,"You both start sprinting again.",!0)
else{t.ea(0,"<subject> take<s> a last look at Briana",s)
t.je(0,"<subject> start<s> sprinting again, alone",!0,s)}t.aR(0,"\n\n",!0)
t.aR(0,"TO BE CONTINUED.",!0)}else t.aR(0,"You will soon be the giant worm's food.",!0)
u.e.a+=t.dc()
z=1
break}r=C.a.gB(t)
t=J.q(r)
q=t.gah(r).dn(u.cx)
p=u.cx
o=new H.a1(0,null,null,null,null,null,0,[null,null])
n=J.R(q)
m=new Y.ah(H.r([],[Y.az]),0)
m.b=p.f
l=new G.kd(n,new B.cp(p,null,m,1,1,!0,!1,!1,0),0,!1,o)
z=3
return P.z(l.d9(4,new O.le()),$async$di,y)
case 3:k=G.nw(o)
p=k.b
if(p.length===0){u.cx.hr(t.gA(r),new O.lf())
t=u.cx
p=t.f
if(typeof p!=="number"){x=p.J()
z=1
break}t.f=p+1
z=1
break}if(q.gS()){if(p.length===1){u.dF(C.a.ga7(p),q,u.db)
z=1
break}t=u.db
u.e.a+=t.dc()
C.a.si(t.a,0)
l.eR().v(0,P.uQ())
j=P.a6(new H.pi(p,0,4,[H.p(p,0)]),!0,null)
t=new O.lg()
p=j.length-1
if(p-0<=32)H.hP(j,0,p,t)
else H.hO(j,0,p,t)
for(t=j.length,p=u.c,i=0;i<j.length;j.length===t||(0,H.a7)(j),++i){h=j[i]
p.$2$script(J.K(h),new O.lh(u,q,h))}z=1
break}else{t=S.nM(k.a,1000)
if(t>=p.length){x=H.e(p,t)
z=1
break}o=u.db
u.dF(p[t],q,o)}if(o.gek()){u.e.a+=o.hj(!0)
o.kF()}case 1:return P.z(x,0,y)
case 2:return P.z(v,1,y)}})
return P.z(null,$async$di,y)},
dF:function(a,b,c){var z,y,x
z=a.cV(b,this.cy,this.cx)
z.toString
y=P.a6(z,!0,H.x(z,"F",0))
x=S.nL(new H.ax(y,new O.l6(),[null,null]),1)
if(x>=y.length)return H.e(y,x)
z=y[x]
this.cy=z
C.a.L(c.a,z.gf0().a)
this.cx=this.cy.gcu()}},
l9:{"^":"a:0;",
$1:function(a){var z
a.gt()
a.r=1
a.gt()
a.z=!0
a.gt()
a.cy=C.I
a.gt()
a.ch="Filip"
z=$.$get$bA()
a.gt()
a.c=new U.dj(!1,10,!0,!0,z,"sword",C.h)
a.gt()
a.f=2
a.gt()
a.x=1000
return a}},
la:{"^":"a:0;",
$1:function(a){var z
a.gt()
a.r=100
a.gt()
a.cy=C.ak
a.gt()
a.ch="Briana"
z=$.$get$bA()
a.gt()
a.c=new U.dj(!1,10,!0,!0,z,"longsword",C.h)
a.gt()
a.f=2
return a}},
lb:{"^":"a:0;",
$1:function(a){var z
a.gt()
a.r=1000
a.gt()
a.ch="orc"
a.gt()
a.cx=!1
a.gt()
a.cy=C.H
z=$.$get$bA()
a.gt()
a.c=new U.dj(!1,10,!0,!0,z,"sword",C.h)
a.gt()
a.f=2
z=$.$get$f4()
a.gt()
a.db=z
a.gt()
a.dx=O.ja()
return a}},
lc:{"^":"a:0;",
$1:function(a){var z
a.gt()
a.r=1001
a.gt()
a.ch="goblin"
a.gt()
a.cx=!1
a.gt()
a.cy=C.H
z=$.$get$bA()
a.gt()
a.c=new U.dj(!1,10,!0,!0,z,"scimitar",C.h)
z=$.$get$f4()
a.gt()
a.db=z
a.gt()
a.dx=O.ja()
return a}},
ld:{"^":"a:0;a",
$1:function(a){var z,y,x
z=this.a
y=P.t
x=S.fw([z.x.r,z.y.r],y)
a.gaY()
a.b=x
y=S.fw([z.z.r,z.Q.r],y)
a.gaY()
a.c=y
y=a.geh()
y.gcP().k(0,2,new O.l7())
z=a.geh()
z.gcP().k(0,6,new O.l8())
return a}},
l7:{"^":"a:3;",
$2:function(a,b){b.eb()
b.l(0,"You hear a horrible growling sound from behind.")
b.l(0,"The worm must be near.")
b.aR(0,"\n\n",!0)}},
l8:{"^":"a:3;",
$2:function(a,b){b.eb()
b.l(0,"The earth shatters and there's that sound again.")
b.aR(0,"\n\n",!0)}},
le:{"^":"a:26;",
$0:function(){var z=0,y=new P.aS(),x=1,w
var $async$$0=P.aN(function(a,b){if(a===1){w=b
z=x}while(true)switch(z){case 0:z=2
return P.z(C.an.gjn(window),$async$$0,y)
case 2:return P.z(null,0,y)
case 1:return P.z(w,1,y)}})
return P.z(null,$async$$0,y)}},
lf:{"^":"a:0;",
$1:function(a){var z,y
z=J.q(a)
y=z.gah(a).eg()
z.sah(a,y)
return y}},
lg:{"^":"a:3;",
$2:function(a,b){return J.cN(J.K(a),J.K(b))}},
lh:{"^":"a:1;a,b,c",
$0:function(){var z=this.a
z.dF(this.c,this.b,z.db)}},
l6:{"^":"a:0;",
$1:function(a){return a.gkA()}},
tr:{"^":"a:0;a",
$1:function(a){return J.f(a.gab(),this.a.gab())}},
ts:{"^":"a:3;",
$2:function(a,b){return J.P(a,b.gas())}},
tt:{"^":"a:0;a",
$1:function(a){return a.bT(this.a)}},
tu:{"^":"a:3;",
$2:function(a,b){return J.P(a,b.gas())}}}],["","",,Q,{"^":"",dV:{"^":"b;",
cV:function(a,b,c){var z=this
return new P.dz(function(){var y=a,x=b,w=c
var v=0,u=2,t,s,r,q,p
return function $async$cV(d,e){if(d===1){t=e
v=u}while(true)switch(v){case 0:s=z.eT(y,x.gcu())
r=J.I(s)
v=r.ag(s,0)?3:4
break
case 3:q=A.il(w)
v=5
return B.ek(q,x,z,z.f7(q,y,w,z.gfU()),s,!1,!1,!0)
case 5:case 4:v=r.X(s,1)?6:7
break
case 6:v=!z.gh3()?8:9
break
case 8:r=H.r([],[Y.az])
if(typeof s!=="number")H.n(s)
v=10
return B.ek(w,x,z,new Y.ah(r,0),1-s,!0,!1,!1)
case 10:v=1
break
case 9:q=A.il(w)
p=z.f7(q,y,w,z.gfT())
if(typeof s!=="number")H.n(s)
v=11
return B.ek(q,x,z,p,1-s,!0,!1,!1)
case 11:case 7:case 1:return P.dv()
case 2:return P.dw(t)}}})},
f7:function(a,b,c,d){var z,y,x,w,v,u,t
z=a.a.aX(0,new Q.k7(b))
y=new O.k5(null,null,null,C.C,null,null,null)
y.f=this.gn(this)
y.a=b
y.ko(c)
x=new Y.ah(H.r([],[Y.az]),0)
w=a.e
v=J.R(w.length!==0?C.a.gB(w):null)
u=a.gu(a);(w.length!==0?C.a.gB(w):null).d7(a,x)
if(a.gu(a)!==u)throw H.c(new P.w("Please don't change the world in onBeforeAction"))
this.a=d.$3(z,a,x)
a.hr(v,new Q.k8())
t=a.f
if(typeof t!=="number")return t.J()
a.f=t+1
t=a.hy(v)
if(!(t==null))t.hf(a,x)
while(!0){t=w.length!==0?C.a.gB(w):null
t=t==null?t:J.c9(t)
if((t==null?t:t.dn(a))!=null){t=w.length!==0?C.a.gB(w):null
t=t==null?t:J.c9(t)
t=!J.f(t==null?t:t.eY(a),!0)}else t=!0
if(!t)break
if((w.length!==0?C.a.gB(w):null)==null)break
C.a.hk(w)}if(this.a==null)H.u(new P.w("No description given when executing "+this.j(0)+". You should return it from your world-modifying function."))
y.e=a
y.b=this.a
y.r=a.f
a.c.l(0,y.I())
return x}},k7:{"^":"a:0;a",
$1:function(a){return J.f(J.R(a),J.R(this.a))}},k8:{"^":"a:0;",
$1:function(a){var z=J.q(a)
z.sah(a,z.gah(a).eg())
return a}},kD:{"^":"dV;n:b>,c,d,e,f,h3:r<,a",
jo:[function(a,b,c){return this.e.$3(a,b,c)},"$3","gfT",6,0,0],
jp:[function(a,b,c){return this.d.$3(a,b,c)},"$3","gfU",6,0,0],
eT:function(a,b){return this.f},
d3:function(a,b){return this.c.$2(a,b)},
j:function(a){return this.b},
q:{
e1:function(a,b,c,d,e){return new Q.kD(a,b,c,d,e,!0,null)}}},fr:{"^":"b;"},aE:{"^":"fr;n:a>,b,c,d,e",
ju:function(a,b){var z,y
z=b.e
y=J.c9(z.length!==0?C.a.gB(z):null).bi(b.a,b)
z=H.p(y,0)
return new H.cn(new H.a3(y,new Q.lo(a),[z]),new Q.lp(this),[z,null])},
j:function(a){return"EnemyTargetActionBuilder<"+this.a+">"}},lo:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gab()
y=this.a.gab()
z=z.a
y=y.a
return z==null?y!=null:z!==y}},lp:{"^":"a:10;a",
$1:function(a){var z,y
z=new Y.ah(H.r([],[Y.az]),0)
y=this.a
z.jd(0,y.a,a)
return new Q.ln(z.dc(),y.b,y.c,y.d,y.e,a,null)}},ln:{"^":"dV;n:b>,c,d,e,f,r,a",
jo:[function(a,b,c){return this.e.$4(a,this.r,b,c)},"$3","gfT",6,0,0],
jp:[function(a,b,c){return this.d.$4(a,this.r,b,c)},"$3","gfU",6,0,0],
gh3:function(){return this.e!=null},
eT:function(a,b){return this.f.$3(a,this.r,b)},
d3:function(a,b){return this.c.$3(a,this.r,b)},
j:function(a){return this.b}}}],["","",,O,{"^":"",
xr:[function(a){return J.R(a)},"$1","tk",2,0,5],
cR:{"^":"b;cc:a<,fQ:b<,G:c<,hi:d<,e,kk:f<,r",
gu:function(a){var z=this.d
return X.jg(this.c,this.a,X.aO(z==null?new P.iJ(0,null,null,null,null,null,0,[null]):P.aV([z],null)),X.aO(this.f))},
p:function(a,b){var z
if(b==null)return!1
z=J.l(b)
return!!z.$iscR&&this.gu(this)===z.gu(b)},
j:function(a){return"ActionRecord<"+H.d(this.b)+", "+H.d(this.a)+">"}},
k5:{"^":"b;a,b,c,d,e,fQ:f<,G:r<",
gcc:function(){return this.b},
ghi:function(){return this.a},
I:function(){var z,y,x,w,v,u,t,s
z=this.d
switch(z){case C.C:y=this.e.a
break
case C.af:z=R.S
y=P.aV(H.r([this.a],[z]),z)
break
default:throw H.c(new P.cy("Mode "+z.j(0)+" not implemented"))}x=R.dX(P.T)
z=this.e.a
for(w=z.gH(z),z=new H.ik(w,new O.k6(this),[H.p(z,0)]);z.m();){v=w.gw()
x.k(0,v,J.J(v.bL(this.e),this.c.h(0,v)))}z=this.r
w=this.f
u=this.b
t=J.R(this.a)
s=P.aV(new H.bL(y,O.tk(),[H.p(y,0),null]),null)
return new O.cR(u,w,z,t,P.H(null,null,null,P.t),s,x)},
ko:function(a){var z,y,x
this.c=R.dX(P.T)
for(z=a.a,y=new P.aB(z,z.r,null,null,[null]),y.c=z.e;y.m();){x=y.d
this.c.k(0,x,x.bL(a))}}},
k6:{"^":"a:0;a",
$1:function(a){var z=this.a.c
return z.gV(z).E(0,a)}},
hg:{"^":"b;a",
j:function(a){return C.aj.h(0,this.a)}}}],["","",,R,{"^":"",S:{"^":"nj;",
gbB:function(){return this.f>0},
bL:function(a){var z,y,x
z=this.dx
if(z!=null)return z.$2(this,a)
z=a.a
y=[H.p(z,0)]
x=new H.a3(z,new R.kj(this),y).ae(0,0,new R.kk())
if(typeof x!=="number")return H.n(x)
y=new H.a3(z,new R.kl(this),y).ae(0,0,new R.km())
if(typeof y!=="number")return H.n(y)
return 10*this.f+x-y},
aW:function(a){var z=this.c
return z!=null&&z.a===a},
$isbN:1},nj:{"^":"b+e4;"},kj:{"^":"a:0;a",
$1:function(a){return J.f(a.gab(),this.a.db)}},kk:{"^":"a:27;",
$2:function(a,b){return J.P(a,2*b.gas())}},kl:{"^":"a:0;a",
$1:function(a){return a.bT(this.a)}},km:{"^":"a:27;",
$2:function(a,b){return J.P(a,b.gas())}},k9:{"^":"b;aj:c<,K:e@,as:f@,A:r>,S:z<,n:ch*,F:cy<,ab:db<"},dW:{"^":"bJ;a,b,c,$ti",
gu:function(a){var z=this.gan(this)
return X.aO(P.a6(z,!1,H.x(z,"F",0)))},
p:function(a,b){var z,y
if(b==null)return!1
z=J.l(b)
if(!!z.$isdW){y=this.gan(this)
y=X.aO(P.a6(y,!1,H.x(y,"F",0)))
z=z.gan(b)
z=y===X.aO(P.a6(z,!1,H.x(z,"F",0)))}else z=!1
return z},
$asbJ:function(a){return[P.t,R.S,a]},
$asQ:function(a){return[R.S,a]},
q:{
dX:function(a){var z=new H.a1(0,null,null,null,null,null,0,[P.t,[B.hx,R.S,a]])
return new R.dW(new R.kb(),new R.kc(),z,[a])},
ka:function(a,b){var z=R.dX(b)
a.v(0,new R.uk(b,z))
return z}}},kb:{"^":"a:10;",
$1:function(a){return J.R(a)}},kc:{"^":"a:0;",
$1:function(a){return a!=null}},uk:{"^":"a;a,b",
$2:function(a,b){this.b.k(0,a,b)
return b},
$signature:function(){return H.an(function(a){return{func:1,args:[R.S,a]}},this,"dW")}},em:{"^":"b;a",
j:function(a){return C.F.h(0,this.a)}},pI:{"^":"S;cU:a<,b,aj:c<,d,K:e<,as:f<,A:r>,x,en:y<,S:z<,Q,n:ch>,d6:cx<,F:cy<,ab:db<,dx",
af:function(a){var z=new R.cA(null,!0,H.r([],[P.i]),null,null,C.c,1,null,100,!0,!1,P.H(null,null,null,null),null,!0,C.k,$.$get$fe(),null)
z.dy=this
a.$1(z)
return z.I()},
p:function(a,b){var z,y
if(b==null)return!1
if(!(b instanceof R.S))return!1
if(this.b===b.b){z=this.c
y=b.c
if(z==null?y==null:z===y)if(this.e===b.e)if(this.f===b.f){z=this.r
y=b.r
if(z==null?y==null:z===y)if(this.x===b.x)z=this.z===b.z&&this.Q===b.Q&&J.f(this.ch,b.ch)&&this.cx===b.cx&&this.cy===b.cy&&J.f(this.db,b.db)&&J.f(this.dx,b.dx)
else z=!1
else z=!1}else z=!1
else z=!1
else z=!1}else z=!1
return z},
gu:function(a){return Y.aP(Y.B(Y.B(Y.B(Y.B(Y.B(Y.B(Y.B(Y.B(Y.B(Y.B(Y.B(Y.B(Y.B(Y.B(Y.B(Y.B(0,C.p.gu(!0)),H.ak(this.b)),J.E(this.c)),C.z.gu(this.d)),H.ak(this.e)),this.f&0x1FFFFFFF),J.E(this.r)),this.x&0x1FFFFFFF),C.p.gu(!0)),C.p.gu(this.z)),H.ak(this.Q)),J.E(this.ch)),C.p.gu(this.cx)),H.ak(this.cy)),J.E(this.db)),J.E(this.dx)))},
j:function(a){return"Actor {alreadyMentioned="+String(!0)+",\ncategories="+P.bm(this.b,"[","]")+",\ncurrentWeapon="+J.A(this.c)+",\nshield="+C.z.j(this.d)+",\npose="+H.d(C.F.h(0,this.e.a))+",\nhitpoints="+C.f.j(this.f)+",\nid="+J.A(this.r)+",\ninitiative="+C.f.j(this.x)+",\nisActive="+String(!0)+",\nisPlayer="+String(this.z)+",\nitems="+P.bm(this.Q,"{","}")+",\nname="+H.d(J.A(this.ch))+",\nnameIsProperNoun="+String(this.cx)+",\npronoun="+this.cy.a+",\nteam="+J.A(this.db)+",\nworldScoringFunction="+H.d(J.A(this.dx))+",\n}"}},cA:{"^":"k9;dy,a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx",
gcU:function(){this.gt()
this.a
return!0},
gaj:function(){this.gt()
return this.c},
gK:function(){this.gt()
return this.e},
sK:function(a){this.gt()
this.e=a},
gas:function(){this.gt()
return this.f},
sas:function(a){this.gt()
this.f=a},
gA:function(a){this.gt()
return this.r},
gS:function(){this.gt()
return this.z},
gn:function(a){this.gt()
return this.ch},
sn:function(a,b){this.gt()
this.ch=b},
gd6:function(){this.gt()
return this.cx},
gF:function(){this.gt()
return this.cy},
gab:function(){this.gt()
return this.db},
gt:function(){var z=this.dy
if(z!=null){z.a
this.a=!0
this.b=this.dy.b
this.c=this.dy.c
this.d=this.dy.d
this.e=this.dy.e
this.f=this.dy.f
this.r=this.dy.r
this.x=this.dy.x
this.dy.y
this.y=!0
this.z=this.dy.z
this.Q=this.dy.Q
this.ch=this.dy.ch
this.cx=this.dy.cx
this.cy=this.dy.cy
this.db=this.dy.db
this.dx=this.dy.dx
this.dy=null}return this},
I:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=this.dy
if(z==null){this.gt()
this.a
this.gt()
y=this.b
this.gt()
x=this.c
this.gt()
w=this.d
this.gt()
v=this.e
this.gt()
u=this.f
this.gt()
t=this.r
this.gt()
s=this.x
this.gt()
this.y
this.gt()
r=this.z
this.gt()
q=this.Q
this.gt()
p=this.ch
this.gt()
o=this.cx
this.gt()
n=this.cy
this.gt()
m=this.db
this.gt()
z=new R.pI(!0,y,x,w,v,u,t,s,!0,r,q,p,o,n,m,this.dx)
if(t==null)H.u(P.aa("id"))
if(p==null)H.u(P.aa("name"))
if(m==null)H.u(P.aa("team"))}this.dy=z
return z}}}],["","",,U,{"^":"",
vw:function(a){switch(a){case C.a1:return"spear"
case C.a2:return"branch"
case C.a3:return"tent"
case C.h:return"sword"
default:throw H.c(P.X(a))}},
d1:{"^":"b;a",
j:function(a){return C.ai.h(0,this.a)}},
ea:{"^":"hu;$ti",
gcc:function(){return U.vw(this.a)},
$isbN:1},
hu:{"^":"b+e4;$ti"},
dj:{"^":"ea;b,c,cU:d<,en:e<,ab:f<,n:r>,a",
gA:function(a){return H.ak(this)},
gbB:function(){return!1},
gS:function(){return!1},
gd6:function(){return!1},
gF:function(){return C.k},
$asea:I.Y,
$ashu:I.Y}}],["","",,K,{"^":"",n6:{"^":"b;a,j9:b<,c"},n7:{"^":"b;"}}],["","",,G,{"^":"",n8:{"^":"b;",
aO:function(){var z=0,y=new P.aS(),x,w=2,v,u=this,t,s
var $async$aO=P.aN(function(a,b){if(a===1){v=b
z=w}while(true)switch(z){case 0:if(u.r==null)throw H.c(new P.w("Cannot run a LoopedEvent before onFinishedGoto is defined."))
if(u.f){u.d.si(0,0)
u.a.$1(u.r)
z=1
break}t=u.d
s=u.e
case 3:if(!!0){z=4
break}if(!(!u.f&&t.gi(t)===0&&s.a.length===0)){z=4
break}z=5
return P.z(u.di(),$async$aO,y)
case 5:z=3
break
case 4:t=s.a
if(t.length!==0){u.b.$1(t.charCodeAt(0)==0?t:t)
s.a=""}case 1:return P.z(x,0,y)
case 2:return P.z(v,1,y)}})
return P.z(null,$async$aO,y)}}}],["","",,B,{"^":"",cp:{"^":"b;cu:a<,b,f0:c<,kA:d<,d0:e<,f,r,x,d8:y>",
gu:function(a){return X.aO([this.a,this.e,this.b,this.d,this.y,this.f,this.r,this.x])},
p:function(a,b){var z
if(b==null)return!1
z=J.l(b)
return!!z.$iscp&&this.gu(this)===z.gu(b)},
j:function(a){var z,y
z=this.a
y=J.l(z)
z="PlanConsequence<"+y.gu(z)+", "+y.j(z)+", "+J.A(this.b)+", "+H.d(this.d)+", "+H.d(this.y)+", "
return z+(this.x?"isSuccess":"")+">"},
f3:function(a,b,c,d,e,f,g,h){this.c.b=this.a.f},
q:{
ek:function(a,b,c,d,e,f,g,h){var z,y
z=b==null
y=z?0:J.P(b.gd8(b),1)
y=new B.cp(a,c,d,e,z?e:J.cL(e,b.gd0()),g,f,h,y)
y.f3(a,b,c,d,e,f,g,h)
return y}}},fC:{"^":"b;cA:a<,d0:b<,d8:c>"}}],["","",,G,{"^":"",kd:{"^":"b;a,b,c,d,e",
eR:function(){var z=this
return new P.dz(function(){var y=0,x=1,w,v,u,t,s
return function $async$eR(a,b){if(a===1){w=b
y=x}while(true)switch(y){case 0:v=z.e,u=v.gV(v),u=u.gH(u),t=0
case 2:if(!u.m()){y=3
break}s=u.gw()
y=4
return""+t+") "+H.d(s)+"\t"+J.k3(v.h(0,s),2)
case 4:++t
y=2
break
case 3:return P.dv()
case 1:return P.dw(w)}}})},
dU:function(a,b){return new P.dz(function(){var z=a,y=b
var x=0,w=1,v,u,t,s
return function $async$dU(c,d){if(c===1){v=d
x=w}while(true)switch(x){case 0:u=y.e
x=2
return P.iG((u.length!==0?C.a.gB(u):null).gbs())
case 2:u=(u.length!==0?C.a.gB(u):null).gaF()
t=u.length
s=0
case 3:if(!(s<u.length)){x=5
break}x=6
return P.iG(u[s].ju(z,y))
case 6:case 4:u.length===t||(0,H.a7)(u),++s
x=3
break
case 5:return P.dv()
case 1:return P.dw(v)}}})},
d9:function(a,b){var z=0,y=new P.aS(),x=1,w,v=this,u,t,s,r,q,p,o,n,m
var $async$d9=P.aN(function(c,d){if(c===1){w=d
z=x}while(true)switch(z){case 0:u=v.e
u.Y(0)
t=v.b
s=t.a
r=s.a.aX(0,new G.ki(v))
q=r.bL(s)
p=new P.bZ(v.dU(r,s).a(),null,null,null)
case 2:if(!p.m()){z=3
break}o=p.c
n=o==null?p.b:o.gw()
if(n.d3(r,s)!==!0){z=2
break}z=4
return P.z(v.bP(t,n,a,b).av(0),$async$d9,y)
case 4:m=d
if(J.fn(m)===!0){u.k(0,n,-1/0)
z=2
break}u.k(0,n,v.jz(m,q,a))
z=2
break
case 3:v.d=!0
return P.z(null,0,y)
case 1:return P.z(w,1,y)}})
return P.z(null,$async$d9,y)},
jz:function(a,b,c){var z,y,x,w,v,u,t,s
z=H.r([],[P.T])
for(y=J.aD(a),x=null;y.m()===!0;){w=y.gw()
if(J.Z(w.gd0(),0.3))if(x==null)x=w
else if(J.Z(w.gcA(),x.gcA()))x=w
z.push(J.cL(J.J(w.gcA(),b),w.b))}y=C.a.ae(z,0,new G.kh())
v=z.length
if(typeof y!=="number")return y.dm()
if(x==null)u=0
else{t=x.gcA()
s=x.c
if(typeof t!=="number")return t.dm()
if(typeof s!=="number")return H.n(s)
u=t/s}return u+y/v},
bP:function(a,b,c,d){var $async$bP=P.aN(function(e,f){switch(e){case 2:u=x
z=u.pop()
break
case 1:v=f
z=w}while(true)switch(z){case 0:s=a.a
r=s.a.aX(0,new G.ke(t))
r.bL(s)
q=P.b3(null,B.cp)
p=P.H(null,null,null,A.ai)
if(b.d3(r,s)!==!0){z=1
break}o=J.l(s)
n=o.gu(s)
for(m=new P.bZ(b.cV(r,a,s).a(),null,null,null);m.m();){l=m.c
k=l==null?m.b:l.gw()
if(o.gu(s)!==n)throw H.c(new P.w("Action "+b.j(0)+" modified world state when producing "+H.d(k)+"."))
q.a8(k)}case 3:if(!!q.gC(q)){z=4
break}z=1000*(Date.now()-$.$get$dY().a)>15e3?5:6
break
case 5:z=7
return P.cC(d.$0(),$async$bP,y)
case 7:$.dY=new P.bK(Date.now(),!1)
case 6:j=q.cp()
if(J.bC(J.jI(j),c)){z=4
break}z=j.gcu().e.length===0?8:9
break
case 8:s=j.a
z=10
x=[1]
return P.cC(P.iF(new B.fC(s.a.aX(0,new G.kf(t)).bL(s),j.e,j.y)),$async$bP,y)
case 10:z=3
break
case 9:s=j.a
o=s.e
i=J.c9(o.length!==0?C.a.gB(o):null).dn(s)
r=s.a.aX(0,new G.kg(t))
J.f(i,r)
z=11
x=[1]
return P.cC(P.iF(new B.fC(r.bL(s),j.e,j.y)),$async$bP,y)
case 11:for(o=new P.bZ(t.dU(i,s).a(),null,null,null);o.m();){m=o.c
h=m==null?o.b:m.gw()
if(h.d3(i,s)!==!0)continue
for(m=new P.bZ(h.cV(i,j,s).a(),null,null,null);m.m();){l=m.c
g=l==null?m.b:l.gw();++t.c
if(J.aJ(g.gd0(),0.05))continue
if(p.E(0,g.gcu()))continue
q.a8(g)}}p.l(0,s)
z=3
break
case 4:case 1:return P.cC(null,0,y)
case 2:return P.cC(v,1,y)}})
var z=0,y=P.q3($async$bP),x,w=2,v,u=[],t=this,s,r,q,p,o,n,m,l,k,j,i,h,g
return P.ti(y)}},ki:{"^":"a:0;a",
$1:function(a){return J.f(J.R(a),this.a.a)}},kh:{"^":"a:3;",
$2:function(a,b){return J.P(a,b)}},ke:{"^":"a:0;a",
$1:function(a){return J.f(J.R(a),this.a.a)}},kf:{"^":"a:0;a",
$1:function(a){return J.f(J.R(a),this.a.a)}},kg:{"^":"a:0;a",
$1:function(a){return J.f(J.R(a),this.a.a)}},el:{"^":"b;a,bs:b<",
gC:function(a){return this.b.length===0},
q:{
wO:[function(a,b){return J.P(a,b)},"$2","jp",4,0,6],
nw:function(a){var z,y,x,w,v,u,t,s,r,q
z={}
if(a.gC(a)){P.a8("WARNING: no recommendations")
return new G.el([],[])}y=a.gV(a)
x=P.a6(y,!0,H.x(y,"F",0))
C.a.aG(x,"removeWhere")
C.a.e5(x,new G.uK(a),!0)
if(x.length===1)return new G.el([1000],x)
C.a.cB(x,new G.tA(a))
w=a.gan(a).ae(0,1/0,P.vi())
v=a.gan(a).ae(0,-1/0,P.vh())
y=J.I(v)
u=J.I(w)
t=u.P(w,J.cL(y.P(v,w),0.1))
z.a=t
if(u.p(w,v)){t=J.J(t,1)
z.a=t
u=t}else u=t
s=y.P(v,u)
r=P.hl(x.length,new G.tB(z,a,x,s),!1,P.aI)
q=new H.ax(r,new G.tC(C.a.ae(r,0,G.jp())),[null,null]).ay(0,!1)
z=C.a.ae(q,0,G.jp())
if(typeof z!=="number")return H.n(z)
u=q.length
y=u-1
if(y<0)return H.e(q,y)
z=J.P(q[y],1000-z)
if(y>=q.length)return H.e(q,y)
q[y]=z
return new G.el(q,x)}}},uK:{"^":"a:0;a",
$1:function(a){return J.f(this.a.h(0,a),-1/0)}},tA:{"^":"a:3;a",
$2:function(a,b){var z=this.a
return J.jB(J.cN(z.h(0,a),z.h(0,b)))}},tB:{"^":"a:9;a,b,c,d",
$1:function(a){var z,y
z=this.c
if(a>=z.length)return H.e(z,a)
z=J.J(this.b.h(0,z[a]),this.a.a)
y=this.d
if(typeof z!=="number")return z.dm()
if(typeof y!=="number")return H.n(y)
return z/y}},tC:{"^":"a:0;a",
$1:function(a){var z=this.a
if(typeof a!=="number")return a.dm()
if(typeof z!=="number")return H.n(z)
return C.a4.df(a/z*1000)}}}],["","",,S,{"^":"",
aW:function(a){var z=new S.ir(null,$.$get$eZ().bD(1073741823),null)
new S.ur(a).$1(z)
return z.I()},
hI:{"^":"b;",
d7:function(a,b){this.b.d7(a,b)},
hf:function(a,b){this.b.toString},
gbs:function(){return this.b.gbs()},
gaF:function(){return this.b.gaF()}},
ur:{"^":"a:0;a",
$1:function(a){var z=this.a
a.gbR()
a.b=z
return z}},
oo:{"^":"b;A:a>,ah:b*"},
br:{"^":"b;",
d7:function(a,b){},
hf:function(a,b){},
gbs:function(){return C.m},
gaF:function(){return C.m},
eY:function(a){return!0},
dn:function(a){return this.bh(this.gG(),a)}},
ba:{"^":"b;$ti",
eg:function(){return this.af(new S.lk(this))}},
lk:{"^":"a;a",
$1:function(a){a.sG(a.gG()+1)
return a},
$signature:function(){return H.an(function(a,b){return{func:1,args:[b]}},this.a,"ba")}},
pN:{"^":"hI;A:a>,ah:b>",
af:function(a){var z=new S.ir(null,$.$get$eZ().bD(1073741823),null)
z.c=this
a.$1(z)
return z.I()},
p:function(a,b){if(b==null)return!1
if(!(b instanceof S.hI))return!1
return this.a===b.a&&J.f(this.b,b.b)},
gu:function(a){return Y.aP(Y.B(Y.B(0,this.a&0x1FFFFFFF),J.E(this.b)))},
j:function(a){return"Situation {id="+C.f.j(this.a)+",\nstate="+J.A(this.b)+",\n}"}},
ir:{"^":"oo;c,a,b",
gA:function(a){this.gbR()
return this.a},
gah:function(a){this.gbR()
return this.b},
sah:function(a,b){this.gbR()
this.b=b},
gbR:function(){var z=this.c
if(z!=null){this.a=z.a
this.b=this.c.b
this.c=null}return this},
I:function(){var z,y,x
z=this.c
if(z==null){this.gbR()
y=this.a
this.gbR()
x=this.b
z=new S.pN(y,x)
if(x==null)H.u(P.aa("state"))}this.c=z
return z}}}],["","",,S,{"^":"",
nN:function(a){if(a<0||a>1)throw H.c(P.a2(a,0,1,"Probability needs to be within <0,1>.",null))
if(a===0)return!1
if(a===1)return!0
return $.$get$bq().he()<a},
nL:function(a,b){var z,y,x,w,v
z=$.$get$bq().he()*b
for(y=new H.bP(a,a.gi(a),0,null,[H.x(a,"aL",0)]),x=0,w=0;y.m();){v=y.d
if(typeof v!=="number")return H.n(v)
x+=v
if(x>=z)return w;++w}throw H.c(P.X("The weights do not add up to total="+b))},
nM:function(a,b){var z,y,x,w,v,u,t
z=$.$get$bq().bD(b)
for(y=a.length,x=0,w=0,v=0;u=a.length,v<u;u===y||(0,H.a7)(a),++v){t=a[v]
if(typeof t!=="number")return H.n(t)
x+=t
if(x>=z)return w;++w}throw H.c(P.X("The weights do not add up to total="+b))},
hC:function(a){var z=$.$get$bq().bD(3)
if(z<0||z>=3)return H.e(a,z)
return a[z]},
dc:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=J.N(a)
y=z.at(a,"{")
if(y!==-1){x=J.J(z.gi(a),1)
if(typeof x!=="number")return H.n(x)
x=y<x}else x=!1
if(x){w=H.r([],[P.t])
w.push(y)
u=y+1
t=null
s=1
while(!0){x=z.gi(a)
if(typeof x!=="number")return H.n(x)
if(!(u<x)){v=null
break}r=z.h(a,u)
x=J.l(r)
if(x.p(r,"{"))++s
else if(x.p(r,"|")&&s===1)w.push(u)
else if(x.p(r,"}")){--s
if(s===0){w.push(u)
v=u
t=v
break}}q=u+1
t=u
u=q}p=w.length-1
if(p>1){o=$.$get$bq().bD(p)
z=z.a1(a,0,y)
x=w.length
if(o<0||o>=x)return H.e(w,o)
n=w[o]
m=o+1
if(m>=x)return H.e(w,m)
m=z+H.d(S.dc(C.b.a1(a,n+1,w[m])))
if(typeof v!=="number")return v.J()
n=a.length
m+=C.b.a1(a,v+1,n)
z=m.charCodeAt(0)==0?m:m
if(t===n-1)return z
else return S.dc(z)}else if(t===J.J(z.gi(a),1))return a
else{if(typeof t!=="number")return t.J()
x=t+1
return z.a1(a,0,x)+H.d(S.dc(C.b.bk(a,x)))}}else return a},
cr:function(a,b,c,d){switch($.$get$bq().bD(2)){case 0:a.$0()
break
case 1:b.$0()
break
case 2:c.$0()
break
case 4:d.$0()
break}}}],["","",,Y,{"^":"",az:{"^":"b;ac:a<,ai:b<,aw:c<,kw:d<,ku:e<,cW:f@,be:r<,bc:x<,jP:y<,hN:z<,ct:Q<,ch,kh:cx<,G:cy<",
h:function(a,b){switch(b){case"string":return this.a
case"subject":return this.b
case"object":return this.c
case"owner":return this.d
case"but":return this.f
case"positive":return this.r
case"negative":return this.x
case"endSentence":return this.y
case"startSentence":return!1
case"wholeSentence":return this.Q
case"time":return this.cy
default:throw H.c(P.X("Invalid key "+H.d(b)+"."))}}},ah:{"^":"b;a,G:b<",
bt:function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o){if(b==null||J.f(b,""))return
n=this.b
if((J.ao(b).d2(b,".")||C.b.d2(b,"!")||C.b.d2(b,"?"))&&C.b.cC(b,P.G("[A-Z]",!0,!1)))o=!0
this.a.push(new Y.az(b,m,h,j,i,d,k,g,e,!1,o,c,!1,n))},
l:function(a,b){return this.bt(a,b,null,!1,!1,!1,!1,null,null,null,!1,!1,null,null,!1)},
aR:function(a,b,c){return this.bt(a,b,null,!1,!1,!1,!1,null,null,null,!1,!1,null,null,c)},
ea:function(a,b,c){return this.bt(a,b,null,!1,!1,!1,!1,null,null,null,!1,!1,c,null,!1)},
je:function(a,b,c,d){return this.bt(a,b,null,!1,c,!1,!1,null,null,null,!1,!1,d,null,!1)},
c9:function(a,b,c,d,e,f,g,h,i){return this.bt(a,b,null,c,d,!1,e,f,g,null,h,!1,i,null,!1)},
jf:function(a,b,c,d){return this.bt(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,d,null,!1)},
jd:function(a,b,c){return this.bt(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,null,null,!1)},
eb:function(){return this.aR(0,"\n\n",!0)},
dz:[function(a){var z=J.I(a)
if(z.X(a,0)||z.bg(a,this.a.length))return
else{z=this.a
if(a>>>0!==a||a>=z.length)return H.e(z,a)
return z[a].gac()}},"$1","gac",2,0,3],
U:[function(a){var z=J.I(a)
if(z.X(a,0)||z.bg(a,this.a.length))return
else{z=this.a
if(a>>>0!==a||a>=z.length)return H.e(z,a)
return z[a].gai()}},"$1","gai",2,0,1],
am:[function(a){var z=J.I(a)
if(z.X(a,0)||z.bg(a,this.a.length))return
else{z=this.a
if(a>>>0!==a||a>=z.length)return H.e(z,a)
return z[a].gaw()}},"$1","gaw",2,0,1],
kT:function(a){var z,y,x
z=this.a
if(a>=z.length)return H.e(z,a)
if(z[a].gG()!=null){y=a-1
if(this.aB(y)){if(y<0||y>=z.length)return H.e(z,y)
y=z[y].gG()==null}else y=!0}else y=!0
if(y)return 1000
else{if(a>=z.length)return H.e(z,a)
y=z[a].gG()
x=a-1
if(x<0||x>=z.length)return H.e(z,x)
x=z[x].gG()
if(typeof y!=="number")return y.P()
if(typeof x!=="number")return H.n(x)
return y-x}},
cQ:function(a,b){var z,y
if(!this.aB(a)||!this.aB(b))return!1
z=this.a
if(a>=z.length)return H.e(z,a)
if(z[a].gai()!=null){if(b<0||b>=z.length)return H.e(z,b)
y=z[b].gai()==null}else y=!0
if(y)return!1
if(a>=z.length)return H.e(z,a)
y=J.R(z[a].gai())
if(b<0||b>=z.length)return H.e(z,b)
z=J.R(z[b].gai())
return y==null?z==null:y===z},
iZ:function(a,b){var z,y
if(!this.aB(a)||!this.aB(b))return!1
z=this.a
if(a>=z.length)return H.e(z,a)
if(z[a].gaw()!=null){if(b<0||b>=z.length)return H.e(z,b)
y=z[b].gaw()==null}else y=!0
if(y)return!1
if(a>=z.length)return H.e(z,a)
y=J.R(z[a].gaw())
if(b<0||b>=z.length)return H.e(z,b)
return J.f(y,J.R(z[b].gaw()))},
ei:function(a,b){var z,y,x
if(!this.aB(a)||!this.aB(b))return!1
z=this.a
if(a<0||a>=z.length)return H.e(z,a)
if(z[a].gai()!=null){if(b<0||b>=z.length)return H.e(z,b)
y=z[b].gai()==null}else y=!0
if(y)return!1
if(a>=z.length)return H.e(z,a)
if(z[a].gaw()!=null){if(b<0||b>=z.length)return H.e(z,b)
y=z[b].gaw()==null}else y=!0
if(y)return!1
if(a>=z.length)return H.e(z,a)
y=J.R(z[a].gai())
if(b<0||b>=z.length)return H.e(z,b)
x=J.R(z[b].gaw())
if(y==null?x==null:y===x){if(a>=z.length)return H.e(z,a)
y=J.R(z[a].gaw())
if(b>=z.length)return H.e(z,b)
z=J.f(y,J.R(z[b].gai()))}else z=!1
return z},
aB:function(a){if(a>=this.a.length||a<0)return!1
else return!0},
hA:function(a,b){var z,y
if(!this.aB(a)||!this.aB(b))return!1
if(this.ei(a,b)&&this.U(a).bT(this.U(b))){z=this.a
if(a>=z.length)return H.e(z,a)
if(z[a].gbe()){if(b>=z.length)return H.e(z,b)
y=z[b].gbc()}else y=!1
if(y)return!0
if(a>=z.length)return H.e(z,a)
if(z[a].gbc()){if(b>=z.length)return H.e(z,b)
z=z[b].gbe()}else z=!1
if(z)return!0}if(!this.cQ(a,b))return!1
z=this.a
if(a>=z.length)return H.e(z,a)
if(z[a].gbe()){if(b>=z.length)return H.e(z,b)
y=z[b].gbe()}else y=!1
if(y)return!0
if(a>=z.length)return H.e(z,a)
if(z[a].gbc()){if(b>=z.length)return H.e(z,b)
z=z[b].gbc()}else z=!1
if(z)return!0
else return!1},
kv:function(a,b){var z,y
if(!this.aB(a)||!this.aB(b))return!1
if(this.ei(a,b)&&this.U(a).bT(this.U(b))){z=this.a
if(a>=z.length)return H.e(z,a)
if(z[a].gbe()){if(b<0||b>=z.length)return H.e(z,b)
y=z[b].gbe()}else y=!1
if(y)return!0
if(a>=z.length)return H.e(z,a)
if(z[a].gbc()){if(b<0||b>=z.length)return H.e(z,b)
z=z[b].gbc()}else z=!1
if(z)return!0}z=this.a
if(a>=z.length)return H.e(z,a)
y=z[a].gai()
if(b<0||b>=z.length)return H.e(z,b)
if(this.j_(y,z[b].gai())){if(a>=z.length)return H.e(z,a)
if(z[a].gbe()){if(b>=z.length)return H.e(z,b)
y=z[b].gbc()}else y=!1
if(y)return!0
if(a>=z.length)return H.e(z,a)
if(z[a].gbc()){if(b>=z.length)return H.e(z,b)
z=z[b].gbe()}else z=!1
if(z)return!0}return!1},
j_:function(a,b){if(a==null||b==null)return!1
return J.f(a.gab(),b.gab())},
gek:function(){return C.a.ao(this.a,new Y.oP())},
kF:function(){if(!this.gek()){C.a.si(this.a,0)
return}var z=this.a
C.a.dd(z,0,C.a.at(z,C.a.h5(z,new Y.oU()))+1)},
j:function(a){return this.dc()},
hj:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
z=this.a
y=C.a.ae(z,[],new Y.oQ())
C.a.aG(z,"retainWhere")
C.a.e5(z,new Y.oR(y),!1)
x=a&&this.gek()?C.a.at(z,C.a.h5(z,new Y.oS()))+1:z.length
if(x<1)return""
for(w=-1,v=!0,u=!1,t=!1,s=0,r="";s<x;++s){q=s===0
if(!q){p=s-1
o=this.ei(p,s)
if(s>=z.length)return H.e(z,s)
if(z[s].gcW()||this.kv(s,p)){if(p<0||p>=z.length)return H.e(z,p)
t=!z[p].gcW()}else t=!1
if(s>=z.length)return H.e(z,s)
z[s].scW(t)
n=s-w
if(n<3)if(!u){if(s>=z.length)return H.e(z,s)
z[s].ghN()
if(p<0||p>=z.length)return H.e(z,p)
if(!z[p].gjP()){if(s>=z.length)return H.e(z,s)
if(!z[s].gct())if(this.cQ(s,p)||o)if(!(t&&n>1)){if(t){if(p>=z.length)return H.e(z,p)
n=z[p].gcW()}else n=!1
n=n||this.kT(s)>4}else n=!0
else n=!0
else n=!0}else n=!0
v=n}else v=!0
else v=!0
if(v){if(p<0||p>=z.length)return H.e(z,p)
if(z[p].gct()){r+=" "
p=r}else{r+=". "
p=r}if(t){if(s>=z.length)return H.e(z,s)
n=!z[s].gct()}else n=!1
r=n?r+"But ":p
u=!1}else if(t){r+=S.hC([" but "," but ",", but "])
u=!this.hA(s,s+1)&&!0}else{r+=S.hC([" and "," and ",", and "])
u=!0}}m=this.dz(s)
p=!v
if(p){n=s-1
if(this.cQ(s,n))if(J.dT(this.dz(n),"<subject> "))if(J.dT(m,"<subject> "))m=H.jy(m,"<subject> ","",0)}l=J.o(m,"<action>",this.dz(s))
if(this.iZ(s,s-1))n=!(this.am(s).gF()===C.k&&this.U(s).gF()===C.k)
else n=!1
if(n)l=J.o(J.o(J.o(J.o(l,"<object-owner's> <object>",this.am(s).gF().b),"<object-ownerPronoun's> <object>",this.am(s).gF().b),"<object>",this.am(s).gF().b),"<object's>",this.am(s).gF().c)
if(this.cQ(s,s-1))l=J.o(J.o(J.o(J.o(l,"<owner's> <subject>",this.U(s).gF().a),"<ownerPronoun's> <subject>",this.U(s).gF().a),"<subject>",this.U(s).gF().a),"<subject's>",this.U(s).gF().c)
n=s-1
if(this.am(n)!=null&&this.U(s)!=null&&this.U(n)!=null&&J.f(J.R(this.am(n)),J.R(this.U(s)))&&this.U(n).gF()!==this.U(s).gF())l=J.o(J.o(J.o(J.o(l,"<owner's> <subject>",this.U(s).gF().a),"<ownerPronoun's> <subject>",this.U(s).gF().a),"<subject>",this.U(s).gF().a),"<subject's>",this.U(s).gF().c)
if(this.U(n)!=null)if(this.am(s)!=null){k=J.R(this.U(n))
j=J.R(this.am(s))
n=(k==null?j==null:k===j)&&this.U(n).gF()!==this.U(s).gF()}else n=!1
else n=!1
if(n)l=J.o(J.o(J.o(J.o(l,"<object-owner's> <object>",this.am(s).gF().a),"<object-ownerPronoun's> <object>",this.am(s).gF().a),"<object>",this.am(s).gF().b),"<object's>",this.am(s).gF().c)
if(s>=z.length)return H.e(z,s)
n=z[s].gai()
if(s>=z.length)return H.e(z,s)
k=z[s].gaw()
if(s>=z.length)return H.e(z,s)
j=z[s].gkw()
if(s>=z.length)return H.e(z,s)
i=z[s].gku()
if(n!=null){h=n.gS()?J.o(J.o(l,"<subject>","you"),"<subject's>","your"):l
g=n.gF()===C.I||n.gF()===C.al
f=J.ao(h)
h=J.bF(g?J.o(J.o(J.o(J.o(J.o(f.bV(h,"<s>",""),"<es>",""),"<ies>","y"),"<does>","do"),"<is>","are"),"<has>","have"):J.o(J.o(J.o(J.o(J.o(f.bV(h,"<s>","s"),"<es>","es"),"<ies>","ies"),"<does>","does"),"<is>","is"),"<has>","has"),"<subject>","<subjectNoun>")
f=n.gF()
h=J.bF(Y.bV(H.c5(h,"<subject>",f.a),"<subjectNoun>",n,j),"<subjectNoun>",n.gn(n))
g=n.gF()
h=H.c5(h,"<subjectPronoun>",g.a)
h=J.bF(Y.bV(J.c7(l,P.G("<subject>.+<subject's>",!0,!1))===!0?J.o(h,"<subject's>",n.gF().c):h,"<subject's>",n,j),"<subject's>",H.d(n.gn(n))+"'s")
g=n.gF()
h=J.o(H.c5(h,"<subject's>",g.c),"<subjectPronoun's>",n.gF().c)}else h=l
if(k!=null){h=k.gS()?J.o(J.o(h,"<object>","you"),"<object's>","your"):J.o(Y.bV(h,"<object>",k,i),"<object>",k.gn(k))
h=J.o(h,"<objectPronoun>",k.gF().b)
h=J.bF(Y.bV(J.c7(l,P.G("<object>.+<object's>",!0,!1))===!0?J.o(h,"<object's>",k.gF().c):h,"<object's>",k,i),"<object's>",H.d(k.gn(k))+"'s")
n=k.gF()
h=J.o(H.c5(h,"<object's>",n.c),"<objectPronoun's>",k.gF().c)}m=S.dc(Y.hU(i,Y.hU(j,h,l,"<owner>","<owner's>","<ownerPronoun>","<ownerPronoun's>"),l,"<object-owner>","<object-owner's>","<object-ownerPronoun>","<object-ownerPronoun's>"))
r+=H.d((!p||q)&&!t?Y.oO(m):m)
if(v)w=s
if(s>=z.length)return H.e(z,s)
if(z[s].gct())u=!0}q=x-1
if(q>>>0!==q||q>=z.length)return H.e(z,q)
z=!z[q].gct()?r+".":r
return H.vt(z.charCodeAt(0)==0?z:z,$.$get$hT(),new Y.oT(),null)},
dc:function(){return this.hj(!1)},
q:{
oO:function(a){var z,y
z=J.N(a)
if(z.E(a,"\n\n")!==!0)a=z.kY(a)
z=J.N(a)
if(z.gC(a)===!0)return a
y=J.k4(z.h(a,0))
if(J.f(z.gi(a),1))return y
else return y+z.bk(a,1)},
hU:function(a,b,c,d,e,f,g){if(a!=null){b=a.gS()?J.o(J.o(b,d,"you"),e,"your"):J.o(Y.bV(b,d,a,null),d,a.gn(a))
b=J.o(b,f,a.gF().a)
b=J.o(H.c5(J.bF(Y.bV(J.c7(c,P.G(d+".+"+e,!0,!1))===!0?J.o(b,e,a.gF().c):b,e,a,null),e,H.d(a.gn(a))+"'s"),e,a.gF().c),g,a.gF().c)}else b=J.o(J.o(J.o(J.o(b,d,""),e,""),f,""),g,"")
return b},
bV:function(a,b,c,d){var z
if(d!=null){z=J.N(a)
z=z.at(a,"<owner's> "+b)!==-1||z.at(a,"<ownerPronoun's> "+b)!==-1||z.at(a,"<object-owner's> "+b)!==-1||z.at(a,"<object-ownerPronoun's> "+b)!==-1}else z=!1
if(z)return a
if(!c.gd6()){c.gcU()
a=J.bF(a,b,"the "+b)}return a}}},oP:{"^":"a:0;",
$1:function(a){return J.f(a.gac(),"\n\n")}},oU:{"^":"a:0;",
$1:function(a){return J.f(a.gac(),"\n\n")}},oQ:{"^":"a:41;",
$2:function(a,b){var z,y
z=J.N(a)
y=z.gZ(a)?z.gB(a):null
if(y!=null)y.gkh()
z.l(a,b)
return a}},oR:{"^":"a:42;a",
$1:function(a){return J.c7(this.a,a)}},oS:{"^":"a:0;",
$1:function(a){return J.f(a.gac(),"\n\n")}},oT:{"^":"a:52;",
$1:function(a){return H.d(a.h(0,1))+H.d(a.h(0,2))+H.d(a.h(0,3))}},bN:{"^":"nk;d6:a<,n:b>,c,cU:d<,ab:e<,en:f<,S:r<,F:x<",
gA:function(a){return H.ak(this)},
gbB:function(){return!0}},nk:{"^":"b+e4;"},e4:{"^":"b;",
gcj:function(){if(this.gbB()){this.gen()
var z=!0}else z=!1
return z},
bT:function(a){var z,y
z=this.gab()
y=$.$get$bA()
if(J.f(z,y)||J.f(a.gab(),y))return!1
return!J.f(this.gab(),a.gab())},
aN:function(a,b,c,d,e,f,g,h){J.aw(a,b,c,d,e,f,g,h,H.c4(this,"$isbN"))},
bF:function(a,b,c){return this.aN(a,b,!1,!1,!1,c,null,!1)},
aM:function(a,b){return this.aN(a,b,!1,!1,!1,null,null,!1)},
kL:function(a,b,c,d){return this.aN(a,b,c,!1,!1,null,null,d)},
de:function(a,b,c,d){return this.aN(a,b,c,!1,!1,d,null,!1)},
eD:function(a,b,c){return this.aN(a,b,!1,!1,!1,null,null,c)},
bE:function(a,b,c){return this.aN(a,b,!1,!1,c,null,null,!1)},
bG:function(a,b,c,d){return this.aN(a,b,!1,!1,!1,c,null,d)},
kM:function(a,b,c,d){return this.aN(a,b,!1,c,d,null,null,!1)},
kK:function(a,b,c){return this.aN(a,b,!1,c,!1,null,null,!1)},
kN:function(a,b,c,d){return this.aN(a,b,!1,!1,c,d,null,!1)}},cq:{"^":"b;a,b,c,d",
j:function(a){return this.a}}}],["","",,L,{"^":"",i_:{"^":"b;"},u5:{"^":"a:0;",
$1:function(a){a.gc8().b=0
return 0}},uC:{"^":"a:0;",
$1:function(a){a.gc8().b=1
return 1}},ug:{"^":"a:0;",
$1:function(a){a.gc8().b=2
return 2}},pR:{"^":"i_;A:a>",
af:function(a){var z=new L.i0(null,null)
z.a=this
a.$1(z)
return z.I()},
p:function(a,b){var z,y
if(b==null)return!1
if(!(b instanceof L.i_))return!1
z=this.a
y=b.a
return z==null?y==null:z===y},
gu:function(a){return Y.aP(Y.B(0,J.E(this.a)))},
j:function(a){return"Team {id="+J.A(this.a)+",\n}"},
q:{
eA:function(a){var z=new L.i0(null,null)
a.$1(z)
return z.I()}}},i0:{"^":"b;a,b",
gA:function(a){return this.gc8().b},
gc8:function(){var z=this.a
if(z!=null){this.b=z.a
this.a=null}return this},
I:function(){var z,y
z=this.a
if(z==null){y=this.gc8().b
z=new L.pR(y)
if(y==null)H.u(P.aa("id"))}this.a=z
return z}}}],["","",,X,{"^":"",
j_:function(a,b){return new P.dz(function(){var z=a,y=b
var x=0,w=1,v,u,t,s,r,q
return function $async$j_(c,d){if(c===1){v=d
x=w}while(true)switch(x){case 0:u=z.a
t=new J.bi(u,u.length,0,null,[H.p(u,0)])
u=y.a
s=new J.bi(u,u.length,0,null,[H.p(u,0)])
case 2:if(!!0){x=3
break}r=t.m()
q=s.m()
x=r?4:5
break
case 4:x=6
return t.d
case 6:case 5:x=q?7:8
break
case 7:x=9
return s.d
case 9:case 8:if(!r&&!q){x=3
break}x=2
break
case 3:return P.dv()
case 1:return P.dw(v)}}})}}],["","",,A,{"^":"",ai:{"^":"b;ja:a<,b,c,d,e,G:f<",
a0:function(a){return this.a.aX(0,new A.pH(a))},
aA:function(a,b){var z,y,x
z=this.a0(a)
y=z.af(b)
x=this.a
x.D(0,z)
x.l(0,y)},
hr:function(a,b){var z,y,x
z=this.fn(a)
if(z==null)return
y=this.e
if(z!==(z|0)||z>=y.length)return H.e(y,z)
x=y[z].af(b)
if(z!==(z|0)||z>=y.length)return H.e(y,z)
y[z]=x},
eg:function(){var z=this.f
if(typeof z!=="number")return z.J()
this.f=z+1},
gu:function(a){return X.jg(X.aO(this.a),X.aO(this.c),X.aO(this.e),this.f)},
p:function(a,b){var z
if(b==null)return!1
z=J.l(b)
return!!z.$isai&&this.gu(this)===z.gu(b)},
j:function(a){var z,y
z=this.a
y=z.fA()
y.L(0,z)
return"World<"+P.bm(y,"{","}")+">"},
ez:function(a){C.a.l(this.e,a)},
co:function(a){var z=this.e
while(!0){if(!(z.length!==0&&!J.f(J.K(J.c9(C.a.gB(z))),a)))break
C.a.hk(z)}if(z.length===0)throw H.c(P.X("Tried to pop situations until "+a+" but none was found in stack."))},
fn:function(a){var z,y,x
y=this.e
x=0
while(!0){if(!(x<y.length)){z=null
break}if(J.f(J.R(y[x]),a)){z=x
break}++x}return z},
hy:function(a){var z,y
z=this.fn(a)
if(z==null)return
y=this.e
if(z!==(z|0)||z>=y.length)return H.e(y,z)
return y[z]},
ia:function(a){var z
this.a.L(0,a.a)
z=a.c
this.c.L(0,new H.bL(z,new A.pF(),[H.p(z,0),null]))
this.b.L(0,a.b)
z=a.d
this.d.L(0,new H.bL(z,new A.pG(),[H.p(z,0),null]))
C.a.L(this.e,a.e)
this.f=a.f},
q:{
il:function(a){var z,y
z=P.H(null,null,null,R.S)
y=P.H(null,null,null,O.cR)
y=new A.ai(z,P.H(null,null,null,U.ea),y,P.H(null,null,null,null),[],null)
y.ia(a)
return y}}},pF:{"^":"a:0;",
$1:function(a){var z,y,x,w,v,u,t
z=a.gG()
y=a.gfQ()
x=a.gcc()
w=a.ghi()
v=P.t
u=P.aV(a.gkk(),v)
t=R.ka(a.r,P.T)
return new O.cR(x,y,z,w,P.H(null,null,null,v),u,t)}},pG:{"^":"a:0;",
$1:function(a){var z=a.gj9()
return new K.n6(P.aV(a.a,K.n7),z,a.c)}},pH:{"^":"a:0;a",
$1:function(a){return J.f(J.R(a),this.a)}}}],["","",,S,{"^":"",
fG:function(a,b,c){var z=new S.im(null,0,null,null)
new S.u7(a,b,c).$1(z)
return z.I()},
fF:{"^":"op;",
gn:function(a){return"CounterAttackSituation"},
gbs:function(){return[$.$get$fd()]},
gaF:function(){return[$.$get$j6()]},
bh:function(a,b){if(a===0)return b.a0(this.b)
return},
bi:function(a,b){return new H.a3(a,new S.kN(this),[H.p(a,0)])}},
op:{"^":"br+ba;"},
u7:{"^":"a:0;a,b,c",
$1:function(a){var z=this.a
z=z.gA(z)
a.gb0()
a.b=z
z=J.R(this.b)
a.gb0()
a.c=z
a.gb0()
a.a=this.c
return a}},
kN:{"^":"a:0;a",
$1:function(a){var z,y
z=J.q(a)
y=this.a
return J.f(z.gA(a),y.b)||J.f(z.gA(a),y.c)}},
kM:{"^":"b;G:a@"},
pJ:{"^":"fF;G:a<,b,c",
af:function(a){var z=new S.im(null,0,null,null)
z.d=this
a.$1(z)
return z.I()},
p:function(a,b){var z,y
if(b==null)return!1
if(!(b instanceof S.fF))return!1
if(this.a===b.a){z=this.b
y=b.b
z=(z==null?y==null:z===y)&&J.f(this.c,b.c)}else z=!1
return z},
gu:function(a){return Y.aP(Y.B(Y.B(Y.B(0,this.a&0x1FFFFFFF),J.E(this.b)),J.E(this.c)))},
j:function(a){return"CounterAttackSituation {time="+C.f.j(this.a)+",\ncounterAttacker="+J.A(this.b)+",\ntarget="+H.d(J.A(this.c))+",\n}"}},
im:{"^":"kM;d,a,b,c",
gG:function(){this.gb0()
return this.a},
sG:function(a){this.gb0()
this.a=a},
gb0:function(){var z=this.d
if(z!=null){this.a=z.a
this.b=this.d.b
this.c=this.d.c
this.d=null}return this},
I:function(){var z,y,x,w
z=this.d
if(z==null){this.gb0()
y=this.a
this.gb0()
x=this.b
this.gb0()
w=this.c
z=new S.pJ(y,x,w)
if(x==null)H.u(P.aa("counterAttacker"))
if(w==null)H.u(P.aa("target"))}this.d=z
return z}}}],["","",,G,{"^":"",u8:{"^":"a:7;",
$3:function(a,b,c){return a.aW(C.h)}},ub:{"^":"a:4;",
$3:function(a,b,c){return b.gK()===C.c?0.7:0.9}},u9:{"^":"a:6;",
$4:function(a,b,c,d){var z
a.bF(d,"<subject> swing<s> back at <object>",b)
c.ez(S.aW(M.hN(a,b,0)))
z=S.aW(L.hL(a,b,0))
C.a.l(c.e,z)
return H.d(a.gn(a))+" swings back at "+H.d(J.K(b))}},ua:{"^":"a:6;",
$4:function(a,b,c,d){var z
a.aM(d,"<subject> tr<ies> to swing back")
a.toString
z=J.af(d)
z.c9(d,"<subject> {go<es> wide|miss<es>}",!0,!1,!1,null,null,!1,a)
if(a.gK()===C.c){c.aA(a.r,new G.rZ())
z.c9(d,"<subject> lose<s> balance because of that",!1,!0,!0,null,null,!1,a)}return H.d(a.ch)+" fails to swing back at "+H.d(J.K(b))}},rZ:{"^":"a:0;",
$1:function(a){a.sK(C.j)
return a}}}],["","",,X,{"^":"",
js:function(a,b){var z
switch($.$get$iT().bD(3)){case 0:b.kM(a,"<subject> collapse<s>, dead",!0,!0)
break
case 1:b.bE(a,"<subject> fall<s> backward",!0)
b.toString
z=J.af(a)
z.c9(a,"<subject> twist<s>",!1,!1,!0,null,null,!1,b)
z.c9(a,"<subject> hit<s> the ground face down",!1,!0,!0,null,null,!1,b)
break
case 2:b.bE(a,"<subject> drop<s> to <subject's> knees",!0)
b.toString
J.aw(a,"<subject> keel<s> over",!1,!1,!0,null,null,!1,b)
break}a.eb()}}],["","",,X,{"^":"",tZ:{"^":"a:8;",
$3:function(a,b,c){return a.aW(C.h)}},u1:{"^":"a:4;",
$3:function(a,b,c){if(a.gS())return 1
return 0.5-(a.gK()===C.c?0:0.2)}},u_:{"^":"a:5;",
$4:function(a,b,c,d){if(a.gS())a.aM(d,"<subject> {step<s>|take<s> a step} back")
a.eD(d,"<subject> {parr<ies> it|deflect<s> it|meet<s> it with <subject's> "+a.gaj().r+"|fend<s> it off}",!0)
if(a.e!==C.c){c.aA(a.r,new X.rW())
if(a.z)J.aw(d,"<subject> regain<s> balance",!1,!1,!1,null,null,!1,a)}c.co("FightSituation")
return H.d(a.ch)+" steps back and parries "+H.d(J.K(b))}},rW:{"^":"a:0;",
$1:function(a){a.sK(C.c)
return a}},u0:{"^":"a:20;",
$4:function(a,b,c,d){a.aM(d,"<subject> tr<ies> to {parry|deflect it|meet it with <subject's> "+a.gaj().r+"|fend it off}")
if(a.e===C.j)J.aw(d,"<subject> <is> out of balance",!0,!1,!1,null,null,!1,a)
else S.cr(new X.rU(a,d),new X.rV(a,b,d),null,null)
return H.d(a.ch)+" fails to dodge "+H.d(J.K(b))}},rU:{"^":"a:1;a,b",
$0:function(){J.aw(this.b,"<subject> {fail<s>|<does>n't succeed}",!0,!1,!1,null,null,!1,this.a)
return}},rV:{"^":"a:1;a,b,c",
$0:function(){return this.b.de(this.c,"<subject> <is> too quick for <object>",!0,this.a)}}}],["","",,F,{"^":"",ul:{"^":"a:8;",
$3:function(a,b,c){return a.gK()!==C.n}},uo:{"^":"a:4;",
$3:function(a,b,c){var z=a.gK()===C.c?0:0.2
if(a.gS())return 0.7-z
return 0.4-z}},um:{"^":"a:6;",
$4:function(a,b,c,d){var z
a.bG(d,"<subject> {dodge<s>|sidestep<s>} it",b,!0)
if(b.gK()===C.c){b.kK(d,"<subject> lose<s> balance because of that",!0)
c.aA(b.r,new F.rJ())}c.co("FightSituation")
if(a.gS())J.cM(d,"this opens an opportunity for a counter attack")
z=S.aW(S.fG(a,b,0))
C.a.l(c.e,z)
return H.d(a.gn(a))+" dodges "+H.d(b.gn(b))}},rJ:{"^":"a:0;",
$1:function(a){a.sK(C.j)
return C.j}},un:{"^":"a:6;",
$4:function(a,b,c,d){a.aM(d,"<subject> tr<ies> to {dodge|sidestep}")
if(a.gK()===C.j)J.aw(d,"<subject> <is> out of balance",!0,!1,!1,null,null,!1,a)
else S.cr(new F.rH(a,d),new F.rI(a,b,d),null,null)
return H.d(a.ch)+" fails to dodge "+H.d(J.K(b))}},rH:{"^":"a:1;a,b",
$0:function(){J.aw(this.b,"<subject> {can't|fail<s>|<does>n't succeed}",!0,!1,!1,null,null,!1,this.a)
return}},rI:{"^":"a:1;a,b,c",
$0:function(){return this.b.de(this.c,"<subject> <is> too quick for <object>",!0,this.a)}}}],["","",,U,{"^":"",fZ:{"^":"oq;",
gaF:function(){return H.r([$.$get$jk(),$.$get$jx(),$.$get$ju()],[Q.fr])},
gbs:function(){return H.r([$.$get$jr(),$.$get$jv()],[Q.dV])},
gn:function(a){return"FightSituation"},
bh:function(a,b){var z,y,x
z=X.j_(this.c,this.a)
y=H.x(z,"F",0)
x=P.a6(new H.a3(z,new U.lw(b),[y]),!1,y)
return b.a0(x[C.f.hz(a,x.length)])},
bi:function(a,b){return new H.a3(a,new U.lx(this),[H.p(a,0)])},
d7:function(a,b){var z,y
z=this.d
y=this.b.a
if(y.N(0,z))y.h(0,z).$2(a,b)},
eY:function(a){var z,y
z=new U.ly(a)
y=this.c
if(z.$1(y)===!0)if(z.$1(this.a)===!0){z=y.a
z=(z&&C.a).ao(z,new U.lA(a))}else z=!1
else z=!1
return z}},oq:{"^":"br+ba;"},lw:{"^":"a:0;a",
$1:function(a){return this.a.a0(a).gcj()}},lx:{"^":"a:10;a",
$1:function(a){var z,y,x
if(a.gcj()){z=this.a
y=a.gA(a)
x=z.c.a
if(!(x&&C.a).E(x,y)){y=a.gA(a)
z=z.a.a
y=(z&&C.a).E(z,y)
z=y}else z=!0}else z=!1
return z}},ly:{"^":"a:50;a",
$1:function(a){var z=a.a
return(z&&C.a).ao(z,new U.lz(this.a))}},lz:{"^":"a:0;a",
$1:function(a){return this.a.a0(a).gcj()}},lA:{"^":"a:51;a",
$1:function(a){var z=this.a.a0(a)
return z.gS()&&z.gcj()}},lv:{"^":"b;G:a@"},pK:{"^":"fZ;a,b,c,G:d<",
af:function(a){var z=new A.cm(null,null,[P.t,{func:1,v:true,args:[A.ai,Y.ah]}])
z.bl()
z.cq(0,C.v)
z=new U.io(null,0,null,null,z)
z.e=this
a.$1(z)
return z.I()},
p:function(a,b){if(b==null)return!1
if(!(b instanceof U.fZ))return!1
return J.f(this.a,b.a)&&J.f(this.b,b.b)&&J.f(this.c,b.c)&&this.d===b.d},
gu:function(a){return Y.aP(Y.B(Y.B(Y.B(Y.B(0,J.E(this.a)),J.E(this.b)),J.E(this.c)),this.d&0x1FFFFFFF))},
j:function(a){return"FightSituation {enemyTeamIds="+J.A(this.a)+",\nevents="+J.A(this.b)+",\nplayerTeamIds="+J.A(this.c)+",\ntime="+C.f.j(this.d)+",\n}"}},io:{"^":"lv;e,a,b,c,d",
geh:function(){this.gaY()
var z=this.d
if(z==null){z=new A.cm(null,null,[P.t,{func:1,v:true,args:[A.ai,Y.ah]}])
z.bl()
z.cq(0,C.v)
this.d=z}return z},
gG:function(){this.gaY()
return this.a},
sG:function(a){this.gaY()
this.a=a},
gaY:function(){var z,y
z=this.e
if(z!=null){this.c=z.a
z=this.e.b
if(!(z==null)){y=new A.cm(null,null,[H.p(z,0),H.p(z,1)])
y.bl()
y.cq(0,z)
z=y}this.d=z
this.b=this.e.c
this.a=this.e.d
this.e=null}return this},
I:function(){var z,y,x,w
z=this.e
if(z==null){this.gaY()
y=this.c
x=this.geh()
x=x==null?x:x.I()
this.gaY()
w=this.b
this.gaY()
z=new U.pK(y,x,w,this.a)
if(y==null)H.u(P.aa("enemyTeamIds"))
if(x==null)H.u(P.aa("events"))
if(w==null)H.u(P.aa("playerTeamIds"))}this.e=z
return z}}}],["","",,Y,{"^":"",up:{"^":"a:7;",
$3:function(a,b,c){return a.gK()===C.c}},ut:{"^":"a:4;",
$3:function(a,b,c){var z=a.gK()===C.c?0:0.2
if(a.gS())return 0.7-z
return 0.5-z}},uq:{"^":"a:5;",
$4:function(a,b,c,d){if(b.gK()===C.c||b.gK()===C.j){S.cr(new Y.rN(a,b,d),new Y.rO(a,b,d),null,null)
c.aA(b.gA(b),new Y.rP())}else a.bF(d,"<subject> kick<s> <object> on the ground",b)
return H.d(J.K(a))+" kicks "+H.d(b.gn(b))}},rN:{"^":"a:1;a,b,c",
$0:function(){var z,y
z=this.c
y=this.b
this.a.bF(z,"<subject> kick<s> <object>",y)
if(S.nN(0.5))y.aM(z,"<subject> flail<s> <subject's> arms")
y.bE(z,"<subject> fall<s>{| to the ground}",!0)}},rO:{"^":"a:1;a,b,c",
$0:function(){var z,y
z=this.c
y=this.b
this.a.bG(z,"<subject> kick<s> <object> off <object's> feet",y,!0)
if(y.gS())y.bE(z,"<subject> land<s> on the ground",!0)}},rP:{"^":"a:0;",
$1:function(a){a.sK(C.n)
return a}},us:{"^":"a:20;",
$4:function(a,b,c,d){var z,y
a.bF(d,"<subject> kick<s> <object>",b)
if(b.gK()===C.c){if(a.gS())b.kN(d,"<subject> lose<s> <object>",!0,$.$get$f1())
c.aA(b.gA(b),new Y.rK())}if(c.a0(b.gA(b)).gK()===C.j){z=new U.ip(null,0,null,null)
new Y.rL(a,b).$1(z)
y=S.aW(z.I())
C.a.l(c.e,y)}return H.d(a.gn(a))+" kicks "+H.d(b.gn(b))+" off balance"}},rK:{"^":"a:0;",
$1:function(a){a.sK(C.j)
return a}},rL:{"^":"a:0;a,b",
$1:function(a){var z=this.b
z=z.gA(z)
a.gbp()
a.b=z
z=this.a
z=z.gA(z)
a.gbp()
a.c=z
return a}}}],["","",,U,{"^":"",hv:{"^":"or;",
gn:function(a){return"OffBalanceOpportunitySituation"},
gbs:function(){return[$.$get$fd()]},
gaF:function(){return[$.$get$fc()]},
bh:function(a,b){var z,y,x,w,v
if(a>0)return
z=b.a0(this.b)
y=b.a
x=H.p(y,0)
w=P.a6(new H.a3(y,new U.nm(this,z),[x]),!0,x)
if(w.length!==0){v=C.a.gO(w)
if($.$get$fc().b.$3(v,z,b)===!0)return v}return},
bi:function(a,b){return new H.a3(a,new U.nn(b.a0(this.b)),[H.p(a,0)])}},or:{"^":"br+ba;"},nm:{"^":"a:10;a,b",
$1:function(a){var z,y
if(a.gcj())if(a.bT(this.b)){z=a.gA(a)
y=this.a.c
y=z==null?y!=null:z!==y
z=y}else z=!1
else z=!1
return z}},nn:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.f(a,z)||a.bT(z)}},nl:{"^":"b;G:a@"},pL:{"^":"hv;G:a<,b,c",
af:function(a){var z=new U.ip(null,0,null,null)
z.d=this
a.$1(z)
return z.I()},
p:function(a,b){var z,y
if(b==null)return!1
if(!(b instanceof U.hv))return!1
if(this.a===b.a){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1
return z},
gu:function(a){return Y.aP(Y.B(Y.B(Y.B(0,this.a&0x1FFFFFFF),J.E(this.b)),J.E(this.c)))},
j:function(a){return"OffBalanceOpportunitySituation {time="+C.f.j(this.a)+",\nactorId="+J.A(this.b)+",\nculpritId="+J.A(this.c)+",\n}"}},ip:{"^":"nl;d,a,b,c",
gG:function(){this.gbp()
return this.a},
sG:function(a){this.gbp()
this.a=a},
gbp:function(){var z=this.d
if(z!=null){this.a=z.a
this.b=this.d.b
this.c=this.d.c
this.d=null}return this},
I:function(){var z,y,x
z=this.d
if(z==null){this.gbp()
y=this.a
this.gbp()
x=this.b
this.gbp()
z=new U.pL(y,x,this.c)
if(x==null)H.u(P.aa("actorId"))}this.d=z
return z}}}],["","",,A,{"^":"",uu:{"^":"a:8;",
$3:function(a,b,c){return a.gK()===C.c&&b.gK()===C.j&&a.aW(C.h)}},ux:{"^":"a:4;",
$3:function(a,b,c){if(a.gS())return 0.6
return 0.5}},uv:{"^":"a:5;",
$4:function(a,b,c,d){var z=J.q(b)
c.aA(z.gA(b),new A.rM())
if(c.a0(z.gA(b)).gbB()){a.bG(d,"<subject> thrust<s> {|<subject's> "+a.gaj().r+"} deep into <object's> {shoulder|hip|thigh}",b,!0)
b.bE(d,"<subject> {scream|yell|grunt}<s> in pain",!0)}else{a.bG(d,"<subject> {stab<s>|run<s> <subject's> "+a.gaj().r+" through} <object>",b,!0)
X.js(d,b)}return H.d(J.K(a))+" stabs "+H.d(z.gn(b))}},rM:{"^":"a:0;",
$1:function(a){a.sas(a.gas()-1)
return a}},uw:{"^":"a:6;",
$4:function(a,b,c,d){a.bF(d,"<subject> tr<ies> to stab <object>",b)
a.toString
J.aw(d,"<subject> {go<es> wide|fail<s>|miss<es>}",!0,!1,!1,null,null,!1,a)
return H.d(a.gn(a))+" fails to stab "+H.d(J.K(b))}}}],["","",,V,{"^":"",
np:function(a,b,c){var z=new V.iq(null,0,null,null)
new V.tG(a,b,c).$1(z)
return z.I()},
hw:{"^":"os;",
gaF:function(){return[$.$get$jm(),$.$get$jt()]},
gn:function(a){return"OnGroundDefenseSituation"},
bh:function(a,b){if(a===0)return b.a0(this.b)
return},
bi:function(a,b){return new H.a3(a,new V.nq(this),[H.p(a,0)])}},
os:{"^":"br+ba;"},
tG:{"^":"a:0;a,b,c",
$1:function(a){var z=this.a
z=z.gA(z)
a.gb1()
a.b=z
z=J.R(this.b)
a.gb1()
a.c=z
a.gb1()
a.a=this.c
return a}},
nq:{"^":"a:0;a",
$1:function(a){var z,y
z=J.q(a)
y=this.a
return J.f(z.gA(a),y.a)||J.f(z.gA(a),y.b)}},
no:{"^":"b;G:a@"},
pM:{"^":"hw;a,b,G:c<",
af:function(a){var z=new V.iq(null,0,null,null)
z.d=this
a.$1(z)
return z.I()},
p:function(a,b){var z,y
if(b==null)return!1
if(!(b instanceof V.hw))return!1
z=this.a
y=b.a
return(z==null?y==null:z===y)&&J.f(this.b,b.b)&&this.c===b.c},
gu:function(a){return Y.aP(Y.B(Y.B(Y.B(0,J.E(this.a)),J.E(this.b)),this.c&0x1FFFFFFF))},
j:function(a){return"OnGroundDefenseSituation {attacker="+J.A(this.a)+",\ntargetOnGround="+H.d(J.A(this.b))+",\ntime="+C.f.j(this.c)+",\n}"}},
iq:{"^":"no;d,a,b,c",
gG:function(){this.gb1()
return this.a},
sG:function(a){this.gb1()
this.a=a},
gb1:function(){var z=this.d
if(z!=null){this.b=z.a
this.c=this.d.b
this.a=this.d.c
this.d=null}return this},
I:function(){var z,y,x
z=this.d
if(z==null){this.gb1()
y=this.b
this.gb1()
x=this.c
this.gb1()
z=new V.pM(y,x,this.a)
if(y==null)H.u(P.aa("attacker"))
if(x==null)H.u(P.aa("targetOnGround"))}this.d=z
return z}}}],["","",,K,{"^":"",tM:{"^":"a:8;",
$3:function(a,b,c){return a.aW(C.h)}},tP:{"^":"a:4;",
$3:function(a,b,c){if(a.gS())return 0.6
return 0.3}},tN:{"^":"a:5;",
$4:function(a,b,c,d){a.eD(d,"<subject> {parr<ies> it|stop<s> it with <subject's> "+a.gaj().r+"}",!0)
c.co("FightSituation")
return H.d(a.ch)+" parries "+H.d(J.K(b))}},tO:{"^":"a:6;",
$4:function(a,b,c,d){a.aM(d,"<subject> tr<ies> to {parry|deflect it|stop it{| with <subject's> "+a.gaj().r+"}}")
S.cr(new K.rF(a,d),new K.rG(a,b,d),null,null)
return H.d(a.ch)+" fails to parry "+H.d(J.K(b))}},rF:{"^":"a:1;a,b",
$0:function(){var z=this.a
z.toString
J.aw(this.b,"<subject> {fail<s>|<does>n't succeed}",!0,!1,!1,null,null,!1,z)
return}},rG:{"^":"a:1;a,b,c",
$0:function(){return this.b.de(this.c,"<subject> <is> too quick for <object>",!0,this.a)}}}],["","",,Y,{"^":"",tH:{"^":"a:8;",
$3:function(a,b,c){return!0}},tL:{"^":"a:4;",
$3:function(a,b,c){if(a.gS())return 1
return 0.5}},tI:{"^":"a:5;",
$4:function(a,b,c,d){a.kL(d,"<subject> <is> able to roll out of the way",!0,!0)
if(a.gS()){c.aA(a.gA(a),new Y.rE())
J.aw(d,"<subject> jump<s> up on <subject's> feet",!1,!1,!1,null,null,!0,a)}c.co("FightSituation")
return H.d(a.gn(a))+" rolls out of the way of "+H.d(J.K(b))+"'s strike"}},rE:{"^":"a:0;",
$1:function(a){a.sK(C.c)
return a}},tJ:{"^":"a:6;",
$4:function(a,b,c,d){a.aM(d,"<subject> tr<ies> to roll out of the way")
a.toString
J.aw(d,"<subject> can't",!0,!1,!1,null,null,!1,a)
return H.d(a.gn(a))+" fails to roll out of the way"}}}],["","",,T,{"^":"",tD:{"^":"a:7;",
$3:function(a,b,c){return b.gK()===C.n&&a.aW(C.h)}},tF:{"^":"a:4;",
$3:function(a,b,c){return 1}},tE:{"^":"a:5;",
$4:function(a,b,c,d){var z
a.bF(d,"<subject> strike<s> down {with <subject's> "+a.gaj().r+" |}at <object>",b)
c.ez(S.aW(D.pf(a,b,0)))
z=S.aW(V.np(a,b,0))
C.a.l(c.e,z)
return H.d(a.ch)+" strikes down at "+H.d(J.K(b))+" on the ground"}},tR:{"^":"a:7;",
$3:function(a,b,c){return b.gK()===C.n&&a.aW(C.h)}},tT:{"^":"a:4;",
$3:function(a,b,c){return 1}},tS:{"^":"a:5;",
$4:function(a,b,c,d){var z,y
z=J.q(b)
c.aA(z.gA(b),new T.rR())
y=J.af(d)
y.jf(d,"<subject> {cuts|slashes|slits} <object's> {throat|neck|side}",b,a.gaj())
b.bE(d,"<subject> die<s>",!0)
y.aR(d,"\n\n",!0)
return H.d(a.gn(a))+" slains "+H.d(z.gn(b))+" on the ground"}},rR:{"^":"a:0;",
$1:function(a){a.sas(0)
return a}}}],["","",,Q,{"^":"",uy:{"^":"a:13;",
$2:function(a,b){return a.gK()===C.n}},uz:{"^":"a:4;",
$3:function(a,b,c){a.aM(c,"<subject> stand<s> up")
b.aA(a.gA(a),new Q.rQ())
return H.d(a.gn(a))+" stands up"}},rQ:{"^":"a:0;",
$1:function(a){a.sK(C.c)
return C.c}},uA:{"^":"a:4;",
$3:function(a,b,c){}}}],["","",,D,{"^":"",
pf:function(a,b,c){var z=new D.iu(null,0,null,null)
new D.tQ(a,b,c).$1(z)
return z.I()},
hW:{"^":"ot;",
gn:function(a){return"StrikeDownSituation"},
gaF:function(){return[$.$get$jd()]},
bh:function(a,b){if(a===0)return b.a0(this.b)
return},
bi:function(a,b){return new H.a3(a,new D.pg(this),[H.p(a,0)])}},
ot:{"^":"br+ba;"},
tQ:{"^":"a:0;a,b,c",
$1:function(a){var z=this.a
z=z.gA(z)
a.gb7()
a.b=z
z=J.R(this.b)
a.gb7()
a.c=z
a.gb7()
a.a=this.c
return a}},
pg:{"^":"a:0;a",
$1:function(a){var z,y
z=J.q(a)
y=this.a
return J.f(z.gA(a),y.b)||J.f(z.gA(a),y.c)}},
pe:{"^":"b;G:a@"},
pQ:{"^":"hW;G:a<,b,c",
af:function(a){var z=new D.iu(null,0,null,null)
z.d=this
a.$1(z)
return z.I()},
p:function(a,b){var z,y
if(b==null)return!1
if(!(b instanceof D.hW))return!1
if(this.a===b.a){z=this.b
y=b.b
z=(z==null?y==null:z===y)&&J.f(this.c,b.c)}else z=!1
return z},
gu:function(a){return Y.aP(Y.B(Y.B(Y.B(0,this.a&0x1FFFFFFF),J.E(this.b)),J.E(this.c)))},
j:function(a){return"StrikeDownSituation {time="+C.f.j(this.a)+",\nattacker="+J.A(this.b)+",\ntargetOnGround="+H.d(J.A(this.c))+",\n}"}},
iu:{"^":"pe;d,a,b,c",
gG:function(){this.gb7()
return this.a},
sG:function(a){this.gb7()
this.a=a},
gb7:function(){var z=this.d
if(z!=null){this.a=z.a
this.b=this.d.b
this.c=this.d.c
this.d=null}return this},
I:function(){var z,y,x,w
z=this.d
if(z==null){this.gb7()
y=this.a
this.gb7()
x=this.b
this.gb7()
w=this.c
z=new D.pQ(y,x,w)
if(x==null)H.u(P.aa("attacker"))
if(w==null)H.u(P.aa("targetOnGround"))}this.d=z
return z}}}],["","",,G,{"^":"",u2:{"^":"a:8;",
$3:function(a,b,c){return a.aW(C.h)}},u6:{"^":"a:4;",
$3:function(a,b,c){var z=a.gK()===C.c?0:0.2
if(a.gS())return 0.6-z
return 0.3-z}},u3:{"^":"a:5;",
$4:function(a,b,c,d){var z
a.eD(d,"<subject> {parr<ies> it|meet<s> it with <subject's> "+a.gaj().r+"|fend<s> it off}",!0)
c.co("FightSituation")
if(a.z)J.cM(d,"this opens an opportunity for a counter attack")
z=S.aW(S.fG(a,b,0))
C.a.l(c.e,z)
return H.d(a.ch)+" parries "+H.d(J.K(b))}},u4:{"^":"a:6;",
$4:function(a,b,c,d){a.aM(d,"<subject> tr<ies> to {parry|deflect it|meet it with <subject's> "+a.gaj().r+"|fend it off}")
if(a.e===C.j)J.aw(d,"<subject> <is> out of balance",!0,!1,!1,null,null,!1,a)
else S.cr(new G.rX(a,d),new G.rY(a,b,d),null,null)
return H.d(a.ch)+" fails to dodge "+H.d(J.K(b))}},rX:{"^":"a:1;a,b",
$0:function(){J.aw(this.b,"<subject> {fail<s>|<does>n't succeed}",!0,!1,!1,null,null,!1,this.a)
return}},rY:{"^":"a:1;a,b,c",
$0:function(){return this.b.de(this.c,"<subject> <is> too quick for <object>",!0,this.a)}}}],["","",,F,{"^":"",uh:{"^":"a:3;",
$2:function(a,b){return!0}},ui:{"^":"a:53;",
$3:function(a,b,c){if(a.gS())a.aM(c,"<subject> stand<s> off")
return H.d(a.gn(a))+" passes the opportunity"}},uj:{"^":"a:4;",
$3:function(a,b,c){}}}],["","",,B,{"^":"",uB:{"^":"a:13;",
$2:function(a,b){return a.gK()===C.j}},uD:{"^":"a:4;",
$3:function(a,b,c){if(a.gS())a.bG(c,"<subject> regain<s> <object>",$.$get$f1(),!0)
b.aA(a.gA(a),new B.rS())
return H.d(a.gn(a))+" regains balance"}},rS:{"^":"a:0;",
$1:function(a){a.sK(C.c)
return C.c}},uE:{"^":"a:4;",
$3:function(a,b,c){}}}],["","",,Y,{"^":"",tU:{"^":"a:7;",
$3:function(a,b,c){return a.gK()===C.c&&b.gK()!==C.n&&a.aW(C.h)}},tX:{"^":"a:4;",
$3:function(a,b,c){return 1}},tW:{"^":"a:5;",
$4:function(a,b,c,d){var z
a.bF(d,"<subject> swing<s> {<subject's> "+a.gaj().r+" |}at <object>",b)
c.ez(S.aW(M.hN(a,b,0)))
z=S.aW(L.hL(a,b,0))
C.a.l(c.e,z)
return H.d(a.ch)+" slashes at "+H.d(J.K(b))}},ud:{"^":"a:7;",
$3:function(a,b,c){return a.aW(C.h)}},uf:{"^":"a:4;",
$3:function(a,b,c){return 1}},ue:{"^":"a:5;",
$4:function(a,b,c,d){var z=J.q(b)
c.aA(z.gA(b),new Y.t_())
if(c.a0(z.gA(b)).gbB()){a.bG(d,"<subject> {slash<es>|cut<s>} <object's> {shoulder|abdomen|thigh}",b,!0)
b.bE(d,"<subject> {scream|yell|grunt}<s> in pain",!0)}else{a.bG(d,"<subject> {slash<es>|cut<s>} {across|through} <object's> {neck|abdomen|lower body}",b,!0)
X.js(d,b)}return H.d(J.K(a))+" slains "+H.d(z.gn(b))}},t_:{"^":"a:0;",
$1:function(a){a.sas(a.gas()-1)
return a}}}],["","",,L,{"^":"",
hL:function(a,b,c){var z=new L.is(null,0,null,null)
new L.tY(a,b,c).$1(z)
return z.I()},
hK:{"^":"ou;",
gn:function(a){return"SlashDefenseSituation"},
gaF:function(){return[$.$get$j8(),$.$get$jn(),$.$get$j7()]},
bh:function(a,b){if(a===0)return b.a0(this.c)
return},
bi:function(a,b){return new H.a3(a,new L.oA(this),[H.p(a,0)])}},
ou:{"^":"br+ba;"},
tY:{"^":"a:0;a,b,c",
$1:function(a){var z=this.a
z=z.gA(z)
a.gb5()
a.b=z
z=J.R(this.b)
a.gb5()
a.c=z
a.gb5()
a.a=this.c
return a}},
oA:{"^":"a:0;a",
$1:function(a){var z,y
z=J.q(a)
y=this.a
return J.f(z.gA(a),y.b)||J.f(z.gA(a),y.c)}},
oz:{"^":"b;G:a@"},
pO:{"^":"hK;G:a<,b,c",
af:function(a){var z=new L.is(null,0,null,null)
z.d=this
a.$1(z)
return z.I()},
p:function(a,b){var z,y
if(b==null)return!1
if(!(b instanceof L.hK))return!1
if(this.a===b.a){z=this.b
y=b.b
z=(z==null?y==null:z===y)&&J.f(this.c,b.c)}else z=!1
return z},
gu:function(a){return Y.aP(Y.B(Y.B(Y.B(0,this.a&0x1FFFFFFF),J.E(this.b)),J.E(this.c)))},
j:function(a){return"SlashDefenseSituation {time="+C.f.j(this.a)+",\nattacker="+J.A(this.b)+",\ntarget="+H.d(J.A(this.c))+",\n}"}},
is:{"^":"oz;d,a,b,c",
gG:function(){this.gb5()
return this.a},
sG:function(a){this.gb5()
this.a=a},
gb5:function(){var z=this.d
if(z!=null){this.a=z.a
this.b=this.d.b
this.c=this.d.c
this.d=null}return this},
I:function(){var z,y,x,w
z=this.d
if(z==null){this.gb5()
y=this.a
this.gb5()
x=this.b
this.gb5()
w=this.c
z=new L.pO(y,x,w)
if(x==null)H.u(P.aa("attacker"))
if(w==null)H.u(P.aa("target"))}this.d=z
return z}}}],["","",,M,{"^":"",
hN:function(a,b,c){var z=new M.it(null,0,null,null)
new M.uc(a,b,c).$1(z)
return z.I()},
hM:{"^":"ov;",
gaF:function(){return[$.$get$jc()]},
gn:function(a){return"SlashSituation"},
bh:function(a,b){if(a===0)return b.a0(this.a)
return},
bi:function(a,b){return new H.a3(a,new M.oC(this),[H.p(a,0)])}},
ov:{"^":"br+ba;"},
uc:{"^":"a:0;a,b,c",
$1:function(a){var z=this.a
z=z.gA(z)
a.gb6()
a.b=z
z=J.R(this.b)
a.gb6()
a.c=z
a.gb6()
a.a=this.c
return a}},
oC:{"^":"a:0;a",
$1:function(a){var z,y
z=J.q(a)
y=this.a
return J.f(z.gA(a),y.a)||J.f(z.gA(a),y.b)}},
oB:{"^":"b;G:a@"},
pP:{"^":"hM;a,b,G:c<",
af:function(a){var z=new M.it(null,0,null,null)
z.d=this
a.$1(z)
return z.I()},
p:function(a,b){var z,y
if(b==null)return!1
if(!(b instanceof M.hM))return!1
z=this.a
y=b.a
return(z==null?y==null:z===y)&&J.f(this.b,b.b)&&this.c===b.c},
gu:function(a){return Y.aP(Y.B(Y.B(Y.B(0,J.E(this.a)),J.E(this.b)),this.c&0x1FFFFFFF))},
j:function(a){return"SlashSituation {attacker="+J.A(this.a)+",\ntarget="+H.d(J.A(this.b))+",\ntime="+C.f.j(this.c)+",\n}"}},
it:{"^":"oB;d,a,b,c",
gG:function(){this.gb6()
return this.a},
sG:function(a){this.gb6()
this.a=a},
gb6:function(){var z=this.d
if(z!=null){this.b=z.a
this.c=this.d.b
this.a=this.d.c
this.d=null}return this},
I:function(){var z,y,x
z=this.d
if(z==null){this.gb6()
y=this.b
this.gb6()
x=this.c
this.gb6()
z=new M.pP(y,x,this.a)
if(y==null)H.u(P.aa("attacker"))
if(x==null)H.u(P.aa("target"))}this.d=z
return z}}}],["","",,O,{"^":"",
xy:[function(a){var z,y
z=$.$get$fh()
y=z.a
if(y.length>0){y+=" "
z.a=y}z.a=y+a},"$1","vl",2,0,2],
vy:[function(a){$.f7=a},"$1","vm",2,0,2],
j5:[function(a,b,c,d,e,f,g){var z=L.fy(a,!1,!1,d,e,f,g)
$.$get$c3().l(0,z)
return z},function(a){return O.j5(a,!1,!1,null,null,null,null)},function(a,b){return O.j5(a,!1,!1,null,null,b,null)},"$7$deferToChoiceList$deferToEndOfPage$goto$helpMessage$script$submenu","$1","$2$script","vk",2,13,7,0,0,0,1,1,0]}],["","",,X,{"^":"",
aO:function(a){return X.eS(J.jG(a,0,new X.uV()))},
jg:function(a,b,c,d){return X.eS(X.bv(X.bv(X.bv(X.bv(0,J.E(a)),J.E(b)),c&0x1FFFFFFF),J.E(d)))},
bv:function(a,b){var z=J.P(a,b)
if(typeof z!=="number")return H.n(z)
a=536870911&z
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
eS:function(a){if(typeof a!=="number")return H.n(a)
a=536870911&a+((67108863&a)<<3)
a^=a>>>11
return 536870911&a+((16383&a)<<15)},
uV:{"^":"a:3;",
$2:function(a,b){return X.bv(a,J.E(b))}}}]]
setupProgram(dart,init.types.length)
var deferredTypes=[{func:1,ret:P.i,args:[R.S,A.ai,Y.ah]},{func:1,ret:Y.bN,args:[P.t]},{func:1,v:true,args:[P.i]},{func:1,ret:P.i,args:[P.t]},{func:1,ret:P.T,args:[R.S,A.ai]},{func:1,ret:P.t,args:[R.S]},{func:1,ret:P.T,args:[P.T,P.T]},{func:1,ret:L.ag,args:[P.i],named:{deferToChoiceList:P.V,deferToEndOfPage:P.V,goto:P.i,helpMessage:P.i,script:{func:1,ret:[P.ae,P.b5]},submenu:P.i}}]
init.types.push.apply(init.types,deferredTypes)
C.X=new P.qI()
C.a1=new U.d1(0)
C.a2=new U.d1(1)
C.a3=new U.d1(2)
C.h=new U.d1(3)
C.C=new O.hg(0)
C.af=new O.hg(1)
C.ai=new H.e8([0,"ItemType.SPEAR",1,"ItemType.BRANCH",2,"ItemType.TENT",3,"ItemType.SWORD"],[null,null])
C.aj=new H.e8([0,"KnownToMode.ALL",1,"KnownToMode.PROTAGONIST_ONLY",2,"KnownToMode.CUSTOM"],[null,null])
C.F=new H.e8([0,"Pose.standing",1,"Pose.offBalance",2,"Pose.onGround"],[null,null])
C.c=new R.em(0)
C.j=new R.em(1)
C.n=new R.em(2)
C.H=new Y.cq("he","him","his","himself")
C.k=new Y.cq("it","it","its","itself")
C.ak=new Y.cq("she","her","her","herself")
C.al=new Y.cq("they","them","their","themselves")
C.I=new Y.cq("you","you","your","yourself")
C.o=H.uR("dynamic")
C.ao=new P.bX(null,2);(function(a){for(var z=0;z<a.length;){var y=a[z++]
var x=a[z++]
var w=a[z++]
var v=a[z++]
I.$lazy(y,x,w,null,v)}})(["dY","$get$dY",function(){return P.kU()},$,"eZ","$get$eZ",function(){return P.eo(null)},$,"bq","$get$bq",function(){return P.eo(null)},$,"hT","$get$hT",function(){return P.G("(\\w)([\\.\\?\\!])([\"'])\\.(?=$|\\s)",!0,!1)},$,"bA","$get$bA",function(){return L.eA(new L.u5())},$,"fe","$get$fe",function(){return L.eA(new L.uC())},$,"f4","$get$f4",function(){return L.eA(new L.ug())},$,"j6","$get$j6",function(){return new Q.aE("swing back at <object>",new G.u8(),new G.u9(),new G.ua(),new G.ub())},$,"iT","$get$iT",function(){return P.eo(null)},$,"j7","$get$j7",function(){return new Q.aE("step back and parry",new X.tZ(),new X.u_(),new X.u0(),new X.u1())},$,"j8","$get$j8",function(){return new Q.aE("dodge and counter",new F.ul(),new F.um(),new F.un(),new F.uo())},$,"jk","$get$jk",function(){return new Q.aE("kick <object>",new Y.up(),new Y.uq(),new Y.us(),new Y.ut())},$,"f1","$get$f1",function(){var z,y
z=$.$get$bA()
y=H.r([],[P.i])
z==null
return new Y.bN(!0,"balance",y,!0,z,!0,!1,C.k)},$,"fc","$get$fc",function(){return new Q.aE("stab <object>",new A.uu(),new A.uv(),new A.uw(),new A.ux())},$,"jm","$get$jm",function(){return new Q.aE("parry it",new K.tM(),new K.tN(),new K.tO(),new K.tP())},$,"jt","$get$jt",function(){return new Q.aE("roll out of way",new Y.tH(),new Y.tI(),new Y.tJ(),new Y.tL())},$,"ju","$get$ju",function(){return new Q.aE("strike down at <object>",new T.tD(),new T.tE(),null,new T.tF())},$,"jd","$get$jd",function(){return new Q.aE("kill <object>",new T.tR(),new T.tS(),null,new T.tT())},$,"jv","$get$jv",function(){return Q.e1("Stand up.",new Q.uy(),new Q.uz(),new Q.uA(),1)},$,"jn","$get$jn",function(){return new Q.aE("parry and counter",new G.u2(),new G.u3(),new G.u4(),new G.u6())},$,"fd","$get$fd",function(){return Q.e1("Stand off.",new F.uh(),new F.ui(),new F.uj(),1)},$,"jr","$get$jr",function(){return Q.e1("Regain balance.",new B.uB(),new B.uD(),new B.uE(),1)},$,"jx","$get$jx",function(){return new Q.aE("swing at <object>",new Y.tU(),new Y.tW(),null,new Y.tX())},$,"jc","$get$jc",function(){return new Q.aE("kill <object>",new Y.ud(),new Y.ue(),null,new Y.uf())},$])}
$dart_deferred_initializers$["7JAVLzKAlt1LxAjkf0Nf4ljCwsc="]=$dart_deferred_initializers$.current
