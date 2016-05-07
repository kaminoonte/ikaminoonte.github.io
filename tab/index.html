<?require($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/include/prolog_before.php");?>
<!DOCTYPE html>
<html>
	<head>
		<title>Record Online Player</title>
<link rel="stylesheet" href="style.css" />
<link href="main.css" type="text/css"  data-template-style="true"  rel="stylesheet" />

    <link rel="stylesheet" href="http://www.radiorecord.ru/i/fonts/record/css/record.css?1" />
    <script src="http://www.radiorecord.ru/i/js/jquery-2.1.0.min.js"></script>
    <script src="http://www.radiorecord.ru/i/js/jquery-ui-1.11.4/jquery-ui.min.js"></script>
    <script src="http://www.radiorecord.ru/i/js/jquery.Storage.js"></script>
    <link rel="stylesheet" href="http://www.radiorecord.ru/i/css/font-awesome/css/font-awesome.min.css" />
    <script src="http://www.radiorecord.ru/bitrix/templates/flat-new/js/soundmanagerv297a-20150601/script/soundmanager2.js"></script>
    <script src="http://www.radiorecord.ru/bitrix/templates/flat-new/js/jquery.record.js?"></script>
            

	</head>
	<body>
<script>
	console.log('<?=$_REQUEST['viewer_id'];?>');
</script>	
                     

<div class="index-wrap">
		<header>
		<div class="player current-station-background-color">
			<div class="wrapper">
				<a class="logo pull-left">
					<div class="logo-rr-container"></div>
				</a>
				<div class="play-pause loading noselect pull-left">
					<span class="icon-station-play"></span>
					<i class="fa fa-spinner fa-spin"></i>
				</div>
				<div id="nowplay-image" class="pull-left" current="rr"></div>

			
					<div class="textinfo pull-left">
						<div id="nowplay-station" class="current-station-font-color current-station-name">Record Dance Radio</div>
						<div id="nowplay-artist"></div>
						<div id="nowplay-title"></div>
					</div>
				
				<!--<div id="volume-slider"></div>-->
				<div class="like_in">
					<a href="#" class="vk_link" target="_blank">
						<div><i class="icon-vk"></i><span>Найти</span></div>
					</a>
					<a href="javascript:" >
						<div class="vk_add"><i class="icon-share"></i><span>Поделиться</span></div>
					</a>
					<a href="javascript:" >
						<div class="fb_add"><i class="fa fa-facebook"></i><span>Поделиться</span></div>
					</a>
					<a class="itunes_link" target="_blank" href="">
						<div><i class="icon-station-itunes"></i><span>Купить</span></div>
					</a>

				</div>
				<div class="top-buttons pull-right">
					<!--<div class="vk_plus pull-left current-station-border-color current-station-font-color noselect"><i class="icon-vkplus noopacity"></i></div>

					<div class="bitrate-changer current-station-border-color pull-left noselect tooltip" title="Сменить качество"><i class="icon-hq noopacity active"></i></div>-->
					<div class="like-top-menu pull-left current-station-border-color current-station-font-color tooltip_like noselect tooltip" title="Этот трек — супер!!"><i class="icon-station-like"></i></div>

                    
                    <div class="into_station pull-left">
						<div class="top pull-left current-station-border-color current-station-font-color tooltip_like noselect tooltip" title="Открыть ТОП 100"><i class="icon-station-top"></i></div>
					</div>
					
				
					<div class="all-stations-menu"><div class="all-stations-dropdown"><table><tr><td id="rr"></td<td id="mix"></td><td id="deep"></td><td id="club"></td><td id="fut"></td><td id="tm"></td><td id="chil"></td><td id="mini"></td><td id="ps"></td><td id="rus"></td><td id="vip"></td><td id="sd90"></td><td id="brks"></td><td id="dub"></td><td id="dc"></td><td id="techno"></td><td id="teo"></td><td id="trap"></td><td id="pump"></td><td id="rock"></td><td id="mdl"></td><td id="gop"></td><td id="yo"></td><td id="rave"></td></tr></table></div></div>
				</div>
				<script>

					$(function(){footer_fix();});
		
					$(function(){if (isMobile(/iPhone|iPad|iPod/i)) $('#volume-slider').css('display','none'); });

					var footer_fix = function () {
			
						var $loc = location.pathname;
						var $links = $('table.foo_menu td > a');
						$links.removeClass('selected');

						$.each($links,function(){
						
							if($(this).attr('href') == $loc) {
							$(this).addClass('selected');							
							return false;
							}
						});

						//console.log('fchanged3');						
					}

					window.currentInstance = new Date().getTime();

					setInterval(function(){

						if (window.localStorage.currentPlayer && window.localStorage.currentPlayer != window.currentInstance) {
							stop_play();
						};

					}, 1000);

					// init station vars
					window.current_station = 0;
					if (getParameterByName('st')) { window.current_station = prefixes.indexOf(getParameterByName('st')); }

					var current_bitrate = 'hq';
					var is_now_update = 0;

					// bind events
					$(document).on('soundManagerStop soundManagerStart soundManagerResume soundManagerPause soundManagerReady', function() {
						update_views();
					});

					$(document).on('soundManagerReady', function(mySMSound) {
						$('.player .play-pause').removeClass('loading').addClass('ready');
					});

					$(document).on('click', '.player .play-pause.ready', function() {
						if ($(this).hasClass('play')) {
							$(this).removeClass('play');
							stop_play();
						}
						else {
							$(this).addClass('play');
							start_play(stations[prefixes[current_station]][current_bitrate]);
						}
						update_views();
					});

					$(document).on('click', '.open-popup-player', function() {
						stop_play();
						playerWin = window.open('/player-mini/?st='+prefixes[current_station], 'Player', 'width=240,height=300,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no');
						playerWin.focus();
						return false;
					});

					$(document).on('click', '.all-stations-dropdown td', function(e) {
						e.stopPropagation();
						current_station = prefixes.indexOf($(this).attr("id"));
						start_play(stations[prefixes[current_station]][current_bitrate]);
						update_views();

						if (window.location.pathname == '/radio/stations/') {
							window.history.pushState({"html":$('#pjax-container').html(),"pageTitle":stations[prefixes[current_station]]['name']}, stations[prefixes[current_station]]['name'], '/radio/stations/?st='+prefixes[current_station]);
							$('.tab-buttons .tab.active').trigger('click');
						}
					});

					$(document).on('click', '#nowplay-station', function() {
						$('.all-stations td#'+prefixes[current_station]).trigger('click');
					});

					$(document).on('click', '.all-stations td:not(#more)', function(e) {

						if(!$(this).hasClass('active')) {
						current_station = prefixes.indexOf($(this).attr('id'));
						$('.all-stations-dropdown td#'+prefixes[current_station]).trigger('click');
						} else {

							$(this).removeClass('active');
							$('.play-pause.play').trigger('click');
						}
						
					});

					function update_views() {

						$("#station-page-detail .heading .tab-buttons .tab.active").css("border", "2px "+ stations[prefixes[current_station]]["fcolor"] +"solid")
						$('#nowplay-artist').html('');
						$('#nowplay-title').html('');
						$('.nowplay-big-image').html('<img src="//www.radiorecord.ru/bitrix/templates/flat-new/img/transparent.png" />').removeClass('valid');
						$('.fake-heading').css('background-image', 'url("/bitrix/templates/flat-new/img/back_cover.jpg")');
						$(".into_station").attr("href", "/radio/stations/?st="+prefixes[current_station]);
						$('#nowplay-image').attr('current', prefixes[current_station]);
						$('.current-station-background-color').css('background-color', stations[prefixes[current_station]]['color']);
						$('.current-station-font-color').css('color', stations[prefixes[current_station]]['fcolor']);
						$('.current-station-name').html(stations[prefixes[current_station]]['name']);
						$('.current-station-icon').removeClass().addClass('icon-st-'+prefixes[current_station]).addClass('current-station-font-color current-station-icon');
						$('.current-station-border-color').css('border-color', stations[prefixes[current_station]]['bcolor']);
						$('.current-station-subject').html(stations[prefixes[current_station]]['text']);

						if (window.globalSound && window.globalSound.playState && window.globalSound.url.match("^http://air")) {	// if play
							// heading updaters
							$('.all-stations-dropdown td[id="'+prefixes[current_station]+'"]').addClass('active');
							$('.all-stations td[id="'+prefixes[current_station]+'"]').addClass('active');
							$('.player .play-pause.ready').children('span').addClass('icon-station-pause').removeClass('icon-station-play');
							$('.player .play-pause.ready').addClass('play');
						}
						else {	// if stop
							$('.player .play-pause.ready').children('span').removeClass('icon-station-pause').addClass('icon-station-play');
							$('.all-stations-dropdown td').removeClass('active');
							$('.all-stations td').removeClass('active');
							$('.player .play-pause.ready').removeClass('play');
						}

						if (prefixes[current_station] == 'mix') {
							$('.tab-buttons .tab.history').hide();
						}
						else {
							$('.tab-buttons .tab.top100, .tab-buttons .tab.history').show();
						}

						$(document).trigger('currentStationChanged', {'station': prefixes[current_station]});

						update_track_inline();
					}


					function update_track_inline() {
						
						var $status ='';

						var artist = "";
						var track = "";

						if (!$('#nowplay-artist').hasClass('block_to_update')) {
							$('#nowplay-artist').addClass('block_to_update');

							var $pl_link = stations[prefixes[current_station]]['link'];
							var $rnumber = 1 + Math.floor(Math.random() * 9999999);
							$pl_link = $pl_link + '?' + $rnumber;
							//var $jjson = $.getJSON($pl_link);							

							//console.log($pl_link + '?' + $rnumber);
								
							console.log($pl_link);

							$.getJSON($pl_link, function(data) {								
								var items = [];
                                                                  var $ddata = JSON.parse('"' + data + '"');
									console.log($ddata);
								//if($ddata.length == 15 && $ddata) {
								if($ddata) {										 					
								$.each(data, function(key, val) {
								//console.log(key);				
									
									if (key == 'artist' || key == 'ARTIST' && $('#nowplay-artist').html() != val) {										

										console.log($('.textinfo #nowplay-artist').html());
										console.log('newSonger: ' + val);
										artist = val;
										if (prefixes[current_station]=="mix") {
											val = "By "+ val;
											$('#nowplay-artist').html(val);
										}
										else{
											resetLike();
									 		$('#nowplay-artist').html(val);
									 	}
									}
									if (key == 'title'  || key == 'NAME' && $('#nowplay-title').html() != val) {
										track = val;
										$('#nowplay-title').html(val);
									}
									if (key == 'image100' || key == 'image') {
										if (val == null) { $('#nowplay-image').html('<i style="width: 100px; color: '+stations[prefixes[current_station]]['fcolor']+';" class="icon-st-'+prefixes[current_station]+'"></i>').css('background-image', 'url(/bitrix/templates/flat-new/img/black40.png)').removeClass('valid'); }
										else { if ($('#nowplay-image img').attr('src') != val) { $('#nowplay-image').html('<img src="'+val+'" />').addClass('valid'); } }
									}
									if (key == 'image600') {
										if (val == null) {
											$('.nowplay-big-image').html('<img src="//www.radiorecord.ru/bitrix/templates/flat-new/img/transparent.png" />').removeClass('valid');
											$('.fake-heading').css('background-image', 'url("/bitrix/templates/flat-new/img/back_cover.jpg")');
										}
										else {
											if ($('.nowplay-big-image img').attr('src') != val) {
												$('.nowplay-big-image').html('<img src="'+val+'" />').addClass('valid');
												$('.fake-heading').css('background-image', 'url("'+val+'")');
											}
										}
									}
									if (key == 'itunesURL') {
										if (val == null) {
											$('.itunes_link').hide();
										}
										else {
											$('.itunes_link').show();
											$(".itunes_link").attr("href", val);
										}
									}

								}); start_updater(5000); } 
								
							}).fail(function(jqxhr, textStatus, error){
								console.log('fail getJson'); 
								//var err = textStatus + ', ' + error;
								console.log( "Request Failed: " + jqxhr);
								start_updater(15000, 'failjson'); 
							
							});

							$('#nowplay-artist').removeClass('block_to_update');
							$('#nowplay-image img').removeClass('loading');
						}

						var trackName = $('#nowplay-artist').html()+" - "+$('#nowplay-title').html();
						if (trackName!=" - ") {
							$(".vk_link").attr("href", "https://vk.com/search?c%5Bq%5D="+ encodeURIComponent(trackName) +"&c%5Bsection%5D=audio")
						}
					}

					function start_updater($time,$status) {						
	
						if(window.updaterIntervalID) clearInterval(window.updaterIntervalID);
						if (!$time) var $time = 8000;
						console.log($time);
						window.updaterIntervalID = setInterval("update_track_inline();",$time);
					}

					start_updater(1000);
					update_views();

					$(function() {
						var slider = $('#volume-slider');
						slider.slider({
							range: "min",
							min: 1,
							max: 100,
							value: getVolume(),
							orientation: 'horizontal',
							start: function(event,ui) {},
							slide: function(event, ui) {
								var value = slider.slider('value');
								setVolume(value);
							},
							change: function(event, ui) {
								var value = slider.slider('value');
								setVolume(value);
							},
							stop: function(event,ui) {
								//tooltip.fadeOut('fast');
							},
						});

						$('.tooltip').tooltipster({
							animation: 'fade',
							delay: 0,
							theme: 'tooltipster-light',
							touchDevices: false,
							trigger: 'hover'
						});

						init_chartfresh();
					});

					function changeCurrentStation(prefix) {
						current_station = prefixes.indexOf(prefix);
						update_views();
					}

					function getParameterByName(name) {
						name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
						var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
						results = regex.exec(location.search);
						return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));

						/*var result = "Not found",
						        tmp = [];
						    location.search
						    //.replace ( "?", "" )
						    // this is better, there might be a question mark inside
						    .substr(1)
						        .split("&")
						        .forEach(function (item) {
						        tmp = item.split("=");
						        if (tmp[0] === name) result = decodeURIComponent(tmp[1]);
						    });
						    return result;*/

					}

					$(document).off('contentLoaded');
					$(document).on("contentLoaded", function() {
						if (window.globalSound && window.globalSound.playState && window.globalSound.url && !window.globalSound.url.match("^http://air")) {
							stop_play();
						}
						init_chartfresh();
						update_views();
						footer_fix();
					});

					function init_chartfresh() {
						$('#programm-block table.player').off('click', '.play_pause')
						$('#programm-block table.player').on('click', '.play_pause', function() {
							if(isMobile()) {
								window.location.href = $(this).attr('item_url');
							}
							else {
								itemControllActive = $(this).closest('table.player');
								if ($(this).hasClass('play')) {
									stop_play();
								}
								else {
									start_play($(this).attr('item_url'), 'superchart');
									$(this).addClass('play');
									$(this).closest('table.player').addClass('active');
								}
							}
						});

						$(document).on('soundManagerStop', function(event, radio) {
							$('#programm-block table.player').find('td.play_pause').removeClass('play');
							$('#programm-block table.player').removeClass('active');
						});
					}

					$(document).on('click', '.all-stations-menu', function(e) {
						e.stopPropagation();
						$(this).children('.all-stations-dropdown').toggle();
						$(this).toggleClass('active');
						hideLike();
					});

					$(document).on('click', '.like-top-menu', function(e) {
						e.stopPropagation();
						hideStations();
						$(this).css("color", "#FFAE00");
						$(".like_in").toggle();
					});

					$(document).on('click', function() { hideStations(); hideLike(); });

					function hideStations() {
						$(".index-wrap header .player .top-buttons .all-stations-menu .all-stations-dropdown").hide();
						$(".top-buttons .all-stations-menu").removeClass("active");
					}

					function hideLike() {
						$(".like_in").hide();
					}

					function resetLike() {
						$(".like-top-menu").css("color", "rgb(188, 193, 194)");
					}

					$(document).on('click', '.vk_add', function() {
						var artist = $('#nowplay-artist').text();
						var name = $('#nowplay-title').text();
						var image = $('#nowplay-image img').attr('src');

						if(artist!='Record Dance Radio') {
							//ga('send', 'event', 'LikeAudio', 'record', artist+' - '+name);
						}

						artist = encodeURIComponent(artist);
						name = encodeURIComponent(name);
						image = encodeURIComponent(image);
						if (image === 'undefined') { image = 'http://radiorecord.ru/vk_pic.jpg'; }

						var ttt = "http://vkontakte.ru/share.php?url=http://vk.com/audio?q=";
						var ttt2 = encodeURIComponent(" - ");
						var ttt3 = encodeURIComponent("Мне нравится ");
						var ttt4 = encodeURIComponent(" на РАДИО РЕКОРД!");
						var ttt5 = encodeURIComponent("Кликайте и добавляйте!");
						var link_text = ttt+artist+ttt2+name+"&title="+ttt3+artist+ttt2+name+ttt4+"&description="+ttt5+"&image="+image+"&noparse=1";
						window.open(link_text,'popup', 'width=640,height=520')
					});

					$(document).on('click', '.fb_add', function() {
						var artist = $('#nowplay-artist').text();
						var name = $('#nowplay-title').text();
						var image = $('#nowplay-image img').attr('src');

						if(artist!='Record Dance Radio') {
							//ga('send', 'event', 'LikeAudio', 'record', artist+' - '+name);
						}

						artist = encodeURIComponent(artist);
						name = encodeURIComponent(name);
						image = encodeURIComponent(image);
						if (image === 'undefined') { image = 'http://radiorecord.ru/vk_pic.jpg'; }

						var ttt = "https://www.facebook.com/dialog/feed?app_id=1423433514596180&display=popup&caption="+encodeURIComponent("Радио Рекорд - №1 Dance Radio")+"&link=http://www.radiorecord.ru";
						var ttt2 = encodeURIComponent(" - ");
						var ttt3 = encodeURIComponent("Мне нравится ");
						var ttt4 = encodeURIComponent(" на РАДИО РЕКОРД!");
						var ttt5 = encodeURIComponent("Кликайте и добавляйте!");
						var link_text = ttt+"&name="+ttt3+artist+ttt2+name+ttt4+"&description="+ttt5+"&picture="+image+"&redirect_uri=http://radiorecord.ru/fb_callback.php";
						var windowFB = window.open(link_text,'popup', 'width=640,height=520');

					});



					$(document).on('soundManagerFinish', function(event) {
						var el = $('.play_pause.play').parent().next().find(".play_pause");
						if (!el.length) {
							el = $('.play_pause.play').closest("article").nextAll("article:not(.hidden)");
							el = el[0];
							el = $(el).find(".play_pause");
						};
						$(document).trigger('soundManagerStop');
						el.trigger("click");
						console.log("Конец");
					});


					$(document).on("click", ".left_column .player_grid table.all-stations td#more", function(e){
						$(this).closest("table").find(".more_station").removeClass("hidden");
						$(this).addClass("clicked");

					})

					$(document).on("click", ".left_column .player_grid table.all-stations td#more.clicked", function(e){
						$(this).closest("table").find(".more_station").addClass("hidden");
						$(this).removeClass("clicked");
					})

				</script>
			</div>
		</div>
        </header>
        
        
        
        
        
        
        
        
        
        

      <table class="wrapper">
		
			
		<td class="pole_left">
			<div class="tab radio active" for="radio"></div>
			<div class="tab tickets" for="tickets"></div>
			<div class="tab playlists" for="playlists"></div>
			<div class="tab playlist-detail" for="playlist-detail"></div>
			<div class="tab history" for="history"></div>
			<div class="tab top100" for="top100"></div>
			<div class="tab rshop" for="rshop"></div>
		</td>
		<td class="pole_content">
			<div class="vkla radio">
                
           
		<div class="main-content player_grid">

			<table class="all-stations">
				<tr>
					<td id="rr"><span>Radio&nbsp;Record</span></td>
					<td id="mix"><span>Megamix</span></td>
					<td id="deep"><span>Record&nbsp;Deep</span></td>
					<td id="club"><span>Record&nbsp;Club</span></td>
					<td id="fut"><span>Future&nbsp;House</span></td>
					<td id="tm"><span>Trancemission</span></td>
					<td id="chil"><span>Record&nbsp;Chill-Out</span></td>
				</tr>
				<tr>
					<td id="mini"><span>Minimal/Tech</span></td>
					<td id="ps"><span>Pirate&nbsp;Station</span></td>
					<td id="rus"><span>Russian&nbsp;Mix</span></td>
					<td id="vip"><span>Vip&nbsp;House</span></td>
					<td id="sd90"><span>Супердиско&nbsp;90-х</span></td>
					<td id="brks"><span>Record&nbsp;Breaks</span></td>
					<td id="dub"><span>Record&nbsp;Dubstep</span></td>
					
				</tr>
				<tr>
					<td id="dc"><span>Record&nbsp;Dancecore</span></td>
					<td id="techno"><span>Record&nbsp;Techno</span></td>
					<td id="teo"><span>Record&nbsp;Hardstyle</span></td>
					<td id="trap"><span>Record&nbsp;Trap</span></td>
					<td id="pump"><span>Pump</span></td>
					<td id="rock"><span>Record&nbsp;Rock</span></td>
		
						
                    <td id="mdl"><span>Медляк&nbsp;FM</span></td> </tr><tr>
					<td id="gop"><span>Гоп&nbsp;FM</span></td>
					<td id="yo"><span>Yo!FM</span></td>
					<td id="rave"><span>Rave FM</span></td>				
				</tr>
			</table>

		</div>

			</div>
			<div class="vkla tickets">
				<iframe id='my-frame' src="" width="720" height="500" style="border: none;"></iframe>
			</div>
			<div class="vkla playlists">
				<?$APPLICATION->IncludeComponent(
					"bitrix:news.list",
					"vk.playlists.player",
					Array(
						"DISPLAY_DATE" => "Y",
						"DISPLAY_NAME" => "Y",
						"DISPLAY_PICTURE" => "Y",
						"DISPLAY_PREVIEW_TEXT" => "Y",
						"AJAX_MODE" => "N",
						"IBLOCK_TYPE" => "audio",
						"IBLOCK_ID" => "93",
						"NEWS_COUNT" => "200",
						"SORT_BY1" => "SORT",
						"SORT_ORDER1" => "ASC",
						"SORT_BY2" => "ACTIVE_FROM",
						"SORT_ORDER2" => "ASC",
						"FILTER_NAME" => "",
						"FIELD_CODE" => array("ID", "CODE", "XML_ID", "NAME"),
						"PROPERTY_CODE" => array("vk_gid", "vk_album_id"),
						"CHECK_DATES" => "Y",
						"DETAIL_URL" => "",
						"PREVIEW_TRUNCATE_LEN" => "",
						"ACTIVE_DATE_FORMAT" => "d.m.Y",
						"SET_TITLE" => "Y",
						"SET_STATUS_404" => "N",
						"INCLUDE_IBLOCK_INTO_CHAIN" => "Y",
						"ADD_SECTIONS_CHAIN" => "Y",
						"HIDE_LINK_WHEN_NO_DETAIL" => "N",
						"PARENT_SECTION" => "",
						"PARENT_SECTION_CODE" => "",
						"CACHE_TYPE" => "N",
						"CACHE_TIME" => "36000000",
						"CACHE_FILTER" => "N",
						"CACHE_GROUPS" => "Y",
						"DISPLAY_TOP_PAGER" => "N",
						"DISPLAY_BOTTOM_PAGER" => "N",
						"PAGER_TITLE" => "Аудиозаписи",
						"PAGER_SHOW_ALWAYS" => "N",
						"PAGER_TEMPLATE" => "",
						"PAGER_DESC_NUMBERING" => "N",
						"PAGER_DESC_NUMBERING_CACHE_TIME" => "36000",
						"PAGER_SHOW_ALL" => "N",
						"AJAX_OPTION_JUMP" => "N",
						"AJAX_OPTION_STYLE" => "N",
						"AJAX_OPTION_HISTORY" => "N"
					),
				false
				);?>	
			</div>
			<div class="vkla playlist-detail"></div>
			<div class="vkla history"></div>
			<div class="vkla top100"></div>
			<div class="vkla rshop">
				<iframe id='rshop-iframe' src="//www.radiorecord.ru/player/tab/rshop-catalog.php" width="720" style="width: 720px; min-height: 738px; overflow-x: hidden; overflow-y: scroll; border: none;"></iframe>
			</div>
		</td>
		
		</table>
		<script src="//www.radiorecord.ru/i/js/openapi.js"></script>
		<script src="//vk.com/js/api/xd_connection.js?2" type="text/javascript"></script>
		<script>VK.init({apiId: 3733168, onlyWidgets: true});</script>
		
		
		<script src="//www.radiorecord.ru/i/js/jquery.easing.1.3.js"></script>
		<script src="//www.radiorecord.ru/i/js/jquery.Storage.js"></script>
	
	
		<script>
		
			$('.station').click(function() {
				$('.station').each(function() { $(this).removeClass('active'); });
				$(this).addClass('active');
				if (radio != $(this).attr('id')) {
					stop_air();
					$(this).addClass('nowstation');
					radio = $(this).attr('id');
					last_station = radio;
					air.link = eval('station.link.'+radio+'.link.'+air.bitrate);
					air.radio = eval('station.link.'+radio+'.update');
					start_air();
				}
			});
			var line = '';
			function show_playlist(gid, aid, pl_name, pl_img) {
				line = '<div class="playlist-zag"><div class="playlist-artist"><div class="playlist-img"><img src="'+pl_img+'" width="69" height="69"></div><div class="playlist-nazva">'+pl_name+'</div></div><div class="backlink">&larr; Все плейлисты</div></div>';
				VK.api('audio.get', { gid: gid, album_id: aid }, function(pl_music) {
					if(pl_music.response) {
						$.each(pl_music.response, function(key, value) {
							line = line += '<a id="pl'+key+'" href="'+value.url+'" class="sm2_link">'+value.artist+' - '+value.title+'</a>';
						});
						$('.vkla.playlist-detail').html(line);
						$('.backlink').click(function() {
							$('div.tab.playlists').trigger('click');
						});
						$('div[for="playlist-detail"]').trigger('click');
					}
				});
			}
			
			$('.grey-pod').click(function() {
			
				VK.api("getUserSettings", { }, function(data) {
					if (data.response & 8192) {
						VK.api('wall.post', { message: "Мне нравится новое приложение Radio Record Online! Заходи http://vk.com/onlinerecord" }, function(wallpost) {
							console.log(wallpost);
						});
					}
					else {
						VK.callMethod("showSettingsBox", 8192, function(setres) {
							
						});
						VK.addCallback("onSettingsChanged", function(setres) {
							VK.api('wall.post', { message: "Мне нравится новое приложение Radio Record Online! Заходи http://vk.com/onlinerecord" }, function(wallpost) {
								console.log(wallpost);
							});
						});
					}
				});
			
			
			
				
			});

			var lllink = '';
			var playlist_id = '';
			
			//$('#my-frame').load(function(){$(this).height($(this).contents().find('html').height());});
			
			$('.tab').click(function() {
				$('.tab').each(function() {
					$(this).removeClass('active');
					var cl = $(this).attr('for');
					$('.pole_content').children('.'+cl).css('display', 'none');
				});
				
				$(this).addClass('active').css('display', 'block');
				var cl = $(this).attr('for');
				$('.pole_content').children('.'+cl).css('display', 'block');
				
				if ($(this).hasClass('playlists')) {
					$('.bitrate').children('div').css('display', 'none');
					VK.callMethod("resizeWindow", 800, 1275);
					VK.api("getUserSettings", { }, function(data) {
						if (data.response & 8) {
							
						}
						else {
							VK.callMethod("showSettingsBox", 8, function(data) {  });
						}
					});
				}
				
				if ($(this).hasClass('rshop')) {
					VK.callMethod("resizeWindow", 800, 811);
				}
				
				if ($(this).hasClass('history')) {
					$('.bitrate').children('div').css('display', 'none');
					$('.vkla.history').css('height', '426');
					VK.callMethod("resizeWindow", 800, 496);
					// resize in ajax function on has loaded
				}
				if ($(this).hasClass('top100')) {
					$('.bitrate').children('div').css('display', 'none');
					$('.vkla.top100').css('height', '426');
					VK.callMethod("resizeWindow", 800, 496);
					// resize in ajax function on has loaded
				}
				
				if ($(this).hasClass('tickets')) {
					document.getElementById('my-frame').contentWindow.postMessage({ radarioAPI: true }, '*');
					VK.callMethod("resizeWindow", 800, $('#my-frame').height());
				}
				if ($(this).hasClass('radio')) {
					$('.bitrate').children('div').css('display', 'block');
					VK.callMethod("resizeWindow", 800, 496);
				}
				if ($(this).hasClass('playlist-detail')) {
					$('.tab.playlists').addClass('active');
					hh = 70+parseInt($('.vkla.playlist-detail').height());
					if(hh<496) { hh=496; }
					VK.callMethod("resizeWindow", 800, hh);
					
					$('.playlist-detail').children('a').click(function() {
						stop_air();
						playlist_id = $(this).attr('id');
						if (lllink == $(this).attr('href')) {
							$(this).removeClass('playing');
							soundManager.pause('playlist');
							air.status	= 'pause';
						}
						else {
							lllink = $(this).attr('href');
							air.link = $(this).attr('href');
							soundManager.destroySound('playlist');
							radio = 'playlist';
							start_air();
							$('.ARTIST').html($(this).html());
							$('.NAME').html('');
							$('.playlist-detail').children('a').each(function() { $(this).removeClass('playing'); });
							$(this).addClass('playing');
						}
						return false;
					});
				}
			});
			
			$('.playlist-detail').children('a').click(function() {
				//stop_air();
				return false;
			});
			
			$('.playlists-block-body').children('li').click(function() {
				var gid = $(this).attr('gid');
				var aid = $(this).attr('aid');
				var pl_name = $(this).attr('name');
				var pl_img = $(this).find('img').attr('src');
				show_playlist(gid, aid, pl_name, pl_img);
				return false;
			});
			
			$('.link').click(function() {
				document.location.href='//i.radiorecord.ru/m3u/all.m3u';
			});
			
			
			$('.logo').click(function() {
				$('div.tab.radio').trigger('click');
			});
			
		</script>
		<script>
			var history_id = '';
			var lllink = '';
			function sm2_history_init() {
				$('.vkla.history').find('a').click(function() {
					console.log('history a called');
					stop_air();
					playlist_id = $(this).attr('id');
					if (lllink == $(this).attr('href')) {
						$(this).removeClass('playing');
						soundManager.pause('playlist');
						soundManager.pause('history');
						soundManager.pause('top100');
						air.status	= 'pause';
					}
					else {
						lllink = $(this).attr('href');
						air.link = $(this).attr('href');
						soundManager.destroySound('playlist');
						soundManager.destroySound('history');
						soundManager.destroySound('top100');
						radio = 'history';
						start_air();
						$('.ARTIST').html($(this).html());
						$('.NAME').html('');
						$('.history').find('a').each(function() { $(this).removeClass('playing'); });
						$(this).addClass('playing');
					}
					return false;
				});
			}
			
			function sm2_top100_init() {
				$('.vkla.top100').find('a').click(function() {
					console.log('top100 a called');
					stop_air();
					playlist_id = $(this).attr('id');
					if (lllink == $(this).attr('href')) {
						$(this).removeClass('playing');
						soundManager.pause('playlist');
						soundManager.pause('history');
						soundManager.pause('top100');
						air.status	= 'pause';
					}
					else {
						lllink = $(this).attr('href');
						air.link = $(this).attr('href');
						soundManager.destroySound('playlist');
						soundManager.destroySound('history');
						soundManager.destroySound('top100');
						radio = 'top100';
						start_air();
						$('.ARTIST').html($(this).html());
						$('.NAME').html('');
						$('.top100').find('a').each(function() { $(this).removeClass('playing'); });
						$(this).addClass('playing');
					}
					return false;
				});
			}
			
			
			
			$('.radio-pages .histor').click(function() {
				$(this).addClass('active');
				$('.radio-pages .top100').removeClass('active');
				if (!last_station) {
					$.get('http://history.radiorecord.ru/index2.php?station=rr', function(history_html) {
						var hh_img = $('#rr .station-img').css('background-image');
						hh_img = hh_img.replace('url(','').replace(')','');
						hh_name = '';
						$('#rr').find('cufontext').each(function() { hh_name = hh_name+' '+$(this).html(); });
						history_html = '<div class="playlist-zag"><div class="playlist-artist"><div class="playlist-img"><img src="'+hh_img+'" width="69" height="69"></div><div class="playlist-nazva">'+hh_name+' History</div></div><div class="backlink_hh">&larr; Радио</div></div>'+history_html;
						$('.vkla.history').html(history_html);
						sm2_history_init();
						hist_height = $('.vkla.history').height();
						console.log(hist_height);
						//VK.callMethod("resizeWindow", 800, hist_height+128);
					});
				}
				else {
					console.log(radio);
					$.get('http://history.radiorecord.ru/index2.php?station='+last_station, function(history_html) {
						var hh_img = $('#'+last_station+' .station-img').css('background-image');
						hh_img = hh_img.replace('url(','').replace(')','');
						hh_name = '';
						$('#'+last_station).find('cufontext').each(function() { hh_name = hh_name+' '+$(this).html(); });
						history_html = '<div class="playlist-zag"><div class="playlist-artist"><div class="playlist-img"><img src="'+hh_img+'" width="69" height="69"></div><div class="playlist-nazva">'+hh_name+' History</div></div><div class="backlink_hh">&larr; Радио</div></div>'+history_html;
						
						$('.vkla.history').html(history_html);
						sm2_history_init();
						hist_height = $('.vkla.history').height();
						console.log(hist_height);
						//VK.callMethod("resizeWindow", 800, hist_height+128);
					});
				}
				$('div[for="history"]').trigger('click');
			});
			
			$('.radio-pages .top100').click(function() {
				$(this).addClass('active');
				$('.radio-pages .histor').removeClass('active');
				if (!last_station) {
					$.get('//www.radiorecord.ru/radio/top100/detail2.php?station=rr', function(top100_html) {
						var top100_img = $('#rr .station-img').css('background-image');
						top100_img = top100_img.replace('url(','').replace(')','');
						top100_name = '';
						$('#rr').find('cufontext').each(function() { top100_name = top100_name+' '+$(this).html(); });
						top100_html = '<div class="playlist-zag"><div class="playlist-artist"><div class="playlist-img"><img src="'+top100_img+'" width="69" height="69"></div><div class="playlist-nazva">'+top100_name+' Top 100</div></div><div class="backlink_top100">&larr; Радио</div></div>'+top100_html;
						$('.vkla.top100').html(top100_html);
						sm2_top100_init();
						//hist_height = $('.vkla.top100').height();
						//console.log(hist_height);
						//VK.callMethod("resizeWindow", 800, hist_height+128);
					});
				}
				else {
					console.log(radio);
					$.get('//www.radiorecord.ru/radio/top100/detail2.php?station='+last_station, function(top100_html) {
						var top100_img = $('#'+last_station+' .station-img').css('background-image');
						top100_img = top100_img.replace('url(','').replace(')','');
						top100_name = '';
						$('#'+last_station).find('cufontext').each(function() { top100_name = top100_name+' '+$(this).html(); });
						top100_html = '<div class="playlist-zag"><div class="playlist-artist"><div class="playlist-img"><img src="'+top100_img+'" width="69" height="69"></div><div class="playlist-nazva">'+top100_name+' Top 100</div></div><div class="backlink_top100">&larr; Радио</div></div>'+top100_html;
						
						$('.vkla.top100').html(top100_html);
						sm2_top100_init();
						//hist_height = $('.vkla.top100').height();
						//console.log(hist_height);
						//VK.callMethod("resizeWindow", 800, hist_height+128);
					});
				}
				$('div[for="top100"]').trigger('click');
			});
			
			$('.backlink_hh').live('click', function() {
				$('div.tab.radio').trigger('click');
			});
			$('.backlink_top100').live('click', function() {
				$('div.tab.radio').trigger('click');
			});
			
		</script>
		<script type="text/javascript">
			(function(win, doc, cb){
				(win[cb] = win[cb] || []).push(function() {
					try {
						tnsCounterRadiorecord_ru = new TNS.TnsCounter({
						'account':'radiorecord_ru',
						'tmsec': 'radiorecord_total'
						});
					} catch(e){}
				});

				var tnsscript = doc.createElement('script');
				tnsscript.type = 'text/javascript';
				tnsscript.async = true;
				tnsscript.src = ('https:' == doc.location.protocol ? 'https:' : 'http:') + 
					'//www.tns-counter.ru/tcounter.js';
				var s = doc.getElementsByTagName('script')[0];
				s.parentNode.insertBefore(tnsscript, s);
			})(window, this.document,'tnscounter_callback');
		</script>
		<noscript>
			<img src="//www.tns-counter.ru/V13a****radiorecord_ru/ru/UTF-8/tmsec=radiorecord_total/" width="0" height="0" alt="" />
		</noscript>
		
	</body>
</html>
<?require($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/include/prolog_before.php");?>