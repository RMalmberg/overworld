import React from "react";
import axios from "axios";
import Enzyme, { shallow } from "enzyme";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import { Games } from "../games";
import { Footer, Register, LogIn } from "../app/components/";
import { getPopularGames } from "./actions";
import reducer from "./reducers";

describe("Test <Games /> with valid popularGames props", () => {
  let wrap, props;

  beforeEach(() => {
    props = {
      isLoadingPopular: false,
      getPopularGames: jest.fn().mockName("getPopularMock"),
      popular: [
        {
          id: 26950,
          cover: {
            id: 75103,
            image_id: "co1ly7"
          },
          name: "Marvel's Avengers",
          popularity: 1969.805380721215,
          slug: "marvels-avengers"
        },
        {
          id: 18225,
          cover: {
            id: 74152,
            image_id: "co1l7s"
          },
          name: "The Sinking City",
          popularity: 1307.732224438319,
          slug: "the-sinking-city"
        }
      ]
    };
    wrap = shallow(<Landing {...props} />);
  });

  afterEach(() => {
    props.getPopularGames.mockRestore();
  });

  it("renders without crashing", () => {
    expect(wrap.length).toEqual(1);
  });

  it("does not call getPopularGames through componentDidMount", () => {
    expect(props.getPopularGames.getMockName()).toEqual("getPopularMock");
    expect(props.getPopularGames).toHaveBeenCalledTimes(0);
  });


  it('renders section "games header"', () => {
    const container = wrap.find("section.games-header");
    expect(container).toHaveLength(1);
    expect(container.children()).toHaveLength(2);
    expect(container.childAt(0).type()).toEqual("h1");

    const registerOrLoginContainer = container.childAt(1);
    expect(registerOrLoginContainer.type()).toEqual("p");
    expect(registerOrLoginContainer.find(Register)).toHaveLength(1);

    const loginContainer = registerOrLoginContainer.find(LogIn);
    expect(loginContainer).toHaveLength(1);
    expect(loginContainer.props().loginText).toEqual("sign in");
  });

  it("renders 1 PopularGames component with passed props", () => {
    const container = wrap.find("Popular");
    expect(container).toHaveLength(1);
    expect(container.props().isLoadingPopular).toEqual(props.isLoadingPopularGames);
    expect(container.props().popularGames).toEqual(props.popularGames);
  });

});

describe("Test <Games /> with empty popularGames props", () => {
  let wrap, props;

  beforeEach(() => {
    props = {
      isLoadingPopularGames: true,
      getPopularGames: jest.fn().mockName("getPopularMock"),
      popularGames: []
    };
    wrap = shallow(<Landing {...props} />);
  });

  afterEach(() => {
    props.getPopularGames.mockRestore();
  });

  it("renders without crashing", () => {
    expect(wrap.length).toEqual(1);
  });

  it("calls getPopularGames through componentDidMount", () => {
    expect(props.getPopularGames.getMockName()).toEqual("getPopularMock");
    expect(props.getPopularGames).toHaveBeenCalledTimes(1);
  });

  it('renders section "games header"', () => {
    const container = wrap.find("section.games-header");
    expect(container).toHaveLength(1);
    expect(container.children()).toHaveLength(2);
    expect(container.childAt(0).type()).toEqual("h1");

    const registerOrLoginContainer = container.childAt(1);
    expect(registerOrLoginContainer.type()).toEqual("p");
    expect(registerOrLoginContainer.find(Register)).toHaveLength(1);

    const loginContainer = registerOrLoginContainer.find(LogIn);
    expect(loginContainer).toHaveLength(1);
    expect(loginContainer.props().loginText).toEqual("sign in");
  });

  it("renders 1 PopularGames component with passed props", () => {
    const container = wrap.find("PopularGames");
    expect(container).toHaveLength(1);
    expect(container.props().isLoadingPopular).toEqual(props.isLoadingPopular);
    expect(container.props().popularGames).toEqual(props.popularGames);
  });


  it("renders 1 Footer as last component", () => {
    expect(wrap.find(Footer)).toHaveLength(1);
    expect(
      wrap
        .children()
        .last()
        .type()
    ).toEqual(Footer);
  });
});

describe("Test Games actions", () => {
  let store;
  const mockStore = configureStore([thunk]);

  beforeEach(() => {
    axios.get = jest.fn();
    store = mockStore({
      isLoadingPopular: true,
      getPopularGames: jest.fn().mockName("getPopularMock"),
      popular: []
    });
  });

  afterEach(() => {
    axios.get.mockRestore();
  });

  describe("Test getPopularGames action", () => {
    it("dispatches GET_POPULAR_GAMES action and returns data on success", async () => {
      const mockResponse = [
        {
          id: 26950,
          cover: {
            id: 75103,
            image_id: "co1ly7"
          },
          name: "Marvel's Avengers",
          popularity: 1969.805380721215,
          slug: "marvels-avengers"
        },
        {
          id: 18225,
          cover: {
            id: 74152,
            image_id: "co1l7s"
          },
          name: "The Sinking City",
          popularity: 1307.732224438319,
          slug: "the-sinking-city"
        }
      ];

      axios.get.mockImplementationOnce(() =>
        Promise.resolve({
          data: mockResponse
        })
      );

      await store.dispatch(getPopularGames());

      // Test axios is called with correct endpoint
      expect(axios.get.mock.calls.length).toEqual(1);
      expect(axios.get.mock.calls[0][0]).toEqual("/api/games/popular/");

      // Test axios get is called with default params
      const params = { limit: 6, offset: 0, filters: {} };
      expect(axios.get.mock.calls[0][1].params).toEqual(params);

      // Test correct action with correct payload
      const actions = store.getActions();
      expect(actions[0].type).toEqual("GET_POPULAR_GAMES");
      expect(actions[0].payload).toEqual(mockResponse);
    });

    it("does not dispatch GET_POPULAR_GAMES when an error occurs", async () => {
      const mockResponse = Promise.reject({ error: "Something bad happened" });
      axios.get.mockImplementationOnce(() => mockResponse);

      // Call getPopularGames with non default params
      await store.dispatch(getPopularGames(7, 2, { genre: [{ id: 5 }] }));

      // Test axios is called with correct args and returns mock response
      expect(axios.get.mock.calls.length).toEqual(1);
      expect(axios.get.mock.calls[0][0]).toEqual("/api/games/popular/");

      // Test axios get is called with given params
      const params = { limit: 7, offset: 2, filters: { genre: [{ id: 5 }] } };
      expect(axios.get.mock.calls[0][1].params).toEqual(params);

      // Ensure mock axios returns mock response
      expect(axios.get.mock.results[0].value).toEqual(mockResponse);

      // No actions were dispatched because of error in response
      const actions = store.getActions();
      expect(actions).toEqual([]);
    });
  });
});

describe("Test Games reducers", () => {
  const initialState = {
    popularGames: [],
    isLoadingPopular: true
  };

  it("returns the initial state when an action type is not passed", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it("handles GET_POPULAR_GAMES", () => {
    const getPayloadAction = {
      type: "GET_POPULAR_GAMES",
      payload: [
        {
          id: 26950,
          cover: {
            id: 75103,
            image_id: "co1ly7"
          },
          name: "Marvel's Avengers",
          popularity: 1969.805380721215,
          slug: "marvels-avengers"
        },
        {
          id: 18225,
          cover: {
            id: 74152,
            image_id: "co1l7s"
          },
          name: "The Sinking City",
          popularity: 1307.732224438319,
          slug: "the-sinking-city"
        }
      ]
    };

    const expectedState = {
      popularGames: [
        {
          id: 26950,
          cover: {
            id: 75103,
            image_id: "co1ly7"
          },
          name: "Marvel's Avengers",
          popularity: 1969.805380721215,
          slug: "marvels-avengers"
        },
        {
          id: 18225,
          cover: {
            id: 74152,
            image_id: "co1l7s"
          },
          name: "The Sinking City",
          popularity: 1307.732224438319,
          slug: "the-sinking-city"
        }
      ],
      isLoadingPopular: false
    };

    const getPopularGamesReducer = reducer(initialState, getPayloadAction);
    expect(getPopularGamesReducer).toEqual(expectedState);
  });
});
