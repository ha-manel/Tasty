/**
 * @jest-environment jsdom
 */

import { itemsCounter } from '../modules/stats.js';

describe('Testing items counter', () => {
  // Arrange
  const link = document.createElement('p');
  const data = [
    {
      strMeal: 'Budino Di Ricotta',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/1549542877.jpg',
      idMeal: '52961',
    },
    {
      strMeal: 'Chicken Alfredo Primavera',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/syqypv1486981727.jpg',
      idMeal: '52796',
    },
  ];

  // Act
  const count = itemsCounter(data, link);

  // Assert
  test('Number of items is 2', () => { expect(count).toBe(2); });
});