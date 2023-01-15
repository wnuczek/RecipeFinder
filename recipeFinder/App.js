import React, {useEffect, useState} from 'react';
import {
  Button,
  Text,
  TextInput,
  View,
  ScrollView,
  Image,
  Dimensions,
  FlatList,
  SectionList,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const accentColor = '#920918';

const styles = StyleSheet.create({
  homeScreen: {
    backgroundColor: accentColor,
    color: '#fff',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    topPart: {
      width: '100%',
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    bottomPart: {
      flex: 1,
      width: '100%',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
  },
  container: {
    flex: 1,
    paddingTop: 22,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  stretch: {
    width: 400,
    height: 200,
    resizeMode: 'cover',
  },
  searchField: {
    width: '90%',
    margin: 'auto',
    borderColor: accentColor,
    borderWidth: 2,
    backgroundColor: '#fff',
    padding: 10,
  },
  title: {
    color: '#fff',
    fontSize: 30,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  subtitle: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  buttonContainer: {
    margin: 20,
  },
  searchResultsItem: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: accentColor,
    minHeight: 100,
  },
  searchResultsItemThumbnail: {
    width: '20%',
    height: '100%',
    resizeMode: 'cover',
  },
  searchResultsItemTexts: {
    width: '80%',
    height: '100%',
    padding: 10,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    title: {
      color: accentColor,
      fontWeight: 'bold',
      fontSize: 20,
    },
  },
  ratingStarsContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  ratingStars: {
    flex: 1,
    flexDirection: 'row',
  },
  recipeView: {
    recipeViewContent: {
      padding: 10,
    },
    title: {
      color: accentColor,
      fontWeight: 'bold',
      textTransform: 'uppercase',
      fontSize: 20,
    },
    header: {
      color: accentColor,
      fontWeight: 'bold',
      textTransform: 'uppercase',
      marginTop: 20,
      marginBottom: 5,
    },
    scaleButtons: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingBottom: 10,
      width: '100%',
      scaleButton: {
        width: '20%',
        textAlign: 'center',
      },
      scaleTexts: {
        width: '50%',
        textAlign: 'center',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
    },
    ingredients: {
      padding: 10,
      ingredientItem: {
        flex: 1,
        flexDirection: 'row',
        fontSize: 10,
        margin: 'auto',
        // justifyContent: 'space-between',
        bullet: {
          paddingLeft: 5,
        },
        qty: {
          marginLeft: 10,
          color: accentColor,
          fontWeight: 'bold',
        },
        text: {
          marginLeft: 10,
        },
      },
    },

    instructions: {
      padding: 10,
      margin: 'auto',
    },
  },
});

function Home({navigation}) {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState('');

  const getRecipesList = async () => {
    try {
      if (!query) {
        return;
      }
      const response = await fetch(
        `http://127.0.0.1:5000/search?query=${query}`,
        // `http://10.0.2.2:5000/search?query=${query}`, // android
      );
      const json = await response.json();
      setSearchResults(json);
      navigation.navigate('SearchResultsView', json);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.homeScreen}>
      <View style={styles.homeScreen.topPart}>
        <Text style={styles.title}>Recipe finder</Text>
        <Text style={styles.subtitle}>Find & scale cooking recipes </Text>
        <Icon
          name="glass"
          type="font-awesome"
          color="#fff"
          size={100}
          margin={20}
        />
      </View>
      <View style={styles.homeScreen.bottomPart}>
        <TextInput
          style={styles.searchField}
          onChangeText={text => setQuery(text)}
          value={query}
        />
        <View style={styles.buttonContainer}>
          <Icon
            onPress={getRecipesList}
            disabled={!query}
            name="search"
            type="font-awesome"
            color={accentColor}
            backgroundColor="#333"
            padding={100}
            size={30}
            raised
          />
        </View>
      </View>
    </View>
  );
}

function SearchResultsView({navigation, route}) {
  const data = route.params;

  useEffect(() => {
    navigation.setOptions({
      headerTitle: `Results for: ${data.query}`,
      headerStyle: {
        backgroundColor: accentColor,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    });
  }, [data.query, navigation]);

  const goToRecipe = item => navigation.navigate('RecipeView', {item: item});

  return (
    <View>
      <FlatList
        data={data.results}
        renderItem={({item}) =>
          SearchResultsItem({navigation, route, item, goToRecipe})
        }
      />
    </View>
  );
}

function SearchResultsItem({navigation, route, item, goToRecipe}) {
  return (
    <TouchableWithoutFeedback onPress={() => goToRecipe(item)}>
      <View style={styles.searchResultsItem}>
        <Image
          source={{uri: item.thumbnail[0].src}}
          style={styles.searchResultsItemThumbnail}
        />
        <View style={styles.searchResultsItemTexts}>
          <Text style={styles.searchResultsItemTexts.title}>
            {item.recipe[1].name}
          </Text>
          <RatingStarsComponent
            rating={item.recipe[0].ratingstars}
            count={item.recipe[0].ratingcount}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

function RatingStarsComponent(data) {
  const fullStars = Math.floor(data.rating);
  const emptyStars = 5 - Math.floor(data.rating);
  return (
    <View style={styles.ratingStarsContainer}>
      <Text style={{fontSize: 15, fontWeigth: 'bold'}}>{data.rating}</Text>
      <RatingStars
        fullStarsCount={fullStars}
        emptyStarsCount={emptyStars}
        style={styles.ratingStars}
      />
      <Text style={{fontSize: 15, fontWeigth: 'bold'}}>({data.count})</Text>
    </View>
  );
}

function RatingStars(data) {
  const fullStars = Array.from(Array(data.fullStarsCount).keys()).map(() => (
    <Icon name="star" type="font-awesome" color="gold" size={20} />
  ));
  const emptyStars = Array.from(Array(data.emptyStarsCount).keys()).map(() => (
    <Icon name="star" type="font-awesome" color="gray" size={20} />
  ));
  return fullStars.concat(emptyStars);
}

function RecipeView({navigation, route}) {
  this.item = route.params.item;
  this.link = this.item.link;
  this.loaded = false;

  const [recipeData, setRecipeData] = useState('');

  useEffect(() => {
    const getRecipe = async () => {
      try {
        this.data = undefined;
        if (!this.link) {
          return;
        }
        const response = await fetch(
          `http://127.0.0.1:5000/scraper?url=${this.link}`,
          // `http://10.0.2.2:5000/scraper?url=${this.link}`, //android
        );
        const json = await response.json();
        setRecipeData(json);
        this.data = json;
        this.loaded = true;
      } catch (error) {
        console.error(error);
      }
    };
    getRecipe();
  }, []);

  // useEffect(() => {
  //   setRecipeData(this.link);
  // }, []);

  useEffect(() => {
    if (recipeData) {
      navigation.setOptions({
        headerTitle: `${recipeData.title}`,
        headerStyle: {
          backgroundColor: accentColor,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      });
    }
  }, [recipeData, navigation]);

  return (
    <ScrollView style={styles.recipeView}>
      <Image source={{uri: recipeData.image}} style={styles.stretch} />
      <View style={styles.recipeView.recipeViewContent}>
        <Text style={styles.recipeView.title}>{recipeData.title}</Text>
        <Text style={styles.recipeView.header}>Składniki</Text>
        <View style={styles.recipeView.ingredients}>
          <RecipeIngredients
            ingredients={recipeData.ingredients_parsed}
            yields={recipeData.yields}
          />
        </View>
        <Text style={styles.recipeView.header}>Instrukcje</Text>
        <Text style={styles.recipeView.instructions}>
          {recipeData.instructions &&
            recipeData.instructions.replaceAll('\n', '\n\n')}
        </Text>
      </View>
    </ScrollView>
  );
}

function RecipeIngredients(data) {
  const [recipeScale, setRecipeScale] = useState(1);
  const yields = data.yields;

  const yieldsNo = yields?.split(' ')[0];

  return (
    data.ingredients && (
      <View style={styles.recipeView.ingredients}>
        <RecipeIngredientsScaler
          yields={yieldsNo}
          scale={recipeScale}
          scaleUpdate={setRecipeScale}
        />
        <RecipeIngredientsList
          ingredients={data.ingredients}
          scale={recipeScale}
        />
      </View>
    )
  );
}

function RecipeIngredientsScaler(data) {
  const recipeScale = data.scale;
  const yields = data.yields;
  const scaleUpdate = data.scaleUpdate;

  const step = yields ? 1 / yields : 0.2;

  return (
    <View style={styles.recipeView.scaleButtons}>
      <View style={styles.recipeView.scaleButtons.scaleButton}>
        <Icon
          onPress={() =>
            scaleUpdate(
              recipeScale - step > 0 ? recipeScale - step : recipeScale,
            )
          }
          name="minus"
          type="font-awesome"
          color={accentColor}
          backgroundColor="#333333"
          padding={10}
          size={30}
          styles={{backgroundColor: '#333'}}
          raised
        />
      </View>
      <View style={styles.recipeView.scaleButtons.scaleTexts}>
        <Text style={styles.recipeView.header}>
          {yields
            ? `Porcje: ${Math.round(yields * recipeScale * 10) / 10} (${
                Math.round(recipeScale * 100) / 100
              }X)`
            : ''}
        </Text>
      </View>
      <View style={styles.recipeView.scaleButtons.scaleButton}>
        <Icon
          onPress={() => scaleUpdate(recipeScale + step)}
          name="plus"
          type="font-awesome"
          color={accentColor}
          backgroundColor="#333"
          padding={10}
          size={30}
          raised
        />
      </View>
    </View>
  );
}

function RecipeIngredientsList(data) {
  const list = data.ingredients;
  const scale = data.scale;

  return (
    list &&
    list.map(item => <RecipeIngredientsItem item={item} scale={scale} />)
  );
}

function RecipeIngredientsItem(data) {
  const item = data.item;
  const scale = data.scale;
  if (item && item !== null) {
    this.quantity = item.quantity
      ? Math.round(item.quantity * scale * 10) / 10
      : undefined;
    if ('span' in item) {
      const start = item.span[0];
      const end = item.span[1];
      const removeFromName = item.name.slice(start, end + 1);
      this.name = item.name.replace(removeFromName, '');
    } else {
      this.name = item.name;
    }
  }

  return (
    item &&
    this.name && (
      <View style={styles.recipeView.ingredients.ingredientItem}>
        <Icon
          style={styles.recipeView.ingredients.ingredientItem.bullet}
          name="caret-right"
          type="font-awesome"
          color="#333"
          size={20}
        />
        <Text style={styles.recipeView.ingredients.ingredientItem.qty}>
          {this.quantity ? `${this.quantity} ` : ''}
        </Text>

        <Text style={styles.recipeView.ingredients.ingredientItem.text}>
          {item.unit && item.unit !== 'dimensionless' ? `${item.unit} ` : ''}
          {this.name}
        </Text>
      </View>
    )
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen name="SearchResultsView" component={SearchResultsView} />
        <Stack.Screen name="RecipeView" component={RecipeView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
