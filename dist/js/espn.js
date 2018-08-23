"use strict";siteType="espn";var url_base="//games.espn.com",url_nfl="ffl";league_id=document.URL.match(new RegExp("leagueId=("+num_rgx+")"))[1];var url_league_sections="//games.espn.com/"+url_nfl+"/leaguesetup/sections",url_league_roster=url_league_sections+"/roster";league_settings_url=url_league_sections+"/scoring?leagueId="+league_id,onMatchupPreviewPage=new RegExp("/"+url_nfl+"/matchuppreview").test(document.URL),onClubhousePage=new RegExp("/"+url_nfl+"/(clubhouse|dropplayers|rosterfix)").test(document.URL),onFreeAgencyPage=new RegExp("/"+url_nfl+"/(freeagency|watchlist)").test(document.URL),onGeneralProjPage=new RegExp("/"+url_nfl+"/tradereview").test(document.URL);var onLeaguePage=new RegExp("/"+url_nfl+"/leagueoffice").test(document.URL),onLeagueSettingsPage=new RegExp("/"+url_nfl+"/leaguesetup/settings").test(document.URL);hasProjTotals=onMatchupPreviewPage||onClubhousePage,hasPlayerTable=onClubhousePage||onFreeAgencyPage||onGeneralProjPage,hasProjectionTable=!1;var url_freeagency="//games.espn.com/"+url_nfl+"/freeagency",url_player_pop="//games.espn.com/"+url_nfl+"/format/playerpop/overview",url_player_log="//m.espn.com/nfl/playergamelog";base_table_selector=".playerTableContainerDiv",player_table_selector="[id^=playertable_]",player_table_body_selector="tbody",player_table_header_selector="tr.playerTableBgRowSubhead",player_table_row_selector="tr.pncPlayerRow:not(.emptyRow)",player_table_header_proj_selector="td:contains(PROJ), td:contains(ESPN)",player_name_selector="td.playertablePlayerName",ld_selector="div.games-fullcol";function addLeagueSettings(){function a(a){var b=a.text(),c=parseFloat(b);return isNaN(c)&&(c=b),c}function b(a,b,c){a!==b&&(a<b?c.css({"background-color":"pink"}):(a>b||"No Limit"===a)&&c.css({"background-color":"lightgreen"}),"N/A"!==a&&c.attr("title","Default: "+b))}function c(c){var d=c.find("tbody").find("tbody"),e=d.find("tr[class^=row]").find("td:first");for(var f in k)if(k.hasOwnProperty(f)){var g=k[f],h=d.find("td:contains('"+f+"')");if(h.length){var j=h.next(),l=j.next(),m=a(j),p=a(l),q=g.num;b(m,q,j);var r=g.max;b(p,r,l),e.splice(e.index(h),1)}else n.push(f)}if(e.each(function(){var a=jQuery(this),b=a.parent();b.css({"background-color":"lightblue"})}),0<n.length){var s=c.find("tbody").first().children("tr").last(),t="Even";-1!==s.attr("class").indexOf("Even")&&(t="Odd");for(var u=s.find("tr:nth(1)").find("td:first"),v=u.width()||250,w=jQuery("<tr class=\"row"+t+"\"><td class=\"dataSummary settingLabel\">Missing Positions</td><td><table border=\"0\" cellpadding=\"2\" cellspacing=\"1\" class=\"leagueSettingsTable tableBody\"><tbody></tbody></table></td></tr>"),x=w.find("tbody"),y=n.length,z=0;z<y;z++){var A=n[z],B="<tr style=\"background-color: pink;\"><td style=\"width: "+v+"px\">"+A+"</td><td><strong>"+k[A].num+"</strong></td><td><strong>"+k[A].max+"</strong></td></tr>";x.append(B)}w.insertAfter(s)}o.resolve()}function d(a,b){return jQuery(a).parents("td").eq(0).prev().text()===b}function e(e){function g(a,c,d,e){var f=1;0<c.length&&(f=parseFloat(c));var g=d*f;return b(a,g,e),a===g}var h=e.find("table.viewable").find("tbody").find("tbody"),o=h.find("td.statName"),q=[],k=function(c){if(i.hasOwnProperty(c)){var e=i[c];for(var f in e)if(e.hasOwnProperty(f)){var g=h.find("td:contains('"+f+"')").filter(function(a,b){return d(b,c)});if(g.length){var j=g.next(),k=a(j),l=e[f];b(k,l,j),o.splice(o.index(g),1)}else{q.push({typ:c,val:f})}}}};for(var r in i)k(r);var s=[],t=!1,u=function(c){if(l.hasOwnProperty(c)){var e=l[c];for(var f in e)if(e.hasOwnProperty(f)){var g=h.find("td:contains('"+f+"')").filter(function(a,b){return d(b,c)});if(g.length){t=!0;var i=g.next(),j=a(i),k=e[f];b(j,k,i),o.splice(o.index(g),1)}else{s.push({typ:c,val:f})}}}};for(var r in l)u(r);var v=[],w=!1,x=function(c){if(m.hasOwnProperty(c)){var e=m[c];for(var f in e)if(e.hasOwnProperty(f)){var g=h.find("td:contains('"+f+"')").filter(function(a,b){return d(b,c)});if(g.length){w=!0;var i=g.next(),j=a(i),k=e[f];b(j,k,i),o.splice(o.index(g),1)}else{v.push({typ:c,val:f})}}}};for(var r in m)x(r);for(var y=0;y<o.length;y++){var z,A=jQuery(o[y]).text(),B=!1;-1<A.search(/ards\s+\(PY\d+/)&&-1===A.indexOf("ards (PY25)")?(z={typ:"Passing",val:"Passing Yards (PY)"},B=!0):-1<A.search(/ards\s+\(RY\d+/)&&-1===A.indexOf("ards (RY10)")?(z={typ:"Rushing",val:"Rushing Yards (PY)"},B=!0):-1<A.search(/ards\s+\(REY\d+/)&&-1===A.indexOf("ards (REY10)")&&(z={typ:"Receiving",val:"Receiving Yards (REY)"},B=!0),B&&(t=!0,v.splice(z,1))}var C=e.find("tr").first().find("td").first();t&&w?(C.append(" (Mixture)"),v.splice(0,v.length),s.splice(0,s.length)):t?(C.append(" (Standard)"),v.splice(0,v.length)):w?(C.append(" (Fractional)"),s.splice(0,s.length)):C.append(" (None)"),o.each(function(){var b=jQuery(this),c=b.next().first(),d=a(c),e=b.text(),f=!1,h=e.search(/ards\s+\(PY/);if(-1!==h){f=!0;var i=m.Passing["Passing Yards (PY)"],j="",k=e.match(/\([A-Z]+(\d+)\)/);k.length&&(j=k[1]);var l=g(d,j,i,c);l&&(v.splice(v.indexOf(" (PY"),1),s.splice(s.indexOf(" (PY"),1))}if(h=e.indexOf("ards (RY"),-1!==h){f=!0;var n=m.Rushing["Rushing Yards (RY)"],o="",p=e.match(/\([A-Z]+(\d+)\)/);p.length&&(o=p[1]);var q=g(d,o,n,c);q&&(v.splice(v.indexOf(" (RY"),1),s.splice(s.indexOf(" (RY"),1))}if(h=e.indexOf("ards (REY"),-1!==h){f=!0;var r=m.Receiving["Receiving Yards (REY)"],t="",u=e.match(/\([A-Z]+(\d+)\)/);u.length&&(t=u[1]);var w=g(d,t,r,c);w&&(v.splice(v.indexOf(" (REY"),1),s.splice(s.indexOf(" (REY"),1))}f||(b.css({"background-color":"lightblue"}),c.css({"background-color":"lightblue"}))});for(var D=q.concat(s).concat(v),E=D.slice(),F=0;F<D.length;F++){var G=D[F],H=G.typ,I=[];if("Team Defense / Special Teams"===H?I=["Team Defense/Special Teams (D/ST)"]:"Passing"===H?I=["Quarterback (QB)","Team Quarterback (TQB)"]:"Kicking"===H&&(I=["Place Kicker (K)"]),0<I.length){for(var J=0,K=0;K<I.length;K++)-1<n.indexOf(I[K])&&(J+=1);J===I.length&&E.splice(E.indexOf(G),1)}}if(0<E.length){var L=e.find("table.viewable").find("tbody").first().children("tr").last(),M="Even";-1!==L.attr("class").indexOf("Even")&&(M="Odd");for(var N=jQuery("<tr class=\"row"+M+"\"><td class=\"categoryName settingLabel\">Missing Entries</td><td><table width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><tbody></tbody></table></td></tr>"),O=N.find("tbody"),P=E.length,Q=0;Q<P;Q++){var R=E[Q],S=R.typ,T=R.val,U="<tr><td class=\"statName\" style=\"background-color: pink;\">"+T+" ["+S+"] </td><td class=\"statPoints\" style=\"background-color: pink;\">"+j[S][T]+"</td></tr>";O.append(U)}N.insertAfter(L)}}function f(){var a=document.querySelector(ld_selector),b=new MutationObserver(function(a){if(0<a.length){var c=jQuery(ld_selector),d=c.find("input.submitSettings:visible");0===d.length&&(b.disconnect(),addLeagueSettings())}});b.observe(a,{childList:!0,characterData:!0,subtree:!0})}var g=jQuery(ld_selector),h=jQuery("#settings-content",g),i={Passing:{"TD Pass (PTD)":4,"2pt Passing Conversion (2PC)":2,"Interceptions Thrown (INT)":-2},Rushing:{"TD Rush (RTD)":6,"2pt Rushing Conversion (2PR)":2},Receiving:{"TD Reception (RETD)":6,"2pt Receiving Conversion (2PRE)":2},Miscellaneous:{"Kickoff Return TD (KRTD)":6,"Punt Return TD (PRTD)":6,"Fumble Recovered for TD (FTD)":6,"Total Fumbles Lost (FUML)":-2,"Interception Return TD (INTTD)":6,"Fumble Return TD (FRTD)":6,"Blocked Punt or FG return for TD (BLKKRTD)":6,"2pt Return (2PTRET)":2,"1pt Safety (1PSF)":1},Kicking:{"Each PAT Made (PAT)":1,"Total FG Missed (FGM)":-1,"FG Made (0-39 yards) (FG0)":3,"FG Made (40-49 yards) (FG40)":4,"FG Made (50+ yards) (FG50)":5},"Team Defense / Special Teams":{"Each Sack (SK)":1,"Interception Return TD (INTTD)":6,"Fumble Return TD (FRTD)":6,"Kickoff Return TD (KRTD)":6,"Punt Return TD (PRTD)":6,"Blocked Punt or FG return for TD (BLKKRTD)":6,"Blocked Punt, PAT or FG (BLKK)":2,"Each Interception (INT)":2,"Each Fumble Recovered (FR)":2,"Each Safety (SF)":2,"0 points allowed (PA0)":5,"1-6 points allowed (PA1)":4,"7-13 points allowed (PA7)":3,"14-17 points allowed (PA14)":1,"28-34 points allowed (PA28)":-1,"35-45 points allowed (PA35)":-3,"46+ points allowed (PA46)":-5,"Less than 100 total yards allowed (YA100)":5,"100-199 total yards allowed (YA199)":3,"200-299 total yards allowed (YA299)":2,"350-399 total yards allowed (YA399)":-1,"400-449 total yards allowed (YA449)":-3,"450-499 total yards allowed (YA499)":-5,"500-549 total yards allowed (YA549)":-6,"550+ total yards allowed (YA550)":-7,"2pt Return (2PTRET)":2,"1pt Safety (1PSF)":1}},l={Passing:{"Every 25 passing yards  (PY25)":1},Rushing:{"Every 10 rushing yards (RY10)":1},Receiving:{"Every 10 receiving yards (REY10)":1}},m={Passing:{"Passing Yards (PY)":.04},Rushing:{"Rushing Yards (RY)":.1},Receiving:{"Receiving Yards (REY)":.1}},j=jQuery.extend(!0,{},i,l,m),k={"Quarterback (QB)":{num:1,max:4},"Running Back (RB)":{num:2,max:8},"Wide Receiver (WR)":{num:2,max:8},"Tight End (TE)":{num:1,max:3},"Flex (RB/WR/TE)":{num:1,max:null},"Team Defense/Special Teams (D/ST)":{num:1,max:3},"Place Kicker (K)":{num:1,max:3},"Bench (BE)":{num:7,max:null}},n=[],o=jQuery.Deferred(),p=h.find("div[name='roster']"),q=h.find("div[name='scoring']");if(jQuery.when(o).done(function(){0<q.length&&e(q),f()}),0!==p.length)c(p);else if(0<q.length){var r={xhr:1,edit:"false",leagueId:league_id};jQuery.get(url_league_roster,r,function(a){a=cleanHTML(a),p=jQuery(a),c(p)})}else o.resolve()}onLeagueSettingsPage&&addLeagueSettings(),storageLeagueKey="fp_espn_league_data_"+league_id,storageLeagueUpdateKey="fp_espn_last_updated_league_"+league_id,storagePlayerKey="fp_espn_player_data_"+league_id,storageUpdateKey="fp_espn_last_updated_"+league_id,storageUpdateTypeKey="fp_espn_last_updated_type_"+league_id,storageKeys.push(storageLeagueKey,storageLeagueUpdateKey,storagePlayerKey,storageUpdateKey,storageUpdateTypeKey);function fixPage(){if(remove_ads&&(jQuery(".games-footercol, .transitional-elements").remove(),jQuery(".games-innercol2").children("br").remove(),onClubhousePage?jQuery("iframe[src*=\"streak.espn.com\"]").parent().remove():onLeaguePage&&jQuery(".games-rightcol-spacer, a[href*=\"pizzahut\"], div.promotional-info, div.header-ad, div[class^=\"games-ad\"]").remove()),fix_css)if(jQuery(".gamesmain.container").css("margin-bottom","10px"),onClubhousePage){jQuery(".games-bottomcol").css("margin",0);var a=jQuery(".games-dates-mod");"19px"===a.css("margin-top")&&a.css("margin-top","20px")}else onFreeAgencyPage&&jQuery("#backgroundContainer").css("width","auto")}function setSelectors(){base_table=jQuery(base_table_selector),playerTable=onMatchupPreviewPage?jQuery(player_table_selector):base_table.find(player_table_selector),player_table_body=playerTable.find(player_table_body_selector),playerTable=player_table_body,player_table_header=playerTable.find(player_table_header_selector),player_table_rows=player_table_body.find(player_table_row_selector),proj_head=player_table_header.find(player_table_header_proj_selector),hasProjectionTable=0<proj_head.length,onMatchupPreviewPage&&(show_rank=!1,show_ros=!1,show_depth=!1,show_spark=!1,show_avg=!1,show_med=!1,show_current=!1);var a=proj_head.first();header_index=a.index(),a.prevAll("th, td").each(function(){header_index+=this.colSpan-1})}function resetLeagueYear(){if(current_season!==current_season_avg||current_season!==current_season_avg_week){dlog.log("Resetting current year");var a={leagueId:league_id,seasonId:current_season,xhr:"1"};jQuery.get(url_freeagency,a)}}function addColumns(){if(canAddColumns()){var a="playertableStat "+fp,b="<td class=\""+a+" "+fp+"Projections "+fp+"ProjectionsHeader\" title=\"Consensus point projections from FantasyPros (via "+fp+")\">FPROS</td>",c="<td class=\""+a+" "+fp+"Projections "+fp+"ProjectionsData\">"+loadingDiv+"</td>";if(onMatchupPreviewPage){if(!show_proj)return;proj_head.after(b),proj_head.text("ESPN"),player_table_body.find(".playertableSectionHeader th:contains(STATS)").each(function(){var a=jQuery(this),b=a.attr("colspan");a.attr("colspan",b+1),a.closest("table").find(player_table_row_selector).each(function(){jQuery(this).find("td").last().after(c)})})}else{var d="<td class=\""+a+" "+fp+"Avg "+fp+"AvgHeader\" title=\"Injury/Suspension-adjusted average points for the season (via "+fp+")\">iAVG</td>",e="<td class=\""+a+" "+fp+"Median "+fp+"MedianHeader\" title=\"Injury/Suspension-adjusted median points for the season (via "+fp+")\">MED</td>",f="<td class=\""+a+" "+fp+"Current "+fp+"CurrentHeader\" title=\"Points scored this week (via "+fp+")\">CURR</td>",g="<td class=\""+a+" "+fp+"Spark "+fp+"SparkHeader\" title=\"Graph of fantasy points over previous weeks (via "+fp+")\">TREND</td>",h="<th class=\""+fp+"\" colspan=\"2\" title=\"Projected position rank (lower is better) with 95% confidence interval from FantasyPros (via "+fp+")\">PROJ RANK (\xB1RANGE)</th>",i="<td colspan=\"2\" style=\"text-align: center\" class=\""+a+" "+fp+"Rankings "+fp+"RankingsHeader\" title=\"Projected position rank (lower is better) for *this week* from FantasyPros (via "+fp+")\">THIS WEEK</td>",j="<td colspan=\"2\" style=\"text-align: center\" class=\""+a+" "+fp+"Ros "+fp+"RosHeader\" title=\"Projected position rank (lower is better) for *the rest of the season* from FantasyPros (via "+fp+")\">REMAINING</td>",k="<td class=\""+a+" "+fp+"Depth "+fp+"DepthHeader\" title=\"Depth chart information (via "+fp+")\">DEPTH</td>",l="<td class=\""+a+" "+fp+"Avg "+fp+"AvgData\">"+loadingDiv+"</td>",m="<td class=\""+a+" "+fp+"Median "+fp+"MedianData\">"+loadingDiv+"</td>",n="<td class=\""+a+" "+fp+"Current "+fp+"CurrentData\">"+loadingDiv+"</td>",o="<td class=\""+a+" "+fp+"Spark "+fp+"SparkData\">"+loadingDiv+"</td>",p="<td class=\""+a+" "+fp+"Rankings "+fp+"RankingsData\">"+loadingDiv+"</td>",q="<td class=\""+a+" "+fp+"Rankings "+fp+"RankingsStdevData\"></td>",r="<td class=\""+a+" "+fp+"Ros "+fp+"RosData\">"+loadingDiv+"</td>",t="<td class=\""+a+" "+fp+"Ros "+fp+"RosStdevData\"></td>",u="<td class=\""+a+" "+fp+"Depth "+fp+"DepthData\">"+loadingDiv+"</td>",v="<td class=\""+fp+" sectionLeadingSpacer\"></td>",w="",x="",y=jQuery(".playerTableBgRowHead.tableHead.playertableSectionHeader"),z=y.find("th:last");if(show_proj){z.attr({colspan:2,title:"Projected points for this week"}).text("PROJ PTS"),z.after("<th class=\""+fp+"\" colspan=\"3\">OWNERSHIP</th>"),z.after("<th class=\""+fp+"\" colspan=\"1\">OPRK</th>"),z.after(v);var A=proj_head.find("a");0<A.length?A.text("ESPN"):proj_head.text("ESPN"),w+=b+v,x+=c+v}if(show_rank||show_ros){var B=jQuery(h);show_rank&&show_ros&&B.attr("colspan",4),show_proj?z.after(jQuery(v).add(B)):z.before(B.add(jQuery(v))),show_rank&&(w+=i,x+=p+q),show_ros&&(w+=j,x+=r+t),w+=v,x+=v}if(show_proj?proj_head.after(w):(show_rank||show_ros)&&proj_head.before(w),show_depth){var C=y.next("tr").find("td.sectionLeadingSpacer:first").index(),D=y.find("th.playertableSectionHeaderFirst");D.attr({colspan:C+1,title:"Player information"});var E=player_table_header.find("td:contains(TEAM POS)"),F=E.first().index();E.after(k)}for(var G=0,H=[show_avg,show_med,show_current,show_spark],I=0;I<H.length;I++)!0===H[I]&&(G+=1);if(show_avg||show_med||show_current||show_spark){var J=y.find("th:contains(SEASON)");J.attr({colspan:4+G,title:"Season statistics"})}var K=player_table_header.find("td:contains(AVG)"),L=K.first().index();show_depth&&(L-=1),show_med&&K.after(e),show_avg&&K.after(d);var M=player_table_header.find("td:contains(LAST)"),N=M.first().index();show_depth&&(N-=1),show_spark&&M.after(g),show_current&&M.after(f);var O=player_table_body.find("tr.playerTableBgRowSubhead td:contains(OPP)").first().index();if(show_depth&&(O-=1),player_table_rows.each(function(){var a=jQuery(this),b=a.find("td").eq(O).text(),c="** BYE **"===b,d=c?header_index-1:header_index,e=c?L-1:L,f=c?N-1:N,g=0;show_med&&(a.find("td").eq(e).after(m),g+=1),show_avg&&(a.find("td").eq(e).after(l),g+=1),show_current&&(a.find("td").eq(f).after(n),f+=1,g+=1),show_spark&&(a.find("td").eq(f).after(o),g+=1),show_proj?a.find("td").eq(d+g).after(x):(show_rank||show_ros)&&a.find("td").eq(d+g).before(x),show_depth&&a.find("td").eq(F).after(u)}),(show_proj||show_current)&&onClubhousePage){var P=player_table_body.find("tr.playerTableBgRowHead:last"),Q=P.prevAll(".playerTableBgRowSubhead:first"),R=Q.clone(),S=P.prev(),T=S.attr("class").match(/playerTableBgRow(\d)/),U="0";T&&2===T.length&&(U=Math.abs(parseInt(T[1])-1));var V="playerTableBgRow"+U;R.removeClass(),R.addClass(fp+" "+fp+"Totals pncPlayerRow "+V),R.find("td").empty(),R.find("td:first").html("<b>TOTAL</b>");var W=R.find("."+fp+"ProjectionsHeader"),X=R.find("."+fp+"CurrentHeader");R.find("td").removeClass(function(a,b){return(b.match(/(^|\s)FantasyPlus\S+Header/g)||[]).join(" ")}),W.addClass(fp+"ProjectionsTotal"),X.addClass(fp+"CurrentTotal"),P.before(R)}}}}override(parseLeagueSettings,"run",applyCompose(function(a){function b(a){return parseFloat(c.league_data.find("td:contains('"+a+"')").next().first().text())}var c=this,d=a;return d.siteType="espn",d.pass_yds=b("Passing Yards (PY)")||b("(PY5)")/5||b("(PY10)")/10||b("(PY20)")/20||b("(PY25)")/25||b("(PY50)")/50||b("(PY100)")/100||0,d.pass_tds=b("TD Pass (PTD)")||0,d.pass_ints=b("Interceptions Thrown (INT)")||0,d.pass_cmp=b("Each Pass Completed (PC)")||b("(PC5)")/5||b("(PC10)")/10||0,d.pass_icmp=b("Each Incomplete Pass (INC)")||b("(IP5)")/5||b("(IP10)")/10||0,d.pass_att=b("Each Pass Attempted (PA)")||0,d.pass_300_bonus=b("300-399 yard passing game (P300)")||0,d.pass_400_bonus=b("400+ yard passing game (P400)")||0,d.rush_yds=b("Rushing Yards (RY)")||b("(RY5)")/5||b("Every 10 rushing yards (RY10)")/10||b("(RY20)")/20||b("(RY25)")/25||b("(RY50)")/50||b("(RY100)")/100||0,d.rush_att=b("Rushing Attempts (RA)")||b("(RA5)")/5||b("(RA10)")/10||0,d.rush_tds=b("TD Rush (RTD)")||0,d.rush_100_bonus=b("100-199 yard rushing game (RY100)")||0,d.rush_200_bonus=b("200+ yard rushing game (RY200)")||0,d.rec_yds=b("Receiving Yards (REY)")||b("Every 5 receiving yards (REY5)")/5||b("(REY10)")/10||b("(REY20)")/20||b("(REY25)")/25||b("(REY50)")/50||b("(REY50)")/100||0,d.rec_att=b("Each reception (REC)")||b("(REC5)")/5||b("(REC10)")/10||0,d.rec_tds=b("TD Reception (RETD)")||0,d.rec_100_bonus=b("100-199 yard receiving game (REY100)")||0,d.rec_200_bonus=b("200+ yard receiving game (REY200)")||0,d.xpt=b("Each PAT Made (PAT)")||0,d.fga=(b("Total FG Attempted (FGA)")||0)+.6*(b("FG Attempted (0-39 yards) (FGA9)")||0)+.3*(b("FG Attempted (40-49 yards) (FGA40)")||0)+.1*(b("FG Attempted (50+ yards) (FGA50)")||0),d.fg=(b("Total FG Made (FG)")||0)+.6*(b("FG Made (0-39 yards) (FG0)")||0)+.3*(b("FG Made (40-49 yards) (FG40)")||0)+.1*(b("FG Made (50+ yards) (FG50)")||0),d.fgm=(b("Total FG Missed (FGM)")||0)+.6*(b("FG Missed (0-39 yards) (FGM0)")||0)+.3*(b("FG Missed (40-49 yards) (FGM40)")||0)+.1*(b("FG Missed (50+ yards) (FGM50)")||0),d.fumbles=b("Total Fumbles Lost (FUML)")||0,d.ff=b("Each Fumble Forced (FF)")||0,d.tka=b("Assisted Tackles (TKA)")||0,d.tks=b("Solo Tackles (TKS)")||0,d.pd=b("Passes Defensed (PD)")||0,d.int=b("Each Interception (INT)")||0,d.deftd=b("Interception Return TD (INTTD)")||0,d.fr=b("Each Fumble Recovered (FR)")||0,d.sf=b("Each Safety (SF)")||0,d.sk=b("Each Sack (SK)")||2*b("1/2 Sack (HALFSK)")||0,d.pa=b("Points Allowed (PA)")||0,d.pa0=b("0 points allowed (PA0)")||0,d.pa1=b("1-6 points allowed (PA1)")||0,d.pa7=b("7-13 points allowed (PA7)")||0,d.pa14=b("14-17 points allowed (PA14)")||0,d.pa18=b("18-21 points allowed (PA18)")||0,d.pa22=b("22-27 points allowed (PA22)")||0,d.pa28=b("28-34 points allowed (PA28)")||0,d.pa35=b("35-45 points allowed (PA35)")||0,d.pa46=b("46+ points allowed (PA46)")||0,d.ya=b("Yards Allowed (YA)")||0,d.ya100=b("Less than 100 total yards allowed (YA100)")||0,d.ya199=b("100-199 total yards allowed (YA199)")||0,d.ya299=b("200-299 total yards allowed (YA299)")||0,d.ya349=b("300-349 total yards allowed (YA349)")||0,d.ya399=b("350-399 total yards allowed (YA399)")||0,d.ya449=b("400-449 total yards allowed (YA449)")||0,d.ya499=b("450-499 total yards allowed (YA499)")||0,d.ya549=b("500-549 total yards allowed (YA549)")||0,d.ya550=b("550+ total yards allowed (YA550)")||0,this.league_settings=d,dlog.log(d),d}));function setDSTname(a){return a.split(" ").pop()+" D/ST"}function calcBonus(){return 0}function calcAdjProjections(a){return parseLeagueSettings.league_settings.pass_300_bonus*(300<=a.pass_yds&&400>a.pass_yds)+parseLeagueSettings.league_settings.pass_400_bonus*(400<=(a.pass_yds||0))+parseLeagueSettings.league_settings.rush_100_bonus*(100<=a.rush_yds&&200>a.rush_yds)+parseLeagueSettings.league_settings.rush_200_bonus*(200<=(a.rush_yds||0))+parseLeagueSettings.league_settings.rec_100_bonus*(100<=a.rec_yds&&200>a.rec_yds)+parseLeagueSettings.league_settings.rec_200_bonus*(200<=(a.rec_yds||0))+parseLeagueSettings.league_settings.pa0*(0===a.def_pa)+parseLeagueSettings.league_settings.pa1*(0<a.def_pa&&6>=a.def_pa)+parseLeagueSettings.league_settings.pa7*(6<a.def_pa&&13>=a.def_pa)+parseLeagueSettings.league_settings.pa14*(13<a.def_pa&&17>=a.def_pa)+parseLeagueSettings.league_settings.pa18*(17<a.def_pa&&21>=a.def_pa)+parseLeagueSettings.league_settings.pa22*(21<a.def_pa&&27>=a.def_pa)+parseLeagueSettings.league_settings.pa28*(27<a.def_pa&&34>=a.def_pa)+parseLeagueSettings.league_settings.pa35*(34<a.def_pa&&45>=a.def_pa)+parseLeagueSettings.league_settings.pa46*(45<a.def_pa)+parseLeagueSettings.league_settings.ya100*(0<=a.def_tyda&&100>a.def_tyda)+parseLeagueSettings.league_settings.ya199*(100<=a.def_tyda&&200>a.def_tyda)+parseLeagueSettings.league_settings.ya299*(200<=a.def_tyda&&300>a.def_tyda)+parseLeagueSettings.league_settings.ya349*(300<=a.def_tyda&&350>a.def_tyda)+parseLeagueSettings.league_settings.ya399*(350<=a.def_tyda&&400>a.def_tyda)+parseLeagueSettings.league_settings.ya449*(400<=a.def_tyda&&450>a.def_tyda)+parseLeagueSettings.league_settings.ya499*(450<=a.def_tyda&&500>a.def_tyda)+parseLeagueSettings.league_settings.ya549*(500<=a.def_tyda&&550>a.def_tyda)+parseLeagueSettings.league_settings.ya550*(550<=a.def_tyda)}RowData.prototype._getPlayerInfo=function(){if(this._isBlank())return{};var a="",b="",c="";if(this._isImmortal())a=this.player_cell.find("a").text().trim(),c="-",-1<this.player_cell_text.indexOf("D/ST")?b="D/ST":-1<this.player_cell_text.indexOf("TQB")?b="TQB":-1<this.player_cell_text.indexOf("HC")&&(b="HC");else{for(var d,e=this.player_cell_text.split(","),f=0;f<e.length;f++)e[f]=e[f].trim();a=e[0];var g=e[1].split(/\s|\xa0/);if(c=g[0].toUpperCase(),"JAX"===c?c="JAC":"WSH"===c&&(c="WAS"),b=g[1],2<e.length){b=[b],d=e.slice(2);for(var h,i,j=0;j<d.length&&(h=d[j],!!h);j++)i=h.split(/\s|\xa0/),b.push(i[0])}}a=a.replace("*","");var k=this.player_cell.find("a").attr("playerid"),l=!1;if(show_current){var m=this.currRow.find(".gameStatusDiv").text().trim();m&&-1<m.indexOf("-")&&(" "===m[1]?l="done":(dlog.log("found live game: "+m),l="live"))}return{player_name:a,pos_name:b,team_name:c,live_game:l,player_id:k}};function calcAdjAvg(a,b,c,d){var e=Math.round,f=0,h=0,i=null,j=null,k=d.slice(0,current_week_avg-1),l=[];dlog.info("Past points data"),dlog.info(k),dlog.info(c);for(var m=0;m<k.length;m++)if(1===c[m]){var n=parseFloat(k[m])||0;l.push(n),f+=n,h++}if(0<h){var o=parseFloat(f/h);i=(e(10*o)/10).toFixed(1);var p=l.sort(function(c,a){return c-a}),q=p.length/2,r=0==q%1?(p[q-1]+p[q])/2:p[Math.floor(q)];j=(e(10*r)/10).toFixed(1)}"undefined"==typeof activity_data_current_season_site[b][league_id]&&(activity_data_current_season_site[b][league_id]={}),activity_data_current_season_site[b][league_id].pts_avg=i,activity_data_current_season_site[b][league_id].pts_med=j,insertAdjAvg(a,i,j,c,d)}override(getProjectionData,"_fetchActivityData",function(){return function(a){var b={leagueId:league_id,playerId:a.player_id,playerIdType:"playerId",seasonId:current_season_avg,xhr:"1"};jQuery.ajax({url:url_player_pop,timeout:ajax_timeout,method:"get",data:b,context:{rowData:a}}).fail(function(){dlog.log("failed to get player pop: "+this.rowData.player_id),insertAdjAvg(this.rowData.currRow,null,null,[],[])}).done(function(a){var b=this.rowData,c=b.currRow,d=b.player_id,e=b.getTranslationId();if(!a)return dlog.log("No data in pop: "+d),insertAdjAvg(c,null,null,[],[]);a=cleanHTML(a);var f=jQuery(a),g=activity_data_current_season_site[d],h=g[league_id];"undefined"==typeof h&&(h={}),"undefined"==typeof g.games_played&&(g.games_played=[]);var i=jQuery("div#tabView0 div#moreStatsView0",f),j=i.find("div.pc:not(#pcBorder)"),k=j.find("a[href*=\"playerId\"], a[href*=\"proId\"]"),l=null;k.length&&(l=k.attr("href").match(/(playerId=|proId\/)(\d+)/)[2]),null!==l&&l!==e&&(dlog.log("found rookie: "+d+", is "+l),g.translation=l,e=l);var m=i.find("div#pcBorder table tbody"),n=m.find("tr.pcStatHead"),o=n.find("td:contains(\"OPP\")").first().index()+1,p=n.find("td:contains(\"PTS\")").first().index()+1,q=m.find("tr:not(.pcStatHead)"),r=q.find("td:nth-child("+o+")"),s=q.find("td:nth-child("+p+")"),t=r.filter(function(){return /BYE/.test(jQuery(this).text())}),u=null;1===t.length&&(u=parseFloat(t.prev().text().trim()));var w=b._isImmortal(),v=s.map(function(){return this.innerText}),x=[];if(v.each(function(a){var b=this,c=jQuery.isNumeric(u)&&a===u-1;c?g.games_played[a]="BYE":w&&jQuery.isNumeric(b)?g.games_played[a]=1:"undefined"==typeof g.games_played[a]?g.games_played[a]=null:"BYE"===g.games_played[a]&&(g.games_played[a]=null);var d=parseFloat(b);isNaN(d)&&(d=null),x.push(d)}),dlog.info("Player Activity pts:"),dlog.info(x),h.last_updated=current_time,h.weekly_points=x,w)return dlog.log("inserting avg for dsts, etc. for: "+d),g.games_played_updated=current_time,calcAdjAvg(c,d,g.games_played,h.weekly_points);if(isActivityDataCurrent(d,g.games_played_updated,"games"))return dlog.info("using cache for games played for: "+d),calcAdjAvg(c,d,g.games_played,h.weekly_points);var y={playerId:e,season:current_season_avg_week,xhr:1};jQuery.ajax({url:url_player_log,timeout:ajax_timeout,data:y,method:"get",context:{rowData:b}}).fail(function(){var a=this.rowData.currRow,b=this.rowData.player_id,c=activity_data_current_season_site[b][league_id].weekly_points;return dlog.log("failed to get player card: "+b),insertAdjAvg(a,null,null,[],c)}).done(function(a){var b=this.rowData.currRow,c=this.rowData.player_id,d=activity_data_current_season_site[c],e=d[league_id];if("undefined"==typeof e&&(e={}),"undefined"==typeof e.weekly_points&&(e.weekly_points=[]),!a)return dlog.log("No data in player card: "+c),insertAdjAvg(b,null,null,[],e.weekly_points);a=cleanHTML(a);var f=jQuery(a),h=jQuery("tr td:contains(\"POSTSEASON\")",f).parents("tr"),i=jQuery("tr td:contains(\"REGULAR SEASON\")",f).parents("tr").nextUntil(h).filter(function(){return 1<jQuery(this).find("td").length});i.each(function(a,b){if("BYE"!==d.games_played[a]){var c=jQuery(b),e=c.text();-1<e.indexOf("DID NOT PLAY")?d.games_played[a]=0:-1===e.indexOf("BYE")&&(d.games_played[a]=1)}});for(var j=0;j<d.games_played.length;j++)null===d.games_played[j]&&j<current_week_avg-1&&(d.games_played[j]=0),1!==d.games_played[j]&&(e.weekly_points[j]=null);d.games_played_updated=current_time,calcAdjAvg(b,c,d.games_played,e.weekly_points)})})}}),addData.byeweek_overwrite="<span style=\"color:#999999\">BYE</span>",addData.projTotals=function(){var a=Math.round;if(!(show_proj||show_current)&&onClubhousePage||!show_proj&&onMatchupPreviewPage)return dlog.log("totals done"),void totalsDone.resolve();if(onClubhousePage){var b,c,d,e=jQuery.Deferred(),f=jQuery.Deferred();jQuery.when(e,f).done(function(){dlog.log("totals done"),totalsDone.resolve()});var g=function(g){var h="proj"===g,i="curr"===g;if(h||i){var j,k=player_table_header.filter(function(){return"STARTERS"===jQuery(this).prev().find("th.playertableSectionHeaderFirst").text()});h?(j=".FantasyPlusProjections",b=c=0):i&&(j=".FantasyPlusCurrent",d=0);for(var l=!0;l;)if(k=k.next(),k.hasClass("pncPlayerRow")&&!k.hasClass("emptyRow")&&!k.hasClass("FantasyPlusTotals")){var m=k.find(j+"Data");if(h){var n=parseFloat(m.text()),o=parseFloat(m.prev().text());o&&(b+=o),n&&(c+=n)}else if(i){var p=parseFloat(m.text());p&&(d+=p)}}else l=!1;var q=playerTable.find(j+"Total");if(h){var r=a(100*parseFloat(c))/100;0==r&&(r="--"),q.html(r);var s=a(100*parseFloat(b))/100;0==s&&(s="--"),q.prev().html(s),e.resolve()}else if(i){var t=a(100*parseFloat(d))/100;0==t&&(t="--"),q.html(t),f.resolve()}}};show_proj?g("proj"):e.resolve(),show_current?jQuery.when(activityDone).done(function(){g("curr")}):f.resolve()}else onMatchupPreviewPage&&(jQuery(".playerTableTable").each(function(){var b=jQuery(this),c=b.find(".FantasyPlusProjectionsData");if(0<c.length){var d=0;c.each(function(){var a=parseFloat(jQuery(this).text());a&&(d+=a)});var e=a(d);b.next().prepend("<div title=\"Total projected points (via FantasyPlus)\" class=\"danglerBox totalScore\">"+e+"</div>")}}),dlog.log("totals done"),totalsDone.resolve())},watchForChanges.target_selector=base_table_selector;