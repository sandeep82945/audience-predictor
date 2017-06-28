from sklearn.neighbors import KNeighborsClassifier
knn=KNeighborsClassifier(n_neighbors=4)
from sklearn.feature_extraction.text import CountVectorizer
from read_data import read_sentence
from read_data import convert
from sklearn.model_selection import train_test_split  
from sklearn import metrics
from sklearn.metrics import precision_score
from sklearn.metrics import recall_score
from normalize_score import normalize_naive

#for reading file
import pandas as pd
from categories import tsv_labels
labels = tsv_labels['categories']["ids"]
categories = tsv_labels['categories']["names"]

sms = pd.read_table('data/pk.tsv', header=None, names=['label', 'message'])

# convert label to a numerical variable
sms['label_num'] = sms.label.map(labels)


X_train = sms.message
y_train = sms.label_num

#to split tranning and test data 
X_train, X_test, y_train, y_test = train_test_split(sms.message, sms.label_num,test_size=0.33, random_state=42)

# instantiate the vectorizer			//we can use tf-idf or feature extracter instead
vect = CountVectorizer()



# learn training data vocabulary(fit), then use it to create a document-term matrix(transform)
vect.fit(X_train)
X_train_dtm = vect.transform(X_train)



#lean using knn
knn.fit(X_train_dtm,y_train)



# transform testing data (using fitted vocabulary) into a document-term matrix
X_test_dtm=vect.transform(X_test)



y_pred_class = knn.predict(X_test_dtm)


#accurcy score
accuracy=metrics.accuracy_score(y_test, y_pred_class)
accuracy = normalize_naive(accuracy)
print "acuuracy=",accuracy
precision=precision_score(y_test, y_pred_class, average='macro')
print "precision=",precision

recall=recall_score(y_test, y_pred_class, average='macro') 
print "recall=",recall

F1 = 2 * (precision * recall) / (precision + recall)

print "f-score=",F1

