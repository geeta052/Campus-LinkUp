import random
import json
import pickle
import numpy as np
import nltk

from nltk.stem import WordNetLemmatizer
from keras.models import Sequential
from keras.layers import Dense, Activation, Dropout
from keras.optimizers import SGD

lemmatizer = WordNetLemmatizer()

intents = json.loads(open('intents.json').read())

words = []
classes = []
documents = []

ignore_letters = ['?', '!', '.', ',', '/', ';', ':', '[', ']', '{', '}', '|', '&']

for intent in intents['intents']:
    for pattern in intent['patterns']:
        word_list = nltk.word_tokenize(pattern)
        words.extend(word_list)
        documents.append((word_list, intent['tag']))
        if intent['tag'] not in classes:
            classes.append(intent['tag'])

words = [lemmatizer.lemmatize(word) for word in words if word not in ignore_letters]
words = sorted(set(words))
classes = sorted(set(classes))

pickle.dump(words, open('words.pkl', 'wb'))
pickle.dump(classes, open('classes.pkl', 'wb'))

# ML learning starts here
training = []
output_empty = [0] * len(classes)

for document in documents:
    bag = []
    word_patterns = document[0]
    word_patterns = [lemmatizer.lemmatize(word.lower()) for word in word_patterns]
    for word in words:
        bag.append(1) if word in word_patterns else bag.append(0)

    output_row = list(output_empty)
    output_row[classes.index(document[1])] = 1
    training.append([bag, output_row])

random.shuffle(training)

train_x = [x[0] for x in training]
train_y = [x[1] for x in training]

# Padding
max_length = len(max(train_x, key=len))
for i in range(len(train_x)):
    train_x[i] += [0] * (max_length - len(train_x[i]))

train_x = np.array(train_x)
train_y = np.array(train_y)

# Neural network
model = Sequential()
model.add(Dense(128, input_shape=(len(train_x[0]),), activation='relu'))
model.add(Dropout(0.5))
model.add(Dense(64, activation='relu'))
model.add(Dropout(0.5))
model.add(Dense(len(train_y[0]), activation='softmax'))

sgd = SGD(momentum=0.9, nesterov=True)  # Remove the decay parameter
model.compile(loss='categorical_crossentropy', optimizer=sgd, metrics=['accuracy','precision'])

history = model.fit(train_x, train_y, epochs=200, batch_size=5, verbose=1)

model.save('Benio.h5')

print("Training completed without errors.")
