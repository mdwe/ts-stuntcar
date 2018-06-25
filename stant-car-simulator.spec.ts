import StuntCar from './stunt-car-simulator'

describe('StuntCar features specification', () => {
  const stuntCar = new StuntCar();

  it('stunt car bearing', () => {
    const directions = ['east', 'west', 'north', 'south']

    directions.forEach((currentDirection) => {
      stuntCar.orient(currentDirection);
      expect(stuntCar.bearing).toEqual(currentDirection);
    });
  });

  it('invalid stunt car bearing', () => {
    let hasException = false;
    try {
      stuntCar.orient('coords');
    } catch (exception) {
      expect(exception).toEqual('Invalid StuntCar Bearing');
      hasException = true;
    }
    expect(hasException).toEqual(true);
  });

  it('turn right from north', () => {
    stuntCar.orient('north');
    stuntCar.turnRight();
    expect(stuntCar.bearing).toEqual('east');
  });

  it('turn right from east', () => {
    stuntCar.orient('east');
    stuntCar.turnRight();
    expect(stuntCar.bearing).toEqual('south');
  });

  it('turn right from south', () => {
    stuntCar.orient('south');
    stuntCar.turnRight();
    expect(stuntCar.bearing).toEqual('west');
  });

  it('turn right from west', () => {
    stuntCar.orient('west');
    stuntCar.turnRight();
    expect(stuntCar.bearing).toEqual('north');
  });

  it('turn left from north', () => {
    stuntCar.orient('north');
    stuntCar.turnLeft();
    expect(stuntCar.bearing).toEqual('west');
  });

  it('turn left from east', () => {
    stuntCar.orient('east');
    stuntCar.turnLeft();
    expect(stuntCar.bearing).toEqual('north');
  });

  it('turn left from south', () => {
    stuntCar.orient('south');
    stuntCar.turnLeft();
    expect(stuntCar.bearing).toEqual('east');
  });

  it('turn left from west', () => {
    stuntCar.orient('west');
    stuntCar.turnLeft();
    expect(stuntCar.bearing).toEqual('south');
  });

  it('stuntCar coordinates', () => {
    stuntCar.at(3, 0);
    expect(stuntCar.coordinates).toEqual([3, 0]);
  });

  it('other stuntCar coordinates', () => {
    stuntCar.at(-2, 5);
    expect(stuntCar.coordinates).toEqual([-2, 5]);
  });

  it('advance when facing north', () => {
    stuntCar.at(0, 0);
    stuntCar.orient('north');
    stuntCar.advance();
    expect(stuntCar.coordinates).toEqual([0, 1]);
  });

  it('advance when facing east', () => {
    stuntCar.at(0, 0);
    stuntCar.orient('east');
    stuntCar.advance();
    expect(stuntCar.coordinates).toEqual([1, 0]);
  });

  it('advance when facing south', () => {
    stuntCar.at(0, 0);
    stuntCar.orient('south');
    stuntCar.advance();
    expect(stuntCar.coordinates).toEqual([0, -1]);
  });

  it('advance when facing west', () => {
    stuntCar.at(0, 0);
    stuntCar.orient('west');
    stuntCar.advance();
    expect(stuntCar.coordinates).toEqual([-1, 0]);
  });

  it('instructions for turning left', () => {
    expect(stuntCar.instructions('L')).toEqual(['turnLeft']);
  });

  it('instructions for turning right', () => {
    expect(stuntCar.instructions('R')).toEqual(['turnRight']);
  });

  it('instructions for advancing', () => {
    expect(stuntCar.instructions('A')).toEqual(['advance']);
  });

  it('series of instructions', () => {
    expect(stuntCar.instructions('RAAL'))
      .toEqual(['turnRight', 'advance', 'advance', 'turnLeft']);
  });

  it('instruct stuntCar', () => {
    const stuntCarI = new StuntCar(-2, 1, 'east');
    stuntCarI.evaluate('RLAALAL');
    expect(stuntCarI.coordinates).toEqual([0, 2]);
    expect(stuntCarI.bearing).toEqual('west');
  });

  it('instruct many stuntCars', () => {
    const stuntCar1 = new StuntCar(0, 0, 'north');
    const stuntCar2 = new StuntCar(2, -7, 'east');
    const stuntCar3 = new StuntCar(8, 4, 'south');
    stuntCar1.evaluate('LAAARALA');
    stuntCar2.evaluate('RRAAAAALA');
    stuntCar3.evaluate('LAAARRRALLLL');

    expect(stuntCar1.coordinates).toEqual([-4, 1]);
    expect(stuntCar1.bearing).toEqual('west');

    expect(stuntCar2.coordinates).toEqual([-3, -8]);
    expect(stuntCar2.bearing).toEqual('south');

    expect(stuntCar3.coordinates).toEqual([11, 5]);
    expect(stuntCar3.bearing).toEqual('north');
  });
});