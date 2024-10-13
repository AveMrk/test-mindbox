import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App test', () => {

  test('Title element: exist in dom', () => {
    render(<App />);
    const title = screen.getByText(/todo/i);
    expect(title).toBeInTheDocument();
  
    //expect(title).toMatchSnapshoot();
    //screen.debug();
  });
  test('Input element: exist in dom', () => {
    render(<App />);
    const input = screen.getByTestId('input');
    expect(input).toBeInTheDocument();

    //expect(title).toMatchSnapshoot();
    //screen.debug();
  });
  test('Tabs links elements: exist in dom', () => {
    render(<App />);
    const tabsLinks = screen.getByRole('tablist');
    expect(tabsLinks).toBeInTheDocument();
  
    //expect(title).toMatchSnapshoot();
    //screen.debug();
  });
  test('Tab content element: exist in dom', () => {
    render(<App />);
    const tabsContent = screen.getAllByRole('tabpanel');
    tabsContent.forEach(tab => {
      expect(tab).toBeInTheDocument();      
    });
  
    //expect(title).toMatchSnapshoot();
    //screen.debug();
  });
  test('List.Item elements: exist in dom', async() => {
    render(<App />);
    const items = await screen.findAllByTestId('item-all');
    items.forEach(item => {
      expect(item).toBeInTheDocument();      
    });
  })
  
  
})