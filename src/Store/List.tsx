/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { CategoryDetails, ItemDetails, StoreData } from '../data/store-data';
import React, { useEffect, useMemo, useState } from 'react';
import ListItem from './ListItem';
import { useParams } from 'react-router-dom';

interface Props {
  categories: CategoryDetails[];
}

const List: React.FC<Props> = props => {
  const storeData = useMemo(() => new StoreData(), []);
  const [items, setItems] = useState([] as ItemDetails[]);
  const [category, setCategory] = useState<CategoryDetails>();
  const params = useParams<{ listId: string }>();

  useEffect(() => {
    setCategory(props.categories.find(cat => cat.name === params.listId));
  }, [params.listId, props.categories]);

  useEffect(() => {
    if (!category) return;
    storeData.getItemsByCategory(category.name).then(data => setItems(data));
  }, [category, storeData]);

  return (
    <div className="List">
      {items.map(item => (
        <ListItem key={item.name} item={item} />
      ))}
    </div>
  );
};

export default List;
