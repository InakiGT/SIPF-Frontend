export const increment = (setPosition, position, items) => {
    setPosition(items().length / 4 > position() + 1 ? position() + 1 : position());
}

export const decrement = (setPosition, position) => {
    setPosition(position() !== 0 ? position() - 1 : 0);
}