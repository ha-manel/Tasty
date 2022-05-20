/**
 * @jest-environment jsdom
 */

import { commentsCounter } from '../stats.js';

describe('Testing comments counter', () => {
  // Arrange
  const link = document.createElement('p');
  const data = [
    {
      username: 'Jane',
      creation_date: '2022-05-18',
      comment: 'Delicious!',
    },
    {
      comment: 'hi',
      username: 'manel',
      creation_date: '2022-05-18',
    },
    {
      creation_date: '2022-05-18',
      comment: 'hi',
      username: 'manel',
    },
  ];

  // Act
  const count = commentsCounter(data, link);

  // Assert
  test('Number of comments is 3', () => { expect(count).toBe(3); });
});