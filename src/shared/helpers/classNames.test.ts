import { cn } from './classNames';

describe('cn (classNames helper)', () => {
  it('должен объединять строковые классы', () => {
    expect(cn('class', 'class2')).toBe('class class2');
  });

  it('должен отфильтровывать falsy значения', () => {
    expect(cn('class', null, undefined, 'class2')).toBe('class class2');
  });

  it('должен обрабатывать объектный синтаксис', () => {
    expect(cn({ class: true, class2: false })).toBe('class');
  });

  it('должен возвращать пустую строку без аргументов', () => {
    expect(cn()).toBe('');
    expect(cn(null, undefined)).toBe('');
  });

  it('должен корректно комбинировать строки и объекты', () => {
    expect(cn('class', { class2: true, class3: false }, 'class4')).toBe(
      'class class2 class4'
    );
  });
});
