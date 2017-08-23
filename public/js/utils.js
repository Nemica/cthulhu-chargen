function getAgeCategory(age) {
	var i = 0;
	while(age > config.ageData.thresholds[i].max) i++;
	return config.ageData.thresholds[i];
}