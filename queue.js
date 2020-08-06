class Queue
{
	_list = [];

	enqueue(elt)
	{
		this._list.push(elt);
	}

	dequeue()
	{
		const toReturn = this._list[0];
		const newList = [];
		for (let i = 0; i < this._list.length; i++)
		{
			if (i !== 0)
			{
				newList.push(this._list[i]);
			}
		}

		this._list = newList;

		return toReturn;
	}

	list()
	{
		return this._list;
	}
}