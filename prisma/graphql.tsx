import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type AffectedRowsOutput = {
  count: Scalars['Int'];
};

export type AggregateFile = {
  _count?: Maybe<FileCountAggregate>;
  _max?: Maybe<FileMaxAggregate>;
  _min?: Maybe<FileMinAggregate>;
};

export type AggregatePage = {
  _count?: Maybe<PageCountAggregate>;
  _max?: Maybe<PageMaxAggregate>;
  _min?: Maybe<PageMinAggregate>;
};

export type BoolFieldUpdateOperationsInput = {
  set?: Maybe<Scalars['Boolean']>;
};

export type BoolFilter = {
  equals?: Maybe<Scalars['Boolean']>;
  not?: Maybe<NestedBoolFilter>;
};

export type BoolWithAggregatesFilter = {
  _count?: Maybe<NestedIntFilter>;
  _max?: Maybe<NestedBoolFilter>;
  _min?: Maybe<NestedBoolFilter>;
  equals?: Maybe<Scalars['Boolean']>;
  not?: Maybe<NestedBoolWithAggregatesFilter>;
};

export type DateTimeNullableFilter = {
  equals?: Maybe<Scalars['DateTime']>;
  gt?: Maybe<Scalars['DateTime']>;
  gte?: Maybe<Scalars['DateTime']>;
  in?: Maybe<Array<Scalars['DateTime']>>;
  lt?: Maybe<Scalars['DateTime']>;
  lte?: Maybe<Scalars['DateTime']>;
  not?: Maybe<NestedDateTimeNullableFilter>;
  notIn?: Maybe<Array<Scalars['DateTime']>>;
};

export type DateTimeNullableWithAggregatesFilter = {
  _count?: Maybe<NestedIntNullableFilter>;
  _max?: Maybe<NestedDateTimeNullableFilter>;
  _min?: Maybe<NestedDateTimeNullableFilter>;
  equals?: Maybe<Scalars['DateTime']>;
  gt?: Maybe<Scalars['DateTime']>;
  gte?: Maybe<Scalars['DateTime']>;
  in?: Maybe<Array<Scalars['DateTime']>>;
  lt?: Maybe<Scalars['DateTime']>;
  lte?: Maybe<Scalars['DateTime']>;
  not?: Maybe<NestedDateTimeNullableWithAggregatesFilter>;
  notIn?: Maybe<Array<Scalars['DateTime']>>;
};

export type File = {
  /** The Pages that this file is associated with */
  Pages: Array<Page>;
  _count?: Maybe<FileCount>;
  /** The path to the file. Relative to the root directory. */
  path: Scalars['String'];
};


export type FilePagesArgs = {
  cursor?: Maybe<PageWhereUniqueInput>;
  distinct?: Maybe<Array<PageScalarFieldEnum>>;
  orderBy?: Maybe<Array<PageOrderByWithRelationInput>>;
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
  where?: Maybe<PageWhereInput>;
};

export type FileCount = {
  Pages: Scalars['Int'];
};

export type FileCountAggregate = {
  _all: Scalars['Int'];
  path: Scalars['Int'];
};

export type FileCountOrderByAggregateInput = {
  path?: Maybe<SortOrder>;
};

export type FileCreateInput = {
  Pages?: Maybe<PageCreateNestedManyWithoutFileInput>;
  path: Scalars['String'];
};

export type FileCreateNestedOneWithoutPagesInput = {
  connect?: Maybe<FileWhereUniqueInput>;
  connectOrCreate?: Maybe<FileCreateOrConnectWithoutPagesInput>;
  create?: Maybe<FileCreateWithoutPagesInput>;
};

export type FileCreateOrConnectWithoutPagesInput = {
  create: FileCreateWithoutPagesInput;
  where: FileWhereUniqueInput;
};

export type FileCreateWithoutPagesInput = {
  path: Scalars['String'];
};

export type FileGroupBy = {
  _count?: Maybe<FileCountAggregate>;
  _max?: Maybe<FileMaxAggregate>;
  _min?: Maybe<FileMinAggregate>;
  path: Scalars['String'];
};

export type FileMaxAggregate = {
  path?: Maybe<Scalars['String']>;
};

export type FileMaxOrderByAggregateInput = {
  path?: Maybe<SortOrder>;
};

export type FileMinAggregate = {
  path?: Maybe<Scalars['String']>;
};

export type FileMinOrderByAggregateInput = {
  path?: Maybe<SortOrder>;
};

export type FileOrderByWithAggregationInput = {
  _count?: Maybe<FileCountOrderByAggregateInput>;
  _max?: Maybe<FileMaxOrderByAggregateInput>;
  _min?: Maybe<FileMinOrderByAggregateInput>;
  path?: Maybe<SortOrder>;
};

export type FileOrderByWithRelationInput = {
  Pages?: Maybe<PageOrderByRelationAggregateInput>;
  path?: Maybe<SortOrder>;
};

export type FileRelationFilter = {
  is?: Maybe<FileWhereInput>;
  isNot?: Maybe<FileWhereInput>;
};

export enum FileScalarFieldEnum {
  Path = 'path'
}

export type FileScalarWhereWithAggregatesInput = {
  AND?: Maybe<Array<FileScalarWhereWithAggregatesInput>>;
  NOT?: Maybe<Array<FileScalarWhereWithAggregatesInput>>;
  OR?: Maybe<Array<FileScalarWhereWithAggregatesInput>>;
  path?: Maybe<StringWithAggregatesFilter>;
};

export type FileUpdateInput = {
  Pages?: Maybe<PageUpdateManyWithoutFileInput>;
  path?: Maybe<StringFieldUpdateOperationsInput>;
};

export type FileUpdateManyMutationInput = {
  path?: Maybe<StringFieldUpdateOperationsInput>;
};

export type FileUpdateOneWithoutPagesInput = {
  connect?: Maybe<FileWhereUniqueInput>;
  connectOrCreate?: Maybe<FileCreateOrConnectWithoutPagesInput>;
  create?: Maybe<FileCreateWithoutPagesInput>;
  delete?: Maybe<Scalars['Boolean']>;
  disconnect?: Maybe<Scalars['Boolean']>;
  update?: Maybe<FileUpdateWithoutPagesInput>;
  upsert?: Maybe<FileUpsertWithoutPagesInput>;
};

export type FileUpdateWithoutPagesInput = {
  path?: Maybe<StringFieldUpdateOperationsInput>;
};

export type FileUpsertWithoutPagesInput = {
  create: FileCreateWithoutPagesInput;
  update: FileUpdateWithoutPagesInput;
};

export type FileWhereInput = {
  AND?: Maybe<Array<FileWhereInput>>;
  NOT?: Maybe<Array<FileWhereInput>>;
  OR?: Maybe<Array<FileWhereInput>>;
  Pages?: Maybe<PageListRelationFilter>;
  path?: Maybe<StringFilter>;
};

export type FileWhereUniqueInput = {
  path?: Maybe<Scalars['String']>;
};

export type Mutation = {
  createFile: File;
  createPage: Page;
  deleteFile?: Maybe<File>;
  deleteManyFile: AffectedRowsOutput;
  deleteManyPage: AffectedRowsOutput;
  deletePage?: Maybe<Page>;
  updateFile?: Maybe<File>;
  updateManyFile: AffectedRowsOutput;
  updateManyPage: AffectedRowsOutput;
  updatePage?: Maybe<Page>;
  upsertFile: File;
  upsertPage: Page;
};


export type MutationCreateFileArgs = {
  data: FileCreateInput;
};


export type MutationCreatePageArgs = {
  data: PageCreateInput;
};


export type MutationDeleteFileArgs = {
  where: FileWhereUniqueInput;
};


export type MutationDeleteManyFileArgs = {
  where?: Maybe<FileWhereInput>;
};


export type MutationDeleteManyPageArgs = {
  where?: Maybe<PageWhereInput>;
};


export type MutationDeletePageArgs = {
  where: PageWhereUniqueInput;
};


export type MutationUpdateFileArgs = {
  data: FileUpdateInput;
  where: FileWhereUniqueInput;
};


export type MutationUpdateManyFileArgs = {
  data: FileUpdateManyMutationInput;
  where?: Maybe<FileWhereInput>;
};


export type MutationUpdateManyPageArgs = {
  data: PageUpdateManyMutationInput;
  where?: Maybe<PageWhereInput>;
};


export type MutationUpdatePageArgs = {
  data: PageUpdateInput;
  where: PageWhereUniqueInput;
};


export type MutationUpsertFileArgs = {
  create: FileCreateInput;
  update: FileUpdateInput;
  where: FileWhereUniqueInput;
};


export type MutationUpsertPageArgs = {
  create: PageCreateInput;
  update: PageUpdateInput;
  where: PageWhereUniqueInput;
};

export type NestedBoolFilter = {
  equals?: Maybe<Scalars['Boolean']>;
  not?: Maybe<NestedBoolFilter>;
};

export type NestedBoolWithAggregatesFilter = {
  _count?: Maybe<NestedIntFilter>;
  _max?: Maybe<NestedBoolFilter>;
  _min?: Maybe<NestedBoolFilter>;
  equals?: Maybe<Scalars['Boolean']>;
  not?: Maybe<NestedBoolWithAggregatesFilter>;
};

export type NestedDateTimeNullableFilter = {
  equals?: Maybe<Scalars['DateTime']>;
  gt?: Maybe<Scalars['DateTime']>;
  gte?: Maybe<Scalars['DateTime']>;
  in?: Maybe<Array<Scalars['DateTime']>>;
  lt?: Maybe<Scalars['DateTime']>;
  lte?: Maybe<Scalars['DateTime']>;
  not?: Maybe<NestedDateTimeNullableFilter>;
  notIn?: Maybe<Array<Scalars['DateTime']>>;
};

export type NestedDateTimeNullableWithAggregatesFilter = {
  _count?: Maybe<NestedIntNullableFilter>;
  _max?: Maybe<NestedDateTimeNullableFilter>;
  _min?: Maybe<NestedDateTimeNullableFilter>;
  equals?: Maybe<Scalars['DateTime']>;
  gt?: Maybe<Scalars['DateTime']>;
  gte?: Maybe<Scalars['DateTime']>;
  in?: Maybe<Array<Scalars['DateTime']>>;
  lt?: Maybe<Scalars['DateTime']>;
  lte?: Maybe<Scalars['DateTime']>;
  not?: Maybe<NestedDateTimeNullableWithAggregatesFilter>;
  notIn?: Maybe<Array<Scalars['DateTime']>>;
};

export type NestedIntFilter = {
  equals?: Maybe<Scalars['Int']>;
  gt?: Maybe<Scalars['Int']>;
  gte?: Maybe<Scalars['Int']>;
  in?: Maybe<Array<Scalars['Int']>>;
  lt?: Maybe<Scalars['Int']>;
  lte?: Maybe<Scalars['Int']>;
  not?: Maybe<NestedIntFilter>;
  notIn?: Maybe<Array<Scalars['Int']>>;
};

export type NestedIntNullableFilter = {
  equals?: Maybe<Scalars['Int']>;
  gt?: Maybe<Scalars['Int']>;
  gte?: Maybe<Scalars['Int']>;
  in?: Maybe<Array<Scalars['Int']>>;
  lt?: Maybe<Scalars['Int']>;
  lte?: Maybe<Scalars['Int']>;
  not?: Maybe<NestedIntNullableFilter>;
  notIn?: Maybe<Array<Scalars['Int']>>;
};

export type NestedStringFilter = {
  contains?: Maybe<Scalars['String']>;
  endsWith?: Maybe<Scalars['String']>;
  equals?: Maybe<Scalars['String']>;
  gt?: Maybe<Scalars['String']>;
  gte?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Scalars['String']>>;
  lt?: Maybe<Scalars['String']>;
  lte?: Maybe<Scalars['String']>;
  not?: Maybe<NestedStringFilter>;
  notIn?: Maybe<Array<Scalars['String']>>;
  startsWith?: Maybe<Scalars['String']>;
};

export type NestedStringNullableFilter = {
  contains?: Maybe<Scalars['String']>;
  endsWith?: Maybe<Scalars['String']>;
  equals?: Maybe<Scalars['String']>;
  gt?: Maybe<Scalars['String']>;
  gte?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Scalars['String']>>;
  lt?: Maybe<Scalars['String']>;
  lte?: Maybe<Scalars['String']>;
  not?: Maybe<NestedStringNullableFilter>;
  notIn?: Maybe<Array<Scalars['String']>>;
  startsWith?: Maybe<Scalars['String']>;
};

export type NestedStringNullableWithAggregatesFilter = {
  _count?: Maybe<NestedIntNullableFilter>;
  _max?: Maybe<NestedStringNullableFilter>;
  _min?: Maybe<NestedStringNullableFilter>;
  contains?: Maybe<Scalars['String']>;
  endsWith?: Maybe<Scalars['String']>;
  equals?: Maybe<Scalars['String']>;
  gt?: Maybe<Scalars['String']>;
  gte?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Scalars['String']>>;
  lt?: Maybe<Scalars['String']>;
  lte?: Maybe<Scalars['String']>;
  not?: Maybe<NestedStringNullableWithAggregatesFilter>;
  notIn?: Maybe<Array<Scalars['String']>>;
  startsWith?: Maybe<Scalars['String']>;
};

export type NestedStringWithAggregatesFilter = {
  _count?: Maybe<NestedIntFilter>;
  _max?: Maybe<NestedStringFilter>;
  _min?: Maybe<NestedStringFilter>;
  contains?: Maybe<Scalars['String']>;
  endsWith?: Maybe<Scalars['String']>;
  equals?: Maybe<Scalars['String']>;
  gt?: Maybe<Scalars['String']>;
  gte?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Scalars['String']>>;
  lt?: Maybe<Scalars['String']>;
  lte?: Maybe<Scalars['String']>;
  not?: Maybe<NestedStringWithAggregatesFilter>;
  notIn?: Maybe<Array<Scalars['String']>>;
  startsWith?: Maybe<Scalars['String']>;
};

export type NullableDateTimeFieldUpdateOperationsInput = {
  set?: Maybe<Scalars['DateTime']>;
};

export type NullableStringFieldUpdateOperationsInput = {
  set?: Maybe<Scalars['String']>;
};

export type Page = {
  _count?: Maybe<PageCount>;
  /** the content of the page */
  content: Scalars['String'];
  /** the date field from the page frontmatter */
  date?: Maybe<Scalars['DateTime']>;
  /** the description string from the frontmatter */
  description?: Maybe<Scalars['String']>;
  /** Path to the directory containing this file. Relative to the root directory */
  dir: Scalars['String'];
  /**
   * true if the content is a draft
   * comes from the draft field in frontmatter
   */
  draft: Scalars['Boolean'];
  file?: Maybe<File>;
  /** The path to the file. Relative to the root directory. */
  filePath?: Maybe<Scalars['String']>;
  firstSection?: Maybe<Page>;
  firstSectionPages: Array<Page>;
  firstSectionSlug?: Maybe<Scalars['String']>;
  /** The path to an image. Relative to the file. */
  image?: Maybe<Scalars['String']>;
  /** True if the page is the home page */
  isHome: Scalars['Boolean'];
  /** True if the page is a section */
  isSection: Scalars['Boolean'];
  /**
   * The kind of the page. One of "home" | "page" | "section"
   *
   * Note that a home page is also a section. It is a superset of the section
   * type. So a page with `kind: home` would also have `isSection: true`
   */
  kind: Scalars['String'];
  pages: Array<Page>;
  parent?: Maybe<Page>;
  parentSlug?: Maybe<Scalars['String']>;
  /** The unique slug identifying the location of the page in the blog */
  slug: Scalars['String'];
  /** The title for this page */
  title: Scalars['String'];
};


export type PageFirstSectionPagesArgs = {
  cursor?: Maybe<PageWhereUniqueInput>;
  distinct?: Maybe<Array<PageScalarFieldEnum>>;
  orderBy?: Maybe<Array<PageOrderByWithRelationInput>>;
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
  where?: Maybe<PageWhereInput>;
};


export type PagePagesArgs = {
  cursor?: Maybe<PageWhereUniqueInput>;
  distinct?: Maybe<Array<PageScalarFieldEnum>>;
  orderBy?: Maybe<Array<PageOrderByWithRelationInput>>;
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
  where?: Maybe<PageWhereInput>;
};

export type PageCount = {
  firstSectionPages: Scalars['Int'];
  pages: Scalars['Int'];
};

export type PageCountAggregate = {
  _all: Scalars['Int'];
  content: Scalars['Int'];
  date: Scalars['Int'];
  description: Scalars['Int'];
  dir: Scalars['Int'];
  draft: Scalars['Int'];
  filePath: Scalars['Int'];
  firstSectionSlug: Scalars['Int'];
  image: Scalars['Int'];
  isHome: Scalars['Int'];
  isSection: Scalars['Int'];
  kind: Scalars['Int'];
  parentSlug: Scalars['Int'];
  slug: Scalars['Int'];
  title: Scalars['Int'];
};

export type PageCountOrderByAggregateInput = {
  content?: Maybe<SortOrder>;
  date?: Maybe<SortOrder>;
  description?: Maybe<SortOrder>;
  dir?: Maybe<SortOrder>;
  draft?: Maybe<SortOrder>;
  filePath?: Maybe<SortOrder>;
  firstSectionSlug?: Maybe<SortOrder>;
  image?: Maybe<SortOrder>;
  isHome?: Maybe<SortOrder>;
  isSection?: Maybe<SortOrder>;
  kind?: Maybe<SortOrder>;
  parentSlug?: Maybe<SortOrder>;
  slug?: Maybe<SortOrder>;
  title?: Maybe<SortOrder>;
};

export type PageCreateInput = {
  content: Scalars['String'];
  date?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  dir: Scalars['String'];
  draft: Scalars['Boolean'];
  file?: Maybe<FileCreateNestedOneWithoutPagesInput>;
  firstSection?: Maybe<PageCreateNestedOneWithoutFirstSectionPagesInput>;
  firstSectionPages?: Maybe<PageCreateNestedManyWithoutFirstSectionInput>;
  image?: Maybe<Scalars['String']>;
  isHome: Scalars['Boolean'];
  isSection: Scalars['Boolean'];
  kind: Scalars['String'];
  pages?: Maybe<PageCreateNestedManyWithoutParentInput>;
  parent?: Maybe<PageCreateNestedOneWithoutPagesInput>;
  slug: Scalars['String'];
  title: Scalars['String'];
};

export type PageCreateNestedManyWithoutFileInput = {
  connect?: Maybe<Array<PageWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<PageCreateOrConnectWithoutFileInput>>;
  create?: Maybe<Array<PageCreateWithoutFileInput>>;
};

export type PageCreateNestedManyWithoutFirstSectionInput = {
  connect?: Maybe<Array<PageWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<PageCreateOrConnectWithoutFirstSectionInput>>;
  create?: Maybe<Array<PageCreateWithoutFirstSectionInput>>;
};

export type PageCreateNestedManyWithoutParentInput = {
  connect?: Maybe<Array<PageWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<PageCreateOrConnectWithoutParentInput>>;
  create?: Maybe<Array<PageCreateWithoutParentInput>>;
};

export type PageCreateNestedOneWithoutFirstSectionPagesInput = {
  connect?: Maybe<PageWhereUniqueInput>;
  connectOrCreate?: Maybe<PageCreateOrConnectWithoutFirstSectionPagesInput>;
  create?: Maybe<PageCreateWithoutFirstSectionPagesInput>;
};

export type PageCreateNestedOneWithoutPagesInput = {
  connect?: Maybe<PageWhereUniqueInput>;
  connectOrCreate?: Maybe<PageCreateOrConnectWithoutPagesInput>;
  create?: Maybe<PageCreateWithoutPagesInput>;
};

export type PageCreateOrConnectWithoutFileInput = {
  create: PageCreateWithoutFileInput;
  where: PageWhereUniqueInput;
};

export type PageCreateOrConnectWithoutFirstSectionInput = {
  create: PageCreateWithoutFirstSectionInput;
  where: PageWhereUniqueInput;
};

export type PageCreateOrConnectWithoutFirstSectionPagesInput = {
  create: PageCreateWithoutFirstSectionPagesInput;
  where: PageWhereUniqueInput;
};

export type PageCreateOrConnectWithoutPagesInput = {
  create: PageCreateWithoutPagesInput;
  where: PageWhereUniqueInput;
};

export type PageCreateOrConnectWithoutParentInput = {
  create: PageCreateWithoutParentInput;
  where: PageWhereUniqueInput;
};

export type PageCreateWithoutFileInput = {
  content: Scalars['String'];
  date?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  dir: Scalars['String'];
  draft: Scalars['Boolean'];
  firstSection?: Maybe<PageCreateNestedOneWithoutFirstSectionPagesInput>;
  firstSectionPages?: Maybe<PageCreateNestedManyWithoutFirstSectionInput>;
  image?: Maybe<Scalars['String']>;
  isHome: Scalars['Boolean'];
  isSection: Scalars['Boolean'];
  kind: Scalars['String'];
  pages?: Maybe<PageCreateNestedManyWithoutParentInput>;
  parent?: Maybe<PageCreateNestedOneWithoutPagesInput>;
  slug: Scalars['String'];
  title: Scalars['String'];
};

export type PageCreateWithoutFirstSectionInput = {
  content: Scalars['String'];
  date?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  dir: Scalars['String'];
  draft: Scalars['Boolean'];
  file?: Maybe<FileCreateNestedOneWithoutPagesInput>;
  firstSectionPages?: Maybe<PageCreateNestedManyWithoutFirstSectionInput>;
  image?: Maybe<Scalars['String']>;
  isHome: Scalars['Boolean'];
  isSection: Scalars['Boolean'];
  kind: Scalars['String'];
  pages?: Maybe<PageCreateNestedManyWithoutParentInput>;
  parent?: Maybe<PageCreateNestedOneWithoutPagesInput>;
  slug: Scalars['String'];
  title: Scalars['String'];
};

export type PageCreateWithoutFirstSectionPagesInput = {
  content: Scalars['String'];
  date?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  dir: Scalars['String'];
  draft: Scalars['Boolean'];
  file?: Maybe<FileCreateNestedOneWithoutPagesInput>;
  firstSection?: Maybe<PageCreateNestedOneWithoutFirstSectionPagesInput>;
  image?: Maybe<Scalars['String']>;
  isHome: Scalars['Boolean'];
  isSection: Scalars['Boolean'];
  kind: Scalars['String'];
  pages?: Maybe<PageCreateNestedManyWithoutParentInput>;
  parent?: Maybe<PageCreateNestedOneWithoutPagesInput>;
  slug: Scalars['String'];
  title: Scalars['String'];
};

export type PageCreateWithoutPagesInput = {
  content: Scalars['String'];
  date?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  dir: Scalars['String'];
  draft: Scalars['Boolean'];
  file?: Maybe<FileCreateNestedOneWithoutPagesInput>;
  firstSection?: Maybe<PageCreateNestedOneWithoutFirstSectionPagesInput>;
  firstSectionPages?: Maybe<PageCreateNestedManyWithoutFirstSectionInput>;
  image?: Maybe<Scalars['String']>;
  isHome: Scalars['Boolean'];
  isSection: Scalars['Boolean'];
  kind: Scalars['String'];
  parent?: Maybe<PageCreateNestedOneWithoutPagesInput>;
  slug: Scalars['String'];
  title: Scalars['String'];
};

export type PageCreateWithoutParentInput = {
  content: Scalars['String'];
  date?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  dir: Scalars['String'];
  draft: Scalars['Boolean'];
  file?: Maybe<FileCreateNestedOneWithoutPagesInput>;
  firstSection?: Maybe<PageCreateNestedOneWithoutFirstSectionPagesInput>;
  firstSectionPages?: Maybe<PageCreateNestedManyWithoutFirstSectionInput>;
  image?: Maybe<Scalars['String']>;
  isHome: Scalars['Boolean'];
  isSection: Scalars['Boolean'];
  kind: Scalars['String'];
  pages?: Maybe<PageCreateNestedManyWithoutParentInput>;
  slug: Scalars['String'];
  title: Scalars['String'];
};

export type PageGroupBy = {
  _count?: Maybe<PageCountAggregate>;
  _max?: Maybe<PageMaxAggregate>;
  _min?: Maybe<PageMinAggregate>;
  content: Scalars['String'];
  date?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  dir: Scalars['String'];
  draft: Scalars['Boolean'];
  filePath?: Maybe<Scalars['String']>;
  firstSectionSlug?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  isHome: Scalars['Boolean'];
  isSection: Scalars['Boolean'];
  kind: Scalars['String'];
  parentSlug?: Maybe<Scalars['String']>;
  slug: Scalars['String'];
  title: Scalars['String'];
};

export type PageListRelationFilter = {
  every?: Maybe<PageWhereInput>;
  none?: Maybe<PageWhereInput>;
  some?: Maybe<PageWhereInput>;
};

export type PageMaxAggregate = {
  content?: Maybe<Scalars['String']>;
  date?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  dir?: Maybe<Scalars['String']>;
  draft?: Maybe<Scalars['Boolean']>;
  filePath?: Maybe<Scalars['String']>;
  firstSectionSlug?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  isHome?: Maybe<Scalars['Boolean']>;
  isSection?: Maybe<Scalars['Boolean']>;
  kind?: Maybe<Scalars['String']>;
  parentSlug?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type PageMaxOrderByAggregateInput = {
  content?: Maybe<SortOrder>;
  date?: Maybe<SortOrder>;
  description?: Maybe<SortOrder>;
  dir?: Maybe<SortOrder>;
  draft?: Maybe<SortOrder>;
  filePath?: Maybe<SortOrder>;
  firstSectionSlug?: Maybe<SortOrder>;
  image?: Maybe<SortOrder>;
  isHome?: Maybe<SortOrder>;
  isSection?: Maybe<SortOrder>;
  kind?: Maybe<SortOrder>;
  parentSlug?: Maybe<SortOrder>;
  slug?: Maybe<SortOrder>;
  title?: Maybe<SortOrder>;
};

export type PageMinAggregate = {
  content?: Maybe<Scalars['String']>;
  date?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  dir?: Maybe<Scalars['String']>;
  draft?: Maybe<Scalars['Boolean']>;
  filePath?: Maybe<Scalars['String']>;
  firstSectionSlug?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  isHome?: Maybe<Scalars['Boolean']>;
  isSection?: Maybe<Scalars['Boolean']>;
  kind?: Maybe<Scalars['String']>;
  parentSlug?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type PageMinOrderByAggregateInput = {
  content?: Maybe<SortOrder>;
  date?: Maybe<SortOrder>;
  description?: Maybe<SortOrder>;
  dir?: Maybe<SortOrder>;
  draft?: Maybe<SortOrder>;
  filePath?: Maybe<SortOrder>;
  firstSectionSlug?: Maybe<SortOrder>;
  image?: Maybe<SortOrder>;
  isHome?: Maybe<SortOrder>;
  isSection?: Maybe<SortOrder>;
  kind?: Maybe<SortOrder>;
  parentSlug?: Maybe<SortOrder>;
  slug?: Maybe<SortOrder>;
  title?: Maybe<SortOrder>;
};

export type PageOrderByRelationAggregateInput = {
  _count?: Maybe<SortOrder>;
};

export type PageOrderByWithAggregationInput = {
  _count?: Maybe<PageCountOrderByAggregateInput>;
  _max?: Maybe<PageMaxOrderByAggregateInput>;
  _min?: Maybe<PageMinOrderByAggregateInput>;
  content?: Maybe<SortOrder>;
  date?: Maybe<SortOrder>;
  description?: Maybe<SortOrder>;
  dir?: Maybe<SortOrder>;
  draft?: Maybe<SortOrder>;
  filePath?: Maybe<SortOrder>;
  firstSectionSlug?: Maybe<SortOrder>;
  image?: Maybe<SortOrder>;
  isHome?: Maybe<SortOrder>;
  isSection?: Maybe<SortOrder>;
  kind?: Maybe<SortOrder>;
  parentSlug?: Maybe<SortOrder>;
  slug?: Maybe<SortOrder>;
  title?: Maybe<SortOrder>;
};

export type PageOrderByWithRelationInput = {
  content?: Maybe<SortOrder>;
  date?: Maybe<SortOrder>;
  description?: Maybe<SortOrder>;
  dir?: Maybe<SortOrder>;
  draft?: Maybe<SortOrder>;
  file?: Maybe<FileOrderByWithRelationInput>;
  filePath?: Maybe<SortOrder>;
  firstSection?: Maybe<PageOrderByWithRelationInput>;
  firstSectionPages?: Maybe<PageOrderByRelationAggregateInput>;
  firstSectionSlug?: Maybe<SortOrder>;
  image?: Maybe<SortOrder>;
  isHome?: Maybe<SortOrder>;
  isSection?: Maybe<SortOrder>;
  kind?: Maybe<SortOrder>;
  pages?: Maybe<PageOrderByRelationAggregateInput>;
  parent?: Maybe<PageOrderByWithRelationInput>;
  parentSlug?: Maybe<SortOrder>;
  slug?: Maybe<SortOrder>;
  title?: Maybe<SortOrder>;
};

export type PageRelationFilter = {
  is?: Maybe<PageWhereInput>;
  isNot?: Maybe<PageWhereInput>;
};

export enum PageScalarFieldEnum {
  Content = 'content',
  Date = 'date',
  Description = 'description',
  Dir = 'dir',
  Draft = 'draft',
  FilePath = 'filePath',
  FirstSectionSlug = 'firstSectionSlug',
  Image = 'image',
  IsHome = 'isHome',
  IsSection = 'isSection',
  Kind = 'kind',
  ParentSlug = 'parentSlug',
  Slug = 'slug',
  Title = 'title'
}

export type PageScalarWhereInput = {
  AND?: Maybe<Array<PageScalarWhereInput>>;
  NOT?: Maybe<Array<PageScalarWhereInput>>;
  OR?: Maybe<Array<PageScalarWhereInput>>;
  content?: Maybe<StringFilter>;
  date?: Maybe<DateTimeNullableFilter>;
  description?: Maybe<StringNullableFilter>;
  dir?: Maybe<StringFilter>;
  draft?: Maybe<BoolFilter>;
  filePath?: Maybe<StringNullableFilter>;
  firstSectionSlug?: Maybe<StringNullableFilter>;
  image?: Maybe<StringNullableFilter>;
  isHome?: Maybe<BoolFilter>;
  isSection?: Maybe<BoolFilter>;
  kind?: Maybe<StringFilter>;
  parentSlug?: Maybe<StringNullableFilter>;
  slug?: Maybe<StringFilter>;
  title?: Maybe<StringFilter>;
};

export type PageScalarWhereWithAggregatesInput = {
  AND?: Maybe<Array<PageScalarWhereWithAggregatesInput>>;
  NOT?: Maybe<Array<PageScalarWhereWithAggregatesInput>>;
  OR?: Maybe<Array<PageScalarWhereWithAggregatesInput>>;
  content?: Maybe<StringWithAggregatesFilter>;
  date?: Maybe<DateTimeNullableWithAggregatesFilter>;
  description?: Maybe<StringNullableWithAggregatesFilter>;
  dir?: Maybe<StringWithAggregatesFilter>;
  draft?: Maybe<BoolWithAggregatesFilter>;
  filePath?: Maybe<StringNullableWithAggregatesFilter>;
  firstSectionSlug?: Maybe<StringNullableWithAggregatesFilter>;
  image?: Maybe<StringNullableWithAggregatesFilter>;
  isHome?: Maybe<BoolWithAggregatesFilter>;
  isSection?: Maybe<BoolWithAggregatesFilter>;
  kind?: Maybe<StringWithAggregatesFilter>;
  parentSlug?: Maybe<StringNullableWithAggregatesFilter>;
  slug?: Maybe<StringWithAggregatesFilter>;
  title?: Maybe<StringWithAggregatesFilter>;
};

export type PageUpdateInput = {
  content?: Maybe<StringFieldUpdateOperationsInput>;
  date?: Maybe<NullableDateTimeFieldUpdateOperationsInput>;
  description?: Maybe<NullableStringFieldUpdateOperationsInput>;
  dir?: Maybe<StringFieldUpdateOperationsInput>;
  draft?: Maybe<BoolFieldUpdateOperationsInput>;
  file?: Maybe<FileUpdateOneWithoutPagesInput>;
  firstSection?: Maybe<PageUpdateOneWithoutFirstSectionPagesInput>;
  firstSectionPages?: Maybe<PageUpdateManyWithoutFirstSectionInput>;
  image?: Maybe<NullableStringFieldUpdateOperationsInput>;
  isHome?: Maybe<BoolFieldUpdateOperationsInput>;
  isSection?: Maybe<BoolFieldUpdateOperationsInput>;
  kind?: Maybe<StringFieldUpdateOperationsInput>;
  pages?: Maybe<PageUpdateManyWithoutParentInput>;
  parent?: Maybe<PageUpdateOneWithoutPagesInput>;
  slug?: Maybe<StringFieldUpdateOperationsInput>;
  title?: Maybe<StringFieldUpdateOperationsInput>;
};

export type PageUpdateManyMutationInput = {
  content?: Maybe<StringFieldUpdateOperationsInput>;
  date?: Maybe<NullableDateTimeFieldUpdateOperationsInput>;
  description?: Maybe<NullableStringFieldUpdateOperationsInput>;
  dir?: Maybe<StringFieldUpdateOperationsInput>;
  draft?: Maybe<BoolFieldUpdateOperationsInput>;
  image?: Maybe<NullableStringFieldUpdateOperationsInput>;
  isHome?: Maybe<BoolFieldUpdateOperationsInput>;
  isSection?: Maybe<BoolFieldUpdateOperationsInput>;
  kind?: Maybe<StringFieldUpdateOperationsInput>;
  slug?: Maybe<StringFieldUpdateOperationsInput>;
  title?: Maybe<StringFieldUpdateOperationsInput>;
};

export type PageUpdateManyWithWhereWithoutFileInput = {
  data: PageUpdateManyMutationInput;
  where: PageScalarWhereInput;
};

export type PageUpdateManyWithWhereWithoutFirstSectionInput = {
  data: PageUpdateManyMutationInput;
  where: PageScalarWhereInput;
};

export type PageUpdateManyWithWhereWithoutParentInput = {
  data: PageUpdateManyMutationInput;
  where: PageScalarWhereInput;
};

export type PageUpdateManyWithoutFileInput = {
  connect?: Maybe<Array<PageWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<PageCreateOrConnectWithoutFileInput>>;
  create?: Maybe<Array<PageCreateWithoutFileInput>>;
  delete?: Maybe<Array<PageWhereUniqueInput>>;
  deleteMany?: Maybe<Array<PageScalarWhereInput>>;
  disconnect?: Maybe<Array<PageWhereUniqueInput>>;
  set?: Maybe<Array<PageWhereUniqueInput>>;
  update?: Maybe<Array<PageUpdateWithWhereUniqueWithoutFileInput>>;
  updateMany?: Maybe<Array<PageUpdateManyWithWhereWithoutFileInput>>;
  upsert?: Maybe<Array<PageUpsertWithWhereUniqueWithoutFileInput>>;
};

export type PageUpdateManyWithoutFirstSectionInput = {
  connect?: Maybe<Array<PageWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<PageCreateOrConnectWithoutFirstSectionInput>>;
  create?: Maybe<Array<PageCreateWithoutFirstSectionInput>>;
  delete?: Maybe<Array<PageWhereUniqueInput>>;
  deleteMany?: Maybe<Array<PageScalarWhereInput>>;
  disconnect?: Maybe<Array<PageWhereUniqueInput>>;
  set?: Maybe<Array<PageWhereUniqueInput>>;
  update?: Maybe<Array<PageUpdateWithWhereUniqueWithoutFirstSectionInput>>;
  updateMany?: Maybe<Array<PageUpdateManyWithWhereWithoutFirstSectionInput>>;
  upsert?: Maybe<Array<PageUpsertWithWhereUniqueWithoutFirstSectionInput>>;
};

export type PageUpdateManyWithoutParentInput = {
  connect?: Maybe<Array<PageWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<PageCreateOrConnectWithoutParentInput>>;
  create?: Maybe<Array<PageCreateWithoutParentInput>>;
  delete?: Maybe<Array<PageWhereUniqueInput>>;
  deleteMany?: Maybe<Array<PageScalarWhereInput>>;
  disconnect?: Maybe<Array<PageWhereUniqueInput>>;
  set?: Maybe<Array<PageWhereUniqueInput>>;
  update?: Maybe<Array<PageUpdateWithWhereUniqueWithoutParentInput>>;
  updateMany?: Maybe<Array<PageUpdateManyWithWhereWithoutParentInput>>;
  upsert?: Maybe<Array<PageUpsertWithWhereUniqueWithoutParentInput>>;
};

export type PageUpdateOneWithoutFirstSectionPagesInput = {
  connect?: Maybe<PageWhereUniqueInput>;
  connectOrCreate?: Maybe<PageCreateOrConnectWithoutFirstSectionPagesInput>;
  create?: Maybe<PageCreateWithoutFirstSectionPagesInput>;
  delete?: Maybe<Scalars['Boolean']>;
  disconnect?: Maybe<Scalars['Boolean']>;
  update?: Maybe<PageUpdateWithoutFirstSectionPagesInput>;
  upsert?: Maybe<PageUpsertWithoutFirstSectionPagesInput>;
};

export type PageUpdateOneWithoutPagesInput = {
  connect?: Maybe<PageWhereUniqueInput>;
  connectOrCreate?: Maybe<PageCreateOrConnectWithoutPagesInput>;
  create?: Maybe<PageCreateWithoutPagesInput>;
  delete?: Maybe<Scalars['Boolean']>;
  disconnect?: Maybe<Scalars['Boolean']>;
  update?: Maybe<PageUpdateWithoutPagesInput>;
  upsert?: Maybe<PageUpsertWithoutPagesInput>;
};

export type PageUpdateWithWhereUniqueWithoutFileInput = {
  data: PageUpdateWithoutFileInput;
  where: PageWhereUniqueInput;
};

export type PageUpdateWithWhereUniqueWithoutFirstSectionInput = {
  data: PageUpdateWithoutFirstSectionInput;
  where: PageWhereUniqueInput;
};

export type PageUpdateWithWhereUniqueWithoutParentInput = {
  data: PageUpdateWithoutParentInput;
  where: PageWhereUniqueInput;
};

export type PageUpdateWithoutFileInput = {
  content?: Maybe<StringFieldUpdateOperationsInput>;
  date?: Maybe<NullableDateTimeFieldUpdateOperationsInput>;
  description?: Maybe<NullableStringFieldUpdateOperationsInput>;
  dir?: Maybe<StringFieldUpdateOperationsInput>;
  draft?: Maybe<BoolFieldUpdateOperationsInput>;
  firstSection?: Maybe<PageUpdateOneWithoutFirstSectionPagesInput>;
  firstSectionPages?: Maybe<PageUpdateManyWithoutFirstSectionInput>;
  image?: Maybe<NullableStringFieldUpdateOperationsInput>;
  isHome?: Maybe<BoolFieldUpdateOperationsInput>;
  isSection?: Maybe<BoolFieldUpdateOperationsInput>;
  kind?: Maybe<StringFieldUpdateOperationsInput>;
  pages?: Maybe<PageUpdateManyWithoutParentInput>;
  parent?: Maybe<PageUpdateOneWithoutPagesInput>;
  slug?: Maybe<StringFieldUpdateOperationsInput>;
  title?: Maybe<StringFieldUpdateOperationsInput>;
};

export type PageUpdateWithoutFirstSectionInput = {
  content?: Maybe<StringFieldUpdateOperationsInput>;
  date?: Maybe<NullableDateTimeFieldUpdateOperationsInput>;
  description?: Maybe<NullableStringFieldUpdateOperationsInput>;
  dir?: Maybe<StringFieldUpdateOperationsInput>;
  draft?: Maybe<BoolFieldUpdateOperationsInput>;
  file?: Maybe<FileUpdateOneWithoutPagesInput>;
  firstSectionPages?: Maybe<PageUpdateManyWithoutFirstSectionInput>;
  image?: Maybe<NullableStringFieldUpdateOperationsInput>;
  isHome?: Maybe<BoolFieldUpdateOperationsInput>;
  isSection?: Maybe<BoolFieldUpdateOperationsInput>;
  kind?: Maybe<StringFieldUpdateOperationsInput>;
  pages?: Maybe<PageUpdateManyWithoutParentInput>;
  parent?: Maybe<PageUpdateOneWithoutPagesInput>;
  slug?: Maybe<StringFieldUpdateOperationsInput>;
  title?: Maybe<StringFieldUpdateOperationsInput>;
};

export type PageUpdateWithoutFirstSectionPagesInput = {
  content?: Maybe<StringFieldUpdateOperationsInput>;
  date?: Maybe<NullableDateTimeFieldUpdateOperationsInput>;
  description?: Maybe<NullableStringFieldUpdateOperationsInput>;
  dir?: Maybe<StringFieldUpdateOperationsInput>;
  draft?: Maybe<BoolFieldUpdateOperationsInput>;
  file?: Maybe<FileUpdateOneWithoutPagesInput>;
  firstSection?: Maybe<PageUpdateOneWithoutFirstSectionPagesInput>;
  image?: Maybe<NullableStringFieldUpdateOperationsInput>;
  isHome?: Maybe<BoolFieldUpdateOperationsInput>;
  isSection?: Maybe<BoolFieldUpdateOperationsInput>;
  kind?: Maybe<StringFieldUpdateOperationsInput>;
  pages?: Maybe<PageUpdateManyWithoutParentInput>;
  parent?: Maybe<PageUpdateOneWithoutPagesInput>;
  slug?: Maybe<StringFieldUpdateOperationsInput>;
  title?: Maybe<StringFieldUpdateOperationsInput>;
};

export type PageUpdateWithoutPagesInput = {
  content?: Maybe<StringFieldUpdateOperationsInput>;
  date?: Maybe<NullableDateTimeFieldUpdateOperationsInput>;
  description?: Maybe<NullableStringFieldUpdateOperationsInput>;
  dir?: Maybe<StringFieldUpdateOperationsInput>;
  draft?: Maybe<BoolFieldUpdateOperationsInput>;
  file?: Maybe<FileUpdateOneWithoutPagesInput>;
  firstSection?: Maybe<PageUpdateOneWithoutFirstSectionPagesInput>;
  firstSectionPages?: Maybe<PageUpdateManyWithoutFirstSectionInput>;
  image?: Maybe<NullableStringFieldUpdateOperationsInput>;
  isHome?: Maybe<BoolFieldUpdateOperationsInput>;
  isSection?: Maybe<BoolFieldUpdateOperationsInput>;
  kind?: Maybe<StringFieldUpdateOperationsInput>;
  parent?: Maybe<PageUpdateOneWithoutPagesInput>;
  slug?: Maybe<StringFieldUpdateOperationsInput>;
  title?: Maybe<StringFieldUpdateOperationsInput>;
};

export type PageUpdateWithoutParentInput = {
  content?: Maybe<StringFieldUpdateOperationsInput>;
  date?: Maybe<NullableDateTimeFieldUpdateOperationsInput>;
  description?: Maybe<NullableStringFieldUpdateOperationsInput>;
  dir?: Maybe<StringFieldUpdateOperationsInput>;
  draft?: Maybe<BoolFieldUpdateOperationsInput>;
  file?: Maybe<FileUpdateOneWithoutPagesInput>;
  firstSection?: Maybe<PageUpdateOneWithoutFirstSectionPagesInput>;
  firstSectionPages?: Maybe<PageUpdateManyWithoutFirstSectionInput>;
  image?: Maybe<NullableStringFieldUpdateOperationsInput>;
  isHome?: Maybe<BoolFieldUpdateOperationsInput>;
  isSection?: Maybe<BoolFieldUpdateOperationsInput>;
  kind?: Maybe<StringFieldUpdateOperationsInput>;
  pages?: Maybe<PageUpdateManyWithoutParentInput>;
  slug?: Maybe<StringFieldUpdateOperationsInput>;
  title?: Maybe<StringFieldUpdateOperationsInput>;
};

export type PageUpsertWithWhereUniqueWithoutFileInput = {
  create: PageCreateWithoutFileInput;
  update: PageUpdateWithoutFileInput;
  where: PageWhereUniqueInput;
};

export type PageUpsertWithWhereUniqueWithoutFirstSectionInput = {
  create: PageCreateWithoutFirstSectionInput;
  update: PageUpdateWithoutFirstSectionInput;
  where: PageWhereUniqueInput;
};

export type PageUpsertWithWhereUniqueWithoutParentInput = {
  create: PageCreateWithoutParentInput;
  update: PageUpdateWithoutParentInput;
  where: PageWhereUniqueInput;
};

export type PageUpsertWithoutFirstSectionPagesInput = {
  create: PageCreateWithoutFirstSectionPagesInput;
  update: PageUpdateWithoutFirstSectionPagesInput;
};

export type PageUpsertWithoutPagesInput = {
  create: PageCreateWithoutPagesInput;
  update: PageUpdateWithoutPagesInput;
};

export type PageWhereInput = {
  AND?: Maybe<Array<PageWhereInput>>;
  NOT?: Maybe<Array<PageWhereInput>>;
  OR?: Maybe<Array<PageWhereInput>>;
  content?: Maybe<StringFilter>;
  date?: Maybe<DateTimeNullableFilter>;
  description?: Maybe<StringNullableFilter>;
  dir?: Maybe<StringFilter>;
  draft?: Maybe<BoolFilter>;
  file?: Maybe<FileRelationFilter>;
  filePath?: Maybe<StringNullableFilter>;
  firstSection?: Maybe<PageRelationFilter>;
  firstSectionPages?: Maybe<PageListRelationFilter>;
  firstSectionSlug?: Maybe<StringNullableFilter>;
  image?: Maybe<StringNullableFilter>;
  isHome?: Maybe<BoolFilter>;
  isSection?: Maybe<BoolFilter>;
  kind?: Maybe<StringFilter>;
  pages?: Maybe<PageListRelationFilter>;
  parent?: Maybe<PageRelationFilter>;
  parentSlug?: Maybe<StringNullableFilter>;
  slug?: Maybe<StringFilter>;
  title?: Maybe<StringFilter>;
};

export type PageWhereUniqueInput = {
  slug?: Maybe<Scalars['String']>;
};

export type Query = {
  aggregateFile: AggregateFile;
  aggregatePage: AggregatePage;
  file?: Maybe<File>;
  files: Array<File>;
  findFirstFile?: Maybe<File>;
  findFirstPage?: Maybe<Page>;
  groupByFile: Array<FileGroupBy>;
  groupByPage: Array<PageGroupBy>;
  page?: Maybe<Page>;
  pages: Array<Page>;
};


export type QueryAggregateFileArgs = {
  cursor?: Maybe<FileWhereUniqueInput>;
  orderBy?: Maybe<Array<FileOrderByWithRelationInput>>;
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
  where?: Maybe<FileWhereInput>;
};


export type QueryAggregatePageArgs = {
  cursor?: Maybe<PageWhereUniqueInput>;
  orderBy?: Maybe<Array<PageOrderByWithRelationInput>>;
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
  where?: Maybe<PageWhereInput>;
};


export type QueryFileArgs = {
  where: FileWhereUniqueInput;
};


export type QueryFilesArgs = {
  cursor?: Maybe<FileWhereUniqueInput>;
  distinct?: Maybe<Array<FileScalarFieldEnum>>;
  orderBy?: Maybe<Array<FileOrderByWithRelationInput>>;
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
  where?: Maybe<FileWhereInput>;
};


export type QueryFindFirstFileArgs = {
  cursor?: Maybe<FileWhereUniqueInput>;
  distinct?: Maybe<Array<FileScalarFieldEnum>>;
  orderBy?: Maybe<Array<FileOrderByWithRelationInput>>;
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
  where?: Maybe<FileWhereInput>;
};


export type QueryFindFirstPageArgs = {
  cursor?: Maybe<PageWhereUniqueInput>;
  distinct?: Maybe<Array<PageScalarFieldEnum>>;
  orderBy?: Maybe<Array<PageOrderByWithRelationInput>>;
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
  where?: Maybe<PageWhereInput>;
};


export type QueryGroupByFileArgs = {
  by: Array<FileScalarFieldEnum>;
  having?: Maybe<FileScalarWhereWithAggregatesInput>;
  orderBy?: Maybe<Array<FileOrderByWithAggregationInput>>;
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
  where?: Maybe<FileWhereInput>;
};


export type QueryGroupByPageArgs = {
  by: Array<PageScalarFieldEnum>;
  having?: Maybe<PageScalarWhereWithAggregatesInput>;
  orderBy?: Maybe<Array<PageOrderByWithAggregationInput>>;
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
  where?: Maybe<PageWhereInput>;
};


export type QueryPageArgs = {
  where: PageWhereUniqueInput;
};


export type QueryPagesArgs = {
  cursor?: Maybe<PageWhereUniqueInput>;
  distinct?: Maybe<Array<PageScalarFieldEnum>>;
  orderBy?: Maybe<Array<PageOrderByWithRelationInput>>;
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
  where?: Maybe<PageWhereInput>;
};

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc'
}

export type StringFieldUpdateOperationsInput = {
  set?: Maybe<Scalars['String']>;
};

export type StringFilter = {
  contains?: Maybe<Scalars['String']>;
  endsWith?: Maybe<Scalars['String']>;
  equals?: Maybe<Scalars['String']>;
  gt?: Maybe<Scalars['String']>;
  gte?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Scalars['String']>>;
  lt?: Maybe<Scalars['String']>;
  lte?: Maybe<Scalars['String']>;
  not?: Maybe<NestedStringFilter>;
  notIn?: Maybe<Array<Scalars['String']>>;
  startsWith?: Maybe<Scalars['String']>;
};

export type StringNullableFilter = {
  contains?: Maybe<Scalars['String']>;
  endsWith?: Maybe<Scalars['String']>;
  equals?: Maybe<Scalars['String']>;
  gt?: Maybe<Scalars['String']>;
  gte?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Scalars['String']>>;
  lt?: Maybe<Scalars['String']>;
  lte?: Maybe<Scalars['String']>;
  not?: Maybe<NestedStringNullableFilter>;
  notIn?: Maybe<Array<Scalars['String']>>;
  startsWith?: Maybe<Scalars['String']>;
};

export type StringNullableWithAggregatesFilter = {
  _count?: Maybe<NestedIntNullableFilter>;
  _max?: Maybe<NestedStringNullableFilter>;
  _min?: Maybe<NestedStringNullableFilter>;
  contains?: Maybe<Scalars['String']>;
  endsWith?: Maybe<Scalars['String']>;
  equals?: Maybe<Scalars['String']>;
  gt?: Maybe<Scalars['String']>;
  gte?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Scalars['String']>>;
  lt?: Maybe<Scalars['String']>;
  lte?: Maybe<Scalars['String']>;
  not?: Maybe<NestedStringNullableWithAggregatesFilter>;
  notIn?: Maybe<Array<Scalars['String']>>;
  startsWith?: Maybe<Scalars['String']>;
};

export type StringWithAggregatesFilter = {
  _count?: Maybe<NestedIntFilter>;
  _max?: Maybe<NestedStringFilter>;
  _min?: Maybe<NestedStringFilter>;
  contains?: Maybe<Scalars['String']>;
  endsWith?: Maybe<Scalars['String']>;
  equals?: Maybe<Scalars['String']>;
  gt?: Maybe<Scalars['String']>;
  gte?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Scalars['String']>>;
  lt?: Maybe<Scalars['String']>;
  lte?: Maybe<Scalars['String']>;
  not?: Maybe<NestedStringWithAggregatesFilter>;
  notIn?: Maybe<Array<Scalars['String']>>;
  startsWith?: Maybe<Scalars['String']>;
};

export type SlugStaticPathsQueryVariables = Exact<{ [key: string]: never; }>;


export type SlugStaticPathsQuery = { pages: Array<{ slug: string, title: string, description?: string | null | undefined, date?: any | null | undefined, kind: string, draft: boolean, content: string }> };

export type SlugPageQueryVariables = Exact<{
  currentSlug: Scalars['String'];
  publishDrafts: Scalars['Boolean'];
}>;


export type SlugPageQuery = { root?: { slug: string, title: string, pages: Array<{ slug: string, title: string, kind: string, draft: boolean }> } | null | undefined, currentPage?: { slug: string, title: string, kind: string, content: string, date?: any | null | undefined, draft: boolean, description?: string | null | undefined, filePath?: string | null | undefined, image?: string | null | undefined, parent?: { slug: string, title: string, kind: string, draft: boolean, pages: Array<{ slug: string, title: string, kind: string, draft: boolean }> } | null | undefined, pages: Array<{ slug: string, title: string, kind: string, draft: boolean, date?: any | null | undefined, description?: string | null | undefined }> } | null | undefined, recentPosts: Array<{ slug: string, title: string, kind: string, draft: boolean, date?: any | null | undefined, description?: string | null | undefined }> };


export const SlugStaticPathsDocument = gql`
    query SlugStaticPaths {
  pages {
    slug
    title
    description
    date
    kind
    draft
    content
  }
}
    `;

/**
 * __useSlugStaticPathsQuery__
 *
 * To run a query within a React component, call `useSlugStaticPathsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSlugStaticPathsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSlugStaticPathsQuery({
 *   variables: {
 *   },
 * });
 */
export function useSlugStaticPathsQuery(baseOptions?: Apollo.QueryHookOptions<SlugStaticPathsQuery, SlugStaticPathsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SlugStaticPathsQuery, SlugStaticPathsQueryVariables>(SlugStaticPathsDocument, options);
      }
export function useSlugStaticPathsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SlugStaticPathsQuery, SlugStaticPathsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SlugStaticPathsQuery, SlugStaticPathsQueryVariables>(SlugStaticPathsDocument, options);
        }
export type SlugStaticPathsQueryHookResult = ReturnType<typeof useSlugStaticPathsQuery>;
export type SlugStaticPathsLazyQueryHookResult = ReturnType<typeof useSlugStaticPathsLazyQuery>;
export type SlugStaticPathsQueryResult = Apollo.QueryResult<SlugStaticPathsQuery, SlugStaticPathsQueryVariables>;
export const SlugPageDocument = gql`
    query SlugPage($currentSlug: String!, $publishDrafts: Boolean!) {
  root: page(where: {slug: "/"}) {
    slug
    title
    pages(
      orderBy: {date: desc}
      where: {OR: [{draft: {not: {equals: true}}}, {draft: {equals: $publishDrafts}}]}
    ) {
      slug
      title
      kind
      draft
    }
  }
  currentPage: page(where: {slug: $currentSlug}) {
    slug
    title
    kind
    content
    date
    draft
    description
    filePath
    image
    parent {
      slug
      title
      kind
      draft
      pages(
        orderBy: {date: desc}
        where: {OR: [{draft: {not: {equals: true}}}, {draft: {equals: $publishDrafts}}]}
      ) {
        slug
        title
        kind
        draft
      }
    }
    pages(
      orderBy: {date: desc}
      where: {OR: [{draft: {not: {equals: true}}}, {draft: {equals: $publishDrafts}}]}
    ) {
      slug
      title
      kind
      draft
      date
      description
    }
  }
  recentPosts: pages(
    orderBy: {date: desc}
    where: {AND: [{OR: [{draft: {not: {equals: true}}}, {draft: {equals: $publishDrafts}}]}, {isSection: {equals: false}}]}
    take: 5
  ) {
    slug
    title
    kind
    draft
    date
    description
  }
}
    `;

/**
 * __useSlugPageQuery__
 *
 * To run a query within a React component, call `useSlugPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useSlugPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSlugPageQuery({
 *   variables: {
 *      currentSlug: // value for 'currentSlug'
 *      publishDrafts: // value for 'publishDrafts'
 *   },
 * });
 */
export function useSlugPageQuery(baseOptions: Apollo.QueryHookOptions<SlugPageQuery, SlugPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SlugPageQuery, SlugPageQueryVariables>(SlugPageDocument, options);
      }
export function useSlugPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SlugPageQuery, SlugPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SlugPageQuery, SlugPageQueryVariables>(SlugPageDocument, options);
        }
export type SlugPageQueryHookResult = ReturnType<typeof useSlugPageQuery>;
export type SlugPageLazyQueryHookResult = ReturnType<typeof useSlugPageLazyQuery>;
export type SlugPageQueryResult = Apollo.QueryResult<SlugPageQuery, SlugPageQueryVariables>;