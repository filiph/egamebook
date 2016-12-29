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
cA:function(a,b,c){var z,y,x
if(b===0){if(c.ges())J.jj(c.c)
else J.dN(c.a)
return}else if(b===1){if(c.ges())c.c.ek(H.E(a),H.P(a))
else{z=H.E(a)
y=H.P(a)
c.a.cj(z,y)
J.dN(c.a)}return}if(a instanceof P.bV){if(c.ges()){b.$2(2,null)
return}z=a.b
if(z===0){z=a.a
J.fl(c.a,z)
P.cI(new P.ro(b,c))
return}else if(z===1){x=a.a
c.a.fV(x,!1).a_(new P.rp(b,c))
return}}P.iI(a,b)},
rS:function(a){return J.fr(a)},
ro:{"^":"a:1;a,b",
$0:function(){var z=this.b
if(z.a.gb6()){z.b=!0
return}this.a.$2(null,0)}},
rp:{"^":"a:0;a,b",
$1:function(a){var z=this.b.c!=null?2:0
this.a.$2(z,null)}},
pV:{"^":"b;a,b,c",
gc4:function(a){return J.fr(this.a)},
gb6:function(){return this.a.gb6()},
ges:function(){return this.c!=null},
l:function(a,b){return J.fl(this.a,b)},
cj:function(a,b){return this.a.cj(a,b)},
aD:function(a){return J.dN(this.a)},
ia:function(a){var z=new P.pY(a)
this.a=P.hY(new P.q_(this,a),new P.q0(z),null,new P.q1(this,z),!1,null)},
p:{
pW:function(a){var z=new P.pV(null,!1,null)
z.ia(a)
return z}}},
pY:{"^":"a:1;a",
$0:function(){P.cI(new P.pZ(this.a))}},
pZ:{"^":"a:1;a",
$0:function(){this.a.$2(0,null)}},
q0:{"^":"a:1;a",
$0:function(){this.a.$0()}},
q1:{"^":"a:1;a,b",
$0:function(){var z=this.a
if(z.b===!0){z.b=!1
this.b.$0()}}},
q_:{"^":"a:1;a,b",
$0:function(){var z=this.a
if(!z.a.gha()){z.c=new P.aV(new P.v(0,$.i,null,[null]),[null])
if(z.b===!0){z.b=!1
P.cI(new P.pX(this.b))}return z.c.gh6()}}},
pX:{"^":"a:1;a",
$0:function(){this.a.$2(2,null)}},
bV:{"^":"b;a,b",
k:function(a){return"IterationMarker("+this.b+", "+H.d(this.a)+")"},
p:{
iA:function(a){return new P.bV(a,1)},
cx:function(){return C.ao},
iz:function(a){return new P.bV(a,0)},
cy:function(a){return new P.bV(a,3)}}},
bX:{"^":"b;a,b,c,d",
gw:function(){var z=this.c
return z==null?this.b:z.gw()},
m:function(){var z,y,x,w
for(;!0;){z=this.c
if(z!=null)if(z.m()===!0)return!0
else this.c=null
y=function(a,b,c){var v,u=b
while(true)try{return a(u,v)}catch(t){v=t
u=c}}(this.a,0,1)
if(y instanceof P.bV){x=y.b
if(x===2){z=this.d
if(z==null||z.length===0){this.b=null
return!1}if(0>=z.length)return H.e(z,-1)
this.a=z.pop()
continue}else{z=y.a
if(x===3)throw z
else{w=J.aC(z)
if(w instanceof P.bX){z=this.d
if(z==null){z=[]
this.d=z}z.push(this.a)
this.a=w.a
continue}else{this.c=w
continue}}}}else{this.b=y
return!0}}return!1}},
rg:{"^":"d1;a",
gH:function(a){return new P.bX(this.a(),null,null,null)},
$asd1:I.X,
$asF:I.X,
p:{
cz:function(a){return new P.rg(a)}}}}],["","",,P,{"^":"",
em:function(a){return C.X},
qA:{"^":"b;",
aI:function(a){if(a<=0||a>4294967296)throw H.c(P.nM("max must be in range 0 < max \u2264 2^32, was "+a))
return Math.random()*a>>>0},
he:function(){return Math.random()}}}],["","",,S,{"^":"",dX:{"^":"b;iI:a<,b,$ti",
aM:function(a){var z=new S.bn(null,null,this.$ti)
z.b5()
z.ah(0,this)
a.$1(z)
return z.C()},
gv:function(a){var z=this.b
if(z==null){z=X.aB(this.a)
this.b=z}return z},
t:function(a,b){var z,y,x,w,v
if(b==null)return!1
if(b===this)return!0
z=J.l(b)
if(!z.$isdX)return!1
y=b.a
x=this.a
if(y.length!==x.length)return!1
z=z.gv(b)
w=this.gv(this)
if(z==null?w!=null:z!==w)return!1
for(v=0;z=x.length,v!==z;++v){if(v>=y.length)return H.e(y,v)
w=y[v]
if(v>=z)return H.e(x,v)
if(!J.f(w,x[v]))return!1}return!0},
k:function(a){return J.w(this.a)},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=z.length)return H.e(z,b)
return z[b]},
gi:function(a){return this.a.length},
bn:function(a,b,c){var z=this.a
return(z&&C.a).bn(z,b,c)},
bm:function(a,b){return this.bn(a,b,0)},
gH:function(a){var z=this.a
return new J.bh(z,z.length,0,null,[H.o(z,0)])},
aX:function(a,b){var z=this.a
z.toString
return new H.am(z,b,[null,null])},
F:function(a,b){var z=this.a
return(z&&C.a).F(z,b)},
A:function(a,b){var z=this.a
return(z&&C.a).A(z,b)},
gD:function(a){return this.a.length===0},
gZ:function(a){return this.a.length!==0},
gN:function(a){var z=this.a
return(z&&C.a).gN(z)},
gB:function(a){var z=this.a
return(z&&C.a).gB(z)},
P:function(a,b){var z=this.a
if(b>>>0!==b||b>=z.length)return H.e(z,b)
return z[b]},
b5:function(){if(new H.aI(H.aY(H.o(this,0)),null).t(0,C.o))throw H.c(new P.D('explicit element type required, for example "new BuiltList<int>"'))}},bn:{"^":"b;a,b,$ti",
C:function(){var z,y
z=this.b
if(z==null){z=this.a
y=new S.dX(z,null,this.$ti)
y.b5()
this.a=z
this.b=y
z=y}return z},
ah:function(a,b){if(H.f3(b,"$isdX",this.$ti,null)){this.a=b.giI()
this.b=b}else{this.a=P.a6(b,!0,H.o(this,0))
this.b=null}},
j:function(a,b,c){var z
if(c==null)H.n(P.Y("null element"))
z=this.geb()
if(b>>>0!==b||b>=z.length)return H.e(z,b)
z[b]=c},
l:function(a,b){var z
if(b==null)H.n(P.Y("null element"))
z=this.geb();(z&&C.a).l(z,b)},
E:function(a,b){var z=this.geb();(z&&C.a).E(z,b)},
aX:function(a,b){var z=this.a
z.toString
z=new H.am(z,b,[null,null]).aN(0,!0)
this.a=z
this.b=null
this.io(z)},
geb:function(){if(this.b!=null){this.a=P.a6(this.a,!0,H.o(this,0))
this.b=null}return this.a},
b5:function(){if(new H.aI(H.aY(H.o(this,0)),null).t(0,C.o))throw H.c(new P.D('explicit element type required, for example "new ListBuilder<int>"'))},
io:function(a){var z,y,x,w
for(z=a.length,y=H.o(this,0),x=0;x<a.length;a.length===z||(0,H.aa)(a),++x){w=a[x]
if(!H.f4(w,y))throw H.c(P.Y("invalid element: "+H.d(w)))}}}}],["","",,A,{"^":"",cU:{"^":"b;iK:a<,b,c,d,$ti",
aM:function(a){var z=new A.cj(null,null,this.$ti)
z.bx()
z.ah(0,this)
a.$1(z)
return z.C()},
gv:function(a){var z=this.b
if(z==null){z=this.a
z=z.gV(z)
z=H.bo(z,new A.k8(this),H.A(z,"F",0),null)
z=P.a6(z,!1,H.A(z,"F",0))
C.a.hJ(z)
z=X.aB(z)
this.b=z}return z},
t:function(a,b){var z,y,x,w,v
if(b==null)return!1
if(b===this)return!0
z=J.l(b)
if(!z.$iscU)return!1
y=b.a
x=this.a
if(y.gi(y)!==x.gi(x))return!1
z=z.gv(b)
w=this.gv(this)
if(z==null?w!=null:z!==w)return!1
for(z=this.gV(this),z=z.gH(z);z.m();){v=z.gw()
if(!J.f(y.h(0,v),x.h(0,v)))return!1}return!0},
k:function(a){return J.w(this.a)},
h:function(a,b){return this.a.h(0,b)},
A:function(a,b){this.a.A(0,b)},
gD:function(a){var z=this.a
return z.gD(z)},
gZ:function(a){var z=this.a
return z.gZ(z)},
gV:function(a){var z=this.c
if(z==null){z=this.a
z=z.gV(z)
this.c=z}return z},
gi:function(a){var z=this.a
return z.gi(z)},
bx:function(){if(new H.aI(H.aY(H.o(this,0)),null).t(0,C.o))throw H.c(new P.D('explicit key type required, for example "new BuiltMap<int, int>"'))
if(new H.aI(H.aY(H.o(this,1)),null).t(0,C.o))throw H.c(new P.D('explicit value type required, for example "new BuiltMap<int, int>"'))}},k8:{"^":"a:0;a",
$1:function(a){var z,y
z=J.x(a)
y=J.x(this.a.a.h(0,a))
return X.eU(X.bw(X.bw(0,J.x(z)),J.x(y)))}},cj:{"^":"b;a,b,$ti",
C:function(){var z=this.b
if(z==null){z=new A.cU(this.a,null,null,null,this.$ti)
z.bx()
this.b=z}return z},
ah:function(a,b){var z
if(H.f3(b,"$iscU",this.$ti,null)){this.b=b
this.a=b.giK()}else if(!!b.$iscU){z=P.ee(b.a,H.o(this,0),H.o(this,1))
this.b=null
this.a=z}else if(!!b.$isR){z=P.ee(b,H.o(this,0),H.o(this,1))
this.b=null
this.a=z}else throw H.c(P.Y("expected Map or BuiltMap, got "+H.d(b.gkJ(b))))},
j:function(a,b,c){if(b==null)H.n(P.Y("null key"))
if(c==null)H.n(P.Y("null value"))
this.gcV().j(0,b,c)},
E:function(a,b){this.gcV().E(0,b)},
gcV:function(){if(this.b!=null){this.a=P.ee(this.a,H.o(this,0),H.o(this,1))
this.b=null}return this.a},
bx:function(){if(new H.aI(H.aY(H.o(this,0)),null).t(0,C.o))throw H.c(new P.D('explicit key type required, for example "new MapBuilder<int, int>"'))
if(new H.aI(H.aY(H.o(this,1)),null).t(0,C.o))throw H.c(new P.D('explicit value type required, for example "new MapBuilder<int, int>"'))}}}],["","",,Y,{"^":"",
y:function(a,b){if(typeof b!=="number")return H.p(b)
a=536870911&a+b
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
aZ:function(a){a=536870911&a+((67108863&a)<<3)
a^=a>>>11
return 536870911&a+((16383&a)<<15)}}],["","",,M,{"^":"",bJ:{"^":"b;$ti",
h:function(a,b){var z
if(!this.cO(b))return
z=this.c.h(0,this.a.$1(H.fh(b,H.A(this,"bJ",1))))
return z==null?null:J.cO(z)},
j:function(a,b,c){if(!this.cO(b))return
this.c.j(0,this.a.$1(b),new B.hz(b,c,[null,null]))},
M:function(a,b){if(!this.cO(b))return!1
return this.c.M(0,this.a.$1(H.fh(b,H.A(this,"bJ",1))))},
A:function(a,b){this.c.A(0,new M.k9(b))},
gD:function(a){var z=this.c
return z.gD(z)},
gZ:function(a){var z=this.c
return z.gZ(z)},
gV:function(a){var z=this.c
z=z.gav(z)
return H.bo(z,new M.ka(),H.A(z,"F",0),null)},
gi:function(a){var z=this.c
return z.gi(z)},
E:function(a,b){var z
if(!this.cO(b))return
z=this.c.E(0,this.a.$1(H.fh(b,H.A(this,"bJ",1))))
return z==null?null:J.cO(z)},
gav:function(a){var z=this.c
z=z.gav(z)
return H.bo(z,new M.kb(),H.A(z,"F",0),null)},
k:function(a){return P.d5(this)},
cO:function(a){var z
if(a==null||H.f4(a,H.A(this,"bJ",1)))z=this.b.$1(a)===!0
else z=!1
return z},
$isR:1,
$asR:function(a,b,c){return[b,c]}},k9:{"^":"a:3;a",
$2:function(a,b){var z=J.aA(b)
return this.a.$2(z.gN(b),z.gB(b))}},ka:{"^":"a:0;",
$1:function(a){return J.fo(a)}},kb:{"^":"a:0;",
$1:function(a){return J.cO(a)}}}],["","",,B,{"^":"",hz:{"^":"b;N:a>,B:b>,$ti"}}],["","",,N,{"^":"",o3:{"^":"o1;Q,ch,a,b,c,d,e,f,r,x,y,z",
jM:function(){this.ch=H.c2($.$get$c3().h(0,"game"),"$isfS")},
k_:function(){this.ch=null
var z=$.$get$c1()
z=new O.fS(null,null,null,null,null,null,null,new Y.aT(H.r([],[Y.aE]),0,P.ai()),O.ub(),O.ua(),O.u9(),z,new P.b5(""),!1,null)
z.dA()
this.ch=z
z.r="endGame"},
hg:function(){$.$get$c3().j(0,"game",this.ch)},
i6:function(){var z,y
z=new O.dh(["You and Briana sprint through the giant worm\u2019s tunnel.","Suddenly, an **orc** and a **goblin** jump in front of you from a slimy crevice, swords in hands.","![Orc and Goblin](img/orc_and_goblin_sketch.jpg)",[null,P.aS(["goto","gameLoop"])]],0,null,!1,!1)
y=this.a.a
y.j(0,"start",z)
z.a="start"
z=new O.dh([new N.o5(this),[null,P.aS(["goto","gameLoop"])]],0,null,!1,!1)
y.j(0,"gameLoop",z)
z.a="gameLoop"
z=new O.dh(['<p class="meta">\n  Hit <strong>Restart</strong> (top left) to play again. It will be different.\n</p>'],0,null,!1,!1)
y.j(0,"endGame",z)
z.a="endGame"
this.b=y.h(0,"start")},
p:{
o4:function(){var z,y
z=P.h
y=new H.a0(0,null,null,null,null,null,0,[z,O.dh])
z=new N.o3("net.filiph.edgehead.0.0.1",null,new O.o6(y),null,null,null,P.H(null,null,null,z),!1,null,-9999,null,null)
z.i6()
return z}}},o5:{"^":"a:19;a",
$0:function(){var z=0,y=new P.aP(),x=1,w,v=this
var $async$$0=P.aL(function(a,b){if(a===1){w=b
z=x}while(true)switch(z){case 0:z=2
return P.C(v.a.ch.b2(),$async$$0,y)
case 2:return P.C(null,0,y)
case 1:return P.C(w,1,y)}})
return P.C(null,$async$$0,y)}}}],["","",,O,{"^":"",
wB:[function(a,b){var z,y
z=b.gja()
z=new H.a5(z,new O.t_(a),[H.o(z,0)]).an(0,0,new O.t0())
if(typeof z!=="number")return H.p(z)
y=b.a
y=new H.a5(y,new O.t1(a),[H.o(y,0)]).an(0,0,new O.t2())
if(typeof y!=="number")return H.p(y)
return 0+z-y},"$2","j1",4,0,5],
t_:{"^":"a:0;a",
$1:function(a){return J.f(a.gai(),this.a.gai())}},
t0:{"^":"a:3;",
$2:function(a,b){return J.Q(a,b.gaG())}},
t1:{"^":"a:0;a",
$1:function(a){return a.c0(this.a)}},
t2:{"^":"a:3;",
$2:function(a,b){return J.Q(a,b.gaG())}},
fS:{"^":"mY;x,y,z,Q,ch,cD:cx<,cy,f3:db<,a,b,c,d,e,f,r",
dA:function(){var z,y,x,w
z=[P.h]
y=H.r([],z)
x=P.H(null,null,null,null)
w=$.$get$ff()
x=new R.cv(null,!0,y,null,null,C.c,1,null,100,!0,!1,x,null,!0,C.l,w,null)
new O.kW().$1(x)
this.x=x.C()
y=new R.cv(null,!0,H.r([],z),null,null,C.c,1,null,100,!0,!1,P.H(null,null,null,null),null,!0,C.l,w,null)
new O.kX().$1(y)
this.y=y.C()
y=new R.cv(null,!0,H.r([],z),null,null,C.c,1,null,100,!0,!1,P.H(null,null,null,null),null,!0,C.l,w,null)
new O.kY().$1(y)
this.z=y.C()
z=new R.cv(null,!0,H.r([],z),null,null,C.c,1,null,100,!0,!1,P.H(null,null,null,null),null,!0,C.l,w,null)
new O.kZ().$1(z)
z=z.C()
this.Q=z
y=new U.d_(null,null,null,null,null,null)
y.a=U.lc([this.x,this.y],[this.z,z])
new O.l_().$1(y)
this.ch=y.C()
z=P.aw([this.x,this.y,this.z,this.Q],null)
y=this.ch
x=P.H(null,null,null,null)
y=new A.aK(z,P.H(null,null,null,null),x,P.H(null,null,null,null),P.a6([y],!0,null),0)
this.cx=y
x=new Y.aT(H.r([],[Y.aE]),0,P.ai())
z=new B.cl(y,null,x,1,1,!0,!1,!1,0)
z.f5(y,null,null,x,1,!1,!0,!1)
this.cy=z},
dl:function(){var z=0,y=new P.aP(),x,w=2,v,u=this,t,s,r,q,p,o,n,m,l,k,j,i
var $async$dl=P.aL(function(a,b){if(a===1){v=b
z=w}while(true)switch(z){case 0:t=u.cx.e
if(t.length===0){u.f=!0
t=u.db
t.aU(0,"\n\n",!0)
s=u.cx.a1(u.x.e)
if(s.gbL()){t.eg(0,"<subject> look<s> behind",s)
t.eg(0,"<subject> see<s> the giant worm's hideous head approaching",s)
if(u.cx.a1(u.y.e).gbL())t.aU(0,"You both start sprinting again.",!0)
else{t.eg(0,"<subject> take<s> a last look at Briana",s)
t.je(0,"<subject> start<s> sprinting again, alone",!0,s)}t.aU(0,"\n\n",!0)
t.aU(0,"TO BE CONTINUED.",!0)}else t.aU(0,"You will soon be the giant worm's food.",!0)
u.e.a+=t.df()
z=1
break}r=C.a.gB(t)
q=r.ds(u.cx)
t=u.cx
p=new H.a0(0,null,null,null,null,null,0,[null,null])
o=J.L(q)
n=new Y.aT(H.r([],[Y.aE]),0,P.ai())
n.b=t.f
m=new G.jS(o,new B.cl(t,null,n,1,1,!0,!1,!1,0),0,!1,p)
z=3
return P.C(m.dd(4,new O.l0()),$async$dl,y)
case 3:l=G.nu(p)
t=l.b
if(t.length===0){u.cx.h3(r.gq(r))
t=u.cx
p=t.f
if(typeof p!=="number"){x=p.G()
z=1
break}t.f=p+1
z=1
break}if(q.gU()){if(t.length===1){u.dJ(C.a.ga8(t),q,u.db)
z=1
break}p=u.db
u.e.a+=p.df()
C.a.si(p.a,0)
m.eU().A(0,P.tw())
k=P.a6(new H.pg(t,0,4,[H.o(t,0)]),!0,null)
t=new O.l1()
p=k.length-1
if(p-0<=32)H.hS(k,0,p,t)
else H.hR(k,0,p,t)
for(t=k.length,p=u.c,j=0;j<k.length;k.length===t||(0,H.aa)(k),++j){i=k[j]
p.$2$script(J.M(i),new O.l2(u,q,i))}z=1
break}else{p=S.nK(l.a,1000)
if(p>=t.length){x=H.e(t,p)
z=1
break}o=u.db
u.dJ(t[p],q,o)}if(o.geo()){u.e.a+=o.hj(!0)
o.kz()}case 1:return P.C(x,0,y)
case 2:return P.C(v,1,y)}})
return P.C(null,$async$dl,y)},
dJ:function(a,b,c){var z,y,x
z=a.d0(b,this.cy,this.cx)
y=P.a6(z,!0,H.A(z,"F",0))
x=S.nJ(new H.am(y,new O.kT(),[null,null]),1)
if(x>=y.length)return H.e(y,x)
z=y[x]
this.cy=z
C.a.K(c.a,z.gf3().a)
this.cx=this.cy.gcD()}},
kW:{"^":"a:0;",
$1:function(a){var z
a.gu()
a.r=1
a.gu()
a.z=!0
a.gu()
a.cy=C.I
a.gu()
a.ch="Filip"
z=$.$get$bB()
a.gu()
a.c=new U.dj(!1,10,!0,z,"sword",C.f)
a.gu()
a.f=2
a.gu()
a.x=1000
return a}},
kX:{"^":"a:0;",
$1:function(a){var z
a.gu()
a.r=100
a.gu()
a.cy=C.al
a.gu()
a.ch="Briana"
z=$.$get$bB()
a.gu()
a.c=new U.dj(!1,10,!0,z,"longsword",C.f)
a.gu()
a.f=2
return a}},
kY:{"^":"a:0;",
$1:function(a){var z
a.gu()
a.r=1000
a.gu()
a.ch="orc"
a.gu()
a.cx=!1
a.gu()
a.cy=C.H
z=$.$get$bB()
a.gu()
a.c=new U.dj(!1,10,!0,z,"sword",C.f)
a.gu()
a.f=2
z=$.$get$f6()
a.gu()
a.db=z
a.gu()
a.dx=O.j1()
return a}},
kZ:{"^":"a:0;",
$1:function(a){var z
a.gu()
a.r=1001
a.gu()
a.ch="goblin"
a.gu()
a.cx=!1
a.gu()
a.cy=C.H
z=$.$get$bB()
a.gu()
a.c=new U.dj(!1,10,!0,z,"scimitar",C.f)
z=$.$get$f6()
a.gu()
a.db=z
a.gu()
a.dx=O.j1()
return a}},
l_:{"^":"a:0;",
$1:function(a){var z,y
z=a.gac()
y=z.c
if(y==null){y=new A.cj(null,null,[P.q,{func:1,v:true,args:[A.aK,Y.aT]}])
y.bx()
y.ah(0,C.v)
z.c=y
z=y}else z=y
z.gcV().j(0,2,new O.kU())
z=a.gac()
y=z.c
if(y==null){y=new A.cj(null,null,[P.q,{func:1,v:true,args:[A.aK,Y.aT]}])
y.bx()
y.ah(0,C.v)
z.c=y
z=y}else z=y
z.gcV().j(0,6,new O.kV())
return a}},
kU:{"^":"a:3;",
$2:function(a,b){b.fT()
b.l(0,"You hear a horrible growling sound from behind.")
b.l(0,"The worm must be near.")
b.aU(0,"\n\n",!0)}},
kV:{"^":"a:3;",
$2:function(a,b){b.fT()
b.l(0,"The earth shatters and there's that sound again.")
b.aU(0,"\n\n",!0)}},
l0:{"^":"a:19;",
$0:function(){var z=0,y=new P.aP(),x=1,w
var $async$$0=P.aL(function(a,b){if(a===1){w=b
z=x}while(true)switch(z){case 0:z=2
return P.C(P.bN(C.a0,null,null),$async$$0,y)
case 2:return P.C(null,0,y)
case 1:return P.C(w,1,y)}})
return P.C(null,$async$$0,y)}},
l1:{"^":"a:3;",
$2:function(a,b){return J.cK(J.M(a),J.M(b))}},
l2:{"^":"a:1;a,b,c",
$0:function(){var z=this.a
z.dJ(this.c,this.b,z.db)}},
kT:{"^":"a:0;",
$1:function(a){return a.gku()}}}],["","",,Q,{"^":"",
j3:function(a,b,c){return new P.cz(function(){var z=a,y=b,x=c
var w=0,v=1,u,t,s,r
return function $async$j3(d,e){if(d===1){u=e
w=v}while(true)switch(w){case 0:t=y.e
t=t.length!==0?C.a.gB(t):null
s=t.bu(y.a,y)
t=s.gH(s),r=new H.eB(t,new Q.tB(z),[H.o(s,0)])
case 2:if(!r.m()){w=3
break}w=4
return x.$1(t.gw())
case 4:w=2
break
case 3:return P.cx()
case 1:return P.cy(u)}}})},
tB:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gai()
y=this.a.gai()
z=z.a
y=y.a
return z==null?y!=null:z!==y}},
c7:{"^":"b;",
d0:function(a,b,c){var z=this
return new P.cz(function(){var y=a,x=b,w=c
var v=0,u=1,t,s,r
return function $async$d0(d,e){if(d===1){t=e
v=u}while(true)switch(v){case 0:s=z.ab(y,x.gcD())
v=s>0?2:3
break
case 2:r=A.io(w)
v=4
return B.hA(r,x,z,z.ij(r,y,w,z.gaf(),!0),s,!1,!1,!0)
case 4:case 3:v=s<1?5:6
break
case 5:r=A.io(w)
v=7
return B.hA(r,x,z,z.ii(r,y,w,z.gae(),!0),1-s,!0,!1,!1)
case 7:case 6:return P.cx()
case 1:return P.cy(t)}}})},
f9:function(a,b,c,d,e,f){var z,y,x,w,v,u,t
z=a.a.bb(0,new Q.jN(b))
y=new O.jL(null,null,null,C.C,null,null,null,null,null,null,null)
y.x=new H.aI(H.f8(this),null).k(0)
y.r=this.gn(this)
y.a=b
y.f=P.aw(!!this.$isal?[this.b]:[],null)
y.y=f
y.z=e
y.ki(c)
x=new Y.aT(H.r([],[Y.aE]),0,P.ai())
w=a.e
v=J.L(w.length!==0?C.a.gB(w):null)
u=a.gv(a);(w.length!==0?C.a.gB(w):null).hf(a,x)
if(a.gv(a)!==u)throw H.c(new P.z("Please don't change the world in onBeforeAction"))
this.a=d.$3(z,a,x)
if(a.dX(v)!=null)a.h3(v)
t=a.f
if(typeof t!=="number")return t.G()
a.f=t+1
t=a.hy(v)
if(!(t==null))t.ko(a,x)
while(!0){t=w.length!==0?C.a.gB(w):null
if((t==null?t:t.ds(a))!=null){t=w.length!==0?C.a.gB(w):null
t=!J.f(t==null?t:t.f0(a),!0)}else t=!0
if(!t)break
if((w.length!==0?C.a.gB(w):null)==null)break
C.a.hk(w)}if(this.a==null)H.n(new P.z("No description given when executing "+this.k(0)+". You should return it from your world-modifying function."))
y.e=a
y.b=this.a
y.Q=a.f
a.c.l(0,y.C())
return x},
ij:function(a,b,c,d,e){return this.f9(a,b,c,d,!1,e)},
ii:function(a,b,c,d,e){return this.f9(a,b,c,d,e,!1)}},
jN:{"^":"a:0;a",
$1:function(a){return J.f(J.L(a),J.L(this.a))}},
al:{"^":"c7;",
gn:function(a){var z=new Y.aT(H.r([],[Y.aE]),0,P.ai())
z.jd(0,this.gat(),this.b)
return z.df()},
k:function(a){return"EnemyTargetAction<"+this.gat()+"::"+H.d(this.b)+">"}}}],["","",,O,{"^":"",
ww:[function(a){return J.L(a)},"$1","iT",2,0,6],
cQ:{"^":"b;cl:a<,fS:b<,ef:c<,R:d<,hi:e<,f,dE:r<,ke:x<,ht:y<,z,Q",
gv:function(a){var z=this.e
return X.aB([this.d,this.a,X.aB(z==null?new P.iD(0,null,null,null,null,null,0,[null]):P.aw([z],null)),X.aB(this.r),X.aB(this.x),this.y,this.z])},
t:function(a,b){var z
if(b==null)return!1
z=J.l(b)
return!!z.$iscQ&&this.gv(this)===z.gv(b)},
k:function(a){return"ActionRecord<"+H.d(this.c)+", "+H.d(this.b)+", "+H.d(this.a)+">"}},
jL:{"^":"b;a,b,c,d,e,dE:f<,fS:r<,ef:x<,ht:y<,z,R:Q<",
gcl:function(){return this.b},
ghi:function(){return this.a},
C:function(){var z,y,x,w,v,u,t,s,r,q,p,o
z=this.d
switch(z){case C.C:y=this.e.a
break
case C.ag:z=R.ab
y=P.aw(H.r([this.a],[z]),z)
break
default:throw H.c(new P.aJ("Mode "+z.k(0)+" not implemented"))}x=R.dS(P.T)
z=this.e.a
for(w=z.gH(z),z=new H.eB(w,new O.jM(this),[H.o(z,0)]);z.m();){v=w.gw()
x.j(0,v,J.K(v.bU(this.e),this.c.h(0,v)))}z=this.Q
w=this.r
u=this.x
t=this.b
s=J.L(this.a)
r=this.f
r.toString
r=P.aw(new H.bl(r,O.iT(),[H.o(r,0),null]),null)
q=P.aw(new H.bl(y,O.iT(),[H.o(y,0),null]),null)
p=this.y
o=this.z
return new O.cQ(t,w,u,z,s,P.H(null,null,null,P.q),r,q,p,o,x)},
ki:function(a){var z,y,x
this.c=R.dS(P.T)
for(z=a.a,y=new P.az(z,z.r,null,null,[null]),y.c=z.e;y.m();){x=y.d
this.c.j(0,x,x.bU(a))}}},
jM:{"^":"a:0;a",
$1:function(a){var z=this.a.c
return z.gV(z).F(0,a)}},
hh:{"^":"b;a",
k:function(a){return C.ak.h(0,this.a)}}}],["","",,R,{"^":"",ab:{"^":"n8;",
gbL:function(){return this.d>0},
bU:function(a){var z,y,x
z=this.dx
if(z!=null)return z.$2(this,a)
z=a.a
y=[H.o(z,0)]
x=new H.a5(z,new R.jY(this),y).an(0,0,new R.jZ())
if(typeof x!=="number")return H.p(x)
y=new H.a5(z,new R.k_(this),y).an(0,0,new R.k0())
if(typeof y!=="number")return H.p(y)
return 10*this.d+x-y},
ba:function(a){var z=this.c
return z!=null&&z.a===a},
$isbL:1},n8:{"^":"b+e0;"},jY:{"^":"a:0;a",
$1:function(a){return J.f(a.gai(),this.a.db)}},jZ:{"^":"a:20;",
$2:function(a,b){return J.Q(a,2*b.gaG())}},k_:{"^":"a:0;a",
$1:function(a){return a.c0(this.a)}},k0:{"^":"a:20;",
$2:function(a,b){return J.Q(a,b.gaG())}},jO:{"^":"b;aq:c<,J:e@,aG:f@,q:r>,U:z<,n:ch*,I:cy<,ai:db<"},dR:{"^":"bJ;a,b,c,$ti",
gv:function(a){var z=this.gav(this)
return X.aB(P.a6(z,!1,H.A(z,"F",0)))},
t:function(a,b){var z,y
if(b==null)return!1
z=J.l(b)
if(!!z.$isdR){y=this.gav(this)
y=X.aB(P.a6(y,!1,H.A(y,"F",0)))
z=z.gav(b)
z=y===X.aB(P.a6(z,!1,H.A(z,"F",0)))}else z=!1
return z},
$asbJ:function(a){return[P.q,R.ab,a]},
$asR:function(a){return[R.ab,a]},
p:{
dS:function(a){var z=new H.a0(0,null,null,null,null,null,0,[P.q,[B.hz,R.ab,a]])
return new R.dR(new R.jQ(),new R.jR(),z,[a])},
jP:function(a,b){var z=R.dS(b)
a.A(0,new R.td(b,z))
return z}}},jQ:{"^":"a:5;",
$1:function(a){return J.L(a)}},jR:{"^":"a:0;",
$1:function(a){return a!=null}},td:{"^":"a;a,b",
$2:function(a,b){this.b.j(0,a,b)
return b},
$signature:function(){return H.at(function(a){return{func:1,args:[R.ab,a]}},this,"dR")}},ek:{"^":"b;a",
k:function(a){return C.F.h(0,this.a)}},pE:{"^":"ab;a,b,aq:c<,aG:d<,q:e>,f,er:r<,U:x<,y,n:z>,da:Q<,J:ch<,I:cx<,cy,ai:db<,dx",
aM:function(a){var z=new R.cv(null,!0,H.r([],[P.h]),null,null,C.c,1,null,100,!0,!1,P.H(null,null,null,null),null,!0,C.l,$.$get$ff(),null)
z.dy=this
a.$1(z)
return z.C()},
t:function(a,b){var z,y
if(b==null)return!1
if(!(b instanceof R.ab))return!1
if(this.b===b.b){z=this.c
y=b.c
if(z==null?y==null:z===y)if(this.d===b.d){z=this.e
y=b.e
if(z==null?y==null:z===y)if(this.f===b.f)if(this.x===b.x)if(this.y===b.y)if(J.f(this.z,b.z))if(this.Q===b.Q)if(this.ch===b.ch)if(this.cx===b.cx)z=J.f(this.db,b.db)&&J.f(this.dx,b.dx)
else z=!1
else z=!1
else z=!1
else z=!1
else z=!1
else z=!1
else z=!1
else z=!1}else z=!1
else z=!1}else z=!1
return z},
gv:function(a){return Y.aZ(Y.y(Y.y(Y.y(Y.y(Y.y(Y.y(Y.y(Y.y(Y.y(Y.y(Y.y(Y.y(Y.y(Y.y(Y.y(Y.y(0,C.p.gv(!0)),H.aj(this.b)),J.x(this.c)),this.d&0x1FFFFFFF),J.x(this.e)),this.f&0x1FFFFFFF),C.p.gv(!0)),C.p.gv(this.x)),H.aj(this.y)),J.x(this.z)),C.p.gv(this.Q)),H.aj(this.ch)),H.aj(this.cx)),C.z.gv(this.cy)),J.x(this.db)),J.x(this.dx)))},
k:function(a){return"Actor {alreadyMentioned="+String(!0)+",\ncategories="+P.bm(this.b,"[","]")+",\ncurrentWeapon="+J.w(this.c)+",\nhitpoints="+C.k.k(this.d)+",\nid="+J.w(this.e)+",\ninitiative="+C.k.k(this.f)+",\nisActive="+String(!0)+",\nisPlayer="+String(this.x)+",\nitems="+P.bm(this.y,"{","}")+",\nname="+H.d(J.w(this.z))+",\nnameIsProperNoun="+String(this.Q)+",\npose="+H.d(C.F.h(0,this.ch.a))+",\npronoun="+this.cx.a+",\nshield="+C.z.k(this.cy)+",\nteam="+J.w(this.db)+",\nworldScoringFunction="+H.d(J.w(this.dx))+",\n}"}},cv:{"^":"jO;dy,a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx",
gaq:function(){this.gu()
return this.c},
gaG:function(){this.gu()
return this.f},
saG:function(a){this.gu()
this.f=a},
gq:function(a){this.gu()
return this.r},
gU:function(){this.gu()
return this.z},
gn:function(a){this.gu()
return this.ch},
sn:function(a,b){this.gu()
this.ch=b},
gda:function(){this.gu()
return this.cx},
gJ:function(){this.gu()
return this.e},
sJ:function(a){this.gu()
this.e=a},
gI:function(){this.gu()
return this.cy},
gai:function(){this.gu()
return this.db},
gu:function(){var z=this.dy
if(z!=null){z.a
this.a=!0
this.b=this.dy.b
this.c=this.dy.c
this.f=this.dy.d
this.r=this.dy.e
this.x=this.dy.f
this.dy.r
this.y=!0
this.z=this.dy.x
this.Q=this.dy.y
this.ch=this.dy.z
this.cx=this.dy.Q
this.e=this.dy.ch
this.cy=this.dy.cx
this.d=this.dy.cy
this.db=this.dy.db
this.dx=this.dy.dx
this.dy=null}return this},
C:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=this.dy
if(z==null){this.gu()
this.a
this.gu()
y=this.b
this.gu()
x=this.c
this.gu()
w=this.f
this.gu()
v=this.r
this.gu()
u=this.x
this.gu()
this.y
this.gu()
t=this.z
this.gu()
s=this.Q
this.gu()
r=this.ch
this.gu()
q=this.cx
this.gu()
p=this.e
this.gu()
o=this.cy
this.gu()
n=this.d
this.gu()
m=this.db
this.gu()
z=new R.pE(!0,y,x,w,v,u,!0,t,s,r,q,p,o,n,m,this.dx)
if(v==null)H.n(P.J("id"))
if(r==null)H.n(P.J("name"))
if(m==null)H.n(P.J("team"))}this.dy=z
return z}}}],["","",,U,{"^":"",
up:function(a){switch(a){case C.a2:return"spear"
case C.a3:return"branch"
case C.a4:return"tent"
case C.f:return"sword"
default:throw H.c(P.Y(a))}},
e6:{"^":"hv;$ti",
gcl:function(){return U.up(this.a)},
$isbL:1},
hv:{"^":"b+e0;$ti"},
d0:{"^":"b;a",
k:function(a){return C.aj.h(0,this.a)}},
dj:{"^":"e6;b,c,er:d<,ai:e<,n:f>,a",
gq:function(a){return H.aj(this)},
gbL:function(){return!1},
gU:function(){return!1},
gda:function(){return!1},
gI:function(){return C.l},
$ase6:I.X,
$ashv:I.X}}],["","",,K,{"^":"",mW:{"^":"b;a,j9:b<,c"},mX:{"^":"b;"}}],["","",,G,{"^":"",mY:{"^":"b;",
b2:function(){var z=0,y=new P.aP(),x,w=2,v,u=this,t,s
var $async$b2=P.aL(function(a,b){if(a===1){v=b
z=w}while(true)switch(z){case 0:if(u.r==null)throw H.c(new P.z("Cannot run a LoopedEvent before onFinishedGoto is defined."))
if(u.f){u.d.si(0,0)
u.a.$1(u.r)
z=1
break}t=u.d
s=u.e
case 3:if(!!0){z=4
break}if(!(!u.f&&t.gi(t)===0&&s.a.length===0)){z=4
break}z=5
return P.C(u.dl(),$async$b2,y)
case 5:z=3
break
case 4:t=s.a
if(t.length!==0){u.b.$1(t.charCodeAt(0)==0?t:t)
s.a=""}case 1:return P.C(x,0,y)
case 2:return P.C(v,1,y)}})
return P.C(null,$async$b2,y)}}}],["","",,B,{"^":"",fC:{"^":"b;cH:a<,d5:b<,dc:c>"},cl:{"^":"b;cD:a<,b,f3:c<,ku:d<,d5:e<,f,r,x,dc:y>",
gv:function(a){return X.aB([this.a,this.e,this.b,this.d,this.y,this.f,this.r,this.x])},
t:function(a,b){var z
if(b==null)return!1
z=J.l(b)
return!!z.$iscl&&this.gv(this)===z.gv(b)},
k:function(a){var z,y
z=this.a
y=J.l(z)
z="PlanConsequence<"+y.gv(z)+", "+y.k(z)+", "+J.w(this.b)+", "+H.d(this.d)+", "+H.d(this.y)+", "
return z+(this.x?"isSuccess":"")+">"},
f5:function(a,b,c,d,e,f,g,h){this.c.b=this.a.f},
p:{
hA:function(a,b,c,d,e,f,g,h){var z,y
z=b==null
y=z?0:J.Q(b.gdc(b),1)
y=new B.cl(a,c,d,e,z?e:e*b.gd5(),g,f,h,y)
y.f5(a,b,c,d,e,f,g,h)
return y}}}}],["","",,G,{"^":"",jS:{"^":"b;a,b,c,d,e",
jv:function(a,b,c){var z,y,x,w,v,u,t,s
z=H.r([],[P.T])
for(y=J.aC(a),x=null;y.m()===!0;){w=y.gw()
if(w.gd5()>0.3)if(x==null)x=w
else if(J.a2(w.gcH(),x.gcH()))x=w
z.push(J.dK(J.K(w.gcH(),b),w.b))}y=C.a.an(z,0,new G.jW())
v=z.length
if(typeof y!=="number")return y.dr()
if(x==null)u=0
else{t=x.gcH()
s=x.c
if(typeof t!=="number")return t.dr()
if(typeof s!=="number")return H.p(s)
u=t/s}return u+y/v},
eU:function(){var z=this
return new P.cz(function(){var y=0,x=1,w,v,u,t,s
return function $async$eU(a,b){if(a===1){w=b
y=x}while(true)switch(y){case 0:v=z.e,u=v.gV(v),u=u.gH(u),t=1
case 2:if(!u.m()){y=3
break}s=u.gw()
y=4
return""+t+") "+H.d(J.M(s))+"\t"+J.jJ(v.h(0,s),2)
case 4:++t
y=2
break
case 3:return P.cx()
case 1:return P.cy(w)}}})},
dd:function(a,b){var z=0,y=new P.aP(),x=1,w,v=this,u,t,s,r,q,p,o,n,m
var $async$dd=P.aL(function(c,d){if(c===1){w=d
z=x}while(true)switch(z){case 0:u=v.e
u.Y(0)
t=v.b
s=t.a
r=s.a.bb(0,new G.jX(v))
q=r.bU(s)
p=new P.bX(v.dZ(r,s).a(),null,null,null)
case 2:if(!p.m()){z=3
break}o=p.c
n=o==null?p.b:o.gw()
if(!n.a0(r,s)){z=2
break}z=4
return P.C(v.bY(t,n,a,b).aJ(0),$async$dd,y)
case 4:m=d
if(J.fp(m)===!0){u.j(0,n,-1/0)
z=2
break}u.j(0,n,v.jv(m,q,a))
z=2
break
case 3:v.d=!0
return P.C(null,0,y)
case 1:return P.C(w,1,y)}})
return P.C(null,$async$dd,y)},
dZ:function(a,b){return new P.cz(function(){var z=a,y=b
var x=0,w=1,v,u,t,s
return function $async$dZ(c,d){if(c===1){v=d
x=w}while(true)switch(x){case 0:u=y.e
x=2
return P.iA((u.length!==0?C.a.gB(u):null).gci())
case 2:u=(u.length!==0?C.a.gB(u):null).gbj()
t=u.length
s=0
case 3:if(!(s<u.length)){x=5
break}x=6
return P.iA(Q.j3(z,y,u[s]))
case 6:case 4:u.length===t||(0,H.aa)(u),++s
x=3
break
case 5:return P.cx()
case 1:return P.cy(v)}}})},
bY:function(a,b,c,d){var $async$bY=P.aL(function(e,f){switch(e){case 2:u=x
z=u.pop()
break
case 1:v=f
z=w}while(true)switch(z){case 0:s=a.a
r=s.a.bb(0,new G.jT(t))
r.bU(s)
q=P.b2(null,B.cl)
p=P.H(null,null,null,A.aK)
if(!b.a0(r,s)){z=1
break}o=J.l(s)
n=o.gv(s)
for(m=new P.bX(b.d0(r,a,s).a(),null,null,null);m.m();){l=m.c
k=l==null?m.b:l.gw()
if(o.gv(s)!==n)throw H.c(new P.z("Action "+b.k(0)+" modified world state when producing "+H.d(k)+"."))
q.a9(k)}case 3:if(!!q.gD(q)){z=4
break}z=1000*(Date.now()-$.$get$dT().a)>15e3?5:6
break
case 5:z=7
return P.cA(d.$0(),$async$bY,y)
case 7:$.dT=new P.c8(Date.now(),!1)
case 6:j=q.cz()
if(J.bD(J.jn(j),c)){z=4
break}z=j.gcD().e.length===0?8:9
break
case 8:s=j.a
z=10
x=[1]
return P.cA(P.iz(new B.fC(s.a.bb(0,new G.jU(t)).bU(s),j.e,j.y)),$async$bY,y)
case 10:z=3
break
case 9:s=j.a
o=s.e
i=(o.length!==0?C.a.gB(o):null).ds(s)
r=s.a.bb(0,new G.jV(t))
J.f(i,r)
z=11
x=[1]
return P.cA(P.iz(new B.fC(r.bU(s),j.e,j.y)),$async$bY,y)
case 11:for(o=new P.bX(t.dZ(i,s).a(),null,null,null);o.m();){m=o.c
h=m==null?o.b:m.gw()
if(!h.a0(i,s))continue
for(m=new P.bX(h.d0(i,j,s).a(),null,null,null);m.m();){l=m.c
g=l==null?m.b:l.gw();++t.c
if(g.gd5()<0.05)continue
if(p.F(0,g.gcD()))continue
q.a9(g)}}p.l(0,s)
z=3
break
case 4:case 1:return P.cA(null,0,y)
case 2:return P.cA(v,1,y)}})
var z=0,y=P.pW($async$bY),x,w=2,v,u=[],t=this,s,r,q,p,o,n,m,l,k,j,i,h,g
return P.rS(y)}},jW:{"^":"a:3;",
$2:function(a,b){return J.Q(a,b)}},jX:{"^":"a:0;a",
$1:function(a){return J.f(J.L(a),this.a.a)}},jT:{"^":"a:0;a",
$1:function(a){return J.f(J.L(a),this.a.a)}},jU:{"^":"a:0;a",
$1:function(a){return J.f(J.L(a),this.a.a)}},jV:{"^":"a:0;a",
$1:function(a){return J.f(J.L(a),this.a.a)}},ej:{"^":"b;a,ci:b<",
gD:function(a){return this.b.length===0},
p:{
nu:function(a){var z,y,x,w,v,u,t,s,r,q
z={}
if(a.gD(a)){P.a7("WARNING: no recommendations")
return new G.ej([],[])}y=a.gV(a)
x=P.a6(y,!0,H.A(y,"F",0))
C.a.aV(x,"removeWhere")
C.a.ea(x,new G.tt(a),!0)
if(x.length===1)return new G.ej([1000],x)
C.a.cI(x,new G.t8(a))
w=a.gav(a).an(0,1/0,P.u3())
v=a.gav(a).an(0,-1/0,P.u2())
y=J.I(v)
u=J.I(w)
t=u.O(w,J.dK(y.O(v,w),0.1))
z.a=t
if(u.t(w,v)){t=J.K(t,1)
z.a=t
u=t}else u=t
s=y.O(v,u)
r=P.hm(x.length,new G.t9(z,a,x,s),!1,P.aG)
q=new H.am(r,new G.ta(C.a.an(r,0,G.ja())),[null,null]).aN(0,!1)
z=C.a.an(q,0,G.ja())
if(typeof z!=="number")return H.p(z)
u=q.length
y=u-1
if(y<0)return H.e(q,y)
z=J.Q(q[y],1000-z)
if(y>=q.length)return H.e(q,y)
q[y]=z
return new G.ej(q,x)},
vQ:[function(a,b){return J.Q(a,b)},"$2","ja",4,0,7]}},tt:{"^":"a:0;a",
$1:function(a){return J.f(this.a.h(0,a),-1/0)}},t8:{"^":"a:3;a",
$2:function(a,b){var z=this.a
return J.jh(J.cK(z.h(0,a),z.h(0,b)))}},t9:{"^":"a:4;a,b,c,d",
$1:function(a){var z,y
z=this.c
if(a>=z.length)return H.e(z,a)
z=J.K(this.b.h(0,z[a]),this.a.a)
y=this.d
if(typeof z!=="number")return z.dr()
if(typeof y!=="number")return H.p(y)
return z/y}},ta:{"^":"a:0;a",
$1:function(a){var z=this.a
if(typeof a!=="number")return a.dr()
if(typeof z!=="number")return H.p(z)
return C.a5.di(a/z*1000)}}}],["","",,S,{"^":"",bs:{"^":"b;",
gbj:function(){return C.j},
gci:function(){return C.j},
ds:function(a){return this.bt(this.gR(),a)},
ko:function(a,b){},
hf:function(a,b){},
f0:function(a){return!0}}}],["","",,S,{"^":"",
hF:function(a){var z=$.$get$br().aI(3)
if(z<0||z>=3)return H.e(a,z)
return a[z]},
nJ:function(a,b){var z,y,x,w,v
z=$.$get$br().he()*b
for(y=new H.bO(a,a.gi(a),0,null,[H.A(a,"aH",0)]),x=0,w=0;y.m();){v=y.d
if(typeof v!=="number")return H.p(v)
x+=v
if(x>=z)return w;++w}throw H.c(P.Y("The weights do not add up to total="+b))},
nK:function(a,b){var z,y,x,w,v,u,t
z=$.$get$br().aI(b)
for(y=a.length,x=0,w=0,v=0;u=a.length,v<u;u===y||(0,H.aa)(a),++v){t=a[v]
if(typeof t!=="number")return H.p(t)
x+=t
if(x>=z)return w;++w}throw H.c(P.Y("The weights do not add up to total="+b))},
dc:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=J.S(a)
y=z.bm(a,"{")
if(y!==-1){x=J.K(z.gi(a),1)
if(typeof x!=="number")return H.p(x)
x=y<x}else x=!1
if(x){w=H.r([],[P.q])
w.push(y)
u=y+1
t=null
s=1
while(!0){x=z.gi(a)
if(typeof x!=="number")return H.p(x)
if(!(u<x)){v=null
break}r=z.h(a,u)
x=J.l(r)
if(x.t(r,"{"))++s
else if(x.t(r,"|")&&s===1)w.push(u)
else if(x.t(r,"}")){--s
if(s===0){w.push(u)
v=u
t=v
break}}q=u+1
t=u
u=q}p=w.length-1
if(p>1){o=$.$get$br().aI(p)
z=z.a2(a,0,y)
x=w.length
if(o<0||o>=x)return H.e(w,o)
n=w[o]
m=o+1
if(m>=x)return H.e(w,m)
m=z+H.d(S.dc(C.b.a2(a,n+1,w[m])))
if(typeof v!=="number")return v.G()
n=a.length
m+=C.b.a2(a,v+1,n)
z=m.charCodeAt(0)==0?m:m
if(t===n-1)return z
else return S.dc(z)}else if(t===J.K(z.gi(a),1))return a
else{if(typeof t!=="number")return t.G()
x=t+1
return z.a2(a,0,x)+H.d(S.dc(C.b.bw(a,x)))}}else return a},
cn:function(a,b,c,d){switch($.$get$br().aI(2)){case 0:a.$0()
break
case 1:b.$0()
break
case 2:c.$0()
break
case 4:d.$0()
break}},
nL:function(a){if(a<0||a>1)throw H.c(P.a1(a,0,1,"Probability needs to be within <0,1>.",null))
if(a===0)return!1
if(a===1)return!0
return $.$get$br().he()<a}}],["","",,Y,{"^":"",aE:{"^":"b;aj:a<,ap:b<,aK:c<,kq:d<,e,d1:f@,bq:r<,bo:x<,jK:y<,hM:z<,cC:Q<,ch,kb:cx<,R:cy<",
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
default:throw H.c(P.Y("Invalid key "+H.d(b)+"."))}}},aT:{"^":"b;a,R:b<,c",
geo:function(){return C.a.aC(this.a,new Y.oN())},
bD:function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o){if(b==null||J.f(b,""))return
n=this.b
if((J.ak(b).d7(b,".")||C.b.d7(b,"!")||C.b.d7(b,"?"))&&C.b.cJ(b,P.G("[A-Z]",!0,!1)))o=!0
this.a.push(new Y.aE(b,m,h,j,i,d,k,g,e,!1,o,c,!1,n))},
l:function(a,b){return this.bD(a,b,null,!1,!1,!1,!1,null,null,null,!1,!1,null,null,!1)},
aU:function(a,b,c){return this.bD(a,b,null,!1,!1,!1,!1,null,null,null,!1,!1,null,null,c)},
eg:function(a,b,c){return this.bD(a,b,null,!1,!1,!1,!1,null,null,null,!1,!1,c,null,!1)},
je:function(a,b,c,d){return this.bD(a,b,null,!1,c,!1,!1,null,null,null,!1,!1,d,null,!1)},
a3:function(a,b,c,d,e,f,g,h,i){return this.bD(a,b,null,c,d,!1,e,f,g,null,h,!1,i,null,!1)},
jf:function(a,b,c,d){return this.bD(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,d,null,!1)},
jd:function(a,b,c){return this.bD(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,null,null,!1)},
fT:function(){return this.aU(0,"\n\n",!0)},
d_:function(a,b,c,d,e){var z,y
if(!c.gda()){z=this.c
y=z.h(0,c.gq(c))
if(y==null)y=-1
if(typeof y!=="number")return y.X()
if(typeof e!=="number")return H.p(e)
if(y<e)a=J.c5(a,b,"the "+b)
else{y=J.ak(a)
a=J.cP(c.gn(c),P.G("[aeiouy]",!1,!1))?y.eG(a,b,"an "+b):y.eG(a,b,"a "+b)
z.j(0,c.gq(c),e)}}return a},
em:function(a,b){var z,y,x
if(!this.aQ(a)||!this.aQ(b))return!1
z=this.a
if(a<0||a>=z.length)return H.e(z,a)
if(z[a].gap()!=null){if(b<0||b>=z.length)return H.e(z,b)
y=z[b].gap()==null}else y=!0
if(y)return!1
if(a>=z.length)return H.e(z,a)
if(z[a].gaK()!=null){if(b<0||b>=z.length)return H.e(z,b)
y=z[b].gaK()==null}else y=!0
if(y)return!1
if(a>=z.length)return H.e(z,a)
y=J.L(z[a].gap())
if(b<0||b>=z.length)return H.e(z,b)
x=J.L(z[b].gaK())
if(y==null?x==null:y===x){if(a>=z.length)return H.e(z,a)
y=J.L(z[a].gaK())
if(b>=z.length)return H.e(z,b)
z=J.f(y,J.L(z[b].gap()))}else z=!1
return z},
au:[function(a){var z=J.I(a)
if(z.X(a,0)||z.bs(a,this.a.length))return
else{z=this.a
if(a>>>0!==a||a>=z.length)return H.e(z,a)
return z[a].gaK()}},"$1","gaK",2,0,2],
kp:function(a,b){var z,y
if(!this.aQ(a)||!this.aQ(b))return!1
if(this.em(a,b)&&this.T(a).c0(this.T(b))){z=this.a
if(a>=z.length)return H.e(z,a)
if(z[a].gbq()){if(b<0||b>=z.length)return H.e(z,b)
y=z[b].gbq()}else y=!1
if(y)return!0
if(a>=z.length)return H.e(z,a)
if(z[a].gbo()){if(b<0||b>=z.length)return H.e(z,b)
z=z[b].gbo()}else z=!1
if(z)return!0}z=this.a
if(a>=z.length)return H.e(z,a)
y=z[a].gap()
if(b<0||b>=z.length)return H.e(z,b)
if(this.j_(y,z[b].gap())){if(a>=z.length)return H.e(z,a)
if(z[a].gbq()){if(b>=z.length)return H.e(z,b)
y=z[b].gbo()}else y=!1
if(y)return!0
if(a>=z.length)return H.e(z,a)
if(z[a].gbo()){if(b>=z.length)return H.e(z,b)
z=z[b].gbq()}else z=!1
if(z)return!0}return!1},
hj:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
z=this.a
y=C.a.an(z,[],new Y.oO())
C.a.aV(z,"retainWhere")
C.a.ea(z,new Y.oP(y),!1)
x=a&&this.geo()?C.a.bm(z,C.a.h5(z,new Y.oQ()))+1:z.length
if(x<1)return""
for(w=-1,v=!0,u=!1,t=!1,s=0,r="";s<x;++s){q=s===0
if(!q){p=s-1
o=this.em(p,s)
if(s>=z.length)return H.e(z,s)
if(z[s].gd1()||this.kp(s,p)){if(p<0||p>=z.length)return H.e(z,p)
t=!z[p].gd1()}else t=!1
if(s>=z.length)return H.e(z,s)
z[s].sd1(t)
n=s-w
if(n<3)if(!u){if(s>=z.length)return H.e(z,s)
z[s].ghM()
if(p<0||p>=z.length)return H.e(z,p)
if(!z[p].gjK()){if(s>=z.length)return H.e(z,s)
if(!z[s].gcC())if(this.cW(s,p)||o)if(!(t&&n>1)){if(t){if(p>=z.length)return H.e(z,p)
n=z[p].gd1()}else n=!1
n=n||this.kM(s)>4}else n=!0
else n=!0
else n=!0}else n=!0
v=n}else v=!0
else v=!0
if(v){if(p<0||p>=z.length)return H.e(z,p)
if(z[p].gcC()){r+=" "
p=r}else{r+=". "
p=r}if(t){if(s>=z.length)return H.e(z,s)
n=!z[s].gcC()}else n=!1
r=n?r+"But ":p
u=!1}else if(t){r+=S.hF([" but "," but ",", but "])
u=!this.hz(s,s+1)&&!0}else{r+=S.hF([" and "," and ",", and "])
u=!0}}m=this.dC(s)
p=!v
if(p){n=s-1
if(this.cW(s,n))if(J.cP(this.dC(n),"<subject> "))if(J.cP(m,"<subject> "))m=H.je(m,"<subject> ","",0)}l=J.t(m,"<action>",this.dC(s))
if(this.iZ(s,s-1))n=!(this.au(s).gI()===C.l&&this.T(s).gI()===C.l)
else n=!1
if(n)l=J.t(J.t(J.t(J.t(l,"<object-owner's> <object>",this.au(s).gI().b),"<object-ownerPronoun's> <object>",this.au(s).gI().b),"<object>",this.au(s).gI().b),"<object's>",this.au(s).gI().c)
if(this.cW(s,s-1))l=J.t(J.t(J.t(J.t(l,"<owner's> <subject>",this.T(s).gI().a),"<ownerPronoun's> <subject>",this.T(s).gI().a),"<subject>",this.T(s).gI().a),"<subject's>",this.T(s).gI().c)
n=s-1
if(this.au(n)!=null&&this.T(s)!=null&&this.T(n)!=null&&J.f(J.L(this.au(n)),J.L(this.T(s)))&&this.T(n).gI()!==this.T(s).gI())l=J.t(J.t(J.t(J.t(l,"<owner's> <subject>",this.T(s).gI().a),"<ownerPronoun's> <subject>",this.T(s).gI().a),"<subject>",this.T(s).gI().a),"<subject's>",this.T(s).gI().c)
if(this.T(n)!=null)if(this.au(s)!=null){k=J.L(this.T(n))
j=J.L(this.au(s))
n=(k==null?j==null:k===j)&&this.T(n).gI()!==this.T(s).gI()}else n=!1
else n=!1
if(n)l=J.t(J.t(J.t(J.t(l,"<object-owner's> <object>",this.au(s).gI().a),"<object-ownerPronoun's> <object>",this.au(s).gI().a),"<object>",this.au(s).gI().b),"<object's>",this.au(s).gI().c)
if(s>=z.length)return H.e(z,s)
n=z[s]
i=n.gap()
h=n.gaK()
g=n.gkq()
f=n.e
if(i!=null){e=i.gU()?J.t(J.t(l,"<subject>","you"),"<subject's>","your"):l
k=i.gI()===C.I||i.gI()===C.am
j=J.ak(e)
e=J.c5(k?J.t(J.t(J.t(J.t(J.t(j.c2(e,"<s>",""),"<es>",""),"<ies>","y"),"<does>","do"),"<is>","are"),"<has>","have"):J.t(J.t(J.t(J.t(J.t(j.c2(e,"<s>","s"),"<es>","es"),"<ies>","ies"),"<does>","does"),"<is>","is"),"<has>","has"),"<subject>","<subjectNoun>")
j=i.gI()
e=H.cJ(e,"<subject>",j.a)
k=n.cy
e=J.c5(this.d_(e,"<subjectNoun>",i,g,k),"<subjectNoun>",i.gn(i))
j=i.gI()
e=H.cJ(e,"<subjectPronoun>",j.a)
e=J.c5(this.d_(J.cL(l,P.G("<subject>.+<subject's>",!0,!1))===!0?J.t(e,"<subject's>",i.gI().c):e,"<subject's>",i,g,k),"<subject's>",H.d(i.gn(i))+"'s")
k=i.gI()
e=J.t(H.cJ(e,"<subject's>",k.c),"<subjectPronoun's>",i.gI().c)}else e=l
if(h!=null){e=h.gU()?J.t(J.t(e,"<object>","you"),"<object's>","your"):J.t(this.d_(e,"<object>",h,f,n.cy),"<object>",h.gn(h))
e=J.t(e,"<objectPronoun>",h.gI().b)
if(J.cL(l,P.G("<object>.+<object's>",!0,!1))===!0)e=J.t(e,"<object's>",h.gI().c)
e=J.c5(this.d_(e,"<object's>",h,f,n.cy),"<object's>",H.d(h.gn(h))+"'s")
k=h.gI()
e=J.t(H.cJ(e,"<object's>",k.c),"<objectPronoun's>",h.gI().c)}n=n.cy
m=S.dc(this.fD(f,this.fD(g,e,l,"<owner>","<owner's>","<ownerPronoun>","<ownerPronoun's>",n),l,"<object-owner>","<object-owner's>","<object-ownerPronoun>","<object-ownerPronoun's>",n))
r+=H.d((!p||q)&&!t?Y.oM(m):m)
if(v)w=s
if(s>=z.length)return H.e(z,s)
if(z[s].gcC())u=!0}q=x-1
if(q>>>0!==q||q>=z.length)return H.e(z,q)
z=!z[q].gcC()?r+".":r
return H.um(z.charCodeAt(0)==0?z:z,$.$get$hX(),new Y.oR(),null)},
df:function(){return this.hj(!1)},
kz:function(){if(!this.geo()){C.a.si(this.a,0)
return}var z=this.a
C.a.dg(z,0,C.a.bm(z,C.a.h5(z,new Y.oS()))+1)},
hz:function(a,b){var z,y
if(!this.aQ(a)||!this.aQ(b))return!1
if(this.em(a,b)&&this.T(a).c0(this.T(b))){z=this.a
if(a>=z.length)return H.e(z,a)
if(z[a].gbq()){if(b>=z.length)return H.e(z,b)
y=z[b].gbo()}else y=!1
if(y)return!0
if(a>=z.length)return H.e(z,a)
if(z[a].gbo()){if(b>=z.length)return H.e(z,b)
z=z[b].gbq()}else z=!1
if(z)return!0}if(!this.cW(a,b))return!1
z=this.a
if(a>=z.length)return H.e(z,a)
if(z[a].gbq()){if(b>=z.length)return H.e(z,b)
y=z[b].gbq()}else y=!1
if(y)return!0
if(a>=z.length)return H.e(z,a)
if(z[a].gbo()){if(b>=z.length)return H.e(z,b)
z=z[b].gbo()}else z=!1
if(z)return!0
else return!1},
dC:[function(a){var z=J.I(a)
if(z.X(a,0)||z.bs(a,this.a.length))return
else{z=this.a
if(a>>>0!==a||a>=z.length)return H.e(z,a)
return z[a].gaj()}},"$1","gaj",2,0,4],
T:[function(a){var z=J.I(a)
if(z.X(a,0)||z.bs(a,this.a.length))return
else{z=this.a
if(a>>>0!==a||a>=z.length)return H.e(z,a)
return z[a].gap()}},"$1","gap",2,0,2],
kM:function(a){var z,y,x
z=this.a
if(a>=z.length)return H.e(z,a)
if(z[a].gR()!=null){y=a-1
if(this.aQ(y)){if(y<0||y>=z.length)return H.e(z,y)
y=z[y].gR()==null}else y=!0}else y=!0
if(y)return 1000
else{if(a>=z.length)return H.e(z,a)
y=z[a].gR()
x=a-1
if(x<0||x>=z.length)return H.e(z,x)
x=z[x].gR()
if(typeof y!=="number")return y.O()
if(typeof x!=="number")return H.p(x)
return y-x}},
k:function(a){return this.df()},
aQ:function(a){if(a>=this.a.length||a<0)return!1
else return!0},
fD:function(a,b,c,d,e,f,g,h){b=J.t(J.t(J.t(J.t(b,d,""),e,""),f,""),g,"")
return b},
iZ:function(a,b){var z,y
if(!this.aQ(a)||!this.aQ(b))return!1
z=this.a
if(a>=z.length)return H.e(z,a)
if(z[a].gaK()!=null){if(b<0||b>=z.length)return H.e(z,b)
y=z[b].gaK()==null}else y=!0
if(y)return!1
if(a>=z.length)return H.e(z,a)
y=J.L(z[a].gaK())
if(b<0||b>=z.length)return H.e(z,b)
return J.f(y,J.L(z[b].gaK()))},
cW:function(a,b){var z,y
if(!this.aQ(a)||!this.aQ(b))return!1
z=this.a
if(a>=z.length)return H.e(z,a)
if(z[a].gap()!=null){if(b<0||b>=z.length)return H.e(z,b)
y=z[b].gap()==null}else y=!0
if(y)return!1
if(a>=z.length)return H.e(z,a)
y=J.L(z[a].gap())
if(b<0||b>=z.length)return H.e(z,b)
z=J.L(z[b].gap())
return y==null?z==null:y===z},
j_:function(a,b){if(a==null||b==null)return!1
return J.f(a.gai(),b.gai())},
p:{
oM:function(a){var z,y
z=J.S(a)
if(z.F(a,"\n\n")!==!0)a=z.kR(a)
z=J.S(a)
if(z.gD(a)===!0)return a
y=J.jK(z.h(a,0))
if(J.f(z.gi(a),1))return y
else return y+z.bw(a,1)}}},oN:{"^":"a:0;",
$1:function(a){return J.f(a.gaj(),"\n\n")}},oO:{"^":"a:41;",
$2:function(a,b){var z,y
z=J.S(a)
y=z.gZ(a)?z.gB(a):null
if(y!=null)y.gkb()
z.l(a,b)
return a}},oP:{"^":"a:42;a",
$1:function(a){return J.cL(this.a,a)}},oQ:{"^":"a:0;",
$1:function(a){return J.f(a.gaj(),"\n\n")}},oR:{"^":"a:43;",
$1:function(a){return H.d(a.h(0,1))+H.d(a.h(0,2))+H.d(a.h(0,3))}},oS:{"^":"a:0;",
$1:function(a){return J.f(a.gaj(),"\n\n")}},bL:{"^":"n9;da:a<,n:b>,c,ai:d<,U:e<,I:f<",
gq:function(a){return H.aj(this)},
ger:function(){return!0},
gbL:function(){return!0}},n9:{"^":"b+e0;"},e0:{"^":"b;",
gcr:function(){if(this.gbL()){this.ger()
var z=!0}else z=!1
return z},
c0:function(a){var z,y
z=this.gai()
y=$.$get$bB()
if(J.f(z,y)||J.f(a.gai(),y))return!1
return!J.f(this.gai(),a.gai())},
b1:function(a,b,c,d,e,f,g,h){a.a3(0,b,c,d,e,f,g,h,H.c2(this,"$isbL"))},
bO:function(a,b,c){return this.b1(a,b,!1,!1,!1,c,null,!1)},
kE:function(a,b,c,d){return this.b1(a,b,c,!1,!1,null,null,d)},
b0:function(a,b){return this.b1(a,b,!1,!1,!1,null,null,!1)},
eH:function(a,b,c){return this.b1(a,b,!1,!1,!1,null,null,c)},
dh:function(a,b,c,d){return this.b1(a,b,c,!1,!1,d,null,!1)},
bN:function(a,b,c){return this.b1(a,b,!1,!1,c,null,null,!1)},
bP:function(a,b,c,d){return this.b1(a,b,!1,!1,!1,c,null,d)},
kF:function(a,b,c,d){return this.b1(a,b,!1,c,d,null,null,!1)},
kD:function(a,b,c){return this.b1(a,b,!1,c,!1,null,null,!1)},
kG:function(a,b,c,d){return this.b1(a,b,!1,!1,c,d,null,!1)}},cm:{"^":"b;a,b,c,d",
k:function(a){return this.a}}}],["","",,L,{"^":"",tp:{"^":"a:0;",
$1:function(a){a.gcg().b=2
return 2}},to:{"^":"a:0;",
$1:function(a){a.gcg().b=0
return 0}},tr:{"^":"a:0;",
$1:function(a){a.gcg().b=1
return 1}},i2:{"^":"b;"},pM:{"^":"i2;q:a>",
aM:function(a){var z=new L.i3(null,null)
z.a=this
a.$1(z)
return z.C()},
t:function(a,b){var z,y
if(b==null)return!1
if(!(b instanceof L.i2))return!1
z=this.a
y=b.a
return z==null?y==null:z===y},
gv:function(a){return Y.aZ(Y.y(0,J.x(this.a)))},
k:function(a){return"Team {id="+J.w(this.a)+",\n}"},
p:{
eC:function(a){var z=new L.i3(null,null)
a.$1(z)
return z.C()}}},i3:{"^":"b;a,b",
gq:function(a){return this.gcg().b},
gcg:function(){var z=this.a
if(z!=null){this.b=z.a
this.a=null}return this},
C:function(){var z,y
z=this.a
if(z==null){y=this.gcg().b
z=new L.pM(y)
if(y==null)H.n(P.J("id"))}this.a=z
return z}}}],["","",,X,{"^":"",
iU:function(a,b){return new P.cz(function(){var z=a,y=b
var x=0,w=1,v,u,t,s,r,q
return function $async$iU(c,d){if(c===1){v=d
x=w}while(true)switch(x){case 0:u=z.a
t=new J.bh(u,u.length,0,null,[H.o(u,0)])
u=y.a
s=new J.bh(u,u.length,0,null,[H.o(u,0)])
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
case 3:return P.cx()
case 1:return P.cy(v)}}})}}],["","",,A,{"^":"",aK:{"^":"b;ja:a<,b,c,d,e,R:f<",
gv:function(a){var z,y,x,w
z=X.aB(this.a)
y=X.aB(this.c)
x=X.aB(this.e)
w=this.f
return X.eU(X.bw(X.bw(X.bw(X.bw(0,z&0x1FFFFFFF),y&0x1FFFFFFF),x&0x1FFFFFFF),J.x(w)))},
t:function(a,b){var z
if(b==null)return!1
z=J.l(b)
return!!z.$isaK&&this.gv(this)===z.gv(b)},
h3:function(a){var z,y,x
z=this.dX(a)
if(z==null)throw H.c(new P.z("Tried to elapseSituationTime of situation id="+H.d(a)+" that doesn't exist in situations ("+H.d(this.e)+")."))
y=this.e
if(z!==(z|0)||z>=y.length)return H.e(y,z)
x=y[z].bl()
if(z!==(z|0)||z>=y.length)return H.e(y,z)
y[z]=x},
bl:function(){var z=this.f
if(typeof z!=="number")return z.G()
this.f=z+1},
a1:function(a){return this.a.bb(0,new A.pD(a))},
hy:function(a){var z,y
z=this.dX(a)
if(z==null)return
y=this.e
if(z!==(z|0)||z>=y.length)return H.e(y,z)
return y[z]},
cw:function(a){var z=this.e
while(!0){if(!(z.length!==0&&!J.f(J.M(C.a.gB(z)),a)))break
C.a.hk(z)}if(z.length===0)throw H.c(P.Y("Tried to pop situations until "+a+" but none was found in stack."))},
k:function(a){var z,y
z=this.a
y=z.fB()
y.K(0,z)
return"World<"+P.bm(y,"{","}")+">"},
aP:function(a,b){var z,y,x
z=this.a1(a)
y=z.aM(b)
x=this.a
x.E(0,z)
x.l(0,y)},
dX:function(a){var z,y,x
y=this.e
x=0
while(!0){if(!(x<y.length)){z=null
break}if(J.f(J.L(y[x]),a)){z=x
break}++x}return z},
i9:function(a){var z
this.a.K(0,a.a)
z=a.c
this.c.K(0,new H.bl(z,new A.pB(),[H.o(z,0),null]))
this.b.K(0,a.b)
z=a.d
this.d.K(0,new H.bl(z,new A.pC(),[H.o(z,0),null]))
C.a.K(this.e,a.e)
this.f=a.f},
p:{
io:function(a){var z,y
z=P.H(null,null,null,R.ab)
y=P.H(null,null,null,O.cQ)
y=new A.aK(z,P.H(null,null,null,U.e6),y,P.H(null,null,null,null),[],null)
y.i9(a)
return y}}},pB:{"^":"a:0;",
$1:function(a){var z,y,x,w,v,u,t,s,r,q,p
z=a.gR()
y=a.gfS()
x=a.gef()
w=a.gcl()
v=a.ghi()
u=P.q
t=P.aw(a.gdE(),u)
s=P.aw(a.gke(),u)
r=a.y
q=a.z
p=R.jP(a.Q,P.T)
return new O.cQ(w,y,x,z,v,P.H(null,null,null,u),t,s,r,q,p)}},pC:{"^":"a:0;",
$1:function(a){var z=a.gj9()
return new K.mW(P.aw(a.a,K.mX),z,a.c)}},pD:{"^":"a:0;a",
$1:function(a){return J.f(J.L(a),this.a)}}}],["","",,S,{"^":"",
fG:function(a,b){var z=new S.dY(null,null,null,null,null)
new S.tf(a,b).$1(z)
return z.C()},
fF:{"^":"bs;",
gbj:function(){return[G.tx()]},
gci:function(){return[$.$get$ei()]},
gn:function(a){return"CounterAttackSituation"},
bl:function(){var z=new S.dY(null,null,null,null,null)
z.a=this
new S.ko().$1(z)
return z.C()},
bt:function(a,b){if(a===0)return b.a1(this.a)
return},
bu:function(a,b){return new H.a5(a,new S.kp(this),[H.o(a,0)])}},
tf:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$be().aI(1073741823)
a.gaw().c=z
a.gaw().e=0
z=this.a
z=z.gq(z)
a.gaw().b=z
z=J.L(this.b)
a.gaw().d=z
return a}},
ko:{"^":"a:0;",
$1:function(a){var z=a.gaw().e
if(typeof z!=="number")return z.G()
a.gaw().e=z+1
return a}},
kp:{"^":"a:0;a",
$1:function(a){var z,y
z=J.u(a)
y=this.a
return J.f(z.gq(a),y.a)||J.f(z.gq(a),y.c)}},
pF:{"^":"fF;a,q:b>,c,R:d<",
aM:function(a){var z=new S.dY(null,null,null,null,null)
z.a=this
a.$1(z)
return z.C()},
t:function(a,b){var z,y
if(b==null)return!1
if(!(b instanceof S.fF))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
if(z==null?y==null:z===y)if(J.f(this.c,b.c)){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1}else z=!1
return z},
gv:function(a){return Y.aZ(Y.y(Y.y(Y.y(Y.y(0,J.x(this.a)),J.x(this.b)),J.x(this.c)),J.x(this.d)))},
k:function(a){return"CounterAttackSituation {counterAttacker="+J.w(this.a)+",\nid="+J.w(this.b)+",\ntarget="+H.d(J.w(this.c))+",\ntime="+J.w(this.d)+",\n}"}},
dY:{"^":"b;a,b,c,d,e",
gq:function(a){return this.gaw().c},
gR:function(){return this.gaw().e},
gaw:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
C:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gaw().b
x=this.gaw().c
w=this.gaw().d
v=this.gaw().e
z=new S.pF(y,x,w,v)
if(y==null)H.n(P.J("counterAttacker"))
if(x==null)H.n(P.J("id"))
if(w==null)H.n(P.J("target"))
if(v==null)H.n(P.J("time"))}this.a=z
return z}}}],["","",,G,{"^":"",kq:{"^":"al;b,a",
gat:function(){return"swing back at <object>"},
al:[function(a,b,c){a.b0(c,"<subject> tr<ies> to swing back")
a.toString
c.a3(0,"<subject> {go<es> wide|miss<es>}",!0,!1,!1,null,null,!1,a)
if(a.gJ()===C.c){b.aP(a.e,new G.kr())
c.a3(0,"<subject> lose<s> balance because of that",!1,!0,!0,null,null,!1,a)}return H.d(a.z)+" fails to swing back at "+H.d(J.M(this.b))},"$3","gae",6,0,0],
am:[function(a,b,c){var z,y
z=this.b
a.bO(c,"<subject> swing<s> back at <object>",z)
y=b.e
C.a.l(y,M.hQ(a,z))
C.a.l(y,L.hO(a,z))
return H.d(a.gn(a))+" swings back at "+H.d(J.M(z))},"$3","gaf",6,0,0],
ab:function(a,b){return this.b.gJ()===C.c?0.7:0.9},
a0:function(a,b){return a.ba(C.f)},
p:{
uA:[function(a){return new G.kq(a,null)},"$1","tx",2,0,1]}},kr:{"^":"a:0;",
$1:function(a){a.sJ(C.i)
return a}}}],["","",,X,{"^":"",
jc:function(a,b){switch($.$get$iM().aI(3)){case 0:b.kF(a,"<subject> collapse<s>, dead",!0,!0)
break
case 1:b.bN(a,"<subject> fall<s> backward",!0)
b.toString
a.a3(0,"<subject> twist<s>",!1,!1,!0,null,null,!1,b)
a.a3(0,"<subject> hit<s> the ground face down",!1,!0,!0,null,null,!1,b)
break
case 2:b.bN(a,"<subject> drop<s> to <subject's> knees",!0)
b.toString
a.a3(0,"<subject> keel<s> over",!1,!1,!0,null,null,!1,b)
break}a.aU(0,"\n\n",!0)}}],["","",,X,{"^":"",kB:{"^":"al;b,a",
gat:function(){return"step back and parry"},
al:[function(a,b,c){a.b0(c,"<subject> tr<ies> to {parry|deflect it|meet it with <subject's> "+a.gaq().f+"|fend it off}")
if(a.ch===C.i)c.a3(0,"<subject> <is> out of balance",!0,!1,!1,null,null,!1,a)
else S.cn(new X.kC(a,c),new X.kD(this,a,c),null,null)
return H.d(a.z)+" fails to dodge "+H.d(J.M(this.b))},"$3","gae",6,0,0],
am:[function(a,b,c){if(a.gU())a.b0(c,"<subject> {step<s>|take<s> a step} back")
a.eH(c,"<subject> {parr<ies> it|deflect<s> it|meet<s> it with <subject's> "+a.gaq().f+"|fend<s> it off}",!0)
if(a.ch!==C.c){b.aP(a.e,new X.kE())
if(a.x)c.a3(0,"<subject> regain<s> balance",!1,!1,!1,null,null,!1,a)}b.cw("FightSituation")
return H.d(a.z)+" steps back and parries "+H.d(J.M(this.b))},"$3","gaf",6,0,0],
ab:function(a,b){if(a.gU())return 1
return 0.5-(a.gJ()===C.c?0:0.2)},
a0:function(a,b){return a.ba(C.f)},
p:{
uC:[function(a){return new X.kB(a,null)},"$1","tz",2,0,1]}},kC:{"^":"a:1;a,b",
$0:function(){this.b.a3(0,"<subject> {fail<s>|<does>n't succeed}",!0,!1,!1,null,null,!1,this.a)
return}},kD:{"^":"a:1;a,b,c",
$0:function(){return this.a.b.dh(this.c,"<subject> <is> too quick for <object>",!0,this.b)}},kE:{"^":"a:0;",
$1:function(a){a.sJ(C.c)
return a}}}],["","",,F,{"^":"",kM:{"^":"al;b,a",
gat:function(){return"dodge and counter"},
al:[function(a,b,c){a.b0(c,"<subject> tr<ies> to {dodge|sidestep}")
if(a.gJ()===C.i)c.a3(0,"<subject> <is> out of balance",!0,!1,!1,null,null,!1,a)
else S.cn(new F.kN(a,c),new F.kO(this,a,c),null,null)
return H.d(a.z)+" fails to dodge "+H.d(J.M(this.b))},"$3","gae",6,0,0],
am:[function(a,b,c){var z=this.b
a.bP(c,"<subject> {dodge<s>|sidestep<s>} it",z,!0)
if(z.gJ()===C.c){z.kD(c,"<subject> lose<s> balance because of that",!0)
b.aP(z.e,new F.kP())}b.cw("FightSituation")
if(a.gU())c.l(0,"this opens an opportunity for a counter attack")
C.a.l(b.e,S.fG(a,z))
return H.d(a.gn(a))+" dodges "+H.d(z.gn(z))},"$3","gaf",6,0,0],
ab:function(a,b){var z=a.gJ()===C.c?0:0.2
if(a.gU())return 0.7-z
return 0.4-z},
a0:function(a,b){return a.gJ()!==C.n},
p:{
uE:[function(a){return new F.kM(a,null)},"$1","tA",2,0,1]}},kN:{"^":"a:1;a,b",
$0:function(){this.b.a3(0,"<subject> {can't|fail<s>|<does>n't succeed}",!0,!1,!1,null,null,!1,this.a)
return}},kO:{"^":"a:1;a,b,c",
$0:function(){return this.a.b.dh(this.c,"<subject> <is> too quick for <object>",!0,this.b)}},kP:{"^":"a:0;",
$1:function(a){a.sJ(C.i)
return C.i}}}],["","",,U,{"^":"",
lc:function(a,b){var z=new U.d_(null,null,null,null,null,null)
new U.tq(a,b).$1(z)
return z.C()},
fZ:{"^":"bs;",
gbj:function(){return[Y.tU(),Y.ue(),T.ug()]},
gci:function(){return H.r([$.$get$hI(),$.$get$hU()],[Q.c7])},
gn:function(a){return"FightSituation"},
bl:function(){var z=new U.d_(null,null,null,null,null,null)
z.a=this
new U.ld().$1(z)
return z.C()},
bt:function(a,b){var z,y,x
z=X.iU(this.d,this.a)
y=H.A(z,"F",0)
x=P.a6(new H.a5(z,new U.le(b),[y]),!1,y)
y=x.length
if(typeof a!=="number")return a.eW()
return b.a1(x[C.k.eW(a,y)])},
bu:function(a,b){return new H.a5(a,new U.lf(this),[H.o(a,0)])},
hf:function(a,b){var z,y
z=this.e
y=this.b.a
if(y.M(0,z))y.h(0,z).$2(a,b)},
f0:function(a){var z,y
z=new U.lg(a)
y=this.d
if(z.$1(y)===!0)if(z.$1(this.a)===!0){z=y.a
z=(z&&C.a).aC(z,new U.li(a))}else z=!1
else z=!1
return z}},
tq:{"^":"a:0;a,b",
$1:function(a){var z,y,x
z=$.$get$be().aI(1073741823)
a.gac().d=z
a.gac().f=0
z=a.gac()
y=z.e
if(y==null){y=new S.bn(null,null,[P.q])
y.b5()
y.ah(0,C.j)
z.e=y
z=y}else z=y
y=[null,null]
z.ah(0,new H.am(this.a,new U.rx(),y))
z=a.gac()
x=z.b
if(x==null){x=new S.bn(null,null,[P.q])
x.b5()
x.ah(0,C.j)
z.b=x
z=x}else z=x
z.ah(0,new H.am(this.b,new U.ry(),y))
return a}},
rx:{"^":"a:0;",
$1:function(a){return J.L(a)}},
ry:{"^":"a:0;",
$1:function(a){return J.L(a)}},
ld:{"^":"a:0;",
$1:function(a){var z=a.gac().f
if(typeof z!=="number")return z.G()
a.gac().f=z+1
return a}},
le:{"^":"a:0;a",
$1:function(a){return this.a.a1(a).gcr()}},
lf:{"^":"a:5;a",
$1:function(a){var z,y,x
if(a.gcr()){z=this.a
y=a.gq(a)
x=z.d.a
if(!(x&&C.a).F(x,y)){y=a.gq(a)
z=z.a.a
y=(z&&C.a).F(z,y)
z=y}else z=!0}else z=!1
return z}},
lg:{"^":"a:44;a",
$1:function(a){var z=a.a
return(z&&C.a).aC(z,new U.lh(this.a))}},
lh:{"^":"a:0;a",
$1:function(a){return this.a.a1(a).gcr()}},
li:{"^":"a:45;a",
$1:function(a){var z=this.a.a1(a)
return z.gU()&&z.gcr()}},
pG:{"^":"fZ;a,b,q:c>,d,R:e<",
aM:function(a){var z=new U.d_(null,null,null,null,null,null)
z.a=this
a.$1(z)
return z.C()},
t:function(a,b){var z,y
if(b==null)return!1
if(!(b instanceof U.fZ))return!1
if(J.f(this.a,b.a))if(J.f(this.b,b.b)){z=this.c
y=b.c
if(z==null?y==null:z===y)if(J.f(this.d,b.d)){z=this.e
y=b.e
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1}else z=!1
else z=!1
return z},
gv:function(a){return Y.aZ(Y.y(Y.y(Y.y(Y.y(Y.y(0,J.x(this.a)),J.x(this.b)),J.x(this.c)),J.x(this.d)),J.x(this.e)))},
k:function(a){return"FightSituation {enemyTeamIds="+J.w(this.a)+",\nevents="+J.w(this.b)+",\nid="+J.w(this.c)+",\nplayerTeamIds="+J.w(this.d)+",\ntime="+J.w(this.e)+",\n}"}},
d_:{"^":"b;a,b,c,d,e,f",
gq:function(a){return this.gac().d},
gR:function(){return this.gac().f},
gac:function(){var z,y
z=this.a
if(z!=null){z=z.a
if(!(z==null)){y=new S.bn(null,null,[H.o(z,0)])
y.b5()
y.ah(0,z)
z=y}this.b=z
z=this.a.b
if(!(z==null)){y=new A.cj(null,null,[H.o(z,0),H.o(z,1)])
y.bx()
y.ah(0,z)
z=y}this.c=z
z=this.a
this.d=z.c
z=z.d
if(!(z==null)){y=new S.bn(null,null,[H.o(z,0)])
y.b5()
y.ah(0,z)
z=y}this.e=z
this.f=this.a.e
this.a=null}return this},
C:function(){var z,y,x,w,v,u
z=this.a
if(z==null){y=this.gac()
x=y.b
if(x==null){x=new S.bn(null,null,[P.q])
x.b5()
x.ah(0,C.j)
y.b=x
y=x}else y=x
y=y==null?y:y.C()
x=this.gac()
w=x.c
if(w==null){w=new A.cj(null,null,[P.q,{func:1,v:true,args:[A.aK,Y.aT]}])
w.bx()
w.ah(0,C.v)
x.c=w
x=w}else x=w
x=x==null?x:x.C()
w=this.gac().d
v=this.gac()
u=v.e
if(u==null){u=new S.bn(null,null,[P.q])
u.b5()
u.ah(0,C.j)
v.e=u
v=u}else v=u
v=v==null?v:v.C()
u=this.gac().f
z=new U.pG(y,x,w,v,u)
if(y==null)H.n(P.J("enemyTeamIds"))
if(x==null)H.n(P.J("events"))
if(w==null)H.n(P.J("id"))
if(v==null)H.n(P.J("playerTeamIds"))
if(u==null)H.n(P.J("time"))}this.a=z
return z}}}],["","",,Y,{"^":"",hg:{"^":"al;b,a",
gat:function(){return"kick <object>"},
al:[function(a,b,c){var z=this.b
a.bO(c,"<subject> kick<s> <object>",z)
if(z.gJ()===C.c){if(a.gU())z.kG(c,"<subject> lose<s> <object>",!0,$.$get$f2())
b.aP(z.gq(z),new Y.mD())}if(b.a1(z.gq(z)).gJ()===C.i)C.a.l(b.e,U.na(z,a))
return H.d(a.gn(a))+" kicks "+H.d(z.gn(z))+" off balance"},"$3","gae",6,0,0],
am:[function(a,b,c){var z=this.b
if(z.gJ()===C.c||z.gJ()===C.i){S.cn(new Y.mE(this,a,c),new Y.mF(this,a,c),null,null)
b.aP(z.gq(z),new Y.mG())}else a.bO(c,"<subject> kick<s> <object> on the ground",z)
return H.d(J.M(a))+" kicks "+H.d(z.gn(z))},"$3","gaf",6,0,0],
ab:function(a,b){var z=a.gJ()===C.c?0:0.2
if(a.gU())return 0.7-z
return 0.5-z},
a0:function(a,b){return a.gJ()===C.c},
p:{
vj:[function(a){return new Y.hg(a,null)},"$1","tU",2,0,1]}},mD:{"^":"a:0;",
$1:function(a){a.sJ(C.i)
return a}},mE:{"^":"a:1;a,b,c",
$0:function(){var z,y
z=this.c
y=this.a.b
this.b.bO(z,"<subject> kick<s> <object>",y)
if(S.nL(0.5))y.b0(z,"<subject> flail<s> <subject's> arms")
y.bN(z,"<subject> fall<s>{| to the ground}",!0)}},mF:{"^":"a:1;a,b,c",
$0:function(){var z,y
z=this.c
y=this.a.b
this.b.bP(z,"<subject> kick<s> <object> off <object's> feet",y,!0)
if(y.gU())y.bN(z,"<subject> land<s> on the ground",!0)}},mG:{"^":"a:0;",
$1:function(a){a.sJ(C.n)
return a}}}],["","",,U,{"^":"",
na:function(a,b){var z=new U.eg(null,null,null,null,null)
new U.th(a,b).$1(z)
return z.C()},
hw:{"^":"bs;",
gbj:function(){return[A.u4()]},
gci:function(){return[$.$get$ei()]},
gn:function(a){return"OffBalanceOpportunitySituation"},
bl:function(){var z=new U.eg(null,null,null,null,null)
z.a=this
new U.nb().$1(z)
return z.C()},
bt:function(a,b){var z,y,x,w,v
if(typeof a!=="number")return a.ao()
if(a>0)return
z=b.a1(this.a)
y=b.a
x=H.o(y,0)
w=P.a6(new H.a5(y,new U.nc(this,z),[x]),!0,x)
if(w.length===0)return
v=C.a.gN(w)
if(new A.hx(z,null).a0(v,b))return v
return},
bu:function(a,b){return new H.a5(a,new U.nd(b.a1(this.a)),[H.o(a,0)])}},
th:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$be().aI(1073741823)
a.gax().d=z
a.gax().e=0
z=J.L(this.a)
a.gax().b=z
z=this.b
z=z==null?z:z.gq(z)
a.gax().c=z
return a}},
nb:{"^":"a:0;",
$1:function(a){var z=a.gax().e
if(typeof z!=="number")return z.G()
a.gax().e=z+1
return a}},
nc:{"^":"a:5;a,b",
$1:function(a){var z,y
if(a.gcr())if(a.c0(this.b)){z=a.gq(a)
y=this.a.b
y=z==null?y!=null:z!==y
z=y}else z=!1
else z=!1
return z}},
nd:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.f(a,z)||a.c0(z)}},
pH:{"^":"hw;a,b,q:c>,R:d<",
aM:function(a){var z=new U.eg(null,null,null,null,null)
z.a=this
a.$1(z)
return z.C()},
t:function(a,b){var z,y
if(b==null)return!1
if(!(b instanceof U.hw))return!1
if(J.f(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
if(z==null?y==null:z===y){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1}else z=!1
return z},
gv:function(a){return Y.aZ(Y.y(Y.y(Y.y(Y.y(0,J.x(this.a)),J.x(this.b)),J.x(this.c)),J.x(this.d)))},
k:function(a){return"OffBalanceOpportunitySituation {actorId="+H.d(J.w(this.a))+",\nculpritId="+J.w(this.b)+",\nid="+J.w(this.c)+",\ntime="+J.w(this.d)+",\n}"}},
eg:{"^":"b;a,b,c,d,e",
gq:function(a){return this.gax().d},
gR:function(){return this.gax().e},
gax:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
C:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gax().b
x=this.gax().c
w=this.gax().d
v=this.gax().e
z=new U.pH(y,x,w,v)
if(y==null)H.n(P.J("actorId"))
if(w==null)H.n(P.J("id"))
if(v==null)H.n(P.J("time"))}this.a=z
return z}}}],["","",,A,{"^":"",hx:{"^":"al;b,a",
gat:function(){return"stab <object>"},
al:[function(a,b,c){var z=this.b
a.bO(c,"<subject> tr<ies> to stab <object>",z)
a.toString
c.a3(0,"<subject> {go<es> wide|fail<s>|miss<es>}",!0,!1,!1,null,null,!1,a)
return H.d(a.gn(a))+" fails to stab "+H.d(J.M(z))},"$3","gae",6,0,0],
am:[function(a,b,c){var z,y
z=this.b
y=J.u(z)
b.aP(y.gq(z),new A.ne())
if(b.a1(y.gq(z)).gbL()){a.bP(c,"<subject> thrust<s> {|<subject's> "+a.gaq().f+"} deep into <object's> {shoulder|hip|thigh}",z,!0)
z.bN(c,"<subject> {scream|yell|grunt}<s> in pain",!0)}else{a.bP(c,"<subject> {stab<s>|run<s> <subject's> "+a.gaq().f+" through} <object>",z,!0)
X.jc(c,z)}return H.d(J.M(a))+" stabs "+H.d(y.gn(z))},"$3","gaf",6,0,0],
ab:function(a,b){if(a.gU())return 0.6
return 0.5},
a0:function(a,b){return a.gJ()===C.c&&this.b.gJ()===C.i&&a.ba(C.f)},
p:{
vI:[function(a){return new A.hx(a,null)},"$1","u4",2,0,1]}},ne:{"^":"a:0;",
$1:function(a){a.saG(a.gaG()-1)
return a}}}],["","",,V,{"^":"",
nf:function(a,b){var z=new V.eh(null,null,null,null,null)
new V.tb(a,b).$1(z)
return z.C()},
hy:{"^":"bs;",
gbj:function(){return[K.u5(),Y.u8()]},
gn:function(a){return"OnGroundDefenseSituation"},
bl:function(){var z=new V.eh(null,null,null,null,null)
z.a=this
new V.ng().$1(z)
return z.C()},
bt:function(a,b){if(a===0)return b.a1(this.c)
return},
bu:function(a,b){return new H.a5(a,new V.nh(this),[H.o(a,0)])}},
tb:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$be().aI(1073741823)
a.gay().c=z
a.gay().e=0
z=this.a
z=z.gq(z)
a.gay().b=z
z=J.L(this.b)
a.gay().d=z
return a}},
ng:{"^":"a:0;",
$1:function(a){var z=a.gay().e
if(typeof z!=="number")return z.G()
a.gay().e=z+1
return a}},
nh:{"^":"a:0;a",
$1:function(a){var z,y
z=J.u(a)
y=this.a
return J.f(z.gq(a),y.a)||J.f(z.gq(a),y.c)}},
pI:{"^":"hy;a,q:b>,c,R:d<",
aM:function(a){var z=new V.eh(null,null,null,null,null)
z.a=this
a.$1(z)
return z.C()},
t:function(a,b){var z,y
if(b==null)return!1
if(!(b instanceof V.hy))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
if(z==null?y==null:z===y)if(J.f(this.c,b.c)){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1}else z=!1
return z},
gv:function(a){return Y.aZ(Y.y(Y.y(Y.y(Y.y(0,J.x(this.a)),J.x(this.b)),J.x(this.c)),J.x(this.d)))},
k:function(a){return"OnGroundDefenseSituation {attacker="+J.w(this.a)+",\nid="+J.w(this.b)+",\ntargetOnGround="+H.d(J.w(this.c))+",\ntime="+J.w(this.d)+",\n}"}},
eh:{"^":"b;a,b,c,d,e",
gq:function(a){return this.gay().c},
gR:function(){return this.gay().e},
gay:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
C:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gay().b
x=this.gay().c
w=this.gay().d
v=this.gay().e
z=new V.pI(y,x,w,v)
if(y==null)H.n(P.J("attacker"))
if(x==null)H.n(P.J("id"))
if(w==null)H.n(P.J("targetOnGround"))
if(v==null)H.n(P.J("time"))}this.a=z
return z}}}],["","",,K,{"^":"",ni:{"^":"al;b,a",
gat:function(){return"parry it"},
al:[function(a,b,c){a.b0(c,"<subject> tr<ies> to {parry|deflect it|stop it{| with <subject's> "+a.gaq().f+"}}")
S.cn(new K.nj(a,c),new K.nk(this,a,c),null,null)
return H.d(a.z)+" fails to parry "+H.d(J.M(this.b))},"$3","gae",6,0,0],
am:[function(a,b,c){a.eH(c,"<subject> {parr<ies> it|stop<s> it with <subject's> "+a.gaq().f+"}",!0)
b.cw("FightSituation")
return H.d(a.z)+" parries "+H.d(J.M(this.b))},"$3","gaf",6,0,0],
ab:function(a,b){if(a.gU())return 0.6
return 0.3},
a0:function(a,b){return a.ba(C.f)},
p:{
vJ:[function(a){return new K.ni(a,null)},"$1","u5",2,0,1]}},nj:{"^":"a:1;a,b",
$0:function(){var z=this.a
z.toString
this.b.a3(0,"<subject> {fail<s>|<does>n't succeed}",!0,!1,!1,null,null,!1,z)
return}},nk:{"^":"a:1;a,b,c",
$0:function(){return this.a.b.dh(this.c,"<subject> <is> too quick for <object>",!0,this.b)}}}],["","",,Y,{"^":"",nS:{"^":"al;b,a",
gat:function(){return"roll out of way"},
al:[function(a,b,c){a.b0(c,"<subject> tr<ies> to roll out of the way")
a.toString
c.a3(0,"<subject> can't",!0,!1,!1,null,null,!1,a)
return H.d(a.gn(a))+" fails to roll out of the way"},"$3","gae",6,0,0],
am:[function(a,b,c){a.kE(c,"<subject> <is> able to roll out of the way",!0,!0)
if(a.gU()){b.aP(a.gq(a),new Y.nT())
c.a3(0,"<subject> jump<s> up on <subject's> feet",!1,!1,!1,null,null,!0,a)}b.cw("FightSituation")
return H.d(a.gn(a))+" rolls out of the way of "+H.d(J.M(this.b))+"'s strike"},"$3","gaf",6,0,0],
ab:function(a,b){if(a.gU())return 1
return 0.5},
a0:function(a,b){return!0},
p:{
vS:[function(a){return new Y.nS(a,null)},"$1","u8",2,0,1]}},nT:{"^":"a:0;",
$1:function(a){a.sJ(C.c)
return a}}}],["","",,T,{"^":"",ln:{"^":"al;b,a",
gat:function(){return"kill <object>"},
al:[function(a,b,c){throw H.c(new P.aJ(null))},"$3","gae",6,0,0],
am:[function(a,b,c){var z,y
z=this.b
y=J.u(z)
b.aP(y.gq(z),new T.lo())
c.jf(0,"<subject> {cuts|slashes|slits} <object's> {throat|neck|side}",z,a.gaq())
z.bN(c,"<subject> die<s>",!0)
c.aU(0,"\n\n",!0)
return H.d(a.gn(a))+" slains "+H.d(y.gn(z))+" on the ground"},"$3","gaf",6,0,0],
ab:function(a,b){return 1},
a0:function(a,b){return this.b.gJ()===C.n&&a.ba(C.f)},
p:{
v5:[function(a){return new T.ln(a,null)},"$1","uf",2,0,1]}},lo:{"^":"a:0;",
$1:function(a){a.saG(0)
return a}},oC:{"^":"al;b,a",
gat:function(){return"strike down at <object>"},
al:[function(a,b,c){throw H.c(new P.aJ(null))},"$3","gae",6,0,0],
am:[function(a,b,c){var z,y
z=this.b
a.bO(c,"<subject> strike<s> down {with <subject's> "+a.gaq().f+" |}at <object>",z)
y=b.e
C.a.l(y,D.pc(a,z))
C.a.l(y,V.nf(a,z))
return H.d(a.z)+" strikes down at "+H.d(J.M(z))+" on the ground"},"$3","gaf",6,0,0],
ab:function(a,b){return 1},
a0:function(a,b){return this.b.gJ()===C.n&&a.ba(C.f)},
p:{
vZ:[function(a){return new T.oC(a,null)},"$1","ug",2,0,1]}}}],["","",,Q,{"^":"",oz:{"^":"c7;a",
gn:function(a){return"Stand up."},
al:[function(a,b,c){throw H.c(new P.aJ(null))},"$3","gae",6,0,0],
am:[function(a,b,c){a.b0(c,"<subject> stand<s> up")
b.aP(a.gq(a),new Q.oA())
return H.d(a.gn(a))+" stands up"},"$3","gaf",6,0,0],
ab:function(a,b){return 1},
a0:function(a,b){var z
if(a.gJ()!==C.n)return!1
z=b.c
if(J.f(z.gB(z).gef(),new H.aI(H.f8(new Y.hg(a,null)),null).k(0))&&z.gB(z).gdE().F(0,a.gq(a))&&z.gB(z).ght()===!0)return!1
return!0}},oA:{"^":"a:0;",
$1:function(a){a.sJ(C.c)
return C.c}}}],["","",,D,{"^":"",
pc:function(a,b){var z=new D.ev(null,null,null,null,null)
new D.tc(a,b).$1(z)
return z.C()},
hZ:{"^":"bs;",
gbj:function(){return[T.uf()]},
gn:function(a){return"StrikeDownSituation"},
bl:function(){var z=new D.ev(null,null,null,null,null)
z.a=this
new D.pd().$1(z)
return z.C()},
bt:function(a,b){if(a===0)return b.a1(this.a)
return},
bu:function(a,b){return new H.a5(a,new D.pe(this),[H.o(a,0)])}},
tc:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$be().aI(1073741823)
a.gaB().c=z
a.gaB().e=0
z=this.a
z=z.gq(z)
a.gaB().b=z
z=J.L(this.b)
a.gaB().d=z
return a}},
pd:{"^":"a:0;",
$1:function(a){var z=a.gaB().e
if(typeof z!=="number")return z.G()
a.gaB().e=z+1
return a}},
pe:{"^":"a:0;a",
$1:function(a){var z,y
z=J.u(a)
y=this.a
return J.f(z.gq(a),y.a)||J.f(z.gq(a),y.c)}},
pL:{"^":"hZ;a,q:b>,c,R:d<",
aM:function(a){var z=new D.ev(null,null,null,null,null)
z.a=this
a.$1(z)
return z.C()},
t:function(a,b){var z,y
if(b==null)return!1
if(!(b instanceof D.hZ))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
if(z==null?y==null:z===y)if(J.f(this.c,b.c)){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1}else z=!1
return z},
gv:function(a){return Y.aZ(Y.y(Y.y(Y.y(Y.y(0,J.x(this.a)),J.x(this.b)),J.x(this.c)),J.x(this.d)))},
k:function(a){return"StrikeDownSituation {attacker="+J.w(this.a)+",\nid="+J.w(this.b)+",\ntargetOnGround="+H.d(J.w(this.c))+",\ntime="+J.w(this.d)+",\n}"}},
ev:{"^":"b;a,b,c,d,e",
gq:function(a){return this.gaB().c},
gR:function(){return this.gaB().e},
gaB:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
C:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gaB().b
x=this.gaB().c
w=this.gaB().d
v=this.gaB().e
z=new D.pL(y,x,w,v)
if(y==null)H.n(P.J("attacker"))
if(x==null)H.n(P.J("id"))
if(w==null)H.n(P.J("targetOnGround"))
if(v==null)H.n(P.J("time"))}this.a=z
return z}}}],["","",,G,{"^":"",np:{"^":"al;b,a",
gat:function(){return"parry and counter"},
al:[function(a,b,c){a.b0(c,"<subject> tr<ies> to {parry|deflect it|meet it with <subject's> "+a.gaq().f+"|fend it off}")
if(a.ch===C.i)c.a3(0,"<subject> <is> out of balance",!0,!1,!1,null,null,!1,a)
else S.cn(new G.nq(a,c),new G.nr(this,a,c),null,null)
return H.d(a.z)+" fails to dodge "+H.d(J.M(this.b))},"$3","gae",6,0,0],
am:[function(a,b,c){var z
a.eH(c,"<subject> {parr<ies> it|meet<s> it with <subject's> "+a.gaq().f+"|fend<s> it off}",!0)
b.cw("FightSituation")
if(a.x)c.l(0,"this opens an opportunity for a counter attack")
z=this.b
C.a.l(b.e,S.fG(a,z))
return H.d(a.z)+" parries "+H.d(J.M(z))},"$3","gaf",6,0,0],
ab:function(a,b){var z=a.gJ()===C.c?0:0.2
if(a.gU())return 0.6-z
return 0.3-z},
a0:function(a,b){return a.ba(C.f)},
p:{
vO:[function(a){return new G.np(a,null)},"$1","u6",2,0,1]}},nq:{"^":"a:1;a,b",
$0:function(){this.b.a3(0,"<subject> {fail<s>|<does>n't succeed}",!0,!1,!1,null,null,!1,this.a)
return}},nr:{"^":"a:1;a,b,c",
$0:function(){return this.a.b.dh(this.c,"<subject> <is> too quick for <object>",!0,this.b)}}}],["","",,F,{"^":"",ns:{"^":"c7;a",
gn:function(a){return"Stand off."},
al:[function(a,b,c){throw H.c(new P.aJ(null))},"$3","gae",6,0,0],
am:[function(a,b,c){if(a.gU())a.b0(c,"<subject> stand<s> off")
return H.d(a.gn(a))+" passes the opportunity"},"$3","gaf",6,0,0],
ab:function(a,b){return 1},
a0:function(a,b){return!0}}}],["","",,B,{"^":"",nQ:{"^":"c7;a",
gn:function(a){return"Regain balance."},
al:[function(a,b,c){throw H.c(new P.aJ(null))},"$3","gae",6,0,0],
am:[function(a,b,c){if(a.gU())a.bP(c,"<subject> regain<s> <object>",$.$get$f2(),!0)
b.aP(a.gq(a),new B.nR())
return H.d(a.gn(a))+" regains balance"},"$3","gaf",6,0,0],
ab:function(a,b){return 1},
a0:function(a,b){return a.gJ()===C.i}},nR:{"^":"a:0;",
$1:function(a){a.sJ(C.c)
return C.c}}}],["","",,Y,{"^":"",lm:{"^":"al;b,a",
gat:function(){return"kill <object>"},
al:[function(a,b,c){throw H.c(new P.aJ(null))},"$3","gae",6,0,0],
am:[function(a,b,c){var z,y
z=this.b
y=J.u(z)
b.aP(y.gq(z),new Y.lp())
if(b.a1(y.gq(z)).gbL()){a.bP(c,"<subject> {slash<es>|cut<s>} <object's> {shoulder|abdomen|thigh}",z,!0)
z.bN(c,"<subject> {scream|yell|grunt}<s> in pain",!0)}else{a.bP(c,"<subject> {slash<es>|cut<s>} {across|through} <object's> {neck|abdomen|lower body}",z,!0)
X.jc(c,z)}return H.d(J.M(a))+" slains "+H.d(y.gn(z))},"$3","gaf",6,0,0],
ab:function(a,b){return 1},
a0:function(a,b){return a.ba(C.f)},
p:{
v6:[function(a){return new Y.lm(a,null)},"$1","ud",2,0,1]}},lp:{"^":"a:0;",
$1:function(a){a.saG(a.gaG()-1)
return a}},oB:{"^":"al;b,a",
gat:function(){return"swing at <object>"},
al:[function(a,b,c){throw H.c(new P.aJ(null))},"$3","gae",6,0,0],
am:[function(a,b,c){var z,y
z=this.b
a.bO(c,"<subject> swing<s> {<subject's> "+a.gaq().f+" |}at <object>",z)
y=b.e
C.a.l(y,M.hQ(a,z))
C.a.l(y,L.hO(a,z))
return H.d(a.z)+" slashes at "+H.d(J.M(z))},"$3","gaf",6,0,0],
ab:function(a,b){return 1},
a0:function(a,b){return a.gJ()===C.c&&this.b.gJ()!==C.n&&a.ba(C.f)},
p:{
w_:[function(a){return new Y.oB(a,null)},"$1","ue",2,0,1]}}}],["","",,L,{"^":"",
hO:function(a,b){var z=new L.ep(null,null,null,null,null)
new L.te(a,b).$1(z)
return z.C()},
hN:{"^":"bs;",
gbj:function(){return[F.tA(),G.u6(),X.tz()]},
gn:function(a){return"SlashDefenseSituation"},
bl:function(){var z=new L.ep(null,null,null,null,null)
z.a=this
new L.ot().$1(z)
return z.C()},
bt:function(a,b){if(a===0)return b.a1(this.c)
return},
bu:function(a,b){return new H.a5(a,new L.ou(this),[H.o(a,0)])}},
te:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$be().aI(1073741823)
a.gaz().c=z
a.gaz().e=0
z=this.a
z=z.gq(z)
a.gaz().b=z
z=J.L(this.b)
a.gaz().d=z
return a}},
ot:{"^":"a:0;",
$1:function(a){var z=a.gaz().e
if(typeof z!=="number")return z.G()
a.gaz().e=z+1
return a}},
ou:{"^":"a:0;a",
$1:function(a){var z,y
z=J.u(a)
y=this.a
return J.f(z.gq(a),y.a)||J.f(z.gq(a),y.c)}},
pJ:{"^":"hN;a,q:b>,c,R:d<",
aM:function(a){var z=new L.ep(null,null,null,null,null)
z.a=this
a.$1(z)
return z.C()},
t:function(a,b){var z,y
if(b==null)return!1
if(!(b instanceof L.hN))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
if(z==null?y==null:z===y)if(J.f(this.c,b.c)){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1}else z=!1
return z},
gv:function(a){return Y.aZ(Y.y(Y.y(Y.y(Y.y(0,J.x(this.a)),J.x(this.b)),J.x(this.c)),J.x(this.d)))},
k:function(a){return"SlashDefenseSituation {attacker="+J.w(this.a)+",\nid="+J.w(this.b)+",\ntarget="+H.d(J.w(this.c))+",\ntime="+J.w(this.d)+",\n}"}},
ep:{"^":"b;a,b,c,d,e",
gq:function(a){return this.gaz().c},
gR:function(){return this.gaz().e},
gaz:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
C:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gaz().b
x=this.gaz().c
w=this.gaz().d
v=this.gaz().e
z=new L.pJ(y,x,w,v)
if(y==null)H.n(P.J("attacker"))
if(x==null)H.n(P.J("id"))
if(w==null)H.n(P.J("target"))
if(v==null)H.n(P.J("time"))}this.a=z
return z}}}],["","",,M,{"^":"",
hQ:function(a,b){var z=new M.eq(null,null,null,null,null)
new M.tg(a,b).$1(z)
return z.C()},
hP:{"^":"bs;",
gbj:function(){return[Y.ud()]},
gn:function(a){return"SlashSituation"},
bl:function(){var z=new M.eq(null,null,null,null,null)
z.a=this
new M.ov().$1(z)
return z.C()},
bt:function(a,b){if(a===0)return b.a1(this.a)
return},
bu:function(a,b){return new H.a5(a,new M.ow(this),[H.o(a,0)])}},
tg:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$be().aI(1073741823)
a.gaA().c=z
a.gaA().e=0
z=this.a
z=z.gq(z)
a.gaA().b=z
z=J.L(this.b)
a.gaA().d=z
return a}},
ov:{"^":"a:0;",
$1:function(a){var z=a.gaA().e
if(typeof z!=="number")return z.G()
a.gaA().e=z+1
return a}},
ow:{"^":"a:0;a",
$1:function(a){var z,y
z=J.u(a)
y=this.a
return J.f(z.gq(a),y.a)||J.f(z.gq(a),y.c)}},
pK:{"^":"hP;a,q:b>,c,R:d<",
aM:function(a){var z=new M.eq(null,null,null,null,null)
z.a=this
a.$1(z)
return z.C()},
t:function(a,b){var z,y
if(b==null)return!1
if(!(b instanceof M.hP))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
if(z==null?y==null:z===y)if(J.f(this.c,b.c)){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1}else z=!1
return z},
gv:function(a){return Y.aZ(Y.y(Y.y(Y.y(Y.y(0,J.x(this.a)),J.x(this.b)),J.x(this.c)),J.x(this.d)))},
k:function(a){return"SlashSituation {attacker="+J.w(this.a)+",\nid="+J.w(this.b)+",\ntarget="+H.d(J.w(this.c))+",\ntime="+J.w(this.d)+",\n}"}},
eq:{"^":"b;a,b,c,d,e",
gq:function(a){return this.gaA().c},
gR:function(){return this.gaA().e},
gaA:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
C:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gaA().b
x=this.gaA().c
w=this.gaA().d
v=this.gaA().e
z=new M.pK(y,x,w,v)
if(y==null)H.n(P.J("attacker"))
if(x==null)H.n(P.J("id"))
if(w==null)H.n(P.J("target"))
if(v==null)H.n(P.J("time"))}this.a=z
return z}}}],["","",,O,{"^":"",
wD:[function(a){var z,y
z=$.$get$fi()
y=z.a
if(y.length>0){y+=" "
z.a=y}z.a=y+a},"$1","ua",2,0,3],
ur:[function(a){$.fa=a},"$1","ub",2,0,3],
j_:[function(a,b,c,d,e,f,g){var z=L.fy(a,!1,!1,d,e,f,g)
$.$get$c1().l(0,z)
return z},function(a){return O.j_(a,!1,!1,null,null,null,null)},function(a,b){return O.j_(a,!1,!1,null,null,b,null)},"$7$deferToChoiceList$deferToEndOfPage$goto$helpMessage$script$submenu","$1","$2$script","u9",2,13,8,0,0,0,1,1,0]}],["","",,X,{"^":"",
aB:function(a){return X.eU(J.jl(a,0,new X.tE()))},
bw:function(a,b){var z=J.Q(a,b)
if(typeof z!=="number")return H.p(z)
a=536870911&z
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
eU:function(a){if(typeof a!=="number")return H.p(a)
a=536870911&a+((67108863&a)<<3)
a^=a>>>11
return 536870911&a+((16383&a)<<15)},
tE:{"^":"a:3;",
$2:function(a,b){return X.bw(a,J.x(b))}}}]]
setupProgram(dart,init.types.length)
var deferredTypes=[{func:1,ret:P.h,args:[R.ab,A.aK,Y.aT]},{func:1,ret:Q.al,args:[R.ab]},{func:1,ret:Y.bL,args:[P.q]},{func:1,v:true,args:[P.h]},{func:1,ret:P.h,args:[P.q]},{func:1,ret:P.T,args:[R.ab,A.aK]},{func:1,ret:P.q,args:[R.ab]},{func:1,ret:P.T,args:[P.T,P.T]},{func:1,ret:L.af,args:[P.h],named:{deferToChoiceList:P.V,deferToEndOfPage:P.V,goto:P.h,helpMessage:P.h,script:{func:1,ret:[P.ae,P.b4]},submenu:P.h}}]
init.types.push.apply(init.types,deferredTypes)
C.X=new P.qA()
C.a0=new P.ag(5000)
C.a2=new U.d0(0)
C.a3=new U.d0(1)
C.a4=new U.d0(2)
C.f=new U.d0(3)
C.C=new O.hh(0)
C.ag=new O.hh(1)
C.aj=new H.e4([0,"ItemType.SPEAR",1,"ItemType.BRANCH",2,"ItemType.TENT",3,"ItemType.SWORD"],[null,null])
C.ak=new H.e4([0,"KnownToMode.ALL",1,"KnownToMode.PROTAGONIST_ONLY",2,"KnownToMode.CUSTOM"],[null,null])
C.F=new H.e4([0,"Pose.standing",1,"Pose.offBalance",2,"Pose.onGround"],[null,null])
C.c=new R.ek(0)
C.i=new R.ek(1)
C.n=new R.ek(2)
C.H=new Y.cm("he","him","his","himself")
C.l=new Y.cm("it","it","its","itself")
C.al=new Y.cm("she","her","her","herself")
C.am=new Y.cm("they","them","their","themselves")
C.I=new Y.cm("you","you","your","yourself")
C.o=H.ty("dynamic")
C.ao=new P.bV(null,2);(function(a){for(var z=0;z<a.length;){var y=a[z++]
var x=a[z++]
var w=a[z++]
var v=a[z++]
I.$lazy(y,x,w,null,v)}})(["dT","$get$dT",function(){return P.ky()},$,"be","$get$be",function(){return P.em(null)},$,"br","$get$br",function(){return P.em(null)},$,"hX","$get$hX",function(){return P.G("(\\w)([\\.\\?\\!])([\"'])\\.(?=$|\\s)",!0,!1)},$,"f6","$get$f6",function(){return L.eC(new L.tp())},$,"bB","$get$bB",function(){return L.eC(new L.to())},$,"ff","$get$ff",function(){return L.eC(new L.tr())},$,"iM","$get$iM",function(){return P.em(null)},$,"f2","$get$f2",function(){var z,y
z=$.$get$bB()
y=H.r([],[P.h])
z==null
return new Y.bL(!0,"balance",y,z,!1,C.l)},$,"hU","$get$hU",function(){return new Q.oz(null)},$,"ei","$get$ei",function(){return new F.ns(null)},$,"hI","$get$hI",function(){return new B.nQ(null)},$])}
$dart_deferred_initializers$["2slg5t4ic4KZQDeROtiRlzw2wZc="]=$dart_deferred_initializers$.current
