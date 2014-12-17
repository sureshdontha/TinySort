/* global module, test, ok */
(function(){
	'use strict';

	module('tinysort api');
//	test('standalone', function() {
//		ok(iddqd.type(iddqd.capabilities.standalone)===iddqd.type.BOOLEAN,'standalone');
//	});

	// load tinysort and hack source to expose private functions for testing
	/*$.ajax({
		url:'../../src/jquery.tinysort.js'
		,dataFilter: function(data) {
			return data.replace(/\$\.tinysort\s*=\s*{/g,'$.tinysort={expose:function(){return{toLowerCase:toLowerCase,contains:contains};},');//,isNum:isNum
		}
		,success: function(){
			$.ajax({
				url:'../../src/jquery.tinysort.charorder.js'
				,success: startTest
			});
		}
	});*/


	// start test

		var aList = ['eek-','oif-','myr-','aar-','oac-','eax-']
			,sJoin = aList.slice(0).sort().join('')
			,sHfJn = aList.slice(0,4).sort().join('')
			,sSRvr = aList.slice(0).sort().reverse().join('')
		;

//		console.log('zen',zen('ul>li{a$}*6',{a:aList})); // log
//		console.log('zen',zen('ul>li{a$}*6',{a:aList}).pop().querySelectorAll('li')); // log
		console.log('aList.join()',aList.join('')); // log
		console.log('zen'
			,tinysort(zen('ul>li{a$}*6',{a:aList}).pop().querySelectorAll('li')).map(function(elm){
				return elm.textContent;
			}).join('')
		); // log

//		$('#qunit-header').text($.tinysort.id+' '+$.tinysort.version);

		module('Tinysort');
		test('default functionality', function() {
			expect(16);
			ok( (function(){
				var s = '';
				zen('ul>li{a$}*6',{a:aList}).find('li').tsort()
				.each(function(i,el){ s += $(el).text(); });
				return s==sJoin;
			})(),'$Li.tsort();');
			ok( (function(){
				var s = '';
				$zen('ul>li#a${a}*6',{a:aList}).find('li').tsort({attr:'id'})
				.each(function(i,el){ s += $(el).attr('id'); });
				return s==sJoin;
			})(),'$Li.tsort({attr:\'id\'});');
			ok( (function(){
				var s = '';
				$zen('ul>li*6>(p{$}+p{a$})',{a:aList}).find('li').tsort('p:eq(1)')
				.each(function(i,el){ s += $(el).find('>p:eq(1)').text(); });
				return s==sJoin;
			})(),'$Li.tsort(\'p:eq(1)\');');
			ok( (function(){
				var s = '';
				$zen('ul>li*6>p[title=a$]{a}',{a:aList}).find('li').tsort('p[title]',{attr:'title'})
				.each(function(i,el){ s += $(el).find('>p').attr('title'); });
				return s==sJoin;
			})(),'$Li.tsort(\'p[title]\',{attr:\'title\'});');
			ok( (function(){
				var s = '';
				$zen('ul>(li>input[value=a$]+li>select>option[value=b$])*3',{a:aList.slice(0,3),b:aList.slice(3)}).find('li').tsort('>input,>select',{useVal:true})
				.each(function(i,el){ s += $(el).find('>*').val(); });
				return s=='aar-eax-eek-myr-oac-oif-';
			})(),'$Li.tsort(\'>input,>select\',{useVal:true})');
			ok( (function(){
				var s = '';
				$zen('ul>li[data-foo=a$]{_a$}*6',{a:aList}).find('li').tsort({data:'foo'})
				.each(function(i,el){ s += $(el).data('foo'); });
				return s==sJoin;
			})(),'$Li.tsort(\'li\',{data:\'foo\'})');
			ok( (function(){
				var s = '';
				$zen('ul>li{a$}*6',{a:aList}).find('li').tsort(':lt(4)',{returns:true})
				.each(function(i,el){ s += $(el).text(); });
				return s==sHfJn;
			})(),'$Li.tsort({returns:true});');
			ok( (function(){
				var s = '';
				$zen('ul>li{a$}*6',{a:aList}).find('li').tsort({order:'desc'})
				.each(function(i,el){ s += $(el).text(); });
				return s==sSRvr;
			})(),'$Li.tsort({order:\'desc\'});');
			ok( (function(){
				var s = '';
				$zen('ul>li{a$}*5',{a:[6,1,5,2,4]}).find('li').tsort()
				.each(function(i,el){ s += $(el).text(); });
				return s=='12456';
			})(),'$Li.tsort(); with integers');
			ok( (function(){
				var s = '';
				$zen('ul>li{a$}*5',{a:[4.6,3.1,2.5,5.2,7.4]}).find('li').tsort()
				.each(function(i,el){ s += $(el).text(); });
				return s=='2.53.14.65.27.4';
			})(),'$Li.tsort(); with floats');
			ok( (function(){
				var s = '';
				$zen('ul>li{a$}*15',{a:[4.6,'c',7.4,6,'a',11,1,5,3.1,'d',2.5,5.2,'b',2,4]}).find('li').tsort()
				.each(function(i,el){ s += ' '+$(el).text(); });
				return s==' 1 2 2.5 3.1 4 4.6 5 5.2 6 7.4 11 a b c d';
			})(),'$Li.tsort(); mixed types');
			ok( (function(){
				var s = '';
				$zen('ul>li{a$}*15',{a:[4.6,'c',7.4,6,'a',11,1,5,3.1,'d',2.5,5.2,'b',2,4]}).find('li').tsort({forceStrings:true})
				.each(function(i,el){ s += ' '+$(el).text(); });
				return s==' 1 11 2 2.5 3.1 4 4.6 5 5.2 6 7.4 a b c d';
			})(),'$Li.tsort({forceStrings:true}); mixed types');
			ok( (function(){
				var s = '';
				$zen('ul>li{b$}*4',{b:['a11','a1.1','a1','a7']}).find('li').tsort()
				.each(function(i,el){ s += ' '+$(el).text(); });
				return s==' a1 a1.1 a7 a11';
			})(),'$Li.tsort(); mixed numeral/literal');
			ok( (function(){
				var $s = $zen('ul>(li>span{a$}+li>span.striked{b$})*3',{a:aList.slice(0,3),b:aList.slice(3)}).find('li').tsort('span[class!=striked]',{returns:true,place:'org'});
				return $s.parent().text()+$s.length=='eek-aar-myr-oac-oif-eax-3';
			})(),'$Li.tsort(\'span[class!=striked]\',{returns:true,place:\'org\'}); return only sorted at original position');
			ok( (function(){
				var s = '';
				$zen('div>((ul>li{a$}*4)+ul>li{b$}*4)',{a:['a9','a2','a3','a7'],b:['a11','a1.1','a1','a7']}).find('li').tsort()
				.each(function(i,el){ s += ' '+$(el).text(); });
				return s==' a2 a3 a7 a9 a1 a1.1 a7 a11';
			})(),'$Li.tsort(); multiple parents');
			ok( (function(){
				var s = '';
				$zen('ul>li{a$}*5',{a:['a-2','a-5','a-6','a-4','a-1']}).find('li').tsort({ignoreDashes:true})
				.each(function(i,el){ s += $(el).text(); });
				return s=='a-1a-2a-4a-5a-6';
			})(),'$Li.tsort({ignoreDashes:true}); ignore dashes');
		});

		test('multiple criteria: default functionality', function() {
			ok( (function(){
				var s = '';
				$zen('ul>li[value=a$]{b$}*8',{
					a:[12,4,2,3,5,1,11,6]
					,b:['bb','aa','cc','aa','bb','aa','aa','cc']
				}).find('li').tsort({},{useVal:true})
				.each(function(i,el){ s += ' '+$(el).text()+'_'+$(el).val(); });
				return s==' aa_1 aa_3 aa_4 aa_11 bb_5 bb_12 cc_2 cc_6';
			})(),'$Li.tsort({},{useVal:true});');
			ok( (function(){
				var s = '';
				$zen('ul>li#ida${b$}*8',{
					a:[12,4,2,3,5,1,11,6]
					,b:['bb','aa','cc','aa','bb','aa','aa','cc']
				}).find('li').tsort({},{attr:'id'})
				.each(function(i,el){ s += ' '+$(el).text()+'_'+$(el).attr('id'); });
				return s==' aa_id1 aa_id3 aa_id4 aa_id11 bb_id5 bb_id12 cc_id2 cc_id6';
			})(),'$Li.tsort({},{attr:\'id\'});');
			ok( (function(){
				var s = '';
				$zen('ul>li[title=ida$]*8>(p{b$}+p{c$})',{
					a:[12,4,2,3,5,1,11,6]
					,b:['aa','cc','aa','bb','aa','aa','bb','cc']
					,c:['bb','aa','cc','aa','bb','aa','aa','cc']
				}).find('li').tsort('p:eq(1)',{},{attr:'title'})
				.each(function(i,el){ s += ' '+$(el).text()+'_'+$(el).attr('title'); });
				return s==' aaaa_id1 bbaa_id3 ccaa_id4 bbaa_id11 aabb_id5 aabb_id12 aacc_id2 cccc_id6';
			})(),'$Li.tsort(\'p:eq(1)\',{},{attr:\'title\'});');
		});

		test('exposed private functions', function() {
			var o = $.tinysort.expose();
			expect(6);
			ok( (function(){
				return o.toLowerCase('aSdF')=='asdf';
			})(),'toLowerCase("aSdF");');
			ok( (function(){
				return o.toLowerCase(23)===23;
			})(),'toLowerCase(23);');

			ok( (function(){
				return o.contains(['b23'],'a')===false;
			})(),'contains(["b23"],"a");');
			ok( (function(){
				return o.contains(['b23','a'],'a')===true;
			})(),'contains(["b23","a"],"a");');
			ok( (function(){
				return o.contains([2,3,5,74],23)===false;
			})(),'contains([2,3,5,74],23);');
			ok( (function(){
				return o.contains([2,3,5,74],74)===true;
			})(),'contains([2,3,5,74],74);');
		});

		$zen('ul>li{a$}*13',{a:['džep','luđak','čovjek','gospodin','muškarac','ljubav','coga','zec','čega','liljana','godina','nož','njuška']}).find('li').tsort({charOrder:'cčćd{dž}đl{lj}n{nj}sšzž'});
		test('non latin characters plugin', function() {
			expect(2);
			ok( (function(){
				var s = '';
				$zen('ul>li{a$}*13',{a:['džep','luđak','čovjek','gospodin','muškarac','ljubav','coga','zec','čega','liljana','godina','nož','njuška']}).find('li').tsort({charOrder:'cčćd{dž}đl{lj}n{nj}sšzž'})
				.each(function(i,el){ s += ' '+$(el).text(); });
				return s==' coga čega čovjek džep godina gospodin liljana luđak ljubav muškarac nož njuška zec';
			})(),'$Li.tsort({charOrder:\'cčćd{dž}đl{lj}n{nj}sšzž\'});   Serbo-Croatian');
			ok( (function(){
				var s = '';
				$zen('ul>li{a$}*6',{a:['Åben','Æble','Åse','København','Aarhus','Øresund']}).find('li').tsort({charOrder:'æøå[{Aa}]'})
				.each(function(i,el){ s += ' '+$(el).text(); });
				return s==' København Æble Øresund Åben Aarhus Åse';
			})(),'$Li.tsort({charOrder:\'æøå[{Aa}]\'});   Danisch');
		});

		module('regression');
		test('issue 8', function() {
			expect(1);
			ok( (function(){
				var s = '';
				$zen('ul>li{a$}*13',{a:['Q','R','S','T','U','V','W','X','Y','Z','Å','Ä','Ö']}).find('li').tsort({cases:true})
				.each(function(i,el){ s += $(el).text(); });
				return s=='QRSTUVWXYZÄÅÖ';
			})(),'fixed using new');
		});
		test('issue 10', function() {
			expect(1);
			ok( (function(){
				var s = '';
				var $Li = $zen('ul>li#a${a}*6',{a:aList}).find('li');
				$Li.filter(':eq(2)')[0].removeAttribute('id');
				$Li.tsort().each(function(i,el){ s += $(el).attr('id')||''; });
				return s=='eek-oif-aar-oac-eax-';
			})());
		});
		test('issue 13', function() {
			expect(3);
			ok( (function(){
				var s = '';
				$zen('ul>li{a$}*6',{a:['eEk-','oif-','myr-','aar-','oac-','eax-']}).find('li').tsort()
				.each(function(i,el){ s += $(el).text(); });
				return s=='aar-eax-eEk-myr-oac-oif-';
			})(),'regular order');
			ok( (function(){
				var s = '';
				$zen('ul>li{a$}*6',{a:['eEk-','oif-','myr-','aar-','oac-','eax-']}).find('li').tsort({cases:true})
				.each(function(i,el){ s += $(el).text(); });
				return s=='aar-eEk-eax-myr-oac-oif-';
			})(),'case sensitive order');
			ok( (function(){
				var s = '';
				$zen('ul>li{a$}*6',{a:aList}).find('li').tsort({sortFunction:function(a,b){
					var aa = a[0], bb = b[0];
					return aa==bb?0:(aa>bb?1:-1);
				}})
				.each(function(i,el){ s += $(el).text(); });
				return s=='eek-oif-myr-aar-oac-eax-';
			})(),'custom sort function');
		});
		test('issue 14', function() {
			expect(1);
			ok( (function(){
				var s = '';
				$zen('ul>li[data-foo=a$]{_a$}*6',{a:aList}).find('li').tsort({data:'foo'})
				.each(function(i,el){ s += $(el).data('foo'); });
				return s==sJoin;
			})(),'implement data-attribute support');
		});
		test('issue 15', function() {
			expect(1);
			ok( (function(){
				var s = '';
				$zen('ul>li{a$}*5',{a:['01','001','a','0a','ba']}).find('li').tsort()
				.each(function(i,el){ s += $(el).text(); });
				return s=='010010aaba'; // not 001010aaba
			})(),'implementation of forceStrings');
		});
		test('issue 24', function() {
			expect(1);
			ok( (function(){
				var s = '';
				$zen('ul>li{a$}*5',{a:[20,0,-30,40,-120]}).find('li').tsort()
				.each(function(i,el){ s += $(el).text(); });
				return s=='-120-3002040'; // not -30-12002040
			})(),'negative numeral value bug');
		});
		test('issue 27', function() {
			expect(1);
			ok( (function(){
				var s = '';
				$zen('ul>li[data-foo=a$]{_a$}*8',{a:[20,0,-30,20.5,'a','a01',40,-120]}).find('li').tsort()
				.each(function(i,el){ s += $(el).text(); });
				return s=='_-120_-30_0_20_20.5_40_a_a01';
			})(),'data integer bug');
		});
		test('issue 39', function() {
			expect(1);
			ok( (function(){
				var s = '';
				$zen('ul>li[value=a$]{_a$}*6',{a:[0,5,1,4,2,3]}).find('li').tsort({attr:"value"})
				.each(function(i,el){ s += $(el).text(); });
				return s=='_0_1_2_3_4_5';
			})(),'regexp match onto number bug');
		});
		test('issue 51', function() {
			expect(1);
			ok( (function(){
				var s = '';
				$zen('ul>li{_a$}*6',{a:[' 0 ',' 5 ',' 1 ',' 4 ',' 2 ',' 3 ']}).find('li').tsort()
				.each(function(i,el){ s += $(el).text(); });
				return s=='_ 0 _ 1 _ 2 _ 3 _ 4 _ 5 ';
			})(),'numeral values with leading and trailing spaces');
		});


})();