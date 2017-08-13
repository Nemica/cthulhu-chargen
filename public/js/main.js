$(function() {
	var $age = $('#age');
	var ageData = config.ageData;
	$('.roll').click(function() {
		var $this = $(this);

		var stat = $(this).attr('data-stat');
		var result = 0;

		switch(stat) {
			case 'st':
			case 'ko':
			case 'ma':
			case 'er':
			case 'ge':
			case 'luck':
				result = 5 * rollDice(6, 3);
				break;
			case 'gr':
			case 'in':
			case 'bi':
				result = 5 * (6 + rollDice(6, 2));
				break;
		}

		if(result > $('#' + stat).val() && $('#' + stat).val() !== undefined) $('#' + stat).val(result).prop('readonly', true);

		var rolls = $this.attr('data-rolls');
		if(typeof rolls != 'undefined') {
			rolls--;
			$this.attr('data-rolls', rolls);
			if(!rolls) $this.hide();
		} else {
			$this.hide();
		}
	});

	$('.confirmAge').click(function() {
		var $this = $(this);
		if(!checkStatsRolled()) {
			$('#ageDesc').empty().append('Bitte zuerst Werte auswürfeln!');
			return;
		}
		if($age.val() >= ageData.minAge && $age.val() <= ageData.maxAge) {
			$age.prop('readonly', true);
			$this.hide();

			var i = 0;
			while($age.val() > ageData.thresholds[i].max) i++;
			var characterAge = ageData.thresholds[i];

			for(var malusStat of characterAge.agemalus.malusStats) {
				$('.malus[data-stat=' + malusStat + ']').show();
			}
			if(characterAge.luckRolls) {
				$('.luckBonusRoll').show();
				$('.luckBonusRoll .roll').attr('data-rolls', characterAge.luckRolls);
			}
			//TODO MALUS LOGIC + BI Upgrade Roll!
		}
	});

	$age.on('keyup', showAgeDesc);
	$age.click(showAgeDesc);
	
	function showAgeDesc() {
		$('#ageDesc').empty();

		if($age.val() < ageData.minAge || $age.val() > ageData.maxAge) {
			$('#ageDesc').append('Das Alter muss zwischen 15 und 89 jahren sein!');
			return;
		}
		var i = 0;
		while($age.val() > ageData.thresholds[i].max) i++;
		for(var val of ageData.thresholds[i].desc) {
			$('#ageDesc').append(val + '<br>');
		}
	}

	function checkStatsRolled() {
		var x = true;
		for(var stat in config.statsData) {
			x = x && $('#' + stat).prop("readonly");
		}
		return x && $('#luck').prop("readonly");
	}
});


