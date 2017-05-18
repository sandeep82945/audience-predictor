from sklearn.neighbors import KNeighborsClassifier
knn=KNeighborsClassifier(n_neighbors=1)
from sklearn.feature_extraction.text import CountVectorizer
from read_data import read_sentence
from read_data import convert

#for reading file
import pandas as pd
sms = pd.read_table('data/pk.tsv', header=None, names=['label', 'message'])
labels = {'CARS': 5, 'PHOTOGRAPHY': 4, 'CEREALS': 3, 'BEAUTY': 2, 'ELECTRONICS':1, 'non-elect':0}
categories = {5: 'Cars', 4:'Photography', 3:'Cereals', 2:'Beauty', 1:"Electronics", 0:'not Identified'}

# examine the first 10 rows
#print(sms.head(10))



# convert label to a numerical variable
sms['label_num'] = sms.label.map(labels)



# check that the conversion worked
#print(sms.head(10))


X_train = sms.message
y_train = sms.label_num


# instantiate the vectorizer			//we can use tf-idf or feature extracter instead
vect = CountVectorizer()



# learn training data vocabulary(fit), then use it to create a document-term matrix(transform)
vect.fit(X_train)
X_train_dtm = vect.transform(X_train)


X_test=["xdxdwc"]

# transform testing data (using fitted vocabulary) into a document-term matrix
X_test_dtm = vect.transform(X_test)


#lean using knn
knn.fit(X_train_dtm,y_train)


#vectorizing input
text = read_sentence()
simple_test=[text]
simple_test_dtm=vect.transform(simple_test)



y_pred_class = knn.predict(simple_test_dtm)


print convert([categories[y_pred_class[0]]])



