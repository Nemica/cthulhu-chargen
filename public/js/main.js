$(function() {
	var $age = $('#age');
	var ageData = config.ageData;
	$('.roll').click(function() {
		var $this = $(this);
		var $field = $this.parent().find('.stat-field');
		var $blurb = $this.parent().find('.blurb');

		var metaStat = $this.attr('data-stat').split('-');
		var stat = metaStat[0];
		var oldResult = $field.val() || -1;
		var result = 0;

		if(metaStat[1] != 'improve') {
			// This will be much shorter as soon as SOMEONE finishes the dice roll parser (TODO)
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
		}

		switch(metaStat[1]) {
			case 'high':
				if(result > oldResult) {
					$field.val(result);
					$blurb.text('');
				} else {
					$blurb.text('Keine Verbesserung.');
				}
				break;
			case 'improve':
				impRoll(oldResult);
				break;
			default:
				if(oldResult == -1) $field.val(result);
				break;
		}

		var rolls = $this.attr('data-rolls');
		if(typeof rolls != 'undefined') {
			rolls--;
			$this.attr('data-rolls', rolls);
			if(!rolls) $this.hide();
		} else {
			$this.hide();
			setTimeout(function() {
				$blurb.hide();
			}, 3000);
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
			x = x && $('#' + stat).val();
		}
		return x;
	}
});

function restoreForm() {
	if(localStorage.formData) {
		try {
			var data = JSON.parse(localStorage.formData);
		} catch(e) {
			localStorage.removeItem('formData');
			return false;
		}

		Object.keys(data).forEach(function(field) {
			$('[name="' + field + '"]').val(data[field]);
		});
	}
}