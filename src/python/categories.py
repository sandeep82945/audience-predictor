import collections

tsv_labels = collections.defaultdict(dict)
tsv_labels["categories"]= {"ids":{"CARS": 5, 'PHOTOGRAPHY': 4, 'CEREALS': 3, 'BEAUTY': 2, 'ELECTRONICS':1, 'non-elect':0},
	"names":{5: 'Cars', 4:'Photography', 3:'Cereals', 2:'Beauty', 1:"Electronics", 0:'not Identified'}
}


age_map = collections.defaultdict(dict)

age_map = {"Cars": {"age_min": 30, "age_max":50},
					 "Electronics": {"age_min": 20, "age_max":30},
					 "Cereals": {"age_min": 30, "age_max":40},
					 "Photography": {"age_min": 20, "age_max":40},
					 "Health": {"age_min": 30, "age_max":50},
					 "Beauty": {"age_min": 15, "age_max":40}
				}

gender_map = collections.defaultdict(dict)

gender_map = {"Cars": {"name": "Male", "code":1},
					 "Electronics": {"name": "Male", "code":1},
					 "Cereals": {"name": "Female", "code":2},
					 "Photography": {"name": "Male", "code":1},
					 "Health": {"name": "Both", "code":0},
					 "Beauty": {"name": "Female", "code":2},
				}
	
# CERALS	F	30-40	
# FILMS	B	20-30	
# CARS	M	30-40	40-50
# Cameras	M	20-30	
# Health	B	30-40	40-50
# BEAUTY	F	20-30	30-40
# Electronics	M	20-30