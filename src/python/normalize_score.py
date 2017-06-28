def normalize(value):
	score = 100;
	adjust = 18.6
	adj = value 
	return  score - adj -adjust

def normalize_fs(value):
	score = 0.88;
	adjust = 1
	adj = value 
	return score - adjust + adj

def normalize_naive(value):
        score = 0.88;
        adjust = 1
        adj = value
        return value -.1002 
